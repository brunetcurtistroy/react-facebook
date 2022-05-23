import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable eqeqeq */
import React from "react";
import PropTypes, { any } from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Space,
  // Modal,
  DatePicker,
  message,
  Spin,
  InputNumber,
  Modal,
} from "antd";

import WS2786020_SelectCourseList from "./WS2786020_SelectCourseList.jsx";
import WS2786013_AcceptanceNumberSelect from "./WS2786013_AcceptanceNumberSelect.jsx";
import ConditionAddSubAction from "redux/basicInfo/ConsultInfoReconstruction/ConditionAddSub.actions";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery.jsx";
import WS0302001_SetInfoSearch from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0302001_SetInfoSearch.jsx";
import WS0495001_ConditionExpressInfoInquiry from "pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0495001_ConditionExpressInfoInquiry.jsx";
import WS2787004_AffiliationSelectSub from "pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS2787004_AffiliationSelectSub.jsx";

import moment from "moment";
const dateFormat = "YYYY/MM/DD";
const styleHr = {
  background: "transparent",
  opacity: "0.3",
  marginBottom: "1.5em",
};

const style = {
  grid: {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  },
  gridSM: {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
}
class WS2786001_ConditionAddSub extends React.Component {
  static propTypes = {
    Li_DateF: PropTypes.any,
    Li_DateT: PropTypes.any,
    Li_AcceptNoF: PropTypes.any,
    Li_AcceptNoT: PropTypes.any,
    Li_CourseF: PropTypes.any,
    Li_CourseT: PropTypes.any,
    Li_TimeDivision: PropTypes.any,
    Li_FacilityType: PropTypes.any,
    Li_State: PropTypes.any,
    Li_Insurer: PropTypes.any,
    Li_Office: PropTypes.any,
    Li_BranchShop: PropTypes.any,
    Li_PersonalNum: PropTypes.any,
    Lio_KeyInfo: PropTypes.any,
    Li_KeySerialNumF: any,
    Li_KeySerialNumT: any,
    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "条件追加SUB";

    this.state = {
      dataSelectCourseList: "",
      objSearch: {},
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      combobox_facility_type: [],
      Lio_KeyInfo: [],
      InspectFrame: [],
      timeOutID: null,

      isLoadingForm: false,

      isUnValidPersonal: false,
      isUnValidOfficeCode: false,
    };
    this.onFinish = this.onFinish.bind(this);
  }
  componentDidMount() {
    this.getScreenData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getScreenData();
    }
  }
  getScreenData() {
    let params = {
      Li_DateF: this.props.Li_DateF ? moment(this.props.Li_DateF).format('YYYY/MM/DD') : null,
      Li_DateT: this.props.Li_DateT ? moment(this.props.Li_DateT).format('YYYY/MM/DD') : null,
      Li_AcceptNoF: this.props.Li_AcceptNoF,
      Li_AcceptNoT: this.props.Li_AcceptNoT,
      Li_CourseF: this.props.Li_CourseF,
      Li_CourseT: this.props.Li_CourseT,
      Li_TimeDivision: this.props.Li_TimeDivision,
      Li_FacilityType: this.props.Li_FacilityType,
      Li_State: this.props.Li_State,
      Li_Insurer: this.props.Li_Insurer,
      Li_Office: this.props.Li_Office,
      Li_BranchShop: this.props.Li_BranchShop,
      Li_PersonalNum: this.props.Li_PersonalNum,
      Lio_KeyInfo: this.props.Lio_KeyInfo,
      Li_KeySerialNumF: this.props?.Li_KeySerialNumF,
      Li_KeySerialNumT: this.props?.Li_KeySerialNumT,
    }
    this.setState({ isLoadingForm: true })
    ConditionAddSubAction.getScreenData(params)
      .then((res) => {
        let data = res ? res.data : {}
        this.setState({
          combobox_facility_type: data ? data.combobox_facility_type : [],
          Lio_KeyInfo: data ? data.Lio_KeyInfo : [],
          InspectFrame: data ? data.InspectFrame : [],
          isLoadingForm: false
        });

        this.formRef.current?.setFieldsValue({
          Lio_KeyInfo: data ? data.Lio_KeyInfo_FT ? parseInt(data.Lio_KeyInfo_FT)
            : data.Lio_KeyInfo.length > 0 ? data.Lio_KeyInfo[0].key_serial_number : '' : '',
          FacilityType: data?.FacilityType_GB,
          StateFlag: data ? data.StateFlag ? parseInt(data.StateFlag) : '' : '',
          TimeDivision: data ? data.TimeDivision : '',
          InspectFrame: data ? data.InspectFrame_GL : '00',
          DateFChar: data && data?.DateFDate ? moment(data.DateFDate) : this.props.Li_DateF ? moment(this.props.Li_DateF) : null,
          DateTChar: data && data?.DateTDate ? moment(data.DateTDate) : this.props.Li_DateT ? moment(this.props.Li_DateT) : null,
          ReceiptNumF: data ? data.ReceiptNumF === 0 ? '' : data.ReceiptNumF : '',
          ReceiptNumT: data ? data.ReceiptNumT === 0 ? '' : data.ReceiptNumT : '',
          BelongsF: data ? data.BelongsF === 0 ? '' : data.BelongsF : '',
          BelongsT: data ? data.BelongsT === 0 ? '' : data.BelongsT : '',
          BranchStoreCode: data ? data.BranchStoreCode === 0 ? '' : data.BranchStoreCode : '',
          ConditionalExpdatasion: data ? data.ConditionalExpdatasion === 0 ? '' : data.ConditionalExpdatasion : '',
          CourseCodeF: data ? data.CourseCodeF : '',
          CourseCodeT: data ? data.CourseCodeT : '',
          CourseList: data ? data.CourseList : '',
          InsurerCode: data ? data.InsurerCode === 0 ? '' : data.InsurerCode : '',
          PersonalNum: data ? data.PersonalNum : '',
          OfficeCode: data ? data.OfficeCode : '',
          UseSet: data ? data.UseSet : '',
        });
      })
      .catch((err) => {
        this.setState({ isLoadingForm: true })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  }

  onFinish(values) {
    let data = {
      ...values,
      DateFChar: moment(values.DateFChar).format("YYYY/MM/DD"),
      DateTChar: moment(values.DateTChar).format("YYYY/MM/DD"),
    };
    if (this.state.isUnValidPersonal) {
      Modal.error({
        title: '指定の個人番号は存在しません。',
        width: 350
      })
    } else {
      if (this.state.isUnValidOfficeCode) {
        Modal.error({
          title: '事業所コードに誤りがあります',
          width: 326
        })
      } else {
        ConditionAddSubAction.update(data)
          .then((res) => {
            if (this.props.onFinishScreen) {
              this.props.onFinishScreen({
                // Expression_36: res?.data?.Expression_36 || 163,
                Lio_KeyInfo: this.formRef.current?.getFieldValue("Lio_KeyInfo"),
                Expression_36: 169,
                recordData: data,
              });
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
    }
  }

  clearData() {
    ConditionAddSubAction.clearData()
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lio_KeyInfo: this.formRef.current?.getFieldValue("Lio_KeyInfo"),
            Expression_36: 163,
          });
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

  getNamePersonal() {
    const params = {
      PersonalNum: this.formRef?.current?.getFieldValue('PersonalNum') || '',
    }
    ConditionAddSubAction.getNamePersonalAction(params)
      .then(res => {
        if (res?.data?.kanji_name) {
          this.formRef?.current?.setFieldsValue({
            kanji_name: res?.data?.kanji_name
          })
          this.setState({
            isUnValidPersonal: false
          })
        } else {
          this.formRef?.current?.setFieldsValue({
            kanji_name: ''
          })
          this.setState({
            isUnValidPersonal: true
          })
          Modal.error({
            title: '指定の個人番号は存在しません。',
            width: 350
          })
        }
      })
      .catch(err => {
        message.error(err?.response?.data?.message || "エラーが発生しました")
      })
  }

  getNameOfficeCode(office) {
    const params = {
      OfficeCode: this.formRef?.current?.getFieldValue('OfficeCode') || '',
      BranchStoreCode: this.formRef?.current?.getFieldValue('BranchStoreCode') || ''
    }
    ConditionAddSubAction.getNameOfficeCodeAction(params)
      .then(res => {
        if (res?.data?.office_kanji_name) {
          this.formRef?.current?.setFieldsValue({
            office_kanji_name: res?.data?.office_kanji_name
          })
          this.setState({
            isUnValidOfficeCode: false
          })
        } else {
          this.formRef?.current?.setFieldsValue({
            office_kanji_name: ''
          })
          this.setState({
            isUnValidOfficeCode: true
          })
          Modal.error({
            title: '事業所コードに誤りがあります',
            width: 326
          })
        }
      })
      .catch(err => {
        message.error(err?.response?.data?.message || "エラーが発生しました")
      })
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  ChangePersonalInfoSearchQuery(value) {
    this.formRef.current?.setFieldsValue({
      kanji_name: "",
    });
    if (value.length > 10) {
      this.formRef.current?.setFieldsValue({
        PersonalNum: value.slice(0, 10),
      });
      this.forceUpdate();
    }
  }

  checkCourseCode() {
    let CourseCodeF = this.formRef.current?.getFieldValue('CourseCodeF')
    let CourseCodeT = this.formRef.current?.getFieldValue('CourseCodeT')
    if (!CourseCodeT || CourseCodeF > CourseCodeT) {
      this.formRef.current?.setFieldsValue({
        CourseCodeT: CourseCodeF,
      })
    }
  }

  checkReceiptNum(valueF, valueT) {
    let ReceiptNumF = this.formRef.current?.getFieldValue('ReceiptNumF')
    let ReceiptNumT = this.formRef.current?.getFieldValue('ReceiptNumT')
    if (ReceiptNumF > ReceiptNumT) {
      this.formRef.current?.setFieldsValue({
        ReceiptNumT: ReceiptNumF
      })
    } else {
      if (valueF && valueF == 0) {
        this.formRef.current?.setFieldsValue({
          ReceiptNumF: ''
        })
      }

      if (valueT && valueT == 0) {
        this.formRef.current?.setFieldsValue({
          ReceiptNumT: ''
        })
      }
    }
  }

  checkBelong(valueF, valueT) {
    let BelongsF = this.formRef.current?.getFieldValue('BelongsF')
    let BelongsT = this.formRef.current?.getFieldValue('BelongsT')
    if (BelongsT && (BelongsF > BelongsT)) {
      this.formRef.current?.setFieldsValue({
        BelongsT: BelongsF
      })
    } else {
      if (valueF && valueF == 0) {
        this.formRef.current?.setFieldsValue({
          BelongsF: ''
        })
      }

      if (valueT && valueT == 0) {
        this.formRef.current?.setFieldsValue({
          BelongsT: ''
        })
      }
    }
  }

  render() {
    return (
      <div className="condition-add-sub">
        <Card title="条件追加SUB">
          <Spin spinning={this.state.isLoadingForm}>
            <Form
              ref={this.formRef}
              autoComplete="off"
              onFinish={this.onFinish}
            >
              <Form.Item label="&nbsp;受診日" {...style.grid}>
                <Row>
                  <Form.Item name="DateFChar">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} disabled={this.props.Li_DateF || this.props.Li_DateT} />
                  </Form.Item>
                  <Form.Item style={{ margin: '0 5px' }}>~</Form.Item>
                  <Form.Item name="DateTChar">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} disabled={this.props.Li_DateF || this.props.Li_DateT} />
                  </Form.Item>
                </Row>
              </Form.Item>
              <Form.Item label="受付No"  {...style.grid}>
                <Row>
                  <Form.Item name="ReceiptNumF" >
                    <Input.Search style={{ textAlign: 'right', width: 90 }}
                      maxLength={6}
                      min={0}
                      disabled={this.props.Li_AcceptNoF > 0 || this.props.Li_AcceptNoT > 0}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (isNaN(value)) {
                          this.formRef.current?.setFieldsValue({
                            ReceiptNumF: "",
                          });
                        }
                      }}
                      onSearch={() => {
                        let dateF = this.formRef.current?.getFieldValue("DateFChar")
                          ? this.formRef.current?.getFieldValue("DateFChar").format("YYYY/MM/DD") : "";
                        let dateT = this.formRef.current?.getFieldValue("DateTChar")
                          ? this.formRef.current?.getFieldValue("DateTChar").format("YYYY/MM/DD") : "";
                        if (dateF === dateT) {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "50%",
                              component: (
                                <WS2786013_AcceptanceNumberSelect
                                  Li_Date={
                                    this.formRef.current?.getFieldValue(
                                      "DateFChar"
                                    )
                                      ? this.formRef.current
                                        ?.getFieldValue("DateFChar")
                                        .format("YYYY/MM/DD")
                                      : ""
                                  }
                                  Lio_AcceptNum={this.formRef.current?.getFieldValue(
                                    "ReceiptNumF"
                                  )}
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      ReceiptNumF: output.Lio_AcceptNum,
                                    });
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }
                      }}
                      onBlur={(e) => { this.checkReceiptNum(e.target.value, null) }}
                    />
                  </Form.Item>
                  <span style={{ margin: '0 5px' }}>~</span>
                  <Form.Item name="ReceiptNumT">
                    <Input.Search style={{ textAlign: 'right', width: 90 }}
                      maxLength={6}
                      min={0}
                      disabled={this.props.Li_AcceptNoF > 0 || this.props.Li_AcceptNoT > 0}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (isNaN(value)) {
                          this.formRef.current?.setFieldsValue({
                            ReceiptNumT: "",
                          });
                        }
                      }}
                      onSearch={() => {
                        let dateF = this.formRef.current?.getFieldValue(
                          "DateFChar"
                        )
                          ? this.formRef.current
                            ?.getFieldValue("DateFChar")
                            .format("YYYY/MM/DD")
                          : "";
                        let dateT = this.formRef.current?.getFieldValue(
                          "DateTChar"
                        )
                          ? this.formRef.current
                            ?.getFieldValue("DateTChar")
                            .format("YYYY/MM/DD")
                          : "";
                        if (dateF === dateT) {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "50%",
                              component: (
                                <WS2786013_AcceptanceNumberSelect
                                  Li_Date={
                                    this.formRef.current?.getFieldValue(
                                      "DateTChar"
                                    )
                                      ? this.formRef.current
                                        ?.getFieldValue("DateTChar")
                                        .format("YYYY/MM/DD")
                                      : ""
                                  }
                                  Lio_AcceptNum={this.formRef.current?.getFieldValue(
                                    "ReceiptNumT"
                                  )}
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      ReceiptNumT: output.Lio_AcceptNum,
                                    });
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }
                      }}
                      onBlur={(e) => { this.checkReceiptNum(null, e.target.value) }}
                    />
                  </Form.Item>
                </Row>
              </Form.Item>
              <Form.Item label="コース" {...style.grid} >
                <Row>
                  <Col span={4}>
                    <Form.Item name="CourseCodeF">
                      <Input.Search
                        maxLength={3}
                        disabled={this.props.Li_CourseF > 0 || this.props.Li_CourseT > 0}
                        style={{ textAlign: "center" }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "50%",
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      CourseCodeF: output.Lo_CourseCode,
                                    });
                                    this.checkCourseCode()
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                        onBlur={() => { this.checkCourseCode() }}
                      />
                    </Form.Item>
                  </Col>
                  <span style={{ margin: '0 5px' }}>~</span>
                  <Col span={4}>
                    <Form.Item name="CourseCodeT">
                      <Input.Search
                        maxLength={3}
                        style={{ textAlign: "center", width: "98%" }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "50%",
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      CourseCodeT: output.Lo_CourseCode,
                                    });
                                    this.checkCourseCode()
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                        onBlur={() => { this.checkCourseCode() }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={13}>
                    <Form.Item name="CourseList">
                      <Input.Search
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "30%",
                              component: (
                                <WS2786020_SelectCourseList
                                  Lio_CourseList={this.formRef.current?.getFieldValue(
                                    "CourseList"
                                  )}
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      CourseList: output?.Lio_CourseList,
                                    });
                                    this.forceUpdate();
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
                </Row>
              </Form.Item>

              <Form.Item label="AMPM"  {...style.grid}>
                <Row>
                  <Col span={6}>
                    <Form.Item name="TimeDivision">
                      <Select>
                        <Select.Option value=''>全て</Select.Option>
                        <Select.Option value='AM'>AM</Select.Option>
                        <Select.Option value='PM'>PM</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

              </Form.Item>
              <Form.Item label=" 施&emsp;設"  {...style.grid}>
                <Row>
                  <Col span={12}>
                    <Form.Item name="FacilityType">
                      <Select>
                        {this.state.combobox_facility_type?.map((value) => (
                          <Select.Option
                            key={"FacilityType-" + Math.random()}
                            value={value.Linked}
                          >
                            {value.Display}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label=" 状&emsp;態"  {...style.grid}>
                <Row>
                  <Col span={6}>
                    <Form.Item name="StateFlag">
                      <Select>
                        <Select.Option value={''}>全て </Select.Option>
                        <Select.Option value={0}>予約</Select.Option>
                        <Select.Option value={1}>受付</Select.Option>
                        <Select.Option value={2}>保留</Select.Option>
                        <Select.Option value={3}>待ち</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <hr style={styleHr} />
              <Form.Item label="個&emsp;人"  {...style.grid}>
                <Row>
                  <Col span={7}>
                    <Form.Item name="PersonalNum">
                      <Input.Search style={{ textAlign: 'right', width: "98%" }}
                        maxLength={10}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1500,
                              component: (
                                <WS0248001_PersonalInfoSearchQuery
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      PersonalNum: output.Lo_PersonalNumId,
                                      kanji_name: output.recordData?.kanji_name,
                                    });
                                    this.setState({
                                      isUnValidPersonal: false
                                    })
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}

                        onBlur={(e) => {
                          let val = e.target.value
                          this.ChangePersonalInfoSearchQuery(val)
                          if (val == 0 || !val) {
                            this.formRef.current?.setFieldsValue({
                              PersonalNum: '',
                              kanji_name: ''
                            })
                            this.setState({
                              isUnValidPersonal: false
                            })
                          } else {
                            val = val.replaceAll('-', '')
                            this.formRef.current?.setFieldsValue({
                              PersonalNum: val,
                            })
                            this.getNamePersonal()
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={17}>
                    <Form.Item name='kanji_name'>
                      <Input readOnly bordered={false} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="事業所"  {...style.grid}>
                <Row>
                  <Col span={6}>
                    <Form.Item name="OfficeCode">
                      <Input.Search maxLength={8}
                        onBlur={(e) => {
                          let val = e.target.value
                          if (val) {
                            this.getNameOfficeCode()
                          } else {
                            this.formRef.current?.setFieldsValue({
                              OfficeCode: '',
                              office_kanji_name: ''
                            });
                            this.setState({
                              isUnValidOfficeCode: false
                            })
                          }
                        }}
                        style={{ textAlign: 'right', width: "98%" }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "80%",
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  Lio_OfficeCode={this.formRef.current?.getFieldValue("OfficeCode")}
                                  Lio_BranchStoreCode={this.formRef.current?.getFieldValue("BranchStoreCode")}
                                  Li_1HeadOffice2BranchShop={1}
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      OfficeCode: output.Lio_OfficeCode,
                                      BranchStoreCode: output.Lio_BranchStoreCode === 0 ? null : output.Lio_BranchStoreCode,
                                      office_kanji_name: output.recordData.office_kanji_name,
                                    });
                                    this.setState({
                                      isUnValidOfficeCode: false
                                    })
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
                  <Col span={3}>
                    <Form.Item name="BranchStoreCode">
                      <InputNumber
                        maxLength={5}
                        onBlur={(e) => {
                          let val = e.target.value
                          let office_code = this.formRef.current?.getFieldValue('OfficeCode')
                          if (val > 0 && office_code) {
                            this.getNameOfficeCode()
                          } else {
                            this.formRef.current?.setFieldsValue({
                              BranchStoreCode: val > 0 ? val : '',
                              office_kanji_name: office_code ? this.getNameOfficeCode() : ''
                            });
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name='office_kanji_name' style={{ marginLeft: "0.5em" }}>
                      <Input bordered={false} readOnly />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="所&emsp;属" {...style.grid} >
                <Row>
                  <Col span={5}>
                    <Form.Item name="BelongsF">
                      <Input.Search style={{ textAlign: 'right' }}
                        type='number'
                        min={0}
                        maxLength={8}
                        disabled={this.formRef.current?.getFieldValue("StsAffiliationInfo") ? false : true}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "50%",
                              component: (
                                <WS2787004_AffiliationSelectSub
                                  Li_OfficeCode={this.formRef.current?.getFieldValue("OfficeCode")}
                                  Li_BranchStoreCode={this.formRef.current?.getFieldValue("BranchStoreCode")}
                                  Lio_AffiliationCode={this.formRef.current?.getFieldValue("BelongsF")}
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      BelongsF: output.Lio_AffiliationCode,
                                    });
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                        onBlur={(e) => { this.checkBelong(e.target.value, null) }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1} style={{ textAlign: "center" }}>
                    <span>~</span>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="BelongsT">
                      <Input.Search style={{ textAlign: 'right' }}
                        type='number'
                        min={0}
                        disabled={this.formRef.current?.getFieldValue("StsAffiliationInfo") ? false : true}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "50%",
                              component: (
                                <WS2787004_AffiliationSelectSub
                                  Li_OfficeCode={this.formRef.current?.getFieldValue("OfficeCode")}
                                  Li_BranchStoreCode={this.formRef.current?.getFieldValue("BranchStoreCode")}
                                  Lio_AffiliationCode={this.formRef.current?.getFieldValue("BelongsT")}
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      BelongsT: output.Lio_AffiliationCode,
                                    });
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                        onBlur={(e) => { this.checkBelong(null, e.target.value) }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="保険者"  {...style.grid}>
                <Row>
                  <Col span={7}>
                    <Form.Item name="InsurerCode">
                      <Input.Search style={{ textAlign: 'right' }}
                        onChange={() => this.formRef?.current?.setFieldsValue({ insurer_kanji_name: '' })}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "80%",
                              component: (
                                <WS0246001_InsurerInfoSearchQuery
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      InsurerCode: output.Lo_InsurerCode,
                                      insurer_kanji_name:
                                        output.recordData.insurer_kanji_name,
                                    });
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
                  <Col span={17}>
                    <Form.Item name='insurer_kanji_name'>
                      <Input readOnly bordered={false} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <hr style={styleHr} />

              <Form.Item label="検査枠"  {...style.grid}>
                <Row>
                  <Col span={13}>
                    <Form.Item name="InspectFrame">
                      <Select>
                        <Select.Option key={"a-"} value="00">
                          &emsp;
                        </Select.Option>
                        {this.state.InspectFrame?.map((value) => {
                          if (value.LinkedField !== "00") {
                            return (
                              <Select.Option
                                key={"InspectFrame-" + Math.random()}
                                value={value.LinkedField}
                              >
                                {value.DisplayField}
                              </Select.Option>
                            );
                          }
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="セット" {...style.grid} >
                <Row>
                  <Col span={7}>
                    <Form.Item name="UseSet">
                      <Input.Search
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1000,
                              component: (
                                <WS0302001_SetInfoSearch
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      UseSet: output.Lo_SetCode,
                                    });
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
                </Row>
              </Form.Item>
              <hr style={styleHr} />
              <Form.Item label="条件式" {...style.grid} >
                <Row>
                  <Col span={5}>
                    <Form.Item name="ConditionalExpression">
                      <Input.Search style={{ textAlign: 'right' }}
                        onChange={(e) => {
                          let value = e.target.value;
                          this.formRef.current.setFieldsValue({
                            name: "",
                          });
                          if (isNaN(value)) {
                            this.formRef.current.setFieldsValue({
                              ConditionalExpression: "",
                            });
                            this.forceUpdate();
                          } else {
                            if (value.length > 3) {
                              this.formRef.current.setFieldsValue({
                                ConditionalExpression: value.slice(0, 3),
                              });
                              this.forceUpdate();
                            }
                          }
                        }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component: (
                                <WS0495001_ConditionExpressInfoInquiry
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      ConditionalExpression:
                                        output.Lo_ConditionSerialNum,
                                      name: output.Lo_Name,
                                    });
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
                  <Col>
                    <Form.Item name='name'>
                      <Input readOnly bordered={false} />
                      {/* <span style={{ marginLeft: "0.5em" }}>
                        {this.formRef.current?.getFieldValue("name")}{" "}
                      </span> */}
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item label="表示順"  {...style.gridSM}
                    name="Lio_KeyInfo"
                    style={{
                      display: this.state.Lio_KeyInfo?.length > 0 ? "" : "none",
                    }}
                  >
                    <Select>
                      {this.state.Lio_KeyInfo?.map((value) => (
                        <Select.Option
                          key={"Lio_KeyInfo-" + Math.random()}
                          value={value.key_serial_number}
                        >
                          {value.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        this.clearData()
                      }}
                    >
                      クリア
                    </Button>
                    <Button type="primary" htmlType="submit">
                      確定
                    </Button>
                  </Space>
                </Col>
              </Row>

            </Form>
          </Spin>
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

export default WS2786001_ConditionAddSub;
