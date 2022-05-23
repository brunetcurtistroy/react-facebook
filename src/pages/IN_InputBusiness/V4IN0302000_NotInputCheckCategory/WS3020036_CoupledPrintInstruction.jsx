import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Input, Select, Checkbox, Button, Row, Col, Modal, Space, message, Spin } from "antd";
import WS3020054_StyleQuery from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS3020054_StyleQuery.jsx';
import WS3022038_BindingModeSetting from 'pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS3022038_BindingModeSetting.jsx';
import WS0433001_PrinterConfirm from 'pages/SK_IntroductionLetter/V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm.jsx';
import CoupledPrintInstruction from 'redux/InputBusiness/NotInputCheckCategory/CoupledPrintInstruction.action'
import ModalDraggable from "components/Commons/ModalDraggable";
import { download_file } from "helpers/CommonHelpers";

const smGrid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class WS3020036_CoupledPrintInstruction extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_Parameters: PropTypes.any,

  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '結合印刷指示';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      Style: "",
      style_name: "",
      NumOfCopies: "",
      InputFlag: [],
      L2Output: false,
      L3Output: false,
      Submission: false,
      OrgsTowards: null,
      ComboBox_OrgsTowards: [],
      isLoadingPrint: false,
    };
  }
  componentDidMount() {
    this.GetScreenData()
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.GetScreenData()
    }
  }
  GetScreenData() {
    const params = {
      Li_CourseLevel: this.props.Li_CourseLevel,
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_Parameters: this.props.Li_Parameters || "",
    }
    this.setState({ isLoading: true })
    CoupledPrintInstruction.GetScreenData(params)
      .then(res => {
        this.setState({
          Style: res.Style,
          style_name: res.style_name,
          NumCopies: res.NumCopies,
          InputFlag: res.InputFlag,
          L2Output: res.L2Output,
          L3Output: res.L3Output,
          Submission: res.Submission,
          OrgsTowards: res.OrgsTowards,
          Expression_12: res.CommentControl,
          Expression_13: res.UseSubmission,
          ComboBox_OrgsTowards: res.ComboBox_OrgsTowards
        });
        let data = {
          ...res,
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
  onEventF12 = (output) => {
    this.setState({
      isLoadingPrint: true
    })
    let params = {
      StsConfirm: 6,
      Li_CourseLevel: this.props.Li_CourseLevel || "",
      Li_ReserveNum: this.props.Li_ReserveNum || "",
      Style: this.formRef.current.getFieldValue('Style'),
      PrinterNum: output.Lo_PrinterNo,
      Preview: output.Lo_Preview ? 1 : 0,
      NumCopies: this.state.NumCopies,
      InputFlag: this.formRef.current.getFieldValue('InputFlag'),
      L1Output: this.state.L1Output ? 1 : 0,
      L2Output: this.state.L2Output ? 1 : 0,
      L3Output: this.state.L3Output ? 1 : 0,
      OrgsTowards: this.formRef.current.getFieldValue('OrgsTowards'),
      Submission: this.state.Submission ? 1 : 0,
    }
    CoupledPrintInstruction.PrintF12(params)
      .then(res => {
        if (res.data.message) {
          return Modal.warning({
            title: res.data.message,
            width: 300,
          });
        } else {
          download_file(res);
          message.success("完了！");
        }
      })
      .catch(error => {
        return;
      })
      .finally(() => {
        this.setState({
          isLoadingPrint: false,
        })
      })
  }
  onFinish(values) {

  }

  render() {
    return (
      <div className="coupled-print-instruction">
        <Card title="結合印刷指示">
          <Spin spinning={this.state.isLoadingPrint}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{ InputFlag: "", OrgsTowards: 0 }}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="Style"
                    label="様 &emsp; 式"
                    {...smGrid}
                  >
                    <Input.Search type="text"
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1600,
                            component:
                              <WS3020054_StyleQuery
                                onFinishScreen={(Output) => {
                                  this.formRef.current.setFieldsValue({
                                    Style: Output.Lio_ParentCode,
                                    style_name: Output.recordData.style_name
                                  });
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
                            width: 1600,
                            component: (
                              <WS3020054_StyleQuery
                                onFinishScreen={(Output) => {
                                  this.formRef.current.setFieldsValue({
                                    Style: Output.Lio_ParentCode,
                                    style_name: Output.recordData.style_name
                                  });
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
                    name="style_name"
                  >
                    <span>{this.formRef.current?.getFieldValue("style_name")}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="NumCopies"
                    label="部 &emsp; 数"
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
                    <Select disabled={!this.state.Expression_12}>
                      <Select.Option value="0">通常</Select.Option>
                      <Select.Option value="1">シークレット</Select.Option>
                      <Select.Option value="2">全て</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item
                    name="L2Output"
                    valuePropName="checked"
                  >
                    <Checkbox disabled={!this.state.Expression_12} style={{ color: "#14468C", fontWeight: "bold" }}>L2</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item
                    name="L3Output"
                    valuePropName="checked"
                  >
                    <Checkbox disabled={!this.state.Expression_12} style={{ color: "#14468C", fontWeight: "bold" }}>L3</Checkbox>
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
                    <Checkbox disabled={!this.state.Expression_13}></Checkbox>
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
                      {
                        this.state.ComboBox_OrgsTowards.map((res) => (
                          <Select.Option value={res.LinkedField}>{res.DisplayField}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}></Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Button type="primary" style={{ float: "right" }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 400,
                          component:
                            <WS0433001_PrinterConfirm
                              onFinishScreen={(output) => {
                                console.log(output);
                                if (output.Lo_StsOutput) {
                                  this.onEventF12(output);
                                }
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
                  <Button type="primary" style={{ float: "right", marginRight: "10px" }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1400,
                          component:
                            <WS3022038_BindingModeSetting
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
                  >設定</Button>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
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

export default connect(mapStateToProps, mapDispatchToProps)(WS3020036_CoupledPrintInstruction);
