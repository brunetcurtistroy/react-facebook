/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Checkbox, Button, Row, Col } from "antd";

import warning from 'assets/img/warning.png'
class WS0061002_ConfirmCheckYes extends React.Component {
  static propTypes = {
    Li_Title: PropTypes.any,
    Li_Message: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '確認[チェック有]';

    this.state = {
      StsConfirm: false
    };
  }

  render() {
    return (
      <div className="confirm-check-yes">
        <Card title="確認[チェック有]">
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
            <Button type="primary"
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lio_StsReturn: true,
                    StsConfirm: this.state.StsConfirm
                  })
                }
              }}>いいえ</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0061002_ConfirmCheckYes);
