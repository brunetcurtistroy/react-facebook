import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Space,Spin,message } from "antd";
import CopyScreenAction from 'redux/InspectionMaintenance/DetermineLevelModify/CopyScreen.action'
class WS0448009_CopyScreen extends React.Component {
  static propTypes = {
    Li_Condition2F: PropTypes.any,
    Lo_Condition2T: PropTypes.any,
    Lo_Exec: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写画面'; 
    this.state = {
      loaddingFrm: false
    };
  }
componentDidMount(){ 
  this.formRef.current?.setFieldsValue({
    Li_Condition2F:  this.props.Li_Condition2F,
    item: this.props.item
  })
  this.forceUpdate()
} 
componentDidUpdate(preV){
  if(preV != this.props){
    this.formRef.current?.setFieldsValue({
      Li_Condition2F:  this.props.Li_Condition2F,
      item: this.props.item
    })
  this.forceUpdate()

  }
}
CopyScreen(){
  this.setState({loaddingFrm: true})
  let data = { condition_2: this.props.Li_Condition2F , Lo_Condition2T: this.formRef.current?.getFieldValue("Lo_Condition2T").trim() }
  CopyScreenAction.CopyScreen(data).then(res=>{
      if(this.props.onFinishScreen){
        this.props.onFinishScreen({
          Lo_Condition2T: this.formRef.current?.getFieldValue("Lo_Condition2T"),
          Lo_Exec: this.formRef.current?.getFieldValue("StsConfirm") === 6 ? true : false,
        })
      }
  }).catch(error =>{
    const res = error.response;
    if(!res || res.data || res.data.message){
      message.error('エラーが発生しました');
    } 
  }).finally(()=>this.setState({loaddingFrm: false})) 
}

  render() {
    return (
      <div className="copy-screen">
        <Card title="複写画面">
          <Spin spinning={this.state.loaddingFrm }>
          <Form
            ref={this.formRef} autoComplete="off"
            initialValues={{Lo_Condition2T:""}} 
          >
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)' , background:'red' , padding:'1em'}}>
              <div style={{color: 'white'}} >検査判定ﾏｽﾀ、判定値ﾏｽﾀが</div>
              <div style={{color: 'white'}} >一括で複写されます。</div>
            </div> 
            <Space>
              <Form.Item label="&emsp;&emsp;複写元" name="Li_Condition2F" >
                <Input style={{width:'80px', border:'none'}} readOnly />
              </Form.Item>
              <Form.Item>
                <span>{this.formRef.current?.getFieldValue("item")}</span>
              </Form.Item>
            </Space><br/>
            <Space>
              <Form.Item label="&emsp;&emsp;複写先" name="Lo_Condition2T">
                <Input style={{width:'80px'}}/>
              </Form.Item>
              <Form.Item>
                <span>{this.formRef.current?.getFieldValue("item")}</span>
              </Form.Item>
            </Space><br/>
            <Button type="primary" style={{float:'right'}} onClick={()=>this.CopyScreen()} >実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0448009_CopyScreen);
