import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Row, Table, Input, Modal, Tooltip, Space, Button, Spin, message } from "antd";

import { SaveOutlined } from '@ant-design/icons';

import WS0343001_PersonalInfoMaintain from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0343001_PersonalInfoMaintain.jsx';
import Color from "constants/Color";
import WS0274001_InspectCmtSearchQuery from "../V4IN0101000_SpreadInput/WS0274001_InspectCmtSearchQuery";
import WS0739012_DataUpdateConfirm from "./WS0739012_DataUpdateConfirm";
import WS0729001_FindingsInputRadiography from "../V4IN0101000_SpreadInput/WS0729001_FindingsInputRadiography";
import WS0730001_FindingsInputPhysiciiagnosis from "../V4IN0101000_SpreadInput/WS0730001_FindingsInputPhysiciiagnosis";
import WS0731001_FindingsInputNormalSelect from "../V4IN0101000_SpreadInput/WS0731001_FindingsInputNormalSelect";
import WS0728001_FindingsInputNormal from "../V4IN0101000_SpreadInput/WS0728001_FindingsInputNormal";
import WS0285001_JudgeQuery from "pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery";
import InputVoteResultInputInspectInputAction from "redux/InputBusiness/NotInputCheckCategory/InputVoteResultInputInspectInput.action";

