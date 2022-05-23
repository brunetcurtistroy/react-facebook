import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Checkbox, Button, Modal, message } from "antd";

import WS0460006_Inquiry from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0460006_Inquiry.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import ParamInputAction from "redux/ResultOutput/CsvCreateParamMaintain/ParamInput.action";

const Grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class WS0460005_ParamInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'パラメータ入力';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: []
    };
    this.onFinish = this.onFinish.bind(this)
  }

  componentDidMount() {
    this.formRef.current?.resetFields();
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.formRef.current?.resetFields();
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish(values) {
    let params = {
      ...values,
      StsValue: values.StsValue ? 1 : 0,
      StsJudge: values.StsJudge ? 1 : 0,
    }

    if (!values.No || !values.Title || !values.Csvfile || !values.Format || !values.MedicalExamCourse) {
      Modal.error({
        width: 300,
        title: '全て入力して下さい。'
      })
    } else {
      ParamInputAction.execEvent(params)
        .then((res) => {
          console.log(res)
          if (this.props.onFinishScreen) {
            this.props.onFinishScreen({})
          }
        })
        .catch((err) => {
          console.log(err)
          const res = err.response;
          if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
          message.error(res.data.message);
        });
    }
  }

  render() {
    return (
      <div className="param-input">
        <Card title="パラメータ入力">
          <Form {...Grid}
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              StsValue: true,
              StsJudge: false
            }}
          >
            <Form.Item name="No" label="No" >
              <Input type="text" maxLength={2} style={{ width: 70 }}
                onDoubleClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 750,
                      component: (
                        <WS0460006_Inquiry
                          onFinishScreen={(output) => {
                            this.formRef.current.setFieldsValue({
                              No: output.Lo_No,
                              Title: output.Lo_DocumentName,
                              Format: output.Lo_Format,
                              MedicalExamCourse: output.Lo_MedicalExamCourse,
                              Csvfile: output.Lo_Csvfile,
                            });
                            this.closeModal()
                          }}
                        />
                      ),
                    },
                  })
                }}
              />
            </Form.Item>

            <Form.Item name="Title" label="帳票名" >
              <Input type="text" maxLength={20} style={{ width: 200 }} />
            </Form.Item>

            <Form.Item name="Format" label="FORMAT" >
              <Input type="text" maxLength={9} style={{ width: 200 }} />
            </Form.Item>

            <Form.Item name="MedicalExamCourse" label="コース" >
              <Input type="text" maxLength={3} style={{ width: 70 }}
                onDoubleClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 800,
                      component: (
                        <WS0265001_BasicCourseInquiry
                          onFinishScreen={(output) => {
                            this.formRef.current.setFieldsValue({
                              MedicalExamCourse: output.Lo_CourseCode,
                            });
                            this.closeModal()
                          }}
                        />
                      ),
                    },
                  })
                }}
              />
            </Form.Item>

            <Form.Item name="Csvfile" label="出力先" >
              <Input type="text" />
            </Form.Item>

            <Form.Item name="StsValue" label="結果値" valuePropName="checked" >
              <Checkbox>グループ判定、所見、検査値を出力</Checkbox>
            </Form.Item>

            <Form.Item name="StsJudge" label="単品判定" valuePropName="checked" >
              <Checkbox>単品判定を出力（所見を除く）</Checkbox>
            </Form.Item>

            <Form.Item style={{ float: 'right' }}>
              <Button type="primary" htmlType='submit'
              >実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0460005_ParamInput);
