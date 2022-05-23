import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Table, Button, Modal, Space, Row, Col, Input, Menu, Dropdown, message, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import PrintParamInputAction from 'redux/ResultOutput/PrintParamMaintain/PrintParamInput.action'
import WS0398001_ParamIndicationItemDisplaySub from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0398001_ParamIndicationItemDisplaySub.jsx';
import { MoreOutlined, SearchOutlined, ScissorOutlined, CopyOutlined, SnippetsOutlined, ZoomInOutlined } from '@ant-design/icons';
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import { itemF12Action } from "redux/ResultOutput/PrintParamMaintain/PrintParamMaintain.actions";
import WS0397001_ParamPromptedQuerySub from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0397001_ParamPromptedQuerySub.jsx';
import WS0855017_ScreenConfirm from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0855017_ScreenConfirm.jsx';
import WS0282001_StyleSpecificInspectInquiry from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0282001_StyleSpecificInspectInquiry.jsx';
import WS0865001_UseInspectInquiry from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0865001_UseInspectInquiry.jsx';
import WS0855023_RecurrenceNumber from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0855023_RecurrenceNumber.jsx';
import WS0855021_CharacterStringSearch from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0855021_CharacterStringSearch.jsx';
import WS2249001_CreateTestForMedicalExamInfo from 'pages/ZZ_Others/DEVTOOL0200_CreateTestForMedicalExamInfo/WS2249001_CreateTestForMedicalExamInfo.jsx';
import WS0267001_CategorySearchQuerySingle from "pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx";
import scrollIntoView from 'scroll-into-view';
import ModalDraggable from "components/Commons/ModalDraggable";

