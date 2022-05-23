import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getScreenDataConditionSettingAction, saveButtonConditionSettingAction, deleteButtonConditionSettingAction } from "redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions";
import { Card, Form, Checkbox, Select, Button, Row, Space } from "antd";
import { ModalConfirm } from "components/Commons/ModalConfirm";

class WS0310120_ConditionSetting extends React.Component {
  static propTypes = {
    Li_ContractStartDate: PropTypes.any,
    Li_SetCode: PropTypes.any,
    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '条件設定';

    this.state = {
      condition_relationData: [],
      CourseConditionHospitalOutData: [],
      CourseConditionNTsugikenmiData: [],
      condition_age_identify_cdData: [],
      isCourseConditionPresence: true,
      isChangeValue: false,
      initObj: {
        CourseConditionPresence: 0,
        condition_gender: '',
        condition_relationship: '',
        condition_am_pm: '',
        CourseConditionHospitalOut: '',
        CourseConditionNTsugikenmi: '',
        condition_age_identify_code: '',
        Expression_33: true, // hidden button delete,
        id: ''
      }
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.callAPILoadData({
      Li_ContractStartDate: this.props.Li_ContractStartDate,
      Li_SetCode: this.props.Li_SetCode
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.callAPILoadData({
        Li_ContractStartDate: this.props.Li_ContractStartDate,
        Li_SetCode: this.props.Li_SetCode
      })
    }
  }

  callAPILoadData = (params) => {
    getScreenDataConditionSettingAction(params)
      .then(res => {
        if (res.data) {
          let data = res.data;
          let objTemp = {
            id: data.id,
            CourseConditionPresence: data.Expression_20,
            condition_gender: data.condition_gender,
            condition_relationship: data.condition_relation,
            condition_am_pm: data.condition_am_pm,
            CourseConditionHospitalOut: data.CourseConditionHospitalOut,
            CourseConditionNTsugikenmi: data.CourseConditionNTsugikenmi,
            condition_age_identify_code: data.condition_age_identify_cd,
            Expression_33: data.Expression_33
          }

          this.formRef?.current?.setFieldsValue({ ...objTemp })
          this.setState({
            condition_relationData: data.condition_relationData,
            CourseConditionHospitalOutData: data.CourseConditionHospitalOutData,
            CourseConditionNTsugikenmiData: data.CourseConditionNTsugikenmiData,
            condition_age_identify_cdData: data.condition_age_identify_cdData,
            isCourseConditionPresence: !data.Expression_20, // edit form
            initObj: {
              ...this.state.initObj,
              ...objTemp
            }
          });
        }
      })
  }

  onFinish(values) {
    const params = {
      Li_SetCode: this.props.Li_SetCode,
      id: this.state.initObj.id,
      CourseConditionPresence: values.CourseConditionPresence ? 1 : 0,
      condition_gender: values.condition_gender,
      condition_relation: values.condition_relationship,
      condition_am_pm: values.condition_am_pm,
      CourseConditionHospitalOut: values.CourseConditionHospitalOut,
      CourseConditionNTsugikenmi: values.CourseConditionNTsugikenmi,
      condition_age_identify_cd: values.condition_age_identify_code,
    };
    saveButtonConditionSettingAction(params).then(() => {
      if(this.props.onFinishScreen) 
        this.props.onFinishScreen({Lo_stsChangeValue: this.state.isChangeValue})
    });
  }

  render() {
    return (
      <div className="condition-setting">
        <Card title="契約内容設定">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Form.Item name="CourseConditionPresence" label="条件" valuePropName="checked">
              <Checkbox onChange={(e) => this.setState({ isCourseConditionPresence: !e.target.checked, isChangeValue: e.target.checked })}>
                有り
              </Checkbox>
            </Form.Item>

            <Row>
              <Space >
                <Form.Item name="condition_gender" label="性別" >
                  <Select style={{ width: '100px' }} disabled={this.state.isCourseConditionPresence}>
                    <Select.Option value='0'>　</Select.Option>
                    <Select.Option value='1'>男</Select.Option>
                    <Select.Option value='2'>女</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="condition_relationship" label="続柄" >
                  <Select style={{ width: '100px' }} disabled={this.state.isCourseConditionPresence} allowClear>
                    {this.state.condition_relationData?.map((item, index) => (
                      <Select.Option key={() => Math.random()} value={item.key}>{item.value}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="condition_am_pm" label="ＡＭＰＭ" >
                  <Select style={{ width: '100px' }} disabled={this.state.isCourseConditionPresence}>
                    <Select.Option value="　" >　</Select.Option>
                    <Select.Option value="AM">AM</Select.Option>
                    <Select.Option value="PM">PM</Select.Option>
                  </Select>
                </Form.Item>
              </Space>
            </Row>

            <Row>
              <Space >
                <Form.Item name="CourseConditionHospitalOut" label="院内">
                  <Select style={{ width: '100px' }} disabled={this.state.isCourseConditionPresence} allowClear>
                    {this.state.CourseConditionHospitalOutData?.map((item, index) => (
                      <Select.Option key={index + item.value} value={item.key}>{item.value}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="CourseConditionNTsugikenmi" label="ｎ次" >
                  <Select style={{ width: '100px' }} disabled={this.state.isCourseConditionPresence} allowClear>
                    {this.state.CourseConditionNTsugikenmiData?.map((item, index) => (
                      <Select.Option key={index + item.value} value={item.key}>{item.value}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="condition_age_identify_code" label="年齢　　" >
                  <Select style={{ width: '400px' }} disabled={this.state.isCourseConditionPresence} allowClear>
                    {this.state.condition_age_identify_cdData?.map((item, index) => (
                      <Select.Option key={index + item.value} value={item.key}>{item.value}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Space>
            </Row>
            <Form.Item className='mt-3' style={{ float: "right" }}>
              <Space>
                <Button type="primary" hidden={this.state.isCourseConditionPresence} htmlType='submit'>
                  保存
                </Button>
                <Button type="primary" hidden={!this.state.initObj.Expression_33}
                  onClick={() => {
                    ModalConfirm({
                      content: '削除を実施しますか？',
                      okText: 'は　い',
                      cancelText: 'いいえ',
                      styleIconModal: {color: '#006DC9'},
                      onOk: () => {
                        deleteButtonConditionSettingAction({ id: this.state.initObj.id }).then(() => {
                          if(this.props.onFinishScreen) 
                            this.props.onFinishScreen({Lo_stsChangeValue: true})
                        });
                      }
                    })
                  }}>
                  条件解除
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0310120_ConditionSetting);
