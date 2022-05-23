import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  Input,
  message,
  Button,
  Table,
  Modal,
  Row,
  Spin,
  Dropdown,
  Menu,
  Col,
} from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx";
import WS2576004_CalendarSunSub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2576004_CalendarSunSub.jsx";
import IdConsultDateModifyAction from "redux/CooperationRelated/OcrCaptureStartUp/IdConsultDateModify.action";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import WS0650001_DocumentBatchCreateSub from "pages/JZ_AdvancePreparation/V4JZ0102003_DocumentBatchCreate/WS0650001_DocumentBatchCreateSub";
import WS2637001_OverallResultDisplayInput from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637001_OverallResultDisplayInput";
import WS0898001_IntroduceLetterExtractMaintain from "pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0898001_IntroduceLetterExtractMaintain";
import WS2624002_VisitsChangeConfirm from "pages/ZZ_Others/DEVTOOL0200_CreateTestForMedicalExamInfo/WS2624002_VisitsChangeConfirm";
import WS3020036_CoupledPrintInstruction from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS3020036_CoupledPrintInstruction";
const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class WS3108016_IdConsultDateModify extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "ID・受診日修正";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRowTableFirst: [],
      isLoadingTable: false,
      dataSource: [],
      isLoadingForm: false,
      kanji_name: "",
      PersonalNumChar: "",
      DateChar: "",
    };
  }
  componentDidMount() {
    this.dataConsultHistorySub();
    this.getScreenData();
  }
  onFinish(values) {}
  dataConsultHistorySub() {
    this.setState({ isLoadingTable: true });
    const data = {
      person_num: this.props.Li_PersonalNum,
    };
    IdConsultDateModifyAction.dataConsultHistorySubAction(data)
      .then((res) => {
        console.log(res);
        this.setState({ isLoadingTable: false });
        if (res) {
          this.setState({ dataSource: res ? res : [] });
        }
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false });
        const res = err.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(err.response.data.message);
      });
  }
  getScreenData() {
    this.setState({ isLoadingForm: true });
    const data = {
      serial_num: this.props.Li_SerialNum,
      branch_num: this.props.Li_BranchNum,
      person_num: this.props.Li_PersonalNum,
      consult_date: this.props.Li_Date,
    };
    IdConsultDateModifyAction.getScreenDataAction(data)
      .then((res) => {
        this.setState({ isLoadingForm: false });
        if (res) {
          this.formRef.current.setFieldsValue({
            PersonalNumChar: res.PersonalNumChar,
          });
          this.formRef.current.setFieldsValue({ DateChar: res.DateChar });
          this.setState({ kanji_name: res.kanji_name });
        }
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false });
        const res = err.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(err.response.data.message);
      });
  }
  onChangeInputPersonalNumChar(event) {
    this.setState({ PersonalNumChar: event.target.value });
  }
  onChangeInputDateChar(event) {
    this.setState({ DateChar: event.target.value });
  }

  update() {
    const data = {
      serial_num: this.props.Li_SerialNum,
      branch_num: this.props.Li_BranchNum,
      person_num: this.state.PersonalNumChar
        ? this.state.PersonalNumChar
        : this.formRef.current.getFieldValue("PersonalNumChar"),
      consult_date: this.state.DateChar
        ? this.state.DateChar
        : this.formRef.current.getFieldValue("DateChar"),
    };
    console.log(data);
    IdConsultDateModifyAction.updateAction(data)
      .then((res) => {
        message.success("成功");
        this.getScreenData();
        this.dataConsultHistorySub();
      })
      .catch((err) => message.error("エラー"));
  }

  handleSelectRowsTableFirst = (selectedRowTableFirst) => {
    console.log(selectedRowTableFirst);
    this.setState({ selectedRowTableFirst });
  };
  ReturnComponent = (component) => {
    let components = {
      WS2583001_ConsultInquirySub,
      WS0650001_DocumentBatchCreateSub,
      WS2637001_OverallResultDisplayInput,
      WS0898001_IntroduceLetterExtractMaintain,
      WS2624002_VisitsChangeConfirm,
      WS3020036_CoupledPrintInstruction,
    };
    return components[component];
  };
  callModal = (props, width, nameScreen) => {
    let Component = this.ReturnComponent(nameScreen);
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: width,
        component: (
          <Component
            {...props}
            onFinishScreen={(outPut) => {
              if (outPut.nameScreen === nameScreen) {
                this.loadData(this.state.initParams);
              }
              this.closeModal();
            }}
          />
        ),
      },
    });
  };
  renderMenu = (record) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          let props = { Li_ReserveNum: record.reservation_number };
          console.log(props);
          this.callModal(props, 1500, "WS2583001_ConsultInquirySub");
        }}
      >
        受診照会
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          let props = {
            Li_CourseLevel: "",
            Li_ReserveNum: record.reservation_number,
            Li_OutputUnit: "",
            Li_OutputPattern: "",
          };
          this.callModal(props, 1500, "WS0650001_DocumentBatchCreateSub");
        }}
      >
        予約関連
      </Menu.Item>
      <Menu.Item
        hidden={record.Expression_7 === "予約"}
        onClick={() => {
          let props = {
            Li_MenuOption: "",
            Li_MenuAdminRights: "",
            Li_MenuAuthority: "",
            Li_SubjectNotBeChangedMode: "",
            Li_CourseLevel: "",
            Li_ReserveNum: record.reservation_number,
          };
          this.callModal(props, 1500, "WS2637001_OverallResultDisplayInput");
        }}
      >
        結果照会
      </Menu.Item>
      <Menu.Item
        hidden={record.Expression_7 === "予約"}
        onClick={() => {
          let props = {
            Li_CourseLevel: "",
            Li_ReserveNum: record.reservation_number,
          };
          this.callModal(props, 600, "WS3020036_CoupledPrintInstruction");
        }}
      >
        結果印刷
      </Menu.Item>
      <Menu.Item
        hidden={record.Expression_7 === "予約"}
        onClick={() => {
          let props = {
            Li_MenuOption: "",
            Li_PersonalNum: record.id,
            Li_ReserveNum: record.reservation_number,
          };
          this.callModal(
            props,
            1500,
            "WS0898001_IntroduceLetterExtractMaintain"
          );
        }}
      >
        紹介状
      </Menu.Item>
      <Menu.Item
        hidden={record.Expression_7 === "受付"}
        onClick={() => {
          let props = {
            Li_CourseLevel: "",
            Li_ReserveNum: record.reservation_number,
            Li_AcceptOrCancel: "",
            Li_Date: record.visit_date_on,
            Li_AcceptNum: "",
          };
          this.callModal(props, 1500, "WS2624002_VisitsChangeConfirm");
        }}
      >
        受付
      </Menu.Item>
    </Menu>
  );

  render() {
    const { selectedRowTableFirst } = this.state;
    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst,
    };
    return (
      <div className="id-consult-date-modify">
        <Card title="ID・受診日修正">
          <Spin spinning={this.state.isLoadingForm}>
            <Form ref={this.formRef} onFinish={this.onFinish} {...grid}>
              <Row gutter={16} className="mb-2">
                <Col span={12}>
                  <Form.Item name="PersonalNumChar" label="個人番号">
                    <Input.Search
                      type="text"
                      onChange={(e) =>
                        this.onChangeInputPersonalNumChar(e, "PersonalNumChar")
                      }
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1500,
                            component: (
                              <WS0248001_PersonalInfoSearchQuery
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
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <span style={{ lineHeight: "35px" }}>
                    {this.state.kanji_name}
                  </span>
                </Col>
                <Col span={10}></Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="DateChar" label="受診日">
                    <Input.Search
                      type="text"
                      onChange={(e) =>
                        this.onChangeInputDateChar(e, "DateChar")
                      }
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 800,
                            component: (
                              <WS2576004_CalendarSunSub
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
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}></Col>
              </Row>

              <Button
                onClick={() => {
                  this.update();
                }}
                type="primary"
                style={{ float: "right", marginBottom: "15px" }}
              >
                確定
              </Button>
            </Form>
          </Spin>
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            rowKey={(res) => res.id}
            bordered={true}
            rowSelection={{
              type: "radio",
              onChange: (selectedRowKeys, selectedRows) => {
                IdConsultDateModifyAction.user_Action_4Action({
                  person_num: this.state.PersonalNumChar
                    ? this.state.PersonalNumChar
                    : this.formRef.current.getFieldValue("PersonalNumChar"),
                })
                  .then((res) => {
                    if (!res || res.data || res.data.message) {
                      // message.success(res.data.message);
                      return;
                    }
                  })
                  .catch((err) => {
                    const res = err.response;
                    if (!res || res.data || res.data.message) {
                      message.error("エラーが発生しました");
                      return;
                    }
                    message.error(err.response.data.message);
                  });
              },
            }}
            pagination={false}
            onRow={(record, index) => ({
              onClick: (e) => {},
            })}
          >
            <Table.Column title="受診日" dataIndex="visit_date_on" />
            <Table.Column
              title="状態"
              dataIndex="Expression_7"
              render={(res) => {
                if (res === "受付") {
                  return <div style={{ color: "red" }}>{res}</div>;
                } else {
                  return <div style={{ color: "blue" }}>{res}</div>;
                }
              }}
            />
            <Table.Column title="契約情報" dataIndex="Expression_9" />
            <Table.Column
              width={60}
              render={(text, record, index) => (
                <Dropdown.Button
                  trigger="click"
                  size="small"
                  overlay={() => this.renderMenu(record)}
                ></Dropdown.Button>
              )}
            />
          </Table>
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
)(WS3108016_IdConsultDateModify);
