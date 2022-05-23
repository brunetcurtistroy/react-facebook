/* eslint-disable array-callback-return */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Table, Input, Modal, Button, message, Row, Col, Space } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS0640003_Format from "./WS0640003_Format";
import WS0640002_Retrieval from "./WS0640002_Retrieval";
import WS0641001_EscortDetailSub from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS0641001_EscortDetailSub.jsx';
import WS0640004_CopyingProcess from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS0640004_CopyingProcess.jsx';

import EscortMaintainAction from "redux/AdvancePreparation/DocumentManageMaintain/EscortMaintain.action";

import Color from "constants/Color";

import './WS0640001_EscortMaintain.scss';
class WS0640001_EscortMaintain extends React.Component {
  static propTypes = {
    Li_EscortCode: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = 'エスコート保守';

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
      old_escort_code: null,
      SearchChar: '',

      isReload: true,

      isLoadDataDetail: false,
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
    this.saveDataDetail = this.saveDataDetail.bind(this)
    this.setLoadingDataDetail = this.setLoadingDataDetail.bind(this)
  }

  componentDidMount() {
    this.getDataTable();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataTable();
    }
  }

  getDataTable() {
    this.setState({ isLoadingTable: true })
    EscortMaintainAction.getDataTable()
      .then((res) => {
        let index = this.state.indexTable;
        let data = res ? res : [];
        if (data.length > 0) {
          data.map((x, index) => {
            x.fontWeight = this.state.SearchChar ? (this.checkTextBoldBySearch(index, data) ? 'bold' : '') : ''
          })
        }

        if (this.state.isReload) {
          let indexCode = (res && this.props.Li_EscortCode) ? res.findIndex(x => x.escort_code === this.props.Li_EscortCode) : 0
          this.setState({
            dataSource: res ? data : [],
            isLoadingTable: false,

            rowSelected: res && res.length > 0 ? [data[indexCode]] : [],
            selectedRowKeys: res && res.length > 0 ? [data[indexCode].id] : [],
            indexTable: indexCode,
            old_escort_code: res && res.length > 0 ? data[indexCode].escort_code : null,
          })
        } else {
          this.setState({
            dataSource: res ? data : [],
            rowSelected: res && res.length > 0 ? [data[index]] : [],
            selectedRowKeys: res && res.length > 0 ? [data[index].id] : [],
            isLoadingTable: false,
          })
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateData(index) {
    let params = { ...this.state.dataSource[index] }
    if (this.checkDuplicateCode()) {
      message.warning('ｴｽｺｰﾄ 複製 !!');
    } else {
      EscortMaintainAction.createAndUpdateData(params)
        .then((res) => {
          message.success('更新しました。!')
          this.getDataTable();
        })
    }
  }

  deleteData(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: "は　い",
      cancelText: "いいえ",
      onOk: () => {
        EscortMaintainAction.deleteData(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataTable();
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

  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];
    const uniqueValues = new Set(lstData.map(v => v.escort_code));

    if (uniqueValues.size < lstData.length) {
      return true;
    } return false;
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
      let index = this.state.dataSource.findIndex(x => !x.escort_code);
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
          this.state.rowSelected[0].escort_code !== this.state.old_escort_code)) {
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
        rowSelected: [data[0]],
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
    await data.splice(0, 1);
    await this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : [],
      old_escort_code: data.length > 0 ? data[0].escort_code : null
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

  saveDataDetail(selectedRow) {
    this.setState({ isReload: false },
      () => {
        this.getDataTable();
      },
      { isLoadDataDetail: true }
    )
    // this.getDataTable();
  }

  setLoadingDataDetail() {
    this.setState({
      isLoadDataDetail: false,
    })
  }

  checkTextBoldBySearch(index, data) {
    let rerult = false;
    if (this.state.SearchChar && data.length > 0) {
      if (data[index].escort_content_1?.toString().includes(this.state.SearchChar) ||
        data[index].escort_content_2?.toString().includes(this.state.SearchChar) ||
        data[index].escort_content_3?.toString().includes(this.state.SearchChar) ||
        data[index].escort_content_4?.toString().includes(this.state.SearchChar) ||
        data[index].escort_content_5?.toString().includes(this.state.SearchChar)
      ) {
        rerult = true;
      }
    }
    return rerult
  }

  render() {
    return (
      <div className="escort-maintain">
        <Card className="mb-3" title="エスコート保守">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 500,
                    component: (
                      <WS0640004_CopyingProcess
                        Li_CopySourceCode={this.state.rowSelected[0].escort_code}
                        Li_CopyName={this.state.rowSelected[0].escort_name}
                        onFinishScreen={(output) => {
                          this.getDataTable();

                          this.closeModal();
                        }}
                      />),
                  },
                })
              }}>
              複写
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 500,
                    component: (
                      <WS0640002_Retrieval
                        Lio_Searches={this.state.SearchChar}
                        onFinishScreen={async (output) => {
                          await this.setState({ SearchChar: output.Lio_Searches })
                          this.getDataTable();

                          this.closeModal();
                        }}
                      />),
                  },
                })
              }}
            >
              検索
            </Button>
            {/* <span style={{ marginRight: 20 }}>エスコート保守</span>
            <Dropdown
              overlay={() => (
                <Menu>
                  <Menu.Item
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 500,
                          component: (
                            <WS0640004_CopyingProcess
                              Li_CopySourceCode={this.state.rowSelected[0].escort_code}
                              Li_CopyName={this.state.rowSelected[0].escort_name}
                              onFinishScreen={(output) => {
                                this.getDataTable();

                                this.closeModal();
                              }}
                            />),
                        },
                      })
                    }}
                  >
                    複写
                 </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 500,
                          component: (
                            <WS0640002_Retrieval
                              Lio_Searches={this.state.SearchChar}
                              onFinishScreen={async(output) => {
                               await this.setState({ SearchChar: output.Lio_Searches })
                                this.getDataTable();

                                this.closeModal();
                              }}
                            />),
                        },
                      })
                    }}
                  >
                    検索
                 </Menu.Item>
                </Menu>
              )}
            >
              <Button icon={<MoreOutlined />}></Button>
            </Dropdown> */}
          </Space>
          <hr style={{ margin: '15px 0' }} />
          <Row gutter={24}>
            <Col span={10}>
              <Card style={{ height: '100%' }}>
                <Table
                  size='small'
                  style={{ cursor: 'pointer' }}
                  rowClassName={(record, index) => record.id === this.state.rowSelected[0].id ? 'table-row-light' : ''}
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={false}
                  bordered
                  rowKey={(record) => record.id}
                  scroll={{ x: 400, y: 700 }}
                  onRow={(record, rowIndex) => {
                    let index = this.state.dataSource.findIndex(x => x.id === record.id)
                    return {
                      onClick: () => {
                        this.setState({
                          rowSelected: [record],
                          selectedRowKeys: [record.id],
                          indexTable: index,
                          old_escort_code: record.escort_code
                        });
                        this.changeRow(index)
                      }
                    };
                  }}
                // rowSelection={{
                //   type: "radio",
                //   selectedRowKeys: this.state.selectedRowKeys,
                //   onSelect: (record, selected, selectedRows) => {
                //     let index = this.state.dataSource.findIndex(x => x.id === record.id)
                //     this.setState({
                //       rowSelected: selectedRows,
                //       selectedRowKeys: selectedRows.map(x => x.id),
                //       indexTable: index,
                //       old_escort_code: record.escort_code
                //     });
                //     this.changeRow(index)
                //   },
                // }}
                >
                  <Table.Column title="ｴｽｺｰﾄ" dataIndex="escort_code" width={100}
                    render={(value, record, index) => {
                      return (
                        <div>
                          {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                            <Input readOnly
                              value={record.escort_code?.toString().substr(0, 1) + '-' + record.escort_code?.toString().substr(1, 2)}
                              style={{ border: 'none', background: 'transparent', color: Color(record.expression_4).Foreground, fontWeight: record.fontWeight }}
                            />
                            :
                            <Input.Search maxLength={3}
                              id="phoneno"
                              value={record.escort_code}
                              // value={record.escort_code.toString().substr(0, 1) + '-' + record.escort_code.toString().substr(1, 2)}
                              className={record.fontWeight === 'bold' ? 'input-text-bold' : ''}
                              onSearch={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: '50%',
                                    component: (
                                      <WS0640003_Format
                                        Li_EscortCode={record.escort_code}
                                        onFinishScreen={(output) => {
                                          this.closeModal();
                                        }}
                                      />),
                                  },
                                })
                              }
                              }
                              onChange={(event) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "escort_code", event.target.value)
                              }}
                            />
                          }
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="エスコート名称" dataIndex="escort_name"
                    render={(value, record, index) => {
                      return (
                        <div>
                          {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                            <Input value={record.escort_name} readOnly
                              style={{ border: 'none', background: 'transparent', color: Color(record.expression_4).Foreground, fontWeight: record.fontWeight }}
                            />
                            :
                            <Input.Search value={record.escort_name} maxLength={80}
                              className={record.fontWeight === 'bold' ? 'input-text-bold' : ''}
                              onSearch={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: '50%',
                                    component: (
                                      <WS0640003_Format
                                        Li_EscortCode={record.escort_code}
                                        onFinishScreen={(output) => {
                                          this.closeModal();
                                        }}
                                      />),
                                  },
                                })
                              }}
                              onChange={(event) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "escort_name", event.target.value)
                              }}
                            />
                          }
                        </div>
                      )
                    }} />
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
                          hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem()
                            || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].escort_code)}
                          onClick={() => { this.createAndUpdateData(this.findIndexByID(this.state.dataSource, record.id)) }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small' style={{ border: 'none' }}
                          hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
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
                </Table>
              </Card>
            </Col>
            <Col span={14} style={{ paddingLeft: 0 }}>
              <Card>
                <WS0641001_EscortDetailSub
                  selectedRow={this.state.rowSelected[0]}
                  SearchChar={this.state.SearchChar}
                  saveDataDetail={this.saveDataDetail}
                  isLoadDataDetail={this.state.isLoadDataDetail}
                  setLoadingDataDetail={this.setLoadingDataDetail}
                />
              </Card>
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0640001_EscortMaintain);
