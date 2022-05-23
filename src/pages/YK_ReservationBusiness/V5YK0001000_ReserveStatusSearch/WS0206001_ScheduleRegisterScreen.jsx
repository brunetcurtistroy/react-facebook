import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import PropTypes from "prop-types";

import axios from "configs/axios";

import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Spin,
  message,
} from "antd";
import moment from "moment";

class WS0206001_ScheduleRegisterScreen extends React.Component {
  static propTypes = {
    Li_ModifyPermission: PropTypes.any,
    Li_Situation: PropTypes.any,
    Li_Date: PropTypes.any,
    Li_Title: PropTypes.any,
    Li_Comment: PropTypes.any,

    Li_Date: PropTypes.any,
    Li_UserId: PropTypes.any,
    Li_DisplayDate: PropTypes.any,

    Lo_CorrectionExec: PropTypes.any,

    onScreenFinish: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "スケジュール登録画面";

    this.state = {
      isLoading: false,
      name: "",
      username: "",
    };
  }

  componentDidMount = () => {
    this.loadScheduleData();
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.formRef.current.resetFields();

      this.loadScheduleData();
    }
  }

  loadScheduleData = () => {
    console.log(this.props.Li_Date_FI);
    this.setState({ isLoading: true });

    axios
      .get("/api/reserve-status-search/schedule-register-screen/", {
        params: {
          // ...this.formRef.current.getFieldsValue(),
          // Date: moment(this.formRef.current.getFieldValue("DateChar")).format(
          //   "YYYY/MM/DD"
          // ),
          Li_UserId: this.props.Li_UserId,
          Li_ModifyPermision: this.props.Li_ModifyPermision,
          Li_Situation: this.props.Li_Situation,
          Li_Date_FI: this.props.Li_Date_FI,
          Li_Title: this.props.Li_Title,
          Li_Cmt: this.props.Li_Cmt,
          Li_Date_FL: this.props.Li_Date_FL,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({ name: res.data.UserId, username: res.data.username });
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  onFinish = (values) => {
    this.setState({ isLoading: true });
    axios
      .post("/api/reserve-status-search/schedule-register-screen/Update", {
        ...values,
        Date: moment(values.DateChar).format("YYYY/MM/DD"),
        DateChar: moment(values.DateChar).format("YYYY/MM/DD"),
        Li_Date_FI: this.props.Li_Date_FI,
        Li_Title: this.props.Li_Title,
        Li_Comment: this.props.Li_Comment,
        Li_UserId: this.props.Li_UserId,
        Li_ModifyPermission: this.props.Li_ModifyPermission,
        Li_Situation: this.props.Li_Situation,
        Li_DisplayDate: this.props.Li_DisplayDate,
        Li_Date_FL: this.props.Li_Date_FL,
        UserId: this.state.name,
      })
      .then((res) => {
        if (this.props.onScreenFinish) {
          this.props.onScreenFinish({ Lo_CorrectionExec: true });
        }
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    return (
      <div className="schedule-register-screen">
        <Card title="スケジュール登録画面">
          <Spin spinning={this.state.isLoading}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{
                ModifyPermission: this.props.Li_UserId
                  ? this.props.Li_ModifyPermission
                  : 0,
                Date:
                  this.props.Li_Situation === 1
                    ? this.props.Li_Date
                    : this.props.Li_Date || moment(),
                DateChar: moment(this.props.Li_Date_FI),

                Title: this.props.Li_Situation === 1 ? this.props.Li_Title : "",
                Comment:
                  this.props.Li_Situation === 1 ? this.props.Li_Comment : "",
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="DateChar" label="日付">
                    <VenusDatePickerCustom
                      formRefDatePicker={this.formRef}
                      format="YYYY/MM/DD"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <span style={{ float: "right" }}>
                      {this.props.flag === 0 ? (
                        <span>
                          更新 [
                          {moment(this.props.Li_Date_FL).isValid()
                            ? moment(this.props.Li_Date_FL).format("YYYY/MM/DD")
                            : this.props.Li_Date_FL}{" "}
                          {this.state.username}]
                        </span>
                      ) : null}
                      {this.props.flag === 1 ? (
                        <span>
                          更新 [&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {this.state.username}]
                        </span>
                      ) : null}
                    </span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="Title" label="掲題">
                    <Input type="text" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="Comment" label="内容">
                    <Input.TextArea type="text" rows={10} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ float: "right" }}
                    >
                      更新
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

export default WS0206001_ScheduleRegisterScreen;
