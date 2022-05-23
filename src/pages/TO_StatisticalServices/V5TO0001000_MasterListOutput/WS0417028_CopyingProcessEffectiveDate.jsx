import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS0417028_CopyingProcessEffectiveDate extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写処理(適用日)';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="copying-process-effective-date">
        <Card title="複写処理(適用日)">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="適用開始日[元]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="適用開始日[先][文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="判定レベル[元]"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="判定レベル[先]"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">複写</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0417028_CopyingProcessEffectiveDate);
