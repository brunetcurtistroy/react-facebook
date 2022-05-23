import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1462006_ListProcess extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '一覧処理';

    this.state = {
    };
  }

  render() {
    return (
      <div className="list-process">
        <Card title="一覧処理">
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
            <Table.Column title="受診日/ＩＤ" dataIndex="" key="" />
            <Table.Column title="氏名" dataIndex="" key="" />
            <Table.Column title="性/生年" dataIndex="" key="" />
            <Table.Column title="保険者番号" dataIndex="" key="" />
            <Table.Column title="利用/受診券番号" dataIndex="" key="" />
            <Table.Column title="有効期限" dataIndex="" key="" />
            <Table.Column title="指導区分" dataIndex="" key="" />
            <Table.Column title="保険負担/率額・上限" dataIndex="" key="" />
            <Table.Column title="代行機関" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1462006_ListProcess);
