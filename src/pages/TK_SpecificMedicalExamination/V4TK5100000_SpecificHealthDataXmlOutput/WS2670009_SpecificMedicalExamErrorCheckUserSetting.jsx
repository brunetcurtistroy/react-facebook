import React from "react";
import { connect } from "react-redux";

import { Card, Form, Select, Checkbox, Button, } from "antd";

class WS2670009_SpecificMedicalExamErrorCheckUserSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '特定健診エラーチェックユーザー設定';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="specific-medical-exam-error-check-user-setting">
        <Card title="特定健診エラーチェックユーザー設定">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="開始日"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>

          </Form>
          <Form
          >
            <Form.Item
              name=""
              label="STS[有効](ヘッダー)"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[有効](決済)"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[有効](検査)"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">検査別設定</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2670009_SpecificMedicalExamErrorCheckUserSetting);
