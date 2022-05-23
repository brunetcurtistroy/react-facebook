import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Table, Row, Col, Space, DatePicker, Modal, Dropdown, Menu, message } from "antd";
import { SearchOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, MoreOutlined } from "@ant-design/icons";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS2777001_EMedicalRecordsCourseBasicTypeSetting from 'pages/KS_CooperationRelated/YMGA0300_EMedicalRecordsBatchTransmission/WS2777001_EMedicalRecordsCourseBasicTypeSetting.jsx';
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS2780062_EMedicalRecordsBatchExtract from 'pages/KS_CooperationRelated/YMGA0300_EMedicalRecordsBatchTransmission/WS2780062_EMedicalRecordsBatchExtract.jsx';
import WS2779001_EMedicalRecordsTransmissionHeaderMaintain from 'pages/KS_CooperationRelated/YMGA0300_EMedicalRecordsBatchTransmission/WS2779001_EMedicalRecordsTransmissionHeaderMaintain.jsx';
import WS2778001_EMedicalRecordsInspectRequestMaintain from 'pages/KS_CooperationRelated/YMGA0610_EMedicalRecordsInspectRequestMaintain/WS2778001_EMedicalRecordsInspectRequestMaintain.jsx';
import WS2776001_EMedicalRecordsTransmissionHistory from 'pages/KS_CooperationRelated/YMGA0300_EMedicalRecordsBatchTransmission/WS2776001_EMedicalRecordsTransmissionHistory.jsx';
import WS2766004_SendingConfirm from 'pages/KS_CooperationRelated/YMGA0300_EMedicalRecordsBatchTransmission/WS2766004_SendingConfirm.jsx';
import moment from "moment";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import EMedicalRecordsBatchTransmissionAction from "redux/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsBatchTransmission.action";
import { debounce } from "lodash";
import WS2584019_PersonalInfoInquirySub from "../V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";
import WS2767001_EMedicalRecordsSingleTransmission from "../YMGA0310_EMedicalRecordsSingleTransmission/WS2767001_EMedicalRecordsSingleTransmission";
class WS2766001_EMedicalRecordsBatchTransmission extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '[E-カルテ]一括送信';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataSource: [],
      isLoadingTable: false,
      selectedRows: [],
      selectedRowKeys: [],
    };
  }

  onClickSearchBtn() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateFChar: this.formRef.current?.getFieldValue('DateFChar')?.format('YYYY/MM/DD'),
      DateTChar: this.formRef.current?.getFieldValue('DateTChar')?.format('YYYY/MM/DD')
    }

    this.setState({ isLoadingTable: true })

    EMedicalRecordsBatchTransmissionAction.searchBtn(params)
      .then((res) => {
        this.getDataBySearch()
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.setState({ isLoadingTable: false })
      });
  }

  getDataBySearch() {
    this.setState({ isLoadingTable: true })
    EMedicalRecordsBatchTransmissionAction.getDataBySearch()
      .then((res) => {
        let data = res ? res.filter((x) => x.W1_logic_01) : []
        this.setState({
          dataSource: res ? res : [],
          selectedRowKeys: data.map(x => x.id),
          selectedRows: data,
          isLoadingTable: false
        });
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  onSelectAll(value) {
    let params = {
      AllSelect: value ? 1 : 0
    }

    EMedicalRecordsBatchTransmissionAction.allSelect(params)
      .then((res) => {
        this.getDataBySearch()
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

  selectRecord(select, id) {
    let params = {
      id: id,
      SelectOne: select ? 1 : 0
    }

    EMedicalRecordsBatchTransmissionAction.selectRecord(params)
      .then((res) => {
        this.getDataBySearch()
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

  onTransmiss(StsConfirm, StsRetransmission) {
    let params = {
      StsConfirm: StsConfirm,
      StsRetransmission: StsRetransmission
    }

    EMedicalRecordsBatchTransmissionAction.batchTransmiss(params)
      .then((res) => {
        this.onClickSearchBtn()
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

  onFinish(values) { }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="e-medical-records-batch-transmission">
        <Card className="mb-3">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '90%',
                    component: (
                      <WS2777001_EMedicalRecordsCourseBasicTypeSetting
                        onFinishScreen={() => {
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}
            >コース群</Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '90%',
                    component: (
                      <WS2778001_EMedicalRecordsInspectRequestMaintain
                        onFinishScreen={() => {
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}
            >検査送信</Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '90%',
                    component: (
                      <WS2779001_EMedicalRecordsTransmissionHeaderMaintain
                        onFinishScreen={() => {
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}
            >ヘッダ送信</Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 400,
                    component: (
                      <WS2780062_EMedicalRecordsBatchExtract
                        onFinishScreen={() => {
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}
            >一括抽出</Button>
          </Space>
        </Card>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            TransmissionScheme: '',
            DateFChar: moment(new Date())
          }}
        >
          <Card className="mb-3">
            <Row gutter={24}>
              <Col style={{ width: '350px', marginRight: '30px' }}>
                <Space>
                  <Form.Item name="DateFChar" label="受 診 日">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} style={{ width: '120px' }} format='YYYY/MM/DD' />
                  </Form.Item>
                  <div>~</div>
                  <Form.Item name="DateTChar">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} style={{ width: '120px' }} format='YYYY/MM/DD' />
                  </Form.Item>
                </Space>
              </Col>
              <Col style={{ width: '160px' }}>
                <Form.Item name="TransmissionScheme" label="方法" style={{ alignItems: 'center', marginBottom: 0 }}>
                  <Select style={{ width: '90px' }}>
                    <Select.Option value=''>全て</Select.Option>
                    <Select.Option value={0}>臨床</Select.Option>
                    <Select.Option value={1}>画像</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col style={{ width: 'calc(100% - 540px)', textAlign: 'right' }}>
                <Button icon={<SearchOutlined />}
                  onClick={() => this.onClickSearchBtn()}
                >検　　索</Button>
              </Col>
            </Row>
          </Card>
          <Card>
            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={true}
              bordered
              scroll={{ y: 600 }}
              rowKey={(record) => record.id}
              rowSelection={{
                type: 'checkbox',
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows, nativeEvent) => {
                  this.selectRecord(selected, record.id)

                  // let arrTemp = [...this.state.selectedRowKeys];
                  // let arrTempRecord = [...this.state.selectedRows];
                  // let idx = arrTemp.indexOf(record.id);
                  // if (idx === -1) {
                  //   arrTemp.push(record.id);
                  //   arrTempRecord.push(record)
                  //   this.setState({
                  //     selectedRowKeys: arrTemp,
                  //     selectedRows: arrTempRecord
                  //   });
                  // } else {
                  //   arrTemp.splice(idx, 1);
                  //   arrTempRecord.splice(idx, 1);
                  //   this.setState({
                  //     selectedRowKeys: arrTemp,
                  //     selectedRows: arrTempRecord
                  //   });
                  // }
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                  this.onSelectAll(selected)
                  // if (selected) {
                  //   let arrTemp = this.state.dataSource.map(item => item.id);
                  //   let arrTempRecord = this.state.dataSource;
                  //   this.setState({
                  //     selectedRowKeys: arrTemp,
                  //     selectedRows: arrTempRecord
                  //   });
                  // } else {
                  //   this.setState({
                  //     selectedRowKeys: [],
                  //     selectedRows: []
                  //   });
                  // }
                }
              }}
            >
              <Table.Column title="受診日" dataIndex="Date" width={100} render={(value, record, index) => record.Date?.replaceAll('-', '/')} />
              <Table.Column title="個人番号" dataIndex="PersonalNum" width={80}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>{value}</div>
                  )
                }} />
              <Table.Column title="メモ" dataIndex="importance" width={40} align='center'
                render={(value, record, index) => {
                  let icon = "";
                  switch (record.importance) {
                    case 1: icon = (<InfoCircleOutlined style={{ color: "#1890ff" }} />);
                      break;
                    case 3: icon = (<WarningOutlined style={{ color: "#faad14" }} />);
                      break;
                    case 5: icon = (<CloseCircleOutlined style={{ color: "#ff4d4f" }} />);
                      break;
                    default: icon = (<Button size='small' icon={<MoreOutlined />}></Button>);
                  }
                  return (
                    <div style={{ textAlign: "center", cursor: 'pointer' }}
                      onClick={() => {
                        let title = '個人情報照会SUB' + ' [' + record.PersonalNum + ']'
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '90%',
                            component: (
                              <Card title={title}>
                                <WS2584019_PersonalInfoInquirySub
                                  Li_PersonalNum={record.PersonalNum}
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
              <Table.Column title="氏名" dataIndex="kanji_name" />
              <Table.Column title="ｺｰｽ" dataIndex="visit_course" width={60}
                render={(value, record, index) => record.visit_course?.toString().substr(0, 1) + '-' + record.visit_course?.toString().substr(1, 2)} />
              <Table.Column title="契約略称" dataIndex="contract_short_name" />
              <Table.Column title="方法" dataIndex="Expression_15" width={70} />
              <Table.Column width={60}
                render={(value, record) => {
                  return (
                    <Dropdown
                      overlay={() => (
                        <Menu>
                          <Menu.Item key="選択"
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: "90%",
                                  visible: true,
                                  component: (
                                    <WS2767001_EMedicalRecordsSingleTransmission
                                      Li_CourseLevel={''}
                                      Li_ReserveNum={record.W1_reserve_num ? record.W1_reserve_num : ''}
                                      Li_PersonalNum={""}
                                      Li_TransmissionMethod={this.formRef.current?.getFieldValue('TransmissionScheme')}
                                      onFinishScreen={() => {
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          >
                            選択
                          </Menu.Item>
                          <Menu.Item key="照会"
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: "90%",
                                  visible: true,
                                  component: (
                                    <WS2583001_ConsultInquirySub
                                      Li_ReserveNum={record.W1_reserve_num ? record.W1_reserve_num : ''}
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
                        </Menu>
                      )}
                    >
                      <Button size='middle' icon={<MoreOutlined />}></Button>
                    </Dropdown>
                  );
                }}
              />
            </Table>

            <Row style={{ marginTop: '1em' }}>
              <Col span={5} style={{ textAlign: 'right' }} offset={15} >
                <Form.Item name="PersonalNum" label="個人番号" style={{ marginBottom: 0, alignItems: 'center' }}>
                  <Input.Search maxLength={10}
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
                                  PersonalNum: output.Lo_PersonalNumId
                                })
                                this.onClickSearchBtn()
                                this.closeModal()
                              }}
                            />
                          ),
                        },
                      })
                    }}
                    onChange={debounce((e) => {
                      this.formRef.current?.setFieldsValue({ PersonalNum: e.target.value })
                      this.onClickSearchBtn()
                    }, 500)}
                  />
                </Form.Item>
              </Col>
              <Col span={4} style={{ textAlign: 'right', alignSelf: 'center' }}>
                <Space>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '90%',
                        component: (
                          <WS2776001_EMedicalRecordsTransmissionHistory
                            onFinishScreen={() => {
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                  }} >履歴</Button>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 300,
                        component: (
                          <WS2766004_SendingConfirm
                            onFinishScreen={(output) => {
                              if (output.Lo_StsSend) {
                                this.onTransmiss(output.Lo_StsSend, output.Lio_StsRetransmission)
                              }
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    })
                  }} >送信</Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2766001_EMedicalRecordsBatchTransmission);
