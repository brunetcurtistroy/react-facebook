import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Checkbox, Select, Button, Table, Row, Col, Space, DatePicker, Modal } from "antd";
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import WS0285001_JudgeQuery from "pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery";
import moment from "moment-timezone";
import WS2585001_OfficeInfoInquirySub from "pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub";
import WS0433001_PrinterConfirm from "../V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm";
import Color from "constants/Color";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0930001_PersonRequireExamIntroduceLetter extends React.Component {
  static propTypes = {
    Li_MenuOption: PropTypes.string,
    Li_MenuAdminRights: PropTypes.number,
    Li_MenuAuthority: PropTypes.number,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '要精検者紹介状発行';

    this.state = {
      childModal: {
        width: 0,
        visible: false,
        component: null,
      },
      loading: false,
      Lio_OfficeCode: null,
      Lio_BranchStoreCode: null,
      disabledField: true,
    };
  }

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      DateFChar: '',
      DateTChar: '',
      OfficeCode: '',
      BranchStoreCodeF: '',
      BranchStoreCodeT: '',
      JudgeDivision01: '',
      JudgeDivision02: '',
      JudgeDivision03: '',
      JudgeDivision04: '',
      JudgeDivision05: '',
      tableData: []
    })
  }

  searchInfoExtractSub = () => {
    // call api
    this.setState({
      loading: true
    })
    const tableData = this.getScreenData();
    console.log(tableData)
    if (this.formRef.current.getFieldValue('tableData')) {
      this.formRef.current.setFieldsValue({
        tableData: tableData
      })
    }
  }
  getScreenData = () => {

    let tableData = [];
    tableData = [
      {
        W1_enabled_disabled: true,
        visit_date_on: moment('24/06/2021', 'YYYY/MM/DD'),
        receipt_number: 1,
        personal_number_id: 2,
        visit_course: 'D-00',
        contract_short_name: 'Contract short name',
        office_kanji_name: 'Kanji name',
        comprehensive_judgment: '',
      },
      {
        W1_enabled_disabled: false,
        visit_date_on: moment('24/06/2021', 'YYYY/MM/DD'),
        receipt_number: 1,
        personal_number_id: 1,
        visit_course: 'A-00',
        contract_short_name: 'Contract short name 1',
        office_kanji_name: 'Kanji name 1',
        comprehensive_judgment: 'E',
      },
    ];
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 800)
    return tableData;
  }
  openModalInputOfficeNumConverse = (value) => {
    console.log(value);
    this.setState({
      childModal: {
        ...this.state.childModal,
        width: '80%',
        visible: true,
        component: (
          <WS0247001_OfficeInfoRetrievalQuery
            Li_1HeadOffice2BranchShop={1}
            onFinishScreen={(output) => {
              this.setDataOutput({ output });
              this.closeModal()
            }}
          />
        )
      }
    })
  }

  openModalJudgeQuery = (namePath) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        width: '80%',
        visible: true,
        component: (
          <WS0285001_JudgeQuery // Component
            // Lio_Judge={value}
            onFinishScreen={(output) => {
              this.setDataOutput({ namePath, output });
              // this.setDataOutput(namePath, output);
              this.closeModal()
            }}
          />
        )
      }
    })

  }
  openModalPrintConfirm = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        width: '350px',
        visible: true,
        component: (
          <WS0433001_PrinterConfirm // Component
            onFinishScreen={(output) => {
              this.setDataOutput({ output });
              this.closeModal()
            }}
          />
        )
      }
    })
  }
  setDataOutput({ namePath = null, output }) {
    if (namePath !== null) {
      console.log('Output with namePath', output)
      this.formRef.current.setFields([
        {
          name: namePath,
          value: output.Lio_Judge
        }
      ])
    } else {
      this.formRef.current.setFieldsValue({
        OfficeCode: output.Lio_OfficeCode,
        BranchStoreCodeF: output.Lio_BranchStoreCode,
        office_kanji_name: output.Lo_Kanji_Name
      })
    }
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }
  onFinish(values) {

  }

  render() {
    return (
      <div className="person-require-exam-introduce-letter">
        <Card title="要精検者紹介状発行">
          <Space className="mb-3">
            <Button>
              明細
            </Button>
            <Button>
              CSV
            </Button>
            <Button onClick={this.openModalPrintConfirm}>
              発行
            </Button>
          </Space>

          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row>
              <Col span={8}>
                <Form.Item
                  label="受診日"
                  labelCol={{ span: 4 }}
                >
                  <Space>
                    <Form.Item name="DateFChar">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/DD/MM" />
                    </Form.Item>
                    <Form.Item label="~" name="DateTChar">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/DD/MM" />
                    </Form.Item>
                  </Space>
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: 10 }}>
                <Row gutter={8}>
                  <Col span={16}>
                    <Space>
                      <Form.Item
                        label="事業所"
                        name="OfficeCode"
                      // label="事業所コード"
                      >
                        <Input.Search
                          type="text"
                          onSearch={this.openModalInputOfficeNumConverse}
                          onChange={(e) => {
                            e.target.value.length > 0 || this.formRef.current.getFieldValue('OfficeCode').length > 0
                              ? this.setState({ disabledField: false })
                              : this.setState({ disabledField: true })
                          }
                          }
                        />
                      </Form.Item>

                      <Form.Item
                        name="BranchStoreCodeF"
                        label="-"
                      // label="支社店コード[F]"
                      >
                        <Input
                          type="number"
                          disabled={this.state.disabledField}
                        />
                      </Form.Item>

                      <Form.Item
                        name="BranchStoreCodeT"
                        label="~"
                      // label="支社店コード[T]"
                      >
                        <Input
                          type="number"
                          disabled={this.state.disabledField}
                        />
                      </Form.Item>

                    </Space>
                  </Col>
                  <Col span={8} >
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("office_kanji_name")}</span>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

            </Row>
            <Row>
              <Col span={8}>
                <Form.Item
                  name=""
                  label="判定区分"
                  labelCol={{ span: 4 }}
                >
                  <Space size={2}>
                    <Form.Item
                      name="JudgeDivision01"
                    // style={{ width: '80px' }}
                    // label="判定区分01"
                    >
                      <Input.Search type="text" maxLength={3} onSearch={(value) => this.openModalJudgeQuery('JudgeDivision01')} />
                    </Form.Item>

                    <Form.Item
                      name="JudgeDivision02"
                    // style={{ width: '80px' }}
                    // label="判定区分02"
                    >
                      <Input.Search type="text" maxLength={3} onSearch={(value) => this.openModalJudgeQuery('JudgeDivision02')} />
                    </Form.Item>

                    <Form.Item
                      name="JudgeDivision03"
                    // style={{ width: '80px' }}
                    // label="判定区分03"
                    >
                      <Input.Search type="text" maxLength={3} onSearch={(value) => this.openModalJudgeQuery('JudgeDivision03')} />
                    </Form.Item>

                    <Form.Item
                      name="JudgeDivision04"
                    // style={{ width: '80px' }}
                    // label="判定区分04"
                    >
                      <Input.Search type="text" maxLength={3} onSearch={(value) => this.openModalJudgeQuery('JudgeDivision04')} />
                    </Form.Item>
                    <Form.Item
                      name="JudgeDivision05"
                    // style={{ width: '80px' }}
                    // label="判定区分05"
                    >
                      <Input.Search type="text" maxLength={3} onSearch={(value) => this.openModalJudgeQuery('JudgeDivision05')} />
                    </Form.Item>
                  </Space>
                </Form.Item>
              </Col>
              <Col span={8} style={{ paddingLeft: 10 }}>
                <Space size={50}>
                  <Form.Item
                    name="SelectAll"
                    label="全て"
                    valuePropName="checked"
                  >
                    <Checkbox></Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="Extract"
                    label="抽出"
                    valuePropName="checked"
                  >
                    <Checkbox></Checkbox>
                  </Form.Item>
                </Space>
              </Col>
              <Col span={7} offset={1}>
                <Space>
                  <Form.Item
                    name="KeyInfo"
                    label="キー情報"
                  >
                    <Select defaultValue={1}>
                      <Select.Option value={1}>1111111111</Select.Option>
                      <Select.Option value={2}>222222222</Select.Option>
                      <Select.Option value={3}>333333333</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                  >
                    <Button type="" icon={<SearchOutlined />} onClick={this.searchInfoExtractSub}>検　　索</Button>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
            <Table
              size="small"
              loading={this.state.loading}
              bordered
              dataSource={this.formRef.current ? this.formRef.current.getFieldValue('tableData') : []}
            >
              <Table.Column title="" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'W1_enabled_disabled']} valuePropName="checked">
                    <Checkbox></Checkbox>
                  </Form.Item>
                )
              }} />
              <Table.Column title="受診日" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'visit_date_on']}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} disabled format="YYYY/MM/DD" style={{ border: '0' }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="受付No" width="85px" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'receipt_number']}>
                    <Input readOnly type="number" style={{ border: '0' }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="個人番号" width="100px" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'personal_number_id']}>
                    <Input readOnly style={{ border: '0', textAlign: 'right' }} maxLength={10} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="メモ" width="50px" dataIndex="" key="" render={(value, record, index) => {
                // ???
                let icon = "";
                switch (record.expression_27) {
                  case 1: icon = (<InfoCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />);
                    break;
                  default: icon = (<InfoCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />);
                }
                return (
                  <div style={{ textAlign: "center", cursor: 'pointer' }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1200,
                          component: (
                            <WS2585001_OfficeInfoInquirySub
                              Li_OfficeCode={record.office_code}
                              Li_BranchCode={record.branch_store_code}
                              onClick={() => {
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
                      })
                    }}>
                    {icon}
                  </div>
                );
              }} />
              <Table.Column title="氏名" dataIndex="" key="" render={(value, record, index) => {
                // ???
                return (
                  <Form.Item name={['tableData', index, '']}>
                    <Input readOnly style={{ border: '0' }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="性別" width="50px" dataIndex="" key="" render={(value, record, index) => {
                // ???
                return (
                  <Form.Item name={['tableData', index, '']}>
                    <Input readOnly style={{ border: '0' }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="生年月日" dataIndex="" key="" render={(value, record, index) => {
                // ???
                return (
                  <Form.Item name={['tableData', index, '']}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} disabled format="YYYY/MM/DD" style={{ border: '0' }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="契約情報" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Input.Group compact>
                    <Form.Item name={['tableData', index, 'visit_course']} style={{ width: '30%', margin: 0 }}>
                      <Input readOnly style={{ border: '0' }} />
                    </Form.Item>
                    <Form.Item name={['tableData', index, 'contract_short_name']} style={{ width: '70%', margin: 0, paddingLeft: 5 }}>
                      <Input readOnly style={{ border: '0' }} />
                    </Form.Item>
                  </Input.Group>
                )
              }} />
              <Table.Column title="事業所情報" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'office_kanji_name']}>
                    <Input readOnly style={{ border: '0' }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="判定" width="50px" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'comprehensive_judgment']} style={{ textAlign: 'center', }}>
                    <span style={{
                      // compare color ....
                      // color: Color(record.comprehensive_judgment)?.Foreground
                    }}>
                      {record.comprehensive_judgment}
                    </span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="抽出" width="50px" dataIndex="" key="" render={(value, record, index) => {
                // ???
                return (
                  <Form.Item name={['tableData', index, '']}>
                    <Input readOnly style={{ border: '0' }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="印刷" width="50px" dataIndex="" key="" render={(value, record, index) => {
                // ???
                return (
                  <Form.Item name={['tableData', index, '']}>
                    <Input readOnly style={{ border: '0' }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="返送" width="50px" dataIndex="" key="" render={(value, record, index) => {
                // ???
                return (
                  <Form.Item name={['tableData', index, '']}>
                    <Input readOnly defaultValue={123} style={{ border: '0' }} />
                  </Form.Item>
                )
              }} />

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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0930001_PersonRequireExamIntroduceLetter);
