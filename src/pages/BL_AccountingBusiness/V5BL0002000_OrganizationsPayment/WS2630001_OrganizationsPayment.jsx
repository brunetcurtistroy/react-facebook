import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable array-callback-return */
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";

import {
  InputNumber,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Button,
  Table,
  Row,
  Menu,
  DatePicker,
  Modal,
  Dropdown,
  Space,
  message,
} from "antd";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import Checkbox from "antd/lib/checkbox/Checkbox";
import WS0956001_PaymentCorrectSub from "pages/UK_CounterBusiness/V5UK0001000_Counter/WS0956001_PaymentCorrectSub";
import WS0963001_InvoiceMaintain from "../V4BL0031000_DepositWithdrawalInquiry/WS0963001_InvoiceMaintain";
import WS2631001_PaymentProcessSub from "pages/BL_AccountingBusiness/V5BL0002000_OrganizationsPayment/WS2631001_PaymentProcessSub.jsx";
import OrganizationsPaymentAction from "redux/AccountingBusiness/OrganizationsPayment/OrganizationsPayment.actions";
import WS0958001_ReceiptMaintainIssue from "./WS0958001_ReceiptMaintainIssue";
import WS2632001_DispensingProcessSub from "./WS2632001_DispensingProcessSub";

import moment from "moment";
import { number_format } from "helpers/CommonHelpers";

