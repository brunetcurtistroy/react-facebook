import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { connect } from "react-redux";
import PaymentProcessSubAction from "redux/CounterBusiness/Counter/PaymentProcessSub.action";
import { Card, Form, Input, Button, Select, Row, Col, Modal, message, DatePicker, InputNumber } from "antd";
import WS2621008_SplitPayment from 'pages/UK_CounterBusiness/V5UK0001000_Counter/WS2621008_SplitPayment.jsx';
import { PropTypes } from "prop-types";
import WS2622003_ReceiptProcessSub from 'pages/UK_CounterBusiness/V5UK0001000_Counter/WS2622003_ReceiptProcessSub.jsx';
import { CloseCircleOutlined } from "@ant-design/icons";
import moment from 'moment';
import ReceiptProcessSubAction from "redux/CounterBusiness/Counter/ReceiptProcessSub.action";
import { CancelModalByClassNameFunc } from "components/Commons/CancelModal.Func"
const smGrid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const parser = value => value.replace(/\$\s?|(,*)/g, '')
class WS2621001_PaymentProcessSub extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = '入金処理SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initialValues: {}
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadData(this.props.Li_ReserveNum)
    }
  }
  componentDidMount() {
    this.loadData(this.props.Li_ReserveNum)
  }
  loadData(params) {
    PaymentProcessSubAction.getScreenData({ Li_ReserveNum: params, }).then(res => {
      if (res) {
        const data = res?.data;
        const obj = { Linked: '', Display: '' }
        const card = data.Card
        card.unshift(obj)
        this.setState({ initialValues: { ...data, Card: card } })
        this.renderForm()
      }

    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
      message.error(res.data.message);
    })
  }
  renderForm() {
    const value = this.state.initialValues
    this.setFormFieldValue('DepositAmount', value?.DepositAmount)
    this.setFormFieldValue('AmountBilled', value?.AmountBilled)
    this.setFormFieldValue('PayType', value?.PayType)
    this.setFormFieldValue('PayDay', value?.PayDay)
    this.setFormFieldValue('Expression_6', 0)
  }
  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  payDateCharChange = () => {
    const params = {
      PayDateChar: moment(this.formRef.current.getFieldValue('PayDateChar')).format('YYYY/MM/DD'),
      PayDay: this.state?.initialValues.PayDay,
      StsDateConvert: this.state?.initialValues.StsDateConvert
    }
    PaymentProcessSubAction.payDateCharChange(params).then(res => {
      if (res && res.data) {
        this.setFormFieldValue('PayDay', res.PayDay)
      }
    })
  }
  checkWidthInWS2622003(props, res) {
    const params = {
      Li_ReserveNum: res.Li_ReserveNum,
      Li_SpecifiedIdentify: res.Li_SpecifiedIdentify
    }
    ReceiptProcessSubAction.getScreenData(params).then(item => {
      if (item) {
        const value = this.state.initialValues;
        const width25 = item.sts1 > 0 && item.sts2 === 0 && item.sts3 === 0 ? '25%' : null
        const width50 = item.sts1 > 0 && (item.sts2 > 0 || item.sts3 > 0) ? '50%' : null
        const width80 = item.sts1 > 0 && item.sts2 > 0 && item.sts3 > 0 ? '80%' : null
        const width = width25 ? width25 : (width50 ? width50 : (width80 ? width80 : ''))
        if (res && res.message == 'WS2622003_ReceiptProcessSub') {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: width,
              component: <WS2622003_ReceiptProcessSub
                Li_ReserveNum={res.Li_ReserveNum}
                Li_SpecifiedIdentify={res.Li_SpecifiedIdentify}
                Li_Sts1={this.convertBoleanToNum(value.StsAnotherDay1)}
                Li_Sts2={this.convertBoleanToNum(value.StsAnotherDate2)}
                Li_Sts3={this.convertBoleanToNum(value.StsAnotherDate3)}
                onFinishScreen={(output) => {
                  if (output.StsSend) {
                    this.props.onFinishScreen({
                      Li_ReserveNum: this.props.Li_ReserveNum,
                      Li_PersonalNumId: item.PersonalNum,
                      Date: item.Date,
                      _Li_AcceptNum: item.AcceptNum,
                      nameScreen: 'WS2622003_ReceiptProcessSub',
                    });
                    this.props.onFinishScreen({
                      StsSend: true, nameScreen: 'WS2621001_PaymentProcessSub'
                    })
                  }
                  this.closeModal()
                }}
              />
            }
          })
        } else {
          this.props.onFinishScreen({
            StsSend: true, nameScreen: 'WS2621001_PaymentProcessSub'
          })
          this.closeModal()
        }
      }
    })
  }
  convertBoleanToNum = (input) => input ? 1 : 0
  onFinish = (values) => {
    const item = this.state.initialValues;
    const value = this.formRef?.current?.getFieldValue()
    const params = {
      PayDay: values.PayDay ? values.PayDay : value.PayDay,
      AmountBilled: value.AmountBilled,
      DepositAmount: value.DepositAmount,
      ReceiptAmount: item.ReceiptAmount,
      Otsuri: item.Otsuri,
      PayManageNum: item.PayManageNum,
      StsAnotherDay1: this.convertBoleanToNum(item.StsAnotherDay1),
      Li_ReserveNum: item.Li_ReserveNum,
      BillingManageNum: item.BillingManageNum,
      PayType: values.PayType,
      Card: values.Card ? values.Card : '',
      RegisterClassify: item.RegisterClassify,
      Date: item.Date,
      StsPreReceipt: this.convertBoleanToNum(item.StsPreReceipt),
      ReceiptDateInitialValue: item.ReceiptDateInitialValue,
      StsAnotherDate2: this.convertBoleanToNum(item.StsAnotherDate2),
      StsAnotherDate3: this.convertBoleanToNum(item.StsAnotherDate3),
    }

    PaymentProcessSubAction.confirmF12(params).then(res => {
      // sau khi ấn confirm => res susscess => hiện màn hình WS2622003;
      this.checkWidthInWS2622003(this.props, res.data)

    }).catch(error => {
      Modal.error({
        content: '受取額が不足しています',
        okText: "はい",
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      })
    })

  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    })
  }
  checkShowSplitPayment(value) {
    const {
      Personal1Claim, Personal1PayAlready,
      Person2Claim, Person2PayAlready,
      _3PersonClaim, Personal3PayAlready } = value
    const Personal1ClaimNum = Personal1Claim > 0 && Personal1PayAlready === 0 ? 1 : 0
    const Person2ClaimNum = Person2Claim > 0 && Person2PayAlready === 0 ? 1 : 0
    const _3PersonClaimNum = _3PersonClaim > 0 && Personal3PayAlready === 0 ? 1 : 0
    const checkShowScreen = (Personal1ClaimNum + Person2ClaimNum + _3PersonClaimNum) > 1
    return checkShowScreen ? true : false
  }
  render() {
    // const {Card, DepositAmount, PayType} = ;
    const value = this.state.initialValues;
    let CardList = this.state.initialValues.Card
    return (
      <div className="payment-process-sub">
        <Card title="入金処理SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              ...this.state.initialValues,
              PayType: 1,
              PayDateChar: moment(this.state.initialValues?.PayDateChar)
            }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  style={{ textAlign: "right"}} 
                  name=""
                  label="請求額"
                  {...smGrid}
                >
                  <span>{formatter(this.state.initialValues?.DepositAmount) ? formatter(this.state.initialValues?.DepositAmount) : 0}</span>
                </Form.Item>
              </Col>
              <Col span={12}>
                {this.checkShowSplitPayment(value) ? <Form.Item
                >
                  <Button type="primary" style={{ float: "right" }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 300,
                          component:
                            <WS2621008_SplitPayment
                              Lio_StsPerson1={this.convertBoleanToNum(value.StsAnotherDay1)}
                              Lio_StsPerson2={this.convertBoleanToNum(value.StsAnotherDate2)}
                              Lio_StsPersonal3={this.convertBoleanToNum(value.StsAnotherDate3)}
                              Personal1PayAlready={value.Personal1PayAlready}
                              Person2PayAlready={value.Person2PayAlready}
                              Personal3PayAlready={value.Personal3PayAlready}
                              Personal1Claim={value.Personal1Claim}
                              Person2Claim={value.Person2Claim}
                              Person3Claim={value._3PersonClaim}
                              AmountBilled={value.AmountBilled}
                              DepositAmount={value.DepositAmount}
                              onOk={(output) => {
                                this.setState({
                                  initialValues: {
                                    ...this.state.initialValues,
                                    StsAnotherDate3: output.StsAnotherDate3,
                                    StsAnotherDate2: output.StsAnotherDate2,
                                    StsAnotherDay1: output.StsAnotherDay1,
                                    DepositAmount: output.DepositAmount,
                                  }
                                })
                                this.setFormFieldValue('AmountBilled', output && output?.AmountBilled)
                                this.setFormFieldValue('DepositAmount', output && output?.DepositAmount)
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
                  >分割入金</Button>
                </Form.Item> : null}

              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="PayType"
                  label="支　払"
                  {...smGrid}
                >
                  <Select onChange={(event) => this.setState({
                    initialValues: {
                      ...this.state.initialValues, PayType: event
                    }
                  })}>
                    <Select.Option value={1}>現金</Select.Option>
                    <Select.Option value={2}>クレジット</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Card"
                  label="会　社"
                  {...smGrid}
                >
                  <Select disabled={this.state.initialValues.PayType === 1 ? true : false}>
                    {CardList?.map((item, index) => (
                      <Select.Option key={index} value={item.Linked}>{item.Display}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="DepositAmount"
                  label="受取額"
                  {...smGrid}
                >
                  <InputNumber style={{ textAlign: "right", float: 'right', }}
                    formatter={formatter}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onBlur={(event) => {
                      const DepositAmount = this.state.initialValues?.DepositAmount;
                      const input = parser(event.target.value);
                      this.setFormFieldValue('Expression_6', formatter(input - DepositAmount))
                    }} disabled={this.state.initialValues.PayType === 2 ? true : false} />

                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Expression_6"
                  label="釣　銭"
                  {...smGrid}
                >
                  <Input style={{ textAlign: 'right' }}
                    readOnly disabled={this.state.initialValues.PayType === 2 ? true : false} />

                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="PayDateChar"
                  label="入金日"
                  {...smGrid}
                >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'YYYY/MM/DD'} onBlur={this.payDateCharChange} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row span={24} className="mb-3">
              <Col span={24}>
                <Button type="primary" htmlType="submit" style={{ float: "right", marginRight: "10px" }}>確定</Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          onCancel={(output) => {
            CancelModalByClassNameFunc(output, 'receipt-process-sub', () => {
              this.props.onFinishScreen({
                StsSend: true, nameScreen: 'WS2621001_PaymentProcessSub'
              })
            })

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2621001_PaymentProcessSub);
