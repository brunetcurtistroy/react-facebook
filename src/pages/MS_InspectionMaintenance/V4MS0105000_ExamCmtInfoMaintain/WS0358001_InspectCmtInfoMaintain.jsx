import React from "react";
import { connect } from "react-redux";

import { Card, } from "antd";


class WS0358001_InspectCmtInfoMaintain extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '検査コメント情報保守';

    this.state = {
    };
  }

  render() {
    return (
      <div className="inspect-cmt-info-maintain">
        <Card title="検査コメント情報保守">

        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0358001_InspectCmtInfoMaintain);
