/* eslint-disable no-useless-concat */
import { CloseCircleOutlined, InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Modal, Row, Space, Table } from "antd";
import Color from "constants/Color";
import moment from "moment-timezone";
import WS0605127_ContractLineItemDisplay from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay.jsx';
import WS0251003_OfficeSpecialDisplay from 'pages/BS_BasicInfo/V4MS0003300_PersonalNumberMigration/WS0251003_OfficeSpecialDisplay.jsx';
import WS0802001_PrintInstruction from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0802001_PrintInstruction.jsx';
import WS2637001_OverallResultDisplayInput from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637001_OverallResultDisplayInput.jsx';
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import VisitHistoricalQueryAction from 'redux/basicInfo/PersonalNumberMigration/VisitHistoricalQuery.action';
import WS2584019_PersonalInfoInquirySub from '../../KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub';
import WS0252001_OfficeSpecialMaintain from "./WS0252001_OfficeSpecialMaintain";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0264001_VisitHistoricalQuery extends React.Component {
  static propTypes = {
    Li_PersonalNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '受診履歴照会';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      data: '',
      isLoading: true,
      selectedRow: {},
      rowSelect: {},
      importance: null,
      index: null
    };
  }
  componentDidMount() {
    VisitHistoricalQueryAction.getVisitHistoricalQueryAPIAction({ Li_PersonalNum: this.props.Li_PersonalNum }).then(res => {
      if (res) {
        this.setState({
          data: res,
          selectedRow: res?.ResultTable?.[0]
        })
        if (res.ResultTable.length > 0) {
          this.formRef?.current?.setFieldsValue({
            ResultTable: res.ResultTable
          })
          this.forceUpdate()
        }
      }
    }).finally(() => this.setState({ isLoading: false }))
  }
  checkIcon(code) {
    var icon = ""
    switch (code) {
      case 1:
        icon = <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
        break;
      case 3:
        icon = <WarningOutlined style={{ color: '#faad14', fontSize: '20px' }} />
        break;
      case 5:
        icon = <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />
        break;
      default: icon = (
        <span style={{
          background: '#F0F0F0', width: '20px', height: '20px',
          display: 'inline-block', borderRadius: '3px',
        }}></span>);
        break;
    }
    return icon;
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      VisitHistoricalQueryAction.getVisitHistoricalQueryAPIAction({ Li_PersonalNum: this.props.Li_PersonalNum })
        .then(res => {
          if (res) {
            this.setState({ data: res, selectedRow: res?.ResultTable?.[0] })
            this.formRef.current.setFieldsValue({
              ResultTable: res.ResultTable
            })
          }
        })
        .finally(() => this.setState({ isLoading: false }))
    }
  }

  showModalOffice(text, record, index) {
    if (record.Expression_11 === null) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: '60%',
          component: (
            <WS0252001_OfficeSpecialMaintain
              Li_OfficeCode={record.office_code}
              Li_BranchStoreCode={record.branch_store_code}
              onChangeData={(output) => {
                this.setState({
                  importance: output?.importance,
                  index: index
                })
              }}

              onFinishScreen={(output) => {
                this.setState({
                  importance: output?.importance
                })
                this.ChangeImportance(output?.importance, index)
                this.closeModal()
              }}
            />
          ),
        }
      })
    } else {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: '60%',
          component: (
            <WS0251003_OfficeSpecialDisplay
              Li_OfficeCode={record.office_code}
              Li_BranchStoreCode={record.branch_store_code}
              onChangeData={(output) => {
                this.setState({
                  importance: output?.importance,
                  index: index
                })
              }}

              onFinishScreen={(output) => {
                this.setState({
                  importance: output?.importance,
                  index: index
                })
                this.closeModal()
              }}
            />
          ),
        }
      })
    }

  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  ShowWS0605127_ContractLineItemDisplay() {
    console.log(this.state.rowSelect)
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1600,
        component: (
          <WS0605127_ContractLineItemDisplay
            Li_ContractType={this.state.rowSelect.contract_type}
            Li_ContractOrgCode={this.state.rowSelect.contract_organization_code}
            Li_ContractStartDate={this.state.rowSelect.contract_start_date_on}
            Li_ContractNum={this.state.rowSelect.contract_number}
            Li_MenuOption={""}
            Li_MenuAdminRights={""}
            Li_MenuAuthority={""}
            Li_SubjectNotBeChangedMode={""}
            Li_CourseLevel={""}
            Li_ReserveNum={""}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  ShowWS2637001_OverallResultDisplayInput() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1800,
        component: (
          <WS2637001_OverallResultDisplayInput
            Li_ContractType={""}
            Li_ContractOrgCode={""}
            Li_ContractStartDate={""}
            Li_ContractNum={""}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  ShowWS0802001_PrintInstruction() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS0802001_PrintInstruction
            Li_CourseLevel={""}
            Li_ReserveNum={""}
            Li_NormalAndOrgs={""}
            Li_Parameters={""}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      }
    })
  }
  ChangeImportance(importanceCode, index) {
    if (importanceCode) {
      const path = ["ResultTable", index, 'Expression_11']
      this.formRef.current?.setFields([{
        name: path,
        value: importanceCode
      }])
      this.forceUpdate()
    }
  }
  render() {
    return (
      <div className="visit-historical-query p-td">
        <Card
          title={<>
            <Row><label>受診履歴照会</label><br /><br /></Row>
            <Row>
              <Space>
                <Button onClick={() => this.ShowWS0605127_ContractLineItemDisplay()} disabled={!this.state.rowSelect.id}>契約照会</Button>
                <Button onClick={() => this.ShowWS2637001_OverallResultDisplayInput()} disabled={!this.state.rowSelect.id}>結果入力</Button>
                <Button onClick={() => this.ShowWS0802001_PrintInstruction()} disabled={!this.state.rowSelect.id}>結果印刷</Button>
              </Space>
            </Row></>}
        >
          <Form ref={this.formRef} >
            <Row className='mb-3'>
              <Col span={8} offset={4}>
                <Space>
                  <span>{this.state.data?.Li_PersonalNum}</span>
                  <span style={{ cursor: 'pointer', display: this.state.data ? '' : 'none' }}
                    onClick={() => {
                      let title = '個人情報照会SUB' + ' [' + this.props.Li_PersonalNum + ']'
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '80%',
                          component: (
                            <Card title={title}>
                              <WS2584019_PersonalInfoInquirySub
                                Li_PersonalNum={this.props.Li_PersonalNum}
                                onFinishScreen={() => {
                                  this.closeModal()
                                }}
                              />
                            </Card>
                          ),
                        }
                      })
                    }}>
                    {this.checkIcon(this.state.data.Expression_10)}
                  </span>
                  <span>{this.state.data?.KanjiName}</span>
                </Space>
              </Col>
              <Col span={8}>
                <Space>
                  <span style={{
                    background: this.state.data.Expression_14 === '男性' ? '#0000FF' : '#FF0000', color: 'white',
                    padding: '3px 5px', display: this.state.data.Expression_14 ? '' : 'none'
                  }}
                  >
                    {this.state.data?.Expression_14}
                  </span>
                  <div>{moment(this.state.data?.DateOfBirth).format('NNNNy/MM/DD') === "Invalid date" ? "" : moment(this.state.data?.DateOfBirth).format('NNNNy/MM/DD')}</div>
                  <div >&emsp;{this.state.data?.Age} {this.state.data?.Age ? "歳" : ""}</div>
                </Space>
              </Col>
            </Row>
            <Table
              dataSource={this.formRef.current ? this.formRef.current.getFieldValue('ResultTable') : []}
              loading={this.state.isLoading} size="small"
              pagination={false} bordered={true}
              rowKey={(record) => record.id}
              rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
              // scroll={{y: '90vh'}}
              // rowSelection={{
              //   type: 'radio',
              //   onChange: async(selectedRowKeys, selectedRows) => {
              //       await this.setState({
              //         selectedRow: selectedRows[0]
              //       })
              //   }
              // }} 
              onRow={(record, rowIndex) => {
                return {
                  onDoubleClick: () => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 600,
                        component: (
                          <WS0802001_PrintInstruction
                            Li_CourseLevel={this.state.data?.course_level}
                            Li_ReserveNum={this.state.data?.reservation_number}
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                  },
                  onClick: () => this.setState({ rowSelect: record })
                };
              }}
            >
              <Table.Column title='受診日' dataIndex='visit_date_on' render={(value, record, index) => {
                return <span>{value?.replace(/-/g, "/")}</span>
              }} />
              <Table.Column title='受付No' dataIndex='receipt_number' render={(value) => (
                <div style={{ textAlign: 'right' }} >{value}</div>
              )} />
              <Table.Column title='状態' dataIndex='Expression_15' align='center' render={(text, record) => (
                <span style={{ background: Color(record.Expression_16).Background, color: 'white', padding: '3px 5px' }}>
                  {text}
                </span>
              )} />
              <Table.Column title='時間' dataIndex='period_time' />
              <Table.Column title='受診ｺｰｽ' dataIndex='visit_course' render={(text, row) => (
                <span>{text}&emsp;{row?.contract_short_name}</span>
              )} />
              <Table.Column title='事業所' dataIndex='office_kanji_name' render={(text, record, index) => {
                let icon = ""
                switch (record?.Expression_11) {
                  case 1:
                    icon = (<InfoCircleOutlined style={{ color: '#1890ff', marginRight: '10px', float: 'right', fontSize: '20px' }} onClick={() => this.showModalOffice(text, record, index)} />)
                    break;
                  case 3:
                    icon = (<WarningOutlined style={{ color: '#faad14', marginRight: '10px', float: 'right', fontSize: '20px' }} onClick={() => this.showModalOffice(text, record, index)} />)
                    break;
                  case 5:
                    icon = (<CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: '10px', float: 'right', fontSize: '20px' }} onClick={() => this.showModalOffice(text, record, index)} />)
                    break;
                  default: icon = <span style={{
                    cursor: 'pointer', background: '#F0F0F0', width: '20px', height: '20px',
                    display: 'inline-block', borderRadius: '3px', float: 'right', marginRight: '10px'
                  }}
                    onClick={() => this.showModalOffice(text, record, index)}></span>;
                    break;
                };
                return (
                  <div>{text} {icon}</div>
                )
              }} />
              <Table.Column title='施設' dataIndex='facility_name' />
              <Table.Column title='判定' dataIndex='comprehensive_judgment' />
              <Table.Column title='協会受付番号' dataIndex='association_acceptance_number' render={(value, record, index) => (
                <span>{parseInt(value) === 0 ? "" : value}</span>
              )} />
            </Table>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            this.ChangeImportance(this.state.importance, this.state.index)
            this.closeModal()
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0264001_VisitHistoricalQuery);
