import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Modal,
  DatePicker,
  Row,
  Col,
  Space,
} from "antd";

import WS0975001_BillingInquiry from "../V4BL0030000_BillingInquiry/WS0975001_BillingInquiry";
import WS0971006_ItemDisplay from "./WS0971006_ItemDisplay";
import  ModalDraggable  from "components/Commons/ModalDraggable";

// eslint-disable-next-line no-unused-vars
const styleLabel = {
  textAlign: "center",
  color: "#fff",
  fontWeight: "bold",
  padding: "5px 10px",
  background: "#51acff",
};
class WS0966001_BillingDataCopy extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "請求データ複写";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish(values) {}

  render() {
    return (
      <div className="billing-data-copy">
        <Card title="請求データ複写">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={24}>
              <Col span={12}>
                <Row gutter={24}>
                  <Col span={4} style={{ paddingRight: "5px" }}>
                    <div style={styleLabel}>請求管理番号</div>
                  </Col>
                  <Col span={5} style={{ paddingLeft: "0" }}>
                    <Form.Item name="BillingManageNum">
                      <Input
                        type="number"
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "70%",
                              component: (
                                <WS0975001_BillingInquiry
                                Li_ProcessDivision = {3}
                                Li_IdentifyInitialDisplay = {this.formRef.current?.getFieldValue('Identify')}
                                Li_PayRemainingInitialDisplay = {0}
                                Li_OutstandingInitialDisplay = {1}

                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "BillingManageNum",
                                      output.Lo_BillingManageNum
                                    );
                                    this.setFormFieldValue(
                                      "Identify",
                                      output.Lo_Identify
                                    );

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
                  <Col span={4} style={{ paddingRight: "5px" }}>
                    <div style={styleLabel}>請求先区分</div>
                  </Col>
                  <Col span={5} style={{ paddingLeft: "0" }}>
                    <Form.Item name="Identify">
                      <Select>
                        <Select.Option value={4}>保険者</Select.Option>
                        <Select.Option value={5}>事業所</Select.Option>
                        <Select.Option value={6}>他団体</Select.Option>
                        <Select.Option value={9}>個人未収</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>宛名</label>
                  </Col>
                  <Col span={20}>
                    <Form.Item name="according_to_destination_name">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col
                    span={4}
                    style={{
                      textAlign: "right",
                      alignSelf: "center",
                      paddingBottom: "15px",
                    }}
                  >
                    <label>送付先</label>
                  </Col>
                  <Col span={20}>
                    <Form.Item name="according_to_destination_zip_co" label="">
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item name="according_to_destination_addres" label="">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label></label>
                  </Col>
                  <Col span={20}>
                    <Form.Item name="according_to_destination_addres" label="">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>件名</label>
                  </Col>
                  <Col span={20}>
                    <Form.Item name="according_to_subject">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>備考</label>
                  </Col>
                  <Col span={20}>
                    <Form.Item name="remarks">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>請求番号</label>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="BillingManageNum">
                      <Input
                        type="text"
                        readOnly
                        style={{ background: "transparent", border: "none" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>請求日</label>
                  </Col>
                  <Col span={20}>
                    <Form.Item name="billing_date_on">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>請求年月</label>
                  </Col>
                  <Col span={20}>
                    <Form.Item name="billing_year_month_on">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>請求期間</label>
                  </Col>
                  <Col span={6} style={{ paddingRight: "5px" }}>
                    <Form.Item name="consultation_start_date_on">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ paddingLeft: "0" }}>
                    <Form.Item name="consultation_end_date_on" label="~">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>税計算単位</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="consumption_tax_calculation_uni">
                      <Select>
                        <Select.Option value={0}>明細</Select.Option>
                        <Select.Option value={1}>合計</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>税円未満</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="less_than_consumption_tax_circl">
                      <Select>
                        <Select.Option value={0}>四捨五入</Select.Option>
                        <Select.Option value={1}>切捨</Select.Option>
                        <Select.Option value={2}>切上</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <label>税区分</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="consumption_tax_division">
                      <Select>
                        <Select.Option value={0}>消費税指定</Select.Option>
                        <Select.Option value={1}>外税</Select.Option>
                        <Select.Option value={2}>内税</Select.Option>
                        <Select.Option value={3}>非課税</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={24} style={{ float: "right" }}>
              <Col span={8}>
                <Form.Item name="billing_consumption_tax" label="税">
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="billing_price" label="請求金額">
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="deposit_price" label="入金額">
                  <Input
                    type="number"
                    readOnly
                    style={{ background: "transparent", border: "none" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <Space style={{ float: "right" }}>
              <Form.Item>
                <Button type="primary">取消</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary">検索</Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: "70%",
                        component: (
                          <WS0971006_ItemDisplay
                            onFinishScreen={(output) => {
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    });
                  }}
                >
                  明細表示
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary">実行</Button>
              </Form.Item>
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
)(WS0966001_BillingDataCopy);
