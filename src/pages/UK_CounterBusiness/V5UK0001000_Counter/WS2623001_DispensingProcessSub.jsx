import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import { Card, Form, Button, Row, Col, Modal, DatePicker } from "antd";
import WS2623007_SplitPayment from 'pages/UK_CounterBusiness/V5UK0001000_Counter/WS2623007_SplitPayment.jsx';
import moment from 'moment';
import { PropTypes } from "prop-types";
import DispensingProcessSubAction from "redux/CounterBusiness/Counter/DispensingProcessSub.action";
import  ModalDraggable  from "components/Commons/ModalDraggable";

const formatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

class WS2623001_DispensingProcessSub extends React.Component {
  formRef = React.createRef();
  typeProps = {
    onClick: PropTypes.any
  }
  constructor(props) {
    super(props);

    // document.title = '出金処理SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initialValues: {}
    };
  }
  componentDidUpdate = (prevProps) => {
    if (this.props != prevProps) {
      const params = {
        Li_ReserveNum: this.props.Li_ReserveNum,
        sts1: this.props.sts1,
        sts2: this.props.sts2,
        sts3: this.props.sts3
      }
      DispensingProcessSubAction.getScreenData(params).then(res => {
        this.setState({ initialValues: res })
      })
    }
  }
  componentDidMount = () => {
    const params = {
      Li_ReserveNum: this.props.Li_ReserveNum,
    }
    DispensingProcessSubAction.getScreenData(params).then(res => {

      this.setState({ initialValues: res })
    })
  }
  convert = (params) => {
    return !params ? '0' : '1'
  };
  onFinish = (values) => {
    this.confirmF12(values)
  }
  confirmF12(values) {
    const convertNum = (params) => {
      return !params ? 0 : 1
    };
    const params = {
      PayType: !this.isEmpty(this.state.initialValues.PayType) ? this.state.initialValues.PayType : 1,
      WithdrawalDateChar: moment(values?.WithdrawalDateChar).format('YYYY/MM/DD'),
      BillingManageNum: !this.isEmpty(this.state.initialValues.BillingManageNum) ? this.state.initialValues.BillingManageNum : 0,
      CardCompanyName: !this.isEmpty(this.state.initialValues.CardCompanyName) ? this.state.initialValues.CardCompanyName : "",
      StsAnotherDay1: !this.isEmpty(this.state.initialValues.StsAnotherDay1) ? convertNum(this.state.initialValues.StsAnotherDay1) : 0,
      StsAnotherDate2: !this.isEmpty(this.state.initialValues.StsAnotherDate2) ? convertNum(this.state.initialValues.StsAnotherDate2) : 0,
      StsAnotherDate3: !this.isEmpty(this.state.initialValues.StsAnotherDate3) ? convertNum(this.state.initialValues.StsAnotherDate3) : 0,
    }
    DispensingProcessSubAction.confirmF12(params).then(res => {
      this.props.onFinishScreen({ StsSend: true, nameScreen: 'WS2623001_DispensingProcessSub' })
    })
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      }
    ])
  }
  checkShowSplitPayment(value) {
    const { Personal1PayAlready, Person2PayAlready, Personal3PayAlready } = value
    const Personal1ClaimNum = Personal1PayAlready > 0 ? 1 : 0
    const Person2ClaimNum = Person2PayAlready > 0 ? 1 : 0
    const _3PersonClaimNum = Personal3PayAlready > 0 ? 1 : 0
    const checkShowScreen = (Personal1ClaimNum + Person2ClaimNum + _3PersonClaimNum) > 1
    return checkShowScreen ? true : false
  }
  render() {
    const value = this.state.initialValues;
    return (
      <div className="dispensing-process-sub">
        <Card title="出金処理SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              ...this.state.initialValues,
              WithdrawalDateChar: moment(this.state.initialValues?.WithdrawalDateChar)
            }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="入金額"
                  name="Expression_1"
                >
                  <span>{formatter(value?.Expression_1)}</span>
                </Form.Item>
              </Col>
              <Col span={12}>
                {this.checkShowSplitPayment(value) ?
                  <Form.Item
                  >
                    <Button type="primary" style={{ float: "right" }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 300,
                            component:
                              <WS2623007_SplitPayment
                                Lio_StsPerson1={value.StsAnotherDay1 ? 1 : 0}
                                Lio_StsPerson2={value.StsAnotherDate2 ? 1: 0}
                                Lio_StsPersonal3={value.StsAnotherDate3 ? 1 : 0}
                                Personal1PayAlready={value.Personal1PayAlready}
                                Person2PayAlready={value.Person2PayAlready}
                                Personal3PayAlready={value.Personal3PayAlready}
                                Personal1Claim={value.Personal1Claim}
                                Person2Claim={value.Person2Claim}
                                PersonClaim3={value.PersonClaim3}
                                onOk={(output) => {
                                  const Lio_StsPerson1 = output.Lio_StsPerson1
                                  const Lio_StsPerson2 = output.Lio_StsPerson2
                                  const Lio_StsPersonal3 = output.Lio_StsPersonal3
                                  const Personal1Claim = Lio_StsPerson1 == '1' ? Number(output.Personal1Claim) : 0;
                                  const Person2Claim = Lio_StsPerson2  == '1' ? Number(output.Person2Claim) : 0;
                                  const PersonClaim3 = Lio_StsPersonal3  == '1' ? Number(output.PersonClaim3) : 0;
                                  const OutAmount = (Personal1Claim + Person2Claim + PersonClaim3)
                                  const StsAnotherDay = {
                                    StsAnotherDay1: Lio_StsPerson1,
                                    StsAnotherDate2: Lio_StsPerson2, StsAnotherDate3: Lio_StsPersonal3
                                  }
                                  this.setState({ initialValues: { ...value, 
                                    OutAmount: OutAmount > 0 ? OutAmount : '', ...StsAnotherDay} })
                                  this.setFormFieldValue('Personal1Claim', this.convert(output.Lio_StsPerson1))
                                  this.setFormFieldValue('Person2Claim', this.convert(output.Lio_StsPerson2))
                                  this.setFormFieldValue('PersonClaim3', this.convert(output.Lio_StsPersonal3))
                                  this.setFormFieldValue('Personal1PayAlready', value.Personal1PayAlready.toString())
                                  this.setFormFieldValue('Person2PayAlready', value.Person2PayAlready.toString())
                                  this.setFormFieldValue('Personal3PayAlready', value.Personal3PayAlready.toString())
                                  this.setFormFieldValue('StsAnotherDay1', value.StsAnotherDay1)
                                  this.setFormFieldValue('StsAnotherDate2', value.StsAnotherDate2)
                                  this.setFormFieldValue('StsAnotherDate3', value.StsAnotherDate3)
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });
                                }}
                              />
                            ,
                          },
                        });
                      }}
                    >出金選択</Button>
                  </Form.Item> : null}

              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="入金日"
                >
                  <span>{value?.PayDay}</span>
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row gutter={24} className="mb-3">
              <Col span={12}>
                <Form.Item
                  label="種　別"
                >
                  <span style={{ marginRight: "55px" }}>{value?.Expression_14}</span> <span>{value?.CardCompanyName}</span>
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row gutter={24} className="mb-3">
              <Col span={12}>
                <Form.Item
                  label="出金額"
                  name="OutAmount"
                >
                  <span>{formatter(value?.OutAmount)}</span>
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row gutter={24} className="mb-3">
              <Col span={12}>
                <Form.Item
                  name="WithdrawalDateChar"
                  label="出金日"
                >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'YYYY/MM/DD'} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Button type="primary" htmlType="submit" style={{ float: "right" }}>確定</Button>
              </Col>
            </Row>
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2623001_DispensingProcessSub);
