import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import { Card, Form, Input, Select, Button, Table, Row, Col, DatePicker, Modal, Space, Dropdown, Menu, } from "antd";

import WS1444001_DunningInquiry from 'pages/TH_SpecificInsureGuide/V5TH0010800_InsureGuideInput/WS1444001_DunningInquiry.jsx';
import WS1436001_ImplementRecordRef from 'pages/TH_SpecificInsureGuide/V5TH0010800_InsureGuideInput/WS1436001_ImplementRecordRef.jsx';
import WS2653001_GuideInputProvenSub from 'pages/TH_SpecificInsureGuide/V5TH0010100_InsureGuideInitInput/WS2653001_GuideInputProvenSub.jsx';
import WS1382001_ImplementorInquiry from 'pages/TM_SpecificInsureMaintenance/V4TH0000300_InsureGuideCourse/WS1382001_ImplementorInquiry.jsx';
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import { getIntroduceInsureGuideInputAction } from "redux/SpecificInsureGuide/InsureGuideInput/InsureGuideInput.actions";
import moment from "moment";

class WS2652001_InsureGuideInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "保健指導入力";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: true,
      kanji_name1: '',
      kanji_name2: '',
    };
    this.onFinish = this.onFinish.bind(this);
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  callAPILoadData = (params) => {
    this.setState({ isLoadingTable: true })
    getIntroduceInsureGuideInputAction(params)
      .then((res) => {
        this.setState({ dataSource: res.data })
      })
      .catch(err => { })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  onFinish(values) {
    const params = {
      ...values,
      DateFChar: moment(values.DateFChar).format('YYYY/MM/DD'),
      DateTChar: moment(values.DateTChar).format('YYYY/MM/DD'),
      PersonalNum: values.PersonalNum ?? '',
      PractitionerCode: values.PractitionerCode ?? '',
      Division: ''
    }
    console.log(params)
    this.callAPILoadData(params)
  }

  render() {
    return (
      <div className="insure-guide-input">
        <Card title="保健指導入力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              GuidanceDivision: 0,
              State: 0,
            }}
          >
            <Row gutter={24}>
              <Col md={8} lg={6}>
                <Row>
                  <Space >
                    <Form.Item name="DateFChar" label="日　付" style={{ marginLeft: '-10px' }}
                      rules={[{ required: true, message: '日付を入力して下さい' }]}
                    >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                    </Form.Item>
                    <Form.Item>
                      <span>~</span>
                    </Form.Item>
                    <Form.Item name="DateTChar" rules={[{ required: true, message: '日付を入力して下さい' }]}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                    </Form.Item>
                  </Space>
                </Row>

                <Form.Item label="実施者" style={{ margin: 0 }}>
                  <Space>
                    <Form.Item name="PractitionerCode">
                      <Input.Search style={{ width: '150px' }} onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1500,
                            component: (<WS1382001_ImplementorInquiry
                              onFinishScreen={() => {
                                // this.formRef.current.setFieldsValue({
                                //   PractitionerCode: ''
                                // });
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  }
                                });
                              }}
                            />),
                          },
                        })
                      }} />
                    </Form.Item>
                    <Form.Item >
                      <div>{this.state.kanji_name1}</div>
                    </Form.Item>
                  </Space>
                </Form.Item>

                <Form.Item label="個　人" style={{ margin: 0 }}>
                  <Space>
                    <Form.Item name="PersonalNum">
                      <Input.Search style={{ width: '150px' }} onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1500,
                            component: (<WS0248001_PersonalInfoSearchQuery
                              getValueChild={(data) => {
                                this.formRef.current.setFieldsValue({
                                  PersonalNum: data.personal_number_id
                                });
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                  kanji_name2: data.kanji_name
                                });
                              }}
                            />),
                          },
                        })
                      }} />
                    </Form.Item>
                    <Form.Item >
                      <div>{this.state.kanji_name2}</div>
                    </Form.Item>
                  </Space>
                </Form.Item>

                <Form.Item label="指　導" name="GuidanceDivision">
                  <Select style={{ width: '150px' }}>
                    <Select.Option value={0}>全て</Select.Option>
                    <Select.Option value={1}>動機付支援</Select.Option>
                    <Select.Option value={2}>積極的支援</Select.Option>
                    <Select.Option value={3}>動機付相当</Select.Option>
                    <Select.Option value={4}>モデル実施</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="状　態" name="State">
                  <Select style={{ width: '150px' }}>
                    <Select.Option value={0}>全て</Select.Option>
                    <Select.Option value={1}>未完了</Select.Option>
                    <Select.Option value={2}>完了</Select.Option>
                  </Select>
                </Form.Item>
                <Button
                  icon={<SearchOutlined />}
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  検　　索
                </Button>
              </Col>

              <Col md={16} lg={18}>
                <Table size='small'
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={true}
                  bordered={true}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="実施日" dataIndex="Expression_1" />
                  <Table.Column title="個人番号" dataIndex="W1_id" />
                  <Table.Column title="氏　名" dataIndex="kanji_name" />
                  <Table.Column title="性別" dataIndex="Expression_10" render={(text, record, index) => (
                    <span style={{ color: text === '男性' ? '#0000FF' : '#FF0000' }}>{text}</span>
                  )} />
                  <Table.Column title="指導区分" dataIndex="Expression_12" render={(text, record, index) => {
                    let color = '';
                    switch (text) {
                      case '動機付支援':
                        color = '#808000';
                        break;
                      case '積極的支援':
                        color = '#0000FF';
                        break;
                      default: color = '';
                        break;
                    }
                    return <span style={{ color: color }}>{text}</span>
                  }} />
                  <Table.Column title="評価区分" dataIndex="Expression_14" />
                  <Table.Column title="支援項目" dataIndex="support" />
                  <Table.Column title="支援量" dataIndex="support_price" />
                  <Table.Column title="実施" dataIndex="Expression_17" />
                  <Table.Column title="督促" dataIndex="Expression_18" />
                  <Table.Column
                    width={70}
                    render={(value, record) => {
                      return (
                        <Dropdown
                          overlay={() => (
                            <Menu>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "60%",
                                      visible: true,
                                      component: (
                                        <WS2653001_GuideInputProvenSub
                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                入力
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "60%",
                                      visible: true,
                                      component: (
                                        <WS1436001_ImplementRecordRef

                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                照会
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    childModal: {
                                      width: "80%",
                                      visible: true,
                                      component: (
                                        <WS1444001_DunningInquiry

                                          onFinishScreen={() => {
                                            this.closeModal();
                                          }}
                                        />
                                      ),
                                    },
                                  });
                                }}
                              >
                                督促
                              </Menu.Item>
                            </Menu>
                          )}
                        >
                          <Button icon={<MoreOutlined />}></Button>
                        </Dropdown>
                      );
                    }}
                  />
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2652001_InsureGuideInput);
