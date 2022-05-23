import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1445001_DunningPrint extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '督促状印刷';

    this.state = {
    };
  }

  render() {
    return (
      <div className="dunning-print">
        <Card title="督促状印刷">
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
            <Table.Column title="督促日" dataIndex="" key="" />
            <Table.Column title="督促内容" dataIndex="" key="" />
            <Table.Column title="発行" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1445001_DunningPrint);
