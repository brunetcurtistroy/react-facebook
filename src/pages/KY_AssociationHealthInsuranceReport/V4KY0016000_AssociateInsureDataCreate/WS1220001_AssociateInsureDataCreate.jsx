import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, Menu, Space, Row, Col, Dropdown, message, Tooltip, Spin } from "antd";
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";

import { PlusCircleOutlined, SearchOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, MoreOutlined } from "@ant-design/icons";
import ModalDraggable from "components/Commons/ModalDraggable";
import WS2635011_AutoJudge from 'pages/IN_InputBusiness/V5IN0001000_ExamineeList/WS2635011_AutoJudge.jsx';
import WS2637001_OverallResultDisplayInput from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637001_OverallResultDisplayInput.jsx';
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS2786001_ConditionAddSub from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub.jsx';
import WS2583001_ConsultInquirySub from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub.jsx';
import WS2537001_PersonalReserveProcess from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess.jsx';
import WS0802001_PrintInstruction from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0802001_PrintInstruction.jsx';
import WS1296010_ConsultTicketInputSub from 'pages/TK_SpecificMedicalExamination/V4TK4000003_SpecificMedicalExamSettleProcess/WS1296010_ConsultTicketInputSub.jsx';
import WS2584019_PersonalInfoInquirySub from 'pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx';

import AssociateInsureDataCreateService from "services/AssociationHealthInsuranceReport/AssociateInsureDataCreate/AssociateInsureDataCreateService";
import ExamineeSearchService from "services/ReservationBusiness/ExamineeSearch/ExamineeSearchService";

import moment from 'moment';
import status_input_lock from 'assets/img/status_input_lock.png';
import status_input_lock_disabled from 'assets/img/status_input_lock_disabled.png';
import ExamineeListAction from "redux/InputBusiness/ExamineeList/ExamineeList.action";
import Color from "constants/Color";
// import WS0723001_AutoJudgeScreen from "./WS0723001_AutoJudgeScreen";
// import WS3020036_CoupledPrintInstruction from "../V4IN0302000_NotInputCheckCategory/WS3020036_CoupledPrintInstruction";
import { download_file } from "helpers/CommonHelpers";

