import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Modal, message} from "antd";
import TamperProofReleaseAction from "redux/AccountingBusiness/BillingIntegration/TamperProofRelease.actions"

class WS0961004_TamperProofRelease extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lo_ReleasedPresence: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '改竄防止解除';

    this.state = {
    };
  }
  
  F12() {
    const params = {
      PasswordEnter: this.formRef.current.getFieldValue('PasswordEnter')
    }
    this.setState({ isLoading: true })
    TamperProofReleaseAction.F12(params)
      .then(res => {
        if (res.data.message == "パスワードが違います") {
          Modal.warning({
            title: "パスワードが違います",
            width: 300
          });
        }
        else {
          if (this.props.onFinishScreen) {
            this.props.onFinishScreen({
              Lo_ReleasedPresence: res.ReleasedPresence,
              ProtectionFlag: res.ProtectionFlag,
            });
          }
        }
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  onFinish(values) {

  }

  render() {
    return (
      <div className="tamper-proof-release">
        <Card title="改竄防止解除">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="PasswordEnter"
              label="パスワード"
              rules={[
                { required: true, },
                { min: 10 },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Button type="primary"
                onClick={() => {
                  this.F12()
                }}
              >完了</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0961004_TamperProofRelease);
