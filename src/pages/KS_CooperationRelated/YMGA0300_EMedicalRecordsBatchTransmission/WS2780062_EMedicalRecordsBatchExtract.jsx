import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Row, Col, Space, DatePicker, Modal, message } from "antd";
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import EMedicalRecordsBatchExtractAction from "redux/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsBatchExtract.action";
import moment from "moment";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2780062_EMedicalRecordsBatchExtract extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '[E-カルテ]一括抽出';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  componentDidMount() {
    this.getDate();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDate();
    }
  }

  getDate() {
    EMedicalRecordsBatchExtractAction.getScreenData()
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          DateF: moment(res ? res.DateF : new Date()),
          DateT: moment(res ? res.DateT : new Date())
        })
      })
  }

  extract() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateF: this.formRef.current?.getFieldValue('DateF')?.format('YYYY/MM/DD'),
      DateT: this.formRef.current?.getFieldValue('DateT')?.format('YYYY/MM/DD')
    }
    EMedicalRecordsBatchExtractAction.extract(params)
      .then((res) => {
        message.success("成功 !");
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

  release() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateF: this.formRef.current?.getFieldValue('DateF')?.format('YYYY/MM/DD'),
      DateT: this.formRef.current?.getFieldValue('DateT')?.format('YYYY/MM/DD')
    }
    EMedicalRecordsBatchExtractAction.release(params)
      .then((res) => {
        message.success("成功 !");
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

  onFinish(values) { }

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
      <div className="e-medical-records-batch-extract">
        <Card title="[E-カルテ]一括抽出">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row>
              <Space>
                <Form.Item name="DateF" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD' />
                </Form.Item>
                <div style={{ marginBottom: '1em' }}>~</div>
                <Form.Item name="DateT" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD' />
                </Form.Item>
              </Space>
            </Row>
            <Row gutter={24} style={{ margin: 0 }}>
              <div style={{ paddingRight: 5, width: 100 }}>
                <Form.Item name="Course" >
                  <Input.Search maxLength={3} onSearch={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '70%',
                        component: (
                          <WS0265001_BasicCourseInquiry
                            onFinishScreen={(output) => {
                              this.formRef.current?.setFieldsValue({
                                Course: output.Lo_CourseCode,
                                course_name_formal: output.recordData.course_name_formal
                              })
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                  }}
                    onChange={(e) => {
                      this.formRef.current?.setFieldsValue({
                        course_name_formal: ''
                      })
                    }}
                  />
                </Form.Item>
              </div>
              <div style={{ width: 'calc(100% - 100px' }}>
                <Form.Item name="course_name_formal" >
                  <Input readOnly style={{ background: 'transparent', border: 'none' }} />
                </Form.Item>
              </div>
            </Row>
            <div style={{ border: '1px solid #d9d9d9', padding: '1em' }}>
              <div style={{ marginTop: '0.3em', marginLeft: '1em', color: 'blue' }}>送信対象とします</div>
              <div span={24} style={{ textAlign: 'right' }}>
                <Button type='primary'
                  onClick={() => {
                    this.extract()
                  }}
                >抽出</Button>
              </div>
            </div>
            <div style={{ border: '1px solid #d9d9d9', padding: '1em', marginTop: '1em' }}>
              <div style={{ marginTop: '0.3em', marginLeft: '1em', color: 'red' }}>送信対象を解除します</div>
              <div style={{ textAlign: 'right' }}>
                <Button type='primary'
                  onClick={() => {
                    this.release()
                  }}
                >解除</Button>
              </div>
            </div>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2780062_EMedicalRecordsBatchExtract);
