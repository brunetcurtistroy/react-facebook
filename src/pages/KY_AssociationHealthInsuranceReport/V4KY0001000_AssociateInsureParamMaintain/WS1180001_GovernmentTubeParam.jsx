import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1180001_GovernmentTubeParam extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS05910:政管パラメータ';

    this.state = {
    };
  }

  render() {
    return (
      <div className="government-tube-param">
        <Card title="V4-VNS05910:政管パラメータ">
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
            <Table.Column title="SEQ" dataIndex="" key="" />
            <Table.Column title="備　考" dataIndex="" key="" />
            <Table.Column title="種　別" dataIndex="" key="" />
            <Table.Column title="属" dataIndex="" key="" />
            <Table.Column title="桁数" dataIndex="" key="" />
            <Table.Column title="位置" dataIndex="" key="" />
            <Table.Column title="設定" dataIndex="" key="" />
            <Table.Column title="チェック" dataIndex="" key="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1180001_GovernmentTubeParam);
