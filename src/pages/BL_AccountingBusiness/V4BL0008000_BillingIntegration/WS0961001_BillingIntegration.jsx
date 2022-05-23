import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Table, Row, Col, Modal, DatePicker, Spin, message, Space, Button, InputNumber } from "antd";

import WS0961004_TamperProofRelease from "./WS0961004_TamperProofRelease";
import WS0947001_Invoice from "./WS0947001_Invoice";
import WS0975001_BillingInquiry from "../V4BL0030000_BillingInquiry/WS0975001_BillingInquiry";
import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0084001_PostCodeSearchEngine from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0084001_PostCodeSearchEngine";
import WS0961005_BillingDateChange from "./WS0961005_BillingDateChange";
import BillingIntegrationAction from 'redux/AccountingBusiness/BillingIntegration/BillingIntegration.actions'
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { number_format } from "helpers/CommonHelpers";

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const gridSM = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
class WS0961001_BillingIntegration extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_BillingManageNum: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "請求統合";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      showLessThanTaxCircle: false,
      isloadFrm: false,
      isLoadingTable: false,
      StyleNum: [],
      tableNull: [{
        W1_serial_num: "",
        W1_billing_manage_num: 0,
        W1_identify: 5,
        W1_address: "",
        W1_subject: "",
        W1_billing_period_beginning: null,
        W1_billing_period_final: null,
        W1_person: "",
        W1_billing_amount: "",
        W1_price_exclude_tax_sum: "",
        W1_billing_tax_price: "",
        W1_deposit_amount: "",
        W1_invoice_num: "",
        id: "",

      }],
      count: "a",

      dataScreen: {},
      ClassifyState: null,
      TaxCalculateUnit: null,
      TaxClassifyState: null
    };
  }

  componentDidMount() {
    this.formRef.current?.resetFields()
    this.Expression_141()
    this.formRef.current?.setFieldsValue({
      BillingManageNum: this.props.Li_BillingManageNum || null
    })

    if (this.props.Li_BillingManageNum) {
      this.getDataDisplay()
    } else {
      this.getInit()
    }
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.formRef.current?.resetFields()
      this.Expression_141()
      this.formRef.current?.setFieldsValue({
        tableData: this.state.tableNull,
        BillingManageNum: this.props.Li_BillingManageNum || null
      })
      if (this.props.Li_BillingManageNum) {
        this.getDataDisplay()
      } else {
        this.getInit()
      }
    }
  }

  Expression_141() {
    BillingIntegrationAction.Expression_141().then(res => {
      this.setState({
        StyleNum: res ? res : []
      })
    })
  }

  getInit() {
    this.setState({ isloadFrm: true })
    BillingIntegrationAction.getInit()
      .then(res => {
        const data = this.setValueDisplay(res?.data)
        this.formRef.current?.setFieldsValue(data)
        this.setState({
          dataScreen: res?.data,
          ClassifyState: res?.data?.Classify,
          TaxCalculateUnit: res?.data?.TaxCalculateUnit,
          TaxClassifyState: res?.data?.TaxClassify,
        })
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isloadFrm: false }))
  }

  setValueDisplay(res) {
    res.BillingDateChar = this.isEmpty(res.BillingDateChar) ? null : moment(res.BillingDateChar)
    res.BillingPeriodBeginningChar = this.isEmpty(res.BillingPeriodBeginningChar) ? null : moment(res.BillingPeriodBeginningChar)
    res.BillingPeriodFinalChar = this.isEmpty(res.BillingPeriodFinalChar) ? null : moment(res.BillingPeriodFinalChar)
    res.ClaimYearsChar = this.isEmpty(res.ClaimYearsChar) ? null : moment(res.ClaimYearsChar)
    res.TotalAmount = res.TotalAmount == 0 ? '' : number_format(res.TotalAmount)
    res.Tax = res.Tax == 0 ? '' : number_format(res.Tax)
    res.AmountBilled = res.AmountBilled == 0 ? '' : number_format(res.AmountBilled)
    res.DepositAmount = res.DepositAmount == 0 ? '' : number_format(res.DepositAmount)
    return res
  }

  getDataDisplay() {
    let params = {
      BillingManageNum: this.formRef.current?.getFieldValue("BillingManageNum")
    }

    BillingIntegrationAction.getDataDisplay(params)
      .then(res => {
        if (res?.data?.message === 'Call ScreenDisplayAfter') {
          this.getDataDisplayAfter()
        } else {
          const val = this.setValueDisplay(res?.data?.BillingInfo)
          this.formRef.current?.setFieldsValue(val)

          this.setState({
            dataScreen: res?.data?.BillingInfo,
            ClassifyState: res?.data?.BillingInfo?.Classify,
            TaxCalculateUnit: res?.data?.BillingInfo?.TaxCalculateUnit,
            TaxClassifyState: res?.data?.BillingInfo?.TaxClassify,
          })
          this.getDataTableSub()
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
  }

  getDataDisplayAfter() {
    let params = {
      BillingManageNum: this.formRef.current?.getFieldValue("BillingManageNum")
    }

    BillingIntegrationAction.getDataDisplayAfter(params)
      .then(res => {
        const val = this.setValueDisplay(res?.data?.BillingInfo)
        this.formRef.current?.setFieldsValue(val)

        this.setState({
          dataScreen: res?.data?.BillingInfo,
          ClassifyState: res?.data?.BillingInfo?.Classify,
          TaxCalculateUnit: res?.data?.BillingInfo?.TaxCalculateUnit,
          TaxClassifyState: res?.data?.BillingInfo?.TaxClassify,
          isLoadingTable: false
        })
        this.getDataTableSub()
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
  }

  getDataTableSub(reload) {
    let params = {
      BillingManageNum: this.formRef.current?.getFieldValue("BillingManageNum")
    }

    this.setState({ isLoadingTable: true })
    BillingIntegrationAction.getDataTableSub(params)
      .then(res => {
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: res && res.data.length > 0 ? res.data : this.state.tableNull,
          selectedRow: res && res.data.length > 0 ? res.data[index] : {},
          selectedRowKeys: res && res.data.length > 0 ? [res.data[index]] : [],
          indexTable: index,
        })
      })
      .catch(error => {
        this.setState({ isLoadingTable: false })
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  SetBillingDetail(data) {
    const arrData = [...this.formRef.current?.getFieldValue("tableData")]
    if (arrData.length > 0) {
      let arrCheck = []
      let arrKey = []
      arrData.map((value, index) => {
        arrKey.push(value.W1_billing_manage_num)
        if (value.W1_billing_manage_num !== 0) {
          arrCheck.push(value)
        }
        if (arrKey.length === arrData.length) {
          if (data && data.length === 0) {
            this.formRef.current?.setFieldsValue({
              tableData: arrCheck
            })
            this.forceUpdate()
          } else {
            data.map((val, index) => {
              if (arrKey.indexOf(val.W1_billing_manage_num) === -1) {
                arrCheck.push(val);
              }
              if (data.length - 1 === index) {
                this.formRef.current?.setFieldsValue({
                  tableData: arrCheck
                })
                this.forceUpdate()
              }
            })
          }
        }
      })
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }

  onFinish(values) { }

  CheckMaxLength(e, number, namePath) {
    let val = e.target.value
    if (!this.isEmpty(val)) {
      if (val.length > number) {
        val.slice(0, number)
        this.formRef.current.setFields([{
          name: namePath,
          value: val
        }])
        this.forceUpdate()
      }
    }
  }

  showPoopupLoadData() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 350,
        component: (
          <Card title="確認">
            <Row>
              <QuestionCircleOutlined style={{ fontSize: '30px', color: '#08c' }} /> <span>&emsp;&emsp;統合先に反映しますか？</span>
            </Row>
            <Space style={{ float: 'right', marginTop: '1em' }}>
              <Button onClick={() => {
                this.getDataDisplay()
                this.closeModal()
              }} >&emsp;&emsp;は　い&emsp;&emsp;</Button>
              <Button onClick={() => {
                this.getDataDisplay(1)
                this.closeModal()
              }} >&emsp;&emsp;いいえ&emsp;&emsp;</Button>
            </Space>
          </Card>
        ),
      },
    });
  }

  AddNewData() {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    if (arr.length === 0) {
      this.handleAdd();
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].W1_billing_manage_num === 0) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd()
        }
      }
    }
  }

  handleAdd() {
    const { count } = this.state;
    const newData = {
      W1_serial_num: "",
      W1_billing_manage_num: 0,
      W1_identify: 5,
      W1_address: "",
      W1_subject: "",
      W1_billing_period_beginning: null,
      W1_billing_period_final: null,
      W1_person: "",
      W1_billing_amount: "",
      W1_price_exclude_tax_sum: "",
      W1_billing_tax_price: "",
      W1_deposit_amount: "",
      W1_invoice_num: "",
      id: count,
    }
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
    })
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

  render() {
    const { ProtectionFlag, ProcessDivision, KeyEditingPermission } = this.state.dataScreen
    return (
      <div className="billing-integration">
        <Card title="請求統合">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 500,
                    component: (
                      <WS0961004_TamperProofRelease
                        onFinishScreen={(output) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              保護解除
            </Button>
            <Button>総合解除</Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 600,
                    component: (
                      <WS0947001_Invoice
                        onFinishScreen={(output) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              完了
            </Button>
          </Space>
          <hr style={{ margin: '15px 0' }} />

          <Spin spinning={this.state.isloadFrm}>
            <Form ref={this.formRef} onFinish={this.onFinish} autoComplete="off"
              initialValues={{ Classify: 5 }}
              {...grid}
            >
              <Row >
                <Col span={13}>
                  <Form.Item label="請求管理番号" >
                    <Row>
                      <Col span={7} style={{ paddingRight: 20 }}>
                        <Form.Item name="BillingManageNum" >
                          <Input style={{ textAlign: 'right' }}
                            readOnly
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "90%",
                                  component: (
                                    <WS0975001_BillingInquiry
                                      Li_ProcessDivision={3}
                                      Li_IdentifyInitialDisplay={5}
                                      Li_TargetInitialDisplay={2}
                                      Li_PayRemainingInitialDisplay={0}
                                      Li_OutstandingInitialDisplay={0}
                                      onFinishScreen={(output) => {
                                        if (this.state.dataScreen.ScreenEditing) {
                                          let title = <span>更新中のデータは無効になります <br /> よろしいですか?</span>
                                          Modal.confirm({
                                            width: 350,
                                            title: title,
                                            icon: <QuestionCircleOutlined style={{ color: '#1890ff', fontSize: 28 }} />,
                                            onOk: () => {
                                              this.formRef.current?.setFieldsValue({
                                                BillingManageNum: output.Lo_BillingManageNum,
                                              })
                                              this.getDataDisplay()
                                            }
                                          })
                                        } else {
                                          this.formRef.current?.setFieldsValue({
                                            BillingManageNum: output.Lo_BillingManageNum,
                                          })
                                          this.getDataDisplay()
                                        }
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={9} style={{ paddingRight: 5 }}>
                        <Form.Item name="Classify" label="請求先区分">
                          <Select style={{ width: 100 }}
                            disabled={!KeyEditingPermission && ProcessDivision !== 1}
                            onChange={(value) => this.setState({ ClassifyState: value })}>
                            <Select.Option value={4}>保険者</Select.Option>
                            <Select.Option value={5}>事業所</Select.Option>
                            <Select.Option value={6}>他団体</Select.Option>
                            <Select.Option value={9}>個人未収</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={2} style={{ paddingRight: 5 }} >
                        <Form.Item name="Expression_27" >
                          <Input readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={2} style={{ paddingRight: 5 }} >
                        <Form.Item name="Expression_28" >
                          <Input readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={2} offset={2} style={{ textAlign: 'right' }}>
                        <Form.Item name="Expression_192" >
                          <Input readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>

                  <Form.Item name="Destination" label='宛名'>
                    <Input maxLength={60}
                      className='custom-disabled-input'
                      disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                      onDoubleClick={() => {
                        let condition = !this.formRef.current?.getFieldValue('DestinationZipCode') &&
                          !this.formRef.current?.getFieldValue('Address1') &&
                          !this.formRef.current?.getFieldValue('Address2')
                        switch (this.state.ClassifyState) {
                          case 4:
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "90%",
                                component: (
                                  <WS0246001_InsurerInfoSearchQuery
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        Destination: output.Lo_Name,
                                      })
                                      if (condition) {
                                        this.formRef.current?.setFieldsValue({
                                          DestinationZipCode: output.recordData.postal_code,
                                          Address1: output.recordData.location_1,
                                          Address2: output.recordData.location_2,
                                        })
                                      }

                                      this.changeScreenEditting(true)

                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                            break;
                          case 5:
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "90%",
                                component: (
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        Destination: output.Lo_Kanji_Name
                                      })
                                      if (condition) {
                                        this.formRef.current?.setFieldsValue({
                                          DestinationZipCode: output.recordData.postal_code,
                                          Address1: output.recordData.address_1,
                                          Address2: output.recordData.address_2,
                                        })
                                      }
                                      this.changeScreenEditting(true)

                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                            break;
                          case 9:
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "90%",
                                component: (
                                  <WS0248001_PersonalInfoSearchQuery
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        PersonalNumAddressSearch: output.Lo_PersonalNumId,
                                        Destination: output.recordData.kanji_name,
                                      })
                                      if (condition) {
                                        this.formRef.current?.setFieldsValue({
                                          DestinationZipCode: output.recordData.postal_code,
                                          Address1: output.recordData.address_1,
                                          Address2: output.recordData.address_2,
                                        })
                                      }
                                      this.changeScreenEditting(true)

                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                            break;
                          default: break;
                        }
                      }}

                      onBlur={(e) => {
                        if (this.state.dataScreen.Destination !== e.target.value) {
                          this.changeScreenEditting(true)
                        }

                        if (ProcessDivision == 1 && !this.formRef.current?.getFieldValue('Subject')) {
                          this.formRef.current?.setFieldsValue({
                            Subject: this.state.dataScreen.Subject
                          })
                        }
                      }}
                    />
                  </Form.Item>

                  <Row gutter={24}>
                    <Col span={4} style={{ textAlign: "right", fontWeight: "bold", color: '#14468C', alignSelf: "center", paddingBottom: "15px", paddingRight: 3 }}>
                      <label>送付先</label>
                    </Col>
                    <Col span={20} style={{ paddingLeft: 7 }}>
                      <Form.Item name="DestinationZipCode" >
                        <Input style={{ width: "150px" }} maxLength={8}
                          className='custom-disabled-input'
                          disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "50%",
                                component: (
                                  <WS0084001_PostCodeSearchEngine
                                    onFinishScreen={(output) => {
                                      let address = this.formRef.current?.getFieldValue('Address1')
                                      this.formRef.current?.setFieldsValue({
                                        DestinationZipCode: output.Lio_ZipCode,
                                        Address1: address ? address : output.Lio_Address
                                      })

                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}

                          onBlur={(e) => {
                            if (this.state.dataScreen.DestinationZipCode !== e.target.value) {
                              this.changeScreenEditting(true)
                            }
                          }}
                        />
                      </Form.Item>
                      <Form.Item name="Address1" wrapperCol={{ span: 24 }}>
                        <Input
                          className='custom-disabled-input'
                          disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "50%",
                                component: (
                                  <WS0084001_PostCodeSearchEngine
                                    onFinishScreen={(output) => {
                                      let address = this.formRef.current?.getFieldValue('Address1')
                                      this.formRef.current?.setFieldsValue({
                                        DestinationZipCode: output.Lio_ZipCode,
                                        Address1: address ? address : output.Lio_Address
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          onBlur={(e) => {
                            if (this.state.dataScreen.Address1 !== e.target.value) {
                              this.changeScreenEditting(true)
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="Address2" label=' '>
                    <Input maxLength={60}
                      className='custom-disabled-input'
                      disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                      onBlur={(e) => {
                        if (this.state.dataScreen.Address2 !== e.target.value) {
                          this.changeScreenEditting(true)
                        }
                      }} />
                  </Form.Item>
                  <Form.Item name="Subject" label='件名'>
                    <Input maxLength={100}
                      className='custom-disabled-input'
                      disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                      onBlur={(e) => {
                        if (this.state.dataScreen.Subject !== e.target.value) {
                          this.changeScreenEditting(true)
                        }
                      }} />
                  </Form.Item>
                  <Form.Item name="Remarks" label='備考'>
                    <Input maxLength={100}
                      className='custom-disabled-input'
                      disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                      onBlur={(e) => {
                        if (this.state.dataScreen.Remarks !== e.target.value) {
                          this.changeScreenEditting(true)
                        }
                      }} />
                  </Form.Item>
                </Col>

                <Col span={11} style={{ paddingLeft: 20 }}>
                  <Form.Item label="請求番号" name='ClaimNum'>
                    <div style={{ width: 112, textAlign: 'right' }} >{this.formRef.current?.getFieldValue("ClaimNum")}</div>
                  </Form.Item>

                  <Form.Item label="請求日">
                    <Row gutter={24}>
                      <Col span={8}>
                        <Form.Item name="BillingDateChar">
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format={"YYYY/MM/DD"} style={{ width: 112 }}
                            disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                            onBlur={(e) => {
                              if (this.state.dataScreen.BillingDateChar !== e.target.value) {
                                this.changeScreenEditting(true)
                              }
                            }} />
                        </Form.Item>
                      </Col>
                      <Col span={8} offset={3}>
                        <Form.Item label="税率" >
                          <span>{this.formRef.current?.getFieldValue("TaxRate")} %</span>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>

                  <Form.Item name="ClaimYearsChar" label="請求年月">
                    {ProcessDivision == 2 ?
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                        format="YYYY/MM" style={{ width: 90 }}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 300,
                              component: (
                                <WS0961005_BillingDateChange
                                  Lio_ClaimYears={this.formRef.current?.getFieldValue('ClaimYearsChar')}
                                  onFinishScreen={(output) => {
                                    if (output.Lo_YearsChangePresence) {
                                      let data = {
                                        ...this.state.dataScreen,
                                        ProcessDivision: 3,
                                        ClaimYearsChar: output.Lio_ClaimYears,
                                        BillingManageNumYearsBeforeChange: this.formRef.current?.getFieldValue('BillingManageNum'),
                                        IdentifyDateChangeBefore: this.formRef.current?.getFieldValue('Classify'),
                                        ScreenEditing: true
                                      }

                                      this.setState({
                                        dataScreen: data
                                      })
                                      this.formRef.current?.setFieldsValue({
                                        ClaimYearsChar: output.Lio_ClaimYears
                                      })
                                    }
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                      :
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM" style={{ width: 90 }}
                        disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                        onBlur={(e) => {
                          if (this.state.dataScreen.ClaimYearsChar !== e.target.value) {
                            this.changeScreenEditting(true)
                          }
                        }} />
                    }
                  </Form.Item>

                  <Form.Item label="請求期間">
                    <Space>
                      <Form.Item name="BillingPeriodBeginningChar" >
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" style={{ width: 112 }}
                          disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)} />
                      </Form.Item>
                      <Form.Item>~</Form.Item>
                      <Form.Item name="BillingPeriodFinalChar" >
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" style={{ width: 112 }}
                          disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)} />
                      </Form.Item>
                    </Space>
                  </Form.Item>

                  <Form.Item label="税計算単位">
                    <Row gutter={24}>
                      <Col span={8}>
                        <Form.Item name="TaxCalculateUnit">
                          <Select style={{ width: 112 }}
                            disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                            onChange={(value) => {
                              this.setState({
                                TaxCalculateUnit: value
                              })
                              if (value === 1) {
                                this.setState({
                                  showLessThanTaxCircle: true,
                                });
                              } else {
                                this.setState({
                                  showLessThanTaxCircle: false,
                                });
                              }
                            }}
                          >
                            <Select.Option value={0}>明細</Select.Option>
                            <Select.Option value={1}>合計</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12} offset={2}>
                        <Form.Item name="LessThanTaxCircle" label="税円未満">
                          <Select hidden={!this.state.showLessThanTaxCircle} style={{ width: 100 }}
                            disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}>
                            <Select.Option value={0}>四捨五入</Select.Option>
                            <Select.Option value={1}>切捨</Select.Option>
                            <Select.Option value={2}>切上</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>

                  <Form.Item name="TaxClassify" label="税区分">
                    <Select hidden={!this.state.showLessThanTaxCircle} style={{ width: 112 }}
                      disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                      onChange={(value) => {
                        this.setState({ TaxClassifyState: value })
                        // this.eventChangeTaxClassify()
                      }}>
                      <Select.Option value={0}>消費税指定</Select.Option>
                      <Select.Option value={1}>外税</Select.Option>
                      <Select.Option value={2}>内税</Select.Option>
                      <Select.Option value={3}>非課税</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <br />

              <Table
                size='small'
                dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                loading={this.state.isLoadingTable}
                pagination={false} bordered={true}
                rowKey={(record) => record.id}
                rowSelection={{
                  type: "radio",
                  onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({
                      ...this.state.selectedRows,
                      selectedRows: selectedRows,
                    });
                  },
                }}
              >
                <Table.Column title="連番" dataIndex="W1_serial_num" width={50}
                  render={(value, record, index) => {
                    return (
                      <div style={{ textAlign: 'right' }}>{value}</div>
                    )
                  }} />
                <Table.Column title="請求管理番号" dataIndex="W1_billing_manage_num" width={180} render={(value, record, index) => {
                  if (isNaN(record.id)) {
                    return (
                      <Form.Item name={['tableData', index, 'W1_billing_manage_num']} style={{ marginBottom: '0px' }} >
                        <Input.Search readOnly style={{ textAlign: 'right' }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "90%",
                                component: (
                                  <WS0975001_BillingInquiry
                                    Li_ProcessDivision={3}
                                    Li_IdentifyInitialDisplay={5}
                                    Li_TargetInitialDisplay={0}
                                    Li_PayRemainingInitialDisplay={0}
                                    Li_OutstandingInitialDisplay={0}
                                    onFinishScreen={(output) => {
                                      let data = this.formRef.current?.getFieldValue("tableData")
                                      data[index]['W1_billing_manage_num'] = output.Lo_BillingManageNum
                                      this.formRef.current?.setFieldsValue({
                                        tableData: data
                                        // Classify: output.Lo_Identify
                                      })
                                      if (this.formRef.current?.getFieldValue("tableData")?.length > 1) {
                                        this.getDataDisplay(1)
                                      } else {
                                        this.showPoopupLoadData()
                                      }
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    );
                  } else {
                    return <span>{value}</span>
                  }

                }}
                />
                <Table.Column title="識 別" dataIndex="W1_identify" width={150}
                  render={(value, record, index) => {
                    return (
                      <Form.Item name={['tableData', index, 'W1_identify']} style={{ marginBottom: '0px' }} >
                        <Select style={{ width: "100%" }} disabled={isNaN(record.id) ? false : true} >
                          <Select.Option value={4}>保険者</Select.Option>
                          <Select.Option value={5}>事業所</Select.Option>
                          <Select.Option value={6}>他団体</Select.Option>
                          <Select.Option value={9}>個人未収</Select.Option>
                        </Select>
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column title="請　求　情　報"
                  render={(value, record) => {
                    return (
                      <div>
                        <div>{record.W1_address}</div>
                        <div>{record.W1_subject}</div>
                        <Row gutter={24}>
                          <Col span={2} style={{ textAlign: "center" }}>
                            <label>期間</label>
                          </Col>
                          <Col span={3}>
                            <span>{record.W1_billing_period_beginning}</span>
                          </Col>
                          ~
                          <Col span={3}>
                            <span>{record.W1_billing_period_final}</span>
                          </Col>
                          <Col span={3} style={{ textAlign: "right" }}>
                            <span>請求額</span>
                          </Col>
                          <Col span={2} style={{ textAlign: 'right' }}>
                            <span>{record.W1_billing_amount}</span>
                          </Col>
                          <Col span={3} style={{ textAlign: "right" }}>
                            <span>入金合計</span>
                          </Col>
                          <Col span={2} style={{ textAlign: 'right' }}>
                            <span>{record.W1_deposit_amount}</span>
                          </Col>
                          <Col span={3} style={{ textAlign: "right" }}>
                            <span>請求番号</span>
                          </Col>
                          <Col span={2} style={{ textAlign: 'right' }}>
                            <span>{record.W1_invoice_num}</span>
                          </Col>
                        </Row>
                      </div>
                    );
                  }}
                />
                <Table.Column width={50} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>} />
              </Table>
              <br />

              <hr style={{ border: "1px solid #F0F0F0", marginBottom: "1.2rem" }} />
              <Row gutter={24}>
                <Col span={5}>
                  <Form.Item name="StyleNum" label="様式"  >
                    <Select
                      disabled={!(ProtectionFlag === 0 && ProcessDivision !== 4)}
                      onChange={(e) => {
                        if (this.state.dataScreen.StyleNum !== e.target.value) {
                          this.changeScreenEditting(true)
                        }
                      }}>
                      {this.state.StyleNum?.map(value => (
                        <Select.Option key={"StyleNum_" + Math.random()} value={parseInt(value.LinkedField)}>{value.DisplayField}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="TotalAmount" label="合計金額" {...gridSM}>
                    <InputNumber maxLength={10} min={0}
                      disabled
                      formatter={value => value == 0 ? '' : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      onBlur={(value) => {
                        if (this.state.dataScreen.TotalAmount !== value) {
                          this.changeScreenEditting(true)
                        }
                      }} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="Tax" label="税">
                    <InputNumber maxLength={10} min={0}
                      disabled={!(this.state.TaxCalculateUnit === 1 && this.state.TaxClassifyState == 0 && ProtectionFlag == 0 && ProcessDivision !== 4)
                        || !(ProtectionFlag === 0 && ProcessDivision !== 4)
                      }
                      formatter={value => value == 0 ? '' : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      onBlur={(value) => {
                        if (this.state.dataScreen.Tax !== value) {
                          this.changeScreenEditting(true)
                        }
                      }} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="AmountBilled" label="請求金額" {...gridSM}>
                    <InputNumber maxLength={10} min={0}
                      disabled
                      formatter={value => value == 0 ? '' : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      onBlur={(value) => {
                        if (this.state.dataScreen.AmountBilled !== value) {
                          this.changeScreenEditting(true)
                        }
                      }} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="DepositAmount" label="入 金 額" {...gridSM}>
                    <InputNumber disabled maxLength={8}
                      formatter={value => value == 0 ? '' : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                  </Form.Item>
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
            this.closeModal()
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS0961001_BillingIntegration);
