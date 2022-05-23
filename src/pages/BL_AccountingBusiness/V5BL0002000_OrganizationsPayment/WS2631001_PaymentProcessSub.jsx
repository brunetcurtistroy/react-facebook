import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Select,
  Space,
  Button,
  Modal,
  Spin,
} from "antd";
import WS0061012_CheckYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061012_CheckYes";
import WS0946006_ReceiptIssueOnline from "../SMIYA0502_ReceiptPreIssue20/WS0946006_ReceiptIssueOnline";
import moment from "moment";
import PaymentProcessSubAction from "redux/AccountingBusiness/OrganizationsPayment/PaymentProcessSub.action";
const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const stborder = {
  padding: "10px",
  marginBottom: "20px",
  border: "1px solid #d9d9d9",
};
class WS2631001_PaymentProcessSub extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Window: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "入金処理SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      Cards: 1,
      DepositAmount: 0,
      Commission: 0,
      AmountBilled: 0,
      StsReceipt: 1,
      loadingForm: false,
    };

    // this.onFinish = this.onFinish.bind(this)
  }

  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  changePayType(value) {
    this.formRef.current.setFieldsValue({
      Cards: value.target.value,
    });
    this.setState({
      Cards: value.target.value,
    });
  }
  componentDidMount() {
    this.getScreen();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreen();
    }
  }
  getScreen() {
    this.setState({ loadingForm: true });
    const data = {
      Li_Window: this.props.Li_Window,
    };
    PaymentProcessSubAction.screenDataAction(data)
      .then((res) => {
        console.log(res);
        this.setFormFieldValue("DepositAmount", res.DepositAmount);
        this.setFormFieldValue("Commission", res.Commission);
        this.setFormFieldValue("PayDateChar", res.PayDateChar);
        this.setFormFieldValue("StsReceipt", 1);
        this.setFormFieldValue("Otsuri", res.Otsuri === 0 ? "" : res.Otsuri);
        this.setState({
          DepositAmount: res.DepositAmount,
          Commission: res.Commission,
          AmountBilled: res.AmountBilled,
        });
      })
      .finally(() => this.setState({ loadingForm: false }));
  }

  // onFinish(values) {
  //   let AmountCommiss = values.DepositAmount + values.Commission;
  //   let AmountBilled = values.DepositAmount + values.Commission - values.AmountBilled;

  //   if (AmountCommiss === 0) {
  //     this.setState({
  //       childModal: {
  //         ...this.state.childModal,
  //         visible: true,
  //         width: 400,
  //         component: (
  //           <WS0061012_CheckYes
  //             Li_Message={'受領額がありません'}
  //             onFinishScreen={(output) => {
  //               this.closeModal()
  //             }}
  //           />),
  //       },
  //     })
  //   }

  //   if (AmountBilled < 0) {
  //     this.setState({
  //       childModal: {
  //         ...this.state.childModal,
  //         visible: true,
  //         width: 400,
  //         component: (
  //           <WS0061012_CheckYes
  //             Li_Message={'入金額が不足しています'}
  //             onFinishScreen={(output) => {
  //               this.closeModal()
  //             }}
  //           />),
  //       },
  //     })
  //   }

  //   if (this.props.Li_Window === 0) {
  //     if (AmountBilled > 0) {
  //       this.setState({
  //         childModal: {
  //           ...this.state.childModal,
  //           visible: true,
  //           width: 400,
  //           component: (
  //             <WS0061012_CheckYes
  //               Li_Message={'受取額が超過しています'}
  //               onFinishScreen={(output) => {
  //                 this.closeModal()
  //               }}
  //             />),
  //         },
  //       })
  //     }
  //   } else {
  //     //
  //   }
  // }

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
      <div className="payment-process-sub">
        <Card title="入金処理SUB">
          <Spin spinning={this.state.loadingForm}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{
                PayType: 1,
                StsReceipt: true,
                PayDateChar: moment().format("YYYY/MM/DD"),
              }}
            >
              {/* <div hidden>
              <Form.Item name="Commission"><Input /></Form.Item>
              <Form.Item name="AmountBilled"><Input /></Form.Item>
              <Form.Item name="PayDay"><Input /></Form.Item>
            </div> */}
              <div style={stborder}>
                <Form.Item name="DepositAmount" label="受取額" {...grid}>
                  <InputNumber maxLength={8} style={{ width: "150px" }} />
                </Form.Item>
                <Form.Item name="Expression_2" label="請求額" {...grid}>
                  <Input
                    type="text"
                    readOnly
                    style={{
                      background: "transparent",
                      border: "none",
                      width: "150px",
                    }}
                  />
                </Form.Item>
                <Form.Item name="Otsuri" label="過不足" {...grid}>
                  <Input
                    type="text"
                    readOnly
                    style={{
                      background: "transparent",
                      border: "none",
                      width: "150px",
                    }}
                  />
                </Form.Item>
              </div>

              <div style={stborder}>
                <Form.Item name="PayDateChar" label="入金日" {...grid}>
                  <Input type="text" style={{ width: "150px" }} />
                </Form.Item>
                <Form.Item label="種　別" {...grid} style={{ marginBottom: 0 }}>
                  <Space>
                    <Form.Item name="PayType">
                      <Radio.Group
                        onChange={(value) => {
                          this.changePayType(value);
                        }}
                        name="PayType"
                      >
                        <Space direction="vertical">
                          <Radio value={1}>現金</Radio>
                          <Radio value={2}>ｸﾚｼﾞｯﾄ</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="Card">
                      <Select
                        disabled={this.state.Cards === 1}
                        style={{ width: "150px" }}
                      >
                        <Select.Option value=""></Select.Option>
                        <Select.Option value="01">VISA</Select.Option>
                        <Select.Option value="02">Master</Select.Option>
                        <Select.Option value="03">JBC</Select.Option>
                        <Select.Option value="04">AMEX</Select.Option>
                        <Select.Option value="05">Diners Clube</Select.Option>
                      </Select>
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item
                  name="StsReceipt"
                  label="領　収"
                  valuePropName="Checkbox"
                >
                  <Checkbox
                  ></Checkbox>
                </Form.Item>
              </div>
              <div style={{ textAlign: "right" }}>
                <Button
                  disabled={
                    this.state.AmountBilled > 0 &&
                    this.state.DepositAmount + this.state.Commission > 0
                  }
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 400,
                        component: (
                          <WS0946006_ReceiptIssueOnline
                            Li_TaskType={1}
                            Li_Parameters={"Y"}
                            onFinishScreen={(output) => {
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    });
                  }}
                >
                  確定
                </Button>
              </div>
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
            this.closeModal()
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2631001_PaymentProcessSub);
