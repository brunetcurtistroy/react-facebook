import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DataUpdateConfirmAction from "redux/InputBusiness/NotInputCheckCategory/DataUpdateConfirm.action";
import { Card, Form, Button, Row, Col, Modal } from "antd";

class WS2637019_DataUpdateConfirm extends React.Component {
  static propTypes = {
    Li_JudgeLevel: PropTypes.any,
    Lio_TotalJudge: PropTypes.any,
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_TotalJudgeChange: PropTypes.any,
    Li_LeadershipMattersChange: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ﾃﾞｰﾀ更新確認';

    this.state = {
      ReserveNum: 0
    };
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  checkData(value, type) {
    const val = type === 'number' ? 0 : ''
    return !this.isEmpty(value) ? value : val
  }

  onFinish = (values) => {
    Modal.confirm({
      content: '更新を終了しました',
      okText: 'は　い',
      okCancel: false,
      onOk: () => {
        const params = {
          Li_JungleLevel: this.props?.recordData?.Li_JungleLevel,
          CourseLevel: this.props?.recordData?.Li_CourseLevel,
          ReserveNum: this.props?.recordData?.Li_ReserveNum,
          OptionIn0002000: this.props?.recordData.OptionIn0002000,
          StsTotalJudgeChange: this.props?.recordData?.Li_TotalJudgeChange,
          StsNotesChange: this.props?.recordData?.Lio_NoteChange,
          OverallJudgeG: this.props?.recordData?.OverallJudgeG,
          StsLeadershipMattersChange: this.props?.recordData?.Li_LeadershipMattersChange
        }
        DataUpdateConfirmAction.DataUpdateConfirm(params).then((res) => {
          this.props.onFinishScreen({ Lio_TotalJudge: '', update: true })
        })
      },
    })
  }

  render() {
    const { onFinishScreen } = this.props;
    return (
      <div className="data-update-confirm">
        <Card title="ﾃﾞｰﾀ更新確認">
          

          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <p style={{ textAlign: "center" }}>入力データの更新を行いますか？
            </p>
            <Row gutter={24}>
              <Col span={12} style={{ textAlign: 'center' }}>
                <Form.Item
                >
                  <Button type="primary" htmlType="submit">更　新</Button>
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: 'center' }}>
                <Form.Item
                >
                  <Button type="primary" onClick={() => {
                    if (onFinishScreen) {
                      onFinishScreen({update: false});
                    }
                  }}>キャンセル</Button>
                </Form.Item>
              </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2637019_DataUpdateConfirm);
