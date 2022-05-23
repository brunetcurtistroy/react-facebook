import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Button, Table, } from "antd";

class WS2674001_AssociateInsureQualifyConfirm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '協会けんぽ資格確認';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="associate-insure-qualify-confirm">
        <Card title="協会けんぽ資格確認">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日(文字)[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日(文字)[T]"
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
              label="事業所名（漢字）"
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
              label="取得日(文字)[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="取得日(文字)[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="出力日(文字)[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="出力日(文字)[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="未出力"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="未送信"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[資格有り]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[資格無し]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="エラー"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">出力</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">取込</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="保険" dataIndex="" key="" />
            <Table.Column title="受診日" dataIndex="" key="" />
            <Table.Column title="個人番号" dataIndex="" key="" />
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="氏名" dataIndex="" key="" />
            <Table.Column title="事業所名" dataIndex="" key="" />
            <Table.Column title="種別" dataIndex="" key="" />
            <Table.Column title="資格" dataIndex="" key="" />
            <Table.Column title="状態" dataIndex="" key="" />
            <Table.Column title="乳" dataIndex="" key="" />
            <Table.Column title="子" dataIndex="" key="" />
            <Table.Column title="補足情報" dataIndex="" key="" />

          </Table>
          <Form
          >
            <Form.Item
              name=""
              label="受診日"
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
              label="生年月日"
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
              label=""
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
              label="状態"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="追加検診(乳)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="追加検診(子宮)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="作成ファイル名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="作成ファイル名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="補足情報（改行あり）"
            >
              <Input type="text" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2674001_AssociateInsureQualifyConfirm);
