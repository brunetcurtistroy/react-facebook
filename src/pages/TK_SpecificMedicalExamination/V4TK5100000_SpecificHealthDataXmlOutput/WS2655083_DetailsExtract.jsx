import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Radio, } from "antd";

class WS2655083_DetailsExtract extends React.Component {
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
              label="コースコード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="個人番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="漢字氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受付番号[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受付番号[T]"
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
              label="支社店コード"
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
              label="コースコード[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コースコード[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="年齢[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="年齢[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="AM/PM区分"
            >
              <Select>
                <Select.Option value=""></Select.Option>

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
              label="状態フラグ"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">確定</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">クリア</Button>
            </Form.Item>
            <Form.Item
              name=""
              label="続柄(画面)"
            >
              <Select>
                <Select.Option value="">全て</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="表示順(1:保険者,2:日付)"
            >
              <Radio.Group>
                <Radio value="">保険者</Radio>
                <Radio value="">受診日</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
              name=""
              label="契約区分"
            >
              <Radio.Group>
                <Radio value="">全　て</Radio>
                <Radio value="">個　別</Radio>
                <Radio value="">集　合</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
              name=""
              label="新規・再作成"
            >
              <Radio.Group>
                <Radio value="">全　て</Radio>
                <Radio value="">新　規</Radio>
                <Radio value="">再作成</Radio>

              </Radio.Group>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2655083_DetailsExtract);
