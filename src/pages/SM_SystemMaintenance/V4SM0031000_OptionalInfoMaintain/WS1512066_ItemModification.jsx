import React from "react";
import { connect } from "react-redux";

import { Card, } from "antd";


class WS1512066_ItemModification extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '項目修正';

    this.state = {
    };
  }

  render() {
    return (
      <div className="item-modification">
        <Card title="項目修正">

        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1512066_ItemModification);
