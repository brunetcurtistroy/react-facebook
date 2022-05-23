import React from "react";
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import { Card, Form, Row, Input, Button, Space, Spin, message, Modal, InputNumber } from "antd";
import VisitsChangeConfirmAction from 'redux/ReservationBusiness/PersonalReserveProcess/VisitsChangeConfirm.actions'

const StyleInput = {
  border: 'none',
  background: 'transparent'
}

const styleLabel = {
  textAlign: "right",
  paddingRight: 5,
  width: 75,
  color: '#1460b3',
  fontWeight: 'bold'
};

const styleBlock = {
  padding: '10px',
  border: '1px solid #7ec1ff',
  marginBottom: '10px'
}
class WS2537059_VisitsChangeConfirm extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_PersonalNumId: PropTypes.any,
    Li_KanaName: PropTypes.any,
    Li_KanjiName: PropTypes.any,
    Li_DateBirth: PropTypes.any,
    Li_Gender: PropTypes.any,
    Li_Date: PropTypes.any,
    Li_FacilityNum: PropTypes.any,
    Li_TimeZone: PropTypes.any,
    Li_Am_PmDivision: PropTypes.any,
    Li_NClassify: PropTypes.any,
    Li_OtherCondition: PropTypes.any,
    Li_ConsultCourse: PropTypes.any,
    Li_ContractAbbreviation: PropTypes.any,
    Li_MedicalExamLocation: PropTypes.any,
    Li_Remarks: PropTypes.any,
    Lo_AcceptNum: PropTypes.any,
    Lo_AcceptExec: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "受付処理";

    this.state = {};
  }
  componentDidMount() {
    this.GetScreenData()
  }
  componentDidUpdate(preV) {
    if (this.props !== preV) {
      this.GetScreenData()
    }
  }

  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lo_AcceptExec: false,
        Lo_AcceptNum: this.formRef.current?.getFieldValue("Lo_AcceptNum")
      })
    }
  }

  GetScreenData() {
    this.setState({ isLoaddingFrm: true })
    let params = {
      Li_ReserveNum: this.props.Li_ReserveNum || '',
      Li_FacilityNum: this.props.Li_FacilityNum || '',
      Li_MedicalExamLocation: this.props.Li_MedicalExamLocation || '',
      Li_Date: this.props.Li_Date || '',
      Lo_AcceptNum: this.props.Lo_AcceptNum || '',
      Li_CourseLevel: this.props.Li_CourseLevel || '',
      Li_PersonalNumId: this.props.Li_PersonalNumId || '',
      Li_KanaName: this.props.Li_KanaName || '',
      Li_KanjiName: this.props.Li_KanjiName || '',
      Li_Gender: this.props.Li_Gender || '',
      Li_DateBirth: this.props.Li_DateBirth || '',
      Li_TimeZone: this.props.Li_TimeZone || '',
      Li_Am_PmDivision: this.props.Li_Am_PmDivision || '',
      Li_NClassify: this.props.Li_NClassify || '',
      Li_ConsultCourse: this.props.Li_ConsultCourse || '',
      Li_ContractAbbreviation: this.props.Li_ContractAbbreviation || '',
      Li_Remarks: this.props.Li_Remarks || '',
    }
    VisitsChangeConfirmAction.GetScreenData(params)
      .then(res => {
        let data = {
          ...res?.data,
          Li_Am_PmDivision: this.props.Li_Am_PmDivision || '',
          Li_ContractAbbreviation: res?.data?.Li_ContractAbbreviation?.slice(0, res?.data?.Li_ContractAbbreviation?.lastIndexOf('('))
        }
        this.formRef.current?.setFieldsValue(data)
      })
      .catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isLoaddingFrm: false }))
  }

  AcceptBtn_1() {
    this.setState({ isLoaddingFrm: true })
    let params = {
      Li_FacilityNum: this.props.Li_FacilityNum || '',
      Li_CourseLevel: this.props.Li_CourseLevel || 0,
      Li_TimeZone: this.props.Li_TimeZone || '',
      Li_ConsultCourse: this.props.Li_ConsultCourse || '',
      Li_ReserveNum: this.props.Li_ReserveNum || '',
      Lo_AcceptNum: this.formRef.current?.getFieldValue("Lo_AcceptNum"),
      Li_Date: this.props.Li_Date || '',
    }
    VisitsChangeConfirmAction.AcceptBtn_1(params)
      .then(res => {
        this.setState({ isLoaddingFrm: false })
        let war = res?.data?.warring
        let err = res?.data.error
        if (war) {
          Modal.confirm({
            title: war,
            width: 375,
            onOk: () => {
              this.AcceptBtn_2()
            },
            onCancel: () => {
               //////
            }
          })
        } else {
          if (err) {
            Modal.error({
              title: err,
              width: 375,
              onOk: () => {
                this.formRef.current?.getFieldInstance('Lo_AcceptNum').focus()
              }
            })
          } else {
            if (this.props.onFinishScreen) {
              this.props.onFinishScreen({
                Lo_AcceptExec: true,
                Lo_AcceptNum: this.formRef.current?.getFieldValue("Lo_AcceptNum")
              })
            }
          }
        }
      })
      .catch((err) => {
        this.setState({ isLoaddingFrm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.formRef.current?.getFieldInstance('Lo_AcceptNum').focus()
      })
  }

  AcceptBtn_2() {
    this.setState({ isLoaddingFrm: true })
    let params = {
      Li_FacilityNum: this.props.Li_FacilityNum || '',
      Li_CourseLevel: this.props.Li_CourseLevel || '',
      Li_TimeZone: this.props.Li_TimeZone || '',
      Li_ConsultCourse: this.props.Li_ConsultCourse || '',
      Li_ReserveNum: this.props.Li_ReserveNum || '',
      Lo_AcceptNum: this.formRef.current?.getFieldValue("Lo_AcceptNum"),
      Li_Date: this.props.Li_Date || '',
    }
    VisitsChangeConfirmAction.AcceptBtn_2(params)
      .then(res => {
        // this.AcceptBtn_1()
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lo_AcceptExec: true,
            Lo_AcceptNum: this.formRef.current?.getFieldValue("Lo_AcceptNum")
          })
        }
        this.setState({ isLoaddingFrm: false })
      })
      .catch((err) => {
        this.setState({ isLoaddingFrm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
  }

  onFinish(values) { }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  AcceptBtn() {
    this.setState({ isLoaddingFrm: true })
    let data = {
      Li_FacilityNum: this.isEmpty(this.props.Li_FacilityNum) ? "" : this.props.Li_FacilityNum,
      Li_CourseLevel: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
      Li_TimeZone: this.isEmpty(this.formRef.current?.getFieldValue("Li_TimeZone")) ? "" : this.formRef.current?.getFieldValue("Li_TimeZone"),
      Li_ConsultCourse: this.isEmpty(this.formRef.current?.getFieldValue("Li_ConsultCourse")) ? "" : this.formRef.current?.getFieldValue("Li_ConsultCourse"),
      Li_ReserveNum: this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
      Lo_AcceptNum: this.isEmpty(this.formRef.current?.getFieldValue("Lo_AcceptNum")) ? "" : this.formRef.current?.getFieldValue("Lo_AcceptNum"),
      Li_Date: this.isEmpty(this.formRef.current?.getFieldValue("Li_Date")) ? "" : this.formRef.current?.getFieldValue("Li_Date"),
      StsConfirm: this.isEmpty(this.formRef.current?.getFieldValue("StsConfirm")) ? "" : this.formRef.current?.getFieldValue("StsConfirm"),
    }
    VisitsChangeConfirmAction.AcceptBtn(data).then(res => {
      if (this.props.onFinishScreen) {
        this.props.onFinishScreen()
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoaddingFrm: false }))
  }
  render() {
    return (
      <div className="visit-change-confirm">
        <Card title="受診変更確認">
          <Spin spinning={this.state.isLoaddingFrm} >
            <Form ref={this.formRef} onFinish={this.onFinish} autoComplete="off" >
              <div style={styleBlock}>
                <Row>
                  <label style={styleLabel}>個人番号</label>
                  <Form.Item name='Li_PersonalNumId' style={{ width: 120 }}>
                    <Input readOnly style={{ ...StyleInput, textAlign: 'right' }} />
                  </Form.Item>
                </Row>
                <Row>
                  <label style={styleLabel}>氏名</label>
                  <Form.Item name='Li_KanaName' style={{ width: 'calc(100% - 75px)' }} >
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                </Row>
                <Row>
                  <label style={styleLabel}></label>
                  <Form.Item name='Li_KanjiName' style={{ width: 'calc(100% - 75px)' }}  >
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                </Row>
                <Row>
                  <label style={styleLabel}>性別</label>
                  <Form.Item name='Expresstion_10' style={{ width: 80, marginRight: 10 }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                  <label style={styleLabel}>生年月日</label>
                  <Form.Item name='Li_DateBirth' style={{ width: 'calc(100% - 240px)' }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                </Row>
              </div>

              <div style={styleBlock}>
                <Row>
                  <label style={styleLabel}>受診日</label>
                  <Form.Item name='Li_Date' style={{ width: 120 }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                  <Form.Item style={{ width: 'calc(100% - 195px)' }}>
                    <div style={{ width: 48, background: '#1890ff', color: '#fff', textAlign: 'center', float: "right" }} >
                      受 付
                    </div>
                  </Form.Item>
                </Row>
                <Row>
                  <label style={styleLabel}>時間帯</label>
                  <Form.Item name='Li_TimeZone' style={{ width: 60, marginRight: 5 }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                  <Form.Item name='Li_Am_PmDivision' style={{ width: 'calc(100% - 145px)' }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                </Row>
                <Row>
                  <label style={styleLabel}>施設</label>
                  <Form.Item name='facility_name' style={{ width: 'calc(100% - 75px)' }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                </Row>
                <Row>
                  <label style={styleLabel}>ｎ次区分</label>
                  <Form.Item name='Expresstion_11' style={{ width: 'calc(100% - 75px)' }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                </Row>
                <Row>
                  <label style={styleLabel}>コ ー ス</label>
                  <Form.Item name='Li_ConsultCourse' style={{ width: 50, marginRight: 10 }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                  <Form.Item name='Li_ContractAbbreviation' style={{ width: 'calc(100% - 135px)' }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                </Row>
                <Row>
                  <label style={styleLabel}>備考</label>
                  <Form.Item name='Li_Remarks' style={{ width: 'calc(100% - 75px)' }}>
                    <Input readOnly style={StyleInput} />
                  </Form.Item>
                </Row>
              </div>

              <Row style={{ float: "right", margin: "10px 0 0 0" }}>
                <Space>
                  <Form.Item>
                    <div style={{ width: 75, background: '#1890ff', color: '#fff', textAlign: 'center' }} >受付番号</div>
                  </Form.Item>
                  <Form.Item name="Lo_AcceptNum">
                    <InputNumber className='custom-input-number' maxLength={6}></InputNumber>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary"
                      onClick={() => {
                        if (!this.formRef.current?.getFieldValue("Lo_AcceptNum") || this.formRef.current?.getFieldValue("Lo_AcceptNum") === 0) {
                          Modal.error({
                            width: '315px',
                            title: "受付番号に0は登録できません",
                            okText: "Ok",
                          });
                        } else {
                          // if (this.props.onFinishScreen) {
                          //   this.props.onFinishScreen({ Lo_AcceptExec: true, Lo_AcceptNum: this.formRef.current?.getFieldValue("Lo_AcceptNum") })
                          // }

                          this.AcceptBtn_1()
                        }
                      }} >受　付</Button>
                  </Form.Item>
                </Space>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2537059_VisitsChangeConfirm);
