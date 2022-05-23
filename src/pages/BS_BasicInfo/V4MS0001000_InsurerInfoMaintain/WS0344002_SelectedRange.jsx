import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Form, Input, message } from "antd";
import { selectedRangeAction, saveSelectRangeAction } from "redux/basicInfo/InsurerInfoMaintain/SelectedRange.actions";
import moment from "moment-timezone";

class WS0344002_SelectedRange extends React.Component {
  static propTypes = {
    Li_ScreenId: PropTypes.any,
    Li_ScreenName: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '選択範囲';

    this.state = {
      E1ExcomboBoxSelect: '',
      E1ExcomboBoxDisplay: ''
    };
  }

  componentDidMount = () => {
    this.loadInitData({
      item_id: this.props.Li_ScreenId,
      item: this.props.Li_ScreenName
    })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.loadInitData({
        item_id: this.props.Li_ScreenId,
        item: this.props.Li_ScreenName
      })
    }
  }

  loadInitData = (params) => {
    selectedRangeAction(params)
      .then(res => {
        if (res?.data) {
          this.setState({
            E1ExcomboBoxSelect: res.data.E1ExcomboBoxSelect,
            E1ExcomboBoxDisplay: res.data.E1ExcomboBoxDisplay
          })
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  saveData = () => {
    let params = {
      item_id: this.props.Li_ScreenId,
      item: this.props.Li_ScreenName,
      E1ExcomboBoxSelect: this.state.E1ExcomboBoxSelect,
      E1ExcomboBoxDisplay: this.state.E1ExcomboBoxDisplay
    }
    saveSelectRangeAction(params)
      .then(() => {
        if(this.props.onFinishScreen) this.props.onFinishScreen()
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  handleChangeValue = (value, name) => {
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  componentWillUnmount = () => {
    this.saveData();
  }

  render() {
    const { E1ExcomboBoxSelect, E1ExcomboBoxDisplay } = this.state;
    return (
      <div className="selected-range">
        <Card title="選択範囲">
          <Form >
            <Form.Item label="選択内容" >
              <Input value={E1ExcomboBoxSelect} onChange={(e) => this.handleChangeValue(e.target.value, 'E1ExcomboBoxSelect')}/>
            </Form.Item>
            <Form.Item label="選択表示" >
              <Input value={E1ExcomboBoxDisplay} onChange={(e) => this.handleChangeValue(e.target.value, 'E1ExcomboBoxDisplay')}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0344002_SelectedRange);
