import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1519002_OptionTypeSetting extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'オプション種別設定';

    this.state = {
    };
  }

  render() {
    return (
      <div className="option-type-setting">
        <Card title="オプション種別設定">
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
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="種別" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="オプションコード" dataIndex="" key="" />
            <Table.Column title="識別名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1519002_OptionTypeSetting);
