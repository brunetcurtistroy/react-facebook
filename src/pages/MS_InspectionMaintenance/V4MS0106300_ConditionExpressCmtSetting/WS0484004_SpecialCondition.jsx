import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, } from "antd";

class WS0484004_SpecialCondition extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '特殊条件';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="special-condition">
        <Card title="特殊条件">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="コース条件[OR]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コース条件[NOT]"
            >
              <Input type="text" />
            </Form.Item>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0484004_SpecialCondition);
