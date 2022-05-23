import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Spin,
  Form,
  Input,
  Button,
  Table,
  Row,
  Col,
  message,
  Modal,
  List,
  Space,
} from "antd";
import WS1004007_JudgeSelect from "pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS1004007_JudgeSelect.jsx";
import FindingsInputRadiographyAction from "redux/InputBusiness/SpreadInput/FindingsInputRadiography.action";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import WS0285001_JudgeQuery from "pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery";
import WS0178001_QuerySiteInfo from "pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0178001_QuerySiteInfo";
import WS0179001_InquiryFindingInfo from "pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0179001_InquiryFindingInfo";
import WS0272001_CautionGuideNotesSearchQuery from "pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0272001_CautionGuideNotesSearchQuery";
import WS0719001_GuideMatterSet from "./WS0719001_GuideMatterSet";
import WS0720001_NotesSet from "./WS0720001_NotesSet";
import WS0737001_GuideMatterSettingSpread from "./WS0737001_GuideMatterSettingSpread";
import { debounce } from "lodash";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0729001_FindingsInputRadiography extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "所見入力[読影]";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataForm: {},
      isLoadingform: true,
      isLoadingTable: true,
      dataSource1: [],
      selectedRows: [],
      indexTable: 0,
      rowSelect: {},
      isLoadingTable2: true,
      dataSource2: [],
      ChangeSiteAndFindingsCode: [],
      site_code1: 0,
      site_code2: 0,
      findings_code1: 0,
      findings_code2: 0,
      activeLink: null,
      activeLink2: null,
      activeLink3: null,
      activeLink4: null,
      Lio_FindingsCategoryChange: 0,
      Lio_GuidanceAndAttentionChange: 0,
    };
  }
  componentDidMount() {
    this.getListData();
  }
  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        flg_729: 1,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListData();
      this.setState({
        Lio_FindingsCategoryChange: 0,
        Lio_GuidanceAndAttentionChange: 0,
      });
    }
  }

  getListData() {
    this.setState({ isLoadingform: true });
    const data = {
      Li_PatternCode: this.props.Li_PatternCode,
      Li_CategoryCode: this.props.Li_CategoryCode,
      Li_InspectCode: this.props.Li_InspectCode,
      Li_CourseLevel: this.props.Li_CourseLevel,
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_JudgeLevel: this.props.Li_JudgeLevel,
      Li_FindingsInputNumRows: this.props.Li_FindingsInputNumRows,
      Li_FindingsInputNumDigits: this.props.Li_FindingsInputNumDigits,
    };
    FindingsInputRadiographyAction.GetScreenDataAction(data)
      .then((res) => {
        if (res) {
          this.formRef.current.setFieldsValue({
            W5_category_judge: res.W5_category_judge,
          });
          this.setState({ dataForm: res });
          this.getListDataLeftTable();
          this.getListRightData();
          this.ChangeSite1(res.SiteCode1[0])
        }
      })
      .finally(() => this.setState({ isLoadingform: false }));
  }
  getListDataLeftTable() {
    this.setState({ isLoadingTable: true });
    const data = {
      Li_CourseLevel: this.state.dataForm.Li_CourseLevel,
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      Li_PatternCode: this.state.dataForm.Li_PatternCode,
      Li_CategoryCode: this.state.dataForm.Li_CategoryCode,
      Li_JudgeLevel: this.state.dataForm.Li_JudgeLevel,
      Li_FindingsInputNumDigits: this.state.dataForm.Li_FindingsInputNumDigits,
    };
    FindingsInputRadiographyAction.GetListDataLeftTableAction(data)
      .then((res) => {
        if (res) {
          const constvertType = (input) => (input === 0 ? "" : input);
          const newArr = res.data.map((s) => ({
            ...s,
            W3_serial_num: constvertType(s.W3_serial_num),
            W3_site_cd: constvertType(s.W3_site_cd),
            W3_findings_cd :  constvertType(s.W3_findings_cd),
          }));
          this.setState({ dataSource1: newArr , selectedRows: [res.data[0]], indexTable: 0,});
          this.formRef.current.setFieldsValue({ tableData: newArr });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }));
  }
  handleChangeInput = (record, value, name) => {
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
  saveDataUp(record) {
    const data = {
      id: record.id || undefined,
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      Li_CategoryCode: this.state.dataForm.Li_CategoryCode,
      W3_serial_num: record.W3_serial_num,
      W3_site_cd: record.W3_site_cd,
      W3_site_name: record.W3_site_name,
      W3_findings_cd: record.W3_findings_cd,
      W3_findings_name: record.W3_findings_name,
      W3_determine_val: record.W3_determine_val,
    };
    FindingsInputRadiographyAction.SaveDataLeftAction(data)
      .then((res) => {
        if (res) {
          message.success("成功");
          this.getListDataLeftTable();
          this.setState({
            Lio_FindingsCategoryChange: 1,
            Lio_GuidanceAndAttentionChange: 1,
          });
        }
      })
      .catch((err) => message.error("エラー"));
  }
  deleteData(record) {
    if (record.id) {
      FindingsInputRadiographyAction.DeleteDataLeftAction({
        id: record.id,
      })
        .then((res) => {
          message.success("成功");
          this.getListDataLeftTable();
          this.setState({
            Lio_FindingsCategoryChange: 1,
            Lio_GuidanceAndAttentionChange: 1,
          });
        })
        .catch((err) => message.error("エラー"));
    } else {
      let arrTemp = [...this.state.dataSource1];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ tableData: arrTemp });
      this.setState({ dataSource1: arrTemp });
      this.getListDataLeftTable();
    }
  }
  getListRightData() {
    this.setState({ isLoadingTable2: false });
    const data = {
      Li_ReserveNum: this.state.dataForm.PreviousReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
    };
    FindingsInputRadiographyAction.GetListDataRightTableAction(data)
      .then((res) => {
        if (res) {
          this.setState({ dataSource2: res.data });
          this.formRef.current.setFieldsValue({ tableData2: res.data });
        }
      })
      .finally(() => this.setState({ isLoadingTable2: false }));
  }
  ChangeSite1(site_code1) {
    const data = {
      InspectClassifyCode: this.state.dataForm.InspectClassifyCode,
      SiteCode1: site_code1.site_code || "",
      SiteCode2: "",
      FindingsCode1: "",
    };
    FindingsInputRadiographyAction.getChangeSiteAndFindingsCodeAction(data)
      .then((res) => {
        if (res) {
          this.setState({
            site_code1: site_code1,
            ChangeSiteAndFindingsCode: res,
            activeLink: site_code1.site_code,
          });
          this.ChangeSite2(res.SiteCode2[0])
        }
      })
      .finally(() => {});
  }
  ChangeSite2(site_code2) {
    const data = {
      InspectClassifyCode: this.state.dataForm.InspectClassifyCode,
      SiteCode1: this.state.site_code1.site_code,
      SiteCode2: site_code2.site_code || "",
      FindingsCode1: "",
    };
    FindingsInputRadiographyAction.getChangeSiteAndFindingsCodeAction(data)
      .then((res) => {
        if (res) {
          this.setState({
            site_code2: site_code2,
            ChangeSiteAndFindingsCode: res,
            activeLink2: site_code2.site_code,
          });
          this.ChangeFindingsCode1(res?.FindingsCode1[0])
        }
      })
      .finally(() => {});
  }
  findIndexByID = (arrayData, recordID) => {
    if (arrayData && arrayData.length > 0) {
      return arrayData.findIndex((item) => recordID === item.id);
  }
  };
  ChangeFindingsCode1(finding_code1) {
    const data = {
      InspectClassifyCode: this.state.dataForm.InspectClassifyCode,
      SiteCode1: this.state.site_code1.site_code,
      SiteCode2: this.state.site_code2.site_code,
      FindingsCode1: finding_code1.findings_code || "",
    };
    FindingsInputRadiographyAction.getChangeSiteAndFindingsCodeAction(data)
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
  setting() {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      Li_InspectClassifyCode: this.state.dataForm.InspectClassifyCode,
      Li_SiteFindingsClassify: this.state.dataForm.SiteFindingsClassify,
      Li_SiteCode1: this.state.site_code1.site_code ? this.state.site_code1.site_code : 0,
      Li_SiteCode2: this.state.site_code2.site_code ? this.state.site_code2.site_code : 0,
      Li_FindingsCode1: this.state.findings_code1.findings_code ? this.state.findings_code1.findings_code : 0,
      Li_FindingsCode2: this.state.findings_code2.findings_code ? this.state.findings_code2.findings_code : 0,
      Li_FindingsInputNumRows: this.state.dataForm.Li_FindingsInputNumRows,
      StsSiteFindingsConvert: this.state.dataForm.Li_FindingsInputNumRows
        ? 0
        : 1,
    };
    FindingsInputRadiographyAction.FindingsComfirmAction(data)
      .then((res) => {
        if (res) {
          message.success("成功");
          this.getListDataLeftTable();
          this.getListRightData();
          this.setState({
            activeLink: null,
            activeLink2: null,
            activeLink3: null,
            activeLink4: null,
              Lio_FindingsCategoryChange: 1,
              Lio_GuidanceAndAttentionChange: 1,
          });
        }
      })
      .catch((err) => message.error("エラー"));
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  F7() {
    if (this.state.dataForm.Li_LeadershipMattersHowToAdd === "") {
    } else if (this.state.dataForm.Li_LeadershipMattersHowToAdd === "0") {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 800,
          component: (
            <WS0272001_CautionGuideNotesSearchQuery
            Li_PatternCode = {this.state.dataForm.Li_PatternCode}
            Li_CategoryCode = {this.state.dataForm.Li_CategoryCode}
            Li_IdentifyCode = "S"
            LnkOutCommentCode = ""
              onFinishScreen={(output) => {
                this.F7Api(output);
                this.closeModal();
              }}
            />
          ),
        },
      });
    } else if (this.state.dataForm.Li_LeadershipMattersHowToAdd === "1") {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 800,
          component: (
            <WS0719001_GuideMatterSet
              onFinishScreen={(output) => {
                this.closeModal();
              }}
            />
          ),
        },
      });
    } else if (this.state.dataForm.Li_LeadershipMattersHowToAdd === "2") {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 800,
          component: (
            <WS0720001_NotesSet
              onFinishScreen={(output) => {
                this.closeModal();
              }}
            />
          ),
        },
      });
    } else if (this.state.dataForm.Li_LeadershipMattersHowToAdd === "3") {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 800,
          component: (
            <WS0737001_GuideMatterSettingSpread
              onFinishScreen={(output) => {
                this.closeModal();
              }}
            />
          ),
        },
      });
    }
  }
  F7Api(output) {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      CmtCode: output.Lo_LnkOutCmtCode,
    };
    FindingsInputRadiographyAction.f7Action(data)
      .then((res) => {
        if (res) {
          message.success("成功");
          this.getListDataLeftTable();
          this.getListRightData();
        }
      })
      .catch((err) => message.error("エラー"));
  }
  F11() {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      PreviousReserveNum: this.state.dataForm.PreviousReserveNum,
    };
    FindingsInputRadiographyAction.f11Action(data)
      .then((res) => {
        message.success("成功");
        this.getListDataLeftTable();
        this.getListRightData();
        this.setState({
          Lio_FindingsCategoryChange: 1,
          Lio_GuidanceAndAttentionChange: 1,
        });
      })
      .catch((err) => message.error("エラー"));
  }

  onFinish(values) {}
  changeCategoryJudge = debounce((e) => {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_CategoryCode: this.state.dataForm.Li_CategoryCode,
      Li_CourseLevel: this.state.dataForm.Li_CourseLevel,
      W5_category_judge: e.target.value,
      Li_JudgeLevel: this.state.dataForm.Li_JudgeLevel,
    };
    FindingsInputRadiographyAction.ChangeCategoryJudgeAction(data)
      .then((res) => {
        if (res) {
          this.setState({
            Lio_FindingsCategoryChange: 1,
            Lio_GuidanceAndAttentionChange: 1,
          });
        }
      })
      .catch((err) => message.error("エラー"));
  }, 500);

  render() {
    const { rowSelect, activeLink, activeLink2, activeLink3, activeLink4 } =
      this.state;
    const ChangeSiteAndFindingsCode = this.state.ChangeSiteAndFindingsCode;
    const fromSoure = this.state.dataForm;
    return (
      <div className="findings-input-radiography">
        <Spin spinning={this.state.isLoadingform}>
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Card style={{}} className="mb-2">
              <Form.Item
                name="W5_category_judge"
                label="判定"
                style={{
                  marginBottom: "0px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Input
                  name="W5_category_judge"
                  onChange={(e) => {
                    this.changeCategoryJudge(e);
                  }}
                  style={{ width: "30%" }}
                  onDoubleClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 800,
                        component: (
                          <WS0285001_JudgeQuery
                            onFinishScreen={(output) => {
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    });
                  }}
                />
              </Form.Item>
            </Card>

            <Row>
              <Col
                span={11}
                style={{
                  border: "1.5px solid white",
                  padding: "0.5em 0 0 0.5em",
                  marginRight: "0.5em",
                }}
              >
                <label style={{ color: "#14468c", fontWeight: "700" }}>部位</label>
                <Row>
                  <Col span={12}>
                    <List
                      grid={{ gutter: 24, column: 1 }}
                      dataSource={[{}]}
                      renderItem={(item) => (
                        <List.Item>
                          {ChangeSiteAndFindingsCode.SiteCode1 ? (
                            <Card className="scroll" style={{ width: "98%" }}>
                              {ChangeSiteAndFindingsCode.SiteCode1 &&
                                ChangeSiteAndFindingsCode.SiteCode1.map(
                                  (res) => {
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
                                        style={{
                                          cursor: "pointer",
                                          marginBottom: "12px",
                                        }}
                                      >
                                        {res.site_name}
                                      </div>
                                    );
                                  }
                                )}
                            </Card>
                          ) : (
                            <Card className="scroll" style={{ width: "98%" }}>
                              {fromSoure.SiteCode1 &&
                                fromSoure.SiteCode1.map((res) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        this.ChangeSite1(res);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        marginBottom: "12px",
                                      }}
                                    >
                                      {res.site_name}
                                    </div>
                                  );
                                })}
                            </Card>
                          )}
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <List
                      grid={{ gutter: 24, column: 1 }}
                      dataSource={[{}]}
                      renderItem={(item) => (
                        <List.Item>
                          {ChangeSiteAndFindingsCode.SiteCode1 ? (
                            <Card className="scroll" style={{ width: "98%" }}>
                              {ChangeSiteAndFindingsCode.SiteCode2 &&
                                ChangeSiteAndFindingsCode.SiteCode2.map(
                                  (res) => {
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
                                        style={{
                                          cursor: "pointer",
                                          marginBottom: "12px",
                                        }}
                                      >
                                        {res.site_name}
                                      </div>
                                    );
                                  }
                                )}
                            </Card>
                          ) : (
                            <Card className="scroll" style={{ width: "98%" }}>
                              {fromSoure.SiteCode2 &&
                                fromSoure.SiteCode2.map((res) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        this.ChangeSite2(res.site_code);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        marginBottom: "12px",
                                      }}
                                    >
                                      {res.site_name}
                                    </div>
                                  );
                                })}
                            </Card>
                          )}
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col
                span={11}
                style={{
                  border: "1.5px solid white",
                  padding: "0.5em 0 0 0.5em",
                }}
              >
                <label style={{ color: "#14468c", fontWeight: "700" }}>所見</label>
                <Row>
                  <Col span={12}>
                    <List
                      grid={{ gutter: 24, column: 1 }}
                      dataSource={[{}]}
                      renderItem={(item) => (
                        <List.Item>
                          {ChangeSiteAndFindingsCode.SiteCode1 ? (
                            <Card className="scroll" style={{ width: "98%" }}>
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
                                        style={{
                                          cursor: "pointer",
                                          marginBottom: "12px",
                                        }}
                                      >
                                        {res.findings_name}
                                      </div>
                                    );
                                  }
                                )}
                            </Card>
                          ) : (
                            <Card className="scroll" style={{ width: "98%" }}>
                              {fromSoure.FindingsCode1 &&
                                fromSoure.FindingsCode1.map((res) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        this.ChangeFindingsCode1(res);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        marginBottom: "12px",
                                      }}
                                    >
                                      {res.findings_name}
                                    </div>
                                  );
                                })}
                            </Card>
                          )}
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <List
                      grid={{ gutter: 24, column: 1 }}
                      dataSource={[{}]}
                      renderItem={(item) => (
                        <List.Item>
                          {ChangeSiteAndFindingsCode.SiteCode1 ? (
                            <Card className="scroll" style={{ width: "98%" }}>
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
                                        style={{
                                          cursor: "pointer",
                                          marginBottom: "12px",
                                        }}
                                      >
                                        {res.findings_name}
                                      </div>
                                    );
                                  }
                                )}
                            </Card>
                          ) : (
                            <Card className="scroll" style={{ width: "98%" }}>
                              {fromSoure.FindingsCode2 &&
                                fromSoure.FindingsCode2.map((res) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        this.ChangeFindingsCode2(res);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        marginBottom: "12px",
                                      }}
                                    >
                                      {res.findings_name}
                                    </div>
                                  );
                                })}
                            </Card>
                          )}
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col style={{ position: "relative" }}>
                <Button
                  type="primary"
                  style={{
                    position: "absolute",
                    marginLeft: "1em",
                    bottom: '17px'
                  }}
                  onClick={() => {
                    this.setting();
                  }}
                >
                  確定
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={16}>
                <Table
                  style={{ width: "99%" }}
                  loading={this.state.isLoadingTable}
                  dataSource={this.state.dataSource1}
                  pagination={false}
                  rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
                  rowKey={(record) => record.id}
                  size="small"
                  bordered={true}
                  // rowSelection={{
                  //   type: "radio",
                  //   onChange: (selectedRowKeys, selectedRows) => {},
                  // }}
                  onRow={(record, index) => {
                    return {
                      onClick: (event) => {
                        this.setState({ rowSelect: record ,indexTable: index,  selectedRows: [record], });
                      },
                    };
                  }}
                  scroll={{ y: '323px' }}
                >
                  <Table.Column
                   width={80}
                    title="連番"
                    dataIndex="W3_serial_num"
                    render={(row, record, index) => {
                      return (
                        <Form.Item
                          style={{ marginBottom: "0px" }}
                          name={["tableData", index, "W3_serial_num"]}
                        >
                          <Input
                          style={{textAlign: 'right'}}
                            onChange={(e) =>
                              this.handleChangeInput(
                                rowSelect,
                                e.target.value,
                                "W3_serial_num"
                              )
                            }
                            name="W3_serial_num"
                          />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                   width={300}
                    title="部位"
                    dataIndex=""
                    render={(row, record, index) => {
                      return (
                        <Row>
                          <Col span={8}>
                            <Form.Item
                              style={{ marginBottom: "0px" }}
                              name={["tableData", index, "W3_site_cd"]}
                            >
                              <Input
                                onChange={(e) =>
                                  this.handleChangeInput(
                                    rowSelect,
                                    e.target.value,
                                    "W3_site_cd"
                                  )
                                }
                                name="W3_site_cd"
                                style={{ width: "98%", textAlign:'right' }}
                                onDoubleClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 800,
                                      component: (
                                        <WS0178001_QuerySiteInfo
                                          onFinishScreen={(output) => {
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
                            <Form.Item
                              style={{ marginBottom: "0px" }}
                              name={["tableData", index, "W3_site_name"]}
                            >
                              <Input
                                onChange={(e) =>
                                  this.handleChangeInput(
                                    rowSelect,
                                    e.target.value,
                                    "W3_site_name"
                                  )
                                }
                                name="W3_site_name"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      );
                    }}
                  />
                  <Table.Column
                    title="所見"
                    dataIndex=""
                    render={(row, record, index) => {
                      return (
                        <Row>
                          <Col span={8}>
                            <Form.Item
                              style={{ marginBottom: "0px" }}
                              name={["tableData", index, "W3_findings_cd"]}
                            >
                              <Input
                                onChange={(e) =>
                                  this.handleChangeInput(
                                    rowSelect,
                                    e.target.value,
                                    "W3_findings_cd"
                                  )
                                }
                                name="W3_findings_cd"
                                style={{ width: "98%", textAlign:'right' }}
                                onDoubleClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 800,
                                      component: (
                                        <WS0179001_InquiryFindingInfo
                                          onFinishScreen={(output) => {
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
                            <Form.Item
                              style={{ marginBottom: "0px" }}
                              name={["tableData", index, "W3_findings_name"]}
                            >
                              <Input
                                onChange={(e) =>
                                  this.handleChangeInput(
                                    rowSelect,
                                    e.target.value,
                                    "W3_findings_name"
                                  )
                                }
                                name="W3_findings_name"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      );
                    }}
                  />
                  <Table.Column
                   width={100}
                    title="判定"
                    dataIndex=""
                    render={(row, record, index) => {
                      return (
                        <Form.Item
                          style={{ marginBottom: "0px" }}
                          name={["tableData", index, "W3_determine_val"]}
                        >
                          <Input
                            onChange={(e) =>
                              this.handleChangeInput(
                                rowSelect,
                                e.target.value,
                                "W3_determine_val"
                              )
                            }
                            name="W3_determine_val"
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 800,
                                  component: (
                                    <WS1004007_JudgeSelect
                                      onFinishScreen={(output) => {
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    align="center"
                    width={100}
                    title={() => (
                      <Button
                        size="small"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          let arrTemp = [{}];
                          this.formRef.current.setFieldsValue({
                            tableData: [...arrTemp, ...this.state.dataSource1],
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
                          size="small"
                          style={{ border: "none" }}
                          icon={<SaveOutlined style={{ color: "green" }} />}
                          onClick={() => this.saveDataUp(record)}
                        ></Button>
                        <Button
                          hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource1, record.id)}
                          size="small"
                          style={{ border: "none" }}
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: "消去してもよろしいですか？",
                              okText: "はい",
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
              <Col span={8}>
                <Table
                  loading={this.state.isLoadingTable2}
                  style={{ width: "98%" }}
                  dataSource={this.state.dataSource2}
                  pagination={false}
                  rowKey={(record) => record.id}
                  size="small"
                  bordered={true}
                  // rowSelection={{
                  //   type: "radio",
                  //   onChange: (selectedRowKeys, selectedRows) => {},
                  // }}
                  scroll={{ y: '323px' }}
                >
                  <Table.Column
                    title="前回"
                    dataIndex="site_name"
                    render={(row, record, index) => {
                      return (
                        <Form.Item name={["tableData2", index, "site_name"]}>
                          <Input
                            name="site_name"
                            style={{ border: "none" }}
                            readOnly
                          />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="所見"
                    dataIndex="findings_name"
                    render={(row, record, index) => {
                      return (
                        <Form.Item
                          name={["tableData2", index, "findings_name"]}
                        >
                          <Input
                            name="findings_name"
                            style={{ border: "none" }}
                            readOnly
                          />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="判定"
                    dataIndex="judgment_value"
                    render={(row, record, index) => {
                      return (
                        <Form.Item
                          name={["tableData2", index, "judgment_value"]}
                        >
                          <Input
                            name="judgment_value"
                            style={{ border: "none" }}
                            readOnly
                          />
                        </Form.Item>
                      );
                    }}
                  />
                </Table>
              </Col>
              <Space
                style={{
                  float: "left",
                  marginTop: "1em",
                  marginRight: "10px",
                  width: "100%",
                  display: "flex",
                  marginBottom: "15px",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={() => {
                    this.F7();
                  }}
                  type="primary"
                >
                  指導事項
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      content: "消去してもよろしいですか？",
                      okText: "はい",
                      cancelText: "いいえ",
                      onOk: () => this.F11(),
                    });
                  }}
                >
                  前回D
                </Button>

                <Button
                  onClick={() => {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({
                        flg_729: 1,
                        data: this.state.dataSource1,
                        close: true,
                        Lio_FindingsCategoryChange:
                          this.state.Lio_FindingsCategoryChange,
                        Lio_GuidanceAndAttentionChange:
                          this.state.Lio_GuidanceAndAttentionChange,
                      });
                    }
                  }}
                  type="primary"
                >
                  確　定
                </Button>
              </Space>
            </Row>
          </Form>
        </Spin>
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
)(WS0729001_FindingsInputRadiography);
