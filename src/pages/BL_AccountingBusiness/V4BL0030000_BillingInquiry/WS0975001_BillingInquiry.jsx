import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Select, Button, Table, Menu, Modal, Row, Col, DatePicker, InputNumber, Space, Tooltip, message } from "antd";
import WS0975007_DisplayItem from "./WS0975007_DisplayItem";

import { SearchOutlined } from '@ant-design/icons';
import WS0273001_VisitsTargetSearchQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0273001_VisitsTargetSearchQuery";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import ModalDraggable from "components/Commons/ModalDraggable";
import moment from "moment";
import BillingInquiryAction from "redux/AccountingBusiness/BillingInquiry/BillingInquiry.action";
import Color from "constants/Color";
import { number_format } from "helpers/CommonHelpers";
import WS0963001_InvoiceMaintain from "../V4BL0031000_DepositWithdrawalInquiry/WS0963001_InvoiceMaintain";
class WS0975001_BillingInquiry extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_ProcessDivision: PropTypes.any,
    Li_BillingPeriodBeginningInitialDisplay: PropTypes.any,
    Li_BillingPeriodFinalInitialDisplay: PropTypes.any,
    Li_IdentifyInitialDisplay: PropTypes.any,
    Li_TargetInitialDisplay: PropTypes.any,
    Li_PayRemainingInitialDisplay: PropTypes.any,
    Li_OutstandingInitialDisplay: PropTypes.any,
    Lo_BillingManageNum: PropTypes.any,
    Lo_Identify: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '請求問合せ';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: '',
      },
      dataSource: [],
      selectedRow: {},
      isLoadingTable: true,
      ClaimIdentify: 0,
      ComboBox_ClaimIdentify: [],

      DisplayItemList: '111110001111111'
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getScreenData();
    }
  }

  getScreenData() {
    let params = {
      Li_ProcessDivision: this.props.Li_ProcessDivision,
      Li_BillingPeriodBeginningInitialDisplay: this.props.Li_BillingPeriodBeginningInitialDisplay,
      Li_BillingPeriodFinalInitialDisplay: this.props.Li_BillingPeriodFinalInitialDisplay,
      Li_IdentifyInitialDisplay: this.props.Li_IdentifyInitialDisplay,
      Li_TargetInitialDisplay: this.props.Li_TargetInitialDisplay,
      Li_PayRemainingInitialDisplay: this.props.Li_PayRemainingInitialDisplay,
      Li_OutstandingInitialDisplay: this.props.Li_OutstandingInitialDisplay,
      Lo_BillingManageNum: this.props.Lo_BillingManageNum,
      Lo_Identify: this.props.Lo_Identify,
    };

    BillingInquiryAction.getScreenData(params)
      .then((res) => {
        this.setState({
          ComboBox_ClaimIdentify: res?.ComboBox_ClaimIdentify,
          DisplayItemList: res?.DisplayItemList,
          ClaimIdentify: res?.ClaimIdentify
        })
        this.formRef.current?.setFieldsValue({
          BillingPeriodAStart: moment(res?.BillingPeriodAStart),
          BillingPeriodAFinal: moment(res?.BillingPeriodAFinal),
          Outstanding: res.Outstanding,
          PayRemaining: res.PayRemaining,
          Target: res.Target,
          ClaimIdentify: res.ClaimIdentify
        })
        this.onSearch();
      });
  };

  onSearch() {
    let values = this.formRef.current?.getFieldValue()
    let data = {
      ...values,
      BillingPeriodAStart: values.BillingPeriodAStart?.format("YYYY/MM/DD"),
      BillingPeriodAFinal: values.BillingPeriodAFinal?.format("YYYY/MM/DD"),
    };

    this.setState({ isLoadingTable: true });

    BillingInquiryAction.getDataOnSearch(data)
      .then((res) => {
        this.setState({
          dataSource: res?.data,
          isLoadingTable: false,
          selectedRow: res?.data && res?.data.length > 0 ? res?.data[0] : {}
        });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  onFinish(values) {
    this.onSearch(values);
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  renderItem(ClaimIdentify) {
    switch (ClaimIdentify) {
      case 1:
      case 9:
        return (
          <Col span={10} style={{ paddingRight: '5px', paddingLeft: '5px' }}>
            <Row>
              <Col span={12} style={{ paddingRight: '5px' }}>
                <Form.Item name="Lio_PersonalNum" label="個　人" >
                  <Input.Search type='number' style={{ textAlign: "right" }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '90%',
                          className: '',
                          component:
                            <WS0248001_PersonalInfoSearchQuery
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  Lio_PersonalNum: output.Lo_PersonalNumId,
                                  kanji_name: output.recordData?.kanji_name,
                                });
                                this.closeModal()
                              }} />
                        },
                      });
                    }}
                    onChange={(e) => {
                      this.formRef.current?.setFieldsValue({
                        kanji_name: ''
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: '5px' }}>
                <Form.Item name="kanji_name" >
                  <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        )
      case 4:
        return (
          <Col span={10} style={{ paddingRight: '5px', paddingLeft: '5px' }}>
            <Row>
              <Col span={12} style={{ paddingRight: '5px' }}>
                <Form.Item name="Lio_InsurerNum" label="保険者" >
                  <Input.Search type='number' style={{ textAlign: "right" }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '60%',
                          className: '',
                          component:
                            <WS0246001_InsurerInfoSearchQuery
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  Lio_InsurerNum: output.Lo_InsurerCode,
                                  insurer_kanji_name: output.Lo_Name
                                })

                                this.closeModal()
                              }} />
                        },
                      });
                    }}
                    onChange={(e) => {
                      this.formRef.current?.setFieldsValue({
                        insurer_kanji_name: ''
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: '5px' }}>
                <Form.Item name="insurer_kanji_name">
                  <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        )
      case 5:
        return (
          <Col span={18} style={{ paddingRight: '5px', paddingLeft: '5px' }}>
            <Row>
              <Col span={7} style={{ paddingRight: '5px' }}>
                <Form.Item name="Lio_OfficeCode" label="事業所"  >
                  <Input.Search type="text" style={{ textAlign: 'right' }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '60%',
                          className: '',
                          component:
                            <WS0247001_OfficeInfoRetrievalQuery
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  Lio_OfficeCode: output.Lio_OfficeCode,
                                  Lio_BranchStoreCode: output.Lio_BranchStoreCode,
                                  Lio_BranchStoreCodeCopy: output.Lio_BranchStoreCode === 0 ? '' : output.Lio_BranchStoreCode,
                                  office_kanji_name: output.Lo_Kanji_Name
                                })

                                this.closeModal()
                              }} />
                        },
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={4} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                <Form.Item name="Lio_BranchStoreCode" style={{ display: 'none' }}></Form.Item>
                <Form.Item name="Lio_BranchStoreCodeCopy" >
                  <Input.Search type='number' style={{ textAlign: "right" }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '60%',
                          className: '',
                          component:
                            <WS0247001_OfficeInfoRetrievalQuery
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  Lio_OfficeCode: output.Lio_OfficeCode,
                                  Lio_BranchStoreCode: output.Lio_BranchStoreCode,
                                  Lio_BranchStoreCodeCopy: output.Lio_BranchStoreCode === 0 ? '' : output.Lio_BranchStoreCode,
                                  office_kanji_name: output.Lo_Kanji_Name
                                })

                                this.closeModal()
                              }} />
                        },
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={10} style={{ paddingLeft: '5px' }}>
                <Form.Item name="office_kanji_name" >
                  <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        )
      default:
        break;
    }
  }

  selectRecord(record) {
    if (!(this.props.Li_ProcessDivision > 0)) {
      let condition = record.W1_identify == 1 || record.W1_billing_manage_num == 2 || record.W1_billing_manage_num == 3
      if (!condition) {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: '90%',
            className: 'custom-button-close',
            component: (
              <WS0963001_InvoiceMaintain
                Li_BillingManageNum={record.W1_billing_manage_num}
                onFinishScreen={(output) => {
                  this.closeModal()
                }} />
            )
          }
        })
      }
    } else {
      if (this.props.onFinishScreen) {
        this.props.onFinishScreen({
          Lo_BillingManageNum: record.W1_billing_manage_num,
          Lo_Identify: record.W1_identify,
          recordData: record
        });
      }
    }
  }

  render() {
    return (
      <div className="billing-inquiry">
        <Card title="請求問合せ">
          <Space>
            <Button disabled={Object.keys(this.state.selectedRow).length > 0}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 500,
                    className: '',
                    component:
                      <WS0975007_DisplayItem
                        Lio_DisplayItems={this.state.DisplayItemList}
                        onFinishScreen={(output) => {

                          this.closeModal()
                        }} />
                  },
                });
              }}>
              表示項目
            </Button>
            <Button disabled={Object.keys(this.state.selectedRow).length === 0}
              onClick={() => {
                this.selectRecord(this.state.selectedRow)
              }}>
              選択
            </Button>
          </Space>
          <hr style={{ margin: '15px 0' }} />

          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            onClick={() => {
              this.setState({
                selectedRow: {},
              })
            }}
          >
            <Row>
              <div style={{ width: 1000, padding: 10, border: '1px solid #b3d0ea', marginBottom: 15 }}>
                <div style={{ display: 'none' }}>
                  <Form.Item name="OfficeNum"><Input type="text" /></Form.Item>
                  <Form.Item name="BranchStoreCode"><Input type="text" /></Form.Item>
                </div>
                <Form.Item label='請求年月' labelCol={{ span: 2 }}>
                  <Row gutter={24}>
                    <Col span={7}>
                      <Space>
                        <Form.Item name="BillingPeriodAStart" style={{ marginBottom: 0 }}>
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD' style={{ width: 112 }} />
                        </Form.Item>
                        <span>~</span>
                        <Form.Item name="BillingPeriodAFinal" style={{ marginBottom: 0 }}>
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD' style={{ width: 112 }} />
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={4} style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                      <Form.Item name="Outstanding" label="発行" >
                        <Select>
                          <Select.Option value={0}>全て</Select.Option>
                          <Select.Option value={1}>未発行</Select.Option>
                          <Select.Option value={2}>既発行</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={5} style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                      <Form.Item name="ClaimNum" label="請求番号">
                        <InputNumber />
                      </Form.Item>
                    </Col>
                    <Col span={4} style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                      <Form.Item name="PayRemaining" label="入金残"  >
                        <Select>
                          <Select.Option value={0}>全て</Select.Option>
                          <Select.Option value={1}>無し</Select.Option>
                          <Select.Option value={2}>有り</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={4} style={{ paddingLeft: '5px' }}>
                      <Form.Item name="Target" label="対象"  >
                        <Select>
                          <Select.Option value={0}>有効</Select.Option>
                          <Select.Option value={1}>削除</Select.Option>
                          <Select.Option value={2}>統合</Select.Option>
                          <Select.Option value={3}>全て</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label='宛名検索' labelCol={{ span: 2 }}>
                  <Row gutter={24}>
                    <Col span={24} >
                      <Form.Item name="AddressSearch" >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                  </Row>

                </Form.Item>

                <Form.Item label='請求対象' labelCol={{ span: 2 }}>
                  <Row gutter={24}>
                    <Col span={4} >
                      <Form.Item name="ClaimIdentify"  >
                        <Select style={{ width: 112 }}
                          onChange={(value) => {
                            this.setState({ ClaimIdentify: value })
                            this.formRef.current?.setFieldsValue({
                              Lio_PersonalNum: null,
                              kanji_name: '',
                              Lio_InsurerNum: null,
                              insurer_kanji_name: '',
                              Lio_OfficeCode: '',
                              Lio_BranchStoreCode: null,
                              Lio_BranchStoreCodeCopy: null,
                              Lo_Kanji_Name: ''
                            })
                          }}>
                          {this.state.ComboBox_ClaimIdentify?.map((item, index) => (
                            <Select.Option key={index} value={item.LinkedField}>{item.DisplayField}</Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    {this.renderItem(this.state.ClaimIdentify)}
                  </Row>

                </Form.Item>

                <Form.Item label='予約番号' labelCol={{ span: 2 }}>
                  <Row gutter={24}>
                    <Col span={7} >
                      <Form.Item name="ReserveNum"  >
                        <Input.Search type='number' style={{ width: 170, textAlign: "right" }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                className: '',
                                component:
                                  <WS0273001_VisitsTargetSearchQuery
                                    LnkOutReserveNum={this.formRef.current?.getFieldValue('ReserveNum')}
                                    Li_StateFlagSpecify={1}
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        ReserveNum: output.LnkOutReserveNum
                                      })
                                      this.closeModal()
                                    }} />
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item style={{ textAlign: 'right' }}>
                  <Button
                    icon={<SearchOutlined />}
                    htmlType="submit"
                    style={{ float: "right", color: '#14468c', borderColor: '#76a6ea' }}
                  >
                    検　　索
                  </Button>
                </Form.Item>
              </div>
            </Row>
          </Form>

          <Table
            size='small'
            style={{ cursor: 'pointer' }}
            rowClassName={(record, index) => record.id === this.state.selectedRow.id ? 'table-row-light' : ''}
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered={true}
            rowKey={(record) => record.id}
            scroll={{ x: '1450px' }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  this.setState({
                    selectedRow: record
                  })
                }
              };
            }}
          >
            <Table.Column title="請求先" dataIndex="Expression_9" width={65} align='center'
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_10)?.Foreground }}>{value}</div>
                )
              }} />
            <Table.Column title="統合" dataIndex="Expression_14" width={65}
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_10)?.Foreground }}>{value}</div>
                )
              }} />
            <Table.Column title="請求番号" dataIndex="W1_invoice_num" width={80}
              render={(value, record, index) => {
                return (
                  <div
                    style={{
                      textAlign: 'right',
                      color: Color(record.Expression_10)?.Foreground
                    }}
                  >
                    {value === 0 ? '' : value}
                  </div>
                )
              }} />
            <Table.Column title="請求日" dataIndex="W1_billing_date" width={90}
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_10)?.Foreground }}>
                    {value === '0000-00-00' ? '' : value?.replaceAll('-', '/')}
                  </div>
                )
              }} />
            <Table.Column title="発行日" dataIndex="W1_invoice_date" width={90}
              render={(value, record, index) => {
                return (
                  <div>
                    {value === '0000-00-00' ? '' : value?.replaceAll('-', '/')}
                  </div>
                )
              }} />
            <Table.Column title="受診開始日" dataIndex="W1_consult_start_date" width={90}
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_10)?.Foreground }}>
                    {value === '0000-00-00' ? '' : value?.replaceAll('-', '/')}
                  </div>
                )
              }} />
            <Table.Column title="受診終了日" dataIndex="W1_consult_end_date" width={90}
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_10)?.Foreground }}>
                    {value === '0000-00-00' ? '' : value?.replaceAll('-', '/')}
                  </div>
                )
              }} />
            <Table.Column title="請求金額" dataIndex="W1_billing_amount" width={90}
              render={(value, record, index) => {
                return (
                  <div style={{
                    textAlign: 'right',
                    color: Color(record.Expression_10)?.Foreground
                  }}>
                    {value === 0 ? '' : number_format(value)}
                  </div>
                )
              }} />
            <Table.Column title="入金額" dataIndex="W1_deposit_amount" width={90}
              render={(value, record, index) => {
                return (
                  <div style={{
                    textAlign: 'right',
                    color: Color(record.Expression_10)?.Foreground
                  }}>
                    {value === 0 ? '' : number_format(value)}
                  </div>
                )
              }} />
            <Table.Column title="未収金額" dataIndex="W1_accrued_price" width={90}
              render={(value, record, index) => {
                return (
                  <div style={{
                    textAlign: 'right',
                    color: Color(record.Expression_10)?.Foreground
                  }}>
                    {value === 0 ? '' : number_format(value)}
                  </div>
                )
              }} />
            <Table.Column title="入出金日" dataIndex="payment_day_on" width={90}
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_10)?.Foreground }}>
                    {value === '0000-00-00' ? '' : value?.replaceAll('-', '/')}
                  </div>
                )
              }} />
            <Table.Column title="宛　名" dataIndex="W1_destination_name"
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_10)?.Foreground }}>
                    {value}
                  </div>
                )
              }} />
            <Table.Column title="ｺｰﾄﾞ" dataIndex="Expression_25" width={70}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    {value == 0 ? '' : value}
                  </div>
                )
              }} />
            <Table.Column title="個人・団体名称" dataIndex="Expression_26" width={180}
              render={(value, record, index) => {
                return (
                  <Tooltip title={record.Expression_17}>
                    <div style={{ color: Color(record.Expression_10)?.Foreground }}>
                      {value}
                    </div>
                  </Tooltip>
                )
              }} />
            <Table.Column title="削除" dataIndex="Expression_11" width={50} align='center' />
            <Table.Column fixed='right' width={60} align='center'
              render={(value, record) => {
                return (
                  <Button type="primary"
                    onClick={() => {
                      this.selectRecord(record)
                    }}
                  >選択</Button>
                )
              }} />
          </Table>
        </Card>
        <ModalDraggable
          className={this.state.childModal.className}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0975001_BillingInquiry);
