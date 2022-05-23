import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Checkbox, Button, Tabs, Row, Col, Space, message, Spin, DatePicker } from "antd";
import CmtRegisterCopyAction from 'redux/InspectionMaintenance/CmtRegisterCopy/CmtRegisterCopy.actions'
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { TabPane } = Tabs;
const { TextArea } = Input;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 8 },
};
class WS2701025_CmtRegisterCopy extends React.Component {
  static propTypes = {
    Li_CommentCode: PropTypes.any,
    Li_IdentifyCode: PropTypes.any,
    Li_Copy: PropTypes.any,
    Li_status:PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'コメント登録・複写';

    this.state = {
      isloadingFm: true, 
      dataInit: {
        "CmtCode": "",
        "SearchKey": "",
        "CmtContent": "",
        "Priority": "",
        "CmtGroup": "",
        "NumTimesUse": "",
        "FinalDayUse": "",
        "FinalDayUseChar": "",
        "InputFlag": "",
        "CourseLevel2": false,
        "CourseLevel3": false,
        "OutputType": "",
        "Vl2Secret": false,
        "StsEnable": false
    }
    };
    this.callback = this.callback
  }
  componentDidMount() { 
    this.getScreenData()
    
  }
  componentDidUpdate(propPrve) {
    if (this.props != propPrve) {
      this.getScreenData()
    }
  }
  getScreenData() {
    this.formRef.current?.setFieldsValue(this.state.dataInit)
    this.setState({ isloadingFm: true })
    let data = {
      Li_Copy: this.props.Li_Copy ? this.props.Li_Copy : "",
      IdentifyCode: this.props.Li_IdentifyCode ? this.props.Li_IdentifyCode : "",
      comment_code: this.props.Li_CommentCode ? this.props.Li_CommentCode : ""
    }
    CmtRegisterCopyAction.getScreenData(data).then(res => {  
      if (res.CmtCode) {
        res.CmtCode = this.props?.Li_status ==="CopyComment" ? "" : res.CmtCode
        res.FinalDayUseChar = this.isDateNotNull(res.FinalDayUseChar) ? "" : moment(res.FinalDayUseChar);
        res.CourseLevel2 = res.CourseLevel2 === 0 ? false : true;
        res.CourseLevel3 = res.CourseLevel3 === 0 ? false : true; 
        this.formRef.current?.setFieldsValue( res ? res : [] )
        this.forceUpdate()
      } 
    })
      .catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
        } 
      }).finally(() => this.setState({ isloadingFm: false }))
  }
  
  isDateNotNull(date) {
    return (date === "0000-00-00" || date === "0000/00/00" || date === undefined || date == null || date.length <= 0) ? true : false;
  }
  CopyComment(data){ 
    CmtRegisterCopyAction.CopyComment(data).then(res=>{ 
      if(this.props.onFinishScreen){
        this.props.onFinishScreen()
      }
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
      } 
    })
  } 
  UpdateComment(data){ 
    CmtRegisterCopyAction.UpdateComment(data).then(res=>{
       if(this.props.onFinishScreen){
         this.props.onFinishScreen({search_key: this.formRef.current?.getFieldValue("SearchKey") ,  comment_content: this.formRef.current?.getFieldValue("CmtContent")})
       }
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
      } 
    })
  }
  RegisterComment(data){ 
    CmtRegisterCopyAction.RegisterComment(data).then(res=>{
      if(this.props.onFinishScreen){
        this.props.onFinishScreen()
      }
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
      } 
    })
  } 
  onBlurNumber = (e,namePath) => {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value))) {
      
    }else {
      this.formRef.current?.setFields([{
         name: namePath,
         value: ""
      }])
    }
    this.forceUpdate()
  };

  onSubmit(values) { 
    values.FinalDayUseChar =   moment(values.FinalDayUseChar).format("YYYY/MM/DD") === "Invalid date"  ? "" : moment(values.FinalDayUseChar).format("YYYY/MM/DD");
    values.CourseLevel2  = values.CourseLevel2 ? 1 : 0
    values.CourseLevel3  = values.CourseLevel3 ? 1 : 0
    values.StsEnable = values.StsEnable? 1 : 0
    values.Vl2Secret = values.Vl2Secret ? 1 : 0  
    const data = { ...values,  IdentifyCode: this.props.Li_IdentifyCode  ,comment_code : this.props.Li_CommentCode  }
    if(values.CmtCode .length === 0){ 
      message.error("コードを入力してください。")
    }else{
      if(this.props.Li_status === "RegisterComment" ){
        if(values.CmtContent.length === 0){
          message.error("コメントを入力してください。")
        }else{
          this.RegisterComment(data)
        }
      }else if(this.props.Li_status === "UpdateComment"){
        if(values.CmtContent.length === 0){
          message.error("コメントを入力してください。")
        }else{
          this.UpdateComment(data)
        } 
      }else if(this.props.Li_status === "CopyComment"){ 
        if(values.CmtContent.length === 0){
          message.error("コメントを入力してください。")
        }else{
          this.CopyComment(data) 
        }  
      }
    }
    
  }
  render() {
    return (
      <div className="cmt-register-copy">
        <Card title="コメント登録・複写">
          <Spin spinning={this.state.isloadingFm}>
            <Form
              autoComplete ="off"
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Tabs defaultActiveKey="0"  >
                <TabPane tab={<Button   >コメント入力</Button>} key="0">
                  <Row>
                    <Col span={4}>
                      <Form.Item name="CmtCode" label="コード">
                        <Input maxLength={5} disabled={this.props?.Li_status === "UpdateComment" ? true : false }
                          onBlur={(e)=>{
                            if(this.props?.Li_status !== "UpdateComment" ){
                                this.onBlurNumber(e,"CmtCode")
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10} offset={1}>
                      <Form.Item name="SearchKey" label="検索キー">
                        <Input maxLength={20} />
                      </Form.Item>
                    </Col>
                    <Col span={9} style={{ textAlign: 'right' }}>
                      <Form.Item name="StsEnable" valuePropName="checked" >
                        <Checkbox>有効</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <label>コメント</label>
                      <Form.Item name="CmtContent">
                        <TextArea rows={4} maxLength={500} />
                      </Form.Item>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab={<Button  >詳細設定</Button>} key="1">
                  <Form.Item  {...layout} name="CmtGroup" label="コメント群">
                    <Input maxLength={10} style={{ width: "98%" }} />
                  </Form.Item>
                  <Form.Item  {...layout} label="優先" name="Priority" >
                    <Input maxLength={2}  style={{ width: "40px" }} onBlur={(e)=> this.onBlurNumber(e,"Priority")} />
                  </Form.Item>
                  <Form.Item  {...layout} label="使用回数" name="NumTimesUse">
                    <Input />
                  </Form.Item>
                  <Form.Item  {...layout} label="最終使用日" name="FinalDayUseChar">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                  </Form.Item>
                  <Form.Item  {...layout} label="印字条件" >
                    <Space>
                      <Form.Item name="Vl2Secret" label="S" valuePropName="checked">
                        <Checkbox></Checkbox>
                      </Form.Item>
                      <Form.Item name="CourseLevel2" label="L2" valuePropName="checked">
                        <Checkbox></Checkbox>
                      </Form.Item>
                      <Form.Item name="CourseLevel3" label="L3" valuePropName="checked">
                        <Checkbox></Checkbox>
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  <Form.Item  {...layout} label="出力種別" name="OutputType">
                    <Input maxLength={10} />
                  </Form.Item>
                </TabPane>
              </Tabs>
              <Button type="primary" style={{ marginTop: '1em', float: 'right' }} onClick={()=>{
                this.onSubmit(this.formRef.current.getFieldValue())
              }} >登録</Button>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2701025_CmtRegisterCopy);
