import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Checkbox, Button, Row, Col, message, Input } from "antd";
import AutoJudgeAction from "redux/InputBusiness/ExamineeList/AutoJudge.action";
import WS0061015_CheckYesNoNo from "../V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import Modal from "antd/lib/modal/Modal";
import  ModalDraggable  from "components/Commons/ModalDraggable";

const styleLabel = {
  textAlign: 'center',
  color: 'red',
  fontWeight: 'bold',
  marginBottom: 10,
  padding: 15,
  border: '1px solid #6baff9'
}
class WS2635011_AutoJudge extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_DataSourceName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '自動判定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };

    this.onFinish = this.onFinish.bind(this)
  }


  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getScreenData();
    }
  }

  getScreenData() {
    let params = {
      Li_DataSourceName: this.props.Li_DataSourceName ? this.props.Li_DataSourceName : ''
    }

    AutoJudgeAction.getScreenData(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue(res?.data)
      })

      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  event_yes(values) {
    AutoJudgeAction.yes_event(values)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({})
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  onFinish(values) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component:
          <WS0061015_CheckYesNoNo
            Li_Message={'一覧に表示されている受診者の自動判定を行いますか？'}
            onFinishScreen={({ Lio_StsReturn }) => {
              if (Lio_StsReturn) {
                this.event_yes(values)
              }
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
      <div className="auto-judge">
        <Card title="自動判定">
          <div style={styleLabel}>
            <span>以下の受診者を一括で</span><br></br>
            <span>自動判定しますか？</span>
          </div>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{ padding: 15, border: '1px solid #6baff9', marginBottom: 20 }}>
              <div hidden>
                <Form.Item name="ComplexJudge">  <Input /> </Form.Item>
                <Form.Item name="OptionSys0000031">  <Input /> </Form.Item>
                <Form.Item name="ReplacementInstructions">  <Input /> </Form.Item>
              </div>

              <Form.Item name="StsUndeterminedOnly" valuePropName="checked"  >
                <Checkbox>未判定の検査のみ</Checkbox>
              </Form.Item>
              <Form.Item name="StsHierarchical" valuePropName="checked" >
                <Checkbox>階層化判定を実行</Checkbox>
              </Form.Item>
            </div>
            <Row gutter={24}>
              <Col span={12} style={{ float: "left" }}>
                <Form.Item>
                  <Button type="primary" htmlType='submit'>は　い</Button>
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Form.Item>
                  <Button type="primary"
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({})
                      }
                    }}
                  >いいえ</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2635011_AutoJudge);
