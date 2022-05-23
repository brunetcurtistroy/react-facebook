import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1512138_DirectEditing extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '直接編集';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="direct-editing">
        <Card title="直接編集">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="識別名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="オプション内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">更新</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1512138_DirectEditing);
