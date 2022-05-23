import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1313005_DataRangeCheck extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'XML03001:データ範囲チェック';

    this.state = {
    };
  }

  render() {
    return (
      <div className="data-range-check">
        <Card title="XML03001:データ範囲チェック">
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
            <Table.Column title="入力最小値" dataIndex="" key="" />
            <Table.Column title="入力最大値" dataIndex="" key="" />
            <Table.Column title="文字入力最小値" dataIndex="" key="" />
            <Table.Column title="文字入力最大値" dataIndex="" key="" />
            <Table.Column title="オプション" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1313005_DataRangeCheck);
