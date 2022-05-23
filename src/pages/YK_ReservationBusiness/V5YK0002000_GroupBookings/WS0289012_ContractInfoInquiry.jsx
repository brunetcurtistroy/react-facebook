import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import moment from 'moment';
import { getScreenContractInfoInquiryAction, getDataContractInfoInquiryAction, getDataSubContractInfoInquiryAction } from "redux/ReservationBusiness/GroupBookings/ContractInfoInquiry.actions";
import { Card, Form, Input, Checkbox, Button, Table, Row, Col, Space, Dropdown, Menu, message, Tooltip } from "antd";
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry';
import WS0605127_ContractLineItemDisplay from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay";
import Color from "constants/Color";
import { ModalError } from "components/Commons/ModalConfirm";
import ModalDraggable from "components/Commons/ModalDraggable";

class WS0289012_ContractInfoInquiry extends React.Component {
  static propTypes = {
    Li_State: PropTypes.any,
    Li_EffectiveLimitedDisplay: PropTypes.any,
    Lio_ConsultCourse: PropTypes.any,
    Li_OfficeCode: PropTypes.any,
    Li_BranchStoreCode: PropTypes.any,
    Li_Date: PropTypes.any,
    Li_Gender: PropTypes.any,
    Li_DateBirth: PropTypes.any,
    Li_Relationship: PropTypes.any,
    Li_HospitalOut: PropTypes.any,
    Li_Am_Pm: PropTypes.any,
    Li_NTsugikenmi: PropTypes.any,
    Li_Other: PropTypes.any,
    Lio_ContractType: PropTypes.any,
    Lio_ContractOrgCode: PropTypes.any,
    Lio_ContractStartDate: PropTypes.any,
    Lio_ContractNum: PropTypes.any,
    Lo_Status: PropTypes.any,
    Lo_ErrorMessage: PropTypes.any,
    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '契約情報照会';

    this.state = {
      pagination: {
        // defaultPageSize: 18,
        size: 'small',
        showQuickJumper: true,
        pageSizeOptions: [],
        current: 1,
        pageSize: 18,
        total: 1,
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      initParams: {
        Li_EffectiveLimitedDisplay: '',
        Lio_ConsultCourse: '',
        Li_MsgOutput: '',
        Li_Gender: '',
        Li_Relationship: '',
        Li_DateBirth: '',
        Li_AgeDate: '',
        Li_AgeYearEnd: '',
        Li_AgeSchool: '',
        Li_HospitalOut: '',
        Li_Am_Pm: '',
        Li_NTsugikenmi: '',
        Li_Other: '',
        Lo_ContractType: '',
        Lo_ContractOrgCode: '',
        Lo_ContractStartDate: '',
        Lo_ContractNum: '',
        Lo_Status: '',
        ContractType: '',
        Course: '',
        Search: '',
        Gender: 0,
        Relationship: 0,
        HospitalOut: 0,
        Ampm: 0,
        NTsugikenmi: 0,
        Age: 0,
        Other: 0,
        StsCurrentYearOnly: 0,
        DateYear: '',
        limit: 18,
        page: 1,
      },
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  componentDidMount = () => {
    let params = {
      Li_State: this.props.Li_State,
      Li_EffectiveLimitedDisplay: this.props.Li_EffectiveLimitedDisplay,
      Lio_ConsultCourse: this.props.Lio_ConsultCourse,
      Li_OfficeCode: this.props.Li_OfficeCode,
      Li_BranchStoreCode: this.props.Li_BranchStoreCode,
      Li_Date: this.props.Li_Date,
      Li_Gender: this.props.Li_Gender,
      Li_DateBirth: this.props.Li_DateBirth,
      Li_Relationship: this.props.Li_Relationship,
      Li_HospitalOut: this.props.Li_HospitalOut,
      Li_Am_Pm: this.props.Li_Am_Pm,
      Li_NTsugikenmi: this.props.Li_NTsugikenmi,
      Li_Other: this.props.Li_Other,
      Lio_ContractType: this.props.Lio_ContractType,
      Lio_ContractOrgCode: this.props.Lio_ContractOrgCode,
      Lio_ContractStartDate: this.props.Lio_ContractStartDate,
      Lio_ContractNum: this.props.Lio_ContractNum,
      Lo_Status: this.props.Lo_Status,
      Lo_ErrorMessage: this.props.Lo_ErrorMessage,
    }
    this.callAPILoadData(params);
    this.formRef?.current?.setFieldsValue({ Course: this.props.Lio_ConsultCourse || '' })
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      let params = {
        Li_State: this.props.Li_State,
        Li_EffectiveLimitedDisplay: this.props.Li_EffectiveLimitedDisplay,
        Lio_ConsultCourse: this.props.Lio_ConsultCourse,
        Li_OfficeCode: this.props.Li_OfficeCode,
        Li_BranchStoreCode: this.props.Li_BranchStoreCode,
        Li_Date: this.props.Li_Date,
        Li_Gender: this.props.Li_Gender,
        Li_DateBirth: this.props.Li_DateBirth,
        Li_Relationship: this.props.Li_Relationship,
        Li_HospitalOut: this.props.Li_HospitalOut,
        Li_Am_Pm: this.props.Li_Am_Pm,
        Li_NTsugikenmi: this.props.Li_NTsugikenmi,
        Li_Other: this.props.Li_Other,
        Lio_ContractType: this.props.Lio_ContractType,
        Lio_ContractOrgCode: this.props.Lio_ContractOrgCode,
        Lio_ContractStartDate: this.props.Lio_ContractStartDate,
        Lio_ContractNum: this.props.Lio_ContractNum,
        Lo_Status: this.props.Lo_Status,
        Lo_ErrorMessage: this.props.Lo_ErrorMessage,
      }
      this.callAPILoadData(params);
      this.formRef?.current?.setFieldsValue({ Course: this.props.Lio_ConsultCourse || '' })
    }
  }

  callAPILoadData = (params) => {
    this.setState({ isLoading: true });
    getDataContractInfoInquiryAction(params)
      .then((res) => {
        let data = res?.data;
        if (data) {
          this.setState({
            initParams: {
              ...this.state.initParams,
              Li_AgeDate: data.Li_AgeDate,
              Li_AgeSchool: data.Li_AgeSchool,
              Li_AgeYearEnd: data.Li_AgeYearEnd,
              Li_Am_Pm: data.Li_Am_Pm || '',
              Li_DateBirth: data.Li_DateBirth || '',
              Li_EffectiveLimitedDisplay: data.Li_EffectiveLimitedDisplay,
              Li_Gender: data.Li_Gender,
              Li_HospitalOut: data.Li_HospitalOut,
              Li_MsgOutput: data.Li_MsgOutput,
              Li_NTsugikenmi: data.Li_NTsugikenmi,
              Li_Other: data.Li_Other || '',
              Li_Relationship: data.Li_Relationship || '',
              Lio_ConsultCourse: data.Lio_ConsultCourse || '',
              Lo_ContractNum: data.Lo_ContractNum,
              Lo_ContractOrgCode: data.Lo_ContractOrgCode,
              Lo_ContractStartDate: data.Lo_ContractStartDate,
              Lo_ContractType: data.Lo_ContractType,
              Lo_Status: data.Lo_Status,
              DateYear: data.DateYear,
            }
          })
          this.loadInitData({
            Li_StsAllCoursesCanBeSelect: data.Li_StsAllCoursesCanBeSelect ? 1 : 0,
            Lio_ConsultCourse: data.Lio_ConsultCourse || '',
            Li_EffectiveLimitedDisplay: data.Li_EffectiveLimitedDisplay,
            Li_MsgOutput: data.Li_MsgOutput,
            StsCurrentYearOnly: data.StsCurrentYearOnly ? 1 : 0,
            StsThisYearThere: data.StsThisYearThere ? 1 : 0,
            DateYear: data.DateYear
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadInitData = (params) => {
    getScreenContractInfoInquiryAction(params)
      .then(res => {
        if (res?.data) {
          let objTemp = {
            Age: res.data.Age ? 1 : 0,
            Ampm: res.data.Ampm ? 1 : 0,
            Course: res.data.Course,
            Gender: res.data.Gender ? 1 : 0,
            HospitalOut: res.data.HospitalOut ? 1 : 0,
            NTsugikenmi: res.data.NTsugikenmi ? 1 : 0,
            Other: res.data.Other ? 1 : 0,
            Relationship: res.data.Relationship ? 1 : 0,
          }

          this.loadData({
            ...this.state.initParams,
            ...objTemp
          })

          this.setState({
            initParams: {
              ...this.state.initParams,
              ...objTemp
            }
          })
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = (params) => {
    this.setState({ isLoading: true, dataSource: [], rowSelect: {} });
    getDataSubContractInfoInquiryAction(params)
      .then(res => {
        let dataRes = res?.data;
        if (dataRes) {
          this.setState({
            dataSource: dataRes.SUB,
            rowSelect: dataRes.SUB.length > 0 ? dataRes.SUB[0] : {},
            pagination: {
              ...this.state.pagination,
              current: dataRes.current_page,
              total: dataRes.total,
            }
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  handleSearch = (value, name) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        [name]: value,
      }
    }, () => this.loadData(this.state.initParams));
  }

  Select = (record) => {
    let ErrorAtTime = false;
    let {
      StsCurrentYearOnly, DateYear, W1_contract_start_date, Li_EffectiveLimitedDisplay, W1_condition_status,
      Lio_ConsultCourse, Lo_ContractNum, Lo_ContractOrgCode, Lo_ContractStartDate, Lo_ContractType, Lo_Status,
    } = record;
    let Lo_ErrorMessage = '';

    if (StsCurrentYearOnly && DateYear > W1_contract_start_date) {
      ModalError(moment(DateYear).format('YYYY') + '年度' + 'の契約を選択してください');
      ErrorAtTime = true;
    }

    if (Li_EffectiveLimitedDisplay !== 2) {
      if (W1_condition_status === 2 || W1_condition_status === 1) {
        message.warning('コース条件に合致しません')
        ErrorAtTime = true;
      }
    }

    if (Lo_Status === 9) {
      Lo_ErrorMessage = moment(DateYear).format('YYYY') + '年度' + 'の契約を作成してください';
    } else if (Lo_Status === 1 || Lo_Status === 2) {
      Lo_ErrorMessage = '受診ｺｰｽが正しくありません';
    }

    if (this.props.onFinishScreen && !ErrorAtTime) {
      this.props.onFinishScreen({
        Lio_ConsultCourse,
        Lo_ContractType,
        Lo_ContractOrgCode,
        Lo_ContractStartDate,
        Lo_ContractNum,
        Lo_Status,
        Lo_ErrorMessage,
        recordData: record
      })
    }
  }

  renderButton = (record) => (
    <Dropdown.Button type="primary" trigger='click'
      onClick={() => this.Select(record)}
      overlay={(
        <Menu>
          <Menu.Item type="primary" onClick={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: true,
                width: 1500,
                component: (
                  <WS0605127_ContractLineItemDisplay
                    Li_ContractType={record.Lo_ContractType}
                    Li_ContractOrgCode={record.Lo_ContractOrgCode}
                    Li_ContractStartDate={record.Lo_ContractStartDate}
                    Li_ContractNum={record.Lo_ContractNum}
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
          }}>契約内容</Menu.Item>
        </Menu>)}
    >選択</Dropdown.Button>
  )

  render() {
    return (
      <div className="contract-info-inquiry">
        <Card title="契約情報照会">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Row gutter={10}>
              <Col span={4}>
                <Form.Item name="Course">
                  <Input.Search
                    onChange={(e) => this.handleSearch(e.target.value, 'Course')}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: (<WS0265001_BasicCourseInquiry
                            onFinishScreen={({ Lo_CourseCode }) => {
                              this.formRef.current.setFieldsValue({ Course: Lo_CourseCode });
                              this.handleSearch(Lo_CourseCode, 'Course');
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
              </Col>
              <Col span={18}>
                <Form.Item name="Search">
                  <Input onChange={e => this.handleSearch(e.target.value, 'Search')} />
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ display: this.state.dataSource?.length > 0 ? '' : 'none' }}>
              <Col span={12}>
                <div>{this.state.rowSelect?.Expression_11}</div>
              </Col>
              <Col span={12} >
                <div style={{ float: 'right' }}>
                  {moment(this.state.rowSelect?.StartDate).isValid()
                    ? moment(this.state.rowSelect?.StartDate).format('YYYY/MM/DD')
                    : '0000/00/00'
                  }
                </div>
              </Col>
            </Row>

            <Table
              className='mt-3'
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              bordered
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource?.length > 10 ? false : true,
                onChange: (page, pageSize) => {
                  this.setState({
                    initParams: {
                      ...this.state.initParams,
                      page
                    }
                  }, () => this.loadData(this.state.initParams))
                }
              }}
              rowKey={(record) => record.id}
              rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="番号" dataIndex="W1_contract_num" render={(text, record) => (
                <div style={{ textAlign: 'right', color: Color(record.Expression_51).Foreground }}>{text}</div>
              )} />
              <Table.Column title="契約" dataIndex="Expression_14" render={(text, record) => (
                <div style={{ color: Color(record.Expression_15).Foreground }}>{text}</div>
              )} />
              <Table.Column title="ｺｰｽ" dataIndex="W1_chkup_course" render={(text, record) => (
                <Tooltip title={record?.Expression_53}>
                  <div style={{ color: Color(record.Expression_51).Foreground }}>{text}</div>
                </Tooltip>
              )} />
              <Table.Column title="契約内容" dataIndex="W1_contract_short_name" render={(text, record) => (
                <Tooltip title={record?.Expression_53}>
                  <div style={{ color: Color(record.Expression_51).Foreground }}>{text}</div>
                </Tooltip>
              )} />
              <Table.Column dataIndex="Expression_27"
                title={<>
                  <Form.Item name='Gender' valuePropName='checked'>
                    <Checkbox onChange={e => this.handleSearch(e.target.checked ? 1 : 0, 'Gender')}></Checkbox>
                  </Form.Item>
                  性
                </>}
                render={(text, record) => <div style={{ color: Color(record.Expression_51).Foreground }}>{record.Expression_19 ? text : ''}</div>}
              />
              <Table.Column dataIndex="Expression_28"
                title={<>
                  <Form.Item name='Relationship' valuePropName='checked'>
                    <Checkbox onChange={e => this.handleSearch(e.target.checked ? 1 : 0, 'Relationship')}></Checkbox>
                  </Form.Item>
                  続
                </>}
                render={(text, record) => <div style={{ color: Color(record.Expression_51).Foreground }}>{record.Expression_20 ? text : ''}</div>}
              />
              <Table.Column dataIndex="Expression_29"
                title={<>
                  <Form.Item name='HospitalOut' valuePropName='checked'>
                    <Checkbox onChange={e => this.handleSearch(e.target.checked ? 1 : 0, 'HospitalOut')}></Checkbox>
                  </Form.Item>
                  院
                </>}
                render={(text, record) => <div style={{ color: Color(record.Expression_51).Foreground }}>{record.Expression_21 ? text : ''}</div>}
              />
              <Table.Column dataIndex="Expression_30"
                title={<>
                  <Form.Item name='Ampm' valuePropName='checked'>
                    <Checkbox onChange={e => this.handleSearch(e.target.checked ? 1 : 0, 'Ampm')}></Checkbox>
                  </Form.Item>
                  時
                </>}
                render={(text, record) => <div style={{ color: Color(record.Expression_51).Foreground }}>{record.Expression_22 ? text : ''}</div>}
              />
              <Table.Column dataIndex="Expression_31"
                title={<>
                  <Form.Item name='NTsugikenmi' valuePropName='checked'>
                    <Checkbox onChange={e => this.handleSearch(e.target.checked ? 1 : 0, 'NTsugikenmi')}></Checkbox>
                  </Form.Item>
                  n
                </>}
                render={(text, record) => <div style={{ color: Color(record.Expression_51).Foreground }}>{record.Expression_23 ? text : ''}</div>}
              />
              <Table.Column dataIndex="Expression_32"
                title={<>
                  <Form.Item name='Age' valuePropName='checked'>
                    <Checkbox onChange={e => this.handleSearch(e.target.checked ? 1 : 0, 'Age')}></Checkbox>
                  </Form.Item>
                  年
                </>}
                render={(text, record) => <div style={{ color: Color(record.Expression_51).Foreground }}>{record.Expression_24 ? text : ''}</div>}
              />
              <Table.Column dataIndex="Expression_33"
                title={<>
                  <Form.Item name='Other' valuePropName='checked'>
                    <Checkbox onChange={e => this.handleSearch(e.target.checked ? 1 : 0, 'Other')}></Checkbox>
                  </Form.Item>
                  他
                </>}
                render={(text, record) => <div style={{ color: Color(record.Expression_51).Foreground }}>{record.Expression_25 ? text : ''}</div>}
              />
              <Table.Column title="年齢" dataIndex="Expression_54" align='center' render={(text, record) => (
                <Tooltip title={record?.Expression_55}>
                  <div>{record.Expression_24 ? text : ''}</div>
                </Tooltip>
              )}
              />
              <Table.Column title="保険者" dataIndex="Expression_42" render={(text, record, index) => (
                <div style={{ textAlign: 'right', color: Color(record.Expression_51).Foreground }}>{text !== 0 ? text.toLocaleString() : ''}</div>
              )} />
              <Table.Column title="事業所" dataIndex="Expression_43" render={(text, record, index) => (
                <div style={{ textAlign: 'right', color: Color(record.Expression_51).Foreground }}>{text !== 0 ? text.toLocaleString() : ''}</div>
              )} />
              <Table.Column title="他団体" dataIndex="Expression_44" render={(text, record, index) => (
                <div style={{ textAlign: 'right', color: Color(record.Expression_51).Foreground }}>{text !== 0 ? text.toLocaleString() : ''}</div>
              )} />
              <Table.Column title="個　人" dataIndex="Expression_36" render={(text, record, index) => (
                <div style={{ textAlign: 'right', color: Color(record.Expression_51).Foreground }}>{text !== 0 ? text.toLocaleString() : ''}</div>
              )} />
              <Table.Column title="備考" dataIndex="Expression_52" />
              <Table.Column width={70} render={(text, record, index) => this.renderButton(record)} />
            </Table>

            <Form.Item style={{ float: 'right' }} className='mt-3' hidden={true}>
              <Space>
                <Button type="primary" onClick={() => (
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 1500,
                      component: (
                        <WS0605127_ContractLineItemDisplay
                          Li_ContractType={this.state.rowSelect.W1_contract_type}
                          Li_ContractOrgCode={this.state.rowSelect.W1_contract_org_cd}
                          Li_ContractStartDate={this.state.rowSelect.W1_contract_start_date}
                          Li_ContractNum={this.state.rowSelect.W1_contract_num}
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
                )}>契約内容</Button>
                <Button type="primary" htmlType='submit' disabled={true}>選　択</Button>
              </Space>
            </Form.Item>

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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0289012_ContractInfoInquiry);
