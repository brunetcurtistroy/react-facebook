import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1382001_ImplementorInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TSB00120:実施者照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="implementor-inquiry">
        <Card title="V4-TSB00120:実施者照会">
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
            <Table.Column title="カ　　ナ" dataIndex="" key="" />
            <Table.Column title="氏　　名" dataIndex="" key="" />
            <Table.Column title="資格" dataIndex="" key="" />
            <Table.Column title="実施機関" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1382001_ImplementorInquiry);
