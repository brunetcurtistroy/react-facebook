/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Color from "constants/Color";
import GetImage from "constants/Images.js";
import moment from 'moment';
import NumberFormat from "react-number-format";

import { Card, Form, Input, Radio, Button, Checkbox, Select, Space, Table, Row, Col, Modal, message, Tooltip, InputNumber } from "antd";
import { MoreOutlined, QuestionCircleOutlined, SaveOutlined, DeleteOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined , } from '@ant-design/icons';

import WS2533001_ConfirmSub from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2533001_ConfirmSub.jsx';
import WS0289012_ContractInfoInquiry from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS0289012_ContractInfoInquiry.jsx';
import WS0605127_ContractLineItemDisplay from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay.jsx';
import WS2584019_PersonalInfoInquirySub from 'pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx';
import GroupBookingsAction from "redux/ReservationBusiness/GroupBookings/GroupBookings.action";
import WS2556001_ReservesBulkChanges from "../V5YK0005000_ReservesBulkChanges/WS2556001_ReservesBulkChanges";
import WS0084001_PostCodeSearchEngine from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0084001_PostCodeSearchEngine.jsx";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS1290001_InsurerNumberInquiry from 'pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1290001_InsurerNumberInquiry.jsx';
import WS2585001_OfficeInfoInquirySub from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub.jsx';
import WS2787004_AffiliationSelectSub from 'pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS2787004_AffiliationSelectSub.jsx';
import WS2532008_InsuranceCardInquiry from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2532008_InsuranceCardInquiry.jsx';
import WS2577003_CalendarEmptySub from 'pages/YK_ReservationBusiness/V5YK0001000_ReserveStatusSearch/WS2577003_CalendarEmptySub.jsx';
import WS2553003_PeriodTimeInquiry from 'pages/YK_ReservationBusiness/V5YK0001000_ReserveStatusSearch/WS2553003_PeriodTimeInquiry.jsx';
import WS2532012_DateOfBirthInquiry from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2532012_DateOfBirthInquiry.jsx';
import ModalDraggable from "components/Commons/ModalDraggable";

import { getDataContractInfoInquiryAction } from "redux/ReservationBusiness/GroupBookings/ContractInfoInquiry.actions";
import { ReturnIcon } from "components/Commons/ReturnIcon";


