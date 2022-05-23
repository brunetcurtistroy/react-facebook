import React from "react";
import { connect } from "react-redux";
import { Link, Switch, Route } from "react-router-dom";

import { Modal, Layout, Menu, message, Button, Tooltip } from "antd";
import {
  UserOutlined, SettingOutlined, DashboardOutlined, FolderOutlined,
  FullscreenOutlined, FullscreenExitOutlined
} from "@ant-design/icons";

import {
  logoutUserInfo, setSubMenus, setDisplayComponent
} from "redux/user/user.actions";
import { UserActionTypes } from "redux/user/user.types";

import RouteDefined from 'constants/Route';
import MenuList from 'constants/MenuList';
import IndexPage from "./WS2519001_MainMenu/IndexPage";
import axios from 'configs/axios';

// import { history } from "constants/BrowserHistory";

// const layout

class WS2519001_MainMenu extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'メインメニュー';

    this.logout = this.logout.bind(this);

    this.state = {

      fullScreen: false,
    }

    this.getScreenID = this.getScreenID.bind(this)
    this.copyScreenID = this.copyScreenID.bind(this)

    if (!props.loggedIn) {
      props.logoutUserInfo(this.props.hospitalCode);
    }
  }

  componentDidMount() {
    // Check is logged in
    const hide = message.loading('ログイン情報を確認中', 0);
    axios.get('/api/user')
      .then(res => {
        this.props.setUserInfo(res.data, this.props.hospitalCode);
      })
      .catch(error => {
        const res = error.response;
        if (this.props.loggedIn && res && (res.status === 401)) {
          this.props.logoutUserInfo(this.props.hospitalCode);
          return;
        } else if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          this.props.logoutUserInfo(this.props.hospitalCode);
          return;
        }
        message.error(res.data.message);
        if (this.props.hospitalCode !== '') {
          this.props.logoutUserInfo(this.props.hospitalCode);
        }
      })
      .finally(() => {
        setTimeout(hide, 0);
      });

    this.getScreenID();
  }

  logout() {
    Modal.confirm({
      title: "ログアウト",
      content: "別のユーザーでログインし直しますか？",
      onOk: () => {
        return this.props.logoutUserInfo(this.props.hospitalCode);
      },
    });
  }

  handleFullScreen = () => {
    if (!this.state.fullScreen) {
      this.setState({
        fullScreen: true
      }, () => {
        document.documentElement.requestFullscreen();
      });
    } else {
      this.setState({
        fullScreen: false
      }, () => {
        document.exitFullscreen();
      });
    }
  }

  // Get a screen ID for testing
  getScreenID(event) {
    if (typeof event === "undefined") return;

    const pathKey = event?.key;
    let pathname = pathKey?.substring(0, pathKey.indexOf('_'));

    let screenName = ''
    for (let i = 0; i < RouteDefined.length; i++) {
      if (RouteDefined[i].path === pathname) {
        screenName = RouteDefined[i].component?.WrappedComponent?.name;
        break;
      }
    }
    if (this.props.componentName === screenName) return;
    // redux
    this.props.setDisplayComponent(screenName);
  }

  // Get a screen ID for testing (Copy and paste)
  copyScreenID() {
    const value = this.props.componentName;
    if (typeof value === "string" || value instanceof String) {
      const arr = value.split('_');
      if (arr.length > 0) {
        const pathStr = arr[0];

        if (typeof (navigator.clipboard) == 'undefined') {
          const textField = document.createElement('textarea');
          textField.innerText = pathStr;
          document.body.appendChild(textField);
          textField.select();
          document.execCommand('copy');
          textField.remove();
          return;
        }

        navigator.clipboard.writeText(arr[0]);
      }
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh', }}>
        <Layout.Header className="px-0" style={{ position: 'relative' }}>
          <Menu theme="dark" mode="horizontal" triggerSubMenuAction="click">
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="explorer" icon={<FolderOutlined />}>
              <Link to="/">Explorer</Link>
            </Menu.Item>
            <Menu.SubMenu key="settings" title="設定" icon={<SettingOutlined />}>
              <Menu.Item key="/optional-info-maintain/optional-info-maintain">
                <Link to="/optional-info-maintain/optional-info-maintain">オプション情報</Link>
              </Menu.Item>
              {this.props.user.StsAdministrator ? (
                <Menu.Item key="/user-info/user-register">
                  <Link to="/user-info/user-register">ユーザー設定</Link>
                </Menu.Item>
              ) : null}
            </Menu.SubMenu>
            <Menu.Item key="full-screen" icon={this.state.fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />} onClick={this.handleFullScreen}>
              {this.state.fullScreen ? 'Restore Down' : 'Full Screen'}
            </Menu.Item>
            <Menu.SubMenu
              key="user-info"
              icon={<UserOutlined />}
              title={this.props.user ? this.props.user.name : "ユーザー"}
              style={{ float: 'right' }}
            >
              <Menu.Item key="/user-info/password-modify">
                <Link to="/user-info/password-modify">パスワード変更</Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={this.logout}>
                ログアウト
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
          {/* Get screen ID for testing */}
          <Tooltip title={'クリックで画面IDをコピーする'} >
            <Button onClick={this.copyScreenID} style={{ position: 'absolute', right: 3, top: 3 }}>{'画面ID：' + this.props.componentName}</Button>
          </Tooltip>
        </Layout.Header>
        <Layout>
          <Layout.Sider className="scrollbar" style={{ overflow: 'auto', height: 'calc(100vh - 32px)', backgroundColor: '#c8dcf5' }} width={210}>
            <Menu
              mode="vertical"
              defaultSelectedKeys={[this.props.location.pathname]}
              defaultOpenKeys={[this.props.location.pathname]}
              style={{ "paddingBottom": "50px", backgroundColor: '#c8dcf5' }}
              onSelect={this.getScreenID}
            >
              {MenuList.map((menuItem, i) => {
                return (
                  <Menu.SubMenu key={`menu_lv1_${i}`} icon={menuItem.icon} title={menuItem.title}>
                    {menuItem.submenu.map((subMenuItem, j) => {
                      return subMenuItem.submenu ? (
                        <Menu.SubMenu key={`menu_lv2_${i}_${j}`} icon={subMenuItem.icon} title={subMenuItem.title}>
                          {subMenuItem.submenu.map((subMenuItemLV2, k) => {
                            return (
                              <Menu.Item key={subMenuItemLV2.path + `_${i}_${j}_${k}`} icon={subMenuItemLV2.icon} title={subMenuItemLV2.title}>
                                <Link to={subMenuItemLV2.path}>{subMenuItemLV2.title}</Link>
                              </Menu.Item>
                            )
                          })}
                        </Menu.SubMenu>
                      ) : (
                        <Menu.Item key={subMenuItem.path + `_${i}_${j}`} icon={subMenuItem.icon} title={subMenuItem.title}>
                          <Link to={subMenuItem.path}>{subMenuItem.title}</Link>
                        </Menu.Item>
                      )
                    })}
                  </Menu.SubMenu>
                )
              })}
            </Menu>
          </Layout.Sider>

          <Layout.Content className="scrollbar" style={{ overflow: 'auto', height: 'calc(100vh - 32px)', padding: '5px' }}>
            <Switch>
              {/* <Route path="/" component={IndexPage} exact={true} key="route_index" /> */}
              {RouteDefined.map((routeItem, i) => (
                <Route path={routeItem.path} component={routeItem.component} exact={routeItem.exact} key={`route_${i}`} />
              ))}
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({
  loggedIn: userReducer.loggedIn,
  hospitalCode: userReducer.hospitalCode,
  user: userReducer.user,
  subMenus: userReducer.subMenus,
  componentName: userReducer.component,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUserInfo: (hospitalCode) => dispatch(logoutUserInfo(hospitalCode)),
  setSubMenus: (objMenu) => dispatch(setSubMenus(objMenu)),
  setUserInfo: (userInfo, hospitalCode) => dispatch({
    type: UserActionTypes.SET_USER,
    payload: {
      user: userInfo,
      loggedIn: true,
      hospitalCode,
    },
  }),
  setDisplayComponent: (componentName) => dispatch(setDisplayComponent(componentName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WS2519001_MainMenu);
