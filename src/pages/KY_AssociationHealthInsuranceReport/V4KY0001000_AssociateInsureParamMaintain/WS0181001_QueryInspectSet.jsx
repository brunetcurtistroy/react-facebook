import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS0181001_QueryInspectSet extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS71400:照会:検査セット';

    this.state = {
    };
  }

  render() {
    return (
      <div className="query-inspect-set">
        <Card title="V4-VNS71400:照会:検査セット">
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
            <Table.Column title="セット名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0181001_QueryInspectSet);
