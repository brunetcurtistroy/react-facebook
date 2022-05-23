import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import PropTypes from 'prop-types';

import {
  Card, Col, Form, Input, Row, Select, Table, Button, DatePicker, message,
  Modal,
} from "antd";

import axios from 'configs/axios';
import WS0247001_OfficeInfoRetrievalQuery from "../V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0246001_InsurerInfoSearchQuery from "../V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery";
import WS0265001_BasicCourseInquiry from "../V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import { debounce } from "lodash";
import moment from "moment-timezone";
import  ModalDraggable  from "components/Commons/ModalDraggable";

const grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class WS0275001_ContractQuerySelect extends React.Component {
  static propTypes = {
    Li_SpecifyContractType: PropTypes.any,
    Li_SpecifyContractOrgCode: PropTypes.any,
    Li_SpecifyCourse: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '契約照会選択';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      tableData: [],

      isLoadingData: false,
    };

    this.loadTableData = this.loadTableData.bind(this);
  }

  componentDidMount() {
    this.loadScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.formRef.current.resetFields();

      this.loadScreenData();
    }
  }

  loadScreenData = () => {
    this.setState({isLoadingData: true});

    const {
      Li_SpecifyContractType, 
      Li_SpecifyContractOrgCode,
      Li_SpecifyCourse,
    } = this.props;

    axios.get('/api/contract-info-maintain/contract-query-select/get-screen-data', {
      params: {
        Li_SpecifyContractOrgCode, Li_SpecifyCourse, Li_SpecifyContractType
      },
    })
      .then(res => {
        this.formRef.current.setFieldsValue({
          ...res.data,
          ContractStartDateChar: moment(res.data.ContractStartDateChar).isValid() ? moment(res.data.ContractStartDateChar) : null,
        });
        this.loadTableData();
      })
      .catch(error => {
        this.setState({ isLoadingData: false });
        console.log(error);
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      });
  }

  loadTableData() {
    this.setState({isLoadingData: true});

    const params = this.formRef.current.getFieldsValue();

    axios.get('/api/contract-info-maintain/contract-query-select', {
      params: {
        ...params,
        Li_ContractType: params.ContractType,
        Li_OrgCode: params.ContractOrgCode,
        Li_ContractStartDate: params.ContractStartDateChar?.format('YYYY-MM-DD'),
        Li_Course: params.Course,
      },
    })
      .then(res => {
        this.setState({
          tableData: res.data.tableData,
        });
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({isLoadingData: false}));
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

  render() {
    return (
      <div className="contract-query-select">
        <Card title="契約照会選択">
          <Form {...grid}
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              ContractType: (this.props.Li_SpecifyContractType === undefined) ? 9 : this.props.Li_SpecifyContractType,
              ContractOrgCode: this.props.Li_SpecifyContractOrgCode,
              Course: this.props.Li_SpecifyCourse,
              // ContractStartDateChar: moment(this.state.ContractStartDateChar).isValid() ? moment(this.state.ContractStartDateChar): null,
            }}
            onValuesChange={debounce(() => this.loadTableData(), 300)}
          >
            <Row className="mb-3" gutter={16}>
              <Col span={3}>
                <Form.Item name="ContractType" label="区分">
                  <Select onChange={() => {this.formRef.current.resetFields(['ContractOrgCode']); this.forceUpdate()}}>
                    <Select.Option value={9}>全　て</Select.Option>
                    <Select.Option value={0}>共　通</Select.Option>
                    <Select.Option value={1}>保険者</Select.Option>
                    <Select.Option value={2}>事業所</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item name="ContractOrgCode" label="団体">
                  <Input.Search
                    disabled={!(() => {const ContractType = this.formRef.current?.getFieldValue('ContractType'); return (ContractType == 1) || (ContractType == 2)})()}
                    onSearch={() => {
                    const ContractType = this.formRef.current.getFieldValue('ContractType');

                    let component = null;

                    if (ContractType == 2) {
                      component = (<WS0247001_OfficeInfoRetrievalQuery
                        Lio_OfficeCode={this.formRef.current.getFieldValue('ContractOrgCode')}
                        onFinishScreen={(data) => {
                          this.formRef.current.setFieldsValue({
                            ContractOrgCode: data.Lio_OfficeCode,
                          });

                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: false,
                            },
                          });
                        }}
                      />)
                    } else if (ContractType == 1) {
                      component = (<WS0246001_InsurerInfoSearchQuery
                        onFinishScreen={(data) => {
                          this.formRef.current.setFieldsValue({
                            ContractOrgCode: data.Lo_InsurerCode,
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

                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '80vw',
                        component: component,
                      },
                    });
                  }} />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item name="ContractStartDateChar" label="年度">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="Course" label="コース">
                  <Input.Search onSearch={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '80vw',
                        component: (<WS0265001_BasicCourseInquiry
                          onFinishScreen={(data) => {
                            this.formRef.current.setFieldsValue({
                              Course: data.Lo_CourseCode,
                            });

                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: false,
                              },
                            });
                          }}
                        />),
                      },
                    });
                  }} />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>

            <Table
              className="mb-3"
              dataSource={this.state.tableData}
              rowKey={record => record.id}
              loading={this.state.isLoadingData}
            >
              <Table.Column title="種別" key="Expression_5" render={(value, record) => {
                switch (record.contract_type) {
                  case 1: return '保険者';
                  case 1: return '事業所';
                  default: return '共　通';
                }
              }} />
              <Table.Column title="団体名称" dataIndex={["contract_management", "contract_name"]} />
              <Table.Column title="年度" dataIndex="contract_start_date_on" />
              <Table.Column title="番号" dataIndex="contract_number" />
              <Table.Column title="契約名称" dataIndex="medical_exam_course" render={(value, record) => {
                return `${value} ${record.contract_short_name}`
              }} />
              <Table.Column render={(value, record) => (
                <Button size="small" type="primary" style={{ float: "right" }} onClick={() => {
                  this.props.onFinishScreen({
                    Lo_ContractType: record.contract_type,
                    Lo_ContractOrgCode: record.contract_office_code,
                    Lo_ContractStartDate: record.contract_start_date_on,
                    Lo_ContractNum: record.contract_number,

                    recordData: record,
                  });
                }}>選択</Button>
              )} />
            </Table>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            this.closeModal()
          }}
        />
      </div>
    );
  }
}

export default WS0275001_ContractQuerySelect;
