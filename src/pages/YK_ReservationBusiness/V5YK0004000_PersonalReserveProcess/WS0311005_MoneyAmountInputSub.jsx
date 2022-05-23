/* eslint-disable eqeqeq */
import React from "react";
import PropTypes from "prop-types";

import {
  Card,
  Form,
  Input,
  Radio,
  Button,
  Row,
  Col,
  Select,
  InputNumber,
  Tag,
  Checkbox,
  Spin,
} from "antd";
import Text from "antd/lib/typography/Text";
import Color from "constants/Color";

import { number_format } from "helpers/CommonHelpers";
import MagicXpaFunc from "helpers/MagicXpaFunc";

import axios from "configs/axios";

class WS0311005_MoneyAmountInputSub extends React.Component {
  static propTypes = {
    Li_TaxClassify: PropTypes.any,
    Li_Rounding: PropTypes.any,
    Li_TaxRate: PropTypes.any,
    Li_OtherGroupDivision: PropTypes.any,
    Li_Title: PropTypes.any,
    Lio_InsurerUnitPriceAmount: PropTypes.any,
    Lio_InsurerTax: PropTypes.any,
    Lio_InsurerTotal: PropTypes.any,
    Lio_OfficeUnitPriceAmount: PropTypes.any,
    Lio_OfficeTax: PropTypes.any,
    Lio_OfficeTotal: PropTypes.any,
    Lio_OtherGroupUnitPriceAmount: PropTypes.any,
    Lio_OtherGroupTax: PropTypes.any,
    Lio_OtherGroupTotal: PropTypes.any,
    Lio_Personal1UnitPriceAmount: PropTypes.any,
    Lio_Personal1Tax: PropTypes.any,
    Lio_Personal1Total: PropTypes.any,
    Lio_Person2UnitPriceAmount: PropTypes.any,
    Lio_Person2Tax: PropTypes.any,
    Lio_Person2Total: PropTypes.any,
    Lio_Personal3UnitPriceAmount: PropTypes.any,
    Lio_Personal3Tax: PropTypes.any,
    Lio_Personal3Total: PropTypes.any,
    Lio_StsChange: PropTypes.any,
    Li_Protection: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "金額入力";

    this.state = {
      isLoading: false,

      Li_Protection: props.Li_Protection || "      ",
    };
  }

