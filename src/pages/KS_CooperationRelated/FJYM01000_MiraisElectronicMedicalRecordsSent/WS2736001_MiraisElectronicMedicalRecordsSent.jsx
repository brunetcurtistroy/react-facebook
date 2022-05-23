import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Button, Row, Col, DatePicker, Space, Modal, Table, message, Spin } from "antd";
import WS2745009_ConfirmScreen from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2745009_ConfirmScreen.jsx';
import WS2738001_LaboratoryInspectConfirmSub from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2738001_LaboratoryInspectConfirmSub.jsx';
import WS2739001_ErrorConfirmSub from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2739001_ErrorConfirmSub.jsx';
import { SearchOutlined } from '@ant-design/icons';
import WS2740001_ExtractBatchProcess from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2740001_ExtractBatchProcess.jsx';
import WS2749001_CheckAvailability from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2749001_CheckAvailability.jsx';
import WS2750001_MiraisTransmissionRecord from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2750001_MiraisTransmissionRecord.jsx';
import MiraisElectronicMedicalRecordsSentAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisElectronicMedicalRecordsSent.actions'
import moment from 'moment';
import Color from "constants/Color";
import WS2751001_MiraisInspectMaintain from "./WS2751001_MiraisInspectMaintain";
import WS2752001_MiraisReserveMaintain from "./WS2752001_MiraisReserveMaintain";
import WS2753001_MiraisImplementorMaintain from "./WS2753001_MiraisImplementorMaintain";
import WS2737001_MiraisSingleTransmission from "../FJYM01100_MiraisSingleTransmission/WS2737001_MiraisSingleTransmission";
class WS2736001_MiraisElectronicMedicalRecordsSent extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    // document.title = 'Mirais電子カルテ送信';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRow: {},
      selectedRowKeys: [],
      tableData: [],
      isloadding: false,
      loaddingFrm: false
    };
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

  Search() {
    this.setState({ isloadding: true })
    let data = {
      DateFChar: this.formRef.current?.getFieldValue("DateFChar") ? this.formRef.current?.getFieldValue("DateFChar").format("YYYY/MM/DD") : "",
      DateTChar: this.formRef.current?.getFieldValue("DateTChar") ? this.formRef.current?.getFieldValue("DateTChar").format("YYYY/MM/DD") : ""
    }
    MiraisElectronicMedicalRecordsSentAction.GetListData(data).then(res => {
      this.setState({
        tableData: res,
        selectedRow: res && res.length > 0 ? res[0] : {},
        selectedRowKeys: res && res.length > 0 ? [res[0].id] : []
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))

  }

  F9() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2740001_ExtractBatchProcess
            DateF={this.formRef.current?.getFieldValue("DateFChar")}
            DateT={this.formRef.current?.getFieldValue("DateTChar")}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  F10() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2750001_MiraisTransmissionRecord
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  F11() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2749001_CheckAvailability
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  InspectMaintain() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '75%',
        component: (
          <WS2751001_MiraisInspectMaintain
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  ReserveMaintain() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2752001_MiraisReserveMaintain
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  ImplementorMaintain() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '70%',
        component: (
          <WS2753001_MiraisImplementorMaintain
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  ShowWS2745009_ConfirmScreen() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1500,
        component: (
          <WS2745009_ConfirmScreen
            Li_ExamDateF={this.formRef.current?.getFieldValue("DateFChar") ? this.formRef.current?.getFieldValue("DateFChar").format("YYYY/MM/DD") : ""}
            Li_ExamDateT={this.formRef.current?.getFieldValue("DateTChar") ? this.formRef.current?.getFieldValue("DateTChar").format("YYYY/MM/DD") : ""}
            onFinishScreen={(output) => {
              if (output?.Lo_StsConfirm) {

              }
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  SubmitBtnBefore() {
    this.setState({ loaddingFrm: true })
    let data = {
      DateF: this.formRef.current?.getFieldValue("DateFChar") ? this.formRef.current?.getFieldValue("DateFChar").format("YYYY/MM/DD") : "",
      DateT: this.formRef.current?.getFieldValue("DateTChar") ? this.formRef.current?.getFieldValue("DateTChar").format("YYYY/MM/DD") : "",
      Li_StsConfirm: 0
    }
    MiraisElectronicMedicalRecordsSentAction.SubmitBtnBefore(data)
      .then(res => {
        if (res?.Lo_StsRun) {
          this.SubmitBtn(res?.Lo_StsRun)
        } else {
          this.ShowWS2745009_ConfirmScreen()
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ loaddingFrm: false }))
  }

  SubmitBtn(stsRun) {
    this.setState({ loaddingFrm: true })
    let data = {
      StsRun: stsRun ? 1 : 0
    }
    MiraisElectronicMedicalRecordsSentAction.F12(data)
      .then(res => {
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ loaddingFrm: false }))
  }

  renderLaboratoryInspectConfirmSub() {
    return (
      <WS2738001_LaboratoryInspectConfirmSub
        Li_ReserveNum={this.state.selectedRow?.reservation_number_medical_exam}
        Li_TransmissionState={this.state.selectedRow?.transmission_state}
        Li_ProcessDivision={this.state.selectedRow?.processing_division}
        Li_Type={this.state.selectedRow?.kind}
        Li_Identify={this.state.selectedRow?.identification} />
    )
  }

  render() {
    return (
      <div className="mirais-electronic-medical-records-sent">
        <Spin spinning={this.state.loaddingFrm} >
          <Form
            ref={this.formRef} autoComplete="off"
            initialValues={{ DateFChar: moment(), DateTChar: moment().add(20, 'days') }}
          >
            <Card title={'Mirais電子カルテ送信'}>
              <Space>
                <Button onClick={() => this.InspectMaintain()}>検査設定</Button>
                <Button onClick={() => this.ReserveMaintain()}>枠人数設定</Button>
                <Button onClick={() => this.ImplementorMaintain()}>実施者設定</Button>
                <Button onClick={() => this.F9()}>再抽出</Button>
                <Button onClick={() => this.F10()}>送信記録</Button>
                <Button onClick={() => this.F11()}>空き状兄</Button>
                <Button onClick={() => this.SubmitBtnBefore()}>送信処理</Button>
              </Space>
              <hr style={{ margin: '15px 0' }} />
              <Row >
                <Col span={8} style={{ border: '1px solid #f0f0f0', padding: '0.5em' }} >
                  <Row  >
                    <Col span={24} >
                      <Space>
                        <Form.Item name="DateFChar" label="検査日" >
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                        </Form.Item>
                        <div style={{ marginBottom: '1em' }}>~</div>
                        <Form.Item name="DateTChar" >
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                        </Form.Item>
                      </Space>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Button style={{ float: 'right', color: '#08c' }} icon={<SearchOutlined style={{ fontSize: '18px', color: '#08c' }} />}
                        onClick={() => this.Search()}>検　　索</Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={2} style={{ position: 'relative' }}>
                  <Button type="primary" style={{ position: 'absolute', top: '65%', marginLeft: '3em' }}
                    onClick={() => this.SubmitBtnBefore()}>
                    送信
                  </Button>
                </Col>
              </Row>
            </Card>
          </Form>
          <Row className="mt-3" gutter={24}>
            <Col span={18} style={{ paddingRight: 0 }}>
              <Card>
                <Table
                  dataSource={this.state.tableData}
                  loading={this.state.isloadding} size="small" style={{ width: '99%' }} bordered={true}
                  pagination={false} rowKey={(iten) => iten.id} scroll={{ y: '63vh' }}
                  rowSelection={{
                    type: 'radio',
                    selectedRowKeys: this.state.selectedRowKeys,
                    onSelect: (record, selected, selectedRows) => {
                      this.setState({
                        selectedRow: selectedRows[0],
                        selectedRowKeys: selectedRows.map(x => x.id),
                      });
                    },
                  }}
                >
                  <Table.Column title="検査日" dataIndex="order_start_date_on" width={90}
                    render={(value, record, index) => {
                      return <span>{value}</span>
                    }} />
                  <Table.Column title="検査時間" dataIndex="order_start_time_at" width={70} align='center'
                    render={(value, record, index) => {
                      return <span>{value === '00:00' ? '' : value}</span>
                    }} />
                  <Table.Column title="処理" dataIndex="Expression_16" width={40} align='center'
                    render={(value, record, index) => {
                      let color = 211;
                      switch (record.processing_division) {
                        case 1: color = 211
                          break;
                        case 3: color = 209
                          break;
                        case 6: color = 209
                          break;
                        default: color = 211
                      }
                      return (
                        <span style={{ color: Color(color).Foreground }}>{record.Expression_16}</span>
                      )
                    }}
                  />
                  <Table.Column title="氏名" dataIndex="kanji_name" />
                  <Table.Column title="予約" dataIndex="Expression_18" />
                  <Table.Column title="検査" dataIndex="exam_name" />
                  <Table.Column title="ｴﾗｰ" dataIndex="error_text" width={40} align='center'
                    render={(value, record, index) => {
                      return (
                        <Button shape="circle" size='small' style={{ background: 'red', minWidth: 10, height: 16, fontSize: '5px' }}
                          hidden={!record.error_text}
                          //opacity: this.isEmpty(value) ? 0.2 :1 
                          // disabled={()=>this.isEmpty(value)}
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 600,
                                component: (
                                  <WS2739001_ErrorConfirmSub
                                    Li_ReserveNum={record.reservation_number_medical_exam}
                                    Li_ProcessDivision={record.processing_division}
                                    Li_Type={record.kind}
                                    Li_Identify={record.identification}
                                    Li_transmission_state={record.transmission_state}
                                    onFinishScreen={() => {
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              }
                            })
                          }}>&ensp;</Button>
                      )
                    }} />
                  <Table.Column title="エラー内容" dataIndex="error_text" />
                  <Table.Column width={60}
                    render={(value, record) => {
                      return (
                        <div style={{ textAlign: 'center' }}>
                          <Button type="primary"
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '80%',
                                  component: (
                                    <WS2737001_MiraisSingleTransmission
                                      Li_ReserveNum={record.reservation_number_medical_exam}
                                      onFinishScreen={(output) => {
                                        this.closeModal()
                                      }}
                                    />
                                  ),
                                }
                              })
                            }}
                          >選択</Button>
                        </div>
                      )
                    }}
                  />
                </Table>
              </Card>
            </Col>
            <Col span={6}>
              <Card hidden={this.state.tableData?.length === 0}>
                <Spin spinning={this.state.isloadding}>
                  {this.renderLaboratoryInspectConfirmSub()}
                </Spin>
              </Card>
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2736001_MiraisElectronicMedicalRecordsSent);
