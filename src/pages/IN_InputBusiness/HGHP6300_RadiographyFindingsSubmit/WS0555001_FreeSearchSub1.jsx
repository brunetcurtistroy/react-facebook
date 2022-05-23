import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Checkbox, Button, Table, Row, Col, } from "antd";

const Grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const smGrid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class WS0555001_FreeSearchSub1 extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '空き検索SUB1';

    this.state = {
      selectedRowTableFirst: [],
    };
  }

  onFinish(values) {

  }

  onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
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
      <div className="free-search-sub1">
        <Card title="空き検索SUB1">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={16}>
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item
                      name=""
                      label="コース"
                      {...smGrid}
                    >
                      <Select>
                        <Select.Option value="男">男</Select.Option>
                        <Select.Option value="女">女</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={16}>
                    <Form.Item
                      label="検査"
                      {...smGrid}
                    >
                      <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                        <Row gutter={16}>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}></Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}></Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}></Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}></Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}></Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}>
                            <Checkbox value="123456">123456</Checkbox>
                          </Col>
                          <Col span={4}></Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={16}>
                      <Col span={10}>
                        <Form.Item
                          name=""
                          label="期間"
                          {...Grid}
                        >
                          <Input type="text" style={{marginLeft: "7px"}}/>
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ textAlign: 'center' }}>
                        <span style={{ lineHeight: "35px" }}>~</span>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          name=""
                        >
                          <Input type="text" />
                        </Form.Item>
                      </Col>
                    </Row>
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item
                      label="時間帯"
                      {...smGrid}
                    >
                      <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                        <Row gutter={16}>
                          <Col span={3}>
                            <Checkbox value="日">日</Checkbox>
                          </Col>
                          <Col span={3}>
                            <Checkbox value="月">月</Checkbox>
                          </Col>
                          <Col span={3}>
                            <Checkbox value="火">火</Checkbox>
                          </Col>
                          <Col span={3}>
                            <Checkbox value="水">水</Checkbox>
                          </Col>
                          <Col span={3}>
                            <Checkbox value="木">木</Checkbox>
                          </Col>
                          <Col span={3}>
                            <Checkbox value="金">金</Checkbox>
                          </Col>
                          <Col span={3}>
                            <Checkbox value="土">土</Checkbox>
                          </Col>
                          <Col span={3}></Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item
                      label="時間帯"
                      {...smGrid}
                    >
                      <Button style={{ marginRight: '2px' }}>全日</Button>
                      <Button style={{ marginRight: '2px' }}>ＡＭ</Button>
                      <Button >ＰＭ</Button>
                    </Form.Item>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item
                      name=""
                      label="施設"
                      {...smGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item
                      name=""
                      label="人数/日"
                      {...smGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}></Col>
                  <Col span={12}>
                    <Button type="primary" style={{ float: 'right' }}>抽出</Button>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Table
                  pagination={false}
                  dataSource={dataSource}
                  rowKey="name"
                  className="mb-3"
                  bordered={true}
                  rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
                >
                  <Table.Column title="日付" dataIndex="name" key="1" />
                  <Table.Column title="空き人数" dataIndex="address" key="2" />

                </Table>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Button type="primary" style={{ float: 'right' }}>予約</Button>
                <Button type="primary" style={{ float: "right", marginRight: "10px" }}>時間帯</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0555001_FreeSearchSub1);
