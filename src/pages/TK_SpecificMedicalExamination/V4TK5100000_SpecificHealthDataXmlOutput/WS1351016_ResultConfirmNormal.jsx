import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1351016_ResultConfirmNormal extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '結果確認[正常]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="result-confirm-normal">
        <Card title="結果確認[正常]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="受診/利用者総数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="エラー人数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="エラー項目数"
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
              <Button type="primary">260</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1351016_ResultConfirmNormal);
