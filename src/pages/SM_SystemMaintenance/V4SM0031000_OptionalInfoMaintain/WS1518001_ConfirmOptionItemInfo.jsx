import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS1518001_ConfirmOptionItemInfo extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'オプションアイテム情報確認';

    this.state = {
    };
  }

  render() {
    return (
      <div className="confirm-option-item-info">
        <Card title="オプションアイテム情報確認">
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
            <Table.Column title="項目" dataIndex="" key="" />
            <Table.Column title="内容" dataIndex="" key="" />
            <Table.Column title="アイテム制限" dataIndex="" key="" />
            <Table.Column title="状態" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1518001_ConfirmOptionItemInfo);
