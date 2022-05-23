import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS1423001_SupportPlanManualCreate extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = '支援計画手動作成';

    this.state = {
    };
  }

  render() {
    return (
      <div className="support-plan-manual-create">
        <Card title="支援計画手動作成">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1423001_SupportPlanManualCreate);
