/* eslint-disable eqeqeq */
/* eslint-disable default-case */
import React from "react";
import PropTypes from 'prop-types';

import {
  Card, Form, Input, Checkbox, Select, Button, Space,
  Row, Col, Tabs, Modal, InputNumber, Spin, message, ConfigProvider, Tag,
} from "antd";
import { QuestionCircleTwoTone } from '@ant-design/icons';
import Text from "antd/lib/typography/Text";

import WS0310004_ContractEditingSub from './WS0310004_ContractEditingSub.jsx';
import WS0311005_MoneyAmountInputSub from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0311005_MoneyAmountInputSub';
import WS0246001_InsurerInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery';
import WS1505001_AgeManageInfoMaintain from 'pages/SM_SystemMaintenance/V4SM0010000_AgeManageInfoMaintain/WS1505001_AgeManageInfoMaintain';

import ContractInspectContent from './WS0309017_ContractItemSub/ContractInspectContent';

import axios from "configs/axios";
import { number_format } from "helpers/CommonHelpers";
import WS0605127_ContractLineItemDisplay from "./WS0605127_ContractLineItemDisplay.jsx";
import Color from "constants/Color.js";
import { saveAndUpdateContractEditingSubAction } from "redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions.js";
import  ModalDraggable  from "components/Commons/ModalDraggable";

