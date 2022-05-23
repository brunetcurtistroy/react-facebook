import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Checkbox,
  Tabs,
  Row,
  Col,
  Space,
  DatePicker,
  Modal
} from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import WS1290001_InsurerNumberInquiry from 'pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1290001_InsurerNumberInquiry.jsx';
import WS1302001_AgencyInquirySub from 'pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1302001_AgencyInquirySub.jsx';
import WS1350013_SettleInputSub from "./WS1350013_SettleInputSub";

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const lgGrid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const styleLabel = {
  background: "#1264bd",
  padding: "5px",
  border: "1px solid #fff",
  color: "#fff",
  textAlign: "center",
};

const styleLabelOnly = {
  background: "#b8cada",
  padding: "5px",
  border: "1px solid #fff",
  textAlign: "center",
};
class WS1296010_ConsultTicketInputSub extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_Tab: PropTypes.any,
    Lio_DocketNum: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "受診券入力SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      disabledSpecificMedicalExambasicburdenC: true,
      disabledSpecificMedicalExamdetailsburde: true,
      disabledOtheraddburdenContent: true,
      disabledOtherdockburdenContent: true,
      disabledother_insurer_pay_max: true
    };
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish(values) {}

  render() {
    return (
      <div className="consult-ticket-input-sub">
        <Card title="受診券入力SUB">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Tabs type="card" defaultActiveKey="0">
              <Tabs.TabPane tab="受診券" key="0">
                <Row gutter={24}>
                  <Col span={12} style={{ borderRight: "1px solid #d9d9d9" }}>
                    <Form.Item
                      label="受診券番号"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="consult_ticket_docket_num">
                          <Input type="text" />
                        </Form.Item>
                        <Form.Item name="GrantDateChars" label="交付年月日">
                          <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <hr
                      style={{
                        borderBottom: "1px solid #d9d9d9",
                        margin: "20px  0",
                      }}
                    />
                    <Form.Item
                      label="カナ氏名"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="kana_name">
                          <Input type="text" />
                        </Form.Item>
                        <Form.Item>
                          <Button>nmnmn</Button>
                        </Form.Item>
                      </Space>
                    </Form.Item>

                    <Form.Item name="GenderScreen" label="性別" {...grid}>
                      <Select style={{width: '20%'}}>
                        <Select.Option value={1}>男</Select.Option>
                        <Select.Option value={2}>女</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="生年月日"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="DateOfBirthEraScreen">
                          <Select  style={{width: '100px'}}>
                            <Select.Option value={1}>明治</Select.Option>
                            <Select.Option value={2}>大正</Select.Option>
                            <Select.Option value={3}>昭和</Select.Option>
                            <Select.Option value={4}>平成</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="date_japanese_calendar">
                          <Input />
                        </Form.Item>
                      </Space>
                    </Form.Item>

                    <Form.Item
                      name="ExpirationDateChars"
                      label="有効期限"
                      {...grid}
                    >
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      name="MedicalExamContentClassifyScree"
                      label="健診内容"
                      {...grid}
                    >
                      <Select style={{width: '170px'}}>
                        <Select.Option value={1}>特定健診診査</Select.Option>
                        <Select.Option value={2}>その他</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="PresenceOfExamEmployerKenScreen"
                      label="その他"
                      {...grid}
                    >
                      <Select style={{width: '170px'}}>
                        <Select.Option value={1}>事業主健診を含む</Select.Option>
                        <Select.Option value={2}>被扶養者として受診</Select.Option>
                      </Select>
                    </Form.Item>
                    <hr
                      style={{
                        borderBottom: "1px solid #d9d9d9",
                        margin: "20px  0",
                      }}
                    />
                    <Form.Item
                      label="基本部分"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="BasicPartScreen">
                          <Select style={{width: '170px'}} 
                          onChange={(value) => {
                            this.setState({disabledSpecificMedicalExambasicburdenC: false})
                            if (value === 0 || value ===1) {
                              this.setState({disabledSpecificMedicalExambasicburdenC: true})
                            }
                          }}>
                            <Select.Option value={0}> </Select.Option>
                            <Select.Option value={1}>負担なし</Select.Option>
                            <Select.Option value={2}>定額負担</Select.Option>
                            <Select.Option value={3}>定率負担</Select.Option>
                            <Select.Option value={4}>保険者上限負担</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="SpecificMedicalExambasicburdenC">
                          <Input disabled={this.state.disabledSpecificMedicalExambasicburdenC}/>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label="詳細部分"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="DetailsOfScreen">
                          <Select style={{width: '170px'}}
                           onChange={(value) => {
                            this.setState({disabledSpecificMedicalExamdetailsburde: false})
                            if (value === 0 || value ===1) {
                              this.setState({disabledSpecificMedicalExamdetailsburde: true})
                            }
                          }}>
                            <Select.Option value={0}> </Select.Option>
                            <Select.Option value={1}>負担なし</Select.Option>
                            <Select.Option value={2}>定額負担</Select.Option>
                            <Select.Option value={3}>定率負担</Select.Option>
                            <Select.Option value={4}>保険者上限負担</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="SpecificMedicalExamdetailsburde" >
                          <Input disabled={this.state.disabledSpecificMedicalExamdetailsburde}/>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label="追加項目"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="AddItemsScreen">
                          <Select style={{width: '170px'}}
                          onChange={(value) => {
                            this.setState({disabledOtheraddburdenContent: false})
                            if (value === 0 || value ===1) {
                              this.setState({disabledOtheraddburdenContent: true})
                            }
                          }}>
                            <Select.Option value={0}> </Select.Option>
                            <Select.Option value={1}>負担なし</Select.Option>
                            <Select.Option value={2}>定額負担</Select.Option>
                            <Select.Option value={3}>定率負担</Select.Option>
                            <Select.Option value={4}>保険者上限負担</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="OtheraddburdenContent">
                          <Input  disabled={this.state.disabledOtheraddburdenContent}/>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label="人間ドック"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="CheckupScreen">
                          <Select style={{width: '170px'}}
                          onChange={(value) => {
                            this.setState({disabledOtherdockburdenContent: false})
                            this.setState({disabledother_insurer_pay_max: false})
                            if (value === 0 || value ===1) {
                              this.setState({disabledOtherdockburdenContent: true})
                              this.setState({disabledother_insurer_pay_max: true})
                            }

                            if (value === 2 || value ===3) {
                              this.setState({disabledother_insurer_pay_max: true})
                            }
                          }}>
                            <Select.Option value={0}> </Select.Option>
                            <Select.Option value={1}>負担なし</Select.Option>
                            <Select.Option value={2}>定額負担</Select.Option>
                            <Select.Option value={3}>定率負担</Select.Option>
                            <Select.Option value={4}>保険者上限負担</Select.Option>
                            <Select.Option value={5}>定率負担(上限以下)</Select.Option>
                            <Select.Option value={6}>定額負担(上限以下)</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="OtherdockburdenContent">
                          <Input  disabled={this.state.disabledOtherdockburdenContent}/>
                        </Form.Item>
                        <Form.Item name="other_insurer_pay_max" label="上限額">
                          <Input  disabled={this.state.disabledother_insurer_pay_max}/>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <hr
                      style={{
                        borderBottom: "1px solid #d9d9d9",
                        margin: "20px 0",
                      }}
                    />
                    <Form.Item label="保険者番号" name="insurer_num" {...grid}>
                      <Input type="text" 
                       onClick={() => {
                        this.setState({
                          ...this.state,
                          childModal: {
                            width: "60%",
                            visible: true,
                            component:  (
                              <WS1290001_InsurerNumberInquiry
                              
                                onFinishScreen={(output) => {
                                  this.formRef.current.setFieldsValue({
                                    insurer_num: output.Lo_InsurerNum
                                  })
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="代行機関"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="other_agency">
                          <Input type="text" 
                           onDoubleClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "60%",
                                visible: true,
                                component: (
                                  <WS1302001_AgencyInquirySub
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        other_agency: output.Lio_AgencyNum
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          />
                        </Form.Item>
                        <Form.Item name="OthersScreen" valuePropName="checked">
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="ﾊﾞｰｼﾞｮﾝ" name="version" {...lgGrid}>
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      label="契約区分"
                      name="ContractScreen"
                      {...lgGrid}
                    >
                      <Select>
                        <Select.Option value={1}>国保ﾍﾞｰｽ</Select.Option>
                        <Select.Option value={2}>
                          国保ﾍﾞｰｽ+契約取りまとめ機関
                        </Select.Option>
                        <Select.Option value={3}>
                          国保ﾍﾞｰｽ+契約取りまとめ機関+個別契約
                        </Select.Option>
                        <Select.Option value={4}>
                          契約取りまとめ機関
                        </Select.Option>
                        <Select.Option value={5}>
                          契約取りまとめ機関+個別契約
                        </Select.Option>
                        <Select.Option value={6}>個別契約のみ</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="全衛連"
                      {...lgGrid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="zenmamoruren_agency">
                          <Input type="text" 
                          onDoubleClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "60%",
                                visible: true,
                                component: (
                                  <WS1302001_AgencyInquirySub
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        zenmamoruren_agency: output.Lio_AgencyNum
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          />
                        </Form.Item>
                        <Form.Item
                          name="ZenmamorurenScreen"
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label="結核予防会"
                      {...lgGrid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="tuberculosis_agency">
                          <Input type="text" 
                          onDoubleClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "60%",
                                visible: true,
                                component: (
                                  <WS1302001_AgencyInquirySub
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        tuberculosis_agency: output.Lio_AgencyNum
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          />
                        </Form.Item>
                        <Form.Item
                          name="TuberculosisKyokaiScreen"
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label="人間ﾄﾞｯｸ学会"
                      {...lgGrid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="human_de_agency">
                          <Input type="text" 
                          onDoubleClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "60%",
                                visible: true,
                                component: (
                                  <WS1302001_AgencyInquirySub
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        human_de_agency: output.Lio_AgencyNum
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          />
                        </Form.Item>
                        <Form.Item
                          name="CheckupSocietyScreen"
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label="予防医学事業中央会"
                      {...lgGrid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="prevent_doctor_agency">
                          <Input type="text"
                          onDoubleClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "60%",
                                visible: true,
                                component: (
                                  <WS1302001_AgencyInquirySub
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        prevent_doctor_agency: output.Lio_AgencyNum
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          />
                        </Form.Item>
                        <Form.Item
                          name="PreventiveMedicineBusinessScree"
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label="日本総合健診医学会"
                      {...lgGrid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="doctor_agency">
                          <Input type="text" 
                          onDoubleClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "60%",
                                visible: true,
                                component: (
                                  <WS1302001_AgencyInquirySub
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        doctor_agency: output.Lio_AgencyNum
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          />
                        </Form.Item>
                        <Form.Item
                          name="JapanTotalMedicalExamScreen"
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label="日本病院協会"
                      {...lgGrid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="nha_agency">
                          <Input type="text" 
                          onDoubleClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "60%",
                                visible: true,
                                component: (
                                  <WS1302001_AgencyInquirySub
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        nha_agency: output.Lio_AgencyNum
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          />
                        </Form.Item>
                        <Form.Item
                          name="JapanHospitalKyokaiScreen"
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label="東振協"
                      {...lgGrid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="tokyo_agency">
                          <Input type="text" 
                          onDoubleClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "60%",
                                visible: true,
                                component: (
                                  <WS1302001_AgencyInquirySub
                                    onFinishScreen={(output) => {
                                      this.formRef.current.setFieldsValue({
                                        tokyo_agency: output.Lio_AgencyNum
                                      })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          />
                        </Form.Item>
                        <Form.Item
                          name="HigashifukyoScreen"
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <hr
                      style={{
                        borderBottom: "1px solid #d9d9d9",
                        margin: "20px 0",
                      }}
                    />
                    <Form.Item
                      label="保険者名称"
                      name="insurer_name"
                      {...lgGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      label="所在地"
                      name="insurer_party_location"
                      {...lgGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      label="電  話"
                      name="insurer_telephone_num"
                      {...lgGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      label="取りまとめ区分"
                      name="contract_compiled_sect"
                      {...lgGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      label="取りまとめ機関"
                      name="contract_compiled_name"
                      {...lgGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      label="その他の内容"
                      name="other_chkup_content"
                      {...lgGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
              </Tabs.TabPane>

              <Tabs.TabPane tab="契約情報" key="1">
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="契約年度"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="Expression_156">
                          <Input type="text" readOnly style={{background: '#cfdfec', border: 'none'}}/>
                        </Form.Item>
                        <Form.Item name="contract_number" label="契約番号">
                          <Input type="text"  readOnly style={{background: '#cfdfec', border: 'none'}}/>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                    <Form.Item name="contract_name" label="契約名称" {...grid}>
                      <Input type="text"  readOnly style={{background: '#cfdfec', border: 'none'}}/>
                    </Form.Item>
                    <Form.Item
                      label="契約形態"
                      {...grid}
                      style={{ marginBottom: "0" }}
                    >
                      <Space>
                        <Form.Item name="Expression_115">
                          <Input type="text" readOnly style={{background: '#cfdfec', border: 'none'}} />
                        </Form.Item>
                        <Form.Item name="Expression_116" label="請求区分">
                          <Input type="text" readOnly style={{background: '#cfdfec', border: 'none'}}/>
                        </Form.Item>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Row gutter={24}>
                      <Col span={5} style={{ padding: 0 }}>
                        <div style={styleLabel}>詳細検査</div>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <div style={styleLabel}>個別健診</div>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <div style={styleLabel}>個別健診</div>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <div style={styleLabel}>個別健診</div>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <div style={styleLabel}>個別健診</div>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={5} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>基　本</div>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="basic_individual_medical_exam_u"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="unit_price_exam_basic_populatio"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_117"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_122"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={5} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>貧　血</div>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="anemia_individual_medical_exam_"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="unit_price_exam_anemia_populati"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_118"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_123"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={5} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>心電図</div>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="electrocardiograph_individual_m"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="unit_price_diagnosis_electrocar"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_119"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_124"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={5} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>眼　底</div>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="fundus_individual_medical_exam_"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="fundus_group_medical_exam_unit_"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_120"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_125"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={5} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>ｸﾚｱﾁﾆﾝ</div>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="h30_creatinine_individual_medic"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={5} style={{ padding: 0 }}>
                        <Form.Item
                          name="h30_creatinine_population_check"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_121"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_126"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row gutter={24} style={{ marginTop: "20px" }}>
                  <Col span={11} style={{ marginRight: "20px" }}>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabel}>No</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <div style={styleLabel}>追加健診名</div>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <div style={styleLabel}>単価</div>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <div style={styleLabel}>決済</div>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>1</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_01"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_127"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>2</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_02"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_128"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>3</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_03"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_129"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>4</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_04"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_130"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>5</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_05"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_131"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>6</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_06"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_132"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>7</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_07"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_133"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>8</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_08"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_134"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>9</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_09"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_135"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>10</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_name_10"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="additional_medical_exam_unit_pr"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_136"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={11}>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabel}>No</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <div style={styleLabel}>同時実施健診名</div>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <div style={styleLabel}>差引</div>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <div style={styleLabel}>決済</div>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>1</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_01"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_01"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_137"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>2</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_02"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_02"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_138"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>3</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_03"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_03"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_139"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>4</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_04"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_04"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_140"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>5</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_05"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_05"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_141"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>6</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_06"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_06"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_142"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>7</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_07"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_07"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_143"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>8</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_08"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_08"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_144"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>9</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_09"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_09"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_145"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={2} style={{ padding: 0 }}>
                        <div style={styleLabelOnly}>10</div>
                      </Col>
                      <Col span={14} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_name_10"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="same_time_unit_price_10"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ padding: 0 }}>
                        <Form.Item
                          name="Expression_146"
                          style={{ marginBottom: "0" }}
                        >
                          <Input type="text" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>

            <Space style={{ float: "right", marginTop: "30px" }}>
              <Form.Item>
                <Button type="primary">請求情報</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary">契約選択</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary"
                 onClick={() => {
                  this.setState({
                    ...this.state,
                    childModal: {
                      width: "60%",
                      visible: true,
                      component: (
                        <WS1350013_SettleInputSub
                          onFinishScreen={(output) => {
                            this.formRef.current.setFieldsValue({
                              other_agency: output.Lio_AgencyNum
                            })
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
                >決済入力</Button>
              </Form.Item>
            </Space>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS1296010_ConsultTicketInputSub);
