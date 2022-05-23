import React from "react";
import PropTypes from 'prop-types';

import { Card, Form, Select, Radio, Button, Row, Col, Calendar, InputNumber, Input, Spin, message } from "antd";

import axios from 'configs/axios';
import Checkbox from "antd/lib/checkbox/Checkbox";
import MagicXpaFunc from "helpers/MagicXpaFunc";
import moment from "moment-timezone";

class WS2577003_CalendarEmptySub extends React.Component {
  static propTypes = {
    // trả về màn hình cha Lio_Date = thời gian calender
    Lio_Date: PropTypes.any,

    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'カレンダー';

    const Lio_Date = moment(props.Lio_Date);

    this.state = {
      loading: false,

      screenData: {},
      formDefault: {
        Date: Lio_Date.isValid() ? Lio_Date : moment().format('YYYY/MM/DD'),
      },
      AvailabilityList: '',
    };

    this.renderDateNum = 0;

    // this.resetRenderDateNum();
  }

  componentDidMount() {
    this.resetRenderDateNum();

    this.loadScreenData();
  }

  componentDidUpdate(prevProps) {
    this.resetRenderDateNum();

    if (prevProps !== this.props) {

      const Lio_Date = moment(this.props.Lio_Date);
      this.setState({
        formDefault: {
          ...this.state.formDefault,
          Date: Lio_Date.isValid() ? Lio_Date : moment().format('YYYY/MM/DD'),
        },
      })
    }
  }

  resetRenderDateNum = () => {
    this.renderDateNum = 0;
  }

