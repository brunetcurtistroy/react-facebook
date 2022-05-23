import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Button, Space, Row, Col, Modal } from "antd";
import WS0435012_PreviewConfirm from "pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS0435012_PreviewConfirm";
import WS0888026_IntroduceLetterSubjectCmtInquiry from "../V4SK0003000_IntroduceLetterExtract/WS0888026_IntroduceLetterSubjectCmtInquiry";

class WS0924001_IntroduceLetterTargetCmtList extends React.Component {

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '紹介状対象コメント一覧';

    this.state = {
      loading: false,
      childModal: {
        width: 0,
        visible: false,
        component: null
      }
    };
  }

  componentDidMount() {
    this.setFormValue('fieldName', [])
  }

  setFormValue = (namePath, value) => {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      }
    ])
  }

  componentWillUnmount() {
    if (this.props.onFinishScreen) {

      this.props.onFinishScreen({
        // pass value

      })
    }
  }

  onPreviewConfirm = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0435012_PreviewConfirm
            Lio_Preview={''}
            Lo_StsOutput={''}
            onFinishScreen={(output) => {
              this.setDataOutput(output)
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  IntroduceLetterSubjectCmtInqui = (value) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0888026_IntroduceLetterSubjectCmtInquiry
            Lo_CmtCode={value}
            onFinishScreen={(output) => {
              this.setDataOutput(output)
              this.closeModal()
            }}
          />
        ),
      }
    })
  }

  setDataOutput = (output) => {
    console.log(output)
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.childModal,
        visible: false,
      }
    })
  }

  onFinish(values) {
    console.log(values);
  }
  
  render() {
    return (
      <div className="introduce-letter-target-cmt-list">
        <Card title="紹介状対象コメント一覧">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Space direction="vertical" align="end">
              <Row>
                <Col span={24}>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="CmtCodeF"
                        // label="コメントコード[FROM]"
                        label="コメントコード"
                        labelCol={{ span: 10 }}
                      >
                        <Input.Search type="number" onSearch={this.IntroduceLetterSubjectCmtInqui} />
                      </Form.Item>
                    </Col>
                    <Col span={4} align="center">
                      ~
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        name="CmtCodeT"
                      // label="コメントコード[TO]"
                      // labelCol={{ span: 12}}
                      >
                        <Input.Search type="number" onSearch={this.IntroduceLetterSubjectCmtInqui} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="OutputDivision"
                    label="出力区分"
                    labelCol={{ span: 5 }}
                  >
                    <Select defaultValue={'0:対象検査なし'} onChange={(value) => this.setFormValue('OutputDivision', value)}>
                      <Select.Option value="0">0:対象検査なし</Select.Option>
                      <Select.Option value="1">1:対象検査あり</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" onClick={this.onPreviewConfirm}>印　刷</Button>
              </Form.Item>
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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0924001_IntroduceLetterTargetCmtList);
