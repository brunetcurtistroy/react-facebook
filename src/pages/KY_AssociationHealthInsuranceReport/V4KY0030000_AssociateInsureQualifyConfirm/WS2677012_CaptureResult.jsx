import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2677012_CaptureResult extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '取込結果表示';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="capture-result">
        <Card title="取込結果表示">
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
              label="KEKKAファイル数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="ERRORファイル数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="資格あり件数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="資格なし件数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="エラー件数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="予約№未取得件数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">Ｏ Ｋ</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2677012_CaptureResult);
