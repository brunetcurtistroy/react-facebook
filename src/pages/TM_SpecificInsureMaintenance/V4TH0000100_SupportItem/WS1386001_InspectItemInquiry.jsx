import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1386001_InspectItemInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00160:検査項目照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="inspect-item-inquiry">
        <Card title="V4-TSB00160:検査項目照会">
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
            <Table.Column title="略称名" dataIndex="" key="" />
            <Table.Column title="正式名称" dataIndex="" key="" />
            <Table.Column title="検査タイプ" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1386001_InspectItemInquiry);
