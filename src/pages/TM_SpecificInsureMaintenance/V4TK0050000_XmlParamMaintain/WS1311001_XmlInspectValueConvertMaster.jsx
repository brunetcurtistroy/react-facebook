import React from "react";
import { connect } from "react-redux";

import { Button, Card, Input, Table, Modal, message } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import XmlInspectValueConvertMasterAction from "redux/SpecificInsureMaintenance/XmlParamMaintain/XmlInspectValueConvertMaster.action";
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS0274001_InspectCmtSearchQuery from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0274001_InspectCmtSearchQuery.jsx';
import WS1311003_Copy from "./WS1311003_Copy";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1311001_XmlInspectValueConvertMaster extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TKTH0010:XML検査値変換マスタ';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
      old_exam_code: null
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
    this.findIndexByID = this.findIndexByID.bind(this)
    this.createAndUpdateData = this.createAndUpdateData.bind(this)
  }

  componentDidMount() {
    this.getScreenData();
  }

  getScreenData() {
    this.setState({ isLoadingTable: true })
    XmlInspectValueConvertMasterAction.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          indexTable: 0,
          old_exam_code: res && res.length > 0 ? res[0].exam_code : null
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateData(index) {
    let params = { ...this.state.dataSource[index] }
    XmlInspectValueConvertMasterAction.createAndUpdateData(params)
      .then((res) => {
        message.success('更新しました。!')
        this.getScreenData();
      })
  }

  deleteData(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        XmlInspectValueConvertMasterAction.deleteData(params)
          .then(res => {
            message.success('正常に削除されました !');
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

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.exam_code);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkAddItem() || this.checkIdTemp(this.state.rowSelected[0].id) ||
        (!this.checkIdTemp(this.state.rowSelected[0].id) &&
          this.state.rowSelected[0].exam_code !== this.state.old_exam_code)) {
        return true;
      } return false;
    } return false;
  }


  // add new record
  async handleAddRowTable() {
    let newRow = { id: '' };

    let data = [...this.state.dataSource];

    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });

    this.forceUpdate();
  }

  // check selected record while add new
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

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

 async handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    data.splice(0, 1);
   await this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : [],
      old_exam_code: data.length > 0 ? data[0].exam_code : null,
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

  render() {
    return (
      <div className="xml-inspect-value-convert-master">
        <Card title="V4-TKTH0010:XML検査値変換マスタ">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            rowKey={(record) => record.id}
            rowSelection={{
              type: "radio",
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                let index = this.state.dataSource.findIndex(x => x.id === record.id)
                this.setState({
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                  indexTable: index,
                  old_exam_code: record.exam_code
                });
                this.changeRow(index)
              },
            }}
          >
            <Table.Column title="検査" dataIndex="exam_code"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <Input value={record.exam_code} readOnly
                        style={{ border: 'none', background: 'transparent' }}
                      />
                      :
                      <Input.Search value={record.exam_code} type="number" maxLength={8} readOnly
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (
                                <WS0271001_InspectItemSearchQuerySingle
                                  Lio_InspectItemCode={record.exam_code}
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_code", output.Lio_InspectItemCode);
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_short_name", output.recordData.exam_short_name);

                                    this.closeModal();
                                  }}
                                />),
                            },
                          })
                        }}
                      />
                    }
                  </div>

                )
              }}
            />
            <Table.Column title="検査名称" dataIndex="exam_short_name" width={'15%'} />
            <Table.Column title="検査値" dataIndex="test_result"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <Input value={record.test_result} readOnly
                        style={{ border: 'none', background: 'transparent' }}
                      />
                      :
                      <Input.Search value={record.test_result}
                        onChange={(event) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "test_result", event.target.value)
                        }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '60%',
                              component: (
                                <WS0274001_InspectCmtSearchQuery
                                  Lio_CmtClassify={record.exam_comment_code}
                                  LnkOutInspectCmtScreen={record.test_result}
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "test_result", output.recordData.exam_comment_screen);
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_comment_code", output.recordData.exam_comment_code);

                                    this.closeModal();
                                  }}
                                />),
                            },
                          })
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="変換後コード" dataIndex="conversion_after_exam_value"
              render={(value, record, index) => {
                return (
                  <Input value={record.conversion_after_exam_value}
                    onChange={(event) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "conversion_after_exam_value", event.target.value)
                    }}
                    style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '', }}
                  />
                )
              }}
            />
            <Table.Column title="オプション" dataIndex="option_remark" width={'20%'}
              render={(value, record, index) => {
                return (
                  <Input value={record.option_remark}
                    onChange={(event) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "option_remark", event.target.value)
                    }}
                    style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '', }}
                  />
                )
              }}
            />            
            <Table.Column width={70}
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
                return <div style={{ textAlign: "center" }}>
                  <Button size='small'
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].exam_code)}
                    onClick={() => { this.createAndUpdateData(this.findIndexByID(this.state.dataSource, record.id)) }}
                    style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                    icon={<SaveOutlined />} >
                  </Button>
                  <Button size='small' style={{ border: 'none' }}
                    onClick={() => {
                      this.checkIdTemp(record.id) ? this.handleDeleteRowTable() : this.deleteData(record.id)
                    }}
                    danger
                    icon={<DeleteOutlined />}
                  >
                  </Button>
                </div>;
              }}
            />
            <Table.Column
              render={(value, record, index) => {
                return (
                  <div>
                    {this.checkIdTemp(record.id) ? '' :
                      <Button
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 400,
                              component: (
                                <WS1311003_Copy
                                  Li_InspectCode={record.exam_code}
                                  Li_InspectShortName={record.exam_short_name}
                                  onFinishScreen={(output) => {
                                    this.getScreenData()
                                    this.closeModal();
                                  }}
                                />),
                            },
                          })
                        }}
                      >複写</Button>
                    }
                  </div>
                )
              }}
            />
          </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1311001_XmlInspectValueConvertMaster);