  loadScreenData = () => {
    this.setState({ loading: true });

    axios.get('/api/reserve-status-search/calendar-empty-sub/get-screen-data')
      .then(res => {
        this.setState({
          screenData: {
            ...this.state.screenData,
            FacilityTypeList: res.data?.FacilityTypeList,
            CourseList: res.data?.CourseList?.split(','),
            CourseList_1: res.data?.CourseList_1?.split(','),
            // InspectList: res.data?.InspectList?.split(','),
            InspectList: res.data?.InspectList,
          },
          formDefault: {
            ...this.state.formDefault,
            FacilityType: res.data?.FacilityTypeList[0]?.facility_type,
            TimeDivision: '',
            CourseSelect: '',
          },
        });

        this.formRef.current.resetFields();
      })
      .catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ loading: false }));
  }

  onFinish = (values) => {
    this.setState({ loading: true });

    let InspectSelect = '';
    for (let i = 1; i < 20; i++) {
      const v = this.formRef.current.getFieldValue('検査' + (('0' + i).slice(-2)));
      InspectSelect += v ? '1' : '0';
    }

    axios.post('/api/reserve-status-search/calendar-empty-sub/redisplay', {
      ...values,
      InspectSelect,
    })
      .then(res => {
        this.setState({
          AvailabilityList: res.data.AvailabilityList,
          SkyPeopleNumList: res.data.SkyPeopleNumList,
        });
      })
      .catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ loading: false }));
  }

  setDateCalendar = date => {
    this.formRef.current.setFieldsValue({
      Date: date.format('YYYY/MM/DD'),
    });

    this.setState({
      formDefault: {
        ...this.state.formDefault,
        Date: date,
      },
    });

    if (date.format('YYYY/MM') !== this.state.formDefault.Date.format('YYYY/MM')) {
      this.onFinish(this.formRef.current.getFieldsValue());
    }
  }

  onExit = () => {
    if (this.props.onFinishScreen) {
      const choosenDate = this.state.formDefault.Date.format('YYYY/MM/DD');
      this.props.onFinishScreen({
        Lio_Date: choosenDate,
        Lo_Date: choosenDate,
      });
    }
  }

  render() {
    return (
      <div className="calendar-empty-sub">
        <Spin spinning={this.state.loading}>
          <Row gutter={5}>
            <Col span={12}>
              <Card style={{ height: '100%' }}>
                <Calendar
                  className='custom-calendar'
                  value={this.state.formDefault.Date}
                  fullscreen={false}
                  dateFullCellRender={(date) => {
                    this.renderDateNum++;
                    return (<div
                      className={'ant-picker-cell-inner ant-picker-calendar-date' + ((date.format('YYYY/MM/DD') === this.state.formDefault.Date.format('YYYY/MM/DD')) ? ' ant-picker-calendar-date-today' : '')}
                      style={{ height: '55px', width: '100%', padding: '3px 0', fontSize: 18 }}
                      onDoubleClick={() => {
                        this.onExit();
                      }}
                    >
                      <div>{date.date()}</div>
                      <div title={MagicXpaFunc.StrToken(this.state.SkyPeopleNumList, this.renderDateNum, ',')}>{MagicXpaFunc.StrToken(this.state.AvailabilityList, this.renderDateNum, ',')}</div>
                    </div>);
                  }}
                  onChange={date => {
                    this.setDateCalendar(date);
                  }}
                  onPanelChange={(value) => {
                    this.setState({ formDefault: { Date: value } });
                  }}
                  onSelect={date => {
                    // Fix bug select again
                    this.resetRenderDateNum();
                  }}
                />

                <div style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => {
                      this.setDateCalendar(moment());
                    }}
                    onDoubleClick={() => {
                      this.onExit();
                    }}
                  >当日</Button>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="カレンダー" style={{ height: '100%' }}>
                <Form
                  ref={this.formRef}
                  onFinish={this.onFinish}
                  initialValues={this.state.formDefault}
                >
                  <Form.Item hidden name="Date"><Input /></Form.Item>
                  <Form.Item name="CourseSelect" label="コース" labelCol={{ span: 4 }}>
                    <Select style={{ width: '50%' }}>
                      {this.state.screenData?.CourseList?.map((value, index) => (
                        <Select.Option value={value} key={`cl-${index}`}>{this.state.screenData?.CourseList_1[index]}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Row>
                    <Col span={4} style={{ textAlign: 'right', paddingRight: 9 }}>
                      <span style={{ fontWeight: 'bold', color: '#14468C' }}>検査</span>
                    </Col>
                    <Col span={20}>
                      <Form.Item>
                        <Row>
                          <Col span={4}>
                            <Form.Item name="検査01" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 1, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査02" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 2, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査03" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 3, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査04" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 4, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査05" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 5, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={4}>
                            <Form.Item name="検査06" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 6, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査07" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 7, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査08" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 8, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査09" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 9, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査10" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 10, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={4}>
                            <Form.Item name="検査11" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 11, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査12" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 12, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査13" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 13, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査14" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 14, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査15" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 15, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={4}>
                            <Form.Item name="検査16" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 16, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査17" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 17, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査18" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 18, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査19" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 19, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name="検査20" valuePropName="checked">
                              <Checkbox>{MagicXpaFunc.StrToken(this.state.screenData?.InspectList, 20, ',')}</Checkbox>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="TimeDivision" label="時間区分" labelCol={{ span: 4 }}>
                    <Radio.Group>
                      <Radio value="">全て</Radio>
                      <Radio value="AM">ＡＭ</Radio>
                      <Radio value="PM">ＰＭ</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="FacilityType" label="施設" labelCol={{ span: 4 }}>
                    <Select style={{ width: '70%' }}>
                      {this.state.screenData?.FacilityTypeList?.map((value, index) => (
                        <Select.Option value={value.facility_type} key={`ftl-${index}`}>{value.facility_name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="人数" labelCol={{ span: 4 }}>
                    <Row>
                      <Button onClick={() => {
                        let num = this.formRef.current?.getFieldValue('PeopleNum')
                        if (num && num > 0) {
                          this.formRef.current?.setFieldsValue({
                            PeopleNum: num === 1 ? null : num - 1
                          })
                        }
                      }}>-</Button>
                      <Form.Item name="PeopleNum">
                        <InputNumber min={0} maxLength={4} style={{ width: 60 }} />
                      </Form.Item>
                      <Button onClick={() => {
                        let num = this.formRef.current?.getFieldValue('PeopleNum')
                        if (!num) {
                          num = 1
                        } else {
                          if (num < 9999) {
                            num = num + 1
                          } else {
                            num = null
                          }
                        }
                        this.formRef.current?.setFieldsValue({
                          PeopleNum: num
                        })
                      }}>+</Button>
                      <Button type="primary" htmlType="submit" style={{ marginLeft: 15 }}>再表示</Button>
                    </Row>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

export default WS2577003_CalendarEmptySub;
