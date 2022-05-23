import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1362003_PrintProcess extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '印刷処理';

    this.state = {
    };
  }

  render() {
    return (
      <div className="print-process">
        <Card title="印刷処理">
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
            <Table.Column title="受診日" dataIndex="" key="" />
            <Table.Column title="ＩＤコード" dataIndex="" key="" />
            <Table.Column title="コース" dataIndex="" key="" />
            <Table.Column title="受付No" dataIndex="" key="" />
            <Table.Column title="保険者" dataIndex="" key="" />
            <Table.Column title="事業所" dataIndex="" key="" />
            <Table.Column title="カナ氏名" dataIndex="" key="" />
            <Table.Column title="整理番号" dataIndex="" key="" />
            <Table.Column title="基本" dataIndex="" key="" />
            <Table.Column title="貧血" dataIndex="" key="" />
            <Table.Column title="心電図" dataIndex="" key="" />
            <Table.Column title="眼底" dataIndex="" key="" />
            <Table.Column title="クレアチニン" dataIndex="" key="" />
            <Table.Column title="合計" dataIndex="" key="" />
            <Table.Column title="窓口" dataIndex="" key="" />
            <Table.Column title="同時実施" dataIndex="" key="" />
            <Table.Column title="請求金額" dataIndex="" key="" />
            <Table.Column title="有効期限" dataIndex="" key="" />
            <Table.Column title="保険記号" dataIndex="" key="" />
            <Table.Column title="保険番号" dataIndex="" key="" />
            <Table.Column title="郵便番号" dataIndex="" key="" />
            <Table.Column title="受診者住所" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1362003_PrintProcess);
