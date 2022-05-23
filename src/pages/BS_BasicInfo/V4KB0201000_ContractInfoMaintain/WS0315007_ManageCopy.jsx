import React from "react";

import { Card, Form, Input, Select, Button, Row, Col } from "antd";
class WS0315007_ManageCopy extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '管理複写';

    this.state = {
      listCombobox: [],
      firstDefault: "",
      txtGroupContract: "",

    };
    this.onSelectCBB = this.onSelectCBB.bind(this)
  }
  onSelectCBB(value) {
    console.log(value);
    this.setState({
      ...this.state,
      firstDefault: value
    })
  }
  onFinish(values) {

  }

  render() {
    return (
      <div className="manage-copy">
        <Card title="条件複写" >
          <Form
            name="form1"
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row >
              <Col span={10}>
                <Form.Item
                  name="typeContract"
                  label="種　別"
                >
                  <Select value={this.state.firstDefault}
                    onChange={this.onSelectCBB}>
                    {this.state.listCombobox.map((value, index) =>
                      <Select.Option key={index} value={value} >{value}</Select.Option>
                    )};
                </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  name="groupContract"
                  label="団　体"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={14}>
                <span style={{ marginLeft: "0.5em" }}>{this.state.txtGroupContract}</span>
              </Col>
            </Row>
            <Row style={{ margin: "1em 0 1em 0" }}>
              <Col span={24} offset={10}>
                <Button type="primary">V</Button>
              </Col>
            </Row>
            <Row >
              <Col span={10}>
                <Form.Item
                  name="typeContract2"
                  label="種　別"
                >
                  <Select value={this.state.firstDefault}
                    onChange={this.onSelectCBB}>
                    {this.state.listCombobox.map((value, index) =>
                      <Select.Option key={index} value={value} >{value}</Select.Option>
                    )};
                </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  name="groupContract2"
                  label="団　体"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Input style={{ marginLeft: "0.5em" }} />
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right', marginLeft: "0.5em" }}>
                <Form.Item >
                  <Button type="primary" htmlType="submit"> 複写 </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

export default WS0315007_ManageCopy;
