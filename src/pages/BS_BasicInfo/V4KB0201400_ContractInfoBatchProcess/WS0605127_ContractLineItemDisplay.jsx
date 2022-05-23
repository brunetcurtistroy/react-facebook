import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Table, Row, Col, Tabs, Modal, Space, Spin, Dropdown, Menu, InputNumber } from "antd";
import { MoreOutlined } from '@ant-design/icons';

import GetImage from "constants/Images";
import { getContractLineItemDisplayAction } from 'redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions';

import WS0333001_SetIncludesQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333001_SetIncludesQuery";
import WS0332001_ContractCourseBreakdownInquiry from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0332001_ContractCourseBreakdownInquiry.jsx';
import WS0309017_ContractItemSub from "./WS0309017_ContractItemSub";
import WS0605130_ContractInspectCondition from './WS0605130_ContractInspectCondition';
import WS0339001_InsurerInfoMaintain from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0339001_InsurerInfoMaintain.jsx';
import WS2585001_OfficeInfoInquirySub from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub.jsx';

const msGrid = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
}
const styleInput = {
  width: '100px'
}
const styleDivTitle = {
  marginRight: '10px',
  padding: '5px 10px',
  backgroundColor: '#1c66b9',
  color: 'white',
  textAlign: 'center'
}
const styleFormItem = {
  marginRight: '10px',
  textAlign: 'right'
}
const styleInputRight = {
  textAlign: 'right'
}
const styleSpan = {
  float: 'right',
  padding: '0px 5px',
  background: '#1A60AD',
  color: 'white'
}
class WS0605127_ContractLineItemDisplay extends React.Component {

  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '契約照会';

