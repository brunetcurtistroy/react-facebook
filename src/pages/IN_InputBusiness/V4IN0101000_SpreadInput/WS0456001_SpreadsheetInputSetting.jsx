import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Col,
  Table,
  Row,
  Form,
  message,
  Button,
  Modal,
  Space,
  Menu,
  Dropdown,
  Input,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import SpreadsheetInputSettingService from "services/InputBusiness/SpreadInput/SpreadsheetInputSettingService";
import WS0456005_BatchCapture from "./WS0456005_BatchCapture";
import WS0456007_Copy from "./WS0456007_Copy";
import WS0456009_Change from "./WS0456009_Change";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0456001_SpreadsheetInputSetting extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "スプレットシート入力設定";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTableParent: false,
      isLoadingTableChild: false,
      onBlurInput: true,
      count: 0,
      selectedRowRecordListParent: null,
    };
  }

  componentDidMount = () => {
    this.getListParent();
  };

  getListParent = () => {
    this.setState({ isLoadingTableParent: true });
    SpreadsheetInputSettingService.getListParentService()
      .then((res) => {
        // this.setState({
        //   selectedRowRecordListParent: null,
        // });
        this.formRef.current.setFieldsValue({
          ListParent: res.data,
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
        this.setState({ isLoadingTableParent: false });
      });
  };

  getListChild = (Li_Seq) => {
    this.setState({ isLoadingTableChild: true });
    SpreadsheetInputSettingService.getListChildService({ Li_Seq: Li_Seq })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          ListChild: res.data,
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
        this.setState({ isLoadingTableChild: false });
      });
  };
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  findIndexByID = (arrayName, keyName, record) => {
    let arrayFieldValue = this.formRef.current?.getFieldValue([arrayName]);
    return arrayFieldValue.findIndex(
      (item) => record[keyName] === item[keyName]
    );
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
      case "ListParent":
        newData = { parent_id: "new" + this.state.count, Seqno: "", item: "" };
        break;

      case "ListChild":
        newData = {
          child_id: "new" + this.state.count,
          no: "",
          exam_item: "",
          exam_type: "",
          Li_Seq: this.state.selectedRowRecordListParent.item_id,
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

  createParentSpreadsheetInputSetting = (record) => {
    let params = isNaN(record.parent_id)
      ? {
          Seqno: record.Seqno,
          item: record.item,
        }
      : {
          parent_id: record.parent_id,
          Seqno: record.Seqno,
          item: record.item,
        };
    SpreadsheetInputSettingService.createParentSpreadsheetInputSettingService(
      params
    )
      .then((res) => {
        message.success("成功");
        this.getListParent();
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

  deleteParentSpreadsheetInputSetting = (record) => {
    SpreadsheetInputSettingService.deleteParentSpreadsheetInputSettingService({
      parent_id: record.parent_id,
    })
      .then((res) => {
        this.setState({ selectedRowRecordListParent: null });
        this.formRef.current.setFieldsValue({
          ListChild: [],
        });
        this.forceUpdate();
        message.success("成功");
        this.getListParent();
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

  createChildSpreadsheetInputSetting = (record) => {
    let params = isNaN(record.child_id)
      ? {
          no: record.no,
          exam_item: record.exam_item,
          exam_type: record.exam_type,
          Li_Seq: record.Li_Seq,
        }
      : {
          child_id: record.child_id,
          no: record.no,
          exam_item: record.exam_item,
          exam_type: record.exam_type,
          Li_Seq: record.Li_Seq,
        };
    SpreadsheetInputSettingService.saveChildSpreadsheetInputSettingService(
      params
    )
      .then((res) => {
        message.success("成功");
        this.getListChild(this.state.selectedRowRecordListParent.Seqno);
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

  deleteChildSpreadsheetInputSetting = (record) => {
    SpreadsheetInputSettingService.deleteChildSpreadsheetInputSettingService({
      child_id: record.child_id,
    })
      .then((res) => {
        message.success("成功");
        this.getListChild(this.state.selectedRowRecordListParent.Seqno);
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

  onFocus = () => {
    this.setState({ onBlurInput: false });
  };
  onBlur = () => {
    this.setState({ onBlurInput: true });
  };

  render() {
    const functionInputCheck = {
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    };
    return (
      <div className="spreadsheet-input-setting">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          size="small"
          initialValues={{}}
        >
          <Card title="スプレットシート入力設定">
            <Row gutter={8}>
              <Col span={8}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue("ListParent")
                      : []
                  }
                  style={{}}
                  loading={this.state.isLoadingTableParent}
                  pagination={true}
                  rowKey={(record) => record.parent_id}
                  scroll={{ y: "69vh" }}
                  rowClassName={(record, index) => {
                    if (this.state.selectedRowRecordListParent) {
                      return record.parent_id ===
                        this.state.selectedRowRecordListParent.parent_id
                        ? "ant-table-row-selected"
                        : "";
                    }
                  }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        if (this.state.onBlurInput === true) {
                          this.getListChild(record.Seqno);
                          this.setState({
                            selectedRowRecordListParent: record,
                          });
                        }
                      },
                    };
                  }}
                >
                  <Table.Column
                    title="シート"
                    dataIndex="Seqno"
                    render={(text, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "ListParent",
                            this.findIndexByID(
                              "ListParent",
                              "parent_id",
                              record
                            ),
                            "Seqno",
                          ]}
                        >
                          <InputNumber
                            readOnly={!isNaN(record.parent_id)}
                            onChange={(value) => {
                              record.Seqno = value;
                            }}
                            {...functionInputCheck}
                          />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="シ  ー  ト  名"
                    dataIndex="item"
                    render={(text, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "ListParent",
                            this.findIndexByID(
                              "ListParent",
                              "parent_id",
                              record
                            ),
                            "item",
                          ]}
                        >
                          <Input
                            onChange={(event) => {
                              record.item = event.target.value;
                            }}
                            {...functionInputCheck}
                          />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    key="action"
                    align="center"
                    title={() => (
                      <Button
                        type="primary"
                        size-="small"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          this.addNewRowToTable("ListParent", "parent_id");
                        }}
                      />
                    )}
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
                              this.createParentSpreadsheetInputSetting(record);
                            }}
                          ></Button>
                          <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            shape="circle"
                            {...functionInputCheck}
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
                                  this.deleteParentSpreadsheetInputSetting(
                                    record
                                  );
                                },
                              });
                            }}
                          ></Button>
                          <Dropdown
                            overlay={() => (
                              <Menu>
                                <Menu.Item
                                  onClick={() => {
                                    if (record.StsDocumentFields) {
                                      Modal.error({
                                        title: "Error",
                                        content: `内容が設定済です`,
                                        width: 300,
                                      });
                                      return;
                                    }
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: 300,
                                        component: (
                                          <WS0456005_BatchCapture
                                            Li_Seq={record.Seqno}
                                            Li_Item={record.item}
                                            StsDocumentFields={
                                              record.StsDocumentFields
                                            }
                                            onFinishScreen={() => {
                                              this.getListParent();
                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    });
                                  }}
                                >
                                  一括取込
                                </Menu.Item>
                                <Menu.Item
                                  onClick={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: 500,
                                        component: (
                                          <WS0456007_Copy
                                            Li_Seq={record.Seqno}
                                            Li_Item={record.item}
                                            onFinishScreen={() => {
                                              this.getListParent();
                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    });
                                  }}
                                >
                                  複写
                                </Menu.Item>
                                <Menu.Item
                                  onClick={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: true,
                                        width: 500,
                                        component: (
                                          <WS0456009_Change
                                            Li_Seq={record.Seqno}
                                            Li_Item={record.item}
                                            onFinishScreen={() => {
                                              this.getListParent();
                                              this.closeModal();
                                            }}
                                          />
                                        ),
                                      },
                                    });
                                  }}
                                >
                                  変更
                                </Menu.Item>
                              </Menu>
                            )}
                          >
                            <Button
                              icon={<MoreOutlined />}
                              size="small"
                            ></Button>
                          </Dropdown>
                        </Space>
                      );
                    }}
                  />
                </Table>
              </Col>
              <Col span={16}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue("ListChild")
                      : []
                  }
                  style={{}}
                  loading={this.state.isLoadingTableChild}
                  pagination={true}
                  scroll={{ y: "69vh" }}
                  rowKey={(record) => record.child_id}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        this.setState({
                          selectedRowRecordListChild: record,
                        });
                      },
                    };
                  }}
                >
                  <Table.Column
                    title="SEQ"
                    dataIndex="no"
                    render={(text, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "ListChild",
                            this.findIndexByID("ListChild", "child_id", record),
                            "no",
                          ]}
                        >
                          <InputNumber
                            onChange={(value) => {
                              record.no = value;
                            }}
                          />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="コード"
                    dataIndex="exam_item"
                    render={(text, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "ListChild",
                            this.findIndexByID("ListChild", "child_id", record),
                            "exam_item",
                          ]}
                        >
                          <InputNumber
                            onChange={(value) => {
                              record.exam_item = value;
                            }}
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 600,
                                  component: (
                                    <WS0271001_InspectItemSearchQuerySingle
                                      Lio_InspectItemCode={record.exam_item}
                                      onFinishScreen={({ recordData }) => {
                                        record.exam_item =
                                          recordData.test_item_code;
                                        record.exam_short_name =
                                          recordData.exam_short_name;
                                        record.exam_name = recordData.exam_name;
                                        record.exam_type = recordData.exam_type;
                                        record.Division =
                                          recordData.StsCategoryInspectBreakdown;
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
                  <Table.Column title="略称" dataIndex="exam_short_name" />
                  <Table.Column title="名称" dataIndex="exam_name" />
                  <Table.Column
                    title="タイプ"
                    dataIndex="exam_type"
                    align="center"
                  />
                  <Table.Column
                    title="使用"
                    dataIndex="Division"
                    align="center"
                  />
                  <Table.Column title="" dataIndex="" />
                  <Table.Column
                    key="action"
                    align="center"
                    title={() =>
                      this.state.selectedRowRecordListParent &&
                      isNaN(
                        this.state.selectedRowRecordListParent.parent_id
                      ) === false && (
                        <Button
                          type="primary"
                          size-="small"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            this.addNewRowToTable("ListChild", "child_id");
                          }}
                        />
                      )
                    }
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
                              this.createChildSpreadsheetInputSetting(record);
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
                                  this.deleteChildSpreadsheetInputSetting(
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
              </Col>
            </Row>
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
)(WS0456001_SpreadsheetInputSetting);
