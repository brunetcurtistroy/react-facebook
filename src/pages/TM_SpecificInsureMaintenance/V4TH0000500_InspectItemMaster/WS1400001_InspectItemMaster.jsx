import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Form, Card, Table, Row, Col, Select, Input, Space, Modal, Button, message, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS1389001_DocumentClassifyInquiry from 'pages/TM_SpecificInsureMaintenance/V4TH0000500_InspectItemMaster/WS1389001_DocumentClassifyInquiry.jsx';
import InspectItemMasterAction from "redux/SpecificInsureMaintenance/InspectItemMaster/InspectItemMaster.action";

import './WS1400001_InspectItemMaster.scss';

const grid = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

class WS1400001_InspectItemMaster extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査項目マスタ';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      selectedRowKey: [],
      rowSelect: [],
      indexTable: null,
      isLoadingTable: true,
      disabledNumOfDigits: true,
    };

    this.onFinish = this.onFinish.bind(this);
    this.convertDataRequest = this.convertDataRequest.bind(this)
    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  componentDidMount() {
    this.getDataScreen();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataScreen();
    }
  }

  getDataScreen() {
    this.setState({ isLoadingTable: true })
    InspectItemMasterAction.getScreenData()
      .then(res => {
        let data = res;
        if (data && data.length > 0) {
          data.forEach(element => {
            element.isSave = true;
          });
          data[0].isSave = false;
          this.setState({
            indexTable: 0,
            rowSelect: [data[0]],
          })
        }

        this.setState({
          dataSource: data,
          isLoadingtable: false,
          selectedRowKey: (res && res.length > 0) ? res.map(x => x.id) : [],
        })

        this.formRef.current.setFieldsValue({
          dataTable: data,
        });
        console.log(data)
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.exam_code || !x.short_name || !x.formal_name);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkIdTemp(id) {
    if (id?.toString().includes('temp') || id === '') {
      return true
    }
    return false;
  }

  async handleAddRowTable() {
    let newRow = {
      id: '',
      InspectDivisionScreen: 1,
      InspectTypeScreen: 'X',
      expression_19: '文字',
      expression_20: '目標',
      isSave: false
    };

    let data = [...this.state.dataSource];

    data.push(newRow);

    await this.setState({
      dataSource: data,
    });

    this.formRef.current.setFieldsValue({
      dataTable: data,
    });

    let dataCopy = [...data];

    if (dataCopy.length > 0) {
      for (let i = 0; i < dataCopy.length - 1; i++) {
        dataCopy[i].isSave = true;
      }

      this.setState({
        dataSource: dataCopy
      })
      this.formRef.current.setFieldsValue({
        dataTable: dataCopy,
      });
    }

    let index = this.state.dataSource.findIndex(x => x.id === newRow.id);
    this.setState({
      indexTable: index,
      rowSelect: [newRow],
      selectedRowKey: [newRow.id],
    })

    this.forceUpdate();
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];
    data[index][field] = value;

    this.setState({
      dataSource: data,
    });

    this.formRef.current.setFieldsValue({
      dataTable: data,
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
        dataSource: data,
        rowSelect: [data[data.length - 1]],
        selectedRowKey: [data[data.length - 1].id],
        indexTable: data.length - 1
      });
    } else {
      data.forEach(element => {
        element.isSave = true;
      });

      data[index].isSave = false;

      this.setState({
        dataSource: data,
        indexTable: index
      })
    }
  }

  handleDeleteRowTable(index) {
    let data = [...this.state.dataSource];

    data.splice(index, 1);

    this.formRef.current.getFieldValue("dataTable").splice(index, 1);

    this.setState({
      dataSource: data,
    });

    let dataCopy = [...data];
    if (dataCopy.length > 0) {
      dataCopy[0].isSave = false;
      for (let i = dataCopy.length - 1; i > 0; i--) {
        dataCopy[i].isSave = true;
      }

      this.setState({
        dataSource: dataCopy,
        indexTable: 0,
        rowSelect: [dataCopy[0]],
        selectedRowKey: [dataCopy[0].id]
      })
      this.formRef.current.setFieldsValue({
        dataTable: dataCopy,
      });
    }
  }

  convertDataRequest(data) {
    let result = {};

    return result
  }

  callApiSaveAndUpdateInspectItem(index) {
    let params = this.formRef.current.getFieldValue("dataTable")[index];
    InspectItemMasterAction.saveAndUpdateInspectItem(params)
      .then((res) => {
        this.getDataScreen();
        message.success('更新しました。');
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }

  callApiDeleteRecord(id) {
    let param = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      title: "削除を行いますか？",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        InspectItemMasterAction.deleteInspectItem(param)
          .then((res) => {
            message.success('正常に削除されました')
            this.getDataScreen();
          })
          .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error('エラーが発生しました');
              return;
            }
            message.error(err.response.data.message);
          });
      },
    });

  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  changeInspectType(value) {
    this.setState({
      disabledNumOfDigits: true
    })

    if (value === 'J' || value === 'B') {
      this.setState({
        disabledNumOfDigits: false
      })
    }
    let content = value === 'X' ? '文字'
      : value === 'J' ? '１文章'
        : value === 'B' ? '文章入力'
          : value === 'N' ? '整数'
            : value === 'N1' ? '小数１桁'
              : value === 'N2' ? '小数２桁'
                : value === 'N3' ? '小数３桁'
                  : value === 'N4' ? '小数４桁'
                    : value === 'N5' ? '小数５桁' : '';

    this.updateDatasource(this.state.indexTable, "InspectTypeScreen", value);
    this.updateDatasource(this.state.indexTable, "expression_19", content);
  }

  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];
    const uniqueValues = new Set(lstData.map(v => v.exam_code));

    if (uniqueValues.size < lstData.length) {
      return true;
    } return false;
  }

  onFinish() { }

  render() {
    return (
      <div className="inspect-item-master">
        <Card className="mb-3" size="small">
          <label >検査項目マスタ</label>
        </Card>

        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Row gutter={24}>
            <Col span={16}>
              <Card>
                <Table
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ y: '80vh' }}
                  rowSelection={{
                    fixed: 'left',
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKey,
                    onSelect: (record, selected, selectedRows) => {
                      let index = this.state.dataSource.findIndex(x => x.id === record.id)
                      this.setState({
                        rowSelect: selectedRows,
                        selectedRowKey: selectedRows.map(x => x.id),
                        indexTable: index
                      });
                      this.changeRow(index)
                    },
                  }}
                >
                  <Table.Column title="検査ｺｰﾄﾞ" dataIndex="exam_code" width={100}
                    render={(value, record, index) => (
                      <Form.Item name={["dataTable", index, "exam_code"]} style={{ marginBottom: "0" }}>
                        <InputNumber maxLength={4} readOnly={record.isSave} className={record.isSave ? 'ant-input-read-only' : ''}
                          onChange={(value) => {
                            this.updateDatasource(index, "exam_code", value);
                          }}>
                        </InputNumber>
                      </Form.Item>
                    )}
                  />
                  <Table.Column title="略称名" dataIndex="short_name"
                    render={(value, record, index) => (
                      <Form.Item name={["dataTable", index, "short_name"]} style={{ marginBottom: "0" }}>
                        <Input type="text" readOnly={record.isSave} className={record.isSave ? 'ant-input-read-only' : ''}
                          onChange={(event) => {
                            this.updateDatasource(index, "short_name", event.target.value);
                          }}>
                        </Input>
                      </Form.Item>
                    )} />
                  <Table.Column title="検査名" dataIndex="formal_name"
                    render={(value, record, index) => (
                      <Form.Item name={["dataTable", index, "formal_name"]} style={{ marginBottom: "0" }}>
                        <Input type="text" readOnly={record.isSave} className={record.isSave ? 'ant-input-read-only' : ''}
                          onChange={(event) => {
                            this.updateDatasource(index, "formal_name", event.target.value);
                          }}>
                        </Input>
                      </Form.Item>
                    )} />
                  <Table.Column title="ﾀｲﾌﾟ" dataIndex="expression_19" />
                  <Table.Column title="区分" dataIndex="expression_20" />
                  <Table.Column title="文章分類" dataIndex="expression_29" />
                  <Table.Column width={70} fixed={'right'}
                    title={
                      <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          disabled={this.checkAddItem() || this.checkDuplicateCode() || (this.state.rowSelect.length > 0 && this.checkIdTemp(this.state.rowSelect[0].id))}
                          onClick={this.handleAddRowTable}
                          type="primary" icon={<PlusOutlined />}>
                        </Button>
                      </div>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          hidden={record.isSave || this.checkAddItem() || this.checkDuplicateCode()}
                          onClick={() => { this.callApiSaveAndUpdateInspectItem(index) }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small' style={{ border: 'none' }}
                          onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable(index) : this.callApiDeleteRecord(record.id)}
                          danger
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </div>;
                    }}
                  />
                </Table>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ height: '100%' }}>
                <Form.Item name={["dataTable", this.state.indexTable, "InspectDivisionScreen"]} label="検査区分" {...grid}>
                  <Select style={{ width: '150px' }} allowClear={false}
                    onChange={(value) => {
                      this.updateDatasource(this.state.indexTable, "InspectDivisionScreen", value);
                      this.updateDatasource(this.state.indexTable, "expression_20", value === 1 ? '目標' : value === 2 ? '実績' : value === 9 ? '共通' : value === 8 ? '督促' : '');
                    }}
                  >
                    <Select.Option value={1}>目標</Select.Option>
                    <Select.Option value={2}>実績</Select.Option>
                    <Select.Option value={9}>共通</Select.Option>
                    <Select.Option value={8}>督促</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name={["dataTable", this.state.indexTable, "judgment_code"]} label="判　　定" {...grid}>
                  <Input type="number" style={{ width: '150px' }}
                    onChange={(event) => {
                      this.updateDatasource(this.state.indexTable, "judgment_code", event.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item name={["dataTable", this.state.indexTable, "exam_comment_division"]} label="検査ｺﾒﾝﾄ" {...grid}>
                  <Input type="number" style={{ width: '150px' }}
                    onChange={(event) => {
                      this.updateDatasource(this.state.indexTable, "exam_comment_division", event.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item label="文章分類" {...grid}>
                  <Space>
                    <Form.Item name={["dataTable", this.state.indexTable, "document_classification_code"]} style={{ marginBottom: 0 }}>
                      <Input.Search style={{ width: '100px' }}
                        readOnly
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component: (
                                <WS1389001_DocumentClassifyInquiry
                                  DocumentClassifyCode={this.formRef.current?.getFieldValue('document_classification_code')}
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.state.indexTable, "document_classification_code", output.document_classification_code);
                                    this.updateDatasource(this.state.indexTable, "document_classification_name", output.document_classification_name);
                                    this.updateDatasource(this.state.indexTable, "expression_29", output.document_classification_name);
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["dataTable", this.state.indexTable, "document_classification_name"]} style={{ marginBottom: 0 }}>
                      <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="健診検査" {...grid}>
                  <Space>
                    <Form.Item name={["dataTable", this.state.indexTable, "InspectCode"]} style={{ marginBottom: 0 }}>
                      <Input.Search readOnly style={{ width: '100px' }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component: (
                                <WS1389001_DocumentClassifyInquiry
                                  Lio_InspectItemCode={this.formRef.current?.getFieldValue('InspectCode')}
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.state.indexTable, "InspectCode", output.test_item_code);
                                    this.updateDatasource(this.state.indexTable, "exam_name", output.exam_name);
                                    this.updateDatasource(this.state.indexTable, "exam_type", output.exam_type);
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["dataTable", this.state.indexTable, "exam_name"]} style={{ marginBottom: 0 }}>
                      <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
                    </Form.Item>
                    <Form.Item name={["dataTable", this.state.indexTable, "exam_type"]} style={{ marginBottom: 0 }}>
                      <Input type="text" readOnly style={{ border: 'none', background: 'transparent', width: '50px' }} />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name={["dataTable", this.state.indexTable, "InspectTypeScreen"]} label="検査ﾀｲﾌﾟ" {...grid}>
                  <Select style={{ width: '150px' }} allowClear={false}
                    onChange={(value) => { this.changeInspectType(value) }}>
                    <Select.Option value="X">文字</Select.Option>
                    <Select.Option value="J">１文章</Select.Option>
                    <Select.Option value="B">文章入力</Select.Option>
                    <Select.Option value="N">整数</Select.Option>
                    <Select.Option value="N1">小数１桁</Select.Option>
                    <Select.Option value="N2">小数２桁</Select.Option>
                    <Select.Option value="N3">小数３桁</Select.Option>
                    <Select.Option value="N4">小数４桁</Select.Option>
                    <Select.Option value="N5">小数５桁</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name={["dataTable", this.state.indexTable, "NumOfDigits"]} label="桁　　数" {...grid}>
                  <InputNumber maxLength={3} type="text" style={{ width: '150px' }} disabled={this.state.disabledNumOfDigits}
                    onChange={(event) => {
                      this.updateDatasource(this.state.indexTable, "NumOfDigits", event.target.value);
                    }}
                  />
                </Form.Item>
                <br />
                <div style={{ textAlign: 'right' }}>
                  <Button
                    disabled={(this.state.rowSelect.length > 0 && this.state.rowSelect[0].isSave) || this.checkAddItem() || this.checkDuplicateCode()}
                    onClick={() => { this.callApiSaveAndUpdateInspectItem(this.state.indexTable) }}
                    type="primary"
                    icon={<SaveOutlined />} >更新
                  </Button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1400001_InspectItemMaster);
