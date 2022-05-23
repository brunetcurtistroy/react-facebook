import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Radio, Button, } from "antd";

class WS1379001_SingleGroupClassifyInputSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '個別集団区分入力SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="single-group-classify-input-sub">
        <Card title="個別集団区分入力SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="M01.基本個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.基本集団健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.貧血個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.貧血集団健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.心電個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.心電集団健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.眼底個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.眼底集団健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="【H30】クレアチニン個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="【H30】クレアチニン集団健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="個別集団区分"
            >
              <Radio.Group>
                <Radio value="">個別健診</Radio>
                <Radio value="">集団健診</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">実　行</Button>
            </Form.Item>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1379001_SingleGroupClassifyInputSub);
