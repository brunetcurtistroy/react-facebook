import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Table, } from "antd";

class WS0415001_MasterListOutputLeadershipMatter extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力[指導事項]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="master-list-output-leadership-matter">
        <Card title="マスタ一覧出力[指導事項]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="検索キーワード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="指導内容キーワード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="識別コード"
            >
              <Select>
                <Select.Option value=""></Select.Option>
                <Select.Option value="">注意事項</Select.Option>
                <Select.Option value="">指導事項</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="カテゴリコード"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="コメントコード" dataIndex="" key="" />
            <Table.Column title="検索キー" dataIndex="" key="" />
            <Table.Column title="コメント内容" dataIndex="" key="" />
            <Table.Column title="優先度" dataIndex="" key="" />
            <Table.Column title="コメント群" dataIndex="" key="" />
            <Table.Column title="使用回数" dataIndex="" key="" />
            <Table.Column title="最終使用日" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0415001_MasterListOutputLeadershipMatter);
