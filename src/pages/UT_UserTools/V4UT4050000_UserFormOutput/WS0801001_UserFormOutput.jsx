import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS0801001_UserFormOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ユーザー帳票出力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="user-form-output">
        <Card title="ユーザー帳票出力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="受診日[F][文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日[T][文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者コード"
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
              label="事業所コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="支社店コード[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="事業所名（漢字＼0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コースコード"
            >
              <Input type="text" />
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
              label="状況フラグ[範囲]"
            >
              <Select>
                <Select.Option value="">全て</Select.Option>
                <Select.Option value="">予約</Select.Option>
                <Select.Option value="">受付</Select.Option>
                <Select.Option value="">保留</Select.Option>
                <Select.Option value="">待ち</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">出力</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">CSV</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0801001_UserFormOutput);
