import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Checkbox, Button, Row, Col, Space, message } from "antd";
import DisplayContentChangeService from "services/ReservationBusiness/ReserveStatusSearch/DisplayContentChangeService";
const styleDiv = {
  border: "1px solid #f0f0f0",
  marginBottom: "1em",
};
class WS2531063_DisplayContentChange extends React.Component {
  static propTypes = {
    Lio_DisplayContent: PropTypes.any,
    Lo_StsSave: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "表示内容変更";

    this.state = {};
  }
  componentDidMount = () => {
    this.getScreenData();
  };

  getScreenData = () => {
    DisplayContentChangeService.getScreenDataService()
      .then((res) => {
        this.setState({ dataList: res.data });
        this.formRef.current.setFieldsValue({
          ...res.data,
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

  confirmSave = (DisplayContent) => {
    DisplayContentChangeService.confirmService({
      DisplayContent: DisplayContent,
    })
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lo_StsSave: true,
            Lio_DisplayContent: this.getStringByFieldsList(),
          });
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

  getStringByFieldsList = () => {
    let stringList = "";
    for (let index = 1; index <= 18; index++) {
      let numberExpression = index < 10 ? "0" + index : index;
      let textString = this.state.dataList?.["Display" + numberExpression]
        ? "1"
        : "0";
      stringList = stringList + textString;
    }
    console.log("data format", stringList);
    return stringList;
  };

  onFinish = (values) => {
    this.onSaveBtn();
  };

  onSaveBtn = () => {
    let values = this.formRef.current.getFieldsValue();
    this.setState(
      {
        dataList: values,
      },
      () => {
        this.confirmSave(this.getStringByFieldsList());
      }
    );
  };

  render() {
    return (
      <div className="display-content-change">
        <Card title="表示内容変更">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={24}>
              <Col span={11} style={styleDiv}>
                <Form.Item name="Display01" valuePropName="checked">
                  <Checkbox>状態</Checkbox>
                </Form.Item>
                <Form.Item name="Display02" valuePropName="checked">
                  <Checkbox disabled={true}>受診日</Checkbox>
                </Form.Item>
                <Form.Item name="Display03" valuePropName="checked">
                  <Checkbox>受付番号</Checkbox>
                </Form.Item>
                <Form.Item name="Display04" valuePropName="checked">
                  <Checkbox>時間</Checkbox>
                </Form.Item>
                <Form.Item name="Display05" valuePropName="checked">
                  <Checkbox>契約情報</Checkbox>
                </Form.Item>
              </Col>
              <Col span={11} offset={1} style={styleDiv}>
                <Form.Item name="Display11" valuePropName="checked">
                  <Checkbox>個人番号</Checkbox>
                </Form.Item>
                <Form.Item name="Display12" valuePropName="checked">
                  <Checkbox>カナ氏名</Checkbox>
                </Form.Item>
                <Form.Item name="Display13" valuePropName="checked">
                  <Checkbox>漢字氏名</Checkbox>
                </Form.Item>
                <Form.Item name="Display14" valuePropName="checked">
                  <Checkbox>性別</Checkbox>
                </Form.Item>
                <Form.Item name="Display15" valuePropName="checked">
                  <Checkbox>年齢</Checkbox>
                </Form.Item>
                <Form.Item name="Display16" valuePropName="checked">
                  <Checkbox>生年月日</Checkbox>
                </Form.Item>
                <Form.Item name="Display17" valuePropName="checked">
                  <Checkbox>事業所コード</Checkbox>
                </Form.Item>
                <Form.Item name="Display18" valuePropName="checked">
                  <Checkbox>事業所名称</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={23} style={{ textAlign: "right" }}>
                <Space>
                  <Button type="primary" onClick={this.onSaveBtn}>
                    保存
                  </Button>
                  <Button type="primary" htmlType="submit">
                    確定
                  </Button>
                </Space>
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
)(WS2531063_DisplayContentChange);
