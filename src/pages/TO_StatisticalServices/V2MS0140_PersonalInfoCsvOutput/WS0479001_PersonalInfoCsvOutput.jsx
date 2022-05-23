import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Button, Col, Row, Space, DatePicker, Modal } from "antd";
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0246001_InsurerInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery.jsx';
import WS0432001_CsvConfirm from 'pages/TO_StatisticalServices/V2MS0140_PersonalInfoCsvOutput/WS0432001_CsvConfirm.jsx';

import moment from 'moment';
const dateFormat = 'YYYY/MM/DD'
class WS0479001_PersonalInfoCsvOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '個人情報CSV出力';

    this.state = {
      checkName: 1,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  onFinish(values) {

  }
  checkLable(value) {
    let val = ""
    // SpecifiedCategory,'1','個　人','2','事業所','保険者')
    switch (value) {
      case 1: val = '個　人'
        break
      case 2: val = '事業所'
        break
      default: val = '保険者'
    }
    return val;
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  showModalNum() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: this.checkComponent()
        ,
      },
    });
  }
  checkComponent() {
    let specified = this.formRef.current?.getFieldValue("SpecifiedCategory")
    if (specified === 1) {
      return (<WS0248001_PersonalInfoSearchQuery
        onFinishScreen={(output) => {
          this.formRef.current?.setFieldsValue({
            NumRangeT: output.Lo_PersonalNumId
          })
          this.forceUpdate()
          this.closeModal()
        }}
      />)
    } else if (specified === 2) {
      return (<WS0247001_OfficeInfoRetrievalQuery
        Lio_OfficeCode={this.formRef.current?.getFieldValue("NumRangeF")}
        onFinishScreen={(output) => {
          this.formRef.current?.setFieldsValue({
            NumRangeF: output.Lio_OfficeCode
          })
          this.forceUpdate()
          this.closeModal()
        }}
      />)
    } else if (specified === 3) {
      return (<WS0246001_InsurerInfoSearchQuery
        onFinishScreen={(output) => {
          this.formRef.current?.setFieldsValue({
            InsurerNum: output.Lo_InsurerCode
          })
          this.forceUpdate()
          this.closeModal()
        }}
      />)
    }
  }
  handlingCsvFile() {
    this.formRef.current?.setFieldsValue({
      ConfirmSpecifiedValue: "Y",
    })
    this.forceUpdate()
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '50%',
        component: (
          <WS0432001_CsvConfirm
            Lio_Output={this.formRef.current?.getFieldValue("CsvFile")}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                CsvFile: output.Lio_Output,
                ConfirmStatus: output.Lo_StsOutput
              })
              if (output.Lo_StsOutput) {
                this.formRef.current?.setFieldsValue({
                  Num: 0,
                })
              }//continute
              this.forceUpdate()
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  render() {
    var today = new Date().getFullYear() + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + ("0" + new Date().getDate()).slice(-2)
    return (
      <div className="personal-info-csv-output">
        <Card title="個人情報CSV出力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ SpecifiedCategory: 1, AgeReferenceDateChar: moment(today) }}
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="OptionV2Ms0140"><Input /></Form.Item>
              <Form.Item name="ConfirmStatus"><Input /></Form.Item>
              <Form.Item name="ConfirmSpecifiedValue"><Input /></Form.Item>
              <Form.Item name="InsurerNum"><Input /></Form.Item>
              <Form.Item name="Num"><Input /></Form.Item>
              <Form.Item name="AgeReferenceDate"><Input /></Form.Item>
              <Form.Item name="StsDateConvert"><Input /></Form.Item>
              <Form.Item name="RangeSpecifiedTitleName"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut01"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut02"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut03"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut04"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut05"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut06"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut07"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut08"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut09"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut10"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut11"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut12"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut13"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut14"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut15"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut16"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut17"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut18"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut19"><Input /></Form.Item>
              <Form.Item name="ExtensionLookOut20"><Input /></Form.Item>
              <Form.Item name="ExtensionCode01"><Input /></Form.Item>
              <Form.Item name="ExtensionCode02"><Input /></Form.Item>
              <Form.Item name="ExtensionCode03"><Input /></Form.Item>
              <Form.Item name="ExtensionCode04"><Input /></Form.Item>
              <Form.Item name="ExtensionCode05"><Input /></Form.Item>
              <Form.Item name="ExtensionCode06"><Input /></Form.Item>
              <Form.Item name="ExtensionCode07"><Input /></Form.Item>
              <Form.Item name="ExtensionCode08"><Input /></Form.Item>
              <Form.Item name="ExtensionCode09"><Input /></Form.Item>
              <Form.Item name="ExtensionCode10"><Input /></Form.Item>
              <Form.Item name="ExtensionCode11"><Input /></Form.Item>
              <Form.Item name="ExtensionCode12"><Input /></Form.Item>
              <Form.Item name="ExtensionCode13"><Input /></Form.Item>
              <Form.Item name="ExtensionCode14"><Input /></Form.Item>
              <Form.Item name="ExtensionCode15"><Input /></Form.Item>
              <Form.Item name="ExtensionCode16"><Input /></Form.Item>
              <Form.Item name="ExtensionCode17"><Input /></Form.Item>
              <Form.Item name="ExtensionCode18"><Input /></Form.Item>
              <Form.Item name="ExtensionCode19"><Input /></Form.Item>
              <Form.Item name="ExtensionCode20"><Input /></Form.Item>
            </div>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '1em' }} >
              <Row>
                <Col span={6}>
                  <Form.Item name="SpecifiedCategory" label="区　分">
                    <Select onChange={(val) => this.setState({ checkName: val })} >
                      <Select.Option value={1}>個人番号</Select.Option>
                      <Select.Option value={2}>事業所</Select.Option>
                      <Select.Option value={3}>保険者</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={14}>
                  <Space>
                    <Form.Item name="NumRangeF" label={this.checkLable(this.state.checkName)}>
                      <Input.Search onSearch={() => this.showModalNum()} />
                    </Form.Item>
                    <Form.Item>~</Form.Item>
                    <Form.Item name="NumRangeT" >
                      <Input.Search onSearch={() => this.showModalNum()} />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item name="AgeReferenceDateChar" label="基準日">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} className="w-100" format={dateFormat} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="CsvFile" label="出力先">
                <Input onPressEnter={() => this.handlingCsvFile()} />
              </Form.Item>
            </div>
            <Button type="primary" style={{ float: 'right', marginTop: '1em' }} onClick={() => this.handlingCsvFile()} >実　行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0479001_PersonalInfoCsvOutput);
