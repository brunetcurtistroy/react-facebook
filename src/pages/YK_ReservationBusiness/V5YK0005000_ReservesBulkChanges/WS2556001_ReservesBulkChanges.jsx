import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Button, Row, Col, Modal, Divider, Space, Table, message, InputNumber } from "antd";
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

import {
  getScreenReservesBulkChangesAction, ExtractAction, InspectChanges_F09_01Action, GetNameOfficeCodeAction,
  InspectChanges_F09_02Action, Cancel_F10_01Action, Cancel_F10_02Action, ReserveChange_F11_01Action, ReserveChange_F11_02Action
} from "redux/ReservationBusiness/ReservesBulkChanges/ReservesBulkChanges.action";

import WS2788013_TargetSelectSub from 'pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS2788013_TargetSelectSub.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS2786001_ConditionAddSub from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub.jsx';
import WS2556015_MoneyAmountInput from 'pages/YK_ReservationBusiness/V5YK0005000_ReservesBulkChanges/WS2556015_MoneyAmountInput.jsx';
import WS2556064_ReserveChange from 'pages/YK_ReservationBusiness/V5YK0005000_ReservesBulkChanges/WS2556064_ReserveChange.jsx';
import WS2533001_ConfirmSub from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2533001_ConfirmSub.jsx';
import PropTypes from "prop-types";
import Color from "constants/Color";

