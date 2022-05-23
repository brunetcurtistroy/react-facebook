import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Form, Input, Select, Row, Col, Tree, DatePicker, Space, Modal, Spin, InputNumber, Button, message } from "antd";

import { CarryOutOutlined, SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import defaultImg from 'assets/img/userlogo.bmp';
import 'pages/TM_SpecificInsureMaintenance/V4TH0000500_InspectItemMaster/WS1400001_InspectItemMaster.scss';

import WS1536012_ImageSetting from "./WS1536012_ImageSetting";
import WS0084001_PostCodeSearchEngine from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0084001_PostCodeSearchEngine.jsx';
import WS1512001_OptionalInfoMaintain from "../V4SM0031000_OptionalInfoMaintain/WS1512001_OptionalInfoMaintain";
import WS1537001_MedicalInstitutionNumberUpdateSub from 'pages/SM_SystemMaintenance/V4SM0000100_FacilityConsumptionTaxSetting/WS1537001_MedicalInstitutionNumberUpdateSub.jsx';

import FacilityConsumptionTaxSettingAction from "redux/SystemMaintenance/FacilityConsumptionTaxSetting/FacilityConsumptionTaxSetting.action";
import moment from "moment";

const grid = {
  grid24: {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  },

  grid12: {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
  },

  grid18: {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  }
};

const styleCustom = {
  styleImg: {
    marginBottom: '0.5em',
    width: '120px',
    cursor: 'pointer'
  },

  btmForm: {
    marginBottom: '5px'
  }
}
class WS1536001_FacilityConsumptionTaxSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '施設・消費税設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      treeData: [],

      selectedFacilityInfoRows: [],
      defaultSelectedFacilityInfoKeys: {},
      dataSourceFacilityInfo: [],
      selectedRowFacilityInfoKey: [],
      rowSelectFacilityInfo: [],
      indexTableFacilityInfo: null,
      isLoadingTableFacilityInfo: false,
      oldDateFacility: '',

      selectedConsumptionTaxRows: [],
      defaultSelectedConsumptionTaxKeys: {},
      dataSourceConsumptionTax: [],
      selectedRowConsumptionTaxKey: [],
      rowSelectConsumptionTax: [],
      indexTableConsumptionTax: null,
      isLoadingTableConsumptionTax: false,
      oldDateConsumptionTax: '',

      isLoadTree: false,

      isLoadingFormData: false,

      isLoadingNode: true, // reload node after update
      selectedNodes: [],
      nodeId: '',
      parentNodeId: '',

      lstPrefectureName: [],
      facilitiesLogoFile: ''
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
    this.handleDeleteRowTable = this.handleDeleteRowTable.bind(this);
  }

  componentDidMount() {
    this.getTreeData();
    this.getScreenDataFacility();
  }

  getTreeData() {
    FacilityConsumptionTaxSettingAction.GetTreeData()
      .then(async res => {
        await this.handleTree(res);
      })
  }

  // check type id node
  checkId(type, id) {
    if (id?.toString().includes(type)) {
      return true
    }
    return false;
  }

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkDisabledBtnAdd(dataSource, rowSelected, oldDate) {
    if (rowSelected.length > 0) {
      let newDate = moment(rowSelected[0].DateChar)?.format('YYYY/MM/DD');
      if (this.checkAddItem() || this.checkIdTemp(rowSelected[0].id) || this.checkDuplicateDate(dataSource) || (!this.checkIdTemp(rowSelected[0].id) && oldDate !== newDate)) {
        return true;
      } return false;
    } return false;
  }

  checkDuplicateDate(data) {
    const uniqueValues = new Set(data.map(v => moment(v.DateChar)?.format("YYYY/MM/DD")));
    if (uniqueValues.size < data.length) {
      return true;
    } return false;
  }

  // hande tree node
  convertNode(data) {
    const key = data.id;
    const node = {
      title: data.W1_name,
      key,
      node_id: data.id,
      node_id_data: data.W1_child_node,
      parent_node_id: data.W1_parent_node,
      W1_date: data.W1_date ? data.W1_date : '',
      children: []
    }
    return node
  }

  handleNode(data, lstData) {
    let node = this.convertNode(data);
    let lstChild = lstData.filter(item => item.W1_parent_node?.toString() === data.W1_child_node?.toString());
    lstChild.forEach(child => {
      node.children.push(this.handleNode(child, lstData));
    });
    return node;
  }

  async handleTree(lstData) {
    if (lstData && lstData.length > 0) {
      let lstRoot = lstData.filter(item => item.W1_parent_node === "Root");
      let result = [];
      lstRoot.forEach(root => {
        result.push(this.handleNode(root, lstData));
      });

      await this.setState({
        treeData: result,
        isLoadTree: true,
        selectedNodes: result.length > 0 ? [result[0]] : [],
      });
      if (this.state.isLoadingNode) {
        await this.setState({
          nodeId: result.length > 0 ? result[0].node_id_data : '',
          parentNodeId: result.length > 0 ? result[0].parent_node_id : ''
        });
      }

      this.getFormData();
    }
  }

  onSelectNode = async (selectedKeys, info) => {
    await this.setState({
      selectedNodes: info.selectedNodes,
      nodeId: info.selectedNodes[0] ? info.selectedNodes[0].node_id_data : '',
      parentNodeId: info.selectedNodes[0] ? info.selectedNodes[0].parent_node_id : ''
    });

    this.getFormData();
  };

  renderTreetable() {
    return (
      <Tree
        showIcon
        icon={<CarryOutOutlined />}
        defaultExpandAll
        treeData={this.state.treeData}
        defaultSelectedKeys={this.state.selectedNodes.length > 0 ? [this.state.selectedNodes[0].key] : ''}
        onSelect={this.onSelectNode}
      />
    )
  }
  ///////////////

  getFormData() {
    if (this.state.selectedNodes.length > 0) {
      if (this.checkId('A', this.state.selectedNodes[0].node_id_data) || this.checkId('B', this.state.selectedNodes[0].node_id_data)) {
        this.getDateTable();
      }

      if (this.checkId('A', this.state.selectedNodes[0].parent_node_id)) {
        this.getFacilityInfo();
      }
      if (this.checkId('B', this.state.selectedNodes[0].parent_node_id)) {
        this.getConsumptionTax();
      }
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }

  // table datelist
  async handleAddRowTable() {
    let newRow = {
      id: '',
      isSave: false
    };

    let data = [];
    if (this.checkId('A', this.state.nodeId)) {
      data = [...this.state.dataSourceFacilityInfo];
      data.push(newRow);
    } else {
      data = [...this.state.dataSourceConsumptionTax];
      data.push(newRow);
    }

    if (data.length > 0) {
      for (let i = 0; i < data.length - 1; i++) {
        data[i].isSave = true;
      }
    }

    if (this.checkId('A', this.state.nodeId)) {
      await this.setState({
        dataSourceFacilityInfo: data,
        rowSelectFacilityInfo: [newRow],
        selectedRowFacilityInfoKey: [newRow.id],
        indexTableFacilityInfo: data.length - 1
      });

      this.formRef.current?.setFieldsValue({
        dataTableFacility: data,
      });
    } else {
      await this.setState({
        dataSourceConsumptionTax: data,
        rowSelectConsumptionTax: [newRow],
        selectedRowConsumptionTaxKey: [newRow.id],
        indexTableConsumptionTax: data.length - 1
      });

      this.formRef.current?.setFieldsValue({
        dataTableConsumptionTax: data,
      });
    }


    this.forceUpdate();
  }

  getDateTable() {
    let params = {
      W1_child_note: this.state.nodeId
    }

    if (this.checkId('A', this.state.nodeId)) {
      this.setState({
        isLoadingTableFacilityInfo: true,
      });
    } else {
      this.setState({
        isLoadingTableConsumptionTax: true,
      });
    }

    FacilityConsumptionTaxSettingAction.GetDateList(params)
      .then(res => {
        let data = res ? res : [];
        data.map(item => (
          item.DateChar = item.DateChar === "0000/00/00" ? '0000/00/00' : moment(item.DateChar),
          item.isSave = true
        ))

        this.setState({
          selectedRowFacilityInfoKey: [],
          rowSelectFacilityInfo: [],
          indexTableFacilityInfo: null,

          selectedRowConsumptionTaxKey: [],
          rowSelectConsumptionTax: [],
          indexTableConsumptionTax: null,
        })

        if (this.checkId('A', this.state.nodeId)) {
          this.setState({
            dataSourceFacilityInfo: data,
            isLoadingTableFacilityInfo: false
          });
          this.formRef.current?.setFieldsValue({
            dataTableFacility: data
          });
        } else {
          this.setState({
            dataSourceConsumptionTax: data,
            isLoadingTableConsumptionTax: false
          });
          this.formRef.current?.setFieldsValue({
            dataTableConsumptionTax: data
          });
        }
      })
      .finally(() =>
        this.setState({
          isLoadingTableFacilityInfo: false,
          isLoadingTableConsumptionTax: false
        })
      )
  }

  loadDataByNote() {
    let oldNodeIdState = this.state.nodeId;
    this.setState({ isLoadingNode: false })
    let node = {};
    this.getTreeData();
    node = this.state.treeData.find(x => x.node_id_data === oldNodeIdState);
    this.setState({
      selectedNodes: node ? [node] : [],
      nodeId: node ? node.node_id_data : '',
      parentNodeId: node ? node.parent_node_id : '',
    });
    this.getDateTable();
  }

  callApiAddNewDateFacility() {
    let data = this.formRef.current.getFieldValue('dataTableFacility');
    let params = {
      W1_date: moment(data[data.length - 1].DateChar)?.format("YYYY/MM/DD")
    }
    FacilityConsumptionTaxSettingAction.AddNewDateFacility(params)
      .then(res => {
        this.loadDataByNote();
      })
  }

  callApiUpdateDateFacility(oldDate, newDate) {
    let params = {
      DateRecordBefore: moment(oldDate)?.format("YYYY/MM/DD"),
      W1_date: moment(newDate)?.format("YYYY/MM/DD")
    }
    FacilityConsumptionTaxSettingAction.UpdateDateFacility(params)
      .then(res => {
        this.loadDataByNote();
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

  callApiDeleteDateFacility(record) {
    let params = {
      W1_date: moment(record.DateChar)?.format("YYYY/MM/DD")
    };
    FacilityConsumptionTaxSettingAction.DeleteDateFacility(params)
      .then(res => {
        this.loadDataByNote();
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

  callApiAddNewDateConsumptionTax() {
    let data = this.formRef.current.getFieldValue('dataTableConsumptionTax');
    let params = {
      W1_date: moment(data[data.length - 1].DateChar)?.format("YYYY/MM/DD")
    }
    FacilityConsumptionTaxSettingAction.AddNewDateConsumptionTax(params)
      .then(res => {
        this.loadDataByNote();
      })
  }

  callApiUpdateDateConsumptionTax(oldDate, newDate) {
    let params = {
      DateRecordBefore: moment(oldDate)?.format("YYYY/MM/DD"),
      W1_date: moment(newDate)?.format("YYYY/MM/DD")
    }
    FacilityConsumptionTaxSettingAction.UpdateDateConsumptionTax(params)
      .then(res => {
        this.loadDataByNote();
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

  callApiDeleteDateConsumptionTax(record) {
    let params = {
      W1_date: moment(record.DateChar)?.format("YYYY/MM/DD")
    }
    FacilityConsumptionTaxSettingAction.DeleteDateConsumptionTax(params)
      .then(res => {
        this.loadDataByNote();
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

  // check required field
  checkAddItem() {
    if (this.checkId('A', this.state.nodeId)) {
      if (this.state.dataSourceFacilityInfo.length > 0) {
        let index = this.state.dataSourceFacilityInfo.findIndex(x => !x.DateChar);
        if (index === -1) {
          return false;
        }
        return true
      }
    } else {
      if (this.state.dataSourceConsumptionTax.length > 0) {
        let index = this.state.dataSourceConsumptionTax.findIndex(x => !x.DateChar);
        if (index === -1) {
          return false;
        }
        return true
      }
    }
  }

  updateDatasource(index, field, value) {
    let data = [];
    if (this.checkId('A', this.state.nodeId)) {
      data = [...this.state.dataSourceFacilityInfo];
    } else {
      data = [...this.state.dataSourceConsumptionTax];
    }

    data[index][field] = value;
    data[index]['W1_name'] = moment(value)?.format('YYYY/MM/DD');

    if (this.checkId('A', this.state.nodeId)) {
      this.setState({
        dataSourceFacilityInfo: data
      });

      this.formRef.current.setFieldsValue({
        dataTableFacility: data
      });
    } else {
      this.setState({
        dataSourceConsumptionTax: data
      });

      this.formRef.current.setFieldsValue({
        dataTableConsumptionTax: data
      });
    }
  }

  handleDeleteRowTable(index) {
    let data = [];
    if (this.checkId('A', this.state.nodeId)) {
      data = [...this.state.dataSourceFacilityInfo];
      data.splice(index, 1);
      this.formRef.current.getFieldValue("dataTableFacility").splice(index, 1);
    } else {
      data = [...this.state.dataSourceConsumptionTax];
      data.splice(index, 1);
      this.formRef.current.getFieldValue("dataTableConsumptionTax").splice(index, 1);
    }

    if (data && data.length > 0) {
      data.forEach(element => {
        element.isSave = true;
      });
    }

    if (this.checkId('A', this.state.nodeId)) {
      this.setState({
        dataSourceFacilityInfo: data,
        indexTableFacilityInfo: null,
        rowSelectFacilityInfo: [],
        selectedRowFacilityInfoKey: []
      });

      this.formRef.current?.setFieldsValue({
        dataTableFacility: data,
      });
    } else {
      this.setState({
        dataSourceConsumptionTax: data,
        indexTableConsumptionTax: null,
        rowSelectConsumptionTax: [],
        selectedRowConsumptionTaxKey: []
      });

      this.formRef.current?.setFieldsValue({
        dataTableConsumptionTax: data,
      });
    }
  }

  changeRow(index) {
    let data = [];
    if (this.checkId('A', this.state.nodeId)) {
      data = [...this.state.dataSourceFacilityInfo];
    } else {
      data = [...this.state.dataSourceConsumptionTax];
    }

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      if (this.checkId('A', this.state.nodeId)) {
        this.setState({
          dataSourceFacilityInfo: data,
          rowSelectFacilityInfo: [data[data.length - 1]],
          selectedRowFacilityInfoKey: [data[data.length - 1].id],
          indexTableFacilityInfo: data.length - 1
        });
      } else {
        this.setState({
          dataSourceConsumptionTax: data,
          rowSelectConsumptionTax: [data[data.length - 1]],
          selectedRowConsumptionTaxKey: [data[data.length - 1].id],
          indexTableConsumptionTax: data.length - 1
        });
      }
    } else {
      data.forEach(element => {
        element.isSave = true;
      });

      data[index].isSave = false;

      if (this.checkId('A', this.state.nodeId)) {
        this.setState({
          dataSourceFacilityInfo: data,
          indexTableFacilityInfo: index
        });
      } else {
        this.setState({
          dataSourceConsumptionTax: data,
          indexTableConsumptionTax: index
        });
      }
    }
  }

  // Facility Info
  getFacilityInfo() {
    let params = {
      W1_date: this.state.selectedNodes.length > 0 ? this.state.selectedNodes[0].W1_date : ''
    }
    this.setState({ isLoadingFormData: true });
    FacilityConsumptionTaxSettingAction.GetFacilityInfo(params)
      .then(res => {
        this.formRef.current?.setFieldsValue({ 'dataFacilityInfo': [res] })
        this.setState({
          facilitiesLogoFile: res ? res.facilities_logo_file : '',
          isLoadingFormData: false
        });
      })
      .finally(() => this.setState({ isLoadingFormData: false }))
  }

  getScreenDataFacility() {
    FacilityConsumptionTaxSettingAction.GetScreenDataFacilityInfo()
      .then(res => {
        this.setState({
          lstPrefectureName: res ? res.prefecture_name : []
        });
      })
  }

  callApiUpdateFacilityInfo() {
    let data = {
      ...this.formRef.current.getFieldValue('dataFacilityInfo')[0],
      W1_date: this.state.selectedNodes[0].W1_date,
      facilities_logo_file: this.state.facilitiesLogoFile
    }
    FacilityConsumptionTaxSettingAction.UpdateFacilityInfo(data)
      .then(res => {
        message.success('更新しました。');
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.setState({ isLoadingFormData: false })
      })
  }

  // Consumption Tax
  getConsumptionTax() {
    let params = {
      W1_date: this.state.selectedNodes.length > 0 ? this.state.selectedNodes[0].W1_date : ''
    }
    this.setState({ isLoadingFormData: true });
    FacilityConsumptionTaxSettingAction.GetConsumptionTax(params)
      .then(res => {
        this.formRef.current?.setFieldsValue({ 'dataConsumptionTax': [res] })
        this.setState({ isLoadingFormData: false });
      })
  }

  callApiUpdateConsumptionTax() {
    let data = {
      ...this.formRef.current.getFieldValue('dataConsumptionTax')[0],
      W1_date: this.state.selectedNodes[0].W1_date
    }
    FacilityConsumptionTaxSettingAction.UpdateConsumptionTax(data)
      .then(res => {
        message.success('更新しました。');
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.setState({ isLoadingFormData: false })
      })
  }

  render() {
    return (
      <div className="facility-consumption-tax-setting">
        <Card title="施設・消費税設定" className="mb-3 scrollbar" style={{ overflow: 'auto', minWidth: '1000px' }}>
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '80%',
                    component: (<WS1512001_OptionalInfoMaintain
                      onFinishScreen={(output) => {
                        this.closeModal()
                      }}
                    />)
                  }
                })
              }}
            >ｵﾌﾟｼｮﾝ情報</Button>
            <Button
              disabled={!this.checkId('A', this.state.parentNodeId)}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 500,
                    component: (
                      <WS1537001_MedicalInstitutionNumberUpdateSub
                        Li_AdoptionDate={this.state.selectedNodes.W1_date}
                        onFinishScreen={({ Lio_ImageFile }) => {
                          this.setState({ facilitiesLogoFile: Lio_ImageFile })
                          this.closeModal();
                        }}
                      />)
                  }
                })
              }}
            >機関更新</Button>
          </Space>
        </Card>
        <Card className="scrollbar" style={{ overflow: 'auto', minWidth: '1000px' }}>
          <Form ref={this.formRef}>
            <Row gutter={24}>
              <Col style={{ width: '200px', borderRight: '1px solid #afabab' }}>
                {this.state.isLoadTree ? this.renderTreetable() : ''}
              </Col>
              <Col style={{ width: 'calc(100% - 200px)' }}>
                <div hidden={!this.checkId('A', this.state.nodeId) && !this.checkId('B', this.state.nodeId)}>
                  <div hidden={!this.checkId('A', this.state.nodeId)}>
                    <Table
                      size='small'
                      dataSource={this.state.dataSourceFacilityInfo}
                      loading={this.state.isLoadingTableFacilityInfo}
                      pagination={this.state.dataSourceFacilityInfo?.length > 10 ? true : false}
                      rowKey={(record) => record.id}
                      rowSelection={{
                        fixed: 'left',
                        type: "radio",
                        selectedRowKeys: this.state.selectedRowFacilityInfoKey,
                        onSelect: (record, selected, selectedRows) => {
                          let index = this.state.dataSourceFacilityInfo.findIndex(x => x.id === record.id)
                          this.setState({
                            rowSelectFacilityInfo: selectedRows,
                            selectedRowFacilityInfoKey: selectedRows.map(x => x.id),
                            oldDateFacility: moment(record.DateChar)?.format('YYYY/MM/DD'),
                            indexTableFacilityInfo: index
                          });
                          this.changeRow(index)
                        },
                      }}
                    >
                      <Table.Column title="適用年月日" dataIndex="DateChar" width={150}
                        render={(text, record, index) => {
                          return (
                            <div>
                              {record.DateChar === '0000/00/00' ?
                                <Form.Item name={(["dataTableFacility", index, "DateChar"])} style={{ marginBottom: 0 }}>
                                  <Input readOnly style={{ background: 'transparent', border: 'none' }} />
                                </Form.Item> :
                                <Form.Item name={(["dataTableFacility", index, "DateChar"])} style={{ marginBottom: 0 }}>
                                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={false}
                                    style={record.isSave ? { background: 'transparent', color: '#717171', border: 'none', width: '150px' } : { width: '150px' }}
                                    disabled={record.isSave}
                                    onChange={(value) => {
                                      this.updateDatasource(index, "DateChar", value);
                                    }} />
                                </Form.Item>
                              }
                            </div>
                          )
                        }} />
                      <Table.Column title=" 名 称" dataIndex="W1_name"
                        render={(text, record, index) => {
                          return (
                            <Form.Item name={(["dataTableFacility", index, "W1_name"])} style={{ marginBottom: 0 }}>
                              <Input readOnly style={{ background: 'transparent', border: 'none' }} />
                            </Form.Item>
                          )
                        }} />
                      <Table.Column width={70} fixed={'right'}
                        title={
                          <div style={{ textAlign: "center" }}>
                            <Button size='small'
                              disabled={this.checkDisabledBtnAdd(this.state.dataSourceFacilityInfo, this.state.rowSelectFacilityInfo, this.state.oldDateFacility)}
                              onClick={this.handleAddRowTable}
                              type="primary" icon={<PlusOutlined />}>
                            </Button>
                          </div>
                        }
                        render={(text, record, index) => {
                          return <div style={{ textAlign: "center" }}>
                            <Button size='small'
                              hidden={record.isSave || this.checkAddItem() || record.DateChar === '0000/00/00' || this.checkDuplicateDate(this.state.dataSourceFacilityInfo)}
                              onClick={() => {
                                if (this.checkIdTemp(record.id)) {
                                  this.callApiAddNewDateFacility()
                                } else {
                                  this.callApiUpdateDateFacility(this.state.oldDateFacility, record.DateChar)
                                }
                              }}
                              style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                              icon={<SaveOutlined />} >
                            </Button>
                            <Button size='small' style={{ border: 'none' }}
                              hidden={record.DateChar === '0000/00/00'}
                              onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable(index) : this.callApiDeleteDateFacility(record)}
                              danger
                              icon={<DeleteOutlined />}
                            >
                            </Button>
                          </div>;
                        }}
                      />
                    </Table>
                  </div>

                  <div hidden={!this.checkId('B', this.state.nodeId)}>
                    <Table
                      size='small'
                      dataSource={this.state.dataSourceConsumptionTax}
                      loading={this.state.isLoadingTableConsumptionTax}
                      pagination={this.state.dataSourceConsumptionTax?.length > 10 ? true : false}
                      rowKey={(record) => record.id}
                      rowSelection={{
                        fixed: 'left',
                        type: "radio",
                        selectedRowKeys: this.state.selectedRowConsumptionTaxKey,
                        onSelect: (record, selected, selectedRows) => {
                          let index = this.state.dataSourceConsumptionTax.findIndex(x => x.id === record.id)
                          this.setState({
                            rowSelectConsumptionTax: selectedRows,
                            selectedRowConsumptionTaxKey: selectedRows.map(x => x.id),
                            oldDateConsumptionTax: moment(record.DateChar)?.format('YYYY/MM/DD'),
                            indexTableConsumptionTax: index
                          });
                          this.changeRow(index)
                        },
                      }}
                    >
                      <Table.Column title="適用年月日" dataIndex="DateChar" width={150}
                        render={(text, record, index) => {
                          return (
                            <div>
                              {record.DateChar === '0000/00/00' ?
                                <Form.Item name={(["dataTableConsumptionTax", index, "DateChar"])} style={{ marginBottom: 0 }}>
                                  <Input readOnly style={{ background: 'transparent', border: 'none' }} />
                                </Form.Item> :
                                <Form.Item name={(["dataTableConsumptionTax", index, "DateChar"])} style={{ marginBottom: 0 }}>
                                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={false}
                                    style={record.isSave ? { background: 'transparent', color: '#717171', border: 'none', width: '150px' } : { width: '150px' }}
                                    disabled={record.isSave}
                                    onChange={(value) => {
                                      this.updateDatasource(index, "DateChar", value);
                                    }} />
                                </Form.Item>
                              }
                            </div>
                          )
                        }} />
                      <Table.Column title=" 名 称" dataIndex="W1_name"
                        render={(text, record, index) => {
                          return (
                            <Form.Item name={(["dataTableConsumptionTax", index, "W1_name"])} style={{ marginBottom: 0 }}>
                              <Input readOnly style={{ background: 'transparent', border: 'none' }} />
                            </Form.Item>
                          )
                        }} />
                      <Table.Column width={70} fixed={'right'}
                        title={
                          <div style={{ textAlign: "center" }}>
                            <Button size='small'
                              disabled={this.checkDisabledBtnAdd(this.state.dataSourceConsumptionTax, this.state.rowSelectConsumptionTax, this.state.oldDateConsumptionTax)}
                              onClick={this.handleAddRowTable}
                              type="primary" icon={<PlusOutlined />}>
                            </Button>
                          </div>
                        }
                        render={(text, record, index) => {
                          return <div style={{ textAlign: "center" }}>
                            <Button size='small'
                              hidden={record.isSave || this.checkAddItem() || record.DateChar === '0000/00/00' || this.checkDuplicateDate(this.state.dataSourceConsumptionTax)}
                              onClick={() => {
                                if (this.checkIdTemp(record.id)) {
                                  this.callApiAddNewDateConsumptionTax()
                                } else {
                                  this.callApiUpdateDateConsumptionTax(this.state.oldDateConsumptionTax, record.DateChar)
                                }
                              }}
                              style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                              icon={<SaveOutlined />} >
                            </Button>
                            <Button size='small' style={{ border: 'none' }}
                              hidden={record.DateChar === '0000/00/00'}
                              onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable(index) : this.callApiDeleteDateConsumptionTax(record)}
                              danger
                              icon={<DeleteOutlined />}
                            >
                            </Button>
                          </div>;
                        }}
                      />
                    </Table>
                  </div>
                </div>

                {/* //////////////// */}
                <Spin spinning={this.state.isLoadingFormData}>
                  <div hidden={!this.checkId('B', this.state.parentNodeId)} style={{ width: '220px' }}>
                    <Form.Item name={['dataConsumptionTax', 0, "consumption_tax_1"]} label="消費税１" style={styleCustom.btmForm}>
                      <InputNumber style={{ width: '150px' }} step="0.01" max={9.99} maxLength={4} />
                    </Form.Item>
                    <Form.Item name={['dataConsumptionTax', 0, "consumption_tax_2"]} label="消費税２" style={styleCustom.btmForm}>
                      <InputNumber style={{ width: '150px' }} step="0.01" max={9.99} maxLength={4} />
                    </Form.Item>
                    <Form.Item name={['dataConsumptionTax', 0, "consumption_tax_3"]} label="消費税３" style={styleCustom.btmForm}>
                      <InputNumber style={{ width: '150px' }} step="0.01" max={9.99} maxLength={4} />
                    </Form.Item>

                    <div style={{ margin: '20px 0', textAlign: "right" }}>
                      <Button type="primary"
                        onClick={() => { this.callApiUpdateConsumptionTax() }}
                        icon={<SaveOutlined />} >更新
                      </Button>
                    </div>
                  </div>

                  {/* ///////////////// */}
                  <div hidden={!this.checkId('A', this.state.parentNodeId)}>
                    <Row gutter={24}>
                      <Col span={18} style={{ paddingLeft: '20px' }}>
                        <div style={{ fontWeight: 'bold', margin: '25px 0 10px 15px', color: '#0d65c3' }}>概要</div>
                        <Form.Item name="version" label="医療機関" {...grid.grid18} style={styleCustom.btmForm}>
                          <Input type="text" style={{ width: '150px' }} />
                        </Form.Item>
                        <Form.Item name={['dataFacilityInfo', 0, "corporate_name"]} label="法人名称" {...grid.grid18} style={styleCustom.btmForm}>
                          <Input type="text" />
                        </Form.Item>
                        <Form.Item name={['dataFacilityInfo', 0, "facility_name"]} label="施設名称" {...grid.grid18} style={styleCustom.btmForm}>
                          <Input type="text" />
                        </Form.Item>
                        <Form.Item name={['dataFacilityInfo', 0, "representative_name"]} label="代表者名" {...grid.grid18} style={styleCustom.btmForm}>
                          <Input type="text" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <div style={{ fontWeight: 'bold', margin: '25px 0 10px 15px' }}> ﾀｲﾄﾙﾛｺﾞ</div>
                        <div style={{ margin: '20px' }}>
                          <img src={defaultImg} style={styleCustom.styleImg}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 600,
                                  component: (
                                    <WS1536012_ImageSetting
                                      Lio_ImageFile={this.state.facilitiesLogoFile}
                                      onFinishScreen={({ Lio_ImageFile }) => {
                                        this.setState({ facilitiesLogoFile: Lio_ImageFile })
                                        this.closeModal();
                                      }}
                                    />)
                                }
                              })
                            }} />
                        </div>
                      </Col>
                    </Row>

                    <div style={{ fontWeight: 'bold', margin: '30px 0 10px 15px', color: '#0d65c3' }}> 所在</div>
                    <Row gutter={24}>
                      <Col span={24} style={{ paddingLeft: '20px' }}>
                        <Form.Item label="郵便番号" {...grid.grid24} style={styleCustom.btmForm}>
                          <Space>
                            <Form.Item name={['dataFacilityInfo', 0, "postal_code"]} style={{ marginBottom: 0 }}>
                              <Input.Search type="text" maxLength={8}
                                onSearch={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: '60%',
                                      component: (
                                        <WS0084001_PostCodeSearchEngine
                                          Lio_ZipCode={''}
                                          Li_CurrentPublic={this.formRef.current.getFieldValue('dataFacilityInfo')[0]['prefecture_name']}
                                          onFinishScreen={({ Lio_ZipCode, Lio_Address }) => {
                                            let data = [...this.formRef.current.getFieldValue('dataFacilityInfo')]
                                            data[0]['postal_code'] = Lio_ZipCode;
                                            data[0]['address_1'] = data[0].address_1 ? data[0].address_1 : Lio_Address;

                                            this.formRef.current?.setFieldsValue({
                                              dataFacilityInfo: data
                                            })
                                            this.closeModal();
                                          }}
                                        />)
                                    }
                                  })
                                }} />
                            </Form.Item>
                            <Form.Item name={['dataFacilityInfo', 0, "prefecture_name"]} label="都道府県" style={{ marginBottom: 0 }}>
                              <Select style={{ width: '150px' }} >
                                {this.state.lstPrefectureName?.map(value => (
                                  <Select.Option key={'prefecture_name-' + Math.random()} value={value.LinkedField}>{value.DisplayField}</Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Space>
                        </Form.Item>
                        <Form.Item name={['dataFacilityInfo', 0, "address_1"]} label="住所(１)" {...grid.grid24} style={styleCustom.btmForm}>
                          <Input type="text" />
                        </Form.Item>
                        <Form.Item name={['dataFacilityInfo', 0, "address_2"]} label="住所(２)" {...grid.grid24} style={styleCustom.btmForm}>
                          <Input type="text" />
                        </Form.Item>
                        <Form.Item label="電話番号" {...grid.grid24} style={styleCustom.btmForm}>
                          <Row gutter={24}>
                            <Col span={8}>
                              <Form.Item name={['dataFacilityInfo', 0, "phone_number"]} style={{ marginBottom: 0 }}>
                                <Input type="text" maxLength={20} style={{ minWidth: '200px' }} />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item name={['dataFacilityInfo', 0, "innerline_number"]} label="内線番号" style={{ marginBottom: 0 }}>
                                <Input type="text" maxLength={10} style={{ minWidth: '100px' }} />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item name={['dataFacilityInfo', 0, "fax"]} label="FAX 番号" style={{ marginBottom: 0 }}>
                                <Input type="text" maxLength={20} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form.Item>
                      </Col>
                    </Row>

                    <div style={{ fontWeight: 'bold', margin: '30px 0 10px 15px', color: '#0d65c3' }}> 振込先(1)</div>
                    <Row gutter={24}>
                      <Col span={24} style={{ paddingLeft: '20px' }}>
                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item name={['dataFacilityInfo', 0, "1_transfer_bank"]} label="振込銀行" {...grid.grid12} style={styleCustom.btmForm}>
                              <Input type="text" />
                            </Form.Item>
                            <Form.Item label="口座種別" {...grid.grid12} style={styleCustom.btmForm}>
                              <Row gutter={24}>
                                <Col span={8}>
                                  <Form.Item name={['dataFacilityInfo', 0, "1_account_type"]} style={{ marginBottom: 0 }}>
                                    <Input type="text" maxLength={4} style={{ width: '70px' }} />
                                  </Form.Item>
                                </Col>
                                <Col span={16}>
                                  <Form.Item name={['dataFacilityInfo', 0, "1_account_number"]} label="口座番号" style={{ marginBottom: 0 }}>
                                    <InputNumber maxLength={7} style={{ width: '100px' }} />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item name={['dataFacilityInfo', 0, "1_transfer_branch"]} label="振込支店" {...grid.grid12} style={styleCustom.btmForm}>
                              <Input type="text" />
                            </Form.Item>
                            <Form.Item name={['dataFacilityInfo', 0, "1_bankaccount_name"]} label="名 義 人"  {...grid.grid12} style={styleCustom.btmForm}>
                              <Input type="text" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <div style={{ fontWeight: 'bold', margin: '30px 0 10px 15px', color: '#0d65c3' }}> 振込先(2)</div>
                    <Row gutter={24}>
                      <Col span={24} style={{ paddingLeft: '20px' }}>
                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item name={['dataFacilityInfo', 0, "2_transfer_bank"]} label="振込銀行" {...grid.grid12} style={styleCustom.btmForm}>
                              <Input type="text" />
                            </Form.Item>
                            <Form.Item label="口座種別" {...grid.grid12} style={styleCustom.btmForm}>
                              <Row gutter={24}>
                                <Col span={8}>
                                  <Form.Item name={['dataFacilityInfo', 0, "2_account_type"]} style={{ marginBottom: 0 }}>
                                    <Input type="text" maxLength={4} style={{ width: '70px' }} />
                                  </Form.Item>
                                </Col>
                                <Col span={16}>
                                  <Form.Item name={['dataFacilityInfo', 0, "2_account_number"]} label="口座番号" style={{ marginBottom: 0 }}>
                                    <InputNumber maxLength={7} style={{ width: '100px' }} />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item name={['dataFacilityInfo', 0, "2_transfer_branch"]} label="振込支店" {...grid.grid12} style={styleCustom.btmForm} >
                              <Input type="text" />
                            </Form.Item>
                            <Form.Item name={['dataFacilityInfo', 0, "2_bankaccount_name"]} label="名 義 人"  {...grid.grid12} style={styleCustom.btmForm}>
                              <Input type="text" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <div style={{ fontWeight: 'bold', margin: '30px 0 10px 15px', color: '#0d65c3' }}> 振込先(3)</div>
                    <Row gutter={24}>
                      <Col span={24} style={{ paddingLeft: '20px' }}>
                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item name={['dataFacilityInfo', 0, "3_transfer_bank"]} label="振込銀行" {...grid.grid12} style={styleCustom.btmForm}>
                              <Input type="text" />
                            </Form.Item>
                            <Form.Item label="口座種別" {...grid.grid12} style={styleCustom.btmForm}>
                              <Row gutter={24}>
                                <Col span={8}>
                                  <Form.Item name={['dataFacilityInfo', 0, "3_account_type"]} style={{ marginBottom: 0 }}>
                                    <Input type="text" maxLength={4} style={{ width: '70px' }} />
                                  </Form.Item>
                                </Col>
                                <Col span={16}>
                                  <Form.Item name={['dataFacilityInfo', 0, "3_account_number"]} label="口座番号" style={{ marginBottom: 0 }}>
                                    <InputNumber maxLength={7} style={{ width: '100px' }} />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item name={['dataFacilityInfo', 0, "3_transfer_branch"]} label="振込支店" {...grid.grid12} style={styleCustom.btmForm} >
                              <Input type="text" />
                            </Form.Item>
                            <Form.Item name={['dataFacilityInfo', 0, "3_bankaccount_name"]} label="名 義 人"  {...grid.grid12} style={styleCustom.btmForm}>
                              <Input type="text" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <div style={{ margin: '20px 0' }}>
                      <Button style={{ float: 'right' }} type="primary"
                        onClick={() => { this.callApiUpdateFacilityInfo() }}
                        icon={<SaveOutlined />} >更新
                      </Button>
                    </div>
                  </div>
                </Spin>
              </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1536001_FacilityConsumptionTaxSetting);