/**
* @extends {React.Component<{Li_ContractType:number, Li_ContractOrgCode:any, Li_ContractStartDate:any, Li_ContractNum:any, onSaved:Function}>}
*/
class WS0309017_ContractItemSub extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.number,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_BasicOption: PropTypes.any,

    onSaved: PropTypes.func,
  };

  formRef = React.createRef();
  refCicContract = React.createRef();
  refCicOption = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '契約明細';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      screenData: {},
      contractTermData: {},

      isLoadingContractTerm: false,
      isLoadingContentClick: false,


      changeValueContractEditingSub: false,
      dataContractEditingSub: {},
    };

    this.onFinish = this.onFinish.bind(this);
    this.loadContractTerm = this.loadContractTerm.bind(this);
    this.getFormFieldValue = this.getFormFieldValue.bind(this);
    this.setFormFieldValue = this.setFormFieldValue.bind(this);
    this.loadScreenData = this.loadScreenData.bind(this);
    this.InspectContentEditing = this.InspectContentEditing.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadScreenData();
    }
  }

  componentDidMount() {
    this.loadScreenData();
  }

  loadScreenData() {
    if (Object.keys(this.state.screenData).length > 0) {
      this.loadContractTerm();
      return;
    }

    this.setState({ isLoadingContractTerm: true });

    axios.get('/api/contract-info-batch-process/contract-item-sub/getScreenData', {
      params: {
        Li_ContractType: this.props.Li_ContractType,
        Li_ContractOrgCode: this.props.Li_ContractOrgCode,
        Li_ContractStartDate: this.props.Li_ContractStartDate,
        Li_ContractNum: this.props.Li_ContractNum,
      },
    })
      .then(res => {
        this.setState({
          screenData: res.data,
        });
        this.formRef.current.setFieldsValue({
          TaxAfterDecimalPoint: res.data.TaxAfterDecimalPoint,
          Tax: res.data.Tax,
        });
        this.loadContractTerm();
      })
      .catch(() => {
        // setTimeout(() => {
        //   this.loadScreenData();
        // }, 5000);
        message.error('画面情報の取得にはエラーが発生しました');
      });
  }

  loadContractTerm() {
    this.setState({ isLoadingContractTerm: true });
    this.refCicContract.current.loadData();
    this.refCicOption.current.loadData();

    const {
      Li_ContractType, Li_ContractOrgCode,
      Li_ContractStartDate, Li_ContractNum,
    } = this.props;

    axios.get('/api/contract-info-batch-process/contract-item-sub', {
      params: {
        Li_ContractType,
        Li_ContractOrgCode,
        Li_ContractStartDate,
        Li_ContractNum,
      },
    })
      .then(res => {
        let data = {
          ...res?.data,
          own_course_label_number: res?.data?.own_course_label_number || null,

          insurer_unit_price: res?.data?.insurer_unit_price || null,
          insurer_consumption_tax: res?.data?.insurer_consumption_tax || null,
          insurer_total_price: res?.data?.insurer_total_price || null,
          office_unit_price: res?.data?.office_unit_price || null,
          office_consumption_tax: res?.data?.office_consumption_tax || null,
          office_total_price: res?.data?.office_total_price || null,
          organization_unit_price: res?.data?.organization_unit_price || null,
          organization_consumption_tax: res?.data?.organization_consumption_tax || null,
          organization_total_price: res?.data?.organization_total_price || null,
          personal_1_unit_price: res?.data?.personal_1_unit_price || null,
          personal_1_consumption_tax: res?.data?.personal_1_consumption_tax || null,
          personal_1_total_price: res?.data?.personal_1_total_price || null,
          personal_2_unit_price: res?.data?.personal_2_unit_price || null,
          personal_2_consumption_tax: res?.data?.personal_2_consumption_tax || null,
          personal_2_total_price: res?.data?.personal_2_total_price || null,
          personal_3_unit_price: res?.data?.personal_3_unit_price || null,
          personal_3_consumption_tax: res?.data?.personal_3_consumption_tax || null,
          personal_3_total_price: res?.data?.personal_3_total_price || null,

          LimitsInsurer: parseInt(res?.data?.LimitsInsurer) || null,
          LimitsOffice: parseInt(res?.data?.LimitsOffice) || null,
          LimitsOtherGroup: parseInt(res?.data?.LimitsOtherGroup) || null,
          LimitsPersonal1: parseInt(res?.data?.LimitsPersonal1) || null,
          LimitsPersonal2: parseInt(res?.data?.LimitsPersonal2) || null,
          LimitsPersonal3: parseInt(res?.data?.LimitsPersonal3) || null,
        }
        this.formRef.current.setFieldsValue(data);
        this.setState({
          contractTermData: res?.data,
        });
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingContractTerm: false });
      });
  }

  getFormFieldValue(namePath) {
    return this.formRef.current ? this.formRef.current.getFieldValue(namePath) : undefined;
  }

  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      }
    ])
  }

  onFinish(values) {
    this.setState({ isLoadingContractTerm: true });

    const {
      Li_ContractType, Li_ContractOrgCode,
      Li_ContractStartDate, Li_ContractNum,
    } = this.props;

    axios.post('/api/contract-info-batch-process/contract-item-sub', {
      Li_ContractType,
      Li_ContractOrgCode,
      Li_ContractStartDate,
      Li_ContractNum,
      ...values,
    })
      .then(res => {
        message.success('保存しました');

        this.loadContractTerm();

        if (this.props.onSaved) {
          this.props.onSaved();
        }
      })
      .catch(error => {
        this.setState({ isLoadingContractTerm: false });
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      });
  }

  CourseBreakdownInquiry = () => {
    const {
      Li_ContractType, Li_ContractOrgCode,
      Li_ContractStartDate, Li_ContractNum,
    } = this.props;

    this.setState({ isLoadingContentClick: true });

    axios.post('/api/contract-info-batch-process/contract-item-sub/CourseBreakdownInquiry', {
      Li_ContractType,
      Li_ContractOrgCode,
      Li_ContractStartDate,
      Li_ContractNum,
      medical_exam_course: this.state.contractTermData?.medical_exam_course,
    })
      .then(res => {
        if (res.data.message) {
          message.info(res.data.message);
        }
        const component = (<WS0605127_ContractLineItemDisplay
          Li_ContractNum={this.props.Li_ContractNum}
          Li_ContractType={this.props.Li_ContractType}
          Li_ContractOrgCode={this.props.Li_ContractOrgCode}
          Li_ContractStartDate={this.props.Li_ContractStartDate}
        />);
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: '95vw',
            component: component,
          },
        });
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingContentClick: false });
      });
  }

  InspectContentEditing(Li_BasicOption) {
    const component = (
      <WS0310004_ContractEditingSub

        onChangeValue={({ Lo_stsChangeValue, data }) => {
          this.setState({
            changeValueContractEditingSub: Lo_stsChangeValue,
            dataContractEditingSub: data
          })
        }}

        onFinishScreen={({ Lo_StsUpdate }) => {
          this.setFormFieldValue('StsContractEdit', Lo_StsUpdate);
          const StsContractEdit = this.getFormFieldValue('StsContractEdit');

          if (StsContractEdit) {
            this.setFormFieldValue('Vl3StsInspectChange', true);
            if (Li_BasicOption == 0) {
              // await 
              // await 
              this.refCicContract.current.loadData();
            } else {
              this.refCicOption.current.loadData();
            }
          }

          // Hide

          this.closeModal()
        }}

        Li_ContractType={this.props.Li_ContractType}
        Li_ContractOrgCode={this.props.Li_ContractOrgCode}
        Li_ContractStartDate={this.props.Li_ContractStartDate}
        Li_ContractNum={this.props.Li_ContractNum}
        Li_BasicOption={Li_BasicOption}
        Li_Tax={this.getFormFieldValue('Tax')}
        Li_Rounding={this.getFormFieldValue('TaxAfterDecimalPoint')}
        Li_TaxClassify={this.getFormFieldValue('tax_division')}
        Li_OtherGroup={this.getFormFieldValue('organization_division')}
        Li_Course={this.getFormFieldValue('medical_exam_course')}
        Lo_StsUpdate={this.getFormFieldValue('StsContractEdit')}
      />
    );

    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: component,
      },
    });
  }

  updateContractEditingSub() {
    let params = {
      ...this.state.dataContractEditingSub
    }
    saveAndUpdateContractEditingSubAction(params)
      .then((res) => {
        this.setFormFieldValue('StsContractEdit', true);
        const StsContractEdit = this.getFormFieldValue('StsContractEdit');

        if (StsContractEdit) {
          this.setFormFieldValue('Vl3StsInspectChange', true);
          if (this.props.Li_BasicOption === 0) {
            // await 
            // await 
            this.refCicContract.current.loadData();
          } else {
            this.refCicOption.current.loadData();
          }
        }
      })
  };

  getTotalPrice() {
    let sum = (
      (number_format(
        (this.getFormFieldValue('insurer_total_price') || 0) +
        (this.getFormFieldValue('office_total_price') || 0) +
        (this.getFormFieldValue('organization_total_price') || 0) +
        (this.getFormFieldValue('personal_1_total_price') || 0) +
        (this.getFormFieldValue('personal_2_total_price') || 0) +
        (this.getFormFieldValue('personal_3_total_price') || 0)
      ))
    )
    return sum == 0 ? null : sum
  }

  getTotalLimits() {
    let sum = (
      (number_format(
        (this.getFormFieldValue('LimitsInsurer') || 0) +
        (this.getFormFieldValue('LimitsOffice') || 0) +
        (this.getFormFieldValue('LimitsOtherGroup') || 0) +
        (this.getFormFieldValue('LimitsPersonal1') || 0) +
        (this.getFormFieldValue('LimitsPersonal2') || 0) +
        (this.getFormFieldValue('LimitsPersonal3') || 0)
      ))
    )
    return sum == 0 ? null : sum
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
      changeValueContractEditingSub: false
    });
  }

  render() {
    return (
      <div className="contract-item-sub">
        <Card title="契約明細">
          <Spin spinning={this.state.isLoadingContractTerm}>
            <Form ref={this.formRef} onFinish={this.onFinish}>
              <Space style={{ float: 'right' }}>
                <Button type="primary" htmlType="submit">保存</Button>
              </Space>
              <Form.Item label="コース">
                <span>{this.getFormFieldValue('medical_exam_course')}</span>
                <span> {this.getFormFieldValue(['course_basic_type_info', 'course_name_formal'])}</span>
              </Form.Item>
              <Form.Item name="contract_short_name" label="略式名称">
                <Input />
              </Form.Item>
              <Form.Item name="contract_name" label="正式名称">
                <Input />
              </Form.Item>
              <Input.Group
                style={{ display: 'none' }}
              >
                <Form.Item name="insurer_unit_price"><InputNumber /></Form.Item>
                <Form.Item name="insurer_consumption_tax"><InputNumber /></Form.Item>
                <Form.Item name="office_unit_price"><InputNumber /></Form.Item>
                <Form.Item name="office_consumption_tax"><InputNumber /></Form.Item>
                <Form.Item name="organization_unit_price"><InputNumber /></Form.Item>
                <Form.Item name="organization_consumption_tax"><InputNumber /></Form.Item>
                <Form.Item name="personal_1_unit_price"><InputNumber /></Form.Item>
                <Form.Item name="personal_1_consumption_tax"><InputNumber /></Form.Item>
                <Form.Item name="personal_2_unit_price"><InputNumber /></Form.Item>
                <Form.Item name="personal_2_consumption_tax"><InputNumber /></Form.Item>
                <Form.Item name="personal_3_unit_price"><InputNumber /></Form.Item>
                <Form.Item name="personal_3_consumption_tax"><InputNumber /></Form.Item>
                <Form.Item name="TaxAfterDecimalPoint"><InputNumber /></Form.Item>
                <Form.Item name="Tax"><Input /></Form.Item>
              </Input.Group>

              <Tabs>
                <Tabs.TabPane tab="契約金額" key="contractAmount">
                  <Row gutter={3}>
                    <Col span={3}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item style={{ padding: '4px 0' }}>
                          <Button type="primary" block onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 800,
                                component: (
                                  <WS0311005_MoneyAmountInputSub
                                    Li_TaxClassify={this.getFormFieldValue('tax_division')}
                                    Li_Rounding={this.getFormFieldValue('TaxAfterDecimalPoint')}
                                    Li_TaxRate={this.getFormFieldValue('Tax')}
                                    Li_OtherGroupDivision={this.state.contractTermData.organization_division}
                                    Li_Title={'コース金額変更'}
                                    Lio_InsurerUnitPriceAmount={this.getFormFieldValue('insurer_unit_price')}
                                    Lio_InsurerTax={this.getFormFieldValue('insurer_consumption_tax')}
                                    Lio_InsurerTotal={this.getFormFieldValue('insurer_total_price')}
                                    Lio_OfficeUnitPriceAmount={this.getFormFieldValue('office_unit_price')}
                                    Lio_OfficeTax={this.getFormFieldValue('office_consumption_tax')}
                                    Lio_OfficeTotal={this.getFormFieldValue('office_total_price')}
                                    Lio_OtherGroupUnitPriceAmount={this.getFormFieldValue('organization_unit_price')}
                                    Lio_OtherGroupTax={this.getFormFieldValue('organization_consumption_tax')}
                                    Lio_OtherGroupTotal={this.getFormFieldValue('organization_total_price')}
                                    Lio_Personal1UnitPriceAmount={this.getFormFieldValue('personal_1_unit_price')}
                                    Lio_Personal1Tax={this.getFormFieldValue('personal_1_consumption_tax')}
                                    Lio_Personal1Total={this.getFormFieldValue('personal_1_total_price')}
                                    Lio_Person2UnitPriceAmount={this.getFormFieldValue('personal_2_unit_price')}
                                    Lio_Person2Tax={this.getFormFieldValue('personal_2_consumption_tax')}
                                    Lio_Person2Total={this.getFormFieldValue('personal_2_total_price')}
                                    Lio_Personal3UnitPriceAmount={this.getFormFieldValue('personal_3_unit_price')}
                                    Lio_Personal3Tax={this.getFormFieldValue('personal_3_consumption_tax')}
                                    Lio_Personal3Total={this.getFormFieldValue('personal_3_total_price')}
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        insurer_unit_price: output.Lio_InsurerUnitPriceAmount || null,
                                        insurer_consumption_tax: output.Lio_InsurerTax || null,
                                        insurer_total_price: output.Lio_InsurerTotal || null,
                                        office_unit_price: output.Lio_OfficeUnitPriceAmount || null,
                                        office_consumption_tax: output.Lio_OfficeTax || null,
                                        office_total_price: output.Lio_OfficeTotal || null,
                                        organization_unit_price: output.Lio_OtherGroupUnitPriceAmount || null,
                                        organization_consumption_tax: output.Lio_OtherGroupTax || null,
                                        organization_total_price: output.Lio_OtherGroupTotal || null,
                                        personal_1_unit_price: output.Lio_Personal1UnitPriceAmount || null,
                                        personal_1_consumption_tax: output.Lio_Personal1Tax || null,
                                        personal_1_total_price: output.Lio_Personal1Total || null,
                                        personal_2_unit_price: output.Lio_Person2UnitPriceAmount || null,
                                        personal_2_consumption_tax: output.Lio_Person2Tax || null,
                                        personal_2_total_price: output.Lio_Person2Total || null,
                                        personal_3_unit_price: output.Lio_Personal3UnitPriceAmount || null,
                                        personal_3_consumption_tax: output.Lio_Personal3Tax || null,
                                        personal_3_total_price: output.Lio_Personal3Total || null,
                                      });

                                      this.closeModal();

                                      // StsAmountChangesDirectly
                                      if (output.Lio_StsChange) {
                                        this.setState({ isLoadingContractTerm: true });
                                        axios.post('/api/contract-info-batch-process/contract-item-sub/TotalAmountUpdate', {
                                          Li_ContractType: this.props.Li_ContractType,
                                          Li_ContractOrgCode: this.props.Li_ContractOrgCode,
                                          Li_ContractStartDate: this.props.Li_ContractStartDate,
                                          Li_ContractNum: this.props.Li_ContractNum,
                                          ...this.getFormFieldValue(),
                                        })
                                          .then(res => { 
                                            this.onFinish(this.formRef.current?.getFieldValue())
                                          })
                                          .catch(error => {
                                            const res = error.response;
                                            if (!res || !res.data || !res.data.message) {
                                              message.error('エラーが発生しました');
                                              return;
                                            }

                                            message.error(res.data.message);
                                          })
                                          .finally(() => {
                                            this.setState({ isLoadingContractTerm: false });
                                          });
                                      }
                                    }}
                                  />
                                ),
                              },
                            });
                          }}>金額変更</Button>
                        </Form.Item>
                        <Form.Item label="契約金額">
                        </Form.Item>
                        <Form.Item label="限度金額">
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={3}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item>
                          <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                            <Tag color={Color(156).Background} style={{ width: '100%' }}>保険者</Tag>
                          </Text>
                        </Form.Item>
                        <Form.Item name="insurer_total_price">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            readOnly size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                        <Form.Item name="LimitsInsurer">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={3}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item>
                          <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                            <Tag color={Color(156).Background} style={{ width: '100%' }}>事業所</Tag>
                          </Text>
                        </Form.Item>
                        <Form.Item name="office_total_price">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            readOnly size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                        <Form.Item name="LimitsOffice">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={3}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item>
                          <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                            <Tag color={Color(156).Background} style={{ width: '100%' }}>他団体</Tag>
                          </Text>
                        </Form.Item>
                        <Form.Item name="organization_total_price">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            readOnly size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                        <Form.Item name="LimitsOtherGroup">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={3}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item>
                          <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                            <Tag color={Color(156).Background} style={{ width: '100%' }}>個人１</Tag>
                          </Text>
                        </Form.Item>
                        <Form.Item name="personal_1_total_price">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            readOnly size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                        <Form.Item name="LimitsPersonal1">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={3}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item>
                          <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                            <Tag color={Color(156).Background} style={{ width: '100%' }}>個人２</Tag>
                          </Text>
                        </Form.Item>
                        <Form.Item name="personal_2_total_price">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            readOnly size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                        <Form.Item name="LimitsPersonal2">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={3}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item>
                          <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                            <Tag color={Color(156).Background} style={{ width: '100%' }}>個人３</Tag>
                          </Text>
                        </Form.Item>
                        <Form.Item name="personal_3_total_price">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            readOnly size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                        <Form.Item name="LimitsPersonal3">
                          <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            size="small" style={{ width: '100%' }} onChange={() => this.forceUpdate()} />
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={3}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item>
                          <Text style={{ display: 'block', textAlign: 'center', padding: '4px 0' }}>
                            <Tag color={Color(156).Background} style={{ width: '100%' }}>合計</Tag>
                          </Text>
                        </Form.Item>
                        <Form.Item>
                          <InputNumber readOnly value={
                            this.getTotalPrice()
                          } />
                        </Form.Item>
                        <Form.Item> 
                          <InputNumber readOnly value={ 
                             this.getTotalLimits()
                          } />
                        </Form.Item>
                      </Space>
                    </Col>
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'条件' + (this.state.contractTermData.CourseConditionPresence ? '(〇)' : '(×)')} key="condition">
                  <Row gutter={5}>
                    <Col span={4}>
                      <Form.Item label="条件" valuePropName="checked" name="course_conditions" labelCol={{ span: 9 }}>
                        <Checkbox onChange={() => this.forceUpdate()}>有り</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={5}>
                    <Col span={4}>
                      <Form.Item label="性別" name="conditions_gender" labelCol={{ span: 9 }}>
                        <Select disabled={!(this.formRef.current?.getFieldValue('course_conditions'))}>
                          <Select.Option value={0}> </Select.Option>
                          <Select.Option value={1}>男</Select.Option>
                          <Select.Option value={2}>女</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item label="続柄" name="conditions_relationship">
                        <Select disabled={!(this.formRef.current?.getFieldValue('course_conditions'))} allowClear>
                          {this.state.screenData.conditions_relationship ? this.state.screenData.conditions_relationship.map(value => (
                            <Select.Option key={`cnd-rls-${value.id}`} value={value.node_code_name}>{value.name}</Select.Option>
                          )) : null}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item label="その他" name="conditions_other">
                        <Input maxLength={2} disabled={!(this.formRef.current?.getFieldValue('course_conditions'))} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item label="AMPM" name="conditions_am_pm">
                        <Select disabled={!(this.formRef.current?.getFieldValue('course_conditions'))}>
                          <Select.Option value=""> </Select.Option>
                          <Select.Option value="AM">ＡＭ</Select.Option>
                          <Select.Option value="PM">ＰＭ</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={5}>
                    <Col span={4}>
                      <Form.Item label="院内外" name="conditions_in_out_hospital" labelCol={{ span: 9 }}>
                        <Select allowClear disabled={!(this.formRef.current?.getFieldValue('course_conditions'))}>
                          <Select.Option value={0}> </Select.Option>
                          {this.state.screenData.CourseConditionHospitalOut ? this.state.screenData.CourseConditionHospitalOut.map(value => (
                            <Select.Option key={`cnd-hospital-${value.id}`} value={parseInt(value.node_code_name)}>{value.name}</Select.Option>
                          )) : null}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item label="ｎ次" name="conditions_next_medical_exam">
                        <Select allowClear disabled={!(this.formRef.current?.getFieldValue('course_conditions'))}>
                          <Select.Option value={0}> </Select.Option>
                          {this.state.screenData.CourseConditionNTsugikenmi ? this.state.screenData.CourseConditionNTsugikenmi.map(value => (
                            <Select.Option key={`cnd-ntsugi-${value.id}`} value={parseInt(value.node_code_name)}>{value.name}</Select.Option>
                          )) : null}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item label="年齢" name="conditions_age_code">
                        <Select allowClear disabled={!(this.formRef.current?.getFieldValue('course_conditions'))}>
                          {this.state.screenData.conditions_age_code ? this.state.screenData.conditions_age_code.map(value => (
                            <Select.Option key={`cnd-age-${value.id}`} value={value.age_id_code}>{value.age_title}</Select.Option>
                          )) : null}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item>
                        <Button type="primary" htmlType="button" onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 500,
                              component: (
                                <WS1505001_AgeManageInfoMaintain
                                  onClickedSelect={({ Lo_InsurerCode }) => {
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          });
                        }}>年齢設定</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="その他" key="other">
                  <Row>
                    <Col span={18}>
                      <Row gutter={5}>
                        <Col span={6}>
                          <Form.Item label="税区分" name="tax_division" labelCol={{ span: 8 }}>
                            <Select>
                              <Select.Option value={0}>税指定</Select.Option>
                              <Select.Option value={1}>外税</Select.Option>
                              <Select.Option value={2}>内税</Select.Option>
                              <Select.Option value={3}>非課税</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={7}>
                          <Form.Item>
                            <Button type="primary" htmlType="button" onClick={() => {
                              Modal.confirm({
                                title: '税計算',
                                content: '指定された税区分に基づいて契約金額を再計算しますか？',
                                onOk: () => {
                                  return axios.post('/api/contract-info-batch-process/contract-item-sub/TaxClassifyCalculate', {
                                    Li_ContractType: this.props.Li_ContractType,
                                    Li_ContractOrgCode: this.props.Li_ContractOrgCode,
                                    Li_ContractStartDate: this.props.Li_ContractStartDate,
                                    Li_ContractNum: this.props.Li_ContractNum,
                                    Li_TaxClassify: this.getFormFieldValue('tax_division'),
                                    Li_Rounding: this.getFormFieldValue('TaxAfterDecimalPoint'),
                                    Li_Tax: this.getFormFieldValue('Tax'),
                                  })
                                    .then(res => {
                                      message.success(res.data.message);

                                      this.loadContractTerm();
                                    })
                                    .catch(error => {
                                      this.setState({ isLoadingContractTerm: false });
                                      const res = error.response;
                                      if (!res || !res.data || !res.data.message) {
                                        message.error('エラーが発生しました');
                                        return;
                                      }

                                      message.error(res.data.message);
                                    });
                                },
                              })
                            }}>再計算</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={5}>
                        <Col span={6}>
                          <Form.Item label="年　齢" name="conditions_age_division" labelCol={{ span: 8 }}>
                            <Select onChange={() => {
                              this.forceUpdate();
                            }}>
                              <Select.Option value={0}>受診日</Select.Option>
                              <Select.Option value={1}>年度末</Select.Option>
                              <Select.Option value={2}>学童</Select.Option>
                              <Select.Option value={3}>指定日</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item label="月" name="SpecifiedMonth" hidden={this.getFormFieldValue('conditions_age_division') !== 3}>
                            <InputNumber maxLength={2} min={1} max={12} style={{ maxWidth: 60 }} />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item label="日" name="SpecifiedDate" hidden={this.getFormFieldValue('conditions_age_division') !== 3}>
                            <InputNumber maxLength={2} min={1} max={31} style={{ maxWidth: 60 }} />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <ConfigProvider direction="rtl">
                            <Form.Item label="ラベル" name="own_course_label_number">
                              <InputNumber />
                            </Form.Item>
                          </ConfigProvider>
                        </Col>
                      </Row>
                      <Row gutter={5}>
                        <Col span={6}>
                          <Form.Item label="他団体" name="organization_division" labelCol={{ span: 8 }}>
                            <Select onChange={() => {
                              this.formRef.current.setFieldsValue({
                                organization_code: null,
                                office: null,
                              });
                              this.forceUpdate();
                            }}>
                              <Select.Option value={0}> </Select.Option>
                              <Select.Option value={1}>保険者</Select.Option>
                              <Select.Option value={2}>事業所</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item name="organization_code" hidden={(() => { const v = this.getFormFieldValue('organization_division'); return !v || v === 0; })()}>
                            <Input.Search
                              onSearch={() => {
                                const organization_division = this.getFormFieldValue('organization_division');
                                if (organization_division === 1) {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 800,
                                      component: (
                                        <WS0246001_InsurerInfoSearchQuery
                                          onFinishScreen={(output) => {
                                            this.formRef.current.setFieldsValue({
                                              organization_code: output.Lo_InsurerCode,
                                              insurer: output.recordData,
                                            });

                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                } else if (organization_division === 2) {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 800,
                                      component: (
                                        <WS0247001_OfficeInfoRetrievalQuery
                                          onFinishScreen={(output) => {
                                            this.formRef.current.setFieldsValue({
                                              organization_code: output.Lio_OfficeCode,
                                              office: output.recordData,
                                            });

                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }
                              }} />
                          </Form.Item>
                        </Col>
                        <Col span={8}>{(() => {
                          switch (this.getFormFieldValue('organization_division')) {
                            case 1:
                              return this.getFormFieldValue(['insurer', 'insurer_kanji_name']);
                            case 2:
                              return this.getFormFieldValue(['office', 'office_kanji_name']);
                          }
                        })()}</Col>
                      </Row>
                    </Col>
                    <Col span={6}>
                      <Form.Item style={{}}>
                      </Form.Item>
                      <Form.Item label="備考" name="remark_1" labelCol={{ span: 5 }}>
                        <Input maxLength={20} />
                      </Form.Item>
                      <Form.Item label=" " name="remark_2" labelCol={{ span: 5 }}>
                        <Input maxLength={20} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
              </Tabs>

              <Row gutter={2}>
                <Col span={12}>
                  <ContractInspectContent
                    ref={this.refCicContract}
                    header={<>
                      <label>基本契約</label>
                      <div style={{ float: 'right' }}>
                        <Space>
                          <Button type="primary" size="small" onClick={() => this.CourseBreakdownInquiry()} loading={this.state.isLoadingContentClick}>内容</Button>
                          <Button type="primary" size="small" onClick={() => this.InspectContentEditing(0)}>編集</Button>
                        </Space>
                      </div>
                    </>}
                    Li_ContractType={this.props.Li_ContractType}
                    Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                    Li_ContractStartDate={this.props.Li_ContractStartDate}
                    Li_ContractNum={this.props.Li_ContractNum}
                    Li_MedicalExamCourse={this.formRef.current?.getFieldValue('medical_exam_course')}
                    Li_DisplayCategory={1}
                  />
                </Col>

                <Col span={12}>
                  <ContractInspectContent
                    ref={this.refCicOption}
                    header={<>
                      <label>オプション</label>
                      <div style={{ float: 'right' }}>
                        <Button type="primary" size="small" onClick={() => this.InspectContentEditing(1)}>編集</Button>
                      </div>
                    </>}
                    Li_ContractType={this.props.Li_ContractType}
                    Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                    Li_ContractStartDate={this.props.Li_ContractStartDate}
                    Li_ContractNum={this.props.Li_ContractNum}
                    Li_MedicalExamCourse={this.formRef.current?.getFieldValue('medical_exam_course')}
                    Li_DisplayCategory={2}
                  />
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            if (this.state.changeValueContractEditingSub) {
              Modal.confirm({
                title: '変更を適用しますか？',
                width: 300,
                icon: <QuestionCircleTwoTone />,
                okText: 'は　い',
                cancelText: 'いいえ',
                onOk: () => {
                  this.updateContractEditingSub()
                  this.setState({ changeValueContractEditingSub: false })
                  this.closeModal()
                },
                onCancel: () => {
                  this.setState({ changeValueContractEditingSub: false })
                  this.closeModal()
                }
              })
            } else {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: false,
                },
              });

            }
          }}
        />
      </div>
    );
  }
}

export default WS0309017_ContractItemSub;
