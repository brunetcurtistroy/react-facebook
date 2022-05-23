import React from "react";
import PropTypes from 'prop-types';

import {
  Card, Form, Input, Select, Button, message, Spin, Modal, Col, Row,
} from "antd";

import ConfirmScreenService from 'services/basicInfo/ContractInfoMaintain/ConfirmScreenService';
import WS0246001_InsurerInfoSearchQuery from "../V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0247001_OfficeInfoRetrievalQuery from "../V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0330001_ContractHistoricalQuerySub from "./WS0330001_ContractHistoricalQuerySub";
import moment from "moment";
import  ModalDraggable  from "components/Commons/ModalDraggable";

/**
* @extends {React.Component<{Li_ContractTypeF:any, Li_ContractOrgCodeF:any, Li_ContractStartDateF:any, Li_ContractTypeT:any, Li_ContractOrgCodeT:any, Li_ContractStartDateT:any}>}
*/
class WS0316026_ConfirmScreen extends React.Component {
  static propTypes = {
    Li_ContractTypeF: PropTypes.any,
    Li_ContractOrgCodeF: PropTypes.any,
    Li_ContractStartDateF: PropTypes.any,

    Li_ContractTypeT: PropTypes.any,
    Li_ContractOrgCodeT: PropTypes.any,
    Li_ContractStartDateT: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '確認画面';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      screenData: {},
      isLoadingScreenData: false,

      isLoadingSend: false,
    };

    this.loadScreenData = this.loadScreenData.bind(this);
    this.getFormFieldValue = this.getFormFieldValue.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.formRef.current.resetFields();
    }
  }

  componentDidMount() {
    this.loadScreenData();
  }

  loadScreenData() {
    this.setState({ isLoadingScreenData: true });

    ConfirmScreenService.getScreenData()
      .then(res => {
        this.setState({
          screenData: res.data,
        })
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingScreenData: false });
      });
  }

  getFormFieldValue(namePath) {
    return this.formRef.current?.getFieldValue(namePath);
  }

  onFinish(values) {
    this.setState({ isLoadingSend: true });
    ConfirmScreenService.CopyExec(values)
      .then(res => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen(res);
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingSend: false });
      });
  }

  render() {
    return (
      <div className="confirm-screen">
        <Card title="確認画面">
          <Spin spinning={this.state.isLoadingScreenData}>
            <Form
              ref={this.formRef} onFinish={this.onFinish}
              initialValues={{
                ContractTypeT: this.props.Li_ContractTypeT,
                ContractOrgCodeT: this.props.Li_ContractOrgCodeT,
                ContractStartDateT: this.props.Li_ContractStartDateT,

                Li_ContractTypeF: this.props.Li_ContractTypeF,
                Li_ContractOrgCodeF: this.props.Li_ContractOrgCodeF,
                Li_ContractStartDateF: this.props.Li_ContractStartDateF,
                Li_ContractTypeT: this.props.Li_ContractTypeT,
                Li_ContractOrgCodeT: this.props.Li_ContractOrgCodeT,
                Li_ContractStartDateT: this.props.Li_ContractStartDateT,
              }}
            >
              <Input.Group style={{display:'none'}}>
                <Form.Item name="Li_ContractTypeF"><Input /></Form.Item>
                <Form.Item name="Li_ContractOrgCodeF"><Input /></Form.Item>
                <Form.Item name="Li_ContractStartDateF"><Input /></Form.Item>
                <Form.Item name="Li_ContractTypeT"><Input /></Form.Item>
                <Form.Item name="Li_ContractOrgCodeT"><Input /></Form.Item>
                <Form.Item name="Li_ContractStartDateT"><Input /></Form.Item>
                <Form.Item name="ContractNameT"><Input /></Form.Item>
              </Input.Group>

              <Row>
                <Col span={15}>
                  <Form.Item label="契　約">
                    <Input.Group compact>
                      <Form.Item name="ContractTypeT">
                        <Select style={{width: 120}}>
                          {this.state.screenData.ContractTypeTChar?.map(value => (
                            <Select.Option key={`ContractTypeTChar-${value.node_code_name}`} value={parseInt(value.node_code_name)}>{value.name}</Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="ContractOrgCodeT">
                        <Input.Search onSearch={() => {
                          const ContractTypeT = this.getFormFieldValue('ContractTypeT');
                          let component = null;
                          if (ContractTypeT === 1) {
                            component = (<WS0246001_InsurerInfoSearchQuery
                              onFinishScreen={(output) => {
                                this.formRef.current.setFieldsValue({
                                  ContractOrgCodeT: output.Lo_InsurerCode,
                                  // contract_managements: {
                                  //   contract_name: output.recordData.contract_name,
                                  // },
                                });

                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  }
                                });
                              }}
                            />);
                          } else if (ContractTypeT === 2) {
                            component = (<WS0247001_OfficeInfoRetrievalQuery
                              onFinishScreen={(output) => {
                                this.formRef.current.setFieldsValue({
                                  ContractOrgCodeT: output.Lio_OfficeCode,
                                  // contract_managements: {
                                  //   contract_name: output.recordData.contract_name,
                                  // },
                                });

                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  }
                                });
                              }}
                            />);
                          }

                          if (component) {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                width: 800,
                                visible: true,
                                component: component,
                              }
                            });
                          }
                        }} />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <span style={{padding: 10}}>{this.formRef.current?.getFieldValue(['contract_managements', 'contract_name'])}</span>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item label="履　歴" name="ContractStartDateT">
                    <Input.Search onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          width: 800,
                          visible: true,
                          component: (<WS0330001_ContractHistoricalQuerySub
                            Li_ContractType={this.getFormFieldValue('ContractTypeT')}
                            Li_ContractOrgCode={this.getFormFieldValue('ContractOrgCodeT')}

                            onFinishScreen={({Lo_ContractStartDate, recordData}) => {
                              this.formRef.current.setFieldsValue({
                                ContractStartDateT: moment(Lo_ContractStartDate).format('YYYY/MM/DD'),
                                ContractNameT: recordData.contract_name,
                                contract_histories: {
                                  contract_name: recordData.contract_name,
                                },
                              });

                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                }
                              });
                            }}
                          />),
                        }
                      });
                    }} />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item>
                    <span style={{padding: '15px'}}>{this.formRef.current?.getFieldValue(['contract_histories', 'contract_name'])}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={this.state.isLoadingSend}>実行</Button>
            </Form>
          </Spin>
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

export default WS0316026_ConfirmScreen;
