import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1583001_SubFileList extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'SUBファイル一覧';

    this.state = {
    };
  }

  render() {
    return (
      <div className="sub-file-list">
        <Card title="SUBファイル一覧">
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
            <Table.Column title="ファイル名" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1583001_SubFileList);
