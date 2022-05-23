import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";


import { QuestionCircleOutlined } from "@ant-design/icons";

import { Card, Form, Input, Radio, Button, Upload, message, Modal, Row, Col, Space, Spin } from "antd";
import SetCsvCreateAction from "redux/basicInfo/SetInfoMaintain/SetCsvCreate.action";
import { download_file } from "helpers/CommonHelpers";

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};


class WS2708003_SetCsvCreate extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'セットCSV作成';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingForm: false
    };

    this.onFinish = this.onFinish.bind(this)
  }

  setCsvCreate(params) {
    this.setState({ isLoadingForm: true })
    SetCsvCreateAction.SetCsvCreate(params)
      .then((res) => {
        this.setState({
          childModal: {
            visible: true,
            width: 400,
            component: (
              <div style={{ padding: '20px' }}>
                <Row>
                  <Col span={4}>
                    <QuestionCircleOutlined style={{ fontSize: '32px', color: '#08c' }} />
                  </Col>
                  <Col span={20}>
                    <p style={{ marginLeft: '0.5em' }}>出力が終了しました。内容を確認しますか</p>
                  </Col>
                </Row>
                <div style={{ marginTop: '1em', textAlign: 'center' }}>
                  <Space>
                    <Button type="primary"
                      onClick={() => {
                        download_file(res);

                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({})
                        }
                        this.closeModal()
                      }}
                    >は　い</Button>
                    <Button type="primary"
                      onClick={() => {
                        if (this.props.onFinishScreen()) {
                          this.props.onFinishScreen({})
                        }
                        this.closeModal()
                      }}>いいえ</Button>
                  </Space>
                </div>
              </div>
            )
          }
        })
        this.setState({ isLoadingForm: false })
      })
      .catch((err) => {
        this.setState({ isLoadingForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  onFinish(values) {
    let params = {
      ...values,
      Output: values.Output + '.csv'
    }

    if (this.formRef.current?.getFieldValue('Output')) {
      console.log(params)
      this.setState({
        childModal: {
          visible: true,
          width: 300,
          component: (
            <div style={{ padding: '20px' }}>
              <Row>
                <Col span={4}>
                  <QuestionCircleOutlined style={{ fontSize: '32px', color: '#08c' }} />
                </Col>
                <Col span={20}>
                  <p style={{ marginLeft: '0.5em' }}>出力を実行しますか</p>
                </Col>
              </Row>
              <div style={{ marginTop: '1em', textAlign: 'center' }}>
                <Space>
                  <Button type="primary"
                    onClick={() => {
                      this.setCsvCreate(params)
                      this.closeModal()
                    }}
                  >は　い</Button>
                  <Button type="primary"
                    onClick={() => {

                      this.closeModal()
                    }}>いいえ</Button>
                </Space>
              </div>
            </div>
          )
        }
      });
    } else {
      Modal.error({
        width: 300,
        title: '出力先を入力してください'
      })
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
      <div className="set-csv-create">
        <Card title="セットCSV作成">
          <Spin spinning={this.state.isLoadingForm}>
            <Form ref={this.formRef} onFinish={this.onFinish}
              initialValues={{
                SetSpecify: 0
              }}
            >
              <Form.Item name="SetSpecify" label="対象" {...grid}>
                <Radio.Group>
                  <Radio value={0}>ｾｯﾄ</Radio>
                  <Radio value={1}>明細</Radio>

                </Radio.Group>
              </Form.Item>
              <Form.Item name="Output" label="出力先" {...grid}>
                <Input type="text" suffix=".csv"
                  onDoubleClick={() => {
                    console.log(this.formRef.current?.getFieldValue('Output'))
                    document.getElementById("idUpload").click()
                  }} />
              </Form.Item>
              <Upload id="idUpload"
                accept=".csv"
                beforeUpload={(file) => {
                  return new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      console.log(file)
                      this.formRef.current?.setFieldsValue({
                        Output: file.name
                      })
                    };
                  });
                }}>&emsp;
              </Upload>

              <Button type="primary" style={{ float: "right" }} htmlType="submit">出力</Button>
            </Form>
          </Spin>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            this.closeModal()
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2708003_SetCsvCreate);
