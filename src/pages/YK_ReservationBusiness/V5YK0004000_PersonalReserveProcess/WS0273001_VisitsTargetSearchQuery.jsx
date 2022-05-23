import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Row,
  Col,
  DatePicker,
  Space,
  Modal,
  message,
} from "antd";

import {
  PlusCircleOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry";
import WS2786001_ConditionAddSub from "pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub";

import moment from "moment";
import VisitsTargetSearchQueryService from "services/ReservationBusiness/PersonalReserveProcess/VisitsTargetSearchQueryService";
import Color from "constants/Color";
class WS0273001_VisitsTargetSearchQuery extends React.Component {
  static propTypes = {
    LnkOutReserveNum: PropTypes.any,
    Li_StateFlagSpecify: PropTypes.any,

    Li_DateSpecify: PropTypes.any,
    Li_StsConditionSpecify: PropTypes.any,

    Li_StsReceiptAmountDisplay: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "受診対象者検索・照会";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      loading: false,
      selectedRows: {},
      colorConditionAddBtn: 163,
    };
  }

  componentDidMount = () => {
    this.formRef.current.setFieldsValue({
      DateFChar:
        this.props.Li_StsConditionSpecify && this.props.Li_DateSpecify > 0
          ? this.props.Li_DateSpecify
          : moment(),
      DateTChar:
        this.props.Li_StsConditionSpecify && this.props.Li_DateSpecify > 0
          ? this.props.Li_DateSpecify
          : moment(),
    });
    this.forceUpdate();
    this.onChangeFilter();
  };

  onChangeFilter = () => {
    const {
      DateFChar,
      DateTChar,
      CourseCodeF,
      CourseCodeT,
      FacilityType,
      OfficeCode,
      BranchStoreCodeF,
      PersonalNum,
      KeyNum,

      // ReceiptNumF,
      // ReceiptNumT,
      // Am_Pm,
      // StateFlag,
    } = this.formRef.current.getFieldsValue(true);
    this.setState({ selectedRows: {}, loading: true });
    VisitsTargetSearchQueryService.filterSearchQueryService({
      DateFChar:
        DateFChar > DateTChar
          ? moment(DateTChar).format("YYYY/MM/DD")
          : moment(DateFChar).format("YYYY/MM/DD"),
      DateTChar: moment(DateTChar).format("YYYY/MM/DD"),
      PersonalNum: PersonalNum,
      OfficeCode: OfficeCode,
      BranchStoreCodeF: BranchStoreCodeF,
      CourseCodeF: CourseCodeF,
      CourseCodeT: CourseCodeT,
      FacilityType: FacilityType,
      KeyNum: KeyNum,

      // ReceiptNumF: ReceiptNumF,
      // ReceiptNumT: ReceiptNumT,
      // Am_Pm: Am_Pm,
      // StateFlag: StateFlag,
    })
      .then((res) => {
        console.log(res);
        this.setState({ loading: false });
        this.formRef.current.setFieldsValue({
          ...res.data,
        });
        this.forceUpdate();
      })
      .catch((err) => {
        this.formRef.current.setFieldsValue({
          DisplayList: [],
        });
        this.forceUpdate();
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ loading: false }));
    this.formRef.current.setFieldsValue({
      DateFChar: DateFChar > DateTChar ? DateTChar : DateFChar,
    });
  };

  onFinish = (values) => {};

  render() {
    return (
      <div className="visits-target-search-query">
        <Card title="受診対象者検索・照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            size="small"
            initialValues={{
              FacilityType: 0,
              KeyNum: 'カナ順',
            }}
          >
            <Row gutter={12}>
              <Col
                span={7}
                style={{ border: "1px solid #f0f0f0", padding: "0.5em" }}
              >
                <Row>
                  <Col span={12}>
                    <Form.Item name="DateFChar" label="受診日">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        className="w-100"
                        allowClear={false}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1} style={{ textAlign: "center" }}>
                    ~
                  </Col>
                  <Col span={8}>
                    <Form.Item name="DateTChar">
                      <VenusDatePickerCustom formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        className="w-100"
                        allowClear={false}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row wrap={false}>
                  <Col style={{ display: "flex" }}>
                    <Form.Item
                      name="PersonalNum"
                      style={{ width: "180px" }}
                      label="個　人"
                    >
                      <Input.Search
                        maxLength={10}
                        style={{ textAlign: "right" }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1500,
                              component: (
                                <WS0248001_PersonalInfoSearchQuery
                                  onFinishScreen={({
                                    Lo_PersonalNumId,
                                    recordData,
                                  }) => {
                                    this.formRef.current.setFieldsValue({
                                      PersonalNum: Lo_PersonalNumId,
                                      kanji_name: recordData.kanji_name,
                                    });
                                    this.forceUpdate();
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
                  <Col flex="auto">
                    <Form.Item>
                      <div style={{ paddingLeft: "10px" }}>
                        {this.formRef.current
                          ? this.formRef.current.getFieldValue("kanji_name")
                          : ""}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row wrap={false}>
                  <Col>
                    <Form.Item
                      name="OfficeCode"
                      label="事業所"
                      style={{ width: "130px" }}
                    >
                      <Input style={{ textAlign: "right" }} maxLength={8} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      name="BranchStoreCodeF"
                      style={{ width: "80px" }}
                    >
                      <Input.Search
                        maxLength={5}
                        style={{ textAlign: "right" }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1200,
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  getDataOfficeInfoRetrievalQuery={({
                                    office_code,
                                    branch_store_code,
                                    office_kanji_name,
                                  }) => {
                                    this.formRef.current.setFieldsValue({
                                      OfficeCode: office_code,
                                      BranchStoreCodeF: branch_store_code,
                                      office_kanji_name: office_kanji_name,
                                    });
                                    this.forceUpdate();
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
                  <Col flex="auto">
                    <Form.Item>
                      <div style={{ paddingLeft: "10px" }}>
                        {this.formRef.current
                          ? this.formRef.current.getFieldValue(
                              "office_kanji_name"
                            )
                          : ""}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item label="コース">
                    <Row>
                      <Col span={7}>
                        <Form.Item name="CourseCodeF">
                          <Input.Search
                            onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1200,
                                  component: (
                                    <WS0265001_BasicCourseInquiry
                                      onFinishScreen={({ Lo_CourseCode }) => {
                                        this.formRef.current.setFieldsValue({
                                          CourseCodeF: Lo_CourseCode,
                                        });
                                        this.forceUpdate();
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
                      <Col span={2} style={{ textAlign: "center" }}>
                        <span>~</span>
                      </Col>
                      <Col span={7}>
                        <Form.Item name="CourseCodeT">
                          <Input.Search
                            onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1200,
                                  component: (
                                    <WS0265001_BasicCourseInquiry
                                      onFinishScreen={({ Lo_CourseCode }) => {
                                        this.formRef.current.setFieldsValue({
                                          CourseCodeT: Lo_CourseCode,
                                        });
                                        this.forceUpdate();
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
                  </Form.Item>
                </Row>
                <Row>
                  <Col span={19}>
                    <Form.Item name="FacilityType" label="施　設">
                      <Select>
                        {this.formRef.current
                          ? this.formRef.current.getFieldValue(
                              "FacilityTypeList"
                            )
                            ? this.formRef.current
                                .getFieldValue("FacilityTypeList")
                                .map((item, index) => {
                                  return (
                                    <Select.Option
                                      value={item.LinkedField}
                                      key={index}
                                    >
                                      {item.DisplayField}
                                    </Select.Option>
                                  );
                                })
                            : null
                          : null}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={19}>
                    <Form.Item name="KeyNum" label="表示順">
                      <Select>
                        {this.formRef.current
                          ? this.formRef.current.getFieldValue("KeyNumList")
                            ? this.formRef.current
                                .getFieldValue("KeyNumList")
                                .map((item, index) => {
                                  return (
                                    <Select.Option
                                      value={item.LinkedField}
                                      key={index}
                                    >
                                      {item.DisplayField}
                                    </Select.Option>
                                  );
                                })
                            : null
                          : null}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Space>
                      <Button
                        icon={<PlusCircleOutlined />}
                        style={{ color: "#1166BB" }}
                        onClick={() => {
                          const {
                            DateFChar,
                            DateTChar,
                            CourseCodeF,
                            CourseCodeT,
                            FacilityType,
                            OfficeCode,
                            BranchStoreCodeF,
                            PersonalNum,
                            KeyNum,
                          } = this.formRef.current.getFieldsValue(true);
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 600,
                              component: (
                                <WS2786001_ConditionAddSub
                                  Li_DateF={DateFChar}
                                  Li_DateT={DateTChar}
                                  Li_CourseF={CourseCodeF}
                                  Li_CourseT={CourseCodeT}
                                  Li_FacilityType={FacilityType}
                                  Li_Office={OfficeCode}
                                  Li_BranchShop={BranchStoreCodeF}
                                  Li_PersonalNum={PersonalNum}
                                  Lio_KeyInfo={KeyNum}
                                  Li_Insurer={""}
                                  Li_KeySerialNumF={""}
                                  Li_KeySerialNumT={""}
                                  onFinishScreen={({
                                    Lio_KeyInfo,
                                    Expression_36,
                                  }) => {
                                    if (Lio_KeyInfo && Expression_36) {
                                      this.formRef.current.setFieldsValue({
                                        KeyNum: Lio_KeyInfo,
                                      });
                                      this.forceUpdate();
                                      this.setState({
                                        colorConditionAddBtn: Expression_36,
                                      });
                                    }
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
                        <span
                          style={{
                            color: Color(this.state.colorConditionAddBtn)
                              .Foreground,
                          }}
                        >
                          条件追加
                        </span>
                      </Button>
                      <Button
                        icon={<SearchOutlined />}
                        style={{
                          color: Color(163).Foreground,
                        }}
                        onClick={() => this.onChangeFilter()}
                      >
                        検&emsp;&emsp;索
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Col>

              <Col span={17}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue("DisplayList")
                      : []
                  }
                  rowKey={(record) => record.id}
                  loading={this.state.loading}
                >
                  <Table.Column
                    title="状態"
                    dataIndex="Expression_10"
                    render={(text) => (
                      <span
                        style={{
                          color:
                            text === "受付"
                              ? "red"
                              : text === "予約"
                              ? "blue"
                              : "black",
                        }}
                      >
                        {text}
                      </span>
                    )}
                  />
                  <Table.Column
                    title="受診日"
                    dataIndex="visit_date_on"
                    key=""
                    render={(text) => (
                      <>{text ? moment(text).format("YYYY/MM/DD") : ""}</>
                    )}
                  />
                  <Table.Column
                    title="時間"
                    dataIndex="period_time"
                    render={(text) => (
                      <>{text ? moment(text, "HH:mm").format("HH:mm") : ""}</>
                    )}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>個人番号</div>}
                    dataIndex="personal_number_id"
                    key=""
                    align="right"
                  />
                  <Table.Column
                    title="メモ"
                    dataIndex="Expression_23"
                    render={(text, record) => {
                      let icon = "";
                      switch (text) {
                        case 1:
                          icon = (
                            <InfoCircleOutlined
                              style={{
                                color: "#1890ff",
                              }}
                            />
                          );
                          break;
                        case 3:
                          icon = (
                            <WarningOutlined style={{ color: "#faad14" }} />
                          );
                          break;
                        case 5:
                          icon = (
                            <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                          );
                          break;
                        default:
                          icon = <MoreOutlined />;
                      }
                      return (
                        <Button
                          icon={icon}
                          onClick={() => {
                            let title = '個人情報照会SUB' + ' [' + record.personal_number_id + ']'
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (
                                  <Card title={title}>
                                    <WS2584019_PersonalInfoInquirySub
                                      Li_PersonalNum={record.personal_number_id}
                                    />
                                  </Card>
                                ),
                              },
                            });
                          }}
                        ></Button>
                      );
                    }}
                  />
                  <Table.Column title="氏名" dataIndex="Expression_17" />
                  <Table.Column
                    title="性別"
                    dataIndex="Expression_18"
                    render={(text) => (
                      <span
                        style={{
                          color:
                            text === "女性"
                              ? "red"
                              : text === "男性"
                              ? "blue"
                              : "black",
                        }}
                      >
                        {text}
                      </span>
                    )}
                  />
                  <Table.Column title="年齢" dataIndex="Expression_21" />
                  <Table.Column
                    title="生年月日"
                    dataIndex="Expression_20"
                    render={(text) => <>{moment(text).format("NNy/MM/DD")}</>}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>受付No</div>}
                    dataIndex="receipt_number"
                    align="right"
                  />
                  <Table.Column
                    title="事業所情報"
                    dataIndex="office_kanji_name"
                  />
                  <Table.Column
                    title="契約情報"
                    dataIndex="visit_course"
                    render={(text, record) => (
                      <span>{text + " " + record.contract_short_name}</span>
                    )}
                  />
                  <Table.Column
                    title=""
                    dataIndex=""
                    render={(text, record, index) => (
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                          if (this.props.onFinishScreen) {
                            this.props.onFinishScreen({
                              LnkOutReserveNum: record.reservation_number,
                              recordData: record,
                            });
                          }
                        }}
                      >
                        選択
                      </Button>
                    )}
                  />
                </Table>
              </Col>
            </Row>
          </Form>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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
)(WS0273001_VisitsTargetSearchQuery);
