import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Radio, Table, } from "antd";

class WS0606001_ContractQueryOld extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '契約照会(旧)';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="contract-query-old">
        <Card title="契約照会(旧)">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約団体コード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約開始日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約番号"
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
              label="健診コース"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約内容[略称]"
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
              label="コース条件[その他]"
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
              label="備考１"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="備考２"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="特記事項"
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
            <Form.Item
              name=""
              label="コース条件[年齢識別コード]"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="区分指定"
            >
              <Radio.Group>
                <Radio value="">全て</Radio>
                <Radio value="">基本契約</Radio>
                <Radio value="">オプション</Radio>
                <Radio value="">その他</Radio>

              </Radio.Group>
            </Form.Item>

          </Form>


          <Table>
            <Table.Column title="種　別" dataIndex="" key="" />
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="保険者" dataIndex="" key="" />
            <Table.Column title="事業所" dataIndex="" key="" />
            <Table.Column title="他団体" dataIndex="" key="" />
            <Table.Column title="個人1" dataIndex="" key="" />
            <Table.Column title="個人2" dataIndex="" key="" />
            <Table.Column title="個人3" dataIndex="" key="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0606001_ContractQueryOld);
