import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Checkbox, Button, } from "antd";

class WS2657078_VouchersInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '利用券入力';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="vouchers-input">
        <Card title="利用券入力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="QR.VERSION"
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
              label="QR.受診券整理番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="交付年月日(文字)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.積極定支援実施ポイント"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.受診券整理番号　○_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約機関.全衛連.代行機"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.動機付け単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.カナ氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約機関.結核予.代行機"
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
              label="動機付金額・％04"
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
              label="M01.動機付け金額・％01"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約機関.人間ド.代行機"
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
              label="QR.契約機関.予防医.代行機"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.動機付け金額・％02"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="生年月日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約機関.健診医.代行機"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.積極的単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="有効期限(文字)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約機関.日病会.代行機"
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
              label="M01.積極的金額・％01"
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
              label="積極的金額・％04"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約機関.東京都.代行機"
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
              label="M01.積極的金額・％02"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="特定健診.基本.負担内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.特定保健.保険者負担上限額"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.保険者名"
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
              label="M01.積極的金額・％03"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.保険者所在地"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.保険者番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.保険者電話番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約機関.その他.代行機"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約取りまとめ機関区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.契約名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約取りまとめ機関名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.契約機関.区分１"
            >
              <Select>
                <Select.Option value="">国保ベース</Select.Option>
                <Select.Option value="">国保ベース+契約取りまとめ機関</Select.Option>
                <Select.Option value="">国保ベース+契約取りまとめ機関+個別契約</Select.Option>
                <Select.Option value="">契約とりまとめ機関</Select.Option>
                <Select.Option value="">契約とりまとめ機関+個別契約</Select.Option>
                <Select.Option value="">個別契約のみ</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="全衛連"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="結核予"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="STS[人間ド]"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="QR.性別"
            >
              <Select>
                <Select.Option value="">男</Select.Option>
                <Select.Option value="">女</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="予防医"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="QR.生年月日[元号]"
            >
              <Select>
                <Select.Option value="">明治</Select.Option>
                <Select.Option value="">大正</Select.Option>
                <Select.Option value="">昭和</Select.Option>
                <Select.Option value="">平成</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="健診医"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="日病会"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="QR.保健指導区分"
            >
              <Select>
                <Select.Option value="">動機付支援</Select.Option>
                <Select.Option value="">積極的支援</Select.Option>
                <Select.Option value="">動機付相当</Select.Option>
                <Select.Option value="">モデル実施</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="東京都"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name=""
              label="QR.特定保健.負担区分"
            >
              <Select>
                <Select.Option value=""></Select.Option>
                <Select.Option value="">負担なし</Select.Option>
                <Select.Option value="">定額負担</Select.Option>
                <Select.Option value="">定率負担</Select.Option>
                <Select.Option value="">保険者上限負担</Select.Option>
                <Select.Option value="">定率負担(上限以下)</Select.Option>
                <Select.Option value="">定額負担(上限以下)</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="その他.受診可否(画面)"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">契約選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2657078_VouchersInput);
