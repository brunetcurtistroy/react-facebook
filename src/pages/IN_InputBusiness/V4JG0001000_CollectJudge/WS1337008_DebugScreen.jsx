import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Row, Col, Space, } from "antd";
const styleDiv = {
  border: '1px solid #e3eaec',
  height: '32px',
  paddingTop: "0.2em",
  textAlign: 'center',
  background: '#CFD9FE',
  color:'#545C8F'
}
class WS1337008_DebugScreen extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'デバッグ画面';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="debug-screen">
        <Card title="デバッグ画面">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row>
              <Col span={3}>
                <Row>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <div style={styleDiv} >年齢</div>
                  </Col >
                  <Col span={12}>
                    <Form.Item name="P1Age" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                  </Col>
                </Row>
                <Row><Col span={24}><div style={styleDiv} > 腹囲</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > ＢＭＩ</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > 内臓</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > 最高</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > 最低</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > 血糖</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > HbA1c</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > 中性脂肪</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > HDL</div> </Col></Row>
                <Row><Col span={24}><div style={styleDiv} > 結果</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > 糖尿病</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > 高血圧</div></Col></Row>
                <Row><Col span={24}><div style={styleDiv} > 脂質異常</div></Col></Row>
              </Col>
              <Col span={10}>
                <div style={styleDiv}>メタボ</div>
                <Form.Item name="P1AbdominalCircumferencemetabol" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1_BmimetabolicSyndrome" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1ViscerametabolicSyndrome" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1HighestmetabolicSyndrome" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1LowestmetabolicSyndrome" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1BloodSugarmetabolicSyndrome" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1_Hba1CmetabolicSyndrome" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1NeutralFatmetabolicSyndrome" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1_HdlCholesterolmetabolicSyndr" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1ResultmetabolicSyndrome" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1Diabetesinterview" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1Hypertensioninterview" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1Dyslipidemiainterview" style={{ marginBottom: '0em' }}><Input /></Form.Item>
              </Col>
              <Col span={10}>
                <div style={styleDiv}>階層化</div>
                <Form.Item name="P1AbdominalCircumferencetiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1_Bmitiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1Visceratiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1Highesttiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1Lowesttiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1BloodSugartiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1_Hba1Ctiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1NeutralFattiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1_HdlCholesteroltiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Form.Item name="P1Resulttiering" style={{ marginBottom: '0em' }}><Input /></Form.Item>
                <Row>
                  <Col span={4}><div style={styleDiv}>喫煙歴</div> </Col>
                  <Col span={20}><Form.Item name="P1SmokingHistoryinterview" style={{ marginBottom: '0em' }}><Input /></Form.Item></Col>
                </Row>
                <Row>
                  <Col span={4}><div style={styleDiv}>年齢</div> </Col>
                  <Col span={20}><Form.Item name="P1Agetiering" style={{ marginBottom: '0em' }}><Input /></Form.Item></Col>
                </Row>
              </Col>
            </Row><br />
            <Row>
              <Col span={12}>
                <Row><Col span={24}><div style={styleDiv}>メタボ</div></Col></Row>
                <Row>
                  <Col span={4}><div style={styleDiv}>腹囲</div></Col>
                  <Col span={4}><Form.Item name="P1MetabolicSyndromeinspectResul" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>ＢＭＩ</div></Col>
                  <Col span={4}><Form.Item name="P1MetabolicSyndromeinspectResul" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>内臓</div></Col>
                  <Col span={4}><Form.Item name="P1MetabolicSyndromeinspectResul" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                </Row>
                <Row>
                  <Col span={4}><div style={styleDiv}>最高</div></Col>
                  <Col span={4}><Form.Item name="P1MetabolicSyndromeinspectResul" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>最低</div></Col>
                  <Col span={4}><Form.Item name="P1MetabolicSyndromeinspectResul" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>糖尿病</div></Col>
                  <Col span={4}><Form.Item name="P1QuestionInspectResultdiabetes" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                </Row>
                <Row>
                  <Col span={4}><div style={styleDiv}>血糖</div></Col>
                  <Col span={4}><Form.Item name="P1MetabolicSyndromeinspectResul" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>HbA1c</div></Col>
                  <Col span={4}><Form.Item name="P1MetabolicSyndromeinspectResul" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>高血圧</div></Col>
                  <Col span={4}><Form.Item name="P1QuestionInspectResulthyperten" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                </Row>
                <Row>
                  <Col span={4}><div style={styleDiv}>中性脂肪</div></Col>
                  <Col span={4}><Form.Item name="P1MetabolicSyndromeinspectResul" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>HDL</div></Col>
                  <Col span={4}><Form.Item name="P1MetabolicSyndromeinspectResul" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>脂質異常</div></Col>
                  <Col span={4}><Form.Item name="P1QuestionInspectResultdyslipid" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row><Col span={24}><div style={styleDiv}>階層化</div></Col></Row>
                <Row>
                  <Col span={4}><div style={styleDiv}>腹囲</div></Col>
                  <Col span={4}><Form.Item name="P1LayeredinspectResultabdominal" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>ＢＭＩ</div></Col>
                  <Col span={4}><Form.Item name="P1LayeredinspectResults_Bmi" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                  <Col span={4}><div style={styleDiv}>内臓</div></Col>
                  <Col span={4}><Form.Item name="P1LayeredinspectResultvisceralF" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                </Row>
                <Row >
                  <Col span={16}>
                    <Row>
                      <Col span={6}><div style={styleDiv}>最高</div></Col>
                      <Col span={6}><Form.Item name="P1LayeredinspectResultsystolicB" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                      <Col span={6}><div style={styleDiv}>最低</div></Col>
                      <Col span={6}><Form.Item name="P1LayeredinspectResultdiastolic" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                    </Row>
                    <Row>
                      <Col span={6}><div style={styleDiv}>血糖</div></Col>
                      <Col span={6}><Form.Item name="P1LayeredinspectResultfastingBl" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                      <Col span={6}><div style={styleDiv}>HbA1c</div></Col>
                      <Col span={6}><Form.Item name="P1LayeredinspectResults_Hba1C" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                    </Row>
                    <Row>
                      <Col span={6}><div style={styleDiv}>中性脂肪</div></Col>
                      <Col span={6}><Form.Item name="P1TieringinspectResultstriglyce" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                      <Col span={6}><div style={styleDiv}>HDL</div></Col>
                      <Col span={6}><Form.Item name="P1LayeredinspectResults_HdlChol" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                    </Row>
                  </Col>
                  <Col span={8} style={{ textAlign: 'center', marginTop: '0.5em', }}>
                    <Button type="primary" style={{ borderRadius: '2em' }} >&emsp;&emsp;&emsp;確認&emsp;&emsp;&emsp;</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: '0.5em' }}>
              <Col span={12}>
                <Row>
                  <Col span={7}><div style={styleDiv}>メタボ</div></Col>
                  <Col span={7}><div style={styleDiv}>階層化</div></Col>
                  <Col span={4} offset={2}><div style={styleDiv}>喫煙歴</div></Col>
                  <Col span={4}><Form.Item name="P1QuestionInspectResultsmokingH" style={{ marginBottom: '0em' }}><Input /></Form.Item> </Col>
                </Row>
                <Row>
                  <Col span={3}><div style={styleDiv}>STEP1</div></Col>
                  <Col span={2}><Form.Item name="Step1MetabolicSyndrome" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={2} offset={2}><Form.Item name="Step1Hierarchical" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                </Row>
                <Row>
                  <Col span={3}><div style={styleDiv}>STEP2</div></Col>
                  <Col span={2}><Form.Item name="Step2MetabolicSyndromeRiskCount" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={2} offset={2}><Form.Item name="Step2HierarchicalRiskCount" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={3} ><div style={styleDiv}>喫煙歴</div></Col>
                  <Col span={2} ><Form.Item name="Step2HierarchicalRiskCountsmoki" style={{ marginBottom: '0em' }}><Input style={{ width: '96%' }} /> </Form.Item></Col>
                  <Col span={3} ><div style={styleDiv} >服薬歴 </div> </Col>
                  <Col span={2} ><Form.Item name="Step2HierarchicalRiskCountmedic" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                </Row>
                <Row>
                  <Col span={3}><div style={styleDiv}>欠損血糖</div></Col>
                  <Col span={2}><Form.Item name="MetabolicSyndromeLackOfBloodSug" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={2} ><Form.Item name="MetabolicSyndromeLackOfBloodSug" style={{ marginBottom: '0em' }}><Input style={{ width: '90%' }} /> </Form.Item></Col>
                  <Col span={2} ><Form.Item name="HierarchicalLossBloodSugar" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={2} ><Form.Item name="LayeredDeficientGlycemic2" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                </Row>
                <Row>
                  <Col span={3}><div style={styleDiv}>欠損血圧</div></Col>
                  <Col span={2}><Form.Item name="MetabolicSyndromeLackOfBloodPre" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={2} ><Form.Item name="MetabolicSyndromeLackOfBloodPre" style={{ marginBottom: '0em' }}><Input style={{ width: '90%' }} /> </Form.Item></Col>
                  <Col span={2} ><Form.Item name="HierarchicalLossBloodPress" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={2} ><Form.Item name="LayeredDeficientBp2" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                </Row>
                <Row>
                  <Col span={3}><div style={styleDiv}>欠損脂質</div></Col>
                  <Col span={2}><Form.Item name="MetabolicSyndromeDeficiencyLipi" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={2} ><Form.Item name="MetabolicSyndromeLackOfLipid2" style={{ marginBottom: '0em' }}><Input style={{ width: '90%' }} /> </Form.Item></Col>
                  <Col span={2} ><Form.Item name="HierarchicalDeficiencyLipid" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={2} ><Form.Item name="HierarchicalDeficiencyLipid" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                </Row>
                <Row>
                  <Col span={3}><div style={styleDiv}>欠損服薬</div></Col>
                  <Col span={2}><Form.Item name="MetabolicSyndromeLackOfMedicati" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                  <Col span={2} offset={4} ><Form.Item name="HierarchicalLossMedication" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                </Row>
                <Row>
                  <Col span={3}><div style={styleDiv}>欠損喫煙</div></Col>
                  <Col span={2} offset={6} ><Form.Item name="HierarchicalLossSmoking" style={{ marginBottom: '0em' }}><Input /> </Form.Item></Col>
                </Row>
              </Col>
              <Col span={12}><br /><br />
                <Row >
                  <Col span={10} offset={2}>
                    <div style={styleDiv}>メタボ</div>
                    <Row>
                      <Col span={8}>
                        <div style={styleDiv}>判定</div>
                      </Col>
                      <Col span={16}>
                        <Form.Item name="P1MetabolicSyndromeJudgeResult" style={{ marginBottom: '0em' }}><Input /> </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={10} >
                    <div style={styleDiv}>階層化</div>
                    <Row>
                      <Col span={8}>
                        <div style={styleDiv}>判定</div>
                      </Col>
                      <Col span={16}>
                        <Form.Item name="P1HierarchicalJudgeResult" style={{ marginBottom: '0em' }}><Input /> </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1337008_DebugScreen);
