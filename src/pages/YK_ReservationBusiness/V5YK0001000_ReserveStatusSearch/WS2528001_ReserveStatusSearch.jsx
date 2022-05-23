/* eslint-disable eqeqeq */
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Input,
  Radio,
  Button,
  Select,
  Table,
  Row,
  Col,
  Menu,
  Space,
  message,
  Tooltip,
  Dropdown,
  Modal,
  Spin,
} from "antd";
import {
  PlusCircleFilled,
  MinusCircleFilled,
  MoreOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import ReserveStatusSearchService from "services/ReservationBusiness/ReserveStatusSearch/ReserveStatusSearchService";
import moment from "moment-timezone";
import Color from "constants/Color";

import WS2580001_ScheduleChange from "./WS2580001_ScheduleChange";
import WS2537001_PersonalReserveProcess from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess.jsx";
import WS2529001_HourlyReserveList from "./WS2529001_HourlyReserveList";
import WS2528031_SettingDisplayItem from "./WS2528031_SettingDisplayItem";
import WS1490001_SpecificDatePeopleNumSetting from "pages/SM_SystemMaintenance/V4SM0004000_SpecificDatePeopleNumSetting/WS1490001_SpecificDatePeopleNumSetting";
import WS2528047_DetailsExtract from "./WS2528047_DetailsExtract";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS2577003_CalendarEmptySub from "./WS2577003_CalendarEmptySub";
import WS2532001_GroupBookings from "../V5YK0002000_GroupBookings/WS2532001_GroupBookings";
import WS2535001_FrameReserve from "../V5YK0003000_FrameReserve/WS2535001_FrameReserve";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import WS0650001_DocumentBatchCreateSub from "pages/JZ_AdvancePreparation/V4JZ0102003_DocumentBatchCreate/WS0650001_DocumentBatchCreateSub";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import WS2702007_ReservesDisplayItemSetting from "pages/SM_SystemMaintenance/V4SM0001000_ReservesDisplayItemSetting/WS2702007_ReservesDisplayItemSetting";
import WS0548001_ReservesPersonsBulkUpdate from "./WS0548001_ReservesPersonsBulkUpdate";
import WS1485001_RefPeopleNumSettingInfo from "pages/SM_SystemMaintenance/V4SM0002000_RefPeopleNumSettingInfo/WS1485001_RefPeopleNumSettingInfo";
import WS2531063_DisplayContentChange from "./WS2531063_DisplayContentChange";
import WS0802001_PrintInstruction from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0802001_PrintInstruction";
import { download_file } from "helpers/CommonHelpers";
import { debounce } from "lodash";

const styles = {
  alignCenter: {
    align: "center",
  },
  textAlign: {
    textAlign: "center",
  },
};
class WS2528001_ReserveStatusSearch extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "予約状況検索";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: "",
      },
      dataTitle: {},
      dataShowColumnExamineeList: {},
      screenData: {},
      //Fields search
      YearsChar: "",
      FacilityType: "",
      TimeZone: "",
      PersonsSituation: "",
      WS2528047_DetailsExtract: {
        Lio_OfficeCode: "", // Office_Extract
        Lio_TimeZone: "",  // TimeZone_Extract
        office_kanji_name: "",
      },
      //selected row left table
      selectedRowRecordReserveStatusDisplay: {},
      isCloseModalLoadReserveStatusDisplayAgain: false,
      isCloseModalLoadExamListAgain: false,
      // selected Column
      selectedColumn: {
        num_01: false,
        num_02: false,
        num_03: false,
        num_04: false,
        num_05: false,
        num_06: false,
        num_07: false,
        num_08: false,
        num_09: false,
        num_10: false,
        num_11: false,
        num_12: false,
        num_13: false,
        num_14: false,
        num_15: false,
      },
      num_final: null,

      CourseList: null,
      ExamList: null,
      SelectState: null,

      isLoadingPage: false,
    };
    this.onSearchRecreateDisplay = debounce(this.onSearchRecreateDisplay, 300);
    this.getExamineeList = debounce(this.getExamineeList, 300);
  }
  componentDidMount = () => {
    this.setState({
      WS2577003_CalendarEmptySub: {
        Lio_Date: moment(new Date()).format('YYYY/MM/DD')
      }
    });
    this.getScreenData();
  };

  getScreenData = () => {
    this.setState({ isLoadingPage: true })
    ReserveStatusSearchService.getScreenDataService()
      .then((res) => {
        this.setState({
          screenData: res.data
        });
        this.formRef.current.setFieldsValue({
          ...res.data,
          FacilityType: 1,
          YearsChar: moment(res.data?.YearsDate).isValid()
            ? moment(res.data.YearsDate)
            : moment(),
        });
        this.forceUpdate();
        this.onSearchRecreateDisplay(null, true);
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
  };

  onSearchRecreateDisplay = (isClickReDisplayButton, reload, dateCurrent) => {
    this.setState({
      isLoadingTableLeft: true,
      isLoadingTableRight: true,
      isLoadingPage: true
    });
    const { YearsChar, FacilityType, TimeZone, PersonsSituation } = this.formRef.current.getFieldsValue();

    this.setState({ YearsChar, FacilityType, TimeZone, PersonsSituation });

    if (isClickReDisplayButton) {
      this.formRef.current.setFieldsValue({
        ExamineeList: [],
      });
      this.setState({
        selectedRowRecordReserveStatusDisplay: {
          date: moment(YearsChar).format('YYYY/MM/DD')
        }
      });
      this.forceUpdate();
      this.setState({
        selectedColumn: {
          num_01: false,
          num_02: false,
          num_03: false,
          num_04: false,
          num_05: false,
          num_06: false,
          num_07: false,
          num_08: false,
          num_09: false,
          num_10: false,
          num_11: false,
          num_12: false,
          num_13: false,
          num_14: false,
          num_15: false,
        }
      })
    }

    ReserveStatusSearchService.getRecreateDisplayService({
      YearsChar: moment(YearsChar).format("YYYY/MM/DD"),
      FacilityType,
      TimeZone,
      PersonsSituation,
      OfficeExtract: this.state.WS2528047_DetailsExtract.Lio_OfficeCode,
      TimeZoneExtract: this.state.WS2528047_DetailsExtract.Lio_TimeZone,
    })
      .then(async (res) => {
        let datas = res?.data?.ReserveStatusDisplay?.length > 0 ? res?.data?.ReserveStatusDisplay : {}
        let date = dateCurrent ? moment(dateCurrent).format('YYYY/MM/DD') : reload ? moment(new Date()).format('YYYY/MM/DD') : moment(YearsChar).format('YYYY/MM/DD')

        await this.setState({
          dataTitle: res.data,
          CourseList: "",
          ExamList: "",
          SelectState: "",
          WS2577003_CalendarEmptySub: {
            Lio_Date: date
          },

          selectedRowRecordReserveStatusDisplay: datas.find(x => moment(x.date).format("YYYY/MM/DD") == date)
        });
        this.formRef.current.setFieldsValue({
          ...res.data,
          ReserveStatusDisplay: res.data.ReserveStatusDisplay,
        });
        this.forceUpdate();
        this.onEventDoubleClick(this.state.num_final)
      })
      .catch((err) => {
        this.setState({ isLoadingPage: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTableLeft: false }));
  };

  getExamineeList = ({ date, CourseDisplay = '', InspectDisplay = '' }) => {
    this.setState({
      isLoadingTableRight: true,
      isLoadingPage: true
    });

    ReserveStatusSearchService.getExamineeListService({
      date: moment(date).format("YYYY/MM/DD"),
      CourseDisplay,
      InspectDisplay
    })
      .then((res) => {
        this.setState({
          dataShowColumnExamineeList: res.data,
          isLoadingPage: false,
        });
        this.formRef.current.setFieldsValue({
          ExamineeList: res.data?.ExamineeList,
        });

        this.forceUpdate();
      })
      .catch((err) => {
        this.setState({ isLoadingPage: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({
        isLoadingTableRight: false,
      }));
  };

  ExcelDownload = (date) => {
    ReserveStatusSearchService.ExcelDownloadService({
      date: moment(date).format("YYYY/MM/DD"),
    })
      .then((res) => {
        download_file(res);
        message.success("成功");
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  delete_Exam_User_Action_3A = (record) => {
    ReserveStatusSearchService.delete_Exam_User_Action_3A_Service({
      StsConfirm: true,
      course_level: record.course_level,
      reserve_num: record.reserve_num,
    })
      .then((res) => {
        message.success("成功");

        this.onSearchRecreateDisplay();
        // this.getExamineeList({ date: this.state.selectedRowRecordReserveStatusDisplay?.date });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  onEventDoubleClick = (currentClick) => {
    if (this.state.num_final) {
      this.setState({ isLoadingPage: true })
      let params = {
        Li_DisplayContent: this.state.screenData.DisplayContent,

        SelectState: this.state.SelectState, // State

        date: moment(this.state.selectedRowRecordReserveStatusDisplay.date).format('YYYY/MM/DD'),
        Li_FacilityNum: this.state.FacilityType,

        Li_Ampm: '',

        OfficeExtract: this.state.WS2528047_DetailsExtract?.Lio_OfficeCode || '',
        TimeZoneExtract: this.state.WS2528047_DetailsExtract?.Lio_TimeZone || '',

        MalePersons: this.state.selectedRowRecordReserveStatusDisplay.MalePersons,
        WomanPersons: this.state.selectedRowRecordReserveStatusDisplay.WomanPersons,
        Number_col: currentClick,
        CourseList: this.state.CourseList,
        ExamList: this.state.ExamList,
      }
      ReserveStatusSearchService.DoubleclickService(params)
        .then(res => {
          let newdate = this.state.selectedRowRecordReserveStatusDisplay?.date;
          if (res?.data?.CourseList == "" && res?.data?.ExamList == "") {
            // this.onSearchRecreateDisplay();
            this.onSearchRecreateDisplay(false, false, newdate)
          } else {
            this.setState({
              CourseList: res.data.CourseList,
              ExamList: res.data.ExamList,
              SelectState: res.data.SelectState
            })
            let newparams = {
              date: moment(newdate).format('YYYY/MM/DD'),
              CourseDisplay: res.data.CourseList,
              InspectDisplay: res.data.ExamList,
            }
            this.getExamineeList(newparams)
          }

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
    } else {
      this.getExamineeList({ date: this.state.selectedRowRecordReserveStatusDisplay?.date })
    }
  }

  DoubleClick = async (record, stateChange, currentVal, currentClick) => {
    if (this.state.isLoadingTableRight === false && this.state.selectedRowRecordReserveStatusDisplay.id) {
      await this.setState({
        selectedColumn: { ...this.state.selectedColumn, [stateChange]: !currentVal },
      })
      let check = currentClick < 10 ? '0' : ''
      let num = 'num_' + check + currentClick
      let firstNumKey = Object.keys(this.state.selectedColumn).find(a => this.state.selectedColumn[a] == true)
      let firstNum = firstNumKey ? parseInt(firstNumKey.substring(firstNumKey.length - 2, firstNumKey.length)) : ''

      // Async func
      await this.setState({
        num_final: this.state.selectedColumn[num] ? currentClick : firstNum ? firstNum : '',
        isLoadingPage: true
      });

      // Queue to catch state
      setTimeout(() => {
        this.onEventDoubleClick(this.state.num_final)
      }, 0)
    } else {
      return
    }
  }

  closeModal = () => {
    if (this.state.isCloseModalLoadReserveStatusDisplayAgain) {
      this.onSearchRecreateDisplay();
      this.setState({
        isCloseModalLoadReserveStatusDisplayAgain: false,
      });
    }
    if (this.state.isCloseModalLoadExamListAgain) {
      this.getExamineeList(
        { date: this.state.selectedRowRecordReserveStatusDisplay?.date }
      );
      this.setState({ isCloseModalLoadExamListAgain: false });
    }
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: "",
      },
    });
  };

  render() {
    return (
      <div className="reserve-status-search">
        <Card title="" style={{ paddingTop: 5 }}>
          <Space>
            <Dropdown
              overlay={() => (
                <Menu>
                  <Menu.Item
                    key="settei_1"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "40%",
                          component: (
                            <WS2528031_SettingDisplayItem
                              Lio_CourseList={
                                this.state.WS2528031_SettingDisplayItem
                                  ?.Lio_CourseList
                              }
                              Lio_ExamList={
                                this.state.WS2528031_SettingDisplayItem
                                  ?.Lio_ExamList
                              }
                              onFinishScreen={({
                                Lio_CourseList,
                                Lio_ExamList,
                              }) => {
                                this.setState({
                                  WS2528031_SettingDisplayItem: {
                                    Lio_CourseList,
                                    Lio_ExamList,
                                  },
                                });
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                        isCloseModalLoadReserveStatusDisplayAgain: true,
                      });
                    }}
                  >
                    表示項目切替
                  </Menu.Item>
                  <Menu.Item
                    key="settei_2"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "90%",
                          component: (
                            <WS2702007_ReservesDisplayItemSetting
                              onFinishScreen={({ }) => {
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  >
                    表示項目設定
                  </Menu.Item>
                  <Menu.Item
                    key="settei_3"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 400,
                          component: (
                            <WS0548001_ReservesPersonsBulkUpdate
                              Li_DateF={this.state.YearsChar}
                              Li_DateT={this.state.YearsChar}
                              Li_Facility={this.state.FacilityType}
                              onFinishScreen={({ }) => {
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                        isCloseModalLoadExamListAgain: true,
                      });
                    }}
                  >
                    人数再計算
                  </Menu.Item>
                  <Menu.Item
                    key="settei_4"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "90%",
                          component: (
                            <WS1485001_RefPeopleNumSettingInfo
                              onFinishScreen={({ }) => {
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  >
                    基準人数設定
                  </Menu.Item>
                  <Menu.Item
                    key="settei_5"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "90%",
                          component: (
                            <WS1490001_SpecificDatePeopleNumSetting
                              Li_Date={this.state.YearsChar}
                              Li_Facility={this.state.FacilityType}
                              Li_ManageDivision={""}
                              onFinishScreen={({ }) => {
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  >
                    特定人数設定
                  </Menu.Item>
                  <Menu.Item
                    key="settei_6"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 400,
                          component: (
                            <WS2531063_DisplayContentChange
                              Lio_DisplayContent={
                                this.state.WS2531063_DisplayContentChange
                                  ?.Lio_DisplayContent
                              }
                              onFinishScreen={({ Lio_DisplayContent }) => {
                                this.setState({
                                  WS2531063_DisplayContentChange: {
                                    Lio_DisplayContent: Lio_DisplayContent,
                                  },
                                });
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                        isCloseModalLoadExamListAgain: true,
                      });
                    }}
                  >
                    受診項目設定
                  </Menu.Item>
                </Menu>
              )}
            >
              <Button>&ensp;&ensp;設定&ensp;&ensp;</Button>
            </Dropdown>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 600,
                    component: (
                      <WS2528047_DetailsExtract
                        Lio_OfficeCode={
                          this.state.WS2528047_DetailsExtract?.Lio_OfficeCode
                        }
                        Lio_TimeZone={
                          this.state.WS2528047_DetailsExtract?.Lio_TimeZone
                        }
                        office_kanji_name={
                          this.state.WS2528047_DetailsExtract
                            ?.office_kanji_name
                        }
                        onFinishScreen={({
                          Lio_OfficeCode,
                          Lio_TimeZone,
                          office_kanji_name,
                          Lo_StsEnter,
                        }) => {
                          if (Lo_StsEnter)
                            this.setState({
                              WS2528047_DetailsExtract: {
                                Lio_OfficeCode: Lio_OfficeCode,
                                Lio_TimeZone: Lio_TimeZone,
                                office_kanji_name: office_kanji_name,
                              },
                            });
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                  isCloseModalLoadReserveStatusDisplayAgain: true,
                });
              }}
            >
              詳細抽出
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "90%",
                    component: (
                      <WS0248001_PersonalInfoSearchQuery
                        onFinishScreen={({ Lo_PersonalNumId }) => {
                          this.setState({
                            WS0248001_PersonalInfoSearchQuery: {
                              Lo_PersonalNumId: Lo_PersonalNumId,
                            },
                          });
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              個人情報
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 1024,
                    component: (
                      <WS2577003_CalendarEmptySub
                        Lio_Date={this.state.YearsChar}
                        onFinishScreen={({ Lio_Date }) => {
                          this.setState({
                            WS2577003_CalendarEmptySub: {
                              Lio_Date: Lio_Date,
                            },
                          });
                          this.formRef.current.setFieldsValue({
                            YearsChar: moment(Lio_Date).format('YYYY/MM'),
                          })
                          this.onSearchRecreateDisplay(true,false,Lio_Date);
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              受入状況
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "90%",
                    className: "custom-button-close",
                    component: (
                      <WS2537001_PersonalReserveProcess
                        Li_Date={
                          this.state.selectedRowRecordReserveStatusDisplay
                            ?.date
                        }
                        Li_Child={true}
                        onFinishScreen={({ }) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                  isCloseModalLoadExamListAgain: true,
                  isCloseModalLoadReserveStatusDisplayAgain: true,
                });
              }}
            >
              個人予約
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "90%",
                    component: (
                      <WS2532001_GroupBookings
                        Li_ReserveDate={
                          this.state.selectedRowRecordReserveStatusDisplay
                            ?.date
                        }
                        Li_Way={""}
                        onFinishScreen={({ }) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              団体予約
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "90%",
                    component: (
                      <WS2535001_FrameReserve
                        Li_ReserveDate={
                          this.formRef.current
                            ? this.formRef.current.getFieldValue("YearsChar")
                            : ""
                        }
                        onFinishScreen={({ }) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              枠取予約
            </Button>
          </Space>
          <hr style={{ margin: '8px 0' }} />

          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              TimeZone: "",
              PersonsSituation: 0,
            }}
          >
            <Row>
              <Space>
                <Form.Item name="YearsChar" label="年月">
                  <VenusDatePickerCustom
                    picker="month"
                    format="YYYY年MM月"
                    allowClear={false}
                    onChange={() => this.onSearchRecreateDisplay(true)}
                  />
                </Form.Item>
                <Form.Item name="FacilityType" label="施設">
                  <Select
                    style={{ width: "100px" }}
                    onChange={() => this.onSearchRecreateDisplay(true)}
                  >
                    {this.state.screenData.FacilityType_ComboBox?.map(
                      (item, index) => {
                        return (
                          <Select.Option value={item.LinkedField} key={index}>
                            {item.DisplayedField}
                          </Select.Option>
                        );
                      }
                    )}
                  </Select>
                </Form.Item>
                <Form.Item name="TimeZone" label="時間区分">
                  <Radio.Group
                    onChange={() => this.onSearchRecreateDisplay(true)}
                  >
                    <Radio value={""}>全て</Radio>
                    <Radio value={"AM"}>ＡＭ</Radio>
                    <Radio value={"PM"}>ＰＭ</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="PersonsSituation" label="人数表示">
                  <Radio.Group
                    onChange={() => this.onSearchRecreateDisplay(true)}
                  >
                    <Radio value={0}>実人数</Radio>
                    <Radio value={1}>空状況</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => this.onSearchRecreateDisplay(true)}
                  >
                    再表示
                  </Button>
                </Form.Item>
              </Space>
              <Col
                flex="auto"
                style={{
                  float: "right",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    color: "#0F3278",
                    fontWeight: "bold",
                    cursor: "default",
                    padding: "0 5px",
                  }}
                  type="text"
                >
                  男性&ensp;
                  {this.state.selectedRowRecordReserveStatusDisplay
                    .MalePersons
                    ? this.state.selectedRowRecordReserveStatusDisplay
                      .MalePersons + "人"
                    : ""}
                  &ensp;
                </div>
                <div
                  style={{
                    color: "#B41432",
                    fontWeight: "bold",
                    cursor: "default",
                    padding: "0 5px",
                  }}
                  type="text"
                >
                  女性&ensp;
                  {this.state.selectedRowRecordReserveStatusDisplay
                    .WomanPersons
                    ? this.state.selectedRowRecordReserveStatusDisplay
                      .WomanPersons + "人"
                    : ""}
                  &ensp;
                </div>
              </Col>
            </Row>
          </Form>

          <Row>
            <Col span={14}>
              {/* Table1 */}
              <Table
                className="custom-table-scroll handle-table-calendar"
                size="small"
                dataSource={
                  this.formRef.current
                    ? this.formRef.current.getFieldValue(
                      "ReserveStatusDisplay"
                    )
                    : []
                }
                loading={this.state.isLoadingPage}
                pagination={false}
                bordered={true}
                rowKey={(record) => record.id}
                rowClassName={(record, index) => {
                  let SelectDate = this.state.WS2577003_CalendarEmptySub?.Lio_Date;
                  if (SelectDate !== '' && SelectDate !== null && SelectDate !== undefined) {
                    // Selected Row
                    let selectedDay = parseInt(SelectDate.substring(SelectDate.length - 2, SelectDate.length));
                    return selectedDay == (index + 1) ? "ant-table-row-selected" : ''
                  } else if (this.state.selectedRowRecordReserveStatusDisplay) {
                    // Default 
                    return record.id === this.state.selectedRowRecordReserveStatusDisplay.id
                      ? "ant-table-row-selected"
                      : "";
                  }
                }}
                scroll={{ y: "80vh" }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: async () => {
                      // Check match id return;
                      if (record.date != this.state.selectedRowRecordReserveStatusDisplay.date) {
                        await this.setState({
                          WS2577003_CalendarEmptySub: { Lio_Date: record.date },
                          selectedRowRecordReserveStatusDisplay: record,
                        });
                        // this.getExamineeList({ date: record.date });

                        this.onSearchRecreateDisplay(false, false, record.date)
                      }
                    },
                    style: {
                      backgroundColor: record.Expression_6
                        ? record.Expression_6 === 287 ||
                          record.Expression_6 === 281
                          ? Color(record.Expression_6)?.Background
                          : ""
                        : "",
                    },
                  };
                }}
              >
                <Table.Column
                  title="日"
                  width="50px"
                  dataIndex="Expression_2"
                  {...styles.alignCenter}
                  render={(text, record, index) => {
                    return (
                      <Form.Item
                        style={{
                          marginBottom: "0px",
                        }}
                      >
                        <span
                          style={{
                            color: record.Expression_5
                              ? Color(record.Expression_5)?.Foreground
                              : "",
                          }}
                        >
                          {text + " " + record.Expression_3}
                        </span>
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title="合計人数"
                  dataIndex="total_person"
                  render={(text, record, index) => {
                    return text === "0" || text === 0 ? "" : text;
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title="メモ欄"
                  dataIndex="title"
                  width={200}
                  render={(text, record, index) => {
                    return text === "0" || text === 0 ? (
                      ""
                    ) : (
                      <Row wrap={false}>
                        <Form.Item
                          style={{
                            marginBottom: "0px",
                            width: "150px",
                          }}
                        >
                          <Input
                            style={{
                              cursor: "pointer",
                            }}
                            readOnly
                            value={text}
                            onDoubleClick={() => {
                              if (record.Expression_3 === "数") return;
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 500,
                                  component: (
                                    <WS2580001_ScheduleChange
                                      Li_Date={record.date}
                                      onFinishScreen={({ Lo_StsModify }) => {
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                                isCloseModalLoadReserveStatusDisplayAgain: true,
                              });
                            }}
                          ></Input>
                        </Form.Item>
                        <div
                          style={{ paddingLeft: "10px", textAlign: "right" }}
                        >
                          {record?.Other}
                        </div>
                      </Row>
                    );
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_01;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_01', val, 1);
                      }
                    }
                  }}
                  title={<span>{this.state.dataTitle?.Expression_24}</span>}
                  dataIndex="num_01"
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_01 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_39}>
                            <div
                              style={{
                                color: record.Expression_9
                                  ? Color(record.Expression_9)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_25}</span>}
                  dataIndex="num_02"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_02;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_02', val, 2);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_02 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_39}>
                            <div
                              style={{
                                color: record.Expression_10
                                  ? Color(record.Expression_10)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_03;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_03', val, 3);
                      }
                    }
                  }}
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_26}</span>}
                  dataIndex="num_03"
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_03 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_41}>
                            <div
                              style={{
                                color: record.Expression_11
                                  ? Color(record.Expression_11)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_27}</span>}
                  dataIndex="num_04"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_04;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_04', val, 4);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_04 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_42}>
                            <div
                              style={{
                                color: record.Expression_12
                                  ? Color(record.Expression_12)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_28}</span>}
                  dataIndex="num_05"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_05;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_05', val, 5);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_05 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_43}>
                            <div
                              style={{
                                color: record.Expression_13
                                  ? Color(record.Expression_13)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                {/**
                  Display Fixed
                   */}
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_29}</span>}
                  dataIndex="num_06"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_06;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_06', val, 6);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_06 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_44}>
                            <div
                              style={{
                                color: record.Expression_14
                                  ? Color(record.Expression_14)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_30}</span>}
                  dataIndex="num_07"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_07;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_07', val, 7);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_07 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_45}>
                            <div
                              style={{
                                color: record.Expression_15
                                  ? Color(record.Expression_15)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_31}</span>}
                  dataIndex="num_08"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_08;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_08', val, 8);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_08 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_46}>
                            <div
                              style={{
                                color: record.Expression_16
                                  ? Color(record.Expression_16)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_32}</span>}
                  dataIndex="num_09"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_09;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_09', val, 9);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_09 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_47}>
                            <div
                              style={{
                                color: record.Expression_17
                                  ? Color(record.Expression_17)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_33}</span>}
                  dataIndex="num_10"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_10;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_10', val, 10);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_10 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_48}>
                            <div
                              style={{
                                color: record.Expression_18
                                  ? Color(record.Expression_18)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_34}</span>}
                  dataIndex="num_11"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_11;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_11', val, 11);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_11 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_49}>
                            <div
                              style={{
                                color: record.Expression_19
                                  ? Color(record.Expression_19)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_35}</span>}
                  dataIndex="num_12"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_12;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_12', val, 12);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_12 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_50}>
                            <div
                              style={{
                                color: record.Expression_20
                                  ? Color(record.Expression_20)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_36}</span>}
                  dataIndex="num_13"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_13;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_13', val, 13);
                      }
                    }
                  }}

                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_13 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_51}>
                            <div
                              style={{
                                color: record.Expression_21
                                  ? Color(record.Expression_21)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_37}</span>}
                  dataIndex="num_14"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_14;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_14', val, 14);
                      }
                    }
                  }}
                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_14 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_52}>
                            <div
                              style={{
                                color: record.Expression_22
                                  ? Color(record.Expression_22)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  {...styles.alignCenter}
                  title={<span>{this.state.dataTitle?.Expression_38}</span>}
                  dataIndex="num_15"
                  onCell={(record, index) => {
                    let val = this.state.selectedColumn.num_15;
                    return {
                      onDoubleClick: (e) => {
                        this.DoubleClick(record, 'num_15', val, 15);
                      }
                    }
                  }}

                  render={(text, record, index) => {
                    return {
                      props: {
                        style: { background: this.state.selectedColumn.num_15 ? '#1890ff52' : '' }
                      },
                      children: <>
                        {text === "0" || text === 0 ? '' :
                          <Tooltip title={record.Expression_53}>
                            <div
                              style={{
                                color: record.Expression_23
                                  ? Color(record.Expression_23)?.Foreground
                                  : "",
                              }}
                            >
                              {text}
                            </div>
                          </Tooltip>
                        }
                      </>
                    }
                  }}
                />
                <Table.Column
                  key="action"
                  fixed="right"
                  width={50}
                  render={(text, record, index) => {
                    if (record.Expression_3 === "数") return;
                    return (
                      <Dropdown.Button
                        icon={<MoreOutlined />}
                        size="small"
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              key="1"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 500,
                                    component: (
                                      <WS2580001_ScheduleChange
                                        Li_Date={record.date}
                                        onFinishScreen={({
                                          Lo_StsModify,
                                        }) => {
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                  isCloseModalLoadReserveStatusDisplayAgain: true,
                                });
                              }}
                            >
                              {/* 2580 */}
                              <label>メモ欄</label>
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "90%",
                                    className: "custom-button-close",
                                    component: (
                                      <WS2537001_PersonalReserveProcess
                                        Li_CourseLevel={""}
                                        Li_ReserveNum={""}
                                        Li_PersonalNum={""}
                                        Li_Date={record.date}
                                        Li_Getctxname={""}
                                        Li_ProcessDivision={""}
                                        Li_Option={""}
                                        Li_Child={true}
                                        onFinishScreen={() => {
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                  isCloseModalLoadExamListAgain: true,
                                  isCloseModalLoadReserveStatusDisplayAgain: true,
                                });
                              }}
                            >
                              {/* 2537 */}
                              <label>個人予約</label>
                            </Menu.Item>
                            <Menu.Item
                              key="3"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "90%",
                                    component: (
                                      <WS2529001_HourlyReserveList
                                        Li_Date={record.date}
                                        Li_Facility={this.state.FacilityType}
                                        Li_TimeZoneAm_Pm={this.state.TimeZone}
                                        onFinishScreen={({ }) => {
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              {/* 2529 */}
                              <label>時間別予約一覧</label>
                            </Menu.Item>
                            <Menu.Item
                              key="4"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "40%",
                                    component: (
                                      <WS2528031_SettingDisplayItem
                                        Lio_CourseList={
                                          this.state
                                            .WS2528031_SettingDisplayItem
                                            ?.Lio_CourseList
                                        }
                                        Lio_ExamList={
                                          this.state
                                            .WS2528031_SettingDisplayItem
                                            ?.Lio_ExamList
                                        }
                                        onFinishScreen={({
                                          Lio_CourseList,
                                          Lio_ExamList,
                                        }) => {
                                          this.setState({
                                            WS2528031_SettingDisplayItem: {
                                              Lio_CourseList,
                                              Lio_ExamList,
                                            },
                                          });
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                  isCloseModalLoadReserveStatusDisplayAgain: true,
                                });
                              }}
                            >
                              {/* WS2528031_SettingDisplayItem */}
                              <label>表示設定</label>
                            </Menu.Item>
                            <Menu.Item
                              key="5"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "90%",
                                    component: (
                                      <WS1490001_SpecificDatePeopleNumSetting
                                        Li_Date={record.date}
                                        Li_Facility={this.state.FacilityType}
                                        Li_ManageDivision={""}
                                        onFinishScreen={({ }) => {
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              {/* 232 */}
                              <label>人数枠設定</label>
                            </Menu.Item>
                          </Menu>
                        )}
                      ></Dropdown.Button>
                    );
                  }}
                />

                {/* Table1 */}
              </Table>
            </Col>
            <Col span={10}>
              {/* Table2 */}
              <Table
                size="small"
                className="custom-table-scroll"
                dataSource={
                  this.formRef.current
                    ? this.formRef.current.getFieldValue("ExamineeList")
                    : []
                }
                loading={this.state.isLoadingPage}
                pagination={false}
                bordered
                rowKey={(record) => record.id}
                scroll={{ x: 1000, y: "90vh" }}
                style={{ height: "100%" }}
              >
                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_81
                ) === 1 && (
                    <Table.Column
                      {...styles.alignCenter}
                      width={70}
                      title="時間"
                      dataIndex="period_time"
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_82
                ) === 1 && (
                    <Table.Column
                      title={<div style={{ textAlign: "center" }}>受付No</div>}
                      width={70}
                      dataIndex="receipt_number"
                      align="right"
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_83
                ) === 1 && (
                    <Table.Column
                      {...styles.alignCenter}
                      title="状態"
                      width={70}
                      dataIndex="State"
                      render={(text, record) => {
                        return (
                          <span
                            style={{
                              color: record.Expression_94
                                ? Color(record.Expression_94)?.Foreground
                                : "",
                            }}
                          >
                            {text}
                          </span>
                        );
                      }}
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_84
                ) === 1 && (
                    <Table.Column
                      width={70}
                      title={
                        <div style={{ textAlign: "center" }}>個人番号</div>
                      }
                      align="right"
                      dataIndex="personal_number_id"
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_84
                ) === 1 && (
                    <Table.Column
                      {...styles.alignCenter}
                      title="メモ"
                      dataIndex="Expression_68"
                      width={50}
                      render={(text, record) => {
                        let icon = "";
                        switch (text) {
                          case 1:
                            icon = (
                              <InfoCircleOutlined
                                style={{
                                  color: "#1890ff",
                                }}
                              />
                            );
                            break;
                          case 3:
                            icon = (
                              <WarningOutlined style={{ color: "#faad14" }} />
                            );
                            break;
                          case 5:
                            icon = (
                              <CloseCircleOutlined
                                style={{ color: "#ff4d4f" }}
                              />
                            );
                            break;
                          default:
                            icon = <MoreOutlined />;
                        }
                        return (
                          <Button
                            icon={icon}
                            size="small"
                            onClick={() => {
                              let title = '個人情報照会SUB' + ' [' + record.personal_number_id + ']'
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1500,
                                  component: (
                                    <Card title={title}>
                                      <WS2584019_PersonalInfoInquirySub
                                        Li_PersonalNum={
                                          record.personal_number_id
                                        }
                                      />
                                    </Card>
                                  ),
                                },
                              });
                            }}
                          ></Button>
                        );
                      }}
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_85
                ) === 1 && (
                    <Table.Column
                      {...styles.alignCenter}
                      width={150}
                      title="ｶﾅ氏名"
                      dataIndex="KanaName"
                      align="left"
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_86
                ) === 1 && (
                    <Table.Column
                      {...styles.alignCenter}
                      width={150}
                      title="漢字氏名"
                      dataIndex="KanjiName"
                      align="left"
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_87
                ) === 1 && (
                    <Table.Column
                      {...styles.alignCenter}
                      width={70}
                      title="性別"
                      dataIndex="Gender"
                      render={(text, record, index) => {
                        return (
                          <span
                            style={{
                              color: record.Expression_59
                                ? Color(record.Expression_59)?.Foreground
                                : "",
                            }}
                          >
                            {text}
                          </span>
                        );
                      }}
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_88
                ) === 1 && (
                    <Table.Column
                      title={<div style={{ textAlign: "center" }}>年齢</div>}
                      width={50}
                      align="right"
                      dataIndex="Age"
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_89
                ) === 1 && (
                    <Table.Column
                      {...styles.alignCenter}
                      width={100}
                      title="生年月日"
                      dataIndex="DateOfBirth"
                      render={(text) => <>{moment(text).format("NNy/MM/DD")}</>}
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_90
                ) === 1 && (
                    <Table.Column
                      width={70}
                      title={
                        <div style={{ textAlign: "center" }}>事業所ｺｰﾄﾞ</div>
                      }
                      align="right"
                      dataIndex="office_code"
                    />
                  )}

                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_91
                ) === 1 && (
                    <Table.Column
                      {...styles.alignCenter}
                      width={150}
                      title="事業所名称"
                      dataIndex="office_kanji_name"
                      align="left"
                    />
                  )}
                {parseInt(
                  this.state.dataShowColumnExamineeList?.Expression_92
                ) === 1 && (
                    <>
                      <Table.Column
                        {...styles.alignCenter}
                        title="ｺｰｽ"
                        width={70}
                        dataIndex="visit_course"
                        align="left"
                      />
                      <Table.Column
                        title={
                          <div style={{ textAlign: "center" }}>ｺｰｽ名称</div>
                        }
                        width={150}
                        align="left"
                        dataIndex="contract_short_name"
                      />
                    </>
                  )}

                <Table.Column
                  {...styles.alignCenter}
                  width={50}
                  title={
                    <div style={{ ...styles.textAlign }}>
                      {<PlusCircleFilled style={{ color: "#FFC001" }} />}
                    </div>
                  }
                  dataIndex="Expression_78"
                />
                <Table.Column
                  {...styles.alignCenter}
                  width={50}
                  title={
                    <div style={{ ...styles.textAlign }}>
                      <PlusCircleFilled style={{ color: "#0000FF" }} />
                    </div>
                  }
                  dataIndex="Expression_79"
                />
                <Table.Column
                  {...styles.alignCenter}
                  width={50}
                  title={
                    <div style={{ ...styles.textAlign }}>
                      <MinusCircleFilled style={{ color: "#FF0000" }} />
                    </div>
                  }
                  dataIndex="Expression_80"
                />
                <Table.Column
                  key="action"
                  fixed="right"
                  width={50}
                  render={(text, record, index) => {
                    return (
                      <Dropdown.Button
                        icon={<MoreOutlined />}
                        size="small"
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              key="1"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "90%",
                                    component: (
                                      <WS2583001_ConsultInquirySub
                                        Li_ReserveNum={record.reserve_num}
                                        onFinishScreen={({ }) => {
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              {/* 2583 */}
                              <label>照合</label>
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "90%",
                                    className: "custom-button-close",
                                    component: (
                                      <WS2537001_PersonalReserveProcess
                                        Li_CourseLevel={record.course_level}
                                        Li_ReserveNum={record.reserve_num}
                                        Li_PersonalNum={
                                          record.personal_number_id
                                        }
                                        Li_Date={
                                          this.state
                                            .selectedRowRecordReserveStatusDisplay
                                            ?.date
                                        }
                                        Li_Getctxname={""}
                                        Li_ProcessDivision={""}
                                        Li_Option={""}
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
                              {/* 2537 */}
                              <label>変更</label>
                            </Menu.Item>
                            <Menu.Item
                              key="3"
                              hidden={record.state_flag === 1}
                              onClick={() => {
                                Modal.confirm({
                                  title: "確認",
                                  icon: (
                                    <QuestionCircleOutlined
                                      style={{ color: "#1890ff" }}
                                    />
                                  ),
                                  content: "予約を削除しますか？",
                                  okText: "削除",
                                  cancelText: "いいえ",
                                  okText: "はい",
                                  onOk: () => {
                                    this.delete_Exam_User_Action_3A(record);
                                  },
                                });
                              }}
                            >
                              {/* Delete */}
                              <label>削除</label>
                            </Menu.Item>
                            <Menu.Item
                              key="4"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "40%",
                                    component: (
                                      <WS0650001_DocumentBatchCreateSub
                                        Li_CourseLevel={record.course_level}
                                        Li_ReserveNum={record.reserve_num}
                                        onFinishScreen={({ }) => {
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              {/* WS0650001*/}
                              <label>予約関連</label>
                            </Menu.Item>
                            <Menu.Item
                              key="5"
                              hidden={record.state_flag === 0}
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "40%",
                                    component: (
                                      <WS0802001_PrintInstruction
                                        Li_CourseLevel={record.course_level}
                                        Li_ReserveNum={record.reserve_num}
                                        onFinishScreen={({ }) => {
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              {/* WS0802001*/}
                              <label>結果印刷</label>
                            </Menu.Item>
                            <Menu.Item
                              key="6"
                              onClick={() => {
                                this.ExcelDownload(
                                  this.state
                                    .selectedRowRecordReserveStatusDisplay
                                    ?.date
                                );
                              }}
                            >
                              {/* 232 */}
                              <label>EXCEL</label>
                            </Menu.Item>
                          </Menu>
                        )}
                      ></Dropdown.Button>
                    );
                  }}
                />
                {/* Table2 */}
              </Table>
            </Col>
          </Row>
        </Card>
        <ModalDraggable
          className={this.state.childModal.className}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          destroyOnClose={true}
          onCancel={() => {
            this.closeModal();
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
)(WS2528001_ReserveStatusSearch);
