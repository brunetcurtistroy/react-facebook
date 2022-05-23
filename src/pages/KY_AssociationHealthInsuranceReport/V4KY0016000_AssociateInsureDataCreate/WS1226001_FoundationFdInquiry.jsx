import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1226001_FoundationFdInquiry extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '財団ＦＤ照会';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="foundation-fd-inquiry">
        <Card title="財団ＦＤ照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="TEXT-媒体"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="TEXT-結果"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">データ読取</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">訂正表示</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1226001_FoundationFdInquiry);
