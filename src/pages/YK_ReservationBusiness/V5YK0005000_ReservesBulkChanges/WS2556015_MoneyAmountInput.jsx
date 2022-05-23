import React from "react";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Radio, Checkbox, Button, Row, Col, Popconfirm, Modal, Tag, Spin, InputNumber, message } from "antd";
import Text from "antd/lib/typography/Text";

import axios from 'configs/axios';
import WS0302001_SetInfoSearch from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0302001_SetInfoSearch";
import Color from "constants/Color";
import { getScreenMoneyAmountInputAction, taxCalculateMoneyAmountInputAction } from "redux/ReservationBusiness/ReservesBulkChanges/MoneyAmountInput.actions";

class WS2556015_MoneyAmountInput extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_Date: PropTypes.any,
    Lio_NewAndDelete: PropTypes.any,
    Lio_ContractPriority: PropTypes.any,
    Lio_Tax: PropTypes.any,
    Lo_StsEnter: PropTypes.any,

    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '金額入力';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initialValues: {
        Lio_NewAndDelete: 0,
        W2_change_type: 50,
        W2_set_inspect_cd: '',
        set_short_name: '',
        Lio_ContractPriority: true,
        TaxClassify: 2,
        Lio_Tax: 0.10,
      },
      isLoading: false,
      isLoadingTaxCalculate: false,
      screenData: {},
      valueInput: {
        W2_insurer_unit_price: 0,
        W2_office_unit_price: 0,
        W2_other_org_unit_price: 0,
        W2_person_1_unit_price: 0,
        W2_person_2_unit_price: 0,
        W2_person_3_unit_price: 0,

        W2_insurer_tax: 0,
        W2_office_tax: 0,
        W2_other_org_tax: 0,
        W2_person_1_tax: 0,
        W2_person_2_tax: 0,
        W2_person_3_tax: 0,

        W2_insurer_total: 0,
        W2_office_total: 0,
        W2_other_org_total: 0,
        W2_person_1_total: 0,
        W2_person_2_total: 0,
        W2_person_3_total: 0,
      }
    };
  }

  componentDidMount = () => {
    this.loadInitData({
      Li_ContractType: this.props.Li_ContractType,
      Li_ContractOrgCode: this.props.Li_ContractOrgCode,
      Li_ContractStartDate: this.props.Li_ContractStartDate,
      Li_ContractNum: this.props.Li_ContractNum,
      Li_Date: this.props.Li_Date,
      Lio_NewAndDelete: this.props.Lio_NewAndDelete,
      Lio_ContractPriority: this.props.Lio_ContractPriority,
      Lio_Tax: this.props.Lio_Tax,
      Lo_StsEnter: this.props.Lo_StsEnter,
    });
    this.formRef?.current.setFieldsValue({
      Lio_NewAndDelete: this.props.Lio_NewAndDelete,
      Lio_Tax: this.props.Lio_Tax,
      Lio_ContractPriority: this.props.Lio_ContractPriority,
    })
  }

  componentDidMount = (prevProps) => {
    if (this.props !== prevProps) {
      this.loadInitData({
        Li_ContractType: this.props.Li_ContractType,
        Li_ContractOrgCode: this.props.Li_ContractOrgCode,
        Li_ContractStartDate: this.props.Li_ContractStartDate,
        Li_ContractNum: this.props.Li_ContractNum,
        Li_Date: this.props.Li_Date,
        Lio_NewAndDelete: this.props.Lio_NewAndDelete,
        Lio_ContractPriority: this.props.Lio_ContractPriority,
        Lio_Tax: this.props.Lio_Tax,
        Lo_StsEnter: this.props.Lo_StsEnter,
      });
      this.formRef?.current.setFieldsValue({
        Lio_NewAndDelete: this.props.Lio_NewAndDelete,
        Lio_Tax: this.props.Lio_Tax,
        Lio_ContractPriority: this.props.Lio_ContractPriority,
      })
    }
  }

  loadInitData = (params) => {
    this.setState({ isLoading: true });
    getScreenMoneyAmountInputAction(params)
      .then(res => {
        if (res?.data) {
          this.setState({ screenData: res.data });
          this.loadData();
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  loadData = () => {
    this.setState({ isLoading: true });

    axios.get('/api/reserves-bulk-changes/money-amount-input/', {
      params: {
        Li_Date: this.props.Li_Date,
        Lo_Tax: this.props.Lio_Tax,
      },
    })
      .then(res => {
        this.formRef.current.setFieldsValue(res.data.W2_personal_exam_change);
      })
      .catch(error => {

      })
      .finally(() => this.setState({ isLoading: false }));
  }

  handleChangeInitValue = (objChange) => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        ...objChange
      }
    })
  }

  handleChangeInputNumber = (objChange) => {
    this.setState({
      valueInput: {
        ...this.state.valueInput,
        ...objChange
      }
    })
  }

  sum1 = () => {
    const {
      W2_insurer_unit_price,
      W2_office_unit_price,
      W2_other_org_unit_price,
      W2_person_1_unit_price,
      W2_person_2_unit_price,
      W2_person_3_unit_price,
    } = this.state.valueInput;

    let value =
      + W2_insurer_unit_price
      + W2_office_unit_price
      + W2_other_org_unit_price
      + W2_person_1_unit_price
      + W2_person_2_unit_price
      + W2_person_3_unit_price;

    return value === 0 ? null : (parseInt(value)).toLocaleString();
  }

  sum2 = () => {
    const {
      W2_insurer_tax,
      W2_office_tax,
      W2_other_org_tax,
      W2_person_1_tax,
      W2_person_2_tax,
      W2_person_3_tax,
    } = this.state.valueInput;

    let value = W2_insurer_tax + W2_office_tax + W2_other_org_tax + W2_person_1_tax + W2_person_2_tax + W2_person_3_tax;

    return value === 0 ? null : (parseInt(value)).toLocaleString();
  }

  sum3 = () => {
    const {
      W2_insurer_total,
      W2_office_total,
      W2_other_org_total,
      W2_person_1_total,
      W2_person_2_total,
      W2_person_3_total
    } = this.state.valueInput;

    let value = W2_insurer_total + W2_office_total + W2_other_org_total + W2_person_1_total + W2_person_2_total + W2_person_3_total;

    return value === 0 ? null : (parseInt(value)).toLocaleString();
  }

  renderInputNumber = (key, value, condition) => (
    <Col span={3}>
      <Form.Item>
        <InputNumber
          min={0}
          maxLength={6}
          bordered={condition}
          formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(',', '')}
          style={{ backgroundColor: !condition ? '#F4F4F5' : '' }}
          readOnly={!condition}
          value={value === 0 ? null : value}
          onChange={(value) => this.handleChangeInputNumber({ [key]: value })}
        />
      </Form.Item>
    </Col>
  )

  TaxCalculate = () => {
    this.setState({ isLoadingTaxCalculate: true });
    let params = {
      ...this.state.valueInput,
      TaxClassify: this.state.initialValues.TaxClassify,
      W2_set_inspect_cd: this.state.initialValues.W2_set_inspect_cd,
      ClassifyTaxAfterDecimalPoint: this.state.screenData.ClassifyTaxAfterDecimalPoint,
      Lio_Tax: this.state.initialValues.Lio_Tax,
    }
    taxCalculateMoneyAmountInputAction(params)
      .then(res => {
        if (res?.data)
          this.setState({ valueInput: res.data })
      })
      .catch()
      .finally(() => this.setState({ isLoadingTaxCalculate: false }))
  }

  render() {
    const { TaxClassify, set_short_name } = this.state.initialValues;
    const { OtherGroupDivision, CourseCode } = this.state.screenData;
    const {
      W2_insurer_unit_price,
      W2_office_unit_price,
      W2_other_org_unit_price,
      W2_person_1_unit_price,
      W2_person_2_unit_price,
      W2_person_3_unit_price,
      W2_insurer_tax,
      W2_office_tax,
      W2_other_org_tax,
      W2_person_1_tax,
      W2_person_2_tax,
      W2_person_3_tax,
      W2_insurer_total,
      W2_office_total,
      W2_other_org_total,
      W2_person_1_total,
      W2_person_2_total,
      W2_person_3_total,
    } = this.state.valueInput;
    return (
      <div className="money-amount-input">
        <Card title="金額入力">
          <Spin spinning={this.state.isLoading}>
            <Form ref={this.formRef} initialValues={this.state.initialValues}>
              <Row gutter={16} lg={24} xl={12}>
                <Col span={24}>
                  <Form.Item name='Lio_NewAndDelete'>
                    <Radio.Group onChange={(e) => this.handleChangeInitValue({ Lio_NewAndDelete: e.target.value })}>
                      <Radio value={0}>新規</Radio>
                      <Radio value={1}>削除</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name='W2_change_type'>
                    <Radio.Group onChange={(e) => this.handleChangeInitValue({ W2_change_type: e.target.value })}>
                      <Radio value={40}>ｵﾌﾟｼｮﾝ</Radio>
                      <Radio value={50}>追加</Radio>
                      <Radio value={60}>不要</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="W2_set_inspect_cd" label="　セット">
                    <Input.Search
                      maxLength={8}
                      onChange={(e) => this.handleChangeInitValue({
                        W2_set_inspect_cd: e.target.value,
                        set_short_name: ''
                      })}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1000,
                            component: (
                              <WS0302001_SetInfoSearch
                                Li_SetIdentify={''}
                                Li_StartDate={this.props.Li_Date}
                                Li_CourseCode={CourseCode}
                                _Lo_Return={''}
                                Li_ContextId={''}
                                Li_RangeSetting={''}
                                Li_CourseLevel={''}
                                Li_ReserveNum={''}
                                Li_ContractType={this.props.Li_ContractType}
                                Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                                Li_ContractStartDate={this.props.Li_ContractStartDate}
                                Li_ContractNum={this.props.Li_ContractNum}
                                Lo_SetCode={this.formRef?.current?.getFieldValue('W2_set_inspect_cd')}
                                onFinishScreen={({ Lo_SetCode, recordData }) => {
                                  this.formRef.current.setFieldsValue({ W2_set_inspect_cd: Lo_SetCode });
                                  this.handleChangeInitValue({
                                    W2_set_inspect_cd: Lo_SetCode,
                                    set_short_name: recordData.set_short_name
                                  })
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    }
                                  });
                                }}
                              />
                            ),
                          },
                        });
                      }} />
                  </Form.Item>
                </Col>
                <Col span={12}>{set_short_name}</Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name='Lio_ContractPriority' label="契約の金額を優先する" valuePropName="checked" style={{ float: 'right' }}>
                    <Checkbox onChange={(e) => this.handleChangeInitValue({ Lio_ContractPriority: e.target.checked })} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-3">
                <Col span={3} style={{ paddingRight: "0" }}></Col>
                <Col span={3}>
                  <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                    <Tag color={Color(156).Background} style={{ width: '100%' }}>保険者</Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                    <Tag color={Color(156).Background} style={{ width: '100%' }}>事業所</Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                    <Tag color={Color(156).Background} style={{ width: '100%' }}>
                      <div style={{ color: !(this.state.OtherGroupDivision > 0) ? '#6D6D6D' : '#FFFFFF' }}>他団体</div>
                    </Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                    <Tag color={Color(156).Background} style={{ width: '100%' }}>個人１</Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                    <Tag color={Color(156).Background} style={{ width: '100%' }}>個人２</Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                    <Tag color={Color(156).Background} style={{ width: '100%' }}>個人３</Tag>
                  </Text>
                </Col>
                <Col span={3}>
                  <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                    <Tag color={Color(156).Background} style={{ width: '100%' }}>合計</Tag>
                  </Text>
                </Col>
              </Row>

              <Row gutter={16} className="mb-1">
                <Col span={3} style={{ textAlign: 'center', color: '#14468C', fontWeight: 'bold' }}>単　価</Col>
                {this.renderInputNumber(
                  'W2_insurer_unit_price',
                  W2_insurer_unit_price,
                  TaxClassify !== 2
                )}
                {this.renderInputNumber(
                  'W2_office_unit_price',
                  W2_office_unit_price,
                  TaxClassify !== 2
                )}
                {this.renderInputNumber(
                  'W2_other_org_unit_price',
                  W2_other_org_unit_price,
                  TaxClassify !== 2 && OtherGroupDivision > 0
                )}
                {this.renderInputNumber(
                  'W2_person_1_unit_price',
                  W2_person_1_unit_price,
                  TaxClassify !== 2
                )}
                {this.renderInputNumber(
                  'W2_person_2_unit_price',
                  W2_person_2_unit_price,
                  TaxClassify !== 2
                )}
                {this.renderInputNumber(
                  'W2_person_3_unit_price',
                  W2_person_3_unit_price,
                  TaxClassify !== 2
                )}
                <Col span={3}>
                  <Form.Item>
                    <Input style={{ textAlign: 'right', backgroundColor: '#F4F4F5' }} bordered={false} readOnly value={this.sum1()} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} className="mb-1">
                <Col span={3} style={{ textAlign: 'center', color: '#14468C', fontWeight: 'bold' }}>消費税</Col>
                {this.renderInputNumber(
                  'W2_insurer_tax',
                  W2_insurer_tax,
                  TaxClassify === 0
                )}
                {this.renderInputNumber(
                  'W2_office_tax',
                  W2_office_tax,
                  TaxClassify === 0
                )}
                {this.renderInputNumber(
                  'W2_other_org_tax',
                  W2_other_org_tax,
                  TaxClassify === 0 && OtherGroupDivision > 0
                )}
                {this.renderInputNumber(
                  'W2_person_1_tax',
                  W2_person_1_tax,
                  TaxClassify === 0
                )}
                {this.renderInputNumber(
                  'W2_person_2_tax',
                  W2_person_2_tax,
                  TaxClassify === 0
                )}
                {this.renderInputNumber(
                  'W2_person_3_tax',
                  W2_person_3_tax,
                  TaxClassify === 0
                )}
                <Col span={3}>
                  <Form.Item>
                    <Input style={{ textAlign: 'right', backgroundColor: '#F4F4F5' }} bordered={false} readOnly value={this.sum2()} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} className="mb-1">
                <Col span={3} style={{ textAlign: 'center', color: '#14468C', fontWeight: 'bold' }}>合　計</Col>
                {this.renderInputNumber(
                  'W2_insurer_total',
                  W2_insurer_total,
                  TaxClassify === 2
                )}
                {this.renderInputNumber(
                  'W2_office_total',
                  W2_office_total,
                  TaxClassify === 2
                )}
                {this.renderInputNumber(
                  'W2_other_org_total',
                  W2_other_org_total,
                  TaxClassify === 2 && OtherGroupDivision > 0
                )}
                {this.renderInputNumber(
                  'W2_person_1_total',
                  W2_person_1_total,
                  TaxClassify === 2
                )}
                {this.renderInputNumber(
                  'W2_person_2_total',
                  W2_person_2_total,
                  TaxClassify === 2
                )}
                {this.renderInputNumber(
                  'W2_person_3_total',
                  W2_person_3_total,
                  TaxClassify === 2
                )}
                <Col span={3}>
                  <Form.Item>
                    <Input style={{ textAlign: 'right', backgroundColor: '#F4F4F5' }} bordered={false} readOnly value={this.sum3()} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item name="TaxClassify" style={{ float: 'right' }}>
                    <Radio.Group onChange={(e) => this.handleChangeInitValue({ TaxClassify: e.target.value })}>
                      <Radio value={0}>指定</Radio>
                      <Radio value={1}>外税</Radio>
                      <Radio value={2}>内税</Radio>
                      <Radio value={3}>非課</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="Lio_Tax" label="税率">
                    <InputNumber min={0} max={9.99} maxLength={4} step='9.99' stringMode
                      onChange={(value) => this.handleChangeInitValue({ Lio_Tax: value })}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Button
                    type="primary"
                    loading={this.state.isLoadingTaxCalculate}
                    style={{ float: "right", width: '100%' }}
                    onClick={this.TaxCalculate}
                  >税計算</Button>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={4} offset={20}>
                  <Popconfirm
                    title={() => {
                      // CASE(W2_change_type,40,'ｵﾌﾟｼｮﾝ',50,'追加',60,'削除','')&'ｾｯﾄ['&Trim(W2_set_inspect_cd)&']を「'&IF(Lio_NewAndDelete=0,'追加','削除')&'」しますか?'
                      let change_type = '';
                      switch (this.formRef.current?.getFieldValue('W2_change_type')) {
                        case 40:
                          change_type = 'ｵﾌﾟｼｮﾝ';
                          break;
                        case 50:
                          change_type = '追加';
                          break;
                        case 60:
                          change_type = '削除';
                          break;
                        default:
                      }
                      return (
                        change_type
                        + 'ｾｯﾄ['
                        + (this.formRef.current?.getFieldValue('W2_set_inspect_cd') || '').trim()
                        + ']を「'
                        + (this.formRef.current?.getFieldValue('Lio_NewAndDelete') === 0 ? '追加' : '削除')
                        + '」しますか?'
                      );
                    }}
                    onConfirm={() => {
                      this.props.onFinishScreen({
                        Lo_StsEnter: true,
                        Lio_Tax: this.formRef.current.getFieldValue('Lio_Tax'),
                        Lio_ContractPriority: this.formRef.current.getFieldValue('Lio_ContractPriority'),
                        Lio_NewAndDelete: this.formRef.current.getFieldValue('Lio_NewAndDelete'),
                      });
                    }}
                    okText="はい"
                    cancelText="いいえ"
                  >
                    <Button type="primary" style={{ float: "right", width: "100%" }}>確定</Button>
                  </Popconfirm>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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

export default WS2556015_MoneyAmountInput;
