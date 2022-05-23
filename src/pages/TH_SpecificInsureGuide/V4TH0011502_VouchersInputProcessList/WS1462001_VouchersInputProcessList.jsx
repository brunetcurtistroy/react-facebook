import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Button, Row, Col, DatePicker, Modal, message } from "antd";
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
import WS1290001_InsurerNumberInquiry from 'pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1290001_InsurerNumberInquiry.jsx';
import VouchersInputProcessListAction from 'redux/SpecificInsureGuide/VouchersInputProcessList/VouchersInputProcessList.actions'
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
class WS1462001_VouchersInputProcessList extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '利用券入力処理[一覧]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      }, 
    };
  }
  displayButton() {
    if (moment(this.formRef.current?.getFieldValue("DateFScreen"), "YYYY/MM/DD", true).isValid()
      && moment(this.formRef.current?.getFieldValue("DateTScreen"), "YYYY/MM/DD", true).isValid()) {
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
                  this.formRef.current?.setFieldsValue({
                    StsConfirm: output.Lo_Status
                  })
                  let data = {
                    DateFScreen: moment(this.formRef.current?.getFieldValue("DateFScreen")).format("YYYY/MM/DD"),
                    DateTScreen: moment(this.formRef.current?.getFieldValue("DateTScreen")).format("YYYY/MM/DD"),
                    InsuranceNum: this.formRef.current?.getFieldValue("InsuranceNum"),
                    Setting: this.formRef.current?.getFieldValue("Setting")
                  }
                  VouchersInputProcessListAction.displayButton(data).then(res => {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen(res)
                    }
                  }).catch(error => {
                    const res = error.response;
                    if (!res || res.data || res.data.message) {
                      message.error('エラーが発生しました');
                    }
                  });
                  this.forceUpdate()
                }
                this.closeModal()
              }}
            />),
        },
      })
    } else {
      message.error('日付を入力して下さい');
    }
  }
  checkDateFormat(namePath) {
    let value = this.formRef.current?.getFieldValue(namePath)
    if (!value?.format("YYYY/MM/DD")) {
      message.error("日付を入力して下さい"); 
    } 
  } 
  onFinish(values) {

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
      <div className="vouchers-input-process-list">
        <Card title="利用券入力処理[一覧]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ DateFScreen: moment(today), DateTScreen: moment(today), Setting: 0 }}
          >
            <div style={{ display: 'none' }} >
              <Form.Item name="TempFile"><Input /></Form.Item>
              <Form.Item name="DateF"><Input /></Form.Item>
              <Form.Item name="DateT"><Input /></Form.Item>
              <Form.Item name="InsuranceNum"><Input /></Form.Item>
              <Form.Item name="Target"><Input /></Form.Item>
              <Form.Item name="StsDate"><Input /></Form.Item>
              <Form.Item name="StsConfirm"><Input /></Form.Item>
            </div>
            <div style={{ border: '1px solid  #E3E4E1', padding: '1em' }}>
              <Row>
                <Col span={6}>
                  <Form.Item name="DateFScreen" label="初回予定日">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} className="w-100" onBlur={() => this.checkDateFormat("DateFScreen")} />
                  </Form.Item>
                </Col>
                <Col span={1} style={{ textAlign: 'center' }}>
                  <Form.Item>~</Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="DateTScreen">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} className="w-100" onBlur={() => this.checkDateFormat("DateTScreen")} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item name="InsuranceNum" label="保険者番号">
                    <Input.Search onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '80%',
                          component: (
                            <WS1290001_InsurerNumberInquiry
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  InsuranceNum: output.Lo_InsurerNum,
                                  insurer_kanji_name: output?.recordData?.[0].insurer_kanji_name
                                })
                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }} />
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label="&ensp;">
                    {this.formRef.current?.getFieldValue("insurer_kanji_name")}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item name="Setting" label="設　　　定">
                    <Select>
                      <Select.Option value={0}>未設定</Select.Option>
                      <Select.Option value={1}>設定済</Select.Option>
                      <Select.Option value={2}>全　て</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Button style={{ float: 'right', marginTop: '1em' }} type="primary" onClick={() => this.displayButton()} >実  行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1462001_VouchersInputProcessList);
