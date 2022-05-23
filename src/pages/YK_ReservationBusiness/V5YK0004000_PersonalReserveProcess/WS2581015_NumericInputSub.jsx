import React from "react";
import { connect } from "react-redux";

import { Button, Card, Col, Form, Input, Row, } from "antd";

class WS2581015_NumericInputSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '数値入力SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="numeric-input-sub">
        <Card title="数値入力SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
            >
              <Input.TextArea type="text" rows={5} />
            </Form.Item>
            <Row gutter={16} style={{ marginBottom: "2px", textAlign:  "center", fontSize: "25px", fontWeight: "bold"}}>
              <Col span={8} style={{paddingRight: "2px"}}>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"C"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={12} style={{paddingRight: "1px"}}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px" }}>{"7"}</Button></Col>
                  <Col span={12} style={{paddingLeft: "1px"}}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px" }}>{"8"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={12} style={{paddingRight: "1px"}}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px" }}>{"4"}</Button></Col>
                  <Col span={12} style={{paddingLeft: "1px"}}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px" }}>{"5"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={12} style={{paddingRight: "1px"}}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px" }}>{"1"}</Button></Col>
                  <Col span={12} style={{paddingLeft: "1px"}}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px" }}>{"2"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={12} style={{paddingRight: "1px"}}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px" }}>{"0"}</Button></Col>
                  <Col span={12} style={{paddingLeft: "1px"}}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px" }}>{"00"}</Button></Col>
                </Row>
              </Col>
              <Col span={8} style={{paddingRight: "0", paddingLeft: "0"}}>
              <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"%"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"9"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"6"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"3"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"."}</Button></Col>
                </Row>
              </Col>
              <Col span={8} style={{paddingLeft: "2px"}}>
              <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"÷"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"x"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"-"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"+"}</Button></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: "2px" }}>
                  <Col span={24}><Button type="primary" style={{ width: "100%", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px"}}>{"="}</Button></Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}><Button style={{ width: "100%", backgroundColor: "green", color: "#ffffff", fontSize: "25px", fontWeight: "bold", lineHeight: "1px", padding: "25px 15px" }}>{"確　定"}</Button></Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2581015_NumericInputSub);
