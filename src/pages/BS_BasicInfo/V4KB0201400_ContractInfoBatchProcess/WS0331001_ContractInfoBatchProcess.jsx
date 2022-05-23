import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Row, Col, Form, Table, Input, Select, Button, Divider, Modal, Dropdown, Menu, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { getContractInfoBatchProcessAction, confirmDeleteLineAction, deleteLineAction, 
  SelectOneContractInfoBatchProcessAction, SelectAllContractInfoBatchProcessAction, 
} from 'redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions';

import WS0246001_InsurerInfoSearchQuery from '../V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery';
import WS0247001_OfficeInfoRetrievalQuery from '../V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery';
import WS0265001_BasicCourseInquiry from './WS0265001_BasicCourseInquiry';
import WS0302001_SetInfoSearch from './WS0302001_SetInfoSearch.jsx';
import WS0271001_InspectItemSearchQuerySingle from './WS0271001_InspectItemSearchQuerySingle.jsx';
import WS0605127_ContractLineItemDisplay from "./WS0605127_ContractLineItemDisplay";
import WS0309017_ContractItemSub from "./WS0309017_ContractItemSub";
import WS0331019_BatchUpdateProcess from "./WS0331019_BatchUpdateProcess";
import moment from 'moment';
import ModalDraggable from "components/Commons/ModalDraggable";

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}
const styleFormItem = {
  marginBottom: 0
}
const styleBorderRight = {
  borderRight: '1px solid #F0F0F0'
}
class WS0331001_ContractInfoBatchProcess extends Component {

  constructor(props) {
    super(props);
    // document.title = '契約情報一括処理';
    this.formRef = React.createRef();
    this.state = {
      pagination: {
        defaultPageSize: 20,
        size: 'small',
        showQuickJumper: true
      },
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initialValues: {
        ContractType: '9',
        OrgCode: '',
        MedicalExamCourseF: '',
        MedicalExamCourseT: '',
        ContractStartDateFChar: '',
        ContractStartDateTChar: '',
        SetInspect: '0',
        SetCode: '',
        StartDateClassify: '0',
        FreeSearch: ''
      },
      selectedRowKeys: [],
      dataContract: [],
      isLoading: false,
      exam_name: ''
    };
  }

  closeModal = () => {
    this.setState((prevState) => ({
      childModal: { ...prevState.childModal, visible: false },
    }));
  };

  getContractInfoBatchProcess = (paramsSearch) => {
    this.setState({ isLoading: true })
    getContractInfoBatchProcessAction(paramsSearch)
      .then((res) => {
        if (res) {
          let data = res.map(item => item.id);
          this.setState({
            isLoading: false,
            dataContract: res,
            selectedRowKeys: data
          });
        }
      })
      .catch()
  }

