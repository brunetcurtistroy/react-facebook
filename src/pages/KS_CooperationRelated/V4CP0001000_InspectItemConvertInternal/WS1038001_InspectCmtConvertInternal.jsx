import React from "react";
import { connect } from "react-redux";

import InspectCmtConvertInternalAction from "redux/CooperationRelated/InspectItemConvertInternal/InspectCmtConvertInternal.actions";

import { Card, Table, Form, Tooltip, Input, Button, Modal, message } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import resizableTableScroll from "components/Commons/ResizableTableScroll";

class WS1038001_InspectCmtConvertInternal extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査コメント変換(内部)';　

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTable: false,
      dataSource: [],

      selectedRow: {},
      selectedRowKeys: [],
      selectedRowIndex: 0,

      isEdit: false,
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }
  componentDidMount() {
    this.index();
  }

  index() {
    this.setState({ isLoadingTable: true })
    InspectCmtConvertInternalAction.index()
      .then((res) => {
        this.setState({
          dataSource: res ? res : []
        });

        const index = this.state.selectedRowIndex;
        const data = this.setDataCopyAddIsSave(res, index);
        const key = this.getTableRowValue(data, 'id', index);

        this.setState({
          dataSource: data,
          selectedRowKeys: key,
        });
        this.formRef.current?.setFieldsValue({
          dataTable: data,
        });
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  onChangeSelectRow(selectedRowKeys, selectedRows) {

    this.setState({
      selectedRowKeys: selectedRowKeys,
    });

    let data = [...this.state.dataSource];
    let index = data.findIndex(x => x.id === selectedRowKeys[0])

    data.forEach(element => {
      element.isSave = true;
    });
    data[index].isSave = false;

    this.setState({
      dataSource: data,
      selectedRowIndex: index
    })

    this.formRef.current?.setFieldsValue({
      dataTable: data,
    });
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];
    data[index][field] = value;
    this.setState({
      dataSource: data,
    });
    this.formRef.current?.setFieldsValue({
      dataTable: data,
    });
  }

  async handleAddRowTable() {
    let newRow = {
      isSave: false,
      id: '',
    };

    let data = [...this.state.dataSource];

    const setIndex = this.state.selectedRowIndex + 1;
    // data.push(newRow);
    data.splice(setIndex, 0, newRow);

    this.formRef.current?.setFieldsValue({
      dataTable: data,
    });

    await this.setState({
      dataSource: data,
    });

    let dataCopy = [...data];

    if (dataCopy.length > 0) {
      for (let i = 0; i < dataCopy.length; i++) {
        dataCopy[i].isSave = true;
      }
      dataCopy[setIndex].isSave = false;

      this.setState({
        dataSource: dataCopy
      })
      this.formRef.current?.setFieldsValue({
        dataTable: dataCopy,
      });
    }

    // let index = this.state.dataSource.findIndex(x => x.id === newRow.id);
    this.setState({
      selectedRowIndex: setIndex,
      selectedRowKeys: [newRow.id],
      selectedRow: newRow,
    })

    this.forceUpdate();
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = -1
      let index2 = -1
      index = this.state.dataSource.findIndex(x => !x.exam_comment);
      index2 = this.state.dataSource.findIndex(x => !x.test_result);

      if (index === -1 && index2 === -1) {
        return false;
      }
      return true
    }
  }

  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];

    const uniqueValues = new Set(lstData.map(v => v.exam_comment));
    const uniqueIds = new Set(lstData.map(v => v.id));

    if (uniqueIds.size < lstData.length || uniqueValues.size < lstData.length) {
      return true;
    }
    return false;
  }

  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
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
        selectedRowIndex: 0,
        selectedRowKeys: [dataCopy[0]],
        selectedRowKey: [dataCopy[0].id]
      })
      this.formRef.current?.setFieldsValue({
        dataTable: dataCopy,
      });
    }
  }

  saveRecord(index) {
    this.setState({ isLoadingTable: true });

    let params = this.formRef.current.getFieldValue("dataTable")[index];

    InspectCmtConvertInternalAction.save(params)
      .then((res) => {
        this.index();
        message.success('更新しました。');
      })
      .catch((err) => {
        message.error(err.response.data.message);
        this.setState({ isLoadingTable: false });
      })
  }

  deleteRecord(id) {
    let params = {
      id: id,
    };
    Modal.confirm({
      width: "250px",
      title: "削除を行いますか？",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        this.setState({ isLoadingTable: true, selectedRowIndex: 0 });

        InspectCmtConvertInternalAction.delete(params)
          .then((res) => {
            this.index();
            message.success('正常に削除されました');
          })
          .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error('エラーが発生しました');
              return;
            }
            message.error(err.response.data.message);
          })
      },
    });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }

  setDataCopyAddIsSave(data, index) {
    let dataCopy = [...data]
    if (dataCopy && dataCopy.length > 0) {
      dataCopy.forEach(element => {
        element.isSave = true;
      });
      dataCopy[index].isSave = false;
    }
    return dataCopy;
  }

  getTableRowValue(data, keyName, index) {
    const value = (data.length > 0) ? [data[index][keyName]] : '';
    return value;
  }

  render() {
    return (
      <div className="inspect-cmt-convert-internal">
        <Card title="検査コメント変換(内部)">
          <Form ref={this.formRef}>
            <Table
              size="small"
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={false}
              bordered={true}
              rowKey={(record) => record.id}
              rowSelection={{
                type: 'radio',
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.onChangeSelectRow(selectedRowKeys, selectedRows);
                }
              }}
              scroll={{ y: resizableTableScroll() }}
            >
              <Table.Column
                title={'外部検査値'}
                dataIndex={'exam_comment'}
                render={(value, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, 'exam_comment']} style={{ marginBottom: "0" }}>
                      <Input style={{ border: 'none' }} maxLength={10}
                        onChange={(e) => { this.updateDatasource(index, 'exam_comment', e.target.value) }}
                      />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column
                title={'健診検査値'}
                dataIndex={'test_result'}
                render={(value, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, 'test_result']} style={{ marginBottom: "0" }}>
                      <Input style={{ border: 'none' }} maxLength={10}
                        onChange={(e) => { this.updateDatasource(index, 'test_result', e.target.value) }}
                      />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column
                width={110}
                fixed={'right'}
                title={
                  <div style={{ textAlign: "center" }}>
                    <Tooltip placement="left" title={'追加'}>
                      <Button
                        disabled={this.checkAddItem() || this.checkDuplicateCode() || (this.state.selectedRowKeys.length > 0 && this.checkIdTemp(this.state.selectedRowKeys[0]))}
                        onClick={this.handleAddRowTable}
                        type="primary" icon={<PlusOutlined />}>
                      </Button>
                    </Tooltip>
                  </div>
                }
                render={(text, record, index) => {
                  return (
                    <div style={{ textAlign: "center" }}>
                      <Tooltip placement="left" title={'更新'}>
                        <Button
                          hidden={record.isSave || this.checkAddItem() || this.checkDuplicateCode()}
                          onClick={() => { this.saveRecord(index) }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                      </Tooltip>
                      <Tooltip placement="left" title={'削除'}>
                        <Button style={{ border: 'none' }}
                          onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable(index) : this.deleteRecord(record.id)}
                          danger
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </Tooltip>
                    </div>
                  )
                }}
              />
            </Table>
          </Form>
        </Card>
        <Modal
          footer={null}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          bodyStyle={{ margin: 0, padding: 0 }}
          destroyOnClose={true}
          maskClosable={false}
          onCancel={() => {
            this.closeModal();
          }}
        >
          {this.state.childModal.component}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1038001_InspectCmtConvertInternal);
