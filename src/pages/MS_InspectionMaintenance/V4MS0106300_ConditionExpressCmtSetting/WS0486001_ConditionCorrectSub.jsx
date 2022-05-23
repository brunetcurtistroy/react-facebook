import React from "react";
import { connect } from "react-redux";
import Color from "constants/Color";
import { Card, Form, Input, Button, Row, Col, Modal } from "antd";
import './WS0486001_ConditionCorrectSub.scss'
import PropTypes from "prop-types";
import WS0487001_ConditionExpressAddSub from 'pages/MS_InspectionMaintenance/V4MS0106300_ConditionExpressCmtSetting/WS0487001_ConditionExpressAddSub.jsx';
import WS0486002_Redisplay from 'pages/MS_InspectionMaintenance/V4MS0106300_ConditionExpressCmtSetting/WS0486002_Redisplay.jsx'
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0486001_ConditionCorrectSub extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Lio_ConditionalExpression: PropTypes.any,
    onFinishScreen: PropTypes.func
  };

  constructor(props) {
    super(props);

    // document.title = '条件式訂正SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)

  onFinish(values) {

  }
  onChangeConditionalExpression(value) {
    this.setFormFieldValue('ConditionalExpression', value)
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  showWS0487001_ConditionExpressAddSub() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS0487001_ConditionExpressAddSub
            onFinishScreen={({ output }) => {
              // truyen Lo setting tu Output vao day
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  ConditionalExpressionDisplaySub() {
    // hard code 
    const ConditionalExpression = this.getRawValue('ConditionalExpression')
    if (ConditionalExpression && ConditionalExpression.length > 0) {
      // eslint-disable-next-line default-case
      switch (ConditionalExpression) {
        case 'AND': return '∩';
        case 'OR': return '∪';
        case 'NOT': return 'NOT';
        case '+': return '＋';
        case '-': return '－';
        case '*': return '×';
        case '/': return '÷';
        default: return ConditionalExpression;
      }
    } else {
      return ConditionalExpression
    }


  }
  showWS0486002_Redisplay() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0486002_Redisplay
            Li_ConditionalExpression = {this.ConditionalExpressionDisplaySub()}
            onFinishScreen={({ output }) => {
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  Redisplay_F11() {
    // check dieu 
    const ConditionalExpression = this.getRawValue('ConditionalExpression')
    if (ConditionalExpression && ConditionalExpression.length > 0) {
      Modal.error({
        title: 'ｴﾗｰ',
        content: '条件式を確認してください。\n 検査ﾀｲﾌﾟが[X]の場合は、変数をｼﾝｸﾞﾙｺｰﾃｰｼｮﾝで囲ってください。',
        onOk: () => this.showWS0486002_Redisplay()
      })
    } else {
      this.showWS0486002_Redisplay()
    }
  }
  onSubmit() {
    const {onFinishScreen} = this.props
    if(onFinishScreen) {
      onFinishScreen({})
    }
  }
  render() {
    const Expression_30 = this.getRawValue('Expression_30')
    const Expression_31 = this.getRawValue('Expression_31')
    const Expression_32 = this.getRawValue('Expression_32')
    const Expression_33 = this.getRawValue('Expression_33')
    const Expression_34 = this.getRawValue('Expression_34')
    const Expression_35 = this.getRawValue('Expression_35')
    const Expression_36 = this.getRawValue('Expression_36')
    return (
      <div className="condition-correct-sub">
        <Card title="条件式訂正SUB">

          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button  readOnly style={{ width: '60px', textAlign: 'center', background: Color(300).Background }}>論理</Button>
              <Button className="primaryWS486001" onClick={() => this.onChangeConditionalExpression('AND')}  style={{ width: '60px', textAlign: 'center', background: Color(Expression_34)?.Background }}>かつ</Button>
              <Button className="primaryWS486001" onClick={() => this.onChangeConditionalExpression('OR')}  style={{ width: '60px', textAlign: 'center', background: Color(Expression_35)?.Background }}>または</Button>
              <Button className="primaryWS486001" onClick={() => this.onChangeConditionalExpression('NOT')} style={{ width: '60px', textAlign: 'center', background: Color(Expression_36)?.Background }}>否定</Button>
              <Button readOnly style={{ width: '60px', textAlign: 'center', background: Color(300).Background }}>計算</Button>
              <Button className="primaryWS486001" onClick={() => this.onChangeConditionalExpression('+')}  style={{ width: '30px', textAlign: 'center', background: Color(Expression_30)?.Background }}>＋</Button>
              <Button className="primaryWS486001" onClick={() => this.onChangeConditionalExpression('-')}  style={{ width: '30px', textAlign: 'center', background: Color(Expression_31)?.Background }}>―</Button>
              <Button className="primaryWS486001" onClick={() => this.onChangeConditionalExpression('*')}  style={{ width: '30px', textAlign: 'center', background: Color(Expression_32)?.Background }}>X</Button>
              <Button className="primaryWS486001" onClick={() => this.onChangeConditionalExpression('/')}  style={{ width: '30px', textAlign: 'center', background: Color(Expression_33)?.Background }}>÷</Button>

            </div>
            <Form.Item
              name="ConditionalExpression"
              label=""
            >
              <Input.TextArea rows={10} type="text" />
            </Form.Item>
            <Row gutter={24}>
              <Col span={21}></Col>
              <Col span={1}>
                <Form.Item >
                  <Button className="btn btn-primary" onClick={() => this.showWS0487001_ConditionExpressAddSub()}>追　加</Button>
                </Form.Item>
              </Col>
              <Col span={1}>
                <Form.Item>
                  <Button className="btn btn-primary" onClick={() => this.Redisplay_F11()}>再表示</Button>
                </Form.Item>
              </Col>
              <Col span={1}>

                <Form.Item >
                  <Button className="btn btn-primary" onClick={() => this.onSubmit() }>更新</Button>
                </Form.Item>
              </Col>
            </Row>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0486001_ConditionCorrectSub);