  handleChange = (value, name) => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        [name]: value
      }
    })
  }

  SelectRecord = (params) => {
    SelectOneContractInfoBatchProcessAction(params)
      .then()
      .catch()
  }

  SelectAllRecord = (params) => {
    SelectAllContractInfoBatchProcessAction(params)
      .then()
      .catch()
  }

  // submit form
  onFinish = (formData) => {
    this.getContractInfoBatchProcess(this.state.initialValues);
  }

  render() {
    const { initialValues, isLoading, selectedRowKeys, childModal, dataContract, pagination, exam_name } = this.state;
    const { ContractType, SetInspect } = initialValues;

    return (
      <div className="contract-info-batch-process">
        <Card>
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={initialValues} autoComplete="off" {...grid}>
            <Row gutter={24}>
              <Col xl={6} lg={24} md={24} span={8} style={styleBorderRight}>
                <Form.Item label="種　別" style={styleFormItem}>
                  <Row>
                    <Col span={11}>
                      <Form.Item name="ContractType">
                        <Select onChange={(value) => {
                          this.formRef?.current?.setFieldsValue({ 'OrgCode': '' });
                          this.handleChange(value, 'ContractType');
                        }}>
                          <Select.Option value="9">全　て</Select.Option>
                          <Select.Option value="0">共　通</Select.Option>
                          <Select.Option value="1">保険者</Select.Option>
                          <Select.Option value="2">事業所</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col offset={2} span={11}>
                      <Form.Item name='OrgCode' style={{ display: (ContractType === '1' || ContractType === '2') ? "" : "none" }}>
                        <Input
                          onChange={(e) => this.handleChange(e.target.value, 'OrgCode')}
                          onDoubleClick={() => {
                            ContractType === '1'
                              ? this.setState({
                                childModal: {
                                  ...childModal,
                                  visible: true,
                                  width: 1500,
                                  component: (<WS0246001_InsurerInfoSearchQuery
                                    onFinishScreen={({ Lo_InsurerCode, Lo_Name, recordData }) => {
                                      this.formRef?.current?.setFieldsValue({
                                        OrgCode: Lo_InsurerCode
                                      });
                                      this.handleChange(Lo_InsurerCode, 'OrgCode');
                                      this.setState({
                                        childModal: {
                                          ...childModal,
                                          visible: false,
                                        }
                                      });
                                    }}
                                  />),
                                },
                              })
                              : this.setState({
                                childModal: {
                                  ...childModal,
                                  visible: true,
                                  width: 1500,
                                  component: (<WS0247001_OfficeInfoRetrievalQuery
                                    onFinishScreen={({ Lio_OfficeCode, Lio_BranchStoreCode, recordData }) => {
                                      this.formRef?.current?.setFieldsValue({
                                        OrgCode: Lio_OfficeCode
                                      });
                                      this.handleChange(Lio_OfficeCode, 'OrgCode');
                                      this.setState({
                                        childModal: {
                                          ...childModal,
                                          visible: false,
                                        }
                                      });
                                    }}
                                  />),
                                },
                              })
                          }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="コース" style={styleFormItem}>
                  <Row>
                    <Col span={11}>
                      <Form.Item name="MedicalExamCourseF"  >
                        <Input
                          onChange={e => {
                            this.handleChange(e.target.value, 'MedicalExamCourseT');
                            this.formRef.current.setFieldsValue({
                              MedicalExamCourseF: e.target.value,
                              MedicalExamCourseT: e.target.value,
                            });
                          }}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0265001_BasicCourseInquiry
                                  onFinishScreen={({ Lo_CourseCode }) => {
                                    this.formRef.current.setFieldsValue({
                                      MedicalExamCourseF: Lo_CourseCode,
                                      MedicalExamCourseT: Lo_CourseCode,
                                    });
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                      initialValues: {
                                        ...this.state.initialValues,
                                        MedicalExamCourseF: Lo_CourseCode,
                                        MedicalExamCourseT: Lo_CourseCode,
                                      }
                                    });
                                  }}
                                />),
                              },
                            })
                          }} />
                      </Form.Item>
                    </Col>
                    <Col span={2} ><Form.Item style={{ textAlign: 'center' }}>～</Form.Item></Col>
                    <Col span={11}>
                      <Form.Item name="MedicalExamCourseT" >
                        <Input
                          onChange={(e) => this.handleChange(e.target.value, 'MedicalExamCourseT')}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0265001_BasicCourseInquiry
                                  onFinishScreen={({ Lo_CourseCode }) => {
                                    this.formRef.current.setFieldsValue({
                                      MedicalExamCourseT: Lo_CourseCode
                                    });
                                    this.handleChange(Lo_CourseCode, 'MedicalExamCourseT');
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      }
                                    });
                                  }}
                                />),
                              },
                            })
                          }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="開始日" style={styleFormItem}>
                  <Row gutter={10}>
                    <Col span={6}>
                      <Form.Item name="StartDateClassify">
                        <Select onChange={(value) => this.handleChange(value, 'StartDateClassify')}>
                          <Select.Option value="0">最新</Select.Option>
                          <Select.Option value="1">指定</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={18}>
                      <Row>
                        <Col span={11}>
                          <Form.Item name="ContractStartDateFChar" >
                            <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'YYYY/MM/DD'} onChange={(date, dateString) => this.handleChange(dateString, 'ContractStartDateFChar')} />
                          </Form.Item>
                        </Col>
                        <Col span={2} ><Form.Item style={{ textAlign: 'center' }}>～</Form.Item></Col>
                        <Col span={11}>
                          <Form.Item name="ContractStartDateTChar" >
                            <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'YYYY/MM/DD'} onChange={(date, dateString) => this.handleChange(dateString, 'ContractStartDateTChar')} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="明　細" style={styleFormItem}>
                  <Row gutter={10}>
                    <Col span={7}>
                      <Form.Item name="SetInspect" >
                        <Select onChange={(value) => {
                          this.handleChange(value, 'SetInspect');
                          this.setState({ exam_name: '' });
                          this.formRef?.current?.setFieldsValue({ 'SetCode': '' })
                        }}>
                          <Select.Option value="0">セット</Select.Option>
                          <Select.Option value="1">検　査</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={17}>
                      <Row gutter={10}>
                        <Col span={10}>
                          <Form.Item name="SetCode" >
                            <Input
                              style={{ textAlign: 'right' }}
                              maxLength={8}
                              onChange={(e) => this.handleChange(e.target.value, 'SetCode')}
                              onDoubleClick={() => {
                                SetInspect === '0'
                                  ? this.setState({
                                    childModal: {
                                      ...childModal,
                                      visible: true,
                                      width: 1000,
                                      component: (<WS0302001_SetInfoSearch
                                        Li_SetIdentify={''}
                                        Li_StartDate={''}
                                        Li_CourseCode={''}
                                        _Lo_Return={''}
                                        Li_ContextId={''}
                                        Li_RangeSetting={1}
                                        Li_CourseLevel={''}
                                        Li_ReserveNum={''}
                                        Li_ContractType={''}
                                        Li_ContractOrgCode={''}
                                        Li_ContractStartDate={''}
                                        Li_ContractNum={''}
                                        Lo_SetCode={this.formRef?.current?.getFieldValue('SetCode')}
                                        onFinishScreen={({ Lo_SetCode, recordData }) => {
                                          this.formRef?.current?.setFieldsValue({
                                            SetCode: Lo_SetCode
                                          });
                                          this.handleChange(Lo_SetCode, 'SetCode');
                                          this.setState({
                                            childModal: {
                                              ...childModal,
                                              visible: false,
                                            },
                                            exam_name: recordData.set_name
                                          });
                                        }}
                                      />),
                                    },
                                  })
                                  : this.setState({
                                    childModal: {
                                      ...childModal,
                                      visible: true,
                                      width: 900,
                                      component: (<WS0271001_InspectItemSearchQuerySingle
                                        onFinishScreen={({ Lio_InspectItemCode, recordData }) => {
                                          this.formRef?.current?.setFieldsValue({
                                            SetCode: Lio_InspectItemCode
                                          });
                                          this.handleChange(Lio_InspectItemCode, 'SetCode');
                                          this.setState({
                                            childModal: {
                                              ...childModal,
                                              visible: false,
                                            },
                                            exam_name: recordData.exam_name
                                          });
                                        }}
                                      />),
                                    },
                                  })
                              }} />
                          </Form.Item>
                        </Col>
                        <Col span={14}>
                          <Form.Item>
                            <div>{exam_name}</div>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="検　索" name="FreeSearch" >
                  <Input onChange={(e) => this.handleChange(e.target.value, 'FreeSearch')} />
                </Form.Item>

                <Form.Item style={{ float: "right" }}>
                  <Button icon={<SearchOutlined />} htmlType='submit'>
                    検　索
                  </Button>
                </Form.Item>

                <Divider></Divider>

                <Form.Item style={{ float: "right" }}>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...childModal,
                        visible: true,
                        width: 1500,
                        component: (<WS0331019_BatchUpdateProcess
                          Lio_TaxClassify={''}
                          onFinishScreen={(data) => {
                            this.setState({
                              childModal: {
                                ...childModal,
                                visible: false,
                              }
                            });
                          }}
                        />),
                      },
                    })
                  }}>一括追加</Button>
                </Form.Item>

              </Col>

              <Col xl={18} lg={24} md={24} span={16}>
                <Table
                  className='scrollbar'
                  bordered
                  rowSelection={{
                    selectedRowKeys: this.state.selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => this.setState({ selectedRowKeys }),
                    onSelect: (record, selected) => this.SelectRecord({ id: record.id, W1_enabled_disabled: selected ? 1 : 0 }),
                    onSelectAll: (selected) => this.SelectAllRecord({ SelectAll: selected ? 1 : 0 })
                  }}
                  loading={isLoading}
                  pagination={{
                    ...pagination,
                    hideOnSinglePage: dataContract.length > 10 ? false : true
                  }}
                  size='small'
                  dataSource={dataContract}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="種別" dataIndex="contract_type" align='center' />
                  <Table.Column title="契約団体" dataIndex="contractOrgs" />
                  <Table.Column title="開始日" dataIndex="contract_start_date_on"
                    render={(text) => <div>{
                      moment(text).isValid()
                        ? moment(text).format('YYYY/MM/DD')
                        : '0000/00/00'
                    }</div>}
                  />
                  <Table.Column title="番号" dataIndex="contract_number" render={(text) => (
                    <div style={{ textAlign: 'right' }}>{text}</div>
                  )} />
                  <Table.Column title="コース" dataIndex="medical_exam_course" />
                  <Table.Column title="略称" dataIndex="contract_short_name" />
                  <Table.Column title="税区分" dataIndex="tax_division" align='center' />
                  <Table.Column title="合　計" dataIndex="total"
                    render={(text) => <div style={{ textAlign: 'right' }}>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                  />
                  <Table.Column title="保険者" dataIndex="insurer_total_price"
                    render={(text) => <div style={{ textAlign: 'right' }}>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                  />
                  <Table.Column title="事業所" dataIndex="office_total_price"
                    render={(text) => <div style={{ textAlign: 'right' }}>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                  />
                  <Table.Column title="他団体" dataIndex="organization_total_price"
                    render={(text) => <div style={{ textAlign: 'right' }}>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                  />
                  <Table.Column title="個人" dataIndex="total_price"
                    render={(text) => <div style={{ textAlign: 'right' }}>{text === 0 || text === '0' ? '' : text.toLocaleString()}</div>}
                  />
                  <Table.Column align='center' render={(text, record, index) => (
                    <Dropdown.Button size='small' trigger='click' overlay={() => (
                      <Menu >
                        <Menu.Item onClick={() => (
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (
                                <WS0605127_ContractLineItemDisplay
                                  ContractType={this.formRef.current.getFieldValue('ContractType')}
                                  Li_ContractType={record.Lo_contractType}
                                  Li_ContractOrgCode={record.Lo_contractOrgs}
                                  Li_ContractStartDate={record.contract_start_date_on}
                                  Li_ContractNum={record.contract_number}

                                  onClick={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ),
                            },
                          })
                        )}>照会</Menu.Item>
                        <Menu.Item onClick={() => (
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              centered: true,
                              width: '80%',
                              component: (
                                <WS0309017_ContractItemSub
                                  Li_ContractType={record.Lo_contractType}
                                  Li_ContractOrgCode={record.Lo_contractOrgs}
                                  Li_ContractStartDate={record.contract_start_date_on}
                                  Li_ContractNum={record.contract_number}
                                  onClick={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ),
                            },
                          })
                        )}>修正</Menu.Item>
                        <Menu.Item onClick={() => {
                          const params = {
                            W_contract_type: record.Lo_contractType,
                            W_contract_org_code: record.Lo_contractOrgs,
                            W_contract_start_date: record.contract_start_date_on,
                            W_contract_number: record.contract_number
                          }

                          confirmDeleteLineAction(params).then(res => {
                            if (res.status) {
                              message.error('使用中の契約です。削除出来ません。');
                            } else {
                              Modal.confirm({
                                content: "削除を行いますか",
                                onOk: () => {
                                  deleteLineAction(params).then(() => {
                                    message.success('正常に削除されました');
                                    let arr = [...this.state.dataContract];
                                    let index = arr.indexOf(record);
                                    if (index !== -1) {
                                      arr.splice(index, 1);
                                      this.setState({
                                        dataContract: arr,
                                      });
                                    }
                                  })
                                  //this.getContractInfoBatchProcess(this.state.initialValues);
                                }
                              })
                            }
                          });
                        }}>
                          削除
                        </Menu.Item>
                      </Menu>
                    )}></Dropdown.Button>
                  )}
                  />
                </Table>
              </Col>
            </Row>
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

const mapStateToProps = (state) => ({
  contractInfos: state.ContractInfoBatchProcessReducer.contractInfos,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS0331001_ContractInfoBatchProcess);
