import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Card,
  Table,
  Input,
  Button,
  Menu,
  Modal,
  message,
  Form,
  Space,
  Row,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx";
import WS1527012_StyleSettingService from "services/ResultOutput/ResultsTblCollectOutput/WS1527012_StyleSettingService";
import WS0286001_PrintStyleInquiry from "../OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry";
import WS1527016_OfficeInquiry from "./WS1527016_OfficeInquiry";

class WS1527012_StyleSetting extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_PatternClassify: PropTypes.any,
    Li_DocumentName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = "様式設定";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTable: false,
      count: 0,
    };
  }

  componentDidMount = () => {
    this.getListData();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      this.getListData();
    }
  };

  getListData = () => {
    const { Li_PatternClassify, Li_DocumentName } = this.props;
    this.setState({ isLoadingTable: true });
    WS1527012_StyleSettingService.getListDataService({
      Division: Li_PatternClassify,
      DocumentName: Li_DocumentName,
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          ListData: res.data,
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
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  };

  addNewRowToTable = (arrayName, keyName) => {
    let arrayFieldValue = this.formRef.current?.getFieldValue([arrayName]);
    let isCreatedNew = arrayFieldValue.filter((item) => {
      if (isNaN(item[keyName])) {
        return item;
      }
    });

    if (isCreatedNew.length > 0) return;
    let newData = {};
    switch (arrayName) {
      case "ListData":
        newData = {
          id: "new" + this.state.count,
          Division: this.props.Li_PatternClassify,
          DocumentName: this.props.Li_DocumentName,
          office_code: "",
          v4_branch_store_code: "",
          medical_exam_course: "",
          standard_printing_style_01: "",
          standard_printing_style_02: "",
          standard_printing_style_03: "",
          standard_printing_style_04: "",
        };
        break;

      default:
        break;
    }
    let arrayNew = [];
    if (arrayFieldValue) {
      arrayNew = [newData, ...arrayFieldValue];
    }
    // arrayNew.push(newData);
    this.formRef.current?.setFieldsValue({ [arrayName]: arrayNew });
    this.forceUpdate();
    this.setState({ count: this.state.count + 1 });
  };

  findIndexByID = (arrayName, keyName, record) => {
    let arrayFieldValue = this.formRef.current?.getFieldValue([arrayName]);
    return arrayFieldValue.findIndex(
      (item) => record[keyName] === item[keyName]
    );
  };

  saveData = (record) => {
    let params = isNaN(record.id)
      ? { ...record, id: "" }
      : {
          ...record,
          id: record.id,
          Division: this.props.Li_PatternClassify,
          DocumentName: this.props.Li_DocumentName,
        };
    WS1527012_StyleSettingService.saveDataService(params)
      .then((res) => {
        message.success("成功");
        this.getListData();
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

  deleteData = (record) => {
    WS1527012_StyleSettingService.deleteDataService({
      id: record.id,
      Division: record.Division,
      DocumentName: record.DocumentName,
    })
      .then((res) => {
        message.success("成功");
        this.getListData();
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

  submitF9 = () => {
    WS1527012_StyleSettingService.submitF9Service({
      Division: this.props.Li_PatternClassify,
      DocumentName: this.props.Li_DocumentName,
    })
      .then((res) => {
        this.confirm();
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
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  confirm = () => {
    Modal.confirm({
      content: "処理終了",
      cancelButtonProps: { hidden: true },
    });
  };

  render() {
    return (
      <div className="style-setting">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          size="small"
          initialValues={{}}
        >
          <Card title="様式設定">
            <Menu mode="horizontal">
              <Menu.Item key="標準取込" onClick={() => this.submitF9()}>
                標準取込
              </Menu.Item>
            </Menu>
            <Card>
              <Table
                dataSource={
                  this.formRef.current
                    ? this.formRef.current.getFieldValue("ListData")
                    : []
                }
                loading={this.state.isLoadingTable}
                bordered={true}
                rowKey={(record) => record.id}
              >
                <Table.Column
                  title="事業所コード"
                  dataIndex="office_code"
                  key=""
                  width={100}
                  render={(text, record, index) => {
                    return (
                      <Form.Item
                        name={[
                          "ListData",
                          this.findIndexByID("ListData", "id", record),
                          "office_code",
                        ]}
                      >
                        <Input
                          style={{ cursor: "pointer", textAlign: "right" }}
                          onChange={(event) => {
                            record.office_code = event.target.value;
                          }}
                          readOnly={!isNaN(record.id)}
                          onDoubleClick={() => {
                            if (!isNaN(record.id)) return;
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "800px",
                                component: (
                                  <WS1527016_OfficeInquiry
                                    onFinishScreen={({
                                      office_code,
                                      v4_branch_store_code,
                                      recordData,
                                    }) => {
                                      record.office_code = office_code;
                                      record.v4_branch_store_code =
                                        v4_branch_store_code;
                                      record.OfficeDivision =
                                        recordData.office_kanji_name;
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        ></Input>
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  title="支社店"
                  dataIndex="v4_branch_store_code"
                  key=""
                  render={(text, record, index) => {
                    return text === "0" || text === 0 ? (
                      ""
                    ) : (
                      <div style={{ textAlign: "right" }}>{text}</div>
                    );
                  }}
                />
                <Table.Column
                  title="事  業  所  名"
                  dataIndex="OfficeDivision"
                  key=""
                />
                <Table.Column
                  title="健診コース"
                  dataIndex="medical_exam_course"
                  key=""
                  render={(text, record, index) => {
                    return (
                      <Row wrap={false}>
                        <Form.Item
                          name={[
                            "ListData",
                            this.findIndexByID("ListData", "id", record),
                            "medical_exam_course",
                          ]}
                        >
                          <Input
                            style={{ width: "70px", cursor: "pointer" }}
                            onChange={(event) => {
                              record.medical_exam_course = event.target.value;
                            }}
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "800px",
                                  component: (
                                    <WS0265001_BasicCourseInquiry
                                      onFinishScreen={({
                                        Lo_CourseCode,
                                        Lo_CourseName,
                                      }) => {
                                        record.medical_exam_course =
                                          Lo_CourseCode;
                                        record.MedicalExamCourseName =
                                          Lo_CourseName;
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          ></Input>
                        </Form.Item>
                        <span style={{ paddingLeft: "5px" }}>
                          {record.MedicalExamCourseName}
                        </span>
                      </Row>
                    );
                  }}
                />
                <Table.Column
                  title="印　刷　様　式"
                  dataIndex="standard_printing_style_01"
                  key=""
                  render={(text, record, index) => {
                    return (
                      <Row wrap={false}>
                        <Form.Item
                          name={[
                            "ListData",
                            this.findIndexByID("ListData", "id", record),
                            "standard_printing_style_01",
                          ]}
                        >
                          <Input
                            onChange={(event) => {
                              record.standard_printing_style_01 =
                                event.target.value;
                            }}
                            style={{ cursor: "pointer", width: "70px" }}
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "600px",
                                  component: (
                                    <WS0286001_PrintStyleInquiry
                                      Lio_StyleCode={
                                        record.standard_printing_style_01
                                      }
                                      onFinishScreen={({
                                        Lio_StyleCode,
                                        Lo_FormatName,
                                      }) => {
                                        record.standard_printing_style_01 =
                                          Lio_StyleCode;
                                        record.format_name = Lo_FormatName;
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          ></Input>
                        </Form.Item>
                        <span style={{ paddingLeft: "5px" }}>
                          {record.format_name}
                        </span>
                      </Row>
                    );
                  }}
                />
                <Table.Column
                  title="様式2"
                  width={70}
                  dataIndex="standard_printing_style_02"
                  key=""
                  render={(text, record, index) => {
                    return (
                      <Form.Item
                        name={[
                          "ListData",
                          this.findIndexByID("ListData", "id", record),
                          "standard_printing_style_02",
                        ]}
                      >
                        <Input
                          style={{ cursor: "pointer" }}
                          onChange={(event) => {
                            record.standard_printing_style_02 =
                              event.target.value;
                          }}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "600px",
                                component: (
                                  <WS0286001_PrintStyleInquiry
                                    Lio_StyleCode={
                                      record.standard_printing_style_02
                                    }
                                    onFinishScreen={({ Lio_StyleCode }) => {
                                      record.standard_printing_style_02 =
                                        Lio_StyleCode;
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        ></Input>
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  title="様式3"
                  width={70}
                  dataIndex="standard_printing_style_03"
                  key=""
                  render={(text, record, index) => {
                    return (
                      <Form.Item
                        name={[
                          "ListData",
                          this.findIndexByID("ListData", "id", record),
                          "standard_printing_style_03",
                        ]}
                      >
                        <Input
                          onChange={(event) => {
                            record.standard_printing_style_03 =
                              event.target.value;
                          }}
                          style={{ cursor: "pointer" }}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "600px",
                                component: (
                                  <WS0286001_PrintStyleInquiry
                                    Lio_StyleCode={
                                      record.standard_printing_style_03
                                    }
                                    onFinishScreen={({ Lio_StyleCode }) => {
                                      record.standard_printing_style_03 =
                                        Lio_StyleCode;
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        ></Input>
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  title="様式4"
                  width={70}
                  dataIndex="standard_printing_style_04"
                  key=""
                  render={(text, record, index) => {
                    return (
                      <Form.Item
                        name={[
                          "ListData",
                          this.findIndexByID("ListData", "id", record),
                          "standard_printing_style_04",
                        ]}
                      >
                        <Input
                          style={{ cursor: "pointer" }}
                          onChange={(event) => {
                            record.standard_printing_style_04 =
                              event.target.value;
                          }}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "600px",
                                component: (
                                  <WS0286001_PrintStyleInquiry
                                    Lio_StyleCode={
                                      record.standard_printing_style_04
                                    }
                                    onFinishScreen={({ Lio_StyleCode }) => {
                                      record.standard_printing_style_04 =
                                        Lio_StyleCode;
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        ></Input>
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  title={() => (
                    <Button
                      type="primary"
                      size-="small"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        this.addNewRowToTable("ListData", "id");
                      }}
                    />
                  )}
                  dataIndex=""
                  align="center"
                  key=""
                  render={(text, record, index) => {
                    return (
                      <Space>
                        <Button
                          size="small"
                          icon={<SaveOutlined />}
                          shape="circle"
                          className="text-success"
                          style={{ float: "right", borderColor: "green" }}
                          onClick={() => {
                            this.saveData(record);
                          }}
                        ></Button>
                        <Button
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          shape="circle"
                          onClick={() => {
                            Modal.confirm({
                              title: "確認",
                              icon: (
                                <QuestionCircleOutlined
                                  style={{ color: "#1890ff" }}
                                />
                              ),
                              content: "削除しますか",
                              onOk: () => {
                                this.deleteData(record);
                              },
                            });
                          }}
                        ></Button>
                      </Space>
                    );
                  }}
                />
              </Table>
            </Card>
          </Card>
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
)(WS1527012_StyleSetting);
