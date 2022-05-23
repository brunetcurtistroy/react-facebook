import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Table, message, Button, Card } from "antd";
import PersonalQueryProcessAction from 'redux/AdvancePreparation/DocumentBatchCreate/PersonalQueryProcess.actions'
class WS0649007_PersonalQueryProcess extends React.Component {
  static propTypes = {
    ReserveDateF: PropTypes.any,
    ReserveDateT: PropTypes.any,
    FacilityNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  constructor(props) {
    super(props);

    // document.title = '個人照会処理';

    this.state = {
      isLoadding: false,
      tableData: []
    };
  }
  componentDidMount() {
    this.GetListData()
  }
  componentDidUpdate(PreV) {
    if (PreV !== this.props) {
      this.GetListData()
    }
  }
  GetListData() {
    if (!this.isEmpty(this.props.ReserveDateF)) {
      this.setState({ isLoadding: false })
      let data = { ReserveDateF: this.props.ReserveDateF, ReserveDateT: this.props.ReserveDateT, FacilityNum: this.isEmpty(this.props.FacilityNum) ? "" : this.props.FacilityNum }
      PersonalQueryProcessAction.GetListData(data).then(res => {
        this.setState({
          tableData: res
        })
      }).catch(error => {
        const res = error.response;
        if (!res || res?.data || res?.data?.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isLoadding: false }))
    }

  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  render() {
    return (
      <div className="personal-query-process">
        <Card title='個人照会処理'>
          <Table
            dataSource={this.state?.tableData}
            loading={this.state.isLoadding}
            pagination={false} bordered={true} size="small"
            rowKey={(record) => record.id} scroll={{ y: 600 }}
          >
            <Table.Column title="ID" dataIndex="personal_number_id" width={90}
             render={(value, record, index) => {
              return <div style={{textAlign: 'right'}}>{value}</div>
            }} />
            <Table.Column title="カナ氏名" dataIndex="expression_14" />
            <Table.Column title="漢字氏名" dataIndex="expression_15" />
            <Table.Column title="受診コース" dataIndex="visit_course" 
            render={(value, record, index) => {
              return <span>{value} {record?.contract_short_name} </span>
            }} />
            <Table.Column title="施設名称" dataIndex="facility_name" />
            <Table.Column width={80} align='center'
              render={(value, record, index) => {
                return (
                  <Button type="primary"
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({ recordData: record })
                      }
                    }} >選　択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0649007_PersonalQueryProcess);
