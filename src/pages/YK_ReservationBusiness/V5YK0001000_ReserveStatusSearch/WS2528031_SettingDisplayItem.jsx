import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Button, Row, Col, Popconfirm, message } from "antd";
import SettingDisplayItemService from "services/ReservationBusiness/ReserveStatusSearch/SettingDisplayItemService";
import Color from "constants/Color";
class WS2528031_SettingDisplayItem extends React.Component {
  static propTypes = {
    onFinishScreen: PropTypes.func,
    Lio_CourseList: PropTypes.string,
    Lio_ExamList: PropTypes.string,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "表示項目設定";

    this.state = {
      DataList: {},
    };
  }

  componentDidMount = () => {
    this.getScreenData();
  };

  getScreenData = () => {
    const { Lio_CourseList, Lio_ExamList } = this.props;
    SettingDisplayItemService.getListService()
      .then((res) => {
        this.setState(
          {
            DataList: res.data,
          },
          async () => {
            if (Lio_CourseList && Lio_ExamList) {
              await this.addStringToDataList(Lio_CourseList, 10);
              await this.addStringToDataList(Lio_ExamList, 30);
            }
          }
        );
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  onSaveBtn = () => {
    let CourseList = this.getStringByFieldsList(10);
    let ExamList = this.getStringByFieldsList(30);
    SettingDisplayItemService.SaveBtnService({
      EvConfirm: 1,
      CourseList: CourseList,
      ExamList: ExamList,
    })
      .then((res) => {
        this.onConfirmBtn();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  onConfirmBtn = () => {
    let CourseList = this.getStringByFieldsList(10);
    let ExamList = this.getStringByFieldsList(30);
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_CourseList: CourseList,
        Lio_ExamList: ExamList,
      });
    }
  };

  handleClickToSetStateExpression = (field_name) => {
    this.setState({
      DataList: {
        ...this.state.DataList,
        [field_name]: this.state.DataList[field_name] === 156 ? 210 : 156,
      },
    });
  };
  addStringToDataList = (stringDataList, expression_number_from, func) => {
    let objectDataList = {};
    for (let index = 0; index < 20; index++) {
      let numberExpression = expression_number_from + index;
      objectDataList = {
        ...objectDataList,
        ["Expression_" + numberExpression]:
          stringDataList[index] === "1" ? 156 : 210,
      };
    }
    this.setState({
      DataList: {
        ...this.state.DataList,
        ...objectDataList,
      },
    });
  };

  getStringByFieldsList = (expression_number_from) => {
    let stringList = "";
    for (let index = 0; index < 20; index++) {
      let numberExpression = expression_number_from + index;
      let textString =
        this.state.DataList?.["Expression_" + numberExpression] === 156
          ? "1"
          : "0";
      stringList = stringList + textString;
    }
    return stringList;
  };

  renderListButtonExpression = (expression_number_from, expression_color) => {
    var listItem = [];
    for (let i = 0; i < 10; i++) {
      let numberExpression = expression_number_from + i;
      let numberExpressionColor = expression_color + i;
      let backgroundColor = Color(
        this.state.DataList?.["Expression_" + numberExpressionColor]
      )?.Background;
      let textColor = Color(
        this.state.DataList?.["Expression_" + numberExpressionColor]
      )?.Foreground;
      listItem.push(
        <Form.Item
          name={`Expression_${numberExpression}`}
          key={`Expression_${numberExpression}`}
        >
          <Button
            onClick={() =>
              this.handleClickToSetStateExpression(
                "Expression_" + numberExpressionColor
              )
            }
            style={{
              width: "100%",
              textAlign: "left",
              height: "30px",
              color: textColor,
              background: backgroundColor,
            }}
          >
            {this.state.DataList?.["Expression_" + numberExpression]}
          </Button>
        </Form.Item>
      );
    }
    return listItem;
  };

  render() {
    return (
      <div className="setting-display-item">
        <Card title="表示項目設定">
          <Form ref={this.formRef}>
            <Row gutter={12} className="mb-3">
              <Col span={12}>
                <Form.Item>
                  <div
                    style={{
                      width: "70px",
                      color: "rgb(255, 255, 255)",
                      background: "rgb(28, 102, 185)",
                      cursor: "default",
                      textAlign: "center",
                    }}
                  >
                    コース
                  </div>
                </Form.Item>
                <Row gutter={12}>
                  <Col span={12}>{this.renderListButtonExpression(50, 10)}</Col>
                  <Col span={12}>{this.renderListButtonExpression(60, 20)}</Col>
                </Row>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <div
                    style={{
                      width: "70px",
                      color: "rgb(255, 255, 255)",
                      background: "rgb(28, 102, 185)",
                      cursor: "default",
                      textAlign: "center",
                    }}
                  >
                    検　査
                  </div>
                </Form.Item>
                <Row gutter={12}>
                  <Col span={12}>{this.renderListButtonExpression(70, 30)}</Col>
                  <Col span={12}>{this.renderListButtonExpression(80, 40)}</Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Button
                  type="primary"
                  style={{ marginRight: "10px", float: "right" }}
                  onClick={() => {
                    this.onSaveBtn();
                  }}
                >
                  確定
                </Button>
                <Popconfirm
                  placement="top"
                  title="この設定を既定として保存しますか？"
                  okText="はい"
                  cancelText="いいえ"
                  onConfirm={() => this.onSaveBtn()}
                >
                  <Button
                    type="primary"
                    style={{ marginRight: "10px", float: "right" }}
                  >
                    保存
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
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
)(WS2528031_SettingDisplayItem);
