import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS1569001_SubVariableSettingScreen extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'SUB変数設定画面';

    this.state = {
    };
  }

  render() {
    return (
      <div className="sub-variable-setting-screen">
        <Card title="SUB変数設定画面">
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

          <Table>
            <Table.Column title="変数コード" dataIndex="" key="" />
            <Table.Column title="名 称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1569001_SubVariableSettingScreen);
