import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { getScreenReserveChangeAction, eventF12Action } from "redux/ReservationBusiness/ReservesBulkChanges/ReservesBulkChanges.action";

import { Card, Form, Input, Checkbox, Select, Button, Row, Col, Modal, DatePicker, message } from "antd";

import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS2553003_PeriodTimeInquiry from "pages/YK_ReservationBusiness/V5YK0001000_ReserveStatusSearch/WS2553003_PeriodTimeInquiry";
import { ModalError } from "components/Commons/ModalConfirm";
import moment from 'moment';

class WS2556064_ReserveChange extends React.Component {
  static propTypes = {
    Lo_StsRun: PropTypes.any,
    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '予約変更';

    this.state = {
      FacilityType: [],
      EffectiveCourse: false,
      EffectiveDate: false,
      EffectivePeriodOfTime: false,
      EffectiveFacilityType: false,
      initObj: {},
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.formRef?.current?.resetFields();
    this.loadInitData()
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.formRef?.current?.resetFields();
      this.setState({
        EffectiveCourse: false,
        EffectiveDate: false,
        EffectivePeriodOfTime: false,
        EffectiveFacilityType: false,
      })
    }
  }

  loadInitData = () => {
    getScreenReserveChangeAction()
      .then(res => this.setState({ FacilityType: res?.data?.FacilityType, initObj: res.data }))
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  handleChangeChecbox = (e) => {
    const { id, checked } = e.target;
    this.setState({ [id]: checked })
  }

  onFinish(values) {
    let message = {
      contentCourseCode: 'コースを指定してください',
      contentDateChar: '受診日を指定してください',
      contentTimeZone: '時間を指定してください',
      contentFacilityType: '施設を指定してください',
    }
    const { EffectiveCourse, EffectiveDate, EffectivePeriodOfTime, EffectiveFacilityType } = this.state;
    if (EffectiveCourse && !values.CourseCode) {
      ModalError(message.contentCourseCode);
    } else if (EffectiveDate && !values.DateChar) {
      ModalError(message.contentDateChar);
    } else if (EffectivePeriodOfTime && !values.TimeZone) {
      ModalError(message.contentTimeZone);
    } else if (EffectiveFacilityType && values.FacilityType === 0) {
      ModalError(message.contentFacilityType);
    } else if(EffectiveCourse || EffectiveDate || EffectivePeriodOfTime || EffectiveFacilityType) {
      let params = {
        EffectiveCourse: values.EffectiveCourse || false,
        EffectiveDate: values.EffectiveDate || false,
        EffectivePeriodTime: values.EffectivePeriodOfTime || false,
        EffectiveFacilityType: values.EffectiveFacilityType || false,
        Date: values.DateChar ? moment(values.DateChar).format('YYYY/MM/DD') : '',
        TimeZone: values.TimeZone || '',
        FacilityType: values.FacilityType || '',
        CourseCode: values.CourseCode || '',
        ExemptNum: this.state.initObj.ExemptNum,
        StsPeopleNum: this.state.initObj.StsPeopleNum,
        Lo_StsRun: this.props.Lo_StsRun || false
      }
      eventF12Action(params)
        .then(res => {
          if (this.props.onFinishScreen) {
            this.props.onFinishScreen({ Lo_StsRun: res.data.Lo_StsRun });
          }
        })
        .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
    }
  }

  render() {
    return (
      <div className="reserve-change">
        <Card title="予約変更">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{ FacilityType: 0 }}>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item name="EffectiveCourse" valuePropName="checked">
                  <Checkbox onChange={this.handleChangeChecbox}>コース</Checkbox>
                </Form.Item>
              </Col>
              <Col span={20}>
                <Form.Item name="CourseCode">
                  <Input.Search disabled={!this.state.EffectiveCourse}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component: (
                            <WS0265001_BasicCourseInquiry
                              onFinishScreen={({ Lo_CourseCode }) => {
                                this.formRef.current.setFieldsValue({
                                  CourseCode: Lo_CourseCode
                                });
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
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item name="EffectiveDate" valuePropName="checked" >
                  <Checkbox onChange={this.handleChangeChecbox}>受診日</Checkbox>
                </Form.Item>
              </Col>
              <Col span={20}>
                <Form.Item name="DateChar">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" disabled={!this.state.EffectiveDate} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item name="EffectivePeriodOfTime" valuePropName="checked" >
                  <Checkbox onChange={this.handleChangeChecbox}>時間帯</Checkbox>
                </Form.Item>
              </Col>
              <Col span={20}>
                <Form.Item name="TimeZone">
                  <Input.Search readOnly disabled={!this.state.EffectivePeriodOfTime}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component: (
                            <WS2553003_PeriodTimeInquiry
                              onFinishScreen={({ Lio_TimeZone }) => {
                                this.formRef.current.setFieldsValue({
                                  TimeZone: Lio_TimeZone
                                });
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
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item name="EffectiveFacilityType" valuePropName="checked" >
                  <Checkbox onChange={this.handleChangeChecbox}>施　設</Checkbox>
                </Form.Item>
              </Col>
              <Col span={20}>
                <Form.Item name="FacilityType" >
                  <Select disabled={!this.state.EffectiveFacilityType}>
                    {this.state.FacilityType?.map((item, index) => (
                      <Select.Option key={index + item.value} value={item.key}>{item.value}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Button type='primary' htmlType='submit' style={{ float: "right" }}>実行</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2556064_ReserveChange);
