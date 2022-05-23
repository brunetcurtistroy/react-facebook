import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Select, DatePicker, Button, Space } from "antd";
import moment from "moment";
import PropTypes from "prop-types";

import { getVariousNamesListAction } from "redux/basicInfo/PersonalInfoMaintain/PersonalInfoMaintain.action";

export class WS0343006_Extension extends Component {
  static propTypes = {
    Li_OfficeCode: PropTypes.any,
    Li_BranchStoreCode: PropTypes.any,
    Lio_Employment: PropTypes.any,
    Lio_Job: PropTypes.any,
    Lio_InsuranceStartDate: PropTypes.any,
    Lio_InsuranceEndDate: PropTypes.any,
    Lio_BeneficiariesNum: PropTypes.any,
    onClickSelectButton: PropTypes.func, // trả về 1 object có đám Lo_ và Lio_
    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = "拡張";
    this.state = {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      Lio_EmploymentList: [],
      Lio_JobList: []
    };
  }

  componentDidMount = () => {
    const { 
      Lio_Employment,
      Lio_Job,
      Lio_InsuranceStartDate,
      Lio_InsuranceEndDate,
      Lio_BeneficiariesNum
    } = this.props;

    const dataInit = {
      Lio_Employment,
      Lio_Job,
      Lio_InsuranceStartDate,
      Lio_InsuranceEndDate,
      Lio_BeneficiariesNum
    }

    this.setDataField(dataInit);

    getVariousNamesListAction()
      .then((res) => {
        if(res){
          this.setState({
            Lio_EmploymentList: res.Lio_Employment,
            Lio_JobList: res.Lio_Job
          });
        }
      })
  };

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (prevProps !== this.props) {
      const { 
        Lio_Employment,
        Lio_Job,
        Lio_InsuranceStartDate,
        Lio_InsuranceEndDate,
        Lio_BeneficiariesNum
      } = this.props;
  
      const dataInit = {
        Lio_Employment,
        Lio_Job,
        Lio_InsuranceStartDate,
        Lio_InsuranceEndDate,
        Lio_BeneficiariesNum
      }
  
      this.setDataField(dataInit);
    }
  }

  setDataField = (data) => {
    const formInstance = this.formRef.current;
    formInstance.setFieldsValue({
      ...data,
      InsuranceStartDateChar: moment(data.Lio_InsuranceStartDate).isValid() ? moment(data.Lio_InsuranceStartDate) : '',
      InsuranceEndDateChar: moment(data.Lio_InsuranceEndDate).isValid() ? moment(data.Lio_InsuranceEndDate) : '',
    });
  };

  onFinish = (values) => {
    let objectForSubmit = {
      employment_status: values.Lio_Employment,
      occupations: values.Lio_Job,
      recipient_number: values.Lio_BeneficiariesNum,
      insurer_start_date_on: moment(values.InsuranceStartDateChar).format("YYYY/MM/DD"),
      insurer_end_date_on: moment(values.InsuranceEndDateChar).format("YYYY/MM/DD"),
      id: this.props.id,
    };
    let func = this.props.onClickSelectButton || this.props.onFinishScreen;
    if (func) {
      func({
        Lio_Employment: values.Lio_Employment,
        Lio_Job: values.Lio_Job,
        Lio_InsuranceStartDate: values.InsuranceStartDateChar,
        Lio_InsuranceEndDate: values.InsuranceEndDateChar,
        Lio_BeneficiariesNum: values.Lio_BeneficiariesNum,
      })
    }

    if (this.props.getValueChild) this.props.getValueChild(objectForSubmit, 'WS0343006')
  };

  render() {
    const { layout, Lio_EmploymentList, Lio_JobList } = this.state;
    const { Option } = Select;
    return (
      <div className="extension" >
        <Card title="拡張">
          <Form {...layout} ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="Lio_Employment" label="雇用形態">
              <Select style={{ width: "200px" }} allowClear>
                <Option value=""></Option>
                {Lio_EmploymentList?.map((item, index) => <Option key={index + item.LinkedField} value={item.LinkedField}>{item.DisplayField}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item name="Lio_Job" label="職　種">
              <Select style={{ width: "200px" }} allowClear>
                <Option value=""></Option>
                {Lio_JobList?.map((item, index) => <Option key={index + item.LinkedField} value={item.LinkedField}>{item.DisplayField}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item name="Lio_BeneficiariesNum" label="受給者番号">
              <Input style={{ width: "200px" }} />
            </Form.Item>

            <Form.Item label="適用日" style={{margin: 0}}>
              <Space>
              <Form.Item name="InsuranceStartDateChar">
                <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
              </Form.Item>
              <Form.Item>~</Form.Item>
              <Form.Item name="InsuranceEndDateChar">
                <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
              </Form.Item>
              </Space>
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              style={{ float: "right" }}
              onClick={this.onClickSelectButton}
            >
              適用
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0343006_Extension);
