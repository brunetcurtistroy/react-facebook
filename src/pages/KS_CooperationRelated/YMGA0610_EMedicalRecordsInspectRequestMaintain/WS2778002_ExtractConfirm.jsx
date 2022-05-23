import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Row, Modal, DatePicker, Space, message, } from "antd";

import { WarningOutlined } from "@ant-design/icons";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import moment from "moment-timezone";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import ExtractConfirmAction from "redux/CooperationRelated/EMedicalRecordsInspectRequestMaintain/ExtractConfirm.action";

class WS2778002_ExtractConfirm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '抽出確認';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      disabled: true
    };

    this.onFinish = this.onFinish.bind(this)
  }

  requestForm() {
    ExtractConfirmAction.request_F11()
      .then((res) => {
        console.log(res)
        if (res?.data?.message === '印字データがありません') {
          Modal.warning({
            width: 250,
            content: '印字データがありません!',
            okText: "はい",
            icon: <WarningOutlined />
          })
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
  }

  onFinish(values) {
    let params = {
      Course: values.Course,
      DateF: values.DateFChar?.format('YYYY/MM/DD'),
      DateT: values.DateTChar?.format('YYYY/MM/DD')
    }
    ExtractConfirmAction.extract_F12(params)
      .then((res) => {
        Modal.warning({
          width: 250,
          content: "送信終了しました！",
          okText: "はい",
          icon: <WarningOutlined />
        })
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

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  checkValidForm() {
    if (this.formRef.current?.getFieldValue('DateFChar') && this.formRef.current?.getFieldValue('DateTChar') && this.formRef.current?.getFieldValue('Course')) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }

  }

  render() {
    return (
      <div className="extract-confirm">
        <Card title="抽出確認">
          <Form ref={this.formRef} onFinish={this.onFinish}
            initialValues={{
              DateFChar: moment(new Date())
            }}
          >
            <Row gutter={24} style={{ margin: 0 }}>
              <Form.Item name="DateFChar" >
                <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD"
                  onChange={() => this.checkValidForm()} />
              </Form.Item>
              <span style={{ margin: '0 5px' }}>~</span>
              <Form.Item name="DateTChar" >
                <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD"
                  onChange={() => this.checkValidForm()}
                />
              </Form.Item>
            </Row>
            <Row gutter={24} style={{ margin: '10px 0' }}>
              <Form.Item name="Course" style={{ width: 90 }}>
                <Input.Search maxLength={3}
                  onSearch={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: "90%",
                        component: (
                          <WS0265001_BasicCourseInquiry
                            onFinishScreen={(output) => {
                              this.formRef.current?.setFieldsValue({
                                Course: output.recordData.course_code,
                                course_name_formal: output.recordData.course_name_formal
                              })
                              this.checkValidForm()
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    });
                  }}

                  onChange={(e) => {
                    this.formRef.current?.setFieldsValue({
                      course_name_formal: ''
                    })
                    this.checkValidForm()
                  }}
                />
              </Form.Item>
              <Form.Item name="course_name_formal" style={{ width: 'calc(100% - 100px)', marginLeft: 5 }}>
                <Input readOnly style={{ border: 'none', background: 'transparent' }} />
              </Form.Item>
            </Row>
            <Space style={{ float: 'right', marginTop: 15 }}>
              <Button type="primary"
                disabled={this.state.disabled}
                onClick={() => {
                  this.requestForm()
                }}
              >依頼票</Button>
              <Button type="primary" htmlType='submit'
                disabled={this.state.disabled}
              >再送信</Button>
            </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2778002_ExtractConfirm);
