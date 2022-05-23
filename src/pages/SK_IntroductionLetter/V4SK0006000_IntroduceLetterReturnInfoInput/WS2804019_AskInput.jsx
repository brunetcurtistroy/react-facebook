import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes, { number } from 'prop-types';
import { Card, Form, Input, Checkbox, Radio, Row, Col, Space, DatePicker, Modal, message } from "antd";
import WS0887001_IntroduceLetterVariousMasterInquiry from 'pages/SK_IntroductionLetter/V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry.jsx';
import IntroduceLetterReturnInfoInputService from "services/IntroductionLetter/IntroduceLetterReturnInfoInput/IntroduceLetterReturnInfoInputService";
import moment from 'moment';
import  ModalDraggable  from "components/Commons/ModalDraggable";

const dateFormat = 'YYYY/MM/DD';

class WS2804019_AskInput extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_Department: PropTypes.any,
    Li_Title: PropTypes.any,

    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'おたずね入力';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      }
    };
  }
  componentDidMount() {
    let params = {
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_Department: this.props.Li_Department
    }
    this.callApiAskInput(params);
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let params = {
        Li_ReserveNum: this.props.Li_ReserveNum,
        Li_Department: this.props.Li_Department
      }
      this.callApiAskInput(params);
    }
  }
  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        //pass value
      })
    }
  }
  callApiAskInput = (params) => {
    IntroduceLetterReturnInfoInputService.fetchAskInputService(params).then((res) => {
      this.formRef.current.setFieldsValue({
        formData: {
          ...res.data,
          HasBeenReturned: res.data.HasBeenReturned ? 1 : 0,
          visit_division: res.data.visit_division ? 1 : 0,
          ReturnDateChar: moment(res.data.ReturnDateChar, dateFormat),
          IssueDateChar: moment(res.data.IssueDateChar, dateFormat),
          ExamDateChar: moment(res.data.ExamDateChar, dateFormat),
        }
      });
    }).catch((error) => {
      const res = error.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    }).finally(() => {
    })
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

  showIntroduceLetterVariousMasterInquiry() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0887001_IntroduceLetterVariousMasterInquiry
            Li_ManageCode={4}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                MedicalInstitutionCode: output?.Lo_VariousCodes
              })
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  render() {
    return (
      <div className="ask-input" >
        <Card title="おたずね入力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row>
              <Col span={8}>
                <Space>
                  <Form.Item name={['formData', 'HasBeenReturned']} valuePropName="checked">
                    <Checkbox>返送あり</Checkbox>
                  </Form.Item>
                  <Form.Item name={['formData', 'ReturnDateChar']} >
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} allowClear={false} />
                  </Form.Item>
                </Space>
              </Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                <Space>
                  <Form.Item name={['formData', 'IssueDateChar']}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} allowClear={false} />
                  </Form.Item>
                  <Form.Item >
                    <span>発行</span>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
            <Form.Item name={['formData', 'visit_division']}>
              <Radio.Group >
                <Radio value={0}>受診した </Radio>
                <Radio value={1}>受診していない</Radio>
              </Radio.Group>
            </Form.Item>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '0.5em', marginBottom: '1em' }}>
              <Form.Item name={['formData', 'ExamDateChar']} label="&ensp;検 査 日" >
                <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} allowClear={false} />
              </Form.Item>
              <Form.Item name={['formData', 'medical_institution_name']} label="医療機関" >
                <Input.Search maxLength={128} onSearch={() => this.showIntroduceLetterVariousMasterInquiry()} />
              </Form.Item>
              <Form.Item name={['formData', 'result']} label="結　　果" >
                <Input maxLength={256} />
              </Form.Item>
            </div>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '0.5em' }}>
              <Form.Item name={['formData', 'special_1']} label="特　　記" >
                <Input maxLength={256} />
              </Form.Item>
              <Form.Item name={['formData', 'special_2']} label="&emsp;&emsp;&emsp;&emsp;" >
                <Input maxLength={256} />
              </Form.Item>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2804019_AskInput);
