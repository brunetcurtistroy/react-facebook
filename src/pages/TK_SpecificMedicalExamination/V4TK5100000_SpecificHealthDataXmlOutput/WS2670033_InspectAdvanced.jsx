import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS2670033_InspectAdvanced extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '検査詳細設定';

    this.state = {
    };
  }

  render() {
    return (
      <div className="inspect-advanced">
        <Card title="検査詳細設定">
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
            <Table.Column title="№" dataIndex="" key="" />
            <Table.Column title="検査名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2670033_InspectAdvanced);
