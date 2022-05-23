import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS2656096_OutputConfirm extends React.Component {
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
              label="送信回数"
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
              label="継続終了日"
            >
              <Select>
                <Select.Option value="">最終評価</Select.Option>
                <Select.Option value="">継続最終</Select.Option>

              </Select>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2656096_OutputConfirm);
