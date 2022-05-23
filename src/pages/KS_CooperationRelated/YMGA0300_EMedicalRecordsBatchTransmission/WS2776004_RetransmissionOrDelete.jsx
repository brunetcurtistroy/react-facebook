import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Button, message } from "antd";
import RetransmissionOrDeleteAction from "redux/CooperationRelated/EMedicalRecordsBatchTransmission/RetransmissionOrDelete.action";

class WS2776004_RetransmissionOrDelete extends React.Component {
  static propTypes = {
    Li_id: PropTypes.any,
    section_number: PropTypes.any,
    exam_number: PropTypes.any,
    Li_Delete: PropTypes.any,
    TransmissionMethod: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '再送・削除';

    this.state = {
    };
  }

  onTransmiss() {
    // let params = {
    //   section_number: this.props.section_number ? this.props.section_number : '',
    //   exam_number: this.props.exam_number ? this.props.exam_number : '',
    //   Li_Delete: this.props.Li_Delete,
    //   TransmissionMethod: this.props.TransmissionMethod,
    // }
    // RetransmissionOrDeleteAction.btnTranmiss(params)
    //   .then((res) => {
    //     if (this.props.onFinishScreen) {
    //       this.props.onFinishScreen({});
    //     }
    //   })
    //   .catch((err) => {
    //     const res = err.response;
    //     if (!res || !res.data || !res.data.message) {
    //       message.error("エラーが発生しました");
    //       return;
    //     }
    //     message.error(res.data.message);
    //   });

    if (this.props.TransmissionMethod === 0) {
      if (this.props.Li_Delete === 0) {
        this.transmissInspectResend()
      } else {
        this.transmissInspectDelete()
      }
    } else {
      if (this.props.Li_Delete === 0) {
        this.transmissImageResend()
      } else {
        this.transmissImageDelete()
      }
    }
  }

  transmissInspectResend() {
    let params = {
      id: this.props.Li_id,
    }
    RetransmissionOrDeleteAction.transmissInspectResend(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({});
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

  transmissInspectDelete() {
    let params = {
      id: this.props.Li_id,
    }
    RetransmissionOrDeleteAction.transmissInspectDelete(params)
      .then((res) => {
        message.success('正常に削除されました')
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({});
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

  transmissImageResend() {
    let params = {
      id: this.props.Li_id,
    }
    RetransmissionOrDeleteAction.transmissImageResend(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({});
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

  transmissImageDelete() {
    let params = {
      id: this.props.Li_id,
    }
    RetransmissionOrDeleteAction.transmissImageDelete(params)
      .then((res) => {
        message.success('正常に削除されました')
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({});
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

  render() {
    return (
      <div className="retransmission-or-delete">
        <Card title="再送・削除">
          <div>
            <p>このオーダーを　「{<label style={{ color: 'red' }}>{this.props.Li_Delete === 1 ? '削除' : '修正'}</label>}」　送信します</p>
          </div>
          <Button type='primary' style={{ float: 'right' }}
            onClick={() => this.onTransmiss()}
          >送信</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2776004_RetransmissionOrDelete);
