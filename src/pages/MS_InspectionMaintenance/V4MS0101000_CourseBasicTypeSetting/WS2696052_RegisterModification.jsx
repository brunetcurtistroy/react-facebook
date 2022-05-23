import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Button, Space, InputNumber, Row, Modal } from "antd";
import WS0286001_PrintStyleInquiry from "pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry";
import PrintStyleInquiryAction from "redux/ResultOutput/BindingModeSetting/PrintStyleInquiry.action";

const grid = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
class WS2696052_RegisterModification extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_Action: PropTypes.any,
    Li_CourseCode: PropTypes.any,

    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    // document.title = '登録・修正';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataStyles: [],

      Combobox_ReserveItem: [],
      Combobox_Pattern: [],
      Combobox_JudgeLevel: [],

      format_name: ''
    };

    this.onFinish = this.onFinish.bind(this)
  }

  componentDidMount() {
    this.loadDataStyle()
    this.getScreenData()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData()
    }
  }

  getScreenData() {

  }

  loadDataStyle() {
    PrintStyleInquiryAction.GetListData()
      .then(res => {
        this.setState({ dataStyles: res })
      })
  }

  getStyleFormatName(style) {
    let data = this.state.dataStyles?.filter(x => x.style_code === style)
    this.formRef.current?.setFieldsValue({
      format_name: data.length > 0 ? data[0].format_name : ''
    })

    this.setState({
      format_name: data.length > 0 ? data[0].format_name : ''
    })
  }

  onFinish(values) {
    if (!values.CourseCode) {
      Modal.error({
        width: 360,
        title: 'コースコードを入力してください。'
      })
    } else {
      // call api
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

  render() {
    return (
      <div className="register-modification">
        <Card title="登録・修正">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{NumDays: 1}}
            {...grid}
          >
            <Form.Item name="CourseCode" label="コード">
              <Input type="text" style={{ width: 50, textAlign: 'center' }} disabled={this.props.Li_CourseCode} />
            </Form.Item>

            <Form.Item name="CourseName" label="名&emsp;称">
              <Input type="text" />
            </Form.Item>

            <Form.Item name="CourseAbbreviation" label="略&emsp;称">
              <Input type="text" />
            </Form.Item>

            <Form.Item name="ReserveItem" label="予約項目">
              <Select style={{ width: 180 }}>
                {this.state.Combobox_ReserveItem?.map((value) => (
                  <Select.Option value={value.LinkedField}>{value.DisplayField}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="ラベル">
              <Row>
                <Form.Item name="Label" style={{ width: 50, marginRight: 40 }}>
                  <InputNumber min={0} maxLength={3} />
                </Form.Item>

                <Form.Item name="NumDays" label='日&emsp;数'>
                  <InputNumber min={0} maxLength={2} style={{ width: 35 }} />
                </Form.Item>
              </Row>
            </Form.Item>

            <Form.Item name="Pattern" label="パターン">
              <Select style={{ width: 180 }}>
                {this.state.Combobox_Pattern?.map((value) => (
                  <Select.Option value={value.LinkedField}>{value.DisplayField}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="JudgeLevel" label="判定レベル">
              <Select style={{ width: 180 }}>
                {this.state.Combobox_JudgeLevel?.map((value) => (
                  <Select.Option value={value.LinkedField}>{value.DisplayField}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="様&emsp;式">
              <Row>
                <Form.Item name="Style" style={{ width: 50, marginRight: 7 }}>
                  <Input maxLength={3}
                    onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 600,
                          component: (
                            <WS0286001_PrintStyleInquiry
                              Li_UsuallyWrenRoster={''}
                              Lio_StyleCode={this.formRef.current?.getFieldValue('Style')}
                              onFinishScreen={(output) => {
                                this.formRef.current?.setFieldsValue({
                                  Style: output.Lio_StyleCode,
                                  format_name: output.Lo_FormatName
                                })
                                this.setState({
                                  format_name: output.Lo_FormatName
                                })

                                this.closeModal()
                              }}
                            />),
                        },
                      })
                    }}

                    onBlur={(e) => {
                      this.getStyleFormatName(e.target.value)
                    }}
                  />
                </Form.Item>
                <span>{this.state.format_name}</span>
                <Form.Item name="format_name" style={{ display: "none" }}>
                  <Input />
                </Form.Item>
              </Row>
            </Form.Item>

            <Form.Item name="Option" label="オプション">
              <Input type="text" />
            </Form.Item>

            <Space style={{ float: 'right', marginTop: 15 }} >
              <Button type="primary" htmlType='submit'>登録</Button>
            </Space>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2696052_RegisterModification);
