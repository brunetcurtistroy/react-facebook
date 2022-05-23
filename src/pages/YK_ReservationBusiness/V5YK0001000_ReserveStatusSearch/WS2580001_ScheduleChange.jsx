import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Button,
  Row,
  Col,
  DatePicker,
  Table,
  Modal,
  Dropdown,
  Menu,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import WS0206001_ScheduleRegisterScreen from "pages/YK_ReservationBusiness/V5YK0001000_ReserveStatusSearch/WS0206001_ScheduleRegisterScreen.jsx";
import ScheduleChangeService from "services/ReservationBusiness/ReserveStatusSearch/ScheduleChangeService";
import moment from "moment";

class WS2580001_ScheduleChange extends React.Component {
  static propTypes = {
    Li_Date: PropTypes.any,
    Lo_StsModify: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "スケジュール変更";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      Date: moment().format("YYYY/MM/DD"),
      isLoadingTable: false,
    };
  }

  onFinish(values) {}
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  componentDidMount = () => {
    if (this.props.Li_Date) {
      this.setState(
        { Date: moment(this.props.Li_Date).format("YYYY/MM/DD") },
        () => this.getGlobalEvents()
      );
    } else {
      this.getGlobalEvents();
    }
  };

  getGlobalEvents = () => {
    this.setState({ isLoadingTable: true });
    ScheduleChangeService.getGlobalEventsService({ Date: this.state.Date })
      .then((res) => {
        this.setState({ dataSource: res.data });
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
        this.setState({ isLoadingTable: false });
      });
  };
  deleteLine = (id) => {
    this.setState({ isLoadingTable: true });

    ScheduleChangeService.deleteLineService({ id: id })
      .then((res) => {
        this.getGlobalEvents();
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
        this.setState({ isLoadingTable: false });
      });
  };

  handleClick = (event, item) => {
    switch (event.key) {
      case "edit":
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: "40%",
            component: (
              <WS0206001_ScheduleRegisterScreen
                flag={0}
                Li_ModifyPermission={item.Li_ModifyPermission}
                Li_Situation={1}
                Li_Date_FI={moment(item.date_on).format("YYYY/MM/DD")}
                Li_Title={item.title}
                Li_Comment={item.content}
                Li_Date_FL={moment(item.updated_on).format("YYYY/MM/DD")}
                Li_UserId={item.user_code}
                Li_DisplayDate={""}
                onScreenFinish={({ Lo_CorrectionExec }) => {
                  if (Lo_CorrectionExec) {
                    this.getGlobalEvents();
                    this.closeModal();
                  }
                }}
              />
            ),
          },
        });
        break;
      case "delete":
        this.deleteLine(item.id);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="schedule-change">
        <Card title="スケジュール変更">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              Date: this.props.Li_Date ? moment(this.props.Li_Date) : moment(),
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="Date">
                  <VenusDatePickerCustom
                    formRefDatePicker={this.formRef}
                    format="YYYY/MM/DD"
                    name="Date"
                    value={this.state.Date}
                    onChange={(date) => {
                      this.setState(
                        {
                          Date: moment(date).format("YYYY/MM/DD"),
                        },
                        () => this.getGlobalEvents()
                      );
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Button
                    type="primary"
                    style={{ float: "right" }}
                    onClick={() => {
                      console.log(454454545,this.props.Li_Date);
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "40%",
                          component: (
                            <WS0206001_ScheduleRegisterScreen
                              Li_Date={moment(this.state.Date)}
                              Li_Date_FI={moment(this.props.Li_Date).format("YYYY/MM/DD")}
                              flag={1}
                              onScreenFinish={({ Lo_CorrectionExec }) => {
                                if (Lo_CorrectionExec) {
                                  this.getGlobalEvents();
                                  this.closeModal();
                                }
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  >
                    新規
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Table
            showHeader={false}
            dataSource={this.state.dataSource}
            pagination={false}
            rowKey={(record) => record.id}
            size="small"
            loading={this.state.isLoadingTable}
          >
            <Table.Column dataIndex="title" key="title" />
            <Table.Column
              width="50px"
              dataIndex=""
              key="action"
              render={(row) => (
                <Dropdown.Button
                  size="small"
                  overlay={() => (
                    <Menu>
                      <Menu.Item
                        key="edit"
                        onClick={(event) => this.handleClick(event, row)}
                      >
                        修正
                      </Menu.Item>
                      <Menu.Item
                        key="delete"
                        onClick={(event) => {
                          Modal.confirm({
                            title: "確認",
                            icon: (
                              <QuestionCircleOutlined
                                style={{ color: "#1890ff" }}
                              />
                            ),
                            content: "削除しますか",
                            okText: "削除",
                            cancelText: "キャンセル",
                            onOk: () => {
                              this.handleClick(event, row);
                            },
                          });
                        }}
                      >
                        削除
                      </Menu.Item>
                    </Menu>
                  )}
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
)(WS2580001_ScheduleChange);
