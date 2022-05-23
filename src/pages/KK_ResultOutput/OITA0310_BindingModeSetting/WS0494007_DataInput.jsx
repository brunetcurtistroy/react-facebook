import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Input, Radio, Button, Space, Row, Col } from "antd";

class WS0494007_DataInput extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_Operator: PropTypes.any,
    Lo_Variable: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "ﾃﾞｰﾀ入力";

    this.state = {
      Expression_3: false,
      Lio_Operator: "",
      Lo_Variable: "",
    };
  }

  onFinish = (values) => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_Operator: this.state.Lio_Operator,
        Lo_Variable: this.state.Lo_Variable,
      });
    }
  };

  onChangeRadio = (event) => {
    this.setState({
      Expression_3: event.target.value === 15 ? true : false,
      Lio_Operator: event.target.value,
      Lo_Variable: event.target.id,
    });
  };

  render() {
    return (
      <div className="data-input">
        <Card title="ﾃﾞｰﾀ入力">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="Lio_Operator" label="">
              <Radio.Group name="Lio_Operator" onChange={this.onChangeRadio}>
                <Row gutter={24}>
                  <Col span={6}>
                    <Radio value={0} id="+" style={{ width: "100%" }}>
                      ＋
                    </Radio>
                    <Radio value={1} id="-" style={{ width: "100%" }}>
                      －
                    </Radio>
                    <Radio value={2} id="*" style={{ width: "100%" }}>
                      ×
                    </Radio>
                    <Radio value={3} id="/" style={{ width: "100%" }}>
                      ÷
                    </Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value={4} id="MOD" style={{ width: "100%" }}>
                      剰余
                    </Radio>
                    <Radio value={5} id="^" style={{ width: "100%" }}>
                      指数
                    </Radio>
                    <Radio value={6} id="=" style={{ width: "100%" }}>
                      ＝
                    </Radio>
                    <Radio value={7} id="<>" style={{ width: "100%" }}>
                      ≠
                    </Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value={8} id="<=" style={{ width: "100%" }}>
                      ≦
                    </Radio>
                    <Radio value={9} id=">=" style={{ width: "100%" }}>
                      ≧
                    </Radio>
                    <Radio value={10} id="<" style={{ width: "100%" }}>
                      ＜
                    </Radio>
                    <Radio value={11} id=">" style={{ width: "100%" }}>
                      ＞
                    </Radio>
                  </Col>
                  <Col span={6}>
                    <Radio value={12} id="NOT" style={{ width: "100%" }}>
                      NOT
                    </Radio>
                    <Radio value={13} id="AND" style={{ width: "100%" }}>
                      ∩
                    </Radio>
                    <Radio value={14} id="OR" style={{ width: "100%" }}>
                      ∪
                    </Radio>
                    <Radio value={15} id="" style={{ width: "100%" }}>
                      定数
                    </Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Space style={{ float: "right" }}>
              <Form.Item name="Free" label="" hidden={!this.state.Expression_3}>
                <Input
                  onChange={(event) => {
                    this.setState({ Lo_Variable: event.target.value });
                  }}
                  type="text"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  決定
                </Button>
              </Form.Item>
            </Space>
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
)(WS0494007_DataInput);
