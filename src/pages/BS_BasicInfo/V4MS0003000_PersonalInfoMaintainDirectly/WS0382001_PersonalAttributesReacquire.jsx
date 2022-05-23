import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Form, Input, Checkbox, Button, Row, Col, Modal, message, } from "antd";
import {
  reacquisitionPersonalAttributesReacquireAction, getScreenDataPersonalAttributesReacquireAction
} from "redux/basicInfo/PersonalInfoMaintain/PersonalAttributesReacquire.actions";
import Color from "constants/Color";
import moment from 'moment';

const editStyle = {
  formItemCheckbox: {
    textAlign: 'right'
  },
  input: {
    borderBottom: '1px solid #969393'
  },
  formItem: {
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black'
  },
  col: {
    colTop: {
      border: '1px solid black',
      borderBottom: 'none',
      paddingTop: '10px',
    },
    colBottom: {
      border: '1px solid black',
      borderTop: 'none',
    },
    colLeftRight: {
      border: '1px solid black',
      borderTop: 'none',
      borderBottom: 'none'
    }
  },
  spaceCol: {
    marginRight: '5px'
  }

}
const styleDivTitle = {
  background: '#1B64B5', 
  padding: '4px 6px', 
  color: '#FFFFFF', 
  display: 'inline-block'
}
class WS0382001_PersonalAttributesReacquire extends React.Component {
  static propTypes = {
    Li_User: PropTypes.any,
    Li_ReAcquireItems: PropTypes.any,
    Li_PatientNum: PropTypes.any,
    Lo_StsRun: PropTypes.any,
    Lo_KanaName: PropTypes.any,
    Lo_KanaName: PropTypes.any,
    Lo_KanjiName: PropTypes.any,
    Lo_KanjiName: PropTypes.any,
    Lo_Gender: PropTypes.any,
    Lo_DateBirth: PropTypes.any,
    Lo_OldKanaName: PropTypes.any,
    Lo_ZipCode: PropTypes.any,
    Lo_PhoneNum1Fixed: PropTypes.any,
    Lo_PhoneNum2Mobile: PropTypes.any,
    Lo_Address1: PropTypes.any,
    Lo_Address2: PropTypes.any,
    Lo_InsurerNum: PropTypes.any,
    Lo_InsuranceCardSymbol: PropTypes.any,
    Lo_InsuranceCardNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '個人属性再取得';

    this.state = {
      objInit: {},
      DateBirthTemp: ''
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    let params = {
      OptionUser: this.props.Li_User || '',
      OptionDataReAcquireItems: this.props.Li_ReAcquireItems || '',
      PersonalNum: this.props.Li_PatientNum || ''
    }
    this.loadInitData(params);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      let params = {
        OptionUser: this.props.Li_User || '',
        OptionDataReAcquireItems: this.props.Li_ReAcquireItems || '',
        PersonalNum: this.props.Li_PatientNum || ''
      }
      this.loadInitData(params);
    }
  }

