import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Button, } from "antd";

class WS1537001_MedicalInstitutionNumberUpdateSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '医療機関番号更新SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="medical-institution-number-update-sub">
        <Card title="医療機関番号更新SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="医療機関番号"
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
              label="郵便番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="住所"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="電話番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="STS[協会けんぽ]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="特定健診"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="保健指導"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="日本病院会"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">照会</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1537001_MedicalInstitutionNumberUpdateSub);
