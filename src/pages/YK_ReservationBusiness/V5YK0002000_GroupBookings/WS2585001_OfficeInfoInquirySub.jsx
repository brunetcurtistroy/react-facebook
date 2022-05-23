/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";
import moment from "moment";
import PropTypes from "prop-types";
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Row,
  Col,
  Tabs,
  Checkbox,
  Modal,
  Spin,
} from "antd";
import {
  MoreOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import OfficeInfoInquirySubAction from "redux/ReservationBusiness/GroupBookings/OfficeInfoInquirySub.action";
import WS0341001_OfficeInfoMaintain from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0341001_OfficeInfoMaintain.jsx";
import WS0339001_InsurerInfoMaintain from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0339001_InsurerInfoMaintain";
const { TabPane } = Tabs;
const styleIcon = {
  fontSize: 20,
  border: "1px solid #f0f0f0",
  borderRadius: "5px",
};
class WS2585001_OfficeInfoInquirySub extends React.Component {
  static propTypes = {
    Li_OfficeCode: PropTypes.any,
    Li_BranchCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "事業所情報照会SUB";

    this.state = {
      OfficeInfoInquirySub: {},
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoading: false,
    };
  }

  componentDidMount() {
    let params = {
      OfficeCode: this.props.Li_OfficeCode,
      BranchCode: this.props.Li_BranchCode,
    };
    this.loadData(params);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      let params = {
        OfficeCode: this.props.Li_OfficeCode,
        BranchCode: this.props.Li_BranchCode,
      };
      this.loadData(params);
      console.log("Li_OfficeCode", this.props.Li_OfficeCode);
      console.log("Li_BranchCode", this.props.Li_BranchCode);
    }
  };

  loadData = (params) => {
    this.setState({ isLoading: true });
    OfficeInfoInquirySubAction.getOfficeInfoInquirySub(params)
      .then((res) => {
        this.formRef?.current?.setFieldsValue(res);
        this.setState({
          OfficeInfoInquirySub: res?.OfficeInfoInquirySub,
          isLoading: false,
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  };
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  openModal1 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "80%",
        component: (
          <WS0341001_OfficeInfoMaintain
            Lio_OfficeCode={this.props.Li_OfficeCode}
            Lio_BranchStoreCode={this.props.Li_BranchCode}
            onFinishScreen={(output) => {
              if (output) {
                let params = {
                  OfficeCode: this.props.Li_OfficeCode,
                  BranchCode: this.props.Li_BranchCode,
                };
                this.loadData(params);
              }
              this.closeModal();
            }}
          />
        ),
      },
    });
  };
  openModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "80%",
        component: (
          <WS0339001_InsurerInfoMaintain
            Li_InsurerCode={this.state.OfficeInfoInquirySub.insurer_code}
            onFinishScreen={(output) => {
              if (output) {
                let params = {
                  OfficeCode: this.props.Li_OfficeCode,
                  BranchCode: this.props.Li_BranchCode,
                };
                this.loadData(params);
              }
              this.closeModal();
            }}
          />
        ),
      },
    });
  };

  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  }

  render() {
    let br = this.isEmpty(this.props.Li_BranchCode)
      ? ""
      : this.props.Li_BranchCode;
    let title =
      "事業所情報照会SUB " + "[" + this.props.Li_OfficeCode + "-" + br + "]";
    return (
      <div className="office-info-inquiry-sub">
        <Card title={title}>
          <Spin spinning={this.state.isLoading}>
            <Row>
              <Col span={10}>
                <Form ref={this.formRef}>
                  <div style={{ display: "none" }}>
                    <Form.Item name="MedicalExamLocation">
                      <Input />
                    </Form.Item>
                    <Form.Item name="LabelSelect">
                      <Input />
                    </Form.Item>
                    <Form.Item name="StsOtherwise">
                      <Input />
                    </Form.Item>
                  </div>
                  <div
                    style={{
                      border: "1px solid #E3E4E1",
                      padding: "0.5em",
                      width: "98%",
                    }}
                  >
                    <Row>
                      <Col>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;名　称&emsp;
                            </span>
                          }
                        >
                          <span>
                            {" "}
                            {this.state.OfficeInfoInquirySub?.office_kana_name}
                          </span>
                        </Form.Item>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;&emsp;&emsp;&emsp;&emsp;
                            </span>
                          }
                        >
                          <span>
                            {" "}
                            {this.state.OfficeInfoInquirySub?.office_kanji_name}
                          </span>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;保険者&emsp;
                            </span>
                          }
                        >
                          <span>
                            {this.state.OfficeInfoInquirySub?.insurer_code}
                          </span>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item>
                          <Button onClick={() => this.openModal()}>:</Button>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item label="&emsp;&emsp;&emsp;&emsp;&emsp;">
                        <span>
                          {" "}
                          {this.state.OfficeInfoInquirySub?.insurer_kanji_name}
                        </span>
                      </Form.Item>
                    </Row>
                    <Row>
                      <Form.Item
                        label={
                          <span style={{ color: "#084e9a" }}>
                            &emsp;保険証&emsp;
                          </span>
                        }
                      >
                        <span>
                          {this.state.OfficeInfoInquirySub?.insurer_card_symbol}
                        </span>
                      </Form.Item>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;代表者&emsp;
                            </span>
                          }
                        >
                          <span>
                            {this.state.OfficeInfoInquirySub?.representative}
                          </span>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              先方担当&emsp;
                            </span>
                          }
                        >
                          <span>
                            {this.state.OfficeInfoInquirySub?.office_personnel}
                          </span>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;状　況&emsp;
                            </span>
                          }
                        >
                          <span>
                            {this.state.OfficeInfoInquirySub?.Expression_9}
                          </span>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              担当営業&emsp;
                            </span>
                          }
                        >
                          <span>
                            {
                              this.state.OfficeInfoInquirySub
                                ?.sales_representative
                            }
                          </span>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  <div
                    style={{
                      border: "1px solid #E3E4E1",
                      padding: "0.5em",
                      marginTop: "1em",
                      width: "98%",
                    }}
                  >
                    <Row>
                      <Col span={10}>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;&emsp;&emsp;〒&emsp;
                            </span>
                          }
                        >
                          <span>
                            {this.state.OfficeInfoInquirySub?.postal_code}
                          </span>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;地　区&emsp;
                            </span>
                          }
                        >
                          <span>
                            {this.state.OfficeInfoInquirySub?.district_name}
                          </span>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;住　所&emsp;
                            </span>
                          }
                        >
                          <span>
                            {this.state.OfficeInfoInquirySub?.address_1}
                          </span>
                        </Form.Item>
                        <Form.Item label="&emsp;&emsp;&emsp;&emsp;&emsp;">
                          <span>
                            {this.state.OfficeInfoInquirySub?.address_2}
                          </span>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;電　話&emsp;
                            </span>
                          }
                        >
                          <span>
                            {this.state.OfficeInfoInquirySub?.phone_number}
                          </span>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          label={
                            <span style={{ color: "#084e9a" }}>
                              &emsp;ＦＡＸ&emsp;
                            </span>
                          }
                        >
                          <span>{this.state.OfficeInfoInquirySub?.fax}</span>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item
                        label={
                          <span style={{ color: "#084e9a" }}>
                            産業分類&emsp;
                          </span>
                        }
                      >
                        <span>
                          {this.state.OfficeInfoInquirySub?.Expression_10}
                        </span>
                      </Form.Item>
                    </Row>
                    <Row>
                      <Form.Item
                        label={
                          <span style={{ color: "#084e9a" }}>
                            &emsp;産業医&emsp;
                          </span>
                        }
                      >
                        <span>
                          {
                            this.state.OfficeInfoInquirySub
                              ?.industrial_doctor_name
                          }
                        </span>
                      </Form.Item>
                    </Row>
                    <Row>
                      <Form.Item
                        label={
                          <span style={{ color: "#084e9a" }}>
                            &emsp;場　所&emsp;
                          </span>
                        }
                      >
                        <span>
                          {this.state.OfficeInfoInquirySub?.short_name}
                        </span>
                      </Form.Item>
                    </Row>
                  </div>
                </Form>
              </Col>
              <Col span={14}>
                <Tabs type="card">
                  <TabPane
                    tab="特記"
                    key="1"
                    style={{ overflow: "auto", height: "68vh" }}
                  >
                    <Table
                      size="small"
                      dataSource={this.formRef.current?.getFieldValue(
                        "Notices"
                      )}
                      pagination={false}
                      bordered={true}
                    >
                      <Table.Column
                        title="重要度"
                        dataIndex="importance"
                        width={90}
                        align="center"
                        render={(value, record, index) => {
                          switch (value) {
                            case 1:
                              return "情報";
                            case 3:
                              return "警告";
                            case 5:
                              return "重要";
                            default:
                              return "";
                          }
                        }}
                      />
                      <Table.Column
                        dataIndex="importance"
                        width={60}
                        align="center"
                        render={(value, record, index) => {
                          let icon = "";
                          switch (value) {
                            case 1:
                              icon = (
                                <Form.Item style={{ fontSize: 20 }}>
                                  <InfoCircleOutlined
                                    style={{ color: "#1890ff" }}
                                  />
                                </Form.Item>
                              );
                              break;
                            case 3:
                              icon = (
                                <Form.Item style={{ fontSize: 20 }}>
                                  <WarningOutlined
                                    style={{ color: "#faad14" }}
                                  />
                                </Form.Item>
                              );
                              break;
                            case 5:
                              icon = (
                                <Form.Item style={{ fontSize: 20 }}>
                                  {" "}
                                  <CloseCircleOutlined
                                    style={{ color: "#ff4d4f" }}
                                  />
                                </Form.Item>
                              );
                              break;
                            default:
                              icon = (
                                <Form.Item style={styleIcon}>
                                  {" "}
                                  <MoreOutlined />
                                </Form.Item>
                              );
                              break;
                          }
                          return icon;
                        }}
                      />
                      <Table.Column title="内容" dataIndex="content" />
                      <Table.Column title="ユーザー" dataIndex="recorder" />
                    </Table>
                  </TabPane>
                  <TabPane
                    tab="送付先"
                    key="2"
                    style={{ overflow: "auto", height: "68vh" }}
                  >
                    <Table
                      size="small"
                      dataSource={this.formRef.current?.getFieldValue(
                        "DestinationInfo"
                      )}
                      pagination={false}
                      bordered={true}
                    >
                      <Table.Column title="書　類" dataIndex="document_title" />
                      <Table.Column
                        title="事業所"
                        dataIndex="destination_office_1"
                        width={70}
                        align="center"
                        render={(value, record, index) => {
                          return <Checkbox checked={value === 1} />;
                        }}
                      />
                      <Table.Column
                        title="本店"
                        dataIndex="destination_office_2"
                        width={70}
                        align="center"
                        render={(value, record, index) => {
                          return <Checkbox checked={value === 1} />;
                        }}
                      />
                      <Table.Column
                        title="個人１"
                        dataIndex="destination_personal_1"
                        width={70}
                        align="center"
                        render={(value, record, index) => {
                          return <Checkbox checked={value === 1} />;
                        }}
                      />
                      <Table.Column
                        title="個人２"
                        dataIndex="destination_personal_2"
                        width={70}
                        align="center"
                        render={(value, record, index) => {
                          return <Checkbox checked={value === 1} />;
                        }}
                      />
                      <Table.Column
                        title="個人３"
                        dataIndex="destination_personal_3"
                        width={70}
                        align="center"
                        render={(value, record, index) => {
                          return <Checkbox checked={value === 1} />;
                        }}
                      />
                    </Table>
                  </TabPane>
                  <TabPane
                    tab="結果表"
                    key="3"
                    style={{ overflow: "auto", height: "68vh" }}
                  >
                    <Table
                      size="small"
                      dataSource={this.formRef.current?.getFieldValue(
                        "ResultsTable"
                      )}
                      pagination={false}
                      bordered={true}
                    >
                      <Table.Column
                        title="コース"
                        dataIndex="medical_exam_course"
                      />
                      <Table.Column
                        title="独自様式"
                        dataIndex="standard_printing_style"
                        render={(value, record, index) => {
                          return (
                            <div>
                              <span>{value}&emsp;&emsp;</span>
                              <span>{record?.format_name}</span>
                            </div>
                          );
                        }}
                      />
                      <Table.Column
                        title="標準様式"
                        dataIndex="standard_printing_style"
                        render={(value, record, index) => {
                          return (
                            <div>
                              <span>{value}&emsp;&emsp;</span>
                              <span>{record?.format_name}</span>
                            </div>
                          );
                        }}
                      />
                    </Table>
                  </TabPane>
                  <TabPane
                    tab="個人"
                    key="4"
                    style={{ overflow: "auto", height: "68vh" }}
                  >
                    <Table
                      dataSource={this.formRef.current?.getFieldValue(
                        "PersonalInfo"
                      )}
                      pagination={false}
                      bordered={true}
                      size="small"
                    >
                      <Table.Column
                        align="right"
                        title="個人番号"
                        dataIndex="personal_number_id"
                      />
                      <Table.Column
                        title=""
                        align="center"
                        width={40}
                        dataIndex="importance"
                        render={(value, record, index) => {
                          let icon = "";
                          switch (value) {
                            case 1:
                              icon = (
                                <Form.Item style={{ fontSize: 20 }}>
                                  <InfoCircleOutlined
                                    style={{ color: "#1890ff" }}
                                  />
                                </Form.Item>
                              );
                              break;
                            case 3:
                              icon = (
                                <Form.Item style={{ fontSize: 20 }}>
                                  <WarningOutlined
                                    style={{ color: "#faad14" }}
                                  />
                                </Form.Item>
                              );
                              break;
                            case 5:
                              icon = (
                                <Form.Item style={{ fontSize: 20 }}>
                                  {" "}
                                  <CloseCircleOutlined
                                    style={{ color: "#ff4d4f" }}
                                  />
                                </Form.Item>
                              );
                              break;
                            default:
                              icon = (
                                <Form.Item style={styleIcon}>
                                  {" "}
                                  <MoreOutlined />
                                </Form.Item>
                              );
                              break;
                          }
                          return icon;
                        }}
                      />
                      <Table.Column title="カナ氏名" dataIndex="kana_name" />
                      <Table.Column title="漢字氏名" dataIndex="kanji_name" />
                      <Table.Column
                        title="性別"
                        dataIndex="sex"
                        width={50}
                        align="center"
                        render={(value, record, index) => {
                          switch (value) {
                            case 1:
                              return "男性";
                            case 2:
                              return "女性";
                            default:
                              return "";
                          }
                        }}
                      />
                      <Table.Column
                        title="生年月日"
                        dataIndex="birthday_on"
                        render={(value, record, index) => {
                          return (
                            <div>
                              {moment(record?.birthday_on).format("YYYY/MM/DD")}
                            </div>
                          );
                        }}
                      />
                    </Table>
                  </TabPane>
                  <TabPane
                    tab="補足"
                    key="5"
                    style={{ overflow: "auto", height: "68vh" }}
                  >
                    <Form.List
                      name="SupplementaryInfo"
                      children={(fields) => {
                        if (
                          !this.formRef.current?.getFieldValue(
                            "SupplementaryInfo"
                          )
                        ) {
                          return null;
                        }
                        return this.formRef.current
                          ?.getFieldValue("SupplementaryInfo")
                          ?.map((value, index) => {
                            return (
                              <Row>
                                <Col span={10}>
                                  <Form.Item
                                    style={{
                                      backgroundColor: "#1C66B9",
                                      width: "98%",
                                      padding: "2px",
                                      color: '#FFFFFF'
                                    }}
                                  >
                                    <span>{value.item}</span>
                                  </Form.Item>
                                </Col>
                                <Col span={14}>
                                  <Form.Item
                                    style={{
                                      border: "1px solid #E3E4E1",
                                      padding: "2px",
                                    }}
                                  >
                                    <span>{value.content}</span>
                                  </Form.Item>
                                </Col>
                              </Row>
                            );
                          });
                      }}
                    />
                  </TabPane>
                  <TabPane
                    tab="契約"
                    key="6"
                    style={{ overflow: "auto", height: "68vh" }}
                  >
                    <Table
                      size="small"
                      dataSource={this.formRef.current?.getFieldValue(
                        "ContractInfo"
                      )}
                      pagination={false}
                      bordered={true}
                    >
                      <Table.Column
                        title="開始日"
                        dataIndex="contract_start_date_on"
                        width={110}
                        align="center"
                        render={(value, record, index) => {
                          return (
                            <div>
                              {moment(record?.contract_start_date_on).format(
                                "YYYY/MM/DD"
                              )}
                            </div>
                          );
                        }}
                      />
                      <Table.Column title="名　称" dataIndex="contract_name" />
                    </Table>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  style={{ float: "right" }}
                  onClick={() => this.openModal1()}
                >
                  変更
                </Button>
              </Col>
            </Row>
          </Spin>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2585001_OfficeInfoInquirySub);
