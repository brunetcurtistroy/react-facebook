import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  Form,
  Input,
  Spin,
  message,
  Button,
  Table,
  Row,
  Col,
  Modal,
  Space,
} from "antd";
import WS1873003_SiteInquiry from "pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1873003_SiteInquiry.jsx";
import WS1004007_JudgeSelect from "pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS1004007_JudgeSelect.jsx";
import WS1874004_FindingInquiry from "pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1874004_FindingInquiry.jsx";
import FindingsInputNormalAction from "redux/InputBusiness/SpreadInput/FindingsInputNormal.action";
import { PlusOutlined, DeleteOutlined, SaveOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import WS0285001_JudgeQuery from "pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery";
import WS0719001_GuideMatterSet from "./WS0719001_GuideMatterSet";
import WS0178001_QuerySiteInfo from "pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0178001_QuerySiteInfo";
import WS0179001_InquiryFindingInfo from "pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0179001_InquiryFindingInfo";
import WS0272001_CautionGuideNotesSearchQuery from "pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0272001_CautionGuideNotesSearchQuery";
import WS0720001_NotesSet from "./WS0720001_NotesSet";
import WS0737001_GuideMatterSettingSpread from "./WS0737001_GuideMatterSettingSpread";
import { debounce } from "lodash";
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

const styleFm = { marginBottom: "0px" };
class WS0728001_FindingsInputNormal extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.number,
    Li_ReserveNum: PropTypes.number,
    Li_InspectCode: PropTypes.number,
    Li_PatternCode: PropTypes.string,
    Li_CategoryCode: PropTypes.number,
    Li_PersonalNum: PropTypes.string,
    Li_JudgeLevel: PropTypes.number,
    Li_LastTimeInitialDisplay: PropTypes.any,
    Li_LeadershipMattersHowToAdd: PropTypes.string,
    Lio_FindingsCategoryChange: PropTypes.any,
    Lio_GuidanceAndAttentionChange: PropTypes.any,
    Li_FindingsInputNumRows: PropTypes.number,
    Li_FindingsInputNumDigits: PropTypes.number,
    Li_SerialNumAdded: PropTypes.string,
    Lio_Change: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "所見入力[通常]";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingForm: true,
      dataForm: {},
      isLoadingTable: true,
      dataSource1: [],
      selectedRows: [],
      indexTable: 0,
      rowSelect: {},
      isLoadingTable2: true,
      dataSource2: [],
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
        flg_728: 1,
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
    this.setState({ isLoadingForm: true });
    const data = {
      Li_CourseLevel: this.props.Li_CourseLevel,
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_InspectCode: this.props.Li_InspectCode,
      Li_PatternCode: this.props.Li_PatternCode,
      Li_CategoryCode: this.props.Li_CategoryCode,
      Li_PersonalNum: this.props.Li_PersonalNum,
      Li_JudgeLevel: this.props.Li_JudgeLevel,
      Li_LastTimeInitialDisplay: this.props.Li_LastTimeInitialDisplay,
      Li_LeadershipMattersHowToAdd: this.props.Li_LeadershipMattersHowToAdd,
      Li_FindingsInputNumRows: this.props.Li_FindingsInputNumRows,
      Li_FindingsInputNumDigits: this.props.Li_FindingsInputNumDigits,
      Li_SerialNumAdded: this.props.Li_SerialNumAdded,
    };
    FindingsInputNormalAction.GetScreenDataAction(data)
      .then((res) => {
        if (res) {
          this.formRef.current.setFieldsValue({
            W5_category_judge: res.W5_category_judge,
          });
          this.formRef.current.setFieldsValue({ tableData: res });
          this.setState({ dataForm: res });
          this.getListDataUpTable();
          this.getListDataDownTable();
        }
      })
      .finally(() => this.setState({ isLoadingForm: false }));
  }
  getListDataUpTable() {
    this.setState({ isLoadingTable: true });
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      Li_CategoryCode: this.state.dataForm.Li_CategoryCode,
      Li_JudgeLevel: this.state.dataForm.Li_JudgeLevel,
    };
    FindingsInputNormalAction.GetListDataUpTableAction(data)
      .then((res) => {
        if (res) {
          const constvertType = (input) => (input === 0 ? "" : input);
          const newArr = res.map((s) => ({
            ...s,
            W3_findings_cd: constvertType(s.W3_findings_cd),
            W3_findings_sect: constvertType(s.W3_findings_sect),
            W3_site_cd: constvertType(s.W3_site_cd),
            W3_site_sect: constvertType(s.W3_site_sect),
            W3_determine_val: constvertType(s.W3_determine_val),
            W3_findings_name: constvertType(s.W3_findings_name),
            W3_serial_num: constvertType(s.W3_serial_num),
            W3_site_name: constvertType(s.W3_site_name),
          }));
          this.setState({ dataSource1: newArr , selectedRows: [res[0]], indexTable: 0, });
          this.formRef.current.setFieldsValue({ tableData: newArr });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }));
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
      Li_CategoryCode: this.state.dataForm.Li_CategoryCode,
      W3_serial_num: record.W3_serial_num,
      W3_site_cd: record.W3_site_cd,
      W3_site_name: record.W3_site_name,
      W3_findings_cd: record.W3_findings_cd,
      W3_findings_name: record.W3_findings_name,
      W3_determine_val: record.W3_determine_val,
    };
    FindingsInputNormalAction.SaveDataUpAction(data)
      .then((res) => {
        if (res) message.success("成功");
        this.getListDataUpTable();
        this.setState({
          Lio_FindingsCategoryChange: 1,
          Lio_GuidanceAndAttentionChange: 1,
        });
      })
      .catch((err) => message.error("エラー"));
  }
  deleteData(record) {
    if (record.id) {
      FindingsInputNormalAction.DeleteDataUpAction({
        id: record.id,
      })
        .then((res) => {
          message.success("成功");
          this.getListDataUpTable();
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
      this.getListDataUpTable();
    }
  }
  getListDataDownTable() {
    this.setState({ isLoadingTable2: true });
    const data = {
      Li_ReserveNum: this.state.dataForm.PreviousReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      Li_JudgeLevel: this.state.dataForm.Li_JudgeLevel,
      LastDate: this.state.dataForm.LastDate,
    };
    FindingsInputNormalAction.GetListDataDownTableAction(data)
      .then((res) => {
        if (res) {
          const constvertType = (input) => (input === 0 ? "" : input);
          const newArr = res.map((s) => ({
            ...s,
            findings_classification: constvertType(s.findings_classification),
            findings_code: constvertType(s.findings_code),
            site_classification: constvertType(s.site_classification),
            site_code: constvertType(s.site_code),
            findings_name: constvertType(s.findings_name),
            judgment_value: constvertType(s.judgment_value),
            serial_number: constvertType(s.serial_number),
            site_name: constvertType(s.site_name),
          }));
          this.setState({ dataSource2: newArr });
          this.formRef.current.setFieldsValue({ tableData2: newArr });
        }
      })
      .finally(() => this.setState({ isLoadingTable2: false }));
  }
  previouDoF11() {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      PreviousReserveNum: this.state.dataForm.PreviousReserveNum,
    };
    FindingsInputNormalAction.PreviousDoF11Action(data)
      .then((res) => {
        if (res.message === "Success") {
          message.success("成功");
          this.getListDataUpTable();
          this.getListDataDownTable();
          this.setState({
            Lio_FindingsCategoryChange: 1,
            Lio_GuidanceAndAttentionChange: 1,
          });
        }
      })
      .catch((err) => message.error("エラー"));
  }
  onFinish(values) {}
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  f7() {
    if (
      this.state.dataForm.Li_LeadershipMattersHowToAdd === "" ||
      this.state.dataForm.Li_LeadershipMattersHowToAdd == null
    ) {
    } else if (this.state.dataForm.Li_LeadershipMattersHowToAdd === "0") {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 800,
          component: (
            <WS0272001_CautionGuideNotesSearchQuery
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
    FindingsInputNormalAction.f7Action(data)
      .then((res) => {
        if (res) {
          message.success("成功");
          this.getListDataUpTable();
          this.getListDataDownTable();
        }
      })
      .catch((err) => message.error("エラー"));
  }
  changeCategoryJudge = debounce((e) => {
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_CategoryCode: this.state.dataForm.Li_CategoryCode,
      Li_CourseLevel: this.state.dataForm.Li_CourseLevel,
      W5_category_judge: e.target.value,
      Li_JudgeLevel: this.state.dataForm.Li_JudgeLevel,
    };
    FindingsInputNormalAction.ChangeCategoryJudgeAction(data)
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
    const { rowSelect } = this.state;
    return (
      <div className="findings-input-normal">
        <Card title="所見入力[通常]">
          <Spin spinning={this.state.isLoadingForm}>
            <Form ref={this.formRef} onFinish={this.onFinish}>
              <Form.Item name="W5_category_judge" label="判定">
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
                        width: "60%",
                        component: (
                          <WS0285001_JudgeQuery onFinishScreen={(obj) => {}} />
                        ),
                      },
                    });
                  }}
                />
              </Form.Item>
              <Table
                dataSource={this.state.dataSource1}
                pagination={false}
                loading={this.state.isLoadingTable}
                // rowSelection={{
                //   type: "radio",
                //   onChange: (selectedRowKeys, selectedRows) => {
                //   },
                // }}
                size='small'
                bordered={true}
                rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
                rowKey={(record) => record.id}
                onRow={(record, index) => {
                  return {
                    onClick: (event) => {
                      this.setState({ rowSelect: record ,indexTable: index,  selectedRows: [record],});
                    },
                  };
                }}
                scroll={{ y: "282px" }}
              >
                <Table.Column
                width={80}
                  title="連番"
                  dataIndex="W3_serial_num"
                  render={(row, record, index) => {
                    return (
                      <Form.Item
                        style={styleFm}
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
                ></Table.Column>
                <Table.Column
                width={240}
                  title="部位"
                  dataIndex="W3_site_cd"
                  render={(row, record, index) => {
                    return (
                      <Row>
                        <Col span={8}>
                          <Form.Item
                            style={styleFm}
                            name={["tableData", index, "W3_site_cd"]}
                          >
                            <Input
                              style={{textAlign: 'right',  width: "98%"}}
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
                                    width: "60%",
                                    component: (
                                      <WS0178001_QuerySiteInfo
                                        Li_SiteClassify={
                                          this.state.site_classification
                                        }
                                        Lo_SiteCode={record.W3_site_cd}
                                        onFinishScreen={(obj) => {}}
                                      />
                                    ),
                                  },
                                });
                              }}
                              // onChange={()=>{
                              //   if(Vl3StsJudge >0){
                              //     this.formRef.current.setFieldsValue({
                              //       W3_site_name: site_name
                              //     })
                              //   }
                              // }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            style={styleFm}
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
                ></Table.Column>
                <Table.Column
                  title="所見"
                  dataIndex="W3_findings_cd"
                  render={(row, record, index) => {
                    return (
                      <Row>
                        <Col span={5}>
                          <Form.Item
                            style={styleFm}
                            name={["tableData", index, "W3_findings_cd"]}
                          >
                            <Input
                              style={{textAlign: 'right' ,width: "98%"}}
                              name="W3_findings_cd"
                              onChange={(e) =>
                                this.handleChangeInput(
                                  rowSelect,
                                  e.target.value,
                                  "W3_findings_cd"
                                )
                              }
                              onDoubleClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "60%",
                                    component: (
                                      <WS0179001_InquiryFindingInfo
                                        onFinishScreen={(obj) => {}}
                                      />
                                    ),
                                  },
                                });
                              }}
                              // onChange={()=>{
                              //   if(Vl3StsFindingInfo){
                              //     this.formRef.current.setFieldsValue({
                              //       W3_findings_name: findings_name,
                              //       W3_determine_value: judgment_value
                              //     })
                              //   }
                              // }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={19}>
                          <Form.Item
                            style={styleFm}
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
                ></Table.Column>
                <Table.Column
                width={80}
                  title="判定"
                  dataIndex="W3_determine_val"
                  render={(row, record, index) => {
                    return (
                      <Form.Item
                        style={styleFm}
                        name={["tableData", index, "W3_determine_val"]}
                      >
                        <Input
                          style={{
                            color: Color(record?.Expression_17)?.Foreground,
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
                                width: "60%",
                                component: (
                                  <WS0285001_JudgeQuery
                                    onFinishScreen={(obj) => {}}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    );
                  }}
                ></Table.Column>
                <Table.Column
                  align="center"
                  width={70}
                  title={() => (
                    <Button
                      size="small"
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        let arrTemp = [
                          {
                            W3_determine_val: "",
                            W3_findings_cd: "",
                            W3_findings_name: "",
                            W3_findings_sect: "",
                            W3_serial_num: "",
                            W3_site_cd: "",
                            W3_site_name: "",
                            W3_site_sect: "",
                          },
                        ];
                        this.formRef.current.setFieldsValue({
                          tableData: [...arrTemp, ...this.state.dataSource1],
                        });
                        this.setState({
                          dataSource1: [...arrTemp, ...this.state.dataSource1],
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
              <br />
              <label style={{ color: "#14468c", fontWeight: "700" }}>
                前回所見
              </label>
              <Table
                loading={this.state.isLoadingTable2}
                dataSource={this.state.dataSource2}
                pagination={false}
                // rowSelection={{
                //   type: "radio",
                //   onChange: (selectedRowKeys, selectedRows) => {
                //   },
                // }}
                bordered={true}
                size='small'
                rowKey={(record) => record.id}
                scroll={{ y: "282px" }}
              >
                <Table.Column
                  title="連番"
                  dataIndex="serial_number"
                  render={(row, record, index) => {
                    return (
                      <Form.Item
                        style={styleFm}
                        name={["tableData2", index, "serial_number"]}
                      >
                        <Input
                          name="serial_number"
                          style={{ border: "none" }}
                          readOnly
                        />
                      </Form.Item>
                    );
                  }}
                ></Table.Column>
                <Table.Column
                  title="部位"
                  dataIndex=""
                  render={(row, record, index) => {
                    return (
                      <Row>
                        <Col span={8}>
                          <Form.Item
                            style={styleFm}
                            name={["tableData2", index, "site_code"]}
                          >
                            <Input
                              name="site_code"
                              style={{ width: "98%", border: "none" }}
                              readOnly
                            />
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            style={styleFm}
                            name={["tableData2", index, "site_name"]}
                          >
                            <Input
                              name="site_name"
                              style={{ border: "none" }}
                              readOnly
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    );
                  }}
                ></Table.Column>
                <Table.Column
                  title="所見"
                  dataIndex=""
                  render={(row, record, index) => {
                    return (
                      <Row>
                        <Col span={8}>
                          <Form.Item
                            name={["tableData2", index, "findings_code"]}
                            style={styleFm}
                          >
                            <Input
                              name="findings_code"
                              style={{ width: "98%", border: "none" }}
                              readOnly
                            />
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            name={["tableData2", index, "findings_name"]}
                            style={styleFm}
                          >
                            <Input
                              name="findings_name"
                              style={{ border: "none" }}
                              readOnly
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    );
                  }}
                ></Table.Column>
                <Table.Column
                  title="判定"
                  dataIndex="judgment_value"
                  render={(row, record, index) => {
                    return (
                      <Form.Item
                        style={styleFm}
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
                ></Table.Column>
              </Table>
              <Space style={{ marginTop: "1em", float: "right" }}>
                <Button
                  onClick={() => {
                    this.f7();
                  }}
                  type="primary"
                >
                  指導事項
                </Button>
                <Button
                  onClick={() => {
                    Modal.confirm({
                      content: "前回の所見を取得しますか?",
                      cancelText: "は い",
                      okText: "いいえ",
                      className: "modal-confirm",
                      onCancel: () => this.previouDoF11(),
                    });
                  }}
                  type="primary"
                >
                  前回DO
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({
                        flg_728: 1,
                        data: this.state.dataSource1,
                        close: true,
                        Lio_FindingsCategoryChange:
                          this.state.Lio_FindingsCategoryChange,
                        Lio_GuidanceAndAttentionChange:
                          this.state.Lio_GuidanceAndAttentionChange,
                      });
                    }
                  }}
                >
                  確　定
                </Button>
              </Space>
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
)(WS0728001_FindingsInputNormal);
