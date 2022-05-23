import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, } from "antd";

class WS0411001_MasterListOutputCategoryInfo extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力[カテゴリ情報]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="master-list-output-category-info">
        <Card title="マスタ一覧出力[カテゴリ情報]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="カテゴリコード[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="カテゴリコード[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">閉じる</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">検索</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">出力</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="カテゴリコード" dataIndex="" key="" />
            <Table.Column title="カテゴリ名称" dataIndex="" key="" />
            <Table.Column title="部位分類コード" dataIndex="" key="" />
            <Table.Column title="部位分類名称" dataIndex="" key="" />
            <Table.Column title="共通カテゴリコード" dataIndex="" key="" />
            <Table.Column title="検査区分" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0411001_MasterListOutputCategoryInfo);
