import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1383001_SupportItemInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00130:支援項目照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="support-item-inquiry">
        <Card title="V4-TSB00130:支援項目照会">
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
            <Table.Column title="支援コード" dataIndex="" key="" />
            <Table.Column title="略称名" dataIndex="" key="" />
            <Table.Column title="支援内容" dataIndex="" key="" />
            <Table.Column title="支援区分" dataIndex="" key="" />
            <Table.Column title="支援形態" dataIndex="" key="" />
            <Table.Column title="値" dataIndex="" key="" />
            <Table.Column title="ポイント" dataIndex="" key="" />
            <Table.Column title="最低値" dataIndex="" key="" />
            <Table.Column title="最高値" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1383001_SupportItemInquiry);
