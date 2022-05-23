import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Checkbox, } from "antd";

class WS1366023_ResultConfirmError extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '結果確認[エラー]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="result-confirm-error">
        <Card title="結果確認[エラー]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="受診/利用者総数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="エラー人数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="エラー項目数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="チェック_エラー人数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="チェック_エラー項目数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">LOG表示</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">チェックエラー表示</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">260</Button>
            </Form.Item>
            <Form.Item
              name=""
              label="確認"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1366023_ResultConfirmError);
