import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Input,
  Radio,
  Select,
  Checkbox,
  Button,
  Table,
  Row,
  Col,
  DatePicker,
  Modal,
  message,
} from "antd";
import WS2535011_Verification from "./WS2535011_Verification.jsx";
import WS2553003_PeriodTimeInquiry from "../V5YK0001000_ReserveStatusSearch/WS2553003_PeriodTimeInquiry.jsx";
import WS0247001_OfficeInfoRetrievalQuery from "../../BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx";
import WS0605127_ContractLineItemDisplay from "../../BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay.jsx";
import WS2585001_OfficeInfoInquirySub from "../V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub.jsx";
import WS0289012_ContractInfoInquiry from "../V5YK0002000_GroupBookings/WS0289012_ContractInfoInquiry.jsx";
import { MoreOutlined } from "@ant-design/icons";

import moment from "moment";
import FrameReserveService from "services/ReservationBusiness/FrameReserve/FrameReserveService";
import WS2580001_ScheduleChange from "../V5YK0001000_ReserveStatusSearch/WS2580001_ScheduleChange.jsx";

class WS2535001_FrameReserve extends React.Component {
  Li_ReserveDate;
  static propTypes = {
    Li_ReserveDate: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "枠取予約";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      WakutoAtPage: [],
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });
    console.log("this.props.Li_ReserveDate", this.props.Li_ReserveDate);
    FrameReserveService.getScreenDataService({
      Li_Years: this.props.Li_ReserveDate
        ? moment(this.props.Li_ReserveDate).format("YYYY/MM/DD")
        : moment().format("YYYY/MM/DD"),
    })
      .then((res) => {
        console.log(res.data);
        this.formRef.current.setFieldsValue({
          ...res.data,
          WakutoYearsChar: this.props.Li_ReserveDate
            ? moment(this.props.Li_ReserveDate)
            : moment(),
        });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  onChangeFilter = () => {
    console.log("Vo day", this.formRef.current.getFieldsValue());
    this.setState({ isLoading: true });
    const {
      WakutoYearsChar,
      FacilityNum,
      TimeZone,
      ReserveDisplayItems,
      SkyRealWakuto,
      StsFrameAlreadySet,
      Course,
    } = this.formRef.current.getFieldsValue();
    FrameReserveService.getScreenDataService({
      Li_Years: moment(WakutoYearsChar).format("YYYY/MM/DD"),
      Li_FacilityType: FacilityNum,
      Li_TimeDivision: TimeZone,
      Li_ReserveDisplayItems: ReserveDisplayItems,
      Li_SkyReal: SkyRealWakuto,
      Li_StsAlreadySet: StsFrameAlreadySet,
      Course: Course,
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          Wakuto: res.data.Wakuto,
          StsFrameAlreadySet: false,
        });
        this.forceUpdate();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  onUpdateChangeWakuto = (indexUpdate) => {
    let Wakuto = this.formRef.current
      .getFieldValue("Wakuto")
      .map((item, index) => {
        if (indexUpdate === index) {
          return { ...item, change: "true" };
        }
        return item;
      });

    this.formRef.current.setFieldsValue({ Wakuto: Wakuto });

    this.forceUpdate();
  };
  onChangeStsFrameAlreadySet = () => {
    if (this.formRef.current.getFieldValue("StsFrameAlreadySet") === true) {
      this.setState({
        WakutoAtPage: this.formRef.current.getFieldValue("Wakuto"),
      });
      let isWakuto = this.formRef.current.getFieldValue("Wakuto")
        ? this.formRef.current.getFieldValue("Wakuto").filter((item) => {
          if (item.change === "true") return item;
        })
        : [];
      this.formRef.current.setFieldsValue({ Wakuto: isWakuto });
    } else {
      this.formRef.current.setFieldsValue({ Wakuto: this.state.WakutoAtPage });
      this.setState({
        WakutoAtPage: [],
      });
    }
    this.forceUpdate();
  };

  checkTimeZone(value = "08:30") {
    var arr = value.split(":");
    if (parseInt(arr[0]) >= 12) {
      if (parseInt(arr[1]) > 0) {
        return "PM"
      }
    }
    return "AM"
  }

  onFinish = () => {
    const {
      WakutoYearsChar,
      FacilityNum,
      TimeZone,
      ReserveDisplayItems,
      SkyRealWakuto,
      StsFrameAlreadySet,
      Wakuto,
    } = this.formRef.current.getFieldsValue();
    let isWakuto = Wakuto.filter((item) => {
      if (item.change === "true") return item;
    });

    if (isWakuto.length > 0) {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 700,
          component: (
            <WS2535011_Verification
              Li_Years={WakutoYearsChar}
              Li_FacilityType={FacilityNum}
              Li_TimeDivision={TimeZone}
              Li_ReserveDisplayItems={ReserveDisplayItems}
              Li_SkyReal={SkyRealWakuto}
              Li_StsAlreadySet={StsFrameAlreadySet}
              Wakuto={isWakuto}
              onScreenFinish={(data) => {
                if (data.Lo_StsConfirm === true) {
                  console.log("Finish", data.Lo_StsConfirm);
                  this.onChangeFilter();
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
    } else {
      Modal.error({
        title: "Error",
        content: `枠取の人数を設定してください`,
      });
    }
  };

  render() {
    return (
      <div className="frame-reserve">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            Gender: 0,
            SkyRealWakuto: 0,
            StsFrameAlreadySet: 0,
            FacilityNum: 1,
            TimeZone: '08:30'
          }}
        >
          <Row gutter={16}>
            <Col xl={6} lg={10} sm={24}>
              <Card>
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item
                      name="OfficeCode"
                      label="事業所"
                      rules={[{ required: true }]}
                      style={{ marginLeft: "-10px" }}
                      onChange={() => {
                        this.onChangeFilter();
                        this.forceUpdate();
                      }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="BranchStoreCode" label="">
                      <Input.Search
                        onChange={() => {
                          this.onChangeFilter();
                          this.forceUpdate();
                        }}
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
                                    console.log(
                                      office_code,
                                      branch_store_code,
                                      office_kanji_name
                                    );
                                    const formInstance = this.formRef.current;
                                    formInstance.setFieldsValue({
                                      OfficeCode: office_code,
                                      BranchStoreCode: branch_store_code,
                                      office_kanji_name: office_kanji_name,
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
                  <Col span={2}>
                    <Button
                      disabled={
                        this.formRef.current?.getFieldValue("OfficeCode")
                          ? this.formRef.current.getFieldValue("OfficeCode")
                            ? false
                            : true
                          : true
                      }
                      icon={<MoreOutlined />}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 700,
                            component: (
                              <WS2585001_OfficeInfoInquirySub
                                Li_OfficeCode={this.formRef.current?.getFieldValue(
                                  "OfficeCode"
                                )}
                                Li_BranchCode={this.formRef.current.getFieldValue(
                                  "BranchStoreCode"
                                )}
                                onFinishScreen={() => {
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
                    ></Button>
                  </Col>
                </Row>

                <Form.Item label=" " labelCol={{ span: 4 }}>
                  <span>
                    {this.formRef.current
                      ? this.formRef.current.getFieldValue("office_kanji_name")
                      : ""}
                  </span>
                </Form.Item>

                <Form.Item name="WakutoYearsChar" label="年　月">
                  {/* <Input type="text" style={{width : '100px'}} /> */}
                  <VenusDatePickerCustom formRefDatePicker={this.formRef}
                    onChange={() => this.onChangeFilter()}
                    picker="month"
                    format="YYYY年MM月"
                    allowClear={false}
                  />
                </Form.Item>
                <Form.Item name="TimeZone" label="時間帯">
                  <Input
                    type="text"
                    autoComplete="off"
                    // readOnly
                    style={{ width: "70px" }}
                    onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 400,
                          component: (
                            <WS2553003_PeriodTimeInquiry
                              onFinishScreen={(obj) => {
                                this.formRef.current.setFieldsValue({
                                  TimeZone: obj.Lio_TimeZone,
                                });
                                this.onChangeFilter();
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
                <Form.Item name="FacilityNum" label="施　設">
                  <Select onChange={() => this.onChangeFilter()}>
                    {this.formRef.current
                      ? this.formRef.current.getFieldValue(
                        "SelectListFacilityNum"
                      )
                        ? this.formRef.current
                          .getFieldValue("SelectListFacilityNum")
                          .map((item, index) => {
                            return (
                              <Select.Option
                                value={item.facility_type}
                                key={index}
                              >
                                {item.facility_name}
                              </Select.Option>
                            );
                          })
                        : null
                      : null}
                  </Select>
                </Form.Item>

                <Form.Item name="Gender" label="性　別">
                  <Select
                    onChange={() => this.onChangeFilter()}
                    style={{ width: "100px" }}
                  >
                    <Select.Option value={0}> </Select.Option>
                    <Select.Option value={1}>男性</Select.Option>
                    <Select.Option value={2}>女性</Select.Option>
                  </Select>
                </Form.Item>
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item
                      name="Course"
                      label="コース"
                      rules={[{ required: true }]}
                      style={{ marginLeft: "-10px" }}
                    >
                      <Input.Search
                        type="text"
                        onChange={() => {
                          this.setState({
                            Li_ContractType: "",
                            Li_ContractOrgCode: "",
                            Li_ContractStartDate: "",
                            Li_ContractNum: "",
                          });
                          this.formRef?.current?.setFieldsValue({ contract_short_name: '' });
                          this.forceUpdate();
                        }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1200,
                              component: (

                                < WS0289012_ContractInfoInquiry
                                  Li_State={0}
                                  Li_EffectiveLimitedDisplay={1}
                                  Lio_ConsultCourse={this.formRef.current.getFieldValue("Course") ?? ""}
                                  Li_OfficeCode={this.formRef.current.getFieldValue("OfficeCode") ?? ""}
                                  Li_BranchStoreCode={this.formRef.current.getFieldValue("BranchStoreCode") ?? 0}
                                  Li_Date={moment(this.formRef.current.getFieldValue("WakutoYearsChar")).format("YYYY/MM/01")}
                                  Li_Gender={this.formRef.current.getFieldValue("Gender") ?? 0}
                                  Li_DateBirth={""}
                                  Li_Relationship={""}
                                  Li_HospitalOut={1}
                                  Li_Am_Pm={this.checkTimeZone(this.formRef.current.getFieldValue("TimeZone"))}
                                  Li_NTsugikenmi={""}
                                  Li_Other={""}
                                  Lio_ContractType={0}
                                  Lio_ContractOrgCode={""}
                                  Lio_ContractStartDate={""}
                                  Lio_ContractNum={0}
                                  Lo_Status={0}
                                  Lo_ErrorMessage={""}
                                  onFinishScreen={({
                                    Lio_ConsultCourse,
                                    Lo_ContractType,
                                    Lo_ContractOrgCode,
                                    Lo_ContractStartDate,
                                    Lo_ContractNum,
                                    recordData
                                  }) => {
                                    this.setState({
                                      Li_ContractType: Lo_ContractType,
                                      Li_ContractOrgCode: Lo_ContractOrgCode,
                                      Li_ContractStartDate: Lo_ContractStartDate,
                                      Li_ContractNum: Lo_ContractNum,
                                    });
                                    const formInstance = this.formRef.current;
                                    formInstance.setFieldsValue({
                                      Course: Lio_ConsultCourse,
                                      contract_short_name: recordData.W1_contract_short_name,
                                    });
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                    this.onChangeFilter();
                                    this.forceUpdate();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Button
                      disabled={
                        this.formRef.current?.getFieldValue("Course")
                          ? this.formRef.current.getFieldValue("Course")
                            ? false
                            : true
                          : true
                      }
                      icon={<MoreOutlined />}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "90vw",
                            component: (
                              <WS0605127_ContractLineItemDisplay
                                Li_ContractType={this.state.Li_ContractType}
                                Li_ContractOrgCode={
                                  this.state.Li_ContractOrgCode
                                }
                                Li_ContractStartDate={
                                  this.state.Li_ContractStartDate
                                }
                                Li_ContractNum={this.state.Li_ContractNum}
                                onFinishScreen={() => {
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
                    ></Button>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="contract_short_name">
                      <Input readOnly bordered={false} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xl={18} lg={14} sm={24}>
              <Card>
                <Row>
                  <Col xl={8} lg={18} sm={24}>
                    <Form.Item name="ReserveDisplayItems">
                      <Select
                        style={{ width: "150px" }}
                        onChange={() => this.onChangeFilter()}
                      >
                        {this.formRef.current
                          ? this.formRef.current.getFieldValue(
                            "ReserveDisplayItemSelect"
                          )
                            ? this.formRef.current
                              .getFieldValue("ReserveDisplayItemSelect")
                              .map((item, index) => {
                                return (
                                  <Select.Option
                                    value={item.ReserveDisplayItemSelect}
                                    key={index}
                                  >
                                    {item.ReserveDisplayItem || " "}
                                  </Select.Option>
                                );
                              })
                            : null
                          : null}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col offset={9} xl={4} lg={18} sm={24}>
                    <Form.Item name="SkyRealWakuto">
                      <Radio.Group onChange={() => this.onChangeFilter()}>
                        <Radio value={0}>空人数</Radio>
                        <Radio value={1}>実人数</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col xl={2} lg={18} sm={24}>
                    <Form.Item
                      name="StsFrameAlreadySet"
                      valuePropName="checked"
                      onChange={() => this.onChangeStsFrameAlreadySet()}
                    >
                      <Checkbox>設定済</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Table
                  style={{ marginTop: "10px" }}
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue("Wakuto")
                      : []
                  }
                  rowKey={(record) => record.Expression_22}
                  pagination={false}
                  size="small"
                  scroll={{ y: "69vh" }}
                  loading={this.state.isLoading}
                >
                  <Table.Column
                    dataIndex="Expression_22"
                    title="日付"
                    width="13%"
                    render={(text, record, index) => (
                      <span>
                        <Form.Item name={["Wakuto", index, "time"]} hidden>
                          <span>{record.time}</span>
                        </Form.Item>
                        <Form.Item
                          name={["Wakuto", index, "Expression_22"]}
                          hidden
                        >
                          <span>{text}</span>
                        </Form.Item>
                        <Form.Item name={["Wakuto", index, "Expression_10"]}>
                          <span
                            style={{
                              color:
                                record.Expression_10 === "日"
                                  ? "red"
                                  : record.Expression_10 === "土"
                                    ? "blue"
                                    : "black",
                            }}
                          >
                            {text + " (" + record.Expression_10 + ")"}
                          </span>
                        </Form.Item>
                      </span>
                    )}
                  ></Table.Column>
                  <Table.Column
                    dataIndex="Expression_11"
                    title="休"
                    width="7%"
                    render={(text, record, index) => (
                      <Form.Item name={["Wakuto", index, "Expression_11"]}>
                        <span
                          style={{
                            color: record.Expression_11 === "休" ? "red" : null,
                          }}
                        >
                          {text}
                        </span>
                      </Form.Item>
                    )}
                  ></Table.Column>
                  <Table.Column
                    dataIndex="Expression_12"
                    title="合計人数"
                    width="13%"
                    render={(text, record, index) => {
                      return <>{text === "0" || text === 0 ? "" : text}</>;
                    }}
                  ></Table.Column>
                  <Table.Column
                    dataIndex="Expression_17"
                    title={
                      this.formRef.current
                        ? this.formRef.current.getFieldValue(
                          "SkyRealWakuto"
                        ) === 1
                          ? "実人数"
                          : "空人数"
                        : "空人数"
                    }
                    width="13%"
                    render={(text, record, index) => {
                      return <>{text === "0" || text === 0 ? "" : text}</>;
                    }}
                  ></Table.Column>
                  <Table.Column
                    dataIndex="person"
                    title="予約人数"
                    width="13%"
                    render={(text, record, index) => {
                      if (record.person === 0 || record.person === "0") {
                        record.person = "";
                      }
                      return (
                        <span>
                          <Form.Item name={["Wakuto", index, "change"]} hidden>
                            <Input />
                          </Form.Item>
                          <Form.Item
                            name={["Wakuto", index, "person"]}
                            style={{ margin: 0 }}
                          >
                            <Input
                              style={{
                                color:
                                  record.change === "true" ? "white" : "black",
                                background:
                                  record.change === "true" ? "red" : "white",
                              }}
                              onChange={() => this.onUpdateChangeWakuto(index)}
                              type="number"
                              min="0"
                              size="small"
                            />
                          </Form.Item>
                        </span>
                      );
                    }}
                  ></Table.Column>
                  <Table.Column
                    dataIndex="title"
                    title="メモ"
                    width="40%"
                    render={(text, record, index) => (
                      <Form.Item
                        name={["Wakuto", index, "title"]}
                        style={{ margin: 0 }}
                      >
                        <Input
                          size="small"
                          readOnly
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 500,
                                component: (
                                  <WS2580001_ScheduleChange
                                    Li_Date={record.time}
                                    onFinishScreen={({ Lo_StsModify }) => {
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: false,
                                        },
                                      });
                                      this.onChangeFilter();
                                      this.forceUpdate();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    )}
                  ></Table.Column>
                </Table>

                <Button
                  style={{ float: "right", margin: "10px" }}
                  type="primary"
                  htmlType="submit"
                >
                  確認
                </Button>
              </Card>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2535001_FrameReserve);
