import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS1444016_DunningInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '督促入力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="dunning-input">
        <Card title="督促入力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="督促実施日[文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="支援コード"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">明　細</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">更　新</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1444016_DunningInput);
