import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS0882004_StyleQuery extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '様式照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="style-query">
        <Card title="様式照会">
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
            <Table.Column title="様式" dataIndex="" key="" />
            <Table.Column title="様式名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0882004_StyleQuery);
