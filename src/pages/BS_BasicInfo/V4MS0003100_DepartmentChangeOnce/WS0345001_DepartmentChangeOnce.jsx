import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Form, Input, Checkbox, Button, Table, Select, Row, Col, Modal, Space, message, Spin, DatePicker } from "antd";
import { ArrowDownOutlined, SearchOutlined } from "@ant-design/icons";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery.jsx";
import DepartmentChangeOnceAction from "redux/basicInfo/DepartmentChangeOnce/DepartmentChangeOnce.actions";
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
import moment from 'moment';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import './WS0345001_DepartmentChangeOnce.scss'

const color = {
  colorUncheck: {
    color: '#E8E8E8',
  },
  colorCheck: {
    color: 'black',
  },
  marginBt: {
    marginBottom: "10px"
  }
}

const style = {
  label: {
    width: 80,
    paddingRight: 10,
    textAlign: 'right',
    paddingBottom: 5,
    alignSelf: 'center'
  },
}

class WS0345001_DepartmentChangeOnce extends React.Component {
  static propTypes = {
    Li_Option: PropTypes.any,
    Li_AdministratorPrivileges: PropTypes.number,
    Li_UseRights: PropTypes.number,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.office = React.createRef();
    this.branchCode = React.createRef();
    // document.title = "部署変更一括";
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRowKeys: [],
      checkCondition: true,
      Lio_EmploymentT: [],
      Lio_JobT: [],
      Lio_RelationshipT: [],
      isLoading: false,
      dataRowClick: {},
      objNull: {
        "InsuranceEndDateChar": "",
        "InsuranceStartDateChar": "",
        "Lio_BeneficiariesNumT": "",
        "Lio_EmploymentT": "",
        "Lio_InsuranceCardNumT": "",
        "Lio_InsuranceCardSymbolT": "",
        "Lio_InsuranceNumT": "",
        "Lio_JobT": "",
        "Lio_RelationshipT": "",
        "insurer_card_number": "",
        "insurer_card_symbol": "",
        "insurer_end_date_on": "",
        "insurer_kanji_name_IV": "",
        "insurer_kanji_name_IY": "",
        "insurer_number": "",
        "insurer_start_date_on": "",
        "recipient_number": ""
      },
      checkDateStart: false,
      checkDateEnd: false,
      initialValues: {
        office_kana_name: '',
        phone_number: '',
        insurer_card_symbol: '',
        methods_op: true
      },
      loadFrm: false,
      timeOutId: null,
      checkOfficeCodeF: true,
      checkOfficeCodeT: true,
    };
  }

  componentDidMount() {
    this.office?.current?.focus();
    if (!sessionStorage.getItem("DataOfficeInfo")) {
      this.setState({
        loadFrm: true
      })
      DepartmentChangeOnceAction.GetDataOfficeInfo(this.state.initialValues)
        .then(res => {
          sessionStorage.setItem("DataOfficeInfo", JSON.stringify(res))
        }).catch(error => {
          const res = error.response;
          if (!res || res.data || res.data.message) {
            message.error('エラーが発生しました');
            return
          }
        }).finally(() => this.setState({ loadFrm: false }))
    }
  }

  getScreenData() {
    DepartmentChangeOnceAction.getScreenData().then((res) => {
      this.setState({
        Lio_EmploymentT: res ? res.Lio_EmploymentT : [],
        Lio_JobT: res ? res.Lio_JobT : [],
        Lio_RelationshipT: res ? res.Lio_RelationshipT : [],
      });
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    })
  }

  displayButton() {
    this.setState({ isLoading: true })
    let data = {
      OfficeCodeF: this.getFormFieldValue("OfficeCodeF"),
      BranchStoreCodeF: this.getFormFieldValue("BranchStoreCodeF"),
      OfficeCodeT: this.getFormFieldValue("OfficeCodeT"),
      BranchStoreCodeT: this.getFormFieldValue("BranchStoreCodeT"),
      StsBelongsTakeover: this.formRef.current?.getFieldValue('StsBelongsTakeover')
    }
    DepartmentChangeOnceAction.displayButton(data)
      .then((res) => {
        this.getDataTableSelect()
      })
      .catch((err) => {
        this.setState({ isLoading: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
  }

  getDataTableSelect() {
    DepartmentChangeOnceAction.getDataTableSelect()
      .then((res) => {
        console.log(res)
        if (res?.data && res?.data.length > 0) {
          this.formRef.current?.setFieldsValue({
            tableData: res.data
          })
          this.getScreenData()
          this.getInsuranceInfoSet(res.data[0])
          let arrRowSelect = res.data.filter(x => x.W2_enabled_disabled)
          this.setState({
            selectedRowKeys: arrRowSelect.map(x => x.id)
          })
        } else {
          this.office?.current?.focus();
          this.formRef.current?.setFieldsValue({
            tableData: []
          })
          this.setState({ selectedRowKeys: [] });
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  getInsuranceInfoSet(selectData) {
    this.formRef.current?.setFieldsValue({ selectedRow: selectData })
    let data = {
      Li_PersonalNum: selectData.W2_person_num_id,
      OfficeCodeF: this.formRef.current?.getFieldValue("OfficeCodeF"),
      BranchStoreCodeF: this.formRef.current?.getFieldValue("BranchStoreCodeF") || 0,
      Lio_InsuranceNumT: selectData.W2_insurer_num,
      W2_insurer_num: selectData.W2_insurer_num,
      W2_insurer_card_symbol: selectData.W2_insurer_card_symbol,
      W2_insurer_card_num: selectData.W2_insurer_card_num,
      W2_recipient_num: selectData.W2_recipient_num,
      W2_insurer_start_date: selectData.W2_insurer_start_date,
      W2_insurer_end_date: selectData.W2_insurer_end_date,
      W2_relation: selectData.W2_relation,
      W2_employment_status: selectData.W2_employment_status,
      W2_occupations: selectData.W2_occupations
    }
    DepartmentChangeOnceAction.getInsuranceInfoSet(data).then((res) => {
      if (res) {
        if (res.length == 0) {
          this.formRef.current.setFieldsValue(this.state.objNull)
        } else {
          let obj = res[0]
          obj.InsuranceEndDateChar = (obj.InsuranceEndDateChar === "0000-00-00" || !obj.InsuranceEndDateChar) ? null : moment(obj.InsuranceEndDateChar)
          obj.InsuranceStartDateChar = (obj.InsuranceStartDateChar === "0000-00-00" || !obj.InsuranceStartDateChar) ? null : moment(obj.InsuranceStartDateChar)
          this.formRef.current.setFieldsValue(obj)
        }
        this.forceUpdate()
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    });
  }

  run_F12() {
    if (!this.state.checkDateStart && !this.state.checkDateEnd) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 500,
          component: (
            <WS0061009_CheckYesNoYes
              Li_DisplayContent={"選択された所属情報を更新しますか"}
              Li_DisplayMethod={1}
              onFinishScreen={(output) => {
                if (output.Lio_StsReturn) {
                  let arrSelect = this.state.selectedRowKeys
                  let data = [];
                  let arrSave = { "OfficeCodeF": this.getFormFieldValue("OfficeCodeF"), "BranchStoreCodeF": this.getFormFieldValue("BranchStoreCodeF") }
                  this.formRef.current?.getFieldValue("tableData")?.map(value => {
                    if (arrSelect.indexOf(value.id) > -1) {
                      data.push(value)
                      if (data.length === arrSelect.length) {
                        this.setState({ isLoading: true })
                        arrSave["data"] = data
                        DepartmentChangeOnceAction.run_F12(arrSave)
                          .then((res) => {
                            // message.success(res.Message)
                          }).catch(error => {
                            const res = error.response;
                            if (!res || res.data || res.data.message) {
                              message.error('エラーが発生しました');
                            }
                          }).finally(() => this.setState({ isLoading: false }))
                      }
                    }
                  })
                }
                this.closeModal()
              }}
            />
          ),
        },
      })
    } else {
      message.error("不正な日付です");
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }

  getFormFieldValue(namePath) {

    return this.formRef.current?.getFieldValue(namePath) || this.formRef.current?.getFieldValue(namePath) === 0 ? this.formRef.current?.getFieldValue(namePath) : null;
  }

  setDataTableName(field, id) {
    let dataTable = this.getFormFieldValue("tableData");
    let rowClick = this.getFormFieldValue("selectedRow") ? this.getFormFieldValue("selectedRow") : {};
    if (field == "name") {
      rowClick["W2_relation"] = id
      this.state.Lio_RelationshipT?.map(value => {
        if (value.key === id) {
          rowClick["name"] = value.value

        }
        return
      })
    } else if (field == "Lio_EmploymentT") {
      rowClick["W2_employment_status"] = id
    } else if (field == "Lio_JobT") {
      rowClick["W2_occupations"] = id
    } else if (field === "Expression_13") {
      rowClick["Expression_13"] = this.getFormFieldValue("Lio_InsuranceCardSymbolT") + " / " + this.getFormFieldValue("Lio_InsuranceCardNumT")
    } else if (field === "Lio_InsuranceCardNumT") {
      rowClick["W2_insurer_card_num"] = this.getFormFieldValue("Lio_InsuranceCardNumT")
    } else if (field === "Lio_InsuranceCardSymbolT") {
      rowClick["W2_insurer_card_symbol"] = this.getFormFieldValue("Lio_InsuranceCardSymbolT")
    } else if (field === "Lio_BeneficiariesNumT") {
      rowClick["W2_recipient_num"] = this.getFormFieldValue("Lio_BeneficiariesNumT")
    } else if (field === "InsuranceStartDateChar") {
      rowClick["W2_insurer_start_date"] = this.checkDataNull("InsuranceStartDateChar")
    } else if (field === "InsuranceEndDateChar") {
      rowClick["W2_insurer_end_date"] = this.checkDataNull("InsuranceEndDateChar")
    } else if (field === "Lio_InsuranceNumT") {
      rowClick["W2_insurer_num"] = this.getFormFieldValue("Lio_InsuranceNumT")
    }
    let dataChange = [];
    dataTable?.map(value => {
      if (value.id === rowClick.id) {
        dataChange.push(rowClick)
      } else {
        dataChange.push(value)
      }
      if (dataChange.length === dataTable.length) {
        this.formRef.current.setFieldsValue({
          tableData: dataChange
        })
        this.forceUpdate()
      }
    })
  }

  checkDataNull(namePath) {
    if (this.formRef.current?.getFieldValue(namePath)) {
      if (this.formRef.current?.getFieldValue(namePath) && this.formRef.current?.getFieldValue(namePath) != "0000-00-00") {
        return this.formRef.current?.getFieldValue(namePath)
      }
    }
    return null
  }

  checkDateStart() {
    let dateStart = this.formRef.current?.getFieldValue('InsuranceStartDateChar') ? this.formRef.current?.getFieldValue('InsuranceStartDateChar').format('YYYY/MM/DD') : null
    let dateEnd = this.formRef.current?.getFieldValue('InsuranceEndDateChar') ? this.formRef.current?.getFieldValue('InsuranceEndDateChar').format('YYYY/MM/DD') : null
    if ((dateEnd && (dateStart > dateEnd))) {
      this.formRef.current?.setFieldsValue({
        InsuranceStartDateChar: this.formRef.current?.getFieldValue('InsuranceEndDateChar')
      })
    }
  }

  checkDateEnd() {
    let dateStart = this.formRef.current?.getFieldValue('InsuranceStartDateChar') ? this.formRef.current?.getFieldValue('InsuranceStartDateChar').format('YYYY/MM/DD') : null
    let dateEnd = this.formRef.current?.getFieldValue('InsuranceEndDateChar') ? this.formRef.current?.getFieldValue('InsuranceEndDateChar').format('YYYY/MM/DD') : null
    if ((!dateEnd && dateStart) || (dateStart && (dateStart > dateEnd))) {
      this.formRef.current?.setFieldsValue({
        InsuranceEndDateChar: this.formRef.current?.getFieldValue('InsuranceStartDateChar')
      })
    }
  }

  checkDateFormat(value, namePath) {
    if (value && value.trim().length > 0) {
      if (moment(value).format("YYYY/MM/DD") === "Invalid date" && value.length < 8) {
        message.error("不正な日付です");
        this.setValidDate(namePath, true)
      } else {
        this.setValidDate(namePath, false)
        this.setDataTableName(namePath)
      }
    } else {
      this.setValidDate(namePath, false)
      this.setDataTableName(namePath)
    }
  }

  setValidDate(namePath, value) {
    if (namePath === "InsuranceStartDateChar") {
      this.setState({ checkDateStart: value })
    }
    if (namePath === "InsuranceEndDateChar") {
      this.setState({ checkDateEnd: value })
    }
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  showOfficeInfoRetrievalQuery(condition) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1200,
        component: (
          <WS0247001_OfficeInfoRetrievalQuery
            Lio_OfficeCode={
              condition
                ? this.formRef.current?.getFieldValue("OfficeCodeF")
                : this.formRef.current?.getFieldValue("OfficeCodeT")
            }
            Lio_BranchStoreCode={
              condition
                ? this.formRef.current?.getFieldValue("BranchStoreCodeF")
                : this.formRef.current?.getFieldValue("BranchStoreCodeT")
            }
            onFinishScreen={(output) => {
              if (output) {
                if (condition) {
                  this.setState({ checkOfficeCodeF: false })
                  this.formRef.current?.setFieldsValue({
                    OfficeCodeF: output.Lio_OfficeCode,
                    BranchStoreCodeF: output.Lio_BranchStoreCode > 0 ? output.Lio_BranchStoreCode : null,
                    office_kanji_name: output.Lo_Kanji_Name,
                  });
                  this.forceUpdate();
                  setTimeout(() => {
                    this.checkConditionCode()
                  }, 500);
                } else {
                  this.setState({ checkOfficeCodeT: false })
                  this.formRef.current?.setFieldsValue({
                    OfficeCodeT: output.Lio_OfficeCode,
                    BranchStoreCodeT: output.Lio_BranchStoreCode > 0 ? output.Lio_BranchStoreCode : null,
                    office_kanji_nameT: output.Lo_Kanji_Name,
                  });
                  this.forceUpdate();
                  setTimeout(() => {
                    this.checkConditionCode()
                  }, 500);
                }
              }
              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  handleChangeOfficeCode = (val, condition) => {
    let value = condition === "OfficeCodeF" || condition === "OfficeCodeT" ?
      val.length > 8 ? val.slice(0, 8) : val :
      val.length > 5 ? val.slice(0, 5) : val

    if (condition === "OfficeCodeF") {
      if (!val) {
        this.formRef.current?.setFieldsValue({
          office_kanji_name: ""
        })
      }
    }

    if (condition === "OfficeCodeT") {
      if (this.formRef.current?.getFieldValue("OfficeCodeF") && !this.state.checkOfficeCodeF) {
        if (!val) {
          this.formRef.current?.setFieldsValue({
            office_kanji_nameT: ""
          })
        }
      }
    }
    if (condition === "BranchStoreCodeF") {
      if (isNaN(value)) {
        this.setState({ checkOfficeCodeF: true })
        this.formRef.current?.setFieldsValue({ BranchStoreCodeF: null })
        this.forceUpdate()
        this.checkConditionCode()
        return;
      }
    } else if (condition === "BranchStoreCodeT") {
      if (isNaN(value)) {
        this.setState({ checkOfficeCodeT: true })
        this.formRef.current?.setFieldsValue({ BranchStoreCodeT: '' })
        this.forceUpdate()
        this.checkConditionCode()
        return;
      }
    }
    if (this.state.timeOutId) {
      clearTimeout(this.state.timeOutId)
    }
    this.setState({
      timeOutId: setTimeout(() => {
        if (value.length > 0) {
          let item = sessionStorage.getItem('DataOfficeInfo')
          let listData = item ? JSON.parse(item) : {}
          if (condition === "OfficeCodeF" || condition === "OfficeCodeT") {
            this.setState({ loadFrm: true })
            this.CheckOfficeCode(value, condition, listData)
          } else if (condition === "BranchStoreCodeF" || condition === "BranchStoreCodeT") {
            this.setState({ loadFrm: true })
            this.CheckOfficeCode(value, condition, listData)
          }
        }
      }, 500)
    })
  }

  CheckOfficeCode(value, condition, listData) {
    if (!Array.isArray(listData) || listData?.length === 0) {
      this.setState({ loadFrm: false })
    }
    if (condition === "OfficeCodeF") {
      this.formRef.current?.setFieldsValue({
        BranchStoreCodeF: "",
        office_kanji_name: ""
      })
    } else if (condition === "BranchStoreCodeF") {
      this.formRef.current?.setFieldsValue({
        office_kanji_name: ""
      })
    } else if (condition === "OfficeCodeT") {
      this.formRef.current?.setFieldsValue({
        BranchStoreCodeT: "",
        office_kanji_nameT: ""
      })
    } else if (condition === "BranchStoreCodeT") {
      this.formRef.current?.setFieldsValue({
        office_kanji_nameT: ""
      })
    }
    for (let indx = 0; indx < listData.length; indx++) {
      let dta = (condition === "OfficeCodeF" || condition === "OfficeCodeT") ? listData[indx].office_code : listData[indx].branch_store_code
      if (parseInt(value) === parseInt(dta)) {
        if (condition === "OfficeCodeF" || condition === "BranchStoreCodeF") {
          this.setState({ checkOfficeCodeF: false })
          this.formRef.current?.setFieldsValue({
            OfficeCodeF: listData[indx].office_code,
            BranchStoreCodeF: listData[indx].branch_store_code > 0 ? listData[indx].branch_store_code : null,
            office_kanji_name: listData[indx].office_kanji_name
          })
          this.forceUpdate()
          this.checkConditionCode()
        } else {
          this.setState({ checkOfficeCodeT: false })
          console.log(listData[indx])
          this.formRef.current?.setFieldsValue({
            OfficeCodeT: listData[indx].office_code,
            BranchStoreCodeT: listData[indx].branch_store_code > 0 ? listData[indx].branch_store_code : null,
            office_kanji_nameT: listData[indx].office_kanji_name
          })
          this.forceUpdate()
          this.checkConditionCode()
        }
        this.setState({ loadFrm: false })
        return;
      }
      if (indx === listData.length - 1) {
        this.setState({
          loadFrm: false,
          checkCondition: true,
        })
        if (condition === "OfficeCodeF" || condition === "BranchStoreCodeF") {
          this.setState({
            checkOfficeCodeF: true
          })
        } else {
          this.setState({
            checkOfficeCodeT: true
          })
        }
      }
    }
  }

  checkConditionCode() {
    console.log(this.state.checkOfficeCodeF, this.state.checkOfficeCodeT)
    if (this.state.checkOfficeCodeF || this.state.checkOfficeCodeT) {
      this.setState({ checkCondition: true })
    } else {
      this.setState({ checkCondition: false })
      if (this.formRef.current?.getFieldValue("OfficeCodeF") === this.formRef.current?.getFieldValue("OfficeCodeT")) {
        this.formRef.current?.setFieldsValue({
          StsBelongsTakeover: true
        })
      } else {
        this.formRef.current?.setFieldsValue({
          StsBelongsTakeover: false
        })
      }
    }
  }

  setFieldOfficeCodeF() {
    if (!this.state.checkOfficeCodeF) {
      this.formRef.current?.setFieldsValue({
        OfficeCodeT: this.formRef.current?.getFieldValue("OfficeCodeF"),
        BranchStoreCodeT: this.formRef.current?.getFieldValue("BranchStoreCodeF"),
        office_kanji_nameT: this.formRef.current?.getFieldValue("office_kanji_name")
      });
      this.forceUpdate()
      this.setState({ checkOfficeCodeT: false })
      setTimeout(() => {
        this.checkConditionCode()
      }, 300)
    }
  }

  CheckError() {
    if (this.isEmpty(this.formRef.current?.getFieldValue("OfficeCodeF")) || this.state.checkOfficeCodeF) {
      message.error("指定の事業所は存在しません")
      this.branchCode?.current?.focus();
      return
    }
  }

  allSelected(selected) {
    let params = {
      AllSelect: selected
    }

    DepartmentChangeOnceAction.allSelected(params)
      .then((res) => {
        this.getDataTableSelect()
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

  selectedRecord(record, selected) {
    let params = {
      id: record.id,
      W2_enabled_disabled: selected
    }

    DepartmentChangeOnceAction.selectRecord(params)
      .then((res) => {
        this.getDataTableSelect()
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

  updateInsuranceInfo() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      InsuranceStartDateChar: this.formRef.current?.getFieldValue('InsuranceStartDateChar')?.format('YYYY/MM/DD'),
      InsuranceEndDateChar: this.formRef.current?.getFieldValue('InsuranceEndDateChar')?.format('YYYY/MM/DD'),
      W2_person_num_id: this.formRef.current?.getFieldValue('selectedRow')?.W2_person_num_id,
      W2_enabled_disabled: this.formRef.current?.getFieldValue('selectedRow')?.W2_enabled_disabled,
      OfficeCodeT: this.formRef.current?.getFieldValue("OfficeCodeT"),
      BranchStoreCodeT: this.formRef.current?.getFieldValue("BranchStoreCodeT"),
      tableData: [],
      selectedRow: {}
    }
    DepartmentChangeOnceAction.updateInsuranceInfoSet(params)
      .then((res) => {
        message.success('更新しました。!')
        this.getDataTableSelect()
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
      <div className="department-change-once">
        <Spin spinning={this.state.loadFrm}>
          <Form autoComplete="off" ref={this.formRef}  >
            <Row gutter={24}>
              <Col span={7} lg={24} md={24} xl={7}>
                <Card>
                  <Form.Item label="事務所" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} style={color.marginBt} >
                    <Form.Item name="OfficeCodeF" style={{ width: "100px", display: "inline-block", }} >
                      <Input.Search ref={this.office} style={{ textAlign: 'right' }}
                        onChange={(e) => {
                          this.handleChangeOfficeCode(e.target.value, "OfficeCodeF")
                        }}
                        onSearch={() => {
                          this.showOfficeInfoRetrievalQuery(1)
                        }} />
                    </Form.Item>
                    <Form.Item style={{ margin: "0 5px", width: "80px", display: "inline-block", }} name="BranchStoreCodeF" >
                      <Input.Search ref={this.branchCode} style={{ textAlign: 'right' }}
                        onChange={(e) => {
                          this.handleChangeOfficeCode(e.target.value, "BranchStoreCodeF")
                        }}
                        onSearch={() => {
                          !this.formRef.current?.getFieldValue("OfficeCodeF")
                            ? this.CheckError()
                            : this.showOfficeInfoRetrievalQuery(1)
                        }}
                        onKeyDown={(e) => {
                          if(e.keyCode === 9){
                            !this.formRef.current?.getFieldValue("OfficeCodeF")
                              ? this.CheckError()
                              : this.showOfficeInfoRetrievalQuery(1)
                            if(!this.formRef.current?.getFieldValue("OfficeCodeF")) e.preventDefault()
                          }
                        }}
                        // readOnly={!this.formRef.current?.getFieldValue("OfficeCodeF")}
                        onClick={() => {
                          this.CheckError()
                        }}
                      />
                    </Form.Item>
                    <div style={{ paddingTop: "5px", display: "inline-block", }} >
                      {this.formRef.current?.getFieldValue("office_kanji_name")}
                    </div>
                  </Form.Item>
                  <Form.Item label=" " labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <ArrowDownOutlined style={{ marginLeft: "45px" }} />
                  </Form.Item>
                  <Form.Item label=" " labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} style={color.marginBt} >
                    <Form.Item name="OfficeCodeT" style={{ width: "100px", display: "inline-block" }} >
                      <Input.Search style={{ textAlign: 'right' }}
                        onClick={() => {
                          this.CheckError()
                          if (this.isEmpty(this.formRef.current?.getFieldValue("OfficeCodeT"))) {
                            this.setFieldOfficeCodeF()
                          }
                        }}
                        onChange={(e) => {
                          this.CheckError()
                          this.handleChangeOfficeCode(e.target.value, "OfficeCodeT")
                        }}
                        onSearch={() => {
                          if (this.isEmpty(this.formRef.current?.getFieldValue("OfficeCodeF")) || this.state.checkOfficeCodeF) {
                            message.error("指定の事業所は存在しません")
                            this.branchCode?.current?.focus();
                            return
                          } else {
                            if (this.isEmpty(this.formRef.current?.getFieldValue("OfficeCodeT"))) {
                              this.setFieldOfficeCodeF()
                            }
                            this.showOfficeInfoRetrievalQuery()
                          }
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="BranchStoreCodeT" style={{ margin: "0 5px", width: "80px", display: "inline-block", }} >
                      <Input.Search style={{ textAlign: 'right' }}
                        onClick={() => {
                          this.CheckError()
                          if (this.isEmpty(this.formRef.current?.getFieldValue("BranchStoreCodeT"))) {
                            this.setFieldOfficeCodeF()
                          }
                        }}
                        onChange={(e) => {
                          this.CheckError()
                          this.handleChangeOfficeCode(e.target.value, "BranchStoreCodeT")
                        }}
                        onSearch={() => {
                          if (this.isEmpty(this.formRef.current?.getFieldValue("OfficeCodeF")) || this.state.checkOfficeCodeF) {
                            message.error("指定の事業所は存在しません")
                            this.branchCode?.current?.focus();
                            return
                          } else {
                            if (this.formRef.current?.getFieldValue("BranchStoreCodeT")?.length < 1) {
                              this.setFieldOfficeCodeF()
                            }
                            this.showOfficeInfoRetrievalQuery()
                          }
                        }}
                      />
                    </Form.Item>
                    <div style={{ paddingTop: "5px", display: "inline-block" }} >
                      {this.formRef.current?.getFieldValue("office_kanji_nameT")}
                    </div>
                  </Form.Item>
                  <Spin spinning={this.state.checkCondition} indicator={null}>
                    <Form.Item label="引　継" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                      <Form.Item style={{ width: "100px", display: "inline-block" }} name="StsBelongsTakeover" valuePropName="checked" >
                        <Checkbox ></Checkbox>
                      </Form.Item>
                      <Button style={{ float: "right", display: "inline-block" }} icon={<SearchOutlined />} onClick={() => this.displayButton()} >検　　索</Button>
                    </Form.Item>
                    <hr></hr>
                    <Button type="primary" style={{ float: "right", display: "inline-block" }} onClick={() => this.run_F12()} > 更新   </Button>
                  </Spin>
                </Card>
              </Col>
              <Col span={10} lg={24} md={24} xl={10} style={{ padding: 0 }}>
                <Spin spinning={this.state.checkCondition} indicator={null}>
                  <Card>
                    <Table
                      style={{ cursor: "pointer" }}
                      rowClassName={(record, index) => record.id === this.formRef.current?.getFieldValue('selectedRow').id ? 'table-row-light' : ''}
                      pagination={false}
                      loading={this.state.isLoading}
                      dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                      rowKey={(record) => record.id}
                      scroll={{ x: 500, y: 800 }}
                      size="small"
                      bordered={true}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: () => {
                            this.formRef.current?.setFieldsValue({ selectedRow: record })
                            this.forceUpdate()
                            this.getInsuranceInfoSet(record);
                          }
                        };
                      }}
                      rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: this.state.selectedRowKeys,
                        onSelect: (record, selected, selectedRows, nativeEvent) => {
                          let arrTemp = [...this.state.selectedRowKeys];
                          let idx = arrTemp.indexOf(record.id);
                          this.formRef.current?.setFieldsValue({ selectedRow: record })
                          if (idx === -1) {
                            arrTemp.push(record.id);
                            this.setState({ selectedRowKeys: arrTemp });
                          } else {
                            arrTemp.splice(idx, 1);
                            this.setState({ selectedRowKeys: arrTemp });
                          }

                          this.selectedRecord(record, selected)
                        },
                        onSelectAll: (selected, selectedRows, changeRows) => {
                          if (selected) {
                            let arrTemp = this.formRef.current?.getFieldValue("tableData")?.map(item => item.id);
                            this.setState({ selectedRowKeys: arrTemp });

                          } else {
                            this.setState({ selectedRowKeys: [] });
                          }
                          this.allSelected(selected)
                        }
                      }}
                    >
                      <Table.Column width={80} title="個人番号" dataIndex="W2_person_num_id" showSorterTooltip={false}
                        sorter={(a, b) => a.W2_person_num_id - b.W2_person_num_id}
                        render={(value, record, index) => {
                          return (
                            <div style={{ textAlign: 'right' }} >
                              <span style={this.state.selectedRowKeys.indexOf(record.id) != -1 ? color.colorCheck : color.colorUncheck}>{value}</span>
                            </div>
                          )
                        }} />
                      <Table.Column title="氏名" dataIndex="kanji_name" showSorterTooltip={false}
                        sorter={(a, b) => a.kanji_name.localeCompare(b.kanji_name, 'ja')}
                        render={(value, record, index) => {
                          return (
                            <span style={this.state.selectedRowKeys.indexOf(record.id) != -1 ? color.colorCheck : color.colorUncheck}>{value}</span>
                          )
                        }} />
                      <Table.Column width={80} title="続柄" dataIndex="name" showSorterTooltip={false}
                        sorter={(a, b) => a.name.localeCompare(b.name, 'ja')}
                        render={(value, record, index) => {
                          return (
                            <span style={this.state.selectedRowKeys.indexOf(record.id) != -1 ? color.colorCheck : color.colorUncheck}>{value}</span>

                          )
                        }} />
                      <Table.Column title="保険証記号/番号" dataIndex="Expression_13"
                        render={(value, record, index) => {
                          return (
                            <span style={this.state.selectedRowKeys.indexOf(record.id) != -1 ? color.colorCheck : color.colorUncheck}>{value}</span>
                          )
                        }} />
                    </Table>
                  </Card>
                </Spin>
              </Col>
              <Col span={7} lg={24} md={24} xl={7}>
                <Spin
                  spinning={this.state.checkCondition}
                  indicator={null}>
                  <Card style={{ marginBottom: '1em' }}>
                    <Row>
                      <label style={style.label}>事業所 元</label>
                    </Row>
                    <Row>
                      <label style={style.label}>保険者</label>
                      <Form.Item style={{ width: '100px', marginRight: 10, marginBottom: 5 }} >
                        <span> {this.formRef.current?.getFieldValue("insurer_number")} </span>
                      </Form.Item>
                      <Form.Item style={{ width: 'calc(100% - 190px)', marginBottom: 5 }} >
                        <span>  {this.formRef.current?.getFieldValue("insurer_kanji_name_IY")} </span>
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>保険記号</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} >
                        <span> {this.formRef.current?.getFieldValue("insurer_card_symbol")} </span>
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>保険番号</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} >
                        <span> {this.formRef.current?.getFieldValue("insurer_card_number")} </span>
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>受給番号</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} >
                        <span> {this.formRef.current?.getFieldValue("recipient_number")} </span>
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>有効期限</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} >
                        <span> {this.checkDataNull("insurer_start_date_on") ? moment(this.checkDataNull("insurer_start_date_on"))?.format('YYYY/MM/DD') : null}</span>
                        <span style={{ display: this.checkDataNull("insurer_end_date_on") ? "" : "none" }} > ~ </span>
                        <span>{this.checkDataNull("insurer_end_date_on") ? moment(this.checkDataNull("insurer_end_date_on"))?.format('YYYY/MM/DD') : null}</span>
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>続柄</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} >
                        <span> {this.formRef.current?.getFieldValue("name_JB")} </span>
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>雇用形態</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} >
                        <span> {this.formRef.current?.getFieldValue("name_JE")} </span>
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>職種</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} >
                        <span> {this.formRef.current?.getFieldValue("name_JH")} </span>
                      </Form.Item>
                    </Row>

                    <Row style={{ marginTop: '30px' }}>
                      <label style={style.label}>事業所 先</label>
                    </Row>

                    <Row>
                      <label style={style.label}>保険者</label>
                      <Form.Item style={{ width: '110px', marginRight: 10, marginBottom: 5 }} name="Lio_InsuranceNumT">
                        <Input.Search readOnly
                          onSearch={() => {
                            if (this.state.selectedRowKeys.length > 0) {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1200,
                                  component: (
                                    <WS0246001_InsurerInfoSearchQuery
                                      onFinishScreen={(output) => {
                                        if (output) {
                                          this.formRef.current?.setFieldsValue({
                                            insurer_kanji_name_IV: output.Lo_Name,
                                            Lio_InsuranceNumT: output.Lo_InsurerCode
                                          });
                                          this.setDataTableName("Lio_InsuranceNumT");
                                        }
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }
                          }}
                        />
                      </Form.Item>
                      <Form.Item style={{ width: 'calc(100% - 200px)', marginBottom: 5 }} >
                        <span>  {this.formRef.current?.getFieldValue("insurer_kanji_name_IV")} </span>
                      </Form.Item>
                    </Row>
                    <Row>
                      <label style={style.label}>保険記号</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} name="Lio_InsuranceCardSymbolT" >
                        <Input readOnly={this.state.selectedRowKeys.length > 0
                          && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true}
                          onBlur={() => this.setDataTableName("Lio_InsuranceCardSymbolT")} />
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>保険番号</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} name="Lio_InsuranceCardNumT" >
                        <Input readOnly={this.state.selectedRowKeys.length > 0
                          && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true}
                          onBlur={() => this.setDataTableName("Lio_InsuranceCardNumT")} />
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>受給番号</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} name="Lio_BeneficiariesNumT" >
                        <Input readOnly={this.state.selectedRowKeys.length > 0
                          && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true}
                          onBlur={() => this.setDataTableName("Lio_BeneficiariesNumT")} />
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>有効期限</label>
                      <Form.Item style={{ width: '112px', marginRight: 10, marginBottom: 5 }} name="InsuranceStartDateChar">
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'
                          disabled={this.state.selectedRowKeys.length > 0
                            && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true}
                          onBlur={() => { this.checkDateStart() }}
                        />
                        {/* <Input readOnly={this.state.selectedRowKeys.length > 0
                          && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true}
                          style={{ background: this.state.checkDateStart ? "#FFD25A" : '' }}
                          onBlur={() => { this.checkDateFormat(this.formRef.current?.getFieldValue("InsuranceStartDateChar"), "InsuranceStartDateChar") }} /> */}
                      </Form.Item>
                      <span style={{ marginRight: 10 }}>~</span>
                      <Form.Item style={{ width: '112px', marginBottom: 5 }} name="InsuranceEndDateChar">
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD' disabled={this.state.selectedRowKeys.length > 0
                          && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true}
                          onChange={() => { this.checkDateEnd() }}
                        />
                        {/* <Input readOnly={this.state.selectedRowKeys.length > 0
                          && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true}
                          style={{ background: this.state.checkDateEnd ? "#FFD25A" : '' }}
                          onBlur={() => { this.checkDateFormat(this.formRef.current?.getFieldValue("InsuranceEndDateChar"), "InsuranceEndDateChar") }} /> */}
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>続柄</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} name="Lio_RelationshipT">
                        <Select style={{ width: "150px" }} disabled={this.state.selectedRowKeys.length > 0
                          && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true}
                          onChange={(value) => this.setDataTableName("name", value)} >
                          {this.state.Lio_RelationshipT?.map((value) => (
                            <Select.Option key={"Lio_RelationshipT-" + Math.random()} value={value.key} >
                              {value.value}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>雇用形態</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} name="Lio_EmploymentT">
                        <Select style={{ width: "150px" }} disabled={this.state.selectedRowKeys.length > 0 && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true}
                          onChange={(value) => this.setDataTableName("Lio_EmploymentT", value)} >
                          <Select.Option key={"Lio_EmploymentT-a"} value={""}>&emsp;</Select.Option>
                          {this.state.Lio_EmploymentT?.map((value) => (
                            <Select.Option key={"Lio_EmploymentT-" + Math.random()} value={value.key}  > {value.value}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Row>

                    <Row>
                      <label style={style.label}>職種</label>
                      <Form.Item style={{ width: 'calc(100% - 90px)', marginBottom: 5 }} name="Lio_JobT">
                        <Select style={{ width: "150px" }} onChange={(value) => this.setDataTableName("Lio_JobT", value)}
                          disabled={this.state.selectedRowKeys.length > 0 && this.state.selectedRowKeys.indexOf(this.formRef.current?.getFieldValue("selectedRow")?.id) > -1 ? false : true} >
                          <Select.Option key={"Lio_JobT-a"} value={""} >&emsp;</Select.Option>
                          {this.state.Lio_JobT?.map((value) => (
                            <Select.Option key={"Lio_JobT-" + Math.random()} value={value.key} >{value.value}</Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Row>
                    <hr />
                    <Button type="primary" style={{ float: "right", display: "inline-block" }} onClick={() => this.updateInsuranceInfo()} > 更新 </Button>
                  </Card>
                </Spin>
              </Col>
            </Row>
          </Form>
        </Spin>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0345001_DepartmentChangeOnce);
