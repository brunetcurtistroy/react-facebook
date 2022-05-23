import React from "react";
import { connect } from "react-redux";

import { Card, Table, Input, Modal, Button, Form, Space, message } from "antd";

import WS0265001_BasicCourseInquiry from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx";
import WS0445007_PrintStyleInquiry from "pages/KK_ResultOutput/V4MS9900600_CourseSpecificStardStyleSetting/WS0445007_PrintStyleInquiry.jsx";
import WS0445006_OfficeInquiry from "pages/KK_ResultOutput/V4MS9900600_CourseSpecificStardStyleSetting/WS0445006_OfficeInquiry.jsx";
import CourseSpecificStardStyleSettingService from "services/ResultOutput/CourseSpecificStardStyleSetting/CourseSpecificStardStyleSettingService";

import {
  PlusOutlined,
  SaveOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import ModalDraggable from "components/Commons/ModalDraggable";

class WS0445001_CourseSpecificStardStyleSetting extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "コース別標準様式設定";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,
      selectedRows: [],
      indexTable: 0,
      rowSelect: {},
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

  componentDidMount = () => {
    this.getCourseSpecificStardStyleSetting();
  };
  onChangePaginationPage = (page) => {
    this.setState({ currentPage: page });
  };

  getCourseSpecificStardStyleSetting = () => {
    this.setState({ isLoadingTable: true, currentPage: 1 });
    CourseSpecificStardStyleSettingService.getCourseSpecificStardStyleSettingService()
      .then((res) => {
        this.setState({
          dataSource: res.data,
          selectedRows: [res.data[0]],
          indexTable: 0,
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
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  };
  findIndexByID = (arrayData, recordID) => {
    if (arrayData && arrayData.length > 0) {
      return arrayData.findIndex((item) => recordID === item.id);
    }
  };

  updateDataSourceById = (arrayUpdate, id) => {
    this.setState({
      dataSource: this.state.dataSource.map((item) => {
        if (item.id === id) {
          arrayUpdate.map((data) => {
            item = { ...item, [data.name]: data.value };
          });
          return item;
        }
        return item;
      }),
    });
  };

  saveAndUpdateCourseSpecificStardStyleSetting = (record) => {
    CourseSpecificStardStyleSettingService.saveAndUpdateCourseSpecificStardStyleSettingService(
      { ...record, id: record.id === "create_new" ? "" : record.id }
    )
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
        this.getCourseSpecificStardStyleSetting();
      });
  };

  deleteCourseSpecificStardStyleSetting = (record) => {
    CourseSpecificStardStyleSettingService.deleteCourseSpecificStardStyleSettingService(
      { id: record.id }
    )
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
        this.getCourseSpecificStardStyleSetting();
      });
  };
  captureF09CourseSpecificStardStyleSetting = () => {
    CourseSpecificStardStyleSettingService.captureF09CourseSpecificStardStyleSettingService()
      .then((res) => {
        Modal.warning({
          title: "警告",
          content: "終了！",
          okText: "はい",
          icon: <WarningOutlined />,
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
      .finally(() => {
        this.getCourseSpecificStardStyleSetting();
      });
  };

  ChangeOfficeCode(record) {
    CourseSpecificStardStyleSettingService.ChangeOfficeCodeCourseSpecificStardStyleSetting(
      { office_code: record.office_code }
    )
      .then((res) => {
        this.updateDataSourceById(
          [
            {
              name: "office_code",
              value: res.data.office_code,
            },
            {
              name: "v4_branch_store_code",
              value: res.data.branch_store_code,
            },
            {
              name: "OfficeDivision",
              value: res.data.office_kanji_name ?? "【　共　通　】",
            },
          ],
          record.id
        );
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  ChangeMedicalExamCourse(record) {
    CourseSpecificStardStyleSettingService.ChangeMedicalExamCourseCourseSpecificStardStyleSetting(
      { medical_exam_course: record.medical_exam_course }
    )
      .then((res) => {
        this.updateDataSourceById(
          [
            {
              name: "medical_exam_course",
              value: res.data.medical_exam_course ?? "",
            },
            {
              name: "MedicalExamCourseName",
              value: res.data.MedicalExamCourseName ?? "【　デフォルト　】",
            },
          ],
          record.id
        );
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  ChangeStandardPrintingStyle(record) {
    CourseSpecificStardStyleSettingService.ChangeStandardPrintingStyleCourseSpecificStardStyleSetting(
      { standard_printing_style: record.standard_printing_style }
    )
      .then((res) => {
        this.updateDataSourceById(
          [
            {
              name: "standard_printing_style",
              value: res.data.style_code ?? "",
            },
            {
              name: "format_name",
              value: res.data.format_name ?? "",
            },
          ],
          record.id
        );
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  render() {
    return (
      <div className="course-specific-stard-style-setting">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card
            title={
              <>
                コース別標準様式設定
                <Button
                  type="primary"
                  style={{ float: "right", marginBottom: "5px" }}
                  onClick={() => {
                    Modal.confirm({
                      title: "確認",
                      icon: (
                        <QuestionCircleOutlined style={{ color: "#1890ff" }} />
                      ),
                      content: "標準コースを取込みますか",
                      okText: "はい",
                      cancelText: "いいえ",
                      onOk: () => {
                        this.captureF09CourseSpecificStardStyleSetting();
                      },
                    });
                  }}
                >
                  コース取込
                </Button>
              </>
            }
          >
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={false}
              bordered={true}
              rowClassName={(record, index) =>
                record.id === this.state.selectedRows[0]?.id
                  ? "table-row-light"
                  : ""
              }
              rowKey={(record) => record.id}
              size="small"
              onRow={(record, index) => ({
                onClick: (e) => {
                  this.setState({
                    rowSelect: record,
                    indexTable: index,
                    selectedRows: [record],
                  });
                },
              })}
              scroll={{ y: '500px' }}
            >
              <Table.Column
                title="事業所ｺｰﾄﾞ"
                dataIndex="office_code"
                key=""
                width={"10%"}
                render={(value, record) => {
                  return (
                    <div>
                      <Input.Search
                        style={{ textAlign: "right" }}
                        value={record.office_code}
                        onChange={(event) => {
                          const { name, value } = event.target;
                          this.updateDataSourceById(
                            [{ name, value }],
                            record.id
                          );
                        }}
                        onBlur={() => {
                          this.ChangeOfficeCode(record);
                        }}
                        name="office_code"
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "800px",
                              component: (
                                <WS0445006_OfficeInquiry
                                  onFinishScreen={({
                                    Lo_branch_store_code,
                                    Lo_office_code,
                                    recordData,
                                  }) => {
                                    this.updateDataSourceById(
                                      [
                                        {
                                          name: "office_code",
                                          value: Lo_office_code,
                                        },
                                        {
                                          name: "v4_branch_store_code",
                                          value: Lo_branch_store_code,
                                        },
                                        {
                                          name: "OfficeDivision",
                                          value: recordData.office_kanji_name,
                                        },
                                      ],
                                      record.id
                                    );
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </div>
                  );
                }}
              />
              <Table.Column
                title="支社店"
                dataIndex="v4_branch_store_code"
                key=""
                width={"10%"}
                render={(value, record) => {
                  if (!record.office_code) {
                    record.v4_branch_store_code = "";
                  }
                  return (
                    <div>
                      <Input.Search
                        style={{ textAlign: "right" }}
                        value={record.v4_branch_store_code}
                        readOnly={record.v4_branch_store_code}
                        onChange={(event) => {
                          const { name, value } = event.target;
                          this.updateDataSourceById(
                            [{ name, value }],
                            record.id
                          );
                        }}
                        name="v4_branch_store_code"
                        onSearch={() => {
                          if (record.v4_branch_store_code !== "") {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "800",
                                component: (
                                  <WS0445006_OfficeInquiry
                                    onFinishScreen={({
                                      Lo_branch_store_code,
                                      Lo_office_code,
                                      recordData,
                                    }) => {
                                      this.updateDataSourceById(
                                        [
                                          {
                                            name: "office_code",
                                            value: Lo_office_code,
                                          },
                                          {
                                            name: "v4_branch_store_code",
                                            value: Lo_branch_store_code,
                                          },
                                          {
                                            name: "OfficeDivision",
                                            value: recordData.office_kanji_name,
                                          },
                                        ],
                                        record.id
                                      );
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }
                        }}
                      />
                    </div>
                  );
                }}
              />
              <Table.Column
                title="事業所名称"
                dataIndex="OfficeDivision"
                key=""
              />
              <Table.Column
                title="健診コース"
                dataIndex="medical_exam_course"
                key=""
                render={(value, record) => {
                  return (
                    <Space align="center">
                      <Input.Search
                        value={record.medical_exam_course}
                        name="medical_exam_course"
                        onChange={(event) => {
                          const { name, value } = event.target;
                          this.updateDataSourceById(
                            [{ name, value }],
                            record.id
                          );
                        }}
                        onBlur={() => {
                          this.ChangeMedicalExamCourse(record);
                        }}
                        style={{ width: "100px" }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "70%",
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={({
                                    Lo_CourseCode,
                                    Lo_CourseName,
                                  }) => {
                                    this.updateDataSourceById(
                                      [
                                        {
                                          name: "medical_exam_course",
                                          value: Lo_CourseCode,
                                        },
                                        {
                                          name: "MedicalExamCourseName",
                                          value: Lo_CourseName,
                                        },
                                      ],
                                      record.id
                                    );
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                      <span style={{ marginLeft: "10px" }}>
                        {record.MedicalExamCourseName}
                      </span>
                    </Space>
                  );
                }}
              />
              <Table.Column
                title="印刷様式"
                dataIndex="standard_printing_style"
                key=""
                render={(value, record) => {
                  return (
                    <Space align="center">
                      <Input.Search
                        value={record.standard_printing_style}
                        onChange={(event) => {
                          const { name, value } = event.target;
                          this.updateDataSourceById(
                            [{ name, value }],
                            record.id
                          );
                        }}
                        onBlur={() => {
                          this.ChangeStandardPrintingStyle(record);
                        }}
                        name="standard_printing_style"
                        style={{ width: "100px" }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "40%",
                              component: (
                                <WS0445007_PrintStyleInquiry
                                  onFinishScreen={({
                                    Lo_standard_printing_style,
                                    Lo_format_name,
                                  }) => {
                                    this.updateDataSourceById(
                                      [
                                        {
                                          name: "standard_printing_style",
                                          value: Lo_standard_printing_style,
                                        },
                                        {
                                          name: "format_name",
                                          value: Lo_format_name,
                                        },
                                      ],
                                      record.id
                                    );
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                      <span style={{ marginLeft: "10px" }}>
                        {record.format_name}
                      </span>
                    </Space>
                  );
                }}
              />
              <Table.Column
                title={() => (
                  <>
                    <Button
                      size="small"
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        if (this.state.dataSource === undefined) {
                          this.setState({
                            dataSource: [
                              {
                                id: "create_new",
                                OfficeDivision: "【　共　通　】",
                                MedicalExamCourseName: "【　デフォルト　】",
                              },
                            ],
                          });
                        } else {
                          let isCreatedNew = this.state.dataSource.filter(
                            (item) => {
                              if (item.id === "create_new") {
                                return item;
                              }
                            }
                          );
                          if (isCreatedNew.length) return;
                          this.setState({
                            dataSource: [
                              {
                                id: "create_new",
                                OfficeDivision: "【　共　通　】",
                                MedicalExamCourseName: "【　デフォルト　】",
                              },
                              ...this.state.dataSource,
                            ],
                            currentPage: 1,
                          });
                        }
                      }}
                    />
                  </>
                )}
                align="center"
                width={80}
                render={(text, record, index) => {
                  return (
                    <Space>
                      <Button
                        size="small"
                        hidden={
                          this.state.indexTable !==
                          this.findIndexByID(this.state.dataSource, record.id)
                        }
                        style={{
                          color: "green",
                          border: "none",
                          marginRight: "5px",
                        }}
                        icon={<SaveOutlined />}
                        onClick={() => {
                          this.saveAndUpdateCourseSpecificStardStyleSetting(
                            record
                          );
                        }}
                      ></Button>

                      <Button
                        size="small"
                        hidden={
                          this.state.indexTable !==
                          this.findIndexByID(this.state.dataSource, record.id)
                        }
                        style={{ border: "none", color: "red" }}
                        danger
                        icon={<DeleteOutlined />}
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
                              this.deleteCourseSpecificStardStyleSetting(
                                record
                              );
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
)(WS0445001_CourseSpecificStardStyleSetting);
