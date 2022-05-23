import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Row, Modal, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import WS0104001_CoursesSettingSub from "pages/KS_CooperationRelated/YMGA0610_EMedicalRecordsInspectRequestMaintain/WS0104001_CoursesSettingSub";

const styleLabel = {
  textAlign: "center",
  color: "#fff",
  fontWeight: "bold",
  padding: "0 10px",
  background: "#296cca",
  width: 80,
  height: 24,
  marginRight: 5
};
class WS0483004_SpecialCondition extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_SpecialCondition: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '特殊条件';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  onFinish(values) {

  }

  showCoursesSettingSub(title, field) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 900,
        component:
          <WS0104001_CoursesSettingSub
            Li_Title={title}
            Lio_CourseList={this.formRef.current?.getFieldValue(field)}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                [field]: output.Lio_CourseList
              })

              this.closeModal()
            }}
          />
        ,
      },
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
      <div className="special-condition">
        <Card title="特殊条件">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row>
              <div style={styleLabel}>対象ｺｰｽ</div>
              <Form.Item name="CourseConditionOr" style={{ width: 'calc(100% - 85px)' }}>
                <Input
                  onDoubleClick={() => {
                    this.showCoursesSettingSub('対象ｺｰｽ', 'CourseConditionOr')
                  }}
                />
              </Form.Item>
            </Row>
            <Row>
              <div style={styleLabel}>対象外ｺｰｽ</div>
              <Form.Item name="CourseConditionNot" style={{ width: 'calc(100% - 85px)' }}>
                <Input
                  onDoubleClick={() => {
                    this.showCoursesSettingSub('対象外ｺｰｽ', 'CourseConditionNot')
                  }} />
              </Form.Item>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ float: "right", marginTop: 10 }}
                onClick={() => {
                  let CourseConditionOr = this.formRef.current?.getFieldValue('CourseConditionOr')
                  let CourseConditionNot = this.formRef.current?.getFieldValue('CourseConditionNot')
                  if (CourseConditionOr || CourseConditionNot) {
                    Modal.confirm({
                      width: 200,
                      title: "更新しますか",
                      icon: (<QuestionCircleOutlined style={{ color: "#1890ff" }} />),
                      onOk: () => {
                        // call api
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({
                            stsUplate: true
                          })
                        }
                      },
                      onCancel: () => {
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({
                            stsUplate: false
                          })
                        }
                      },
                    });
                  } else {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({
                        stsUplate: false
                      })
                    }
                  }
                }}
              >更新
              </Button>
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0483004_SpecialCondition);
