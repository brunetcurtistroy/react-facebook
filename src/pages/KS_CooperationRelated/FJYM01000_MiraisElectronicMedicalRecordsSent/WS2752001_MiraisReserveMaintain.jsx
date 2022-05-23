import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Col, Row, Table, Menu, Dropdown, Form, Checkbox, Input, Radio, message, Button, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import MiraisReserveMaintainAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisReserveMaintain.actions'
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
class WS2752001_MiraisReserveMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = 'Mirais予約保守';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isloadding: false,
      isLoadding2: false,
      selectedRow1: {},
      count: "a",
      count2: "b",
      timeOutId: null
    };
  }
  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      tableData: [],
      tableData2: []
    })
    this.GetListData()
  }
  GetListData() {
    this.setState({ isloadding: true })
    MiraisReserveMaintainAction.GetListData().then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res
      })
      if (res?.[0]) {
        this.setState({ selectedRow1: res[0] })
        this.ListDataNum(res[0])
      } else {
        this.setState({ selectedRow1: {} })
        this.formRef.current?.setFieldsValue({
          tableData2: []
        })
      }

    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))
  }
  ListDataNum(data) {
    this.formRef.current.setFieldsValue({
      DayWeek: data?.DayOfWeek
    })
    this.forceUpdate()
    this.setState({ isloadding2: true }) 
    MiraisReserveMaintainAction.ListDataNum(data)
    .then(res => {
      let data = res ? res : []
      data.map(x => x.time_at = x.time_at?.substr(0, 5))
      this.formRef.current?.setFieldsValue({
        tableData2: data
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding2: false }))
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  AddNewRow() {
    const { count } = this.state;
    const newData = {
      id: count, reservations_department: "", reservations_item_code: "", name: "", reservations_act_code: "", enabled: false,
      reservations_comment: "", DayOfWeek: ""
    };
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count1: count + 1
    })
  }
  SaveAndInsert(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    for (const key in arr) {
      if (arr[key].id === record.id) {
        if (this.isEmpty(arr[key].reservations_department) && this.isEmpty(arr[key].reservations_item_code)) {
          return
        }
        if (isNaN(record.id)) {
          let obj = {
            reservations_department: arr[key].reservations_department,
            reservations_item_code: arr[key].reservations_item_code,
            name: arr[key].name,
            enabled: arr[key].enabled ? 1 : 0,
            reservations_comment: arr[key].reservations_comment, remarks: arr[key].remarks
          }
          this.Save(obj)
          return
        } else {
          this.Save(arr[key])
          return
        }
      }
    }
  }
  Save(obj) {
    this.setState({ isloadding: true })
    MiraisReserveMaintainAction.SaveData(obj).then(res => {
      this.GetListDataByCondition(this.state.selectedRow1)
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))
  }
  Delete(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    if (isNaN(record.id)) {
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1)
          this.formRef.current?.setFieldsValue({
            tableData: arr
          })
          this.forceUpdate()
        }
      })
    } else {
      //delete DB  
      this.setState({ isloadding: true })
      MiraisReserveMaintainAction.Delete({ id: record.id }).then(res => {
        if (this.state.selectedRow1?.id === record.id) {
          this.GetListData()
        } else {
          this.GetListDataByCondition(this.state.selectedRow1)
        }
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isloadding: false }))
    }
  }
  GetListDataByCondition(obj) {
    this.setState({ isloadding: true })
    MiraisReserveMaintainAction.GetListData().then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res
      })
      if (obj) {
        this.ListDataNum(obj)
      } else {
        this.setState({ selectedRow1: {} })
        this.formRef.current?.setFieldsValue({
          tableData2: []
        })
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))
  }
  AddNewRowNum() {
    const { count2 } = this.state;
    const newData = { id: count2, number_frame: "", time_at: "" };
    let data = [...this.formRef.current?.getFieldValue("tableData2")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData2: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count2: count2 + 1
    })
  }
  DeleteNum(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData2")];
    if (isNaN(record.id)) {
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1)
          this.formRef.current?.setFieldsValue({
            tableData2: arr
          })
          this.forceUpdate()
        }
      })
    } else {
      //delete DB  
      this.setState({ isLoadding2: true })
      MiraisReserveMaintainAction.DeleteNum({
        id: record.id, reservations_department: this.state.selectedRow1.reservations_department,
        reservations_item_code: this.state.selectedRow1.reservations_item_code
      }).then(res => {
        this.ListDataNum(this.state.selectedRow1)
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isLoadding2: false }))
    }
  }
  SaveAndInsertNum(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData2")];
    for (const key in arr) {
      if (arr[key].id === record.id) {
        if (isNaN(record.id)) {
          let obj = {
            reservations_department: this.state.selectedRow1.reservations_department,
            reservations_item_code: this.state.selectedRow1.reservations_item_code,
            DayOfWeek: this.formRef.current?.getFieldValue("DayWeek"),
            time_at: arr[key].time_at,
            number_frame: arr[key].number_frame
          }
          this.SaveNum(obj)
          return
        } else { 
          arr[key].reservations_department= this.state.selectedRow1.reservations_department
          arr[key].reservations_item_code= this.state.selectedRow1.reservations_item_code
          arr[key].DayOfWeek =  this.formRef.current?.getFieldValue("DayWeek")
          this.SaveNum(arr[key])
          return
        }
      }
    }
  }
  SaveNum(obj) {
    this.setState({ isLoadding2: true })
    MiraisReserveMaintainAction.SaveDataNum(obj).then(res => {
      this.ListDataNum(this.state.selectedRow1)
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoadding2: false }))
  }
  OnChangeTime(value, index) {
    if (this.state.timeOutId) {
      clearTimeout(this.state.timeOutId)
    }
    const namePath = ['tableData2', index, 'time_at']
    if (isNaN(value)) {
      var isValid = /^([0-9]{1,2}(\:[0-9]{1,2})?)$/.test(value);
      if (!isValid) {
        this.formRef.current?.setFields([{
          name: namePath,
          value: ""
        }])
        this.forceUpdate()
      }
    } else {
      if (value.length > 0) {
        if (value.length > 4) {
          value.slice(0, 4)
        }
        this.setState({
          timeOutId:
            setTimeout(() => {
              let time;
              if (value.length === 1) {
                time = "0" + value + ":00"
              } else if (value.length === 2) {
                time = value + ":00"
              } else if (value.length === 3) {
                let hour = value?.substr(0, 2);
                let secons = value?.substr(2, 1);
                time = hour + ":0" + secons
              } else {
                let hour = value?.substr(0, 2);
                let secons = value?.substr(2, 2);
                time = hour + ":" + secons
              }
              this.formRef.current?.setFields([{
                name: namePath,
                value: time
              }])
              this.forceUpdate()
            }, 500)
        })
      }
    }
  }
  OnchangeDayWeek(e){ 
      let obj = this.state.selectedRow1
      obj.DayOfWeek = e.target.value
      this.ListDataNum(obj)
  }
  render() {
    const { childModal } = this.state;
    return (
      <div className="mirais-reserve-maintain">
        <Card title="Mirais予約保守">
          <Form ref={this.formRef} autoComplete="off" >
            <Row gutter={16}>
              <Col span={16}>
                <Table
                  dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                  loading={this.state.isloadding}
                  pagination={false} size="small" scroll={{ y: 500 }}
                  rowKey={(record) => record.id}
                  rowSelection={{
                    type: 'radio',
                    onChange: async (selectedRowKeys, selectedRows) => {
                      this.ListDataNum(selectedRows[0])
                      this.formRef.current.setFieldsValue({
                        DayWeek: selectedRows[0].DayOfWeek
                      })
                      this.forceUpdate()
                      await this.setState({ selectedRow1: selectedRows[0] })
                    }
                  }}
                  className="mb-2"
                  bordered={true}
                >
                  <Table.Column title="科項目" width={150}
                    render={(value, record, index) => (
                      <Row >
                        <Col span={8}>
                          <Form.Item name={['tableData', index, 'reservations_department']} style={{ marginBottom: "0" }}>
                            <Input maxLength={2} style={{ width: '98%' }} ></Input>
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item name={['tableData', index, 'reservations_item_code']} style={{ marginBottom: "0" }}>
                            <Input maxLength={5} ></Input>
                          </Form.Item>
                        </Col>
                      </Row>
                    )}
                  />
                  <Table.Column title="名称"
                    render={(value, record, index) => (
                      <Form.Item name={['tableData', index, 'name']} style={{ marginBottom: "0" }}>
                        <Input maxLength={20}></Input>
                      </Form.Item>
                    )}
                  />
                  <Table.Column title="行為"
                    render={(value, record, index) => (
                      <Form.Item name={['tableData', index, 'reservations_act_code']} style={{ marginBottom: "0" }}>
                        <Input maxLength={6}></Input>
                      </Form.Item>
                    )}
                  />
                  <Table.Column title="統合" width={60}
                    render={(value, record, index) => {
                      return <Form.Item name={['tableData', index, 'enabled']} style={{ marginBottom: '0px' }} valuePropName="checked" >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    }}
                  />
                  <Table.Column title="コメント"
                    render={(value, record, index) => (
                      <Form.Item name={['tableData', index, 'reservations_comment']} style={{ marginBottom: "0" }}>
                        <Input maxLength={60}></Input>
                      </Form.Item>
                    )}
                  />
                  <Table.Column width={60} align='center'
                  title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewRow()}  ></Button>}
                    render={(text, record, index) => {
                      return <>
                        <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                          onClick={() => this.SaveAndInsert(record)}
                        ></Button>
                        <Button size='small' style={{ border: 'none' }} danger icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？', 
                              onOk: () => this.Delete(record)
                            })
                          }}
                        ></Button>
                      </>
                    }}
                  />
                </Table>
                <Form.Item name="remarks">
                  <Input.TextArea maxLength={256} row={5}></Input.TextArea>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="DayWeek">
                  <Radio.Group onChange={(e)=>this.OnchangeDayWeek(e)}  >
                    <Radio value={1}>日</Radio>
                    <Radio value={2}>月</Radio>
                    <Radio value={3}>火</Radio>
                    <Radio value={4}>水</Radio>
                    <Radio value={5}>木</Radio>
                    <Radio value={6}>金</Radio>
                    <Radio value={7}>土</Radio>
                  </Radio.Group>
                </Form.Item>
                <Table
                  dataSource={this.formRef.current?.getFieldValue('tableData2') ? this.formRef.current?.getFieldValue('tableData2') : []}
                  loading={this.state.isLoadding2} bordered={true}
                  pagination={false} size="small" scroll={{ y: 600 }}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="時間帯" render={(value, record, index) => {
                    return <Form.Item name={['tableData2', index, 'time_at']} style={{ marginBottom: '0px' }}>
                      <Input maxLength={5} onChange={(e) => this.OnChangeTime(e.target.value, index)} />
                    </Form.Item>
                  }} />
                  <Table.Column title="人数枠" render={(value, record, index) => {
                    return <Form.Item name={['tableData2', index, 'number_frame']} style={{ marginBottom: '0px' }}>
                      <Input maxLength={5} className='floatRight' onChange={(e) => {
                        let value = e.target.value;
                        const namePath = ['tableData2', index, 'number_frame'];
                        if (isNaN(value)) {
                          this.formRef.current?.setFields([
                            {
                              name: namePath,
                              value: ""
                            }
                          ])
                          this.forceUpdate()
                        } else {
                          if (value.length > 5) {
                            this.formRef.current?.setFields([
                              {
                                name: namePath,
                                value: value.slice(0, 5)
                              }
                            ])
                            this.forceUpdate()
                          }
                        }
                      }} />
                    </Form.Item>
                  }} />
                  <Table.Column width={60} align='center'
                  title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewRowNum()}  ></Button>}
                    render={(text, record, index) => {
                      return <>
                        <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                          onClick={() => this.SaveAndInsertNum(record)}
                        ></Button>
                        <Button size='small' style={{ border: 'none' }} danger icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？',
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () => this.DeleteNum(record)
                            })
                          }}
                        ></Button>
                      </>
                    }}
                  />
                </Table>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2752001_MiraisReserveMaintain);
