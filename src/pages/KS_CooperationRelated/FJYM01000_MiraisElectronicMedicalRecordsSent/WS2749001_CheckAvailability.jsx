import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Button, Table, Row, Col, DatePicker, Modal, Space, message, Spin } from "antd";
import WS2751001_MiraisInspectMaintain from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2751001_MiraisInspectMaintain.jsx';
import CheckAvailabilityAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/CheckAvailability.actions'
import WS2737001_MiraisSingleTransmission from "../FJYM01100_MiraisSingleTransmission/WS2737001_MiraisSingleTransmission";
class WS2749001_CheckAvailability extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    // document.title = '空き状況確認';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadTb1: false,
      isLoadTb2: false,
      loadFrm: false,
      selectRowTb1: {},
      selectedRowKeys: [],
    };
  }
  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      tableData1: [],
      tableData2: [],
    })
    this.GetListData()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.formRef.current?.setFieldsValue({
        tableData1: [],
        tableData2: [],
      })
      this.GetListData()
    }
  }

  GetListData() {
    this.setState({ isLoadTb1: true })
    let data = {
      Department: this.formRef.current?.getFieldValue("Department"),
      ReserveItemCode: this.formRef.current?.getFieldValue("ReserveItemCode"),
      DateFChar: this.isEmpty(this.formRef.current?.getFieldValue("DateFChar")) ? "" : this.formRef.current?.getFieldValue("DateFChar").format("YYYY-MM-DD"),
      DateTChar: this.isEmpty(this.formRef.current?.getFieldValue("DateTChar")) ? "" : this.formRef.current?.getFieldValue("DateTChar").format("YYYY-MM-DD"),
    }
    CheckAvailabilityAction.GetListData(data).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData1: res ? res : []
      })
      if (res) {
        this.setState({
          selectRowTb1: res.length > 0 ? res[0] : {},
          selectedRowKeys: res.length > 0 ? [res[0].id] : []
        })
        let name = this.formRef.current?.getFieldValue("Department") && this.formRef.current?.getFieldValue("ReserveItemCode") ? res.length > 0 ? res[0].name : '' : ''
        this.formRef.current?.setFieldsValue({ name: name })
        this.BreakDown(res[0])
      } else {
        this.setState({
          selectRowTb1: {},
          selectedRowKeys: []
        })
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoadTb1: false }))

  }
  BreakDown = (value) => {
    this.setState({ isLoadTb2: true })
    let data = {
      reservations_department: value?.reservations_department,
      reservations_item_code: value?.reservations_item_code,
      date_on: value?.date_on,
      time_at: value?.time_at
    }
    CheckAvailabilityAction.BreakDown(data).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData2: res ? res : []
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoadTb2: false }))
  }
  Recount_F12() {
    this.setState({ loadFrm: true })
    let data = {
      Department: this.state.selectRowTb1.reservations_department,
      ReserveItemCode: this.state.selectRowTb1.reservations_item_code,
      DateFChar: this.isEmpty(this.formRef.current?.getFieldValue("DateFChar")) ? "" : this.formRef.current?.getFieldValue("DateFChar").format("YYYY-MM-DD"),
      DateTChar: this.isEmpty(this.formRef.current?.getFieldValue("DateTChar")) ? "" : this.formRef.current?.getFieldValue("DateTChar").format("YYYY-MM-DD"),
    }
    CheckAvailabilityAction.Recount_F12(data).then(res => {
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loadFrm: false }))
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
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
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let lastDay = new Date(y, m + 1, 0);
    return (
      <div className="check-availability">
        <Spin spinning={this.state.loadFrm}>
          <Form
            ref={this.formRef} autoComplete="off"
            initialValues={{ DateFChar: moment(), DateTChar: moment(lastDay), ReserveItemCode: "", Department: "" }}
          >
            <Card className="mb-2" title='空き状況確認'>
              <Row>
                <Col span={7}>
                  <Space>
                    <Form.Item name="DateFChar" label="検査日" >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} onChange={() => this.GetListData()} format='YYYY/MM/DD' />
                    </Form.Item>
                    <div>~</div>
                    <Form.Item name="DateTChar" >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} onChange={() => this.GetListData()} format='YYYY/MM/DD' />
                    </Form.Item>
                  </Space>
                </Col>
                <Col span={2} style={{ marginLeft: '1.5em' }}>
                  <Form.Item name="Department" label="科">
                    <Input maxLength={2} onBlur={() => this.GetListData()} />
                  </Form.Item>
                </Col>
                <Col span={4} style={{ marginLeft: '1.5em' }}>
                  <Form.Item name="ReserveItemCode" label="予約項目" >
                    <Input maxLength={6} onBlur={() => this.GetListData()} />
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginLeft: '1.5em' }}>
                  <span>{this.formRef.current?.getFieldValue("name")}</span>
                </Col>
              </Row>
              <hr style={{ margin: '15px 0' }} />
              <Row>
                <Col span={13}  >
                  <Table
                    dataSource={this.formRef.current?.getFieldValue("tableData1")}
                    loading={this.state.isLoadTb1} scroll={{ y: 670 }}
                    pagination={false} bordered={true} size="small"
                    rowKey={(record) => record.id}
                    style={{ width: '99%' }}
                    rowSelection={{
                      type: 'radio',
                      selectedRowKeys: this.state.selectedRowKeys,
                      onChange: async (selectedRowKeys, selectedRows) => {
                        await this.setState({
                          selectRowTb1: selectedRows[0],
                          selectedRowKeys: selectedRowKeys
                        })
                        let name = this.formRef.current?.getFieldValue("Department") && this.formRef.current?.getFieldValue("ReserveItemCode") ? selectedRows[0].name : ''
                        this.formRef.current?.setFieldsValue({ name: name })
                        this.BreakDown(selectedRows[0])
                      }
                    }
                    }>
                    <Table.Column title="科" dataIndex="reservations_department" width={40} />
                    <Table.Column title="項目" dataIndex="reservations_item_code" width={70} />
                    <Table.Column title="名称" dataIndex="name" />
                    <Table.Column title="検査日" dataIndex="date_on" width={100} />
                    <Table.Column title="時間" dataIndex="time_at" align='center' width={70}
                      render={(value, record, index) => {
                        return <span>{value === '00:00:00' ? '' : value?.substr(0, 5)}</span>
                      }} />
                    <Table.Column title="人数" dataIndex="people_num" width={70}
                      render={(value, record, index) => {
                        return (
                          <div style={{ textAlign: 'right' }}>
                            <span>{record.people_num}</span>
                          </div>
                        )
                      }}
                    />
                    <Table.Column title="空き" dataIndex="Expression_9" width={60}
                      render={(value, record, index) => {
                        return (
                          <div style={{ textAlign: 'right' }}>
                            <span>{record.Expression_9}</span>
                          </div>
                        )
                      }} />
                  </Table>
                </Col >
                <Col span={11} style={{ display: this.state.selectRowTb1?.id ? "" : 'none' }} >
                  <Table
                    dataSource={this.formRef.current?.getFieldValue("tableData2")}
                    loading={this.state.isLoadTb2} scroll={{ y: 670 }}
                    pagination={false} bordered={true} size="small"
                    rowKey={(record) => record.id}
                  >
                    <Table.Column title="個人番号" dataIndex="personal_number_id" width={80}
                      render={(value, record, index) => {
                        return (
                          <div style={{ textAlign: 'right' }}>
                            <span>{record.personal_number_id}</span>
                          </div>
                        )
                      }} />
                    <Table.Column title="氏名" dataIndex="kanji_name" />
                    <Table.Column title="ｺｰｽ" dataIndex="visit_course" width={40} />
                    <Table.Column title="種別" dataIndex="Expression_14" width={50} />
                    <Table.Column title="画像" dataIndex="exam_name" />
                    <Table.Column align="center" width={60}
                      render={(value, record, index) => {
                        return (
                          <Button type="primary"
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '90%',
                                  component: (
                                    <WS2737001_MiraisSingleTransmission
                                      Li_ReserveNum={record.reservation_number_medical_exam}
                                      onFinishScreen={(output) => {
                                        this.closeModal()
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          >選択</Button>
                        )
                      }}
                    />
                  </Table>
                </Col>
              </Row>
              <div style={{ marginTop: '1em', textAlign: 'right' }}>
                <Space>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 1500,
                        component: (
                          <WS2751001_MiraisInspectMaintain
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ),
                      }
                    })
                  }}>保守</Button>
                  <Button type="primary" onClick={() => this.Recount_F12()}>再集計</Button>
                </Space>
              </div>
            </Card>
          </Form>
        </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2749001_CheckAvailability);
