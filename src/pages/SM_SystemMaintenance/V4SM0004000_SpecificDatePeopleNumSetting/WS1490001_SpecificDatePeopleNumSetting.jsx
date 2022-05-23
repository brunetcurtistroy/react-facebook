import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Input, Select, Button, Table, DatePicker, Space, Row, Col, Radio, Modal, Spin, InputNumber, message } from "antd";
import moment from "moment";

import { QuestionCircleOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import SpecificDatePeopleNumSettingAction from "redux/SystemMaintenance/SpecificDatePeopleNumSetting/SpecificDatePeopleNumSetting.action";
import { debounce } from "lodash";

import './WS1490001_SpecificDatePeopleNumSetting.scss'

const yearFormat = 'YYYY';
const customYearFormat = value => `${value.format(yearFormat)} 年`;

var curentYear = new Date().getFullYear();
var curentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);

const styleCol = {
  padding: 0,
}

const styleRow = {
  margin: 0
}

class WS1490001_SpecificDatePeopleNumSetting extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Date: PropTypes.any,
    Li_Facility: PropTypes.any,
    Li_ManageDivision: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '特定日人数設定';

    this.state = {
      StsSetSpecificDatesPeopleNum: false,
      dataSource: [],
      selectedRowKey: [],
      rowSelect: [],
      indexTable: 0,
      isLoadingTable: false,

      isLoadingNumPeopleSet: false,
      FacilityType: [],

      listLimitAM: [],
      listLimitPM: []
    };
  }

  componentDidMount() {
    this.getScreenData();
  }

  onFinish(values) {

  }

  getScreenData() {
    SpecificDatePeopleNumSettingAction.getScreenData()
      .then((res) => {
        this.setState({
          FacilityType: res ? res.FacilityType : []
        })

        this.formRef.current?.setFieldsValue({ FacilityType: res ? res.FacilityType[0].LinkedField : '' });

        if (res) {
          this.getDateList(true);
        }
      })
  }

  // table Datelist
  getDateList(reload) {
    let params = {
      Year: this.formRef.current?.getFieldValue('Year')?.format('YYYY'),
      Month: this.formRef.current?.getFieldValue('Month'),
      FacilityType: this.formRef.current?.getFieldValue('FacilityType'),
      ManageDivision: this.formRef.current?.getFieldValue('ManageDivision'),
    }

    this.setState({ isLoadingTable: true, isLoadingNumPeopleSet: true });

    SpecificDatePeopleNumSettingAction.getDateList(params)
      .then(async (res) => {
        let data = res ? res : [];
        data.map(x => (
          x.Expression_14 = x.Expression_14 + '人'
        ))
        let index = this.state.indexTable
        if (reload) {
          await this.setState({
            dataSource: data,
            isLoadingTable: false,

            rowSelect: data && data.length > 0 ? [data[0]] : [],
            selectedRowKey: data && data.length > 0 ? [data[0].DateChar] : [],
            indexTable: 0
          });

          if (data.length > 0) {
            this.setState({
              StsSetSpecificDatesPeopleNum: data[0].StsSetSpecificDatesPeopleNum ? true : false
            })
          }

        } else {
          await this.setState({
            dataSource: data,
            isLoadingTable: false,

            rowSelect: data && data.length > 0 ? [data[index]] : [],
            selectedRowKey: data && data.length > 0 ? [data[index].DateChar] : [],
            indexTable: index
          });
          if (data.length > 0) {
            this.setState({
              StsSetSpecificDatesPeopleNum: data[index].StsSetSpecificDatesPeopleNum ? true : false
            })
          }
        }

        this.getNumPeopleSet()

      })
      .finally(() => { this.setState({ isLoadingTable: false, isLoadingNumPeopleSet: false }) })
  }

  // table NumPeopleSet
  getNumPeopleSet() {
    let params = {
      date_on: this.state.rowSelect[0].DateChar,
      FacilityType: this.formRef.current?.getFieldValue('FacilityType'),
      ManageDivision: this.formRef.current?.getFieldValue('ManageDivision')
    }
    this.setState({ isLoadingNumPeopleSet: true });
    SpecificDatePeopleNumSettingAction.getNumPeopleSet(params)
      .then((res) => {
        let ReferenceDayTotal = res ? res.ReferenceDay.Total : [];
        let SpecificDayTotal = res ? res.SpecificDay.Total : [];
        for (var itemR in ReferenceDayTotal) {
          ReferenceDayTotal[itemR] = ReferenceDayTotal[itemR] > 0 ? ReferenceDayTotal[itemR] : null
        }

        for (var itemS in SpecificDayTotal) {
          SpecificDayTotal[itemS] = SpecificDayTotal[itemS] > 0 ? SpecificDayTotal[itemS] : null
        }

        let Reference_AM = this.getListNumPeopleSet('Reference', 'AM', res ? res.ReferenceDay.AM : []);
        let Reference_PM = this.getListNumPeopleSet('Reference', 'PM', res ? res.ReferenceDay.PM : []);
        let SpecificDay_AM = this.getListNumPeopleSet('Specific', 'AM', res ? res.SpecificDay.AM : []);
        let SpecificDay_PM = this.getListNumPeopleSet('Specific', 'PM', res ? res.SpecificDay.PM : []);

        this.formRef.current?.setFieldsValue({
          ...res.DisplayList[0],
          ...res.ReferenceDay.Total,
          ...res.SpecificDay.Total,
          ...SpecificDay_AM,
          ...SpecificDay_PM,
          ...Reference_AM,
          ...Reference_PM,
        })

        this.setState({
          isLoadingNumPeopleSet: false,
        })
      })
      .finally(() => { this.setState({ isLoadingNumPeopleSet: false }) })
  }

  getListNumPeopleSet(typeList, typeTime, datas) {
    let list = {};
    let listLimit = typeTime === 'AM' && typeList === 'Specific' ? [...this.state.listLimitAM] : [...this.state.listLimitPM];
    for (let i = 1; i <= 20; i++) {
      let nameNumber = i;
      if (i < 10) {
        nameNumber = '0' + i;
      }

      let name = 'limit_' + nameNumber + '_' + typeList + '_' + typeTime;
      let nameData = 'limit_' + nameNumber;
      list[name] = datas[nameData] > 0 ? datas[nameData] : null;
      listLimit[nameData] = datas[nameData];
    }

    if (typeTime === 'AM' && typeList === 'Specific') {
      this.setState({
        listLimitAM: listLimit
      })
    } else {
      if (typeTime === 'PM' && typeList === 'Specific') {
        this.setState({
          listLimitPM: listLimit
        })
      }
    }

    return list;
  }

  updateNumPeopleSet(TimeType, listLimit, name, value, nameTotal) {
    listLimit[name] = value;
    if (TimeType === 'AM') {
      this.setState({
        listLimitAM: listLimit
      })
    } else {
      this.setState({
        listLimitPM: listLimit
      })
    }

    this.setFieldTotal(nameTotal, this.state.listLimitAM[name], this.state.listLimitPM[name]);

    let params = {
      date_on: this.state.rowSelect[0].DateChar,
      FacilityType: this.formRef.current?.getFieldValue('FacilityType'),
      ManageDivision: this.formRef.current?.getFieldValue('ManageDivision'),
      TimeType: TimeType,
      ...listLimit
    }
    SpecificDatePeopleNumSettingAction.updateNumPeopleSet(params)
      .then((res) => {
        this.setState({ StsSetSpecificDatesPeopleNum: true })
      })
  }

  deleteNumPeopleSet() {
    let params = {
      date_on: this.state.rowSelect[0].DateChar,
      FacilityType: this.formRef.current?.getFieldValue('FacilityType'),
    }

    SpecificDatePeopleNumSettingAction.deleteDateList(params)
      .then((res) => {
        this.getNumPeopleSet();
        this.setState({ StsSetSpecificDatesPeopleNum: false })
      })
  }

  setFieldTotal(name, valueAM, valuePM) {
    this.formRef.current.setFieldsValue({
      [name]: valueAM + valuePM
    })
  }

  setValueDateForm(event) {
    let year, month;
    if (event === 'prev') {
      if (this.formRef.current.getFieldValue('Month') === '01') {
        year = moment((parseInt(this.formRef.current.getFieldValue('Year')?.format('YYYY')) - 1), yearFormat);
        month = '12'
      } else {
        year = moment(this.formRef.current.getFieldValue('Year')?.format('YYYY'));
        month = (parseInt(this.formRef.current.getFieldValue('Month')) - 1)?.toString();
      }
    }

    if (event === 'next') {
      if (this.formRef.current.getFieldValue('Month') === '12') {
        year = moment((parseInt(this.formRef.current.getFieldValue('Year')?.format('YYYY')) + 1), yearFormat);
        month = '1'
      } else {
        year = moment(this.formRef.current.getFieldValue('Year')?.format('YYYY'));
        month = (parseInt(this.formRef.current.getFieldValue('Month')) + 1)?.toString();
      }
    }

    if (month && month < 10) {
      month = ("0" + month)
    }

    if (event === 'current') {
      year = moment(curentYear, yearFormat);
      month = curentMonth
    }

    this.formRef.current.setFieldsValue({
      Year: year,
      Month: month
    })

    this.getDateList(true);
  }

  findIndexByDate = (DateChar) => {
    return this.state.dataSource.findIndex((item) => DateChar === item.DateChar);
  };

  eventF4(record) {
    let params = {
      date_on: record.DateChar,
      FacilityType: this.formRef.current?.getFieldValue('FacilityType')
    }
    SpecificDatePeopleNumSettingAction.eventF4(params)
      .then((res) => {
        this.getDateList(false)
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

  render() {
    return (
      <div className="specific-date-people-num-setting">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            ManageDivision: 1,
            Year: moment(curentYear, yearFormat),
            Month: curentMonth
          }}
        >
          <Card title="特定日人数設定" className="mb-3">
            <Space>
              <Form.Item name="Year">
                <VenusDatePickerCustom formRefDatePicker={this.formRef} allowClear={false}
                  format={customYearFormat}
                  picker="year"
                  style={{ width: '100px' }}
                  onChange={(value) => {
                    this.getDateList(true);
                  }}
                />
              </Form.Item>
              <Form.Item name="Month" >
                <Select style={{ width: '100px' }} allowClear={false}
                  onChange={(value) => {
                    this.getDateList(true);
                  }}
                >
                  <Select.Option value='01'>1月</Select.Option>
                  <Select.Option value='02'>2月</Select.Option>
                  <Select.Option value='03'>3月</Select.Option>
                  <Select.Option value='04'>4月</Select.Option>
                  <Select.Option value='05'>5月</Select.Option>
                  <Select.Option value='06'>6月</Select.Option>
                  <Select.Option value='07'>7月</Select.Option>
                  <Select.Option value='08'>8月</Select.Option>
                  <Select.Option value='09'>9月</Select.Option>
                  <Select.Option value='10'>10月</Select.Option>
                  <Select.Option value='11'>11月</Select.Option>
                  <Select.Option value='12'>12月</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary"
                  onClick={() => {
                    this.setValueDateForm('prev')
                  }}
                >
                  <LeftOutlined />前月</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary"
                  onClick={() => {
                    this.setValueDateForm('current')
                  }}
                >当月</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary"
                  onClick={() => {
                    this.setValueDateForm('next')
                  }}
                >
                  翌月 <RightOutlined /></Button>
              </Form.Item>
              <Form.Item name="FacilityType" >
                <Select style={{ width: '150px' }}
                  onChange={(value) => {
                    this.getDateList();
                  }}
                >
                  {this.state.FacilityType?.map(value => (
                    <Select.Option key={"FacilityType" + Math.random()} value={value.LinkedField}>{value.DisplayField}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Space>
          </Card>

          <Card>
            <Row gutter={24}>
              <Col span={10} style={{ borderRight: '1px solid #d9d9d9' }}>
                <Table
                  size='small'
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={this.state.dataSource?.length > 10 ? true : false}
                  bordered={true}
                  showHeader={false}
                  rowKey={(record) => record.DateChar}
                  rowSelection={{
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKey,
                    onSelect: async (record, selected, selectedRows) => {
                      let index = this.findIndexByDate(record.DateChar)
                      await this.setState({
                        rowSelect: selectedRows,
                        selectedRowKey: selectedRows.map(x => x.DateChar),
                        indexTable: index,
                        StsSetSpecificDatesPeopleNum: record.StsSetSpecificDatesPeopleNum ? true : false
                      });
                      this.getNumPeopleSet();
                    },
                  }}
                >
                  <Table.Column dataIndex="DateChar" width={110} />
                  <Table.Column dataIndex="kyusinkbn" width={60}
                    render={(value, record) => {
                      return (
                        <div>
                          {record.kyusinkbn ?
                            <label style={{ background: '#f39ccbb5', padding: 5 }}>
                              {record.kyusinkbn}
                            </label> : ''
                          }
                        </div>
                      )
                    }}
                  />
                  <Table.Column dataIndex="StsSetSpecificDatesPeopleNum" width={60}
                    render={(value, record) => {
                      return (
                        <div>
                          {this.findIndexByDate(record.DateChar) === this.state.indexTable ?
                            <div>
                              {this.state.StsSetSpecificDatesPeopleNum ?
                                <label style={{ color: '#fff', background: 'red', padding: 5 }}>
                                  特
                                </label> : ''
                              }
                            </div>
                            :
                            <div>
                              {record.StsSetSpecificDatesPeopleNum ?
                                <label style={{ color: '#fff', background: 'red', padding: 5 }}>
                                  {record.StsSetSpecificDatesPeopleNum}
                                </label> : ''
                              }
                            </div>
                          }
                        </div>
                      )
                    }} />
                  <Table.Column dataIndex="Expression_14" />
                  <Table.Column width={90}
                    render={(value, record, index) => {
                      return (
                        <Button type='primary'
                          onClick={() => this.eventF4(record)}
                        >非相談日付</Button>
                      )
                    }}
                  />
                </Table>
              </Col>

              <Col span={14}>
                <Spin spinning={this.state.isLoadingNumPeopleSet}>

                  <Form.Item name="ManageDivision" style={{ marginBottom: '15px' }}>
                    <Radio.Group name="ManageDivision"
                      onChange={(value) => {
                        this.getDateList(false);
                      }}>
                      <Radio value={1}>コース</Radio>
                      <Radio value={2}>検査</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly value="表示名称" style={{ height: '48px', background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly value="特定日" style={{ textAlign: 'center', background: this.state.StsSetSpecificDatesPeopleNum ? 'red' : '', color: this.state.StsSetSpecificDatesPeopleNum ? '#fff' : '' }} />
                      </Form.Item>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item style={{ marginBottom: 0 }}>
                            <Input type='text' readOnly value="AM" style={{ background: this.state.StsSetSpecificDatesPeopleNum ? 'red' : '', color: this.state.StsSetSpecificDatesPeopleNum ? '#fff' : '' }} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item style={{ marginBottom: 0 }}>
                            <Input type='text' readOnly value="PM" style={{ background: this.state.StsSetSpecificDatesPeopleNum ? 'red' : '', color: this.state.StsSetSpecificDatesPeopleNum ? '#fff' : '' }} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item style={{ marginBottom: 0 }}>
                            <Input type='text' readOnly value="計" style={{ background: this.state.StsSetSpecificDatesPeopleNum ? 'red' : '', color: this.state.StsSetSpecificDatesPeopleNum ? '#fff' : '' }} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly value="基準日" style={{ textAlign: 'center', background: !this.state.StsSetSpecificDatesPeopleNum ? 'red' : '', color: !this.state.StsSetSpecificDatesPeopleNum ? '#fff' : '' }} />
                      </Form.Item>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item style={{ marginBottom: 0 }}>
                            <Input type='text' readOnly value="AM" style={{ background: !this.state.StsSetSpecificDatesPeopleNum ? 'red' : '', color: !this.state.StsSetSpecificDatesPeopleNum ? '#fff' : '' }} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item style={{ marginBottom: 0 }}>
                            <Input type='text' readOnly value="PM" style={{ background: !this.state.StsSetSpecificDatesPeopleNum ? 'red' : '', color: !this.state.StsSetSpecificDatesPeopleNum ? '#fff' : '' }} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>

                          <Form.Item style={{ marginBottom: 0 }}>
                            <Input type='text' readOnly value="計" style={{ background: !this.state.StsSetSpecificDatesPeopleNum ? 'red' : '', color: !this.state.StsSetSpecificDatesPeopleNum ? '#fff' : '' }} />
                          </Form.Item></Col>

                      </Row>
                    </Col>
                  </Row>

                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_127" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_01_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => { this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_01', value, 'Expression_47') }, 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_01_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_01', value, 'Expression_47'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_47" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_01_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_01_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_67" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_128" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_02_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_02', value, 'Expression_48'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_02_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_02', value, 'Expression_48'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_48" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_02_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_02_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_68" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_129" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_03_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_03', value, 'Expression_49'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_03_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_03', value, 'Expression_49'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_49" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_03_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_03_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_69" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_130" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_04_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_04', value, 'Expression_50'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_04_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_04', value, 'Expression_50'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_50" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_04_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_04_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_70" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_131" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_05_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_05', value, 'Expression_51'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_05_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_05', value, 'Expression_51'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_51" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_05_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_05_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_71" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_132" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_06_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_06', value, 'Expression_52'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_06_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_06', value, 'Expression_52'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_52" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_06_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_06_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_72" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_133" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_07_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_07', value, 'Expression_53'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_07_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_07', value, 'Expression_53'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_53" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_07_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_07_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_73" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_134" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_08_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_08', value, 'Expression_54'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_08_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_08', value, 'Expression_54'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_54" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_08_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_08_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_74" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_135" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_09_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_09', value, 'Expression_55'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_09_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_09', value, 'Expression_55'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_55" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_09_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_09_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_75" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_136" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_10_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_10', value, 'Expression_56'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_10_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_10', value, 'Expression_56'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_56" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_10_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_10_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_76" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_137" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_11_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_11', value, 'Expression_57'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_11_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_11', value, 'Expression_57'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_57" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_11_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_11_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_77" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_138" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_12_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_12', value, 'Expression_58'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_12_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_12', value, 'Expression_58'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_58" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_12_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_12_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_78" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_139" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_13_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_13', value, 'Expression_59'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_13_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_13', value, 'Expression_59'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_59" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_13_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_13_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_79" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_140" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_14_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_14', value, 'Expression_60'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_14_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_14', value, 'Expression_60'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_60" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_14_Specific_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_14_Specific_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_80" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_141" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_15_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_15', value, 'Expression_61'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_15_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_15', value, 'Expression_61'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_61" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_15_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_15_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_81" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_142" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_16_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_16', value, 'Expression_62'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_16_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_16', value, 'Expression_62'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_62" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_16_Specific_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_16_Specific_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_82" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_143" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_17_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_17', value, 'Expression_63'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_17_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_17', value, 'Expression_63'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_63" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_17_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_17_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_83" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_144" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_18_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_18', value, 'Expression_64'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_18_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_18', value, 'Expression_64'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_64" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_18_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_18_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_84" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_145" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_19_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_19', value, 'Expression_65'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_19_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_19', value, 'Expression_65'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_65" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_19_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_19_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_85" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={24} style={styleRow}>
                    <Col span={4} style={styleCol}>
                      <Form.Item name="Expression_146" style={{ marginBottom: 0 }}>
                        <Input type='text' readOnly style={{ background: '#066bc7', color: '#fff' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_20_Specific_AM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('AM', this.state.listLimitAM, 'limit_20', value, 'Expression_66'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_20_Specific_PM" style={{ marginBottom: 0 }}>
                            <InputNumber maxLength={4} min={0} style={{ width: '100%' }}
                              onChange={debounce((value) => this.updateNumPeopleSet('PM', this.state.listLimitPM, 'limit_20', value, 'Expression_66'), 500)} />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_66" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} style={styleCol}>
                      <Row gutter={24} style={styleRow}>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_20_Reference_AM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="limit_20_Reference_PM" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8} style={styleCol}>
                          <Form.Item name="Expression_86" style={{ marginBottom: 0 }}>
                            <Input type='number' readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Spin>
              </Col>
            </Row>
            <Space style={{ float: 'right', marginTop: '20px' }}>
              <Form.Item>
                <Button type="primary"
                  disabled={!this.state.StsSetSpecificDatesPeopleNum}
                  onClick={() => {
                    Modal.confirm({
                      title: 'この日付の人数設定を初期化しますか',
                      icon: <QuestionCircleOutlined style={{ fontSize: '28px', color: '#1890ff' }} />,
                      okText: 'は　い',
                      cancelText: 'いいえ',
                      onOk: () => { this.deleteNumPeopleSet() }
                    })
                  }}
                >取消</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary">休診</Button>
              </Form.Item>
            </Space>
          </Card>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1490001_SpecificDatePeopleNumSetting);
