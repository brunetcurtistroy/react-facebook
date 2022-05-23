import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2676001_RequestCsvOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '依頼CSV出力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="request-csv-output">
        <Card title="依頼CSV出力">
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
              <Button type="primary">開 く</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">出 力</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2676001_RequestCsvOutput);