const { Option } = Select;
const styleDivTitle = {
  background: '#1C66B9',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  textAlign: 'center',
  height: '32px',
  padding: '0.3em',
  color: '#FFFFFF'
};
const styleDivResult = {
  border: '1px solid rgba(0, 0, 0, 0.06)',
  textAlign: 'center',
  height: '32px',
  padding: '0.3em'
}
const styleCard = {
  marginBottom: '0.4em'
}
const styleNumberFormat = {
  border: '1px solid #d9d9d9',
  outline: '#d9d9d9',
  width: '100%',
  height: '24px',
  borderRadius: '2px',
  padding: '0 7px',
}
class WS2532001_GroupBookings extends React.Component {
  static propTypes = {
    Li_ReserveDate: PropTypes.any,
    Li_Way: PropTypes.any,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  inputRefReserveDate = React.createRef();
  inputTimezone = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '団体予約';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 19,
        size: 'small',
        showQuickJumper: true,
        pageSizeOptions: [19]
      },
      RelationshipList: [],
      FacilityNumList: [],
      listSelectedId: [],
      initObj: {},
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      importance: 0,
      initParams: {
        OfficeCode: '',
        BranchStoreCode: '',
        SortOrder: 0,
        TmpplaceCode: '',
        Relationship: '',
        Gender: '0',
        StsPreviousYearExtract: 0,
        StsThisYearNotYetVisited: 0,
        InsuranceCardNum: '',
        DateOfBirthChar: '', // 
        DateChar: '', //
        TimeZone: '',
        FacilityNum: 1,
        Course: '',
      },
    };
  }

  componentDidMount = () => {
    let params = {
      Li_ReserveDate: this.props.Li_ReserveDate ?? 0
    }
    this.loadScreenData(params);
  }

  loadScreenData = (params) => {
    GroupBookingsAction.getScreenDataAction(params)
      .then(res => {
        if (res) {
          let data = res.data;
          this.setState({
            RelationshipList: data.Relationship,
            FacilityNumList: data.FacilityNum,
            initParams: {
              ...this.state.initParams,
              DateChar: data.DateChar,
              TimeZone: data.TimeZone,
            },
            initObj: data,
          });
          this.formRef?.current?.setFieldsValue({ DateChar: data.DateChar, TimeZone: data.TimeZone, })
          // this.Clear()
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  onBlur = () => {
    const { OfficeCode, BranchStoreCode, TmpplaceCode } = this.state.initParams;
    this.loadScreenData({
      OfficeCode,
      BranchStoreCode,
      TmpplaceCode,
    })
  }

  subExtract = () => {
    // this.setState({ isLoading: true })
    GroupBookingsAction.subExtractAction()
      .then(res => {
        let data = res?.data;
        if (data && data.length > 0) {
          let arrTempID = [];
          data = data.map(item => {
            if (item.W1_target_flg) arrTempID.push(item.id)
            return {
              ...item,
              W1_time_zone: item.W1_time_zone ? moment(item.W1_time_zone, 'HH:mm').format('HH:mm') : ''
            }
          })
          this.setState({
            dataSource: data,
            rowSelect: this.state.rowSelect.id ? this.state.rowSelect : data[0],
            listSelectedId: arrTempID,
          });
          this.formRef?.current?.setFieldsValue({ rowSelect: this.state.rowSelect.id ? this.state.rowSelect : data[0] })
        } else {
          this.setState({
            dataSource: data,
            rowSelect: {},
            listSelectedId: [],
          });
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  Extract(Li_Way, confimExtract) {
    let values = {
      ...this.state.initParams,
      AgeF: this.state.initObj.AgeF,
      AgeT: this.state.initObj.AgeT,
      conditions_age_division: this.state.initObj.conditions_age_division,
      State: this.state.initObj.State,
      ContractType: this.state.initObj.ContractType,
      ContractOrgCode: this.state.initObj.ContractOrgCode,
      ContractDate: this.state.initObj.ContractDate,
      ContractNum: this.state.initObj.ContractNum,
      conditions_in_out_hospital: this.state.initObj.conditions_in_out_hospital,
      Date: this.state.initParams.DateChar,
      BirthDateDate: moment(this.state.initParams.DateOfBirthChar, 'NNy/MM/DD', true).isValid()
        || moment(this.state.initParams.DateOfBirthChar, 'YYYY/MM/DD', true).isValid()
        ? moment(this.state.initParams.DateOfBirthChar, 'NNy/MM/DD').format('YYYY/MM/DD')
        : '',
      Li_Way: Li_Way,
      AllSelect: this.state.initObj.AllSelect ? 1 : 0,
      Confirm: confimExtract ? 6 : 0, // user click yes
      flg_no: confimExtract ? 0 : 1,
    }
    this.setState({ isLoading: true })
    GroupBookingsAction.eventExtractAction(values)
      .then(res => this.subExtract())
      .catch(err => {
        message.error(err.response.data.message || "エラーが発生しました");
        this.setState({ isLoading: false })
      })
  }

  Clear() {
    this.setState({ isLoading: true })
    GroupBookingsAction.clearAction({ Confirm: 6 })
      .then(res => {
        this.setState({
          dataSource: [],
          rowSelect: {},
          isLoading: false
        })
        this.formRef?.current?.setFieldsValue({
          dataSource: [],
          rowSelect: {
            ReserveDate: '',
            W1_time_zone: '',
            W1_n_follow_sect: '',
            W1_facilities_num: '',
            W1_visits_courses: '',
            W1_remark: '',
          },
        })
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))

  }

  SelectAll = (checkAll) => {
    GroupBookingsAction.selectCheckboxAction({ AllSelect: checkAll })
      .then(() => {
        this.setState({ isLoading: true })
        this.subExtract()
      })
      .catch()
  }

  SelectOneLine = (rowData, StsChangeFromFalseToTrue) => {
    GroupBookingsAction.selectOneLineCheckboxAction(rowData)
      .then(() => {
        this.setState({ isLoading: true })
        this.subExtract()
        // if (StsChangeFromFalseToTrue)
        //   this.eventF12({
        //     list_id: this.state.listSelectedId,
        //     StsChangeFromFalseToTrue: StsChangeFromFalseToTrue ? 1 : 0
        //   })
      })
      .catch()
  }

  eventF12 = (params) => {
    this.setState({ isLoading: true })
    GroupBookingsAction.eventF12Action(params)
      .then((res) => {
        if (res.data.Confirm === 6) {
          if (this.state.listSelectedId.length > 0) {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: true,
                width: '60%',
                component: (
                  <WS2533001_ConfirmSub
                    Lo_ReturnBookReview={res.data.Confirm}
                    Li_Title={'予約処理を行います。'}
                    list_id={res.data.list_id}
                    StsChangeFromFalseToTrue={res.data.StsChangeFromFalseToTrue}
                    onFinishScreen={({ Lo_ReturnBookReview }) => {
                      this.closeModal();
                      if (Lo_ReturnBookReview === 6) {
                        let params = {
                          StsBatchInspectChangeSetting: this.state.initObj.StsBatchInspectChangeSetting,
                          Confirm: res.data.Confirm,
                          StsWakutoConvert: this.state.initObj.StsWakutoConvert
                        }
                        this.confirmCallScreen(params)
                      }
                    }}
                  />
                ),
              },
              initObj: {
                ...this.state.initObj,
                StsWakutoConvert: res.data.StsWakutoConvert
              }
            });
          }
        }
        this.subExtract()
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        this.ModalWarning();
      })
  }

  confirmCallScreen = (params) => {
    GroupBookingsAction.confirmCallScreenAction(params)
      .then(res => {
        let data = res.data;
        if (data) {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: '80%',
              component: (
                <WS2556001_ReservesBulkChanges
                  Li_MenuOption={''}
                  Li_ExtractDateF={data.IJ_W1_consult_date}
                  LnkinExtractDateT={data.IN_W1_consult_date}
                  Li_ExtractOffice={data.IH_W1_office_cd}
                  Li_ExtractBranchStore={data.II_W1_branch_store_cd}
                  onFinishScreen={() => {
                    this.closeModal();
                  }}
                />
              ),
            },
          });
        }
      })
      .catch()
  }

  updateData = (record) => {
    let params = {
      id: record.id,
      W1_target_flg: record.W1_target_flg,
      ReserveDate: record.ReserveDate,
      W1_time_zone: record.W1_time_zone,
      W1_n_follow_sect: record.W1_n_follow_sect,
      W1_facilities_num: record.W1_facilities_num,
      W1_visits_courses: record.W1_visits_courses,
      W1_remark: record.W1_remark,
      W1_contract_type: record.W1_contract_type,
      W1_contract_org_cd: record.W1_contract_org_cd,
      W1_contract_date: record.W1_contract_date,
      W1_contract_num: record.W1_contract_num,
    }
    GroupBookingsAction.updateDataAction(params)
      .then()
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  deleteData = (record, index) => {
    let arrTemp = [...this.state.dataSource];
    if (record.id) {
      GroupBookingsAction.deleteDataAction({ id: record.id })
        .then(res => {
          // message.success('成功');
          arrTemp.splice(index, 1);
          this.formRef.current.setFieldsValue({
            dataSource: arrTemp,
            rowSelect: arrTemp.length > 0 ? arrTemp[0] : {}
          });
          this.setState({
            dataSource: arrTemp,
            rowSelect: arrTemp.length > 0 ? arrTemp[0] : {}
          });
        })
        .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
    }
  }

  ModalError = (content, refName) => {
    Modal.error({
      content: content || '事業所が無効です',
      okText: 'OK',
      onOk: () => {
        if (typeof refName == 'string') {
          this[refName]?.current?.focus()
        } else if (typeof refName == 'function') {
          refName();
        }
      }
    })
  }
  ModalWarning() {
    if (this.formRef?.current?.getFieldValue('OfficeCode')) {
      Modal.confirm({
        content: 'エラーの方がいます。このまま予約を行いますか?',
        icon: <WarningOutlined style={{ color: '#faad14' }} />,
        okText: 'は　い',
        cancelText: 'いいえ',
        onOk: () => {
          this.eventF12({ list_id: this.state.listSelectedId, StsChangeFromFalseToTrue: 1});
        },
        onCancel: () => {
          this.subExtract();
        }
      });
    }
  }

  ModalConfirm = (select, Li_Way) => {
    if (this.formRef?.current?.getFieldValue('OfficeCode')) {
      Modal.confirm({
        content: '設定されている予約内容をクリアしますか？',
        icon: <QuestionCircleOutlined style={{ color: '#006FCA' }} />,
        okText: 'は　い',
        cancelText: 'いいえ',
        onOk: () => {
          select === 'Extract'
            ? this.Extract(Li_Way, true)
            : this.Clear()
        },
        onCancel: () => {
          if (select === 'Extract') {
            this.Extract(Li_Way, false);
          }
        }
      });
    } else {
      this.ModalError();
    }
  }

  setStateInitParams = (value, name) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        [name]: value
      }
    });
    if (name === 'OfficeCode' || name === 'BranchStoreCode') this.setState({ importance: 0 })
    this.formRef.current.setFieldsValue({ [name]: value });
  }

  handleChangeRecord = (value, name) => {
    let arrTemp = [...this.state.dataSource];
    let obj = { ...this.state.rowSelect }
    let index = arrTemp.findIndex(item => item.id === obj.id);
    if (index !== -1) {
      obj = {
        ...obj,
        [name]: value
      }
      if (name === 'W1_visits_courses') {
        obj = {
          ...obj,
          Expresstion_45: value,
          Expresstion_46: value ? obj.contract_short_name : '',
          contract_short_name: value ? obj.contract_short_name : '',
          W1_contract_date: value ? obj.W1_contract_date : "0000-00-00",
          W1_contract_num: value ? obj.W1_contract_num : 0,
          W1_contract_org_cd: value ? obj.W1_contract_org_cd : "",
          W1_contract_type: value ? obj.W1_contract_type : 0,
        }
      }
      if (name === 'ReserveDate') {
        obj = {
          ...obj,
          Expresstion_42: value
        }
      }
      arrTemp[index] = obj;
      this.setState({
        dataSource: arrTemp,
        rowSelect: obj
      });
      this.formRef.current.setFieldsValue({
        dataSource: arrTemp,
        rowSelect: obj
      });
    }
    // if (moment(obj.ReserveDate, 'YYYY/MM/DD', true).isValid()) {
    //   // this.updateData(obj);
    // }
  }

  ReturnComponent = (component) => {
    let components = {
      WS0247001: WS0247001_OfficeInfoRetrievalQuery,
      WS2585001: WS2585001_OfficeInfoInquirySub,
      WS2787004: WS2787004_AffiliationSelectSub,
      WS2532008: WS2532008_InsuranceCardInquiry,
      WS2577003: WS2577003_CalendarEmptySub,
      WS2553003: WS2553003_PeriodTimeInquiry,
      WS2532012: WS2532012_DateOfBirthInquiry,
    };
    return components[component];
  }

  callbackOpenModal = (screen, props, nameForm) => {
    let Component = this.ReturnComponent(screen);

    switch (screen) {
      case 'WS2532012':
      case 'WS2532008':
      case 'WS2787004':
      case 'WS2585001':
      case 'WS0247001': {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: screen === 'WS2787004' ? '60%' : '80%',
            component: (
              <Component
                // WS0247001 (props)
                Li_NewlyRegisteredPresence={''}
                Lio_OfficeCode={this.state.initParams.OfficeCode}
                Lio_BranchStoreCode={this.state.initParams.BranchStoreCode}
                Li_1HeadOffice2BranchShop={1}
                // WS2585001, WS2787004, WS2532008, WS2532012
                Li_OfficeCode={this.state.initParams.OfficeCode}
                Li_BranchStoreCode={this.state.initParams.BranchStoreCode}
                Lio_AffiliationCode={this.state.initParams.TmpplaceCode} // WS2787004
                Li_Relationship={this.state.initParams.Relationship} // WS2532008, WS2532012

                onFinishScreen={({
                  Lio_OfficeCode,
                  Lio_BranchStoreCode,
                  Lo_Kanji_Name,
                  Lio_AffiliationCode,
                  Lo_InsuranceCardNum,
                  Lo_DateOfBirth,
                  recordData
                }) => {
                  if (screen === 'WS0247001') {
                    this.formRef.current.setFieldsValue({
                      OfficeCode: Lio_OfficeCode,
                      BranchStoreCode: Lio_BranchStoreCode === 0 ? '' : Lio_BranchStoreCode,
                      office_kanji_name: Lo_Kanji_Name
                    });
                    this.setState({
                      initParams: {
                        ...this.state.initParams,
                        BranchStoreCode: Lio_BranchStoreCode,
                        OfficeCode: Lio_OfficeCode,
                      },
                      importance: recordData.importance
                    });
                  }
                  if (screen === 'WS2787004') {
                    this.setStateInitParams(Lio_AffiliationCode, 'TmpplaceCode');
                  }
                  if (screen === 'WS2532008') {
                    this.setStateInitParams(Lo_InsuranceCardNum, 'InsuranceCardNum');
                  }
                  if (screen === 'WS2532012') {
                    this.setStateInitParams(Lo_DateOfBirth, 'DateOfBirthChar');
                    this.formRef?.current?.setFieldsValue({ DateOfBirthChar: moment(Lo_DateOfBirth).format('NNy/MM/DD') })
                  }

                  this.closeModal();
                }}
              />
            ),
          },
        });
        break;
      }
      case 'WS2553003':
      case 'WS2577003': {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: screen === 'WS2553003' ? '20%' : '60%',
            component: (
              <Component
                {...props}
                onFinishScreen={({ Lio_Date, Lio_TimeZone }) => {
                  if (screen === 'WS2577003') {
                    if (nameForm === 'ReserveDate') {
                      this.handleChangeRecord(Lio_Date, 'ReserveDate');
                    } else {
                      this.setStateInitParams(Lio_Date, 'DateChar');
                    }
                  }
                  if (screen === 'WS2553003') {
                    if (nameForm === 'W1_time_zone') {
                      this.handleChangeRecord(Lio_TimeZone, 'W1_time_zone');
                    } else {
                      this.setStateInitParams(Lio_TimeZone, 'TimeZone');
                    }
                  }

                  this.closeModal()
                }}
              />
            ),
          },
        })
        break;
      }
      case 'WS0289012': {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: '80%',
            component: (
              <WS0289012_ContractInfoInquiry
                {...props}
                onFinishScreen={({
                  Lio_ConsultCourse,
                  Lo_ContractType,
                  Lo_ContractOrgCode,
                  Lo_ContractStartDate,
                  Lo_ContractNum,
                  Lo_Status,
                  Lo_ErrorMessage,
                  recordData,
                }) => {
                  Lio_ConsultCourse = Lio_ConsultCourse ? Lio_ConsultCourse.replace('-', '') : '';
                  if (nameForm === 'W1_visits_courses') {
                    let total = recordData.Expression_42 + recordData.Expression_43 + recordData.Expression_44 + recordData.Expression_36;
                    let obj = {
                      ...this.state.rowSelect,
                      W1_visits_courses: Lio_ConsultCourse,
                      Expresstion_45: Lio_ConsultCourse,
                      Expresstion_46: recordData.W1_contract_short_name,
                      contract_short_name: recordData.W1_contract_short_name,
                      W1_contract_type: Lo_ContractType,
                      W1_contract_org_cd: Lo_ContractOrgCode,
                      W1_contract_date: Lo_ContractStartDate,
                      W1_contract_num: Lo_ContractNum,
                      insurer_total_price: recordData.Expression_42 ? recordData.Expression_42.toLocaleString() : null,
                      office_total_price: recordData.Expression_43 ? recordData.Expression_43.toLocaleString() : null,
                      organization_total_price: recordData.Expression_44 ? recordData.Expression_44.toLocaleString() : null,
                      Expresstion_57: recordData.Expression_36 ? recordData.Expression_36.toLocaleString() : null,
                      Expresstion_58: total ? total.toLocaleString() : null,
                    }
                    let arr = [...this.state.dataSource];
                    let index = arr.findIndex(item => item.id === obj.id);
                    arr[index] = obj;
                    this.setState({
                      dataSource: arr,
                      rowSelect: obj
                    });
                    this.updateData(obj)
                    this.formRef?.current?.setFieldsValue({ rowSelect: obj, dataSource: arr })
                  } else {
                    this.setStateInitParams(Lio_ConsultCourse, 'Course');
                    this.setState({
                      initObj: {
                        ...this.state.initObj,
                        contract_short_name: recordData.W1_contract_short_name,
                        ContractType: Lo_ContractType,
                        ContractOrgCode: Lo_ContractOrgCode,
                        ContractDate: Lo_ContractStartDate,
                        ContractNum: Lo_ContractNum,
                      }
                    })
                  }
                  this.closeModal()
                }}
              />
            ),
          },
        })
        break;
      }
      default: break;
    }
  }

  returnTimeZone(value = "08:30") {
    var arr = value.split(":");
    if (parseInt(arr[0]) >= 12) {
      if (parseInt(arr[1]) > 0) {
        return "PM"
      }
    }
    return "AM"
  }

  getNameCourseCode = (valueCourse, rowSelect, fieldName) => {
    const params = {
      Li_State: 0,
      Li_EffectiveLimitedDisplay: 1,
      Lio_ConsultCourse: valueCourse,
      Li_OfficeCode: rowSelect?.W1_office_cd,
      Li_BranchStoreCode: rowSelect?.W1_branch_store_cd,
      Li_Date: rowSelect?.W1_consult_date,
      Li_Gender: rowSelect?.Expresstion_47 === '男性' ? 1 : 2,
      Li_DateBirth: rowSelect?.birthday_on,
      Li_Relationship: rowSelect?.relationship,
      Li_HospitalOut: rowSelect?.conditions_in_out_hospital,
      Li_Am_Pm: this.returnTimeZone(rowSelect?.W1_time_zone),
      Li_NTsugikenmi: rowSelect?.W1_n_follow_sect,
      Li_Other: '',
      Lio_ContractType: rowSelect?.W1_contract_type,
      Lio_ContractOrgCode: rowSelect?.W1_contract_org_cd,
      Lio_ContractStartDate: rowSelect?.W1_contract_date || '0000/00/00',
      Lio_ContractNum: rowSelect?.W1_contract_num,
      Lo_Status: '',
      Lo_ErrorMessage: '',
    }
    if (valueCourse) {
      getDataContractInfoInquiryAction(params)
        .then((res) => {
          if (res?.data?.message === 'WS0289012_ContractInfoInquiry') {
            this.callbackOpenModal('WS0289012', params, fieldName)
          } else {
            if (fieldName === 'W1_visits_courses') {
              let obj = {
                ...rowSelect,
                ...res?.data,
                Expresstion_46: res?.data?.contract_short_name,
              }
              let arr = [...this.state.dataSource];
              let index = arr.findIndex(item => item.id === obj.id);
              arr[index] = obj;
              this.setState({
                dataSource: arr,
                rowSelect: obj
              });
              this.updateData(obj)
              this.formRef?.current?.setFieldsValue({ rowSelect: obj, dataSource: arr })
            } else {
              this.setState({
                initObj: {
                  ...this.state.initObj,
                  contract_short_name: res?.data?.contract_short_name
                }
              });
            }
          }
        })
        .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
    } else if (this.state.dataSource.length > 0) {
      this.callbackOpenModal('WS0289012', params, fieldName)
    }
  }

  getNameOfficeCode = (objChange) => {
    let params = {
      OfficeCode: this.state.initParams.OfficeCode,
      BranchStoreCode: this.state.initParams.BranchStoreCode
    }
    GroupBookingsAction.getNameOfficeCodeAction({ ...params, ...objChange })
      .then((res) => {
        this.formRef?.current?.setFieldsValue({ office_kanji_name: res?.data?.office_kanji_name || '' })
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  checkTimeZone = (value) => {
    if (value) {
      let arr = value.split(":");
      if ((8 <= parseInt(arr[0]) <= 12) && (parseInt(arr[1]) === 0 || parseInt(arr[1]) === 30)) {
        return true
      }
    }
    return false
  }

  render() {
    const { rowSelect, initParams, dataSource } = this.state;
    return (
      <div className="group-bookings">
        <Form ref={this.formRef} onFinish={this.onFinish} autoComplete="off" initialValues={this.state.initParams} >
          <Card>
            {/* header */}
            <Row gutter={6} style={styleCard}>
              {/* col left */}
              <Col span={16} >
                <Card style={styleCard}>
                  <Row gutter={20}>
                    <Col span={21}>
                      <Row gutter={10}>
                        <Col span={12}>
                          <Space>
                            <Form.Item label="事業所" name="OfficeCode" >
                              <Input.Search
                                style={{ textAlign: 'right' }}
                                onSearch={() => this.callbackOpenModal('WS0247001')}
                                onDoubleClick={() => this.callbackOpenModal('WS0247001')}
                                onBlur={(e) => {
                                  //this.onBlur()
                                  this.getNameOfficeCode({ OfficeCode: e.target.value })
                                }}
                                onChange={(e) => {
                                  this.setStateInitParams(e.target.value, 'OfficeCode');
                                  this.formRef?.current?.setFieldsValue({ office_kanji_name: '' })
                                }}
                              />
                            </Form.Item>
                            <Form.Item name="BranchStoreCode" >
                              <Input
                                style={{ textAlign: 'right' }}
                                readOnly={!this.state.initParams.OfficeCode}
                                onBlur={(e) => {
                                  //this.onBlur()
                                  this.getNameOfficeCode({ BranchStoreCode: e.target.value })
                                }}
                                onDoubleClick={() => this.callbackOpenModal('WS0247001')}
                                onChange={(e) => {
                                  this.setStateInitParams(e.target.value, 'BranchStoreCode');
                                  this.formRef?.current?.setFieldsValue({ office_kanji_name: '' })
                                }}
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                type={this.state.importance === 0 ? 'default' : 'text'}
                                size='small'
                                icon={ReturnIcon(this.state.importance)}
                                disabled={!this.state.initParams.OfficeCode}
                                onClick={() => this.callbackOpenModal('WS2585001')}
                              />
                            </Form.Item>
                          </Space>
                        </Col>
                        <Col span={12}>
                          <Form.Item name='office_kanji_name'>
                            <Input tabindex="-1" bordered={false} readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={10} className='mt-2'>
                        <Col span={16}>
                          <Space>
                            <Form.Item label="所　属" name="TmpplaceCode" >
                              {/* <Tooltip title={this.state.initObj.short_name}> */}
                              <Input.Search
                                style={{ textAlign: 'right' }}
                                disabled={!(this.state.initParams.TmpplaceCode > 0 || this.state.initObj.StsAffiliationExists)}
                                onSearch={() => this.callbackOpenModal('WS2787004')}
                                onChange={(e) => this.setStateInitParams(e.target.value, 'TmpplaceCode')}
                              />
                              {/* </Tooltip>   */}
                            </Form.Item>
                            <Form.Item label="続柄" name="Relationship">
                              <Select
                                // disabled={!this.state.initParams.OfficeCode}
                                style={{ width: 120 }}
                                onClick={() => {
                                  if (!this.state.initParams.OfficeCode) {
                                    this.ModalError()
                                  }
                                }}
                                onChange={(value) => this.setStateInitParams(value, 'Relationship')}
                              >
                                <Option value=""></Option>
                                {this.state.RelationshipList?.map(value => (
                                  <Option key={"Relationship-" + value.node_code_name} value={value.node_code_name}>{value.name}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item label="性別" name="Gender">
                              <Select
                                style={{ width: 120 }}
                                // disabled={!this.state.initParams.OfficeCode}
                                onClick={() => {
                                  if (!this.state.initParams.OfficeCode) {
                                    this.ModalError()
                                  }
                                }}
                                onChange={(value) => this.setStateInitParams(value, 'Gender')}
                              >
                                <Option value="0">　　</Option>
                                <Option value="1">男性</Option>
                                <Option value="2">女性</Option>
                              </Select>
                            </Form.Item>
                          </Space>
                        </Col>
                        <Col span={8} style={{ textAlign: 'center' }}>
                          <Space>
                            <Tooltip title='前年度に受診されている方のみを抽出します'>
                              <Form.Item name="StsPreviousYearExtract" valuePropName="checked" >
                                <Checkbox
                                  // disabled={!this.state.initParams.OfficeCode}
                                  onChange={(e) => {
                                    if (this.state.initParams.OfficeCode) {
                                      this.setStateInitParams(e.target.checked ? 1 : 0, 'StsPreviousYearExtract')
                                    } else {
                                      this.ModalError()
                                      this.formRef?.current?.setFieldsValue({ StsPreviousYearExtract: 0 })
                                    }
                                  }}
                                >前年度</Checkbox>
                              </Form.Item>
                            </Tooltip>
                            <Tooltip title='今年度に未受診の方のみを抽出します'>
                              <Form.Item name="StsThisYearNotYetVisited" valuePropName="checked" >
                                <Checkbox
                                  // disabled={!this.state.initParams.OfficeCode}
                                  onChange={(e) => {
                                    if (this.state.initParams.OfficeCode) {
                                      this.setStateInitParams(e.target.checked ? 1 : 0, 'StsThisYearNotYetVisited')
                                    } else {
                                      this.ModalError()
                                      this.formRef?.current?.setFieldsValue({ StsThisYearNotYetVisited: 0 })
                                    }
                                  }}
                                >未受診</Checkbox>
                              </Form.Item>
                            </Tooltip>
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={3}>
                      <Form.Item name="SortOrder">
                        <Radio.Group
                          // disabled={!this.state.initParams.OfficeCode}
                          onChange={(e) => {
                            if (this.state.initParams.OfficeCode) {
                              this.setStateInitParams(e.target.value, 'SortOrder')
                            } else {
                              this.ModalError()
                              this.formRef?.current?.setFieldsValue({ SortOrder: 0 })
                            }
                          }}
                        >
                          <Radio value={0}>カナ順</Radio>
                          <Radio value={1}>保険証順</Radio>
                          <Radio value={2}>処理順</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Card>
                  <Row >
                    <Col span={12} >
                      <Space>
                        <Form.Item label="保険証" name="InsuranceCardNum">
                          <Input.Search
                            readOnly={!this.state.initParams.OfficeCode}
                            onChange={(e) => this.setStateInitParams(e.target.value, 'InsuranceCardNum')}
                            onSearch={() => {
                              this.state.initParams.OfficeCode
                                ? this.callbackOpenModal('WS2532008')
                                : this.ModalError()
                            }}
                            onClick={() => {
                              if (!this.state.initParams.OfficeCode) {
                                this.ModalError()
                              }
                            }}
                          />
                        </Form.Item>
                        <Form.Item label="生年月日" name="DateOfBirthChar">
                          <Input.Search
                            readOnly={!this.state.initParams.OfficeCode}
                            onChange={(e) => this.setStateInitParams(e.target.value, 'DateOfBirthChar')}
                            onSearch={() => {
                              this.state.initParams.OfficeCode
                                ? this.callbackOpenModal('WS2532012')
                                : this.ModalError()
                            }}
                            onClick={() => {
                              if (!this.state.initParams.OfficeCode) {
                                this.ModalError()
                              }
                            }}
                            onBlur={e => {
                              if (this.state.initParams.OfficeCode && e.target.value) {
                                if (moment(e.target.value, 'YYYY/MM/DD', true).isValid() || moment(e.target.value, 'NNy/MM/DD', true).isValid()) {
                                  this.setStateInitParams(e.target.value, 'DateOfBirthChar')
                                } else {
                                  this.ModalError('不正な日付です', () => {
                                    this.formRef.current.getFieldInstance('DateOfBirthChar').focus();
                                  });
                                }

                              }
                            }}
                          />
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={12} >
                      <Form.Item style={{ float: 'right' }}>
                        <Space >
                          <Button type="primary" onClick={() => {
                            if (this.formRef?.current?.getFieldValue('OfficeCode')) {
                              this.state.dataSource.length <= 0
                                ? this.Extract('追加', true)
                                : this.ModalConfirm('Extract', '追加')
                            } else {
                              this.ModalError()
                            }
                          }} >追　加</Button>
                          <Button type="primary" onClick={() => this.ModalConfirm('Clear')} >クリア</Button>
                        </Space>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
              {/* col right */}
              <Col span={8}>
                <Card>
                  <Form.Item name="DateChar" label="受診日" >
                    <Input.Search
                      style={{ width: '150px' }}
                      readOnly={!this.state.initParams.OfficeCode}
                      onChange={(e) => this.setStateInitParams(e.target.value, 'DateChar')}
                      onBlur={e => {
                        if (moment(e.target.value, 'YYYY/MM/DD', true).isValid()) {
                          this.setStateInitParams(e.target.value, 'DateChar')
                        } else {
                          this.ModalError('不正な日付です', () => {
                            this.formRef.current.getFieldInstance('DateChar').focus();
                          })
                        }
                      }}
                      onClick={() => !initParams.OfficeCode && this.ModalError()}
                      onSearch={() => {
                        let props = {
                          Lio_Date: this.state.initObj.Date,
                          Li_Alone: '',
                        }
                        this.state.initParams.OfficeCode
                          ? this.callbackOpenModal('WS2577003', props)
                          : this.ModalError()
                      }}
                    />
                  </Form.Item>
                  <Form.Item className='mt-2' name="TimeZone" label="時間帯">
                    <Input.Search
                      style={{ width: '150px' }}
                      readOnly={!this.state.initParams.OfficeCode}
                      onChange={(e) => this.setStateInitParams(e.target.value, 'TimeZone')}
                      onClick={() => !initParams.OfficeCode && this.ModalError()}
                      onSearch={() => {
                        let props = {
                          Li_Date: this.state.initObj.Date,
                          Li_FacilityType: this.state.initParams.FacilityNum,
                          Li_CourseCode: this.state.initParams.Course,
                          Li_ProcessDivision: '',
                          Lio_TimeZone: this.state.initParams.TimeZone,
                        }
                        this.state.initParams.OfficeCode
                          ? this.callbackOpenModal('WS2553003', props)
                          : this.ModalError()
                      }}
                      onBlur={(e) => {
                        let props = {
                          Li_Date: this.state.initObj.Date,
                          Li_FacilityType: this.state.initParams.FacilityNum,
                          Li_CourseCode: this.state.initParams.Course,
                          Li_ProcessDivision: '',
                          Lio_TimeZone: this.state.initParams.TimeZone,
                        }
                        if (!this.checkTimeZone(e.target.value) && initParams.OfficeCode) {
                          this.callbackOpenModal('WS2553003', props)
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item className='mt-2' name="FacilityNum" label="施　設" >
                    <Select
                      disabled={!this.state.initParams.OfficeCode}
                      style={{ width: '150px' }}
                      onChange={(value) => this.setStateInitParams(value, 'FacilityNum')}
                    >
                      {this.state.FacilityNumList?.map(value => (
                        <Option key={"FacilityNum-" + value.facility_type} value={value.facility_type}>{value.facility_name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item className='mt-2' label="コース">
                    <Space>
                      <Form.Item name="Course">
                        <Input.Search
                          style={{ width: '150px' }}
                          readOnly={!this.state.initParams.OfficeCode}
                          onChange={(e) => {
                            this.setStateInitParams(e.target.value?.toLocaleUpperCase(), 'Course');
                            this.setState({ initObj: { ...this.state.initObj, contract_short_name: '' } });
                          }}
                          onClick={() => !initParams.OfficeCode && this.ModalError()}
                          onKeyDown={(event) => {
                            var code = event.keyCode || event.which;
                            if (code === 9 && event.target.value) {
                              let props = {
                                Li_State: 0,
                                Li_EffectiveLimitedDisplay: 2,
                                Lio_ConsultCourse: this.state.initParams.Course,
                                Li_OfficeCode: this.state.initParams.OfficeCode,
                                Li_BranchStoreCode: this.state.initParams.BranchStoreCode,
                                Li_Date: this.state.initObj.Date || moment().format('YYYY/MM/DD'),
                                Li_Gender: this.state.initParams.Gender,
                                Li_DateBirth: '',
                                Li_Relationship: '',
                                Li_HospitalOut: 0,
                                Li_Am_Pm: '',
                                Li_NTsugikenmi: 0,
                                Li_Other: '',
                                Lio_ContractType: this.state.initObj.ContractType,
                                Lio_ContractOrgCode: this.state.initObj.ContractOrgCode,
                                Lio_ContractStartDate: this.state.initObj.ContractDate,
                                Lio_ContractNum: this.state.initObj.ContractNum,
                                Lo_Status: '',
                                Lo_ErrorMessage: '',
                              }
                              // this.getNameCourseCode(event.target.value, {}, props, 'Course')
                              this.state.initParams.OfficeCode
                                ? this.callbackOpenModal('WS0289012', props)
                                : this.ModalError()
                            }
                          }}
                          onSearch={() => {
                            let props = {
                              Li_State: 0,
                              Li_EffectiveLimitedDisplay: 2,
                              Lio_ConsultCourse: this.state.initParams.Course,
                              Li_OfficeCode: this.state.initParams.OfficeCode,
                              Li_BranchStoreCode: this.state.initParams.BranchStoreCode,
                              Li_Date: this.state.initObj.Date || moment().format('YYYY/MM/DD'),
                              Li_Gender: this.state.initParams.Gender,
                              Li_DateBirth: '',
                              Li_Relationship: '',
                              Li_HospitalOut: 0,
                              Li_Am_Pm: '',
                              Li_NTsugikenmi: 0,
                              Li_Other: '',
                              Lio_ContractType: this.state.initObj.ContractType,
                              Lio_ContractOrgCode: this.state.initObj.ContractOrgCode,
                              Lio_ContractStartDate: this.state.initObj.ContractDate,
                              Lio_ContractNum: this.state.initObj.ContractNum,
                              Lo_Status: '',
                              Lo_ErrorMessage: '',
                            }
                            this.state.initParams.OfficeCode
                              ? this.callbackOpenModal('WS0289012', props)
                              : this.ModalError()
                          }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size='small'
                          disabled={!this.state.initParams.Course}
                          icon={<MoreOutlined />}
                          onClick={() => {
                            if (this.formRef.current.getFieldValue("Course")) {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '80%',
                                  component: (
                                    <WS0605127_ContractLineItemDisplay
                                      Li_ContractType={this.state.initObj?.ContractType}
                                      Li_ContractOrgCode={this.state.initObj?.ContractOrgCode}
                                      Li_ContractStartDate={this.state.initObj?.ContractDate}
                                      Li_ContractNum={this.state.initObj?.ContractNum}
                                    />
                                  ),
                                },
                              });
                            }
                          }}
                        />
                      </Form.Item>
                      <Form.Item name='contract_short_name'>
                        <span>{this.state.initObj?.contract_short_name}</span>
                      </Form.Item>
                    </Space>
                    <Form.Item style={{ float: 'right' }}>
                      <Button type="primary" onClick={() => {
                        this.formRef?.current?.getFieldValue('OfficeCode') ? this.Extract('変更', true) : this.ModalError()
                      }}>適　用</Button>
                    </Form.Item>
                  </Form.Item>
                </Card>
              </Col>
            </Row>

            {/* body */}
            <Row gutter={6} style={styleCard}>
              <Col span={18}>
                <Card>
                  <Table
                    size="small"
                    bordered
                    dataSource={this.state.dataSource}
                    rowKey={record => record.id}
                    rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
                    pagination={{
                      ...this.state.pagination,
                      hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
                    }}
                    loading={this.state.isLoading}
                    onRow={(record, index) => ({
                      onClick: (e) => {
                        this.setState({ rowSelect: record });
                        this.formRef?.current?.setFieldsValue({ rowSelect: record })
                      },
                    })}
                    rowSelection={{
                      type: 'checkbox',
                      selectedRowKeys: this.state.listSelectedId,
                      onSelect: (record, selected, selectedRows, nativeEvent) => {
                        let arrTemp = [...this.state.listSelectedId];
                        let idx = arrTemp.indexOf(record.id);
                        idx === -1 ? arrTemp.push(record.id) : arrTemp.splice(idx, 1);
                        this.setState({
                          listSelectedId: arrTemp,
                          rowSelect: record
                        });
                        this.formRef?.current?.setFieldsValue({ rowSelect: record })
                        this.SelectOneLine({
                          id: record.id,
                          W1_target_flg: (idx === -1) ? true : false,
                        }, selected);
                      },
                      onSelectAll: (selected, selectedRows, changeRows) => {
                        let arrTemp = this.state.dataSource.map(item => item.id);
                        this.setState({
                          listSelectedId: selected ? arrTemp : [],
                          initObj: {
                            ...this.state.initObj,
                            AllSelect: selected ? 1 : 0,
                          }
                        });
                        this.SelectAll(selected ? 1 : 0);
                      }
                    }}
                  >
                    <Table.Column title="受診日" dataIndex="Expresstion_42"
                      render={(text, record) => <div style={{ color: Color(record.Expresstion_52).Foreground }}>{text}</div>}
                    />
                    <Table.Column title="カナ氏名" dataIndex="Expresstion_43"
                      render={(text, record) => <div style={{ color: Color(record.Expresstion_52).Foreground }}>{text}</div>}
                    />
                    <Table.Column title="漢字氏名" dataIndex="Expresstion_44"
                      render={(text, record) => <div style={{ color: Color(record.Expresstion_52).Foreground }}>{text}</div>}
                    />
                    <Table.Column title="性別" dataIndex="Expresstion_47"
                      render={(text, record) => <div style={{ color: Color(record.Expresstion_52).Foreground }}>{text}</div>}
                    />
                    <Table.Column title="年齢" dataIndex="Age"
                      render={(text, record) => <div style={{ color: Color(record.Expresstion_52).Foreground }}>{text ? text + '歳' : ''}</div>}
                    />
                    <Table.Column title="ｺｰｽ" dataIndex="Expresstion_45"
                      render={(text, record) => <div style={{ color: Color(record.Expresstion_52).Foreground }}>{text}</div>}
                    />
                    <Table.Column title="契約情報" dataIndex="Expresstion_46"
                      render={(text, record) => <div style={{ color: Color(record.Expresstion_52).Foreground }}>{text}</div>}
                    />
                    <Table.Column title="エラー内容" dataIndex="error_message"
                      render={(text) => <div style={{ color: Color(209).Foreground }}>{text}</div>}
                    />
                    <Table.Column align='center' width={70} title=''
                      render={(text, record, index) => (
                        <>
                          <Button size='small' style={{ border: 'none', }}
                            icon={<SaveOutlined style={{ color: 'green' }} />}
                            onClick={() => this.updateData(rowSelect)}
                          ></Button>
                          <Button size='small' style={{ border: 'none', }}
                            danger icon={<DeleteOutlined />}
                            onClick={() => {
                              Modal.confirm({
                                content: '消去してもよろしいですか？',
                                okText: 'は　い',
                                cancelText: 'いいえ',
                                onOk: () => this.deleteData(record, index)
                              })
                            }}
                          ></Button>
                        </>
                      )}
                    />
                  </Table>
                </Card>
              </Col>
              <Col span={6}>
                <Card style={styleCard}>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label='　受診日' name={['rowSelect', "ReserveDate"]} >
                        <NumberFormat
                          format="####/##/##"
                          // placeholder="YYYY/MM/DD"
                          mask="_"
                          type='text'
                          getInputRef={this.inputRefReserveDate}
                          style={styleNumberFormat}
                          readOnly={!initParams.OfficeCode || !(dataSource.length > 0)}
                          onChange={(e) => this.handleChangeRecord(e.target.value, 'ReserveDate')}
                          onClick={() => !initParams.OfficeCode && this.ModalError()}
                          onDoubleClick={() => {
                            let props = {
                              Lio_Date: rowSelect?.W1_consult_date,
                              Li_Alone: '',
                            }
                            if (initParams.OfficeCode && dataSource.length > 0)
                              this.callbackOpenModal('WS2577003', props, 'ReserveDate')
                          }}
                          onKeyDown={(e) =>{
                            if(e.key === 'Enter' || e.key === 'Tab'){
                              this.updateData(this.state.rowSelect);
                              // this.inputTimezone.current.focus();
                            }
                          }}
                          onBlur={e => {
                            if (this.state.initParams.OfficeCode && e.target.value) {
                              if (moment(e.target.value, 'YYYY/MM/DD', true).isValid()) {
                                this.handleChangeRecord(e.target.value, 'DateOfBirthChar');
                              } else {
                                this.ModalError('不正な日付です', () => {
                                  this.inputRefReserveDate.current.focus();
                                })
                              }
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} style={{ display: !(rowSelect?.LB_medical_exam_course !== '' || rowSelect?.LC_medical_exam_course !== '') ? '' : 'none' }} >
                      <Form.Item label="承認番号" name={['rowSelect', "W1_association_receipt_num"]}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label='　時間帯' name={['rowSelect', "W1_time_zone"]} >
                        <NumberFormat
                          format="##:##"
                          // placeholder="HH:mm"
                          mask="_"
                          type='text'
                          getInputRef={this.inputTimezone}
                          style={styleNumberFormat}
                          readOnly={!initParams.OfficeCode || !(dataSource.length > 0)}
                          onChange={(e) => this.handleChangeRecord(e.target.value, 'W1_time_zone')}
                          onClick={() => !initParams.OfficeCode && this.ModalError()}
                          onDoubleClick={() => {
                            let props = {
                              Li_Date: rowSelect?.W1_consult_date,
                              Li_FacilityType: rowSelect?.W1_facilities_num,
                              Li_CourseCode: rowSelect?.W1_visits_courses,
                              Li_ProcessDivision: '',
                              Lio_TimeZone: rowSelect?.W1_time_zone,
                            }
                            if (initParams.OfficeCode && dataSource.length > 0)
                              this.callbackOpenModal('WS2553003', props, 'W1_time_zone')
                          }}
                          onBlur={(e) => {
                            let props = {
                              Li_Date: rowSelect?.W1_consult_date,
                              Li_FacilityType: rowSelect?.W1_facilities_num,
                              Li_CourseCode: rowSelect?.W1_visits_courses,
                              Li_ProcessDivision: '',
                              Lio_TimeZone: rowSelect?.W1_time_zone,
                            }
                            if (!this.checkTimeZone(e.target.value) && dataSource.length > 0) {
                              this.callbackOpenModal('WS2553003', props, 'W1_time_zone')
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label='Ｎ次区分' name={['rowSelect', "W1_n_follow_sect"]}>
                        <InputNumber
                          maxLength={1}
                          readOnly={!initParams.OfficeCode || !(dataSource.length > 0)}
                          onClick={() => !initParams.OfficeCode && this.ModalError()}
                          onChange={(value) => this.handleChangeRecord(value, 'W1_n_follow_sect')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label='施設名称' name={['rowSelect', "W1_facilities_num"]} >
                        <Select disabled={!initParams.OfficeCode || !(dataSource.length > 0)}
                          onChange={(value) => this.handleChangeRecord(value, 'W1_facilities_num')}
                        >
                          {rowSelect?.List_W1_facilities_num?.map(value => (
                            <Option key={"W1_facilities_num-" + value.facility_type} value={value.facility_type} >{value.facility_name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label='健診場所' name={['rowSelect', "W1_chkup_location"]}>
                        <Input disabled={!(rowSelect?.conditions_in_out_hospital === 2)} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name={['rowSelect', "short_name"]}>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label='　コース' name={['rowSelect', "W1_visits_courses"]} >
                        <Input.Search
                          maxLength={3}
                          readOnly={!initParams.OfficeCode || !(dataSource.length > 0)}
                          onClick={() => !initParams.OfficeCode && this.ModalError()}
                          onChange={(e) => this.handleChangeRecord(e.target.value?.toLocaleUpperCase(), 'W1_visits_courses')}
                          onBlur={(e) => this.getNameCourseCode(e.target.value?.toLocaleUpperCase(), rowSelect, 'W1_visits_courses')}
                          onSearch={() => {
                            let props = {
                              Li_State: 0,
                              Li_EffectiveLimitedDisplay: 1,
                              Lio_ConsultCourse: rowSelect?.W1_visits_courses,
                              Li_OfficeCode: rowSelect?.W1_office_cd,
                              Li_BranchStoreCode: rowSelect?.W1_branch_store_cd,
                              Li_Date: rowSelect?.W1_consult_date,
                              Li_Gender: rowSelect?.Expresstion_47 === '男性' ? 1 : 2,
                              Li_DateBirth: rowSelect?.birthday_on,
                              Li_Relationship: rowSelect?.relationship,
                              Li_HospitalOut: rowSelect?.conditions_in_out_hospital,
                              Li_Am_Pm: this.returnTimeZone(rowSelect?.W1_time_zone),
                              Li_NTsugikenmi: rowSelect?.W1_n_follow_sect,
                              Li_Other: '',
                              Lio_ContractType: rowSelect?.W1_contract_type,
                              Lio_ContractOrgCode: rowSelect?.W1_contract_org_cd,
                              Lio_ContractStartDate: rowSelect?.W1_contract_date || '0000/00/00',
                              Lio_ContractNum: rowSelect?.W1_contract_num,
                              Lo_Status: '',
                              Lo_ErrorMessage: '',
                            }
                            this.formRef?.current?.getFieldValue('OfficeCode')
                              ? this.callbackOpenModal('WS0289012', props, 'W1_visits_courses')
                              : this.ModalError()
                          }} />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item>
                        <Button
                          size='small'
                          disabled={!rowSelect?.W1_visits_courses}
                          icon={<MoreOutlined />}
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS0605127_ContractLineItemDisplay
                                    Li_ContractType={rowSelect?.W1_contract_type}
                                    Li_ContractOrgCode={rowSelect?.W1_contract_org_cd}
                                    Li_ContractStartDate={rowSelect?.W1_contract_date}
                                    Li_ContractNum={rowSelect?.W1_contract_num}
                                  />
                                ),
                              },
                            });

                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item >
                        <span>{rowSelect?.contract_short_name}</span>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label='　　備考' name={['rowSelect', "W1_remark"]} >
                        <Input
                          onClick={() => !initParams.OfficeCode && this.ModalError()}
                          readOnly={!initParams.OfficeCode || !(dataSource.length > 0)}
                          onChange={(e) => this.handleChangeRecord(e.target.value, 'W1_remark')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="end">
                    <Col span={4}>
                      <div style={styleDivTitle}>保険者</div>
                      <div style={styleDivResult}>{
                        rowSelect?.insurer_total_price === 0 ? null : rowSelect?.insurer_total_price?.toLocaleString()}
                      </div>
                    </Col>
                    <Col span={4}>
                      <div style={styleDivTitle}>事業所</div>
                      <div style={styleDivResult}>{
                        rowSelect?.office_total_price === 0 ? null : rowSelect?.office_total_price?.toLocaleString()}
                      </div>
                    </Col>
                    <Col span={4}>
                      <div style={styleDivTitle}>他団体</div>
                      <div style={styleDivResult}>{
                        rowSelect?.organization_total_price === 0 ? null : rowSelect?.organization_total_price?.toLocaleString()}
                      </div>
                    </Col>
                    <Col span={4}>
                      <div style={styleDivTitle}>個　人</div>
                      <div style={styleDivResult}>{
                        rowSelect?.Expresstion_57 === 0 ? null : rowSelect?.Expresstion_57?.toLocaleString()}
                      </div>
                    </Col>
                    <Col span={4}>
                      <div style={styleDivTitle}>合計</div>
                      <div style={styleDivResult}>{
                        rowSelect?.Expresstion_58 === 0 ? null : rowSelect?.Expresstion_58?.toLocaleString()}
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Card style={styleCard}>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="個人番号" style={{ textAlign: 'right' }}>{rowSelect?.W1_person_num_id}</Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Button
                          size='small'
                          disabled={!rowSelect?.W1_person_num_id}
                          icon={<MoreOutlined />}
                          onClick={() => {
                            let title = '個人情報照会SUB' + ' [' + rowSelect?.W1_person_num_id + ']'
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <Card title={title}>
                                    <WS2584019_PersonalInfoInquirySub Li_PersonalNum={rowSelect?.W1_person_num_id} />
                                  </Card>
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="　　氏名">{rowSelect?.kana_name}</Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24}>
                      <Form.Item label="　　　　">{rowSelect?.kanji_name}</Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={20}>
                      <Form.Item label="　　性別">{rowSelect?.Expresstion_47}</Form.Item>
                      <Form.Item label="生年月日">
                        <Row gutter={10}>
                          <Col span={12}>
                            <span>
                              {moment(rowSelect?.birthday_on).isValid() && rowSelect?.birthday_on
                                ? moment(rowSelect?.birthday_on).format('NNy/MM/DD')
                                : ''
                              }
                            </span>
                          </Col>
                          <Col span={12}>
                            <span>{rowSelect?.Expresstion_50}</span>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item style={{ float: 'right' }} hidden={!rowSelect?.Expresstion_47}>
                        <img src={rowSelect?.Expresstion_47 === '女性' ? GetImage('woman') : GetImage('man')} alt='gender' />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Card style={styleCard}>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="　保険者">{rowSelect?.insurer_kanji_name}</Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="保険記号">{rowSelect?.insurer_card_symbol}</Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="番号">{rowSelect?.insurer_card_number}</Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="　　続柄">{rowSelect?.name}</Form.Item>
                    </Col>
                  </Row>
                </Card>
                {/* footer */}
                <Card>
                  <Form.Item style={{ textAlign: 'right', margin: '7px 0 6px 0' }}>
                    <Button type="primary" onClick={() => {
                      this.state.dataSource.length > 0
                      ? this.eventF12({ list_id: this.state.listSelectedId })
                      : this.ModalError()
                    }}> 確定 </Button>
                  </Form.Item>
                </Card>
              </Col>
            </Row>

          </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2532001_GroupBookings);
