import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2698165_PrinterInfoInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'プリンタ情報入力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="printer-info-input">
        <Card title="プリンタ情報入力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="プリンター№"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="ユーザー設定プリンター名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="PRN"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">参照</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">登録</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2698165_PrinterInfoInput);
