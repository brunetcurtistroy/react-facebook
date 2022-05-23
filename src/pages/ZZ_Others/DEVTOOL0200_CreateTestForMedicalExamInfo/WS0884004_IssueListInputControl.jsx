import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS0884004_IssueListInputControl extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = '発行一覧(入力制御)';

    this.state = {
    };
  }

  render() {
    return (
      <div className="issue-list-input-control">
        <Card title="発行一覧(入力制御)">
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
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0884004_IssueListInputControl);
