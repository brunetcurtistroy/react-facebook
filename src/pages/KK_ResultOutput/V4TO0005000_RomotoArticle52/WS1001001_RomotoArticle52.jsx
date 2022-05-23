import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Card, Form, Input, Checkbox, Select, Button, Table, Modal, Row, Col, message, Space, InputNumber } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import WS0433001_PrinterConfirm from 'pages/SK_IntroductionLetter/V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS2787004_AffiliationSelectSub from 'pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS2787004_AffiliationSelectSub.jsx';
import WS1001033_BreakdownInquiry from 'pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS1001033_BreakdownInquiry.jsx';
import WS1001034_SelectBreakdown from "./WS1001034_SelectBreakdown";
import {
  getDataIssueListAction, getScreenDataRomotoArticle52Action, selectRomotoArticle52Action,
  selectAllRomotoArticle52Action, extractRomotoArticle52Action, getValueEnableAction, printF12, getNameOfficeCodeRomotoArticle52Action
} from "redux/ResultOutput/RomotoArticle52/RomotoArticle52.actions";
import WS1004001_SettingRomotoArticle52 from "./WS1004001_SettingRomotoArticle52";
import { download_file, Regex } from "helpers/CommonHelpers";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import Menubar from "components/Commons/Menubar";

const dateFormat = 'YYYY/MM/DD';
class WS1001001_RomotoArticle52 extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '労基５２条';

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
      objInit: {},
      GextractConditionScreenList: [],
      ReportingYear: moment().format('YYYY'),
      Expression_5: true, // check show table column 該　当　者
      Expression_79: false,
      Expression_70: true,
      listIDIssueList: [],
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      objIssueList: {},
      initparams: {
        Office: '',
        BranchOfficeShop: '',
        StsOfficeIntegration: 0,
        AffiliationCodeF: '',
        AffiliationCodeT: '',
        GissueStartDate: moment().format(dateFormat), // GissueStartDateChar
        GissueEndDate: moment().format(dateFormat), // GissueEndDateChar
        GextractConditionScreen: '0',
        GbreakdownOutput: 0,
        GselectScreen: '',
        AggregateStyle: '',
        GextractCondition: '',
      },
      menuItems: [
        { id: 1, label: '印刷', handleClick: this.Print_F12 },
      ],
      menus: [{ id: 1, label: '労基52条設定', handleClick: this.VariousSetting01 }]
    };
  }

  componentDidMount = () => {
    this.loadInitData(this.state.ReportingYear);
  }

  loadInitData = (params) => {
    getScreenDataRomotoArticle52Action({ ReportingYear: params })
      .then(res => {
        if (res.data) {
          this.setState({
            objInit: res.data,
            ReportingYear: res.data.ReportingYear,
            Expression_70: !res.data.BreakdownFormat !== '',
            GextractConditionScreenList: res.data.GextractConditionScreen_List,
            initparams: {
              ...this.state.initparams,
              GselectScreen: res.data.GselectScreen,
              AggregateStyle: res.data.AggregateStyle,
              GextractCondition: res.data.GextractCondition,
            }
          });
          this.formRef?.current?.setFieldsValue({
            ReportingYear: res.data.ReportingYear,
            ReportingYearSumHistory: res.data.ReportingYearSumHistory,
            ReportingYearSumHistory_1: res.data.ReportingYearSumHistory_1,
          })
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = () => {
    this.setState({ isLoading: true, dataSource: [], rowSelect: {} });
    getDataIssueListAction()
      .then(res => {
        if (res?.data) {
          let data = res.data.IssueList;
          let arrID = [];
          if (data.length > 0) {
            data.forEach(element => {
              if (element.Issuing) arrID.push(element.id)
            });
          }
          this.setState({
            objIssueList: res.data,
            dataSource: data,
            listIDIssueList: arrID,
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  printF12 = (params) => {
    this.setState({ isLoadingPrint: true });
    printF12(params)
      .then(res => {
        if (res.data.message) {
          Modal.warning({
            title: res.data.message,
            width: 300,
          });
        } else {
          download_file(res);
          message.success("完了！");
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingPrint: false }))
  }

  getValueExpression_79 = (params) => {
    getValueEnableAction(params)
      .then(res => this.setState({ Expression_79: res?.data?.Expression_79 ? res?.data?.Expression_79 : false }))
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  ExtractBtn = () => {
    extractRomotoArticle52Action(this.state.initparams)
      .then(res => this.loadData())
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  handleChangeInitParams = (value, name) => {
    this.setState({
      initparams: {
        ...this.state.initparams,
        [name]: value
      }
    }, () => {
      if (name === 'Office' || name === 'StsOfficeIntegration') {
        this.getValueExpression_79({
          Office: this.state.initparams.Office,
          BranchOfficeShop: this.state.initparams.BranchOfficeShop,
          StsOfficeIntegration: this.state.initparams.StsOfficeIntegration
        })
      }
    })
    if (name === 'Office') {
      this.setState({ Expression_5: value ? false : true });
      if (name === 'Office' || name === 'BranchOfficeShop') this.formRef?.current?.setFieldsValue({ office_kanji_name: '' })
    }
  }

  openModalWS0247001 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS0247001_OfficeInfoRetrievalQuery
            Lio_OfficeCode={this.state.initparams.Office}
            Lio_BranchStoreCode={this.state.initparams.BranchOfficeShop}
            onFinishScreen={({ Lio_OfficeCode, Lio_BranchStoreCode, Lo_Kanji_Name }) => {
              this.formRef.current.setFieldsValue({
                Office: Lio_OfficeCode,
                BranchOfficeShop: Lio_BranchStoreCode === 0 ? '' : Lio_BranchStoreCode,
                office_kanji_name: Lo_Kanji_Name,
              });
              this.setState({
                initparams: {
                  ...this.state.initparams,
                  Office: Lio_OfficeCode,
                  BranchOfficeShop: Lio_BranchStoreCode,
                },
                Expression_5: Lio_OfficeCode ? false : true
              }, () => this.getValueExpression_79({
                Office: this.state.initparams.Office,
                BranchOfficeShop: this.state.initparams.BranchOfficeShop,
                StsOfficeIntegration: this.state.initparams.StsOfficeIntegration
              }))
              this.closeModal()
            }}
          />),
      },
    })
  }

  openModalWS2787004 = (name, value) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '50%',
        component: (
          <WS2787004_AffiliationSelectSub
            Li_OfficeCode={this.state.initparams.Office}
            Li_BranchStoreCode={this.state.initparams.BranchOfficeShop}
            Lio_AffiliationCode={value}
            onFinishScreen={({ Lio_AffiliationCode }) => {
              this.formRef.current.setFieldsValue({ [name]: Lio_AffiliationCode })
              this.handleChangeInitParams(Lio_AffiliationCode, name)
              this.closeModal()
            }}
          />),
      },
    })
  }

  Print_F12 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 700,
        component: (
          <WS0433001_PrinterConfirm
            Li_PreviewSpecifiedValue={false}
            Li_PrinterNoSpecifiedValue={0}
            Lo_Preview={false}
            Lo_PrinterNo={0}
            Lo_StsOutput={true}
            onFinishScreen={(Lo_Preview, Lo_PrinterNo, Lo_StsOutput) => {
              this.closeModal()
              this.printF12({
                ListSts: Lo_Preview.Lo_StsOutput ? 1 : 0,
                Option: this.state.objInit.Option,
                GbreakdownOutput: this.state.objInit.GbreakdownOutput ? 1 : 0,
                GpreviewMode: Lo_Preview.Lo_Preview ? 1 : 0,
                AggregateStyle: this.state.objInit.AggregateStyle,
                BreakdownFormat: this.state.objInit.BreakdownFormat,
                GprinterNum: Lo_Preview.Lo_PrinterNo
              })
            }}
          />),
      },
    })
  }

  renderRightClickTable = (record) => (
    <Button
      type="primary"
      size='small'
      onClick={() => {
        this.state.initparams.Office === ''
          ? this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: '70%',
              component: (
                <WS1001033_BreakdownInquiry
                  GissueStartDate={this.state.initparams.GissueStartDate}
                  GissueEndDate={this.state.initparams.GissueEndDate}
                  W1_office_cd={record.office_code}
                  W1_branch_store_cd={record.W1_branch_store_cd}
                  GextractCondition={this.state.objInit.GextractCondition}
                  ConditionalExpression={this.state.objIssueList.ConditionalExpression}
                  TargetCourseTable={this.state.objIssueList.TargetCourseTable}
                  StsOfficeIntegration={this.state.objInit.StsOfficeIntegration}
                  branch_store_code={record.branch_store_code}
                  onFinishScreen={(output) => {
                    this.closeModal()
                  }}
                />),
            },
          })
          : this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: '70%',
              component: (
                <WS1001034_SelectBreakdown
                  onFinishScreen={({ Lo_IssuedFlag }) => {
                    if (Lo_IssuedFlag) this.loadData()
                    this.closeModal()
                  }}
                />),
            },
          })
      }}
    >
      {this.state.initparams.Office === '' ? '内容照会' : '内容選択'}
    </Button>
  )

  eventSelectRecord = (params) => {
    selectRomotoArticle52Action(params)
      .then()
      .catch()
  }

  eventSelectAllRecord = (params) => {
    selectAllRomotoArticle52Action(params)
      .then()
      .catch()
  }

  getNameOfficeCode = (objChange) => {
    let params = {
      Office: this.state.initparams.Office,
      BranchOfficeShop: this.state.initparams.BranchOfficeShop
    }
    getNameOfficeCodeRomotoArticle52Action({ ...params, ...objChange })
      .then((res) => {
        this.formRef?.current?.setFieldsValue({ office_kanji_name: res?.data?.office_kanji_name || '' })
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  VariousSetting01 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '50%',
        component: (
          <WS1004001_SettingRomotoArticle52
            onFinishScreen={() => {
              this.closeModal()
            }}
          />),
      },
    })
  }

  render() {
    return (
      <div className="romoto-article52">
        <Card title='労基５２条'>
          <Form ref={this.formRef} labelAlign='right' autoComplete='off'
            initialValues={{
              ...this.state.initparams,
              GissueStartDate: moment(),
              GissueEndDate: moment(),
            }}>
            <Menubar items={this.state.menuItems} menus={this.state.menus} />
            <Row gutter={24} className='mt-3'>
              <Col span={7} style={{ borderRight: '1px solid #F0F0F0' }}>
                <Form.Item label="報告年度" >
                  <Row gutter={10}>
                    <Col span={8}>
                      <Form.Item name="ReportingYear" >
                        <InputNumber maxLength={4} min={1} onBlur={(e) => this.loadInitData(e.target.value)} />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item name="ReportingYearSumHistory" label="年度（" >
                        <Input bordered={false} readOnly />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Space>
                        <Form.Item name="ReportingYearSumHistory_1">
                          <InputNumber bordered={false} readOnly />
                        </Form.Item>
                        <Form.Item label="年度）"></Form.Item>
                      </Space>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="　事業所" >
                  <Row gutter={10}>
                    <Col span={8}>
                      <Form.Item name="Office" >
                        <Input.Search 
                          maxLength={8}
                          // className='floatRight'
                          onChange={(e) => this.handleChangeInitParams(e.target.value, 'Office')}
                          onBlur={(e) => this.getNameOfficeCode({ Office: e.target.value })}
                          onSearch={this.openModalWS0247001}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name="BranchOfficeShop" >
                        <Input.Search
                          maxLength={5}
                          readOnly={!this.state.initparams.Office}
                          onChange={(e) => {
                            if(Regex(e.target.value, /[1-9]/)){
                              this.handleChangeInitParams(e.target.value, 'BranchOfficeShop')
                            } else {
                              this.formRef?.current?.setFieldsValue({ BranchOfficeShop: null })
                            }
                          }}
                          className='floatRight'
                          onBlur={(e) => this.getNameOfficeCode({ BranchOfficeShop: e.target.value })}
                          onSearch={() => {
                            if (this.state.initparams.Office) this.openModalWS0247001()
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="office_kanji_name">
                        <Input bordered={false} readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="　　統合" name="StsOfficeIntegration" valuePropName="checked" >
                  <Checkbox
                    style={{ color: '#14468C', fontWeight: 'bold' }}
                    onChange={(e) => this.handleChangeInitParams(e.target.checked ? 1 : 0, 'StsOfficeIntegration')}
                  >支社店を親事業所に統合する</Checkbox>
                </Form.Item>

                <Form.Item label="　　所属">
                  <Row gutter={10}>
                    <Col span={8}>
                      <Form.Item name="AffiliationCodeF">
                        <InputNumber maxLength={8} min={1} disabled={!this.state.Expression_79}
                          onChange={(value) => this.handleChangeInitParams(value, 'AffiliationCodeF')}
                          onDoubleClick={() => this.openModalWS2787004('AffiliationCodeF', this.state.initparams.AffiliationCodeF)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={1}><Form.Item>~</Form.Item></Col>
                    <Col span={8}>
                      <Form.Item name="AffiliationCodeT">
                        <InputNumber maxLength={8} min={1} disabled={!this.state.Expression_79}
                          readOnly={!this.state.initparams.AffiliationCodeF}
                          onChange={(value) => this.handleChangeInitParams(value, 'AffiliationCodeT')}
                          onDoubleClick={() => {
                            if (this.state.initparams.AffiliationCodeF) {
                              this.openModalWS2787004('AffiliationCodeT', this.state.initparams.AffiliationCodeT)
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="　受診日">
                  <Row gutter={10}>
                    <Col span={8}>
                      <Form.Item name="GissueStartDate" >
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat}
                          onChange={(date, dateString) => this.handleChangeInitParams(dateString, 'GissueStartDate')} />
                      </Form.Item>
                    </Col>
                    <Col span={1}><Form.Item>~</Form.Item></Col>
                    <Col span={8}>
                      <Form.Item name="GissueEndDate" >
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat}
                          onChange={(date, dateString) => this.handleChangeInitParams(dateString, 'GissueEndDate')} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="抽出条件" >
                  <Row gutter={10}>
                    <Col span={8}>
                      <Form.Item name="GextractConditionScreen">
                        <Select onChange={(value) => this.handleChangeInitParams(value, 'GextractConditionScreen')}>
                          <Select.Option value='9'>全て</Select.Option>
                          {this.state.GextractConditionScreenList?.map((item, index) => (
                            <Select.Option key={`GextractConditionScreen${index}`} value={item.node_code_name}>
                              {item.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label={this.state.Expression_70 ? '' : "内訳出力"}>
                  <Form.Item name="GbreakdownOutput" valuePropName="checked" hidden={this.state.Expression_70}>
                    <Checkbox onChange={(e) => this.handleChangeInitParams(e.target.checked ? 1 : 0, 'GbreakdownOutput')} />
                  </Form.Item>
                  <Button style={{ float: 'right' }} icon={<SearchOutlined />} onClick={this.ExtractBtn} loading={this.state.isLoading}>検　　索</Button>
                </Form.Item>

                <hr style={{ border: '1px solid #F0F0F0' }} className='mt-3 mb-3' />

                <Button type="primary" style={{ float: "right" }} onClick={this.Print_F12} loading={this.state.isLoadingPrint}>印刷</Button>
              </Col>

              <Col span={17}>
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
                  onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
                  rowSelection={{
                    selectedRowKeys: this.state.listIDIssueList,
                    onChange: (selectedRowKeys, selectedRows) => this.setState({ listIDIssueList: selectedRowKeys }),
                    onSelect: (record, selected) => this.eventSelectRecord({ id: record.id, Issuing: selected ? 1 : 0 }),
                    onSelectAll: (selected) => this.eventSelectAllRecord({ Vl3StsSelectAll: selected ? 1 : 0 })
                  }}
                >
                  {/* <Table.Column title='' dataIndex="Issuing" /> */}
                  <Table.Column title="事　　業　　所" dataIndex=""
                    render={(text, record, index) => {
                      return (
                        <Row gutter={10}>
                          <Col span={6} style={{ textAlign: 'right' }}>
                            {record.office_code}
                          </Col>
                          <Col span={1}>-</Col>
                          <Col span={4} style={{ textAlign: 'right' }}>
                            {record.W1_branch_store_cd}
                          </Col>
                          <Col span={13}>
                            {record.office_kanji_name}
                          </Col>
                        </Row>
                      )
                    }}
                  />
                  <Table.Column title="受  診  者" dataIndex="W1_person_total" width={'10%'}
                    render={(text, record) => (<div style={{ textAlign: 'right' }}>{text !== 0 ? text + '人' : null}</div>)}
                  />
                  {this.state.Expression_5
                    ? null
                    : <Table.Column title="該　当　者" dataIndex="GpeopleCountBreakdownSelect" width={'10%'}
                      render={(text, record) => (<div style={{ textAlign: 'right' }}>{text !== 0 ? text + '人' : null}</div>)}
                    />
                  }
                  <Table.Column title="所　　在　　地" dataIndex="address_1" width={'40%'} />
                  <Table.Column title="" dataIndex="" width={80}
                    render={(value, record) => this.renderRightClickTable(record)} />
                </Table>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          destroyOnClose={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1001001_RomotoArticle52);
