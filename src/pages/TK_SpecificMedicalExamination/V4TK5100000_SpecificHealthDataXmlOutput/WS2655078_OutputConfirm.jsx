import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Button, } from "antd";

class WS2655078_OutputConfirm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '出力確認';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="output-confirm">
        <Card title="出力確認">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="出力帳票"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M40.オプション"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="作成日(文字)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="提出日(文字)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="送信回数_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="出力先"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="決済情報作成"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="決済無受診券有"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">チェック</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">作成</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2655078_OutputConfirm);
