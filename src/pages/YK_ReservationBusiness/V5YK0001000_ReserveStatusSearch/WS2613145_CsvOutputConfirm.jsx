import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Row, Col } from "antd";

const grid = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

class WS2613145_CsvOutputConfirm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'CSV出力確認';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="csv-output-confirm">
        <Card title="CSV出力確認">
          <Form {...grid}
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="出力先"
            >
              <Input type="text" style={{width: "97%"}}/>
            </Form.Item>
            <Form.Item
              name=""
              label="ファイル名"
            >
              <Input type="text" style={{width: "97%"}}/><span>.csv</span>
            </Form.Item>
            <Row gutter={16}>
              <Col span={24}>
                <Button type="primary" style={{float: 'right'}}>更新</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2613145_CsvOutputConfirm);
