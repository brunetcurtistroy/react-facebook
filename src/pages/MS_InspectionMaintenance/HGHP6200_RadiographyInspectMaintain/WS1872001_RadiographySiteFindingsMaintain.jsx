import React from "react";
import { connect } from "react-redux";

import { Card, Table, Row, Col } from "antd";

class WS1872001_RadiographySiteFindingsMaintain extends React.Component {
  constructor(props) {
    super(props);

    // document.title = "読影部位所見保守";

    this.state = {};
  }

  render() {
    return (
      <div className="radiography-site-findings-maintain">
        <Card title="読影部位所見保守">
          <Row gutter={24}>
            <Col span={6}>
              <Table>
                <Table.Column title="ｺｰﾄﾞ" dataIndex="" key="" />
                <Table.Column title="部位2" dataIndex="" key="" />
                <Table.Column title="SEQ" dataIndex="" key="" />
                <Table.Column title="所見分類2" dataIndex="" key="" />
              </Table>
            </Col>
            <Col span={6}>
              <Table>
                <Table.Column title="ｺｰﾄﾞ" dataIndex="" key="" />
                <Table.Column title="部位2" dataIndex="" key="" />
                <Table.Column title="判定" dataIndex="" key="" />
                <Table.Column title="正常" dataIndex="" key="" />
                <Table.Column title="SEQ" dataIndex="" key="" />
                <Table.Column title="所見分類3" dataIndex="" key="" />
              </Table>
            </Col>
            <Col span={6}>
              <Table>
                <Table.Column title="ｺｰﾄﾞ" dataIndex="findings_code" key="" />
                <Table.Column title="所見1" dataIndex="findings_name" key="" />
                <Table.Column title="判定" dataIndex="judgement" key="" />
                <Table.Column title="正常" dataIndex="normal_value_flag" key="" />
                <Table.Column title="SEQ" dataIndex="findings_classification_io" key="" />
                <Table.Column title="所見分類3" dataIndex="findings_classification_io" key="" />
              </Table>
            </Col>
            <Col span={6}>
              <Table>
                <Table.Column title="ｺｰﾄﾞ" dataIndex="findings_code" key="" />
                <Table.Column title="所見2" dataIndex="findings_name" key="" />
                <Table.Column title="判定" dataIndex="judgement" key="" />
                <Table.Column title="正常" dataIndex="normal_value_flag" key="" />
                <Table.Column title="SEQ" dataIndex="display_order" key="" />
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
)(WS1872001_RadiographySiteFindingsMaintain);
