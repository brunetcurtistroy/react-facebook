import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Input, Select, Row, Col, Modal, DatePicker } from "antd";

import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0302001_SetInfoSearch from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0302001_SetInfoSearch";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS0273001_VisitsTargetSearchQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0273001_VisitsTargetSearchQuery";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0964020_SelectBreakdown extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    //out form

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "内訳選択";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      SpecifyClassify: null,
      TaxClassify: null,
    };

    this.setFormFieldValue = this.setFormFieldValue.bind(this);
  }

  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
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

  onTotalAmount(tax, people) {
    let total = tax * people;
    console.log(tax, people, total);

    this.setFormFieldValue("Lio_Tax_ExcludedAmount", tax);
    this.setFormFieldValue("Lio_TotalAmount", total);
  }

  render() {
    return (
      <div className="select-breakdown">
        <Card title="内訳選択">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={24}>
              <Col xl={12} md={24} style={{ borderRight: "1px solid #d9d9d9" }}>
                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>区　分</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="Lio_SpecifyClassify" label="">
                      <Select
                        onChange={(value) =>
                          this.setState({ SpecifyClassify: value })
                        }
                      >
                        <Select.Option value={0}>ｺﾒﾝﾄ区切</Select.Option>
                        <Select.Option value={1}>セット</Select.Option>
                        <Select.Option value={3}>コース</Select.Option>
                        <Select.Option value={5}>コメント</Select.Option>
                        <Select.Option value={7}>明細無効</Select.Option>
                        <Select.Option value={9}>無効</Select.Option>
                        <Select.Option value={10}>区切</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>名　称</label>
                  </Col>
                  <Col span={21}>
                    <Form.Item name="Lio_Content" label="">
                      <Input
                        type="text"
                        onDoubleClick={() => {
                          switch (this.state.SpecifyClassify) {
                            case 0:
                            case 10:
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "60%",
                                  component: (
                                    <WS0247001_OfficeInfoRetrievalQuery
                                      onFinishScreen={(output) => {
                                        this.setFormFieldValue(
                                          "Lio_Content",
                                          output.Lo_Kanji_Name
                                        );
                                        this.setFormFieldValue(
                                          "Lio_OfficeCode",
                                          output.Lio_OfficeCode
                                        );

                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                              break;
                            case 1:
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1000,
                                  component: (
                                    <WS0302001_SetInfoSearch
                                      onFinishScreen={(output) => {
                                        this.setFormFieldValue(
                                          "Lio_Content",
                                          output.Lo_SetName
                                        );
                                        this.setFormFieldValue(
                                          "Lio_SetCode",
                                          output.Lo_SetCode
                                        );
                                        // none Lo_SetName

                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                              break;
                            case 3:
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "60%",
                                  component: (
                                    <WS0265001_BasicCourseInquiry
                                      onFinishScreen={(output) => {
                                        this.setFormFieldValue(
                                          "Lio_Content",
                                          output.Lo_CourseName
                                        );
                                        this.setFormFieldValue(
                                          "Lio_CourseCode",
                                          output.Lo_CourseCode
                                        );

                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                              break;
                            default:
                              break;
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <br></br>
                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>単　価</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="Lio_Tax_ExcludedAmount" label="">
                      <Input
                        type="text"
                        disabled={
                          this.state.SpecifyClassify === 0 ||
                          this.state.SpecifyClassify === 5 ||
                          this.state.SpecifyClassify === 10 ||
                          this.state.TaxClassify === 2
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item name="Lio_TaxClassify" label="税区分">
                      <Select
                        onChange={(value) =>
                          this.setState({ TaxClassify: value })
                        }
                        disabled={
                          this.state.SpecifyClassify === 0 ||
                          this.state.SpecifyClassify === 5 ||
                          this.state.SpecifyClassify === 10
                        }
                      >
                        <Select.Option value={0}>税指定</Select.Option>
                        <Select.Option value={1}>外税</Select.Option>
                        <Select.Option value={2}>内税</Select.Option>
                        <Select.Option value={3}>非課税</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>消費税</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="Lio_Tax" label="">
                      <Input
                        type="text"
                        disabled={
                          this.state.SpecifyClassify === 0 ||
                          this.state.SpecifyClassify === 5 ||
                          this.state.SpecifyClassify === 10
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>合　計</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="Lio_Tax_IncludedAmount" label="">
                      <Input
                        type="text"
                        disabled={
                          this.state.TaxClassify !== 2 ||
                          this.state.SpecifyClassify === 0 ||
                          this.state.SpecifyClassify === 5 ||
                          this.state.SpecifyClassify === 10
                        }
                        onChange={(event) => {
                          this.onTotalAmount(
                            event.target.value,
                            this.formRef.current?.getFieldValue("Lio_PeopleNum")
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    span={3}
                    style={{ paddingRight: "5px", paddingLeft: "0" }}
                  >
                    <Form.Item name="Lio_PeopleNum" label="x">
                      <Input
                        type="number"
                        min={1}
                        defaultValue={1}
                        disabled={
                          this.state.SpecifyClassify === 0 ||
                          this.state.SpecifyClassify === 5 ||
                          this.state.SpecifyClassify === 10
                        }
                        onChange={(event) => {
                          this.onTotalAmount(
                            this.formRef.current?.getFieldValue(
                              "Lio_Tax_IncludedAmount"
                            ),
                            event.target.value
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5} style={{ paddingLeft: "0" }}>
                    <Form.Item name="Lio_TotalAmount" label="=">
                      <Input
                        type="text"
                        readOnly
                        style={{ border: "none", background: "transparent" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xl={12} md={24}>
                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>日　付</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="Lio_DateChar" label="">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>氏　名</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="Lio_PersonalNum" label="">
                      <Input
                        type="text"
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "60%",
                              component: (
                                <WS0248001_PersonalInfoSearchQuery
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "Lio_PersonalNum",
                                      null
                                    );
                                    this.setFormFieldValue("Lio_Name", null);

                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ paddingLeft: "0" }}>
                    <Form.Item name="Lio_Name" label="">
                      <Input
                        type="text"
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "60%",
                              component: (
                                <WS0248001_PersonalInfoSearchQuery
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "Lio_PersonalNum",
                                      null
                                    );
                                    this.setFormFieldValue("Lio_Name", null);

                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <br></br>
                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>予約番号</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="Lio_ReserveNum" label="">
                      <Input
                        type="text"
                        disabled={
                          this.state.SpecifyClassify === 0 ||
                          this.state.SpecifyClassify === 5 ||
                          this.state.SpecifyClassify === 10
                        }
                        onDoubleClick={() => {
                          switch (this.state.SpecifyClassify) {
                            case 1:
                            case 3:
                            case 7:
                            case 9:
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "60%",
                                  component: (
                                    <WS0273001_VisitsTargetSearchQuery
                                      onFinishScreen={(output) => {
                                        this.setFormFieldValue(
                                          "Lio_ReserveNum",
                                          null
                                        );
                                        // none

                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                              break;
                            default:
                              break;
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>事業所</label>
                  </Col>
                  <Col span={5} style={{ paddingRight: "5px" }}>
                    <Form.Item name="Lio_OfficeCode" label="">
                      <Input
                        type="text"
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "60%",
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "Lio_OfficeCode",
                                      output.Lio_OfficeCode
                                    );
                                    this.setFormFieldValue(
                                      "Lio_BranchStoreCode",
                                      output.Lio_BranchStoreCode
                                    );

                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5} style={{ paddingLeft: "0" }}>
                    <Form.Item name="Lio_BranchStoreCode" label="">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={3} style={{ textAlign: "right" }}>
                    <label>コース</label>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="Lio_CourseCode" label="">
                      <Input
                        type="text"
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "60%",
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.setFormFieldValue(
                                      "Lio_CourseCode",
                                      output.Lo_CourseCode
                                    );

                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="Lio_SetCode" label="セット">
                      <Input
                        type="text"
                        disabled={this.state.SpecifyClassify !== 3}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br></br>
            <Row gutter={24}>
              <Col
                span={2}
                style={{ textAlign: "right", paddingRight: "28px" }}
              >
                <label>備　考</label>
              </Col>
              <Col span={20} style={{ paddingLeft: "0" }}>
                <Form.Item name="Lio_Remarks" label="">
                  <Input
                    type="text"
                    disabled={
                      this.state.SpecifyClassify === 0 ||
                      this.state.SpecifyClassify === 5 ||
                      this.state.SpecifyClassify === 10
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            this.closeModal()
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
)(WS0964020_SelectBreakdown);
