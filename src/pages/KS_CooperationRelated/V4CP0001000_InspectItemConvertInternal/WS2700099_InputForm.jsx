import React from "react";
import PropTypes, { checkPropTypes } from "prop-types";

import {
  Card,
  Form,
  Input,
  Select,
  Row,
  Col,
  Modal,
  Button,
  message,
} from "antd";

import { DoubleRightOutlined } from "@ant-design/icons";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import InputFormService from "services/CooperationRelated/InspectItemConvertInternal/InputForm.js";

class WS2700099_InputForm extends React.Component {
  static propTypes = {
    Li_InspectCodeOut: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "入力フォーム";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isLoadingData: false,

      showConvertCoefficientChar: false,
    };

    this.onFinish = this.onFinish.bind(this);
    this.loadInfo = this.loadInfo.bind(this);
  }

  componentDidMount() {
    this.loadInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadInfo();
    }
  }

  loadInfo() {
    this.setState({ isLoadingData: true });
    this.getScreenData();
  }

  onFinish(values) {
    this.setState({ isLoadingData: true });
  }

  getScreenData = () => {
    InputFormService.GetScreenData({
      Li_InspectCodeExternal: this.props.Li_InspectCodeOut,
    })
      .then((res) => {
        this.formRef.current.setFieldsValue(res.data);
        this.showConvertCoefficientChar();
        this.formRef.current.setFieldsValue({
          ConvertCoefficientChar: res.data.ConvertCoefficientChar,
        });
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

  externalInspectRegister = () => {
    InputFormService.ExternalInspectRegister({
      Li_InspectCodeExternal: this.props.Li_InspectCodeOut,
      InspectCodeOut: this.formRef.current?.getFieldValue("InspectCodeOut"),
      InspectName: this.formRef.current?.getFieldValue("InspectName"),
      InspectTypeOut: this.formRef.current?.getFieldValue("InspectTypeOut"),
      ItemCodeMedicalExam: this.formRef.current?.getFieldValue(
        "ItemCodeMedicalExam"
      ),
      InspectValueConvertDivision: this.formRef.current?.getFieldValue(
        "InspectValueConvertDivision"
      ),
      ConvertCoefficientChar: this.formRef.current?.getFieldValue(
        "ConvertCoefficientChar"
      ),
    })
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen();
        }
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

  inspectChange = () => {
    InputFormService.InspectItem({
      ItemCodeMedicalExam: this.formRef.current?.getFieldValue(
        "ItemCodeMedicalExam"
      ),
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          exam_short_name: res.data.exam_short_name,
          Expression_21: res.data.Expression_21,
          exam_name: res.data.exam_name,
        });
        if (!this.formRef.current?.getFieldValue("InspectName")){
          this.formRef.current.setFieldsValue({
            InspectName: res.data.exam_name,
          });
        }
        if (!this.formRef.current?.getFieldValue("InspectTypeOut")){
          this.formRef.current.setFieldsValue({
            InspectTypeOut: res.data.Expression_21,
          });
        }
         
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

  showConvertCoefficientChar = () => {
    this.setState({
      showConvertCoefficientChar:
        this.formRef.current?.getFieldValue("InspectValueConvertDivision") == 2,
    });
  };

  render() {
    return (
      <div className="input-form">
        <Card title="入力フォーム">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
              <Col span={9}>
                <div style={{ border: "1px solid #f0f0f0", padding: "0.1em" }}>
                  <Row style={{ background: "#1890ff", marginBottom: "1em" }}>
                    <Col span={24}>
                      <div style={{ textAlign: "center", fontWeight: 'bold', fontSize: '14px', color:'#ffffff', paddingTop:'2px', paddingBottom: '2px' }}>外部検査</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item  name="InspectCodeOut" label="コード">
                        <Input style={{textAlign:'right'}} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{marginBottom:' 17px'}} span={18}>
                      <Form.Item name="InspectName" label="名　称">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={12}>
                      <Form.Item name="InspectTypeOut" label="タイプ">
                        <Select>
                          <Select.Option value=""></Select.Option>
                          <Select.Option value="N">整数</Select.Option>
                          <Select.Option value="N1">小数1</Select.Option>
                          <Select.Option value="N2">小数2</Select.Option>
                          <Select.Option value="N3">小数3</Select.Option>
                          <Select.Option value="N4">小数4</Select.Option>
                          <Select.Option value="X">文字</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={6}>
                <br />
                <br />
                <Row gutter={24}>
                  <Col offset={4} style={{ width: '63%'}}>
                    <Button
                      type="primary"
                      style={{ marginBottom: "0.5em" }}
                      block
                    >
                      取込 <DoubleRightOutlined />
                    </Button>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={15} offset={4}>
                    <Form.Item name="InspectValueConvertDivision" label="変 換">
                      <Select onChange={this.showConvertCoefficientChar}>
                        <Select.Option value={0}> </Select.Option>
                        <Select.Option value={1}>変換なし</Select.Option>
                        <Select.Option value={2}>桁数変換</Select.Option>
                        <Select.Option value={3}>文字変換</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                <Col span={8} ></Col>
                  <Col span={11} >
                    {this.state.showConvertCoefficientChar && (
                      <Form.Item name="ConvertCoefficientChar" label="">
                        <Select>
                          <Select.Option value="-4">×0.0001</Select.Option>
                          <Select.Option value="-3">× 0.001</Select.Option>
                          <Select.Option value="-2">× 0.01</Select.Option>
                          <Select.Option value="-1">× 0.1</Select.Option>
                          <Select.Option value="0"> </Select.Option>
                          <Select.Option value="1">× 10</Select.Option>
                          <Select.Option value="2">× 100</Select.Option>
                          <Select.Option value="3">× 1000</Select.Option>
                          <Select.Option value="4">× 10000</Select.Option>
                        </Select>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={9}>
                <div style={{ border: "1px solid #f0f0f0", padding: "0.1em" }}>
                  <Row style={{ background: "#1890ff", marginBottom: "1em" }}>
                    <Col span={24}>
                      <div style={{textAlign: "center", fontWeight: 'bold', fontSize: '14px', color:'#ffffff', paddingTop:'2px', paddingBottom: '2px' }}>健　　診</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="ItemCodeMedicalExam" label="コード">
                        <Input.Search
                        style={{textAlign: "right"}}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 800,
                                component: (
                                  <WS0271001_InspectItemSearchQuerySingle
                                    onFinishScreen={({
                                      Lio_InspectItemCode,
                                    }) => {
                                      this.formRef.current.setFieldsValue({
                                        ItemCodeMedicalExam:
                                          Lio_InspectItemCode,
                                      });
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        },
                                      });
                                      this.inspectChange();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          onChange={this.inspectChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={13}>
                      <Form.Item label="名　称">
                        <Input.Group>
                          <Form.Item name="exam_short_name">
                            <Input disabled />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                    </Col>
                    </Row>
                    <Row>
                    <Col style={{maxWidth: '15.666667%'}} span={4}></Col>
                    <Col span={20}>
                      <Form.Item label="">
                        <Input.Group>
                          <Form.Item name="exam_name">
                            <Input disabled />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11}>
                      <Form.Item name="Expression_21" label="タイプ">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Button
              style={{ float: "right" }}
              className="mt-3"
              type="primary"
              htmlType="submit"
              onClick={this.externalInspectRegister}
            >
              登録
            </Button>
          </Form>
        </Card>
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

export default WS2700099_InputForm;
