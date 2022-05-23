import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Radio, Button } from "antd";

class WS0494006_HeaderInput extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lo_HeaderInfo: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "ﾍｯﾀﾞ入力";

    this.state = {};
  }

  onFinish = (values) => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({ Lo_HeaderInfo: values.Lo_HeaderInfo });
    }
  };

  render() {
    return (
      <div className="header-input">
        <Card title="ﾍｯﾀﾞ入力">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="Lo_HeaderInfo" label="">
              <Radio.Group>
                <Radio value="2010006">年齢</Radio>
                <Radio value="2010004">性別</Radio>
                <Radio value="2020007">続柄</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item style={{ float: "right" }}>
              <Button type="primary" htmlType="submit">
                決定
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
)(WS0494006_HeaderInput);
