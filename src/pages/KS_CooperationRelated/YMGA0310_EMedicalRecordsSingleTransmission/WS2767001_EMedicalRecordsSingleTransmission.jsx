/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Button, Row, Col, Tabs, Form, Space, Table, Spin, message, InputNumber, Dropdown, Menu } from "antd";
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';

import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS2767010_SendingConfirm from 'pages/KS_CooperationRelated/YMGA0310_EMedicalRecordsSingleTransmission/WS2767010_SendingConfirm.jsx';
import WS2767017_AnotherDayInspectSet from 'pages/KS_CooperationRelated/YMGA0310_EMedicalRecordsSingleTransmission/WS2767017_AnotherDayInspectSet.jsx';
import EMedicalRecordsSingleTransmissionAction from 'redux/CooperationRelated/EMedicalRecordsSingleTransmission/EMedicalRecordsSingleTransmission.actions'
import WS2776001_EMedicalRecordsTransmissionHistory from 'pages/KS_CooperationRelated/YMGA0300_EMedicalRecordsBatchTransmission/WS2776001_EMedicalRecordsTransmissionHistory.jsx';
import WS2778001_EMedicalRecordsInspectRequestMaintain from 'pages/KS_CooperationRelated/YMGA0610_EMedicalRecordsInspectRequestMaintain/WS2778001_EMedicalRecordsInspectRequestMaintain.jsx';
import WS2767009_ConsultSelect from 'pages/KS_CooperationRelated/YMGA0310_EMedicalRecordsSingleTransmission/WS2767009_ConsultSelect.jsx';
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
import WS2768001_EMedicalRecordsInspectAddSub from 'pages/KS_CooperationRelated/YMGA0310_EMedicalRecordsSingleTransmission/WS2768001_EMedicalRecordsInspectAddSub.jsx';
import WS2583001_ConsultInquirySub from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub.jsx';
import ModalDraggable from "components/Commons/ModalDraggable";

