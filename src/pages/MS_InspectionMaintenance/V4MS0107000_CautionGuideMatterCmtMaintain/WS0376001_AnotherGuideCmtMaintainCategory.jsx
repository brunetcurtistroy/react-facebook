import React from "react";
import { connect } from "react-redux";

import { Card, Table, Row, Col, Form, Select } from "antd";

class WS0376001_AnotherGuideCmtMaintainCategory extends React.Component {
  constructor(props) {
    super(props);

    // document.title = "カテゴリ別指導コメント保守";

    this.state = {};
  }

  render() {
    return (
      <div className="another-guide-cmt-maintain-category">
        <Card title="カテゴリ別指導コメント保守">
          <Row>
            <Col span={8}>
              <Table
                dataSource={[]}
                loading={false}
                pagination={false}
                rowKey={(record) => record.id}
                scroll={{ y: "323px" }}
              >
                <Table.Column title="ｶﾃｺﾞﾘｺｰﾄﾞ" dataIndex="category_code"  />
                <Table.Column title="ｶﾃｺﾞﾘ名称" dataIndex="category_name"  />
              </Table>
            </Col>
            <Col span={16}>
              <Form.Item name="TaxClassify" label="">
                <Select
                  style={{ width: 112 }}
                >
                  <Select.Option value={0}>消費税指定</Select.Option>
                  <Select.Option value={1}>外税</Select.Option>
                  <Select.Option value={2}>内税</Select.Option>
                  <Select.Option value={3}>非課税</Select.Option>
                </Select>
              </Form.Item>
              <Table
                dataSource={[]}
                loading={false}
                pagination={false}
                rowKey={(record) => record.id}
                scroll={{ y: "323px" }}
              >
                <Table.Column title="ｺｰﾄﾞ" dataIndex="comment_code"  />
                <Table.Column title=" ｺﾒﾝﾄ内容" dataIndex="comment_content"  />
                <Table.Column title="使用回数" dataIndex="number_of_times_of_use"  />
                <Table.Column title="最終使用日" dataIndex="last_used_on"  />
              </Table>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0376001_AnotherGuideCmtMaintainCategory);
