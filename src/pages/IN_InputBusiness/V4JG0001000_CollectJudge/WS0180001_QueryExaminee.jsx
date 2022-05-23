import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Table, Button, Space, message } from "antd";
import QueryExamineeAction from "redux/InputBusiness/CollectJudge/QueryExaminee.action";
import moment from "moment-timezone";

class WS0180001_QueryExaminee extends React.Component {
  static propTypes = {
    _IStartFlag: PropTypes.any,
    _IDate: PropTypes.any,
    _OidCode: PropTypes.any,
    _OConsultCourse: PropTypes.any,
    _IOfficeCd: PropTypes.any,
    _IBranchStoreCd: PropTypes.any,
    _OAcceptNum: PropTypes.any,
    _OReserveNum: PropTypes.any,
    _OCourseLevel: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'V4-VNS71200:照会:受診者';

    this.state = {
      isLoadingTable: false,
      dataSource: [],
      date: null
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
      ...this.props
    }

    this.setState({ isLoadingTable: true })
    QueryExamineeAction.getScreenData(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res.data.data : [],
          isLoadingTable: false,
          date: res ? res.data._IDate : null
        })
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  onSelect(record) {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        recordData: record,
        EndStatus: true
      })
    }
  }

  render() {
    return (
      <div className="query-examinee">
        <Card title="V4-VNS71200:照会:受診者">
          <div style={{ marginBottom: 15 }}>
            <span style={{ marginRight: 10, fontWeight: 'bold', color: '#0a6ad2' }}>受 付 日</span>
            <span>{this.state.date}</span>
          </div>

          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            scroll={{x: 800}}
            rowKey={(record) => record.id}
          >
            <Table.Column title="受付番号" dataIndex="receipt_number" width={70}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>{value}</div>
                )
              }}
            />
            <Table.Column title="氏　　名" dataIndex="kanji_name" />
            <Table.Column title="生年月日" dataIndex="birthday_on" width={90} align='center'
              render={(value, record, index) => {
                return (
                  <div>{value && value !== '0000/00/00' ? moment(value)?.format('NNy/MM/DD') : null}</div>
                )
              }} />
            <Table.Column title="性別" dataIndex="GenderName" align='center' />
            <Table.Column title="受診コース" dataIndex="visit_course"
              render={(value, record, index) => {
                return <Space>
                  <span style={{ marginRight: 5 }}>{value}</span>
                  <span>{record?.contract_short_name}</span>
                </Space>
              }} />
            <Table.Column title="ＩＤ" dataIndex="personal_number_id" width={60}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>{value}</div>
                )
              }} />
            <Table.Column title="事業所名" dataIndex="office_kanji_name" />
            <Table.Column width={70} align='center'
              render={(value, record) => {
                return (
                  <Button type="primary"
                    onClick={() => this.onSelect(record)}
                  >選択</Button>
                )
              }} />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0180001_QueryExaminee);
