import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1456003_PrintProcess extends React.Component {
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
            <Table.Column title="実施日" dataIndex="" key="" />
            <Table.Column title="保険者" dataIndex="" key="" />
            <Table.Column title="カナ氏名" dataIndex="" key="" />
            <Table.Column title="受診券" dataIndex="" key="" />
            <Table.Column title="利用券" dataIndex="" key="" />
            <Table.Column title="単価" dataIndex="" key="" />
            <Table.Column title="実施P" dataIndex="" key="" />
            <Table.Column title="算定額" dataIndex="" key="" />
            <Table.Column title="窓口" dataIndex="" key="" />
            <Table.Column title="請求金額" dataIndex="" key="" />
            <Table.Column title="有効期限" dataIndex="" key="" />
            <Table.Column title="保険記号" dataIndex="" key="" />
            <Table.Column title="保険番号" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1456003_PrintProcess);
