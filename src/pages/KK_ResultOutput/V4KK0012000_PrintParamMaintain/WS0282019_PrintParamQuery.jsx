import React from "react";
import { connect } from "react-redux";

import { Card, Table, Row, Col, Form, Input, } from "antd";


class WS0282019_PrintParamQuery extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '印刷パラメータ照会';

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
      <div className="print-param-query">
        <Card title="印刷パラメータ照会">
          <Form>
            <Table
              dataSource={dataSource}
              loading={false}
              pagination={false}
              bordered={true}
              rowKey={(record) => record.key}
              className="mb-3"
              rowSelection={{
                type: 'radio',
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log('selectedRows: ', selectedRows);
                }
              }}
            >
              <Table.Column title="No" dataIndex="Type" />
              <Table.Column title="名　　称" dataIndex="remarks" />
              <Table.Column title="指示" dataIndex="Type" />
              <Table.Column title="....+....1....+....2....+....3....+....4....<....5....+....6....+....7....+....8....+....9<...+....0" dataIndex="remarks" />
            </Table>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name=""
                >
                  <Input.TextArea type="text" rows={5} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0282019_PrintParamQuery);
