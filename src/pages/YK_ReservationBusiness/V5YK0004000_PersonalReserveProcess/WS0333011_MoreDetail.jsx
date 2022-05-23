import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Row, Col } from "antd";
import MoreDetailAction from "redux/ReservationBusiness/PersonalReserveProcess/MoreDetail.action"

const styleLabel = {
  color: '#14468C',
  fontWeight: 'bold'
}

class WS0333011_MoreDetail extends React.Component {
  static propTypes = {
    Li_StartDate: PropTypes.string,
    Li_SetCode: PropTypes.string,
    Li_TextCondition: PropTypes.string,

    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '詳細';

    this.state = {
      dataSource: null
    };
  }
  componentDidMount() {
    let data = { Li_StartDate: this.props.Li_StartDate, Li_SetCode: this.props.Li_SetCode }
    MoreDetailAction.getMoreDetailAPIAction(data).then((res) => {
      if (res.length > 0) {
        this.setState({
          ...this.state.dataSource,
          dataSource: res[0]
        })
      }
    })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      let { Li_StartDate, Li_SetCode } = this.props;
      MoreDetailAction.getMoreDetailAPIAction({ Li_StartDate, Li_SetCode }).then((res) => {
        if (res.length > 0) {
          this.setState({
            ...this.state.dataSource,
            dataSource: res[0]
          })
        }
      })
    }
  }

  render() {
    const { dataSource } = this.state
    return (
      <div className="more-detail">
        <Card title="詳細">
          <span style={{ color: '#14468C', background: '#C8DCF5', padding: '1px 3px', fontWeight: 'bold' }}>
            {this.props.Li_TextCondition}
          </span>
          <div style={{ border: '1px solid #7ec1ff', padding: '1em', marginBottom: '1em' }}>
            <Row gutter={24}>
              <Col span={3}>
                <label style={styleLabel}>性別</label>
              </Col>
              <Col span={5} style={{ padding: 0 }}>
                <label>{dataSource?.Expression_5}</label>
              </Col>
              <Col span={3}>
                <label style={styleLabel}>時間</label>
              </Col>
              <Col span={5} style={{ padding: 0 }}>
                <label>{dataSource?.conditions_time_division}</label>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={3}>
                <label style={styleLabel}>続柄</label>
              </Col>
              <Col span={5} style={{ padding: 0 }}>
                <label>{dataSource?.Expression_6}</label>
              </Col>
              <Col span={3}>
                <label style={styleLabel}>ｎ次</label>
              </Col>
              <Col span={5} style={{ padding: 0 }}>
                <label>{dataSource?.Expression_8}</label>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={3}>
                <label style={styleLabel}>院内</label>
              </Col>
              <Col span={5} style={{ padding: 0 }}>
                <label>{dataSource?.Expression_7}</label>
              </Col>
              <Col span={3}>
                <label style={styleLabel}>年齢</label>
              </Col>
              <Col span={13} style={{ padding: 0 }}>
                <label>{dataSource?.Expression_10}</label>
              </Col>
            </Row>
          </div>
          <div style={{ border: '1px solid #7ec1ff', padding: '1em', }}>
            <Row gutter={24}>
              <Col span={3}>
                <label style={styleLabel}>ﾗﾍﾞﾙ</label>
              </Col>
              <Col span={5} style={{ padding: 0 }}>
                <label>{dataSource?.additional_label_number === 0 ? null : dataSource?.additional_label_number}</label>
              </Col>
              <Col span={3}>
                <label style={styleLabel}>単価</label>
              </Col>
              <Col span={5} style={{ padding: 0 }}>
                <label>{dataSource?.unit_price === 0 ? null : dataSource?.unit_price?.toLocaleString()}</label>
              </Col>
              <Col span={3}>
                <label style={styleLabel}>原価</label>
              </Col>
              <Col span={5} style={{ padding: 0 }}>
                <label>{dataSource?.cost_price === 0 ? null : dataSource?.cost_price?.toLocaleString()}</label>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={3}>
                <label style={styleLabel}>科目</label>
              </Col>
              <Col span={21} style={{ padding: 0 }}>
                <label>{dataSource?.Expression_9}</label>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={3}>
                <label style={styleLabel}>備考</label>
              </Col>
              <Col span={21} style={{ padding: 0 }}>
                <label>{dataSource?.remarks}</label>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0333011_MoreDetail);
