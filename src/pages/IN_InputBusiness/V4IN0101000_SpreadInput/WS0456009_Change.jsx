import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Modal,
  InputNumber,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import ChangeService from "services/InputBusiness/SpreadInput/ChangeService";

class WS0456009_Change extends React.Component {
  static propTypes = {
    Li_Seq: PropTypes.any,
    Li_Item: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "変更";

    this.state = {};
  }
  componentDidMount = () => {
    const { Li_Item } = this.props;
    this.formRef.current?.setFieldsValue({
      ChangeDestinationNum: "",
      ChangeDestinationName: Li_Item,
    });
    this.forceUpdate();
  };

  onFinish = (values) => {
    Modal.confirm({
      title: "確認",
      icon: <InfoCircleOutlined />,
      content: "確認して下さい",
      onOk: () => {
        const { Li_Seq, onFinishScreen } = this.props;
        ChangeService.ChangeService({
          Seqno: Li_Seq,
          ChangeDestinationNum: values.ChangeDestinationNum,
          ChangeDestinationName: values.ChangeDestinationName,
        })
          .then((res) => {
            message.success("終了");
            if (onFinishScreen) {
              onFinishScreen();
            }
          })
          .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error("エラーが発生しました");
              return;
            }
            message.error(res.data.message);
          });
      },
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      const { Li_Item } = this.props;
      this.formRef.current?.setFieldsValue({
        ChangeDestinationNum: "",
        ChangeDestinationName: Li_Item,
      });
      this.forceUpdate();
    }
  };

  render() {
    const { Li_Seq, Li_Item } = this.props;
    return (
      <div className="change">
        <Card title="変更">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
              <Col span={5}>
                <label>変更元ｺｰﾄﾞ</label>
              </Col>
              <Col span={6} style={{ textAlign: "right" }}>
                <span>{Li_Seq}</span>
              </Col>
              <Col span={12} offset={1}>
                <span>{Li_Item}</span>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={5}>
                <label>変更先ｺｰﾄﾞ</label>
              </Col>
              <Col span={6}>
                <Form.Item name="ChangeDestinationNum">
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={12} offset={1}>
                <Form.Item name="ChangeDestinationName">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              実 行
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS0456009_Change);
