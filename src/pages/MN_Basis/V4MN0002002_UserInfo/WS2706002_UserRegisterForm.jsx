import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  Card, Form, Input, Checkbox, Button, Alert, Tabs, DatePicker, Row, Col, Spin, message
} from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { clear } from "redux/alert/alert.actions";

import {
  createUserAction, getUserProfileAction, updateUserProfileAction
} from "redux/user/user.actions";

import axios from 'configs/axios';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
};

const { RangePicker } = DatePicker;

const usageRightKeyPosMap = {
  A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8
};

class WS2706002_UserRegisterForm extends React.Component {
  static propTypes = {
    Li_UserId: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ユーザー登録フォーム';

    this.state = {
      userId: props.Li_UserId || props.match?.params?.idUser || null,

      usageRightValues: [],

      // Status
      isUsageRightsDisabled: false,
      isLoadingInfo: false,
    };
    this.state.isEdit = this.state.userId ? true : false;

    this.onFinish = this.onFinish.bind(this);
    this.onRightsChange = this.onRightsChange.bind(this);
    this.onChangeAuthorityLevel = this.onChangeAuthorityLevel.bind(this);
    this.loadUserInfo = this.loadUserInfo.bind(this);
  }

  componentDidMount() {
    this.formRef.current.resetFields();
    this.loadUserInfo();
  }

  componentDidUpdate(prevProps) {
    // Reload user info
    if (this.props.Li_UserId !== prevProps.Li_UserId) {
      this.formRef.current.resetFields();
      this.props.alert(clear);

      this.setState({
        userId: this.props.Li_UserId,
        isEdit: this.props.Li_UserId ? true : false,
      });
      this.loadUserInfo();
    }
  }

  loadUserInfo() {
    if (!this.state.userId) {
      return;
    }
    if (this.state.isEdit === true) {
      this.setState({
        isLoadingInfo: true,
      });
      axios.get('/api/user-info/user-register-form', {
        params: {
          Li_UserId: this.state.userId,
        },
      })
        .then((res) => {
          const formData = res.data;
          formData.valid_date_range = [
            moment(formData.valid_f).isValid() ? moment(formData.valid_f) : null,
            moment(formData.valid_t).isValid() ? moment(formData.valid_t) : null
          ];
          formData.password_updated_at = moment(formData.password_updated_at).isValid()
            ? moment(formData.password_updated_at) : null;
          formData.password_confirmation = formData.password;
          formData.authority_level = formData.StsAdministrator;
          this.formRef.current.setFieldsValue(formData);
          this.setState({
            isUsageRightsDisabled: formData.StsAdministrator,
            usageRightValues: (() => {
              const usage_rights_info = formData.usage_rights_info;
              if (!usage_rights_info) {
                return [];
              }

              const stateRightInfo = [];
              for (let usageKey in usageRightKeyPosMap) {
                if (usage_rights_info[usageRightKeyPosMap[usageKey]] === "1") {
                  stateRightInfo.push(usageKey);
                }
              }

              return stateRightInfo;
            })()
          });
        })
        .catch(e => { })
        .then(() => {
          this.setState({
            isLoadingInfo: false,
          });
        });
    }
  }

  onRightsChange(value) {
    this.setState({
      usageRightValues: value,
    });
  }

  onChangeAuthorityLevel(event) {
    this.setState({
      isUsageRightsDisabled: event.target.checked,
    });
  }

