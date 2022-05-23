import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1567009_OutputDestinationAcquisition extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '出力先取得';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="output-destination-acquisition">
        <Card title="出力先取得">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="Out_ファイル名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">決定</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">キャンセル</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1567009_OutputDestinationAcquisition);
