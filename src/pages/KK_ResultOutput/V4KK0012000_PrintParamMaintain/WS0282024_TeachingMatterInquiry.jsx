import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input, Row, Col, Checkbox, } from "antd";


class WS0282024_TeachingMatterInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '指導事項照会';

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
      <div className="teaching-matter-inquiry">
        <Card title="指導事項照会">
          <Form
            initialValues={{ check_field_1: true, check_field_2: true }}
          >
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
              <Table.Column title="F" dataIndex="Type" width={50} align="center" />
              <Table.Column title="L2" dataIndex="" width={50} align="center"
                render={() => (
                  <Form.Item
                    name="check_field_2"
                    valuePropName="checked"
                    style={{ marginBottom: "0" }}
                  >
                    <Checkbox ></Checkbox>
                  </Form.Item>
                )}
              />
              <Table.Column title="L3" dataIndex="age" width={50} align="center"
                render={() => (
                  <Form.Item
                    name="check_field_2"
                    valuePropName="checked"
                    style={{ marginBottom: "0" }}
                  >
                    <Checkbox ></Checkbox>
                  </Form.Item>
                )}
              />
              <Table.Column title="連番" dataIndex="" />
              <Table.Column title="ｺｰﾄﾞ" dataIndex="remarks" />
              <Table.Column title="指導ｺﾒﾝﾄ" dataIndex="remarks" />
            </Table>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name=""
                >
                  <Input.TextArea type="text" rows={5} disabled={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0282024_TeachingMatterInquiry);
