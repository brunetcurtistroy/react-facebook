import React from "react";
import PropTypes from "prop-types";

import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Modal,
  message,
  Spin,
  Tag,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import ModalDraggable from "components/Commons/ModalDraggable";
import WS0328001_ContractOfficeInfoInquirySub from "./WS0328001_ContractOfficeInfoInquirySub.jsx";
import WS0330001_ContractHistoricalQuerySub from "./WS0330001_ContractHistoricalQuerySub.jsx";
import WS0315004_ContractNumberInquiry from "./WS0315004_ContractNumberInquiry.jsx";
import WS0329001_ContractInsurerInfoInquirySub from "pages/BS_BasicInfo/V4KB0201000_ContractInfoMaintain/WS0329001_ContractInsurerInfoInquirySub";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";

import axios from "configs/axios";
import ConditionCopyService from "services/basicInfo/ContractInfoMaintain/ConditionCopyService.js";

/**
 * @extends {React.Component<{Li_Context:any, Li_ContractType:any, Li_ContractOrgCode:any, Li_ContractStartDate:any, Li_ContractNum:any}>}
 */
class WS0315002_ConditionCopy extends React.Component {
  static propTypes = {
    Li_Context: PropTypes.any,
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,

    recordData: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "条件複写";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      screenData: {},
      recordData: this.props.recordData,

      isLoadingScreenData: false,
      isLoadingExec: false,
    };

