import React from "react";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import {
  Card, Form, Input, Button, Row, Space, Tabs, Col, InputNumber,
  Modal, message
} from "antd";
import {
  ArrowRightOutlined
} from "@ant-design/icons";

import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import axios from "axios";

/**
* @extends {React.Component<{Li_ContractType:any, Li_ContractOrgCode:any, Li_ContractStartDate:any, Li_ContractNum:any, Li_Course:any, Li_ContractAbbreviation:any, Li_ContractName:any, onChange:Function}>}
*/
class WS0307082_CodeChanges extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_Course: PropTypes.any,
    Li_ContractAbbreviation: PropTypes.any,
    Li_ContractName: PropTypes.any,
    Li_ContractAbbreviation: PropTypes.string,
    Li_ContractName: PropTypes.string,

    onChange: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'コード変更';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      tabNum: "0",
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.Li_ContractType !== this.props.Li_ContractType)
      || (prevProps.Li_ContractOrgCode !== this.props.Li_ContractOrgCode)
      || (prevProps.Li_ContractStartDate !== this.props.Li_ContractStartDate)
      || (prevProps.Li_ContractNum !== this.props.Li_ContractNum)
      || (prevProps.Li_Course !== this.props.Li_Course)
    )
    {
      this.formRef.current.resetFields();
    }
  }

  onFinish(values) {
    if (this.state.tabNum === "0") {
      // Verify
      if (this.props.Li_ContractNum === values.contract_number) {
        return message.error('変更先のコードが同じです');
      }
      if (values.contract_number === 0) {
        return message.error('番号に0は指定できません');
      }

      Modal.confirm({
        content: '契約の番号を変更しますか？',
        onOk: () => {
          const { Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate } = this.props;
          return axios.post('/api/contract-info-maintain/code-changes/RunBtn_Tab0', {
            ...values,
            Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate,
          })
            .then(res => {
              this.props.onChanged();
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

            });
        }
      });
    } else if (this.state.tabNum === "1") {
      if (this.props.Li_Course === values.medical_exam_course) {
        return message.error('変更先のコードが同じです');
      }

      Modal.confirm({
        content: 'コースコードを変更しますか？',
        onOk: () => {
          const { Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate } = this.props;

          return axios.post('/api/contract-info-maintain/code-changes/RunBtn_Tab1', {
            ...values,
            Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate,
          })
            .then(res => {
              this.props.onChanged();
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

            });
        }
      });
    }
  }

  render() {
    return (
      <div className="code-changes">
        <Card title="コード変更">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{
            Li_Course: this.props.Li_Course,
            medical_exam_course: this.props.Li_Course,
            Li_ContractNum: this.props.Li_ContractNum,
            contract_number: this.props.Li_ContractNum,
          }}>
            <Form.Item>
              <span>{this.props.Li_ContractAbbreviation}</span>
            </Form.Item>
            <Form.Item>
              <span>{this.props.Li_ContractName}</span>
            </Form.Item>
            <Row>
              <Tabs type="card" defaultActiveKey={this.state.tabNum} onChange={(activeKey) => this.setState({tabNum: activeKey})}>
                <Tabs.TabPane tab="契約番号" key="0">
                  <Row gutter={8} className="mb-2">
                    <Col span={5}>
                      <Form.Item name="Li_ContractNum">
                        <Input readOnly={true} />
                      </Form.Item>
                    </Col>
                    <Col span={2} style={{textAlign: "center", margin: "0 15px 0 15px"}}>
                      <Space style={{lineHeight: "33px"}}><ArrowRightOutlined /></Space>
                    </Col>
                    <Col span={5}>
                      <Form.Item name="contract_number">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="コースコード" key="1">
                  <Row gutter={8} className="mb-2">
                    <Col span={5}>
                      <Form.Item name="Li_Course">
                        <Input readOnly={true} />
                      </Form.Item>
                    </Col>
                    <Col span={2} style={{textAlign: "center", margin: "0 15px 0 15px"}}>
                      <Space style={{lineHeight: "33px"}}><ArrowRightOutlined /></Space>
                    </Col>
                    <Col span={5}>
                      <Form.Item name="medical_exam_course" required={true}>
                        <Input.Search onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component: (<WS0265001_BasicCourseInquiry
                                onSelect={({Lo_CourseCode}) => {
                                  this.formRef.current.setFieldsValue({
                                    medical_exam_course: Lo_CourseCode
                                  });

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
                        }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Row>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">実　行</Button>
            </Form.Item>
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

export default WS0307082_CodeChanges;
