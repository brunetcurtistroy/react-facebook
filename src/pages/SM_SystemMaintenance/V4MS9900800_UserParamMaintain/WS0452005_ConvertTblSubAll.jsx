import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS0452005_ConvertTblSubAll extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '変換テーブルSUB[全て]';

    this.state = {
    };
  }

  render() {
    return (
      <div className="convert-tbl-sub-all">
        <Card title="変換テーブルSUB[全て]">
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
            <Table.Column title="検査コード" dataIndex="" key="" />
            <Table.Column title="検査名称" dataIndex="" key="" />
            <Table.Column title="検査値" dataIndex="" key="" />
            <Table.Column title="変換後" dataIndex="" key="" />
            <Table.Column title="コメントコード" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0452005_ConvertTblSubAll);
