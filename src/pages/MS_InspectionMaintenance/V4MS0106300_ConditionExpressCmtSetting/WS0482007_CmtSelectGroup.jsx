import React from "react";
import { connect } from "react-redux";

import { Card, Form, Select } from "antd";

class WS0482007_CmtSelectGroup extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "コメント群選択";

    this.state = {};
  }

  onFinish(values) {}

  render() {
    return (
      <div className="cmt-select-group">
        <Card title="コメント群選択">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="Lio_CmtGroup">
              <Select style={{ width: "150px" }}>
                <Select.Option></Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0482007_CmtSelectGroup);
