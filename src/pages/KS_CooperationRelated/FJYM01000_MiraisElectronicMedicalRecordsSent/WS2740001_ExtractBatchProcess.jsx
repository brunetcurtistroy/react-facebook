import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, message, Modal, Radio, Row, Space, Table } from "antd";
import Color from 'constants/Color';
import moment from 'moment';
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS2749001_CheckAvailability from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2749001_CheckAvailability.jsx';
import WS2737001_MiraisSingleTransmission from 'pages/KS_CooperationRelated/FJYM01100_MiraisSingleTransmission/WS2737001_MiraisSingleTransmission.jsx';
import React from "react";
import { connect } from "react-redux";
import ExtractBatchProcessAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/ExtractBatchProcess.actions';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2740001_ExtractBatchProcess extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '抽出一括処理';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      loadingTable: false,
      selectedRow: {},
      selectedRowKeys: []
    };
  }
  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      tableData: []
    })
    this.GetDate()
    this.GetListData()
  }

  GetDate() {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);
    this.formRef.current?.setFieldsValue({
      DateFChar: moment(firstDay),
      DateTChar: moment(lastDay)
    })
  }

  GetListData() {
    this.setState({ loadingTable: true })
    let data = {
      DateFChar: this.isEmpty(this.formRef.current?.getFieldValue("DateFChar")) ? "" : this.formRef.current?.getFieldValue("DateFChar")?.format("YYYY/MM/DD"),
      DateTChar: this.isEmpty(this.formRef.current?.getFieldValue("DateTChar")) ? "" : this.formRef.current?.getFieldValue("DateTChar")?.format("YYYY/MM/DD"),
      TransmissionState: this.formRef.current?.getFieldValue("TransmissionState"),
      PersonalNum: this.formRef.current?.getFieldValue("PersonalNum"),
    }
    ExtractBatchProcessAction.GetListData(data)
      .then(res => {
        this.formRef.current?.setFieldsValue({
          tableData: res ? res : []
        })
        this.setState({
          selectedRow: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
        })
      })
      .catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ loadingTable: false }))

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
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  ShowMiraisSingleTransmission(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1600,
        component: (
          <WS2737001_MiraisSingleTransmission
            Li_ReserveNum={record?.reservation_number_medical_exam}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  ShowWS2749001_CheckAvailability() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1600,
        component: (
          <WS2749001_CheckAvailability
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  F11() {
    this.setState({ loadingTable: true })
    let data = {
      DateFChar: this.isEmpty(this.formRef.current?.getFieldValue("DateFChar")) ? "" : this.formRef.current?.getFieldValue("DateFChar")?.format("YYYY/MM/DD"),
      DateTChar: this.isEmpty(this.formRef.current?.getFieldValue("DateTChar")) ? "" : this.formRef.current?.getFieldValue("DateTChar")?.format("YYYY/MM/DD"),
      TransmissionState: this.formRef.current?.getFieldValue("TransmissionState"),
      PersonalNum: this.formRef.current?.getFieldValue("PersonalNum"),
    }
    ExtractBatchProcessAction.F11(data).then(res => {
      if (res) {
        this.GetListData()
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loadingTable: false }))
  }
  F12() {
    this.setState({ loadingTable: true })
    let data = {
      DateFChar: this.isEmpty(this.formRef.current?.getFieldValue("DateFChar")) ? "" : this.formRef.current?.getFieldValue("DateFChar")?.format("YYYY/MM/DD"),
      DateTChar: this.isEmpty(this.formRef.current?.getFieldValue("DateTChar")) ? "" : this.formRef.current?.getFieldValue("DateTChar")?.format("YYYY/MM/DD"),
      personalnum: this.formRef.current?.getFieldValue("personalnum")
    }
    ExtractBatchProcessAction.F12(data).then(res => {
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loadingTable: false }))
  }
  DeleteRow(record) {
    this.setState({ loadingTable: true })
    let data = { id: record?.id }
    ExtractBatchProcessAction.F03(data).then(res => {
      this.GetListData()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loadingTable: false }))
  }
  render() {
    return (
      <div className="extract-batch-process">
        <Card title='抽出一括処理'>
          <Form
            ref={this.formRef} autoComplete="off"
            initialValues={{ PersonalNum: "", TransmissionState: 0 }}
          >
            <Card className="mb-2" title={<Space>
              <Button onClick={() => this.ShowWS2749001_CheckAvailability()}>空き状況</Button>
              <Button onClick={() => this.F11()} >一括削除</Button>
              <Button onClick={() => this.F12()} >一括抽出</Button>
            </Space>}>
              <Row>
                <Col span={7}>
                  <Space>
                    <Form.Item name="DateFChar" label="検査日"  >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" onChange={() => this.GetListData()} />
                    </Form.Item>
                    <div>~</div>
                    <Form.Item name="DateTChar"  >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" onChange={() => this.GetListData()} />
                    </Form.Item>
                  </Space>
                </Col>
                <Col span={5} style={{ marginLeft: '1.5em' }}>
                  <Form.Item name="PersonalNum" label="個人番号">
                    <Input.Search style={{textAlign: 'right'}} maxLength={10}
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
                                this.GetListData()
                                this.forceUpdate()
                                this.closeModal()
                              }}
                            />
                          ),
                        }
                      })
                    }} 
                    onChange={(e) => {
                      this.GetListData()
                    }}
                    />
                  </Form.Item>
                </Col>
                <Col span={10} style={{ marginLeft: '1.5em' }}>
                  <Form.Item name="TransmissionState" label="送信"  >
                    <Radio.Group value={1} onChange={() => this.GetListData()}  >
                      <Radio value={0}>未送信</Radio>
                      <Radio value={1}>送信済</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Table dataSource={this.formRef.current?.getFieldValue("tableData")}
              loading={this.state.loadingTable}
              pagination={false} size="small" bordered={true}
              rowKey={(record) => record.id} scroll={{ y: 650 }}
              rowSelection={{
                type: 'radio',
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows) => {
                  this.setState({
                    rowSelected: selectedRows,
                    selectedRowKeys: selectedRows.map(x => x.id),
                  });
                },
              }}
            >
              <Table.Column title="検査日" dataIndex="order_start_date_on" align='center' width={90} />
              <Table.Column title="検査時間" dataIndex="order_start_time_at" align='center' width={70}
                render={(value, record, index) => {
                  return <span>{value === '00:00:00' ? '' : value?.substr(0, 5)}</span>
                }} />
              <Table.Column title="個人番号" dataIndex="patient_no" width={70} align='right' />
              <Table.Column title="氏名" dataIndex="kanji_name" />
              <Table.Column title="送信" dataIndex="Expression_13" width={40} align='center' />
              <Table.Column title="種別" dataIndex="Expression_25" width={40} align='center' />
              <Table.Column title="処理" dataIndex="Expression_23" width={40} align='center'
                render={(value, record, index) => {
                  let color = 211;
                  switch (record.processing_division) {
                    case 1: color = 211
                      break;
                    case 3: color = 209
                      break;
                    default: color = 211
                  }
                  return (
                    <span style={{ color: Color(color).Foreground }}>{record.Expression_23}</span>
                  )
                }}
              />
              <Table.Column title="送信内容" dataIndex="Expression_26" />
              <Table.Column title="オーダー/予約番号" dataIndex="Expression_14" width={130} align='right'
                render={(value, record, index) => {
                  return <span>{record.Expression_14 === 0 ? '' : record.Expression_14}</span>
                }}
              />
              <Table.Column title="エラー" dataIndex="error_text" />
              <Table.Column align="center" width={95}
                render={(value, record, index) => {
                  return (
                    <Space>
                      <Button type="primary"
                        onClick={() => {
                          this.ShowMiraisSingleTransmission(record)
                        }}
                      >選択</Button>
                      <Button size='small' style={{ border: 'none' }} danger icon={<DeleteOutlined />}
                        onClick={() => {
                          Modal.confirm({
                            content: '消去してもよろしいですか？', 
                            onOk: () => this.DeleteRow(record)
                          })
                        }}
                      ></Button>
                    </Space>
                  )
                }}
              />
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2740001_ExtractBatchProcess);
