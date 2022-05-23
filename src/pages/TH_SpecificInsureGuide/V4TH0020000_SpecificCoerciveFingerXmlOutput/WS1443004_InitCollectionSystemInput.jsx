import React from "react";
import { connect } from "react-redux";

import { Card, Form, Select, Button, } from "antd";

class WS1443004_InitCollectionSystemInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '初回徴収方式入力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="init-collection-system-input">
        <Card title="初回徴収方式入力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="初回徴収方式(画面)"
            >
              <Select>
                <Select.Option value="">初回指導時全額徴収した場合</Select.Option>
                <Select.Option value="">初回指導時全額徴収しない場合</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1443004_InitCollectionSystemInput);
