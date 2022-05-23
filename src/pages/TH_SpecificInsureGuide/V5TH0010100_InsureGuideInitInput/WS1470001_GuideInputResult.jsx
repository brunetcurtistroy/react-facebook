import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1470001_GuideInputResult extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'V4-THK00083:指導入力[結果]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="guide-input-result">
        <Card title="V4-THK00083:指導入力[結果]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="希望日"
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
              label="ＩＤ"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M1EX.漢字氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="カナ氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="性別"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="年齢"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M1EX.生年月日"
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
              label="M3.管掌名（漢字）"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証記号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証番号"
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
              label="M13.コース名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="実施日"
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
              label="M11.支援内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="D20.支援量"
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
            >
              <Button type="primary">前回DO</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">健診連携</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1470001_GuideInputResult);
