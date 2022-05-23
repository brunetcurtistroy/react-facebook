import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Table, } from "antd";

class WS0412001_MasterListOutputSiteInfo extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力[部位情報]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="master-list-output-site-info">
        <Card title="マスタ一覧出力[部位情報]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="部位コード[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="部位コード[T]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="部位分類"
            >
              <Select>
                <Select.Option value="">\</Select.Option>

              </Select>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="部位分類コード" dataIndex="" key="" />
            <Table.Column title="部位分類名称" dataIndex="" key="" />
            <Table.Column title="部位コード" dataIndex="" key="" />
            <Table.Column title="部位名称" dataIndex="" key="" />
            <Table.Column title="検索略名" dataIndex="" key="" />
            <Table.Column title="部位アドレス" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0412001_MasterListOutputSiteInfo);
