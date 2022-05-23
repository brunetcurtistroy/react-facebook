import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Radio, Checkbox, } from "antd";

class WS2650016_ReserveChange extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '予約・変更';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="reserve-change">
        <Card title="予約・変更">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="初回日[文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="曜日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="D11.ＩＤ"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="漢字氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="D11.事業所コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="支社店コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="事業所名（漢字）"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者名（漢字）"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="D11.保健指導コースコード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M13.コース名称_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
              name=""
              label="保健指導区分"
            >
              <Radio.Group>
                <Radio value="">動機付支援</Radio>
                <Radio value="">積極的支援</Radio>
                <Radio value="">動機付相当</Radio>
                <Radio value="">モデル実施</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
              name=""
              label="初回①"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">登録</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">計画</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">入力</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2650016_ReserveChange);
