import React from "react";
import { connect } from "react-redux";
import "./WS0731001_FindingsInputNormalSelect.scss";
import ModalDraggable from "components/Commons/ModalDraggable";
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Row,
  Col,
  Modal,
  message,
  List,
  Spin,
  Space,
} from "antd";
import WS1004007_JudgeSelect from "pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS1004007_JudgeSelect.jsx";
import WS1873003_SiteInquiry from "pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1873003_SiteInquiry.jsx";
import WS1874004_FindingInquiry from "pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1874004_FindingInquiry.jsx";
import FindingsInputNormalSelectAction from "redux/InputBusiness/SpreadInput/FindingsInputNormalSelect.action";
import WS0285001_JudgeQuery from "pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery";
import WS0178001_QuerySiteInfo from "pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0178001_QuerySiteInfo";
import WS0179001_InquiryFindingInfo from "pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0179001_InquiryFindingInfo";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import Color from "constants/Color";

class WS0731001_FindingsInputNormalSelect extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "所見入力[通常選択]";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataForm: {},
      dataSource1: [],
      selectedRows: [],
      indexTable: 0,
      isLoadingTable1: true,
      rowSelect: {},
      site_code1: 0,
      findings_code1: 0,
      activeLink: null,
      activeLink2: null,
      dataSource2: [],
      isLoadingTable2: true,
      lastDate: {},
      Lio_FindingsCategoryChange: 0,
      Lio_GuidanceAndAttentionChange: 0,
    };
  }
  componentDidMount() {
    this.getScreenData();
  }
  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        flg_731: 1,
        data: this.state.dataSource1,
        close: false,
        Lio_FindingsCategoryChange:
          this.state.dataForm?.Lio_FindingsCategoryChange,
        Lio_GuidanceAndAttentionChange:
          this.state.dataForm?.Lio_FindingsCategoryChange,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
      this.setState({
        Lio_FindingsCategoryChange: 0,
        Lio_GuidanceAndAttentionChange: 0,
      });
    }
  }
  getScreenData() {
    this.setState({ isLoadingForm: true });
    const data = {
      Li_PatternCode: this.props.Li_PatternCode,
      Li_CategoryCode: this.props.Li_CategoryCode,
      Li_InspectCode: this.props.Li_InspectCode,
      Li_CourseLevel: this.props.Li_CourseLevel,
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_JudgeLevel: this.props.Li_JudgeLevel,
      Li_PersonalNum: this.props.Li_PersonalNum,
      Lio_FindingsCategoryChange: this.props.Lio_FindingsCategoryChange ? 1 : 0,
    };
    FindingsInputNormalSelectAction.GetScreenDataAction(data)
      .then((res) => {
        if (res) {
          this.formRef.current.setFieldsValue({
            CategoryJudge: res.CategoryJudge,
          });
          this.setState({ dataForm: res });
          this.SitFidingInputThisTimeAction();
          this.siteFindingsQueryPrevious();
        }
      })
      .finally(() => this.setState({ isLoadingForm: false }));
  }
  SitFidingInputThisTimeAction() {
    this.setState({ isLoadingTable1: true });
    const data = {
      Li_CourseLevel: this.state.dataForm.Li_CourseLevel,
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      Li_PatternCode: this.state.dataForm.Li_PatternCode,
      Li_CategoryCode: this.state.dataForm.Li_CategoryCode,
      Li_JudgeLevel: this.state.dataForm.Li_JudgeLevel,
    };
    FindingsInputNormalSelectAction.SitFidingInputThisTimeAction(data)
      .then((res) => {
        if (res) {
          const constvertType = (input) => (input === 0 ? "" : input);
          const newArr = res.data.map((s) => ({
            ...s,
            W3_serial_num: constvertType(s.W3_serial_num),
            W3_site_cd: constvertType(s.W3_site_cd),
            W3_findings_cd :  constvertType(s.W3_findings_cd),
          }));

          this.setState({ dataSource1: newArr, selectedRows: [res.data[0]], indexTable: 0, });
          this.formRef.current.setFieldsValue({ tableData: newArr });
        }
      })
      .finally(() => this.setState({ isLoadingTable1: false }));
  }
  findIndexByID = (arrayData, recordID) => {
    if (arrayData && arrayData.length > 0) {
      return arrayData.findIndex((item) => recordID === item.id);
  }
  };
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
      site_classification: this.state.dataForm.site_classification,
      W3_serial_num: record.W3_serial_num,
      W3_site_cd: record.W3_site_cd,
      W3_site_name: record.W3_site_name,
      W3_findings_cd: record.W3_findings_cd,
      W3_findings_name: record.W3_findings_name,
      W3_determine_val: record.W3_determine_val,
    };
    FindingsInputNormalSelectAction.SaveDataAction(data)
      .then((res) => {
        if (res) {
          message.success("成功");
          this.SitFidingInputThisTimeAction();
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
      FindingsInputNormalSelectAction.DeleteDataAction({
        id: record.id,
      })
        .then((res) => {
          message.success("成功");
          this.SitFidingInputThisTimeAction();
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
      this.SitFidingInputThisTimeAction();
    }
  }
  ChangeSite1(site_code1) {
    this.setState({
      site_code1: site_code1,
      activeLink: site_code1.site_code,
    });
  }
  ChangeFindingsCode1(findings_code1) {
    this.setState({
      findings_code1: findings_code1,
      activeLink2: findings_code1.findings_code,
    });
  }
  ConfirmBtn() {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      Li_SiteFindingsClassify: this.state.dataForm.site_classification,
      Li_SiteCode: this.state.site_code1.site_code,
      Li_FindingsCode: this.state.findings_code1.findings_code,
    };
    FindingsInputNormalSelectAction.ConfirmBtnAction(data)
      .then((res) => {
        if (res) {
          message.success("成功");
          this.SitFidingInputThisTimeAction();
          this.siteFindingsQueryPrevious();
          this.setState({ activeLink: null, activeLink2: null });
          this.setState({
            Lio_FindingsCategoryChange: 1,
            Lio_GuidanceAndAttentionChange: 1,
          });
        }
      })
      .catch((err) => message.error("エラー"));
  }
  siteFindingsQueryPrevious() {
    this.setState({ isLoadingTable2: true });
    const data = {
      Li_ReserveNum: this.state.dataForm.PreviousReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      LastDate: this.state.dataForm.LastDate,
    };
    FindingsInputNormalSelectAction.SiteFindingsQueryPreviousAction(data)
      .then((res) => {
        if (res) {
          this.setState({ dataSource2: res.data ? res.data : [], lastDate: res ? res : [] });
          this.formRef.current.setFieldsValue({ tableData2: res.data ? res.data : [] });
        }
      })
      .finally(() => this.setState({ isLoadingTable2: false }));
  }
  lastTimeDoBtn() {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      PreviousReserveNum: this.state.dataForm.PreviousReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
    };
    FindingsInputNormalSelectAction.LastTimeDoBtnAction(data)
      .then((res) => {
        if (res) {
          message.success("成功");
          this.SitFidingInputThisTimeAction();
          this.siteFindingsQueryPrevious();
        }
      })
      .catch((err) => message.error("エラー"));
  }
  changeCategoryJudge = debounce((e) => {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_CategoryCode: this.state.dataForm.Li_CategoryCode,
      Li_CourseLevel: this.state.dataForm.Li_CourseLevel,
      CategoryJudge: e.target.value,
      Li_JudgeLevel: this.state.dataForm.Li_JudgeLevel,
    };
    FindingsInputNormalSelectAction.ChangeCategoryJudgeAction(data)
      .then((res) => {
        this.setState({
          Lio_FindingsCategoryChange: 1,
          Lio_GuidanceAndAttentionChange: 1,
        });
      })
      .catch((err) => message.error("エラー"));
  }, 500);

  onFinish(values) {}
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    const fromSoure = this.state.dataForm;
    const { rowSelect, activeLink, activeLink2 } = this.state;
    return (
      <div className="findings-input-normal-select ">
        <Spin spinning={this.state.isLoadingForm}>
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Card className="mb-2">
              <Form.Item
                name="CategoryJudge"
                label="判定"
                style={{ marginBottom: "0px" }}
              >
                <Input
                  name="CategoryJudge"
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
                            onFinishScreen={(obj) => {
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
            <Row style={{ justifyContent: "center" }}>
              <Col span={8}>
                <label style={{ color: "#14468c", fontWeight: "700" }}>
                  部位
                </label>
                <div>&ensp;</div>
                <List
                  grid={{ gutter: 24, column: 1 }}
                  dataSource={[{}]}
                  renderItem={(item) => (
                    <List.Item>
                      <Card className="scroll" style={{ width: "98%" }}>
                        {fromSoure.SiteCode &&
                          fromSoure.SiteCode.map((res) => {
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
                          })}
                      </Card>
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={14} className="scrollbar">
                <label style={{ color: "#14468c", fontWeight: "700" }}>
                  所見
                </label>
                <div>&ensp;</div>
                <List
                  grid={{ gutter: 24, column: 1 }}
                  dataSource={[{}]}
                  renderItem={(item) => (
                    <List.Item>
                      <Card className="scroll" style={{ width: "98%" }}>
                        {fromSoure.FindingsCode &&
                          fromSoure.FindingsCode.map((res) => {
                            return (
                              <div
                                className={
                                  res.findings_code === activeLink2
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
                          })}
                      </Card>
                    </List.Item>
                  )}
                />
              </Col>
              <Col style={{ position: "relative" }}>
                <Button
                  type="primary"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                  }}
                  onClick={() => {
                    this.ConfirmBtn();
                  }}
                >
                  選択
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={16}>
                <Table
                  dataSource={this.state.dataSource1}
                  rowKey={(record) => record.id}
                  // rowSelection={{
                  //   type: 'radio',
                  //   onChange: (selectedRowKeys, selectedRows) => {
                  //   }
                  // }}
                  size="small"
                  bordered={true}
                  rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
                  onRow={(record, index) => {
                    return {
                      onClick: (event) => {
                        this.setState({ rowSelect: record  ,indexTable: index,  selectedRows: [record],});
                      },
                    };
                  }}
                  pagination={this.state.isLoadingTable1}
                  style={{ width: "99%" }}
                  scroll={{ y: "323px" }}
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
                          style={{textAlign:'right'}}
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
                   width={200}
                    title="部位"
                    dataIndex=""
                    render={(row, record, index) => {
                      return (
                        <Row>
                          <Col span={7}>
                            <Form.Item
                              style={{ marginBottom: "0px" }}
                              name={["tableData", index, "W3_site_cd"]}
                            >
                              <Input
                                style={{textAlign:'right' ,width: "95%"}}
                                onChange={(e) =>
                                  this.handleChangeInput(
                                    rowSelect,
                                    e.target.value,
                                    "W3_site_cd"
                                  )
                                }
                                name="W3_site_cd"
                                onDoubleClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 800,
                                      component: (
                                        <WS0178001_QuerySiteInfo
                                          Li_SiteClasify={
                                            record.site_classification
                                          }
                                          Lo_SiteCode={record.W3_site_cd}
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
                          <Col span={17}>
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
                          <Col span={3}>
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
                                style={{textAlign:'right' ,width: "95%"}}
                                onDoubleClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 800,
                                      component: (
                                        <WS0179001_InquiryFindingInfo
                                          Li_FindingsClassify={
                                            record.site_classification
                                          }
                                          Lo_FindingsCode={
                                            record.W3_findings_cd
                                          }
                                          Lo_JudeValue=""
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
                          <Col span={21}>
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
                            style={{
                              color: Color(record?.Expression_19)?.Foreground,
                            }}
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
                                    <WS0285001_JudgeQuery
                                      Li_JudgeLevel={
                                        this.state.dataForm.Li_JudgeLevel
                                      }
                                      Lio_Judge={record.W3_determine_val}
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
                          let arrTemp = [{ W3_serial_num: "", W3_site_cd: "" }];
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
                          style={{ border: "none", marginRight: '5px', color: "green"}}
                          icon={<SaveOutlined />}
                          onClick={() => this.saveDataUp(record)}
                        ></Button>
                        <Button
                          hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource1, record.id)}
                          size="small"
                          style={{ border: "none", color: 'red'  }}
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
              <Col span={8}>
                <Table
                  dataSource={this.state.dataSource2}
                  rowKey={(record) => record.id}
                  // rowSelection={{
                  //   type: "radio",
                  //   onChange: (selectedRowKeys, selectedRows) => {},
                  // }}
                  size="small"
                  bordered={true}
                  loading={this.state.isLoadingTable2}
                  scroll={{ y: "323px" }}
                >
                  <Table.Column
                    title="前回 部位"
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
                    title={this.state.lastDate.Expression_4}
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
                            style={{
                              border: "none",
                              color: Color(record?.Expression_3)?.Foreground,
                            }}
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
                    this.lastTimeDoBtn();
                  }}
                  type="primary"
                >
                  前回DO
                </Button>
                <Button
                  onClick={() => {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({
                        flg_731: 1,
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
                  確&emsp;定
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
)(WS0731001_FindingsInputNormalSelect);
