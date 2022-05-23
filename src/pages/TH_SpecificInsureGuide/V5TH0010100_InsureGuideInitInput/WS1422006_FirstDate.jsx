import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1422006_FirstDate extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '初回①日付';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="first-date">
        <Card title="初回①日付">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="日付[文字]"
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1422006_FirstDate);
