import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1390001_ImplementClassifyInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00200:実施区分照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="implement-classify-inquiry">
        <Card title="V4-TSB00200:実施区分照会">
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
            <Table.Column title="実施区分コード" dataIndex="" key="" />
            <Table.Column title="実施区分" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1390001_ImplementClassifyInquiry);
