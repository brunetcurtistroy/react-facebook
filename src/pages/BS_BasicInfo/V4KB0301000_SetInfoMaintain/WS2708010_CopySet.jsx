import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Space, message,Modal } from "antd";
import { ExclamationCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import SetInfoMaintainAction from "redux/basicInfo/SetInfoMaintain/SetInfoMaintain.action";

class WS2708010_CopySet extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_SetIdentifyCopySource: PropTypes.any,
    Li_CopySourceSetCode: PropTypes.any,
    Li_SetName: PropTypes.any,

    Li_start_date_on: PropTypes.any,

    Lo_ExecPresence: PropTypes.any,
    Lo_CopySet: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "複写セット";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    if (this.props) {
      const { Li_CopySourceSetCode } = this.props;
      this.formRef.current.setFieldsValue({
        CopySourceSetCode: Li_CopySourceSetCode,
        CopySetCode: Li_CopySourceSetCode,
      });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      const { Li_CopySourceSetCode } = this.props;
      this.formRef.current.setFieldsValue({
        CopySourceSetCode: Li_CopySourceSetCode,
        CopySetCode: Li_CopySourceSetCode,
      });
    }
  };

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  cloneData(values) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    })

    SetInfoMaintainAction.cloneSetManagementInfo(values)
    .then((res) => {
      if (this.props.onFinishScreen) {
        this.props.onFinishScreen({
          CopySetCode: this.formRef.current.getFieldValue('CopySetCode'),
          start_date_on: this.props.Li_start_date_on,
        });
      }
    })
    .catch((err) => {
      message.error(err.response.data.message);
    });
  }

  onFinish(values) {
    Modal.confirm({
      width: 250,
      title:'複写しますか？',
      icon: <QuestionCircleOutlined style={{ fontSize: '25px', color: '#08c' }} />,
      onOk: () => {
        this.cloneData(values);
      }
    })
  }

  render() {
    return (
      <div className="copy-set">
        <Card title="複写セット">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <div style={{ display: "none" }}>
              <Form.Item name="CopySourceSetCode">
                <Input type="text" />
              </Form.Item>
            </div>

            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
              新規に作成するコードを設定し、 複写ボタンを押してください。
            </div>
            <Form.Item
              name="CopySetCode"
              label="コード"
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value.includes("*") || value.includes("?")) {
                      return Promise.reject("「*」または「?」は使用できません");
                    }
                    if (getFieldValue("CopySourceSetCode") === value) {
                      return Promise.reject("複写先が同一です");
                    }
                    if (!value) {
                      return Promise.reject("");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input type="text" maxLength={8} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ float: "right" }}
              >
                複写
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            this.closeModal()
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS2708010_CopySet);