  componentDidMount() {
    this.loadScreenData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.loadScreenData();
    }
  }

  loadScreenData = () => {
    this.setState({ isLoading: true });

    this.setFormFieldsValue(this.props);

    axios
      .get("/api/personal-reserve-process/money-amount-input-sub/getScreenData")
      .then((res) => {
        this.setState(res.data);
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }));
  };

  TaxCalculateBtn = (callback) => {
    this.setState({ isLoading: true });

    axios
      .post(
        "/api/personal-reserve-process/money-amount-input-sub/TaxCalculateBtn",
        this.formRef.current.getFieldsValue()
      )
      .then((res) => {
        this.setFormFieldsValue(res.data);
        this.setFormFieldsValue({
          Lio_StsChange: true,
        });

        if (callback) {
          callback();
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }));
  };

  getFormFieldValue(namePath) {
    return this.formRef.current?.getFieldValue(namePath);
  }

  setFormFieldsValue = (data) => {
    this.formRef.current?.setFieldsValue(data);
  };

  onFinish = (values) => {
    this.TaxCalculateBtn(() => {
      const func = this.props.onTaxCalculateBtn || this.props.onFinishScreen;
      func(this.formRef.current.getFieldsValue());
    });
  };

  render() {
    return (
      <div className="money-amount-input-sub">
        <Card title="金額入力">
          <Spin spinning={this.state.isLoading}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{
                TaxClassify: this.props.Li_TaxClassify,
                Rounding: this.props.Li_Rounding,
                TaxRate: this.props.Li_TaxRate,
                Protection: this.state.Li_Protection.replace(/ /g, "0"),
                StsTaxChange: false,
                StsTaxCalculated: false,
                Lio_StsChange: false,
              }}
            >
              <Form.Item name="StsTaxChange" valuePropName="checked" hidden>
                <Checkbox />
              </Form.Item>
              <Form.Item name="StsTaxCalculated" valuePropName="checked" hidden>
                <Checkbox />
              </Form.Item>
              <Form.Item name="Protection" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="Lio_StsChange" valuePropName="checked" hidden>
                <Checkbox />
              </Form.Item>
              <Form.Item name="Li_Protection" hidden>
                <Input />
              </Form.Item>

              <Row gutter={10} style={{ textAlign: "center" }}>
                <Col offset={3} span={3}>
                  <Text
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "4px 0",
                    }}
                  >
                    <Tag
                      color={Color(156).Background}
                      style={{ width: "100%" }}
                    >
                      保険者
                    </Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "4px 0",
                    }}
                  >
                    <Tag
                      color={Color(156).Background}
                      style={{ width: "100%" }}
                    >
                      事業所
                    </Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "4px 0",
                    }}
                  >
                    <Tag
                      color={
                        MagicXpaFunc.MID(
                          this.getFormFieldValue("Protection"),
                          3,
                          1
                        ) == "0" && this.props.Li_OtherGroupDivision > 0
                          ? Color(156).Background
                          : "grey"
                      }
                      style={{ width: "100%" }}
                    >
                      他団体
                    </Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "4px 0",
                    }}
                  >
                    <Tag
                      color={Color(156).Background}
                      style={{ width: "100%" }}
                    >
                      個人１
                    </Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "4px 0",
                    }}
                  >
                    <Tag
                      color={Color(156).Background}
                      style={{ width: "100%" }}
                    >
                      個人２
                    </Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "4px 0",
                    }}
                  >
                    <Tag
                      color={Color(156).Background}
                      style={{ width: "100%" }}
                    >
                      個人３
                    </Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "4px 0",
                    }}
                  >
                    <Tag
                      color={Color(156).Background}
                      style={{ width: "100%" }}
                    >
                      合計
                    </Tag>
                  </Text>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={3}>
                  <span>単　価</span>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_InsurerUnitPriceAmount">
                    <InputNumber
                      formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(0, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") != 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_OfficeUnitPriceAmount">
                    <InputNumber
                      formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(1, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") != 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_OtherGroupUnitPriceAmount">
                    <InputNumber
                        formatter={(value) =>
                          value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(2, 1) ==
                            "0" && this.props.Li_OtherGroupDivision > 0
                        ) || !(this.getFormFieldValue("TaxClassify") != 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_Personal1UnitPriceAmount">
                    <InputNumber
                        formatter={(value) =>
                          value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(3, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") != 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_Person2UnitPriceAmount">
                    <InputNumber
                       formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(4, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") != 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_Personal3UnitPriceAmount">
                    <InputNumber
                         formatter={(value) =>
                          value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(5, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") != 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item>
                    <InputNumber
                      readOnly
                      value={
                        number_format(
                          (this.getFormFieldValue(
                            "Lio_InsurerUnitPriceAmount"
                          ) || 0) +
                            (this.getFormFieldValue(
                              "Lio_OfficeUnitPriceAmount"
                            ) || 0) +
                            (this.getFormFieldValue(
                              "Lio_OtherGroupUnitPriceAmount"
                            ) || 0) +
                            (this.getFormFieldValue(
                              "Lio_Personal1UnitPriceAmount"
                            ) || 0) +
                            (this.getFormFieldValue(
                              "Lio_Person2UnitPriceAmount"
                            ) || 0) +
                            (this.getFormFieldValue(
                              "Lio_Personal3UnitPriceAmount"
                            ) || 0)
                        ) || 0
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={3}>消費税</Col>
                <Col span={3}>
                  <Form.Item name="Lio_InsurerTax">
                    <InputNumber
                     formatter={(value) =>
                      value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(0, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 0)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_OfficeTax">
                    <InputNumber
                      formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(1, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 0)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_OtherGroupTax">
                    <InputNumber
                       formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(2, 1) ==
                            "0" && this.props.Li_OtherGroupDivision > 0
                        ) || !(this.getFormFieldValue("TaxClassify") == 0)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_Personal1Tax">
                    <InputNumber
                        formatter={(value) =>
                          value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(3, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 0)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_Person2Tax">
                    <InputNumber
                      formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(4, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 0)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_Personal3Tax">
                    <InputNumber
                      formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(5, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 0)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item>
                    <InputNumber
                      readOnly
                      value={
                        number_format(
                          (this.getFormFieldValue("Lio_InsurerTax") || 0) +
                            (this.getFormFieldValue("Lio_OfficeTax") || 0) +
                            (this.getFormFieldValue("Lio_OtherGroupTax") || 0) +
                            (this.getFormFieldValue("Lio_Personal1Tax") || 0) +
                            (this.getFormFieldValue("Lio_Person2Tax") || 0) +
                            (this.getFormFieldValue("Lio_Personal3Tax") || 0)
                        ) || 0
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={3}>合　計</Col>
                <Col span={3}>
                  <Form.Item name="Lio_InsurerTotal">
                    <InputNumber
                     formatter={(value) =>
                      value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(0, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_OfficeTotal">
                    <InputNumber
                       formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(1, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_OtherGroupTotal">
                    <InputNumber
                      formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(2, 1) ==
                            "0" && this.props.Li_OtherGroupDivision > 0
                        ) || !(this.getFormFieldValue("TaxClassify") == 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_Personal1Total">
                    <InputNumber
                       formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(3, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_Person2Total">
                    <InputNumber
                         formatter={(value) =>
                          value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(4, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="Lio_Personal3Total">
                    <InputNumber
                       formatter={(value) =>
                        value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(",", "")}
                      disabled={
                        !(
                          this.getFormFieldValue("Protection")?.substr(5, 1) ==
                          "0"
                        ) || !(this.getFormFieldValue("TaxClassify") == 2)
                      }
                      onChange={() => this.forceUpdate()}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item>
                    <InputNumber
                      readOnly
                      value={
                        number_format(
                          (this.getFormFieldValue("Lio_InsurerTotal") || 0) +
                            (this.getFormFieldValue("Lio_OfficeTotal") || 0) +
                            (this.getFormFieldValue("Lio_OtherGroupTotal") ||
                              0) +
                            (this.getFormFieldValue("Lio_Personal1Total") ||
                              0) +
                            (this.getFormFieldValue("Lio_Person2Total") || 0) +
                            (this.getFormFieldValue("Lio_Personal3Total") || 0)
                        ) || 0
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col offset={3} span={10}>
                  <Form.Item name="TaxClassify">
                    <Radio.Group
                      disabled={
                        !(
                          this.getFormFieldValue("StsTaxChange") ||
                          this.props.Li_TaxClassify == 0
                        )
                      }
                      onChange={(e) => {
                        this.setState({ TaxClassify: e.target.value });
                      }}
                    >
                      <Radio value={0}>指定</Radio>
                      <Radio value={1}>外税</Radio>
                      <Radio value={2}>内税</Radio>
                      <Radio value={3}>非課</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="Rounding">
                    <Select
                      style={{ width: "120px" }}
                      disabled={!this.getFormFieldValue("StsTaxChange")}
                    >
                      <Select.Option value={0}>四捨五入</Select.Option>
                      <Select.Option value={1}>切捨</Select.Option>
                      <Select.Option value={2}>切上</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name="TaxRate">
                    <InputNumber
                      style={{ backgroundColor: "#e6e6e6" }}
                      disabled={!this.getFormFieldValue("StsTaxChange")}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item>
                    <Button block type="primary" htmlType="submit">
                      税計算
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

export default WS0311005_MoneyAmountInputSub;
