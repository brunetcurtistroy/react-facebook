/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Button, Row, Col, Space } from "antd";

import warning from 'assets/img/warning.png'

class WS0061009_CheckYesNoYes extends React.Component { 

  static propTypes = {
    Li_Title: PropTypes.any,
    Li_Message: PropTypes.any,
    Li_Provisions: PropTypes.any,
    Lio_StsReturn: PropTypes.any,
    Li_DisplayContent: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '確認[はい・いいえ]はい';

    this.state = {
    };
  } 
  
  onFinish(values) { }

  render() {
    return (
      <div className="check-yes-no-yes">
        <Card title={this.props.Li_Title ? this.props.Li_Title : "確認"}>
          <Row gutter={24} style={{ margin: '10px 3px' }}>
            <Col><img src={warning} /></Col>
            <Col style={{ width: 'calc(100% - 100px)' }}>
              <div>{this.props.Li_DisplayContent}</div>
            </Col>
          </Row> <br></br>
          <Space style={{ float: 'right' }}>
            <Button type="primary"
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lio_StsReturn: true,
                  })
                }
              }}
            >は　い</Button>
            <Button type="primary"
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lio_StsReturn: false,
                  })
                }
              }}>いいえ</Button>
          </Space>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0061009_CheckYesNoYes);
