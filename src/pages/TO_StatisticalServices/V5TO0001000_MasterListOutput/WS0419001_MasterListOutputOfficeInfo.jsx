import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Table, } from "antd";

class WS0419001_MasterListOutputOfficeInfo extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力[事業所情報]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="master-list-output-office-info">
        <Card title="マスタ一覧出力[事業所情報]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="カナ検索"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="チェック有無(記録)"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="チェック有無(送付先)"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="チェック有無(補足)"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="事業所コード" dataIndex="" key="" />
            <Table.Column title="事業所名(カナ/漢字)" dataIndex="" key="" />
            <Table.Column title="保険証記号/保険者コード/保険者名" dataIndex="" key="" />
            <Table.Column title="郵便番号/地区名称" dataIndex="" key="" />
            <Table.Column title="住所" dataIndex="" key="" />
            <Table.Column title="電話番号/FAX番号" dataIndex="" key="" />
            <Table.Column title="代表者/先方担当者" dataIndex="" key="" />
            <Table.Column title="担当営業/状況区分" dataIndex="" key="" />
            <Table.Column title="産業分類/産業医名" dataIndex="" key="" />
            <Table.Column title="登録日/更新日" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="記録日" dataIndex="" key="" />
            <Table.Column title="記録者" dataIndex="" key="" />
            <Table.Column title="重要度" dataIndex="" key="" />
            <Table.Column title="内容" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="書　類" dataIndex="" key="" />
            <Table.Column title="事業所１" dataIndex="" key="" />
            <Table.Column title="事業所２" dataIndex="" key="" />
            <Table.Column title="個人１" dataIndex="" key="" />
            <Table.Column title="個人２" dataIndex="" key="" />
            <Table.Column title="個人３" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="項目" dataIndex="" key="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0419001_MasterListOutputOfficeInfo);
