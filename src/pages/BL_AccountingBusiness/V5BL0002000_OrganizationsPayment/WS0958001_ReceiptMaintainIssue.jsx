import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  Card,
  Form,
  Input,
  message,
  Select,
  Dropdown,
  Checkbox,
  Button,
  Table,
  Row,
  Col,
  Space,
  Menu,
  DatePicker,
  InputNumber,
  Modal,
} from "antd";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import ReceiptMaintainIssueAction from "redux/AccountingBusiness/OrganizationsPayment/ReceiptMaintainIssue.action";
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS0946006_ReceiptIssueOnline from "../SMIYA0502_ReceiptPreIssue20/WS0946006_ReceiptIssueOnline";
const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const customStyle = {
  inputOnly: {
    borderColor: "transparent",
    background: "transparent",
  },
};
class WS0958001_ReceiptMaintainIssue extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "領収書保守/発行";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      EditingDivision: 0,
      Billing: 0,
      disabledAmount: true,
      isLoadingTable: false,
      dataSource: [],
      selectedKey: [],
      w1Target: {},
    };
  }
  componentDidMount() {
    this.getScreenData();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  changeEditingDivision(value) {
    const data = {
      EditingDivision: value,
    };
    ReceiptMaintainIssueAction.edittingDivitionAction(data)
      .then((res) => {
        Modal.confirm({
          width: "400px",
          // title: "確認",
          content: "入力中のﾃﾞｰﾀは破棄されます\nよろしいですか？",
          okText: "は　い",
          cancelText: "いいえ",
          onOk: () => {
            if (value === 1) {
              this.formRef.current.setFieldsValue({
                Billing: 0,
              });
              this.setState({
                Billing: 0,
              });
            }

            if (value === 0 || value === 3) {
              this.setState({
                disabledAmount: true,
              });
            } else {
              this.setState({
                disabledAmount: false,
              });
            }

            this.setState({
              EditingDivision: value,
            });
            this.edittingDivitionYes();
          },
        });
      })
      .catch((error) => {})
      .finally(() => {});
  }
  edittingDivitionYes() {
    const data = {
      EditingDivision:
        this.formRef.current.getFieldsValue("EditingDivision").EditingDivision,
      ReceiptPeriodAStart: this.formRef.current
        .getFieldsValue("ReceiptPeriodAStart")
        .ReceiptPeriodAStart.format("YYYY/MM/DD"),
      ReceiptPeriodAFinal: this.formRef.current
        .getFieldsValue("ReceiptPeriodAFinal")
        .ReceiptPeriodAFinal.format("YYYY/MM/DD"),
      AddressSearch:
        this.formRef.current.getFieldsValue("AddressSearch").AddressSearch,
      Target: this.formRef.current.getFieldsValue("Target").Target,
      LainspectOnly: this.formRef.current.getFieldsValue("LainspectOnly")
        .LainspectOnly
        ? 1
        : 0,
      Billing: this.formRef.current.getFieldsValue("Billing").Billing,
      PersonalNum:
        this.formRef.current.getFieldsValue("PersonalNum").PersonalNum,
      OfficeNum: this.formRef.current.getFieldsValue("OfficeNum").OfficeNum,
      BranchStoreCode:
        this.formRef.current.getFieldsValue("BranchStoreCode").BranchStoreCode,
      InsurerNum: this.formRef.current.getFieldsValue("InsurerNum").InsurerNum,
      ReDisplayFlag:
        this.formRef.current.getFieldsValue("ReDisplayFlag").ReDisplayFlag,
    };
    ReceiptMaintainIssueAction.edittingDivitionYesAction(data)
      .then((res) => {})
      .catch((error) => {})
      .finally(() => {});
  }

  changeBilling(value) {
    this.setState({ Billing: value, dataSource: [] });
    this.formRef.current.setFieldsValue({
      PersonalNum: "",
      kana_name: "",
      kanji_name: "",
      Gender: "",
      birthday_on: "",
      Age: "",
      disabled_05: "",
      disabled_01: "",
      disabled_02: "",
      InsurerNum: "",
      insurer_kana_name: "",
      insurer_kanji_name: "",
      ZipCode: "",
      phone_number: "",
      fax: "",
      OfficeNum: "",
      BranchStoreCode: "",
      office_kana_name: "",
      office_kanji_name: "",
      postal_code: "",
      VL1_: "",
    });
  }

  onFinish(values) {}
  getScreenData() {
    ReceiptMaintainIssueAction.screenDataAction()
      .then((res) => {
        this.setFormFieldValue("Billing", res.Billing);
        this.setFormFieldValue("Address ", res.Address);
        this.setFormFieldValue(" AddressSearch ", res.AddressSearch);
        this.setFormFieldValue(" Billing ", res.Billing);
        this.setFormFieldValue(" BranchStoreCode ", res.BranchStoreCode);
        this.setFormFieldValue(" BranchStoreCodeNew ", res.BranchStoreCodeNew);
        this.setFormFieldValue(" Code ", res.Code);
        this.setFormFieldValue(
          " ConfirmCompletionReturn ",
          res.ConfirmCompletionReturn
        );
        this.setFormFieldValue(" DateTmp ", res.DateTmp);
        this.setFormFieldValue(" DeleteCheckReturn ", res.DeleteCheckReturn);
        this.setFormFieldValue(" DisplayButton ", res.DisplayButton);
        this.setFormFieldValue(
          " DisplayButtonEnable ",
          res.DisplayButtonEnable
        );
        this.setFormFieldValue(" Division ", res.Division);
        this.setFormFieldValue(" EditingDivision ", res.EditingDivision);
        this.setFormFieldValue(" EndPropagation ", res.EndPropagation);
        this.setFormFieldValue(" ExistsOffice ", res.ExistsOffice);
        this.setFormFieldValue(" Expresstion_15 ", res.Expresstion_15);
        this.setFormFieldValue(" InputDateReturn ", res.InputDateReturn);
        this.setFormFieldValue(" InsurerNum ", res.InsurerNum);
        this.setFormFieldValue(" LainspectOnly ", res.LainspectOnly);
        this.setFormFieldValue(" OfficeCodeNew ", res.OfficeCodeNew);
        this.setFormFieldValue(" OfficeNum ", res.OfficeNum);
        this.setFormFieldValue(" PersonalNum ", res.PersonalNum);
        this.setFormFieldValue(" ReDisplayFlag ", res.ReDisplayFlag);
        this.setFormFieldValue(" ReceiptAmount ", res.ReceiptAmount);
        this.setFormFieldValue(
          " ReceiptDestinationCmbbox ",
          res.ReceiptDestinationCmbbox
        );
        this.setFormFieldValue(
          " ReceiptDestinationConvert ",
          res.ReceiptDestinationConvert
        );
        this.setFormFieldValue(
          " ReceiptPeriodAFinal ",
          res.ReceiptPeriodAFinal
        );
        this.setFormFieldValue(
          " ReceiptPeriodAStart ",
          res.ReceiptPeriodAStart
        );
        this.setFormFieldValue(
          " ReceiptPeriodDFinal ",
          res.ReceiptPeriodDFinal
        );
        this.setFormFieldValue(
          " ReceiptPeriodDStart ",
          res.ReceiptPeriodDStart
        );
        this.setFormFieldValue(
          " ReclassifyCheckReturn ",
          res.ReclassifyCheckReturn
        );
        this.setFormFieldValue(" Remarks ", res.Remarks);
        this.setFormFieldValue(" RemarksStringEdit ", res.RemarksStringEdit);
        this.setFormFieldValue(" StsOfficeCode ", res.StsOfficeCode);
        this.setFormFieldValue(" Subject ", res.Subject);
        this.setFormFieldValue(" Target ", res.Target);
        this.setFormFieldValue(
          " TargetFlagNumDelete ",
          res.TargetFlagNumDelete
        );
        this.setFormFieldValue(" TargetFlagNumIssue ", res.TargetFlagNumIssue);
        this.setFormFieldValue(" Tax ", res.Tax);
        this.setFormFieldValue(" TaxRate ", res.TaxRate);
        this.setFormFieldValue(" VlEditFlag ", res.VlEditFlag);
        this.setFormFieldValue(" office_kanji_name ", res.office_kanji_name);
      })
      .catch((error) => {})
      .finally(() => {});
  }

  displayBtn() {
    const data = {
      EditingDivision:
        this.formRef.current.getFieldsValue("EditingDivision").EditingDivision,
      ReceiptPeriodAStart: this.formRef.current
        .getFieldsValue("ReceiptPeriodAStart")
        .ReceiptPeriodAStart.format("YYYY/MM/DD"),
      ReceiptPeriodAFinal: this.formRef.current
        .getFieldsValue("ReceiptPeriodAFinal")
        .ReceiptPeriodAFinal.format("YYYY/MM/DD"),
      AddressSearch:
        this.formRef.current.getFieldsValue("AddressSearch").AddressSearch,
      Target: this.formRef.current.getFieldsValue("Target").Target,
      LainspectOnly: this.formRef.current.getFieldsValue("LainspectOnly")
        .LainspectOnly
        ? 1
        : 0,
      Billing: this.formRef.current.getFieldsValue("Billing").Billing,
      PersonalNum:
        this.formRef.current.getFieldsValue("PersonalNum").PersonalNum,
      OfficeNum: this.formRef.current.getFieldsValue("OfficeNum").OfficeNum,
      BranchStoreCode:
        this.formRef.current.getFieldsValue("BranchStoreCode").BranchStoreCode,
      InsurerNum: this.formRef.current.getFieldsValue("InsurerNum").InsurerNum,
      ReDisplayFlag:
        this.formRef.current.getFieldsValue("ReDisplayFlag").ReDisplayFlag,
    };
    console.log(data);
    ReceiptMaintainIssueAction.displayBtnAction(data)
      .then((res) => {
        this.receiptHistory();
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingSearch: false }));
  }
  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }

  receiptHistory() {
    this.setState({ isLoadingTable: true });
    ReceiptMaintainIssueAction.receiptHistoryAction()
      .then((res) => {
        this.setState({
          dataSource: res,
          selectedKey: res,
        });
      })
      .catch((error) => {})
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  }
  async onCheckAll(value) {
    const data = {
      StsSelectAll: value ? 1 : 0,
    };
    ReceiptMaintainIssueAction.selectAllAction(data)
      .then((res) => {
        this.receiptHistory();
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
      }
    } else {
      this.setFormFieldValue("checkAll", false);
    }
    this.setState({
      dataSource: records,
      selectedKey: arraySelect,
    });
    console.log(12121212, this.state.w1Target);
    const data = {
      id: this.state.dataSource[index].id,
      W1_target: this.state.dataSource[index].W1_target ? 1 : 0,
      EditingDivision:
        this.formRef.current.getFieldsValue("EditingDivision").EditingDivision,
      Address: this.state.w1Target?.Address,
      Subject: this.state.w1Target?.Subject,
      OfficeCodeNew: this.state.w1Target?.OfficeCodeNew,
      BranchStoreCodeNew: this.state.w1Target?.BranchStoreCodeNew,
      Remarks: this.state.w1Target?.Remarks,
      ReceiptAmount: this.state.w1Target?.ReceiptAmount,
      Tax: this.state.w1Target?.Tax,
      VlEditFlag: this.state.w1Target?.VlEditFlag,
      Num: this.state.w1Target?.Num,
      W1_receipt_amount: this.state.dataSource[index].W1_receipt_amount,
      W1_tax: this.state.dataSource[index].W1_tax,
      W1_remark: this.state.dataSource[index].W1_remark,
      W1_address: this.state.dataSource[index].W1_address,
      W1_subject: this.state.dataSource[index].W1_subject,
      office_code: this.state.dataSource[index].office_code,
      branch_store_code: this.state.dataSource[index].branch_store_code,
    };
    ReceiptMaintainIssueAction.w1TargetAction(data)
      .then((res) => {
        this.receiptHistory();
        this.setState({ w1Target: res });
        this.setFormFieldValue(
          "ReceiptAmount",
          this.state.w1Target?.ReceiptAmount === 0
            ? ""
            : this.state.w1Target?.ReceiptAmount
        );
        this.setFormFieldValue("Tax", this.state.w1Target?.Tax);
        this.setFormFieldValue("VlEditFlag", this.state.w1Target?.VlEditFlag);
        this.setFormFieldValue("Num", this.state.w1Target?.Num);
        this.setFormFieldValue("Remarks", this.state.w1Target?.Remarks);
        this.setFormFieldValue(
          "BranchStoreCodeNew",
          this.state.w1Target?.BranchStoreCodeNew
        );
        this.setFormFieldValue(
          "OfficeCodeNew",
          this.state.w1Target?.OfficeCodeNew
        );
        this.setFormFieldValue("Subject", this.state.w1Target?.Subject);
        this.setFormFieldValue("Address", this.state.w1Target?.Address);
      })
      .finally(() => this.setState({ isloadding: false }));
  }
  user1Action(record) {
    const data = {
      W1_receipt_manage_num: record.W1_receipt_manage_num,
      delete_flag: record.delete_flag,
    };
    ReceiptMaintainIssueAction.userAction1Action(data)
      .then((res) => {
        this.receiptHistory();
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingSearch: false }));
  }
  print_F12() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 450,
        component: (
          <WS0946006_ReceiptIssueOnline
            onFinishScreen={(output) => {
              this.closeModal();
            }}
          />
        ),
      },
    });
  }
  F11Action1() {
    const data = {
      EditingDivision:
        this.formRef.current.getFieldsValue("EditingDivision").EditingDivision,
      Target: this.formRef.current.getFieldsValue("Target").Target,
    };
    ReceiptMaintainIssueAction.f11Action1Action(data)
      .then((res) => {
        console.log(res);
        Modal.confirm({
          width: "300px",
          // title: "確認",
          content: "ﾁｪｯｸした行を削除しますか？",
          okText: "は　い",
          cancelText: "いいえ",
          onOk: () => {
            this.F11Action2();
          },
        });
      })
      .catch((error) => {})
      .finally(() => {});
  }
  F11Action2() {
    ReceiptMaintainIssueAction.f11Action2Action()
      .then((res) => {
        console.log(res);
        if (res.warning === "削除対象行にﾁｪｯｸを入れて下さい") {
          Modal.warning({
            width: "400px",
            // title: "確認",
            content: "削除対象行にﾁｪｯｸを入れて下さい",
            okText: "は　い",
            onOk: () => {},
          });
        }
      })
      .catch((error) => {})
      .finally(() => {});
  }

  render() {
    return (
      <div className="receipt-maintain-issue">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            EditingDivision: 0,
            Billing: 0,
            Target: 0,
            ReceiptPeriodAStart: moment(),
            ReceiptPeriodAFinal: moment(),
          }}
        >
          <Card title="領収書保守/発行" className="mb-3">
            <Space>
              <Button
                onClick={() => {
                  this.F11Action1();
                }}
                disabled={this.state.EditingDivision !== 3}
              >
                削除
              </Button>
              <Button
                onClick={() => {
                  this.print_F12();
                }}
              >
                印刷
              </Button>
            </Space>
            <hr style={{ margin: "15px 0" }} />
            <Row gutter={24}>
              <Col span={5}>
                <Form.Item name="EditingDivision" label="編集区分">
                  <Select
                    onChange={(value) => {
                      this.changeEditingDivision(value);
                    }}
                  >
                    <Select.Option value={0}>再発行</Select.Option>
                    <Select.Option value={1}>新規</Select.Option>
                    <Select.Option value={2}>まとめ発行</Select.Option>
                    <Select.Option value={3}>削除</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="領収期間">
                  <Space>
                    <Form.Item
                      name="ReceiptPeriodAStart"
                      style={{ marginBottom: 0 }}
                    >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        disabled={this.state.EditingDivision === 1}
                      />
                    </Form.Item>
                    <label>~</label>
                    <Form.Item
                      name="ReceiptPeriodAFinal"
                      style={{ marginBottom: 0 }}
                    >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        disabled={this.state.EditingDivision === 1}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="Billing" label="領収先">
                  <Select
                    onChange={(value) => {
                      this.changeBilling(value);
                    }}
                    disabled={this.state.EditingDivision === 1}
                  >
                    <Select.Option value={0}> </Select.Option>
                    <Select.Option value={1}>個人</Select.Option>
                    <Select.Option value={4}>保険者</Select.Option>
                    <Select.Option value={5}>事業所</Select.Option>
                    <Select.Option value={6}>他団体</Select.Option>
                    <Select.Option value={9}>個人未収</Select.Option>
                    <Select.Option value={10}>宛名</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="Target" label="対象">
                  <Select disabled={this.state.EditingDivision === 1}>
                    <Select.Option value={0}>有効ﾃﾞｰﾀのみ</Select.Option>
                    <Select.Option value={1}>削除ﾃﾞｰﾀのみ</Select.Option>
                    <Select.Option value={2}>全て</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item name="LainspectOnly" valuePropName="checked">
                  <Checkbox>最新のみ</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <div hidden={this.state.Billing !== 0 && this.state.Billing !== 6}>
              <Row gutter={24}>
                <Col span={18}></Col>
                <Col span={6} style={{ textAlign: "right" }}>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        this.displayBtn();
                      }}
                      icon={<SearchOutlined />}
                    >
                      　検　　索
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div hidden={this.state.Billing === 0 || this.state.Billing === 6}>
              <div
                hidden={this.state.Billing !== 1 && this.state.Billing !== 9}
              >
                <Row gutter={24}>
                  <Col span={18}>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "7px",
                        marginLeft: "42px",
                        marginBottom: "9px",
                      }}
                    >
                      <label
                        style={{
                          marginRight: "5px",
                          fontWeight: "bold",
                          color: "#14468C",
                        }}
                      >
                        個人番号
                      </label>
                      <Form.Item
                        name="PersonalNum"
                        style={{ marginRight: "10px" }}
                      >
                        <Input.Search
                          readOnly
                          maxLength={8}
                          style={{ width: "140px" }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "90%",
                                component: (
                                  <WS0248001_PersonalInfoSearchQuery
                                    onFinishScreen={(output) => {
                                      console.log(output);
                                      if (output) {
                                        const data = {
                                          Li_PersonalNum:
                                            output.Lo_PersonalNumId,
                                        };
                                        ReceiptMaintainIssueAction.individualAction(
                                          data
                                        )
                                          .then((res) => {
                                            this.formRef.current.setFieldsValue(
                                              {
                                                PersonalNum:
                                                  output.Lo_PersonalNumId,
                                                kana_name: res.kana_name,
                                                Gender: res.Gender,
                                                kanji_name: res.kanji_name,
                                                birthday_on: res.birthday_on,
                                                Age: res.Age,
                                                disabled_05: res.disabled_05,
                                                VL1_: res.V1_Add1nAdd2,
                                                disabled_01: res.disabled_01,
                                                disabled_02: res.disabled_02,
                                              }
                                            );
                                          })
                                          .finally(() => {});
                                      }

                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={6} style={{ textAlign: "right" }}>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          this.displayBtn();
                        }}
                        icon={<SearchOutlined />}
                      >
                        　検　　索
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="氏名"
                      style={{ alignSelf: "center", marginLeft: "42px" }}
                    >
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "50%" }}>
                          <Form.Item
                            name="kana_name"
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              readOnly
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            name="kanji_name"
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              readOnly
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                            />
                          </Form.Item>
                        </div>
                        <div style={{ width: "40%" }}>
                          <Form.Item
                            name="Gender"
                            style={{ width: "50px", float: "right" }}
                          >
                            <Input
                              readOnly
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </Form.Item>
                    <div style={{ width: "90%" }}>
                      <Form.Item style={{ float: "right" }}>
                        <div style={{ display: "flex" }}>
                          <Form.Item
                            name="birthday_on"
                            style={{ marginBottom: 0 }}
                          >
                            <Input readOnly style={customStyle.inputOnly} />
                          </Form.Item>
                          <Form.Item
                            name="Age"
                            style={{ marginBottom: 0, width: "50px" }}
                          >
                            <Input readOnly style={customStyle.inputOnly} />
                          </Form.Item>
                        </div>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="〒">
                      <Form.Item name="disabled_05" style={{ marginBottom: 0 }}>
                        <Input
                          type="text"
                          readOnly
                          style={customStyle.inputOnly}
                        />
                      </Form.Item>
                      <Form.Item name="VL1_" style={{ marginBottom: 0 }}>
                        <Input
                          type="text"
                          readOnly
                          style={customStyle.inputOnly}
                        />
                      </Form.Item>
                    </Form.Item>
                    <div style={{ display: "flex" }}>
                      <Form.Item label="歳"></Form.Item>
                      <Form.Item
                        name="disabled_01"
                        label="ＴＥＬ1"
                        style={{ width: "40%" }}
                      >
                        <Input readOnly style={customStyle.inputOnly} />
                      </Form.Item>
                      <Form.Item
                        name="disabled_02"
                        label="ＴＥＬ２"
                        style={{ width: "40%" }}
                      >
                        <Input readOnly style={customStyle.inputOnly} />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </div>

              <div hidden={this.state.Billing !== 4}>
                <Row gutter={24}>
                  <Col span={18}>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "7px",
                        marginLeft: "42px",
                        marginBottom: "9px",
                      }}
                    >
                      <label
                        style={{
                          marginRight: "5px",
                          fontWeight: "bold",
                          color: "#14468C",
                        }}
                      >
                        {" "}
                        保険者番号{" "}
                      </label>
                      <Form.Item
                        name="InsurerNum"
                        style={{ marginRight: "10px" }}
                      >
                        <Input.Search
                          readOnly
                          maxLength={8}
                          style={{ width: "140px" }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "80%",
                                component: (
                                  <WS0246001_InsurerInfoSearchQuery
                                    onFinishScreen={(output) => {
                                      if (output) {
                                        const data = {
                                          Li_InsurerNum: output.Lo_InsurerCode,
                                        };
                                        ReceiptMaintainIssueAction.DesignatedAction(
                                          data
                                        )
                                          .then((res) => {
                                            this.formRef.current.setFieldsValue(
                                              {
                                                InsurerNum:
                                                  output.Lo_InsurerCode,
                                                insurer_kana_name:
                                                  res.insurer_kana_name,
                                                insurer_kanji_name:
                                                  res.insurer_kanji_name,
                                                ZipCode: res.ZipCode,
                                                phone_number: res.phone_number,
                                                fax: res.fax,
                                                VL1_: res.VL1_Add1nAdd2,
                                              }
                                            );
                                          })
                                          .finally(() => {});
                                      }
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={6} style={{ textAlign: "right" }}>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          this.displayBtn();
                        }}
                        icon={<SearchOutlined />}
                      >
                        　検　　索
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="名称"
                      style={{ alignSelf: "center", marginLeft: "42px" }}
                    >
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "90%" }}>
                          <Form.Item
                            name="insurer_kana_name"
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              readOnly
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            name="insurer_kanji_name"
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              readOnly
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="〒">
                      <Form.Item name="ZipCode" style={{ marginBottom: 0 }}>
                        <Input
                          type="text"
                          readOnly
                          style={customStyle.inputOnly}
                        />
                      </Form.Item>
                      <Form.Item name="VL1_" style={{ marginBottom: 0 }}>
                        <Input
                          type="text"
                          readOnly
                          style={customStyle.inputOnly}
                        />
                      </Form.Item>
                    </Form.Item>
                    <div style={{ display: "flex" }}>
                      <Form.Item
                        name="phone_number"
                        label="ＴＥＬ"
                        style={{ width: "40%" }}
                      >
                        <Input readOnly style={customStyle.inputOnly} />
                      </Form.Item>
                      <Form.Item
                        name="fax"
                        label="FAX"
                        style={{ width: "40%" }}
                      >
                        <Input readOnly style={customStyle.inputOnly} />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </div>

              <div hidden={this.state.Billing !== 5}>
                <Row gutter={24}>
                  <Col span={18}>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "7px",
                        marginLeft: "42px",
                        marginBottom: "9px",
                      }}
                    >
                      <label
                        style={{
                          marginRight: "5px",
                          fontWeight: "bold",
                          color: "#14468C",
                        }}
                      >
                        {" "}
                        保険者番号{" "}
                      </label>
                      <Form.Item
                        name="OfficeNum"
                        style={{ marginRight: "10px" }}
                      >
                        <Input.Search
                          readOnly
                          maxLength={8}
                          style={{ width: "140px" }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "80%",
                                component: (
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    Lio_OfficeCode={this.formRef.current.getFieldValue(
                                      "OfficeNum"
                                    )}
                                    Lio_BranchStoreCode={this.formRef.current.getFieldValue(
                                      "BranchStoreCode"
                                    )}
                                    onFinishScreen={(output) => {
                                      console.log(67567567, output);
                                      if (output) {
                                        const data = {
                                          Li_OfficeCode: output.Lio_OfficeCode,
                                          Li_BranchStoreCode:
                                            output.Lio_BranchStoreCode,
                                        };
                                        ReceiptMaintainIssueAction.specifiedOfficeAction(
                                          data
                                        )
                                          .then((res) => {
                                            this.formRef.current.setFieldsValue(
                                              {
                                                OfficeNum:
                                                  output.recordData.office_code,
                                                BranchStoreCode:
                                                  output.recordData
                                                    .branch_store_code,
                                                office_kanji_name:
                                                  res.office_kanji_name,
                                                office_kana_name:
                                                  res.office_kana_name,
                                                phone_number: res.phone_number,
                                                postal_code: res.postal_code,
                                                VL1_: res.V1_Add1nAdd2,
                                                fax: res.fax,
                                              }
                                            );
                                          })
                                          .finally(() => {});
                                      }

                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                      <label style={{ marginRight: "10px" }}>-</label>
                      <Form.Item name="BranchStoreCode">
                        <InputNumber maxLength={5} style={{ width: "80px" }} />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={6} style={{ textAlign: "right" }}>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          this.displayBtn();
                        }}
                        icon={<SearchOutlined />}
                      >
                        　検　　索
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="名称"
                      style={{ alignSelf: "center", marginLeft: "42px" }}
                    >
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "90%" }}>
                          <Form.Item
                            name="office_kana_name"
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              readOnly
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            name="office_kanji_name"
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              readOnly
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="〒">
                      <Form.Item name="postal_code" style={{ marginBottom: 0 }}>
                        <Input
                          type="text"
                          readOnly
                          style={customStyle.inputOnly}
                        />
                      </Form.Item>
                      <Form.Item name="VL1_" style={{ marginBottom: 0 }}>
                        <Input
                          type="text"
                          readOnly
                          style={customStyle.inputOnly}
                        />
                      </Form.Item>
                    </Form.Item>
                    <div style={{ display: "flex" }}>
                      {/* <Form.Item label="歳"></Form.Item> */}
                      <Form.Item
                        name="phone_number"
                        label="ＴＥＬ"
                        style={{ width: "40%" }}
                      >
                        <Input readOnly style={customStyle.inputOnly} />
                      </Form.Item>
                      <Form.Item
                        name="fax"
                        label="FAX"
                        style={{ width: "40%" }}
                      >
                        <Input readOnly style={customStyle.inputOnly} />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </div>

              <div hidden={this.state.Billing !== 10}>
                <Row gutter={24}>
                  <Col span={18}>
                    <Form.Item
                      style={{ marginLeft: "73px" }}
                      name="Address"
                      label="名称"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ textAlign: "right" }}>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          this.displayBtn();
                        }}
                        icon={<SearchOutlined />}
                      >
                        　検　　索
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
          <Card className="mb-3">
            <Table
              pagination={false}
              loading={this.state.isLoadingTable}
              dataSource={this.state.dataSource}
              rowKey={(record) => record.id}
              scroll={{ y: 400 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    this.setState({ rowSelect: record });
                  },
                };
              }}
            >
              <Table.Column
                width={90}
                dataIndex="W1_target"
                title={
                  <div style={{ textAlign: "start" }}>
                    <Form.Item name="checkAll" valuePropName="checked">
                      <Checkbox
                        onChange={(event) => {
                          this.onCheckAll(event.target.checked);
                        }}
                      ></Checkbox>
                    </Form.Item>
                  </div>
                }
                render={(value, record, index) => (
                  <Checkbox
                    checked={record.W1_target}
                    onChange={(event) => {
                      this.onChangeCheckedRecord(index, event.target.checked);
                    }}
                  ></Checkbox>
                )}
              />
              <Table.Column title="領収番号" dataIndex="W1_receipt_issue_num" />
              <Table.Column title="受診日" dataIndex="W1_consult_date" />
              <Table.Column title="個人番号" dataIndex="W1_person_num" />
              <Table.Column title="宛名" dataIndex="W1_address" />
              <Table.Column title="ｺｰｽ" dataIndex="W1_course" />
              <Table.Column title="件名" dataIndex="W1_subject" />
              <Table.Column title="発行日" dataIndex="W1_effective_date" />
              <Table.Column title="領収金額" dataIndex="W1_receipt_amount" />
              <Table.Column title="発行" dataIndex="issue_number_of_times" />
              <Table.Column title="備考" dataIndex="W1_remark" />
              <Table.Column
                title="状態"
                dataIndex="Expression_46"
                render={(text, record) => (
                  <div
                    style={{ color: Color(record.Expression_47)?.Foreground }}
                  >
                    {record.Expression_46}
                  </div>
                )}
              />
              <Table.Column
                width={90}
                align="center"
                fixed="right"
                render={(value, record) => {
                  return (
                    <Dropdown
                      overlay={() => (
                        <Menu>
                          <Menu.Item
                            onClick={() => {
                              Modal.confirm({
                                width: "300px",
                                // title: "確認",
                                content: "削除の状態に切れ替えますか？",
                                okText: "は　い",
                                cancelText: "いいえ",
                                onOk: () => {
                                  this.user1Action(record);
                                },
                              });
                            }}
                          >
                            削除
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
          </Card>
          <Card>
            <Row gutter={24}>
              <Col xl={18} lg={24}>
                <Form.Item label="領収額" {...grid}>
                  <Space>
                    <Form.Item
                      hidden={this.state.disabledAmount}
                      name="ReceiptAmount"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        type="number"
                        maxLength={8}
                        style={{ width: "120px" }}
                      />
                    </Form.Item>
                    <Form.Item
                      hidden={!this.state.disabledAmount}
                      name="ReceiptAmount"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        readOnly
                        style={{
                          ...customStyle.inputOnly,
                          ...{ width: "120px" },
                        }}
                      />
                    </Form.Item>
                    <label style={{ fontWeight: "bold", color: "#14468C" }}>
                      消費税
                    </label>
                    <Form.Item
                      name="Tax"
                      style={{ marginBottom: 0 }}
                      hidden={this.state.disabledAmount}
                    >
                      <Input
                        type="number"
                        maxLength={8}
                        style={{ width: "120px" }}
                        formatter={(value) =>
                          `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        hidden={this.state.disabledAmount}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="事業所" {...grid}>
                  <Space hidden={this.state.disabledAmount}>
                    <Form.Item name="OfficeCodeNew" style={{ marginBottom: 0 }}>
                      <Input.Search
                        readOnly
                        maxLength={8}
                        style={{ width: "100px" }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "80%",
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  Lio_OfficeCode={this.formRef.current.getFieldValue(
                                    "OfficeCodeNew"
                                  )}
                                  Lio_BranchStoreCode={this.formRef.current.getFieldValue(
                                    "BranchStoreCodeNew"
                                  )}
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      OfficeCodeNew: output.Lio_OfficeCode,
                                      BranchStoreCodeNew:
                                        output.Lio_BranchStoreCode,
                                      office_kanji_name: output.Lo_Kanji_Name,
                                    });
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <label>-</label>
                    <Form.Item
                      name="BranchStoreCodeNew"
                      style={{ marginBottom: 0 }}
                    >
                      <Input.Search
                        readOnly
                        maxLength={8}
                        style={{ width: "100px" }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "80%",
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  Lio_OfficeCode={this.formRef.current.getFieldValue(
                                    "OfficeCodeNew"
                                  )}
                                  Lio_BranchStoreCode={this.formRef.current.getFieldValue(
                                    "BranchStoreCodeNew"
                                  )}
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      OfficeCodeNew: output.Lio_OfficeCode,
                                      BranchStoreCodeNew:
                                        output.Lio_BranchStoreCode,
                                      office_kanji_name: output.Lo_Kanji_Name,
                                    });
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="office_kanji_name"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        readOnly
                        style={{
                          width: "250px",
                          border: "none",
                          background: "transparent",
                        }}
                        hidden={this.state.disabledAmount}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name="Address" label="宛　名" {...grid}>
                  <Input hidden={this.state.disabledAmount} />
                </Form.Item>
                <Form.Item name="Subject" label="件　名" {...grid}>
                  <Input hidden={this.state.disabledAmount} />
                </Form.Item>
                <Form.Item name="Remarks" label="備　考" {...grid}>
                  <Input hidden={this.state.disabledAmount} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>

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
)(WS0958001_ReceiptMaintainIssue);
