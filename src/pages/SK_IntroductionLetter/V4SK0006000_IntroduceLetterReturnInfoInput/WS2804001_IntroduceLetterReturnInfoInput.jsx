import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Row,
  Col,
  DatePicker,
  Modal,
  Dropdown,
  Menu,
  message,
} from "antd";
import {
  SearchOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import moment from "moment";
import IntroduceLetterReturnInfoInputService from "services/IntroductionLetter/IntroduceLetterReturnInfoInput/IntroduceLetterReturnInfoInputService";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS0887001_IntroduceLetterVariousMasterInquiry from "pages/SK_IntroductionLetter/V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import WS2804013_ReturnInfoInput from "pages/SK_IntroductionLetter/V4SK0006000_IntroduceLetterReturnInfoInput/WS2804013_ReturnInfoInput";
import WS0917005_AskIssueInput from "pages/SK_IntroductionLetter/V4SK0009000_AskIssued/WS0917005_AskIssueInput";
import WS0898001_IntroduceLetterExtractMaintain from "pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0898001_IntroduceLetterExtractMaintain";

const grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class WS2804001_IntroduceLetterReturnInfoInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "紹介状返送情報入力";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.formRef.current.setFieldsValue({
      DateFChar: moment(),
      DateTChar: moment(),
    });
    this.forceUpdate();
    this.setState({ selectedRows: {}, isLoading: true });
    IntroduceLetterReturnInfoInputService.filterIntroduceLetterReturnInfoInputService(
      {
        DateFChar: moment().format("YYYY/MM/DD"),
        DateTChar: moment().format("YYYY/MM/DD"),
      }
    )
      .then((res) => {
        console.log("res onChangeFilter", res);
        this.setState({ isLoading: false });
        this.formRef.current.setFieldsValue({
          DisplayList: res.data,
        });
        this.forceUpdate();
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  };
  handleClick = (event, row) => {
    console.log("Event", event);
    console.log("row", row);
    switch (event) {
      case "受診照会":
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "1500",
            component: <WS2583001_ConsultInquirySub />,
          },
        });
        break;
      case "返送結果入力":
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "1500",
            component: <WS2804013_ReturnInfoInput />,
          },
        });
        break;
      case "おたずね入力":
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "1500",
            component: <WS0917005_AskIssueInput />,
          },
        });
        break;
      case "紹介状保守":
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "1500",
            component: <WS0898001_IntroduceLetterExtractMaintain />,
          },
        });
        break;
      default:
        break;
    }
  };

  onFinish = (values) => {
    console.log("Values ", values);
    const {
      DateFChar,
      DateTChar,
      Department,
      MedicalInstitutions,
      PersonalNum,
      StsIssue,
      StsReturn,
    } = this.formRef.current.getFieldsValue();
    console.log("onChangeFilter", DateFChar, DateTChar);

    this.setState({ isLoading: true });
    IntroduceLetterReturnInfoInputService.filterIntroduceLetterReturnInfoInputService(
      {
        DateFChar:
          DateFChar > DateTChar
            ? DateTChar.format("YYYY/MM/DD")
            : DateFChar.format("YYYY/MM/DD"),
        DateTChar: DateTChar.format("YYYY/MM/DD"),
        PersonalNum: PersonalNum,
        Department: Department,
        MedicalInstitutions: MedicalInstitutions,
        StsIssue: StsIssue,
        StsReturn: StsReturn,
      }
    )
      .then((res) => {
        this.setState({ isLoading: false });
        console.log("res onChangeFilter", res);
        this.formRef.current.setFieldsValue({
          DisplayList: res.data,
        });
        this.forceUpdate();
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.formRef.current.setFieldsValue({
          DisplayList: [],
        });
        this.forceUpdate();
      })
      .finally(() => this.setState({ isLoading: false }));

    this.formRef.current.setFieldsValue({
      DateFChar: DateFChar > DateTChar ? DateTChar : DateFChar,
    });
  };

  render() {
    return (
      <div className="introduce-letter-return-info-input">
        <Card title="受診対象者検索・照会">
          <Form ref={this.formRef} onFinish={this.onFinish} {...grid}>
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item label="受診日" style={{ marginBottom: "-5px" }}>
                  <div className="d-flex align-items-center">
                    <Form.Item name="DateFChar" style={{ width: "120px" }}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        className="w-100"
                        allowClear={false}
                      />
                    </Form.Item>
                    <Form.Item>
                      <span>~</span>
                    </Form.Item>
                    <Form.Item name="DateTChar" style={{ width: "120px" }}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        className="w-100"
                        allowClear={false}
                      />
                    </Form.Item>
                  </div>
                </Form.Item>

                <Form.Item label="個人番号" style={{ marginBottom: "-5px" }}>
                  <div className="d-flex align-items-center">
                    <Form.Item name="PersonalNum" style={{ width: "120px" }}>
                      <Input.Search
                        readOnly
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1500,
                              component: (
                                <WS0248001_PersonalInfoSearchQuery
                                  getValueChild={({
                                    personal_number_id,
                                    kanji_name,
                                  }) => {
                                    this.formRef.current.setFieldsValue({
                                      PersonalNum: personal_number_id,
                                      kanji_name: kanji_name,
                                    });
                                    this.forceUpdate();
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
                    <Form.Item>
                      <span style={{ margin: "0 10px" }}>
                        {this.formRef.current
                          ? this.formRef.current.getFieldValue("kanji_name")
                          : ""}
                      </span>
                    </Form.Item>
                  </div>
                </Form.Item>

                <Form.Item label="診療科" style={{ marginBottom: "-5px" }}>
                  <div className="d-flex align-items-center">
                    <Form.Item name="Department" style={{ width: "100px" }}>
                      <Input.Search
                        readOnly
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1500,
                              component: (
                                <WS0887001_IntroduceLetterVariousMasterInquiry />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <span style={{ margin: "0 10px" }}>
                        {this.formRef.current
                          ? this.formRef.current.getFieldValue(
                              "department_name"
                            )
                          : ""}
                      </span>
                    </Form.Item>
                  </div>
                </Form.Item>

                <Form.Item label="医療機関" style={{ marginBottom: "-5px" }}>
                  <div className="d-flex align-items-center">
                    <Form.Item
                      name="MedicalInstitutions"
                      style={{ width: "100px" }}
                    >
                      <Input.Search
                        readOnly
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1500,
                              component: (
                                <WS0887001_IntroduceLetterVariousMasterInquiry />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <span style={{ margin: "0 10px" }}>
                        {this.formRef.current
                          ? this.formRef.current.getFieldValue(
                              "medical_institutions_short_name"
                            )
                          : ""}
                      </span>
                    </Form.Item>
                  </div>
                </Form.Item>

                <Form.Item label="紹介状" style={{ marginBottom: "-5px" }}>
                  <div className="d-flex align-items-center">
                    <Form.Item name="StsIssue" style={{ width: "100px" }}>
                      <Select>
                        <Select.Option value={0}>全て</Select.Option>
                        <Select.Option value={1}>発行</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Form.Item>

                <Form.Item label="返送結果" style={{ marginBottom: "-5px" }}>
                  <div className="d-flex align-items-center">
                    <Form.Item name="StsReturn" style={{ width: "100px" }}>
                      <Select>
                        <Select.Option value={0}>全て</Select.Option>
                        <Select.Option value={1}>あり</Select.Option>
                        <Select.Option value={2}>なし</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Form.Item>
                <Button
                  icon={<SearchOutlined />}
                  style={{ float: "right" }}
                  htmlType="submit"
                  loading={this.state.isLoading}
                >
                  検&emsp;&emsp;索
                </Button>
              </Col>
              <Col span={18}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue("DisplayList")
                      : []
                  }
                  rowKey={(record) => record.id}
                  loading={this.state.isLoading}
                >
                  <Table.Column title="受診日" dataIndex="visit_date_on" />
                  <Table.Column title="受付No" dataIndex="accepted_no" />
                  <Table.Column
                    title="個人番号"
                    dataIndex="personal_number_id"
                  />
                  <Table.Column
                    title="ﾒﾓ"
                    dataIndex="Expression_34"
                    render={(text, record) => {
                      switch (text) {
                        case 1:
                          return (
                            <InfoCircleOutlined
                              style={{ fontSize: 20, color: "#1890ff" }}
                            />
                          );

                        case 3:
                          return (
                            <WarningOutlined
                              style={{ fontSize: 20, color: "#faad14" }}
                            />
                          );

                        case 5:
                          return (
                            <CloseCircleOutlined
                              style={{ fontSize: 20, color: "#ff4d4f" }}
                            />
                          );

                        default:
                          return (
                            <MoreOutlined
                              style={{ fontSize: 20 }}
                              onClick={() => {
                                let title = '個人情報照会SUB' + ' [' + record.personal_number_id + ']'
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 1500,
                                    component: (
                                      <Card title={title}>
                                        <WS2584019_PersonalInfoInquirySub
                                          Li_PersonalNum={
                                            record.personal_number_id
                                          }
                                        />
                                      </Card>
                                    ),
                                  },
                                });
                              }}
                            />
                          );
                      }
                    }}
                  />
                  <Table.Column title="氏名" dataIndex="kanji_name" />
                  <Table.Column title="診療科" dataIndex="department_name" />
                  <Table.Column
                    title="医療機関"
                    dataIndex="medical_institutions_short_name"
                  />
                  <Table.Column title="発行" dataIndex="Expression_21" />
                  <Table.Column title="返送" dataIndex="Expression_23" />
                  <Table.Column title="おたずね" dataIndex="Expression_25" />
                  <Table.Column title="返送内容" dataIndex="Expression_27" />
                  <Table.Column
                    width="50px"
                    dataIndex=""
                    key="action"
                    render={(row) => (
                      <Dropdown.Button
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              onClick={() => this.handleClick("受診照会", row)}
                            >
                              受診照会
                            </Menu.Item>
                            <Menu.Item
                              onClick={() =>
                                this.handleClick("返送結果入力", row)
                              }
                            >
                              返送結果入力
                            </Menu.Item>
                            <Menu.Item
                              onClick={() =>
                                this.handleClick("紹介状保守", row)
                              }
                            >
                              紹介状保守
                            </Menu.Item>
                          </Menu>
                        )}
                      ></Dropdown.Button>
                    )}
                  />
                </Table>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
                  destroyOnClose={true}
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
)(WS2804001_IntroduceLetterReturnInfoInput);
