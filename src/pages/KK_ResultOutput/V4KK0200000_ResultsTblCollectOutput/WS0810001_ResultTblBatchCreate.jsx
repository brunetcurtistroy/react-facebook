import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Form, Input, Button, Select, Table, Row, Col, Space, DatePicker, Modal, Popover, message, Spin, InputNumber } from "antd";

import { InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";

import WS0810025_PrintSub from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS0810025_PrintSub.jsx';
import WS0246001_InsurerInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0810036_FormInquiry from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS0810036_FormInquiry.jsx';
import ResultTblBatchCreateAction from "redux/ResultOutput/ResultsTblCollectOutput/ResultTblBatchCreate.action";
import moment from "moment-timezone";
import WS2585001_OfficeInfoInquirySub from "pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub";
import WS0286001_PrintStyleInquiry from "../OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import WS1527001_SetupResultTblCollectOutput from "./WS1527001_SetupResultTblCollectOutput";
import Color from "constants/Color";
import PrintStyleInquiryAction from "redux/ResultOutput/BindingModeSetting/PrintStyleInquiry.action";
import { download_file } from "helpers/CommonHelpers";


const styleLabel = {
  textAlign: "right",
  paddingRight: 5,
  width: 75,
  color: '#14468C',
  fontWeight: 500
};

const styleInput = {
  border: 'none'
}

const styleRow = {
  margin: 0
}

const dateFormat = 'YYYY/MM/DD';
class WS0810001_ResultTblBatchCreate extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '結果表一括作成';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: [],
      selectedRowKeys: [],
      dataSource: [],
      isLoadingTable: false,

      ComboBox_GfacilityType: [],
      ComboBox_OutputOrder: [],
      importance: 0,

      dataPrintStyle: [],
      isLoadingForm: false,
      isSelectAll: false,

      office_kanji_name: ''
    };
  }

  componentDidMount() {
    this.loadDataPrintStyle()
    this.GetDataScreen()

  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadDataPrintStyle()
      this.GetDataScreen()
    }
  }

  GetDataScreen() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      IssueStartDateChar: this.formRef.current?.getFieldValue('IssueStartDateChar')?.format('YYYY/MM/DD'),
      IssueEndDateChar: this.formRef.current?.getFieldValue('IssueEndDateChar')?.format('YYYY/MM/DD')
    }
    this.setState({ isLoadingForm: true })
    ResultTblBatchCreateAction.GetDataScreen(params)
      .then(res => {
        if (res) {
          this.setState({
            ComboBox_GfacilityType: res?.ComboBox_GfacilityType,
            ComboBox_OutputOrder: res?.ComboBox_OutputOrder,
            isLoadingForm: false
          })

          let data = {
            ...res,
            GbranchOfficeShopCdf: res.GbranchOfficeShopCdf,
            GbranchOfficeShopCdfCopy: res.GbranchOfficeShopCdf === 0 ? null : res.GbranchOfficeShopCdf,
            ComboBox_GfacilityType: null,
            ComboBox_OutputOrder: null,
            IssueStartDateChar: moment(res?.IssueStartDateChar),
            IssueEndDateChar: moment(res?.IssueEndDateChar),
            OutputOrder: res?.ComboBox_OutputOrder.length > 0 ? res?.ComboBox_OutputOrder[0].LinkedField : null
          }
          this.formRef.current?.setFieldsValue(data)
        }
      })
      .finally(() => this.setState({ isLoadingForm: false }))
  }

  GetDataBySearch() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      IssueStartDateChar: this.formRef.current?.getFieldValue('IssueStartDateChar')?.format('YYYY/MM/DD'),
      IssueEndDateChar: this.formRef.current?.getFieldValue('IssueEndDateChar')?.format('YYYY/MM/DD'),
      GissueStartDate: this.formRef.current?.getFieldValue('IssueStartDateChar')?.format('YYYY/MM/DD'),
      GissueEndDate: this.formRef.current?.getFieldValue('IssueEndDateChar')?.format('YYYY/MM/DD')
    }

    this.setState({ isLoadingTable: true });
    ResultTblBatchCreateAction.extract_F11(params)
      .then((res) => {
        this.loadDataTable()
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false });
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  loadDataTable() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      IssueStartDateChar: this.formRef.current?.getFieldValue('IssueStartDateChar')?.format('YYYY/MM/DD'),
      IssueEndDateChar: this.formRef.current?.getFieldValue('IssueEndDateChar')?.format('YYYY/MM/DD'),
      GissueStartDate: this.formRef.current?.getFieldValue('IssueStartDateChar')?.format('YYYY/MM/DD'),
      GissueEndDate: this.formRef.current?.getFieldValue('IssueEndDateChar')?.format('YYYY/MM/DD')
    }
    ResultTblBatchCreateAction.choice(params)
      .then(res => {
        if (res) {
          let data = res.filter(x => x.Issuing)
          this.setState({
            dataSource: res,
            isLoadingTable: false,
            selectedRows: data,
            selectedRowKeys: data.map(x => x.id)
          });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  selectRecord(id, value) {
    let params = {
      id: id,
      Issuing: value ? 1 : 0
    }

    ResultTblBatchCreateAction.select_one(params)
      .then((res) => {
        this.loadDataTable()
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

  selectAll(value) {
    let params = {
      StsSelectAll: value ? 1 : 0
    }
    ResultTblBatchCreateAction.select_all(params)
      .then((res) => {
        this.loadDataTable()
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

  printF12(data) {
    this.setState({isLoadingPrint: true});
    let params = {
      OutputData: data.Lo_StsRun ? 1 : 0,
      StsScreenControl: data.StsScreenControl ? 1 : 0,
      PrinterNum: data.PrinterNo,
      NumCopies: data.NumOfCopies,
      Submission: data.StsSubmission ? 1 : 0,
      GpreviewBool: data.Preview ? 1 : 0,
      OrgsTowards: data.Groups,
      InputFlag: data.Division,
      L2Output: data.StsL2 ? 1 : 0,
      L3Output: data.StsL3 ? 1 : 0,
    }
    ResultTblBatchCreateAction.print_F12(params)
      .then(res => {
        download_file(res);
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({isLoadingPrint: false}));
  }

  onFinish(values) {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Style: values.GformType,
        PrinterNo: values.PrinterNum,
        Preview: values.GpreviewBool,
        NumOfCopies: values.NumOfCopies,
        Groups: values.OrgsToward,
        Division: values.InputFlag,
        StsL2: values.L2Output ? 1 : 0,
        StsL3: values.L3Output ? 1 : 0,
        StsScreenControl: values.StsScreenControl ? 1 : 0,
        StsSubmission: values.Submission ? 1 : 0,
      })
    }
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

  loadDataPrintStyle() {
    PrintStyleInquiryAction.GetListData()
      .then(res => {
        this.setState({ dataPrintStyle: res })
      })
  }

  getNamePrintStyle(id, W1_style_cd_1) {
    let data = this.state.dataPrintStyle.filter(x => x.style_code === W1_style_cd_1)
    let index = this.findIndexByID(this.state.dataSource, id)
    this.updateDatasource(index, "W1_style_cd_1", data.length > 0 ? data[0].style_code : W1_style_cd_1)
    this.updateDatasource(index, "format_name", data.length > 0 ? data[0].format_name : '')
  }

  getNameOffice(value) {
    if (value) {
      let params = {
        GofficeCd: this.formRef.current?.getFieldValue('GofficeCd'),
        GbranchOfficeShopCdf: this.formRef.current?.getFieldValue('GbranchOfficeShopCdf')
      }
      ResultTblBatchCreateAction.getNameOffice(params)
        .then((res) => {
          this.formRef.current?.setFieldsValue({
            office_kanji_name: res?.data?.office_kanji_name
          })
          this.setState({
            office_kanji_name: res?.data?.office_kanji_name
          })
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
  }

  getNameType(value) {
    if (value) {
      let params = {
        GformType: this.formRef.current?.getFieldValue('GformType'),
      }
      ResultTblBatchCreateAction.getNameType(params)
        .then((res) => {
          this.formRef.current?.setFieldsValue({
            Expresstion_70: res?.data?.Expresstion_70
          })
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
  }

  getNameKanshocd(value) {
    if (value) {
      let params = {
        KanshoCd: this.formRef.current?.getFieldValue('KanshoCd'),
      }
      ResultTblBatchCreateAction.getNameKanshocd(params)
        .then((res) => {
          this.formRef.current?.setFieldsValue({
            insurer_kanji_name: res?.data?.insurer_kanji_name
          })
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
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  showModalOfficeInfoInquirySub() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2585001_OfficeInfoInquirySub
            Li_OfficeCode={this.formRef.current?.getFieldValue("GofficeCd")}
            Li_BranchCode={this.formRef.current?.getFieldValue("GbranchOfficeShopCdf")}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  render() {
    return (
      <div className="result-tbl-batch-create">
        <Card title="結果表一括作成">
          <Spin spinning={this.state.isLoadingForm}>
            <Space >
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '80%',
                      component:
                        <WS1527001_SetupResultTblCollectOutput
                          onFinishScreen={(ouput) => {
                            this.closeModal()
                          }} />
                    },
                  });
                }}>
                結果表一括設定
              </Button>
              <Button
                onClick={() => {
                  // if (this.state.isSelectAll) {
                  this.GetDataBySearch()
                  // }
                }}
                loading={this.state.isLoadingTable}
              >
                抽出
              </Button>
              <Button
                loading={this.state.isLoadingPrint}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 600,
                      component:
                        <WS0810025_PrintSub
                          Style={this.formRef.current?.getFieldValue("GformType")}
                          PrinterNo={this.formRef.current?.getFieldValue("PrinterNum")}
                          Preview={this.formRef.current?.getFieldValue("GpreviewBool")}
                          NumOfCopies={this.formRef.current?.getFieldValue("NumOfCopies")}
                          Groups={0}
                          Division={this.formRef.current?.getFieldValue("InputFlag")}
                          StsL2={this.formRef.current?.getFieldValue("L2Output")}
                          StsL3={this.formRef.current?.getFieldValue("L3Output")}
                          StsSubmission={this.formRef.current?.getFieldValue("Submission")}
                          onFinishScreen={(output) => {
                            if (output.Lo_StsRun) {
                              this.printF12(output)
                            }
                            this.closeModal()
                          }}
                        />
                    },
                  });
                }}>
                印刷
              </Button>
            </Space>
            <hr style={{ margin: '15px 0' }} />
            <div>
              <Row gutter={24}>
                <Col xl={7} lg={24} style={{ borderRight: '1px solid #d9d9d9', marginBottom: 15 }}>
                  <Form
                    ref={this.formRef}
                    onFinish={this.onFinish}
                  >
                    <Row gutter={24} style={styleRow}>
                      <label style={styleLabel}>保険者</label>
                      <Form.Item name="KanshoCd" style={{ width: 135, marginRight: 5 }}>
                        <Input.Search type='number' style={{ textAlign: "right" }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '70%',
                                component: (
                                  <WS0246001_InsurerInfoSearchQuery
                                    onFinishScreen={({ Lo_InsurerCode, Lo_Name }) => {
                                      this.formRef.current.setFieldsValue({
                                        KanshoCd: Lo_InsurerCode === 0 ? null : Lo_InsurerCode,
                                        insurer_kanji_name: Lo_Name
                                      });
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.formRef.current?.setFieldsValue({
                              insurer_kanji_name: ''
                            })
                            this.setState({ importance: 0 })
                          }}
                          onBlur={(e) => {
                            this.getNameKanshocd(e.target.value)
                          }}
                        />
                      </Form.Item>
                      <Form.Item name="insurer_kanji_name" style={{ width: 'calc(100% - 215px)' }}>
                        <Input readOnly style={styleInput} />
                      </Form.Item>
                    </Row>
                    <Row gutter={24} style={styleRow}>
                      <label style={styleLabel}>事業所</label>
                      <Form.Item name="GofficeCd" style={{ width: 100, marginRight: 2 }}>
                        <Input.Search style={{ cursor: 'pointer' }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '90%',
                                component: (
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    Lio_OfficeCode={this.formRef.current?.getFieldValue('GofficeCd')}
                                    Lio_BranchStoreCode={this.formRef.current?.getFieldValue('GbranchOfficeShopCdf')}
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        GofficeCd: output.Lio_OfficeCode,
                                        GbranchOfficeShopCdf: output.Lio_BranchStoreCode,
                                        GbranchOfficeShopCdfCopy: output.Lio_BranchStoreCode === 0 ? null : output.Lio_BranchStoreCode,
                                        office_kanji_name: output.Lo_Kanji_Name
                                      });
                                      this.setState({
                                        importance: output.recordData.importance,
                                        office_kanji_name: output.Lo_Kanji_Name
                                      })
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onBlur={(e) => {
                            this.getNameOffice(e.target.value)
                            this.setState({
                              importance: 0,
                              office_kanji_name: ''
                            })
                          }} />
                      </Form.Item>
                      <Form.Item name="GbranchOfficeShopCdf" hidden><Input /></Form.Item>
                      <Form.Item name="GbranchOfficeShopCdfCopy" style={{ width: 80 }} >
                        <Input.Search type='number' style={{ textAlign: "right" }}
                          maxLength={5}
                          disabled={!this.formRef.current?.getFieldValue("GofficeCd")}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '90%',
                                component: (
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    Lio_OfficeCode={this.formRef.current?.getFieldValue('GofficeCd')}
                                    Lio_BranchStoreCode={this.formRef.current?.getFieldValue('GbranchOfficeShopCdf')}
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        GofficeCd: output.Lio_OfficeCode,
                                        GbranchOfficeShopCdf: output.Lio_BranchStoreCode,
                                        GbranchOfficeShopCdfCopy: output.Lio_BranchStoreCode === 0 ? null : output.Lio_BranchStoreCode,
                                        office_kanji_name: output.Lo_Kanji_Name
                                      });
                                      this.setState({
                                        importance: output.recordData.importance,
                                        office_kanji_name: output.Lo_Kanji_Name
                                      })
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.formRef.current?.setFieldsValue({
                              GbranchOfficeShopCdf: e.target.value,
                              GbranchOfficeShopCdfCopy: e.target.value === 0 ? null : e.target.value,
                              office_kanji_name: ''
                            })
                            this.setState({
                              importance: 0,
                              office_kanji_name: ''
                            })
                          }}

                          onBlur={(e) => {
                            this.getNameOffice(e.target.value)
                          }} />
                      </Form.Item>
                      <div style={{ width: 20, marginRight: 2 }}>
                        {this.state.importance === 1 ?
                          <div><InfoCircleOutlined style={{ color: '#1890ff', cursor: 'pointer', padding: '0 5px', fontSize: '24px' }}
                            onClick={() => {
                              this.showModalOfficeInfoInquirySub()
                            }} />
                          </div>
                          :
                          this.state.importance === 3 ?
                            <div><WarningOutlined style={{ color: '#faad14', cursor: 'pointer', padding: '0 5px', fontSize: '24px' }}
                              onClick={() => {
                                this.showModalOfficeInfoInquirySub()
                              }} />
                            </div>
                            :
                            this.state.importance === 5 ?
                              <div><CloseCircleOutlined style={{ color: '#ff4d4f', cursor: 'pointer', padding: '0 5px', fontSize: '24px' }}
                                onClick={() => {
                                  this.showModalOfficeInfoInquirySub()
                                }} />
                              </div>
                              :
                              <Button disabled={!this.formRef.current?.getFieldValue('GofficeCd')}
                                size='small'
                                style={{ width: 20, padding: 0 }}
                                onClick={() => {
                                  this.showModalOfficeInfoInquirySub()
                                }}
                              ><MoreOutlined /></Button>
                        }
                      </div>
                      <Popover content={this.state.office_kanji_name}>
                        <Form.Item name="office_kanji_name" style={{ width: 'calc(100% - 280px)' }}>
                          <Input type="text" readOnly style={{ cursor: 'pointer', border: 'none' }} />
                        </Form.Item>
                      </Popover>
                    </Row>

                    <Row gutter={24} style={styleRow}>
                      <label style={styleLabel}>受診日</label>
                      <Form.Item name="IssueStartDateChar" style={{ width: 111 }}>
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} allowClear={false} />
                      </Form.Item>
                      <span style={{ width: 15, textAlign: "center" }}>~</span>
                      <Form.Item name="IssueEndDateChar" style={{ width: 111 }}>
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} allowClear={false} />
                      </Form.Item>
                    </Row>
                    <Row gutter={24} style={styleRow}>
                      <label style={styleLabel}>施設区分</label>
                      <Form.Item name="GfacilityType" style={{ width: 130 }} s>
                        <Select style={{ width: '100%' }}>
                          {this.state.ComboBox_GfacilityType.map((item, index) => (
                            <Select.Option key={index} value={item.LinkedField}>{item.DisplayField}</Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Row>
                    <Row gutter={24} style={styleRow}>
                      <label style={styleLabel}>出力様式</label>
                      <Form.Item name="GformType" style={{ width: 90, marginRight: 5 }}>
                        <Input.Search maxLength={4}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '35%',
                                component: (
                                  <WS0810036_FormInquiry
                                    Lio_Style={this.formRef.current?.getFieldValue("GformType")}
                                    onFinishScreen={({ Lio_Style, Lo_Name }) => {
                                      this.formRef.current.setFieldsValue({
                                        GformType: Lio_Style,
                                        Expresion_70: Lo_Name
                                      });
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}

                          onChange={(e) => {
                            this.formRef.current.setFieldsValue({
                              Expresion_70: ''
                            });
                          }}

                          onBlur={(e) => {
                            this.getNameType(e.target.value)
                          }}
                        />
                      </Form.Item>
                      <Form.Item name="Expresion_70" style={{ width: 'calc(100% - 170px)' }}>
                        <Input type="text" readOnly style={styleInput} />
                      </Form.Item>
                    </Row>
                    <Row gutter={24} style={styleRow}>
                      <label style={styleLabel}>出力順番</label>
                      <Form.Item name="OutputOrder" style={{ width: 130 }}>
                        <Select style={{ width: '100%' }}>
                          {this.state.ComboBox_OutputOrder?.map((item, index) => (
                            <Select.Option key={index} value={item.LinkedField}>{item.DisplayField}</Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Row>
                    <Form.Item >
                      <Button
                        loading={this.state.isLoadingTable}
                        type='primary'
                        style={{ float: 'right' }}
                        onClick={() => {
                          this.GetDataBySearch()
                        }}
                      ><SearchOutlined />検　　索
                      </Button>

                    </Form.Item>
                    <hr />
                    <Form.Item style={{ textAlign: 'right' }}>
                      <Button type="primary"
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 600,
                              component: (
                                <WS0810025_PrintSub
                                  Style={this.formRef.current?.getFieldValue("GformType")}
                                  PrinterNo={this.formRef.current?.getFieldValue("PrinterNum")}
                                  Preview={this.formRef.current?.getFieldValue("GpreviewBool")}
                                  NumOfCopies={this.formRef.current?.getFieldValue("NumOfCopies")}
                                  Groups={0}
                                  Division={this.formRef.current?.getFieldValue("InputFlag")}
                                  StsL2={this.formRef.current?.getFieldValue("L2Output")}
                                  StsL3={this.formRef.current?.getFieldValue("L3Output")}
                                  StsSubmission={this.formRef.current?.getFieldValue("Submission")}
                                  onFinishScreen={(output) => {
                                    if (output.Lo_StsRun) {
                                      this.printF12(output)
                                    }
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }} >印刷</Button>
                    </Form.Item>
                  </Form>
                </Col>
                <Col xl={17} lg={24}>
                  <Table
                    size='small'
                    className="scrollbar"
                    dataSource={this.state.dataSource}
                    loading={this.state.isLoadingTable}
                    pagination={true}
                    bordered
                    rowKey={(record) => record.id}
                    scroll={{ x: 1050, y: 700 }}
                    rowSelection={{
                      type: 'checkbox',
                      selectedRowKeys: this.state.selectedRowKeys,
                      onSelect: (record, selected, selectedRows, nativeEvent) => {
                        let arrTemp = [...this.state.selectedRowKeys];
                        let arrTempRecord = [...this.state.selectedRows];
                        let idx = arrTemp.indexOf(record.id);
                        if (idx === -1) {
                          arrTemp.push(record.id);
                          arrTempRecord.push(record)
                          this.setState({
                            selectedRowKeys: arrTemp,
                            selectedRows: arrTempRecord
                          });
                        } else {
                          arrTemp.splice(idx, 1);
                          arrTempRecord.splice(idx, 1);
                          this.setState({
                            selectedRowKeys: arrTemp,
                            selectedRows: arrTempRecord
                          });
                        }
                        // this.selectRecord(record.id, selected)
                      },

                      onSelectAll: (selected, selectedRows, changeRows) => {
                        // this.selectAll(selected)
                        if (selected) {
                          let arrTemp = this.state.dataSource.map(item => item.id);
                          let arrTempRecord = this.state.dataSource;
                          this.setState({
                            selectedRowKeys: arrTemp,
                            selectedRows: arrTempRecord,
                            isSelectAll: true
                          });
                        } else {
                          this.setState({
                            selectedRowKeys: [],
                            selectedRows: [],
                            isSelectAll: false
                          });
                        }
                      },
                    }}
                  >
                    <Table.Column title="受　診　日" dataIndex="W1_reserve_date" width={90} />
                    <Table.Column title="受付番号" dataIndex="receipt_number" width={80}
                      render={(value, record, index) => {
                        return (
                          <div style={{ textAlign: 'right' }}>
                            <span>{record.receipt_number}</span>
                          </div>
                        )
                      }} />
                    <Table.Column title="判定" dataIndex="comprehensive_judgment" width={40} align='center' />
                    <Table.Column title="ﾒﾓ" dataIndex="Expression_17" width={35} align='center'
                      render={(value, record, index) => {
                        let icon = "";
                        switch (record.Expresstion_17) {
                          case 1: icon = (<InfoCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />);
                            break;
                          case 3: icon = (<WarningOutlined style={{ fontSize: 20, color: "#faad14" }} />);
                            break;
                          case 5: icon = (<CloseCircleOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />);
                            break;
                          default: icon = (<Button size='small' icon={<MoreOutlined />}></Button>);
                        }
                        return (
                          <div style={{ textAlign: "center", cursor: 'pointer' }}
                            onClick={() => {
                              let title = '個人情報照会SUB' + ' [' + record.W1_id_cd + ']'
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '90%',
                                  component: (
                                    <Card title={title}>
                                      <WS2584019_PersonalInfoInquirySub
                                        Li_PersonalNum={record.W1_id_cd}
                                        onClick={() => {
                                          this.setState({
                                            childModal: {
                                              ...this.state.childModal,
                                              visible: false,
                                            },
                                          });
                                        }}
                                      />
                                    </Card>
                                  ),
                                },
                              })
                            }}>
                            {icon}
                          </div>
                        );
                      }}
                    />
                    <Table.Column title="氏　　名" dataIndex="kanji_name" width={140} />
                    <Table.Column title="性別" dataIndex="Expresstion_4" width={35} align='center' />
                    <Table.Column title="受診コース"
                      render={(value, record, index) => {
                        return (
                          <div>
                            <span style={{ marginRight: 5 }}>
                              {record.W1_visits_courses ? (record.W1_visits_courses?.toString().substr(0, 1) + '-' + record.W1_visits_courses?.toString().substr(1, 2)) : ''}
                            </span>
                            <span>{record.contract_short_name}</span>
                          </div>
                        )
                      }}
                    />
                    <Table.Column title="様式1" dataIndex="W1_style_cd_1" width={50}
                      render={(value, record, index) => {
                        return (
                          <div >
                            <Input value={record.W1_style_cd_1} maxLength={3}
                              onDoubleClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: '600px',
                                    component: (
                                      <WS0286001_PrintStyleInquiry
                                        Lio_StyleCode={record.W1_style_cd_1}
                                        onFinishScreen={(output) => {
                                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_style_cd_1", output.Lio_StyleCode)
                                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "format_name", output.Lo_FormatName)
                                          this.closeModal()
                                        }}
                                      />
                                    ),
                                  },
                                })
                              }}
                              onChange={(event) => {
                                this.getNamePrintStyle(record.id, event.target.value)
                              }}
                            />
                          </div>
                        )
                      }}
                    />
                    <Table.Column title="様  式  名  称" dataIndex="format_name" />
                    <Table.Column title="様式2" dataIndex="W1_style_cd_2" width={50}
                      render={(value, record, index) => {
                        return (
                          <div >
                            <Input value={record.W1_style_cd_2} maxLength={3}
                              onDoubleClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: '600px',
                                    component: (
                                      <WS0286001_PrintStyleInquiry
                                        Lio_StyleCode={record.W1_style_cd_2}
                                        onFinishScreen={(output) => {
                                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_style_cd_2", output.Lio_StyleCode)
                                          this.closeModal()
                                        }}
                                      />
                                    ),
                                  },
                                })
                              }}
                              onChange={(event) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_style_cd_2", event.target.value)
                              }}
                            />
                          </div>
                        )
                      }} />
                    <Table.Column title="様式3" dataIndex="W1_style_cd_3" width={50}
                      render={(value, record, index) => {
                        return (
                          <div >
                            <Input value={record.W1_style_cd_3} maxLength={3}
                              onDoubleClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: '600px',
                                    component: (
                                      <WS0286001_PrintStyleInquiry
                                        Lio_StyleCode={record.W1_style_cd_3}
                                        onFinishScreen={(output) => {
                                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_style_cd_3", output.Lio_StyleCode)
                                          this.closeModal()
                                        }}
                                      />
                                    ),
                                  },
                                })
                              }}
                              onChange={(event) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_style_cd_3", event.target.value)
                              }}
                            />
                          </div>
                        )
                      }} />
                    <Table.Column title="様式4" dataIndex="W1_style_cd_4" width={50}
                      render={(value, record, index) => {
                        return (
                          <div >
                            <Input value={record.W1_style_cd_4} maxLength={3}
                              onDoubleClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: '600px',
                                    component: (
                                      <WS0286001_PrintStyleInquiry
                                        Lio_StyleCode={record.W1_style_cd_4}
                                        onFinishScreen={(output) => {
                                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_style_cd_4", output.Lio_StyleCode)
                                          this.closeModal()
                                        }}
                                      />
                                    ),
                                  },
                                })
                              }}
                              onChange={(event) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_style_cd_4", event.target.value)
                              }}
                            />
                          </div>
                        )
                      }} />
                    {/* <Table.Column width={50} align='center'
                      render={(value, record, index) => {
                        return (
                          <Button type="primary"
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '600px',
                                  component: (
                                    <WS0246001_InsurerInfoSearchQuery
                                      onClick={() => {
                                        this.closeModal()
                                      }}
                                    />
                                  ),
                                },
                              })
                            }} >照会</Button>
                        )
                      }}
                    /> */}
                  </Table>
                </Col>
              </Row>
            </div>
          </Spin>
        </Card>
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0810001_ResultTblBatchCreate);
