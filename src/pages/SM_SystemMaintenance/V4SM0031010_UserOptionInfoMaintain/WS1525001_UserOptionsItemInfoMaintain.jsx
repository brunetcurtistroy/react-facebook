import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS1525001_UserOptionsItemInfoMaintain extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'ユーザーオプションアイテム情報保守';

    this.state = {
    };
  }

  render() {
    return (
      <div className="user-options-item-info-maintain">
        <Card title="ユーザーオプションアイテム情報保守">
          <Table
            columns={[]}
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
          />

          <Table>
            <Table.Column title="種別コード" dataIndex="" key="" />
            <Table.Column title="識別名称" dataIndex="" key="" />
            <Table.Column title="補足説明" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="オプションコード" dataIndex="" key="" />
            <Table.Column title="識別名称" dataIndex="" key="" />
            <Table.Column title="補足説明" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="項目" dataIndex="" key="" />
            <Table.Column title="オプション説明" dataIndex="" key="" />
            <Table.Column title="アイテム制限" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1525001_UserOptionsItemInfoMaintain);
