import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { getContractInspectInquiryAction } from "redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions";
import WS0333011_MoreDetail from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333011_MoreDetail.jsx';

import { Card, Form, Input, Button, Table, Row, Col, Space, Modal } from "antd";
import { MoreOutlined, } from '@ant-design/icons';

class WS0605162_ContractInspectInquiry extends React.Component {

  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgs: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_SetCode: PropTypes.any,
    Li_CourseCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '契約検査照会';

    this.state = {
      Expression_7: '',
      Expression_8: '',
      medical_exam_course: '',
      isLoading: true,
      initParams: {
        Li_ContractType: 0,
        Li_ContractOrgs: 0,
        Li_ContractStartDate: '2020-04-01',
        Li_ContractNum: 60,
        Li_SetCode: 60,
        Li_CourseCode: '',
        Li_Search: ''
      },
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataExamList: []
    };
  }

  componentDidMount = () => {
    this.callAPILoadData(this.state.initParams);
  }

  callAPILoadData = (params) => {
    this.setState({ isLoading: true })
    getContractInspectInquiryAction(params)
      .then(res => this.setState({
        dataExamList: res.ExamList,
        Expression_7: res.Expression_7,
        Expression_8: res.Expression_8,
        medical_exam_course: res.medical_exam_course,
        contract_short_name: res.contract_short_name
      }))
      .finally(() => this.setState({ isLoading: false }))
  }

  onFinish(values) { }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ rowSelectLeft: selectedRows[0] })
      }
    }
    return (
      <div className="contract-inspect-inquiry">
        <Card title="契約検査照会">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
              <Col span={22}>
                <Form.Item name="Expression_7" label="共　通" >
                  <div>{this.state.Expression_7}</div>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item style={{ float: 'right' }}>
                  <Button type="primary">{this.state.Expression_8}</Button>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Space>
                <Form.Item name="medical_exam_course" label="コース" >
                  <div>{this.state.medical_exam_course}</div>
                </Form.Item>
                <Form.Item style={{ float: 'right' }}>
                  <Button icon={<MoreOutlined />} onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '30%',
                        component: (
                          <WS0333011_MoreDetail
                            Li_StartDate={this.props.Li_ContractStartDate}
                            Li_SetCode={this.props.Li_SetCode}
                            onFinishScreen={(obj) => {
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
                  }}></Button>
                </Form.Item>
                <Form.Item name="contract_short_name" >
                  <div>{this.state.contract_short_name}</div>
                </Form.Item>
              </Space>
            </Row>

            <Form.Item name="Search" label="検　索" >
              <Input />
            </Form.Item>

          </Form>

          <Table dataSource={this.state.dataExamList} pagination={this.state.pagination} className='mt-3'
            size="small" loading={this.state.isLoading} rowKey={record => record.id} rowSelection={{ type: "radio", ...rowSelection }}
          >
            <Table.Column title="コード" dataIndex="W1_inspect_code" />
            <Table.Column title="名称" dataIndex="exam_name" />
            <Table.Column title="タイプ" dataIndex="Expression_2" />
            <Table.Column title="確認" dataIndex="Expression_3" />
          </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0605162_ContractInspectInquiry);
