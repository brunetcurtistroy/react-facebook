/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Button, Form, message, Radio, Spin, Modal } from "antd";
import WS0061015_CheckYesNoNo from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo.jsx';
import PreviousCourseAcquisitionSubAction from 'redux/ReservationBusiness/PersonalReserveProcess/PreviousCourseAcquisitionSub.actions'
import WS0333001_SetIncludesQuery from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333001_SetIncludesQuery.jsx';
import GetImage from "constants/Images";
import ModalDraggable from "components/Commons/ModalDraggable";

class WS2542001_PreviousCourseAcquisitionSub extends React.Component {
  static propTypes = {
    Li_PersonalNum: PropTypes.any,
    Lio_CourseCode: PropTypes.any,
    Lio_ContractType: PropTypes.any,
    Lio_ContractOrgCode: PropTypes.any,
    Lio_ContractStartDate: PropTypes.any,
    Lio_ContractNum: PropTypes.any,
    Lo_Sts: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '前回コース取得SUB';

    this.state = {
      tableData: [],
      isLoadingTable: false,
      isLoaddingTabs: false,
      isLoaddingFrm: false,
      selectedRow: {},
      selectedRowKeys: [],
      data: {},
      tableTabs: [],
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount() {
    this.GetListData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.GetListData()
    }
  }

  GetListData() {
    this.setState({ isLoadingTable: true })
    let data = {
      PersonalNumId: this.isEmpty(this.props.Li_PersonalNum) ? "" : this.props.Li_PersonalNum,
      ConsultCourse: this.isEmpty(this.props.Lio_CourseCode) ? "" : this.props.Lio_CourseCode,
      ContractType: this.isEmpty(this.props.Lio_ContractType) ? "" : this.props.Lio_ContractType,
      ContractClassifyCode: this.isEmpty(this.props.Lio_ContractOrgCode) ? "" : this.props.Lio_ContractOrgCode,
      ContractDate: this.isEmpty(this.props.Lio_ContractStartDate) ? "" : this.props.Lio_ContractStartDate,
      ContractNum: this.isEmpty(this.props.Lio_ContractNum) ? "" : this.props.Lio_ContractNum
    }
    PreviousCourseAcquisitionSubAction.GetListData(data)
      .then(res => {
        this.forceUpdate()
        if (res) {
          this.formRef.current?.setFieldsValue({
            DataClassify: res?.data?.DataClassify
          })
          this.setState({
            tableData: res?.dataTable ? res.dataTable : [],
            selectedRow: res?.dataTable?.length > 0 ? res?.dataTable[0] : {},
            selectedRowKeys: res?.dataTable?.length > 0 ? [res.dataTable[0].id] : [],
            data: res?.data
          })
          this.ContractInspectContentSelect(res?.dataTable[0])
        } else {
          this.setState({
            tableData: [],
            selectedRow: {},
            data: {},
            tableTabs: [],
          })
        }
      })
      .catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  ContractInspectContentSelect(record) {
    this.setState({ isLoaddingTabs: true })
    let data = {
      reservation_number: this.isEmpty(record?.reservation_number) ? "" : record?.reservation_number,
      DataClassify: this.isEmpty(this.formRef.current?.getFieldValue("DataClassify")) ? "" : this.formRef.current?.getFieldValue("DataClassify"),
      visit_course: this.isEmpty(record?.visit_course) ? "" : record?.visit_course,
      contract_start_date_on: this.isEmpty(record?.contract_start_date_on) ? "" : record?.contract_start_date_on
    }
    PreviousCourseAcquisitionSubAction.ContractInspectContentSelect(data)
      .then(res => {
        this.setState({
          tableTabs: res ? res : [],
        })
      })
      .catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoaddingTabs: false }))
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  DbClick() {
    this.setState({ isLoaddingFrm: true })
    let data = {
      reservation_number: this.isEmpty(this.state.selectedRow?.reservation_number) ? "" : this.state.selectedRow.reservation_number,
      contract_organization_code: this.isEmpty(this.state.selectedRow?.contract_organization_code) ? "" : this.state.selectedRow.contract_organization_code,
      visit_course: this.isEmpty(this.state.selectedRow?.visit_course) ? "" : this.state.selectedRow.visit_course,
      contract_start_date_on: this.isEmpty(this.state.selectedRow?.contract_start_date_on) ? "" : this.state.selectedRow.contract_start_date_on,
      contract_number: this.isEmpty(this.state.selectedRow?.contract_number) ? "" : this.state.selectedRow.contract_number,
      contract_type: this.isEmpty(this.state.selectedRow?.contract_type) ? "" : this.state.selectedRow.contract_type
    }
    PreviousCourseAcquisitionSubAction.DbClick(data)
      .then(res => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lio_CourseCode: res?.data?.Lo_CourseCode,
            Lio_ContractType: res?.data?.Lo_ContractType,
            Lio_ContractOrgCode: res?.data?.Lo_ContractOrgCode,
            Lio_ContractStartDate: res?.data?.Lo_ContractStartDate,
            Lio_ContractNum: res?.data?.Lo_ContractNum,
            recordData: this.state.selectedRow,
            Lo_Sts: true,
          })
        }
      })
      .catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoaddingFrm: false }))
  }

  Submit() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component: (
          <WS0061015_CheckYesNoNo
            Li_Message={'このコース内容を取得しますか？'}
            onFinishScreen={(output) => {
              if (output?.Lio_StsReturn) {
                this.DbClick()
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  ShowWS0333001_SetIncludesQuery(record) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1000,
        component: (
          <WS0333001_SetIncludesQuery
            Li_StartDate={this.isEmpty(this.props.Lio_ContractStartDate) ? "" : this.props.Lio_ContractStartDate}
            Li_SetCode={record?.set_and_exam_code}
            Li_CourseCode={this.isEmpty(this.props.Lio_CourseCode) ? "" : this.props.Lio_CourseCode}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  render() {
    return (
      <div className="previous-course-acquisition-sub">
        <Card title="前回コース取得SUB">
          <Spin spinning={this.state.isLoaddingFrm} >
            <Form ref={this.formRef} autoComplete="off" >
              <Table
                dataSource={this.state.tableData}
                loading={this.state.isLoadingTable}
                pagination={false} size="small" bordered={true}
                rowKey={(record) => record.id} scroll={{ y: 500 }}
                className="mb-3"
                rowSelection={{
                  type: 'radio',
                  selectedRowKeys: this.state.selectedRowKeys,
                  onChange: async (selectedRowKeys, selectedRows) => {
                    this.ContractInspectContentSelect(selectedRows[0])
                    await this.setState({
                      selectedRow: selectedRows[0],
                      selectedRowKeys: selectedRowKeys
                    })
                  }
                }}
              >
                <Table.Column title="受診日" dataIndex="visit_date_on" width={90} />
                <Table.Column title="受付No" dataIndex="receipt_number" width={90}
                  render={(value, record, index) => {
                    return (
                      <div style={{ textAlign: 'right' }}>
                        <span>{record.receipt_number === 0 ? '' : record.receipt_number}</span>
                      </div>
                    )
                  }} />
                <Table.Column title="時間帯" dataIndex="period_time" align='center' width={70}
                  render={(value, record, index) => {
                    return <span>{value === '00:00:00' ? '' : value?.substr(0, 5)}</span>
                  }} />
                <Table.Column title="受診コース" dataIndex="contract_short_name" />
                <Table.Column title="判定" dataIndex="comprehensive_judgment" align='center' width={60} />
              </Table>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={2} style={{ paddingRight: "0" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_22}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_23}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_24}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_25}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_26}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_27}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_28}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_29}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_30}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_31}</Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col span={2} style={{ paddingRight: "0" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_12}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_13}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_14}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_15}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_16}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_17}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_18}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_19}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_20}</Button>
                </Col>
                <Col span={2} style={{ paddingRight: "0", paddingLeft: "2px" }}>
                  <Button style={{ float: "right", width: "100%" }}>&emsp;{this.state.data?.Expresstion_21}</Button>
                </Col>
              </Row>
              <Form.Item name="DataClassify">
                <Radio.Group defaultValue="40" onChange={() => this.ContractInspectContentSelect(this.state.selectedRow)} >
                  <Radio.Button value="40" style={{ width: '100px', textAlign: 'center' }} >ｵﾌﾟｼｮﾝ</Radio.Button>
                  <Radio.Button value="50" style={{ width: '100px', textAlign: 'center' }} >追加</Radio.Button>
                  <Radio.Button value="60" style={{ width: '100px', textAlign: 'center' }} >削除</Radio.Button>
                  <Radio.Button value="00" style={{ width: '100px', textAlign: 'center' }} >全件</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Table
                dataSource={this.state.tableTabs}
                loading={this.state.isLoaddingTabs}
                pagination={false} size="small" bordered={true}
                rowKey={(record) => record.id}
                scroll={{ y: 500 }}
                onRow={(record, rowIndex) => {
                  return {
                    onDoubleClick: event => this.ShowWS0333001_SetIncludesQuery(record),

                  };
                }}
              >
                <Table.Column title="" dataIndex="Expresstion_7" width={30}
                  render={(text, record, index) => {
                    return (
                      <div>
                        <span> {record.Expresstion_7 === 0 ? '' : <img src={GetImage(record.Expresstion_7)} />}</span>
                      </div>
                    )
                  }}
                />
                <Table.Column title="名称" dataIndex="set_name" />
                <Table.Column title="金額" dataIndex="Expresstion_8" width={90}
                  render={(text, record, index) => {
                    return (
                      <div>
                        <span> {record.Expresstion_8 === 0 ? null : record.Expresstion_8}</span>
                      </div>
                    )
                  }}
                />
              </Table>
              <Button type="primary" style={{ float: "right", marginTop: '1em' }} onClick={() => this.Submit()} >契約取得</Button>
            </Form>
          </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2542001_PreviousCourseAcquisitionSub);
