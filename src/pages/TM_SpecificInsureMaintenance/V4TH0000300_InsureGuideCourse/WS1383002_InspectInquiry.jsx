import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1383002_InspectInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '検査照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="inspect-inquiry">
        <Card title="検査照会">
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
            <Table.Column title="検査名" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1383002_InspectInquiry);
