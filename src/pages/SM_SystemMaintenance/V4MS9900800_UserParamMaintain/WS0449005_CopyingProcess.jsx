import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS0449005_CopyingProcess extends React.Component {
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
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FORMAT"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="備考"
            >
              <Input type="text" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0449005_CopyingProcess);
