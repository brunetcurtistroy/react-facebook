import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2591001_SelectFolder extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'フォルダ選択';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="select-folder">
        <Card title="フォルダ選択">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2591001_SelectFolder);
