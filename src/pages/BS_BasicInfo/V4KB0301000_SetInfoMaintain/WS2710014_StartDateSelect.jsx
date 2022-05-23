import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, DatePicker, Button, Modal, message } from "antd";
import "moment/locale/ja";
import StartDateSelectAction from "redux/basicInfo/SetInfoMaintain/StartDateSelect.action";

const dateFormat = "YYYY/MM/DD";
class WS2710014_StartDateSelect extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_SetCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "開始日選択";
    this.state = {
      valueDate: "",
    };

    this.onChangeDate = this.onChangeDate.bind(this);
  }

  onChangeDate(date, stringDate) {
    this.setState({
      valueDate: stringDate,
    });
  }

  onFinish() {
    let data = {
      SetCodes: this.props.Li_SetCode,
      StartDateChars: this.state.valueDate,
    };

    StartDateSelectAction.StartDateSelect(data)
      .then((res) => {
        Modal.info({
          width: "250px",
          title: "更新しました。",
          okText: "は　い",
          onOk: () => { },
        });

        if (this.props.onFinishScreen) {
          this.props.onFinishScreen(this.state.valueDate);
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }

  render() {
    return (
      <div className="start-date-select">
        <Card title="開始日選択">
          <Form ref={this.formRef}>
            <Form.Item name="StartDateChars" label="開始日(文字)">
              <VenusDatePickerCustom formRefDatePicker={this.formRef}
                format={dateFormat}
                onChange={this.onChangeDate}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{ float: "right" }}
                disabled={!this.state.valueDate}
                onClick={() => {
                  this.onFinish();
                }}
              >
                実行
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
)(WS2710014_StartDateSelect);
