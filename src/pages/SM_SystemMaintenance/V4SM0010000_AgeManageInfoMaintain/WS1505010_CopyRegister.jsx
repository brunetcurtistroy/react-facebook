import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1505010_CopyRegister extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写登録';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="copy-register">
        <Card title="複写登録">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="年齢タイトル"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="識別コード[新規]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="タイトル[新規]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">作　成</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1505010_CopyRegister);
