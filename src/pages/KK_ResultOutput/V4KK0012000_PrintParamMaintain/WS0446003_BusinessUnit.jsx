import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Form, Input, Modal } from "antd";
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS0286001_PrintStyleInquiry from 'pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0446003_BusinessUnit extends React.Component {
  static propTypes = {
    Li_OfficeCode: PropTypes.string,
    Li_BranchStoreCode: PropTypes.number,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = '事業所単位';
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
      <div className="business-unit p-td">
        <Card title="事業所単位">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              dataSource={[{ id: 1 }]}
              loading={false}
              pagination={false}
              bordered={true}
              rowKey={(record) => record.id}
            >
              <Table.Column title="コース" dataIndex="medical_exam_course" render={(value, record, index) => {
                return <Form.Item name="medical_exam_course" style={{ marginBottom: '0px' }} >
                  <Input.Search onSearch={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '60%',
                        component: (
                          <WS0265001_BasicCourseInquiry
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                medical_exam_course: output.Lo_CourseCode
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
              <Table.Column title="コース名称" dataIndex="Expression_7" />
              <Table.Column title="様式" dataIndex="standard_printing_style" render={(value, record, index) => {
                return <Form.Item name="standard_printing_style" style={{ marginBottom: '0px' }} >
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0446003_BusinessUnit);
