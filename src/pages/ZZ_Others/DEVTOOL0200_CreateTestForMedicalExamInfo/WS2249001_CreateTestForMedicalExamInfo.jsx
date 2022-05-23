import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Table, } from "antd";

class WS2249001_CreateTestForMedicalExamInfo extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'テスト用受診情報作成';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="create-test-for-medical-exam-info">
        <Card title="テスト用受診情報作成">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="受診日[F][文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日[T][文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="個人番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="事業所コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="事業所名（漢字＼0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コースコード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コース名称(正式)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="状況フラグ[範囲]"
            >
              <Select>
                <Select.Option value="">全て</Select.Option>
                <Select.Option value="">予約</Select.Option>
                <Select.Option value="">受付</Select.Option>
                <Select.Option value="">保留</Select.Option>
                <Select.Option value="">待ち</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary"></Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="受診日" dataIndex="" key="" />
            <Table.Column title="受付No" dataIndex="" key="" />
            <Table.Column title="状態" dataIndex="" key="" />
            <Table.Column title="個人番号" dataIndex="" key="" />
            <Table.Column title="氏名" dataIndex="" key="" />
            <Table.Column title="生年月日" dataIndex="" key="" />
            <Table.Column title="性別" dataIndex="" key="" />
            <Table.Column title="契約" dataIndex="" key="" />
            <Table.Column title="事業所" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2249001_CreateTestForMedicalExamInfo);
