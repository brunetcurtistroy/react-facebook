/* eslint-disable eqeqeq */
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Select, Button, Row, Space, message, Spin, Modal } from "antd";
import ApplicationInfoRegisterAction from 'redux/ReservationBusiness/PersonalReserveProcess/ApplicationInfoRegister.actions'
import moment from "moment";
import WS0343001_PersonalInfoMaintain from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0343001_PersonalInfoMaintain";
import ModalDraggable from "components/Commons/ModalDraggable";
const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 22 },
};
class WS2543001_ApplicationInfoRegister extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_Data: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.KanaName = React.createRef();
    // document.title = '申込情報登録';

    this.state = {
      isLoaddingFrm: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      KanaName: ''
    };
  }

  componentDidMount() {
    this.KanaName?.current?.focus();
    this.formRef.current?.setFieldsValue(this.props.Li_Data)
    this.GetScreenData()
  }

  componentDidUpdate(PreV) {
    if (this.props !== PreV) {
      this.formRef.current?.setFieldsValue(this.props.Li_Data)
      this.GetScreenData()
    }
  }

  GetScreenData() {
    this.setState({ isLoaddingFrm: true })
    ApplicationInfoRegisterAction.GetScreenData({ Li_ReserveNum: this.isEmpty(this.props?.Li_ReserveNum) ? "" : this.props.Li_ReserveNum }).then(res => {
      this.formRef.current?.setFieldsValue({
        RelationshipList: res.RelationshipList
      })
      this.setState({
        KanaName: this.formRef.current?.getFieldValue("KanaName")
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoaddingFrm: false }))
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  PersonalRegister() {
    let data = {
      Li_ReserveNum: this.isEmpty(this.props?.Li_ReserveNum) ? 0 : this.props.Li_ReserveNum,
      Li_PersonalNum: this.isEmpty(this.props?.Li_PersonalNum) ? 0 : this.props.Li_PersonalNum,
      KanaName: this.isEmpty(this.formRef.current?.getFieldValue("KanaName")) ? "" : this.formRef.current?.getFieldValue("KanaName"),
      KanjiName: this.isEmpty(this.formRef.current?.getFieldValue("KanjiName")) ? "" : this.formRef.current?.getFieldValue("KanjiName"),
      Gender: this.isEmpty(this.formRef.current?.getFieldValue("Gender")) ? "" : this.formRef.current?.getFieldValue("Gender"),
      Relationship: this.isEmpty(this.formRef.current?.getFieldValue("Relationship")) ? "" : this.formRef.current?.getFieldValue("Relationship"),
      BirthDateDate: this.isEmpty(this.formRef.current?.getFieldValue("DateBirthChar")) ? "" : moment(this.formRef.current?.getFieldValue("DateBirthChar")).format('YYYY/MM/DD'),
      HomePhoneNum: this.isEmpty(this.formRef.current?.getFieldValue("HomePhoneNum")) ? "" : this.formRef.current?.getFieldValue("HomePhoneNum"),
      MobilePhoneNum: this.isEmpty(this.formRef.current?.getFieldValue("MobilePhoneNum")) ? "" : this.formRef.current?.getFieldValue("MobilePhoneNum"),
    }

    this.setState({ isLoaddingFrm: true })
    ApplicationInfoRegisterAction.PersonalRegister(data)
      .then(res => {
        let PersonalNumId = res?.data?.PersonalNumId
        let Li_AttributeInfo = res?.data.Li_AttributeInfo
        this.showModalPersonalInfoMaintain_WS0343001(PersonalNumId, Li_AttributeInfo)
      })
      .catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoaddingFrm: false }))
  }

  Write() {
    let data = {
      Li_ReserveNum: this.isEmpty(this.props?.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
      KanaName: this.isEmpty(this.formRef.current?.getFieldValue("KanaName")) ? "" : this.formRef.current?.getFieldValue("KanaName"),
      KanjiName: this.isEmpty(this.formRef.current?.getFieldValue("KanjiName")) ? "" : this.formRef.current?.getFieldValue("KanjiName"),
      Gender: this.isEmpty(this.formRef.current?.getFieldValue("Gender")) ? "" : this.formRef.current?.getFieldValue("Gender"),
      Relationship: this.isEmpty(this.formRef.current?.getFieldValue("Relationship")) ? "" : this.formRef.current?.getFieldValue("Relationship"),
      BirthDateDate: this.isEmpty(this.formRef.current?.getFieldValue("DateBirthChar")) ? "" : moment(this.formRef.current?.getFieldValue("DateBirthChar")).format('YYYY/MM/DD'),
      HomePhoneNum: this.isEmpty(this.formRef.current?.getFieldValue("HomePhoneNum")) ? "" : this.formRef.current?.getFieldValue("HomePhoneNum"),
      MobilePhoneNum: this.isEmpty(this.formRef.current?.getFieldValue("MobilePhoneNum")) ? "" : this.formRef.current?.getFieldValue("MobilePhoneNum"),
    }

    this.setState({ isLoaddingFrm: true })
    ApplicationInfoRegisterAction.Write(data)
      .then(res => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            data: this.formRef.current?.getFieldValue()
          })
        }
      })
      .catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoaddingFrm: false }))
  }

  showModalPersonalInfoMaintain_WS0343001(PersonalNumId, Li_AttributeInfo) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component:
          <WS0343001_PersonalInfoMaintain
            Li_PersonalNum={PersonalNumId}
            Li_AttributeInfo={Li_AttributeInfo}
            onFinishScreen={(output) => {

              this.closeModal()
            }}
          />
      }
    })
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="application-info-register">
        <Card title="申込情報登録">
          <Spin spinning={this.state.isLoaddingFrm} >
            <Form {...grid} autoComplete="off"
              ref={this.formRef}
              className="mb-3"
            >
              <Form.Item name="KanaName" label="カナ氏名">
                <Input maxLength={40} ref={this.KanaName}
                  onBlur={(e) => {
                    let val = e.target.value;
                    if (val.length < 1) {
                      this.KanaName?.current?.focus()
                      message.error("力ナ氏名を入力してください")
                    } else {
                      this.formRef.current?.setFieldsValue({
                        KanjiName: val
                      })
                      this.setState({
                        KanaName: val
                      })
                    }
                  }}
                />
              </Form.Item>
              <Form.Item name="KanjiName" label="漢字氏名" >
                <Input maxLength={40} />
              </Form.Item>
              <Form.Item name="Gender" label="性別" >
                <Select style={{ width: "50%" }}>
                  <Select.Option value={0}>&ensp;</Select.Option>
                  <Select.Option value={1}>男</Select.Option>
                  <Select.Option value={2}>女</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="DateBirthChar" label="生年月日" >
                <VenusDatePickerCustom formRefDatePicker={this.formRef} format='NNy/MM/DD' />
              </Form.Item>
              <Form.Item name="HomePhoneNum" label="自宅電話" >
                <Input maxLength={20} />
              </Form.Item>
              <Form.Item
                name="MobilePhoneNum"
                label="携帯電話"
              >
                <Input maxLength={20} />
              </Form.Item>
              <Form.Item name="Relationship" label="続柄" >
                <Select style={{ width: "60%" }}>
                  <Select.Option value=""></Select.Option>
                  {this.formRef.current?.getFieldValue("RelationshipList")?.map(value => (
                    <Select.Option key={"Relationship-" + Math.random()} value={value.LinkedField}>{value.DisplayField}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
            <Row style={{ float: 'right', marginTop: '1em' }}>
              <Space >
                <Button type="primary" style={{ float: "right", display: this.props.Li_ReserveNum > 0 ? "" : "none" }}
                  disabled={!this.state.KanaName}
                  onClick={() => this.PersonalRegister()} >
                  登録
                </Button>
                <Button type="primary" style={{ float: "right" }}
                  disabled={!this.state.KanaName}
                  onClick={() => this.Write()} >
                  確定
                </Button>
              </Space>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2543001_ApplicationInfoRegister);