class WS2556001_ReservesBulkChanges extends React.Component {
  static propTypes = {
    Li_MenuOption: PropTypes.any,
    Li_ExtractDateF: PropTypes.any,
    LnkinExtractDateT: PropTypes.any,
    Li_ExtractOffice: PropTypes.any,
    Li_ExtractBranchStore: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '予約一括変更';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      FacilityType: [],
      message: '',
      isLoading: false,
      office_kanji_name: '',
      contract_short_name: '',
      colorConditionAddBtn: 163,
      initObj: {},
      objChild: {
        record: [],
        recordsID: []
      },
      initParams: {
        Facility: 0,
        DateFChar: '',
        DateTChar: '',
        OfficeCode: '',
        BranchStoreCode: '',
        CourseCode: '',
        KeyInfo: '',
      },

      isSearch: false,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.loadInitData();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.loadInitData();
    }
  }

  loadInitData = () => {
    getScreenReservesBulkChangesAction()
      .then(res => {
        this.setState({
          FacilityType: res?.data?.FacilityType,
          initObj: res.data,
          initParams: {
            ...this.state.initParams,
            KeyInfo: res.data.KeyInfo
          }
        });
        const { Li_MenuOption, Li_ExtractDateF, LnkinExtractDateT, Li_ExtractOffice, Li_ExtractBranchStore } = this.props;
        if (Li_MenuOption || Li_ExtractDateF || LnkinExtractDateT || Li_ExtractOffice || Li_ExtractBranchStore) {
          let params = {
            ...this.state.initParams,
            DateFChar: Li_ExtractDateF || '',
            DateTChar: LnkinExtractDateT || '',
            OfficeCode: Li_ExtractOffice || '',
            BranchStoreCode: Li_ExtractBranchStore || '',
          };
          this.setState({ initParams: { ...params } });
          this.formRef?.current?.setFieldsValue({
            DateFChar: moment(Li_ExtractDateF),
            DateTChar: moment(LnkinExtractDateT),
            OfficeCode: Li_ExtractOffice || '',
            BranchStoreCode: Li_ExtractBranchStore || '',
          });
          this.loadData(params);
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  loadData = (params) => {
    this.setState({ isLoading: true, objChild: { record: [], recordsID: [] } });
    ExtractAction(params)
      .then((res) => {
        if (res.data)
          this.setState({
            message: res.data.message,
            isLoading: false,
            isSearch: true
          })
      })
      .catch(err => {
        this.setState({ isLoading: false })
        message.error(err?.response?.data?.message || "エラーが発生しました")
      })
      .finally(() => this.setState({ message: '' }))
  }

  InspectChanges_F09 = () => {
    InspectChanges_F09_01Action()
      .then(res => {
        if (res?.data?.message === 'WS2556015_MoneyAmountInput') {
          let dateF = this.formRef?.current?.getFieldValue('DateFChar');
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 700,
              component: (
                <WS2556015_MoneyAmountInput
                  Li_ContractType={0}
                  Li_ContractOrgCode={''}
                  Li_ContractStartDate={'0000/00/00'}
                  Li_ContractNum={0}
                  Li_Date={moment(dateF, 'YYYY/MM/DD', true).isValid() ? moment(dateF).format('YYYY/MM/DD') : null}
                  Lio_NewAndDelete={0}
                  Lio_ContractPriority={true}
                  Lio_Tax={0.10}
                  Lo_StsEnter={false}
                  onFinishScreen={({ Lio_NewAndDelete, Lio_ContractPriority, Lio_Tax, Lo_StsEnter }) => {
                    if (Lo_StsEnter) {
                      InspectChanges_F09_02Action({
                        Lio_NewAndDelete,
                        StsContractPriority: Lio_ContractPriority,
                        Tax: Lio_Tax,
                        StsEnter: Lo_StsEnter
                      })
                    }
                    this.closeModal()
                  }}
                />
              ),
            },
          });
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  Cancel_F10 = () => {
    if (this.state.objChild.recordsID.length > 0) {
      Cancel_F10_01Action()
        .then((res) => {
          if (res?.data?.message === 'WS2533001_ConfirmSub') {
            let props = {
              Lo_ReturnBookReview: this.state.initObj.StsConfirmN,
              Li_Title: '【予約取消】受診情報を取り消しますか？',
            }
            this.Modal_WS2533001_ConfirmSub(props, 'F10')
          }
        })
        .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
    }
  }

  ReserveChange_F11 = () => {
    ReserveChange_F11_01Action()
      .then((res) => {
        if (res?.data?.message === 'WS2556064_ReserveChange') {
          this.setState({
            childModal: {
              ...this.state.childModal,
              visible: true,
              width: 600,
              component: (
                <WS2556064_ReserveChange
                  Lo_StsRun={this.state.initObj.StsConfirmL}
                  onFinishScreen={({ Lo_StsRun }) => {
                    this.closeModal()
                    if (Lo_StsRun && this.state.objChild.recordsID.length > 0) {
                      let props = {
                        Lo_ReturnBookReview: this.state.initObj.StsConfirmL,
                        Li_Title: '【予約変更】受診情報を変更しますか？',
                      }
                      this.Modal_WS2533001_ConfirmSub(props, 'F11')
                    }
                  }}
                />
              ),
            },
          });
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  Modal_WS2533001_ConfirmSub = (props, event) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1200,
        component: (
          <WS2533001_ConfirmSub
            {...props}
            onFinishScreen={({ Lo_ReturnBookReview }) => {
              if (Lo_ReturnBookReview === 6) {
                const params = {
                  ...this.state.initParams,
                  Facility: this.formRef?.current?.getFieldValue('Facility'),
                  DateFChar: this.formRef?.current?.getFieldValue('DateFChar'),
                  DateTChar: this.formRef?.current?.getFieldValue('DateTChar'),
                  OfficeCode: this.formRef?.current?.getFieldValue('OfficeCode'),
                  BranchStoreCode: this.formRef?.current?.getFieldValue('BranchStoreCode'),
                  CourseCode: this.formRef?.current?.getFieldValue('CourseCode')
                }
                event === 'F10'
                  ? Cancel_F10_02Action({ StsConfirmN: Lo_ReturnBookReview }).then(() => {
                    Modal.info({
                      content: '削除しました。',
                      okText: 'OK',
                      onOk: () => { this.loadData(params) }
                    })
                  })
                  : ReserveChange_F11_02Action({ StsConfirmN: Lo_ReturnBookReview }).then(() => this.loadData(params))
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  setValueChildren = (arr) => {
    let recordsID = arr?.map(item => item.id ? item.id : null)
    this.setState({
      objChild: {
        ...this.state.objChild,
        record: arr,
        recordsID: recordsID
      }
    })
  }

  setStateInitParams = (value, name) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        [name]: value
      }
    });
    if (name === 'OfficeCode' || name === 'BranchStoreCode') {
      this.setState({ office_kanji_name: '' })
    } else if (name === 'CourseCode') {
      this.setState({ contract_short_name: '' })
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

  onFinish(values) {
    const params = {
      ...values,
      ...this.state.initParams,
      DateFChar: moment(values.DateFChar).format("YYYY/MM/DD"),
      DateTChar: moment(values.DateTChar).format("YYYY/MM/DD"),
      OfficeCode: values.OfficeCode || '',
      BranchStoreCode: values.BranchStoreCode || '',
      CourseCode: values.CourseCode || ''
    }
    this.loadData(params);
  }

  renderTargetSub() {
    return (
      <WS2788013_TargetSelectSub
        isSearch={this.state.isSearch}
        message={this.state.message}
        setValueChildren={this.setValueChildren}
        params={this.formRef.current?.getFieldValue()}
      />
    )
  }

  getNameOfficeCode = (objChange) => {
    let params = {
      OfficeCode: this.state.initParams.OfficeCode,
      BranchStoreCode: this.state.initParams.BranchStoreCode
    }
    GetNameOfficeCodeAction({ ...params, ...objChange })
      .then((res) => {
        this.setState({ office_kanji_name: res?.data?.office_kanji_name || '' })
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  render() {
    return (
      <div className="reserves-bulk-changes">
        <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{ Facility: 0, DateFChar: moment(), DateTChar: moment() }}>
          <Card>
            <Row>
              <Col span={6} xl={6} lg={24} md={24} style={{ padding: '0 10px' }}>
                <Row>
                  <Space>
                    <Form.Item name="DateFChar" label="日　付">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" style={{ width: '120px' }}
                        onChange={(date, dateString) => this.setStateInitParams(dateString, "DateFChar")} />
                    </Form.Item>
                    <Form.Item>
                      <span>~</span>
                    </Form.Item>
                    <Form.Item name="DateTChar">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" style={{ width: '120px' }}
                        onChange={(date, dateString) => this.setStateInitParams(dateString, "DateTChar")} />
                    </Form.Item>
                  </Space>
                </Row>

                <Row >
                  <Col span={24}>
                    <Form.Item name="Facility" label="施　設" >
                      <Select style={{ width: '120px' }} onChange={(value) => this.setStateInitParams(value, "Facility")}>
                        {this.state.FacilityType?.map((item, index) => (
                          <Select.Option key={index + item.value} value={item.key}>{item.value}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Space>
                    <Form.Item name="OfficeCode" label="事業所" >
                      <Input.Search maxLength={8} style={{ width: '120px', textAlign: 'right' }}
                        onChange={(e) => this.setStateInitParams(e.target.value, "OfficeCode")}
                        onBlur={(e) => this.getNameOfficeCode({ OfficeCode: e.target.value })}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1200,
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  onFinishScreen={({ Lio_OfficeCode, Lio_BranchStoreCode, Lo_Kanji_Name, recordData }) => {
                                    this.formRef.current.setFieldsValue({
                                      OfficeCode: Lio_OfficeCode,
                                      BranchStoreCode: Lio_BranchStoreCode !== 0 ? Lio_BranchStoreCode : null
                                    });
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                      initParams: {
                                        ...this.state.initParams,
                                        OfficeCode: Lio_OfficeCode
                                      },
                                      office_kanji_name: Lo_Kanji_Name
                                    });
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="BranchStoreCode" >
                      <InputNumber 
                        style={{ width: '60px' }} 
                        onChange={(value) => this.setStateInitParams(value, "BranchStoreCode")} 
                        onBlur={(e) => this.getNameOfficeCode({ BranchStoreCode: e.target.value })}
                      />
                    </Form.Item>
                    <Form.Item >
                      <div>{this.state.office_kanji_name}</div>
                    </Form.Item>
                  </Space>
                </Row>

                <Row >
                  <Space>
                    <Form.Item name="CourseCode" label="コース" >
                      <Input.Search style={{ width: '120px' }}
                        onChange={(e) => this.setStateInitParams(e.target.value, "CourseCode")}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={({ Lo_CourseCode, recordData }) => {
                                    this.formRef.current.setFieldsValue({
                                      CourseCode: Lo_CourseCode
                                    });
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                      contract_short_name: recordData.course_name_short_name
                                    });
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item >
                      {/* <div>{this.state.contract_short_name}</div> */}
                    </Form.Item>
                  </Space>
                </Row>

                <Form.Item className="mb-3" style={{ float: "right" }}>
                  <Space>
                    <Button onClick={() => {
                      let dateF = this.formRef?.current?.getFieldValue('DateFChar');
                      let dateT = this.formRef?.current?.getFieldValue('DateFChar');
                      this.setState({ isSearch: false })
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component: (
                            <WS2786001_ConditionAddSub
                              Li_DateF={moment(dateF, 'YYYY/MM/DD', true).isValid() ? moment(dateF).format('YYYY/MM/DD') : null}
                              Li_DateT={moment(dateT, 'YYYY/MM/DD', true).isValid() ? moment(dateT).format('YYYY/MM/DD') : null}
                              Li_AcceptNoF={''}
                              Li_AcceptNoT={''}
                              Li_CourseF={this.formRef?.current?.getFieldValue('CourseCode')}
                              Li_CourseT={this.formRef?.current?.getFieldValue('CourseCode')}
                              Li_TimeDivision={''}
                              Li_FacilityType={this.formRef?.current?.getFieldValue('Facility')}
                              Li_State={''}
                              Li_Insurer={''}
                              Li_Office={this.formRef?.current?.getFieldValue('OfficeCode')}
                              Li_BranchShop={this.formRef?.current?.getFieldValue('BranchStoreCode')}
                              Li_PersonalNum={''}
                              Lio_KeyInfo={1}
                              onFinishScreen={({ Lio_KeyInfo, Expression_36 }) => {
                                if (Lio_KeyInfo && Expression_36) {
                                  this.setStateInitParams(Lio_KeyInfo, 'KeyInfo')
                                  this.setState({ colorConditionAddBtn: Expression_36 })
                                }
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}>
                      <PlusCircleOutlined />
                      <span style={{ color: Color(this.state.colorConditionAddBtn).Foreground }}>条件追加</span>
                    </Button>
                    <Button htmlType='submit'><SearchOutlined />検　　索</Button>
                  </Space>
                </Form.Item>

                <Divider></Divider>

                <Form.Item className='mb-3' style={{ float: "right" }}>
                  <Space>
                    <Button type="primary" onClick={() => this.InspectChanges_F09()}>検査変更</Button>
                    <Button type="primary" onClick={() => this.Cancel_F10()}>予約取消</Button>
                    <Button type="primary" onClick={() => this.ReserveChange_F11()}>予約変更</Button>
                  </Space>
                </Form.Item>
              </Col>
              <Col span={18} xl={18} lg={24} md={24}>
                {!this.state.isLoading
                  ? this.renderTargetSub()
                  :
                  (
                    <Table
                      size="small"
                      dataSource={[]}
                      loading={this.state.isLoading}
                      pagination={false}
                      bordered={true}
                    >
                      <Table.Column title="受診日" dataIndex="visit_date_on" />
                      <Table.Column title="時間" dataIndex="period_time" />
                      <Table.Column title="受付No" dataIndex="receipt_number" />
                      <Table.Column title="個人番号" dataIndex="personal_number_id" />
                      <Table.Column title="メモ" dataIndex="importance" />
                      <Table.Column title="漢字氏名" dataIndex="KanjiName" />
                      <Table.Column title="性別" dataIndex="Gender" />
                      <Table.Column title="生年月日" dataIndex="DateBirth" />
                      <Table.Column title="年齢" dataIndex="Age" />
                      <Table.Column title="メモ" dataIndex="expression_27" />
                      <Table.Column title="事業所" dataIndex="office_kanji_name" />
                      <Table.Column title="契約情報" />
                      <Table.Column title="状態" dataIndex="expression_15" />
                      <Table.Column title="備考" dataIndex="remarks" />
                      <Table.Column title="検査状況" dataIndex="InspectStatus" />
                    </Table>
                  )
                }
              </Col>
            </Row>
          </Card>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2556001_ReservesBulkChanges);
