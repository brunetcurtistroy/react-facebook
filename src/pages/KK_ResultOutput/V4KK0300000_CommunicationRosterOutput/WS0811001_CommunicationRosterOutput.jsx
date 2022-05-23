import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Select, Button, Table, Row, Col, Space, Menu, Dropdown, InputNumber, Spin, message } from "antd";
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import WS0811004_StyleQuery from 'pages/KK_ResultOutput/V4KK0300000_CommunicationRosterOutput/WS0811004_StyleQuery.jsx';
import WS0246001_InsurerInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS0433001_PrinterConfirm from 'pages/SK_IntroductionLetter/V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm.jsx';
import WS2583001_ConsultInquirySub from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub.jsx';
import CommunicationRosterOutputAction from 'redux/ResultOutput/CommunicationRosterOutput/CommunicationRosterOutput.action'
import WS0855001_PrintParamMaintain from "../V4KK0012000_PrintParamMaintain/WS0855001_PrintParamMaintain";
import WS1512001_OptionalInfoMaintain from "pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512001_OptionalInfoMaintain";
import WS2787004_AffiliationSelectSub from "../V4TO0005000_RomotoArticle52/WS2787004_AffiliationSelectSub";
import moment from "moment-timezone";
import Color from "constants/Color";
import ModalDraggable from "components/Commons/ModalDraggable";

