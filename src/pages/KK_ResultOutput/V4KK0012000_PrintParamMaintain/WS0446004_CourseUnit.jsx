import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Form, Row, Col, Input, Modal } from "antd";
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0286001_PrintStyleInquiry from 'pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0446004_CourseUnit extends React.Component {
  static propTypes = {
    Li_Course: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'コース単位';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  onFinish(values) { }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }
  render() {
    return (
      <div className="course-unit p-td">
        <Card title="コース単位">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              dataSource={[{ id: 1 }]}
              loading={false}
              pagination={false}
              rowKey={(record) => record.id}
            >
              <Table.Column title="事業所コード" render={(value, record, index) => {
                return <Row>
                  <Col span={16}>
                    <Form.Item name="office_code" style={{ marginBottom: '0px' }}>
                      <Input.Search onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '60%',
                            component: (
                              <WS0247001_OfficeInfoRetrievalQuery
                                Lio_OfficeCode={this.formRef.current.getFieldValue("office_code")}
                                Lio_BranchStoreCode={this.formRef.current.getFieldValue("v4_branch_store_code")}
                                onFinishScreen={(output) => {
                                  this.formRef.current.setFieldsValue({
                                    office_code: output.Lio_OfficeCode,
                                    v4_branch_store_code: output.Lio_BranchStoreCode
                                  })
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }} />
                    </Form.Item>
                  </Col>
                  <Col span={1} style={{ textAlign: 'center' }}>-</Col>
                  <Col span={7}>
                    <Form.Item name="v4_branch_store_code" style={{ marginBottom: '0px' }}>
                      <Input.Search onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '60%',
                            component: (
                              <WS0247001_OfficeInfoRetrievalQuery
                                Lio_OfficeCode={this.formRef.current.getFieldValue("office_code")}
                                Lio_BranchStoreCode={this.formRef.current.getFieldValue("v4_branch_store_code")}
                                onFinishScreen={(output) => {
                                  this.formRef.current.setFieldsValue({
                                    office_code: output.Lio_OfficeCode,
                                    v4_branch_store_code: output.Lio_BranchStoreCode
                                  })
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        });
                      }} />
                    </Form.Item>
                  </Col>
                </Row>
              }} />
              <Table.Column title="事業所名称" dataIndex="Expression_7" />
              <Table.Column title="様式" dataIndex="standard_printing_style" render={(value, record, index) => {
                return <Form.Item name="standard_printing_style" style={{ marginBottom: '0px' }}>
                  <Input.Search onSearch={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '30%',
                        component: (
                          <WS0286001_PrintStyleInquiry
                           Lio_StyleCode = {this.formRef.current.getFieldValue("standard_printing_style")}
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                standard_printing_style: output.Lio_StyleCode
                              })
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    });
                  }} />
                </Form.Item>
              }} />
              <Table.Column title="様式名称" dataIndex="format_name" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0446004_CourseUnit);
