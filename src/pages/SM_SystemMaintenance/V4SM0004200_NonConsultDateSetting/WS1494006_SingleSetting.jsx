import React from "react";
import { connect } from "react-redux";

import { Card, Form, Select, Button, Checkbox, Calendar, Space, Row, Col, message, Spin, } from "antd";

import { getDataVariousAggregateAction, tableRewriteAction } from "redux/SystemMaintenance/NonConsultDateSetting/NonConsultDateSetting.actions";
import moment from "moment";

class WS1494006_SingleSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '個別設定';

    this.state = {
      dataSource: [],
      initValues: {
        Month: moment().format('MM'),
        Year: moment().format('YYYY'),
      },
      isLoading: true
    };
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  componentDidMount = () => {
    this.getDataVariousAggregate(this.state.initValues);
  }

  getDataVariousAggregate = (params) => {
    this.setState({ isLoading: true });
    getDataVariousAggregateAction(params)
      .then(res => {
        if (res) {
          this.setState({
            dataSource: res.data,
          });
        }
      })
      .catch(err => console.log(err.response.data.message))
      .finally(() => this.setState({ isLoading: false }))
  }

  headerRender = ({ value, type, onChange, onTypeChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
      months[i] = months[i].replace('月', '');
    }

    for (let index = start; index < end; index++) {
      monthOptions.push(
        <Select.Option key={`${index}`}>
          {months[index]}
        </Select.Option>,
      );
    }
    const month = value.month();

    const year = value.year();
    const yearOptions = [];
    for (let i = year - 60; i < year + 60; i += 1) {
      yearOptions.push(
        <Select.Option key={i} value={i} >
          {i}
        </Select.Option>,
      );
    }
    return (
      <div style={{ padding: 8 }}>
        <Row>
          <Col span={10}>
            <Row gutter={8}>
              <Col>
                <Form.Item name="Year">
                  <Select style={{ width: '100px' }}
                    onChange={newYear => {
                      const year = value.clone().year(newYear);
                      onChange(year);
                    }}
                    value={String(year)}
                  >
                    {yearOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name="Month">
                  <Select style={{ width: '100px' }}
                    value={String(month)}
                    onChange={selectedMonth => {
                      const month = value.clone();
                      month.month(parseInt(selectedMonth, 10));
                      onChange(month);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Button type="primary" 
              onClick={() => {
                tableRewriteAction({ dataPost: this.state.dataSource })
                  .then(() => {
                    message.success('成功');
                    this.getDataVariousAggregate(this.state.initValues);
                  })
              }}
            >保存</Button>
          </Col>
          <Col span={10} >
            <Form.Item style={{ float: 'right' }}>
              <Space >
                <Button onClick={() => {
                  let month = this.state.initValues.Month;
                  let year = this.state.initValues.Year;
                  let date = year + "-" + month + "-01"
                  const _month = moment(date).subtract(1, 'months');
                  onChange(_month);
                }}>&lt; 前月</Button>

                <Button onClick={() => {
                  onChange(moment());
                }}>当月</Button>

                <Button onClick={() => {
                  let month = this.state.initValues.Month;
                  const _month = value.clone();
                  _month.month(parseInt(month, 10));
                  onChange(_month);
                }}>翌月 &gt;</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </div>
    );
  }

  dateCellRender = (date) => {
    let day = parseInt(moment(date).format('DD'));
    let dateInput = moment(date).format('YYYY-MM-DD');
    let indexChecked = this.state.dataSource.findIndex(item => item.kyusinkbn === 1 && item.date_on === dateInput);
    let indexDisabled = this.state.dataSource.findIndex(item => item.date_on === dateInput);
    return (
      <Checkbox
        disabled={indexDisabled === -1}
        checked={this.state.dataSource[indexChecked]?.kyusinkbn}
        onChange={(event) => this.setState(prevState => ({
          dataSource: prevState.dataSource.map(el =>
            el.day === day
              ? { ...el, kyusinkbn: event.target.checked ? 1 : 0 }
              : el
          )
        }))}
      />
    )
  }

  submitData = (_month) => {
    tableRewriteAction({ dataPost: this.state.dataSource });
    this.setState({
      initValues: {
        ...this.state.initValues,
        Year: moment(_month).format('YYYY'),
        Month: moment(_month).format('MM')
      }
    }, () => this.getDataVariousAggregate(this.state.initValues));
  }

  onPanelChange(value, mode) {
    let year = parseInt(moment(value).format('YYYY'));
    let month = parseInt(moment(value).format('MM'));
    this.formRef.current.setFieldsValue({
      Year: year,
      Month: month
    });
    this.setState({
      initValues: {
        ...this.state.initValues,
        Year: year,
        Month: month
      }
    }, () => this.getDataVariousAggregate(this.state.initValues));
  }

  onChangeCustom = (date) => {
    
  }

  render() {
    return (
      <div className="single-setting" style={{ width: 700 }}>
        <Card title="個別設定">
          <Form ref={this.formRef} initialValues={this.state.initValues}>
            <Spin spinning={this.state.isLoading}>
              <Calendar
                fullscreen={false}
                onPanelChange={this.onPanelChange}
                headerRender={this.headerRender}
                dateCellRender={this.dateCellRender}
                onChange={this.onChangeCustom}
              />
            </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1494006_SingleSetting);
