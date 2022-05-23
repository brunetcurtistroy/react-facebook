import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, } from "antd";

class WS1444001_DunningInquiry extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '督促照会';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="dunning-inquiry">
        <Card title="督促照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="実施予定日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">新規督促</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">督促状</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="督促日" dataIndex="" key="" />
            <Table.Column title="方法" dataIndex="" key="" />

          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1444001_DunningInquiry);
