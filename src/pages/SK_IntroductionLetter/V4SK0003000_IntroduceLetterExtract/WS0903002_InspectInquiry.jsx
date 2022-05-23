import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Form,
  Input,
  Col,
  Row,
  DatePicker,
  Table,
  Divider,
  Button,
  message,
} from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import InspectInquiryService from "services/IntroductionLetter/IntroduceLetterExtract/InspectInquiryService";

class WS0903002_InspectInquiry extends React.Component {
  static propTypes = {
    LnkIndate: PropTypes.any,
    LnkIn_IdCode: PropTypes.any,
    LnkInvisitCourse: PropTypes.any,
    LnkInvisitsNum: PropTypes.any,
    LnkOtinspectCode: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "照会:検査照会";

    this.state = {
      isLoadingTable: false,
    };
  }

  componentDidMount = () => {
    this.setScreenValue();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props != prevProps) {
      this.setScreenValue();
    }
  };

  setScreenValue = () => {
    const { LnkIndate, LnkIn_IdCode, LnkInvisitCourse, LnkInvisitsNum } =
      this.props;
    this.getData(LnkIndate, LnkIn_IdCode, LnkInvisitCourse, LnkInvisitsNum);
  };

  getData = (LnkIndate, LnkIn_IdCode, LnkInvisitCourse, LnkInvisitsNum) => {
    this.setState({ isLoadingTable: true });
    InspectInquiryService.getDataService({
      visit_date_on:
        LnkIndate && moment(LnkIndate).isValid()
          ? moment(LnkIndate).format("YYYY/MM/DD")
          : "",
      personal_number_id: LnkIn_IdCode,
      accepted_no: LnkInvisitsNum,
      medical_exam_course: LnkInvisitCourse,
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          ...res.data,
          LnkIndate: moment(res.data?.LnkIndate).isValid()
            ? moment(res.data?.LnkIndate)
            : "",
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

  handleRowSelected = (selectedRows) => {
    if (this.props.onFinishScreen && selectedRows) {
      this.props.onFinishScreen({
        LnkOtinspectCode: selectedRows.exam_code,
      });
    }
  };

  render() {
    return (
      <div className="inspect-inquiry">
        <Card title="照会:検査照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            labelCol={{ span: 4 }}
            labelAlign="right"
          >
            <Row gutter={6}>
              <Col span={12}>
                <Form.Item name="LnkIndate" label="受診日">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef}
                    disabled
                    style={{ width: "100%" }}
                    format="YYYY/MM/DD"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="LnkInvisitsNum" label="受診番号">
                  <Input readOnly type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="コース" labelCol={{ span: 2 }}>
              <Row gutter={6}>
                <Col span={4}>
                  <Form.Item name="LnkInvisitCourse">
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Form.Item name="contract_short_name">
                    <Input readOnly maxLength={80} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="個人番号" labelCol={{ span: 2 }}>
              <Row gutter={6}>
                <Col span={8}>
                  <Form.Item name="LnkIn_IdCode">
                    <Input type="number" readOnly maxLength={10} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="kanji_name">
                    <Input readOnly maxLength={40} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name="Expresstion_3">
                    <Input readOnly maxLength={10} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Table
              size="small"
              rowKey={(record) => record.id}
              pagination={true}
              loading={this.state.isLoadingTable}
              bordered={true}
              dataSource={
                this.formRef.current
                  ? this.formRef.current.getFieldValue("List_table")
                  : []
              }
            >
              <Table.Column
                title="検査ｺｰﾄﾞ"
                dataIndex="exam_code"
                width={100}
                render={(text, record, index) => {
                  return text === "0" || text === 0 ? (
                    ""
                  ) : (
                    <div style={{ textAlign: "right" }}>{text}</div>
                  );
                }}
              />
              <Table.Column
                title="検　査　名　称"
                dataIndex="exam_name"
                render={(text, record, index) => {
                  return text === "0" || text === 0 ? "" : text;
                }}
              />
              <Table.Column
                align="center"
                dataIndex=""
                width={100}
                render={(text, record, index) => (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => this.handleRowSelected(record)}
                  >
                    選択
                  </Button>
                )}
              />
            </Table>

            <Divider />
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0903002_InspectInquiry);