const grid = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const color = {
  colorUncheck: {
    color: "#E8E8E8",
  },
  colorCheck: {
    color: "black",
  },
};
class WS2630001_OrganizationsPayment extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "団体入金";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      selectedKey: [],
      isloadding: false,
      checkAll: false,
      DisplayItemList: "111110001111111",
    };
    this.onFinish = this.onFinish.bind(this);
  }
  componentDidMount() {
    this.getScreen();
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
  getScreen() {
    OrganizationsPaymentAction.getScreenAction()
      .then((res) => {
        this.setState({
          dataSource: res,
          selectedKey: res,
        });
      })
      .finally(() => this.setState({ isloadding: false }));
  }

  async onCheckAll(value) {
    this.setState({ isloadding: true });
    let record = this.state.dataSource;
    let arraySelect = [];
    if (value) {
      record.map((x) => {
        x.W1_target = true;
        arraySelect.push(x.id);
      });
    } else {
      record.map((x) => (x.checked = false));
    }
    await this.setState({
      dataSource: record,
      selectedKey: arraySelect,
    });
    const data = {
      StsSelectAll: value ? 1 : 0,
    };
    OrganizationsPaymentAction.selectAllAction(data)
      .then((res) => {
        this.getScreen();
        if (arraySelect.length < 1) {
          this.setFormFieldValue("checkAll", false);
        } else {
          this.setFormFieldValue("checkAll", true);
        }
      })
      .finally(() => this.setState({ isloadding: false }));
  }

  async onChangeCheckedRecord(index, value, record) {
    this.setState({ isloadding: true });
    let records = this.state.dataSource;
    records[index].W1_target = value;
    let arraySelect = this.state.selectedKey;
    if (value) {
      if (arraySelect.indexOf(records[index].id) < 0) {
        arraySelect.push(records[index].id);
        this.setFormFieldValue("checkAll", true);
      }
    } else {
      this.setFormFieldValue("checkAll", false);
      // console.log("vào");
      // arraySelect.forEach((e) => {
      //   if (e.W1_target === true) {
      //     this.setFormFieldValue("checkAll", false);
      //   }else{
      //     this.setFormFieldValue("checkAll", true);
      //   }
      // });

      // if (arraySelect.indexOf(records[index].id) > -1) {
      //   arraySelect.splice(arraySelect.indexOf(records[index].id), 1);
      //   if (arraySelect.length < 1) {
      //     this.setFormFieldValue("checkAll", false);
      //   } else {
      //     this.setFormFieldValue("checkAll", true);
      //   }
      // }
    }
    this.setState({
      dataSource: records,
      selectedKey: arraySelect,
    });

    const data = {
      id: this.state.dataSource[index].id,
      W1_target: this.state.dataSource[index].W1_target ? 1 : 0,
    };
    OrganizationsPaymentAction.selectOneAction(data)
      .then((res) => {
        this.getScreen();
      })
      .finally(() => this.setState({ isloadding: false }));
  }

  onFinish(values) {
    this.setState({ isloadding: true });
    values["ClaimYearsCharF"] = values["ClaimYearsCharF"]
      ? moment(values.ClaimYearsCharF).format("YYYY/MM") + "/01"
      : null;
    values["ClaimYearsCharT"] = values["ClaimYearsCharT"]
      ? moment(values.ClaimYearsCharT).format("YYYY/MM") + "/01"
      : null;
    OrganizationsPaymentAction.DisplayBtnAction(values)
      .then((res) => {
        this.getScreen();
        this.setState({
          selectedKey: [],
        });
        this.setFormFieldValue("checkAll", false);
      })
      .finally(() => this.setState({ isloadding: false }));
  }
  f10() {
    OrganizationsPaymentAction.f10Action()
      .then((res) => {
        console.log(res);
        if (res.message === "WS2632001_DispensingProcessSub") {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 450,
              component: (
                <WS2632001_DispensingProcessSub
                  onFinishScreen={(output) => {
                    this.closeModal();
                    this.getScreen();

                  }}
                />
              ),
            },
          });
        }
      })
      .catch((err) => {
        Modal.error({
          width: 380,
          title: "出金対象を一覧から選択してください",
        });
      })
      .finally(() => {});
  }
  f11() {
    OrganizationsPaymentAction.f11Action()
      .then((res) => {
        console.log(res);
        if (res.message === "WS2631001_PaymentProcessSub") {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 450,
              component: (
                <WS2631001_PaymentProcessSub
                  Li_Window={1}
                  onFinishScreen={(output) => {
                    this.closeModal();
                  }}
                />
              ),
            },
          });
        }
      })
      .catch((err) => {
        Modal.error({
          width: 380,
          title: "入金対象を一覧から選択してください",
        });
      })
      .finally(() => {});
  }

  render() {
    var today =
      new Date().getFullYear() +
      "/" +
      ("0" + (new Date().getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + new Date().getDate()).slice(-2);
    return (
      <div className="organizations-payment">
        <Card title="団体入金">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "100%",
                    component: (
                      <WS0958001_ReceiptMaintainIssue
                        onFinishScreen={(output) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              領収再発行
            </Button>


            <Button
              onClick={() => {
                this.f10();
              }}
            >
              出金
            </Button>


            <Button
              onClick={() => {
                this.f11();
              }}
            >
              窓口入金
            </Button>

            
            <Button
                onClick={() => {
                  this.f11();
                }}
            >
              振込入金
            </Button>
          </Space>
          <hr style={{ margin: "15px 0" }} />
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              ClaimYearsCharF: moment(today),
              ClaimYearsCharT: moment(today),
              ClaimIdentify: 0,
              PayRemaining: 2,
            }}
          >
            <Row gutter={24}>
              <div style={{ width: 380, marginBottom: 15, padding: "0 12px" }}>
                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    padding: "1em",
                  }}
                >
                  <Form.Item label="請求年月" {...grid}>
                    <Space>
                      <Form.Item name="ClaimYearsCharF">
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY年MM月" picker="month" />
                      </Form.Item>
                      <span>~</span>
                      <Form.Item name="ClaimYearsCharT">
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY年MM月" picker="month" />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  <Form.Item name="ClaimNum" label="請求番号" {...grid}>
                    <InputNumber min={0} maxLength={8} style={{ width: 100 }} />
                  </Form.Item>
                  <Form.Item name="PayRemaining" label="入　金" {...grid}>
                    <Radio.Group>
                      <Radio value={0}>全て</Radio>
                      <Radio value={1}>済</Radio>
                      <Radio value={2}>未</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="ClaimIdentify" label="請求先" {...grid}>
                    <Select style={{ width: 150 }}>
                      <Select.Option value={0}>全て</Select.Option>
                      <Select.Option value={4}>保険者</Select.Option>
                      <Select.Option value={5}>事業所</Select.Option>
                      <Select.Option value={6}>他団体</Select.Option>
                      <Select.Option value={9}>個人未収</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="InsurerNum" label="保険者" {...grid}>
                    <Input.Search
                      maxLength={10}
                      style={{ width: 150, textAlign: "right" }}
                      type="number"
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "70%",
                            component: (
                              <WS0246001_InsurerInfoSearchQuery
                                onFinishScreen={(output) => {
                                  this.setFormFieldValue(
                                    "InsurerNum",
                                    output.Lo_InsurerCode
                                  );

                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                      onBlur={(e) => {
                        let value = parseInt(e.target.value.slice(0, 10));
                        this.formRef.current?.setFieldsValue({
                          InsurerNum: value > 0 ? value : null,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="OfficeNum" label="事業所" {...grid}>
                    <Input.Search
                      style={{ width: 150 }}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "60%",
                            component: (
                              <WS0247001_OfficeInfoRetrievalQuery
                                onFinishScreen={(output) => {
                                  this.setFormFieldValue(
                                    "OfficeNum",
                                    output.Lio_OfficeCode
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
                  <Form.Item name="Search" label="検　索" {...grid}>
                    <Input type="text" />
                  </Form.Item>
                  <Form.Item style={{ textAlign: "right" }}>
                    <Button
                      icon={<SearchOutlined />}
                      className="hv"
                      htmlType="submit"
                    >
                      　検　　索
                    </Button>
                  </Form.Item>
                </div>
                <div style={{ textAlign: "right", marginTop: "1em" }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.f11();
                    }}
                  >
                    {" "}
                    振込入金
                  </Button>
                </div>
              </div>
              <div
                style={{
                  width: "calc(100% - 380px)",
                  marginBottom: 15,
                  paddingRight: 12,
                }}
              >
                <Table
                  size="small"
                  dataSource={this.state.dataSource}
                  loading={this.state.isloadding}
                  pagination={false}
                  bordered
                  scroll={{ x: 1150, y: 700 }}
                  rowKey={(record) => record.id}
                >
                  <Table.Column
                    title="請求日"
                    dataIndex="billing_date_on"
                    width={90}
                    align="center"
                    render={(value, record, index) => {
                      return (
                        <span
                          style={
                            record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck
                          }
                        >
                          {value === "0000-00-00"
                            ? ""
                            : value.replaceAll("-", "/")}
                        </span>
                      );
                    }}
                  />
                  <Table.Column
                    title="請求先"
                    dataIndex="expression_5"
                    width={80}
                    align="center"
                    render={(value, record, index) => {
                      return (
                        <span
                          style={
                            record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck
                          }
                        >
                          {value}
                        </span>
                      );
                    }}
                  />
                  <Table.Column
                    title="請求番号"
                    dataIndex="invoice_number"
                    width={90}
                    render={(value, record, index) => {
                      return (
                        <div
                          style={{
                            ...(record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck),
                            textAlign: "right",
                          }}
                        >
                          {value}
                        </div>
                      );
                    }}
                  />
                  <Table.Column
                    title="請求発行日"
                    dataIndex="invoice_date_on"
                    width={90}
                    align="center"
                    render={(value, record, index) => {
                      return (
                        <span
                          style={
                            record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck
                          }
                        >
                          {value === "0000-00-00"
                            ? ""
                            : value.replaceAll("-", "/")}
                        </span>
                      );
                    }}
                  />
                  <Table.Column
                    title="宛　名"
                    dataIndex="according_to_destination_name"
                    render={(value, record, index) => {
                      return (
                        <span
                          style={
                            record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck
                          }
                        >
                          {value}
                        </span>
                      );
                    }}
                  />
                  <Table.Column
                    title="請求金額"
                    dataIndex="billing_price"
                    width={90}
                    render={(value, record, index) => {
                      return (
                        <div
                          style={{
                            ...(record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck),
                            textAlign: "right",
                          }}
                        >
                          {value === 0 || !value ? "" : number_format(value)}
                        </div>
                      );
                    }}
                  />
                  <Table.Column
                    title="入金額"
                    dataIndex="deposit_price"
                    width={90}
                    render={(value, record, index) => {
                      return (
                        <div
                          style={{
                            ...(record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck),
                            textAlign: "right",
                          }}
                        >
                          {value === 0 || !value ? "" : number_format(value)}
                        </div>
                      );
                    }}
                  />
                  <Table.Column
                    dataIndex="W1_target"
                    align="center"
                    width={30}
                    title={
                      <Form.Item name="checkAll" valuePropName="checked">
                        <Checkbox
                          onChange={(event) => {
                            this.onCheckAll(event.target.checked);
                          }}
                        ></Checkbox>
                      </Form.Item>
                    }
                    render={(value, record, index) => (
                      <Checkbox
                        checked={record.W1_target}
                        onChange={(event) => {
                          this.onChangeCheckedRecord(
                            index,
                            event.target.checked,
                            record
                          );
                        }}
                      ></Checkbox>
                    )}
                  />
                  <Table.Column
                    title="入金日"
                    dataIndex="payment_day_on"
                    width={90}
                    align="center"
                    render={(value, record, index) => {
                      return (
                        <span
                          style={
                            record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck
                          }
                        >
                          {value === "0000-00-00"
                            ? ""
                            : value.replaceAll("-", "/")}
                        </span>
                      );
                    }}
                  />
                  <Table.Column
                    title="方法"
                    dataIndex="expression_12"
                    width={50}
                    render={(value, record, index) => {
                      return (
                        <span
                          style={
                            record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck
                          }
                        >
                          {value}
                        </span>
                      );
                    }}
                  />
                  <Table.Column
                    title="受領金額"
                    dataIndex="amount_received"
                    width={90}
                    render={(value, record, index) => {
                      return (
                        <div
                          style={{
                            ...(record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck),
                            textAlign: "right",
                          }}
                        >
                          {value === 0 || !value ? "" : number_format(value)}
                        </div>
                      );
                    }}
                  />
                  <Table.Column
                    title="手数料"
                    dataIndex="transfer_fee"
                    width={90}
                    render={(value, record, index) => {
                      return (
                        <div
                          style={{
                            ...(record.W1_target
                              ? color.colorCheck
                              : color.colorUncheck),
                            textAlign: "right",
                          }}
                        >
                          {value === 0 || !value ? "" : number_format(value)}
                        </div>
                      );
                    }}
                  />
                  <Table.Column
                    width={30}
                    align="center"
                    fixed="right"
                    render={(value, record) => {
                      return (
                        <Dropdown
                          overlay={() => (
                            <Menu>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "70%",
                                      visible: true,
                                      component: (
                                        <WS0956001_PaymentCorrectSub
                                          Li_BillingManageNum={
                                            record?.W1_billing_manage_num
                                          }
                                          Li_Identify={record?.W1_identify}
                                          Li_ModificationLevel={
                                            record?.Li_ModificationLevel
                                          }
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                入金訂正
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "70%",
                                      visible: true,
                                      component: (
                                        <WS0963001_InvoiceMaintain
                                          Li_BillingManageNum={
                                            record?.W1_billing_manage_num
                                          }
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                請求内容
                              </Menu.Item>
                            </Menu>
                          )}
                        >
                          <Button size="small" icon={<MoreOutlined />}></Button>
                        </Dropdown>
                      );
                    }}
                  />
                </Table>
              </div>
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
)(WS2630001_OrganizationsPayment);
