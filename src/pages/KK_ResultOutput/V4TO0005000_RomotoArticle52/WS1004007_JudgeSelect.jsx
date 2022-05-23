import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Checkbox, Form, message } from "antd";
import { getDataJudgeSelectAction } from "redux/ResultOutput/RomotoArticle52/JudgeSelect.actions";
import Color from "constants/Color";

class WS1004007_JudgeSelect extends React.Component {
  static propTypes = {
    Li_InspectAndTotal: PropTypes.any,
    Lio_JudgeList: PropTypes.any,
    Lio_YesFindingsList: PropTypes.any,
    Lio_DoctorInstructedList: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '判定選択';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      JudgeList: [],
      YesFindingsList: [],
      DoctorInstructedList: []
    };
  }

  componentDidMount = () => {
    this.loadData({
      Lio_JudgeList: this.props.Lio_JudgeList,
      Lio_YesFindingsList: this.props.Lio_YesFindingsList,
      Lio_DoctorInstructedList: this.props.Lio_DoctorInstructedList
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.loadData({
        Lio_JudgeList: this.props.Lio_JudgeList,
        Lio_YesFindingsList: this.props.Lio_YesFindingsList,
        Lio_DoctorInstructedList: this.props.Lio_DoctorInstructedList
      });
    }
  }

  loadData = (params) => {
    this.setState({ isLoading: true, dataSource: [], rowSelect: {} });
    getDataJudgeSelectAction(params)
      .then(res => {
        if (res?.data) {
          let tempJudgeList = []
          let tempYesFindingsList = []
          let tempDoctorInstructedList = []

          let data = res.data.map((item, index) => {
            if (item.StsTargetJudge) {
              tempJudgeList.push(item.judgment_result)
            }
            if (item.StsTargetYesFindings) {
              tempYesFindingsList.push(item.judgment_result)
            }
            if (item.StsTargetPhysicianInstructions) {
              tempDoctorInstructedList.push(item.judgment_result)
            }
            return { ...item }
          });

          this.setState({
            dataSource: data,
            JudgeList: tempJudgeList,
            YesFindingsList: tempYesFindingsList,
            DoctorInstructedList: tempDoctorInstructedList
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  handleChange = (record, value, name) => {
    let arrTemp = [...this.state.dataSource];
    let tempJudgeList = [...this.state.JudgeList]
    let tempYesFindingsList = [...this.state.YesFindingsList]
    let tempDoctorInstructedList = [...this.state.DoctorInstructedList]

    let index = arrTemp.findIndex(item => item.id === record.id);

    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }

      if (name === 'StsTargetJudge') {
        let idx = tempJudgeList.findIndex(item => item === record.judgment_result);
        value
          ? tempJudgeList.push(record.judgment_result)
          : tempJudgeList.splice(idx, 1);
        tempJudgeList.sort()
      }
      if (name === 'StsTargetYesFindings') {
        let idx = tempYesFindingsList.findIndex(item => item === record.judgment_result);
        value
          ? tempYesFindingsList.push(record.judgment_result)
          : tempYesFindingsList.splice(idx, 1);
        tempYesFindingsList.sort()
      }
      if (name === 'StsTargetPhysicianInstructions') {
        let idx = tempDoctorInstructedList.findIndex(item => item === record.judgment_result);
        value
          ? tempDoctorInstructedList.push(record.judgment_result)
          : tempDoctorInstructedList.splice(idx, 1);
        tempDoctorInstructedList.sort()
      }

      arrTemp[index] = objTemp;
      this.setState({
        dataSource: arrTemp,
        JudgeList: tempJudgeList,
        YesFindingsList: tempYesFindingsList,
        DoctorInstructedList: tempDoctorInstructedList
      });
    }
  }

  componentWillUnmount = () => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_JudgeList: this.state.JudgeList.toString(),
        Lio_YesFindingsList: this.state.YesFindingsList.toString(),
        Lio_DoctorInstructedList: this.state.DoctorInstructedList.toString()
      });
    }
  }

  render() {
    return (
      <div className="judge-select">
        <Card title="判定選択">
          <Form>
            <Table
              bordered
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
              rowKey={(record) => record.id}
            >
              <Table.Column title="判定" dataIndex="judgment_result" align='center'
                render={(value, record, index) => (
                  <span style={{ color: (record?.Expression_5 ? Color(record.Expression_5) : Color(208)).Foreground }}>{value}</span>
                )}
              />
              {this.props.Li_InspectAndTotal === 1
                ? null
                : <Table.Column title="異常判定" dataIndex="StsTargetJudge" align='center'
                  render={(value, record, index) => (
                    <Checkbox checked={record.StsTargetJudge}
                      onChange={(e) => this.handleChange(record, e.target.checked, 'StsTargetJudge')}
                    />
                  )}
                />
              }

              <Table.Column title="有所見者" dataIndex="StsTargetYesFindings" align='center'
                render={(value, record, index) => (
                  <Checkbox checked={record.StsTargetYesFindings}
                    onChange={(e) => this.handleChange(record, e.target.checked, 'StsTargetYesFindings')}
                  />
                )}
              />
              <Table.Column title="医師指示" dataIndex="StsTargetPhysicianInstructions" align='center'
                render={(value, record, index) => (
                  <Checkbox checked={record.StsTargetPhysicianInstructions}
                    onChange={(e) => this.handleChange(record, e.target.checked, 'StsTargetPhysicianInstructions')}
                  />
                )} />
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1004007_JudgeSelect);
