import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Table, Row, Col, Form, Space, Input, Checkbox, Select, Tag, InputNumber } from "antd";
import Color from "constants/Color";
import moment from 'moment';
import { ModalCustom } from "components/Commons/ModalCustom";
import PropTypes from "prop-types";
import WS0433001_PrinterConfirm from "../V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm";
import WS0932001_RequiredPrecisionExaminerSetting from "./WS0932001_RequiredPrecisionExaminerSetting";
import WS0888026_IntroduceLetterSubjectCmtInquiry from "../V4SK0003000_IntroduceLetterExtract/WS0888026_IntroduceLetterSubjectCmtInquiry";
import WS0887001_IntroduceLetterVariousMasterInquiry from "../V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry";
// import WS0935013_InspectInquiry from "./WS0935013_InspectInquiry";
import WS0932008_InspectInquiry from "./WS0932008_InspectInquiry";
import Menubar from "components/Commons/Menubar";
const styleFormItem = {
  margin: 0,
}
const styleDivGender = {
  border: 'solid 1px #ABADB3',
  width: '50px',
  height: '24px',
  textAlign: 'center',
  lineHeight: '22px',
  color: '#FFFFFF'
}
const styleCard = {
  marginBottom: '0.4em'
}
const styleTag = {
  textAlign: 'center',
  width: '100%',
  margin: 0,
  background: '#1C66B9',
  color: '#FFFFFF'
}
const formatDate = 'YYYY/MM/DD'
class WS0935001_RequiredPrecisionExaminerFollowUpMatterRegister extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_Window: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '要精検者ﾌｫﾛｰ事項登録';

    this.formRef = React.createRef();
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      objTemp: {
        AcceptedNo: 123,
        Age: '22歳',
        ContractAbbreviation: 'undefined',
        CourseCode: 'A00',
        Date: moment().format(formatDate),
        DateBirth: moment('1999/09/09').format('NNy/MM/DD'),
        Expression_13: 1,
        Expression_14: 'undefined',
        Expression_27: '男性',
        Expression_28: 261,
        KanaName: 'undefined',
        KanjiName: 'undefined',
        PhoneNum: 888888888,
        ZipCode: '811-5301',
        comment_content: 'undefined',
        general_comment_code: 12345,
        medical_institution_code: 1234,
        medical_institution_name: 'undefined',
        other_return: 'undefined',
      },
      dataSource: [{
        id: 1,
        department: [{ key: 1, value: 'a' }],
        StsReturn: false,
        issued_flg: true
      }],
      isLoading: false,
      rowSelect: {},

      dataLetterIntroduceInspect: [],
      isLoadingLetterIntroduceInspect: false,
      rowSelectLetterIntroduceInspect: {},

      dataFollowList: [],
      isLoadingFollowList: false,
      rowSelectFollowList: {},
      menuItems: [
        { id: 2, label: 'フォルダ', handleClick: this.eventF7 },
        { id: 3, label: '最新', handleClick: this.eventF8 },
        { id: 4, label: '一次検査', handleClick: this.eventF9 },
        { id: 5, label: '発行', handleClick: this.eventF10 },
        { id: 6, label: '返送', handleClick: this.eventF11 },
      ],
    };
  }

  componentDidMount = () => {
    this.formRef?.current?.setFieldsValue(this.state.objTemp)
  }

  eventF7 = () => {}

  eventF8 = () => {}

  eventF9 = () => {}

  eventF10 = () => {
    this.setState({
      ...this.state,
      childModal: {
        width: 400,
        visible: true,
        component: (
          <WS0433001_PrinterConfirm
            Li_PreviewSpecifiedValue={false}
            Li_PrinterNoSpecifiedValue={1}
            Lo_Preview={false}
            Lo_PrinterNo={0}
            Lo_StsOutput={false}
            onFinishScreen={() => {
              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  eventF11 = () => {}

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="required-precision-examiner-follow-up-matter-register">
        <Card title="要精検者ﾌｫﾛｰ事項登録">
          <Form ref={this.formRef} autoComplete='off'>
            <Menubar items={this.state.menuItems} />
            <Row gutter={6} style={styleCard} className='mt-2'>
              <Col span={8}>
                <Card>
                  <Form.Item label='受診日' style={styleFormItem}>
                    <Space>
                      <Form.Item name='Date'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                      <Form.Item name='AcceptedNo'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  <Form.Item />
                  <Form.Item label='コース' style={styleFormItem}>
                    <Space>
                      <Form.Item name='CourseCode'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                      <Form.Item name='ContractAbbreviation'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                </Card>
              </Col>
              <Col span={16} >
                <Card>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label='個人番号' style={styleFormItem}>
                        <Space>
                          <Form.Item name='Expression_13'>
                            <Input bordered={false} />
                          </Form.Item>
                          <Form.Item name='DateBirth'>
                            <Input bordered={false} />
                          </Form.Item>
                          <Form.Item name='Age'>
                            <Input bordered={false} />
                          </Form.Item>
                        </Space>
                      </Form.Item>
                      <Form.Item name='KanaName'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                      <Form.Item name='KanjiName' style={{ float: 'left' }}>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                      {/* color: Expression_28, value: Expression_27 */}
                      <Form.Item name='Expression_27' style={{ float: 'right' }}>
                        <Input readOnly style={{ ...styleDivGender, background: Color(261).Background }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label='〒' name='ZipCode'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                      <Form.Item name='Expression_14'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                      <Form.Item label='TEL' name='PhoneNum'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Card style={styleCard}>
              <Form.Item label='紹介状' />
              <Row gutter={10}>
                <Col span={5}>
                  <Table
                    bordered
                    size='small'
                    dataSource={this.state.dataSource}
                    loading={this.state.isLoading}
                    pagination={{
                      defaultPageSize: 10,
                      size: 'small',
                      showQuickJumper: true,
                      hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
                    }}
                    rowKey={(record) => record.id}
                    rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
                    onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
                  >
                    <Table.Column title="紹介科" dataIndex="department" render={(text, record) => (
                      <Select
                        style={{ width: '100%' }}
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            childModal: {
                              width: '70%',
                              visible: true,
                              component: (
                                <WS0932001_RequiredPrecisionExaminerSetting
                                  onFinishScreen={() => {
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          })
                        }}>
                        {record?.department?.map(item => (
                          <Select.Option key={item.key}>{item.value}</Select.Option>
                        ))}
                      </Select>
                    )} />
                    <Table.Column title="印刷" dataIndex="issued_flg" width={70} align="center" render={(text, record) => (
                      <Checkbox checked={record?.issued_flg} />
                    )} />
                    <Table.Column title="返送" dataIndex="StsReturn" width={70} align="center" render={(text, record) => (
                      <Checkbox checked={record?.StsReturn} />
                    )} />
                  </Table>
                </Col>
                <Col span={19}>
                  <Row gutter={6}>
                    <Col span={2}>
                      <Form.Item><Tag style={styleTag}>医療機関</Tag></Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name='medical_institution_code'>
                        <InputNumber maxLength={4} onDoubleClick={() => {
                          if (this.state.rowSelect.department > 0) {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: '60%',
                                visible: true,
                                component: (
                                  <WS0887001_IntroduceLetterVariousMasterInquiry
                                    Li_ManageCode={4}
                                    Lo_VariousCodes={this.formRef?.current?.getFieldValue('medical_institution_code')}
                                    onFinishScreen={({Lo_VariousCodes}) => {
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            })
                          }
                        }} />
                      </Form.Item>
                    </Col>
                    <Col span={19}>
                      <Form.Item name='medical_institution_name'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={6}>
                    <Col span={2}>
                      <Form.Item><Tag style={styleTag}>コメント</Tag></Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name='general_comment_code'>
                        <InputNumber maxLength={5} onDoubleClick={() => {
                          this.setState({
                            ...this.state,
                            childModal: {
                              width: '60%',
                              visible: true,
                              component: (
                                <WS0888026_IntroduceLetterSubjectCmtInquiry
                                  Lo_Cmtcode={this.formRef?.current?.getFieldValue('general_comment_code')}
                                  onFinishScreen={({ Lo_Cmtcode }) => {
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          })
                        }} />
                      </Form.Item>
                    </Col>
                    <Col span={19}>
                      <Form.Item name='comment_content'>
                        <Input bordered={false} readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={6}>
                    <Col span={2}>
                      <Form.Item><Tag style={styleTag}>　特記　</Tag></Form.Item>
                    </Col>
                    <Col span={22}>
                      <Form.Item name='other_return'>
                        <Input maxLength={80} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Table
                    bordered
                    size='small'
                    dataSource={this.state.dataLetterIntroduceInspect}
                    loading={this.state.isLoading}
                    pagination={false}
                    rowKey={(record) => record.id}
                    rowClassName={(record, index) => record.id === this.state.rowSelectLetterIntroduceInspect.id ? 'hightlight-row-selected' : ''}
                    onRow={(record, index) => ({ onClick: event => this.setState({ rowSelectLetterIntroduceInspect: record }) })}
                  >
                    <Table.Column title="検査ｺｰﾄﾞ" dataIndex="exam_code" render={(text, record) => (
                      <InputNumber maxLength={8} value={record.exam_code} onDoubleClick={() => {
                        this.setState({
                          ...this.state,
                          childModal: {
                            width: '60%',
                            visible: true,
                            component: (
                              <WS0932008_InspectInquiry
                                Li_CourseLevel
                                Li_ReserveNum
                                Li_Department
                                Li_JudgeLevel
                                Lo_StsEnter
                                onFinishScreen={() => {
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        })
                      }} />
                    )} />
                    <Table.Column title="名称" dataIndex="exam_name" />
                    <Table.Column title="結果値" dataIndex="Expression_12" />
                    <Table.Column title="判定" dataIndex="Expression_13" render={(text, record) => (
                      <div style={{ textAlign: 'center', color: Color(record?.Expression_14).Foreground }}>{text}</div>
                    )} />
                    <Table.Column title="" dataIndex="" />
                  </Table>
                </Col>
              </Row>
            </Card>

            <Card>
              <Form.Item label='フォロー計画' />
              <Table
                bordered
                size='small'
                dataSource={this.state.dataFollowList}
                loading={this.state.isLoadingFollowList}
                pagination={false}
                rowKey={(record) => record.id}
                rowClassName={(record, index) => record.id === this.state.rowSelectFollowList.id ? 'hightlight-row-selected' : ''}
                onRow={(record, index) => ({ onClick: event => this.setState({ rowSelectFollowList: record }) })}
              >
                <Table.Column title="ﾌｫﾛｰ予定日" dataIndex="Date" render={(text, record) => (
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={formatDate} value={record.Date} />
                )} />
                <Table.Column title="手段" dataIndex="means" render={(text, record) => (
                  <Select>
                    {record?.means?.map(item => (
                      <Select.Option key={item.key}>{item.value}</Select.Option>
                    ))}
                  </Select>
                )} />
                <Table.Column title="担当者" dataIndex="person_in_charge" render={(text, record) => (
                  <Select>
                    {record?.person_in_charge?.map(item => (
                      <Select.Option key={item.key}>{item.value}</Select.Option>
                    ))}
                  </Select>
                )} />
                <Table.Column title="ｺﾒﾝﾄ/特記事項" dataIndex="scheduled_content" render={(text, record) => (
                  <Input maxLength={500} value={record.scheduled_content} />
                )} />
                <Table.Column title="実施日" dataIndex="ImplementDate" render={(text, record) => (
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={formatDate} value={record.ImplementDate} />
                )} />
              </Table>
            </Card>
          </Form>
        </Card>
        {ModalCustom({
          width: this.state.childModal.width,
          visible: this.state.childModal.visible,
          component: this.state.childModal.component,
          destroyOnClose: false,
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0935001_RequiredPrecisionExaminerFollowUpMatterRegister);