const customStyle = {
  labelStyle: {
    fontWeight: 'bold',
    color: '#14468C',
    width: 60,
    paddingRight: 5,
    textAlign: 'right'
  }
}
class WS0811001_CommunicationRosterOutput extends React.Component {
  static propTypes = {
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '連名簿出力';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      OutputOrder_List: [],
      ExtractCondition_List: [],
      OrgsTowards_List: [],

      isLoadingForm: false,

      GbelongF: null,
      GbelongT: null,
      GofficeF: '',
      GbranchStoreF: null,
      GkanshoF: null,
      GreceiptNumF: null,
      GreceiptNumT: null,
      format_name: '',
      GstyleCode: '',
      GseeOffice: '',

      dataSource: [],
      isLoadingTable: false,
      selectedRows: [],
      selectedRowKeys: [],

      Expression_89: true // enable Belongs
    };
    this.onFinish = this.onFinish.bind(this)
  }

  componentDidMount() {
    this.getScreenData()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getScreenData()
    }
  }

  getScreenData() {
    this.setState({ isLoadingForm: true })
    CommunicationRosterOutputAction.getScreenData()
      .then(res => {
        let data = res ? res.data : {}
        this.setState({
          isLoadingForm: false,
          GbelongF: data.GbelongF,
          GbelongT: data.GbelongT,
          GofficeF: data.GofficeF,
          GbranchStoreF: data.GbranchStoreF,
          GkanshoF: data.GkanshoF,
          GreceiptNumF: data.GreceiptNumF,
          GreceiptNumT: data.GreceiptNumT,
          GstyleCode: data.GstyleCode,
          format_name: data.format_name,
          GseeOffice: data.GseeOffice,
          OutputOrder_List: data.OutputOrder_List,
          ExtractCondition_List: data.ExtractCondition_List,
          OrgsTowards_List: data.OrgsTowards_List,
          Expression_89: data.Expression_89,
          GkanshoT: data.GkanshoT,
          GofficeT: data.GofficeT,
          GbranchStoreT: data.GbranchStoreT,
          ChestFilmNo: data.ChestFilmNo,
          MunicipalityExpand: data.MunicipalityExpand,
          MunicipalityCd: data.MunicipalityCd,
          GastricFilmNo: data.GastricFilmNo,
        })

        data.ExtractCondition = ''
        data.GbelongF = data.GbelongF === 0 ? '' : data.GbelongF
        data.GbelongT = data.GbelongT === 0 ? '' : data.GbelongT
        data.GbranchStoreF = data.GbranchStoreF === 0 ? '' : data.GbranchStoreF
        data.GkanshoF = data.GkanshoF === 0 ? '' : data.GkanshoF
        data.GreceiptNumF = data.GreceiptNumF === 0 ? '' : data.GreceiptNumF
        data.GreceiptNumT = data.GreceiptNumT === 0 ? '' : data.GreceiptNumT
        data.DateFChar = (data.DateFChar === '0000/00/00' || !data.DateFChar) ? null : moment(data.DateFChar)
        data.DateTChar = (data.DateTChar === '0000/00/00' || !data.DateTChar) ? null : moment(data.DateTChar)

        this.formRef.current?.setFieldsValue(data)
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

  retrieval() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateFChar: this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : '',
      DateTChar: this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : '',
      GbelongF: this.state.GbelongF,
      GbelongT: this.state.GbelongT,
      GbranchStoreF: this.state.GbranchStoreF,
      GkanshoF: this.state.GkanshoF,
      GreceiptNumF: this.state.GreceiptNumF,
      GreceiptNumT: this.state.GreceiptNumT,
    }

    this.setState({ isLoadingForm: true })

    CommunicationRosterOutputAction.retrieval(params)
      .then(res => {
        this.getDataIssueList()
        this.setState({ isLoadingForm: false })
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

  getDataIssueList() {
    if (!this.formRef.current?.getFieldValue('DateTChar') && this.formRef.current?.getFieldValue('DateFChar')) {
      this.formRef.current?.setFieldsValue({
        DateTChar: this.formRef.current?.getFieldValue('DateFChar')
      })
    }

    if (this.formRef.current?.getFieldValue('DateTChar') && !this.formRef.current?.getFieldValue('DateFChar')) {
      this.formRef.current?.setFieldsValue({
        DateFChar: this.formRef.current?.getFieldValue('DateTChar')
      })
    }

    let params = {
      ...this.formRef.current?.getFieldValue(),
      ExtractCondition_List: [],
      OrgsTowards_List: [],
      OutputOrder_List: [],
      DateFChar: this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : '',
      DateTChar: this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : '',
      GdateF: this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : '',
      GdateT: this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : '',
      GbelongF: this.state.GbelongF,
      GbelongT: this.state.GbelongT,
      GbranchStoreF: this.state.GbranchStoreF,
      GkanshoF: this.state.GkanshoF,
      GreceiptNumF: this.state.GreceiptNumF,
      GreceiptNumT: this.state.GreceiptNumT,
    }

    this.setState({ isLoadingTable: true })

    CommunicationRosterOutputAction.getDataIssueList(params)
      .then(res => {
        let data = res.data.filter(x => x.W1_output_flg)
        this.setState({
          dataSource: res.data,
          isLoadingTable: false,
          selectedRows: data,
          selectedRowKeys: data.map(x => x.id)
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
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  onPrint() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateFChar: this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : '',
      DateTChar: this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : '',
      GdateF: this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : '',
      GdateT: this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : '',
      GbelongF: this.state.GbelongF,
      GbelongT: this.state.GbelongT,
      GbranchStoreF: this.state.GbranchStoreF,
      GkanshoF: this.state.GkanshoF,
      GreceiptNumF: this.state.GreceiptNumF,
      GreceiptNumT: this.state.GreceiptNumT,
    }
    CommunicationRosterOutputAction.print(params)
      .then(res => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 400,
            component: (<WS0433001_PrinterConfirm
              Li_PreviewSpecifiedValue={res.data.variables.Li_PreviewSpecifiedValue}
              Li_PrinterNoSpecifiedValue={res.data.variables.Li_PrinterNoSpecifiedValue}
              Lo_Preview={res.data.variables.Lo_Preview}
              Lo_PrinterNo={res.data.variables.Lo_PrinterNo}
              Lo_StsOutput={res.data.variables.Lo_StsOutput}
              onFinishScreen={(output) => {
                this.onPrintAfter(output)
                this.closeModal()
              }}
            />)
          }
        });
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
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  onPrintAfter(data) {
    let params = {
      GstyleCode: this.formRef.current?.getFieldValue('GstyleCode') ?? "",
      GofficeF: this.formRef.current?.getFieldValue('GofficeF') ?? "",
      GofficeT: this.state.GofficeT,
      GbranchStoreT: this.state.GbranchStoreT,
      GvisitsCourseF: this.formRef.current?.getFieldValue('GvisitsCourseF') ?? "",
      GvisitsCourseT: this.formRef.current?.getFieldValue('GvisitsCourseT') ?? "",
      OutputOrder: this.formRef.current?.getFieldValue('OutputOrder') ?? '',
      ExtractCondition: this.formRef.current?.getFieldValue('ExtractCondition') ?? 0,
      GseeOffice: this.state.GseeOffice,
      MunicipalityExpand: this.state.MunicipalityExpand,
      MunicipalityCd: this.state.MunicipalityCd,
      GkanshoT: this.state.GkanshoT,
      ChestFilmNo: this.state.ChestFilmNo,
      GastricFilmNo: this.state.GastricFilmNo,
      OrgsTowards: this.formRef.current?.getFieldValue('OrgsTowards') ? this.formRef.current?.getFieldValue('OrgsTowards') : '',
      GdateF: this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : '',
      GdateT: this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : '',
      GbelongF: this.state.GbelongF,
      GbelongT: this.state.GbelongT,
      GbranchStoreF: this.state.GbranchStoreF,
      GkanshoF: this.state.GkanshoF,
      GreceiptNumF: this.state.GreceiptNumF,
      GreceiptNumT: this.state.GreceiptNumT,
      Sys010Status: data.Lo_StsOutput,
      PreviewIndicationBool: data.Lo_Preview,
      PrinterNum: data.Lo_PrinterNo,
    }
    CommunicationRosterOutputAction.printAfter(params)
      .then(res => {
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
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  getInfoStyle() {
    let style = this.formRef.current?.getFieldValue('GstyleCode')
    if (style !== this.state.GstyleCode) {
      if (style) {
        let params = {
          GstyleCode: style
        }
        CommunicationRosterOutputAction.getInfoStyle(params)
          .then(res => {
            if (res?.data.length > 0) {
              this.formRef.current?.setFieldsValue({
                format_name: res?.data[0].format_name
              })
              this.setState({
                format_name: res?.data[0].format_name,
                GstyleCode: style
              })
            }
          })
          .catch((err) => {
            this.formRef.current?.setFieldsValue({
              format_name: ''
            })
            this.setState({
              format_name: '',
              GstyleCode: style
            })
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error("エラーが発生しました");
              return;
            }
            message.error(res.data.message);
          })
      } else {
        this.formRef.current?.setFieldsValue({
          format_name: ''
        })
        this.setState({
          format_name: ''
        })
      }
    }
  }

  onFinish() { }

  checkDateStart() {
    let dateStart = this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : null
    let dateEnd = this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : null
    if ((dateEnd && (dateStart > dateEnd)) || (dateEnd && !dateStart)) {
      this.formRef.current?.setFieldsValue({
        DateFChar: this.formRef.current?.getFieldValue('DateTChar')
      })
    }
  }

  checkDateEnd() {
    let dateStart = this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : null
    let dateEnd = this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : null
    if ((!dateEnd && dateStart) || (dateStart && (dateStart > dateEnd))) {
      this.formRef.current?.setFieldsValue({
        DateTChar: this.formRef.current?.getFieldValue('DateFChar')
      })
    }

    if ((!dateStart && dateEnd)) {
      this.formRef.current?.setFieldsValue({
        DateFChar: this.formRef.current?.getFieldValue('DateTChar')
      })
    }
  }

  onChangeDate() {
    let dateStart = this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : null
    let dateEnd = this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : null

    if ((!dateStart && dateEnd)) {
      this.formRef.current?.setFieldsValue({
        DateFChar: this.formRef.current?.getFieldValue('DateTChar')
      })
    }
  }

  checkGvisitsCourse() {
    let GvisitsCourseF = this.formRef.current?.getFieldValue('GvisitsCourseF')
    let GvisitsCourseT = this.formRef.current?.getFieldValue('GvisitsCourseT')
    if (GvisitsCourseT && (GvisitsCourseF > GvisitsCourseT)) {
      this.formRef.current?.setFieldsValue({
        GvisitsCourseT: this.formRef.current?.getFieldValue('GvisitsCourseF')
      })
    }
  }

  checkGbelong(value) {
    let GbelongF = this.formRef.current?.getFieldValue('GbelongF')
    let GbelongT = this.formRef.current?.getFieldValue('GbelongT')
    if (GbelongT && (GbelongF > GbelongT)) {
      this.formRef.current?.setFieldsValue({
        GbelongT: GbelongF
      })
      this.setState({
        GbelongT: GbelongF,
      })
    } else {
      if (value && value == 0) {
        this.formRef.current?.setFieldsValue({
          GbelongT: ''
        })
        this.setState({
          GbelongT: 0,
        })
      }
    }
  }

  checkGreceiptNum(valueF, valueT) {
    let GreceiptNumF = this.formRef.current?.getFieldValue('GreceiptNumF')
    let GreceiptNumT = this.formRef.current?.getFieldValue('GreceiptNumT')
    if (GreceiptNumT && (GreceiptNumF > GreceiptNumT)) {
      this.formRef.current?.setFieldsValue({
        GreceiptNumT: GreceiptNumF
      })
    } else {
      if (valueF && valueF == 0) {
        this.formRef.current?.setFieldsValue({
          GreceiptNumF: ''
        })
        this.setState({
          GreceiptNumF: 0
        })
      }

      if (valueT && valueT == 0) {
        this.formRef.current?.setFieldsValue({
          GreceiptNumT: ''
        })
        this.setState({
          GreceiptNumT: 0
        })
      }
    }
  }

  checkGofficeF(value) {
    let GofficeF = this.formRef.current?.getFieldValue('GofficeF')
    if (GofficeF) {
      this.formRef.current?.setFieldsValue({
        GofficeT: GofficeF
      })
    } else {
      this.formRef.current?.setFieldsValue({
        GofficeT: '99999999',
        GbranchStoreF: '',
        GbranchStoreT: 99999
      })
    }

    if (value && value == 0) {
      this.formRef.current?.setFieldsValue({
        GbranchStoreF: ''
      })
      this.setState({
        GbranchStoreF: 0,
      })
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }

  render() {
    return (
      <div className="communication-roster-output p-td">
        <Card title='連名簿出力'>
          <Spin spinning={this.state.isLoadingForm}>
            <Space>
              <Button
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
              >ｵﾌﾟｼｮﾝ情報</Button>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '70%',
                      component: (<WS0855001_PrintParamMaintain
                        onFinishScreen={(output) => {
                          this.closeModal()
                        }}
                      />)
                    }
                  });
                }}
              >印刷パラメータ</Button>
              <Button
                onClick={() => this.onPrint()}
              >印刷</Button>
            </Space>
            <hr style={{ margin: '15px 0' }} />

            <Form ref={this.formRef} onFinish={this.onFinish}>
              <div hidden>
                <Form.Item name="PreviewIndicationBool"><Input /></Form.Item>
                <Form.Item name="PrinterNum"><Input /></Form.Item>
              </div>

              <Row gutter={24}>
                <Col span={8} xl={8} lg={24} md={24} style={{ marginBottom: '1em', borderRight: '1px solid #00000040' }}>
                  <Row>
                    <label style={customStyle.labelStyle}>様　式</label>
                    <Form.Item name="GstyleCode" style={{ width: 80, marginRight: 5 }}>
                      <Input.Search maxLength={3}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 600,
                              component: (<WS0811004_StyleQuery
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    GstyleCode: output.recordData.style_code,
                                    format_name: output.recordData.format_name
                                  })
                                  this.setState({
                                    GstyleCode: output.recordData.style_code,
                                    format_name: output.recordData.format_name
                                  })
                                  this.closeModal()
                                }}
                              />)
                            }
                          });
                        }}
                        onBlur={(e) => { this.getInfoStyle() }}
                      />
                    </Form.Item>
                    <Form.Item style={{ width: 'calc(100% - 200px)', marginRight: 5 }}>
                      <span>{this.state.format_name}</span>
                    </Form.Item>
                    <Form.Item style={{ width: 50 }}>
                      <span >{this.state.GseeOffice}</span>
                    </Form.Item>
                  </Row>

                  <Row>
                    <label style={customStyle.labelStyle}>保険者</label>
                    <Form.Item name="GkanshoF" style={{ width: 120 }}>
                      <Input.Search style={{ textAlign: 'right' }} maxLength={10}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '65%',
                              component: (<WS0246001_InsurerInfoSearchQuery
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    GkanshoF: output.Lo_InsurerCode > 0 ? output.Lo_InsurerCode : ''
                                  })
                                  this.setState({
                                    GkanshoF: output.Lo_InsurerCode,
                                  })
                                  this.closeModal()
                                }}
                              />)
                            }
                          });
                        }}
                        onBlur={(e) => {
                          if (e.target.value == 0) {
                            this.formRef.current?.setFieldsValue({
                              GkanshoF: ''
                            })
                            this.setState({
                              GkanshoF: 0,
                            })
                          }
                        }}
                      />
                    </Form.Item>
                  </Row>

                  <Row>
                    <label style={customStyle.labelStyle}>事業所</label>
                    <Form.Item name="GofficeF">
                      <Input.Search style={{ width: 100, marginRight: 5, textAlign: 'right' }}
                        maxLength={8}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (<WS0247001_OfficeInfoRetrievalQuery
                                Lio_OfficeCode={this.formRef.current?.getFieldValue("GofficeF")}
                                Lio_BranchStoreCode={this.formRef.current?.getFieldValue("GbranchStoreF")}
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    GofficeF: output.Lio_OfficeCode,
                                    GofficeT: output.Lio_OfficeCode,
                                    GbranchStoreF: output.Lio_BranchStoreCode > 0 ? output.Lio_BranchStoreCode : '',
                                  })
                                  this.setState({
                                    GofficeF: output.Lio_OfficeCode,
                                    GbranchStoreF: output.Lio_BranchStoreCode,
                                  })
                                  this.closeModal()
                                }}
                              />)
                            }
                          });
                        }}
                        onBlur={(e) => {
                          this.checkGofficeF()
                          this.setState({
                            GofficeF: e.target.value
                          })
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="GbranchStoreF" style={{ width: 100 }}>
                      {this.state.GofficeF ?
                        <Input.Search type='number' style={{ textAlign: 'right' }} min={0}
                          maxLength={5}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (<WS0247001_OfficeInfoRetrievalQuery
                                  Lio_OfficeCode={this.formRef.current?.getFieldValue("GofficeF")}
                                  Lio_BranchStoreCode={this.formRef.current?.getFieldValue("GbranchStoreF")}
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      GofficeF: output.Lio_OfficeCode,
                                      GofficeT: output.Lio_OfficeCode,
                                      GbranchStoreF: output.Lio_BranchStoreCode > 0 ? output.Lio_BranchStoreCode : ''
                                    })
                                    this.setState({
                                      GofficeF: output.Lio_OfficeCode,
                                      GbranchStoreF: output.Lio_BranchStoreCode,
                                    })
                                    this.closeModal()
                                  }}
                                />)
                              }
                            });
                          }}
                          onBlur={(e) => {
                            this.checkGofficeF(e.target.value)
                          }}
                        />
                        :
                        <InputNumber readOnly />
                      }
                    </Form.Item>
                  </Row>

                  <Row>
                    <label style={customStyle.labelStyle}>所　属</label>
                    <Form.Item name="GbelongF" style={{ width: 112, marginRight: 5 }}>
                      {!this.state.Expression_89 ?
                        <InputNumber disabled />
                        :
                        <Input.Search type='number' style={{ textAlign: 'right' }} min={0}
                          maxLength={8}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (<WS2787004_AffiliationSelectSub
                                  Li_OfficeCode={this.formRef.current?.getFieldValue("GofficeF")}
                                  Li_BranchStoreCode={this.formRef.current?.getFieldValue("GbranchStoreF")}
                                  Lio_AffiliationCode={this.formRef.current?.getFieldValue("GbelongF")}
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      GbelongF: output.Lio_AffiliationCode > 0 ? output.Lio_AffiliationCode : ''
                                    })
                                    this.checkGbelong()
                                    this.closeModal()
                                  }}
                                />)
                              }
                            });
                          }}
                          onBlur={(e) => {
                            this.checkGbelong()
                            if (e.target.value == 0) {
                              this.formRef.current?.setFieldsValue({
                                GbelongF: ''
                              })
                              this.setState({
                                GbelongF: 0,
                              })
                            }
                          }}
                        />
                      }
                    </Form.Item>
                    <Form.Item style={{ width: 10, marginRight: 5, textAlign: "center" }}> ~ </Form.Item>
                    <Form.Item name="GbelongT" style={{ width: 112 }}>
                      {!this.state.Expression_89 ?
                        <InputNumber disabled />
                        :
                        <Input.Search type='number' style={{ textAlign: 'right' }} min={0}
                          maxLength={8}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (<WS2787004_AffiliationSelectSub
                                  Li_OfficeCode={this.formRef.current?.getFieldValue("GofficeF")}
                                  Li_BranchStoreCode={this.formRef.current?.getFieldValue("GbranchStoreF")}
                                  Lio_AffiliationCode={this.formRef.current?.getFieldValue("GbelongT")}
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      GbelongT: output.Lio_AffiliationCode > 0 ? output.Lio_AffiliationCode : ''
                                    })
                                    this.setState({
                                      GbelongT: output.Lio_AffiliationCode,
                                    })
                                    this.checkGbelong(output.Lio_AffiliationCode)
                                    this.closeModal()
                                  }}
                                />)
                              }
                            });
                          }}
                          onBlur={(e) => {
                            this.checkGbelong(e.target.value)
                          }}
                        />
                      }
                    </Form.Item>
                  </Row>

                  <Row>
                    <label style={customStyle.labelStyle}>受診日</label>
                    <Form.Item name="DateFChar" style={{ width: 112, marginRight: 5 }}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'
                        onBlur={() => { this.checkDateStart() }}
                        onChange={() => this.onChangeDate()}
                      />
                    </Form.Item>
                    <Form.Item style={{ width: 10, marginRight: 5, textAlign: "center" }}>  ~ </Form.Item>
                    <Form.Item name="DateTChar" style={{ width: 112 }}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD'
                        onBlur={() => { this.checkDateEnd() }} />
                    </Form.Item>
                  </Row>

                  <Row>
                    <label style={customStyle.labelStyle}>コース</label>
                    <Form.Item name="GvisitsCourseF" style={{ width: 80, marginRight: 5 }}>
                      <Input.Search maxLength={3}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '65%',
                              component: (<WS0265001_BasicCourseInquiry
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    GvisitsCourseF: output.Lo_CourseCode
                                  })
                                  this.checkGvisitsCourse()
                                  this.closeModal()
                                }}
                              />)
                            }
                          });
                        }}
                        onBlur={() => { this.checkGvisitsCourse() }}
                      />
                    </Form.Item>
                    <Form.Item style={{ width: 10, marginRight: 5, textAlign: "center" }}>
                      ~
                    </Form.Item>
                    <Form.Item name="GvisitsCourseT" style={{ width: 80 }}>
                      <Input.Search maxLength={3}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '65%',
                              component: (<WS0265001_BasicCourseInquiry
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    GvisitsCourseT: output.Lo_CourseCode
                                  })
                                  this.checkGvisitsCourse()
                                  this.closeModal()
                                }}
                              />)
                            }
                          });
                        }}
                        onBlur={() => { this.checkGvisitsCourse() }}
                      />
                    </Form.Item>
                  </Row>

                  <Row>
                    <label style={customStyle.labelStyle}>受付No</label>
                    <Form.Item name="GreceiptNumF" style={{ width: 80, marginRight: 5 }}>
                      <InputNumber maxLength={6} min={0}
                        onBlur={(e) => { this.checkGreceiptNum(e.target.value, null) }}
                      />
                    </Form.Item>
                    <Form.Item style={{ width: 10, marginRight: 5, textAlign: "center" }}>
                      ~
                    </Form.Item>
                    <Form.Item name="GreceiptNumT" style={{ width: 80 }}>
                      <InputNumber maxLength={6} min={0}
                        onBlur={(e) => { this.checkGreceiptNum(null, e.target.value) }}
                      />
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={customStyle.labelStyle}>出力順</label>
                    <Form.Item name="OutputOrder" style={{ width: 'calc(100% - 70px)' }}>
                      <Select>
                        {this.state.OutputOrder_List?.map(item => (
                          <Select.Option key={"OutputOrder-" + Math.random()} value={item}>{item}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={customStyle.labelStyle}>続　柄</label>
                    <Form.Item name="ExtractCondition" style={{ width: 120 }}>
                      <Select>
                        <Select.Option value=''>全て</Select.Option>
                        {this.state.ExtractCondition_List?.map(item => (
                          <Select.Option key={"ExtractCondition-" + Math.random()} value={item.LinkField}>{item.DisplayField}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={customStyle.labelStyle}>団体向</label>
                    <Form.Item name="OrgsTowards" style={{ width: 120 }}>
                      <Select>
                        {this.state.OrgsTowards_List?.map(item => (
                          <Select.Option key={"OrgsTowards-" + Math.random()} value={item.LinkedField}>{item.DisplayField}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Row>
                  <Form.Item >
                    <Button style={{ float: 'right' }} icon={<SearchOutlined style={{ color: '#08c' }} />}
                      onClick={() => {
                        this.getDataIssueList()
                      }}
                    >　検　　索</Button>
                  </Form.Item>
                  <hr />
                  <Form.Item style={{ textAlign: 'right' }}>
                    <Button type="primary"
                      onClick={() => {
                        this.onPrint()
                      }} >印刷</Button>
                  </Form.Item>
                </Col>

                <Col span={16} xl={16} lg={24} md={24}>
                  <Table
                    size='small'
                    dataSource={this.state.dataSource}
                    loading={this.state.isLoadingTable}
                    pagination={true}
                    bordered
                    rowKey={(record) => record.id}
                    scroll={{ x: 500 }}
                    rowSelection={{
                      type: 'checkbox',
                      selectedRowKeys: this.state.selectedRowKeys,
                      onSelect: (record, selected, selectedRows, nativeEvent) => {
                        let data = [...this.state.dataSource];
                        let arrTemp = [...this.state.selectedRowKeys];
                        let arrTempRecord = [...this.state.selectedRows];
                        let idx = arrTemp.indexOf(record.id);
                        if (idx === -1) {
                          data.map(x => {
                            if (x.id === record.id) {
                              x.W1_output_flg = true
                            }
                          })
                          arrTemp.push(record.id);
                          arrTempRecord.push(record)
                          this.setState({
                            selectedRowKeys: arrTemp,
                            selectedRows: arrTempRecord
                          });
                        } else {
                          data.map(x => {
                            if (x.id === record.id) {
                              x.W1_output_flg = false
                            }
                          })
                          arrTemp.splice(idx, 1);
                          arrTempRecord.splice(idx, 1);
                          this.setState({
                            selectedRowKeys: arrTemp,
                            selectedRows: arrTempRecord
                          });
                        }
                      },

                      onSelectAll: (selected, selectedRows, changeRows) => {
                        let data = [...this.state.dataSource];
                        if (selected) {
                          data.map(x => x.W1_output_flg = true)
                          let arrTemp = this.state.dataSource.map(item => item.id);
                          let arrTempRecord = this.state.dataSource;

                          this.setState({
                            selectedRowKeys: arrTemp,
                            selectedRows: arrTempRecord,
                            dataSource: data
                          });
                        } else {
                          data.map(x => x.W1_output_flg = false)
                          this.setState({
                            selectedRowKeys: [],
                            selectedRows: [],
                            dataSource: data
                          });
                        }
                      },
                    }}
                  >
                    <Table.Column title="受診日" dataIndex="W1_consult_date" width={95}
                      render={(value, record, index) => {
                        return (
                          <div style={{ color: record.W1_output_flg ? '' : Color(210).Foreground }}>{value && value !== '0000/00/00' ? moment(value)?.format('YYYY/MM/DD') : ''}</div>
                        )
                      }} />
                    <Table.Column title="氏　名" dataIndex="kanji_name"
                      render={(value, record, index) => {
                        return (
                          <div style={{ color: record.W1_output_flg ? '' : Color(210).Foreground }}>
                            {value}
                          </div>
                        )
                      }} />
                    <Table.Column title="性別" dataIndex="Expression_3" width={50} align='center'
                      render={(value, record, index) => {
                        return (
                          <div style={{ color: record.W1_output_flg ? Color(record.Expression_4)?.Foreground : Color(210).Foreground }}>
                            {value}
                          </div>
                        )
                      }}
                    />
                    <Table.Column title="生年月日" dataIndex="birthday_on" width={80}
                      render={(value, record, index) => {
                        return (
                          <div style={{ color: record.W1_output_flg ? '' : Color(210).Foreground }}>{value && value !== '0000/00/00' ? moment(value)?.format('NNy/MM/DD') : ''}</div>
                        )
                      }} />
                    <Table.Column title="受診コース" dataIndex="W1_visits_courses"
                      render={(value, record, index) => {
                        return (
                          <div>
                            <span style={{ marginRight: 3, color: record.W1_output_flg ? '' : Color(210).Foreground }}>{record.W1_visits_courses ? (record.W1_visits_courses?.toString().substr(0, 1) + '-' + record.W1_visits_courses?.toString().substr(1, 2)) : ''}</span>
                            <span style={{ color: record.W1_output_flg ? '' : Color(210).Foreground }}>{record.contract_short_name}</span>
                          </div>
                        )
                      }} />
                    <Table.Column title="受付No" dataIndex="receipt_number" width={80}
                      render={(value, record, index) => {
                        return (
                          <div style={{ textAlign: 'right', color: record.W1_output_flg ? '' : Color(210).Foreground }}>{value && value !== 0 ? value : ''}</div>
                        )
                      }} />
                    <Table.Column title="事業所" dataIndex="Expression_13"
                      render={(value, record, index) => {
                        return (
                          <div style={{ color: record.W1_output_flg ? '' : Color(210).Foreground }}>
                            {value}
                          </div>
                        )
                      }} />
                    <Table.Column
                      render={(value, record, index) => (
                        <Dropdown
                          style={{
                            display: "inline-block", marginTop: '-1em'
                          }} overlay={() => (
                            <Menu >
                              <Menu.Item
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
                                            this.closeModal()
                                          }}
                                        />
                                      ),
                                    }
                                  })
                                }} >
                                照会
                              </Menu.Item>
                            </Menu>
                          )}>
                          <Button size='small' icon={<MoreOutlined />}></Button>
                        </Dropdown>
                      )}
                    />
                  </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0811001_CommunicationRosterOutput);
