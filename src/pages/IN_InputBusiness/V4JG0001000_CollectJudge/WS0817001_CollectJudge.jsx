import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Table, Row, Col, Space, DatePicker, Modal, message } from "antd";
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

import WS0180001_QueryExaminee from 'pages/IN_InputBusiness/V4JG0001000_CollectJudge/WS0180001_QueryExaminee.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS2786001_ConditionAddSub from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub.jsx';
import WS0817008_Verification from 'pages/IN_InputBusiness/V4JG0001000_CollectJudge/WS0817008_Verification.jsx';
import WS1512001_OptionalInfoMaintain from 'pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512001_OptionalInfoMaintain.jsx';

import CollectJudgeAction from 'redux/InputBusiness/CollectJudge/CollectJudge.action';
import moment from "moment";
import WS2583001_ConsultInquirySub from "../V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import ModalDraggable from "components/Commons/ModalDraggable";
import Color from "constants/Color";

const dateFormat = 'YYYY/MM/DD';

const grid = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
class WS0817001_CollectJudge extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '一括判定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      FacilityType: [],

      isLoadingTable: false,
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],
      dataScreen: {},
      Expression_39: 163
    };

    this.getDataTableBySearch = this.getDataTableBySearch.bind(this)
  }
  componentDidMount() {
    this.getScreenData();
  }

  getScreenData() {
    CollectJudgeAction.getScreenData()
      .then(res => {
        this.setState({
          FacilityType: res ? res.FacilityType : [],
          dataScreen: res ? res : {}
        })

        this.formRef.current?.setFieldsValue({
          FacilityType: res ? res.FacilityType[0].LinkedField : '',
          Tiering: res ? res.Tiering : '',
          ReplacementInstructions: res ? res.ReplacementInstructions : '',
          ReceiptNumFormCopy: '',
          ReceiptNumTCopy: '',
          CourseCodeF: '',
          CourseCodeT: '',
        })
      })
  }

  getDataTableBySearch() {
    if (this.formRef.current?.getFieldValue('ReceiptNumForm') && !this.formRef.current?.getFieldValue('ReceiptNumT')) {
      this.formRef.current?.setFieldsValue({
        ReceiptNumT: this.formRef.current?.getFieldValue('ReceiptNumForm'),
        ReceiptNumTCopy: this.formRef.current?.getFieldValue('ReceiptNumForm')
      })
    }

    if (this.formRef.current?.getFieldValue('CourseCodeF') && !this.formRef.current?.getFieldValue('CourseCodeT')) {
      this.formRef.current?.setFieldsValue({
        CourseCodeT: this.formRef.current?.getFieldValue('CourseCodeF'),
      })
    }

    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateFChar: this.formRef.current?.getFieldValue('DateFChar')?.format('YYYY/MM/DD'),
      DateTChar: this.formRef.current?.getFieldValue('DateTChar')?.format('YYYY/MM/DD'),
    };

    this.setState({ isLoadingTable: true });

    CollectJudgeAction.getDataBySearch(params)
      .then(res => {
        let data = res ? res.data?.filter((x) => x.W1_logic_01) : []
        this.setState({
          dataSource: res.data,
          isLoadingTable: false,
          selectedRowKeys: data?.map(x => x.W1_id),
          selectedRows: data
        })
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => { this.setState({ isLoadingTable: false }) })
  }

  verification() {
    this.setState({ isLoadingTable: true });
    let params = {
      Tiering: this.formRef.current?.getFieldValue("Tiering"),
      ReplacementInstructions: this.formRef.current?.getFieldValue("ReplacementInstructions"),
      CompositeJudge: this.state.dataScreen.CompositeJudge,
      list_id: this.state.selectedRowKeys
    }
    CollectJudgeAction.verification(params)
      .then((res) => {
        Modal.info({
          width: 300,
          title: '一括判定を終了しました',
          onOk: () => {
            this.getDataTableBySearch()
          }
        })
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res?.data?.message);
      });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }

  CompareTwoDate() {
    let dateF = this.formRef.current?.getFieldValue("DateFChar");
    let dateT = this.formRef.current?.getFieldValue("DateTChar");
    return dateF?.format("YYYY/MM/DD") === dateT?.format("YYYY/MM/DD")
  }

  checkDate() {
    let dateStart = this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : null
    let dateEnd = this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : null

    if ((dateEnd && (dateStart > dateEnd)) || (!dateEnd && dateStart)) {
      this.formRef.current?.setFieldsValue({
        DateTChar: this.formRef.current?.getFieldValue('DateFChar')
      })
    }
  }

  onFinish(values) {
  }

  checkReceiptNum(valueF, valueT) {
    let ReceiptNumForm = parseInt(this.formRef.current?.getFieldValue('ReceiptNumForm'))
    let ReceiptNumT = parseInt(this.formRef.current?.getFieldValue('ReceiptNumT'))

    if ((ReceiptNumForm && !ReceiptNumT) || ReceiptNumForm > ReceiptNumT) {
      this.formRef.current?.setFieldsValue({
        ReceiptNumT: ReceiptNumForm,
        ReceiptNumTCopy: ReceiptNumForm
      })
    } else {
      if (valueF && valueF == 0) {
        this.formRef.current?.setFieldsValue({
          ReceiptNumFormCopy: '',
          ReceiptNumForm: 0
        })
      }

      if (valueT && valueT == 0) {
        this.formRef.current?.setFieldsValue({
          ReceiptNumTCopy: '',
          ReceiptNumT: 0
        })
      }
    }
  }

  checkCourseCode() {
    let CourseCodeF = this.formRef.current?.getFieldValue('CourseCodeF')
    let CourseCodeT = this.formRef.current?.getFieldValue('CourseCodeT')
    if (!CourseCodeT || CourseCodeF > CourseCodeT) {
      this.formRef.current?.setFieldsValue({
        CourseCodeT: CourseCodeF
      })
    }
  }

  render() {
    return (
      <div className="collect-judge">
        <Card title="一括判定" className='mb-3'>
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 300,
                    component: (
                      <WS0817008_Verification
                        Lio_ReplacementInstructions={this.formRef.current?.getFieldValue("ReplacementInstructions")}
                        Lio_StsHierarchical={this.formRef.current?.getFieldValue("Tiering") === 1 ? true : false}

                        onFinishScreen={(output) => {
                          if (output.Lo_StsRun) {
                            this.formRef.current?.setFieldsValue({
                              ReplacementInstructions: output.Lio_ReplacementInstructions,
                              Tiering: output.Lio_StsHierarchical ? 1 : 0,
                              JudgeStart: output.Lo_StsRun
                            })

                            if (this.state.selectedRowKeys.length > 0) {
                              this.verification()
                            } else {
                              Modal.info({
                                width: 300,
                                title: '一括判定を終了しました',
                                onOk: () => {

                                }
                              })
                            }
                          }
                          this.closeModal()
                        }}
                      />)
                  }
                })
              }}
            >実行</Button>
            {/* <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '80%',
                    component: (<WS1512001_OptionalInfoMaintain

                      onFinishScreen={(output) => {
                        this.closeModal()
                      }}
                    />)
                  }
                })
              }}
            >ｵﾌﾟｼｮﾝ情報</Button> */}
          </Space>
        </Card>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            KeyNum: 1
          }}
        >
          <Row gutter={24}>
            <Col style={{ paddingRight: 0, width: '362px' }}>
              <Card style={{ height: '100%' }}>
                <div hidden>
                  <Form.Item name="Id"><Input /></Form.Item>
                  <Form.Item name="KeyNum"><Input /></Form.Item>
                  <Form.Item name="CourseLevel"><Input /></Form.Item>
                  <Form.Item name="ReplacementInstructions"><Input /></Form.Item>
                  <Form.Item name="Tiering"><Input /></Form.Item>
                  <Form.Item name="JudgeStart"><Input /></Form.Item>
                  <Form.Item name="ReceiptNumForm"><Input /></Form.Item>
                  <Form.Item name="ReceiptNumT"><Input /></Form.Item>
                  <Form.Item name="BranchCode"><Input /></Form.Item>
                </div>

                <Form.Item label="受診日" {...grid}>
                  <Space>
                    <Form.Item name="DateFChar" style={{ marginBottom: 0 }}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} allowClear={false}
                        onBlur={() => { this.checkDate() }}
                      />
                    </Form.Item>
                    <label>~</label>
                    <Form.Item name="DateTChar" style={{ marginBottom: 0 }}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} allowClear={false}
                        onBlur={() => { this.checkDate() }}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="受付No"  {...grid}>
                  <Space>
                    <Form.Item name="ReceiptNumFormCopy" style={{ marginBottom: 0 }}>
                      <Input.Search style={{ width: '100px', textAlign: 'right' }} min={0} minLength={6}
                        onSearch={() => {
                          if (this.CompareTwoDate())
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '70%',
                                component: (
                                  <WS0180001_QueryExaminee
                                    _IStartFlag="2"
                                    _IDate={this.formRef.current?.getFieldValue('DateFChar')?.format("YYYY/MM/DD")}
                                    _OidCode={this.formRef.current?.getFieldValue('Id')}
                                    _OConsultCourse={this.formRef.current?.getFieldValue('CourseCode')}
                                    _IOfficeCd={this.formRef.current?.getFieldValue('CompanyCode')}
                                    _IBranchStoreCd={this.formRef.current?.getFieldValue('BranchCode')}
                                    _OAcceptNum={this.formRef.current?.getFieldValue('ReceiptNumForm')}
                                    _OReserveNum={this.formRef.current?.getFieldValue('ReceiptNumT')}
                                    _OCourseLevel={this.formRef.current?.getFieldValue('CourseLevel')}
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        ReceiptNumForm: output.recordData.receipt_number,
                                        ReceiptNumFormCopy: output.recordData.receipt_number == 0 ? '' : output.recordData.receipt_number
                                      })
                                      this.checkReceiptNum(output.recordData.receipt_number, null)
                                      this.closeModal()
                                    }}
                                  />)
                              }
                            })
                        }}
                        onBlur={(e) => {
                          this.formRef.current?.setFieldsValue({
                            ReceiptNumForm: e.target.value,
                          })
                          this.checkReceiptNum(e.target.value, null)
                        }}
                      />
                    </Form.Item>
                    <label>~</label>
                    <Form.Item name="ReceiptNumTCopy" style={{ marginBottom: 0 }}>
                      <Input.Search style={{ width: '100px', textAlign: 'right' }} min={0} minLength={6}
                        onSearch={() => {
                          if (this.CompareTwoDate())
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '70%',
                                component: (<WS0180001_QueryExaminee
                                  _IStartFlag="2"
                                  _IDate={this.formRef.current?.getFieldValue('DateFChar')?.format("YYYY/MM/DD")}
                                  _OidCode={this.formRef.current?.getFieldValue('Id')}
                                  _OConsultCourse={this.formRef.current?.getFieldValue('CourseCode')}
                                  _IOfficeCd={this.formRef.current?.getFieldValue('CompanyCode')}
                                  _IBranchStoreCd={this.formRef.current?.getFieldValue('BranchCode')}
                                  _OAcceptNum={this.formRef.current?.getFieldValue('ReceiptNumForm')}
                                  _OReserveNum={this.formRef.current?.getFieldValue('ReceiptNumT')}
                                  _OCourseLevel={this.formRef.current?.getFieldValue('CourseLevel')}
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      ReceiptNumT: output.recordData.receipt_number,
                                      ReceiptNumTCopy: output.recordData.receipt_number == 0 ? '' : output.recordData.receipt_number
                                    })
                                    this.checkReceiptNum(null, output.recordData.receipt_number)
                                    this.closeModal()
                                  }}
                                />)
                              }
                            })
                        }}
                        onBlur={(e) => {
                          this.formRef.current?.setFieldsValue({
                            ReceiptNumT: e.target.value,
                          })
                          this.checkReceiptNum(null, e.target.value)
                        }}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>

                <Form.Item label="コース"  {...grid}>
                  <Space>
                    <Form.Item name="CourseCodeF" style={{ marginBottom: 0 }}>
                      <Input.Search style={{ width: '100px' }}
                        maxLength={3}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '60%',
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      CourseCodeF: output.Lo_CourseCode
                                    })
                                    this.checkCourseCode()
                                    this.closeModal()
                                  }}
                                />)
                            }
                          })
                        }}
                        onBlur={() => { this.checkCourseCode() }}
                      />
                    </Form.Item>
                    <label>~</label>
                    <Form.Item name="CourseCodeT" style={{ marginBottom: 0 }}>
                      <Input.Search style={{ width: '100px' }}
                        maxLength={3}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '60%',
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      CourseCodeT: output.Lo_CourseCode
                                    })
                                    this.checkCourseCode()
                                    this.closeModal()
                                  }}
                                />)
                            }
                          })
                        }}
                        onBlur={() => { this.checkCourseCode() }}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="事業所"  {...grid}>
                  <Space>
                    <Form.Item name="CompanyCode" style={{ marginBottom: 0 }}>
                      <Input.Search style={{ width: '120px', textAlign: 'right' }} min={0} minLength={5}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (<WS0247001_OfficeInfoRetrievalQuery
                                Lio_OfficeCode={this.formRef.current?.getFieldValue("CompanyCode")}
                                Lio_BranchStoreCode={this.formRef.current?.getFieldValue("BranchCode")}
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    CompanyCode: output.Lio_OfficeCode,
                                    BranchCode: output.Lio_BranchStoreCode,
                                    BranchCodeCopy: output.Lio_BranchStoreCode === 0 ? '' : output.Lio_BranchStoreCode
                                  })

                                  this.closeModal()
                                }}
                              />)
                            }
                          })
                        }}
                        onBlur={(e) => {
                          this.formRef.current?.setFieldsValue({
                            CompanyCode: e.target.value,
                          })

                          if (!e.target.value) {
                            this.formRef.current?.setFieldsValue({
                              BranchCode: '',
                              BranchCodeCopy: ''
                            })
                          }
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="BranchCodeCopy" style={{ marginBottom: 0 }}>
                      <Input.Search style={{ width: '80px', marginLeft: '0.2em', textAlign: 'right' }} min={0}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (<WS0247001_OfficeInfoRetrievalQuery
                                Lio_OfficeCode={this.formRef.current?.getFieldValue("CompanyCode")}
                                Lio_BranchStoreCode={this.formRef.current?.getFieldValue("BranchCode")}
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    CompanyCode: output.Lio_OfficeCode,
                                    BranchCode: output.Lio_BranchStoreCode,
                                    BranchCodeCopy: output.Lio_BranchStoreCode === 0 ? '' : output.Lio_BranchStoreCode
                                  })

                                  this.closeModal()
                                }}
                              />)
                            }
                          })
                        }}
                        onBlur={(e) => {
                          this.formRef.current?.setFieldsValue({
                            BranchCode: e.target.value,
                            BranchCodeCopy: e.target.value == 0 ? '' : e.target.value
                          })
                        }}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name="FacilityType" label="施設" {...grid}>
                  <Select>
                    {this.state.FacilityType?.map(value => (
                      <Select.Option key={'FacilityType' + Math.random()} value={value.LinkedField}>{value.DislayField}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <div style={{ margin: '20px 0', textAlign: 'right' }}>
                  <Space>
                    <Button
                      style={{ color: Color(this.state.Expression_39).Foreground }}
                      icon={<PlusCircleOutlined style={{ color: '#08c' }} />}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '60%',
                            component: (
                              <WS2786001_ConditionAddSub
                                Li_DateF={this.formRef.current?.getFieldValue("DateFChar")}
                                Li_DateT={this.formRef.current?.getFieldValue("DateTChar")}
                                Li_AcceptNoF={this.formRef.current?.getFieldValue("ReceiptNumForm")}
                                Li_AcceptNoT={this.formRef.current?.getFieldValue("ReceiptNumT")}
                                Li_CourseF={this.formRef.current?.getFieldValue("CourseCodeF")}
                                Li_CourseT={this.formRef.current?.getFieldValue("CourseCodeT")}
                                Li_FacilityType={this.formRef.current?.getFieldValue("FacilityType")}
                                Li_State="1"
                                Li_Office={this.formRef.current?.getFieldValue("CompanyCode")}
                                Li_BranchShop={this.formRef.current?.getFieldValue("BranchCode")}
                                Lio_KeyInfo={this.formRef.current?.getFieldValue("KeyNum")}

                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    KeyNum: output.Lio_KeyInfo,
                                    // CourseCodeF: output.recordData.CourseCodeF,
                                    // CourseCodeT: output.recordData.CourseCodeT
                                  })
                                  this.setState({
                                    Expression_39: output.Expression_36
                                  })
                                  this.closeModal()
                                }}
                              />)
                          }
                        })
                      }} >条件追加
                    </Button>
                    <Button
                      icon={<SearchOutlined />}
                      style={{ color: Color(163).Foreground }}
                      onClick={() => { this.getDataTableBySearch() }}
                    >検　　索
                    </Button>
                  </Space>
                </div>
                <hr />

                <div style={{ marginTop: 20, textAlign: 'right' }}>
                  <Button type="primary"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 300,
                          component: (
                            <WS0817008_Verification
                              Lio_ReplacementInstructions={this.formRef.current?.getFieldValue("ReplacementInstructions")}
                              Lio_StsHierarchical={this.formRef.current?.getFieldValue("Tiering") === 1 ? true : false}

                              onFinishScreen={(output) => {
                                if (output.Lo_StsRun) {
                                  this.formRef.current?.setFieldsValue({
                                    ReplacementInstructions: output.Lio_ReplacementInstructions,
                                    Tiering: output.Lio_StsHierarchical ? 1 : 0,
                                    JudgeStart: output.Lo_StsRun
                                  })
                                  if (this.state.selectedRowKeys.length > 0) {
                                    this.verification()
                                  } else {
                                    Modal.info({
                                      width: 300,
                                      title: '一括判定を終了しました',
                                      onOk: () => {

                                      }
                                    })
                                  }
                                }
                                this.closeModal()
                              }}
                            />)
                        }
                      })
                    }}
                  >実行</Button>
                </div>
              </Card>
            </Col>
            <Col style={{ width: 'calc(100% - 362px' }}>
              <Card style={{ height: '100%' }}>
                <Table
                  size="small"
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={false}
                  bordered={true}
                  rowKey={(record) => record.W1_id}
                  scroll={{ x: 1100, y: 600 }}
                  rowSelection={{
                    type: 'checkbox',
                    fixed: 'left',
                    selectedRowKeys: this.state.selectedRowKeys,
                    onChange: async (selectedRowKeys, selectedRows) => {
                      await this.setState({
                        selectedRows: selectedRows,
                        selectedRowKeys: selectedRows.map(x => x.W1_id),
                      });
                    }
                  }}
                >
                  <Table.Column title="受診日" dataIndex="visit_date_on" width={90} />
                  <Table.Column title="受付番号" dataIndex="receipt_number" width={80}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>
                          <span>{record.receipt_number}</span>
                        </div>
                      )
                    }} />
                  <Table.Column title="判定" dataIndex="comprehensive_judgment" width={50}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'center' }}>
                          <span style={{ color: Color(record.Expression_14).Foreground }}>{record.comprehensive_judgment}</span>
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="メタボ" dataIndex="result_value_1" width={80}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>
                          <span>{value}</span>
                        </div>
                      )
                    }} />
                  <Table.Column title="階層化" dataIndex="result_value_2" width={80}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>
                          <span>{value}</span>
                        </div>
                      )
                    }} />
                  <Table.Column title="ＩＤ" dataIndex="personal_number_id" width={80}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>
                          <span>{record.personal_number_id}</span>
                        </div>
                      )
                    }} />
                  <Table.Column title="氏名" dataIndex="kanji_name" />
                  <Table.Column title="事業所" dataIndex="office_kanji_name" />
                  <Table.Column title="受診コース" dataIndex="visit_course"
                    render={(value, record, index) => {
                      return <Space>
                        <span style={{ marginRight: 5 }}>{record.visit_course?.toString().substr(0, 1) + '-' + record.visit_course?.toString().substr(1, 2)}</span>
                        <span>{record.contract_short_name}</span>
                      </Space>
                    }} />
                  <Table.Column width={70}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'center' }}>
                          <Button type='primary'
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '80%',
                                  component: (
                                    <WS2583001_ConsultInquirySub
                                      Li_ReserveNum={record.W1_reserve_num}
                                      onFinishScreen={(output) => {
                                        this.closeModal();
                                      }}
                                    />),
                                },
                              })
                            }}
                          >照会</Button>
                        </div>
                      )
                    }}
                  />
                </Table>
              </Card>
            </Col>
          </Row>
          <ModalDraggable
            width={this.state.childModal.width}
            visible={this.state.childModal.visible}
            component={this.state.childModal.component}
            bodyStyle={{ margin: 0, padding: 0 }}
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
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0817001_CollectJudge);
