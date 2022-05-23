import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, } from "antd";

class WS1314001_DataRangeCheck extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'V4-XML03001:データ範囲チェック';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="data-range-check">
        <Card title="V4-XML03001:データ範囲チェック">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="開始日[文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">表示</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="採用日" dataIndex="" key="" />
            <Table.Column title="項目コード" dataIndex="" key="" />
            <Table.Column title="結果識別" dataIndex="" key="" />
            <Table.Column title="入力最小値" dataIndex="" key="" />
            <Table.Column title="入力最大値" dataIndex="" key="" />
            <Table.Column title="文字入力最小値" dataIndex="" key="" />
            <Table.Column title="文字入力最大値" dataIndex="" key="" />
            <Table.Column title="オプション" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1314001_DataRangeCheck);
