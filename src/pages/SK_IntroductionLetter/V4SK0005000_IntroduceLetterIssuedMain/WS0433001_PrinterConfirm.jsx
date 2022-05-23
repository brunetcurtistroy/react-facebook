import React from "react";
import { connect } from "react-redux";

import { Card, Form, Select, Space, Button, Row, Col, message } from "antd";

import print from 'assets/img/print.png'
import coppy from 'assets/img/coppy.png'
import PropTypes from 'prop-types';

import PrinterConfirmAction from 'redux/IntroductionLetter/IntroduceLetterMasterMaintain/PrinterConfirm.action'

const styleImg = {
  marginBottom: '0.5em',
  background: '#C8DCF5',
  width: '50px'
}

class WS0433001_PrinterConfirm extends React.Component {
  static propTypes = {
    Li_BlankAdded: PropTypes.number,
    Lo_SelectList: PropTypes.string,
    Li_PreviewSpecifiedValue: PropTypes.any,
    Li_PrinterNoSpecifiedValue: PropTypes.any

  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'プリンター確認';

    this.state = {
      printerNo: 1,
      PrinterNo_List: []
    };
  }
  componentDidMount() {
    this.getScreenData()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getScreenData()
    }
  }

  getScreenData() {
    this.setFormValue('PrinterNo', 1)
    PrinterConfirmAction.getScreenData()
      .then(res => {
        console.log(res)
        this.setState({
          PrinterNo_List: res
        })
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }
  setFormValue = (namePath, value) => {
    this.formRef.current.setFields([
      {
        name: namePath,
        value
      }
    ])
  }
  Print() {
    PrinterConfirmAction.print()
      .then(res => {
        this.valueToPropComponent(res.data)
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }
  Review() {
    PrinterConfirmAction.review()
      .then(res => {
        this.valueToPropComponent(res.data)
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }
  valueToPropComponent = (data) => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lo_Preview: data.Lo_Preview,
        Lo_PrinterNo: data.Lo_PrinterNo,
        Lo_StsOutput: data.Lo_StsOutput,
        Preview: data.Preview
      })
    }
    this.forceUpdate();
  }

  onFinish() {
  }

  render() {
    return (
      <div className="printer-confirm">
        <Card title="プリンター確認">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            layout="vertical"
          >
            <Row>
              <Col span={24}>
                <Space style={{ marginTop: '0.5em', float: 'left' }}>
                  <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', width: '105px' }}>
                    <img src={print} style={styleImg} /><br />
                    <Button
                      style={{ background: '#C8DCF5', width: '100%' }}
                      type="text"
                      onClick={() => this.Print()}
                    >
                      印刷
                    </Button>
                  </div>
                  <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', width: '105px' }}>
                    <img src={coppy} style={styleImg} /><br />
                    <Button
                      style={{ background: '#C8DCF5', width: '100%' }}
                      type="text"
                      onClick={() => this.Review()}
                    >
                      プレビュー
                    </Button>
                  </div>
                </Space>
              </Col>
              <Col className="mt-3" style={{ width: 'auto', minWidth: '300px' }}>
                <Form.Item
                  name="PrinterNo"
                  label="プリンタ－"

                >
                  <Select>
                    {this.state.PrinterNo_List?.map(item => (
                      <Select.Option value={item.Linked}>{item.Display}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0433001_PrinterConfirm);
