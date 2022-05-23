import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
  Button, Card, Form, Input, InputNumber, Select, Space, Modal,
  message
} from "antd";
import coppy from 'assets/img/coppy.png'
import print from 'assets/img/print.png'
import PrinterDesignScreenResultTblAction from 'redux/ResultOutput/PrintParamMaintain/PrinterDesignScreenResultTbl.action'
import { download_file } from "helpers/CommonHelpers";
const styleImg = {
  marginBottom: '0.5em', background: '#C8DCF5', width: '50px'
}

class WS0434016_PrinterDesignScreenResultTbl extends React.Component {
  static propTypes = {
    Li_TextFile: PropTypes.string,
    Li_PreviewSpecifiedValue: PropTypes.any,
    Li_PrinterNoSpecifiedValue: PropTypes.number,
    Lo_Preview: PropTypes.any,
    Lo_PrinterNo: PropTypes.number,
    Lo_NumOfCopies: PropTypes.number,
    Lo_StsOutput: PropTypes.any,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ﾌﾟﾘﾝﾀｰ指定画面[結果表]';

    this.state = {
      parramIndex: {
        Li_PreviewSpecifiedValue: "",
        Li_PrinterNoSpecifiedValue: ""
      },
      screenData: {
        NumCopies: "",
        Preview: "",
        PrinterNo: "",
        PrinterNo_GB: []
      },
      isLoadingPrint: false,
    };
  }
  componentDidMount() {
    this.state.parramIndex.Li_PreviewSpecifiedValue = this.props.Li_Preview
    this.state.parramIndex.Li_PrinterNoSpecifiedValue = this.props.Li_Printer
    this.onFinish()
  }
  onFinish(values) {
    PrinterDesignScreenResultTblAction.getScreenDataTbl(this.state.parramIndex).then(res => {
      let data = res ? res : [];
      data.PrinterNo = data.PrinterNo > 0 ? data.PrinterNo : ""
      this.setState({
        screenData: data
      })
      this.formRef.current?.setFieldsValue(this.state.screenData = res)
    })
  }
  onSelectCBB(value) {
    this.state.screenData.PrinterNo = value
  }
  onEvent_F12 = () => {
    this.setState({
      isLoadingPrint: true
    })
    let params = {
      Li_FormatList: this.props.Li_FormatList || "",
      TextFile: this.props.Li_TextFile || "",
      Preview: this.state.screenData.Preview ? 1 : 0,
      Printer: this.formRef.current.getFieldValue('PrinterNo'),
      NumCopies: this.formRef.current.getFieldValue('NumCopies') || this.state.screenData.NumCopies
    }
    PrinterDesignScreenResultTblAction.onEventF12(params)
      .then(res => {
        if (res.data.message) {
          return Modal.warning({
            title: res.data.message,
            width: 300,
          });
        } else {
          download_file(res);
          message.success("完了！");
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      }).finally(() => {
        this.setState({
          isLoadingPrint: false
        })
      })
  }
  render() {
    console.log(this.state);
    return (
      <div className="printer-design-screen-result-tbl">

        <Form
          initialValues={{ PrinterNo: true }}
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          {/* <div style={{ display: 'none' }}>
            <Form.Item name="PrinterNo_GB"><Input /></Form.Item>
            <Form.Item name="Preview"><Input /></Form.Item>
            <Form.Item name="PrinterNo"><Input /></Form.Item>
            <Form.Item name="NumCopies"><Input /></Form.Item>
            <Form.Item name="Mouse"><Input /></Form.Item>
          </div> */}
          <Card title="ﾌﾟﾘﾝﾀｰ指定画面[結果表]">
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '0.5em' }}>
              <Form.Item name="PrinterNo" label="プリンタ－" >
                <Select
                  defaultValue={this.state.screenData?.PrinterNo ?? ""}
                  onChange={(value) => this.onSelectCBB(value)}
                >
                  {this.state.screenData.PrinterNo_GB?.map(value => (
                    <Select.Option key={value.Linked} value={value.Linked}>
                      {value.Display}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="NumCopies" label="&emsp;&emsp;&emsp;部数" >
                <InputNumber style={{ width: '30%' }} />
              </Form.Item>
            </div>
            <Space style={{ float: 'right', marginTop: '0.5em' }}>
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em' }}>
                <img src={print} style={styleImg} /><br />
                <Button style={{ background: '#C8DCF5' }} type="text" onClick={this.onEvent_F12}>&emsp;&ensp;印刷&emsp;&ensp;</Button>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em' }}>
                <img src={coppy} style={styleImg} /><br />
                <Button style={{ background: '#C8DCF5' }} type="text" onClick={this.onEvent_F12}>プレビュー</Button>
              </div>
            </Space>
          </Card>

        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0434016_PrinterDesignScreenResultTbl);
