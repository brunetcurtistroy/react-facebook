import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Table, Form, Button, message } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import VerificationService from "services/ReservationBusiness/FrameReserve/Verification";

class WS2535011_Verification extends React.Component {
  static propTypes = {
    onScreenFinish: PropTypes.func,

    Li_Years: PropTypes.any,
    Li_FacilityType: PropTypes.any,
    Li_TimeDivision: PropTypes.any,
    Li_ReserveDisplayItems: PropTypes.any,
    Li_SkyReal: PropTypes.any,
    Li_StsAlreadySet: PropTypes.any,

    Lo_StsConfirm: PropTypes.any,
  };
  constructor(props) {
    super(props);

    // document.title = "確認";

    this.state = {
      isActive: true,
    };
  }

  handleCheck(event) {
    this.setState({ isActive: !event.target.checked });
  }

  componentDidMount = () => {
    const {
      Li_Years,
      Li_FacilityType,
      Li_TimeDivision,
      Li_ReserveDisplayItems,
      Li_SkyReal,
      Li_StsAlreadySet,
      Wakuto,
    } = this.props;

    this.setState(
      {
        Li_Years,
        Li_FacilityType,
        Li_TimeDivision,
        Li_ReserveDisplayItems,
        Li_SkyReal,
        Li_StsAlreadySet,
        Wakuto: Wakuto.map((item) => {
          return {
            ...item,
            year: Li_Years.format("YYYY"),
            month: Li_Years.format("MM"),
            date: item.time,
          };
        }),
      },
      () => console.log(this.state)
    );
  };
  onVerification = () => {
    let arrayDataSubmit = this.state.Wakuto.map((item) => {
      return { date_on: item.date, person: item.person };
    });
    VerificationService.updateVerification({
      items: arrayDataSubmit,
      Li_FacilityType: this.state.Li_FacilityType,
      Li_TimeDivision: this.state.Li_TimeDivision,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (this.props.onScreenFinish) {
            this.props.onScreenFinish({
              Lo_StsConfirm: !this.state.isActive,
            });
          }
        }
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  render() {
    return (
      <div className="verification">
        <Card title="確認">
          <Table
            dataSource={this.state.Wakuto}
            rowKey={(record) => record.Expression_22}
          >
            <Table.Column title="年" dataIndex="year" />
            <Table.Column title="月" dataIndex="month" />
            <Table.Column
              title="日"
              dataIndex="Expression_22"
              render={(text, record, index) => (
                <span
                  style={{
                    color:
                      record.Expression_10 === "日"
                        ? "red"
                        : record.Expression_10 === "土"
                        ? "blue"
                        : "black",
                  }}
                >
                  {text}
                </span>
              )}
            />
            <Table.Column title="曜" dataIndex="Expression_10" />
            <Table.Column
              title="休"
              dataIndex="Expression_11"
              render={(text, record, index) => (
                <span
                  style={{
                    color: record.Expression_11 === "休" ? "red" : null,
                  }}
                >
                  {text}
                </span>
              )}
            />
            <Table.Column title="合計人数" dataIndex="Expression_12" />
            <Table.Column
              title={
                this.state.Li_SkyReal
                  ? this.state.Li_SkyReal === 1
                    ? "実人数"
                    : "空人数"
                  : "空人数"
              }
              dataIndex=""
              key=""
            />
            <Table.Column title="予約人数" dataIndex="person" key="" />
            <Table.Column title="メモ" dataIndex="title" key="" />
          </Table>

          <Form.Item style={{ float: "right" }}>
            <Checkbox onChange={(event) => this.handleCheck(event)}>
              上記の内容を確認しました
            </Checkbox>
            <Button
              type="primary"
              disabled={this.state.isActive}
              onClick={() => this.onVerification()}
            >
              確認
            </Button>
          </Form.Item>
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
)(WS2535011_Verification);
