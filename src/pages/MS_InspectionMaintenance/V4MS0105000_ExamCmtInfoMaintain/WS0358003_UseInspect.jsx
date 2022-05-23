import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS0358003_UseInspect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '使用検査';

    this.state = {
    };
  }

  render() {
    return (
      <div className="use-inspect">
        <Card title="使用検査">
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
            <Table.Column title="検査コード" dataIndex="" key="" />
            <Table.Column title="名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0358003_UseInspect);
