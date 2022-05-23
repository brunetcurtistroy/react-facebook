import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DeleteOutlined } from "@ant-design/icons";
import { Card, Table, Checkbox, Button, message } from "antd";
import ReservesSelectScreenAction from "redux/ResultOutput/DispatchManage/ReservesSelectScreen.action";
import Color from "constants/Color";
import moment from "moment-timezone";

class WS2977026_ReservesSelectScreen extends React.Component {
  static propTypes = {
    Li_PersonalId: PropTypes.string,
    Lo_ReserveNum: PropTypes.number,
    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    // document.title = '予約選択画面';

    this.state = {
      dataSource: [],
      isLoadingTable: false
    };
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getData()
    }
  }

  getData() {
    let params = {
      Li_PersonalId: this.props.Li_PersonalId
    }
    this.setState({ isLoadingTable: true })
    ReservesSelectScreenAction.getData(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  updateData(record) {
    let params = {
      id: record.id,
      W1_run_flg: record.W1_run_flg,
      W1_consult_date: record.W1_consult_date,
      W1_visits_courses: record.W1_visits_courses
    }

    ReservesSelectScreenAction.updateData(params)
      .then((res) => {
        this.getData()
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

  deleteRecord(id) {
    let params = {
      id: id
    }

    ReservesSelectScreenAction.deleteRecord(params)
      .then((res) => {

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

  findIndexByID = (recordID) => {
    return this.state.dataSource.findIndex((item) => recordID === item.id);
  };

  changeCheckbox(index, value) {
    let data = [...this.state.dataSource]

    data[index]['W1_run_flg'] = value
    this.setState({ dataSource: data })
    this.updateData(data[index])
  }


  render() {
    return (
      <div className="reserves-select-screen">
        <Card title="予約選択画面">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            rowKey={(record) => record.id}
            scroll={{ x: 450 }}
          >
            <Table.Column dataIndex="W1_run_flg" width={40} align='center'
              render={(value, record, index) => {
                return (
                  <Checkbox checked={value}
                    onChange={(e) => {
                      this.changeCheckbox(this.findIndexByID(record.id), e.target.checked)
                    }}
                  ></Checkbox>
                )
              }} />
            <Table.Column title="受診日" dataIndex="W1_consult_date" width={90} align='center'
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.expression_8)?.Foreground }}>
                    {value && value !== '0000/00/00' ? moment(value)?.format('YYYY/MM/DD') : ''}
                  </div>
                )
              }} />
            <Table.Column title="ｺｰｽ" dataIndex="W1_visits_courses" width={50} align='center'
              render={(value, record, index) => {
                return (
                  <span style={{ color: Color(record.expression_8)?.Foreground }}>
                    {value ? (record.W1_visits_courses?.toString().substr(0, 1) + '-' + record.W1_visits_courses?.toString().substr(1, 2)) : ''}
                  </span>
                )
              }} />
            <Table.Column title="契　約　名　称" dataIndex="contract_short_name"
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.expression_8)?.Foreground }}>
                    {value}
                  </div>
                )
              }}
            />
            {/* <Table.Column width={40} align='center'
              render={(text, record, index) => {
                return <div>
                  <Button style={{ border: 'none' }}
                    onClick={() => { this.deleteRecord(record.id) }}
                    danger
                    icon={<DeleteOutlined />}
                  >
                  </Button>
                </div>;
              }}
            /> */}
          </Table>
          <Button type="primary" style={{ marginTop: '1em', float: 'right' }}
            onClick={() => {
              if (this.props.onFinishScreen) {
                this.props.onFinishScreen({})
              }
            }}
          >確定</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2977026_ReservesSelectScreen);
