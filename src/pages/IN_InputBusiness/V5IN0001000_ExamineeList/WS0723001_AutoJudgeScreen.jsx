import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Checkbox, Button, Row, Col, message, Input, Modal, Spin } from "antd";

import { WarningOutlined } from "@ant-design/icons";

import AutoJudgeScreenAction from "redux/InputBusiness/ExamineeList/AutoJudgeScreen.action";

class WS0723001_AutoJudgeScreen extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_TrueOrFalse: PropTypes.any,
    Lo_TotalJudge: PropTypes.any,
    Lo_TotalCommentEditingArea: PropTypes.any,
    Lo_StsRun: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '自動判定：画面';

    this.state = {
      isLoadingForm: false
    };

    this.onFinish = this.onFinish.bind(this)
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getScreenData();
    }
  }

  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  }

  getScreenData() {
    let params = {
      Li_CourseLevel: this.props.Li_CourseLevel,
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_TrueOrFalse: this.props.Li_TrueOrFalse,
      Lo_TotalJudge: this.props.Lo_TotalJudge,
      Lo_TotalCommentEditingArea: this.props.Lo_TotalCommentEditingArea,
      Lo_StsRun: this.props.Lo_StsRun,
    }

    AutoJudgeScreenAction.getScreenData(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue(res?.data)
      })

      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }


  event_Exec(values) {
    this.setState({ isLoadingForm: true })
    AutoJudgeScreenAction.event_Exec(values)
      .then((res) => {
        this.setState({ isLoadingForm: false })
        let title = ''
        if (res?.data?.message === "Success") {
          if (values.HierarchicalPresence === 1) {
            if (res?.data?.Warning1) {
              title = res?.data?.Warning1
            } else {
              title = <span style={{ fontWeight: 'normal' }}>
                ＜判定＞<br />
                メタボリック = {res?.data?.InspectValueMetabolic}<br />
                階層化　　　 = {res?.data?.LaboratoryValuesHierarchical}<br />
                <br />
                ＜ﾘｽｸ情報＞<br />
                メタボリック = {res?.data?.HierarchicalJudgeRisk}<br />
                階層化　　　 = {res?.data?.MetabolicSyndromeJudgeRisk}<br />
              </span>
            }
            Modal.warning({
              width: 400,
              title: title,
              icon: <WarningOutlined />,
              onOk: () => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({})
                }
              }
            })
          } else {
            if (this.props.onFinishScreen) {
              this.props.onFinishScreen({})
            }
          }
        }
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  onFinish(values) {
    let data = {
      ...values,
      StsUndeterminedOnly: values.StsUndeterminedOnly ? 1 : 0,
      HierarchicalPresence: values.HierarchicalPresence ? 1 : 0
    }
    this.event_Exec(data)
  }

  render() {
    return (
      <div className="auto-judge-screen">
        <Card title="自動判定：画面">
          <Spin spinning={this.state.isLoadingForm}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <div style={{ padding: 15, border: '1px solid #6baff9', marginBottom: 20 }}>
                <div hidden>
                  <Form.Item name="Li_CourseLevel"><Input /></Form.Item>
                  <Form.Item name="Li_ReserveNum"><Input /></Form.Item>
                  <Form.Item name="Li_TrueOrFalse"><Input /></Form.Item>
                  <Form.Item name="Lo_TotalJudge"><Input /></Form.Item>
                  <Form.Item name="Lo_TotalCmtEditingArea"><Input /></Form.Item>
                  <Form.Item name="Lo_StsRun"><Input /></Form.Item>
                  <Form.Item name="HierarchicalDisplayOp"><Input /></Form.Item>
                  <Form.Item name="OverallJudgeIgnoredOp"><Input /></Form.Item>
                  <Form.Item name="LeadershipMattersIgnoredOp"><Input /></Form.Item>
                  <Form.Item name="JudgeStartOp"><Input /></Form.Item>
                  <Form.Item name="CmtInitials"><Input /></Form.Item>
                  <Form.Item name="TotalJudge"><Input /></Form.Item>
                </div>

                <Form.Item name="StsUndeterminedOnly" valuePropName="checked" >
                  <Checkbox>未判定の検査のみ</Checkbox>
                </Form.Item>
                <Form.Item name="HierarchicalPresence" valuePropName="checked" >
                  <Checkbox>階層化判定を実行</Checkbox>
                </Form.Item>
              </div>
              <Row gutter={24}>
                <Col span={12} style={{ float: "left" }}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">は　い</Button>
                  </Form.Item>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Form.Item>
                    <Button type="primary"
                      onClick={() => {
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({})
                        }
                      }}
                    >いいえ</Button>
                  </Form.Item>
                </Col>
              </Row>

            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0723001_AutoJudgeScreen);
