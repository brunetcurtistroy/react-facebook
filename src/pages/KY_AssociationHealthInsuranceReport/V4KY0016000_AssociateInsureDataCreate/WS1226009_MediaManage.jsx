import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, } from "antd";

class WS1226009_MediaManage extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '媒体管理';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="media-manage">
        <Card title="媒体管理">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD1.結果データ有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD1.請求データ有無"
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1226009_MediaManage);
