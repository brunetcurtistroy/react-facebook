import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Card, Form, Input, Radio, Select, Button, Table, Row, Col, Menu, Dropdown, Tooltip, message, Space, InputNumber } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import Color from "constants/Color";
import { ModalCustom } from "components/Commons/ModalCustom";
import {
  getScreenInvoiceAction, DisplayBtnInvoiceAction, QueryResultsDisplayInvoiceAction,
  OptionsDisplayInvoiceAction, Issue_F12InvoiceAction, MissingOrDeletedInvoiceAction, ChangeInvoiceAction
} from "redux/AccountingBusiness/Invoice/Invoice.actions";
import WS2354001_BillingManageLedgerInstruction from "../V3BILL200_BillingManageLedgerInstruction/WS2354001_BillingManageLedgerInstruction";
import WS0963001_InvoiceMaintain from "../V4BL0031000_DepositWithdrawalInquiry/WS0963001_InvoiceMaintain";
import WS0948001_BillingAggregationProcess from "./WS0948001_BillingAggregationProcess";
import WS0947001_Invoice from "../V4BL0008000_BillingIntegration/WS0947001_Invoice";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0952001_CounterPayment from "./WS0952001_CounterPayment";
import WS2626028_IntegrationReleased from './WS2626028_IntegrationReleased'
import WS2585001_OfficeInfoInquirySub from "pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import WS0339001_InsurerInfoMaintain from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0339001_InsurerInfoMaintain";
import WS1512001_OptionalInfoMaintain from "pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512001_OptionalInfoMaintain";
import Menubar from "components/Commons/Menubar";

const grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class WS2626001_Invoice extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "請求書発行";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      listID: [],
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      initObj: {},
      initParams: {
        ClaimYearsChar: '',
        ClaimNum: '',
        Outstanding: 2,
        Target: 0,
        ClaimIdentify: 0,
        InsurerNum: '',
        OfficeNum: '',
        BranchStoreCode: '',
        AddressSearch: '',
        StsSelectAll: '',
        ClaimYears: ''
      },
      menuItems: [
        { id: 1, label: '管理台帳', handleClick: this.eventF9 },
        { id: 2, label: '新規', handleClick: this.eventF10 },
        { id: 3, label: '集計', handleClick: this.eventF11 },
        { id: 4, label: '発行', handleClick: this.Issue_F12 },
      ],
    };
  }

  componentDidMount = () => {
    this.loadInitData();
  }

  loadInitData = () => {
    getScreenInvoiceAction()
      .then(res => {
        if (res?.data) {
          this.setState({
            initObj: res.data,
            initParams: {
              ...this.state.initParams,
              StsSelectAll: res.data.StsSelectAll,
              ClaimYears: res.data.ClaimYears,
              ClaimYearsChar: res.data.ClaimYearsChar
            }
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = () => {
    this.setState({ isLoading: true });
    QueryResultsDisplayInvoiceAction()
      .then(res => {
        if (res?.data) {
          let arrID = [];
          if (res.data.length > 0) {
            res.data.forEach(element => {
              if (element.W1_target) arrID.push(element.id)
            });
          }
          this.setState({
            listID: arrID,
            dataSource: res.data,
            rowSelect: res.data.length > 0 ? res.data[0] : {}
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  DisplayBtn = () => {
    DisplayBtnInvoiceAction(this.state.initParams)
      .then(res => this.loadData())
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  QueryBtn = (record) => {
    const { identification, office_code, branch_store_code, insurer_number, personal_code } = record;
    if ((identification === 6 && office_code !== '') || identification === 5) {
      this.callModal({
        Li_OfficeCode: office_code,
        Li_BranchCode: branch_store_code,
      }, '60%', 'WS2585001_OfficeInfoInquirySub')
    } else if ((identification === 6 && office_code === '') || identification === 4) {
      this.callModal({ Li_InsurerCode: insurer_number }, '60%', 'WS0339001_InsurerInfoMaintain')
    } else {
      this.callModal({ Li_PersonalNum: personal_code }, '60%', 'WS2584019_PersonalInfoInquirySub')
    }
  }

  MissingOrDeleted = (params) => {
    MissingOrDeletedInvoiceAction(params)
      .then(() => this.loadData())
  }

  OptionsDisplay = () => {
    OptionsDisplayInvoiceAction()
      .then((res) => {
        let dataRes = res?.data;
        if (dataRes?.message.includes('WS1512001')) {
          this.callModal(dataRes.variables, '80%', 'WS1512001_OptionalInfoMaintain')
        }
      })
  }

  Issue_F12 = () => {
    Issue_F12InvoiceAction()
      .then((res) => this.callModal({ Li_SpecifyIssuedByPresence: res.data.Li_SpecifyIssuedByPresence }, 400, 'WS0947001_Invoice'))
  }

  Change = (params) => {
    ChangeInvoiceAction(params)
      .then(() => this.loadData())
  }

  onChangeInitValue = (objChange) => {
    console.log(objChange)
    this.setState({
      initParams: {
        ...this.state.initParams,
        ...objChange,
        ClaimYears: objChange.ClaimYearsChar
          ? moment(objChange.ClaimYearsChar).format('YYYY/MM/DD')
          : this.state.initParams.ClaimYears
      }
    })
  }

  ReturnComponent = (component) => {
    let components = {
      WS2354001_BillingManageLedgerInstruction,
      WS0963001_InvoiceMaintain,
      WS0948001_BillingAggregationProcess,
      WS0947001_Invoice,
      WS0246001_InsurerInfoSearchQuery,
      WS0247001_OfficeInfoRetrievalQuery,
      WS0952001_CounterPayment,
      WS2626028_IntegrationReleased,
      WS2585001_OfficeInfoInquirySub,
      WS2584019_PersonalInfoInquirySub,
      WS0339001_InsurerInfoMaintain,
      WS1512001_OptionalInfoMaintain
    };
    return components[component];
  }

  callModal = (props, width, nameScreen) => {
    let Component = this.ReturnComponent(nameScreen);
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: width,
        component: (
          <Component
            {...props}
            onFinishScreen={(objData) => {
              this.closeModal()
              if (nameScreen === 'WS0247001_OfficeInfoRetrievalQuery') {
                const { Lio_OfficeCode, Lio_BranchStoreCode } = objData;
                this.formRef?.current?.setFieldsValue({
                  OfficeNum: Lio_OfficeCode,
                  BranchStoreCode: Lio_BranchStoreCode === 0 ? null : Lio_BranchStoreCode
                });
                this.onChangeInitValue({
                  OfficeNum: Lio_OfficeCode,
                  BranchStoreCode: Lio_BranchStoreCode === 0 ? null : Lio_BranchStoreCode
                })
              } else if (nameScreen === 'WS0246001_InsurerInfoSearchQuery') {
                const { Lo_InsurerCode } = objData;
                this.formRef?.current?.setFieldsValue({ InsurerNum: Lo_InsurerCode });
                this.onChangeInitValue({ InsurerNum: Lo_InsurerCode })
              }
            }}
          />
        ),
      },
    });
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  renderRightClick = (record) => {
    const {
      delete_flag,
      integrated_destination_manageme,
      integrated_order,
      invoice_number,
      billing_management_number,
      identification,
      W1_billing_manage_num,
      W1_identify
    } = record;
    // IF(delete_flag=0,IF(invoice_number=0,'削除','欠損'),IF(integrated_order=0,'復元',''))
    let eventName3 =
      delete_flag === 0
        ? invoice_number === 0 ? '削除' : '欠損'
        : integrated_order === 0 ? '復元' : '';
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            this.callModal({ Li_BillingManageNum: '' }, '70%', 'WS0963001_InvoiceMaintain')
          }}
        >新規</Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            // NOT( identification=1 OR billing_management_number=2 OR billing_management_number=3)
            !(identification === 1 || billing_management_number === 2 || billing_management_number === 3)
              ? this.callModal({ Li_BillingManageNum: billing_management_number }, '70%', 'WS0963001_InvoiceMaintain')
              : this.callModal({ Li_BillingManageNum: billing_management_number }, '70%', 'WS0952001_CounterPayment')
          }}
        >修正</Menu.Item>
        <Menu.Item
          key="3"
          hidden={!eventName3}
          onClick={() => {
            const params = {
              invoice_number,
              W1_identify,
              W1_billing_manage_num,
              delete_flag
            }
            this.MissingOrDeleted(params)
          }}
        >{eventName3}</Menu.Item>
        {/* IF(delete_flag=0 AND integrated_destination_manageme>0 AND integrated_order=0,'統合解除','') */}
        <Menu.Item
          key="4"
          hidden={!(delete_flag === 0 && integrated_destination_manageme > 0 && integrated_order === 0)}
          onClick={() => {
            this.callModal({ Li_Identify: W1_identify, Li_BillingManageNum: W1_billing_manage_num }, '40%', 'WS2626028_IntegrationReleased')
          }}
        >統合解除</Menu.Item>
      </Menu >
    )
  }

  eventF9 = () => {
    this.callModal(
      {
        Li_MenuOption: '',
        Li_Year: moment(this.state.initParams.ClaimYears).format('YYYY'),
        Li_Month: moment(this.state.initParams.ClaimYears).format('MM')
      },
      600,
      'WS2354001_BillingManageLedgerInstruction'
    )
  }

  eventF10 = () => this.callModal({ Li_BillingManageNum: '' }, '70%', 'WS0963001_InvoiceMaintain')

  eventF11 = () => this.callModal({ Li_Ctxgetname: this.state.initParams.Li_Ctxgetname }, '70%', 'WS0948001_BillingAggregationProcess')

  render() {
    return (
      <div className="invoice">
        <Card title="請求書発行">
          <Form
            ref={this.formRef}
            initialValues={{
              Outstanding: 2,
              Target: 0,
              ClaimIdentify: 0,
              ClaimYearsChar: moment()
            }}>
            <Menubar items={this.state.menuItems} />
            <Row gutter={16} className='mt-3'>
              <Col span={6} style={{ borderRight: '1px solid #C8DCF5' }}>
                <Form.Item name="ClaimYearsChar" label="請求年月" {...grid}>
                  <VenusDatePickerCustom formRefDatePicker={this.formRef}
                    format="YYYY年MM月"
                    picker="month"
                    style={{ width: '120px' }}
                    onChange={(date, dateString) => this.onChangeInitValue({ ClaimYearsChar: dateString })}
                  />
                </Form.Item>
                <Form.Item name="ClaimNum" label="請求番号" {...grid}>
                  <InputNumber
                    maxLength={8}
                    style={{ width: '120px' }}
                    onChange={(value) => this.onChangeInitValue({ ClaimNum: value })}
                  />
                </Form.Item>
                <Form.Item name="Outstanding" label="発　行" {...grid}>
                  <Radio.Group onChange={(e) => this.onChangeInitValue({ Outstanding: e.target.value })}>
                    <Radio value={0}>全て</Radio>
                    <Radio value={1}>済</Radio>
                    <Radio value={2}>未</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="Target" label="形　態" {...grid}>
                  <Radio.Group onChange={(e) => this.onChangeInitValue({ Target: e.target.value })}>
                    <Radio value={0}>有効</Radio>
                    <Radio value={1}>削除</Radio>
                    <Radio value={3}>全て</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="ClaimIdentify" label="請求先" {...grid}>
                  <Select
                    style={{ width: '120px' }}
                    onChange={(option) => this.onChangeInitValue({ ClaimIdentify: option })}
                  >
                    <Select.Option value={0}>全て</Select.Option>
                    <Select.Option value={4}>保険者</Select.Option>
                    <Select.Option value={5}>事業所</Select.Option>
                    <Select.Option value={6}>他団体</Select.Option>
                    <Select.Option value={9}>個人未収</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="InsurerNum" label="保険者" {...grid}>
                  <InputNumber
                    maxLength={10}
                    style={{ width: '120px' }}
                    onChange={(value) => this.onChangeInitValue({ InsurerNum: value })}
                    onDoubleClick={() => this.callModal({
                      Lo_InsurerCode: this.state.initParams.InsurerNum
                    }, '70%', 'WS0246001_InsurerInfoSearchQuery')}
                  />
                </Form.Item>
                <Form.Item label="事業所" {...grid}>
                  <Space>
                    <Form.Item name="OfficeNum">
                      <Input
                        maxLength={8}
                        style={{ width: '120px' }}
                        onChange={(e) => this.onChangeInitValue({ OfficeNum: e.target.value })}
                        onDoubleClick={() => this.callModal({
                          Li_NewlyRegisteredPresence: '',
                          Lio_OfficeCode: this.state.initParams.OfficeNum,
                          Lio_BranchStoreCode: this.state.initParams.BranchStoreCode,
                          Li_1HeadOffice2BranchShop: '',
                        }, '60%', 'WS0247001_OfficeInfoRetrievalQuery')}
                      />
                    </Form.Item>
                    <Form.Item name="BranchStoreCode">
                      <InputNumber
                        maxLength={5}
                        style={{ width: '80px' }}
                        onChange={(value) => this.onChangeInitValue({ BranchStoreCode: value })}
                        onDoubleClick={() => this.callModal({
                          Li_NewlyRegisteredPresence: '',
                          Lio_OfficeCode: this.state.initParams.OfficeNum,
                          Lio_BranchStoreCode: this.state.initParams.BranchStoreCode,
                          Li_1HeadOffice2BranchShop: '',
                        }, '60%', 'WS0247001_OfficeInfoRetrievalQuery')}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name="AddressSearch" label="検　索" {...grid}>
                  <Input maxLength={100} onChange={(e) => this.onChangeInitValue({ AddressSearch: e.target.value })} />
                </Form.Item>
                <Form.Item style={{ textAlign: "right" }}>
                  <Button onClick={this.DisplayBtn} icon={<SearchOutlined />}>検　　索</Button>
                </Form.Item>
                <div className='mt-2 mb-2' style={{ borderBottom: '1px solid #C8DCF5' }}></div>
                <Form.Item style={{ textAlign: "right" }}>
                  <Button type="primary" onClick={() => this.callModal({ Li_SpecifyIssuedByPresence: 1 }, 400, 'WS0947001_Invoice')} >発行</Button>
                </Form.Item>
              </Col>

              <Col span={18}>
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
                  rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
                  rowSelection={{
                    selectedRowKeys: this.state.listID,
                    onChange: (selectedRowKeys, selectedRows) => this.setState({ listID: selectedRowKeys }),
                    onSelect: (record, selected) => this.Change({ id: record.id, change: selected ? 1 : 0 }),
                    onSelectAll: (selected) => this.Change({ change: selected ? 1 : 0 })
                  }}
                  onRow={(record, rowIndex) => ({
                    onClick: event => this.setState({ rowSelect: record }),
                    onDoubleClick: (event) => this.callModal({ Li_BillingManageNum: '' }, '70%', 'WS0963001_InvoiceMaintain'),
                  })}
                >
                  <Table.Column title="請求日" dataIndex="billing_date_on" align='center' render={(text, record) => (
                    <div style={{ color: Color(record.Expresstion_7)?.Foreground }}>
                      {text && moment(text).isValid()
                        ? moment(text).format('YYYY/MM/DD')
                        : null}
                    </div>
                  )} />
                  <Table.Column title="請求先" dataIndex="Expresstion_4" align='center' render={(text, record) => (
                    <Tooltip title={record.Expresstion_13 || ''}>
                      <div style={{
                        padding: '1px 4px',
                        color: Color(record.Expresstion_5)?.Foreground,
                        background: Color(record.Expresstion_5)?.Background
                      }}>{text}</div>
                    </Tooltip>
                  )} />
                  <Table.Column title="請求番号" dataIndex="invoice_number" render={(text, record) => (
                    <div style={{ textAlign: 'right', color: Color(record.Expresstion_7)?.Foreground }}>{text === 0 ? null : text}</div>
                  )} />
                  <Table.Column title="請求発行日" dataIndex="invoice_date_on" render={(text, record) => (
                    <div style={{ color: Color(record.Expresstion_7)?.Foreground }}>
                      {text && moment(text).isValid()
                        ? moment(text).format('YYYY/MM/DD')
                        : null}
                    </div>
                  )} />
                  <Table.Column title="請求金額" dataIndex="billing_price" render={(text, record) => (
                    <div style={{ textAlign: 'right', color: Color(record.Expresstion_7)?.Foreground }}>
                      {text === 0 ? null : text.toLocaleString()}
                    </div>
                  )} />
                  <Table.Column title="コード" dataIndex="CodeOfficesAndInsurers" render={(text, record) => (
                    <div style={{ textAlign: 'right' }}>{text}</div>
                  )} />
                  <Table.Column title="ﾒﾓ" dataIndex="" align='center' render={(text, record) => (
                    <Button size='small' icon={<MoreOutlined />} onClick={() => this.QueryBtn(record)} />
                  )} />
                  <Table.Column title="宛　名" dataIndex="according_to_destination_name" render={(text, record) => (
                    <Tooltip title={record.Expresstion_13 || ''}>
                      <div style={{ color: Color(record.Expresstion_7)?.Foreground }}>{text}</div>
                    </Tooltip>
                  )} />
                  <Table.Column title="形態" dataIndex="State" align='center' render={(text, record) => (
                    <div style={{ color: Color(record.Expresstion_7)?.Foreground }}>{text}</div>
                  )} />
                  <Table.Column title="備考" dataIndex="remarks" render={(text, record) => (
                    <div style={{ color: Color(record.Expresstion_7)?.Foreground }}>{text}</div>
                  )} />
                  <Table.Column width={60} render={(value, record) => (
                    <Dropdown.Button
                      trigger='click'
                      size='small'
                      icon={<MoreOutlined />}
                      overlay={() => this.renderRightClick(record)}
                    ></Dropdown.Button>
                  )}
                  />
                </Table>
              </Col>
            </Row>

          </Form>
        </Card>
        {ModalCustom({
          width: this.state.childModal.width,
          visible: this.state.childModal.visible,
          component: this.state.childModal.component,
          destroyOnClose: false,
          onCancel: this.closeModal
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS2626001_Invoice);
