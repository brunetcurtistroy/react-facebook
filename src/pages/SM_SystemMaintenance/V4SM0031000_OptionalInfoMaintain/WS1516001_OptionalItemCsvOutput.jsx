import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, } from "antd";

class WS1516001_OptionalItemCsvOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'オプションアイテムCSV出力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="optional-item-csv-output">
        <Card title="オプションアイテムCSV出力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="出力先"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">出力</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="オプションコード" dataIndex="" key="" />
            <Table.Column title="種別コード" dataIndex="" key="" />
            <Table.Column title="アイテム" dataIndex="" key="" />
            <Table.Column title="アイテムデータ" dataIndex="" key="" />
            <Table.Column title="アイテム制限" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1516001_OptionalItemCsvOutput);
