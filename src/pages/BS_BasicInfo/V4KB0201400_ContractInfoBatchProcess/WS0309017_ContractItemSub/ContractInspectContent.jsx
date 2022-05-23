/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';

import { List, message, Tag } from 'antd';
import Images from 'constants/Images';

import axios from 'configs/axios';
import Color from 'constants/Color';

import { number_format } from 'helpers/CommonHelpers';

class ContractInspectContent extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_MedicalExamCourse: PropTypes.any,
    Li_DisplayCategory: PropTypes.any,

    header: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      tableData: [],
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    // this.loadData();
  }

  componentDidUpdate(prevProps) {
    // if (
    //   (this.props.Li_ContractNum !== prevProps.Li_ContractNum)
    //   || (this.props.Li_ContractOrgCode !== prevProps.Li_ContractOrgCode)
    //   || (this.props.Li_ContractStartDate !== prevProps.Li_ContractStartDate)
    //   || (this.props.Li_ContractNum !== prevProps.Li_ContractNum)
    //   || (this.props.Li_MedicalExamCourse !== prevProps.Li_MedicalExamCourse)
    //   || (this.props.Li_DisplayCategory !== prevProps.Li_DisplayCategory)
    // ) {
    //   this.loadData();
    // }
  }

  loadData() {
    this.setState({ loading: true });

    axios.get('/api/contract-info-batch-process/contract-item-sub/ContractInspectContent', {
      params: {
        ...this.props,
        header: undefined,
      },
    })
      .then(res => {
        this.setState({
          tableData: res.data.tableData,
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
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <List
        loading={this.state.loading}
        header={this.props.header}
        size="small"
        bordered
        style={{ height: '400px', overflowY: 'auto' }}
        dataSource={this.state.tableData}
        renderItem={item =>
          <List.Item key={`cic-${item.id}`} style={{ padding: '2px 7px' }}>
            <List.Item.Meta style={{ borderRight: '1px solid #f0f0f0' }}
              avatar={<img src={Images(item.data_division)} />}
              title={<>
                {item.set_management?.set_short_name}
                <Tag
                  visible={item.StsContractInspectCondition ? (item.contract_inspection_condition?.conditions == 1) : (item.set?.conditions_effective == 1)}
                  color={
                    (item.StsContractInspectCondition ? (item.contract_inspection_condition?.conditions == 1 ? Color(123) : Color(161)) : ((item.set?.conditions_effective == 1 ? Color(156) : Color(161)))).Background
                  }
                  style={{ float: 'right' }}
                >条</Tag>
              </>}
            />
            <div style={{ textAlign: 'right', width: '20%' }}>{(() => {
              const value = item.insurer_total_price
                + item.office_total_price
                + item.organization_total_price
                + item.personal_1_total_price
                + item.personal_2_total_price
                + item.personal_3_total_price;

              return value ? number_format(value) : null;
            })()}</div>
          </List.Item>
        }
      />
    );
  }
}

export default ContractInspectContent;
