import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Select, Button, Table, Row, Col, Space, InputNumber, DatePicker, Checkbox, Modal, Menu, Dropdown, Tag, message } from "antd";
import WS0975001_BillingInquiry from "../V4BL0030000_BillingInquiry/WS0975001_BillingInquiry";
import WS0952007_PaymentHistoryDisplaySingle from "./WS0952007_PaymentHistoryDisplaySingle";
import AddInspectDetailedInputService from './../../../services/SpecificInsureMaintenance/ContractMasterMaintain/AddInspectDetailedInputService';
import CounterPaymentAction from "redux/AccountingBusiness/Invoice/CounterPayment.actions";
import { ModalError } from "components/Commons/ModalConfirm";
import Color from "constants/Color";
import moment from "moment-timezone";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import Menubar from "components/Commons/Menubar";

const styleTag = {
  height: '24px',
  margin: 0,
  background: '#1C66B9',
  color: '#FFFFFF',
  textAlign: 'center',
};
const dateFormat = 'YYYY/MM/DD';

class WS0952001_CounterPayment extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_BillingManageNum: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = '窓口入金';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initObj: {},
      isLoading: false,
      rowSelect: {},
      dataSource: [],
      initParams: {
        BillingManageNum: ''
      },
      menuItems: [
        { id: 1, label: '履歴表示', handleClick: this.eventF7 },
        // IF(ProvisionalConfirmProcess,IF(ReceiptAndPayClassify=1,'入力完了','出金完了'),IF(ReceiptAndPayClassify=1,'領収印刷','出金確定'))
        { id: 2, label: '入力完了', handleClick: this.eventF12 },
      ],
    };
  }

  componentDidMount = () => {
    this.loadInitData();
  }

  loadInitData = () => {
    CounterPaymentAction.getScreenCounterPaymentAction()
      .then(res => {
        let dataRes = res?.data;
        if (dataRes) {
          let data = {
            ...dataRes,
            BillingManageNum: dataRes.BillingManageNum === 0 ? null : dataRes.BillingManageNum,
            reservation_number: dataRes.reservation_number === 0 ? null : dataRes.reservation_number,
            receipt_number: dataRes.receipt_number === 0 ? null : dataRes.receipt_number,
            insurer_code: dataRes.insurer_code === 0 ? null : dataRes.insurer_code,
            Age: dataRes.Age === 0 ? null : dataRes.Age,
            branch_store_code: dataRes.branch_store_code === 0 ? null : dataRes.branch_store_code,
            PayDateChar: moment(dataRes.PayDateChar).isValid ? moment(dataRes.PayDateChar) : null
          };
          this.setState({ initObj: data });
          this.handleChangeValue({ BillingManageNum: data.BillingManageNum })
          this.formRef?.current?.setFieldsValue({ ...data })
          // this.loadInfoPage({
          //   BillingManageNum: data.BillingManageNum,
          //   IdentifyDataDisplay: data.IdentifyDataDisplay || '',
          //   ScreenReDisplayPresence: data.ScreenReDisplayPresence
          // })
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadInfoPage = (params) => {
    CounterPaymentAction.getInfoPageCounterPaymentAction(params)
      .then(res => {
        let dataRes = res?.data;
        if (dataRes) {
          let data = {
            ...dataRes,
            BillingManageNum: dataRes.BillingManageNum === 0 ? null : dataRes.BillingManageNum,
            reservation_number: dataRes.reservation_number === 0 ? null : dataRes.reservation_number,
            receipt_number: dataRes.receipt_number === 0 ? null : dataRes.receipt_number,
            insurer_code: dataRes.insurer_code === 0 ? null : dataRes.insurer_code,
            Age: dataRes.Age === 0 ? null : dataRes.Age,
            branch_store_code: dataRes.branch_store_code === 0 ? null : dataRes.branch_store_code,
            PayDateChar: moment(dataRes.PayDateChar).isValid ? moment(dataRes.PayDateChar) : null
          };
          this.setState({
            initObj: {
              ...this.state.initObj,
              ...data
            }
          })
          this.formRef?.current?.setFieldsValue({ ...data })
          this.loadData()
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = () => {
    this.setState({ isLoading: true })
    CounterPaymentAction.getBillingDataDisplayCounterPaymentAction()
      .then(res => {
        let dataRes = res?.data;
        if (dataRes) {
          let data = dataRes;
          this.setState({ dataSource: data })
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  changeBillingManageNum = (params) => {
    CounterPaymentAction.changeBilliManagerNumCounterPaymentAction(params)
      .then((res) => this.loadInfoPage({
        BillingManageNum: res?.data?.BilliManagerNum || '',
        IdentifyDataDisplay: this.state.initObj.IdentifyDataDisplay || '',
        ScreenReDisplayPresence: res.data.ScreenReDisplayPresence
      }))
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  handleChangeValue = (objChange) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        ...objChange
      }
    })
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    const { initObj, initParams } = this.state;
    return (
      <div className="counter-payment">
        <Card title="窓口入金" className="mb-3">
          <Form ref={this.formRef} onFinish={this.onFinish}
            initialValues={{
              ReceiptAndPayClassify: 1
            }}
          >
            <Menubar items={this.state.menuItems} />

            <Row gutter={24} className='mt-3'>
              <Col span={10}>
                <Space>
                  <Form.Item><Tag style={styleTag}>請求管理番号</Tag></Form.Item>
                  <Form.Item name="BillingManageNum" style={{ marginBottom: '5px' }}>
                    <InputNumber
                      maxLength={13}
                      readOnly={!initObj.KeyEditingPermission} // Expresstion_98
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "80%",
                            component: (
                              <WS0975001_BillingInquiry
                                Li_ProcessDivision={1}
                                Li_BillingPeriodBeginningInitialDisplay={''}
                                Li_BillingPeriodFinalInitialDisplay={''}
                                Li_IdentifyInitialDisplay={1}
                                Li_TargetInitialDisplay={0}
                                Li_PayRemainingInitialDisplay={2}
                                Li_OutstandingInitialDisplay={0}
                                Lo_BillingManageNum={this.state.initParams.BillingManageNum}
                                Lo_Identify={''}
                                onFinishScreen={({ Lo_BillingManageNum, Lo_Identify }) => {
                                  this.changeBillingManageNum({
                                    BilliManagerNum: Lo_BillingManageNum,
                                    PrvBilliManagerNum: Lo_Identify
                                  })
                                  this.formRef?.current?.setFieldsValue({ BillingManageNum: Lo_BillingManageNum })
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
              <Col span={14}>
                <Row>
                  <Col span={8}>
                    <Space>
                      <Form.Item><Tag style={styleTag}>予約番号</Tag></Form.Item>
                      <Form.Item name="reservation_number">
                        <InputNumber readOnly bordered={false} />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col span={8}>
                    <Space>
                      <Form.Item><Tag style={styleTag}>受付番号</Tag></Form.Item>
                      <Form.Item name="receipt_number">
                        <InputNumber readOnly bordered={false} />
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* SubPersonalDataDisplay */}
            <Row gutter={24} hidden={!(initObj.BillingDisplay === 0)}>
              <Col span={5}>
                <Form.Item />
                <Form.Item name="personal_number_id" label="個人番号" >
                  <Input readOnly bordered={false} />
                </Form.Item>
                <Form.Item />
              </Col>
              <Col span={7}>
                <Form.Item />
                <Form.Item label='氏名'>
                  <Form.Item name="kana_name">
                    <Input readOnly bordered={false} />
                  </Form.Item>
                  <Form.Item name="kanji_name" >
                    <Input readOnly bordered={false} />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item />
                <Form.Item >
                  <Form.Item label='　性　別' name="Expresstion_2">
                    <Input readOnly bordered={false} />
                  </Form.Item>
                  <Form.Item label='生年月日' name="fax" >
                    <Space>
                      <Form.Item name="birthday_on" >
                        <Input readOnly bordered={false} />
                      </Form.Item>
                      <Form.Item name="Expresstion_4" >
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col offset={3} span={2}>
                <Form.Item />
                <Form.Item >
                  <Form.Item />
                  <Form.Item label='年齢' name="Age" >
                    <InputNumber readOnly bordered={false} />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            {/* SubOfficeDataDisplay */}
            <Row gutter={24} hidden={!(initObj.BillingDisplay === 1)}>
              <Col span={5}>
                <Form.Item />
                <Form.Item label="事業所番号" >
                  <Space>
                    <Form.Item name='office_code'>
                      <Input readOnly bordered={false} />
                    </Form.Item>
                    <Form.Item>
                      <Input readOnly bordered={false} value='-' />
                    </Form.Item>
                    <Form.Item name='branch_store_code'>
                      <InputNumber readOnly bordered={false} />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item />
              </Col>
              <Col span={15}>
                <Form.Item />
                <Form.Item label='事業所名'>
                  <Form.Item name="office_kana_name">
                    <Input readOnly bordered={false} />
                  </Form.Item>
                  <Form.Item name="office_kanji_name" >
                    <Input readOnly bordered={false} />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item />
                <Form.Item >
                  <Form.Item label='　電話番号' name="phone_number">
                    <Input readOnly bordered={false} />
                  </Form.Item>
                  <Form.Item label='ＦＡＸ番号' name="fax" >
                    <Input readOnly bordered={false} />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            {/* SubInsurerDataDisplay */}
            <Row gutter={24} hidden={!(initObj.BillingDisplay === 2)}>
              <Col span={5}>
                <Form.Item />
                <Form.Item name="insurer_code" label="保険者番号" >
                  <InputNumber readOnly bordered={false} />
                </Form.Item>
                <Form.Item />
              </Col>
              <Col span={15}>
                <Form.Item />
                <Form.Item label='保険者名'>
                  <Form.Item name="insurer_kana_name">
                    <Input readOnly bordered={false} />
                  </Form.Item>
                  <Form.Item name="insurer_kanji_name" >
                    <Input readOnly bordered={false} />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item />
                <Form.Item >
                  <Form.Item label='　電話番号' name="phone_number">
                    <Input readOnly bordered={false} />
                  </Form.Item>
                  <Form.Item label='ＦＡＸ番号' name="fax" >
                    <Input readOnly bordered={false} />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            <Table
              bordered
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
              rowKey={(record) => record.id}
              // rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="請求先区分" dataIndex='' render={(value, record) => (
                <>
                  <Form.Item />
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Button
                      style={{ background: '#E1E1E1' }}
                      disabled={!(record.W2_billing_amount !== 0)} // W2_billing_amount<>0 (Expresstion_9)
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "80%",
                            component: (
                              <WS0952007_PaymentHistoryDisplaySingle
                                Li_BillingManageNum={this.formRef.current.getFieldValue('BillingManageNum')}
                                Li_Identify={record.W2_identify}
                                onFinishScreen={(output) => {
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    >{record.Expresstion_3}</Button>
                  </Form.Item>
                  <Form.Item />
                </>
              )}
              />
              <Table.Column title="入金" dataIndex="W2_payment_flg" width={70} render={(checked, record, index) => (
                <>
                  <Form.Item />
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Checkbox
                      checked={checked}
                      disabled={!record.Expresstion_2}
                    />
                  </Form.Item>
                  <Form.Item />
                </>
              )} />
              <Table.Column title="まとめ発行" dataIndex="W2_sum_issued_flg" render={(checked, record, index) => (
                <>
                  <Form.Item />
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Checkbox
                      checked={checked}
                      disabled={!(record.Expresstion_1 && record.Expresstion_31)}
                    />
                  </Form.Item>
                  <Form.Item />
                </>
              )} />
              <Table.Column title="請求/最終入金" render={(text, record, index) => (
                <>
                  <Form.Item />
                  <Form.Item>
                    <div style={{ color: Color(record.Expresstion_12)?.Foreground }}>
                      {moment(record.W2_billing_date).isValid()
                        ? moment(record.W2_billing_date).format(dateFormat)
                        : '0000/00/00'
                      }
                    </div>
                    <Row>
                      <Col span={18}>
                        <div style={{ color: Color(record.Expresstion_12)?.Foreground }}>
                          {moment(record.W2_final_payment_day).isValid()
                            ? moment(record.W2_final_payment_day).format(dateFormat)
                            : '0000/00/00'
                          }
                        </div>
                      </Col>
                      <Col span={6}><span style={{ color: Color(record.Expresstion_12)?.Foreground, float: 'right' }}>({record.W2_register_sect})</span></Col>
                    </Row>
                  </Form.Item>
                  <Form.Item />
                </>
              )} />
              <Table.Column title="請求金額" dataIndex="W2_billing_amount" render={(value, record) => (
                <div style={{ color: Color(record.Expresstion_12)?.Foreground, textAlign: 'right' }}>{value?.toLocaleString()}</div>
              )} />
              <Table.Column title="入金合計額" dataIndex="W2_payment_total_price" render={(value, record) => (
                <div style={{ color: Color(record.Expresstion_12)?.Foreground, textAlign: 'right' }}>{value?.toLocaleString()}</div>
              )} />
              <Table.Column title="未収金額" dataIndex="W2_accrued_price" render={(value, record) => (
                <div style={{ color: Color(record.Expresstion_12)?.Foreground, textAlign: 'right' }}>{value?.toLocaleString()}</div>
              )} />
              <Table.Column title="" dataIndex="" render={(text, record, index) => (
                <>
                  <Row gutter={10}>
                    <Col span={4}>宛　名</Col>
                    <Col span={20}>
                      <Form.Item >
                        <Input
                          bordered={false}
                          maxLength={100}
                          value={record.W2_address}
                          style={{ color: Color(record.Expresstion_12)?.Foreground }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={4}>件　名</Col>
                    <Col span={20}>
                      <Form.Item >
                        <Input
                          bordered={false}
                          maxLength={100}
                          value={record.W2_target}
                          style={{ color: Color(record.Expresstion_12)?.Foreground }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={4}>備　考</Col>
                    <Col span={20}>
                      <Form.Item >
                        <Input
                          bordered={false}
                          maxLength={100}
                          value={record.W2_remark}
                          style={{ color: Color(record.Expresstion_12)?.Foreground }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )} />
            </Table>

            <Row gutter={24} className='mt-3'>
              <Col span={4} style={{ borderRight: '1px solid #d9d9d9' }}>
                <Space>
                  <Form.Item><Tag style={styleTag}>&ensp;請求合計額&ensp;</Tag></Form.Item>
                  <Form.Item name="ClaimTotalAmount">
                    <InputNumber readOnly bordered={false} />
                  </Form.Item>
                </Space>
                <Space>
                  <Form.Item><Tag style={styleTag}>&ensp;入金合計額&ensp;</Tag></Form.Item>
                  <Form.Item name="PayTotalAmount">
                    <InputNumber readOnly bordered={false} />
                  </Form.Item>
                </Space>
                <Space>
                  <Form.Item><Tag style={styleTag}>未収金合計額</Tag></Form.Item>
                  <Form.Item name="ReceivablesTotal">
                    <InputNumber readOnly bordered={false} />
                  </Form.Item>
                </Space>
              </Col>
              <Col span={20}>
                {/* line 1 */}
                <Row gutter={24}>
                  <Col span={6}>
                    <Row gutter={16}>
                      <Col span={6}><Form.Item><Tag style={styleTag}>入出金区分</Tag></Form.Item></Col>
                      <Col span={18}>
                        <Form.Item name="ReceiptAndPayClassify" >
                          <Select disabled={!(initObj.Expresstion_99 && initObj.Expresstion_53)}>
                            <Select.Option value={1}>入金</Select.Option>
                            <Select.Option value={2}>入出金</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* line 2 */}
                <Row gutter={24}>
                  <Col span={6}>
                    <Row gutter={16}>
                      <Col span={6}><Form.Item><Tag style={{ ...styleTag, width: '76px' }}>{initObj.Expresstion_23}</Tag></Form.Item></Col>
                      <Col span={18}>
                        <Form.Item name="PayType1" >
                          <Select disabled={!initObj.Expresstion_53}>
                            {initObj.PayType2_list?.map(item => (
                              <Select.Option key={'PayType2_' + item.key} value={item.key}>{item.value}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row gutter={16}>
                      <Col span={6}><Form.Item><Tag style={{ ...styleTag, width: '76px' }}>{initObj.Expresstion_22}</Tag></Form.Item></Col>
                      <Col span={18}>
                        <Form.Item name="ThisTimeDepositAmount1" >
                          <InputNumber 
                            maxLength={8} 
                            readOnly={!(initObj.Expresstion_80 && initObj.Expresstion_53)} 
                            style={{ padding: '0 4px' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row gutter={16}>
                      <Col span={6}><Form.Item><Tag style={styleTag}>&ensp;　釣銭　&ensp;</Tag></Form.Item></Col>
                      <Col span={18}>
                        <Form.Item name="Change1" >
                          <InputNumber readOnly bordered={false} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row gutter={16} hidden={initObj.Expresstion_60}>
                      <Col span={6}><Form.Item><Tag style={styleTag}>ｸﾚｼﾞｯﾄ会社</Tag></Form.Item></Col>
                      <Col span={18}>
                        <Form.Item name="CreditCompanies1" >
                          <Select disabled={!initObj.Expresstion_53}>
                            {initObj.CreditCompanies1_list?.map(item => (
                              <Select.Option key={'CreditCompanies1_' + item.key} value={item.key}>{item.value}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* line 3 */}
                <Row gutter={24}>
                  <Col span={6}>
                    <Row gutter={16} hidden={initObj.Expresstion_100}>
                      <Col span={6}></Col>
                      <Col span={18}>
                        <Form.Item name="PayType2" >
                          <Select disabled={!initObj.Expresstion_53}>
                            {initObj.PayType1_list?.map(item => (
                              <Select.Option key={'PayType1_' + item.key} value={item.key}>{item.value}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row gutter={16}>
                      <Col span={6}></Col>
                      <Col span={18}>
                        <Form.Item name="ThisTimeDepositAmount2" >
                          <InputNumber maxLength={8} readOnly={!initObj.Expresstion_53} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}></Col>
                  <Col span={6}>
                    <Row gutter={16} hidden={initObj.Expresstion_61}>
                      <Col span={6}><Form.Item><Tag style={styleTag}>ｸﾚｼﾞｯﾄ会社</Tag></Form.Item></Col>
                      <Col span={18}>
                        <Form.Item name="CreditCompany2" >
                          <Select disabled={!initObj.Expresstion_53}>
                            {initObj.CreditCompany2_list?.map(item => (
                              <Select.Option key={'CreditCompany2_' + item.key} value={item.key}>{item.value}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* line 4 */}
                <Row gutter={24}>
                  <Col span={6}></Col>
                  <Col span={6}>
                    <Row gutter={16}>
                      <Col span={6}><Form.Item><Tag style={styleTag}>&ensp;　合計　&ensp;</Tag></Form.Item></Col>
                      <Col span={18}>
                        <Form.Item name="ThisTimeDepositAmountTotal" >
                          <InputNumber readOnly bordered={false} style={{ padding: '0 4px' }}/>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row gutter={16}>
                      <Col span={6}></Col>
                      <Col span={18}>
                        <Form.Item name="ChangeTotal" >
                          <InputNumber readOnly bordered={false} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* line 5 */}
                <Row gutter={24}>
                  <Col span={6}>
                    <Row gutter={16}>
                      <Col span={6}><Form.Item><Tag style={{ ...styleTag, width: '76px' }}>{initObj.Expresstion_24}</Tag></Form.Item></Col>
                      <Col span={18}>
                        <Form.Item name="PayDateChar" >
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} style={{ textAlign: 'center' }} disabled={!initObj.Expresstion_53} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row gutter={16}>
                      <Col span={6}><Form.Item><Tag style={styleTag}>&ensp;レジ区分&ensp;</Tag></Form.Item></Col>
                      <Col span={18}>
                        <Form.Item name="RegisterClassify" >
                          <InputNumber maxLength={1} readOnly={!initObj.Expresstion_53} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* line 6, 7, 8 */}
                <div style={{ display: 'flex' }}>
                  <Form.Item ><Tag style={styleTag}>&ensp;　宛名　&ensp;</Tag></Form.Item>
                  <Form.Item name="ReceiptAddress" style={{ width: '80%', marginLeft: '11px' }}>
                    <Input maxLength={100} readOnly={!(initObj.Expresstion_90 && initObj.Expresstion_53)} />
                  </Form.Item>
                </div>
                <div style={{ display: 'flex' }}>
                  <Form.Item ><Tag style={styleTag}>&ensp;　件名　&ensp;</Tag></Form.Item>
                  <Form.Item name="ReceiptSubject" style={{ width: '80%', marginLeft: '11px' }}>
                    <Input maxLength={100} readOnly={!(initObj.Expresstion_90 && initObj.Expresstion_53)} />
                  </Form.Item>
                </div>
                <div style={{ display: 'flex' }}>
                  <Form.Item ><Tag style={styleTag}>&ensp;　備考　&ensp;</Tag></Form.Item>
                  <Form.Item name="Remarks" style={{ width: '80%', marginLeft: '11px' }}>
                    <Input maxLength={100} readOnly={!(initObj.Expresstion_90 && initObj.Expresstion_53)} />
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Form.Item className='mt-3'>
              <Space style={{ float: 'right' }}>
                <Button type='primary' disabled={initObj.Expresstion_54}>取消</Button>
                <Button type='primary'>{initObj.Expresstion_156}</Button>
              </Space>
            </Form.Item>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0952001_CounterPayment);
