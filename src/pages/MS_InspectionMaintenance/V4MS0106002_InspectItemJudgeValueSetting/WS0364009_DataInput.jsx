import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Radio, Button, Row, Col, Space } from "antd";

class WS0364009_DataInput extends React.Component {
  static propTypes = {
    Lio_Operator: PropTypes.any, 
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'データ入力';

    this.state = {
    };
  } 
  render() {
    return (
      <div className="data-input">
        <Card title="データ入力">
          <Form
            ref={this.formRef}
            initialValues={{Lio_Operator: 0}}
          >
            <Form.Item name="Lio_Operator"  >
              <Radio.Group>
                <Row gutter={24} >
                  <Col span={6}>
                    <Space direction="vertical" style={{width:'400px'}}>
                      <Radio value={"0"}>＋</Radio>
                      <Radio value={"1"}>－</Radio>
                      <Radio value={"2"}>×</Radio>
                      <Radio value={"3"}>÷</Radio>
                    </Space>
                  </Col>
                  <Col span={6}>
                    <Space direction="vertical">
                      <Radio value={"4"}>剰余</Radio>
                      <Radio value={"5"}>指数</Radio>
                      <Radio value={"6"}>＝</Radio>
                      <Radio value={"7"}>≠</Radio>
                    </Space>
                  </Col>
                  <Col span={6}>
                    <Space direction="vertical">
                      <Radio value={"8"}>≦</Radio>
                      <Radio value={"9"}>≧</Radio>
                      <Radio value={"10"}>＜</Radio>
                      <Radio value={"11"}>＞</Radio>
                    </Space>
                  </Col>
                  <Col span={6}>
                    <Space direction="vertical">
                      <Radio value={"12"}>NOT</Radio>
                      <Radio value={"13"}>∩</Radio>
                      <Radio value={"14"}>∪</Radio>
                      <Radio value={"15"}>定数</Radio>
                    </Space>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item> 
            <Row>
              <Col span={12} style={{textAlign:'center'}}> 
                <Form.Item name="" style={{display:'none'}}>
                  <Input />
                </Form.Item> 
              </Col>
              <Col span={12} style={{textAlign:'right'}} >
                <Form.Item>
                <Button type="primary" onClick={()=>{
                    if(this.props.onFinishScreen){
                      this.props.onFinishScreen({Lio_Operator: this.formRef.current?.getFieldValue("Lio_Operator")})
                    }
                }} >決定</Button> 
                </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0364009_DataInput);
