import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1485009_NewHistory extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '新規履歴';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="new-history">
        <Card title="新規履歴">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="年月"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">作成</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1485009_NewHistory);
