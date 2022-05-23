import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1178001_GovernmentTubeHepatitisAggregate extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS05300:政管肝炎集計';

    this.state = {
    };
  }

  render() {
    return (
      <div className="government-tube-hepatitis-aggregate">
        <Card title="V4-VNS05300:政管肝炎集計">
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
            <Table.Column title="コース" dataIndex="" key="" />
            <Table.Column title="集計区分" dataIndex="" key="" />
            <Table.Column title="基本コース名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1178001_GovernmentTubeHepatitisAggregate);
