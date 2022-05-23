import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Select, Row, Col, Modal, } from "antd";
import WS0248001_PersonalInfoSearchQuery from 'pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx';
import WS0540001_PeriodTimeDisplay from 'pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS0540001_PeriodTimeDisplay.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0542001_CalendarDetailDisplay from 'pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS0542001_CalendarDetailDisplay.jsx';
import WS0289012_ContractInfoInquiry from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS0289012_ContractInfoInquiry.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";


const grid = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const smGrid = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
class WS0565001_BookAcceptChangeProcess extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '予約・受付変更処理';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="book-accept-change-process">
        <Card title="予約・受付変更処理">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ text_field_1: "4" }}
          >
            <Row gutter={24} className="mb-3">
              <Col span={6}>
                <Form.Item
                  name=""
                  label="予約番号"
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Row gutter={24}>
                  <Col span={18} style={{ paddingRight: "0" }}>
                    <Form.Item
                      name=""
                      label="変更前"
                      style={{ textAlign: "right", marginRight: "5px" }}
                    >
                      <span>9</span>
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ padding: "0" }}>
                    <Form.Item
                      name="text_field_1"
                    >
                      <Input type="text" style={{ backgroundColor: "blue", textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Button type="primary" style={{ float: "right" }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 500,
                        component:
                          <WS0540001_PeriodTimeDisplay
                            onClickedCreate={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />
                        ,
                      },
                    });
                  }}
                >時間帯</Button>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="個人番号"
                      {...smGrid}
                    >
                      <span>10</span>
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item name="">
                      <Button >{" "}</Button>
                    </Form.Item>
                  </Col>
                  <Col span={14}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="カナ氏名"
                      {...smGrid}
                    >
                      <span>30</span>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="生年月日"
                    >
                      <span>JMYY/MM/DDZ</span>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <span style={{ lineHeight: "35px" }}>6</span>
                  </Col>
                  <Col span={4}>
                    <span style={{ lineHeight: "35px" }}>3番</span>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name=""
                      label="漢字氏名"
                    >
                      <span>30</span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name=""
                      label="自宅電話番号"
                    >
                      <span>30</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={6}>
                    <Form.Item
                      name=""
                      label="性別"
                    >
                      <span>4</span>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name=""
                      label="続柄"
                    >
                      <span>6</span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name=""
                      label="携帯電話番号"
                    >
                      <span>30</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Row gutter={24}>
                      <Col span={14}>
                        <Form.Item
                          name=""
                          label="事業所ｺｰﾄﾞ"
                        >
                          <span>8</span>
                        </Form.Item>
                      </Col>
                      <Col span={4}><span style={{ lineHeight: "35px" }}>-</span></Col>
                      <Col span={6}>
                        <Form.Item
                          name=""
                        >
                          <span>5</span>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <span style={{ marginLeft: "80px" }}>6</span>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <span style={{ lineHeight: "35px", marginRight: "20px" }}>10Z</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name=""
                      label="記号／番号"
                    >
                      <span>60</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <span style={{ marginLeft: "80px" }}>6</span>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="受診日"
                      {...smGrid}
                    >
                      <span>####/##/##Z</span>
                    </Form.Item>
                  </Col>
                  <Col span={16}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="時間帯"
                      {...smGrid}
                    >
                      <span>HH:MM:Z</span>
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ textAlign: "left", lineHeight: "35px" }}>
                    <span>2</span>
                  </Col>
                  <Col span={14}>
                    <Form.Item
                      name=""
                      label="施設名称"
                    >
                      <span>40</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="ｎ次区分"
                      {...smGrid}
                    >
                      <span>60</span>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name=""
                      label="コース"
                    >
                      <span>X-XX</span>
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ padding: "0" }}>
                    <span style={{ lineHeight: "35px" }}>80</span>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="その他条件"
                      {...smGrid}
                    >
                      <span>2</span>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name=""
                      label="健診場所"
                    >
                      <span>4</span>
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ padding: "0" }}>
                    <span style={{ lineHeight: "35px" }}>40</span>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      name=""
                      label="備考"
                      {...grid}
                    >
                      <span style={{ marginLeft: "10px" }}>80</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      name=""
                      label="契約情報"
                      {...grid}
                    >
                      <span style={{ marginLeft: "10px" }}>26</span>
                    </Form.Item>
                  </Col>

                </Row>
              </Col>
              {/* ------------------------------------------ */}
              <Col span={14}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="個人番号"
                      {...smGrid}
                    >
                      <Input.Search type="text"
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1600,
                              component:
                                <WS0248001_PersonalInfoSearchQuery
                                  onClickedCreate={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ,
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item name="">
                      <Button >{" "}</Button>
                    </Form.Item>
                  </Col>
                  <Col span={14}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="カナ氏名"
                      {...smGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name=""
                      label="生年月日"
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <span style={{ lineHeight: "35px" }}>6</span>
                  </Col>
                  <Col span={6}>
                    <span style={{ lineHeight: "35px" }}>3番</span>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="漢字氏名"
                      {...smGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name=""
                      label="自宅電話番号"
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="性別"
                      {...smGrid}
                    >
                      <Select>
                        <Select.Option value=""></Select.Option>
                        <Select.Option value="">男</Select.Option>
                        <Select.Option value="">女</Select.Option>

                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="続柄"
                    >
                      <Select>
                        <Select.Option value=""></Select.Option>

                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="携帯電話番号"
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="事業所ｺｰﾄﾞ"
                      {...smGrid}
                    >
                      <Input.Search type="text"
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1200,
                              component:
                                <WS0247001_OfficeInfoRetrievalQuery
                                  onClickedCreate={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ,
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ textAlign: "center" }}><span style={{ lineHeight: "35px" }}>-</span></Col>
                  <Col span={6}>
                    <Form.Item
                      name=""
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <span style={{ marginLeft: "90px" }}>6</span>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <span style={{ lineHeight: "35px", marginRight: "20px" }}>10Z</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name=""
                      label="記号／番号"
                    >
                      <span>60</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <span style={{ marginLeft: "90px" }}>6</span>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="受診日"
                      {...smGrid}
                    >
                      <Input.Search type="text"
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1600,
                              component:
                                <WS0542001_CalendarDetailDisplay
                                  onClickedCreate={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ,
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={16}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="時間帯"
                      {...smGrid}
                    >
                      <Select>
                        <Select.Option value=""></Select.Option>

                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ textAlign: "left", lineHeight: "35px" }}>
                    <span>2</span>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="施設名称"
                    >
                      <Select>
                        <Select.Option value=""></Select.Option>

                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="ｎ次区分"
                      {...smGrid}
                    >
                      <Select>
                        <Select.Option value=""></Select.Option>

                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name=""
                      label="コース"
                    >
                      <Input.Search type="text"
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1200,
                              component:
                                <WS0289012_ContractInfoInquiry
                                  onClickedCreate={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ,
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ padding: "0" }}>
                    <span style={{ lineHeight: "35px" }}>80</span>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name=""
                      label="その他条件"
                      {...smGrid}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name=""
                      label="健診場所"
                    >
                      <Input.Search type="text" 
                      
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ padding: "0" }}>
                    <span style={{ lineHeight: "35px" }}>40</span>
                  </Col>
                  <Col span={8}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      name=""
                      label="備考"
                      {...grid}
                    >
                      <Input type="text" style={{ marginLeft: "10px" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      name=""
                      label="契約情報"
                      {...grid}
                    >
                      <span style={{ marginLeft: "10px" }}>26</span>
                    </Form.Item>
                  </Col>

                </Row>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0565001_BookAcceptChangeProcess);
