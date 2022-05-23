import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2654025_AddInspect extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査追加';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="add-inspect">
        <Card title="検査追加">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="表示順"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="検査コード"
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
            >
              <Button type="primary">確定</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2654025_AddInspect);
