import React from "react";
import { connect } from "react-redux";

import { Card, Checkbox, Button, Row, Col, Space } from "antd";
import SendingConfirmAction from "redux/CooperationRelated/EMedicalRecordsBatchTransmission/SendingConfirm.action";

class WS2766004_SendingConfirm extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '送信確認';

    this.state = {
      checkDoublick: false,
      StsRetransmission: 0
    };
  }

  onTransmiss() {
    let params = {
      Lio_StsRetransmission: this.state.StsRetransmission
    }

    SendingConfirmAction.onTransmiss(params)
    .then ((res) => {
      if (this.props.onFinishScreen) {
        this.props.onFinishScreen({
          Lio_StsRetransmission: this.state.StsRetransmission,
          Lo_StsSend: 1
        });
      }
    })
  }

  render() {
    return (
      <div className="sending-confirm">
        <Card title="送信確認"
          onDoubleClick={() => {
            this.setState({
              checkDoublick: true
            })
          }}>
          <div style={{marginBottom: 50}}>
            <p>送信処理を行いますか?</p>
          </div>
          <Row>
            <Col span={6} style={{alignSelf: 'center'}}>
              <div style={{ display: this.state.checkDoublick ? '' : 'none' }}>
                <Checkbox checked={this.state.StsRetransmission === 0 ? true : false}
                  onChange={(event) => this.setState({ StsRetransmission: event.target.checked ? 1 : 0 })}>
                  <span style={{ color: '#106dc3', fontWeight: "bold" }}>強制</span>
                </Checkbox>
              </div>
            </Col>
            <Col span={18} style={{ textAlign: 'right' }}>
              <Space>
                <Button type="primary"
                  onClick={() => {
                    this.onTransmiss()
                  }}
                >送信</Button>
                <Button type="primary"
                  onClick={() => {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({
                        Lo_StsSend: 0
                      });
                    }
                  }}
                >ｷｬﾝｾﾙ</Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2766004_SendingConfirm);
