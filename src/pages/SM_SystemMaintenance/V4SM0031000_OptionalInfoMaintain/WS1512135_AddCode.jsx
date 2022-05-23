import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1512135_AddCode extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'コード追加';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="add-code">
        <Card title="コード追加">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="項目名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="項目内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="項目"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">更新</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1512135_AddCode);
