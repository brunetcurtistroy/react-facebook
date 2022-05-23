import React from "react";
import { connect } from "react-redux";

import { Card, } from "antd";


class WS2655106_ResultConfirm extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '結果確認';

    this.state = {
    };
  }

  render() {
    return (
      <div className="result-confirm">
        <Card title="結果確認">

        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2655106_ResultConfirm);
