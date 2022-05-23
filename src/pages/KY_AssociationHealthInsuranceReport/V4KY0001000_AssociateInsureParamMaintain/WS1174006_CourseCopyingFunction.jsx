import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, } from "antd";

class WS1174006_CourseCopyingFunction extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'コース複写機能';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="course-copying-function">
        <Card title="コース複写機能">
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
              label=""
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
              name=""
              label="複写先コース"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="複写先コース名(略)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="複写先コース名(正)"
            >
              <Input type="text" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1174006_CourseCopyingFunction);
