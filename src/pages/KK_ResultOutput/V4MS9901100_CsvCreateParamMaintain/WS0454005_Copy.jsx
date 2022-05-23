import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Space, Modal, message, InputNumber } from "antd";

import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import CopyAction from "redux/ResultOutput/CsvCreateParamMaintain/Copy.action";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class WS0454005_Copy extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: [],
      formData: {
        format: "",
        exam_code: "",
        exam_short_name: "",
        CopyCode: "",
        exam_short_name_CopyCode: "",
      }
    };
  }

  componentDidMount() {
    const form = {
      format: this.props.Li_ExamCode,
      exam_code: this.props.Li_ExamCode,
      exam_short_name: this.props.Li_ExamName,
      CopyCode: 0
    }
    this.state.formData = form
    this.onFinish(true)
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      const form = {
        format: this.props.Li_ExamCode,
        exam_code: this.props.Li_ExamCode,
        exam_short_name: this.props.Li_ExamName,
        CopyCode: 0
      }
      this.state.formData = form
      this.onFinish(true);
    }
  }
  onFinish(values) {
    this.formRef.current?.setFieldsValue(this.state.formData)
  }
  CopyRegister(reload) {
    CopyAction.CopyRegister(this.state.formData)
      .then((res) => {
        const func = this.props.onFinishScreen
        func = {
          Lo_Message: res.data.message
        }
        message.success(res.data.message)
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  updateDatasource(field, value) {
    this.state.formData[field] = value;
    this.onFinish()
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
      <div className="copy">
        <Card title="複写">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Space>
              <Form.Item
                name="exam_code"
                label="複写元検査ｺｰﾄﾞ"
              >
                <InputNumber type="text" readOnly style={{width:100}} />
              </Form.Item>
              <Form.Item
                name="exam_short_name"
                label=""
              >
                <Input type="text" readOnly />
              </Form.Item>
            </Space>
            <br></br>
            <Space>
              <Form.Item
                name="CopyCode"
                label="複写先検査ｺｰﾄﾞ"
              >
                <InputNumber type="text" style={{width:100}}
                  onDoubleClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '70%',
                        component: (
                          <WS0271001_InspectItemSearchQuerySingle
                            onFinishScreen={(output) => {
                              this.updateDatasource("CopyCode", output.Lio_InspectItemCode)
                              this.updateDatasource("exam_short_name_CopyCode", output.Lo_exam_name)
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                  }}
                  onChange={(e) => { this.updateDatasource("CopyCode", e === 0 ? null : e) }}
                />
              </Form.Item>
              <Form.Item name="exam_short_name_CopyCode">
                <Input type="text" readOnly />
              </Form.Item>
            </Space>
            <br></br>
            <Form.Item style={{ float: "right" }}>
              <Button type="primary"
                onClick={() => {
                  this.CopyRegister()
                }}
              >複写</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0454005_Copy);
