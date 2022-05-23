import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Table, Form, Input, Button, Modal, Row, Col, Space, message } from "antd";
import WS1169001_DetailInfoCorrect from 'pages/KY_AssociationHealthInsuranceReport/V4KY0001000_AssociateInsureParamMaintain/WS1169001_DetailInfoCorrect.jsx';
import WS1170001_InspectInfoCorrect from 'pages/KY_AssociationHealthInsuranceReport/V4KY0001000_AssociateInsureParamMaintain/WS1170001_InspectInfoCorrect.jsx';
import WS1172001_ItemAmountCorrect from 'pages/KY_AssociationHealthInsuranceReport/V4KY0001000_AssociateInsureParamMaintain/WS1172001_ItemAmountCorrect.jsx';
import AssociateInsureParamMaintainAction from 'redux/AssociationHealthInsuranceReport/AssociateInsureParamMaintain/AssociateInsureParamMaintain.actions'
class WS1168001_AssociateInsureParamMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS06900:協会けんパラメータ保守';

    this.state = {
      isLoading: true,
      isLoadingTable: true,
      tableData: [],
      format: "",
      arrKeyCheck: [],
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount() {
    this.getInit()
  }
  getInit() {
    this.setState({ isLoading: true })
    AssociateInsureParamMaintainAction.getInit().then(res => {
      this.setState({
        tableData: res ? res : []
      })
      this.getDataScreenInput(res[0].format)
    })
      .finally(() => this.setState({ isLoading: false }))
  }
  getDataScreenInput(value) {
    this.setState({ isLoadingTable: true })
    AssociateInsureParamMaintainAction.input({ format: value }).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res
      })
      this.forceUpdate()
    })
      .finally(() => this.setState({ isLoadingTable: false }))
  }
  getParamCreate() {
    AssociateInsureParamMaintainAction.getParamCreate({ format: this.state.format }).then(res => {
      message.success(res);
    })
  }
  save() { 
    let dataSave = [];
    if (this.state.arrKeyCheck.length > 0) {
      this.state.arrKeyCheck.map(val => {
        this.formRef.current?.getFieldValue("tableData").find((value)=>{
          if(value.id === val){
            dataSave.push(value)
          }
        })  
      })
      if (this.state.arrKeyCheck.length === dataSave.length) { 
        AssociateInsureParamMaintainAction.save(dataSave).then(res => {
          message.success( res.message )
          this.getInit()
          this.setState({
            arrKeyCheck:[]
          })
        })
      }
    }

  }
  onFinish(values) { }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  render() {
    return (
      <div className="associate-insure-param-maintain">
        <Card title="V4-VNS06900:協会けんパラメータ保守">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            autoComplete="off">
            <div style={{ display: 'none' }}>
              <Form.Item name="StsInspect"><Input /></Form.Item>
              <Form.Item name="StsGuidance"><Input /></Form.Item>
            </div>
            <Row style={{ marginBottom: '1em' }}>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Space  >
                  <Button type="primary" onClick={() => this.getParamCreate()} >ﾊﾟﾗﾒｰﾀ生成</Button>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '80%',
                        component: (
                          <WS1169001_DetailInfoCorrect
                            Li_Format={this.formRef.current?.getFieldValue("format")}
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    });
                  }} >個人明細</Button>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '80%',
                        component: (
                          <WS1170001_InspectInfoCorrect
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    });
                  }} >個人詳細</Button>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '80%',
                        component: (
                          <WS1172001_ItemAmountCorrect
                            Li_Format={this.formRef.current?.getFieldValue("format")}
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    });
                  }} >個人金額</Button>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Table
                  dataSource={this.state.tableData}
                  size="small"
                  pagination={false}
                  loading={this.state.isLoading}
                  rowKey={(record) => record.id}
                  bordered={true}
                  scroll={{ y: 650 }}
                  style={{ width: '98%' }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        this.setState({
                          format: record.format
                        })
                        this.getDataScreenInput(record.format)
                      }
                    };
                  }}
                >
                  <Table.Column title="FORMAT" dataIndex="format" render={(value, record, index) => {
                    return <Form.Item style={{ marginBottom: '0px' }}>
                      <span>{value}</span>
                    </Form.Item>
                  }} />
                  <Table.Column title="備　　考" dataIndex="remarks" render={(value, record, index) => {
                    return <Form.Item style={{ marginBottom: '0px' }}>
                      <span>{value}</span>
                    </Form.Item>
                  }} />
                </Table>
              </Col>
              <Col span={18}>
                <Table
                  dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                  size="small"
                  pagination={false}
                  loading={this.state.isLoadingTable}
                  rowKey={(record) => record.id}
                  bordered={true}
                  scroll={{ y: 650 }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        const found = this.state.arrKeyCheck.indexOf(record.id) 
                        if (found < 0) {
                          let data = [...this.state.arrKeyCheck]
                          data.push(record.id)
                          this.setState({
                            arrKeyCheck: data
                          })
                        }
                      }

                    };
                  }}
                >
                  <Table.Column title="SEQ" width={100} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'seq']} style={{ marginBottom: '0px' }}>
                      <Input type="number" style={{ border: '0px' }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="備　考" render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'remarks']} style={{ marginBottom: '0px' }}>
                      <Input style={{ border: '0px' }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="種　別" render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'kind']} style={{ marginBottom: '0px' }}>
                      <Input style={{ border: '0px' }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="属" width={100} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'attribute']} style={{ marginBottom: '0px' }}>
                      <Input style={{ border: '0px' }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="桁数" width={100} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'number_of_digits']} style={{ marginBottom: '0px' }}>
                      <Input type="number" style={{ border: '0px' }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="位置" width={100} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'position']} style={{ marginBottom: '0px' }}>
                      <Input type="number" style={{ border: 'none' }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="設定" width={100} render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'set_pattern']} style={{ marginBottom: '0px' }}>
                      <Input style={{ border: '0px' }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="チェック" render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'error_checking']} style={{ marginBottom: '0px' }}>
                      <Input style={{ border: '0px' }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="オ　プ　シ　ョ　ン" render={(value, record, index) => {
                    return <Form.Item name={['tableData', index, 'option_remark']} style={{ marginBottom: '0px' }}>
                      <Input style={{ border: '0px' }} />
                    </Form.Item>
                  }} />
                </Table>
              </Col>
            </Row>
            <Button style={{ float: 'right', marginTop: '1em' }} type="primary" onClick={() => this.save()} >SAVE</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1168001_AssociateInsureParamMaintain);
