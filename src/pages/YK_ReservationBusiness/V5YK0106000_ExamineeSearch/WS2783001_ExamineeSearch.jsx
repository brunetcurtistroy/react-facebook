import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
/* eslint-disable no-useless-concat */
import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Row,
  Col,
  Modal,
  message,
  Space,
  Dropdown,
  Menu,
  InputNumber,
} from "antd";

import man from "assets/img/性別-男性.png";
import woman from "assets/img/性別-女性.png";

import {
  SearchOutlined,
  PlusCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import WS0248001_PersonalInfoSearchQuery from "pages/BS_BasicInfo/V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery.jsx";
import WS2587021_InspectChangeQuerySub from "pages/UK_CounterBusiness/V5UK0001000_Counter/WS2587021_InspectChangeQuerySub.jsx";
import WS2537001_PersonalReserveProcess from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess.jsx";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx";
import WS0605127_ContractLineItemDisplay from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay.jsx";
import WS2786001_ConditionAddSub from "pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS2786001_ConditionAddSub";
import moment from "moment";
import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery";
import ExamineeSearchService from "services/ReservationBusiness/ExamineeSearch/ExamineeSearchService";
import Color from "constants/Color";
import WS2583001_ConsultInquirySub from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2583001_ConsultInquirySub";
import { download_file } from "helpers/CommonHelpers";
import WS0802001_PrintInstruction from "pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0802001_PrintInstruction";
import ResizableColumn from "components/Commons/ResizableColumn";

class WS2783001_ExamineeSearch extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "受診者検索";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: null,
      },
      isLoading: false,
      selectedRows: {},
      colorConditionAddBtn: 163,
      screenData: {
        KeyInfo: "",
        DataSourceName: "",
      },

      Li_Change: "",
      columns: [
        {
          title: "状態",
          dataIndex: "Expression_18",
          width: 50,
          align: "center",
          render: (text) => (
            <span
              style={{
                color:
                  text === "受付" ? "red" : text === "予約" ? "blue" : "black",
              }}
            >
              {text}
            </span>
          ),
        },
        {
          title: "受診日",
          dataIndex: "visit_date_on",
          width: 90,
          render: (text) => (
            <>{text ? moment(text).format("YYYY/MM/DD") : ""}</>
          ),
          showSorterTooltip: false,
          sorter: (a, b) => this.sortDate(a.visit_date_on, b.visit_date_on),
        },
        {
          title: "時間帯",
          dataIndex: "period_time",
          width: 100,
          align: "center",
          render: (text) => (
            <>{text ? moment(text, "HH:mm").format("HH:mm") : ""}</>
          ),
          showSorterTooltip: false,
          sorter: (a, b) => a.period_time.localeCompare(b.period_time, "ja"),
        },
        {
          title: "個人番号",
          dataIndex: "personal_number_id",
          width: 100,
          render: (text) => (
            <div style={{ textAlign: "right" }}>
              {text === "0" || text === 0 ? "" : text}
            </div>
          ),
          showSorterTooltip: false,
          sorter: (a, b) => a.personal_number_id - b.personal_number_id,
        },
        {
          title: "メモ",
          dataIndex: "Expression_37",
          width: 50,
          align: "center",
          render: (text, record) => {
            let icon = "";
            switch (text) {
              case 1:
                icon = <InfoCircleOutlined style={{ color: "#1890ff" }} />;
                break;
              case 3:
                icon = <WarningOutlined style={{ color: "#faad14" }} />;
                break;
              case 5:
                icon = <CloseCircleOutlined style={{ color: "#ff4d4f" }} />;
                break;
              default:
                icon = <MoreOutlined />;
            }
            return (
              <Button
                icon={icon}
                size="small"
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 1500,
                      component: (
                        <Card
                          title={
                            "個人情報照会SUB" +
                            " " +
                            `[${record?.personal_number_id}]`
                          }
                        >
                          <WS2584019_PersonalInfoInquirySub
                            Li_PersonalNum={record.personal_number_id}
                            onFinishScreen={(output) => {
                              if (output.flg === 1) {
                                this.onClickSearch();
                              }
                            }}
                          />
                        </Card>
                      ),
                    },
                  });
                }}
              ></Button>
            );
          },
        },
        {
          title: "氏名",
          dataIndex: "PersonalName",
          width: 120,
          showSorterTooltip: false,
          sorter: (a, b) => a.PersonalName.localeCompare(b.PersonalName, "ja"),
        },
        {
          title: "性別",
          dataIndex: "Gender",
          width: 80,
          align: "center",
          render: (text) => (
            <span
              style={{
                color:
                  text === "女性" ? "red" : text === "男性" ? "blue" : "black",
              }}
            >
              {text}
            </span>
          ),
          showSorterTooltip: false,
          sorter: (a, b) => a.Gender.localeCompare(b.Gender, "ja"),
        },
        {
          title: "生年月日",
          dataIndex: "DateBirth",
          width: 100,
          align: "center",
          render: (text) => <>{text ? moment(text).format("NNy/MM/DD") : ""}</>,
          showSorterTooltip: false,
          sorter: (a, b) => this.sortDate(a.DateBirth, b.DateBirth),
        },
        {
          title: "年齢",
          dataIndex: "Age",
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{text}</div>,
          showSorterTooltip: false,
          sorter: (a, b) => a.Age - b.Age,
        },
        {
          title: "受付No",
          dataIndex: "receipt_number",
          width: 100,
          render: (text) => (
            <div style={{ textAlign: "right" }}>
              {text === "0" || text === 0 ? "" : text}
            </div>
          ),
          showSorterTooltip: false,
          sorter: (a, b) => a.receipt_number - b.receipt_number,
        },
        {
          title: "契約情報",
          dataIndex: "visit_course",
          width: 220,
          render: (text, record) => (
            <span>{text + " " + record.contract_short_name}</span>
          ),
          showSorterTooltip: false,
          sorter: (a, b) => a.visit_course.localeCompare(b.visit_course, "ja"),
        },
        {
          title: "事業所情報",
          dataIndex: "office_kanji_name",
          width: 120,
          // showSorterTooltip: false,
          // sorter: (a, b) => a.office_kanji_name.localeCompare(b.office_kanji_name, 'ja'),
        },
        {
          title: "保険者",
          dataIndex: "insurer_total_price",
          width: 100,
          render: (text) => (
            <div style={{ textAlign: "right" }}>
              {text === "0" || text === 0 ? "" : text?.toLocaleString()}
            </div>
          ),
          showSorterTooltip: false,
          sorter: (a, b) => a.insurer_total_price - b.insurer_total_price,
        },
        {
          title: "事業所",
          dataIndex: "office_total_price",
          width: 100,
          render: (text) => (
            <div style={{ textAlign: "right" }}>
              {text === "0" || text === 0 ? "" : text?.toLocaleString()}
            </div>
          ),
          // showSorterTooltip: false,
          // sorter: (a, b) => (a.office_total_price - b.office_total_price),
        },
        {
          title: "他団体",
          dataIndex: "organization_total_price",
          width: 100,
          render: (text) => (
            <div style={{ textAlign: "right" }}>
              {text === "0" || text === 0 ? "" : text?.toLocaleString()}
            </div>
          ),
          showSorterTooltip: false,
          sorter: (a, b) =>
            a.organization_total_price - b.organization_total_price,
        },
        {
          title: "個人",
          dataIndex: "Expression_35",
          width: 70,
          render: (text) => (
            <div style={{ textAlign: "right" }}>
              {text === "0" || text === 0 ? "" : text?.toLocaleString()}
            </div>
          ),
          showSorterTooltip: false,
          sorter: (a, b) => a.Expression_35 - b.Expression_35,
        },
        {
          title: "請求額",
          dataIndex: "Expression_36",
          width: 80,
          render: (text) => (
            <div style={{ textAlign: "right" }}>
              {text === "0" || text === 0 ? "" : text?.toLocaleString()}
            </div>
          ),
          showSorterTooltip: false,
          sorter: (a, b) => a.Expression_36 - b.Expression_36,
        },
        {
          title: "備考",
          dataIndex: "remarks",
          width: 80,
          showSorterTooltip: false,
          sorter: (a, b) => a.remarks.localeCompare(b.remarks, "ja"),
        },
        {
          title: "検査状況",
          dataIndex: "InspectStatus",
          width: 120,
          showSorterTooltip: false,
          sorter: (a, b) =>
            a.InspectStatus.localeCompare(b.InspectStatus, "ja"),
        },
        {
          key: "action",
          width: 50,
          fixed: 'right',
          render: (text, record) => this.renderRightMenu(record),
        },
      ],
    };
  }

  componentDidMount = () => {
    this.getScreenData();
    this.formRef.current.setFieldsValue({
      DateFChar: "",
      DateTChar: "",
    });
    this.forceUpdate();
  };

  getScreenData = () => {
    ExamineeSearchService.getScreenDataService()
      .then((res) => {
        this.setState({ screenData: res.data }, () => {});
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  displayExamineeSearch = () => {
    const {
      DateFChar,
      DateTChar,
      PersonalNum,
      OfficeCode,
      BranchStoreCode,
      Search,
    } = this.formRef.current.getFieldsValue(true);
    this.setState({ isLoading: true, selectedRows: {}, selectedRowKeys: [] });

    ExamineeSearchService.displayExamineeSearchService({
      DateFChar: DateFChar ? moment(DateFChar).format("YYYY/MM/DD") : "",
      DateTChar: DateTChar ? moment(DateTChar).format("YYYY/MM/DD") : "",
      PersonalNum: PersonalNum,
      OfficeCode: OfficeCode,
      BranchStoreCode: BranchStoreCode,
      Search: Search,
      KeyInfo: this.state.screenData.KeyInfo,
      DataSourceName: this.state.screenData.DataSourceName,
    })
      .then((res) => {
        this.onClickSearch();
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  onClickSearch = () => {
    this.setState({ isLoading: true, selectedRows: {}, selectedRowKeys: [] });
    ExamineeSearchService.getExamineeSearchService()
      .then((res) => {
        this.formRef.current.setFieldsValue({
          ...res.data,
          DisplayList: res.data,
        });
        this.forceUpdate();
        if (res.data[0])
          this.setState({
            selectedRows: res.data[0],
            selectedRowKeys: [res.data[0].id],
          });
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  ExcelDownload = (date) => {
    ExamineeSearchService.excelExamineeSearchService({
      date: moment(date).format("YYYY/MM/DD"),
    })
      .then((res) => {
        download_file(res);
        message.success("成功");
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

  deleteExamineeSearch = (record) => {
    ExamineeSearchService.deleteExamineeSearchService({
      id: record.id,
      W1_course_level: record.W1_course_level,
      W1_reserve_num: record.W1_reserve_num,
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
        this.displayExamineeSearch();
      });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRows: selectedRows[0],
      selectedRowKeys: selectedRowKeys,
    });
  };
  // closeModal = () => {
  //   this.setState({
  //     childModal: {
  //       ...this.state.childModal,
  //       visible: false,
  //       component: null,
  //     }
  //   })
  // }

  renderRightMenu = (record) => (
    <Dropdown.Button
      icon={<MoreOutlined />}
      size="small"
      overlay={() => (
        <Menu>
          <Menu.Item
            key="1"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "90%",
                  component: (
                    <WS2583001_ConsultInquirySub
                      Li_ReserveNum={record.reservation_number}
                      onFinishScreen={({}) => {
                        this.closeModal();
                      }}
                    />
                  ),
                },
              });
            }}
          >
            <label>照合</label>
          </Menu.Item>
          <Menu.Item
            key="2"
            hidden={record.state_flag === 1}
            onClick={() => {
              Modal.confirm({
                title: "確認",
                icon: <QuestionCircleOutlined style={{ color: "#1890ff" }} />,
                content: "予約を削除しますか？",
                okText: "削除",
                cancelText: "いいえ",
                okText: "はい",
                onOk: () => {
                  this.deleteExamineeSearch(record);
                },
              });
            }}
          >
            <label>取消</label>
          </Menu.Item>
          <Menu.Item
            key="3"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "90%",
                  className: "custom-button-close",
                  component: (
                    <WS2537001_PersonalReserveProcess
                      Li_ReserveNum={record.W1_reserve_num}
                      Li_Child={true}
                      onFinishScreen={(output) => {
                        if (output.Lo_Update) {
                          this.setState({ Li_Change: Math.random() });
                        }
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: false,
                            className: "",
                          },
                        });
                      }}
                    />
                  ),
                },
              });
            }}
          >
            <label>変更</label>
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "90%",
                  component: (
                    <WS2583001_ConsultInquirySub
                      Li_ReserveNum={record.W1_reserve_num}
                      onFinishScreen={({}) => {
                        this.closeModal();
                      }}
                    />
                  ),
                },
              });
            }}
          >
            <label>予約関連</label>
          </Menu.Item>
          <Menu.Item
            key="5"
            hidden={record.state_flag === 0}
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: "40%",
                  component: (
                    <WS0802001_PrintInstruction
                      Li_CourseLevel={record.W1_course_level}
                      Li_ReserveNum={record.W1_reserve_num}
                      onFinishScreen={({}) => {
                        this.closeModal();
                      }}
                    />
                  ),
                },
              });
            }}
          >
            <label>結果印刷</label>
          </Menu.Item>
          <Menu.Item
            key="6"
            onClick={() => {
              this.ExcelDownload(
                this.state.selectedRowRecordReserveStatusDisplay?.date
              );
            }}
          >
            <label>EXCEL</label>
          </Menu.Item>
        </Menu>
      )}
    ></Dropdown.Button>
  );

  components = {
    header: {
      cell: ResizableColumn,
    },
  };

  handleResize =
    (index) =>
    (e, { size }) => {
      this.setState(({ columns }) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return { columns: nextColumns };
      });
    };

  sortDate = (a, b) => {
    let dateA = new Date(a);
    let dateB = new Date(b);
    return isFinite(dateA - dateB) ? dateA - dateB : isFinite(dateA) ? 1 : -1;
  };

  render() {
    const { selectedRowKeys, selectedRows } = this.state;
    const rowSelection = {
      selectedRowKeys,
      selectedRows,
      onChange: this.onSelectChange,
    };
    const tableColums = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <div className="examinee-search">
        <Card title="受診者検索">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "90%",
                    className: "custom-button-close",
                    component: (
                      <WS2537001_PersonalReserveProcess
                        Li_Child={true}
                        onFinishScreen={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: false,
                              className: "",
                            },
                          });
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              予約
            </Button>
            <Button
              disabled={!this.state.selectedRows?.reservation_number}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: "90%",
                    className: "custom-button-close",
                    component: (
                      <WS2537001_PersonalReserveProcess
                        Li_ReserveNum={
                          this.state.selectedRows?.reservation_number
                        }
                        Li_Child={true}
                        onFinishScreen={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: false,
                              className: "",
                            },
                          });
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              変更
            </Button>
          </Space>
          <hr style={{ margin: "15px 0" }} />
          <Form ref={this.formRef} onFinish={this.onFinish} size="small">
            <Row gutter={16} className="mb-3">
              <Col span={8}>
                <Row span={16}>
                  <Col span={11}>
                    <Form.Item name="DateFChar" label="日付">
                      <VenusDatePickerCustom
                        formRefDatePicker={this.formRef}
                        format="YYYY/MM/DD"
                        style={{ width: "100%" }}
                        allowClear={true}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ textAlign: "center" }}>
                    <span>~</span>
                  </Col>
                  <Col span={11}>
                    <Form.Item name="DateTChar">
                      <VenusDatePickerCustom
                        format="YYYY/MM/DD"
                        style={{ width: "100%" }}
                        allowClear={true}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row span={16}>
                  <Col span={12}>
                    <Form.Item name="PersonalNum" label="個人">
                      <Input.Search
                        className='floatRight'
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1500,
                              component: (
                                <WS0248001_PersonalInfoSearchQuery
                                  onFinishScreen={({ Lo_PersonalNumId }) => {
                                    this.formRef.current.setFieldsValue({
                                      PersonalNum: Lo_PersonalNumId,
                                    });
                                    this.forceUpdate();
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
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="OfficeCode" label="事業所">
                      <Input.Search
                        type="text"
                        className='floatRight'
                        onChange={(event) => {
                          this.formRef.current.setFieldsValue({
                            BranchStoreCode: 0,
                          });
                          this.forceUpdate();
                        }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1500,
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  onFinishScreen={({
                                    Lio_OfficeCode,
                                    Lio_BranchStoreCode,
                                  }) => {
                                    this.formRef.current.setFieldsValue({
                                      OfficeCode: Lio_OfficeCode,
                                      BranchStoreCode: Lio_BranchStoreCode,
                                    });
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
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row span={16}>
                  <Col span={24}>
                    <Form.Item name="Search" label="検索">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={6}></Col>
                </Row>
                <Row span={16} className="mb-3">
                  <Col span={24}>
                    <Button
                      icon={<SearchOutlined />}
                      style={{ float: "right", color: Color(163).Foreground }}
                      onClick={() => this.displayExamineeSearch()}
                      loading={this.state.isLoading}
                    >
                      検　　索
                    </Button>
                    <Button
                      icon={<PlusCircleOutlined />}
                      style={{
                        float: "right",
                        marginRight: "10px",
                        color: "#1166BB",
                      }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 800,
                            component: (
                              <WS2786001_ConditionAddSub
                                Li_DateF={
                                  this.formRef.current?.getFieldValue(
                                    "DateFChar"
                                  )
                                    ? moment(
                                        this.formRef.current.getFieldValue(
                                          "DateFChar"
                                        )
                                      ).format("YYYY-MM-DD")
                                    : ""
                                }
                                Li_DateT={
                                  this.formRef.current?.getFieldValue(
                                    "DateTChar"
                                  )
                                    ? moment(
                                        this.formRef.current?.getFieldValue(
                                          "DateTChar"
                                        )
                                      ).format("YYYY-MM-DD")
                                    : ""
                                }
                                Li_Office={this.formRef.current?.getFieldValue(
                                  "OfficeCode"
                                )}
                                Li_BranchShop={this.formRef.current?.getFieldValue(
                                  "BranchStoreCode"
                                )}
                                Li_PersonalNum={this.formRef.current?.getFieldValue(
                                  "PersonalNum"
                                )}
                                Lio_KeyInfo={this.formRef.current?.getFieldValue(
                                  "KeyInfo"
                                )}
                                onFinishScreen={({
                                  Lio_KeyInfo,
                                  Expression_36,
                                }) => {
                                  if (Lio_KeyInfo && Expression_36) {
                                    this.formRef.current.setFieldsValue({
                                      KeyInfo: Lio_KeyInfo,
                                    });
                                    this.forceUpdate();
                                    this.setState({
                                      colorConditionAddBtn: Expression_36,
                                    });
                                  }
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
                      <span
                        style={{
                          color: Color(this.state.colorConditionAddBtn)
                            .Foreground,
                        }}
                      >
                        条件追加
                      </span>
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={8}></Col>
              <Col span={8}></Col>
            </Row>
            <Row gutter={16} className="mb-3">
              <Col span={18}>
                <Table
                  rowKey={(record) => record.id}
                  dataSource={
                    this.formRef.current
                      ? this.formRef.current.getFieldValue("DisplayList")
                      : []
                  }
                  // rowSelection={{
                  //   type: "radio",
                  //   ...rowSelection,
                  // }}
                  rowClassName={(record, index) =>
                    record.id === this.state.selectedRows.id
                      ? "hightlight-row-selected"
                      : ""
                  }
                  onRow={(record, index) => ({
                    onClick: (event) => this.setState({ selectedRows: record }),
                  })}
                  size="small"
                  loading={this.state.isLoading}
                  scroll={{ x: 1100 }}
                  bordered
                  columns={tableColums}
                  components={this.components}
                >
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>状態</div>}
                    align="center"
                    width={50}
                    dataIndex="Expression_18"
                    key=""
                    render={(text) => (
                      <span
                        style={{
                          color:
                            text === "受付"
                              ? "red"
                              : text === "予約"
                              ? "blue"
                              : "black",
                        }}
                      >
                        {text}
                      </span>
                    )}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>受診日</div>}
                    width={80}
                    dataIndex="visit_date_on"
                    render={(text) => (
                      <>{text ? moment(text).format("YYYY/MM/DD") : ""}</>
                    )}
                    key=""
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>時間帯</div>}
                    align="center"
                    width={70}
                    dataIndex="period_time"
                    key=""
                    render={(text) => (
                      <>{text ? moment(text, "HH:mm").format("HH:mm") : ""}</>
                    )}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>個人番号</div>}
                    width={70}
                    align="right"
                    dataIndex="personal_number_id"
                    key=""
                    render={(text, record, index) => {
                      return text === "0" || text === 0 ? "" : text;
                    }}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>メモ</div>}
                    width={50}
                    align="center"
                    dataIndex="Expression_37"
                    key=""
                    render={(text, record) => {
                      let icon = "";
                      switch (text) {
                        case 1:
                          icon = (
                            <InfoCircleOutlined
                              style={{
                                color: "#1890ff",
                              }}
                            />
                          );
                          break;
                        case 3:
                          icon = (
                            <WarningOutlined style={{ color: "#faad14" }} />
                          );
                          break;
                        case 5:
                          icon = (
                            <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                          );
                          break;
                        default:
                          icon = <MoreOutlined />;
                      }
                      return (
                        <Button
                          icon={icon}
                          size="small"
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (
                                  <Card
                                    title={
                                      "個人情報照会SUB" +
                                      " " +
                                      `[${record?.personal_number_id}]`
                                    }
                                  >
                                    <WS2584019_PersonalInfoInquirySub
                                      Li_PersonalNum={record.personal_number_id}
                                    />
                                  </Card>
                                ),
                              },
                            });
                          }}
                        ></Button>
                      );
                    }}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>氏名</div>}
                    width={100}
                    align="left"
                    dataIndex="PersonalName"
                    key=""
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>性別</div>}
                    width={50}
                    align="center"
                    dataIndex="Gender"
                    key=""
                    render={(text) => (
                      <span
                        style={{
                          color:
                            text === "女性"
                              ? "red"
                              : text === "男性"
                              ? "blue"
                              : "black",
                        }}
                      >
                        {text}
                      </span>
                    )}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>生年月日</div>}
                    align="center"
                    width={80}
                    dataIndex="DateBirth"
                    render={(text) => (
                      <>{text ? moment(text).format("NNy/MM/DD") : ""}</>
                    )}
                    key=""
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>年齢</div>}
                    width={50}
                    align="right"
                    dataIndex="Age"
                    key=""
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>受付No</div>}
                    width={80}
                    align="right"
                    dataIndex="receipt_number"
                    key=""
                    render={(text, record, index) => {
                      return text === "0" || text === 0 ? "" : text;
                    }}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>契約情報</div>}
                    width={200}
                    align="left"
                    dataIndex="visit_course"
                    key=""
                    render={(text, record) => (
                      <span>{text + " " + record.contract_short_name}</span>
                    )}
                  />
                  <Table.Column
                    title={
                      <div style={{ textAlign: "center" }}>事業所情報</div>
                    }
                    width={100}
                    align="left"
                    dataIndex="office_kanji_name"
                    key=""
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>保険者</div>}
                    width={70}
                    align="right"
                    dataIndex="insurer_total_price"
                    key=""
                    render={(text, record, index) => {
                      return text === "0" || text === 0 ? "" : text;
                    }}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>事業所</div>}
                    width={70}
                    align="right"
                    dataIndex="office_total_price"
                    key=""
                    render={(text, record, index) => {
                      return text === "0" || text === 0 ? "" : text;
                    }}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>他団体</div>}
                    width={70}
                    align="right"
                    dataIndex="organization_total_price"
                    key=""
                    render={(text, record, index) => {
                      return text === "0" || text === 0 ? "" : text;
                    }}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>個人</div>}
                    width={70}
                    align="right"
                    dataIndex="Expression_35"
                    key=""
                    render={(text, record, index) => {
                      return text === "0" || text === 0 ? "" : text;
                    }}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>請求額</div>}
                    width={70}
                    align="right"
                    dataIndex="Expression_36"
                    key=""
                    render={(text, record, index) => {
                      return text === "0" || text === 0 ? "" : text;
                    }}
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>備考</div>}
                    width={50}
                    align="left"
                    dataIndex="remarks"
                    key=""
                  />
                  <Table.Column
                    title={<div style={{ textAlign: "center" }}>検査状況</div>}
                    width={100}
                    align="left"
                    dataIndex="InspectStatus"
                    key=""
                  />
                  <Table.Column
                    key="action"
                    fixed="right"
                    width={50}
                    render={(text, record, index) =>
                      this.renderRightMenu(record)
                    }
                  />
                </Table>
              </Col>
              <Col span={6}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="個人情報">
                      <InputNumber value={this.state.selectedRows?.Expression_3} readOnly bordered={false} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Button
                      style={{ float: "left" }}
                      disabled={
                        this.state.selectedRows.personal_number_id
                          ? false
                          : true
                      }
                      onClick={() => {
                        let title =
                          "個人情報照会SUB" +
                          " [" +
                          this.state.selectedRows?.personal_number_id +
                          "]";
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1600,
                            component: (
                              <Card title={title}>
                                <WS2584019_PersonalInfoInquirySub
                                  Li_PersonalNum={
                                    this.state.selectedRows?.personal_number_id
                                  }
                                />
                              </Card>
                            ),
                          },
                        });
                      }}
                    >
                      :
                    </Button>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="氏名" labelCol={{ span: 2 }}>
                      <div>{this.state.selectedRows?.Expression_20}</div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label=" " labelCol={{ span: 2 }}>
                      <div>{this.state.selectedRows?.Expression_21}</div>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16} className="mb-3">
                  <Col span={12}>
                    <Form.Item label="生年月日">
                      <span>
                        {this.state.selectedRows.Expression_22
                          ? moment(
                              this.state.selectedRows.Expression_22
                            ).format("NNy/MM/DD") +
                            " " +
                            this.state.selectedRows.Expression_23 +
                            "歳"
                          : ""}
                      </span>
                    </Form.Item>
                  </Col>

                  <Col span={12} style={{ position: "relative" }}>
                    <img
                      src={
                        this.state.selectedRows?.Gender === "男性" ? man : woman
                      }
                      alt="sex"
                      style={{ position: "absolute", bottom: "0", right: "0" }}
                    />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="事業所">
                      <span>{this.state.selectedRows?.Expression_45}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="保険者">
                      <span>{this.state.selectedRows?.insurer_kanji_name}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="保険証">
                      <span>{this.state.selectedRows?.Expression_52}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} className="mb-3">
                  <Col span={24}>
                    <Form.Item label="続　柄">
                      <span>{this.state.selectedRows?.name}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="受診日">
                      <span>
                        {this.state.selectedRows.Expression_46
                          ? moment(this.state.selectedRows.Expression_4).format(
                              "YYYY/MM/DD"
                            )
                          : "" + " " + this.state.selectedRows.Expression_47
                          ? this.state.selectedRows.Expression_47
                          : ""}
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      style={{
                        float: "right",
                        border: "solid 1px #ABADB3",
                        minWidth: "40px",
                      }}
                    >
                      <span
                        style={{
                          padding: "3px 6px",
                          color: `${
                            this.state.selectedRows.Expression_18 === "受付"
                              ? "red"
                              : this.state.selectedRows.Expression_18 === "予約"
                              ? "blue"
                              : "black"
                          }`,
                        }}
                      >
                        {this.state.selectedRows?.Expression_18}
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="時間帯">
                      <span>
                        {this.state.selectedRows.Expression_48
                          ? moment(
                              this.state.selectedRows.Expression_48,
                              "HH:mm"
                            ).format("HH:mm")
                          : ""}
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="施　設">
                      <span>{this.state.selectedRows?.Expression_53}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="コース">
                      <span>{this.state.selectedRows?.Expression_49}</span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Button
                        style={{ float: "left" }}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 1600,
                              component: (
                                <WS0605127_ContractLineItemDisplay
                                  Li_ContractType={
                                    this.state.selectedRows?.contract_type
                                  }
                                  Li_ContractOrgCode={
                                    this.state.selectedRows
                                      ?.contract_organization_code
                                  }
                                  Li_ContractStartDate={
                                    this.state.selectedRows
                                      ?.contract_start_date_on
                                  }
                                  Li_ContractNum={
                                    this.state.selectedRows?.contract_number
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
                        :
                      </Button>
                      <span>{this.state.selectedRows?.Expression_50}</span>
                    </Space>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="備　考">
                      <span>{this.state.selectedRows?.Expression_51}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <WS2587021_InspectChangeQuerySub
                      Li_ReserveNum={
                        this.state.selectedRows?.reservation_number
                      }
                      Li_Course={this.state.selectedRows?.visit_course}
                      Li_ContractStartDate={
                        this.state.selectedRows?.contract_start_date_on
                      }
                      Li_Change={this.state.Li_Change}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Button
                  type="primary"
                  style={{ float: "right" }}
                  onClick={() => {
                    console.log(this.state);
                    if (!this.state.selectedRows.reservation_number) return;
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: "90%",
                        className: "custom-button-close",
                        component: (
                          <WS2537001_PersonalReserveProcess
                            Li_ReserveNum={
                              this.state.selectedRows?.reservation_number
                            }
                            Li_Child={true}
                            onFinishScreen={(output) => {
                              if (output.Lo_Update) {
                                this.setState({ Li_Change: Math.random() });
                              }
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                  className: "",
                                },
                                Lo_Update: Math.random(),
                              });
                            }}
                          />
                        ),
                      },
                    });
                  }}
                >
                  変更
                </Button>
                <Button
                  type="primary"
                  disabled={this.state.selectedRows.state_flag === 1}
                  style={{ float: "right", marginRight: "10px" }}
                  onClick={() => {
                    if (!this.state.selectedRows.id) return;
                    if (this.state.selectedRows.state_flag === 1) return;
                    Modal.confirm({
                      title: "確認",
                      icon: (
                        <QuestionCircleOutlined style={{ color: "#1890ff" }} />
                      ),
                      content: "予約を削除しますか？",
                      okText: "削除",
                      cancelText: "いいえ",
                      okText: "はい",
                      onOk: () => {
                        this.deleteExamineeSearch(this.state.selectedRows);
                      },
                    });
                  }}
                >
                  取消
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          className={this.state.childModal.className}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0, backgroundColor: "#1890ff" }}
          maskClosable={false}
          destroyOnClose={true}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
                component: null,
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
)(WS2783001_ExamineeSearch);
