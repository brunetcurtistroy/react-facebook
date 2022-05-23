import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Select, Button, Table, } from "antd";

class WS1119001_InspectVariationInfoOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査変動情報出力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="inspect-variation-info-output">
        <Card title="検査変動情報出力">
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
              label="オプション"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="請求金額有"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加検査"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="不要検査"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="コース金額"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
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
              <Button type="primary">開く</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">出力</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="個人番号" dataIndex="" key="" />
            <Table.Column title="氏名" dataIndex="" key="" />
            <Table.Column title="性別" dataIndex="" key="" />
            <Table.Column title="コース" dataIndex="" key="" />
            <Table.Column title="事業所" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1119001_InspectVariationInfoOutput);
