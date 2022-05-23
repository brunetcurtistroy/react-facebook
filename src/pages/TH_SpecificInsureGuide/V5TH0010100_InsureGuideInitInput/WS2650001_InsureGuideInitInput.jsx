import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import {
  SearchOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Row,
  Col,
  DatePicker,
  Dropdown,
  Menu,
  Space,
  message,
} from "antd";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import Modal from "antd/lib/modal/Modal";
import WS2657078_VouchersInput from "./WS2657078_VouchersInput";
import WS2653001_GuideInputProvenSub from "./WS2653001_GuideInputProvenSub";
import WS1423001_SupportPlanManualCreate from "./WS1423001_SupportPlanManualCreate";
import WS2650016_ReserveChange from "pages/TH_SpecificInsureGuide/V5TH0010100_InsureGuideInitInput/WS2650016_ReserveChange.jsx";
import PropTypes from "prop-types";
import moment from "moment";
import InsureGuideInitInputService from "services/SpecificInsureGuide/InsureGuideInitInput/InsureGuideInitInputService";
class WS2650001_InsureGuideInitInput extends React.Component {
  static propTypes = {
    Li_FirstDateF: PropTypes.any,
    Li_FirstDateT: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "保健指導初回入力";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,
    };
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        component: null,
      },
    });
  };

  componentDidMount = () => {
    if (this.props.Li_FirstDateF && this.props.Li_FirstDateT)
      this.formRef.current.setFieldsValue({
        FirstDateFChar: this.props.Li_FirstDateF,
        FirstDateTChar: this.props.Li_FirstDateT,
      });
    else
      this.formRef.current.setFieldsValue({
        FirstDateFChar: moment(),
        FirstDateTChar: moment(),
      });
  };

  onFinish = (values) => {
    console.log("Values", values);
    this.setState({ isLoadingTable: true });
    InsureGuideInitInputService.getInsureGuideInitInputService({
      FirstDateFChar: values.FirstDateFChar?.format("YYYY/MM/DD"),
      FirstDateTChar: values.FirstDateTChar?.format("YYYY/MM/DD"),
    })
      .then((res) => {
        console.log("OnFinish", res);
        this.setState({ dataSource: res.data });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.setState({ isLoadingTable: false });
      })
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  };

  render() {
    return (
      <div className="insure-guide-init-input">
        <Card title="保健指導初回入力">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={24}>
              <Col md={8} lg={6}>
                <Form.Item
                  name="FirstDateFChar"
                  label="初回日"
                  style={{ marginRight: "5px", float: "left" }}
                >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={false} />
                </Form.Item>
                <Form.Item name="FirstDateTChar" label="~">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={false} />
                </Form.Item>

                <Button
                  icon={<SearchOutlined />}
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  検　　索
                </Button>
              </Col>
              <Col md={16} lg={18}>
                <Table
                  size="small"
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={true}
                  bordered={true}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="初回日" dataIndex="date_on" key="" />
                  <Table.Column
                    title="個人番号"
                    dataIndex="personal_number_id"
                    key=""
                  />
                  <Table.Column
                    title="ﾒﾓ"
                    render={(value, record) => {
                      return (
                        <Button
                          icon={<MoreOutlined />}
                          onClick={() => {
                            let title = '個人情報照会SUB' + ' [' + record.personal_number_id + ']'
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "60%",
                                visible: true,
                                component: (
                                  <Card title={title}>
                                    <WS2584019_PersonalInfoInquirySub
                                      Li_PersonalNum={record.personal_number_id}
                                      onFinishScreen={() => {
                                        this.closeModal();
                                      }}
                                    />
                                  </Card>
                                ),
                              },
                            });
                          }}
                        ></Button>
                      );
                    }}
                  />
                  <Table.Column title="氏名" dataIndex="kanji_name" key="" />
                  <Table.Column
                    title="保険者番号"
                    dataIndex="insurer_number"
                    key=""
                  />
                  <Table.Column title="区分" dataIndex="Expression_9" key="" />
                  <Table.Column
                    title="コース情報"
                    dataIndex="Expression_11"
                    key=""
                  />
                  <Table.Column title="実施" dataIndex="Expression_27" key="" />
                  <Table.Column
                    title="利用券"
                    dataIndex="Expression_29"
                    key=""
                  />
                  <Table.Column title="決済" dataIndex="Expression_31" key="" />
                  <Table.Column
                    width={70}
                    render={(value, record) => {
                      return (
                        <Dropdown
                          overlay={() => (
                            <Menu>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "60%",
                                      visible: true,
                                      component: (
                                        <WS2650016_ReserveChange
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                新規
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "60%",
                                      visible: true,
                                      component: (
                                        <WS2650016_ReserveChange
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                変更
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "60%",
                                      visible: true,
                                      component: (
                                        <Card title="aaa">
                                          <Form.Item
                                            label={
                                              <ExclamationCircleOutlined
                                                style={{
                                                  fontSize: "25px",
                                                  color: "#eab726",
                                                }}
                                              />
                                            }
                                          >
                                            <span> 複写しますか？</span>
                                          </Form.Item>
                                          <Space style={{ float: "right" }}>
                                            <Button
                                              onClick={() => {
                                                this.setState({
                                                  ...this.state,
                                                  isLoading: true,
                                                });
                                              }}
                                            >
                                              &emsp;はい&emsp;
                                            </Button>
                                            <Button
                                              style={{ borderColor: "#08c" }}
                                              onClick={() => {
                                                this.closeModal();
                                              }}
                                            >
                                              &emsp;いいえ&emsp;
                                            </Button>
                                          </Space>
                                        </Card>
                                      ),
                                    },
                                  });
                                }}
                              >
                                取消
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "80%",
                                      visible: true,
                                      component: (
                                        <WS1423001_SupportPlanManualCreate
                                          Li_FirstDate={record.date_on}
                                          Li_Id={record.personal_number_id}
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                計画
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "60%",
                                      visible: true,
                                      component: (
                                        <WS2657078_VouchersInput
                                          Li_Date={record.date_on}
                                          Li_Id={record.personal_number_id}
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                利用券・契約
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "60%",
                                      visible: true,
                                      component: (
                                        <WS2653001_GuideInputProvenSub
                                          Li_Date={record.date_on}
                                          Li_PersonalNum={
                                            record.personal_number_id
                                          }
                                          Li_SerialNum={record.serial_number}
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                入力
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
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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
)(WS2650001_InsureGuideInitInput);
