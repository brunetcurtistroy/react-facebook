import { PlusOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Col, Form, Input, message, Row, Table, Button, Modal } from "antd";
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import InputListAction from 'redux/SpecificInsureMaintenance/XmlParamMaintain/InputList.actions';
const styFrm = {
  marginBottom: '0px'
}
class WS1309003_InputList extends React.Component {
  static propTypes = {
    format: PropTypes.any,
    remarks: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '入力[一覧]';
    this.state = {
      isloaddingTable: false,
      count: "a"
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
    this.setState({ isloaddingTable: true })
    const data = { format: this.props?.format, remarks: this.props?.remarks }
    InputListAction.getInit(data).then(res => {
      this.formRef.current?.setFieldsValue({
        format: res?.format,
        remarks: res?.remarks,
        tableData: res?.M40XmlParameterFiles
      })
      this.forceUpdate()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isloaddingTable: false }))
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  AddNewData() {  
      this.handleAdd(); 
  }
  handleAdd() {
    const { count } = this.state;
    const newData = { id: count, division: "", remarks: "", kind: "", attribute: "", number_of_digits: "", position: "", set_pattern: "", option_remark: "" };
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
    })
  }
  Save(record) {
    let dataSave = [...this.formRef.current?.getFieldValue("tableData")];
    for (let index = 0; index < dataSave.length; index++) {
      const id = dataSave[index].id
      if (record.id === id) {
        if (!this.isEmpty(dataSave[index].division)) {
          if (isNaN(record.id)) {
            let objSave = {
              id: "", division: dataSave[index].division, remarks: dataSave[index].remarks, kind: dataSave[index].kind, attribute: dataSave[index].attribute,
              number_of_digits: dataSave[index].number_of_digits, position: dataSave[index].position, set_pattern: dataSave[index].set_pattern, option_remark: dataSave[index].option_remark
              , format: this.props.format
            }
            this.SaveData(objSave)
          } else {
            let objSave = dataSave[index]
            objSave.format = this.props.format;
            this.SaveData(objSave)
          }
          return
        }
      }
    }
  }
  SaveData(data) {
    InputListAction.Save(data).then(res => {
      this.GetInit(data)
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
      InputListAction.Delete({id: record.id}).then(res=>{
        this.GetInit()
      })
    }
  }
  render() {
    return (
      <div className="input-list">
        <Card title="入力[一覧]">
          <Form ref={this.formRef} autoComplete="off" initialValues={{ format: "", remarks: "" }} >
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
            <Table
              dataSource={this.formRef.current?.getFieldValue('tableData') ? this.formRef.current?.getFieldValue('tableData') : []}
              loading={this.state.isloaddingTable}
              pagination={false} bordered={true} size="small" scroll={{ y: 500 }}
              rowKey={(record) => record.id}
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
              <Table.Column title="オ プ シ ョ ン" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'option_remark']} style={styFrm} >
                  <Input maxLength={1024} />
                </Form.Item>
              }} />
              <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                render={(text, record, index) => {
                  return <>
                    <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.Save(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none' }} danger  icon={<DeleteOutlined />}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1309003_InputList);
