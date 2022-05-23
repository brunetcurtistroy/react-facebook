import React from "react";
import { connect } from "react-redux";
import PropTypes, { any } from 'prop-types';
import { Card, Form, Checkbox, Button, Spin, message,Modal } from "antd";
import AcceptanceProcessMenuAction from 'redux/basicInfo/ConsultInfoReconstruction/AcceptanceProcessMenu.actions'
import WS0650001_DocumentBatchCreateSub from 'pages/JZ_AdvancePreparation/V4JZ0102003_DocumentBatchCreate/WS0650001_DocumentBatchCreateSub.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS3074001_AcceptanceProcessMenu extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_MenuOption: PropTypes.any,
    Li_ProcessDivision: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '受付処理メニュー';

    this.state = {
      loaddingFrm: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount() {
     this.GetScreenData()
  }
  GetScreenData() {
    this.setState({loaddingFrm: true})
    let data={
      Li_CourseLevel : !this.isEmpty(this.props.Li_CourseLevel) ? this.props.Li_CourseLevel : "", 
      Li_ReserveNum : !this.isEmpty(this.props.Li_ReserveNum) ? this.props.Li_ReserveNum : "", 
      Li_ProcessDivision: !this.isEmpty(this.props.Li_ProcessDivision) ? this.props.Li_ProcessDivision : "", 
    }
    AcceptanceProcessMenuAction.GetScreenData(data).then(res=>{
        this.formRef.current?.setFieldsValue(res)
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
        return;
      }
    }).finally(()=>this.setState({loaddingFrm: false})) 
  }
  componentDidUpdate(prevProps) {
     if (prevProps != this.props) {
      this.GetScreenData()
    }
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  ShowDocumentBatchCreateSub(value){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 500,
        component: (
          <WS0650001_DocumentBatchCreateSub
          Li_CourseLevel = {!this.isEmpty(this.props.Li_CourseLevel) ? this.props.Li_CourseLevel : ""} 
          Li_ReserveNum = {!this.isEmpty(this.props.Li_ReserveNum) ? this.props.Li_ReserveNum : ""}
          Li_OutputPattern = {value}
            onFinishScreen={(output) => { 
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  OrderTransmission(){
    this.setState({loaddingFrm: true})
    let data={
      Li_CourseLevel : !this.isEmpty(this.props.Li_CourseLevel) ? this.props.Li_CourseLevel : "", 
      Li_ReserveNum : !this.isEmpty(this.props.Li_ReserveNum) ? this.props.Li_ReserveNum : "", 
      Li_ProcessDivision: !this.isEmpty(this.props.Li_ProcessDivision) ? this.props.Li_ProcessDivision : "", 
      OrderTransmission: this.formRef.current?.getFieldValue("OrderTransmission")? 1 : 0
    }
    AcceptanceProcessMenuAction.OrderTransmission(data).then(res=>{ 

    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
        return;
      }
    }).finally(()=>this.setState({loaddingFrm: false})) 
  }
  ConsultVotePrint(){
    this.setState({loaddingFrm: true})
    let data={
      Li_CourseLevel : !this.isEmpty(this.props.Li_CourseLevel) ? this.props.Li_CourseLevel : "", 
      Li_ReserveNum : !this.isEmpty(this.props.Li_ReserveNum) ? this.props.Li_ReserveNum : "", 
      Li_ProcessDivision: !this.isEmpty(this.props.Li_ProcessDivision) ? this.props.Li_ProcessDivision : "", 
      ConsultVotePrint: this.formRef.current?.getFieldValue("ConsultVotePrint")? 1 : 0
    }
    AcceptanceProcessMenuAction.ConsultVotePrint(data).then(res=>{ 
      this.ShowDocumentBatchCreateSub(res?.Li_OutPattern)
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
        return;
      }
    }).finally(()=>this.setState({loaddingFrm: false})) 
  }
  CardIssuance(){
    this.setState({loaddingFrm: true})
    let data={
      Li_CourseLevel : !this.isEmpty(this.props.Li_CourseLevel) ? this.props.Li_CourseLevel : "", 
      Li_ReserveNum : !this.isEmpty(this.props.Li_ReserveNum) ? this.props.Li_ReserveNum : "", 
      Li_ProcessDivision: !this.isEmpty(this.props.Li_ProcessDivision) ? this.props.Li_ProcessDivision : "", 
      CardIssuance: this.formRef.current?.getFieldValue("CardIssuance")? 1 : 0
    }
    AcceptanceProcessMenuAction.CardIssuance(data).then(res=>{ 

    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
        return;
      }
    }).finally(()=>this.setState({loaddingFrm: false})) 
  }
  RunBtnInsuranceCardReader(){
    this.setState({loaddingFrm: true})
    let data={
      Li_CourseLevel : !this.isEmpty(this.props.Li_CourseLevel) ? this.props.Li_CourseLevel : "", 
      Li_ReserveNum : !this.isEmpty(this.props.Li_ReserveNum) ? this.props.Li_ReserveNum : "", 
      Li_ProcessDivision: !this.isEmpty(this.props.Li_ProcessDivision) ? this.props.Li_ProcessDivision : "", 
      InsuranceCardReader: this.formRef.current?.getFieldValue("InsuranceCardReader")? 1 : 0
    }
    AcceptanceProcessMenuAction.RunBtnInsuranceCardReader(data).then(res=>{ 

    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
        return;
      }
    }).finally(()=>this.setState({loaddingFrm: false})) 
  }
  Submit(){
    let formValue = this.formRef.current?.getFieldValue();
    if(formValue.InsuranceCardReader){
        this.RunBtnInsuranceCardReader()
    }
    if(formValue.OrderTransmission){
      this.OrderTransmission()
    }
    if(formValue.ConsultVotePrint){
      this.ConsultVotePrint()
    }
    if(formValue.CardIssuance){
      this.CardIssuance()
    }
  }
  render() {
    return (
      <div className="acceptance-process-menu" >
        <Card title="受付処理メニュー">
          <Spin spinning={this.state.loaddingFrm} >
            <Form ref={this.formRef}>
              <Form.Item name="OrderTransmission" valuePropName="checked">
                <Checkbox>オーダー送信</Checkbox>
              </Form.Item>
              <Form.Item name="ConsultVotePrint" valuePropName="checked">
                <Checkbox>受診票を印刷</Checkbox>
              </Form.Item>
              <Form.Item name="CardIssuance" valuePropName="checked">
                <Checkbox>カードの発行</Checkbox>
              </Form.Item>
              <Form.Item name="InsuranceCardReader" valuePropName="checked">
                <Checkbox>保険証の読取を行う</Checkbox>
              </Form.Item>
              <Form.Item style={{ float: 'right' }}>
                <Button type="primary" onClick={()=>this.Submit()} >実行</Button>
              </Form.Item>
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
            this.closeModal()
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

export default connect(mapStateToProps, mapDispatchToProps)(WS3074001_AcceptanceProcessMenu);
