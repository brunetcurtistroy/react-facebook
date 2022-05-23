import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Button, Col, Row, Space, DatePicker, Modal } from "antd";
import WS0246001_InsurerInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0432001_CsvConfirm from 'pages/TO_StatisticalServices/V2MS0140_PersonalInfoCsvOutput/WS0432001_CsvConfirm.jsx';

class WS0480003_OfficeInfoCsvOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '事業所情報CSV出力';

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
  showInsurerInfoSearchQuery(val){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0246001_InsurerInfoSearchQuery
            _Dks030StartUpFlag = {this.formRef.current?.getFieldValue("Start")}
            _Dks030KanshoCode = {this.formRef.current?.getFieldValue("KanshoCode")}
            onFinishScreen={(output) => { 
              this.formRef.current?.setFieldsValue({
                KanshoCode: output._Dks030KanshoCode,  
              })
              if(val === 1){
                this.formRef.current?.setFieldsValue({
                  KanshoCodeFrom: output._Dks030KanshoCode,  
                })
              }else{
                this.formRef.current?.setFieldsValue({
                  KanshoCodeTo: output._Dks030KanshoCode,  
                })
              }
              this.forceUpdate()
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  showOfficeInfoRetrievalQuery(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0247001_OfficeInfoRetrievalQuery
          _Dks020StartUpFlag = {this.formRef.current?.getFieldValue("Start")}
          _Dks020KanshoCode = {this.formRef.current?.getFieldValue("KanshoCode")} 
          _Dks020OfficeCd  = {this.formRef.current?.getFieldValue("OfficeCode")}
          _Dks020BranchShopCd  = {this.formRef.current?.getFieldValue("BranchStoreCodeF")}
            onFinishScreen={(output) => { 
              this.formRef.current?.setFieldsValue({
                OfficeCode: output._Dks020OfficeCd,
                OfficeCodeNum: (output._Dks020OfficeCd && output._Dks020OfficeCd.length >8) ? (output._Dks020OfficeCd)?.substring(0,8) : output._Dks020OfficeCd
              })
              this.forceUpdate()
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  CsvOutput() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '50%',
        component: (
          <WS0432001_CsvConfirm
            Lio_Output = {this.formRef.current?.getFieldValue("CsvFileNaen")}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                CsvFileNaen: output.Lio_Output,
                Sys010Status: output.Lo_StsOutput
              })
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
      <div className="office-info-csv-output">
        <Card title="事業所情報CSV出力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ OutputSpecifyDivision: 1,}}
          >
             <div style={{ display: 'none' }}>
              <Form.Item name="CsvFileNaen"><Input /></Form.Item>
              <Form.Item name="Start"><Input /></Form.Item>
              <Form.Item name="KanshoCode"><Input /></Form.Item>
              <Form.Item name="InsurerNum"><Input /></Form.Item>
              <Form.Item name="OfficeCode"><Input /></Form.Item>
              <Form.Item name="Sys010Status"><Input /></Form.Item>
              <Form.Item name="Sys010SpecifiedValue"><Input /></Form.Item>
              <Form.Item name="OutputSpecifyDivision"><Input /></Form.Item>
              <Form.Item name="OutputSpecifyClassify"><Input /></Form.Item>
              <Form.Item name="OutputSpecifiedClassifyName1"><Input /></Form.Item>
              <Form.Item name="OutputSpecifiedClassifyName2"><Input /></Form.Item> 
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
              <Form.Item name="ButtonSelect"><Input /></Form.Item>
              <Form.Item name="FileStsM3"><Input /></Form.Item>
              <Form.Item name="FileStsM2"><Input /></Form.Item>
              <Form.Item name="ExecButton"><Input /></Form.Item>

            </div>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '1em' }} >
              <Row>
                <Col span={6}>
                  <Form.Item name="OutputSpecifyDivision" label="出力順">
                    <Select   >
                      <Select.Option value={1}>事業所</Select.Option>
                      <Select.Option value={2}>保険者</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={14}>
                  <Space>
                    <Form.Item name="KanshoCodeFrom" label="保険者" >
                      <Input.Search onSearch={() => this.showInsurerInfoSearchQuery(1)} />
                    </Form.Item>
                    <Form.Item>~</Form.Item>
                    <Form.Item name="KanshoCodeTo" >
                      <Input.Search onSearch={() => this.showInsurerInfoSearchQuery()} />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item name="OfficeCodeNum" label="事業所">
                    <Input.Search readOnly style={{ width: '95%' }} onSearch={()=> this.showOfficeInfoRetrievalQuery()} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Space>
                    <Form.Item name="BranchStoreCodeF" >
                      <Input.Search type="number" onSearch={() => this.showOfficeInfoRetrievalQuery()}  />
                    </Form.Item>
                    <Form.Item>~</Form.Item>
                    <Form.Item name="BranchStoreCodeT" >
                      <Input.Search type="number" onSearch={() => this.showOfficeInfoRetrievalQuery()}  />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </div>
            <Button type="primary" style={{ float: 'right', marginTop: '1em' }} onClick={()=>this.CsvOutput()}  >出力</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0480003_OfficeInfoCsvOutput);
