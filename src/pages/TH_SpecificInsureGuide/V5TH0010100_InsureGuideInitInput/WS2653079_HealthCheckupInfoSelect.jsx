import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS2653079_HealthCheckupInfoSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '健診情報選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="health-checkup-info-select">
        <Card title="健診情報選択">
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
            <Table.Column title="受診日" dataIndex="" key="" />
            <Table.Column title="コース情報" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="検査名称" dataIndex="" key="" />
            <Table.Column title="結果値" dataIndex="" key="" />
            <Table.Column title="判定" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2653079_HealthCheckupInfoSelect);
