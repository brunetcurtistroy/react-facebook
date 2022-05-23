import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Row, Col, Table, Input, DatePicker, Form, Modal, Select, Space, Button, InputNumber, Spin, Tooltip, message } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';

import WS0964020_SelectBreakdown from "./WS0964020_SelectBreakdown";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0302001_SetInfoSearch from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0302001_SetInfoSearch";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS0273001_VisitsTargetSearchQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0273001_VisitsTargetSearchQuery";

import moment from "moment-timezone";
import { number_format } from "helpers/CommonHelpers";
import ItemizedAction from "redux/AccountingBusiness/DepositWithdrawalInquiry/Itemized.action";
import  ModalDraggable  from "components/Commons/ModalDraggable";

const grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const gridsm = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
}
class WS0964001_Itemized extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_Identify: PropTypes.any,
    Li_BillingManageNum: PropTypes.any,
    Li_Destination: PropTypes.any,
    Li_Subject: PropTypes.any,
    Li_BillingPeriodBeginning: PropTypes.any,
    Li_BillingPeriodFinal: PropTypes.any,
    Li_Remarks: PropTypes.any,
    Li_AmountBilled: PropTypes.any,
    Li_ProtectionFlag: PropTypes.any,
    Li_DeleteFlag: PropTypes.any,
    Li_IntegrationFlag: PropTypes.any,
    Li_TaxRate: PropTypes.any,
    Li_LessThanTaxCircle: PropTypes.any,
    Li_SpecifyRemarksNumBytes: PropTypes.any,
    Li_TaxClassifyDefault: PropTypes.any,
    Li_SpecifySortButton: PropTypes.any,
    Lo_ScreenEditing: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "明細内訳";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingForm: false,

      isLoadingTable: false,
      dataSource: [],
      selectedRow: {},
      selectedRowKeys: [],
      indexTable: 0,

      dataScreen: {}
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  componentDidMount() {
    this.getScreenData(true)
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getScreenData(true)
    }
  }

  getScreenData(reload) {
    let params = {
      Li_Identify: this.props.Li_Identify,
      Li_BillingManageNum: this.props.Li_BillingManageNum,
      Li_Destination: this.props.Li_Destination,
      Li_Subject: this.props.Li_Subject,
      Li_BillingPeriodBeginning: this.props.Li_BillingPeriodBeginning,
      Li_BillingPeriodFinal: this.props.Li_BillingPeriodFinal,
      Li_Remarks: this.props.Li_Remarks,
      Li_AmountBilled: this.props.Li_AmountBilled,
      Li_ProtectionFlag: this.props.Li_ProtectionFlag,
      Li_DeleteFlag: this.props.Li_DeleteFlag,
      Li_IntegrationFlag: this.props.Li_IntegrationFlag,
      Li_TaxRate: this.props.Li_TaxRate,
      Li_LessThanTaxCircle: this.props.Li_LessThanTaxCircle,
      Li_SpecifyRemarksNumBytes: this.props.Li_SpecifyRemarksNumBytes,
      Li_TaxClassifyDefault: this.props.Li_TaxClassifyDefault,
      Li_SpecifySortButton: this.props.Li_SpecifySortButton,
      Lo_ScreenEditing: this.props.Lo_ScreenEditing,
    }
    this.setState({ isLoadingForm: true })
    ItemizedAction.getScreenData(params)
      .then((res) => {
        let datas = res?.data ? res?.data : {}

        this.formRef.current?.setFieldsValue(datas)

        let index = reload ? 0 : this.state.indexTable

        this.setState({
          dataScreen: datas,

          dataSource: datas.Data?.length > 0 ? datas.Data : [],
          selectedRow: datas.Data?.length > 0 ? datas.Data[index] : {},
          selectedRowKeys: datas.Data?.length > 0 ? [datas.Data[index].id] : [],
          indexTable: index,
          isLoadingForm: false
        })
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }


  eventChangeTaxSect() {
    ItemizedAction.eventChangeTaxSect()
      .then((res) => {

      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  eventExpandBtn() {
    this.setState({ isLoadingTable: true })
    ItemizedAction.eventExpandBtn()
      .then((res) => {

        this.setState({
          isLoadingTable: false
        })
        this.getScreenData(true)
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  eventStoreBtn() {
    this.setState({ isLoadingTable: true })
    ItemizedAction.eventStoreBtn()
      .then((res) => {

        this.setState({
          isLoadingTable: false
        })
        this.getScreenData(true)
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  eventRearrangeBtn() {
    let params = {
      Li_SpecifySortButton: this.props.Li_SpecifySortButton,
      Li_ProtectionFlag: this.props.Li_ProtectionFlag,
      Li_IntegrationFlag: this.props.Li_IntegrationFlag,
    }

    ItemizedAction.eventRearrangeBtn(params)
      .then((res) => {
        this.getScreenData(true)
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  eventSummaryBtn(record) {
    let params = {
      Li_ProtectionFlag: this.props.Li_ProtectionFlag,
      Li_IntegrationFlag: this.props.Li_IntegrationFlag,
      Li_TaxRate: this.props.Li_TaxRate,
      W2_item_sect: record.W2_item_sect,
      Amount1Fixed: record.Amount1Fixed,
      ReferenceNum: record.ReferenceNum,
    }

    ItemizedAction.eventSummaryBtn(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lo_ScreenEditing: true
          })
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  findIndexByID = (recordID) => {
    return this.state.dataSource.findIndex((item) => recordID === item.id);
  };

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.W2_item_sequential_num);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkDisabledBtnAdd() {
    if (Object.keys(this.state.selectedRow).length > 0) {
      if (this.checkAddItem() || this.checkIdTemp(this.state.selectedRow.id)) {
        return true;
      } return false;
    } return false;
  }

  changeRow(record) {
    let data = [...this.state.dataSource]

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      this.setState({
        selectedRow: data[0],
        selectedRowKeys: [data[0].id],
        indexTable: 0
      });
    } else {
      let index = this.findIndexByID(record.id)
      this.setState({
        selectedRow: data[index],
        selectedRowKeys: [data[index].id],
        indexTable: index
      });
    }
  }

  // add new record
  async handleAddRowTable() {
    let newRow = {
      id: '',
      W2_item_sect: 1,
      W2_tax_sect: 1,
      W2_price_excluding_tax: 0,
      W2_include_tax_price: 0,
      W2_tax: 0,
      W2_person: 0,
      W2_total_price: 0,
    };

    let data = [...this.state.dataSource];

    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      selectedRow: newRow,
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });

    this.forceUpdate();
  }

  async handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    await data.splice(0, 1);
    await this.setState({
      dataSource: data,
      indexTable: 0,
      selectedRow: data.length > 0 ? data[0] : {},
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
    });
  }

  changeScreenEditting(Lo_ScreenEditing) {
    let data = {
      ...this.state.dataScreen,
      ScreenEditing: Lo_ScreenEditing
    }

    this.setState({
      dataScreen: data
    })
  }

  changeExcluding(value) {

  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    const { Li_DeleteFlag, Li_IntegrationFlag, Li_ProtectionFlag, Li_SpecifySortButton } = this.props
    return (
      <div className="itemized">
        <Card title="明細内訳">
          <Spin spinning={this.state.isLoadingForm}>
            <Form ref={this.formRef}
              onFinish={this.onFinish}
              {...grid}
            >
              <Row gutter={24}>
                <Col style={{ paddingRight: "5px", width: 440 }}>
                  <Card style={{ height: "100%", border: "1px solid #92c4f3bf", boxShadow: 'none' }}>
                    <Form.Item label="請求管理番号">
                      <Row>
                        <Form.Item name="Li_BillingManageNum" style={{ width: 125, marginRight: 15 }}>
                          <div style={{ textAlign: 'right' }}>
                            {this.state.dataScreen.Li_BillingManageNum}
                          </div>
                        </Form.Item>
                        <Form.Item name="Expression_21" style={{ width: 60, marginRight: 2 }}>
                          <Input type="text" readOnly style={{ textAlign: 'center' }} />
                        </Form.Item>
                        <Form.Item name="Expression_22" style={{ width: 60 }}
                          hidden={!(Li_DeleteFlag == 1 || Li_DeleteFlag == 2 || Li_IntegrationFlag == 1)}
                        >
                          <Input type="text" readOnly style={{ textAlign: 'center' }} />
                        </Form.Item>
                      </Row>
                    </Form.Item>

                    <Form.Item label="請求期間">
                      <Row>
                        <Form.Item name="Li_BillingPeriodBeginning">
                          <div style={{ textAlign: 'right', width: 90 }}>
                            {this.state.dataScreen.Li_BillingPeriodBeginning && this.state.dataScreen.Li_BillingPeriodBeginning != '0000-00-00' ? moment(this.state.dataScreen.Li_BillingPeriodBeginning).format('YYYY/MM/DD') : ''}
                          </div>
                        </Form.Item>
                        <Form.Item style={{ padding: '0 5px' }}>
                          <span>~</span>
                        </Form.Item>
                        <Form.Item name="Li_BillingPeriodFinal">
                          <div style={{ width: 90 }}>
                            {this.state.dataScreen.Li_BillingPeriodFinal && this.state.dataScreen.Li_BillingPeriodFinal != '0000-00-00' ? moment(this.state.dataScreen.Li_BillingPeriodFinal).format('YYYY/MM/DD') : ''}
                          </div>
                        </Form.Item>
                      </Row>
                    </Form.Item>

                    <Form.Item name="Li_AmountBilled" label="請求金額" >
                      <div style={{ textAlign: 'right', width: 90 }}>
                        {this.state.dataScreen.Li_AmountBilled > 0 ? number_format(this.state.dataScreen.Li_AmountBilled) : ''}
                      </div>
                    </Form.Item>
                  </Card>
                </Col>
                <Col style={{ paddingLeft: 0, width: 'calc(100% - 440px)' }}>
                  <Card style={{ height: "100%", border: "1px solid #92c4f3bf", boxShadow: 'none' }}>
                    <Form.Item name="Li_Destination" label="宛名" {...gridsm}>
                      <div >
                        {this.state.dataScreen.Li_Destination}
                      </div>
                    </Form.Item>
                    <Form.Item name="Li_Subject" label="件名" {...gridsm}>
                      <div >
                        {this.state.dataScreen.Li_Subject}
                      </div>
                    </Form.Item>
                    <Form.Item name="Li_Remarks" label="備考" {...gridsm}>
                      <div >
                        {this.state.dataScreen.Li_Remarks}
                      </div>
                    </Form.Item>
                  </Card>
                </Col>
              </Row>
              <br />
              <Table
                size='small'
                style={{ cursor: 'pointer' }}
                rowClassName={(record, index) => record.id === this.state.selectedRow.id ? 'table-row-light' : ''}
                dataSource={this.state.dataSource}
                loading={this.state.isLoadingTable}
                pagination={false}
                bordered
                rowKey={(record) => record.id}
                scroll={{ x: 1180, y: 500 }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      this.changeRow(record)
                    }
                  };
                }}
              >
                <Table.Column dataIndex="Expression_121" width={30} align='center'
                  render={(value, record) => {
                    return (
                      <div hidden={record.W2_item_sect != 0 && record.W2_item_sect != 10}>
                        <Button size='small'
                          onClick={() => {
                            if (record.row?.W2_expansion) {
                              this.eventStoreBtn()
                            } else {
                              this.eventExpandBtn()
                            }
                          }}
                        >{value}</Button>
                      </div>
                    )
                  }} />
                <Table.Column title="連番" dataIndex="W2_item_sequential_num" width={60}
                  render={(value, record) => {
                    return (
                      <div style={{ textAlign: 'right' }}>
                        <Tooltip title={record.Expression_122}>
                          {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                            <InputNumber autoFocus ref={(input) => { this.name_sequential_num = input; }}
                              value={record.W2_item_sequential_num} maxLength={4} min={0}
                              onChange={(value) => {
                                this.updateDatasource(this.findIndexByID(record.id), 'W2_item_sequential_num', value)
                                this.changeScreenEditting(true)
                              }}

                              onBlur={(value) => {
                                if (record.W2_item_sequential_num < 10) {
                                  Modal.error({
                                    width: 300,
                                    title: '使用できない番号です',
                                    onOk: () => {
                                      this.name_sequential_num.focus();
                                    }
                                  })
                                }
                              }}
                            />
                            :
                            <span style={{ paddingRight: 7 }}>{value}</span>
                          }
                        </Tooltip>
                      </div>
                    );
                  }}
                />
                <Table.Column title="区分" dataIndex="W2_item_sect" width={105}
                  render={(value, record) => {
                    return (
                      <div>
                        <Tooltip title={record.Expression_122}>
                          {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                            <Select value={record.W2_item_sect} style={{ width: "100%" }}
                              onChange={(value) => {
                                this.updateDatasource(this.findIndexByID(record.id), 'W2_item_sect', value)
                                this.changeScreenEditting(true)
                              }}
                            >
                              <Select.Option value={0}>ｺﾒﾝﾄ区切</Select.Option>
                              <Select.Option value={1}>セット</Select.Option>
                              <Select.Option value={3}>コース</Select.Option>
                              <Select.Option value={5}>コメント</Select.Option>
                              <Select.Option value={7}>明細無効</Select.Option>
                              <Select.Option value={9}>無効</Select.Option>
                              <Select.Option value={10}>区切</Select.Option>
                            </Select>
                            :
                            <span style={{ paddingLeft: 7 }}>
                              {value == 0 ? 'ｺﾒﾝﾄ区切'
                                : value == 1 ? 'セット'
                                  : value == 3 ? 'コース'
                                    : value == 5 ? 'コメント'
                                      : value == 7 ? '明細無効'
                                        : value == 9 ? '無効'
                                          : value == 10 ? '区切' : ''
                              }</span>
                          }
                        </Tooltip>
                      </div>
                    );
                  }}
                />
                <Table.Column title="内容"
                  render={(value, record) => {
                    return (
                      <div style={{ height: 53 }}>
                        <Tooltip title={record.Expression_14}>
                          {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                            <Input value={record.W2_content} maxLength={100}
                              onChange={(e) => {
                                this.updateDatasource(this.findIndexByID(record.id), 'W2_content', e.target.value)
                              }}
                              onDoubleClick={() => {
                                switch (record.W2_item_sect) {
                                  case 0:
                                  case 10:
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: "60%",
                                        component: (
                                          <WS0247001_OfficeInfoRetrievalQuery
                                            onFinishScreen={(output) => {
                                              this.formRef.current?.setFieldsValue({
                                                W2_content: output.Lo_Kanji_Name
                                              });

                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    });
                                    break;
                                  case 1:
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: 1000,
                                        component: (
                                          <WS0302001_SetInfoSearch
                                            onFinishScreen={(output) => {
                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    });
                                    break;
                                  case 3:
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: "60%",
                                        component: (
                                          <WS0265001_BasicCourseInquiry
                                            onFinishScreen={(output) => {
                                              this.formRef.current?.setFieldsValue({
                                                W2_content: output.Lo_CourseName
                                              });

                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    });
                                    break;
                                  default:
                                    break;
                                }
                              }}
                            />
                            :
                            <div style={{ paddingLeft: 7 }}>{record.W2_content}</div>
                          }
                        </Tooltip>

                        <div style={{ float: 'right', marginTop: 2 }}
                          hidden={record.W2_item_sect == 0 || record.W2_item_sect == 5 || record.W2_item_sect == 10}
                        >
                          <Row>
                            <div style={{ width: record.W2_item_sect == 3 ? 138 : 105 }}>
                              <Tooltip title={record.Expression_15}>
                                {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                                  <Row>
                                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'
                                      style={{ width: 103, height: 24, padding: '0 3px' }}
                                      defaultValue={moment(record.W2_consult_date_char)}
                                      onChange={(value) => {
                                        this.updateDatasource(this.findIndexByID(record.id), 'W2_consult_date_char', value?.format('YYYY/MM/DD'))
                                        this.changeScreenEditting(true)
                                      }}
                                    />
                                    <Button style={{ width: 25, paddingLeft: 5, borderLeft: 'none' }}
                                      hidden={record.W2_item_sect != 3}
                                      onClick={() => {
                                        this.setState({
                                          onClickDate: false,
                                          childModal: {
                                            ...this.state.childModal,
                                            visible: true,
                                            width: "70%",
                                            component: (
                                              <WS0273001_VisitsTargetSearchQuery
                                                onFinishScreen={(output) => {
                                                  let index = this.findIndexByID(record.id)
                                                  let recordData = output.recordData
                                                  if (output.LnkOutReserveNum > 0) {
                                                    this.updateDatasource(index, 'W2_course_cd', recordData?.visit_course)
                                                    this.updateDatasource(index, 'W2_content', record.StsTermsAndConditionInfo ? recordData.contract_short_name : recordData.contract_short_name) // ? contract_short_name : cource_name_short_name
                                                    this.updateDatasource(index, 'W2_person_num', recordData?.personal_number_id)
                                                    this.updateDatasource(index, 'W2_full_name', recordData?.Expression_17)
                                                    this.updateDatasource(index, 'W2_consult_date', recordData?.visit_date_on ? moment(recordData?.visit_date_on).format("YYYY/MM/DD") : '')
                                                    this.updateDatasource(index, 'W2_consult_date_char', recordData?.visit_date_on ? moment(recordData?.visit_date_on).format("YYYY/MM/DD") : '')
                                                    this.updateDatasource(index, 'W2_reserve_num', recordData?.reservation_number)
                                                    this.updateDatasource(index, 'W2_office_cd', recordData?.W2_office_cd)
                                                    this.updateDatasource(index, 'W2_branch_store_cd', recordData?.W2_branch_store_cd)
                                                    this.changeScreenEditting(true)
                                                  }

                                                  this.closeModal();
                                                }}
                                              />
                                            ),
                                          },
                                        });
                                      }}
                                    >{<SearchOutlined />}</Button>
                                  </Row>
                                  :
                                  <span style={{ paddingLeft: 7 }}>{record.W2_consult_date_char}</span>
                                }
                              </Tooltip>
                            </div>
                            <div style={{ width: 200 }}>
                              <Tooltip title={record.Expression_16}>
                                {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                                  <Input value={record.W2_full_name}
                                    onChange={(e) => {
                                      this.updateDatasource(this.findIndexByID(record.id), 'W2_full_name', e.target.value)
                                      this.changeScreenEditting(true)
                                    }}
                                    onDoubleClick={() => {
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: true,
                                          width: "90%",
                                          component: (
                                            <WS0248001_PersonalInfoSearchQuery
                                              onFinishScreen={(output) => {
                                                this.updateDatasource(this.findIndexByID(record.id), 'W2_full_name', output.recordData.kanji_name)
                                                this.changeScreenEditting(true)

                                                this.closeModal();
                                              }}
                                            />
                                          ),
                                        },
                                      });
                                    }}
                                  />
                                  :
                                  <span style={{ paddingLeft: 7 }}>{record.W2_full_name}</span>
                                }
                              </Tooltip>
                            </div>
                          </Row>
                        </div>
                      </div>
                    );
                  }}
                />
                <Table.Column title="税区分" dataIndex='W2_tax_sect' width={85}
                  render={(value, record) => {
                    return (
                      <div hidden={record.W2_item_sect == 0 || record.W2_item_sect == 5 || record.W2_item_sect == 10}>
                        {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && record.row?.W2_single_item_cd_not_used != 86 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                          <Select
                            value={record.W2_tax_sect}
                            style={{ width: "100%" }}
                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(record.id), 'W2_tax_sect', value)
                              this.changeScreenEditting(true)
                            }}
                          >
                            <Select.Option value={0}>税指定</Select.Option>
                            <Select.Option value={1}>外税</Select.Option>
                            <Select.Option value={2}>内税</Select.Option>
                            <Select.Option value={3}>非課税</Select.Option>
                          </Select>
                          :
                          <span style={{ paddingLeft: 7 }}>
                            {value == 0 ? '税指定'
                              : value == 1 ? '外税'
                                : value == 2 ? '内税'
                                  : value == 3 ? '非課税' : ''
                            }</span>
                        }
                      </div>
                    );
                  }}
                />
                <Table.Column title="金額" width={100}
                  render={(value, record) => {
                    let conditon_tax = !(record.W2_item_sect == 0 || record.W2_item_sect == 5 || record.W2_item_sect == 10)
                    let conditon_excluding = record.W2_tax_sect != 2 && conditon_tax
                    let conditon_include = record.W2_tax_sect == 2 && conditon_tax
                    return (
                      <div style={{ height: 53 }}>
                        <div hidden={!conditon_excluding}
                          style={{ textAlign: 'right', marginBottom: 3 }}>
                          <Tooltip title={record.Expression_17}>
                            {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                              <InputNumber value={record.W2_price_excluding_tax} maxLength={10}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                onChange={(value) => {
                                  this.updateDatasource(this.findIndexByID(record.id), 'W2_price_excluding_tax', value)
                                  this.changeScreenEditting(true)
                                }}
                              />
                              :
                              <div style={{ paddingRight: 7 }}>
                                {number_format(record.W2_price_excluding_tax)}
                              </div>
                            }
                          </Tooltip>
                        </div>

                        <div hidden={!conditon_include}
                          style={{ textAlign: 'right', marginBottom: 3 }}>
                          {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                            <InputNumber value={record.W2_include_tax_price} maxLength={10}
                              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              onChange={(value) => {
                                this.updateDatasource(this.findIndexByID(record.id), 'W2_include_tax_price', value)
                                this.changeScreenEditting(true)
                              }}
                            />
                            :
                            <div style={{ paddingRight: 7 }}>
                              {number_format(record.W2_include_tax_price)}
                            </div>
                          }
                        </div>

                        <div hidden={!conditon_tax}
                          style={{ textAlign: 'right' }}>
                          {((this.state.indexTable == this.findIndexByID(record.id)) && (Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && record.W2_tax_sect == 0 && conditon_tax)) ?
                            <InputNumber value={record.W2_tax} maxLength={10}
                              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              onChange={(value) => {
                                let include_tax_price = record.W2_price_excluding_tax + value
                                this.updateDatasource(this.findIndexByID(record.id), 'W2_tax', value)
                                this.updateDatasource(this.findIndexByID(record.id), 'W2_include_tax_price', include_tax_price)

                                if (include_tax_price != 0) {
                                  if (record.W2_person == 0) {
                                    this.updateDatasource(this.findIndexByID(record.id), 'W2_person', 1)
                                  } else {
                                    this.updateDatasource(this.findIndexByID(record.id), 'W2_total_price', include_tax_price * record.W2_person)
                                  }
                                }

                                this.changeScreenEditting(true)
                              }}
                            />
                            :
                            <div style={{ paddingRight: 7 }}>
                              ({number_format(record.W2_tax)})
                            </div>
                          }
                        </div>
                      </div>
                    );
                  }}
                />
                <Table.Column title="人数" dataIndex="W2_person" width={65}
                  render={(value, record) => {
                    return (
                      <div hidden={record.W2_item_sect == 0 || record.W2_item_sect == 5 || record.W2_item_sect == 10}
                        style={{ textAlign: 'right' }}>
                        {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                          <InputNumber value={record.W2_person} maxLength={5} min={0}
                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(record.id), 'W2_person', value)
                              this.changeScreenEditting(true)

                              if (record.row.W2_single_item_cd_not_used == 86) {
                                if (record.W2_person <= record.ReferenceNum) {
                                  this.updateDatasource(this.findIndexByID(record.id), 'W2_total_price', record.Amount1Fixed)
                                } else {
                                  this.updateDatasource(this.findIndexByID(record.id), 'W2_total_price', record.W2_include_tax_price * value)
                                }
                              } else {
                                this.updateDatasource(this.findIndexByID(record.id), 'W2_total_price', record.W2_include_tax_price * value)
                              }
                            }}
                          />
                          :
                          <div style={{ paddingRight: 7 }}>
                            {record.W2_person}
                          </div>
                        }
                      </div>
                    );
                  }}
                />
                <Table.Column title="合計額" dataIndex="W2_total_price" width={100}
                  render={(value, record) => {
                    return (
                      <div hidden={record.W2_item_sect == 0 || record.W2_item_sect == 5 || record.W2_item_sect == 10}
                        style={{ textAlign: 'right' }}>
                        {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                          <InputNumber value={record.W2_total_price} maxLength={10}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            onChange={(value) => {
                              this.updateDatasource(this.findIndexByID(record.id), 'W2_total_price', value)
                              this.changeScreenEditting(true)
                            }}
                          />
                          :
                          <div style={{ paddingRight: 7 }}>
                            {number_format(record.W2_total_price)}
                          </div>
                        }
                      </div>
                    );
                  }}
                />

                <Table.Column title="備考" dataIndex="W2_remark" width={200}
                  render={(value, record) => {
                    return (
                      <div hidden={record.W2_item_sect == 0 || record.W2_item_sect == 5 || record.W2_item_sect == 10}>
                        {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0 && (this.state.indexTable == this.findIndexByID(record.id))) ?
                          <Input.TextArea rows={2} defaultValue={record.W2_remark} maxLength={100}
                            onChange={(e) => {
                              this.updateDatasource(this.findIndexByID(record.id), 'W2_remark', e.target.value)
                              this.changeScreenEditting(true)
                            }}
                          />
                          :
                          <div style={{ paddingLeft: 7 }}>
                            {record.W2_remark}
                          </div>
                        }
                      </div>
                    );
                  }}
                />

                {(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0) ?
                  <Table.Column width={70} align='center' fixed='right'
                    title={
                      <Button
                        disabled={this.checkDisabledBtnAdd()}
                        onClick={this.handleAddRowTable}
                        type="primary"
                        icon={<PlusOutlined />}>
                      </Button>
                    }
                    render={(text, record, index) => {
                      return <div>
                        <Button size='small'
                          hidden={this.state.indexTable !== this.findIndexByID(record.id) || this.checkAddItem()}
                          onClick={() => { this.updateRecordData(this.findIndexByID(record.id)) }}
                          style={{ marginRight: '5px', color: 'green' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small'
                          hidden={this.state.indexTable !== this.findIndexByID(record.id)}
                          onClick={() => { this.checkIdTemp(record.id) ? this.handleDeleteRowTable() : this.deleteData(record.id) }}
                          style={{ color: 'red' }}
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </div>
                    }}
                  />
                  : ''
                }

              </Table>
            </Form>

            <br></br>
            <Space style={{ float: "right" }}>
              <Button type="primary"
                style={{ width: 50 }}
                onClick={() => {
                  this.eventExpandBtn()
                }}>
                展開
              </Button>

              <Button type="primary"
                style={{ width: 50 }}
                onClick={() => {
                  this.eventStoreBtn()
                }}>
                縮小
              </Button>

              <Button type="primary"
                style={{ width: 50 }}
                disabled={!(Li_SpecifySortButton && Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0)}
                onClick={() => {
                  this.eventRearrangeBtn()
                }}>
                {Li_SpecifySortButton ? '並替' : '\n'}
              </Button>

              <Button
                type="primary"
                style={{ width: 50 }}
                onClick={() => {
                  let dataRecord = this.state.selectedRow?.row
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "80%",
                      component: (
                        <WS0964020_SelectBreakdown
                          Li_Identify={this.props.Li_Identify}
                          Li_TaxRate={this.props.Li_TaxRate}
                          Li_LessThanTaxCircle={this.props.Li_LessThanTaxCircle}
                          Lio_SpecifyClassify={dataRecord?.W2_item_sect}
                          Lio_Content={dataRecord?.W2_content}
                          Lio_SetCode={dataRecord?.W2_set_cd}
                          Lio_CourseCode={dataRecord?.W2_course_cd}
                          Lio_SingleItemCodeNotUsed={dataRecord?.W2_single_item_cd_not_used}
                          Lio_Date={dataRecord?.W2_consult_date}
                          Lio_PersonalNum={dataRecord?.W2_person_num}
                          Lio_Name={dataRecord?.W2_full_name}
                          Lio_TaxClassify={dataRecord?.W2_tax_sect}
                          Lio_Tax_ExcludedAmount={dataRecord?.W2_price_excluding_tax}
                          Lio_Tax_IncludedAmount={dataRecord?.W2_include_tax_price}
                          Lio_Tax={dataRecord?.W2_tax}
                          Lio_PeopleNum={dataRecord?.W2_person}
                          Lio_TotalAmount={dataRecord?.W2_total_price}
                          Lio_Remarks={dataRecord?.W2_remark}
                          Lio_DateChar={dataRecord?.W2_consult_date_char}
                          Lio_ReserveNum={dataRecord?.W2_reserve_num}
                          Lio_ContractType={dataRecord?.W2_contract_type}
                          Lio_ContractOrgCode={dataRecord?.W2_contract_org_cd}
                          Lio_ContractStartDate={dataRecord?.W2_contract_start_date}
                          Lio_ContractNum={dataRecord?.W2_contract_num}
                          Lio_OfficeCode={dataRecord?.W2_office_cd}
                          Lio_BranchStoreCode={dataRecord?.W2_branch_store_cd}
                          Li_Amount1Fixed={this.state.selectedRow.Amount1Fixed}
                          Li_ReferenceNum={this.state.selectedRow.ReferenceNum}
                          Li_StsSubjectsQuery={this.state.selectedRow.StsSubjectsQuery}
                          onFinishScreen={() => {
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
                  });
                }}
              >
                明細
              </Button>
              <Button type="primary"
                style={{ width: 50 }}
                disabled={!(Li_ProtectionFlag == 0 && Li_IntegrationFlag == 0)}
                onClick={() => { this.eventSummaryBtn(this.state.selectedRow) }}>
                集計
              </Button>
            </Space>
          </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0964001_Itemized);
