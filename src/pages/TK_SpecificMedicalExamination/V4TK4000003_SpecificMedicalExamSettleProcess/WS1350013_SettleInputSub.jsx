import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Select, Checkbox, } from "antd";

class WS1350013_SettleInputSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '決済入力SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="settle-input-sub">
        <Card title="決済入力SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="受診日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="D02.契約年度"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.契約番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="個人番号_ID"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="漢字氏名"
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
              label="D02.保険者番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者名（漢字）"
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
              label="QR.特定健診.基本.負担内容"
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
              label="QR.特定健診.詳細.負担内容"
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
              label="基本健診単価"
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
              label="貧血健診単価"
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
              label="QR.その他.追加.負担内容"
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
              label="心電健診単価"
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
              label="QR.その他.ドック.負担内容"
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
              label="眼底健診単価"
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
              label="QR.その他.ドック.保険者負担上限額"
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
              label="M01.追加健診名01"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価01"
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
              label="M01.同時実施健診名称01"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価01"
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
              label="M01.追加健診名02"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価02"
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
              label="M01.同時実施健診名称02"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価02"
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
              label="判定[H]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価03"
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
              label="M01.同時実施健診名称03"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価03"
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
              label="M01.追加健診名03"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価04"
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
              label="M01.同時実施健診名称04"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価04"
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
              label="M01.追加健診名05"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価05"
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
              label="M01.同時実施健診名称05"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価05"
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
              label="M01.追加健診名06"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価06"
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
              label="M01.同時実施健診名称06"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価06"
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
              label="M01.追加健診名07"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価07"
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
              label="M01.同時実施健診名称07"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価07"
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
              label="M01.追加健診名08_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価08_0001"
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
              label="M01.同時実施健診名称08_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価08_0001"
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
              label="M01.追加健診名09_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価09_0001"
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
              label="M01.同時実施健診名称09_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="D03.日付_0001"
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
              label="M01.追加健診名10_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診単価10_0001"
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
              label="M01.同時実施健診名称10_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価10_0001"
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
            >
              <Button type="primary"></Button>
            </Form.Item>
            <Form.Item
              name=""
              label="請求区分"
            >
              <Select>
                <Select.Option value="">請求なし</Select.Option>
                <Select.Option value="">特定健診と追加検査</Select.Option>
                <Select.Option value="">人間ドック</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="基本的な健診項目"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="詳細な健診.貧血検査"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="区分.貧血検査"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="詳細な健診.心電図検査"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="区分.心電図検査"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="詳細な健診.眼底検査"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="区分.眼底検査"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="【H30】詳細な健診.クレアチニン"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="【H30】区分.クレアチニン検査"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目01"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診01"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目02"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診02"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目03"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診03"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目04"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診04"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目05"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診05"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目06"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診06"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目07"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診07"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目08_0001"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診08_0001"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目09_0001"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診09_0001"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="追加健診項目10_0001"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="同時実施健診10_0001"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1350013_SettleInputSub);
