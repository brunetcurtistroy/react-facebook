import React from "react";
import PropTypes from 'prop-types';

import {
  Button, Card, List, message,
  Col, Row, Table,
} from "antd";

import {
  ReloadOutlined,
} from '@ant-design/icons';

import moment from "moment";

import axios from 'configs/axios';

/**
* @extends {React.Component<{Li_ContractType:number, Li_ContractOrgCode:number, onSelected:Function}>}
*/
class WS0307071_HistorySwitching extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,

    onSelected: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // // document.title = "契約年度";

    this.state = {
      contractHistoriesList: [],

      isLoadingContractHistories: false,
    };

    this.loadContractHistories = this.loadContractHistories.bind(this);
  }

  componentDidMount() {
    this.loadContractHistories();
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.Li_ContractOrgCode !== prevProps.Li_ContractOrgCode)
      || (this.props.Li_ContractType !== prevProps.Li_ContractType)
    ) {
      this.loadContractHistories();
    }
  }

  loadContractHistories() {
    this.setState({ isLoadingContractHistories: true });

    const { Li_ContractType, Li_ContractOrgCode } = this.props;

    axios.get('/api/contract-info-maintain/history-switching', {
      params: {
        Li_ContractType, Li_ContractOrgCode
      }
    })
      .then(res => {
        this.setState({
          contractHistoriesList: res.data,
        });
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingContractHistories: false }));
  }

  render() {
    return (
      <div className="history-switching">
        <Card title={<>契約年度 <Button type="primary" icon={<ReloadOutlined />} size="small" onClick={() => this.loadContractHistories()} loading={this.state.isLoadingContractHistories} /></>}>
          <Table
            loading={this.state.isLoadingContractHistories}
            dataSource={this.state.contractHistoriesList}
            size="small"
            rowKey={value => value.id}
            showHeader={false}
            pagination={false}
            scroll={{y: 400}}
          >
            <Table.Column dataIndex="contract_start_date_on" render={value => (
              moment(value).isValid() ? moment(value).format('YYYY/MM/DD') : value?.replace(/\-/g, '/')
            )} />
            <Table.Column dataIndex="contract_name" />
            <Table.Column width={60} render={(value, record) => (
              <Button type="primary" size="small" onClick={() => {
                  this.props.onSelected({
                    Lio_Date: record.contract_start_date_on,
                    recordData: record,
                  });
                }}
              >選択</Button>
            )} />
          </Table>
        </Card>
      </div>
    );
  }
}

export default WS0307071_HistorySwitching;
