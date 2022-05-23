import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS0262068_UserChoice extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'ユーザー選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="user-choice">
        <Card title="ユーザー選択">
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
            <Table.Column title="名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0262068_UserChoice);
