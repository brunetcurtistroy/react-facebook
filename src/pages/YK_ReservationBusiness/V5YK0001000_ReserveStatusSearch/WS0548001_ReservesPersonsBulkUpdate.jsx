import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  Input,
  Radio,
  Select,
  Button,
  Row,
  Col,
  message,
  DatePicker,
  Modal,
} from "antd";
import ReservesPersonsBulkUpdateService from "services/ReservationBusiness/ReserveStatusSearch/ReservesPersonsBulkUpdateService";
import moment from "moment-timezone";
import PropTypes from "prop-types";

const dateFormat = "YYYY/MM/DD";
class WS0548001_ReservesPersonsBulkUpdate extends React.Component {
  static propTypes = {
    Li_DateF: PropTypes.any,
    Li_DateT: PropTypes.any,
    Li_TimeDivision: PropTypes.any,
    Li_Facility: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "予約人数一括更新";

    this.state = {
      ComboBoxList: [],
      loadingBTN: false
    };
  }

  componentDidMount = () => {
    this.formRef.current.setFieldsValue({
      ManageDivision: 0,
      PeriodFChar: this.props.Li_DateF
        ? moment(this.props.Li_DateF).startOf("month")
        : moment().startOf("month"),
      PeriodTChar: this.props.Li_DateF
        ? moment(this.props.Li_DateT).endOf("month")
        : moment().endOf("month"),
      FacilityType: this.props.Li_Facility ? this.props.Li_Facility : 1,
    });
    this.getScreenData();
  };
  getScreenData = () => {
    ReservesPersonsBulkUpdateService.getScreenDataService()
      .then((res) => {
        this.setState({ ComboBoxList: res.data.ComboBoxList });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  onFinish = (values) => {
    this.setState({loadingBTN : true})
    if (moment(values.PeriodFChar) > moment(values.PeriodTChar)) {
      Modal.error({
        title: "Error",
        content: `日付範囲ｴﾗｰ`,
        width: 300,
      });
      return;
    }
    ReservesPersonsBulkUpdateService.SearchExecService({
      ManageDivision: values.ManageDivision,
      PeriodFChar: moment(values.PeriodFChar).format(dateFormat),
      PeriodTChar: moment(values.PeriodTChar).format(dateFormat),
      FacilityType: values.FacilityType,
    })
      .then((res) => {
        this.setState({loadingBTN : false})
        message.success("成功");
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  render() {
    return (
      <div className="reserves-persons-bulk-update">
        <Card title="予約人数一括更新">
          <Form ref={this.formRef} onFinish={this.onFinish} size="small">
            <Form.Item
              name="ManageDivision"
              label="コース"
              style={{ position: "relative" }}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
            >
              <Radio.Group>
                <Radio value={0}>全て</Radio>
                <Radio value={1}>コース</Radio>
                <Radio value={2}>検査</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="期　間"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
            >
              <Row>
                <Form.Item
                  name="PeriodFChar"
                  rules={[
                    { required: true, message: "日付を入力してください" },
                  ]}
                >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                </Form.Item>
                <Col span={2} style={{ textAlign: "center" }}>
                  <span>~</span>
                </Col>
                <Form.Item
                  name="PeriodTChar"
                  rules={[
                    { required: true, message: "日付を入力してください" },
                  ]}
                >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                </Form.Item>
              </Row>
            </Form.Item>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="FacilityType"
                  label="施　設"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 21 }}
                >
                  <Select allowClear>
                    {this.state.ComboBoxList?.map((item, index) => {
                      return (
                        <Select.Option value={item.LinkedField} key={index}>
                          {item.DisplayField}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item>
                  <Button
                  loading={this.state.loadingBTN}
                    type="primary"
                    htmlType="submit"
                    style={{ float: "right" }}
                  >
                    実行
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0548001_ReservesPersonsBulkUpdate);
