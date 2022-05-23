import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS2713042_PatternList extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'パターン一覧';

    this.state = {
    };
  }

  render() {
    return (
      <div className="pattern-list">
        <Card title="パターン一覧">
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
            <Table.Column title="パターンコード" dataIndex="" key="" />
            <Table.Column title="パターン名称" dataIndex="" key="" />
            <Table.Column title="" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2713042_PatternList);
