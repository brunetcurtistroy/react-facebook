import { Card, Dropdown, Form, Input, Menu, message, Modal, Select, Space, Table, Button } from "antd";
import { CopyOutlined, DeleteOutlined, MoreOutlined, PlusOutlined, SaveOutlined, ScissorOutlined, SearchOutlined, SnippetsOutlined, ZoomInOutlined } from '@ant-design/icons';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS2751002_InspectMaintain from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2751002_InspectMaintain.jsx';
import WS2752001_MiraisReserveMaintain from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2752001_MiraisReserveMaintain.jsx';
import WS2753001_MiraisImplementorMaintain from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2753001_MiraisImplementorMaintain.jsx';
import React from "react";
import { connect } from "react-redux";
import MiraisInspectMaintainAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisInspectMaintain.actions';
import  ModalDraggable  from "components/Commons/ModalDraggable";


const { Option } = Select;
const styFrm = {
  marginBottom: '0px'
}
class WS2751001_MiraisInspectMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'Mirais検査保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRow: {},
      count: "a"
    };
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
      loaddingTable: false
    });
  }
  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      tableData: []
    })
    this.GetListData()
  }
  GetListData() {
    this.setState({ loaddingTable: true })
    MiraisInspectMaintainAction.GetListData().then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res
      })
      this.setState({ selectedRow: {} })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loaddingTable: false }))
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  F8() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1500,
        component: (
          <WS2751002_InspectMaintain
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  F9() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1600,
        component: (
          <WS2752001_MiraisReserveMaintain
            reservations_item_code={this.state.selectedRow?.reservations_item_code}
            remarks={this.state.selectedRow?.remarks}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  F10() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1000,
        component: (
          <WS2753001_MiraisImplementorMaintain
            reservations_item_code={this.state.selectedRow?.reservations_item_code}
            remarks={this.state.selectedRow?.remarks}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  Insert(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    for (const objValue of arr) {
      if (objValue.id === record.id) {
        if (this.isEmpty(objValue.medical_exam_exam_code)) {
          return
        } else {
          if (isNaN(record.id)) {
            let objSave = {
              medical_exam_exam_code: objValue.medical_exam_exam_code,
              kind: objValue.kind,
              test_item_code: objValue.test_item_code,
              reservations_department: objValue.reservations_department,
              reservations_item_code: objValue.reservations_item_code,
              remarks: objValue.remarks
            }
            this.Save(objSave)
          } else {
            this.Save(objValue)
          }
        }
      }
    }
  }
  Save(data) {
    this.setState({ loaddingTable: true })
    MiraisInspectMaintainAction.SaveData(data).then(res => {
      this.GetListData()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loaddingTable: false }))
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
      this.setState({ loaddingTable: true })
      MiraisInspectMaintainAction.Delete({ id: record.id }).then(res => {
        this.GetListData()
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ loaddingTable: false }))
    }
  }
  AddNewData() {
    this.setState({ loaddingTable: true })
    const { count } = this.state;
    const newData = {
      id: count,
      medical_exam_exam_code: "",
      FO_exam_name: "",
      kind: "00",
      reservations_department: "",
      reservations_item_code: "",
      name: "",
      test_item_code: "",
      FU_exam_name: "",
      remarks: ""
    };
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    console.log(data)
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
      loaddingTable: false
    })
  }
  render() {
    return (
      <div className="mirais-inspect ">
        <Card title='Mirais検査保守'>
          <Space>
            <Button onClick={() => this.F8()} >検査保守</Button>
            <Button onClick={() => this.F9()} >予約保守</Button>
            <Button onClick={() => this.F10()} >実施者保守</Button>
          </Space>
          <hr style={{ margin: '15px 0' }} />
          <Form ref={this.formRef} autoComplete="off"  >
            <Table
              dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
              loading={this.state.loaddingTable} scroll={{ y: 700, x: 1500 }}
              pagination={false} bordered={true} size="small"
              rowKey={(record) => record.id}
              rowSelection={{
                type: 'radio',
                onChange: async (selectedRowKeys, selectedRows) => {
                  await this.setState({
                    selectedRow: selectedRows[0]
                  })
                }
              }}
            >
              <Table.Column title="健診検査" render={(value, record, index) => {
                return <Space>
                  <Form.Item name={['tableData', index, 'medical_exam_exam_code']} style={styFrm}>
                    <Input.Search style={{ width: '110px', textAlign: 'right' }}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '80%',
                            component: (
                              <WS0271001_InspectItemSearchQuerySingle
                                Lio_InspectItemCode={record?.medical_exam_exam_code}
                                onFinishScreen={(output) => {
                                  const namePath = ['tableData', index, 'medical_exam_exam_code']
                                  const nameExam = ['tableData', index, 'FO_exam_name']
                                  this.formRef.current?.setFields([{
                                    name: namePath,
                                    value: output?.Lio_InspectItemCode
                                  },
                                  {
                                    name: nameExam,
                                    value: output?.recordData?.exam_name
                                  }
                                  ]
                                  )
                                  this.forceUpdate()
                                  this.closeModal()
                                }}
                              />
                            ),
                          }
                        })
                      }} />
                  </Form.Item >
                  <Form.Item style={styFrm}>
                    <span >{record?.FO_exam_name}</span>
                  </Form.Item>
                </Space>
              }} />
              <Table.Column title="種別" width={80} render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'kind']} style={styFrm} >
                  <Select  >
                    <Option value={"00"}>予約</Option>
                    <Option value={"60"}>検査</Option>
                    <Option value={"70"}>画像</Option>
                  </Select>
                </Form.Item>
              }} />
              <Table.Column title="予約科項目" render={(value, record, index) => {
                return <Space>
                  <Form.Item name={['tableData', index, 'reservations_department']} style={styFrm}>
                    <Input maxLength={2} style={{ width: '50px' }} />
                  </Form.Item>
                  <Form.Item name={['tableData', index, 'reservations_item_code']} style={styFrm}>
                    <Input maxLength={5} style={{ width: '90px' }} />
                  </Form.Item>
                  <Form.Item style={styFrm}>
                    <span>{record?.name}</span>
                  </Form.Item>
                </Space>
              }} />
              <Table.Column title="項目コード" render={(value, record, index) => {
                return <Space>
                  <Form.Item name={['tableData', index, 'test_item_code']} style={styFrm}>
                    <Input maxLength={6} style={{ width: '70px' }} />
                  </Form.Item>
                  <Form.Item style={styFrm}>
                    <span>{record?.FU_exam_name}</span>
                  </Form.Item>
                </Space>
              }} />
              <Table.Column title="備考" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'remarks']} style={styFrm}>
                  <Input maxLength={256} />
                </Form.Item>
              }} />
              {/* <Table.Column width={40} align='center'
                render={(value, record, index) => (
                  <Dropdown
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
                                <WS0271001_InspectItemSearchQuerySingle
                                  Lio_InspectItemCode={record?.medical_exam_exam_code}
                                  onFinishScreen={(output) => {
                                    this.closeModal()
                                  }}
                                />
                              ),
                            }
                          })
                        }} >
                          <Space>
                            <SearchOutlined style={{ color: '#08c' }} />
                            <label>照会 (Z)</label>
                          </Space>
                        </Menu.Item>
                        <Menu.Item key='2' >
                          <label>&emsp;&ensp;取消(C)</label>
                        </Menu.Item>
                        <Menu.Item key='3' onClick={() => this.Insert(record)} >
                          <label>&emsp;&ensp;追加(R)</label>
                        </Menu.Item>
                        <Menu.Item key='4' onClick={() => this.Delete(record)} >
                          <label>&emsp;&ensp;削除(D)</label>
                        </Menu.Item>
                        <Menu.Item key='5'>
                          <Space>
                            <ScissorOutlined style={{ color: '#08c' }} />
                            <label>切り取り(T)</label>
                          </Space>
                        </Menu.Item>
                        <Menu.Item key='6'>
                          <Space>
                            <CopyOutlined style={{ color: '#08c' }} />
                            <label>コピー(O)</label>
                          </Space>
                        </Menu.Item>
                        <Menu.Item key='7'>
                          <Space>
                            <SnippetsOutlined style={{ color: '#08c' }} />
                            <label> 貼り付け(P)</label>
                          </Space>
                        </Menu.Item>
                        <Menu.Item key='8'>
                          <Space>
                            <ZoomInOutlined style={{ color: '#D0D0D0' }} />
                            <label>広域表示(W)</label>
                          </Space>
                        </Menu.Item>
                      </Menu>
                    )}>
                    <Button size='small' icon={<MoreOutlined />}></Button>
                  </Dropdown>
                )}
              /> */}
              <Table.Column width={60} align='center'
                title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                render={(text, record, index) => {
                  return <>
                    <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.Insert(record)}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2751001_MiraisInspectMaintain);
