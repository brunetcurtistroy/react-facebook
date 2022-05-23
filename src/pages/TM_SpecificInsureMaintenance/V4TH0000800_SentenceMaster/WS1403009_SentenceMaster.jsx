import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Table,
  Row,
  Col,
  Button,
  Space,
  Modal,
  Input,
  Form,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import SentenceMasterService from "services/SpecificInsureMaintenance/SentenceMaster/SentenceMasterService";
class WS1403009_SentenceMaster extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "文章マスタ";

    this.state = {
      isLoadingTableLeft: false,
      isLoadingTableRight: false,
      document_classification_code: "",
    };
  }

  componentDidMount = () => {
    this.getSentenceMaster();
  };
  getSentenceMaster = () => {
    this.setState({ isLoadingTableLeft: true });
    SentenceMasterService.getSentenceMasterService()
      .then((res) => {
        this.formRef.current.setFieldsValue({
          SentenceMasterDisplayList: res.data,
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
  getSentenceMasterSub = (document_classification_code) => {
    this.setState({
      document_classification_code: document_classification_code,
      isLoadingTableRight: true,
    });
    SentenceMasterService.getSentenceMasterSubService({
      document_classification_code,
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          SentenceMasterSubDisplayList: res.data,
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

  saveButton = () => {
    const { document_classification_code } = this.state;
    let { SentenceMasterSubDisplayList } =
      this.formRef.current.getFieldsValue();
    SentenceMasterService.saveAndUpdateService({
      document_classification_code,
      SentenceMaster: SentenceMasterSubDisplayList.map((item) => {
        if (item.id === "create_new") item.id = "";
        return item;
      }),
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
        this.getSentenceMasterSub(document_classification_code);
      });
  };
  deleteButton = (id) => {
    console.log("id delete", id);
    const { document_classification_code } = this.state;
    SentenceMasterService.deleteSentenceMasterSubService({
      id: id,
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
        this.getSentenceMasterSub(document_classification_code);
      });
  };
  onFinish = (values) => {
    console.log("Values values", values);
  };
  checkEdit = (id) => {
    let isReadOnly = false;
    if (id) {
      isReadOnly = true;
      if (id === "create_new") {
        isReadOnly = false;
      }
    }
    return isReadOnly;
  };

  render() {
    return (
      <div className="sentence-master">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card title="文章マスタ">
            <Row gutter={24}>
              <Col span={9} style={{ marginRight: "10px" }}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue(
                          "SentenceMasterDisplayList"
                        )
                      : []
                  }
                  loading={this.state.isLoadingTableLeft}
                  rowKey={(record) => record.id}
                  size="small"
                  bordered
                  scroll={{ y: 700 }}
                  pagination={false}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        console.log("record", record);
                        this.getSentenceMasterSub(
                          record.document_classification_code
                        );
                      },
                    };
                  }}
                >
                  <Table.Column
                    title="文章分類コード"
                    dataIndex="document_classification_code"
                  />
                  <Table.Column
                    title="文章分類名"
                    dataIndex="document_classification_name"
                  />
                </Table>
              </Col>

              <Col span={14}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue(
                          "SentenceMasterSubDisplayList"
                        )
                      : []
                  }
                  loading={this.state.isLoadingTableRight}
                  rowKey={(record) => record.id}
                  size="small"
                  scroll={{ y: 700 }}
                  pagination={false}
                  bordered
                >
                  <Table.Column
                    title="文章コード"
                    dataIndex="sentence_code"
                    render={(text, record, index) => (
                      <>
                        <Form.Item
                          name={["SentenceMasterSubDisplayList", index, "id"]}
                          style={{ marginBottom: "-5px" }}
                          hidden
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={[
                            "SentenceMasterSubDisplayList",
                            index,
                            "sentence_code",
                          ]}
                          style={{ marginBottom: "-5px" }}
                        >
                          <Input readOnly={this.checkEdit(record.id)} />
                        </Form.Item>
                      </>
                    )}
                  />
                  <Table.Column
                    title="検索文字"
                    dataIndex="search_character"
                    render={(text, record, index) => (
                      <Form.Item
                        name={[
                          "SentenceMasterSubDisplayList",
                          index,
                          "search_character",
                        ]}
                        style={{ marginBottom: "-5px" }}
                      >
                        <Input />
                      </Form.Item>
                    )}
                  />
                  <Table.Column
                    title="内容"
                    dataIndex="content"
                    render={(text, record, index) => (
                      <Form.Item
                        name={[
                          "SentenceMasterSubDisplayList",
                          index,
                          "content",
                        ]}
                        style={{ marginBottom: "-5px" }}
                      >
                        <Input />
                      </Form.Item>
                    )}
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
                              "SentenceMasterSubDisplayList"
                            ) === undefined
                          ) {
                            return;
                          } else {
                            let isCreatedNew = this.formRef.current
                              .getFieldValue("SentenceMasterSubDisplayList")
                              .filter((item) => {
                                if (item.id === "create_new") {
                                  return item;
                                }
                              });
                            console.log("Vo day", isCreatedNew);
                            if (isCreatedNew.length) return;
                            this.formRef.current.setFieldsValue({
                              SentenceMasterSubDisplayList: [
                                {
                                  id: "create_new",
                                },
                                ...this.formRef.current.getFieldValue(
                                  "SentenceMasterSubDisplayList"
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
                            onClick={() => this.saveButton()}
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
                                  this.deleteButton(record.id);
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS1403009_SentenceMaster);
