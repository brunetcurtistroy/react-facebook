import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input, Space, Button, message, Modal } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import {
  getDataInputSupportPlanEtcAction, saveAndUpdateInputSupportPlanEtcAction, deleteInputSupportPlanEtcAction
} from "redux/SpecificInsureMaintenance/SpecificHealthTokuhoParamMaintain/InputSupportPlanEtc.actions";
import { deletePrintParamMaintainAction } from "redux/ResultOutput/PrintParamMaintain/PrintParamMaintain.actions";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS1308004_InputSupportPlanEtc extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '入力[支援計画等]';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      DataItem: [],
      isLoading: true,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    const params = {
      format: this.props.format,
      remarks: this.props.remarks
    }
    this.getDataInputSupportPlanEtc(params);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      const params = {
        format: this.props.format,
        remarks: this.props.remarks
      }
      this.getDataInputSupportPlanEtc(params);
    }
  }

  getDataInputSupportPlanEtc = (params) => {
    this.setState({ isLoading: true });
    getDataInputSupportPlanEtcAction(params)
      .then(res => {
        if (res) {
          this.setState({ DataItem: res.data.DataItem });
          this.formRef?.current?.setFieldsValue(res.data)
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  saveAndUpdateInputSupportPlanEtc = (params) => {
    params = {
      ...params,
      format: this.props.format
    }
    saveAndUpdateInputSupportPlanEtcAction(params)
      .then(res => {
        message.success('成功');
        this.getDataInputSupportPlanEtc({
          format: this.props.format,
          remarks: this.props.remarks
        });
      })
      .catch(() => message.error('エラー'))
  }

  deleteInputSupportPlanEtc = (record) => {
    if (record.id) {
      deleteInputSupportPlanEtcAction({ id: record.id })
        .then(res => {
          message.success('成功');
          this.getDataInputSupportPlanEtc({
            format: this.props.format,
            remarks: this.props.remarks
          });
        })
        .catch(err => message.error('エラー'))
    } else {
      let arrTemp = [...this.state.DataItem];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ 'DataItem': arrTemp });
      this.setState({ DataItem: arrTemp });
    }
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  handleChangeInput = (event, record) => {
    let { value, name } = event.target;
    let arrTemp = [...this.state.DataItem];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp
      this.setState({ DataItem: arrTemp })
      this.formRef.current.setFieldsValue({ 'DataItem': arrTemp });
    }
  }

  render() {
    return (
      <div className="input-support-plan-etc">
        <Card title="入力[支援計画等]">
          <Form ref={this.formRef}>
            <Space>
              <Form.Item label='FORMAT' name='format'>
                <Input readOnly/>
              </Form.Item>
              <Form.Item name='remarks'>
                <Input readOnly/>
              </Form.Item>
            </Space>

            <Table
              dataSource={this.state.DataItem}
              loading={this.state.isLoading}
              pagination={this.state.pagination}
              rowKey={(record) => record.id}
            >
              <Table.Column title='区分' dataIndex='division'
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.DataItem, record.id);
                  return (
                    <Form.Item name={['DataItem', index, 'division']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={6} onChange={(e) => this.handleChangeInput(e, record)} name='division' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title='備　考' dataIndex='remarks'
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.DataItem, record.id);
                  return (
                    <Form.Item name={['DataItem', index, 'remarks']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={20} onChange={(e) => this.handleChangeInput(e, record)} name='remarks' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title='種  別' dataIndex='kind'
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.DataItem, record.id);
                  return (
                    <Form.Item name={['DataItem', index, 'kind']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={10} onChange={(e) => this.handleChangeInput(e, record)} name='kind' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title='属性' dataIndex='attribute'
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.DataItem, record.id);
                  return (
                    <Form.Item name={['DataItem', index, 'attribute']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={10} onChange={(e) => this.handleChangeInput(e, record)} name='attribute' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title='桁数' dataIndex='number_of_digits'
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.DataItem, record.id);
                  return (
                    <Form.Item name={['DataItem', index, 'number_of_digits']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={6} type='number' min={1}
                        onChange={(e) => this.handleChangeInput(e, record)} name='number_of_digits' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title='位置' dataIndex='position'
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.DataItem, record.id);
                  return (
                    <Form.Item name={['DataItem', index, 'position']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={6} type='number' min={1}
                        onChange={(e) => this.handleChangeInput(e, record)} name='position' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title='設定' dataIndex='set_pattern'
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.DataItem, record.id);
                  return (
                    <Form.Item name={['DataItem', index, 'set_pattern']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={10} onChange={(e) => this.handleChangeInput(e, record)} name='set_pattern' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title='オ プ シ ョ ン' dataIndex='option_remark'
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.DataItem, record.id);
                  return (
                    <Form.Item name={['DataItem', index, 'option_remark']} style={styleFormItem}>
                      <Input style={styleInput} onChange={(e) => this.handleChangeInput(e, record)} name='option_remark' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column align='center' width={80}
                title={() => (<Button size='small' type='primary'
                  icon={<PlusOutlined />} onClick={() => {
                    let arrTemp = [{}];
                    this.formRef.current.setFieldsValue({ 'DataItem': [...arrTemp, ...this.state.DataItem] });
                    this.setState({ DataItem: [...arrTemp, ...this.state.DataItem] });
                  }}></Button>)}
                render={(text, record, index) => (
                  <>
                    <Button size='small' style={{ border: 'none', }}
                      icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.saveAndUpdateInputSupportPlanEtc(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none', }}
                      danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.deleteInputSupportPlanEtc(record)
                        })
                      }}
                    ></Button>
                  </>
                )}
              />
            </Table>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1308004_InputSupportPlanEtc);
