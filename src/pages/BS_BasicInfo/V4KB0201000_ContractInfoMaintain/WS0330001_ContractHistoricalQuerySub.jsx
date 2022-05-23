import React from "react";
import PropTypes from 'prop-types';

import { Card, Table, Button } from "antd";
import { ReloadOutlined } from '@ant-design/icons';

import ContractHistoricalQuerySubService from 'services/basicInfo/ContractInfoMaintain/ContractHistoricalQuerySubService';
import moment from "moment";

class WS0330001_ContractHistoricalQuerySub extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Lo_ContractStartDate: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '契約履歴照会';

    this.state = {
      isLoadingList: false,

      startDateInsuran: {},
      //data test
      dataTable: [],
    };

    this.loadHistoryList = this.loadHistoryList.bind(this);
  }

  componentDidMount() {
    this.loadHistoryList();
  }

  loadHistoryList() {
    this.setState({ isLoadingList: true });

    ContractHistoricalQuerySubService.getHistoryList({
      Li_ContractType: this.props.Li_ContractType,
      Li_ContractOrgCode: this.props.Li_ContractOrgCode,
    })
      .then(res => {
        this.setState({
          dataTable: res.data,
        });
      })
      .catch(error => {

      })
      .finally(() => this.setState({ isLoadingList: false }))
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          ...this.state,
          startDateInsuran: selectedRows[0]
        })
      }
    }
    return (
      <div className="contract-historical-query-sub">
        <Card title={<>契約履歴照会 <Button type="primary" icon={<ReloadOutlined />} onClick={() => this.loadHistoryList()} loading={this.state.isLoadingList} size="small" /></>}>
          <Table
            dataSource={this.state.dataTable}
            loading={this.state.isLoadingList}
            pagination={false}
            rowKey={record => record.id}
          >
            <Table.Column title="契約開始日" dataIndex="contract_start_date_on" render={value => (
              moment(value).isValid() ? moment(value).format('YYYY/MM/DD') : '0000/00/00'
            )} />
            <Table.Column render={(value, record) => (
              <Button type="primary" style={{ float: "right", marginTop: "10px" }} onClick={() => {
                const fn = this.props.onFinishScreen || this.props.onClickedSelect;
                fn({
                  Lo_ContractStartDate: record.contract_start_date_on,
                  recordData: record,
                });
              }}>選択</Button>
            )} />
          </Table>
        </Card>
      </div>
    );
  }
}

export default WS0330001_ContractHistoricalQuerySub;
