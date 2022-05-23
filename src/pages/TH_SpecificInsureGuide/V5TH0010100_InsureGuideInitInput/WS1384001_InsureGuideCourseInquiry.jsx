import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS1384001_InsureGuideCourseInquiry extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00140:保健指導コース照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="insure-guide-course-inquiry">
        <Card title="V4-TSB00140:保健指導コース照会">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1384001_InsureGuideCourseInquiry);
