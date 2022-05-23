import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import { download_file } from "helpers/CommonHelpers";
import moment from "moment-timezone";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Button, Space, DatePicker, Modal, Input, message } from "antd";
import WS0433001_PrinterConfirm from 'pages/SK_IntroductionLetter/V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm.jsx';
import WS0432001_CsvConfirm from 'pages/TO_StatisticalServices/V2MS0140_PersonalInfoCsvOutput/WS0432001_CsvConfirm.jsx';
import AccountsReceivableListOutputInstructionAction from "redux/AccountingBusiness/AccountsReceivableListOutputInstruction/AccountsReceivableListOutputInstruction.actions"
class WS0985001_AccountsReceivableListOutputInstruction extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '未収金一覧表出力指示';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingPrint: false,
      isLoadingCSV: false,
    };
    this.onFinish = this.onFinish.bind(this)
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
    AccountsReceivableListOutputInstructionAction.GetScreenData()
      .then(res => {
        this.formRef.current?.setFieldsValue({
          ...res,
          Gl0DateFChar: moment(res.Gl0DateFChar),
          Gl0DateTChar: moment(res.Gl0DateTChar),
          DateChar: moment(res.DateChar)
        });
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  OutputCsv() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      Gl0DateFChar: moment(this.formRef.current.getFieldValue('Gl0DateFChar')).format('YYYY/MM/DD'),
      Gl0DateTChar: moment(this.formRef.current.getFieldValue('Gl0DateTChar')).format('YYYY/MM/DD'),
      DateChar: moment(this.formRef.current.getFieldValue('DateChar')).format('YYYY/MM/DD')
    };
    this.setState({ isLoadingCSV: true })
    AccountsReceivableListOutputInstructionAction.Csv_F11(params)
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
      .finally(() => this.setState({ isLoadingCSV: false }))
  }

  Printer_F12 = () => {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      Gl0DateFChar: moment(this.formRef.current.getFieldValue('Gl0DateFChar')).format('YYYY/MM/DD'),
      Gl0DateTChar: moment(this.formRef.current.getFieldValue('Gl0DateTChar')).format('YYYY/MM/DD'),
      DateChar: moment(this.formRef.current.getFieldValue('DateChar')).format('YYYY/MM/DD')
    };
    this.setState({ isLoadingPrint: true });
    AccountsReceivableListOutputInstructionAction.Printer_F12(params)
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
    return (
      <div className="accounts-receivable-list-output-instruction">
        <Card title="未収金一覧表出力指示" style={{width:400}}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="TypeCodeOutputDevice"><Input /></Form.Item>
              <Form.Item name="OptionCodeOutputDevice"><Input /></Form.Item>
              <Form.Item name="Option"><Input /></Form.Item>
              <Form.Item name="DateConvertStatus"><Input /></Form.Item>
              <Form.Item name="ReturnAccountsReceivableListOut"><Input /></Form.Item>
              <Form.Item name="ComboBoxSelectListPrinter"><Input /></Form.Item>
              <Form.Item name="Gl0DateFDate"><Input /></Form.Item>
              <Form.Item name="Gl0DateTDate"><Input /></Form.Item>
              <Form.Item name="PrinterNum"><Input /></Form.Item>
              <Form.Item name="Preview"><Input /></Form.Item>
              <Form.Item name="DateDate"><Input /></Form.Item>
              <Form.Item name="Output"><Input /></Form.Item>
            </div>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '0.5em' }}>
              <Space>
                <Form.Item name="Gl0DateFChar" label="請求日">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                </Form.Item>
                <Form.Item>~</Form.Item>
                <Form.Item name="Gl0DateTChar">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                </Form.Item>
              </Space>
              <Form.Item name="DateChar" label="基準日">
                <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
              </Form.Item>
            </div>
            <Space style={{ float: 'right', marginTop: '1em' }}>
              <Button type="primary" onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 330,
                    component: (
                      <WS0432001_CsvConfirm
                        Lio_Output={this.formRef.current?.getFieldValue("Output")}
                        onFinishScreen={(output) => {
                          this.formRef.current?.setFieldsValue({
                            Output: output.Lio_Output,
                            StsOutput: output.Lo_StsOutput ? 1 : 0
                          })
                          if (output.Lo_StsOutput) {
                            this.OutputCsv()
                          }
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                });
              }}>CSV</Button>
              <Button type="primary" onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '30%',
                    component: (
                      <WS0433001_PrinterConfirm
                        Li_PreviewSpecifiedValue={this.formRef.current?.getFieldValue("Preview")}
                        Li_PrinterNoSpecifiedValue={this.formRef.current?.getFieldValue("PrinterNum")}
                        onFinishScreen={(output) => {
                          this.formRef.current?.setFieldsValue({
                            Preview: output.Lo_Preview ? 1 : 0,
                            PrinterNum: output.Lo_PrinterNo,
                            StsOutput: output.Lo_StsOutput ? 1 : 0
                          })
                          if (output.Lo_StsOutput) {
                            this.Printer_F12()
                          }
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                });
              }}>印刷</Button>
            </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0985001_AccountsReceivableListOutputInstruction);
