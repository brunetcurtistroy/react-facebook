import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import { download_file } from "helpers/CommonHelpers";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Checkbox, Button, DatePicker, Space, Row, Col, Modal, Input, message } from "antd";
import WS0433001_PrinterConfirm from 'pages/SK_IntroductionLetter/V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm.jsx';
import PaymentListOut from "redux/AccountingBusiness/PaymentListOutput/PaymentListOut.actions"
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';

class WS0981001_PaymentListOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '入金一覧出力';

    this.state = {
      PayDateFChar: "",
      PayDateTChar: "",
      Cash: 1,
      Credit: 1,
      Transfer: 0,
      PrinterNo: 1,
      PreviewPresence: true,
      FormatName: "",
      OutputOrder: 1,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  componentDidMount() {
    this.GetScreenData()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.GetScreenData()
    }
  }
  GetScreenData() {
    this.setState({ isLoading: true })
    PaymentListOut.GetScreenData()
      .then(res => {
        this.setState({
          PayDateFChar: res.PayDateFChar,
          PayDateTChar: res.PayDateTChar,
          Cash: res.Cash,
          Credit: res.Credit,
          Transfer: res.Transfer,
          PrinterNo: res.PrinterNo,
          PreviewPresence: res.PreviewPresence,
          FormatName: res.FormatName,
          OutputOrder: res.OutputOrder,
        });
        this.formRef.current?.setFieldsValue({
          ...res,
          PayDateFChar: moment(res.PayDateFChar),
          PayDateTChar: moment(res.PayDateTChar),
        });
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  Print_F12() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      PayDateFChar: moment(this.formRef.current.getFieldValue('PayDateFChar')).format('YYYY/MM/DD'),
      PayDateTChar: moment(this.formRef.current.getFieldValue('PayDateTChar')).format('YYYY/MM/DD'),
    };
    this.setState({ isLoadingPrint: true });
    PaymentListOut.Printer_F12(params)
      .then(res => {
        if (res.data.message) {
          Modal.warning({
            title: res.data.message,
            width: 300,
          });
        } else {
          download_file(res);
          message.success("完了！");
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingPrint: false }))
  }
  onFinish(values) {

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
    var today = new Date().getFullYear() + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + ("0" + new Date().getDate()).slice(-2)
    return (
      <div className="payment-list-output">
        <Card title="入金一覧出力" style={{width:400}}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ PayDateFChar: moment(today), PayDateTChar: moment(today) }}
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="Option"><Input /></Form.Item>
              <Form.Item name="StsDateConvert"><Input /></Form.Item>
              <Form.Item name="ReturnPayListOutput"><Input /></Form.Item>
              <Form.Item name="PayDateF"><Input /></Form.Item>
              <Form.Item name="PayDateT"><Input /></Form.Item>
              <Form.Item name="PrinterNo"><Input /></Form.Item>
              <Form.Item name="PreviewPresence"><Input /></Form.Item>
              <Form.Item name="OutputOrder"><Input /></Form.Item>
              <Form.Item name="FormatName"><Input /></Form.Item>
              <Form.Item name="PrintButton"><Input /></Form.Item>
              <Form.Item name="PageBreak"><Input /></Form.Item>
            </div>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '0.5em' }}>
              <Space>
                <Form.Item name="PayDateFChar" label="入金日">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                </Form.Item>
                <Form.Item>~</Form.Item>
                <Form.Item name="PayDateTChar">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                </Form.Item>
              </Space>
              <Row>
                <Col span={24} >
                  <Space>
                    <Form.Item label="対　象"></Form.Item>
                    <Form.Item name="Cash" valuePropName="checked" >
                      <Checkbox>現金</Checkbox>
                    </Form.Item>
                    <Form.Item name="Credit" valuePropName="checked" >
                      <Checkbox>クレジット</Checkbox>
                    </Form.Item>
                    <Form.Item name="Transfer" valuePropName="checked" >
                      <Checkbox>振込</Checkbox>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </div>
            <Button style={{ float: 'right', marginTop: '1em' }} type="primary" onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: 330,
                  component: (
                    <WS0433001_PrinterConfirm
                      Li_PreviewSpecifiedValue={this.formRef.current?.getFieldValue("PreviewPresence")}
                      Li_PrinterNoSpecifiedValue={this.formRef.current?.getFieldValue("PrinterNum")}
                      onFinishScreen={(output) => {
                        this.formRef.current?.setFieldsValue({
                          PreviewPresence: output.Lo_Preview ? 1 : 0 ,
                          PrinterNum: output.Lo_PrinterNo,
                          StsOutput: output.Lo_StsOutput ? 1 : 0 
                        })
                        if (output.Lo_StsOutput) {

                          this.Print_F12()
                        }
                        this.closeModal()
                      }}
                    />
                  ),
                },
              });
            }} >印刷</Button>
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0981001_PaymentListOutput);