import Color from "constants/Color";
import { toHiragana } from "wanakana";
const styleFm = {
  marginBottom: '0px'
}
class WS0855009_PrintParamInput extends React.Component {
  static propTypes = {
    Li_StyleCode: PropTypes.string,
    Li_StsListFormat: PropTypes.any,
    Lo_StsChange: PropTypes.any,
    Li_RecordNum: PropTypes.number,
    Li_IndicationDivision: PropTypes.string,
    Lo_Parameters: PropTypes.string,
    Li_Code: PropTypes.number,
    Li_Row1: PropTypes.number,
    Li_Digit1: PropTypes.number,
    Li_Row2: PropTypes.number,
    Li_Digit2: PropTypes.number,
    Li_Line3: PropTypes.number,
    Li_Digit3: PropTypes.number,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '印刷ﾊﾟﾗﾒｰﾀ入力';
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
      parramIndex: {
        Li_StyleCode: "",
        Li_StsListFormat: "",
        Lo_StsChange: ""
      },
      getParramItem: {
        Li_StyleCode: "",
        Li_StsListFormat: "",
        Li_RecordNum: "",
        Li_IndicationDivision: "",
        Lo_Parameters: "",
        Li_Code: "",
        Li_Row1: "",
        Li_Digit1: "",
        Li_Row2: "",
        Li_Digit2: "",
        Li_Line3: "",
        Li_Digit3: "",
      },
      pagination: {
        defaultPageSize: 13,
        size: 'small',
        showQuickJumper: true
      },
      parramCtrN: {
        Li_StyleCode: "",
        SearchStringChildTask: "",
        W1_record_num: "",
        SearchRecordChildTask: ""
      },
      dataSourceParramItem: [],
      selectedRowKeysParramItem: [],
      rowSelectedParramItem: [],
      indexTableParramItem: 0,
      HiddenCtrN: true,
      Title: "",
      idOld: '',
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this);
    this.handleAddRowTableParramItem = this.handleAddRowTableParramItem.bind(this);
  }
  componentDidMount() {
    this.state.parramIndex.Li_StyleCode = this.props.Li_StyleCode
    this.state.parramIndex.Li_StsListFormat = this.props.Li_StsListFormat
    this.state.parramIndex.Lo_StsChange = this.props.Lo_StsChange
    this.setState({
      Title: "印刷ﾊﾟﾗﾒｰﾀ入力 [様式] " + this.props.Li_StyleCode
    })
    this.getScreenData(true)
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.state.parramIndex.Li_StyleCode = this.props.Li_StyleCode
      this.state.parramIndex.Li_StsListFormat = this.props.Li_StsListFormat
      this.state.parramIndex.Lo_StsChange = this.props.Lo_StsChange
      this.getScreenData(true);
    }
  }
  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    PrintParamInputAction.getListData(this.state.parramIndex)
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,
        })
        this.formRef.current?.setFieldsValue(this.state.dataSource = data)
        this.formRef.current?.setFieldsValue({
          W1_parameter: data.length > 0 ? data[index].W1_parameter : '',
          W1_remark: data.length > 0 ? data[index].W1_remark : ''
        })
        this.fortmatParramItem(index)
        this.getDataParramItem(true)
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  getDataParramItem(reload) {
    this.setState({ isLoadingTable: true, isLoadingTableParramItem: true })
    PrintParamInputAction.getParramItem(this.state.getParramItem)
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          rowSelectedParramItem: data.length > 0 ? [data[index]] : [],
          selectedRowKeysParramItem: data.length > 0 ? [data[index].id] : [],
          indexTableParramItem: index,
        })
        this.formRef.current?.setFieldsValue(this.state.dataSourceParramItem = data)
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false, isLoadingTableParramItem: false }))
  }

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
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
  changeRowParramItem(index) {
    let data = [...this.state.dataSourceParramItem];
    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      this.setState({
        rowSelectedParramItem: [data[0]],
        selectedRowKeysParramItem: [data[0].id],
        indexTableParramItem: 0
      });
    } else {
      this.setState({
        indexTableParramItem: index
      });
    }
  }
  checkDisabledBtnAddParramItem() {
    if (this.state.rowSelectedParramItem.length > 0) {
      if (this.checkIdTemp(this.state.rowSelectedParramItem[0].id)) {
        return true;
      } return false;
    } return false;
  }
  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkIdTemp(this.state.rowSelected[0].id)) {
        return true;
      } return false;
    } return false;
  }
  updateDatasource(table, index, field, value) {
    let data = [];
    if (table == 'ParramItem') {
      data = [...this.state.dataSourceParramItem];
      data[index][field] = value;
      this.setState({
        dataSourceParramItem: data
      });
    } else {
      data = [...this.state.dataSource];
      data[index][field] = value;
      this.setState({
        dataSource: data
      });
    }
  }
  // add new record
  async handleAddRowTable() {
    let newRow = { id: '', W1_SEQ: 0, W1_instruction_sect: "", };

    let data = [...this.state.dataSource];

    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0,
      dataSourceParramItem: [],
      rowSelectedParramItem: [],
      selectedRowKeysParramItem: [],
    });
    this.formRef.current?.setFieldsValue({
      W1_parameter: '',
      W1_remark: ''
    })

    this.forceUpdate();
  }
  // add new record
  async handleAddRowTableParramItem() {
    let newRow = { id: '' };

    let data = [...this.state.dataSourceParramItem];

    data.unshift(newRow);

    await this.setState({
      dataSourceParramItem: data,
      rowSelectedParramItem: [newRow],
      selectedRowKeysParramItem: [newRow.id],
      indexTableParramItem: 0
    });
    this.forceUpdate();
  }

  CheckUpdateRecordData(index) {
    let params = { ...this.state.dataSource[index] }
    params.Li_StyleCode = this.state.parramIndex.Li_StyleCode
    params.Li_StsListFormat = this.state.parramIndex.Li_StsListFormat
    if (params.id == "") {
      this.ChangeW1InstructionSect(index)
    } else {
      this.updateRecordData(params)
    }
  }
  updateRecordData(params) {
    PrintParamInputAction.saveData(params)
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
  updateRecordParramItem(index) {
    let params = { ...this.state.dataSourceParramItem[index] }
    const obj_request = Object.assign(params, this.state.getParramItem);
    PrintParamInputAction.saveParramItem(params)
      .then((res) => {
        message.success('更新しました!')
        this.getDataParramItem(true)
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
  handleDeleteRowTable(table) {
    if (table == 'ParramItem') {
      let data = [...this.state.dataSourceParramItem];
      data.splice(0, 1);
      this.setState({
        dataSourceParramItem: data,
        indexTableParramItem: 0,
        rowSelectedParramItem: data.length > 0 ? [data[0]] : [],
        selectedRowKeysParramItem: data.length > 0 ? [data[0].id] : []
      });
    } else {
      let data = [...this.state.dataSource];
      data.splice(0, 1);
      this.setState({
        dataSource: data,
        indexTable: 0,
        rowSelected: data.length > 0 ? [data[0]] : [],
        selectedRowKeys: data.length > 0 ? [data[0].id] : []
      });
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
                PrintParamInputAction.deleteData(params)
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
  deleteParramItem(id) {
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
                PrintParamInputAction.deleteParramItem(params)
                  .then(res => {
                    message.success('正常に削除されました!');
                    this.getDataParramItem(true)
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
  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };
  Item_F12() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component:
          <WS0061015_CheckYesNoNo
            Li_Message={'変更内容を更新しますか ?'}
            onFinishScreen={(ouput) => {
              if (ouput.Lio_StsReturn) {
                PrintParamInputAction.updatef12(this.state.parramIndex)
                  .then((res) => {
                    message.success('更新しました!')
                    this.getScreenData()
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
  fortmatParramItem(index) {
    this.state.getParramItem.Li_StyleCode = this.state.dataSource[index].W1_style_cd
    this.state.getParramItem.Li_StsListFormat = this.state.parramIndex.Li_StsListFormat
    this.state.getParramItem.Li_RecordNum = this.state.dataSource[index].W1_record_num
    this.state.getParramItem.Li_IndicationDivision = this.state.dataSource[index].W1_instruction_sect
    this.state.getParramItem.Lo_Parameters = this.state.dataSource[index].W1_parameter
    this.state.getParramItem.Li_Code = this.state.dataSource[index].W1_cd
    this.state.getParramItem.Li_Row1 = this.state.dataSource[index].W1_line_1
    this.state.getParramItem.Li_Digit1 = this.state.dataSource[index].W1_digit_1
    this.state.getParramItem.Li_Row2 = this.state.dataSource[index].W1_row_2
    this.state.getParramItem.Li_Digit2 = this.state.dataSource[index].W1_digit_2
    this.state.getParramItem.Li_Line3 = this.state.dataSource[index].W1_row_3
    this.state.getParramItem.Li_Digit3 = this.state.dataSource[index].W1_digit_3
  }
  Item_F11() {
    PrintParamInputAction.duplicationcheckf11(this.state.parramIndex)
      .then((res) => {
        Modal.warning({ content: res.data.Warning, okText: 'は　い' })
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 600,
            component: (
              <WS0855017_ScreenConfirm
                Li_StyleCode={this.state.parramIndex.Li_StyleCode}
                Li_StsListFormat={this.state.parramIndex.Li_StsListFormat}
                onFinishScreen={(output) => {
                  this.closeModal()
                }}
              />
            ),
          },
        })
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
  Item_F07() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS2249001_CreateTestForMedicalExamInfo
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  Item_F08() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 250,
        component: (
          <WS0855023_RecurrenceNumber
            Li_Style={this.props.Li_StyleCode}
            onFinishScreen={(output) => {
              this.getScreenData(true)
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  Item_F09() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0865001_UseInspectInquiry
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  Item_F10() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0282001_StyleSpecificInspectInquiry
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  CtrF() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '30%',
        component: (
          <WS0855021_CharacterStringSearch
            Li_StyleCode={this.state.parramIndex.Li_StyleCode}
            Li_RecordNumCurrent={this.state.dataSource[this.state.indexTable].W1_record_num + 1}
            Lo_RecordNumSearch={0}
            onFinishScreen={(output) => {
              this.state.parramCtrN.SearchRecordChildTask = output.Lo_RecordNumSearch
              this.state.parramCtrN.Li_StyleCode = this.state.parramIndex.Li_StyleCode
              this.state.parramCtrN.SearchStringChildTask = output.Lio_SearchString
              this.state.parramCtrN.W1_record_num = output.Lo_RecordNumSearch
              if (output.Warning) {
                Modal.warning({ content: output.Warning, okText: 'は　い' })
              }
              let data = this.state.dataSource
              let index = this.findIndexByInstructionSect(data, output.Lo_RecordNumSearch)
              this.setState({
                isLoadingTable: false,
                rowSelected: data.length > 0 ? [data[index]] : [],
                selectedRowKeys: data.length > 0 ? [data[index].id] : [],
                indexTable: index,
                HiddenCtrN: false
              })
              this.handleScroll()
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  findIndexByInstructionSect = (arrayData, recordInstructionSect) => {
    let data = arrayData.filter((item) => recordInstructionSect == item.W1_SEQ)
    this.setState({
      idOld: data.length > 0 ? data[0].id : 0
    })
    return arrayData.findIndex((item) => recordInstructionSect == item.W1_SEQ);
  };
  CtrN() {
    PrintParamInputAction.nextsearchctrln(this.state.parramCtrN)
      .then((res) => {
        this.state.parramCtrN.SearchRecordChildTask = res.data.SearchRecordChildTask
        this.state.parramCtrN.W1_record_num = res.data.SearchRecordChildTask
        let data = this.state.dataSource
        let index = this.findIndexByInstructionSect(data, res.data.SearchRecordChildTask)
        this.setState({
          isLoadingTable: false,
          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,
        })
        this.handleScroll()
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
  ChangeW1InstructionSect(index) {
    let params = { ...this.state.dataSource[index] }
    params.Li_StyleCode = this.state.parramIndex.Li_StyleCode
    params.Li_StsListFormat = this.state.parramIndex.Li_StsListFormat
    let id_change
    PrintParamInputAction.w1instructionsectchange(params)
      .then((res) => {
        this.updateRecordData(res?.data?.id)
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
  ChangeW1Cd(index) {
    let params = { ...this.state.dataSource[index] }
    params.Li_StyleCode = this.state.parramIndex.Li_StyleCode
    params.Li_StsListFormat = this.state.parramIndex.Li_StsListFormat
    PrintParamInputAction.w1cdchange(params)
      .then((res) => {
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
  ChangeW1Parameter(index) {
    let params = { ...this.state.dataSource[index] }
    params.Li_StyleCode = this.state.parramIndex.Li_StyleCode
    params.Li_StsListFormat = this.state.parramIndex.Li_StsListFormat
    PrintParamInputAction.w1parameterchange(params)
      .then((res) => {
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
  CDGZoom(index, W1_instruction_sect, W1_format_name) {
    let parrams_zoomw1cd = {
      W1_instruction_sect: W1_instruction_sect
    }
    let parrams_zoomw1cd1 = {
      Code: "",
      W1_instruction_sect: W1_instruction_sect,
      W1_format_name: W1_format_name
    }
    PrintParamInputAction.zoomw1cd(parrams_zoomw1cd)
      .then((res) => {
        if (res.data.action == "WS0267001_CategorySearchQuerySingle") {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: '80%',
              component: (
                <WS0267001_CategorySearchQuerySingle
                  onFinishScreen={(output) => {
                    parrams_zoomw1cd1.Code = output.Lio_InspectItemCode
                    PrintParamInputAction.zoomw1cd1(parrams_zoomw1cd1)
                      .then((res) => {
                        this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, index), "W1_instruction_sect", res.data.W1_instruction_sect)
                        this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, index), "W1_format_name", res.data.W1_format_name)
                        this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, index), "W1_cd", res.data.W1_cd)
                      })
                      .catch((err) => {
                        const res = err.response;
                        if (!res || !res.data || !res.data.message) {
                          message.error("エラーが発生しました");
                          return;
                        }
                        message.error(res.data.message);
                      });
                    this.closeModal()
                  }}
                />
              ),
            },
          })
        }
        if (res.data.action == "WS0271001_InspectItemSearchQuerySingle") {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: '80%',
              component: (
                <WS0271001_InspectItemSearchQuerySingle
                  onFinishScreen={(output) => {
                    parrams_zoomw1cd1.Code = output.Lio_InspectItemCode
                    PrintParamInputAction.zoomw1cd1(parrams_zoomw1cd1)
                      .then((res) => {
                        this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, index), "W1_instruction_sect", res.data.W1_instruction_sect)
                        this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, index), "W1_format_name", res.data.W1_format_name)
                        this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, index), "W1_cd", res.data.W1_cd)
                      })
                      .catch((err) => {
                        const res = err.response;
                        if (!res || !res.data || !res.data.message) {
                          message.error("エラーが発生しました");
                          return;
                        }
                        message.error(res.data.message);
                      });
                    this.closeModal()
                  }}
                />
              ),
            },
          })
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
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }
  handleScroll() {
    scrollIntoView(document.querySelector('.scroll-row'), {
      align: {
        top: 0,
        left: 0
      },
    });
  }
  render() {
    return (
      <div className="print-param-input p-td">
        <Card title={this.state.Title}>
          <Space>
            <Button onClick={() => { this.Item_F07() }}>テスト作成 </Button>
            <Button onClick={() => { this.Item_F08() }}>再発番</Button>
            <Button onClick={() => { this.Item_F09() }}>検査照会</Button>
            <Button onClick={() => { this.Item_F10() }}>結果照会</Button>
            <Button onClick={() => { this.Item_F11() }}>重複確認</Button>
            <Button onClick={() => { this.Item_F12() }} >更新</Button>
            <Button onClick={() => { this.CtrF() }} disabled={this.state.rowSelected.length == 0 ? true : false} >Ctr + F</Button>
            <Button onClick={() => { this.CtrN() }} hidden={this.state.HiddenCtrN} >Ctr + N</Button>
          </Space>
          <hr style={{ margin: '15px 0' }} />
          <Form
            ref={this.formRef}
            onFinish={this.getScreenData}
          >
            <Row style={{ marginBottom: '1em' }}>
              <Col span={16}>
                <Table
                  size='small'
                  rowClassName={(record, index) => (record.id === this.state.idOld ? 'scroll-row' : '')}
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={this.state.pagination}
                  bordered={true}
                  scroll={{ x: 500, y: 400 }}
                  rowKey={(record) => record.id}
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
                      this.formRef.current?.setFieldsValue({
                        W1_parameter: record.W1_parameter,
                        W1_remark: record.W1_remark
                      })
                      this.changeRow(index)
                      this.fortmatParramItem(index)
                      this.getDataParramItem(true)
                    },
                  }}
                >
                  <Table.Column title="No" width={80}
                    render={(value, record, index) => {
                      return (
                        <InputNumber value={record.W1_SEQ} style={{ color: Color(record.Expression_26)?.Foreground }}
                          onChange={(e) => {
                            this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_SEQ", e === 0 ? null : e)
                          }}
                        />
                      )
                    }} />
                  <Table.Column title="指示" width={100}
                    render={(value, record, index) => {
                      return (
                        <Input.Search value={record.W1_instruction_sect} maxLength={3} style={{ color: Color(record.Expression_26)?.Foreground }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS0397001_ParamPromptedQuerySub
                                    Li_Format={this.state.parramIndex.Li_StsListFormat ? 'B' : 'A'}
                                    Lo_IndicationDivision={record.W1_instruction_sect ?? ""}
                                    onFinishScreen={(output) => {
                                      this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_instruction_sect", output.Lo_IndicationDivision)
                                      this.closeModal()
                                      // this.ChangeW1InstructionSect(this.findIndexByID(this.state.dataSource, record.id))
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_instruction_sect", e.target.value)
                          }}
                        // onBlur={(e) => {
                        //   this.ChangeW1InstructionSect(this.findIndexByID(this.state.dataSource, record.id))
                        // }}
                        />
                      )
                    }} />
                  <Table.Column title="ｺｰﾄﾞ" width={90}
                    render={(value, record, index) => {
                      return (
                        <div >
                          <div hidden={!record.Expression_25} disabled={!record.Expression_14} style={{ color: Color(record.Expression_26)?.Foreground }} >
                            <Input disabled={!record.Expression_14} maxLength={8} value={record.W1_cd != 0 ? record.W1_cd : ''} style={{ textAlign: 'right' }}
                              onDoubleClick={() => {
                                this.CDGZoom(record.id, record.W1_instruction_sect, record.W1_format_name)
                              }}
                              onChange={(e) => {
                                this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_cd", e.target.value)
                              }}
                              onBlur={(e) => {
                                this.ChangeW1Cd(this.findIndexByID(this.state.dataSource, record.id))
                              }}
                            />
                          </div>
                        </div>
                      )
                    }} />
                  <Table.Column title="名　　称" width={120}
                    render={(value, record, index) => {
                      return (
                        <div>
                          <div >
                            <Input value={record.W1_format_name} style={{ color: Color(record.Expression_26)?.Foreground, width: 300 }}
                              onChange={(e) => {
                                this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_format_name", e.target.value)
                              }}
                            />
                          </div>
                        </div>
                      )
                    }} />
                  <Table.Column title="今　回"
                    render={(value, record, index) => {
                      return (
                        <Row>
                          <Col span={12}>
                            <div hidden={!record.Expression_25 && record.id != ""}>
                              <Input value={record.W1_line_1 ? record.W1_line_1 : ''} maxLength={6} style={{ color: Color(record.Expression_26)?.Foreground }}
                                onChange={(e) => {
                                  this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_line_1", e.target.value)
                                }}
                              />
                            </div>
                          </Col>
                          <Col span={12}>
                            <div hidden={!record.Expression_25 && record.id != ""}>
                              <InputNumber value={record.W1_digit_1 ? record.W1_digit_1 : ''} maxLength={3} style={{ color: Color(record.Expression_26)?.Foreground }}
                                onChange={(e) => {
                                  this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_digit_1", e === 0 ? null : e)
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                      )
                    }} />
                  <Table.Column title="前　回"
                    render={(value, record, index) => {
                      return (
                        <Row>
                          <Col span={12}>
                            <div hidden={!record.Expression_25 && record.id != ""}>
                              <Input value={record.W1_row_2 ? record.W1_row_2 : ''} maxLength={6} style={{ color: Color(record.Expression_26)?.Foreground }}
                                onChange={(e) => {
                                  this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_row_2", e.target.value)
                                }}
                              />
                            </div>
                          </Col>
                          <Col span={12}>
                            <div hidden={!record.Expression_25 && record.id != ""}>
                              <InputNumber value={record.W1_digit_2 ? record.W1_digit_2 : ''} maxLength={3} style={{ color: Color(record.Expression_26)?.Foreground }}
                                onChange={(e) => {
                                  this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_digit_2", e === 0 ? null : e)
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                      )
                    }} />
                  <Table.Column title="前々回"
                    render={(value, record, index) => {
                      return (
                        <Row>
                          <Col span={12}>
                            <div hidden={!record.Expression_25 && record.id != ""}>
                              <Input value={record.W1_row_3 ? record.W1_row_3 : ''} maxLength={6} style={{ color: Color(record.Expression_26)?.Foreground }}
                                onChange={(e) => {
                                  this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_row_3", e.target.value)
                                }}
                              />
                            </div>
                          </Col>
                          <Col span={12}>
                            <div hidden={!record.Expression_25 && record.id != ""}>
                              <InputNumber value={record.W1_digit_3 ? record.W1_digit_3 : ''} maxLength={3} style={{ color: Color(record.Expression_26)?.Foreground }}
                                onChange={(e) => {
                                  this.updateDatasource('dataSource', this.findIndexByID(this.state.dataSource, record.id), "W1_digit_3", e === 0 ? null : e)
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                      )
                    }} />
                  <Table.Column width={70} fixed='right'
                    title={
                      <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          disabled={this.checkDisabledBtnAdd() || this.checkDisabledBtnAddParramItem()}
                          onClick={this.handleAddRowTable}
                          type="primary" icon={<PlusOutlined />}>
                        </Button>
                      </div>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkDisabledBtnAddParramItem()}
                          onClick={() => { this.CheckUpdateRecordData(this.findIndexByID(this.state.dataSource, record.id)) }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkDisabledBtnAddParramItem()}
                          size='small' style={{ border: 'none' }}
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
              </Col>
              <Col span={8}>
                <Table
                  size='small'
                  dataSource={this.state.dataSourceParramItem}
                  loading={this.state.isLoadingTableParramItem}
                  pagination={this.state.pagination}
                  bordered={true}
                  scroll={{ x: 500, y: 400 }}
                  rowKey={(record) => record.id}
                  rowSelection={{
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKeysParramItem,
                    onSelect: (record, selected, selectedRows) => {
                      let index = this.state.dataSourceParramItem.findIndex(x => x.id === record.id)
                      this.setState({
                        rowSelectedParramItem: selectedRows,
                        selectedRowKeysParramItem: selectedRows.map(x => x.id),
                        indexTableParramItem: index
                      });
                      this.changeRowParramItem(index)
                    },
                  }}
                >
                  <Table.Column title="項　目"
                    render={(value, record, index) => {
                      return (
                        <div>
                          <div >
                            <Input.Search value={record.W2_item} maxLength={3}
                              onSearch={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: '40%',
                                    component: (
                                      <WS0398001_ParamIndicationItemDisplaySub
                                        Li_Format={this.props.Li_StsListFormat ? "B" : "A"}
                                        Li_IndicationDivision={this.props.Li_IndicationDivision}
                                        Li_StsSelectable={true}
                                        onFinishScreen={(output) => {
                                          this.updateDatasource('ParramItem', this.findIndexByID(this.state.dataSourceParramItem, record.id), "W2_item", output.Lo_Item)
                                          this.closeModal()
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                              onChange={(e) => {
                                this.updateDatasource('ParramItem', this.findIndexByID(this.state.dataSourceParramItem, record.id), "W2_item", e.target.value)
                              }}
                            />
                          </div>

                        </div>
                      )
                    }} />

                  <Table.Column title="内　容"
                    render={(value, record, index) => {
                      return (
                        <Input value={record.W2_content}
                          onChange={(e) => {
                            this.updateDatasource('ParramItem', this.findIndexByID(this.state.dataSourceParramItem, record.id), "W2_content", e.target.value)
                          }}
                        />
                      )
                    }} />
                  <Table.Column width={70}
                    title={
                      <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          disabled={this.checkDisabledBtnAddParramItem() || this.checkDisabledBtnAdd()}
                          onClick={this.handleAddRowTableParramItem}
                          type="primary" icon={<PlusOutlined />}>
                        </Button>
                      </div>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          hidden={this.state.indexTableParramItem !== this.findIndexByID(this.state.dataSourceParramItem, record.id) || this.checkDisabledBtnAdd()}
                          onClick={() => { this.updateRecordParramItem(this.findIndexByID(this.state.dataSourceParramItem, record.id)) }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small' style={{ border: 'none' }}
                          onClick={() => {
                            this.checkIdTemp(record.id) ? this.handleDeleteRowTable('ParramItem') : this.deleteParramItem(record.id)
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
            <Form.Item name="W1_parameter" label="ﾊﾟﾗﾒｰﾀ">
              <Input onChange={(event) => {
                this.updateDatasource('dataSource', this.state.indexTable, "W1_parameter", event.target.value)
              }}
                onBlur={(e) => {
                  this.ChangeW1Parameter(this.state.indexTable)
                }}
              />
            </Form.Item>
            <Form.Item name="W1_remark" label="備　考">
              <Input onChange={(event) => {
                this.updateDatasource('dataSource', this.state.indexTable, "W1_remark", event.target.value)
              }} />
            </Form.Item>
          </Form>
        </Card >
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0855009_PrintParamInput);
