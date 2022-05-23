import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Table, } from "antd";

class WS2653001_GuideInputProvenSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '指導入力[実績]SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="guide-input-proven-sub">
        <Card title="指導入力[実績]SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="カナ氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="実施日(画面)"
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
              label="漢字氏名"
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
              label="年齢"
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
              label="支援量"
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
              label="保険者名（漢字）"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="時間帯.開始時間"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="時間帯.終了時間"
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
              label="実施者コード"
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
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="実施場所コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M21.実施場所_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コース名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="評価区分(画面)"
            >
              <Select>
                <Select.Option value="">初回①</Select.Option>
                <Select.Option value="">初期面談</Select.Option>
                <Select.Option value="">中間評価</Select.Option>
                <Select.Option value="">継続中</Select.Option>
                <Select.Option value="">中断</Select.Option>
                <Select.Option value="">終了評価</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="支援コード"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">削除</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">更新</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">結果取得</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="表示" dataIndex="" key="" />
            <Table.Column title="実施検査" dataIndex="" key="" />
            <Table.Column title="内容" dataIndex="" key="" />

          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2653001_GuideInputProvenSub);
