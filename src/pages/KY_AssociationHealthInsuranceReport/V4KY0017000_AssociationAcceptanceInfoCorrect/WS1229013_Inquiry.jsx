import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1229013_Inquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="inquiry">
        <Card title="照会">
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
            <Table.Column title="承認番号" dataIndex="" key="" />
            <Table.Column title="カナ氏名" dataIndex="" key="" />
            <Table.Column title="漢字氏名" dataIndex="" key="" />
            <Table.Column title="生年月日" dataIndex="" key="" />
            <Table.Column title="年齢" dataIndex="" key="" />
            <Table.Column title="続柄" dataIndex="" key="" />
            <Table.Column title="性別" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1229013_Inquiry);
