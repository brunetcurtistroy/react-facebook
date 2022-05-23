import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1176001_InspectSetInfo extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS02600:検査セット情報';

    this.state = {
    };
  }

  render() {
    return (
      <div className="inspect-set-info">
        <Card title="V4-VNS02600:検査セット情報">
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
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="セット名称" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="SEQ" dataIndex="" key="" />
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="略称名" dataIndex="" key="" />
            <Table.Column title="検査名称" dataIndex="" key="" />
            <Table.Column title="タイプ" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1176001_InspectSetInfo);
