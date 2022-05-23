import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Radio, Button, Table, } from "antd";

class WS2655001_SpecificHealthDataXmlOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '特健データXML出力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="specific-health-data-xml-output">
        <Card title="特健データXML出力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="カナ氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="送付先機関"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="代行機関名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号[FROM]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者名(漢字)[保FROM"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日[FROM](文字)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日[TO](文字)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="種別"
            >
              <Radio.Group>
                <Radio value="">代行機関</Radio>
                <Radio value="">保険者</Radio>
                <Radio value="">その他</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
              name=""
              label="決済情報作成"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="決済無受診券有"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
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
              <Button type="primary">XML</Button>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="受診日" dataIndex="" key="" />
            <Table.Column title="漢字氏名" dataIndex="" key="" />
            <Table.Column title="年齢" dataIndex="" key="" />
            <Table.Column title="代行機関" dataIndex="" key="" />
            <Table.Column title="保険者" dataIndex="" key="" />
            <Table.Column title="契約情報" dataIndex="" key="" />
            <Table.Column title="受診券" dataIndex="" key="" />
            <Table.Column title="決済" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2655001_SpecificHealthDataXmlOutput);
