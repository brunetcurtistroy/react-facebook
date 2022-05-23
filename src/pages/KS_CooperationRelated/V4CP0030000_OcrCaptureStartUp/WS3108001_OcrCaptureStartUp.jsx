/* eslint-disable no-useless-concat */
/* eslint-disable eqeqeq */
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";
import {
  Button,
  Card,
  Row,
  Form,
  Input,
  Modal,
  Space,
  message,
  Spin,
  InputNumber,
} from "antd";

import WS3108008_ProcessSelectQuery from "pages/KS_CooperationRelated/V4CP0030000_OcrCaptureStartUp/WS3108008_ProcessSelectQuery.jsx";
import WS0061009_CheckYesNoYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx";
import WS0061012_CheckYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061012_CheckYes.jsx";
import OcrCaptureStartUpAction from "redux/CooperationRelated/OcrCaptureStartUp/OcrCaptureStartUp.action";
import { SearchOutlined } from "@ant-design/icons";
import ConfirmAcquisitionTargetAction from "redux/CooperationRelated/OcrCaptureStartUp/ConfirmAcquisitionTarget.action";
import moment from "moment";
import WS1107001_SettingOcrCapture from "./WS1107001_SettingOcrCapture";
import WS1523001_UserOptionInfoMaintain from "pages/SM_SystemMaintenance/V4SM0031010_UserOptionInfoMaintain/WS1523001_UserOptionInfoMaintain";
import WS0449001_UserParamMaintain from "pages/SM_SystemMaintenance/V4MS9900800_UserParamMaintain/WS0449001_UserParamMaintain";
import WS3108015_ConfirmAcquisitionTarget from "./WS3108015_ConfirmAcquisitionTarget";
import { parseInt } from "lodash";

