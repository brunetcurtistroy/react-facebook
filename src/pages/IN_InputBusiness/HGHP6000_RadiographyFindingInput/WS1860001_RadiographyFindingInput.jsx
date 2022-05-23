import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Table, Row, Col, Modal, Space, message, Tooltip, Dropdown, Menu, Spin } from "antd";

import { SearchOutlined, PlusCircleOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, MoreOutlined, } from "@ant-design/icons";

import WS2786001_ConditionAddSub from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub.jsx';
import RadiographyFindingInputAction from "redux/InputBusiness/RadiographyFindingInput/RadiographyFindingInput.action";
import moment from "moment";
import WS1860005_RadiographyDoctorInquiry from "./WS1860005_RadiographyDoctorInquiry";
import Color from "constants/Color";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import WS1863001_RadiographyFindingInputSub from "./WS1863001_RadiographyFindingInputSub";
import WS0061015_CheckYesNoNo from "../V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import WS1870011_FindingsHistoryList from "./WS1870011_FindingsHistoryList";
import { history } from "constants/BrowserHistory";

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const label = {
  width: 50,
  marginRight: 5,
  textAlign: "right",
  color: '#14468C',
  fontWeight: 500
}

let today = moment(new Date());
class WS1860001_RadiographyFindingInput extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_OptionType: PropTypes.any,
    Li_OptionCode: PropTypes.any,
    Li_OptionItem: PropTypes.any,
    Li_MenuOption: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '読影所見入力';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingPage: false,
      isLoadingTable: false,
      dataSource: [],
      selectRow: {},
      selectedRowKeys: [],
      indexTable: 0,
      isAddBtn: false,

      Expression_179: 163,

      stsDoctors: false,
      colorName: 208,
      UserName: '',
      UserNameDiff: '',
      changeData: false,
    };
  }

  componentDidMount() {
    this.getDataScreen();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataScreen();
    }
  }

  componentWillUnmount = () => {
    this.movePage();
  };

  movePage = history.block((targetLocation) => {
    if (this.state.changeData) {
      Modal.confirm({
        width: 300,
        content: "更新を実行しますか",
        onOk: () => {
          this.updateData(false, true, targetLocation);
        },
        onCancel: () => {
          this.setState({ changeData: false },
            () => {
              history.push(targetLocation.pathname);
            });
        },
      });
      return false;
    } else {
      return true;
    }
  });

  getDataScreen() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateFChar: this.formRef.current.getFieldValue('DateFChar')?.format('YYYY/MM/DD')
    }
    this.setState({ isLoadingPage: true })
    RadiographyFindingInputAction.getDataScreen(params)
      .then(res => {
        let data = res ?
          {
            ...res.data,
            DateFChar: res.data.DateFChar ? moment(res.data.DateFChar) : null,
            PeopleNum: res.data.PeopleNum,
          } : {}

        this.formRef.current?.setFieldsValue(data)
        this.setState({
          stsDoctors: res?.data?.StsDoctors === 0 ? false : true,
          isLoadingPage: false,
          UserName: res.data.Expression_165,
        })
      })
      .catch((err) => {
        this.setState({ isLoadingPage: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  retrieval(reload) {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateFChar: this.formRef.current.getFieldValue('DateFChar')?.format('YYYY/MM/DD')
    }

    this.setState({ isLoadingTable: true })
    RadiographyFindingInputAction.retrieval(params)
      .then(res => {
        this.formRef.current.setFieldsValue({
          PeopleNum: res?.data?.PeopleNum,
          RadiologistsCodeInternal: res?.data?.RadiologistsCodeInternal
        })
        this.getDataTable(reload)
        this.changeUserName(this.formRef.current?.getFieldValue('Expression_165'), true)
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  getDataTable(reload) {
    this.setState({ isLoadingTable: true })
    let params = {
      InterpretationInspectCode: this.formRef.current?.getFieldValue('InterpretationInspectCode'),
      RadiologistsCodeInternal: this.formRef.current?.getFieldValue('RadiologistsCodeInternal'),
    }
    RadiographyFindingInputAction.getDataTable(params)
      .then(res => {
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
          indexTable: index,
          selectRow: res && res.length > 0 ? res[index] : {},
          selectedRowKeys: res && res.length > 0 ? [res[index].id] : []
        });
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  findIndexByID = (recordID) => {
    return this.state.dataSource.findIndex((item) => recordID === item.id);
  };

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish(values) { }

  eventSelectExpression_48(record) {
    let params = {
      Li_PersonalNum: record.personal_number_id,
      Li_Date: record.visit_date_on,
      Li_AcceptNum: record.receipt_number,
      Li_InterpretationInspectCode: this.formRef.current?.getFieldValue('InterpretationInspectCode'),
      Li_InspectCodeThisTime: record.W1_remark
    }
    RadiographyFindingInputAction.selectExpression_48(params)
      .then(res => {
        if (res?.data?.message === 'Call Screen WS1870011') {
          this.showModalFindingHistory()
        }
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  checkUpdateSub(record) {
    if (record.Expression_46) {
      Modal.warning({
        width: 300,
        icon: <WarningOutlined />,
        title: '入力済の所見があります'
      })
    } else {
      this.updateSubEvent(record)
    }
  }

  updateSubEvent(record) {
    let params = {
      Li_PublicName: "所見なし",
      W1_reserve_num: record.W1_reserve_num,
      Li_InterpretationInspectItemCode: this.formRef.current?.getFieldValue('InterpretationInspectCode'),
      Li_DoctorCode: this.formRef.current?.getFieldValue('RadiologistsCodeScreen'),
      visit_course: record.visit_course,
      W1_remark: record.W1_remark
    }
    this.setState({ isLoadingTable: true })
    RadiographyFindingInputAction.updateSubEvent(params)
      .then(res => {
        this.getDataTable(false)
        this.setState({
          changeData: true
        })
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  deleteSubEvent(record) {
    let params = {
      Li_PublicName: "削除",
      W1_reserve_num: record.W1_reserve_num,
      Li_InterpretationInspectItemCode: this.formRef.current?.getFieldValue('InterpretationInspectCode'),
      Li_DoctorCode: this.formRef.current?.getFieldValue('RadiologistsCodeScreen')
    }
    this.setState({ isLoadingTable: true })
    RadiographyFindingInputAction.deleteSubEvent(params)
      .then(res => {
        this.getDataTable(false)
        this.setState({
          changeData: true
        })
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  updateDataEvent = (search) => {
    Modal.confirm({
      width: 300,
      title: '更新を実行しますか',
      onOk: () => {
        this.updateData(search)
      },
      onCancel: () => {
        if (search) {
          this.setState({
            changeData: false
          })
          this.retrieval(true)
        }
      }
    })
  }

  updateData(search, move, targetLocation) {
    let params = {
      Li_PublicName: "更新",
      StsNoUpdateButton: true,
      StsConsultHistoryDisplay: this.formRef.current?.getFieldValue('StsConsultHistoryDisplay')
    }

    RadiographyFindingInputAction.updateData(params)
      .then(res => {
        this.setState({
          changeData: false
        },
          () => {
            if (move) {
              history.push(targetLocation.pathname);
            } else {
              this.retrieval(search)
            }
          }
        )
        message.success("更新成功");
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  imageDisplayEvent() { }

  showModalConFirmDelete(record) {
    this.setState({
      ...this.state,
      childModal: {
        width: 300,
        visible: true,
        component: (
          <WS0061015_CheckYesNoNo
            Li_Message={'内容を削除しますか？'}
            onFinishScreen={(output) => {
              if (output.Lio_StsReturn) {
                this.deleteSubEvent(record)
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  showModalFindingHistory() {
    this.setState({
      ...this.state,
      childModal: {
        width: "80%",
        visible: true,
        component: (
          <WS1870011_FindingsHistoryList
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  showModalRadiographyFindingInputSub_1863001(record) {
    this.setState({
      ...this.state,
      childModal: {
        width: "90%",
        visible: true,
        component: (
          <WS1863001_RadiographyFindingInputSub
            Li_MenuOption={this.props.Li_MenuOption}
            Li_CourseLevel={record.W1_course_level}
            Li_ReserveNum={record.W1_reserve_num}
            Li_InterpretationInspectCode={this.formRef.current?.getFieldValue('InterpretationInspectCode')}
            Li_Modality={''}
            Li_DoctorCode={this.formRef.current?.getFieldValue('RadiologistsCodeScreen')}
            Li_InspectCode={record.W1_remark}
            Li_StsDoctors={this.state.stsDoctors ? 1 : 0}
            onFinishScreen={() => {
              this.getDataTable(false)
              this.setState({
                changeData: true
              })
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  changeUserName(UserName, loadData) {
    let RadiologistsCodeScreen = this.formRef.current?.getFieldValue('RadiologistsCodeScreen')
    let RadiologistsCodeInternal = this.formRef.current?.getFieldValue('RadiologistsCodeInternal')

    if (!RadiologistsCodeInternal || RadiologistsCodeScreen === RadiologistsCodeInternal) {
      this.setState({
        colorName: 208,
        UserName: UserName,
        UserNameDiff: ''
      })
    } else {
      this.setState({
        colorName: 209,
        UserName: UserName,
        UserNameDiff: '※一覧の内容と異なります'
      })
    }

    if (loadData) {
      this.formRef.current?.setFieldsValue({
        Expression_165: UserName
      })
    }
  }

  render() {
    return (
      <div className="radiography-finding-input">
        <Card title="読影所見入力">
          <Spin spinning={this.state.isLoadingPage}>
            <Space>
              <Button disabled={Object.keys(this.state.selectRow).length === 0}
                onClick={() => {
                  this.showModalConFirmDelete(this.state.selectRow)
                }}
              >削除</Button>
              <Button disabled={Object.keys(this.state.selectRow).length === 0}
                onClick={() => {
                  this.showModalRadiographyFindingInputSub_1863001(this.state.selectRow)
                }}
              >所見あり</Button>
              <Button disabled={Object.keys(this.state.selectRow).length === 0}
                onClick={() => {
                  this.checkUpdateSub(this.state.selectRow)
                }}
              >
                所見なし
              </Button>

              {/* <Button disabled={Object.keys(this.state.selectRow).length === 0}
                onClick={() => {
                  this.imageDisplayEvent()
                }}
              >画像表示</Button> */}

              <Button disabled={Object.keys(this.state.selectRow).length === 0 || !this.state.changeData}
                onClick={() => {
                  this.updateDataEvent(false)
                }}
              >更新</Button>
            </Space>
            <hr style={{ margin: '15px 0' }} />
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{
                DateFChar: today
              }}
            >
              <div hidden>
                <Form.Item name="DateFDate"><Input /></Form.Item>
                <Form.Item name="DateTDate"><Input /></Form.Item>
                <Form.Item name="DateTChar"><Input /></Form.Item>
                <Form.Item name="BranchStoreCodeF"><Input /></Form.Item>
                <Form.Item name="BranchStoreCodeT"><Input /></Form.Item>
                <Form.Item name="CourseCodeF"><Input /></Form.Item>
                <Form.Item name="CourseCodeT"><Input /></Form.Item>
                <Form.Item name="ReceiptNumF"><Input /></Form.Item>
                <Form.Item name="ReceiptNumT"><Input /></Form.Item>
                <Form.Item name="OfficeCode"><Input /></Form.Item>
                <Form.Item name="PersonalNum"><Input /></Form.Item>
                <Form.Item name="KeyInfo"><Input /></Form.Item>
                <Form.Item name="StateFlag"><Input /></Form.Item>
                <Form.Item name="StsNoUpdateButton"><Input /></Form.Item>
                <Form.Item name="StsConsultHistoryDisplay"><Input /></Form.Item>
                <Form.Item name="DataSourceName"><Input /></Form.Item>
                <Form.Item name="InterpretationInspectCode"><Input /></Form.Item>
                <Form.Item name="StsAllExamineesDisplayMop"><Input /></Form.Item>
                <Form.Item name="RadiologistsCodeInternal"><Input /></Form.Item>
              </div>

              <Row gutter={24} style={{ marginBottom: 20 }}>
                <Col span={20}>
                  <Row>
                    <label style={label}>受診日</label>
                    <Form.Item name="DateFChar" >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={true} style={{ width: 120 }} />
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={label}>読影者</label>
                    <Form.Item name="RadiologistsCodeScreen" >
                      {this.state.stsDoctors ?
                        <Input style={{ background: 'transparent', border: 'none' }} readOnly />
                        :
                        <Input.Search
                          style={{ width: 120, marginRight: 5 }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 600,
                                component: (
                                  <WS1860005_RadiographyDoctorInquiry
                                    Lio_DoctorCode={this.formRef.current?.getFieldValue('RadiologistsCodeScreen')}
                                    onFinishScreen={({ Lio_DoctorCode, Lio_UserName }) => {
                                      this.formRef.current?.setFieldsValue({
                                        RadiologistsCodeScreen: Lio_DoctorCode,
                                        Expression_165: Lio_UserName
                                      })
                                      this.closeModal()
                                      this.changeUserName(Lio_UserName, false)
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          onChange={() => {
                            this.formRef.current?.setFieldsValue({
                              Expression_165: ''
                            })
                            this.changeUserName('', false)
                          }}
                        />
                      }
                    </Form.Item>
                    <Form.Item name="Expression_165" style={{ width: 'calc(100% - 220px)' }}>
                      <span style={{ color: Color(this.state.colorName).Foreground, marginLeft: 10 }}>
                        <span style={{ marginRight: 10 }}>{this.state.UserName}</span>
                        <span>{this.state.UserNameDiff}</span>
                      </span>
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={label}>検索</label>
                    <Form.Item name="Search"  {...grid} style={{ width: 250, float: 'left' }}>
                      <Input type="text" />
                    </Form.Item>
                    <Space style={{ width: 180, float: "right" }}>
                      <Button
                        style={{ marginRight: "10px", color: Color(this.state.Expression_179).Foreground }}
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
                                  Li_State={1}
                                  onFinishScreen={(output) => {
                                    if (output.recordData) {
                                      this.setState({ isAddBtn: true })
                                      this.formRef.current.setFieldsValue({
                                        DateTChar: output.recordData.DateFChar,
                                        CourseCodeF: output.recordData.CourseCodeF ? output.recordData.CourseCodeF : '',
                                        CourseCodeT: output.recordData.CourseCodeT ? output.recordData.CourseCodeT : '',
                                        ReceiptNumF: output.recordData.ReceiptNumF ? output.recordData.ReceiptNumF : '',
                                        ReceiptNumT: output.recordData.ReceiptNumT ? output.recordData.ReceiptNumT : '',
                                        OfficeCode: output.recordData.OfficeCode ? output.recordData.OfficeCode : '',
                                        BranchStoreCodeF: output.recordData.BranchStoreCode ? output.recordData.BranchStoreCode : '',
                                        KeyInfo: output.recordData.Lio_KeyInfo ? output.recordData.Lio_KeyInfo : '',
                                        StateFlag: output.recordData.StateFlag ? output.recordData.StateFlag : '',
                                        PersonalNum: output.recordData.PersonalNum ? output.recordData.PersonalNum : '',
                                      })
                                    } else {
                                      this.formRef.current.setFieldsValue({
                                        KeyInfo: output.Lio_KeyInfo ? output.Lio_KeyInfo : '',
                                      })
                                      this.setState({ isAddBtn: false })
                                    }
                                    this.setState({
                                      Expression_179: output.Expression_36
                                    })
                                    this.closeModal()
                                  }}
                                />
                              ,
                            },
                          });
                        }}
                      ><PlusCircleOutlined />条件追加</Button>
                      <Button
                        style={{ color: Color(163).Foreground }}
                        onClick={() => {
                          if (this.state.changeData) {
                            this.updateDataEvent(true)
                          } else {
                            this.retrieval(true)
                          }
                        }}
                      ><SearchOutlined />検　　索</Button>
                    </Space>
                  </Row>
                </Col>
                <Col span={4} style={{ textAlign: 'right', alignSelf: 'flex-end', paddingRight: 30 }}>
                  <span>{(this.formRef.current?.getFieldValue('PeopleNum') && this.formRef.current?.getFieldValue('PeopleNum')) > 0 ? (this.formRef.current?.getFieldValue('PeopleNum') + '人') : null} </span>
                </Col>
              </Row>
            </Form>

            <Table
              size='small'
              style={{ cursor: 'pointer' }}
              rowClassName={(record, index) => record.id === this.state.selectRow?.id ? 'table-row-light' : ''}
              loading={this.state.isLoadingTable}
              dataSource={this.state.dataSource}
              pagination={true}
              bordered
              rowKey={record => record.id}
              scroll={{ x: 1030 }}
              onRow={(record, rowIndex) => {
                let index = this.findIndexByID(record.id)
                return {
                  onClick: async () => {
                    this.setState({
                      selectRow: record,
                      selectedRowKey: [record.id],
                      indexTable: index
                    });
                  }
                }
              }}
            >
              <Table.Column title="受付No" dataIndex="receipt_number" width={70}
                render={(value, record, index) => {
                  return (
                    <Tooltip title={record.Expression_67}>
                      <div style={{ textAlign: 'right' }}>{record.W1_reserve_num ? value === 0 ? '' : value : ''}</div>
                    </Tooltip>
                  )
                }} />
              <Table.Column title="個人番号" dataIndex="personal_number_id" width={70}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{record.W1_reserve_num ? value === 0 ? '' : value : ''}</div>
                  )
                }} />
              <Table.Column title="ﾒﾓ" dataIndex="importance" width={40} align='center'
                render={(value, record, index) => {
                  let icon = null;
                  switch (record.importance) {
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
                    <div>
                      {
                        record.personal_number_id ?
                          <div style={{ cursor: 'pointer' }}
                            onClick={() => {
                              let title = '個人情報照会SUB' + ' [' + record.personal_number_id + ']'
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '90%',
                                  component: (
                                    <Card title={title}>
                                      <WS2584019_PersonalInfoInquirySub
                                        Li_PersonalNum={record.personal_number_id}
                                      />
                                    </Card>
                                  ),
                                },
                              });
                            }} >{icon}
                          </div>
                          : ''
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="カナ氏名" dataIndex="Expression_12" />
              <Table.Column title="氏名" dataIndex="Expression_13" />
              <Table.Column title="生年月日" dataIndex="Expression_14" width={85} align='center'
                render={(value, record, index) => {
                  return (
                    <div>{moment(value).format('NNy/MM/DD')}</div>
                  )
                }}
              />
              <Table.Column title="年齢" dataIndex="Expression_15" width={60} align='center'
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{record.W1_reserve_num ? value === 0 ? '' : value : ''}</div>
                  )
                }} />
              <Table.Column title="性別" dataIndex="Expression_16" width={60} align='center'
                render={(value, record, index) => {
                  return (
                    <div style={{ background: Color(record.Expression_27)?.Background, color: Color(record.Expression_27)?.Foreground }}>
                      {record.W1_reserve_num ? value : ''}
                    </div>
                  )
                }} />
              <Table.Column title="入力" dataIndex="Expression_66" width={40} align='center'
                render={(value, record, index) => {
                  return (
                    <div style={{ color: Color(209).Foreground }}>{value}
                    </div>
                  )
                }}
              />
              <Table.Column title="判定" dataIndex="W1_judge" width={50} align='center'
                render={(value, record, index) => {
                  return (
                    <div style={{ fontWeight: record.Expression_47 === 28 ? 'bold' : '' }}>{value}
                    </div>
                  )
                }} />
              <Table.Column title="今回所見" dataIndex="Expression_46"
                render={(value, record, index) => {
                  let titles = record?.Expression_50?.replaceAll('\n', '<br/>').replaceAll(',', '');
                  return (
                    <Tooltip title={<div dangerouslySetInnerHTML={{ __html: titles }} />}>
                      <div style={{ fontWeight: record.Expression_47 === 28 ? 'bold' : '' }}>
                        {record.W1_reserve_num ? value : ''}
                      </div>
                    </Tooltip>
                  )
                }} />
              <Table.Column title="前回所見" dataIndex="Expression_48"
                render={(value, record, index) => {
                  return (
                    <Tooltip title={record.Expression_51}>
                      <div onDoubleClick={() => {
                        this.eventSelectExpression_48(record)
                      }}
                      >
                        {record.W1_reserve_num ? value : ''}
                      </div>
                    </Tooltip>
                  )
                }}
              />
              {this.state.stsDoctors ?
                <Table.Column title="技師所見" dataIndex="Expression_49"
                  render={(value, record, index) => {
                    return (
                      <Tooltip title={record.Expression_52}>{value} </Tooltip>
                    )
                  }} />
                : null
              }
              <Table.Column width={40} align='center'
                render={(value, record) => {
                  return (
                    <Dropdown
                      overlay={() => (
                        <Menu>
                          <Menu.Item
                            onClick={() => {
                              this.showModalRadiographyFindingInputSub_1863001(record)
                            }}
                          >
                            所見あり
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              this.checkUpdateSub(record)
                            }}
                          >
                            所見なし
                          </Menu.Item>
                          {/* <Menu.Item
                            onClick={() => {
                              this.imageDisplayEvent()
                            }}
                          >
                            画像表示
                          </Menu.Item> */}
                          <Menu.Item
                            onClick={() => {
                              this.showModalConFirmDelete(record)
                            }}
                          >
                            所見削除
                          </Menu.Item>
                        </Menu>
                      )}
                    >
                      <Button size='small' icon={<MoreOutlined />}></Button>
                    </Dropdown>
                  );
                }}
              />
            </Table>
          </Spin>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1860001_RadiographyFindingInput);
