/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";
import { Tooltip, Card, Form, Input, Button, Checkbox, Select, Table, Row, Col, Space, Modal, Dropdown, Menu, InputNumber, Spin, message } from "antd";

import { MoreOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, DoubleRightOutlined, DoubleLeftOutlined, PlusOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';

import WS2542001_PreviousCourseAcquisitionSub from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2542001_PreviousCourseAcquisitionSub.jsx';
import WS2543001_ApplicationInfoRegister from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2543001_ApplicationInfoRegister.jsx';
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS0273001_VisitsTargetSearchQuery from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0273001_VisitsTargetSearchQuery.jsx';
import WS0333001_SetIncludesQuery from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333001_SetIncludesQuery.jsx';
import WS0332001_ContractCourseBreakdownInquiry from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0332001_ContractCourseBreakdownInquiry.jsx';
import WS0311005_MoneyAmountInputSub from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0311005_MoneyAmountInputSub.jsx';
import WS2537046_SetAdd from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537046_SetAdd.jsx';
import WS0381001_PersonalOfficeSearchQuery from "./WS0381001_PersonalOfficeSearchQuery";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0289012_ContractInfoInquiry from "../V5YK0002000_GroupBookings/WS0289012_ContractInfoInquiry";
import WS0306001_ContractInfoMaintain from "pages/BS_BasicInfo/V4KB0201000_ContractInfoMaintain/WS0306001_ContractInfoMaintain";
import WS2708001_SetInfoMaintain from "pages/BS_BasicInfo/V4KB0301000_SetInfoMaintain/WS2708001_SetInfoMaintain";
import WS2537084_InfoHeld from "./WS2537084_InfoHeld";
import WS0650001_DocumentBatchCreateSub from "pages/JZ_AdvancePreparation/V4JZ0102003_DocumentBatchCreate/WS0650001_DocumentBatchCreateSub";
import WS0392005_VisitsSupplementWk from "./WS0392005_VisitsSupplementWk";
import WS2555001_MedicalExamContentsInquirySub from "./WS2555001_MedicalExamContentsInquirySub";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";

import PersonalReserveProcessAction from "redux/ReservationBusiness/PersonalReserveProcess/PersonalReserveProcess.action";

import man from 'assets/img/性別-男性.png';
import woman from 'assets/img/性別-女性.png';
import GetImage from "constants/Images";
import moment from "moment-timezone";
import WS2585001_OfficeInfoInquirySub from "../V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub";
import WS0605127_ContractLineItemDisplay from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay";
import WS2537059_VisitsChangeConfirm from "./WS2537059_VisitsChangeConfirm";
import WS0392004_VisitsSupplement from "./WS0392004_VisitsSupplement";
import Color from "constants/Color";
import WS2577003_CalendarEmptySub from "../V5YK0001000_ReserveStatusSearch/WS2577003_CalendarEmptySub";
import WS2553003_PeriodTimeInquiry from "../V5YK0001000_ReserveStatusSearch/WS2553003_PeriodTimeInquiry";
import PersonalOfficeSearchQueryAction from "redux/ReservationBusiness/PersonalReserveProcess/PersonalOfficeSearchQuery.actions";
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import { getDataContractInfoInquiryAction } from "redux/ReservationBusiness/GroupBookings/ContractInfoInquiry.actions";
import NumberFormat from "react-number-format";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import ModalResizableDraggable from "components/Commons/ModalResizableDraggable";

const { Option } = Select;

const styleHr = {
  color: '#f0f0f0',
  margin: '1em 0',
  opacity: '0.3'
}

const style = {
  label: {
    width: 70,
    paddingRight: 10,
    textAlign: 'right',
    paddingBottom: 5,
    alignSelf: 'center',
    color: '#14468C',
    fontWeight: 'bold'
  },
  input: {
    background: 'transparent',
    border: 'none'
  },

  block: {
    background: '#1c66b9',
    color: '#fff',
    textAlign: 'center'
  }
}


// CHÚ Ý:
// Noted: this screen used custom Button close modal (in line title of Card), 
// please send from Modal parent: className = 'custom-button-close' and params: Li_Child = true
// and after close modal set className: ''

class WS2537001_PersonalReserveProcess extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,         // ReserveNum code - dt0420_inspection_value_results
    Li_PersonalNum: PropTypes.any,        // dt0420_inspection_value_results
    Li_Date: PropTypes.any,
    Li_Getctxname: PropTypes.any,
    Li_ProcessDivision: PropTypes.any,
    Li_Option: PropTypes.any,
    Li_Child: PropTypes.any, // required - value: true

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    // document.title = '個人予約処理';
    this.state = {
      valuePersonalNumber: "",
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      childModalResize: {
        visible: false,
        component: null,
        width: 0,
        height: 0,
      },

      isloadForm: true,
      isLoadingTable: false,

      isLoadingTableSelect: false,
      dataSourceSelect: [],
      selectedRowSelect: [],
      selectedRowKeySelect: [],

      isLoadingTableInspectChange: false,
      dataSourceInspectChange: [],
      selectedRowInspectChange: [],
      selectedRowKeyInspectChange: [],

      FacilityNumHospitaList: [],

      // Row 1: ReserveNu
      ReserveNum: null,
      Expression_99: '新規',
      Expression_100: 211,
      Continuous: false,
      Li_ProcessDivision: 0,
      StateFlag: 0,
      Age: '',

      // Row Personal
      sex: null,
      importance_Personal: null,
      importance_Office: null,
      PersonalNumId: '',
      OfficeCode: '',
      ConsultCourse: null,
      FacilityNumHospital_Out: 0,
      Expression_132: '登録',

      // Table
      Expression_140: 10,
      AddedOrUnnecessary: 0,
      ChangeClassify: false,

      dataScreen: {},
      dataOffice: [],

      dataTax: [],

      Lo_Update: false,

      dataOfficeByPersonal: [],

      isChangeData: false,
      isChangeForm: false,

      changeConsultCourse: false,
      isUnValidConsultCourse: true,
      isUnValidOffice: false,
      nameScreen: '',

      dataPersonal_2543: {},

      function_F12: ''
    };
  }

  // CHÚ Ý:
  // Noted: this screen used custom Button close modal (in line title of Card), 
  // please send from Modal parent: className = 'custom-button-close' and params: Li_Child = true
  // and after close modal set className: ''

  componentDidMount() {
    this.formRef.current.resetFields();
    this.setState({
      dataScreen: {},
      Li_ProcessDivision: this.props.Li_ProcessDivision || 0,
      Continuous: ((this.props.Li_ReserveNum && parseInt(this.props.Li_ReserveNum) > 0)
        || this.props.Li_PersonalNum
        || this.props.Li_Date
        || this.props.Li_ProcessDivision === 1
        || this.props.Li_Getctxname) ? false : true
    })
    this.formRef.current?.setFieldsValue({
      ReserveNum: this.props.Li_ReserveNum ? this.props.Li_ReserveNum : '',
      PersonalNumId: this.props.Li_PersonalNum ? this.props.Li_PersonalNum : null,
      // DateChar: this.props.Li_Date ? this.props.Li_Date : moment(new Date())?.format('YYYY/MM/DD'),
      Continuous: ((this.props.Li_ReserveNum && parseInt(this.props.Li_ReserveNum) > 0)
        || this.props.Li_PersonalNum
        || this.props.Li_Date
        || this.props.Li_ProcessDivision === 1
        || this.props.Li_Getctxname) ? false : true
    })

    this.getDataScreen();
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      await this.setState({
        dataScreen: {},
        Li_ProcessDivision: this.props.Li_ProcessDivision || 0,
        Continuous: ((this.props.Li_ReserveNum && parseInt(this.props.Li_ReserveNum) > 0)
          || this.props.Li_PersonalNum
          || this.props.Li_Date
          || this.props.Li_ProcessDivision === 1
          || this.props.Li_Getctxname) ? false : true
      })
      this.formRef.current?.setFieldsValue({
        ReserveNum: this.props.Li_ReserveNum ? this.props.Li_ReserveNum : '',
        PersonalNumId: this.props.Li_PersonalNum ? this.props.Li_PersonalNum : null,
        // DateChar: this.props.Li_Date ? this.props.Li_Date : moment(new Date())?.format('YYYY/MM/DD'),
        Continuous: ((this.props.Li_ReserveNum && parseInt(this.props.Li_ReserveNum) > 0)
          || this.props.Li_PersonalNum
          || this.props.Li_Date
          || this.props.Li_ProcessDivision === 1
          || this.props.Li_Getctxname) ? false : true
      })

      this.getDataScreen()
    }
  }

  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      // this.props.onFinishScreen({
      //   Lo_Update: this.state.Lo_Update,
      //   nameScreen: 'WS2537001_PersonalReserveProcess'
      // })
    }
  }

  getDataScreen() {
    let params = {
      Li_ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Li_PersonalNum: this.formRef.current?.getFieldValue('PersonalNumId'),
      Li_OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      Li_BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode') || 0,
      Li_ContractType: this.state.dataScreen.ContractType,
      Li_ContractOrgs: this.state.dataScreen.ContractClassifyCode,
      Li_ContractStartDate: this.state.dataScreen.ContractDate,
      Li_ContractNum: this.state.dataScreen.ContractNum,
      Li_Date: this.formRef.current?.getFieldValue('DateChar'),
    }

    this.setState({ isloadForm: true })

    PersonalReserveProcessAction.getDataScreen(params)
      .then(async (res) => {
        await this.setData(res?.data, false)
        this.setState({
          dataPersonal_2543: {}
        })
        this.getDataIndex()
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  changeReserveNum() {
    this.setState({ isloadForm: true })
    let params = {
      Li_ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Li_PersonalNum: this.formRef.current?.getFieldValue('PersonalNumId'),
      Li_OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      Li_BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode') || 0,
      Li_ContractType: this.state.dataScreen.ContractType,
      Li_ContractOrgs: this.state.dataScreen.ContractClassifyCode,
      Li_ContractStartDate: this.state.dataScreen.ContractDate,
      Li_ContractNum: this.state.dataScreen.ContractNum,
      Li_Date: this.formRef.current?.getFieldValue('DateChar'),
      ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Date: this.formRef.current?.getFieldValue('DateChar'),
      TimeZone: this.formRef.current?.getFieldValue('TimeZone'),
      PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId'),
      ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode'),
      FacilityNumHospital_Out: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
      NClassify: this.formRef.current?.getFieldValue('NClassify'),
      MedicalExamLocation: this.formRef.current?.getFieldValue('MedicalExamLocation'),
      Remarks: this.formRef.current?.getFieldValue('Remarks'),
      Continuous: this.formRef.current?.getFieldValue('Continuous') ? 1 : 0,
      ChangeClassify: this.formRef.current?.getFieldValue('ChangeClassify') ? 1 : 0,
      AddedOrUnnecessary: this.formRef.current?.getFieldValue('AddedOrUnnecessary'),

      StateFlag: this.state.dataScreen.StateFlag,
      AcceptNum: this.state.dataScreen.AcceptNum,
      Am_PmDivision: this.state.dataScreen.Am_PmDivision,
      OtherCondition: this.state.dataScreen.OtherCondition,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      KyokaiBillingDate: this.state.dataScreen.KyokaiBillingDate,
      KyokaiAcceptNum: this.state.dataScreen.KyokaiAcceptNum,
      InfoHoldingOp: this.state.dataScreen.InfoHoldingOp,
      InsurerModify: this.state.dataScreen.InsurerModify,
      OfficeModify: this.state.dataScreen.OfficeModify,
      OtherGroupModify: this.state.dataScreen.OtherGroupModify,
      Personal1Modify: this.state.dataScreen.Personal1Modify,
      Person2Modify: this.state.dataScreen.Person2Modify,
      Personal3Modify: this.state.dataScreen.Personal3Modify,
      ContractInfo: this.state.dataScreen.ContractInfo,
      JInspectGCategory: this.state.dataScreen.JInspectGCategory,
      NonDisplaySetContract: this.state.dataScreen.NonDisplaySetContract,
      NonDisplaySetAdd: this.state.dataScreen.NonDisplaySetAdd,
      ApplicationAttributeReDisplay: this.state.dataScreen.ApplicationAttributeReDisplay,
      StsOption: this.state.dataScreen.StsOption ? 1 : 0,
      AddedOrUnnecessaryList: this.state.dataScreen.AddedOrUnnecessaryList,
      Mode: this.state.dataScreen.Mode,
      DisplayContent: this.state.dataScreen.DisplayContent,
      StsPersonalInfoBasic: this.state.dataScreen.StsPersonalInfoBasic ? 1 : 0,
      StsContractInquiry: this.state.dataScreen.StsContractInquiry,
      StsFreeNum: this.state.dataScreen.StsFreeNum,
      FreeNumErrorTarget: this.state.dataScreen.FreeNumErrorTarget,
      ProcessNum: this.state.dataScreen.ProcessNum,
      StsReserveStatus: this.state.dataScreen.StsReserveStatus,
      OneOClockTotalAmount: this.state.dataScreen.OneOClockTotalAmount,
      StsInspectChange: this.state.dataScreen.StsInspectChange ? 1 : 0,
      ContractQueryErrorMessage: this.state.dataScreen.ContractQueryErrorMessage,
      Age: this.state.Age,
      LockState: this.state.dataScreen.LockState,
      LimitErrorMessage: this.state.dataScreen.LimitErrorMessage,
      Li_ProcessDivision: this.state.Li_ProcessDivision,
      Li_Option: this.props.Li_Option
    }

    PersonalReserveProcessAction.changeReserveNum(params)
      .then(async res => {
        await this.setData(res?.data, false)
        this.setState({

          dataPersonal_2543: {}

        })
        
        this.getDataIndex()
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });

      // PersonalReserveProcessAction.changeReserveNum(params)
      // .then(async res => {
      //   await this.setData(res?.data, false)
      //   this.setState({
      //     dataPersonal_2543: {}
      //   })
      //   this.getDataIndex()
      // })
      // .catch((err) => {
      //   this.setState({ isloadForm: false })
      //   const res = err.response;
      //   if (!res || !res.data || !res.data.message) {
      //     message.error("エラーが発生しました");
      //     return;
      //   }
      //   message.error(res.data.message);
      // });
  }

  getDataIndex() {
    this.setState({ isloadForm: true })
    let params = {
      Li_ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Li_PersonalNum: this.formRef.current?.getFieldValue('PersonalNumId'),
      Li_OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      Li_BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode') || 0,
      Li_ContractType: this.state.dataScreen.ContractType,
      Li_ContractOrgs: this.state.dataScreen.ContractClassifyCode,
      Li_ContractStartDate: this.state.dataScreen.ContractDate,
      Li_ContractNum: this.state.dataScreen.ContractNum,
      Li_Date: this.formRef.current?.getFieldValue('DateChar'),
      ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Date: this.formRef.current?.getFieldValue('DateChar'),
      TimeZone: this.formRef.current?.getFieldValue('TimeZone'),
      PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId'),
      ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode'),
      FacilityNumHospital_Out: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
      NClassify: this.formRef.current?.getFieldValue('NClassify'),
      MedicalExamLocation: this.formRef.current?.getFieldValue('MedicalExamLocation'),
      Remarks: this.formRef.current?.getFieldValue('Remarks'),
      Continuous: this.formRef.current?.getFieldValue('Continuous') ? 1 : 0,
      ChangeClassify: this.formRef.current?.getFieldValue('ChangeClassify') ? 1 : 0,
      AddedOrUnnecessary: this.formRef.current?.getFieldValue('AddedOrUnnecessary'),

      StateFlag: this.state.dataScreen.StateFlag,
      AcceptNum: this.state.dataScreen.AcceptNum,
      Am_PmDivision: this.state.dataScreen.Am_PmDivision,
      OtherCondition: this.state.dataScreen.OtherCondition,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      KyokaiBillingDate: this.state.dataScreen.KyokaiBillingDate,
      KyokaiAcceptNum: this.state.dataScreen.KyokaiAcceptNum,
      InfoHoldingOp: this.state.dataScreen.InfoHoldingOp,
      InsurerModify: this.state.dataScreen.InsurerModify,
      OfficeModify: this.state.dataScreen.OfficeModify,
      OtherGroupModify: this.state.dataScreen.OtherGroupModify,
      Personal1Modify: this.state.dataScreen.Personal1Modify,
      Person2Modify: this.state.dataScreen.Person2Modify,
      Personal3Modify: this.state.dataScreen.Personal3Modify,
      ContractInfo: this.state.dataScreen.ContractInfo,
      JInspectGCategory: this.state.dataScreen.JInspectGCategory,
      NonDisplaySetContract: this.state.dataScreen.NonDisplaySetContract,
      NonDisplaySetAdd: this.state.dataScreen.NonDisplaySetAdd,
      ApplicationAttributeReDisplay: this.state.dataScreen.ApplicationAttributeReDisplay,
      StsOption: this.state.dataScreen.StsOption ? 1 : 0,
      AddedOrUnnecessaryList: this.state.dataScreen.AddedOrUnnecessaryList,
      Mode: this.state.dataScreen.Mode,
      DisplayContent: this.state.dataScreen.DisplayContent,
      StsPersonalInfoBasic: this.state.dataScreen.StsPersonalInfoBasic ? 1 : 0,
      StsContractInquiry: this.state.dataScreen.StsContractInquiry,
      StsFreeNum: this.state.dataScreen.StsFreeNum,
      FreeNumErrorTarget: this.state.dataScreen.FreeNumErrorTarget,
      ProcessNum: this.state.dataScreen.ProcessNum,
      StsReserveStatus: this.state.dataScreen.StsReserveStatus,
      OneOClockTotalAmount: this.state.dataScreen.OneOClockTotalAmount,
      StsInspectChange: this.state.dataScreen.StsInspectChange ? 1 : 0,
      ContractQueryErrorMessage: this.state.dataScreen.ContractQueryErrorMessage,
      Age: this.state.Age,
      LockState: this.state.dataScreen.LockState,
      LimitErrorMessage: this.state.dataScreen.LimitErrorMessage,
      Li_ProcessDivision: this.state.Li_ProcessDivision,
      Li_Option: this.props.Li_Option
    }

    PersonalReserveProcessAction.getDataIndex(params)
      .then(res => {
        this.setData(res?.data, true)
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  setData(data, getTable) {
    this.setState({
      Age: data ? data.Age : '',

      Expression_99: data ? data.Expression_99 : '新規',
      Expression_100: data ? data.Expression_100 : 211,
      isChangeData: false,
      isChangeForm: false
    })

    data.TimeZone = data.TimeZone ? data.TimeZone.substr(0, 5) : '08:30'
    data.TimeZoneCopy = data.TimeZone ? data.TimeZone.substr(0, 5) : '08:30'
    data.Date = data.Date ? moment(data.Date)?.format('YYYY/MM/DD') : moment(new Date())?.format('YYYY/MM/DD')
    data.DateChar = data.Date ? moment(data.Date)?.format('YYYY/MM/DD') : moment(new Date())?.format('YYYY/MM/DD')
    data.Expression_80 = data.Expression_80 ? moment(data.Expression_80)?.format("NNy/MM/DD") : null
    data.Age = data.Age === 0 ? '' : (data.Age + '歳')
    data.BranchStoreCode = data.BranchStoreCode === 0 ? '' : data.BranchStoreCode
    data.KyokaiAcceptNum = data.KyokaiAcceptNum === 0 ? '' : data.KyokaiAcceptNum
    data.NClassify = data.NClassify === 0 ? '' : data.NClassify
    data.Expression_170 = data.Expression_170 === 0 ? '' : data.Expression_170?.toLocaleString()
    data.Expression_171 = data.Expression_171 === 0 ? '' : data.Expression_171?.toLocaleString()
    data.Expression_172 = data.Expression_172 === 0 ? '' : data.Expression_172?.toLocaleString()
    data.Expression_173 = data.Expression_173 === 0 ? '' : data.Expression_173?.toLocaleString()
    data.Expression_174 = data.Expression_174 === 0 ? '' : data.Expression_174?.toLocaleString()

    this.formRef.current?.setFieldsValue({
      ReserveNum: data.ReserveNum > 0 ? data.ReserveNum : '',
      PersonalNumId: data.PersonalNumId,
      Expression_88: data.Expression_88,
      Expression_75: data.Expression_75,
      Expression_76: data.Expression_76,
      Expression_78: data.Expression_78,
      Expression_80: data.Expression_80,
      Age: data.Age,
      Expression_79: data.Expression_79,
      OfficeCode: data.OfficeCode,
      BranchStoreCode: data.BranchStoreCode,
      Expression_89: data.Expression_89,
      office_kanji_name: data.office_kanji_name,
      ConsultCourse: data.ConsultCourse,
      Expression_118: data.Expression_118,
      DateChar: data.DateChar,
      Expression_131: data.Expression_131,
      KyokaiAcceptNum: data.KyokaiAcceptNum,
      TimeZone: data.TimeZone,
      TimeZoneCopy: data.TimeZone,
      NClassify: data.NClassify,
      FacilityNumHospital_Out: data.FacilityNumHospital_Out,
      MedicalExamLocation: data.MedicalExamLocation,
      short_name: data.short_name,
      Remarks: data.Remarks,
      Expression_170: data.Expression_170,
      Expression_171: data.Expression_171,
      Expression_172: data.Expression_172,
      Expression_173: data.Expression_173,
      Expression_174: data.Expression_174,
      AddedOrUnnecessary: data.AddedOrUnnecessary,
      ChangeClassify: data.ChangeClassify,
      SearchChar: ''
    })

    this.setState({
      StateFlag: data.StateFlag,
      ReserveNum: data.ReserveNum > 0 ? data.ReserveNum : '',

      FacilityNumHospitaList: data.FacilityNumHospitaList,

      sex: data.Expression_79,
      PersonalNumId: data.PersonalNumId,
      importance_Personal: data.Expression_88,
      OfficeCode: data.OfficeCode,
      importance_Office: data.Expression_89,
      ConsultCourse: data.ConsultCourse,
      FacilityNumHospital_Out: data.FacilityNumHospitaList?.length > 0 ? data.FacilityNumHospitaList[0].LinkedField : '',

      Expression_140: data.Expression_140,
      AddedOrUnnecessary: data.AddedOrUnnecessary,
      ChangeClassify: data.ChangeClassify,

      dataScreen: data,
      dataTax: [],

      isUnValidConsultCourse: data.ConsultCourse ? false : true
    })

    if (getTable) {
      this.getListOfficeByPersonal()
      this.getDataTableInspectChange()
    }
  }

  getDataTableLeft() {
    if (this.formRef.current?.getFieldValue('ChangeClassify')) {
      this.getDataTableInspectSelect()
    } else {
      if (this.formRef.current?.getFieldValue('AddedOrUnnecessary') === 2) {
        this.getDataTableSelectOptions()
      } else {
        this.getDataTableSetSelect()
      }
    }
  }

  getDataTableSetSelect() {
    let params = {
      Li_SearchChar: this.formRef.current?.getFieldValue('SearchChar'),
      Li_AddedOrDeleted: this.formRef.current?.getFieldValue('AddedOrUnnecessary')
    }

    this.setState({ isLoadingTableSelect: true })
    PersonalReserveProcessAction.getDataSetSelect(params)
      .then((res) => {
        this.setState({
          isLoadingTableSelect: false,
          dataSourceSelect: res ? res : [],
          selectedRowSelect: res && res.lenght > 0 ? [res[0]] : [],
          selectedRowKeySelect: res && res.lenght > 0 ? [res[0].id] : [],
          isloadForm: false,
          isLoadingTable: false
        })
      })
      .finally(() => this.setState({
        isLoadingTableSelect: false,
        isloadForm: false,
        isLoadingTable: false
      }))
  }

  getDataTableInspectSelect() {
    let params = {
      Li_Pattern: this.state.dataScreen.PatternCode,
      Li_SearchChar: this.formRef.current?.getFieldValue('SearchChar'),
      Li_AddedOrDeleted: this.formRef.current?.getFieldValue('AddedOrUnnecessary') === 2 ? 0 : this.formRef.current?.getFieldValue('AddedOrUnnecessary'),
      ChangeClassify: this.formRef.current?.getFieldValue('ChangeClassify')
    }

    this.setState({ isLoadingTableSelect: true })
    PersonalReserveProcessAction.getDataInspectSelect(params)
      .then(async (res) => {
        let index = res?.ComboBox_AddedOrUnnecessary.findIndex(x => x.LinkedField === this.state.AddedOrUnnecessary)

        let Expression_140 = index === -1 ? (res?.ComboBox_AddedOrUnnecessary[0].LinkedField === 2 ? 40
          : res?.ComboBox_AddedOrUnnecessary[0].LinkedField === 0 ? 20
            : res?.ComboBox_AddedOrUnnecessary[0].LinkedField === 1 ? 30
              : null) : this.state.Expression_140

        let AddedOrUnnecessary = index === -1 ? res?.ComboBox_AddedOrUnnecessary[0].LinkedField : this.state.AddedOrUnnecessary
        let data = {
          ...this.state.dataScreen,
          ComboBox_AddedOrUnnecessary: res?.ComboBox_AddedOrUnnecessary,
        }

        await this.setState({
          dataScreen: data,
          Expression_140: Expression_140,
          AddedOrUnnecessary: AddedOrUnnecessary,

          isLoadingTableSelect: false,
          dataSourceSelect: res ? res.data : [],
          selectedRowSelect: res && res.data.lenght > 0 ? [res.data[0]] : [],
          selectedRowKeySelect: res && res.data.lenght > 0 ? [res.data[0].id] : [],
          isloadForm: false
        })

        this.formRef.current?.setFieldsValue({
          Expression_140: Expression_140,
          AddedOrUnnecessary: AddedOrUnnecessary
        })
      })
      .finally(() => this.setState({
        isLoadingTableSelect: false,
        isloadForm: false,
        isLoadingTable: false
      }))
  }

  getDataTableSelectOptions() {
    let params = {
      Li_ContractType: this.state.dataScreen.ContractType,
      Li_ContractOrgs: this.state.dataScreen.ContractClassifyCode,
      Li_ContractStartDate: this.state.dataScreen.ContractDate,
      Li_ContractNum: this.state.dataScreen.ContractNum,
      Li_SearchChar: this.formRef.current?.getFieldValue('SearchChar'),
      Li_AddedOrDeleted: this.formRef.current?.getFieldValue('AddedOrUnnecessary')
    }

    this.setState({ isLoadingTableSelect: true })
    PersonalReserveProcessAction.getDataSelectOptions(params)
      .then((res) => {
        this.setState({
          isLoadingTableSelect: false,
          dataSourceSelect: res ? res : [],
          selectedRowSelect: res && res.lenght > 0 ? [res[0]] : [],
          selectedRowKeySelect: res && res.lenght > 0 ? [res[0].id] : [],
          isloadForm: false,
          isLoadingTable: false
        })
      })
      .finally(() => this.setState({
        isLoadingTableSelect: false,
        isloadForm: false,
        isLoadingTable: false
      }))
  }

  getDataTableInspectChange() {
    let params = {
      Li_ContractType: this.state.dataScreen.ContractType,
      Li_ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      Li_ContractDate: this.state.dataScreen.ContractDate,
      Li_ContractNum: this.state.dataScreen.ContractNum,
    }
    this.setState({ isLoadingTableInspectChange: true })
    PersonalReserveProcessAction.getDataInspectChange(params)
      .then((res) => {
        this.setState({
          isLoadingTableInspectChange: false,
          dataSourceInspectChange: res ? res : [],
          selectedRowInspectChange: res && res.lenght > 0 ? [res[0]] : [],
          selectedRowKeyInspectChange: res && res.lenght > 0 ? [res[0].id] : []
        })
        this.getDataTableLeft()
      })
      .finally(() => this.setState({ isLoadingTableInspectChange: false }))
  }

  setChange(payActive, record, changeType, Personal3Modify) {
    let params = {
      Li_Payer: payActive,
      Li_ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Li_SetCode: record.set_code ? record.set_code : '',
      Li_ChangeTypeClassify: changeType,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      Date: this.state.dataScreen.Date,
      InsurerModify: this.state.dataScreen.InsurerModify,
      OfficeModify: this.state.dataScreen.OfficeModify,
      OtherGroupModify: this.state.dataScreen.OtherGroupModify,
      Personal1Modify: this.state.dataScreen.Personal1Modify,
      Person2Modify: this.state.dataScreen.Person2Modify,
      Personal3Modify: this.state.dataScreen.Personal3Modify,
      // Personal3Modify: this.state.AddedOrUnnecessary === 2 ? Personal3Modify : this.state.dataScreen.Personal3Modify,
    }

    PersonalReserveProcessAction.setChange(params)
      .then((res) => {
        this.getDataTableInspectChange()
        let data = {
          ...this.state.dataScreen,
          StsInspectChange: 1
        }
        this.setState({
          isChangeData: true,
          dataScreen: data
        })
      })
  }

  setDelete(record) {
    let params = {
      Li_ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      W2_change_type: record.W2_change_type,
      W2_set_inspect_cd: record.W2_set_inspect_cd,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      Date: this.state.dataScreen.Date,
      InsurerModify: this.state.dataScreen.InsurerModify,
      OfficeModify: this.state.dataScreen.OfficeModify,
      OtherGroupModify: this.state.dataScreen.OtherGroupModify,
      Personal1Modify: this.state.dataScreen.Personal1Modify,
      Person2Modify: this.state.dataScreen.Person2Modify,
      Personal3Modify: this.state.dataScreen.Personal3Modify,
    }

    PersonalReserveProcessAction.setDelete(params)
      .then((res) => {
        // this.getDataTableLeft()
        this.getDataTableInspectChange()
        let data = {
          ...this.state.dataScreen,
          StsInspectChange: 1
        }
        this.setState({
          isChangeData: true,
          dataScreen: data
        })
      })
  }

  contractRedisplay() {
    let params = {
      ...this.state.dataScreen,
      Li_PersonalNum: this.formRef.current?.getFieldValue('PersonalNumId'),
      Li_ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Li_ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
      Li_Date: this.formRef.current?.getFieldValue('DateChar'),
      Li_TimeZone: this.formRef.current?.getFieldValue('TimeZone'),
      Li_OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      Li_BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode') || 0,
      Li_FacilityNumHospital_Out: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
      Li_NClassify: this.formRef.current?.getFieldValue('NClassify'),
      Li_StsOption: this.state.dataScreen.StsOption,
      Li_ChangeClassify: this.formRef.current?.getFieldValue('ChangeClassify'),
      ...this.formRef.current?.getFieldValue(),
      TimeZone: this.formRef.current?.getFieldValue('TimeZone'),
    }

    this.setState({ isLoadingTable: true })

    PersonalReserveProcessAction.contractRedisplay(params)
      .then(async (res) => {
        let Expression_140 = res?.data?.ComboBox_AddedOrUnnecessary[0].LinkedField === 2 ? 40
          : res?.data?.ComboBox_AddedOrUnnecessary[0].LinkedField === 0 ? 20
            : res?.data?.ComboBox_AddedOrUnnecessary[0].LinkedField === 1 ? 30
              : null
        let data = {
          ...this.state.dataScreen,
          StsReserveChange: res?.data?.StsReserveChange,
          StsCourseWarning: res?.data?.StsCourseWarning,
          ContractInfo: res?.data?.ContractInfo,
          ComboBox_AddedOrUnnecessary: res?.data?.ComboBox_AddedOrUnnecessary,
          OneOClockTotalAmount: res?.data?.OneOClockTotalAmount,
        }

        await this.setState({
          dataScreen: data,
          Expression_140: Expression_140,
          AddedOrUnnecessary: res?.data?.ComboBox_AddedOrUnnecessary[0].LinkedField,
          isChangeForm: true,
        })

        this.formRef.current?.setFieldsValue({
          Expression_118: res?.data?.Expression_118,
          Expression_140: Expression_140,
          AddedOrUnnecessary: res?.data?.ComboBox_AddedOrUnnecessary[0].LinkedField
        })

        this.getDataIndex()
        this.getDataTableInspectChange()
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  ConfirmProcessBtn_F12() {
    if (!this.formRef.current?.getFieldValue('ConsultCourse') || this.state.isUnValidConsultCourse) {
      this.showModalContractInfoInquiry(true)
    } else {
      if (this.state.isUnValidOffice) {
        if (this.state.PersonalNumId) {
          this.showModalPersonalOfficeSearchQuery_WS0381001()
        } else {
          this.showModalOfficeInfoRetrievalQuery_WS0247001()
        }
      } else {
        this.ConfirmProcessBtn_F12_After()
      }
    }
  }

  ConfirmProcessBtn_F12_After() {
    let params = {
      PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId'),
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode'),
      FacilityNumHospital_Out: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
      MedicalExamLocation: this.formRef.current?.getFieldValue('MedicalExamLocation'),
      ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
      Date: this.formRef.current?.getFieldValue('DateChar'),
      NClassify: this.formRef.current?.getFieldValue('NClassify'),
      ChangeClassify: this.formRef.current?.getFieldValue('ChangeClassify') ? 1 : 0,
      AddedOrUnnecessary: this.formRef.current?.getFieldValue('AddedOrUnnecessary'),
      ApplicationAttributeReDisplay: this.state.dataScreen.ApplicationAttributeReDisplay,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      OneOClockTotalAmount: this.state.dataScreen.OneOClockTotalAmount,
      StsInspectChange: this.state.dataScreen.StsInspectChange ? 1 : 0,
      Am_PmDivision: this.state.dataScreen.Am_PmDivision,
      OtherCondition: this.state.dataScreen.OtherCondition,
      StsContractInquiry: this.state.dataScreen.StsContractInquiry,
      ContractQueryErrorMessage: this.state.dataScreen.ContractQueryErrorMessage,
      ContractInfo: this.state.dataScreen.ContractInfo,
      InsurerModify: this.state.dataScreen.InsurerModify,
      OfficeModify: this.state.dataScreen.OfficeModify,
      OtherGroupModify: this.state.dataScreen.OtherGroupModify,
      Personal1Modify: this.state.dataScreen.Personal1Modify,
      Person2Modify: this.state.dataScreen.Person2Modify,
      Personal3Modify: this.state.dataScreen.Personal3Modify,
      NonDisplaySetContract: this.state.dataScreen.NonDisplaySetContract,
      NonDisplaySetAdd: this.state.dataScreen.NonDisplaySetAdd,
      StsOption: this.state.dataScreen.StsOption ? 1 : 0,
      AddedOrUnnecessaryList: this.state.dataScreen.AddedOrUnnecessaryList,
      JInspectGCategory: this.state.dataScreen.JInspectGCategory,
      Age: this.state.Age,
      LockState: this.state.dataScreen.LockState,
      LimitErrorMessage: this.state.dataScreen.LimitErrorMessage,
      Li_ProcessDivision: this.state.Li_ProcessDivision,
      StsReserveChange: this.state.dataScreen.StsReserveChange ? 1 : 0,
      StateFlag: this.state.dataScreen.StateFlag,
      StateRe: this.state.dataScreen.StateRe,
    }

    this.setState({ isloadForm: true })
    PersonalReserveProcessAction.ConfirmProcessBtn_F12(params)
      .then(async (res) => {
        let message = res?.data?.message
        let data = {
          ...this.state.dataScreen,
          ...res?.data
        }
        await this.setState({
          dataScreen: data,
          function_F12: res?.data.function
        })

        if (message === 'WS2537059_VisitsChangeConfirm') {
          this.showModalVisitChangeConfirm()
        } else {
          if (res?.data?.warning) {
            Modal.warning({
              title: res?.data?.warning,
              width: 350,
              onOk: () => {
                this.showModalConfirm()
              }
            })
          } else {
            this.showModalConfirm()
          }
        }
        this.setState({ isloadForm: false })
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  showModalConfirm() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 350,
        component: (
          <WS0061015_CheckYesNoNo
            Li_Message={(this.formRef.current?.getFieldValue("ReserveNum") === 0 || !this.formRef.current?.getFieldValue("ReserveNum")) ? 'この内容で予約しますか？' : 'この内容に変更しますか？'}
            onFinishScreen={({ Lio_StsReturn }) => {
              if (Lio_StsReturn) {
                if (this.formRef.current?.getFieldValue('Expression_75')) {
                  if (this.formRef.current?.getFieldValue('OfficeCode')) {
                    if (this.checkOfficeCode()) {
                      if (this.formRef.current?.getFieldValue('DateChar')) {
                        if (this.state.function_F12 === 'NewReceptConfirmed') {
                          this.NewReceptConfirmed()
                        }

                        if (this.state.function_F12 === 'NewConfirm') {
                          this.NewConfirm()
                        }
                        if (this.state.function_F12 === 'AcceptChangeConfirm') {
                          this.AcceptChangeConfirm()
                        }

                        if (this.state.function_F12 === 'ReserveChangeConfirm') {
                          this.ReserveChangeConfirm()
                        }
                      } else {
                        Modal.error({
                          title: '受診日を入力してください',
                          width: 300,
                        })
                      }
                    } else {
                      Modal.error({
                        width: '425px',
                        title: "指定の事業所ｺｰﾄﾞは所属情報に存在しません",
                      });
                    }
                  } else {
                    Modal.error({
                      width: '330px',
                      title: "事業所ｺｰﾄﾞを入力してください",
                    });
                  }
                } else {
                  Modal.error({
                    width: '330px',
                    title: "カナ氏名を入力してください",
                  });
                }
              } else {
                this.returnModal()
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  showModalVisitChangeConfirm() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component: (
          <WS2537059_VisitsChangeConfirm
            Li_CourseLevel={this.state.dataScreen.variables.Li_CourseLevel}
            Li_ReserveNum={this.formRef.current?.getFieldValue("ReserveNum")}
            Li_PersonalNumId={this.formRef.current?.getFieldValue("PersonalNumId")}
            Li_KanaName={this.formRef.current?.getFieldValue("Expression_75")}
            Li_KanjiName={this.formRef.current?.getFieldValue("Expression_76")}
            Li_DateBirth={this.formRef.current?.getFieldValue("Expression_80")}
            Li_Gender={this.formRef.current?.getFieldValue("Expression_79")}
            Li_Date={this.formRef.current?.getFieldValue("DateChar") ? moment(this.formRef.current?.getFieldValue("DateChar")).format('YYYY/MM/DD') : ''}
            Li_FacilityNum={this.formRef.current?.getFieldValue("FacilityNumHospital_Out")}
            Li_TimeZone={this.formRef.current?.getFieldValue("TimeZone")}
            Li_Am_PmDivision={this.state.dataScreen.Am_PmDivision}
            Li_NClassify={this.formRef.current?.getFieldValue("NClassify")}
            Li_OtherCondition={this.state.dataScreen.OtherCondition}
            Li_ConsultCourse={this.formRef.current?.getFieldValue("ConsultCourse")}
            Li_ContractAbbreviation={this.formRef.current?.getFieldValue("Expression_118")}
            Li_MedicalExamLocation={this.formRef.current?.getFieldValue("MedicalExamLocation")}
            Li_Remarks={this.formRef.current?.getFieldValue("Remarks")}
            Lo_AcceptNum={this.state.dataScreen.AcceptNum}
            onFinishScreen={async (output) => {
              if (output.Lo_AcceptExec) {
                let data = {
                  ...this.state.dataScreen,
                  AcceptNum: output.Lo_AcceptNum
                }
                await this.setState({
                  dataScreen: data
                })
                // this.updateData()

                if (this.state.function_F12 === 'NewReceptConfirmed') {
                  this.NewReceptConfirmed()
                }

                if (this.state.function_F12 === 'NewConfirm') {
                  this.NewConfirm()
                }
                if (this.state.function_F12 === 'AcceptChangeConfirm') {
                  this.AcceptChangeConfirm()
                }

                if (this.state.function_F12 === 'ReserveChangeConfirm') {
                  this.ReserveChangeConfirm()
                }
              } else {
                await this.setState({
                  isloadForm: false,
                  Lo_Update: false,
                  isChangeData: false,
                  isChangeForm: false
                })

                this.returnModal()
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  NewReceptConfirmed() {
    let params = {
      ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Date: this.formRef.current?.getFieldValue('DateChar'),
      TimeZone: this.formRef.current?.getFieldValue('TimeZone'),
      PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId'),
      ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode'),
      FacilityNumHospital_Out: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
      NClassify: this.formRef.current?.getFieldValue('NClassify'),
      MedicalExamLocation: this.formRef.current?.getFieldValue('MedicalExamLocation'),
      Remarks: this.formRef.current?.getFieldValue('Remarks'),
      Continuous: this.formRef.current?.getFieldValue('Continuous') ? 1 : 0,
      ChangeClassify: this.formRef.current?.getFieldValue('ChangeClassify') ? 1 : 0,
      AddedOrUnnecessary: this.formRef.current?.getFieldValue('AddedOrUnnecessary'),
      Mode: this.state.dataScreen.Mode,
      DisplayContent: this.state.dataScreen.DisplayContent,
      OtherCondition: this.state.dataScreen.OtherCondition,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      StsPersonalInfoBasic: this.state.dataScreen.StsPersonalInfoBasic ? 1 : 0,
      personalbasic: this.state.dataScreen.personalbasic,
      w2ApplicationAttribute1: this.state.dataScreen.w2ApplicationAttribute1,
      personalbelong: this.state.dataScreen.personalbelong,
      StsContractInquiry: this.state.dataScreen.StsContractInquiry,
      StsFreeNum: this.state.dataScreen.StsFreeNum,
      FreeNumErrorTarget: this.state.dataScreen.FreeNumErrorTarget,
      Am_PmDivision: this.state.dataScreen.Am_PmDivision,
      ProcessNum: this.state.dataScreen.ProcessNum,
      AcceptNum: this.state.dataScreen.AcceptNum,
      KyokaiBillingDate: this.state.dataScreen.KyokaiBillingDate,
      KyokaiAcceptNum: this.state.dataScreen.KyokaiAcceptNum,
      StsReserveStatus: this.state.dataScreen.StsReserveStatus,
      InfoHoldingOp: this.state.dataScreen.InfoHoldingOp,
      StateFlag: this.state.dataScreen.StateFlag,
      contractterm: this.state.dataScreen.contractterm,
      InsurerModify: this.state.dataScreen.InsurerModify,
      OfficeModify: this.state.dataScreen.OfficeModify,
      OtherGroupModify: this.state.dataScreen.OtherGroupModify,
      Personal1Modify: this.state.dataScreen.Personal1Modify,
      Person2Modify: this.state.dataScreen.Person2Modify,
      Personal3Modify: this.state.dataScreen.Personal3Modify,
      JInspectGCategory: this.state.dataScreen.JInspectGCategory,
      ApplicationAttributeReDisplay: this.state.dataScreen.ApplicationAttributeReDisplay,
      OneOClockTotalAmount: this.state.dataScreen.OneOClockTotalAmount,
      StsInspectChange: this.state.dataScreen.StsInspectChange ? 1 : 0,
      ContractQueryErrorMessage: this.state.dataScreen.ContractQueryErrorMessage,
      ContractInfo: this.state.dataScreen.ContractInfo,
      NonDisplaySetContract: this.state.dataScreen.NonDisplaySetContract,
      NonDisplaySetAdd: this.state.dataScreen.NonDisplaySetAdd,
      StsOption: this.state.dataScreen.StsOption ? 1 : 0,
      AddedOrUnnecessaryList: this.state.dataScreen.AddedOrUnnecessaryList,
      Age: this.state.Age,
      LockState: this.state.dataScreen.LockState,
      LimitErrorMessage: this.state.dataScreen.LimitErrorMessage,
      StsReserveChange: this.state.dataScreen.StsReserveChange,
      Li_ProcessDivision: this.state.Li_ProcessDivision,
    }

    this.setState({ isloadForm: true })
    PersonalReserveProcessAction.newReceptConfirmed(params)
      .then(async res => {
        let data = {
          ...this.state.dataScreen,
          OneOClockTotalAmount: res?.data?.OneOClockTotalAmount,
        }

        await this.setState({
          Lo_Update: true,
          isChangeData: false,
          isChangeForm: false,

          dataScreen: data,
        })

        if (this.formRef.current?.getFieldValue('ReserveNum')) {
          this.getDataIndex()
        } else {
          if (res?.data?.ReserveNum) {
            this.formRef.current?.setFieldsValue({
              ReserveNum: res?.data?.ReserveNum
            })
          }
          this.changeReserveNum()
        }
        this.returnModal()
      })
      .catch((err) => {
        this.setState({
          isloadForm: false,
          Lo_Update: false,
        })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  NewConfirm() {
    let params = {
      ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Date: this.formRef.current?.getFieldValue('DateChar'),
      TimeZone: this.formRef.current?.getFieldValue('TimeZone'),
      PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId'),
      ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode'),
      FacilityNumHospital_Out: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
      NClassify: this.formRef.current?.getFieldValue('NClassify'),
      MedicalExamLocation: this.formRef.current?.getFieldValue('MedicalExamLocation'),
      Remarks: this.formRef.current?.getFieldValue('Remarks'),
      Continuous: this.formRef.current?.getFieldValue('Continuous') ? 1 : 0,
      ChangeClassify: this.formRef.current?.getFieldValue('ChangeClassify') ? 1 : 0,
      AddedOrUnnecessary: this.formRef.current?.getFieldValue('AddedOrUnnecessary'),
      Mode: this.state.dataScreen.Mode,
      DisplayContent: this.state.dataScreen.DisplayContent,
      OtherCondition: this.state.dataScreen.OtherCondition,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      StsPersonalInfoBasic: this.state.dataScreen.StsPersonalInfoBasic ? 1 : 0,
      personalbasic: this.state.dataScreen.personalbasic,
      w2ApplicationAttribute1: this.state.dataScreen.w2ApplicationAttribute1,
      personalbelong: this.state.dataScreen.personalbelong,
      StsContractInquiry: this.state.dataScreen.StsContractInquiry,
      StsFreeNum: this.state.dataScreen.StsFreeNum,
      FreeNumErrorTarget: this.state.dataScreen.FreeNumErrorTarget,
      Am_PmDivision: this.state.dataScreen.Am_PmDivision,
      ProcessNum: this.state.dataScreen.ProcessNum,
      AcceptNum: this.state.dataScreen.AcceptNum,
      KyokaiBillingDate: this.state.dataScreen.KyokaiBillingDate,
      KyokaiAcceptNum: this.state.dataScreen.KyokaiAcceptNum,
      StsReserveStatus: this.state.dataScreen.StsReserveStatus,
      InfoHoldingOp: this.state.dataScreen.InfoHoldingOp,
      StateFlag: this.state.dataScreen.StateFlag,
      contractterm: this.state.dataScreen.contractterm,
      InsurerModify: this.state.dataScreen.InsurerModify,
      OfficeModify: this.state.dataScreen.OfficeModify,
      OtherGroupModify: this.state.dataScreen.OtherGroupModify,
      Personal1Modify: this.state.dataScreen.Personal1Modify,
      Person2Modify: this.state.dataScreen.Person2Modify,
      Personal3Modify: this.state.dataScreen.Personal3Modify,
      JInspectGCategory: this.state.dataScreen.JInspectGCategory,
      ApplicationAttributeReDisplay: this.state.dataScreen.ApplicationAttributeReDisplay,
      OneOClockTotalAmount: this.state.dataScreen.OneOClockTotalAmount,
      StsInspectChange: this.state.dataScreen.StsInspectChange ? 1 : 0,
      ContractQueryErrorMessage: this.state.dataScreen.ContractQueryErrorMessage,
      ContractInfo: this.state.dataScreen.ContractInfo,
      NonDisplaySetContract: this.state.dataScreen.NonDisplaySetContract,
      NonDisplaySetAdd: this.state.dataScreen.NonDisplaySetAdd,
      StsOption: this.state.dataScreen.StsOption ? 1 : 0,
      AddedOrUnnecessaryList: this.state.dataScreen.AddedOrUnnecessaryList,
      Age: this.state.Age,
      LockState: this.state.dataScreen.LockState,
      LimitErrorMessage: this.state.dataScreen.LimitErrorMessage,
      StsReserveChange: this.state.dataScreen.StsReserveChange,
      Li_ProcessDivision: this.state.Li_ProcessDivision,
    }

    this.setState({ isloadForm: true })
    PersonalReserveProcessAction.newConfirm(params)
      .then(async res => {
        let data = {
          ...this.state.dataScreen,
          OneOClockTotalAmount: res?.data?.OneOClockTotalAmount,
        }

        await this.setState({
          Lo_Update: true,
          isChangeData: false,
          isChangeForm: false,

          dataScreen: data,
        })

        if (this.formRef.current?.getFieldValue('ReserveNum')) {
          this.getDataIndex()
        } else {
          if (res?.data?.ReserveNum) {
            this.formRef.current?.setFieldsValue({
              ReserveNum: res?.data?.ReserveNum
            })
          }
          this.changeReserveNum()
        }
        this.returnModal()
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  AcceptChangeConfirm() {
    let params = {
      ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Date: this.formRef.current?.getFieldValue('DateChar'),
      TimeZone: this.formRef.current?.getFieldValue('TimeZone'),
      PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId'),
      ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode'),
      FacilityNumHospital_Out: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
      NClassify: this.formRef.current?.getFieldValue('NClassify'),
      MedicalExamLocation: this.formRef.current?.getFieldValue('MedicalExamLocation'),
      Remarks: this.formRef.current?.getFieldValue('Remarks'),
      Continuous: this.formRef.current?.getFieldValue('Continuous') ? 1 : 0,
      ChangeClassify: this.formRef.current?.getFieldValue('ChangeClassify') ? 1 : 0,
      AddedOrUnnecessary: this.formRef.current?.getFieldValue('AddedOrUnnecessary'),
      Mode: this.state.dataScreen.Mode,
      DisplayContent: this.state.dataScreen.DisplayContent,
      OtherCondition: this.state.dataScreen.OtherCondition,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      StsPersonalInfoBasic: this.state.dataScreen.StsPersonalInfoBasic ? 1 : 0,
      personalbasic: this.state.dataScreen.personalbasic,
      w2ApplicationAttribute1: this.state.dataScreen.w2ApplicationAttribute1,
      personalbelong: this.state.dataScreen.personalbelong,
      StsContractInquiry: this.state.dataScreen.StsContractInquiry,
      StsFreeNum: this.state.dataScreen.StsFreeNum,
      FreeNumErrorTarget: this.state.dataScreen.FreeNumErrorTarget,
      Am_PmDivision: this.state.dataScreen.Am_PmDivision,
      ProcessNum: this.state.dataScreen.ProcessNum,
      AcceptNum: this.state.dataScreen.AcceptNum,
      KyokaiBillingDate: this.state.dataScreen.KyokaiBillingDate,
      KyokaiAcceptNum: this.state.dataScreen.KyokaiAcceptNum,
      StsReserveStatus: this.state.dataScreen.StsReserveStatus,
      InfoHoldingOp: this.state.dataScreen.InfoHoldingOp,
      StateFlag: this.state.dataScreen.StateFlag,
      contractterm: this.state.dataScreen.contractterm,
      InsurerModify: this.state.dataScreen.InsurerModify,
      OfficeModify: this.state.dataScreen.OfficeModify,
      OtherGroupModify: this.state.dataScreen.OtherGroupModify,
      Personal1Modify: this.state.dataScreen.Personal1Modify,
      Person2Modify: this.state.dataScreen.Person2Modify,
      Personal3Modify: this.state.dataScreen.Personal3Modify,
      JInspectGCategory: this.state.dataScreen.JInspectGCategory,
      ApplicationAttributeReDisplay: this.state.dataScreen.ApplicationAttributeReDisplay,
      OneOClockTotalAmount: this.state.dataScreen.OneOClockTotalAmount,
      StsInspectChange: this.state.dataScreen.StsInspectChange ? 1 : 0,
      ContractQueryErrorMessage: this.state.dataScreen.ContractQueryErrorMessage,
      ContractInfo: this.state.dataScreen.ContractInfo,
      NonDisplaySetContract: this.state.dataScreen.NonDisplaySetContract,
      NonDisplaySetAdd: this.state.dataScreen.NonDisplaySetAdd,
      StsOption: this.state.dataScreen.StsOption ? 1 : 0,
      AddedOrUnnecessaryList: this.state.dataScreen.AddedOrUnnecessaryList,
      Age: this.state.Age,
      LockState: this.state.dataScreen.LockState,
      LimitErrorMessage: this.state.dataScreen.LimitErrorMessage,
      StsReserveChange: this.state.dataScreen.StsReserveChange,
      Li_ProcessDivision: this.state.Li_ProcessDivision,
    }

    this.setState({ isloadForm: true })
    PersonalReserveProcessAction.acceptChangeConfirm(params)
      .then(async res => {
        let data = {
          ...this.state.dataScreen,
          OneOClockTotalAmount: res?.data?.OneOClockTotalAmount,
        }

        await this.setState({
          Lo_Update: true,
          isChangeData: false,
          isChangeForm: false,

          dataScreen: data,
        })

        if (this.formRef.current?.getFieldValue('ReserveNum')) {
          this.getDataIndex()
        } else {
          if (res?.data?.ReserveNum) {
            this.formRef.current?.setFieldsValue({
              ReserveNum: res?.data?.ReserveNum
            })
          }
          this.changeReserveNum()
        }
        this.returnModal()
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  ReserveChangeConfirm() {
    let params = {
      ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      Date: this.formRef.current?.getFieldValue('DateChar'),
      TimeZone: this.formRef.current?.getFieldValue('TimeZone'),
      PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId'),
      ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode'),
      FacilityNumHospital_Out: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
      NClassify: this.formRef.current?.getFieldValue('NClassify'),
      MedicalExamLocation: this.formRef.current?.getFieldValue('MedicalExamLocation'),
      Remarks: this.formRef.current?.getFieldValue('Remarks'),
      Continuous: this.formRef.current?.getFieldValue('Continuous') ? 1 : 0,
      ChangeClassify: this.formRef.current?.getFieldValue('ChangeClassify') ? 1 : 0,
      AddedOrUnnecessary: this.formRef.current?.getFieldValue('AddedOrUnnecessary'),

      Mode: this.state.dataScreen.Mode,
      DisplayContent: this.state.dataScreen.DisplayContent,
      OtherCondition: this.state.dataScreen.OtherCondition,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      StsPersonalInfoBasic: this.state.dataScreen.StsPersonalInfoBasic ? 1 : 0,
      personalbasic: this.state.dataScreen.personalbasic,
      w2ApplicationAttribute1: this.state.dataScreen.w2ApplicationAttribute1,
      personalbelong: this.state.dataScreen.personalbelong,
      StsContractInquiry: this.state.dataScreen.StsContractInquiry,
      StsFreeNum: this.state.dataScreen.StsFreeNum,
      FreeNumErrorTarget: this.state.dataScreen.FreeNumErrorTarget,
      Am_PmDivision: this.state.dataScreen.Am_PmDivision,
      ProcessNum: this.state.dataScreen.ProcessNum,
      AcceptNum: this.state.dataScreen.AcceptNum,
      KyokaiBillingDate: this.state.dataScreen.KyokaiBillingDate,
      KyokaiAcceptNum: this.state.dataScreen.KyokaiAcceptNum,
      StsReserveStatus: this.state.dataScreen.StsReserveStatus,
      InfoHoldingOp: this.state.dataScreen.InfoHoldingOp,
      StateFlag: this.state.dataScreen.StateFlag,
      contractterm: this.state.dataScreen.contractterm,
      InsurerModify: this.state.dataScreen.InsurerModify,
      OfficeModify: this.state.dataScreen.OfficeModify,
      OtherGroupModify: this.state.dataScreen.OtherGroupModify,
      Personal1Modify: this.state.dataScreen.Personal1Modify,
      Person2Modify: this.state.dataScreen.Person2Modify,
      Personal3Modify: this.state.dataScreen.Personal3Modify,
      JInspectGCategory: this.state.dataScreen.JInspectGCategory,
      ApplicationAttributeReDisplay: this.state.dataScreen.ApplicationAttributeReDisplay,
      OneOClockTotalAmount: this.state.dataScreen.OneOClockTotalAmount,
      StsInspectChange: this.state.dataScreen.StsInspectChange ? 1 : 0,
      ContractQueryErrorMessage: this.state.dataScreen.ContractQueryErrorMessage,
      ContractInfo: this.state.dataScreen.ContractInfo,
      NonDisplaySetContract: this.state.dataScreen.NonDisplaySetContract,
      NonDisplaySetAdd: this.state.dataScreen.NonDisplaySetAdd,
      StsOption: this.state.dataScreen.StsOption ? 1 : 0,
      AddedOrUnnecessaryList: this.state.dataScreen.AddedOrUnnecessaryList,
      Age: this.state.Age,
      LockState: this.state.dataScreen.LockState,
      LimitErrorMessage: this.state.dataScreen.LimitErrorMessage,
      StsReserveChange: this.state.dataScreen.StsReserveChange,
      Li_ProcessDivision: this.state.Li_ProcessDivision,
    }

    this.setState({ isloadForm: true })
    PersonalReserveProcessAction.reserveChangeConfirm(params)
      .then(async res => {
        let data = {
          ...this.state.dataScreen,
          OneOClockTotalAmount: res?.data?.OneOClockTotalAmount,
        }

        await this.setState({
          Lo_Update: true,
          isChangeData: false,
          isChangeForm: false,

          dataScreen: data,
        })

        if (this.formRef.current?.getFieldValue('ReserveNum')) {
          this.getDataIndex()
        } else {
          if (res?.data?.ReserveNum) {
            this.formRef.current?.setFieldsValue({
              ReserveNum: res?.data?.ReserveNum
            })
          }
          this.changeReserveNum()
        }
        this.returnModal()
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  updateData() {
    let params = {
      ...this.state.dataScreen,
      ...this.formRef.current?.getFieldValue(),
      DateChar: this.formRef.current?.getFieldValue('DateChar'),
      TimeZone: this.formRef.current?.getFieldValue('TimeZone'),
      // TimeZoneChars: this.formRef.current?.getFieldValue('TimeZone'),
      Date: this.formRef.current?.getFieldValue('DateChar')
    }

    this.setState({ isloadForm: true })

    PersonalReserveProcessAction.updateData(params)
      .then((res) => {
        // message.success('成功');
        if (res?.data?.reservation_number) {
          this.formRef.current?.setFieldsValue({
            ReserveNum: res?.data?.reservation_number
          })
        }
        if (this.state.dataTax.length > 0) {
          this.updateDataTax()
        } else {
          this.setState({
            isloadForm: false,
            Lo_Update: true,
            isChangeData: false,
            isChangeForm: false
          })

          this.returnModal()

          this.getDataScreen()
        }
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  updateDataTax() {
    let params = {
      Li_ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      data: this.state.dataTax
    }

    PersonalReserveProcessAction.updateDataTax(params)
      .then(async (res) => {
        await this.setState({
          Lo_Update: true
        })
        this.updateDataBilling()
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  updateDataBilling() {
    let params = {
      Li_ReserveNum: this.formRef.current?.getFieldValue('ReserveNum')
    }

    PersonalReserveProcessAction.updateDataBilling(params)
      .then((res) => {
        this.setState({
          isloadForm: false,
          isChangeData: false,
          isChangeForm: false
        })
        this.returnModal()
        this.getDataScreen()
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  checkColor(price) {
    if (price < 0) {
      return 209
    } else {
      return 208
    }
  }

  showModalPersonalInfoInquiry() {
    let title = '個人情報照会SUB' + ' [' + this.formRef.current?.getFieldValue("PersonalNumId") + ']'
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <Card title={title}>
            <WS2584019_PersonalInfoInquirySub
              Li_PersonalNum={this.formRef.current?.getFieldValue("PersonalNumId")}
            />
          </Card>
        ),
      },
    });
  }

  showModalOfficeInfoInquirySub() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2585001_OfficeInfoInquirySub
            Li_OfficeCode={this.formRef.current?.getFieldValue("OfficeCode")}
            Li_BranchCode={this.formRef.current?.getFieldValue("BranchStoreCode") ? this.formRef.current?.getFieldValue("BranchStoreCode") : 0}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  showModalContractInfoInquiry(save) {
    this.setState({
      nameScreen: 'WS0289012_ContractInfoInquiry',
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS0289012_ContractInfoInquiry
            Li_EffectiveLimitedDisplay={1}
            Li_Relationship={''}
            Lio_ConsultCourse={this.formRef.current?.getFieldValue('ConsultCourse')}
            Li_OfficeCode={this.formRef.current?.getFieldValue('OfficeCode')}
            Li_BranchStoreCode={this.formRef.current?.getFieldValue('BranchStoreCode') || 0}
            Li_Date={this.formRef.current?.getFieldValue("DateChar") ? moment(this.formRef.current?.getFieldValue("DateChar")).format('YYYY/MM/DD') : ''}
            Li_Other={this.state.dataScreen.OtherCondition}
            Li_Gender={this.state.sex}
            Li_DateBirth={this.formRef.current?.getFieldValue('Expression_80')}
            Li_HospitalOut={this.formRef.current?.getFieldValue('FacilityNumHospital_Out')}
            Li_NTsugikenmi={this.formRef.current?.getFieldValue('NClassify')}
            Li_Am_Pm={this.state.dataScreen.Am_PmDivision}
            Lio_ContractType={this.state.dataScreen.ContractType}
            Lio_ContractOrgCode={this.state.dataScreen.ContractClassifyCode}
            Lio_ContractStartDate={this.state.dataScreen.ContractDate}
            Lio_ContractNum={this.state.dataScreen.ContractNum}
            Lo_Status=''
            Lo_ErrorMessage=''

            onFinishScreen={(output) => {
              if (output.Lio_ConsultCourse) {
                this.setState({
                  isUnValidConsultCourse: false
                })
                this.setFieldConsultCourse(output.recordData, save)
              } else {
                this.setState({
                  isUnValidConsultCourse: true
                })
                message.error('受診ｺｰｽを入力してください')
              }

              this.setState({
                nameScreen: '',
              })
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  getDataContract() {
    if (this.formRef.current?.getFieldValue('ConsultCourse') !== this.state.dataScreen.ConsultCourse) {
      if (this.formRef.current?.getFieldValue('ConsultCourse')) {
        let initParams = {
          Li_EffectiveLimitedDisplay: '',
          Lio_ConsultCourse: '',
          Li_MsgOutput: '',
          Li_Gender: '',
          Li_Relationship: '',
          Li_DateBirth: '',
          Li_AgeDate: '',
          Li_AgeYearEnd: '',
          Li_AgeSchool: '',
          Li_HospitalOut: '',
          Li_Am_Pm: '',
          Li_NTsugikenmi: '',
          Li_Other: '',
          Lo_ContractType: '',
          Lo_ContractOrgCode: '',
          Lo_ContractStartDate: '',
          Lo_ContractNum: '',
          Lo_Status: '',
          ContractType: '',
          Course: '',
          Search: '',
          Gender: 0,
          Relationship: 0,
          HospitalOut: 0,
          Ampm: 0,
          NTsugikenmi: 0,
          Age: 0,
          Other: 0,
          StsCurrentYearOnly: 0,
          DateYear: '',
          limit: 18,
          page: 1,
        }

        let params = {
          ...initParams,
          Li_EffectiveLimitedDisplay: 1,
          Li_Relationship: '',
          Lio_ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
          Li_OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
          Li_BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode') || 0,
          Li_Date: this.formRef.current?.getFieldValue("DateChar") ? moment(this.formRef.current?.getFieldValue("DateChar")).format('YYYY/MM/DD') : '',
          Li_Other: this.state.dataScreen.OtherCondition,
          Li_Gender: this.state.sex,
          Li_DateBirth: this.formRef.current?.getFieldValue('Expression_80'),
          Li_HospitalOut: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
          Li_NTsugikenmi: this.formRef.current?.getFieldValue('NClassify'),
          Li_Am_Pm: this.state.dataScreen.Am_PmDivision,
          Lio_ContractType: this.state.dataScreen.ContractType,
          Lio_ContractOrgCode: this.state.dataScreen.ContractClassifyCode,
          Lio_ContractStartDate: this.state.dataScreen.ContractDate,
          Lio_ContractNum: this.state.dataScreen.ContractNum,
          Lo_Status: '',
          Lo_ErrorMessage: ''
        }

        this.setState({ isloadForm: true })
        getDataContractInfoInquiryAction(params)
          .then((res) => {
            let data = res?.data;
            if (data) {
              let olParam = {
                ...params,
                Li_AgeDate: data.Li_AgeDate,
                Li_AgeSchool: data.Li_AgeSchool,
                Li_AgeYearEnd: data.Li_AgeYearEnd,
                Li_Am_Pm: data.Li_Am_Pm || '',
                Li_DateBirth: data.Li_DateBirth || '',
                Li_EffectiveLimitedDisplay: data.Li_EffectiveLimitedDisplay,
                Li_Gender: data.Li_Gender,
                Li_HospitalOut: data.Li_HospitalOut,
                Li_MsgOutput: data.Li_MsgOutput,
                Li_NTsugikenmi: data.Li_NTsugikenmi,
                Li_Other: data.Li_Other || '',
                Li_Relationship: data.Li_Relationship || '',
                Lio_ConsultCourse: data.Lio_ConsultCourse || '',
                Lo_ContractNum: data.Lo_ContractNum,
                Lo_ContractOrgCode: data.Lo_ContractOrgCode,
                Lo_ContractStartDate: data.Lo_ContractStartDate,
                Lo_ContractType: data.Lo_ContractType,
                Lo_Status: data.Lo_Status,
                DateYear: data.DateYear,
                ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
              }

              this.getInfoConsultCourse(olParam)
            }
          })
          .catch((err) => {
            this.setState({ isloadForm: false })
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error("エラーが発生しました");
              return;
            }
            message.error(res.data.message);
          });
      } else {
        this.setFieldConsultCourse()
      }
    }
  }

  getInfoConsultCourse(params) {
    this.setState({ isloadForm: true })
    PersonalReserveProcessAction.getInfoConsultCourse(params)
      .then((res) => {
        let leng = res?.data?.SUB.length
        if (leng > 0) {
          if (leng > 1) {
            this.showModalContractInfoInquiry()
          } else {
            let result = res?.data?.SUB[0]
            this.setFieldConsultCourse(result)
            this.setState({
              isUnValidConsultCourse: false
            })
          }
        } else {
          this.setState({
            isUnValidConsultCourse: true
          })
          this.setFieldConsultCourse()
          this.showModalContractInfoInquiry()
        }
        this.setState({ isloadForm: false })
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  async setFieldConsultCourse(result, save) {
    if (result) {
      let total_price = result.Expression_42 + result.Expression_43 + result.Expression_44 + result.Expression_36
      this.formRef.current?.setFieldsValue({
        ConsultCourse: result.W1_chkup_course,
        Expression_170: result.Expression_42 === 0 ? '' : result.Expression_42?.toLocaleString(),
        Expression_171: result.Expression_43 === 0 ? '' : result.Expression_43?.toLocaleString(),
        Expression_172: result.Expression_44 === 0 ? '' : result.Expression_44?.toLocaleString(),
        Expression_173: result.Expression_36 === 0 ? '' : result.Expression_36?.toLocaleString(),
        Expression_174: total_price === 0 ? '' : total_price?.toLocaleString(),
      })

      let data = {
        ...this.state.dataScreen,
        ContractNum: result.Lo_ContractNum,
        ContractType: result.Lo_ContractType,
        ContractDate: result.Lo_ContractStartDate,
        ContractClassifyCode: result.Lo_ContractOrgCode,
        ConsultCourse: result.W1_chkup_course,
      }

      await this.setState({
        dataScreen: data,
      })
      await this.contractRedisplay()
      if (save) {
        this.ConfirmProcessBtn_F12()
      }
    } else {
      this.formRef.current?.setFieldsValue({
        Expression_170: '',
        Expression_171: '',
        Expression_172: '',
        Expression_173: '',
        Expression_174: '',
      })

      let data = {
        ...this.state.dataScreen,
        ContractNum: 0,
        ContractType: 0,
        ContractDate: 0,
        ContractClassifyCode: 0,
        ConsultCourse: '',
      }
      await this.setState({
        dataScreen: data,
      })
      this.contractRedisplay()
    }
  }

  showModalMedicalExamContentsInquirySub() {
    let params = {
      Date: this.state.dataScreen.Date,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      ConsultCourse: this.formRef.current?.getFieldValue('ConsultCourse'),
      JInspectGCategory: this.state.dataScreen.JInspectGCategory,
    }

    PersonalReserveProcessAction.breakDown(params)
      .then(async (res) => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 550,
            component: (
              <WS2555001_MedicalExamContentsInquirySub
                Li_CourseCode={this.formRef.current?.getFieldValue('ConsultCourse')}
                Li_JInspectGCategory={this.state.dataScreen.JInspectGCategory}
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

  getListOfficeByPersonal() {
    PersonalOfficeSearchQueryAction.GetIndex({ PersonalNum: this.formRef.current?.getFieldValue('PersonalNumId') })
      .then(res => {
        this.setState({ dataOfficeByPersonal: res })
      })
      .catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
  }

  checkOfficeCode() {
    if (this.state.PersonalNumId) {
      let OfficeCode = this.formRef.current?.getFieldValue('OfficeCode')
      let data = this.state.dataOfficeByPersonal
      let index = data.findIndex(x => x.office_code == OfficeCode)

      this.setState({ isUnValidOffice: false })
      if (index >= 0) {
        return true
      } else {
        return false
      }
    } else {
      let office_kanji_name = this.formRef.current?.getFieldValue('office_kanji_name')
      if (office_kanji_name) {
        this.setState({ isUnValidOffice: false })
        return true
      } else {
        this.setState({ isUnValidOffice: true })
        return false
      }
    }
  }

  getInfoOffice() {
    if (this.formRef.current?.getFieldValue('OfficeCode')) {
      this.setState({ isloadForm: true })
      let params = {
        OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
        BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode') || 0,
      }

      PersonalReserveProcessAction.getInfoOffice(params)
        .then((res) => {
          this.formRef.current?.setFieldsValue({
            office_kanji_name: res?.data?.office_kanji_name,
            BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode') == 0 ? '' : this.formRef.current?.getFieldValue('BranchStoreCode')
          })
          this.setState({
            OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
            importance_Office: res?.data?.Expression_89,
            isChangeForm: true,
          })

          if (!res?.data?.office_kanji_name) {
            this.setState({ isUnValidOffice: true })
            Modal.error({
              width: '350px',
              title: "指定の事業所ｺｰﾄﾞは存在しません",
              onOk: () => {
                this.formRef.current?.getFieldInstance('OfficeCode').focus()
              }
            });
          } else {
            if (!this.checkOfficeCode()) {
              Modal.error({
                width: '425px',
                title: "指定の事業所ｺｰﾄﾞは所属情報に存在しません",
              });
            }
          }
          this.setState({ isloadForm: false })
        })
        .catch((err) => {
          this.setState({ isloadForm: false })
          const res = err.response;
          if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
          message.error(res.data.message);
        });
    } else {
      this.formRef.current?.setFieldsValue({
        office_kanji_name: '',
        BranchStoreCode: '',
      })
      this.setState({
        OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
        importance_Office: 0,
        isChangeForm: true,
      })
    }
  }

  showModalPersonalOfficeSearchQuery_WS0381001() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component:
          <WS0381001_PersonalOfficeSearchQuery
            Li_PersonalNum={this.formRef.current?.getFieldValue('PersonalNumId')}
            Lio_OfficeCode={this.formRef.current?.getFieldValue('OfficeCode')}
            Lio_BranchStoreCode={this.formRef.current?.getFieldValue('BranchStoreCode') || 0}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                OfficeCode: output.Lio_OfficeCode,
                BranchStoreCode: output.Lio_BranchStoreCode === 0 ? '' : output.Lio_BranchStoreCode,
                office_kanji_name: output.recordData.office_kanji_name
              })

              this.setState({
                OfficeCode: output.Lio_OfficeCode,
                importance_Office: output.recordData.Expression_14,
                isChangeForm: true,
                isUnValidOffice: false
              })
              this.closeModal()
            }}
          />
      }
    })
  }

  showModalOfficeInfoRetrievalQuery_WS0247001() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component:
          <WS0247001_OfficeInfoRetrievalQuery
            Lio_OfficeCode={this.formRef.current?.getFieldValue('OfficeCode')}
            Lio_BranchStoreCode={this.formRef.current?.getFieldValue('BranchStoreCode') || 0}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                OfficeCode: output.Lio_OfficeCode,
                BranchStoreCode: output.Lio_BranchStoreCode === 0 ? '' : output.Lio_BranchStoreCode,
                office_kanji_name: output.Lo_Kanji_Name
              })

              this.setState({
                OfficeCode: output.Lio_OfficeCode,
                importance_Office: output.recordData.importance,
                isChangeForm: true,
                isUnValidOffice: false
              })
              this.closeModal()
            }}
          />
      }
    })
  }

  setDataByPersonal(data) {
    this.formRef.current?.setFieldsValue({
      Expression_88: data.Expression_88,
      Expression_75: data.Expression_75,
      Expression_76: data.Expression_76,
      Expression_78: data.Expression_78,
      Expression_79: data.Expression_79,
      Expression_80: moment(data.Expression_80)?.format("NNy/MM/DD"),
      Age: data.Age + '歳',
    })

    this.setState({
      isChangeForm: true,
      sex: data.Expression_79,
      PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId'),
      importance_Personal: data.Expression_88,
      Age: data.Age
    })
    if (data.message === 'Call Screen WS0381001') {
      this.showModalPersonalOfficeSearchQuery_WS0381001()
    } else {
      this.formRef.current?.setFieldsValue({
        OfficeCode: data.OfficeCode,
        BranchStoreCode: data.BranchStoreCode === 0 ? '' : data.BranchStoreCode,
        office_kanji_name: data.office_kanji_name,
        Expression_89: data.Expression_89,
      })

      this.setState({
        OfficeCode: data.OfficeCode,
        importance_Office: data.Expression_89
      })
    }

    this.getListOfficeByPersonal()

  }

  onChangePersonalNumber(data) {
    if (this.formRef.current?.getFieldValue('ReserveNum')) {
      Modal.confirm({
        title: '受付済みの受診者を変更しますが、よろしいですか？',
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        onOk: () => {
          this.setDataByPersonal(data)
        },
        onCancel: () => {
          this.formRef.current?.setFieldsValue({
            PersonalNumId: this.state.PersonalNumId,
          })
        }
      })
    } else {
      this.setDataByPersonal(data)
    }
  }

  getInfoPersonal() {
    if (this.formRef.current?.getFieldValue('PersonalNumId') !== this.state.PersonalNumId) {
      this.getListOfficeByPersonal()
      if (this.formRef.current?.getFieldValue('PersonalNumId') > 0) {
        let params = {
          Li_Date: this.formRef.current?.getFieldValue('DateChar'),
          ApplicationAttributeReDisplay: this.state.dataScreen.ApplicationAttributeReDisplay,
          PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId'),
          ContractType: this.state.dataScreen.ContractType,
          ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
          ContractDate: this.state.dataScreen.ContractDate,
          ContractNum: this.state.dataScreen.ContractNum,
        }

        this.setState({ isloadForm: true })
        PersonalReserveProcessAction.getInfoPersonal(params)
          .then((res) => {
            if (res?.data?.Expression_75) {
              this.onChangePersonalNumber(res?.data)
            } else {
              Modal.error({
                title: '指定の個人番号は存在しません',
                width: 330,
                onOk: () => {
                  this.formRef.current?.getFieldInstance('PersonalNumId').focus()
                }
              })
              this.formRef.current?.setFieldsValue({
                Expression_75: '',
                Expression_76: '',
                Expression_78: '',
                Expression_80: '',
                Age: '',
              })
              this.setState({
                sex: null,
                importance_Personal: null,
                PersonalNumId: '',
                Age: '',
              })
              this.getListOfficeByPersonal()
            }
            this.setState({ isloadForm: false })
          })
          .catch((err) => {
            this.setState({ isloadForm: false })
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error("エラーが発生しました");
              return;
            }
            message.error(res.data.message);
          });
      } else {
        if (Object.keys(this.state.dataPersonal_2543).length > 0) {
          let age = moment(new Date())?.format('YYYY') - moment(this.state.dataPersonal_2543.DateBirthChar)?.format("YYYY")
          this.formRef.current?.setFieldsValue({
            PersonalNumId: this.state.dataPersonal_2543.PersonalNumId,
            Expression_88: null,
            Expression_75: this.state.dataPersonal_2543.KanaName,
            Expression_76: this.state.dataPersonal_2543.KanjiName,
            Expression_78: this.state.dataPersonal_2543.Gender == 1 ? '男性' : this.state.dataPersonal_2543.Gender == 2 ? '女性' : '',
            Expression_79: this.state.dataPersonal_2543.Gender,
            Expression_80: moment(this.state.dataPersonal_2543.DateBirthChar)?.format("NNy/MM/DD"),
            Age: age > 0 ? age + '歳' : '',
          })

          this.setState({
            isChangeForm: true,
            sex: this.state.dataPersonal_2543.Gender,
            PersonalNumId: this.state.dataPersonal_2543.PersonalNumId,
            importance_Personal: null,
            Age: age,
            dataPersonal_2543: this.state.dataPersonal_2543
          })
        } else {
          this.formRef.current?.setFieldsValue({
            Expression_75: '',
            Expression_76: '',
            Expression_78: '',
            Expression_80: '',
            Age: '',
          })
          this.setState({
            sex: null,
            importance_Personal: null,
            PersonalNumId: '',
            Age: '',
          })
        }
      }
    }
  }

  renderButtonCloseModalCustom() {
    return (
      <Button className='close-button'
        onClick={() => {
          if (this.state.isChangeData || this.state.isChangeForm) {
            if (this.state.isChangeForm) {
              this.ConfirmProcessBtn_F12()
            } else {
              this.showModalConfirm()
            }
          } else {
            this.returnModal()
          }
        }}
      >
        <CloseOutlined />
      </Button>
    )
  }

  returnModal() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lo_Update: this.state.Lo_Update,
        nameScreen: 'WS2537001_PersonalReserveProcess'
      })
    }
  }

  onFinish(values) {
  }

  handleInputTime(val) {
    let hh = val.substring(0, val.indexOf(':'))
    let mm = val.substring(val.indexOf(':') + 1)

    if (mm < 10 && mm > 0) {
      val = hh + ':' + '0' + parseInt(mm)
    }

    if (mm == 0) {
      val = hh + ':' + '00'
    }

    let regEx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    let checked = regEx.test(val)

    if (!checked) {
      this.formRef.current?.setFieldsValue({
        TimeZoneCopy: this.formRef.current?.getFieldValue('TimeZone')
      })
    } else {
      let mms = val.substring(val.indexOf(':') + 1)
      let hhs = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

      if ((mms != '00' && mms != '30') || (!hhs.includes(parseInt(hh)))) {
        this.formRef.current?.setFieldsValue({
          TimeZone: '08:00',
          TimeZoneCopy: '08:00',
        })
        this.showModalPeriodTimeInquiry_WS2553003()
      } else {
        this.formRef.current?.setFieldsValue({
          TimeZone: val,
          TimeZoneCopy: val,
        })
      }

    }
  }

  closeModalResize = () => {
    this.setState({
      childModalResize: {
        ...this.state.childModalResize,
        visible: false,
        width: 200,
        height: 475,
      }
    })
  }

  showModalPeriodTimeInquiry_WS2553003() {
    this.setState({
      childModalResize: {
        ...this.state.childModalResize,
        visible: true,
        width: 200,
        height: 475,
        component: (
          <WS2553003_PeriodTimeInquiry
            Lio_TimeZone={this.formRef.current?.getFieldValue('TimeZone')}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                TimeZone: output.Lio_TimeZone,
                TimeZoneCopy: output.Lio_TimeZone
              })
              this.setState({
                isChangeForm: true,
              })
              this.closeModalResize()
            }}
          />
        ),
      },
    });
  }

  ConsultHistory() {
    let params = {
      ReserveNum: this.formRef.current?.getFieldValue('ReserveNum'),
      PersonalNumId: this.formRef.current?.getFieldValue('PersonalNumId') || 0,
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode') || 0,
      FacilityNumHospital_Out: this.formRef.current?.getFieldValue('FacilityNumHospital_Out'),
      MedicalExamLocation: this.formRef.current?.getFieldValue('MedicalExamLocation'),
      DateChar: this.formRef.current?.getFieldValue('DateChar'),
      ApplicationAttributeReDisplay: this.state.dataScreen.ApplicationAttributeReDisplay,
      ContractType: this.state.dataScreen.ContractType,
      ContractClassifyCode: this.state.dataScreen.ContractClassifyCode,
      ContractDate: this.state.dataScreen.ContractDate,
      ContractNum: this.state.dataScreen.ContractNum,
      OneOClockTotalAmount: this.state.dataScreen.OneOClockTotalAmount,
      Age: this.state.Age,
    }
    PersonalReserveProcessAction.ConsultHistory(params)
      .then((res) => {
        let age = res?.data?.Age
        this.formRef.current?.setFieldsValue({
          Age: age > 0 ? age + '歳' : '',
        })

        this.setState({
          isChangeForm: true,
          Age: age,
        })
      })
      .catch((err) => {
        this.setState({ isloadForm: false })
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
      },
    });
  }

  render() {
    return (
      <div className="personal-reserve-process">
        <Card title={
          <div>
            <div style={{ float: "left" }}>個人予約処理</div>
            <div style={{ float: "right" }}
              hidden={!this.props.Li_Child}>
              {this.renderButtonCloseModalCustom()}
            </div>
          </div>
        }>
          <Spin spinning={this.state.isloadForm}>
            <Space style={{ marginBottom: '10px' }}>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '90%',
                      component: (
                        <WS0306001_ContractInfoMaintain
                          onFinishScreen={(output) => {
                            this.closeModal()
                          }}
                        />
                      ),
                    },
                  });
                }}>契約情報</Button>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '90%',
                      component: (
                        <WS2708001_SetInfoMaintain
                          onFinishScreen={(output) => {
                            this.closeModal()
                          }}
                        />
                      ),
                    },
                  });
                }}>セット情報</Button>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 200,
                      component: (
                        <WS2537084_InfoHeld
                          onFinishScreen={(output) => {
                            this.closeModal()
                          }}
                        />
                      ),
                    },
                  });
                }}>情報保持</Button>
              <Button
                onClick={() => {
                  if (this.state.ReserveNum && this.state.ReserveNum > 0) {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 600,
                        component: (
                          <WS0650001_DocumentBatchCreateSub
                            Li_ReserveNum={this.state.ReserveNum}
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    });
                  } else {
                    Modal.warning({
                      width: '280px',
                      title: "予約後に使用可能です",
                      okText: "Ok",
                      icon: <WarningOutlined />,
                    });
                  }
                }}
              >予約関連</Button>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 600,
                      component: (this.state.ReserveNum && this.state.ReserveNum > 0) ?
                        <WS0392004_VisitsSupplement
                          Li_ReserveNum={this.state.ReserveNum}
                          Lio_Remarks={this.formRef.current?.getFieldValue("Remarks")}
                          onFinishScreen={(output) => {
                            this.closeModal()
                          }}
                        />
                        :
                        <WS0392005_VisitsSupplementWk
                          Li_ReserveNum={this.state.ReserveNum}
                          Li_RealTmp={1}
                          onFinishScreen={(output) => {
                            this.closeModal()
                          }}
                        />
                      ,
                    },
                  });
                }}
              >補足</Button>
              <Button
                onClick={() => this.ConfirmProcessBtn_F12()}>確定</Button>
            </Space>
            <hr />

            <Form ref={this.formRef} onFinish={this.onFinish} >
              <div >
                <Row gutter={24} style={{ padding: '5px 12px' }}>
                  <Col span={14}>
                    <Row>
                      <label style={style.label}>予約番号</label>
                      <Form.Item style={{ width: 200, marginBottom: 5, marginRight: '5px' }}>
                        <Row>
                          <Form.Item style={{ width: 168, marginBottom: 0 }} name="ReserveNum" >
                            <InputNumber maxLength={15} min={0}
                              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                              onBlur={(e) => {
                                let val = parseInt(e.target.value).toString().substring(0, 15)
                                if (!val || val == 0 || val == 'NaN') {
                                  val = ''
                                  this.formRef.current?.setFieldsValue({
                                    ReserveNum: ''
                                  })
                                } else {
                                  if (val < 0) {
                                    val = parseInt(val.replace('-', ''))
                                  }
                                  this.formRef.current?.setFieldsValue({
                                    ReserveNum: val
                                  })
                                }
                                if (val != this.state.ReserveNum) {
                                  this.changeReserveNum()
                                }
                              }} />
                          </Form.Item>
                          <Button style={{
                            width: 32,
                            padding: '0px 7px',
                            color: '#00000073',
                            borderLeftColor: 'transparent',
                            borderTopLeftRadius: 0, borderBottomLeftRadius: 0
                          }}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '80%',
                                  component: (
                                    <WS0273001_VisitsTargetSearchQuery
                                      onFinishScreen={(output) => {
                                        this.formRef.current?.setFieldsValue({
                                          ReserveNum: output.LnkOutReserveNum
                                        })
                                        this.setState({
                                          ReserveNum: output.LnkOutReserveNum,
                                        })

                                        // this.getDataScreen()
                                        this.changeReserveNum()
                                        this.closeModal()
                                      }}
                                    />
                                  ),
                                },
                              })
                            }}
                          >{<SearchOutlined style={{ fontSize: 16 }} />}</Button>
                        </Row>
                      </Form.Item>
                      <div style={{
                        width: '50px',
                        border: '1px solid',
                        borderColor: Color(this.state.Expression_100)?.Foreground,
                        textAlign: 'center',
                        color: Color(this.state.Expression_100)?.Foreground,
                        marginLeft: '0.5em',
                        height: '24px'
                      }}
                      >
                        {this.state.Expression_99}
                      </div>
                    </Row>
                  </Col>
                  <Col span={10} style={{ textAlign: 'right' }}>
                    <Space>
                      <Button type='primary'
                        hidden={!this.state.ReserveNum || this.state.ReserveNum === 0 || !this.state.Continuous}
                        onClick={() => {
                          this.formRef.current?.setFieldsValue({
                            ReserveNum: null,
                            PersonalNumId: '',
                            Expression_75: '',
                            Expression_76: '',
                            Expression_78: '',
                            Expression_80: '',
                            Age: '',
                            OfficeCode: '',
                            BranchStoreCode: '',
                            office_kanji_name: '',
                            Expression_131: '',
                          })

                          this.setState({
                            ReserveNum: null,
                            sex: null,
                            importance_Personal: null,
                            importance_Office: null,
                            PersonalNumId: '',
                            OfficeCode: '',
                            Age: '',
                            Expression_99: '新規',
                            Expression_100: 211,
                          })
                          // this.getDataTableLeft()
                          this.getDataTableInspectChange()
                        }}
                      >新規</Button>
                      <Tooltip placement="topLeft" title='連続で予約を登録します'>
                        <Form.Item name="Continuous" valuePropName="checked">
                          <Checkbox
                            onChange={(e) => {
                              this.setState({ Continuous: e.target.checked })
                            }}
                          >連続予約</Checkbox>
                        </Form.Item>
                      </Tooltip>
                    </Space>
                  </Col>
                </Row>
              </div>

              <Row gutter={24} style={{ marginBottom: '18px' }}>
                <Col span={12} style={{ paddingRight: 0 }}>
                  <div style={{ padding: '12px', border: '1px solid #93c8f9', height: '100%' }} >
                    {/* Personal */}
                    <Row gutter={24} style={{ margin: 0 }}>
                      <Col span={20} style={{ padding: 0 }}>
                        <Row>
                          <label style={style.label}>個人番号</label>
                          <Form.Item style={{ width: 150, marginBottom: 5, marginRight: '5px' }}>
                            <Row>
                              <Form.Item style={{ width: 118, marginBottom: 0 }} name="PersonalNumId" >
                                <InputNumber maxLength={10}
                                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                  onBlur={(e) => {
                                    let val = parseInt(e.target.value).toString().substring(0, 10)
                                    if (!val || val == 0 || val == 'NaN') {
                                      this.formRef.current?.setFieldsValue({
                                        PersonalNumId: ''
                                      })
                                    } else {
                                      if (val < 0) {
                                        val = parseInt(val.replace('-', ''))
                                      }
                                      this.formRef.current?.setFieldsValue({
                                        PersonalNumId: val
                                      })
                                    }
                                    this.getInfoPersonal()
                                  }} />
                              </Form.Item>
                              <Button style={{
                                width: 32,
                                padding: '0px 7px',
                                color: '#00000073',
                                borderLeftColor: 'transparent',
                                borderTopLeftRadius: 0, borderBottomLeftRadius: 0
                              }}
                                onClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: '95%',
                                      component: (
                                        <WS0248001_PersonalInfoSearchQuery
                                          Li_OfficeCode={this.formRef.current?.getFieldValue('OfficeCode')}
                                          Li_BranchStoreCode={this.formRef.current?.getFieldValue('BranchStoreCode') || 0}
                                          Li_office_kanji_name={this.formRef.current?.getFieldValue('office_kanji_name')}
                                          onFinishScreen={(output) => {
                                            if (this.formRef.current?.getFieldValue('PersonalNumId') !== output.recordData.personal_number_id) {
                                              this.formRef.current?.setFieldsValue({
                                                PersonalNumId: output.recordData.personal_number_id
                                              })
                                              this.setState({
                                                PersonalNumId: output.recordData.personal_number_id
                                              })
                                              this.getInfoPersonal()
                                            }

                                            this.closeModal()
                                          }}
                                        />
                                      ),
                                    },
                                  })
                                }}
                              >{<SearchOutlined style={{ fontSize: 16 }} />}</Button>
                            </Row>
                          </Form.Item>

                          <div style={{ width: '40px' }}>
                            {this.state.importance_Personal === 1 ?
                              <div><InfoCircleOutlined style={{ color: '#1890ff', cursor: 'pointer', padding: '0 5px', fontSize: '24px' }}
                                onClick={() => {
                                  this.showModalPersonalInfoInquiry()
                                }} /></div> :
                              this.state.importance_Personal === 3 ?
                                <div><WarningOutlined style={{ color: '#faad14', cursor: 'pointer', padding: '0 5px', fontSize: '24px' }}
                                  onClick={() => {
                                    this.showModalPersonalInfoInquiry()
                                  }} /></div> :
                                this.state.importance_Personal === 5 ?
                                  <div><CloseCircleOutlined style={{ color: '#ff4d4f', cursor: 'pointer', padding: '0 5px', fontSize: '24px' }}
                                    onClick={() => {
                                      this.showModalPersonalInfoInquiry()
                                    }} /></div> :
                                  <Button disabled={!this.state.PersonalNumId}
                                    onClick={() => {
                                      this.showModalPersonalInfoInquiry()
                                    }}
                                  ><MoreOutlined /></Button>
                            }
                          </div>
                          <Button type="primary" hidden={this.state.PersonalNumId}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 600,
                                  component: (
                                    <WS2543001_ApplicationInfoRegister
                                      Li_ReserveNum={this.formRef.current?.getFieldValue("ReserveNum")}
                                      Li_Data={this.state.dataPersonal_2543}
                                      onFinishScreen={async (output) => {
                                        let age = output.data.DateBirthChar ? moment(new Date())?.format('YYYY') - moment(output.data.DateBirthChar)?.format("YYYY") : ''
                                        this.formRef.current?.setFieldsValue({
                                          PersonalNumId: output.PersonalNumId,
                                          Expression_88: null,
                                          Expression_75: output.data.KanaName,
                                          Expression_76: output.data.KanjiName,
                                          Expression_78: output.data.Gender == 1 ? '男性' : output.data.Gender == 2 ? '女性' : '',
                                          Expression_79: output.data.Gender,
                                          Expression_80: output.data.DateBirthChar ? moment(output.data.DateBirthChar)?.format("NNy/MM/DD") : '',
                                        })

                                        await this.setState({
                                          isChangeForm: true,
                                          sex: output.data.Gender,
                                          PersonalNumId: output.PersonalNumId,
                                          importance_Personal: null,
                                          Age: age,
                                          dataPersonal_2543: output.data
                                        })

                                        this.forceUpdate()

                                        this.ConsultHistory()
                                        this.closeModal()
                                      }}
                                    />
                                  ),
                                },
                              });
                            }} >直接</Button>
                          <Button style={{ width: '50px' }} type='primary' hidden={!this.state.PersonalNumId}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 700,
                                  component: (
                                    <WS2542001_PreviousCourseAcquisitionSub
                                      Li_PersonalNum={this.formRef.current?.getFieldValue("PersonalNumId")}
                                      Lio_CourseCode={this.formRef.current?.getFieldValue("ConsultCourse")}
                                      Lio_ContractType={this.state.dataScreen.ContractType}
                                      Lio_ContractOrgCode={this.state.dataScreen.ContractClassifyCode}
                                      Lio_ContractStartDate={this.state.dataScreen.ContractDate}
                                      Lio_ContractNum={this.state.dataScreen.ContractNum}
                                      onFinishScreen={async (output) => {
                                        this.formRef.current?.setFieldsValue({
                                          ConsultCourse: output?.Lio_CourseCode,
                                          StsReturn: output?.Lo_Sts,
                                          Expression_118: output.recordData.contract_short_name + ' (' + moment(output.recordData.visit_date_on)?.format('YYYY') + '年度' + ')',

                                          Expression_170: '',
                                          Expression_171: '',
                                          Expression_172: '',
                                          Expression_173: '',
                                          Expression_174: '',
                                        })

                                        let data = {
                                          ...this.state.dataScreen,
                                          ContractType: output?.Lio_ContractType,
                                          ContractClassifyCode: output?.Lio_ContractOrgCode,
                                          ContractDate: output?.Lio_ContractStartDate,
                                          ContractNum: output?.Lio_ContractNum,
                                        }

                                        await this.setState({
                                          importance_Office: 1,
                                          ConsultCourse: output?.Lio_CourseCode,
                                          dataScreen: data
                                        })
                                        this.contractRedisplay()
                                        this.forceUpdate()

                                        this.closeModal()
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          > 履歴</Button>
                        </Row>
                        <Row gutter={24} style={{ margin: 0 }}>
                          <Col span={14} style={{ padding: 0 }}>
                            <Row>
                              <label style={style.label}>氏　名</label>
                              <Form.Item style={{ width: 'calc(100% - 80px)', marginBottom: 5 }} name="Expression_75" >
                                <Input readOnly style={style.input} />
                              </Form.Item>
                            </Row>
                          </Col>
                          <Col span={10} style={{ padding: 0 }}>
                            <Row>
                              <label style={style.label}>性&emsp;別</label>
                              <Form.Item style={{ width: 'calc(100% - 80px)', marginBottom: 5 }} name="Expression_78" >
                                <Input readOnly style={style.input} />
                              </Form.Item>
                            </Row>
                          </Col>
                        </Row>
                      </Col>

                      <Col span={4} style={{ padding: 0 }}>
                        <div hidden>
                          <Form.Item name="Expression_79" > <Input /></Form.Item>
                        </div>
                        {this.state.sex === 1 ?
                          <img src={man} style={{ position: "absolute", width: "50px", height: "50px" }}></img> :
                          this.state.sex === 2 ?
                            <img src={woman} style={{ position: "absolute", width: "50px", height: "50px" }}></img> : null
                        }

                      </Col>
                    </Row>


                    <Row gutter={24} style={{ margin: 0 }}>
                      <Col span={20} style={{ padding: 0 }}>
                        <Row gutter={24} style={{ margin: 0 }}>
                          <Col span={14} style={{ padding: 0 }}>
                            <Row>
                              <label style={style.label}></label>
                              <Form.Item style={{ width: 'calc(100% - 80px)', marginBottom: 5 }} name="Expression_76" >
                                <Input readOnly style={style.input} />
                              </Form.Item>
                            </Row>
                          </Col>
                          <Col span={10} style={{ padding: 0 }}>
                            <Row>
                              <label style={style.label}>生年月日</label>
                              <Form.Item style={{ width: 'calc(100% - 80px)', marginBottom: 5 }} name="Expression_80" >
                                <Input readOnly style={style.input} />
                              </Form.Item>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item style={{ width: '100%', marginBottom: 5 }} name="Age" >
                          <Input readOnly style={style.input} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <hr style={styleHr} />

                    {/* Office */}
                    <Row gutter={24} style={{ margin: 0 }}>
                      <label style={style.label}>事業所</label>
                      <Form.Item style={{ width: '130px', marginBottom: 5, marginRight: '10px' }} name="OfficeCode">
                        <Input.Search maxLength={8}
                          style={{ textAlign: 'right' }}
                          onSearch={(value) => {
                            if (this.state.PersonalNumId) {
                              this.showModalPersonalOfficeSearchQuery_WS0381001()
                            } else {
                              this.showModalOfficeInfoRetrievalQuery_WS0247001()
                            }
                          }}
                          onBlur={(e) => {
                            this.getInfoOffice()
                          }}
                        />
                      </Form.Item>
                      <Form.Item style={{ width: '110px', marginBottom: 5, marginRight: '10px' }} name="BranchStoreCode">
                        <Input.Search type='number' maxLength={5} min={0}
                          disabled={this.state.isUnValidOffice}
                          style={{ textAlign: 'right' }}
                          onSearch={(value) => {
                            if (this.state.PersonalNumId) {
                              this.showModalPersonalOfficeSearchQuery_WS0381001()
                            } else {
                              this.showModalOfficeInfoRetrievalQuery_WS0247001()
                            }
                          }}
                          onBlur={(e) => {
                            this.getInfoOffice()
                          }} />
                      </Form.Item>
                      <div style={{ width: '40px' }}>
                        {this.state.importance_Office === 1 ?
                          <div><InfoCircleOutlined style={{ color: '#1890ff', cursor: 'pointer', padding: '0 5px', fontSize: '24px' }}
                            onClick={() => {
                              this.showModalOfficeInfoInquirySub()
                            }}
                          /></div> :
                          this.state.importance_Office === 3 ?
                            <div><WarningOutlined style={{ color: '#faad14', cursor: 'pointer', padding: '0 5px', fontSize: '24px' }}
                              onClick={() => {
                                this.showModalOfficeInfoInquirySub()
                              }} /></div> :
                            this.state.importance_Office === 5 ?
                              <div><CloseCircleOutlined style={{ color: '#ff4d4f', cursor: 'pointer', padding: '0 5px', fontSize: '24px' }}
                                onClick={() => {
                                  this.showModalOfficeInfoInquirySub()
                                }} /></div> :
                              <Button disabled={!this.state.OfficeCode}
                                onClick={() => {
                                  this.showModalOfficeInfoInquirySub()
                                }}><MoreOutlined /></Button>
                        }
                      </div>
                    </Row>
                    <Row>
                      <label style={style.label}> </label>
                      <Form.Item style={{ width: 'calc(100% - 80px)', marginBottom: 5 }} name="office_kanji_name" >
                        <Input readOnly style={style.input} />
                      </Form.Item>
                    </Row>

                    <hr style={styleHr} />

                    <Row gutter={24} style={{ margin: 0 }}>
                      <label style={style.label}>コース</label>
                      <Form.Item style={{ width: '100px', marginBottom: 5 }} name="ConsultCourse">
                        <Input.Search
                          onSearch={(value) => {
                            this.showModalContractInfoInquiry()
                            this.setState({
                              changeConsultCourse: true
                            })
                          }}

                          onFocus={() => {
                            this.setState({
                              changeConsultCourse: false
                            })
                          }}

                          onBlur={(e) => {
                            if (!this.state.changeConsultCourse) {
                              this.getDataContract()
                            }
                          }}
                        />
                      </Form.Item>
                      <div style={{ width: '40px' }}>
                        <Button disabled={!this.state.ConsultCourse}
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '90%',
                                component: (
                                  <WS0605127_ContractLineItemDisplay
                                    Li_ContractType={this.state.dataScreen.ContractType}
                                    Li_ContractOrgs={this.state.dataScreen.ContractClassifyCode}
                                    Li_ContractStartDate={this.state.dataScreen.ContractDate}
                                    Li_ContractNum={this.state.dataScreen.ContractNum}
                                    onFinishScreen={(output) => {
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        ><MoreOutlined /></Button>
                      </div>
                      <Form.Item style={{ width: 'calc(100% - 270px', marginBottom: 5, marginRight: '10px' }} name="Expression_118">
                        <Input readOnly style={style.input} />
                      </Form.Item>
                      <div style={{ width: '40px', textAlign: 'right' }}>
                        <Button type='primary'
                          onClick={() => this.ConfirmProcessBtn_F12()}>
                          {
                            this.props.Li_ProcessDivision === 1 ? '受付' :
                              (this.formRef.current?.getFieldValue('ReserveNum') && this.formRef.current?.getFieldValue('ReserveNum')) > 0 ? '変更' : '登録'
                          }
                        </Button>
                      </div>
                    </Row>
                  </div>
                </Col>
                <Col span={12} style={{ paddingLeft: 8 }}>
                  <div style={{ padding: '12px', border: '1px solid #93c8f9', height: '100%' }} >
                    <Row>
                      <label style={{ ...style.label, marginBottom: 10 }}>受診日</label>
                      <Form.Item style={{ width: '145px', marginBottom: 10, marginRight: '5px' }}>
                        <Row>
                          <Form.Item style={{ width: '112px', marginBottom: 10 }} name="DateChar" >
                            <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'
                              allowClear={false}
                              style={{ borderRight: 'none' }}
                              onChange={(e) => {
                                let DateChar = moment(e).format('YYYY/MM/DD')
                                if (DateChar) {
                                  this.formRef.current?.setFieldsValue({
                                    DateChar: DateChar
                                  })
                                  this.setState({
                                    isChangeForm: true
                                  })
                                } else {
                                  Modal.error({
                                    title: '受診日を入力してください',
                                    width: 300,
                                  })
                                }
                              }}
                            />
                          </Form.Item>
                          <Button style={{
                            width: 32,
                            padding: '0px 7px',
                            color: '#00000073'
                          }}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1024,
                                  component: (
                                    <WS2577003_CalendarEmptySub
                                      Lio_Date={this.formRef.current?.getFieldValue('DateChar')}
                                      onFinishScreen={(output) => {
                                        this.formRef.current?.setFieldsValue({
                                          DateChar: output.Lio_Date
                                        })
                                        this.setState({
                                          isChangeForm: true
                                        })
                                        this.closeModal()
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          >{<SearchOutlined style={{ fontSize: 16 }} />}</Button>
                        </Row>
                      </Form.Item>
                      <Form.Item style={{ width: 'calc(100% - 375px)', marginBottom: 10, marginRight: '5px' }} name="Expression_131" >
                        <Input readOnly style={style.input}
                          hidden={this.state.dataScreen.AcceptNum === 0}
                        />
                      </Form.Item>
                      <label style={{ ...style.label, marginBottom: 10 }}
                        hidden={!this.state.dataScreen.StsKyokai && this.state.dataScreen.ApprovalNum === 0}
                      >承認番号
                      </label>
                      <Form.Item style={{ width: '80px', marginBottom: 10 }} name="KyokaiAcceptNum"
                        hidden={!this.state.dataScreen.StsKyokai && this.state.dataScreen.ApprovalNum === 0}
                      >
                        <InputNumber maxLength={10} style={{ width: '100%' }} />
                      </Form.Item>
                    </Row>
                    <Row>
                      <label style={{ ...style.label, marginBottom: 10 }}>時間帯</label>
                      <Form.Item style={{ width: '150px', marginBottom: 10, marginRight: '5px' }}>
                        <Row>
                          <Form.Item style={{ width: 65, marginBottom: 10 }} name="TimeZone" hidden><Input /></Form.Item>
                          <Form.Item style={{ width: 65, marginBottom: 10 }} name="TimeZoneCopy" >
                            <NumberFormat format="##:##" placeholder="__:__" mask={_} type='text'
                              style={{
                                border: '1px solid #d9d9d9',
                                outline: '#d9d9d9',
                                width: 65,
                                height: 24,
                                borderRightColor: 'transparent'
                              }}
                              onBlur={(e) => {
                                if (e.target.value !== this.formRef.current?.getFieldValue('TimeZone')) {
                                  this.setState({
                                    isChangeForm: true
                                  })
                                  this.handleInputTime(e.target.value)
                                }
                              }}
                            />
                          </Form.Item>
                          <Button style={{
                            width: 32,
                            padding: '0px 7px',
                            color: '#00000073'
                          }}
                            onClick={() => {
                              this.showModalPeriodTimeInquiry_WS2553003()
                            }}
                          >{<SearchOutlined style={{ fontSize: 16 }} />}</Button>
                        </Row>
                      </Form.Item>
                    </Row>
                    <Row>
                      <label style={{ ...style.label, marginBottom: 10 }}>Ｎ　次</label>
                      <Form.Item style={{ width: '70px', marginBottom: 10 }} name="NClassify" >
                        <InputNumber maxLength={1}
                          onChange={() => {
                            this.setState({
                              isChangeForm: true
                            })
                          }} />
                      </Form.Item>
                    </Row>
                    <Row>
                      <label style={{ ...style.label, marginBottom: 10 }}>施　設</label>
                      <Form.Item style={{ width: '150px', marginBottom: 10 }} name="FacilityNumHospital_Out" >
                        <Select style={{ width: '150px' }}
                          onChange={() => {
                            this.setState({
                              isChangeForm: true
                            })
                          }}>
                          {this.state.FacilityNumHospitaList?.map((item, index) => (
                            <Option key={index} value={item.LinkedField}>{item.DisplayField} </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <label style={{ ...style.label, marginBottom: 10 }}>場所</label>
                      <Form.Item style={{ width: '70px', marginBottom: 10, marginRight: '5px' }} name="MedicalExamLocation" >
                        <Input readOnly disabled={this.state.FacilityNumHospital_Out !== 2} />
                      </Form.Item>
                      <Form.Item style={{ width: 'calc(100% - 365px)', marginBottom: 10 }} name="short_name" >
                        <Input style={style.input}
                          onChange={() => {
                            this.setState({
                              isChangeForm: true
                            })
                          }} />
                      </Form.Item>
                    </Row>
                    <Row>
                      <label style={{ ...style.label, marginBottom: 10 }}>備　考</label>
                      <Form.Item style={{ width: 'calc(100% - 70px)', marginBottom: 10 }} name="Remarks" >
                        <Input
                          onChange={() => {
                            this.setState({
                              isChangeForm: true
                            })
                          }} />
                      </Form.Item>
                    </Row>
                    <Row>
                      <label style={{ ...style.label, marginBottom: 10 }}> </label>
                      <Row justify="space-between" style={{ width: 'calc(100% - 70px)' }}>
                        <div style={{ width: 'calc(20% - 5px)', ...style.block }}> 保険者
                        </div>
                        <div style={{ width: 'calc(20% - 5px)', ...style.block }}> 事業所
                        </div>
                        <div style={{ width: 'calc(20% - 5px)', ...style.block }}>他団体
                        </div>
                        <div style={{ width: 'calc(20% - 5px)', ...style.block }}>窓　口
                        </div>
                        <div style={{ width: 'calc(20% - 5px)', ...style.block }}>合　計
                        </div>
                      </Row>
                    </Row>
                    <Row>
                      <label style={style.label}> </label>
                      <Row justify="space-between" style={{ width: 'calc(100% - 70px)' }}>
                        <Form.Item style={{ marginBottom: 0, width: 'calc(20% - 5px)' }} name="Expression_170">
                          <Input readOnly size="small" style={{ width: '100%', textAlign: 'right' }} />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0, width: 'calc(20% - 5px)' }} name="Expression_171">
                          <Input readOnly size="small" style={{ width: '100%', textAlign: 'right' }} />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0, width: 'calc(20% - 5px)' }} name="Expression_172">
                          <Input readOnly size="small" style={{ width: '100%', textAlign: 'right' }} />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0, width: 'calc(20% - 5px)' }} name="Expression_173">
                          <Input readOnly size="small" style={{ width: '100%', textAlign: 'right' }} />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0, width: 'calc(20% - 5px)' }} name="Expression_174">
                          <Input readOnly size="small" style={{ width: '100%', textAlign: 'right' }} />
                        </Form.Item>
                      </Row>
                    </Row>
                  </div>
                </Col>
              </Row>


              <Spin spinning={this.state.isLoadingTable}>
                <Row gutter={24}>
                  <Col span={8}>
                    <div style={{ background: '#1166BB', padding: '0.8em 0.8em 0 0.8em' }}>
                      <Row >
                        <div style={{ width: 16, marginRight: 5 }}><img src={GetImage(this.state.Expression_140)} alt='icon' /></div>
                        <Form.Item name="AddedOrUnnecessary" style={{ width: 100, marginRight: 10 }}>
                          <Select style={{ width: '100%' }}
                            onChange={(value) => {
                              this.getDataTableLeft()
                              this.setState({
                                AddedOrUnnecessary: value,
                                Expression_140: value === 2 ? 40 : value === 0 ? 20 : value === 1 ? 30 : null
                              })
                            }}
                          >
                            {this.state.dataScreen.ComboBox_AddedOrUnnecessary?.map((item, index) => (
                              <Option key={index} value={item.LinkedField}>{item.DisplayField} </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item name="ChangeClassify" valuePropName="checked" style={{ width: 60, marginRight: 10 }}>
                          <Checkbox checked={this.state.ChangeClassify}
                            onChange={(e) => {
                              // this.getDataTableLeft()
                              this.contractRedisplay()
                              this.setState({ ChangeClassify: e.target.checked })
                            }}
                          ><label style={{ color: 'white' }}>単品</label></Checkbox>
                        </Form.Item>
                        <div style={{ textAlign: 'right', width: 'calc(100% - 201px)' }}>

                          
                          <Button type="primary" style={{ marginRight: 5 }}
                            onClick={() => {
                              if (this.formRef.current?.getFieldValue('ConsultCourse')) {

                              } else {
                                this.showModalContractInfoInquiry()
                              }
                            }}
                          >最新</Button>

                          <Button type="primary"
                            onClick={() => {
                              this.showModalMedicalExamContentsInquirySub()
                            }}
                          >内訳</Button>
                        </div>
                      </Row>
                      <Row style={{ marginTop: 5 }}>
                        <div style={{ width: 16, marginRight: 5 }}></div>
                        <div style={{ width: 'calc(100% - 21px)' }}>
                          <Form.Item name="SearchChar" >
                            <Input />
                          </Form.Item>
                        </div>
                      </Row>
                    </div>
                    <div hidden={this.state.ChangeClassify}>
                      {/* Table OptionSelect */}
                      <div hidden={this.state.AddedOrUnnecessary !== 2} >
                        <Table
                          size="small"
                          dataSource={this.state.dataSourceSelect}
                          loading={this.state.isLoadingTableSelect}
                          rowKey={(res) => res.id}
                          bordered
                          scroll={{ y: 500 }}
                          pagination={false}
                        >

                          <Table.Column title="" dataIndex="Expression_22" width={30}
                            render={(value, record, index) => {
                              return <div style={{ textAlign: 'center' }}>
                                {record.Expression_22 ?
                                  <img style={{ width: 16 }} src={GetImage(record.Expression_22)} alt='icon' />
                                  : ''
                                }
                              </div>
                            }} />
                          <Table.Column title="名称" dataIndex="set_short_name" />
                          <Table.Column title="金額" dataIndex="Expression_1" align='center' width={80}
                            render={(value, record, index) => {
                              return <div style={{ textAlign: ' right', color: Color(this.checkColor(record.Expression_1))?.Foreground }}>
                                {record.Expression_1 === 0 ? '' : record.Expression_1?.toLocaleString()}
                              </div>
                            }} />
                          <Table.Column width={40}
                            render={(value, record, index) => (
                              <div style={{ textAlign: "center" }}>
                                <Dropdown
                                  trigger='click'
                                  style={{
                                    display: "inline-block",
                                  }} overlay={() => (
                                    <Menu >
                                      <Menu.Item key='追加1'
                                        onClick={() => {
                                          this.setChange(1, record, record.data_division, record.Expression_1)
                                        }}
                                      >
                                        <DoubleRightOutlined />追加
                                      </Menu.Item>
                                      <Menu.Item key='照会1' onClick={() => {
                                        this.setState({
                                          childModal: {
                                            ...this.state.childModal,
                                            visible: true,
                                            width: '50%',
                                            component: (
                                              <WS0333001_SetIncludesQuery
                                                Li_StartDate={this.state.dataScreen.Date}
                                                Li_SetCode={record.set_code ? record.set_code : ''}
                                                Li_CourseCode={this.formRef.current?.getFieldValue('ConsultCourse')}
                                                onFinishScreen={(obj) => {
                                                  this.setState({
                                                    childModal: {
                                                      ...this.state.childModal,
                                                      visible: false,
                                                    },
                                                  });
                                                }}
                                              />
                                            ),
                                          },
                                        })
                                      }}>
                                        照会
                                      </Menu.Item>
                                    </Menu>
                                  )}>
                                  <Button size="small" icon={<MoreOutlined />}></Button>
                                </Dropdown>
                              </div>
                            )}
                          />
                        </Table>

                      </div>

                      {/* Table SetSelect */}
                      <div hidden={this.state.AddedOrUnnecessary === 2} >
                        <Table
                          size="small"
                          dataSource={this.state.dataSourceSelect}
                          loading={this.state.isLoadingTableSelect}
                          rowKey={(res) => res.id}
                          bordered
                          scroll={{ y: 500 }}
                          pagination={false}
                        >

                          <Table.Column title="" dataIndex="Expression_23" width={30}
                            render={(value, record, index) => {
                              return <div style={{ textAlign: 'center' }}>
                                {record.Expression_23 ?
                                  <img style={{ width: 16 }} src={GetImage(record.Expression_23)} alt='icon' />
                                  : ''
                                }
                              </div>
                            }} />
                          <Table.Column title="名称" dataIndex="set_short_name" />
                          <Table.Column title="金額" dataIndex="UnitPrice" align='center' width={80}
                            render={(value, record, index) => {
                              return <div style={{ textAlign: ' right', color: Color(this.checkColor(record.UnitPrice)).Foreground }}>
                                {record.UnitPrice === 0 ? '' : record.UnitPrice?.toLocaleString()}
                              </div>
                            }} />
                          <Table.Column width={40}
                            render={(value, record, index) => (
                              <div style={{ textAlign: "center" }}>
                                <Dropdown
                                  trigger='click'
                                  style={{
                                    display: "inline-block",
                                  }} overlay={() => (
                                    <Menu >
                                      <Menu.Item key='追加2' hidden={record.UnitPrice > 0}
                                        onClick={() => {
                                          this.setChange(1, record, this.state.AddedOrUnnecessary === 0 ? 50 : 60)
                                        }}>
                                        <DoubleRightOutlined />追加
                                      </Menu.Item>
                                      <Menu.Item key='保険者2' hidden={record.UnitPrice <= 0 || this.state.dataScreen.InsurerModify !== 0}
                                        onClick={() => {
                                          this.setChange(1, record, this.state.AddedOrUnnecessary === 0 ? 50 : 60)
                                        }}>
                                        <DoubleRightOutlined /> 保険者
                                      </Menu.Item>
                                      <Menu.Item key='事業所2' hidden={record.UnitPrice <= 0 || this.state.dataScreen.OfficeModify !== 0}
                                        onClick={() => {
                                          this.setChange(2, record, this.state.AddedOrUnnecessary === 0 ? 50 : 60)
                                        }}>
                                        <DoubleRightOutlined /> 事業所
                                      </Menu.Item>
                                      <Menu.Item key='他団体2' hidden={record.UnitPrice <= 0 || this.state.dataScreen.OtherGroupModify !== 0}
                                        onClick={() => {
                                          this.setChange(3, record, this.state.AddedOrUnnecessary === 0 ? 50 : 60)
                                        }}>
                                        <DoubleRightOutlined /> 他団体
                                      </Menu.Item>
                                      <Menu.Item key='個人１' hidden={record.UnitPrice <= 0 || this.state.dataScreen.Personal1Modify !== 0}
                                        onClick={() => {
                                          this.setChange(4, record, this.state.AddedOrUnnecessary === 0 ? 50 : 60)
                                        }}>
                                        <DoubleRightOutlined /> 個人１
                                      </Menu.Item>
                                      <Menu.Item key='個人２' hidden={record.UnitPrice <= 0 || this.state.dataScreen.Person2Modify !== 0}
                                        onClick={() => {
                                          this.setChange(5, record, this.state.AddedOrUnnecessary === 0 ? 50 : 60)
                                        }}>
                                        <DoubleRightOutlined /> 個人２
                                      </Menu.Item>
                                      <Menu.Item key='個人３' hidden={record.UnitPrice <= 0 || this.state.dataScreen.Personal3Modify !== 0}
                                        onClick={() => {
                                          this.setChange(6, record, this.state.AddedOrUnnecessary === 0 ? 50 : 60)
                                        }}>
                                        <DoubleRightOutlined /> 個人３
                                      </Menu.Item>
                                      <Menu.Item key='照会2' onClick={() => {
                                        this.setState({
                                          childModal: {
                                            ...this.state.childModal,
                                            visible: true,
                                            width: '50%',
                                            component: (
                                              <WS0333001_SetIncludesQuery
                                                Li_StartDate={this.state.dataScreen.Date}
                                                Li_SetCode={record.set_code ? record.set_code : ''}
                                                Li_CourseCode={this.formRef.current?.getFieldValue('ConsultCourse')}
                                                onFinishScreen={(obj) => {
                                                  this.setState({
                                                    childModal: {
                                                      ...this.state.childModal,
                                                      visible: false,
                                                    },
                                                  });
                                                }}
                                              />
                                            ),
                                          },
                                        })
                                      }}>
                                        照会
                                      </Menu.Item>
                                    </Menu>
                                  )}>
                                  <Button size="small" icon={<MoreOutlined />}></Button>
                                </Dropdown>
                              </div>
                            )}
                          />
                        </Table>

                      </div>
                    </div>

                    {/* Table InspectSelect */}
                    <div hidden={!this.state.ChangeClassify}>
                      <Table
                        size="small"
                        dataSource={this.state.dataSourceSelect}
                        loading={this.state.isLoadingTableSelect}
                        rowKey={(res) => res.id}
                        bordered
                        scroll={{ y: 500 }}
                        pagination={false}
                      >

                        <Table.Column title="" dataIndex="Expression_12" width={30}
                          render={(value, record, index) => {
                            return <div style={{ textAlign: 'center' }}>
                              {record.Expression_12 ?
                                <img style={{ width: 16 }} src={GetImage(record.Expression_12)} alt='icon' />
                                : ''
                              }
                            </div>
                          }} />
                        <Table.Column title="名称" dataIndex="exam_name" />
                        <Table.Column width={40}
                          render={(value, record, index) => (
                            <div style={{ textAlign: "center" }}>
                              <Dropdown
                                trigger='click'
                                style={{
                                  display: "inline-block",
                                }} overlay={() => (
                                  <Menu >
                                    <Menu.Item key='追加3'
                                      onClick={() => {
                                        this.setChange(1, record, this.state.AddedOrUnnecessary === 0 ? 50 : 60)
                                      }}
                                    >
                                      <DoubleRightOutlined />追加
                                    </Menu.Item>
                                  </Menu>
                                )}>
                                <Button size="small" icon={<MoreOutlined />}></Button>
                              </Dropdown>
                            </div>
                          )}
                        />
                      </Table>

                    </div>

                  </Col>
                  <Col span={16} style={{ textAlign: 'right' }}>
                    <div >
                      <Table
                        size="small"
                        dataSource={this.state.dataSourceInspectChange}
                        loading={this.state.isLoadingTableInspectChange}
                        rowKey={(res) => res.id}
                        bordered
                        scroll={{ y: 500 }}
                        pagination={false}
                      >

                        <Table.Column title="" dataIndex="Expression_1" width={30}
                          render={(value, record, index) => {
                            return <div style={{ textAlign: 'center' }}>
                              {record.Expression_1 ?
                                <img style={{ width: 16 }} src={GetImage(record.Expression_1)} alt='icon' />
                                : ''
                              }
                            </div>
                          }} />
                        <Table.Column title='名称' dataIndex="Expression_17" />
                        <Table.Column
                          title={
                            <span style={{
                              color: this.state.dataScreen.InsurerModify == 0 ? '' : Color(110).Foreground
                            }}>保険者</span>
                          }
                          dataIndex="W2InsurerTotal"
                          render={(value, record, index) => {
                            return <div style={{ textAlign: 'right', color: Color(this.checkColor(record.W2InsurerTotal)).Foreground }}>
                              <span>{record.W2InsurerTotal === 0 ? '' : record.W2InsurerTotal?.toLocaleString()}</span>
                            </div>
                          }}
                        />
                        <Table.Column
                          title={
                            <span style={{
                              color: this.state.dataScreen.OfficeModify == 0 ? '' : Color(110).Foreground
                            }}>事業所</span>
                          }
                          dataIndex="W2OfficeTotal"
                          render={(value, record, index) => {
                            return <div style={{ textAlign: 'right', color: Color(this.checkColor(record.W2OfficeTotal)).Foreground }}>
                              <span>{record.W2OfficeTotal === 0 ? '' : record.W2OfficeTotal?.toLocaleString()}</span>
                            </div>
                          }}
                        />
                        <Table.Column
                          title={
                            <span style={{
                              color: this.state.dataScreen.OtherGroupModify == 0 ? '' : Color(110).Foreground
                            }}>他団体</span>
                          }
                          dataIndex="W2OtherGroupTotal"
                          render={(value, record, index) => {
                            return <div style={{ textAlign: 'right', color: Color(this.checkColor(record.W2OtherGroupTotal)).Foreground }}>
                              <span>{record.W2OtherGroupTotal === 0 ? '' : record.W2OtherGroupTotal?.toLocaleString()}</span>
                            </div>
                          }}
                        />
                        <Table.Column
                          title={
                            <span style={{
                              color: (this.state.dataScreen.Personal1Modify + this.state.dataScreen.Person2Modify + this.state.dataScreen.Personal3Modify) == 0 ? '' : Color(110).Foreground
                            }}>個　人</span>
                          }
                          dataIndex="Expression_12"
                          render={(value, record, index) => {
                            return <div style={{ textAlign: 'right', color: Color(this.checkColor(record.Expression_12)).Foreground }}>
                              <span>{record.Expression_12 === 0 ? '' : record.Expression_12?.toLocaleString()}</span>
                            </div>
                          }}
                        />
                        <Table.Column title="合　計" dataIndex="Expression_13"
                          render={(value, record, index) => {
                            return <div style={{ textAlign: 'right', color: Color(this.checkColor(record.Expression_13)).Foreground }}>
                              <span>{record.Expression_13 === 0 ? '' : record.Expression_13?.toLocaleString()}</span>
                            </div>
                          }}
                        />
                        <Table.Column width={40}
                          title={
                            <div style={{ textAlign: "center" }}>
                              <Button
                                disabled={this.state.dataSourceInspectChange.length === 0}
                                size='small'
                                onClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 400,
                                      component: (
                                        <WS2537046_SetAdd
                                          Li_ContractType={this.state.dataScreen.ContractType}
                                          Li_ContractClassifyCode={this.state.dataScreen.ContractClassifyCode}
                                          Li_ContractStartDate={this.state.dataScreen.ContractDate}
                                          Li_ContractNum={this.state.dataScreen.ContractNum}
                                          Li_Date={this.formRef.current?.getFieldValue("DateChar") ? moment(this.formRef.current?.getFieldValue("DateChar")).format('YYYY/MM/DD') : ''}
                                          Lio_ConsultCourse={this.formRef.current?.getFieldValue('ConsultCourse')}
                                          Li_ReserveNum={this.formRef.current?.getFieldValue('ReserveNum')}
                                          Li_PersonalNumId={this.formRef.current?.getFieldValue('PersonalNumId')}
                                          Li_OfficeCode={this.formRef.current?.getFieldValue('OfficeCode')}
                                          Li_BranchStoreCode={this.formRef.current?.getFieldValue('BranchStoreCode') || 0}
                                          Li_ContractAgeCalculateDivision={''}
                                          Li_ApplicationAttributeReDisplay={this.state.dataScreen.ApplicationAttributeReDisplay}
                                          Li_Option={''}
                                          FacilityNumHospital_Out={this.formRef.current?.getFieldValue('FacilityNumHospital_Out')}
                                          Am_PmDivision={this.state.dataScreen.Am_PmDivision}
                                          NClassify={this.formRef.current?.getFieldValue('NClassify')}
                                          onFinishScreen={(output) => {
                                            if (output.Lo_StsReturn) {
                                              this.getDataTableSetSelect()
                                              this.getDataTableInspectChange()
                                              this.setState({
                                                isChangeData: true
                                              })
                                            }
                                            this.closeModal()
                                          }}
                                        />),
                                    },
                                  })

                                }}
                                type="primary"
                                icon={<PlusOutlined />}
                              >
                              </Button>
                            </div>
                          }
                          render={(value, record, index) => (
                            <div style={{ textAlign: "center" }}>
                              <Dropdown
                                trigger='click'
                                style={{
                                  display: "inline-block",
                                }} overlay={() => (
                                  <Menu >
                                    <Menu.Item key='削除4' hidden={record.W2_change_type < 40 || record.W2_change_type > 60}
                                      onClick={() => {
                                        this.setDelete(record)
                                      }}>
                                      <DoubleLeftOutlined />削除
                                    </Menu.Item>
                                    <Menu.Item key='照会4'
                                      onClick={() => {
                                        this.setState({
                                          childModal: {
                                            ...this.state.childModal,
                                            visible: true,
                                            width: '50%',
                                            component: (record.W2_change_type >= 40 && record.W2_change_type <= 60) ?
                                              <WS0333001_SetIncludesQuery
                                                Li_StartDate={this.state.dataScreen.Date}
                                                Li_SetCode={record.W2_set_inspect_cd ? record.W2_set_inspect_cd : ''}
                                                Li_CourseCode={this.formRef.current?.getFieldValue('ConsultCourse')}
                                                onFinishScreen={(obj) => {
                                                  this.closeModal()
                                                }}
                                              /> :
                                              <WS0332001_ContractCourseBreakdownInquiry
                                                Li_ContractType={this.state.dataScreen.ContractType}
                                                Li_ContractOrgCode={this.state.dataScreen.ContractClassifyCode}
                                                Li_ContractStartDate={this.state.dataScreen.ContractDate}
                                                Li_ContractNum={this.state.dataScreen.ContractNum}
                                                Li_CourseCode={this.formRef.current?.getFieldValue('ConsultCourse')}
                                                onFinishScreen={(obj) => {
                                                  this.closeModal()
                                                }}
                                              />,
                                          },
                                        })
                                      }}
                                    >
                                      照会
                                    </Menu.Item>
                                    <Menu.Item key='変更4'
                                      onClick={() => {
                                        PersonalReserveProcessAction.userAction3({
                                          record,
                                          ...this.formRef.current.getFieldsValue(),
                                        })
                                          .then(res => {
                                            if (res.data?.message?.indexOf('WS0311005') !== -1) {
                                              const propData = res.data.variables;
                                              this.setState({
                                                childModal: {
                                                  ...this.state.childModal,
                                                  visible: true,
                                                  width: '50%',
                                                  component: (
                                                    <WS0311005_MoneyAmountInputSub
                                                      Li_TaxClassify={propData?.Li_TaxClassify}
                                                      Li_Rounding={propData?.Li_Rounding}
                                                      Li_TaxRate={propData?.Li_TaxRate}
                                                      Li_OtherGroupDivision={propData?.Li_OtherGroupDivision}
                                                      Li_Title={propData?.Li_Title}
                                                      Lio_InsurerUnitPriceAmount={propData?.Lio_InsurerUnitPriceAmount === 0 ? "" : propData?.Lio_InsurerUnitPriceAmount}
                                                      Lio_InsurerTax={propData?.Lio_InsurerTax === 0 ? "" : propData?.Lio_InsurerTax}
                                                      Lio_InsurerTotal={propData?.Lio_InsurerTotal === 0 ? "" : propData?.Lio_InsurerTotal}
                                                      Lio_OfficeUnitPriceAmount={propData?.Lio_OfficeUnitPriceAmount === 0 ? "" : propData?.Lio_OfficeUnitPriceAmount}
                                                      Lio_OfficeTax={propData?.Lio_OfficeTax === 0 ? "" : propData?.Lio_OfficeTax}
                                                      Lio_OfficeTotal={propData?.Lio_OfficeTotal === 0 ? "" : propData?.Lio_OfficeTotal}
                                                      Lio_OtherGroupUnitPriceAmount={propData?.Lio_OtherGroupUnitPriceAmount === 0 ? "" : propData?.Lio_OtherGroupUnitPriceAmount}
                                                      Lio_OtherGroupTax={propData?.Lio_OtherGroupTax === 0 ? "" : propData?.Lio_OtherGroupTax}
                                                      Lio_OtherGroupTotal={propData?.Lio_OtherGroupTotal === 0 ? "" : propData?.Lio_OtherGroupTotal}
                                                      Lio_Personal1UnitPriceAmount={propData?.Lio_Personal1UnitPriceAmount === 0 ? "" : propData?.Lio_Personal1UnitPriceAmount}
                                                      Lio_Personal1Tax={propData?.Lio_Personal1Tax === 0 ? "" : propData?.Lio_Personal1Tax}
                                                      Lio_Personal1Total={propData?.Lio_Personal1Total === 0 ? "" : propData?.Lio_Personal1Total}
                                                      Lio_Person2UnitPriceAmount={propData?.Lio_Person2UnitPriceAmount === 0 ? "" : propData?.Lio_Person2UnitPriceAmount}
                                                      Lio_Person2Tax={propData?.Lio_Person2Tax === 0 ? "" : propData?.Lio_Person2Tax}
                                                      Lio_Person2Total={propData?.Lio_Person2Total === 0 ? "" : propData?.Lio_Person2Total}
                                                      Lio_Personal3UnitPriceAmount={propData?.Lio_Personal3UnitPriceAmount === 0 ? "" : propData?.Lio_Personal3UnitPriceAmount}
                                                      Lio_Personal3Tax={propData?.Lio_Personal3Tax === 0 ? "" : propData?.Lio_Personal3Tax}
                                                      Lio_Personal3Total={propData?.Lio_Personal3Total === 0 ? "" : propData?.Lio_Personal3Tax}
                                                      Lio_StsChange={propData?.Lio_StsChange}
                                                      Li_Protection={propData?.Li_Protection}

                                                      onFinishScreen={(output) => {
                                                        let data = {
                                                          Lio_InsurerTax: output.Lio_InsurerTax,
                                                          Lio_InsurerTotal: output.Lio_InsurerTotal,
                                                          Lio_InsurerUnitPriceAmount: output.Lio_InsurerUnitPriceAmount,
                                                          Lio_OfficeTax: output.Lio_OfficeTax,
                                                          Lio_OfficeTotal: output.Lio_OfficeTotal,
                                                          Lio_OfficeUnitPriceAmount: output.Lio_OfficeUnitPriceAmount,
                                                          Lio_OtherGroupTax: output.Lio_OtherGroupTax,
                                                          Lio_OtherGroupTotal: output.Lio_OtherGroupTotal,
                                                          Lio_OtherGroupUnitPriceAmount: output.Lio_OtherGroupUnitPriceAmount,
                                                          Lio_Person2Tax: output.Lio_Person2Tax,
                                                          Lio_Person2Total: output.Lio_Person2Total,
                                                          Lio_Person2UnitPriceAmount: output.Lio_Person2UnitPriceAmount,
                                                          Lio_Personal1Tax: output.Lio_Personal1Tax,
                                                          Lio_Personal1Total: output.Lio_Personal1Total,
                                                          Lio_Personal1UnitPriceAmount: output.Lio_Personal1UnitPriceAmount,
                                                          Lio_Personal3Tax: output.Lio_Personal3Tax,
                                                          Lio_Personal3Total: output.Lio_Personal3Total,
                                                          Lio_Personal3UnitPriceAmount: output.Lio_Personal3UnitPriceAmount,
                                                          W2_change_type: record.W2_change_type,
                                                          W2_set_inspect_cd: record.W2_set_inspect_cd
                                                        }

                                                        let dataTaxs = [...this.state.dataTax]
                                                        let index = dataTaxs.findIndex(x => x.W2_set_inspect_cd === record.W2_set_inspect_cd)
                                                        if (index === -1) {
                                                          dataTaxs.push(data)
                                                        } else {
                                                          dataTaxs[index] = data
                                                        }
                                                        this.setState({
                                                          dataTax: dataTaxs
                                                        })
                                                        PersonalReserveProcessAction.userAction3({
                                                          ...this.formRef.current.getFieldsValue(),
                                                          record,
                                                          MoneyAmountInputSub: output,
                                                          xpaFrame: 2,
                                                          StsUpdate: true,
                                                        })
                                                          .then(res => {
                                                            this.getDataTableInspectChange()
                                                            this.setState({
                                                              isChangeData: true
                                                            })
                                                          });
                                                        if (output.Lio_StsChange) {

                                                        }
                                                        this.closeModal()
                                                      }}
                                                    />),
                                                },
                                              })
                                            }
                                          });
                                      }}
                                    >変更</Menu.Item>
                                  </Menu>
                                )}>
                                <Button size='small' icon={<MoreOutlined />}></Button>
                              </Dropdown>
                            </div>
                          )}
                        />
                      </Table>
                    </div>
                  </Col>
                </Row>
              </Spin>
            </Form>

          </Spin>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          destroyOnClose={true}
          onCancel={() => {
            if (this.state.nameScreen === 'WS0289012_ContractInfoInquiry' && this.state.isUnValidConsultCourse) {
              Modal.error({
                title: '受診ｺｰｽを入力してください',
                width: 310
              })
              this.setState({
                nameScreen: ''
              })
            }
            this.closeModal()
          }}
        />
        <ModalResizableDraggable
          width={this.state.childModalResize.width}
          height={this.state.childModalResize.height}
          visible={this.state.childModalResize.visible}
          component={this.state.childModalResize.component}
          onCancel={this.closeModalResize}
        />
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2537001_PersonalReserveProcess);
