import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  Table,
  Row,
  message,
  Col,
  Button,
  Form,
  Modal,
  Input,
} from "antd";
import WS0272001_CautionGuideNotesSearchQuery from "pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0272001_CautionGuideNotesSearchQuery.jsx";
import NotesSetAction from "redux/InputBusiness/SpreadInput/NotesSet.action";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import  ModalDraggable  from "components/Commons/ModalDraggable";

const styleField = {
  input: {
    border: "0",
  },
  fmItem: {
    marginBottom: "0px",
  },
};
class WS0720001_NotesSet extends React.Component {
  static propTypes = {
    Li_Date: PropTypes.any,
    Li_PersonalNum: PropTypes.number,
    Li_KanjiName: PropTypes.string,
    Li_ConsultCourse: PropTypes.string,
    Li_ContractAbbreviation: PropTypes.string,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "注意事項設定";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      checkDoubleClick: false,
      isLoadingTable: false,
      dataSource: [],
      rowSelect: {},
    };
  }
  componentDidMount() {
    this.getListData();
  }
  getListData() {
    this.setState({ isLoadingTable: true });
    const data = {
      Li_Date: this.props.Li_Date ? this.props.Li_Date : "2002-07-08",
      Li_PersonalNum: this.props.Li_PersonalNum
        ? this.props.Li_PersonalNum
        : 2168,
      Li_ConsultCourse: this.props.Li_ConsultCourse
        ? this.props.Li_ConsultCourse
        : " g05",
      Li_PatternCode: this.props.Li_PatternCode
        ? this.props.Li_PatternCode
        : "9999-000",
      Li_KanjiName: this.props.Li_KanjiName ? this.props.Li_KanjiName : "",
      Li_ContractAbbreviation: this.props.Li_ContractAbbreviation
        ? this.props.Li_ContractAbbreviation
        : "特別　（新）",
      Li_CategoryCode: this.props.Li_CategoryCode
        ? this.props.Li_CategoryCode
        : 55,
    };
    NotesSetAction.GetLisstNotesSetAction(data)
      .then((res) => {
        if (res) {
          this.setState({
            dataSource: res.DataList,
          });
          this.formRef.current.setFieldsValue({ tableData: res.DataList });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }));
  }
  handleChangeInput = (record, value, name) => {
    console.log(record);
    let arrTemp = [...this.state.dataSource];
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
        dataSource: arrTemp,
        rowSelect: objTemp,
      });
      this.formRef.current.setFieldsValue({ dataSource: arrTemp });
    }
  };
  saveData(record) {
    const data = {
      id: record.id || undefined,
      Li_ReserveNum: this.props.Li_ReserveNum
      ? this.props.Li_ReserveNum
      : 200207089000008,
      Li_CategoryCode: this.props.Li_CategoryCode
      ? this.props.Li_CategoryCode
      : 55,
      W5_serial_num_old: record.W5_serial_num_old,
      W5_category_determining_cd_old: record.W5_category_determining_cd_old,
      W5_input_flg: record.W5_input_flg,
      W5_serial_num: record.W5_serial_num,
      W5_category_determining_cd: record.W5_category_determining_cd,
      W5_notes_comment: record.W5_notes_comment,
    };
    console.log(data);
    NotesSetAction.SaveDataAction(data)
      .then((res) => {
        message.success("成功");
        this.getListData();
      })
      .catch((err) => message.error("エラー"));
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  deleteData(record) {
    if (record.id) {
      NotesSetAction.DeleteDataAction({
        id: record.id,
        Li_ReserveNum: this.props.Li_ReserveNum
          ? this.props.Li_ReserveNum
          : 200207089000008,
          Li_CategoryCode: this.props.Li_CategoryCode
          ? this.props.Li_CategoryCode
          : 55,
          W5_serial_num_old: record.W5_serial_num_old,
          W5_category_determining_cd_old: record.W5_category_determining_cd_old,
      })
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
  }

  render() {
    const { rowSelect } = this.state;
    const styleColor = {
      color: this.state.checkDoubleClick ? "red" : "black",
    };
    return (
      <div className="notes-set p-td">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card className="mb-2">
            <Row>
              <Col span={4}>
                <Form.Item label="受診日">
                  <span>{this.props.Li_Date}</span>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="個人情報">
                  <span>{this.props.Li_PersonalNum}</span>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="氏名">
                  <span>{this.props.Li_KanjiName}</span>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="コース">
                  <span>{this.props.Li_ConsultCourse}</span>&emsp;
                  <span>{this.props.Li_ContractAbbreviation}</span>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Table
            bordered={true}
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            rowKey={(record) => record.id}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  this.setState({ rowSelect: record });
                  this.formRef.current?.setFieldsValue({
                    Expression_14: record.W5_notes_comment,
                  });
                },
              };
            }}
          >
            {/* dataIndex="W5_input_flag" */}
            <Table.Column
              title="F"
              dataIndex="W5_input_flg"
              render={(row, record, index) => {
                return (
                  <span style={styleColor}>
                    {record.W5_input_flg !== "S" || record.W5_input_flg !== "s"
                      ? "H"
                      : record.W5_input_flg}
                  </span>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="連番"
              dataIndex="W5_serial_num"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    style={styleField.fmItem}
                    name={["tableData", index, "W5_serial_num"]}
                  >
                    <Input
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W5_serial_num"
                        )
                      }
                      name="W5_serial_num"
                      type="number"
                      style={(styleField.input, styleColor)}
                      onDoubleClick={() => {
                        this.state.checkDoubleClick
                          ? this.setState({ checkDoubleClick: false })
                          : this.setState({ checkDoubleClick: true });
                      }}
                    />
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="ｺｰﾄﾞ"
              dataIndex="W5_category_determining_cd"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    style={styleField.fmItem}
                    name={["tableData", index, "W5_category_determining_cd"]}
                  >
                    <Input
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W5_category_determining_cd"
                        )
                      }
                      name="W5_category_determining_cd"
                      type="number"
                      style={styleColor}
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "60%",
                            component: (
                              <WS0272001_CautionGuideNotesSearchQuery
                                onFinishScreen={(obj) => {
                                  console.log(obj);
                                  record = {
                                    ...record,
                                    W5_category_determining_cd:
                                      obj.Lo_LnkOutCmtCode,
                                      W5_notes_comment:
                                      obj.Lo_recordData.comment_content,
                                  };
                                  let data = [...this.state.dataSource];
                                  data[index] = record;
                                  this.setState({
                                    dataSource: data,
                                    rowSelect: record,
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
                    />
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="指導ｺﾒﾝﾄ"
              dataIndex="W5_notes_comment"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    style={styleField.fmItem}
                    name={["tableData", index, "W5_notes_comment"]}
                  >
                    <Input
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W5_notes_comment"
                        )
                      }
                      name="W5_notes_comment"
                      style={(styleField.input, styleColor)}
                    />
                  </Form.Item>
                );
              }}
            ></Table.Column>
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
                    size="small"
                    style={{ border: "none" }}
                    icon={<SaveOutlined style={{ color: "green" }} />}
                    onClick={() => this.saveData(record)}
                  ></Button>
                  <Button
                    size="small"
                    style={{ border: "none" }}
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      Modal.confirm({
                        content: "消去してもよろしいですか？",
                        okText: "Yes",
                        cancelText: "No",
                        onOk: () => this.deleteData(record),
                      });
                    }}
                  ></Button>
                </>
              )}
            />
          </Table>
          <Form.Item name="Expression_14" style={{ marginTop: "0.2em" }}>
            <Input.TextArea rows="5" readOnly></Input.TextArea>
          </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0720001_NotesSet);
