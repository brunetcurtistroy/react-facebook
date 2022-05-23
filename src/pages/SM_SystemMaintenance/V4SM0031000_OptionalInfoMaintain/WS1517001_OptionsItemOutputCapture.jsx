import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1517001_OptionsItemOutputCapture extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'オプションアイテム出力・取込';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="options-item-output-capture">
        <Card title="オプションアイテム出力・取込">
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
              <Button type="primary">出力</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">取込</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1517001_OptionsItemOutputCapture);
