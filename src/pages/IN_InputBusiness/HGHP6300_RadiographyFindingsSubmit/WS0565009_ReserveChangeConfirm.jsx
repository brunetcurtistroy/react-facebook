import React from "react";
import { connect } from "react-redux";

import { Card, Form, Select, Button, Row, Col } from "antd";
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};
class WS0565009_ReserveChangeConfirm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '予約変更確認';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="reserve-change-confirm">
        <Card title="予約変更確認">
          <Form {...layout}
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item name="" label="予約状態&emsp;"  >
              <Select style={{ width: '30%' }}>
                <Select.Option value="1">予　約</Select.Option>
                <Select.Option value="2">保　留</Select.Option>
                <Select.Option value="3">待　ち</Select.Option>
              </Select>
            </Form.Item>
            <hr style={{ color: '#f0f0f0', opacity: '0.5', marginBottom: '1em' }} />
            <Form.Item label="個人番号&emsp;">
              <span>10</span>
            </Form.Item>
            <Form.Item label="氏名&emsp;">
              <Row>
                <Col span={10}>
                  <span>ss</span>
                </Col>
                <Col span={14}>
                  <span>24</span>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="生年月日&emsp;">
              <Row>
                <Col span={10}>
                  <span>ss</span>
                </Col>
                <Col span={14}>
                  <span>24</span>
                </Col>
              </Row>
            </Form.Item>
            <hr style={{ color: '#f0f0f0', opacity: '0.5', marginBottom: '1em' }} />
            <Form.Item label="受診日&emsp;">
              <span>10</span>
            </Form.Item>
            <Form.Item label="受付番号&emsp;">
              <span>6</span>
            </Form.Item>
            <Form.Item label="施設番号&emsp;">
              <Row>
                <Col span={5}>
                  <span>ss</span>
                </Col>
                <Col span={14}>
                  <span>24</span>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="時間帯&emsp;">
              <Row>
                <Col span={5}>
                  <span>ss</span>
                </Col>
                <Col span={14}>
                  <span>24</span>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="ｎ次区分&emsp;">
              <span>ss</span>
            </Form.Item>
            <Form.Item label="その他条件&emsp;">
              <span>ss</span>
            </Form.Item>
            <Form.Item label="コース&emsp;">
              <Row>
                <Col span={5}>
                  <span>ss</span>
                </Col>
                <Col span={14}>
                  <span>24</span>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="健診場所&emsp;">
              <Row>
                <Col span={5}>
                  <span>ss</span>
                </Col>
                <Col span={14}>
                  <span>24</span>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="備考&emsp;">
              <span>80</span>
            </Form.Item>
            <Button type="primary" style={{ float: 'right', marginTop: '1em' }}>実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0565009_ReserveChangeConfirm);
