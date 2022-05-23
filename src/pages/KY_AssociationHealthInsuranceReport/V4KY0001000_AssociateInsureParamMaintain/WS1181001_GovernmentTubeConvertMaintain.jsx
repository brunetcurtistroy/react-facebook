import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1181001_GovernmentTubeConvertMaintain extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS06000:政管変換保守';

    this.state = {
    };
  }

  render() {
    return (
      <div className="government-tube-convert-maintain">
        <Card title="V4-VNS06000:政管変換保守">
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
            <Table.Column title="検査名称" dataIndex="" key="" />
            <Table.Column title="検査値" dataIndex="" key="" />
            <Table.Column title="変換後" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1181001_GovernmentTubeConvertMaintain);
