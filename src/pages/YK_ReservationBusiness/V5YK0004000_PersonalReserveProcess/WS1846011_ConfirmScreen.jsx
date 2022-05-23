import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Button, Row } from "antd";

class WS1846011_ConfirmScreen extends React.Component {
  static propTypes = {
    Li_StatusCode: PropTypes.any,
    Li_ResultContent: PropTypes.any,
    Li_ResultError: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '確認画面';

    this.state = {
    };
  }

  render() {
    return (
      <div className="confirm-screen">
        <Card title="確認画面">
          <Row style={{marginBottom: 20}}>
              <span style={{width: "20%"}}>{this.props? this.props.Li_StatusCode : ''}</span>
              <span style={{marginLeft: "15px"}}>{this.props? this.props.Li_ResultContent : ''}</span>
          </Row>
              <Button type="primary" style={{float: "right"}}
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                  });
                }
              }}
              >確認</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1846011_ConfirmScreen);
