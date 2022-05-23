import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Radio, Select, Button, Table, Row, Col, DatePicker, message, Spin, Modal, Menu, Dropdown } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, MoreOutlined, } from "@ant-design/icons";
import HourlyReserveListAction from 'redux/ReservationBusiness/ReserveStatusSearch/HourlyReserveList.actions'
import moment from "moment";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import WS2537001_PersonalReserveProcess from "../V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import WS0650001_DocumentBatchCreateSub from "pages/JZ_AdvancePreparation/V4JZ0102003_DocumentBatchCreate/WS0650001_DocumentBatchCreateSub";
import WS3020036_CoupledPrintInstruction from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS3020036_CoupledPrintInstruction";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import Color from "constants/Color";
class WS2529001_HourlyReserveList extends React.Component {
  static propTypes = {
    Li_Date: PropTypes.any,
    Li_Facility: PropTypes.any,
    Li_TimeZoneAm_Pm: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = '時間別予約一覧';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: '',
      },
      isLoaddingTimeZoneList: false,
      isLoaddingExamineeList: false,
      selectedRow: {},
      selectedRowKeys: [],
      dataTable: [],
      tableData: [],
      isLoadingForm: false,
    };
  }

  componentDidMount() {
    this.GetScreenData()
  }
  componentDidUpdate(PreV) {
    if (this.props !== PreV) {
      this.GetScreenData()
    }
  }

  GetScreenData() {
    this.setState({
      isLoaddingTimeZoneList: true,
      isLoadingForm: true
    })
    let data = {
      date: this.isEmpty(this.props.Li_Date) ? "" : this.props.Li_Date,
      Li_FacilityNum: this.isEmpty(this.props.Li_Facility) ? "" : this.props.Li_Facility,
      Li_Ampm: this.isEmpty(this.props.Li_TimeZoneAm_Pm) ? "" : this.props.Li_TimeZoneAm_Pm,
    }
    HourlyReserveListAction.GetScreenData(data)
      .then(res => {
        res.DateChars = this.isEmpty(res?.DateChars) ? moment(null) : moment(res?.DateChars)

        data = {
          ...res,
          DateChars: this.props.Li_Date ? moment(this.props.Li_Date) : moment(new Date()),
          Facility: this.props.Li_Facility ? this.props.Li_Facility : res.ComboBox_Facility.length > 0 ? res.ComboBox_Facility[0].LinkedField : null,
          TimeZoneAm_Pm: this.props.Li_TimeZoneAm_Pm ? this.props.Li_TimeZoneAm_Pm : '',
          ReserveDisplayItemNumeric: res.ComboBox_ReserveDisplayItemNumeric.length > 0 ? res.ComboBox_ReserveDisplayItemNumeric[0].item : null,
        }
        this.formRef.current?.setFieldsValue(data)
        this.TimeZoneList(null)
      })
      .catch(error => {
        this.setState({ isLoadingForm: false })
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoaddingTimeZoneList: false }))
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  TimeZoneList(record) {
    this.setState({ isLoaddingTimeZoneList: true })
    let data = {
      DateChars: this.isEmpty(this.formRef.current?.getFieldValue("DateChars")) ? "" : this.formRef.current?.getFieldValue("DateChars").format("YYYY/MM/DD"),
      Facility: this.isEmpty(this.formRef.current?.getFieldValue("Facility")) ? "" : this.formRef.current?.getFieldValue("Facility"),
      TimeZoneAm_Pm: this.isEmpty(this.formRef.current?.getFieldValue("TimeZoneAm_Pm")) ? "" : this.formRef.current?.getFieldValue("TimeZoneAm_Pm")
    }
    HourlyReserveListAction.TimeZoneList(data)
      .then(res => {
        this.setState({
          dataTable: res ? res : [],
          selectedRow: {},
          selectedRowKeys: []
        })
        if (record) {
          this.ExamineeList(record)
        } else {
          this.ExamineeList(res?.[0])
        }
      })
      .catch(error => {
        this.setState({ isLoadingForm: false })
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoaddingTimeZoneList: false }))
  }

  ExamineeList(record) {
    this.setState({ isLoaddingExamineeList: true })
    let data = {
      W5_time_f: record?.W5_time_f ? record?.W5_time_f : ""
    }
    HourlyReserveListAction.ExamineeList(data)
      .then(res => {
        this.setState({
          tableData: res ? res : [],
          isLoadingForm: false,
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
      .finally(() => this.setState({
        isLoaddingExamineeList: false,
        isLoadingForm: false
      }))
  }

  user_action3(record) {
    let params = {
      DateChars: this.isEmpty(this.formRef.current?.getFieldValue("DateChars")) ? "" : this.formRef.current?.getFieldValue("DateChars").format("YYYY/MM/DD"),
      Facility: this.isEmpty(this.formRef.current?.getFieldValue("Facility")) ? "" : this.formRef.current?.getFieldValue("Facility"),
      TimeZoneAm_Pm: this.isEmpty(this.formRef.current?.getFieldValue("TimeZoneAm_Pm")) ? "" : this.formRef.current?.getFieldValue("TimeZoneAm_Pm"),
      Li_CourseLevel: record.W1_course_level,
      Li_ReserveNum: record.W1_reserve_num
    }

    HourlyReserveListAction.user_action3(params)
      .then(res => {
      })
      .catch(error => {
        this.setState({ isLoadingForm: false })
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: ''
      },
    });
  }

  render() {
    return (
      <div className="hourly-reserve-list">
        <Card title="時間別予約一覧">
          <Spin spinning={this.state.isLoadingForm}>
            <Form
              ref={this.formRef} autoComplete="off" >
              <Row gutter={24}>
                <Col style={{ width: 340, marginRight: 5, paddingRight: 0 }}>
                  <Row>
                    <Form.Item name="DateChars" label="受診日" style={{ width: 163 }}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format={"YYYY/MM/DD"} />
                    </Form.Item>
                    <Form.Item name="Facility" label="施設" style={{ marginLeft: 7, width: 'calc(100% - 170px)' }}>
                      <Select>
                        {this.formRef.current?.getFieldValue("ComboBox_Facility")?.map(value => (
                          <Select.Option key={'Facility-' + Math.random()} value={value?.LinkedField}>{value?.DisplayField}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Row>
                </Col>
                <Col style={{ width: 'calc(100% - 345px)' }}>
                  <Row gutter={24}>
                    <Col span={11}>
                      <Form.Item name="TimeZoneAm_Pm" label="時間区分" >
                        <Radio.Group>
                          <Radio value=''>全て</Radio>
                          <Radio value="AM">AM</Radio>
                          <Radio value="PM">PM</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name="ReserveDisplayItemNumeric" label="検査項目" >
                        <Select>
                          {this.formRef.current?.getFieldValue("ComboBox_ReserveDisplayItemNumeric")?.map(value => (
                            <Select.Option key={'ReserveDisplayItemNumeric-' + Math.random()} value={value?.item}>{value?.display}</Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item>
                        <Button type="primary" onClick={() => this.TimeZoneList()} >表 示</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>

            <Row gutter={24} style={{ marginTop: 15 }}>
              <Col style={{ width: 340, marginRight: 5, paddingRight: 0 }}>
                <Table dataSource={this.state.dataTable}
                  loading={this.state.isLoaddingTimeZoneList}
                  pagination={false} size="small" bordered={true}
                  rowKey={(record) => record.id} scroll={{ y: 760 }}
                  rowSelection={{
                    type: 'radio',
                    selectedRowKeys: this.state.selectedRowKeys,
                    onChange: async (selectedRowKeys, selectedRows) => {
                      this.ExamineeList(selectedRows[0])
                      this.setState({
                        selectedRow: selectedRows[0],
                        selectedRowKeys: selectedRowKeys
                      })
                    }
                  }} >
                  <Table.Column title="時間帯" dataIndex="W5_time_f" align='center' width={60}
                    render={(value, record, index) => {
                      return <span>{value === '00:00:00' ? '' : value?.substr(0, 5)}</span>
                    }}
                  />
                  <Table.Column title="合計" dataIndex="Expression_1"
                    render={(value, record, index) => {
                      return <div style={{ textAlign: 'right' }}>{record.Expression_1 === 0 ? '' : record.Expression_1}</div>
                    }} />
                  <Table.Column title="男性" dataIndex="Expression_2"
                    render={(value, record, index) => {
                      return <div style={{ textAlign: 'right' }} >{record.Expression_2 === 0 ? '' : record.Expression_2}</div>
                    }} />
                  <Table.Column title="女性" dataIndex="Expression_3"
                    render={(value, record, index) => {
                      return <div style={{ textAlign: 'right' }}>{record.Expression_3 === 0 ? '' : record.Expression_3}</div>
                    }} />
                  <Table.Column width={40} align='center'
                    render={(value, record, index) => {
                      return (
                        <Dropdown
                          overlay={() => (
                            <Menu>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: '90%',
                                      className: 'custom-button-close',
                                      component:
                                        <WS2537001_PersonalReserveProcess
                                          Li_Date={this.props.Li_Date}
                                          Li_Option={''}
                                          Li_Child={true}
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                    }
                                  })
                                }}
                              >
                                個人予約
                              </Menu.Item>
                            </Menu>
                          )}
                        >
                          <Button size='small' icon={<MoreOutlined />}></Button>
                        </Dropdown>
                      )
                    }} />

                </Table>
              </Col>
              <Col style={{ width: 'calc(100% - 345px)' }}>
                <Table dataSource={this.state.tableData}
                  loading={this.state.isLoaddingExamineeList}
                  pagination={false} size="small" bordered={true}
                  rowKey={(record) => record.id} scroll={{ y: 760 }}
                >
                  <Table.Column title="個人番号" dataIndex="personal_number_id" width={70}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>{value}</div>
                      )
                    }}
                  />
                  <Table.Column title="ﾒﾓ" dataIndex="Expression_11" width={30} align='center'
                    render={(value, record, index) => {
                      let icon = null;
                      switch (record.Expression_11) {
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
                      return (<div style={{ cursor: 'pointer' }}
                        onClick={() => {
                          let title = '個人情報照会SUB' + ' [' + record.personal_number_id + ']'
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '90%',
                              component: (
                                <Card title={title}>
                                  <WS2584019_PersonalInfoInquirySub
                                    Li_PersonalNum={record.personal_number_id}
                                  />
                                </Card>
                              ),
                            },
                          });
                        }} >{icon}</div>)
                    }} />
                  <Table.Column title="漢字氏名" dataIndex="KanjiName" />
                  <Table.Column title="性別" dataIndex="Expression_8" width={60} align='center'
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record.Expression_9)?.Foreground }}>{value}</div>
                      )
                    }} />
                  <Table.Column title="事業所" dataIndex="office_kanji_name" />
                  <Table.Column title="コース" dataIndex="visit_course"
                    render={(value, record, index) => {
                      return <span>{value}&ensp; {record?.contract_short_name}</span>
                    }} />
                  <Table.Column title="検査内容" dataIndex="ConsultExamList" />
                  <Table.Column width={40} align='center'
                    render={(value, record, index) => {
                      return (
                        <Dropdown
                          overlay={() => (
                            <Menu>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: '90%',
                                      component:
                                        <WS2583001_ConsultInquirySub
                                          Li_ReserveNum={record.W1_reserve_num}
                                          onFinishScreen={() => {
                                            this.closeModal()
                                          }}
                                        />
                                    }
                                  })
                                }}
                              >
                                照会
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: '90%',
                                      className: 'custom-button-close',
                                      component:
                                        <WS2537001_PersonalReserveProcess
                                          Li_CourseLevel={record.W1_course_level}
                                          Li_ReserveNum={record.W1_reserve_num}
                                          Li_PersonalNum={this.props.personal_number_id}
                                          Li_Date={this.formRef.current?.getFieldValue("DateChars")?.format("YYYY/MM/DD")}
                                          Li_Child={true}
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                    }
                                  })
                                }}
                              >
                                変更
                              </Menu.Item>
                              <Menu.Item hidden={record.state_flag === 1}
                                onClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 350,
                                      component:
                                        <WS0061015_CheckYesNoNo
                                          Li_Message={'予約を取り消しますか？'}
                                          onFinishScreen={({ Lio_StsReturn }) => {
                                            if (Lio_StsReturn) {
                                              this.user_action3(record)
                                            }
                                            this.closeModal()
                                          }}
                                        />
                                    }
                                  })
                                }}
                              >
                                削除
                              </Menu.Item>
                              <Menu.Item hidden={record.state_flag === 0}
                                onClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 600,
                                      component:
                                        <WS0650001_DocumentBatchCreateSub
                                          Li_CourseLevel={record.W1_course_level}
                                          Li_ReserveNum={record.W1_reserve_num}
                                          onFinishScreen={() => {
                                            this.closeModal()
                                          }}
                                        />
                                    }
                                  })
                                }}
                              >
                                予約関連
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: 750,
                                      component:
                                        <WS3020036_CoupledPrintInstruction
                                          Li_CourseLevel={record.W1_course_level}
                                          Li_ReserveNum={record.W1_reserve_num}
                                          onFinishScreen={() => {
                                            this.closeModal()
                                          }}
                                        />
                                    }
                                  })
                                }}
                              >
                                結果印刷
                              </Menu.Item>
                            </Menu>
                          )}
                        >
                          <Button size='small' icon={<MoreOutlined />}></Button>
                        </Dropdown>
                      )
                    }} />
                </Table>
              </Col>
            </Row>
          </Spin>
        </Card>
        <ModalDraggable
          className={this.state.childModal.className}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2529001_HourlyReserveList);
