import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Radio, Button, } from "antd";

class WS1505013_CsvOutputScreen extends React.Component {
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
              label="年齢範囲[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="年齢範囲[T]"
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
              name=""
              label="区分"
            >
              <Radio.Group>
                <Radio value="">全件</Radio>
                <Radio value="">有効のみ</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">出力</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1505013_CsvOutputScreen);
