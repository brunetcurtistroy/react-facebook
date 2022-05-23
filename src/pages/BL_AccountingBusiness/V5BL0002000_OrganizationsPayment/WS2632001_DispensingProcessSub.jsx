import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import {
  Card,
  Form,
  Input,
  Button,
  InputNumber,
  DatePicker,
  Modal,
  Spin,
} from "antd";
import moment from "moment";
import WS0061012_CheckYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061012_CheckYes";
import DispensingProcessSubAction from "redux/AccountingBusiness/OrganizationsPayment/DispensingProcessSub.action";
const grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

let today = moment(new Date());
class WS2632001_DispensingProcessSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "出金処理SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataScreen: {},
      dataChange: {},
      loadingForm: false,
    };

    // this.onFinish = this.onFinish.bind(this);
  }
  componentDidMount() {
    this.screenData();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.screenData();
    }
  }
  changePayType(value) {
    this.formRef.current.setFieldsValue({
      Cards: value.target.value,
    });
    this.setState({
      Cards: value.target.value,
    });
  }
  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  async screenData() {
    this.setState({ loadingForm: true });
    await DispensingProcessSubAction.screenDataAction()
      .then((res) => {
        if (res) {
          this.setFormFieldValue(
            "DepositAmount",
            res.DepositAmount === 0 ? "" : res.DepositAmount
          );
          this.setFormFieldValue(
            "OutAmount",
            res.OutAmount === 0 ? "" : res.OutAmount
          );
          this.setState({ dataScreen: res });
        }
      })
      .catch((error) => {})
      .finally(() => {
        this.setState({ loadingForm: false });
      });
    console.log(this.state.dataScreen);
  }
  changeInput() {
    const data = {
      WithdrawalDateChar: this.formRef.current
        .getFieldsValue("WithdrawalDateChar")
        .WithdrawalDateChar.format("YYYY/MM/DD"),
      WithdrawalDate: this.state.dataScreen.WithdrawalDate,
      StsDateConvert: this.state.dataScreen.StsDateConvert,
    };
    DispensingProcessSubAction.changeAction(data)
      .then((res) => {
        this.setState({ dataChange: res });
      })
      .catch((error) => {})
      .finally(() => {});
  }
  comfirm() {
    const data = {
      DepositAmount:
        this.formRef.current.getFieldsValue("DepositAmount").DepositAmount,
      OutAmount: this.formRef.current.getFieldsValue("OutAmount").OutAmount,
      WithdrawalDateChar: this.formRef.current
        .getFieldsValue("WithdrawalDateChar")
        .WithdrawalDateChar.format("YYYY/MM/DD"),
      BillingManageNum: this.state.dataScreen.BillingManageNum,
      WithdrawalDate: this.state.dataScreen.WithdrawalDate,
      StsDateConvert: this.state.dataScreen.StsDateConvert,
      PayManageNum: this.state.dataScreen.PayManageNum,
      ReceiptManageNum: this.state.dataScreen.ReceiptManageNum,
      RegisterClassify: this.state.dataScreen.RegisterClassify,
    };
    console.log(data);
    DispensingProcessSubAction.comfirmAction(data)
    .then((res) => {
      if (this.props.onFinishScreen) {
        this.props.onFinishScreen({
        });
      }
    })
    .catch((error) => {})
    .finally(() => {});
  }

  // onFinish(values) {
  //   if (values.OutAmount > values.DepositAmount) {
  //     this.setState({
  //       childModal: {
  //         ...this.state.childModal,
  //         visible: true,
  //         width: 400,
  //         component: (
  //           <WS0061012_CheckYes
  //             Li_Message={'出金額が超過しています'}
  //             onFinishScreen={(output) => {
  //               this.closeModal()
  //             }}
  //           />),
  //       },
  //     })
  //   } else {

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
      <div className="dispensing-process-sub">
        <Card title="出金処理SUB">
          <Spin spinning={this.state.loadingForm}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{
                WithdrawalDateChar: today,
              }}
            >
              <Form.Item name="DepositAmount" label="入金額" {...grid}>
                <Input
                  onChange={() => {
                    this.changeInput();
                  }}
                  type="text"
                  readOnly
                  style={{
                    background: "transparent",
                    border: "none",
                    textAlign: "end",
                    width: "150px",
                  }}
                />
              </Form.Item>
              <Form.Item name="OutAmount" label="出金額" {...grid}>
                <InputNumber
                  onChange={() => {
                    this.changeInput();
                  }}
                  maxLength={8}
                  style={{ width: "150px" }}
                  formatter={(value) =>
                    `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
              <Form.Item name="WithdrawalDateChar" label="出金日" {...grid}>
                <VenusDatePickerCustom formRefDatePicker={this.formRef}
                  onChange={() => {
                    this.changeInput();
                  }}
                  format="YYYY/MM/DD"
                  allowClear={false}
                  style={{ width: "150px" }}
                />
              </Form.Item>
              <div style={{ textAlign: "right" }}>
                <Button
                  disabled={
                    !this.state.dataScreen.DepositAmount > 0 &&
                    !this.state.dataScreen.OutAmount > 0
                  }
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    this.comfirm();
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
)(WS2632001_DispensingProcessSub);
