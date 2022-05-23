import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { connect } from "react-redux";
import { Card, Form, Input, Radio, Button, Checkbox, Table, Row, Col, Space, Modal, DatePicker, message, Spin } from "antd";
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import MiraisTransmissionRecordAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisTransmissionRecord.actions'
class WS2750001_MiraisTransmissionRecord extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'Mirais送信記録';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      selectedRow: {},
      selectedRowKeys: [],
      loaddingTable: false,
      StsDisplayButton: true
    };
  }

  componentDidMount() {
    this.GetListData()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.GetListData()
    }
  }

  GetListData() {
    this.setState({ loaddingTable: true })
    let data = {
      OrderType: this.isEmpty(this.formRef.current?.getFieldValue("OrderType")) ? "" : this.formRef.current?.getFieldValue("OrderType"),
      DateClassify: this.isEmpty(this.formRef.current?.getFieldValue("DateClassify")) ? "" : this.formRef.current?.getFieldValue("DateClassify"),
      PersonalNum: this.isEmpty(this.formRef.current?.getFieldValue("PersonalNum")) ? "" : this.formRef.current?.getFieldValue("PersonalNum"),
      DateFChar: this.formRef.current?.getFieldValue("DateFChar") ? this.formRef.current?.getFieldValue("DateFChar").format("YYYY/MM/DD") : "",
      DateTChar: this.formRef.current?.getFieldValue("DateTChar") ? this.formRef.current?.getFieldValue("DateTChar").format("YYYY/MM/DD") : "",
      StsErrorDisplay: this.formRef.current?.getFieldValue("StsErrorDisplay") ? 1 : 0,
    }
    MiraisTransmissionRecordAction.GetListData(data)
      .then(res => {
        this.formRef.current?.setFieldsValue(res)
        this.setState({
          dataSource: res ? res : [],
          StsDisplayButton: true,
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          selectedRow: res && res.length > 0 ? res[0].id : {}
        })
      })
      .catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ loaddingTable: false }))

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
  ChangeData() {
    this.GetListData()
  }
  render() {
    return (
      <div className="mirais-transmission-record">
        <Card className='mb-3' title='Mirais送信記録'>
          <Spin spinning={this.state.loaddingTable}>
            <Form
              ref={this.formRef}
              autoComplete="off"
              initialValues={{
                OrderType: "",
                DateClassify: 0
              }}
            >
              <div style={{ margin: '15px 0' }}>
                <Row gutter={24}>
                  <Col span={22}>
                    <Row gutter={24}>
                      <Col lg={24} xl={12} style={{ marginBottom: 10 }}>
                        <Row gutter={24}>
                          <Col lg={12} xl={14}>
                            <Form.Item name="OrderType" label={<b style={{ color: '#08c' }}>種別</b>}  >
                              <Radio.Group onChange={() => this.ChangeData()}>
                                <Radio value={""}>全て</Radio>
                                <Radio value={"00"}>予約</Radio>
                                <Radio value={"60"}>検査</Radio>
                                <Radio value={"70"}>画像</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col lg={12} xl={10}>
                            <Form.Item name="DateClassify" label={<b style={{ color: '#08c' }}>日付</b>}  >
                              <Radio.Group onChange={() => this.ChangeData()}>
                                <Radio value={0}>検査日</Radio>
                                <Radio value={1}>送信日</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={24} xl={12}>
                        <Row gutter={24}>
                          <Col span={12}>
                            <Space>
                              <Form.Item name="DateFChar">
                                <VenusDatePickerCustom formRefDatePicker={this.formRef} onChange={() => this.ChangeData()} format="YYYY/MM/DD" />
                              </Form.Item>
                              <div >~</div>
                              <Form.Item name="DateTChar">
                                <VenusDatePickerCustom formRefDatePicker={this.formRef} onChange={() => this.ChangeData()} format="YYYY/MM/DD" />
                              </Form.Item>
                            </Space>
                          </Col>
                          <Col span={7}>
                            <Form.Item name="PersonalNum" label={<b style={{ color: '#08c' }}>個人番号</b>}>
                              <Input.Search style={{ textAlign: 'right' }} type='number'
                                onSearch={() => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: true,
                                      width: '80%',
                                      component: (
                                        <WS0248001_PersonalInfoSearchQuery
                                          onFinishScreen={(output) => {
                                            this.formRef.current?.setFieldsValue({
                                              PersonalNum: output?.Lo_PersonalNumId
                                            })
                                            this.forceUpdate()
                                            this.ChangeData()
                                            this.closeModal()
                                          }}
                                        />
                                      ),
                                    }
                                  })
                                }} />
                            </Form.Item>
                          </Col>
                          <Col span={5}>
                            <Form.Item name="StsErrorDisplay" label={<b style={{ color: '#08c' }}>ｴﾗｰ表示</b>} valuePropName='checked'>
                              <Checkbox onChange={() => this.ChangeData()}></Checkbox>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={2} style={{ textAlign: 'right' }}>
                    <Button type="primary" disabled={this.state.StsDisplayButton} onClick={() => this.GetListData()} >表示</Button>
                  </Col>
                </Row>
              </div>
              <hr style={{ margin: '15px 0' }} />
              <Table
                dataSource={this.state.dataSource}
                pagination={false}
                bordered={true}
                size="small"
                rowKey={(record) => record.id}
                scroll={{ x: 1000 }}
                rowSelection={{
                  type: 'radio',
                  selectedRowKeys: this.state.selectedRowKeys,
                  onChange: async (selectedRowKeys, selectedRows) => {
                    await this.setState({
                      selectedRow: selectedRows[0],
                      selectedRowKeys: selectedRowKeys,
                      StsDisplayButton: false
                    })
                  }
                }}>
                <Table.Column title="種別" dataIndex="Expression_11" width={50} />
                <Table.Column title="方法" dataIndex="Expression_12" width={50} />
                <Table.Column title="オーダー番号" dataIndex="order_number" width={110}
                  render={(value, record, index) => {
                    return (
                      <div style={{ textAlign: "right" }}>
                        <span>{value === 0 ? '' : value}</span>
                      </div>
                    )
                  }} />
                <Table.Column title="予約番号" dataIndex="reservation_number_cooperation" width={110}
                  render={(value, record, index) => {
                    return (
                      <div style={{ textAlign: "right" }}>
                        <span>{value === 0 ? '' : value}</span>
                      </div>
                    )
                  }} />
                <Table.Column title="開始日" dataIndex="order_start_date_on" align='center' width={90} />
                <Table.Column title="開始時刻" dataIndex="order_start_time_at" align='center' width={70}
                  render={(value, record, index) => {
                    return (
                      <span>{value === '00:00:00' ? '' : value}</span>
                    )
                  }}
                />
                <Table.Column title="科" dataIndex="reservations_department" align='center' width={35} />
                <Table.Column title="予約項目" dataIndex="reservations_item_code" width={80} />
                <Table.Column title="明細" dataIndex="item_description" />
                <Table.Column title="E" dataIndex="Expression_16" align='center' width={30}
                  render={(value, record, index) => {
                    return (
                      <span style={{ color: 'red' }}>{value}</span>
                    )
                  }} />
                <Table.Column title="送信日時" dataIndex="Expreesion_10" width={130} />
                <Table.Column title="送信者" dataIndex="user_name" />
              </Table>
              <div style={{ textAlign: 'right', marginTop: '0.5em' }}>
                <Space>
                  <Button type="primary">ログ１</Button>
                  <Button type="primary">ログ２</Button>
                </Space>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2750001_MiraisTransmissionRecord);
