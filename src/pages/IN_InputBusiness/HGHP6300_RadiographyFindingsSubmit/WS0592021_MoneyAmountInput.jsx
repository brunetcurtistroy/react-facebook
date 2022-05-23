import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Row, Col } from "antd";
const styleDiv = { marginLeft: '0.5em' };
const styleInput = { border: 'none', width: '90%' }
class WS0592021_MoneyAmountInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '金額入力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="money-amount-input">
        <Card title="金額入力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row>
              <Col span={7} offset={1}>
                <Form.Item name="" label="&ensp;税区分" >
                  <Select>
                    <Select.Option value="">税指定</Select.Option>
                    <Select.Option value="">外税</Select.Option>
                    <Select.Option value="">内税</Select.Option>
                    <Select.Option value="">非課税</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7} offset={1}>
                <Form.Item name="" label="税率"  >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={3} offset={1}>
                <div style={styleDiv}>保険者</div>
                <div>
                  <Form.Item name='' style={{ marginBottom: '0px' }}><Input style={styleInput} /></Form.Item>
                  <Form.Item name='' style={{ marginBottom: '0px' }}>(<Input style={styleInput} />)</Form.Item>
                </div>
              </Col>
              <Col span={3}>
                <div style={styleDiv}>事業所</div>
                <div>
                  <Form.Item name='' style={{ marginBottom: '0px' }}><Input style={styleInput} /></Form.Item>
                  <Form.Item name='' style={{ marginBottom: '0px' }}>(<Input style={styleInput} />)</Form.Item>
                </div>
              </Col>
              <Col span={3}>
                <div style={styleDiv}>他団体</div>
                <div>
                  <Form.Item name='' style={{ marginBottom: '0px' }}><Input style={styleInput} /></Form.Item>
                  <Form.Item name='' style={{ marginBottom: '0px' }}>(<Input style={styleInput} />)</Form.Item>
                </div>
              </Col>
              <Col span={3}>
                <div style={styleDiv}>個人１</div>
                <div>
                  <Form.Item name='' style={{ marginBottom: '0px' }}><Input style={styleInput} /></Form.Item>
                  <Form.Item name='' style={{ marginBottom: '0px' }}>(<Input style={styleInput} />)</Form.Item>
                </div>
              </Col>
              <Col span={3}>
                <div style={styleDiv}>個人２</div>
                <div>
                  <Form.Item name='' style={{ marginBottom: '0px' }}><Input style={styleInput} /></Form.Item>
                  <Form.Item name='' style={{ marginBottom: '0px' }}>(<Input style={styleInput} />)</Form.Item>
                </div>
              </Col>
              <Col span={3}>
                <div style={styleDiv}>個人３</div>
                <div>
                  <Form.Item name='' style={{ marginBottom: '0px' }}><Input style={styleInput} /></Form.Item>
                  <Form.Item name='' style={{ marginBottom: '0px' }}>(<Input style={styleInput} />)</Form.Item>
                </div>
              </Col>
              <Col span={3}>
                <div style={styleDiv}>合計</div>
                <div>
                  <Form.Item name='' style={{ marginBottom: '0px' }}><Input style={styleInput} /></Form.Item>
                  <Form.Item name='' style={{ marginBottom: '0px' }}>(<Input style={styleInput} />)</Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22} style={{ textAlign: 'right', marginTop: '1em' }}>
                <Button type="primary">税計算</Button>
              </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0592021_MoneyAmountInput);
