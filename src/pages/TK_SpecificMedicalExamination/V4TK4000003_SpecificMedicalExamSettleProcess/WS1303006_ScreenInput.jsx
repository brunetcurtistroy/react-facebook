import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, } from "antd";

class WS1303006_ScreenInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '画面入力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="screen-input">
        <Card title="画面入力">
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
              label="W4.健診機関番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.特定健診_基本部分_負担区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.特定健診_基本部分_負担内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.特定健診_詳細部分_負担区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.特定健診_詳細部分_負担内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.その他_追加項目_負担区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.その他_追加項目_負担内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.その他_ドック_負担区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.その他_ドック_負担内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.その他_ドック_保険者負担上限"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.請求区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.個別集団区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.基本委託単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.基本窓口負担金額"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.貧血健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.詳細窓口負担金額"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.心電図健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.追加窓口負担金額"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.眼底健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.【H30】クレアチニン健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.追加健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.単価合計金額"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.窓口負担金額"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.同時実施負担金額"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="W4.保険者への請求金額"
            >
              <Input type="text" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1303006_ScreenInput);
