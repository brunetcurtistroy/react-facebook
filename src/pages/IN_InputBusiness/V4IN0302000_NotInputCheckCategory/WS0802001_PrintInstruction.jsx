import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Checkbox, Button, Row, Col, Modal, Menu, Space, message, } from "antd";
import WS0804032_HistorySetting from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0804032_HistorySetting.jsx';
import WS1362003_PrintProcess from 'pages/TK_SpecificMedicalExamination/V4TK5100000_SpecificHealthDataXmlOutput/WS1362003_PrintProcess.jsx';
import PrintInstruction from 'redux/InputBusiness/NotInputCheckCategory/PrintInstruction.action';
import WS0286001_PrintStyleInquiry from 'pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry.jsx';
import WS0282001_StyleSpecificInspectInquiry from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0282001_StyleSpecificInspectInquiry.jsx';
import HistorySettingAction from "redux/InputBusiness/NotInputCheckCategory/HistorySetting.action";

const smGrid = {
  labelCol: { span: 5 },
  wrapperCol: { spap: 19},
};
class WS0802001_PrintInstruction extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_NormalAndOrgs: PropTypes.any,
    Li_Parameters: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '印刷指示';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      Style: "",
      format_name: "",
      NumCopies: "",
      InputFlag: [],
      L2Output: false,
      L3Output: false,
      Submission: false,
      OrgsTowards: [],
      Expression_6: 0,
      Expression_10: 0,
      Expression_22: 0,
      Expression_23: 0,
      Expression_27: 0,

      dataHistorySetting: {},
      changeHistory: false
    };
  }
  componentDidMount() {
    this.GetScreenData()
  }
  GetScreenData() {
    const params = {
      Li_CourseLevel: this.props.Li_CourseLevel || 0,
      Li_ReserveNum: this.props.Li_ReserveNum || 201603029000001,
      Li_Parameters: this.props.Li_Parameters || "",
    }
    this.setState({ isLoading: true })
    PrintInstruction.GetScreenData(params)
      .then(res => {
        console.log(res);
        this.setState({
          Style: res.data.Style,
          format_name: res.data.format_name,
          NumCopies: res.data.NumCopies,
          InputFlag: res.data.InputFlag,
          L2Output: res.data.L2Output,
          L3Output: res.data.L3Output,
          Submission: res.data.Submission,
          OrgsTowards: res.data.OrgsTowards,
          Expression_6: res.data.Expression_6,
          Expression_10: res.data.Expression_10,
          Expression_21: res.data.Expression_21,
          Expression_23: res.data.UseSubmission,
          Expression_37: res.data.Expression_37,

        });
        let data = {
          ...res.data,
          OrgsTowards: 0,
        };
        this.formRef.current.setFieldsValue(data);
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
 
  closeScreenHistory() {
    let params = {
      ...this.state.dataHistorySetting
    }

    HistorySettingAction.closeScreen(params)
      .then((res) => {

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

  saveDataHistorySetting() {
    let params = {
      Style: this.formRef.current?.getFieldValue('Style'),
    }
    console.log(this.state.dataHistorySetting)

    HistorySettingAction.saveData(params)
      .then((res) => {
        this.closeScreenHistory()
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

  onFinish(values) {

  }

  render() {
    return (
      <div className="print-instruction">

        <Card title="印刷指示">
          <Space>
            <Button
              disabled={!this.state.Expression_10}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '30%',
                    component: (
                      <WS0282001_StyleSpecificInspectInquiry
                        onFinishScreen={(output) => {
                          this.formRef.setFieldsValue({
                            StsOutputConfirm: output.Lo_StsOutput
                          })
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                });
              }} >F10</Button>
          </Space>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="Style"
                  label="様  式"
                  {...smGrid}
                >
                  <Input.Search type="text"
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component:
                            <WS0286001_PrintStyleInquiry
                              onFinishScreen={(Output) => {
                                this.formRef.current.setFieldsValue({
                                  Style: Output.Lio_StyleCode,
                                  format_name: Output.Lo_FormatName
                                });
                                this.setState({
                                  Style: Output.Lio_StyleCode,
                                  format_name: Output.Lo_FormatName
                                })
                                this.closeModal()
                              }}
                            />
                          ,
                        },
                      });
                    }}
                    onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component: (
                            <WS0286001_PrintStyleInquiry
                              onFinishScreen={(Output) => {
                                this.formRef.current.setFieldsValue({
                                  Style: Output.Lio_StyleCode,
                                  format_name: Output.Lo_FormatName
                                });
                                this.setState({
                                  Style: Output.Lio_StyleCode,
                                  format_name: Output.Lo_FormatName
                                })
                                this.closeModal()
                              }}
                            />
                          ),
                        },
                      })
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: "0" }}>
                <Form.Item
                  name="format_name"
                >
                  <span>{this.formRef.current?.getFieldValue("format_name")}</span>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="NumCopies"
                  label="部  数"
                  {...smGrid}
                >
                  <Input type="number" min="0" />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="InputFlag"
                  label="コメント"
                  {...smGrid}
                >
                  <Select  disabled={!this.state.Expression_21}>
                    <Select.Option value={0}>通常</Select.Option>
                    <Select.Option value={1}>シークレット</Select.Option>
                    <Select.Option value={2}>全て</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  name="L2Output"
                  valuePropName="checked"
                >
                  <Checkbox disabled={!this.state.Expression_21} style={{ color: "#14468C", fontWeight: "bold" }}>L2</Checkbox>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  name="L3Output"
                  valuePropName="checked"
                >
                  <Checkbox disabled={!this.state.Expression_21} style={{ color: "#14468C", fontWeight: "bold" }}>L3</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8}></Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="Submission"
                  label="提出用"
                  valuePropName="checked"
                  {...smGrid}
                >
                  <Checkbox disabled={!this.state.Expression_23}></Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="OrgsTowards"
                  label="提出先"
                  {...smGrid}
                >
                  <Select>
                    <Select.Option value={0}>個人</Select.Option>
                    <Select.Option value={1}>団体</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Button
                  disabled={!this.state.Expression_3}
                  type="primary"
                  style={{ float: "right" }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 1600,
                        component:
                          <WS1362003_PrintProcess
                            onClickedCreate={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />
                        ,
                      },
                    });
                  }}
                >印　刷</Button>
                <Button
                  disabled={!this.state.Style}
                  type="primary"
                  style={{ float: "right", marginRight: "10px" }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 450,
                        component:
                          <WS0804032_HistorySetting
                            Li_StyleCode={this.formRef.current?.getFieldValue('Style')}
                            onChangeValue={(output) => {
                              this.setState({
                                dataHistorySetting: output.dataHistory,
                                changeHistory: true
                              })
                            }}
                            onFinishScreen={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />
                        ,
                      },
                    });
                  }}
                >履歴設定</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            if(this.state.changeHistory) {
              this.closeScreenHistory()
              this.setState({
                changeHistory: false
              })
            }
            this.closeModal()
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0802001_PrintInstruction);
