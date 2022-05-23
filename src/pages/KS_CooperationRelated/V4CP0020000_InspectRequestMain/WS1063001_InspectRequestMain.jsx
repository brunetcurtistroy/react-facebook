import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Card,
  Form,
  Input,
  message,
  Radio,
  Button,
  Checkbox,
  Table,
  Modal,
  Spin,
  Row,
  Col,
  DatePicker,
} from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx";
import InspectItemMasterAction from "redux/CooperationRelated/InspectRequestMain/InspectRequestMain.action";
const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class WS1063001_InspectRequestMain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    // // document.title = '検査依頼メイン';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRowTableFirst: [],
      isLoadingForm: true,
      isLoadingTable: false,
      dataSource: [], // targetList
      pagination: {
        defaultPageSize: 10,
        size: "small",
        showQuickJumper: true,
      },
      ReserveDateChar: "",
      KanaName: "",
      _1ObjectDataClassify: "受付",
      ExtractDivision: 0,
      StsForceInitialTransmission: 0,
      Indent: "",
      Text: "",
      rowSelect: {},
      listID: [],
      StsSelectOne: false,
      W1_urgent_specimen_flg: false,
    };
  }
  componentDidMount() {
    this.getScreenData();
  }
  getScreenData() {
    this.setState({ isLoadingForm: true });
    InspectItemMasterAction.screenData()
      .then((res) => {
        let data = res ? res : [];

        this.setState({
          ReserveDateChar: this.isEmpty(
            this.formRef.current?.getFieldValue("ReserveDateChar")
          )
            ? ""
            : this.formRef.current
                ?.getFieldValue("ReserveDateChar")
                .format("YYYY-MM-DD"),
          _1ObjectDataClassify: data._1ObjectDataClassify,
          KanaName: data.KanaName,
          ExtractDivision: data.ExtractDivision,
          StsForceInitialTransmission: data.StsForceInitialTransmission,
          Indent: data.Indent,
        });
      })
      .finally(() => this.setState({ isLoadingForm: false }));
  }
  displayBtn() {
    const data = {
      ReserveDateChar: this.formRef.current
        ?.getFieldValue("ReserveDateChar")
        .format("YYYY-MM-DD"),
      ExtractDivision: this.formRef.current?.getFieldValue("ExtractDivision"),
      _1ObjectDataClassify: this.formRef.current?.getFieldValue(
        "_1ObjectDataClassify"
      ),
      Indent: this.state.Indent,
    };
    InspectItemMasterAction.displayBtn(data)
      .then((res) => {
        this.getTargetList();
        this.setState({ rowSelect: {} });
      })
      .catch((error) => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
      });
  }

  getTargetList() {
    this.setState({ isLoadingTable: true });
    InspectItemMasterAction.targetList()
      .then((res) => {
        if (res) {
          this.formRef.current.setFieldsValue({ tableData: res });
          let arrID = [];
          if (res.length > 0) {
            res.forEach((element) => {
              if (element.StsSelectAll) arrID.push(element.id);
            });
          }
          this.setState({
            dataSource: res,
            listID: arrID,
          });
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(err.response.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false }));
  }

  onFinish(values) {}
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  // handleSelectRowsTableFirst = (selectedRowTableFirst) => {
  //   this.setState({ selectedRowTableFirst });
  // };
  isEmpty(val) {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  }
  f12_Before() {
    const data = {
      Li_MenuOption: this.props.Li_MenuOption ? this.props.Li_MenuOption : "",
    };
    InspectItemMasterAction.run_F12_Before(data).then((res) => {
      if (res.StsConfirm === 1) {
        this.f12_After(res.StsConfirm);
      }
    });
  }
  f12_After(stsConfirm) {
    const data = {
      StsConfirm: stsConfirm,
      StsForceInitialTransmission: this.formRef.current?.getFieldValue(
        "StsForceInitialTransmission"
      )
        ? 1
        : 0,
    };
    console.log(data);
     InspectItemMasterAction.run_F12_After(data).then((res) => {
       if(res){
          Modal.warning({
            okText: 'OK',
            content: res.message || "エラーが発生しました",
            onOk: () => {
              this.getTargetList()
            }
          })
       }
     });
  }
  ChangeCheck(index, e) {
    // let data = [...this.state.dataSource]
    // data[index].W1_enabled_disabled = e.target.checked
    // this.setState({
    //   dataSource: data,
    // })
    const data = {
      id: index,
      W1_urgent_specimen_flg: e.target.checked === false ? 0 : 1,
    };
    InspectItemMasterAction.selectOne_W1_urgent_specimen_flg(data).then(
      (res) => {
        this.getTargetList();
      }
    );
  }
  eventSelectRecord = (params) => {
    this.setState({ StsSelectOne: true });
    InspectItemMasterAction.selectOne(params).then((res) => {
      this.getTargetList();
    });
  };

  eventSelectAllRecord = (params) => {
    this.setState({ StsSelectOne: true });
    InspectItemMasterAction.selectAll(params).then((res) => {
      this.getTargetList();
    });
  };

  render() {
    const { rowSelect } = this.state;
    const format = "YYYY/MM/DD";

    return (
      <div className="inspect-request-main">
        <Row gutter={16}>
          <Col span={8}>
            <Card style={{ height: "calc(100% - 1rem)" }}>
              <Spin spinning={this.state.isLoadingForm}>
                <Form
                  {...grid}
                  ref={this.formRef}
                  onFinish={this.onFinish}
                  initialValues={{
                    ReserveDateChar: moment(),
                    _1ObjectDataClassify: this.state._1ObjectDataClassify,
                    KanaName: this.state.KanaName,
                    ExtractDivision: this.state.ExtractDivision,
                    StsForceInitialTransmission:
                      this.state.StsForceInitialTransmission,
                  }}
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item name="ReserveDateChar" label="予約日">
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format={format} allowClear={false} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item name="_1ObjectDataClassify" label="状　態">
                        <Radio.Group name="_1ObjectDataClassify">
                          <Radio value="全て">全て</Radio>
                          <Radio value="予約">予約</Radio>
                          <Radio value="受付">受付</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item name="ExtractDivision" label="院内外">
                        <Radio.Group>
                          <Radio value={0}>全て</Radio>
                          <Radio value={1}>院内</Radio>
                          <Radio value={2}>院外</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item name="KanaName" label="カ　ナ">
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} className="mb-3">
                    <Col span={24}>
                      <Button
                        onClick={() => this.displayBtn()}
                        type="primary"
                        style={{ float: "right" }}
                      >
                        <SearchOutlined />検 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;索
                      </Button>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="StsForceInitialTransmission"
                        valuePropName="checked"
                      >
                        <Checkbox>強制初回</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Button
                        onClick={() => this.f12_Before()}
                        type="primary"
                        style={{ float: "right" }}
                      >
                        作成
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Spin>
            </Card>
          </Col>
          <Col span={16}>
            <Card style={{ height: "calc(100% - 1rem)" }}>
              <Table
                bordered={true}
                loading={this.state.isLoadingTable}
                pagination={this.state.pagination}
                dataSource={this.state.dataSource}
                rowKey={(record) => record.id}
                size="small"
                rowSelection={{
                  selectedRowKeys: this.state.listID,
                  onChange: (selectedRowKeys, selectedRows) =>
                    this.setState({ listID: selectedRowKeys }),
                  onSelect: (record, selected) =>
                    this.eventSelectRecord({
                      id: record.id,
                      StsSelectOne: selected ? 1 : 0,
                    }),
                  onSelectAll: (selected) =>
                    this.eventSelectAllRecord({
                      StsSelectAll: selected ? 1 : 0,
                    }),
                }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      this.setState({ rowSelect: record });
                    },
                  };
                }}
              >
                <Table.Column
                  title="至急"
                  dataIndex="W1_urgent_specimen_flg"
                  render={(value, record, index) => {
                    return (
                      <Form.Item
                        style={{ textAlign: "center" }}
                        //  name={["tableData", index, "W1_urgent_specimen_flg"]}
                        valuePropName="checked"
                      >
                        <Checkbox
                          checked={record.W1_urgent_specimen_flg}
                          onChange={(e) => this.ChangeCheck(record.id, e)}
                        ></Checkbox>
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  title="依頼No"
                  dataIndex="W1_request_num"
                  render={(value) => <div>{value === 0 ? "" : value}</div>}
                />
                <Table.Column
                  title="個人番号"
                  dataIndex="W1_person_id"
                  render={(value) => (
                    <div style={{ textAlign: "right" }}>{value}</div>
                  )}
                />
                <Table.Column
                  title="メモ"
                  render={(value, record) => {
                    return (
                      <Button
                        icon={<MoreOutlined />}
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: "100%",
                              component: (
                                <Card title={"個人情報照会SUB"}>
                                  <WS2584019_PersonalInfoInquirySub
                                    Li_PersonalNum={record.W1_person_id}
                                    onFinishScreen={(output) => {
                                      this.closeModal();
                                    }}
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
                <Table.Column title="氏　　名" dataIndex="kanji_name" />
                <Table.Column
                  title="性別"
                  dataIndex="Expresstion_11"
                  render={(res) => {
                    if (res === "女性") {
                      return <div style={{ color: "red" }}>{res}</div>;
                    } else {
                      return <div style={{ color: "blue" }}>{res}</div>;
                    }
                  }}
                />
                <Table.Column
                  title="契約情報"
                  render={(value, record, index) => (
                    <Form.Item>
                      <span>{record.W1_chkup_course}</span>{" "}
                      <span>{record.contract_short_name}</span>
                    </Form.Item>
                  )}
                />
                <Table.Column title="依頼" dataIndex="Expresstion_15"
                  render={(value, record, index) => (
                    <Form.Item style={{textAlign: "center"}}>
                      <span >{record.Expresstion_15}</span>
                    </Form.Item>
                  )}
                />
                <Table.Column title="院外" dataIndex="Expresstion_16" />
              </Table>
            </Card>
          </Col>
        </Row>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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
)(WS1063001_InspectRequestMain);
