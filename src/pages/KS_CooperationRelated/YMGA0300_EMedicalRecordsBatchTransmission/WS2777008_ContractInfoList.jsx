import React from "react";
import { connect } from "react-redux";

import { Card, Table, Button } from "antd";

class WS2777008_ContractInfoList extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '契約情報一覧';

    this.state = {
    };
  }

  render() {
    return (
      <div className="contract-info-list">
        <Card title="契約情報一覧">
          <Table
            dataSource={[]}
            loading={false}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
              }
            }}
            rowKey={(record) => record.id}
          >
            <Table.Column title="種別" dataIndex="" />
            <Table.Column title="団体名" dataIndex="" />
            <Table.Column title="開始日" dataIndex="" />
            <Table.Column title="番号" dataIndex="" />
            <Table.Column title="略称" dataIndex="" />
            <Table.Column title="金額" dataIndex="" />
            <Table.Column title="最新" dataIndex="" />
          </Table>
          <Button type="primary" style={{ float: 'right', marginTop: '1em' }}>契約照会</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2777008_ContractInfoList);
