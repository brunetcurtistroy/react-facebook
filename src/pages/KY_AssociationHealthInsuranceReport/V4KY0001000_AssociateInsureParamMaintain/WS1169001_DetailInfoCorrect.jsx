import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Radio, Table, } from "antd";

class WS1169001_DetailInfoCorrect extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'V4-VNS06910:   明細情報(修正)';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="detail-info-correct">
        <Card title="V4-VNS06910:   明細情報(修正)">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="FORMAT"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="日付[F][文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="日付[T][文字]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="一般"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="子宮"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="胸"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="胸直・間・未"
            >
              <Radio.Group>
                <Radio value="">直接</Radio>
                <Radio value="">間接</Radio>
                <Radio value="">未実施</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
              name=""
              label="胃"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="胃直・間・未"
            >
              <Radio.Group>
                <Radio value="">直接</Radio>
                <Radio value="">間接</Radio>
                <Radio value="">未実施</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[マンモ]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="マンモ内容"
            >
              <Radio.Group>
                <Radio value="">全て</Radio>
                <Radio value="">1方向</Radio>
                <Radio value="">2方向</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[胃カメラ]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[肝炎RNA]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="付加"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="肝炎"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="眼底"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[肝炎Hbs]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[子宮がん]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[肝炎HCV]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="受診日" dataIndex="" key="" />
            <Table.Column title="受付No" dataIndex="" key="" />
            <Table.Column title="漢字氏名" dataIndex="" key="" />
            <Table.Column title="受診コース" dataIndex="" key="" />
            <Table.Column title="一　般" dataIndex="" key="" />
            <Table.Column title="付　加" dataIndex="" key="" />
            <Table.Column title="子　宮" dataIndex="" key="" />
            <Table.Column title="肝　炎" dataIndex="" key="" />
            <Table.Column title="胸　部" dataIndex="" key="" />
            <Table.Column title="胃　部" dataIndex="" key="" />
            <Table.Column title="乳子宮" dataIndex="" key="" />
            <Table.Column title="子　宮" dataIndex="" key="" />
            <Table.Column title="胃内視" dataIndex="" key="" />
            <Table.Column title="マンモ" dataIndex="" key="" />
            <Table.Column title="眼　底" dataIndex="" key="" />
            <Table.Column title="実付加" dataIndex="" key="" />
            <Table.Column title="肝ＲＮ" dataIndex="" key="" />
            <Table.Column title="肝Ｈｂ" dataIndex="" key="" />
            <Table.Column title="肝ＨＣ" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1169001_DetailInfoCorrect);
