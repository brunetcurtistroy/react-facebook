import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS0484001_ConditionExpressConfirmSub extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = '条件式確認SUB';

    this.state = {
    };
  }

  render() {
    return (
      <div className="condition-express-confirm-sub">
        <Card title="条件式確認SUB">
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
            <Table.Column title="SEQ" dataIndex="" key="" />
            <Table.Column title="条件式" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0484001_ConditionExpressConfirmSub);
