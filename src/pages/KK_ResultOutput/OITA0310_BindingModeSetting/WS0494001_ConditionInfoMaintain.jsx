import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  QuestionCircleOutlined,
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Card,
  Table,
  Tooltip,
  Row,
  Col,
  Select,
  Input,
  Modal,
  Menu,
  Button,
  Form,
  InputNumber,
  Dropdown,
} from "antd";
import ConditionInfoMaintainAction from "redux/ResultOutput/BindingModeSetting/ConditionInfoMaintain.action";
import WS0494004_ConditionExpressSet from "pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0494004_ConditionExpressSet.jsx";
import { ModalConfirm } from "components/Commons/ModalConfirm";
import ColumnButtonCustom from "components/Commons/TableColumn";
import Draggable from "react-draggable";
import ModalDraggable from "components/Commons/ModalDraggable";

class WS0494001_ConditionInfoMaintain extends React.Component {
  formRef = React.createRef();
  draggleRef = React.createRef();
  static propTypes = {
    Li_ParentNum: PropTypes.any,
    Lio_ConditionalExpression: PropTypes.any,
    Lio_System: PropTypes.any,
  };
  constructor(props) {
    super(props);

    // document.title = "条件式情報保守";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      disabled: true,
      dataSource: [],
      dataSource2: {},
      selectedRows: [],
      requestParameter: {
        dataSource: { serial_number: "", name: "", isNew: true },
        dataSource2: {
          EquationDisplay: "",
          serial_number: "",
          isNew: true,
          formula: "",
          Li_ParentNum: "",
        },
      },
      FormulaCacheCopy: "",
      disabledSave: true,
      disabledSaveDetail: true,
      count: 1001,
      id: "",
      isLoading: false,
      isLoading2: false,
      rowSelected: [],
      selectedRowKeys: [],
      selectedRowKeysDetail: [],
      rowSelectedDetail: [],
      indexTableDetail: 0,
      indexTable: 0,
      checkYesNo: false,
      recordData: {},
      index: 0,
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
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListData(true);
    }
  }
  componentDidMount() {
    this.getListData(true);
  }
  getListData(reload) {
    this.setState({ isLoading: true });
    ConditionInfoMaintainAction.GetListData()
      .then((res) => {
        if (res) {
          let index = reload ? 0 : this.state.indexTable;
          let data = res ? res : [];
          data = data.map((item) => {
            if (item.name === "0") {
              item.name = "";
            }
            if (item.serial_number === 0) {
              item.serial_number = "";
            }
            return item;
          });
          this.setState({
            dataSource: data,
            rowSelected: data.length > 0 ? [data[index]] : [],
            selectedRowKeys: data.length > 0 ? [data[index]?.id] : [],
            indexTable: index,
          });
          this.setFormFieldValue("dataSource", data);
          const Li_ParentNum = data[index]?.serial_number;
          this.getDetail(Li_ParentNum);
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  handleAdd(nameTable) {
    const { count } = this.state;
    const params = {
      isNew: true,
      serial_number: "",
      id: count,
      ...this.state.requestParameter[nameTable],
    };
    let data = this.formRef.current?.getFieldValue(nameTable)
      ? this.formRef.current?.getFieldValue(nameTable)
      : [];
    let arr = [...data];
    arr.unshift(params);
    this.forceUpdate();
    this.setFormFieldValue(nameTable, arr);
    this.setState({ count: count + 1 });
  }
  addRow(nameTable) {
    let data = this.formRef.current?.getFieldValue(nameTable)
      ? this.formRef.current?.getFieldValue(nameTable)
      : [];
    let arr = [...data];
    if (arr.length === 0) {
      this.handleAdd(nameTable);
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (!!arr[index]["isNew"]) {
          return;
        }
        if (index === arr.length - 1) {
          this.handleAdd(nameTable);
        }
      }
    }
    this.setState({ disabledSaveDetail: true, disabledSave: true });
  }
  getDetail(params) {
    this.setState({ isLoading2: true });
    ConditionInfoMaintainAction.Details({ Li_ParentNum: params })
      .then((res) => {
        if (res) {
          let initValue = res && res.data ? res.data : [];
          initValue = initValue.map((item) => {
            if (item.EquationDisplay === "0") {
              item.EquationDisplay = "";
            }
            if (item.serial_number === 0) {
              item.serial_number = "";
            }
            return item;
          });
          this.setState({ dataSource2: res });
          this.setFormFieldValue("dataSource2", initValue);
        }
      })
      .finally(() => this.setState({ isLoading2: false }));
  }
  onFinish = (values) => {};
  saveParentData(isNew, index) {
    let param = {};
    const values = this.formRef?.current?.getFieldValue("dataSource")[index];
    const system = this.formRef?.current?.getFieldValue("system");
    if (isNew) {
      param = {
        serial_number: this.checkData(values?.serial_number, "number"),
        name: this.checkData(values?.name, "number"),
        system: system ? system : 0,
      };
    } else {
      param = {
        id: this.checkData(values?.id, "number"),
        serial_number: this.checkData(values?.serial_number, "number"),
        name: this.checkData(values?.name, "number"),
        system: system ? system : 0,
      };
    }
    ConditionInfoMaintainAction.CreateParent(param).then((result) => {
      this.getListData(true);
      this.setState({ disabledSave: true });
    });
  }
  saveDetailData(isNew, index) {
    let param = {};
    const values = this.formRef?.current?.getFieldValue("dataSource2")[index];
    if (isNew) {
      param = {
        serial_number: this.checkData(values?.serial_number, "number"),
        Li_ParentNum: this.state.dataSource2.Li_ParentNum,
        formula: this.checkData(values?.formula, "number"),
      };
    } else {
      param = {
        id: this.checkData(values?.id, "number"),
        serial_number: this.checkData(values?.serial_number, "number"),
        Li_ParentNum: this.state.dataSource2.Li_ParentNum,
        formula: this.checkData(values?.formula, "number"),
      };
    }
    ConditionInfoMaintainAction.SaveDetail(param).then((result) => {
      this.getDetail(this.state.dataSource2.Li_ParentNum);
      this.setState({ id: "" });
    });
  }
  RemoveNewData(nameTable) {
    const record = this.formRef.current?.getFieldValue(nameTable);
    this.setFormFieldValue(
      nameTable,
      record.filter((item, index) => index !== 0)
    );
    this.setState({ disabledSave: true });
    this.forceUpdate();
  }
  deleteDataByField(serial_number) {
    ConditionInfoMaintainAction.DeleteParent({ serial_number }).then(
      (result) => {
        this.getListData(true);
      }
    );
  }
  deleteDataByDetail(id) {
    ConditionInfoMaintainAction.DeleteDetail({ id }).then((result) => {
      this.getDetail(this.state.dataSource2.Li_ParentNum);
    });
  }
  deleteData(isNew, serialOrId, nameTable) {
    if (isNew) {
      this.RemoveNewData(nameTable);
    } else {
      if (nameTable === "dataSource") {
        this.deleteDataByField(serialOrId);
      }
      if (nameTable === "dataSource2") {
        this.deleteDataByDetail(serialOrId);
      }
    }
  }
  eventPaste(record, index) {
    const params = {
      FormulaCache: this.state.FormulaCacheCopy,
    };
    ConditionInfoMaintainAction.Paste(params).then((result) => {
      if (result) {
        const detailData = this.formRef?.current?.getFieldValue("dataSource2");
        detailData[index].formula = result?.formula;
        detailData[index].EquationDisplay = result?.EquationDisplay;
        const isTrue = !!detailData[index].EquationDisplay ? true : false;
        this.setState({ id: record.id, disabledSaveDetail: !isTrue });
        this.setState({ disabledSaveDetail: false });
        this.forceUpdate();
      }
    });
  }
  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  }
  checkData(value, type) {
    const val = type === "number" ? 0 : "";
    return !this.isEmpty(value) ? value : val;
  }
  showWS0494004_ConditionExpressSet(record, index) {
    this.setState({
      recordData: record,
      index: index,
      checkYesNo: true,
      disabledSaveDetail: false,
    });
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: "70%",
        component: (
          <WS0494004_ConditionExpressSet
            Lio_ConditionalExpression={
              record.formula === "0" || !record.formula ? "" : record.formula
            }
            onFinishScreen={(output) => {
              const detailData =
                this.formRef?.current?.getFieldValue("dataSource2");
              if (output) {
                if (this.state.checkYesNo) {
                  detailData[index].formula =
                    output && output.Lio_ConditionalExpression;
                  detailData[index].EquationDisplay =
                    output && output.Lo_ConditionalExpressionDisplay;
                  this.setFormFieldValue("dataSource2", detailData);
                }
                this.forceUpdate();
                this.closeModal();
              }
            }}
          />
        ),
      },
    });
  }
  convertHtmlToValue = (input, index, classIndex) =>
    input.nativeEvent?.path[!!classIndex ? classIndex : 4].childNodes[1]
      ?.childNodes[0]?.childNodes[0]?.childNodes[1]?.children[0]["childNodes"][
      index
    ]["childNodes"][0]["childNodes"][0]["childNodes"][0]["childNodes"][0]
      ?.defaultValue; // result
  async confirmUpdateData(output) {
    const indexClass = output.nativeEvent?.path.findIndex(
      (item) => item.className === "ant-modal-content"
    );
    const detailData = this.formRef?.current?.getFieldValue("dataSource2");
    const Lio_ConditionalExpression = this.convertHtmlToValue(
      output,
      2,
      indexClass
    );
    const Lo_ConditionalExpressionDisplay = this.convertHtmlToValue(
      output,
      1,
      indexClass
    );
    const index = this.state.index;
    detailData[index].formula = Lio_ConditionalExpression;
    detailData[index].EquationDisplay = !!Lo_ConditionalExpressionDisplay
      ? Lo_ConditionalExpressionDisplay
      : detailData[index].EquationDisplay;
    this.saveDetailData(!!detailData[index].isNew, index);
    await this.setFormFieldValue("dataSource2", detailData);
  }
  checkSaveData(arr, isDisableButton, event, checkOther) {
    const isDisable = arr.some((s) => s.serial_number === event);

    if (event > 0) {
      if (isDisable) {
        this.setState({ [isDisableButton]: true });
      } else {
        this.setState({ [isDisableButton]: false });
      }
    } else {
      this.setState({ [isDisableButton]: true });
    }
  }

  renderMenu = (record, index) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          this.setState({ FormulaCacheCopy: record.formula });
        }}
      >
        コピー
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          this.eventPaste(record, index);
        }}
      >
        ペースト
      </Menu.Item>
    </Menu>
  );
  render() {
    const parentData = this.formRef?.current?.getFieldValue("dataSource");
    const detailData = this.formRef?.current?.getFieldValue("dataSource2");
    return (
      <div className="condition-info-maintain">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{ system: 0 }}
        >
          <Card title="条件式情報保守">
            <Row gutter={24}>
              <Col span={10}>
                <Table
                  size="small"
                  rowClassName={(record, index) =>
                    record.id === this.state.rowSelected[0]?.id
                      ? "table-row-light"
                      : ""
                  }
                  dataSource={parentData}
                  style={{ cursor: "pointer" }}
                  scroll={{ y: 600 }}
                  loading={this.state.isLoading}
                  pagination={false}
                  bordered={true}
                  rowKey={(record) => record.id}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: async () => {
                        await this.setState({
                          rowSelected: [record],
                          selectedRowKeys: [record.id],
                          indexTable: rowIndex,
                        });

                        this.getDetail(record.serial_number);
                        this.setFormFieldValue("system", record.system);
                      },
                    };
                  }}
                >
                  <Table.Column
                    title="連番"
                    dataIndex="serial_number"
                    width={150}
                    render={(item, record, index) => (
                      <Form.Item name={["dataSource", index, "serial_number"]}>
                        {!!record.isNew ? (
                          <InputNumber
                            value={1}
                            onChange={(event) => {
                              this.checkSaveData(
                                parentData,
                                "disabledSave",
                                event
                              );
                            }}
                          ></InputNumber>
                        ) : (
                          <InputNumber readOnly></InputNumber>
                        )}
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="名称"
                    dataIndex="name"
                    render={(text, record, index) => {
                      return (
                        <Form.Item name={["dataSource", index, "name"]}>
                          {<Input></Input>}
                        </Form.Item>
                      );
                    }}
                  />
                  {ColumnButtonCustom({
                    addRow: () => this.addRow("dataSource"), // in FE
                    onSaveData: () =>
                      this.saveParentData(
                        !!this.state.rowSelected[0].isNew,
                        this.state.indexTable
                      ), // Call API
                    deleteRow: () => this.RemoveNewData("dataSource"), // in FE
                    deleteData: () =>
                      this.deleteDataByField(
                        this.state.rowSelected[0].serial_number
                      ), // Call API
                    dataSource:
                      this.formRef?.current?.getFieldValue("dataSource"),
                    tableIndex: this.state.indexTable,
                  })}
                </Table>
              </Col>
              <Col span={14}>
                <Form.Item name="system">
                  <Select
                    style={{ width: "200px", marginBottom: "10px" }}
                    onChange={(value) => {
                      this.setFormFieldValue("system", value);
                    }}
                  >
                    <Select.Option value={0}>OR</Select.Option>
                    <Select.Option value={1}>AND</Select.Option>
                  </Select>
                </Form.Item>
                <Table
                  dataSource={detailData}
                  size="small"
                  loading={this.state.isLoading2}
                  pagination={false}
                  rowClassName={(record, index) =>
                    record.id === this.state.rowSelectedDetail[0]?.id
                      ? "table-row-light"
                      : ""
                  }
                  scroll={{ y: 600 }}
                  bordered={true}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: async () => {
                        await this.setState({
                          rowSelectedDetail: [record],
                          selectedRowKeysDetail: [record.id],
                          indexTableDetail: rowIndex,
                        });
                      },
                    };
                  }}
                  rowKey={(record) => record.id}
                >
                  <Table.Column
                    title="SEQ"
                    dataIndex="serial_number"
                    width={150}
                    render={(item, record, index) => (
                      <Form.Item name={["dataSource2", index, "serial_number"]}>
                        {
                          <InputNumber
                            onChange={(event) => {
                              this.checkSaveData(
                                detailData,
                                "disabledSaveDetail",
                                event,
                                !!record.isNew
                              );
                            }}
                            onDoubleClick={() => {
                              this.showWS0494004_ConditionExpressSet(
                                record,
                                index
                              );
                            }}
                          ></InputNumber>
                        }
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="条件式"
                    dataIndex="EquationDisplay"
                    render={(value, record, index) => {
                      return (
                        <Tooltip title={record?.Expression_8}>
                          <Form.Item
                            name={["dataSource2", index, "EquationDisplay"]}
                          >
                            <Input
                              readOnly
                              style={
                                record.id !== this.state.id
                                  ? { border: "" }
                                  : { border: "1px solid black" }
                              }
                              onDoubleClick={() => {
                                this.showWS0494004_ConditionExpressSet(
                                  record,
                                  index
                                );
                              }}
                            ></Input>
                          </Form.Item>
                        </Tooltip>
                      );
                    }}
                  />
                  {ColumnButtonCustom({
                    addRow: () => this.addRow("dataSource2"), // in FE
                    onSaveData: () =>
                      this.saveDetailData(
                        !!this.state.rowSelectedDetail[0].isNew,
                        this.state.indexTableDetail
                      ), // Call API
                    deleteRow: () => this.RemoveNewData("dataSource2"), // in FE
                    deleteData: () => {
                      Modal.confirm({
                        title: "",
                        icon: (
                          <QuestionCircleOutlined
                            style={{ color: "#1890ff" }}
                          />
                        ),
                        content: "削除しますか？",
                        onOk: () =>
                          this.deleteDataByDetail(
                            this.state.rowSelectedDetail[0].id
                          ), // Call API
                      });
                    },
                    dataSource:
                      this.formRef?.current?.getFieldValue("dataSource2"),
                    tableIndex: this.state.indexTableDetail,
                  })}
                  <Table.Column
                    width={90}
                    style={{ textAlign: "center" }}
                    render={(text, record, index) => {
                      return (
                        <Dropdown.Button
                          style={{ textAlign: "center" }}
                          trigger="click"
                          size="small"
                          overlay={() => this.renderMenu(record, index)}
                        ></Dropdown.Button>
                      );
                    }}
                  ></Table.Column>
                </Table>
              </Col>
            </Row>
            <Row gutter={24}></Row>
          </Card>
        </Form>
        <Modal
          footer={null}
          title={
            <div
              style={{
                position: "absolute",
                width: "95%",
                cursor: "move",
                height: "40px",
                zIndex: 100,
              }}
              onMouseOver={() => {
                if (this.state.disabled) {
                  this.setState({
                    disabled: false,
                  });
                }
              }}
              onMouseOut={() => {
                this.setState({
                  disabled: true,
                });
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            ></div>
          }
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          destroyOnClose={true}
          onCancel={(output) => {
            this.setState({ checkYesNo: false });
            const detailData =
              this.formRef?.current?.getFieldValue("dataSource2");
            setTimeout(() => {
              const indexClass = output.nativeEvent?.path.findIndex(
                (item) => item.className === "ant-modal-content"
              );
              let Lio_ConditionalExpression = this.convertHtmlToValue(
                output,
                2,
                indexClass
              );
              const index = this.state.index;
              if (Lio_ConditionalExpression !== detailData[index].formula) {
                ModalConfirm({
                  content: "変更を更新しますか",
                  icon: <QuestionCircleOutlined style={{ color: "#0067C5" }} />,
                  onOk: () => {
                    this.confirmUpdateData(output);
                  },
                  onCancel: () => {},
                });
              }
              this.closeModal();
            });
          }}
          modalRender={(modal) => {
            const modals = document.querySelector(".ant-modal-content");
            const title = modals?.querySelector(".ant-modal-header");
            if (title) {
              title.setAttribute("style", "padding: 0");
            }
            return (
              <Draggable disabled={this.state.disabled}>
                <div>{modal}</div>
              </Draggable>
            );
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
)(WS0494001_ConditionInfoMaintain);
