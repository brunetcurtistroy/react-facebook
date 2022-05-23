import React from "react";

import { Card, Table, } from "antd";


class WS1398010_InsureGuideCourseDetail extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = '保健指導コース明細';

    this.state = {
    };
  }

  render() {
    return (
      <div className="insure-guide-course-detail">
        <Card title="保健指導コース明細">
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

export default WS1398010_InsureGuideCourseDetail;
