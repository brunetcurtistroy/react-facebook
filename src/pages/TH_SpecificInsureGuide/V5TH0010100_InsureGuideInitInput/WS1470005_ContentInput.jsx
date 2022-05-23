import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1470005_ContentInput extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '内容入力';

    this.state = {
    };
  }

  render() {
    return (
      <div className="content-input">
        <Card title="内容入力">
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
            <Table.Column title="表示順" dataIndex="" key="" />
            <Table.Column title="文章コード" dataIndex="" key="" />
            <Table.Column title="内　　容" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1470005_ContentInput);
