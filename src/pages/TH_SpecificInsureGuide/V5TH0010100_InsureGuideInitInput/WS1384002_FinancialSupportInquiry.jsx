import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1384002_FinancialSupportInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '支援内容照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="financial-support-inquiry">
        <Card title="支援内容照会">
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
            <Table.Column title="支援内容" dataIndex="" key="" />
            <Table.Column title="区分" dataIndex="" key="" />
            <Table.Column title="形態" dataIndex="" key="" />
            <Table.Column title="値" dataIndex="" key="" />
            <Table.Column title="単位" dataIndex="" key="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1384002_FinancialSupportInquiry);
