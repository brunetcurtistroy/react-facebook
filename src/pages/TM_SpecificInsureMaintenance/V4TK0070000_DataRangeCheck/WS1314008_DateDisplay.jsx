import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, } from "antd";

class WS1314008_DateDisplay extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '日付表示';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="date-display">
        <Card title="日付表示">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
            >
              <Button type="primary">選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1314008_DateDisplay);
