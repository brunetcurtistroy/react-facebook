import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Button, Card, Col, Form, Input, Row, Select, Table, Modal, } from "antd";
import WS0560001_GlobalEventRegisterCorrect from 'pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS0560001_GlobalEventRegisterCorrect.jsx';
import WS0540001_PeriodTimeDisplay from 'pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS0540001_PeriodTimeDisplay.jsx';
import { LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

class WS0542001_CalendarDetailDisplay extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'カレンダー詳細表示';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
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
      <div className="calendar-detail-display">
        <Card title="カレンダー詳細表示">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ text_field_1: "MM/DD" }}
          >
            <Row gutter={24}>
              <Col span={4}>
                <Form.Item
                  name=""
                  label="表示期間"
                >
                  <Select>
                    <Select.Option value="">1ヶ月</Select.Option>
                    <Select.Option value="">2ヶ月</Select.Option>
                    <Select.Option value="">3ヶ月</Select.Option>
                    <Select.Option value="">4ヶ月</Select.Option>
                    <Select.Option value="">5ヶ月</Select.Option>
                    <Select.Option value="">6ヶ月</Select.Option>
                    <Select.Option value="">7ヶ月</Select.Option>
                    <Select.Option value="">8ヶ月</Select.Option>
                    <Select.Option value="">9ヶ月</Select.Option>
                    <Select.Option value="">10ヶ月</Select.Option>
                    <Select.Option value="">11ヶ月</Select.Option>
                    <Select.Option value="">12ヶ月</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name=""
                  label="年月"
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name=""
                >
                  <Select>
                    <Select.Option value="">11月</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name=""
                  label="施設区分"
                >
                  <Select>
                    <Select.Option value=""></Select.Option>

                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="時間帯"
                >
                  <Button style={{ marginRight: '2px' }}>全日</Button>
                  <Button style={{ marginRight: '2px' }}>ＡＭ</Button>
                  <Button >ＰＭ</Button>
                </Form.Item>
              </Col>
            </Row>


            <Table
              pagination={false}
              dataSource={dataSource}
              rowKey="name"
              className="mb-3"
              bordered={true}
              rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
            >
              <Table.Column title="月/日" dataIndex="" key="" width={150}
                render={() => (
                  <Form.Item name="text_field_1" style={{ marginBottom: "0" }}>
                    <Input.Search type="text"
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1200,
                            component:
                              <WS0560001_GlobalEventRegisterCorrect
                                onClickedCreate={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });
                                }}
                              />
                            ,
                          },
                        });
                      }}
                    />
                  </Form.Item>
                )}
              />
              <Table.Column title="" dataIndex="" key=""
                render={() => (
                  <Form.Item name="" style={{ marginBottom: "0" }}>
                    <span>30</span>
                  </Form.Item>
                )}
              />
              <Table.Column title="件数" dataIndex="" key=""
                render={() => (
                  <Form.Item name="" style={{ marginBottom: "0" }}>
                    <span>4Z</span>
                  </Form.Item>
                )}
              />
              <Table.Column title="0001" dataIndex="" key=""
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
              <Table.Column title="0002" dataIndex="" key=""
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
              <Table.Column title="0003" dataIndex="" key=""
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
              <Table.Column title="0004" dataIndex="" key=""
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
              <Table.Column title="0005" dataIndex="" key=""
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
              <Table.Column title="0006" dataIndex="" key=""
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
              <Table.Column title="0007" dataIndex="" key=""
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
              <Table.Column title="0008" dataIndex="" key=""
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
              <Table.Column title="0009" dataIndex="" key=""
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
              <Table.Column title="0010" dataIndex="" key=""
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
              <Table.Column title="0011" dataIndex="" key=""
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
              <Table.Column title="0012" dataIndex="" key=""
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
              <Table.Column title="0013" dataIndex="" key=""
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
              <Table.Column title="0014" dataIndex="" key=""
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
              <Table.Column title="0015" dataIndex="" key=""
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
            <Row gutter={24}>
              <Col span={8}>
                <Row gutter={24}>
                  <Col span={10}>

                    <Button type="primary" style={{ float: "right" }}><LeftOutlined /></Button>
                    <Button type="primary" style={{ float: "right", marginRight: "10px" }}><DoubleLeftOutlined /></Button>
                  </Col>
                  <Col span={4}></Col>
                  <Col span={10}>
                    <Button type="primary" style={{ float: "left", marginRight: "10px" }}><RightOutlined /></Button>
                    <Button type="primary" style={{ float: "left" }}><DoubleRightOutlined /></Button>
                  </Col>
                </Row>
              </Col>
              <Col span={8}></Col>
              <Col span={8}>
                <Row gutter={24}>
                  <Col span={10}>

                    <Button type="primary" style={{ float: "right" }}><LeftOutlined /></Button>
                    <Button type="primary" style={{ float: "right", marginRight: "10px" }}><DoubleLeftOutlined /></Button>
                  </Col>
                  <Col span={4}></Col>
                  <Col span={10}>
                    <Button type="primary" style={{ float: "left", marginRight: "10px" }}><RightOutlined /></Button>
                    <Button type="primary" style={{ float: "left" }}><DoubleRightOutlined /></Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Button type="primary" style={{ float: "right" }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 500,
                        component:
                          <WS0540001_PeriodTimeDisplay
                            onClickedCreate={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />
                        ,
                      },
                    });
                  }}
                >時間帯</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0542001_CalendarDetailDisplay);
