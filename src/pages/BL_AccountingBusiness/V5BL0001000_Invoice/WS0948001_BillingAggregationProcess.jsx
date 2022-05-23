import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Table,
  Menu,
  Row,
  Col,
  DatePicker,
  Space,
  Modal,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";
import WS2786001_ConditionAddSub from "pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import WS0963001_InvoiceMaintain from "../V4BL0031000_DepositWithdrawalInquiry/WS0963001_InvoiceMaintain";

class WS0948001_BillingAggregationProcess extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Ctxgetname: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "請求集計処理";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [{ id: 1 }],
      AggregateSpecifiedState: null,
      showOffice: false,
      showInsurer: false,
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

  checkSelected(value) {
    if (value === 4) {
      this.setState({
        showOffice: false,
        showInsurer: true,
      });
      this.setFormFieldValue("OfficeCode", "");
      this.setFormFieldValue("BranchCodeStart", "");
      this.setFormFieldValue("office_kanji_name", "");
    } else {
      if (value === 5) {
        this.setState({
          showOffice: true,
          showInsurer: false,
        });
        this.setFormFieldValue("InsurerCode", "");
        this.setFormFieldValue("insurer_kanji_name", "");
      } else {
        this.setState({
          showOffice: false,
          showInsurer: false,
        });
        this.setFormFieldValue("OfficeCode", "");
        this.setFormFieldValue("BranchCodeStart", "");
        this.setFormFieldValue("office_kanji_name", "");
        this.setFormFieldValue("InsurerCode", "");
        this.setFormFieldValue("insurer_kanji_name", "");
      }
    }
  }

  onFinish(values) {}

  render() {
    const current = this.state.current;
    return (
      <div className="billing-aggregation-process">
        <Card title="請求集計処理">
          <Menu
            selectedKeys={[current]}
            mode="horizontal"
            style={{ marginBottom: "10px" }}
          >
            <Menu.Item
              key="条件追加"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 650,
                    component: (
                      <WS2786001_ConditionAddSub
                        Li_DateF={""}
                        Li_DateT={""}
                        Li_CourseF={""}
                        Li_CourseT={""}
                        Li_Insurer={""}
                        Li_Office={""}
                        Li_BranchShop={""}
                        onFinishScreen={(output) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              条件追加
            </Menu.Item>
            <Menu.Item key="作成">作成</Menu.Item>
          </Menu>

          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={24}>
              <Col
                span={5}
                style={{
                  marginLeft: "12px",
                  padding: "10px 12px",
                  border: "1px solid #d9d9d9",
                }}
              >
                <Space style={{ marginBottom: "10px" }}>
                  <Form.Item
                    name="InvoiceDateA"
                    label="請求年月"
                    style={{ marginBottom: 0 }}
                  >
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM" picker="month" />
                  </Form.Item>
                  <Button icon={<SearchOutlined />} onClick={() => {}}>
                    　検　　索
                  </Button>
                </Space>
                <Button type="primary" style={{ float: "right" }}>
                  　作成
                </Button>
              </Col>
              <Col
                xxl={6}
                xl={8}
                style={{
                  marginLeft: "12px",
                  padding: "10px 12px",
                  border: "1px solid #d9d9d9",
                }}
              >
                <Space>
                  <Form.Item name="PeriodAStart" label="受診日">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef}
                      format="YYYY/MM/DD"
                      style={{ width: "120px" }}
                    />
                  </Form.Item>
                  <Form.Item name="PeriodAFinal" label="~">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef}
                      format="YYYY/MM/DD"
                      style={{ width: "120px" }}
                    />
                  </Form.Item>
                </Space>
                <Space>
                  <Form.Item name="MedicalExamCourseStart" label="コース">
                    <Input
                      type="text"
                      style={{ width: "100px" }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 600,
                            component: (
                              <WS0265001_BasicCourseInquiry
                                onFinishScreen={(output) => {
                                  this.setFormFieldValue(
                                    "MedicalExamCourseStart",
                                    output.Lo_CourseCode
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
                  <Form.Item name="MedicalExamCourseFinal" label="~">
                    <Input
                      type="text"
                      style={{ width: "100px" }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 600,
                            component: (
                              <WS0265001_BasicCourseInquiry
                                onFinishScreen={(output) => {
                                  this.setFormFieldValue(
                                    "MedicalExamCourseFinal",
                                    output.Lo_CourseCode
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
                </Space>
              </Col>
              <Col
                span={10}
                style={{
                  marginLeft: "12px",
                  padding: "10px 12px",
                  border: "1px solid #d9d9d9",
                }}
              >
                <Row gutter={24}>
                  <Col span={6}>
                    <Form.Item name="AggregateSpecified" label="区分">
                      <Select onChange={(value) => this.checkSelected(value)}>
                        <Select.Option value={0}>全て</Select.Option>
                        <Select.Option value={4}>保険者</Select.Option>
                        <Select.Option value={5}>事業所</Select.Option>
                        <Select.Option value={6}>他団体</Select.Option>
                        <Select.Option value={9}>個人未収</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={18}>
                    <Space>
                      <Form.Item name="OfficeCode" label="事業所">
                        <Input
                          type="text"
                          disabled={!this.state.showOffice}
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "70%",
                                component: (
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    onFinishScreen={(output) => {
                                      this.setFormFieldValue(
                                        "OfficeCode",
                                        output.Lio_OfficeCode
                                      );
                                      this.setFormFieldValue(
                                        "BranchCodeStart",
                                        output.Lio_BranchStoreCode
                                      );
                                      this.setFormFieldValue(
                                        "office_kanji_name",
                                        output.Lo_Kanji_Name
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
                      <Form.Item name="BranchCodeStart">
                        <Input type="text" style={{ width: "50px" }} disabled />
                      </Form.Item>
                      <Form.Item name="office_kanji_name">
                        <Input
                          type="text"
                          readOnly
                          style={{ border: "none", background: "transparent" }}
                        />
                      </Form.Item>
                    </Space>
                    <Space>
                      <Form.Item name="InsurerCode" label="保険者">
                        <Input
                          type="text"
                          style={{ width: "100px" }}
                          disabled={!this.state.showInsurer}
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "60%",
                                component: (
                                  <WS0246001_InsurerInfoSearchQuery
                                    onFinishScreen={(output) => {
                                      this.setFormFieldValue(
                                        "InsurerCode",
                                        output.Lo_InsurerCode
                                      );
                                      this.setFormFieldValue(
                                        "insurer_kanji_name",
                                        output.Lo_Name
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
                      <Form.Item name="insurer_kanji_name">
                        <Input
                          type="text"
                          readOnly
                          style={{ border: "none", background: "transparent" }}
                        />
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: "10px" }}>
              <Col span={8} style={{ borderRight: "1px solid #d9d9d9" }}>
                <Table
                  dataSource={this.state.dataSource}
                  loading={false}
                  pagination={false}
                  bordered={true}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="" dataIndex="" width={"5%"} />
                  <Table.Column
                    title="区分"
                    dataIndex="Expression_4"
                    width={"12%"}
                  />
                  <Table.Column title="名称" dataIndex="W1_destination_name" />
                  <Table.Column
                    title="明細合計"
                    dataIndex="W1_total_price_specific_meter"
                    width={"18%"}
                  />
                  <Table.Column
                    title="件数"
                    dataIndex="W1_total_num"
                    width={"12%"}
                  />
                  <Table.Column
                    title=""
                    dataIndex=""
                    width={80}
                    render={(value, record) => {
                      return <Button type="primary"
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "70%",
                            component: (
                              <WS0963001_InvoiceMaintain
                              Li_BillingManageNum = {record.billing_management_number}
                                onFinishScreen={(output) => { }}
                              />
                            ),
                          },
                        });
                      }}
                      >請求書確認</Button>;
                    }}
                  />
                </Table>
              </Col>
              <Col span={16}>
                <Table
                  dataSource={this.state.dataSource}
                  loading={false}
                  pagination={false}
                  bordered={true}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="" dataIndex="" key="" width={"5%"} />
                  <Table.Column
                    title="－"
                    dataIndex="MinusAmountMark"
                    width={"5%"}
                  />
                  <Table.Column
                    title="集計"
                    dataIndex="BillingExist"
                    width={"10%"}
                  />
                  <Table.Column
                    title="合計額"
                    dataIndex="W2_total_price"
                    width={"10%"}
                  />
                  <Table.Column
                    title="受診日"
                    dataIndex="W2_consult_date"
                    width={100}
                  />
                  <Table.Column
                    title="個人ID"
                    dataIndex="W2_person_num"
                    width={"10%"}
                  />
                  <Table.Column title="氏名" dataIndex="W2_full_name" />
                  <Table.Column
                    title="契約情報"
                    dataIndex=""
                    render={(value, record) => {
                      return (
                        <div>
                          <span>{record.W2_visits_courses}</span>
                          <span>{record.contract_short_name}</span>
                        </div>
                      );
                    }}
                  />
                  <Table.Column
                    title="事業所名"
                    dataIndex="office_kanji_name"
                  />
                  <Table.Column
                    title=""
                    dataIndex=""
                    width={80}
                    render={(value, record) => {
                      return <Button type="primary"
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "60%",
                            component: (
                              <WS2583001_ConsultInquirySub
                                Li_ReserveNum = {record.W2_reserve_num}
                                onFinishScreen={(output) => { }}
                              />
                            ),
                          },
                        });
                      }}
                      >照会</Button>;
                    }}
                  />
                </Table>
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
)(WS0948001_BillingAggregationProcess);
