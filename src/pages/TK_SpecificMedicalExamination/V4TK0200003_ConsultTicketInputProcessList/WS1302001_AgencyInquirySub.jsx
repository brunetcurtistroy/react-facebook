import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1302001_AgencyInquirySub extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '代行機関照会SUB';

    this.state = {
    };
  }

  render() {
    return (
      <div className="agency-inquiry-sub">
        <Card title="代行機関照会SUB">
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
            <Table.Column title="No" dataIndex="" key="" />
            <Table.Column title="代行機関番号" dataIndex="" key="" />
            <Table.Column title="名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1302001_AgencyInquirySub);
