import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Table, } from "antd";

class WS0413001_MasterListOutputFindingInfo extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力[所見情報]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="master-list-output-finding-info">
        <Card title="マスタ一覧出力[所見情報]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="所見コード[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="所見コード[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="所見分類"
            >
              <Select>
                <Select.Option value="">\</Select.Option>

              </Select>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="所見分類" dataIndex="" key="" />
            <Table.Column title="部位分類名称" dataIndex="" key="" />
            <Table.Column title="所見コード" dataIndex="" key="" />
            <Table.Column title="検索略名 / 所見名称" dataIndex="" key="" />
            <Table.Column title="判定値" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0413001_MasterListOutputFindingInfo);
