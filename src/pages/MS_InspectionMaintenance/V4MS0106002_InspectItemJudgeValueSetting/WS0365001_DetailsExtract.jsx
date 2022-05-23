import { Button, Card, Checkbox, Form, Radio, Space, Spin, message } from "antd";
import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import DetailsExtractAction from 'redux/InspectionMaintenance/InspectItemJudgeValueSetting/DetailsExtract.actions'
class WS0365001_DetailsExtract extends React.Component {
  static propTypes = {
    Li_JudgeMethod: PropTypes.any,
    Lio_SetText: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '詳細抽出';

    this.state = { 
      CommonClassify: true,
      JudgeLevel: true,
      History: true,
      SkyJudge: true,
      JudgeResult: true,
      isLoadding: false
    };
  }
  componentDidMount() {
    this.GetScreenData()
  }
  GetScreenData() {
    this.setState({ isLoadding: true })
    DetailsExtractAction.GetScreenData({ AnnexationJudge: this.props.Li_JudgeMethod}).then(res => {
      this.formRef.current?.setFieldsValue(res)
      if (res?.StsCommonClassify === 1) {
        this.setState({
          CommonClassify: false
        })
      }
      if (res?.StsJudgeLevel === 1) {
        this.setState({
          JudgeLevel: false
        })
      }
      if (res?.StsHistory === 1) {
        this.setState({
          History: false
        })
      }
      if (res?.StsSkyJudge === 1) {
        this.setState({
          SkyJudge: false
        })
      }
      if (res?.StsJudgeResult === 1) {
        this.setState({
          JudgeResult: false
        })
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isLoadding: false }))

  }

  async onChangeCheck(e, value) {
    let check = e.target.checked
    if (value === "CommonClassify") {
      await this.setState({
        CommonClassify: !check
      })
    } else if (value === "JudgeLevel") {
      await this.setState({
        JudgeLevel: !check
      })
    } else if (value === "History") {
      await this.setState({
        History: !check
      })
    } else if (value === "SkyJudge") {
      await this.setState({
        SkyJudge: !check
      })
    } else if (value === "JudgeResult") {
      await this.setState({
        JudgeResult: !check
      })
    }
  }
  Run_F12() {
    this.setState({ isLoadding: true })
    let data = {
      AnnexationJudge: this.props.Li_JudgeMethod ,
      StsCommonClassify: this.formRef.current?.getFieldValue("StsCommonClassify") ? 1 : 0,
      CommonClassify: this.formRef.current?.getFieldValue("CommonClassify") ,
      StsJudgeLevel: this.formRef.current?.getFieldValue("StsJudgeLevel") ? 1 : 0,
      JudgeLevel: this.formRef.current?.getFieldValue("JudgeLevel"),
      StsHistory: this.formRef.current?.getFieldValue("StsHistory") ? 1 : 0,
      History: this.formRef.current?.getFieldValue("History") ,
      StsSkyJudge: this.formRef.current?.getFieldValue("StsSkyJudge") ? 1 : 0,
      SkyJudge: this.formRef.current?.getFieldValue("SkyJudge") ,
      StsJudgeResult: this.formRef.current?.getFieldValue("StsJudgeResult") ? 1 : 0,
      JudgeResult: this.formRef.current?.getFieldValue("JudgeResult") ,
    } 
    DetailsExtractAction.Run_F12(data).then(res =>{
      if(this.props.onFinishScreen){
        this.props.onFinishScreen({Lio_SetText: res?.DetailedText})
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isLoadding: false }))
  }
  render() {
    return (
      <div className="details-extract">
        <Card title="詳細抽出">
          <Spin spinning={this.state.isLoadding} >
            <Form
              ref={this.formRef} autoComplete="off" 
            >
              <Space>
                <Form.Item name="StsCommonClassify" valuePropName="checked">
                  <Checkbox onChange={(e) => this.onChangeCheck(e, "CommonClassify")} ></Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary">性&emsp;　別</Button>
                </Form.Item>
                <Form.Item name="CommonClassify">
                  <Radio.Group disabled={this.state.CommonClassify}>
                    <Radio value={0}>共&emsp;&emsp;通</Radio>
                    <Radio value={1}>男女別</Radio>
                  </Radio.Group>
                </Form.Item>
              </Space><br />
              <Space>
                <Form.Item name="StsJudgeLevel" valuePropName="checked">
                  <Checkbox onChange={(e) => this.onChangeCheck(e, "JudgeLevel")} ></Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary">判定ﾚﾍﾞﾙ</Button>
                </Form.Item>
                <Form.Item name="JudgeLevel">
                  <Radio.Group disabled={this.state.JudgeLevel}>
                    <Radio value={0}>同&emsp;&emsp;じ</Radio>
                    <Radio value={1}>異なる</Radio>
                  </Radio.Group>
                </Form.Item>
              </Space><br />
              <Space>
                <Form.Item name="StsHistory" valuePropName="checked">
                  <Checkbox onChange={(e) => this.onChangeCheck(e, "History")}></Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary">履&emsp;　歴</Button>
                </Form.Item>
                <Form.Item name="History">
                  <Radio.Group disabled={this.state.History}>
                    <Radio value={0}>あ    &emsp; &ensp;り</Radio>
                    <Radio value={1}>な    &emsp;し</Radio>
                  </Radio.Group>
                </Form.Item>
              </Space><br />
              <Space>
                <Form.Item name="StsSkyJudge" valuePropName="checked">
                  <Checkbox onChange={(e) => this.onChangeCheck(e, "SkyJudge")}></Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary">空 &ensp;判&nbsp;定</Button>
                </Form.Item>
                <Form.Item name="SkyJudge">
                  <Radio.Group disabled={this.state.SkyJudge}>
                    <Radio value={0}>あ    &emsp; &ensp;り</Radio>
                    <Radio value={1}>な    &emsp;し</Radio>
                  </Radio.Group>
                </Form.Item>
              </Space><br />
              <Space>
                <Form.Item name="StsJudgeResult" valuePropName="checked">
                  <Checkbox onChange={(e) => this.onChangeCheck(e, "JudgeResult")}></Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary">判定結果</Button>
                </Form.Item>
                <Form.Item name="JudgeResult">
                  <Radio.Group disabled={this.state.JudgeResult}>
                    <Radio value={0}>エラー&ensp;&ensp;</Radio>
                    <Radio value={1}>正  &emsp;常</Radio>
                  </Radio.Group>
                </Form.Item>
              </Space><br />
              <Button type="primary" style={{ float: 'right' }} onClick={() => this.Run_F12()} >実行</Button>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0365001_DetailsExtract);
