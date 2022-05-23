import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Table, Menu, Dropdown, Modal, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { getListDataConsultHistorySubAction } from "redux/InputBusiness/ProgressSetting/ConsultHistorySub.actions";
import WS2583001_ConsultInquirySub from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub.jsx';
import WS0650001_DocumentBatchCreateSub from 'pages/JZ_AdvancePreparation/V4JZ0102003_DocumentBatchCreate/WS0650001_DocumentBatchCreateSub.jsx';
import WS2637001_OverallResultDisplayInput from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637001_OverallResultDisplayInput.jsx';
import WS0802001_PrintInstruction from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0802001_PrintInstruction.jsx';
import WS0898001_IntroduceLetterExtractMaintain from 'pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0898001_IntroduceLetterExtractMaintain.jsx';
import moment from "moment-timezone";
import ModalDraggable from "components/Commons/ModalDraggable";

class WS2586020_ConsultHistorySub extends React.Component {

  static propTypes = {
    Li_PersonalNum: PropTypes.any,
    scrollY: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '受診履歴SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        // defaultPageSize: 8,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    if (this.props.Li_PersonalNum) {
      this.getListDataConsultHistorySub(this.props.Li_PersonalNum);
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.getListDataConsultHistorySub(this.props.Li_PersonalNum);
    }
  }

  getListDataConsultHistorySub = (params) => {
    this.setState({ dataSource: [] });
    if (params) {
      this.setState({ isLoading: true, dataSource: [] });
      getListDataConsultHistorySubAction({ personal_number_id: params || '' })
        .then(res => {
          if (res) {
            let data = res.data.map((item, index) => ({ ...item, id: index }));
            this.setState({ dataSource: data });
          }
        })
        .catch()
        .finally(() => this.setState({ isLoading: false }))
    }

  }

  render() {
    return (
      <div className="consult-history-sub">
        <Table
          size='small'
          dataSource={this.state.dataSource}
          loading={this.state.isLoading}
          pagination={{
            ...this.state.pagination,
            pageSize: this.props.pageSize || 8,
            hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
          }}
          bordered={this.props.Li_PersonalNum ? true : false}
          scroll={{ y: this.props.scrollY ? this.props.scrollY : null }}
          rowKey={(record) => record.id}
        >
          <Table.Column title="受診日" dataIndex="visit_date_on" width={90} align='center'
            render={(text) => (<div>{moment(text).format('YYYY/MM/DD')}</div>)}
          />
          <Table.Column title="状態" dataIndex="Expression_7" width={45} align='center'
            render={(text) => (<span style={{ color: text === '受付' ? 'red' : 'blue' }}>{text}</span>)}
          />
          <Table.Column title={<div style={{ textAlign: 'center' }}>契約情報</div>} dataIndex="Expression_9" ellipsis />
          <Table.Column width={40} align='center'
            render={(text, record, index) => (
              <Dropdown
                trigger='click'
                overlay={() => (
                  <Menu >
                    <Menu.Item key='受診照会' onClick={() => {
                      this.setState({
                        ...this.state,
                        childModal: {
                          width: '60%',
                          visible: true,
                          component: (<WS2583001_ConsultInquirySub
                            Li_ReserveNum={record.reservation_number}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />)
                        }
                      });
                    }}>受診照会</Menu.Item>
                    <Menu.Item key='予約関連' onClick={() => {
                      this.setState({
                        ...this.state,
                        childModal: {
                          width: '60%',
                          visible: true,
                          component: (<WS0650001_DocumentBatchCreateSub
                            Li_CourseLevel={''}
                            Li_ReserveNum={record.reservation_number}
                            Li_OutputUnit={''}
                            Li_OutputPattern={''}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />)
                        }
                      });
                    }}>予約関連</Menu.Item>
                    <Menu.Item key='結果照会'
                      hidden={record.state_flag !== 1}
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          childModal: {
                            width: '100%',
                            visible: true,
                            component: (<WS2637001_OverallResultDisplayInput
                              Li_MenuOption={''}
                              Li_MenuAdminRights={''}
                              Li_MenuAuthority={''}
                              Li_SubjectNotBeChangedMode={''}
                              Li_CourseLevel={''}
                              Li_ReserveNum={record.reservation_number}
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                });
                              }}
                            />)
                          }
                        });
                      }}>結果照会</Menu.Item>
                    <Menu.Item key='結果印刷'
                      hidden={record.state_flag !== 1}
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          childModal: {
                            width: '30%',
                            visible: true,
                            component: (<WS0802001_PrintInstruction
                              Li_CourseLevel={''}
                              Li_ReserveNum={record.reservation_number}
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                });
                              }}
                            />)
                          }
                        });
                      }}>結果印刷</Menu.Item>
                    <Menu.Item key='紹介状'
                      hidden={record.state_flag !== 1}
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          childModal: {
                            width: '60%',
                            visible: true,
                            component: (<WS0898001_IntroduceLetterExtractMaintain
                              Li_MenuOption={''}
                              Li_PersonalNum={record.personal_number_id}
                              Li_ReserveNum={record.reservation_number}
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                });
                              }}
                            />)
                          }
                        });
                      }}>紹介状</Menu.Item>
                  </Menu>
                )}>
                <Button
                  size='small'
                  icon={<MoreOutlined />}></Button>
              </Dropdown>
            )}
          />
        </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2586020_ConsultHistorySub);
