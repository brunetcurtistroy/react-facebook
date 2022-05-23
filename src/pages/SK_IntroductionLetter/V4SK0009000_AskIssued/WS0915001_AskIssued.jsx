import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Row, Col, DatePicker, Space, Modal } from "antd";
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0887001_IntroduceLetterVariousMasterInquiry from 'pages/SK_IntroductionLetter/V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry.jsx';
import WS0433001_PrinterConfirm from 'pages/SK_IntroductionLetter/V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import moment from 'moment'; const dateFormat = 'YYYY/MM/DD';
class WS0915001_AskIssued extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'おたずね発行';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
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
  showOfficeInfoRetrievalQuery(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0247001_OfficeInfoRetrievalQuery
          Lio_OfficeCode = {this.formRef.current?.getFieldValue("OfficeCode")}
          Lio_BranchStoreCode = {this.formRef.current?.getFieldValue("BranchStoreCode")}
            onFinishScreen={(output) => { 
              this.formRef.current?.setFieldsValue({
                OfficeCode: output.Lio_OfficeCode,
                BranchStoreCode: output.Lio_BranchStoreCode
              })
              this.forceUpdate()
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  render() {
    var today = new Date().getFullYear() + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + ("0" + new Date().getDate()).slice(-2)
    return (
      <div className="ask-issued">
        <Card title="おたずね発行">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ DateFChar: moment(today), DateTChar: moment(today) }}
          >
            <div style={{display:'none'}}>
              <Form.Item name="StsConfirm"><Input/></Form.Item>
              <Form.Item name="DateT"><Input/></Form.Item>
              <Form.Item name="DateF"><Input/></Form.Item>
              <Form.Item name="StsOffice"><Input/></Form.Item>
              <Form.Item name="ProcessDivisionList"><Input/></Form.Item>
              <Form.Item name="LetterOfIntroductionIssuedBySta"><Input/></Form.Item>
              <Form.Item name="AskIssuingState"><Input/></Form.Item>
              <Form.Item name="AllSelect"><Input/></Form.Item>
              <Form.Item name="PreviewMode"><Input/></Form.Item>
              <Form.Item name="PrinterNum"><Input/></Form.Item>
              <Form.Item name="StsDateConvert"><Input/></Form.Item>
              <Form.Item name="TextFile"><Input/></Form.Item>   
            </div>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '1em' }}>
              <Space>
                <Form.Item name="DateFChar" label="&emsp;受診日">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                </Form.Item>
                <Form.Item>~</Form.Item>
                <Form.Item name="DateTChar">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                </Form.Item>
              </Space>
              <Row>
                <Col span={24}>
                  <Space >
                    <Form.Item name="ReceiptNumF" label=" &ensp;受付No">
                      <Input style={{ width: '100px' }} />
                    </Form.Item>
                    <Form.Item style={{ width: '57px', textAlign: 'right' }}>~</Form.Item>
                    <Form.Item name="ReceiptNumT">
                      <Input style={{ width: '100px' }} />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Space>
                <Form.Item name="OfficeCode" label="&emsp;事業所">
                  <Input.Search readOnly style={{ width: '150px' }}  onSearch={()=>this.showOfficeInfoRetrievalQuery()} />
                </Form.Item>
                <Form.Item name="BranchStoreCode" >
                  <Input.Search type="number" readOnly style={{ width: '100px' }}  onSearch={()=>{
                    if(this.formRef.current?.getFieldValue("OfficeCode")) {
                      this.showOfficeInfoRetrievalQuery()
                    }
                  }} />
                </Form.Item>
                <Form.Item>
                  <span>{this.formRef.current?.getFieldValue("office_kanji_name")}</span>
                </Form.Item>
              </Space>
              <Row>
                <Col span={6}>
                  <Form.Item name="FacilityType" label="&emsp;&emsp;施設" >
                    <Select  >
                      <Select.Option value="">全て</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Space>
                <Form.Item name="Department" label="&emsp;診療科" >
                  <Input.Search style={{ width: '130px' }} onSearch={()=>{
                     this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '80%',
                        component: (
                          <WS0887001_IntroduceLetterVariousMasterInquiry
                          Li_ManageCode = {7} 
                            onFinishScreen={(output) => { 
                              this.formRef.current?.setFieldsValue({
                                Department: output.Lo_VariousCodes
                              })
                              this.forceUpdate()
                              this.closeModal()
                            }}
                          />
                        ),
                      }
                    })
                  }} />
                </Form.Item>
                <Form.Item   >
                  <span>{this.formRef.current?.getFieldValue("department_name")}</span>
                </Form.Item>
              </Space>
              <Form.Item name="AskIssuingState" label="発行状態" >
                <Select style={{ width: '150px' }}>
                  <Select.Option value={0}>全て</Select.Option>
                  <Select.Option value={1}>未発行</Select.Option>
                  <Select.Option value={2}>発行済</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Button type="primary" style={{ marginTop: '1em', float: 'right' }} onClick={()=>{
               this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: 400 ,
                  component: (
                    <WS0433001_PrinterConfirm
                    Li_PreviewSpecifiedValue  = {this.formRef.current?.getFieldValue("PreviewMode")}
                    Li_PrinterNoSpecifiedValue = {this.formRef.current?.getFieldValue("PrinterNum")}
                      onFinishScreen={(output) => { 
                        this.formRef.current?.setFieldsValue({
                          PreviewMode: output.Lo_Preview,
                          PrinterNum: output.Lo_PrinterNo,
                          StsConfirm: output.Lo_StsOutput
                        })
                        this.forceUpdate()
                        this.closeModal()
                      }}
                    />
                  ),
                }
              })
            }}>印刷</Button>
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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0915001_AskIssued);
