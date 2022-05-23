import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1177001_GovernmentTubePrimaryAggregate extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS05200:政管一次集計';

    this.state = {
    };
  }

  render() {
    return (
      <div className="government-tube-primary-aggregate">
        <Card title="V4-VNS05200:政管一次集計">
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
            <Table.Column title="健診コース" dataIndex="" key="" />
            <Table.Column title="集計区分" dataIndex="" key="" />
            <Table.Column title="基本コース" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1177001_GovernmentTubePrimaryAggregate);
