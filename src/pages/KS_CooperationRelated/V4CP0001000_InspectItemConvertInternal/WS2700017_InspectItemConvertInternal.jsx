import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  Input,
  Select,
  Checkbox,
  Table,
  Row,
  Col,
  Space,
  Modal,
  Dropdown,
  Menu,
  Button,
  message,
} from "antd";
import WS2700099_InputForm from "pages/KS_CooperationRelated/V4CP0001000_InspectItemConvertInternal/WS2700099_InputForm.jsx";
import WS1036001_InspectValueConvertSub from "pages/KS_CooperationRelated/V4CP0001000_InspectItemConvertInternal/WS1036001_InspectValueConvertSub.jsx";
import WS1035001_QuantitativeQualitativeTransformationSub from "pages/KS_CooperationRelated/V4CP0001000_InspectItemConvertInternal/WS1035001_QuantitativeQualitativeTransformationSub.jsx";
import InspectItemConvertInternalService from "services/CooperationRelated/InspectItemConvertInternal/InspectItemConvertInternalService.js";
import ModalDraggable from "components/Commons/ModalDraggable";

import { MoreOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import WS2715042_InspectTakingPartialConvertSub from "./WS2715042_InspectTakingPartialConvertSub";
import WS1039001_InspectNameConvertInMaintainTa from "./WS1039001_InspectNameConvertInMaintainTa";
import WS1038001_InspectCmtConvertInternal from "./WS1038001_InspectCmtConvertInternal";
import WS1040001_InspectValueConvertInternal from "./WS1040001_InspectValueConvertInternal";
import WS1041001_ExternalInspectAmountOfQualitativeTransformation from "./WS1041001_ExternalInspectAmountOfQualitativeTransformation";
import WS1043001_InspectRequestConvertMasterMaintain from "../V4CP0002000_InspectRequestConvertMasterMaintain/WS1043001_InspectRequestConvertMasterMaintain";
class WS2700017_InspectItemConvertInternal extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "検査項目変換(内部)";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingMainTable: false,
      isLoadingSubTable1: false,
      isLoadingSubTable2: false,
    };
  }

  componentDidMount = () => {
    this.searchInspectItemConverseSub();
  };

  searchInspectItemConverseSub = () => {
    this.setState({ isLoadingMainTable: true });
    const {
      SearchChar,
      ExternalInspectCodeF,
      ExternalInspectCodeT,
      InspectValueConvertDivision,
      StsInspectValue,
      StsQuantitativeQualitative,
      MedicalExamSet,
    } = this.formRef.current.getFieldsValue();
    InspectItemConvertInternalService.getInspectItemConverseSubService({
      SearchChar: SearchChar,
      ExternalInspectCodeF: ExternalInspectCodeF,
      ExternalInspectCodeT: ExternalInspectCodeT,
      InspectValueConvertDivision: InspectValueConvertDivision,
      StsInspectValue: StsInspectValue,
      StsQuantitativeQualitative: StsQuantitativeQualitative,
      MedicalExamSet: MedicalExamSet,
    })
      .then((res) => {
        this.setState({ isLoadingMainTable: false });
        this.formRef.current.setFieldsValue({
          InspectItemConvertInternalDisplayList: res.data,
        });
        this.setState({ selectedRowRecordLeftTable: res.data[0] })
        this.searchInspectValueConverse(
          res.data[0].item_code_external,
          res.data[0].exam_name
        );
        this.searchQuantityQuality(res.data[0].item_code_external);
        this.forceUpdate();
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
        this.setState({ isLoadingMainTable: false });
      });
  };
  searchInspectValueConverse = (item_code_external, exam_name) => {
    this.setState({ isLoadingSubTable1: true });
    InspectItemConvertInternalService.getInspectValueConverseService({
      item_code_external: item_code_external,
      exam_name: exam_name,
    })
      .then((res) => {
        this.setState({ isLoadingSubTable1: false });
        this.formRef.current.setFieldsValue({
          InspectValueConverseDisplayList: res.data,
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
        this.setState({ isLoadingSubTable1: false });
      });
  };

  searchQuantityQuality = (item_code_external) => {
    this.setState({ isLoadingSubTable2: true });
    InspectItemConvertInternalService.getQuantityQualityService({
      item_code_external: item_code_external,
    })
      .then((res) => {
        this.setState({ isLoadingSubTable2: false });
        this.formRef.current.setFieldsValue({
          QuantityQualityDisplayList: res.data,
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
        this.setState({ isLoadingSubTable2: false });
      });
  };

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  deleteRecord(record) {
    let params = {
      id: record.id,
      item_code_external: record.item_code_external
    }
    InspectItemConvertInternalService.deleteRecord(params)
      .then((res) => {
        this.searchInspectItemConverseSub();
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

  onFinish(values) { }

  render() {
    return (
      <div className="inspect-item-convert-internal p-td">
        <Menu mode="horizontal">
          <Menu.Item
            key="新規"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "80%",
                  component: (
                    <WS2700099_InputForm
                      Li_InspectCodeOut="0"
                      onFinishScreen={() => {
                        this.searchInspectItemConverseSub();
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: false,
                          },
                        });
                      }}
                    />
                  ),
                },
              });
            }}
          >
            新規
          </Menu.Item>
          <Menu.Item
            key="部分変換"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "80%",
                  component: <WS2715042_InspectTakingPartialConvertSub />,
                },
              });
            }}
          >
            部分変換
          </Menu.Item>
          <Menu.Item
            key="名称変換"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "800px",
                  component: <WS1039001_InspectNameConvertInMaintainTa />,
                },
              });
            }}
          >
            名称変換
          </Menu.Item>
          <Menu.Item
            key="コメント変換"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "600px",
                  component: <WS1038001_InspectCmtConvertInternal />,
                },
              });
            }}
          >
            コメント変換
          </Menu.Item>
          <Menu.Item
            key="検査値"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "17%",
                  component: <WS1036001_InspectValueConvertSub
                    Li_ExternalCode={
                      this.state.selectedRowRecordLeftTable.item_code_external
                    }
                    Li_InspectName={
                      this.state.selectedRowRecordLeftTable.inspect_exam_name
                    }
                    onFinishScreen={(output) => {
                      if (output.flg === 1) {
                        this.searchInspectItemConverseSub();
                      }
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: false,
                        },
                      });
                    }}
                  />,
                },
              });
            }}
          >
            検査値
          </Menu.Item>
          <Menu.Item
            key="定量定性"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "80%",
                  component: (
                    <WS1041001_ExternalInspectAmountOfQualitativeTransformation />
                  ),
                },
              });
            }}
          >
            定量定性
          </Menu.Item>
          <Menu.Item
            key="依頼変換"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "80%",
                  component: <WS1043001_InspectRequestConvertMasterMaintain />,
                },
              });
            }}
          >
            依頼変換
          </Menu.Item>
        </Menu>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{
            SearchChar: "",
            ExternalInspectCodeF: 0,
            ExternalInspectCodeT: 9999999,
            InspectValueConvertDivision: "",
            StsInspectValue: false,
            StsQuantitativeQualitative: false,
            MedicalExamSet: false,
          }}
        >
          <Card className="mb-2">
            <Row gutter={8}>
              <Col span={5}>
                <Form.Item name="SearchChar" label="検索">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Row wrap={false}>
                  <Form.Item name="ExternalInspectCodeF" label="外部検査">
                    <Input className='floatRight' />
                  </Form.Item>
                  <div style={{ textAlign: "center", marginBottom: "1em" }}>
                    ~
                  </div>
                  <Form.Item name="ExternalInspectCodeT">
                    <Input className='floatRight' />
                  </Form.Item>
                </Row>
              </Col>
              <Col span={3}>
                <Form.Item name="InspectValueConvertDivision" label="変換">
                  <Select>
                    <Select.Option value="0"> </Select.Option>
                    <Select.Option value="1">変換無し</Select.Option>
                    <Select.Option value="2">桁数変換</Select.Option>
                    <Select.Option value="3">ﾃ-ﾌﾞﾙ変換</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item name="StsInspectValue" valuePropName="checked">
                  <Checkbox>検査値変換あり</Checkbox>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  name="StsQuantitativeQualitative"
                  valuePropName="checked"
                >
                  <Checkbox>定量定性変換あり</Checkbox>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item name="MedicalExamSet" valuePropName="checked">
                  <Checkbox>紐付</Checkbox>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button onClick={() => this.searchInspectItemConverseSub()}>
                  検索
                </Button>
              </Col>
            </Row>
          </Card>
          <Row gutter={24}>
            <Col span={16}>
              <Card style={{ height: "100%" }}>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue(
                        "InspectItemConvertInternalDisplayList"
                      )
                      : []
                  }
                  loading={this.state.isLoadingMainTable}
                  // pagination={false}
                  bordered={true}
                  rowKey={(record) => record.id}
                  size="small"
                  rowClassName={(record, index) => {
                    if (this.state.selectedRowRecordLeftTable) {
                      return record.id ===
                        this.state.selectedRowRecordLeftTable.id
                        ? "ant-table-row-selected"
                        : "";
                    }
                  }}
                  onRow={(record, rowIndex) => {

                    return {
                      // double click row
                      onDoubleClick: () => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "80%",
                            component: (
                              <WS2700099_InputForm
                                Li_InspectCodeOut={record.item_code_external}
                                onFinishScreen={() => {
                                  this.searchInspectItemConverseSub();
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });
                                }}
                              />
                            ),
                          },
                        });
                      },
                      onClick: () => {
                        this.setState({
                          selectedRowRecordLeftTable: record,
                        });
                        this.searchInspectValueConverse(
                          record.item_code_external,
                          record.exam_name
                        );
                        this.searchQuantityQuality(record.item_code_external);
                      },
                    };
                  }}
                >
                  <Table.Column
                    title="外部検査"
                    dataIndex="item_code_external"
                    style={{ marginLeft: "10px" }}
                  />
                  <Table.Column title="外部検査名称" dataIndex="exam_name" />
                  <Table.Column
                    title="タイプ"
                    dataIndex=""
                    render={(text, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "InspectItemConvertInternalDisplayList",
                            this.findIndexByID(
                              this.formRef.current.getFieldValue(
                                "InspectItemConvertInternalDisplayList"
                              ),
                              record.id
                            ),
                            "exam_type_outside",
                          ]}
                          style={{ marginBottom: "0px" }}
                        >
                          <Select disabled>
                            <Select.Option value="N">整 数</Select.Option>
                            <Select.Option value="N1">小 数1</Select.Option>
                            <Select.Option value="N2">小 数2</Select.Option>
                            <Select.Option value="N3">小 数3</Select.Option>
                            <Select.Option value="N4">小 数4</Select.Option>
                            <Select.Option value="X">文 字</Select.Option>
                          </Select>
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="健診検査"
                    dataIndex="item_code_medical_exam"
                    render={(text) => <div className='floatRight'>{text}</div>}
                  />
                  <Table.Column
                    title="健診検査名称"
                    dataIndex="Expression_31"
                    render={(text, record, index) => (
                      <span>
                        {text}&ensp;&ensp; {record.exam_short_name} &ensp;&ensp;
                        {record.inspect_exam_name}
                      </span>
                    )}
                  />
                  <Table.Column
                    title="変換"
                    dataIndex=""
                    render={(text, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "InspectItemConvertInternalDisplayList",
                            this.findIndexByID(
                              this.formRef.current.getFieldValue(
                                "InspectItemConvertInternalDisplayList"
                              ),
                              record.id
                            ),
                            "exam_value_conversion_division",
                          ]}
                          style={{ marginBottom: "0px" }}
                        >
                          <Select disabled>
                            <Select.Option value={0}>0:</Select.Option>
                            <Select.Option value={1}>1:変換なし</Select.Option>
                            <Select.Option value={2}>2:桁変換</Select.Option>
                            <Select.Option value={3}>3:ﾃｰﾌﾞﾙ変換</Select.Option>
                          </Select>
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="桁数変換"
                    dataIndex=""
                    render={(text, record, index) => {
                      return (
                        <Form.Item
                          name={[
                            "InspectItemConvertInternalDisplayList",
                            this.findIndexByID(
                              this.formRef.current.getFieldValue(
                                "InspectItemConvertInternalDisplayList"
                              ),
                              record.id
                            ),
                            "ConvertCoefficientChar",
                          ]}
                          style={{ marginBottom: "0px" }}
                        >
                          <Select disabled>
                            <Select.Option value="△4">×0.0001</Select.Option>
                            <Select.Option value="△3">× 0.001</Select.Option>
                            <Select.Option value="△2">× 0.01</Select.Option>
                            <Select.Option value="△1">× 0.1</Select.Option>
                            <Select.Option value="0"> </Select.Option>
                            <Select.Option value="1">× 10</Select.Option>
                            <Select.Option value="2">× 100</Select.Option>
                            <Select.Option value="3">× 1000</Select.Option>
                            <Select.Option value="4">× 10000</Select.Option>
                          </Select>
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    render={(text, record, index) => (
                      <Dropdown.Button
                        icon={<MoreOutlined />}
                        style={{
                          display: "inline-block",
                          marginTop: "-0.5em",
                        }}
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              key="1"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "49%",
                                    component: (
                                      <WS2700099_InputForm
                                        onFinishScreen={() => {
                                          this.setState({
                                            childModal: {
                                              ...this.state.childModal,
                                              visible: false,
                                            },
                                          });
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              <label>新規</label>
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "49%",
                                    component: (
                                      <WS2700099_InputForm
                                        // pass value
                                        Li_InspectCodeOut={
                                          record.item_code_external
                                        }
                                        onFinishScreen={() => {
                                          this.setState({
                                            childModal: {
                                              ...this.state.childModal,
                                              visible: false,
                                            },
                                          });
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              <label>修正</label>
                            </Menu.Item>
                            <Menu.Item
                              key="3"
                              onClick={() => {
                                Modal.confirm({
                                  title: '消去してもよろしいですか？',
                                  width: 315,
                                  icon: <QuestionCircleOutlined style={{ fontSize: 25, color: "#08c" }} />,
                                  onOk: () => {
                                    this.deleteRecord(record)
                                  }
                                })
                              }}
                            >
                              <label>削除</label>
                            </Menu.Item>
                            <Menu.Item
                              key="4"
                              onClick={() => {
                                console.log("record: ", record);
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "30%",
                                    component: (
                                      <WS1036001_InspectValueConvertSub
                                        Li_ExternalCode={
                                          record.item_code_external
                                        }
                                        Li_InspectName={
                                          record.inspect_exam_name
                                        }
                                        onFinishScreen={() => {
                                          this.setState({
                                            childModal: {
                                              ...this.state.childModal,
                                              visible: false,
                                            },
                                          });
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              <label>検査値変換</label>
                            </Menu.Item>
                            <Menu.Item
                              key="5"
                              onClick={() => {
                                console.log("record 1025: ", record);
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "90%",
                                    component: (
                                      <WS1035001_QuantitativeQualitativeTransformationSub
                                        Li_ExternalCode={
                                          record.item_code_external
                                        }
                                        Li_InternalInspectCode={
                                          record.item_code_medical_exam
                                        }
                                        Li_Name={record.exam_name}
                                        onFinishScreen={() => {
                                          this.setState({
                                            childModal: {
                                              ...this.state.childModal,
                                              visible: false,
                                            },
                                          });
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              <label>定量定性変換</label>
                            </Menu.Item>
                          </Menu>
                        )}
                      ></Dropdown.Button>
                    )}
                  />
                </Table>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ height: "100%" }}>
                <div style={{ margin: "1em" }}>検査値変換</div>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue(
                        "InspectValueConverseDisplayList"
                      )
                      : []
                  }
                  loading={this.state.isLoadingSubTable1}
                  bordered={true}
                  rowKey={(record) => record.id}
                  size="small"
                  pagination={{ pageSize: 5 }}
                >
                  <Table.Column
                    title="外部検査値"
                    dataIndex="exam_value_outside"
                  />
                  <Table.Column
                    title="健診検査値"
                    dataIndex="exam_value_medical_exam"
                  />
                  <Table.Column
                    render={(text, record, index) => (
                      <Dropdown.Button
                        icon={<MoreOutlined />}
                        style={{
                          display: "inline-block",
                          marginTop: "-0.5em",
                        }}
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              key="1"
                              onClick={() => {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "30%",
                                    component: (
                                      <WS1036001_InspectValueConvertSub
                                        Li_ExternalCode={
                                          record.item_code_external
                                        }
                                        Li_InspectName={
                                          record.inspect_exam_name
                                        }
                                        onFinishScreen={() => {
                                          this.setState({
                                            childModal: {
                                              ...this.state.childModal,
                                              visible: false,
                                            },
                                          });
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              <label>検査値変換</label>
                            </Menu.Item>
                          </Menu>
                        )}
                      ></Dropdown.Button>
                    )}
                  />
                </Table>
                <div style={{ margin: "1em" }}>定量定性</div>
                <Table
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue(
                        "QuantityQualityDisplayList"
                      )
                      : []
                  }
                  loading={this.state.isLoadingSubTable2}
                  bordered={true}
                  rowKey={(record) => record.id}
                  size="small"
                  pagination={{ pageSize: 5 }}
                >
                  <Table.Column title="性別" dataIndex="GenderChar" />
                  <Table.Column
                    title="下限(外部)"
                    dataIndex="lower_limit_value_qualitative_and_quantitative"
                    render={(text) => <div className='floatRight'>{text}</div>}
                  />
                  <Table.Column
                    title="上限(外部)"
                    dataIndex="upper_limit_quantitative_only"
                    render={(text) => <div className='floatRight'>{text}</div>}
                  />
                  <Table.Column
                    title="変換結果(健診)"
                    dataIndex="conversion_result"
                    align='center'
                  />
                  <Table.Column
                    render={(text, record, index) => (
                      <Dropdown.Button
                        icon={<MoreOutlined />}
                        style={{
                          display: "inline-block",
                          marginTop: "-0.5em",
                        }}
                        overlay={() => (
                          <Menu>
                            <Menu.Item
                              key="5"
                              onClick={() => {
                                console.log(record);
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: "90%",
                                    component: (
                                      <WS1035001_QuantitativeQualitativeTransformationSub
                                        Li_ExternalCode={
                                          record.external_exam_code
                                        }
                                        Li_InternalInspectCode={
                                          record.internal_exam_code
                                        }
                                        Li_Name={record.exam_name}
                                        onFinishScreen={() => {
                                          this.setState({
                                            childModal: {
                                              ...this.state.childModal,
                                              visible: false,
                                            },
                                          });
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }}
                            >
                              <label>定量定性変換</label>
                            </Menu.Item>
                          </Menu>
                        )}
                      ></Dropdown.Button>
                    )}
                  />
                </Table>
              </Card>
            </Col>
          </Row>
        </Form>
        <ModalDraggable
          destroyOnClose={true}
          width={this.state.childModal.width}
          height={'800px'}
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
)(WS2700017_InspectItemConvertInternal);
