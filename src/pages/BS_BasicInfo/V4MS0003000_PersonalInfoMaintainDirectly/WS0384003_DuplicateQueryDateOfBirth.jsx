import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS0384003_DuplicateQueryDateOfBirth extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = '重複照会[生年月日]';

    this.state = {
    };
  }

  render() {
    return (
      <div className="duplicate-query-date-of-birth">
        <Card title="重複照会[生年月日]">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0384003_DuplicateQueryDateOfBirth);
