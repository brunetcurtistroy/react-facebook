import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Color from "constants/Color";
import { Card, Form, Input, Spin, Button, Checkbox, Table, message, Row, Col, Modal, Tooltip, Space, DatePicker, Dropdown, Menu, InputNumber } from "antd";
import { LeftOutlined, RightOutlined, MoreOutlined, DeleteOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";
import GetImage from "constants/Images";
import OverallResultDisplayInputAction from 'redux/InputBusiness/NotInputCheckCategory/OverallResultDisplayInput.action'
import WS0273001_VisitsTargetSearchQuery from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0273001_VisitsTargetSearchQuery.jsx';
import WS0714001_HistoryInputSub from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0714001_HistoryInputSub.jsx';
import WS2637036_DesignatedInspectVisitsHistory from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637036_DesignatedInspectVisitsHistory.jsx';
import WS0898001_IntroduceLetterExtractMaintain from 'pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0898001_IntroduceLetterExtractMaintain.jsx';
import WS0285001_JudgeQuery from 'pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery.jsx';
import WS2637054_NotesInput from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637054_NotesInput.jsx'
import WS0274001_InspectCmtSearchQuery from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0274001_InspectCmtSearchQuery'
import WS2637031_CharacterStringSearch from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637031_CharacterStringSearch.jsx'
import WS2644008_SpecifiedValueConfirm from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2644008_SpecifiedValueConfirm.jsx'
import WS3020036_CoupledPrintInstruction from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS3020036_CoupledPrintInstruction.jsx'
import WS2637041_GuideMatterContent from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637041_GuideMatterContent.jsx'
import moment from 'moment';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS2637046_TypeSelect from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637046_TypeSelect.jsx'
import PreviousGuideMatterInquiryAction from "redux/InputBusiness/NotInputCheckCategory/PreviousGuideMatterInquiry.action";
import WS2641030_PreviousGuideMatterInquiry from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2641030_PreviousGuideMatterInquiry.jsx'
import WS2637019_DataUpdateConfirm from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637019_DataUpdateConfirm.jsx'
import WS2635011_AutoJudge from 'pages/IN_InputBusiness/V5IN0001000_ExamineeList/WS2635011_AutoJudge.jsx';
import WS0605127_ContractLineItemDisplay from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay.jsx';
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx";
import WS0272001_CautionGuideNotesSearchQuery from "pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0272001_CautionGuideNotesSearchQuery.jsx";
import WS0731001_FindingsInputNormalSelect from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0731001_FindingsInputNormalSelect.jsx';
import WS0061003_ConfirmCheckYesYesNo from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061003_ConfirmCheckYesYesNo.jsx';
import WS0730001_FindingsInputPhysiciiagnosis from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0730001_FindingsInputPhysiciiagnosis.jsx';
import WS0729001_FindingsInputRadiography from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0729001_FindingsInputRadiography.jsx';
import WS0728001_FindingsInputNormal from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0728001_FindingsInputNormal.jsx';
class WS2637001_OverallResultDisplayInput extends React.Component {
  static propTypes = {
    Li_MenuOption: PropTypes.any,
    Li_MenuAdminRights: PropTypes.any,
    Li_MenuAuthority: PropTypes.any,
    Li_SubjectNotBeChangedMode: PropTypes.any,
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);
    // document.title = '総合結果表示/入力';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      initialValues: {},
      selectedRowKeys: [],
      selectedRows: [],
      SelectCategoryList: '',
      CategoryJudge: {},
      InspectResult: [],
      GuideCommentInput: [],
      CheckListCategoryJudge: [],
      isLoadingTable: false,
      isLoadingTable1: false,
      isLoadingTable2: false,
      loadScreenData: false,
      AllSelect: true,
      count: 1001,
      selectedGuideRowKeys: [],
      selectedGuideRows: [],
      indexGuideTable: 0,
      selectedCategoryRowKeys: [],
      selectedCategoryRows: [],
      indexCategoryTable: 0,
      selectedInspectRowKeys: [],
      selectedInspectRows: [],
      indexInspectTable: 0,
      HitoryCount: 0,
      isSelectCategoryList: 0,
      defaultCategoryList: '',
      checkCategoryAll: 0,
      Lio_FindingsCategoryUpdate: 0,
      error: { message: '', id: '' },
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (!!this.props.Li_ReserveNum) {
        this.setFormFieldValue('Li_ReserveNum', this.props.Li_ReserveNum)
      }
      this.getScreenData()
    }
  }
  componentDidMount() {
    if (!!this.props?.Li_ReserveNum) {
      this.setFormFieldValue('Li_ReserveNum', this.props.Li_ReserveNum)
      this.getScreenData()
    }
  }
  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  checkData(value, type) {
    const val = type === 'number' ? 0 : ''
    return !this.isEmpty(value) ? value : val
  }
  Li_Object() {
    let result = {
      W1_reserve_num: this.getRawValue('Li_ReserveNum'),
      W1_course_level: this.checkData(this.props.Li_CourseLevel, 'number'),
      Li_MenuOption: this.checkData(this.props.Li_MenuOption, 'number'),
      Li_MenuAdminRights: this.checkData(this.props.Li_MenuAdminRights, 'number'),
      Li_MenuAuthority: this.checkData(this.props.Li_MenuAuthority, 'number'),
      Li_SubjectNotBeChangedMode: this.checkData(this.props.Li_SubjectNotBeChangedMode, 'number'),
    }
    return result
  }
  requestParamScreenData(param) {
    const NonInput = this.getRawValue('NonInput');
    const Outliers = this.getRawValue('Outliers');
    const HistoryAdded = this.getRawValue('HistoryAdded')
    const isNonInput = NonInput === 1 ? { NonInput } : { Outliers };
    const params = {
      ...this.Li_Object(),
      HistoryAdded
    }
    const request = param === undefined ? params : { ...params, ...isNonInput }
    return request;
  }
  getScreenData(param) {
    const NonInput = this.getRawValue('NonInput');
    const Outliers = this.getRawValue('Outliers');
    const isNonInput = NonInput === 1 ? NonInput : Outliers;
    this.setState({ loadScreenData: true })
    OverallResultDisplayInputAction.GetScreenData(this.requestParamScreenData(param)).then((res) => {
      this.renderFiledGcreendata(res)
      this.setState({ initialValues: res })
      this.CategoryJudge(res, {
        isSelectCategoryList: isNonInput,
        SelectCategoryList: res && res?.SelectCategoryList,
        isGetScreenData: 1
      })
      this.ListdataGuideCommentInput()
    }).finally(() => this.setState({ loadScreenData: false }))
  }
  convertBoleanToNum = (input) => input ? 1 : 0
  CategoryJudge(data, record) {
    const HistoryAdded = this.getRawValue('HistoryAdded')
    const SelectCategoryList = !!record.changeCategoryJudge ? record.SelectCategoryList : this.getRawValue('SelectCategoryList')
    const params = {
      ...this.Li_Object(),
      Li_SubjectNotBeChangedMode: this.checkData(this.props.Li_SubjectNotBeChangedMode, 'number'),
      SelectCategoryList: SelectCategoryList,
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      StsInputModeCategoryJudge: this.getRawValue('StsInputModeCategoryJudge'),
      InspectNormalValueUpdateOp: this.getRawValue('InspectNormalValueUpdateOp'),
      HandInputConfirm: this.convertBoleanToNum(this.getRawValue(('HandInputConfirm'))),
      pattern_code: this.getRawValue('pattern_code'),
      HistoryAdded,
      AllSelect: this.getRawValue('AllSelect'),
    }
    this.setState({ isLoadingTable: true })
    OverallResultDisplayInputAction.CategoryJudge(params).then((res) => {
      if (!this.isEmpty(res)) {
        const Expression_24 = res.ListDataTable && res?.ListDataTable[0]?.Expression_24;
        const SelectCategoryListFrm = record && record.SelectCategoryList
        this.setState({
          CategoryJudge: res,
          defaultCategoryList: Expression_24,
          checkCategoryAll: res.AllSelect
        })
        if (record && record.isGetScreenData === 1) {
          this.setState({
            selectedCategoryRows: [res && res.ListDataTable[0]],
            selectedCategoryRowKeys: [res && res.ListDataTable[0]?.id],
            indexCategoryTable: 0
          })
        }
        const SelectCategoryList = record?.isSelectCategoryList === 0 || !record
          ? Expression_24 : (SelectCategoryListFrm === '' ? Expression_24 : SelectCategoryListFrm)
        this.setFormFieldValue('tableData', this.state.CategoryJudge.ListDataTable)
        this.setFormFieldValue('AllSelect', res.AllSelect)
        this.setFormFieldValue('displayOrder', res.ListDataTable && res?.ListDataTable[0]?.display_order)
        this.setFormFieldValue('SelectCategoryListForLastTimeDo', SelectCategoryList)
        this.selectedRowCategoryJude(res);
        if (!record.changeCategoryJudge) {
          this.ListdataInspectResult(data, SelectCategoryList)
        }
      }
    }).finally(() => { this.setState({ isLoadingTable: false }) })
  }
  EventChangeStsInputModeAll() {
    const CheckNum = this.getRawValue('StsInputModeAll') ? 1 : 0
    const params = {
      ...this.Li_Object(),
      StsInputModeAll: CheckNum
    }
    const value = this.getRawValue('SelectCategoryList');
    const SelectCategoryList = value === '' ? '' : value;
    OverallResultDisplayInputAction.EventChangeStsInputModeAll(params).then((res) => {
      this.getScreenDataForHitoryBtn({ eventHitory: 1, SelectCategoryList })
    })
  }
  EventChangeGuideItemDisplay = () => {
    const CheckNum = this.getRawValue('GuideItemDisplay') ? 1 : 0
    const params = {
      ...this.Li_Object(),
      GuideItemDisplay: CheckNum
    }
    const value = this.getRawValue('SelectCategoryList');
    const SelectCategoryList = value === '' ? '' : value;
    OverallResultDisplayInputAction.EventChangeGuideItemDisplay(params).then((res) => {
      this.getScreenDataForHitoryBtn({ eventHitory: 1, SelectCategoryList })
    })
  }
  EventClickExpression4(record) {
    const params = {
      ...this.Li_Object(),
      SelectCategoryList: this.getRawValue('SelectCategoryList'),
      category_cd: this.checkData(record.category_cd)
    }
    OverallResultDisplayInputAction.EventClickExpression4(params).then((res) => {
      const value = res && res.SelectCategoryList ? res.SelectCategoryList : ''
      this.setState({ SelectCategoryList: value })
      this.setFormFieldValue('SelectCategoryList', value)
      const isSelectCategoryListNew = 1;
      if (value === '') {
        this.CategoryJudge(res, { isSelectCategoryList: 0, SelectCategoryList: this.state.defaultCategoryList })
      } else {
        this.CategoryJudge(res, { isSelectCategoryList: isSelectCategoryListNew, SelectCategoryList: value })
      }

    })
  }
  EventDbClickExpression4(record) {
    const params = {
      ...this.Li_Object(),
      SelectCategoryList: this.checkData(this.state.SelectCategoryList, 'text'),
    }
    OverallResultDisplayInputAction.EventDbClickExpression4(params).then((res) => {
      const value = res && res.SelectCategoryList ? res.SelectCategoryList : ''
      this.setState({ SelectCategoryList: value })
      this.setFormFieldValue('SelectCategoryList', value)
      const isSelectCategoryListNew = 1;
      this.CategoryJudge(res, { isSelectCategoryList: isSelectCategoryListNew, SelectCategoryList: value })
    })
  }
  EventSelectAll(number) {
    const params = {
      ...this.Li_Object(),
      AllSelect: number,
    }
    OverallResultDisplayInputAction.EventAllSelect(params).then((res) => {
      const value = res && res.SelectCategoryList ? res.SelectCategoryList : ','
      this.setState({ SelectCategoryList: value })
      this.setFormFieldValue('SelectCategoryList', value)
      const isSelectCategoryListNew = number === 1 ? 1 : 0;
      this.CategoryJudge(res, { isSelectCategoryList: isSelectCategoryListNew, SelectCategoryList: value })
    })
  }

  ListdataInspectResult(record, SelectCategoryList) {
    const HistoryAdded = this.getRawValue('HistoryAdded')
    const NonInput = this.getRawValue('NonInput')
    const Outliers = this.getRawValue('Outliers')
    const NonInputOrOutliers = NonInput === 1 ? { NonInput } : { Outliers };
    const NormalJudge = this.getRawValue('NormalJudge')
    const params = {
      ...this.Li_Object(),
      StsInputModeInspect: this.getRawValue('StsInputModeInspect'),
      StsInputModeFindings: this.getRawValue('StsInputModeFindings'),
      SelectCategoryList: SelectCategoryList,
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      SelectCategory: this.checkData(this.state.selectedCategoryRows[0] ? this.state.selectedCategoryRows[0] : 0, 'number'),
      UndeterminedColorOp: this.getRawValue('UndeterminedColorOp'),
      StsParkModeCategoryUpAndDown: this.getRawValue('StsParkModeCategoryUpAndDown'),
      StsInputModeInspectCmtChiba: this.getRawValue('StsInputModeInspectCmtChiba'),
      HistoryAdded,
      ...NonInputOrOutliers,
      NormalJudge,
      CategoryDisplayPosition: this.getRawValue('CategoryDisplayPosition'),
    }
    this.setState({ isLoadingTable1: true })
    OverallResultDisplayInputAction.ListDataInspectResult(params).then((res) => {
      this.setState({ InspectResult: res })
      this.setFormFieldValue('InspectResult', res)
    }).finally(() => { this.setState({ isLoadingTable1: false }) })
  }
  changeSuffixW1InspectJugde(record, value) {
    const params = {
      ...this.Li_Object(),
      Li_SubjectNotBeChangedMode: this.checkData(this.props.Li_SubjectNotBeChangedMode, 'number'),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      W1_inspect_judge: value,
      id: this.checkData(record.id, 'number')
    }
    if (value.length > 0) {
      OverallResultDisplayInputAction.ChangeW1InspectJudge(params).then((res) => {
        this.saveRowInspectResult(record, value)
      })
    }
  }
  saveRowInspectResult(record, value) {
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      W1_inspect_judge: value,
      id: this.checkData(record.id, 'number'),
      ResultValueRBefore: this.checkData(record.ResultValueRBefore, 'text'),
      W1_change_flg: this.checkData(record.W1_change_flg, 'number'),
      W1_result_val: this.checkData(record.W1_result_val, 'text'),
      InspectJudgeRBefore: this.checkData(record.InspectJudgeRBefore, 'text'),
    }
    console.log(params)
    OverallResultDisplayInputAction.SaveRowInspectResult(params).then((res) => {
      const value = this.getRawValue('SelectCategoryListForLastTimeDo');
      const SelectCategoryList = value === '' ? value : value;
      this.ListdataInspectResult(record, SelectCategoryList)
    })
  }
  ListdataGuideCommentInput() {
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      StsInputModeGuideCmt: this.getRawValue('StsInputModeGuideCmt'),
    }
    this.setState({ isLoadingTable2: true })
    OverallResultDisplayInputAction.ListDataGuideCommentInput(params).then((res) => {

      if (res) {
        const checkField = (input) => input === 0 ? '' : input
        const data = res.map(s => ({ ...s, W3_general_comments_cd: checkField(s.W3_general_comments_cd) }))
        this.setFormFieldValue('GuideCommentInput', data)
        this.setState({
          GuideCommentInput: res,
          selectedGuideRows: res.length > 0 ? [res[0]] : [],
          selectedGuideRowKeys: res.length > 0 ? [res[0]?.id] : [],
          indexGuideTable: 0
        })
      }

    }).finally(() => { this.setState({ isLoadingTable2: false }) })
  }
  clickAcceptedNoIt() {
    const params = {
      DateChar: this.checkData(moment(this.getRawValue('DateChar')).format('YYYY/MM/DD'), 'text'),
      AcceptNum: this.checkData(this.getRawValue('AcceptNum'), 'number'),
    }
    OverallResultDisplayInputAction.AcceptedNoIt(params).then((res) => {
      this.setState({
        ReserveNum: res && res.ReserveNum,
        CourseLevel: res && res.CourseLevel, isSelectCategoryList: 0, checkCategoryAll: 0
      })
      this.setFormFieldValue('HistoryAdded', 0)
      this.setFormFieldValue('Li_ReserveNum', res && res.ReserveNum)
      this.setFormFieldValue('AllSelect', 0)
      this.getScreenData()
    })
  }
  clickAcceptedNo() {
    const acceptedVal = this.getRawValue('AcceptNum')
    const AcceptNum = acceptedVal ? acceptedVal : 0;
    const params = {
      DateChar: this.checkData(moment(this.getRawValue('DateChar')).format('YYYY/MM/DD'), 'text'),
      AcceptNum: AcceptNum,
    }
    OverallResultDisplayInputAction.acceptedNo(params).then((res) => {
      this.setState({
        ReserveNum: res && res.ReserveNum,
        CourseLevel: res && res.CourseLevel, isSelectCategoryList: 0, checkCategoryAll: 0
      })
      this.setFormFieldValue('HistoryAdded', 0)
      this.setFormFieldValue('Li_ReserveNum', res && res.ReserveNum)
      this.setFormFieldValue('AllSelect', 0)
      this.getScreenData()
    })
  }
  clickAccepted() {
    const params = {
      DateChar: this.checkData(moment(this.getRawValue('DateChar')).format('YYYY/MM/DD'), 'text'),
      AcceptNum: this.checkData(this.getRawValue('AcceptNum'), 'number'),
    }
    OverallResultDisplayInputAction.accepted(params).then((res) => {
      this.setState({
        ReserveNum: res && res.ReserveNum,
        CourseLevel: res && res.CourseLevel, isSelectCategoryList: 0, checkCategoryAll: 0
      })
      this.setFormFieldValue('HistoryAdded', 0)
      this.setFormFieldValue('SelectCategoryList', '')
      this.setFormFieldValue('Li_ReserveNum', res && res.ReserveNum)
      this.setFormFieldValue('AllSelect', 0)
      this.setFormFieldValue('DateChar', res && res.DateChar)
      this.getScreenData()
    })
  }

  getScreenDataForHitoryBtn(param) {
    this.setState({ loadScreenData: true })
    OverallResultDisplayInputAction.GetScreenData(this.requestParamScreenData(param)).then((res) => {
      this.setState({ initialValues: res })
      const SelectCategoryList = (input) => input == 1 || !!input ? param.SelectCategoryList : '';
      const data = { ...res, SelectCategoryList: SelectCategoryList(param.eventHitory) }
      this.renderFiledGcreendata(data)
      this.CategoryJudge(res, {
        isSelectCategoryList: 1,
        SelectCategoryList: param.SelectCategoryList,
      })
      this.ListdataGuideCommentInput()
    }).finally(() => { this.setState({ loadScreenData: false }) })
  }
  async eventHitory() {
    const HistoryAdded = this.getRawValue('HistoryAdded')
    this.setFormFieldValue('HistoryAdded', (Number(HistoryAdded + 1)))
    const value = this.getRawValue('SelectCategoryList');

    const SelectCategoryList = value === '' ? '' : value;
    await this.getScreenDataForHitoryBtn({ eventHitory: 1, SelectCategoryList })
  }
  async eventHitorylt() {
    const HistoryAdded = this.getRawValue('HistoryAdded')
    this.setFormFieldValue('HistoryAdded', (Number(HistoryAdded - 1)))
    const value = this.getRawValue('SelectCategoryList');
    const SelectCategoryList = value === '' ? '' : value;
    await this.getScreenDataForHitoryBtn({ eventHitory: 1, SelectCategoryList })
  }
  Ctrl_F(record) {
    const params = {
      ...this.Li_Object(),
      W1_sect_display_num: this.checkData(record.W1_sect_display_num, 'number'),
      W1_inspect_item_display_num: this.checkData(record.W1_inspect_item_display_num, 'number'),
      CharStringSearch: this.checkData(record.Lio_SearchString, 'text')
    }
    OverallResultDisplayInputAction.Ctrl_F(params).then((res) => {
    })
  }
  requestW1_result_val(record) {
    const params = {
      W1_sect_display_num: this.checkData(record.W1_sect_display_num, 'number'),
      W1_inspect_item_display_num: this.checkData(record.W1_inspect_item_display_num, 'number'),
      Li_Gender: this.getRawValue('Li_Gender'),
      Li_DateOfBirth: this.getRawValue('Li_DateOfBirth'),
      W1_inspect_judge: this.checkData(record.W1_inspect_judge, 'text'),
      W1_result_val: this.checkData(record.W1_result_val, 'text'),
      remarks: this.checkData(record.remarks, 'text'),
      StsAutomaticCalculate: this.checkData(record.StsAutomaticCalculate, 'number'),
      Li_ReserveNum: this.checkData(Number(this.getRawValue('Li_ReserveNum')), 'number'),
      Li_CourseLevel: this.checkData(Number(this.getRawValue('Li_CourseLevel')), 'number'),
      W1_inspect_cd: this.checkData(record.W1_inspect_cd, 'number'),
      visit_date_on: this.getRawValue('visit_date_on'),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      judgment_code: this.checkData(record.judgment_code, 'number'),
      NormalJudge: this.getRawValue('NormalJudge'),
      UpAndDownDisplay: this.getRawValue('UpAndDownDisplay'),
      UpAndDown: this.checkData(record.UpAndDown, 'text'),
      id: this.checkData(record.id, 'number'),
      W1_display_remark: this.checkData(record.W1_display_remark, 'text'),
    }
    return params;
  }
  clickPreFixW1_result_val(record, value) {
    console.log(12121212, value, record.W1_inspect_judge)
    const params = {
      ...this.Li_Object(),
      ...this.requestW1_result_val(record)
    }
    OverallResultDisplayInputAction.PrefixW1ResultValue(params).then((res) => {
      const data = res && res.data;
      if (record.StsInputModeInspect == '1') {
        if (record?.StsAutomaticCalculate === 1) {
          record.W1_result_val = data.W1_result_val
          this.saveRowInspectResult(record, record.W1_inspect_judge)
        } else {
          if (!!value) {
            if (record.W1_result_val != value) {
              record.W1_result_val = value
              this.saveRowInspectResult(record, record.W1_inspect_judge)
            }
          }else{
            record.W1_result_val = value
            this.saveRowInspectResult(record, record.W1_inspect_judge)
          }
        }
      }

    })
  }
  clickSuffixW1_result_val(record, index) {
    const params = {
      ...this.Li_Object(),
      ...this.requestW1_result_val(record)
    }
    OverallResultDisplayInputAction.SuffixW1ResultValue(params).then((res) => {
      this.showInspectCmtSearchQuery(record, index)
      this.findingsEditingBefore(record)

    })
  }
  findingsEditingBefore(record) {
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      display_order: record && record.display_order,
      W1_sect_display_num: record && record.W1_sect_display_num,
      W1_inspect_item_display_num: record && record.W1_inspect_item_display_num,
      pattern_code: this.getRawValue('pattern_code'),
      W1_category_cd: record && record.W1_category_cd,
      personal_number_id: this.getRawValue('personal_number_id'),
      GuideHowToAddOp: this.getRawValue('GuideHowToAddOp'),
      StsInputModeFindings: this.getRawValue('StsInputModeFindings'),
      W1_inspect_cd: record && record.W1_inspect_cd,
    }

    if (record.Expression_24 === 1) {
      OverallResultDisplayInputAction.findingsEditingBefore(params).then((res) => {
        const messagex = res && res.message ? res.message : '';
        const variables = res && res.variables ? res.variables : null
        const data = record;
        const Expression_25 = this.getRawValue('StsInputModeFindings')
        if (Expression_25 === 1) {
          if (messagex === 'Call Screen WS0731001') {
            this.showWS0731001_FindingsInputNormalSelect(variables, data)
          }
          if (messagex === 'Call Screen WS0730001') {
            this.showWS0730001_FindingsInputPhysiciiagnosis(variables, data)
          }
          if (messagex === 'Call Screen WS0729001') {
            this.showWS0729001_FindingsInputRadiography(variables, data)
          }
          if (messagex === 'Call Screen WS0728001') {
            this.showWS0728001_FindingsInputNormal(variables, data)
          }
        }
      })
    }
  }

  findingsEditingAfter(record, output) {
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      display_order: record && record.display_order,
      W1_sect_display_num: record && record.W1_sect_display_num,
      W1_inspect_item_display_num: record && record.W1_inspect_item_display_num,
      pattern_code: this.getRawValue('pattern_code'),
      W1_category_cd: record && record.W1_category_cd,
      personal_number_id: this.getRawValue('personal_number_id'),
      GuideHowToAddOp: this.getRawValue('GuideHowToAddOp'),
      StsInputModeFindings: this.getRawValue('StsInputModeFindings'),
      FindingsCategoryUpdate: this.state.Lio_FindingsCategoryUpdate
    }
    const value = this.getRawValue('SelectCategoryListForLastTimeDo');
    const SelectCategoryList = value;
    OverallResultDisplayInputAction.findingsEditingAfter(params).then((res) => {
      this.ListdataInspectResult(record, SelectCategoryList)
    })
  }
  clickSuffixW1InspectJugde(record) {
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      W1_inspect_judge: this.checkData(record.W1_inspect_judge, 'text'),
      id: this.checkData(record.id, 'number')
    }
    OverallResultDisplayInputAction.SuffixW1InspectJugde(params).then((res) => {
    })
  }

  changeCategoryJudge(record, value) {
    const params = {
      ...this.Li_Object(),
      category_cd: this.checkData(record.category_cd, 'number'),
      id: this.checkData(record.id, 'number'),
      category_judge: this.checkData(value, 'text')
    }
    OverallResultDisplayInputAction.ChangeCategoryJudge(params).then((res) => {
      this.saveCategoryRow(record, value, true)
    }).catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }

    });
  }
  saveCategoryRow(record, value, changeCategoryJudge) {
    const params = {
      category_cd: this.checkData(record.category_cd, 'number'),
      id: this.checkData(record.id, 'number'),
      category_judge: this.checkData(value, 'text'),
      StsInputModeCategoryJudge: this.checkData(record.StsInputModeCategoryJudge, 'number'),
      pattern_code: this.checkData(record.pattern_code, 'text'),
      InspectNormalValueUpdateOp: this.checkData(record.InspectNormalValueUpdateOp, 'number'),
      SelectCategory: this.checkData(record.SelectCategory, 'number'),
      display_order: this.checkData(record.display_order, 'number'),
      Expresstion_4: this.checkData(record.display_order, 'text'),
      category_name: this.checkData(record.category_name, 'text'),
      Expresion_19: this.checkData(record.Expresion_19, 'number'),
      Expression_24: this.checkData(record.Expression_24, 'text'),
      Expression_21: this.checkData(record.Expression_21, 'number'),
      Expression_11: this.checkData(record.Expression_11, 'number'),
      category_judge_1_pre: this.checkData(record.category_judge_1_pre, 'text'),
      Expression_12: this.checkData(record.Expression_12, 'number'),
      category_judge_2_before: this.checkData(record.category_judge_2_pre, 'text'),
      Expression_13: this.checkData(record.Expression_13, 'number'),
      judgment_level_division: this.checkData(record.judgment_level_division, 'number'),
    }
    const selectInspcectListInCategory = this.getRawValue('SelectCategoryListForLastTimeDo');
    let SelectCategoryList = ''
    if (!!changeCategoryJudge) {
      SelectCategoryList = this.getRawValue('SelectCategoryList');
    } else {
      SelectCategoryList = selectInspcectListInCategory === '' ? this.state.defaultCategoryList : selectInspcectListInCategory;
    }
    OverallResultDisplayInputAction.CategoryJudgeSaveRow(params).then((res) => {
      this.CategoryJudge(record, { isSelectCategoryList: 1, SelectCategoryList, changeCategoryJudge })
      this.setState({ error: { message: '', id: '' } });
    }).catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      Modal.error({ content: res.data.message });
      this.setState({ error: { message: res.data.message, id: record.id } });
    });
  }
  selectInspcectListInCategory(record) {
    const value = `${record.Expression_24},`
    const SelectCategoryList = value === '' ? this.state.defaultCategoryList : value;
    this.setFormFieldValue('displayOrder', record.display_order)
    this.setFormFieldValue('SelectCategoryListForLastTimeDo', value)
    this.ListdataInspectResult(record, SelectCategoryList)
  }
  EventChangeW3AutoBasicJudge(value) {
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      StsInputModeGuideCmt: this.getRawValue('StsInputModeGuideCmt'),
      W3_auto_judge_basic_judge: this.checkData(value.W3_auto_judge_basic_judge, 'text'),
    }
    OverallResultDisplayInputAction.EventChangeW3AutoJudge(params).then((res) => {
    }).catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      Modal.error({ content: res.data.message });
      const data = this.getRawValue('GuideCommentInput')
      const index = data.findIndex(x => x.id === value.id)
      data[index].W3_auto_judge_basic_judge = '';
      this.setFormFieldValue('GuideCommentInput', data)
      this.forceUpdate()
    });
  }
  EventChangeW3OverallCmt(record, value) {
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      StsInputModeGuideCmt: this.getRawValue('StsInputModeGuideCmt'),
      W3_input_flg: this.checkData(value.W3_input_flg, 'text'),
    }
    OverallResultDisplayInputAction.EventChangeW3OverallCmt(params).then((res) => {
      // this.GuideCommentInputSaveRowData(record, value)
    })
  }

  EventChangeW3GeneralCmtCd(record, value) {
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      StsInputModeGuideCmt: this.getRawValue('StsInputModeGuideCmt'),
      W3_input_flg: this.checkData(value.W3_input_flg, 'text'),
      W3_general_comments_cd: this.checkData(value.W3_general_comments_cd, 'text'),
    }
    OverallResultDisplayInputAction.EventChangeW3GeneralCmtCd(params).then((res) => {
      // this.GuideCommentInputSaveRowData(record, value)
    })
  }

  GuideCommentInputSaveRowData(value, isInsert) {
    const W3_serial_num = !!isInsert ? value.W3_serial_num : value.W3_serial_num
    const request = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      StsInputModeGuideCmt: this.getRawValue('StsInputModeGuideCmt'),
      W3_serial_num: this.checkData(W3_serial_num, 'text'),
      W3_auto_judge_weights: this.checkData(value.W3_auto_judge_weights, 'text'),
      W3_general_comments_cd: this.checkData(value?.W3_general_comments_cd, 'text'),
      W3_overall_comments: this.checkData(value?.W3_overall_comments, 'text'),
      W3_input_flg: this.checkData(value.W3_input_flg, 'text'),
      W3_course_level_2: this.checkData(value.W3_course_level_2, 'text'),
      W3_course_level_3: this.checkData(value.W3_course_level_3, 'text'),
      W3_auto_judge_sect_cd: this.checkData(value.W3_auto_judge_sect_cd, 'text'),
      W3_auto_judge_basic_judge: this.checkData(value.W3_auto_judge_basic_judge, 'text'),
      W3_auto_judge_output_type: this.checkData(value.W3_auto_judge_output_type, 'text'),
    }
    let params = !!isInsert ? request : { ...request, id: this.checkData(value.id, 'number'), }
    OverallResultDisplayInputAction.GuideCommentInputSaveRow(params).then((res) => {
      this.setFormFieldValue('StsLeadershipMattersChange', res && res?.data?.StsLeadershipMattersChange)
      this.ListdataGuideCommentInput()
    })
  }
  checkF09() {
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      StsInputModeInspect: this.getRawValue('StsInputModeInspect'),
      PatternCode: this.getRawValue('pattern_code'),

    }
    OverallResultDisplayInputAction.F9(params).then(res => {
      const mess = 'Call Screen WS2644008'
      if (res) {
        if (res && res?.message === mess) {
          this.showBtnF09WS2644008_SpecifiedValueConfirm()
        } else {
          Modal.warning({ content: res?.message, okText: 'は　い' })
        }
      }
    })
  }
  async addRowGuideCommentInput() {
    const params = {
      id: '',
      isNew: true,
      W3_serial_num: '',
      W3_general_comments_cd: '',
      W3_overall_comments: '',
      W3_auto_judge_output_type: '',
      W3_auto_judge_basic_judge: ''
    }
    const GuideCommentInput = this.getRawValue('GuideCommentInput') ?
      this.getRawValue('GuideCommentInput') : [];
    let arr = [...GuideCommentInput]
    arr.unshift(params)
    this.forceUpdate()
    this.setFormFieldValue('GuideCommentInput', arr)
    this.setState({ GuideCommentInput: arr })
  }
  deleteGuideCommentInput(data) {
    OverallResultDisplayInputAction.GuideCommentInputDeleteRow({ id: data }).then((res) => {
      this.setFormFieldValue('StsLeadershipMattersChange', true)
      this.ListdataGuideCommentInput()
    })
  }
  handleAdd() {
    const { count } = this.state;
    let data = this.getRawValue('GuideCommentInput') ?
      this.getRawValue('GuideCommentInput') : [];
    const params = {
      id: count,
      isNew: true,
      W3_serial_num: (data[data.length - 1].W3_serial_num + 1),
      W3_general_comments_cd: '',
      W3_overall_comments: '',
      W3_auto_judge_output_type: '',
      W3_auto_judge_basic_judge: ''
    }
    let arr = [...data];
    arr.unshift(params)
    this.forceUpdate()
    this.setFormFieldValue('GuideCommentInput', arr)
    this.setState({
      count: count + 1,
      GuideCommentInput: arr,
      selectedGuideRowKeys: arr.length > 0 ? [arr[0].id] : [],
      selectedGuideRows: arr.length > 1 ? [arr[0]] : [],
      indexGuideTable: 0
    });
  }
  addRow() {
    let data = this.getRawValue('GuideCommentInput') ?
      this.getRawValue('GuideCommentInput') : [];
    let arr = [...data];
    if (arr.length === 0) {
      this.handleAdd();
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (!!arr[index]['isNew']) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd()
        }
      }
    }
  }
  removeRow(index) {
    let data = this.getRawValue('GuideCommentInput') ?
      this.getRawValue('GuideCommentInput') : [];
    const table = data.filter((item, i) => index !== i);
    this.forceUpdate()
    this.setFormFieldValue('GuideCommentInput', table);
    setTimeout(() =>
      this.setState({
        GuideCommentInput: table,
        selectedGuideRowKeys: table.length > 0 ? [table[0].id] : [],
        selectedGuideRows: table.length > 0 ? [table[0]] : [],
        indexGuideTable: 0
      }), 200)

  }
  selectedRowCategoryJude(res) {
    const checkSelectAll = res.AllSelect === 1 ? true : false;
    let arrTempRecord = res.ListDataTable;
    if (checkSelectAll) {
      const keys = res.ListDataTable.map(s => s.id)
      this.setState({ selectedRowKeys: keys, selectedRows: arrTempRecord })
    } else {
      this.setState({ selectedRowKeys: [], selectedRows: [] })
    }
  }
  insertData(record, index) {
    const value = this.getRawValue('GuideCommentInput')[index]
    this.GuideCommentInputSaveRowData(value, true)

  }
  onFinish(values) {

  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  ShowWS2637046_TypeSelect(record, index) {
    const TypeSelectList = this.getRawValue('TypeSelectList')
    if (TypeSelectList !== '') {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 400,
          component:
            <WS2637046_TypeSelect
              Li_TypeSelectList={this.getRawValue('TypeSelectList')}
              Lio_Type={record?.W3_auto_judge_output_type}
              onScreenFinish={(output) => {
                const data = this.getRawValue('GuideCommentInput')
                data[index].W3_auto_judge_output_type = output?.Lio_Type;
                this.setFormFieldValue('GuideCommentInput', data)
                const value = this.getRawValue('GuideCommentInput')[index]
                this.EventChangeW3AutoBasicJudge(value)
                this.closeModal()
                this.forceUpdate()

              }}
            />
          ,
        },
      });
    }
  }
  showWS2637054_NotesInput(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component:
          <WS2637054_NotesInput
            Li_PatternCode={record.pattern_code}
            Li_CategoryCode={record.category_cd}
            Li_CategoryName={record.category_name}
            Lio_StsNotesChange={record.StsNotesChange}
            onScreenFinish={(output) => {
              if (output.Exit) {
                this.closeModal()
              }

            }}
          />
      },
    });
  }
  showWS0612002_CharacterStringSearch(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 500,
        component:
          <WS2637031_CharacterStringSearch
            onFinishScreen={(output) => {
              const params = {
                W1_sect_display_num: record.W1_sect_display_num,
                W1_inspect_item_display_num: record.W1_inspect_item_display_num,
                Lio_SearchString: output.Lio_SearchString
              }
              if (output.Lio_SearchString.length > 0) {
                this.Ctrl_F(params)
              }

            }}
          />
        ,
      },
    });
  }
  showWS2637041_GuideMatterContent(record, index) {
    if (this.getRawValue('StsInputModeAll') === 1) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 900,
          component:
            <WS2637041_GuideMatterContent
              Li_CmtCode={record.W3_general_comments_cd}
              Lio_LeadershipMatters={record.W3_overall_comments}
              Lio_InputFlag={record.W3_input_flg}
              Lio_AutomaticJudgeCategoryCode={record.W3_auto_judge_sect_cd}
              Lio_AutomaticJudgeBasicJudge={record.W3_auto_judge_basic_judge}
              Lio_AutomaticJudgeWeights={record.W3_auto_judge_weights}
              Lio_AutomaticJudgeOutputType={record.W3_auto_judge_output_type}
              LnkIo2={record.W3_course_level_2}
              LnkIo3={record.W3_course_level_3}
              judgment_weight={record.judgment_weight}
              Li_JungleLevel={this.getRawValue('Li_JungleLevel')}

              onFinishScreen={(output) => {
                const data = { ...output?.Lo_recordData, W3_serial_num: record.W3_serial_num }
                const GuideCommentInput = this.getRawValue('GuideCommentInput');
                GuideCommentInput[index] = data
                GuideCommentInput[index].W3_input_flg = record.W3_input_flg
                GuideCommentInput[index].W3_auto_judge_basic_judge = data?.W3_auto_judge_basic_judge
                GuideCommentInput[index].W3_general_comments_cd = record?.W3_general_comments_cd
                this.setFormFieldValue('GuideCommentInput', GuideCommentInput)
                this.closeModal()
              }}
            />
          ,
        },
      })
    }

  }
  showInspectCmtSearchQuery(record, index) {
    if (record.Expression_39) {
      if (record.Expression_23 === 1 && record.Expression_40) {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 800,
            component:
              <WS0274001_InspectCmtSearchQuery
                Li_PatternCode={record.pattern_code}
                Li_CategoryCode={record.category_cd}
                Li_CategoryName={record.category_name}
                Lio_StsNotesChange={record.StsNotesChange}
                Lio_CmtClassify={record.exam_comment_code}
                LnkOutInspectCmtScreen={record.W1_result_val}
                onFinishScreen={(output) => {
                  const data = output.recordData;
                  const InspectResult = this.getRawValue('InspectResult')
                  InspectResult[index].W1_result_val = data.exam_comment_screen
                  this.setFormFieldValue('InspectResult', InspectResult)
                  this.saveRowInspectResult(InspectResult[index], record.W1_inspect_judge)
                  this.closeModal()
                }}
              />
            ,
          },
        });
      }
    }

  }
  showAllCaseSpecifiedValue() {
    Modal.warning({
      content: '規定値設定が可能な検査が存在しません',
      okText: 'は　い'
    })
  }
  showBtnF09WS2644008_SpecifiedValueConfirm() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '25%',
        component: (
          <WS2644008_SpecifiedValueConfirm
            Li_JungleLevel={this.getRawValue('Li_JungleLevel')}
            Lio_Judge
            Li_PatternCode={this.getRawValue('pattern_code')}
            Li_ReserveNum={this.getRawValue('Li_ReserveNum')}
            onFinishScreen={(obj) => {
              if (obj && obj.Lo_StsSelect) {
                this.closeModal()
              }

            }}
          />
        ),
      },
    });
  }

  showBtnF11WS3020036_CoupledPrintInstruction() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 700,
        component: (
          <WS3020036_CoupledPrintInstruction
            Li_CourseLevel={this.getRawValue('Li_CourseLevel')}
            Li_ReserveNum={this.getRawValue('Li_ReserveNum')}
            Li_Parameters={this.getRawValue('Li_Parameters')}
            onFinishScreen={(obj) => {
              this.closeModal()

            }}
          />
        ),
      },
    });
  }
  checkF11() {
    this.showBtnF11WS3020036_CoupledPrintInstruction()
  }
  showWS0285001_JudgeQuery(data, index) {
    if (this.getRawValue('StsInputModeAll') === 1) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: '25%',
          component: (
            <WS0285001_JudgeQuery
              Li_JungleLevel={data?.judgment_level_division}
              Lio_Judge={data?.category_judge}
              onFinishScreen={(obj) => {
                const value = this.getRawValue('GuideCommentInput')[index]
                if (value && !value?.isNew) {
                  this.EventChangeW3AutoBasicJudge(value)
                }
              }}
            />
          ),
        },
      });
    }

  }
  showWS02637001(data) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1700,
        component: (
          <WS2637001_OverallResultDisplayInput
            Li_MenuOption={this.checkData(this.props.Li_SubjectNotBeChangedMode, 'number')}
            Li_MenuAdminRights={this.checkData(this.props.Li_MenuAdminRights, 'number')}
            Li_MenuAuthority={this.checkData(this.props.Li_MenuAuthority, 'number')}
            Li_SubjectNotBeChangedMode
            Li_CourseLevel={this.checkData(this.props.Li_CourseLevel, 'number')}
            Li_ReserveNum={this.getRawValue('ReserveNumOnceBefore')}
            onFinishScreen={(obj) => {

            }}
          />
        ),
      },
    });
  }
  findingEditLastTimeDo(record, output) {
    if (output && output.Lio_FindingsCategoryChange) {
      this.setState({ Lio_FindingsCategoryUpdate: output.Lio_FindingsCategoryChange })
    } else {

      this.findingsEditingAfter(record, output)
      this.closeModal()
    }
  }
  showWS0731001_FindingsInputNormalSelect(variables, record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '100%',
        component: (
          <WS0731001_FindingsInputNormalSelect
            Li_ReserveNum={variables?.Li_ReserveNum}
            Li_PatternCode={variables?.Li_PatternCode}
            Li_CategoryCode={variables?.Li_CategoryCode}
            Li_InspectCode={variables?.Li_InspectCode}
            Li_CourseLevel={variables?.Li_CourseLevel}
            Li_JudgeLevel={variables?.Li_JudgeLevel}
            Li_PersonalNum={variables?.Li_PersonalNum}
            Li_FindingsInputNumDigits={variables?.Li_FindingsInputNumDigits}
            Li_FindingsInputNumRows={variables?.Li_FindingsInputNumRows}
            Lio_FindingsCategoryChange={variables?.Lio_FindingsCategoryChange}
            onFinishScreen={(output) => {
              if (output) {
                this.findingEditLastTimeDo(record, output);
              }
            }}
          />
        ),
      },
    });
  }
  showWS0730001_FindingsInputPhysiciiagnosis(variables, record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '100%',
        component: (
          <WS0730001_FindingsInputPhysiciiagnosis
            Li_ReserveNum={variables?.Li_ReserveNum}
            Li_PatternCode={variables?.Li_PatternCode}
            Li_CategoryCode={variables?.Li_CategoryCode}
            Li_InspectCode={variables?.Li_InspectCode}
            Li_CourseLevel={variables?.Li_CourseLevel}
            Li_JudgeLevel={variables?.Li_JudgeLevel}
            Li_PersonalNum={variables?.Li_PersonalNum}
            Li_FindingsInputNumDigits={variables?.Li_FindingsInputNumDigits}
            Li_FindingsInputNumRows={variables?.Li_FindingsInputNumRows}
            Lio_FindingsCategoryChange={variables?.Lio_FindingsCategoryChange}
            onFinishScreen={(obj) => {
              if (obj) {
                this.setState({ Lio_FindingsCategoryUpdate: obj && obj?.Lio_FindingsCategoryChange })
                setTimeout(() => this.findingsEditingAfter(record, obj))
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  showWS0729001_FindingsInputRadiography(variables, record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '100%',
        component: (
          <WS0729001_FindingsInputRadiography
            Li_ReserveNum={variables?.Li_ReserveNum}
            Li_PatternCode={variables?.Li_PatternCode}
            Li_CategoryCode={variables?.Li_CategoryCode}
            Li_InspectCode={variables?.Li_InspectCode}
            Li_CourseLevel={variables?.Li_CourseLevel}
            Li_JudgeLevel={variables?.Li_JudgeLevel}
            Li_PersonalNum={variables?.Li_PersonalNum}
            Li_FindingsInputNumDigits={variables?.Li_FindingsInputNumDigits}
            Li_FindingsInputNumRows={variables?.Li_FindingsInputNumRows}
            Lio_FindingsCategoryChange={variables?.Lio_FindingsCategoryChange}
            onFinishScreen={(obj) => {
              if (obj) {
                this.setState({ Lio_FindingsCategoryUpdate: obj.Lio_FindingsCategoryChange })
                setTimeout(() => this.findingsEditingAfter(record, obj))
                if (!!obj?.close) {
                  this.closeModal()
                }
              }
            }}
          />
        ),
      },
    });
  }

  showWS0728001_FindingsInputNormal(variables, record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '100%',
        component: (
          <WS0728001_FindingsInputNormal
            Li_ReserveNum={variables?.Li_ReserveNum}
            Li_PatternCode={variables?.Li_PatternCode}
            Li_CategoryCode={variables?.Li_CategoryCode}
            Li_InspectCode={variables?.Li_InspectCode}
            Li_CourseLevel={variables?.Li_CourseLevel}
            Li_JudgeLevel={variables?.Li_JudgeLevel}
            Li_PersonalNum={variables?.Li_PersonalNum}
            Li_FindingsInputNumDigits={variables?.Li_FindingsInputNumDigits}
            Li_FindingsInputNumRows={variables?.Li_FindingsInputNumRows}
            Lio_FindingsCategoryChange={variables?.Lio_FindingsCategoryChange}
            onFinishScreen={(obj) => {
              if (obj) {
                this.setState({ Lio_FindingsCategoryUpdate: obj?.Lio_FindingsCategoryChange })
                setTimeout(() => this.findingsEditingAfter(record, obj))
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  showWS02641030_PreviousGuideMatterInquiry(data) {
    const params = {
      ReserveNumOnceBefore: this.getRawValue('ReserveNumOnceBefore'),
      StsInputModeGuideCmt: this.getRawValue('StsInputModeGuideCmt'),
    }
    PreviousGuideMatterInquiryAction.BeforeCallScreen(params)
      .then((res) => {
        const message = '前回指導事項は存在しません'
        if (res && res.message === message) {
          Modal.warning({ component: res.message, okText: 'は　い' })
        } else {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 700,
              component: (
                <WS2641030_PreviousGuideMatterInquiry
                  Li_PreviousGuideMatters={res?.PreviousGuidanceMatters}
                  Li_ReserveNum={this.getRawValue('ReserveNumOnceBefore')}
                  onFinishScreen={(obj) => {
                    const params2 = {
                      ReserveNumOnceBefore: obj.ReserveNumOnceBefore,
                      Lo_StsPreviousDoRun: obj.Lo_StsPreviousGuide
                    }
                    PreviousGuideMatterInquiryAction.AfterCallScreen(params2).then((res) => {
                      this.ListdataGuideCommentInput()
                      this.closeModal()
                    })

                  }}
                />
              ),
            },
          });
        }
      }).catch((err) => {
        const message = '前回指導事項は存在しません'
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        if (res && res.data && res.data.message === message) {
          Modal.warning({ content: res.data.message, okText: 'は　い' })
        }
      });

  }
  showWS0272001_CautionGuideNotesSearchQuery(record, index) {
    const value = this.getRawValue('GuideCommentInput');
    if (this.getRawValue('StsInputModeAll') === 1) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 700,
          component: (
            <WS0272001_CautionGuideNotesSearchQuery
              Li_PatternCode={this.getRawValue('pattern_code')}
              LnkOutCmtCode={this.checkData(value && value[index]?.W3_general_comments_cd, 'number')}
              onFinishScreen={(obj) => {
                value[index].W3_general_comments_cd = obj.Lo_LnkOutCmtCode
                value[index].W3_overall_comments = obj.Lo_recordData?.comment_content
                this.setFormFieldValue('GuideCommentInput', value)
                this.forceUpdate()
                if (value && !value[index].isNew) {
                  this.EventChangeW3AutoBasicJudge(value[index])
                }
                this.closeModal()
              }}
            />
          ),
        },
      });
    }

  }
  changeDataUpdateF12 = () => {
    let tableData = this.getRawValue('tableData')
    let InspectResult = this.getRawValue('InspectResult')
    const StsLeadershipMattersChange = this.getRawValue('StsLeadershipMattersChange')
    const changeCategoryJudge = tableData.some(s => s.Expresion_19 === 82)
    const changeInspectResult = InspectResult.some(s => s.Expression_83 === 82)
    if (!!StsLeadershipMattersChange || changeCategoryJudge || changeInspectResult) {
      return true
    } else {
      return false
    }
  }
  showWS2637019_DataUpdateConfirm() {
    const ReserveNum = this.state.ReserveNum === 0 ? this.props.Li_ReserveNum : this.state.ReserveNum;
    const StsNotesChange = this.getRawValue('StsNotesChange')
    const StsLeadershipMattersChange = this.getRawValue('StsLeadershipMattersChange')
    const StsTotalJudgeChange = this.getRawValue('StsTotalJudgeChange')
    const recordData = {
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      Li_CourseLevel: this.getRawValue('Li_CourseLevel'),
      Li_ReserveNum: this.checkData(ReserveNum, 'number'),
      OptionIn0002000: this.getRawValue('OptionIn0002000'),
      Li_TotalJudgeChange: StsTotalJudgeChange ? 0 : 1,
      Lio_NoteChange: !StsNotesChange ? 0 : 1,
      OverallJudgeG: this.getRawValue('OverallJudgeG'),
      Li_LeadershipMattersChange: !StsLeadershipMattersChange ? 0 : 1
    };
    if (this.state.error.message.length === 0) {
      if (this.changeDataUpdateF12()) {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 400,
            component: (
              <WS2637019_DataUpdateConfirm
                recordData={recordData}
                onFinishScreen={(obj) => {
                  const SelectCategoryList = this.getRawValue('SelectCategoryListForLastTimeDo')
                  if (obj && obj.update) {
                    this.getScreenDataForHitoryBtn({ SelectCategoryList })
                    this.setFormFieldValue('StsLeadershipMattersChange', 0)
                    this.setFormFieldValue('AllSelect', 0)
                  }
                  this.closeModal()
                }}
              />
            ),
          },
        });
      } else {
        Modal.warning({ content: '更新を終了しました' })
      }
    } else {
      Modal.error({ content: this.state.error.message })

    }

  }
  showWS2635011_AutoJudge() { //F10
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS2635011_AutoJudge
            onFinishScreen={(obj) => {
              this.closeModal()
            }}
          />
        ),
      },
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
  ShowWS0605127_ContractLineItemDisplay() {
    const ReserveNum = this.state.ReserveNum === 0 ? this.props.Li_ReserveNum : this.state.ReserveNum;
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1400,
        component: (
          <WS0605127_ContractLineItemDisplay
            Li_ContractType={this.getRawValue('contract_type')}
            Li_ContractOrgCode={this.getRawValue('contract_organization_code')}
            Li_ContractStartDate={this.getRawValue('contract_start_date_on')}
            Li_ContractNum={this.getRawValue('contract_number')}
            Li_MenuOption={""}
            Li_MenuAdminRights={""}
            Li_MenuAuthority={""}
            Li_SubjectNotBeChangedMode={""}
            Li_CourseLevel={this.getRawValue('Li_CourseLevel')}
            Li_ReserveNum={this.checkData(ReserveNum, 'number')}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  showWS2584019_PersonalInfoInquirySub() {
    this.setState({
      ...this.state,
      childModal: {
        width: "60%",
        visible: true,
        component: (
          <Card title={'個人情報照会SUB'}>
            <WS2584019_PersonalInfoInquirySub
              Li_PersonalNum={this.getRawValue('personal_number_id')}
              onFinishScreen={() => {
                this.closeModal();
              }}
            />
          </Card>
        ),
      },
    });
  }
  showWS0273001_VisitsTargetSearchQuery() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1600,
        component:
          <WS0273001_VisitsTargetSearchQuery
            // LinkOutReserveNum
            // Li_StateFlagSpecify
            Li_DateSpecify={this.getRawValue('DateChar')}
            Li_StsConditionSpecify={1}
            // Li_StsReceiptAmountDisplay
            onFinishScreen={(output) => {
              const value = output.recordData
              this.setState({
                initialValues: output.recordData,
                ReserveNum: output.LnkOutReserveNum
              })
              this.setFormFieldValue('AcceptNum', value.receipt_number);
              this.setFormFieldValue('DateChar', moment(value.visit_date_on));
              this.setFormFieldValue('Li_ReserveNum', value.reservation_number);
              setTimeout(() => {
                this.setFormFieldValue('HistoryAdded', 0)
                this.setFormFieldValue('SelectCategoryList', '')
                this.getScreenData()
                this.CategoryJudge()
                this.ListdataGuideCommentInput()
                this.closeModal()
              }, 200)
            }}
          />
        ,
      },
    });
  }
  showWS0714001_HistoryInputSub() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 950,
        component:
          <WS0714001_HistoryInputSub
            Li_PersonalNum={this.getRawValue('personal_number_id')}
            LnkinQueryMode={this.getRawValue('StsInputModeAll')}
            Li_HistoryList={this.getRawValue('CurrentHistoryListOp')}
            onClickedCreate={() => {
              this.closeModal()
            }}
          />
        ,
      },
    });
  }
  showWS2637036_DesignatedInspectVisitsHistory() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component:
          <WS2637036_DesignatedInspectVisitsHistory
            Li_PersonalNum={this.getRawValue('personal_number_id')}
            onClickedCreate={() => {
              this.closeModal()
            }}
          />
        ,
      },
    });
  }
  showWS0898001_IntroduceLetterExtractMaintain() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component:
          <WS0898001_IntroduceLetterExtractMaintain
            onClickedCreate={() => {
              this.closeModal()
            }}
          />
        ,
      },
    });
  }
  userAction1(record) {
    const displayOrder = !!record.display_order
    const params = {
      ...this.Li_Object(),
      Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
      display_order: displayOrder ? record.display_order : this.getRawValue('displayOrder'),
      StsConfirm: 1
    }
    const value = this.getRawValue('SelectCategoryListForLastTimeDo');
    const SelectCategoryList = value;
    OverallResultDisplayInputAction.UserAction1(params).then((res) => {
      this.setFormFieldValue('CategoryDisplayPosition', res && res.CategoryDisplayPosition)
      this.ListdataInspectResult(record, SelectCategoryList)
    })
  }
  LastTimeDos(record) {
    if (record.Expression_27 === 1) {
      const StsAutomaticCalculate = record && record.StsAutomaticCalculate;
      const remarks = record && record.remarks
      const NotRemark = (value) => value === null || value === undefined || value === '' ? true : false;
      const NotStsAutomaticAndRemark = (StsAutomaticCalculate === 0 && NotRemark(remarks))
      if (NotStsAutomaticAndRemark) {
        Modal.confirm({
          content: '前回値を取得しますか?', okText: 'はい',
          onOk: () => {
            const params = {
              ...this.Li_Object(),
              Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
              display_order: record && record.display_order,
              W1_sect_display_num: record && record.W1_sect_display_num,
              W1_inspect_item_display_num: record && record.W1_inspect_item_display_num,
              StsAutomaticCalculate: record && record.StsAutomaticCalculate,
              remarks: record && record.remarks,
              StsConfirmMsg: 1,
              PreviousDoConfirm: 1
            }
            const value = this.getRawValue('SelectCategoryListForLastTimeDo');
            const SelectCategoryList = value;
            OverallResultDisplayInputAction.LastTimeDo(params).then((res) => {
              this.ListdataInspectResult(record, SelectCategoryList)
            })
          }
        })
      }
    }
  }
  findingsDelete(record) {
    Modal.confirm({
      content: '所見内容を削除しますか', okText: 'はい',
      onOk: () => {
        const params = {
          ...this.Li_Object(),
          Li_JungleLevel: this.getRawValue('Li_JungleLevel'),
          W1_sect_display_num: record && record.W1_sect_display_num,
          W1_inspect_item_display_num: record && record.W1_inspect_item_display_num,
          StsConfirm: 1
        }
        const value = this.getRawValue('SelectCategoryListForLastTimeDo');
        const SelectCategoryList = value;
        OverallResultDisplayInputAction.FindingsDelete(params).then((res) => {
          this.ListdataInspectResult(record, SelectCategoryList)
        })
      }
    })
  }
  showCheckCofirmYesOrNo(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component:
          <WS0061003_ConfirmCheckYesYesNo
            Li_Title={'カテゴリ前回Do'}
            Li_Message={'カテゴリ内の前回検査結果を取得します。よろしいですか？'}
            onFinishScreen={(output) => {
              if (output && !!output.Lio_StsReturn) {
                this.userAction1(record)
              }
              this.closeModal()
            }}
          />
        ,
      },
    });
  }
  renderMenuCategory = (record) => (
    <Menu>
      <Menu.Item onClick={() => (this.showCheckCofirmYesOrNo(record))}>前回Do</Menu.Item>
      <Menu.Item onClick={() => (this.showWS2637054_NotesInput(record))}>注意事項</Menu.Item>
    </Menu>
  )
  renderMenuInspect = (record) => (
    <Menu>
      <Menu.Item hidden={record.Expression_27 === 1 ? false : true} onClick={() => (this.LastTimeDos(record))}>前回Do</Menu.Item>
      <Menu.Item hidden={!record.Expression_28} onClick={() => (this.findingsDelete(record))}>所見削除</Menu.Item>
      <Menu.Item onClick={() => (this.showWS0612002_CharacterStringSearch(record))}>検索</Menu.Item>
    </Menu>
  )
  renderFiledGcreendata(data) {
    if (!!data) {
      const keys = !this.isEmpty(Object.keys(data)) ? Object.keys(data) : [];
      const values = !this.isEmpty(Object.values(data)) ? Object.values(data) : []
      if (values.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          for (let y = 0; y < values.length; y++) {
            if (keys[i] === 'DateChar') {
              if (values[i]) {
                this.setFormFieldValue(keys[i], moment(values[i]))
              }
            } else {
              if (keys[i] === 'Expresstion_44') {
                this.setFormFieldValue(keys[i], moment(values[i]).format('NNy/MM/DD'))
              } else {
                this.setFormFieldValue(keys[i], values[i])
              }
            }

          }
        }
      }
    }
  }
  onSave(index) {
    const record = this.getRawValue('GuideCommentInput')[index]
    !!record.isNew ?
      this.insertData(record, index) : this.GuideCommentInputSaveRowData(record, false)
  }
  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };
  titleEventBtn = (lockF9) => (<Space>
    <h4 >総合結果表示/入力</h4>
  </Space>)
  checkNonInput(event) {
    if (event.target.checked) {
      this.setFormFieldValue('Outliers', 0)
      this.setFormFieldValue('NonInput', 1)
      this.getScreenData('NonInput')
      this.setFormFieldValue('AllSelect', 1)
    } else {
      this.setFormFieldValue('SelectCategoryList', '')
      this.setState({ isSelectCategoryList: 1 })
      this.setFormFieldValue('AllSelect', 0)
      const SelectCategoryList = this.state.defaultCategoryList
      this.getScreenDataForHitoryBtn({ SelectCategoryList })
      this.setState({ checkCategoryAll: 0 })
    }
  }
  async checkOutliers(event) {
    if (event.target.checked) {
      this.setFormFieldValue('NonInput', 0)
      this.setFormFieldValue('Outliers', 1)
      this.getScreenData('Outliers')
      this.setFormFieldValue('AllSelect', 1)
    } else {
      this.setFormFieldValue('SelectCategoryList', '')
      this.setState({ isSelectCategoryList: 1 })
      const SelectCategoryList = this.state.defaultCategoryList
      await this.getScreenDataForHitoryBtn({ SelectCategoryList })
      this.setFormFieldValue('AllSelect', 0)
    }

  }

  render() {
    const sex = this.getRawValue('Expression_42');
    const Expression_109 = this.getRawValue('Expression_109');
    let tableData = this.getRawValue('tableData') ?
      this.getRawValue('tableData') : [];
    let InspectResult = this.getRawValue('InspectResult') ?
      this.getRawValue('InspectResult') : [];
    let GuideCommentInput = this.getRawValue('GuideCommentInput') ?
      this.getRawValue('GuideCommentInput') : [];
    const lockF9 = this.checkData(this.state?.initialValues?.StsInputModeAll, 'number') === 0 ? true : false;
    const Expression_150 = this.getRawValue('Expression_150') === undefined ? '検査歴' :
      this.getRawValue('Expression_150')
    const Expression_157 = this.getRawValue('Expression_157') === 1 ? false : true;
    const Expresion_153 = this.getRawValue('Expresion_153') === 1 ? false : true;
    const Expresion_152 = this.getRawValue('Expresion_152') === 1 ? false : true;
    const Expresion_149 = !this.getRawValue('Expresion_149')
      ? '既往歴' : this.getRawValue('Expresion_149');
    const AcceptNum = this.getRawValue('AcceptNum')
    const HistoryAdded = this.getRawValue('HistoryAdded')
    const Expresion_60 = this.getRawValue('Expresion_60')
    const Expresion_34 = this.getRawValue('Expression_34')
    const Expression_158 = this.getRawValue('Expression_158')

    const title = (Expresionparams) => this.getRawValue(Expresionparams);
    return (
      <div className="overall-result-display-input">
        <Card title={
          this.titleEventBtn(lockF9)
        }>
          <Spin spinning={this.state.loadScreenData}>
            <Space>
              <Button disabled={lockF9} onClick={() => this.checkF09()}>規定値</Button>
              <Button disabled={lockF9} onClick={() => this.showWS2635011_AutoJudge()}>判定</Button>
              <Button onClick={() => this.checkF11()}>印刷</Button>
              <Button onClick={() => this.showWS2637019_DataUpdateConfirm()}>更新</Button>
            </Space>
          </Spin>
          <hr style={{ border: "1px solid #F0F0F0", marginBottom: "1.2rem" }} />
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={this.state.DataScreenData}

          >
            <Row gutter={24}>
              <Col span={7}>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item
                      name="DateChar"
                      label="受診日"
                    >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        onKeyUp={(event) => !!AcceptNum && event.keyCode === 13 ? this.clickAccepted() : null}
                        format={'YYYY/MM/DD'} type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ padding: "0" }}>
                    <Form.Item
                      name="AcceptNum"
                    >
                      <Input.Search type="number"
                        min={1}
                        style={{ textAlign: "right" }}

                        onBlur={() => this.clickAccepted()}
                        onSearch={() => {
                          this.showWS0273001_VisitsTargetSearchQuery()
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ padding: "0", flex: ' 0 0 15%' }}>
                    <Button disabled={Expresion_153} type="primary" style={{ float: "right" }}
                      onClick={() => {
                        this.clickAcceptedNo()
                      }}><RightOutlined /></Button>
                    <Button disabled={Expresion_152} type="primary" style={{ float: "right", marginRight: "10px" }}
                      onClick={() => { this.clickAcceptedNoIt() }}><LeftOutlined /></Button>
                  </Col>
                  <Col span={2} style={{ lineHeight: "30px" }}>
                    <img src={GetImage(Expression_109)} ></img>
                  </Col>
                </Row>
              </Col>
              <Col span={7}>
                <Row gutter={24}>
                  <Col span={6}>
                    <Form.Item
                      name="visit_course"
                      label="契約:"
                    >
                      <Input readOnly style={{ border: "none" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Button onClick={() => this.ShowWS0605127_ContractLineItemDisplay()}
                      style={{ float: "right", display: "inline-block", }} icon={<MoreOutlined />}></Button>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="contract_short_name" >
                      <Input readOnly style={{ border: "none" }} />

                    </Form.Item>
                  </Col>
                  <Col span={4}></Col>
                </Row>
              </Col>
              <Col span={10}>
                <Row gutter={30}>
                  <Col span={3}>
                    <Form.Item
                      name="personal_number_id"
                    >
                      <Input readOnly style={{ border: "none" }} />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Button
                      onClick={() => this.showWS2584019_PersonalInfoInquirySub()}
                      style={{ float: "right", display: "inline-block" }} icon={<MoreOutlined />}></Button>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="Expression_45" >
                      <Input readOnly style={{ border: "none", fontSize: "12px" }} />

                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ lineHeight: "30px" }}>
                    <img src={GetImage(sex)}
                      style={{
                        position: "absolute",
                        width: "50px", height: "50px", marginTop: "-17px"
                      }}></img>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="Expresstion_59"
                    >
                      <Input readOnly style={{ border: "none" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="Expresstion_44"
                    >
                      <Input readOnly style={{ border: "none" }} />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <span>{this.getRawValue('Age')} 歳</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={7}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="OverallJudgeG"
                      label="総合判定"
                    >
                      <Input type="text"
                        onDoubleClick={() => {
                          if (this.getRawValue('StsInputModeAll') === 1) {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '25%',
                                component: (
                                  <WS0285001_JudgeQuery
                                    Li_JungleLevel={this.getRawValue('Li_JungleLevel')}
                                    Lio_Judge={this.getRawValue('OverallJudgeG')}
                                    onFinishScreen={(obj) => {
                                    }}
                                  />
                                ),
                              },
                            });
                          }

                        }}
                        style={{ textAlign: 'center', color: Color(Expresion_60)?.Foreground }} />
                    </Form.Item>
                  </Col>
                  {/* <Col span={12}></Col> */}
                </Row>
              </Col>
              <Col span={7}>
                <Row gutter={24}>
                  <Col span={6}>
                    <Form.Item
                      name="StsInputModeAll"
                      label="検査入力"
                      valuePropName="checked"
                    >
                      <Checkbox onChange={() => {
                        this.EventChangeStsInputModeAll()
                      }}></Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="GuideItemDisplay"
                      label="コメント"
                      valuePropName="checked"
                    >
                      <Checkbox onChange={() => {
                        this.EventChangeGuideItemDisplay()
                      }}></Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="NonInput"
                      label="未入力"
                      valuePropName="checked"
                    >
                      <Checkbox onChange={(event) => {
                        this.checkNonInput(event)
                      }}></Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="Outliers"
                      label="異常値"
                      valuePropName="checked"
                    >
                      <Checkbox onChange={(event) => {
                        this.checkOutliers(event)
                      }}></Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={9}>
                <Row gutter={24}>
                  <Col span={18}>
                    <Button type="primary" style={{ float: "left", marginRight: "5px" }}
                      onClick={() => {
                        this.showWS0714001_HistoryInputSub()
                      }}
                    >{Expresion_149}</Button>
                    <Button type="primary" style={{ float: "left", marginRight: "5px" }}
                      onClick={() => {
                        this.showWS2637036_DesignatedInspectVisitsHistory()
                      }}
                    >{Expression_150}</Button>
                    <Button type="primary" style={{ float: "left", marginRight: "5px" }}
                      onClick={() => {
                        this.showWS0898001_IntroduceLetterExtractMaintain()
                      }}
                    >紹介状</Button>
                    <Button disabled={Expression_157} type="primary" style={{ float: "left" }} onClick={() => this.showWS02637001(null)}>前回結果</Button>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="履歴"
                    >
                      <Button type="primary" onClick={async () => await this.eventHitory()} disabled={Expression_158 > 0 ? false : true} style={{ float: "right" }}><RightOutlined /></Button>
                      <Button type="primary" onClick={async () => await this.eventHitorylt()} disabled={HistoryAdded > 0 ? false : true} style={{ float: "right", marginRight: "10px" }}><LeftOutlined /></Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={7}>
                <Table
                  scroll={{ y: '500px' }}
                  size="small"
                  pagination={false}
                  dataSource={tableData}
                  loading={this.state.isLoadingTable}
                  rowKey={record => record.id}
                  rowClassName={(record, index) => record.id === this.state.selectedCategoryRows[0]?.id ? 'table-row-light' : ''}
                  className="mb-3"
                  bordered={true}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: async (event) => {
                        const nodeName = event.target && event.target.nodeName
                        let index = tableData.findIndex(x => x.id === record.id)
                        if (tableData.some(s => s.Expresstion_4 === '●') || this.state.error.message.length > 0) {
                          return;
                        } else {
                          if (nodeName !== 'svg') {
                            await this.setState({
                              selectedCategoryRows: [record],
                              selectedCategoryRowKeys: [record.id],
                              indexCategoryTable: index
                            })
                            await this.selectInspcectListInCategory(record)
                          }
                        }
                      }
                    }
                  }}
                >
                  <Table.Column title={() => (
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Checkbox checked={this.state.checkCategoryAll} onChange={(event) => {
                        const selectedNumber = !event.target.checked ? 0 : 1;
                        this.setFormFieldValue('AllSelect', selectedNumber)
                        this.EventSelectAll(selectedNumber)
                      }}></Checkbox>
                    </Form.Item>
                  )}
                    dataIndex="Expresstion_4" style={{ padding: "0" }}
                    render={(item, record, index) => (
                      <div style={{
                        textAlign: "center",
                        cursor: 'pointer',
                        height: `${record.Expresstion_4.length > 0 ? '20px' : '20px'}`,
                        width: "100%"
                      }}
                        onDoubleClick={() => this.EventDbClickExpression4(record)}
                        onClick={() => { this.EventClickExpression4(record) }} >
                        <span>{record.Expresstion_4}</span>
                      </div>
                    )}
                  />
                  <Table.Column style={{ textAlign: "center" }} title="ｶﾃｺﾞﾘ名称" dataIndex="category_name"
                    width={130}
                    render={(item, record, index) => (
                      <div style={{
                        textAlign: 'left', fontWeight:
                          record?.Expresion_19 === 82 ? 'bold' : ''
                      }}>
                        <Tooltip title={record.Expression_24}><span>{record.category_name}</span></Tooltip>
                        {record.Expression_31 === false ? null :
                          <span style={{ float: 'right' }}><Tooltip title="判定の内容を直接変更しています。">*</Tooltip></span>
                        }
                      </div>
                    )}
                  />
                  <Table.Column style={{ textAlign: "center" }} title="今　回" dataIndex="category_judge"
                    render={(item, record, index) => (
                      < div style={{ textAlign: "center", color: Color(record.Expression_11)?.Foreground }}>
                        <Form.Item
                          name={['tableData', index, 'category_judge']}
                          style={{ marginBottom: "0" }}
                        >
                          <Input
                            style={{
                              textAlign: 'center',
                              border: `${record.Expression_21 === 1 ? '1px solid #A9A9A9' : 'none'}`,
                              color: Color(record.Expression_11)?.Foreground,
                              fontWeight:
                                record?.Expresion_19 === 82 ? 'bold' : ''
                            }}
                            disabled={this.state.error.message.length > 0 && this.state.error.id !== record.id}
                            readOnly={record.Expression_21 === 0 ? true : false}
                            onBlur={(event) => {
                              if (record.Expression_21) {
                                if (this.state.error.message.length > 0 && this.state.error.id !== record.id) {
                                } else {
                                  this.changeCategoryJudge(record, event.target.value)
                                }
                              }
                            }}
                            onDoubleClick={(e) => {
                              if (this.checkData(this.state?.initialValues?.StsInputModeAll, 'number') === 1) {
                                if (record.Expression_21) {
                                  this.showWS0285001_JudgeQuery(record, index)
                                }

                              }
                            }} />
                        </Form.Item>
                      </div>

                    )}
                  />
                  <Table.Column title="前回" dataIndex="category_judge_1_pre" width={100}
                    render={(item, record, index) => (

                      <div style={{ textAlign: 'center', color: Color(record.Expression_12)?.Foreground }}>
                        {record.category_judge_1_pre}
                      </div>

                    )}
                  />
                  <Table.Column title="前々回" dataIndex="category_judge_2_before"
                    render={(item, record, index) => (

                      <div style={{ textAlign: 'center', color: Color(record.Expression_13)?.Foreground }}>
                        {record.category_judge_2_before}
                      </div>

                    )}
                  />
                  <Table.Column id="dropDownCloumn" width={60} style={{ textAlign: 'center' }} render={(text, record, index) => (
                    <Dropdown.Button trigger='click' size='small' overlay={() => this.renderMenuCategory(record)}>

                    </Dropdown.Button>
                  )}>
                  </Table.Column>
                </Table>
              </Col>
              <Col span={17}>
                <Table
                  pagination={false}
                  size="small"
                  scroll={{ y: '500px' }}
                  dataSource={InspectResult}
                  rowKey={record => record.id}
                  loading={this.state.isLoadingTable1}
                  rowClassName={(record, index) => record.id === this.state.selectedInspectRows[0]?.id ? 'table-row-light' : ''}

                  className="mb-3"
                  bordered={true}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: async (event) => {
                        const nodeName = event.target && event.target.nodeName
                        let index = InspectResult.findIndex(x => x.id === record.id)
                        if (nodeName !== 'svg') {
                          await this.setState({
                            selectedInspectRows: [record],
                            selectedInspectRowKeys: [record.id],
                            indexInspectTable: index
                          })
                        //  this.clickPreFixW1_result_val(record)
                        }

                      }
                    }
                  }}
                >
                  <Table.Column title="カテゴリ名称" dataIndex="W1_category_name" width={130}
                    render={(item, record, index) => (
                      <Tooltip title={record.Expression_51}>
                        {record.W1_category_name}
                      </Tooltip>
                    )}
                  />
                  <Table.Column title="検査名称" dataIndex="W1_inspect_name" width={155}
                    render={(item, record, index) => (
                      <Tooltip title={record.Expression_52}>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{
                            marginLeft: 5, fontWeight:
                              record?.Expression_83 === 82 ? 'bold' : ''
                          }}>
                            {record.Expression_84 === '' ? null : <img src={GetImage(record.Expression_84)} alt='icon' />}
                            <span>{record.W1_inspect_name}
                            </span>
                          </div>
                        </div>
                      </Tooltip>
                    )}
                  />
                  <Table.Column width={140} title="参考値" dataIndex="W1_standard_val"
                    render={(item, record, index) => (
                      <div
                        style={{ textAlign: 'center' }}>{record.W1_standard_val}
                        {record.Expression_92 === 0 ? null : <span style={{
                          float: 'right', fontWeight:
                            record?.Expression_83 === 82 ? 'bold' : ''
                        }}>*</span>}
                      </div>
                    )}
                  />

                  <Table.Column title="判" dataIndex="W1_inspect_judge" align="center" width={50}
                    render={(item, record, index) => (
                      <Tooltip title={record.Expression_79}>

                        {
                          this.getRawValue('GuideItemDisplay') === 0 ?
                            <div style={{ textAlign: 'center', color: Color(record.Expression_16)?.Foreground, width: '100%' }}>
                              <span>{record.W1_inspect_judge}</span>
                            </div> :
                            <Form.Item name={['InspectResult', index, 'W1_inspect_judge']}>
                              <Input style={{
                                textAlign: 'center',
                                fontWeight:
                                  record?.Expression_83 === 82 ? 'bold' : '',
                                color: Color(record.Expression_16)?.Foreground,
                                border: `${record.Expression_22 === 1 ? '0.3px solid #A9A9A9' : ''}`
                              }}
                                readOnly={record.Expression_22 === 1 ? false : true}
                                onClick={() => { this.clickSuffixW1InspectJugde(record) }}
                                onBlur={(event) => { this.changeSuffixW1InspectJugde(record, event.target.value) }}
                                onDoubleClick={(e) => {
                                  if (record.Expression_22 === 1) {
                                    this.showWS0285001_JudgeQuery(record, index)
                                  }

                                }} />
                            </Form.Item>
                        }
                      </Tooltip>
                    )}
                  />
                  <Table.Column width={150} title={title('Expression_11')} dataIndex="W1_result_val"
                    render={(item, record, index) => (
                      <Tooltip title={record.Expression_79}>
                        <div style={{ display: 'flex' }}>
                          <span
                            style={{
                              cursor: 'pointer', textAlign: 'right', paddingRight: '5px',
                              color: Color(record.Expression_15)?.Foreground,
                              fontWeight:
                                record?.Expression_83 === 82 ? 'bold' : ''
                            }}>{record.UpAndDown}</span>
                          <Form.Item name={['InspectResult', index, 'W1_result_val']}>
                            <Input
                              value={record.W1_result_val}
                              readOnly={record.Expression_29 === 1 ? false : true}
                              style={{
                                width: '100%', textAlign: `${!record.Expression_39 ? 'center' : 'left'}`,
                                border: `${record.Expression_29 === 0 ? 'none' : '1px solid #A9A9A9'}`,
                                color: Color(record.Expression_14)?.Foreground,
                                fontWeight:
                                  record?.Expression_83 === 82 ? 'bold' : ''
                              }}
                              onBlur={(event) => this.clickPreFixW1_result_val(record, event.target.value)}
                              onDoubleClick={() => {
                                this.clickSuffixW1_result_val(record, index)
                              }}

                              type="text"
                            />
                          </Form.Item>
                        </div>
                      </Tooltip>

                    )}
                  />
                  <Table.Column width={50} title="判" dataIndex="W1_inspect_judge_once" align="center" render={(item, record, index) => (
                    <div style={{ textAlign: 'center', color: Color(record.Expression_17)?.Foreground }}>{record.W1_inspect_judge_once}</div>
                  )}
                  />
                  <Table.Column width={150} title={title('Expression_12')} dataIndex="W1_result_val_once"
                    render={(item, record, index) => (
                      <div style={{ textAlign: `${!record.Expression_39 ? 'center' : 'left'}`, color: Color(record.Expression_17)?.Foreground }}>
                        <span>{record.W1_result_val_once}</span>
                      </div>
                    )}
                  />
                  <Table.Column title="判" width={50} dataIndex="W1_inspect_judge_twice" align="center"
                    render={(item, record, index) => (
                      <div style={{ textAlign: 'center', color: Color(record.Expression_18)?.Foreground }}>
                        <span>{record.W1_inspect_judge_twice}</span></div>
                    )}
                  />
                  <Table.Column width={150} title={title('Expression_13')} dataIndex="W1_result_val_twice"
                    render={(item, record, index) => (
                      <div style={{ textAlign: `${!record.Expression_39 ? 'center' : 'left'}`, color: Color(record.Expression_18)?.Foreground }}>
                        <span>{record.W1_result_val_twice}</span></div>
                    )}
                  />
                  <Table.Column width={60} style={{ textAlign: 'center' }} render={(text, record, index) => (
                    <Dropdown.Button trigger='click' size='small' overlay={() => this.renderMenuInspect(record)}>

                    </Dropdown.Button>
                  )}>
                  </Table.Column>
                </Table>

              </Col>
            </Row>
            {this.checkData(this.state?.initialValues?.GuideItemDisplay, 'number') === 0 ? null :
              <Table
                pagination={false}
                dataSource={GuideCommentInput}
                size="small"
                scroll={{ y: '600px' }}
                rowKey={record => record.id}
                className="mb-3"
                rowClassName={(record, index) => record.id === this.state.selectedGuideRows[0]?.id ? 'table-row-light' : ''}
                loading={this.state.isLoadingTable2}
                bordered={true}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: async () => {
                      let index = GuideCommentInput.findIndex(x => x.id === record.id)
                      await this.setState({
                        selectedGuideRows: [record],
                        selectedGuideRowKeys: [record.id],
                        indexGuideTable: index
                      })
                    }
                  }
                }}
              >
                <Table.Column width={100} title="連番" dataIndex="W3_serial_num" render={(item, record, index) =>
                (
                  <Form.Item
                    name={['GuideCommentInput', index, 'W3_serial_num']}
                    style={{ marginBottom: "0" }}
                  >
                    <InputNumber
                      style={{ color: Color(record.Expression_19)?.Foreground }}
                      onDoubleClick={(e) => { this.showWS2637041_GuideMatterContent(record, index) }} />
                  </Form.Item>
                )
                } />
                <Table.Column width={100} title="コード" dataIndex="W3_general_comments_cd" render={(item, record, index) =>
                (
                  <Form.Item
                    name={['GuideCommentInput', index, 'W3_general_comments_cd']}
                    style={{ marginBottom: "0" }}
                  >
                    {!!record.isNew ?
                      <InputNumber style={{ color: Color(record.Expression_19)?.Foreground }}
                        onDoubleClick={() => this.showWS0272001_CautionGuideNotesSearchQuery(record, index)} /> :
                      <InputNumber
                        style={{ color: Color(record.Expression_19)?.Foreground }}
                        onDoubleClick={() => this.showWS0272001_CautionGuideNotesSearchQuery(record, index)}
                        onChange={(event) => {
                          if (event > 0) {
                            const value = this.getRawValue('GuideCommentInput')[index]
                            this.EventChangeW3GeneralCmtCd(record, value)
                          }
                        }} />
                    }
                  </Form.Item>
                )
                } />
                <Table.Column title={Expresion_34} dataIndex="W3_overall_comments"
                  render={(item, record, index) => (
                    <Form.Item
                      name={['GuideCommentInput', index, 'W3_overall_comments']}
                      style={{ marginBottom: "0" }}
                    >
                      {!!record.isNew ?
                        <Input
                          style={{ color: Color(record.Expression_19)?.Foreground }}
                          onDoubleClick={(e) => { this.showWS2637041_GuideMatterContent(record, index) }} /> :
                        <Input type="text"
                          style={{ color: Color(record.Expression_19)?.Foreground }}
                          onDoubleClick={(e) => { this.showWS2637041_GuideMatterContent(record, index) }}
                          onChange={(event) => {
                            if (event.target.value.length > 0) {
                              const value = this.getRawValue('GuideCommentInput')[index]
                              this.EventChangeW3OverallCmt(record, value)
                            }
                          }} />
                      }
                    </Form.Item>
                  )}
                />
                <Table.Column title="種別" dataIndex="W3_auto_judge_output_type" align="center" width={80}
                  render={(item, record, index) => (
                    <Form.Item
                      name={['GuideCommentInput', index, 'W3_auto_judge_output_type']}
                      style={{ marginBottom: "0" }}
                    >
                      <Input type="text"
                        onChange={(event) => {
                          if (event.target.value.length > 0) {
                            const value = this.getRawValue('GuideCommentInput')[index]
                            this.EventChangeW3AutoBasicJudge(value)
                          }
                        }}
                        onDoubleClick={() => { this.ShowWS2637046_TypeSelect(record, index) }} />
                    </Form.Item>
                  )}
                />
                <Table.Column title="判" dataIndex="W3_auto_judge_basic_judge" align="center" width={80}
                  render={(item, record, index) => (
                    <Form.Item
                      name={['GuideCommentInput', index, 'W3_auto_judge_basic_judge']}
                      style={{ marginBottom: "0" }}
                    >
                      {!!record.isNew ? <Input
                        style={{ textAlign: "center", color: Color(record.Expression_20)?.Foreground }}
                        onDoubleClick={(e) => {
                          this.showWS0285001_JudgeQuery(record, index)
                        }}
                        onBlur={(event) => {
                          const value = this.getRawValue('GuideCommentInput')[index]
                          this.EventChangeW3AutoBasicJudge(value)
                        }}
                      /> :
                        <Input type="text" style={{ textAlign: "center", color: Color(record.Expression_20)?.Foreground }}
                          onDoubleClick={(e) => {
                            this.showWS0285001_JudgeQuery(record, index)
                          }}
                          onBlur={(event) => {
                            const value = this.getRawValue('GuideCommentInput')[index]
                            this.EventChangeW3AutoBasicJudge(value)

                          }} />
                      }
                    </Form.Item>
                  )}
                />
                <Table.Column title="印字" dataIndex="Expression_30" align="center" width={80}
                  render={(item, record, index) => (
                    <Form.Item
                      name={['GuideCommentInput', index, 'Expression_30']}
                      style={{ marginBottom: "0" }}
                    >
                      <Input onDoubleClick={(e) => { this.showWS2637041_GuideMatterContent(record, index) }} type="text" readOnly={true} />
                    </Form.Item>
                  )}
                />
                <Table.Column
                  width={100}
                  style={{ textAlign: 'center' }}
                  title={(item, record, index) =>
                  (<Button onClick={() => this.addRow()}
                    type='primary' icon={(<PlusOutlined />)}></Button>)}
                  render={(item, record, index) => (
                    <div style={{ textAlign: 'center' }}>
                      <Button hidden={this.state.indexGuideTable !== this.findIndexByID(GuideCommentInput, record.id)}
                        style={{ marginLeft: '5px', color: 'green' }} onClick={() =>
                          this.onSave(index)} icon={(< SaveOutlined />)}></Button>
                      <Button hidden={this.state.indexGuideTable !== this.findIndexByID(GuideCommentInput, record.id)}
                        danger onClick={() => !!record?.isNew ? this.removeRow(index) : this.deleteGuideCommentInput(record.id)} icon={(< DeleteOutlined />)}></Button>
                    </div>

                  )}
                />
                <Table.Column width={60} render={(text, record, index) => (
                  <Dropdown.Button style={{ textAlign: 'center' }} trigger='click' size='small' overlay={() => (
                    <Menu>
                      <Menu.Item onClick={() => this.showWS02641030_PreviousGuideMatterInquiry(record)}>前回ｺﾒﾝﾄ</Menu.Item>
                    </Menu>
                  )}>

                  </Dropdown.Button>
                )}>
                </Table.Column>
              </Table>
            }

          </Form>
        </Card>
        <ModalDraggable 
         footer={null}
         width={this.state.childModal.width}
         component={this.state.childModal.component}
         visible={this.state.childModal.visible}
         bodyStyle={{ margin: 0, padding: 0 }}
         destroyOnClose={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2637001_OverallResultDisplayInput);
