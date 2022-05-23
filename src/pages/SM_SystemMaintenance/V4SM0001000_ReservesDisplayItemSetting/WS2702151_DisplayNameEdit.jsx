import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, message } from "antd";
import PropTypes from "prop-types";
import DisplayNameEditService from "services/SystemMaintenance/ReservesDisplayItemSetting/DisplayNameEditService";

class WS2702151_DisplayNameEdit extends React.Component {
  static propTypes = {
    Li_ManageDivision: PropTypes.any,
    Li_DisplayItemNum: PropTypes.any,
    Li_Name: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = "表示名編集";

    this.state = {
      Li_DisplayItemNum: "",
      DisplayItemName: "",
      isLoading: false,
    };
  }

  componentDidMount = () => {
    const { Li_DisplayItemNum, Li_Name } = this.props;
    if (Li_DisplayItemNum) {
      this.setState({ Li_DisplayItemNum: Li_DisplayItemNum });
    }
    if (Li_Name) {
      this.setState({ DisplayItemName: Li_Name });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  register = () => {
    //日帰 一般
    this.setState({ isLoading: true });
    const { Li_DisplayItemNum, DisplayItemName } = this.state;
    const { Li_ManageDivision } = this.props;
    console.log("object", Li_DisplayItemNum, DisplayItemName);
    if (Li_ManageDivision === 1) {
      DisplayNameEditService.changeChangeNameCourseService({
        SelectInDisplayItemNumCourse: Li_DisplayItemNum,
        DisplayItemName: DisplayItemName,
      })
        .then((res) => {
          this.props.onFinishScreen();
        })
        .catch((err) => {
          const res = err.response;
          if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
          message.error(res.data.message);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
    if (Li_ManageDivision === 2) {
      DisplayNameEditService.changeChangeNameInspectService({
        SelectInDisplayItemNumInspect: Li_DisplayItemNum,
        DisplayItemName: DisplayItemName,
      })
        .then((res) => {
          this.props.onFinishScreen();
        })
        .catch((err) => {
          const res = err.response;
          if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
          message.error(res.data.message);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  render() {
    return (
      <div className="display-name-edit">
        <Card title="表示名編集">
          <Form>
            <Form.Item
              label="予約表示項目番号"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input
                name="Li_DisplayItemNum"
                value={this.state.Li_DisplayItemNum}
                onChange={this.handleChange}
                type="text"
                readOnly
              />
            </Form.Item>
            <Form.Item
              label="表項目名称"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input
                name="DisplayItemName"
                value={this.state.DisplayItemName}
                type="text"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={() => this.register()}
                loading={this.state.isLoading}
              >
                登録
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
)(WS2702151_DisplayNameEdit);
