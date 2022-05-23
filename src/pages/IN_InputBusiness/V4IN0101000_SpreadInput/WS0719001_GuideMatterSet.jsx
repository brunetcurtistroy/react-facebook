import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import {
  Card,
  Table,
  message,
  Row,
  Col,
  Form,
  Modal,
  Input,
  Button,
  Checkbox,
} from "antd";
import WS0272001_CautionGuideNotesSearchQuery from "pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0272001_CautionGuideNotesSearchQuery.jsx";
import WS0267001_CategorySearchQuerySingle from "pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx";
import WS0285001_JudgeQuery from "pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery.jsx";
import GuideMatterSetAction from "redux/InputBusiness/SpreadInput/GuideMatterSet.action";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
const styleMgForm = { marginBottom: "0px" };
const styleBInput = { border: "0px" };
const styleCheck = { marginBottom: "-0.2em" };

class WS0719001_GuideMatterSet extends React.Component {
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

    // document.title = "指導事項設定";
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      checkDoubleClick: false,
      dataSource: [],
      isLoadingTable: true,
      rowSelect: {},
      W3_course_level_2: false,
      W3_course_level_3: false,
    };
  }
  onFinish(values) {}
  componentDidMount() {
    this.listData();
  }
  listData() {
    this.setState({ isLoadingTable: true });
    const data = {
      Li_Date: this.props.Li_Date ? this.props.Li_Date : "2002-07-08",
      Li_PersonalNum: this.props.Li_PersonalNum
        ? this.props.Li_PersonalNum
        : 2168,
      Li_ConsultCourse: this.props.Li_ConsultCourse
        ? this.props.Li_ConsultCourse
        : "g05",
      Li_PatternCode: this.props.Li_PatternCode
        ? this.props.Li_PatternCode
        : "9999-000",
      Li_KanjiName: this.props.Li_KanjiName ? this.props.Li_KanjiName : "",
      Li_ContractAbbreviation: this.props.Li_ContractAbbreviation
        ? this.props.Li_ContractAbbreviation
        : "特別　（新）",
      Li_JudgeLevel: this.props.Li_JudgeLevel ? this.props.Li_JudgeLevel : 0,
    };

    GuideMatterSetAction.GetLisstNotesSetAction(data)
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
    console.log(record)
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
      W3_serial_num_old: record.W3_serial_num_old ,
      W3_general_comments_cd_old: record.W3_general_comments_cd_old ,
      W3_input_flg: record.W3_input_flg ,
      W3_course_level_2: record.W3_course_level_2 || 0,
      W3_course_level_3: record.W3_course_level_3 || 0,
      W3_serial_num: record.W3_serial_num ,
      W3_general_comments_cd: record.W3_general_comments_cd ,
      W3_overall_comments: record.W3_overall_comments ,
      W3_auto_judge_output_type: record.W3_auto_judge_output_type ,
      W3_auto_judge_sect_cd: record.W3_auto_judge_sect_cd ,
      W3_auto_judge_basic_judge: record.W3_auto_judge_basic_judge,
    };
    GuideMatterSetAction.SaveDataAction(data)
      .then((res) => {
        message.success("成功");
        this.listData();
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
      GuideMatterSetAction.DeleteDataAction({
        id: record.id,
        Li_ReserveNum: this.props.Li_ReserveNum
          ? this.props.Li_ReserveNum
          : 200207089000008,
        W3_serial_num_old: record.W3_serial_num_old,
        W3_general_comments_cd_old: record.W3_general_comments_cd_old,
      })
        .then((res) => {
          message.success("成功");
          this.listData();
        })
        .catch((err) => message.error("エラー"));
    } else {
      let arrTemp = [...this.state.dataSource];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ tableData: arrTemp });
      this.setState({ dataSource: arrTemp });
      this.listData();
    }
  }
  render() {
    const { rowSelect } = this.state;
    const styleColor = {
      color: this.state.checkDoubleClick ? "red" : "black",
    };
    return (
      <div className="guide-matter-set p-td">
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
                    Expression_16: record.W3_overall_comments,
                  });
                },
              };
            }}
          >
            {/* dataIndex="W3_input_flag" */}
            <Table.Column
              title="F"
              dataIndex="W3_input_flag"
              render={(row, record, index) => {
                return (
                  <span style={styleColor}>
                    {record.W3_input_flg !== "S" || record.W3_input_flg !== "s"
                      ? "H"
                      : record.W3_input_flg}
                  </span>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="L2"
              dataIndex="W3_course_level_2"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    name={["tableData", index, "W3_course_level_2"]}
                    valuePropName="checked"
                    style={styleCheck}
                  >
                    <Checkbox
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.checked ? 1 : 0,
                          "W3_course_level_2"
                        )
                      }
                      name="W3_course_level_2"
                    ></Checkbox>
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="L3"
              dataIndex="W3_course_level_3"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    name={["tableData", index, "W3_course_level_3"]}
                    valuePropName="checked"
                    style={styleCheck}
                  >
                    <Checkbox
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.checked ? 1 : 0,
                          "W3_course_level_3"
                        )
                      }
                      name="W3_course_level_3"
                    ></Checkbox>
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="連番"
              dataIndex="W3_serial_num"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    name={["tableData", index, "W3_serial_num"]}
                    style={styleMgForm}
                  >
                    <Input
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W3_serial_num"
                        )
                      }
                      name="W3_serial_num"
                      type="number"
                      style={styleColor}
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
              dataIndex="W3_general_comments_cd"
              render={(row, record, index) => {
                //khi W3_general_comments_code thay doi thi xet lai field
                return (
                  <Form.Item
                    name={["tableData", index, "W3_general_comments_cd"]}
                    style={styleMgForm}
                  >
                    <Input.Search
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W3_general_comments_cd"
                        )
                      }
                      name="W3_general_comments_cd"
                      style={styleColor}
                      readOnly
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "60%",
                            component: (
                              <WS0272001_CautionGuideNotesSearchQuery
                                onFinishScreen={(obj) => {
                                  record = {
                                    ...record,
                                    W3_general_comments_cd: obj.Lo_LnkOutCmtCode,
                                    W3_overall_comments: obj.Lo_recordData.comment_content
                                  }
                                  let data = [...this.state.dataSource];
                                  data[index] = record;
                                  this.setState({dataSource: data, rowSelect: record})
                                  this.formRef.current.setFieldsValue({tableData: data});
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
              dataIndex="W3_overall_comments"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    name={["tableData", index, "W3_overall_comments"]}
                    style={styleMgForm}
                  >
                    <Input
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W3_overall_comments"
                        )
                      }
                      name="W3_overall_comments"
                      style={(styleBInput, styleColor)}
                    />
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="種別"
              dataIndex="W3_auto_judge_output_type"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    name={["tableData", index, "W3_auto_judge_output_type"]}
                    style={styleMgForm}
                  >
                    <Input
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W3_auto_judge_output_type"
                        )
                      }
                      name="W3_auto_judge_output_type"
                      style={styleBInput}
                    />
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="ｶﾃｺﾞﾘ情報"
              dataIndex="W3_auto_judge_sect_cd"
              render={(row, record, index) => {
                return (
                  <Row>
                    <Col span={8}>
                      <Form.Item
                        name={["tableData", index, "W3_auto_judge_sect_cd"]}
                        style={styleMgForm}
                      >
                        <Input.Search
                          onChange={(e) =>
                            this.handleChangeInput(
                              rowSelect,
                              e.target.value,
                              "W3_auto_judge_sect_cd"
                            )
                          }
                          name="W3_auto_judge_sect_cd"
                          style={{ width: "95%" }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "30%",
                                component: (
                                  <WS0267001_CategorySearchQuerySingle
                                    onFinishScreen={(obj) => {
                                      record = {
                                        ...record,
                                        W3_auto_judge_sect_cd: obj.Lo_recordData.category_code,
                                        category_name: obj.Lo_recordData.category_name
                                      }
                                      let data = [...this.state.dataSource];
                                      data[index] = record;
                                      this.setState({dataSource: data, rowSelect: record})
                                      this.formRef.current.setFieldsValue({tableData: data});
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      {/* {this.state.dataSource &&
                        this.state.dataSource.map((res) => {
                          return <span>{res.category_name}</span>;
                        })} */}
                         <Form.Item
                    name={["tableData", index, "category_name"]}
                    style={styleMgForm}
                  >
                    <Input
                    readOnly
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "category_name"
                        )
                      }
                      style={styleBInput}
                    />
                  </Form.Item>
                    </Col>
                  </Row>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="判"
              dataIndex="W3_auto_judge_basic_judge"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    name={["tableData", index, "W3_auto_judge_basic_judge"]}
                    style={styleMgForm}
                  >
                    <Input.Search
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W3_auto_judge_basic_judge"
                        )
                      }
                      name="W3_auto_judge_basic_judge"
                      style={styleBInput}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "25%",
                            component: (
                              <WS0285001_JudgeQuery
                                onFinishScreen={(obj) => {
                                  console.log(obj);
                                      record = {
                                        ...record,
                                        // W3_auto_judge_basic_judge: obj.Lo_recordData.category_code,
                                      }
                                      let data = [...this.state.dataSource];
                                      data[index] = record;
                                      this.setState({dataSource: data, rowSelect: record})
                                      this.formRef.current.setFieldsValue({tableData: data});
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
          <Form.Item name="Expression_16" style={{ marginTop: "0.2em" }}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0719001_GuideMatterSet);
