import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { Button, Card, Space, Table, Form, Select, message } from 'antd';

import SetInfoChangeSubAction from 'redux/basicInfo/SetInfoMaintain/SetInfoChangeSub.action';

export class WS0299006_ConfirmScreen extends Component {
  formRef = React.createRef();

  static propTypes = {
    Li_SetCode: PropTypes.any,
    Li_StartDate: PropTypes.any,
    Li_Values: PropTypes.any,
    Li_DataScreen: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };


  constructor(props) {
    super(props)

    // document.title = '確認画面';

    this.state = {
      dataSource: [],
      ContractTypeList: []
    }
  }

  componentDidMount() {
    console.log(this.props.Li_DataScreen)
    this.setState({
      dataSource: this.props.Li_DataScreen?.ContractInspection,
      ContractTypeList: this.props.Li_DataScreen?.ContractTypeCombobox
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      console.log(this.props.Li_DataScreen)
      this.setState({
        dataSource: this.props.Li_DataScreen?.ContractInspection,
        ContractTypeList: this.props.Li_DataScreen?.ContractTypeCombobox
      })
    }
  }

  updateButton() {
    console.log(this.props.Li_Values)
    SetInfoChangeSubAction.updateButton(this.props.Li_Values)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lo_SetIdentify: this.props.Li_Values.SetIdentify,
            Lio_SetCode: this.props.Li_Values.SetCode,
            Lio_start_date_on: this.props.Li_Values.StartDate,
          });
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  render() {
    return (
      <div className="confirm-screen">
        <Card title="確認画面">
          <Table
            size='small'
            loading={false}
            dataSource={this.state.dataSource}
            pagination={false}
            rowKey={record => record.id}
            bordered
            scroll={{ y: 700 }}>
            <Table.Column dataIndex="ContractTypeChar" title="種別" width={120}
              render={(value, record, index) => {
                return (
                  <Select style={{ width: '100%' }} defaultValue={value?.toString()} disabled>
                    {this.state.ContractTypeList?.map(item => (
                      <Select.Option key={'ContractTypeChar-' + Math.random()} value={item.contract_type}>{item.name}</Select.Option>
                    ))}
                  </Select>
                )
              }}
            />
            <Table.Column dataIndex="W1_contract_org_cd" title="契約団体ｺｰﾄﾞ" width={120} />
            <Table.Column dataIndex="W1_contract_start_date" title="契約開始日" width={90} />
            <Table.Column dataIndex="W1_contract_num" title="番号" width={70} align='center'
              render={(value, record) => {
                return (
                  <div style={{ textAlign: 'right' }}> <span>{record.W1_contract_num === 0 ? '' : record.W1_contract_num}</span> </div>
                )
              }}
            />
            <Table.Column dataIndex="" title=" 契約名称"
              render={(value, record) => {
                return (
                  <Space>
                    <span>{record.medical_exam_course}</span>
                    <span>{record.contract_short_name}</span>
                  </Space>
                )
              }}
            />
          </Table>
          <br></br>
          <Button type="primary" style={{ float: 'right' }}
            onClick={() => {
              this.updateButton()
            }}>更新</Button>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS0299006_ConfirmScreen);
