import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2654016_TargetivesResultInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '目標・結果入力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="targetives-result-input">
        <Card title="目標・結果入力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="D21.結果"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="D21.目標"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">確定</Button>
            </Form.Item>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2654016_TargetivesResultInput);
