import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS0417025_CopyingProcess extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写処理';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="copying-process">
        <Card title="複写処理">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="区分"
            >
              <Select>
                <Select.Option value="">上書</Select.Option>
                <Select.Option value="">追加</Select.Option>
                <Select.Option value="">複写</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">実  行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0417025_CopyingProcess);