let today = moment(new Date());
class WS3108001_OcrCaptureStartUp extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "OCR取込み起動";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isShowUnder: false,

      isLoadingForm: false,
    };
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getScreenData();
    }
  }

  getScreenData() {
    this.setState({ isLoadingForm: true });
    OcrCaptureStartUpAction.getScreenData()
      .then((res) => {
        this.setState({ isLoadingForm: false });
        this.formRef.current?.setFieldsValue({
          ProcessSelect: "",
          ProcessSelectCopy: "",
          Expression_3: res.data?.Expresstion_3,
        });
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false });
        const res = err.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(err.response.data.message);
      });
  }

  getInfoProcess() {
    let params = {
      ProcessSelect: this.formRef.current?.getFieldValue("ProcessSelect"),
    };
    OcrCaptureStartUpAction.getInfoProcess(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          Expression_3: res.data?.Expresstion_3,
        });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(err.response.data.message);
      });
  }

  callApiRead(data) {
    this.setState({ isLoadingForm: true });
    OcrCaptureStartUpAction.ReadButton(data)
      .then((res) => {
        this.setState({ isLoadingForm: false });
        if (res?.data) {
          if (
            res?.data?.GetTargetConfirm === "Y" ||
            res?.data?.GetTargetConfirm === "E"
          ) {
            this.onShowModalConfirmAcquisition(res.data.GetTargetConfirm);
          } else {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: true,
                width: "95%",
                component: (
                  <WS0061012_CheckYes
                    Li_Message={"ＯＣＲデータが存在しません"}
                    onFinishScreen={() => {
                      this.closeModal();
                    }}
                  />
                ),
              },
            });
          }
        }
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false });
        const res = err.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(err.response.data.message);
      });
  }

  batchDeleteBefore() {
    let params = {};
    OcrCaptureStartUpAction.batchDeleteBefore(params)
      .then((res) => {
        if (res?.data?.call === "Call after") {
          let title = (
            <span>
              OCRの読み取りデータを初期化します。 <br /> よろしいですか？
            </span>
          );
          Modal.info({
            width: 390,
            title: title,
            onOk: () => {
              this.batchDeleteAfter();
            },
          });
        } else {
          Modal.info({
            width: 300,
            title: "読み込み済みのデータはありません。",
          });
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(err.response.data.message);
      });
  }

  batchDeleteAfter() {
    OcrCaptureStartUpAction.batchDeleteAfter()
      .then((res) => {})
      .catch((err) => {
        this.setState({ isLoadingForm: false });
        const res = err.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(err.response.data.message);
      });
  }

  onShowModalConfirmAcquisition(value) {
    console.log("vao1");
    let params = {
      GetTargetConfirm: value,
    };

    this.setState({ isLoadingTable: true });
    ConfirmAcquisitionTargetAction.getListData(params)
      .then((res) => {
        if (res[0]) {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: "90%",
              component: (
                <WS3108015_ConfirmAcquisitionTarget
                  Li_GetTargetConfirm={value}
                  onFinishScreen={(output) => {
                    if (output.Lo_StsDataUpdateRun) {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "95%",
                          component: (
                            <WS0061012_CheckYes
                              Li_Message={"OCR取込処理が終了しました"}
                              onFinishScreen={() => {
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }
                    this.closeModal();
                  }}
                />
              ),
            },
          });
        } else {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 340,
              component: (
                <WS0061012_CheckYes
                  Li_Message={"OCRデータが存在しません"}
                  Li_Title={"確認"}
                  onFinishScreen={() => {
                    this.closeModal();
                  }}
                />
              ),
            },
          });
        }
      })
      .finally(() => {});
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="ocr-capture-start-up">
        <Spin spinning={this.state.isLoadingForm}>
          <Card title="OCR取込み起動" style={{ width: 500 }}>
            <Space>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "95%",
                      component: (
                        <WS1107001_SettingOcrCapture
                          onFinishScreen={() => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                取込設定
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "90%",
                      component: (
                        <WS1523001_UserOptionInfoMaintain
                          Li_OptionCode={"V3OCR,CP0030001"}
                          Li_Expansion={2}
                          onFinishScreen={() => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                ﾕｰｻﾞｰｵﾌﾟｼｮﾝ
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 500,
                      component: (
                        <WS0449001_UserParamMaintain
                          onFinishScreen={() => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                ﾕｰｻﾞｰﾊﾟﾗﾒｰﾀ
              </Button>
              <Button
                onClick={() => {
                  this.batchDeleteBefore();
                }}
              >
                ﾊﾞｯﾁ削除
              </Button>
            </Space>
            <hr style={{ margin: "10px 0 30px 0" }} />
            <Form
              ref={this.formRef}
              initialValues={{
                DateFChar: today,
                DateTChar: today,
              }}
            >
              <div hidden>
                <Form.Item name="TextOcr">
                  <Input />
                </Form.Item>
                <Form.Item name="TextRename">
                  <Input />
                </Form.Item>
                <Form.Item name="TextMedicalExam">
                  <Input />
                </Form.Item>
                <Form.Item name="TextError">
                  <Input />
                </Form.Item>
                <Form.Item name="Id">
                  <Input />
                </Form.Item>
                <Form.Item name="IdMixed">
                  <Input />
                </Form.Item>
                <Form.Item name="ProcessSelect">
                  <Input />
                </Form.Item>
              </div>

              <Row
                gutter={24}
                style={{ padding: "0 20px", marginBottom: "10px" }}
              >
                <Form.Item
                  style={{ marginBottom: 0, width: 165 }}
                  label="処理選択"
                >
                  <Row>
                    <Form.Item
                      name="ProcessSelectCopy"
                      style={{ marginBottom: 0 }}
                    >
                      <InputNumber
                        style={{ width: 70 }}
                        min={0}
                        maxLength={2}
                        onBlur={(e) => {
                          this.formRef.current?.setFieldsValue({
                            ProcessSelectCopy:
                              e.target.value > 0 ? e.target.value : "",
                          });
                          if (
                            e.target.value !=
                            this.formRef.current?.getFieldValue("ProcessSelect")
                          ) {
                            this.formRef.current?.setFieldsValue({
                              ProcessSelect: e.target.value,
                              ProcessSelectCopy:
                                e.target.value > 0 ? e.target.value : "",
                            });
                            this.getInfoProcess();
                          }
                        }}
                      />
                    </Form.Item>
                    <Button
                      style={{ width: 25, paddingLeft: 5, borderLeft: "none" }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 400,
                            component: (
                              <WS3108008_ProcessSelectQuery
                                onFinishScreen={(output) => {
                                  this.formRef.current.setFieldsValue({
                                    ProcessSelect: output.recordData.No,
                                    ProcessSelectCopy:
                                      parseInt(output.recordData.No) === 0
                                        ? ""
                                        : output.recordData.No,
                                    Expression_3:
                                      output.recordData.ProcessSelectName,
                                  });
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    >
                      {<SearchOutlined />}
                    </Button>
                  </Row>
                </Form.Item>
                <Form.Item
                  name="Expression_3"
                  style={{ marginBottom: 0, width: "calc(100% - 165px)" }}
                >
                  <Input
                    type="text"
                    style={{ background: "transparent", border: "none" }}
                  />
                </Form.Item>
              </Row>
              <Row
                gutter={24}
                style={{ padding: "0 20px", marginBottom: "10px" }}
              >
                <Form.Item label="対象日付">
                  <Space>
                    <Form.Item name="DateFChar" style={{ marginBottom: 0 }}>
                      <VenusDatePickerCustom
                        formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        allowClear={false}
                      />
                    </Form.Item>
                    <span>~</span>
                    <Form.Item name="DateTChar" style={{ marginBottom: 0 }}>
                      <VenusDatePickerCustom
                        formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        allowClear={false}
                      />
                    </Form.Item>
                    <span
                      style={{
                        marginLeft: 5,
                        fontWeight: 500,
                        color: "#14468c",
                      }}
                    >
                      に受診の方
                    </span>
                  </Space>
                </Form.Item>
              </Row>
              <Row gutter={24} style={{ float: "right", padding: "0 20px" }}>
                <Space>
                  <span
                    style={{ marginRight: "15px", fontWeight: "bold" }}
                    hidden={!this.state.isShowUnder}
                  >
                    ･･･取込中
                  </span>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (
                        moment(
                          this.formRef.current.getFieldValue("DateFChar")
                        ).valueOf() >
                        moment(
                          this.formRef.current.getFieldValue("DateTChar")
                        ).valueOf()
                      ) {
                        let title =
                          "「" +
                          moment(
                            this.formRef.current.getFieldValue("DateFChar")
                          )?.format("YYYY/MM/DD") +
                          "」" +
                          " 以降の日付を設定してください";
                        Modal.error({
                          width: 350,
                          title: title,
                          okText: "OK",
                        });
                      } else {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 300,
                            component: (
                              <WS0061009_CheckYesNoYes
                                Li_DisplayContent={"確認して下さい!"}
                                onFinishScreen={(output) => {
                                  if (output.Lio_StsReturn) {
                                    let data = {
                                      ...this.formRef.current.getFieldValue(),
                                      DateFChar: moment(
                                        this.formRef.current.getFieldValue(
                                          "DateFChar"
                                        )
                                      )?.format("YYYY/MM/DD"),
                                      DateTChar: moment(
                                        this.formRef.current.getFieldValue(
                                          "DateTChar"
                                        )
                                      )?.format("YYYY/MM/DD"),
                                    };

                                    this.callApiRead(data);
                                  }
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }
                    }}
                  >
                    読取
                  </Button>
                </Space>
              </Row>
            </Form>
          </Card>
        </Spin>
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS3108001_OcrCaptureStartUp);
