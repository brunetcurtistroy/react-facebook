import React from "react";
import { connect } from "react-redux";

import { Button, Card, Col, Row, Table, } from "antd";

class WS0282020_StyleQuery extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '様式照会';

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
      <div className="style-query">
        <Card title="様式照会">
          <Table
            dataSource={dataSource}
            loading={false}
            pagination={false}
            rowKey={(record) => record.key}
            className="mb-3"
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
              }
            }}
          >
            <Table.Column title="様式" dataIndex="Type"/>
            <Table.Column title="様　式　名" dataIndex="remarks"/>

          </Table>
          <Row gutter={24}>
            <Col span={24}>
              <Button type="primary" style={{float: "right"}}>選　択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0282020_StyleQuery);
