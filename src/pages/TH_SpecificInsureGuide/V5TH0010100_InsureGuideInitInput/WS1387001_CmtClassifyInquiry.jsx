import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1387001_CmtClassifyInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00170:コメント区分照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="cmt-classify-inquiry">
        <Card title="V4-TSB00170:コメント区分照会">
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
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="画面内容" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1387001_CmtClassifyInquiry);
