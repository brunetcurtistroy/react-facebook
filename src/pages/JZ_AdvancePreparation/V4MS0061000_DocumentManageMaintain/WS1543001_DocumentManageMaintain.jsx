import React from "react";
import { connect } from "react-redux";
import { Card, Table, Form, Button, Row, Col, Checkbox, Modal, message, Input, Space } from "antd";
import WS1544001_DetailSub from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS1544001_DetailSub.jsx';
import DocumentManageMaintainAction from 'redux/AdvancePreparation/DocumentManageMaintain/DocumentManageMaintain.actions'
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS1543004_Copy from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS1543004_Copy.jsx';
import WS1545001_OutputPatternSub from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS1545001_OutputPatternSub.jsx';
import WS1546001_DestinationSub from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS1546001_DestinationSub.jsx';
import WS0638001_EscortManageMaintain from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS0638001_EscortManageMaintain.jsx';
import ModalDraggable from "components/Commons/ModalDraggable";

class WS1543001_DocumentManageMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = '資料管理保守';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadding: false,
      dataAddNew: [],
      count: 'a',
      selectedRow: {},
      selectedRowKeys: [],
      selectedRowChange: {},
      checkSave: false,
    };
    this.setSave = this.setSave.bind(this)
    this.setDelete = this.setDelete.bind(this)
  }
  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      tableData: []
    })
    this.GetMainInit()
  }
  componentDidUpdate(preve) {
    if (this.props !== preve) {
      this.formRef.current?.setFieldsValue({
        tableData: []
      })
      this.GetMainInit()
    }
  }
  GetMainInit() {
    this.setState({ ...this.state, isLoadding: true, dataAddNew: [] })
    let params = {
      Li_MaterialManageNum: this.props.Li_MaterialManageNum ? this.props.Li_MaterialManageNum : ''
    }
    DocumentManageMaintainAction.GetMainInit(params)
      .then(res => {
        this.formRef.current?.setFieldsValue({
          tableData: res ? res : []
        })
        this.setState({
          selectedRow: res && res.length > 0 ? res[0] : {},
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : []
        })
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
        }
      }).finally(() => this.setState({ isLoadding: false }))
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  AddNewData() {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    let dataAdd = [... this.state.dataAddNew]
    if (arr.length === 0 || dataAdd.length === 0) {
      this.handleAdd();
    } else {
      let startArr = []
      for (let index = 0; index < arr.length; index++) {
        if (startArr.indexOf(arr[index].document_management_number) > -1) {
          return
        } else {
          startArr.push(arr[index].document_management_number)
        }
        if (this.isEmpty(arr[index].document_management_number)) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd()
        }
      }
    }
  }
  handleAdd() {
    const { count } = this.state;
    const newData = {
      id: count,
      StsEnable: true,
      document_management_number: "",
      document_option: "",
      document_option_description: "",
      document_option_main: "",
      document_title: ""
    }
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    let keycheck = [...this.state.dataAddNew];
    keycheck.push(newData)
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
      dataAddNew: keycheck,
    })
  }
  Delete(record) {
    if (isNaN(record.id)) {
      let arr = [...this.formRef.current?.getFieldValue("tableData")];
      let arrKey = [...this.state.dataAddNew]
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1)
          this.formRef.current?.setFieldsValue({
            tableData: arr
          })
          this.forceUpdate()
        }
      })
      arrKey?.map((value, index) => {
        if (value.id === record.id) {
          arrKey.splice(index, 1)
          this.setState({
            ...this.state.arrKey, arrKey: arrKey
          })
        }

      })
    } else {
      this.setState({ isLoadding: true })
      DocumentManageMaintainAction.Delete(record).then(res => {
        this.GetMainInit()
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
        }
      }).finally(() => this.setState({ isLoadding: false }))
    }
  }
  setSave(value) {
    this.setState({
      checkSave: value
    })
    this.GetRe_LoadData();
  }
  setDelete(val) {
    if (val) {
      this.GetRe_LoadData()
    }
  }
  GetRe_LoadData() {
    this.setState({ isLoadding: true })
    DocumentManageMaintainAction.GetMainInit().then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res ? res : []
      })
      if (res && res.length > 0) {
        for (let index = 0; index < res.length; index++) {
          if (res[index].id === this.state.selectedRow.id) {
            this.setState({ ...this.state.selectedRow, selectedRow: res[index] })
            break;
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
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  F8() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS1543004_Copy
            Li_ManageNum={this.state.selectedRow?.management_division}
            Li_MaterialPrintingType={this.state.selectedRow?.document_printing_type}
            Li_MaterialManageNum={this.state.selectedRow?.document_management_number}
            Li_MaterialManageName={this.state.selectedRow?.document_title}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                StsRun: output?.Lo_StsRun
              })
              if (output?.Lo_StsRun) {
                this.GetMainInit()
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  F9() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1400,
        component: (
          <WS1545001_OutputPatternSub
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  F10() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component: (
          <WS1546001_DestinationSub
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  F11() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS0638001_EscortManageMaintain
            Li_selectedRow={this.state.selectedRow}
            Li_Format={this.state.selectedRow.Li_Format}
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
      <div className="document-manage-maintain">
        <Card className="mb-2" >
          <Space>
            <Button onClick={() => this.F8()} >複写</Button>
            <Button onClick={() => this.F9()}>ﾊﾟﾀｰﾝ</Button>
            <Button onClick={() => this.F10()}>送付先</Button>
            <Button onClick={() => this.F11()}>ｴｽｺｰﾄ</Button>
          </Space>
        </Card>
        <Row >
          <Col span={12}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              autoComplete="off"
            >
              <Card style={{ width: '98%' }}>
                <Table
                  style={{ cursor: 'pointer' }}
                  rowClassName={(record, index) => record.id === this.state.selectedRow?.id ? 'table-row-light' : ''}
                  dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                  size="small" bordered={true}
                  loading={this.state.isLoadding}
                  pagination={false}
                  rowKey={(iten) => iten.id}
                  scroll={{ y: 500 }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: async () => {
                        await this.setState({
                          selectedRow: record,
                          selectedRowKeys: [record.id],
                        });
                      }
                    };
                  }}
                // rowSelection={{
                //   type: 'radio',
                //   selectedRowKeys: this.state.selectedRowKeys,
                //   onChange: async (selectedRowKeys, selectedRows) => {
                //     await this.setState({
                //       selectedRow: selectedRows[0],
                //       selectedRowKeys: selectedRowKeys
                //     })
                //   }
                // }}
                >
                  <Table.Column title="管理番号" dataIndex="document_management_number" width={80} align='center'
                    render={(value, record, index) => {
                      if (isNaN(record.id)) {
                        return <Form.Item name={['tableData', index, 'document_management_number']} style={{ marginBottom: '0px' }}>
                          <Input maxLength={30} style={{ border: 'none' }} onBlur={(e) => {
                            const row = this.state.selectedRow
                            row.document_management_number = e.target.value
                            this.setState({
                              ...this.state.selectedRowChange, selectedRowChange: row
                            })

                          }} />
                        </Form.Item>
                      } else {
                        return <span>{value}</span>
                      }
                    }} />
                  <Table.Column title="資料名称" dataIndex="document_title"
                    render={(value, record, index) => {
                      return (
                        <div>
                          {this.state.selectedRow.id !== record.id ?
                            <span style={{ paddingLeft: 7 }}>{value}</span>
                            :
                            <Form.Item name={['tableData', index, 'document_title']} style={{ marginBottom: '0px' }}>
                              <Input maxLength={100} style={{ border: 'none' }}
                                onBlur={(e) => {
                                  const rowSelect = this.state.selectedRow
                                  rowSelect.document_title = e.target.value
                                  this.setState({
                                    selectedRowChange: rowSelect
                                  })
                                }} />
                            </Form.Item>
                          }
                        </div>
                      )
                    }} />
                  <Table.Column title="" width={30} align='center'
                    render={(value, record, index) => {
                      return (
                        <div>
                          {this.state.selectedRow.id !== record.id ?
                            <Checkbox checked={record.StsEnable}></Checkbox>
                            :
                            <Form.Item name={['tableData', index, 'StsEnable']} valuePropName="checked" style={{ marginBottom: '0px' }} onChange={(e) => {
                              const rowCheckBox = this.state.selectedRow
                              rowCheckBox.StsEnable = e
                              this.setState({
                                selectedRowChange: rowCheckBox
                              })
                            }} >
                              <Checkbox></Checkbox>
                            </Form.Item>
                          }
                        </div>
                      )
                    }} />
                  <Table.Column width={70} align='center'
                    title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                    render={(text, record, index) => {
                      return <div
                        hidden={record.id === this.state.selectedRow.id ? false : true}>
                        <Button size='small'
                          style={{ color: 'green', marginRight: '5px' }}
                          icon={<SaveOutlined />}
                          onClick={() => {
                            const selectChange = this.state.selectedRowChange
                            const selectedRow = this.state.selectedRow;
                            selectedRow.document_management_number = !this.isEmpty(selectChange?.document_management_number) ? selectChange.document_management_number : selectedRow.document_management_number
                            selectedRow.document_title = !this.isEmpty(selectChange?.document_title) ? selectChange.document_title : selectedRow.document_title
                            selectedRow.StsEnable = !this.isEmpty(selectChange?.StsEnable) ? selectChange.StsEnable : selectedRow.StsEnable
                            this.setState({
                              ...this.state,
                              selectedRow: selectedRow,
                              checkSave: true
                            })
                          }}
                        ></Button>
                        <Button size='small'
                          style={{ color: 'red' }}
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？',
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () => this.Delete(record)
                            })
                          }}
                        ></Button>
                      </div>
                    }}
                  />
                </Table>
              </Card>
            </Form>
          </Col>
          <Col span={12}>
            <WS1544001_DetailSub setSaveData={this.setSave} setDeleteDetail={this.setDelete} conditionSave={this.state.checkSave} selectedRowsTable={this.state.selectedRow} />
          </Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1543001_DocumentManageMaintain);
