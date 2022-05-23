import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  Button,
  Table,
  Tabs,
  Col,
  Row,
  Space,
  TimePicker,
  InputNumber,
  Modal,
  message,
  Input,
} from "antd";
import {
  PlusOutlined,
  SaveOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import BasicPeriodTimeService from "services/SystemMaintenance/BasicPeriodTime/BasicPeriodTimeService";
import moment from "moment";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { TabPane } = Tabs;
class WS2697011_BasicPeriodTime extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "基本時間帯";

    this.state = {
      isLoadingTable: false,
      isComfirmCreateNew: false,
    };
  }

  componentDidMount = () => {
    this.getCourseSpecificStardStyleSetting();
  };

  getCourseSpecificStardStyleSetting = () => {
    this.setState({ isLoadingTable: true });
    BasicPeriodTimeService.getBasicPeriodTimeService()
      .then((res) => {
        this.formRef.current.setFieldsValue({
          BasicPeriodTimeDisplayList: res.data.map((item) => {
            return { ...item, timeline_at: moment(item.timeline_at, "HH:mm") };
          }),
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

  deleteBasicPeriodTime = (id) => {
    console.log("id", id);
    BasicPeriodTimeService.deleteBasicPeriodTimeService({ id })
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

  registerButtonSelectBasicPeriodTime = () => {
    const { StartTime, EndTime, TimeZoneInterval } =
      this.formRef.current.getFieldsValue();
    BasicPeriodTimeService.registerButtonSelectBasicPeriodTimeService({
      StartTime: moment(StartTime).format("HH:mm"),
      EndTime: moment(EndTime).format("HH:mm"),
      TimeZoneInterval: TimeZoneInterval,
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
        this.getCourseSpecificStardStyleSetting();
      });
  };

  saveAndUpdateBasicPeriodTime = (id) => {
    const { BasicPeriodTimeDisplayList } =
      this.formRef.current.getFieldsValue();
    let dataFormatToCreateOrUpdate = BasicPeriodTimeDisplayList.filter(
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
    BasicPeriodTimeService.saveAndUpdateBasicPeriodTimeService({
      id: dataFormatToCreateOrUpdate[0].id,
      timeline_at: moment(dataFormatToCreateOrUpdate[0].timeline_at).format(
        "HH:mm"
      ),
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
        this.getCourseSpecificStardStyleSetting();
      });
  };

  confirmCreateNew = () => {
    const modal = Modal.confirm({
      title: "上書確認：確認事項",
      icon: <InfoCircleOutlined style={{ color: "orange" }} />,
      content: (
        <>
          <div>
            予約済みの時間を確認してください。業務に文章が出る可能があります。変更してよろしいですか？
          </div>
          <Checkbox
            name="isComfirmCreateNew"
            defaultChecked={this.state.isComfirmCreateNew}
            onChange={() => {
              this.setState(
                {
                  isComfirmCreateNew: !this.state.isComfirmCreateNew,
                },
                () => {
                  modal.update({
                    okButtonProps: {
                      disabled: this.state.isComfirmCreateNew ? false : true,
                    },
                  });
                }
              );
            }}
          >
            内容を確認しました
          </Checkbox>
        </>
      ),
      okButtonProps: { disabled: true },
      okText: "はい",
      cancelText: "いいえ",
      onOk: () => {
        this.registerButtonSelectBasicPeriodTime();
        this.setState({
          isComfirmCreateNew: false,
        });
      },
      onCancel: () => {
        this.setState({
          isComfirmCreateNew: false,
        });
      },
    });
  };

  render() {
    return (
      <div className="basic-period-time">
        <Card title="基本時間帯">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={16}>
              <Col span={8}>
                <Tabs type="card">
                  <TabPane tab="直接入力" key="1"></TabPane>
                  <TabPane tab="自動入力" key="2">
                    <Form.Item label="開始" name="StartTime">
                      <TimePicker
                        allowClear={false}
                        style={{ width: "150px" }}
                        format="HH:mm"
                      />
                    </Form.Item>
                    <Form.Item label="終了" name="EndTime">
                      <TimePicker
                        allowClear={false}
                        style={{ width: "150px" }}
                        format="HH:mm"
                      />
                    </Form.Item>
                    <Form.Item label="間隔" name="TimeZoneInterval">
                      <Space>
                        <InputNumber
                          min={0}
                          max={59}
                          style={{ width: "150px" }}
                        ></InputNumber>
                        <span>分</span>
                      </Space>
                    </Form.Item>
                    <Button
                      type="primary"
                      style={{ float: "right" }}
                      onClick={() => {
                        this.confirmCreateNew();
                      }}
                    >
                      登録
                    </Button>
                  </TabPane>
                </Tabs>
              </Col>
              <Col span={8}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue(
                          "BasicPeriodTimeDisplayList"
                        )
                      : []
                  }
                  style={{ marginTop: "-15px" }}
                  rowKey={(record) => record.id}
                  pagination={false}
                  scroll={{ y: 600 }}
                  loading={this.state.isLoadingTable}
                >
                  <Table.Column
                    align="center"
                    title="時間帯"
                    dataIndex="timeline_at"
                    width={120}
                    render={(text, record, index) => (
                      <>
                        <Form.Item
                          name={["BasicPeriodTimeDisplayList", index, "id"]}
                          style={{ marginBottom: "-5px" }}
                          hidden
                        >
                          <Input></Input>
                        </Form.Item>
                        <Form.Item
                          name={[
                            "BasicPeriodTimeDisplayList",
                            index,
                            "timeline_at",
                          ]}
                          style={{ marginBottom: "-5px" }}
                        >
                          <TimePicker allowClear={false} format="HH:mm" />
                        </Form.Item>
                      </>
                    )}
                  ></Table.Column>
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
                              "BasicPeriodTimeDisplayList"
                            ) === undefined
                          ) {
                            this.formRef.current.setFieldsValue({
                              BasicPeriodTimeDisplayList: [
                                {
                                  id: "create_new",
                                },
                              ],
                            });
                            this.forceUpdate();
                          } else {
                            let isCreatedNew = this.formRef.current
                              .getFieldValue("BasicPeriodTimeDisplayList")
                              .filter((item) => {
                                if (item.id === "create_new") {
                                  return item;
                                }
                              });
                            if (isCreatedNew.length) return;
                            this.formRef.current.setFieldsValue({
                              BasicPeriodTimeDisplayList: [
                                {
                                  id: "create_new",
                                },
                                ...this.formRef.current.getFieldValue(
                                  "BasicPeriodTimeDisplayList"
                                ),
                              ],
                            });
                            this.forceUpdate();
                          }
                        }}
                      />
                    )}
                    dataIndex="timeline_at"
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
                              this.saveAndUpdateBasicPeriodTime(record.id);
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
                                  this.deleteBasicPeriodTime(record.id);
                                },
                              });
                            }}
                          ></Button>
                        </Space>
                      );
                    }}
                  ></Table.Column>
                </Table>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2697011_BasicPeriodTime);
