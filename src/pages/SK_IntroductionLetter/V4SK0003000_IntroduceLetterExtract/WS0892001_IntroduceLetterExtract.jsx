import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Row,
  Col,
  DatePicker,
  Radio,
  Modal,
  Space,
  Checkbox,
  message
} from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import IntroduceLetterExtractService from "services/IntroductionLetter/IntroduceLetterExtract/IntroduceLetterExtract";
import moment from "moment";
import WS0898001_IntroduceLetterExtractMaintain from "./WS0898001_IntroduceLetterExtractMaintain";
import Color from "constants/Color";

const { Option } = Select;
const grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class WS0892001_IntroduceLetterExtract extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "紹介状抽出";

    this.state = {
      loading: false,
      tableData: [],
      childModal: {
        visible: false,
        width: 0,
        component: null
      },
      StsAllSelectSwitch: 0,
      rowSelect: [],
    };
  }
  componentDidMount() {
    this.onGetScreenData();
  }
  onEventSearchIssueList = () => {
    let DateF = moment(this.formRef.current.getFieldValue('DateFChar')).format("YYYY/MM/DD");
    let DateT = moment(this.formRef.current.getFieldValue('DateTChar')).format("YYYY/MM/DD");
    let ReceiptNumF = this.formRef.current.getFieldValue('ReceiptNumF');
    let ReceiptNumT = this.formRef.current.getFieldValue('ReceiptNumT');
    if (DateF > DateT) {
      return Modal.error({
        title: '日付の範囲指定に誤りがあります!!',
        okText: 'OK'
      })
    }
    if (ReceiptNumF > ReceiptNumT) {
      return Modal.error({
        title: '受付番号の範囲指定に誤りがあります!!',
        okText: 'OK'
      })
    }
    this.onEventDisplayBtn()
  }
  onEventDisplayBtn = () => {
    this.setState({ loading: true })
    let params = {
      DateFChar: moment(this.formRef.current?.getFieldValue('DateFChar')).format('YYYY/MM/DD'),
      DateTChar: moment(this.formRef.current?.getFieldValue('DateTChar')).format('YYYY/MM/DD'),
      ReceiptNumF: this.formRef.current?.getFieldValue('ReceiptNumF') ? this.formRef.current.getFieldValue('ReceiptNumF') : '',
      ReceiptNumT: this.formRef.current?.getFieldValue('ReceiptNumT') ? this.formRef.current.getFieldValue('ReceiptNumT') : '',
      ProcessDivision: this.formRef.current?.getFieldValue('ProcessDivision'),
      FacilityType: this.formRef.current?.getFieldValue('FacilityType'),
    }
    IntroduceLetterExtractService.onEventDisplayBtn(params)
      .then(res => {
        this.onGetIssueList()
      })
      .catch(error => {
        message.error(error)
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }
  onEventF12 = (ProcessDivision) => {
    this.setState({
      loading: true
    })
    IntroduceLetterExtractService.onEventF12({ ProcessDivision })
      .then(res => {
        this.onEventSearchIssueList()
      })
      .catch(error => {
        message.error(error)
      })
  }
  onGetScreenData = () => {
    this.setState({
      loading: true,
    })
    IntroduceLetterExtractService.onGetScreenData()
      .then(res => {
        this.formRef.current?.setFieldsValue({
          DateFChar: moment(res.data.DateFChar, 'YYYY/MM/DD'),
          DateTChar: moment(res.data.DateTChar, 'YYYY/MM/DD'),
          FacilityType: res.data.FacilityType,
          ProcessDivision: res.data.ProcessDivision,
          ComboBox_FacilityType: res.data.ComboBox_FacilityType
        })
      })
      .catch(error => {
        message.error(error)
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }
  onGetIssueList = () => {
    this.setState({
      loading: true,
    })
    IntroduceLetterExtractService.onGetIssueList()
      .then(res => {
        this.setState({
          tableData: res.data
        })
        this.onSelectedChange(res.data);
      })
      .catch(error => {
        message.error(error)
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }
  onSelectedChange = (data) => {
    data.map(item => {
      if (item.StsAllSelectSwitch == 0) {
        this.setState({
          StsAllSelectSwitch: 0
        })
        return;
      } else {
        this.setState({
          StsAllSelectSwitch: 1
        })
      }
    })
  }
  onSelectSingleSwitching = (id, checked) => {
    this.setState({
      loading: true,
    })
    IntroduceLetterExtractService.onSelectSingleSwitching({ id, StsAllSelectSwitch: checked ? 1 : 0 })
      .then(res => {
        this.onGetIssueList();
      })
      .catch(error => {
        message.error(error)
      })
  }
  onSelectAllSwitching = (e) => {
    this.setState({
      loading: true
    })
    IntroduceLetterExtractService.onSelectAllSwitching({ StsAllSelectSwitch: e.target.checked ? 1 : 0 })
      .then(res => {
        if (e.target.checked) {
          this.setState({
            StsAllSelectSwitch: 0
          })
        } else {
          this.setState({
            StsAllSelectSwitch: 1
          })
        }
        this.onGetIssueList();
      })
      .catch(error => {
        message.error(error)
      })
  }
  openModalIntroduceLetterExtractMaintain = () => {
    if (this.state.rowSelect) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: '80%',
          component: (
            <WS0898001_IntroduceLetterExtractMaintain
              Li_PersonalNum={this.state.rowSelect.W1_id_cd}
              Li_ReserveNum={this.state.rowSelect.W1_reserve_num}
              onFinishScreen={(output) => {
                console.log(output);
                this.closeModal()
              }}
            />
          )
        }
      })
    } else {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: '80%',
          component: (
            <WS0898001_IntroduceLetterExtractMaintain
              onFinishScreen={(output) => {
                console.log(output);
                this.closeModal()
              }}
            />
          )
        }
      })
    }
  }
  eventF12 = () => {
    const ProcessDivision = this.formRef.current.getFieldValue('ProcessDivision');
    this.onEventF12(ProcessDivision);
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }
  render() {
    return (
      <div className="introduce-letter-extract">
        <Card title="紹介状抽出">
          <Space className="mb-3">
            <Button onClick={this.openModalIntroduceLetterExtractMaintain}>抽出保守</Button>
          </Space>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            // {...grid}
            initialValues={{ ProcessDivision: 0 }}
          >
            <Row gutter={[8, 24]}>
              <Col span={6}>
                <Form.Item name="ProcessDivision" label=" " className="mb-3" labelCol={{ offset: 2 }}>
                  <Radio.Group>
                    <Radio value={0}>作成</Radio>
                    <Radio value={9}>削除</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="受診日" className="mb-3" labelCol={{ span: 4, offset: 2 }}>
                  <div className="d-flex align-items-center" style={{ width: '100%' }}>
                    <Form.Item name="DateFChar">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        className="w-100"
                        allowClear={false}
                      />
                    </Form.Item>
                    <Space align="center">
                      <label style={{
                        fontWeight: 'bold',
                        color: '#14468C',
                        marginBottom: '0.3rem',
                        display: 'block',
                        padding: '0 5px'
                      }}>~</label>
                    </Space>

                    <Form.Item name="DateTChar" >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        className="w-100"
                        allowClear={false}
                      />
                    </Form.Item>
                  </div>
                </Form.Item>
                <Form.Item label="受付No" className="mb-3" labelCol={{ span: 4, offset: 2 }}>
                  <div className="d-flex align-items-center">
                    <Form.Item name="ReceiptNumF" style={{ width: "80px" }}>
                      <Input />
                    </Form.Item>
                    <Space align="center">
                      <label style={{
                        fontWeight: 'bold',
                        color: '#14468C',
                        marginBottom: '0.3rem',
                        display: 'block',
                        padding: '0 5px'
                      }}>~</label>
                    </Space>
                    <Form.Item name="ReceiptNumT" style={{ width: "80px" }}>
                      <Input />
                    </Form.Item>
                  </div>
                </Form.Item>
                <Form.Item label="施　設" className="mb-3" labelCol={{ span: 4, offset: 2 }}>
                  <div className="d-flex align-items-center">
                    <Form.Item name="FacilityType" style={{ minWidth: "100px", width: '100%' }}>
                      <Select defaultValue={this.formRef.current?.getFieldValue('FacilityType')}>
                        {this.formRef.current?.getFieldValue('ComboBox_FacilityType')?.length > 0 ? this.formRef.current.getFieldValue('ComboBox_FacilityType').map(item => {
                          return (
                            <Select.Option value={item.LinkedField} key={item.DisplayField}>
                              {item.DisplayField}
                            </Select.Option>
                          )
                        }) : ''}
                      </Select>
                    </Form.Item>
                  </div>
                </Form.Item>

                <Button
                  icon={<SearchOutlined />}
                  style={{ float: "right", color: "#1166BB" }}
                  onClick={this.onEventSearchIssueList}
                >
                  検&emsp;&emsp;索
                </Button>
                <div className="clearfix"></div>
                <hr></hr>
                <Button type="primary" style={{ float: "right" }} onClick={this.eventF12}>
                  一括作成
                </Button>
              </Col>

              <Col span={18}>
                <Table
                  size="small"
                  bordered
                  dataSource={this.state.tableData}
                  loading={this.state.loading}
                  // rowSelection={{
                  //   type: "radio",
                  //   ...rowSelection,
                  // }}
                  pagination={false}
                  onRow={(record, index) => ({
                    onClick: event => this.setState({
                      rowSelect: record,
                      StsAllSelectSwitch: record.StsAllSelectSwitch,
                      id: record.id,
                    })
                  })}
                  rowKey={(record) => record.id}
                  rowClassName={(record, index) => { return record.id === this.state.rowSelect.id ? 'active-row' : '' }}
                >
                  <Table.Column title={
                    this.state.tableData.length > 0 ? <Form.Item name="StsAllSelectSwitch" style={{ justifyContent: 'center' }}>
                      <Checkbox
                        checked={this.state.StsAllSelectSwitch}
                        onChange={(e) => {
                          this.onSelectAllSwitching(e)
                        }}
                      >
                      </Checkbox>
                    </Form.Item> : ''
                  }
                    align="center"
                    width="40px"
                    dataIndex="Issuing"
                    render={(value, record, index) => {
                      return (
                        <Form.Item name="Issuing" style={{ justifyContent: 'center' }}>
                          <Checkbox
                            checked={record.Issuing}
                            onChange={(e) => this.onSelectSingleSwitching(record.id, e.target.checked)}>

                          </Checkbox>
                        </Form.Item>
                      )
                    }} />
                  <Table.Column title="区分" dataIndex="Expression_20" align="center" render={(value, record, index) => {
                    return (
                      <span style={{ color: Color(record?.Expression_21)?.Foreground }}>{value}</span>
                    )
                  }} />
                  <Table.Column title="受診日" dataIndex="W1_reserve_date" render={(value, record, index) => {
                    return (
                      <div style={{ color: Color(record?.Expression_23)?.Foreground }}>{moment(record?.W1_reserve_date).format('YYYY/MM/DD')}</div>
                    )
                  }} />
                  <Table.Column
                    title="受付No"
                    dataIndex="receipt_number"
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record?.Expression_23)?.Foreground, textAlign: 'right' }}>{value}</div>
                      )
                    }}
                  />
                  <Table.Column
                    title="個人番号"
                    dataIndex="personal_number_id"
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record?.Expression_23)?.Foreground, textAlign: 'right' }}>{value}</div>
                      )
                    }}
                  />
                  <Table.Column title="氏名" dataIndex="kanji_name"
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record?.Expression_23)?.Foreground }}>{value}</div>
                      )
                    }}
                  />
                  <Table.Column title="性別" dataIndex="Expression_5" align="center" render={(value, record, index) => {
                    return (
                      <div style={{ color: Color(record?.Expression_24)?.Foreground }}>{value}</div>
                    )
                  }} />
                  <Table.Column title="生年月日" dataIndex="birthday_on" render={(value, record, index) => {
                    return (
                      <div style={{ color: Color(record?.Expression_23)?.Foreground }}>{moment(record?.birthday_on).format('YYYY/MM/DD')}</div>
                    )
                  }} />

                  <Table.Column
                    title="契約情報"
                    dataIndex="W1_visits_courses"
                    render={(text, record, index) => (
                      <div style={{ color: Color(record?.Expression_23)?.Foreground }}>
                        {record.W1_visits_courses + " " + record.contract_short_name}
                      </div>
                    )}
                  />
                  {
                    this.formRef.current?.getFieldValue('ProcessDivision') === 9
                      ? <Table.Column title="診療科名" dataIndex="department_name" render={(value, record, index) => {
                        return (
                          <div style={{ color: Color(record?.Expression_23)?.Foreground }}>{value}</div>
                        )
                      }}
                      />
                      : ''
                  }
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
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0892001_IntroduceLetterExtract);