  onFinish(values) {
    this.setState({ isLoadingInfo: true });

    const valid_date_range = this.formRef.current.getFieldValue('valid_date_range');
    const usage_rights_info = (() => {
      const usageKeys = Object.keys(usageRightKeyPosMap);
      let usageRights = [];
      for (let i in usageKeys) {
        const k = usageKeys[i];
        usageRights.push((this.state.usageRightValues.indexOf(k) === -1) ? " " : "1");
      }
      return usageRights.join('');
    })();

    let user = {
      username: values.username,
      name: values.name,
      active_flg: values.active_flg,
      usage_rights_info: usage_rights_info,
      valid_f: valid_date_range ? valid_date_range[0] : null,
      valid_t: valid_date_range ? valid_date_range[1] : null,
      password_updated_at: values.password_updated_at,
      authority_level: values.authority_level,
    };
    if (this.state.isEdit) {
      if (values.password && values.password.length) {
        user = {
          ...user,
          password: values.password,
          password_confirmation: values.password_confirmation,
        };
      }
    } else {
      user = {
        ...user,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
    }

    axios.post('/api/user-info/user-register-form/RegisterBtn', user)
      .then((res) => {
        if (this.props.onUpdateSuccess) {
          this.props.onUpdateSuccess();
        }
        // this.formRef.current.resetFields();
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({
          isLoadingInfo: false,
        });
      });
  }

  render() {
    return (
      <div className="user-register-form">
        <Card title="ユーザー登録フォーム">
          <Spin spinning={this.state.isLoadingInfo}>
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
              onFinish={this.onFinish}
              {...layout}
              initialValues={{ active_flg: true }}
            >
              <Tabs>
                <Tabs.TabPane key="tab-user" tab="ユーザー">
                  <Form.Item name="active_flg" label="ユーザー有効" valuePropName="checked">
                    <Checkbox></Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="username"
                    label="ユーザーID"
                    rules={[{ required: this.state.userId ? false : true }]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      disabled={this.state.userId ? true : false}
                      autoComplete={false}
                    />
                  </Form.Item>
                  <Form.Item name="name" label="名前">
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      autoComplete={false}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="パスワード"
                    rules={[
                      { required: this.state.userId ? false : true },
                      { min: 8 },
                    ]}
                  >
                    <Input
                      prefix={
                        <LockOutlined className="site-form-item-icon" />
                      }
                      type="password"
                      autoComplete={false}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password_confirmation"
                    label="パスワード(確認)"
                    rules={[
                      { required: this.state.userId ? false : true },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const pass = getFieldValue('password');
                          if ((!pass && !value) || (pass === value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject('新パスワードとパスワード（確認）が一致しません。');
                        },
                      }),
                    ]}
                  >
                    <Input
                      prefix={
                        <LockOutlined className="site-form-item-icon" />
                      }
                      type="password"
                      autoComplete={false}
                    />
                  </Form.Item>
                </Tabs.TabPane>

                <Tabs.TabPane key="tab-info" tab="詳細設定">
                  <Form.Item name="valid_date_range" label="有効期限">
                    <RangePicker format="YYYY/MM/DD" />
                  </Form.Item>
                  <Form.Item name="password_updated_at" label="パスワード更新日">
                    <VenusDatePickerCustom
                      formRefDatePicker={this.formRef}
                      format="YYYY/MM/DD"
                    />
                  </Form.Item>
                  <Form.Item
                    name="authority_level"
                    label="管理者権限"
                    valuePropName="checked"
                    onChange={this.onChangeAuthorityLevel}
                  >
                    <Checkbox />
                  </Form.Item>
                  <Form.Item label="個別権限詳細">
                    <Checkbox.Group
                      style={{ width: '100%' }} onChange={this.onRightsChange} name="usage_rights"
                      disabled={this.state.isUsageRightsDisabled}
                      value={this.state.usageRightValues}
                    >
                      <Row>
                        <Col>
                          <Checkbox value="A">A</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="B">B</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="C">C</Checkbox>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Checkbox value="D">D</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="E">E</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="F">F</Checkbox>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Checkbox value="G">G</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="H">H</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="I">I</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Tabs.TabPane>
              </Tabs>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">登録</Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
  alertReducer: alertReducer,
  userProfile: userReducer.userProfile
});

const mapDispatchToProps = (dispatch) => ({
  alert: (action, message) => dispatch(action(message)),
  createUserAction: (user) => dispatch(createUserAction(user)),
  getUserProfileAction: (userId) => dispatch(getUserProfileAction(userId)),
  updateUserProfileAction: (userId, user) => dispatch(updateUserProfileAction(userId, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2706002_UserRegisterForm);
