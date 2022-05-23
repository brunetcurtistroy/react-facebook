import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1176003_CopyRegisterScreenInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写登録（画面入力）';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="copy-register-screen-input">
        <Card title="複写登録（画面入力）">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="複写KEY"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="複写名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1176003_CopyRegisterScreenInput);
