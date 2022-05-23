import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, Select, } from "antd";

class WS2656088_DetailsExtract extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '詳細抽出';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="details-extract">
        <Card title="詳細抽出">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
            >
              <Button type="primary">確定</Button>
            </Form.Item>
            <Form.Item
              name=""
              label="続柄"
            >
              <Select>
                <Select.Option value="">全て</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="個別集団健診区分"
            >
              <Select>
                <Select.Option value="">集合契約</Select.Option>
                <Select.Option value="">個別契約</Select.Option>
                <Select.Option value="">全　　て</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="作成区分(1:新規,2:再作成)"
            >
              <Select>
                <Select.Option value="">新　規</Select.Option>
                <Select.Option value="">再作成</Select.Option>
                <Select.Option value="">全　て</Select.Option>

              </Select>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2656088_DetailsExtract);
