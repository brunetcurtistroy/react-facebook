import React from "react";
import { connect } from "react-redux";

import { Card, message, Form, Button, Space } from "antd";
import DataUpdateConfirmAction from "redux/InputBusiness/SpreadInput/DataUpdateConfirm.action";
class WS0735028_DataUpdateConfirm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "データ更新確認";

    this.state = {
      Lo_Confirm: false,
    };

    this.onFinish = this.onFinish.bind(this);
  }
  DataUpdateConfirm() {
    const data = {
      SheetStyle: this.props.SheetStyle,
    };
    DataUpdateConfirmAction.DataUpdateConfirmAction(data)
      .then((res) => {
        if (res) {
          message.success("成功");
        }
        this.setState({ Lo_Confirm: true });
      })
      .catch((err) => message.error("エラー"));
  }

  onFinish(values) {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lo_Confirm: this.state.Lo_Confirm,
      });
    }
  }

  render() {
    return (
      <div className="data-update-confirm">
        <Card title="データ更新確認">
          <Form
            style={{ textAlign: "end" }}
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div
              style={{ textAlign: "center",marginBottom: "1em" }}
            >
              入力ﾃﾞｰﾀの更新を行いますか？
            </div>
            <Space style={{display: 'flex', justifyContent: 'center'}}>
              <Form.Item name="Lo_Confirm">
              <Button
                  onClick={() => {
                    this.DataUpdateConfirm();
                  }}
                  type="primary"
                  style={{ marginRight: "2em" }}
                  htmlType="submit"
                >
                  更　新
                </Button>
              </Form.Item>
              <Form.Item>
              <Button
                  type="default"
                  htmlType="submit"
                  onClick={() => this.setState({ Lo_Confirm: false })}
                >
                  キャンセル
                </Button>
        
              </Form.Item>
            </Space>
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
)(WS0735028_DataUpdateConfirm);
