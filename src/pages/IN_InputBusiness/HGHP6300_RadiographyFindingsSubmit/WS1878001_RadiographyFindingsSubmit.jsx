import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import moment from "moment";
import {
  Card,
  Form,
  Input,
  Space,
  Button,
  Checkbox,
  Table,
  Row,
  Col,
  DatePicker,
  Modal,
  message,
  Dropdown,
  Menu,
} from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import RadiographyFindingsSubmitAction from "redux/InputBusiness/RadiographyFindingInput/RadiographyFindingsSubmit.action";
import WS1878009_RadiographyInspectSelect from "pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS1878009_RadiographyInspectSelect.jsx";
import WS2786001_ConditionAddSub from "pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub.jsx";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx";
import WS1881002_RadiographySubjects from "pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS1881002_RadiographySubjects.jsx";
const smGrid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class WS1878001_RadiographyFindingsSubmit extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    selectedRowTableFirst: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = "読影所見送信";

    this.state = {
      isLoading: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      selectedRowTableFirst: [],
    };
  }

  onFinish(values) {}
  componentDidMount() {
    this.setFormFieldValue("DateFDate", moment(new Date()));
    this.setFormFieldValue("DateTDate", moment(new Date()));
  }
  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  onClickBtn() {
    console.log(this.formRef);
  }
  handleSelectRowsTableFirst = (selectedRowTableFirst) => {
    this.setState({ selectedRowTableFirst });
  };
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  }
  getRetrival(data) {
    this.setState({ isLoading: true });
    RadiographyFindingsSubmitAction.getRetrival(data)
      .then((res) => {
        const data = res ? res : [];

        this.setState({ dataSource: data });
      })
      .catch((error) => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { selectedRowTableFirst } = this.state;

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst,
    };

    return (
      <div className="radiography-findings-submit">
        <Card title="読影所見送信">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row>
            <span style={{marginLeft:'15px', fontSize:'14px', fontWeight:'bold', color:'#14468C', marginRight:'10px'}}>受診日 </span>
              <Space>
                <Form.Item name="DateFDate" label="" >
                  <VenusDatePickerCustom
                    formRefDatePicker={this.formRef}
                    format="YYYY/MM/DD"
                  />
                </Form.Item>
                <Form.Item>~</Form.Item>
                <Form.Item name="DateTDate" label=" ">
                  <VenusDatePickerCustom
                    formRefDatePicker={this.formRef}
                    format="YYYY/MM/DD"
                  />
                </Form.Item>
              </Space>
            </Row>
            <Row>
              <Space>
                <Form.Item
                  name="InterpretationInspectItemCode"
                  label="読影検査"
                  {...smGrid}
                >
                  <Input.Search
                    style={{ width: "60%" }}
                    type="text"
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component: (
                            <WS1878009_RadiographyInspectSelect
                              onFinishScreen={(output) => {
                                this.setFormFieldValue(
                                  "InterpretationInspectItemCode",
                                  output.interpretation_exam_item_code
                                );
                                this.setFormFieldValue(
                                  "interpretation_exam_name",
                                  output.interpretation_exam_name
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
              </Space>

              <Col style={{ marginLeft: "-67px" }} span={18}>
                <Form.Item>
                  {this.formRef.current?.getFieldValue(
                    "interpretation_exam_name"
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <span style={{marginLeft:'25px', fontSize:'14px', fontWeight:'bold', color:'#14468C'}}>検　索 </span>
                <Col span={5}>
                  <Form.Item name="Search" label="" >
                    <Input type="text" />
                  </Form.Item>
                </Col>

              <Col span={4}>
                <Button
                  type="primary"
                  style={{ float: "right" }}
                  onClick={() => {
                    let params = {
                      Search: this.formRef?.current?.getFieldValue("Search"),
                      DateFDate: this.formRef?.current
                        ?.getFieldValue("DateFDate")
                        ?.format("YYYY/MM/DD"),
                      DateTDate: this.formRef?.current
                        ?.getFieldValue("DateTDate")
                        ?.format("YYYY/MM/DD"),
                      InterpretationInspectItemCode:
                        this.formRef?.current?.getFieldValue(
                          "InterpretationInspectItemCode"
                        ),
                      CourseCodeF:
                        this.formRef?.current?.getFieldValue("CourseCodeF"),
                      CourseCodeT:
                        this.formRef?.current?.getFieldValue("CourseCodeT"),
                      ReceiptNumF:
                        this.formRef?.current?.getFieldValue("ReceiptNumF"),
                      ReceiptNumT:
                        this.formRef?.current?.getFieldValue("ReceiptNumT"),
                      BranchStoreCodeF: "",
                      BranchStoreCodeT: "",
                      OfficeCode:
                        this.formRef?.current?.getFieldValue("OfficeCode"),
                      StateFlag: this.formRef.current?.getFieldValue(
                        "StateFlag"
                      )
                        ? this.formRef.current?.getFieldValue("StateFlag")
                        : 1,
                    };
                    this.getRetrival(params);
                  }}
                >
                  <SearchOutlined />
                  検　　索
                </Button>
                <Button
                  type="primary"
                  style={{ float: "right", marginRight: "10px" }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 650,
                        component: (
                          <WS2786001_ConditionAddSub
                            Li_DateF={this.formRef.current
                              ?.getFieldValue("DateFDate")
                              ?.format("YYYY/MM/DD")}
                            Li_DateT={this.formRef.current
                              ?.getFieldValue("DateTDate")
                              ?.format("YYYY/MM/DD")}
                            onFinishScreen={(output) => {
                              this.setFormFieldValue(
                                "CourseCodeF",
                                output.Li_CourseCodeF
                              );
                              this.setFormFieldValue(
                                "CourseCodeT",
                                output.Li_CourseCodeT
                              );
                              this.setFormFieldValue(
                                "ReceiptNumF",
                                output.Li_ReceiptNumF
                              );
                              this.setFormFieldValue(
                                "ReceiptNumT",
                                output.Li_ReceiptNumT
                              );
                              this.setFormFieldValue(
                                "OfficeCode",
                                output.Li_OfficeCode
                              );
                              this.setFormFieldValue(
                                "BranchStoreCodeF",
                                output.Li_BranchShop
                              );
                              this.setFormFieldValue(
                                "StateFlag",
                                output.Li_State
                              );
                              this.setFormFieldValue(
                                "BranchStoreCodeF",
                                output.Li_BranchShop
                              );
                              console.log(this.formRef.current.getFieldValue());
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />
                        ),
                      },
                    });
                  }}
                >
                  <PlusCircleOutlined />
                  条件追加
                </Button>
              </Col>
              <Col span={6}></Col>
            </Row>
          </Form>

          <Table
            {...this.state}
            pagination={false}
            dataSource={this.state.dataSource}
            rowKey={(record) => record.id}
            className="mb-3"
            size="small"
            isLoading={this.state.isLoading}
            bordered={true}
            rowSelection={{ type: "checkbox", ...rowSelectionTableFirst }}
          >
            <Table.Column
              title="受診日"
              dataIndex="visit_date_on"
              render={(item, record, index) => {
                return (
                  <div>
                    <span>
                      {moment(record.visit_date_on).format("YYYY/MM/DD")}
                    </span>
                  </div>
                );
              }}
            />
            <Table.Column
              title="受付No"
              dataIndex="receipt_number"
              render={(item, record, index) => {
                return (
                  <div style={{ textAlign: "right" }}>
                    <span>{record.receipt_number}</span>
                  </div>
                );
              }}
            />
            <Table.Column
              title="個人番号"
              dataIndex="personal_number_id"
              render={(item, record, index) => {
                return (
                  <div style={{ textAlign: "right" }}>
                    <span>{record.personal_number_id}</span>
                  </div>
                );
              }}
            />
            <Table.Column
              title="ﾒﾓ"
              dataIndex="Expression_13"
              width={50}
              render={(value, record, index) => {
                let icon = "";
                switch (record.PersonSpecial) {
                  case 1:
                    icon = <InfoCircleOutlined style={{ color: "#1890ff" }} />;
                    break;
                  case 3:
                    icon = <WarningOutlined style={{ color: "#faad14" }} />;
                    break;
                  case 5:
                    icon = <CloseCircleOutlined style={{ color: "#ff4d4f" }} />;
                    break;
                  default:
                    icon = (
                      <Button size="small" icon={<MoreOutlined />}></Button>
                    );
                }
                return (
                  <div
                    style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component: (
                            <Card title={"個人情報照会SUB"}>
                              <WS2584019_PersonalInfoInquirySub
                                Li_PersonalNum={record?.personal_number_id}
                                onFinishScreen={(output) => {}}
                              />
                            </Card>
                          ),
                        },
                      });
                    }}
                  >
                    {icon}
                  </div>
                );
              }}
            />
            <Table.Column
              title="氏名"
              key="6"
              render={(item, record, index) => {
                return (
                  <div>
                    <span>{record.Expression_13}</span>
                  </div>
                );
              }}
            />
            <Table.Column title="性別" dataIndex="Expression_15" />
            <Table.Column
              title="生年月日"
              dataIndex="Expression_14"
              render={(item, record, index) => {
                return (
                  <div>
                    <span>
                      {moment(record.Expression_14).format("YYYY/MM/DD")}
                    </span>
                  </div>
                );
              }}
            />
            <Table.Column
              title="契約情報"
              dataIndex="contract_short_name"
              render={(item, record, index) => {
                return (
                  <div>
                    <span>{record.visit_course + " "}</span>
                    <span>{record.contract_short_name}</span>
                  </div>
                );
              }}
            />
            <Table.Column
              title="事業所情報"
              dataIndex="office_kanji_name"
              key="10"
            />
            <Table.Column
              title="状態"
              dataIndex="TransmissionResult"
              key="11"
            />
            <Table.Column
              key="11"
              render={(res, record) => (
                <Dropdown.Button
                  overlay={() => (
                    <Menu>
                      <Menu.Item
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1600,
                              component: (
                                <WS1881002_RadiographySubjects
                                  Li_ReserveNum={record?.W1_reserve_num}
                                  Li_InterpretationInspectItems={this.formRef.current.getFieldValue(
                                    "InterpretationInspectItemCode"
                                  )}
                                  onClickedCreate={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      >
                        明細
                      </Menu.Item>
                    </Menu>
                  )}
                ></Dropdown.Button>
              )}
            />
          </Table>
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

export default WS1878001_RadiographyFindingsSubmit;
