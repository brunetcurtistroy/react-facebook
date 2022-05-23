import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Button, Space, InputNumber, Spin, Modal, message } from "antd";
import { SaveOutlined } from '@ant-design/icons';

import InputNewAction from "redux/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/InputNew.action";

import WS2489006_ImplementMoneyAmountGeneral from 'pages/KY_AssociationHealthInsuranceReport/H26KAI0200_AssociateInsureMoneyAmountSetting/WS2489006_ImplementMoneyAmountGeneral.jsx';
import WS2489007_MoneyAmountAddedGeneral from 'pages/KY_AssociationHealthInsuranceReport/H26KAI0200_AssociateInsureMoneyAmountSetting/WS2489007_MoneyAmountAddedGeneral.jsx';
import WS2489008_MoneyAmountHepatitisGeneral from 'pages/KY_AssociationHealthInsuranceReport/H26KAI0200_AssociateInsureMoneyAmountSetting/WS2489008_MoneyAmountHepatitisGeneral.jsx';
import WS2489009_NonMoneyAmountGeneral from 'pages/KY_AssociationHealthInsuranceReport/H26KAI0200_AssociateInsureMoneyAmountSetting/WS2489009_NonMoneyAmountGeneral.jsx';
import WS2489010_NonMoneyAmountAdded from 'pages/KY_AssociationHealthInsuranceReport/H26KAI0200_AssociateInsureMoneyAmountSetting/WS2489010_NonMoneyAmountAdded.jsx';
class WS2489005_InputNew extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Format: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = '入力[新]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: {},
      isLoadData: true,
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }

  getScreenData() {
    let param = {
      formatOp: this.props.Li_Format
    }

    this.setState({ isLoadData: true })

    InputNewAction.getScreenData(param)
      .then((res) => {
        this.setState({
          dataSource: res,
          isLoadData: false
        })

        this.formRef.current.setFieldsValue({
          ...res
        });
      })
      .finally(() => this.setState({ isLoadData: false }))
  }

  onFinish(values) {
    let params = {
      ...values,
      formatOp: this.props.Li_Format,
      option_remark: this.state.dataSource.option_remark
    }

    InputNewAction.update(params)
      .then(res => {
        message.success(res?.data?.message);
        this.getScreenData();
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
      <div className="input-new">
        <Card title="入力[新]">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Spin spinning={this.state.isLoadData}>
              <Space style={{ marginBottom: 20 }}>
                <div style={{ background: '#1071da', padding: '5px 15px', color: '#fff', border: '1px solid #fff' }}>消費税</div>
                <Form.Item name="Tax" style={{ marginBottom: 0 }}>
                  <InputNumber style={{ width: '150px' }}
                    min={0} max={9.99} maxLength={4}
                    step="0.01"
                  />
                </Form.Item>
                <Button htmlType="submit"
                  style={{ color: '#42b10b', borderColor: '#42b10b', borderRadius: '5px', marginRight: '5px' }}
                  icon={<SaveOutlined />} >
                </Button>
              </Space>
              <div>
                <Form.Item style={{ marginBottom: 10 }}>
                  <Button type="primary" style={{ width: '100%' }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '70%',
                          component: (
                            <WS2489006_ImplementMoneyAmountGeneral
                              Li_Format={this.props.Li_Format}
                              onFinishScreen={(output) => {
                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }}
                  >
                    {this.state.dataSource.AmountGeneralButton}
                  </Button>
                </Form.Item>
                <Form.Item style={{ marginBottom: 10 }}>
                  <Button type="primary" style={{ width: '100%' }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '70%',
                          component: (
                            <WS2489007_MoneyAmountAddedGeneral
                              Li_Format={this.props.Li_Format}
                              onFinishScreen={(output) => {
                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }}
                  >
                    {this.state.dataSource.AmountAddedButton}
                  </Button>
                </Form.Item>
                <Form.Item style={{ marginBottom: 10 }}>
                  <Button type="primary" style={{ width: '100%' }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '70%',
                          component: (
                            <WS2489008_MoneyAmountHepatitisGeneral
                              Li_Format={this.props.Li_Format}
                              onFinishScreen={(output) => {
                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }}
                  >
                    {this.state.dataSource.AmountHepatitisButton}
                  </Button>
                </Form.Item>
                <Form.Item style={{ marginBottom: 10 }}>
                  <Button type="primary" style={{ width: '100%' }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '70%',
                          component: (
                            <WS2489009_NonMoneyAmountGeneral
                              Li_Format={this.props.Li_Format}
                              onFinishScreen={(output) => {
                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }}
                  >
                    {this.state.dataSource.OutstandingAmountGeneralButton}
                  </Button>
                </Form.Item>
                <Form.Item style={{ marginBottom: 10 }}>
                  <Button type="primary" style={{ width: '100%' }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '70%',
                          component: (
                            <WS2489010_NonMoneyAmountAdded
                              Li_Format={this.props.Li_Format}
                              onFinishScreen={(output) => {
                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }}
                  >
                    {this.state.dataSource.NotAmountAddedButton}
                  </Button>
                </Form.Item>
              </div>
            </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2489005_InputNew);
