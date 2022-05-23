import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  Table,
  Row,
  Col,
  DatePicker,
  Space,
  Modal,
  message,
} from "antd";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import WS2786001_ConditionAddSub from "./WS2786001_ConditionAddSub";
import WS0247001_OfficeInfoRetrievalQuery from "../V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0275001_ContractQuerySelect from "../V4KB0201000_ContractInfoMaintain/WS0275001_ContractQuerySelect";
import WS0265001_BasicCourseInquiry from "../V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import ConsultInfoReconstructionService from "services/basicInfo/ConsultInfoReconstruction/ConsultInfoReconstructionService.js";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx";
import WS0335011_InspectChanges from "pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS0335011_InspectChanges.jsx";
import {
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import moment from "moment";
const dateFormat = "YYYY/MM/DD";
class WS0335001_ConsultInfoReconstruction extends React.Component {
  static propTypes = {
    Li_personal_num: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "受診情報再構成";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isLoadingSearch: false,
      isLoadingTable: false,
      isLoadingRedeploy: false,
      DateFChars: "",
      DateTChars: "",
      dateF: "",
      dateT: "",
      flag: 0,
      disabled: false,
      checkAll: true,
    };
  }

  showPersonalInfoInquirySub = (id) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "80vw",
        component: (
          <Card title={"個人情報照会SUB"}>
            <WS2584019_PersonalInfoInquirySub Li_PersonalNum={id} />
          </Card>
        ),
      },
    });
  };
  componentDidMount() {
    // this.getListData();
  }

  onFinish(values) {}
  getListData() {
    this.setState({ isLoadingTable: true });
    ConsultInfoReconstructionService.getListData()
      .then((res) => {
        console.log(res);
        this.formRef.current.setFieldsValue(res.data);
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  }

  handleSearch() {
    this.setState({ isLoadingSearch: true });
    // const values = this.formRef.current.getFieldsValue();
    const values = {
      flg_btn: this.state.flag,
      BranchStoreCodeT:
        this.formRef.current.getFieldsValue("BranchStoreCodeT")
          .BranchStoreCodeT,
      DateFChars: this.formRef.current.getFieldsValue("DateFChars").DateFChars,
      DateTChars: this.formRef.current.getFieldsValue("DateTChars").DateTChars,
      StsCourseAmount:
        this.formRef.current.getFieldsValue("StsCourseAmount").StsCourseAmount,
      TargetSegment:
        this.formRef.current.getFieldsValue("TargetSegment").TargetSegment,
      UpdateClassify:
        this.formRef.current.getFieldsValue("UpdateClassify").UpdateClassify,
        OfficeCode:
        this.formRef.current.getFieldsValue("OfficeCode").OfficeCode,

    };

    ConsultInfoReconstructionService.DisplayBtn(values)
      .then((res) => {
        // this.forceUpdate();
        this.setState({ flag: 0 });
        this.getListData();
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingSearch: false }));
  }

  Redeploy_F12() {
    this.setState({ isLoadingRedeploy: true });

    const values = this.formRef.current.getFieldsValue();

    ConsultInfoReconstructionService.Redeploy_F12(values)
      .then((res) => {
        this.formRef.current.setFieldsValue(res.data);
        // this.forceUpdate();
        message.success("再展開処理　終了！！");
        this.setState({ flag: 1 });
        this.getListData();
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingRedeploy: false }));
  }
  ShowInspectChanges(record) {
    if (record?.InspectDifference?.length > 0) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 600,
          component: (
            <WS0335011_InspectChanges
              Li_InspectDifference={record?.W1_inspect_difference}
              W1_reserve_num={record?.W1_reserve_num}
              W1_course_level={record?.W1_course_level}
              onFinishScreen={(output) => {
                this.closeModal();
              }}
            />
          ),
        },
      });
    }
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  checkDateStart() {
    let dateStart = this.formRef.current?.getFieldValue("DateFChars")
      ? this.formRef.current?.getFieldValue("DateFChars").format("YYYY/MM/DD")
      : null;
    let dateEnd = this.formRef.current?.getFieldValue("DateTChars")
      ? this.formRef.current?.getFieldValue("DateTChars").format("YYYY/MM/DD")
      : null;
    if (dateEnd && dateStart > dateEnd) {
      this.formRef.current?.setFieldsValue({
        DateFChars: this.formRef.current?.getFieldValue("DateFChars"),
      });
    }
  }

  checkDateEnd() {
    let dateStart = this.formRef.current?.getFieldValue("DateFChars")
      ? this.formRef.current?.getFieldValue("DateFChars").format("YYYY/MM/DD")
      : null;
    let dateEnd = this.formRef.current?.getFieldValue("DateTChars")
      ? this.formRef.current?.getFieldValue("DateTChars").format("YYYY/MM/DD")
      : null;
    if ((!dateEnd && dateStart) || (dateStart && dateStart > dateEnd)) {
      this.formRef.current?.setFieldsValue({
        DateTChars: this.formRef.current?.getFieldValue("DateFChars"),
      });
    }
  }
  changeOfficeCode(e) {
    const data = {
      OfficeCode: e,
    };
    ConsultInfoReconstructionService.changeOfficeCode(data)
      .then((res) => {
        this.formRef.current.setFieldsValue({
          OfficeCode: res.data.office_code,
          // BranchStoreCodeF: "",
          office_kanji_name: res.data.office_kanji_name,
        });
        this.setState({ disabled: true });
      })
      .catch((error) => {});
  }
  selectChangeAll(e) {
    this.setState({checkAll : e.target.checked})
      let data = {
        flg_all: 1,
       SelectAll:  e.target.checked ? 1 : 0,
      }
      ConsultInfoReconstructionService.selectChange(data)
      .then((res) => {
        this.getListData();
      })
      .catch((error) => {
      })
      .finally(() => {});
 
  
  }
  selectChangeOne(e, record) {
      let data = {
        flg_all: 0,
       SelectAll: this.state.checkAll ? 1 : 0,
       id: record.id,
       SelectOne: e.target.checked ? 1 : 0
      }
      ConsultInfoReconstructionService.selectChange(data)
      .then((res) => {
        this.getListData();
      })
      .catch((error) => {
      })
      .finally(() => {});
  
 
  
  }
  render() {
    return (
      <div className="consult-info-reconstruction">
        <Form
          ref={this.formRef}
          initialValues={{
            DateFChars: moment(),
            DateTChars: moment(),
            TargetSegment: "0",
            UpdateClassify: 0,
            BranchStoreCodeT: "9999",
            StsCourseAmount: true,
          }}
          onFinish={this.onFinish}
        >
          <Input.Group style={{ display: "none" }}>
            <Form.Item name="ContractType">
              <Input />
            </Form.Item>
            <Form.Item name="ContractOrgCode">
              <Input />
            </Form.Item>
            <Form.Item name="ContractStartDate">
              <Input />
            </Form.Item>
            <Form.Item name="ContractNum">
              <Input />
            </Form.Item>
            <Form.Item name="TargetSegment">
              <Input />
            </Form.Item>
            <Form.Item name="UpdateClassify">
              <Input />
            </Form.Item>
            <Form.Item name="BranchStoreCodeT">
              <Input />
            </Form.Item>
          </Input.Group>
          <Row>
            <Col span={7}>
              <Card
                className="mb-3"
                style={{ width: "98%", paddingRight: "0px" }}
              >
                <Space>
                  <Form.Item name="DateFChars" label="受診日">
                    <VenusDatePickerCustom
                      formRefDatePicker={this.formRef}
                      format={dateFormat}
                      onChange={() => {
                        this.checkDateStart();
                      }}
                    />
                  </Form.Item>
                  <Form.Item>~</Form.Item>
                  <Form.Item name="DateTChars" label=" ">
                    <VenusDatePickerCustom
                      formRefDatePicker={this.formRef}
                      format={dateFormat}
                      onBlur={() => {
                        this.checkDateEnd();
                      }}
                    />
                  </Form.Item>
                </Space>
                <Row>
                  <Space>
                    <Form.Item name="OfficeCode" label="事業所">
                      <Input.Search
                        style={{ width: "120px", textAlign: "right" }}
                        onChange={(e) => {
                          if (
                            !this.formRef.current.getFieldValue("OfficeCode")
                          ) {
                            this.formRef.current.setFieldsValue({
                              OfficeCode: "",
                              // BranchStoreCodeF: "",
                              office_kanji_name: "",
                            });
                            this.setState({ disabled: false });
                          }
                        }}
                        onBlur={(e) => {
                          this.changeOfficeCode(e.target.value);
                        }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1200,
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  onFinishScreen={(data) => {
                                    this.formRef.current.setFieldsValue({
                                      OfficeCode: data.Lio_OfficeCode,
                                      BranchStoreCodeF:
                                        data.Lio_BranchStoreCode === 0
                                          ? null
                                          : data.Lio_BranchStoreCode,
                                      office_kanji_name:
                                        data.recordData.office_kanji_name,
                                    });
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
                      />
                    </Form.Item>
                    <Form.Item name="BranchStoreCodeF">
                      <Input
                        style={{ width: "60px", textAlign: "right" }}
                        disabled={!this.state.disabled}
                      />
                    </Form.Item>
                    <Form.Item name="office_kanji_name">
                      {/* {this.formRef.current?.getFieldValue(
                        "office_kanji_name"
                      ) ? (
                        <span>
                          {this.formRef.current?.getFieldValue(
                            "office_kanji_name"
                          )}
                        </span>
                      ) : null} */}
                      <Input style={{ border: "none" }} readOnly />
                    </Form.Item>
                  </Space>
                </Row>
                <Row>
                  <Col span={9}>
                    <Form.Item name="Course" label="コース">
                      <Input.Search
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1200,
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(data) => {
                                    this.formRef.current.setFieldsValue({
                                      Course: data.Lo_CourseCode,
                                    });
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
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Form.Item label="契　約">
                      <Button
                        type="primary"
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "80%",
                              component: (
                                <WS0275001_ContractQuerySelect
                                  Li_SpecifyCourse={this.formRef.current.getFieldValue(
                                    "Course"
                                  )}
                                  onFinishScreen={(data) => {
                                    this.formRef.current.setFieldsValue({
                                      ContractType: data.Lo_ContractType,
                                      ContractOrgCode: data.Lo_ContractOrgCode,
                                      ContractStartDate:
                                        data.Lo_ContractStartDate,
                                      ContractNum: data.Lo_ContractNum,

                                      contract_short_name:
                                        data.recordData?.contract_short_name,
                                    });
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
                        選択
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item name="contract_short_name">
                      <div style={{ margin: "0.5em 0 0 0.5em" }}>
                        {this.formRef.current?.getFieldValue(
                          "contract_short_name"
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Space>
                      <Button
                        icon={<PlusCircleFilled />}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 650,
                              component: (
                                <WS2786001_ConditionAddSub
                                  Li_DateF={this.formRef.current.getFieldValue(
                                    "DateFChars"
                                  )}
                                  Li_DateT={this.formRef.current.getFieldValue(
                                    "DateTChars"
                                  )}
                                  // Li_AcceptNoF={this.formRef.current.getFieldValue('')}
                                  // Li_AcceptNoT={this.formRef.current.getFieldValue('')}
                                  Li_CourseF={this.formRef.current.getFieldValue(
                                    "Course"
                                  )}
                                  Li_CourseT={this.formRef.current.getFieldValue(
                                    "Course"
                                  )}
                                  // Li_TimeDivision={this.formRef.current.getFieldValue('')}
                                  // Li_FacilityType={this.formRef.current.getFieldValue('')}
                                  // Li_State={this.formRef.current.getFieldValue('')}
                                  // Li_Insurer={this.formRef.current.getFieldValue('')}
                                  Li_Office={this.formRef.current.getFieldValue(
                                    "OfficeCode"
                                  )}
                                  Li_BranchShop={this.formRef.current.getFieldValue(
                                    "BranchStoreCodeF"
                                  )}
                                  // Li_PersonalNum={this.formRef.current.getFieldValue('')}
                                  // Lio_KeyInfo={this.formRef.current.getFieldValue('')}
                                  onFinishScreen={(obj) => {
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
                        条件追加
                      </Button>
                      <Button
                        icon={<SearchOutlined />}
                        onClick={() => {
                          this.handleSearch();
                        }}
                        loading={this.state.isLoadingSearch}
                      >
                        検　索
                      </Button>
                    </Space>
                  </Col>
                </Row>
                <br/>
                <Row style={{ marginRight: "1rem" }}>
                <Col span={6} style={{ marginLeft: "1em" }}>
                  <Form.Item name="UpdateClassify">
                    <Radio.Group>
                      <Form.Item>
                        <Radio value={0}>全て</Radio>
                      </Form.Item>
                      <Form.Item>
                        <Radio value={1}>検査のみ</Radio>
                      </Form.Item>
                      <Form.Item>
                        <Radio value={2}>請求のみ</Radio>
                      </Form.Item>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={14}>
                  <Form.Item name="StsCourseAmount" valuePropName="checked">
                    <Checkbox>コース金額を再取得する</Checkbox>
                  </Form.Item>
                  <Form.Item name="StsOptionAmount" valuePropName="checked">
                    <Checkbox>オプション金額を再取得する</Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="StsContractStartDateChange"
                    valuePropName="checked"
                  >
                    <Checkbox>契約開始日を再取得する</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item style={{ float: "right" }}>
                    <Button
                      type="primary"
                      loading={this.state.isLoadingRedeploy}
                      onClick={() => this.Redeploy_F12()}
                    >
                      再展開
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              </Card>

            </Col>
            <Col span={17}>
              <Table
                dataSource={this.formRef.current?.getFieldValue("tableData")}
                rowKey={(record) => record.id}
                size="small"
                scroll={{ x: 1300 }}
                loading={this.state.isLoadingTable}
                pagination={false}
              >
                <Table.Column
                  title={
                    <Form.Item name="SelectAll" valuePropName="checked">
                      <Checkbox
                        onChange={(e) => {
                          const formIns = this.formRef.current;
                          const toVal = e.target.checked;
                          formIns
                            .getFieldValue("tableData")
                            ?.forEach((element, index) => {
                              formIns.setFields([
                                {
                                  name: ["tableData", index, "W1_run_flg"],
                                  value: toVal,
                                },
                              ]);
                            });
                          this.selectChangeAll(e);
                        }}
                      />
                    </Form.Item>
                  }
                  dataIndex="W1_run_flg"
                  render={(value, record, index) => (
                    <>
                      <Form.Item
                        name={["tableData", index, "id"]}
                        style={{ display: "none" }}
                      >
                        <Checkbox />
                      </Form.Item>
                      <Form.Item
                        name={["tableData", index, "W1_run_flg"]}
                        valuePropName="checked"
                      >
                        <Checkbox
                           onChange={(e) => {
                            this.selectChangeOne(e,record);
                          }}
                        />
                      </Form.Item>
                    </>
                  )}
                />
                <Table.Column
                  title="入金"
                  key="Expression_17"
                  render={(value, record) =>
                    record.W1_payment_enab_flg ? "○" : ""
                  }
                />
                <Table.Column
                  title="状態"
                  key="Expression_26"
                  render={(value, record) => {
                    if (record.W1_state_flg === 0) {
                      return <span>予約</span>;
                    } else if (record.W1_state_flg === 1) {
                      return <span>受付</span>;
                    } else if (record.W1_state_flg === 2) {
                      return <span>保留</span>;
                    } else if (record.W1_state_flg === 3) {
                      return <span>待ち</span>;
                    } else {
                      return <span></span>;
                    }
                  }}
                />
                <Table.Column
                  title="受診日"
                  dataIndex="W1_consult_date"
                  render={(value, record, index) => (
                    <Form.Item>
                      <span>
                        {moment(record.W1_consult_date).format("YYYY/MM/DD")}
                      </span>
                    </Form.Item>
                  )}
                />
                <Table.Column
                  title="個人番号"
                  dataIndex="W1_person_num_id"
                  render={(value, record, index) => (
                    <Form.Item style={{ textAlign: "right" }}>
                      <span>{record.W1_person_num_id}</span>
                    </Form.Item>
                  )}
                />
                <Table.Column
                  title="メモ"
                  key="Expression_29"
                  dataIndex={["personal_specials", "importance"]}
                  render={(text, record) => {
                    let icon = null;
                    switch (record?.personal_special?.importance) {
                      case 1:
                        icon = (
                          <InfoCircleOutlined
                            style={{ fontSize: 20, color: "#1890ff" }}
                          />
                        );
                        break;

                      case 3:
                        icon = (
                          <WarningOutlined
                            style={{ fontSize: 20, color: "#faad14" }}
                          />
                        );
                        break;

                      case 5:
                        icon = (
                          <CloseCircleOutlined
                            style={{ fontSize: 20, color: "#ff4d4f" }}
                          />
                        );
                        break;

                      default:
                        icon = <MoreOutlined style={{ fontSize: 20 }} />;
                    }
                    return (
                      <Button
                        onClick={() =>
                          this.showPersonalInfoInquirySub(
                            record.W1_person_num_id
                          )
                        }
                        icon={icon}
                        disabled={
                          !(
                            record.W1_person_num_id &&
                            record.W1_person_num_id !== ""
                          )
                        }
                        size="small"
                      />
                    );
                  }}
                />
                <Table.Column
                  title="氏　名"
                  key="Expression_14"
                  render={(value, record, index) => {
                    if (record.StsPersonalInfoBasic) {
                      return <span>{record.personal_basic?.kanji_name}</span>;
                    } else {
                      return (
                        <span>{record.application_attribute?.kanji_name}</span>
                      );
                    }
                  }}
                />
                <Table.Column
                  title="事業所情報"
                  dataIndex={["office", "office_kanji_name"]}
                />
                <Table.Column
                  title="契約情報"
                  dataIndex={["contract_term"]}
                  render={(objData) => {
                    let medical_exam_course = objData?.medical_exam_course
                      ? objData?.medical_exam_course
                      : "";
                    let contract_short_name = objData?.contract_short_name
                      ? objData?.contract_short_name
                      : "";
                    return medical_exam_course + "   " + contract_short_name;
                  }}
                />
                <Table.Column
                  title="検査"
                  dataIndex="InspectDifference"
                  render={(value, record, index) => (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => this.ShowInspectChanges(record)}
                    >
                      {value}
                    </span>
                  )}
                />
                <Table.Column title="金額" dataIndex="AmountDifference" />
                <Table.Column
                  title="契約金額"
                  dataIndex="contract_term"
                  render={(objData) => (
                    <Form.Item style={{ textAlign: "right" }}>
                      {new Intl.NumberFormat().format(
                        objData?.insurer_total_price ||
                          0 + objData?.office_total_price ||
                          0 + objData?.organization_total_price ||
                          0 + objData?.personal_1_total_price ||
                          0 + objData?.personal_2_total_price ||
                          0 + objData?.personal_3_total_price ||
                          0
                      ) === "0"
                        ? ""
                        : new Intl.NumberFormat().format(
                            objData?.insurer_total_price ||
                              0 + objData?.office_total_price ||
                              0 + objData?.organization_total_price ||
                              0 + objData?.personal_1_total_price ||
                              0 + objData?.personal_2_total_price ||
                              0 + objData?.personal_3_total_price ||
                              0
                          )}
                    </Form.Item>
                  )}
                />
                <Table.Column
                  title="コース金額"
                  dataIndex="personal_exam_change_content1"
                  render={(objData) => (
                    <Form.Item style={{ textAlign: "right" }}>
                      {new Intl.NumberFormat().format(
                        objData?.insurer_total_price ||
                          0 + objData?.office_total_price ||
                          0 + objData?.organization_total_price ||
                          0 + objData?.personal_1_total_price ||
                          0 + objData?.personal_2_total_price ||
                          0 + objData?.personal_3_total_price ||
                          0
                      ) === "0"
                        ? ""
                        : new Intl.NumberFormat().format(
                            objData?.insurer_total_price ||
                              0 + objData?.office_total_price ||
                              0 + objData?.organization_total_price ||
                              0 + objData?.personal_1_total_price ||
                              0 + objData?.personal_2_total_price ||
                              0 + objData?.personal_3_total_price ||
                              0
                          )}
                    </Form.Item>
                  )}
                />
                <Table.Column
                  title="請求金額"
                  dataIndex="personal_exam_change_content2"
                  render={(objData) => (
                    <Form.Item style={{ textAlign: "right" }}>
                      {new Intl.NumberFormat().format(
                        objData?.insurer_total_price ||
                          0 + objData?.office_total_price ||
                          0 + objData?.organization_total_price ||
                          0 + objData?.personal_1_total_price ||
                          0 + objData?.personal_2_total_price ||
                          0 + objData?.personal_3_total_price ||
                          0
                      ) === "0"
                        ? ""
                        : new Intl.NumberFormat().format(
                            objData?.insurer_total_price ||
                              0 + objData?.office_total_price ||
                              0 + objData?.organization_total_price ||
                              0 + objData?.personal_1_total_price ||
                              0 + objData?.personal_2_total_price ||
                              0 + objData?.personal_3_total_price ||
                              0
                          )}
                    </Form.Item>
                  )}
                />
                <Table.Column
                  title="事業所コード"
                  render={(row) => {
                    return (
                      <Form.Item style={{ textAlign: "center" }}>
                        <span>
                          {row?.W1_office_cd + " - " + row?.W1_branch_store_cd}
                        </span>
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  title="契約番号"
                  render={(row) =>
                    row.W1_contract_type +
                    "-" +
                    row.W1_contract_org_cd +
                    "-" +
                    moment(row.W1_contract_start_date).format("YYYYMMDD") +
                    "-" +
                    row.W1_contract_num
                  }
                />
              </Table>
            </Col>
          </Row>
        </Form>
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

export default WS0335001_ConsultInfoReconstruction;
