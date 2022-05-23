import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS0102001_InspectListSettingSub extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '検査一覧設定SUB';

    this.state = {
    };
  }

  render() {
    return (
      <div className="inspect-list-setting-sub">
        <Card title="検査一覧設定SUB">
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
            <Table.Column title="略式名称" dataIndex="" key="" />
            <Table.Column title="正式名称" dataIndex="" key="" />
            <Table.Column title="タイプ" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0102001_InspectListSettingSub);
