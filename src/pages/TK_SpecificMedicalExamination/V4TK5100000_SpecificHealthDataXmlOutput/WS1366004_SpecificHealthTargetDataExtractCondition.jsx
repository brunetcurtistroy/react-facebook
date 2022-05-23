import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, } from "antd";

class WS1366004_SpecificHealthTargetDataExtractCondition extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '特定保健対象データ抽出条件確認';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="specific-health-target-data-extract-condition">
        <Card title="特定保健対象データ抽出条件確認">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
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
              label="出力帳票"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M40.オプション"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="健保・管掌[FROM]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者名(漢字)[管FROM"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="健保・管掌[TO]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者名(漢字)[管TO]"
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
              label="保険者番号[TO]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者名(漢字)[保TO]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="提出日(文字)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="作成日(文字)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="送信回数"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="代行機関名称"
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
              label="種別(画面)"
            >
              <Select>
                <Select.Option value="">1:代行機関</Select.Option>
                <Select.Option value="">6:保険者</Select.Option>
                <Select.Option value="">9:その他</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="決済情報作成(画面)"
            >
              <Select>
                <Select.Option value="">有</Select.Option>
                <Select.Option value="">無</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">いいえ</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">は　い</Button>
            </Form.Item>

          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1366004_SpecificHealthTargetDataExtractCondition);
