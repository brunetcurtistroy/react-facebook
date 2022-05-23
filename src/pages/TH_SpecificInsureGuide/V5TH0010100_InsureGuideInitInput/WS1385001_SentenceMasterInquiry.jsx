import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS1385001_SentenceMasterInquiry extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00150:文章マスタ照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="sentence-master-inquiry">
        <Card title="V4-TSB00150:文章マスタ照会">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1385001_SentenceMasterInquiry);
