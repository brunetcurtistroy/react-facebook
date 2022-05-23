import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1318005_SerialNumberRef extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '連番参照';

    this.state = {
    };
  }

  render() {
    return (
      <div className="serial-number-ref">
        <Card title="連番参照">
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
            <Table.Column title="内部番号" dataIndex="" key="" />
            <Table.Column title="契約番号" dataIndex="" key="" />
            <Table.Column title="契  約  名  称" dataIndex="" key="" />
            <Table.Column title="契約形態" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1318005_SerialNumberRef);
