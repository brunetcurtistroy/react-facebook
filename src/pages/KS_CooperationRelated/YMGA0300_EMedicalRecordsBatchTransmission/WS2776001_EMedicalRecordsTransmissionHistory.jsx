import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Select, Table, Row, Col, Tabs, Button, Space } from "antd";
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS2776003_InspectContent from 'pages/KS_CooperationRelated/YMGA0300_EMedicalRecordsBatchTransmission/WS2776003_InspectContent.jsx';
import WS2776004_RetransmissionOrDelete from 'pages/KS_CooperationRelated/YMGA0300_EMedicalRecordsBatchTransmission/WS2776004_RetransmissionOrDelete.jsx';
import EMedicalRecordsTransmissionHistoryAction from "redux/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsTransmissionHistory.action";
import { debounce } from "lodash";
import Color from "constants/Color";
import ModalDraggable from "components/Commons/ModalDraggable";

const { TabPane } = Tabs;

const customStyle = {
  styleInline: {
    display: 'inline-flex',
    marginRight: '5px',
    marginTop: '5px'
  },

  styleInput: {
    width: '75px',
    paddingLeft: '5px',
    // alignSelf: 'center'
  }
}
class WS2776001_EMedicalRecordsTransmissionHistory extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_PersonalNum: PropTypes.any,

    onFinishScreen: PropTypes.func,
  }

  constructor(props) {
    super(props);

    // document.title = '[E-カルテ]送信履歴';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataSource: [],
      isLoadingTable: false,
      selectedRows: [],
      selectedRowKeys: [],
      indexTable: 0,

      tabKey: '0'
    };

    this.onChangeTab = this.onChangeTab.bind(this)
  }

  async componentDidMount() {
    await this.setState({ tabKey: '0' })
    if (this.props.Li_PersonalNum) {
      this.formRef.current?.setFieldsValue({ PersonalNum: this.props.Li_PersonalNum })
    }
    this.onSearchData()
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      await this.setState({ tabKey: '0' })
      if (this.props.Li_PersonalNum) {
        this.formRef.current?.setFieldsValue({ PersonalNum: this.props.Li_PersonalNum })
      }
      this.onSearchData()
    }
  }

  async onChangeTab(key) {
    await this.setState({ tabKey: key })

    this.onSearchData()
  }

  onSearchData() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      InspectScheduledDateChar: this.formRef.current?.getFieldValue('InspectScheduledDateChar')?.format('YYYY/MM/DD'),
      SubmitDateChar: this.formRef.current?.getFieldValue('SubmitDateChar')?.format('YYYY/MM/DD')
    }

    this.setState({ isLoadingTable: true })

    if (this.state.tabKey === '0') {
      EMedicalRecordsTransmissionHistoryAction.getDataInspect(params)
        .then((res) => {
          this.setState({
            dataSource: res ? res : [],
            selectedRows: res && res.length > 0 ? res[0] : [],
            selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
            indexTable: 0,
            isLoadingTable: false
          })
        })
        .finally(() => this.setState({ isLoadingTable: false }))
    } else {
      EMedicalRecordsTransmissionHistoryAction.getDataImage(params)
        .then((res) => {
          this.setState({
            dataSource: res ? res : [],
            selectedRows: res && res.length > 0 ? res[0] : [],
            selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
            indexTable: 0,
            isLoadingTable: false
          })
        })
        .finally(() => this.setState({ isLoadingTable: false }))
    }
  }

  onFinish(values) {

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
    return (
      <div className="e-medical-records-transmission-history">
        <Card title="[E-カルテ]送信履歴">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              TransmissionState: 1
            }}
          >
            <Row gutter={24}>
              <Col span={5} style={{ paddingRight: 0 }}>
                <Form.Item name="PersonalNum" label={<div style={{ border: '1px solid #757575', padding: '0 7px' }}>個人番号</div>}>
                  <Input.Search style={{ textAlign: 'right' }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '90%',
                          component: (
                            <WS0248001_PersonalInfoSearchQuery
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  PersonalNum: output.Lo_PersonalNumId
                                })

                                this.onSearchData()
                                this.closeModal()
                              }}
                            />
                          ),
                        },
                      })
                    }}
                    onChange={debounce((e) => {
                      this.formRef.current?.setFieldsValue({ PersonalNum: e.target.value })
                      this.onSearchData()
                    }, 300)}
                  />
                </Form.Item>
              </Col>
              <Col span={5} style={{ paddingRight: 0 }}>
                <Form.Item name="InspectScheduledDateChar"
                  label={<div style={{ border: '1px solid #757575', padding: '0 7px' }}>検査予定日</div>}
                >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD"
                    onChange={(value) => this.onSearchData()} />
                </Form.Item>
              </Col>
              <Col span={5} style={{ paddingRight: 0 }}>
                <Form.Item name="SubmitDateChar"
                  label={<div style={{ border: '1px solid #757575', padding: '0 7px' }}>送信日付</div>}
                >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD"
                    onChange={(value) => this.onSearchData()} />
                </Form.Item>
              </Col>
              <Col span={4} style={{ paddingRight: 0 }}>
                <Form.Item name="TransmissionState"
                  label={<div style={{ border: '1px solid #757575', padding: '0 7px' }}>状態</div>}
                >
                  <Select style={{ width: '100%' }}
                    onChange={(value) => this.onSearchData()}>
                    <Select.Option value={0}>全て</Select.Option>
                    <Select.Option value={1}>有効</Select.Option>
                    <Select.Option value={2}>削除</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="InspectGroup"
                  label={<div style={{ border: '1px solid #757575', padding: '0 7px' }}>検査群</div>}
                >
                  <Input onChange={debounce((e) => this.onSearchData(), 300)} />
                </Form.Item>
              </Col>
            </Row>
            <br />
            <Tabs activeKey={this.state.tabKey} type="card" size="small" onChange={this.onChangeTab}>
              <TabPane tab="検査" key={'0'}>
                <Table
                  size='small'
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={true}
                  bordered
                  scroll={{ y: 600 }}
                  rowKey={(record) => record.id}
                  rowSelection={{
                    type: "radio",
                    fixed: 'left',
                    selectedRowKeys: this.state.selectedRowKeys,
                    onSelect: (record, selected, selectedRows) => {
                      let index = this.state.dataSource.findIndex(x => x.id === record.id)
                      this.setState({
                        selectedRows: selectedRows,
                        selectedRowKeys: selectedRows.map(x => x.id),
                        indexTable: index,
                      });
                    },
                  }}>
                  <Table.Column title="ｾｯｼｮﾝ番号" dataIndex="section_number" />
                  <Table.Column title="個人番号" dataIndex="personal_number_id" width={90}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>
                          {record.personal_number_id}
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="氏名" dataIndex="kanji_name" />
                  <Table.Column title="検査予定日" dataIndex="exam_scheduled_date_on" width={100} />
                  <Table.Column title="内容" dataIndex="Content" />
                  <Table.Column title="送信日付" dataIndex="submit_date_on" width={100} />
                  <Table.Column title="送信時間" dataIndex="transmission_time_at" width={80} align='center'
                    render={(value, record, index) => {
                      return (
                        <div>
                          {record.transmission_time_at?.substr(0, 5)}
                        </div>
                      )
                    }} />
                  <Table.Column title="送信" dataIndex="Expression_7" width={50} align='center'
                    render={(value, record, index) => {
                      return (
                        <span style={{ color: Color(record.Expression_8)?.Foreground }}>
                          {record.Expression_7}
                        </span>
                      )
                    }} />
                  <Table.Column title="状態" dataIndex="Expression_9" width={50} align='center'
                    render={(value, record, index) => {
                      return (
                        <span style={{ color: Color(record.Expression_10)?.Foreground }}>
                          {record.Expression_9}
                        </span>
                      )
                    }} />
                </Table>
                <Row style={{ margin: '1em 0 1em 0' }} gutter={24}>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >処理</div>
                    <div style={customStyle.styleInput}>
                      {this.state.dataSource[this.state.indexTable]?.Expression_14}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >入外</div>
                    <div style={customStyle.styleInput}>
                      {this.state.dataSource[this.state.indexTable]?.Expression_12}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >透析</div>
                    <div style={customStyle.styleInput}>
                      {this.state.dataSource[this.state.indexTable]?.Expression_13}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >診療科</div>
                    <div style={customStyle.styleInput}>
                      {this.state.dataSource[this.state.indexTable]?.department_code}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >病棟</div>
                    <div style={{ ...customStyle.styleInput, ...{ width: '120px' } }}>
                      {this.state.dataSource[this.state.indexTable]?.ward_code}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >医師</div>
                    <div style={{ paddingLeft: '5px' }}>
                      {this.state.dataSource[this.state.indexTable]?.Expression_15}
                    </div>
                  </div>
                </Row>
                <Row style={{ margin: '1em 0px 1em 0' }} gutter={24}>
                  <div style={{ border: '1px solid #757575', padding: '0 7px', marginRight: '10px', width: 45, height: 'fit-content' }}>検査</div>
                  <div style={{ ...customStyle.styleInline, width: "calc(100% - 285px)", marginRight: '20px', marginTop: 0 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {this.state.dataSource[this.state.indexTable]?.Expression_16}
                    </div>
                  </div>
                  <Space style={{ width: "210px", alignSelf: 'start' }}>
                    <Button type='primary'
                      disabled={this.state.selectedRows.length === 0}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '30%',
                            component: (
                              <WS2776003_InspectContent
                                number_of_exam_items={this.state.dataSource[this.state.indexTable].number_of_exam_items}
                                exam_content={this.state.dataSource[this.state.indexTable].exam_content}
                                onFinishScreen={() => {
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }} >内容</Button>
                    <Button type='primary'
                      disabled={this.state.selectedRows.length === 0}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '30%',
                            component: (
                              <WS2776004_RetransmissionOrDelete
                                Li_id={this.state.dataSource[this.state.indexTable]?.id}
                                section_number={parseInt(this.state.dataSource[this.state.indexTable].section_number)}
                                Li_Delete={1}
                                TransmissionMethod={0}
                                onFinishScreen={() => {
                                  this.onSearchData()
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }} >削除送信</Button>
                    <Button type='primary'
                      disabled={this.state.selectedRows.length === 0}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '30%',
                            component: (
                              <WS2776004_RetransmissionOrDelete
                                Li_id={this.state.dataSource[this.state.indexTable]?.id}
                                section_number={parseInt(this.state.dataSource[this.state.indexTable].section_number)}
                                Li_Delete={0}
                                TransmissionMethod={0}
                                onFinishScreen={() => {
                                  this.onSearchData()
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }} >修正送信</Button>
                  </Space>
                </Row>
              </TabPane>

              <TabPane tab="画像" key={'1'}>
                <Table
                  size='small'
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={true}
                  bordered
                  scroll={{ y: 600 }}
                  rowKey={(record) => record.id}
                  rowSelection={{
                    type: "radio",
                    fixed: 'left',
                    selectedRowKeys: this.state.selectedRowKeys,
                    onSelect: (record, selected, selectedRows) => {
                      let index = this.state.dataSource.findIndex(x => x.id === record.id)
                      this.setState({
                        selectedRows: selectedRows,
                        selectedRowKeys: selectedRows.map(x => x.id),
                        indexTable: index,
                      });
                    },
                  }}>
                  <Table.Column title="検査番号" dataIndex="exam_number" />
                  <Table.Column title="個人番号" dataIndex="patient_id" width={90}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>
                          {record.patient_id}
                        </div>
                      )
                    }} />
                  <Table.Column title="氏名" dataIndex="kanji_name" />
                  <Table.Column title="検査予定日" dataIndex="exam_date_on" width={100} />
                  <Table.Column title="内容" dataIndex="Content" />
                  <Table.Column title="送信日付" dataIndex="input_date_on" width={100} />
                  <Table.Column title="送信時間" dataIndex="input_time_at" width={80}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'center' }}>
                          {record.input_time_at?.substr(0, 5)}
                        </div>
                      )
                    }} />
                  <Table.Column title="送信" dataIndex="Expression_8" width={50} align='center'
                    render={(value, record, index) => {
                      return (
                        <span style={{ color: Color(record.Expression_9)?.Foreground }}>
                          {record.Expression_8}
                        </span>
                      )
                    }} />
                  <Table.Column title="状態" dataIndex="Expression_10" width={50} align='center'
                    render={(value, record, index) => {
                      return (
                        <span style={{ color: Color(record.Expression_11)?.Foreground }}>
                          {record.Expression_10}
                        </span>
                      )
                    }} />
                </Table>
                <Row style={{ margin: '1em 0 1em 0' }} gutter={24}>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >処理</div>
                    <div style={customStyle.styleInput}>
                      {this.state.dataSource[this.state.indexTable]?.Expression_14}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >入外</div>
                    <div style={customStyle.styleInput}>
                      {this.state.dataSource[this.state.indexTable]?.exam_reservation_time}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >透析</div>
                    <div style={customStyle.styleInput}>
                      {this.state.dataSource[this.state.indexTable]?.Expression_13}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >診療科</div>
                    <div style={customStyle.styleInput}>
                      {this.state.dataSource[this.state.indexTable]?.exam_request_department_code}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >病棟</div>
                    <div style={{ ...customStyle.styleInput, ...{ width: '120px' } }}>
                      {this.state.dataSource[this.state.indexTable]?.exam_request_doctor_code}
                    </div>
                  </div>
                  <div style={customStyle.styleInline}>
                    <div style={{ border: '1px solid #757575', padding: '0 7px' }} >医師</div>
                    <div style={{ paddingLeft: '5px' }}>
                      {this.state.dataSource[this.state.indexTable]?.input_code}
                    </div>
                  </div>
                </Row>

                <Row style={{ margin: '1em 0px 1em 0' }} gutter={24}>
                  <div style={{ border: '1px solid #757575', padding: '0 7px', marginRight: '10px', width: 45, height: 'fit-content' }}>検査</div>
                  <div style={{ ...customStyle.styleInline, width: "calc(100% - 285px)", marginRight: '20px', marginTop: 0 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {this.state.dataSource[this.state.indexTable]?.Expression_17}
                    </div>
                  </div>
                  <div style={{ width: "210px", alignSelf: 'start' }}>
                    <Space >
                      <Button type='primary'
                        disabled={this.state.selectedRows.length === 0}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 350,
                              component: (
                                <WS2776003_InspectContent
                                  exam_item_num={this.state.dataSource[this.state.indexTable].exam_item_num}
                                  exam_content={this.state.dataSource[this.state.indexTable].exam_content}
                                  onFinishScreen={() => {
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }} >内容</Button>
                      <Button type='primary'
                        disabled={this.state.selectedRows.length === 0}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 350,
                              component: (
                                <WS2776004_RetransmissionOrDelete
                                  Li_id={this.state.dataSource[this.state.indexTable]?.id}
                                  exam_number={parseInt(this.state.dataSource[this.state.indexTable]?.exam_number)}
                                  Li_Delete={1}
                                  TransmissionMethod={1}
                                  onFinishScreen={() => {
                                    this.onSearchData()
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }} >削除送信</Button>
                      <Button type='primary'
                        disabled={this.state.selectedRows.length === 0}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 350,
                              component: (
                                <WS2776004_RetransmissionOrDelete
                                  Li_id={this.state.dataSource[this.state.indexTable]?.id}
                                  exam_number={parseInt(this.state.dataSource[this.state.indexTable]?.exam_number)}
                                  Li_Delete={0}
                                  TransmissionMethod={1}
                                  onFinishScreen={() => {
                                    this.onSearchData()
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }} >修正送信</Button>
                    </Space>
                  </div>
                </Row>

              </TabPane>
            </Tabs>
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2776001_EMedicalRecordsTransmissionHistory);
