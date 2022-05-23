import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import {
  Card,
  Form,
  Input,
  Checkbox,
  Button,
  Table,
  Tabs,
  Row,
  Space,
  Col,
  Modal,
  message,
} from "antd";

import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import WS0548001_ReservesPersonsBulkUpdate from "pages/YK_ReservationBusiness/V5YK0001000_ReserveStatusSearch/WS0548001_ReservesPersonsBulkUpdate.jsx";
import WS2702151_DisplayNameEdit from "pages/SM_SystemMaintenance/V4SM0001000_ReservesDisplayItemSetting/WS2702151_DisplayNameEdit.jsx";

import "./WS2702007_ReservesDisplayItemSetting.scss";
import ReservesDisplayItemSettingService from "services/SystemMaintenance/ReservesDisplayItemSetting/ReservesDisplayItemSettingService";

const customStyle = {
  inputOnly: {
    background: "transparent",
    border: "none",
  },
  styleCol: {
    padding: 0,
  },
  styleRow: {
    margin: 0,
  },
};
class WS2702007_ReservesDisplayItemSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "予約表示項目設定";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      tabNum: 1,
      //Tab 0
      SearchCourse: "",
      VlStsUnregisteredCourse: false,

      Expression_82: "",
      SelectInDisplayItemNumCourse: 1,

      //Tab 1
      SearchInspect: "",
      Expression_103: "",
      SelectInDisplayItemNumInspect: 1,

      //Selected
      selectedRowsLeftCoursesWhole: {},
      selectedRowsCourseList: {},
      selectedRowsLeftExamListWhole: {},
      selectedRowsExamListWork: {},

      //isLoadingTable
      isLoadingTable01: false,
      isLoadingTable02: false,
      isLoadingTable03: false,
      isLoadingTable04: false,
      //isLoadingButton
      isLoadingButtonAdd01: false,
      isLoadingButtonDelete01: false,
      isLoadingButtonAdd02: false,
      isLoadingButtonDelete02: false,
    };
  }

  componentDidMount = () => {
    this.getDisplayItemCourse();
    this.getDisplayItemInspect();

    this.getLeftCoursesWhole();
    this.getRightCoursesDisplayItems(this.state.SelectInDisplayItemNumCourse);

    this.getLeftExamListWhole();
    this.getRightExamListDisplayItems(this.state.SelectInDisplayItemNumInspect);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //Tab 0
  //API 1
  getDisplayItemCourse = () => {
    let numberExpression = 61 + this.state.SelectInDisplayItemNumCourse;
    ReservesDisplayItemSettingService.getDisplayItemCourseService()
      .then((res) => {
        this.setState({
          DisplayItemCourse: res.data,
          Expression_82: res.data?.["Expression_" + numberExpression],
        });
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

  //API 2
  getDisplayItemInspect = () => {
    let numberExpression = 82 + this.state.SelectInDisplayItemNumInspect;

    ReservesDisplayItemSettingService.getDisplayItemInspectService()
      .then((res) => {
        this.setState({
          DisplayItemInspect: res.data,
          Expression_103: res.data?.["Expression_" + numberExpression],
        });
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

  //API 3
  getLeftCoursesWhole = (isRefreshSearching) => {
    this.setState({ isLoadingTable01: true });
    const { SearchCourse, VlStsUnregisteredCourse } = this.state;
    ReservesDisplayItemSettingService.getLeftCoursesWholeService({
      SearchCourse,
      VlStsUnregisteredCourse,
    })
      .then((res) => {
        this.setState({ LeftCoursesWhole: res.data });
        if (isRefreshSearching) {
          this.setState({
            selectedRowsLeftCoursesWhole: {},
            selectedRowsKeyLeftCoursesWhole: [],
          });
        }
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
        this.setState({ isLoadingTable01: false });
      });
  };

  //API 4
  getRightCoursesDisplayItems = (SelectInDisplayItemNumCourse) => {
    this.setState({ isLoadingTable02: true });
    ReservesDisplayItemSettingService.getRightCoursesDisplayItemsService({
      SelectInDisplayItemNumCourse,
    })
      .then((res) => {
        this.setState({
          CourseList: res.data.CourseList,
          Expression_82: res.data.Expression_82,
        });
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
        this.setState({ isLoadingTable02: false });
      });
  };

  //Tab 1
  //API 5
  getLeftExamListWhole = (isRefreshSearching) => {
    this.setState({ isLoadingTable03: true });

    const { SearchInspect } = this.state;
    ReservesDisplayItemSettingService.getLeftExamListWholeService({
      SearchInspect,
      // ReserveDisplayItems: this.state.SelectInDisplayItemNumInspect,
    })
      .then((res) => {
        this.setState({
          LeftExamListWhole: res.data,
        });
        if (isRefreshSearching) {
          this.setState({
            selectedRowsLeftExamListWhole: {},
            selectedRowsKeyLeftExamListWhole: [],
          });
        }
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
        this.setState({ isLoadingTable03: false });
      });
  };

  //API 6
  getRightExamListDisplayItems = (SelectInDisplayItemNumInspect) => {
    this.setState({ isLoadingTable04: true });
    ReservesDisplayItemSettingService.getRightExamListDisplayItemsService({
      SelectInDisplayItemNumInspect,
    })
      .then((res) => {
        this.setState({
          ExamListWork: res.data.ExamListWork,
          Expression_103: res.data.Expression_103,
        });
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
        this.setState({ isLoadingTable04: false });
      });
  };

  //API 7
  addCourseAdded = () => {
    this.setState({
      isLoadingButtonAdd01: true,
    });
    const { W1_course_cd } = this.state.selectedRowsLeftCoursesWhole;
    ReservesDisplayItemSettingService.addCourseAddedService({
      W1_inspect_cd: W1_course_cd,
      ReserveDisplayItems: this.state.SelectInDisplayItemNumCourse,
    })
      .then((res) => {
        message.success(res.data.message);
        this.getLeftCoursesWhole();
        this.getRightCoursesDisplayItems(
          this.state.SelectInDisplayItemNumCourse
        );
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() =>
        this.setState({
          isLoadingButtonAdd01: false,
        })
      );
  };

  //API 8
  deleteCourseDelete = () => {
    this.setState({
      isLoadingButtonDelete01: true,
    });
    const { course_code } = this.state.selectedRowsCourseList;
    ReservesDisplayItemSettingService.deleteCourseDeleteService({
      course_code: course_code,
      ReserveDisplayItems: this.state.SelectInDisplayItemNumCourse,
    })
      .then((res) => {
        message.success(res.data.message);
        this.setState({
          selectedRowsCourseList: {},
          selectedRowsKeyCourseList: [],
        });
        this.getLeftCoursesWhole();
        this.getRightCoursesDisplayItems(
          this.state.SelectInDisplayItemNumCourse
        );
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() =>
        this.setState({
          isLoadingButtonDelete01: false,
        })
      );
  };

  //API 9
  addInspect = () => {
    this.setState({
      isLoadingButtonAdd02: true,
    });
    const { W1_inspect_cd } = this.state.selectedRowsLeftExamListWhole;
    ReservesDisplayItemSettingService.addInspectService({
      W1_inspect_cd: W1_inspect_cd,
      ReserveDisplayItems: this.state.SelectInDisplayItemNumInspect,
    })
      .then((res) => {
        message.success(res.data.message);

        this.getLeftExamListWhole();
        this.getRightExamListDisplayItems(
          this.state.SelectInDisplayItemNumInspect
        );
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() =>
        this.setState({
          isLoadingButtonAdd02: false,
        })
      );
  };

  //API 10
  deleteCheck = () => {
    this.setState({
      isLoadingButtonDelete02: true,
    });
    const { W2_inspect_cd } = this.state.selectedRowsExamListWork;
    ReservesDisplayItemSettingService.deleteCheckService({
      W2_inspect_cd: W2_inspect_cd,
      ReserveDisplayItems: this.state.SelectInDisplayItemNumInspect,
    })
      .then((res) => {
        message.success(res.data.message);
        this.setState({
          selectedRowsExamListWork: {},
          selectedRowsKeyExamListWork: [],
        });
        this.getLeftExamListWhole();
        this.getRightExamListDisplayItems(
          this.state.SelectInDisplayItemNumInspect
        );
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() =>
        this.setState({
          isLoadingButtonDelete02: false,
        })
      );
  };

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  checkSelectedButtonExpression = (tabNum, number) => {
    if (tabNum === 0) {
      if (this.state.SelectInDisplayItemNumCourse === number) {
        return "selected";
      }
    }
    if (tabNum === 1) {
      if (this.state.SelectInDisplayItemNumInspect === number) {
        return "selected";
      }
    }
  };

  renderListNumber = () => {
    var listItem = [];
    for (let i = 1; i <= 20; i++) {
      listItem.push(
        <Col
          span={1}
          offset={i === 1 ? 2 : null}
          style={customStyle.styleCol}
          key={`renderListNumber_${i}`}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Input
              value={i < 10 ? "0" + i : i}
              readOnly
              style={customStyle.inputOnly}
            />
          </Form.Item>
        </Col>
      );
    }
    return listItem;
  };

  renderListButtonExpression = (tabNum) => {
    var listItem = [];
    for (let i = 1; i <= 20; i++) {
      let numberExpression = tabNum === 0 ? 61 + i : 82 + i;

      listItem.push(
        <Col
          span={1}
          offset={i === 1 ? 2 : null}
          style={customStyle.styleCol}
          key={`renderListButtonExpression_${i}`}
        >
          <Form.Item>
            <Input
              className={`${this.checkSelectedButtonExpression(tabNum, i)}`}
              name={`Expression_${tabNum === 0 ? 61 + i : 82 + i}`}
              type="text"
              readOnly
              style={{
                cursor: "pointer",
                background: "#096dd9fa",
              }}
              value={
                this.state[
                  tabNum === 0 ? "DisplayItemCourse" : "DisplayItemInspect"
                ]?.["Expression_" + numberExpression]
              }
              onClick={(event) => {
                if (tabNum === 0) {
                  if (this.state.SelectInDisplayItemNumCourse != i) {
                    this.setState({
                      selectedRowsCourseList: {},
                    });
                  }
                  this.setState({
                    Expression_82: event.target.value,
                    SelectInDisplayItemNumCourse: i,
                  });
                  this.getRightCoursesDisplayItems(i);
                }
                if (tabNum === 1) {
                  if (this.state.SelectInDisplayItemNumCourse != i) {
                    this.setState({
                      selectedRowsExamListWork: {},
                    });
                  }
                  this.setState({
                    Expression_103: event.target.value,
                    SelectInDisplayItemNumInspect: i,
                  });
                  this.getRightExamListDisplayItems(i);
                }
              }}
            ></Input>
          </Form.Item>
        </Col>
      );
    }
    return listItem;
  };

  onSelectChangeLeftCoursesWhole = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowsLeftCoursesWhole: selectedRows[0],
      selectedRowsKeyLeftCoursesWhole: selectedRowKeys,
    });
  };

  onSelectChangeCourseList = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowsCourseList: selectedRows[0],
      selectedRowsKeyCourseList: selectedRowKeys,
    });
  };

  onSelectChangeLeftExamListWhole = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowsLeftExamListWhole: selectedRows[0],
      selectedRowsKeyLeftExamListWhole: selectedRowKeys,
    });
  };

  onSelectChangeExamListWork = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowsExamListWork: selectedRows[0],
      selectedRowsKeyExamListWork: selectedRowKeys,
    });
  };

  renderBodyTab = (tabNum) => {
    const {
      selectedRowsKeyLeftCoursesWhole,
      selectedRowsKeyLeftExamListWhole,

      selectedRowsKeyCourseList,
      selectedRowsKeyExamListWork,
    } = this.state;
    const rowSelectionLeftCoursesWhole = {
      selectedRowKeys: selectedRowsKeyLeftCoursesWhole,
      onChange: this.onSelectChangeLeftCoursesWhole,
    };
    const rowSelectionCourseList = {
      selectedRowKeys: selectedRowsKeyCourseList,
      onChange: this.onSelectChangeCourseList,
    };
    const rowSelectionLeftExamListWhole = {
      selectedRowKeys: selectedRowsKeyLeftExamListWhole,
      onChange: this.onSelectChangeLeftExamListWhole,
    };
    const rowSelectionExamListWork = {
      selectedRowKeys: selectedRowsKeyExamListWork,
      onChange: this.onSelectChangeExamListWork,
    };

    return (
      <div>
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Row gutter={24} style={customStyle.styleRow}>
            {this.renderListNumber(tabNum)}
          </Row>
          <Row gutter={24} style={customStyle.styleRow} hidden={tabNum === 1}>
            {this.renderListButtonExpression(tabNum)}
          </Row>
          <Row gutter={24} style={customStyle.styleRow} hidden={tabNum === 0}>
            {this.renderListButtonExpression(tabNum)}
          </Row>
          <Row gutter={24} style={{ marginTop: "10px" }} hidden={tabNum === 1}>
            <Col span={12}>
              <div
                style={{
                  background: "#096dd9fa",
                  padding: "10px",
                  color: "#fff",
                }}
              >
                <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                  コース選択
                </div>
                <Space>
                  <label style={{ color: "#fff" }}>検索</label>
                  <Form.Item name="SearchInspect" style={{ marginBottom: 0 }}>
                    <Input
                      type="text"
                      name="SearchCourse"
                      value={this.state.SearchCourse}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                  <label style={{ color: "#fff" }}>未登録</label>
                  <Form.Item
                    name="VlStsUnregisteredCourse"
                    valuePropName="Checkbox"
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox
                      name="VlStsUnregisteredCourse"
                      defaultChecked={this.state.VlStsUnregisteredCourse}
                      onChange={() => {
                        this.setState({
                          VlStsUnregisteredCourse:
                            !this.state.VlStsUnregisteredCourse,
                        });
                      }}
                    ></Checkbox>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      onClick={() => {
                        this.getLeftCoursesWhole(true);
                      }}
                    >
                      検索
                    </Button>
                  </Form.Item>
                </Space>
              </div>

              <div>
                <Table
                  dataSource={this.state.LeftCoursesWhole}
                  loading={this.state.isLoadingTable01}
                  pagination={true}
                  bordered={true}
                  rowKey={(record) => record.id}
                  size="small"
                  rowSelection={{
                    type: "radio",
                    ...rowSelectionLeftCoursesWhole,
                  }}
                >
                  <Table.Column title="ｺｰｽ" dataIndex="W1_course_cd" />
                  <Table.Column
                    title="名称"
                    dataIndex="course_name_short_name"
                  />
                  <Table.Column
                    title="登録済み予約項目"
                    dataIndex="Expression_1"
                  />
                </Table>
              </div>
            </Col>

            <Col span={2} style={{ textAlign: "center", alignSelf: "center" }}>
              <div style={{ display: "inline-block" }}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    Modal.confirm({
                      title: "変更確認",
                      icon: <InfoCircleOutlined style={{ color: "orange" }} />,
                      content: "他の項目に登録済みです。変更しますか？",
                      okText: "はい",
                      cancelText: "いいえ",
                      onOk: () => {
                        this.addCourseAdded();
                      },
                    });
                  }}
                  disabled={
                    this.state.selectedRowsLeftCoursesWhole.id ? false : true
                  }
                  loading={this.state.isLoadingButtonAdd01}
                >
                  追加 <DoubleRightOutlined />
                </Button>
                <br />
                <br />
                <Button
                  type="primary"
                  size="small"
                  icon={<DoubleLeftOutlined />}
                  onClick={() => {
                    this.deleteCourseDelete();
                  }}
                  disabled={this.state.selectedRowsCourseList.id ? false : true}
                  loading={this.state.isLoadingButtonDelete01}
                >
                  削除
                </Button>
              </div>
            </Col>

            <Col span={10}>
              <div
                style={{
                  background: "#096dd9fa",
                  padding: "10px",
                  color: "#fff",
                }}
              >
                <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                  予約表示設定
                </div>
                <Space>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="text"
                      name="Expression_82"
                      value={this.state.Expression_82}
                      readOnly
                    />
                  </Form.Item>
                  <Button
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 500,
                          component: (
                            <WS2702151_DisplayNameEdit
                              Li_ManageDivision={1}
                              Li_DisplayItemNum={
                                this.state.SelectInDisplayItemNumCourse
                              }
                              Li_Name={this.state.Expression_82}
                              onFinishScreen={() => {
                                this.getDisplayItemCourse();
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  >
                    名称設定
                  </Button>
                </Space>
              </div>

              <div>
                <Table
                  dataSource={this.state.CourseList}
                  loading={this.state.isLoadingTable02}
                  pagination={true}
                  bordered={true}
                  rowKey={(record) => record.id}
                  size="small"
                  rowSelection={{
                    type: "radio",
                    ...rowSelectionCourseList,
                  }}
                >
                  <Table.Column title="ｺｰｽ" dataIndex="course_code" />
                  <Table.Column
                    title="名称"
                    dataIndex="course_name_short_name"
                  />
                </Table>
              </div>
            </Col>
          </Row>

          <Row gutter={24} style={{ marginTop: "10px" }} hidden={tabNum === 0}>
            <Col span={12}>
              <div
                style={{
                  background: "#096dd9fa",
                  padding: "10px",
                  color: "#fff",
                }}
              >
                <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                  検査選択
                </div>
                <Space>
                  <label style={{ color: "#fff" }}>検索</label>
                  <Form.Item name="SearchInspect" style={{ marginBottom: 0 }}>
                    <Input
                      type="text"
                      name="SearchInspect"
                      value={this.state.SearchInspect}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      onClick={() => {
                        this.getLeftExamListWhole(true);
                      }}
                    >
                      検索
                    </Button>
                  </Form.Item>
                </Space>
              </div>
              <div>
                <Table
                  dataSource={this.state.LeftExamListWhole}
                  loading={this.state.isLoadingTable03}
                  pagination={true}
                  bordered={true}
                  rowKey={(record) => record.id}
                  size="small"
                  rowSelection={{
                    type: "radio",
                    ...rowSelectionLeftExamListWhole,
                  }}
                >
                  <Table.Column title="検査ｺｰﾄﾞ" dataIndex="W1_inspect_cd" />
                  <Table.Column title="検査略名" dataIndex="exam_short_name" />
                  <Table.Column title="名称" dataIndex="exam_name" />
                  <Table.Column
                    title="登録済予約項目"
                    dataIndex="RegisteredReservedDisplayItems"
                  />
                </Table>
              </div>
            </Col>

            <Col span={2} style={{ textAlign: "center", alignSelf: "center" }}>
              <div style={{ display: "inline-block" }}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    Modal.confirm({
                      title: "変更確認",
                      icon: <InfoCircleOutlined style={{ color: "orange" }} />,
                      content: "他の項目に登録済みです。変更しますか？",
                      okText: "はい",
                      cancelText: "いいえ",
                      onOk: () => {
                        this.addInspect();
                      },
                    });
                  }}
                  disabled={
                    this.state.selectedRowsLeftExamListWhole.id ? false : true
                  }
                  loading={this.state.isLoadingButtonAdd02}
                >
                  追加 <DoubleRightOutlined />
                </Button>
                <br />
                <br />
                <Button
                  type="primary"
                  size="small"
                  icon={<DoubleLeftOutlined />}
                  onClick={() => {
                    this.deleteCheck();
                  }}
                  disabled={
                    this.state.selectedRowsExamListWork.id ? false : true
                  }
                  loading={this.state.isLoadingButtonDelete02}
                >
                  削除
                </Button>
              </div>
            </Col>

            <Col span={10}>
              <div
                style={{
                  background: "#096dd9fa",
                  padding: "10px",
                  color: "#fff",
                }}
              >
                <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                  予約表示設定
                </div>
                <Space>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="text"
                      name="Expression_103"
                      value={this.state.Expression_103}
                      readOnly
                    />
                  </Form.Item>
                  <Button
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 500,
                          component: (
                            <WS2702151_DisplayNameEdit
                              Li_ManageDivision={2}
                              Li_DisplayItemNum={
                                this.state.SelectInDisplayItemNumInspect
                              }
                              Li_Name={this.state.Expression_103}
                              onFinishScreen={() => {
                                this.getDisplayItemInspect();
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}
                  >
                    名称設定
                  </Button>
                </Space>
              </div>

              <div>
                <Table
                  dataSource={this.state.ExamListWork}
                  loading={this.state.isLoadingTable04}
                  pagination={true}
                  bordered={true}
                  rowKey={(record) => record.id}
                  size="small"
                  rowSelection={{
                    type: "radio",
                    ...rowSelectionExamListWork,
                  }}
                >
                  <Table.Column title="検査ｺｰﾄﾞ" dataIndex="W2_inspect_cd" />
                  <Table.Column title="名称" dataIndex="exam_name" />
                </Table>
              </div>
            </Col>
          </Row>

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 500,
                    component: (
                      <WS0548001_ReservesPersonsBulkUpdate
                        onFinishScreen={(output) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              再集計
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  render() {
    return (
      <div className="reserves-display-item-setting">
        <Card title="予約表示項目設定">
          <Tabs
            type="card"
            defaultActiveKey={this.state.tabNum}
            onChange={(activeKey) => this.setState({ tabNum: activeKey })}
          >
            <Tabs.TabPane tab="コース" key={0}>
              {this.renderBodyTab(0)}
            </Tabs.TabPane>
            <Tabs.TabPane tab="検　査" key={1}>
              {this.renderBodyTab(1)}
            </Tabs.TabPane>
          </Tabs>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          destroyOnClose={true}
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
)(WS2702007_ReservesDisplayItemSetting);