const customStyle = {
  labelStyle: {
    fontWeight: 'bold',
    color: '#14468C',
    width: 70,
    paddingRight: 8,
    textAlign: 'right'
  }
}
class WS0739001_InputVoteResultInputInspectInput extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_CourseLevelThisTime: PropTypes.any,
    Li_ReserveNumThisTime: PropTypes.any,
    Li_CourseLevelPrevious: PropTypes.any,
    Li_ReserveNumPrevious: PropTypes.any,
    Li_PublicName: PropTypes.any,
    Li_GuidanceInstructionsAdd: PropTypes.any,
    Li_InputProtectionIn: PropTypes.any,
    Li_InputProtectionImage: PropTypes.any,
    Li_EscInvalid: PropTypes.any,
    Lo_After_Update: PropTypes.any,

    onFinishScreen: PropTypes.func
  };

  constructor(props) {
    super(props);

    // document.title = '入力票結果入力 (検査入力)';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingPage: true,

      dataSource: [],
      isLoadingTable: false,
      selectedRowKeys: [],
      rowSelected: {},
      indexTable: 0,


      dataScreen: {},

      Expression_12: '',
      StsInspectCmtInfo: false,

      Update: false,

      dataFindings: {},

      updateData: false,
      paramsUpdate: {},
    };
  }

  componentDidMount() {
    this.getDataScreen(true)
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getDataScreen(true)
    }
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  getDataScreen(reload) {
    let params = {
      Li_ReserveNumThisTime: this.isEmpty(this.props.Li_ReserveNumThisTime) ? '' : this.props.Li_ReserveNumThisTime,
    }
    this.setState({ isLoadingTable: this.state.isLoadingPage ? false : true })
    InputVoteResultInputInspectInputAction.getDataScreen(params)
      .then((res) => {
        this.getScreenDataTable(true)
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  getScreenDataTable(reload) {
    let params = {
      Li_CourseLevelThisTime: this.isEmpty(this.props.Li_CourseLevelThisTime) ? '' : this.props.Li_CourseLevelThisTime,
      Li_ReserveNumThisTime: this.isEmpty(this.props.Li_ReserveNumThisTime) ? '' : this.props.Li_ReserveNumThisTime,
      Li_CourseLevelPrevious: this.isEmpty(this.props.Li_CourseLevelPrevious) ? '' : this.props.Li_CourseLevelPrevious,
      Li_ReserveNumPrevious: this.isEmpty(this.props.Li_ReserveNumPrevious) ? '' : this.props.Li_ReserveNumPrevious,
      Li_PublicName: this.isEmpty(this.props.Li_PublicName) ? '' : this.props.Li_PublicName,
      Li_InputProtectionImage: this.isEmpty(this.props.Li_InputProtectionImage) ? '' : this.props.Li_InputProtectionImage,
    }
    this.setState({ isLoadingTable: this.state.isLoadingPage ? false : true })
    InputVoteResultInputInspectInputAction.index(params)
      .then((res) => {
        let data = res ? res.Reusult_w1TestResults : []
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data,
          isLoadingTable: false,
          isLoadingPage: false,

          rowSelected: data.length > 0 ? data[index] : {},
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,

          dataScreen: res ? res : {},
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  showModalInspectCmtSearchQuery_274(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 850,
        component:
          <WS0274001_InspectCmtSearchQuery
            Lio_CmtClassify={record.exam_comment_code}
            LnkOutInspectCmtScreen={record.W1_result_val}
            onFinishScreen={(output) => {
              this.updateDatasource(this.findIndexByID(record.id), "W1_result_val", output.LnkOutInspectCmtScreen);
              this.updateDatasource(this.findIndexByID(record.id), "exam_comment_code", output.Lio_CmtClassify);
              this.updateDatasource(this.findIndexByID(record.id), "W1_inspect_judge", '');
              this.updateDatasource(this.findIndexByID(record.id), "Expression_59", 32)
              this.updateDatasource(this.findIndexByID(record.id), "Expression_34", output.LnkOutInspectCmtScreen ? true : false)
              this.findingsEditingAfter274(record)
              this.closeModal()
            }}
          />
        ,
      },
    });
  }

  showModalFindingsInputNomal_728(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component:
          <WS0728001_FindingsInputNormal
            Li_CourseLevel={this.state.dataFindings.Li_CourseLevel}
            Li_ReserveNum={this.state.dataFindings.Li_ReserveNum}
            Li_InspectCode={this.state.dataFindings.Li_InspectCode}
            Li_PatternCode={this.state.dataFindings.Li_PatternCode}
            Li_CategoryCode={this.state.dataFindings.Li_CategoryCode}
            Li_PersonalNum={this.state.dataFindings.Li_PersonalNum}
            Li_JudgeLevel={this.state.dataFindings.Li_JudgeLevel}
            Li_LastTimeInitialDisplay={this.state.dataFindings.Li_LastTimeInitialDisplay}
            Li_LeadershipMattersHowToAdd={this.state.dataFindings.Li_LeadershipMattersHowToAdd}
            Lio_FindingsCategoryChange={this.state.dataFindings.Lio_FindingsCategoryChange}
            Lio_GuidanceAndAttentionChange={this.state.dataFindings.Lio_GuideAndAttentionChange}
            Li_FindingsInputNumRows={this.state.dataFindings.Li_FindingsInputNumRows}
            Li_FindingsInputNumDigits={this.state.dataFindings.Li_FindingsInputNumDigits}
            Li_SerialNumAdded={this.state.dataFindings.Li_SerialNumAdded}
            onFinishScreen={(output) => {
              if (output.Lio_FindingsCategoryChange) {
                this.findingsEditingAfter(record)
              }

              if (output.close) {
                this.closeModal()
              }
            }}
          />
        ,
      },
    });
  }

  showModalFindingsInputRadiography_729(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component:
          <WS0729001_FindingsInputRadiography
            Li_CourseLevel={this.state.dataFindings.Li_CourseLevel}
            Li_ReserveNum={this.state.dataFindings.Li_ReserveNum}
            Li_InspectCode={this.state.dataFindings.Li_InspectCode}
            Li_PatternCode={this.state.dataFindings.Li_PatternCode}
            Li_CategoryCode={this.state.dataFindings.Li_CategoryCode}
            Li_PersonalNum={this.state.dataFindings.Li_PersonalNum}
            Li_JudgeLevel={this.state.dataFindings.Li_JudgeLevel}
            Li_LastTimeInitialDisplay={this.state.dataFindings.Li_LastTimeInitialDisplay}
            Li_LeadershipMattersHowToAdd={this.state.dataFindings.Li_LeadershipMattersHowToAdd}
            Lio_FindingsCategoryChange={this.state.dataFindings.Lio_FindingsCategoryChange}
            Lio_GuidanceAndAttentionChange={this.state.dataFindings.Lio_GuideAndAttentionChange}
            Li_FindingsInputNumRows={this.state.dataFindings.Li_FindingsInputNumRows}
            Li_FindingsInputNumDigits={this.state.dataFindings.Li_FindingsInputNumDigits}
            Li_SerialNumAdded={this.state.dataFindings.Li_SerialNumAdded}
            onFinishScreen={(output) => {
              if (output.Lio_FindingsCategoryChange) {
                this.findingsEditingAfter(record)
              }

              if (output.close) {
                this.closeModal()
              }
            }}
          />
        ,
      },
    });
  }

  showModalFindingsInputPhysiciiagnos_730(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component:
          <WS0730001_FindingsInputPhysiciiagnosis
            Li_CourseLevel={this.state.dataFindings.Li_CourseLevel}
            Li_ReserveNum={this.state.dataFindings.Li_ReserveNum}
            Li_InspectCode={this.state.dataFindings.Li_InspectCode}
            Li_PatternCode={this.state.dataFindings.Li_PatternCode}
            Li_CategoryCode={this.state.dataFindings.Li_CategoryCode}
            Li_PersonalNum={this.state.dataFindings.Li_PersonalNum}
            Li_JudgeLevel={this.state.dataFindings.Li_JudgeLevel}
            Li_LastTimeInitialDisplay={this.state.dataFindings.Li_LastTimeInitialDisplay}
            Li_LeadershipMattersHowToAdd={this.state.dataFindings.Li_LeadershipMattersHowToAdd}
            Lio_FindingsCategoryChange={this.state.dataFindings.Lio_FindingsCategoryChange}
            Lio_GuidanceAndAttentionChange={this.state.dataFindings.Lio_GuideAndAttentionChange}
            Li_FindingsInputLimit={this.state.dataFindings.Li_FindingsInputNumRows}
            onFinishScreen={(output) => {
              if (output.Lio_FindingsCategoryChange) {
                this.findingsEditingAfter(record)
              }

              if (output.close) {
                this.closeModal()
              }
            }}
          />
        ,
      },
    });
  }

  showModalFindingsInputNomalSelect_731(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component:
          <WS0731001_FindingsInputNormalSelect
            Li_CourseLevel={this.state.dataFindings.Li_CourseLevel}
            Li_ReserveNum={this.state.dataFindings.Li_ReserveNum}
            Li_InspectCode={this.state.dataFindings.Li_InspectCode}
            Li_PatternCode={this.state.dataFindings.Li_PatternCode}
            Li_CategoryCode={this.state.dataFindings.Li_CategoryCode}
            Li_PersonalNum={this.state.dataFindings.Li_PersonalNum}
            Li_JudgeLevel={this.state.dataFindings.Li_JudgeLevel}
            _Li_LastTimeInitialDisplay={this.state.dataFindings.Li_LastTimeInitialDisplay}
            _Li_LeadershipMattersHowToAdd={this.state.dataFindings.Li_LeadershipMattersHowToAdd}
            Lio_FindingsCategoryChange={this.state.dataFindings.Lio_FindingsCategoryChange}
            _Lio_GuideAndAttentionChange={this.state.dataFindings.Lio_GuideAndAttentionChange}
            Li_FindingsInputNumRows={this.state.dataFindings.Li_FindingsInputNumRows}
            Li_FindingsInputNumDigits={this.state.dataFindings.Li_FindingsInputNumDigits}
            Li_SerialNumAdded={this.state.dataFindings.Li_SerialNumAdded}
            onFinishScreen={(output) => {
              if (output.Lio_FindingsCategoryChange) {
                this.findingsEditingAfter(record)
              }

              if (output.close) {
                this.closeModal()
              }
            }}
          />
        ,
      },
    });
  }

  ControlPreffit(record, isDbClick) {
    let params = {
      ...record,
      Li_ReserveNumThisTime: this.props.Li_ReserveNumThisTime,
      Li_CourseLevelThisTime: this.props.Li_CourseLevelThisTime
    }
    InputVoteResultInputInspectInputAction.controlpreffit(params)
      .then((res) => {
        if (res?.data?.W1_result_val) {
          this.updateDatasource(this.findIndexByID(record.id), "W1_result_val", res?.data?.W1_result_val)
          this.updateDatasource(this.findIndexByID(record.id), "Expression_59", 32)
          this.updateDatasource(this.findIndexByID(record.id), "Expression_34", false)
          this.updateDatasource(this.findIndexByID(record.id), "Expression_32", false)
        } else {
          if (isDbClick
            && ((record.W1_classific === 'K' && record.StsInspectCmtInfo && (record.exam_type.charAt(0) === 'X' || record.exam_type.charAt(0) === 'J'))
              || record.W1_classific === 'S')) {
            this.findingsEditing(record)
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
      });
  }

  findingsEditing(record) {
    let params = {
      W1_inspect_item_display_num: record.W1_inspect_item_display_num,
      W1_inspect_cd: record.W1_inspect_cd,
      W1_sect_display_num: record.W1_sect_display_num,
      W1_category_cd: record.W1_category_cd,
      pattern_code: record.pattern_code,
      judgment_level_division: record.judgment_level_division,
      personal_number_id: this.state.dataScreen.personal_number_id,
      Li_ReserveNumThisTime: this.props.Li_ReserveNumThisTime,
      W1_classific: record.W1_classific,
      StsInspectCmtInfo: record.StsInspectCmtInfo,
      exam_type: record.exam_type,
    }

    InputVoteResultInputInspectInputAction.findingsEditing(params)
      .then((res) => {
        this.setState({ dataFindings: res?.data?.variables })
        let message = res?.data?.message
        switch (message) {
          case 'CallScreenWS0728001':
            this.showModalFindingsInputNomal_728(record)
            break;
          case 'CallScreenWS0729001':
            this.showModalFindingsInputRadiography_729(record)
            break;
          case 'CallScreenWS0730001':
            this.showModalFindingsInputPhysiciiagnos_730(record)
            break;
          case 'CallScreenWS0731001':
            this.showModalFindingsInputNomalSelect_731(record)
            break;
          case 'CallScreenWS0274001':
            this.showModalInspectCmtSearchQuery_274(record)
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  findingsEditingAfter(record) {
    let params = {
      W1_inspect_item_display_num: record.W1_inspect_item_display_num,
      W1_inspect_cd: record.W1_inspect_cd,
      W1_sect_display_num: record.W1_sect_display_num,
      W1_category_cd: record.W1_category_cd,
      pattern_code: record.pattern_code,
      judgment_level_division: record.judgment_level_division,
      personal_number_id: this.state.dataScreen.personal_number_id,
      Li_ReserveNumThisTime: this.props.Li_ReserveNumThisTime,
      Li_CourseLevelThisTime: this.props.Li_CourseLevelThisTime,
      StsFindingsCategory: true,
    }

    InputVoteResultInputInspectInputAction.findingsEditingAfter(params)
      .then((res) => {
        this.getScreenDataTable(true)

        let params = {
          Li_Division: this.props.Li_PublicName === 'V4IN0201000' ? 1 : 2,
          Li_CourseLevel: this.props.Li_CourseLevelThisTime,
          Li_ReserveNum: this.props.Li_ReserveNumThisTime,
          Li_TotalJudge: '',
          Lo_GuideMatters: '',
        }

        this.setState({
          updateData: true,
          paramsUpdate: params
        })

        if (this.props.onUpdateValue) {
          this.props.onUpdateValue({
            paramsUpdate: params,
            Lo_Update: true
          })
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  findingsEditingAfter274(record) {
    let params = {
      id: record.id,
      W1_result_val: record.W1_result_val,
      visit_date_on: record.visit_date_on,
      Li_Gender: record.Li_Gender,
      judgment_level_division: record.judgment_level_division,
      W1_inspect_cd: record.W1_inspect_cd,
      W1_inspect_judge: record.W1_inspect_judge,
      Li_ReserveNumThisTime: this.props.Li_ReserveNumThisTime,
    }

    InputVoteResultInputInspectInputAction.findingsEditingAfter274(params)
      .then((res) => {
        this.getScreenDataTable(true)
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  // update
  findIndexByID = (recordID) => {
    return this.state.dataSource.findIndex((item) => recordID === item.id);
  };

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource]

    data[index][field] = value
    this.setState({ dataSource: data })
  }

  callApiUpdateData(record) {
    let params = { ...record }
    params.Li_ReserveNum = this.props.Li_ReserveNumThisTime
    params.Li_CourseLevel = this.props.Li_CourseLevelThisTime
    InputVoteResultInputInspectInputAction.saveData(params)
      .then((res) => {
        let params = {
          Li_Division: this.props.Li_PublicName === 'V4IN0201000' ? 1 : 2,
          Li_CourseLevel: this.props.Li_CourseLevelThisTime,
          Li_ReserveNum: this.props.Li_ReserveNumThisTime,
          Li_TotalJudge: '',
          Lo_GuideMatters: '',
        }

        this.setState({
          updateData: true,
          paramsUpdate: params
        })

        if (this.props.onUpdateValue) {
          this.props.onUpdateValue({
            paramsUpdate: params,
            Lo_Update: true
          })
        }
        this.getScreenDataTable(false)
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  specifiedValue() {
    let params = {
      Li_CourseLevelThisTime: this.props.Li_CourseLevelThisTime,
      Li_ReserveNumThisTime: this.props.Li_ReserveNumThisTime
    }
    InputVoteResultInputInspectInputAction.specifiedValue(params)
      .then((res) => {
        let params = {
          Li_Division: this.props.Li_PublicName === 'V4IN0201000' ? 1 : 2,
          Li_CourseLevel: this.props.Li_CourseLevelThisTime,
          Li_ReserveNum: this.props.Li_ReserveNumThisTime,
          Li_TotalJudge: '',
          Lo_GuideMatters: '',
        }
        this.setState({
          updateData: true,
          paramsUpdate: params
        })

        if (this.props.onUpdateValue) {
          this.props.onUpdateValue({
            paramsUpdate: params,
            Lo_Update: true
          })
        }
        this.getScreenDataTable(false)
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  checkFont(value) {
    let dataB = [21, 24, 28, 32, 35, 57, 58, 59, 60, 61, 62, 63, 71, 72, 73, 74, 75, 76, 77, 80, 81, 120, 121, 144, 145, 149, 150]
    let dataI = [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77]

    let result = {
      fontWeight: 'normal',
      fontStyle: 'normal'
    }

    if (dataB.includes(value)) {
      result.fontWeight = 'bold'
    }

    if (dataI.includes(value)) {
      result.fontStyle = 'italic'
    }

    return result
  }
  render() {
    return (
      <div className="input-vote-result-input-inspect-input">
        <Card title="入力票結果入力 (検査入力)">
          <Spin spinning={this.state.isLoadingPage}>
            <Space>
              <Button
                onClick={() => {
                  this.specifiedValue()
                }}
              >規定値</Button>
              <Button
                hidden={this.props.Li_InputProtectionIn}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 280,
                      component:
                        <WS0739012_DataUpdateConfirm
                          Li_Division={this.props.Li_PublicName === 'V4IN0201000' ? 1 : 2}
                          Li_CourseLevel={this.props.Li_CourseLevelThisTime}
                          Li_ReserveNum={this.props.Li_ReserveNumThisTime}
                          Li_TotalJudge={''}
                          Lo_GuideMatters={''}
                          Li_Parameters={this.props.Li_Parameters}
                          onFinishScreen={(output) => {
                            this.setState({
                              Update: output.Lo_Update,
                              LeadershipMattersChange: output.Lo_GuideMatters,
                            })

                            if (output.Lo_Update) {
                              this.getScreenDataTable(true)
                              if (this.props.onUpdateValue) {
                                this.props.onUpdateValue({
                                  Lo_Update: false,
                                  Lo_After_Update: true
                                })
                              }
                            }
                            this.closeModal()
                          }}
                        />
                      ,
                    },
                  });
                }}
              >更新</Button>
            </Space>
            <hr style={{ margin: '15px 0' }} />
            <Row style={{ margin: 10 }}
              onDoubleClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 1500,
                    component:
                      <WS0343001_PersonalInfoMaintain
                        Li_PersonalNum={this.state.dataScreen.personal_number_id}
                        onFinishScreen={() => {
                          this.closeModal()
                        }}
                      />
                    ,
                  },
                });
              }}>
              <label style={customStyle.labelStyle}>個人番号</label>
              <div style={{ width: 150, marginRight: 20, textAlign: 'right' }}>
                <span>{this.state.dataScreen.personal_number_id === 0 ? '' : this.state.dataScreen.personal_number_id}</span>
              </div>
              <label style={customStyle.labelStyle}>漢字氏名</label>
              <div style={{ width: 'calc(100% - 420px', marginRight: 10 }}>
                <span>{this.state.dataScreen.Expression_10}</span>
              </div>
              <div style={{
                backgroundColor: Color(this.state.dataScreen.Expression_12)?.Background,
                color: Color(this.state.dataScreen.Expression_12)?.Foreground,
                textAlign: "center",
                width: 50,
                padding: '0 5px',
                cursor: 'pointer'
              }}
              >
                {this.state.dataScreen.Expression_11}
              </div>
            </Row>
            <Row style={{ margin: 10, marginBottom: 20 }}>
              <label style={customStyle.labelStyle}>受付番号</label>
              <div style={{ width: 120, textAlign: "right" }} >
                <span>{this.state.dataScreen.receipt_number === 0 ? '' : this.state.dataScreen.receipt_number}</span>
              </div>
              <div style={{ width: 40, marginRight: 10 }} >
                <div style={{ width: "15px", height: "15px", border: "1px dotted #000000" }}
                  hidden={!this.props.Li_InputProtectionIn}
                ></div>
              </div>
              <label style={customStyle.labelStyle}>コース</label>
              <div style={{ width: 40, marginRight: 5 }} >
                <span>
                  {this.state.dataScreen.visit_course ?
                    (this.state.dataScreen.visit_course?.toString().substr(0, 1)
                      + '-'
                      + this.state.dataScreen.visit_course?.toString().substr(1, 2))
                    : ''
                  }
                </span>
              </div>
              <div style={{ width: 'calc(100% - 370px' }}>
                <span>{this.state.dataScreen.contract_short_name}</span>
              </div>
            </Row>
            <Table
              size='small'
              style={{ cursor: 'pointer' }}
              rowClassName={(record, index) => record.id === this.state.rowSelected?.id ? 'table-row-light' : ''}
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={false}
              bordered
              rowKey={(record) => record.id}
              scroll={{ x: 600, y: 700 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: async () => {
                    let index = this.state.dataSource.findIndex(x => x.id === record.id)
                    this.setState({
                      rowSelected: record,
                      selectedRowKeys: [record.id],
                      indexTable: index
                    });
                  }
                }
              }}
            >
              <Table.Column title="検査項目" dataIndex="W1_inspect_name" width={100}
                render={(value, record, index) => {
                  return (
                    <Tooltip title={record.Expression_54}>
                      <div style={{
                        fontWeight: this.checkFont(record.Expression_59).fontWeight,
                        fontStyle: this.checkFont(record.Expression_59).fontStyle,
                      }}>
                        {value}
                      </div>
                    </Tooltip>
                  )
                }}
              />
              <Table.Column title="参考値" dataIndex="W1_standard_val" align='center' width={100} />
              <Table.Column title={this.state.dataScreen.Expression_26} dataIndex="W1_result_val"
                render={(value, record, index) => {
                  return (
                    <div>
                      {
                        (this.state.indexTable !== this.findIndexByID(record.id)) ?
                          <div style={{
                            paddingLeft: '7px',
                            fontWeight: this.checkFont(record.Expression_59).fontWeight,
                            fontStyle: this.checkFont(record.Expression_59).fontStyle,
                            color: Color(record.Expression_55)?.Foreground
                          }}>
                            {value}
                          </div>
                          :
                          <Input maxLength={parseInt(record.Expression_28)} value={record.W1_result_val}
                            readOnly={!record.Expression_32}
                            style={{
                              width: '100%',
                              fontWeight: this.checkFont(record.Expression_59).fontWeight,
                              fontStyle: this.checkFont(record.Expression_59).fontStyle,
                              color: Color(record.Expression_55)?.Foreground
                            }}
                            onDoubleClick={() => {
                              // if (record.W1_classific === 'K' && record.StsInspectCmtInfo && record.checkExamType) {
                              //   this.showModalInspectCmtSearchQuery_274(record)
                              // } else {
                              //   if (record.W1_classific === 'S') {
                              //     this.findingsEditing(record)
                              //   }
                              // }
                              this.ControlPreffit(record, true)
                            }}

                            onClick={() => {
                              this.ControlPreffit(record, false)
                            }}

                            onChange={(e) => {
                              this.updateDatasource(this.findIndexByID(record.id), "W1_result_val", e.target.value)
                              this.updateDatasource(this.findIndexByID(record.id), "Expression_59", 32)
                              this.updateDatasource(this.findIndexByID(record.id), "Expression_34", false)
                            }}
                            onBlur={(e) => {
                              this.updateDatasource(this.findIndexByID(record.id), "W1_inspect_judge", e.target.value ? record.W1_inspect_judge : '')
                            }}
                          />
                      }
                    </div>
                  )
                }} />
              <Table.Column title="判" dataIndex="W1_inspect_judge" width={40} align='center'
                render={(value, record, index) => {
                  return (
                    <div>
                      {
                        (this.state.indexTable === this.findIndexByID(record.id) && record.Expression_33 && record.Expression_34 && record.W1_result_val) ?
                          <Input maxLength={3} value={record.W1_inspect_judge}
                            style={{
                              textAlign: 'center',
                              width: '100%',
                              fontWeight: this.checkFont(record.Expression_59).fontWeight,
                              fontStyle: this.checkFont(record.Expression_59).fontStyle,
                              color: Color(record.Expression_55)?.Foreground
                            }}
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 500,
                                  component:
                                    <WS0285001_JudgeQuery
                                      Li_JudgeLevel={record.judment_level_division}
                                      Lio_Judge={record.W1_inspect_judge}
                                      onFinishScreen={(output) => {
                                        this.updateDatasource(this.findIndexByID(record.id), "W1_inspect_judge", output.recordData.judgment_result);
                                        this.updateDatasource(this.findIndexByID(record.id), "Expression_59", 32)
                                        this.updateDatasource(this.findIndexByID(record.id), "Expression_55", output.recordData.Expression_4)
                                        this.closeModal()
                                      }}
                                    />
                                  ,
                                },
                              });
                            }}
                            onChange={(e) => {
                              this.updateDatasource(this.findIndexByID(record.id), "W1_inspect_judge", e.target.value);
                              this.updateDatasource(this.findIndexByID(record.id), "Expression_59", 32)
                            }}
                          />
                          :
                          <div style={{
                            fontWeight: this.checkFont(record.Expression_59).fontWeight,
                            fontStyle: this.checkFont(record.Expression_59).fontStyle,
                            color: Color(record.Expression_55)?.Foreground
                          }}>
                            {value}
                          </div>
                      }
                    </div>
                  )
                }} />
              <Table.Column title={this.state.dataScreen.Expression_27} dataIndex="W1_result_val_once" align='center' width={150}
                render={(value, record, index) => {
                  return (
                    <div style={{
                      fontWeight: this.checkFont(record.Expression_29).fontWeight,
                      fontStyle: this.checkFont(record.Expression_29).fontStyle,
                      color: Color(record.Expression_56)?.Foreground
                    }}>
                      {value}
                    </div>
                  )
                }} />
              <Table.Column title="判" dataIndex="W1_inspect_judge_once" width={40} align='center'
                render={(value, record, index) => {
                  return (
                    <div style={{ color: Color(record.Expression_56)?.Foreground }}>
                      {value}
                    </div>
                  )
                }} />
              <Table.Column width={40}
                render={(text, record, index) => {
                  return (
                    <Button
                      hidden={this.state.indexTable !== this.findIndexByID(record.id)}
                      onClick={() => { this.callApiUpdateData(record) }}
                      style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                      icon={<SaveOutlined />} >
                    </Button>
                  )
                }}
              />
            </Table>
          </Spin>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0739001_InputVoteResultInputInspectInput);
