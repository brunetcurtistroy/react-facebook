/* eslint-disable eqeqeq */
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Table, Row, Col, DatePicker, Modal, Dropdown, Menu, InputNumber, message } from "antd";
import { SearchOutlined, MoreOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ModalDraggable from "components/Commons/ModalDraggable";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import WS0963001_InvoiceMaintain from "./WS0963001_InvoiceMaintain";
import WS2630001_OrganizationsPayment from "../V5BL0002000_OrganizationsPayment/WS2630001_OrganizationsPayment";
import WS2620001_Counter from "pages/UK_CounterBusiness/V5UK0001000_Counter/WS2620001_Counter";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import DepositWithdrawalInquiryAction from "redux/AccountingBusiness/DepositWithdrawalInquiry/DepositWithdrawalInquiry.action";

import moment from "moment";
import Color from "constants/Color";
import { number_format } from "helpers/CommonHelpers";

import SetInfoBatchProcessAction from "redux/basicInfo/SetInfoMaintain/SetInfoBatchProcess.action";
import ResultTblBatchCreateAction from "redux/ResultOutput/ResultsTblCollectOutput/ResultTblBatchCreate.action";
import PersonalReserveProcessAction from "redux/ReservationBusiness/PersonalReserveProcess/PersonalReserveProcess.action";
import axios from "axios";

class WS0977001_DepositWithdrawalInquiry extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "??????????????????";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: true,
      stateIdentify: null,

      Code: '',
      Expression_50: ''
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.onSearch(this.formRef.current.getFieldValue());
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onSearch = (values) => {
    let data = {
      DepositWithdrawalPeriodAStart: values.DepositWithdrawalPeriodAStart?.format("YYYY/MM/DD"),
      DepositWithdrawalPeriodAFinal: values.DepositWithdrawalPeriodAFinal?.format("YYYY/MM/DD"),
      ReceiptAndPayClassify: values.ReceiptAndPayClassify,
      Target: values.Target,
      PayTotalAmount: values.PayTotalAmount,
      RegisterClassify: values.RegisterClassify,
      Identify: values.Identify,
      Code: values.Code,
    };

    this.setState({ isLoadingTable: true });
    DepositWithdrawalInquiryAction.getDataOnSearch(data).then((res) => {
      this.setState({
        dataSource: res ? res.QueryResultsDisplay : [],
        isLoadingTable: false
      });

      if (res) {
        this.formRef.current.setFieldsValue({
          PayTotalAmount: res?.Total?.PayTotalAmount === 0 ? '' : number_format(res?.Total?.PayTotalAmount),
          PayNum: res?.Total?.PayNum === 0 ? '' : res?.Total?.PayNum + '???',
          WithdrawalTotalAmount: res?.Total?.WithdrawalTotalAmount === 0 ? '' : number_format(res?.Total?.WithdrawalTotalAmount),
          WithdrawalNum: res?.Total?.WithdrawalNum === 0 ? '' : res?.Total?.WithdrawalNum + '???',
          FeesSum: res?.Total?.FeesSum === 0 ? '' : number_format(res?.Total?.FeesSum),
          CommissionNum: res?.Total?.CommissionNum === 0 ? '' : res?.Total?.CommissionNum + '???',
          InputAndAmountSum: res?.Total?.InputAndAmountSum === 0 ? '' : number_format(res?.Total?.InputAndAmountSum)
        })
      }
    });
  };

  onFinish(values) {
    this.onSearch(values);
  }

  gzoomCode() {
    let component = null
    switch (this.state.stateIdentify) {
      case 1:
      case 9:
        component = (<WS0248001_PersonalInfoSearchQuery
          onFinishScreen={(output) => {
            this.formRef.current.setFieldsValue({
              Code: output.Lo_PersonalNumId,
              Expression_50: output.recordData.kanji_name,
            });
            this.setState({
              Code: output.Lo_PersonalNumId,
              Expression_50: output.recordData.kanji_name,
            })
            this.closeModal();
          }}
        />)
        break;
      case 4:
        component = (<WS0246001_InsurerInfoSearchQuery
          onFinishScreen={(output) => {
            this.formRef.current.setFieldsValue({
              Code: output.Lo_InsurerCode,
              Expression_50: output.Lo_Name,
            });
            this.setState({
              Code: output.Lo_InsurerCode,
              Expression_50: output.Lo_Name,
            })
            this.closeModal();
          }}
        />)
        break;
      case 5:
        component = (<WS0247001_OfficeInfoRetrievalQuery
          onFinishScreen={(output) => {
            this.formRef.current.setFieldsValue({
              Code: output.Lio_OfficeCode,
              Expression_50: output.Lo_Kanji_Name,
            });
            this.setState({
              Code: output.Lio_OfficeCode,
              Expression_50: output.Lo_Kanji_Name,
            })
            this.closeModal();
          }}
        />)
        break;
      default:
        break;
    }

    return component
  }

  GetNameInsurerCode() {
    let params = {
      insurer_code: this.formRef.current?.getFieldValue('Code')
    }
    axios.get('/api/insurer-info-maintain/insurer-info-maintain', { params })
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          Expression_50: res?.data?.insurer_kanji_name
        })

        this.setState({
          Expression_50: res?.data?.insurer_kanji_name,
        })
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("??????????????????????????????");
          return;
        }
        message.error(res.data.message);
      });
  }

  getNameOffice() {
    let params = {
      GofficeCd: this.formRef.current?.getFieldValue('Code'),
    }
    ResultTblBatchCreateAction.getNameOffice(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          Expression_50: res?.data?.office_kanji_name
        })

        this.setState({
          Expression_50: res?.data?.office_kanji_name,
        })
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("??????????????????????????????");
          return;
        }
        message.error(res.data.message);
      });
  }

  getInfoPersonal() {
    let params = {
      PersonalNumId: this.formRef.current?.getFieldValue('Code'),
    }

    PersonalReserveProcessAction.getInfoPersonal(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          Expression_50: res?.data?.Expression_76
        })

        this.setState({
          Expression_50: res?.data?.Expression_76,
        })
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("??????????????????????????????");
          return;
        }
        message.error(res.data.message);
      });
  }

  getNameCode() {
    switch (this.state.stateIdentify) {
      case 1:
      case 9:
        this.getInfoPersonal()
        break;
      case 4:
        this.GetNameInsurerCode()
        break;
      case 5:
        this.getNameOffice()
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="deposit-withdrawal-inquiry">
        <Card title="??????????????????">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              DepositWithdrawalPeriodAStart: moment(new Date()),
              DepositWithdrawalPeriodAFinal: moment(new Date()),
              Target: 0,
              ReceiptAndPayClassify: 0
            }}
          >
            <Row>
              <div style={{ width: 500, padding: 10, border: '1px solid #b3d0ea' }}>
                <Form.Item label="?????????">
                  <Row gutter={24}>
                    <Col span={15} style={{ display: "flex" }}>
                      <Form.Item name="DepositWithdrawalPeriodAStart">
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={false} style={{ width: 112 }} />
                      </Form.Item>
                      <span style={{ margin: '0 5px' }}>~</span>
                      <Form.Item name="DepositWithdrawalPeriodAFinal">
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={false} style={{ width: 112 }} />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item name="RegisterClassify" label="????????????">
                        <InputNumber min={0} maxLength={1} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="?????????">
                  <Row gutter={24}>
                    <Col span={24} style={{ display: "flex" }}>
                      <Form.Item name="ReceiptAndPayClassify" style={{ marginRight: 15 }}>
                        <Select style={{ width: 112 }}>
                          <Select.Option value={0}>??????</Select.Option>
                          <Select.Option value={1}>??????</Select.Option>
                          <Select.Option value={2}>??????</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="Target" label="??????">
                        <Select style={{ width: 78 }}>
                          <Select.Option value={0}>??????</Select.Option>
                          <Select.Option value={1}>??????</Select.Option>
                          <Select.Option value={9}>??????</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                </Form.Item>
                <Form.Item label="?????????">
                  <Row gutter={24}>
                    <Col span={24} style={{ display: "flex" }}>
                      <Form.Item name="Identify" style={{ marginRight: 3 }}>
                        <Select style={{ width: 112 }}
                          onChange={(value) => {
                            this.setState({ stateIdentify: value })
                            this.formRef.current.setFieldsValue({
                              Code: '',
                              Expression_50: '',
                            });
                            this.setState({
                              Code: '',
                              Expression_50: '',
                            })
                          }}
                        >
                          <Select.Option value={0}> </Select.Option>
                          <Select.Option value={1}>??????</Select.Option>
                          <Select.Option value={4}>?????????</Select.Option>
                          <Select.Option value={5}>?????????</Select.Option>
                          <Select.Option value={6}>?????????</Select.Option>
                          <Select.Option value={9}>????????????</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="Code" style={{ marginRight: 3 }}
                        hidden={
                          this.state.stateIdentify === 0 ||
                          this.state.stateIdentify === 6 ||
                          !this.state.stateIdentify
                        }
                      >
                        <Input style={{ width: 80, textAlign: "right" }}
                          type="text" maxLength={10}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "90%",
                                component: this.gzoomCode(),
                              },
                            });
                          }}

                          onBlur={(e) => {
                            let val = e.target.value
                            if (this.state.Code != val) {
                              this.setState({
                                Code: val,
                              }) 
                            if (val) {
                              this.getNameCode()
                            } else {
                              this.formRef.current?.setFieldsValue({
                                Expression_50: ''
                              })

                              this.setState({
                                Expression_50: '',
                              })
                            }
                          }
                          }}
                        />
                      </Form.Item>
                      <Form.Item name="Expression_50">
                        <span>{this.state.Expression_50}</span>
                      </Form.Item>
                    </Col>
                  </Row>

                </Form.Item>
                <Button
                  icon={<SearchOutlined />}
                  htmlType="submit"
                  style={{ float: "right", color: '#14468c', borderColor: '#76a6ea' }}
                >
                  ????????????
                </Button>
              </div>

              <div style={{ width: 'calc(100% - 500px)', padding: 10 }}>
                <div style={{ width: 285, float: 'right' }}>
                  <Form.Item label='???????????????'>
                    <Row >
                      <Form.Item name="PayTotalAmount" style={{ paddingRight: "5px", width: 100 }} >
                        <InputNumber readOnly />
                      </Form.Item>
                      <Form.Item name="PayNum" style={{ width: 80 }}>
                        <InputNumber readOnly />
                      </Form.Item>
                    </Row>
                  </Form.Item>
                  <Form.Item label='???????????????'>
                    <Row>
                      <Form.Item name="WithdrawalTotalAmount"
                        style={{ paddingRight: "5px", width: 100 }}>
                        <InputNumber readOnly />
                      </Form.Item>
                      <Form.Item name="WithdrawalNum" style={{ width: 80 }}>
                        <InputNumber readOnly />
                      </Form.Item>
                    </Row>

                  </Form.Item>
                  <Form.Item label='???????????????'>
                    <Row>
                      <Form.Item name="FeesSum" style={{ paddingRight: "5px", width: 100 }}>
                        <InputNumber readOnly />
                      </Form.Item>
                      <Form.Item name="CommissionNum" style={{ width: 80 }}>
                        <InputNumber readOnly />
                      </Form.Item>
                    </Row>

                  </Form.Item>
                  <Form.Item label='???????????????'>
                    <Row>
                      <Form.Item name="InputAndAmountSum" style={{ paddingRight: "5px", width: 100 }}>
                        <InputNumber readOnly />
                      </Form.Item>
                    </Row>
                  </Form.Item>
                </div>
              </div>
            </Row>
            <br></br>

            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={true}
              bordered={true}
              rowKey={(record) => record.id}
              scroll={{ x: 1500 }}
            >
              <Table.Column title="??????" dataIndex="Expression_5" width={50} align='center'
                render={(value, record, index) => {
                  return (
                    <div style={{ color: Color(record.Expression_6)?.Foreground }} >
                      {value}
                    </div>
                  )
                }} />
              <Table.Column title="?????????" dataIndex="W1_payment_day" width={90}
                render={(value, record, index) => {
                  return (
                    <div>{value === '0000-00-00' ? '' : value.replaceAll('-', '/')}</div>
                  )
                }}
              />
              <Table.Column title="????????????" dataIndex="Expression_15" width={90}
                render={(value, record, index) => {
                  return (
                    <div style={{
                      textAlign: 'right',
                      color: Color(record.Expression_6)?.Foreground
                    }} >
                      {value === 0 ? '' : number_format(value)}
                    </div>
                  )
                }} />
              <Table.Column title="???????????????" dataIndex="W1_receipt_issue_num" width={90}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }} >
                      {value === 0 ? '' : value}
                    </div>
                  )
                }} />
              <Table.Column title="??????" dataIndex="Expression_7" width={70} align='center' />
              <Table.Column title="??????????????????" dataIndex="Expression_8" width={70} align='center' />
              <Table.Column title="?????????" dataIndex="W1_amount_received"
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }} >
                      {value === 0 ? '' : number_format(value)}
                    </div>
                  )
                }} />
              <Table.Column title="??????" dataIndex="W1_change" width={70}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }} >
                      {value === 0 ? '' : number_format(value)}
                    </div>
                  )
                }} />
              <Table.Column title="?????????" dataIndex="W1_transfer_fee" width={80}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }} >
                      {value === 0 ? '' : number_format(value)}
                    </div>
                  )
                }} />
              <Table.Column title="????????????" dataIndex="W1_person_num"
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }} >
                      {value === 0 ? '' : value}
                    </div>
                  )
                }} />
              <Table.Column title="??????" width={35} align='center'
                render={(value, record) => {
                  let icon = ''
                  switch (record.Expression_14) {
                    case 1:
                      icon = (<InfoCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />)
                      break;
                    case 3:
                      icon = (<WarningOutlined style={{ fontSize: 20, color: "#faad14" }} />);
                      break;
                    case 5:
                      icon = (<CloseCircleOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />);
                      break;
                    default:
                      icon = (<Button size='small' icon={<MoreOutlined style={{ fontSize: 20 }} />}></Button>)
                      break;
                  }
                  return (
                    <div style={{ cursor: 'pointer' }}
                      onClick={() => {
                        let title = '??????????????????SUB' + ' [' + record.W1_person_num + ']'
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '90%',
                            component: (
                              <Card title={title}>
                                <WS2584019_PersonalInfoInquirySub
                                  Li_PersonalNum={record.W1_person_num}
                                  onFinishScreen={() => {
                                    this.closeModal();
                                  }}
                                />
                              </Card>
                            ),
                          },
                        });
                      }} >{icon}
                    </div>
                  );
                }}
              />
              <Table.Column title="??????" dataIndex="W1_payment_comments" />
              <Table.Column title="?????????" dataIndex="visit_date_on" width={90}
                render={(value, record, index) => {
                  return (
                    <div>{value === '0000-00-00' ? '' : value.replaceAll('-', '/')}</div>
                  )
                }} />
              <Table.Column title="?????????" dataIndex="visit_course" width={50} align='center'
                render={(value, record, index) => {
                  return (
                    <div>{value?.toString().substr(0, 1) + '-' + value?.toString().substr(1, 2)}</div>
                  )
                }} />
              <Table.Column title="?????????" dataIndex="office_kanji_name" width={150} />
              <Table.Column title="??????????????????" dataIndex="W1_billing_manage_num" width={130}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }} >
                      {value === 0 ? '' : value}
                    </div>
                  )
                }} />
              <Table.Column title="??????" dataIndex="Expression_10" width={40} align='center'
                render={(value, record, index) => {
                  return (
                    <div style={{ color: Color(record.Expression_9)?.Foreground }} >
                      {value}
                    </div>
                  )
                }} />
              <Table.Column width={50} align='center'
                render={(value, record) => {
                  return (
                    <Dropdown
                      overlay={() => (
                        <Menu>
                          <Menu.Item hidden={!record.W1_reserve_num}
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: "90%",
                                  visible: true,
                                  component: (
                                    <WS2583001_ConsultInquirySub
                                      Li_ReserveNum={record.W1_reserve_num}
                                      onFinishScreen={() => {
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          >
                            ????????????
                          </Menu.Item>
                          <Menu.Item hidden={!record.W1_billing_manage_num || record.W1_identify < 4 || record.W1_identify > 9}
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: "90%",
                                  visible: true,
                                  component: (
                                    <WS0963001_InvoiceMaintain
                                      Li_BillingManageNum={record.W1_billing_manage_num}
                                      onFinishScreen={() => {
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          >
                            ????????????
                          </Menu.Item>
                          <Menu.Item hidden={!record.W1_billing_manage_num || record.W1_identify < 4 || record.W1_identify > 9}
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: "90%",
                                  visible: true,
                                  component: (
                                    <WS2630001_OrganizationsPayment
                                      onFinishScreen={() => {
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          >
                            ????????????
                          </Menu.Item>
                          <Menu.Item hidden={!record.W1_billing_manage_num || record.W1_identify < 1 || record.W1_identify > 3}
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: "90%",
                                  visible: true,
                                  component: (
                                    <WS2620001_Counter
                                      onFinishScreen={() => {
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          >
                            ????????????
                          </Menu.Item>
                        </Menu>
                      )}
                    >
                      <Button size='small' icon={<MoreOutlined />}></Button>
                    </Dropdown>
                  );
                }}
              />
            </Table>

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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0977001_DepositWithdrawalInquiry);
