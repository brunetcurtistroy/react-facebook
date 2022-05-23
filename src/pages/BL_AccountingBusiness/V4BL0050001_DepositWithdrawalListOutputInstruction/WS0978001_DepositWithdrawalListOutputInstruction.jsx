import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Radio, Button, Row, Col, Space, Modal, message, InputNumber, } from "antd";
import DepositWithdrawalListOutputInstructionAction from 'redux/AccountingBusiness/DepositWithdrawalListOutputInstruction/DepositWithdrawalListOutputInstruction.actions'
import WS0433001_PrinterConfirm from 'pages/SK_IntroductionLetter/V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm.jsx';
import WS0432001_CsvConfirm from 'pages/TO_StatisticalServices/V2MS0140_PersonalInfoCsvOutput/WS0432001_CsvConfirm.jsx';
import { download_file } from "helpers/CommonHelpers";
import moment from "moment-timezone";
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
class WS0978001_DepositWithdrawalListOutputInstruction extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '入出金一覧表出力指示';

    this.state = {
      Gl0DateFChar: null,
      Gl0DateTChar: null,
      RegisterClassifyF: 0,
      RegisterClassifyT: 0,
      PayFormChar: "00",
      ComboBox_PayFormChar: [],
      OutputOrder: 0,
      CsvOutputFile:"",
      childModal: {
        visible: false,
        width: 0,
        component: null
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
    DepositWithdrawalListOutputInstructionAction.GetScreenData()
      .then(res => {
        this.setState({
          Gl0DateFChar: moment(res.Gl0DateFChar),
          Gl0DateTChar: moment(res.Gl0DateTChar),
          RegisterClassifyF: res.RegisterClassifyF,
          RegisterClassifyT: res.RegisterClassifyT,
          ComboBox_PayFormChar: res.ComboBox_PayFormChar,
          OutputOrder: res.OutputOrder,
          CsvOutputFile:res.CsvOutputFile
        });
        this.formRef.current?.setFieldsValue({
          ...res,
          Gl0DateFChar: moment(res.Gl0DateFChar),
          Gl0DateTChar: moment(res.Gl0DateTChar),
        });
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  OutputCsv() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      Gl0DateFChar: moment(this.formRef.current.getFieldValue('Gl0DateFChar')).format('YYYY/MM/DD'),
      Gl0DateTChar: moment(this.formRef.current.getFieldValue('Gl0DateTChar')).format('YYYY/MM/DD'),
    };
    this.setState({ isLoadingCSV: true })
    DepositWithdrawalListOutputInstructionAction.Output_csv(params)
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

  Print_F12 = () => {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      Gl0DateFChar: moment(this.formRef.current.getFieldValue('Gl0DateFChar')).format('YYYY/MM/DD'),
      Gl0DateTChar: moment(this.formRef.current.getFieldValue('Gl0DateTChar')).format('YYYY/MM/DD'),
    };
    this.setState({ isLoadingPrint: true });
    DepositWithdrawalListOutputInstructionAction.Print_F12(params)
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
      <div className="deposit-withdrawal-list-output-instruction"  style={{ width: 700 }}>
        <Card title="入出金一覧表出力指示">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ PayFormChar: "00" }}
          >
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '0.5em' }}>
              <Row>
                <Col span={12} >
                  <Form.Item name="Gl0DateFChar" label="入出金日">
                    <VenusDatePickerCustom />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1} >
                  <Row>
                    <Col md={10} lg={8} >
                      <Form.Item name="RegisterClassifyF" label="レジ区分">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item style={{ marginLeft: '1em' }}>~</Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={12} >
                  <Form.Item name="Gl0DateTChar" label="&emsp;&emsp;&emsp;&emsp;">
                    <VenusDatePickerCustom />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1} >
                  <Row>
                    <Col md={10} lg={8}  >
                      <Form.Item name="RegisterClassifyT" label="&emsp;&emsp;&emsp;&emsp;">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={14}>
                  <Form.Item name="PayFormChar" label="入金形態">
                    <Select>
                      <Select.Option value="00">全て</Select.Option>
                      {this.state.ComboBox_PayFormChar?.map(value => (
                        <Select.Option value={value.LinkedField}>{value.DisplayField}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="OutputOrder" label="&emsp;出力順" >
                <Radio.Group style={{marginTop: '-12px'}}>
                  <Radio value={0} style={radioStyle}>入金日</Radio>
                  <Radio value={1} style={radioStyle}>領収番号</Radio>
                  <Radio value={2} style={radioStyle}>処理日</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <Space style={{ float: 'right', marginTop: '1em' }}>
              <Button type="primary" loading={this.state.isLoadingCSV} onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '30%',
                    component: (
                      <WS0432001_CsvConfirm
                        Lio_Output={this.formRef.current?.getFieldValue("CsvOutputFile")}
                        onFinishScreen={(output) => {
                          this.formRef.current?.setFieldsValue({
                            StsOutputConfirm: output.Lo_StsOutput ? 1 : 0,
                            CsvOutputFile: output.Lio_Output
                          })
                          this.OutputCsv();
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                });
              }} >CSV</Button>
              <Button type="primary" loading={this.state.isLoadingPrint} onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '30%',
                    component: (
                      <WS0433001_PrinterConfirm
                        Li_PreviewSpecifiedValue={this.formRef.current?.getFieldValue("PreviewPresence")}
                        Li_PrinterNoSpecifiedValue={this.formRef.current?.getFieldValue("PrinterNum")}
                        onFinishScreen={(output) => {
                          this.formRef.current?.setFieldsValue({
                            PreviewPresence: output.Lo_Preview,
                            PrinterNum: output.Lo_PrinterNo,
                            StsOutput: output.Lo_StsOutput
                          })
                          this.Print_F12();
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                });
              }} >印刷</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0978001_DepositWithdrawalListOutputInstruction);
