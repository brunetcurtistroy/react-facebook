import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-duplicate-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from 'prop-types';

import { Card, Form, Input, InputNumber, Checkbox, Button, Row, Col, DatePicker, Modal } from "antd";
const grid = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const data = {
  StsGuideCmt: 1, GuideCmtF: 8, comment_content: 'V40MS2001_コメント内容',
  Expression_4: 1, Expression_5: 0, Expression_6: 0, Expression_21: 1,
  GuideCmtT: 3, StsStartDate: 0, StartDateFChar: moment('2019/08/09'), StartDateTChar: moment('2019/08/19'),
  StsSerialNum: 0, SerialNumF: 10, name: '<aMKKAK', SerialNumT: 12
}
class WS0493001_ConditionCopyingScreen extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_GuideCmt: PropTypes.any,
    Li_StartDate: PropTypes.any,
    Li_SerialNum: PropTypes.any,
    Li_StsStartDate: PropTypes.any,
    Li_StsGuideCmt: PropTypes.any,
    Li_StsSerialNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '条件式複写画面';

    this.state = {
    };
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  componentDidMount() {
    this.renderForm()
    this.checkEnabledBtn(data)
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.renderForm()
      this.checkEnabledBtn(data)
    }
  }
  renderForm() {
    const keys = Object.keys(data);
    const values = Object.values(data);
    keys.forEach((value, index) => {
      this.setFormFieldValue(`${value}`, values[index])
    })
  }
  checkEnabledBtn(value) {
    const enabledBtn =
      value?.StsGuideCmt == 1 ||
      value?.StsStartDate == 1 ||
      value?.StsSerialNum == 1;
    this.setFormFieldValue('Expression_21', enabledBtn ? 1 : 0);
  }
  runF12() {
    //api 
    // hard mess error
    this.ErorrMessage('ｺﾒﾝﾄｺｰﾄﾞを指定してください')
  }
  ErorrMessage(content) {
    Modal.error({ content: content })
  }
  onFinish = (values) => {
    // F12
    this.runF12()
  }

  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)
  checkExpression = (name) => this.formRef?.current?.getFieldValue(name) == 1 ? 0 : 1;
  onChangeCheckBox(event, expressionName, checkNameCheckBox){
    this.setFormFieldValue(expressionName, event.target.checked ? 1 : 0)
    this.setFormFieldValue('Expression_21', event.target.checked ? 1 : 0)
    if(this.getRawValue(expressionName) === 0) {
      switch(checkNameCheckBox) {
        // eslint-disable-next-line no-lone-blocks
        case 'StsGuideCmt': {
          this.setFormFieldValue('GuideCmtF', '')
          this.setFormFieldValue('comment_content', '')
          this.setFormFieldValue('GuideCmtT', '')
        } break;;
        case 'StsStartDate': {
          this.setFormFieldValue('StartDateFChar', '')
          this.setFormFieldValue('StartDateTChar', '')
        } break;
        case 'StsSerialNum': {
          this.setFormFieldValue('SerialNumF', '')
          this.setFormFieldValue('SerialNumT', '')
          this.setFormFieldValue('name', '')
        }
      }
    }
    this.forceUpdate()
  }
  card() {
    return (
      <Row gutter={24}>
        <Col span="5">
          <Form.Item></Form.Item>
          <Form.Item {...grid}
            name="StsGuideCmt"
            label=""
            valuePropName="checked"
            style={{marginBottom: '30px'}}
            >
            <Checkbox onChange={(e) => this.onChangeCheckBox(e, 'Expression_4', 'StsGuideCmt')}>
              {'コメント'}
            </Checkbox>
          </Form.Item>
          <Form.Item
            {...grid}
            name="StsStartDate"
            label=""
            valuePropName="checked"
          >
            <Checkbox onChange={(e) => this.onChangeCheckBox(e, 'Expression_5', 'StsStartDate')}>
              {'開始日'}
            </Checkbox>
          </Form.Item>
          <Form.Item
            {...grid}
            name="StsSerialNum"
            label=""
            valuePropName="checked"
          >
            <Checkbox onChange={(e) => this.onChangeCheckBox(e, 'Expression_6', 'StsSerialNum')}>
              {'連　　番'}
            </Checkbox>
          </Form.Item>
        </Col>
        <Col span="10">
          <Form.Item><span > 複写元</span></Form.Item>
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>
            <Form.Item width="100px" name="GuideCmtF" ><InputNumber disabled={this.checkExpression('Expression_4')} style={{ width: '100px' }} /></Form.Item>
            <Form.Item name="comment_content" ><Input readOnly style={{ border: 'none', width: '400px' }} /></Form.Item>
          </div>
          <Form.Item name="StartDateFChar">
            <VenusDatePickerCustom formRefDatePicker={this.formRef} disabled={this.checkExpression('Expression_5')} style={{ width: '135px' }} format={"YYYY/MM/DD"} />
          </Form.Item>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Form.Item name="SerialNumF" >
              <InputNumber disabled={this.checkExpression('Expression_6')} style={{ width: '135px' }} />
            </Form.Item>
            <Form.Item name="name" ><Input readOnly style={{ border: 'none', width: '400px' }} /></Form.Item>
          </div>

        </Col>
        <Col span="9">
          <Form.Item><span >  複写先</span></Form.Item>
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>
            <Form.Item width="100px" name="GuideCmtT" >
              <InputNumber disabled={this.checkExpression('Expression_4')} style={{ width: '100px' }} />
            </Form.Item>
            <Form.Item name="comment_content" >
              <Input readOnly style={{ border: 'none', width: '400px' }} />
            </Form.Item>
          </div>
          <Form.Item name="StartDateTChar">
            <VenusDatePickerCustom formRefDatePicker={this.formRef} disabled={this.checkExpression('Expression_5')} style={{ width: '135px' }} format={"YYYY/MM/DD"} />
          </Form.Item>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Form.Item name="SerialNumT" >
              <InputNumber disabled={this.checkExpression('Expression_6')} style={{ width: '135px' }} />
            </Form.Item>
            <Form.Item name="name" ><Input readOnly style={{ border: 'none', width: '400px' }} /></Form.Item>
          </div>
        </Col>
      </Row >)
  }
  render() {
    return (
      <div className="condition-copying-screen">
        <Card title="条件式複写画面">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            {this.card()}
            <Form.Item
              style={{ float: "right" }}>
              <Button htmlType="submit" disabled={this.checkExpression('Expression_21')} type="primary">実行</Button>
            </Form.Item>

          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0493001_ConditionCopyingScreen);
