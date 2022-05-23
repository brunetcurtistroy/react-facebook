import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Checkbox, Radio, Button, Table, Row, Col, Space, DatePicker, Modal } from "antd";
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import WS1302001_AgencyInquirySub from 'pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1302001_AgencyInquirySub.jsx';
import WS1290001_InsurerNumberInquiry from 'pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1290001_InsurerNumberInquiry.jsx';
import WS2656088_DetailsExtract from 'pages/TH_SpecificInsureGuide/V4TH0020000_SpecificCoerciveFingerXmlOutput/WS2656088_DetailsExtract.jsx';

import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
class WS2656001_SpecificInsureXmlOutput extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '特定保指XML出力';

    this.state = {
      selectedRowKeys: [],
      isloading: false,
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
  ConditionAddBtn = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '30%',
        component: (
          <WS2656088_DetailsExtract
            Lio_ExamPersonGroupHealthDivisi={this.formRef.current?.getFieldValue("ExamPersonGroupHealthDivision")}
            Lio_Relationship={this.formRef.current?.getFieldValue("Relationship")}
            Lio_CreateDivision1New2ReCreate={this.formRef.current?.getFieldValue("CreateDivision1New2ReCreate")}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                ExamPersonGroupHealthDivision: output.Lio_ExamPersonGroupHealthDivisi,
                Relationship: output.Lio_Relationship,
                CreateDivision1New2ReCreate: output.Lio_CreateDivision1New2ReCreate
              })
              this.forceUpdate()
              this.closeModal()
            }}
          />),
      },
    })
  }
  SearchBtn = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '50%',
        component: (
          <WS1290001_InsurerNumberInquiry
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                GinsuranceNum: output.Lo_InsurerNum
              })
              this.forceUpdate()
              this.closeModal()
            }}
          />),
      },
    })
  }
  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onSelect: (record, selected, selectedRows, nativeEvent) => {

      },
      onSelectAll: (selected, selectedRows, changeRows) => {

      }
    }
    var today = new Date().getFullYear() + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + ("0" + new Date().getDate()).slice(-2)
    return (
      <div className="specific-insure-xml-output">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          autoComplete='off'
          initialValues={{ GimplementDateFromChars: moment(today), GimplementDateToChars: moment(today) }}
        >
          <Row>
            <Col span={8} >
              <Card style={{ width: '98%' }}>
                <div style={{ display: 'none' }}>
                  <Form.Item name="SearchButton" ><Input /></Form.Item>
                  <Form.Item name="XmlButton" ><Input /></Form.Item>
                  <Form.Item name="StsConfirm" ><Input /></Form.Item>
                  <Form.Item name="Sys010SpecifiedValue" ><Input /></Form.Item>
                  <Form.Item name="ListStatus" ><Input /></Form.Item>
                  <Form.Item name="XmlOutput" ><Input /></Form.Item>
                  <Form.Item name="Cmd" ><Input /></Form.Item>
                  <Form.Item name="RootFolderName" ><Input /></Form.Item>
                  <Form.Item name="MedicalExamInstitutionNum" ><Input /></Form.Item>
                  <Form.Item name="SubmittedYourInstitutionNum" ><Input /></Form.Item>
                  <Form.Item name="NumOfFiles" ><Input /></Form.Item>
                  <Form.Item name="Visits_UserTotal" ><Input /></Form.Item>
                  <Form.Item name="Price_CalculatedAmountTotalNum" ><Input /></Form.Item>
                  <Form.Item name="CounterPayAmountTotal" ><Input /></Form.Item>
                  <Form.Item name="InvoiceAmountTotal" ><Input /></Form.Item>
                  <Form.Item name="ErrorPeopleNum" ><Input /></Form.Item>
                  <Form.Item name="NumOfErrorsItem" ><Input /></Form.Item>
                  <Form.Item name="ImplementDateFrom" ><Input /></Form.Item>
                  <Form.Item name="StsImplementDateFrom" ><Input /></Form.Item>
                  <Form.Item name="ImplementDateTo" ><Input /></Form.Item>
                  <Form.Item name="StsDateConvert" ><Input /></Form.Item>
                  <Form.Item name="ExamPersonGroupHealthDivision" ><Input /></Form.Item>
                  <Form.Item name="Gfirst" ><Input /></Form.Item>
                  <Form.Item name="GcontinuedSupport" ><Input /></Form.Item>
                  <Form.Item name="GmidTermEvaluation" ><Input /></Form.Item>
                  <Form.Item name="GfinalEvaluation" ><Input /></Form.Item>
                  <Form.Item name="Ginterruption" ><Input /></Form.Item>
                  <Form.Item name="Grelationship" ><Input /></Form.Item>
                  <Form.Item name="FilingDate" ><Input /></Form.Item>
                  <Form.Item name="GsubmissionDateChars" ><Input /></Form.Item>
                  <Form.Item name="StsFilingDate" ><Input /></Form.Item>
                  <Form.Item name="CreationDate" ><Input /></Form.Item>
                  <Form.Item name="GcreationDateChars" ><Input /></Form.Item>
                  <Form.Item name="StsDate" ><Input /></Form.Item>
                  <Form.Item name="NumOfTransmissions" ><Input /></Form.Item>
                  <Form.Item name="CreateDivision1New2ReCreate" ><Input /></Form.Item>
                  <Form.Item name="GcreatingClassifyScreen" ><Input /></Form.Item>
                  <Form.Item name="CreatingClassifyList" ><Input /></Form.Item>
                  <Form.Item name="Select1All2Partial" ><Input /></Form.Item>
                  <Form.Item name="GselectScreen" ><Input /></Form.Item>
                  <Form.Item name="SelectAList" ><Input /></Form.Item>
                  <Form.Item name="ProcessDivision1XmlCheck2Create" ><Input /></Form.Item>
                  <Form.Item name="GprocessDivisionScreen" ><Input /></Form.Item>
                  <Form.Item name="ProcessDivisionList" ><Input /></Form.Item>
                  <Form.Item name="CheckErrorPeopleNum" ><Input /></Form.Item>
                  <Form.Item name="CheckNumOfErrorsItem" ><Input /></Form.Item>
                  <Form.Item name="ContinuationEndDate1Final2Conti" ><Input /></Form.Item>
                  <Form.Item name="GcontinuationEndDateScreen" ><Input /></Form.Item>
                  <Form.Item name="ContinuationEndDateList" ><Input /></Form.Item>
                  <Form.Item name="ContinuedSupportEndDateSelect" ><Input /></Form.Item>
                  <Form.Item name="PointCalculateAdjustment" ><Input /></Form.Item>
                  <Form.Item name="ExpirationDateRange" ><Input /></Form.Item>
                  <Form.Item name="ExpirationDateStart" ><Input /></Form.Item>
                  <Form.Item name="ExpirationDateEnd" ><Input /></Form.Item>
                  <Form.Item name="AgencyName" ><Input /></Form.Item>
                  <Form.Item name="GoutputForm" ><Input /></Form.Item>
                  <Form.Item name="StsM17" ><Input /></Form.Item>
                  <Form.Item name="StsM33" ><Input /></Form.Item>
                  <Form.Item name="Goutput" ><Input /></Form.Item>
                </div>
                <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '1em' }}>
                  <Space>
                    <Form.Item name="GimplementDateFromChars" label="&emsp;実施日">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                    </Form.Item>
                    <Form.Item>~</Form.Item>
                    <Form.Item name="GimplementDateToChars" >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                    </Form.Item>
                  </Space>
                  <Form.Item name="Type" label="&emsp;種　別">
                    <Radio.Group >
                      <Radio value={1}>代行機関</Radio>
                      <Radio value={6}>保 険 者</Radio>
                      <Radio value={9}>そ の 他</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Space>
                    <Form.Item name="Gagency" label="代行機関">
                      <Input.Search onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '50%',
                            component: (
                              <WS1302001_AgencyInquirySub
                                Lio_AgencyNum={this.formRef.current?.getFieldValue("Gagency")}
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    Gagency: output.Lio_AgencyNum
                                  })
                                  this.forceUpdate()
                                  this.closeModal()
                                }}
                              />),
                          },
                        })
                      }} />
                    </Form.Item>
                    <Form.Item>
                      <span>{this.formRef.current?.getFieldValue("AgencyName")}</span>
                    </Form.Item>
                  </Space><br />
                  <Space>
                    <Form.Item name="GinsuranceNum" label="&emsp;保険者">
                      <Input.Search onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '50%',
                            component: (
                              <WS1290001_InsurerNumberInquiry
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    GinsuranceNum: output.Lo_InsurerNum
                                  })
                                  this.forceUpdate()
                                  this.closeModal()
                                }}
                              />),
                          },
                        })
                      }} />
                    </Form.Item>
                    <Form.Item>
                      <span>{this.formRef.current?.getFieldValue("insurer_kanji_name")}</span>
                    </Form.Item>
                  </Space>
                  <Form.Item name="SettlementInfo" label="&emsp;決　済" valuePropName="checked">
                    <Checkbox></Checkbox>
                  </Form.Item>
                  <Form.Item label="&emsp;評　価" style={{ marginBottom: '0px' }}>
                    <Row>
                      <Col span={8}>
                        <Form.Item name="Gfirst" valuePropName="checked">
                          <Checkbox >初回面談</Checkbox>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="GfinalEvaluation" valuePropName="checked">
                          <Checkbox  >最終評価</Checkbox>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="Ginterruption" valuePropName="checked">
                          <Checkbox  >中　　断</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label="&emsp;&emsp;&emsp;&emsp;">
                    <Row>
                      <Col span={8}>
                        <Form.Item name="GcontinuedSupport" valuePropName="checked">
                          <Checkbox >継続支援</Checkbox>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="GmidTermEvaluation" valuePropName="checked">
                          <Checkbox  >中間評価</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                      <Space >
                        <Button icon={<PlusCircleOutlined style={{ fontSize: '20px', color: '#08c' }} onClick={() => this.ConditionAddBtn()} />} >条件追加</Button>
                        <Button icon={<SearchOutlined style={{ fontSize: '20px', color: '#08c' }} />} onClick={() => this.SearchBtn()} >検　　索</Button>
                      </Space>
                    </Col>
                  </Row>
                </div>
                <div style={{ textAlign: 'right', marginTop: '1em' }}>
                  <Button type="primary">&emsp;XML&emsp;</Button>
                </div>
              </Card>
            </Col>
            <Col span={16} >
              <Card className="mb-2" style={{ background: '#1C66B9' }}>
                <Row>
                  <Col span={8}>
                    <Form.Item name="KanaName" label={<label style={{ color: 'white' }}>カナ氏名</label>} style={{ marginBottom: '0px' }}>
                      <Input style={{ width: '95%' }} />
                    </Form.Item>
                  </Col>
                  <Col >
                    <Form.Item name="StsMore" style={{ marginBottom: '0px' }}>
                      <Checkbox><label style={{ color: 'white' }}>全表示</label></Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Table
                dataSource={[{ id: 1 }]}
                loading={this.state.isloading}
                size="small"
                pagination={false}
                scroll={{ y: 650 }}
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                rowKey={(record) => record.id}
              >
                <Table.Column title="区　分" dataIndex="ReCreateNewAnd" />
                <Table.Column title="実施日" dataIndex="W1_date_of" render={(value, record, index) => {
                  return <Form.Item name={['tableData', index, 'W1_date_of']} style={{ marginBottom: '0px' }} >
                    <Input style={{ border: '0px' }} />
                  </Form.Item>
                }} />
                <Table.Column title="評価区分" dataIndex="Expression_9" />
                <Table.Column title="個人番号" dataIndex="W1_id" />
                <Table.Column title="氏　名" dataIndex="kanji_name" render={(value, record, index) => {
                  return <Form.Item name={['tableData', index, 'kanji_name']} style={{ marginBottom: '0px' }}>
                    <Input style={{ border: '0px' }} />
                  </Form.Item>
                }} />
                <Table.Column title="保険者番号" dataIndex="W1_insurers" />
                <Table.Column title="代行機関" dataIndex="other_agency" />
                <Table.Column title="利用券" dataIndex="Expression_19" />
                <Table.Column title="決済" dataIndex="Expression_21" />
              </Table>
            </Col>
          </Row>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2656001_SpecificInsureXmlOutput);
