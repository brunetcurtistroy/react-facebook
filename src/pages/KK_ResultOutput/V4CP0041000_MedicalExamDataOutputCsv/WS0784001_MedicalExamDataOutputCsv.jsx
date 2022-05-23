import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import {
  Card,
  InputNumber,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Space,
  Modal,
  message,
  DatePicker,
} from "antd";
import ModalDraggable from "components/Commons/ModalDraggable";
import { SearchOutlined } from "@ant-design/icons";

import WS0578001_CourseMultipleExtractScreenSub from "pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS0578001_CourseMultipleExtractScreenSub";
import WS0784003_FormInquiry from "./WS0784003_FormInquiry";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0784005_InsuranceSymbolInquiry from "./WS0784005_InsuranceSymbolInquiry";
import WS0495001_ConditionExpressInfoInquiry from "../OITA0310_BindingModeSetting/WS0495001_ConditionExpressInfoInquiry";
import WS0931001_CsvOutputSub from "pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0931001_CsvOutputSub";
import WS0784006_FacilityTypeQuery from "./WS0784006_FacilityTypeQuery";
import WS2788013_TargetSelectSub from "pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS2788013_TargetSelectSub";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import MedicalExamDataOutputCsvAction from "redux/ResultOutput/MedicalExamDataOutputCsv/MedicalExamDataOutputCsv.action";
import moment from "moment";
import WS0432001_CsvConfirm from "pages/TO_StatisticalServices/V2MS0140_PersonalInfoCsvOutput/WS0432001_CsvConfirm.jsx";
import WS0784004_FileNameInputUav02 from "pages/KK_ResultOutput/V4CP0041000_MedicalExamDataOutputCsv/WS0784004_FileNameInputUav02.jsx";
class WS0784001_MedicalExamDataOutputCsv extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "健診データ出力[CSV]";
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [{ id: 1, Code: 10, DocumentName: "労基５２条" }],
      RelationshipChar: [],
      GfacilitiesNum: [],
      selectedRows: [],
      message: "",
      isSearch: false,
      parramOutputF12: {
        Userdate: "",
        FileUav02: "",
      },
    };

    this.setFormFieldValue = this.setFormFieldValue.bind(this);
  }

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
  checkData(value, type) {
    const val = type === "number" ? 0 : "";
    return !this.isEmpty(value) ? value : val;
  }
  renderFiledGcreendata(data) {
    if (!!data) {
      this.setState({
        Userdate: data.Userdate,
        FileUav02: data.FileUav0,
      });
      const keys = !this.isEmpty(Object.keys(data)) ? Object.keys(data) : [];
      const values = !this.isEmpty(Object.values(data))
        ? Object.values(data)
        : [];
      if (values.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          for (let y = 0; y < values.length; y++) {
            if (
              keys[i] === "EndDateChar" ||
              keys[i] === "StartDateChar" ||
              keys[i] === "FileCreationDateChar"
            ) {
              this.setFormFieldValue(keys[i], moment(values[i]));
            } else {
              // this.setFormFieldValue(keys[i], values[i])
              if (keys[i] === "GfacilitiesNum") {
                this.setState({ GfacilitiesNum: values[i] });
              } else {
                if (keys[i] === "RelationshipChar") {
                  this.setState({ RelationshipChar: values[i] });
                } else {
                  this.setFormFieldValue(keys[i], values[i]);
                }
              }
            }
          }
        }
      }
      document.getElementById('event').focus();
    }
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  downloadFile() {
    const formRefValue = this.formRef?.current?.getFieldValue();
    const params = {
      FileUav02: formRefValue?.FileUav02 ? formRefValue?.FileUav02 : "",
      GfileCreationDate: formRefValue?.GfileCreationDate
        ? formRefValue?.GfileCreationDate
        : "",
      Sys010Status: formRefValue?.Sys010Status ? formRefValue?.Sys010Status : 1,
      Goutput: formRefValue?.Goutput ? formRefValue?.Goutput : "",
      TextFile: formRefValue?.TextFile ? formRefValue?.TextFile : "",
      StsUserUnitFdPara: formRefValue?.StsUserUnitFdPara
        ? formRefValue?.StsUserUnitFdPara
        : 1,
      options: formRefValue?.options ? formRefValue?.options : "",
      OutputCharSet: formRefValue?.OutputCharSet
        ? formRefValue?.OutputCharSet
        : "",
      Format: formRefValue?.Format ? formRefValue?.Format : "",
      PersonalInfoOutputOption: formRefValue?.PersonalInfoOutputOption
        ? formRefValue?.PersonalInfoOutputOption
        : "",
      HeaderHeadingOption: formRefValue?.HeaderHeadingOption
        ? formRefValue?.HeaderHeadingOption
        : "",
      IdOutputOption: formRefValue?.IdOutputOption
        ? formRefValue?.IdOutputOption
        : "",
      AgeCalculateOption: formRefValue?.AgeCalculateOption
        ? formRefValue?.AgeCalculateOption
        : "",
      CsvFormat: formRefValue?.CsvFormat ? formRefValue?.CsvFormat : "",
      FixOption: formRefValue?.FixOption ? formRefValue?.FixOption : "",
      Exec: formRefValue?.Exec ? formRefValue?.Exec : "",
      Type: formRefValue?.Type ? formRefValue?.Type : "",
      Run: formRefValue?.Run ? formRefValue?.Run : "",
    };
    MedicalExamDataOutputCsvAction.Downloadfile(params)
      .then((res) => {
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
  checkOutputF12() {
    const value = this.formRef?.current?.getFieldValue();
    const StsUserUnitFdPara = !value.StsUserUnitFdPara ? 0 : 1;
    const params = {
      FileExec: this.checkData(value.Exec, "number"),
      StsUserUnitFdPara: StsUserUnitFdPara,
      options: this.checkData(value.options, "text"),
    };
    MedicalExamDataOutputCsvAction.OutputF12(params).then((res) => {
      const callCsvConfirm_432 = "Call Screen Program CsvConfirm_432";
      if (res && res.message === callCsvConfirm_432) {
        this.callCsvConfirm_432();
      } else {
        this.WS0784004_FileNameInputUav02();
      }
    });
  }
  callCsvConfirm_432() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "30%",
        component: (
          <WS0432001_CsvConfirm
            Lio_Output={this.formRef.current?.getFieldValue("Goutput")}
            onFinishScreen={(output) => {
              this.setFormFieldValue("Sys10Status", output.Lo_StsOutput);
              this.setFormFieldValue("FileUav02", output.Lio_Output);
              if (output.Lo_StsOutput) {
                this.downloadFile();
              }
              this.closeModal();
            }}
          />
        ),
      },
    });
  }
  WS0784004_FileNameInputUav02() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 650,
        component: (
          <WS0784004_FileNameInputUav02
            Userdate={this.state.parramOutputF12.Userdate}
            FileUav02={this.state.parramOutputF12.FileUav02}
            onFinishScreen={(output) => {
              this.state.parramOutputF12.FileUav02 = output.Lo_FileUav02;
              this.callCsvConfirm_432();
            }}
          />
        ),
      },
    });
  }
  onFinish(values) {}
  componentDidMount() {
    this.getScreenData();
    this.setFormFieldValue("RelationshipChar", "9");
    this.setFormFieldValue("GfacilitiesNum", 0);
    this.setFormFieldValue("GacceptStatus", 9);
  }
  getScreenData() {
    MedicalExamDataOutputCsvAction.GetScreenData().then((res) => {
      this.renderFiledGcreendata(res);
    });
  }
  Extract_F11() {
    const value = this.formRef?.current?.getFieldValue();
    const RelationshipChar = value.RelationshipChar;
    const GfacilitiesNum = value.GfacilitiesNum;
    const GacceptStatus = value.GacceptStatus;
    const params = {
      GstartDate: this.checkData(
        moment(value.StartDateChar).format("YYYY/MM/DD"),
        "text"
      ),
      GendDate: this.checkData(
        moment(value.EndDateChar).format("YYYY/MM/DD"),
        "text"
      ),
      GformType: this.checkData(value.GformType, "text"),
      GcourseF: this.checkData(value.GcourseF, "text"),
      GcourseT: this.checkData(value.GcourseT, "text"),
      GtubePalm: this.checkData(value.GtubePalm, "text"),
      Goffice: this.checkData(value.Goffice, "text"),
      GbranchStoreF: this.checkData(value.GbranchStoreF, "text"),
      GbranchStoreT: this.checkData(value.GbranchStoreT, "text"),
      GinsuranceSign: this.checkData(value.GinsuranceSign, "text"),
      ConditionNum: this.checkData(value.ConditionNum, "text"),
      Ggender: this.checkData(value.Ggender, "number"),
      RelationshipChar: RelationshipChar,
      GfacilitiesNum: GfacilitiesNum,
      GacceptStatus: GacceptStatus,
      Gselect: this.checkData(value.Gselect, "text"),
    };
    if (
      (value.GformType === undefined && value.Expression_38 === undefined) ||
      (value.GformType === "" && value.Expression_38 === "") ||
      value.Expression_38 === undefined ||
      value.GformType === undefined
    ) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: "30%",
          component: (
            <WS0784003_FormInquiry
              onFinishScreen={(output) => {
                if (output.flg === 1) {
                  Modal.error({
                    width: 260,
                    content: "帳票を選択してください",
                    okText: "はい",
                  });
                }
                this.setFormFieldValue("GformType", output.Lo_Code);
                this.setFormFieldValue("Expression_38", output.Lo_DocumentName);

                this.closeModal();
              }}
            />
          ),
        },
      });
    } else {
      MedicalExamDataOutputCsvAction.GetListDataF11(params)
        .then((res) => {
          if (res && res.PersonalInfoOutputOption.length > 0) {
            this.setState({ message: "Success", isSearch: true });
          }
          this.renderFiledGcreendata(res);
        })
        .catch((err) => {
          const res = err.response;
          if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
          this.setState({ message: "Faild", isSearch: true });
          message.error(res.data.message);
        });
    }
  }
  changeDataFormApi(name, nameleft) {
    const value = this.formRef?.current?.getFieldValue(name);
    if (value === undefined || value === "" || value === null) {
      if (name === "GformType") {
        this.formRef.current.setFieldsValue({
          Expression_38: "",
        });
        return;
      }
      if (name === "ConditionNum") {
        this.formRef.current.setFieldsValue({
          name: "",
        });
        return;
      }
    }
    MedicalExamDataOutputCsvAction[name]({ [name]: value }).then((res) => {
      if (Object.keys(res)[0] == "Expresstion_38") {
        this.setFormFieldValue("Expression_38", res["Expresstion_38"]);
      }
      if (name == "GtubePalm") {
        this.setFormFieldValue("insurer_kanji_name", res["insurer_kanji_name"]);
      }
      if (name == "Goffice") {
        this.setFormFieldValue("office_kanji_name", res["office_kanji_name"]);
      }
      if (name == "ConditionNum") {
        this.setFormFieldValue("name", res["name"]);
      }
      this.forceUpdate();
    });
  }
  render() {
    const { RelationshipChar, GfacilitiesNum } = this.state;
    return (
      <div className="medical-exam-data-output-csv">
        <Card title="健診データ出力[CSV]">
          <Row gutter={24}>
            <Col
              xl={6}
              lg={10}
              sm={24}
              style={{ borderRight: "1px solid #d9d9d9" }}
            >
              <Form
                style={{ width: "475px" }}
                ref={this.formRef}
                onFinish={this.onFinish}
              >
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      予約日
                    </label>
                  </Col>
                  <Col span={6} style={{ paddingRight: "5px" }}>
                    <Form.Item name="StartDateChar" label="">
                      <VenusDatePickerCustom
                      id={`event`}
                      tabIndex={`event`}
                        formRefDatePicker={this.formRef}
                        format={"YYYY/MM/DD"}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={7} style={{ paddingLeft: "0" }}>
                    <Form.Item name="EndDateChar" label="～">
                      <VenusDatePickerCustom
                        formRefDatePicker={this.formRef}
                        format={"YYYY/MM/DD"}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      出力帳票
                    </label>
                  </Col>
                  <Col span={4} style={{ paddingRight: "5px" }}>
                    <Form.Item name="GformType" label="">
                      <Input.Search
                        type="text"
                        onBlur={() => {
                          this.changeDataFormApi("GformType", "Expression_38");
                        }}
                        style={{ textAlign: "center" }}
                        maxLength={2}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "30%",
                              component: (
                                <WS0784003_FormInquiry
                                  onFinishScreen={(output) => {
                                    if (output.flg === 1) {
                                      Modal.error({
                                        width: 260,
                                        content: "帳票を選択してください",
                                        okText: "はい",
                                      });
                                    }
                                    this.setFormFieldValue(
                                      "GformType",
                                      output.Lo_Code
                                    );
                                    this.setFormFieldValue(
                                      "Expression_38",
                                      output.Lo_DocumentName
                                    );

                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                        onKeyUp={(e) => {
                          if (e.keyCode === 9) {
                            if (
                              this.formRef.current?.getFieldValue(
                                "GformType"
                              ) &&
                              this.formRef.current?.getFieldValue(
                                "Expression_38"
                              )
                            ) {
                            } else {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "30%",
                                  component: (
                                    <WS0784003_FormInquiry
                                      onFinishScreen={(output) => {
                                        if (output.flg === 1) {
                                          Modal.error({
                                            width: 260,
                                            content: "帳票を選択してください",
                                            okText: "はい",
                                          });
                                        }
                                        this.setFormFieldValue(
                                          "GformType",
                                          output.Lo_Code
                                        );
                                        this.setFormFieldValue(
                                          "Expression_38",
                                          output.Lo_DocumentName
                                        );

                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                              e.preventDefault();
                            }
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={15} style={{ paddingLeft: "0" }}>
                    <Form.Item name="Expression_38" label="">
                      <Input
                        readOnly
                        type="text"
                        style={{ border: "none", background: "transparent" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      コース
                    </label>
                  </Col>
                  <Col span={4} style={{ paddingRight: "5px" }}>
                    <Form.Item name="GcourseF" label="">
                      <Input.Search
                        type="text"
                        style={{ textAlign: "center" }}
                        maxLength={3}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "70%",
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "GcourseF",
                                      output.Lo_CourseCode
                                    );

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
                  <Col
                    span={5}
                    style={{ paddingLeft: "0", paddingRight: "5px" }}
                  >
                    <Form.Item name="GcourseT" label="～">
                      <Input.Search
                        type="text"
                        style={{ textAlign: "center" }}
                        maxLength={3}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "70%",
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "GcourseT",
                                      output.Lo_CourseCode
                                    );

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
                  <Col span={4} style={{ paddingLeft: "0" }}>
                    <label
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "20%",
                            component: (
                              <WS0578001_CourseMultipleExtractScreenSub
                                onFinishScreen={(output) => {
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    >
                      {/* <div style={caretBorder}>
                        <span style={caretDownStyle}></span>

                      </div> */}
                    </label>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      保険者
                    </label>
                  </Col>
                  <Col span={7} style={{ paddingRight: "5px" }}>
                    <Form.Item name="GtubePalm" label="">
                      <Input.Search
                        onBlur={() => {
                          this.changeDataFormApi(
                            "GtubePalm",
                            "insurer_kanji_name"
                          );
                        }}
                        style={{ textAlign: "right" }}
                        maxLength={10}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "70%",
                              component: (
                                <WS0246001_InsurerInfoSearchQuery
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "GtubePalm",
                                      output.Lo_InsurerCode
                                    );
                                    this.setFormFieldValue(
                                      "insurer_kanji_name",
                                      output.Lo_Name
                                    );

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
                  <Col span={13} style={{ paddingLeft: "0" }}>
                    <Form.Item name="insurer_kanji_name" label="">
                      <Input
                        readOnly
                        type="text"
                        style={{ border: "none", background: "transparent" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      事業所
                    </label>
                  </Col>
                  <Col span={6} style={{ paddingRight: "5px" }}>
                    <Form.Item name="Goffice" label="">
                      <Input.Search
                        onBlur={() => {
                          this.changeDataFormApi("Goffice", "GbranchStoreF");
                        }}
                        style={{ textAlign: "right" }}
                        maxLength={8}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "70%",
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "Goffice",
                                      output.Lio_OfficeCode
                                    );
                                    this.setFormFieldValue(
                                      "office_kanji_name",
                                      output.Lo_Kanji_Name
                                    );

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
                  <Col
                    span={4}
                    style={{ paddingLeft: "0", paddingRight: "5px" }}
                  >
                    <Form.Item name="GbranchStoreF" label="">
                      <InputNumber type="text" maxLength={5} />
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ paddingLeft: "0" }}>
                    <Form.Item name="office_kanji_name" label="">
                      <Input
                        readOnly
                        type="text"
                        style={{ border: "none", background: "transparent" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      保険記号
                    </label>
                  </Col>
                  <Col span={13}>
                    <Form.Item name="GinsuranceSign" label="">
                      <Input.Search
                        type="text"
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "50%",
                              component: (
                                <WS0784005_InsuranceSymbolInquiry
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "GinsuranceSign",
                                      output.Lo_InsurerCardSymbol
                                    );

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

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      条件式
                    </label>
                  </Col>
                  <Col span={4} style={{ paddingRight: "5px" }}>
                    <Form.Item name="ConditionNum" label="">
                      <Input.Search
                        onBlur={() => {
                          this.changeDataFormApi("ConditionNum", "name");
                        }}
                        style={{ textAlign: "right" }}
                        maxLength={4}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "30%",
                              component: (
                                <WS0495001_ConditionExpressInfoInquiry
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "ConditionNum",
                                      output.Lo_ConditionSerialNum
                                    );
                                    this.setFormFieldValue(
                                      "name",
                                      output.Lo_Name
                                    );

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
                  <Col span={14} style={{ paddingLeft: "0" }}>
                    <Form.Item name="name" label="">
                      <Input
                        readOnly
                        type="text"
                        style={{ border: "none", background: "transparent" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      性別
                    </label>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="Ggender" label="">
                      <Select defaultValue={0}>
                        <Select.Option value={0}>全て</Select.Option>
                        <Select.Option value={1}>男</Select.Option>
                        <Select.Option value={2}>女</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      続柄
                    </label>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="RelationshipChar" label="">
                      <Select defaultValue={"9"}>
                        <Select.Option value={"9"}>全て</Select.Option>
                        {RelationshipChar.map((item) => (
                          <Select.Option value={item.node_code_name}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      施設
                    </label>
                  </Col>
                  <Col span={16}>
                    <Form.Item name="GfacilitiesNum" label="">
                      <Select defaultValue={0}>
                        {GfacilitiesNum.map((item) => {
                          return (
                            <Select.Option value={item.facility_type}>
                              {item.facility_name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  {/* <Col span={3} style={{ margin: 0, padding: 0 }}>
                    <Button type="primary"
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 700,
                            component: (
                              <WS0784006_FacilityTypeQuery
                                onFinishScreen={(output) => {
                                  this.setFormFieldValue('GfacilitiesNum', output.Lio_FacilityType)
                                  this.closeModal()
                                }}
                              />),
                          },
                        })
                      }}> 照会(Z) </Button>
                  </Col> */}
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      状態
                    </label>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="GacceptStatus" label="">
                      <Select defaultValue={9}>
                        <Select.Option value={9}>全て</Select.Option>
                        <Select.Option value={0}>予約</Select.Option>
                        <Select.Option value={1}>受付</Select.Option>
                        <Select.Option value={2}>保留</Select.Option>
                        <Select.Option value={3}>待ち</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#14468C",
                      }}
                    >
                      作成日
                    </label>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="FileCreationDateChar" label="">
                      <VenusDatePickerCustom
                        formRefDatePicker={this.formRef}
                        format={"YYYY/MM/DD"}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={20}>
                  {/* <Col span={4} style={{ textAlign: 'right' }}>
                    <label>団体向</label>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="Gl1OrgsDirection"
                      label=""
                    >
                      <Select>
                        <Select.Option value=""></Select.Option> 

                      </Select>
                    </Form.Item>
                  </Col> */}
                  <Col span={20} style={{ textAlign: "right" }}>
                    <Button
                      icon={<SearchOutlined />}
                      onClick={() => {
                        this.Extract_F11();
                      }}
                    >
                      　検　　索
                    </Button>
                  </Col>
                </Row>
              </Form>
              <hr
                style={{ border: "1px solid #F0F0F0", marginBottom: "1.2rem" }}
              />
              <Space style={{ float: "right" }}>
                {/* <Button type="primary"
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 700,
                        component: (
                          <WS0931001_CsvOutputSub
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />),
                      },
                    })
                  }}> 変更 </Button> */}
                <Button
                  type="primary"
                  onClick={() => {
                    this.checkOutputF12();
                  }}
                >
                  {" "}
                  出力{" "}
                </Button>
              </Space>
            </Col>

            <Col xl={18} lg={14} sm={24}>
              <WS2788013_TargetSelectSub
                document={"健診データ出力[CSV]"}
                isSearch={this.state.isSearch}
                screenName={"WS0784001_MedicalExamDataOutputCsv"}
                message={this.state.message}
                onFinishScreen={(output) => {
                  this.setState({ message: output.message });
                }}
              />
            </Col>
          </Row>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0784001_MedicalExamDataOutputCsv);
