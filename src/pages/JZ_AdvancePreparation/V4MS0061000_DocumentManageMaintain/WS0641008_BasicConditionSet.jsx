import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Radio, Table, Button, Select, Input, Space, Modal, message, TimePicker } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS0267001_CategorySearchQuerySingle from "pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle";


import BasicConditionSetAction from "redux/AdvancePreparation/DocumentManageMaintain/BasicConditionSet.action";
import moment from "moment";
import Color from "constants/Color";
class WS0641008_BasicConditionSet extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_BasicCondition: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '基本条件設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      checkRadio: 0,
      dataSource0: [],
      isLoadingTable0: false,
      selectedRowKeys0: [],
      rowSelected0: [],
      indexTable0: 0,
      old_W2_cd: null,

      dataSource1: [],
      isLoadingTable1: false,
      selectedRowKeys1: [],
      rowSelected1: [],
      indexTable1: 0,
      old_W4_facility_type: null,
      lstFacilityType: [],

      dataSource2: [],
      isLoadingTable2: false,
      selectedRowKeys2: [],
      rowSelected2: [],
      indexTable2: 0,
      old_W5_time_f: null,
      old_W5_time_t: null,
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getBasicConditionSet();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getBasicConditionSet();
    }
  }

  getBasicConditionSet() {
    let params = {
      W1_inspect: this.props.Lio_BasicCondition
    }

    BasicConditionSetAction.getConditionSet(params)
      .then((res) => {
        let radioValue = 0;
        if (this.props.Lio_BasicCondition.includes('[号車]')) {
          radioValue = 1;
        } else {
          if (this.props.Lio_BasicCondition.includes('[TIME]')) {
            radioValue = 2;
          } else {
            radioValue = 0;
          }
        }

        this.setState({ checkRadio: radioValue });
        this.formRef.current.setFieldsValue({ Division: radioValue });
        this.changeRadioValue(radioValue)
      })
  }

  // inspect-category-set
  getDataInspectCategory() {
    this.setState({ isLoadingTable0: true })
    BasicConditionSetAction.getDataInspectCategory()
      .then((res) => {
        this.setState({
          dataSource0: res ? res : [],
          isLoadingTable0: false,

          rowSelected0: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys0: res && res.length > 0 ? [res[0].id] : [],
          indexTable0: 0,
          old_W2_cd: res && res.length > 0 ? res[0].W2_cd : null,
        })

      })
      .finally(() => this.setState({ isLoadingTable0: false }))
  }

  createAndUpdateInspectCategory(index) {
    let params = { ...this.state.dataSource0[index] }
    if (this.checkDuplicateCode('category')) {
      message.warning('ｺｰﾄﾞ 複製 !!');
    } else {
      BasicConditionSetAction.createAndUpdateInspectCategory(params)
        .then((res) => {
          message.success('更新しました。!')
          this.getDataInspectCategory()
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

  deleteInspectCategory(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: "は　い",
      cancelText: "いいえ",
      onOk: () => {
        BasicConditionSetAction.deleteInspectCategory(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataInspectCategory();
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

  // facilities-set
  getScreenFacilities() {
    BasicConditionSetAction.getScreenFacilities()
      .then((res) => {
        this.setState({
          lstFacilityType: res
        })

      })
  }

  getDataFacilities() {
    this.setState({ isLoadingTable1: true })
    BasicConditionSetAction.getDataFacilities()
      .then((res) => {
        this.setState({
          dataSource1: res ? res : [],
          isLoadingTable1: false,

          rowSelected1: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys1: res && res.length > 0 ? [res[0].id] : [],
          indexTable1: 0,
          old_W4_facility_type: res && res.length > 0 ? res[0].W4_facility_type : null,
        })

      })
      .finally(() => this.setState({ isLoadingTable1: false }))
  }

  createAndUpdateFacilities(index) {
    let params = { ...this.state.dataSource1[index] }
    if (this.checkDuplicateCode('facilities')) {
      message.warning('ｺｰﾄﾞ 複製 !!');
    } else {
      BasicConditionSetAction.createAndUpdateFacilities(params)
        .then((res) => {
          message.success('更新しました。!')
          this.getDataFacilities()
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

  deleteFacilities(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: "は　い",
      cancelText: "いいえ",
      onOk: () => {
        BasicConditionSetAction.deleteFacilities(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataFacilities();
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

  // time-settings
  getDataTimeSetting() {
    this.setState({ isLoadingTable2: true })
    BasicConditionSetAction.getDataTimeSetting()
      .then((res) => {
        this.setState({
          dataSource2: res ? res : [],
          isLoadingTable2: false,

          rowSelected2: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys2: res && res.length > 0 ? [res[0].id] : [],
          indexTable2: 0,
          old_W5_time_f: res && res.length > 0 ? res[0].W5_time_f : null,
          old_W5_time_t: res && res.length > 0 ? res[0].W5_time_t : null,
        })

      })
      .finally(() => this.setState({ isLoadingTable2: false }))
  }

  createAndUpdateTimeSetting(index) {
    let params = { ...this.state.dataSource2[index] }
    if (this.checkDuplicateCode('time')) {
      message.warning('ｺｰﾄﾞ 複製 !!');
    } else {
      BasicConditionSetAction.createAndUpdateTimeSetting(params)
        .then((res) => {
          message.success('更新しました。!')
          this.getDataTimeSetting()
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

  deleteTimeSetting(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: "は　い",
      cancelText: "いいえ",
      onOk: () => {
        BasicConditionSetAction.deleteTimeSetting(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataTimeSetting();
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

  // Change Radio
  changeRadioValue(value) {
    if (value === 0) {
      this.getDataInspectCategory();
    }
    if (value === 1) {
      this.getScreenFacilities();
      this.getDataFacilities();
    }
    if (value === 2) {
      this.getDataTimeSetting();
    }

  }

  /////
  checkDuplicateCode(type) {
    let lstData = [];
    if (type === 'category') {
      lstData = [...this.state.dataSource0];
      const uniqueValues = new Set(lstData.map(v => v.W2_cd));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }

    if (type === 'facilities') {
      lstData = [...this.state.dataSource1];
      const uniqueValues = new Set(lstData.map(v => v.W2_classific));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }

    if (type === 'time') {
      lstData = [...this.state.dataSource2];
      const uniqueValues = new Set(lstData.map(v => (v.W5_time_f + '_' + v.W5_time_t)));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }
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

  checkAddItem(type) {
    if (type === 'category') {
      if (this.state.dataSource0.length > 0) {
        let index = this.state.dataSource0.findIndex(x => !x.W2_cd);
        if (index === -1) {
          return false;
        }
        return true
      }
    }

    if (type === 'facilities') {
      if (this.state.dataSource1.length > 0) {
        let index = this.state.dataSource1.findIndex(x => !x.W4_facility_type);
        if (index === -1) {
          return false;
        }
        return true
      }
    }

    if (type === 'time') {
      if (this.state.dataSource2.length > 0) {
        let index = this.state.dataSource2.findIndex(x => !x.W5_time_f || !x.W5_time_t);
        if (index === -1) {
          return false;
        }
        return true
      }
    }
  }

  checkDisabledBtnAdd(type) {
    if (type === 'category') {
      if (this.state.rowSelected0.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.rowSelected0[0].id) ||
          (!this.checkIdTemp(this.state.rowSelected0[0].id) &&
            this.state.rowSelected0[0].W2_cd !== this.state.old_W2_cd)) {
          return true;
        } return false;
      } return false;
    }

    if (type === 'facilities') {
      if (this.state.rowSelected1.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.rowSelected1[0].id) ||
          (!this.checkIdTemp(this.state.rowSelected1[0].id) &&
            this.state.rowSelected1[0].W4_facility_type !== this.state.old_W4_facility_type)) {
          return true;
        } return false;
      } return false;
    }

    if (type === 'time') {
      if (this.state.rowSelected2.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.rowSelected2[0].id) ||
          (!this.checkIdTemp(this.state.rowSelected2[0].id) &&
            this.state.rowSelected2[0].W5_time_f !== this.state.old_W5_time_f && this.state.rowSelected2[0].W5_time_t !== this.state.old_W5_time_t)) {
          return true;
        } return false;
      } return false;
    }
  }

  // add new record
  async handleAddRowTable(type) {
    let newRow = { id: '' };

    let data = [];

    if (type === 'category') {
      newRow = { ...newRow, W2_classific: 'J' }
      data = [...this.state.dataSource0]
      data.unshift(newRow);
      await this.setState({
        dataSource0: data,
        rowSelected0: [newRow],
        selectedRowKeys0: [newRow.id],
        indexTable0: 0
      });
    }

    if (type === 'facilities') {
      data = [...this.state.dataSource1]
      data.unshift(newRow);
      await this.setState({
        dataSource1: data,
        rowSelected1: [newRow],
        selectedRowKeys1: [newRow.id],
        indexTable1: 0
      });
    }

    if (type === 'time') {
      data = [...this.state.dataSource2]
      data.unshift(newRow);
      await this.setState({
        dataSource2: data,
        rowSelected2: [newRow],
        selectedRowKeys2: [newRow.id],
        indexTable2: 0
      });
    }

    this.forceUpdate();
  }

  // check selected record while add new
  changeRow(index, type) {
    let data = [];
    if (type === 'category') {
      data = [...this.state.dataSource0]

      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          rowSelected0: [data[0]],
          selectedRowKeys0: [data[0].id],
          indexTable0: 0
        });
      } else {
        this.setState({
          indexTable0: index
        });
      }
    }

    if (type === 'facilities') {
      data = [...this.state.dataSource1]

      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          rowSelected1: [data[0]],
          selectedRowKeys1: [data[0].id],
          indexTable1: 0
        });
      } else {
        this.setState({
          indexTable1: index
        });
      }
    }

    if (type === 'time') {
      data = [...this.state.dataSource2]

      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          rowSelected2: [data[0]],
          selectedRowKeys2: [data[0].id],
          indexTable2: 0
        });
      } else {
        this.setState({
          indexTable2: index
        });
      }
    }
  }

  updateDatasource(index, field, value, type) {
    let data = [];

    if (type === 'category') {
      data = [...this.state.dataSource0]

      data[index][field] = value;

      this.setState({
        dataSource0: data
      });
    }

    if (type === 'facilities') {
      data = [...this.state.dataSource1]

      data[index][field] = value;

      this.setState({
        dataSource1: data
      });
    }

    if (type === 'time') {
      data = [...this.state.dataSource2]

      data[index][field] = value;

      this.setState({
        dataSource2: data
      });
    }
  }

  handleDeleteRowTable(type) {
    let data = [];

    if (type === 'category') {
      data = [...this.state.dataSource0]

      data.splice(0, 1);
      this.setState({
        dataSource0: data,
        indexTable0: 0,
        rowSelected0: data.length > 0 ? [data[0]] : [],
        selectedRowKeys0: data.length > 0 ? [data[0].id] : [],
        old_W2_cd: data.length > 0 ? data[0].W2_cd : null
      });
    }

    if (type === 'facilities') {
      data = [...this.state.dataSource1]

      data.splice(0, 1);
      this.setState({
        dataSource1: data,
        indexTable1: 0,
        rowSelected1: data.length > 0 ? [data[0]] : [],
        selectedRowKeys1: data.length > 0 ? [data[0].id] : [],
        old_W4_facility_type: data.length > 0 ? data[0].W4_facility_type : null
      });
    }

    if (type === 'time') {
      data = [...this.state.dataSource2]

      data.splice(0, 1);
      this.setState({
        dataSource2: data,
        indexTable2: 0,
        rowSelected2: data.length > 0 ? [data[0]] : [],
        selectedRowKeys2: data.length > 0 ? [data[0].id] : [],
        old_W5_time_f: data.length > 0 ? data[0].W5_time_f : null,
        old_W5_time_t: data.length > 0 ? data[0].W5_time_t : null
      });
    }
  }

  onFinish(values) { }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  resultData() {
    let data = [];
    let type = '';

    if (this.state.checkRadio === 0) {
      type = 'category'
      data = this.state.dataSource0.map(x => x.W2_cd?.toString().padStart(8, '0'))
    }

    if (this.state.checkRadio === 1) {
      type = 'facilities'
      data = this.state.dataSource1.map(x => x.W4_facility_type)
    }

    if (this.state.checkRadio === 2) {
      type = 'time'
      data = this.state.dataSource2.map(x => (
        x = x.W5_time_f + '-' + x.W5_time_t
      ))
    }

    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        datas: data,
        type: type
      });
    }

  }

  render() {
    return (
      <div className="basic-condition-set">
        <Card title="基本条件設定">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ Division: 0 }}
          >
            <Space className='mb-3'>
              <Button type="primary">条件選択</Button>
              <Form.Item name="Division" style={{ marginBottom: 0 }}>
                <Radio.Group onChange={(e) => {
                  this.setState({ checkRadio: e.target.value });
                  this.changeRadioValue(e.target.value)
                }} >
                  <Radio value={0}>検査</Radio>
                  <Radio value={1}>施設</Radio>
                  <Radio value={2}>時間</Radio>
                </Radio.Group>
              </Form.Item>
            </Space>

            <div style={{ display: this.state.checkRadio === 0 ? '' : 'none' }}>
              <Table
                size='small'
                dataSource={this.state.dataSource0}
                loading={this.state.isLoadingTable0}
                pagination={false}
                scroll={{ y: 700 }}
                bordered
                rowKey={(res) => res.id}
                rowSelection={{
                  type: "radio",
                  selectedRowKeys: this.state.selectedRowKeys0,
                  onSelect: (record, selected, selectedRows) => {
                    let index = this.state.dataSource0.findIndex(x => x.id === record.id)
                    this.setState({
                      rowSelected0: selectedRows,
                      selectedRowKeys0: selectedRows.map(x => x.id),
                      indexTable0: index,
                      old_W2_cd: record.W2_cd
                    });
                    this.changeRow(index, 'category')
                  },
                }}
              >
                <Table.Column title="区分" dataIndex="W2_classific" width={95}
                  render={(value, record, index) => {
                    return (
                      <div>
                        {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                          // <Input value={record.W2_classific === 'J' ? '検査' : 'ｶﾃｺﾞﾘ'} readOnly
                          //   style={{ border: 'none', background: 'transparent' }}
                          // />
                          <span style={{ color: Color(record.W2_classific === 'J' ? 243 : 242)?.Foreground }}>{record.W2_classific === 'J' ? '検査' : 'ｶﾃｺﾞﾘ'}</span>
                          :
                          <Select value={record.W2_classific} style={{ width: '100%' }}
                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "W2_classific", value, 'category')
                              this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "W2_cd", '', 'category')
                              this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "expression_6", '', 'category')
                            }}
                          >
                            <Select.Option value="J" style={{ color: Color(243).Foreground }}>
                              <span style={{ color: Color(243).Foreground }}>検査</span>
                            </Select.Option>
                            <Select.Option value="G" style={{ color: Color(242).Foreground }}>
                              <span style={{ color: Color(242).Foreground }}>ｶﾃｺﾞﾘ</span>
                            </Select.Option>
                          </Select>
                        }
                      </div>
                    )
                  }} />
                <Table.Column title="ｺｰﾄﾞ" dataIndex="W2_cd" width={130}
                  render={(value, record, index) => {
                    return (
                      <div>
                        {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                          <span>{record.W2_cd}</span>
                          // <Input value={record.W2_cd} readOnly
                          //   style={{ border: 'none', background: 'transparent' }}
                          // />
                          :
                          <Input.Search value={record.W2_cd} maxLength={3} type="number" readOnly
                            onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '80%',
                                  component: (record.W2_classific === 'J') ?
                                    <WS0271001_InspectItemSearchQuerySingle
                                      Lio_InspectItemCode={record.W2_cd}
                                      onFinishScreen={(output) => {
                                        this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "W2_cd", output.recordData.test_item_code, 'category')
                                        this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "expression_6", output.recordData.exam_name, 'category')
                                        this.closeModal();
                                      }}
                                    /> :
                                    <WS0267001_CategorySearchQuerySingle
                                      Lio_CategoryCode={record.W2_cd}
                                      onFinishScreen={(output) => {
                                        this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "W2_cd", output.recordData.category_code, 'category')
                                        this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "expression_6", output.recordData.category_name, 'category')
                                        this.closeModal();
                                      }}
                                    />
                                },
                              })
                            }}
                          // onChange={(e) => {
                          //   this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "W2_cd", e.target.value, 'category')
                          // }}
                          />
                        }
                      </div>
                    )
                  }} />
                <Table.Column title="名称" dataIndex="expression_6" />
                <Table.Column width={70}
                  title={
                    <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        disabled={this.checkDisabledBtnAdd('category')}
                        onClick={() => this.handleAddRowTable('category')}
                        type="primary" icon={<PlusOutlined />}>
                      </Button>
                    </div>
                  }
                  render={(text, record, index) => {
                    return <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        hidden={this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id)
                          || this.checkAddItem('category')
                          || !(this.state.dataSource0[this.state.indexTable0] && this.state.dataSource0[this.state.indexTable0].W2_cd)}
                        onClick={() => { this.createAndUpdateInspectCategory(this.findIndexByID(this.state.dataSource0, record.id)) }}
                        style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                        icon={<SaveOutlined />} >
                      </Button>
                      <Button size='small' style={{ border: 'none' }}
                        onClick={() => {
                          this.checkIdTemp(record.id) ? this.handleDeleteRowTable('category') : this.deleteInspectCategory(record.id)
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

            <div style={{ display: this.state.checkRadio === 1 ? '' : 'none' }}>
              <Table
                size='small'
                dataSource={this.state.dataSource1}
                loading={this.state.isLoadingTable1}
                pagination={false}
                scroll={{ y: 700 }}
                bordered
                rowKey={(res) => res.id}
                rowSelection={{
                  type: "radio",
                  selectedRowKeys: this.state.selectedRowKeys1,
                  onSelect: (record, selected, selectedRows) => {
                    let index = this.state.dataSource1.findIndex(x => x.id === record.id)
                    this.setState({
                      rowSelected1: selectedRows,
                      selectedRowKeys1: selectedRows.map(x => x.id),
                      indexTable1: index,
                      old_W4_facility_type: record.W4_facility_type
                    });
                    this.changeRow(index, 'facilities')
                  },
                }}
              >
                <Table.Column title="施設" dataIndex="W4_facility_type"
                  render={(value, record, index) => {
                    return (
                      <div>
                        {this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) ?
                          <Select value={record.W4_facility_type} style={{ width: '100%' }} disabled>
                            {this.state.lstFacilityType?.map(value => (
                              <Select.Option key={'FacilityType-' + Math.random()} value={value.LinkedField}>
                                {value.DisplayField}
                              </Select.Option>
                            ))}
                          </Select>
                          :
                          <Select value={record.W4_facility_type} style={{ width: '100%' }}
                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "W4_facility_type", value, 'facilities')
                            }}>
                            {this.state.lstFacilityType?.map(value => (
                              <Select.Option key={'FacilityType-' + Math.random()} value={value.LinkedField}>
                                {value.DisplayField}
                              </Select.Option>
                            ))}
                          </Select>
                        }
                      </div>
                    )
                  }} />
                <Table.Column width={70}
                  title={
                    <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        disabled={this.checkDisabledBtnAdd('facilities')}
                        onClick={() => this.handleAddRowTable('facilities')}
                        type="primary" icon={<PlusOutlined />}>
                      </Button>
                    </div>
                  }
                  render={(text, record, index) => {
                    return <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        hidden={this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) || this.checkAddItem('facilities')
                          || !(this.state.dataSource1[this.state.indexTable1] && this.state.dataSource1[this.state.indexTable1].W4_facility_type)}
                        onClick={() => { this.createAndUpdateFacilities(this.findIndexByID(this.state.dataSource1, record.id)) }}
                        style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                        icon={<SaveOutlined />} >
                      </Button>
                      <Button size='small' style={{ border: 'none' }}
                        onClick={() => {
                          this.checkIdTemp(record.id) ? this.handleDeleteRowTable('facilities') : this.deleteFacilities(record.id)
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

            <div style={{ display: this.state.checkRadio === 2 ? '' : 'none' }}>
              <Table
                size='small'
                dataSource={this.state.dataSource2}
                loading={this.state.isLoadingTable2}
                pagination={false}
                scroll={{ y: 700 }}
                rowKey={(res) => res.id}
                bordered
                rowSelection={{
                  type: "radio",
                  selectedRowKeys: this.state.selectedRowKeys2,
                  onSelect: (record, selected, selectedRows) => {
                    let index = this.state.dataSource2.findIndex(x => x.id === record.id)
                    this.setState({
                      rowSelected2: selectedRows,
                      selectedRowKeys2: selectedRows.map(x => x.id),
                      indexTable2: index,
                      old_W5_time_f: record.W5_time_f,
                      old_W5_time_t: record.W5_time_t
                    });
                    this.changeRow(index, 'time')
                  },
                }}
              >
                <Table.Column title="時間範囲"
                  render={(value, record, index) => {
                    return (
                      <div>
                        {this.state.indexTable2 !== this.findIndexByID(this.state.dataSource2, record.id) ?
                          <div>
                            <span>{record.W5_time_f}</span> ~ <span>{record.W5_time_t}</span>
                          </div>
                          :
                          <Space>
                            <TimePicker defaultValue={moment(record.W5_time_f ? record.W5_time_f : '00:00', 'HH:mm')} format='HH:mm' style={{ width: '100%' }}
                              onChange={(value) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "W5_time_f", value?.format('HH:mm'), 'time')
                              }}
                            />
                            <div>~</div>
                            <TimePicker defaultValue={moment(record.W5_time_t ? record.W5_time_t : '00:00', 'HH:mm')} format='HH:mm' style={{ width: '100%' }}
                              onChange={(value) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "W5_time_t", value?.format('HH:mm'), 'time')
                              }}
                            />
                          </Space>
                        }
                      </div>
                    )
                  }} />
                <Table.Column dataIndex="" />
                <Table.Column width={70}
                  title={
                    <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        disabled={this.checkDisabledBtnAdd('time')}
                        onClick={() => this.handleAddRowTable('time')}
                        type="primary" icon={<PlusOutlined />}>
                      </Button>
                    </div>
                  }
                  render={(text, record, index) => {
                    return <div style={{ textAlign: "center" }}>
                      <Button size='small'
                        hidden={this.state.indexTable2 !== this.findIndexByID(this.state.dataSource2, record.id) || this.checkAddItem('time')
                          || !(this.state.dataSource2[this.state.indexTable2] && this.state.dataSource2[this.state.indexTable2].W5_time_f && this.state.dataSource2[this.state.indexTable2].W5_time_t)}
                        onClick={() => { this.createAndUpdateTimeSetting(this.findIndexByID(this.state.dataSource2, record.id)) }}
                        style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                        icon={<SaveOutlined />} >
                      </Button>
                      <Button size='small' style={{ border: 'none' }}
                        onClick={() => {
                          this.checkIdTemp(record.id) ? this.handleDeleteRowTable('time') : this.deleteTimeSetting(record.id)
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
            <hr />
            <div style={{ marginTop: 15, textAlign: "right" }}>
              <Button type="primary"
                disabled={
                  this.state.checkRadio === 0 ? this.checkDisabledBtnAdd('category') :
                    this.state.checkRadio === 1 ? this.checkDisabledBtnAdd('facilities') : this.checkDisabledBtnAdd('time')
                }
                onClick={() => {
                  this.resultData()

                }}>閉じる
              </Button>
            </div>
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0641008_BasicConditionSet);