import Color from 'constants/Color'
import WS2767023_Debug from "./WS2767023_Debug";
import moment from "moment-timezone";
class WS2767001_EMedicalRecordsSingleTransmission extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_PersonalNum: PropTypes.any,
    Li_TransmissionMethod: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '[E-カルテ]単体送信';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      loaddingFrm: false,
      isloadding: false,
      isloadding2: false,
      colorText: "",
      Expression_36: "",
      Expression_23: 0,
      enabled_36: false,
      selectedRow: {},
      selectedRowKeys: [],
      selectedRowRight: {},
      selectedRowRightKeys: [],

      tabKey: '0',
      ReserveNum: 0,
      StsIncomplete: false,
    };
    this.onChangeTab = this.onChangeTab.bind(this)
  }

  componentDidMount() {
    // this.formRef.current?.setFieldsValue({
    //   PersonalNum: this.props.Li_PersonalNum ? this.props.Li_PersonalNum : "",
    //   tableData: []
    // })

    this.forceUpdate()
    let data = {
      Li_CourseLevel: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
      Li_ReserveNum: this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
      Li_PersonalNum: this.isEmpty(this.props.Li_PersonalNum) ? "" : this.props.Li_PersonalNum,
      Li_TransmissionMethod: this.isEmpty(this.props.Li_TransmissionMethod) ? "" : this.props.Li_TransmissionMethod
    }
    this.setState({ tabKey: '0' })
    this.GetScreenData(data)
  }

  componentDidUpdate(PreV) {
    if (this.props !== PreV) {
      // this.formRef.current?.setFieldsValue({
      //   PersonalNum: this.props.Li_PersonalNum ? this.props.Li_PersonalNum : "",
      //   tableData: []
      // })
      this.forceUpdate()
      let data = {
        Li_CourseLevel: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
        Li_ReserveNum: this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
        Li_PersonalNum: this.isEmpty(this.props.Li_PersonalNum) ? "" : this.props.Li_PersonalNum,
        Li_TransmissionMethod: this.isEmpty(this.props.Li_TransmissionMethod) ? "" : this.props.Li_TransmissionMethod
      }
      this.setState({ tabKey: '0' })
      this.GetScreenData(data)
    }
  }

  GetScreenData(data) {
    this.setState({ loaddingFrm: true })
    EMedicalRecordsSingleTransmissionAction.GetScreenData(data)
      .then(res => {
        this.setState({

        })
        this.GetDataIndex(res)
        this.forceUpdate()
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ loaddingFrm: false }))
  }

  GetDataIndex(data) {
    EMedicalRecordsSingleTransmissionAction.GetDataIndex(data)
      .then(res => {
        this.formRef.current?.setFieldsValue({
          ...res,
          visit_date_on: res?.visit_date_on == '0000/00/00' ? '' : res?.visit_date_on
        })
        this.setState({
          colorText: this.ChangeColor(res?.state_flag),
          Expression_23: res?.Expresion_23,
          Expression_36: this.SetText(res?.state_flag),
          enabled_36: res?.state_flag !== 1 ? false : true,
          ReserveNum: res?.ReserveNum,
          Li_PersonalNum: res?.Li_PersonalNum,
          StsIncomplete: res?.StsIncomplete,
          OptionInfoYmga0300: res?.OptionInfoYmga0300,
        })
        this.GetGroup()
        this.forceUpdate()
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ loaddingFrm: false }))
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  ShowWS0248001_PersonalInfoSearchQuery() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS0248001_PersonalInfoSearchQuery
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                PersonalNum: output?.Lo_PersonalNumId,
                // kana_name: output?.recordData?.kana_name,
                // kanji_name: output?.recordData?.kanji_name,
              })
              this.forceUpdate()
              this.ChangePersonalNum()
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  ChangeColor(state_flag) {
    if (state_flag === 0) {
      return Color(263)
    } else if (state_flag === 1) {
      return Color(264)
    } else if (state_flag === 2) {
      return Color(265)
    } else {
      return Color(266)
    }
  }

  ShowEMedicalRecordsInspectRequestMaintain() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2778001_EMedicalRecordsInspectRequestMaintain
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  ShowEMedicalRecordsTransmissionHistory() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2776001_EMedicalRecordsTransmissionHistory
            Li_PersonalNum={this.formRef.current?.getFieldValue("PersonalNum")}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  ShowWS2767009_ConsultSelect() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 700,
        component: (
          <WS2767009_ConsultSelect
            Li_PersonalNum={this.formRef.current?.getFieldValue("PersonalNum")}
            Lio_ReserveNum={this.state.ReserveNum}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                visit_date_on: output?.recordData?.visit_date_on == '0000/00/00' ? '' : output?.recordData?.visit_date_on,
                visit_course: output?.recordData?.visit_course
              })
              this.forceUpdate()
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  SetText(state_flag) {
    if (state_flag === 2 || state_flag === 3) {
      return '復　元'
    } else {
      return 'ｷｬﾝｾﾙ'
    }
  }

  LoadRederData() {
    this.setState({ loaddingFrm: true })
    let data = {
      W1_reserve_num: this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
      PersonalNum: this.isEmpty(this.formRef.current?.getFieldValue("PersonalNum")) ? "" : this.formRef.current?.getFieldValue("PersonalNum"),
      W1_course_level: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel
    }
    EMedicalRecordsSingleTransmissionAction.GetScreenData(data)
      .then(res => {
        this.formRef.current?.setFieldsValue({
          ...res,
          visit_date_on: res?.visit_date_on == '0000/00/00' ? '' : res?.visit_date_on
        })
        this.setState({
          colorText: this.ChangeColor(res?.state_flag),
          Expression_23: res?.Expresion_23,
          Expression_36: this.SetText(res?.state_flag),
          enabled_36: res?.state_flag !== 1 ? false : true,
          ReserveNum: res?.ReserveNum
        })
        this.GetGroup()
      })
      .catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ loaddingFrm: false }))
  }

  CancelBtn(data) {
    this.setState({ loaddingFrm: true })
    EMedicalRecordsSingleTransmissionAction.CancelBtn(data).then(res => {
      this.ChangePersonalNum()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loaddingFrm: false }))
  }

  HandleCancel() {
    if (!this.formRef.current?.getFieldValue("PersonalNum")) return
    if (this.formRef.current?.getFieldValue("state_flag") === 2 || this.formRef.current?.getFieldValue("state_flag") === 3) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 400,
          component: (
            <WS0061009_CheckYesNoYes
              Li_Title={'復元'}
              Li_DisplayContent={'ｷｬﾝｾﾙ状態を復元しますか？'}
              onFinishScreen={(output) => {
                if (output.Lio_StsReturn) {
                  this.formRef.current?.setFieldsValue({
                    StsSend: output.Lio_StsReturn
                  })
                  this.CancelBtn({ PersonalNum: this.formRef.current?.getFieldValue("PersonalNum"), StsSend: output.Lio_StsReturn ? 1 : 0 })
                }
                this.closeModal()
              }}
            />),
        },
      })
    } else {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 400,
          component: (
            <WS0061009_CheckYesNoYes
              Li_Title={'ｷｬﾝｾﾙ'}
              Li_DisplayContent={'ｷｬﾝｾﾙ送信を行いますか？'}
              onFinishScreen={(output) => {
                if (output.Lio_StsReturn) {
                  this.formRef.current?.setFieldsValue({
                    StsSend: output.Lio_StsReturn
                  })
                  this.CancelBtn({ PersonalNum: this.formRef.current?.getFieldValue("PersonalNum"), StsSend: output.Lio_StsReturn ? 1 : 0 })
                }
                this.closeModal()
              }}
            />),
        },
      })
    }
  }

  async onChangeTab(key) {
    await this.setState({ tabKey: key })

    this.GetGroup()
  }

  GetGroup() {
    this.setState({
      isloadding: true,
      isloadding2: true
    })
    let data = {
      Li_ReserveNum: this.state.ReserveNum,
      Li_TransmissionMethod: parseInt(this.state.tabKey),
    }
    EMedicalRecordsSingleTransmissionAction.Group(data).then(res => {
      this.formRef.current?.setFieldsValue({ listData: res ? res : [] })
      this.setState({ isloadding: false })
      if (res?.length > 0) {
        this.setState({
          selectedRow: res[0],
          selectedRowKeys: [res[0].id]
        })
        this.InspectContent(res[0])
      } else {
        this.formRef.current?.setFieldsValue({ tableData: [] })
        this.setState({ isloadding2: false })
      }
    })
      .catch(error => {
        this.setState({ isloadding: false, isloadding2: false })
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      })
  }

  InspectContent(value) {
    this.setState({ isloadding2: true })
    let data = {
      ...value,
      Li_ByDateGroup: value.W1_character_key,
      Li_ReserveNum: this.state.ReserveNum,
      Li_TransmissionMethod: parseInt(this.state.tabKey),
    }
    EMedicalRecordsSingleTransmissionAction.InspectContent(data)
      .then(res => {
        this.formRef.current?.setFieldsValue({ tableData: res ? res : [] })
        this.setState({
          selectedRowRight: res ? res[0] : {},
          selectedRowRightKeys: res ? [res[0]?.id] : []
        })
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isloadding2: false, loaddingFrm: false }))
  }

  RetransmissBtn() {
    this.setState({ loaddingFrm: true })
    let data = {
      W1_course_level: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
      Li_CourseLevel: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
      PersonalNum: this.formRef.current?.getFieldValue("PersonalNum") ? this.formRef.current?.getFieldValue("PersonalNum") : "",
      ReserveNum: this.state.ReserveNum,
    }
    EMedicalRecordsSingleTransmissionAction.RetransmissBtn(data).then(res => {
      this.ChangePersonalNum()
      this.SubmitT()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loaddingFrm: false }))
  }

  SubmitT() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS2767010_SendingConfirm
            Lio_StsRetransmission={this.props.Li_Force}
            onFinishScreen={(output) => {
              if (output?.Lo_StsSend === 1) {
                this.formRef.current?.setFieldsValue({
                  StsSend: output?.Lo_StsSend,
                  StsDay: output?.Lo_StsDay
                })
                this.forceUpdate()
                this.setState({ loaddingFrm: true })
                let data = {
                  W1_course_level: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
                  Li_CourseLevel: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
                  PersonalNum: this.formRef.current?.getFieldValue("PersonalNum") ? this.formRef.current?.getFieldValue("PersonalNum") : "",
                  ReserveNum: this.state.ReserveNum,
                  StsSend: output?.Lo_StsSend
                }
                EMedicalRecordsSingleTransmissionAction.Submit(data)
                  .then(res => {
                    this.ChangePersonalNum()
                  })
                  .catch(error => {
                    this.setState({ loaddingFrm: false })
                    const res = error.response;
                    if (!res || res.data || res.data.message) {
                      message.error('エラーが発生しました');
                      return;
                    }
                  })
              } else {
                this.ChangePersonalNum()
              }
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  HandleRetransmissBtn() {
    if (!this.state.StsIncomplete) {
      this.RetransmissBtn()
    } else {
      this.SubmitT()
    }
    //this.RetransmissBtn()
  }

  AnotherDate() {
    this.setState({ loaddingFrm: true })
    let data = {
      W1_course_level: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
      Li_CourseLevel: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
      PersonalNum: this.formRef.current?.getFieldValue("PersonalNum") ? this.formRef.current?.getFieldValue("PersonalNum") : "",
      ReserveNum: this.state.ReserveNum,
    }
    EMedicalRecordsSingleTransmissionAction.AnotherDate(data).then(res => {
      this.ShowWS2767017_AnotherDayInspectSet()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loaddingFrm: false }))
  }

  ShowWS2767017_AnotherDayInspectSet() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component: (
          <WS2767017_AnotherDayInspectSet
            Li_ReserveNum={this.state.ReserveNum}
            // W1_character_key={this.props}
            onFinishScreen={(output) => {
              if (output) {
                this.formRef.current?.setFieldsValue({
                  StsSend: output?.Lo_StsSend
                })
                this.forceUpdate()
                this.setState({ loaddingFrm: true })
                let data = {
                  W1_course_level: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
                  Li_CourseLevel: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
                  PersonalNum: this.formRef.current?.getFieldValue("PersonalNum") ? this.formRef.current?.getFieldValue("PersonalNum") : "",
                  ReserveNum: this.state.ReserveNum,
                  StsSend: output?.Lo_StsSend
                }
                EMedicalRecordsSingleTransmissionAction.Submit(data)
                  .then(res => {
                    this.LoadRederData()
                  })
                  .catch(error => {
                    const res = error.response;
                    if (!res || res.data || res.data.message) {
                      message.error('エラーが発生しました');
                      return;
                    }
                  })
                  .finally(() => this.setState({ loaddingFrm: false }))
              }
              if (output.Lo_StsSend) {
                this.GetGroup()
              }

              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  HandleAnotherDate() {
    if (!this.formRef.current?.getFieldValue("StsIncomplete")) {
      this.AnotherDate()
    } else {
      this.ShowWS2767017_AnotherDayInspectSet()
    }
  }

  HandleF3(parram) {
    let tableData = [...this.formRef.current?.getFieldValue("tableData")]
    if (tableData.length > 0) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 400,
          component: (
            <WS0061009_CheckYesNoYes
              Li_Title={'削除'}
              Li_DisplayContent={'削除しますか？'}
              onFinishScreen={(output) => {
                if (output.Lio_StsReturn) {
                  this.formRef.current?.setFieldsValue({
                    StsConfirm: output.Lio_StsReturn
                  })
                  this.setState({ loaddingFrm: true })
                  let data = {
                    ReserveNum: this.state.ReserveNum,
                    W1_set_cd: parram
                  }
                  EMedicalRecordsSingleTransmissionAction.F3(data).then(res => {
                    this.GetGroup()
                  }).catch(error => {
                    const res = error.response;
                    if (!res || res.data || res.data.message) {
                      message.error('エラーが発生しました');
                      return;
                    }
                  }).finally(() => this.setState({ loaddingFrm: false }))
                }
                this.closeModal()
              }}
            />),
        },
      })
    }
  }

  HandleF4(parram) {
    let tableData = [...this.formRef.current?.getFieldValue("tableData")]
    let list = [...this.formRef.current?.getFieldValue("listData")]
    if (tableData.length > 0 || list.length > 0) {
      this.showModalInspectAddSub(parram)
    }
  }

  showModalInspectAddSub(setcode) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS2768001_EMedicalRecordsInspectAddSub
            Li_ReserveNum={this.state.ReserveNum}
            Li_InspectCode={setcode ? setcode : ''}
            onFinishScreen={(output) => {
              this.GetGroup()
              this.closeModal()
            }}
          />),
      },
    })
  }

  showModalDebug() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2767023_Debug
            Li_ReserveNum={this.state.ReserveNum}
            Li_Unsent={this.formRef.current?.getFieldValue("StsIncomplete")}
            Li_Sent={null}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />),
      }
    })
  }

  ShowWS2583001_ConsultInquirySub() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1500,
        component: (
          <WS2583001_ConsultInquirySub
            Li_ReserveNum={this.state.ReserveNum}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />),
      },
    })
  }

  ChangePersonalNum() {
    let parram = {
      PersonalNum: this.formRef.current?.getFieldValue("PersonalNum"),
      W1_reserve_num: this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
      TransmissionMethod: this.isEmpty(this.props.Li_TransmissionMethod) ? "" : this.props.Li_TransmissionMethod
    }
    EMedicalRecordsSingleTransmissionAction.ChangePersonalNum(parram).then(res => {
      this.GetDataIndex(res)
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally()
  }

  render() {
    return (
      <div className="e-medical-records-single-transmission">
        <Card title={<Space>
          {/* <Button
            onClick={() => {
              if (this.formRef.current?.getFieldValue("tableData") && this.formRef.current?.getFieldValue("tableData").length > 0) {
                this.HandleF3()
              }
            }}
          >
            削除</Button>
          <Button
            onClick={() => {
              if (this.state.ReserveNum && this.state.ReserveNum > 0) {
                this.HandleF4()
              }
            }}
          >
            追加</Button> */}
          <Button
            onClick={() => {
              if (this.state.ReserveNum && this.state.ReserveNum > 0) {
                this.showModalDebug()
              }
            }}>デバッグ</Button>
        </Space>}>
          <Spin spinning={this.state.loaddingFrm} >
            <Form ref={this.formRef} autoComplete="off"  >
              <Row style={{ height: 50 }}>
                <Col span={16} onDoubleClick={() => this.ShowWS2583001_ConsultInquirySub()}>
                  <Row  >
                    <Form.Item style={{ width: 160, marginBottom: 5, marginRight: '5px' }}>
                      <Row>
                        <Form.Item style={{ width: 120, marginBottom: 0 }} name="PersonalNum" >
                          <InputNumber maxLength={15} min={0}
                            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                            onBlur={(e) => {
                              let val = e.target.value
                              if (val == 0 || !val) {
                                this.formRef.current?.setFieldsValue({
                                  PersonalNum: '',
                                  kana_name: '',
                                  kanji_name: ''
                                })
                              } else {
                                val = val.replaceAll('-', '')
                                this.formRef.current?.setFieldsValue({
                                  PersonalNum: val,
                                })
                              }
                              this.ChangePersonalNum()
                            }} />
                        </Form.Item>
                        <Button style={{
                          width: 32,
                          padding: '0px 7px',
                          color: '#00000073',
                          borderLeftColor: 'transparent',
                          borderTopLeftRadius: 0, borderBottomLeftRadius: 0
                        }}
                          onClick={() => { this.ShowWS0248001_PersonalInfoSearchQuery() }}
                        >{<SearchOutlined style={{ fontSize: 16 }} />}</Button>
                      </Row>
                    </Form.Item>
                    <Form.Item >
                      <div>{this.formRef.current?.getFieldValue("kana_name")}</div>
                      <div>{this.formRef.current?.getFieldValue("kanji_name")}</div>
                    </Form.Item>
                  </Row>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }} >
                  <Form.Item>
                    <Button type="primary" onClick={() => this.ShowEMedicalRecordsInspectRequestMaintain()} > 設定 </Button>
                    <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => this.ShowEMedicalRecordsTransmissionHistory()} > 履歴 </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Card size="small" style={{ backgroundColor: '#1c61ba' }}
                onDoubleClick={() => this.ShowWS2583001_ConsultInquirySub()} >
                <Row>
                  <Col span={16}>
                    <Row>
                      <Col style={{ width: 135 }}>
                        <Space>
                          <Form.Item style={{ marginBottom: '0px', color: 'white' }} >{this.formRef.current?.getFieldValue("visit_date_on")?.replaceAll('-', '/')}</Form.Item>
                          <Form.Item style={{ marginBottom: '0px', color: 'white' }} >{this.formRef.current?.getFieldValue("visit_course")}</Form.Item>
                        </Space>
                      </Col>
                      <Col style={{ width: 60 }}>
                        <Form.Item style={{ marginBottom: '0px' }} ><Button type="primary" onClick={() => this.ShowWS2767009_ConsultSelect()} > 切替 </Button></Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={8} style={{ textAlign: 'right', backgroundColor: this.state.colorText }}>
                    <Button style={{
                      color: Color(this.formRef.current?.getFieldValue('Expression_35'))?.Foreground,
                      background: Color(this.formRef.current?.getFieldValue('Expression_35'))?.Background
                    }}
                    > {this.formRef.current?.getFieldValue("Expression_34")} </Button>
                    <Button style={{
                      marginLeft: '10px',
                      color: Color(265)?.Foreground,
                      background: Color(265)?.Background
                    }} >{this.formRef.current?.getFieldValue("Expression_25")} </Button>
                  </Col>
                </Row>
              </Card>
              <Card>
                <Tabs activeKey={this.state.tabKey} onChange={this.onChangeTab}>
                  <Tabs.TabPane tab="臨床" key="0">
                    <Row gutter={24}>
                      {/* <Row style={{ display: this.formRef.current?.getFieldValue("Expression_27") ? '' : 'none' }} > */}
                      <Col span={8} >
                        <Table
                          size="small"
                          style={{ cursor: 'pointer' }}
                          rowClassName={(record, index) => record.id === this.state.selectedRow.id ? 'table-row-light' : ''}
                          dataSource={this.formRef.current?.getFieldValue("listData") ? this.formRef.current?.getFieldValue("listData") : []}
                          loading={this.state.isloadding}
                          pagination={false} bordered={true}
                          rowKey={(record) => record.id} scroll={{ y: 700 }}
                          onRow={(record, rowIndex) => {
                            return {
                              onClick: async () => {
                                this.InspectContent(record)
                                await this.setState({
                                  selectedRow: record,
                                  selectedRowKeys: [record.id]
                                })
                              }
                            }
                          }}
                        >
                          <Table.Column title="ｸﾞﾙｰﾌﾟ" dataIndex="W1_character_key" />
                        </Table>
                      </Col>
                      <Col span={16} >
                        <Table
                          size="small"
                          style={{ cursor: 'pointer' }}
                          rowClassName={(record, index) => record.id === this.state.selectedRowRight.id ? 'table-row-light' : ''}
                          dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                          loading={this.state.isloadding2}
                          pagination={false}
                          bordered={true}
                          rowKey={(record) => record.id}
                          scroll={{ y: 500 }}
                          onRow={(record, rowIndex) => {
                            return {
                              onClick: () => {
                                this.setState({
                                  selectedRowRight: record,
                                  selectedRowRightKeys: [record.id]
                                })
                              },
                              onDoubleClick: () => {
                                this.showModalInspectAddSub(record.W1_set_cd)
                              }
                            }
                          }}
                        >
                          <Table.Column title="ｺｰﾄﾞ" dataIndex="W1_set_cd" width={80} />
                          <Table.Column title="検査名称" dataIndex="official" />
                          <Table.Column title="ｵｰﾀﾞｰ" dataIndex="Expression_17" />
                          <Table.Column title="別日" dataIndex="Expression_8" width={80} align='center'
                            render={(value, record, index) => {
                              return (
                                <div hidden={record.Expression_9}>
                                  {record.Expression_8 && record.Expression_8 !== '0000/00/00' ? moment(record.Expression_8)?.format('MM/DD') : null}
                                </div>
                              )
                            }} />
                          <Table.Column title="状態" dataIndex="Expression_10" width={80} align='center'
                            render={(value, record, index) => {
                              return (
                                <div>
                                  <span style={{ color: Color(record.Expression_11)?.Foreground }}>{record.Expression_10}</span>
                                </div>
                              )
                            }} />
                          <Table.Column width={50} align='center'
                            render={(value, record, index) => {
                              return (
                                <Dropdown
                                  trigger='click'
                                  overlay={() => (
                                    <Menu>
                                      <Menu.Item key="2"
                                        onClick={() => {
                                          this.HandleF4()
                                        }}
                                      >追加</Menu.Item>
                                      <Menu.Item key="1"
                                        onClick={() => {
                                          this.HandleF3(record.W1_set_cd)
                                        }}
                                      >削除</Menu.Item>
                                    </Menu>
                                  )}
                                >
                                  <Button size='small' icon={<MoreOutlined />}></Button>
                                </Dropdown>
                              )
                            }} />
                        </Table>
                      </Col>
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="画像" key="1">
                    <Row gutter={24}>
                      <Col span={8} >
                        <Table
                          size="small"
                          style={{ cursor: 'pointer' }}
                          rowClassName={(record, index) => record.id === this.state.selectedRow.id ? 'table-row-light' : ''}
                          dataSource={this.formRef.current?.getFieldValue("listData") ? this.formRef.current?.getFieldValue("listData") : []}
                          loading={this.state.isloadding}
                          pagination={false}
                          bordered={true}
                          rowKey={(record) => record.id}
                          scroll={{ y: 700 }}
                          onRow={(record, rowIndex) => {
                            return {
                              onClick: async () => {
                                this.InspectContent(record)
                                await this.setState({
                                  selectedRow: record,
                                  selectedRowKeys: [record.id]
                                })
                              }
                            }
                          }}
                        >
                          <Table.Column title="ｸﾞﾙｰﾌﾟ" dataIndex="W1_character_key" />
                        </Table>
                      </Col>
                      <Col span={16} >
                        <Table
                          style={{ cursor: 'pointer' }}
                          rowClassName={(record, index) => record.id === this.state.selectedRowRight.id ? 'table-row-light' : ''}
                          dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                          loading={this.state.isloadding2}
                          pagination={false}
                          bordered={true}
                          size="small"
                          rowKey={(record) => record.id}
                          scroll={{ y: 500 }}
                          onRow={(record, rowIndex) => {
                            return {
                              onClick: () => {
                                this.setState({
                                  selectedRowRight: record,
                                  selectedRowRightKeys: [record.id]
                                })
                              },
                              onDoubleClick: () => {
                                this.showModalInspectAddSub(record.W1_set_cd)
                              }
                            }
                          }}
                        >
                          <Table.Column title="ｺｰﾄﾞ" dataIndex="W1_set_cd" width={100} />
                          <Table.Column title="検査名称" dataIndex="official" />
                          <Table.Column title="ｵｰﾀﾞｰ" dataIndex="Expression_17" />
                          <Table.Column title="別日" dataIndex="Expression_8" width={80} align='center'
                            render={(value, record, index) => {
                              return (
                                <div>
                                  {record.Expression_8 && record.Expression_8 !== '0000/00/00' ? moment(record.Expression_8)?.format('MM/DD') : null}
                                </div>
                              )
                            }} />
                          <Table.Column title="状態" dataIndex="Expression_10" width={60} align='center'
                            render={(value, record, index) => {
                              return (
                                <div>
                                  <span style={{ color: Color(record.Expression_11)?.Foreground }}>{record.Expression_10}</span>
                                </div>
                              )
                            }}
                          />
                          <Table.Column width={50}
                            render={(value, record, index) => {
                              return (
                                <Dropdown
                                  trigger='click'
                                  overlay={() => (
                                    <Menu>
                                      <Menu.Item key="1"
                                        onClick={() => {
                                          this.HandleF3()
                                        }}
                                      >削除</Menu.Item>
                                      <Menu.Item key="2"
                                        onClick={() => {
                                          this.HandleF4()
                                        }}
                                      >追加</Menu.Item>
                                    </Menu>
                                  )}
                                >
                                  <Button size='small' icon={<MoreOutlined />}></Button>
                                </Dropdown>
                              )
                            }} />
                        </Table>
                      </Col>
                    </Row>
                  </Tabs.TabPane>
                </Tabs>
              </Card>
              <div style={{ float: 'right' }}>
                <Button type='primary' style={{ margin: '5px' }}
                  disabled={this.state.enabled_36}
                  onClick={() => this.HandleCancel()}>
                  {this.state.Expression_36}
                </Button>
                <Button type="primary" style={{ margin: '5px' }}
                  disabled={this.state.Expression_23 > 0 ? false : true}
                  onClick={() => this.HandleAnotherDate()} >
                  別日送信
                </Button>
                <Button type="primary" style={{ margin: '5px' }}
                  disabled={this.state.Expression_23 > 0 ? false : true}
                  onClick={() => this.HandleRetransmissBtn()} >
                  {this.state.StsIncomplete ? '送　信' : '再送信'}
                </Button>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2767001_EMedicalRecordsSingleTransmission);
