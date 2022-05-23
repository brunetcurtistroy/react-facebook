import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2653004_EMailCompleted extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'メール完了';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="e-mail-completed">
        <Card title="メール完了">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="完了日(文字)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">確認</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2653004_EMailCompleted);
