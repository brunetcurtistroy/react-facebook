import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import ReserveStatusSearchAction from "redux/ReservationBusiness/ReserveStatusSearch/ReserveStatusSearch.action";

import { Card, Form, Row, Col, List } from "antd";
const styleText = {
  marginRight: "1em",
  color: "blue",
};
class WS2553003_PeriodTimeInquiry extends React.Component {
  static propTypes = {
    Li_WhenList: PropTypes.any,
    Lio_TimeZone: PropTypes.any,
    Li_TimeZoneList: PropTypes.any,
    Lio_Date : PropTypes.any,
    Li_FacilityType: PropTypes.number,
    Li_CourseCode: PropTypes.string,
    Li_ProcessDivision: PropTypes.number,
    Lio_TimeZone: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "時間帯照会";

    this.state = {
      styleType: true,
      rowSelectHours: "",
      rowSelectMinute: "",
      hours: "00",
      minutes: "00",
      //data test
      dataHours: [],
      dataMinute: [],
    };
  }
  componentDidMount = () => {
    ReserveStatusSearchAction.getPeriodTimeInquiryAPIAction().then((res) => {
      if (res) {
        this.setState({ dataHours: res }, () => this.forceUpdate());
      }
    });
  };

  onFinish(values) {}

  render() {
    const { styleType, rowSelectHours, rowSelectMinute } = this.state;
    return (
      <div className="period-time-inquiry">
        <Card title='時間帯照会'>
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={16}>
              <Col span={8} style={{ paddingRight: "0" }}>
                <div> {/* style={{ height: "calc(100% - 1rem)", overflowY: "auto" }} */}
                  <List
                    size="small"
                    bordered
                    dataSource={this.state.dataHours}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            rowSelectHours === item && styleType === true
                              ? "#a3d3ff"
                              : "",
                        }}
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            styleType: true,
                            rowSelectHours: item,
                            hours: item.time,
                          });
                        }}
                        onDoubleClick={() => {
                          if (this.props.onFinishScreen) {
                            this.props.onFinishScreen({Lio_TimeZone:  this.state.hours + ":" + this.state.minutes});
                          }
                        }}
                      >
                        <label>{item.time}</label>
                      </List.Item>
                    )}
                  />
                </div>
              </Col>
              <Col span={1} style={styleText}>
                {" "}
                時{" "}
              </Col>
              <Col span={8} style={{ paddingRight: "0" }}>
                <div>
                  <List
                    size="small"
                    bordered
                    dataSource={this.state.rowSelectHours.minutes}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            rowSelectMinute === item && styleType === true
                              ? "#a3d3ff"
                              : "",
                        }}
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            styleType: true,
                            rowSelectMinute: item,
                            minutes: item,
                          });
                        }}
                        onDoubleClick={() => {
                          if (this.props.onFinishScreen)
                            this.props.onFinishScreen({
                              Lio_TimeZone:
                                this.state.hours + ":" + this.state.minutes,
                            });
                        }}
                      >
                        <label>{item}</label>
                      </List.Item>
                    )}
                  />
                </div>
              </Col>
              <Col span={1} style={styleText}>
                {" "}
                分{" "}
              </Col>
            </Row>
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
)(WS2553003_PeriodTimeInquiry);
