import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Input, Button, Row, Col, Modal, Form, message } from "antd";
import WS2768004_InspectSelect from 'pages/KS_CooperationRelated/YMGA0310_EMedicalRecordsSingleTransmission/WS2768004_InspectSelect.jsx';
import {
  confirmButtonEMedicalRecordsInspectAddSubAction, getScreenDataMedicalRecordsInspectAddSubAction, ChangeInspectCodeMedicalRecordsInspectAddSubAction
} from "redux/CooperationRelated/EMedicalRecordsSingleTransmission/EMedicalRecordsInspectAddSub.actions";
import ModalDraggable from "components/Commons/ModalDraggable";

class WS2768001_EMedicalRecordsInspectAddSub extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_InspectCode: PropTypes.any,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '[E-カルテ] 検査追加SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initParams: {
        InspectScheduledDateChar: '',
        InspectCode: '',
        UrgentClassify: '',
        ReserveNum: ''
      }
    };
    this.onFinish = this.onFinish.bind(this);
  }
  componentDidMount = () => {
    let params = {
      Li_ReserveNum: this.props.Li_ReserveNum || '',
      InspectCode: this.props.Li_InspectCode || ''
    }
    this.loadInitData(params);
    this.setState({
      initParams: {
        ...this.state.initParams,
        Li_ReserveNum: this.props.Li_ReserveNum || '',
        InspectCode: this.props.Li_InspectCode || ''
      }
    });
    this.formRef?.current?.setFieldsValue({
      InspectCode: this.props.Li_InspectCode || ''
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      let params = {
        Li_ReserveNum: this.props.Li_ReserveNum || '',
        InspectCode: this.props.Li_InspectCode || ''
      }
      this.loadInitData(params);
      this.setState({
        initParams: {
          ...this.state.initParams,
          Li_ReserveNum: this.props.Li_ReserveNum || '',
          InspectCode: this.props.Li_InspectCode || ''
        }
      });
      this.formRef?.current?.setFieldsValue({
        InspectCode: this.props.Li_InspectCode || ''
      });
    }
  }

  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen()
    }
  }

  loadInitData = (params) => {
    getScreenDataMedicalRecordsInspectAddSubAction(params)
      .then(res => {
        if (res) {
          this.setState({
            initParams: {
              ...this.state.initParams,
              UrgentClassify: res.data.UrgentClassify || '',
              InspectScheduledDateChar: res.data.InspectScheduledDateChar || ''
            }
          });
          this.formRef?.current?.setFieldsValue({
            InspectScheduledDateChar: res.data.InspectScheduledDateChar?.replaceAll('-', '/'),
            official: res.data.official
          });
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  confirmButton = (params) => {
    confirmButtonEMedicalRecordsInspectAddSubAction(params)
      .then(res => {
        message.success('成功');
        this.formRef?.current?.setFieldsValue({
          InspectCode: "",
          official: ""
        });
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  handleChange = (value, name) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        [name]: value
      }
    });
  }
  ChangeInspectCode() {
    ChangeInspectCodeMedicalRecordsInspectAddSubAction({ InspectCode: this.formRef?.current?.getFieldValue('InspectCode') })
      .then(res => {
        this.formRef?.current?.setFieldsValue({
          InspectCode: res?.data?.InspectCode ?? "",
          official: res?.data?.official ?? ""
        });
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }
  onFinish(values) {
    this.confirmButton(this.state.initParams);
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }
  render() {
    return (
      <div className="e-medical-records-inspect-add-sub">
        <Card title="[E-カルテ] 検査追加SUB">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label='予定日' name='InspectScheduledDateChar'>
                  <Input onChange={e => this.handleChange(e.target.value, 'InspectScheduledDateChar')} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label='検　査' name='InspectCode'>
                  <Input.Search
                    onChange={e => this.handleChange(e.target.value, 'InspectCode')}
                    onBlur={() => this.ChangeInspectCode()}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 700,
                          component:
                            <WS2768004_InspectSelect
                              Lio_InspectCode={this.formRef?.current?.getFieldValue('InspectCode')}
                              onFinishScreen={({ Lio_InspectCode, recordData }) => {
                                this.formRef?.current?.setFieldsValue({
                                  InspectCode: Lio_InspectCode,
                                  official: recordData.official
                                });
                                this.handleChange(Lio_InspectCode, 'InspectCode');
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                });
                              }}
                            />
                          ,
                        },
                      });
                    }} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name='official'>
                  <Input bordered={false} readOnly />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType='submit' style={{ margin: '10px', float: 'right' }}>確　定</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2768001_EMedicalRecordsInspectAddSub);
