import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, } from "antd";

class WS2669001_XmlErrorTargetList extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'XMLエラー対象者一覧';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="xml-error-target-list">
        <Card title="XMLエラー対象者一覧">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="検索"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="エラー人数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">再表示</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="受診日" dataIndex="" key="" />
            <Table.Column title="受付番号" dataIndex="" key="" />
            <Table.Column title="メモ" dataIndex="" key="" />
            <Table.Column title="氏  名" dataIndex="" key="" />
            <Table.Column title="エラー" dataIndex="" key="" />
            <Table.Column title="件数" dataIndex="" key="" />
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="エラー内容" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2669001_XmlErrorTargetList);
