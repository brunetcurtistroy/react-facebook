import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, } from "antd";

class WS1394001_AgreementInquirySub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '契約内容照会SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="agreement-inquiry-sub">
        <Card title="契約内容照会SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="M01.年度"
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
              label="契約形態"
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
              label="M01.契約取りまとめコード"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M03.名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M03.取りまとめ区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M04.名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.代表委託者名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.代表受託者名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.オプション_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受託業務[特定健診]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受託業務[動機付け支援]"
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
              label="M01.積極的単価_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.基本個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.基本集団健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="動機付け支払区分01"
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
              label="積極的支払区分01"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.積極的金額・％01_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.貧血個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.貧血集団健診単価"
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
              label="積極的支払区分02"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.積極的金額・％02_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.心電個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.心電集団健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="動機付け支払区分02"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.動機付け金額・％02_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="積極的支払区分03"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.積極的金額・％03_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.眼底個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.眼底集団健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.動機付け備考"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.積極的備考"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="【H30】クレアチニン個別健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="【H30】クレアチニン集団健診単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.積極定支援実施ポイント_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受託業務[追加健診01]"
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
              label="受託業務[追加健診02]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診名02_0001"
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
              label="受託業務[追加健診03]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診名03_0001"
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
              label="受託業務[追加健診04]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診名04_0001"
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
              label="受託業務[追加健診05]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.追加健診名05_0001"
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
              label="受託業務[追加健診06]"
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
              label="受託業務[追加健診07]"
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
              label="受託業務[追加健診05]"
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
              label="受託業務[追加健診06]"
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
              label="M01.同時実施健診名称09_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="M01.同時実施健診単価09_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受託業務[追加健診07]"
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1394001_AgreementInquirySub);
