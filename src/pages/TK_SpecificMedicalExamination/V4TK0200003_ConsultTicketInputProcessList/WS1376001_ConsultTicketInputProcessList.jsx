import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS1376001_ConsultTicketInputProcessList extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '受診券入力処理[一覧]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="consult-ticket-input-process-list">
        <Card title="受診券入力処理[一覧]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="受診日[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コース[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コース[T]"
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
              label="保険者名（漢字）"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="入力状態"
            >
              <Select>
                <Select.Option value="">未設定</Select.Option>
                <Select.Option value="">設定済</Select.Option>
                <Select.Option value="">全　て</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="施設区分"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="受付状態"
            >
              <Select>
                <Select.Option value="">予　約</Select.Option>
                <Select.Option value="">受　付</Select.Option>
                <Select.Option value="">全　て</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="キー番号"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1376001_ConsultTicketInputProcessList);
