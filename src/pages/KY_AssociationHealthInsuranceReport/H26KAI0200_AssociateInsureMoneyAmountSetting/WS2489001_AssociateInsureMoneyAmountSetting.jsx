import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-sequences */
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Table, Row, Col, Space, Form, Input, DatePicker, Button, Modal, message, Spin, InputNumber } from "antd";
import { SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import WS2489011_CopyingProcess from 'pages/KY_AssociationHealthInsuranceReport/H26KAI0200_AssociateInsureMoneyAmountSetting/WS2489011_CopyingProcess.jsx';
import WS2489005_InputNew from 'pages/KY_AssociationHealthInsuranceReport/H26KAI0200_AssociateInsureMoneyAmountSetting/WS2489005_InputNew.jsx';
import WS2489003_FormatInquiry from 'pages/KY_AssociationHealthInsuranceReport/H26KAI0200_AssociateInsureMoneyAmountSetting/WS2489003_FormatInquiry.jsx';

import AssociateInsureMoneyAmountSettingAction from "redux/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/AssociateInsureMoneyAmountSetting.action";
import moment from "moment";

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class WS2489001_AssociateInsureMoneyAmountSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '協会けんぽ金額設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTable: true,
      isLoadingForm: true,
      data: [],
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [],
      indexTable: 0,
      oldYear: '',
      Year: '',
      isReload: true 
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this)
    this.handleDeleteRowTable = this.handleDeleteRowTable.bind(this)
  }

  componentDidMount() {
    this.getScreenData();
  }

  getScreenData() {
    this.setState({
      isLoadingTable: true,
      isLoadingForm: true,
    })
    AssociateInsureMoneyAmountSettingAction.getScreenData()
      .then(res => {
        let data = res ? res : [];
        data.map(item => (
          item.FromOp = moment(item.FromOp),
          item.ToOp = moment(item.ToOp)
        ))

        if (this.state.isReload) {
          this.setState({
            selectedRows: data && data.length > 0 ? [data[0]] : [],
            selectedRowKeys: data && data.length > 0 ? [data[0].id] : [],
            indexTable: 0,
            oldYear: data && data.length > 0 ? data[0].YearOp : '',
            Year: data && data.length > 0 ? data[0].YearOp : ''
          })
        } else { 
            let record = data.find(x => x.YearOp == this.state.Year);
            console.log(this.state.Year,)
            console.log( data, record)
      
            this.setState({
              selectedRows: record ? [record] : [],
              selectedRowKeys: record ? [record.id] : [''],
              indexTable: data.findIndex(x => x.YearOp == this.state.Year),
              oldYear: this.state.Year
            });
        }
        this.setState({
          dataSource: data,
          isLoadingTable: false,
          isLoadingForm: false 
        })

        this.formRef.current?.setFieldsValue({
          dataTable: data
        })
      })
      .finally(() => {
        this.setState({
          isLoadingTable: false,
          isLoadingForm: false 
        })
      })
  }

  inputBtn() {
    
    let param = {
        formatOp: this.formRef.current?.getFieldValue('dataTable')[this.state.indexTable].FormatOp
    }
    AssociateInsureMoneyAmountSettingAction.inputBtn(param)
      .then(() => { })
  }

  paramsBtn() {
    let param = {
      formatOp: this.formRef.current?.getFieldValue('dataTable')[this.state.indexTable].FormatOp
    }

    AssociateInsureMoneyAmountSettingAction.paramsBtn(param)
      .then((res) => {
        Modal.warning({
          title: res.data.message,
          okText: 'Ok',
          onOk: () => { }
        })
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });

    this.formRef.current.setFieldsValue({
      dataTable: data
    });
  }

  changeRow(index) {
    let data = [...this.state.dataSource];

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      this.setState({
        selectedRows: [data[0]],
        selectedRowKeys: [data[0].id],
        indexTable: 0
      });
    } else {
      this.setState({
        indexTable: index
      });
    }
  }

  async handleAddRowTable() {
    let newRow = {
      id: ''
    };

    let data = [...this.state.dataSource];
    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      selectedRows: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });

    this.formRef.current?.setFieldsValue({
      dataTable: data,
    });

    this.forceUpdate();
  }

  // check required field
  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.YearOp);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkDisabledBtnAdd() {
    if (this.state.selectedRows.length > 0) {
      let newYear = this.state.selectedRows[0].YearOp;
      if (this.checkAddItem() || this.checkIdTemp(this.state.selectedRows[0].id) || this.checkDuplicateDate() || (!this.checkIdTemp(this.state.selectedRows[0].id) && this.state.oldYear?.toString() !== newYear?.toString())) {
        return true;
      } return false;
    } return false;
  }

  checkDuplicateDate() {
    let data = [...this.state.dataSource];
    const uniqueValues = new Set(data.map(x => x.YearOp?.toString()));
    if (uniqueValues.size < data.length) {
      return true;
    } return false;
  }

  handleDeleteRowTable(index) {
    let data = [...this.state.dataSource];
    data.splice(index, 1);
    this.formRef.current.getFieldValue("dataTable").splice(index, 1);

    this.setState({
      dataSource: data,
      indexTable: 0,
      selectedRows: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
    });

    this.formRef.current?.setFieldsValue({
      dataTable: data,
    });
  }

  // add, update & delete
  async reloadData() {
    this.setState({ isReload: false , isLoadingForm: false })
    await this.getScreenData();
  }

  updateOrCreateRecord() {
    let params = {
      ...this.state.dataSource[this.state.indexTable]
    }
    if (this.checkDuplicateDate()) {
      message.warning('年の情報が複製しされました。!!');
    } else {
    AssociateInsureMoneyAmountSettingAction.updateOrCreate(params)
      .then((res) => {
        message.success(res?.data?.message);
        this.reloadData();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
    }
  }

  deleteRecord(value) {
    let params = {
      YearOp: value
    }

    Modal.confirm({
      width: "250px",
      content: "削除を行いますか ?",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        AssociateInsureMoneyAmountSettingAction.deleteRecord(params)
      .then((res) => {
        message.success(res?.data?.message);
        this.getScreenData();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
      }
    })    
  }

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
      <div className="associate-insure-money-amount-setting">
        <Card className="mb-3">
          <div> 協会けんぽ金額設定</div>
        </Card>

        <Form ref={this.formRef} onFinish={this.onFinish} >
          <Row gutter={24}>
            <Col span={8} style={{ paddingRight: 0 }}>
              <Card style={{ height: '100%' }}>
                <Table
                  loading={this.state.isLoadingTable}
                  dataSource={this.state.dataSource}
                  pagination={this.state.dataSource?.length > 10 ? true : false}
                  rowKey={record => record.id}
                  scroll={{y: 500}}
                  rowSelection={{
                    fixed: 'left',
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKeys,
                    onSelect: (record, selected, selectedRows) => {
                      let index = this.state.dataSource.findIndex(x => x.id === record.id)
                      this.setState({
                        selectedRows: selectedRows,
                        selectedRowKeys: selectedRows.map(x => x.id),
                        indexTable: index,
                        oldYear: record.YearOp,
                        Year: record.YearOp
                      });
                      this.changeRow(index)
                    },
                  }}
                >
                  <Table.Column title="年度" dataIndex="YearOp"
                    render={(value, record, index) => {
                      return (
                        <Form.Item name={["dataTable", index, "YearOp"]} style={{ marginBottom: 0 }}>
                          <InputNumber maxLength={4} autoFocus={this.state.indexTable === index}
                            readOnly={this.state.indexTable !== index}
                            style={{border: this.state.indexTable !== index ? 'none' : '', background: this.state.indexTable !== index ? 'transparent' : '',}}
                            onChange={(value) => {
                              this.setState({Year: value})
                              this.updateDatasource(index, "YearOp", value)
                            }
                            }
                          />
                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column width={70} fixed={'right'}
                    title={
                      <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          disabled={this.checkDisabledBtnAdd()}
                          onClick={this.handleAddRowTable}
                          type="primary" icon={<PlusOutlined />}>
                        </Button>
                      </div>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center", display:"flex" }}>
                        <Button size='small'
                          hidden={this.state.indexTable !== index || this.checkAddItem() || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].FormatOp)}
                          onClick={() => {
                            this.updateOrCreateRecord()
                          }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small' style={{ border: 'none' }}
                          onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable(index) : this.deleteRecord(record.YearOp)}
                          danger
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </div>
                    }}
                  />
                </Table>
              </Card>
            </Col> 
            <Col span={16}>
              <Card style={{  height: '100%'}}>
                <Spin spinning={this.state.isLoadingForm}>
                  <Form.Item style={{marginTop: 15, marginBottom:12}}  label={<label><span style={{color: 'red'}}>* </span>金額設定</label> } {...grid}>
                    <Space>
                      <Form.Item label=""  name={["dataTable", this.state.indexTable, "FormatOp"]} style={{ marginBottom: 0 }}
                        rules={[{ required: true }]}>
                        <Input.Search type="text" maxLength={12} style={{ width: '150px' }} readOnly
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '60%',
                                component: (
                                  <WS2489003_FormatInquiry
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.state.indexTable, "FormatOp", output.record.format);
                                      this.updateDatasource(this.state.indexTable, "Expression_32", output.record.remarks);

                                      this.closeModal();
                                    }}
                                  />),
                              },
                            })
                          }}
                        />
                      </Form.Item>
                      <Form.Item name={["dataTable", this.state.indexTable, "Expression_32"]} style={{ marginBottom: 0 }}>
                        <Input type="text" readOnly style={{ background: 'transparent', border: 'none', width: '200px' }} />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  <Form.Item name={["dataTable", this.state.indexTable, "P01Op"]} label="料金設定" {...grid}>
                    <Input type="text" maxLength={12} style={{ width: '150px' }}
                      onChange={(event) => this.updateDatasource(this.state.indexTable, "P01Op", event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="履 歴 管 理" {...grid}>
                    <Space>
                      <Form.Item name={["dataTable", this.state.indexTable, "FromOp"]} style={{ marginBottom: 0}}>
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD"
                          onChange={(value) => this.updateDatasource(this.state.indexTable, "FromOp", value)} style={{width: '136px' }}
                        />
                      </Form.Item>
                      <label style={{}}>~</label>
                      <Form.Item name={["dataTable", this.state.indexTable, "ToOp"]} style={{ marginBottom: 0 }}>
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD"
                          onChange={(value) => this.updateDatasource(this.state.indexTable, "ToOp", value)} style={{width: '136px' }}
                        />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  <Form.Item name={["dataTable", this.state.indexTable, "SpecialUnexecutedOp"]} label="特別未実施1" {...grid}>
                    <Input type="text" maxLength={8} style={{ width: '150px' }}
                      onChange={(event) => this.updateDatasource(this.state.indexTable, "SpecialUnexecutedOp", event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item name={["dataTable", this.state.indexTable, "SpecialUnexecuted2Op"]} label="特別未実施2" {...grid}>
                    <Input type="text" maxLength={8} style={{ width: '150px' }}
                      onChange={(event) => this.updateDatasource(this.state.indexTable, "SpecialUnexecuted2Op", event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item name={["dataTable", this.state.indexTable, "ExecOp"]} label="実　　　行" {...grid}>
                    <Input type="text" maxLength={3} style={{ width: '150px' }}
                      onChange={(event) => this.updateDatasource(this.state.indexTable, "ExecOp", event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item name={["dataTable", this.state.indexTable, "C01Op"]} label="対象コース" {...grid}>
                    <Input type="text"
                      onChange={(event) => this.updateDatasource(this.state.indexTable, "C01Op", event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item name={["dataTable", this.state.indexTable, "ValidSpecialNonImplementOp"]} label="特別未実施" {...grid}>
                    <Input type="text"
                      onChange={(event) => this.updateDatasource(this.state.indexTable, "ValidSpecialNonImplementOp", event.target.value)}
                    />
                  </Form.Item>
                  <div style={{ margin: '20px 0', textAlign: 'right' }}>
                    <Button type="primary"
                      disabled={!(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].FormatOp) || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].YearOp)}
                      onClick={() => {
                        this.updateOrCreateRecord()
                      }} >更新
                    </Button>
                  </div>
                  <hr />
                  <div style={{ marginTop: 20, textAlign: 'right' }}>
                    <Space>
                      <Button type="primary"
                        disabled={!(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].FormatOp)}
                        onClick={() => {
                          this.paramsBtn();
                        }} >ﾊﾟﾗﾒｰﾀ
                      </Button>
                      <Button type="primary"
                        disabled={!(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].FormatOp) || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].YearOp)}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (
                                <WS2489011_CopyingProcess
                                  Li_Format={this.formRef.current?.getFieldValue('dataTable')[this.state.indexTable].FormatOp}
                                  Li_YearF={this.formRef.current?.getFieldValue('dataTable')[this.state.indexTable].YearOp}
                                  Li_Remarks={this.formRef.current?.getFieldValue('dataTable')[this.state.indexTable].Expression_32}
                                  onFinishScreen={(output) => {
                                    this.getScreenData();
                                    this.closeModal()
                                  }}
                                />),
                            },
                          })
                        }} >複  写
                      </Button>
                      <Button type="primary"
                        disabled={!(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].FormatOp)}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 350,
                              component: (
                                <WS2489005_InputNew
                                  Li_Format={this.formRef.current?.getFieldValue('dataTable')[this.state.indexTable].FormatOp}
                                  onFinishScreen={(output) => {

                                    this.closeModal()
                                  }}
                                />),
                            },
                          })

                          this.inputBtn();
                        }} >金額訂正
                      </Button>
                    </Space>
                  </div>
                </Spin>
              </Card>
            </Col>
          </Row>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2489001_AssociateInsureMoneyAmountSetting);