    this.onFinish = this.onFinish.bind(this);
    this.loadScreenData = this.loadScreenData.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState(
        {
          recordData: this.props.recordData,
        },
        () => {
          this.formRef.current.resetFields();
        }
      );
    }
  }

  componentDidMount() {
    this.loadScreenData();
  }

  loadScreenData() {
    this.setState({ isLoadingScreenData: true });
    const data = {
      Li_ContractType: this.props.Li_ContractType,
      Li_ContractOrgCode: this.props.Li_ContractOrgCode,
      Li_ContractStartDate: this.props.Li_ContractStartDate,
      Li_ContractNum: this.props.Li_ContractNum,
    };
    axios
      .get("/api/contract-info-maintain/condition-copy/getScreenData", {
        params: {
          data,
        },
      })
      .then((res) => {
        this.setState({
          screenData: res.data,
        });
        this.setState({ isLoadingScreenData: false });
      })
      .catch((error) => {
        message.error("画面情報の取得にはエラーが発生しました");
      });
  }
  fillInput = (e) => {
    console.log(e.target.value);
    const params = {
      Li_ContractType: e.target.value,
      Li_ContractOrgCode: this.getFormFieldValue(
        "ContractOrgCodeOriginal"
      ),
      Li_ContractStartDate: this.getFormFieldValue(
        "ContractStartDateOriginal"
      ),
    }
    axios.get('/api/contract-info-maintain/condition-copy/contract-type-original', { params })
      .then(res => {
        console.log(res)
        this.formRef.current.setFieldsValue({
          contract_name: res.data.contract_short_name,
          GT_contract_name: res.data.contract_name,
          medical_exam_course: res.data.medical_exam_course
        })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {

      })
  }
  getFormFieldValue(namePath) {
    return this.formRef.current
      ? this.formRef.current.getFieldValue(namePath)
      : undefined;
  }

  onFinish(values) {
    this.setState({ isLoadingExec: true });
    ConditionCopyService.CopyExec(values)
      .then((res) => {
        message.success(res.data.message);

        if (this.props.onFinishScreen) {
          this.props.onFinishScreen();
        }
      })
      .catch((error) => {
        console.log(error);
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingExec: false }));
  }

  render() {
    return (
      <div className="condition-copy">
        <Card title="条件複写">
          <Spin spinning={this.state.isLoadingScreenData}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{
                ContractTypeOriginal: this.props.Li_ContractType,
                ContractOrgCodeOriginal: this.props.Li_ContractOrgCode,
                contract_name_original: this.props.Li_ContractOrgName,
                ContractStartDateOriginal: this.props.Li_ContractStartDate,
                ContractNumOriginal: this.props.Li_ContractNum,
                contract_name_to: this.props.Li_ContractOrgName,
                ContractTypeTo: this.props.Li_ContractType,
                ContractOrgCodeTo: this.props.Li_ContractOrgCode,
                ContractStartDateTo: this.props.Li_ContractStartDate,
                ContractNumTo: this.props.Li_ContractNum,
                CourseCodeTo: this.state.recordData?.medical_exam_course,
                ContractOfficallyTo: this.state.recordData?.contract_name,
                ContractAbbreviationTo:
                  this.state.recordData?.contract_short_name,
                txtYearContract: this.props.recordData.HM_contract_name,
                medical_exam_course: this.props.recordData.medical_exam_course,
                contract_name: this.props.recordData.GS_contract_short_name,
                GT_contract_name: this.props.recordData.GT_contract_name,
              }}
            >
              <Card size="small">
                <Row>
                  <Col span={10}>
                    <Form.Item name="ContractTypeOriginal" label="種　別">
                      <Select
                        onChange={(value) => {
                          if (value == 0) {
                            this.formRef.current.setFieldsValue({
                              ContractOrgCodeOriginal: 0,
                            });
                          }
                          this.forceUpdate();
                        }}
                      >
                        {this.state.screenData.ContractTypes
                          ? this.state.screenData.ContractTypes.map(
                            (value, index) => (
                              <Select.Option
                                key={`cto-${index}`}
                                value={parseInt(value.node_code_name)}
                              >
                                {value.name}
                              </Select.Option>
                            )
                          )
                          : null}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <Form.Item label="団　体" name="ContractOrgCodeOriginal">
                      <Input.Search
                        onSearch={() => {
                          let component = null;
                          const ContractTypeOriginal = parseInt(
                            this.getFormFieldValue("ContractTypeOriginal")
                          );
                          if (ContractTypeOriginal === 1) {
                            component = (
                              <WS0329001_ContractInsurerInfoInquirySub
                                Li_Type={ContractTypeOriginal}
                                onFinishScreen={(data) => {
                                  console.log(213123123123, data);
                                  this.formRef.current.setFieldsValue({
                                    ContractOrgCodeOriginal:
                                      data.Lo_InsurerCode,
                                    contract_name_original:
                                      data.recordData.contract_name,
                                  });

                                  this.setState({
                                    contract_name_original:
                                      data.recordData.contract_name,
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });
                                }}
                              />
                            );
                          } else if (ContractTypeOriginal === 2) {
                            component = (
                              <WS0328001_ContractOfficeInfoInquirySub
                                Li_Type={ContractTypeOriginal}
                                onFinishScreen={(data) => {
                                  this.formRef.current.setFieldsValue({
                                    ContractOrgCodeOriginal: data.Lo_OfficeCode,
                                    contract_name_original:
                                      data.recordData.contract_name,
                                  });

                                  this.setState({
                                    contract_name_original:
                                      data.recordData.contract_name,
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });
                                }}
                              />
                            );
                          }

                          if (component) {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "60%",
                                component: component,
                              },
                            });
                          }
                        }}
                        disabled={
                          !(this.getFormFieldValue("ContractTypeOriginal") > 0)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="contract_name_original">
                      <Input
                        readOnly
                        style={{ border: "none", cursor: "default" }}
                      />
                    </Form.Item>
                    {/* {this.state.contract_name_original ? (
                      <span style={{ marginLeft: "0.5em" }}>
                        {this.state.contract_name_original}
                      </span>
                    ) : null} */}
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <Form.Item name="ContractStartDateOriginal" label="年　度">
                      <Input.Search
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 400,
                              component: (
                                <WS0330001_ContractHistoricalQuerySub
                                  Li_ContractType={this.getFormFieldValue(
                                    "ContractTypeOriginal"
                                  )}
                                  Li_ContractOrgCode={this.getFormFieldValue(
                                    "ContractOrgCodeOriginal"
                                  )}
                                  onFinishScreen={(data) => {
                                    console.log(9999, data);
                                    this.formRef.current.setFieldsValue({
                                      ContractStartDateOriginal:
                                        data.Lo_ContractStartDate,
                                      txtYearContract: data.recordData.contract_name,
                                    });

                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                // onClickedSelect={({
                                //   Lo_ContractStartDate,
                                // }) => {
                                //   this.formRef.current.setFieldsValue({
                                //     ContractStartDateOriginal:
                                //       Lo_ContractStartDate,
                                //   });

                                //   this.setState({
                                //     childModal: {
                                //       ...this.state.childModal,
                                //       visible: false,
                                //     },
                                //   });
                                // }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="txtYearContract">
                      <Input
                        readOnly
                        style={{ border: "none", cursor: "default" }}
                      />
                    </Form.Item>
                    {/* <span style={{ marginLeft: "0.5em" }}>
                      {this.state.txtYearContract}
                    </span> */}
                  </Col>
                </Row>
                <Row>
                  <Col span={7}>
                    <Form.Item name="ContractNumOriginal" label="コース">
                      <Input.Search
                        onBlur={(e) => {
                          this.fillInput(e)
                        }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '40%',
                              component: (
                                <WS0315004_ContractNumberInquiry
                                  Li_ContractType={this.getFormFieldValue(
                                    "ContractTypeOriginal"
                                  )}
                                  Li_ContractOrgCode={this.getFormFieldValue(
                                    "ContractOrgCodeOriginal"
                                  )}
                                  Li_ContractStartDate={this.getFormFieldValue(
                                    "ContractStartDateOriginal"
                                  )}
                                  onFinishScreen={(data) => {
                                    console.log(data);
                                    // this.formRef.current.setFieldsValue({
                                    //   ContractStartDateOriginal:
                                    //     data.Lo_ContractStartDate,
                                    //     txtYearContract:data.Lo_ContractStartDate,
                                    // });
                                    this.formRef.current.setFieldsValue({
                                      contract_name: data.contract_short_name,
                                      GT_contract_name: data.contract_name,
                                      medical_exam_course: data.medical_exam_course
                                    })
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                  onClickedSelect={({ Lo_ContractNum, recordData }) => {
                                    console.log(recordData);
                                    this.formRef.current.setFieldsValue({
                                      ContractNumOriginal: Lo_ContractNum,
                                      medical_exam_course: recordData.medical_exam_course,
                                      contract_name: recordData.contract_short_name,
                                      GT_contract_name: recordData.contract_name,
                                    });

                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item name="medical_exam_course">
                      <Input
                        readOnly
                        style={{ border: "none", cursor: "default" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} >
                    <Form.Item name="contract_name">
                      <Input
                        readOnly
                        style={{ border: "none", cursor: "default" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={13} offset={10}>
                    <Form.Item name="GT_contract_name">
                      <Input
                        readOnly
                        style={{ border: "none", cursor: "default" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Form.Item style={{ textAlign: "center" }}>
                <Tag color="#1890ff" style={{ padding: "0px 10px" }}>
                  <DownOutlined />
                </Tag>
              </Form.Item>

              <Card size="small">
                <Row>
                  <Col span={10}>
                    <Form.Item name="ContractTypeTo" label="種　別">
                      <Select
                        onChange={(value) => {
                          if (value == 0) {
                            this.formRef.current.setFieldsValue({
                              ContractOrgCodeTo: 0,
                            });
                          }
                          this.forceUpdate();
                        }}
                      >
                        {this.state.screenData.ContractTypes
                          ? this.state.screenData.ContractTypes.map(
                            (value, index) => (
                              <Select.Option
                                key={`ctt-${index}`}
                                value={parseInt(value.node_code_name)}
                              >
                                {value.name}
                              </Select.Option>
                            )
                          )
                          : null}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <Form.Item name="ContractOrgCodeTo" label="団　体">
                      <Input.Search
                        onSearch={() => {
                          let component = null;
                          const ContractTypeTo = parseInt(
                            this.getFormFieldValue("ContractTypeTo")
                          );
                          if (ContractTypeTo === 1) {
                            component = (
                              <WS0329001_ContractInsurerInfoInquirySub
                                Li_Type={ContractTypeTo}
                                onFinishScreen={(data) => {
                                  this.formRef.current.setFieldsValue({
                                    ContractOrgCodeTo: data.Lo_InsurerCode,
                                    contract_name_to:
                                      data.recordData.contract_name,
                                  });

                                  this.setState({
                                    contract_name_to:
                                      data.recordData.contract_name,
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });
                                }}
                              />
                            );
                          } else if (ContractTypeTo === 2) {
                            component = (
                              <WS0328001_ContractOfficeInfoInquirySub
                                Li_Type={ContractTypeTo}
                                onClickedSelect={(data) => {
                                  this.formRef.current.setFieldsValue({
                                    ContractOrgCodeTo: data.Lo_OfficeCode,
                                    contract_name_to:
                                      data.recordData.contract_name,
                                  });

                                  this.setState({
                                    contract_name_to:
                                      data.recordData.contract_name,
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });
                                }}
                              />
                            );
                          }

                          if (component) {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "60%",
                                component: component,
                              },
                            });
                          }
                        }}
                        disabled={
                          !(this.getFormFieldValue("ContractTypeTo") > 0)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="contract_name_to">
                      <Input
                        readOnly
                        style={{ border: "none", cursor: "default" }}
                      />
                    </Form.Item>
                    {/* <span style={{ marginLeft: "0.5em" }}>
                      {this.state.contract_name_to}
                    </span> */}
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <Form.Item name="ContractStartDateTo" label="年　度">
                      <Input.Search
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 400,
                              component: (
                                <WS0330001_ContractHistoricalQuerySub
                                  Li_ContractType={this.getFormFieldValue(
                                    "ContractTypeTo"
                                  )}
                                  Li_ContractOrgCode={this.getFormFieldValue(
                                    "ContractOrgCodeTo"
                                  )}
                                  onFinishScreen={(data) => {
                                    console.log(9999, data);
                                    this.formRef.current.setFieldsValue({
                                      ContractStartDateOriginal:
                                        data.Lo_ContractStartDate,
                                      txtYearContract: data.recordData.contract_name,
                                    });

                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                // onClickedSelect={({
                                //   Lo_ContractStartDate,
                                // }) => {
                                //   this.formRef.current.setFieldsValue({
                                //     ContractStartDateTo: Lo_ContractStartDate,
                                //   });

                                //   this.setState({
                                //     childModal: {
                                //       ...this.state.childModal,
                                //       visible: false,
                                //     },
                                //   });
                                // }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="txtYearContract">
                      <Input
                        readOnly
                        style={{ border: "none", cursor: "default" }}
                      />
                    </Form.Item>
                    {/* <span style={{ marginLeft: "0.5em" }}>
                      {this.state.txtYearContract}
                    </span> */}
                  </Col>
                </Row>
                <Row>
                  <Col span={5}>
                    <Form.Item name="ContractNumTo" label="コース">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="CourseCodeTo">
                      <Input.Search
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onSelect={({ Lo_CourseCode }) => {
                                    this.formRef.current.setFieldsValue({
                                      CourseCodeTo: Lo_CourseCode,
                                    });

                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={13}>
                    <Form.Item name="ContractOfficallyTo">
                      <Input type="text" style={{ marginLeft: "0.3em" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={13} offset={10}>
                    <Form.Item name="ContractAbbreviationTo">
                      <Input type="text" style={{ marginLeft: "0.5em" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Row>
                <Col
                  span={23}
                  style={{ textAlign: "right", marginLeft: "0.5em" }}
                >
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={this.state.isLoadingExec}
                    >
                      複写
                    </Button>
                  </Form.Item>
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

export default WS0315002_ConditionCopy;
