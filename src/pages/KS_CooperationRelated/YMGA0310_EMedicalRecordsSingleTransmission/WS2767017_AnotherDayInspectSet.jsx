import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import AnotherDayInspectSetAction from "redux/CooperationRelated/EMedicalRecordsSingleTransmission/AnotherDayInspectSet.actions"
import { Form, Card, Table, Modal, Row, Col, Checkbox, Button, DatePicker, message } from "antd";
import PropTypes from "prop-types";
import WS2768001_EMedicalRecordsInspectAddSub from 'pages/KS_CooperationRelated/YMGA0310_EMedicalRecordsSingleTransmission/WS2768001_EMedicalRecordsInspectAddSub.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";


class WS2767017_AnotherDayInspectSet extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Lo_StsSend: PropTypes.any,
    onFinishScreen: PropTypes.func,
    Li_CourseLevel: PropTypes.any
  }

  constructor(props) {
    super(props);
    // document.title = '別日検査設定';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      tableLeft: { data: [] },
      tableRight: { data: [] },
      selectedRow: { visit_date_on: "2019/01/01", visit_course: "T-09" },
      checkeds: [],
      checkedAll: [],
      settingButton: true,
      submitButton: true,
      initParams: { ExamDateChar: '' },
      loadingTableLeft: false,
      loadingTableRight: false
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.GetDataList();
    }
  }
  componentDidMount() {

    if (this.props) {
      this.GetDataList();
    }
  }

  changeData(param) {
    this.setState({ loadingTableRight: true })
    let data = {
      id: param?.id,
      W1_enabled_disabled: param?.W1_enabled_disabled,
    }
    AnotherDayInspectSetAction.ChangeData(data).then(res => {
      this.GetInspectContent(this.state.tableLeft.data[0])
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ ...this.state }))
  }

  GetDataList(params) {
    this.setState({ loadingTableLeft: true })
    AnotherDayInspectSetAction.GetListData(params).then(res => {
      const data = res ? res : [];
      this.setState({ tableLeft: { data }, checkeds: data.map((item) => (item.W1_enabled_disabled)) });
      if (data?.length > 0) {
        this.GetInspectContent(data[0]);
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ ...this.state, tableLeft: { ...this.state.tableLeft }, loadingTableLeft: false }))
  }
  GetInspectContent(value) {
    this.setState({ loadingTableRight: true })
    let data = {
      W1_character_key: value?.W1_character_key ? value?.W1_character_key : "",
      ReserveNum: this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
    }
    AnotherDayInspectSetAction.InspectContent(data).then(res => {
      const data = res ? res : [];
      this.setState({ tableRight: { data }, checkedAll: data.map((item) => (item.W1_enabled_disabled)) });
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ tableRight: { ...this.state.tableRight }, loadingTableRight: false }))
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onChange(event) {
    let data = {
      W1_character_key: this.state?.tableLeft?.data[0]?.W1_character_key,
      W1_enabled_disabled: event,
    }
    AnotherDayInspectSetAction.Change(data).then(res => {
     
      this.GetDataList();
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ ...this.state }))
  }

  handleChange = (value, name) => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        [name]: value
      }
    })
  }
  onSettingBtn() {
    const params = {
      ExamDateChar: this.state?.initParams?.ExamDateChar,
      ReserveNum: this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
      W1_course_level: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel, 
    }
    AnotherDayInspectSetAction.SettingBtn(params).then(res => {
      let data = this.state.tableRight.data;
      this.GetInspectContent(data[0]);
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ ...this.state, settingButton: true, submitButton: false }))
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }
  render() {
    return (
      <div className="another-day-inspect-set">
        <Card title="別日検査設定">
          <Row gutter={16}>
            <Col span={8}>
              <Table dataSource={this.state.tableLeft.data}
                loading={this.state.loadingTableLeft}
                pagination={false} bordered={true}>
                <Table.Column title="別日群" dataIndex="W1_character_key" width='80%' />
                <Table.Column title="" dataIndex="W1_enabled_disabled" width='20%'
                  render={(value, record, index) => (
                    <Checkbox checked={this.state.checkeds[index]} onChange={(event) => {
                      let checkBoxs = this.state.checkeds
                      checkBoxs[index] = event.target.checked ? 1 : 0
                      this.setState({
                        ...this.state, checkeds: checkBoxs
                      });
                      this.onChange(checkBoxs[index])
                    }}></Checkbox>
                  )}
                />
              </Table>
            </Col>
            <Col span={16}>
              <Table dataSource={this.state.tableRight.data}
                loading={this.state.loadingTableRight}
                pagination={false} bordered={true} size="small"
                scroll={{ y: 600 }}
                onRow={(record, rowIndex) => {
                  return {
                    onDoubleClick: event => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component:
                            <WS2768001_EMedicalRecordsInspectAddSub
                              Li_ReserveNum={this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum}
                              Li_InspectCode={record?.W1_set_cd}
                              onFinishScreen={(output) => { 
                                this.closeModal()
                              }}
                            />
                          ,
                        },
                      });
                    }, // double click row
                  };
                }}
              >
                <Table.Column title="ｺｰﾄﾞ" key="id" dataIndex="W1_set_cd" width='20%' />
                <Table.Column title="検査名称"  dataIndex="official" width='50%' />
                <Table.Column title="検査日"  dataIndex="exam_scheduled_date_on" width='20%' />
                <Table.Column title="" dataIndex="W1_enabled_disabled"  width='20%'
                  render={(value, record, index) => (
                    <Checkbox checked={this.state.checkedAll[index]} onChange={(event) => {
                      let checkBoxs = this.state.checkedAll
                      checkBoxs[index] = event.target.checked ? 1 : 0
                      this.setState({ ...this.state, checkedAll: checkBoxs });
                      const params = {id: record?.id, W1_enabled_disabled:  checkBoxs[index] }
                      this.changeData(params)
                    }}></Checkbox>
                  )}
                />
              </Table>
            </Col>
          </Row>

          <Row>
            <Col offset={11} span="3">
              <Button>検査日</Button>
            </Col>
            <Col span="3">
              <Form >
                <VenusDatePickerCustom formRefDatePicker={this.formRef} onChange={(date, dateString) => {
                  this.setState({ ...this.state, initParams: { ExamDateChar: dateString }, settingButton: false });
                }} />
              </Form>

            </Col>
            <Col offset={1} span="3">
              <Button disabled={this.state.settingButton} onClick={() => {
                this.onSettingBtn()
              }} type="primary">設　定</Button>
            </Col>
            <Col span="3">
              <Button disabled={this.state.submitButton} onClick={
                () => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lo_StsSend: true
                    })
                  }
                }
              } type="primary">送信</Button>
            </Col>
          </Row>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2767017_AnotherDayInspectSet);
