/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import "./WS0743001_NotInputCheckCategory.scss";
import Color from "constants/Color";
import {
  Card,
  Form,
  Input,
  Radio,
  Button,
  Table,
  Modal,
  Row,
  Col,
  Tooltip,
  Space,
  Menu,
  Dropdown,
  message,
  Spin,
} from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  DoubleRightOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  LeftOutlined,
  MoreOutlined,
  CaretUpOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import WS0745001_NotInputCheckMaintain from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0745001_NotInputCheckMaintain.jsx";
import WS2786001_ConditionAddSub from "pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub.jsx";
import WS0743010_TypeQuery from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0743010_TypeQuery.jsx";
import WS2537001_PersonalReserveProcess from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess.jsx";
import WS0802001_PrintInstruction from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0802001_PrintInstruction.jsx";
import WS2637001_OverallResultDisplayInput from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637001_OverallResultDisplayInput.jsx";
import WS2576004_CalendarSunSub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2576004_CalendarSunSub.jsx";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx";
import WS0739001_InputVoteResultInputInspectInput from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0739001_InputVoteResultInputInspectInput.jsx";
import moment from "moment";
import status_input_lock from "assets/img/status_input_lock.png";
import NotInputCheckCategorytAction from "redux/InputBusiness/NotInputCheckCategory/NotInputCheckCategory.action";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub.jsx";
import WS3020036_CoupledPrintInstruction from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS3020036_CoupledPrintInstruction.jsx";
import WS0739012_DataUpdateConfirm from "./WS0739012_DataUpdateConfirm";
import GetImage from "constants/Images";
import ModalDraggable from "components/Commons/ModalDraggable";
import { download_file } from "helpers/CommonHelpers";
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";

