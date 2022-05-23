import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Radio, Button, Space, Row, Col, DatePicker, Modal } from "antd";
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS0578001_CourseMultipleExtractScreenSub from 'pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS0578001_CourseMultipleExtractScreenSub.jsx';
import WS0435012_PreviewConfirm from 'pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS0435012_PreviewConfirm.jsx';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
class WS1000001_ItemJudgeClassifyTbl extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'V4-VNS60600:項目判定分類表';
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
              _Dks020StartUpFlag ={1}
              _Dks020KanshoCode ={this.formRef.current?.getFieldValue("GkanshoCdStart")}
              _Dks0200fficeCd ={this.formRef.current?.getFieldValue("GplantCdlnput")}
              _Dks020BranchShopCd={this.formRef.current?.getFieldValue("GbranchStoreCdStart")}
              onFinishScreen={(output) => {
                this.closeModal()
              }}
            />
          ),
        },
      });
  }
  showBasicCourseInquiry =() =>{ 
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: '80%',
          component: (
            <WS0265001_BasicCourseInquiry
              _Dks040StartUpFlag ={2}
              _Dks040CourseCode ={this.formRef.current?.getFieldValue("GmedicalExamCourseStart ")}
              _Dks040QueryClassify ={1}
              onFinishScreen={(output) => {
                this.closeModal()
              }}
            />
          ),
        },
      }); 
  }
  showWCourseMultipleExtractScreenSub(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 300,
        component: (
          <WS0578001_CourseMultipleExtractScreenSub
             Li_XCoordinate ={null} //WinBox(0,'X')+ClickWX()
             Li_YCoordinate = {null} //WinBox(0,'Y')+ClickWY()
             onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    }); 
  }
  showInspectItemSearchQuerySingle(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0271001_InspectItemSearchQuerySingle 
          _Dks060StartUpFlag ={1}
          _Dks060InspectCd =  {this.formRef.current?.getFieldValue("GinspectCodeStart ")}
             onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    }); 
  }
  render() {
    var today = new Date().getFullYear()+'/'+("0"+(new Date().getMonth()+1)).slice(-2)+'/'+("0"+new Date().getDate()).slice(-2)
    return (
      <div className="item-judge-classify-tbl">
        <Card title="V4-VNS60600:項目判定分類表">
        <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{GdateStartChars:moment(today),GdateEndChars:moment(today), Gv1PrintInstruction_: 1  }}
          >
            <div style={{display:'none'}}>
              <Form.Item name="Preview"><Input /></Form.Item>
              <Form.Item name="PrinterJob"><Input /></Form.Item>
              <Form.Item name="CheckProcessStatus"><Input /></Form.Item>
              <Form.Item name="Sys010Status"><Input /></Form.Item>
              <Form.Item name="Sys010SpecifiedValue"><Input /></Form.Item>
              <Form.Item name="StsM2"><Input /></Form.Item>
              <Form.Item name="StsM3"><Input /></Form.Item>
              <Form.Item name="StsM5"><Input /></Form.Item>
              <Form.Item name="StsD5"><Input /></Form.Item>
              <Form.Item name="ALevel"><Input /></Form.Item>
              <Form.Item name="BLevel"><Input /></Form.Item>
              <Form.Item name="CLevel"><Input /></Form.Item>
              <Form.Item name="DLevel"><Input /></Form.Item>
              <Form.Item name="ELevel"><Input /></Form.Item>
              <Form.Item name="FLevel"><Input /></Form.Item>
              <Form.Item name="GLevel"><Input /></Form.Item>
              <Form.Item name="HLevel"><Input /></Form.Item>
              <Form.Item name="ILevel"><Input /></Form.Item>
              <Form.Item name="JLevel"><Input /></Form.Item>
              <Form.Item name="GdateStart"><Input /></Form.Item>
              <Form.Item name="GdateEnd"><Input /></Form.Item>
              <Form.Item name="GkanshoCdStart"><Input /></Form.Item>
              <Form.Item name="GkanshoCdEnd"><Input /></Form.Item>
              <Form.Item name="GprintInstruction"><Input /></Form.Item>
              <Form.Item name="PrintJudgeLevel"><Input /></Form.Item>
              <Form.Item name="GstsDate"><Input /></Form.Item>
              <Form.Item name="Gv1PrintInstruction_List"><Input /></Form.Item>
              <Form.Item name="ButtonSelect"><Input /></Form.Item>
            </div>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '0.5em' }}>
              <Space>
                <Form.Item label="&ensp;受診日" name="GdateStartChars">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef}  format={dateFormat} />
                </Form.Item>
                <Form.Item  >~</Form.Item>
                <Form.Item name="GdateEndChars">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                </Form.Item>
              </Space>
              <Row>
                <Col span={8}>
                  <Form.Item label="&ensp;事業所" name="GplantCdInput">
                    <Input.Search readOnly  style={{ width: '95%' }} onSearch={() => this.showOfficeInfoRetrievalQuery()} />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Space>
                    <Form.Item name="GbranchStoreCdStart" >
                      <Input readOnly />
                    </Form.Item>
                    <Form.Item>~</Form.Item>
                    <Form.Item name="GbranchStoreCdEnd">
                      <Input type="number" />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={13}>
                  <Space>
                    <Form.Item label="健診ｺｰｽ" name="GmedicalExamCourseStart">
                      <Input.Search readOnly onSearch={() => this.showBasicCourseInquiry() }/>
                    </Form.Item>
                    <Form.Item  >~</Form.Item>
                    <Form.Item name="GmedicalExamCourseEnd">
                      <Input.Search readOnly style={{width:'85%'}} onSearch={() => this.showBasicCourseInquiry() } />
                    </Form.Item>
                    <Form.Item>
                      <Button type="text" style={{background:'red'}} onClick={()=>this.showWCourseMultipleExtractScreenSub()}>▼</Button>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Space>
                <Form.Item name="GinspectCodeStart" label="検査項目">
                  <Input.Search onSearch={()=> this.showInspectItemSearchQuerySingle()}  />
                </Form.Item>
                <Form.Item >~</Form.Item>
                <Form.Item name="GinspectCodeEnd">
                  <Input.Search onSearch={()=> this.showInspectItemSearchQuerySingle()}  />
                </Form.Item>
              </Space>
              <Form.Item  name="Gv1PrintInstruction_" label="印刷指示" >
              <Radio.Group>
                <Radio value={1}>明細のみ</Radio>
                <Radio value={2}>総計あり</Radio>
                <Radio value={3}>総計のみ</Radio>
              </Radio.Group>
            </Form.Item>
            </div> 
              <Button type="primary" style={{float:'right', marginTop:'1em'}} onClick={()=>{
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 300,
                    component: (
                      < WS0435012_PreviewConfirm
                         onFinishScreen={(output) => {
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                }); 
              }}>印  刷</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1000001_ItemJudgeClassifyTbl);
