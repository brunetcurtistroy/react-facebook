import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Button, } from "antd";

class WS1319003_Copy extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="copy">
        <Card title="複写">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="年度[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="年度[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者名[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者名[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="年度"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1319003_Copy);
