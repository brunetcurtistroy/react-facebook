import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Radio, Checkbox, Button, Space, Modal, message, DatePicker } from "antd";
import { batchSettingProcessDateNoCorreAction } from "redux/SystemMaintenance/NonConsultDateSetting/NonConsultDateSetting.actions";
import moment from "moment";

const styleDiv = {
  display: 'inline-block',
  marginRight: '20px',
  padding: '4px 12px',
  border: '1px solid #000000',
  color: '#000000'
}
const styleFormItem = {
  display: 'inline-block',
  marginRight: '20px',
}
class WS1494003_CollectSetting extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '一括設定';

    this.state = {
      SundayValid: true,
      MondayValid: true,
      TuesdayValid: true,
      WednesdayValid: true,
      ThursdayValid: true,
      FridayValid: true,
      SaturdayValid: true,

      isButton: true,

      initValue: {
        Sunday: 0,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
      }
    };
    this.onFinish = this.onFinish.bind(this);
  }

  onFinish(values) {
    if (values.SetPeriodCharFrom) {
      const params = {
        SetPeriodCharFrom: moment(values.SetPeriodCharFrom).format('YYYY/MM/DD') ?? '',
        SetPeriodCharTo: moment(values.SetPeriodCharTo).format('YYYY/MM/DD') ?? '',
        SundayValid: values.SundayValid ? 1 : 0,
        MondayValid: values.MondayValid ? 1 : 0,
        TuesdayValid: values.TuesdayValid ? 1 : 0,
        WednesdayValid: values.WednesdayValid ? 1 : 0,
        ThursdayValid: values.ThursdayValid ? 1 : 0,
        FridayValid: values.FridayValid ? 1 : 0,
        SaturdayValid: values.SaturdayValid ? 1 : 0,
      }
      batchSettingProcessDateNoCorreAction(params)
        .then(res => message.success('成功'))
        .catch(err => message.error('エラー'))
    } else {
      Modal.error({
        content: '日付を設定してください',
      });
    }
  }

  handleCheckbox = (e) => {
    let { checked, id } = e.target;
    let SetPeriodCharFrom = this.formRef.current.getFieldValue('SetPeriodCharFrom');
    let isSetPeriodCharFrom = SetPeriodCharFrom ? moment(SetPeriodCharFrom).format('YYYY/MM/DD') : false;
    if (isSetPeriodCharFrom) {
      this.setState({ [id]: !checked })
    } else {
      Modal.error({
        content: '日付を設定してください',
      });
    }
  }

  render() {
    return (
      <div className="collect-setting" style={{ width: 500 }}>
        <Card title="一括設定">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={this.state.initValue}>
            <h3 style={{ textAlign: 'center' }}>日付期間を設定してください</h3>
            <Form.Item label="期間">
              <Space>
                <Form.Item name="SetPeriodCharFrom" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD' onSelect={() => this.setState({isButton: false})}/>
                </Form.Item>
                <Form.Item>~</Form.Item>
                <Form.Item name="SetPeriodCharTo" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD' />
                </Form.Item>
              </Space>
            </Form.Item>

            <h3 style={{ textAlign: 'center' }}>変更する曜日にﾁｪｯｸをつけてください</h3>

            <div>
              <div style={{ ...styleDiv, borderColor: '#FF0000', color: '#FF0000' }}>日</div>
              <Form.Item name='SundayValid' valuePropName='checked' style={styleFormItem}>
                <Checkbox onChange={this.handleCheckbox} />
              </Form.Item>
              <Form.Item name="Sunday" style={styleFormItem}>
                <Radio.Group disabled={this.state.SundayValid}>
                  <Radio value={0}>平日</Radio>
                  <Radio value={1}>休診</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div>
              <div style={styleDiv}>月</div>
              <Form.Item name='MondayValid' valuePropName='checked' style={styleFormItem}>
                <Checkbox onChange={this.handleCheckbox} />
              </Form.Item>
              <Form.Item name="Monday" style={styleFormItem}>
                <Radio.Group disabled={this.state.MondayValid}>
                  <Radio value={0}>平日</Radio>
                  <Radio value={1}>休診</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div>
              <div style={styleDiv}>火</div>
              <Form.Item name='TuesdayValid' valuePropName='checked' style={styleFormItem}>
                <Checkbox onChange={this.handleCheckbox} />
              </Form.Item>
              <Form.Item name="Tuesday" style={styleFormItem}>
                <Radio.Group disabled={this.state.TuesdayValid}>
                  <Radio value={0}>平日</Radio>
                  <Radio value={1}>休診</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div>
              <div style={styleDiv}>水</div>
              <Form.Item name='WednesdayValid' valuePropName='checked' style={styleFormItem}>
                <Checkbox onChange={this.handleCheckbox} />
              </Form.Item>
              <Form.Item name="Wednesday" style={styleFormItem}>
                <Radio.Group disabled={this.state.WednesdayValid}>
                  <Radio value={0}>平日</Radio>
                  <Radio value={1}>休診</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div>
              <div style={styleDiv}>木</div>
              <Form.Item name='ThursdayValid' valuePropName='checked' style={styleFormItem}>
                <Checkbox onChange={this.handleCheckbox} />
              </Form.Item>
              <Form.Item name="Thursday" style={styleFormItem}>
                <Radio.Group disabled={this.state.ThursdayValid}>
                  <Radio value={0}>平日</Radio>
                  <Radio value={1}>休診</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div>
              <div style={styleDiv}>金</div>
              <Form.Item name='FridayValid' valuePropName='checked' style={styleFormItem}>
                <Checkbox onChange={this.handleCheckbox} />
              </Form.Item>
              <Form.Item name="Friday" style={styleFormItem}>
                <Radio.Group disabled={this.state.FridayValid}>
                  <Radio value={0}>平日</Radio>
                  <Radio value={1}>休診</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div>
              <div style={{ ...styleDiv, borderColor: '#0000FF', color: '#0000FF' }}>土</div>
              <Form.Item name='SaturdayValid' valuePropName='checked' style={styleFormItem}>
                <Checkbox onChange={this.handleCheckbox} />
              </Form.Item>
              <Form.Item name="Saturday" style={styleFormItem}>
                <Radio.Group disabled={this.state.SaturdayValid}>
                  <Radio value={0}>平日</Radio>
                  <Radio value={1}>休診</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <Form.Item style={{ float: 'right' }}>
              <Button disabled={this.state.isButton} htmlType='submit' type="primary">適用</Button>
            </Form.Item>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1494003_CollectSetting);
