import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import scrollIntoView from 'scroll-into-view';
import { Card, Table, Modal, Button, message, Input, Space, InputNumber, Menu, Dropdown } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined, DeleteOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import WS0452005_ConvertTblSubAll from "pages/SM_SystemMaintenance/V4MS9900800_UserParamMaintain/WS0452005_ConvertTblSubAll.jsx"
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS0267001_CategorySearchQuerySingle from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx';
import WS0397001_ParamPromptedQuerySub from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0397001_ParamPromptedQuerySub.jsx';
import WS0400001_OptionalInputSub from 'pages/UT_UserTools/V4UT4010000_FormCreateEditing/WS0400001_OptionalInputSub.jsx';
import UserParamInput0Action from 'redux/ResultOutput/CsvCreateParamMaintain/UserParamInput0.action'
import WS0454004_ConvertTblSubAll from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0454004_ConvertTblSubAll'
import WS0461004_CharacterStringSearch from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0461004_CharacterStringSearch.jsx'
import WS0454003_ConvertTblSubInspect from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0454003_ConvertTblSubInspect.jsx'
import CharacterStringSearchAction from 'redux/ResultOutput/CsvCreateParamMaintain/CharacterStringSearch.action'
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0461005_UserParamInput0 extends React.Component {

  static propTypes = {
    Li_Format: PropTypes.any,
    Li_Name: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'ﾕｰｻﾞｰﾊﾟﾗﾒｰﾀ入力0';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: [],
      code: '',
      isLoading: false,
      dataSource: [],
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: '',
      Lo_SeqSearch: '',
      SearchString: ''
    };
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  handleScroll() {
    scrollIntoView(document.querySelector('.scroll-row'), {
      align: {
        top: 0,
        left: 0
      },
    });
  }
  checkConditionIndex(series, kind) {
    let result;
    let x = kind.slice(0, 1);
    let code = kind.slice(1, 7);
    result = series.indexOf(x);
    return result;
  }
  componentDidMount() {
    this.getListData(this.props, true)
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListData(this.props, true)
    }
  }
  getListData(props, reload) {

    const params = {
      Li_Name: props?.Li_Name,
      Li_Format: props?.Li_Format,
    }
    this.setState({ isLoading: true })
    UserParamInput0Action.getListData(params).then(async res => {
      let index = reload ? 0 : this.state.indexTable;
      let data = res ? res : [];
      await this.setState({
        Lo_SeqSearch: data[index].seq,
        dataSource: data,
        rowSelected: data.length > 0 ? [data[index]] : [],
        selectedRowKeys: data.length > 0 ? [data[index].id] : [],
        indexTable: index,
      })
      this.handleScroll()
    }).finally(() => this.setState({
      isLoading: false,
    }))
  }
  async handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    await data.splice(0, 1);
    await this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
    });
  }
  deleteData(record) {
    let params = {
      id: record.id,
    }
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 300,
        component:
          <WS0061015_CheckYesNoNo
            Li_Message={'削除を実行しますか ?'}
            onFinishScreen={(ouput) => {
              if (ouput.Lio_StsReturn) {
                UserParamInput0Action.deleteData(params)
                  .then(res => {
                    message.success('正常に削除されました!');
                    this.getListData(this.props, true)
                  })
              }
              this.closeModal()
            }} />
      },
    });
  }
  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };
  updateRecordData(index) {
    let params = {
      ...this.state.dataSource[index],
      // ...this.formRef.current?.getFieldValue()
    }

    UserParamInput0Action.saveData(params)
      .then((res) => {
        this.getListData(this.props, this.state.dataSource[index].id ? false : true)
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
  createRecordData() {
    let data = this.state.dataSource && this.state.dataSource[0] ? this.state.dataSource[0] : null;
    let params = {
    }
    if (!!data) {
      params = {
        Li_Format: data.Li_Format,
        seq: data.seq,
        kind: data.kind,
        remarks: data.remarks,
        number_of_digits: data.number_of_digits,
        position: data.position,
        set_pattern: data.set_pattern,
        error_checking: data.error_checking,
        option_remark: data.option_remark,
      }
      UserParamInput0Action.saveData(params)
        .then((res) => {
          this.getListData(this.props, true)
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
  // add new record
  async handleAddRowTable() {
    let data = this.state.dataSource.map(s => s);
    let newRow = {
      isNew: 1,
      id: '',
      disabledSave: true,
      Li_Format: this.props.Li_Format,
      seq: 0, position: 0,
      number_of_digits: 0
    };
    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });
    this.forceUpdate();
  }
  checkDataItem(isNew, record) {
    if (isNew === undefined) {
      if (!this.state.dataSource.some(s => s.id === record.id)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }
  showWS0271001_InspectItemSearchQuerySingle(record, Code) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0271001_InspectItemSearchQuerySingle
            Lio_InspectItemCode={Code}
            onFinishScreen={(output) => {
              const res = {
                Code: output.Lio_InspectItemCode,
                exam_name: output?.Lo_exam_name,
                screen: 271,
                kind: ''
              }
              this.showScreenByAfter(record, res, true)
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  showWS0452003_ConvertTblSubInspect(record, res) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0271001_InspectItemSearchQuerySingle
            Li_Format={res?.Li_Format}
            Li_InspectCode={res.Li_InspectCode}
            Li_InspectName={res.Li_InspectName}
            Li_InspectCmtCode={res.Li_InspectCmtCode}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  showWS0267001_CategorySearchQuerySingle(record, Code) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0267001_CategorySearchQuerySingle
            Lio_CategoryCode={Code}
            onFinishScreen={(output) => {
              const res = {
                Code: output.Lio_CategoryCode,
                category_name: output?.recordData?.category_name,
                screen: 267,
                kind: ''
              }
              this.showScreenByAfter(record, res, true)
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  showScreenByAfter(record, res, isntShowScreen) {
    const screen = res && res.screen
    const params = {
      screen: screen,
      Code: res?.Code,
      kind: record?.kind,
      category_name: !!isntShowScreen ? res?.category_name : record?.category_name,
      name: record?.name,
      exam_name: !!isntShowScreen ? res?.exam_name : record?.exam_name,
    }
    UserParamInput0Action.GzoomAfter(params).then(result => {
      if (screen === 271) {
        if (!isntShowScreen) {
          this.showWS0271001_InspectItemSearchQuerySingle(record, res?.Code)
        } else {
          let data = [...this.state.dataSource]
          const index = data.findIndex(s => s.id === record.id)
          data[index].kind = result.kind
          data[index].remarks = result.remarks
          if (index !== -1) {
            this.setState({
              rowSelected: [this.state.dataSource[index]],
              selectedRowKeys: [this.state.dataSource[index]?.id],
              indexTable: index
            })
          }
        }

      }

      if (screen === 267) {
        if (!isntShowScreen) {
          this.showWS0267001_CategorySearchQuerySingle(record, res?.Code)
        } else {
          let data = [...this.state.dataSource]
          const index = data.findIndex(s => s.id === record.id)
          data[index].kind = result.kind
          data[index].remarks = result.remarks
          if (index !== -1) {
            this.setState({
              rowSelected: [this.state.dataSource[index]],
              selectedRowKeys: [this.state.dataSource[index]?.id],
              indexTable: index
            })
          }
        }

      }
      if (screen === 397) {
        this.showWS0397001_ParamPromptedQuerySub(result, record)
      }
    })
  }
  showWS0397001_ParamPromptedQuerySub() {

    const kind = this.state.rowSelected[0]?.kind
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0397001_ParamPromptedQuerySub
            Li_Format={'C'}
            Lo_IndicationDivision={kind ? kind : ''}
            onFinishScreen={(output) => {
              let data = [...this.state.dataSource]
              const index = data.findIndex(s => s.id === this.state.rowSelected[0]?.id)
              data[index].kind = output.Lo_IndicationDivision
              data[index].remarks = output?.Lo_RecodeData?.name
              if (index !== -1) {
                this.setState({
                  rowSelected: [this.state.dataSource[index]],
                  selectedRowKeys: [this.state.dataSource[index]?.id],
                  indexTable: index
                })
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  Gzoom(record) {
    UserParamInput0Action.GZoomBefore({ kind: record?.kind ? record?.kind : '' }).then(res => {
      this.showScreenByAfter(record, res)
    })
  }
  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.id);
      if (index === -1) {
        return false;
      }
      return true
    }
  }
  showWS0452005_ConvertTblSubAll(res) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0452005_ConvertTblSubAll
            Li_Format={res.Li_Format}
            onFinishScreen={({ output }) => {

              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  showWS0454004_ConvertTblSubAll(res) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0454004_ConvertTblSubAll
            Li_Format={res.Li_Format}
            Li_InspectCode={res?.Li_InspectCode}
            onFinishScreen={({ output }) => {

              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  showWS0454003_ConvertTblSubInspect(res) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0454003_ConvertTblSubInspect
            Li_Format={res.Li_Format}
            Li_InspectCode={res?.Li_InspectCode}
            Li_InspectName={res.Li_InspectName}
            Li_InspectCmtCode={res.Li_InspectCmtCode}
            onFinishScreen={({ output }) => {

              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkAddItem() || this.checkIdTemp(this.state.rowSelected[0].id)) {
        return true;
      } return false;
    } return false;
  }
  eventF9(params) {
    UserParamInput0Action.f9({ Li_Format: params }).then(res => {
      if (res && res.message === 'Call Screen WS0452005') {
        this.showWS0452005_ConvertTblSubAll(res)
      } else {
        this.showWS0452003_ConvertTblSubInspect(res)
      }
    })
  }
  eventF10() {
    UserParamInput0Action.f10().then(res => {
      if (res && res.message !== 'Call Screen WS0454004') {
        this.showWS0454003_ConvertTblSubInspect(res)
      } else {
        this.showWS0454004_ConvertTblSubAll(res)
      }
    })
  }
  showWS0461004_CharacterStringSearch(res) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '30%',
        component: (
          <WS0461004_CharacterStringSearch
            Li_Format={res.Li_Format}
            // Li_SeqCurrent={res?.seq}
            onFinishScreen={(output) => {
              const index = this.state.dataSource.findIndex(s => s.seq === output?.Lo_SeqSearch);
              if (index !== -1) {
                this.setState({
                  SearchString: output?.recordData?.CharStringSearch,
                  Lo_SeqSearch: output?.Lo_SeqSearch,
                  rowSelected: [this.state.dataSource[index]],
                  selectedRowKeys: [this.state.dataSource[index]?.id],
                  indexTable: index
                })
                this.handleScroll()
              }

              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  search() {
    const Lo_SeqSearch = (Number(this.state.Lo_SeqSearch) + 1)
    const req = {
      Li_Format: this.state.rowSelected[0].Li_Format,
      Li_SeqCurrent: Lo_SeqSearch,
      SearchString: this.state.SearchString,
    }
    CharacterStringSearchAction.getSearch(req).then((res) => {
      if (res) {
        const index = this.state.dataSource.findIndex(s => s.seq === res.Lo_SeqSearch);
        if (index !== -1) {
          this.setState({
            Lo_SeqSearch: this.state.dataSource[index].seq,
            rowSelected: [this.state.dataSource[index]],
            selectedRowKeys: [this.state.dataSource[index]?.id],
            indexTable: index
          })
          this.handleScroll()
        }
      }
    })
  }
  ctrlN() {
    this.search()
  }
  returnKindHtml(record) {
    var span = () =>
    (<span style={{ cursor: 'pointer' }} onDoubleClick={async () => {
      await this.Gzoom(record)
    }}>{record.kind}</span>)
    var inputKind = () => (<Input value={record?.kind} onDoubleClick={async () => {
      if (record && !record.isNew) {
        await this.Gzoom(record)
      } else {
        await this.showWS0397001_ParamPromptedQuerySub()
      }

    }} onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "kind", e.target.value) }}>
    </Input>)
    var checkDefaults = this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)

    return (
      <div>
        {
          checkDefaults ? span() : inputKind()
        }
      </div>
    )
  }
  render() {
    return (
      <div className="user-param-input0">
        <Card title="ﾕｰｻﾞｰﾊﾟﾗﾒｰﾀ入力0">
          <Space >
            <Button onClick={() => this.eventF9(this.props.Li_Format)}>
            検査変換
            </Button>
            <Button onClick={() => this.eventF10()}>
            所見変換
            </Button>
            <Button disabled={!this.state.rowSelected[0] || !!this.state?.dataSource[0]?.isNew}
              onClick={() => this.showWS0461004_CharacterStringSearch(this.state.rowSelected[0])}>
              検索
            </Button>
            <Button disabled={!this.state.SearchString.length > 0}
              onClick={() => this.ctrlN()}>
              次を検索
            </Button>
          </Space>
          <hr style={{ margin: '15px 0' }} />
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            rowClassName={(record, index) => record.id === this.state.rowSelected[0]?.id ? 'scroll-row table-row-light' : ''}
            size="small"
            scroll={{ y: '500px' }}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            onRow={(record, rowIndex) => {
              return {
                onClick: async () => {
                  let oldRecord = this.state.rowSelected[0]
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  await this.setState({
                    Lo_SeqSearch: record?.seq,
                    rowSelected: [record],
                    selectedRowKeys: [record.id],
                    indexTable: index
                  })
                }
              }
            }}
          >
            <Table.Column width={90} title="SEQ" dataIndex="seq" render={(value, record, index) => {
              return (
                <div> {
                  this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                    <div style={{ textAlign: "right" }}>{record.seq}</div> :
                    <InputNumber value={record?.seq}

                      onChange={(e) => {
                        let data = [...this.state.dataSource];
                        if (e > 0) {

                          data[index].disabledSave = false;
                          this.setState({ dataSource: data })
                        } else {
                          data[index].disabledSave = true;
                        }
                        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "seq", Number(e))
                      }}>
                    </InputNumber>
                }

                </div>
              )
            }} />
            <Table.Column width={150} title="種  別" dataIndex="kind"
              render={(value, record) => {
                return this.returnKindHtml(record)
              }}
            />
            <Table.Column width={200} title="名　称" dataIndex="remarks"
              render={(value, record, index) => {
                return (
                  <div> {
                    this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div>{record.remarks}</div> :
                      <Input value={record?.remarks} onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "remarks", e.target.value) }}>
                      </Input>
                  }
                  </div>
                )
              }}
            />
            <Table.Column title="桁数" dataIndex="number_of_digits" width={80}
              render={(value, record, index) => {
                return (
                  <div> {
                    this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div style={{ textAlign: "right" }}>{record.number_of_digits}</div> :
                      <InputNumber value={record?.number_of_digits} onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "number_of_digits", e) }}>
                      </InputNumber>
                  }
                  </div>
                )
              }}
            />
            <Table.Column title="位置" dataIndex="position" width={80}
              render={(value, record, index) => {
                return (
                  <div> {
                    this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div style={{ textAlign: "right" }}>{record.position}</div> :
                      <InputNumber value={record?.position} onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "position", e) }}>
                      </InputNumber>
                  }
                  </div>
                )
              }}
            />
            <Table.Column title="設定" dataIndex="set_pattern" width={90}
              render={(value, record, index) => {
                return (
                  <div> {
                    this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div>{record.set_pattern}</div> :
                      <Input value={record?.set_pattern} onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "set_pattern", e.target.value) }}>
                      </Input>
                  }
                  </div>
                )
              }}
            />
            <Table.Column title="C" dataIndex="error_checking" width={60}
              render={(value, record, index) => {
                return (
                  <div> {
                    this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div>{record.error_checking}</div> :
                      <Input value={record?.error_checking} onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "error_checking", e.target.value) }}>
                      </Input>
                  }
                  </div>
                )
              }} />
            <Table.Column title="オ プ シ ョ ン" dataIndex="option_remark"
              render={(value, record) => {
                return (
                  <div>
                    {
                      this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ cursor: 'pointer' }} onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '70%',
                              component: (
                                <WS0400001_OptionalInputSub
                                  Lio_Option={record.option_remark}
                                  Li_Format={record.format}
                                  Li_IndicationDivision={record.instruction_division}

                                  onFinishScreen={({ output }) => {


                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }}>{record.option_remark}</span> :
                        <Input value={record?.option_remark}

                          onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "option_remark", e.target.value) }}>
                        </Input>
                    }

                  </div>
                )
              }}
            />
            <Table.Column width={85} fixed='right'
              title={
                <div style={{ textAlign: "center" }}>
                  <Button
                    disabled={this.checkDisabledBtnAdd()}
                    onClick={() => this.handleAddRowTable()}
                    type="primary" icon={<PlusOutlined />}>
                  </Button>
                </div>
              }
              render={(text, record, index) => {
                return <div style={{ textAlign: "center" }}>
                  <Button
                    hidden={!!record.isNew || this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ||
                      this.checkAddItem() ||
                      (!this.state.dataSource[this.state.indexTable].id)}
                    onClick={() => { this.updateRecordData(this.findIndexByID(this.state.dataSource, record.id)) }}
                    style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}

                    icon={<SaveOutlined />} >
                  </Button>
                  <Button
                    disabled={record?.disabledSave}
                    style={{ color: record?.disabledSave ? '' : '#42b10b', border: 'none', marginRight: '5px' }}
                    hidden={!record.isNew} onClick={() => { this.createRecordData() }} icon={<SaveOutlined />} ></Button>
                  <Button style={{ border: 'none' }}
                    onClick={() => {
                      !record.id ? this.handleDeleteRowTable() : this.deleteData(record)
                    }}
                    danger
                    icon={<DeleteOutlined />}
                  >
                  </Button>
                </div>;
              }}
            />
          </Table>
          <TextArea name="Expression_7"
            readOnly
            value={this.state.rowSelected[0]?.Expresstion_7}
            rows={3} type="text" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0461005_UserParamInput0);
