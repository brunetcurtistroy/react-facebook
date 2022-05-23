import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Radio, Button, Modal, Space } from "antd";
import WS0286001_PrintStyleInquiry from 'pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
class WS0446006_StardStyleRegister extends React.Component {
  static propTypes = {
    Li_Office: PropTypes.string,
    Li_BranchShop: PropTypes.number,
    Li_Course: PropTypes.string,
    Li_Style: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '標準様式登録';
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
  closeModal(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }
  render() {
    return (
      <div className="stard-style-register">
        <Card title="標準様式登録">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ Select: 0 }}
          >
            <div style={{display:'none'}}>
              <Form.Item name="Current"><Input /></Form.Item>
              <Form.Item name="StandardStyle"><Input /></Form.Item>
              <Form.Item name="CourseStyle"><Input /></Form.Item>
              <Form.Item name="OfficeStyle"><Input /></Form.Item>
              <Form.Item name="Course_OfficeStyle"><Input /></Form.Item>
              <Form.Item name="Style"><Input /></Form.Item>
              <Form.Item name="Select"><Input /></Form.Item>
              <Form.Item name="ConfirmButton"><Input /></Form.Item>
              <Form.Item name="Office"><Input /></Form.Item>
              <Form.Item name="BranchShop"><Input /></Form.Item>
              <Form.Item name="Course"><Input /></Form.Item>
              <Form.Item name="StsSpecify"><Input /></Form.Item>
            </div>
            <Form.Item  label="コース:: " >
              <span>{this.formRef.current?.Expression_8}</span>
            </Form.Item>
            <Form.Item  label="事業所::" >
              <span>{this.formRef.current?.Expression_9}</span>
            </Form.Item>
            <Space>
              <Form.Item name="Style" label="様　式::" >
                <Input.Search onSearch={()=>{
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '30%',
                        component: (
                          <WS0286001_PrintStyleInquiry
                            Lio_StyleCode={this.formRef.current.getFieldValue("Style")}
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                Style: output.Lio_StyleCode
                              })
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    });
                }}  />
              </Form.Item>
              <div style={{ marginBottom: '1em' }}>{this.formRef.current?.format_name}</div>
            </Space>
            <p >指定方法</p>
            <Form.Item name="Select" style={{ marginLeft: '1.5em' }}>
              <Radio.Group value={1}>
                <Radio style={radioStyle} value={0}>コースを指定する</Radio>
                <Radio style={radioStyle} value={1}>事業所を指定する</Radio>
                <Radio style={radioStyle} value={2}>コースと事業所を指定する</Radio>
              </Radio.Group>
            </Form.Item>
            <Space style={{ float:'right' }}>
              <Button type="primary">全表示</Button>
              <Button type="primary">更　新</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0446006_StardStyleRegister);
