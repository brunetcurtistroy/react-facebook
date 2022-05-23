import React from "react";
import { connect } from "react-redux";

import { Card, Form, Checkbox, Table, Row, Col, Input, } from "antd";

class WS0540001_PeriodTimeDisplay extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '時間帯表示';

    this.state = {
      selectedRowTableFirst: [],
    };
  }

  onFinish(values) {

  }

  handleSelectRowsTableFirst = selectedRowTableFirst => {
    console.log(selectedRowTableFirst);
    this.setState({ selectedRowTableFirst });
  };

  render() {
    const { selectedRowTableFirst } = this.state

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst
    }

    const dataSource = [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
    ];

    return (
      <div className="period-time-display">
        <Card title="時間帯表示">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              pagination={false}
              dataSource={dataSource}
              rowKey="name"
              className="mb-3"
              bordered={true}
              rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
            >
              <Table.Column title="時間帯" dataIndex="" key="1"
                render={() => (
                  <Form.Item name="" style={{ marginBottom: "0" }}>
                    <span>1HH:MM</span>
                  </Form.Item>
                )}
              />
              <Table.Column title="人数" dataIndex="" key="2" 
                render={() => (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="" style={{ marginBottom: "0" }}>
                        <Input type="text"></Input>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="" style={{ marginBottom: "0" }}>
                        <span>3Z</span>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              />

            </Table>

            <Row gutter={16}>
              <Col span={18}></Col>
              <Col span={6} >
                <Form.Item
                  name=""
                  label="詳細表示"
                  valuePropName="checked" 
                >
                  <Checkbox></Checkbox>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0540001_PeriodTimeDisplay);
