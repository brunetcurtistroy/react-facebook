import React from "react";
import { connect } from "react-redux";
import InspectValueConvertlnternalAction from "redux/CooperationRelated/InspectItemConvertInternal/InspectValueConvertlnternal.actions";
import { Table, Form, Input, Button, message, Space, Modal, Card } from "antd";
import WS1040003_Copy from "pages/KS_CooperationRelated/V4CP0001000_InspectItemConvertInternal/WS1040003_Copy.jsx";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1040001_InspectValueConvertInternal extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "V4-VNS04600:検査値変換  (内部)";
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: "small",
        showQuickJumper: true,
      },
      isLoadingTable: true,
      dataSource: [],
      rowSelect: {},
      selectedRows: [],
      indexTable: 0,
    };
  }
  componentDidMount() {
    this.getListData();
  }
  getListData() {
    this.setState({ isLoadingTable: true });
    InspectValueConvertlnternalAction.getListDataAction()
      .then((res) => {
        if (res) {
          this.setState({
            dataSource: res,
            selectedRows: [res[0]], indexTable: 0,
          });
          this.formRef.current.setFieldsValue({ tableData: res });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }));
  }
  onFinish(values) {}
  handlerPostData = (data) => {
    InspectValueConvertlnternalAction.postDataAction(data)
      .then((res) => {
        this.closeModal();
        this.getListData();
      })
      .catch((error) => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          // message.error('エラーが発生しました');
          return;
        }
      })
      .finally(() => this.setState({}));
  };
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
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
      item_code_external: record.item_code_external ?? "",
      exam_value_outside: record.exam_value_outside ?? "",
      exam_value_medical_exam: record.exam_value_medical_exam ?? "",
    };
    InspectValueConvertlnternalAction.saveDataAction(data)
      .then((res) => {
        if(res.message === 'Data exists.'){
          message.error("エラー")
        }else{
          message.success("成功");
          this.getListData();
        }
      })
      .catch((err) => message.error("エラー"));
  };
  deleteData = (record) => {
    if (record.id) {
      InspectValueConvertlnternalAction.deleteDataAction({ id: record.id })
        .then((res) => {
          message.success("成功");
          this.getListData();
        })
        .catch((err) => message.error("エラー"));
    } else {
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
  render() {
    return (
      <div className="inspect-value-convert-internal p-td">
        <Card title="V4-VNS04600:検査値変換  (内部)">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage:
                  this.state.dataSource.length > 10 ? false : true,
              }}
              rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
              scroll={{ x: 500, y: 400 }}
              bordered={true}
              rowKey={(record) => record.id}
              // rowSelection={{
              //   type: 'radio',
              //   onChange: (selectedRowKeys, selectedRows) => {
              //   }
              // }}
              onRow={(record, index) => ({
                onClick: (e) => {
                  this.setState({ rowSelect: record, indexTable: index,  selectedRows: [record], });
                },
              })}
            >
              <Table.Column
               width={75}
                title="検  査"
                dataIndex="item_code_external"
                render={(row, record, index) => {
                  return (
                    <Input
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    style={{textAlign: 'right'}}
                      value={record.item_code_external}
                      name="item_code_external"
                      onChange={(e) => this.onChangeInput(e, record)}
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "40%",
                            component: (
                              <WS1040003_Copy
                                clickParent={this.handlerPostData}
                                item_code_external={record.item_code_external}
                                onClickedSelect={({ Lio_OfficeCode }) => {
                                  this.setState({
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });
                                  this.setFormFieldValue(
                                    "organization_code",
                                    Lio_OfficeCode
                                  );
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    />
                  );
                }}
              />
              <Table.Column title="検査名称" dataIndex="exam_name" width={200} />
              <Table.Column
               width={110}
                title="検査値（前）"
                dataIndex="exam_value_outside"
                render={(row, record, index) => {
                  return (
                    <Input
                      value={record.exam_value_outside}
                      style={{ textAlign: "right" }}
                      onChange={(e) => this.onChangeInput(e, record)}
                      name="exam_value_outside"
                    />
                  );
                }}
              />
              <Table.Column
               width={110}
                title="検査値（後）"
                dataIndex="exam_value_medical_exam"
                render={(value, record, index) => {
                  return (
                    <Space
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{record.exam_type_outside}</div>
                      <Input
                        value={record.exam_value_medical_exam}
                        style={{ textAlign: "right" }}
                        onChange={(e) => this.onChangeInput(e, record)}
                        name="exam_value_medical_exam"
                      />
                    </Space>
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
                      let arrTemp = [{}];
                      this.formRef.current.setFieldsValue({
                        tableData: [...arrTemp, ...this.state.dataSource],
                      });
                      this.setState({
                        dataSource: [...arrTemp, ...this.state.dataSource],
                      });
                    }}
                  ></Button>
                )}
                render={(text, record, index) => (
                  <>
                    <Button
                     hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                      size="small"
                      style={{ border: "none" }}
                      icon={<SaveOutlined  style={{ border: "none", marginRight: '5px', color: "green"}} />}
                      onClick={() => this.saveData(record)}
                    ></Button>
                    <Button
                     hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                      size="small"
                      style={{ border: "none", color: 'red'  }}
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: "消去してもよろしいですか？",
                          okText: "は　い",
                          cancelText: "いいえ",
                          onOk: () => this.deleteData(record),
                        });
                      }}
                    ></Button>
                  </>
                )}
              />
            </Table>
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
)(WS1040001_InspectValueConvertInternal);
