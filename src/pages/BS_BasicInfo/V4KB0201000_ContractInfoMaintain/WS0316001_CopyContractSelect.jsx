import React, {createRef} from 'react';
import PropTypes from 'prop-types';

import {
  Card, Form, Table, Button, Input, Select, DatePicker, Checkbox, Row, Col, message, Spin,
  Modal,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CopyContractSelectService from 'services/basicInfo/ContractInfoMaintain/CopyContractSelectService';
import WS0330001_ContractHistoricalQuerySub from './WS0330001_ContractHistoricalQuerySub';
import WS0246001_InsurerInfoSearchQuery from '../V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery';
import WS0247001_OfficeInfoRetrievalQuery from '../V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery';
import axios from 'axios';
import WS0316026_ConfirmScreen from './WS0316026_ConfirmScreen';
import WS0265001_BasicCourseInquiry from '../V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry';
import moment from 'moment-timezone';
import  ModalDraggable  from "components/Commons/ModalDraggable";


class WS0316001_CopyContractSelect extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = createRef();

  constructor(props) {
    super(props);

    // document.title = '複写契約選択';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isLoadingScreenData: false,
      isLoadingTableData: false,

      contract_history: {},

      screenData: {},
    };

    this.loadScreenData = this.loadScreenData.bind(this);
  }

  componentDidMount() {
    this.loadScreenData();
  }

  loadScreenData() {
    this.setState({ isLoadingScreenData: true });

    CopyContractSelectService.getScreenData()
      .then(res => {
        this.setState({
          screenData: res.data,
        });
        this.ContractSearch();
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingScreenData: false }))
  }

  handleSelectRows = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  ContractSearch = () => {
    const values = this.formRef.current.getFieldsValue();
    this.setState({ isLoadingTableData: true });

    CopyContractSelectService.ContractSearch(values)
      .then(res => {
        this.formRef.current.setFieldsValue(res.data);
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTableData: false }))
  }

  handleCopy = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        width: 800,
        visible: true,
        component: (<WS0316026_ConfirmScreen
          Li_ContractTypeF={this.formRef.current.getFieldValue('ContractTypeOriginal')}
          Li_ContractOrgCodeF={this.formRef.current.getFieldValue('ContractOrgCodeOriginal')}
          Li_ContractStartDateF={this.formRef.current.getFieldValue('ContractStartDateOriginal')}
          Li_ContractTypeT={this.props.Li_ContractType}
          Li_ContractOrgCodeT={this.props.Li_ContractOrgCode}
          Li_ContractStartDateT={this.formRef.current.getFieldValue('ContractStartDateOriginal')}
          onFinishScreen={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              }
            });
            this.props.onFinishScreen();
          }}
        />),
      }
    });
  }

  render() {
    const { Option } = Select;
    const { columns, dataSources, selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectRows
    }

    return (
      <div className="copy-contract-select">
        <Card title="複写契約選択">
          <Spin spinning={this.state.isLoadingScreenData}>
            <Form ref={this.formRef} initialValues={{
              ContractTypeOriginal: this.props.Li_ContractType,
              ContractOrgCodeOriginal: this.props.Li_ContractOrgCode,
              ContractStartDateOriginal: this.props.Li_ContractStartDate,
              ContractStartDateOriginalChar: moment(this.props.Li_ContractStartDate).format('YYYY/MM/DD'),
            }}>
              <Form.Item style={{display:'none'}} name="ContractStartDateOriginal"><Input /></Form.Item>
              <Row>
                <Col span={24} style={{ display: "flex" }}>
                  <Form.Item name="ContractTypeOriginal" style={{width: 200, marginRight: 10}} label={<label style={{ width: 50 }}>契約</label>}>
                    <Select onChange={() => {
                      this.formRef.current.resetFields(['ContractOrgCodeOriginal']);
                      const ContractTypeOriginal = this.formRef.current.getFieldValue('ContractTypeOriginal');
                      if (ContractTypeOriginal === 0) {
                        this.formRef.current.setFieldsValue({
                          ContractOrgCodeOriginal: 0,
                        });
                      }
                    }}>
                      <Option value={0}>共　通</Option>
                      <Option value={1}>保険者</Option>
                      <Option value={2}>事業所</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="ContractOrgCodeOriginal" style={{width: 150, marginRight: 10}}>
                    <Input.Search onSearch={() => {
                      const ContractType = this.formRef.current.getFieldValue('ContractTypeOriginal');
                      let component = null;
                      if (ContractType === 1) {
                        component = (<WS0246001_InsurerInfoSearchQuery
                          onFinishScreen={(output) => {
                            this.formRef.current.setFieldsValue({
                              ContractOrgCodeOriginal: output.Lo_InsurerCode,
                            });

                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: false,
                              }
                            });
                          }}
                        />);
                      } else if (ContractType === 2) {
                        component = (<WS0247001_OfficeInfoRetrievalQuery
                          onFinishScreen={(output) => {																
                            this.formRef.current.setFieldsValue({
                              ContractOrgCodeOriginal: output.Lio_OfficeCode,
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
                    }}/>
                  </Form.Item>
                  <Form.Item name="ContractStartDateOriginalChar" style={{width: 150}}>
                    <Input.Search onSearch={() => {
                      this.setState({
                        ...this.state,
                        childModal: {
                          width: 200,
                          visible: true,
                          component: (<WS0330001_ContractHistoricalQuerySub
                            Li_ContractType={this.formRef.current.getFieldValue('ContractTypeOriginal')}
                            Li_ContractOrgCode={this.formRef.current.getFieldValue('ContractOrgCodeOriginal')}
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                ContractStartDateOriginalChar: moment(output.Lo_ContractStartDate).format('YYYY/MM/DD'),
                                ContractStartDateOriginal: output.Lo_ContractStartDate,
                              });

                              this.setState({
                                contract_history: output.recordData,
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />)
                        }
                      });
                    }} />
                  </Form.Item>
                  <Form.Item>
                    <div>{this.state.contract_history.contract_name}</div>
                  </Form.Item>
                </Col>
              </Row>
              
              <Row>
                <Col span={20} style={{ display: "flex" }}>
                  <Form.Item name="CourseF" style={{width: 150}} label={<label style={{ width: 50 }}>コース</label>}>
                    <Input.Search onSearch={() => {
                      this.setState({
                        ...this.state,
                        childModal: {
                          width: 500,
                          visible: true,
                          component: (<WS0265001_BasicCourseInquiry
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                CourseF: output.Lo_CourseCode,
                              });

                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />)
                        }
                      });
                    }} />
                  </Form.Item>
                  <Form.Item name="CourseT" style={{width: 120}} label={<label style={{ width: 20 }}>~</label>}>
                    <Input.Search onSearch={() => {
                      this.setState({
                        ...this.state,
                        childModal: {
                          width: 500,
                          visible: true,
                          component: (<WS0265001_BasicCourseInquiry
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                CourseT: output.Lo_CourseCode,
                              });

                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />)
                        }
                      });
                    }} />
                  </Form.Item>
                  <Form.Item name="Gender" style={{width: 200}} label={<label style={{ width: 50 }}>性別</label>}>
                    <Select>
                      <Option value={0}> </Option>
                      <Option value={1}>男</Option>
                      <Option value={2}>女</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="Relationship" style={{width: 200}} label={<label style={{ width: 50 }}>続柄</label>}>
                    <Select>
                      {this.state.screenData.Relationship?.map(value => (
                        <Select.Option key={`rls-${value.id}`} value={value.node_code_name}>{value.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="AllSelect" valuePropName="checked" style={{width: 200, marginLeft: 10}}>
                    <Checkbox>全選択</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item style={{ float: "right" }}>
                    <Button type="primary" onClick={() => this.ContractSearch()} loading={this.state.isLoadingTableData} icon={<SearchOutlined />}>検　索</Button>
                  </Form.Item>
                </Col>
              </Row>
              <Table
                loading={this.state.isLoadingTableData}
                dataSource={this.formRef.current?.getFieldValue('tableData')}
                pagination={false}
                rowKey={(record) => record.id}
              >
                <Table.Column render={(value, record, index) => (
                  <Form.Item name={['tableData', index, 'W1_enabled_disabled']} valuePropName="checked">
                    <Checkbox onChange={(prop) => {
                      CopyContractSelectService.UpdateFlg({id: record.id, flg: prop});
                    }} />
                  </Form.Item>
                )} />
                <Table.Column title="番号" dataIndex="W1_contract_num" />
                <Table.Column title="コース" dataIndex={['contract_terms', 'medical_exam_course']} />
                <Table.Column title="略称" dataIndex={['contract_terms', 'contract_short_name']} />
                <Table.Column title="正式" dataIndex={['contract_terms', 'contract_name']} />
                <Table.Column title="性" dataIndex={['contract_terms', 'conditions_gender']} render={(value) => ( value === 1 ? '男' : (value === 2 ? '女' : ''))} />
                <Table.Column title="続" dataIndex={['various_names', 'name']} />
                <Table.Column title="金額" key="Expression_8" render={(value, record) => (
                  record.contract_terms.insurer_total_price
                  +record.contract_terms.office_total_price
                  +record.contract_terms.organization_total_price
                  +record.contract_terms.personal_1_total_price
                  +record.contract_terms.personal_2_total_price
                  +record.contract_terms.personal_3_total_price
                )} />
              </Table>
              
              <div style={{ float: "right", marginTop: 20 }}>
                <Button type="primary" onClick={this.handleCopy}>複写</Button>
              </div>
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

export default WS0316001_CopyContractSelect;
