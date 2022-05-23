import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Checkbox, Button, Space, Row, Col, Upload, Modal } from "antd";
import { QuestionCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';
import WS2290003_JudgeUnitList from 'pages/ZZ_Others/DEVTOOL1000_RisingDocumentCreate/WS2290003_JudgeUnitList.jsx';

class WS2290001_RisingDocumentCreate extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '立上資料作成';

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
  showModal = () => {
    this.setState({
      childModal: {
        visible: true,
        width: '20%',
        component: (
          <>
            <Row>
              <Col span={3}>
                <QuestionCircleOutlined style={{ fontSize: '32px', color: '#08c' }} />
              </Col>
              <Col span={20}>
                <p style={{ marginTop: '0.5em' }}>資料用csvを作成をしますか </p>
              </Col>
            </Row>
            <div style={{ marginTop: '1em', textAlign: 'right' }}>
              <Space>
                <Button onClick={() => {
                }}>&emsp;は　い&emsp;</Button>
                <Button onClick={() => this.closeModal()} >&emsp;いいえ&emsp;</Button>
              </Space>
            </div>
          </>
        )
      }
    });
  };
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
      <div className="rising-document-create">
        <Card title="立上資料作成">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ StsJudgeAndUnitList: true, StsDocumentChecklist: true }}
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="OutputButton"><Input /></Form.Item>
              <Form.Item name="JudgeLevel"><Input /></Form.Item>
              <Form.Item name="Pattern"><Input /></Form.Item>
              <Form.Item name="FacilityName"><Input /></Form.Item>
            </div>
            <Form.Item name="OutputFolder" label={<Button type="text" style={{ border: '1px solid #545C8F', background: '#CFD9FE' }}>&ensp;出力先&ensp;</Button>}  >
              <Input onDoubleClick={() => { document.getElementById("idUpload").click() }} />
            </Form.Item>
            <Space>
              <Form.Item name="StsJudgeAndUnitList" label={<Button type="text" style={{ border: '1px solid #545C8F', background: '#CFD9FE' }}>発行資料</Button>} valuePropName="checked">
                <Checkbox>判定・単位一覧表</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button icon={<DoubleRightOutlined />} onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '30%',
                      component: (
                        <WS2290003_JudgeUnitList
                          Lio_JudgeLevel={this.formRef.current?.getFieldValue("JudgeLevel")}
                          Lio_Pattern={this.formRef.current?.getFieldValue("Pattern")}
                          onFinishScreen={(output) => {
                            this.formRef.current?.setFieldsValue({
                              JudgeLevel: output.Lio_JudgeLevel,
                              Pattern: output.Lio_Pattern,
                            })
                            this.forceUpdate()
                            this.closeModal()
                          }}
                        />),
                    },
                  })
                }} ></Button>
              </Form.Item>
            </Space>
            <Form.Item name="StsDocumentChecklist" label="&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; " valuePropName="checked">
              <Checkbox>帳票チェック表</Checkbox>
            </Form.Item>
            <Row>
              <Col span={12}>
                <Button type="primary">閉じる</Button>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button style={{ border: '0px' }} onClick={() => this.showModal()} >出　力</Button>
              </Col>
            </Row>
            <Upload id="idUpload" beforeUpload={(file) => {
              return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  console.log(file)
                  this.formRef.current?.setFieldsValue({
                    OutputFolder: file.name
                  })
                };
              });
            }}>&emsp;
            </Upload>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2290001_RisingDocumentCreate);
