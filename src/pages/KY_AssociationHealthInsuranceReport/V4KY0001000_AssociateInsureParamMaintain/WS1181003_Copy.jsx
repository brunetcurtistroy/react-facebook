import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1181003_Copy extends React.Component {
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
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="検査名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="複写先コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="検査名称_0001"
            >
              <Input type="text" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1181003_Copy);
