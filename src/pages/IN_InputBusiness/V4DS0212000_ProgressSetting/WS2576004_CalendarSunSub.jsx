import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, } from "antd";

class WS2576004_CalendarSunSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'カレンダー[日]SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="calendar-sun-sub">
        <Card title="カレンダー[日]SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2576004_CalendarSunSub);
