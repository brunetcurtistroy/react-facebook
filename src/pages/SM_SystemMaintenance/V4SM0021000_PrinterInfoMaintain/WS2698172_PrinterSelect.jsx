import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS2698172_PrinterSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'プリンタ選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="printer-select">
        <Card title="プリンタ選択">
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
            <Table.Column title="" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2698172_PrinterSelect);
