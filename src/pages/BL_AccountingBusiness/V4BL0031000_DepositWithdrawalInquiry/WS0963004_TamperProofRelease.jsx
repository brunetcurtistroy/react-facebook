import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Modal } from "antd";

class WS0963004_TamperProofRelease extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "改竄防止解除";

    this.state = {
      PasswordLegitimate: 'can',
      ProtectionFlag: null
    };
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.formRef.current?.resetFields()
    }
  }

  passCompare() {
    if (this.state.PasswordLegitimate === this.formRef.current?.getFieldValue('PasswordEnter')) {
      this.setState({
        ProtectionFlag: 0
      })
    } else {
      Modal.warning({
        width: 300,
        title: 'パスワードが違います'
      })
    }
  }

  render() {
    return (
      <div className="tamper-proof-release">
        <Card title="改竄防止解除">
          <Form ref={this.formRef}>
            <Form.Item name="PasswordEnter" label="パスワード"
              rules={[{ required: true }, { max: 10 }]}
            >
              <Input type="password" maxLength={10} />
            </Form.Item>
            <Form.Item style={{ float: "right" }}>
              <Button type="primary" onClick={() => { this.passCompare() }}>
                確定
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0963004_TamperProofRelease);
