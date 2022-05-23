/* eslint-disable eqeqeq */
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";

import { Table, Space, Dropdown, Menu, Form, Button, message, Card, Input, TimePicker, InputNumber } from "antd";
import { InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, MoreOutlined, CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

import WS2584019_PersonalInfoInquirySub from 'pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx';
import WS2585001_OfficeInfoInquirySub from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub.jsx';
import WS2583001_ConsultInquirySub from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub.jsx';
import ModalDraggable from "components/Commons/ModalDraggable";

import Color from "constants/Color";
import TargetSelectSubAction from "redux/AdvancePreparation/ConsultInfoList/TargetSelectSub.action";
import { download_file } from "helpers/CommonHelpers";
import NumberFormat from "react-number-format";
class WS2788013_TargetSelectSub extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = this.props.document ? this.props.document : '対象選択SUB'
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: [],
      selectedRowKeys: [],
      dataSource: [],
      dataSourceRestore: [],
      isLoadingTable: false,

      isFilterTime: false
    };
  }

  componentDidMount() {
    this.loadData(this.props.message);
    this.setState({ isFilterTime: false })
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.props.isSearch) {
      this.loadData(this.props.message);
      this.setState({ isFilterTime: false })
    }
  }

  loadData = (messag) => {
    if (messag === 'Success') {
      this.setState({ isLoadingTable: true });
      TargetSelectSubAction.getDataTable({ PrintType: this.props.PrintType, OutputOrder: this.props.OutputOrder })
        .then(res => {
          if (res) {
            let data = res.data.filter(x => x.W1_logic_01)
            this.setState({
              dataSource: res.data,
              dataSourceRestore: res.data,
              isLoadingTable: false,
              selectedRows: data,
              selectedRowKeys: data.map(x => x.id)
            });
            if (!!this.props?.screenName) {
              this.props.onFinishScreen({ message: 'faild' })
            }
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
  }

  excelReport() {
    this.setState({ isLoadingTable: true })
    TargetSelectSubAction.excelReport()
      .then((res) => {
        download_file(res);
        this.setState({ isLoadingTable: false })
      })
      .finally(() => { this.setState({ isLoadingTable: false }) })
  }

  changeLogic = (params) => {
    TargetSelectSubAction.changeLogicAction(params)
      .then((res) => {
        this.loadData('Success');
      })
  }

  changeLogicAll = (params) => {
    TargetSelectSubAction.changeLogicAllAction(params)
      .then((res) => {
        this.loadData('Success');
      })
  }

  // Filter Column 時間
  renderFormFilter(setSelectedKeys, selectedKeys, confirm, clearFilters) {
    return (
      <Card style={{ width: 165 }} hidden={this.state.dataSourceRestore.length == 0}>
        <Form ref={this.formRef}
          initialValues={{
            TimeStart: '00:00',
            TimeEnd: '00:00',
          }}>
          <div >
            <Form.Item name="TimeStart" label={<span style={{ paddingRight: 10 }}>開始 </span>}>
              <NumberFormat format="##:##" placeholder="__:__" mask={_} type='text'
                style={{ border: '1px solid #d9d9d9', outline: '#d9d9d9', width: 90 }}
                onBlur={(e) => {
                  this.handleInputTime(e.target.value, 'TimeStart')
                }}
              />
            </Form.Item>
            <Form.Item name="TimeEnd" label={<span style={{ paddingRight: 10 }}>終了</span>}>
              <NumberFormat format="##:##" placeholder="__:__" mask={_} type='text'
                style={{ border: '1px solid #d9d9d9', outline: '#d9d9d9', width: 90 }}
                onBlur={(e) => {
                  this.handleInputTime(e.target.value, 'TimeEnd')
                }}
              />
            </Form.Item>
          </div>
          <hr style={{ margin: '15px 0' }} />
          <Space >
            <Button type="primary" size="small" style={{ width: 65 }}
              onClick={() => {
                this.setState({
                  isFilterTime: false
                })
                this.handleFilterColumn(selectedKeys, confirm, 'period_time')
              }}
            >
              OK
            </Button>
            <Button size="small" style={{ width: 65 }}
              onClick={() => {
                this.setState({
                  isFilterTime: false
                })
                confirm({ closeDropdown: true });
                this.handleResetColumn(clearFilters);
              }}
            >
              ｸﾘｱ
            </Button>
          </Space>
        </Form>
      </Card>
    )
  }

  handleInputTime(val, name) {
    let hh = val.substring(0, val.indexOf(':'))
    let mm = val.substring(val.indexOf(':') + 1)

    if (mm < 10 && mm > 0) {
      val = hh + ':' + '0' + parseInt(mm)
    }

    if (mm == 0) {
      val = hh + ':' + '00'
    }

    let regEx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    let checked = regEx.test(val)

    if (!checked) {
      this.formRef.current?.setFieldsValue({
        [name]: '00:00',
      })
    } else {
      this.formRef.current?.setFieldsValue({
        [name]: val,
      })
    }

    this.checkTime(name == 'TimeStart' ? true : false)
  }

  checkTime(start) {
    let TimeStart = this.formRef.current?.getFieldValue('TimeStart')

    if (!TimeStart) {
      this.formRef.current?.setFieldsValue({
        TimeStart: '00:00',
      })
      TimeStart = '00:00'
    }

    if (start) {
      this.formRef.current?.setFieldsValue({
        TimeEnd: TimeStart,
      })
    }
  }

  handleFilterColumn = (selectedKeys, confirm, dataIndex) => {
    confirm();

    let TimeStart = this.formRef.current?.getFieldValue('TimeStart')
    let TimeEnd = this.formRef.current?.getFieldValue('TimeEnd')

    let data = this.state.dataSourceRestore.filter(x => TimeStart <= x.period_time.substr(0, 5) && x.period_time.substr(0, 5) <= TimeEnd)

    this.setState({
      dataSource: data
    })
  };

  handleResetColumn = clearFilters => {
    clearFilters();
    this.formRef.current?.setFieldsValue({
      TimeStart: '00:00',
      TimeEnd: '00:00',
    })

    this.setState({
      dataSource: this.state.dataSourceRestore
    })
  };

  render() {
    return (
      <div className="target-select-sub">
        <Table
          size="small"
          className="scrollbar"
          dataSource={this.state.dataSource}
          loading={this.state.isLoadingTable}
          // pagination={{
          //   defaultPageSize: this.props?.PageSize ? this.props?.PageSize : 10,
          //   size: 'small',
          //   hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
          // }}
          pagination={false}
          bordered={true}
          rowKey={(record) => record.id}
          scroll={{ x: 1400, y: 700 }}
          rowSelection={{
            type: 'checkbox',
            fixed: 'left',
            selectedRowKeys: this.state.selectedRowKeys,
            onSelect: (record, selected, selectedRows, nativeEvent) => {
              let arrTemp = [...this.state.selectedRowKeys];
              let arrTempRecord = [...this.state.selectedRows];
              let idx = arrTemp.indexOf(record.id);
              if (idx === -1) {
                arrTemp.push(record.id);
                arrTempRecord.push(record)
                this.setState({
                  selectedRowKeys: arrTemp,
                  selectedRows: arrTempRecord
                });
                if (this.props.setValueChildren) {
                  this.props.setValueChildren(arrTempRecord)
                }
              } else {
                arrTemp.splice(idx, 1);
                arrTempRecord.splice(idx, 1);
                this.setState({
                  selectedRowKeys: arrTemp,
                  selectedRows: arrTempRecord
                });
                if (this.props.setValueChildren) {
                  this.props.setValueChildren(arrTempRecord)
                }
              }
              this.changeLogic({
                id: record.id,
                W1_logic_01: selected
              })
            },

            onSelectAll: (selected, selectedRows, changeRows) => {
              if (selected) {
                let arrTemp = this.state.dataSource.map(item => item.id);
                let arrTempRecord = this.state.dataSource;
                this.setState({
                  selectedRowKeys: arrTemp,
                  selectedRows: arrTempRecord
                });
                if (this.props.setValueChildren) {
                  this.props.setValueChildren(arrTempRecord)
                }
              } else {
                this.setState({
                  selectedRowKeys: [],
                  selectedRows: []
                });
                if (this.props.setValueChildren) {
                  this.props.setValueChildren([])
                }
              }
              this.changeLogicAll({ Logic: selected })
            },
          }}
        >
          <Table.Column title="受診日" dataIndex="visit_date_on" width={85} align='center'
            sorter={(a, b) => new Date(a.visit_date_on) - new Date(b.visit_date_on)}
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.expression_16)?.Foreground }}>
                  {value === '0000-00-00' ? '' : moment(value)?.format('YYYY/MM/DD')}
                </div>
              )
            }} />
          <Table.Column title="時間" dataIndex="period_time" width={60} align='center'
            filterDropdown={({
              setSelectedKeys,
              selectedKeys,
              confirm,
              clearFilters
            }) => (
              this.renderFormFilter(setSelectedKeys, selectedKeys, confirm, clearFilters)
            )}

            filterIcon={filtered => (
              <div>
                {this.state.isFilterTime ?
                  <CaretUpOutlined style={{ color: filtered ? 'black' : '' }}
                    onClick={() => {
                      this.setState({ isFilterTime: !this.state.isFilterTime })
                    }} />
                  :
                  <CaretDownOutlined style={{ color: filtered ? 'black' : '' }}
                    onClick={() => {
                      this.setState({ isFilterTime: !this.state.isFilterTime })
                    }} />
                }
              </div>
            )}

            onFilter={(value, record) =>
              record['period_time']
                ? record['period_time']
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
                : ''
            }

            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.expression_16)?.Foreground }}>
                  {value ? value?.substr(0, 5) : ''}
                </div>
              )
            }} />
          <Table.Column title="受付No" dataIndex="receipt_number" width={85}
            sorter={(a, b) => a.receipt_number - b.receipt_number}
            render={(value, record, index) => {
              return (
                <div style={{ textAlign: 'right', color: Color(record.expression_16)?.Foreground }}>
                  <span>{record.receipt_number === 0 ? '' : record.receipt_number}</span>
                </div>
              )
            }} />
          <Table.Column title="個人番号" dataIndex="personal_number_id" width={92}
            sorter={(a, b) => a.personal_number_id - b.personal_number_id}
            render={(value, record, index) => {
              return (
                <div style={{ textAlign: 'right', color: Color(record.expression_16)?.Foreground }}>
                  <span>{record.personal_number_id}</span>
                </div>
              )
            }} />
          <Table.Column title="ﾒﾓ" dataIndex="importance" width={30} align='center'
            render={(value, record, index) => {
              let icon = "";
              switch (record.importance) {
                case 1: icon = (<InfoCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />);
                  break;
                case 3: icon = (<WarningOutlined style={{ fontSize: 20, color: "#faad14" }} />);
                  break;
                case 5: icon = (<CloseCircleOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />);
                  break;
                default: icon = (<Button size='small' icon={<MoreOutlined />}></Button>);
              }
              return (
                <div style={{ textAlign: "center", cursor: 'pointer' }}
                  hidden={!record.personal_number_id}
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
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                });
                              }}
                            />
                          </Card>
                        ),
                      },
                    })
                  }}>
                  {icon}
                </div>
              );
            }} />
          <Table.Column title="漢字氏名" dataIndex="KanjiName"
            sorter={(a, b) => a.KanjiName?.localeCompare(b.KanjiName, 'ja')}
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.expression_16)?.Foreground }}>
                  {value}
                </div>
              )
            }} />
          <Table.Column title="性別" dataIndex="Gender" width={65} align='center'
            sorter={(a, b) => a.Gender?.localeCompare(b.Gender, 'ja')}
            render={(value, record, index) => {
              return (<span style={{ color: Color(record.expression_17)?.Foreground }}>{value}</span>)
            }} />
          <Table.Column title="生年月日" dataIndex="DateBirth" width={92}
            sorter={(a, b) => new Date(a.DateBirth) - new Date(b.DateBirth)}
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.expression_16)?.Foreground }}>
                  {value === '0000-00-00' ? '' : moment(value)?.format('NNy/MM/DD')}
                </div>
              )
            }} />
          <Table.Column title="年齢" dataIndex="Age" width={65}
            sorter={(a, b) => a.Age - b.Age}
            render={(value, record, index) => {
              return (
                <div style={{ textAlign: 'right', color: Color(record.expression_16)?.Foreground }}>
                  <span>{record.Age > 0 ? record.Age : ''}</span>
                </div>
              )
            }} />
          <Table.Column title="ﾒﾓ" dataIndex="expression_27" width={30} align='center'
            render={(value, record, index) => {
              let icon = "";
              switch (record.expression_27) {
                case 1: icon = (<InfoCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />);
                  break;
                case 3: icon = (<WarningOutlined style={{ fontSize: 20, color: "#faad14" }} />);
                  break;
                case 5: icon = (<CloseCircleOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />);
                  break;
                default: icon = (<Button size='small' icon={<MoreOutlined />}></Button>);
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
          <Table.Column title="事業所" dataIndex="office_kanji_name"
            sorter={(a, b) => a.office_kanji_name?.localeCompare(b.office_kanji_name, 'ja')}
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.expression_16)?.Foreground }}>
                  {value}
                </div>
              )
            }} />
          <Table.Column title="契約情報"
            sorter={(a, b) => a.visit_course?.localeCompare(b.visit_course, 'en')}
            render={(value, record, index) => {
              return <div>
                <span style={{ color: Color(record.expression_16)?.Foreground, width: 37, paddingRight: 5 }}>
                  {record.visit_course ? record.visit_course?.toString().substr(0, 1) + '-' + record.visit_course?.toString().substr(1, 2) : ''}
                </span>
                <span style={{ color: Color(record.expression_16)?.Foreground }}>{record.contract_short_name}
                </span>
              </div>
            }} />
          <Table.Column title="状態" dataIndex="expression_15" width={40} align='center'
            render={(value, record, index) => {
              return <span style={{ color: Color(record.expression_18)?.Foreground }}>{value}</span>
            }} />
          <Table.Column title="備考" dataIndex="remarks" width={70}
            sorter={(a, b) => a.remarks?.localeCompare(b.remarks, 'ja')}
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.expression_16)?.Foreground }}>
                  {value}
                </div>
              )
            }} />
          <Table.Column title="検査状況" dataIndex="InspectStatus"
            sorter={(a, b) => a.InspectStatus?.localeCompare(b.InspectStatus, 'ja')}
            render={(value, record, index) => {
              return (
                <div style={{ color: Color(record.expression_16)?.Foreground }}>
                  {value}
                </div>
              )
            }} />
          <Table.Column width={45} align='center' fixed='right'
            render={(value, record, index) => (
              <Dropdown size='small'
                overlay={() => (
                  <Menu >
                    <Menu.Item onClick={() => (
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1200,
                          component: (
                            <WS2583001_ConsultInquirySub
                              Li_ReserveNum={record.W1_reserve_num}
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
                    )}>照会</Menu.Item>
                    <Menu.Item
                      onClick={() => this.excelReport()}
                    >EXCEL</Menu.Item>
                  </Menu>
                )}>
                <Button icon={<MoreOutlined />}></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2788013_TargetSelectSub);
