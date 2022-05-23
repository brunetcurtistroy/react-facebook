import React from "react";
import { connect } from "react-redux";

import { Card, Form, Checkbox, Radio, Input, Button, } from "antd";

class WS2249005_AutoCreate extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '自動作成';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="auto-create">
        <Card title="自動作成">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="個人変動"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="結果値生成"
            >
              <Radio.Group>
                <Radio value="">検査略名を設定します</Radio>
                <Radio value="">実際の値に近い内容を設定します</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
              name=""
              label="部位桁数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="所見桁数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="判定値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">A判定～</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">1判定～</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2249005_AutoCreate);
