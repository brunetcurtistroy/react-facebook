import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2674011_InsuranceInfo extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '保険情報';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="insurance-info">
        <Card title="保険情報">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="受診日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="個人番号"
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
              label="エラー内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">個人情報</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2674011_InsuranceInfo);
