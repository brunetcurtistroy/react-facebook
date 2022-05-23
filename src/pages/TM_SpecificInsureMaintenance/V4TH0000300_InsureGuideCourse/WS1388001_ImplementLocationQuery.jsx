import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1388001_ImplementLocationQuery extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00180:実施場所照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="implement-location-query">
        <Card title="V4-TSB00180:実施場所照会">
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
            <Table.Column title="実施場所" dataIndex="" key="" />
            <Table.Column title="実施区分" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1388001_ImplementLocationQuery);