  loadInitData = (params) => {
    getScreenDataPersonalAttributesReacquireAction(params)
      .then(res => {
        if (res) {
          if (res.data.message) {
            Modal.error({
              okText: 'OK',
              content: res.data.message || "エラーが発生しました",
              onOk: () => {
                if (this.props.onFinishScreen) this.props.onFinishScreen()
              }
            })
          } else {
            let data = {
              ...res.data,
              DateBirth: res.data?.DateBirth ? moment(res.data.DateBirth).format('NNy/MM/DD') : '',
              birthday_on: res.data?.birthday_on ? moment(res.data.birthday_on).format('NNy/MM/DD') : '',
            };
            this.setState({ objInit: data, DateBirthTemp: res.data.DateBirth });
            this.formRef?.current?.setFieldsValue(data);
          }
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  Reacquisition = (params) => {
    reacquisitionPersonalAttributesReacquireAction(params)
      .then(res => {
        let data = res.data;
        if (data) {
          if (this.props.onFinishScreen)
            this.props.onFinishScreen({
              Lo_StsRun: data.StsRun,
              Lo_KanaName: data.KanaName,
              Lo_KanaName1: data.KanaName_1,
              Lo_KanjiName: data.KanjiName,
              Lo_KanjiName1: data.KanjiName_1,
              Lo_Gender: data.Gender,
              Lo_DateBirth: data.DateOfBirthDate,
              Lo_OldKanaName: data.OldNameKana,
              Lo_ZipCode: data.ZipCode,
              Lo_PhoneNum1Fixed: data.HomeTel,
              Lo_PhoneNum2Mobile: data.MobileTel,
              Lo_Address1: data.Address1,
              Lo_Address2: data.Address2,
              Lo_InsurerNum: data.IdCooperationInsurerNum,
              Lo_InsuranceCardSymbol: data.IdCooperationInsuranceCardSymbol,
              Lo_InsuranceCardNum: data.IdCooperationInsuranceCardNum,
            })
        }

      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  renderInput = () => <Input readOnly bordered={false} style={editStyle.input} />

  renderCheckbox = (_name, title, name1, name2) => (
    <Form.Item name={_name} valuePropName='checked' style={editStyle.formItemCheckbox}>
      <Checkbox style={{
        fontWeight: 'bold',
        color: this.checkValueDiff(name1, name2)
          ? Color(169).Foreground
          : Color(163).Foreground
      }}
      >{title}</Checkbox>
    </Form.Item>
  )

  checkValueDiff = (name1, name2) => name1 !== name2 ? true : false

  onFinish(values) {
    let params = {
      ...values,
      StsKanaName: values.StsKanaName ? 1 : 0,
      StsKanjiName: values.StsKanjiName ? 1 : 0,
      StsGender: values.StsGender ? 1 : 0,
      StsDateBirth: values.StsDateBirth ? 1 : 0,
      StsZipCode: values.StsZipCode ? 1 : 0,
      StsPhoneNum1Fixed: values.StsPhoneNum1Fixed ? 1 : 0,
      StsPhoneNum2Mobile: values.StsPhoneNum2Mobile ? 1 : 0,
      StsAddress: values.StsAddress ? 1 : 0,
      StsHealthInfo: values.StsHealthInfo ? 1 : 0,
      DateBirth: moment(this.state.DateBirthTemp).format('YYYY/MM/DD'),
      Gender: values.Expression_16,
      InsuranceCardSymbol: '', 
      InsuranceCardNum: '',
    }
    this.Reacquisition(params);
  }

  render() {
    return (
      <div className="personal-attributes-reacquire">
        <Card title="個人属性再取得">
          <Form ref={this.formRef} onFinish={this.onFinish} style={{ padding: '10px' }}>
            <Row gutter={24}>
              <Col span={2}></Col>
              <Col span={10}>
                <Form.Item style={{ marginLeft: '-10px' }}>
                  <span style={styleDivTitle}>医事属性</span>
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={10}>
                <Form.Item style={{ marginLeft: '-10px' }}>
                  <span style={styleDivTitle}>健診属性</span>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={2} style={{ paddingTop: '10px' }}>
                {this.renderCheckbox('StsKanaName', 'カナ氏名', this.state.objInit.KanaName, this.state.objInit.kana_name)}
              </Col>
              <Col span={10} style={editStyle.col.colTop}>
                <Form.Item name='KanaName'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={10} style={editStyle.col.colTop}>
                <Form.Item name='kana_name'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={2}>
                {this.renderCheckbox('StsKanjiName', '漢字氏名', this.state.objInit.KanjiName, this.state.objInit.kanji_name)}
              </Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='KanjiName'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='kanji_name'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={2}>
                {this.renderCheckbox('StsGender', '性　　別', this.state.objInit.Expression_16, this.state.objInit.Expression_40)}
              </Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='Expression_16'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='Expression_40'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={2}>
                {this.renderCheckbox('StsDateBirth', '生年月日', this.state.objInit.DateBirth, this.state.objInit.birthday_on)}
              </Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='DateBirth'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='birthday_on'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={2}>
                {this.renderCheckbox('StsPhoneNum1Fixed', '自宅番号', this.state.objInit.PhoneNum1Fixed, this.state.objInit.phone_number)}
              </Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='PhoneNum1Fixed'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='phone_number'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={2}>
                {this.renderCheckbox('StsPhoneNum2Mobile', '携帯番号', this.state.objInit.PhoneNum2Mobile, this.state.objInit.cell_phone_number)}
              </Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='PhoneNum2Mobile'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='cell_phone_number'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={2}>
                {this.renderCheckbox('StsZipCode', '郵便番号', this.state.objInit.ZipCode, this.state.objInit.postal_code)}
              </Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='ZipCode'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='postal_code'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={2}>
                {this.renderCheckbox('StsAddress', '住　　所', this.state.objInit.Address1, this.state.objInit.Address2)}
              </Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='Address1'>
                  <Input bordered={false} readOnly />
                </Form.Item>
                <Form.Item name='Address2'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={10} style={editStyle.col.colLeftRight}>
                <Form.Item name='address_1'>
                  <Input bordered={false} readOnly />
                </Form.Item>
                <Form.Item name='address_2'>
                  {this.renderInput()}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={2}>
                <Form.Item name='StsHealthInfo' valuePropName='checked' style={editStyle.formItemCheckbox}>
                  <Checkbox style={{
                    fontWeight: 'bold',
                    color:
                      this.checkValueDiff(this.state.objInit.InsurerNum, this.state.objInit.insurer_number)
                        || this.checkValueDiff(this.state.objInit.Expression_61, this.state.objInit.Expression_60)
                        ? Color(169).Foreground
                        : Color(163).Foreground
                  }}
                  >保険情報</Checkbox>
                </Form.Item>
              </Col>
              <Col span={10} style={editStyle.col.colBottom}>
                <Row>
                  <Col span={8}>
                    <Form.Item name='InsurerNum'>
                      {this.renderInput()}
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item name='Expression_61'>
                      {this.renderInput()}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={1}></Col>
              <Col span={10} style={editStyle.col.colBottom}>
                <Row>
                  <Col span={8}>
                    <Form.Item name='insurer_number'>
                      {this.renderInput()}
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item name='Expression_60'>
                      {this.renderInput()}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={23}>
                <Form.Item className='mt-3' style={{ float: 'right', marginRight: '-10px' }}>
                  <Button type="primary" htmlType='submit'>再取得</Button>
                </Form.Item>
              </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0382001_PersonalAttributesReacquire);
