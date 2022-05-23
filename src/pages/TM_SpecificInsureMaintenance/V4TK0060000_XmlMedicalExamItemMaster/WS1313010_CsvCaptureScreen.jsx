import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1313010_CsvCaptureScreen extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'CSV取込画面';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="csv-capture-screen">
        <Card title="CSV取込画面">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="出力先"
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1313010_CsvCaptureScreen);
