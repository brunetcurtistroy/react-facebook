import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Row, Col, InputNumber, message } from "antd";
import {
  getScreenDataAcquireSettingSubAction, enterCAcquireSettingSubAction, updateBtnAcquireSettingSubAction
} from "redux/CooperationRelated/PatientInfoCaptureScreen/AcquireSettingSub.actions";

const styleColor = {
  background: '#808080', color: '#FFFFFF'
}

const styleDiv = {
  float: 'left'
}

const layoutFirst = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
class WS2725001_AcquireSettingSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '取込形式設定SUB';

    this.state = {
      Format: ''
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.loadInitData();
  }

  loadInitData = () => {
    getScreenDataAcquireSettingSubAction()
      .then(res => {
        if (res) {
          this.setState({ Format: res.data.Format });
          this.formRef?.current?.setFieldsValue(res.data);
        }
      })
      .catch()
  }

  EnterC = (e) => {
    let values = this.formRef?.current?.getFieldValue();
    if (values.Format !== this.state.Format) {
      this.setState({ Format: e.target.value });
      enterCAcquireSettingSubAction(values)
        .then(res => {
          if (res) {
            this.setState({ Format: res.data.Format });
            this.formRef?.current?.setFieldsValue(res.data);
          }
        })
        .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
    }
  }

  UpdateBtn = (params) => {
    updateBtnAcquireSettingSubAction(params)
      .then()
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  returnButton = (label) => <Button style={styleColor}>{label}</Button>

  returnDiv = (label) => <div style={styleDiv}><Button type="primary">{label}</Button></div>

  returnInputNumber = () => <InputNumber min={0} maxLength={5} />

  onFinish = (values) => {
    this.UpdateBtn(values);
  }

  render() {
    return (
      <div className="acquire-setting-sub">
        <Card title="取込形式設定SUB">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{ Separated: 'CSV形式' }}>
            <Row>
              <Col span={5}>
                {this.returnDiv('FORMAT')}
                <Form.Item name="Format">
                  <Input onBlur={this.EnterC} />
                </Form.Item>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col span={5}>
                {this.returnDiv('形　　式')}
                <Form.Item name='Separated' >
                  <Select>
                    <Select.Option value="FIX">固定</Select.Option>
                    <Select.Option value="C1">CSV形式</Select.Option>
                    <Select.Option value="C2">CSV形式("あり)</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col span={18} >
                {this.returnDiv('患者番号')}
                <Form.Item name="PositionPatientNum" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsPatientNum" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18} >
                {this.returnDiv('カナ氏名')}
                <Form.Item name="PositionKanaName" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsKanaName" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18} >
                {this.returnDiv('漢字氏名')}
                <Form.Item name="PositionChineseName" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsChineseName" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18}  >
                {this.returnDiv('性　　別')}
                <Form.Item name="PositionGender" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsGender" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="MenGender" style={styleDiv} {...layoutFirst} label={this.returnButton('男性')}>
                  <Input maxLength={10} />
                </Form.Item>
                <Form.Item name="WomenGender" style={styleDiv} {...layoutFirst} label={this.returnButton('女性')}>
                  <Input maxLength={10} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18}  >
                {this.returnDiv('生年月日')}
                <Form.Item name="PositionDateBirth" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsDateBirth" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="FormatDateBirth" style={styleDiv} {...layoutFirst} label={this.returnButton('書式')}>
                  <Input maxLength={30} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18}  >
                {this.returnDiv('郵便番号')}
                <Form.Item name="PositionZip" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsZip" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="FormatZip" style={styleDiv} {...layoutFirst} label={this.returnButton('書式')}>
                  <Input maxLength={30} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18} >
                {this.returnDiv('住　　所')}
                <Form.Item name="PositionAddress1" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsAddress1" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18}  >
                <div style={styleDiv}> <Button type="text">　　　　</Button> </div>
                <Form.Item name="PositionAddress2" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsAddress2" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18}  >
                <div style={styleDiv}> <Button type="text">　　　　</Button> </div>
                <Form.Item name="PositionAddress3" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsAddress3" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18}  >
                {this.returnDiv('電話番号')}
                <Form.Item name="PositionPhoneNum" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsPhoneNum" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18}  >
                {this.returnDiv('携帯電話')}
                <Form.Item name="PositionMobileNum" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsMobileNum" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18} >
                {this.returnDiv('続　　柄')}
                <Form.Item name="PositionRelationship" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsRelationship" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18}>
                {this.returnDiv('処理区分')}
                <Form.Item name="PositionProcessClassify" style={styleDiv} {...layoutFirst} label={this.returnButton('位置')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="NumDigitsProcessClassify" style={styleDiv} {...layoutFirst} label={this.returnButton('桁数')}>
                  {this.returnInputNumber()}
                </Form.Item>
                <Form.Item name="AddProcessClassify" style={styleDiv} {...layoutFirst} label={this.returnButton('追加')}>
                  <Input maxLength={10} />
                </Form.Item>
                <Form.Item name="ChangeProcessClassify" style={styleDiv} {...layoutFirst} label={this.returnButton('変更')}>
                  <Input maxLength={10} />
                </Form.Item>
                <Form.Item name="DeleteProcessClassify" style={styleDiv} {...layoutFirst} label={this.returnButton('削除')}>
                  <Input maxLength={10} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={18}>
                <Button type="primary" htmlType='submit' style={{ float: 'right', marginRight: '15px' }}
                  disabled={!this.state.Format}
                >更新</Button></Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2725001_AcquireSettingSub);
