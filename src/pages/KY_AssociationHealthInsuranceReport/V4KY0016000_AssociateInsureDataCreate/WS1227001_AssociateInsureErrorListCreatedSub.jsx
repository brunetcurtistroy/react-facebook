import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Checkbox, } from "antd";

class WS1227001_AssociateInsureErrorListCreatedSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '協会けんぽエラーリスト作成SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="associate-insure-error-list-created-sub">
        <Card title="協会けんぽエラーリスト作成SUB">
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
            >
              <Button type="primary">印　刷</Button>
            </Form.Item>
            <Form.Item
              name=""
              label="確認"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">は　い</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1227001_AssociateInsureErrorListCreatedSub);
