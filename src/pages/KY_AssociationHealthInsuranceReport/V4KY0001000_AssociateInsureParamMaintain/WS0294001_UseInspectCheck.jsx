import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Table, } from "antd";

class WS0294001_UseInspectCheck extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '使用検査チェック';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="use-inspect-check">
        <Card title="使用検査チェック">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="カテゴリコード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="カテゴリ名称"
            >
              <Input type="text" />
            </Form.Item>
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
              name=""
              label="パターンコード"
            >
              <Select>
                <Select.Option value="">全て</Select.Option>

              </Select>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="パターンコード" dataIndex="" key="" />
            <Table.Column title="パターン名称" dataIndex="" key="" />
            <Table.Column title="カテゴリ" dataIndex="" key="" />
            <Table.Column title="カテゴリ名称" dataIndex="" key="" />
            <Table.Column title="検査コード" dataIndex="" key="" />
            <Table.Column title="検査略名" dataIndex="" key="" />
            <Table.Column title="検査名称" dataIndex="" key="" />
            <Table.Column title="結果コード" dataIndex="" key="" />
            <Table.Column title="外部名称" dataIndex="" key="" />
            <Table.Column title="依頼コード" dataIndex="" key="" />
            <Table.Column title="依頼名称" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0294001_UseInspectCheck);
