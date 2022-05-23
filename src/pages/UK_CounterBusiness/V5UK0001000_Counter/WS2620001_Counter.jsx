import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReceiptProcessSubAction from "redux/CounterBusiness/Counter/ReceiptProcessSub.action";

import { Card, Col, Form, Input, Radio, Row, Select, Table, Button, Space, Menu, Dropdown, message, InputNumber } from "antd";
import { MoreOutlined } from '@ant-design/icons';
import { getIntroduceCounterAction, AcceptButtonAction, eventEnterC_CounterAction, userAction3CounterAction, getListDataCounterAction } from "redux/CounterBusiness/Counter/Counter.action";
import WS2584019_PersonalInfoInquirySub from 'pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx';
import WS0273001_VisitsTargetSearchQuery from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0273001_VisitsTargetSearchQuery.jsx';
import WS0605127_ContractLineItemDisplay from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay";
import WS2587021_InspectChangeQuerySub from 'pages/UK_CounterBusiness/V5UK0001000_Counter/WS2587021_InspectChangeQuerySub.jsx';
import WS2621001_PaymentProcessSub from 'pages/UK_CounterBusiness/V5UK0001000_Counter/WS2621001_PaymentProcessSub.jsx';
import WS2583001_ConsultInquirySub from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub.jsx';
import WS2537001_PersonalReserveProcess from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess.jsx';
import WS2622003_ReceiptProcessSub from 'pages/UK_CounterBusiness/V5UK0001000_Counter/WS2622003_ReceiptProcessSub.jsx';
import WS0650001_DocumentBatchCreateSub from 'pages/JZ_AdvancePreparation/V4JZ0102003_DocumentBatchCreate/WS0650001_DocumentBatchCreateSub.jsx';
import WS2620036_Refine from "pages/UK_CounterBusiness/V5UK0001000_Counter/WS2620036_Refine";
import WS2623001_DispensingProcessSub from "pages/UK_CounterBusiness/V5UK0001000_Counter/WS2623001_DispensingProcessSub";
import WS2624003_VisitsCancelConfirm from 'pages/ZZ_Others/DEVTOOL0200_CreateTestForMedicalExamInfo/WS2624003_VisitsCancelConfirm.jsx';
import GetImage from "constants/Images";
import Color from "constants/Color";
import WS0956001_PaymentCorrectSub from "./WS0956001_PaymentCorrectSub";
import WS2624002_VisitsChangeConfirm from "pages/ZZ_Others/DEVTOOL0200_CreateTestForMedicalExamInfo/WS2624002_VisitsChangeConfirm";
import { ReturnIcon } from "components/Commons/ReturnIcon";
import { ModalCustom } from "components/Commons/ModalCustom";
import Menubar from "components/Commons/Menubar";

