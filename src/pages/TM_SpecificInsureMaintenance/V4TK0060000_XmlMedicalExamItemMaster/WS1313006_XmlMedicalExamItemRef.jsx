import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1313006_XmlMedicalExamItemRef extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'XML用健診項目参照';

    this.state = {
    };
  }

  render() {
    return (
      <div className="xml-medical-exam-item-ref">
        <Card title="XML用健診項目参照">
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
            <Table.Column title="順番号" dataIndex="" key="" />
            <Table.Column title="項目コード" dataIndex="" key="" />
            <Table.Column title="結果識別" dataIndex="" key="" />
            <Table.Column title="厚労省項目名" dataIndex="" key="" />
            <Table.Column title="方法コード" dataIndex="" key="" />
            <Table.Column title="検査方法" dataIndex="" key="" />
            <Table.Column title="ＸＭＬ表示名" dataIndex="" key="" />
            <Table.Column title="データタイプ" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1313006_XmlMedicalExamItemRef);
