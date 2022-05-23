import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, } from "antd";

class WS1485016_HistorySelect extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '履歴選択';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="history-select">
        <Card title="履歴選択">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1485016_HistorySelect);
