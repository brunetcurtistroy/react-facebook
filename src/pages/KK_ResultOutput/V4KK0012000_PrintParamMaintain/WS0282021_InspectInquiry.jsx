import React from "react";
import { connect } from "react-redux";

import { Card, Table, Row, Col, Button, } from "antd";

class WS0282021_InspectInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '検査照会';

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
      <div className="inspect-inquiry">
        <Card title="検査照会">
          <Table
            dataSource={dataSource}
            loading={false}
            pagination={false}
            className="mb-3"
            rowKey={(record) => record.key}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
              }
            }}
          >
            <Table.Column title="連番" dataIndex="Type" />
            <Table.Column title="今回" dataIndex="" />
            <Table.Column title="カテゴリ" dataIndex="age" />
            <Table.Column title="カテゴリ名称" dataIndex="" />
            <Table.Column title="判定" dataIndex="" />
            <Table.Column title="コード" dataIndex="" />
            <Table.Column title="検査名称" dataIndex="" />
            <Table.Column title="基準値" dataIndex="" />
            <Table.Column title="結果値" dataIndex="remarks" />
            <Table.Column title="単位" dataIndex="" />
            <Table.Column title="判定" dataIndex="" />

          </Table>
          <Row gutter={24}>
            <Col span={24}>
              <Button type="primary" style={{float: "right"}}>履歴切替</Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0282021_InspectInquiry);
