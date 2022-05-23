import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS0282022_FindingInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '所見照会';

    this.state = {
    };
  }

  render() {
    const dataSource = [
      {
        key: '1',
        Type: 'Mike',
        age: 32,
        remarks: '10 Downing Street',
      },
      {
        key: '2',
        Type: 'John',
        age: 42,
        remarks: '20 stration Street',
      },
    ];

    return (
      <div className="finding-inquiry">
        <Card title="所見照会">
          <Table
            dataSource={dataSource}
            loading={false}
            pagination={false}
            rowKey={(record) => record.key}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
              }
            }}
          >
            <Table.Column title="連番" dataIndex="Type" />
            <Table.Column title="部位" dataIndex="age"  />
            <Table.Column title="所見" dataIndex="age"  />
            <Table.Column title="判定" dataIndex="remarks"  />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0282022_FindingInquiry);
