import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Checkbox, Button, Row, Col, message, Spin, Space } from "antd";
import SendingConfirmAction from 'redux/CooperationRelated/EMedicalRecordsSingleTransmission/SendingConfirm.actions'
class WS2767010_SendingConfirm extends React.Component {
  static propTypes = {
    Lio_StsRetransmission: PropTypes.any,
    Lo_StsSend: PropTypes.any,
    Lo_StsDay: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '送信確認';

    this.state = {
      loaddingFrm: false
    };
  }
  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      Lio_StsRetransmission: this.props.Lio_StsRetransmission
    })
    this.forceUpdate()
  }
  Transmiss() {
    this.setState({ loaddingFrm: true })
    let data = {
      Lio_StsRetransmission: this.formRef.current?.getFieldValue("Lio_StsRetransmission") ? 1 : 0,
      Lo_StsDay: this.formRef.current?.getFieldValue("Lo_StsDay") ? 1 : 0
    }
    SendingConfirmAction.Transmiss(data).then(res => {
      if (this.props.onFinishScreen) {
        this.props.onFinishScreen(res)
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ loaddingFrm: false }))

  }

  render() {
    return (
      <div className="sending-confirm">
        <Card title="送信確認">
          <Spin spinning={this.state.loaddingFrm} >
            <Form
              ref={this.formRef} autoComplete="off"
              initialValues={{
                Lo_StsDay: true
              }}
            >
              <div>
                <p>
                  送信処理を行いますか？
                </p>
              </div>
              <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={4}>
                  <Form.Item name="Lo_StsDay" label="当日" valuePropName="checked" >
                    <Checkbox></Checkbox>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="Lio_StsRetransmission" label="再送信" valuePropName="checked"  >
                    <Checkbox></Checkbox>
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Space style={{ float: 'right' }}>
                    <Form.Item>
                      <Button type="primary" onClick={() => this.Transmiss()} >送信</Button>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" onClick={() => {
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({
                            Lo_StsSend: 0
                          })
                        }
                      }} >キャンセル</Button>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2767010_SendingConfirm);
