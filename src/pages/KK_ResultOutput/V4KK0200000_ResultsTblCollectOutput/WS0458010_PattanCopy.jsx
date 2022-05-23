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
} from "antd";
import PropTypes from "prop-types";
import WS0458010_PattanCopyService from "services/ResultOutput/ResultsTblCollectOutput/WS0458010_PattanCopyService";

class WS0458010_PattanCopy extends React.Component {
  static propTypes = {
    Li_PatternClassify: PropTypes.any,
    Li_Item: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "パッターン複写";

    this.state = {};
  }

  componentDidMount = () => {
    const { Li_PatternClassify, Li_Item } = this.props;
    this.formRef.current?.setFieldsValue({
      PatternClassify: Li_PatternClassify,
      item: Li_Item,
      CopyPatternClassify: "",
      PatternName: "",
    });
    this.forceUpdate();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      const { Li_PatternClassify, Li_Item } = this.props;
      this.formRef.current?.setFieldsValue({
        PatternClassify: Li_PatternClassify,
        item: Li_Item,
        CopyPatternClassify: "",
        PatternName: "",
      });
      this.forceUpdate();
    }
  };

  onFinish = (values) => {
    WS0458010_PattanCopyService.run_F12_Service({
      PatternClassify: values.PatternClassify,
      item: values.item,
      CopyPatternClassify: values.CopyPatternClassify,
      PatternName: values.PatternName,
    })
      .then((res) => {
        message.success("終了");
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen();
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
  };

  render() {
    return (
      <div className="pattan-copy">
        <Card title="パッターン複写">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
              <Col span={4}>
                <label>複写元</label>
              </Col>
              <Col span={6}>
                <Form.Item name="PatternClassify">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item name="item">
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={4}>
                <label>複写先</label>
              </Col>
              <Col span={6}>
                <Form.Item name="CopyPatternClassify">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item name="PatternName">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              登録
            </Button>
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
)(WS0458010_PattanCopy);
