import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import {
  Card,
  Table,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Modal,
  Space,
} from "antd";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0302001_SetInfoSearch from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0302001_SetInfoSearch";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import WS0273001_VisitsTargetSearchQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0273001_VisitsTargetSearchQuery";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";

const styleInput = {
  background: "transparent",
  border: "none",
};

const hidden = {
  display: "none",
  marginBottom: "0",
};
class WS0971006_ItemDisplay extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "明細表示";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      Classification: null,
    };
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }

  onFinish(values) {}

  render() {
    return (
      <div className="item-display">
        <Card title="明細表示">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={24}>
              <Col xl={16} md={24} style={{ borderRight: "1px solid #d9d9d9" }}>
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>請求管理番号</label>
                  </Col>
                  <Col span={4} style={{ paddingRight: "5px" }}>
                    <Form.Item name="Li_BillingManageNum" label="">
                      <Input type="text" readOnly style={styleInput} />
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ paddingRight: "5px", paddingLeft: 0 }}>
                    <Form.Item name="Expression_14" label="">
                      <Input type="text" readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ paddingLeft: 0 }}>
                    <Form.Item name="Expression_15" label="">
                      <Input type="text" readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ textAlign: "right" }}>
                    <label>請求期間</label>
                  </Col>
                  <Col span={4} style={{ paddingRight: "5px" }}>
                    <Form.Item
                      name="consultation_start_date_on"
                      label=""
                    >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" disabled style={{width: '100%'}}/>
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{ paddingLeft: "0" }}>
                    <Form.Item name="consultation_end_date_on" label="~">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" disabled  style={{width: '100%'}}/>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>宛名</label>
                  </Col>
                  <Col span={20} style={{ paddingLeft: 0 }}>
                    <Form.Item name="according_to_destination_name" label="">
                      <Input type="text" readOnly style={styleInput} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>件名</label>
                  </Col>
                  <Col span={6} style={{ paddingRight: "5px" }}>
                    <Form.Item name="according_to_subject" label="">
                      <Input type="text" readOnly style={styleInput} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col xl={8} md={24}>
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>請求金額</label>
                  </Col>
                  <Col span={20}>
                    <Form.Item name="billing_price" label="">
                      <Input type="text" readOnly style={styleInput} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>備考</label>
                  </Col>
                  <Col span={20}>
                    <Form.Item name="remarks" label="">
                      <Input type="text" readOnly style={styleInput} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br></br>
            <Table
              dataSource={this.state.dataSource}
              loading={false}
              pagination={false}
              bordered={true}
              rowKey={(record) => record.id}
            >
              <Table.Column dataIndex="Expression_28" width={80} />
              <Table.Column
                title="連番"
                dataIndex="W2_item_sequential_num"
                width={120}
                render={(value, record) => {
                  return (
                    <Form.Item name="W2_item_sequential_num">
                      <Input
                        readOnly
                        type="number"
                        value={record.W2_item_sequential_num}
                        style={{ border: "none", background: "transparent" }}
                      />
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                title="区分"
                dataIndex="W2_item_sect"
                width={150}
                render={(value, record) => {
                  return (
                    <div>
                      <Form.Item name="W2_item_sect">
                        <Select
                          value={record.W2_item_sect}
                          style={{ width: "100%" }}
                          onChange={(value) => {
                            this.setFormFieldValue("W2_item_sect", value);
                            this.setState({ Classification: value });
                          }}
                        >
                          <Select.Option value={0}>ｺﾒﾝﾄ区切</Select.Option>
                          <Select.Option value={1}>セット</Select.Option>
                          <Select.Option value={3}>コース</Select.Option>
                          <Select.Option value={5}>コメント</Select.Option>
                          <Select.Option value={7}>明細無効</Select.Option>
                          <Select.Option value={9}>無効</Select.Option>
                          <Select.Option value={10}>区切</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  );
                }}
              />
              <Table.Column
                title="内容"
                render={(value, record) => {
                  return (
                    <div>
                      <Form.Item
                        name="W2_content"
                        style={{ marginBottom: "5px" }}
                      >
                        <Input
                          value={record.W2_content}
                          onDoubleClick={() => {
                            switch (
                              this.formRef.current?.getFieldValue(
                                "W2_item_sect"
                              )
                            ) {
                              case 0:
                              case 10:
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "60%",
                                    component: (
                                      <WS0247001_OfficeInfoRetrievalQuery
                                        onFinishScreen={(output) => {
                                          this.setFormFieldValue(
                                            "W2_content",
                                            output.Lo_Kanji_Name
                                          );

                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                                break;
                              case 1:
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 1000,
                                    component: (
                                      <WS0302001_SetInfoSearch
                                        onFinishScreen={(output) => {
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                                break;
                              case 3:
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "60%",
                                    component: (
                                      <WS0265001_BasicCourseInquiry
                                        onFinishScreen={(output) => {
                                          this.setFormFieldValue(
                                            "W2_content",
                                            output.Lo_CourseName
                                          );

                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                                break;
                              default:
                                break;
                            }
                          }}
                        />
                      </Form.Item>
                      <Row
                        gutter={24}
                        style={
                          this.state.Classification === 1 ||
                          this.state.Classification === 3 ||
                          this.state.Classification === 7 ||
                          this.state.Classification === 9
                            ? null
                            : hidden
                        }
                      >
                        <Col
                          span={8}
                          style={{ paddingLeft: 0, paddingRight: "5px" }}
                        >
                          <Form.Item
                            name="W2_consult_date_char"
                            style={{ marginBottom: "5px" }}
                          >
                            <VenusDatePickerCustom formRefDatePicker={this.formRef}
                              format="YYYY/MM/DD"
                              value={record.W2_consult_date_char}
                              onClick={() => {
                                switch (
                                  this.formRef.current?.getFieldValue(
                                    "W2_item_sect"
                                  )
                                ) {
                                  case 3:
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: "70%",
                                        component: (
                                          <WS0273001_VisitsTargetSearchQuery
                                            onFinishScreen={(output) => {
                                              // set data (noresult)

                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    });
                                    break;
                                  default:
                                    break;
                                }
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={{ paddingLeft: 0 }}>
                          <Form.Item
                            name="W2_full_name"
                            style={{ marginBottom: "5px" }}
                          >
                            <Input
                              type="text"
                              value={record.W2_full_name}
                              onDoubleClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "70%",
                                    component: (
                                      <WS0248001_PersonalInfoSearchQuery
                                        onFinishScreen={(output) => {
                                          // set data (noresult)

                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  );
                }}
              />
              <Table.Column
                title="税区分"
                width={150}
                render={(value, record) => {
                  return (
                    <Form.Item name="W2_tax_sect">
                      <Select
                        value={record.W2_tax_sect}
                        style={{ width: "100%" }}
                      >
                        <Select.Option value={0}>消費税指定</Select.Option>
                        <Select.Option value={1}>外税</Select.Option>
                        <Select.Option value={2}>内税</Select.Option>
                        <Select.Option value={3}>非課税</Select.Option>
                      </Select>
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                title="金額"
                width={120}
                render={(value, record) => {
                  return (
                    <div>
                      <Form.Item
                        name="W2_price_excluding_tax"
                        style={{ marginBottom: "5px" }}
                      >
                        <Input
                          readOnly
                          type="text"
                          value={record.W2_price_excluding_tax}
                          style={{ border: "none", background: "transparent" }}
                        />
                      </Form.Item>
                      <Form.Item name="W2_tax" style={{ marginBottom: "5px" }}>
                        <Input
                          readOnly
                          type="text"
                          value={record.W2_tax}
                          style={{ border: "none", background: "transparent" }}
                        />
                      </Form.Item>
                    </div>
                  );
                }}
              />
              <Table.Column
                title="人数"
                dataIndex="W2_person"
                width={100}
                render={(value, record) => {
                  return (
                    <Form.Item name="W2_person">
                      <Input
                        readOnly
                        type="number"
                        value={record.W2_person}
                        style={{ border: "none", background: "transparent" }}
                      />
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                title="合計額"
                dataIndex="W2_total_price"
                width={120}
                render={(value, record) => {
                  return (
                    <Form.Item name="W2_total_price">
                      <Input
                        readOnly
                        type="number"
                        value={record.W2_total_price}
                        style={{ border: "none", background: "transparent" }}
                      />
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                title="備考"
                dataIndex="W2_remark"
                render={(value, record) => {
                  return (
                    <Form.Item name="W2_remark">
                      <Input
                        readOnly
                        type="text"
                        value={record.W2_remark}
                        style={{ border: "none", background: "transparent" }}
                      />
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                width={100}
                render={(value, record) => {
                  return (
                    <Button type="primary" onClick={() => {}}>
                      展開
                    </Button>
                  );
                }}
              />
            </Table>
            <br></br>
            <Space style={{ float: "right" }}>
              <Button type="primary" onClick={() => {}}>
                展開
              </Button>
              <Button type="primary" onClick={() => {}}>
                縮小
              </Button>
            </Space>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            this.closeModal()
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0971006_ItemDisplay);
