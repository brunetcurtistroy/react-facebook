import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";
import { InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, Table, Row, Space, Modal, message, Spin } from "antd";
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS0432001_CsvConfirm from 'pages/TO_StatisticalServices/V2MS0140_PersonalInfoCsvOutput/WS0432001_CsvConfirm.jsx';
import DispatchManageAction from 'redux/ResultOutput/DispatchManage/DispatchManage.action'
import WS2585001_OfficeInfoInquirySub from "pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub";
import WS1512001_OptionalInfoMaintain from "pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512001_OptionalInfoMaintain";
import WS0256001_ProgressSet from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0256001_ProgressSet";
import WS2977026_ReservesSelectScreen from "./WS2977026_ReservesSelectScreen";
import moment from "moment-timezone";
import WS0061012_CheckYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061012_CheckYes";
import { download_file } from "helpers/CommonHelpers";
class WS2977001_DispatchManage extends React.Component {
  static propTypes = {
    Li_MenuOption: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '発送管理';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataSource: [],
      isLoadingTable: false,
      selectedRowKeys: [],
      selectedRow: {},

      isLoadingPage: false,

      closeModalReserveSelect: false,
      PersonalId: ''

      // StsReshipment: '',
      // PeriodPast: '',
      // PeriodFuture: '',
      // DispatchManageType: '',
      // Csv: ''
    };
  }

  componentDidMount() {
    this.GetScreenData()
  }

  componentDidUpdate(PreV) {
    if (PreV !== this.props) {
      this.GetScreenData()
    }
  }

  GetScreenData() {
    let params = {
      Li_MenuOption: this.props.Li_MenuOption
    }
    this.setState({ isLoadingPage: true })
    DispatchManageAction.getScreenData(params)
      .then((res) => {
        this.setState({ isLoadingPage: false })
        this.formRef.current?.setFieldsValue({
          name: res?.name,
          StsReshipment: res?.StsReshipment,
          PeriodPast: res?.PeriodPast,
          PeriodFuture: res?.PeriodFuture,
          DispatchManageType: res?.DispatchManageType,
          Csv: res?.Csv,
          CsvName: res?.name + '.csv'
        })
      })
      .finally(() => this.setState({ isLoadingPage: false }))
  }

  changePersonalId() {
    let params = {
      PersonalId: this.formRef.current?.getFieldValue('PersonalId')
    }

    this.setState({ isLoadingPage: true })
    DispatchManageAction.changePersonalId(params)
      .then((res) => {
        if (!this.formRef.current?.getFieldValue('kanji_name')) {
          this.formRef.current?.setFieldsValue({
            kanji_name: res?.data?.kanji_name
          })
        }
        this.personalConfirm()
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

  personalConfirm() {
    let params = {
      ...this.formRef.current?.getFieldValue()
    }

    DispatchManageAction.personalConfirm(params)
      .then((res) => {
        this.setState({ isLoadingPage: false })
        if (res.data.action === 'WS2977026_ReservesSelectScreen') {
          this.showMHReservesSelectScreen()
        } else {
          this.getDataSub()
        }
      })
      .catch((err) => {
        this.setState({ isLoadingPage: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        } else {
          if (res.data.message === "未発送の予約情報がありません。" || res.data.message === "個人IDが存在しません。") {
            this.getDataSub()
          }
          message.error(res.data.message);
        }
      })
  }

  personalConfirm_2() {
    let params = {
      ReadingPosition: this.formRef.current?.getFieldValue('ReadingPosition')
    }
    this.setState({ isLoadingPage: true })

    DispatchManageAction.personalConfirm_2(params)
      .then((res) => {
        this.setState({
          isLoadingPage: false
        })
        this.getDataSub()
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

  getDataSub() {
    this.setState({ isLoadingTable: true })
    DispatchManageAction.getDataSub()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          selectedRow: res && res.length > 0 ? res[0] : {},
          isLoadingTable: false
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  updateDataSub(record) {
    let params = {
      id: record.id,
      W1_remark: record.W1_remark
    }

    DispatchManageAction.updateDataSub(params)
      .then((res) => {

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

  deleteRecord(id) {
    let params = {
      id: id
    }

    DispatchManageAction.deleteRecord(params)
      .then((res) => {
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

  CsvOutput() {
    let params = {
      Csv: this.formRef.current?.getFieldValue('CsvName')
    }

    DispatchManageAction.CsvOutput(params)
      .then((res) => {
        download_file(res);
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

  ReadingInfoUpdateBtn() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 370,
        component: (
          <WS0061012_CheckYes
            Li_Message={'発送管理の進捗を更新しました。'}
            onFinishScreen={(output) => {
              this.ReadingInfoUpdate()
              this.closeModal()
            }}
          />)
      }
    })
  }

  ReadingInfoUpdate() {
    let params = {
      DispatchManageType: this.formRef.current?.getFieldValue('DispatchManageType')
    }

    DispatchManageAction.ReadingInfoUpdate(params)
      .then((res) => {
        this.getDataSub()
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

  findIndexByID = (recordID) => {
    return this.state.dataSource.findIndex((item) => recordID === item.id);
  };

  changeRemark(index, value) {
    let data = [...this.state.dataSource]

    data[index]['W1_remark'] = value
    this.setState({ dataSource: data })

    this.updateDataSub(data[index])
  }

  showMHReservesSelectScreen() {
    this.setState({ closeModalReserveSelect: true })
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 500,
        component: (<WS2977026_ReservesSelectScreen
          Li_PersonalId={this.formRef.current?.getFieldValue('PersonalId')}
          onFinishScreen={(output) => {
            this.personalConfirm_2()
            this.closeModal()
          }}
        />)
      }
    })
  }

  onFinish(values) {

  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }

  render() {
    return (
      <div className="dispatch-manage p-td">
        <Spin spinning={this.state.isLoadingPage}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="ReserveNum"><Input /></Form.Item>
              <Form.Item name="PeriodPast"><Input /></Form.Item>
              <Form.Item name="PeriodFuture"><Input /></Form.Item>
              <Form.Item name="StsPersonalIdExists"><Input /></Form.Item>
              <Form.Item name="ReadingPosition"><Input /></Form.Item>
              <Form.Item name="DispatchManageType"><Input /></Form.Item>
              <Form.Item name="Csv"><Input /></Form.Item>
              <Form.Item name="StsConfirm"><Input /></Form.Item>
              <Form.Item name="StsReshipment"><Input /></Form.Item>
              <Form.Item name="CsvButton"><Input /></Form.Item>
            </div>
            <Card title="発送管理" className="mb-2">
              <Space>
                <Button
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '80%',
                        component: (<WS1512001_OptionalInfoMaintain
                          onFinishScreen={(output) => {
                            this.closeModal()
                          }}
                        />)
                      }
                    })
                  }}
                >ｵﾌﾟｼｮﾝ情報</Button>
                <Button
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '90%',
                        component: (<WS0256001_ProgressSet
                          Li_MenuOption={''}
                          Lio_ItemCodeList={''}
                          Lio_ItemNameList={''}
                          onFinishScreen={(output) => {
                            this.closeModal()
                          }}
                        />)
                      }
                    })
                  }}
                >進捗状況</Button>
              </Space>
              <hr style={{ margin: '15px 0' }} />
              <Row>
                <Form.Item name="PersonalId" style={{ marginBottom: '0px', width: 150 }} >
                  <Input.Search
                    style={{ textAlign: 'right' }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '80%',
                          component: (
                            <WS0248001_PersonalInfoSearchQuery
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  PersonalId: output.Lo_PersonalNumId,
                                  kanji_name: output.recordData.kanji_name
                                })
                                this.setState({
                                  PersonalId: output.Lo_PersonalNumId,
                                })
                                this.changePersonalId()
                                this.closeModal()
                              }}
                            />)
                        }
                      })
                    }}
                    onBlur={(e) => {
                      let PersonalId = this.formRef.current?.getFieldValue('PersonalId')
                      if (PersonalId !== this.state.PersonalId) {
                        this.setState({
                          PersonalId: PersonalId
                        })
                        if (PersonalId) {
                          this.formRef.current?.setFieldsValue({
                            kanji_name: ''
                          })
                          this.changePersonalId()
                        } else {
                          this.formRef.current?.setFieldsValue({
                            kanji_name: ''
                          })
                        }
                      }
                    }}
                  />
                </Form.Item>
                <span style={{ marginLeft: '0.5em', width: 250 }}>{this.formRef.current?.getFieldValue("kanji_name")} </span>
                <span style={{ fontWeight: 'bold' }}>{this.formRef.current?.getFieldValue("name")}</span>
              </Row>
              <Space style={{ float: 'right', marginTop: '1em', }}>
                <Button type="primary"
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 500,
                        component: (<WS0432001_CsvConfirm
                          Lio_Output={this.formRef.current.getFieldValue("CsvName")}
                          onFinishScreen={(output) => {
                            if (output.Lo_StsOutput) {
                              this.formRef.current.setFieldsValue({
                                CsvName: output.Lio_Output,
                                StsConfirm: output.Lo_StsOutput
                              })
                              this.CsvOutput()
                            }
                            this.closeModal()
                          }}
                        />)
                      }
                    })
                  }} >CSV</Button>
                <Button type="primary"
                  onClick={() => {
                    this.ReadingInfoUpdateBtn()
                  }} >更新</Button>
              </Space>
            </Card>
            <Card className="mb-2">
              <Table
                size='small'
                dataSource={this.state.dataSource}
                loading={this.state.isLoadingTable}
                pagination={true}
                bordered
                rowKey={(record) => record.id}
                scroll={{ x: 700 }}
              >
                <Table.Column title="受診日" dataIndex="visit_date_on" width={90}
                  render={(value, record, index) => {
                    return (
                      <div>{value !== '0000/00/00' ? moment(value)?.format('YYYY/MM/DD') : ''}  </div>
                    )
                  }}
                />
                <Table.Column title="個人番号" dataIndex="personal_number_id" width={70}
                  render={(value, record, index) => {
                    return (
                      <div style={{ textAlign: 'right' }}>{value}  </div>
                    )
                  }}
                />
                <Table.Column title="氏&emsp;名" dataIndex="kanji_name" />
                <Table.Column title="コード" dataIndex="office_code" width={70}
                  render={(value, record, index) => {
                    return (
                      <div style={{ textAlign: 'right' }}>{value}  </div>
                    )
                  }} />
                <Table.Column title="ﾒﾓ" dataIndex="InquiryButton" width={40} align='center'
                  render={(value, record, index) => {
                    let icon = null;
                    switch (record.InquiryButton) {
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
                    return (<div style={{ cursor: 'pointer' }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '90%',
                            component: (
                              <WS2585001_OfficeInfoInquirySub
                                Li_OfficeCode={record.office_code}
                              />
                            ),
                          },
                        });
                      }} >{icon}</div>)
                  }} />
                <Table.Column title="事業所名" dataIndex="office_kanji_name" />
                <Table.Column title="契　約　名　称" dataIndex="contract_short_name" />
                <Table.Column title="ｺｰｽ" dataIndex="visit_course" width={50} align='center'
                  render={(value, record, index) => {
                    return (
                      <span>{record.visit_course ? (record.visit_course?.toString().substr(0, 1) + '-' + record.visit_course?.toString().substr(1, 2)) : ''}</span>
                    )
                  }} />
                <Table.Column title="備考" dataIndex="W1_remark"
                  render={(value, record, index) => {
                    return (
                      <Input defaultValue={record.W1_remark}
                        onBlur={(e) => { this.changeRemark(this.findIndexByID(record.id), e.target.value) }}
                      />
                    )
                  }} />
                <Table.Column width={45} align='center'
                  render={(text, record, index) => {
                    return <div>
                      <Button size='small'
                        style={{ color: 'red' }}
                        icon={<DeleteOutlined />}
                        onClick={() => { this.deleteRecord(record.id) }}
                      >
                      </Button>
                    </div>;
                  }}
                />
              </Table>
            </Card>
          </Form>
        </Spin>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            if (this.state.closeModalReserveSelect) {
              this.personalConfirm_2()
            }

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2977001_DispatchManage);
