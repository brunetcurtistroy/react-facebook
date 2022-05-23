import React from "react";
import { connect } from "react-redux";

import { Card, Form, Select, Button, } from "antd";

class WS2290003_JudgeUnitList extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '判定・単位一覧表';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="judge-unit-list">
        <Card title="判定・単位一覧表">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="判定レベル"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="パターン"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2290003_JudgeUnitList);
