import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";

import { Menu, Card, Table, Dropdown, Modal, } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import axios from 'configs/axios';

import UserService from "services/UserService";

import WS2706002_UserRegisterForm from "./WS2706002_UserRegisterForm.jsx";
import { danger } from "redux/alert/alert.actions.js";
import moment from "moment-timezone";

const userRights = (rights, id) => {
  return rights ? <span>{(rights[id] === "1") ? "O" : ""}</span> : null;
};

class WS2706001_UserRegister extends React.Component {

  constructor(props) {
    super(props);

    // document.title = 'ユーザー登録';

    this.state = {
      usersRes: {},

      isLoadingUserList: true,
      isUserRegisterFormVisible: false,

      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };

    this.setUserList = this.loadUserList.bind(this);
  }

  componentDidMount() {
    this.loadUserList(1, 50);
  }

  loadUserList(page, limitPerPage = 50) {
    this.setState({ isLoadingUserList: true });

    axios.get('/api/user-info/user-register', {
      params: {
        page,
        limit: limitPerPage,
      }
    })
      .then((res) => {
        this.setState({
          usersRes: res.data
        });
      })
      .catch((error) => {
        this.props.alert(danger, error.response.data.message);
      })
      .then(() => {
        this.setState({
          isLoadingUserList: false
        });
      });
  }

  deleteUser(id) {
    UserService.deleteUser(id)
      .then((res) => {
        this.loadUserList(this.state.usersRes.data.current_page);
      })
      .catch((error) => {
        this.props.alert(danger, error.response.data.message);
      })
      .then(() => {
        this.setState({
          isLoadingUserList: false
        });
      });
  }

  render() {
    const usersRes = this.state.usersRes;
    return (
      <div className="user-register">
        <Menu mode="horizontal">
          {/* <Menu.SubMenu key="sub-menu-1" title="設定">
            <Menu.Item key="option_info">オプション情報</Menu.Item>
          </Menu.SubMenu> */}
          <Menu.Item key="new-register" icon={<UserAddOutlined />} onClick={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: true,
                width: 700,
                component: (<WS2706002_UserRegisterForm
                  onUpdateSuccess={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: false,
                      }
                    });
                    this.loadUserList(this.state.usersRes.data.current_page);
                  }}
                />),
              }
            });
          }}>新規登録</Menu.Item>
        </Menu>
        <Card title="ユーザー登録">
          <Table dataSource={usersRes ? usersRes.data : []} loading={this.state.isLoadingUserList}
            pagination={{
              defaultCurrent: usersRes.current_page,
              total: usersRes.total,
              pageSize: usersRes.per_page,
              showSizeChanger: true,
              onChange: (page, pageSize) => this.loadUserList(page, pageSize),
              onShowSizeChange: (page, pageSize) => this.loadUserList(page, pageSize),
            }}
            rowKey={(record) => record.id}
          >
            <Table.Column title="ユーザーID" dataIndex="username" key="username" />
            <Table.Column title="名前" dataIndex="name" key="name" />
            <Table.Column title="管理者" dataIndex="authority_level" key="authority_level" render={text => (text === "1") ? "O" : ""} />
            <Table.Column title="A" dataIndex="usage_rights_info" key="a" render={(text) => userRights(text, 0)} />
            <Table.Column title="B" dataIndex="usage_rights_info" key="b" render={(text) => userRights(text, 1)} />
            <Table.Column title="C" dataIndex="usage_rights_info" key="c" render={(text) => userRights(text, 2)} />
            <Table.Column title="D" dataIndex="usage_rights_info" key="d" render={(text) => userRights(text, 3)} />
            <Table.Column title="E" dataIndex="usage_rights_info" key="e" render={(text) => userRights(text, 4)} />
            <Table.Column title="F" dataIndex="usage_rights_info" key="f" render={(text) => userRights(text, 5)} />
            <Table.Column title="G" dataIndex="usage_rights_info" key="g" render={(text) => userRights(text, 6)} />
            <Table.Column title="H" dataIndex="usage_rights_info" key="h" render={(text) => userRights(text, 7)} />
            <Table.Column title="I" dataIndex="usage_rights_info" key="i" render={(text) => userRights(text, 8)} />
            <Table.Column title="有効期限" dataIndex="" key="valid_date"
              render={(text, record) => (
                <span>
                  {record.valid_f} - {record.valid_t}
                </span>
              )}
            />
            <Table.Column
              title="パスワード更新日"
              dataIndex="password_updated_at"
              key="password_updated_at"
              render={value => moment(value).isValid() ? moment(value).format('YYYY/MM/DD') : null}
            />
            <Table.Column key="action"
              render={(text, record) => {
                return (
                  <Dropdown.Button size="small" overlay={() => (
                    <Menu>
                      <Menu.Item
                        key="modify"
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 700,
                              component: (<WS2706002_UserRegisterForm
                                Li_UserId={record.username}
                                // passwordUpdatedAt={record.password_updated_at}
                                onUpdateSuccess={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    }
                                  });
                                  this.loadUserList(this.state.usersRes.data.current_page);
                                }}
                              />),
                            }
                          });
                        }}
                      >修正</Menu.Item>
                      <Menu.Item key="delete"
                        onClick={() => {
                          Modal.confirm({
                            title: "確認",
                            content: "削除処理を実行しますか？",
                            onOk: () => {
                              this.deleteUser(record.id);
                            }
                          });
                        }}
                      >削除</Menu.Item>
                    </Menu>
                  )} />
                );
              }} />
          </Table>
        </Card>

        {(this.state.childModal.visible) ?
          <ModalDraggable
            width={this.state.childModal.width}
            visible={this.state.childModal.visible}
            component={this.state.childModal.component}
            bodyStyle={{ margin: 0, padding: 0 }}
            maskClosable={false}
            onCancel={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: false,
                },
              });
            }}
          />
          :
          null
        }
        {/* <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
  alert: (action, message) => dispatch(action(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2706001_UserRegister);
