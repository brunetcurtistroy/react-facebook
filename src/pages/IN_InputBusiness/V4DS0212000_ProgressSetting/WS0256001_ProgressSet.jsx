import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Button, Table, Row, Col, Space, DatePicker, Modal, Menu, Dropdown, message, Spin, Tooltip } from "antd";

import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS2583001_ConsultInquirySub from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub.jsx';
import WS0061015_CheckYesNoNo from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo.jsx';

import { SearchOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import Checkbox from "antd/lib/checkbox/Checkbox";
import ProgressSetAction from "redux/InputBusiness/ProgressSetting/ProgressSet.action";
import moment from "moment";
import WS0535001_VisitsKeyInfoSetting from "./WS0535001_VisitsKeyInfoSetting";
import { getAllOfficeInfoRetrievalQueryAction } from "redux/basicInfo/OfficeInfoMaintain/OfficeInfoMaintain.action";
import Color from "constants/Color";
 
class WS0256001_ProgressSet extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_MenuOption: PropTypes.any,
    Lio_ItemCodeList: PropTypes.any,
    Lio_ItemNameList: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '進捗状況設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,
      KeyInfos: [],
      ItemNameList: [],

      CheckCol01: false,
      CheckCol02: false,
      CheckCol03: false,
      CheckCol04: false,
      CheckCol05: false,
      CheckCol06: false,

      SpecifiedDateChar: moment(new Date())?.format('YYYY/MM/DD'),

      paramsUpdate: [],

      dataOfficeInfoRetrievalQuery: [],
      isLoadingPage: false,

      initialValues: {
        DateFChar: moment(new Date()),
        DateTChar: moment(new Date()),
        BranchStoreCodeT: 99999,
        State: 4,
        KeyInfo: '',
        SpecifiedDateChar: moment(new Date()),
      }
    };
  }

  componentDidMount() {
    this.formRef.current.resetFields();
    this.getAllOfficeInfoRetrievalQuery()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.formRef.current.resetFields();
      this.getAllOfficeInfoRetrievalQuery()
    }
  }

  getScreenData() {
    this.setState({ isLoadingPage: true })
    ProgressSetAction.getScreenData()
      .then((res) => {
        this.setState({
          KeyInfos: res ? res.KeyInfo : []
        });

        let data = {
          ...this.state.initialValues,
          KeyInfo: res && res.KeyInfo.length > 0 ? this.state.KeyInfos[0]?.LinkedField : ''
        }
        this.formRef.current?.setFieldsValue(data);
        this.searchData();
      })
      .finally(() => this.setState({ isLoadingPage: false }))
  }

  getAllOfficeInfoRetrievalQuery() {
    let params = {
      Li_NewlyRegisteredPresence: '',
      OfficeCode: '',
      BranchStoreCodeF: '',
      Li_1HeadOffice2BranchShop: 1,
      KannaSearch: '',
      PhoneNumSearch: '',
      InsuranceCardSymbolSearch: '',
      SearchMethodsOp: 0
    }
    this.setState({ isLoadingPage: true })
    getAllOfficeInfoRetrievalQueryAction(params)
      .then((res) => {
        if (res) {
          this.setState({ dataOfficeInfoRetrievalQuery: res.data })
          this.getScreenData();
        }
      })
      .catch()
      .finally(() => this.setState({ isLoadingPage: false }))
  }

  getOfficeKanjiName(office_code) {
    let data = this.state.dataOfficeInfoRetrievalQuery.filter(x => x.office_code === office_code)
    if (data.length > 0) {
      this.formRef.current?.setFieldsValue({
        office_kanji_name: data[0]?.office_kanji_name,
        BranchStoreCodeF: data[0]?.branch_store_code,
        BranchStoreCodeFCopy: data[0]?.branch_store_code === 0 ? null : data[0]?.branch_store_code,
      })
    } else {
      this.formRef.current?.setFieldsValue({
        office_kanji_name: '',
        BranchStoreCodeF: null,
        BranchStoreCodeFCopy: null
      })
    }
  }

  searchData() {
    this.setState({
      isLoadingTable: true,
      ItemNameList: []
    });

    let params = {
      ...this.formRef.current?.getFieldValue(),
      dataTable: [],
      DateFChar: moment(this.formRef.current?.getFieldValue('DateFChar'))?.format("YYYY/MM/DD"),
      DateTChar: moment(this.formRef.current?.getFieldValue('DateTChar'))?.format("YYYY/MM/DD"),
    };

    ProgressSetAction.searchData(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res.ItemCodeList : [],
          ItemNameList: res ? res.ItemNameList : [],
          isLoadingTable: false,


          CheckCol01: false,
          CheckCol02: false,
          CheckCol03: false,
          CheckCol04: false,
          CheckCol05: false,
          CheckCol06: false,
        })
        this.formRef.current?.setFieldsValue({
          dataTable: res ? res.ItemCodeList : []
        })
      })
      .finally(() => { this.setState({ isLoadingTable: false }) })
  }

  updateData() {
    let params = {
      ...this.state.paramsUpdate
    };
    ProgressSetAction.updateData(params)
      .then((res) => {
        message.success('更新しました。!');
        this.setState({
          CheckCol01: false,
          CheckCol02: false,
          CheckCol03: false,
          CheckCol04: false,
          CheckCol05: false,
          CheckCol06: false,
        })
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

  setFieldParamsUpdate(reservation_number, code, check, date) {
    let lstParams = [...this.state.paramsUpdate];
    let index = lstParams.findIndex(x => x.reservation_number === reservation_number);

    let lstChecked = [
      {
        code: "001000",
        check: 0,
        date: ""
      },
      {
        code: "001500",
        check: 0,
        date: ""
      },
      {
        code: "002000",
        check: 0,
        date: ""
      },
      {
        code: "003000",
        check: 0,
        date: ""
      },
      {
        code: "003500",
        check: 0,
        date: ""
      },
      {
        code: "004000",
        check: 0,
        date: ""
      }
    ];

    if (index > -1) {
      lstChecked = lstParams[index].display;

      let indexdata = lstChecked.findIndex(x => x.code === code);
      lstChecked[indexdata]['check'] = check;
      lstChecked[indexdata]['date'] = date;

      lstParams[index]['display'] = lstChecked;
    } else {
      let indexdata = lstChecked.findIndex(x => x.code === code);
      lstChecked[indexdata]['check'] = check;
      lstChecked[indexdata]['date'] = date;

      lstParams.push({
        reservation_number: reservation_number,
        display: lstChecked
      })
    }

    this.setState({
      paramsUpdate: lstParams
    })
  }

  onFinish(values) {

  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });

    this.formRef.current?.setFieldsValue({
      dataTable: data
    });
  }

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
      <div className="progress-set">
        <Spin spinning={this.state.isLoadingPage}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              DateFChar: moment(new Date()),
              DateTChar: moment(new Date()),
              BranchStoreCodeT: 99999,
              BranchStoreCodeTCopy: 99999,
              State: 4,
              KeyInfo: this.state.KeyInfos.length > 0 ? this.state.KeyInfos[0]?.LinkedField : '',
              SpecifiedDateChar: moment(new Date()),
            }}
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="BranchStoreCodeF"><Input /></Form.Item>
              <Form.Item name="BranchStoreCodeT"><Input /></Form.Item>
            </div>

            <Card title="進捗状況設定" className="mb-3">
              <Row gutter={24}>
                <Col span={19}>
                  <Row style={{ margin: 0 }}>
                    <Space style={{ marginRight: '10px' }}>
                      <Form.Item name="DateFChar" label="&emsp;受診日" >
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" style={{ width: 112 }} allowClear={false} />
                      </Form.Item>

                      <Form.Item name="DateTChar" label="~" >
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" style={{ width: 112 }} allowClear={false} />
                      </Form.Item>
                    </Space>

                    <Space>
                      <Form.Item name="OfficeCode" label="&emsp;事業所" >
                        <Input.Search type="number" style={{ width: '120px' }} min={0}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1200,
                                component:
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    Lio_OfficeCode={this.formRef.current?.getFieldValue('OfficeCode')}
                                    Lio_BranchStoreCode={this.formRef.current?.getFieldValue('BranchStoreCodeF')}
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        OfficeCode: output.Lio_OfficeCode,
                                        BranchStoreCodeF: output.Lio_BranchStoreCode,
                                        BranchStoreCodeFCopy: output.Lio_BranchStoreCode === 0 ? null : output.Lio_BranchStoreCode,
                                        office_kanji_name: output.Lo_Kanji_Name
                                      })
                                      this.closeModal()
                                    }}
                                  />
                                ,
                              },
                            });
                          }}

                          onBlur={(event) => {
                            this.getOfficeKanjiName(event.target.value)
                          }}
                        />
                      </Form.Item>
                      <Form.Item name="BranchStoreCodeFCopy" >
                        <Input.Search type="number" style={{ width: '100px' }} min={0}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1200,
                                component:
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    Lio_OfficeCode={this.formRef.current?.getFieldValue('OfficeCode')}
                                    Lio_BranchStoreCode={this.formRef.current?.getFieldValue('BranchStoreCodeF')}
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        OfficeCode: output.Lio_OfficeCode,
                                        BranchStoreCodeF: output.Lio_BranchStoreCode,
                                        BranchStoreCodeFCopy: output.Lio_BranchStoreCode === 0 ? null : output.Lio_BranchStoreCode,
                                        office_kanji_name: output.Lo_Kanji_Name
                                      })
                                      this.closeModal()
                                    }}
                                  />
                                ,
                              },
                            });
                          }}
                          onBlur={(event) => {
                            this.formRef.current.setFieldsValue({
                              BranchStoreCodeF: event.target.value,
                              BranchStoreCodeFCopy: event.target.value == 0 ? null : event.target.value
                            })
                          }}
                        />
                      </Form.Item>

                      <Form.Item name="BranchStoreCodeTCopy" label="~" >
                        <Input.Search type="number" style={{ width: '100px' }} min={0}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1200,
                                component:
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    Lio_OfficeCode={this.formRef.current?.getFieldValue('OfficeCode')}
                                    Lio_BranchStoreCode={this.formRef.current?.getFieldValue('BranchStoreCodeT')}
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        OfficeCode: output.Lio_OfficeCode,
                                        BranchStoreCodeT: output.Lio_BranchStoreCode,
                                        BranchStoreCodeTCopy: output.Lio_BranchStoreCode === 0 ? null : output.Lio_BranchStoreCode,
                                        office_kanji_name: output.Lo_Kanji_Name
                                      })
                                      this.closeModal()
                                    }}
                                  />
                                ,
                              },
                            });
                          }}
                          onBlur={(event) => {
                            this.formRef.current.setFieldsValue({
                              BranchStoreCodeT: event.target.value,
                              BranchStoreCodeTCopy: event.target.value == 0 ? null : event.target.value
                            })
                          }}
                        />
                      </Form.Item>

                      <Form.Item name="office_kanji_name" >
                        <Input type="text" readOnly style={{ border: 'none' }} />
                      </Form.Item>
                    </Space>
                  </Row>
                  <Row gutter={24} style={{ margin: 0 }}>
                    <Form.Item name="PersonalNum" label="個人番号" >
                      <Input.Search type="number" style={{ width: 120 }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1200,
                              component:
                                <WS0248001_PersonalInfoSearchQuery
                                  Lo_PersonalNumId={this.formRef.current?.getFieldValue('PersonalNum')}
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      PersonalNum: output.recordData.personal_number_id,
                                      kanji_name: output.recordData.kanji_name
                                    })
                                    this.closeModal()
                                  }}
                                />
                              ,
                            },
                          });
                        }}
                        onChange={(event) => {
                          this.formRef.current.setFieldsValue({
                            PersonalNum: event.target.value,
                            kanji_name: ''
                          })
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="kanji_name" style={{ marginRight: 10 }} >
                      <Input type="text" readOnly style={{ border: 'none' }} />
                    </Form.Item>
                    <Form.Item name="State" label="状態" >
                      <Select style={{ width: '80px' }}>
                        <Select.Option value={0}>予約</Select.Option>
                        <Select.Option value={1}>受付</Select.Option>
                        <Select.Option value={2}>保留</Select.Option>
                        <Select.Option value={3}>待ち</Select.Option>
                        <Select.Option value={4}>全て</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="表示順" style={{ marginLeft: '10px' }}  >
                      <Space>
                        <Form.Item name="KeyInfo" style={{ marginBottom: 0 }}  >
                          <Select style={{ width: '150px' }}>
                            {this.state.KeyInfos.map((value, index) =>
                              <Select.Option key={index} value={value.LinkedField} >{value.DisplayField}</Select.Option>
                            )}
                          </Select>
                        </Form.Item>
                        <Button
                          style={{ color: '#42b10b', borderColor: '#42b10b', borderRadius: '5px', marginRight: '5px' }}
                          icon={<PlusOutlined />}
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component:
                                  <WS0535001_VisitsKeyInfoSetting
                                    onFinishScreen={() => {
                                      this.getScreenData()
                                      this.closeModal()
                                    }}
                                  />
                              }
                            })
                          }}
                        >
                        </Button>
                      </Space>
                    </Form.Item>
                    <Form.Item name="DisplayButton">
                      <Button icon={<SearchOutlined />} style={{ color: '#0f78da', marginLeft: '15px' }}
                        onClick={() => {
                          this.searchData()
                        }}
                      >検　　索</Button>
                    </Form.Item>
                  </Row>
                </Col>

                <Col span={5}>
                  <Row style={{
                    float: 'right',
                    width: '100%',
                    display: 'inline-block',
                  }}>
                    <Form.Item name="SpecifiedDateChar" label="指定日付" style={{ float: 'right' }}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD"
                        onChange={(value) => {
                          this.setState({ SpecifiedDateChar: moment(value)?.format('YYYY/MM/DD') })
                        }} />
                    </Form.Item>
                  </Row>
                  <Row style={{ float: 'right' }}>
                    <Button type="primary"
                      disabled={this.state.dataSource.length === 0}
                      onClick={() => { this.updateData() }}
                    >更新</Button>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Card >
              <Table
                loading={this.state.isLoadingTable}
                dataSource={this.state.dataSource}
                pagination={this.state.dataSource?.length > 10 ? true : false}
                rowKey={record => record.id}
                bordered={true}
                scroll={{ x: 1400 }}
                size="small"
              >
                <Table.Column title="受診日" dataIndex="visit_date_on" width={85}
                  render={(value, record, index) => {
                    return (
                      <div style={{ fontWeight: record.W1_logic_01 ? 'bold' : '' }}>{value !== '0000/00/00' ? moment(value)?.format('YYYY/MM/DD') : ''}</div>
                    )
                  }}
                />
                <Table.Column title="個人番号" dataIndex="personal_number_id" width={70}
                  render={(value, record, index) => {
                    return (
                      <div style={{ textAlign: 'right' }}> {value}
                      </div>
                    )
                  }} />
                <Table.Column title="氏　名" dataIndex="Expression_58" width={150}
                  render={(value, record, index) => {
                    return (
                      <div style={{ fontWeight: record.W1_logic_01 ? 'bold' : '' }}>{value}</div>
                    )
                  }}
                />
                <Table.Column title="事業所" dataIndex="office_kanji_name" width={150}
                  render={(value, record, index) => {
                    let title = '[事業所ｺｰﾄﾞ]' + '\xa0\xa0\xa0' + record.office_code + '-' + record.branch_store_code
                    return (
                      <Tooltip title={title}>
                        <div style={{ cursor: 'pointer' }}>{value}</div>
                      </Tooltip>
                    )
                  }}
                />
                <Table.Column title="状態" dataIndex="Expression_46" width={45} align='center'
                  render={(value, record, index) => {
                    return (
                      <div style={{ color: Color(record.Expression_47)?.Foreground }}
                        hidden={record.reservation_number <= 0}
                      >{value}</div>
                    )
                  }}
                />
                <Table.Column title="契約情報" dataIndex=""
                  render={(value, record, index) => {
                    return (
                      <div>
                        <span style={{ marginRight: 5 }}>{record.visit_course?.toString().substr(0, 1) + '-' + record.visit_course?.toString().substr(1, 2)}</span>
                        <span>
                          <Tooltip title={record.contract_short_name}>
                            <span style={{ cursor: 'pointer' }}>{record.contract_short_name}</span>
                          </Tooltip>
                        </span>
                      </div>
                    )
                  }}
                />
                <Table.Column width={91}
                  title={(this.state.dataSource.length > 0 && this.state.ItemNameList.length > 0) ?
                    <div style={{ cursor: "pointer", color: this.state.CheckCol01 ? '#1890ff' : '' }}
                      onClick={() => {
                        this.setState({
                          CheckCol01: !this.state.CheckCol01,
                          CheckCol02: false,
                          CheckCol03: false,
                          CheckCol04: false,
                          CheckCol05: false,
                          CheckCol06: false,
                        })
                      }}>
                      {this.state.ItemNameList[0]['001000']}
                    </div>
                    :
                    ''}
                  dataIndex="Check01"
                  render={(value, record, index) => {
                    return (
                      <div>
                        <Form.Item name={["dataTable", this.findIndexByID(this.state.dataSource, record.id), "Check01"]} valuePropName="checked" style={{ marginBottom: 0 }}>
                          <Checkbox checked={record.Check01}
                            disabled={!this.state.CheckCol01}
                            onChange={(value) => {
                              if (value.target.checked) {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_21", moment(this.state.SpecifiedDateChar)?.format('MM/DD'))
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check01", 1)
                                this.setFieldParamsUpdate(record.reservation_number, '001000', 1, moment(this.state.SpecifiedDateChar)?.format('YYYY/MM/DD'))
                              } else {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 450,
                                    component:
                                      <WS0061015_CheckYesNoNo
                                        Li_Message={'進捗状態が解除されます。よろしいですか?'}
                                        onFinishScreen={({ Lio_StsReturn }) => {
                                          if (Lio_StsReturn) {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_21", '')
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check01", 0)
                                            this.setFieldParamsUpdate(record.reservation_number, '001000', 0, '')
                                          } else {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check01", 1)
                                          }
                                          this.closeModal()
                                        }}
                                      />
                                    ,
                                  },
                                });


                              }
                            }}
                          >
                            {record.Check01 === 1 ?
                              <label style={{ color: '#fff', background: '#2a8e64', padding: 5 }}>
                                {record.Expression_21}
                              </label> :
                              <label>{record.Expression_21}</label>
                            }</Checkbox>
                        </Form.Item>
                      </div>
                    )
                  }}
                />
                <Table.Column width={91}
                  title={(this.state.dataSource.length > 0 && this.state.ItemNameList.length > 1) ?
                    <div style={{ cursor: "pointer", color: this.state.CheckCol02 ? '#1890ff' : '' }}
                      onClick={() => {
                        this.setState({
                          CheckCol02: !this.state.CheckCol02,
                          CheckCol01: false,
                          CheckCol03: false,
                          CheckCol04: false,
                          CheckCol05: false,
                          CheckCol06: false,
                        })
                      }}>
                      {this.state.ItemNameList[1]['001500']}
                    </div>
                    :
                    ''}
                  dataIndex="Check02"
                  render={(value, record, index) => {
                    return (
                      <div>
                        <Form.Item name={["dataTable", this.findIndexByID(this.state.dataSource, record.id), "Check02"]} valuePropName="checked" style={{ marginBottom: 0 }}>
                          <Checkbox checked={record.Check02}
                            disabled={!this.state.CheckCol02}
                            onChange={(value) => {
                              if (value.target.checked) {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_22", moment(this.state.SpecifiedDateChar)?.format('MM/DD'))
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check02", 1)
                                this.setFieldParamsUpdate(record.reservation_number, '001500', 1, moment(this.state.SpecifiedDateChar)?.format('YYYY/MM/DD'))
                              } else {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 450,
                                    component:
                                      <WS0061015_CheckYesNoNo
                                        Li_Message={'進捗状態が解除されます。よろしいですか?'}
                                        onFinishScreen={({ Lio_StsReturn }) => {
                                          if (Lio_StsReturn) {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_22", '')
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check02", 0)
                                            this.setFieldParamsUpdate(record.reservation_number, '001500', 0, '')
                                          } else {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check02", 1)
                                          }
                                          this.closeModal()
                                        }}
                                      />
                                  }
                                })
                              }
                            }}
                          >
                            {record.Check02 === 1 ?
                              <label style={{ color: '#fff', background: '#2a8e64', padding: 5 }}>
                                {record.Expression_22}
                              </label> :
                              <label>{record.Expression_22}</label>
                            }
                          </Checkbox>
                        </Form.Item>
                      </div>
                    )
                  }}
                />
                <Table.Column width={91}
                  title={(this.state.dataSource.length > 0 && this.state.ItemNameList.length > 2) ?
                    <div style={{ cursor: "pointer", color: this.state.CheckCol03 ? '#1890ff' : '' }}
                      onClick={() => {
                        this.setState({
                          CheckCol03: !this.state.CheckCol03,
                          CheckCol01: false,
                          CheckCol02: false,
                          CheckCol04: false,
                          CheckCol05: false,
                          CheckCol06: false,
                        })
                      }}>
                      {this.state.ItemNameList[2]['002000']}
                    </div>
                    :
                    ''}
                  dataIndex="Check03"
                  render={(value, record, index) => {
                    return (
                      <div>
                        <Form.Item name={["dataTable", this.findIndexByID(this.state.dataSource, record.id), "Check03"]} valuePropName="checked" style={{ marginBottom: 0 }}>
                          <Checkbox checked={record.Check03}
                            disabled={!this.state.CheckCol03}
                            onChange={(value) => {
                              if (value.target.checked) {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_23", moment(this.state.SpecifiedDateChar)?.format('MM/DD'))
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check03", 1)
                                this.setFieldParamsUpdate(record.reservation_number, '002000', 1, moment(this.state.SpecifiedDateChar)?.format('YYYY/MM/DD'))
                              } else {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 450,
                                    component:
                                      <WS0061015_CheckYesNoNo
                                        Li_Message={'進捗状態が解除されます。よろしいですか?'}
                                        onFinishScreen={({ Lio_StsReturn }) => {
                                          if (Lio_StsReturn) {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_23", '')
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check03", 0)
                                            this.setFieldParamsUpdate(record.reservation_number, '002000', 0, '')
                                          } else {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check03", 1)
                                          }
                                          this.closeModal()
                                        }}
                                      />
                                  }
                                })
                              }
                            }}
                          >
                            {record.Check03 === 1 ?
                              <label style={{ color: '#fff', background: '#2a8e64', padding: 5 }}>
                                {record.Expression_23}
                              </label> :
                              <label>{record.Expression_23}</label>
                            }
                          </Checkbox>
                        </Form.Item>
                      </div>
                    )
                  }} />
                <Table.Column width={91}
                  title={(this.state.dataSource.length > 0 && this.state.ItemNameList.length > 3) ?
                    <div style={{ cursor: "pointer", color: this.state.CheckCol04 ? '#1890ff' : '' }}
                      onClick={() => {
                        this.setState({
                          CheckCol04: !this.state.CheckCol04,
                          CheckCol01: false,
                          CheckCol02: false,
                          CheckCol03: false,
                          CheckCol05: false,
                          CheckCol06: false,
                        })
                      }}>
                      {this.state.ItemNameList[3]['003000']}
                    </div>
                    :
                    ''}
                  dataIndex="Check04"
                  render={(value, record, index) => {
                    return (
                      <div>
                        <Form.Item name={["dataTable", this.findIndexByID(this.state.dataSource, record.id), "Check04"]} valuePropName="checked" style={{ marginBottom: 0 }}>
                          <Checkbox checked={record.Check04}
                            disabled={!this.state.CheckCol04}
                            onChange={(value) => {
                              if (value.target.checked) {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_24", moment(this.state.SpecifiedDateChar)?.format('MM/DD'))
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check04", 1)
                                this.setFieldParamsUpdate(record.reservation_number, '003000', 1, moment(this.state.SpecifiedDateChar)?.format('YYYY/MM/DD'))
                              } else {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 450,
                                    component:
                                      <WS0061015_CheckYesNoNo
                                        Li_Message={'進捗状態が解除されます。よろしいですか?'}
                                        onFinishScreen={({ Lio_StsReturn }) => {
                                          if (Lio_StsReturn) {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_24", '')
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check04", 0)
                                            this.setFieldParamsUpdate(record.reservation_number, '003000', 0, '')
                                          } else {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check04", 1)
                                          }
                                          this.closeModal()
                                        }}
                                      />
                                  }
                                })
                              }
                            }}
                          >
                            {record.Check04 === 1 ?
                              <label style={{ color: '#fff', background: '#2a8e64', padding: 5 }}>
                                {record.Expression_24}
                              </label> :
                              <label>{record.Expression_24}</label>
                            }  </Checkbox>
                        </Form.Item>
                      </div>
                    )
                  }} />
                <Table.Column width={91}
                  title={(this.state.dataSource.length > 0 && this.state.ItemNameList.length > 4) ?
                    <div style={{ cursor: "pointer", color: this.state.CheckCol05 ? '#1890ff' : '' }}
                      onClick={() => {
                        this.setState({
                          CheckCol05: !this.state.CheckCol05,
                          CheckCol01: false,
                          CheckCol02: false,
                          CheckCol03: false,
                          CheckCol04: false,
                          CheckCol06: false,
                        })
                      }}>
                      {this.state.ItemNameList[4]['003500']}
                    </div>
                    :
                    ''}
                  dataIndex="Check05"
                  render={(value, record, index) => {
                    return (
                      <div>
                        <Form.Item name={["dataTable", this.findIndexByID(this.state.dataSource, record.id), "Check05"]} valuePropName="checked" style={{ marginBottom: 0 }}>
                          <Checkbox checked={record.Check05}
                            disabled={!this.state.CheckCol05}
                            onChange={(value) => {
                              if (value.target.checked) {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_25", moment(this.state.SpecifiedDateChar)?.format('MM/DD'))
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check05", 1)
                                this.setFieldParamsUpdate(record.reservation_number, '003500', 1, moment(this.state.SpecifiedDateChar)?.format('YYYY/MM/DD'))
                              } else {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 450,
                                    component:
                                      <WS0061015_CheckYesNoNo
                                        Li_Message={'進捗状態が解除されます。よろしいですか?'}
                                        onFinishScreen={({ Lio_StsReturn }) => {
                                          if (Lio_StsReturn) {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_25", '')
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check05", 0)
                                            this.setFieldParamsUpdate(record.reservation_number, '003500', 0, '')
                                          } else {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check05", 1)
                                          }
                                          this.closeModal()
                                        }}
                                      />
                                  }
                                })
                              }
                            }}
                          >
                            {record.Check05 === 1 ?
                              <label style={{ color: '#fff', background: '#2a8e64', padding: 5 }}>
                                {record.Expression_25}
                              </label> :
                              <label>{record.Expression_25}</label>
                            }
                          </Checkbox>
                        </Form.Item>
                      </div>
                    )
                  }} />
                <Table.Column width={91}
                  title={(this.state.dataSource.length > 0 && this.state.ItemNameList.length > 5) ?
                    <div style={{ cursor: "pointer", color: this.state.CheckCol06 ? '#1890ff' : '' }}
                      onClick={() => {
                        this.setState({
                          CheckCol06: !this.state.CheckCol06,
                          CheckCol01: false,
                          CheckCol02: false,
                          CheckCol03: false,
                          CheckCol04: false,
                          CheckCol05: false,
                        })
                      }}>
                      {this.state.ItemNameList[5]['004000']}
                    </div>
                    :
                    ''}
                  dataIndex="Check06"
                  render={(value, record, index) => {
                    return (
                      <div>
                        <Form.Item name={["dataTable", this.findIndexByID(this.state.dataSource, record.id), "Check06"]} valuePropName="checked" style={{ marginBottom: 0 }}>
                          <Checkbox checked={record.Check06}
                            disabled={!this.state.CheckCol06}
                            onChange={(value) => {
                              if (value.target.checked) {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_26", moment(this.state.SpecifiedDateChar)?.format('MM/DD'))
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check06", 1)
                                this.setFieldParamsUpdate(record.reservation_number, '004000', 1, moment(this.state.SpecifiedDateChar)?.format('YYYY/MM/DD'))
                              } else {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 450,
                                    component:
                                      <WS0061015_CheckYesNoNo
                                        Li_Message={'進捗状態が解除されます。よろしいですか?'}
                                        onFinishScreen={({ Lio_StsReturn }) => {
                                          if (Lio_StsReturn) {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Expression_26", '')
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check06", 0)
                                            this.setFieldParamsUpdate(record.reservation_number, '004000', 0, '')
                                          } else {
                                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Check06", 1)
                                          }
                                          this.closeModal()
                                        }}
                                      />
                                  }
                                })
                              }
                            }}>
                            {record.Check06 === 1 ?
                              <label style={{ color: '#fff', background: '#2a8e64', padding: 5 }}>
                                {record.Expression_26}
                              </label> :
                              <label>{record.Expression_26}</label>
                            }
                          </Checkbox>
                        </Form.Item>
                      </div>
                    )
                  }} />
                <Table.Column dataIndex="Supplement" width={80} />
                <Table.Column width={40} align='center'
                  render={(value, record, index) => {
                    return (
                      <Dropdown
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: 1200,
                                    component:
                                      <WS2583001_ConsultInquirySub
                                        Li_ReserveNum={record.W1_reserve_num}
                                        onFinishScreen={() => {
                                          this.closeModal()
                                        }}
                                      />
                                    ,
                                  },
                                });
                              }}
                            >
                              受診照会
                            </Menu.Item>
                          </Menu>
                        )}
                      >
                        <Button icon={<MoreOutlined />}></Button>
                      </Dropdown>
                    );
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0256001_ProgressSet);
