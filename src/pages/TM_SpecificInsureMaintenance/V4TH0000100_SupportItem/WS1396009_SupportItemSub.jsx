import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1396009_SupportItemSub extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '支援項目サブ';

    this.state = {
    };
  }

  render() {
    return (
      <div className="support-item-sub">
        <Card title="支援項目サブ">
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
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="検査名" dataIndex="" key="" />
            <Table.Column title="表示順" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1396009_SupportItemSub);
