import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  Input,
  Select,
  Checkbox,
  Spin,
  Button,
  Row,
  Col,
  Space,
  Table,
  Dropdown,
  DatePicker,
  Modal,
  message,
  Menu,
} from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import ModalDraggable from "components/Commons/ModalDraggable";

import status_input_lock from "assets/img/status_input_lock.png";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx";
import WS2786001_ConditionAddSub from "pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub.jsx";
import WS0735028_DataUpdateConfirm from "pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0735028_DataUpdateConfirm.jsx";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx";
import locale from "antd/es/date-picker/locale/ja_JP";
import WS0456001_SpreadsheetInputSetting from "pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0456001_SpreadsheetInputSetting.jsx";

import SpreadInputService from "services/InputBusiness/SpreadInput/SpreadInputService";
import moment from "moment";
import ItemCheckupsForXml1315003Service from "services/SpecificInsureMaintenance/XmlParamMaintain/WS1315003_ItemCheckupsForXmlService";
import WS0274001_InspectCmtSearchQuery from "./WS0274001_InspectCmtSearchQuery";
import WS0728001_FindingsInputNormal from "./WS0728001_FindingsInputNormal";
import WS0729001_FindingsInputRadiography from "./WS0729001_FindingsInputRadiography";
import WS0730001_FindingsInputPhysiciiagnosis from "./WS0730001_FindingsInputPhysiciiagnosis";
import WS0731001_FindingsInputNormalSelect from "./WS0731001_FindingsInputNormalSelect";
import WS2583001_ConsultInquirySub from "../V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import { download_file } from "helpers/CommonHelpers";

