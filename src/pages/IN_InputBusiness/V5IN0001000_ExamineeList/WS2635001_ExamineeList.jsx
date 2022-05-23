import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Table, Menu, Space, Row, Col, Dropdown, message, Tooltip, Spin } from "antd";

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

import moment from 'moment';
import status_input_lock from 'assets/img/status_input_lock.png';
import status_input_lock_disabled from 'assets/img/status_input_lock_disabled.png';
import ExamineeListAction from "redux/InputBusiness/ExamineeList/ExamineeList.action";
import Color from "constants/Color";
import WS0723001_AutoJudgeScreen from "./WS0723001_AutoJudgeScreen";
import WS3020036_CoupledPrintInstruction from "../V4IN0302000_NotInputCheckCategory/WS3020036_CoupledPrintInstruction";
import { download_file } from "helpers/CommonHelpers";

let today = moment(new Date());
class WS2635001_ExamineeList extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_MenuOption: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '受診者一覧';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: '',
      },
      isLoadingTable: true,
      dataSource: [],
      selectedRows: {},
      selectedRowKeys: [],
      kanji_name: 'test',
      Expression_32: 163,

      isLoadingPage: false
    };
  }

  componentDidMount() {
    this.getDataExamineeList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getDataExamineeList();
    }
  }

  getDataExamineeList() {
    let params = {
      ...this.formRef.current.getFieldValue(),
      DateFChar: moment(this.formRef.current.getFieldValue('DateFChar'))?.format("YYYY/MM/DD"),
    }

    this.setState({ isLoadingTable: true });

    ExamineeListAction.getDataExamineeList(params)
      .then(res => {
        this.setState({
          dataSource: res,
          isLoadingTable: false,
          selectedRows: res && res.length > 0 ? res[0] : {},
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: ''
      },
    });
  }

  onFinish(values) { }

  excelReport() {
    let params = {
      ...this.formRef.current.getFieldValue(),
      DateFChar: moment(this.formRef.current.getFieldValue('DateFChar'))?.format("YYYY/MM/DD"),
    }
    this.setState({ isLoadingTable: true })
    ExamineeListAction.excelReport(params)
      .then((res) => {
        download_file(res);
        this.setState({ isLoadingTable: false })
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => { this.setState({ isLoadingTable: false }) })
  }

  eventF11() {
    this.setState({ isLoadingPage: true })
    ExamineeListAction.eventF11()
      .then((res) => {
        if (res.data.message === 'CallScreenWS0802001') {
          this.showModalPrintInstruction()
        } else {
          if (res.data.message === 'CallScreenWS3020036') {
            this.showModalCoupledPrintInstruction()
          }
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => { this.setState({ isLoadingPage: false }) })
  }

  showModalPrintInstruction() {
    this.setState({
      ...this.state,
      childModal: {
        width: 700,
        visible: true,
        component: (
          <WS0802001_PrintInstruction
            Li_ReserveNum={this.state.selectedRows.W1_reserve_num}
            Li_CourseLevel={this.state.selectedRows.W1_course_level}
            onFinishScreen={() => {
              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  showModalCoupledPrintInstruction() {
    this.setState({
      ...this.state,
      childModal: {
        width: 700,
        visible: true,
        component: (
          <WS3020036_CoupledPrintInstruction
            Li_ReserveNum={this.state.selectedRows.W1_reserve_num}
            Li_CourseLevel={this.state.selectedRows.W1_course_level}
            onFinishScreen={() => {
              this.closeModal();
            }}
          />
        ),
      },
    });
  }

  render() {
    const format = 'YYYY/MM/DD';
    return (
      <div className="examinee-list">
        <Spin spinning={this.state.isLoadingPage}>
          <Card title="受診者一覧" className="mb-3">
            <Space>
              <Button disabled={Object.keys(this.state.selectedRows).length === 0}
                onClick={() => {
                  this.setState({
                    ...this.state,
                    childModal: {
                      width: "90%",
                      visible: true,
                      className: 'custom-button-close',
                      component: (
                        <WS2537001_PersonalReserveProcess
                          Li_ReserveNum={this.state.selectedRows.W1_reserve_num}
                          Li_Child={true}
                          onFinishScreen={() => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}>
                変更
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 300,
                      component: (Object.keys(this.state.selectedRows).length !== 0 ?
                        <WS0723001_AutoJudgeScreen
                          Li_ReserveNum={this.state.selectedRows.W1_reserve_num}
                          Li_TrueOrFalse={1}
                          onFinishScreen={() => {
                            this.closeModal()
                          }} />
                        :
                        <WS2635011_AutoJudge
                          onFinishScreen={() => {
                            this.closeModal()
                          }} />
                      )

                      ,
                    },
                  });
                }}>
                判定
              </Button>
              <Button disabled={Object.keys(this.state.selectedRows).length === 0}
                onClick={() => {
                  this.eventF11()
                }}>
                印刷
              </Button>
              <Button disabled={Object.keys(this.state.selectedRows).length === 0}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '85%',
                      component:
                        <WS2637001_OverallResultDisplayInput
                          Li_MenuOption={this.props.Li_MenuOption}
                          Li_ReserveNum={this.state.selectedRows.W1_reserve_num}
                          onFinishScreen={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: false,
                              },
                            });
                          }}
                        />
                      ,
                    },
                  });
                }}
              >
                入力
              </Button>
            </Space>
            <hr style={{ margin: '15px 0' }} />
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{
                DateFChar: today,
              }}
              autoComplete='off'
              onClick={() => {
                this.setState({
                  selectedRows: {},
                  selectedRowKeys: [],
                })
              }}
            >
              <Space>
                <Form.Item name="DateFChar" label="日付">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={format} />
                </Form.Item>
                <Form.Item name="PersonalNum" label="個人" style={{ marginLeft: '15px' }}>
                  <Input.Search type="text" style={{ textAlign: 'right' }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '85%',
                          component: (<WS0248001_PersonalInfoSearchQuery
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                PersonalNum: output.recordData.personal_number_id,
                                kanji_name: output.recordData.kanji_name
                              })
                              this.closeModal()
                            }}
                          />)
                        }
                      });
                    }}
                    onChange={() => {
                      this.formRef.current.setFieldsValue({
                        kanji_name: ''
                      })
                    }}
                  />
                </Form.Item>
                <Form.Item name="kanji_name">
                  <Input readOnly style={{ background: 'transparent', border: 'none' }} />
                </Form.Item>
              </Space>
              <br></br>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="Search" label="検索">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Space>
                    <Form.Item>
                      <Button icon={<PlusCircleOutlined />}
                        style={{ color: Color(this.state.Expression_32).Foreground }}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 650,
                              component:
                                <WS2786001_ConditionAddSub
                                  Li_DateF={this.formRef.current.getFieldValue('DateFChar')}
                                  Li_DateT={this.formRef.current.getFieldValue('DateFChar')}
                                  Li_PersonalNum={this.formRef.current.getFieldValue('PersonalNum')}
                                  Lio_KeyInfo={this.formRef.current.getFieldValue('KeyInfo')}
                                  Li_State={'1'}
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      KeyInfo: output.Lio_KeyInfo ? output.Lio_KeyInfo : ''
                                    })
                                    this.setState({
                                      Expression_32: output.Expression_36
                                    })
                                    this.closeModal()
                                  }}
                                />
                              ,
                            },
                          });
                        }} > 条件追加</Button>
                    </Form.Item>
                    <Form.Item>
                      <Button icon={<SearchOutlined />}
                        style={{ color: Color(163).Foreground }}
                        onClick={() => {
                          this.getDataExamineeList();
                        }}
                      >検　　索</Button>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card>
            <Table
              size='small'
              style={{ cursor: 'pointer' }}
              rowClassName={(record, index) => record.id === this.state.selectedRows?.id ? 'table-row-light' : ''}
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={true}
              bordered={true}
              rowKey={(record) => record.id}
              scroll={{ x: 1100 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: async () => {
                    await this.setState({
                      selectedRows: record,
                      selectedRowKeys: [record.id],
                    });
                  },
                  onDoubleClick: () => {
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
                  }
                }
              }}
            // rowSelection={{
            //   type: 'radio',
            //   selectedRowKeys: this.state.selectedRowKeys,
            //   onChange: (selectedRowKeys, selectedRows) => {
            //     this.setState({
            //       selectedRows: selectedRows[0],
            //       selectedRowKeys: selectedRowKeys
            //     })
            //   }
            // }}
            >
              <Table.Column dataIndex="Expression_34" title={<img src={status_input_lock}></img>} width={30} align='center'
                render={(value, record) => {
                  return (
                    <img src={value === 'アンロック.png' ? status_input_lock_disabled : status_input_lock}></img>
                  )
                }} />
              <Table.Column title="受診日" dataIndex="visit_date_on" width={85} />
              <Table.Column title="個人番号" dataIndex="personal_number_id" width={70}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{value === 0 ? '' : value}</div>
                  )
                }} />
              <Table.Column title="ﾒﾓ" dataIndex="Expression_24" width={30} align='center'
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
              <Table.Column title="氏名" dataIndex="PersonalName" width={160} />
              <Table.Column title="受付No" dataIndex="receipt_number" width={60}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{value === 0 ? '' : value}</div>
                  )
                }}
              />
              <Table.Column title="契約情報" dataIndex=""
                render={(alue, record) => (
                  <div>
                    <span> {record.visit_course} </span>
                    <span style={{ marginLeft: '3px' }}> {record.contract_short_name} </span>
                  </div>
                )}
              />
              <Table.Column title="事業所" dataIndex="office_kanji_name" width={140} />
              <Table.Column title="指導" dataIndex="Expression_25" width={40} align='center' />
              <Table.Column title="判定" dataIndex="comprehensive_judgment" width={40} align='center'
                render={(value, record, index) => {
                  return (
                    <span style={{ color: Color(record.Expression_26)?.Foreground }}>{value}</span>
                  )
                }} />
              <Table.Column title="階層" dataIndex="Expression_40" width={40} align='center'
                render={(value, record, index) => {
                  return (
                    <Tooltip title={record.Expression_13}>
                      <span style={{ cursor: 'default', color: Color(record.Expression_41)?.Foreground }}>{value}</span>
                    </Tooltip>
                  )
                }} />
              <Table.Column title="ﾒﾀﾎﾞ" dataIndex="Expression_42" width={50} align='center'
                render={(value, record, index) => {
                  return (
                    <Tooltip title={record.Expression_14}>
                      <span style={{ cursor: 'default', color: Color(record.Expression_43)?.Foreground }}>{value}</span>
                    </Tooltip>
                  )
                }} />
              <Table.Column title="医師名" dataIndex="DoctorName" width={80} />
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
        <ModalDraggable
          className={this.state.childModal.className}
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2635001_ExamineeList);
