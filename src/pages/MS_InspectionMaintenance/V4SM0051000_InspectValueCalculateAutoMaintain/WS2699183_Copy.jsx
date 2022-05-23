import { ArrowDownOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Modal, Row, Select, Spin } from "antd";
import WS0061012_CheckYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061012_CheckYes.jsx';
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import CopyAction from 'redux/InspectionMaintenance/InspectValueCalculateAutoMaintain/Copy.actions';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2699183_Copy extends React.Component {
  static propTypes = {
    Li_InspectItemCopySource: PropTypes.any,
    Li_GenderCopySource: PropTypes.any,
    Li_TableCheck: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写';

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
    this.setState({ loaddingFrm: true })
    const param = {
      InspectItemCopySource: this.props.Li_InspectItemCopySource ? this.props.Li_InspectItemCopySource : "",
      GenderCopySource: this.props.Li_GenderCopySource ? this.props.Li_GenderCopySource : ""
    }
    CopyAction.GetInit(param).then(res => {
      this.formRef.current?.setFieldsValue(res)
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      } 
    }).finally(() => this.setState({ loaddingFrm: false })) 
  }
  onFinish(values) { 
  }
  CopyRegister(){
    let arrTable = this.props.Li_TableCheck;
    let valueGender = this.formRef.current.getFieldValue("GenderCopy")
    let gender = valueGender === 0 ?"共通" : valueGender === 1 ? "男" : "女" 
    for(let i = 0; i < arrTable?.length ; i ++){
      if(arrTable[i].W1_inspect_item === this.props.Li_InspectItemCopySource && arrTable[i].Gender === gender){
         message.error("すでに登録されています。")
         return
      }
      if(i == arrTable.length - 1){
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            centered: true,
            width: 500,
            component: (
              <WS0061012_CheckYes
                Li_Message = {"登録しました。"}  
                onFinishScreen={(output) => { 
                  if(output.Lio_StsReturn){
                    this.Copy()
                  } 
                  this.closeModal()
                 }}
              />
            ),
          },
        })
      }
    } 
  } 
  Copy(){
    this.setState({ loaddingFrm: true })
    const param = {
      InspectItemCopySource: this.props.Li_InspectItemCopySource ? this.props.Li_InspectItemCopySource : "",
      GenderCopy: this.formRef.current?.getFieldValue("GenderCopy") ,
      InspectItems:this.formRef.current?.getFieldValue("InspectItems") ? this.formRef.current?.getFieldValue("InspectItems") : "",
      GenderCopySourceChar: this.formRef.current?.getFieldValue("GenderCopySourceChar") ? this.formRef.current?.getFieldValue("GenderCopySourceChar") : ""
    }
    CopyAction.CopyRegister(param).then(res => { 
       if(this.props.onFinishScreen()){
         this.props.onFinishScreen()
       }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      } 
    }).finally(() => this.setState({ loaddingFrm: false })) 
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  };
  render() {
    return (
      <div className="copy">
        <Card title="複写">
          <Spin spinning={this.state.loaddingFrm}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{ GenderCopy: 0 }}
            >
              <Row>
                <Col span={8}>
                  <Form.Item name="InspectItems" label="&emsp;検査項目">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col offset={1}>
                  <Form.Item>
                    <span>{this.formRef.current?.getFieldValue("exam_name")}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={7}>
                  <Form.Item label="複写元性別" name="GenderCopySourceChar">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={7} style={{ textAlign: 'center' }} >
                  <Form.Item label="&emsp;&emsp;&emsp;&emsp;&emsp;">
                    <ArrowDownOutlined style={{ fontSize: '20px', color: '#08c' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={7}>
                  <Form.Item name="GenderCopy" label="複写先性別" >
                    <Select>
                      <Select.Option value={0}>共通</Select.Option>
                      <Select.Option value={1}>男</Select.Option>
                      <Select.Option value={2}>女</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={17} style={{ textAlign: 'right' }} >
                  <Button type="primary"onClick={()=>this.CopyRegister()} >複写登録</Button>
                </Col>
              </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2699183_Copy);
