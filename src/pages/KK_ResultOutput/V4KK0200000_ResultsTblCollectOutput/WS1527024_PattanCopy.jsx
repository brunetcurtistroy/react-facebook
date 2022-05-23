import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Card,
  Form,
  Input,
  Radio,
  Button,
  Row,
  Col,
  message,
  Modal,
} from "antd";

import { ArrowDownOutlined, WarningOutlined } from "@ant-design/icons";
import WS1527024_PattanCopyService from "services/ResultOutput/ResultsTblCollectOutput/WS1527024_PattanCopyService";

class WS1527024_PattanCopy extends React.Component {
  static propTypes = {
    Li_ItemId: PropTypes.any,
    Li_Item: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "パターン複写";

    this.state = {
      isStandard: false,
    };
  }

  componentDidMount = () => {
    // const { Li_ItemId, Li_Item } = this.props;
    // console.log("Li: ", Li_ItemId, Li_Item);
    this.getScreenData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) this.getScreenData();
  };

  getScreenData = () => {
    const { Li_ItemId, Li_Item } = this.props;
    this.setState({ isStandard: false });
    WS1527024_PattanCopyService.getScreenDataService({
      Division: Li_ItemId,
      DocumentName: Li_Item,
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          ...res.data,
          CopySourceSelect: 0,
          CopyPatternClassify: "",
          PatternName: "",
        });
        this.forceUpdate();
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
    const { Li_ItemId, Li_Item, onFinishScreen } = this.props;
    WS1527024_PattanCopyService.RunF12Service({
      CopySourceSelect: values.CopySourceSelect,
      CopySourcePatternClassify: Li_ItemId,
      Li_Item: Li_Item,
      CopyPatternClassify: values.CopyPatternClassify,
      PatternName: values.PatternName,
    })
      .then((res) => {
        Modal.warning({
          icon: <WarningOutlined />,
          content: "処理終了",
          cancelButtonProps: { hidden: true },
        });
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
  };

  onChangeRadio = (e) => {
    if (e.target.value === 1) {
      this.setState({
        isStandard: true,
      });
    } else {
      this.setState({
        isStandard: false,
      });
    }
  };

  render() {
    return (
      <div className="pattan-copy">
        <Card title="パターン複写">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="CopySourceSelect" label="">
              <Radio.Group
                name="CopySourceSelect"
                onChange={this.onChangeRadio}
              >
                <Radio value={0}>指定</Radio>
                <Radio value={1}>標準</Radio>
              </Radio.Group>
            </Form.Item>
            <Row
              gutter={24}
              style={{ opacity: this.state.isStandard ? "0" : "" }}
            >
              <Col span={10}>
                <Form.Item name="CopySourcePatternClassify" label="区分">
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="Li_Item" label="名称">
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ justifyContent: "center" }}>
              <span style={{ margin: "15px 0" }}>
                <ArrowDownOutlined />
              </span>
            </Row>

            <Row gutter={24}>
              <Col span={10}>
                <Form.Item name="CopyPatternClassify" label="区分">
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="PatternName" label="名称">
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                実　行
              </Button>
            </Form.Item>
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
)(WS1527024_PattanCopy);
