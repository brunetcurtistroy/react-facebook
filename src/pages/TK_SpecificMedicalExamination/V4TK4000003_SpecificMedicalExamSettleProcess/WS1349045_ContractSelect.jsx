import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1349045_ContractSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '契約選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="contract-select">
        <Card title="契約選択">
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
            <Table.Column title="契約番号" dataIndex="" key="" />
            <Table.Column title="契約名" dataIndex="" key="" />
            <Table.Column title="形態" dataIndex="" key="" />
            <Table.Column title="特定健診" dataIndex="" key="" />
            <Table.Column title="動機付" dataIndex="" key="" />
            <Table.Column title="積極的" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1349045_ContractSelect);
