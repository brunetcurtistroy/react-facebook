import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1169004_YearSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '年度選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="year-select">
        <Card title="年度選択">
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
            <Table.Column title="年度" dataIndex="" key="" />
            <Table.Column title="名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1169004_YearSelect);
