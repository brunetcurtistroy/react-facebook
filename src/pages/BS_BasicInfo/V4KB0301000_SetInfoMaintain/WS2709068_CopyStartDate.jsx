import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Button, DatePicker, Row, Col, Input, message, Modal } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import CopyStartDateAction from "redux/basicInfo/SetInfoMaintain/CopyStartDate.action";
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
import WS0061012_CheckYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061012_CheckYes";

const grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class WS2709068_CopyStartDate extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_SetIdentifyCopySource: PropTypes.any,
    Li_SetCodeCopySource: PropTypes.any,
    Li_SetNameCopySource: PropTypes.any,
    Li_StartDateCopySource: PropTypes.any,

    Lo_StartDateChar: PropTypes.any,

    Lo_ExecPresence: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '複写開始日';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      StartDateChar: null
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.setFormValue();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setFormValue();
    }
  }

  setFormValue() {
    this.formRef.current.setFieldsValue({
      SetCode: this.props.Li_SetCodeCopySource,
      set_name: this.props.Li_SetNameCopySource,
      StartDate: this.props.Li_StartDateCopySource?.replaceAll('-', '/'),
      StartDateChar: null
    })
  }

  CopyStartDate(values) {
    let params = {
      ...values,
      StartDateChar: values.StartDateChar?.format("YYYY/MM/DD")
    }

    CopyStartDateAction.CopyStartDate(params)
      .then(res => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 300,
            component: (
              <WS0061012_CheckYes
                Li_Message={"登録しました。"}
                onFinishScreen={(output) => {
                  if (output.Lio_StsReturn) {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({
                        Lo_StartDateChar: this.formRef.current.getFieldValue('StartDateChar')
                      });
                    }
                  }
                  this.closeModal()
                }}
              />),
          },
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

  onFinish(values) {
    if (values.StartDateChar?.format("YYYY/MM/DD") === values.StartDate) {
      Modal.error({
        width: 350,
        title: '複写先の日付は既に存在します。'
      })
    } else {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 350,
          component: (
            <WS0061009_CheckYesNoYes
              Li_DisplayContent={"複写登録しますか？"}
              onFinishScreen={(output) => {
                if (output.Lio_StsReturn) {
                  this.CopyStartDate(values)
                }
                this.closeModal()
              }}
            />),
        },
      })
    }
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
      <div className="copy-start-date">
        <Card title="複写開始日">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item label="コード・名称" {...grid} style={{ marginBottom: '5px' }}>
              <div style={{ display: 'inline', width: '100%' }}>
                <Form.Item name="SetCode" style={{ marginBottom: '0', width: 100, float: 'left' }}>
                  <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
                </Form.Item>
                <Form.Item name="set_name" style={{ width: 'calc(100% - 100px)', marginBottom: '0' }}>
                  <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item label="複写元日付" name="StartDate" {...grid} style={{ marginBottom: '5px' }}>
              <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
            </Form.Item>

            <Row gutter={24}>
              <Col span={8} offset={7}><ArrowDownOutlined style={{ width: "50px", height: "50px", lineHeight: "50px", fontSize: "20px" }} /></Col>
            </Row>
            <Form.Item label="複写先日付" {...grid} style={{ marginBottom: '5px' }} rules={[{ required: true }]}>
              <div style={{ display: 'inline', width: '100%' }}>
                <Form.Item name="StartDateChar" style={{ marginBottom: '0', width: 120, float: 'left' }}>
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={false}
                    onChange={(value) => {
                      this.setState({
                        StartDateChar: value
                      })
                    }} />
                </Form.Item>
                <Form.Item style={{ width: 'calc(100% - 120px)' }}>
                  <Button
                    type="primary"
                    style={{ float: "right", marginLeft: "10px" }}
                    htmlType="submit"
                    disabled={!this.state.StartDateChar}
                  >
                    登録
                  </Button>
                </Form.Item>
              </div>
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2709068_CopyStartDate);
