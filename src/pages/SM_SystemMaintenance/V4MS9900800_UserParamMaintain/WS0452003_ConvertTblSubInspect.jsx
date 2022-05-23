import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS0452003_ConvertTblSubInspect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '変換テーブルSUB[検査]';

    this.state = {
    };
  }

  render() {
    return (
      <div className="convert-tbl-sub-inspect">
        <Card title="変換テーブルSUB[検査]">
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
            <Table.Column title="検査結果変換" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0452003_ConvertTblSubInspect);
