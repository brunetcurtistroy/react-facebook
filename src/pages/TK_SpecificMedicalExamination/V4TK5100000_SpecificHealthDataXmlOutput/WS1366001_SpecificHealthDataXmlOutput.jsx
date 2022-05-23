import React from "react";
import { connect } from "react-redux";

import { Card, } from "antd";


class WS1366001_SpecificHealthDataXmlOutput extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-XML01010-02:特健データXML出力';

    this.state = {
    };
  }

  render() {
    return (
      <div className="specific-health-data-xml-output">
        <Card title="V4-XML01010-02:特健データXML出力">

        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1366001_SpecificHealthDataXmlOutput);
