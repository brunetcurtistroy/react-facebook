import React from "react";
import PropTypes from 'prop-types';

import {
  Form, Input, Card, Col, Row, Select, Table, 
  Modal, Menu, Popconfirm, Dropdown, Button, Space, Spin,
  message,
  Tag,
} from "antd";
import {
  ReloadOutlined, PlusOutlined,
} from '@ant-design/icons';

import WS0307071_HistorySwitching from './WS0307071_HistorySwitching';
import WS0307076_CreateContract from './WS0307076_CreateContract';
import WS0309017_ContractItemSub from '../V4KB0201400_ContractInfoBatchProcess/WS0309017_ContractItemSub';
import WS0315002_ConditionCopy from './WS0315002_ConditionCopy';
import WS0307082_CodeChanges from './WS0307082_CodeChanges';

import axios from 'configs/axios';
import moment from "moment";
import WS0605127_ContractLineItemDisplay from "../V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay";
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { number_format } from 'helpers/CommonHelpers';

/**
* @extends {React.Component<{Li_ContractType:any, Li_ContractOrgCode:any, Lio_ContractStartDate:any}>}
*/
class WS0307008_ContractHistorySub extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
  };

  formRef = React.createRef();
  termsFieldName = 'terms';

  constructor(props) {
    super(props);

    // document.title = "契約作成";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isLoadingContractData: false,
    };

    this.loadContractData = this.loadContractData.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.loadContractData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.Li_ContractType !== prevProps.Li_ContractType)
      || (this.props.Li_ContractOrgCode !== prevProps.Li_ContractOrgCode)
      || (this.props.Li_ContractStartDate !== prevProps.Li_ContractStartDate)
    ) {
      this.loadContractData(this.props);
    }
  }

  loadContractData(inputData) {
    const { Li_ContractType, Li_ContractOrgCode, Lio_ContractStartDate } = inputData;

    this.setState({ isLoadingContractData: true });
    
    axios.get('/api/contract-info-maintain/contract-history-sub', {
      params: {
        Li_ContractType, Li_ContractOrgCode, Lio_ContractStartDate
      }
    })
      .then(res => {
        const formIns = this.formRef.current;

        const resData = res.data;
        if (!resData) {
          formIns.resetFields();
          return;
        }

        // Default data
        resData.contract_start_date_on = moment(resData.contract_start_date_on).isValid() ? moment(resData.contract_start_date_on).format('YYYY/MM/DD') : resData.contract_start_date_on;
        resData.bill_rounding = (resData.bill_rounding === null) ? 0 : resData.bill_rounding;
        resData.bill_rounding_following = (resData.bill_rounding_following === null) ? 0 : resData.bill_rounding_following;
        resData.calculation_division = (resData.calculation_division === null) ? 0 : resData.calculation_division;
        resData.personal_claims_division = (resData.personal_claims_division === null) ? 0 : resData.personal_claims_division;
        resData.tax_calc_unit_division = (resData.tax_calc_unit_division === null) ? 0 : resData.tax_calc_unit_division;
        resData.tax_decimal_point = (resData.tax_decimal_point === null) ? 0 : resData.tax_decimal_point;

        formIns.setFieldsValue(resData);
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
        this.setState({ isLoadingContractData: false });
      });
  }

  getFormFieldValue(namePath) {
    return this.formRef.current ? this.formRef.current.getFieldValue(namePath) : undefined;
  }

  onFinish(values) {
    this.setState({ isLoadingContractData: true });
    const { Li_ContractType, Li_ContractOrgCode } = this.props;
    axios.post('/api/contract-info-maintain/contract-history-sub', {
      ...values,
      Li_ContractType, Li_ContractOrgCode,
    })
      .then(res => {
        message.success('保存が完了しました');
        this.loadContractData(this.props);
      })
      .catch(error => {
        this.setState({ isLoadingContractData: false });

        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      });
  }

  render() {
    return (
      <div className="create-contract">
        <Card title="契約作成" size="small">
          <Spin spinning={this.state.isLoadingContractData}>
            <Form ref={this.formRef} onFinish={this.onFinish}>
              <Space style={{ float:'right' }}>
                {/* <Popconfirm title="削除後は復元できません。本当に削除しますか？" onConfirm={() => {
                }}>
                  <Button type="primary" htmlType="button" icon={<DeleteOutlined />} danger>削除</Button>
                </Popconfirm> */}
                <Button type="primary" htmlType="submit">登録</Button>
              </Space>
              <Form.Item label="契約年度" style={{ marginBottom: 0 }}>
                <Input.Group compact>
                  <Form.Item name="contract_start_date_on">
                    <Input.Search
                      readOnly={true}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 350,
                            component: (
                              <WS0307071_HistorySwitching
                                Li_ContractType={this.props.Li_ContractType}
                                Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                                onSelected={({ Lio_Date }) => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });

                                  this.loadContractData({
                                    ...this.props,
                                    Lio_ContractStartDate: Lio_Date
                                  });
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="contract_name" style={{marginLeft: 5}}>
                    <Input />
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              <Row gutter={5}>
                <Col>
                  <Form.Item label="端数処理" style={{ marginBottom: 0 }}>
                    <Input.Group compact>
                      <Form.Item name="tax_decimal_point">
                        <Select style={{ width: 100 }}>
                          <Select.Option value={0}>四捨五入</Select.Option>
                          <Select.Option value={1}>切捨</Select.Option>
                          <Select.Option value={2}>切上</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="tax_calc_unit_division">
                        <Select>
                          <Select.Option value={0}>明細</Select.Option>
                          <Select.Option value={1}>合計</Select.Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name="personal_claims_division" label="未収請求" style={{ marginBottom: 0 }}>
                    <Select>
                      <Select.Option value={0}>無し</Select.Option>
                      <Select.Option value={1}>有り</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={15}>
                <Col>
                  <Form.Item label="金額計算" style={{ marginBottom: 0 }}>
                    <Input.Group compact>
                      <Form.Item name="bill_rounding">
                        <Select style={{ width: 100 }}>
                          <Select.Option value={0}>無し</Select.Option>
                          <Select.Option value={1}>10円単位</Select.Option>
                          <Select.Option value={2}>100円単位</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="bill_rounding_following">
                        <Select>
                          <Select.Option value={0}>明細</Select.Option>
                          <Select.Option value={1}>合計</Select.Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="notices" label="備考" style={{ marginBottom: 0 }}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Table
                size="small"
                dataSource={this.getFormFieldValue(this.termsFieldName)}
                scroll={this.getFormFieldValue(this.termsFieldName)?.length >= 20 ? { y: 'calc(100vh - 319px)' } : {}}
                pagination={{
                  pageSize: 30,
                }}
                rowKey={(record => `tbl-chs-${record.id}`)}
                bordered
              >
                <Table.Column width={50} title="番号" dataIndex="contract_number" />
                <Table.Column width={50} title="コース" dataIndex="medical_exam_course" />
                <Table.Column title="略名称" dataIndex="contract_short_name" ellipsis />
                <Table.Column title="正式名称" dataIndex="contract_name" ellipsis />
                <Table.Column width={35} title="条" dataIndex="course_conditions" render={(value) => (
                  <Tag visible={(value == 1)} color={((value == 1) ? Color(156) : Color(161)).Background}>条</Tag>
                )} />
                <Table.Column width={25} title="性" key="gender" render={(value, record) => {
                  if (record.course_conditions === 1) {
                    switch (record.conditions_gender) {
                      case 1:
                        return '男';
                      case 2:
                        return '女';
                      default:
                        return '';
                    }
                  }
                  return '';
                }} />
                <Table.Column width={25} title="続" key="continue" render={(value, record) => {
                  if (record.course_conditions === 1) {
                    return record.various_names_name?.trim().substring(0, 1);
                  }
                  return '';
                }} />
                <Table.Column width={35} title="年齢" dataIndex="conditions_age_division" render={value => {
                  switch (value) {
                    case 0:
                      return '受診';
                    case 1:
                      return '年度';
                    case 2:
                      return '学童';
                    case 3:
                      return '指定';
                    default:
                      return '';
                  }
                }} />
                <Table.Column title="保険者" dataIndex="insurer_total_price"
                  render={(value) => value ? (<div style={{ textAlign: 'right' }}>{number_format(value)}</div>) : null}
                />
                <Table.Column title="事務所" dataIndex="office_total_price"
                  render={(value) => value ? (<div style={{ textAlign: 'right' }}>{number_format(value)}</div>) : null}
                />
                <Table.Column title="他団体" dataIndex="organization_total_price"
                  render={(value) => value ? (<div style={{ textAlign: 'right' }}>{number_format(value)}</div>) : null}
                />
                <Table.Column title="個人" key="personal_total_price"
                  render={(v, record) => {
                    const value = record.personal_1_total_price + record.personal_2_total_price + record.personal_3_total_price;
                    return value ? (<div style={{ textAlign: 'right' }}>{number_format(value)}</div>) : null;
                  }}
                />
                <Table.Column title="合計" key="total_price" render={(v, record) => {
                  const value = record.insurer_total_price + record.office_total_price + record.organization_total_price + record.personal_1_total_price + record.personal_2_total_price + record.personal_3_total_price;
                  return value ? (<div style={{ textAlign: 'right' }}>{number_format(value)}</div>) : null;
                }} />
                <Table.Column width={50} key="action"
                  title={(
                    <Button type="primary" size="small" title="新規" icon={<PlusOutlined />} loading={this.state.isLoadingInsurersList} onClick={() => {
                      this.setState({
                        ...this.state,
                        childModal: {
                          width: 600,
                          visible: true,
                          component: (<WS0307076_CreateContract
                            Li_ContractType={this.props.Li_ContractType}
                            Li_ContractOrgCode={this.props.Li_ContractOrgCode}
                            Li_ContractStartDate={this.formRef.current.getFieldValue('contract_start_date_on')}
                            onCreateFinish={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                              this.loadContractData(this.props);
                            }}
                          />)
                        }
                      });
                    }} />
                  )}
                  render={(value, record) => {
                    return (
                      <Dropdown.Button size="small"
                        overlay={() => (
                          <Menu>
                            <Menu.Item key="照会" onClick={(menuInfo) => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: '95vw',
                                  visible: true,
                                  component: (<WS0605127_ContractLineItemDisplay
                                    Li_ContractType={record.contract_type}
                                    Li_ContractOrgCode={record.contract_office_code}
                                    Li_ContractStartDate={record.contract_start_date_on}
                                    Li_ContractNum={record.contract_number}
                                    onFinishScreen={() => {
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
                            }}>照会</Menu.Item>
                            <Menu.Item key="変更" onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: 800,
                                  visible: true,
                                  component: (<WS0309017_ContractItemSub
                                    Li_ContractType={record.contract_type}
                                    Li_ContractOrgCode={record.contract_office_code}
                                    Li_ContractStartDate={record.contract_start_date_on}
                                    Li_ContractNum={record.contract_number}
                                    onSaved={() => {
                                      this.loadContractData(this.props);

                                      // this.setState({
                                      //   childModal: {
                                      //     ...this.state.childModal,
                                      //     visible: false,
                                      //   },
                                      // });
                                    }}
                                  />)
                                }
                              });
                            }}>変更</Menu.Item>
                            <Menu.Item key="削除">
                              <Popconfirm title="削除後は復元できません。本当に削除しますか？" onConfirm={() => {
                                this.setState({ isLoadingContractData: true });
                                axios.delete('/api/contract-info-maintain/contract-history-sub/destroyTerm', {
                                  params: {
                                    Li_ContractType: record.contract_type,
                                    Li_ContractOrgCode: record.contract_office_code,
                                    Li_ContractStartDate: record.contract_start_date_on,
                                    contract_number: record.contract_number,
                                  }
                                })
                                  .then(res => {
                                    this.loadContractData(this.props);
                                  })
                                  .catch(error => {
                                    this.setState({ isLoadingContractData: false });

                                    const res = error.response;
                                    if (!res || !res.data || !res.data.message) {
                                      message.error('エラーが発生しました');
                                      return;
                                    }

                                    message.error(res.data.message);
                                  })
                              }}><div>削除</div></Popconfirm>
                            </Menu.Item>
                            <Menu.Item key="複写" onClick={() => {
                              console.log(7777777,record);
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: 500,
                                  visible: true,
                                  component: (<WS0315002_ConditionCopy
                                    Li_Context={null}
                                    Li_ContractType={record.contract_type}
                                    Li_ContractOrgCode={record.contract_office_code}
                                    Li_ContractOrgName={this.props.Li_ContractOrgName}
                                    Li_ContractStartDate={record.contract_start_date_on}
                                    Li_ContractNum={record.contract_number}
                                    recordData={record}
                                    onFinishScreen={() => {
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        },
                                      });

                                      this.loadContractData(this.props);
                                    }}
                                  />)
                                }
                              });
                            }}>複写</Menu.Item>
                            <Menu.Item key="コード変更" onClick={() => {
                              this.setState({
                                ...this.state,
                                childModal: {
                                  width: 500,
                                  visible: true,
                                  component: (<WS0307082_CodeChanges
                                    Li_ContractType={record.contract_type}
                                    Li_ContractOrgCode={record.contract_office_code}
                                    Li_ContractStartDate={record.contract_start_date_on}
                                    Li_ContractNum={record.contract_number}
                                    Li_Course={record.medical_exam_course}
                                    Li_ContractAbbreviation={record.contract_short_name}
                                    Li_ContractName={record.contract_name}
                                    onChanged={() => {
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        },
                                      });
                                      this.loadContractData(this.props);
                                    }}
                                  />)
                                }
                              });
                            }}>コード変更</Menu.Item>
                          </Menu>
                        )}
                      />
                    )
                  }}
                />
              </Table>
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

export default WS0307008_ContractHistorySub;
