import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS1436001_ImplementRecordRef extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'V4-THK00093:実施状況[実績照会]';

    this.state = {
    };
  }

  render() {
    return (
      <div className="implement-record-ref">
        <Card title="V4-THK00093:実施状況[実績照会]">
          <Table
            columns={[]}
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
          />

          <Table>
            <Table.Column title="督促" dataIndex="" key="" />
            <Table.Column title="督促日" dataIndex="" key="" />
            <Table.Column title="督 促 項 目" dataIndex="" key="" />
            <Table.Column title="内　　容" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1436001_ImplementRecordRef);
