/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Row, Col, Button } from "antd";

import coppy from 'assets/img/coppy.png'
import print from 'assets/img/print.png'
const styleImg = {
  marginBottom: '0.5em',
  width: '50px'
}
class WS0435012_PreviewConfirm extends React.Component {
  static propTypes = {
    Lio_Preview: PropTypes.any,
    Lo_StsOutput: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'プレビュー確認';

    this.state = {
    };
  }

  render() {
    return (
      <div className="preview-confirm">
        <Card title="プレビュー確認" className="mt-3">
          <Row>
            <Col span={11} style={{ textAlign: 'right' }}>
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', cursor: 'pointer' }} className="hv"
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lio_Preview: false,
                      Lo_StsOutput: true,
                    })
                  }
                }}>
                <img src={print} style={styleImg} /><br />
                <Button >&emsp;&ensp;印刷&emsp;&ensp;</Button>
              </div>
            </Col>
            <Col span={1}>
            </Col>
            <Col span={11} >
              <div style={{ textAlign: 'center', border: '1px solid #14468C', padding: '0.5em', cursor: 'pointer' }} className="hv"
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lio_Preview: true,
                      Lo_StsOutput: true,
                    })
                  }
                }}>
                <img src={coppy} style={styleImg} /><br />
                <Button  >プレビュー</Button>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0435012_PreviewConfirm);
