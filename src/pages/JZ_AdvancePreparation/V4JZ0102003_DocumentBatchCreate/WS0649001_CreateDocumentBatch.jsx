/* eslint-disable eqeqeq */
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Select, Space, Spin } from "antd";
import Color from 'constants/Color';
import moment from 'moment';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS2786001_ConditionAddSub from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub.jsx';
import WS0246001_InsurerInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS2788013_TargetSelectSub from 'pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS2788013_TargetSelectSub.jsx';
import WS0649007_PersonalQueryProcess from 'pages/JZ_AdvancePreparation/V4JZ0102003_DocumentBatchCreate/WS0649007_PersonalQueryProcess.jsx';
import WS0650001_DocumentBatchCreateSub from 'pages/JZ_AdvancePreparation/V4JZ0102003_DocumentBatchCreate/WS0650001_DocumentBatchCreateSub.jsx';
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";
import CreateDocumentBatchAction from 'redux/AdvancePreparation/DocumentBatchCreate/CreateDocumentBatch.actions';
import DepartmentChangeOnceAction from "redux/basicInfo/DepartmentChangeOnce/DepartmentChangeOnce.actions";
const { Option } = Select;
class WS0649001_CreateDocumentBatch extends React.Component {
  static propsType = {
    Li_Date: PropTypes.any,
    Li_Id: PropTypes.any,
    Li_Course: PropTypes.any,
    Li_OutputPattern: PropTypes.any,
    Li_Option: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.office = React.createRef();
    // document.title = "資料一括作成";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadding: false,
      FacilityNum: [],
      OutputOrder: [],
      disableBranch: true,
      initialValues: {
        office_kana_name: "",
        phone_number: "",
        insurer_card_symbol: "",
        methods_op: true,
      },
      timeOutId: null,
      errorOfficeCode: false,
      errorBranchStore: false,

      message: "",
      isSearch: false,
      Expression_36: 163,
    };
  }
  componentDidMount() {
    if (!sessionStorage.getItem("DataOfficeInfo")) {
      this.setState({
        isLoadding: true,
      });
      DepartmentChangeOnceAction.GetDataOfficeInfo(this.state.initialValues)
        .then((res) => {
          sessionStorage.setItem("DataOfficeInfo", JSON.stringify(res));
        })
        .catch((error) => {
          const res = error.response;
          if (!res || res.data || res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
        })
        .finally(() => this.setState({ isLoadding: false }));
    }
    this.GetScreenData();
  }
  componentDidUpdate(PreV) {
    if (this.props !== PreV) {
      this.GetScreenData();
    }
  }
  GetScreenData = () => {
    this.setState({ isLoadding: true });
    let data = {
      Li_Date: this.isEmpty(this.props.Li_Date) ? "" : this.props.Li_Date,
      Li_Id: this.isEmpty(this.props.Li_Id) ? "" : this.props.Li_Id,
      Li_Course: this.isEmpty(this.props.Li_Course) ? "" : this.props.Li_Course,
      Li_OutputPattern: this.isEmpty(this.props.Li_OutputPattern)
        ? ""
        : this.props.Li_OutputPattern,
      Li_Option: this.isEmpty(this.props.Li_Option) ? "" : this.props.Li_Option,
    };
    CreateDocumentBatchAction.GetScreenData(data)
      .then((res) => {
        let data = res.dataView;
        data.ReserveDateFChar = this.isEmpty(data?.ReserveDateFChar)
          ? moment(null)
          : moment(data?.ReserveDateFChar);
        data.ReserveDateTChar = this.isEmpty(data?.ReserveDateTChar)
          ? moment(null)
          : moment(data?.ReserveDateTChar);
        data.FacilityNum = this.isEmpty(data.FacilityNum)
          ? 0
          : data.FacilityNum;
        this.formRef.current?.setFieldsValue(data);
        this.setState({
          OutputOrder: res?.OutputOrder ? res?.OutputOrder : [],
          FacilityNum: res?.FacilityNum ? res?.FacilityNum : [],
        });
      })
      .catch((error) => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
      })
      .finally(() => this.setState({ isLoadding: false }));
  };
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  }
  handleChangeOfficeCode = (val, condition) => {
    let value =
      condition === "OfficeCode"
        ? val.length > 8
          ? val.slice(0, 8)
          : val
        : val.length > 5
          ? val.slice(0, 5)
          : val;
    if (condition === "BranchStoreCodeF") {
      if (isNaN(value)) {
        this.formRef.current?.setFieldsValue({ BranchStoreCodeF: "" });
        this.forceUpdate();
        return;
      }
    }
    if (this.state.timeOutId) {
      clearTimeout(this.state.timeOutId);
    }
    this.setState({
      timeOutId: setTimeout(() => {
        if (value.length > 0) {
          let item = sessionStorage.getItem("DataOfficeInfo");
          let listData = item ? JSON.parse(item) : {};
          if (condition === "OfficeCode") {
            this.setState({ isLoadding: true });
            this.CheckOfficeCode(value, condition, listData);
          } else if (condition === "BranchStoreCodeF") {
            this.setState({ isLoadding: true });
            this.CheckOfficeCode(value, condition, listData);
          }
        }
      }, 500),
    });
  };
  CheckOfficeCode(value, condition, listData) {
    // this.formRef.current?.setFieldsValue({
    //   office_kanji_name: ""
    // })
    for (let indx = 0; indx < listData.length; indx++) {
      let dta =
        condition === "OfficeCode"
          ? listData[indx].office_code
          : listData[indx].branch_store_code;
      if (value === dta?.toString()) {
        this.formRef.current?.setFieldsValue({
          OfficeCode: listData[indx].office_code,
          BranchStoreCodeF: listData[indx].branch_store_code,
          office_kanji_name: listData[indx].office_kanji_name,
        });
        this.forceUpdate();
        this.setState({
          isLoadding: false,
          errorOfficeCode: false,
          errorBranchStore: false,
        });
        return;
      }
      if (indx === listData.length - 1) {
        this.setState({ isLoadding: false });
        condition === "OfficeCode"
          ? this.setState({ errorOfficeCode: true })
          : this.setState({ errorBranchStore: true });
      }
    }
  }
  DisplayBtn() {
    this.setState({ isLoadding: true });
    let data = this.formRef.current?.getFieldValue();
    let dataExe = {
      ReserveDateF: data.ReserveDateFChar
        ? data.ReserveDateFChar.format("YYYY/MM/DD")
        : "",
      ReserveDateT: data.ReserveDateTChar
        ? data.ReserveDateTChar.format("YYYY/MM/DD")
        : "",
      ConsultCourseF: data.ConsultCourseF,
      ConsultCourseT: data.ConsultCourseT,
      FacilityNum: data.FacilityNum,
      ExtractCondition: data.ExtractCondition,
      KanshoCodeF: data.KanshoCodeF,
      OfficeCode: data.OfficeCode,
      BranchStoreCodeF: data.BranchStoreCodeF,
      PersonalNum: data.PersonalNum,
      OutputOrder: data.OutputOrder,
    };

    CreateDocumentBatchAction.DisplayBtn(dataExe)
      .then(async (res) => {
        await this.setState({
          message: res.message,
          isLoadding: false,
          isSearch: true,
        });
      })
      .catch((err) => {
        this.setState({ isLoadding: false });
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadding: false, message: "" }));
  }
  changeOfficeCode(e) {
    if (e === "" || e === undefined || e === null) {
      this.formRef.current.setFieldsValue({
        office_kanji_name: '',
      });
      return;
    }
    const data = {
      OfficeCode: e,
      BranchStoreCodeF: this.formRef.current?.getFieldValue("BranchStoreCodeF"),
    };
    CreateDocumentBatchAction.change(data)
      .then((res) => {
        this.formRef.current.setFieldsValue({
          office_kanji_name: res.office_kanji_name,
        });
        if (res.office_kanji_name === "") {
          message.error("事業所が存在しません")
        }
      })
      .catch((error) => { });
  }
  checkDateStart() {
    let dateStart = this.formRef.current?.getFieldValue("ReserveDateFChar")
      ? this.formRef.current
        ?.getFieldValue("ReserveDateFChar")
        .format("YYYY/MM/DD")
      : null;
    let dateEnd = this.formRef.current?.getFieldValue("ReserveDateTChar")
      ? this.formRef.current
        ?.getFieldValue("ReserveDateTChar")
        .format("YYYY/MM/DD")
      : null;
    if (dateEnd && dateStart > dateEnd) {
      this.formRef.current?.setFieldsValue({
        ReserveDateFChar:
          this.formRef.current?.getFieldValue("ReserveDateFChar"),
      });
    }
  }

  checkDateEnd() {
    let dateStart = this.formRef.current?.getFieldValue("ReserveDateFChar")
      ? this.formRef.current
        ?.getFieldValue("ReserveDateFChar")
        .format("YYYY/MM/DD")
      : null;
    let dateEnd = this.formRef.current?.getFieldValue("ReserveDateTChar")
      ? this.formRef.current
        ?.getFieldValue("ReserveDateTChar")
        .format("YYYY/MM/DD")
      : null;
    if ((!dateEnd && dateStart) || (dateStart && dateStart > dateEnd)) {
      this.formRef.current?.setFieldsValue({
        ReserveDateTChar:
          this.formRef.current?.getFieldValue("ReserveDateFChar"),
      });
    }
  }

  renderTargetSub() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      Li_Random: Math.random()
    }
    return (
      <WS2788013_TargetSelectSub isSearch={this.state.isSearch} message={this.state.message} params={params} OutputOrder={1} />
    )
  }

  render() {
    return (
      <div className="create-document-batch" style={{ padding: '0 5px' }}>
        <Form ref={this.formRef} autoComplete="off" initialValues={{ ReserveDateFChar: moment(), ReserveDateTChar: moment() }} >
          <Row gutter={24}>
            <Col xl={7} lg={24} style={{ padding: '0 5px' }}>
              <Card>
                <Form.Item label="予約日" >
                  <Space>
                    <Form.Item name="ReserveDateFChar" >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format={"YYYY/MM/DD"}
                        style={{ width: 112 }}
                        onBlur={() => {
                          this.checkDateStart();
                        }} />
                    </Form.Item>
                    <label>~</label>
                    <Form.Item name="ReserveDateTChar" >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format={"YYYY/MM/DD"}
                        style={{ width: 112 }}
                        onBlur={() => {
                          this.checkDateEnd();
                        }} />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Row gutter={24}>
                  <Col span={12} style={{ paddingRight: 0 }}>
                    <Form.Item name="ConsultCourseF" label="コース"
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length > 4) {
                          this.formRef.current?.setFieldsValue({
                            ConsultCourseF: value.slice(0, 4)
                          })
                          this.forceUpdate()
                        }
                      }} >
                      <Input.Search onSearch={() => {
                        if (!this.state.errorBranchStore && !this.state.errorOfficeCode)
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '50%',
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      ConsultCourseF: output?.Lo_CourseCode
                                    })
                                    this.forceUpdate()
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                      }} />
                    </Form.Item>
                  </Col>
                  <Col span={1} style={{ textAlign: 'center' }}>
                    ~
                  </Col>
                  <Col span={8} style={{ paddingLeft: 0 }}>
                    <Form.Item name="ConsultCourseT" label=" "
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length > 4) {
                          this.formRef.current?.setFieldsValue({
                            ConsultCourseT: value.slice(0, 4)
                          })
                          this.forceUpdate()
                        }
                      }} >
                      <Input.Search onSearch={() => {
                        if (!this.state.errorBranchStore && !this.state.errorOfficeCode)
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '50%',
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      ConsultCourseT: output?.Lo_CourseCode
                                    })
                                    this.forceUpdate()
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                      }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={23}>
                    <Form.Item name="FacilityNum" label="施&emsp;設" >
                      <Select  >
                        {this.state.FacilityNum?.map(val => (
                          <Select.Option key={'FacilityNum-' + Math.random()} value={val.Linked} >{val.Display}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col >
                </Row >
                <Form.Item label="保険者">
                  <Row>
                    <Form.Item name="KanshoCodeF" style={{ marginBottom: 0 }}>
                      <InputNumber min={0} maxLength={10}
                        style={{ width: 90, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        onBlur={(e) => {
                          let val = e.target.value
                          if (!val || val == 0) {
                            val = ''
                          }

                          this.formRef.current?.setFieldsValue({
                            KanshoCodeF: val
                          })
                        }}
                      />
                    </Form.Item>
                    <Button style={{ width: 32, paddingLeft: 5, borderLeftColor: 'transparent', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      onClick={() => {
                        if (!this.state.errorBranchStore && !this.state.errorOfficeCode)
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (
                                <WS0246001_InsurerInfoSearchQuery
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      KanshoCodeF: output?.Lo_InsurerCode
                                    })
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                      }}
                    >{<SearchOutlined style={{ fontSize: 16, color: '#8c8c8c' }} />}
                    </Button>
                  </Row>
                </Form.Item>
                <Form.Item label="事務所">
                  <Row>
                    <Form.Item name="OfficeCode" style={{ marginBottom: '0px' }}  >
                      <Input.Search ref={this.office} style={{ width: 122 }}
                        onBlur={(e) => {
                          this.changeOfficeCode(e.target.value);
                          // if (this.state.errorBranchStore || this.state.errorOfficeCode) {
                          //   message.error("事堯所力存在しません")
                          //   this.office?.current?.focus();
                          // }
                        }}
                        className='floatRight'
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value && value.length > 0) {
                            this.setState({ disableBranch: false })
                            this.handleChangeOfficeCode(value, "OfficeCode")
                          } else {
                            this.setState({ disableBranch: true })
                            this.formRef.current?.setFieldsValue({
                              BranchStoreCodeF: "",
                            })
                            this.setState({ errorBranchStore: false, errorOfficeCode: false })
                            this.forceUpdate()
                          }
                        }}
                        onSearch={() => {
                          if (!this.state.errorBranchStore && !this.state.errorOfficeCode)
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    Lio_OfficeCode={this.formRef.current?.getFieldValue("OfficeCode")}
                                    Lio_BranchStoreCode={this.formRef.current?.getFieldValue("BranchStoreCodeF")}
                                    onFinishScreen={(output) => {
                                      if (output?.Lio_OfficeCode) {
                                        this.setState({ disableBranch: false })
                                      }
                                      this.formRef.current?.setFieldsValue({
                                        OfficeCode: output?.Lio_OfficeCode,
                                        BranchStoreCodeF: output?.Lio_BranchStoreCode,
                                        office_kanji_name: output?.recordData?.office_kanji_name
                                      })
                                      this.forceUpdate()
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                        }} />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '0px' }}>
                      <Row>
                        <Form.Item name="BranchStoreCodeF" style={{ marginBottom: 0 }}>
                          <InputNumber min={0} maxLength={10}
                            disabled={this.state.disableBranch}
                            style={{ width: 60, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                            onBlur={(e) => this.handleChangeOfficeCode(e.target.value, "BranchStoreCodeF")}
                          />
                        </Form.Item>
                        <Button style={{ width: 32, paddingLeft: 5, borderLeftColor: 'transparent', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                          disabled={this.state.disableBranch}
                          onClick={() => {
                            if (!this.state.errorBranchStore && !this.state.errorOfficeCode)
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "80%",
                                  component: (
                                    <WS0247001_OfficeInfoRetrievalQuery
                                      Lio_OfficeCode={this.formRef.current?.getFieldValue("OfficeCode")}
                                      Lio_BranchStoreCode={this.formRef.current?.getFieldValue("BranchStoreCodeF")}
                                      onFinishScreen={(output) => {
                                        if (output?.Lio_OfficeCode) {
                                          this.setState({
                                            disableBranch: false,
                                          });
                                        }
                                        this.formRef.current?.setFieldsValue({
                                          OfficeCode: output?.Lio_OfficeCode,
                                          BranchStoreCodeF: output?.Lio_BranchStoreCode,
                                          office_kanji_name: output?.recordData?.office_kanji_name
                                        })
                                        this.forceUpdate()
                                        this.closeModal()
                                      }}
                                    />
                                  ),
                                },
                              })
                          }}
                        >{<SearchOutlined style={{ fontSize: 16, color: '#8c8c8c' }} />}
                        </Button>
                      </Row>
                    </Form.Item>
                  </Row>
                </Form.Item>
                <Form.Item name="office_kanji_name" label="&emsp;&emsp;&emsp;" >
                  <Input style={{ border: "none" }} readOnly />
                </Form.Item>
                <Form.Item label="個&emsp;人">
                  <Row>
                    <Form.Item name="PersonalNum" style={{ marginBottom: 0 }}>
                      <InputNumber min={0} maxLength={10}
                        style={{ width: 90, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        onBlur={(e) => {
                          let val = e.target.value
                          if (!val || val == 0) {
                            val = ''
                          }

                          this.formRef.current?.setFieldsValue({
                            PersonalNum: val
                          })
                        }}
                      />
                    </Form.Item>
                    <Button style={{ width: 32, paddingLeft: 5, borderLeftColor: 'transparent', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      onClick={() => {
                        if (!this.state.errorBranchStore && !this.state.errorOfficeCode) {
                          let dateF = this.formRef.current?.getFieldValue("ReserveDateFChar") ? this.formRef.current?.getFieldValue("ReserveDateFChar")?.format("YYYY/MM/DD") : "";
                          let dateT = this.formRef.current?.getFieldValue("ReserveDateTChar") ? this.formRef.current?.getFieldValue("ReserveDateTChar")?.format("YYYY/MM/DD") : ""
                          if (dateF === dateT && this.isEmpty(this.formRef.current?.getFieldValue("OfficeCode")) &&
                            this.isEmpty(this.formRef.current?.getFieldValue("ConsultCourseF")) &&
                            this.isEmpty(this.formRef.current?.getFieldValue("ConsultCourseT"))) {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS0649007_PersonalQueryProcess
                                    ReserveDateF={this.formRef.current?.getFieldValue("ReserveDateFChar")?.format("YYYY/MM/DD")}
                                    ReserveDateT={this.formRef.current?.getFieldValue("ReserveDateTChar")?.format("YYYY/MM/DD")}
                                    FacilityNum={this.formRef.current?.getFieldValue("FacilityNum")}
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        PersonalNum: output?.recordData?.personal_number_id
                                      })
                                      this.forceUpdate()
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          } else {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS0248001_PersonalInfoSearchQuery
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        PersonalNum: output?.Lo_PersonalNumId
                                      })
                                      this.forceUpdate()
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }
                        }
                      }}
                    >{<SearchOutlined style={{ fontSize: 16, color: '#8c8c8c' }} />}
                    </Button>
                  </Row>
                </Form.Item>

                <Form.Item name="ExtractCondition" label="状&emsp;態" >
                  <Select style={{ width: 150 }}>
                    <Option value={4}>全て</Option>
                    <Option value={0}>予約</Option>
                    <Option value={1}>受付</Option>
                    <Option value={2}>保留</Option>
                    <Option value={3}>待ち</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="OutputOrder" label="出力順" >
                  <Select style={{ width: 150 }}>
                    {this.state.OutputOrder?.map(val => (
                      <Select.Option key={'OutputOrder-' + Math.random()} value={val.Linked} >{val.Display}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Row style={{ marginTop: 20 }}>
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Space>
                      <Button icon={<PlusCircleOutlined />} style={{ color: Color(this.state.Expression_36).Foreground }}
                        onClick={() => {
                          if (!this.state.errorBranchStore && !this.state.errorOfficeCode) {
                            this.setState({ isSearch: false })
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "40%",
                                component: (
                                  <WS2786001_ConditionAddSub
                                    Li_DateF={
                                      this.formRef.current?.getFieldValue(
                                        "ReserveDateFChar"
                                      )
                                        ? this.formRef.current
                                          ?.getFieldValue("ReserveDateFChar")
                                          ?.format("YYYY/MM/DD")
                                        : ""
                                    }
                                    Li_DateT={
                                      this.formRef.current?.getFieldValue(
                                        "ReserveDateTChar"
                                      )
                                        ? this.formRef.current
                                          ?.getFieldValue("ReserveDateTChar")
                                          ?.format("YYYY/MM/DD")
                                        : ""
                                    }
                                    Li_CourseF={this.formRef.current?.getFieldValue(
                                      "ConsultCourseF"
                                    )}
                                    Li_CourseT={this.formRef.current?.getFieldValue(
                                      "ConsultCourseT"
                                    )}
                                    Li_FacilityType={this.formRef.current?.getFieldValue(
                                      "FacilityNum"
                                    )}
                                    Li_State={
                                      this.formRef.current?.getFieldValue(
                                        "ExtractCondition"
                                      ) === 4
                                        ? ""
                                        : this.formRef.current?.getFieldValue(
                                          "ExtractCondition"
                                        )
                                    }
                                    Li_Insurer={this.formRef.current?.getFieldValue(
                                      "KanshoCodeF"
                                    )}
                                    Li_Office={this.formRef.current?.getFieldValue(
                                      "OfficeCode"
                                    )}
                                    Li_BranchShop={this.formRef.current?.getFieldValue(
                                      "BranchStoreCodeF"
                                    )}
                                    Li_PersonalNum={this.formRef.current?.getFieldValue(
                                      "PersonalNum"
                                    )}
                                    Lio_KeyInfo={this.formRef.current?.getFieldValue(
                                      "OutputOrder"
                                    )}
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        OutputOrder: output?.Lio_KeyInfo,
                                      });
                                      this.setState({
                                        Expression_36: output.Expression_36,
                                      });
                                      this.forceUpdate();
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }
                        }} >条件追加</Button>
                      <Button icon={<SearchOutlined style={{ color: '#1890ff' }} />} style={{ color: '#1890ff' }}
                        onClick={() => {
                          if (!this.state.errorBranchStore && !this.state.errorOfficeCode)
                            this.DisplayBtn()
                        }}
                      >検　　索</Button>
                    </Space>
                  </Col>
                </Row >
                <Row>
                  <Col span={24} style={{ textAlign: 'right', marginTop: '1em' }}>
                    <Button type="primary" onClick={() => {
                      if (!this.state.errorBranchStore && !this.state.errorOfficeCode)
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 600,
                            component: (
                              <WS0650001_DocumentBatchCreateSub
                                Li_CourseLevel={""}
                                Li_ReserveNum={""}
                                Li_OutputUnit={this.props?.Li_Option}
                                Li_OutputPattern={this.props?.Li_OutputPattern}
                                onFinishScreen={(output) => {
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                    }} >印刷</Button>
                  </Col>
                </Row>
              </Card >
            </Col >
            <Col xl={17} lg={24} style={{ padding: '0 5px' }}>
              <Spin spinning={this.state.isLoadding}>
                {this.state.isLoadding ? this.renderTargetSub() : this.renderTargetSub()}
              </Spin>
            </Col>
          </Row>
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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0649001_CreateDocumentBatch);
