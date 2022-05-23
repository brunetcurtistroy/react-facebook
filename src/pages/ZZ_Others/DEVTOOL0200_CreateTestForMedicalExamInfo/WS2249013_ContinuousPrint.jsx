import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS2249013_ContinuousPrint extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = '連続印刷';

    this.state = {
    };
  }

  render() {
    return (
      <div className="continuous-print">
        <Card title="連続印刷">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2249013_ContinuousPrint);
