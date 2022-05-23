/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Button, Space, message } from "antd";
import ConsultSelectAction from 'redux/CooperationRelated/EMedicalRecordsSingleTransmission/ConsultSelect.actions'
import Color from "constants/Color";
class WS2767009_ConsultSelect extends React.Component {
  static propTypes = {
    Li_PersonalNum: PropTypes.any,
    Lio_ReserveNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  constructor(props) {
    super(props);

    // document.title = '受診選択';

    this.state = {
      tableData: [],
      isloadding: false,
      selectedRow: { visit_date_on: "2019/01/01", visit_course: "T-09" }
    };
  }
  componentDidMount() {
    this.GetDataList()
  }
  componentDidUpdate(preV) {
    if (this.props !== preV) {
      this.GetDataList()
    }
  }
  GetDataList() {
    this.setState({ isloadding: true })
    ConsultSelectAction.GetListData({ PersonalNum: this.props.Li_PersonalNum ? this.props.Li_PersonalNum : "" }).then(res => {
      this.setState({ tableData: res ? res : [] })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))

  }
  render() {
    return (
      <div className="consult-select">
        <Card title="受診選択">
          <Table
            dataSource={this.state.tableData}
            loading={this.state.isloadding}
            pagination={false} bordered={true} size="small"
            rowKey={(record) => record.id} scroll={{ x: 500, y: 500 }}
          >
            <Table.Column title="受診日" width={100} dataIndex="visit_date_on" align='center'
              render={(value, record) => {
                return (
                  <div>
                    {value == '0000-00-00' ? '' : value?.replaceAll('-', '/')}
                  </div>
                )
              }} />
            <Table.Column title="契約情報" dataIndex="visit_course" render={(value, record, index) => (
              <span>{value}&emsp;{record?.contract_short_name}</span>
            )} />
            {/* <Table.Column title="状態" dataIndex="Expression_11" style={{ color: Color(record.Expression_12)?.Foreground }} width={80} align='center' /> */}
            <Table.Column title="状態" dataIndex="Expression_11" width={80} align='center'
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_12)?.Foreground }}>
                    {value}
                  </div>
                )
              }} />
            <Table.Column width={70} align='center'
              render={(value, record) => {
                return (
                  <Button type="primary"
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lio_ReserveNum: record.reservation_number,
                          recordData: record
                        })
                      }
                    }} >選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2767009_ConsultSelect);
