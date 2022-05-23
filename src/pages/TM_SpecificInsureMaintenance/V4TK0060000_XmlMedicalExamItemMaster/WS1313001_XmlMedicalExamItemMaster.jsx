import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, } from "antd";

class WS1313001_XmlMedicalExamItemMaster extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'V4-XML03000:XML用健診項目マスタ';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="xml-medical-exam-item-master">
        <Card title="V4-XML03000:XML用健診項目マスタ">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="開始日[文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">表示</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="採用日" dataIndex="" key="" />
            <Table.Column title="項目コード" dataIndex="" key="" />
            <Table.Column title="結果識別" dataIndex="" key="" />
            <Table.Column title="区分番号" dataIndex="" key="" />
            <Table.Column title="順番号" dataIndex="" key="" />
            <Table.Column title="条件コード" dataIndex="" key="" />
            <Table.Column title="厚労省項目名" dataIndex="" key="" />
            <Table.Column title="ＸＭＬ表示名" dataIndex="" key="" />
            <Table.Column title="データタイプ" dataIndex="" key="" />
            <Table.Column title="XMLパターン" dataIndex="" key="" />
            <Table.Column title="最大バイトＯＲフォーマット" dataIndex="" key="" />
            <Table.Column title="XMLデータ型" dataIndex="" key="" />
            <Table.Column title="表示単位" dataIndex="" key="" />
            <Table.Column title="UCUM単位コード" dataIndex="" key="" />
            <Table.Column title="observation要素" dataIndex="" key="" />
            <Table.Column title="auther要素" dataIndex="" key="" />
            <Table.Column title="auther要素項目番号" dataIndex="" key="" />
            <Table.Column title="一連検査グループ識別" dataIndex="" key="" />
            <Table.Column title="一連検査グループ関係コード" dataIndex="" key="" />
            <Table.Column title="同一性項目コード" dataIndex="" key="" />
            <Table.Column title="同一性項目名称" dataIndex="" key="" />
            <Table.Column title="XML検査方法コード" dataIndex="" key="" />
            <Table.Column title="検査方法" dataIndex="" key="" />
            <Table.Column title="結果コードＯＩＤ" dataIndex="" key="" />
            <Table.Column title="項目コードＯＩＤ" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1313001_XmlMedicalExamItemMaster);
