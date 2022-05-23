import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Space, InputNumber, Modal, message } from "antd";

import { CaretDownOutlined } from '@ant-design/icons';
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle";
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
import CopyXmlParamAction from "redux/SpecificInsureMaintenance/XmlParamMaintain/Copy.action";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1311003_Copy extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_InspectCode: PropTypes.any,
    Li_InspectShortName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  }

  constructor(props) {
    super(props);

    // document.title = '複写';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
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
    this.formRef.current?.setFieldsValue({
      Li_InspectCode: this.props.Li_InspectCode,
      Li_InspectShortName: this.props.Li_InspectShortName
    })
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish(values) {
    let params = {
      ...values,
      exam_code: this.props.Li_InspectCode,
      exam_short_name: this.props.Li_InspectShortName
    }
    if (values.InspectCode) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 400,
          component: (
            <WS0061009_CheckYesNoYes
              Li_DisplayContent={"削除を実行しますか?"}
              onFinishScreen={(output) => {
                if (output.Lio_StsReturn) {
                  CopyXmlParamAction.copyData(params)
                    .then(res => { })
                    .catch((err) => {
                      const res = err.response;
                      if (!res || !res.data || !res.data.message) {
                        message.error("エラーが発生しました");
                        return;
                      }
                      message.error(res.data.message);
                    });
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen()
                  }
                }
                this.closeModal()
              }}
            />),
        },
      })
    } else {
      Modal.error({
        width: "250px",
        content: "検査が無効です!",
        okText: "OK",
      })
    }
  }

  render() {
    return (
      <div className="copy">
        <Card title="複写">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item label="複写元">
              <Space>
                <Form.Item name="Li_InspectCode" style={{ marginBottom: 0 }}>
                  <InputNumber maxLength={8} style={{ width: 120 }} />
                </Form.Item>
                <Form.Item name="Li_InspectShortName" style={{ marginBottom: 0 }}>
                  <Input readOnly style={{ border: 'none', background: 'transparent' }} />
                </Form.Item>
              </Space>
            </Form.Item>
            <div style={{ marginLeft: '95px', marginBottom: '10px' }}>
              <CaretDownOutlined style={{ fontSize: 30 }} />
            </div>

            <Form.Item label="複写先">
              <Space>
                <Form.Item name="InspectCode">
                  <Input.Search type="number" maxLength={8} readOnly style={{ width: 120 }}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '80%',
                          component: (
                            <WS0271001_InspectItemSearchQuerySingle
                              Lio_InspectItemCode={this.formRef.current?.getFieldValue('InspectCode')}
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  InspectCode: output.Lio_InspectItemCode,
                                  exam_short_name: output.recordData.exam_short_name
                                })

                                this.closeModal();
                              }}
                            />),
                        },
                      })
                    }}
                  />
                </Form.Item>
                <Form.Item name="exam_short_name">
                  <Input readOnly style={{ border: 'none', background: 'transparent' }} />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">実　行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1311003_Copy);
