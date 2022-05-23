/* eslint-disable eqeqeq */
import React from "react";
import PropTypes from 'prop-types';

import {
  Card, Form, Input, Button, Modal, Spin, message, Space, Col, Row,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";

import WS0275001_ContractQuerySelect from 'pages/BS_BasicInfo/V4KB0201000_ContractInfoMaintain/WS0275001_ContractQuerySelect.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import axios from 'configs/axios';
import WS0605127_ContractLineItemDisplay from "../V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay";
const grid = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

/**
* @extends {React.Component<{Li_ContractType:any.isRequired, Li_ContractOrgCode:any.isRequired, Li_ContractStartDate:any.isRequired, onCreateFinish:Function}>}
*/
class WS0307076_CreateContract extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any.isRequired,
    Li_ContractOrgCode: PropTypes.any.isRequired,
    Li_ContractStartDate: PropTypes.any.isRequired,

    onCreateFinish: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '契約作成';

    console.log(props);

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      coursesData: {},
      contractData: {},
      StsTermsAndConditionInfoOrigina: false,
      isLoadingScreenData: false,
    };

    this.loadScreenData = this.loadScreenData.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.formRef.current?.resetFields()
    this.loadScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.formRef.current?.resetFields()
      this.loadScreenData();
    }
  }

  loadScreenData() {
    this.setState({ isLoadingScreenData: true });

    const { Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate } = this.props;

    axios.get('/api/contract-info-maintain/create-contract/getScreenData', {
      params: {
        Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate
      }
    })
      .then(res => {
        this.formRef.current.setFieldsValue(res.data);
        this.loadCourses()
      })
      .catch(error => {
        this.setState({ isLoadingScreenData: false })
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
  }

  loadCourses() {
    this.setState({ isLoadingScreenData: true });

    axios.get('/api/contract-info-batch-process/basic-course-inquiry', {
      params: {
        ShortNameSearch: '',
      },
    })
      .then(res => {
        this.setState({
          coursesData: res?.data,
        })
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingScreenData: false });
      });
  }

  getCourseName(courseCode) {
    let data = this.state.coursesData.filter(x => x.course_code === courseCode)

    let ContractAbbreviation = this.formRef?.current?.getFieldValue('ContractAbbreviation')
    let ContractOfficially = this.formRef?.current?.getFieldValue('ContractOfficially')

    if (data.length > 0) {
      this.formRef.current.setFieldsValue({
        ContractAbbreviation: ContractAbbreviation ? ContractAbbreviation : data[0].course_name_short_name,
        ContractOfficially: ContractOfficially ? ContractOfficially : data[0].course_name_formal,
        course_name: data[0].course_name_formal,
      });

      this.setState({
        course_name: data[0].course_name_formal,
      })
    } else {
      this.formRef.current.setFieldsValue({
        course_name: '',
      });

      this.setState({
        course_name: '',
      })
    }
  }

  onFinish(values) {
    const { Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate } = this.props;

    if (values.ContractNum == 0) {
      Modal.error({
        width: 350,
        title: '番号は0を設定しないでください'
      })
    } else {
      this.setState({ isLoadingScreenData: true });
      axios.post('/api/contract-info-maintain/create-contract/CreateBtn', {
        ...values,
        Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate
      })
        .then(res => {
          const formIns = this.formRef.current;
          formIns.setFieldsValue({
            ...formIns.getFieldsValue(),
            ...res.data,
          });

          if (this.props.onCreateFinish) {
            this.props.onCreateFinish();
          }
        })
        .catch(error => {
          const res = error.response;
          if (!res || !res.data || !res.data.message) {
            message.error('エラーが発生しました');
            return;
          }

          message.error(res.data.message);
        })
        .finally(() => {
          this.setState({ isLoadingScreenData: false });
        });
    }
  }

  render() {
    return (
      <div className="create-contract">
        <Card title="契約作成">
          <Spin spinning={this.state.isLoadingScreenData}>
            <Form {...grid} ref={this.formRef} onFinish={this.onFinish}>
              <Row>
                <Col span={9}>
                  <Form.Item name="ContractNum" label="番 号" rules={[{ required: true }]} labelCol={{ span: 8 }}>
                    <Input type="number" maxLength={4} min={0} />
                  </Form.Item>
                </Col>
                <Col span={14} style={{ marginLeft: 3 }}>
                  <Button type="primary" style={{ marginRight: 3 }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: (<WS0275001_ContractQuerySelect
                            Li_SpecifyContractType={this.props.Li_ContractType}
                            Li_SpecifyContractOrgCode={this.props.Li_ContractOrgCode}

                            onFinishScreen={(output) => {
                              this.formRef.current?.setFieldsValue({
                                // ContractNum: output.recordData.contract_number,
                                contract_short_name: output.recordData.contract_short_name,
                                CourseCode: output.recordData.medical_exam_course,
                                course_name: '',
                                ContractAbbreviation: output.recordData.contract_short_name,
                                ContractOfficially: output.recordData.contract_name,
                              })

                              let data = {
                                Li_ContractType: output.recordData.contract_type,
                                Li_ContractOrgCode: output.recordData.contract_office_code,
                                Li_ContractStartDate: output.recordData.contract_start_date_on,
                                Li_ContractNum: output.recordData.contract_number,
                              }

                              this.setState({
                                contract_short_name: output.recordData.contract_short_name,
                                course_name: '',
                                contractData: data,
                                StsTermsAndConditionInfoOrigina: true
                              })
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                }
                              });
                            }}
                          />)
                        }
                      });
                    }}
                  >複写
                  </Button>
                  <Button size='small' icon={<MoreOutlined />}
                    hidden={!this.state.StsTermsAndConditionInfoOrigina}
                    style={{ verticalAlign: 'top' }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: (
                            <WS0605127_ContractLineItemDisplay
                              Li_ContractType={this.state.contractData.Li_ContractType}
                              Li_ContractOrgCode={this.state.contractData.Li_ContractOrgCode}
                              Li_ContractStartDate={this.state.contractData.Li_ContractStartDate}
                              Li_ContractNum={this.state.contractData.Li_ContractNum}
                              onFinishScreen={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  }
                                });
                              }}
                            />
                          )
                        }
                      });
                    }}
                  ></Button>
                  <span style={{ marginLeft: 4 }}>{this.state.contract_short_name}</span>
                </Col>
              </Row>
              <Row>
                <Col span={9} style={{ marginRight: 3 }}>
                  <Form.Item label="コース" name="CourseCode" rules={[{ required: true }]} labelCol={{ span: 8 }}>
                    <Input.Search onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component: (<WS0265001_BasicCourseInquiry
                            onFinishScreen={(output) => {
                              let ContractAbbreviation = this.formRef?.current?.getFieldValue('ContractAbbreviation')
                              let ContractOfficially = this.formRef?.current?.getFieldValue('ContractOfficially')
                              this.formRef.current.setFieldsValue({
                                CourseCode: output.Lo_CourseCode,
                                ContractAbbreviation: ContractAbbreviation ? ContractAbbreviation : output.recordData.course_name_short_name,
                                ContractOfficially: ContractOfficially ? ContractOfficially : output.recordData?.course_name_formal,
                                course_name: output.recordData.course_name_formal,
                              });

                              this.setState({
                                course_name: output.recordData.course_name_formal,
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                }
                              });
                            }}
                          />)
                        }
                      });
                    }}
                      onChange={(e) => {
                        this.getCourseName(e.target.value)
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <span>{this.state.course_name}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="ContractAbbreviation" label="略 称">
                <Input />
              </Form.Item>
              <Form.Item name="ContractOfficially" label="正 式">
                <Input />
              </Form.Item>
              <Space style={{ float: 'right' }}>
                <Button type="primary" htmlType="submit">作成</Button>
              </Space>
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

export default WS0307076_CreateContract;
