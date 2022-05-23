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
  Space,
  Checkbox,
  Button,
  Modal,
  message,
} from "antd";

import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AnotherInspectItemSettingCategoryService from "services/InspectionMaintenance/AnotherInspectItemSettingCategory/AnotherInspectItemSettingCategoryService";
import WS0267001_CategorySearchQuerySingle from "pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle";
import WS2705075_PatternSettingSub from "./WS2705075_PatternSettingSub";
import  ModalDraggable  from "components/Commons/ModalDraggable";

const sty = {
  border: "0px",
};
class WS2705001_AnotherInspectItemSettingCategory extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "カテゴリ別検査項目設定";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTableLeft: false,
      isLoadingTableRight: false,
    };
  }

  componentDidMount = () => {
    AnotherInspectItemSettingCategoryService.getScreenDataService()
      .then((res) => {
        this.formRef.current.setFieldsValue({
          PatternCodeDisplayList: res.data,
          PatternCode: res.data[0]?.pattern_code,
        });
        this.forceUpdate();
        this.searchCategorySettings();
      })
      .catch((err) => {});
  };
  searchCategorySettings = () => {
    this.setState({ isLoadingTableLeft: true });
    const { PatternCode, Search } = this.formRef.current.getFieldsValue();
    AnotherInspectItemSettingCategoryService.getCategorySettingsService({
      PatternCode,
      Search,
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          searchCategorySettingsDisplayList: res.data,
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
        this.setState({ isLoadingTableLeft: false });
      });
  };

  searchInspectSet = (category_code) => {
    this.setState({ isLoadingTableRight: true });
    const { PatternCode } = this.formRef.current.getFieldsValue();

    AnotherInspectItemSettingCategoryService.getInspectSetService({
      category_code: category_code,
      pattern_code: PatternCode,
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          searchInspectSetDisplayList: res.data,
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
        this.setState({ isLoadingTableRight: false });
      });
  };

  deleteDataCategorySettings = (id, pattern_code, category_code) => {
    AnotherInspectItemSettingCategoryService.deleteDataCategorySettingsService({
      id,
      pattern_code: pattern_code,
      category_code: category_code,
    })
      .then((res) => {
        message.success("成功");
        this.formRef.current.setFieldsValue({
          searchInspectSetDisplayList: [],
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
        this.searchCategorySettings();
      });
  };
  deleteDataInspectSet = (id, pattern_code, category_code) => {
    AnotherInspectItemSettingCategoryService.deleteDataInspectSetService({
      id,
      pattern_code,
      category_code,
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
        this.searchInspectSet(category_code);
      });
  };
  saveDataCategorySetting = (id) => {
    const { searchCategorySettingsDisplayList } =
      this.formRef.current.getFieldsValue();

    const { PatternCode } = this.formRef.current.getFieldsValue();

    let dataFormatToCreateOrUpdate = searchCategorySettingsDisplayList?.filter(
      (item) => {
        if (item != undefined && item.id === id) {
          return item;
        }
      }
    );
    if (id === "create_new") {
      dataFormatToCreateOrUpdate = [
        { ...dataFormatToCreateOrUpdate[0], id: "" },
      ];
    }

    AnotherInspectItemSettingCategoryService.saveDataCategorySettingService({
      category_code: dataFormatToCreateOrUpdate[0].category_code,
      pattern_code: PatternCode,
      display_no: dataFormatToCreateOrUpdate[0].display_no,
      category_name: dataFormatToCreateOrUpdate[0].category_name,
      CategoryDeterminingPresence:
        dataFormatToCreateOrUpdate[0].CategoryDeterminingPresence,
      id:
        dataFormatToCreateOrUpdate[0].id === ""
          ? ""
          : dataFormatToCreateOrUpdate[0].id,
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
        this.searchCategorySettings();
      });
  };

  saveDataInspectSet = (id) => {
    const { searchInspectSetDisplayList, PatternCode } =
      this.formRef.current.getFieldsValue();
    let dataFormatToCreateOrUpdate = searchInspectSetDisplayList.filter(
      (item) => {
        if (item != undefined && item.id === id) {
          return item;
        }
      }
    );
    if (id === "create_new") {
      dataFormatToCreateOrUpdate = [
        { ...dataFormatToCreateOrUpdate[0], id: "" },
      ];
    }

    AnotherInspectItemSettingCategoryService.saveDataInspectSetService({
      category_code: this.state.category_code,
      pattern_code: PatternCode,
      display_order: dataFormatToCreateOrUpdate[0].display_order,
      exam_code: dataFormatToCreateOrUpdate[0].exam_code,
      id:
        dataFormatToCreateOrUpdate[0].id === ""
          ? ""
          : dataFormatToCreateOrUpdate[0].id,
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
        this.searchInspectSet(this.state.category_code);
      });
  };

  onFinish(values) {}

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys", selectedRows[0]);
    if (selectedRows[0].id === "create_new") return;
    this.setState({ category_code: selectedRows[0].category_code });
    this.searchInspectSet(selectedRows[0].category_code);
  };

  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    return (
      <div className="another-inspect-item-setting-category">
        <Card
          title={
            <Space>
              <div>カテゴリ別検査項目設定</div>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "60%",
                      component: (
                        <WS2705075_PatternSettingSub
                          onFinishScreen={() => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                }}
              >
                ﾊﾟﾀｰﾝ登録
              </Button>
            </Space>
          }
        >
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <div style={{ display: "none" }}>
              <Form.Item name="PatternCodeList">
                <Input />
              </Form.Item>
              <Form.Item name="StsPatternChangingContent">
                <Input />
              </Form.Item>
              <Form.Item name="StsPatternContentExpand">
                <Input />
              </Form.Item>
              <Form.Item name="StsSubform">
                <Input />
              </Form.Item>
            </div>
            <Row>
              <Col>
                <Space>
                  <Form.Item name="PatternCode" label="パターン">
                    <Select style={{ width: "300px" }}>
                      {this.formRef.current
                        ? this.formRef.current.getFieldValue(
                            "PatternCodeDisplayList"
                          )
                          ? this.formRef.current
                              .getFieldValue("PatternCodeDisplayList")
                              .map((item, index) => {
                                return (
                                  <Select.Option
                                    value={item.pattern_code}
                                    key={index}
                                  >
                                    {item.pattern_name}
                                  </Select.Option>
                                );
                              })
                          : null
                        : null}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <span>
                      {this.formRef.current?.getFieldValue("pattern_code")}
                    </span>
                  </Form.Item>
                </Space>
              </Col>
              <Col span={10}>
                <Form.Item name="Search" label="検査検索">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button onClick={() => this.searchCategorySettings()}>
                  検索
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue(
                          "searchCategorySettingsDisplayList"
                        )
                      : []
                  }
                  loading={this.state.isLoadingTableLeft}
                  size="small"
                  rowKey={(record) => record.id}
                  style={{ width: "98%" }}
                  scroll={{ y: 600 }}
                  bordered={true}
                  onRow={(record, rowIndex) => {
                    return {
                      // double click row
                      onDoubleClick: () => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "800px",
                            component: (
                              <WS0267001_CategorySearchQuerySingle
                                onFinishScreen={({ Lio_CategoryCode }) => {
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      },
                    };
                  }}
                  rowSelection={{
                    type: "radio",
                    ...rowSelection,
                  }}
                >
                  <Table.Column
                    title="順"
                    dataIndex="display_no"
                    render={(text, record) => {
                      return (
                        <>
                          <Form.Item
                            name={[
                              "searchCategorySettingsDisplayList",
                              this.findIndexByID(
                                this.formRef.current.getFieldValue(
                                  "searchCategorySettingsDisplayList"
                                ),
                                record.id
                              ),
                              "id",
                            ]}
                            style={{ marginBottom: "-5px" }}
                            hidden
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            name={[
                              "searchCategorySettingsDisplayList",
                              this.findIndexByID(
                                this.formRef.current.getFieldValue(
                                  "searchCategorySettingsDisplayList"
                                ),
                                record.id
                              ),
                              "display_no",
                            ]}
                            style={{ marginBottom: "0px" }}
                          >
                            <Input style={sty} />
                          </Form.Item>
                        </>
                      );
                    }}
                  />
                  <Table.Column
                    title="カテゴリ"
                    dataIndex="category_code"
                    render={(text, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "searchCategorySettingsDisplayList",
                            this.findIndexByID(
                              this.formRef.current.getFieldValue(
                                "searchCategorySettingsDisplayList"
                              ),
                              record.id
                            ),
                            "category_code",
                          ]}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input style={sty} />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="判定"
                    align="center"
                    width={50}
                    dataIndex="CategoryDeterminingPresence"
                    render={(value, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "searchCategorySettingsDisplayList",
                            this.findIndexByID(
                              this.formRef.current.getFieldValue(
                                "searchCategorySettingsDisplayList"
                              ),
                              record.id
                            ),
                            "CategoryDeterminingPresence",
                          ]}
                          style={{ marginBottom: "0px" }}
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="カテゴリ名称"
                    dataIndex="category_name"
                    render={(value, record) => {
                      return (
                        <Form.Item
                          name={[
                            "searchCategorySettingsDisplayList",
                            this.findIndexByID(
                              this.formRef.current.getFieldValue(
                                "searchCategorySettingsDisplayList"
                              ),
                              record.id
                            ),
                            "category_name",
                          ]}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input style={sty} />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    align="center"
                    title={() => (
                      <Button
                        size="small"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          if (
                            this.formRef.current.getFieldValue(
                              "searchCategorySettingsDisplayList"
                            ) === undefined
                          ) {
                            this.formRef.current.setFieldsValue({
                              searchCategorySettingsDisplayList: [
                                {
                                  id: "create_new",
                                },
                              ],
                            });
                            this.forceUpdate();
                          } else {
                            let isCreatedNew = this.formRef.current
                              .getFieldValue(
                                "searchCategorySettingsDisplayList"
                              )
                              .filter((item) => {
                                if (item.id === "create_new") {
                                  return item;
                                }
                              });
                            if (isCreatedNew.length) return;
                            this.formRef.current.setFieldsValue({
                              searchCategorySettingsDisplayList: [
                                {
                                  id: "create_new",
                                },
                                ...this.formRef.current.getFieldValue(
                                  "searchCategorySettingsDisplayList"
                                ),
                              ],
                            });
                            this.forceUpdate();
                          }
                        }}
                      />
                    )}
                    dataIndex=""
                    render={(text, record, index) => {
                      return (
                        <Space>
                          <Button
                            size="small"
                            icon={<SaveOutlined />}
                            shape="circle"
                            className="text-success"
                            style={{ float: "right", borderColor: "green" }}
                            onClick={() =>
                              this.saveDataCategorySetting(record.id)
                            }
                          ></Button>

                          <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            style={{ float: "right" }}
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
                                okText: "削除",
                                cancelText: "キャンセル",
                                onOk: () => {
                                  this.deleteDataCategorySettings(
                                    record.id,
                                    record.pattern_code,
                                    record.category_code
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
              <Col span={16}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue(
                          "searchInspectSetDisplayList"
                        )
                      : []
                  }
                  loading={this.state.isLoadingTableRight}
                  size="small"
                  pagination={true}
                  rowKey={(record) => record.id}
                  style={{ width: "98%" }}
                  scroll={{ y: 600 }}
                  bordered={true}
                >
                  <Table.Column
                    title="順"
                    dataIndex="display_order"
                    render={(text, record, index) => {
                      return (
                        <>
                          <Form.Item
                            name={[
                              "searchInspectSetDisplayList",
                              this.findIndexByID(
                                this.formRef.current.getFieldValue(
                                  "searchInspectSetDisplayList"
                                ),
                                record.id
                              ),
                              "id",
                            ]}
                            style={{ marginBottom: "-5px" }}
                            hidden
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            name={[
                              "searchInspectSetDisplayList",
                              this.findIndexByID(
                                this.formRef.current.getFieldValue(
                                  "searchInspectSetDisplayList"
                                ),
                                record.id
                              ),
                              "display_order",
                            ]}
                            style={{ marginBottom: "0px" }}
                          >
                            <Input
                              readOnly={
                                record.id != "create_new" ? true : false
                              }
                              style={sty}
                            />
                          </Form.Item>
                        </>
                      );
                    }}
                  />
                  <Table.Column
                    title="検査コード"
                    dataIndex="exam_code"
                    render={(value, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "searchInspectSetDisplayList",
                            this.findIndexByID(
                              this.formRef.current.getFieldValue(
                                "searchInspectSetDisplayList"
                              ),
                              record.id
                            ),
                            "exam_code",
                          ]}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input
                            readOnly={record.id != "create_new" ? true : false}
                            style={sty}
                          />
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column title="略名" dataIndex="exam_short_name" />
                  <Table.Column title="検査名称" dataIndex="exam_name" />
                  <Table.Column title="タイプ" dataIndex="Expression_24" />
                  <Table.Column
                    title="判定"
                    dataIndex="Expression_23"
                    width={50}
                    render={(text) => {
                      return <div style={{ textAlign: "center" }}>{text}</div>;
                    }}
                  />
                  <Table.Column
                    title="外部検査"
                    dataIndex="item_code_external"
                    render={(value, record, index) => {
                      return (
                        <Space>
                          <Form.Item style={{ marginBottom: "0px" }}>
                            <span>{value}</span>
                          </Form.Item>
                          <Form.Item style={{ marginBottom: "0px" }}>
                            <span>{record.exam_name}</span>
                          </Form.Item>
                        </Space>
                      );
                    }}
                  />
                  <Table.Column
                    title="検査依頼"
                    dataIndex="exam_code_external"
                    render={(value, record, index) => {
                      return (
                        <Space>
                          <Form.Item style={{ marginBottom: "0px" }}>
                            <span>{value}</span>
                          </Form.Item>
                          <Form.Item style={{ marginBottom: "0px" }}>
                            <span>{record.exam_kanji_name_external}</span>
                          </Form.Item>
                        </Space>
                      );
                    }}
                  />
                  <Table.Column
                    align="center"
                    title={() => (
                      <Button
                        size="small"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          if (
                            this.formRef.current.getFieldValue(
                              "searchInspectSetDisplayList"
                            ) === undefined
                          ) {
                            return;
                          } else {
                            let isCreatedNew = this.formRef.current
                              .getFieldValue("searchInspectSetDisplayList")
                              .filter((item) => {
                                if (item.id === "create_new") {
                                  return item;
                                }
                              });
                            if (isCreatedNew.length) return;
                            if (isCreatedNew.length) return;
                            this.formRef.current.setFieldsValue({
                              searchInspectSetDisplayList: [
                                {
                                  id: "create_new",
                                },
                                ...this.formRef.current.getFieldValue(
                                  "searchInspectSetDisplayList"
                                ),
                              ],
                            });
                            this.forceUpdate();
                          }
                        }}
                      />
                    )}
                    dataIndex=""
                    render={(text, record, index) => {
                      return (
                        <Space>
                          <Button
                            size="small"
                            icon={<SaveOutlined />}
                            shape="circle"
                            className="text-success"
                            style={{ float: "right", borderColor: "green" }}
                            hidden={record.id != "create_new" ? true : false}
                            onClick={() => {
                              this.saveDataInspectSet(record.id);
                            }}
                          ></Button>

                          <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            style={{ float: "right" }}
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
                                okText: "削除",
                                cancelText: "キャンセル",
                                onOk: () => {
                                  this.deleteDataInspectSet(
                                    record.id,
                                    record.pattern_code,
                                    record.category_code
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
          </Form>
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2705001_AnotherInspectItemSettingCategory);
