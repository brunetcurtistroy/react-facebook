import React from "react";
import { connect } from "react-redux";

import { Card, Spin, Col, Form, Input, Radio, Row, Select, Table } from "antd";
import PaymentCorrectSubAction from "redux/CounterBusiness/Counter/PaymentCorrectSub.actions";
import { debounce } from "lodash";

class WS0956001_PaymentCorrectSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "入金訂正SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTable: true,
      selectedRowTableFirst: [],
      dataSource: [],
      rowSelect: {},
      dataForm: {},
      change: {
        PayDateChar: "",
        WithdrawalFormChar: "",
        Identify: "",
      },
      isloadingForm: true,
      selectedRows: {},
      selectedRowKeys: [],
    };
  }
  componentDidMount() {
    this.getIndex();
  }
  onFinish(values) {}
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getIndex();
      this.onChangeOption();
    }
  }

  handleSelectRowsTableFirst = (selectedRowTableFirst) => {
    this.setState({ selectedRowTableFirst });
    console.log(selectedRowTableFirst);
    this.setState({ rowSelect: selectedRowTableFirst });
  };
  onChangeOption(e, name) {
    // this.setState({ option: e.target.value })
    // this.getPaymentCorectSub();
    console.log(12, e, 14, name);
    let changes = {
      ...this.state.change,
      [name]: e,
    };
    this.setState({ change: changes });
    this.getPaymentCorectSub(changes);
  }
  getIndex(e) {
    this.setState({ isloadingForm: true });
    const data = {
      Li_BillingManageNum: this.props.Li_BillingManageNum,
      Li_Identify: this.props.Li_Identify ? this.props.Li_Identify : 1,
      Li_PayDateChar: this.props.Li_PayDateChar
        ? this.props.Li_PayDateChar
        : "",
      Li_WithdrawalFormChar: this.props.Li_WithdrawalFormChar
        ? this.props.Li_WithdrawalFormChar
        : "",
    };
    PaymentCorrectSubAction.getIndex(data)
      .then((res) => {
        if (res) {
          this.setState({
            dataForm: res,
          });
        }
        this.getPaymentCorectSub();
      })
      .finally(() => this.setState({ isloadingForm: false }));
  }
  getPaymentCorectSub(changes) {
    this.setState({ isLoadingTable: true });
    const data = {
      Li_BillingManageNum: this.state.dataForm.Li_BillingManageNum,

      Li_Identify: changes ? changes.Identify : this.state.dataForm.Li_Identify,

      Li_PayDay: changes ? changes.PayDateChar : this.state.dataForm.PayDay,

      Li_DepositAndWithdrawalForm: changes
        ? changes.WithdrawalFormChar
        : this.state.dataForm.WithdrawalFormChar,
    };
    PaymentCorrectSubAction.getPaymentCorectSub(data)
      .then((res) => {
        if (res) {
          const lastSelected = res?.find(
            (elmt) => elmt.id === this.state.selectedRows.id
          );
          const selected = lastSelected ? lastSelected : res[0] || {};
          this.setState({
            dataSource: res,
            selectedRows: selected,
            selectedRowKeys: [selected.id],
            rowSelect: selected,
          });
          this.formRef.current?.setFieldsValue({
            record: selected,
          });
          this.formRef.current.setFieldsValue({ tableData: res });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }));
  }
  onChangeInput = debounce((e, name, record) => {
    let change = {
      payment_day_on: "",
      payment_comment: "",
      WithdrawalFormChar: "",
      CreditCompanyNumChar: ""
    };
    change[name] = e;
    const data = {
      payment_day_on: change.payment_day_on
        ? change.payment_day_on
        : record.payment_day_on,
      payment_comment: change.payment_comment
        ? change.payment_comment
        : record.payment_comment,
        WithdrawalFormChar: change.WithdrawalFormChar  ? change.WithdrawalFormChar
        : record.WithdrawalFormChar,
        CreditCompanyNumChar: change.CreditCompanyNumChar ? change.CreditCompanyNumChar : record.CreditCompanyNumChar,
      id: record.id,
    };
   console.log(data);
    PaymentCorrectSubAction.saveAction(data).then((res) => {
      this.getPaymentCorectSub();
    });
  }, 500);

  render() {
    const { selectedRowTableFirst } = this.state;

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst,
    };

    return (
      <div className="payment-correct-sub">
        <Card title="入金訂正SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              text_field_1: "入 金 額",
              text_field_2: "手 数 料",
              text_field_3: "入 金 日",
              text_field_4: "入金形態",
              Identify: "1",
            }}
          >
            <Spin spinning={this.state.isloadingForm}>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="PayDateChar" label="入金日">
                    <Input
                      onChange={(e) => {
                        this.onChangeOption(e.target.value, "PayDateChar");
                      }}
                      type="text"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="WithdrawalFormChar">
                    <Select
                      onChange={(e) =>
                        this.onChangeOption(e, "WithdrawalFormChar")
                      }
                    >
                      <Select.Option value=""></Select.Option>
                      <Select.Option value="01">現　金</Select.Option>
                      <Select.Option value="02">ｸﾚｼﾞｯﾄ</Select.Option>
                      <Select.Option value="03">振　込</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Identify" label="">
                    <Radio.Group
                      onChange={(e) =>
                        this.onChangeOption(e.target.value, "Identify")
                      }
                      disabled={this.state.isLoadingTable}
                    >
                      <Radio value="1">個人1</Radio>
                      <Radio value="2">個人2</Radio>
                      <Radio value="3">個人3</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Spin>
            <Row gutter={16}>
              <Col span={16}>
                <Table
                  dataSource={this.state.dataSource}
                  bordered={true}
                  pagination={false}
                  loading={this.state.isLoadingTable}
                  rowKey={(record) => record.id}
                  rowSelection={{
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                      const selected = selectedRows[0];
                      console.log(34343434343, selected);
                      this.setState({
                        selectedRowKeys: [selected.id],
                        selectedRows: selected,
                        rowSelect: selected,
                      });
                      this.formRef.current?.setFieldsValue({
                        record: selected,
                      });
                    },
                    onSelect: (record, selected) => {
                      this.setState({ rowSelect: record });
                      this.formRef.current?.setFieldsValue({
                        record: record,
                      });
                    },
                  }}
                >
                  <Table.Column
                    title="区分"
                    dataIndex="Expression_8"
                    render={(value, record, index) => (
                      <Form.Item style={{ marginBottom: "0" }}>
                        {record.Expression_8 === "入金" ? (
                          <div style={{ color: "blue" }}>
                            {record.Expression_8}
                          </div>
                        ) : null}
                         {record.Expression_8 === "出金" ? (
                          <div style={{ color: "red" }}>
                            {record.Expression_8}
                          </div>
                        ) : null}
                      </Form.Item>
                    )}
                  />
                  <Table.Column title="入金日" dataIndex="payment_day_on" />
                  <Table.Column
                    title="入出金形態"
                    dataIndex="WithdrawalFormDisplay"
                    render={(value, record, index) => (
                      <Form.Item name="" style={{ marginBottom: "0" }}>
                        {record.WithdrawalFormDisplay === "01" ? (
                          <div>現　金</div>
                        ) : null}
                        {record.WithdrawalFormDisplay === "02" ? (
                          <div>ｸﾚｼﾞｯﾄ</div>
                        ) : null}
                        {record.WithdrawalFormDisplay === "03" ? (
                          <div style={{color: "blue"}}>振　込</div>
                        ) : null}
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="金額"
                    dataIndex="Expression_28"
                    render={(text, record) => (
                      <p style={{ textAlign: "right", margin: 0 }}>
                        {text === 0 || text === "0"
                          ? null
                          : text.toLocaleString()}
                      </p>
                    )}
                  />
                  <Table.Column
                    title="入金コメント"
                    dataIndex="payment_comment"
                    render={(value, record, index) => (
                      <Form.Item
                        name={["tableData", index, "payment_comment"]}
                        style={{ marginBottom: "0" }}
                      >
                        <Input
                          onChange={(e) => {
                            this.onChangeInput(e.target.value, "payment_comment", record);
                          }}
                          name="payment_comment"
                          type="text"
                        />
                      </Form.Item>
                    )}
                  />
                </Table>
              </Col>
              <Col span={8}>
                <Row gutter={16}>
                  <Col span={24}>
                    <span>金額</span>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12} style={{ paddingRight: "0" }}>
                    <Form.Item
                      name="text_field_1"
                      style={{ marginBottom: "4px" }}
                    >
                      <Input
                        readOnly
                        type="text"
                        style={{
                          backgroundColor: "#1890ff",
                          color: "#ffffff",
                          textAlign: "center",
                          cursor: "default"
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["record", "deposit_withdraw_amount"]}
                      style={{ marginBottom: "4px" }}
                    >
                      {/* <Input
                        style={{ textAlign: "right" }}
                        readOnly
                        type="text"
                      /> */}
                      <div
                        style={{ border: "1px solid #d9d9d9", height: "24px" }}
                      >
                        {this.state.rowSelect.deposit_withdraw_amount &&
                          this.state.rowSelect.deposit_withdraw_amount.toLocaleString()}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} className="mb-3">
                  <Col span={12} style={{ paddingRight: "0" }}>
                    <Form.Item name="text_field_2">
                      <Input
                        readOnly
                        type="text"
                        style={{
                          backgroundColor: "#1890ff",
                          color: "#ffffff",
                          textAlign: "center",
                          cursor: "default"
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={["record", "transfer_fee"]}>
                      <Input
                        readOnly
                        style={{ textAlign: "right", cursor: "default" }}
                        type="text"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <span>属性</span>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12} style={{ paddingRight: "0" }}>
                    <Form.Item
                      name="text_field_3"
                      style={{ marginBottom: "4px" }}
                    >
                      <Input
                        readOnly
                        type="text"
                        style={{
                          backgroundColor: "#1890ff",
                          color: "#ffffff",
                          textAlign: "center",
                          cursor: "default"
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["record", "PayDateChar"]}
                      style={{ marginBottom: "4px" }}
                    >
                      <Input
                        onChange={(e) => {
                          this.onChangeInput(
                            e.target.value,
                            "payment_day_on",
                            this.state.rowSelect
                          );
                        }}
                        type="text"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12} style={{ paddingRight: "0" }}>
                    <Form.Item name="text_field_4">
                      <Input
                        readOnly
                        type="text"
                        style={{
                          backgroundColor: "#1890ff",
                          color: "#ffffff",
                          textAlign: "center",
                          cursor: "default"
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={["record", "WithdrawalFormChar"]}>
                      <Select onChange={(e) => {
                          this.onChangeInput(
                            e,
                            "WithdrawalFormChar",
                            this.state.rowSelect
                          );
                        }}>
                        <Select.Option value="01">現　金</Select.Option>
                        <Select.Option value="02">ｸﾚｼﾞｯﾄ</Select.Option>
                        <Select.Option value="03">振　込</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} className="mb-3">
                  <Col span={24}>
                    <Form.Item name={["record", "CreditCompanyNumChar"]}>
                      <Select onChange={(e) => {
                          this.onChangeInput(
                            e,
                            "CreditCompanyNumChar",
                            this.state.rowSelect
                          );
                        }} disabled={this.state.rowSelect.WithdrawalFormChar === "02" ? false : true}>
                      <Select.Option value="01">VISA</Select.Option>
                      <Select.Option value="02">Master</Select.Option>
                      <Select.Option value="03">JBC</Select.Option>
                      <Select.Option value="04">AMEX</Select.Option>
                      <Select.Option value="05">Diners Clube</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <span></span>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <span style={{ fontSize: "18px", marginRight: "25px" }}>
                      {this.state.rowSelect.processing_date_on}
                    </span>
                    <span>{this.state.rowSelect.processing_time_at}</span>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <span>{this.state.rowSelect.user_name}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0956001_PaymentCorrectSub);
