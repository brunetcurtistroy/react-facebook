import React from "react";
import { connect } from "react-redux";

import { Card, Col, Form, Input, Row, Table } from "antd";

class WS0350001_SiteFindingsMaintainSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "部位所見保守SUB";

    this.state = {};
  }

  onFinish(values) {}

  render() {
    return (
      <div className="site-findings-maintain-sub">
        <Card title="部位所見保守SUB">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
              <Form.Item name="Lio_SiteClassify" label="所見分類">
                <Input type="text" style={{ width: "100px" }} />
              </Form.Item>
              <span
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  width: "300px",
                }}
              >
                Test data
              </span>
              <Form.Item name="Lio_CommonCategory" label="地域老人保健分類">
                <Input type="text" style={{ width: "100px" }} />
              </Form.Item>
            </Row>
          </Form>
          <Row gutter={10}>
            <Col span={10}>
              <Table>
                <Table.Column title="ｺｰﾄﾞ" dataIndex="site_code" key="" />
                <Table.Column title="検索略名" dataIndex="search_short_name" key="" />
                <Table.Column title="部位名称" dataIndex="site_name" key="" />
              </Table>
            </Col>
            <Col span={14}>
              <Table>
                <Table.Column title="ｺｰﾄﾞ" dataIndex="findings_code" key="" />
                <Table.Column title="検索略名" dataIndex="search_short_name" key="" />
                <Table.Column title="所見名称" dataIndex="findings_name" key="" />
                <Table.Column title="判定" dataIndex="judgment_value" key="" />
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
)(WS0350001_SiteFindingsMaintainSub);
