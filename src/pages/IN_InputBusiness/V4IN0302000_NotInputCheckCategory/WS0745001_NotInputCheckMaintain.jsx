import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";
import {
  Button,
  Card,
  InputNumber,
  Col,
  Row,
  Table,
  Tree,
  Menu,
  Modal,
  Form,
  Input,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  EditOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import { CarryOutOutlined } from "@ant-design/icons";
import NotInputCheckMaintainAction from "redux/InputBusiness/NotInputCheckCategory/NotInputCheckMaintain.action";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx";
import WS0745022_PatternChange from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0745022_PatternChange.jsx";
import WS0103001_CategoryListSettingSub from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0103001_CategoryListSettingSub.jsx";
import WS0061009_CheckYesNoYes from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx";
class WS0745001_NotInputCheckMaintain extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Lo_StsModify: PropTypes.any,
    Li_SearchChar: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "未入力チェック保守";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      treeData: [],
      defaultShowTableParent: true,
      selectedRows: [],
      selectedNodes: [],
      isLoadingData1: false,
      isLoadingData2: false,
      isLoading: false,
      selectedRowKeys: [],
      dataSource: [],
      dataSource1: [],
      dataSource2: [],
      disabledRadio: false,
      isSave: false,
      isCancel: false,
      isRemove: true,
      count: 1001,
      id: 0,
      node_id: "",
      StsPatternCorrection: 0,
      Pattern: "",
    };
  }
  componentDidMount() {
    this.getTreeData();
  }
  getTreeData(params) {
    NotInputCheckMaintainAction.getTreeData(params).then((res) => {
      this.setState({
        treeData: this.handleTreeNode(res),
        selectedNodes: [this.handleTreeNode(res)[0]],
      });
      const value = res && res.find((s) => s.parent_node_id === "");
      this.getTypeMaintenance({ node_id: value?.node_id });
    });
  }
  convertNode(data) {
    const key = `${data.TreeLevel}-${data.node_id}`;
    const treeNode = {
      title: data.display_name,
      key,
      node_id: data.node_id,
      parent_node_id: data.parent_node_id,
      children: [],
    };

    return treeNode;
  }

  handleTreeNode(list) {
    var map = {},
      node,
      roots = [],
      i;
    list = list && list.length ? list : [];
    for (i = 0; i < list.length; i += 1) {
      list[i] = this.convertNode(list[i]);
      map[list[i].node_id] = i;
      list[i].children = [];
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent_node_id !== "") {
        list[map[node.parent_node_id]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
  deleteTypeMaintainByCode(record) {
    const Code =
      record.Code < 10 && record.Code > 0 ? `0${record.Code}` : record.Code;
    NotInputCheckMaintainAction.deleteTypeMaintenanceByCode({ Code }).then(
      (res) => {
        this.getTreeData();
        this.getTypeMaintenance(this.state.node_id);
      }
    );
  }
  deleteDataUnnecessaryExamList(record) {
    const params = {
      node_id: this.state.node_id,
      W3_inspect_cd: record.W3_inspect_cd,
      W3_grp: record.W3_grp,
      exam_name: record.exam_name,
    };
    NotInputCheckMaintainAction.deleteDataUnnecessaryExamList(params).then(
      (res) => {
        NotInputCheckMaintainAction.clickData().then((res) => {});
        NotInputCheckMaintainAction.generateData({
          node_id: this.state.node_id,
        }).then((res) => {
          this.setState({ Pattern: res.Pattern });
          this.getUnnecessaryExamList(this.state.node_id);
        });
      }
    );
  }
  saveTypeMaintenance() {
    const value = this.formRef.current.getFieldValue("tableData")[0];
    const params = {
      Code: value.Code,
      remarks: value.remarks,
    };
    NotInputCheckMaintainAction.saveTypeMaintenance(params).then((res) => {
      this.getTreeData();
      this.getTypeMaintenance(this.state.node_id);
    });
  }
  updateTypeMaintenanceById(id) {
    const record = this.formRef.current.getFieldValue("tableData");
    const index = record.findIndex((s) => s.id === id);
    NotInputCheckMaintainAction.saveTypeMaintenance(record[index]).then(
      (res) => {
        this.getTreeData();
        this.getTypeMaintenance(this.state.node_id);
        this.setState({ id: 0, isRemove: true });
      }
    );
  }
  updateUnnecessaryExamList(data) {
    const formValues = this.formRef.current.getFieldValue("tableData2");
    const index = formValues.findIndex((s) => s.id === data.id);
    const params = {
      id: formValues[index].id,
      node_id: this.state.node_id,
      W3_inspect_cd: formValues[index].W3_inspect_cd,
      W3_grp: formValues[index].W3_grp,
      exam_name: formValues[index].exam_name,
    };
    NotInputCheckMaintainAction.saveUnnecessaryExamList(params).then((res) => {
      NotInputCheckMaintainAction.clickData().then((res) => {});
      NotInputCheckMaintainAction.generateData({
        node_id: this.state.node_id,
      }).then((res) => {
        this.setState({ Pattern: res.Pattern });
        this.getUnnecessaryExamList(this.state.node_id);
      });
    });
  }
  saveUnnecessaryExamList() {
    const value = this.formRef.current.getFieldValue("tableData2")[0];
    const params = {
      node_id: this.state.node_id,
      W3_inspect_cd: value.W3_inspect_cd,
      W3_grp: value.W3_grp,
      exam_name: value.exam_name,
    };
    NotInputCheckMaintainAction.saveUnnecessaryExamList(params).then((res) => {
      NotInputCheckMaintainAction.clickData().then((res) => {});
      NotInputCheckMaintainAction.generateData({
        node_id: this.state.node_id,
      }).then((res) => {
        this.setState({ Pattern: res.Pattern });
        this.getUnnecessaryExamList(this.state.node_id);
      });
    });
  }
  saveCategoryDisplayMaintaince(data) {
    const formValues = this.formRef.current.getFieldValue("tableData1");
    const index = formValues.findIndex((s) => s.id === data.id);
    const value = formValues[index];
    const selectedRow = !!this.state.selectedRowKeys[0] ? 1 : 0;
    const params = {
      W2_category_cd: value.W2_category_cd,
      W2_enabled_disabled: selectedRow,
      W2_display_order: Number(value.W2_display_order),
      W2_category_name: value.W2_category_name,
      node_id: this.state.node_id,
      id: value.id,
    };
    NotInputCheckMaintainAction.saveCategoryDisplayMaintaince(params).then(
      (res) => {
        NotInputCheckMaintainAction.clickData().then((res) => {});
        NotInputCheckMaintainAction.generateData({
          node_id: this.state.node_id,
        }).then((res) => {
          this.setState({ Pattern: res && res.Pattern });
          this.getCategoryDisplayMaintaince(this.state.node_id);
          this.setState({ id: 0, isRemove: true });
        });
      }
    );
  }
  onSelectNode = (selectedKeys, info) => {
    const node_id =
      info &&
      info.selectedNodes &&
      info.selectedNodes[0] &&
      info.selectedNodes[0].node_id
        ? info.selectedNodes[0].node_id
        : "";
    if (node_id.length > 0) {
      if (info.node.parent_node_id.length > 0) {
        NotInputCheckMaintainAction.clickData().then((res) => {
          this.setState({
            selectedNodes: info.selectedNodes,
            node_id: node_id,
            defaultShowTableParent: false,
          });
        });
        NotInputCheckMaintainAction.generateData({ node_id }).then((res) => {
          this.setState({ Pattern: res && res.Pattern });
          this.getCategoryDisplayMaintaince(node_id);
          this.getUnnecessaryExamList(node_id);
        });
      } else {
        this.getTypeMaintenance(node_id);
        this.setState({
          selectedNodes: info.selectedNodes,
          node_id: node_id,
        });
      }
    }
  };
  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  getTypeMaintenance(params) {
    this.setState({ isLoading: true });
    NotInputCheckMaintainAction.typeMaintenance({
      node_id: params,
    })
      .then((res) => {
        this.setFormFieldValue("tableData", res);
        this.setState({
          ...this.state,
          dataSource: res,
          dataSource2: [],
          selectedRows: [],
          isRemove: true,
          isCancel: true,
          id: 0,
          disabledRadio: false,
        });
      })
      .catch(() => {})
      .finally(() => this.setState({ isLoading: false }));
  }
  getCategoryDisplayMaintaince(params) {
    this.setState({ isLoadingData1: true });
    NotInputCheckMaintainAction.getCategoryDisplayMaintaince({
      node_id: params,
    })
      .then((res) => {
        this.setFormFieldValue("tableData1", res);
        this.setState({
          dataSource1: res,
          selectedRows: [],
          selectedRowKeys: res.map((x) => {
            if (x.W2_enabled_disabled === 1) {
              return x.id;
            }
          }),
        });
      })
      .catch(() => {})
      .finally(() => this.setState({ isLoadingData1: false }));
  }
  onFinish(values) {}
  getUnnecessaryExamList(params) {
    this.setState({ isLoadingData2: true });
    NotInputCheckMaintainAction.getUnnecessaryExamList({ node_id: params })
      .then((res) => {
        this.setState({
          dataSource2: res,
          isRemove: true,
          isCancel: false,
          id: 0,
          disabledRadio: false,
        });
        this.setFormFieldValue("tableData2", res);
      })
      .catch(() => {})
      .finally(() => this.setState({ isLoadingData2: false }));
  }
  AddNewData(field, obj, name) {
    let data = this.formRef.current?.getFieldValue(field)
      ? this.formRef.current?.getFieldValue(field)
      : [];
    let arr = [...data];
    if (arr.length === 0) {
      this.handleAdd(field, obj);
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index][name].length === 0) {
          return;
        }
        if (index === arr.length - 1) {
          this.handleAdd(field, obj);
        }
      }
    }
    this.setState({ disabledRadio: true, id: 0, isRemove: false });
  }
  handleAdd(field, obj) {
    const { count } = this.state;
    const newData = {
      ...obj,
      id: count,
    };
    let data = this.formRef.current?.getFieldValue(field)
      ? this.formRef.current?.getFieldValue(field)
      : [];
    let arr = [...data];
    arr.unshift(newData);
    this.setFormFieldValue(field, arr);
    this.forceUpdate();
    this.setState({
      ...this.state,
      count: count + 1,
      dataSource1: arr,
      selectedRowKeys: data.map((x) => {
        if (x.W2_enabled_disabled === 1) {
          return x.id;
        }
      }),
    });
  }
  RemoveNewData(filed) {
    const record = this.formRef.current?.getFieldValue(filed);
    this.setFormFieldValue(
      filed,
      record.filter((item, index) => index !== 0)
    );
    this.setState({ disabledRadio: false, id: 0, isRemove: true });
    this.forceUpdate();
  }
  EditData(data, isCancel) {
    if (isCancel === true) {
      this.setState({ isCancel: false, id: 0, isRemove: true });
    } else {
      this.setState({ isCancel: true, id: data.id, isRemove: true });
    }
  }
  StateEnabledSave(event, name, data, dataSourceName) {
    let record = dataSourceName.map((r) => r);
    const value = event;
    const index = record.findIndex((s) => s.id === data.id);
    if (record[index][name] !== value) {
      this.setState({ isSave: true });
    } else {
      this.setState({ isSave: false });
    }
  }
  renderTableParent() {
    const params = { Code: "", remarks: "", isNew: true };
    return (
      <Form ref={this.formRef} onFinish={this.onFinish} autoComplete="off">
        <Row gutter={24}>
          <Col span={24} style={{ paddingRight: "5px" }}>
            <Table
              dataSource={
                this.formRef.current?.getFieldValue("tableData")
                  ? this.formRef.current?.getFieldValue("tableData")
                  : []
              }
              loading={this.isLoading}
              pagination={false}
              bordered={true}
              size="small"
              rowKey={(record) => record.id}
            >
              <Table.Column
                title="種別"
                dataIndex="Code"
                render={(text, record, index) => {
                  return (
                    <>
                      <Form.Item name={["tableData", index, "Code"]}>
                        {record.Code > 0 ? (
                          this.state.id === record.id ? (
                            <InputNumber
                              min={1}
                              max={99}
                              onChange={(event) => {
                                this.StateEnabledSave(
                                  event,
                                  "Code",
                                  record,
                                  this.state.dataSource
                                );
                              }}
                              value={record.Code || null}
                            />
                          ) : (
                            record.Code
                          )
                        ) : (
                          <InputNumber
                            type="number"
                            value={record.Code || null}
                          />
                        )}
                      </Form.Item>
                    </>
                  );
                }}
              />
              <Table.Column
                title="名称"
                dataIndex="remarks"
                render={(text, record, index) => {
                  return (
                    <>
                      <Form.Item name={["tableData", index, "remarks"]}>
                        {record?.remarks?.length > 0 ? (
                          this.state.id === record.id ? (
                            <Input
                              onChange={(event) => {
                                this.StateEnabledSave(
                                  event.target.value,
                                  "remarks",
                                  record,
                                  this.state.dataSource
                                );
                              }}
                              value={record.remarks || null}
                            />
                          ) : (
                            record.remarks
                          )
                        ) : (
                          <Input value={record.remarks || null} />
                        )}
                      </Form.Item>
                    </>
                  );
                }}
              />
              <Table.Column
                width={90}
                title={
                  <Button
                    size="small"
                    type="primary"
                    style={{ textAlign: "center" }}
                    icon={<PlusOutlined />}
                    onClick={() => this.AddNewData("tableData", params, "Code")}
                  ></Button>
                }
                render={(text, record, index) => {
                  return (
                    <>
                      <Row gutter={24}>
                        <Col span={record.id === this.state.id ? 8 : 12}>
                          {!record.isNew ? (
                            <Button
                              size="small"
                              type="primary"
                              disabled={
                                this.state.disabledRadio &&
                                record.id !== this.state.id
                              }
                              danger={
                                this.state.isCancel &&
                                record.id === this.state.id
                              }
                              icon={
                                this.state.isCancel === true &&
                                record.id === this.state.id ? (
                                  <MinusCircleOutlined />
                                ) : (
                                  <EditOutlined />
                                )
                              }
                              onClick={() => {
                                if (
                                  this.state.isCancel === true &&
                                  record.id === this.state.id
                                ) {
                                  this.EditData(record, this.state.isCancel);
                                } else {
                                  this.setState({
                                    id: record.id,
                                    isCancel: true,
                                    isRemove: false,
                                  });
                                }
                              }}
                            ></Button>
                          ) : (
                            <Button
                              size="small"
                              type="primary"
                              icon={<SaveOutlined />}
                              onClick={() => this.saveTypeMaintenance()}
                            ></Button>
                          )}
                        </Col>

                        <Col span={record.id === this.state.id ? 8 : 0}>
                          {record.id === this.state.id ? (
                            <Button
                              size="small"
                              disabled={!this.state.isSave}
                              type="primary"
                              icon={<SaveOutlined />}
                              onClick={() => {
                                this.updateTypeMaintenanceById(record.id);
                              }}
                            ></Button>
                          ) : null}
                        </Col>

                        <Col span={record.id === this.state.id ? 8 : 12}>
                          {!record.isNew ? (
                            <Button
                              size="small"
                              danger
                              disabled={!this.state.isRemove}
                              type="primary"
                              icon={<DeleteOutlined />}
                              onClick={() =>
                                this.deleteTypeMaintainByCode(record)
                              }
                            ></Button>
                          ) : (
                            <Button
                              size="small"
                              type="primary"
                              icon={<DeleteOutlined />}
                              onClick={() => this.RemoveNewData("tableData")}
                            ></Button>
                          )}
                        </Col>
                      </Row>
                    </>
                  );
                }}
              />
            </Table>
          </Col>
        </Row>
      </Form>
    );
  }
  rowSelectionCheckbox(dataSource) {
    const rowSelection = {
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        const checkIndex = this.state.selectedRowKeys.findIndex(
          (s) => s === record.id
        );
        const indexOf = this.state[dataSource].findIndex(
          (s, index) => s.id === record.id
        );
        let rows = this.state.selectedRowKeys.map((s) => s);
        if (checkIndex !== -1) {
          rows[indexOf] = undefined;
          this.setState({
            selectedRows: selectedRows,
            selectedRowKeys: rows,
          });
        } else {
          rows[indexOf] = record.id;
          this.setState({
            selectedRows: selectedRows,
            selectedRowKeys: rows,
          });
        }
      },
      onChange: async (selectedRowKeys, selectedRows) => {
        await this.setState({
          selectedRows: selectedRows,
        });
      },
    };
    return rowSelection;
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  onEditOrCancel = (record, nameArr, replaceArr) => {
    if (this.state.isCancel === true && record.id === this.state.id) {
      this.EditData(record, this.state.isCancel);
      this.setFormFieldValue(nameArr, this.state[replaceArr]);
    } else {
      this.setState({ id: record.id, isCancel: true, isRemove: false });
    }
  };

  renderTablechildren() {
    return (
      <div>
        <Form ref={this.formRef} onFinish={this.onFinish} autoComplete="off">
          <Row gutter={24}>
            <Col span={12} style={{ paddingRight: "5px" }}>
              <Button type="primary" style={{ width: "100%", cursor: "text" }}>
                表示カテゴリ
              </Button>
              {this.renderTableCategoryDisplayMaintaincet()}
            </Col>
            <Col span={12} style={{ paddingLeft: "5px" }}>
              <Button type="primary" style={{ width: "100%", cursor: "text" }}>
                不要検査
              </Button>
              {this.renderTableUnnecessaryExamList()}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
  renderTableCategoryDisplayMaintaincet() {
    const paramsDataTable1 = {
      W2_category_cd: 0,
      W2_enabled_disabled: 0,
      W2_display_order: 0,
      W2_category_name: "",
    };
    return (
      <Table
        dataSource={
          this.formRef.current?.getFieldValue("tableData1")
            ? this.formRef.current?.getFieldValue("tableData1")
            : []
        }
        loading={this.state.isLoadingData1}
        pagination={false}
        scroll={{ y: 500 }}
        bordered={true}
        rowKey={(record) => record.id}
        size="small"
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: this.state.selectedRowKeys,
          ...this.rowSelectionCheckbox("dataSource1"),
        }}
      >
        <Table.Column
          title="SEQ"
          dataIndex="W2_display_order"
          width="90px"
          render={(text, record, index) => {
            return (
              <>
                <Form.Item
                  style={{ textAlign: "right" }}
                  name={["tableData1", index, "W2_display_order"]}
                >
                  {record.W2_category_name.length > 0 ? (
                    this.state.id === record.id ? (
                      <Input
                        type="number"
                        onChange={(event) => {
                          this.StateEnabledSave(
                            event,
                            "W2_display_order",
                            record,
                            this.state.dataSource1
                          );
                        }}
                        value={record.W2_display_order || null}
                      />
                    ) : (
                      record.W2_display_order
                    )
                  ) : (
                    <Input
                      type="number"
                      value={record.W2_display_order || null}
                    />
                  )}
                </Form.Item>
              </>
            );
          }}
        />
        <Table.Column
          title="名称"
          dataIndex="W2_category_name"
          render={(text, record, index) => {
            return (
              <>
                <Form.Item name={["tableData1", index, "W2_category_name"]}>
                  <Tooltip
                    title={
                      record?.W2_category_cd + ":" + record.W2_category_name
                    }
                  >
                    {record.W2_category_name.length > 0 ? (
                      this.state.id === record.id ? (
                        <Input
                          onChange={(event) => {
                            this.StateEnabledSave(
                              event,
                              "W2_category_name",
                              record,
                              this.state.dataSource1
                            );
                          }}
                          value={record.W2_category_name || null}
                        />
                      ) : (
                        record.W2_category_name
                      )
                    ) : (
                      <Input value={text} />
                    )}
                  </Tooltip>
                </Form.Item>
              </>
            );
          }}
        />

        <Table.Column
          title="統合"
          dataIndex=""
          width="70px"
          render={(value, record) => {
            return (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const formValues =
                    this.formRef.current.getFieldValue("tableData1");
                  const index = formValues.findIndex((s) => s.id === record.id);
                  const value = formValues[index];
                  const selectedRow = !!this.state.selectedRowKeys[0] ? 1 : 0;
                  const params = {
                    W2_category_cd: value.W2_category_cd,
                    W2_enabled_disabled: selectedRow,
                    W2_display_order: Number(value.W2_display_order),
                    W2_category_name: value.W2_category_name,
                    node_id: this.state.node_id,
                    id: value.id,
                  };
                  NotInputCheckMaintainAction.saveCategoryDisplayMaintaince(
                    params
                  ).then((res) => {});
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 400,
                      component: (
                        <WS0103001_CategoryListSettingSub
                          Li_Title={"ｶﾃｺﾞﾘ一覧設定SUB"}
                          Lio_CategoryList={record.W2_multiple_categories}
                          node_id={this.state.node_id}
                          W2_category_cd={record.W2_category_cd}
                          onFinishScreen={(obj) => {
                            if (obj.load) {
                              this.saveCategoryDisplayMaintaince(record);
                            }
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                {record.Expression_11}
              </span>
            );
          }}
        />
        <Table.Column
          width={90}
          title=""
          render={(text, record, index) => {
            return (
              <>
                <Row gutter={24}>
                  <Col span={record.id === this.state.id ? 8 : 12}>
                    <Button
                      size="small"
                      type="primary"
                      disabled={
                        this.state.disabledRadio && record.id !== this.state.id
                      }
                      danger={
                        this.state.isCancel && record.id === this.state.id
                      }
                      icon={
                        this.state.isCancel === true &&
                        record.id === this.state.id ? (
                          <MinusCircleOutlined />
                        ) : (
                          <EditOutlined />
                        )
                      }
                      onClick={() => {
                        if (
                          this.state.isCancel === true &&
                          record.id === this.state.id
                        ) {
                          this.EditData(record, this.state.isCancel);
                          this.onEditOrCancel(
                            record,
                            "tableData1",
                            "dataSource1"
                          );
                        } else {
                          this.setState({
                            id: record.id,
                            isCancel: true,
                            isRemove: false,
                          });
                        }
                      }}
                    ></Button>
                  </Col>

                  <Col span={record.id === this.state.id ? 8 : 0}>
                    {record.id === this.state.id ? (
                      <Button
                        size="small"
                        disabled={!this.state.isSave}
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => {
                          this.saveCategoryDisplayMaintaince(record);
                        }}
                      ></Button>
                    ) : null}
                  </Col>
                </Row>
              </>
            );
          }}
        />
      </Table>
    );
  }
  checkData(value) {
    if (value === undefined || value == null) {
      return false;
    } else {
      if (value !== "") {
        return true;
      } else {
        return false;
      }
    }
  }
  showWS0271001_InspectItemSearchQuerySingle(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS0271001_InspectItemSearchQuerySingle
            Lio_InspectItemCode={record.W3_inspect_cd}
            onFinishScreen={(output) => {
              let formValues = this.formRef.current.getFieldValue("tableData2");
              const index = formValues.findIndex((s) => s.id === this.state.id);
              if (index !== -1) {
                formValues[index].W3_inspect_cd = output.Lio_InspectItemCode;
                formValues[index].exam_name = output.recordData.exam_name;
                if (output.Lio_InspectItemCode > 0) {
                  this.setState({ isSave: true });
                }
              } else {
                formValues[0].W3_inspect_cd = output.Lio_InspectItemCode;
                formValues[0].exam_name = output.recordData.exam_name;
              }
              this.closeModal();
            }}
          />
        ),
      },
    });
  }
  renderTableUnnecessaryExamList() {
    const paramsDataTable2 = {
      node_id: "",
      W3_inspect_cd: "",
      W3_grp: "",
      exam_name: "",
      isNew: true,
    };
    return (
      <Table
        dataSource={
          this.formRef.current?.getFieldValue("tableData2")
            ? this.formRef.current?.getFieldValue("tableData2")
            : []
        }
        loading={this.state.isLoadingData2}
        pagination={false}
        size="small"
        bordered={true}
        rowKey={(record) => record.id}
        // rowSelection={{
        //   type: 'radio',
        //   checkStrictly: true,
        //   onChange: async (selectedRowKeys, selectedRows) => {
        //     await this.setState({
        //       selectedRows: selectedRows,
        //       F3: { disabled: false, type: 2 }
        //     })
        //   }
        // }}
      >
        <Table.Column
          title="検査ｺｰﾄﾞ"
          dataIndex="W3_inspect_cd"
          render={(text, record, index) => {
            return (
              <>
                <Form.Item name={["tableData2", index, "W3_inspect_cd"]}>
                  {record.W3_inspect_cd > 0 ? (
                    this.state.id === record.id ? (
                      <InputNumber
                        type="number"
                        readOnly={true}
                        onDoubleClick={() =>
                          this.showWS0271001_InspectItemSearchQuerySingle(
                            record
                          )
                        }
                        onChange={(event) => {
                          this.StateEnabledSave(
                            event,
                            "W3_inspect_cd",
                            record,
                            this.state.dataSource2
                          );
                        }}
                        value={record.W3_inspect_cd || null}
                      />
                    ) : (
                      <div
                        onDoubleClick={() =>
                          this.showWS0271001_InspectItemSearchQuerySingle(
                            record
                          )
                        }
                        style={{ textAlign: "right" }}
                      >
                        <span>{record.W3_inspect_cd}</span>
                      </div>
                    )
                  ) : (
                    <InputNumber
                      onDoubleClick={() =>
                        this.showWS0271001_InspectItemSearchQuerySingle(record)
                      }
                      readOnly={true}
                      type="number"
                      value={record.W3_inspect_cd || null}
                    />
                  )}
                </Form.Item>
              </>
            );
          }}
        />
        <Table.Column
          title="名称"
          dataIndex="exam_name"
          render={(text, record, index) => {
            return (
              <>
                <Form.Item name={["tableData2", index, "exam_name"]}>
                  {
                    <Input
                      style={{ border: "none" }}
                      readOnly
                      value={record.exam_name || null}
                    />
                  }
                </Form.Item>
              </>
            );
          }}
        />
        <Table.Column
          title="ｸﾞﾙｰﾌﾟ"
          dataIndex="W3_grp"
          render={(text, record, index) => {
            return (
              <>
                <Form.Item name={["tableData2", index, "W3_grp"]}>
                  <Input
                    type="text"
                    value={record.W3_grp || null}
                    onChange={(event) => {
                      if (!!record.isNew) {
                        this.setState({ isSave: true });
                      } else {
                        this.setState({
                          isSave: true,
                          isCancel: true,
                          isRemove: false,
                          id: record.id,
                        });
                      }
                    }}
                  />
                </Form.Item>
              </>
            );
          }}
        />
        <Table.Column
          width={90}
          title={
            <Button
              size="small"
              type="primary"
              style={{ textAlign: "center" }}
              icon={<PlusOutlined />}
              onClick={() =>
                this.AddNewData("tableData2", paramsDataTable2, "exam_name")
              }
            ></Button>
          }
          render={(text, record, index) => {
            return (
              <>
                <Row gutter={24}>
                  <Col span={record.id === this.state.id ? 8 : 12}>
                    {!record?.isNew ? (
                      <Button
                        size="small"
                        type="primary"
                        disabled={
                          this.state.disabledRadio &&
                          record.id !== this.state.id
                        }
                        danger={
                          this.state.isCancel && record.id === this.state.id
                        }
                        icon={
                          this.state.isCancel === true &&
                          record.id === this.state.id ? (
                            <MinusCircleOutlined />
                          ) : (
                            <EditOutlined />
                          )
                        }
                        onClick={() => {
                          this.onEditOrCancel(
                            record,
                            "tableData2",
                            "dataSource2"
                          );
                        }}
                      ></Button>
                    ) : (
                      <Button
                        size="small"
                        type="primary"
                        disabled={!record.exam_name.length > 0}
                        icon={<SaveOutlined />}
                        onClick={() => this.saveUnnecessaryExamList()}
                      ></Button>
                    )}
                  </Col>

                  <Col span={record.id === this.state.id ? 8 : 0}>
                    {record.id === this.state.id ? (
                      <Button
                        id="name2"
                        size="small"
                        disabled={!this.state.isSave}
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => {
                          this.updateUnnecessaryExamList(record);
                        }}
                      ></Button>
                    ) : null}
                  </Col>

                  <Col span={record.id === this.state.id ? 8 : 12}>
                    {!record?.isNew ? (
                      <Button
                        size="small"
                        danger={true}
                        disabled={!this.state.isRemove}
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          this.deleteDataUnnecessaryExamList(record)
                        }
                      ></Button>
                    ) : (
                      <Button
                        size="small"
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={() => this.RemoveNewData("tableData2")}
                      ></Button>
                    )}
                  </Col>
                </Row>
              </>
            );
          }}
        />
      </Table>
    );
  }

  render() {
    const { current } = this.state;

    return (
      <div className="not-input-check-maintain">
        <Card title="未入力チェック保守">
          <Menu selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="変更">(E)</Menu.Item>
            <Menu.Item
              key="パターン"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 400,
                    component: (
                      <WS0745022_PatternChange
                        Lio_Pattern={this.state.Pattern}
                        onFinishScreen={(output) => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: false,
                            },
                          });
                          const node_id = this.state.node_id;
                          const params = {
                            Pattern: output.Lio_Pattern,
                            StsPatternCorrection: output.StsPatternCorrection,
                          };
                          NotInputCheckMaintainAction.getPatternF8({
                            node_id: node_id,
                            Pattern: params.Pattern,
                          }).then((res) => {
                            this.getTreeData(params);
                            NotInputCheckMaintainAction.generateData({
                              node_id,
                            }).then((res) => {
                              this.setState({ Pattern: res?.Pattern });
                              this.getTypeMaintenance(this.state.node_id);
                              this.getCategoryDisplayMaintaince(node_id);
                              this.getUnnecessaryExamList(node_id);
                            });
                          });
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              パターン
            </Menu.Item>
          </Menu>

          <Card>
            <Row gutter={24}>
              <Col style={{ width: "250px", borderRight: "1px solid #afabab" }}>
                <Tree
                  showIcon
                  icon={<CarryOutOutlined />}
                  treeData={this.state ? this.state?.treeData : []}
                  defaultExpandedKeys={["0-0"]}
                  onSelect={this.onSelectNode}
                  defaultSelectedKeys={[
                    this.state.treeData &&
                    this.state.treeData[0] &&
                    this.state.treeData[0].key
                      ? this.state.treeData[0].key
                      : "",
                  ]}
                  // switcherIcon={<FormOutlined />}
                />
              </Col>
              <Col style={{ width: "calc(100% - 250px)" }}>
                {this.state?.selectedNodes[0]?.children.length > 0 ||
                this.state?.defaultShowTableParent
                  ? this.renderTableParent()
                  : this.renderTablechildren()}
              </Col>
              <Col></Col>
            </Row>
          </Card>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          destroyOnClose={true}
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
)(WS0745001_NotInputCheckMaintain);
