import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Table, } from "antd";

class WS0420001_MasterListOutputInsuranceInfo extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力[保険者情報]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="master-list-output-insurance-info">
        <Card title="マスタ一覧出力[保険者情報]">
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
              label="出力有無(記録)"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="出力有無(補足)"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="保険者コード/保険者番号" dataIndex="" key="" />
            <Table.Column title="保険者名" dataIndex="" key="" />
            <Table.Column title="郵便番号/地区名称" dataIndex="" key="" />
            <Table.Column title="住所" dataIndex="" key="" />
            <Table.Column title="電話番号/FAX番号" dataIndex="" key="" />
            <Table.Column title="代表者/先方担当者" dataIndex="" key="" />
            <Table.Column title="担当営業/状況" dataIndex="" key="" />
            <Table.Column title="産業分類/産業医" dataIndex="" key="" />
            <Table.Column title="登録日/更新日" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="項目" dataIndex="" key="" />
            <Table.Column title="内容" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="記録日" dataIndex="" key="" />
            <Table.Column title="記録者" dataIndex="" key="" />
            <Table.Column title="重要度" dataIndex="" key="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0420001_MasterListOutputInsuranceInfo);
