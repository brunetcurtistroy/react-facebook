import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Row, Col, Spin, Modal, Space, message } from "antd";
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import man_img from 'assets/img/性別-男性.png';
import woman_img from 'assets/img/性別-女性.png';
import CardIssuingSubAction from 'redux/ReservationBusiness/PersonalReserveProcess/CardIssuingSub.actions'
import WS1846011_ConfirmScreen from "./WS1846011_ConfirmScreen";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1846001_CardIssuingSub extends React.Component {
  static propTypes = {
    Li_PersonalNum: PropTypes.any,
    Li_WindowMode: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'カード発行SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isloadding: false, 
    };
  }
 componentDidMount(){
   let value = this.isEmpty(this.props.Li_PersonalNum)?"": this.props.Li_PersonalNum
   this.formRef.current?.setFieldsValue({
    PersonalNum: value
   })
   this.GetInit(value)
 }
 componentDidUpdate(preV){
   if(this.props!= preV){
    let value = this.isEmpty(this.props.Li_PersonalNum)?"": this.props.Li_PersonalNum
    this.formRef.current?.setFieldsValue({
     PersonalNum: value
    })
     this.GetInit(value)
   }
 }
  GetInit(value){
    this.setState({isloadding:true})
    CardIssuingSubAction.GetIndex({PersonalNum: value }).then(res=>{ 
      res.birthday_on = res?.birthday_on?.replace(/-/g, "/")
        this.formRef.current?.setFieldsValue(res)
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
        return;
      }
    }).finally(()=>this.setState({isloadding:false}))
  } 
  ShowWS0248001_PersonalInfoSearchQuery() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true, width: 1500,
        component: (
          <WS0248001_PersonalInfoSearchQuery
            onFinishScreen={(output) => { 
              this.formRef.current?.setFieldsValue({
                PersonalNum: output.Lo_PersonalNumId
              })
              this.GetInit( output.Lo_PersonalNumId)
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  SupplementarySet(){
    this.setState({isloadding: true})
    let data = this.formRef.current?.getFieldValue()
    CardIssuingSubAction.SupplementarySet(data)
    .then(async (res) => {
      await this.GetInit(data.PersonalNum)
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: '300px',
          component: (
            <WS1846011_ConfirmScreen
            Li_StatusCode={''}
            Li_ResultContent={this.formRef.current?.getFieldValue('Timeout') <= 0 ? 'ﾀｲﾑｱｳﾄです。' : 'ｷｬﾝｾﾙされました。'}
              onFinishScreen={() => { 
                this.closeModal()
              }}
            />
          ),
        },
      })
    })
    .catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
        return;
      }
    }).finally(()=>this.setState({isloadding:false})) 
  }
  render() {
    return (
      <div className="card-issuing-sub">
        <Card title="カード発行SUB">
          <Spin spinning={this.state.isloadding}>
            <Form
              ref={this.formRef} 
              layout="vertical" autoComplete="off"
            >
              <div hidden>
              <Form.Item name="Timeout"><Input/></Form.Item>
              </div>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="PersonalNum" >
                    <Input.Search onSearch={() => this.ShowWS0248001_PersonalInfoSearchQuery()} readOnly />
                  </Form.Item>
                </Col>
                <Col span={13} offset={2} >
                <Space>
                  <Form.Item>
                    <img src={this.formRef.current?.getFieldValue("Expression_47") ? this.formRef.current?.getFieldValue("Expression_47") === '男性.png' ?man_img:woman_img : ""} width={'55%'} />
                  </Form.Item>
                  <Form.Item >
                    <span >{this.formRef.current?.getFieldValue("birthday_on")}</span>
                  </Form.Item>
                  <Form.Item   style={{ display:this.formRef.current?.getFieldValue("Expression_33")? "":'none',
                     background: '#FAFAC8' , border: '1px solid rgba(0, 0, 0, 0.06)', padding:'0 0.5em 0 0.5em' }} >
                    <span>{this.formRef.current?.getFieldValue("Expression_33")}</span>
                  </Form.Item>
                </Space>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item  style={{marginBottom:'0px'}}>&ensp; {this.formRef.current?.getFieldValue("kana_name")}</Form.Item>
                  <Form.Item name="KanaName" >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item  style={{marginBottom:'0px'}}>&ensp; {this.formRef.current?.getFieldValue("kanji_name")}</Form.Item>
                  <Form.Item name="KanjiName" >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item >
                <Button type="primary" style={{ float: "right" }} onClick={()=>this.SupplementarySet()} >発行</Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1846001_CardIssuingSub);
