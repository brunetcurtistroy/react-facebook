import React from "react";
import { connect } from "react-redux";

import { Card, Col, Row, Table, Tree, Button, Form, Input, Modal } from "antd";
import { DownOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS1492011_EasyBasicDataSet from 'pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS1492011_EasyBasicDataSet.jsx';

class WS1492001_SpecificDatePeriodTimePeopleNumSet extends React.Component {

  constructor(props) {
    super(props);

    // document.title = '特定日時間帯人数設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRowTableFirst: [],
      selectedRowTableSecond: [],
    };
  }

  handleSelectRowsTableFirst = selectedRowTableFirst => {
    console.log(selectedRowTableFirst);
    this.setState({ selectedRowTableFirst });
  };

  handleSelectRowsTableSecond = selectedRowTableSecond => {
    console.log(selectedRowTableSecond);
    this.setState({ selectedRowTableSecond });
  };

  render() {
    const { selectedRowTableFirst } = this.state

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst
    }

    const rowSelectionTableSecond = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableSecond
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

    const treeData = [
      {
        title: 'parent 1',
        key: '0-0',
        children: [
          {
            title: 'parent 1-0',
            key: '0-0-0',
            children: [
              {
                title: 'leaf',
                key: '0-0-0-0',
              },
              {
                title: 'leaf',
                key: '0-0-0-1',
              },
              {
                title: 'leaf',
                key: '0-0-0-2',
              },
            ],
          },
          {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [
              {
                title: 'leaf',
                key: '0-0-1-0',
              },
            ],
          },
          {
            title: 'parent 1-2',
            key: '0-0-2',
            children: [
              {
                title: 'leaf',
                key: '0-0-2-0',
              },
              {
                title: 'leaf',
                key: '0-0-2-1',
              },
            ],
          },
        ],
      },
    ]
    return (
      <div className="specific-date-period-time-people-num-set">
        <Card title="特定日時間帯人数設定">
          <Form
            initialValues={{ text_label_1: "特定日" }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Row gutter={24}>
                  <Col span={2} style={{ padding: "0" }}>
                    <Form.Item
                      name="text_label_1"
                    >
                      <Input type="text" style={{ backgroundColor: "#1890ff", color: "#ffffff" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ padding: "0" }}>
                    <Form.Item
                      name=""
                    >
                      <Input.Search type="text"
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component:
                                <WS1492011_EasyBasicDataSet
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
                  </Col>
                  <Col span={16}></Col>
                </Row>
              </Col>
              <Col span={12}>
                <Button style={{ float: "right" }}>簡単設定</Button>
                <Button type="primary" style={{ float: "right", marginRight: "10px" }}>リカバリ</Button>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Tree
                  showLine
                  switcherIcon={<DownOutlined />}
                  defaultExpandedKeys={['0-0-0']}
                  onSelect={this.onSelect}
                  treeData={treeData}
                />
              </Col>
              <Col span={16}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Table
                      pagination={false}
                      dataSource={dataSource}
                      rowKey="name"
                      className="mb-3"
                      bordered={true}
                      rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
                    >
                      <Table.Column title="時間帯" dataIndex="age" key="1" />
                      <Table.Column title="制限人数" dataIndex="name" key="2" />
                      <Table.Column title="チェック時間帯" dataIndex="address" key="3" />

                    </Table>
                  </Col>
                  <Col span={12}>
                    <Table
                      pagination={false}
                      dataSource={dataSource}
                      rowKey="name"
                      className="mb-3"
                      bordered={true}
                      rowSelection={{ type: "radio", ...rowSelectionTableSecond }}
                    >
                      <Table.Column title="時間帯" dataIndex="age" key="1" />
                      <Table.Column title="制限人数" dataIndex="name" key="2" />
                      <Table.Column title="チェック時間帯" dataIndex="address" key="3" />

                    </Table>
                  </Col>
                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1492001_SpecificDatePeriodTimePeopleNumSet);
