import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1367002_MemberList extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '該当者一覧';

    this.state = {
    };
  }

  render() {
    return (
      <div className="member-list">
        <Card title="該当者一覧">
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
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="カナ氏名" dataIndex="" key="" />
            <Table.Column title="漢字氏名" dataIndex="" key="" />
            <Table.Column title="年齢" dataIndex="" key="" />
            <Table.Column title="性" dataIndex="" key="" />
            <Table.Column title="続柄" dataIndex="" key="" />
            <Table.Column title="保険者" dataIndex="" key="" />
            <Table.Column title="保険者名" dataIndex="" key="" />
            <Table.Column title="事業所" dataIndex="" key="" />
            <Table.Column title="事業所名" dataIndex="" key="" />
            <Table.Column title="受診日" dataIndex="" key="" />
            <Table.Column title="コース" dataIndex="" key="" />
            <Table.Column title="受診コース" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1367002_MemberList);
