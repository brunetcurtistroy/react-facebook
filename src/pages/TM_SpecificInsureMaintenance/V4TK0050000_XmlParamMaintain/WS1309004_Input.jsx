import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Modal, Row, Table } from "antd";
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import InputAction from 'redux/SpecificInsureMaintenance/XmlParamMaintain/Input.actions';
const { TextArea } = Input;
const styFrm = {
  marginBottom: '0px'
}
class WS1309004_Input extends React.Component {
  static propTypes = {
    format: PropTypes.any,
    remarks: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '入力';

    this.state = {
      isLoadding: false,
      isLoadding2: false,
      selectedRow: {},
      count: "a",
      count1: "b",
    };
  }
  componentDidMount() {
    this.GetInit()
  }
  componentDidUpdate(preV) {
    if (this.props !== preV) {
      this.GetInit()
    }
  }
  GetInit() {
    this.setState({ isLoadding: true })
    const data = { format: this.props?.format ? this.props?.format : "", remarks: this.props?.remarks ? this.props?.remarks : "" }
    InputAction.GetInit(data).then(res => {
      this.formRef.current?.setFieldsValue({
        format: res?.format,
        remarks: res?.remarks,
        tableData: res?.M40XmlParameterFiles
      })
      if (res && res?.M40XmlParameterFiles?.length > 0) {
        this.setState({ ...this.state.selectedRow, selectedRow: res?.M40XmlParameterFiles?.[0] })
        this.GetOptionInput()
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isLoadding: false }))
  }
  GetOptionInput() {
    this.setState({ isLoadding2: true })
    this.formRef.current?.setFieldsValue({
      option_remark: this.state.selectedRow.option_remark
    })
    InputAction.GetOptionInput(this.state.selectedRow).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData2: res?.W1_item
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isLoadding2: false }))
  }
  AddNewData() {
    this.handleAdd();
  }
  handleAdd() {
    const { count } = this.state;
    const newData = { id: count, division: "", remarks: "", kind: "", attribute: "", number_of_digits: "", position: "", set_pattern: "" };
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({ ...this.state, count: count + 1 })
  }  
  Save() {
    let arrInput = {}
    const dataOption = this.formRef.current?.getFieldValue("tableData");
    if (dataOption.length > 0) {
      for (let idx = 0; idx < dataOption.length; idx++) {
        if (this.state.selectedRow.id === dataOption[idx].id) { 
          dataOption[idx].option_remark = this.formRef.current?.getFieldValue("option_remark");
          dataOption[idx].format = this.formRef.current?.getFieldValue("format");
          if (isNaN(dataOption[idx].id)) {
            arrInput = { ...dataOption[idx] };
            arrInput.id = "" 
            this.SaveData(arrInput)
            return
          } else { 
            this.SaveData(dataOption[idx])
            return
          }
        }
      }
    }
  }
  SaveData(data) {
    InputAction.Save(data).then(res => {
      this.loadReData()
    })
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
      for (let i = 0; i < arr.length; i++) {
        if (record.id === arr[i].id) {
          this.setState({ isLoadding: true })
          InputAction.Delete({ id: arr[i].id }).then(res => {
            this.loadReData()
          }).catch(error => {
            const res = error.response;
            if (!res || res.data || res.data.message) {
              message.error('エラーが発生しました');
            }
          }).finally(() => this.setState({ isLoadding: false }))
        }
      }
    }
  } 
  handleAddOption() {
    const { count1 } = this.state;
    const newData = { id: count1, W1_serial_num: "", W1_item: "", W1_content: "" };
    let data = [...this.formRef.current?.getFieldValue("tableData2")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData2: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count1: count1 + 1,
    })
  }
  DeleteOption(record) {
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
      for (let i = 0; i < arr.length; i++) {
        if (record.id === arr[i].id) {
          this.setState({ isLoadding2: true })
          arr[i].option_remark = this.state.selectedRow.option_remark
          arr[i].id = this.state.selectedRow.id
          InputAction.DeleteOption(arr[i]).then(res => {
            this.loadReData()
          }).catch(error => {
            const res = error.response;
            if (!res || res.data || res.data.message) {
              message.error('エラーが発生しました');
            }
          }).finally(() => this.setState({ isLoadding2: false }))

        }
      }
    }
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  loadReData() {
    this.setState({ isLoadding: true })
    const data = { format: this.props?.format ? this.props?.format : "", remarks: this.props?.remarks ? this.props?.remarks : "" }
    InputAction.GetInit(data).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res?.M40XmlParameterFiles
      })
      let data = res?.M40XmlParameterFiles
      if (res && data?.length > 0) {
        for (let ind = 0; ind < data.length; ind++) {
          if (data[ind].id === this.state.selectedRow.id) {
            this.setState({ ...this.state.selectedRow, selectedRow: data[ind] })
            this.GetOptionInput()
            return
          }
          if (data.length - 1 === ind) {
            this.setState({ ...this.state.selectedRow, selectedRow: data[0] })
            this.GetOptionInput()
          }
        }
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isLoadding: false }))
  }
  SaveOption(){
    let arrData = this.formRef.current?.getFieldValue("tableData2")
    let dataSave=[]
    arrData?.map((value, index)=>{
      if( !this.isEmpty(value.W1_serial_num) || !this.isEmpty(value.W1_item)){
         let objData= {...value}
        if(isNaN(value.id)){
          objData.id =""
        }
        dataSave.push(objData)
      }
      if(index === arrData.length -1){
        let obj = {};
        obj.id = this.state.selectedRow?.id
        obj.W1_item = dataSave 
        InputAction.SaveOption(obj).then(res=>{
          this.loadReData()
        })
      }
    })
  }
  render() {
    return (
      <div className="input">
        <Card title="入力">
          <Form ref={this.formRef} autoComplete="off" initialValues={{ format: "", remarks: "",option_remark:"" }} >
            <Row>
              <Col span={2} style={{ textAlign: 'right' }}>
                <Form.Item>
                  <span>FORMAT</span>
                </Form.Item>
              </Col>
              <Col span={6} >
                <Form.Item name="format">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12} >
                <Form.Item name="remarks">
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Table
                  dataSource={this.formRef.current?.getFieldValue('tableData') ? this.formRef.current?.getFieldValue('tableData') : []}
                  loading={this.state.isLoadding}
                  pagination={false} bordered={true} size="small" scroll={{ y: 500, x: 1000 }} style={{ width: '98%' }}
                  rowKey={(record) => record.id}
                  rowSelection={{
                    type: 'radio',
                    onChange: async (selectedRowKeys, selectedRows) => {
                      await this.setState({
                        selectedRow: selectedRows[0]
                      })
                      this.GetOptionInput()
                    }
                  }}

                >
                  <Table.Column title="区分" width={105} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'division']} style={styFrm} >
                      <Input maxLength={6} />
                    </Form.Item>
                  }} />
                  <Table.Column title="備　考" width={220} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'remarks']} style={styFrm} >
                      <Input maxLength={20} />
                    </Form.Item>
                  }} />
                  <Table.Column title="種  別" width={120} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'kind']} style={styFrm} >
                      <Input maxLength={10} />
                    </Form.Item>
                  }} />
                  <Table.Column title="属性" width={120} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'attribute']} style={styFrm} >
                      <Input maxLength={10} />
                    </Form.Item>
                  }} />
                  <Table.Column title="桁数" width={105} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'number_of_digits']} style={styFrm} >
                      <Input maxLength={6} onChange={(e) => {
                        if (isNaN(e.target.value)) {
                          const namePath = ['tableData', index, 'number_of_digits']
                          this.formRef.current.setFields([{
                            name: namePath,
                            value: ""
                          }])
                        }
                      }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="位置" width={105} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'position']} style={styFrm} >
                      <Input maxLength={6} onChange={(e) => {
                        if (isNaN(e.target.value)) {
                          const namePath = ['tableData', index, 'position']
                          this.formRef.current.setFields([{
                            name: namePath,
                            value: ""
                          }])
                        }
                      }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="設定" width={120} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'set_pattern']} style={styFrm} >
                      <Input maxLength={10} />
                    </Form.Item>
                  }} />
                  <Table.Column width={80} dataIndex="id" title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                    render={(text, record, index) => {
                      return <>
                        <Button size='small' style={{ border: 'none' }} disabled={this.state.selectedRow.id === text ? false : true} icon={<SaveOutlined style={{ color: 'green' }} />}
                          onClick={() => this.Save()}
                        ></Button>
                        <Button size='small' style={{ border: 'none' }} danger disabled={this.state.selectedRow.id === text ? false : true} icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？',
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () => this.Delete(record)
                            })
                          }}
                        ></Button>
                      </>
                    }}
                  />
                </Table>
              </Col>
              <Col span={8}>
                <Table
                  dataSource={this.formRef.current?.getFieldValue('tableData2') ? this.formRef.current?.getFieldValue('tableData2') : []}
                  loading={this.state.isLoadding2}
                  pagination={false} bordered={true} size="small" scroll={{ y: 500 }} style={{ width: '98%' }}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="連番" width={60} render={(value, record, index) => {
                    return <Form.Item name={['tableData2', index, 'W1_serial_num']} style={styFrm} >
                      <Input maxLength={2} onBlur={(e) => {
                        const namePath = ['tableData2', index, 'W1_serial_num']
                        this.formRef.current.setFields([{
                          name: namePath,
                          value: e.target.value?.trim()
                        }])
                      }}
                        onChange={(e) => {
                          const namePath = ['tableData2', index, 'W1_serial_num']
                          if (isNaN(e.target.value)) {
                            this.formRef.current.setFields([{
                              name: namePath,
                              value: ""
                            }])
                          }
                        }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="項目" render={(value, record, index) => {
                    return <Form.Item name={['tableData2', index, 'W1_item']} style={styFrm} >
                      <Input maxLength={1000} />
                    </Form.Item>
                  }} />
                  <Table.Column title="内容" render={(value, record, index) => {
                    return <Form.Item name={['tableData2', index, 'W1_content']} style={styFrm} >
                      <Input maxLength={1000} />
                    </Form.Item>
                  }} />
                  <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.handleAddOption()}  ></Button>}
                    render={(text, record, index) => {
                      return <>
                        <Button size='small' style={{ border: 'none' }}  icon={<SaveOutlined style={{ color: 'green' }} />}
                          onClick={() => this.SaveOption(record)}
                        ></Button>
                        <Button size='small' style={{ border: 'none' }} danger icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？',
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () => this.DeleteOption(record)
                            })
                          }}
                        ></Button>
                      </>
                    }}
                  />
                </Table>
              </Col>
            </Row>
            <Form.Item name="option_remark">
              <TextArea rows={3} />
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1309004_Input);
