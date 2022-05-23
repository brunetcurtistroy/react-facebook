import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Radio, Button, Space, message, Spin, Modal } from "antd";
import SetAddAction from 'redux/ReservationBusiness/PersonalReserveProcess/SetAdd.actions'
import WS0302001_SetInfoSearch from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0302001_SetInfoSearch";
import WS0061009_CheckYesNoYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes";
class WS2537046_SetAdd extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractClassifyCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_Date: PropTypes.any,
    Li_CourseCode: PropTypes.any,
    Li_ContractAgeCalculateDivision: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'セット追加';

    this.state = {
      isLoaddingFrm: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      SetAndInspectCode: ''
    };
  }
  componentDidMount() {

  }
  componentDidUpdate(PreV) {

  }
  ConfirmF4() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 500,
        component: (
          <WS0061009_CheckYesNoYes
            Li_DisplayContent={this.GetMessage()}
            onFinishScreen={(output) => {
              if (output?.Lio_StsReturn) {
                let data = {
                  Li_OfficeCode: this.props.Li_OfficeCode,
                  Li_BranchStoreCode: this.props.Li_BranchStoreCode,
                  Li_ApplicationAttributeReDisplay: this.props.Li_ApplicationAttributeReDisplay,
                  Li_PersonalNumId: this.props.Li_PersonalNumId,
                  Li_ContractType: this.props.Li_ContractType,
                  Li_ContractClassifyCode: this.props.Li_ContractClassifyCode,
                  Li_ContractStartDate: this.props.Li_ContractStartDate,
                  Li_ContractNum: this.props.Li_ContractNum,
                  Li_Date: this.props.Li_Date,
                  Li_ReserveNum: this.props.Li_ReserveNum,
                  Li_Option: this.props.Li_Option,
                  FacilityNumHospital_Out: this.props.FacilityNumHospital_Out,
                  ChangeType: this.formRef.current?.getFieldValue("ChangeType"),
                  SetAndInspectCode: this.formRef.current?.getFieldValue("SetAndInspectCode"),
                  Am_PmDivision: this.props.Am_PmDivision,
                  NClassify: this.props.NClassify,
                  Li_StsConfirm: output?.Lio_StsReturn,
                }
                SetAddAction.Confirm(data)
                  .then(res => {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({ Lo_StsReturn: true })
                    }
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
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  GetMessage() {
    let message = ""
    if (this.formRef.current?.getFieldValue("ChangeType") === 40) {
      message = "ｵﾌﾟｼｮﾝ"
    } else if (this.formRef.current?.getFieldValue("ChangeType") === 50) {
      message = "追加"
    } else if (this.formRef.current?.getFieldValue("ChangeType") === 60) {
      message = "削除"
    }
    return message + "ｾｯﾄ[" + this.formRef.current?.getFieldValue("SetAndInspectCode") + "   : " + this.formRef.current?.getFieldValue("set_short_name") + "]を追加しますか?"
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
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
      <div className="set-add">
        <Card title="セット追加">
          <Spin spinning={this.state.isLoaddingFrm} >
            <Form
              ref={this.formRef}
              initialValues={{
                ChangeType: 50
              }}
            >
              <Form.Item name="ChangeType" >
                <Radio.Group>
                  <Radio value={40}>ｵﾌﾟｼｮﾝ</Radio>
                  <Radio value={50}>追加</Radio>
                  <Radio value={60}>不要</Radio>
                </Radio.Group>
              </Form.Item>
              <Space>
                <Form.Item label="セット" name="SetAndInspectCode">
                  <Input.Search maxLength={8} style={{ width: 130 }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state,
                          visible: true,
                          width: 1000,
                          component: (
                            <WS0302001_SetInfoSearch
                              Li_SetIdentify={'Set'}
                              Li_StartDate={this.props.Li_Date}
                              Li_CourseCode={this.props.Li_CourseCode}
                              Li_ContractType={this.props.Li_ContractType}
                              Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                              Li_ContractStartDate={this.props.Li_ContractStartDate}
                              Li_ContractNum={this.props.Li_ContractNum}
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  SetAndInspectCode: output.Lo_SetCode,
                                  set_short_name: output.recordData.set_short_name,
                                });
                                this.setState({
                                  SetAndInspectCode: output.Lo_SetCode
                                })
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                    onChange={(e) => {
                      this.formRef.current?.setFieldsValue({
                        set_short_name: '',
                      });

                      this.setState({
                        SetAndInspectCode: e.target.value
                      })
                    }}
                  />
                </Form.Item>
                <Form.Item >
                  {this.formRef.current?.getFieldValue("set_short_name")}
                </Form.Item>
              </Space><br />
              <Button type="primary" style={{ float: 'right', marginTop: '1em' }}
                disabled={!this.state.SetAndInspectCode}
                onClick={() => this.ConfirmF4()}
              >確定</Button>
            </Form>
          </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2537046_SetAdd);
