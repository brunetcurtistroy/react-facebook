import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Button, Row, Col, InputNumber } from "antd";

class WS0544001_DateChange extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_Date: PropTypes.any,
    
    onFinishScreen: PropTypes.func,
  };
  

  constructor(props) {
    super(props);

    // document.title = '年月変更';

    this.state = {
    };

    this.onFinish = this.onFinish.bind(this);
  }

  onFinish(values) {
    const date = new Date();
    date.setMonth(values.Month-1);
    date.setFullYear(values.Year);

    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_Date: date,
      });
    }
  
  }

  render() {
    return (
      <div className="date-change">
        <Card title="年月変更">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="Year" label="年" >
                  <InputNumber min={1} maxLength={4}/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="Month" label="月" >
                <InputNumber min={1} max={12} maxLength={2}/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{float: "right"}}>確定</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0544001_DateChange);
