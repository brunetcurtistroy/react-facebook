import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, } from "antd";

class WS1226012_MedicalExamResultCorrect extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '健診結果訂正';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="medical-exam-result-correct">
        <Card title="健診結果訂正">
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
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="LDL"
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
              label="nonHDL"
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
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="クレアチニン可視"
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
              label="FD2.γ－ＧＰＴ[2]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.γ－ＧＰＴ[2]・検査値"
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
              label="クレアチニン対象者"
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
              label="クレアチニン実施理由"
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
              label="eGFR"
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
              label="eGFR対象者"
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
              label="ベセスダ"
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
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.Ｘ線実施"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.Ｘ線所見"
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
              label="WM"
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
              label="改変Davis"
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
              label="FD2.空腹時血糖[2]－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.空腹時血糖[2]－検査値"
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
              label="FD2.ＨＢｓ抗原指導区分"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.ＨＢｓ抗原－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.ＨＢｓ抗原－検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.空腹時血糖[3]－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.空腹時血糖[3]－検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.空腹時血糖[4]－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.空腹時血糖[4]－検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="眼底対象者"
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
              label="FD2.ＨＣＶ指導区分_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.ＨＣＶ抗体_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.ＨＣＶ－ＲＮＡ_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.隋腹時血糖[1]－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.隋腹時血糖[1]－検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.隋腹時血糖[2]－有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.隋腹時血糖[2]－検査値_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.貧血実施理由"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="問診13"
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
              label="FD2.隋腹時血糖[3]－有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.隋腹時血糖[3]－検査値_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.隋腹時血糖[4]－有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.隋腹時血糖[4]－検査値_0001"
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
              label="FD2.心電図所見有無"
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
              label="問診16"
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
              label="FD2.心電図実施理由_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.腹囲[実測]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.腹囲[実測]・検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.腹囲[自己]・有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.腹囲[自己]・検査値_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.腹囲[申告]・有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.腹囲[申告]・検査値_0001"
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
              label="情報提供"
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
              label="FD2.内臓脂肪・有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.内臓脂肪・検査値_0001"
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
              label="健康相談"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.既往歴.特記有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.既往歴.具体的な_0001"
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
              label="FD2.ＨＢＡ１Ｃ[2]－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.ＨＢＡ１Ｃ[2]－検査値"
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
              label="FD2.自覚症状.特記有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.自覚症状.具体的な_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="初回面談実施"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.ＨＢＡ１Ｃ[3]－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.ＨＢＡ１Ｃ[3]－検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.ＨＢＡ１Ｃ[4]－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.ＨＢＡ１Ｃ[4]－検査値"
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
              label="FD2.他覚症状.特記有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.他覚症状.具体的な_0001"
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
              label="FD2.尿糖[2]－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.尿糖[2]－検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.SCOTT－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.SCOTT－検査値"
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
              label="FD2.眼底所見_0001"
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
              label="FD2.眼底実施理由_0001"
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
              label="FD2.メタボ判定"
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
              label="FD2.保健指導レベル_0001"
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
              label="FD2.尿蛋白[2]－有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.尿蛋白[2]－検査値"
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
              label="FD2.医師の診断_0001"
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
              label="FD2.医師の氏名_0001"
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
              label="FD2.最高血圧[2]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.最高血圧[2]・検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.最高血圧[3]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.最高血圧[3]・検査値"
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
              label="FD2.最低血圧[2]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.最低血圧[2]・検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.最低血圧[3]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.最低血圧[3]・検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.血圧服薬_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.血圧薬剤_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.血圧服薬理由_0001"
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
              label="FD2.採血時間(食後）"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.血糖服薬_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.血糖薬剤_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.血糖服薬理由_0001"
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
              label="FD2.脂質服薬_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.脂質薬剤_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.脂質服薬理由_0001"
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
              label="FD2.中性脂肪[2]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.中性脂肪[2]・検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.中性脂肪[3]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.中性脂肪[3]・検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.質問4-22_0001"
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
              label="FD2.HDLコレステロール[2]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.HDLコレステロール[2]・検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.HDLコレステロール[3]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.HDLコレステロール[3]・検査値"
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
              label="FD2.LDLコレステロール[1]・有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.LDLコレステロール[1]・検査値"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.LDLコレステロール[2]・有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.LDLコレステロール[2]・検査値_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.LDLコレステロール[3]・有無_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="FD2.LDLコレステロール[3]・検査値_0001"
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1226012_MedicalExamResultCorrect);
