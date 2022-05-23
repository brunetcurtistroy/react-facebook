import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, } from "antd";

class WS1442001_ContractDisplay extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '*  契約表示';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="contract-display">
        <Card title="*  契約表示">
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
              label="ＩＤ"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M1EX.漢字氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M1EX.カナ氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="性別"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="名称[続柄]_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M1EX.生年月日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="年齢"
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
              label="M3.管掌名（漢字）"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.利用券整理番号"
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
              label="QR.交付年月日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="QR.有効期限"
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
              label="QR.その他.ドック.保険者負担上限額"
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
              label="D02.契約年度"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="D02.契約連番"
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
              label="M01.動機付け単価"
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
              label=""
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
              label="M01.積極的単価"
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
              label="M01.積極的金額・％02"
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
              label="M01.積極定支援実施ポイント"
            >
              <Input type="text" />
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
              <Button type="primary"></Button>
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
              <Button type="primary"></Button>
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
              <Button type="primary"></Button>
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
              <Button type="primary"></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1442001_ContractDisplay);