class WS0735001_SpreadInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "スプレッド入力";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataScreen: {},
      objParent: [],
      ReceiptNumF: null,
      ReceiptNumT: null,
      FacilityType: null,
      SheetStyle: null,
      dataSource: [],
      isLoadingTable: false,
      messCallMs: {},
      DateFDate: "",
      dataDisplay: {},
      loadingForm: false,
      messZoomProcessNOTShowMs: {},
      setIdx: "",
      setDisPlay: false,
      setOnBlur: false,
    };
  }

  componentDidMount() {
    this.getScreenData();
  }

  async getScreenData() {
    await SpreadInputService.GetScreenData()
      .then((res) => {
        if (res) {
          this.setState({ dataScreen: res.data });
          this.setState({
            ReceiptNumF: res.data.ReceiptNumF,
            ReceiptNumT: res.data.ReceiptNumT,
            SheetStyle: res.data.SheetStyle,
            FacilityType: res.data.FacilityType,
            DateFDate: res.data.DateFDate,
          });
          if (this.state.setDisPlay) {
            this.displayBtn();
          }
          this.setState({ setDisPlay: false });
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
  async displayBtn() {
    this.setState({ loadingForm: true });
    const data = {
      DateFDate: this.formRef.current
        ?.getFieldValue("DateF")
        .format("YYYY/MM/DD")
        ? this.formRef.current?.getFieldValue("DateF").format("YYYY/MM/DD")
        : "",
      DateTDate: this.formRef.current
        ?.getFieldValue("DateF")
        .format("YYYY/MM/DD")
        ? this.formRef.current?.getFieldValue("DateF").format("YYYY/MM/DD")
        : "",
      ReceiptNumF: this.formRef.current?.getFieldValue("ReceiptNumF"),
      ReceiptNumT: this.formRef.current?.getFieldValue("ReceiptNumT"),
      CourseCodeF: this.formRef.current?.getFieldValue("CourseCodeF")
        ? this.formRef.current?.getFieldValue("CourseCodeF")
        : "",
      CourseCodeT: this.state.dataScreen.CourseCodeT,
      Am_Pm: this.state.dataScreen.Am_Pm ? this.state.dataScreen.Am_Pm : "",
      FacilityType: this.formRef.current.getFieldValue("FacilityType")
        ? this.formRef.current.getFieldValue("FacilityType")
        : this.state.FacilityType[0].LinkedField
        ? this.state.FacilityType[0].LinkedField
        : 0,
      OfficeCode: this.state.dataScreen.OfficeCode
        ? this.state.dataScreen.OfficeCode
        : "",
      BranchStoreCodeF: this.state.dataScreen.BranchStoreCodeF,
      PersonalNum: this.state.dataScreen.PersonalNum,
      KeyNum: this.state.dataScreen.KeyNum,
      DataSourceName: this.state.dataScreen.DataSourceName,
      SheetStyle: this.formRef.current?.getFieldValue("SheetStyle")
        ? this.formRef.current?.getFieldValue("SheetStyle")
        : this.state.SheetStyle[0].LinkedField
        ? this.state.SheetStyle[0].LinkedField
        : 0,
      InspectCode: this.state.dataScreen.InspectCode,
      AllCasesExtractOp: this.formRef.current?.getFieldValue(
        "AllCasesExtractOp"
      )
        ? 1
        : 0,
      InspectHasOnlyOp: this.formRef.current?.getFieldValue("InspectHasOnlyOp")
        ? 1
        : 0,
      InputProtectionNumOp: this.state.dataScreen.InputProtectionNumOp,
      InputProtectionImagePath: this.state.dataScreen.InputProtectionImagePath
        ? this.state.dataScreen.InputProtectionImagePath
        : "",
      SideScrollingYes: this.state.dataScreen.SideScrollingYes ? 1 : 0,
      ChangeAfterFont: this.state.dataScreen.ChangeAfterFont,
      InvalidColor: this.state.dataScreen.InvalidColor,
    };
    await SpreadInputService.Display(data)
      .then((res) => {
        if (res) {
          if (res.data.message === "変更内容を破棄しますか") {
            Modal.confirm({
              content: "変更内容を破棄しますか",
              okText: "いいえ",
              cancelText: "は　い",
              width: 260,
              onOk: () => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "15%",
                    component: (
                      <WS0735028_DataUpdateConfirm
                        SheetStyle={
                          this.formRef.current?.getFieldValue("SheetStyle")
                            ? this.formRef.current?.getFieldValue("SheetStyle")
                            : this.state.dataScreen?.SheetStyle[0].LinkedField
                        }
                        onFinishScreen={(output) => {
                          if (output.Lo_Confirm === false) {
                            this.getScreenData();
                            // this.getListData()
                            this.setState({ setDisPlay: true, dataSource: [] });
                          }
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              },
              onCancel: () => {
                this.setState({ setDisPlay: true, dataSource: [] });
                this.getScreenData();
                
                // const data = {
                //   SheetStyle: this.formRef.current?.getFieldValue("SheetStyle")
                //     ? this.formRef.current?.getFieldValue("SheetStyle")
                //     : this.state.dataScreen?.SheetStyle[0].LinkedField,
                // };
                // SpreadInputService.dataUpdateConfirmService(data)
                //   .then((res) => {
                //     if (res) {
                //       message.success("成功");
                //       this.getScreenData();
                //       // this.getListData()
                //       this.setState({ setDisPlay: true });
                //     }
                //   })
                //   .catch((err) => message.error("エラー"));
              },
            });
          } else {
            this.setState({ dataDisplay: res.data,  dataSource: [] });
            this.getListData();
          }
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ loadingForm: false });
      });
  }
  async getListData() {
    this.setState({ isLoadingTable: true });
    const data = {
      ChangeAfterFont: this.state.dataScreen.ChangeAfterFont,
      InspectUnregisteredColor: this.state.dataDisplay.InspectUnregisteredColor,
      Li_FindingsDedicated: this.state.dataDisplay.Li_FindingsDedicated,
      Li_InspectItemList: this.state.dataDisplay.Li_InspectItemList,
      Li_InspectShortNameList: this.state.dataDisplay.Li_InspectShortNameList,
      Li_InspectTypeList: this.state.dataDisplay.Li_InspectTypeList,
      Li_AutomaticCalculateList:
        this.state.dataDisplay.Li_AutomaticCalculateList,
    };
    await SpreadInputService.listData(data)
      .then((res) => {
        if (res) {
          this.setState({ dataSource: res.data ? res.data : [], objParent: res.data ? res.data : [] });
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false }));
  }
  handerChange(e, name, index, idx) {
    const tempObjParent = { ...this.state.objParent };
    tempObjParent[index].Column_Result[idx][name] = e;
    this.setState({ objParent: tempObjParent, setOnBlur: true });
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  ZoomProcess(record, idx, value, index) {
    const valueInspectIdx = `W1_inspect_val_${idx + 1}`;
    const data = {
      Li_CourseLevel: record.W1_course_level,
      Li_ReserveNum: record.W1_reserve_num,
      Li_InspectCode: this.state.dataDisplay.Li_InspectItemList,
      W1_no: idx + 1,
      // Lo_InspectValue: record.Column_Result[idx][valueInspectIdx],
      Li_FindingsDedicated:
        this.state.dataDisplay.Li_FindingsDedicated === null ? 0 : 1,
      FindingsLastTimeInitialDisplay:
        this.state.dataScreen.FindingsLastTimeInitialDisplay === true ? 1 : 0,
      LeadershipMattersHowToAdd:
        this.state.dataScreen.LeadershipMattersHowToAdd,
      flg_727: 0,
    };
    SpreadInputService.zoomProcess(data)
      .then((res) => {
        if (res) {
          this.CallMs(res.data, data, record, idx, index, valueInspectIdx);
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
  reZoomProcess(
    dataReCall,
    flag,
    record,
    idx,
    index,
    valueInspectIdx,
    data274,
    LnkOutInspectCmtScreen
  ) {
    if (data274.message === "Call Screen WS0274001") {
      const valueExpIdx = `Expression_491`;
      const data = {
        Li_CourseLevel: dataReCall.Li_CourseLevel,
        Li_ReserveNum: dataReCall.Li_ReserveNum,
        Li_InspectCode: dataReCall.Li_InspectCode,
        W1_no: dataReCall.W1_no,
        Lo_InspectValue: LnkOutInspectCmtScreen,
        Li_FindingsDedicated: dataReCall.Li_FindingsDedicated,
        FindingsLastTimeInitialDisplay:
          dataReCall.FindingsLastTimeInitialDisplay,
        LeadershipMattersHowToAdd: dataReCall.LeadershipMattersHowToAdd,
        flg_727: flag,
      };
      SpreadInputService.zoomProcess(data)
        .then((res) => {
          const tempObjParent = { ...this.state.objParent };
          tempObjParent[index].Column_Result[idx][valueInspectIdx] =
            res.data.Lo_InspectValue;

          tempObjParent[index].Column_Result[idx][valueExpIdx] =
            res.data.Expression_491;
          if (res.data.Expression_491 === 35) {
            tempObjParent[index].Expression_491 = res.data.Expression_491;
          }

          this.setState({ objParent: tempObjParent });
        })
        .catch((err) => {
          const res = err.response;
          if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
          message.error(res.data.message);
        });
      // .finally(() => this.setState({ isLoadingTable: false }));
    } else {
      const valueExpIdx = `Expression_491`;
      const data = {
        Li_CourseLevel: dataReCall.Li_CourseLevel,
        Li_ReserveNum: dataReCall.Li_ReserveNum,
        Li_InspectCode: dataReCall.Li_InspectCode,
        W1_no: dataReCall.W1_no,
        Lo_InspectValue: dataReCall.Lo_InspectValue,
        Li_FindingsDedicated: dataReCall.Li_FindingsDedicated,
        FindingsLastTimeInitialDisplay:
          dataReCall.FindingsLastTimeInitialDisplay,
        LeadershipMattersHowToAdd: dataReCall.LeadershipMattersHowToAdd,
        flg_727: flag,
      };
      SpreadInputService.zoomProcess(data)
        .then((res) => {
          const tempObjParent = { ...this.state.objParent };
          tempObjParent[index].Column_Result[idx][valueInspectIdx] =
            res.data.Lo_InspectValue;
          this.setState({ objParent: tempObjParent });

          tempObjParent[index].Column_Result[idx][valueExpIdx] =
            res.data.Expression_491;
          if (res.data.Expression_491 === 35) {
            tempObjParent[index].Expression_491 = res.data.Expression_491;
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
      // .finally(() => this.setState({ isLoadingTable: false }));
    }
    this.setState({ setOnBlur: false });
  }
  CallMs(data, dataReCall, record, idx, index, valueInspectIdx) {
    switch (data.message) {
      case "Call Screen WS0274001":
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "50%",
            component: (
              <WS0274001_InspectCmtSearchQuery
                Lio_CmtClassify={data.Lio_CmtClassify}
                LnkOutInspectCmtScreen={data.LnkOutInspectCmtScreen}
                onFinishScreen={(output) => {
                  this.reZoomProcess(
                    dataReCall,
                    output.flg_724,
                    record,
                    idx,
                    index,
                    valueInspectIdx,
                    data,
                    output.LnkOutInspectCmtScreen
                  );
                  this.closeModal();
                }}
              />
            ),
          },
        });
        break;
      case "Call Screen WS0728001":
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "50%",
            component: (
              <WS0728001_FindingsInputNormal
                Li_CourseLevel={data.Li_CourseLevel}
                Li_ReserveNum={data.Li_ReserveNum}
                Li_InspectCode={data.Li_InspectCode}
                Li_PatternCode={data.Li_PatternCode}
                Li_CategoryCode={data.Li_CategoryCode}
                Li_PersonalNum={data.Li_PersonalNum}
                Li_JudgeLevel={data.Li_JudgeLevel}
                Li_LastTimeInitialDisplay={data.Li_LastTimeInitialDisplay}
                Li_LeadershipMattersHowToAdd={data.Li_LeadershipMattersHowToAdd}
                Li_FindingsInputNumRows={data.Li_FindingsInputNumRows}
                Li_FindingsInputNumDigits={data.Li_FindingsInputNumDigits}
                Li_SerialNumAdded={data.Li_SerialNumAdded}
                onFinishScreen={(output) => {
                  this.reZoomProcess(
                    dataReCall,
                    output.flg_728,
                    record,
                    idx,
                    index,
                    valueInspectIdx,
                    data
                  );
                  this.closeModal();
                }}
              />
            ),
          },
        });
        break;
      case "Call Screen WS0729001":
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "77%",
            component: (
              <WS0729001_FindingsInputRadiography
                Li_PatternCode={data.Li_PatternCode}
                Li_CategoryCode={data.Li_CategoryCode}
                Li_InspectCode={data.Li_InspectCode}
                Li_CourseLevel={data.Li_CourseLevel}
                Li_ReserveNum={data.Li_ReserveNum}
                Li_JudgeLevel={data.Li_JudgeLevel}
                Li_FindingsInputNumRows={data.Li_FindingsInputNumRows}
                Li_FindingsInputNumDigits={data.Li_FindingsInputNumDigits}
                onFinishScreen={(output) => {
                  this.reZoomProcess(
                    dataReCall,
                    output.flg_729,
                    record,
                    idx,
                    index,
                    valueInspectIdx,
                    data
                  );
                  this.closeModal();
                }}
              />
            ),
          },
        });
        break;
      case "Call Screen WS0730001":
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "50%",
            component: (
              <WS0730001_FindingsInputPhysiciiagnosis
                Li_ReserveNum={data.Li_ReserveNum}
                Li_InspectCode={data.Li_InspectCode}
                Li_CategoryCode={data.Li_CategoryCode}
                Li_PersonalNum={data.Li_PersonalNum}
                onFinishScreen={(output) => {
                  this.reZoomProcess(
                    dataReCall,
                    output.flg_730,
                    record,
                    idx,
                    index,
                    valueInspectIdx,
                    data
                  );
                  this.closeModal();
                }}
              />
            ),
          },
        });
        break;
      default:
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "77%",
            component: (
              <WS0731001_FindingsInputNormalSelect
                Li_PatternCode={data.Li_PatternCode}
                Li_CategoryCode={data.Li_CategoryCode}
                Li_InspectCode={data.Li_InspectCode}
                Li_CourseLevel={data.Li_CourseLevel}
                Li_ReserveNum={data.Li_ReserveNum}
                Li_JudgeLevel={data.Li_JudgeLevel}
                Li_PersonalNum={data.Li_PersonalNum}
                onFinishScreen={(output) => {
                  this.reZoomProcess(
                    dataReCall,
                    output.flg_731,
                    record,
                    idx,
                    index,
                    valueInspectIdx,
                    data
                  );
                  this.closeModal();
                }}
              />
            ),
          },
        });
    }
  }
  openExcel(record) {
    const data = {
      Li_InspectShortNameList: this.state.dataSource.Li_InspectShortNameList,
    };
    SpreadInputService.download(data)
      .then((res) => {
        download_file(res);
      })
      .catch();
  }
  async reZoomProcessNOTShowMs(record, idx, value, index) {
    this.setState({ setIdx: idx });
    const valueInspectIdx = `W1_inspect_val_${idx + 1}`;
    const valueExpIdx = `Expression_491`;
    const data = {
      Li_CourseLevel: record.W1_course_level,
      Li_ReserveNum: record.W1_reserve_num,
      Li_InspectCode: this.state.dataDisplay.Li_InspectItemList,
      W1_no: idx + 1,
      Lo_InspectValue: record.Column_Result[idx][valueInspectIdx],
      Li_FindingsDedicated:
        this.state.dataDisplay.Li_FindingsDedicated === null ? 0 : 1,
      FindingsLastTimeInitialDisplay:
        this.state.dataScreen.FindingsLastTimeInitialDisplay === true ? 1 : 0,
      LeadershipMattersHowToAdd:
        this.state.dataScreen.LeadershipMattersHowToAdd,
      flg_727: 1,
    };
    await SpreadInputService.zoomProcess(data)
      .then((res) => {
        const tempObjParent = { ...this.state.objParent };
        tempObjParent[index].Column_Result[idx][valueInspectIdx] =
          res.data.Lo_InspectValue;
        tempObjParent[index].Column_Result[idx][valueExpIdx] =
          res.data.Expression_491;
        if (res.data.Expression_491 === 35) {
          tempObjParent[index].Expression_491 = res.data.Expression_491;
        }
        this.setState({ objParent: tempObjParent });
        // this.getListData();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        // message.error(res.data.message);
      });
    // .finally(() => this.setState({ isLoadingTable: false }));
    this.setState({ setOnBlur: false });
  }

  render() {
    const SheetStyle = this.state.SheetStyle;
    const FacilityType = this.state.FacilityType;
    const dataScreen = this.state.dataScreen;
    return (
      <div className="spread-input">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            DateF: "",
            ReceiptNumF: this.state.ReceiptNumF,
            ReceiptNumT: this.state.ReceiptNumT,
          }}
        >
          <Spin spinning={this.state.loadingForm}>
            <Card
              title="スプレッド入力"
              className="mb-2"
              extra={
                <div>
                  <Button
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "100%",
                          component: (
                            <WS0456001_SpreadsheetInputSetting
                              onFinishScreen={(output) => {
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
                      });
                    }}
                    size="large"
                    style={{ padding: "10px 20px", height: "unset" }}
                  >
                    スプレッド設定
                  </Button>
                  <Button
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "15%",
                          component: (
                            <WS0735028_DataUpdateConfirm
                              SheetStyle={
                                this.formRef.current?.getFieldValue(
                                  "SheetStyle"
                                )
                                  ? this.formRef.current?.getFieldValue(
                                      "SheetStyle"
                                    )
                                  : this.state.dataScreen?.SheetStyle[0]
                                      .LinkedField
                              }
                              onFinishScreen={(output) => {
                                if (output.Lo_Confirm === false) {
                                  this.displayBtn();
                                }
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                    size="large"
                    style={{
                      padding: "10px 20px",
                      height: "unset",
                      marginLeft: "10px",
                    }}
                  >
                    更新
                  </Button>
                </div>
              }
            >
              <Row>
                <Col span={4}>
                  <Form.Item
                    name="DateF"
                    label="&nbsp;受診日"
                    style={{ width: "60%" }}
                  >
                    <VenusDatePickerCustom
                      formRefDatePicker={this.formRef}
                      locale={locale}
                      format={"YYYY/MM/DD"}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Space>
                    <Form.Item name="ReceiptNumF" label="受付No">
                      <Input style={{ textAlign: "right" }} />
                    </Form.Item>
                    <div style={{ marginBottom: "1em" }}>~</div>
                    <Form.Item name="ReceiptNumT">
                      <Input style={{ textAlign: "right" }} />
                    </Form.Item>
                  </Space>
                  <Form.Item name="FacilityType" label="&emsp;&nbsp;施設">
                    <Select defaultValue={0}>
                      {FacilityType &&
                        FacilityType.map((item) => (
                          <Select.Option
                            key={item.LinkedField}
                            value={item.LinkedField}
                          >
                            {item.DisplayField}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item  name="CourseCodeF" label="&nbsp;コース">
                    <Input.Search
                      style={{ width: "35%" }}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "100%",
                            component: (
                              <WS0265001_BasicCourseInquiry
                                Lo_CourseCode={this.formRef.current.getFieldValue(
                                  "CourseCodeF"
                                )}
                                Lo_CourseName={""}
                                onFinishScreen={(output) => {
                                  if (output.recordData) {
                                    this.formRef.current.setFieldsValue({
                                      CourseCodeF: output.recordData.course_code
                                        ? output.recordData.course_code
                                        : "",
                                    });
                                  }
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
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col
                  span={1}
                  style={{ borderRight: "1px solid rgba(0, 0, 0, 0.06)" }}
                ></Col>
                <Col span={4} offset={1}>
                  <Form.Item name="SheetStyle" label="&emsp;伝票">
                    <Select defaultValue="協会一括設定">
                      {this.state.SheetStyle &&
                        this.state.SheetStyle.map((item) => (
                          <Select.Option
                            key={item.LinkedField}
                            value={item.LinkedField}
                          >
                            {item.DisplayField}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="AllCasesExtractOp"
                    label="&emsp;全件"
                    valuePropName="checked"
                  >
                    <Checkbox></Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="InspectHasOnlyOp"
                    label="検査有"
                    valuePropName="checked"
                  >
                    <Checkbox></Checkbox>
                  </Form.Item>
                  <Space style={{ float: "right" }}>
                    <Button
                      icon={
                        <PlusCircleOutlined
                          style={{ fontSize: "18px", color: "#08c" }}
                        />
                      }
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "50%",
                            component: (
                              <WS2786001_ConditionAddSub
                                Li_DateF={dataScreen.DateFDate}
                                Li_DateT={dataScreen.DateTDate}
                                Li_AcceptNoF={this.formRef.current?.getFieldValue(
                                  "ReceiptNumF"
                                )}
                                Li_AcceptNoT={this.formRef.current.getFieldValue(
                                  "ReceiptNumT"
                                )}
                                Li_CourseF={this.formRef.current.getFieldValue(
                                  "CourseCodeF"
                                )}
                                Li_CourseT={dataScreen.CourseCodeT}
                                Li_TimeDivision={dataScreen.AM_PM}
                                Li_FacilityType={this.formRef.current.getFieldValue(
                                  "FacilityType"
                                )}
                                Li_State={1}
                                Li_Insurer=""
                                Li_Office={dataScreen.OfficeCode}
                                Li_BranchShop={dataScreen.BranchStoreCodeF}
                                Li_PersonalNum={dataScreen.PersonalNum}
                                onFinishScreen={(output) => {
                                  if (output.recordData) {
                                    this.setState({ isAddBtn: true });
                                    this.formRef.current.setFieldsValue({
                                      DateTChar: output.recordData.DateFChar,
                                      CourseCodeF: output.recordData.CourseCodeF
                                        ? output.recordData.CourseCodeF
                                        : "",
                                      CourseCodeT: output.recordData.CourseCodeT
                                        ? output.recordData.CourseCodeT
                                        : "",
                                      ReceiptNumF: output.recordData.ReceiptNumF
                                        ? output.recordData.ReceiptNumF
                                        : "",
                                      ReceiptNumT: output.recordData.ReceiptNumT
                                        ? output.recordData.ReceiptNumT
                                        : "",
                                      OfficeCode: output.recordData.OfficeCode
                                        ? output.recordData.OfficeCode
                                        : "",
                                      FacilityType: output.recordData
                                        .FacilityType
                                        ? output.recordData.FacilityType
                                        : "",
                                      Am_Pm: output.recordData.TimeDivision
                                        ? output.recordData.TimeDivision
                                        : "",
                                    });
                                  } else {
                                    this.setState({ isAddBtn: false });
                                  }
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
                        });
                      }}
                    >
                      条件追加
                    </Button>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button
                        onClick={() => {
                          this.displayBtn();
                        }}
                        icon={
                          <SearchOutlined
                            style={{ fontSize: "18px", color: "#08c" }}
                          />
                        }
                        htmlType="submit"
                      >
                        検　　索
                      </Button>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Spin>
          <Table
            dataSource={this.state.dataSource}
            bordered={true}
            size="small"
            // scroll={{ x: 8000, y: 1000 }}
            loading={this.state.isLoadingTable}
            rowKey={(record) => {
              return record.id;
            }}
            pagination={false}
          >
            <Table.Column
              title={<img src={status_input_lock} />}
              render={(W1_input_protection_state) => {
                return W1_input_protection_state == 1 ? (
                  <img src={status_input_lock} />
                ) : (
                  ""
                );
              }}
            />
            <Table.Column
              title="受付No"
              dataIndex="W1_receipt_no"
              align="right"
              render={(value, record, index) => (
                <Form.Item>
                  <span
                    style={{
                      fontWeight:
                        record?.Expression_491 === 33 ? "400" : "bold",
                    }}
                  >
                    {record.W1_receipt_no}
                  </span>
                </Form.Item>
              )}
            />
            <Table.Column
              title="個人番号"
              dataIndex="W1_person_num"
              align="right"
            />
            <Table.Column
              title="漢字氏名"
              dataIndex="W1_kanji_name"
              render={(value, record, index) => (
                <Form.Item>
                  <span
                    style={{
                      fontWeight:
                        record?.Expression_491 === 33 ? "400" : "bold",
                    }}
                  >
                    {record.W1_kanji_name}
                  </span>
                </Form.Item>
              )}
            />
            <Table.Column
              title="受診日"
              dataIndex="W1_consult_date"
              render={(value, record, index) => (
                <Form.Item>
                  <span>
                    {moment(record.W1_consult_date).format("YYYY/MM/DD")}
                  </span>
                </Form.Item>
              )}
            />
            <Table.Column
              title="コース"
              dataIndex="W1_course"
              render={(value, record, index) => (
                <Form.Item style={{ textAlign: "left" }}>
                  <span>{record.W1_course}</span>
                </Form.Item>
              )}
            />
            {this.state.dataDisplay?.Li_InspectShortNameList?.map(
              (title, idx) => {
                return (
                  <>
                    <Table.Column
                      title={title}
                      render={(value, record, index) => (
                        <Form.Item style={{ marginBottom: "0" }}>
                          <Input
                            readOnly={
                              !record?.Column_Result[idx][
                                "Expression_5" + (idx + 1)
                              ]
                            }
                            style={{
                              cursor:
                                record?.Column_Result[idx][
                                  "Expression_5" + (idx + 1)
                                ] === false
                                  ? "default"
                                  : "auto",
                              fontWeight:
                                record?.Column_Result[idx]["Expression_491"] ===
                                33
                                  ? "400"
                                  : "bold",
                                  textAlign: 'right'
                            }}
                            disabled={
                              record?.Column_Result[idx][
                                "W1_inspect_val_" + (idx + 1)
                              ] === "    --    "
                            }
                            onDoubleClick={() => {
                              this.ZoomProcess(record, idx, value, index);
                            }}
                            onChange={(e) => {
                              this.handerChange(
                                e.target.value,
                                "W1_inspect_val_" + (idx + 1),
                                index,
                                idx
                              );
                            }}
                            value={
                              record?.Column_Result[idx][
                                "W1_inspect_val_" + (idx + 1)
                              ]
                            }
                            name=""
                            type="text"
                            onBlur={(e) => {
                              // if (this.state.setOnBlur)
                                this.reZoomProcessNOTShowMs(
                                  record,
                                  idx,
                                  value,
                                  index
                                );
                            }}
                          />
                        </Form.Item>
                      )}
                    />
                  </>
                );
              }
            )}

            <Table.Column
              title=""
              dataIndex=""
              key=""
              render={(value, record) => {
                return (
                  <Dropdown
                    trigger="click"
                    size="small"
                    overlay={() => (
                      <Menu>
                        <Menu.Item></Menu.Item>
                        <Menu.Item onClick={() => this.openExcel(record)}>
                          EXCEL
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "100%",
                                component: (
                                  <WS2583001_ConsultInquirySub
                                    Li_ReserveNum={record.W1_reserve_num}
                                    onFinishScreen={(output) => {
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        >
                          照会
                        </Menu.Item>
                      </Menu>
                    )}
                  >
                    <Button icon={<MoreOutlined />}></Button>
                  </Dropdown>
                );
              }}
            />
          </Table>
        </Form>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0735001_SpreadInput);
