import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1220004_CodeSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'コード設定';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="code-setting">
        <Card title="コード設定">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="ZAIDANA2.オプション"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="ZAIDANA2.オプション_001"
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1220004_CodeSetting);
