import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Button, Space, DatePicker, Row, Col, Modal, InputNumber, message, Spin } from "antd";
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import InitInterviewTargetDetermineProcessAction from 'redux/SpecificMedicalExamination/InitInterviewTargetDetermineProcess/InitInterviewTargetDetermineProcess.actions'
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
import WS2847005_ListProcess from 'pages/TK_SpecificMedicalExamination/V4TK3001000_InitInterviewTargetDetermineProcess/WS2847005_ListProcess.jsx';

import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
class WS2847001_InitInterviewTargetDetermineProcess extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '初回面談対象判定処理';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isloading: false
    };
    this.onFinish = this.onFinish.bind(this)
  }
  checkDataNull(value){
    if(value)
    {
      return value
    }
    return null
  }
  onFinish(values) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '30%',
        component: (
          <WS0061009_CheckYesNoYes
            Li_DisplayContent={"確認して下さい!"}
            Li_DisplayMethod={1}
            onFinishScreen={(output) => {
              if (output.Lio_StsReturn) { 
                let objGet={};
                objGet["DateFChar"] = moment(this.formRef.current?.getFieldValue("DateFChar")).format("YYYY/MM/DD") === "Invalid date" ? null : moment(this.formRef.current?.getFieldValue("DateFChar")).format("YYYY/MM/DD")
                objGet["DateTChar"] = moment(this.formRef.current?.getFieldValue("DateTChar")).format("YYYY/MM/DD") === "Invalid date" ? null : moment(this.formRef.current?.getFieldValue("DateTChar")).format("YYYY/MM/DD")
                objGet["ProcessDivisionScreen"] = this.checkDataNull(values["ProcessDivisionScreen"])
                objGet["CourseF"] = this.checkDataNull(values["CourseF"])
                objGet["CourseT"] = this.checkDataNull(values["CourseT"])
                objGet["AgeF"] = this.checkDataNull(values["AgeF"])
                objGet["AgeT"] = this.checkDataNull(values["AgeT"])
                objGet["limit"] = 100
                objGet["page"] = 1 
                this.setState({isloading: true})
                InitInterviewTargetDetermineProcessAction.executeButton(objGet).then(res => {
                  console.log(res)
                  if(res?.data?.length >0 ){
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 1200,
                        component: (
                          <WS2847005_ListProcess
                            conditionPage = {objGet}
                            dataInit = {res}
                            onFinishScreen={(output) => {
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    });
                  }
                }).catch(error => {
                  const res = error.response;
                  if (!res || res.data || res.data.message) {
                    message.error('エラーが発生しました');
                  }
                }).finally(()=>this.setState({isloading: false}))
              }
              this.closeModal()
            }}
          />),
      },
    })

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
    var today = new Date().getFullYear() + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + ("0" + new Date().getDate()).slice(-2)
    return (
      <div className="init-interview-target-determine-process">
        <Card title="初回面談対象判定処理"> 
        <Spin spinning={this.state.isloading}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ ProcessDivisionScreen: 1, DateFChar: moment(today), DateTChar: moment(today) }}
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="ProcessDivision"><Input /></Form.Item>
              <Form.Item name="ProcessDivisionScreen"><Input /></Form.Item>
              <Form.Item name="ProcessDivisionList"><Input /></Form.Item>
              <Form.Item name="DateF"><Input /></Form.Item>
              <Form.Item name="DateReturn"><Input /></Form.Item>
              <Form.Item name="StsDate"><Input /></Form.Item>
              <Form.Item name="DateT"><Input /></Form.Item>
              <Form.Item name="InitialInterviewSubjectInspect"><Input /></Form.Item>
              <Form.Item name="ExecButton"><Input /></Form.Item>
              <Form.Item name="StsYearGetF"><Input /></Form.Item>
              <Form.Item name="StsYearGetT"><Input /></Form.Item>
              <Form.Item name="H1_Sts"><Input /></Form.Item>
            </div>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '0.5em' }}>
              <Row>
                <Col span={7}>
                  <Form.Item name="ProcessDivisionScreen" label="処　理"  >
                    <Select>
                      <Select.Option value={1}>個  別</Select.Option>
                      <Select.Option value={2}>一  括</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Space>
                <Form.Item name="DateFChar" label="日　付" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                </Form.Item>
                <Form.Item>~</Form.Item>
                <Form.Item name="DateTChar">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                </Form.Item>
              </Space>
              <Row>
                <Col span={12}>
                  <Space>
                    <Form.Item name="CourseF" label="コース" >
                      <Input.Search readOnly onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '80%',
                            component: (
                              <WS0265001_BasicCourseInquiry
                                _Dks040StartUpFlag={2}
                                _Dks040CourseCode={this.formRef.current?.getFieldValue("CourseF")}
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    CourseF: output.Lo_CourseCode
                                  })
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }} />
                    </Form.Item>
                    <Form.Item>~</Form.Item>
                    <Form.Item name="CourseT">
                      <Input.Search readOnly style={{ width: '85%' }} onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '80%',
                            component: (
                              <WS0265001_BasicCourseInquiry
                                _Dks040StartUpFlag={2}
                                _Dks040CourseCode={this.formRef.current?.getFieldValue("CourseT")}
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    CourseT: output.Lo_CourseCode
                                  })
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }} />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Space>
                    <Form.Item name="AgeF" label="年　齢" >
                      <InputNumber min={0} maxLength={3} />
                    </Form.Item>
                    <Form.Item>~</Form.Item>
                    <Form.Item name="AgeT">
                      <InputNumber style={{ width: '82%' }} min={0} maxLength={3} />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </div>
            <Button type="primary" style={{ float: 'right', marginTop: '1em' }} htmlType="submit" >実　行</Button>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2847001_InitInterviewTargetDetermineProcess);
