import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS2686001_QualifyResultManuallyUpdate extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '資格結果手動更新';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="qualify-result-manually-update">
        <Card title="資格結果手動更新">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="生年月日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証記号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="エラーレベル"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="乳がん"
            >
              <Select>
                <Select.Option value=""></Select.Option>
                <Select.Option value="">資格無し</Select.Option>
                <Select.Option value="">資格有り</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="子宮がん"
            >
              <Select>
                <Select.Option value=""></Select.Option>
                <Select.Option value="">資格無し</Select.Option>
                <Select.Option value="">資格有り</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">確定</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2686001_QualifyResultManuallyUpdate);
