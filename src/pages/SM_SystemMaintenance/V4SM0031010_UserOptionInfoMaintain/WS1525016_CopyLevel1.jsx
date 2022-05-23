import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1525016_CopyLevel1 extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'コピー[Level1]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="copy-level1">
        <Card title="コピー[Level1]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="種別コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コピー先コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">登録</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1525016_CopyLevel1);
