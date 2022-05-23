import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2713035_NormalValueAutoSet extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '正常値自動設定';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="normal-value-auto-set">
        <Card title="正常値自動設定">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="FORMAT"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FORMAT_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">パターン</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">自動作成</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2713035_NormalValueAutoSet);
