import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Checkbox, Select, Row, Col, Space, Button } from "antd";

import print from 'assets/img/print.png'
import coppy from 'assets/img/coppy.png'
import InvoiceAction from "redux/AccountingBusiness/BillingIntegration/Invoice.actions"
const gridCheck = {
  labelCol: { span: 14 },
  wrapperCol: { span: 10 },
};

const styleImg = {
  marginBottom: '0.5em',
  background: '#C8DCF5',
  width: '50px'
}

class WS0947001_Invoice extends React.Component {
  static propTypes = {
    Li_SpecifyIssuedByPresence: PropTypes.any

  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '請求書発行';

    this.state = {
      BillHeading: 0,
      BillingDateOutputPresence: 0,
      Bill: 0,
      IssueDatePrinting: 0,
      SpecifyIssued: 0,
      ReissueMarkOutputPresence: 0,
      ClaimReceiptIssue: 0,
      DestinationOutputPresence: 0,
      Titles: 0,
      PersonInChargePrint: 0,
      StyleNo: null,
      OutputDevice: null,
      ComboBox_OutputDevice: [],
      ComboBox_StyleNo: [],
      Expression_7: 0,
      Expression_30: 0
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
    const params = {
      Li_SpecifyIssuedByPresence: this.props.Li_SpecifyIssuedByPresence
    }
    this.setState({ isLoading: true })
    InvoiceAction.GetScreenData()
      .then(res => {
        this.setState({
          BillHeading: res.BillHeading,
          BillingDateOutputPresence: res.BillingDateOutputPresence,
          Bill: res.Bill,
          IssueDatePrinting: res.IssueDatePrinting,
          SpecifyIssued: res.SpecifyIssued,
          ReissueMarkOutputPresence: res.ReissueMarkOutputPresence,
          ClaimReceiptIssue: res.ClaimReceiptIssue,
          DestinationOutputPresence: res.DestinationOutputPresence,
          Titles: res.Titles,
          PersonInChargePrint: res.PersonInChargePrint,
          StyleNo: res.StyleNo,
          OutputDevice: res.OutputDevice,
          ComboBox_OutputDevice: res.ComboBox_OutputDevice,
          ComboBox_StyleNo: res.ComboBox_StyleNo,
          Expression_7: res.Expression_7,
          Expression_30: res.Expression_30
        });
        this.formRef.current?.setFieldsValue(res);
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  onFinish(values) {

  }

  render() {
    return (
      <div className="invoice">
        <Card title="請求書発行">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={12} style={{ borderRight: '1px solid #d9d9d9' }}>
                <Form.Item  {...gridCheck}
                  name="BillHeading"
                  label="頭書①"
                  valuePropName="checked"
                >
                  <Checkbox disabled={this.state.Expression_7 == 0}></Checkbox>
                </Form.Item>
                <Form.Item  {...gridCheck}
                  name="Bill"
                  label="頭書②"
                  valuePropName="checked"
                >
                  <Checkbox disabled={this.state.Expression_7 == 0}></Checkbox>
                </Form.Item>
                <Form.Item {...gridCheck}
                  name="SpecifyIssued"
                  label="明細書"
                  valuePropName="checked"
                >
                  <Checkbox disabled={this.state.Expression_7 == 0}></Checkbox>
                </Form.Item>
                <Form.Item {...gridCheck}
                  name="ClaimReceiptIssue"
                  label="領収書"
                  valuePropName="checked" 
                  hidden={this.state.Expression_30 == 0}
                >
                  <Checkbox hidden={this.state.Expression_30 == 0}></Checkbox>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item {...gridCheck}
                  name="BillingDateOutputPresence"
                  label="請求日"
                  valuePropName="checked"
                  disabled={this.state.Expression_7 == 0}
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item {...gridCheck}
                  name="IssueDatePrinting"
                  label="発行日"
                  valuePropName="checked"
                  disabled={this.state.Expression_7 == 0}
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item {...gridCheck}
                  name="ReissueMarkOutputPresence"
                  label="再発行印"
                  valuePropName="checked"
                  disabled={this.state.Expression_7 == 0}
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item {...gridCheck}
                  name="DestinationOutputPresence"
                  label="宛先"
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item {...gridCheck}
                  name="Titles"
                  label="敬称"
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item {...gridCheck}
                  name="PersonInChargePrint"
                  label="担当者"
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <br></br>

            <Form.Item
              name="StyleNo"
              label=""
            >
              <Select>
                {this.state.ComboBox_StyleNo?.map(value => (
                  <Select.Option value={value.LinkedField}>{value.DisplayField}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="OutputDevice"
              label=""
            >
              <Select>
                {this.state.ComboBox_OutputDevice?.map(value => (
                  <Select.Option value={value.LinkedField}>{value.DisplayField}</Select.Option>
                ))}

              </Select>
            </Form.Item>

            <Space style={{ marginTop: '0.5em', float: 'right' }}>
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', width: '105px' }}>
                <img src={print} style={styleImg} /><br />
                <Button style={{ background: '#C8DCF5', width: '100%' }} type="text" >印刷</Button>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', width: '105px' }}>
                <img src={coppy} style={styleImg} /><br />
                <Button style={{ background: '#C8DCF5', width: '100%' }} type="text" >プレビュー</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0947001_Invoice);
