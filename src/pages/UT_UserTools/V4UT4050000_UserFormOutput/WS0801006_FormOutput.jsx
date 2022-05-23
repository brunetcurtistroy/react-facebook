import React from "react";
import { connect } from "react-redux";

import { Card, } from "antd";


class WS0801006_FormOutput extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '帳票出力';

    this.state = {
    };
  }

  render() {
    return (
      <div className="form-output">
        <Card title="帳票出力">

        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0801006_FormOutput);
