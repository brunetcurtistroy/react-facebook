import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Table, } from "antd";

class WS0605164_ContractLineItemDisplay extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '契約明細照会';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="contract-line-item-display">
        <Card title="契約明細照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="健診コース"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約内容[正式]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コース条件[その他]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="年齢タイトル"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="他団体コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="消費税"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="独自コースラベル枚数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="合計[他団体]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="合計[個人1]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="合計[個人2]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="合計[個人3]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="消費税[事業所]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="消費税[他団体]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="消費税[個人1]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="消費税[個人2]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="消費税[個人3]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="名称" dataIndex="" key="" />
            <Table.Column title="タイプ" dataIndex="" key="" />
            <Table.Column title="確認" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="セット情報" dataIndex="" key="" />
            <Table.Column title="保険者" dataIndex="" key="" />
            <Table.Column title="事業所" dataIndex="" key="" />
            <Table.Column title="他団体" dataIndex="" key="" />
            <Table.Column title="個人" dataIndex="" key="" />
            <Table.Column title="合計" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="セット情報" dataIndex="" key="" />
            <Table.Column title="保険者" dataIndex="" key="" />
            <Table.Column title="事業所" dataIndex="" key="" />
            <Table.Column title="他団体" dataIndex="" key="" />
            <Table.Column title="個人" dataIndex="" key="" />
            <Table.Column title="合計" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0605164_ContractLineItemDisplay);
