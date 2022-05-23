import React from "react";
import { connect } from "react-redux";

import { Card, Col, Row, Table, Button, Form, Select, } from "antd";


class WS0377002_SameSurnameSameNameSameBirthDateSelectScreen extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '同姓/同名/同生年月日選択画面';

    this.state = {
      selectedRowTableFirst: [],
    };
  }

  handleSelectRowsTableFirst = selectedRowTableFirst => {
    console.log(selectedRowTableFirst);
    this.setState({ selectedRowTableFirst });
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

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
      <div className="same-surname-same-name-same-birth-date-select-screen">
        <Card title="同姓/同名/同生年月日選択画面">
          <Form>
            <Row gutter={16}>
              <Col span={24}>
                <p>下記に同姓/同名/同生年月日の方が存在します。</p>
              </Col>
            </Row>
            <Table
              pagination={false}
              dataSource={dataSource}
              rowKey="name"
              className="mb-3"
              bordered={true}
              rowSelection={{ type: "checkbox", ...rowSelectionTableFirst }}
            >
              <Table.Column title="個人番号" dataIndex="age" key="1"
                render={() => (
                  <div>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <span>10</span>
                    </Form.Item>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <span></span>
                    </Form.Item>
                  </div>
                )}
              />
              <Table.Column title="氏名" dataIndex="" key="2"
                render={() => (
                  <div>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <span>40</span>
                    </Form.Item>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <span>40</span>
                    </Form.Item>
                  </div>
                )}
              />
              <Table.Column title="生年月日" dataIndex="" key="3" align="center" width={100}
                render={() => (
                  <div>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <span>YYYY/MM/DD</span>
                    </Form.Item>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <Select onChange={this.handleChange}>
                        <Select.Option value="男">男</Select.Option>
                        <Select.Option value="女">女</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                )}
              />
              <Table.Column title="電話番号" dataIndex="" key="4"
                render={() => (
                  <div>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <span>20</span>
                    </Form.Item>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <span>20</span>
                    </Form.Item>
                  </div>
                )}
              />
              <Table.Column title="郵便番号" dataIndex="" key="5"
                render={() => (
                  <div>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <span>XXXXXXXX</span>
                    </Form.Item>
                    <Form.Item name="" style={{ marginBottom: "0" }}>
                      <span>120</span>
                    </Form.Item>
                  </div>
                )}
              />

            </Table>
            <Row gutter={16}>
              <Col span={24}>
                <Button type="primary" style={{ float: "right" }}>選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0377002_SameSurnameSameNameSameBirthDateSelectScreen);
