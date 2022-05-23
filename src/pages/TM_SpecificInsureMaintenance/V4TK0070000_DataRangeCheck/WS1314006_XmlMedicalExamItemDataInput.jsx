import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1314006_XmlMedicalExamItemDataInput extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'XML用健診項目(データ入力)';

    this.state = {
    };
  }

  render() {
    return (
      <div className="xml-medical-exam-item-data-input">
        <Card title="XML用健診項目(データ入力)">
          <Table
            dataSource={[]}
            loading={false}
            pagination={{
              defaultCurrent: 1,
              total: 1,
              pageSize: 1,
              showSizeChanger: true,
              onChange: (page, pageSize) => {},
              onShowSizeChange: (page, pageSize) => {},
            }}
            rowKey={(record) => record.id}
          >
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1314006_XmlMedicalExamItemDataInput);
