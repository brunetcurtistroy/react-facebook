import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Form, Input } from "antd";
class WS0406004_PrintParam extends React.Component {
  static propTypes = {
    Li_StyleCode: PropTypes.string,
    Li_History: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '印刷パラメータ';

    this.state = {
    };
  }

  render() {
    return (
      <div className="print-param">
        <Card title="印刷パラメータ">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row>
              <Col span={12}>
                <Form.Item name="Expression_9" style={{ marginBottom: '0px' }}><Input readOnly /></Form.Item>
                <Table
                  bordered={true}
                  dataSource={[]}
                  loading={false}
                  pagination={false}
                  scroll={{ y: true }}
                  rowKey={(record) => record.id}
                // rowSelection={{
                //   type: 'checkbox',
                //   onChange: (selectedRowKeys, selectedRows) => {
                //     console.log('selectedRows: ', selectedRows);
                //   }
                // }}
                >
                  <Table.Column title="連番" dataIndex="rec_record_number" />
                  <Table.Column title="指示" dataIndex="rec_indication_division" />
                  <Table.Column title="様式名" dataIndex="rec_format_name" />
                  <Table.Column title="パラメータ" dataIndex="rec_parameters" />
                </Table>
                <Form.Item name="rec_remarks">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="Expression_10" style={{ marginBottom: '0px' }}><Input readOnly /></Form.Item>
                <Table
                  bordered={true}
                  dataSource={[]}
                  loading={false}
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ y: true }}
                >
                  <Table.Column title="連番" dataIndex="record_number" />
                  <Table.Column title="指示" dataIndex="instruction_division" />
                  <Table.Column title="様式名" dataIndex="format_name" />
                  <Table.Column title="パラメータ" dataIndex="parameters" />
                </Table>
                <Form.Item name="remarks">
                  <Input readOnly />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0406004_PrintParam);
