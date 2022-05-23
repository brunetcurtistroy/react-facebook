import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import { Card, Form, DatePicker, Button, Space, Input, Modal, message } from "antd";
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
import moment from 'moment';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import AssociateInsureRequiredItemAction from "redux/AssociationHealthInsuranceReport/AssociateInsureRequiredItem/AssociateInsureRequiredItem.action";
const dateFormat = 'YYYY/MM/DD';
class WS2442001_AssociateInsureRequiredItem extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '協会けんぽ必須項目';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  onFinish(values) {

  }
  
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  showErrorModal(title) {
    Modal.error({
      width: 250,
      title: title,
      okText: 'OK'
    })
  }

  render() {
    var today = new Date().getFullYear() + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + ("0" + new Date().getDate()).slice(-2)
    return (
      <div className="associate-insure-required-item">
        <Card title="協会けんぽ必須項目">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ DateCharF: moment(today), DateCharT: moment(today) }}
          >
            <div style={{ border: '1px solid  #E3E4E1', padding: '1em' }}>
              <Space>
                <Form.Item name="DateCharF" label="日　付" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} allowClear={false} />
                </Form.Item>
                <Form.Item>~</Form.Item>
                <Form.Item name="DateCharT">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} allowClear={false} />
                </Form.Item>
              </Space>
            </div>
            <Button style={{ float: 'right', marginTop: '1em' }} type="primary"
              onClick={() => {
                if (moment(this.formRef.current.getFieldValue('DateCharF'), "YYYY/MM/DD").valueOf() > moment(this.formRef.current.getFieldValue('DateCharT'), "YYYY/MM/DD").valueOf()) {
                  this.showErrorModal('日付範囲エラー')
                } else {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '30%',
                      component: (
                        <WS0061009_CheckYesNoYes
                          Li_DisplayContent={'確認して下さい!'}
                          onFinishScreen={(output) => {
                            if (output.Lio_StsReturn) {
                              let data = {
                                DateCharF: moment(this.formRef.current.getFieldValue('DateCharF'))?.format("YYYY/MM/DD"),
                                DateCharT: moment(this.formRef.current.getFieldValue('DateCharT'))?.format("YYYY/MM/DD"),
                              }
                              AssociateInsureRequiredItemAction.RunButton(data)
                                .then(res => {
                                  // message.success(res);
                                }).catch(error => {
                                  const res = error.response;
                                  if (!res || res.data || res.data.message) {
                                    message.error('エラーが発生しました');
                                  }
                                  message.error(error.response.data.message);
                                });
                            }
                            this.closeModal()
                          }}
                        />),
                    },
                  })
                }
              }} >実行</Button>
          </Form>
        </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2442001_AssociateInsureRequiredItem);