class WS0743001_NotInputCheckCategory extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "未入力チェック[カテゴリ]";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: "",
      },
      dataSource: [],
      isLoading: false,
      disabled: true,

      rowSelected: {},
      selectedRowKeys: [],
      tableIndex: 0,
      updateDataInspectInput: false,
      afterUpdateDataInspectInput: false,
      paramsUpdateInspectInput: {},

      isLoadingPage: false,

      Expression_36: 163,
    };
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: "",
      },
    });
  }

  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  componentDidMount() {
    this.getScreenData();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }
  getScreenData() {
    NotInputCheckCategorytAction.getScreenData().then((res) => {
      this.setFormFieldValue("Type", res && res.Type ? res.Type : "");
      this.setFormFieldValue("remarks", res && res.remarks ? res.remarks : "");
    });
  }
  WS2583001_ConsultInquirySub(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1200,
        component: (
          <WS2583001_ConsultInquirySub
            Li_ReserveNum={record.W1_reserve_num}
            onFinishScreen={() => {
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
  }
  WS3020036_CoupledPrintInstruction(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS3020036_CoupledPrintInstruction
            Li_CourseLevel={record.W1_course_level}
            Li_ReserveNum={record.W1_reserve_num}
            Li_Parameters={record.W1_parameters}
            onFinishScreen={() => {
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
  }
  WS2637001_OverallResultDisplayInput(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1700,
        component: (
          <WS2637001_OverallResultDisplayInput
            Li_CourseLevel={record.W1_course_level}
            Li_ReserveNum={record.W1_reserve_num}
            onClickedCreate={() => {
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
  }

  onFinish(values) {}
  excelReport(record) {
    NotInputCheckCategorytAction.exportExcel({ record })
      .then((res) => {
        download_file(res);
      })
      .catch();
  }
  onStatusList() {
    const formValues = this.formRef.current.getFieldValue();
    const params = {
      State: formValues && formValues.State ? formValues.State : 0,
      Type: formValues && formValues.Type ? formValues.Type : 0,
      DateFDate:
        formValues && formValues.DateF
          ? formValues.DateF.format("YYYY-MM-DD")
          : "",
    };
    this.setState({ isLoading: true });
    NotInputCheckCategorytAction.StatusList(params)
      .then((res) => {
        if (res) {
          const dataRes = res ? res : [];
          const data = dataRes;
          this.setState({
            dataSource: data,
            rowSelected: data.length > 0 ? data[0] : {},
            selectedRowKeys: data.length > 0 ? [data[0].id] : [],
            indexTable: 0,
            disabled: dataRes.length > 0 ? false : true,
          });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }));
  }
  checkShowSrceenF10() {
    const params = {
      W1_reserve_num: this.state.rowSelected?.W1_reserve_num,
      W1_course_level: this.state.rowSelected?.W1_course_level,
    };
    NotInputCheckCategorytAction.f10(params).then((res) => {
      const record = res && res.variables;
      if (res) {
        this.F10(res, record);
      }
    });
  }
  F10(res, record) {
    if (res && res.message === "Call Screen WS3020036") {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 600,
          component: (
            <WS3020036_CoupledPrintInstruction
              Li_CourseLevel={record.Li_CourseLevel}
              Li_ReserveNum={record.Li_ReserveNum}
              Li_Parameters={record.Li_Parameters}
              onFinishScreen={() => {
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
    } else {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 600,
          component: (
            <WS0802001_PrintInstruction
              Li_CourseLevel={record.Li_CourseLevel}
              Li_ReserveNum={record.Li_ReserveNum}
              onFinishScreen={() => {
                this.closeModal();
              }}
            />
          ),
        },
      });
    }
  }
  showWS0802001_PrintInstruction() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS0802001_PrintInstruction
            Li_ReserveNum={this.state.rowSelected?.W1_reserve_num}
            Li_CourseLevel={this.state.rowSelected?.W1_course_level}
            onFinishScreen={() => {
              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  detailF7() {
    let params = {
      W1_consult_date: this.state.rowSelected?.W1_consult_date,
      W1_reserve_num: this.state.rowSelected?.W1_reserve_num,
      W1_course_level: this.state.rowSelected?.W1_course_level,
      personal_number_id: this.state.rowSelected?.personal_number_id,
      StsPersonalInfoBasic: this.state.rowSelected?.StsPersonalInfoBasic,
    };

    this.setState({ isLoadingPage: true });
    NotInputCheckCategorytAction.detailF7(params)
      .then((res) => {
        if (res?.data?.isData) {
          this.showModalInputVoteResultInputInspectInput(res?.data);
        } else {
          Modal.info({
            title: "未入力の検査情報がありません",
          });
        }
        this.setState({ isLoadingPage: false });
      })
      .catch((err) => {
        this.setState({ isLoadingPage: false });
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  showModalInputVoteResultInputInspectInput(data) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component: (
          <WS0739001_InputVoteResultInputInspectInput
            Li_CourseLevelThisTime={data.Li_CourseLevelThisTime}
            Li_ReserveNumThisTime={data.Li_ReserveNumThisTime}
            Li_CourseLevelPrevious={data.Li_CourseLevelPrevious}
            Li_ReserveNumPrevious={data.Li_ReserveNumPrevious}
            Li_PublicName={data.Li_PublicName}
            Li_GuidanceInstructionsAdd={data.Li_GuideInstructionsAdd}
            Li_InputProtectionIn={data.Li_InputProtectionIn}
            Li_InputProtectionImage={data.Li_InputProtectionImage}
            Li_EscInvalid={data.Li_EscInvalid}
            onUpdateValue={(output) => {
              this.setState({
                updateDataInspectInput: output.Lo_Update,
                paramsUpdateInspectInput: output.paramsUpdate,
                afterUpdateDataInspectInput: output.Lo_After_Update,
              });
            }}
            onFinishScreen={() => {
              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  updateDataInspectInput() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 280,
        component: (
          <WS0739012_DataUpdateConfirm
            Li_Division={this.state.paramsUpdateInspectInput.Li_Division}
            Li_CourseLevel={this.state.paramsUpdateInspectInput.Li_CourseLevel}
            Li_ReserveNum={this.state.paramsUpdateInspectInput.Li_ReserveNum}
            Li_TotalJudge={""}
            Lo_GuideMatters={""}
            onFinishScreen={(output) => {
              if (output.Lo_Update) {
                this.detailF7After();
              }
              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  detailF7After() {
    let params = {
      W1_reserve_num: this.state.rowSelected?.W1_reserve_num,
      W1_course_level: this.state.rowSelected?.W1_course_level,
      Li_CategoryCodeList: this.state.rowSelected?.Li_CategoryCodeList,
      Li_Format: this.formRef.current?.getFieldValue("Type"),
      Li_State: this.formRef.current?.getFieldValue("State"),
      W1_key_info: this.state.rowSelected?.W1_key_info,
      Li_ColorList: this.state.rowSelected?.ColorList,
      W1_input_protection_state:
        this.state.rowSelected?.W1_input_protection_state,
      FixedPattern: this.state.rowSelected?.FixedPattern,
      StsSeparateJudgeCheck: this.state.rowSelected?.StsSeparateJudgeCheck,
    };

    this.setState({ isLoading: true });
    NotInputCheckCategorytAction.detailF7After(params)
      .then((res) => {
        this.onStatusList();
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  render() {
    const titleString = (params) =>
      this.state && this.state.dataSource && this.state.dataSource[0]
        ? this.state.dataSource[0][params]
        : "";
    const format = "YYYY/MM/DD";
    const { disabled } = this.state;
    return (
      <div className="not-input-check-category p-td">
        <Card title="未入力チェック[カテゴリ]">
          <Spin spinning={this.state.isLoadingPage}>
            <Space>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 1400,
                      component: (
                        <WS0745001_NotInputCheckMaintain
                          onFinishScreen={() => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                種別保守
              </Button>
              <Button
                disabled={disabled}
                onClick={() => {
                  this.detailF7();
                }}
              >
                詳細
              </Button>
              <Button
                disabled={disabled}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 1700,
                      component: (
                        <WS2637001_OverallResultDisplayInput
                          Li_ReserveNum={this.state.rowSelected?.W1_reserve_num}
                          Li_CourseLevel={
                            this.state.rowSelected?.W1_course_level
                          }
                          onFinishScreen={() => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                総合結果
              </Button>
              <Button
                disabled={disabled}
                onClick={() => {
                  this.checkShowSrceenF10();
                }}
              >
                結果印刷
              </Button>
              <Button
                disabled={disabled}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "90%",
                      className: "custom-button-close",
                      component: (
                        <WS2537001_PersonalReserveProcess
                          Li_ReserveNum={this.state.rowSelected?.W1_reserve_num}
                          Li_CourseLevel={
                            this.state.rowSelected?.W1_course_level
                          }
                          Li_Child={true}
                          onFinishScreen={() => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                検査変動
              </Button>
            </Space>
            <hr style={{ margin: "15px 0" }} />
            <Card title="">
              <Form
                ref={this.formRef}
                onFinish={this.onFinish}
                initialValues={{ ...this.state.srceenData }}
              >
                <Form.Item name="DateF" label="日付">
                  <VenusDatePickerCustom
                    formRefDatePicker={this.formRef}
                    initialValues={moment("2021/03/03", format)}
                    format={format}
                  />
                </Form.Item>
                <Row gutter={24}>
                  <Col span={6}>
                    <Row gutter={24}>
                      <Col span={10}>
                        <Form.Item name="Type" label="種別">
                          <Input.Search
                            onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 400,
                                  component: (
                                    <WS0743010_TypeQuery
                                      onFinishScreen={(output) => {
                                        this.setFormFieldValue(
                                          "Type",
                                          output.Lo_Type
                                        );
                                        this.setFormFieldValue(
                                          "remarks",
                                          output.Lo_Remark
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
                        <Form.Item name="remarks">
                          <Input
                            readOnly
                            style={{
                              background: "transparent",
                              border: "none",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={10}>
                    <Space size={"small"}>
                      <Form.Item name="State">
                        <Radio.Group defaultValue={0}>
                          <Radio value={0}>検査</Radio>
                          <Radio value={1}>判定</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          icon={<PlusCircleOutlined />}
                          style={{ color: Color(this.state.Expression_36).Foreground }}
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 800,
                                component: (
                                  <WS2786001_ConditionAddSub
                                    Li_DateF={this.formRef.current?.getFieldValue("DateF")}
                                    Li_DateT={this.formRef.current?.getFieldValue("DateF")}
                                    Li_State="1"
                                    Lio_KeyInfo={this.formRef.current?.getFieldValue("KeyNum")}
                                    onFinishScreen={(output) => {
                                      this.setState({
                                        Expression_36: output.Expression_36
                                      })
                                      this.formRef.current?.setFieldsValue({
                                        KeyNum: output.Lio_KeyInfo
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        >
                          {" "}
                          条件追加
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          icon={<SearchOutlined />}
                          style={{ color: Color(163).Foreground }}
                          onClick={() => {
                            this.onStatusList();
                          }}
                        >
                          検　　索
                        </Button>
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              </Form>

              <Table
                className="WS0743001_NotInputCheckCategory"
                dataSource={this.state.dataSource}
                loading={this.state.isLoading}
                pagination={false}
                rowClassName={(record, index) =>
                  record.id === this.state.rowSelected.id
                    ? "table-row-light"
                    : ""
                }
                bordered={true}
                size="small"
                rowKey={(record) => record.id}
                scroll={{ x: 1500, y: 600 }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: async () => {
                      await this.setState({
                        rowSelected: record,
                        selectedRowKeys: [record.id],
                        tableIndex: rowIndex,
                      });
                    },
                    onDoubleClick: () => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1700,
                          component: (
                            <WS2637001_OverallResultDisplayInput
                              Li_ReserveNum={
                                this.state.rowSelected?.W1_reserve_num
                              }
                              Li_CourseLevel={
                                this.state.rowSelected?.W1_course_level
                              }
                              onFinishScreen={() => {
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    },
                  };
                }}
              >
                <Table.Column
                  title={<img src={status_input_lock}></img>}
                  dataIndex=""
                  width="40px"
                  render={(item, record) => {
                    return (
                      <img
                        style={{ textAlign: "center" }}
                        src={GetImage(record.Expression_134)}
                      ></img>
                    );
                  }}
                />
                <Table.Column
                  title="受診日"
                  dataIndex="W1_consult_date"
                  width="90px"
                  render={(value, record) => {
                    return (
                      <span format={format} style={{ cursor: "pointer" }}>
                        {moment(record.W1_consult_date).format("YYYY/MM/DD")}
                      </span>
                    );
                  }}
                />
                <Table.Column
                  title="受付No"
                  dataIndex="W1_receipt_num"
                  width="50px"
                  render={(index, record) => {
                    return (
                      <div
                        hidden={record.W1_receipt_num > 0 ? false : true}
                        style={{ textAlign: "right" }}
                      >
                        <span>{record.W1_receipt_num}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title="氏名"
                  dataIndex="W1_kanji_name"
                  width={180}
                  render={(value, record) => {
                    return (
                      <Tooltip title={record.Expression_137}>
                        <span>{record.W1_kanji_name}</span>
                      </Tooltip>
                    );
                  }}
                />
                <Table.Column
                  title="ｺｰｽ"
                  dataIndex="W1_course_cd"
                  key=""
                  width="45px"
                  render={(value, record) => {
                    return (
                      <Tooltip title={record.Expression_136}>
                        <span style={{ cursor: "pointer" }}>
                          {record.W1_course_cd}
                        </span>
                      </Tooltip>
                    );
                  }}
                />
                <Table.Column
                  title="契約"
                  dataIndex="contract_short_name"
                  width="200px"
                  render={(value, record) => {
                    return (
                      <Tooltip title={record.Expression_136}>
                        <span>{record.contract_short_name}</span>
                      </Tooltip>
                    );
                  }}
                />
                <Table.Column
                  title="総合判定"
                  dataIndex="comprehensive_judgment"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_150)?.Foreground,
                        }}
                      >
                        <span>{record.comprehensive_judgment}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title="指導事項"
                  dataIndex="Expression_145"
                  render={(value, record) => {
                    return (
                      <div style={{ textAlign: "center" }}>
                        <span>{record.Expression_145}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title="階層化"
                  dataIndex="Expression_146"
                  render={(value, record) => {
                    return (
                      <Tooltip title={record.Expression_14}>
                        <div
                          style={{
                            textAlign: "center",
                            color: Color(record.Expression_147)?.Foreground,
                          }}
                        >
                          <span>{record.Expression_146}</span>
                        </div>
                      </Tooltip>
                    );
                  }}
                />
                <Table.Column
                  title="メタボ"
                  dataIndex="Expression_148"
                  render={(value, record) => {
                    return (
                      <Tooltip title={record.Expression_15}>
                        <div
                          style={{
                            textAlign: "center",
                            color: Color(record.Expression_149)?.Foreground,
                          }}
                        >
                          <span>{record.Expression_148}</span>
                        </div>
                      </Tooltip>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_37")}
                  dataIndex="DisplayResult01"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_67)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult01}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_38")}
                  dataIndex="DisplayResult02"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_68)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult02}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_39")}
                  dataIndex="DisplayResult03"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_69)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult03}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_40")}
                  dataIndex="DisplayResult04"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_70)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult04}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_41")}
                  dataIndex="DisplayResult05"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_71)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult05}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_42")}
                  dataIndex="DisplayResult06"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_72)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult06}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_43")}
                  dataIndex="DisplayResult07"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_73)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult07}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_44")}
                  dataIndex="DisplayResult08"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_74)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult08}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_45")}
                  dataIndex="DisplayResult09"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_75)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult09}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_46")}
                  dataIndex="DisplayResult10"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_76)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult10}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_47")}
                  dataIndex="DisplayResult11"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_77)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult11}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_48")}
                  dataIndex="DisplayResult12"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_78)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult12}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_49")}
                  dataIndex="DisplayResult13"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_79)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult13}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_50")}
                  dataIndex="DisplayResult14"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_80)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult14}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_51")}
                  dataIndex="DisplayResult15"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_81)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult15}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_52")}
                  dataIndex="DisplayResult16"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_82)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult16}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_53")}
                  dataIndex="DisplayResult17"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_83)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult17}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_54")}
                  dataIndex="DisplayResult18"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_84)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult18}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_55")}
                  dataIndex="DisplayResult19"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_85)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult19}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_56")}
                  dataIndex="DisplayResult20"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_86)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult20}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_57")}
                  dataIndex="DisplayResult21"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_87)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult21}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_58")}
                  dataIndex="DisplayResult22"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_88)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult22}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_59")}
                  dataIndex="DisplayResult23"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_89)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult23}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_60")}
                  dataIndex="DisplayResult24"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_90)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult24}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_61")}
                  dataIndex="DisplayResult25"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_91)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult25}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_62")}
                  dataIndex="DisplayResult26"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_92)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult26}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_63")}
                  dataIndex="DisplayResult27"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_93)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult27}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_64")}
                  dataIndex="DisplayResult28"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_94)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult28}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_65")}
                  dataIndex="DisplayResult29"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_95)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult29}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title={titleString("Expression_66")}
                  dataIndex="DisplayResult30"
                  render={(value, record) => {
                    return (
                      <div
                        style={{
                          textAlign: "center",
                          color: Color(record.Expression_96)?.Foreground,
                        }}
                      >
                        <span>{record.DisplayResult30}</span>
                      </div>
                    );
                  }}
                />
                <Table.Column
                  title=""
                  dataIndex=""
                  key=""
                  render={(value, record) => {
                    return (
                      <Dropdown
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              key="照会"
                              onClick={() =>
                                this.WS2583001_ConsultInquirySub(record)
                              }
                            >
                              照会
                            </Menu.Item>
                            <Menu.Item
                              key="入力"
                              onClick={() =>
                                this.WS2637001_OverallResultDisplayInput(record)
                              }
                            >
                              入力
                            </Menu.Item>
                            <Menu.Item
                              key="出力"
                              onClick={() =>
                                this.WS3020036_CoupledPrintInstruction(record)
                              }
                            >
                              出力
                            </Menu.Item>
                            <Menu.Item
                              key="EXCEL"
                              onClick={() =>
                                this.excelReport(record.Li_CategoryNameList)
                              }
                            >
                              EXCEL
                            </Menu.Item>
                          </Menu>
                        )}
                      >
                        <Button
                          size="small"
                          icon={<MoreOutlined />}
                          style={{ width: "100%" }}
                        ></Button>
                      </Dropdown>
                    );
                  }}
                />
              </Table>
              <br></br>
              <Row gutter={24}>
                <Col
                  span={12}
                  style={{ paddingRight: "20px", textAlign: "right" }}
                >
                  <Space>
                    <Button
                      type="primary"
                      style={{
                        marginLeft: "2px",
                        padding: "0",
                        height: "28px",
                      }}
                      icon={<DoubleLeftOutlined />}
                    ></Button>
                    <Button
                      type="primary"
                      style={{
                        marginLeft: "2px",
                        padding: "0",
                        height: "28px",
                      }}
                      icon={<LeftOutlined />}
                    ></Button>
                  </Space>
                </Col>
                <Col span={12} style={{ paddingLeft: "20px" }}>
                  <Space style={{ textAlign: "left" }}>
                    <Button
                      type="primary"
                      style={{
                        marginLeft: "2px",
                        padding: "0",
                        height: "28px",
                      }}
                      icon={<RightOutlined />}
                    ></Button>
                    <Button
                      type="primary"
                      style={{
                        marginLeft: "2px",
                        padding: "0",
                        height: "28px",
                      }}
                      icon={<DoubleRightOutlined />}
                    ></Button>
                  </Space>
                  <Space style={{ float: "right" }}>
                    <span style={{ paddingRight: "10px" }}>全入力 ○</span>
                    <span style={{ paddingRight: "10px" }}>
                      一部入力 <CaretUpOutlined style={{ color: "blue" }} />
                    </span>
                    <span style={{ paddingRight: "10px" }}>
                      未入力 <CloseOutlined style={{ color: "red" }} />
                    </span>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Spin>
        </Card>
        <ModalDraggable
          className={this.state.childModal.className}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          destroyOnClose={true}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            if (this.state.updateDataInspectInput) {
              this.updateDataInspectInput();
              this.setState({
                updateDataInspectInput: false,
              });
            } else {
              if (this.state.afterUpdateDataInspectInput) {
                this.detailF7After();
              }
              this.closeModal();
            }
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
)(WS0743001_NotInputCheckCategory);
