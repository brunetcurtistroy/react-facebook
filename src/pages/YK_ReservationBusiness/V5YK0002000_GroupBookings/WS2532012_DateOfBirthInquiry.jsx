import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Button } from "antd";
import DateOfBirthInquiryAction from 'redux/ReservationBusiness/GroupBookings/DateOfBirthInquiry.action'
import moment from 'moment';
class WS2532012_DateOfBirthInquiry extends React.Component {
  static propTypes = {
    Li_OfficeCode: PropTypes.string,
    Li_BranchStoreCode: PropTypes.number,
    Li_Relationship: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  constructor(props) {
    super(props);

    // document.title = '生年月日照会';

    this.state = {
      tableData: [],
      isLoadding: true
    };
  }
  componentDidMount() {
    this.loadData({
      OfficeCode: this.props.Li_OfficeCode,
      BranchStoreCode: this.props.Li_BranchStoreCode,
      Relationship: this.props.Li_Relationship
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props)
      this.loadData({
        OfficeCode: this.props.Li_OfficeCode,
        BranchStoreCode: this.props.Li_BranchStoreCode,
        Relationship: this.props.Li_Relationship
      });
  }

  loadData = (params) => {
    DateOfBirthInquiryAction.getDateOfBirthInquiry(params)
      .then((res) => {
        this.setState({
          tableData: res ? res : [],
          isLoadding: false
        })
      })
  }

  render() {
    return (
      <div className="date-of-birth-inquiry">
        <Card title="生年月日照会">
          <Table
            size='small'
            dataSource={this.state.tableData}
            loading={this.state.isLoadding}
            pagination={false}
            rowKey={(record) => record.id}
            className="mb-3"
            scroll={{ y: 500 }}
          >
            <Table.Column title="生年月日" dataIndex="birthday_on" render={(value) => {
              return moment(value)?.format("NNy/MM/DD")
            }} />
            <Table.Column title="個人番号" dataIndex="personal_number_id"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    <span> {record.personal_number_id}</span>
                  </div>
                )
              }} />
            <Table.Column title="カナ氏名" dataIndex="kana_name" />
            <Table.Column title="漢字氏名" dataIndex="kanji_name" />
            <Table.Column title="性別" dataIndex="sex" render={(value) => {
              switch (value) {
                case 1:
                  return "男性"
                case 2:
                  return "女性"
                default:
                  return ""
              }
            }} />
            <Table.Column title="続柄" dataIndex="name" />
            <Table.Column width={60}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'center' }}>
                    <Button type="primary" onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lo_DateOfBirth: record.birthday_on ? moment(record.birthday_on)?.format('YYYY/MM/DD') : '',
                          resultData: record
                        })
                      }
                    }}>選択</Button>
                  </div>
                )
              }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2532012_DateOfBirthInquiry);
