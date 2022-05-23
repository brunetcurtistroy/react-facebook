import React from "react";
import { connect } from "react-redux";

import { Card, Form, } from "antd";

class WS0417003_DetermineLevelSelect extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '判定レベル選択';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="determine-level-select">
        <Card title="判定レベル選択">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >

          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0417003_DetermineLevelSelect);
