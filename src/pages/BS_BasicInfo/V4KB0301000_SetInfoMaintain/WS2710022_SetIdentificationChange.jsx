import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Select, Button, Modal, message } from "antd";

import SetIdentificationChangeAction from "redux/basicInfo/SetInfoMaintain/SetIdentificationChange.action";

class WS2710022_SetIdentificationChange extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_SetCode: PropTypes.any,
    Lo_UpdateComplete: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "セット識別変更";

    this.state = {
      valueOption: "",
    };
  }

  onFinish() {
    let data = {
      SetCodes: this.props.Li_SetCode,
      SetIdentify: this.state.valueOption,
    };

    SetIdentificationChangeAction.SetIdentificationChange(data)
      .then((res) => {
        Modal.info({
          width: "250px",
          title: "更新しました。",
          okText: "は　い",
          onOk: () => { },
        });
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen(this.state.valueOption);
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }

  render() {
    return (
      <div className="set-identification-change">
        <Card title="セット識別変更">
          <Form ref={this.formRef}>
            <Form.Item name="SetIdentify" label="セット識別">
              <Select
                onChange={(value) => {
                  this.setState({ valueOption: value });
                }}
              >
                <Select.Option value="Cos">コース</Select.Option>
                <Select.Option value="Opt">オプション</Select.Option>
                <Select.Option value="Set">セット</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{ float: "right" }}
                disabled={!this.state.valueOption}
                onClick={() => {
                  this.onFinish();
                }}
              >
                変　更
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
)(WS2710022_SetIdentificationChange);
