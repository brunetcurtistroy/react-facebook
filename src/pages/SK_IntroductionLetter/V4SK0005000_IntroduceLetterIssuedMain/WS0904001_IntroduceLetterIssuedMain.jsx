import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Radio, Dropdown, Menu, Row, Col, DatePicker, Space, Modal, message, Select, Spin, Table } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import WS2584019_PersonalInfoInquirySub from 'pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx';
import {
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import WS0898001_IntroduceLetterExtractMaintain from 'pages/SK_IntroductionLetter/V4SK0003000_IntroduceLetterExtract/WS0898001_IntroduceLetterExtractMaintain.jsx';
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import Color from "constants/Color";

import IssueList from './WS0904001_IntroduceLetterIssuedMain/IssueList';

import moment from 'moment';

import axios from 'configs/axios';

const dateFormat = 'YYYY/MM/DD';

class WS0904001_IntroduceLetterIssuedMain extends React.Component {
  formRef = React.createRef();
  tableRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '紹介状発行';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      screenData: {},
      rowSelect: {},
      isLoadingRedeploy: false,
      isLoadingInit: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.loadScreenData();
  }

  loadScreenData = () => {
    this.setState({ isLoadingInit: true });
    axios.get('/api/introduce-letter-issued-main/introduce-letter-issued-main/get-screen-data')
      .then(res => {
        this.setState({
          screenData: res.data,
        });
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingInit: false }));
  }

  showPersonalInfoInquirySub = (id) => { 
    let title = '個人情報照会SUB' + ' [' + id + ']'
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <Card title={title}>
            <WS2584019_PersonalInfoInquirySub
              Li_personal_num={id}
              onClickedSelect={(obj) => {
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
    });
  }

  onFinish = (values) => {
    console.log("value", values);
  }

  handleSearch() {
    this.setState({ isLoadingSearch: true });

    const values = this.formRef.current.getFieldsValue();

    axios.post('/api/introduce-letter-issued-main/introduce-letter-issued-main/display', {
      ...values,
    })
      .then(res => {
        this.loadTableData();
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingSearch: false }));
  }
  loadTableData = () => {
    this.setState({ isLoading: true });

    axios.get('/api/introduce-letter-issued-main/introduce-letter-issued-main/issue-list')
      .then(res => {
        if (res?.data) {
          let arrID = [];
          if (res.data.length > 0) {
            res.data.forEach(element => {
              if (element.W1_instruction_flg) arrID.push(element.id)
            });
          }
          this.setState({
            listID: arrID,
            mainSourceData: res.data,
            rowSelect: res.data.length > 0 ? res.data[0] : {}
          });
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  Print_F12 = () => {
    this.setState({ isLoadingSearch: true });

    const values = this.formRef.current.getFieldsValue();

    axios.post('/api/introduce-letter-issued-main/introduce-letter-issued-main/print-f12', {
      ...values,
    })
      .then(res => {
        this.tableRef.current.loadTableData();
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingSearch: false }));
  }
  renderMenuBar = () => (
    <Space>
      <Button type='text'>編集(E)</Button>
      <Dropdown
        trigger='click'
        overlay={() => (
          <Menu>
            <Menu.Item>オプション情報</Menu.Item>
            <Menu.Item>ユーザー定義</Menu.Item>
          </Menu>
        )}
      >
        <Button type='text'>設定 (O)</Button>
      </Dropdown>
      <Button type='text'>ﾍﾙﾌﾟ (H)</Button>
      <Button type='text' onClick={() => {
        this.callModal(
          {
            Li_MenuOption: '',
            Li_PersonalNum: this.state.rowSelect.W1_person_id,
            Li_ReserveNum: this.state.rowSelect.W1_reserve_num
          },
          '70%', 'WS0898001_IntroduceLetterExtractMaintain'
        )
      }}>抽出保守</Button>
      <Button type='text' onClick={() => {
        this.callModal({ Li_Ctxgetname: this.state.initParams.Li_Ctxgetname }, '70%', 'WS0948001_BillingAggregationProcess')
      }}>印刷</Button>
    </Space>
  )

  Change = (params) => {
    axios.post('/api/introduce-letter-issued-main/introduce-letter-issued-main/w1-instruction-flg', {
      ...params,
    })
      .then(() => this.loadTableData())
  }

  ReturnComponent = (component) => {
    let components = {
      WS0898001_IntroduceLetterExtractMaintain,
      WS2583001_ConsultInquirySub,
      WS2584019_PersonalInfoInquirySub
    };
    return components[component];
  }

  callModal = (props, width, nameScreen) => {
    let Component = this.ReturnComponent(nameScreen);
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: width,
        component: (
          <Component
            {...props}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  renderRightClick = (record) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            this.callModal({ Li_MenuOption: '', Li_PersonalNum: record.W1_person_id, Li_ReserveNum: record.W1_reserve_num }, '70%', 'WS0898001_IntroduceLetterExtractMaintain')
          }}
        >変更</Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            this.callModal({ Li_ReserveNum: record.W1_reserve_num }, '70%', 'WS2583001_ConsultInquirySub')
          }}
        >照会</Menu.Item>
      </Menu >
    )
  }

  render() {
    return (
      <div className="consult-info-reconstruction">

        <Form
          ref={this.formRef}
          initialValues={{
            GdateFChar: moment(moment().format(dateFormat)), GdateTChar: moment(moment().format(dateFormat)),
            ReceiptNumT: 999999,
            IssuingDivision: 0,
            FacilityType: this.state.screenData.FacilityType_1
          }}
          onFinish={this.onFinish}
        >
          {this.renderMenuBar()}
          <Input.Group style={{ display: 'none' }}>
            {/* <Form.Item name="ContractType"><Input /></Form.Item>
            <Form.Item name="ContractOrgCode"><Input /></Form.Item>
            <Form.Item name="ContractStartDate"><Input /></Form.Item>
            <Form.Item name="ContractNum"><Input /></Form.Item> */}
          </Input.Group>
          <Row>
            <Col span={7}>
              <Spin spinning={this.state.isLoadingInit}>
                <Card className='mb-3' style={{ marginRight: '1rem' }}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item name="GdateFChar" label="受診日" >
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <span>～</span>
                    </Col>
                    <Col span={10}>
                      <Form.Item name="GdateTChar" label=" " >
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item name="ReceiptNumF" label="受付No" >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <span>～</span>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="ReceiptNumT" label=" " >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="FacilityType" label="施設">
                    <Select>
                      {this.state.screenData.FacilityType_List?.map(value => (
                        <Select.Option value={value.Linked}>{value.Display}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="IssuingDivision">
                    <Radio.Group>
                      <Radio value={0}>
                        全て
                      </Radio>
                      <Radio value={1}>
                        検査のみ
                      </Radio>
                      <Radio value={2}>
                        請求のみ
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item style={{ float: 'right' }}>
                    <Space>
                      <Button icon={<SearchOutlined />} onClick={this.handleSearch} loading={this.state.isLoadingSearch}>検　索</Button>
                    </Space>
                  </Form.Item>
                </Card>
                <Form.Item style={{ float: 'right', marginRight: '1rem' }}>
                  <Button type="primary" onClick={this.Print_F12} loading={this.state.isLoadingSearch}>印刷</Button>
                </Form.Item>
              </Spin>
            </Col>
            <Col span={17}>
              <div>
                <Table
                  dataSource={this.state.mainSourceData}
                  rowKey={(record) => record.id}
                  size="small"
                  loading={this.state.isLoading}
                  rowSelection={{
                    selectedRowKeys: this.state.listID,
                    onChange: (selectedRowKeys, selectedRows) => this.setState({ listID: selectedRowKeys }),
                    onSelect: (record, selected) => this.Change({ id: record.id, W1_instruction_flg: selected ? 1 : 0 }),
                    onSelectAll: (selected) => this.Change({ W1_instruction_flg: selected ? 1 : 0 })
                  }}
                  onRow={(record, rowIndex) => ({
                    onClick: event => this.setState({ rowSelect: record }),
                  })}
                >
                  <Table.Column title="受診日" dataIndex="W1_consult_date"
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record.Expression_11)?.Foreground }}>{value}</div>
                      )
                    }} />
                  <Table.Column title="受付No" dataIndex="W1_receipt_no"
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record.Expression_11)?.Foreground, textAlign: 'right' }}>{value}</div>
                      )
                    }} />
                  <Table.Column title="個人番号" dataIndex="personal_number_id"
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record.Expression_11)?.Foreground, textAlign: 'right' }}>{value}</div>
                      )
                    }} />
                  <Table.Column title="メモ" dataIndex="Expression_16"
                    render={(text, record) => {
                      let icon = null;
                      switch (record.Expression_16) {
                        case 1:
                          icon = (
                            <InfoCircleOutlined
                              style={{ fontSize: 20, color: "#1890ff" }}
                            />
                          );

                        case 3:
                          icon = (
                            <WarningOutlined
                              style={{ fontSize: 20, color: "#faad14" }}
                            />
                          );

                        case 5:
                          icon = (
                            <CloseCircleOutlined
                              style={{ fontSize: 20, color: "#ff4d4f" }}
                            />
                          );

                        default:
                          icon = <MoreOutlined style={{ fontSize: 20 }} />;
                      }
                      return (<Button
                        style={{ color: Color(record.Expression_11)?.Foreground }}
                        onClick={() => this.callModal({ Li_PersonalNum: record.personal_number_id }, '70%', 'WS2584019_PersonalInfoInquirySub')}
                        icon={icon}
                      />);
                    }}
                  />
                  <Table.Column title="氏名" dataIndex="kanji_name"
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record.Expression_11)?.Foreground }}>{value}</div>
                      )
                    }} />
                  <Table.Column title="診療科"
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record.Expression_11)?.Foreground }}>{record.W1_depart + " - " + record.department_name}</div>
                      )
                    }} />
                  <Table.Column title="契約情報" render={(value, record, index) => {
                    return (
                      <div style={{ color: Color(record.Expression_11)?.Foreground }}>{record.medical_exam_course + "  " + record.contract_short_name}</div>
                    )
                  }} />
                  <Table.Column title="発行" dataIndex="Expresstion_13"
                    render={(value, record, index) => {
                      return (
                        <div style={{ color: Color(record.Expression_11)?.Foreground }}>{value}</div>
                      )
                    }} />
                  <Table.Column width={60} render={(value, record) => (
                    <Dropdown.Button
                      trigger='click'
                      size='small'
                      icon={<MoreOutlined />}
                      overlay={() => this.renderRightClick(record)}
                    ></Dropdown.Button>
                  )}
                  />
                </Table>
              </div>
            </Col>
          </Row>
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

export default WS0904001_IntroduceLetterIssuedMain;
