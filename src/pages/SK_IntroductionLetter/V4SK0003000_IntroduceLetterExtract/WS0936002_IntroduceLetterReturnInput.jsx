import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  Input,
  Select,
  Table,
  Row,
  Col,
  DatePicker,
  Button,
  Modal,
  message,
  Space,
} from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import IntroduceLetterReturnInputService from "services/IntroductionLetter/IntroduceLetterExtract/IntroduceLetterReturnInputService";
import PropTypes from "prop-types";

import WS0887001_IntroduceLetterVariousMasterInquiry from "../V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry";
import moment from "moment-timezone";
// import { VenusDatePickerCustom as DatePicker } from "components/Commons/VenusDatePickerCustom";
class WS0936002_IntroduceLetterReturnInput extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_Department: PropTypes.any,
    Li_ReturnInfoDisplay: PropTypes.any,
    onFinishScreen: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "紹介状返送入力";

    this.state = {
      screenData: {},
      count: 0,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  componentDidMount = () => {
    this.getScreenData();
    this.getDataInputSub();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      this.getScreenData();
      this.getDataInputSub();
    }
  };

  componentWillUnmount = () => {
    this.closeScreenSaveData();
  };

  getScreenData = () => {
    const {
      Li_CourseLevel,
      Li_ReserveNum,
      Li_Department,
      Li_ReturnInfoDisplay,
    } = this.props;
    IntroduceLetterReturnInputService.getScreenDataService({
      course_level: Li_CourseLevel,
      reservation_number: Li_ReserveNum,
      department: Li_Department,
      Li_ReturnInfoDisplay: Li_ReturnInfoDisplay,
    })
      .then((res) => {
        console.log("res: ", res.data);
        this.formRef.current.setFieldsValue({
          ...res.data,
          ExamDateChar: moment(res.data?.ExamDateChar).isValid()
            ? moment(res.data?.ExamDateChar)
            : "",
        });
        this.setState({ screenData: res.data });
        this.forceUpdate();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };
  getDataInputSub = () => {
    const {
      Li_CourseLevel,
      Li_ReserveNum,
      Li_Department,
      Li_ReturnInfoDisplay,
    } = this.props;
    IntroduceLetterReturnInputService.getDataInputSubService({
      course_level: Li_CourseLevel,
      reservation_number: Li_ReserveNum,
      department: Li_Department,
      Li_ReturnInfoDisplay: Li_ReturnInfoDisplay,
    })
      .then((res) => {
        console.log("res: ", res.data);
        this.formRef.current.setFieldsValue({
          dataSource: res.data,
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
      });
  };

  saveRecord = (record) => {
    const {
      Li_CourseLevel,
      Li_ReserveNum,
      Li_Department,
      // Li_ReturnInfoDisplay,
    } = this.props;
    IntroduceLetterReturnInputService.saveRecordService({
      ...record,
      id: isNaN(record.id) ? null : record.id,
      course_level: Li_CourseLevel,
      reservation_number: Li_ReserveNum,
      department: Li_Department,
    })
      .then((res) => {
        console.log("res: ", res.data);
        message.success("成功");
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.getDataInputSub();
      });
  };

  deleteRecordTable = (record) => {
    IntroduceLetterReturnInputService.deleteRecordService({
      id: record.id,
    })
      .then((res) => {
        message.success("成功");
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.getDataInputSub();
      });
  };

  closeScreenSaveData = () => {
    let dataScreenSave = this.formRef.current?.getFieldsValue();
    IntroduceLetterReturnInputService.closeScreenSaveDataService({
      ExamDate:
        dataScreenSave.ExamDateChar &&
        moment(dataScreenSave.ExamDateChar).isValid()
          ? moment(dataScreenSave.ExamDateChar).format("YYYY/MM/DD")
          : "",
      LandOldCoerciveGroupClassify:
        this.state.screenData.LandOldCoerciveGroupClassify,
      LandOldCoercivePreciseResult1DigitUse:
        dataScreenSave.MedicalInstitutionCode,
      MedicalInstitutionCode: dataScreenSave.MedicalInstitutionCode,
      Remarks: dataScreenSave.Remarks,
    })
      .then((res) => {})
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  addNewRowToTable = (arrayName) => {
    let arrayFieldValue = this.formRef.current?.getFieldValue([arrayName]);
    let isCreatedNew = arrayFieldValue.filter((item) => {
      if (isNaN(item.id)) {
        return item;
      }
    });
    if (isCreatedNew.length > 0) return;
    let newData = {
      id: "new" + this.state.count,
      seq: "",
      exam_code: "",
      exam_content: "",
      findings_code: "",
      findings_content: "",
      sick_name_code: "",
      sick_name: "",
      treatment_code: "",
      treatment_content: "",
    };
    switch (arrayName) {
      case "dataSource":
        newData = { ...newData };
        break;

      default:
        break;
    }
    let arrayNew = [];
    if (arrayFieldValue) {
      arrayNew = [...arrayFieldValue];
    }
    this.formRef.current?.setFieldsValue({
      [arrayName]: [newData, ...arrayNew],
    });
    this.forceUpdate();
    this.setState({ count: this.state.count + 1 });
  };

  findIndexByID = (arrayName, keyName, record) => {
    let arrayFieldValue = this.formRef.current?.getFieldValue([arrayName]);
    return arrayFieldValue.findIndex(
      (item) => record[keyName] === item[keyName]
    );
  };

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  setFormFieldValue = (name, value) => {
    this.formRef.current?.setFields([{ name: name, value: value }]);
    this.forceUpdate();
  };

  render() {
    return (
      <div className="introduce-letter-return-input">
        <Card title="紹介状返送入力">
          <Form ref={this.formRef} onFinish={this.onFinish} labelAlign="right">
            <Form.Item
              name={["TestDatePickerArray", 0, "date"]}
              label="TestDatePickerArray"
            >
              <VenusDatePickerCustom
                formRefDatePicker={this.formRef}
                style={{ width: "200px", marginBottom: "0px" }}
                allowClear={true}
              ></VenusDatePickerCustom>
            </Form.Item>
            <Form.Item name="TestDatePicker" label="TestDatePicker">
              <VenusDatePickerCustom
                formRefDatePicker={this.formRef}
                style={{ width: "200px", marginBottom: "0px" }}
                allowClear={true}
              ></VenusDatePickerCustom>
            </Form.Item>
            <div align="right">
              <Button
                onClick={() => {
                  let fieldsValue = this.formRef.current?.getFieldsValue();
                  console.log("All values: ", fieldsValue);
                }}
              >
                Get data
              </Button>
            </div>

            <Form.Item name="ExamDateChar" label="&ensp;&ensp;検査日">
              <VenusDatePickerCustom formRefDatePicker={this.formRef}
                style={{ width: "200px" }}
                format="YYYY/MM/DD"
                allowClear={true}
              />
            </Form.Item>

            <Row wrap={false}>
              <Col>
                <Form.Item name="MedicalInstitutionCode" label="医療機関">
                  <Input
                    type="number"
                    style={{ width: "200px" }}
                    maxLength={4}
                  />
                </Form.Item>
              </Col>
              <Col flex="auto">
                <Form.Item>
                  <div style={{ paddingLeft: "10px" }}>
                    {this.formRef.current
                      ? this.formRef.current.getFieldValue(
                          "medical_institutions_short_name"
                        )
                      : ""}
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="LandOldCoercivePreciseResult1DigitUse"
              label="地域保健"
            >
              <Select style={{ width: "200px" }}>
                {this.state.screenData.ComboBox_LandOldCoercivePreciseResult1Di?.map(
                  (item, index) => {
                    return (
                      <Select.Option value={item.LinkedField} key={index}>
                        {item.DisplayField}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
            </Form.Item>

            <Form.Item name="Remarks" label="備　　考">
              <Input type="text" maxLength={40} />
            </Form.Item>
            <Table
              size="small"
              bordered={true}
              dataSource={
                this.formRef.current
                  ? this.formRef.current.getFieldValue("dataSource")
                  : []
              }
              rowKey={(record) => record.id}
            >
              <Table.Column
                title="連番"
                dataIndex="seq"
                render={(text, record, index) => {
                  if (text === 0 || text === "0") {
                    record.seq = "";
                  }
                  return (
                    <Space>
                      <Form.Item
                        name={[
                          "dataSource",
                          this.findIndexByID("dataSource", "id", record),
                          "seq",
                        ]}
                        onChange={(event) => {
                          record.seq = event.target.value;
                        }}
                        style={{ marginBottom: "0px" }}
                      >
                        <Input type="number" />
                      </Form.Item>
                    </Space>
                  );
                }}
              />
              <Table.Column
                title="検査"
                dataIndex="exam_code"
                render={(text, record, index) => {
                  if (record.exam_code === 0 || record.exam_code === "0") {
                    record.exam_code = "";
                  }
                  return (
                    <Row gutter={6}>
                      <Col span={6}>
                        <Form.Item
                          name={[
                            "dataSource",
                            this.findIndexByID("dataSource", "id", record),
                            "exam_code",
                          ]}
                          style={{ marginBottom: "0px" }}
                          onChange={(event) => {
                            record.exam_code = event.target.value;
                          }}
                        >
                          <Input
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 600,
                                  component: (
                                    <WS0887001_IntroduceLetterVariousMasterInquiry
                                      Li_ManageCode={2}
                                      onFinishScreen={({
                                        Lo_VariousCodes,
                                        recordData,
                                      }) => {
                                        record.exam_code = Lo_VariousCodes;
                                        record.exam_content =
                                          recordData.exam_content;
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
                      <Col span={18}>
                        <Form.Item
                          name={[
                            "dataSource",
                            this.findIndexByID("dataSource", "id", record),
                            "exam_content",
                          ]}
                          onChange={(event) => {
                            record.exam_content = event.target.value;
                          }}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                }}
              />
              <Table.Column
                title="所見"
                dataIndex="findings_code"
                render={(text, record, index) => {
                  if (text === 0 || text === "0") {
                    record.findings_code = "";
                  }
                  return (
                    <Row gutter={6}>
                      <Col span={6}>
                        <Form.Item
                          name={[
                            "dataSource",
                            this.findIndexByID("dataSource", "id", record),
                            "findings_code",
                          ]}
                          onChange={(event) => {
                            record.findings_code = event.target.value;
                          }}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input
                            type="number"
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 600,
                                  component: (
                                    <WS0887001_IntroduceLetterVariousMasterInquiry
                                      Li_ManageCode={8}
                                      onFinishScreen={({
                                        Lo_VariousCodes,
                                        recordData,
                                      }) => {
                                        record.findings_code = Lo_VariousCodes;
                                        record.findings_content =
                                          recordData.findings_content;
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
                      <Col span={18}>
                        <Form.Item
                          name={[
                            "dataSource",
                            this.findIndexByID("dataSource", "id", record),
                            "findings_content",
                          ]}
                          onChange={(event) => {
                            record.findings_content = event.target.value;
                          }}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                }}
              />
              <Table.Column
                title="傷病"
                dataIndex="sick_name_code"
                render={(text, record, index) => {
                  if (text === 0 || text === "0") {
                    record.sick_name_code = "";
                  }
                  return (
                    <Row gutter={6}>
                      <Col span={6}>
                        <Form.Item
                          name={[
                            "dataSource",
                            this.findIndexByID("dataSource", "id", record),
                            "sick_name_code",
                          ]}
                          onChange={(event) => {
                            record.sick_name_code = event.target.value;
                          }}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input
                            type="number"
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 600,
                                  component: (
                                    <WS0887001_IntroduceLetterVariousMasterInquiry
                                      Li_ManageCode={5}
                                      onFinishScreen={({
                                        Lo_VariousCodes,
                                        recordData,
                                      }) => {
                                        record.sick_name_code = Lo_VariousCodes;
                                        record.sick_name = recordData.sick_name;
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
                      <Col span={18}>
                        <Form.Item
                          name={[
                            "dataSource",
                            this.findIndexByID("dataSource", "id", record),
                            "sick_name",
                          ]}
                          onChange={(event) => {
                            record.sick_name = event.target.value;
                          }}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                }}
              />
              <Table.Column
                title="治療"
                dataIndex="treatment_code"
                render={(text, record, index) => {
                  if (text === 0 || text === "0") {
                    record.treatment_code = "";
                  }
                  return (
                    <Row gutter={6}>
                      <Col span={6}>
                        <Form.Item
                          name={[
                            "dataSource",
                            this.findIndexByID("dataSource", "id", record),
                            "treatment_code",
                          ]}
                          onChange={(event) => {
                            record.treatment_code = event.target.value;
                          }}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input
                            type="number"
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 600,
                                  component: (
                                    <WS0887001_IntroduceLetterVariousMasterInquiry
                                      Li_ManageCode={3}
                                      onFinishScreen={({
                                        Lo_VariousCodes,
                                        recordData,
                                      }) => {
                                        record.treatment_code = Lo_VariousCodes;
                                        record.treatment_content =
                                          recordData.treatment_content;
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
                      <Col span={18}>
                        <Form.Item
                          name={[
                            "dataSource",
                            this.findIndexByID("dataSource", "id", record),
                            "treatment_content",
                          ]}
                          onChange={(event) => {
                            record.treatment_content = event.target.value;
                          }}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                }}
              />
              <Table.Column
                width={70}
                align="center"
                title={
                  <Button
                    size="small"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => this.addNewRowToTable("dataSource")}
                  ></Button>
                }
                render={(text, record, index) => {
                  return (
                    <>
                      <Button
                        size="small"
                        style={{
                          color: "#42b10b",
                          border: "none",
                          marginRight: "5px",
                        }}
                        icon={<SaveOutlined />}
                        onClick={() => {
                          this.saveRecord(record);
                        }}
                      ></Button>
                      <Button
                        size="small"
                        style={{ border: "none" }}
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          Modal.confirm({
                            content: "削除しますか？",
                            okText: "は　い",
                            cancelText: "いいえ",
                            onOk: () => this.deleteRecordTable(record),
                          });
                        }}
                      ></Button>
                    </>
                  );
                }}
              />
            </Table>
          </Form>
        </Card>
        <Modal
          footer={null}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.closeModal();
          }}
        >
          {this.state.childModal.component}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0936002_IntroduceLetterReturnInput);
