/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import moment from "moment";
import {
  Card,
  Form,
  Spin,
  message,
  Input,
  Button,
  Table,
  Row,
  Col,
  Modal,
} from "antd";
import { UnlockOutlined, MoreOutlined } from "@ant-design/icons";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx";
import RadiographyFindingInputSubAction from "redux/InputBusiness/RadiographyFindingInput/RadiographyFindingInputSub.action";
import {
  QuestionCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import WS1868001_JudgeSelectQuerySub from "./WS1868001_JudgeSelectQuerySub";
import WS1865001_LeadershipMatterSearchSub from "./WS1865001_LeadershipMatterSearchSub";
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1863001_RadiographyFindingInputSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "読影所見入力 SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRowTableFirst: [],
      selectedRowTableSecond: [],
      isLoadingForm: true,
      dataForm: {},
      dataSource1: [],
      dataSource2: [],
      ChangeSiteAndFindingsCode: [],
      site_code1: 0,
      site_code2: 0,
      findings_code1: 0,
      findings_code2: 0,
      rowSelect: {},
      judgment_name: "",
      activeLink: null,
      activeLink2: null,
      activeLink3: null,
      activeLink4: null,
      rowSelect1: {},
      Expression_4: null,
      InterpretationMode: 0,
      selectedRows: [],
      indexTable: 0,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenDataRadiographyFindingInputSub();
      this.setState({
        activeLink: null,
        activeLink2: null,
        activeLink3: null,
        activeLink4: null,
        site_code1: 0,
        site_code2: 0,
        findings_code1: 0,
        findings_code2: 0,
        judgment_name: "",
      });
    }
  }
  componentDidMount() {
    this.getScreenDataRadiographyFindingInputSub();
  }
  getScreenDataRadiographyFindingInputSub() {
    this.setState({ isLoadingForm: true });
    const data = {
      Li_MenuOption: this.props.Li_MenuOption,
      Li_CourseLevel: this.props.Li_CourseLevel,
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_InterpretationInspectCode: this.props.Li_InterpretationInspectCode,
      Li_Modality: this.props.Li_Modality,
      Li_DoctorCode: this.props.Li_DoctorCode,
      Li_InspectCode: this.props.Li_InspectCode,
      Li_StsDoctors: this.props.Li_StsDoctors,
    };
    RadiographyFindingInputSubAction.getScreenDataRadiographyFindingInputSubAction(
      data
    )
      .then((res) => {
        if (res) {
          this.setState({
            dataForm: res ? res : [],
            isLoadingForm: false,
          });
          this.formRef.current.setFieldsValue({ dataForm: res ? res : {} });
          this.formRef.current.setFieldsValue({
            Expression_21: res.Expression_21,
            Remarks: res.Remarks,
            RemarksOtherPeople: res.RemarksOtherPeople,
            GuideDivision: res.GuideDivision,
            Expression_90: res.Expression_90,
            GuideCmtContent: res.GuideCmtContent,
            Expression_69: res.Expression_69,
            GuideDivisionPrevious: res.GuideDivisionPrevious,
            GuideCmtContentPrevious: res.GuideCmtContentPrevious,
            JudgeConvert: res.JudgeConvert,
            InterpretationMode: res.InterpretationMode,
          });
          this.getListDataFindingsContent();
          this.getListDataPreviousFindingsContent();
        }
      })
      .finally(() => {
        this.setState({ isLoadingForm: false });
      });
  }
  getListDataFindingsContent() {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InterpretationInspectItemCode:
        this.state.dataForm.Li_InterpretationInspectCode,
      Li_DoctorCode: this.state.dataForm.Li_DoctorCode,
      Li_JudgeLevel: this.state.dataForm.judgment_level_division,
      JudgeConvert: this.state.dataForm.JudgeConvert,
    };
    RadiographyFindingInputSubAction.getListDataFindingsContentAction(data)
      .then((res) => {
        if (res) {
          const constvertType = (input) => (input === 0 ? "" : input);
          const newArr = res.Data.map((s) => ({
            ...s,
            W4_serial_num: constvertType(s.W4_serial_num),
          }));
          this.setState({ dataSource1: newArr , selectedRows: [res.Data[0]], indexTable: 0,});
          this.formRef.current.setFieldsValue({ tableData: newArr });
        }
      })
      .finally(() => {
        this.setState({ isLoadingForm: false });
      });
  }
  getListDataPreviousFindingsContent() {
    const data = {
      Li_ReserveNum: this.state.dataForm.LastTimeReserveNum,
      Li_InspectCode: this.state.dataForm.LastTimeInspectCode,
      Li_LastDate: this.state.dataForm.LastDate,
    };
    RadiographyFindingInputSubAction.getListDataPreviousFindingsContentAction(
      data
    )
      .then((res) => {
        if (res) {
          this.setState({
            dataSource2: res.data,
            Expression_4: res.Expression_4,
          });
        }
      })
      .finally(() => {
        this.setState({ isLoadingForm: false });
      });
  }
  onChangeInput = (record, value, name) => {
    let arrTemp = [...this.state.dataSource1];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp;
      switch (name) {
        default:
          objTemp = {
            ...record,
            [name]: value,
          };
          break;
      }
      arrTemp[index] = objTemp;
      this.setState({
        dataSource1: arrTemp,
        rowSelect: objTemp,
      });
      this.formRef.current.setFieldsValue({ dataSource1: arrTemp });
    }
  };
  saveData = (record) => {
    const data = {
      id: record.id ,
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InterpretationInspectItemCode:
        this.state.dataForm.Li_InterpretationInspectCode,
      Li_DoctorCode: this.state.dataForm.Li_DoctorCode,
      W4_serial_num: record.W4_serial_num || 0,
      W4_site_name: record.W4_site_name ?? "",
      W4_findings_name: record.W4_findings_name ?? "",
      W4_judge: record.W4_judge ?? "",
    };
    RadiographyFindingInputSubAction.saveFindingsContentAction(data)
      .then((res) => {
        this.getListDataFindingsContent();
      })
      .catch((err) => message.error("エラー"));
  };
  deleteData = (record) => {
    console.log(5656, record);
    if (record.id || record.id === 0) {
      console.log("a");
      RadiographyFindingInputSubAction.deleteFindingsContentAction({
        id: record.id,
      })
        .then((res) => {
          message.success("成功");
          this.getListDataFindingsContent();
        })
        .catch((err) => message.error("エラー"));
    } else {
      console.log("b");
      let arrTemp = [...this.state.dataSource1];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ tableData: arrTemp });
      this.setState({ dataSource1: arrTemp });
      this.getListDataFindingsContent();
    }
  };
  postLastTimeDoBtn() {
    const data = {
      Li_StsDoctors: this.props.Li_StsDoctors,
      GuideDivision: this.state.dataForm.GuideDivision || "",
      LastTimeInterpretationInspectCode:
        this.state.dataForm.LastTimeInterpretationInspectCode,
      Li_InterpretationInspectCode:
        this.state.dataForm.Li_InterpretationInspectCode,
    };
    RadiographyFindingInputSubAction.postLastTimeDoBtnAction(data)
      .then((res) => {
        if (res) {
          Modal.confirm({
            icon: <QuestionCircleOutlined style={{ color: "#1890ff" }} />,
            content: "前回所見を取込ますか。",
            okText: "は　い",
            cancelText: "いいえ",
            onOk: () => {
              this.postLastTimeDoBtnYes(res.StsConfirm);
            },
          });
        } else {
          Modal.confirm({
            icon: <QuestionCircleOutlined style={{ color: "#1890ff" }} />,
            content: "前回所見を取込ますか。",
            okText: "は　い",
            cancelText: "いいえ",
            onOk: () => {
              this.postLastTimeDoBtnYes(6);
            },
          });
        }
      })
      .finally(() => {
        this.setState({ isLoadingForm: false });
      });
  }
  postLastTimeDoBtnYes(StsConfirm) {
    const data = {
      Li_ReserveNumPrevious: this.state.dataForm.LastTimeReserveNum,
      Li_InspectCode: this.state.dataForm.LastTimeInspectCode,
      Li_ReserveNumThisTime: this.state.dataForm.Li_ReserveNum,
      Li_InterpretationInspectCode:
        this.state.dataForm.Li_InterpretationInspectCode,
      Li_DoctorCode: this.state.dataForm.Li_DoctorCode,
      Li_JudgeLevel: this.state.dataForm.judgment_level_division,
      Li_StsDoctors: this.props.Li_StsDoctors,
      GuideDivision: this.state.dataForm.GuideDivision,
      GuideDivisionPrevious: this.state.dataForm.GuideDivisionPrevious,
      StsPreviousJudgeGet:
        this.state.dataForm.StsPreviousJudgeGet === false ? 0 : 1,
      StsConfirm: StsConfirm,
    };
    RadiographyFindingInputSubAction.postLastTimeDoBtnYesAction(data)
      .then((res) => {
        if (res.message === "Success") {
          this.getListDataFindingsContent();
        }
      })
      .finally(() => {});
  }

  ChangeSite1(site_code1) {
    const data = {
      InspectClassifyCode: this.state.dataForm.Li_InterpretationInspectCode,
      SiteCode1: site_code1 ? site_code1.site_code : 0,
      SiteCode2: 0,
      FindingsCode1: 0,
    };
    RadiographyFindingInputSubAction.getChangeSiteAndFindingsCodeAction(data)
      .then((res) => {
        if (res) {
          this.setState({
            site_code1: site_code1,
            ChangeSiteAndFindingsCode: res,
            activeLink: site_code1.site_code,
            site_code2: 0,
          });
        }
      })
      .finally(() => {});
  }
  ChangeSite2(site_code2) {
    const data = {
      InspectClassifyCode: this.state.dataForm.Li_InterpretationInspectCode,
      SiteCode1: this.state.site_code1.site_code,
      SiteCode2: site_code2 ? site_code2.site_code : 0,
      FindingsCode1: 0,
    };
    RadiographyFindingInputSubAction.getChangeSiteAndFindingsCodeAction(data)
      .then((res) => {
        if (res) {
          this.setState({
            site_code2: site_code2,
            ChangeSiteAndFindingsCode: res,
            activeLink2: site_code2.site_code,
          });
        }
      })
      .finally(() => {});
  }
  ChangeFindingsCode1(finding_code1) {
    const data = {
      InspectClassifyCode: this.state.dataForm.Li_InterpretationInspectCode,
      SiteCode1: this.state.site_code1.site_code,
      SiteCode2: this.state.site_code2.site_code
        ? this.state.site_code2.site_code
        : 0,
      FindingsCode1: finding_code1 ? finding_code1.findings_code : 0,
    };
    RadiographyFindingInputSubAction.getChangeSiteAndFindingsCodeAction(data)
      .then((res) => {
        if (res) {
          this.setState({
            findings_code1: finding_code1,
            ChangeSiteAndFindingsCode: res,
            activeLink3: finding_code1.findings_code,
          });
        }
      })
      .finally(() => {});
  }
  ChangeFindingsCode2(finding_code2) {
    this.setState({
      findings_code2: finding_code2,
      activeLink4: finding_code2.findings_code,
    });
  }
  settingBtn() {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InterpretationInspectCode:
        this.state.dataForm.Li_InterpretationInspectCode,
      Li_DoctorCode: this.state.dataForm.Li_DoctorCode,
      SiteCode1: this.state.site_code1.site_code
        ? this.state.site_code1.site_code
        : 0,
      SiteCode2: this.state.site_code2.site_code
        ? this.state.site_code2.site_code
        : 0,
      FindingsCode1: this.state.findings_code1.findings_code
        ? this.state.findings_code1.findings_code
        : 0,
      FindingsCode2: this.state.findings_code2.findings_code
        ? this.state.findings_code2.findings_code
        : 0,
      SiteFindingsOutputConvert:
        this.state.dataForm.SiteFindingsOutputConvert === false ? 0 : 1,
    };
    RadiographyFindingInputSubAction.postSettingBtnAction(data)
      .then((res) => {
        if (res.StsEnter === true) {
          this.getListDataFindingsContent();
        } else {
          Modal.error({
            content: "所見が選択されていません",
            okText: "Ok",
          });
        }
      })
      .finally(() => {});
  }

  onFinish(values) {}
  findIndexByID = (arrayData, recordID) => {
    if (arrayData && arrayData.length > 0) {
      return arrayData.findIndex((item) => recordID === item.id);
  }
  };
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  handleSelectRowsTableFirst = (selectedRowTableFirst) => {
    this.setState({ selectedRowTableFirst });
  };

  handleSelectRowsTableSecond = (selectedRowTableSecond) => {
    this.setState({ selectedRowTableSecond });
  };
  f12() {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InterpretationInspectItemCode:
        this.state.dataForm.Li_InterpretationInspectCode,
      Li_DoctorCode: this.state.dataForm.Li_DoctorCode,
      Remarks: this.formRef.current?.getFieldValue("Remarks"),
      GuideDivision: this.formRef.current?.getFieldValue("GuideDivision"),
      GuideCmtCode: this.formRef.current?.getFieldValue("GuideCmtCode"),
      GuideCmtContent: this.formRef.current?.getFieldValue("GuideCmtContent"),
      JudgeConvert: this.state.dataForm.JudgeConvert,
      judgment_level_division: this.state.dataForm.judgment_level_division,
    };
    RadiographyFindingInputSubAction.f12Action(data)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({});
        }
      })
      .finally(() => {});
  }

  render() {
    const { selectedRowTableFirst, selectedRowTableSecond } = this.state;
    const { rowSelect, activeLink, activeLink2, activeLink3, activeLink4 } =
      this.state;
    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst,
    };

    const rowSelectionTableSecond = {
      selectedRowTableSecond,
      onChange: this.handleSelectRowsTableSecond,
    };
    const formSource = this.state.dataForm;
    const ChangeSiteAndFindingsCode = this.state.ChangeSiteAndFindingsCode;

    return (
      <div className="radiography-finding-input-sub">
        <Card title="読影所見入力 SUB">
          <Spin spinning={this.state.isLoadingForm}>
            <Form ref={this.formRef} onFinish={this.onFinish}>
              <Row gutter={24}>
                <Col span={6}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="受診日" name="Date">
                        <span>
                          {moment(formSource.Date).format("YYYY/MM/DD")}
                        </span>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item style={{ textAlign: "end" }} label="受付番号">
                        <span>{formSource.AcceptNum}</span>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={18}>
                      <Form.Item
                        name=""
                        label="予約番号"
                        style={{ textAlign: "start" }}
                      >
                        <span>{formSource.Li_ReserveNum}</span>
                      </Form.Item>
                    </Col>
                    <Col span={6} style={{ textAlign: "right" }}>
                      <span>
                        <UnlockOutlined />
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={9}>
                  <Row gutter={24}>
                    <Col span={8} style={{ paddingRight: "0" }}>
                      <Form.Item
                        label="個人番号"
                        style={{ textAlign: "right" }}
                      >
                        <span>{formSource.Expression_26}</span>
                      </Form.Item>
                    </Col>
                    <Col span={4} style={{ padding: "0" }}>
                      <Form.Item name="Expression_21">
                        <Input
                          type="text"
                          disabled={true}
                          style={{
                            background: Color(formSource.Expression_22)
                              ?.Background,
                            color: Color(formSource.Expression_22)?.Foreground,
                            textAlign: "center",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2} style={{ padding: "0" }}>
                      <Form.Item style={{ textAlign: "center" }}>
                        <span>{formSource.Expression_33}</span>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item style={{ textAlign: "right" }}>
                        <span>
                          {moment(formSource.Expression_23).format("NNy/MM/DD")}
                        </span>
                        <span style={{ marginLeft: "15px" }}>
                          {formSource.Age}歳
                        </span>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name=""
                        label="氏名"
                        style={{ textAlign: "center" }}
                      >
                        <span>{formSource.Expression_25}</span>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Button
                        style={{
                          float: "right",
                          marginBottom: "5px",
                          display: "inline-block",
                        }}
                        icon={<MoreOutlined />}
                        onClick={() => {
                          let title = '個人情報照会SUB' + ' [' + this.state.dataForm.PersonalNumId + ']'
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1600,
                              component: (
                                <Card title={title}>
                                  <WS2584019_PersonalInfoInquirySub
                                    Li_PersonalNum={
                                      this.state.dataForm.PersonalNumId
                                    }
                                    onClickedCreate={() => {
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        },
                                      });
                                    }}
                                  />
                                </Card>
                              ),
                            },
                          });
                        }}
                      ></Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={9}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="保険者番号">
                        <span>
                          {formSource.insurer_number === 0
                            ? null
                            : formSource.insurer_number}
                        </span>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="保険記号／番号">
                        <span>{formSource.Expression_34}</span>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="保険者名称">
                        <span>
                          {formSource.Expression_35 === "[  ]"
                            ? null
                            : formSource.Expression_35}
                        </span>
                      </Form.Item>
                    </Col>
                    <Col span={12}></Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <p
                    style={{
                      marginBottom: "5px",
                      color: "#14468C",
                      fontWeight: "bold",
                    }}
                  >
                    部位
                  </p>
                  <Row gutter={24}>
                    <Col span={12} style={{ height: "229px" }}>
                      {ChangeSiteAndFindingsCode.SiteCode1 ? (
                        <Form.Item
                          style={{
                            border: "1px solid #d9d9d9",
                            height: "100%",
                            paddingLeft: "5px",
                          }}
                        >
                          {ChangeSiteAndFindingsCode.SiteCode1 &&
                            ChangeSiteAndFindingsCode.SiteCode1.map((res) => {
                              return (
                                <div
                                  className={
                                    res.site_code === activeLink
                                      ? "active_item"
                                      : ""
                                  }
                                  onClick={() => {
                                    this.ChangeSite1(res);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {res.site_name}
                                </div>
                              );
                            })}
                        </Form.Item>
                      ) : (
                        <Form.Item
                          style={{
                            border: "1px solid #d9d9d9",
                            height: "100%",
                            paddingLeft: "5px",
                          }}
                        >
                          {" "}
                          {formSource.SiteCode1 &&
                            formSource.SiteCode1.map((res) => {
                              return (
                                <div
                                  className={
                                    res.site_code === activeLink
                                      ? "active_item"
                                      : ""
                                  }
                                  onClick={() => {
                                    this.ChangeSite1(res);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {res.site_name}
                                </div>
                              );
                            })}
                        </Form.Item>
                      )}
                    </Col>
                    <Col span={12} style={{ height: "229px" }}>
                      {ChangeSiteAndFindingsCode.SiteCode1 ? (
                        <Form.Item
                          style={{
                            border: "1px solid #d9d9d9",
                            height: "100%",
                            paddingLeft: "5px",
                          }}
                        >
                          {ChangeSiteAndFindingsCode.SiteCode2 &&
                            ChangeSiteAndFindingsCode.SiteCode2.map((res) => {
                              return (
                                <div
                                  className={
                                    res.site_code === activeLink2
                                      ? "active_item"
                                      : ""
                                  }
                                  onClick={() => {
                                    this.ChangeSite2(res);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {res.site_name}
                                </div>
                              );
                            })}
                        </Form.Item>
                      ) : (
                        <Form.Item
                          style={{
                            border: "1px solid #d9d9d9",
                            height: "100%",
                            paddingLeft: "5px",
                          }}
                        >
                          {formSource.SiteCode2 &&
                            formSource.SiteCode2.map((res) => {
                              return (
                                <div
                                  className={
                                    res.site_code === activeLink2
                                      ? "active_item"
                                      : ""
                                  }
                                  onClick={() => {
                                    this.ChangeSite2(res.site_code);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {res.site_name}
                                </div>
                              );
                            })}
                        </Form.Item>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <p
                    style={{
                      marginBottom: "5px",
                      color: "#14468C",
                      fontWeight: "bold",
                    }}
                  >
                    所見
                  </p>
                  <Row gutter={24}>
                    <Col span={12} style={{ height: "229px" }}>
                      {ChangeSiteAndFindingsCode.SiteCode1 ? (
                        <Form.Item
                          style={{
                            border: "1px solid #d9d9d9",
                            height: "100%",
                            paddingLeft: "5px",
                          }}
                        >
                          {ChangeSiteAndFindingsCode.FindingsCode1 &&
                            ChangeSiteAndFindingsCode.FindingsCode1.map(
                              (res) => {
                                return (
                                  <div
                                    className={
                                      res.findings_code === activeLink3
                                        ? "active_item"
                                        : ""
                                    }
                                    onClick={() => {
                                      this.ChangeFindingsCode1(res);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {res.findings_name}
                                  </div>
                                );
                              }
                            )}
                        </Form.Item>
                      ) : (
                        <Form.Item
                          style={{
                            border: "1px solid #d9d9d9",
                            height: "100%",
                            paddingLeft: "5px",
                          }}
                        >
                          {formSource.FindingsCode1 &&
                            formSource.FindingsCode1.map((res) => {
                              return (
                                <div
                                  className={
                                    res.findings_code === activeLink3
                                      ? "active_item"
                                      : ""
                                  }
                                  onClick={() => {
                                    this.ChangeFindingsCode1(res);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {res.findings_name}
                                </div>
                              );
                            })}
                        </Form.Item>
                      )}
                    </Col>
                    <Col span={12} style={{ height: "229px" }}>
                      {ChangeSiteAndFindingsCode.SiteCode1 ? (
                        <Form.Item
                          style={{
                            border: "1px solid #d9d9d9",
                            height: "100%",
                            paddingLeft: "5px",
                          }}
                        >
                          {ChangeSiteAndFindingsCode.FindingsCode2 &&
                            ChangeSiteAndFindingsCode.FindingsCode2.map(
                              (res) => {
                                return (
                                  <div
                                    className={
                                      res.findings_code === activeLink4
                                        ? "active_item"
                                        : ""
                                    }
                                    onClick={() => {
                                      this.ChangeFindingsCode2(res);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {res.findings_name}
                                  </div>
                                );
                              }
                            )}
                        </Form.Item>
                      ) : (
                        <Form.Item
                          style={{
                            border: "1px solid #d9d9d9",
                            height: "100%",
                            paddingLeft: "5px",
                          }}
                        >
                          {formSource.FindingsCode2 &&
                            formSource.FindingsCode2.map((res) => {
                              return (
                                <div
                                  className={
                                    res.findings_code === activeLink4
                                      ? "active_item"
                                      : ""
                                  }
                                  onClick={() => {
                                    this.ChangeFindingsCode2(res);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {res.findings_name}
                                </div>
                              );
                            })}
                        </Form.Item>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <p
                    style={{
                      marginBottom: "5px",
                      color: "#14468C",
                      fontWeight: "bold",
                    }}
                  >
                    メモ
                  </p>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item name="Remarks">
                        <Input.TextArea rows={5} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item name="RemarksOtherPeople">
                        <Input.TextArea readOnly rows={5} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={24} className="mb-3">
                <Col span={16}>
                  <p
                    style={{
                      marginBottom: "5px",
                      color: "#14468C",
                      fontWeight: "bold",
                    }}
                  >
                    入力内容
                  </p>
                  <Row gutter={24}>
                    <Col span={14}></Col>
                    <Col span={6}>
                      {formSource.user_name ? (
                        <Form.Item label="技師名">
                          <span>{formSource.user_name}</span>
                        </Form.Item>
                      ) : null}
                    </Col>
                    <Col span={4}>
                      <Button
                        onClick={() => {
                          this.settingBtn();
                        }}
                        type="primary"
                        style={{ float: "right", marginBottom: "13px" }}
                      >
                        設定
                      </Button>
                    </Col>
                  </Row>
                  <Row gutter={24} className="mb-3">
                    <Col span={2} style={{ textAlign: "right" }}>
                      <span style={{ color: "#14468C", fontWeight: "bold" }}>
                        所見
                      </span>
                    </Col>
                    <Col span={22}>
                      <Table
                        bordered={true}
                        dataSource={this.state.dataSource1}
                        loading={false}
                        pagination={false}
                        rowKey={(record) => record.id}
                        rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
                        size="small"
                        scroll={{ y: '260px' }}
                        // rowSelection={{
                        //   type: "radio",
                        //   ...rowSelectionTableFirst,
                        // }}
                        onRow={(record, index) => ({
                          onClick: (e) => {
                            console.log(index);
                            this.setState({ rowSelect: record ,  indexTable: index,  selectedRows: [record],});
                          },
                        })}
                      >
                        <Table.Column
                        style={{ padding: "0" }}
                          width={200}
                          title="連番"
                          dataIndex="W4_serial_num"
                          render={(row, record, index) => {
                            return (
                              <Form.Item
                                name={["tableData", index, "W4_serial_num"]}
                                style={{ marginBottom: "0px" }}
                              >
                                <Input
                                  type="number"
                                  style={{ textAlign: "end" }}
                                  onChange={(e) =>
                                    this.onChangeInput(
                                      rowSelect,
                                      e.target.value,
                                      "W4_serial_num"
                                    )
                                  }
                                  name="W4_serial_num"
                                />
                              </Form.Item>
                            );
                          }}
                        />
                        <Table.Column
                          title="部位"
                          dataIndex="W4_site_name"
                          render={(row, record, index) => {
                            return (
                              <Form.Item
                                name={["tableData", index, "W4_site_name"]}
                                style={{ marginBottom: "0px" }}
                              >
                                <Input
                                  onChange={(e) =>
                                    this.onChangeInput(
                                      rowSelect,
                                      e.target.value,
                                      "W4_site_name"
                                    )
                                  }
                                  name="W4_site_name"
                                />
                              </Form.Item>
                            );
                          }}
                        />
                        <Table.Column
                          title="所見"
                          dataIndex="W4_findings_name"
                          render={(row, record, index) => {
                            return (
                              <Form.Item
                                name={["tableData", index, "W4_findings_name"]}
                                style={{ marginBottom: "0px" }}
                              >
                                <Input
                                  onChange={(e) =>
                                    this.onChangeInput(
                                      rowSelect,
                                      e.target.value,
                                      "W4_findings_name"
                                    )
                                  }
                                  name="W4_findings_name"
                                />
                              </Form.Item>
                            );
                          }}
                        />
                        <Table.Column
                          title="判定"
                          dataIndex="W4_judge"
                          render={(row, record, index) => {
                            return (
                              <Form.Item
                                name={["tableData", index, "W4_judge"]}
                                style={{ marginBottom: "0px" }}
                              >
                                <Input
                                  onDoubleClick={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: 800,
                                        component: (
                                          <WS1868001_JudgeSelectQuerySub
                                            Li_JudgeLevel={record.Li_JudgeLevel}
                                            Lo_Judge=""
                                            onFinishScreen={(output) => {
                                              record = {
                                                ...record,
                                                W4_judge:
                                                  output.Lo_interpretation_judgment_result,
                                              };
                                              let data = [
                                                ...this.state.dataSource1,
                                              ];
                                              data[index] = record;
                                              this.setState({
                                                dataSource1: data,
                                              });
                                              this.formRef.current.setFieldsValue(
                                                {
                                                  tableData: data,
                                                }
                                              );

                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    });
                                  }}
                                  onChange={(e) =>
                                    this.onChangeInput(
                                      rowSelect,
                                      e.target.value,
                                      "W4_judge"
                                    )
                                  }
                                  name="W4_judge"
                                />
                              </Form.Item>
                            );
                          }}
                        />
                        <Table.Column
                          width={120}
                          align="center"
                          title={() => (
                            <Button

                            style={{ width: '35px' }}
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={() => {
                                let arrTemp = [{ W4_serial_num: "" }];
                                this.formRef.current.setFieldsValue({
                                  tableData: [
                                    ...arrTemp,
                                    ...this.state.dataSource1,
                                  ],
                                });
                                this.setState({
                                  dataSource1: [
                                    ...arrTemp,
                                    ...this.state.dataSource1,
                                  ],
                                });
                              }}
                            ></Button>
                          )}
                          render={(text, record, index) => (
                            <>
                              <Button
                              hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource1, record.id)}
                                style={{ border: "none", marginRight: '5px', color: "green"}}
                                size="small"
                                icon={
                                  <SaveOutlined />
                                }
                                onClick={() => this.saveData(record)}
                              ></Button>
                              <Button
                               hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource1, record.id)}
                                style={{ border: "none", color: 'red'  }}
                                size="small"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  Modal.confirm({
                                    content: "消去してもよろしいですか？",
                                    okText: "は　い",
                                    cancelText: "いいえ",
                                    onOk: () => this.deleteData(record),
                                  });
                                }}
                              ></Button>
                            </>
                          )}
                        />
                      </Table>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    {this.props.Li_StsDoctors === 1 ||
                    this.state.InterpretationMode === 2 ? (
                      <Col span={2} style={{ textAlign: "right" }}>
                        <span style={{ color: "#14468C", fontWeight: "bold" }}>
                          判定
                        </span>
                      </Col>
                    ) : null}
                    {this.props.Li_StsDoctors === 1 ||
                    this.state.InterpretationMode === 2 ? (
                      <Col span={2}>
                        <Form.Item name="GuideDivision">
                          <Input
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 800,
                                  component: (
                                    <WS1868001_JudgeSelectQuerySub
                                      Li_JudgeLevel={
                                        this.state.dataForm
                                          .judgment_level_division
                                      }
                                      onFinishScreen={(output) => {
                                        this.formRef.current.setFieldsValue({
                                          GuideDivision:
                                            output.Lo_interpretation_judgment_result,
                                        });
                                        this.setState({
                                          judgment_name:
                                            output.Lo_judgment_name,
                                        });
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                            type="text"
                          />
                        </Form.Item>
                      </Col>
                    ) : null}
                    {this.props.Li_StsDoctors === 1 ||
                    this.state.InterpretationMode === 2 ? (
                      <Col span={12}>
                        <Form.Item>
                          <span>
                            {this.state.judgment_name
                              ? this.state.judgment_name
                              : formSource.judgment_name}
                          </span>
                        </Form.Item>
                      </Col>
                    ) : (
                      <Col span={16}></Col>
                    )}
                    {this.state.dataForm.judgment_name == "" ? (
                      <Col span={8}>
                        <Form.Item name="Expression_90">
                          <Input type="text" disabled={true} />
                        </Form.Item>
                      </Col>
                    ) : (
                      <Col span={8}>
                        <Form.Item name="Expression_90">
                          <Input
                            style={{ color: "red" }}
                            type="text"
                            disabled={true}
                          />
                        </Form.Item>
                      </Col>
                    )}
                  </Row>
                  <Row gutter={24}>
                    <Col span={2} style={{ textAlign: "right" }}>
                      {this.props.Li_StsDoctors === 1 ||
                      this.state.InterpretationMode === 2 ? (
                        <span style={{ color: "#14468C", fontWeight: "bold" }}>
                          指導
                        </span>
                      ) : null}

                      {this.props.Li_StsDoctors === 0 &&
                      this.state.InterpretationMode < 2 ? (
                        <span style={{ color: "red" }}>※　</span>
                      ) : null}
                    </Col>
                    <Col span={22}>
                      {this.props.Li_StsDoctors === 1 ||
                      this.state.InterpretationMode === 2 ? (
                        <Form.Item name="GuideCmtContent">
                          <Input.TextArea
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1400,
                                  component: (
                                    <WS1865001_LeadershipMatterSearchSub
                                      Li_InspectClassifyCode={
                                        this.state.dataForm.InspectClassifyCode
                                      }
                                      onFinishScreen={(output) => {
                                        this.formRef.current.setFieldsValue({
                                          GuideCmtContent:
                                            output.Lo_CommentContent,
                                        });
                                        this.formRef.current.setFieldsValue({
                                          GuideCmtCode: output.Lo_CommentCode,
                                        });
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                            rows={5}
                          />
                        </Form.Item>
                      ) : null}
                      <Form.Item>
                        {this.props.Li_StsDoctors === 0 &&
                        this.state.InterpretationMode < 2 ? (
                          <div style={{ color: "red" }}>
                            読影者が区分：技師のため、判定と指導は入力出来ません。
                            <br />
                            入力する場合は、区分が医師の読影者で入り直してください。
                          </div>
                        ) : null}
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <p
                    style={{
                      marginBottom: "5px",
                      color: "#14468C",
                      fontWeight: "bold",
                    }}
                  >
                    前回情報
                  </p>
                  <Row gutter={24} className="mb-3">
                    <Col span={8}>
                      {this.state.dataForm.LastTimeInterpretationInspectCode !==
                        this.state.dataForm.Li_InterpretationInspectCode &&
                      this.state.dataForm.LastTimeInterpretationInspectCode !==
                        "" ? (
                        <Form.Item name="Expression_69">
                          <span style={{ color: "red" }}>
                            {this.state.dataForm.Expression_69}
                          </span>
                        </Form.Item>
                      ) : null}
                    </Col>
                    <Col span={16}>
                      <Button
                        disabled={!this.state.dataSource2[0]}
                        onClick={() => {
                          this.postLastTimeDoBtn();
                        }}
                        type="primary"
                        style={{ float: "right" }}
                      >
                        前回DO
                      </Button>
                    </Col>
                  </Row>

                  <Table
                    bordered={true}
                    className="mb-3"
                    size="small"
                    dataSource={this.state.dataSource2}
                    loading={false}
                    pagination={false}
                    scroll={{ y: '260px' }}
                    rowKey={(record) => record.id}
                    // rowSelection={{ type: "radio", ...rowSelectionTableSecond }}
                  >
                    <Table.Column
                      title={this.state.Expression_4}
                      dataIndex="SiteFindings"
                    />
                    <Table.Column title="判定" dataIndex="judgment_value" />
                  </Table>
                  {this.props.Li_StsDoctors === 1 ||
                  this.state.InterpretationMode === 2 ? (
                    <React.Fragment>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Form.Item name="GuideDivisionPrevious">
                            <Input type="text" disabled={true} />
                          </Form.Item>
                        </Col>
                        <Col span={20}></Col>
                      </Row>
                      <Row gutter={24}>
                        <Col span={24}>
                          <Form.Item name="GuideCmtContentPrevious">
                            <Input.TextArea rows={5} disabled={true} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </React.Fragment>
                  ) : null}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Button
                    onClick={() => {
                      this.f12();
                    }}
                    type="primary"
                    style={{ float: "right" }}
                  >
                    確定
                  </Button>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS1863001_RadiographyFindingInputSub);
