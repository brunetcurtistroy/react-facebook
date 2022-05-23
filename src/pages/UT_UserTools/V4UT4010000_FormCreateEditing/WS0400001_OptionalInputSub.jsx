import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS0400001_OptionalInputSub extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'オプション入力         SUB';

    this.state = {
    };
  }

  render() {
    return (
      <div className="optional-input-sub">
        <Card title="オプション入力         SUB">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0400001_OptionalInputSub);
