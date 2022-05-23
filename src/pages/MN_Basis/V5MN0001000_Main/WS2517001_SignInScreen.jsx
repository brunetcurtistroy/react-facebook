import React from "react";
import { connect } from "react-redux";

import { 
  Form, Input, Button, Checkbox, Card, Spin, Alert,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { loginUserInfo, setHospital } from "redux/user/user.actions";
import { clear } from "redux/alert/alert.actions";
import { history } from "constants/BrowserHistory";

import "./WS2517001_SignInScreen.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class WS2517001_SignInScreen extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'サインイン(画面)';

    this.state = {
      hospitalCode: props.match.params.hospital,

      // Status
      loading: false,
      modifyModalVisible: false,
    };

    this.props.setHospital(this.state.hospitalCode);

    this.onFinish = this.onFinish.bind(this);

    if (props.currentUser) {
      history.push("/");
    }
  }

  onFinish (values) {
    this.props.clear();
    this.setState({
      loading: true,
    })
    this.props.loginUserInfo({
      hospital: this.state.hospitalCode,
      username: values.username,
      remember: values.remember,
      password: values.password,
    }).then(() => {
      this.setState({
        loading: false,
      })
    });
  };

  render() {
    
    return (
      <div className="login-page">
        <div style={{ minHeight: "100vh" }}>
          <Card
            title={"ログイン施設先名：" + this.state.hospitalCode}
            style={{ maxWidth: '500px', margin: '0 auto', top: '100px' }}
          >
            <Spin spinning={this.state.loading}>
              {this.props.alertReducer.message ? (
                <Alert
                  style={{ marginBottom: "15px" }}
                  showIcon
                  message={this.props.alertReducer.message}
                  type={this.props.alertReducer.type || "error"}
                />
              ) : null}
              <Form
                ref={this.formRef}
                {...layout}
                name="login_form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  label="ユーザー名"
                  rules={[{ required: true, }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />} placeholder="ユーザー名入力"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="パスワード"
                  rules={[{ required: true, }]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="パスワード入力"
                  />
                </Form.Item>

                <Form.Item
                  {...tailLayout}
                  name="remember" valuePropName="checked"
                >
                  <Checkbox>
                    ログイン状態を保持する
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  {...tailLayout}
                >
                  <Button type="primary" htmlType="submit">
                    サインイン
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ userReducer, alertReducer }) => ({
  alertReducer: alertReducer,
  currentUser: userReducer.user,
});
const mapDispatchToProps = (dispatch) => ({
  loginUserInfo: (userInfo) => dispatch(loginUserInfo(userInfo)),
  setHospital: (hospitalCode) => dispatch(setHospital(hospitalCode)),
  clear: () => dispatch(clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2517001_SignInScreen);
