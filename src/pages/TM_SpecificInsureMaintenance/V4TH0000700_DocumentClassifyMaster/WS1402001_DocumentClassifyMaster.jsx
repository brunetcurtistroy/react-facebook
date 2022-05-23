import React from "react";
import { connect } from "react-redux";

import { Card, Table, Row, Col, Form, Input, Button, message, Modal } from "antd";
import DocumentClassifyMasterAction from "redux/SpecificInsureMaintenance/DocumentClassifyMaster/DocumentClassifyMaster.action";

import 'pages/TM_SpecificInsureMaintenance/V4TH0000500_InspectItemMaster/WS1400001_InspectItemMaster.scss';

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

class WS1402001_DocumentClassifyMaster extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '文章分類マスタ';

    this.state = {
      dataSourceClassify: [],
      selectedRowKeyClassify: [],
      rowSelectClassify: [],
      isLoadingTableClassify: false,
      indexClassify: null,

      dataSourceSentence: [],
      selectedRowKeySentence: [],
      rowSelectSentence: [],
      isLoadingTableSentence: false,
    };

    this.handleAddRowTableClassify = this.handleAddRowTableClassify.bind(this);
    this.handleAddRowTableSentence = this.handleAddRowTableSentence.bind(this);
    this.convertDataRequest = this.convertDataRequest.bind(this);
    // this.checkDuplicateCode = this.checkDuplicateCode.bind(this);

  }

  componentDidMount() {
    this.getDataClassifyMaster();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataClassifyMaster();
    }
  }

  //// Table Classify

  getDataClassifyMaster() {
    this.setState({ isLoadingTableClassify: true })
    DocumentClassifyMasterAction.getDataClassifyMaster()
      .then(res => {
        let data = res;
        if (data && data.length > 0) {
          data.forEach(element => {
            element.isSave = true;
          });
          data[0].isSave = false;
          this.getDataSentenceMaster(res[0].document_classification_code);
        }

        this.setState({
          dataSourceClassify: data,
          indexClassify: 0,
          isLoadingTableClassify: false,
          selectedRowKeyClassify: res && res.length > 0 ? [res[0].id] : [],
          rowSelectClassify: res && res.length > 0 ? [res[0]] : []
        });
        this.formRef.current?.setFieldsValue({
          dataTableClassify: data ? data : [],
        });
      })
      .finally(() => this.setState({ isLoadingTableClassify: false }))
  }

  changeRow(index) {
    let data = [...this.state.dataSourceClassify];
    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      this.setState({
        dataSourceClassify: data,
        rowSelectClassify: [data[data.length - 1]],
        selectedRowKeyClassify: [data[data.length - 1].id],
        indexClassify: data.length - 1
      });
    } else {
      this.getDataSentenceMaster(data[index].document_classification_code);

      data.forEach(element => {
        element.isSave = true;
      });

      data[index].isSave = false;

      this.setState({
        dataSourceClassify: data,
        indexClassify: index
      })
    }
  }

  checkAddItemClassify() {
    if (this.state.dataSourceClassify.length > 0) {
      let index = this.state.dataSourceClassify.findIndex(x => !x.document_classification_code);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  async handleAddRowTableClassify() {
    let newRow = {
      id: '',
      document_classification_code: '',
      document_classification_name: '',
      isSave: false
    };

    let data = [...this.state.dataSourceClassify];

    data.push(newRow);

    if (data.length > 0) {
      for (let i = 0; i < data.length - 1; i++) {
        data[i].isSave = true;
      }
    }

    await this.setState({
      dataSourceClassify: data,
      rowSelectClassify: [newRow],
      selectedRowKeyClassify: [newRow.id],
      indexClassify: data.length - 1
    });

    this.formRef.current?.setFieldsValue({
      dataTableClassify: data,
    });

    this.setState({
      dataSourceSentence: [],
      isLoadingTableSentence: false,
      selectedRowKeySentence: [],
      rowSelectSentence: []
    })
    this.formRef.current?.setFieldsValue({
      dataTableSentence: [],
    });

    this.forceUpdate();
  }

  callApiDeleteItemClassifyMaster(id) {
    let params = {
      id: id
    };
    Modal.confirm({
      width: "250px",
      title: "削除を行いますか？",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        DocumentClassifyMasterAction.deleteItemClassifyMaster(params)
          .then((res) => {
            this.getDataClassifyMaster();
            message.success('正常に削除されました');
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

  //// Table Sentence

  getDataSentenceMaster(document_classification_code) {
    this.setState({ isLoadingTableSentence: true })
    let param = {
      document_classification_code: document_classification_code
    }
    DocumentClassifyMasterAction.getDataSentenceMaster(param)
      .then(res => {
        this.setState({
          dataSourceSentence: res,
          isLoadingTableSentence: false,
          selectedRowKeySentence: res && res.length > 0 ? [res[0].id] : [],
          rowSelectSentence: res && res.length > 0 ? [res[0]] : []
        })
        this.formRef.current?.setFieldsValue({
          dataTableSentence: res ? res : [],
        });
      })
      .finally(() => this.setState({ isLoadingTableSentence: false }))
  }

  checkAddItemSentence() {
    if (this.state.dataSourceSentence.length > 0) {
      let index = this.state.dataSourceSentence.findIndex(x => !x.sentence_code || !x.search_character);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  async handleAddRowTableSentence() {
    let data = [...this.state.dataSourceSentence];

    let newRow = {
      id: 'Temp' + Math.random() + (data.length + 1),
    };

    data.push(newRow);

    await this.setState({
      dataSourceSentence: data,
      rowSelectSentence: [newRow],
      selectedRowKeySentence: [newRow.id],
    });

    this.formRef.current?.setFieldsValue({
      dataTableSentence: data,
    });

    this.forceUpdate();
  }

  callApiDeleteItemSentenceMaster(id) {
    let params = {
      id: id
    };
    Modal.confirm({
      width: "250px",
      title: "削除を行いますか？",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        DocumentClassifyMasterAction.deleteItemSentenceMaster(params)
          .then((res) => {
            this.getDataSentenceMaster(this.state.rowSelectClassify[0].document_classification_code);
            message.success('正常に削除されました');
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

  // ///

  updateDatasource(typeTable, index, field, value) {
    let dataClassify = [...this.state.dataSourceClassify];
    let dataSentence = [...this.state.dataSourceSentence];

    typeTable === 'Classify' ? (dataClassify[index][field] = value) : (dataSentence[index][field] = value)

    this.setState({
      dataSourceClassify: dataClassify,
      dataSourceSentence: dataSentence,
    });

    this.formRef.current.setFieldsValue({
      dataTableClassify: dataClassify,
      dataTableSentence: dataSentence,
    });
  }

  checkIdTemp(id) {
    if (id?.toString().includes('Temp') || id === '') {
      return true
    }
    return false;
  }

  checkDuplicateCode() {
    let dupSentence = false;
    let lstData = [...this.state.dataSourceSentence];

    if (this.formRef.current?.getFieldValue("dataTableClassify")) {

      let indexClassify = this.formRef.current?.getFieldValue("dataTableClassify")
        .findIndex(item => (
          item.id !== this.state.rowSelectClassify[0].id &&
          // this.checkIdTemp(this.state.rowSelectClassify[0].id) && 
          // !this.checkIdTemp(item.id) && 
          item.document_classification_code === this.state.rowSelectClassify[0].document_classification_code));

      const uniqueValues = new Set(lstData.map(v => v.sentence_code));

      if (uniqueValues.size < lstData.length) {
        dupSentence = true;
      }
      if (indexClassify > -1 || dupSentence) {
        return true;
      } return false;
    } return false;
  }

  convertDataRequest(datas) {
    let result = [];
    for (let i = 0; i < datas.length; i++) {
      result.push(datas[i]);

    }
    datas.map(x => {
      if (x.id?.toString().includes('Temp')) {
        x.id = '';
      }
    });
    return result
  }

  callApiSaveAndUpdateInspectItem(index) {
    let params = {
      ...this.formRef.current.getFieldValue("dataTableClassify")[index],
      SentenceMaster: this.convertDataRequest(this.formRef.current.getFieldValue("dataTableSentence"))
    };
    DocumentClassifyMasterAction.saveAndUpdateClassifyMaster(params)
      .then((res) => {
        this.getDataClassifyMaster();
        message.success('更新しました。');
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(err.response.data.message);
      });
  }

  handleDeleteRowTable(typeTable, index) {
    let dataClassify = [...this.state.dataSourceClassify];
    let dataSentence = [...this.state.dataSourceSentence];

    typeTable === 'Classify' ? (dataClassify.splice(index, 1)) : (dataSentence.splice(index, 1))
    typeTable === 'Classify' ? (this.formRef.current.getFieldValue("dataTableClassify").splice(index, 1)) : (this.formRef.current.getFieldValue("dataTableSentence").splice(index, 1))

    this.setState({
      dataSourceClassify: dataClassify,
      dataSourceSentence: dataSentence,
      rowSelectSentence: dataSentence.length > 0 ? [dataSentence[0]] : [],
      selectedRowKeySentence: dataSentence.length > 0 ? [dataSentence[0].id] : []
    });

    this.formRef.current.setFieldsValue({
      dataTableSentence: dataSentence,
    });

    if (typeTable === 'Classify') {
      if (dataClassify && dataClassify.length > 0) {
        dataClassify.forEach(element => {
          element.isSave = true;
        });
        dataClassify[0].isSave = false;
        this.getDataSentenceMaster(dataClassify[0].document_classification_code);
      }

      this.setState({
        dataSourceClassify: dataClassify,
        indexClassify: dataClassify && dataClassify.length > 0 ? 0 : null,
        isLoadingTableClassify: false,
        selectedRowKeyClassify: dataClassify && dataClassify.length > 0 ? [dataClassify[0].id] : [],
        rowSelectClassify: dataClassify && dataClassify.length > 0 ? [dataClassify[0]] : []
      });
      this.formRef.current?.setFieldsValue({
        dataTableClassify: dataClassify ? dataClassify : [],
      });
    }
  }

  render() {
    return (
      <div className="document-classify-master">
        <Card className="mb-3">
          <div>文章分類マスタ</div>
        </Card>

        <Form ref={this.formRef}>
          <Row gutter={24}>
            <Col span={10} style={{ paddingRight: 0 }}>
              <Card style={{ height: '100%' }}>
                <Table
                  dataSource={this.state.dataSourceClassify}
                  loading={this.state.isLoadingTableClassify}
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ y: '80vh' }}
                  rowSelection={{
                    fixed: 'left',
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKeyClassify,
                    onSelect: (record, selected, selectedRows) => {
                      let index = this.state.dataSourceClassify.findIndex(x => x.id === record.id)
                      this.setState({
                        rowSelectClassify: selectedRows,
                        selectedRowKeyClassify: selectedRows.map(x => x.id)
                      });
                      this.changeRow(index)
                    },
                  }}
                >
                  <Table.Column title="文章分類コード" dataIndex="document_classification_code"
                    render={(value, record, index) => (
                      <Form.Item name={["dataTableClassify", index, "document_classification_code"]} style={{ marginBottom: "0" }}>
                        <Input maxLength={10} type="text" readOnly={record.isSave} className={record.isSave ? 'ant-input-read-only' : ''}
                          onChange={(event) => {
                            this.updateDatasource('Classify', index, "document_classification_code", event.target.value);
                          }}>
                        </Input>
                      </Form.Item>
                    )} />
                  <Table.Column title="文章分類名" dataIndex="document_classification_name"
                    render={(value, record, index) => (
                      <Form.Item name={["dataTableClassify", index, "document_classification_name"]} style={{ marginBottom: "0" }}>
                        <Input maxLength={40} type="text" readOnly={record.isSave} className={record.isSave ? 'ant-input-read-only' : ''}
                          onChange={(event) => {
                            this.updateDatasource('Classify', index, "document_classification_name", event.target.value);
                          }}>
                        </Input>
                      </Form.Item>
                    )} />
                  <Table.Column width={70} fixed={'right'}
                    title={
                      <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          disabled={this.checkAddItemClassify() || (this.state.rowSelectClassify.length > 0 && this.checkIdTemp(this.state.rowSelectClassify[0].id)) || this.checkDuplicateCode()}
                          onClick={this.handleAddRowTableClassify}
                          type="primary" icon={<PlusOutlined />}>
                        </Button>
                      </div>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}>
                        <Button size='small' hidden={record.isSave || this.checkAddItemClassify() || this.checkDuplicateCode() || this.checkAddItemSentence()}
                          onClick={() => { this.callApiSaveAndUpdateInspectItem(index) }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small' style={{ border: 'none' }}
                          onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable('Classify', index) : this.callApiDeleteItemClassifyMaster(record.id)}
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
            <Col span={14}>
              <Card style={{ height: '100%' }}>
                <Table
                  dataSource={this.state.dataSourceSentence}
                  loading={this.state.isLoadingTableSentence}
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ y: '80vh' }}
                  rowSelection={{
                    fixed: 'left',
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKeySentence,
                    onSelect: (record, selected, selectedRows) => {
                      this.setState({
                        rowSelectSentence: selectedRows,
                        selectedRowKeySentence: selectedRows.map(x => x.id)
                      });
                    },
                  }}
                >
                  <Table.Column title="文章コード" dataIndex="sentence_code"
                    render={(value, record, index) => (
                      <Form.Item name={["dataTableSentence", index, "sentence_code"]} style={{ marginBottom: "0" }}>
                        <Input maxLength={10} type="text"
                          onChange={(event) => {
                            this.updateDatasource('Sentence', index, "sentence_code", event.target.value);
                          }}>
                        </Input>
                      </Form.Item>
                    )} />
                  <Table.Column title="検索文字" dataIndex="search_character"
                    render={(value, record, index) => (
                      <Form.Item name={["dataTableSentence", index, "search_character"]} style={{ marginBottom: "0" }}>
                        <Input maxLength={10} type="text"
                          onChange={(event) => {
                            this.updateDatasource('Sentence', index, "search_character", event.target.value);
                          }}>
                        </Input>
                      </Form.Item>
                    )} />
                  <Table.Column title="内容" dataIndex="content"
                    render={(value, record, index) => (
                      <Form.Item name={["dataTableSentence", index, "content"]} style={{ marginBottom: "0" }}>
                        <Input maxLength={10} type="text"
                          onChange={(event) => {
                            this.updateDatasource('Sentence', index, "content", event.target.value);
                          }}>
                        </Input>
                      </Form.Item>
                    )} />
                  <Table.Column width={70} fixed={'right'}
                    title={
                      <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          disabled={this.checkAddItemSentence() || this.checkDuplicateCode()}
                          onClick={this.handleAddRowTableSentence}
                          type="primary" icon={<PlusOutlined />}>
                        </Button>
                      </div>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}>
                        <Button size='small' style={{ border: 'none' }}
                          onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable('Sentence', index) : this.callApiDeleteItemSentenceMaster(record.id)}
                          danger
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </div>;
                    }}
                  />
                </Table>
                <br />
                <div style={{ textAlign: 'right' }}>
                  <Button
                    disabled={this.checkAddItemSentence() || this.checkDuplicateCode()}
                    onClick={() => { this.callApiSaveAndUpdateInspectItem(this.state.indexClassify) }}
                    type="primary"
                    icon={<SaveOutlined />} >更新
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1402001_DocumentClassifyMaster);
