import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, InputNumber, Button, message } from "antd";
import RecurrenceNumberAction from "redux/ResultOutput/PrintParamMaintain/RecurrenceNumber.action"
class WS0855023_RecurrenceNumber extends React.Component {
  static propTypes = {
    Li_Style: PropTypes.string,
    Lo_StsRecurrenceNum: PropTypes.any,

    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '再発番';

    this.state = {
      form_data: {
        StartNum: "",
        JumpNum: "",
        Li_Style: "",
        Lo_StsRecurrenceNum: "",
        FinalNum: ""
      }
    };
  }
  componentDidMount() {
    this.getScreenData(true)
  }
  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.getScreenData(true);
    }
  }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    RecurrenceNumberAction.getScreenData()
      .then((res) => {
        this.formRef.current?.setFieldsValue(this.state.form_data = res)
      })
      .finally()
  }
  runF12() {
    this.state.form_data.Li_Style = this.props.Li_Style
    RecurrenceNumberAction.F12(this.state.form_data)
      .then((res) => {
        message.success('更新しました!')
        const func = this.props.onSelect || this.props.onFinishScreen;
        func({
          Lo_StsRecurrenceNum: res.data.Lo_StsRecurrenceNum,
        });
      })
      .finally()
  }
  updateDatasource(field, value) {
    let form = {...this.state.form_data}
    form[field] = value
    this.setState({
      form_data : form
    })
  }

  render() {
    return (
      <div className="recurrence-number">
        <Card title="再発番">
          <Form
            ref={this.formRef}
            onFinish={this.getScreenData}
          >
            <Form.Item name="StartNum" label="開始番号" style={{ width: 160 }} >
              <InputNumber maxLength={6} onChange={(e) => {
                this.updateDatasource("StartNum", e === 0 ? null : e)
              }} />
            </Form.Item>
            <Form.Item name="JumpNum" label="&emsp;&emsp;増分" style={{ width: 125}} >
              <InputNumber maxLength={3} onChange={(e) => {
                this.updateDatasource("JumpNum", e === 0 ? null : e)
              }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => { this.runF12() }} style={{ float: 'right' }}>実行</Button>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0855023_RecurrenceNumber);
