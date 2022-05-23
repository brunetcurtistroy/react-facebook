import React from "react";
import { connect } from "react-redux";

import { Card, } from "antd";


class WS1366003_MemberList extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '該当者一覧';

    this.state = {
    };
  }

  render() {
    return (
      <div className="member-list">
        <Card title="該当者一覧">

        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1366003_MemberList);
