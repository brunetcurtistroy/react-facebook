import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Button, Select, Space, message } from "antd";

import print from 'assets/img/print.png'
import coppy from 'assets/img/coppy.png'
import ReceiptIssueOnlineAction from 'redux/AccountingBusiness/ReceiptPreIssue20/ReceiptIssueOnline.actions'

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const styleImg = {
  marginBottom: '0.5em',
  background: '#C8DCF5',
  width: '50px'
}

class WS0946006_ReceiptIssueOnline extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '領収書発行（オンライン）';

    this.state = {
      PrinterNum_List: [],
      ReceiptStyle_List: [],
      form_data: {},
      Li_UsuallyInAdvance: ""
    };
  }

  componentDidMount() {
    let parram = {
      TypeCode: this.props.TypeCode ?? "",
      OptionCode: this.props.OptionCode ?? "",
      ItemDataPrinter: this.props.ItemDataPrinter ?? "",
      ReceiptDateScreen: this.props.ReceiptDateScreen ?? 0,
      OfficeCodeNew: this.props.OfficeCodeNew ?? "",
      StsDateReceiptMore: this.props.StsDateReceiptMore ?? false,
      Li_Parameters: this.props.Li_Parameters ?? "",
      Proviso: this.props.Proviso ?? "",
      ChineseCharInputMode: this.props.ChineseCharInputMode ?? 0,
      InspectIssue: this.props.InspectIssue ?? false,
      StsPrintPreview: this.props.StsPrintPreview ?? false,
    }
    this.getScreenData(parram);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      let parram = {
        TypeCode: this.props.TypeCode,
        OptionCode: this.props.OptionCode,
        ItemDataPrinter: this.props.ItemDataPrinter,
        ReceiptDateScreen: this.props.ReceiptDateScreen,
        OfficeCodeNew: this.props.OfficeCodeNew,
        StsDateReceiptMore: this.props.StsDateReceiptMore,
        Li_Parameters: this.props.Li_Parameters,
        Proviso: this.props.Proviso,
        ChineseCharInputMode: this.props.ChineseCharInputMode,
        InspectIssue: this.props.InspectIssue,
        StsPrintPreview: this.props.StsPrintPreview,
      }
      this.getScreenData(parram);
    }
  }
  getScreenData(parram) {
    ReceiptIssueOnlineAction.getScreenData(parram)
      .then((res) => {
        var StyleListCmbName_list = res.StyleListCmbName.split(",");
        var StyleListCmbNum_list = res.StyleListCmbNum.split(",");
        let array_temp = []
        for (let i = 0; i < StyleListCmbName_list.length; i++) {
          let obj_temp = {
            StyleListCmbName: StyleListCmbName_list[i],
            StyleListCmbNum: StyleListCmbNum_list[i]
          }
          array_temp.push(obj_temp)
        }
        this.setState({
          PrinterNum_List: res.PrinterNum_List,
          ReceiptStyle_List: array_temp,
          form_data: res,
          Li_UsuallyInAdvance : this.props.Li_UsuallyInAdvance == '2' ? true : false
        })
        this.formRef.current?.setFieldsValue(res)
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally()
  }

  Print() {
    let parram = {
      Preview: this.state.form_data.Preview ?? false,
      InspectIssue: this.props.InspectIssue ?? false,
      ReceiptDatePresence: this.state.form_data.ReceiptDatePresence ?? false,
      ReissueMarkOutputPresence: this.state.form_data.ReissueMarkOutputPresence ?? false,
      OfficeNameOutputPresence: this.state.form_data.OfficeNameOutputPresence ?? false,
      PrinterNum: this.state.form_data.PrinterNum ?? 0,
      UnexecutedEditingChar: this.state.form_data.UnexecutedEditingChar ?? "",
      Proviso: this.state.form_data.Proviso ?? "",
      PersonalNameOutputPresence: this.state.form_data.PersonalNameOutputPresence ?? false,
      StyleListCmbNum: this.state.form_data.StyleListCmbNum ?? "",
      ReceiptStyle: this.state.form_data.ReceiptStyle ?? "",
    }
    ReceiptIssueOnlineAction.print(parram)
      .then((res) => {
        console.log(res)
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally()
  }

  Review() {
    let parram = {
      Preview: this.state.form_data.Preview ?? false,
      InspectIssue: this.props.InspectIssue ?? false,
      ReceiptDatePresence: this.state.form_data.ReceiptDatePresence ?? false,
      ReissueMarkOutputPresence: this.state.form_data.ReissueMarkOutputPresence ?? false,
      OfficeNameOutputPresence: this.state.form_data.OfficeNameOutputPresence ?? false,
      PrinterNum: this.state.form_data.PrinterNum ?? 0,
      UnexecutedEditingChar: this.state.form_data.UnexecutedEditingChar ?? "",
      Proviso: this.state.form_data.Proviso ?? "",
      PersonalNameOutputPresence: this.state.form_data.PersonalNameOutputPresence ?? false,
      StyleListCmbNum: this.state.form_data.StyleListCmbNum ?? "",
      ReceiptStyle: this.state.form_data.ReceiptStyle ?? "",
      StsPrintPreview: this.props.StsPrintPreview ?? false
    }
    ReceiptIssueOnlineAction.review(parram)
      .then((res) => {
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally()
  }

  render() {
    return (
      <div className="receipt-issue-online">
        <Card title="領収書発行（オンライン）">
          <Form ref={this.formRef}>
            <Form.Item hidden={this.state.Li_UsuallyInAdvance} name="ReceiptDatePresence" label="領収日"  {...grid}
              valuePropName="checked">
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item name="ReissueMarkOutputPresence" label="再発行印"  {...grid}
              valuePropName="checked">
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item hidden={this.state.Li_UsuallyInAdvance} name="OfficeNameOutputPresence" label="事業所名"  {...grid}
              valuePropName="checked">
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item hidden={this.state.Li_UsuallyInAdvance} name="PersonalNameOutputPresence" label="個人氏名"  {...grid}
              valuePropName="checked">
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item name="Proviso" label="但し書き"  {...grid}>
              <Input type='text' />
            </Form.Item>
            <hr style={{ border: '1px solid #F0F0F0', marginBottom: '1.2rem' }} />
            <Form.Item name="ReceiptStyle" label="様式選択"  {...grid}>
              <Select>
                {this.state.ReceiptStyle_List?.map((value) => (
                  <Select.Option value={value.StyleListCmbNum}>{value.StyleListCmbName}
                  </Select.Option>))}
              </Select>
            </Form.Item>
            <Form.Item name="PrinterNum" label="">
              <Select>
                {this.state.PrinterNum_List?.map((value) => (
                  <Select.Option value={value.printer_number}>{value.printer_name}
                  </Select.Option>))}
              </Select>
            </Form.Item>

            <Space style={{ marginTop: '0.5em' }}>
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', width: '105px' }}>
                <img src={print} style={styleImg} /><br />
                <Button style={{ background: '#C8DCF5', width: '100%' }} type="text" onClick={() => { this.Print() }} >印刷</Button>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', width: '105px' }}>
                <img src={coppy} style={styleImg} /><br />
                <Button style={{ background: '#C8DCF5', width: '100%' }} type="text" onClick={() => { this.Review() }} >プレビュー</Button>
              </div>
            </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0946006_ReceiptIssueOnline);
