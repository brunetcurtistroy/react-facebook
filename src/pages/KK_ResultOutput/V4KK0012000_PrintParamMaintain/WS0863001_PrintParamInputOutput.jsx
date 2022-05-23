import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Select, Button, Upload, Space, Modal, message } from "antd";
import WS0863008_UptakeFileList from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0863008_UptakeFileList.jsx';
import WS0863006_StyleQuery from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0863006_StyleQuery.jsx';
import PrintParamInputOutputAction from "redux/ResultOutput/PrintParamMaintain/PrintParramInputOutput/PrintParamInputOutput.action";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import { download_file } from "helpers/CommonHelpers";
import ModalDraggable from "components/Commons/ModalDraggable";

class WS0863001_PrintParamInputOutput extends React.Component {
  // static propTypes = {
  //   Li_WindowType: PropTypes.number,
  //   Li_StyleCode: PropTypes.string,
  //   onFinishScreen: PropTypes.func
  // }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '印刷ﾊﾟﾗﾒｰﾀ入出力';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      formData: {
        InputAndOutput: "",
        Li_StyleCode: "",
        StyleCode: "",
      },
      format_name: "",
      disabled: false
    };
  }
  componentDidMount() {
    this.state.formData.Li_StyleCode = this.props.Li_StyleCode
    let formdata = { ...this.state.formData }
    this.setState({
      formData: formdata,
      format_name: this.props.Li_FormatName
    })
    this.getScreenData();
  }
  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.state.formData.Li_StyleCode = this.props.Li_StyleCode
      let formdata = { ...this.state.formData }
      this.setState({
        formData: formdata,
        format_name: this.props.Li_FormatName
      })
      this.getScreenData();
    }
  }
  LoadFormData() {
    this.formRef.current?.setFieldsValue(this.state.formData)
  }
  getScreenData() {
    PrintParamInputOutputAction.getScreenData(this.state.formData)
      .then((res) => {
        this.setState({
          disabled: res.InputAndOutput == 0 ? false : true,
        })
        this.formRef.current?.setFieldsValue(this.state.formData = res)
      })
      .finally()
  }
  ImportExport() {
    if (this.state.formData.InputAndOutput == 0) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 300,
          component:
            <WS0061015_CheckYesNoNo
              Li_Message={'出力しますか？'}
              onFinishScreen={(ouput) => {
                if (ouput.Lio_StsReturn) {
                  // this.state.formData.Li_StyleCode = this.state.formData.StyleCode
                  PrintParamInputOutputAction.runbtn(this.formRef.current?.getFieldValue())
                    .then((res) => {
                      download_file(res);
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
                this.closeModal()
              }} />
        },
      });
    } else {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: '50%',
          component:
            <WS0863008_UptakeFileList
              onFinishScreen={(ouput) => {
                Modal.warning({ content: ouput.Lo_Message, okText: 'は　い' })
                this.closeModal()
              }} />
        },
      });
    }
  }
  updateDatasource(field, value) {
    this.state.formData[field] = value
    if (field == 'InputAndOutput') {
      this.setState({
        disabled: value == 0 ? false : true,
      })
    }
  }
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
      <div className="print-param-input-output">
        <Card title="印刷ﾊﾟﾗﾒｰﾀ入出力">
          <Form
            ref={this.formRef}
            onFinish={this.getScreenData}
          >
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '1em' }}>
              <Form.Item name="InputAndOutput" label="指　示" style={{ width: '150px' }}>
                <Select onChange={(e) => {
                  this.updateDatasource("InputAndOutput", e)
                }}>
                  <Select.Option value={0}>出力</Select.Option>
                  <Select.Option value={1}>入力</Select.Option>
                </Select>
              </Form.Item>
              <Space>
                <Form.Item name="StyleCode" label="様　式" style={{ width: 150 }}  >
                  <Input.Search style={{ width: '100%' }} maxLength={3} disabled={this.state.disabled}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '50%',
                          component: (
                            <WS0863006_StyleQuery
                              onFinishScreen={(output) => {
                                this.updateDatasource("Li_StyleCode", output.Lo_StyleQuery)
                                this.updateDatasource("StyleCode", output.Lo_StyleQuery)
                                this.setState({
                                  format_name: output.Lo_FormatName
                                })
                                this.LoadFormData()
                                this.closeModal()
                              }}
                            />
                          ),
                        },
                      })
                    }}
                    onChange={(e) => {
                      this.updateDatasource("StyleCode", e.target.value)
                    }}
                  />
                </Form.Item>
                <Form.Item name="format_name" hidden={this.state.disabled} >
                  <span>{this.state.format_name}</span>
                </Form.Item>
              </Space>
              <Form.Item hidden={this.state.disabled} name="InputAndOutputFolder" label="入出力">
                <Input type='text' />
              </Form.Item>
            </div>
            <Button type="primary" htmlType="submit" style={{ float: 'right', marginTop: '1em' }}
              onClick={() => {
                this.ImportExport()
              }}   >実行</Button>
            {/* <Upload id="idUpload" beforeUpload={(file) => {
              return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  console.log(file)
                  this.formRef.current?.setFieldsValue({
                    InputAndOutputFolder: file.name
                  })
                };
              });
            }}>&emsp;
            </Upload> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0863001_PrintParamInputOutput);
