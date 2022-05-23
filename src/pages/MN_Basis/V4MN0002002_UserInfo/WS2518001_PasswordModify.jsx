import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, message, } from "antd";

import { modifyUserpasswordAction } from "redux/user/user.actions";


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class WS2518001_PasswordModify extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'パスワード変更';

    this.state = {
      isLoading: false,
    };

    this.onFinish = this.onFinish.bind(this);
  }

  onFinish (event) {
    this.setState({ isLoading: true });
    let user = {
      current_password: event.current_password,
      password: event.password,
      password_confirmation: event.confirm,
    };
    this.props.modifyUserpasswordAction(user)
      .then((res) => {
        message.success(res.data.message);
      })
      .catch((error) => {
        const res = error.response;
        if (this.props.loggedIn && res && (res.status === 401)) {
          this.props.logoutUserInfo(this.props.hospitalCode);
          return;
        } else if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    return (
      <div className="modify-password-page">
        <Card
          title={"パスワード変更"}
        >
          <Form
            ref={this.formRef}
            {...layout}
            name="modify-password-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              label="ユーザーID"
              colon={false}
            >
              <Input
                type="text"
                value={this.props.currentUser.username}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="current_password"
              label="現在のパスワード"
              rules={[{ required: true, }]}
            >
              <Input
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="新パスワード"
              rules={[
                { required: true, },
                { min: 8 },
              ]}
            >
              <Input
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="パスワード（確認）"
              // dependencies={['password']}
              // hasFeedback
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('新パスワードとパスワード（確認）が一致しません。');
                  },
                }),
              ]}
            >
              <Input
                type="password"
              />
            </Form.Item>
            <Form.Item
              {...tailLayout}
            >
              <Button type="primary" htmlType="submit" loading={this.state.isLoading}>登録</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
  
}

const mapStateToProps = ({ userReducer, alertReducer, hospitalCode }) => ({
  alertReducer: alertReducer,
  currentUser: userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  alert: (action, message) => dispatch(action(message)),
  modifyUserpasswordAction: (user) => dispatch(modifyUserpasswordAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2518001_PasswordModify);
