import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";

import { Button, Card, Table, Modal, Form, Space, Input, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import WS1040001_InspectValueConvertInternal from "pages/KS_CooperationRelated/V4CP0001000_InspectItemConvertInternal/WS1040001_InspectValueConvertInternal.jsx";
import PropTypes from "prop-types";
import InspectValueConvertSubService from "services/CooperationRelated/InspectItemConvertInternal/InspectValueConvertSubService";
class WS1036001_InspectValueConvertSub extends React.Component {
  static propTypes = {
    Li_ExternalCode: PropTypes.any,
    Li_InspectName: PropTypes.any,
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = "検査値変換SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      count: 0,
      isLoadingTable: false,
      dataSource: [],
      rowSelect: {},
      selectedRows: [],
      indexTable: 0,
    };
  }

  componentDidMount = () => {
    if (this.props.Li_ExternalCode) {
      console.log("componentDidMount", this.props.Li_ExternalCode);
      this.setState({ Li_ExternalCode: this.props.Li_ExternalCode });
      this.getData(this.props.Li_ExternalCode);
    }
  };
  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        flg: 1,
      });
    }
  }

  getData = (Li_ExternalCode) => {
    this.setState({ isLoadingTable: true });
    InspectValueConvertSubService.getListDataService({ Li_ExternalCode })
      .then((res) => {
        this.setState({
          dataSource: res.data,
          selectedRows: [res.data[0]],
          indexTable: 0,
        });

        this.formRef.current.setFieldsValue({
          listData: res.data,
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
  onChangeInput = (event, record) => {
    let { value, name } = event.target;
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value,
      };
      arrTemp[index] = objTemp;
      this.setState({ dataSource: arrTemp });
    }
  };

  saveData = (record) => {
    const data = {
      ...record,
      id: record.id ?? "",
      item_code_external: this.state.Li_ExternalCode,
      exam_value_outside: record.exam_value_outside ?? "",
      exam_value_medical_exam: record.exam_value_medical_exam ?? "",
    }
    InspectValueConvertSubService.saveDataService(data)
      .then((res) => {
        console.log("saveData", res.data);
        message.success("成功");
        this.getData(this.state.Li_ExternalCode);
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

  // addNewRowToTable = (arrayName) => {
  //   let arrayFieldValue = this.formRef.current?.getFieldValue([arrayName]);
  //   let newData;
  //   switch (arrayName) {
  //     case "listData":
  //       newData = {
  //         id: "new" + this.state.count,
  //         item_code_external: "",
  //         exam_value_outside: "",
  //         exam_value_medical_exam: "",
  //       };
  //       break;

  //     default:
  //       break;
  //   }
  //   let arrayNew = [];
  //   if (arrayFieldValue) {
  //     arrayNew = [...arrayFieldValue];
  //   }
  //   arrayNew.push(newData);
  //   this.formRef.current?.setFieldsValue({ [arrayName]: arrayNew });
  //   this.forceUpdate();
  //   this.setState({ count: this.state.count + 1 });
  // };

  deleteRecordTable = (record) => {
    if(record.id){
      InspectValueConvertSubService.deleteDataService({
        id: record.id,
      })
        .then((res) => {
          console.log("deleteRecordTable", res.data);
          message.success("成功");
          this.getData(this.state.Li_ExternalCode);
        })
        .catch((err) => {
          const res = err.response;
          if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
          message.error(res.data.message);
        });
    }else {
      let arrTemp = [...this.state.dataSource];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ tableData: arrTemp });
      this.setState({ dataSource: arrTemp });
      this.getListData();
    }
  
  };
  findIndexByID = (arrayData, recordID) => {
    if (arrayData && arrayData.length > 0) {
      return arrayData.findIndex((item) => recordID === item.id);
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

  render() {
    return (
      <div className="inspect-value-convert-sub">
        <Form ref={this.formRef} size="small">
          <Card title="検査値変換SUB">
            <Table
              dataSource={this.state.dataSource}
              rowClassName={(record, index) =>
                record.id === this.state.selectedRows[0]?.id
                  ? "table-row-light"
                  : ""
              }
              loading={this.state.isLoadingTable}
              pagination={false}
              rowKey={(record) => record.id}
              size="small"
              onRow={(record, index) => ({
                onClick: (e) => {
                  this.setState({
                    rowSelect: record,
                    indexTable: index,
                    selectedRows: [record],
                  });
                },
              })}
            >
              <Table.Column
                title="外部検査値"
                dataIndex="exam_value_outside"
                key=""
                render={(text, record, index) => {
                  return (
                    <Input
                      style={{ textAlign: "right" }}
                      onChange={(e) => this.onChangeInput(e, record)}
                      name="exam_value_outside"
                      value={record.exam_value_outside}
                    />
                  );
                }}
              />
              <Table.Column
                title="健診検査値"
                dataIndex="exam_value_medical_exam"
                key=""
                render={(text, record, index) => {
                  return (
                    <Input
                      value={record.exam_value_medical_exam}
                      style={{ textAlign: "right" }}
                      onChange={(e) => this.onChangeInput(e, record)}
                      name="exam_value_medical_exam"
                    />
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
                      let arrTemp = [{}];
                      this.formRef.current.setFieldsValue({
                        tableData: [...arrTemp, ...this.state.dataSource],
                      });
                      this.setState({
                        dataSource: [...arrTemp, ...this.state.dataSource],
                      });
                    }}
                  />
                )}
                render={(text, record, index) => {
                  return (
                    <Space>
                      <Button
                        hidden={
                          this.state.indexTable !==
                          this.findIndexByID(this.state.dataSource, record.id)
                        }
                        size="small"
                        icon={
                          <SaveOutlined
                            style={{
                              border: "none",
                              marginRight: "5px",
                              color: "green",
                            }}
                          />
                        }
                        shape="circle"
                        className="text-success"
                        style={{ border: "none" }}
                        onClick={() => {
                          this.saveData(
                            record
                          );
                        }}
                      ></Button>
                      <Button
                        hidden={
                          this.state.indexTable !==
                          this.findIndexByID(this.state.dataSource, record.id)
                        }
                        size="small"
                        style={{ border: "none", color: "red" }}
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
            <Button
              type="primary"
              style={{ float: "right", marginTop: "1em" }}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "70%",
                    component: (
                      <WS1040001_InspectValueConvertInternal
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
          </Card>
        </Form>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          destroyOnClose={true}
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
)(WS1036001_InspectValueConvertSub);
