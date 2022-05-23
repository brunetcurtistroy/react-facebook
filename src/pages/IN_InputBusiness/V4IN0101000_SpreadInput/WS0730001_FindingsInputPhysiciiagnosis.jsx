import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  message,
  Button,
  Table,
  Row,
  Col,
  Modal,
  Input,
} from "antd";
import WS1874004_FindingInquiry from "pages/MS_InspectionMaintenance/HGHP6200_RadiographyInspectMaintain/WS1874004_FindingInquiry.jsx";
import WS1004007_JudgeSelect from "pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS1004007_JudgeSelect.jsx";
import FindingsInputPhysiciiagnosisAction from "redux/InputBusiness/SpreadInput/FindingsInputPhysiciiagnosis.action";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import WS0285001_JudgeQuery from "pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery";
import WS0179001_InquiryFindingInfo from "pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0179001_InquiryFindingInfo";
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

const styleInput = { marginBottom: "0px" };
class WS0730001_FindingsInputPhysiciiagnosis extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "所見入力[医師診断]";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataForm: {},
      isLoadingForm: true,
      dataSource1: [],

      isLoadingTable1: true,
      isLoadingTable2: true,
      dataSource2: [],
      selectedRows1: [],
      selectedRows2: [],
      indexTable: 0,
      rowSelect: {},
      rowSelect1: {},
      Lio_FindingsCategoryChange: 0,
      Lio_GuidanceAndAttentionChange: 0,
    };
  }
  componentDidMount() {
    this.getScreenData();
  }
  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        flg_730: 1,
        close: false,
      });
      const data = {
        Li_ReserveNum:this.props.Li_ReserveNum,
        Li_InspectCode : this.props.Li_InspectCode
      }
      FindingsInputPhysiciiagnosisAction.exitAction(data)
      .then((res) => {
      })
      .finally(() =>{});
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
      this.setState({
        Lio_FindingsCategoryChange: 0,
        Lio_GuidanceAndAttentionChange: 0,
      });
    }
    
  }
  getScreenData() {
    this.setState({ isLoadingForm: true });
    const data = {
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_InspectCode: this.props.Li_InspectCode,
      Li_CategoryCode: this.props.Li_CategoryCode,
      Li_PersonalNum: this.props.Li_PersonalNum,
    };
    FindingsInputPhysiciiagnosisAction.GetScreenDataAction(data)
      .then((res) => {
        if (res) {
          this.formRef.current.setFieldsValue({ tableData: res });
          this.setState({ dataForm: res });
          this.getListDataUpTable();
          this.getListDataDownTable();
        }
      })
      .finally(() => this.setState({ isLoadingForm: false }));
  }
  getListDataUpTable() {
    this.setState({ isLoadingTable1: true });
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      site_classification: this.state.dataForm.site_classification,
      Li_JudgeLevel: this.state.dataForm.Li_JudgeLevel,
    };
    FindingsInputPhysiciiagnosisAction.GetListDataUpTableAction(data)
      .then((res) => {
        const constvertType = (input) => (input === 0 ? "" : input);
        const checkExp12 = (input) =>( !input ? null : input);
        const newArr = res.map((s) => ({
          ...s,
          FindingsCode: constvertType(s.FindingsCode),
          site_address: constvertType(s.site_address),
        }));
        if (res) {
          this.setState({ dataSource1: newArr, selectedRows1: [res[0]],});
          this.formRef.current.setFieldsValue({ tableData: newArr });
        }
      })
      .finally(() => this.setState({ isLoadingTable1: false }));
  }
  getListDataDownTable() {
    this.setState({ isLoadingTable2: true });
    const data = {
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      site_classification: this.state.dataForm.site_classification,
      Li_JudgeLevel: this.state.dataForm.Li_JudgeLevel,
    };
    FindingsInputPhysiciiagnosisAction.GetListDataDownTableAction(data)
      .then((res) => {
        if (res) {
          const constvertType = (input) => (input === 0 ? "" : input);
          const newArr = res.map((s) => ({
            ...s,
            SerialNum: constvertType(s.SerialNum),
            W3_findings_cd: constvertType(s.W3_findings_cd),
          }));
          this.setState({ dataSource2: newArr, selectedRows2: [res[0]], indexTable: 0, });
          this.formRef.current.setFieldsValue({ tableData1: newArr });
        }
      })
      .finally(() => this.setState({ isLoadingTable2: false }));
  }
  handleChangeInput = (record, value, name) => {
    let arrTemp = [...this.state.dataSource2];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp;
      switch (name) {
        default:
          objTemp = {
            ...record,
            [name]: value,
          };
          break;
      }
      arrTemp[index] = objTemp;
      this.setState({
        dataSource2: arrTemp,
        rowSelect: objTemp,
      });
      this.formRef.current.setFieldsValue({ dataSource2: arrTemp });
    }
  };
  saveData(record) {
    const data = {
      id: record.id || undefined,
      Li_ReserveNum: this.state.dataForm.Li_ReserveNum,
      Li_InspectCode: this.state.dataForm.Li_InspectCode,
      site_classification: this.state.dataForm.site_classification,
      SerialNum: record.SerialNum,
      W3_findings_cd: record.W3_findings_cd,
      W3_findings_name: record.W3_findings_name,
      W3_determine_val: record.W3_determine_val,
    };
    FindingsInputPhysiciiagnosisAction.SaveDataDownAction(data)
      .then((res) => {
        if (res) message.success("成功");
        this.getListDataDownTable();
        this.setState({
          Lio_FindingsCategoryChange: 1,
          Lio_GuidanceAndAttentionChange: 1,
        });
      })
      .catch((err) => message.error("エラー"));
  }
  deleteData(record) {
    if (record.id) {
      FindingsInputPhysiciiagnosisAction.DeleteDataDownAction({
        id: record.id,
      })
        .then((res) => {
          message.success("成功");
          this.getListDataDownTable();
          this.setState({
            Lio_FindingsCategoryChange: 1,
            Lio_GuidanceAndAttentionChange: 1,
          });
        })
        .catch((err) => message.error("エラー"));
    } else {
      let arrTemp = [...this.state.dataSource2];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ tableData1: arrTemp });
      this.setState({ dataSource2: arrTemp });
      this.getListDataDownTable();
    }
  }
  handleChangeInput1 = (record, value, name) => {
    let arrTemp = [...this.state.dataSource1];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp;
      switch (name) {
        default:
          objTemp = {
            ...record,
            [name]: value,
          };
          break;
      }
      arrTemp[index] = objTemp;
      this.setState({
        dataSource1: arrTemp,
        rowSelect1: objTemp,
      });
      this.formRef.current.setFieldsValue({ dataSource1: arrTemp });
    }
  };
  changeData(record) {
    const data = {
      site_classification: record.site_classification,
      site_code: record.site_code,
      site_name: record.site_name,
      FindingsCode: record.FindingsCode,
      FindingsName: record.FindingsName,
      JudgeValue: record.JudgeValue,
      StsExist: record.StsExist === false ? 0 : 1,
      Li_ReserveNum: record.Li_ReserveNum,
      Li_InspectCode: record.Li_InspectCode,
      Li_JudgeLevel: record.Li_JudgeLevel,
    };
    FindingsInputPhysiciiagnosisAction.ChangeDataAction(data)
      .then((res) => {
        if (res) message.success("成功");
        this.getListDataUpTable();
        this.setState({
          Lio_FindingsCategoryChange: 1,
          Lio_GuidanceAndAttentionChange: 1,
        });
      })
      .catch((err) => message.error("エラー"));
  }
  findIndexByID = (arrayData, recordID) => {
    if (arrayData && arrayData.length > 0) {
      return arrayData.findIndex((item) => recordID === item.id);
  }
  };
  CheckColor(id) {
  }

  onFinish(values) { }

  render() {
    const { rowSelect } = this.state;
    const { rowSelect1 } = this.state;
    return (
      <div className="findings-input-physiciiagnosis p-td">
        <Card title="所見入力[医師診断]">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <label style={{ color: "#14468c", fontWeight: "700" }}>
              実施理由
            </label>
            <Table
              dataSource={this.state.dataSource1}
              loading={this.state.isLoadingTable1}
              pagination={false}
              rowKey={(record) => record.site_code}
              rowClassName={(record, index) => record.site_code === this.state.selectedRows1[0]?.site_code ? 'table-row-light' : ''}
              // rowSelection={{
              //   type: "radio",
              //   onChange: (selectedRowKeys, selectedRows) => {
              //   },
              // }}
              bordered={true}
              onRow={(record, index) => ({
                onClick: (event) => {
                  this.setState({ rowSelect1: record, selectedRows1: [record],});
                },
              })
              }
              scroll={{ y: '282px' }}
            >
              <Table.Column
                title="実施検査"
                width={180}
                dataIndex="site_name"
                render={(row, record, index) => {
                  return (
                    <Form.Item name={["tableData", index, "site_name"]}>
                      <Input
                        name="site_name"
                        style={{ border: "none" }}
                        readOnly
                      />
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                title="理由"
                dataIndex=""
                render={(row, record, index) => {
                  return (
                    <Row>
                      <Col span={4}>
                        <Form.Item
                          style={styleInput}
                          name={["tableData", index, "FindingsCode"]}
                        >
                          <Input
                          style={{textAlign: 'right', width: "98%"}}
                            onChange={(e) =>
                              this.handleChangeInput1(
                                rowSelect1,
                                e.target.value,
                                "FindingsCode"
                              )
                            }
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 800,
                                  component: (
                                    <WS0179001_InquiryFindingInfo
                                      onFinishScreen={(obj) => {
                                        record = {
                                          ...record,
                                          FindingsCode: obj.Li_FindingsCode,
                                          FindingsName: obj.Li_FindingsName,
                                        };
                                        let data = [...this.state.dataSource1];
                                        data[index] = record;
                                        this.setState({
                                          dataSource1: data,
                                          rowSelect1: record,
                                        });
                                        this.formRef.current.setFieldsValue({
                                          tableData: data,
                                        });
                                        this.closeModal();
                                      }}
                                    />
                                  ),
                                },
                              });
                            }}
                            readOnly
                            name="FindingsCode"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={20}>
                        <Form.Item
                          style={styleInput}
                          name={["tableData", index, "FindingsName"]}
                        >
                          <Input
                            onChange={(e) =>
                              this.handleChangeInput1(
                                rowSelect1,
                                e.target.value,
                                "FindingsName"
                              )
                            }
                            name="FindingsName"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                }}
              />
              <Table.Column
                title="判定"
                width={90}
                dataIndex="JudgeValue"
                render={(row, record, index) => {
                  return (
                    <Form.Item
                      style={styleInput}
                      name={["tableData", index, "JudgeValue"]}
                    >
                      <Input
                        onChange={(e) =>
                          this.handleChangeInput1(
                            rowSelect1,
                            e.target.value,
                            "JudgeValue"
                          )
                        }
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component: (
                                <WS0285001_JudgeQuery
                                  onFinishScreen={(obj) => {
                                    record = {
                                      ...record,
                                      JudgeValue: obj.Li_JudgeValue,
                                    };
                                    let data = [...this.state.dataSource1];
                                    data[index] = record;
                                    this.setState({
                                      dataSource1: data,
                                      rowSelect1: record,
                                    });
                                    this.formRef.current.setFieldsValue({
                                      tableData: data,
                                    });
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                        readOnly
                        name="JudgeValue"
                      />
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                align="center"
                width={30}
                render={(text, record, index) => (
                  <>
                    <Button
                      size="small"
                      style={{ border: "none", color: "green"}}
                      icon={<SaveOutlined  />}
                      onClick={() => this.changeData(record)}
                    ></Button>
                  </>
                )}
              />
            </Table>

            <br />

            <label style={{ color: "#14468c", fontWeight: "700" }}>
              実施理由
            </label>
            <Table
              dataSource={this.state.dataSource2}
              loading={this.state.isLoadingTable2}
              pagination={false}
              rowKey={(record) => record.id}
              // rowSelection={{
              //   type: "radio",
              //   onChange: (selectedRowKeys, selectedRows) => {
              //   },
              // }}
              bordered={true}
              rowClassName={(record, index) => record.id === this.state.selectedRows2[0]?.id ? 'table-row-light' : ''}
              onRow={(record, index) => {
                return {
                  onClick: (event) => {
                    this.setState({ rowSelect: record, indexTable: index,  selectedRows2: [record], });
                  },
                };
              }}
              scroll={{ y: '282px' }}
            >
              <Table.Column
                title="No"
                width={90}
                dataIndex="SerialNum"
                render={(row, record, index) => {
                  return (
                    <Form.Item
                      style={styleInput}
                      name={["tableData1", index, "SerialNum"]}
                    >
                      <Input
                        type="number"
                        onChange={(e) =>
                          this.handleChangeInput(
                            rowSelect,
                            e.target.value,
                            "SerialNum"
                          )
                        }
                        name="SerialNum"
                      />
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                title="診断内容"
                dataIndex="i"
                render={(row, record, index) => {
                  return (
                    <Row>
                      <Col span={4}>
                        <Form.Item
                          style={styleInput}
                          name={["tableData1", index, "W3_findings_cd"]}
                        >
                          <Input
                            type="number"
                            onChange={(e) =>
                              this.handleChangeInput(
                                rowSelect,
                                e.target.value,
                                "W3_findings_cd"
                              )
                            }
                            name="W3_findings_cd"
                            style={{ width: "98%", textAlign:'right' }}
                            onDoubleClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 800,
                                  component: <WS1874004_FindingInquiry />,
                                },
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={20}>
                        <Form.Item
                          style={styleInput}
                          name={["tableData1", index, "W3_findings_name"]}
                        >
                          <Input
                            onChange={(e) =>
                              this.handleChangeInput(
                                rowSelect,
                                e.target.value,
                                "W3_findings_name"
                              )
                            }
                            name="W3_findings_name"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                }}
              />
              <Table.Column
              width={90}
                title="判定"
                dataIndex="W3_determine_val"
                render={(row, record, index) => {
                  return (
                    <Form.Item
                      style={styleInput}
                      name={["tableData1", index, "W3_determine_val"]}
                    >
                      <Input
                        style={{
                          color: Color(record?.Expression_13)?.Foreground,
                        }}
                        onChange={(e) =>
                          this.handleChangeInput(
                            rowSelect,
                            e.target.value,
                            "W3_determine_val"
                          )
                        }
                        name="W3_determine_val"
                        onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component: <WS0285001_JudgeQuery />,
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  );
                }}
              />
              <Table.Column
                align="center"
                width={70}
                title={() => (
                  <Button
                    size="small"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      let arrTemp = [{ SerialNum: "", W3_findings_cd: "" }];
                      this.formRef.current.setFieldsValue({
                        tableData1: [...arrTemp, ...this.state.dataSource2],
                      });
                      this.setState({
                        dataSource2: [...arrTemp, ...this.state.dataSource2],
                      });
                    }}
                  ></Button>
                )}
                render={(text, record, index) => (
                  <>
                    <Button
                     hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource2, record.id)}
                      size="small"
                      style={{ border: "none", marginRight: '5px', color: "green"}}
                      icon={<SaveOutlined  />}
                      onClick={() => this.saveData(record)}
                    ></Button>
                    <Button
                     hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource2, record.id)}
                      size="small"
                      style={{ border: "none", color: 'red'  }}
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: "消去してもよろしいですか？",
                          okText: "はい",
                          cancelText: "いいえ",
                          onOk: () => this.deleteData(record),
                        });
                      }}
                    ></Button>
                  </>
                )}
              />
            </Table>

            <Button
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    flg_730: 1,
                    data: this.state.dataSource2,
                    close: true,
                    Lio_FindingsCategoryChange:
                    this.state.Lio_FindingsCategoryChange,
                  Lio_GuidanceAndAttentionChange:
                    this.state.Lio_GuidanceAndAttentionChange,
                  });
                }
              }}
              type="primary"
              style={{ float: "right", marginTop: "1em" }}
            >
              確　定
            </Button>
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
)(WS0730001_FindingsInputPhysiciiagnosis);
