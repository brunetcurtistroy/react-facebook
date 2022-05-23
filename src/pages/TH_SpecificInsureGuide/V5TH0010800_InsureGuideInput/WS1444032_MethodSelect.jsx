import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1444032_MethodSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '方法選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="method-select">
        <Card title="方法選択">
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
            <Table.Column title="方法" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1444032_MethodSelect);
