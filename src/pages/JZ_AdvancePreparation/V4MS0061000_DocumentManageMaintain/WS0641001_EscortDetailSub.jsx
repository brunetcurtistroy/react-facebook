/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Input, Form, Checkbox, Table, Row, Col, Modal, Button, Select, Space, InputNumber, message } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import EscortDetailSubAction from "redux/AdvancePreparation/DocumentManageMaintain/EscortDetailSub.action";
import WS0641008_BasicConditionSet from "./WS0641008_BasicConditionSet";
import WS0641021_InspectConditionSetting from "./WS0641021_InspectConditionSetting";
import WS0104001_CoursesSettingSub from "pages/KS_CooperationRelated/YMGA0610_EMedicalRecordsInspectRequestMaintain/WS0104001_CoursesSettingSub";

import './WS0640001_EscortMaintain.scss';

const styleLabelCol = {
  background: '#1890ff',
  color: '#fff',
  padding: '5px 10px',
  width: '65px',
  marginRight: '10px',
  float: 'left'
}

const styleLabel = {
  background: '#1890ff',
  color: '#fff',
  width: '65px',
  marginRight: '10px',
  float: 'left',
  textAlign: 'center'
}
class WS0641001_EscortDetailSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
      old_W1_text_num: null,

      CompChecked: false,
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(PropPev) {
    if (this.props.selectedRow !== PropPev.selectedRow || this.props.isLoadDataDetail) {
      this.getScreenData();

      if (this.props.setLoadingDataDetail) {
        this.props.setLoadingDataDetail()
      }
    }
  }

  getScreenData() {
    this.setState({ isLoadingTable: true })

    let params = {
      ...this.props.selectedRow,
      SearchChar: this.props.SearchChar
    }

    EscortDetailSubAction.getDataTable(params)
      .then((res) => {
        let data = res ? res.Data : [];
        if (data.length > 0) {
          data.map((x, index) => {
            x.fontWeight = this.props.SearchChar ? (this.checkTextBoldBySearch(index, data) ? 'bold' : '') : ''
          })
        }
        this.setState({
          dataSource: data,
          isLoadingTable: false,

          rowSelected: res && res.Data.length > 0 ? [res.Data[0]] : [],
          selectedRowKeys: res && res.Data.length > 0 ? [res.Data[0].id] : [],
          indexTable: 0,
          old_W1_text_num: res && res.Data.length > 0 ? res.Data[0].W1_text_num : null,

          CompChecked: res ? res.Comp : '',
        })

        this.formRef.current?.setFieldsValue({
          Comp: res ? res.Comp : '',
          Max: res ? res.Max === 0 ? '' : res.Max : '',
          CompProcessLineNumInfo: res ? res.CompProcessLineNumInfo : '',
          CompStartingLineInfo: res ? res.CompStartingLineInfo : '',
          Rem: res ? res.Rem : '',
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  updateRecordData(index) {
    let params = { ...this.state.dataSource[index] }
    if (this.checkDuplicateCode()) {
      message.warning('送付先管理番号 複製 !!');
    } else {
      EscortDetailSubAction.updateRecordData(params)
        .then((res) => {
          // message.success('更新しました。!')
          this.updateRecordDataBtn()
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

  confirmUpdate() {
    if (this.checkDuplicateCode()) {
      message.warning('送付先管理番号 複製 !!');
    } else {
      Modal.confirm({
        width: "250px",
        content: "変更内容を更新しますか ?",
        okText: "は　い",
        cancelText: "いいえ",
        onOk: () => {
          this.updateRecordDataBtn()
        },
        onCancel: () => {
          this.getScreenData();
        }
      })
    }
  }

  updateRecordDataBtn() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      Comp: this.state.CompChecked,
      id: this.props.selectedRow.id,
      CompStartingLineInfo: this.props.selectedRow.CompProcessLineNumInfo,
      CompProcessLineNumInfo: this.props.selectedRow.CompProcessLineNumInfo,
      Lio_EscortContent1: this.props.selectedRow.escort_content_1,
      Lio_EscortContent2: this.props.selectedRow.escort_content_2,
      Lio_EscortContent3: this.props.selectedRow.escort_content_3,
      Lio_EscortContent4: this.props.selectedRow.escort_content_4,
      Lio_EscortContent5: this.props.selectedRow.escort_content_5,
    }

    EscortDetailSubAction.updateDataBtn(params)
      .then((res) => {
        message.success('更新しました。!')
        if (this.props.saveDataDetail) {
          this.props.saveDataDetail(this.props.selectedRow)
        }
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
        EscortDetailSubAction.deleteRecordData(params)
          .then(res => {
            // message.success('正常に削除されました !');
            this.updateRecordDataBtn();
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

  checkTextBoldBySearch(index, data) {
    let rerult = false;
    if (this.props.SearchChar && data.length > 0) {
      if (data[index].W1_message?.toString().includes(this.props.SearchChar) ||
        data[index].W1_inspect?.toString().includes(this.props.SearchChar) ||
        data[index].W1_condition?.toString().includes(this.props.SearchChar) ||
        data[index].W1_gender_sex?.toString().includes(this.props.SearchChar) ||
        data[index].W1_remark?.toString().includes(this.props.SearchChar) ||
        data[index].W1_gender_sex?.toString().includes(this.props.SearchChar)
      ) {
        rerult = true;
      }
    }
    return rerult
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];
    const uniqueValues = new Set(lstData.map(v => v.W1_text_num));

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
      let index = this.state.dataSource.findIndex(x => !x.W1_text_num || !x.W1_message);
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
          this.state.rowSelected[0].W1_text_num !== this.state.old_W1_text_num)) {
        return true;
      } return false;
    } return false;
  }

  // add new record
  async handleAddRowTable() {
    let newRow = {
      id: '',
      Gender: '',
      CourseClassify: '',
      W1_inspect: '',
      W1_condition: '',
      CourseList: ''
    };

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

  async handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    await data.splice(0, 1);
    await this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : [],
      old_W1_text_num: data.length > 0 ? data[0].W1_text_num : null
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

  onFinish(values) {

  }

  render() {
    return (
      <div className="escort-detail-sub">
        <Form ref={this.formRef} onFinish={this.onFinish}
        >
          <div>
            <Row gutter={24}>
              <Col span={10}>
                <Space>
                  <Form.Item name="Comp" label="行詰" valuePropName="Checkbox" style={{ marginBottom: 5 }}>
                    <Checkbox checked={this.state.CompChecked}
                      onChange={(event) => this.setState({ CompChecked: event.target.checked })}
                    ></Checkbox>
                  </Form.Item>
                  <Form.Item name="Max" label="行数" style={{ marginBottom: 5 }}>
                    <InputNumber maxLength={3} disabled={!this.state.CompChecked}
                      onChange={(value) => {
                        this.formRef.current?.setFieldsValue({
                          Max: value === 0 ? '' : value
                        })
                      }}
                    />
                  </Form.Item>
                </Space>
              </Col>
              <Col span={12}>
                <Form.Item name="CompStartingLineInfo" label="開始" style={{ marginBottom: 5 }}>
                  <Input disabled={!this.state.CompChecked} />
                </Form.Item>
                <Form.Item name="CompProcessLineNumInfo" label="行数" style={{ marginBottom: 5 }}>
                  <Input disabled={!this.state.CompChecked} />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <hr />

          <div style={{ padding: '10px 0px' }}>
            <Table
              size='small'
              style={{ cursor: 'pointer' }}
              rowClassName={(record, index) => record.id === this.state.rowSelected[0].id ? 'table-row-light' : ''}
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={false}
              rowKey={(record) => record.id}
              scroll={{ x: 500, y: 400 }}
              bordered
              onRow={(record, rowIndex) => {
                let index = this.state.dataSource.findIndex(x => x.id === record.id)
                return {
                  onClick: () => {
                    this.setState({
                      rowSelected: [record],
                      selectedRowKeys: [record.id],
                      indexTable: index,
                      old_W1_text_num: record.W1_text_num
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
            //       old_W1_text_num: record.W1_text_num
            //     });
            //     this.changeRow(index)
            //   },
            // }}
            >
              <Table.Column title="連番" width={90} dataIndex="W1_text_num"
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <div style={{ textAlign: "right", paddingRight: 7 }}>
                          {value}
                        </div>
                        :
                        <InputNumber value={record.W1_text_num} max={200} maxLength={3}
                          className={record.fontWeight === 'bold' ? 'input-text-bold' : ''}
                          style={{ fontWeight: record.fontWeight }}
                          onChange={(value) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_text_num", value)
                          }} />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="内容" dataIndex="W1_message"
                render={(value, record, index) => {
                  return (
                    <Input value={record.W1_message} maxLength={256}
                      readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                      style={{
                        border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '',
                        background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '',
                        fontWeight: record.fontWeight
                      }}
                      onChange={(event) => {
                        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_message", event.target.value)
                      }} />
                  )
                }}
              />
              <Table.Column title="基本条件" dataIndex="expression_22" />
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
                      hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() ||
                        !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].W1_text_num) || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].W1_message)}
                      onClick={() => { this.updateRecordData(this.findIndexByID(this.state.dataSource, record.id)) }}
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
          </div>
          <div
          // hidden={this.state.dataSource.length === 0 || !(this.state.dataSource.length > 0 && this.state.dataSource[this.state.indexTable].W1_text_num)}
          hidden={this.state.dataSource.length === 0}
          >
            <Row gutter={24} style={{ marginTop: 15 }}>
              <Col span={13} style={{ paddingLeft: 5 }}>
                <label style={{ ...styleLabelCol, ...{ padding: '2px 10px', float: 'none' } }}>条件</label>
                <div style={{ padding: '10px', border: '1px solid #096dd9a1' }}>
                  <div>
                    <div style={styleLabel}>基  本</div>
                    <Form.Item style={{ marginBottom: 5 }}>
                      <Input.Search
                        value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].W1_inspect : ''}
                        onChange={(event) => {
                          this.updateDatasource(this.state.indexTable, "W1_inspect", event.target.value)
                        }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '60%',
                              component: (
                                <WS0641008_BasicConditionSet
                                  Lio_BasicCondition={this.state.rowSelected[0].W1_inspect}
                                  onFinishScreen={(output) => {
                                    let value = '';
                                    if (output.type === 'category') {
                                      if (output.datas.length > 0) {
                                        value = output.datas.join(', ') + ';'
                                      }
                                    }

                                    if (output.type === 'facilities') {
                                      if (output.datas.length > 0) {
                                        value = output.datas.join(', ') + ';' + ' ' + '[号車]'
                                      }
                                    }

                                    if (output.type === 'time') {
                                      if (output.datas.length > 0) {
                                        value = output.datas.join(', ') + ';' + ' ' + '[TIME]'
                                      }
                                    }

                                    this.updateDatasource(this.state.indexTable, "W1_inspect", value)
                                    this.closeModal();
                                  }}
                                />),
                            },
                          })
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <div style={styleLabel}>検  査</div>
                    <Form.Item style={{ marginBottom: 5 }}>
                      <Input.Search
                        value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].W1_condition : ''}
                        onChange={(event) => {
                          this.updateDatasource(this.state.indexTable, "W1_condition", event.target.value)
                        }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 600,
                              component: (
                                <WS0641021_InspectConditionSetting
                                  Lio_InspectCondition={this.state.rowSelected[0].W1_condition}
                                  onFinishScreen={(output) => {
                                    let value = '';
                                    if (output.datas.length > 0) {
                                      value = output.Division + ', ' + output.datas.join(', ') + ';'
                                    }

                                    this.updateDatasource(this.state.indexTable, "W1_condition", value)
                                    this.closeModal();
                                  }}
                                />),
                            },
                          })
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <div style={styleLabel}>性  別</div>
                    <Form.Item style={{ marginBottom: 5 }}>
                      <Select style={{ width: '100px' }} value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].Gender : ''}
                        onChange={(value) => {
                          this.updateDatasource(this.state.indexTable, "Gender", value)
                        }}
                      >
                        <Select.Option value="">全て</Select.Option>
                        <Select.Option value="M">男性</Select.Option>
                        <Select.Option value="F">女性</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div>
                    <div style={styleLabel}>コース</div>
                    <div style={{ width: 'calc(100% - 80px)', display: 'inline-block' }}>
                      <Form.Item style={{ marginBottom: 5, width: '100px', marginRight: 5, float: 'left' }}>
                        <Select style={{ width: '100px' }} value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].CourseClassify : ''}
                          onChange={(value) => {
                            this.updateDatasource(this.state.indexTable, "CourseClassify", value)
                          }}
                        >
                          <Select.Option value=""> </Select.Option>
                          <Select.Option value="OR">OR</Select.Option>
                          <Select.Option value="NOT">NOT</Select.Option>
                        </Select>
                      </Form.Item >
                      <Form.Item style={{ marginBottom: 5, width: 'calc(100% - 105px)' }}>
                        <Input.Search value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].CourseList : ''}
                          onChange={(event) => {
                            this.updateDatasource(this.state.indexTable, "CourseList", event.target.value)
                          }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '60%',
                                component: (
                                  <WS0104001_CoursesSettingSub
                                    Li_Title={'ｺｰｽ条件'}
                                    Lio_CourseList={this.state.rowSelected[0].CourseList}
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.state.indexTable, "CourseList", output.Lio_CourseList)
                                      this.closeModal();
                                    }}
                                  />),
                              },
                            })
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={11} style={{ padding: '0 5px 0 0' }}>
                <label style={{ ...styleLabelCol, ...{ padding: '2px 10px', float: 'none' } }}>内容の置き換え ※基本条件によって切替</label>
                <div style={{ padding: '10px', border: '1px solid #096dd9a1', height: '138px' }}>
                  <div hidden={this.state.dataSource.length > 0 && this.state.dataSource[this.state.indexTable].W1_inspect && (this.state.dataSource[this.state.indexTable].W1_inspect.includes('[号車]') || this.state.dataSource[this.state.indexTable].W1_inspect.includes('[TIME]'))}>
                    <div>
                      <div style={styleLabel}>契  約</div>
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Input
                          value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].Contract : ''}
                          onChange={(event) => {
                            this.updateDatasource(this.state.indexTable, "Contract", event.target.value)
                          }} />
                      </Form.Item>
                    </div>
                    <div>
                      <div style={styleLabel}>ｵﾌﾟｼｮﾝ</div>
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Input
                          value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].Option : ''}
                          onChange={(event) => {
                            this.updateDatasource(this.state.indexTable, "Option", event.target.value)
                          }} />
                      </Form.Item>
                    </div>
                    <div>
                      <div style={styleLabel}>追  加</div>
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Input
                          value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].Added : ''}
                          onChange={(event) => {
                            this.updateDatasource(this.state.indexTable, "Added", event.target.value)
                          }} />
                      </Form.Item>
                    </div>
                    <div>
                      <div style={styleLabel}>不  要</div>
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Input
                          value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].Unnecessary : ''}
                          onChange={(event) => {
                            this.updateDatasource(this.state.indexTable, "Unnecessary", event.target.value)
                          }} />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div style={{ margin: '10px 0' }}>
              <div style={styleLabel}>備　考</div>
              <Form.Item style={{ marginBottom: 5 }}>
                <Input
                  value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].W1_remark : ''}
                  onChange={(event) => {
                    this.updateDatasource(this.state.indexTable, "W1_remark", event.target.value)
                  }} />
              </Form.Item>
            </div>
            {/* <div style={{ margin: '20px 0', textAlign: 'right' }}>
              <Button type="primary"
                onClick={() => {
                  this.updateRecordData(this.state.indexTable)
                }}
              >保存</Button>
            </div> */}
          </div>
          <div style={{ marginTop: 20, textAlign: 'right' }}>
            <Button type="primary"
              onClick={() => {
                this.confirmUpdate()
              }}
            >更新</Button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0641001_EscortDetailSub);
