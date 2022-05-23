/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Checkbox, Button, Row, Col, Space } from "antd";

import warning from 'assets/img/warning.png'
class WS0061003_ConfirmCheckYesYesNo extends React.Component {
  static propTypes = {
    Li_Title: PropTypes.any,
    Li_Message: PropTypes.any,
    Lio_StsReturn: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '確認[チェック有]はい・いいえ';

    this.state = {
      StsConfirm: false
    };
  }
  componentDidUpdate(prevProps) {
    if(this.props !== prevProps)
    this.setState({StsConfirm: false})
  }
  disabled = (input) => {return !input ? true : false;};
  render() {
    const title = this.props.Li_Title
    return (
      <div className="confirm-check-yes-yes-no">
        <Card title={title ? title : '確認[チェック有]はい・いいえ'}>
          <Button type="primary" style={{ width: '100%', cursor: 'text', marginBottom: '15px' }}>確 認 事 項</Button>
          <Row gutter={24} style={{ margin: '10px 3px' }}>
            <Col><img src={warning} /></Col>
            <Col style={{ width: 'calc(100% - 100px)' }}>
              <div>{this.props.Li_Message}</div>
            </Col>
          </Row> <br></br>
          <Row style={{ margin: '10px 3px' }}>
            <Checkbox checked={this.state.StsConfirm}
              onChange={(e) => this.setState({ StsConfirm: e.target.checked })}>
              内容を確認しました
            </Checkbox>
          </Row>
          <Row style={{ margin: '10px 3px', float: 'right' }}>
            <Space style={{ float: 'right' }}>
              <Button type="primary"
                disabled={this.disabled(this.state.StsConfirm)}
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lio_StsReturn: true,
                      StsConfirm: this.state.StsConfirm
                    })
                  }
                }}
              >は　い</Button>
              <Button type="primary"
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lio_StsReturn: false,
                      StsConfirm: this.state.StsConfirm
                    })
                  }
                }}
              >いいえ</Button>
            </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0061003_ConfirmCheckYesYesNo);
