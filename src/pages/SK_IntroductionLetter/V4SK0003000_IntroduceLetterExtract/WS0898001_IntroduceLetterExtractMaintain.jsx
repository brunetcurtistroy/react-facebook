import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import moment from 'moment';
import IntroduceLetterExtractMaintainAction from 'redux/IntroductionLetter/IntroduceLetterExtract/IntroduceLetterExtractMaintain.action'
import { Dropdown, Checkbox, Card, Form, Input, Button, InputNumber, message, Table, Col, Row, Space, Modal, Tooltip, Menu } from "antd";
import WS0898003_IntroduceLetterInquiry from "./WS0898003_IntroduceLetterInquiry";
import WS0898028_InspectInput from "./WS0898028_InspectInput";
import WS0936006_ReturnInfoInputSub from 'pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0936006_ReturnInfoInputSub.jsx';
import WS0936002_IntroduceLetterReturnInput from 'pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0936002_IntroduceLetterReturnInput.jsx';
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS0888026_IntroduceLetterSubjectCmtInquiry from 'pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0888026_IntroduceLetterSubjectCmtInquiry.jsx';
import WS0887001_IntroduceLetterVariousMasterInquiry from 'pages/SK_IntroductionLetter/V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry.jsx';
import WS0900001_DisplayConsultHistory from 'pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0900001_DisplayConsultHistory.jsx';
import WS0433001_PrinterConfirm from 'pages/SK_IntroductionLetter/V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm.jsx';
import WS2589011_FormatSelect from 'pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS2589011_FormatSelect.jsx';
import { download_file } from "helpers/CommonHelpers";
import ColumnButtonCustom from 'components/Commons/TableColumn'
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0898001_IntroduceLetterExtractMaintain extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_PersonalNum: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = "紹介状抽出保守";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoading: false,
      isLoading2: false,
      selectedRows: [],
      selectedRowKeys: [],
      indexTable: 0,
      count: 1001
    };
  }
  componentDidMount() {
    if (this.props) {
      this.getScreenData()
      this.getSpecifyinput()
    }
  }
  componentDidUpdate(propTypes) {
    if (this.props !== propTypes) {
      this.getScreenData()
      this.getSpecifyinput()
    }
  }
  params() {
    const params = {
      W1_id_cd: this.props.Li_PersonalNum ? this.props.Li_PersonalNum : this.getRawValue('GpersonalNum'),
      W1_reserve_num: this.props.Li_ReserveNum ? this.props.Li_ReserveNum : '',
    }
    return params
  }
  getScreenData() {
    IntroduceLetterExtractMaintainAction.getScreenData({ ...this.params() }).then((res) => {
      this.renderForm(res)
    })
  }
  stepForEnable(record) {
    if (this.getRawValue('dataSource')?.length === 0) {
      if (record && record.isNew) {
        this.setFormFieldValue('Expression_13_1', 1)
      } else {
        this.setFormFieldValue('Expression_13_1', 0)
      }
      this.setFormFieldValue('Expression_13_2', 0)
      this.setFormFieldValue('Expression_14', 0)
      this.setFormFieldValue('Expression_21_1', 0)
      this.setFormFieldValue('Expression_21_2', 0)
      this.setFormFieldValue('Expression_21_3', 0)
    }
  }
  getSpecifyinput() {
    this.setState({ isLoading: true })
    IntroduceLetterExtractMaintainAction.specifyinput({ ...this.params() }).then((res) => {
      if (res) {
        this.setFormFieldValue('dataSource', res)
        this.setState({
          selectedRows: [res[0]],
          selectedRowKeys: [res[0]?.id],
          indexTable: 0,
        })
        setTimeout(() => {
          this.renderForm(res[0])
          this.stepForEnable(res[0])
          this.getInspectinquiry()
        }, 500)
        if (res && res.length === 0) {
          this.addRow()
        }
      }

    }).finally(() => { this.setState({ isLoading: false }) })
  }
  getInspectinquiry() {
    this.setState({ isLoading2: true })
    const params = {
      reservation_number: this.getRawValue('reservation_number'),
      course_level: this.getRawValue('course_level'),
      department: this.getRawValue('department'),
    }
    IntroduceLetterExtractMaintainAction.inspectinquiry(params).then((res) => {
      this.setFormFieldValue('dataSource2', res)
    }).finally(() => { this.setState({ isLoading2: false }) })
  }
  dnClickEvent(record) {
    const params = {
      department: record?.department,
      issued_flg: record?.issued_flg,
      course_level: record?.course_level,
      reservation_number: record?.reservation_number,
      StsJ41Department: record?.StsJ41Department,
    }
    IntroduceLetterExtractMaintainAction.dblClick(params).then((res) => {
      if (res && res?.message === 'Call Screen WS0936002') {
        this.showWS0936002_IntroduceLetterReturnInput()
      }
      if (res && res?.message === 'Call Screen WS0898028') {
        this.showWS0898028_InspectInput()
      }
    })
  }
  getNameEvents(event, name, valueName, enabled) {
    const params = {
      [valueName]: this.getRawValue(valueName)
    }
    const index = this.state.indexTable
    const data = this.getRawValue('dataSource')
    IntroduceLetterExtractMaintainAction[valueName](params).then((res) => {
      this.setFormFieldValue(name, Object.values(res)[0])
      this.setFormFieldValue(valueName, event?.target?.value)
      data[index][valueName] = event?.target?.value
      data[index][name] = Object.values(res)[0]
      this.setFormFieldValue(enabled, 1)
      this.setFormFieldValue('dataSource', data)
      this.forceUpdate()
    })
  }
  showWS0898028_InspectInput() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1000,
        component: < WS0898028_InspectInput
          Li_CourseLevel={this.getRawValue('course_level')}
          Li_ReserveNum={this.getRawValue('reservation_number')}
          Li_Department={this.getRawValue('department')}
          Li_Date={this.getRawValue('visit_day_on')}
          Li_PersonalNum={this.getRawValue('personal_number_id')}
          Li_AcceptNum={this.getRawValue('accepted_no')}
          Li_PatternCode={this.getRawValue('pattern_code')}
          onFinishScreen={(output) => { }}
        />,
      },
    });
  }
  showWS0936002_IntroduceLetterReturnInput() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component: < WS0936002_IntroduceLetterReturnInput
          Li_CourseLevel={this.getRawValue('course_level')}
          Li_ReserveNum={this.getRawValue('reservation_number')}
          Li_DepartmentH58Ex={this.getRawValue('department')}
          Li_ReturnInfoDisplay={1}
          onFinishScreen={(output) => { }}
        />,
      },
    });
  }

  showWS0888026_IntroduceLetterSubjectCmtInquiry() {
    this.setState({
      ...this.state,
      childModal: {
        width: '60%',
        visible: true,
        component: (
          <WS0888026_IntroduceLetterSubjectCmtInquiry
            onFinishScreen={({ Lo_Cmtcode, Lo_CommentCode, recordData }) => {
              this.setFormFieldValue('general_comment_code', Lo_CommentCode)
              this.setFormFieldValue('Expression_45', recordData?.FL_comment_content)
              this.onKeyUpRenderData('Expression_45', 'general_comment_code', 'Expression_21_3')
              this.closeModal();
            }}
          />
        ),
      },
    })
  }
  showWS0248001_PersonalInfoSearchQuery() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "90%",
        component: (
          <WS0248001_PersonalInfoSearchQuery
            onFinishScreen={(output) => {
              // set data (noresult)
              this.setFormFieldValue('GpersonalNum', output.Lo_PersonalNumId)
              this.getScreenData()
              this.getSpecifyinput()
              this.closeModal();
            }}
          />
        ),
      },
    });
  }
  showIntroduceLetterVariousMasterInquiry(name, manageCode) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0887001_IntroduceLetterVariousMasterInquiry
            Li_ManageCode={manageCode}
            onFinishScreen={(output) => {
              const expression44 = manageCode === 7 ? 'Expression_43' : 'Expression_44';
              this.formRef.current?.setFieldsValue({
                [name]: output?.Lo_VariousCodes,
                [expression44]: output?.recordData['findings_content']
              })
              if (name === 'department') {
                if (this.getRawValue('department')?.length > 0) {
                  this.setFormFieldValue('Expression_21_2', 1)
                  this.onKeyUpRenderData('Expression_43', 'department', 'Expression_21_2')

                }
              }
              if (name === 'doctor_code') {
                if (this.getRawValue('doctor_code')?.length > 0) {
                  this.onKeyUpRenderData('Expression_44', 'doctor_code', 'Expression_21_3')

                }
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  showWS0900001_DisplayConsultHistory() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component: < WS0900001_DisplayConsultHistory
          LnkIn_Dks160PersonalId={this.getRawValue('GpersonalNum')}
          LnkOt_Dks160Date={this.getRawValue('visit_date_on')}
          LnkOt_Dks160ConsultNum={this.getRawValue('accepted_no')}
          LnkOt_Dks160Course={this.getRawValue('medical_exam_course')}
          onFinishScreen={(output) => {
            this.setFormFieldValue('GdateChars', output?.LnkOt_Dks160Date)
            this.setFormFieldValue('accepted_no', output?.LnkOt_Dks160ConsultNum)
            this.setFormFieldValue('medical_exam_course', output?.LnkOt_Dks160Course)
            if (this.getRawValue('GdateChars').length > 0) {
              this.onKeyUpRenderData('Expression_50', 'GdateChars', 'Expression_13_2')
            }
            if (this.getRawValue('accepted_no').length > 0) {
              this.onKeyUpRenderData('accepted_no', 'accepted_no', 'Expression_21_1')
            }

            this.closeModal()
          }}
        />,
      },
    });
  }
  renderForm(res) {
    if (res) {
      const keys = Object.keys(res)
      const values = Object.values(res)
      keys.forEach((item, i) => {
        this.setFormFieldValue(`${item}`, values[i])
        if (item === 'Expression_21') {
          this.setFormFieldValue('Expression_21_1', values[i])
          this.setFormFieldValue('Expression_21_2', values[i])
          this.setFormFieldValue('Expression_21_3', values[i])
        }
        if (values[i] == 0) {
          this.setFormFieldValue(`${item}`, '')
        }
        if (item === 'GpersonalNum') {
          if (values[i]?.length > 0 && res && res.isNew) {
            this.setFormFieldValue('Expression_13_1', 1)
          }
        }
      })
      this.setFormFieldValue('Expression_14', 1)
    }

  }
  onKeyUpRenderData(name, valueName, enabled) {
    const index = this.state.indexTable
    const data = this.getRawValue('dataSource')
    if (data && data.length > 0) {
      data[index][valueName] = this.getRawValue(valueName)
      data[index][name] = this.getRawValue(name)
      this.setFormFieldValue('dataSource', data)
      this.setFormFieldValue(enabled, 1)
      this.forceUpdate()
    }

  }
  onKeyUpRenderDateAcept(event, name, valueName, enabled) {
    const index = this.state.indexTable
    const data = this.getRawValue('dataSource')
    if (data && data.length > 0) {
      this.GCharDate(event, valueName)
      data[index][name] = this.getRawValue(valueName)
      this.setFormFieldValue('dataSource', data)
      if (this.getRawValue(valueName)?.length > 0) {
        this.setFormFieldValue(enabled, 1)
      }
      this.forceUpdate()
    }
  }
  onEnable(valueName) {
    if(this.getRawValue(valueName)?.length > 0) {
       for(var i = 1; i < 3; i ++) {
         this.setFormFieldValue(`Expression_21_${i}`, 1)
       }
    }
  }
  GCharDate(event, name) {
    if (name === 'GdateChars') {
      const value = Number(event.target.value);
      const getMonth = (new Date().getMonth() + 1);
      const month = getMonth < 10 && getMonth > 0 ? `0${getMonth}` : getMonth
      const year = (new Date().getFullYear());
      const date = value < 10 && value > 0 ? `0${value}` : value
      if (!isNaN(value)) {
        if (date > 31 || date === 0) {
          Modal.error({ content: '不正な日付です' })
        } else {
          this.setFormFieldValue('GdateChars', `${year}/${month}/${date}`)
        }
      } else {
        const number = event.target.value.split('/')
        if (typeof Number(number[0]) || typeof Number(number[1]) || typeof Number(number[2])) {
          if (!isNaN(number[2])) {
            if (number[2] > 31 || number[2] == 0) {
              Modal.error({ content: '不正な日付です' })
            } else {
              const dateNum = number[2] < 10 && number[2] > 0 ? `0${number[2]}` : number[2]
              const convert = moment(moment(new Date(year, month - 1, dateNum))).format('YYYY/MM/DD')
              this.setFormFieldValue('GdateChars', convert)
            }
          } else {
            Modal.error({ content: '不正な日付です' })
          }
        } else {
          Modal.error({ content: '不正な日付です' })
        }
        return;
      }
    }
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      }
    ])
  }
  printF08() {
    IntroduceLetterExtractMaintainAction.printF08Before().then((res) => {
      if (res && res.message == 'Call Screen WS0433001') {
        this.showWS0433001_PrinterConfirm(res && res.variables)
        this.renderForm(res && res.variables)
      }
      if (res && res.message == 'Call Screen WS2589011') {
        this.showWS2589011_FormatSelect(res && res.variables)
        this.renderForm(res && res.variables)
      }
    })
  }
  showWS2589011_FormatSelect(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '30%',
        component: (
          <WS2589011_FormatSelect
            Lio_PrinterNo={record.Lo_PrinterNo}
            Lio_Preview={record.Lo_Preview}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                Preview: output.Lo_Preview,
                PrinterNum: output.Lo_PrinterNo,
                StsOutput: output.Lo_StsOutput,
                FormatList: output.Lo_FormatListCvsFormat
              })
              if (output.Lo_StsOutput) {
                this.printF08_After()
              }

              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  showWS0433001_PrinterConfirm(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '30%',
        component: (
          <WS0433001_PrinterConfirm
            Li_PreviewSpecifiedValue={record.Li_PreviewSpecifiedValue}
            Li_PrinterNoSpecifiedValue={record.Li_PrinterNoSpecifiedValue}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                Preview: output.Lo_Preview,
                PrinterNo: output.Lo_PrinterNo,
                StsOutput: output.Lo_StsOutput
              })
              if (output.Lo_StsOutput) {
                this.printF08_After()
              }

              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  showWS0898003_IntroduceLetterInquiry() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "800px",
        component: <WS0898003_IntroduceLetterInquiry
          onFinishScreen={(output) => {
            if (output) {
              this.setFormFieldValue('GpersonalNum', output?.Lo_PersonalNum)
              this.setFormFieldValue('kanji_name', output?.recordData?.kanji_name)
              this.getSpecifyinput()
            }
            this.closeModal()
          }}
        />,
      },
    });
  }
  printF08_After() {
    const params = {
      StsOutput: this.getRawValue('StsOutput') ? 1 : 0,
      Preview: this.getRawValue('Preview') ? 1 : 0,
      FormatList: this.getRawValue('FormatList'),
      PrinterNo: this.getRawValue('PrinterNo'),
      visit_date_on: this.getRawValue('visit_date_on'),
      personal_number_id: this.getRawValue('personal_number_id'),
      accepted_no: this.getRawValue('accepted_no'),
      course_level: this.getRawValue('course_level'),
      department: this.getRawValue('department'),
      reservation_number: this.getRawValue('reservation_number'),
      OptionHghp18C0: this.getRawValue('OptionHghp18C0'),
    }
    IntroduceLetterExtractMaintainAction.printF08After(params).then((res) => {
      if (res && res.data && res.data.message) {
        Modal.warning({
          title: res.data.message,
          width: 300,
        });
      } else {
        download_file(res);
        message.success("完了！");
      }
    })
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
  getRawValue(name) {
    return this.formRef?.current?.getFieldValue(name)
  }
  handleAdd() {
    const { count } = this.state;
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    const params = {
      id: `Test${count}`,
      isNew: true,
      Expression_50: '  ',
      Expression_43: '',
      Expression_44: '',
      Expression_45: '',
      Expression_46: '×', Expression_13_1: 0,
      Expression_48: '×', Expression_13_2: 0,
      Expression_14: 0,
      Expression_21_1: 0, Expression_21_3: 0,
      Expression_21_2: 0,
      visit_date_on: '0000-00-00',
      GdateChars: '', doctor_code: '',
      accepted_no: '', general_comment_code: '',
      department: '', Remarks: '',
      issued_flg: 0, course_level: 0,
      reservation_number: '',
      StsJ41MedicalInstitutions: 1,
      medical_institution_code: 1,
      StsJ41Doctor: 1, StsJ42: 0,
      personal_number_id: this.getRawValue('GpersonalNum'),
      pattern_code: '0000-100', BeforeDepartment: 10
    }
    let arr = [...data];
    arr.unshift(params)
    this.setState({
      count: count + 1,
      selectedRowKeys: arr.length > 0 ? [arr[0].id] : [],
      selectedRows: arr.length > 1 ? [arr[0]] : [],
      tableIndex: 0
    });
    this.setFormFieldValue('dataSource', arr)
    this.renderForm(arr[0])
    this.stepForEnable(arr[0])
    if (this.getRawValue('GpersonalNum')?.length > 0) {
      if (arr[0] && arr[0].isNew) {
        this.setFormFieldValue('Expression_13_1', 1)
      }
    }
    this.getInspectinquiry()
    this.forceUpdate()
  }
  addRow() {
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
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
  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  removeRow(index) {
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    const table = data.filter((item, i) => index !== i);
    setTimeout(() => {
      this.setState({
        selectedRows: table.length > 0 ? [table[0]] : [],
        selectedRowKeys: table.length > 0 ? [table[0]?.id] : [],
        tableIndex: 0
      })
      this.renderForm(table[0])
      if (this.getRawValue('GpersonalNum')?.length > 0) {
        if (table[0] && !table[0].isNew) {
          this.setFormFieldValue('Expression_13_1', 0)
        }
      }
      this.getInspectinquiry()
    }, 500)
    this.setFormFieldValue('dataSource', table)
    this.forceUpdate()
  }
  deleteData(record) {
    const params = {
      course_level: record.course_level,
      reservation_number: record.reservation_number,
      visit_date_on: record.visit_date_on,
      department: record.department,
    }
    Modal.confirm({
      content: '消去してもよろしいですか？',
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => IntroduceLetterExtractMaintainAction.deleteData(params).then(() => {
        this.getSpecifyinput()
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
    })
  }
  onSave(index) {
    // click event save data
    const record = this.getRawValue('dataSource')[index]
    !!record.isNew ?
      this.insertData(record, index) : this.SaveRowData(record, false)
  }
  insertData(record, index) {
    // save data form FE
    const value = this.getRawValue('dataSource')[index]
    const isNew = true;
    this.SaveRowData(value, isNew)
  }
  checkIssuedFlg(event) {
    const check = event.target.checked ? 1 : 0
    const data = this.getRawValue('dataSource')
    this.setFormFieldValue('issued_flg', check)
    if (check === 1) {
      data[this.state.indexTable].Expression_46 = '〇'
      data[this.state.indexTable].issued_flg = 1
    } else {
      data[this.state.indexTable].Expression_46 = '×'
      data[this.state.indexTable].issued_flg = 0
    }
    this.setFormFieldValue('dataSource', data)
    if (this.getRawValue('accepted_no')?.length > 0 || !this.state.selectedRows[0]?.isNew) {
      this.setFormFieldValue('Expression_21_1', !check)
    }
    if (this.getRawValue('department')?.length > 0 || !this.state.selectedRows[0]?.isNew) {
      this.setFormFieldValue('Expression_21_2', !check)
    }
    if (this.getRawValue('doctor_code')?.length > 0 || !this.state.selectedRows[0]?.isNew) {
      this.setFormFieldValue('Expression_21_3', !check)
    }
    this.forceUpdate()

  }
  SaveRowData(record, isNew) {
    // api
    // isNew => điều kiện check Thêm mới -ko truyền id # Update - Truyền id
    const req = {
      GdateChars: record.GdateChars,
      accepted_no: record.accepted_no,
      department: record.department,
      doctor_code: record.doctor_code,
      Expression_44: record.Expression_44,
      general_comment_code: record.general_comment_code,
      Remarks: this.getRawValue('Remarks'),
      issued_flg: record.issued_flg,
      course_level: record.course_level,
      reservation_number: record.reservation_number,
      visit_date_on: record.visit_date_on,
      StsJ41MedicalInstitutions: record.StsJ41MedicalInstitutions,
      medical_institution_code: record.medical_institution_code,
      StsJ41Doctor: record.StsJ41Doctor,
      StsJ42: record.StsJ42,
      personal_number_id: record.personal_number_id,
      pattern_code: record.pattern_code,
      BeforeDepartment: record.BeforeDepartment,
    }
    const params = isNew ? { ...req } : { ...req, id: record.id }
    IntroduceLetterExtractMaintainAction.saveDate(params).then(() => {
      this.getSpecifyinput()
    }).catch(err => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    });
  }
  renderMenu(record) {
    return <Menu hidden={record?.isNew}>
      <Menu.Item onClick={() => this.printF08()}>紹介状設定</Menu.Item>
      <Menu.Item onClick={() => this.showWS0898028_InspectInput()}>明細入力</Menu.Item>
      <Menu.Item onClick={() => this.showWS0936002_IntroduceLetterReturnInput()}>返送入力</Menu.Item>
    </Menu>
  }
  render() {
    return (
      <div className="introduce-letter-extract-maintain">
        <Card title="紹介状抽出保守">
          <Space>
            {/* <Button readOnly={true}>フォルダ</Button> folder view  tam thoi k dung*/}
            <Button disabled={!this.state.selectedRows[0]} onClick={() => this.printF08()}>印刷</Button>
          </Space>
          <hr style={{ border: "1px solid #F0F0F0", marginBottom: "1.2rem" }} />
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    this.showWS0898003_IntroduceLetterInquiry()
                  }}
                >
                  個人番号
                </Button>
              </Col>
              <Col span={4}>
                <Form.Item name="GpersonalNum" label=" ">
                  <Input type="text"
                    style={{ textAlign: 'right' }}
                    onKeyUp={(event) => {
                      if (event.keyCode === 13) {
                        this.getScreenData()
                        this.getSpecifyinput()
                      }
                    }}
                    onBlur={() => {
                      this.getScreenData()
                      this.getSpecifyinput()
                    }}
                    onDoubleClick={() => {
                      this.showWS0248001_PersonalInfoSearchQuery()
                    }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="kanji_name" label=" ">
                  <Input readOnly style={{ border: 'none' }} />
                </Form.Item>
              </Col>
            </Row>

            <Table
              dataSource={this.getRawValue('dataSource')}
              bordered
              scroll={{ y: 700 }}
              size="small"
              loading={this.state.isLoading}
              pagination={false}
              rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
              rowKey={(record) => record.id}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    this.setState({
                      selectedRows: [record],
                      selectedRowKeys: [record.id],
                      indexTable: rowIndex,
                    })
                    setTimeout(() => {
                      if (record && record.isNew) {
                        this.renderForm(this.getRawValue('dataSource')[0])
                      } else {
                        this.renderForm(record)
                      }
                      this.getInspectinquiry()
                    }, 500)
                    this.forceUpdate()
                  },
                  onDoubleClick: () => {
                    this.dnClickEvent(record)
                  }
                };
              }}
            >
              <Table.Column width={120} title="受診日" dataIndex="Expression_50" />
              <Table.Column title="診療科" dataIndex="Expression_43" />
              <Table.Column title="判定医" dataIndex="Expression_44" />
              <Table.Column title="指導" dataIndex="Expression_45" />
              <Table.Column title="発行" width={80} dataIndex="Expression_46"
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: Color(record.Expression_47)?.Foreground }}>{value}
                      </span></div>)
                }}
              />
              <Table.Column title="返送" width={80} dataIndex="Expression_48"
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: Color(record.Expression_49)?.Foreground }}>{value}
                      </span></div>)
                }}
              />
              {(ColumnButtonCustom({
                addRow: () => this.addRow(), // in FE
                onSaveData: () => this.onSave(this.state.indexTable), // Call API
                deleteRow: () => this.removeRow(this.state.indexTable), // in FE
                deleteData: () => this.deleteData(this.state.selectedRows[0]), // Call API
                dataSource: this.getRawValue('dataSource'),
                tableIndex: this.state.indexTable,
              }))}
              <Table.Column id="dropDownCloumn" width={60} style={{ textAlign: 'center' }} render={(text, record, index) => (
                <Dropdown.Button trigger='click' size='small' overlay={() => this.renderMenu(record)}>
                </Dropdown.Button>
              )}></Table.Column>
            </Table>

            <Row style={{ marginTop: "10px" }}>
              <Col span={16}>

                <Row gutter={24}>
                  <Col span={12}>
                    <div style={{ display: "flex" }}>
                      <Form.Item
                        label="受診日"
                        name="GdateChars"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                      >
                        <Input
                          maxLength={10}
                          onBlur={(event) => this.onKeyUpRenderDateAcept(event, 'Expression_50', 'GdateChars', 'Expression_13_2')}
                          onDoubleClick={() => this.showWS0900001_DisplayConsultHistory()}
                          disabled={!this.getRawValue('Expression_13_1')}
                        ></Input>
                      </Form.Item>
                      <Form.Item
                        label="受付No"
                        name="accepted_no"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ marginLeft: "5px" }}
                      >
                        <Input
                          onBlur={(event) => this.onKeyUpRenderDateAcept(event, 'accepted_no', 'accepted_no', 'Expression_21_1')}
                          onDoubleClick={() => this.showWS0900001_DisplayConsultHistory()}
                          disabled={!this.getRawValue('Expression_13_2')}
                          style={{ textAlign: 'right' }}></Input>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={9}>
                  </Col>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <Form.Item label=" " name="issued_flg" valuePropName="checked">
                      <Checkbox onClick={(event) => this.checkIssuedFlg(event)}>発行</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>

                <div style={{ display: "flex" }}>
                  <Form.Item
                    label="診療科"
                    name="department"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <InputNumber
                      onBlur={(event) =>
                        this.getNameEvents(event, 'Expression_43', 'department', 'Expression_21_2')
                      }
                      disabled={!this.getRawValue('Expression_21_1')}
                      onDoubleClick={() => this.showIntroduceLetterVariousMasterInquiry('department', 7)}></InputNumber>
                  </Form.Item>
                  <Form.Item label=" ">
                    <span>{this.getRawValue('Expression_43')}</span>
                  </Form.Item>
                </div>

                <div style={{ display: "flex" }}>
                  <Form.Item
                    label="判定医"
                    name="doctor_code"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <InputNumber
                      onBlur={(event) =>
                        this.getNameEvents(event, 'Expression_44', 'doctor_code', 'Expression_21_3')
                      }
                      disabled={!this.getRawValue('Expression_21_2')}
                      onDoubleClick={() => this.showIntroduceLetterVariousMasterInquiry('doctor_code', 4)}></InputNumber>
                  </Form.Item>
                  <Form.Item label=" ">
                    <span>{this.getRawValue('Expression_44')}</span>
                  </Form.Item>
                </div>

                <div style={{ display: "flex" }}>
                  <Form.Item
                    label="指　導"

                    name="general_comment_code"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <InputNumber
                      onBlur={(event) => {
                        this.getNameEvents(event, 'Expression_45', 'general_comment_code', 'Expression_21_3')
                      }
                      }
                      disabled={!this.getRawValue('Expression_21_3')}
                      onDoubleClick={() => this.showWS0888026_IntroduceLetterSubjectCmtInquiry()}></InputNumber>
                  </Form.Item>
                  <Form.Item label=" ">
                    <span>{this.getRawValue('Expression_45')}</span>
                  </Form.Item>
                </div>

                <Form.Item name="Remarks" label="備　考" style={{ marginLeft: "2px" }}>
                  <Input.TextArea rows={5} onDoubleClick={() => this.dnClickEvent(this.state.selectedRows[0])}></Input.TextArea>
                </Form.Item>

              </Col>
              <Col span={8} style={{ paddingLeft: "5px" }}>
                <Card size="small" style={{ backgroundColor: "#1c61ba" }}>
                  <Button
                    type="primary"
                    disabled={!this.getRawValue('Expression_21_3')}
                    style={{ float: "right", backgroundColor: "#14468C", color: "white" }}
                    onClick={() => {
                      this.dnClickEvent(this.state.selectedRows[0])
                    }}
                  >
                    内容編集
                  </Button>
                </Card>

                <Table
                  dataSource={this.getRawValue('dataSource2')}
                  bordered
                  scroll={{ y: 150 }}
                  loading={this.state.isLoading2}
                  size="small"
                  pagination={false}
                  rowKey={(record) => record.id}
                >
                  <Table.Column width={110} title="検査ｺｰﾄﾞ" dataIndex="exam_code"
                    render={(value, record, index) => {
                      return <div style={{ textAlign: 'right' }}><span>{value}</span></div>
                    }}
                  />
                  <Table.Column title="検査名" dataIndex="exam_name"
                    render={(value, record, index) => {
                      return <Tooltip title={record.exam_name} style={{ textAlign: 'right' }}><span>{value}</span></Tooltip>
                    }}
                  />

                </Table>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          destroyOnClose={true}
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
)(WS0898001_IntroduceLetterExtractMaintain);
