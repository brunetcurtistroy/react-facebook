/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Table, Row, Col, Select, Modal, Menu, Dropdown, Form, Button, InputNumber, Input, message } from "antd";
import { MoreOutlined, SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import WS0536001_KeyItemInquiry from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0536001_KeyItemInquiry.jsx';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';

import VisitsKeyInfoSettingAction from "redux/InputBusiness/ProgressSetting/VisitsKeyInfoSetting.action";
class WS0535001_VisitsKeyInfoSetting extends React.Component {
  formRef = React.createRef();
  inputNumInfo = React.createRef()

  static propTypes = {
    Li_KeySerialNum: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '受診キー情報設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSourceKeyInfo: [],
      isLoadingTableKeyInfo: true,
      selectedRowsKeyInfo: [],
      selectedRowKeysKeyInfo: [],
      isReloadTableKeyInfo: true,
      keySerialNumber: '',
      indexTable: 0,

      dataSourceKeyBreakdown: [],
      isLoadingTableKeyBreakdown: true,
      selectedRowsKeyBreakdown: [],
      selectedRowKeysKeyBreakdown: [],
      indexTableKeyBreakdown: 0,
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  componentDidMount() {
    this.getDataKeyInfo();
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getDataKeyInfo();
    }
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  // key Info
  getDataKeyInfo() {
    this.setState({
      isLoadingTableKeyInfo: true
    })

    VisitsKeyInfoSettingAction.getDataKeyInfo()
      .then((res) => {
        let data = res ? res : [];
        data.map(x => (
          x.NameBefore = x.name
        ))
        if (this.state.isReloadTableKeyInfo) {
          this.setState({
            selectedRowsKeyInfo: data && data.length > 0 ? [data[0]] : [],
            selectedRowKeysKeyInfo: data && data.length > 0 ? [data[0].id] : [],
            indexTable: 0,
            keySerialNumber: data && data.length > 0 ? data[0].key_serial_number : null,
          })

          this.getDataKeyBreakdown(data && data.length > 0 ? data[0].key_serial_number : '');
        } else {
          let record = data.find(x => x.key_serial_number === this.state.keySerialNumber);

          this.setState({
            selectedRowsKeyInfo: record ? [record] : [],
            selectedRowKeysKeyInfo: record ? [record.id] : [''],
            indexTable: data.findIndex(x => x.key_serial_number === this.state.keySerialNumber)
          });

          this.getDataKeyBreakdown(record ? record.key_serial_number : '');
        }
        this.setState({
          dataSourceKeyInfo: data,
          isLoadingTableKeyInfo: false,
          isReloadTableKeyInfo: true
        })

        this.formRef.current?.setFieldsValue({
          dataTableKeyInfo: data
        })
      })
      .finally(() => {
        this.setState({
          isLoadingTableKeyInfo: false
        })
      })
  }

  async reloadData() {
    this.setState({ isReloadTableKeyInfo: false })
    await this.getDataKeyInfo();
  }

  createKeyInfo() {
    let params = {
      ...this.formRef.current?.getFieldValue('dataTableKeyInfo')[this.state.indexTable],
    }
    if (this.checkDuplicateDate('info')) {
      message.warning('SEQ 複製 !!');
    } else {
      VisitsKeyInfoSettingAction.createKeyInfo(params)
        .then((res) => {
          message.success('作成したしました。!');
          this.getDataKeyInfo();
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

  updateKeyInfo() {
    let params = {
      ...this.formRef.current?.getFieldValue('dataTableKeyInfo')[this.state.indexTable]
    }
    if (this.checkDuplicateDate('info')) {
      message.warning('SEQ 複製 !!');
    } else {
      VisitsKeyInfoSettingAction.updateKeyInfo(params)
        .then((res) => {
          message.success('更新しました。!');
          this.setState({
            keySerialNumber: params.key_serial_number
          })
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

  deleteKeyInfo(key_serial_number) {
    let params = {
      key_serial_number: key_serial_number
    }
    Modal.confirm({
      width: "250px",
      content: "削除を行いますか ?",
      okText: "は　い",
      cancelText: "いいえ",
      onOk: () => {
        VisitsKeyInfoSettingAction.deleteKeyInfo(params)
          .then((res) => {
            message.success('正常に削除されました !');
            this.getDataKeyInfo();
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

  changeRow(index, type) {
    let data = [];

    if (type === 'info') {
      data = [...this.state.dataSourceKeyInfo];
    } else {
      data = [...this.state.dataSourceKeyBreakdown];
    }

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (type === 'info') {
      if (idTemp) {
        this.setState({
          selectedRowsKeyInfo: [data[0]],
          selectedRowKeysKeyInfo: [data[0].id],
          indexTable: 0,

          dataSourceKeyBreakdown: [],
          selectedRowsKeyBreakdown: [],
          selectedRowKeysKeyBreakdown: [],
          indexTableKeyBreakdown: 0
        });
        this.formRef.current?.setFieldsValue({
          dataTableKeyBreakdown: []
        })
      } else {
        this.setState({
          indexTable: index
        });
        this.getDataKeyBreakdown(data[index].KeySerialNumsBefore);
      }

    } else {
      if (idTemp) {
        this.setState({
          selectedRowsKeyBreakdown: [data[0]],
          selectedRowKeysKeyBreakdown: [data[0].id],
          indexTableKeyBreakdown: 0
        });
      } else {
        this.setState({
          indexTableKeyBreakdown: index
        });
      }
    }


  }

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  // check required field
  checkAddItem(type) {
    if (type === 'info') {
      if (this.state.dataSourceKeyInfo.length > 0) {
        let index = this.state.dataSourceKeyInfo.findIndex(x => !x.key_serial_number);
        if (index === -1) {
          return false;
        }
        return true
      }
    } else {
      if (this.state.dataSourceKeyBreakdown.length > 0) {
        let index = this.state.dataSourceKeyBreakdown.findIndex(x => !x.sort_order);
        if (index === -1) {
          return false;
        }
        return true
      }
    }
  }

  checkDuplicateDate(type) {
    let data = [];
    if (type === 'info') {
      data = [...this.state.dataSourceKeyInfo];
      const uniqueValues = new Set(data.map(x => x.key_serial_number?.toString()));
      if (uniqueValues.size < data.length) {
        return true;
      } return false;
    } else {
      data = [...this.state.dataSourceKeyBreakdown];
      const uniqueValues = new Set(data.map(x => x.sort_order?.toString()));
      if (uniqueValues.size < data.length) {
        return true;
      } return false;
    }
  }

  checkDisabledBtnAdd(type) {
    if (type === 'info') {
      if (this.state.selectedRowsKeyInfo.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.selectedRowsKeyInfo[0].id) ||
          this.checkDuplicateDate(type) ||
          (!this.checkIdTemp(this.state.selectedRowsKeyInfo[0].id) &&
            this.state.selectedRowsKeyInfo[0].key_serial_number !== this.state.selectedRowsKeyInfo[0].KeySerialNumsBefore)) {
          return true;
        } return false;
      } return false;
    } else {
      if (this.state.selectedRowsKeyBreakdown.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.selectedRowsKeyBreakdown[0].id) ||
          this.checkDuplicateDate(type) ||
          (!this.checkIdTemp(this.state.selectedRowsKeyBreakdown[0].id) &&
            this.state.selectedRowsKeyBreakdown[0].sort_order !== this.state.selectedRowsKeyBreakdown[0].SortOrderBefore)) {
          return true;
        } return false;
      } else {
        if (this.state.selectedRowsKeyInfo.length > 0) {
          if (!this.state.selectedRowsKeyInfo[0].id) {
            return true
          }
        }
        return false;
      }
    }

  }

  async handleAddRowTable(type) {
    let newRow = { id: '' };
    let data = [];

    if (type === 'info') {
      data = [...this.state.dataSourceKeyInfo];
      data.unshift(newRow);
      await this.setState({
        dataSourceKeyInfo: data,
        selectedRowsKeyInfo: [newRow],
        selectedRowKeysKeyInfo: [newRow.id],
        indexTable: 0,

        dataSourceKeyBreakdown: [],
        selectedRowsKeyBreakdown: [],
        selectedRowKeysKeyBreakdown: [],
        indexTableKeyBreakdown: 0
      });

      this.formRef.current?.setFieldsValue({
        dataTableKeyBreakdown: []
      })

      this.formRef.current?.setFieldsValue({
        dataTableKeyInfo: data,
      });
    } else {
      newRow = { ...newRow, ascending_descending: 0 }
      data = [...this.state.dataSourceKeyBreakdown];
      data.unshift(newRow);
      await this.setState({
        dataSourceKeyBreakdown: data,
        selectedRowsKeyBreakdown: [newRow],
        selectedRowKeysKeyBreakdown: [newRow.id],
        indexTableKeyBreakdown: 0
      });

      this.formRef.current?.setFieldsValue({
        dataTableKeyBreakdown: data,
      });
    }

    this.forceUpdate();
  }

  updateDatasource(index, field, value, type) {
    let data = [];

    if (type === 'info') {
      data = [...this.state.dataSourceKeyInfo];

      data[index][field] = value;

      this.setState({
        dataSourceKeyInfo: data
      });

      this.formRef.current?.setFieldsValue({
        dataTableKeyInfo: data
      });
    } else {
      data = [...this.state.dataSourceKeyBreakdown];

      data[index][field] = value;

      this.setState({
        dataSourceKeyBreakdown: data
      });

      this.formRef.current?.setFieldsValue({
        dataTableKeyBreakdown: data
      });
    }


  }

  async handleDeleteRowTable(index, type) {
    let data = [];
    if (type === 'info') {
      data = [...this.state.dataSourceKeyInfo];
      await data.splice(index, 1);
      await this.setState({
        dataSourceKeyInfo: data,
        indexTable: 0,
        selectedRowsKeyInfo: data.length > 0 ? [data[0]] : [],
        selectedRowKeysKeyInfo: data.length > 0 ? [data[0].id] : []
      });

      this.formRef.current?.setFieldsValue({
        dataTableKeyInfo: data,
      });
      this.getDataKeyBreakdown(data[0].KeySerialNumsBefore);
    } else {
      data = [...this.state.dataSourceKeyBreakdown];
      await data.splice(index, 1);
      await this.setState({
        dataSourceKeyBreakdown: data,
        indexTableKeyBreakdown: 0,
        selectedRowsKeyBreakdown: data.length > 0 ? [data[0]] : [],
        selectedRowKeysKeyBreakdown: data.length > 0 ? [data[0].id] : []
      });

      this.formRef.current?.setFieldsValue({
        dataTableKeyBreakdown: data,
      });
    }

  }

  //KeyBreakdown
  getDataKeyBreakdown(value) {
    let params = {
      key_serial_number: value
    }

    this.setState({
      isLoadingTableKeyBreakdown: true
    })

    VisitsKeyInfoSettingAction.getDataKeyBreakdown(params)
      .then((res) => {
        let data = res ? res : [];
        data.map(x => (
          x.SortOrderBefore = x.sort_order
        ))
        this.setState({
          dataSourceKeyBreakdown: data,
          selectedRowsKeyBreakdown: data && data.length > 0 ? [data[0]] : [],
          selectedRowKeysKeyBreakdown: data && data.length > 0 ? [data[0].id] : [],
          indexTableKeyBreakdown: 0
        });
        this.formRef.current?.setFieldsValue({
          dataTableKeyBreakdown: data
        })
      })
      .finally(() => {
        this.setState({
          isLoadingTableKeyBreakdown: false
        })
      })
  }

  createAndUpdateKeyBreakdown() {
    let params = {
      ...this.formRef.current?.getFieldValue('dataTableKeyBreakdown')[this.state.indexTableKeyBreakdown],
      key_serial_number: this.state.keySerialNumber,
      SortOrderBefore: this.formRef.current?.getFieldValue('dataTableKeyBreakdown')[this.state.indexTableKeyBreakdown].SortOrderBefore ? this.formRef.current?.getFieldValue('dataTableKeyBreakdown')[this.state.indexTableKeyBreakdown].SortOrderBefore : null,
      ItemCode: this.formRef.current?.getFieldValue('dataTableKeyBreakdown')[this.state.indexTableKeyBreakdown].name
    }
    if (this.checkDuplicateDate('breakdown')) {
      message.warning('ｶﾗﾑ 複製 !!');
    } else {
      VisitsKeyInfoSettingAction.createAndUpdateKeyBreakdown(params)
        .then((res) => {
          message.success(res.data.message === 'Updated successfully.' ? '更新しました。!' : '作成したしました。!');
          this.getDataKeyBreakdown(this.state.keySerialNumber);
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

  deleteKeyBreakdown(sort_order) {
    let params = {
      key_serial_number: this.state.keySerialNumber,
      sort_order: sort_order
    }
    Modal.confirm({
      width: "250px",
      content: "削除を行いますか ?",
      okText: "は　い",
      cancelText: "いいえ",
      onOk: () => {
        VisitsKeyInfoSettingAction.deleteKeyBreakdown(params)
          .then((res) => {
            message.success('正常に削除されました !');
            this.getDataKeyBreakdown(this.state.keySerialNumber);
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
      <div className="visits-key-info-setting">
        <Card title="受診キー情報設定">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Row gutter={24}>
              <Col span={10} style={{ paddingRight: 0 }}>
                <Table
                  size="small"
                  style={{ cursor: 'pointer' }}
                  rowClassName={(record, index) => record.id === this.state.selectedRowsKeyInfo[0]?.id ? 'table-row-light' : ''}
                  dataSource={this.state.dataSourceKeyInfo}
                  loading={this.state.isLoadingTableKeyInfo}
                  pagination={true}
                  bordered={true}
                  rowKey={(record) => record.id}
                  scroll={{ x: 400, y: 600 }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        let index = this.findIndexByID(this.state.dataSourceKeyInfo, record.id)
                        this.setState({
                          selectedRowsKeyInfo: [record],
                          selectedRowKeysKeyInfo: [record.id],
                          indexTable: index,
                          keySerialNumber: record.KeySerialNumsBefore
                        });
                        this.changeRow(index, 'info')
                      }
                    };
                  }}
                >
                  <Table.Column title="SEQ" dataIndex="key_serial_number" width={90}
                    render={(value, record, index) => {
                      return (
                        <Form.Item name={["dataTableKeyInfo", this.findIndexByID(this.state.dataSourceKeyInfo, record.id), "key_serial_number"]} style={{ marginBottom: 0 }}>
                          {
                            this.state.indexTable === this.findIndexByID(this.state.dataSourceKeyInfo, record.id) ?
                              <InputNumber maxLength={3} autoFocus={true} ref={this.inputNumInfo}
                                onChange={(value) => {
                                  this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyInfo, record.id), "key_serial_number", value, 'info')

                                }}
                                onBlur={(e) => {
                                  if (this.checkDuplicateDate('info')) {
                                    this.inputNumInfo.current.focus();
                                  }
                                }}
                              />
                              :
                              <div style={{ paddingRight: 8, textAlign: 'right' }}>{value == 0 ? '' : value}</div>
                          }
                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column title="名称" dataIndex="name"
                    render={(text, record, index) => {
                      return (
                        <Form.Item name={(["dataTableKeyInfo", this.findIndexByID(this.state.dataSourceKeyInfo, record.id), "name"])} style={{ marginBottom: 0 }}>
                          <Input
                            readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSourceKeyInfo, record.id)}
                            style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSourceKeyInfo, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSourceKeyInfo, record.id) ? 'transparent' : '', }}
                            onChange={(event) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyInfo, record.id), "name", event.target.value, 'info')
                            }}
                          />
                        </Form.Item>
                      )
                    }} />
                  <Table.Column width={70} align='center'
                    title={
                      <Button size='small'
                        disabled={this.checkDisabledBtnAdd('info')}
                        onClick={() => { this.handleAddRowTable('info') }}
                        type="primary" icon={<PlusOutlined />}>
                      </Button>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}
                        hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSourceKeyInfo, record.id)}>
                        <Button size='small'
                          hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSourceKeyInfo, record.id)
                            || this.checkAddItem('info')
                            || this.checkDuplicateDate('info')
                            || !(this.state.dataSourceKeyInfo[this.state.indexTable] && this.state.dataSourceKeyInfo[this.state.indexTable].key_serial_number)}
                          style={{ color: 'green', marginRight: '5px' }}
                          onClick={() => {
                            this.checkIdTemp(record.id) ? this.createKeyInfo() : this.updateKeyInfo()
                          }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small' style={{ color: "red" }}
                          onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable(this.findIndexByID(this.state.dataSourceKeyInfo, record.id), 'info') : this.deleteKeyInfo(record.key_serial_number)}
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </div>
                    }}
                  />
                </Table>

              </Col>
              <Col span={14}>
                <Table
                  size="small"
                  style={{ cursor: 'pointer' }}
                  rowClassName={(record, index) => record.id === this.state.selectedRowsKeyBreakdown[0]?.id ? 'table-row-light' : ''}
                  dataSource={this.state.dataSourceKeyBreakdown}
                  loading={this.state.isLoadingTableKeyBreakdown}
                  pagination={true}
                  bordered={true}
                  rowKey={(record) => record.id}
                  scroll={{ x: 500, y: 600 }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        let index = this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id)
                        this.setState({
                          selectedRowsKeyBreakdown: [record],
                          selectedRowKeysKeyBreakdown: [record.id],
                          indexTableKeyBreakdown: index,
                        });
                        this.changeRow(index, 'breakdown')
                      }
                    };
                  }}
                >
                  <Table.Column title="ｶﾗﾑ" dataIndex="sort_order" width={95}
                    render={(value, record, index) => {
                      return (
                        <Form.Item name={["dataTableKeyBreakdown", this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "sort_order"]} style={{ marginBottom: 0 }}>
                          {
                            this.state.indexTableKeyBreakdown === this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id) ?
                              <InputNumber maxLength={3} min={1} autoFocus={true}
                                onChange={(value) => {
                                  this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "sort_order", value, 'breakdown')
                                }}
                              />
                              :
                              <div style={{ paddingRight: 8, textAlign: 'right' }}>{value == 0 ? '' : value}</div>
                          }
                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column title="対象" dataIndex="ItemName"
                    render={(text, record, index) => {
                      return (
                        <Form.Item name={(["dataTableKeyBreakdown", this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "ItemName"])} style={{ marginBottom: 0 }}>
                          {this.state.indexTableKeyBreakdown !== this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id) ?
                            <Input readOnly
                              style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSourceKeyInfo, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSourceKeyInfo, record.id) ? 'transparent' : '', }}
                            />
                            :
                            <Input readOnly
                              style={{ border: this.state.indexTableKeyBreakdown !== this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id) ? 'none' : '', background: this.state.indexTableKeyBreakdown !== this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id) ? 'transparent' : '', }}
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 800,
                                    component:
                                      <WS0536001_KeyItemInquiry
                                        onFinishScreen={(outputData) => {
                                          this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "ItemName", outputData.record.Name, 'breakdown')
                                          this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "name", outputData.record.item_code, 'breakdown')
                                          this.closeModal();
                                        }}
                                      />
                                    ,
                                  },
                                });
                              }}
                            />
                          }

                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column title="順序" dataIndex="ascending_descending"
                    render={(value, record, index) => {
                      return (
                        <Form.Item name={["dataTableKeyBreakdown", this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "ascending_descending"]} style={{ marginBottom: 0 }}>
                          <Select value={record.ascending_descending}
                            readOnly={this.state.indexTableKeyBreakdown !== this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id)}
                            style={{ width: '100%', border: this.state.indexTableKeyBreakdown !== this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id) ? 'none' : '', background: this.state.indexTableKeyBreakdown !== this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id) ? 'transparent' : '', }}
                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "ascending_descending", value, 'breakdown')
                            }}
                          >
                            <Select.Option value={0}>昇順</Select.Option>
                            <Select.Option value={1}>降順</Select.Option>
                          </Select>
                        </Form.Item>
                      )
                    }} />
                  <Table.Column width={40} align='center'
                    render={(value, record, index) => {
                      return (
                        <div>
                          {this.state.indexTableKeyBreakdown !== this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id) ?
                            '' :
                            <Dropdown
                              icon={<MoreOutlined />}
                              overlay={() => (
                                <Menu >
                                  <Menu.Item key='1' onClick={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: '60%',
                                        component: (
                                          <WS0536001_KeyItemInquiry
                                            onFinishScreen={(outputData) => {
                                              this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "ItemName", outputData.record.Name, 'breakdown')
                                              this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "name", outputData.record.item_code, 'breakdown')
                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    })
                                  }}> 項目選択 </Menu.Item>
                                  <Menu.Item key='2'
                                    onClick={() => {
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: true,
                                          width: '70%',
                                          component: (
                                            <WS0271001_InspectItemSearchQuerySingle
                                              onFinishScreen={(outputData) => {
                                                this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "ItemName", outputData.recordData.exam_name, 'breakdown')
                                                this.updateDatasource(this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), "name", outputData.recordData.test_item_code, 'breakdown')
                                                this.closeModal();
                                              }}
                                            />
                                          ),
                                        },
                                      })
                                    }}> 検査選択 </Menu.Item>
                                </Menu>
                              )}>
                              <Button icon={<MoreOutlined />}></Button>
                            </Dropdown>
                          }
                        </div>
                      )
                    }}
                  />
                  <Table.Column width={70} align='center'
                    title={
                      <Button
                        size="small"
                        disabled={this.checkDisabledBtnAdd('breakdown')}
                        onClick={() => { this.handleAddRowTable('breakdown') }}
                        type="primary" icon={<PlusOutlined />}>
                      </Button>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}
                        hidden={this.state.indexTableKeyBreakdown !== this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id)}
                      >
                        <Button size='small'
                          hidden={this.state.indexTableKeyBreakdown !== this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id)
                            || this.checkAddItem('breakdown')
                            || this.checkDuplicateDate('breakdown')
                            || !(this.state.dataSourceKeyBreakdown[this.state.indexTableKeyBreakdown] && this.state.dataSourceKeyBreakdown[this.state.indexTableKeyBreakdown].sort_order)}
                          style={{ color: 'green', marginRight: '5px' }}
                          onClick={() => {
                            this.createAndUpdateKeyBreakdown()
                          }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small' style={{ color: "red" }}
                          onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable(this.findIndexByID(this.state.dataSourceKeyBreakdown, record.id), 'breakdown') : this.deleteKeyBreakdown(record.sort_order)}
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </div>
                    }}
                  />
                </Table>
              </Col>
            </Row>
          </Form>
          <hr />
          <div style={{ marginTop: 15, textAlign: "right" }}>
            <Button type="primary"
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({

                  });
                }
              }}>閉じる
            </Button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0535001_VisitsKeyInfoSetting);
