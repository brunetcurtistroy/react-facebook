import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Button, Table, Row, Col, Space, Modal } from "antd";
import { MoreOutlined, } from '@ant-design/icons';

import { SetIncludesQueryAction } from "redux/ReservationBusiness/PersonalReserveProcess/SetIncludesQuery.action";

import WS0333011_MoreDetail from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333011_MoreDetail.jsx';
import Color from "constants/Color";

class WS0333001_SetIncludesQuery extends React.Component {

  static propTypes = {
    Li_StartDate: PropTypes.any,
    Li_SetCode: PropTypes.any,
    Li_CourseCode: PropTypes.any,
    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = 'セット内容照会';

    this.state = {
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
      isLoading: true,
      dataExamList: [],
      objMoreDetail: {
        Li_StartDate: '',
        Li_SetCode: ''
      },
      initParams: {
        Li_StartDate: '',
        Li_SetCode: '',
        Li_CourseCode: '',
        Search: ''
      },
      textCondition: '条件なし',
      colorCondition: 156,
      title: '',
    };
  }

  componentDidMount = () => {
    if (this.props) {
      const { Li_StartDate, Li_SetCode, Li_CourseCode } = this.props;
      const params = {
        Li_StartDate: Li_StartDate || '',
        Li_SetCode: Li_SetCode || '',
        Li_CourseCode: Li_CourseCode || '',
        Search: ''
      }
      this.callAPILoadData(params);
      this.setState({
        ...this.state,
        objMoreDetail: {
          Li_StartDate: Li_StartDate,
          Li_SetCode: Li_SetCode
        },
        initParams: {
          ...params
        }
      });
    }
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      const { Li_StartDate, Li_SetCode, Li_CourseCode } = this.props;
      const params = {
        Li_StartDate: Li_StartDate || '',
        Li_SetCode: Li_SetCode || '',
        Li_CourseCode: Li_CourseCode || '',
        Search: ''
      }
      this.callAPILoadData(params);
      this.setState({
        ...this.state,
        objMoreDetail: {
          Li_StartDate: Li_StartDate,
          Li_SetCode: Li_SetCode
        },
        initParams: {
          ...params
        }
      });
    }
  }

  callAPILoadData = (params) => {
    this.setState({
      isLoading: true,
      dataExamList: []
    });
    SetIncludesQueryAction(params)
      .then((res) => {
        if(res){
          this.setState({ 
            dataExamList: res.DataTable,
            textCondition: res.Expression_5,
            colorCondition: res.Expression_6,
            title: res.Expression_2
          });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  handleSearch = (e) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        Search: e.target.value,
      }
    }, () => this.callAPILoadData(this.state.initParams));
  }

  render() {
    return (
      <div className="set-includes-query">
        <Card title={this.state.title !== '' ? this.state.title : "ｾｯﾄ内容照会"} >
          <Form>
            <Row gutter={16} className="mb-3" >
              <Col span={18} >
                <Form.Item name="Search" >
                  <Input onChange={this.handleSearch} />
                </Form.Item>
              </Col>
              <Col span={6} style={{ textAlign: "right" }}>
                <Space>
                  <div style={{
                    color: Color(this.state.colorCondition)?.Foreground,
                    background: Color(this.state.colorCondition)?.Background,
                    padding: '1px 3px',
                    fontWeight: 'bold'
                  }}
                  >
                    {this.state.textCondition}
                  </div>
                  <Button size='small' icon={<MoreOutlined />} onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '40%',
                        component: (
                          <WS0333011_MoreDetail
                            Li_StartDate={this.state.objMoreDetail.Li_StartDate}
                            Li_SetCode={this.state.objMoreDetail.Li_SetCode}
                            Li_TextCondition={this.state.textCondition}
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
                </Space>
              </Col>
            </Row>
            <Table
              size='small'
              bordered
              loading={this.state.isLoading}
              dataSource={this.state.dataExamList}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataExamList?.length > 10 ? false : true
              }}
              rowKey={record => record.id}
            >
              <Table.Column title={<div style={{ textAlign: 'center' }}>コード</div>} dataIndex="W1_inspect_code" align='right' width={120} />
              <Table.Column title={<div style={{ textAlign: 'center' }}>名称</div>} dataIndex="exam_name" />
              <Table.Column title={<div style={{ textAlign: 'center' }}>タイプ</div>} dataIndex="Expresstion_2" />
              <Table.Column title={<div style={{ textAlign: 'center' }}>確認</div>} dataIndex="Expresstion_3" />
            </Table>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0333001_SetIncludesQuery);
