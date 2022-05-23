import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Row, Col, DatePicker, InputNumber } from "antd";
import FileNameInputUav02Action from "redux/ResultOutput/MedicalExamDataOutputCsv/FileNameInputUav02.action"
import moment from 'moment';

class WS0784004_FileNameInputUav02 extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ファイル名入力（UAV02）';

    this.state = {
      parramIndex: {
        Userdate: "",
        FileUav02: ""
      },
      formData: {
        UnionCode: "",
        MedicalExamInstitutionNum: "",
        SubmissionDate: "",
        ConsecutiveNum: ""
      }
    };

    this.setFormData = this.setFormData.bind(this)
  }
  componentDidMount() {
    this.state.parramIndex.Userdate = this.props.Userdate ?? moment(new Date()).format("YYYY/MM/DD")
    this.state.parramIndex.FileUav02 = this.props.FileUav02 ?? ""
    this.setFormData();
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.state.parramIndex.Userdate = this.props.Userdate ?? moment(new Date()).format("YYYY/MM/DD")
      this.state.parramIndex.FileUav02 = this.props.FileUav02 ?? ""
      this.setFormData();
    }
  }
  setFormData() {
    FileNameInputUav02Action.GetScreenData(this.state.parramIndex)
      .then((res) => {
        // res.SubmissionDate = this.isEmpty(res.SubmissionDate) ? null : moment(res.SubmissionDate)
        this.formRef.current?.setFieldsValue(this.state.formData = res)
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  updateDatasource(field, value) {
    this.state.formData[field] = value
  }
  render() {
    return (
      <div className="file-name-input-uav02">
        <Card title="ファイル名入力（UAV02）">
          <Form
            layout="vertical"
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={2} style={{ marginTop: '35px', textAlign: 'right' }}>
                <div>K</div>
              </Col>
              <Col span={3}>
                <Form.Item
                  name="UnionCode"
                  label="組合"
                >
                  <Input type="text" onChange={(event) => {
                    this.updateDatasource("UnionCode", event.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="MedicalExamInstitutionNum"
                  label="健診機関番号"
                >
                  <Input type="text" style={{ textAlign: 'right'}} onChange={(event) => {
                    this.updateDatasource("MedicalExamInstitutionNum", event.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="SubmissionDate"
                  label="提出年月日"
                >
                  <InputNumber type="text" onChange={(event) => {
                    this.updateDatasource("SubmissionDate", event.target.value)
                  }} />
                  {/* <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'YYYY/MM/DD'} style={{ width: '100%' }} onBlur={(event) => {
                    this.updateDatasource("SubmissionDate", event.target.value)
                  }} /> */}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  name="ConsecutiveNum"
                  label="連番"
                >
                  <Input type="text" style={{ textAlign: 'right'}} onChange={(event) => {
                    this.updateDatasource("ConsecutiveNum", event.target.value)
                  }} />
                </Form.Item>
              </Col>
              <Col span={2} style={{ marginTop: '35px' }}>
                <div>.CSV</div>
              </Col>
            </Row>
            <Form.Item
            >
              <Button type="primary" style={{ float: 'right' }}
                onClick={() => {
                  this.state.formData.SubmissionDate = moment(this.state.formData.SubmissionDate).format("YYYY/MM/DD")
                  const func = this.props.onSelect || this.props.onFinishScreen;
                  FileNameInputUav02Action.useaction1(this.state.formData)
                    .then((res) => {
                      func({
                        Lo_FileUav02: res.FileUav02,
                      });
                    })
                    .finally(() => this.setState({ isLoadingTable: false }))

                }}
              >確  定</Button>
            </Form.Item>

          </Form>
        </Card>
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0784004_FileNameInputUav02);
