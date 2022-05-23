import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1226007_CorrectSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '訂正選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="correct-select">
        <Card title="訂正選択">
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
            <Table.Column title="SEQ" dataIndex="" key="" />
            <Table.Column title="健診機関" dataIndex="" key="" />
            <Table.Column title="健診区分" dataIndex="" key="" />
            <Table.Column title="区分" dataIndex="" key="" />
            <Table.Column title="氏名" dataIndex="" key="" />
            <Table.Column title="本人・配偶者" dataIndex="" key="" />
            <Table.Column title="生年月日" dataIndex="" key="" />
            <Table.Column title="性別" dataIndex="" key="" />
            <Table.Column title="保険者番号" dataIndex="" key="" />
            <Table.Column title="保険記号[記号]" dataIndex="" key="" />
            <Table.Column title="保険記号[符号]" dataIndex="" key="" />
            <Table.Column title="健保番号" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1226007_CorrectSelect);
