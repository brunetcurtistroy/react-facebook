import React from "react";
import { connect } from "react-redux";

import { Card, Form, Checkbox, } from "antd";

class WS0273011_DisplayContentChange extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '表示内容変更';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="display-content-change">
        <Card title="表示内容変更">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="Display01"
              valuePropName="checked"
            >
              <Checkbox>状態</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display02"
              valuePropName="checked"
            >
              <Checkbox>受診日</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display03"
              valuePropName="checked"
            >
              <Checkbox>時間</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display04"
              valuePropName="checked"
            >
              <Checkbox>予約番号</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display05"
              valuePropName="checked"
            >
              <Checkbox>個人番号</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display06"
              valuePropName="checked"
            >
              <Checkbox>ｶﾅ氏名</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display07"
              valuePropName="checked"
            >
              <Checkbox>漢字氏名</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display08"
              valuePropName="checked"
            >
              <Checkbox>性別</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display09"
              valuePropName="checked"
            >
              <Checkbox>年齢</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display10"
              valuePropName="checked"
            >
              <Checkbox>生年月日</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display11"
              valuePropName="checked"
            >
              <Checkbox>受付No</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display12"
              valuePropName="checked"
            >
              <Checkbox>契約情報</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display13"
              valuePropName="checked"
            >
              <Checkbox>事業所情報</Checkbox>
            </Form.Item>
            <Form.Item
              name="Display14"
              valuePropName="checked"
            >
              <Checkbox>協会けんぽ請求情報</Checkbox>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0273011_DisplayContentChange);