    this.state = {
      initParams: {
        Li_ContractType: '',
        Li_ContractOrgCode: '',
        Li_ContractStartDate: '',
        Li_ContractNum: '',
        Zoning: '',
        Search: ''
      },
      selectedRows: {},
      objContract: {},
      isLoadPage: true,
      isContractInspectContentSub1: true,
      isContractInspectContentSub2: true,
      isExamList: true,
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  componentDidMount = () => {
    if (this.props) {
      const { Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate, Li_ContractNum } = this.props;
      const params = {
        Li_ContractType: Li_ContractType,
        Li_ContractOrgCode: Li_ContractOrgCode,
        Li_ContractStartDate: Li_ContractStartDate,
        Li_ContractNum: Li_ContractNum,
        Zoning: 0,
        Search: ''
      }
      this.callAPILoadData(params);
      this.setState({
        initParams: {
          ...this.state.initParams,
          Li_ContractType: Li_ContractType,
          Li_ContractOrgCode: Li_ContractOrgCode,
          Li_ContractStartDate: Li_ContractStartDate,
          Li_ContractNum: Li_ContractNum,
        }
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      const { Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate, Li_ContractNum } = this.props;
      const params = {
        Li_ContractType: Li_ContractType,
        Li_ContractOrgCode: Li_ContractOrgCode,
        Li_ContractStartDate: Li_ContractStartDate,
        Li_ContractNum: Li_ContractNum,
        Zoning: 0,
        Search: ''
      }
      this.callAPILoadData(params);
      this.setState({
        initParams: {
          ...this.state.initParams,
          Li_ContractType: Li_ContractType,
          Li_ContractOrgCode: Li_ContractOrgCode,
          Li_ContractStartDate: Li_ContractStartDate,
          Li_ContractNum: Li_ContractNum,
        }
      })
    }
  }

  callAPILoadData = (params) => {
    this.setState({
      isContractInspectContentSub1: true,
      isContractInspectContentSub2: true,
      isExamList: true
    })
    getContractLineItemDisplayAction(params).then((res) => {
      if (res) {
        let data = {
          ...res,
          Subtask1: {
            ...res.Subtask1,
            insurer_unit_price: res.Subtask1.insurer_unit_price !== 0 ? res.Subtask1.insurer_unit_price?.toLocaleString() : '',
            office_unit_price: res.Subtask1.office_unit_price !== 0 ? res.Subtask1.office_unit_price?.toLocaleString() : '',
            organization_unit_price: res.Subtask1.organization_unit_price !== 0 ? res.Subtask1.organization_unit_price?.toLocaleString() : '',
            personal_1_unit_price: res.Subtask1.personal_1_unit_price !== 0 ? res.Subtask1.personal_1_unit_price?.toLocaleString() : '',
            personal_2_unit_price: res.Subtask1.personal_2_unit_price !== 0 ? res.Subtask1.personal_2_unit_price?.toLocaleString() : '',
            personal_3_unit_price: res.Subtask1.personal_3_unit_price !== 0 ? res.Subtask1.personal_3_unit_price?.toLocaleString() : '',
            GrandTotalUnitPrice: res.Subtask1.GrandTotalUnitPrice !== 0 ? res.Subtask1.GrandTotalUnitPrice?.toLocaleString() : '',

            insurer_consumption_tax: res.Subtask1.insurer_consumption_tax !== 0 ? res.Subtask1.insurer_consumption_tax?.toLocaleString() : '',
            office_consumption_tax: res.Subtask1.office_consumption_tax !== 0 ? res.Subtask1.office_consumption_tax?.toLocaleString() : '',
            organization_consumption_tax: res.Subtask1.organization_consumption_tax !== 0 ? res.Subtask1.organization_consumption_tax?.toLocaleString() : '',
            personal_1_consumption_tax: res.Subtask1.personal_1_consumption_tax !== 0 ? res.Subtask1.personal_1_consumption_tax?.toLocaleString() : '',
            personal_2_consumption_tax: res.Subtask1.personal_2_consumption_tax !== 0 ? res.Subtask1.personal_2_consumption_tax?.toLocaleString() : '',
            personal_3_consumption_tax: res.Subtask1.personal_3_consumption_tax !== 0 ? res.Subtask1.personal_3_consumption_tax?.toLocaleString() : '',
            GrandTotalTax: res.Subtask1.GrandTotalTax !== 0 ? res.Subtask1.GrandTotalTax?.toLocaleString() : '',

            Expression_12: res.Subtask1.Expression_12 !== 0 ? res.Subtask1.Expression_12?.toLocaleString() : '',
            Expression_13: res.Subtask1.Expression_13 !== 0 ? res.Subtask1.Expression_13?.toLocaleString() : '',
            Expression_14: res.Subtask1.Expression_14 !== 0 ? res.Subtask1.Expression_14?.toLocaleString() : '',
            Expression_15: res.Subtask1.Expression_15 !== 0 ? res.Subtask1.Expression_15?.toLocaleString() : '',
            Expression_16: res.Subtask1.Expression_16 !== 0 ? res.Subtask1.Expression_16?.toLocaleString() : '',
            Expression_17: res.Subtask1.Expression_17 !== 0 ? res.Subtask1.Expression_17?.toLocaleString() : '',
            Expression_18: res.Subtask1.Expression_18 !== 0 ? res.Subtask1.Expression_18?.toLocaleString() : '',
          },
          Subtask2: {
            ...res.Subtask2,
            Tax: res.Subtask2.Tax ? parseFloat(res.Subtask2.Tax).toFixed(2) : '',
            own_course_label_number: res.Subtask2.own_course_label_number ? res.Subtask2.own_course_label_number + '枚' : ''
          }
        }
        this.setState({ objContract: data });
        this.formRef?.current?.setFieldsValue(data);
      }
    }).finally(() => this.setState({
      isContractInspectContentSub1: false,
      isContractInspectContentSub2: false,
      isExamList: false,
      isLoadPage: false
    }))
  }

  handleSearch = (e) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        Search: e.target.value,
      }
    }, () => this.callAPILoadData(this.state.initParams));
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  render() {
    const { pagination, isContractInspectContentSub1, isContractInspectContentSub2, isExamList, childModal, objContract } = this.state;
    const formInstance = this.formRef?.current;
    const colorExpression_42 = { ...styleDivTitle, backgroundColor: objContract?.Subtask1?.Expression_42 ? '#FF0000' : '#1c66b9' };
    const colorExpression_43 = { ...styleDivTitle, backgroundColor: objContract?.Subtask1?.Expression_43 ? '#FF0000' : '#1c66b9' };
    const colorExpression_44 = { ...styleDivTitle, backgroundColor: objContract?.Subtask1?.Expression_44 ? '#FF0000' : '#1c66b9' };
    const colorExpression_45 = { ...styleDivTitle, backgroundColor: objContract?.Subtask1?.Expression_45 ? '#FF0000' : '#1c66b9' };
    const colorExpression_46 = { ...styleDivTitle, backgroundColor: objContract?.Subtask1?.Expression_46 ? '#FF0000' : '#1c66b9' };
    const colorExpression_47 = { ...styleDivTitle, backgroundColor: objContract?.Subtask1?.Expression_47 ? '#FF0000' : '#1c66b9' };
    return (
      <div className="contract-line-res-displays">
        <Form ref={this.formRef}>
          <Spin tip="Loading..." spinning={this.state.isLoadPage}>
            <Row >
              <Col xl={14} lg={24} md={24} span={14}>
                <Card>
                  <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="基本情報" key="1">
                      <Form.Item label="共　通" {...msGrid} style={{ margin: 0 }}>
                        <Row>
                          <Form.Item name={['Subtask1', 'Li_ContractOrgCode']} style={{ width: '30%' }}>
                            <InputNumber readOnly />
                          </Form.Item>
                          <Form.Item style={{ margin: '0 10px', }}>
                            <Button icon={<MoreOutlined />}
                              disabled={!this.props.Li_ContractType > 0}
                              onClick={() => {
                                console.log(this.props.ContractType)
                                this.setState({
                                  childModal: {
                                    ...childModal,
                                    visible: true,
                                    width: this.props.ContractType === 1 || this.props.ContractType === '1' ? '80%' : 900,
                                    component: (
                                      this.props.ContractType === 1 || this.props.ContractType === '1'
                                        ? <WS0339001_InsurerInfoMaintain Li_InsurerCode={this.props.Li_ContractOrgCode} />
                                        : <WS2585001_OfficeInfoInquirySub Li_OfficeCode={''} Li_BranchCode={''} />
                                    ),
                                  },
                                })
                              }}
                            />
                          </Form.Item>
                          <Form.Item name={['Subtask1', "Expression_36"]} style={{ width: 'calc(60% + 20px)' }}>
                            <Input readOnly />
                          </Form.Item>
                        </Row>
                      </Form.Item>

                      <Form.Item label="コース" {...msGrid} style={{ margin: 0 }}>
                        <Row>
                          <Form.Item name={['Subtask1', "medical_exam_course"]} style={{ width: '20%' }}>
                            <Input readOnly />
                          </Form.Item>
                          <Form.Item name={['Subtask1', "Expression_39"]} style={{ width: 'calc(75% + 21px)', marginLeft: '10px' }}>
                            <Input readOnly />
                          </Form.Item>
                        </Row>
                      </Form.Item>

                      <Form.Item label="他団体" {...msGrid} style={{ margin: 0 }}>
                        <Row >
                          <Form.Item name={['Subtask1', "organization_code"]} style={{ width: '20%' }}>
                            <Input readOnly />
                          </Form.Item>
                          <Form.Item name={['Subtask1', "Expression_19"]} style={{ width: '15%', margin: '0 10px' }}>
                            <Input readOnly />
                          </Form.Item>
                          <Form.Item name={['Subtask1', "Expression_10"]} style={{ width: 'calc(60% + 11px)' }}>
                            <Input readOnly />
                          </Form.Item>
                        </Row>
                      </Form.Item>

                      <Form.Item label="契約金額" {...msGrid}>
                        <Row>
                          <Col span={3}>
                            <div style={colorExpression_42}>保険者</div>
                          </Col>
                          <Col span={3}>
                            <div style={colorExpression_43}>事業所</div>
                          </Col>
                          <Col span={3}>
                            <div style={colorExpression_44}>他団体</div>
                          </Col>
                          <Col span={3}>
                            <div style={colorExpression_45}>個人１</div>
                          </Col>
                          <Col span={3}>
                            <div style={colorExpression_46}>個人２</div>
                          </Col>
                          <Col span={3}>
                            <div style={colorExpression_47}>個人３</div>
                          </Col>
                          <Col span={3}>
                            <div style={styleDivTitle}>合　計</div>
                          </Col>
                          <Col span={3} hidden={true}>
                            <div style={styleDivTitle}>　　　</div>
                          </Col>
                        </Row>
                      </Form.Item>

                      <Form.Item label="単価金額" {...msGrid}>
                        <Row >
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'insurer_unit_price']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'office_unit_price']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'organization_unit_price']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'personal_1_unit_price']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'personal_2_unit_price']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'personal_3_unit_price']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'GrandTotalUnitPrice']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3} hidden={true}>
                            <Form.Item style={styleFormItem}>
                              <Input disabled />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>

                      <Form.Item label="消費税額" {...msGrid}>
                        <Row >
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'insurer_consumption_tax']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'office_consumption_tax']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'organization_consumption_tax']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'personal_1_consumption_tax']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'personal_2_consumption_tax']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'personal_3_consumption_tax']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'GrandTotalTax']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3} hidden={true}>
                            <Form.Item style={styleFormItem}>
                              <Input disabled />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>

                      <Form.Item label="合計金額" {...msGrid}>
                        <Row >
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'Expression_12']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'Expression_13']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'Expression_14']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'Expression_15']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'Expression_16']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'Expression_17']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item name={['Subtask1', 'Expression_18']} style={styleFormItem}>
                              <Input readOnly style={styleInputRight} />
                            </Form.Item>
                          </Col>
                          <Col span={3} hidden={true}>
                            <Form.Item style={styleFormItem}>
                              <Input disabled />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="条件・備考等" key="2">
                      <Form.Item name={['Subtask2', "Expression_21"]} label="条　件" {...msGrid}>
                        <Input readOnly style={styleInput} />
                      </Form.Item>

                      <Form.Item label="性　別" {...msGrid} style={{ margin: 0 }}>
                        <Row>
                          <Form.Item name={['Subtask2', "Expression_22"]} >
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "Expression_28"]} label="　続柄">
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "Expression_29"]} label="　院内">
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "Expression_26"]} label="　時間区">
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "Expression_30"]} label="　ｽｸﾘｰﾆﾝｸﾞ">
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                        </Row>
                      </Form.Item>

                      <Form.Item label="その他" {...msGrid} style={{ margin: 0 }}>
                        <Row>
                          <Form.Item name={['Subtask2', "Expression_31"]} >
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "Expression_35"]} label="　年齢">
                            <Input readOnly style={{ width: '598px' }} />
                          </Form.Item>
                        </Row>
                      </Form.Item>

                      <Form.Item label="税区分" {...msGrid} style={{ margin: 0 }}>
                        <Row>
                          <Form.Item name={['Subtask2', "Expression_20"]} >
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "Tax"]} label="　消費税　" >
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "Expression_24"]} label="　端数処理" >
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "own_course_label_number"]} label="　ﾗﾍﾞﾙ枚数">
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                        </Row>
                      </Form.Item>

                      <Form.Item label="未　収" {...msGrid} style={{ margin: 0 }}>
                        <Row>
                          <Form.Item name={['Subtask2', "Expression_25"]} >
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "Expression_23"]} label="　年齢計算">
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                          <Form.Item name={['Subtask2', "Expression_11"]} label='　'>
                            <Input readOnly style={styleInput} />
                          </Form.Item>
                        </Row>
                      </Form.Item>

                      <Form.Item name={['Subtask2', "Expression_32"]} label="備　考"　{...msGrid}>
                        <Input readOnly style={{ width: 'calc(100% - 94px)' }} />
                      </Form.Item>

                    </Tabs.TabPane>
                  </Tabs>
                  <hr style={{ border: '1px solid #F0F0F0' }} />
                </Card>
                <Card>
                  <Tabs>
                    <Tabs.TabPane tab="基本契約" key="1">
                      <Table
                        size='small'
                        dataSource={formInstance?.getFieldValue('ContractInspectContentSub1')}
                        rowKey={record => record?.id}
                        loading={isContractInspectContentSub1}
                        pagination={{
                          ...pagination,
                          hideOnSinglePage: formInstance?.getFieldValue('ContractInspectContentSub1')?.length > 10 ? false : true
                        }}
                      >
                        <Table.Column title="セット情報" dataIndex="set_short_name" render={(text, record, index) => {
                          return <>
                            <Space>
                              <img src={GetImage(record.Expression_14)} alt='icon' />
                              <span>{text}</span>
                            </Space>
                          </>
                        }} />
                        <Table.Column title="保険者" dataIndex="insurer_total_price"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column title="事業所" dataIndex="office_total_price"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column title="他団体" dataIndex="organization_total_price"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column title="個人" dataIndex="personal_total"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column title="合計" dataIndex="SetSum"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column render={(text, record, index) => (
                          <Dropdown.Button size='small' trigger='click' overlay={() => (
                            <Menu >
                              <Menu.Item onClick={() => (
                                this.setState({
                                  childModal: {
                                    ...childModal,
                                    visible: true,
                                    width: 900,
                                    component: (<WS0333001_SetIncludesQuery
                                      Li_StartDate={record.Li_ContractStartDate}
                                      Li_SetCode={record.JB_set_code}
                                      Li_CourseCode={record.GF_medical_exam_course}
                                      onFinishScreen={(data) => {
                                        this.setState({
                                          childModal: {
                                            ...childModal,
                                            visible: false,
                                          },
                                        });
                                      }}
                                    />),
                                  },
                                })
                              )}>照会</Menu.Item>
                              <Menu.Item
                                hidden={!record.Vl4StsContractInspectCondition}
                                onClick={() => (
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: '60%',
                                      component: (
                                        <WS0605130_ContractInspectCondition
                                          Li_ContractType={this.props.Li_ContractType}
                                          Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                                          Li_ContractStartDate={this.props.Li_ContractStartDate}
                                          Li_ContractNum={this.props.Li_ContractNum}
                                          Li_SetCode={record.JB_set_code}
                                          onClick={() => {
                                            this.setState({
                                              childModal: {
                                                ...this.state.childModal,
                                                visible: false,
                                              },
                                            });
                                          }}
                                        />
                                      ),
                                    },
                                  })
                                )}>条件照会</Menu.Item>
                            </Menu>
                          )}></Dropdown.Button>
                        )} />
                      </Table>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="オプション" key="2">
                      <Table
                        size='small'
                        dataSource={formInstance?.getFieldValue('ContractInspectContentSub2')}
                        rowKey={record => record?.id}
                        loading={isContractInspectContentSub2}
                        pagination={{
                          ...pagination,
                          hideOnSinglePage: formInstance?.getFieldValue('ContractInspectContentSub2')?.length > 10 ? false : true
                        }}
                      >
                        <Table.Column title="セット情報" dataIndex="set_short_name" render={(text, record, index) => {
                          return <>
                            <Space>
                              <img src={GetImage(record.Expression_14)} alt='icon' />
                              <span>{text}</span>
                            </Space>
                            {record.conditions ? <span style={styleSpan}>条</span> : ''}
                          </>
                        }} />
                        <Table.Column title="保険者" dataIndex="insurer_total_price"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column title="事業所" dataIndex="office_total_price"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column title="他団体" dataIndex="organization_total_price"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column title="個人" dataIndex="personal_total"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column title="合計" dataIndex="SetSum"
                          render={(text) => <div>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                        />
                        <Table.Column render={(text, record, index) => (
                          <Dropdown.Button size='small' trigger='click' overlay={() => (
                            <Menu >
                              <Menu.Item onClick={() => (
                                this.setState({
                                  childModal: {
                                    ...childModal,
                                    visible: true,
                                    width: 900,
                                    component: (<WS0333001_SetIncludesQuery
                                      Li_StartDate={record.Li_ContractStartDate}
                                      Li_SetCode={record.JB_set_code}
                                      Li_CourseCode={record.GF_medical_exam_course}
                                      onFinishScreen={(data) => {
                                        this.setState({
                                          childModal: {
                                            ...childModal,
                                            visible: false,
                                          },
                                        });
                                      }}
                                    />),
                                  },
                                })
                              )}>照会</Menu.Item>
                              <Menu.Item
                                hidden={!record.Vl4StsContractInspectCondition}
                                onClick={() => (
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: '60%',
                                      component: (
                                        <WS0605130_ContractInspectCondition
                                          Li_ContractType={this.props.Li_ContractType}
                                          Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                                          Li_ContractStartDate={this.props.Li_ContractStartDate}
                                          Li_ContractNum={this.props.Li_ContractNum}
                                          Li_SetCode={record.JB_set_code}
                                          onClick={() => {
                                            this.setState({
                                              childModal: {
                                                ...this.state.childModal,
                                                visible: false,
                                              },
                                            });
                                          }}
                                        />
                                      ),
                                    },
                                  })
                                )}>条件照会</Menu.Item>
                            </Menu>
                          )}></Dropdown.Button>
                        )} />
                      </Table>
                    </Tabs.TabPane>
                  </Tabs>
                </Card>
              </Col>
              <Col xl={10} lg={24} md={24} span={10}>
                <Card style={{ height: "100%" }}>
                  <Form.Item name="Search" label="検索" className='mt-4' >
                    <Input onChange={this.handleSearch} />
                  </Form.Item>
                  <Table 
                    size='small'
                    dataSource={formInstance?.getFieldValue('ExamList')} 
                    rowKey={record => record?.id}
                    bordered
                    loading={isExamList} 
                    pagination={{ ...pagination, defaultPageSize: 17 }}
                  >
                    <Table.Column title="コード" dataIndex="W1_inspect_code" width={80}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>{value}</div>
                      )
                    }}
                    />
                    <Table.Column title="名称" dataIndex="exam_name" />
                    <Table.Column title="タイプ" dataIndex="Expression_2" />
                    <Table.Column title="確認" dataIndex="Expression_3" />
                    <Table.Column width={60} align='center'
                      render={(value, record, index) => (
                      <Button size="small" onClick={() => {
                        this.setState({
                          childModal: {
                            ...childModal,
                            visible: true,
                            width: 700,
                            component: (<WS0332001_ContractCourseBreakdownInquiry
                              Li_ContractType={this.props.Li_ContractType}
                              Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                              Li_ContractStartDate={this.props.Li_ContractStartDate}
                              Li_ContractNum={this.props.Li_ContractNum}
                              Li_CourseCode={record.W1_inspect_code}
                              Li_CourseInspectItemsMax1000={''}
                              onFinishScreen={(data) => {
                                this.setState({
                                  childModal: {
                                    ...childModal,
                                    visible: false,
                                  },
                                });
                              }}
                            />),
                          },
                        })
                      }}>照会</Button>
                    )} />
                  </Table>
                </Card>
              </Col>
            </Row>
            <Card>
              <hr style={{ border: '1px solid #F0F0F0', marginBottom: '1.2rem' }} />
              <Button type="primary" style={{ float: "right" }} onClick={() => {
                this.setState({
                  childModal: {
                    ...childModal,
                    visible: true,
                    width: 700,
                    component: (<WS0309017_ContractItemSub
                      Li_ContractType={this.props.Li_ContractType}
                      Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                      Li_ContractStartDate={this.props.Li_ContractStartDate}
                      Li_ContractNum={this.props.Li_ContractNum}

                      onFinishScreen={(data) => {
                        this.setState({
                          childModal: {
                            ...childModal,
                            visible: false,
                          },
                        });
                      }}
                    />),
                  },
                })
              }}>
                変更
              </Button>
            </Card>
          </Spin>
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
  };

};

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0605127_ContractLineItemDisplay);
