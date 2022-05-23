import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Row, Col } from "antd";

class WS0487007_JudgeHighlow extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Lio_RightHandSide: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '判定のHighLow';

    this.state = {
    };
  }

  onFinish(values) {

  }
  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)
  render() {
    return (
      <div className="judge-highlow">
        <Card title="判定のHighLow">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="Expression_1">
              <Input type="text" readOnly />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item>
                  <Button type="primary">{this.getRawValue('Big') ? this.getRawValue('Big') : '大きい'}</Button>
                </Form.Item>
              </Col>
              <Col span={12} >
                <Form.Item style={{ float: 'right'  }}>
                  <Button type="primary"> {this.getRawValue('Small') ? this.getRawValue('Small') : '小さい'}</Button>
                </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0487007_JudgeHighlow);
