import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1391001_ImplementAgencyInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00210:実施機関照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="implement-agency-inquiry">
        <Card title="V4-TSB00210:実施機関照会">
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
            <Table.Column title="実施機関コード" dataIndex="" key="" />
            <Table.Column title="機関番号" dataIndex="" key="" />
            <Table.Column title="期間名" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1391001_ImplementAgencyInquiry);
