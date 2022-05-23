import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Select, Input, Checkbox, Table, Menu, Modal, Row, Col, Button, message, InputNumber, Space } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import InstructionDivisionMaintainAction from 'redux/ResultOutput/PrintParamMaintain/InstructionDivisionMaintain.action'
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0397005_InstructionDivisionMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '指示区分保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      parramScreeenData: {
        Li_Format: "",
        Li_Identify: ""
      },
      parramItemMaintenance: {
        Li_Format: "",
        instruction_division: ""
      },
      isLoadingTable: true,
      dataSource: [],
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
      Valueremarks: '',
      ValueremarksMaintain: '',
      dataItemMaintenance: [],
      selectedRowKeysItemMaintenance: [],
      rowSelectedItemMaintenance: [],
      indexTableItemMaintenance: 0,
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this)
    this.handleAddRowTableMaintain = this.handleAddRowTableMaintain.bind(this)
  }
  componentDidMount() {
    this.state.parramScreeenData.Li_Format = this.props.Li_Format
    this.state.parramItemMaintenance.Li_Format = this.props.Li_Format
    this.state.parramScreeenData.Li_Identify = this.props.Li_Identify
    this.getScreenData(true)
  }
  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.state.parramScreeenData.Li_Format = this.props.Li_Format
      this.state.parramItemMaintenance.Li_Format = this.props.Li_Format
      this.state.parramScreeenData.Li_Identify = this.props.Li_Identify
      this.getScreenData(true);
    }
  }
  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    InstructionDivisionMaintainAction.getScreenData(this.state.parramScreeenData)
      .then((res) => {
        let data_table = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data_table ? data_table : [],
          isLoadingTable: false,
          rowSelected: data_table.length > 0 ? [data_table[index]] : [],
          selectedRowKeys: data_table.length > 0 ? [data_table[index].id] : [],
          indexTable: index,
          Valueremarks: data_table.length > 0 ? data_table[index].remarks : '',
        })
        this.state.parramItemMaintenance.instruction_division = this.state.rowSelected[0].instruction_division
        this.getItemMaintenance(true)
        this.formRef.current?.setFieldsValue({
          remarks: data_table.length > 0 ? data_table[index].remarks : ''
        })

      })
      .finally()
  }
  getItemMaintenance(reload) {
    this.setState({ isLoadingTable: true })
    InstructionDivisionMaintainAction.getItemMaintenance(this.state.parramItemMaintenance)
      .then((res) => {
        let data_table = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataItemMaintenance: data_table ? data_table : [],
          isLoadingTable: false,
          rowSelectedItemMaintenance: data_table.length > 0 ? [data_table[index]] : [],
          selectedRowKeysItemMaintenance: data_table.length > 0 ? [data_table[index].id] : [],
          indexTableItemMaintenance: index,
          ValueremarksMaintain: data_table.length > 0 ? data_table[index].remarks : '',
        })
        this.formRef.current?.setFieldsValue({
          remarks1: data_table.length > 0 ? data_table[index].remarks : ''
        })
      })
      .finally()
  }
  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.instruction_division);
      if (index === -1) {
        return false;
      }
      return true
    }
  }
  changeRow(index, table) {
    let data = [];
    if (table == 'dataSource') {
      data = [...this.state.dataSource];
    } else {
      data = [...this.state.dataItemMaintenance];
    }
    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })
    if (table == 'dataSource') {
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
    } else {
      if (idTemp) {
        this.setState({
          rowSelectedItemMaintenance: [data[0]],
          selectedRowKeysItemMaintenance: [data[0].id],
          indexTableItemMaintenance: 0,
        });
      } else {
        this.setState({
          indexTableItemMaintenance: index
        });
      }
    }
  }
  updateRecordData(index) {
    let params = {
      id: this.state.dataSource[index].id ? this.state.dataSource[index].id : '',
      enabled_disabled: this.state.dataSource[index].enabled_disabled,
      instruction_division: this.state.dataSource[index].instruction_division,
      _id_: this.state.dataSource[index]._id_,
      name: this.state.dataSource[index].name,
      remarks: this.state.dataSource[index].remarks,
      Li_Format: this.state.parramScreeenData.Li_Format,
      Li_Identify: this.state.parramScreeenData.Li_Identify
    }
    InstructionDivisionMaintainAction.saveData(params)
      .then((res) => {
        // const func = this.props.onSelect || this.props.onFinishScreen;
        // func({
        //   message: 'Success',
        // });
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
  updateRecordDataMaintain(index) {
    let params = {
      id: this.state.dataItemMaintenance[index].id ? this.state.dataItemMaintenance[index].id : '',
      enabled_disabled: this.state.dataItemMaintenance[index].enabled_disabled,
      item: this.state.dataItemMaintenance[index].item,
      name: this.state.dataItemMaintenance[index].name,
      remarks: this.state.dataItemMaintenance[index].remarks ? this.state.dataItemMaintenance[index].remarks : '',
      Li_Format: this.state.parramItemMaintenance.Li_Format,
      instruction_division: this.state.parramItemMaintenance.instruction_division
    }
    InstructionDivisionMaintainAction.saveItemMaintenance(params)
      .then((res) => {
        message.success('更新しました!')
        this.getItemMaintenance(true)
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
  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkIdTemp(this.state.rowSelected[0].id)) {
        return true;
      } return false;
    } return false;
  }
  checkDisabledBtnAddMaintain() {
    if (this.state.rowSelectedItemMaintenance.length > 0) {
      if (this.checkIdTemp(this.state.rowSelectedItemMaintenance[0].id)) {
        return true;
      } return false;
    } return false;
  }
  handleDeleteRowTable(table) {
    let data = [...this.state.dataSource];
    if (table == 'dataSource') {
      data = [...this.state.dataSource];
      data.splice(0, 1);
      this.setState({
        dataSource: data,
        indexTable: 0,
        rowSelected: data.length > 0 ? [data[0]] : [],
        selectedRowKeys: data.length > 0 ? [data[0].id] : []
      });
    } else {
      data = [...this.state.dataItemMaintenance];
      data.splice(0, 1);
      this.setState({
        dataItemMaintenance: data,
        rowSelectedItemMaintenance: data.length > 0 ? [data[0]] : [],
        selectedRowKeysItemMaintenance: data.length > 0 ? [data[0].id] : [],
        indexTableItemMaintenance: 0,
      })
    }


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
                InstructionDivisionMaintainAction.deleteData(params)
                  .then(res => {
                    // const func = this.props.onSelect || this.props.onFinishScreen;
                    // func({
                    //   message: 'Success',
                    // });
                    message.success('正常に削除されました!');
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
              this.closeModal()
            }} />
      },
    });
  }
  deleteDataMainTain(id) {
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
                InstructionDivisionMaintainAction.deleteItemMaintenance(params)
                  .then(res => {
                    message.success('正常に削除されました!');
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
              this.closeModal()
            }} />
      },
    });
  }
  updateDatasource(table, index, field, value) {
    let data = [];
    if (table == 'dataSource') {
      data = [...this.state.dataSource];
      data[index][field] = value;
      this.setState({
        dataSource: data
      });
    } else {
      data = [...this.state.dataItemMaintenance];
      data[index][field] = value;
      this.setState({
        dataItemMaintenance: data
      });
    }
  }
  async handleAddRowTable() {
    let newRow = { id: '', enabled_disabled: true, _id_: 6, remarks: "" };

    let data = [...this.state.dataSource];

    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });
    this.formRef.current?.setFieldsValue({
      remarks: newRow.remarks
    })
    let newRowMaintain = { id: '', enabled_disabled: true };
    let dataMaintain = [];
    dataMaintain.unshift(newRowMaintain);
    await this.setState({
      dataItemMaintenance: dataMaintain,
      rowSelectedItemMaintenance: [newRowMaintain],
      selectedRowKeysItemMaintenance: [newRowMaintain.id],
      indexTableItemMaintenance: 0,
      dataItemMaintenance : []
    });

    this.forceUpdate();
  }
  async handleAddRowTableMaintain() {
    let newRow = { id: '', enabled_disabled: true };
    let data = [...this.state.dataItemMaintenance];
    data.unshift(newRow);
    await this.setState({
      dataItemMaintenance: data,
      rowSelectedItemMaintenance: [newRow],
      selectedRowKeysItemMaintenance: [newRow.id],
      indexTableItemMaintenance: 0,
    });
    this.forceUpdate();
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  CheckPreview(table, index, field, event) {
    let data = [];
    let value = event ? 1 : 0
    if (table == 'dataSource') {
      data = [...this.state.dataSource];

      data[index][field] = value;

      this.setState({
        dataSource: data
      });
    } else {
      data = [...this.state.dataItemMaintenance];

      data[index][field] = value;

      this.setState({
        dataItemMaintenance: data
      });

    }
  }
  Copyctrlshiftc(index) {
    let params = {
      format : this.state.parramScreeenData.Li_Format,
      instruction_division : this.state.dataSource[index].instruction_division
    }
    InstructionDivisionMaintainAction.copyctrlshiftc(params)
      .then((res) => {
        message.success('更新しました!')
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
  Attachedctrlshiftv(index) {
    let params = {
      format : this.state.parramScreeenData.Li_Format,
      instruction_division : this.state.dataSource[index].instruction_division
    }
    InstructionDivisionMaintainAction.attachedctrlshiftv(params)
      .then((res) => {
        message.success('更新しました!')
        this.getItemMaintenance(true)
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
  render() {
    return (
      <div className="instruction-division-maintain p-td">
        <Card title="指示区分保守">
          <Form ref={this.formRef}
            initialValues={{ remarks: true, remarks1: true }}>
            <Row>
              <Col span={12}>
                <Table
                  size="small"
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ y: 400 }}
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
                      this.formRef.current?.setFieldsValue({ remarks: record.remarks })
                      this.changeRow(index, 'dataSource')
                      this.state.parramItemMaintenance.instruction_division = this.state.dataSource[index].instruction_division
                      this.getItemMaintenance(true)
                    },
                  }}>
                  <Table.Column align="center" width={50}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'left' }}>
                          <Input type="checkbox" defaultChecked={record.enabled_disabled ? true : false} maxLength={4}
                            onChange={(event) =>
                              this.CheckPreview('dataSource', this.findIndexByID(this.state.dataSource, record.id), "enabled_disabled", event.target.checked)}
                          />
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="指示" align="center" width={80}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'left' }}>
                          {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                            <span style={{ paddingLeft: 8 }}>{record.instruction_division}</span>
                            :
                            <Input value={record.instruction_division} maxLength={4}
                              onChange={(event) => {
                                this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "instruction_division", event.target.value)
                              }}
                            />
                          }
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="識別" width={100} render={(value, record, index) => {
                    return <Select style={{ width: "100%" }} defaultValue={record._id_} onChange={() => { }}>
                      <Select.Option value={1}>様式</Select.Option>
                      <Select.Option value={2}>ﾍｯﾀﾞ</Select.Option>
                      <Select.Option value={3}>所見</Select.Option>
                      <Select.Option value={4}>検査</Select.Option>
                      <Select.Option value={5}>判定</Select.Option>
                      <Select.Option value={6}>その他</Select.Option>
                    </Select>
                  }} />
                  <Table.Column title="名&emsp;称" dataIndex="name" align="center" width={80}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'left' }}>
                          {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                            <span style={{ paddingLeft: 8 }}>{record.name}</span>
                            :
                            <Input value={record.name} maxLength={4}
                              onChange={(event) => {
                                this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "name", event.target.value)
                              }}
                            />
                          }
                        </div>
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
                          hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                          onClick={() => { this.updateRecordData(this.findIndexByID(this.state.dataSource, record.id)) }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small' style={{ border: 'none' }}
                          onClick={() => {
                            this.checkIdTemp(record.id) ? this.handleDeleteRowTable('dataSource') : this.deleteData(record.id)
                          }}
                          danger
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </div>;
                    }}
                  />
                </Table>
              </Col>
              <Col span={12}>
                <Table
                  size="small"
                  dataSource={this.state.dataItemMaintenance}
                  loading={this.state.isLoadingTable}
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ y: 400 }}
                  bordered
                  rowSelection={{
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKeysItemMaintenance,
                    onSelect: (record, selected, selectedRows) => {
                      let index = this.state.dataItemMaintenance.findIndex(x => x.id === record.id)
                      this.setState({
                        rowSelectedItemMaintenance: selectedRows,
                        selectedRowKeysItemMaintenance: selectedRows.map(x => x.id),
                        indexTableItemMaintenance: index
                      });
                      this.changeRow(index, 'dataItemMaintenance')
                      this.formRef.current?.setFieldsValue({ remarks1: record.remarks })
                    },
                  }}
                >
                  <Table.Column align="center" width={50}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'left' }}>
                          <Input type="checkbox" defaultChecked={record.enabled_disabled ? true : false}
                            onChange={(event) =>
                              this.CheckPreview('dataItemMaintenance', this.findIndexByID(this.state.dataItemMaintenance, record.id), "enabled_disabled", event.target.checked)}
                          />
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="項&emsp;目" align="center" width={80}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'left' }}>
                          <Input value={record.item} maxLength={2000}
                            onChange={(event) => {
                              this.updateDatasource('dataItemMaintenance', this.findIndexByID(this.state.dataItemMaintenance, record.id), "item", event.target.value)
                            }}
                          />
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="名&emsp;称" dataIndex="name" align="center"
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'left' }}>
                          <Input value={record.name} maxLength={40}
                            onChange={(event) => {
                              this.updateDatasource('dataItemMaintenance', this.findIndexByID(this.state.dataItemMaintenance, record.id), "name", event.target.value)
                            }}
                          />
                        </div>
                      )
                    }}
                  />
                  <Table.Column width={70}
                    title={
                      <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          disabled={this.checkDisabledBtnAddMaintain()}
                          onClick={this.handleAddRowTableMaintain}
                          type="primary" icon={<PlusOutlined />}>
                        </Button>
                      </div>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          hidden={this.state.indexTableItemMaintenance !== this.findIndexByID(this.state.dataItemMaintenance, record.id) || this.checkDisabledBtnAdd()}
                          onClick={() => { this.updateRecordDataMaintain(this.findIndexByID(this.state.dataItemMaintenance, record.id)) }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small' style={{ border: 'none' }}
                          onClick={() => {
                            this.checkIdTemp(record.id) ? this.handleDeleteRowTable('dataItemMaintenance') : this.deleteDataMainTain(record.id)
                          }}
                          danger
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </div>;
                    }}
                  />
                </Table>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="remarks" defaultValue={this.state.Valueremarks ?? ''} style={{ width: '99%', marginTop: '0.3em' }}>
                  <Input.TextArea rows={4}
                    onChange={(event) => {
                      this.updateDatasource('dataSource', this.state.indexTable, "remarks", event.target.value)
                    }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="remarks1" style={{ width: '99%', marginTop: '0.3em' }}>
                  <Input.TextArea rows={4} disabled={this.state.rowSelectedItemMaintenance.length == 0} onChange={(event) => {
                    this.updateDatasource('dataItemMaintenance', this.state.indexTableItemMaintenance, "remarks", event.target.value)
                  }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Space style={{ float: 'right', marginTop: '1em' }}>
            <Button style={{ background: '#E3E4E1' }} onClick={() => {
              this.Copyctrlshiftc(this.state.indexTable)
            }} >行ｺﾋﾟｰ</Button>
            <Button style={{ background: '#E3E4E1' }} onClick={() => {
              this.Attachedctrlshiftv(this.state.indexTable)
            }} >行貼付</Button>
            {/* <Button style={{ background: '#E3E4E1' }} onClick={() => {
              const func = this.props.onSelect || this.props.onFinishScreen;
              func({
                message: 'Success',
              });
            }} >OK</Button> */}
          </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0397005_InstructionDivisionMaintain);
