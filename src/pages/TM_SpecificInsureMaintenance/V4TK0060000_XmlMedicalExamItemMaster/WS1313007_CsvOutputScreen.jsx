import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1313007_CsvOutputScreen extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'CSV出力画面';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="csv-output-screen">
        <Card title="CSV出力画面">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="日付（文字）"
            >
              <Input type="text" />
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1313007_CsvOutputScreen);
