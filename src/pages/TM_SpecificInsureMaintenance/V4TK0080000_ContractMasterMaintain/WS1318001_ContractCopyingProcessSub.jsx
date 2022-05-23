import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS1318001_ContractCopyingProcessSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'V4-TMS01020:契約 複写処理 SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="contract-copying-process-sub">
        <Card title="V4-TMS01020:契約 複写処理 SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="契約年度[元][年]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="内部番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約年度[先][年]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="内部番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約年度[元][月]"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="契約年度[先][月]"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">複写</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1318001_ContractCopyingProcessSub);
