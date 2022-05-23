import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2624002_VisitsChangeConfirm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '受診変更確認';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="visits-change-confirm">
        <Card title="受診変更確認">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="個人番号(ID)"
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
              label="漢字氏名"
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
              label="生年月日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="時間帯"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="AM/PM区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="施設名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="ｎ次区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診コース"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約内容[略称]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="備考"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受付番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">受　付</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2624002_VisitsChangeConfirm);
