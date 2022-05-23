import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1568001_FileNameAcquisition extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ファイル名取得';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="file-name-acquisition">
        <Card title="ファイル名取得">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1568001_FileNameAcquisition);
