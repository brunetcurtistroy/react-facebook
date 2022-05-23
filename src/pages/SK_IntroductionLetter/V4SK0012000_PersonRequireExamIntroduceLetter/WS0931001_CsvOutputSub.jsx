import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Checkbox, Button, Row, Col, Space, Modal } from "antd";
import WS0931002_FormInquiry from "./WS0931002_FormInquiry";
import WS0887001_IntroduceLetterVariousMasterInquiry from "../V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry";
import PropTypes from 'prop-types';
class WS0931001_CsvOutputSub extends React.Component {

  static propTypes = {
    Li_DataSource: PropTypes.string,
  }

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'CSV出力SUB';

    this.state = {
      loading: false,
      childModal: {
        width: 0,
        visible: false,
        component: null
      }
    };
  }
  openModalIntroduceLetterVariousMasterIn = (values) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        width: '80%',
        visible: true,
        component: <WS0887001_IntroduceLetterVariousMasterInquiry
          onFinishScreen={(output) => {
            //
            console.log(output);
            this.formRef.current.setFieldsValue({
              Department: output.Lo_VariousCodes,
              department_name: output.recordData.findings_content,
            })
            this.closeModal();
          }}
        />
      }
    })
  }
  openModalFormInquiry = (values) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        width: '80%',
        visible: true,
        component:
          <WS0931002_FormInquiry
            onFinishScreen={(output) => {
              this.setDataOutput(output);
              this.formRef.current.setFieldsValue({
                Form: output.Code,
                noname: output.DocumentName
              })
              this.closeModal();
            }}
          />
      }
    })
  }
  setDataOutput = (output) => {
    console.log(output)

  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false
      }
    })
  }
  onFinish(values) {
    console.log(values)
  }

  render() {
    return (
      <div className="csv-output-sub">

        <Card title="CSV出力SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          // layout="inline"
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <Form.Item
                      name="Department"
                      label="診療科"
                      labelCol={{ span: 6 }}
                    >
                      <Input.Search type="text" onSearch={this.openModalIntroduceLetterVariousMasterIn} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      style={{ padding: '0 0 0 5px' }}
                      name="department_name"
                    >
                      <span>{this.formRef.current?.getFieldValue('department_name')}</span>
                    </Form.Item>
                  </Col>

                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <Form.Item
                      name="StsReferral"
                      label="紹介状"
                      valuePropName="checked"
                      labelCol={{ span: 6 }}
                    >
                      <Checkbox>紹介状対象外の方も含む</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <Form.Item
                      name="StsSpecify"
                      label="明　細"
                      valuePropName="checked"
                      labelCol={{ span: 6 }}
                    >
                      <Checkbox>検査内容を出力する</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <Form.Item
                      name="Form"
                      label="CSV連動"
                      labelCol={{ span: 6 }}
                    >
                      <Input.Search type="text" onSearch={this.openModalFormInquiry} />
                    </Form.Item>
                  </Col>

                  <Col>
                    {/**  Form Name ko có */}
                    <Form.Item style={{ padding: '0 0 0 5px' }} name="noname" >
                      <span>{this.formRef.current?.getFieldValue('noname')}</span>
                    </Form.Item>
                  </Col>

                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="Output"
                      label="出力先"
                      labelCol={{ span: 3 }}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Space style={{ float: 'right' }}>
                      <Form.Item
                      >
                        <Button type="primary" disabled>開く</Button>
                      </Form.Item>
                      <Form.Item
                      >
                        <Button type="primary" htmlType="submit">出力</Button>
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          destroyOnClose={true}
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0931001_CsvOutputSub);
