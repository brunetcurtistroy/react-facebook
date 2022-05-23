import React from "react";
import { connect } from "react-redux";

import { Card, Form, } from "antd";

class WS0450006_CharacterStringSearch extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '文字列検索';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="character-string-search">
        <Card title="文字列検索">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0450006_CharacterStringSearch);
