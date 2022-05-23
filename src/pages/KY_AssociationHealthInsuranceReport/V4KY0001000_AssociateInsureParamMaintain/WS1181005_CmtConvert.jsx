import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, } from "antd";

class WS1181005_CmtConvert extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'コメント変換';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="cmt-convert">
        <Card title="コメント変換">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="検査コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="検査名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">実行</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="結果" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1181005_CmtConvert);
