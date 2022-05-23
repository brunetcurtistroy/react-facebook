import React from "react";
import { connect } from "react-redux";

import { Card, } from "antd";


class WS2575001_CalendarMonthSub extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'カレンダー[月]SUB';

    this.state = {
    };
  }

  render() {
    return (
      <div className="calendar-month-sub">
        <Card title="カレンダー[月]SUB">

        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2575001_CalendarMonthSub);
