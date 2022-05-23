import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Button, Row, Col, message } from "antd";
import DataUpdateConfirmAction from "redux/InputBusiness/NotInputCheckCategory/DataUpdateConfirm.action";
import NotInputCheckCategorytAction from "redux/InputBusiness/NotInputCheckCategory/NotInputCheckCategory.action";

class WS0739012_DataUpdateConfirm extends React.Component {
  static propTypes = {
    Li_Division: PropTypes.number,
    Li_CourseLevel: PropTypes.number,
    Li_ReserveNum: PropTypes.number,
    Lio_TotalJudge: PropTypes.any,
    Li_Parameters: PropTypes.any,
    Lo_Change: PropTypes.any,
    Lo_GuideMatters: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'ﾃﾞｰﾀ更新確認';

    this.state = {
    };
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  updateYes() {
    let params = {
      Li_Division: this.isEmpty(this.props.Li_Division) ? '' : this.props.Li_Division,
      Li_CourseLevel: this.isEmpty(this.props.Li_CourseLevel) ? '' : this.props.Li_CourseLevel,
      Li_ReserveNum: this.isEmpty(this.props.Li_ReserveNum) ? '' : this.props.Li_ReserveNum,
      Li_TotalJudge: this.isEmpty(this.props.Lio_TotalJudge) ? '' : this.props.Lio_TotalJudge,
      Lo_GuideMatters: this.isEmpty(this.props.Lo_GuideMatters) ? '' : this.props.Lo_GuideMatters,
    }

    DataUpdateConfirmAction.updateYes(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({
            Lo_Change: false,
            Lo_GuideMatters: false,
            Lo_Update: true
          })
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
  }

  render() {
    return (
      <div className="data-update-confirm">
        <Card title="ﾃﾞｰﾀ更新確認">
          <p style={{ textAlign: "center" }}>入力データの更新を行いますか？</p>
          <Row gutter={24}>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Button type="primary"
                onClick={() => {
                  this.updateYes()
                }}
              >更　新</Button>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Button type="primary"
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({ Lo_Update: false })
                  }
                }}
              >ｷｬﾝｾﾙ</Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0739012_DataUpdateConfirm);
