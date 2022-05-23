import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Checkbox, Table, Row, Col, Modal, } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import WS3020054_StyleQuery from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS3020054_StyleQuery.jsx';
import WS0273001_VisitsTargetSearchQuery from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0273001_VisitsTargetSearchQuery.jsx';

const grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class WS0282001_StyleSpecificInspectInquiry extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '様式別検査照会';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  onFinish(values) {

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
      <div className="style-specific-inspect-inquiry">
        <Card title="様式別検査照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ text_field_2: "4" }}
          >
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item
                  name=""
                  label="予約番号"
                >
                  <Input.Search type="text"
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1600,
                          component:
                            <WS0273001_VisitsTargetSearchQuery
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
              <Col span={2} style={{ padding: "0" }}>
                <Form.Item
                  name=""
                >
                  <span>####/##/##Z</span>
                </Form.Item>
              </Col>
              <Col span={2} style={{ paddingLeft: "0" }}>
                <Form.Item
                  name=""
                  style={{ textAlign: "right" }}
                >
                  <span>6Z</span>
                </Form.Item>
              </Col>
              <Col span={2} style={{ padding: "0" }}>
                <Form.Item
                  name="text_field_1"
                >
                  <Button type="text" style={{ textAlign: "center", backgroundColor: "#1890ff", color: "#ffffff", borderRadius: "10px", width: "70%" }} >####</Button>
                </Form.Item>
              </Col>
              <Col span={2} style={{ padding: "0" }}>
                <Form.Item
                  name=""
                >
                  <span>10</span>
                </Form.Item>
              </Col>
              <Col span={1}>
                <Form.Item
                  name="text_field_2"
                >
                  <Input type="text" style={{ textAlign: "center", backgroundColor: "blue", color: "#ffffff" }} />
                </Form.Item>
              </Col>
              <Col span={2} style={{ padding: "0" }}>
                <Form.Item
                  name=""
                >
                  <span>JYY/MM/DDZ</span>
                </Form.Item>
              </Col>
              <Col span={2} style={{ padding: "0" }}>
                <Form.Item
                  name=""
                >
                  <span>3番Z</span>
                </Form.Item>
              </Col>
              <Col span={2} style={{ padding: "0" }}>
                <Form.Item
                  name=""
                >
                  <span>14</span>
                </Form.Item>
              </Col>
              <Col span={3} style={{ padding: "0" }}>
                <Form.Item
                  name=""
                >
                  <span>80</span>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={4}>
                <Form.Item
                  name=""
                  label="様式"
                  {...grid}
                >
                  <Input.Search type="text" style={{ marginLeft: "5px" }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component:
                            <WS3020054_StyleQuery
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
              <Col span={2}>
                <Form.Item
                  name=""
                >
                  <span>50</span>
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={2} style={{ padding: "0", textAlign: "right" }}>
                <Form.Item
                  name=""
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  name=""
                >
                  <span>60</span>
                </Form.Item>
              </Col>
              <Col span={7}></Col>
              <Col span={2}>
                <Form.Item
                  name=""
                >
                  <span>10Z</span>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  name=""
                >
                  <span>80</span>
                </Form.Item>
              </Col>

            </Row>


          </Form>

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
            <Table.Column title="連番" dataIndex="age" />
            <Table.Column title="今回" dataIndex="" />
            <Table.Column title="名称" dataIndex="" />
            <Table.Column title="指示" dataIndex="Type" />
            <Table.Column title="G判" dataIndex="" />
            <Table.Column title="基準値" dataIndex="" />
            <Table.Column title="結果値" dataIndex="" key="" />
            <Table.Column title="K判" dataIndex="remarks" key="" />
            <Table.Column
              render={() => (
                <Button
                  icon={<MoreOutlined />}
                  style={{
                    display: "inline-block",
                  }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 800,
                        component:
                          <WS3020054_StyleQuery
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
                ></Button>
              )}
            />
          </Table>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0282001_StyleSpecificInspectInquiry);
