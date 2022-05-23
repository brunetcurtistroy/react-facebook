import React from "react";
import { connect } from "react-redux";

import { Card, Form, Radio, Button, } from "antd";

class WS1518007_SelectSubject extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '選択対象';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="select-subject">
        <Card title="選択対象">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="選択方法"
            >
              <Radio.Group>
                <Radio value="">初期</Radio>
                <Radio value="">全て</Radio>
                <Radio value="">選択なし</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">実行</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1518007_SelectSubject);
