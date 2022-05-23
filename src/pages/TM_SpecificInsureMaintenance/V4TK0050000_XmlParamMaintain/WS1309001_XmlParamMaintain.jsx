import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Form, Input, Menu, message, Modal, Space, Table } from "antd";
import WS1309003_InputList from 'pages/TM_SpecificInsureMaintenance/V4TK0050000_XmlParamMaintain/WS1309003_InputList.jsx';
import WS1309004_Input from 'pages/TM_SpecificInsureMaintenance/V4TK0050000_XmlParamMaintain/WS1309004_Input.jsx';
import React from "react";
import { connect } from "react-redux";
import XmlParamMaintainAction from 'redux/SpecificInsureMaintenance/XmlParamMaintain/XmlParamMaintain.actions';
import WS1309011_CopyingProcess from 'pages/TM_SpecificInsureMaintenance/V4TK0050000_XmlParamMaintain/WS1309011_CopyingProcess.jsx';
import WS1310001_ItemConvertCodeTblMaintain from 'pages/TM_SpecificInsureMaintenance/V4TK0050000_XmlParamMaintain/WS1310001_ItemConvertCodeTblMaintain.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1309001_XmlParamMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'V4-XML01025:XMLパラメータ保守';

    this.state = {
      isLoading: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,

      },
      count: "a"
    };
  }
  componentDidMount() {
    this.loadInit()
  }
  loadInit() {
    this.setState({ isLoading: true })
    XmlParamMaintainAction.getInit().then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res ? res : []
      })
      this.forceUpdate()
    })
      .finally(() => this.setState({ isLoading: false }))
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  handleAdd = (record) => {
    const { count } = this.state;
    const newData = {
      id: count,
      check: true
    };
    let index = this.formRef.current?.getFieldValue("tableData").findIndex(value => value === record);
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.splice(index + 1, 0, newData);
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1
    })
  };
  save() {
    let dataSave = []
    let index = 0;
    this.formRef.current?.getFieldValue("tableData")?.map(value => {
      if (isNaN(value.id)) {
        dataSave.push(value)
      }
      index++;
    })
    if (dataSave.length > 0) {
      if (index === this.formRef.current?.getFieldValue("tableData")?.length) {
        XmlParamMaintainAction.save(dataSave).then(res => {
          message.success(res?.message)
          this.loadInit()
        })
      }
    }
  }
  delete(record) {
    XmlParamMaintainAction.delete({ format: record.format }).then(res => {
      message.success(res?.message)
      this.loadInit()
    })
  }
  ShowItemConvertCodeTblMaintain(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS1310001_ItemConvertCodeTblMaintain 
            onFinishScreen={(output) => { 
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  render() {
    return (
      <div className="xml-param-maintain">
        <Card title={ <Button onClick={()=>this.ShowItemConvertCodeTblMaintain()} >特健CD</Button> }>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            autoComplete="off">
            <div style={{ display: 'none' }}>
              <Form.Item name="StsInspect"> <Input /></Form.Item>
              <Form.Item name="StsGuidance"> <Input /></Form.Item>
            </div>
            <Table
              dataSource={this.formRef.current?.getFieldValue("tableData")}
              size="small"
              pagination={false}
              loading={this.state.isLoading}
              rowKey={(record) => record.id}
              bordered={true}
              scroll={{ y: 500 }}
            >
              <Table.Column title="種　別" dataIndex="Expression_10" />
              <Table.Column title="ＦＯＲＭＡＴ" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'format']} style={{ marginBottom: '0px' }}>
                  <Input readOnly={record?.check ? false : true} style={{ border: 'none' }} /></Form.Item>
              }} />
              <Table.Column title="備考" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'remarks']} style={{ marginBottom: '0px' }}>
                  <Input readOnly={record?.check ? false : true} /></Form.Item>
              }} />
              <Table.Column title="名称" dataIndex="Name" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'Name']} style={{ marginBottom: '0px' }}><Input readOnly /></Form.Item>
              }} />
              <Table.Column width={100} render={(value, record, index) => (
                <Dropdown.Button
                  icon={<MoreOutlined />}
                  style={{
                    display: "inline-block", marginTop: '-1em'
                  }} overlay={() => (
                    <Menu >
                      <Menu.Item key='1' onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '80%',
                            component: (
                              <WS1309003_InputList
                                format={record.format}
                                remarks={record.remarks}
                                onFinishScreen={(output) => {
                                  this.loadInit()
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }}>
                        <Space>
                          <SearchOutlined style={{ color: '#08c' }} />
                          <label>照会 (Z)</label>
                        </Space>
                      </Menu.Item>
                      <Menu.Item key='2' onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '80%',
                            component: (
                              <WS1309004_Input
                                format={record.format}
                                remarks={record.remarks}
                                
                                onFinishScreen={(output) => {
                                  this.loadInit()
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }}>
                        <Space>
                          <SearchOutlined style={{ color: '#08c' }} />
                          <label>照会 (Z2)</label>
                        </Space>
                      </Menu.Item>
                      <Menu.Item key='3' onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '40%',
                            component: (
                              <WS1309011_CopyingProcess
                                format={record.format}
                                remarks={record.remarks}
                                kind = {record.kind}
                                onFinishScreen={(output) => {
                                  this.loadInit()
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }}> 
                          <label>&emsp;&ensp;複写</label> 
                      </Menu.Item>

                      <Menu.Item key='4' onClick={() => this.handleAdd(record)} >
                        <label>&emsp;&ensp;追加(R)</label>
                      </Menu.Item>
                      <Menu.Item key='5' onClick={() => this.delete(record)}  >
                        <label>&emsp;&ensp;削除(D)</label>
                      </Menu.Item>
                    </Menu>
                  )}></Dropdown.Button>
              )}
              />
            </Table>
            <Button style={{ float: 'right', marginTop: '1em' }} onClick={() => this.save()} type="primary">SAVE</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1309001_XmlParamMaintain);
