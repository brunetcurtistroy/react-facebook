import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1570001_SubOptionSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'SUBオプション選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="sub-option-select">
        <Card title="SUBオプション選択">
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

          <Table>
            <Table.Column title="アイテム" dataIndex="" key="" />
            <Table.Column title="内容" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1570001_SubOptionSelect);
