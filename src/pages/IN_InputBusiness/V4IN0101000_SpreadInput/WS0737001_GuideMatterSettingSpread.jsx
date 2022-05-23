import React from "react";
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import {
  Card,
  Table,
  message,
  Row,
  Col,
  Form,
  Space,
  Button,
  Input,
  Checkbox,
  Modal,
} from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import WS0272001_CautionGuideNotesSearchQuery from "pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0272001_CautionGuideNotesSearchQuery.jsx";
import WS0267001_CategorySearchQuerySingle from "pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx";
import WS1004007_JudgeSelect from "pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS1004007_JudgeSelect.jsx";
import GuideMatterSettingSpreadAction from "redux/InputBusiness/SpreadInput/GuideMatterSettingSpread.action";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import WS0285001_JudgeQuery from "pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery";
const { TextArea } = Input;
const stylefm = {
  mb: {
    marginBottom: "0px",
  },
  w: {
    width: "100px",
  },
  stBorder: {
    border: "0px",
  },
};
class WS0737001_GuideMatterSettingSpread extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_CommentInitials: PropTypes.string,
    Li_DisplayForm: PropTypes.number,
    Li_Date: PropTypes.any,
    Li_PersonalNum: PropTypes.string,
    Li_ConsultCourse: PropTypes.string,
    Li_PatternCode: PropTypes.string,
    Li_KanjiName: PropTypes.string,
    Li_ContractAbbreviation: PropTypes.string,
    Li_CategoryCode: PropTypes.number,
    Li_JudgeLevel: PropTypes.number,
    Lio_TotalComment: PropTypes.string,
    Lio_StsLeadershipMattersChange: PropTypes.any,
    Li_ReserveNum: PropTypes.number,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = "指導事項設定(スプレッド)";
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: true,
      rowSelect: {},
    };
  }
  componentDidMount() {
    this.getListData();
  }
  getListData() {
    this.setState({ isLoadingTable: true });
    const data = {
      Li_CmtInitials: this.props.Li_CmtInitials
        ? this.props.Li_CmtInitials
        : "",
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
      Li_ReserveNum: this.props.Li_ReserveNum
        ? this.props.Li_ReserveNum
        : 200207089000008,
    };
    GuideMatterSettingSpreadAction.GetListGuideMatterSettingSpreadAction(data)
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
    //  console.log(2,value)
    // console.log(3,record.W4_course_level_3)
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
    console.log(this.state.rowSelect.W4_course_level_3)
  };
  saveData(record) {
    const data = {
      id: record.id || undefined,
      GR_id:  record.GR_id || undefined,
      Li_ReserveNum: this.props.Li_ReserveNum
      ? this.props.Li_ReserveNum
      : 200207089000008,
      W4_input_flg: record.W4_input_flg,
      W4_course_level_2:record.W4_course_level_2 ,
      W4_course_level_3: record.W4_course_level_3,
      W4_serial_num: record.W4_serial_num,
      W4_general_comments_cd: record.W4_general_comments_cd,
      W4_overall_comments: record.W4_overall_comments,
      W4_auto_judge_output_type: record.W4_auto_judge_output_type,
      W4_auto_judge_sect_cd: record.W4_auto_judge_sect_cd,
      W4_auto_judge_basic_judge: record.W4_auto_judge_basic_judge,
    };
    console.log(data);
    GuideMatterSettingSpreadAction.SaveDataAction(data)
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
      GuideMatterSettingSpreadAction.DeleteDataAction({
        id: record.id,
        Li_ReserveNum: this.props.Li_ReserveNum
          ? this.props.Li_ReserveNum
          : 200207089000008,
        W3_serial_num_old: record.W3_serial_num_old,
        W3_general_comments_cd_old: record.W3_general_comments_cd_old,
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
    return (
      <div className="guide-matter-setting-spread p-td">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          {" "}
          <Card title="指導事項設定(スプレッド)" className="mb-2">
            <Row>
              <Col span={4}>
                <Form.Item label="受診日">
                  <span>{this.props.Li_Date}</span>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="個人番号">
                  <span>{this.props.Li_PersonalNum}</span>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="氏名">
                  <span>{this.props.Li_KanjiName}</span>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={<Button type="primary">コース</Button>}>
                  <Space>
                    <span>{this.props.Li_ConsultCourse}</span>
                    <span>{this.props.Li_ContractAbbreviation}</span>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            style={{ marginBottom: "0.2em" }}
            // rowSelection={{
            //   type: 'radio',
            //   onChange: (selectedRowKeys, selectedRows) => {
            //     console.log('selectedRows: ', selectedRows);
            //   }
            // }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  this.setState({ rowSelect: record });
                  this.formRef.current?.setFieldsValue({
                    Expression_17: record.W4_overall_comments,
                  });
                },
              };
            }}
          >
            <Table.Column
              title="F"
              dataIndex="W4_input_flag"
              render={(row, record, index) => {
                return <span>{record.W4_input_flg !== "S" || record.W4_input_flg !== "s" ? "H" : record.W4_input_flg}</span>;
              }}
            ></Table.Column>
            <Table.Column
              title="L2"
              dataIndex="W4_course_level_2"
              render={(row, record, index) => {
                return (
                  <Form.Item  name={["tableData", index, "W4_course_level_2"]} valuePropName="checked">
                    <Checkbox onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.checked === false ? 0 : 1,
                          "W4_course_level_2"
                        )
                      }
                      name="W4_course_level_2" style={{ marginTop: "0.8em" }}></Checkbox>
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="L3"
              dataIndex="W4_course_level_3"
              render={(row, record, index) => {
                return (
                  <Form.Item  name={["tableData", index, "W4_course_level_3"]} valuePropName="checked">
                    <Checkbox onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.checked === false ? 0 : 1,
                          "W4_course_level_3"
                        )
                      }
                      name="W4_course_level_3" style={{ marginTop: "0.8em" }}></Checkbox>
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="連番"
              dataIndex="W4_serial_num"
              render={(row, record, index) => {
                return (
                  <Form.Item name={["tableData", index, "W4_serial_num"]} style={stylefm.mb}>
                    <Input
                         onChange={(e) =>
                          this.handleChangeInput(
                            rowSelect,
                            e.target.value,
                            "W4_serial_num"
                          )
                        }
                        name="W4_serial_num"
                      type="number"
                      style={(stylefm.w, stylefm.stBorder)}
                    />
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="ｺｰﾄﾞ"
              dataIndex="W4_general_comments_cd"
              render={(row, record, index) => {
                return (
                  <Form.Item  name={["tableData", index, "W4_general_comments_cd"]} style={stylefm.mb}>
                    <Input.Search
                    onChange={(e) =>
                      this.handleChangeInput(
                        rowSelect,
                        e.target.value,
                        "W4_general_comments_cd"
                      )
                    }
                    name="W4_general_comments_cd"
                      type="number"
                      style={stylefm.w}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 800,
                            component: (
                              <WS0272001_CautionGuideNotesSearchQuery
                              onFinishScreen={(obj) => {
                                record = {
                                  ...record,
                                  W4_general_comments_cd: obj.Lo_LnkOutCmtCode,
                                  W4_overall_comments: obj.Lo_recordData.comment_content
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
              dataIndex="W4_overall_comments"
              render={(row, record, index) => {
                return (
                  <Form.Item  name={["tableData", index, "W4_overall_comments"]} style={stylefm.mb}>
                    <Input  onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W4_overall_comments"
                        )
                      }
                      name="W4_overall_comments" style={stylefm.stBorder} />
                  </Form.Item>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="種別"
              dataIndex="W4_auto_judge_output_type"
              render={(row, record, index) => {
                return (
                  <Form.Item
                    name={["tableData", index, "W4_auto_judge_output_type"]}

                  >
                    <Input
                      onChange={(e) =>
                        this.handleChangeInput(
                          rowSelect,
                          e.target.value,
                          "W4_auto_judge_output_type"
                        )
                      }
                      name="W4_auto_judge_output_type"
                      style={stylefm.stBorder}
                    />
                  </Form.Item>
                );
              }}
>
            </Table.Column>
            <Table.Column
              title="ｶﾃｺﾞﾘ情報"
              dataIndex="W4_auto_judge_sect_cd"
              render={(row, record, index) => {
                return (
                  <Row>
                    <Col span={8}>
                      <Form.Item
                        name={["tableData", index, "W4_auto_judge_sect_cd"]}
                        style={stylefm.mb}
                      >
                        <Input.Search
                         onChange={(e) =>
                          this.handleChangeInput(
                            rowSelect,
                            e.target.value,
                            "W4_auto_judge_sect_cd"
                          )
                        }
                        name="W4_auto_judge_sect_cd"
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 600,
                                component: (
                                  <WS0267001_CategorySearchQuerySingle
                                  onFinishScreen={(obj) => {
                                    record = {
                                      ...record,
                                      W4_auto_judge_sect_cd: obj.Lo_recordData.category_code,
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
                    <Form.Item
                    name={["tableData", index, "category_name"]}
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
                      style={stylefm.stBorder}
                    />
                  </Form.Item>
                    </Col>
                  </Row>
                );
              }}
            ></Table.Column>
            <Table.Column
              title="判"
              dataIndex="W4_auto_judge_basic_judge"
              render={(row, record, index) => {
                return (
                  <Form.Item
                  name={["tableData", index, "W4_auto_judge_basic_judge"]}
                    style={stylefm.mb}
                  >
                    <Input.Search
                         onChange={(e) =>
                          this.handleChangeInput(
                            rowSelect,
                            e.target.value,
                            "W4_auto_judge_basic_judge"
                          )
                        }
                        name="W4_auto_judge_basic_judge"
                      style={stylefm.w}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 800,
                            component: <WS0285001_JudgeQuery
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
                            />,
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
          <Form.Item name="Expression_17">
            <TextArea row={10} readOnly></TextArea>
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
)(WS0737001_GuideMatterSettingSpread);
