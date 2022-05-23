import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Space, Modal, message, Spin } from "antd";
import ConditionExpressSetAction from 'redux/InspectionMaintenance/InspectItemJudgeValueSetting/ConditionExpressSet.actions'
import WS0364008_HeaderInput from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0364008_HeaderInput.jsx';
import WS0364009_DataInput from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0364009_DataInput.jsx';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

const { TextArea } = Input;
class WS0364007_ConditionExpressSet extends React.Component {
  static propTypes = {
    Lio_ConditionalExpression: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '条件式設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoaddingFrm: false
    };
  }
  componentDidMount() {
    this.GetScreenData()
  }
  GetScreenData = () => {
    this.setState({ isLoaddingFrm: true })
    let data = {
      fomula: this.props.Lio_ConditionalExpression ? this.props.Lio_ConditionalExpression : "",
      HeaderCode: this.formRef.current?.getFieldValue("HeaderCode") ? this.formRef.current?.getFieldValue("HeaderCode") : "",
      InspectCode: this.formRef.current?.getFieldValue("InspectCode") ? this.formRef.current?.getFieldValue("InspectCode") : "",
      OutputChar: this.formRef.current?.getFieldValue("OutputChar") ? this.formRef.current?.getFieldValue("OutputChar") : ""
    }
    ConditionExpressSetAction.GetScreenData(data).then(res => {
      this.formRef.current?.setFieldsValue(res)
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }

    }).finally(() => this.setState({ isLoaddingFrm: false }))

  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  CancelF02(){
    this.setState({ isLoaddingFrm: true })
    let data = {
      fomula: this.props.Lio_ConditionalExpression ? this.props.Lio_ConditionalExpression : "", 
    }
    ConditionExpressSetAction.Cancel(data).then(res => {
      this.formRef.current?.setFieldsValue(res)
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      } 
    }).finally(() => this.setState({ isLoaddingFrm: false }))
  }
  CorrectF03(){
    this.setState({ isLoaddingFrm: true })
    let data = {
      ConditionalExpression: this.formRef.current?.getFieldValue("ConditionalExpression")  ? this.formRef.current?.getFieldValue("ConditionalExpression")  : "", 
    }
    ConditionExpressSetAction.CorrectF03(data).then(res => {
      this.formRef.current?.setFieldsValue(res)
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      } 
    }).finally(() => this.setState({ isLoaddingFrm: false }))
  }
  RedisplayF11(){
    this.setState({ isLoaddingFrm: true })
    let data = {
      ConditionalExpression: this.formRef.current?.getFieldValue("ConditionalExpression")  ? this.formRef.current?.getFieldValue("ConditionalExpression")  : "", 
    }
    ConditionExpressSetAction.RedisplayF11(data).then(res => {
      if(res?.message?.length > 0){
        message.error(res.message)
      }else{
        this.formRef.current?.setFieldsValue(res)
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      } 
    }).finally(() => this.setState({ isLoaddingFrm: false }))
  }
  UpdateF12(){
    this.setState({ isLoaddingFrm: true })
    let data = {
      ConditionalExpression: this.formRef.current?.getFieldValue("ConditionalExpression")  ? this.formRef.current?.getFieldValue("ConditionalExpression")  : "", 
    }
    ConditionExpressSetAction.UpdateF12(data).then(res => {
       if(this.props.onFinishScreen){
         this.props.onFinishScreen({Lio_ConditionalExpression: res?.formula , recordData: res})
       }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      } 
    }).finally(() => this.setState({ isLoaddingFrm: false }))
  }
  render() {
    return (
      <div className="condition-express-set">
        <Card title="条件式設定">
          <Spin spinning={this.state.isLoaddingFrm}>
            <Form
              ref={this.formRef}
              autoComplete="off"
            >
              <Form.Item name="ConditionalExpressionDisplay" >
                <TextArea rows={4} maxLength={1024} readOnly />
              </Form.Item>
              <Form.Item name="ConditionalExpression" >
                <TextArea rows={4} maxLength={1024} />
              </Form.Item>
              <Space style={{ float: 'right', marginTop: '1em' }}>
                <Button type="primary" onClick={()=>this.CancelF02()} >取消</Button>
                <Button type="primary" onClick={()=>this.CorrectF03()}>訂正</Button>
                <Button type="primary" onClick={()=>{
                   this.setState({
                    ...this.state,
                    childModal: {
                      width:  300,
                      visible: true,
                      component: (<WS0364008_HeaderInput 
                        onFinishScreen={(output) => { 
                          this.formRef.current?.setFieldsValue({
                            InspectCode: output.Lo_HeaderInfo
                          })
                          this.GetScreenData()
                          this.closeModal()
                        }}
                      />)
                    }
                  });
                }}>ヘッダ</Button>
                <Button type="primary"  onClick={()=>{
                   this.setState({
                    ...this.state,
                    childModal: {
                      width:  1500,
                      visible: true,
                      component: (<WS0271001_InspectItemSearchQuerySingle 
                        onFinishScreen={(output) => {  
                          this.formRef.current?.setFieldsValue({
                            HeaderCode: output.Lio_InspectItemCode
                          })
                          this.GetScreenData()
                          this.closeModal()
                        }}
                      />)
                    }
                  });
                }}>検査</Button>
                <Button type="primary"onClick={()=>{
                   this.setState({
                    ...this.state,
                    childModal: {
                      width:  500,
                      visible: true,
                      component: (<WS0364009_DataInput 
                        Lio_Operator = {this.formRef.current?.getFieldValue("Operator")} 
                        onFinishScreen={(output) => {  
                          this.formRef.current?.setFieldsValue({
                            Operator: output.Lio_Operator,
                            OutputChar: output.Lio_Operator
                          })
                          this.GetScreenData()
                          this.closeModal()
                        }}
                      />)
                    }
                  });
                }}  >演算子</Button>
                <Button type="primary"  onClick={()=>this.RedisplayF11()}>再表示</Button>
                <Button type="primary"  onClick={()=>this.UpdateF12()}>更新</Button>
              </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0364007_ConditionExpressSet);
