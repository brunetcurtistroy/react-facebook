import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1389001_DocumentClassifyInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00190:文章分類照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="document-classify-inquiry">
        <Card title="V4-TSB00190:文章分類照会">
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
            <Table.Column title="文章分類コード" dataIndex="" key="" />
            <Table.Column title="文章分類名" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1389001_DocumentClassifyInquiry);
