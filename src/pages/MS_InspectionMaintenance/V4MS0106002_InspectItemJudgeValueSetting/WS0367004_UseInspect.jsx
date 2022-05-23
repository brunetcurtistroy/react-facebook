import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import { Button, Card, Checkbox, DatePicker, Form, Input, Modal, Select, Space, message,Spin } from "antd";
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import UseInspectAction from 'redux/InspectionMaintenance/InspectItemJudgeValueSetting/UseInspect.actions';
import moment from 'moment';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0367004_UseInspect extends React.Component {
  static propTypes = {
    Li_JudgeCode: PropTypes.any,
    Li_JudgeLevel: PropTypes.any,
    Li_StartDate: PropTypes.any,
    Li_Gender: PropTypes.any,
    Li_StsJudgeCode: PropTypes.any,
    Li_StsJudgeLevel: PropTypes.any,
    Li_StsStartDate: PropTypes.any,
    Li_StsGender: PropTypes.any,
    Li_JudgeLevelList: PropTypes.any,
    Li_JudgeMethod: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '使用検査';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      loadding: false,
      StsJudgeCode : false,
      StsJudgeLevel: false,
      StsStartDate: false,
      StsGender: false, 
    };
  } 
  componentDidMount() {
    this.GetScreenData()
  } 
  GetScreenData() {
    this.setState({loadding: true})
    let obj = {
      Li_JudgeCode: !this.isEmpty(this.props.Li_JudgeCode) ? this.props.Li_JudgeCode : 0,
      Li_JudgeLevel: !this.isEmpty(this.props.Li_JudgeLevel) ? this.props.Li_JudgeLevel : 0,
      Li_StartDate: !this.isEmpty(this.props.Li_StartDate) ? this.props.Li_StartDate : "",
      Li_Gender: !this.isEmpty(this.props.Li_Gender) ? this.props.Li_Gender : 0,
      Li_StsJudgeCode: this.props.Li_StsJudgeCode ? 1 : 0,
      Li_StsJudgeLevel: this.props.Li_StsJudgeLevel ? 1 : 0,
      Li_StsStartDate: this.props.Li_StsStartDate ? 1 : 0,
      Li_StsGender: this.props.Li_StsGender ? 1 : 0,
      Li_JudgeMethod: !this.isEmpty(this.props.Li_JudgeMethod) ? this.props.Li_JudgeMethod : 0
    }
    UseInspectAction.GetScreenData(obj).then(res => {  
      this.setState({
        StsJudgeCode : parseInt(res.StsJudgeCode) === 0 ? false: true ,
        StsJudgeLevel: parseInt(res.StsJudgeLevel)  === 0 ? false: true ,
        StsStartDate: parseInt(res.StsStartDate)  === 0 ? false: true ,
        StsGender: parseInt(res.StsGender) === 0 ? false: true  
      })
      res.StartDateFChar = moment(res.StartDateFChar).format("YYYY/MM/DD") === "Invalid date"  ? null :  moment(res.StartDateFChar).format("YYYY/MM/DD") 
      res.GenderF = res.GenderF? parseInt(res.GenderF) === 0 ? "" : parseInt(res.GenderF) :""
      res.JudgeCodeF = res.JudgeCodeF? parseInt(res.JudgeCodeF) :""
      res.StsJudgeCode = parseInt(res.StsJudgeCode)  
      res.StsJudgeLevel= parseInt(res.StsJudgeLevel)   
      res.StsStartDate = parseInt(res.StsStartDate)  
      res.StsGender = parseInt(res.StsGender)  
      this.formRef.current?.setFieldsValue(res) 
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました'); 
      } 
      console.log(res )
    }).finally(()=> this.setState({loadding: false}))
  } 
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  ShowInspectItemSearchQuerySingle() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        centered: true,
        width: 1500,
        component: (
          <WS0271001_InspectItemSearchQuerySingle
            Lio_InspectItemCode={this.formRef.current?.getFieldValue("JudgeCodeF")}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                JudgeCodeF: output?.Lio_InspectItemCode,
                exam_short_name: output?.recordData?.exam_short_name
              })
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  onFinish(values) {

  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  Run_F12(){
    let obj = {...this.formRef.current?.getFieldValue()};
    obj.StsGender = (obj.StsGender && obj.StsGender !=0) ? 1: 0
    obj.StsJudgeCode = (obj.StsJudgeCode && obj.StsJudgeCode !=0) ? 1: 0
    obj.StsJudgeLevel= (obj.StsJudgeLevel && obj.StsJudgeLevel !=0) ? 1: 0
    obj.StsStartDate= (obj.StsStartDate && obj.StsStartDate !=0) ? 1: 0
    obj.StartDateFChar = obj.StartDateFChar ?  (obj.StartDateFChar).format("YYYY/MM/DD") === "Invalid date"  ? "":  obj.StartDateFChar.format("YYYY/MM/DD") :"" 
    this.setState({loadding: true}) 
    UseInspectAction.Run_F12(obj).then(res=>{ 
   
      if(this.props.onFinishScreen){
        this.props.onFinishScreen()
      }
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
      } 
    }).finally(()=>this.setState({loadding: false}) )
  }
  render() { 
    return (
      <div className="use-inspect">
        <Card title="使用検査">
        <Spin spinning={this.state.loadding}>
            <Form ref={this.formRef} autoComplete="off"  >
            <Space>
              <Form.Item name="StsJudgeCode" valuePropName="checked" >
                <Checkbox onChange={(e)=>{
                  this.setState({StsJudgeCode: e.target.checked}) 
                  if(!e.target.checked){
                    this.formRef.current?.setFieldsValue({
                      JudgeCodeF : 0
                    })
                  }
                }} ></Checkbox>
              </Form.Item>
              <Form.Item  >
                <Button type="primary">検&emsp;&emsp;査</Button>
              </Form.Item>
              <Form.Item name="JudgeCodeF" >
                <Input.Search onSearch={() => this.ShowInspectItemSearchQuerySingle()} disabled={this.state.StsJudgeCode ? false: true} />
              </Form.Item>
              <Form.Item  >
                <span>{this.formRef.current?.getFieldValue("exam_short_name")}</span>
              </Form.Item>
            </Space><br />
            <Space>
              <Form.Item name="StsJudgeLevel" valuePropName="checked" >
                <Checkbox  onChange={(e)=>{
                   this.setState({StsJudgeLevel: e.target.checked}) 
                  if(!e.target.checked){
                    this.formRef.current?.setFieldsValue({
                      JudgeLevelF : 0
                    })
                  }
                }} ></Checkbox>
              </Form.Item>
              <Form.Item  >
                <Button type="primary">判定ﾚﾍﾞﾙ</Button>
              </Form.Item>
              <Form.Item name="JudgeLevelF" >
                  <Select style={{ width: '300px' }} disabled={this.state.StsJudgeLevel ? false : true} >
                    {this.formRef.current?.getFieldValue("ComboBox_JudgeLevelF")?.map((value) => (
                      <Select.Option key={'ComboBox_JudgeLevelF-' + Math.random()} value={value.LinkedField} >{value.DisplayField} </Select.Option>
                    ))}
                  </Select>
              </Form.Item>
            </Space><br />
            <Space>
              <Form.Item name="StsStartDate" valuePropName="checked" >
                <Checkbox onChange={(e)=>{
                  this.setState({StsStartDate: e.target.checked}) 
                  if(!e.target.checked){
                    this.formRef.current?.setFieldsValue({
                      StartDateF: 0,
                      StartDateFChar : null
                    })
                  }
                }} ></Checkbox>
              </Form.Item>
              <Form.Item  >
                <Button type="primary">開&ensp;始&ensp;日</Button>
              </Form.Item>
              <Form.Item name="StartDateFChar" >
                <VenusDatePickerCustom formRefDatePicker={this.formRef} format={"YYYY/MM/DD"} disabled={this.state.StsStartDate ? false: true} />
              </Form.Item>
            </Space><br />
            <Space>
              <Form.Item name="StsGender" valuePropName="checked" >
                <Checkbox  onChange={(e)=>{
                  this.setState({StsGender: e.target.checked}) 
                  if(!e.target.checked){
                    this.formRef.current?.setFieldsValue({
                      GenderF: ""
                    })
                  }
                }} ></Checkbox>
              </Form.Item>
              <Form.Item  >
                <Button type="primary">性&emsp;&emsp;別</Button>
              </Form.Item>
              <Form.Item name="GenderF" >
                <Select style={{ width: '100px' }} disabled={this.state.StsGender ? false: true}>
                  <Select.Option value={1}>男</Select.Option>
                  <Select.Option value={2}>女</Select.Option>
                </Select>
              </Form.Item>
            </Space><br />
            <Button type="primary" style={{ float: 'right', marginTop: '1em' }} disabled={  
              (this.state.StsJudgeCode || this.state.StsJudgeLevel || this.state.StsStartDate || this.state.StsGender) ? false : true
            } onClick={()=>this.Run_F12()} >実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0367004_UseInspect);
