import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Button,
  Table,
  Row,
  Col,
  Modal,
  Input,
  Space,
  message,
} from "antd";
import WS1041001_ExternalInspectAmountOfQualitativeTransformation from "pages/KS_CooperationRelated/V4CP0001000_InspectItemConvertInternal/WS1041001_ExternalInspectAmountOfQualitativeTransformation.jsx";
import QuantitativeQualitativeTransformationSubService from "services/CooperationRelated/InspectItemConvertInternal/QuantitativeQualitativeTransformationSubService";
import PropTypes from "prop-types";
import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import {
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import moment from "moment";
const dateFormat = "YYYY/MM/DD";
class WS1035001_QuantitativeQualitativeTransformationSub extends React.Component {
  static propTypes = {
    Li_ExternalCode: PropTypes.any,
    Li_InternalInspectCode: PropTypes.any,
    Li_Name: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "定量定性変換SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      screenData: {
        DateAdoption: "",
        DateAdoptionChar: "",
      },
      count: 0,
      index_option_remark_men: "",
      index_option_remark_women: "",
      isLoadingTableLeft: false,
      isLoadingTableRight: false,
    };
  }

  componentDidMount = () => {
    const { Li_ExternalCode, Li_InternalInspectCode } = this.props;

    if (Li_ExternalCode && Li_InternalInspectCode) {
      this.setState(
        {
          Li_ExternalCode: Li_ExternalCode,
          Li_InternalInspectCode: Li_InternalInspectCode,
        },
        async () => {
          await this.getDataMenAndWomen(3);
        }
      );
    }
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
      Li_ExternalCode: this.state.Li_ExternalCode,
      Li_InternalInspectCode: this.state.Li_InternalInspectCode,
      date_of_adoption_on: "",
      quantitative_numerical_quantitative_range_check: "",
      upper_limit_quantitative_only: "",
      conversion_result: "",
      option_remark: "",
    };
    switch (arrayName) {
      case "listDataMen":
        newData = { ...newData, sex: 1 };
        break;

      case "listDataWomen":
        newData = { ...newData, sex: 2 };
        break;

      default:
        break;
    }
    let arrayNew = [];
    if (arrayFieldValue) {
      arrayNew = [...arrayFieldValue];
    }
    arrayNew.push(newData);
    this.formRef.current?.setFieldsValue({ [arrayName]: arrayNew });
    this.forceUpdate();
    this.setState({ count: this.state.count + 1 });
  };

  getDataMenAndWomen = async (statusLoad) => {
    await this.getScreenData(this.state.Li_ExternalCode);
    if (statusLoad === 1 || statusLoad === 3) {
      await this.getData(
        this.state.Li_ExternalCode,
        this.state.screenData.DateAdoption,
        1,
        this.state.Li_InternalInspectCode
      );
    }
    if (statusLoad === 2 || statusLoad === 3) {
      await this.getData(
        this.state.Li_ExternalCode,
        this.state.screenData.DateAdoption,
        2,
        this.state.Li_InternalInspectCode
      );
    }
  };

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  saveData = (record) => {
    QuantitativeQualitativeTransformationSubService.saveDataService({
      id: isNaN(record.id) ? "" : record.id,
      Li_ExternalCode: this.state.Li_ExternalCode,
      Li_InternalInspectCode: this.state.Li_InternalInspectCode,
      sex: record.sex,
      date_of_adoption_on: moment(record.date_of_adoption_on).format(
        dateFormat
      ),
      quantitative_numerical_quantitative_range_check:
        record.quantitative_numerical_quantitative_range_check,
      lower_limit_value_qualitative_and_quantitative:
        record.lower_limit_value_qualitative_and_quantitative,
      upper_limit_quantitative_only: record.upper_limit_quantitative_only,
      conversion_result: record.conversion_result,
      option_remark: record.option_remark,
    })
      .then((res) => {
        message.success("成功");
        if (record.sex === 1 || record.sex === "1") {
          this.getDataMenAndWomen(1);
        }
        if (record.sex === 2 || record.sex === "2") {
          this.getDataMenAndWomen(2);
        }
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
  getScreenData = async (Li_ExternalCode) => {
    this.setState({ isLoadingTableLeft: true, isLoadingTableRight: true });
    await QuantitativeQualitativeTransformationSubService.getScreenDataService({
      Li_ExternalCode,
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          DateAdoptionChar: moment(res.data.DateAdoptionChar).isValid()
            ? moment(res.data.DateAdoptionChar)
            : "",
        });
        this.setState({ screenData: res.data });
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
        this.setState({
          isLoadingTableLeft: false,
          isLoadingTableRight: false,
        });
      });
  };
  getData = (
    Li_ExternalCode,
    DateAdoption,
    Li_Gender,
    Li_InternalInspectCode
  ) => {
    this.setState({
      isLoadingTableLeft: true,
      isLoadingTableRight: true,
    });
    QuantitativeQualitativeTransformationSubService.getListDataService({
      Li_ExternalCode,
      DateAdoption: DateAdoption ? moment(DateAdoption).format(dateFormat) : "",
      Li_Gender,
      Li_InternalInspectCode,
    })
      .then((res) => {
        if (Li_Gender === 1) {
          this.setState({ index_option_remark_men: "" });
          this.formRef.current.setFieldsValue({
            listDataMen: res.data,
          });
        } else {
          this.setState({ index_option_remark_women: "" });
          this.formRef.current.setFieldsValue({
            listDataWomen: res.data,
          });
        }
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
        this.setState({
          isLoadingTableLeft: false,
          isLoadingTableRight: false,
        });
      });
  };

  deleteRecordTable = (record) => {
    QuantitativeQualitativeTransformationSubService.deleteDataService({
      id: record.id,
    })
      .then((res) => {
        message.success("成功");
        if (record.sex === 1 || record.sex === "1") {
          this.getDataMenAndWomen(1);
        }
        if (record.sex === 2 || record.sex === "2") {
          this.getDataMenAndWomen(2);
        }
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

  input_text_area_option_remark = (arrayName, index) => {
    const namePath = [arrayName, index, "option_remark"];
    return (
      <Form.Item name={namePath} className="w-100" key={namePath}>
        <Input.TextArea
          rows={3}
          onChange={(event) => {
            const formIns = this.formRef.current;
            formIns.setFields([
              {
                name: namePath,
                value: event.target.value,
              },
            ]);
            this.forceUpdate();
          }}
        />
      </Form.Item>
    );
  };

  render() {
    return (
      <div className="quantitative-qualitative-transformation-sub">
        <Card title="定量定性変換SUB">
          <Form ref={this.formRef} onFinish={this.onFinish} size="small">
            <Form.Item name="DateAdoptionChar" label="採用日">
              <VenusDatePickerCustom
                formRefDatePicker={this.formRef}
                format={dateFormat}
              />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Row gutter={24}>
                  <Col
                    span={24}
                    style={{
                      background: "#E5FFFF",
                      padding: "0.2em",
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <Button type="primary">男性</Button>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col
                    span={24}
                    style={{ padding: "0px", border: "1px solid #f0f0f0" }}
                  >
                    <Table
                      dataSource={
                        this.formRef.current
                          ? this.formRef.current.getFieldValue("listDataMen")
                          : []
                      }
                      loading={this.state.isLoadingTableLeft}
                      pagination={false}
                      rowKey={(record) => record.id}
                      scroll={{ y: "40vh" }}
                      style={{ height: "50vh" }}
                      size="small"
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: () => {
                            this.setState({
                              index_option_remark_men: rowIndex,
                            });
                          },
                        };
                      }}
                    >
                      <Table.Column
                        title="採用日"
                        dataIndex="date_of_adoption_on"
                        width={130}
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item>
                                <VenusDatePickerCustom
                                  formRefDatePicker={this.formRef}
                                  value={
                                    moment(text).isValid() ? moment(text) : ""
                                  }
                                  onChange={(value) => {
                                    record.date_of_adoption_on = value;
                                  }}
                                  format={dateFormat}
                                />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        title="SEQ"
                        dataIndex="quantitative_numerical_quantitative_range_check"
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item
                                name={[
                                  "listDataMen",
                                  index,
                                  "quantitative_numerical_quantitative_range_check",
                                ]}
                                onChange={(event) => {
                                  record.quantitative_numerical_quantitative_range_check =
                                    event.target.value;
                                }}
                              >
                                <Input />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        title="下限"
                        dataIndex="lower_limit_value_qualitative_and_quantitative"
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item
                                name={[
                                  "listDataMen",
                                  index,
                                  "lower_limit_value_qualitative_and_quantitative",
                                ]}
                                onChange={(event) => {
                                  record.lower_limit_value_qualitative_and_quantitative =
                                    event.target.value;
                                }}
                              >
                                <Input />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        title="上限"
                        dataIndex="upper_limit_quantitative_only"
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item
                                name={[
                                  "listDataMen",
                                  index,
                                  "upper_limit_quantitative_only",
                                ]}
                                onChange={(event) => {
                                  record.upper_limit_quantitative_only =
                                    event.target.value;
                                }}
                              >
                                <Input />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        title="変換結果"
                        dataIndex="conversion_result"
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item
                                hidden={true}
                                name={["listDataMen", index, "option_remark"]}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                name={[
                                  "listDataMen",
                                  index,
                                  "conversion_result",
                                ]}
                                onChange={(event) => {
                                  record.conversion_result = event.target.value;
                                }}
                              >
                                <Input />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        key="action"
                        align="center"
                        title={() => (
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                              this.addNewRowToTable("listDataMen");
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
                                    okText: "削除",
                                    cancelText: "キャンセル",
                                    onOk: () => {
                                      this.deleteRecordTable(record);
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
                <Row gutter={24}>
                  {this.input_text_area_option_remark(
                    "listDataMen",
                    this.state.index_option_remark_men
                  )}
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={24}>
                  <Col
                    span={24}
                    style={{ padding: "0.2em", border: "1px solid #f0f0f0" }}
                  >
                    <Button type="primary" style={{ background: "red" }}>
                      女性
                    </Button>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col
                    span={24}
                    style={{ padding: "0px", border: "1px solid #f0f0f0" }}
                  >
                    <Table
                      dataSource={
                        this.formRef.current
                          ? this.formRef.current.getFieldValue("listDataWomen")
                          : []
                      }
                      loading={this.state.isLoadingTableRight}
                      pagination={false}
                      rowKey={(record) => record.id}
                      scroll={{ y: "40vh" }}
                      style={{ height: "50vh" }}
                      size="small"
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: () => {
                            this.setState({
                              index_option_remark_women: rowIndex,
                            });
                          },
                        };
                      }}
                    >
                      <Table.Column
                        title="採用日"
                        width={130}
                        dataIndex="date_of_adoption_on"
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item>
                                <VenusDatePickerCustom
                                  formRefDatePicker={this.formRef}
                                  value={
                                    moment(text).isValid() ? moment(text) : ""
                                  }
                                  onChange={(value) => {
                                    record.date_of_adoption_on = value;
                                  }}
                                  format={dateFormat}
                                />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        title="SEQ"
                        dataIndex="quantitative_numerical_quantitative_range_check"
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item
                                name={[
                                  "listDataWomen",
                                  index,
                                  "quantitative_numerical_quantitative_range_check",
                                ]}
                                onChange={(event) => {
                                  record.quantitative_numerical_quantitative_range_check =
                                    event.target.value;
                                }}
                              >
                                <Input />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        title="下限"
                        dataIndex="lower_limit_value_qualitative_and_quantitative"
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item
                                name={[
                                  "listDataWomen",
                                  index,
                                  "lower_limit_value_qualitative_and_quantitative",
                                ]}
                                onChange={(event) => {
                                  record.lower_limit_value_qualitative_and_quantitative =
                                    event.target.value;
                                }}
                              >
                                <Input />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        title="上限"
                        dataIndex="upper_limit_quantitative_only"
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item
                                name={[
                                  "listDataWomen",
                                  index,
                                  "upper_limit_quantitative_only",
                                ]}
                                onChange={(event) => {
                                  record.upper_limit_quantitative_only =
                                    event.target.value;
                                }}
                              >
                                <Input />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        title="変換結果"
                        dataIndex="conversion_result"
                        render={(text, record, index) => {
                          return (
                            <>
                              <Form.Item
                                hidden={true}
                                name={["listDataWomen", index, "option_remark"]}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                name={[
                                  "listDataWomen",
                                  index,
                                  "conversion_result",
                                ]}
                                onChange={(event) => {
                                  record.conversion_result = event.target.value;
                                }}
                              >
                                <Input />
                              </Form.Item>
                            </>
                          );
                        }}
                      />
                      <Table.Column
                        key="action"
                        align="center"
                        title={() => (
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                              this.addNewRowToTable("listDataWomen");
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
                                    okText: "削除",
                                    cancelText: "キャンセル",
                                    onOk: () => {
                                      this.deleteRecordTable(record);
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
                <Row gutter={24}>
                  {this.input_text_area_option_remark(
                    "listDataWomen",
                    this.state.index_option_remark_women
                  )}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right", marginTop: "1em" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: "75%",
                        component: (
                          <WS1041001_ExternalInspectAmountOfQualitativeTransformation
                            onFinishScreen={() => {
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    });
                  }}
                >
                  一覧形式
                </Button>
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
)(WS1035001_QuantitativeQualitativeTransformationSub);