const styleContentTableColumn = {
  color: Color(209).Foreground,
  fontWeight: 'lighter',
  fontSize: '18px',
  marginBottom: '5px',
  height: '22px'
}
const styleDivTitle = {
  background: '#1C66B9',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  textAlign: 'center',
  height: '32px',
  padding: '0.3em',
  color: '#FFFFFF'
};
const styleDivResult = {
  border: '1px solid rgba(0, 0, 0, 0.06)',
  textAlign: 'center',
  height: '32px',
  padding: '0.3em'
}
const styleDivExpression = {
  width: '50px',
  height: '24px',
  border: '1px solid #ABADB3',
  textAlign: 'center',
  lineHeight: '22px',
}
const styleDiv = {
  border: 'solid 1px #ABADB3',
  width: '50px',
  height: '24px',
  textAlign: 'center',
  lineHeight: '22px',
}
const dateFormat = 'YYYY/MM/DD';
class WS2620001_Counter extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '窓口';

    this.state = {
      pagination: {
        defaultPageSize: 24,
        size: 'small',
        showQuickJumper: true
      },
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: '',
      },
      widthWS2622003: '',
      isLoading: false,
      dataSource: [],
      record: {},
      FacilityTypeList: [],
      iniObj: {},
      importance: 0,
      initParams: {
        DateChar: moment().format(dateFormat),
        ReserveNumAndPersonalNum: '',
        FacilityType: 0,
        State: '1',
        Pay: null,
      },
      Li_Change: '',
      menuItems: [
        { id: 1, label: '詳細抽出', handleClick: this.HandelF7 },
        { id: 1, label: '再表示', handleClick: this.eventF10 },
        { id: 1, label: '新規受付', handleClick: this.eventF11 },
      ]
    };
    this.HandelF7 = this.HandelF7.bind(this);
  }

  componentDidMount = () => {
    this.loadInitData(this.state.initParams);
  }

  loadInitData = (params) => {
    getIntroduceCounterAction(params)
      .then(res => {
        this.setState({
          iniObj: res.data,
          FacilityTypeList: res.data.FacilityType,
        });
        this.loadData();
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = () => {
    this.setState({ isLoading: true })
    getListDataCounterAction()
      .then(res => {
        if (res.data) {
          this.setState({
            dataSource: res.data.VisitList,
            record: this.state.record?.id
              ? this.state.record
              : res.data.VisitList.length > 0 ? res.data.VisitList[0] : {},
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  checkWidthInWS2622003(props) {
    ReceiptProcessSubAction.getScreenData({ Li_ReserveNum: props.Li_ReserveNum }).then(item => {
      if (item) {
        const width25 = item.sts1 > 0 && item.sts2 === 0 && item.sts3 === 0 ? '25%' : null
        const width50 = item.sts1 > 0 && (item.sts2 > 0 || item.sts3 > 0) ? '50%' : null
        const width80 = item.sts1 > 0 && item.sts2 > 0 && item.sts3 > 0 ? '80%' : null
        const checkShow = item.sts1 === 0 && item.sts2 === 0 && item.sts3 === 0 ? false : true
        const width = width25 ? width25 : (width50 ? width50 : (width80 ? width80 : ''))
        this.setState({ widthWS2622003: width })
        if (checkShow) {
          this.callModal(props, this.state.widthWS2622003, 'WS2622003_ReceiptProcessSub')
        }
      }
    })
  }

  HandelF7 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1000,
        component: (
          <WS2620036_Refine
            Lio_State={this.formRef.current.getFieldValue('State')}
            Lio_Pay={this.formRef.current.getFieldValue('Pay')}
            Lio_Facility={this.formRef.current.getFieldValue('FacilityType')}
            onFinishScreen={(output) => {
              if (output) {
                this.closeModal();
              }

            }}
          />
        ),
      },
    })
  }

  eventF10 = () => { }

  eventF11 = () => {
    let props = {
      Li_CourseLevel: '',
      Li_ReserveNum: '',
      Li_PersonalNum: '',
      Li_Date: this.state.initParams.DateChar,
      Li_Getctxname: '',
      Li_ProcessDivision: 1,
      Li_Option: '',
      Li_Child: true
    }
    this.callModal(props, '90%', 'WS2537001_PersonalReserveProcess', 'custom-button-close')
  }

  handleChange = (value, name) => {
    if (name === 'State') {
      this.formRef?.current?.setFieldsValue({ Pay: null })
      this.setState({
        initParams: {
          ...this.state.initParams,
          [name]: value,
          Pay: null,
        }
      }, () => this.loadInitData(this.state.initParams))
    } else if (name === 'Pay') {
      this.formRef?.current?.setFieldsValue({ State: null });
      this.setState({
        initParams: {
          ...this.state.initParams,
          [name]: value,
          State: null,
        }
      }, () => this.loadInitData(this.state.initParams))
    } else {
      this.setState({
        initParams: {
          ...this.state.initParams,
          [name]: value,
        }
      }, () => this.loadInitData(this.state.initParams))
    }
  }

  ReturnComponent = (component) => {
    let components = {
      WS2583001_ConsultInquirySub,
      WS2537001_PersonalReserveProcess,
      WS2624002_VisitsChangeConfirm,
      WS2624003_VisitsCancelConfirm,
      WS2621001_PaymentProcessSub,
      WS2623001_DispensingProcessSub,
      WS2622003_ReceiptProcessSub,
      WS0956001_PaymentCorrectSub,
      WS0650001_DocumentBatchCreateSub
    };
    return components[component];
  }

  callModal = (props, width, nameScreen, className) => {
    let Component = this.ReturnComponent(nameScreen);
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: width,
        className: className,
        component: (
          <Component
            {...props}
            onFinishScreen={(outPut) => {
              if (outPut.nameScreen === nameScreen) {
                this.loadData()
                if (outPut.StsSend) {
                  this.closeModal()
                }
              }
              if (outPut.nameScreen === 'WS2537001_PersonalReserveProcess') {
                if (outPut.Lo_Update) {
                  this.loadData();
                  this.setState({ Li_Change: Math.round(Math.random()*1000) })
                }
                this.closeModal()
              }
              if (nameScreen === 'WS2624002_VisitsChangeConfirm') {
                this.loadData();
                this.closeModal()
              }
            }}
          />
        ),
      },
    });
  }

  renderMenu = (record) => (
    <Menu >
      {/* user action 1 照会 2583*/}
      <Menu.Item
        onClick={() => {
          let props = { Li_ReserveNum: record.reserve_num }
          this.callModal(props, '60%', 'WS2583001_ConsultInquirySub')
        }}>照会</Menu.Item>
      {/* user action 2 変更 2537*/}
      <Menu.Item
        onClick={() => {
          let props = {
            Li_CourseLevel: '',
            Li_ReserveNum: record.reserve_num,
            Li_PersonalNum: '',
            Li_Date: this.state.initParams.DateChar,
            Li_Getctxname: '',
            Li_ProcessDivision: '',
            Li_Option: '',
            Li_Child: true
          }
          this.callModal(props, '90%', 'WS2537001_PersonalReserveProcess', 'custom-button-close')
        }}>変更</Menu.Item>
      {/* user action 3 受付 2624*/}
      <Menu.Item
        hidden={!(record.state_flag !== 1)}
        onClick={() => {
          let props = {
            Li_CourseLevel: record.course_level,
            Li_ReserveNum: record.reserve_num,
            // Li_AcceptOrCancel: 0, // => VisitsCancelConfirm
            // Li_Date: '',
            AcceptNum: record.AcceptNum,
          }
          userAction3CounterAction(props)
            .then(() => this.loadData())
            .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
        }}>受付</Menu.Item>
      {/* user action 4 取消 2624*/}
      <Menu.Item
        hidden={!(record.state_flag === 1)}
        onClick={() => {
          let props = {
            Li_CourseLevel: record.course_level,
            Li_ReserveNum: record.reserve_num,
            Li_AcceptOrCancel: 1,
            Li_Date: '',
            Li_AcceptNum: record.AcceptNum,
          }
          this.callModal(props, 600, 'WS2624003_VisitsCancelConfirm')
        }}>取消</Menu.Item>
      {/* user action 5 入金 2621*/}
      <Menu.Item
        hidden={!record?.Expression_37}
        onClick={() => {
          let props = { Li_ReserveNum: record.reserve_num }
          this.callModal(props, 600, 'WS2621001_PaymentProcessSub')
        }}>{record?.Expression_37}</Menu.Item>
      {/* user action 6 出金 2623*/}
      <Menu.Item
        hidden={!record.Expression_39}
        onClick={() => {
          let props = { Li_ReserveNum: record.reserve_num }
          this.callModal(props, 600, 'WS2623001_DispensingProcessSub')
        }}>{record.Expression_39}</Menu.Item>
      {/* user action 7 領収 2622*/}
      <Menu.Item
        hidden={!record.Expression_40}
        onClick={() => {
          let props = {
            Li_SpecifiedIdentify: '',
            Li_ReserveNum: record.reserve_num,
          }
          this.checkWidthInWS2622003(props)
        }} >{record.Expression_40}</Menu.Item>
      {/* user action 8 入金訂正 0956*/}
      <Menu.Item
        hidden={!record.Expression_38}
        onClick={() => {
          let props = {
            Li_BillingManageNum: record.Expression_61,
            Li_Identify: 1,
            Li_ModificationLevel: '',
          }
          this.callModal(props, 1200, 'WS0956001_PaymentCorrectSub')
        }} >{record.Expression_38}</Menu.Item>
      {/* user action 10 予約関連 0650*/}
      <Menu.Item
        onClick={() => {
          let props = {
            Li_CourseLevel: record.course_level,
            Li_ReserveNum: record.reserve_num,
            Li_OutputUnit: '',
            Li_OutputPattern: ''
          }
          this.callModal(props, 600, 'WS0650001_DocumentBatchCreateSub')
        }}>予約関連</Menu.Item>
    </Menu>
  )

  renderDivExpression = (start, end, object, startColor) => {
    let arrayValue = [];
    if (object.id) {
      for (const property in object) {
        if (`Expression_${start}` === property && start <= end) {
          arrayValue.push({
            property: object[`Expression_${start}`] ? object[`Expression_${start}`] : '',
            color: object[`Expression_${startColor}`] ? object[`Expression_${startColor}`] : 210
          });
          start++;
          startColor++;
        }
      }
    } else {
      for (let index = start; index <= end; index++) {
        arrayValue.push({ property: '', color: 210 })
      }
    }
    return (
      <Row>
        <Col span={1}></Col>
        {arrayValue.map((item, index = start) => (
          <Col span={2} style={{ maxWidth: 'none' }} key={`Expression_${index}`}>
            <div style={{
              ...styleDivExpression,
              background: Color(item.color).Background,
              color: item.color === 156 ? '#FFFFFF' : '#ABADB3'
            }}>
              {item.property}
            </div>
          </Col>
        ))}
      </Row>
    )
  }

  renderDivCacl = (title, price) => (
    <Col span={3}>
      <div style={styleDivTitle}>{title}</div>
      <div style={styleDivResult}>{
        price === 0 ? null : price?.toLocaleString()}
      </div>
    </Col>
  )

  AcceptBtn = () => {
    const { record, iniObj } = this.state;
    let params = {
      state_flag: record.state_flag,
      DeskReceptistConfirmed: iniObj.DeskReceptistConfirmed,
      course_level: record.course_level,
      reserve_num: record.reserve_num,
      visit_date_on: record.visit_date_on,
      personal_1_total_price: record.personal_1_total_price,
      personal_2_total_price: record.personal_2_total_price,
      personal_3_total_price: record.personal_3_total_price,
      deposit_price_1: record.deposit_price_1,
      deposit_price_2: record.deposit_price_2,
      deposit_price_3: record.deposit_price_3,
      AcceptNum: record.AcceptNum
    }
    AcceptButtonAction(params)
      .then(res => {
        if (res.data) {
          let props = { Li_ReserveNum: res.data.Li_ReserveNum }
          if (res.data.message.includes('WS2621001_PaymentProcessSub')) {
            this.callModal(props, 600, 'WS2621001_PaymentProcessSub')
          }
          this.loadData()
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: ''
      },
    });
  }

  EnterC = () => {
    eventEnterC_CounterAction({
      ReserveNumAndPersonalNum: this.state.initParams.ReserveNumAndPersonalNum,
      DateChar: this.state.initParams.DateChar
    })
      .then(res => {
        if (res?.data) {
          let dataRes = res.data;
          let props = {
            ...dataRes.variables,
            Li_Child: true
          }
          switch (dataRes.message) {
            case 'Call Screen WS2624002': this.callModal(props, 600, 'WS2624002_VisitsChangeConfirm'); break;
            case 'Call Screen WS2624003': this.callModal(props, 600, 'WS2624003_VisitsCancelConfirm'); break;
            case 'Call Screen WS2537001': this.callModal(props, '90%', 'WS2537001_PersonalReserveProcess', 'custom-button-close'); break;
            default:
              break;
          }
        }
      })
      .catch()
  }

  render() {
    const { FacilityTypeList, dataSource, record } = this.state;
    return (
      <div className="counter">
        <Card title='窓口'>
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{ ...this.state.initParams, DateChar: moment(this.state.initParams.DateChar) }}>
            <Menubar items={this.state.menuItems} />
            <Row gutter={16} className="mb-3 mt-3">
              <Col span={4}>
                <Form.Item name="DateChar" label="日付" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" onChange={(date, dateString) => this.handleChange(dateString, 'DateChar')} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="FacilityType" label="施設" >
                  <Select onChange={(value) => this.handleChange(value, 'FacilityType')}>
                    {FacilityTypeList?.map((item, index) => (
                      <Select.Option key={'FacilityType_' + index} value={item.DisplayField}>{item.LinkedField}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="State" label="受付" >
                  <Radio.Group onChange={(e) => this.handleChange(e.target.value, 'State')}>
                    <Radio value='1'>全　て</Radio>
                    <Radio value='2'>未処理</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="Pay" label="入金">
                  <Radio.Group onChange={(e) => this.handleChange(e.target.value, 'Pay')}>
                    <Radio value='1'>全　て</Radio>
                    <Radio value='2'>未処理</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="ReserveNumAndPersonalNum" label="バーコード" >
                  <Input
                    onKeyPress={this.EnterC}
                    onChange={(e) => this.handleChange(e.target.value, 'ReserveNumAndPersonalNum')}
                    onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: (
                            <WS0273001_VisitsTargetSearchQuery
                              LnkOutReserveNum={this.state.initParams.ReserveNumAndPersonalNum}
                              Li_StateFlagSpecify={0}
                              Li_DateSpecify={''}
                              Li_StsConditionSpecify={''}
                              Li_StsReceiptAmountDisplay={''}
                              onFinishScreen={({ LnkOutReserveNum, recordData }) => {
                                this.handleChange(LnkOutReserveNum, 'ReserveNumAndPersonalNum');
                                this.formRef?.current?.setFieldsValue({ ReserveNumAndPersonalNum: LnkOutReserveNum })
                                this.closeModal()
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={16}>
                <Table
                  size='small'
                  dataSource={dataSource}
                  bordered
                  pagination={{
                    ...this.state.pagination,
                    hideOnSinglePage: dataSource?.length > 10 ? false : true
                  }}
                  rowClassName={(record, index) => record.id === this.state.record.id ? 'hightlight-row-selected' : ''}
                  loading={this.state.isLoading}
                  rowKey={record => record.id}
                  onRow={(record, index) => ({ onClick: event => this.setState({ record: record, importance: record.Expression_60 }) })}
                >
                  <Table.Column title="受付No" dataIndex="receipt_number" render={(text, record) => (
                    <p style={{ textAlign: 'right', margin: 0 }}>{text === 0 || text === '0' ? null : text}</p>
                  )} />
                  <Table.Column title="氏名" dataIndex="kanji_name" />
                  <Table.Column title="コース" dataIndex="" render={(text, record, index) => (
                    <Space>
                      {record.visit_course} {record.contract_short_name}
                    </Space>
                  )} />
                  <Table.Column title="事業所" dataIndex="office_kanji_name" />
                  <Table.Column title="請求額" dataIndex="Expression_21" render={(text, record) => (
                    <p style={{ textAlign: 'right', margin: 0 }}>{text === 0 || text === '0' ? null : text.toLocaleString()}</p>
                  )} />
                  <Table.Column title="受付" dataIndex="Expression_23" align='center' render={(text, record) => (
                    <p style={text === '×' ? styleContentTableColumn : { margin: 0, height: '22px' }}>{text}</p>
                  )} />
                  <Table.Column title="入金" dataIndex="Expression_25" align='center' render={(text, record) => (
                    <p style={text === '×' ? styleContentTableColumn : { margin: 0, height: '22px' }}>{text}</p>
                  )} />
                  <Table.Column title="領収" dataIndex="Expression_27" align='center' render={(text, record) => (
                    <p style={text === '×' ? styleContentTableColumn : { margin: 0, height: '22px' }}>{text}</p>
                  )} />
                  <Table.Column width={60} render={(text, record, index) => (
                    <Dropdown.Button trigger='click' size='small' overlay={() => this.renderMenu(record)}></Dropdown.Button>
                  )} />
                </Table>
              </Col>
              <Col span={8}>
                <div style={{ border: '1px solid #C8DCF5', padding: '10px' }}>
                  <div style={{ position: 'relative', borderBottom: '1px solid #C8DCF5' }}>
                    <Form.Item label="個人番号">
                      <Row gutter={10}>
                        <Col span={10}><p style={{ textAlign: 'right' }}>{record?.personal_number_id}</p></Col>
                        <Col span={6}>
                          <Button
                            type={this.state.importance === 0 ? 'default' : 'text'}
                            icon={ReturnIcon(this.state.importance)}
                            size='small'
                            style={{ display: record?.personal_number_id ? '' : 'none' }}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1600,
                                  component: (
                                    <WS2584019_PersonalInfoInquirySub
                                      Li_PersonalNum={record?.personal_number_id}
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
                          ></Button>
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item label="　　氏名" >
                      <Row><Col span={16}><span>{record?.Expression_43}</span></Col></Row>
                    </Form.Item>
                    <Form.Item label='　　　　' >
                      <Row><Col span={16}><span>{record?.Expression_44}</span></Col></Row>
                    </Form.Item>
                    <Form.Item label="生年月日" >
                      <Row>
                        {/* <Col span={5}><span>{record?.Expression_45 ? moment(record?.Expression_45).format('NNy/MM/DD') : null}</span></Col> */}
                        <Col span={5}><span>{record?.Expression_45}</span></Col>
                        <Col span={11} ><span>{record?.Expression_46}</span></Col>
                      </Row>
                    </Form.Item>
                    <div>
                      <img src={record?.Expression_59?.substr(11) === '男性.png' ? GetImage('man') : GetImage('woman')} alt="gender"
                        style={{ display: record?.Expression_59 ? '' : 'none', position: 'absolute', top: '15%', right: '5%', width: '15%' }} />
                    </div>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <Form.Item label="　事業所">
                      <span>{record?.Expression_47}</span>
                    </Form.Item>
                    <Form.Item label="　保険者">
                      <span>{record?.insurer_kanji_name}</span>
                    </Form.Item>
                    <Form.Item label="　保険証">
                      <span>{record?.Expression_58}</span>
                    </Form.Item>
                  </div>
                </div>

                <div className='mt-3' style={{ border: '1px solid #C8DCF5', padding: '10px' }}>
                  <Form.Item label="　受診日">
                    <Row gutter={10}>
                      <Col span={10}>
                        <Form.Item >
                          <span>{record?.Expression_48}</span>
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item label="　受診No" >
                          <InputNumber maxLength={6} value={record?.AcceptNum} style={{ width: '50px' }}
                            readOnly={!(record?.state_flag !== 1 && !this.state.iniObj?.DeskReceptistConfirmed)} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item style={{ float: 'right' }} >
                          <div style={{ ...styleDiv, color: Color(record?.Expression_55)?.Foreground }}>{record?.Expression_54}</div>{/* Expression_54 */}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label="　時間帯"  >
                    <span>{record?.Expression_49 ? moment(record?.Expression_49, 'HH:mm').format('HH:mm') : null}</span>
                  </Form.Item>
                  <Form.Item label="　施　設"  >
                    <span>{record?.Expression_52}</span>
                  </Form.Item>
                  <Form.Item label="　コース" >
                    <Row gutter={10}>
                      <Col span={2}>
                        <Form.Item >
                          <span>{record?.Expression_50}</span>
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Form.Item >
                          <Button
                            icon={<MoreOutlined />}
                            size='small'
                            disabled={!record?.Expression_50}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1600,
                                  component: (
                                    <WS0605127_ContractLineItemDisplay
                                      Li_ContractType={record?.contract_type}
                                      Li_ContractOrgCode={record?.contract_organization_code}
                                      Li_ContractStartDate={record?.contract_start_date_on}
                                      Li_ContractNum={record?.contract_number}
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
                          ></Button>
                        </Form.Item>
                      </Col>
                      <Col span={20} >
                        <Form.Item >
                          <span>{record?.Expression_51}</span>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label="　備　考" >
                    <span>{record?.Expression_53}</span>
                  </Form.Item>

                  <div className='mt-3'>
                    {this.renderDivExpression(66, 75, record, 89)}
                    {this.renderDivExpression(76, 85, record, 99)}
                  </div>

                  <div className='mt-3' style={{ height: '355px' }}>
                    <WS2587021_InspectChangeQuerySub
                      Li_ReserveNum={record?.reserve_num}
                      Li_DataClassify={''}
                      Li_Course={record?.visit_course}
                      Li_ContractStartDate={record?.contract_start_date_on}
                      Li_Change={this.state.Li_Change}
                    />
                  </div>
                </div>

                <Row className='mt-3'>
                  <Col span={3}></Col>
                  {this.renderDivCacl('保険者', record?.insurer_total_price)}
                  {this.renderDivCacl('事業所', record?.office_total_price)}
                  {this.renderDivCacl('他団体', record?.organization_total_price)}
                  {this.renderDivCacl('個人１', record?.personal_1_total_price)}
                  {this.renderDivCacl('個人２', record?.personal_2_total_price)}
                  {this.renderDivCacl('個人３', record?.personal_3_total_price)}
                  {this.renderDivCacl('合計', record?.Expression_87)}
                </Row>
              </Col>
            </Row>

            <Form.Item style={{ float: 'right' }} className='mt-3'>
              <Space>
                <Button type="primary" onClick={() => {
                  if (record?.reserve_num) {
                    let props = {
                      Li_CourseLevel: '',
                      Li_ReserveNum: record?.reserve_num,
                      Li_PersonalNum: '',
                      Li_Date: '',
                      Li_Getctxname: '',
                      Li_ProcessDivision: '',
                      Li_Option: '',
                      Li_Child: true
                    }
                    this.callModal(props, '90%', 'WS2537001_PersonalReserveProcess', 'custom-button-close')
                  }
                }}>変更</Button>
                <Button type="primary" disabled={!record?.Expression_86}
                  onClick={this.AcceptBtn}
                >{record?.Expression_56 ? record?.Expression_56 : '受付'}</Button>
              </Space>
            </Form.Item>

          </Form>
        </Card>
        {ModalCustom({
          className: this.state.childModal.className,
          width: this.state.childModal.width,
          visible: this.state.childModal.visible,
          component: this.state.childModal.component,
          destroyOnClose: true,
          onCancel: this.closeModal
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2620001_Counter);
