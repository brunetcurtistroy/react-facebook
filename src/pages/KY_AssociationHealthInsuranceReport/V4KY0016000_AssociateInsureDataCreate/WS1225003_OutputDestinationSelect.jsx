import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS1225003_OutputDestinationSelect extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '出力先選択';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="output-destination-select">
        <Card title="出力先選択">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="出力先パス"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="出力先区分"
            >
              <Select>
                <Select.Option value="">FD</Select.Option>
                <Select.Option value="">CD</Select.Option>
                <Select.Option value="">指定</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1225003_OutputDestinationSelect);
