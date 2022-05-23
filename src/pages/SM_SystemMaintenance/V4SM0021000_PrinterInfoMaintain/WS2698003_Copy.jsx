import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2698003_Copy extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="copy">
        <Card title="複写">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="プリンタ番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="プリンタ名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="新規プリンタ番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="プリンタ名[複写先]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">複写</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2698003_Copy);
