import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS2677001_AssociationConsultQualifyResultCapture extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '協会受診資格結果取込';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="association-consult-qualify-result-capture">
        <Card title="協会受診資格結果取込">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="取込フォルダ名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">開 く</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">実  行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2677001_AssociationConsultQualifyResultCapture);
