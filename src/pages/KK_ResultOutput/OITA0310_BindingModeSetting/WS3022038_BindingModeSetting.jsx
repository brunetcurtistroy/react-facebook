import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";
import {
  Card,
  Table,
  Input,
  Modal,
  Row,
  Col,
  Checkbox,
  Button,
  Select,
  Space,
  Form,
  message,
} from "antd";

import WS0286001_PrintStyleInquiry from "pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry.jsx";
import WS0495001_ConditionExpressInfoInquiry from "pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0495001_ConditionExpressInfoInquiry.jsx";
import BindingModeSettingService from "services/ResultOutput/BindingModeSetting/BindingModeSettingService";
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
class WS3022038_BindingModeSetting extends React.Component {
  static propTypes = {
    Li_ParentCode: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "結合様式設定";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTable: false,
      selectedRowKeyLeft: [],
      selectedRowKeyRight: [],
      selectedRowRight: {},
    };
  }

  componentDidMount = () => {
    BindingModeSettingService.getScreenDataService()
      .then((res) => {
        this.formRef.current.setFieldsValue({
          PrinterNoList: res.data,
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

    this.getDataBindingModeSetting(true);
  };

  getDataBindingModeSetting = (isFirstLoading) => {
    this.setState({ isLoadingTable: true });
    BindingModeSettingService.getDataBindingModeSettingService()
      .then((res) => {
        let isUpdateSelectedRows = res.data.filter((item) => {
          if (
            this.formRef.current.getFieldValue("selectedRows") &&
            this.formRef.current.getFieldValue("selectedRows").id === item.id
          )
            return item;
        });
        this.formRef.current.setFieldsValue({
          BindingModeSettingList: res.data,
          selectedRows:
            isUpdateSelectedRows.length > 0 ? isUpdateSelectedRows[0] : [],
        });
        if (isFirstLoading && res.data.length > 0) {
          this.setState({
            selectedRowKeyLeft: [res.data[0]?.id],
            selectedRowRight: res.data[0]?.ModeUse[0],
            selectedRowKeyRight: [res.data[0]?.ModeUse[0]?.id],
          });
          this.formRef.current.setFieldsValue({
            PrinterNo: res.data[0].PrinterNo,
            selectedRows: res.data[0],
          });
        }
        this.forceUpdate();
        this.setState({ isLoadingTable: false });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.setState({ isLoadingTable: false });
      });
  };

  getDataModeUseBindingModeSetting = () => {
    BindingModeSettingService.getDataModeUseBindingModeSettingService({
      parent_code: this.state.selectedRows.parent_code,
    })
      .then((res) => {
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

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  onFinish = (values) => {};

  saveAndUpdateBindingModeSetting = (id) => {
    this.setState({ isLoadingTable: true });
    let selectedRows = this.formRef.current.getFieldValue("selectedRows");

    let formatModeUse =
      selectedRows.id === id
        ? selectedRows.ModeUse
          ? selectedRows.ModeUse.map((item) => {
              if (item.id === "create_new") {
                return { ...item, id: "" };
              } else return item;
            })
          : []
        : [];
    let isExistID = this.formRef.current
      .getFieldValue("BindingModeSettingList")
      .filter((item) => {
        if (item.id === "create_new" || item.id === id) {
          return item;
        }
      });
    BindingModeSettingService.saveAndUpdateBindingModeSettingService({
      ...isExistID[0],
      id: isExistID[0].id === "create_new" ? "" : isExistID[0].id,
      ModeUse: isExistID[0].id === "create_new" ? [] : formatModeUse,
      PrinterNo: this.formRef.current.getFieldValue("PrinterNo"),
    })
      .then((res) => {
        message.success("成功");
        this.getDataBindingModeSetting();
        this.setState({ isLoadingTable: false });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.setState({ isLoadingTable: false });
      });
  };

  saveAndUpdateBindingModeSettingRightTable = () => {
    let selectedRows = this.formRef.current.getFieldValue("selectedRows");
    this.saveAndUpdateBindingModeSetting(selectedRows ? selectedRows.id : "");
  };

  deleteModeUseBindingModeSetting = (id) => {
    this.setState({ isLoadingTable: true });

    BindingModeSettingService.deleteModeUseBindingModeSettingService({
      id: id,
    })
      .then((res) => {
        message.success("成功");
        this.getDataBindingModeSetting();
        this.setState({ isLoadingTable: false });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.setState({ isLoadingTable: false });
      });
  };

  deleteBindingModeSetting = (id, parent_code) => {
    if (id === "create_new" && parent_code === "") {
      this.getDataBindingModeSetting();
      this.formRef.current.setFieldsValue({
        PrinterNo: "",
        selectedRows: [],
      });
      this.forceUpdate();
      return;
    }
    this.setState({ isLoadingTable: true });
    BindingModeSettingService.deleteBindingModeSettingService({
      id: id,
      parent_code: parent_code,
    })
      .then((res) => {
        message.success("成功");
        this.getDataBindingModeSetting();
        this.formRef.current.setFieldsValue({
          PrinterNo: "",
          selectedRows: [],
        });
        this.setState({ isLoadingTable: false });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.setState({ isLoadingTable: false });
      });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeyLeft: selectedRowKeys });
    this.formRef.current.setFieldsValue({
      PrinterNo: selectedRows[0].PrinterNo,
      selectedRows: selectedRows[0],
    });
    this.forceUpdate();
  };
  changeConditionalExpression(e, record, index) {
      const data = {
        conditional_expression: e,
      };
      BindingModeSettingService.changeConditionalExpressionService(data)
        .then((res) => {
          record = {
            ...record,
            name: res.data.name,
            conditional_expression: e,
          };
          const tempObj = [
            ...this.formRef.current.getFieldValue("selectedRows").ModeUse,
          ];
          tempObj[index] = record;
          this.formRef.current.setFieldsValue({
            ...this.formRef.current.getFieldValue(),
            selectedRows: {
              ...this.formRef.current.getFieldValue("selectedRows"),
              ModeUse: tempObj,
            },
          });
        })
        .catch((err) => {});
    
  }

  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
      selectedRowKeys: this.formRef.current?.getFieldValue(
        "BindingModeSettingList"
      )
        ? this.state.selectedRowKeyLeft
        : "",
    };
    return (
      <div className="binding-mode-setting">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card title="結合様式設定">
            <Row gutter={24}>
              <Col span={12}>
                <Table
                  style={{ cursor: "pointer" }}
                  rowClassName={(record, index) =>
                    record.id === this.state.selectedRowKeyLeft[0]
                      ? "table-row-light"
                      : ""
                  }
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue(
                          "BindingModeSettingList"
                        )
                      : []
                  }
                  loading={this.state.isLoadingTable}
                  bordered={true}
                  pagination={false}
                  scroll={{ y: 700 }}
                  rowKey={(record) => record.id}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        this.setState({
                          selectedRowKeyLeft: [record.id],
                          selectedRowRight: record.ModeUse[0],
                          selectedRowKeyRight: [record.ModeUse[0]?.id],
                        });
                        this.formRef.current.setFieldsValue({
                          PrinterNo: record.PrinterNo,
                          selectedRows: record,
                        });
                      },
                    };
                  }}
                  // rowSelection={{
                  //   type: "radio",
                  //   ...rowSelection,
                  // }}
                  size="small"
                >
                  <Table.Column
                    title="表示順"
                    dataIndex="display_order"
                    key=""
                    width={70}
                    render={(text, record, index) => {
                      if (
                        record.display_order === 0 ||
                        record.display_order === "0"
                      ) {
                        record.display_order = "";
                      }
                      return (
                        <Form.Item
                          name={[
                            "BindingModeSettingList",
                            index,
                            "display_order",
                          ]}
                        >
                          <Input type="number" min="0" />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="様式"
                    dataIndex="parent_code"
                    key=""
                    render={(text, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "BindingModeSettingList",
                            index,
                            "parent_code",
                          ]}
                        >
                          <Input.Search
                            readOnly={!isNaN(record.id)}
                            onSearch={() => {
                              if (!isNaN(record.id)) return;
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: "800px",
                                  component: (
                                    <WS0286001_PrintStyleInquiry
                                      Li_UsuallyWrenRoster={""}
                                      Lio_StyleCode={record.parent_code}
                                      onFinishScreen={({
                                        Lio_StyleCode,
                                        Lo_FormatName,
                                      }) => {
                                        record.parent_code = Lio_StyleCode;
                                        record.style_name = Lo_FormatName;

                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                          />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="名称"
                    dataIndex="style_name"
                    key=""
                    render={(text, record, index) => (
                      <Form.Item
                        name={["BindingModeSettingList", index, "style_name"]}
                      >
                        <Input />
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="有効"
                    dataIndex="enabled"
                    align="center"
                    width={40}
                    key=""
                    render={(text, record, index) => (
                      <Form.Item
                        name={["BindingModeSettingList", index, "enabled"]}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="一括"
                    align="center"
                    dataIndex="bulk"
                    width={40}
                    key=""
                    render={(text, record, index) => (
                      <Form.Item
                        name={["BindingModeSettingList", index, "bulk"]}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    width={70}
                    align="center"
                    title={() => (
                      <Button
                        size="small"
                        type="primary"
                        style={{ width: "35px" }}
                        icon={<PlusOutlined />}
                        onClick={() => {
                          if (
                            this.formRef.current.getFieldValue(
                              "BindingModeSettingList"
                            ) === undefined
                          ) {
                            this.formRef.current.setFieldsValue({
                              BindingModeSettingList: [
                                {
                                  id: "create_new",
                                  display_order: "",
                                  parent_code: "",
                                  style_name: "",
                                  enabled: true,
                                  bulk: "",
                                  PrinterNo: "",
                                  ModeUse: [],
                                },
                              ],
                            });
                            this.forceUpdate();
                          } else {
                            let isCreatedNew = this.formRef.current
                              .getFieldValue("BindingModeSettingList")
                              .filter((item) => {
                                if (item.id === "create_new") {
                                  return item;
                                }
                              });
                            if (isCreatedNew.length) return;
                            this.formRef.current.setFieldsValue({
                              BindingModeSettingList: [
                                ...this.formRef.current.getFieldValue(
                                  "BindingModeSettingList"
                                ),
                                {
                                  id: "create_new",
                                  display_order: "",
                                  parent_code: "",
                                  style_name: "",
                                  enabled: true,
                                  bulk: "",
                                  PrinterNo: "",
                                  ModeUse: [],
                                },
                              ],
                            });
                            this.forceUpdate();
                          }
                          this.setState({ selectedRowKeyLeft: ["create_new"] });
                          this.formRef.current.setFieldsValue({
                            PrinterNo: "",
                            selectedRows: [],
                          });
                        }}
                      />
                    )}
                    dataIndex=""
                    key=""
                    render={(text, record, index) => {
                      return (
                        <div
                          style={{ textAlign: "center" }}
                          hidden={
                            this.state.selectedRowKeyLeft[0] !== record.id
                          }
                        >
                          <Button
                            size="small"
                            style={{ marginRight: "5px", color: "green" }}
                            icon={<SaveOutlined />}
                            onClick={() =>
                              this.saveAndUpdateBindingModeSetting(record.id)
                            }
                          ></Button>

                          <Button
                            size="small"
                            style={{ color: "red" }}
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              Modal.confirm({
                                title: "確認",
                                icon: (
                                  <QuestionCircleOutlined
                                    style={{ color: "#1890ff" }}
                                  />
                                ),
                                content: "削除しますか？",
                                onOk: () =>
                                  this.deleteBindingModeSetting(
                                    record.id,
                                    record.parent_code
                                  ),
                              });
                            }}
                          ></Button>
                        </div>
                      );
                    }}
                  />
                </Table>
              </Col>

              <Col span={12}>
                <Space style={{ marginBottom: "10px" }}>
                  <label>プリンタ</label>
                  <Form.Item name="PrinterNo">
                    <Select style={{ width: "200px" }}>
                      {this.formRef.current
                        ? this.formRef.current.getFieldValue("PrinterNoList")
                          ? this.formRef.current
                              .getFieldValue("PrinterNoList")
                              .map((item, index) => {
                                return (
                                  <Select.Option value={item.key} key={index}>
                                    {item.value}
                                  </Select.Option>
                                );
                              })
                          : null
                        : null}
                    </Select>
                  </Form.Item>
                </Space>

                <Table
                  style={{ cursor: "pointer" }}
                  rowClassName={(record, index) =>
                    record.id === this.state.selectedRowRight?.id
                      ? "table-row-light"
                      : ""
                  }
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue("selectedRows")
                        ? this.formRef.current.getFieldValue("selectedRows")
                            .ModeUse
                        : []
                      : []
                  }
                  loading={this.state.isLoadingTable}
                  pagination={false}
                  bordered={true}
                  rowKey={(record) => record.id}
                  scroll={{ y: 700 }}
                  size="small"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        this.setState({
                          selectedRowRight: record,
                          selectedRowKeyRight: [record.id],
                        });
                      },
                    };
                  }}
                >
                  <Table.Column
                    title="表示順"
                    dataIndex="display_order"
                    key=""
                    render={(text, record, index) => {
                      if (
                        record.display_order === 0 ||
                        record.display_order === "0"
                      ) {
                        record.display_order = "";
                      }
                      return (
                        <Form.Item
                          name={[
                            "selectedRows",
                            "ModeUse",
                            index,
                            "display_order",
                          ]}
                        >
                          <Input type="number" min="0" />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="様式"
                    dataIndex="child_code"
                    width={120}
                    key=""
                    render={(text, record, index) => (
                      <Form.Item
                        name={["selectedRows", "ModeUse", index, "child_code"]}
                      >
                        <Input.Search
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "800px",
                                component: (
                                  <WS0286001_PrintStyleInquiry
                                    Li_UsuallyWrenRoster={""}
                                    Lio_StyleCode={record.child_code}
                                    onFinishScreen={({
                                      Lio_StyleCode,
                                      Lo_FormatName,
                                    }) => {
                                      record.child_code = Lio_StyleCode;
                                      record.format_name = Lo_FormatName;

                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="様式名"
                    dataIndex="format_name"
                    key=""
                    render={(text, record, index) => (
                      <Form.Item
                        name={["selectedRows", "ModeUse", index, "format_name"]}
                      >
                        <Input readOnly />
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="有効"
                    dataIndex="enabled"
                    align="center"
                    width={50}
                    key=""
                    render={(text, record, index) => (
                      <Form.Item
                        name={["selectedRows", "ModeUse", index, "enabled"]}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="条件"
                    dataIndex="conditional_expression"
                    key=""
                    width={100}
                    render={(text, record, index) => (
                      <Form.Item
                        name={[
                          "selectedRows",
                          "ModeUse",
                          index,
                          "conditional_expression",
                        ]}
                      >
                        <Input.Search
                        style={{textAlign: "right"}}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "800px",
                                component: (
                                  <WS0495001_ConditionExpressInfoInquiry
                                    onFinishScreen={({
                                      Lo_ConditionSerialNum,
                                      Lo_Name,
                                    }) => {
                                      record.conditional_expression =
                                        Lo_ConditionSerialNum;
                                      record.name = Lo_Name;
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          onBlur={(e) => {
                            this.changeConditionalExpression(
                              e.target.value,
                              record,
                              index
                            );
                          }}
                        />
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="条件名称"
                    dataIndex="name"
                    key=""
                    render={(text, record, index) => (
                      <Form.Item
                        name={["selectedRows", "ModeUse", index, "name"]}
                      >
                        <Input readOnly />
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    width={70}
                    align="center"
                    title={() => (
                      <Button
                        size="small"
                        type="primary"
                        style={{ width: "35px" }}
                        icon={<PlusOutlined />}
                        onClick={() => {
                          let selectedRows =
                            this.formRef.current.getFieldValue("selectedRows");
                          if (selectedRows.ModeUse === undefined) {
                            return;
                          } else {
                            let isCreatedNew = selectedRows.ModeUse.filter(
                              (item) => {
                                if (item.id === "create_new") {
                                  return item;
                                }
                              }
                            );
                            if (isCreatedNew.length) return;
                            this.formRef.current.setFieldsValue({
                              selectedRows: {
                                ...selectedRows,
                                ModeUse: [
                                  ...selectedRows.ModeUse,
                                  {
                                    id: "create_new",
                                    display_order: "",
                                    child_code: "",
                                    format_name: "",
                                    enabled: true,
                                    conditional_expression: "",
                                    name: "",
                                  },
                                ],
                              },
                            });
                            this.forceUpdate();
                          }
                        }}
                      />
                    )}
                    render={(text, record, index) => {
                      return (
                        <div
                          style={{ textAlign: "center" }}
                          hidden={this.state.selectedRowRight.id !== record.id}
                        >
                          <Button
                            size="small"
                            style={{ marginRight: "5px", color: "green" }}
                            icon={<SaveOutlined />}
                            onClick={() => {
                              this.saveAndUpdateBindingModeSettingRightTable();
                            }}
                          ></Button>
                          <Button
                            size="small"
                            style={{ color: "red" }}
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              Modal.confirm({
                                title: "確認",
                                width: 200,
                                icon: (
                                  <QuestionCircleOutlined
                                    style={{ color: "#1890ff" }}
                                  />
                                ),
                                content: "削除しますか？",
                                onOk: () =>
                                  this.deleteModeUseBindingModeSetting(
                                    record.id
                                  ),
                              });
                            }}
                          ></Button>
                        </div>
                      );
                    }}
                  />
                </Table>
              </Col>
            </Row>
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
        </Form>
      </div>
    );
  }
}

export default WS3022038_BindingModeSetting;
