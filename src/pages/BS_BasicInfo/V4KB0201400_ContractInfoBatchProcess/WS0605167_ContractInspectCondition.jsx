import React from "react";
import { connect } from "react-redux";

import { Card, Form} from "antd";

class WS0605167_ContractInspectCondition extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '契約検査条件';

    this.state = {};
  }

  render() {
    return (
      <div className="contract-inspect-condition">
        <Card title="契約検査条件">
          <Form ref={this.formRef} >
            
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0605167_ContractInspectCondition);
