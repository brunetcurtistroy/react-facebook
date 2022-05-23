import React from "react";
import { connect } from "react-redux";

import { Card, Form, Radio, Checkbox, Button, Row, Col } from "antd";
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
class WS0817008_Verification extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '確認';

    this.state = {
    };

    this.onFinish = this.onFinish.bind(this)
  }

  onFinish(values) {
    if (this.props.onFinishScreen) {
      values["Lo_StsRun"] = true
      console.log(values)
      this.props.onFinishScreen(values);
    }
  }

  render() {
    return (
      <div className="verification">
        <Card title="確認">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              Lio_ReplacementInstructions: this.props.Lio_ReplacementInstructions,
              Lio_StsHierarchical: this.props.Lio_StsHierarchical
            }}
          >
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '1rem', marginBottom: '1rem' }} >
              <Form.Item
                name="Lio_ReplacementInstructions"
                label="判&emsp;定&emsp;"
              >
                <Radio.Group>
                  <Radio style={radioStyle} value={1}>
                    全判定
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    未判定
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="Lio_StsHierarchical"
                label="階層化&emsp;"
                valuePropName="checked"
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </div>
            <Row>
              <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">は　い</Button>
              </Col>
              <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lo_StsRun: false
                    })
                  }
                }}>いいえ</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0817008_Verification);
