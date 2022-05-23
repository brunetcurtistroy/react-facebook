import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS2789013_TargetSelectAssociationSub extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '対象選択[協会]SUB';

    this.state = {
    };
  }

  render() {
    return (
      <div className="target-select-association-sub">
        <Card title="対象選択[協会]SUB">
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
            <Table.Column title="受診日" dataIndex="" key="" />
            <Table.Column title="個人番号" dataIndex="" key="" />
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="漢字氏名" dataIndex="" key="" />
            <Table.Column title="性別" dataIndex="" key="" />
            <Table.Column title="年齢" dataIndex="" key="" />
            <Table.Column title="続柄" dataIndex="" key="" />
            <Table.Column title="記号" dataIndex="" key="" />
            <Table.Column title="番号" dataIndex="" key="" />
            <Table.Column title="事業所" dataIndex="" key="" />
            <Table.Column title="契約情報" dataIndex="" key="" />
            <Table.Column title="協会請求日" dataIndex="" key="" />
            <Table.Column title="協会受付No" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2789013_TargetSelectAssociationSub);
