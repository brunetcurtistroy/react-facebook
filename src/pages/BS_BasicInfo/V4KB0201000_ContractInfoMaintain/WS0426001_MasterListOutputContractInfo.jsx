import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import PropTypes from 'prop-types';

import {
  Card, Form, Col, Row, Input, Checkbox, Select, Button, Modal, DatePicker, message,
} from "antd";
import WS0246001_InsurerInfoSearchQuery from "../V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0247001_OfficeInfoRetrievalQuery from "../V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0265001_BasicCourseInquiry from "../V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import WS0431001_CsvPreviewConfirm from "pages/TO_StatisticalServices/V4TO0014000_OfficeVisitsAchievementSituation/WS0431001_CsvPreviewConfirm";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import axios from "axios";
import { download_file } from "helpers/CommonHelpers";

class WS0426001_MasterListOutputContractInfo extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_StsContractType: PropTypes.any,
    Li_StsContractOrgCode: PropTypes.any,
    Li_StsContractStartDate: PropTypes.any,
    Li_StsContractNum: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "マスタ一覧出力";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isLoading: false,
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.formRef.current.resetFields();
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.formRef.current.resetFields();
      this.forceUpdate();
    }
  }

  hideChildModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }

  onFinish(values) {
    if (!(values.TermsAndCondition || values.ContractSet || values.ContractInspect)) {
      message.error('出力様式を選択してください');
      return;
    }

    let OutputMethod = '';
    let Output = '';
    let Preview = false;

    this.setState({
      childModal: {
        ...this.state.childModal,
        width: 300,
        visible: true,
        component: (<WS0431001_CsvPreviewConfirm
          onFinishScreen={(output) => {
            OutputMethod = output.Lio_OutputMethod;
            Output = output.Lio_Output;
            Preview = output.Lio_Preview;

            if (OutputMethod !== '') {
              this.hideChildModal();

              this.setState({ isLoading: true });

              axios.post('/api/contract-info-maintain/master-list-output-contract-info/Output_F12', {
                ...this.formRef.current.getFieldValue(),
                OutputMethod,
                Output,
                Preview,
              }, {responseType: 'blob'})
                .then(res => {
                  download_file(res, Preview);
                })
                .catch(error => {
                  console.log(error);
                  const res = error.response;
                  if (!res || !res.data || !res.data.message) {
                    message.error('エラーが発生しました');
                    return;
                  }

                  message.error(res.data.message);
                })
                .finally(() => this.setState({ isLoading: false }));
            }
          }}
        />),
      }
    });
  }

  render() {
    return (
      <div className="master-list-output-contract-info">
        <Card title="マスタ一覧出力">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{
            ContractType: this.props.Li_ContractType || 0,
            ContractOrgCode: this.props.Li_ContractOrgCode || 0,
            ContractStartDate: this.props.Li_ContractStartDate,
            ContractNum: this.props.Li_ContractNum,

            StsContractType: this.props.Li_StsContractType,
            StsContractOrgCode: this.props.Li_StsContractOrgCode,
            StsContractStartDate: this.props.Li_StsContractStartDate,
            StsContractNum: this.props.Li_StsContractNum,

            StsLainspect: !this.props.Li_StsContractStartDate,
          }}>
            <Card title="契約抽出">
              <Row>
                <Col span={6}>
                  <Form.Item name="StsContractType" label=" " labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} valuePropName="checked">
                    <Checkbox onChange={() => this.forceUpdate()}>種　別</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="ContractType" label=" " labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <Select allowClear disabled={!this.formRef.current?.getFieldValue('StsContractType')} onChange={(value) => {
                      if (value === 0) {
                        this.formRef.current.resetFields(['ContractOrgCode']);
                      } else {
                        this.formRef.current.setFieldsValue({
                          ContractOrgCode: '',
                        });
                      }
                      this.forceUpdate();
                    }}>
                      <Select.Option value={0}>共　通</Select.Option>
                      <Select.Option value={1}>保険者</Select.Option>
                      <Select.Option value={2}>事業所</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
              </Row>

              <Row>
                <Col span={6}>
                  <Form.Item name="StsContractOrgCode" label=" " labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} valuePropName="checked">
                    <Checkbox onChange={() => this.forceUpdate()}>団　体</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="ContractOrgCode" label=" " labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <Input.Search
                      disabled={!(this.formRef.current?.getFieldValue('StsContractOrgCode') && (this.formRef.current?.getFieldValue('ContractType') > 0))}
                      onSearch={() => {
                        const ContractType = this.formRef.current.getFieldValue('ContractType');
                        let component = null;
                        if (ContractType === 1) {
                          component = (<WS0246001_InsurerInfoSearchQuery
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                ContractOrgCode: output.Lo_InsurerCode,
                                Expression_22: output.recordData.insurer_kanji_name,
                              });

                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                }
                              });
                            }}
                          />);
                        } else if (ContractType === 2) {
                          component = (<WS0247001_OfficeInfoRetrievalQuery
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                ContractOrgCode: output.Lio_OfficeCode,
                                Expression_22: output.recordData.office_kanji_name,
                              });

                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                }
                              });
                            }}
                          />);
                        }

                        if (component) {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              width: 800,
                              visible: true,
                              component: component,
                            }
                          });
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="" label=" " labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <div>{(() => {
                      const CType = this.formRef.current?.getFieldValue('ContractType');
                      switch (CType) {
                        case 1:
                          break;
                        case 2:
                          break;
                        default: return '共通';
                      }
                      return this.formRef.current?.getFieldValue('ContractOrgCode') ? this.formRef.current?.getFieldValue('Expression_22') : false;
                    })()}</div>
                  </Form.Item>
                </Col>
                <Col span={6}></Col>
              </Row>

              <Row>
                <Col span={6}>
                  <Form.Item name="StsContractStartDate" label=" " labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} valuePropName="checked">
                    <Checkbox onChange={(checked) => {
                      if (checked) {
                        this.formRef.current.setFieldsValue({
                          StsLainspect: false,
                        });
                      }
                      this.forceUpdate();
                    }}>年　度</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="ContractStartDateChar" label=" " labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef}
                      disabled={!this.formRef.current?.getFieldValue('StsContractStartDate')}
                      format="YYYY/MM/DD"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="StsLainspect" label=" " labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} valuePropName="checked">
                    <Checkbox onChange={(checked) => {
                      if (checked) {
                        this.formRef.current.setFieldsValue({
                          StsContractStartDate: false,
                        });
                      }
                      this.forceUpdate();
                    }}>最新</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}></Col>
              </Row>

              <Row>
                <Col span={6}>
                  <Form.Item name="StsContractNum" label=" " labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} valuePropName="checked">
                    <Checkbox onChange={() => this.forceUpdate()}>コース</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label=" " labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
                    <Form.Item name="ContractNum">
                      <Input disabled={!this.formRef.current?.getFieldValue('StsContractNum')} />
                    </Form.Item>
                    <Form.Item name="Course">
                      <Input.Search
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              width: 800,
                              visible: true,
                              component: (<WS0265001_BasicCourseInquiry
                                onFinishScreen={(output) => {
                                  this.formRef.current.setFieldsValue({
                                    Course: output.Lo_CourseCode,
                                  });

                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    }
                                  });
                                }}
                              />),
                            }
                          });
                        }}
                      />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
              </Row>
            </Card>

            <Card title="出力様式">
              <Col span={24}>
                <Form.Item name="TermsAndCondition" label=" " labelCol={{ span: 1 }} wrapperCol={{ span: 23 }} valuePropName="checked">
                  <Checkbox>契約の一覧を出力します</Checkbox>
                </Form.Item>
                <Form.Item name="ContractSet" label=" " labelCol={{ span: 1 }} wrapperCol={{ span: 23 }} valuePropName="checked">
                  <Checkbox>契約で使用しているセットの一覧を出力します</Checkbox>
                </Form.Item>
                <Form.Item name="ContractInspect" label=" " labelCol={{ span: 1 }} wrapperCol={{ span: 23 }} valuePropName="checked">
                  <Checkbox>契約で使用している検査の一覧を出力します</Checkbox>
                </Form.Item>
              </Col>
            </Card>

            <Button type="primary" htmlType="submit" style={{ float: "right", margin: "10px 0 0 0" }} loading={this.state.isLoading}>出力</Button>
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

export default WS0426001_MasterListOutputContractInfo;
