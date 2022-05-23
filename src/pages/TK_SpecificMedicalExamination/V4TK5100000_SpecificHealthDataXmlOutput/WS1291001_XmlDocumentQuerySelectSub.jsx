import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1291001_XmlDocumentQuerySelectSub extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'XML帳票照会選択SUB';

    this.state = {
    };
  }

  render() {
    return (
      <div className="xml-document-query-select-sub">
        <Card title="XML帳票照会選択SUB">
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
            <Table.Column title="FORMAT" dataIndex="" key="" />
            <Table.Column title="帳  票  名" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1291001_XmlDocumentQuerySelectSub);