class WS1220001_AssociateInsureDataCreate extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '協会けんぽデータ作成';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: '',
      },
      // isLoading: true,
      isLoading: false,
      dataSource: [],
      selectedRows: {},
      selectedRowKeys: [],
      screenData: {
        KeyInfo: "",
        DataSourceName: "",
      },      
      kanji_name: 'test',
      Expression_32: 163,

      isLoadingPage: false
    };
  }

  onFinish(values) {

  }

  componentDidMount = () => {
    this.getScreenData();
    this.formRef.current.setFieldsValue({
      DateFChar: "2017/01/05",
      DateTChar: "2017/01/06",
      // DateFChar: "",
      // DateTChar: "",
      PrintGivenYear: "",
      PrintSpecifiedMonth: "",
      PrintingASpecifiedDateF: "",
      PrintingASpecifiedDateT: "",
    });
    this.forceUpdate();
  };

  
  getScreenData = () => {
    AssociateInsureDataCreateService.getScreenDataService()
      .then((res) => {
        this.setState({ screenData: res.data }, () => {});
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  displayAssociateInsureList = () => {
    this.setState({ isLoading: true, selectedRows: {}, selectedRowKeys: [] });

    const {
      DateFChar,
      DateTChar,
      PrintGivenYear,
      PrintSpecifiedMonth,
      PrintingASpecifiedDateF,
      PrintingASpecifiedDateT
    } = this.formRef.current.getFieldsValue(true);

    let params = {
      ...this.formRef.current.getFieldValue(),
      DateFChar: DateFChar ? moment(DateFChar).format("YYYY/MM/DD") : "",
      DateTChar: DateTChar ? moment(DateTChar).format("YYYY/MM/DD") : "",
      PrintGivenYear: PrintGivenYear,
      PrintSpecifiedMonth: PrintSpecifiedMonth,
      PrintingASpecifiedDateF: PrintingASpecifiedDateF,
      PrintingASpecifiedDateT: PrintingASpecifiedDateT,
      KeyInfo: this.state.screenData.KeyInfo,
      DataSourceName: this.state.screenData.DataSourceName,      
    }
    AssociateInsureDataCreateService.displayAssociateInsureDataCreateService(params)
      .then((res) => {
        this.onClickSearch();
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  };
  
  onClickSearch = () => {
    this.setState({ isLoading: true, selectedRows: {}, selectedRowKeys: [] });

    const {
      DateFChar,
      DateTChar,
    } = this.formRef.current.getFieldsValue(true);

    AssociateInsureDataCreateService.getAssociateInsureDataCreateService()
      .then(res => {
        this.formRef.current.setFieldsValue({
          ...res.data,
          DisplayList: res.data,
        });
        this.forceUpdate();
        if (res.data[0])
          this.setState({
            selectedRows: res.data[0],
            selectedRowKeys: [res.data[0].id],
          });        
        // this.setState({
        //   dataSource: res.data,
        //   isLoading: false,
        //   // selectedRows: res && res.length > 0 ? res[0] : {},
        //   // selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
        // })
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  render() {
    return (
      <div className="associate-insure-data-create">
        <Spin spinning={this.state.isLoadingPage}>
          <Card title="協会けんぽデータ作成" className="mb-3">
            <hr style={{ margin: '15px 0' }} />
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              // initialValues={{
              //   DateFChar: today,
              // }}
              autoComplete='off'
              onClick={() => {
                this.setState({
                  selectedRows: {},
                  selectedRowKeys: [],
                })
              }}
            >
              <Row gutter={24}>
                <Col span={10}>
                  <Row span={16}>
                    <Col span={4}>
                      <Form.Item label="請求日" style={{ marginLeft: '15px'}}>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="PrintGivenYear" label="" style={{ marginLeft: '5px'}}>
                        <Input type="text" style={{ textAlign: 'left' }}/>
                      </Form.Item>
                        {/* <span>年</span> */}
                    </Col>
                    <Col span={2}>
                      <Form.Item name="" label="年" style={{ marginLeft: '5px'}}>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item name="PrintSpecifiedMonth" label="" style={{ marginLeft: '5px' }}>
                        <Input type="text" style={{ textAlign: 'left' }}/>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item name="" label="月" style={{ marginLeft: '5px'}}>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item name="PrintingASpecifiedDateF" label="" style={{ marginLeft: '5px' }}>
                        <Input type="text" style={{ textAlign: 'left' }}/>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item name="" label="日～" style={{ marginLeft: '5px'}}>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item name="PrintingASpecifiedDateT" label="" style={{ marginLeft: '5px' }}>
                        <Input type="text" style={{ textAlign: 'left' }}/>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label="日まで" style={{ marginLeft: '5px'}}>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row span={16}>
                    <Col span={11}>
                      <Form.Item name="DateFChar" label="受診日">
                        <VenusDatePickerCustom
                          formRefDatePicker={this.formRef}
                          format="YYYY/MM/DD"
                          style={{ width: "100%" }}
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2} style={{ textAlign: "center" }}>
                      <span>~</span>
                    </Col>
                    <Col span={11}>
                      <Form.Item name="DateTChar">
                        <VenusDatePickerCustom
                          format="YYYY/MM/DD"
                          style={{ width: "100%" }}
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row span={16}>
                    <Col span={12}>
                    </Col>
                    <Col span={12}>
                    <Space>
                      <Form.Item>
                        <Button icon={<SearchOutlined />}
                          style={{ float: "right", color: Color(163).Foreground }}
                          onClick={() => {
                            this.displayAssociateInsureList();
                          }}
                        >検　　索</Button>
                      </Form.Item>
                    </Space>
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row span={16}>
                    <Col span={6}>
                    </Col>
                    <Col span={18}>                    
                      <Form.Item name="DateSChar" label="送付日">
                        <VenusDatePickerCustom
                          formRefDatePicker={this.formRef}
                          format="YYYY/MM/DD"
                          style={{ width: "100%" }}
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row span={16}>
                    <Col span={12}>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Button
                          style={{ float: "right", color: Color(163).Foreground }}
                          onClick={() => {
                            this.displayAssociateInsureList();
                          }}
                        >作成</Button>
                      </Form.Item>
                    </Col>
                  </Row>

                </Col>
                <Col span={8}>
                </Col>

                {/* <Form.Item name="kanji_name">
                  <Input readOnly style={{ background: 'transparent', border: 'none' }} />
                </Form.Item> */}
                </Row>
              <br></br>
            </Form>
          </Card>

          <Card>
            <Table
              rowKey={(record) => record.id}
              dataSource={
                this.formRef.current
                  ? this.formRef.current.getFieldValue("DisplayList")
                  : []
              }
              // rowSelection={{
              //   type: "radio",
              //   ...rowSelection,
              // }}
              rowClassName={(record, index) =>
                record.id === this.state.selectedRows.id
                  ? "hightlight-row-selected"
                  : ""
              }
              onRow={(record, index) => ({
                onClick: (event) => this.setState({ selectedRows: record }),
              })}
              size="small"
              loading={this.state.isLoading}
              scroll={{ x: 1100 }}
              bordered
              // columns={tableColums}
              components={this.components}
            >
              <Table.Column dataIndex="Expression_34" title={<img src={status_input_lock}></img>} width={30} align='center'
                render={(value, record) => {
                  return (
                    <img src={value === 'アンロック.png' ? status_input_lock_disabled : status_input_lock}></img>
                  )
                }} />
              <Table.Column
                title={<div style={{ textAlign: "center" }}>受診日</div>}
                width={80}
                dataIndex="visit_date_on"
                render={(text) => (
                  <>{text ? moment(text).format("YYYY/MM/DD") : ""}</>
                )}
                key=""
              />              
              <Table.Column title="個人番号" dataIndex="personal_number_id" width={70}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{value === 0 ? '' : value}</div>
                  )
                }} />
              <Table.Column title="" dataIndex="Expression_24" width={30} align='center'
                render={(value, record, index) => {
                  let icon = null;
                  switch (record.Expression_24) {
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
                  return (
                    <div style={{ cursor: 'pointer' }} hidden={!record.personal_number_id}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '90%',
                            component: (
                              <Card title={'個人情報照会SUB'}>
                                <WS2584019_PersonalInfoInquirySub
                                  Li_PersonalNum={record.personal_number_id}
                                />
                              </Card>
                            ),
                          },
                        });
                      }} >{icon}
                    </div>)
                }} />
              <Table.Column title="漢字氏名" dataIndex="kanji_name" width={150} />
              <Table.Column
                title="性別"
                dataIndex="Gender"
                width={40}
                render={(text, record, index) =>
                  text === "男性" ? (
                    <div style={{ color: "blue" }}>{text}</div>
                  ) : (
                    <div style={{ color: "red" }}>{text}</div>
                  )
                }
              />              
              <Table.Column title="年齢" dataIndex="Age" width={40} />
              <Table.Column title="続柄" dataIndex="name" width={40} />
              <Table.Column title="記号" dataIndex="insurer_card_symbol" width={70} />
              <Table.Column title="番号" dataIndex="insurer_card_number" width={60} />
              <Table.Column title="事業所" dataIndex="office_kanji_name" width={110} />
              <Table.Column title="契約情報" dataIndex=""  width={110}
                render={(value, record) => (
                  <div>
                    <span> {record.visit_course} </span>
                    <span style={{ marginLeft: '3px' }}> {record.contract_short_name} </span>
                  </div>
                )}
              />
              <Table.Column title="協会請求日" dataIndex="association_request_consultation_date_on" width={80} />
              <Table.Column title="協会受付No" dataIndex="association_acceptance_number" width={90}
                render={(value, record) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{value === 0 ? '' : value}</div>
                  )
                }}
              />
              <Table.Column width={50} align='center'
                render={(value, record) => {
                  return (
                    <Dropdown
                      trigger='click'
                      overlay={() => (
                        <Menu>
                          <Menu.Item
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: "70%",
                                  visible: true,
                                  component: (
                                    <WS2583001_ConsultInquirySub
                                      Li_ReserveNum={record.W1_reserve_num}
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
                                  width: "90%",
                                  visible: true,
                                  className: 'custom-button-close',
                                  component: (
                                    <WS2537001_PersonalReserveProcess
                                      Li_ReserveNum={record.W1_reserve_num}
                                      Li_Child={true}
                                      onFinishScreen={() => {
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          >
                            変更
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: "90%",
                                  visible: true,
                                  component: (
                                    <WS2637001_OverallResultDisplayInput
                                      Li_ReserveNum={record.W1_reserve_num}
                                      Li_MenuOption={this.props.Li_MenuOption}
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
                              this.eventF11()
                            }}
                          >
                            印刷
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: "80%",
                                  visible: true,
                                  component: (
                                    <WS1296010_ConsultTicketInputSub
                                      Li_ReserveNum={record.W1_reserve_num}
                                      Li_CourseLevel={record.W1_course_level}
                                      onFinishScreen={() => {
                                        this.closeModal();
                                      }}
                                    />
                                  )
                                },
                              });
                            }}
                          >
                            受診券
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              this.excelReport()
                            }}>
                            EXCEL
                          </Menu.Item>
                        </Menu>
                      )}
                    >
                      <Button size='small' icon={<MoreOutlined />}></Button>
                    </Dropdown>
                  )
                }}
              />
            </Table>
          </Card>

        </Spin>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1220001_AssociateInsureDataCreate);
