import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Input, Modal, Button, Space, message, Dropdown, Form, Menu, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS0397001_ParamPromptedQuerySub from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0397001_ParamPromptedQuerySub.jsx';
import WS0400001_OptionalInputSub from 'pages/UT_UserTools/V4UT4010000_FormCreateEditing/WS0400001_OptionalInputSub.jsx';
import OldItemAction from "redux/ResultOutput/PrintParamMaintain/OldItem.action"
import { MoreOutlined } from '@ant-design/icons';
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import  ModalDraggable  from "components/Commons/ModalDraggable";


class WS0857001_OldItem extends React.Component {
  static propTypes = {
    Li_StyleCode: PropTypes.string,
    Li_StsListFormat: PropTypes.any,
    parramScreeenData: PropTypes.any,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '旧明細';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      parramScreeenData: {
        Li_StyleCode: "",
        Li_StsListFormat: ""
      },
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
      Valueremarks: '',
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }
  componentDidMount() {
    this.state.parramScreeenData.Li_StyleCode = this.props.Li_StyleCode
    this.state.parramScreeenData.Li_StsListFormat = this.props.Li_StsListFormat
    this.getScreenData(true);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.state.parramScreeenData.Li_StyleCode = this.props.Li_StyleCode
      this.state.parramScreeenData.Li_StsListFormat = this.props.Li_StsListFormat
      this.getScreenData(true);
    }
  }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    OldItemAction.getScreenData(this.state.parramScreeenData)
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data,
          isLoadingTable: false,
          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,
          Valueremarks: data.length > 0 ? data[index].remarks : '',
        })
        this.formRef.current?.setFieldsValue({
          remarks: data.length > 0 ? data[index].remarks : ''
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.PatternClassify && !x.item);
      if (index === -1) {
        return false;
      }
      return true
    }
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
        indexTable: 0,
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

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }
  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkIdTemp(this.state.rowSelected[0].id)) {
        return true;
      } return false;
    } return false;
  }
  handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    data.splice(0, 1);
    this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
    });
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
      indexTable: 0,
    });
    this.formRef.current?.setFieldsValue({ remarks: newRow.remarks })
    this.forceUpdate();
  }
  deleteData(id) {
    let params = {
      id: id
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
                OldItemAction.deleteData(params)
                  .then(res => {
                    message.success('正常に削除されました!');
                    this.getScreenData(true)
                  })
                  .catch((err) => {
                    console.log(err)
                    const res = err.response;
                    if (!res || !res.data || !res.data.message) {
                      message.error("エラーが発生しました");
                      return;
                    }
                    message.error(res.data.message);
                  });
              }
              this.closeModal()
            }} />
      },
    });
  }
  updateRecordData(index) {
    let params = {
      id: this.state.dataSource[index].id ?? '',
      record_number: this.state.dataSource[index].record_number,
      format_name: this.state.dataSource[index].format_name,
      instruction_division: this.state.dataSource[index].instruction_division,
      parameters: this.state.dataSource[index].parameters,
      remarks: this.state.dataSource[index].remarks,
      Li_StyleCode: this.state.parramScreeenData.Li_StyleCode
    }
    OldItemAction.saveData(params)
      .then((res) => {
        message.success('更新しました!')
        this.getScreenData(true)
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

  getInstructionDivisionChange(record) {
    let params = {
      instruction_division: record.instruction_division,
      format_name: record.format_name,
      parameters: record.parameters,
      Li_StsListFormat: this.state.parramScreeenData.Li_StsListFormat
    }
    OldItemAction.instructiondivisionchange(params)
      .then((res) => {
        return res.data
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

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }
  render() {
    return (
      <div className="old-item ">
        <Card title="旧明細">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={false}
              rowKey={(record) => record.id}
              scroll={{ x: 500, y: 600 }}
              bordered
              rowSelection={{
                type: "radio",
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows) => {
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  this.setState({
                    rowSelected: selectedRows,
                    selectedRowKeys: selectedRows.map(x => x.id),
                    indexTable: index
                  });
                  this.changeRow(index)
                  this.formRef.current?.setFieldsValue({ remarks: record.remarks })
                },
              }}
            >
              <Table.Column title="No" dataIndex="record_number" width={50}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 8 }}>{record.record_number}</span>
                        :
                        <InputNumber value={record.record_number} maxLength={4}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "record_number", e === 0 ? null : e)
                          }}
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="名　　称" width={150}
                render={(value, record, index) => {
                  return (
                    <div>
                      <div style={{ marginRight: 7, float: 'left' }}>
                        <Input.Search value={record.format_name} style={{ width: '100%' }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 700,
                                component: (
                                  <WS0397001_ParamPromptedQuerySub
                                    Li_Format={this.state.parramScreeenData.Li_StsListFormat ? 'B' : 'A'}
                                    Lo_IndicationDivision={record.instruction_division ?? ""}
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "instruction_division", output.Lo_IndicationDivision)
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "format_name", e.target.value)
                          }}
                        />
                      </div>
                    </div>
                  )
                }} />
              <Table.Column title="指示" width={100}
                render={(value, record, index) => {
                  return (
                    <Input.Search value={record.instruction_division} style={{ width: '100%', textAlign: 'right' }}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '80%',
                            component: (
                              <WS0397001_ParamPromptedQuerySub
                                Li_Format={this.state.parramScreeenData.Li_StsListFormat ? 'B' : 'A'}
                                Lo_IndicationDivision={record.instruction_division ?? ""}
                                format_name={record.format_name ?? ""}
                                parameters={record.parameters ?? ""}
                                format='instruction_division_857001'
                                onFinishScreen={(output) => {
                                  this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "format_name", output.Lio_Name)
                                  this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "instruction_division", output.Lo_IndicationDivision)
                                  this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "parameters", output.Lio_Option)
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }}
                      onChange={(e) => {
                        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "instruction_division", e.target.value)
                      }}
                    />
                  )
                }} />
              <Table.Column title="....+....1....+....2....+....3....+....4....<....5....+....6....+....7....+....8....+....9<...+....0"
                render={(value, record, index) => {
                  return (
                    <Input.Search value={record.parameters} style={{ width: '100%' }}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '80%',
                            component: (
                              <WS0400001_OptionalInputSub
                                // Li_Format={this.state.parramScreeenData.Li_StsListFormat ? 'B' : 'A'}
                                // Lo_IndicationDivision={record.instruction_division}
                                onFinishScreen={(output) => {
                                  // this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "format_name", output.Lo_IndicationDivision)
                                  // this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "parameters", output.instruction_division)
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }}
                      onChange={(e) => {
                        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "parameters", e.target.value)
                      }}
                    />
                  )
                }} />
              <Table.Column width={70} fixed='right'
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
                      hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                      onClick={() => { this.updateRecordData(this.findIndexByID(this.state.dataSource, record.id)) }}
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
            </Table>
            <Form.Item name="remarks" defaultValue={this.state.Valueremarks ?? ''} style={{ width: '99%', marginTop: '0.3em' }}>
              <Input.TextArea rows={4}
                onChange={(event) => {
                  this.updateDatasource(this.state.indexTable, "remarks", event.target.value)
                }} />
            </Form.Item>
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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0857001_OldItem);
