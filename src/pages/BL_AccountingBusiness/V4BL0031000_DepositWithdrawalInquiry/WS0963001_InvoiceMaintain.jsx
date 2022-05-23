import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Form, Input, Button, Select, Table, Modal, DatePicker, Row, Col, Space, InputNumber, message, Spin, } from "antd";

import { MoreOutlined, QuestionCircleOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

import WS0975001_BillingInquiry from "../V4BL0030000_BillingInquiry/WS0975001_BillingInquiry";
import WS0963004_TamperProofRelease from "./WS0963004_TamperProofRelease";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx";
import WS0084001_PostCodeSearchEngine from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0084001_PostCodeSearchEngine";
import WS0967003_BillingNameQuerySub from "./WS0967003_BillingNameQuerySub";
import WS0961001_BillingIntegration from "../V4BL0008000_BillingIntegration/WS0961001_BillingIntegration";
import WS0964001_Itemized from "./WS0964001_Itemized";
import WS2585001_OfficeInfoInquirySub from "pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import WS0339001_InsurerInfoMaintain from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0339001_InsurerInfoMaintain";

import InvoiceMaintainAction from "redux/AccountingBusiness/DepositWithdrawalInquiry/InvoiceMaintain.action";
import moment from "moment-timezone";
import { number_format } from "helpers/CommonHelpers";
import WS0947001_Invoice from "../V4BL0008000_BillingIntegration/WS0947001_Invoice";


const grid = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const smGrid = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
class WS0963001_InvoiceMaintain extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_BillingManageNum: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "請求書保守";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingForm: false,

      isLoadingTable: false,
      dataSource: [],
      selectedRow: {},
      selectedRowKeys: [],
      indexTable: 0,

      ClassifyState: null,
      TaxClassifyState: null,
      TaxCalculateUnit: null,

      dataScreen: {
        DisplayProcessDuringExec: false,
        PersonalNumAddressSearch: '',
        ProtectionFlag: 0,
        IntegrationFlag: 0,
        DeleteFlag: 0,
        ProcessDivision: 0,
        DateTmp: '',
        OfficeCode: '',
        BranchStoreCode: 0,
        PersonalCode: '',
        InsurerCode: 0,
        ListStyleNum: []
      },

      isClose974: false,
    };
  }

  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      BillingManageNum: this.props.Li_BillingManageNum || ''
    })
    this.getScreenData()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.formRef.current?.setFieldsValue({
        BillingManageNum: this.props.Li_BillingManageNum || ''
      })
      this.getScreenData()
    }
  }

  getScreenData() {
    let params = {
      Li_BillingManageNum: this.formRef.current?.getFieldValue('BillingManageNum'),
      DisplayProcessDuringExec: this.state.dataScreen.DisplayProcessDuringExec,
      PersonalNumAddressSearch: this.state.dataScreen.PersonalNumAddressSearch,
      ProtectionFlag: this.state.dataScreen.ProtectionFlag,
      IntegrationFlag: this.state.dataScreen.IntegrationFlag,
      DeleteFlag: this.state.dataScreen.DeleteFlag,
      ProcessDivision: this.state.dataScreen.ProcessDivision,
      DateTmp: this.state.dataScreen.DateTmp,
      OfficeCode: this.state.dataScreen.OfficeCode,
      BranchStoreCode: this.state.dataScreen.BranchStoreCode,
      PersonalCode: this.state.dataScreen.PersonalCode,
      InsurerCode: this.state.dataScreen.InsurerCode,
      DeleteButtonEnable: true,
    }

    this.setState({ isLoadingForm: true })
    InvoiceMaintainAction.getScreenData(params)
      .then(async (res) => {
        let data = {
          ...this.state.dataScreen,
          ...res?.data
        }
        await this.setState({
          dataScreen: data
        })
        this.getInitData()
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  getInitData() {
    let params = {
      ClaimDateIssue: this.state.dataScreen.ClaimDateIssue,
      OptionSk0002: this.state.dataScreen.OptionSk0002,
      Classify: this.state.dataScreen.Classify,
      SelectListForm: this.state.dataScreen.SelectListForm,
    }

    InvoiceMaintainAction.getInitData(params)
      .then(async (res) => {
        let data = {
          ...this.state.dataScreen,
          ...res?.data
        }
        await this.setState({
          dataScreen: data
        })
        this.getDisplayData()
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  getDisplayData() {
    let params = {
      DisplayProcessDuringExec: this.state.dataScreen.DisplayProcessDuringExec ? 1 : 0,
      BillingManageNum: this.state.dataScreen.BillingManageNum,
      Classify: this.state.dataScreen.Classify,
      integrated_destination_management_number: this.state.dataScreen.billingdata_2_Dt0601?.integrated_destination_management_number,
      billing_management_number: this.state.dataScreen.BillingManageNum,
      SpecifyValid: this.state.dataScreen.SpecifyValid ? 1 : 0,
      ExistsDetailedData: this.state.dataScreen.ExistsDetailedData ? 1 : 0,
      SpecifyRemarksNumBytes: this.state.dataScreen.SpecifyRemarksNumBytes,
      ExistsBillingControlNum: this.state.dataScreen.ExistsBillingControlNum ? 1 : 0,
      OptionSk0003: this.state.dataScreen.OptionSk0003,
      KanRemarksNumBytes: this.state.dataScreen.KanRemarksNumBytes,
    }

    InvoiceMaintainAction.getDisplayData(params)
      .then(async (res) => {
        let data = res?.data

        let code = data.Classify === 4 ? data.InsurerCode
          : (data.Classify === 5 || data.Classify === 6) ? data.OfficeCode
            : data.Classify === 9 ? data.PersonalCode : ''

        let dataSc = {
          ...this.state.dataScreen,
          ...res?.data,
          Code: code
        }

        let dataResult = {
          ...data,
          BillingDateChar: moment(data.BillingDateChar),
          ClaimDateOfIssueChar: moment(data.ClaimDateOfIssueChar),
          BillingPeriodBeginningChar: moment(data.BillingPeriodBeginningChar),
          BillingPeriodFinalChar: moment(data.BillingPeriodFinalChar),
          code: this.state.dataScreen.code,
          Expression_26: this.state.dataScreen.Expression_26,
          Code: code
        }
        this.formRef.current?.setFieldsValue(dataResult)
        await this.setState({
          isLoadingForm: false,
          TaxCalculateUnit: res?.data?.TaxCalculateUnit,
          ClassifyState: res?.data?.Classify,
          TaxClassifyState: res?.data?.TaxClassify,
          dataScreen: dataSc,
        })

        this.getDataTable(true)
      })
      .catch((err) => {
        this.reSetFormField()
        this.setState({ isLoadingForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  getDataTable(reload) {
    let params = {
      Li_Modify: this.state.dataScreen.StsKanModify ? 1 : 0,
      ProtectionFlag: this.state.dataScreen.ProtectionFlag,
      IntegrationFlag: this.state.dataScreen.IntegrationFlag,
      CompletedEffective: this.state.dataScreen.CompletedEffective ? 1 : 0,
      KanRemarksNumBytes: this.state.dataScreen.KanRemarksNumBytes,
    }
    this.setState({ isLoadingTable: true })
    InvoiceMaintainAction.getSubContent(params)
      .then(async (res) => {
        let index = reload ? 0 : this.state.indexTable
        await this.setState({
          dataSource: res && res.data.length > 0 ? res.data : [],
          isLoadingTable: false,

          selectedRow: res && res.data.length > 0 ? res.data[index] : {},
          selectedRowKeys: res && res.data.length > 0 ? [res.data[index]] : [],
          indexTable: index,
        })
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

  reSetFormField() {
    let date = new Date()
    this.formRef.current?.resetFields()
    this.formRef.current?.setFieldsValue({
      BillingManageNum: this.props.Li_BillingManageNum || '',
      Classify: 5,
      ClaimNum: 0,
      Expression_26: '解 除',
      TaxCalculateUnit: 0,
      LessThanTaxCircle: 0,
      BillingDateChar: moment(date),
      BillingPeriodBeginningChar: moment(new Date(date.getFullYear(), date.getMonth(), 1)),
      BillingPeriodFinalChar: moment(new Date(date.getFullYear(), date.getMonth() + 1, 0))
    })

    let data = {
      KeyEditingPermission: false,
      ProcessDivision: 0,
      Expression_26: '解 除',
    }

    this.setState({
      dataSource: [],
      isLoadingTable: false,

      selectedRow: {},
      selectedRowKeys: [],
      indexTable: 0,
      dataScreen: data
    })
  }

  eventGzoomDestination() {
    let params = {
      ProtectionFlag: this.state.dataScreen.ProtectionFlag,
      IntegrationFlag: this.state.dataScreen.IntegrationFlag,
      Classify: this.state.ClassifyState,
      Destination: this.formRef.current?.getFieldValue('Destination'),
      InsurerCode: this.formRef.current?.getFieldValue('InsurerCode'),
      PersonalCode: this.formRef.current?.getFieldValue('PersonalCode'),
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      PersonalNumAddressSearch: this.formRef.current?.getFieldValue('PersonalCode'),
      InsuranceNumAddressSearch: this.formRef.current?.getFieldValue('InsurerCode'),
      OfficeCodeEnvelopesSearch: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCodeEnvelopesSearch: this.formRef.current?.getFieldValue('BranchStoreCode'),
      DestinationZipCode: this.formRef.current?.getFieldValue('DestinationZipCode'),
      Address1: this.formRef.current?.getFieldValue('Address1'),
      Address2: this.formRef.current?.getFieldValue('Address2'),
    }
    InvoiceMaintainAction.eventGzoomDestination(params)
      .then(async (res) => {
        let data = {
          ...this.state.dataScreen,
          ...res?.data
        }
        this.setState({
          dataScreen: data
        })
        this.formRef.current?.setFieldsValue({
          Address1: res?.data?.Address1,
          Address2: res?.data?.Address2,
          Destination: res?.data?.Destination,
          DestinationZipCode: res?.data?.DestinationZipCode
        })
        this.changeScreenEditting(true)
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

  eventF7(status) {
    let params = {
      flag_WS0964001: status, // 0 open 964, 1 next
      SpecifyValid: this.state.dataScreen.SpecifyValid,
      ProcessDivision: this.state.dataScreen.ProcessDivision,
      ProtectionFlag: this.state.dataScreen.ProtectionFlag,
      DeleteFlag: this.state.dataScreen.DeleteFlag,
      IntegrationFlag: this.state.dataScreen.IntegrationFlag,
      OptionSk0002: this.state.dataScreen.OptionSk0002,
      PeopleNum: this.state.dataScreen.PeopleNum,
      Classify: this.state.ClassifyState,
      Destination: this.formRef.current?.getFieldValue('Destination'),
      BillingManageNum: this.formRef.current?.getFieldValue('BillingManageNum'),
      Subject: this.formRef.current?.getFieldValue('Subject'),
      BillingPeriodBeginning: this.formRef.current?.getFieldValue('BillingPeriodBeginning'),
      BillingPeriodFinal: this.formRef.current?.getFieldValue('BillingPeriodFinal'),
      BillingPeriodBeginningChar: this.formRef.current?.getFieldValue('BillingPeriodBeginningChar')?.format('YYYY/MM/DD'),
      BillingPeriodFinalChar: this.formRef.current?.getFieldValue('BillingPeriodFinalChar')?.format('YYYY/MM/DD'),
      AmountBilled: this.formRef.current?.getFieldValue('AmountBilled'),
      TaxRate_1: this.formRef.current?.getFieldValue('TaxRate') / 100,
      LessThanTaxCircle: this.formRef.current?.getFieldValue('LessThanTaxCircle'),
      TaxCalculateUnit: this.formRef.current?.getFieldValue('TaxCalculateUnit'),
      TaxClassify: this.formRef.current?.getFieldValue('TaxClassify'),
      TotalAmount: this.formRef.current?.getFieldValue('TotalAmount'),
      Tax: this.formRef.current?.getFieldValue('Tax'),
      Remarks: this.formRef.current?.getFieldValue('Remarks'),
    }
    InvoiceMaintainAction.eventF7(params)
      .then(async (res) => {
        if (status === 0) {
          this.showModalItemzed_964(res?.data?.variables)
        } else {
          let data = {
            ...this.state.dataScreen,
            TaxCalculateUnit: res?.data?.TaxCalculateUnit,
            LessThanTaxCircle: res?.data?.LessThanTaxCircle,
            TaxClassify: res?.data?.TaxClassify,
            TaxRate_1: res?.data?.TaxRate_1,
            TotalAmount: res?.data?.TotalAmount,
            Tax: res?.data?.Tax,
            AmountBilled: res?.data?.AmountBilled,
            PeopleNum: res?.data?.PeopleNum,
          }

          this.setState({
            dataScreen: data
          })

          this.formRef.current?.setFieldsValue({
            TaxCalculateUnit: data.TaxCalculateUnit,
            LessThanTaxCircle: data.LessThanTaxCircle,
            TotalAmount: data.TotalAmount,
            Tax: data.Tax,
            AmountBilled: data.AmountBilled
          })
          this.getDataTable(true)
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

  eventF11_LossTreatment() {
    const { DeleteFlag } = this.state.dataScreen
    let title = ''
    if (DeleteFlag == 0) {
      title = '欠損処理を行いますか？'
    }

    if (DeleteFlag == 2) {
      title = '欠損処理を解除しますか？'
    }

    Modal.confirm({
      width: 300,
      title: title,
      icon: <QuestionCircleOutlined style={{ color: '#1890ff' }} />,
      onOk: () => {
        this.eventF11()
      }
    })
  }

  eventF11_DeleteProcess() {
    const { DeleteFlag } = this.state.dataScreen
    let title = ''
    if (DeleteFlag == 0) {
      title = 'データを削除しますか？'
    }

    if (DeleteFlag == 1) {
      title = 'データを復活しますか？'
    }

    Modal.confirm({
      width: 300,
      title: title,
      icon: <QuestionCircleOutlined style={{ color: '#1890ff' }} />,
      onOk: () => {
        this.eventF11()
      }
    })
  }

  eventF11() {
    let params = {
      // SelectListForm_1:this.state.dataScreen.SelectListForm_1,
      IntegrationFlag: this.state.dataScreen.IntegrationFlag,
      ProtectionFlag: this.state.dataScreen.ProtectionFlag,
      DeleteFlag: this.state.dataScreen.DeleteFlag,
      ProcessDivision: this.state.dataScreen.ProcessDivision,
      MsgSts: 6,
      CompletedEffective: this.state.dataScreen.CompletedEffective ? 1 : 0,
      BillingDate: this.state.dataScreen.BillingDate,
      ClaimDateIssue: this.state.dataScreen.ClaimDateIssue,
      OptionSk0003: this.state.dataScreen.OptionSk0003,
      PeopleNum: this.state.dataScreen.PeopleNum,
      SelectListForm: this.state.dataScreen.SelectListForm_1,
      BillingManageNumYearsBeforeChange: this.state.dataScreen.BillingManageNumYearsBeforeChange,
      deposit_price: this.state.dataScreen.billingdata_2_Dt0601?.deposit_price,
      Classify: this.state.ClassifyState,
      ClaimNum: this.formRef.current?.getFieldValue('ClaimNum'),
      Destination: this.formRef.current?.getFieldValue('Destination'),
      BillingManageNum: this.formRef.current?.getFieldValue('BillingManageNum'),
      Subject: this.formRef.current?.getFieldValue('Subject'),
      BillingPeriodBeginning: this.formRef.current?.getFieldValue('BillingPeriodBeginning'),
      BillingPeriodFinal: this.formRef.current?.getFieldValue('BillingPeriodFinal'),
      DestinationZipCode: this.formRef.current?.getFieldValue('DestinationZipCode'),
      Address1: this.formRef.current?.getFieldValue('Address1'),
      Address2: this.formRef.current?.getFieldValue('Address2'),
      AmountBilled: this.formRef.current?.getFieldValue('AmountBilled'),
      LessThanTaxCircle: this.formRef.current?.getFieldValue('LessThanTaxCircle'),
      TaxCalculateUnit: this.formRef.current?.getFieldValue('TaxCalculateUnit'),
      TaxClassify: this.formRef.current?.getFieldValue('TaxClassify'),
      TotalAmount: this.formRef.current?.getFieldValue('TotalAmount'),
      DepositAmount: this.formRef.current?.getFieldValue('DepositAmount'),
      Tax: this.formRef.current?.getFieldValue('Tax'),
      Remarks: this.formRef.current?.getFieldValue('Remarks'),
      StyleNum: this.formRef.current?.getFieldValue('StyleNum'),
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode'),
      PersonalCode: this.formRef.current?.getFieldValue('PersonalCode'),
      InsurerCode: this.formRef.current?.getFieldValue('InsurerCode'),
    }
    InvoiceMaintainAction.eventF11(params)
      .then(async (res) => {
        if (res.data?.message?.includes('Call Screen WS0947001')) {
          this.showModalInvoice_947()
        } else {
          this.getInitData()
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

  eventF12() {
    let params = {
      IntegrationFlag: this.state.dataScreen.IntegrationFlag,
      DeleteFlag: this.state.dataScreen.DeleteFlag,
      ClaimNum: this.formRef.current?.getFieldValue('ClaimNum'),
      CompletedEffective: this.state.dataScreen.CompletedEffective ? 1 : 0,
      ProcessDivision: this.state.dataScreen.ProcessDivision,
      MsgSts: 6,
      BillingDate: this.state.dataScreen.BillingDate,
      Destination: this.formRef.current?.getFieldValue('Destination'),
      Subject: this.formRef.current?.getFieldValue('Subject'),
      BillingPeriodBeginning: this.formRef.current?.getFieldValue('BillingPeriodBeginning'),
      BillingPeriodFinal: this.formRef.current?.getFieldValue('BillingPeriodFinal'),
      Classify: this.state.ClassifyState,
      BillingManageNum: this.formRef.current?.getFieldValue('BillingManageNum'),
      DestinationZipCode: this.formRef.current?.getFieldValue('DestinationZipCode'),
      Address1: this.formRef.current?.getFieldValue('Address1'),
      Address2: this.formRef.current?.getFieldValue('Address2'),
      Remarks: this.formRef.current?.getFieldValue('Remarks'),
      ClaimDateIssue: this.state.dataScreen.ClaimDateIssue,
      TaxCalculateUnit: this.formRef.current?.getFieldValue('TaxCalculateUnit'),
      LessThanTaxCircle: this.formRef.current?.getFieldValue('LessThanTaxCircle'),
      TaxClassify: this.formRef.current?.getFieldValue('TaxClassify'),
      PeopleNum: this.state.dataScreen.PeopleNum,
      OptionSk0003: this.state.dataScreen.OptionSk0003,
      SelectListForm: this.state.dataScreen.SelectListForm,
      StyleNum: this.formRef.current?.getFieldValue('StyleNum'),
      TotalAmount: this.formRef.current?.getFieldValue('TotalAmount'),
      Tax: this.formRef.current?.getFieldValue('Tax'),
      AmountBilled: this.formRef.current?.getFieldValue('AmountBilled'),
      DepositAmount: this.formRef.current?.getFieldValue('DepositAmount'),
      ProtectionFlag: this.state.dataScreen.ProtectionFlag,
      BillingManageNumYearsBeforeChange: this.state.dataScreen.BillingManageNumYearsBeforeChange,
      OfficeCode: this.formRef.current?.getFieldValue('OfficeCode'),
      BranchStoreCode: this.formRef.current?.getFieldValue('BranchStoreCode'),
      PersonalCode: this.formRef.current?.getFieldValue('PersonalCode'),
      InsurerCode: this.formRef.current?.getFieldValue('InsurerCode'),
      deposit_price: this.state.dataScreen.billingdata_2_Dt0601?.deposit_price,
    }
    InvoiceMaintainAction.eventF12(params)
      .then(async (res) => {
        if (res.data?.message?.includes('Call Screen WS0947001')) {
          this.showModalInvoice_947()
        } else {
          this.getInitData()
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

  eventChangeTaxCalculateUnit() {
    let params = {
      SpecifyValid: this.state.dataScreen.SpecifyValid,
      Classify: this.state.ClassifyState,
      AmountBilled: this.formRef.current?.getFieldValue('AmountBilled'),
      TaxRate_1: this.formRef.current?.getFieldValue('TaxRate') / 100,
      LessThanTaxCircle: this.formRef.current?.getFieldValue('LessThanTaxCircle'),
      TaxCalculateUnit: this.formRef.current?.getFieldValue('TaxCalculateUnit'),
      TaxClassify: this.formRef.current?.getFieldValue('TaxClassify'),
      TotalAmount: this.formRef.current?.getFieldValue('TotalAmount'),
      Tax: this.formRef.current?.getFieldValue('Tax'),
    }
    InvoiceMaintainAction.eventChangeTaxCalculateUnit(params)
      .then((res) => {
        if (params.TaxCalculateUnit === 1) {
          this.eventChangeTaxClassify()
        } else {
          this.formRef.current?.setFieldsValue({
            TotalAmount: res?.data?.TotalAmount,
            Tax: res?.data?.Tax,
            AmountBilled: res?.data?.AmountBilled,
          })

          let data = {
            ...this.state.dataScreen,
            ...res?.data
          }

          this.setState({
            dataScreen: data
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

  eventChangeTaxClassify() {
    let params = {
      SpecifyValid: this.state.dataScreen.SpecifyValid,
      Classify: this.state.ClassifyState,
      AmountBilled: this.formRef.current?.getFieldValue('AmountBilled'),
      TaxRate_1: this.formRef.current?.getFieldValue('TaxRate') / 100,
      LessThanTaxCircle: this.formRef.current?.getFieldValue('LessThanTaxCircle'),
      TaxCalculateUnit: this.formRef.current?.getFieldValue('TaxCalculateUnit'),
      TaxClassify: this.formRef.current?.getFieldValue('TaxClassify'),
      TotalAmount: this.formRef.current?.getFieldValue('TotalAmount'),
      Tax: this.formRef.current?.getFieldValue('Tax'),
    }
    InvoiceMaintainAction.eventChangeTaxClassify(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          TotalAmount: res?.data?.TotalAmount,
          Tax: res?.data?.Tax,
          AmountBilled: res?.data?.AmountBilled,
        })

        let data = {
          ...this.state.dataScreen,
          ...res?.data
        }

        this.setState({
          dataScreen: data
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

  eventChangeLessThanTaxCircle() {
    let params = {
      SpecifyValid: this.state.dataScreen.SpecifyValid,
      Classify: this.state.ClassifyState,
      MsgSts: 6,
      Amount1Fixed: this.state.dataScreen.Amount1Fixed,
      ReferenceNum: this.state.dataScreen.ReferenceNum,
      AmountBilled: this.formRef.current?.getFieldValue('AmountBilled'),
      TaxRate_1: this.formRef.current?.getFieldValue('TaxRate') / 100,
      LessThanTaxCircle: this.formRef.current?.getFieldValue('LessThanTaxCircle'),
      TaxCalculateUnit: this.formRef.current?.getFieldValue('TaxCalculateUnit'),
      TaxClassify: this.formRef.current?.getFieldValue('TaxClassify'),
      TotalAmount: this.formRef.current?.getFieldValue('TotalAmount'),
      Tax: this.formRef.current?.getFieldValue('Tax'),
    }
    InvoiceMaintainAction.eventChangeLessThanTaxCircle(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          TotalAmount: res?.data?.TotalAmount,
          Tax: res?.data?.Tax,
          AmountBilled: res?.data?.AmountBilled
        })

        let data = {
          ...this.state.dataScreen,
          ...res?.data
        }

        this.setState({
          dataScreen: data
        })

        this.changeScreenEditting(true)
        this.getDataTable()
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

  changeScreenEditting(Lo_ScreenEditing) {
    let data = {
      ...this.state.dataScreen,
      ScreenEditing: Lo_ScreenEditing
    }

    this.setState({
      dataScreen: data
    })
  }

  showModalItemzed_964(data) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "90%",
        component: (
          <WS0964001_Itemized
            {...data}
            onFinishScreen={(output) => {
              this.changeScreenEditting(output.Lo_ScreenEditing)
              this.eventF7(1)
              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  showModalInsuranPeopleQuery() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "70%",
        component: (
          <WS0339001_InsurerInfoMaintain
            Li_InsurerCode={this.formRef.current?.getFieldValue('InsurerCode')}
            onFinishScreen={(output) => {

              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  showModalOfficeInquiry() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "70%",
        component: (
          <WS2585001_OfficeInfoInquirySub
            Li_OfficeCode={this.formRef.current?.getFieldValue('OfficeCode')}
            Li_BranchCode={this.formRef.current?.getFieldValue('BranchStoreCode')}
            onFinishScreen={(output) => {

              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  showModalPersonalInquiry() {
    let title = '個人情報照会SUB' + ' [' + this.formRef.current?.getFieldValue('PersonalCode') + ']'
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "70%",
        component: (
          <Card title={title}>
            <WS2584019_PersonalInfoInquirySub
              Li_PersonalNum={this.formRef.current?.getFieldValue('PersonalCode')}
              onFinishScreen={(output) => {

                this.closeModal();
              }}
            />
          </Card>
        ),
      },
    });
  }

  showModalInvoice_947() {
    this.setState({ isClose974: true })
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component: (
          <WS0947001_Invoice
            Li_SpecifyIssuedByPresence={this.state.ClassifyState == 3 ? 0 : 1}
            onFinishScreen={(output) => {

              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

  saveDataSubContent(record) {
    let params = {
      id: record.id,
      W1_remark: record.W1_remark,
    }
    InvoiceMaintainAction.saveDataSubContent(params)
      .then(async (res) => {
        this.changeScreenEditting(true)
        this.getDataTable(false)
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

  findIndexByID = (recordID) => {
    return this.state.dataSource.findIndex((item) => recordID === item.id);
  };

  changeRow(record) {
    let data = [...this.state.dataSource]

    let index = this.findIndexByID(record.id)
    this.setState({
      selectedRow: data[index],
      selectedRowKeys: [data[index]?.id],
      indexTable: index
    });
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

  renderButtonCloseModalCustom() {
    return (
      <Button className='close-button'
        onClick={() => {
          if (this.state.dataScreen.ScreenEditing) {
            let title = <span>更新中のデータは無効になります <br /> よろしいですか?</span>
            Modal.confirm({
              title: title,
              width: 350,
              icon: <QuestionCircleOutlined style={{ color: '#1890ff', fontSize: 28 }} />,
              onOk: () => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    ScreenEditing: this.state.dataScreen.ScreenEditing,
                    screenName: 'WS0963001_InvoiceMaintain'
                  })
                }
              }
            })
          } else {
            if (this.props.onFinishScreen) {
              this.props.onFinishScreen({
                ScreenEditing: false,
                screenName: 'WS0963001_InvoiceMaintain'
              })
            }
          }
        }}
      >
        <CloseOutlined />
      </Button>
    )
  }

  render() {
    const { ClaimNum, StsSubjectsQuery, ProtectionFlag, IntegrationFlag, Li_Modify, CompletedEffective, DeleteFlag, SpecifyValid, ProcessDivision } = this.state.dataScreen
    return (
      <div className="invoice-maintain">
        <Spin spinning={this.state.isLoadingForm}>
          <Card title={
            <div>
              <div style={{ float: "left" }}>請求書保守</div>
              <div style={{ float: "right" }}>{this.renderButtonCloseModalCustom()}</div>
            </div>
          }>
            <Row>
              {/* F7 */}
              <Button style={{ marginRight: 8 }}
                onClick={() => {
                  this.eventF7(0)
                }}
              >
                明細内訳
              </Button>

              {/* F8 */}
              <Button style={{ marginRight: 8 }}
                hidden={ProtectionFlag !== 1}

                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 400,
                      component: (
                        <WS0963004_TamperProofRelease
                          onFinishScreen={(output) => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                保護解除
              </Button>

              {/* F9 */}
              <Button style={{ marginRight: 8 }}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '80%',
                      component: (
                        <WS0961001_BillingIntegration
                          Li_BillingManageNum={this.formRef.current?.getFieldValue('BillingManageNum')}
                          onFinishScreen={(output) => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                統合表示
              </Button>

              {/* F11 */}
              <Button style={{ marginRight: 8 }}
                onClick={() => {
                  if (((DeleteFlag == 0 && ClaimNum != 0) || DeleteFlag == 2) && CompletedEffective) {
                    this.eventF11_LossTreatment()
                  } else {
                    this.eventF11_DeleteProcess()
                  }
                }}>
                {DeleteFlag == 0 ? '欠損削除' : '復元'}
              </Button>

              {/* F12 */}
              <Button
                onClick={() => {
                  if ((ProtectionFlag == 0 && IntegrationFlag == 0 && CompletedEffective) || (ProcessDivision == 2 && IntegrationFlag == 0) || ProcessDivision == 4 || ProcessDivision == 5) {
                    this.eventF12()
                  }
                }}
              >
                完了
              </Button>
            </Row>
            <hr style={{ margin: '15px 0' }} />

            <Form ref={this.formRef} onFinish={this.onFinish}>
              <Row gutter={24}>
                <Col span={5}>
                  <Form.Item name="BillingManageNum" label="請求管理番号">
                    <InputNumber readOnly
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "70%",
                            component: (
                              <WS0975001_BillingInquiry
                                Li_ProcessDivision={3}
                                Li_IdentifyInitialDisplay={5}
                                Li_TargetInitialDisplay={0}
                                Li_PayRemainingInitialDisplay={0}
                                Li_OutstandingInitialDisplay={1}
                                onFinishScreen={(output) => {
                                  if (this.state.dataScreen.ScreenEditing) {
                                    let title = <span>更新中のデータは無効になります <br /> よろしいですか?</span>
                                    Modal.confirm({
                                      width: 350,
                                      title: title,
                                      icon: <QuestionCircleOutlined style={{ color: '#1890ff', fontSize: 28 }} />,
                                      onOk: () => {
                                        this.formRef.current?.setFieldsValue({
                                          BillingManageNum: output.Lo_BillingManageNum,
                                          Classify: output.Lo_Identify
                                        })
                                        this.setState({
                                          ClassifyState: output.Lo_Identify,
                                        });

                                        this.getScreenData()
                                      }
                                    })
                                  } else {
                                    this.formRef.current?.setFieldsValue({
                                      BillingManageNum: output.Lo_BillingManageNum,
                                      Classify: output.Lo_Identify
                                    })
                                    this.setState({
                                      ClassifyState: output.Lo_Identify,
                                    });

                                    this.getScreenData()
                                  }
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={3} style={{ paddingLeft: 0 }}>
                  <Form.Item name="Classify" label="請求先">
                    <Select
                      disabled={!this.state.dataScreen.KeyEditingPermission && ProcessDivision !== 1}
                      onChange={(value) => this.setState({ ClassifyState: value })}
                    >
                      <Select.Option value={4}>保険者</Select.Option>
                      <Select.Option value={5}>事業所</Select.Option>
                      <Select.Option value={6}>他団体</Select.Option>
                      <Select.Option value={9}>個人未収</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={3} style={{ paddingLeft: 0 }}>
                  <Form.Item>
                    <Row>
                      <Form.Item name="InsurerCode" style={{ width: 'calc(100% - 27px)', marginRight: 2 }}
                        hidden={this.state.ClassifyState !== 4}>
                        <Input
                          readOnly
                          style={{
                            background: "transparent", border: "none", textAlign: 'right',
                            display: this.formRef.current?.getFieldValue('InsurerCode') > 0 ? '' : 'none'
                          }}
                        />
                      </Form.Item>

                      <Form.Item name="OfficeCode" style={{ width: 'calc(100% - 27px)', marginRight: 2 }}
                        hidden={!(this.state.ClassifyState == 5 || this.state.ClassifyState == 6)}>
                        <Input
                          readOnly
                          style={{
                            background: "transparent", border: "none", textAlign: 'right',
                            display: this.formRef.current?.getFieldValue('OfficeCode') > 0 ? '' : 'none'
                          }}
                        />
                      </Form.Item>

                      <Form.Item name="PersonalCode" style={{ width: 'calc(100% - 27px)', marginRight: 2 }}
                        hidden={this.state.ClassifyState !== 9}>
                        <Input
                          readOnly
                          style={{
                            background: "transparent", border: "none", textAlign: 'right',
                            display: this.formRef.current?.getFieldValue('PersonalCode') > 0 ? '' : 'none'
                          }}
                        />
                      </Form.Item>
                      <Form.Item style={{ width: 25 }}
                        hidden={
                          (!this.formRef.current?.getFieldValue('InsurerCode') && this.state.ClassifyState === 4) ||
                          (!this.formRef.current?.getFieldValue('OfficeCode') && (this.state.ClassifyState == 5 || this.state.ClassifyState == 6)) ||
                          (!this.formRef.current?.getFieldValue('PersonalCode') && this.state.ClassifyState == 9)
                        }
                      >
                        <Button icon={<MoreOutlined />} size='small'
                          style={{ display: this.formRef.current?.getFieldValue('Code') > 0 ? '' : 'none' }}
                          onClick={() => {
                            let InsurerCode = this.formRef.current?.getFieldValue('InsurerCode')
                            let OfficeCode = this.formRef.current?.getFieldValue('OfficeCode')
                            let condition = this.state.ClassifyState

                            if (condition === 6 && !OfficeCode && InsurerCode) {
                              condition = 4
                            }

                            if (condition === 6 && OfficeCode) {
                              condition = 5
                            }
                            switch (condition) {
                              case 4:
                                this.showModalInsuranPeopleQuery()
                                break;
                              case 5:
                                this.showModalOfficeInquiry()
                                break;
                              case 9:
                                this.showModalPersonalInquiry()
                                break;
                              default:
                                break;
                            }
                          }}
                        ></Button>
                      </Form.Item>
                    </Row>
                  </Form.Item>
                </Col>
                <Col span={3} style={{ paddingLeft: 0 }}>
                  <Form.Item name="ClaimNum" label="請求番号">
                    <Input readOnly
                      style={{ background: "transparent", border: "none", textAlign: 'right' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={4} style={{ paddingLeft: 0 }}>
                  <Form.Item name="StyleNum" label="様式">
                    <Select style={{ width: 130 }}
                      onChange={(value) => this.changeScreenEditting(true)}
                    >
                      {this.state.dataScreen.ListStyleNum?.map((item) => (
                        <Select.Option value={item.key}>{item.value}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4} style={{ float: "right" }}>
                  <Space style={{ float: "right" }}>
                    <Button disabled={ProtectionFlag !== 1}
                      style={{ width: 50, marginBottom: '0.3em' }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 400,
                            component: (
                              <WS0963004_TamperProofRelease
                                onFinishScreen={(output) => {
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    >
                      {this.state.dataScreen.Expression_26}
                    </Button>
                    <Form.Item name="Expression_28">
                      <Input readOnly
                        style={{
                          width: 50,
                          textAlign: 'center',
                          background: (DeleteFlag === 1 || DeleteFlag === 2 || IntegrationFlag === 1) ? '' : "transparent",
                          border: (DeleteFlag === 1 || DeleteFlag === 2 || IntegrationFlag === 1) ? '' : "none"
                        }} />
                    </Form.Item>
                    <Form.Item name="Expression_224">
                      <Input readOnly
                        style={{
                          width: 50,
                          textAlign: 'center',
                          background: ProcessDivision > 0 ? '' : "transparent",
                          border: ProcessDivision > 0 ? '' : "none"
                        }} />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>

              <Row gutter={24} style={{ marginTop: 10, marginBottom: 20 }}>
                <Col span={12} style={{ paddingRight: "5px" }}>
                  <Card style={{ height: "100%", border: "1px solid #92c4f3bf", boxShadow: 'none' }}>
                    <Form.Item name="Destination" label="宛名" {...grid}>
                      <Input
                        className='custom-disabled-input'
                        disabled={!(ProtectionFlag === 0 && IntegrationFlag === 0)}
                        onDoubleClick={() => {
                          switch (this.state.ClassifyState) {
                            case 4:
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "70%",
                                  component: (
                                    <WS0246001_InsurerInfoSearchQuery
                                      onFinishScreen={(output) => {
                                        if (output.Lo_InsurerCode !== 0) {
                                          this.formRef.current?.setFieldsValue({
                                            Code: output.Lo_InsurerCode,
                                            InsurerCode: output.Lo_InsurerCode,
                                            // Destination: output.Lo_Name
                                          })
                                          this.eventGzoomDestination()
                                        }
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                              break;
                            case 5:
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "70%",
                                  component: (
                                    <WS0247001_OfficeInfoRetrievalQuery
                                      onFinishScreen={(output) => {
                                        this.formRef.current?.setFieldsValue({
                                          Code: output.Lio_OfficeCode,
                                          OfficeCode: output.Lio_OfficeCode,
                                          BranchStoreCode: output.Lio_BranchStoreCode,
                                          // Destination: output.Lo_Kanji_Name
                                        })
                                        this.eventGzoomDestination()

                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                              break;
                            case 9:
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "70%",
                                  component: (
                                    <WS0248001_PersonalInfoSearchQuery
                                      onFinishScreen={(output) => {
                                        this.formRef.current?.setFieldsValue({
                                          Code: output.Lo_PersonalNumId,
                                          PersonalCode: output.Lo_PersonalNumId,
                                          // Destination: output.recordData.kanji_name
                                        })
                                        this.eventGzoomDestination()

                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                              break;
                            default:
                              break;
                          }
                        }}

                        onBlur={(e) => {
                          if (this.state.dataScreen.Destination !== e.target.value) {
                            this.changeScreenEditting(true)
                          }

                          if (ProcessDivision == 1 && !this.formRef.current?.getFieldValue('Subject')) {
                            this.formRef.current?.setFieldsValue({
                              Subject: this.state.dataScreen.SubjectOp
                            })
                          }
                        }}
                      />
                    </Form.Item>

                    <Row gutter={24}>
                      <Col
                        span={3}
                        style={{ textAlign: "right", fontWeight: "bold", color: '#14468C', paddingRight: 3 }}
                      >
                        <label>送付先</label>
                      </Col>
                      <Col span={21} style={{ paddingLeft: 9 }}>
                        <Form.Item name="DestinationZipCode" label="">
                          <Input maxLength={8}
                            className='custom-disabled-input'
                            disabled={!(ProtectionFlag === 0 && IntegrationFlag === 0)}
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "70%",
                                  component: (
                                    <WS0084001_PostCodeSearchEngine
                                      onFinishScreen={(output) => {
                                        let address = this.formRef.current?.getFieldValue('Address1')
                                        this.formRef.current?.setFieldsValue({
                                          DestinationZipCode: output.Lio_ZipCode,
                                          Address1: address ? address : output.Lio_Address
                                        })
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}

                            onBlur={(e) => {
                              if (this.state.dataScreen.DestinationZipCode !== e.target.value) {
                                this.changeScreenEditting(true)
                              }
                            }}
                          />
                        </Form.Item>
                        <Form.Item name="Address1" label="">
                          <Input maxLength={60}
                            className='custom-disabled-input'
                            disabled={!(ProtectionFlag === 0 && IntegrationFlag === 0)}
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "70%",
                                  component: (
                                    <WS0084001_PostCodeSearchEngine
                                      onFinishScreen={(output) => {
                                        let address = this.formRef.current?.getFieldValue('Address1')
                                        this.formRef.current?.setFieldsValue({
                                          DestinationZipCode: output.Lio_ZipCode,
                                          Address1: address ? address : output.Lio_Address
                                        })

                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}

                            onBlur={(e) => {
                              if (this.state.dataScreen.Address1 !== e.target.value) {
                                this.changeScreenEditting(true)
                              }
                            }}
                          />
                        </Form.Item>
                        <Form.Item name="Address2" >
                          <Input maxLength={60}
                            className='custom-disabled-input'
                            disabled={!(ProtectionFlag === 0 && IntegrationFlag === 0)}

                            onBlur={(e) => {
                              if (this.state.dataScreen.Address2 !== e.target.value) {
                                this.changeScreenEditting(true)
                              }
                            }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="Subject" label="件名" {...grid}>
                      <Input maxLength={100}
                        className='custom-disabled-input'
                        disabled={!(ProtectionFlag === 0 && IntegrationFlag === 0)}

                        onBlur={(e) => {
                          if (this.state.dataScreen.Subject !== e.target.value) {
                            this.changeScreenEditting(true)
                          }
                        }} />
                    </Form.Item>

                    <Form.Item name="Remarks" label="備考" {...grid}>
                      <Input maxLength={100}
                        className='custom-disabled-input'
                        disabled={!(ProtectionFlag === 0 && IntegrationFlag === 0)}

                        onBlur={(e) => {
                          if (this.state.dataScreen.Remarks !== e.target.value) {
                            this.changeScreenEditting(true)
                          }
                        }} />
                    </Form.Item>
                  </Card>
                </Col>

                <Col span={10} style={{ paddingLeft: 0 }}>
                  <Card style={{ marginBottom: "5px", border: "1px solid #92c4f3bf", boxShadow: 'none' }} >
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item name="BillingDateChar" label="請求年月" {...smGrid} >
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'
                            disabled={!(ProtectionFlag == 0 && IntegrationFlag == 0)} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="ClaimDateOfIssueChar" label="発行日"  {...smGrid}  >
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'
                            disabled={!(ProtectionFlag == 0 && IntegrationFlag == 0)} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item style={{ marginBottom: "5px" }}
                          name="BillingPeriodBeginningChar"
                          label="請求期間" {...smGrid} >
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'
                            disabled={!(ProtectionFlag == 0 && IntegrationFlag == 0)} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item style={{ marginBottom: "5px" }}
                          name="BillingPeriodFinalChar"
                          label="~" {...smGrid}  >
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'
                            disabled={!(ProtectionFlag == 0 && IntegrationFlag == 0)} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>

                  <Row gutter={24}>
                    <Col span={12} style={{ paddingRight: 5 }}>
                      <Card style={{ border: "1px solid #92c4f3bf", boxShadow: 'none' }}>
                        <Form.Item name="TaxRate" label="税率" {...smGrid}>
                          <InputNumber
                            style={{
                              background: "transparent",
                              border: "none",
                              width: "100px",
                              textAlign: 'right'
                            }}
                            formatter={value => `${value}%`}
                          />
                        </Form.Item>
                        <Form.Item name="TaxCalculateUnit" label="税計算" {...smGrid}  >
                          <Select
                            onChange={(value) => {
                              this.setState({
                                TaxCalculateUnit: value
                              })
                              this.eventChangeTaxCalculateUnit()
                              this.changeScreenEditting(true)
                            }}
                            disabled={!(ProtectionFlag == 0 && IntegrationFlag == 0
                              && SpecifyValid)}
                          >
                            <Select.Option value={0}>明細</Select.Option>
                            <Select.Option value={1}>合計</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="LessThanTaxCircle" label="税円未満" {...smGrid} >
                          <Select disabled={!(ProtectionFlag == 0 && IntegrationFlag == 0)}
                            onChange={(value) => {
                              let title = <span>明細の内容も変更されます。<br /> 変更しますか？</span>
                              if (value == 1 || value == 2) {
                                Modal.confirm({
                                  width: 300,
                                  title: title,
                                  onOk: () => {
                                    this.eventChangeLessThanTaxCircle()
                                    this.changeScreenEditting(true)
                                  },
                                  onCancel: () => {
                                    this.formRef.current?.setFieldsValue({
                                      LessThanTaxCircle: 0
                                    })
                                  }
                                })
                              }
                            }}>
                            <Select.Option value={0}>四捨五入</Select.Option>
                            <Select.Option value={1}>切捨</Select.Option>
                            <Select.Option value={2}>切上</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item hidden={this.state.TaxCalculateUnit === 1}></Form.Item>
                        <Form.Item name="TaxClassify" label="税区分" {...smGrid}
                          hidden={this.state.TaxCalculateUnit !== 1}
                        >
                          <Select disabled={!(ProtectionFlag == 0 && IntegrationFlag == 0)}
                            onChange={(value) => {
                              this.setState({ TaxClassifyState: value })
                              this.eventChangeTaxClassify()
                              this.changeScreenEditting(true)
                            }}>
                            <Select.Option value={0}>消費税指定</Select.Option>
                            <Select.Option value={1}>外税</Select.Option>
                            <Select.Option value={2}>内税</Select.Option>
                            <Select.Option value={3}>非課税</Select.Option>
                          </Select>
                        </Form.Item>
                      </Card>
                    </Col>

                    <Col span={12} style={{ paddingLeft: 5 }}>
                      <Card style={{ border: "1px solid #92c4f3bf", boxShadow: 'none' }}>
                        <Form.Item name="TotalAmount" label="本体金額" {...smGrid} >
                          <InputNumber maxLength={10} min={0}
                            formatter={value => value == 0 ? '' : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            disabled={!(this.state.TaxCalculateUnit === 1 && this.state.TaxClassifyState !== 2 && !SpecifyValid)
                              || !(ProtectionFlag == 0 && IntegrationFlag == 0)
                            }

                            onBlur={(value) => {
                              if (this.state.dataScreen.TotalAmount !== value) {
                                this.changeScreenEditting(true)
                              }
                            }} />
                        </Form.Item>
                        <Form.Item name="Tax" label="税" {...smGrid}>
                          <InputNumber maxLength={10} min={0}
                            formatter={value => value == 0 ? '' : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            disabled={
                              !(ProtectionFlag === 0 && IntegrationFlag === 0 && this.state.TaxClassifyState === 0 && this.state.TaxCalculateUnit === 1)
                              || !(ProtectionFlag == 0 && IntegrationFlag == 0)
                            }

                            onBlur={(value) => {
                              if (this.state.dataScreen.TotalAmount !== value) {
                                this.changeScreenEditting(true)
                              }
                            }} />
                        </Form.Item>
                        <Form.Item name="AmountBilled" label="請求金額" {...smGrid}  >
                          <InputNumber maxLength={10} min={0}
                            formatter={value => value == 0 ? '' : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            disabled={!(this.state.TaxCalculateUnit === 1 && this.state.TaxClassifyState === 2 && !SpecifyValid)
                              || !(ProtectionFlag == 0 && IntegrationFlag == 0)}

                            onBlur={(value) => {
                              if (this.state.dataScreen.TotalAmount !== value) {
                                this.changeScreenEditting(true)
                              }
                            }}
                          />
                        </Form.Item>
                        <Form.Item name="DepositAmount" label="入金額" {...smGrid}>
                          <InputNumber
                            formatter={value => value == 0 ? '' : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            disabled />
                        </Form.Item>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Table
                size='small'
                style={{ cursor: 'pointer' }}
                rowClassName={(record, index) => record.id === this.state.selectedRow.id ? 'table-row-light' : ''}
                dataSource={this.state.dataSource}
                loading={this.state.isLoadingTable}
                pagination={false}
                bordered
                rowKey={(record) => record.id}
                scroll={{ x: 1110, y: 600 }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      this.changeRow(record)
                    }
                  };
                }}
              >
                <Table.Column title="連番" dataIndex="W1_kanren_num" width={60}
                  render={(value, record, index) => {
                    let condition = (ProtectionFlag == 0 && IntegrationFlag == 0 && Li_Modify && CompletedEffective) ? true : false
                    return (
                      <div>
                        {condition ?
                          <InputNumber value={value} maxLength={4} min={1}
                            onBlur={(value) => {
                              this.updateDatasource(this.findIndexByID(record.id), "W1_kanren_num", value);
                            }} />
                          :
                          <div style={{ textAlign: 'right' }}>{value == 0 ? '' : value}</div>}
                      </div>
                    )
                  }}
                />
                <Table.Column title="区分" dataIndex="W1_kan_sect" width={80}
                  render={(value, record) => {
                    let condition = (ProtectionFlag == 0 && IntegrationFlag == 0 && Li_Modify && CompletedEffective) ? true : false
                    return (
                      <div>
                        {condition ?
                          <Select defaultValue={record.W1_kan_sect} style={{ width: "100%" }}
                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(record.id), "W1_kan_sect", value);
                            }}>
                            <Select.Option value={1}>ｾｯﾄ</Select.Option>
                            <Select.Option value={3}>ｺｰｽ</Select.Option>
                            <Select.Option value={5}>ｺﾒﾝﾄ</Select.Option>
                            <Select.Option value={7}>明細無効</Select.Option>
                            <Select.Option value={9}>無効</Select.Option>
                          </Select>
                          :
                          <div>
                            {value == 1 ? 'ｾｯﾄ'
                              : value == 3 ? 'ｺｰｽ'
                                : value == 5 ? 'ｺﾒﾝﾄ'
                                  : value == 7 ? '明細無効'
                                    : value == 9 ? '無効' : ''
                            }
                          </div>
                        }
                      </div>
                    )
                  }}
                />
                <Table.Column title="内容" dataIndex="W1_content" width={250}
                  render={(value, record) => {
                    let condition = (ProtectionFlag == 0 && IntegrationFlag == 0 && Li_Modify && CompletedEffective) ? true : false
                    return (
                      <div
                        onDoubleClick={() => {
                          if (StsSubjectsQuery && ProtectionFlag == 0 && IntegrationFlag == 0 && Li_Modify && CompletedEffective) {
                            if (record.W1_kan_sect == 1 || record.W1_kan_sect == 3) {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "70%",
                                  component: (
                                    <WS0967003_BillingNameQuerySub
                                      Li_Classify={record.W1_kan_sect == 1 ? 20 : 10}
                                      onFinishScreen={(output) => {
                                        this.updateDatasource(this.findIndexByID(record.id), "W1_content", output.Lo_Name);
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }
                          }
                        }
                        }
                      >
                        {condition ?
                          <Input.TextArea rows={1} defaultValue={value} maxLength={100}
                            onBlur={(e) => {
                              this.updateDatasource(this.findIndexByID(record.id), "W1_content", e.target.value);
                            }}
                          />
                          :
                          <div>{record.W1_content}</div>
                        }

                      </div>
                    );
                  }}
                />
                <Table.Column title="税区分" dataIndex="W1_tax_sect" width={115}
                  render={(value, record) => {
                    return (
                      <div hidden={record.W1_kan_sect == 5}>
                        {value == 0 ? '消費税指定'
                          : value == 1 ? '外税'
                            : value == 2 ? '内税'
                              : value == 3 ? '非課税' : ''
                        }
                      </div>
                    )
                  }}
                />
                <Table.Column title="単価" width={100}
                  render={(value, record) => {
                    return (
                      <div style={{ textAlign: 'right' }}>
                        <div hidden={!(record.W1_tax_sect == 2 && record.W1_kan_sect != 5)}>
                          {record.W1_tax_unit_price == 0 ? '' : number_format(record.W1_tax_unit_price)}
                        </div>
                        <div hidden={!(record.W1_tax_sect != 2 && record.W1_kan_sect != 5)}>
                          {record.W1_price_excluding_tax == 0 ? '' : number_format(record.W1_price_excluding_tax)}
                        </div>
                        <div hidden={record.W1_kan_sect == 5}>
                          ({record.W1_unit_price_tax == 0 ? '' : number_format(record.W1_unit_price_tax)})
                        </div>
                      </div>
                    );
                  }}
                />
                <Table.Column title="人数" dataIndex="W1_person" width={70}
                  render={(value, record) => {
                    return (
                      <div style={{ textAlign: 'right' }}
                        hidden={record.W1_kan_sect == 5}
                      >
                        {value == 0 ? '' : value}
                      </div>
                    );
                  }} />
                <Table.Column title="本体金額" width={100}
                  render={(value, record) => {
                    return (
                      <div style={{ textAlign: 'right' }}>
                        <div hidden={!(record.W1_tax_sect == 2 && record.W1_kan_sect != 5)}>
                          {record.W1_tax_price_exclude_tax == 0 ? '' : number_format(record.W1_tax_price_exclude_tax)}
                        </div>
                        <div hidden={!(record.W1_tax_sect != 2 && record.W1_kan_sect != 5)}>
                          {record.W1_price_exclude_tax == 0 ? '' : number_format(record.W1_price_exclude_tax)}
                        </div>
                        <div hidden={record.W1_kan_sect == 5}>
                          ({record.W1_price_exclude_tax_tax == 0 ? '' : number_format(record.W1_price_exclude_tax_tax)})
                        </div>
                      </div>
                    );
                  }}
                />
                <Table.Column title="合計金額" dataIndex="W1_total_price" width={100}
                  render={(value, record) => {
                    return (
                      <div style={{ textAlign: 'right' }}
                        hidden={record.W1_kan_sect == 5}
                      >
                        {value == 0 ? '' : number_format(value)}
                      </div>
                    );
                  }} />
                <Table.Column title="備考" dataIndex="W1_remark"
                  render={(value, record) => {
                    let condition = (ProtectionFlag == 0 && IntegrationFlag == 0 && CompletedEffective) ? true : false
                    return (
                      <div>
                        {condition && this.state.indexTable === this.findIndexByID(record.id) ?
                          <Input value={record.W1_remark} maxLength={parseInt(this.state.dataScreen.KanRemarksNumBytes)}
                            onChange={(e) => {
                              this.updateDatasource(this.findIndexByID(record.id), "W1_remark", e.target.value);
                            }} />
                          :
                          <div style={{ paddingLeft: 7 }}>{value}</div>
                        }
                      </div>
                    );
                  }} />
                {(ProtectionFlag == 0 && IntegrationFlag == 0 && CompletedEffective) ?
                  <Table.Column width={40} align='center'
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          hidden={this.state.indexTable !== this.findIndexByID(record.id)}
                          onClick={() => { this.saveDataSubContent(record) }}
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                      </div>;
                    }}
                  />
                  : null
                }
              </Table>
              <br></br>
            </Form>
          </Card>
        </Spin>
        <ModalDraggable
          footer={null}
          width={this.state.childModal.width}
          component={this.state.childModal.component}
          visible={this.state.childModal.visible}
          bodyStyle={{ margin: 0, padding: 0 }}
          onCancel={() => {
            if (this.state.isClose974) {
              this.getInitData()
              this.setState({ isClose974: false })
            }
            this.closeModal();
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
)(WS0963001_InvoiceMaintain);
