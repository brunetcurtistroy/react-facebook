import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, } from "antd";

class WS1443001_ContractSelectScreen extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '*  契約選択画面';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="contract-select-screen">
        <Card title="*  契約選択画面">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="保険者番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M3.管掌名（漢字）"
            >
              <Input type="text" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1443001_ContractSelectScreen);
