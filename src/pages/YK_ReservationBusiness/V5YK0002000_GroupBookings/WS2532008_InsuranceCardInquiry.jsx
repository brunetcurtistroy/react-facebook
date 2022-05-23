import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Col, Row, Table, Button } from "antd";
import InsuranceCardInquiryAction from 'redux/ReservationBusiness/GroupBookings/InsuranceCardInquiry.action'
class WS2532008_InsuranceCardInquiry extends React.Component {
  static propTypes = {
    Li_OfficeCode: PropTypes.string,
    Li_BranchStoreCode: PropTypes.number,
    Li_Relationship: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '保険証照会';

    this.state = {
      tableData: [],
      isLoadding: true,
    };
  }

  componentDidMount() {
    InsuranceCardInquiryAction.getDataInsuranceCardInquiry({
      OfficeCode: this.props.Li_OfficeCode, BranchStoreCode: this.props.Li_BranchStoreCode
      , Relationship: this.props.Li_Relationship
    }).then((res) => {
      this.setState({
        tableData: res ? res : [],
      })
    })
      .finally(
        this.setState({ isLoadding: false })
      )
  }
  render() {
    return (
      <div className="insurance-card-inquiry">
        <Card title="保険証照会">
          <Table
            size='small'
            dataSource={this.state.tableData}
            loading={this.state.isLoadding}
            pagination={false}
            rowKey={(record) => record.id}
            className="mb-3"
            scroll={{ y: 500 }}
            bordered
          >
            <Table.Column title="保険証番号" dataIndex="insurer_card_number" align='center' width={100}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    <span> {record.insurer_card_number}</span>
                  </div>
                )
              }} />
            <Table.Column title="保険番号" dataIndex="insurer_number" align='center' width={100}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    <span> {record.insurer_number}</span>
                  </div>
                )
              }} />
            <Table.Column title="個人番号" dataIndex="personal_number_id" align='center' width={100}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    <span> {record.personal_number_id}</span>
                  </div>
                )
              }} />
            <Table.Column title="カナ氏名" dataIndex="kana_name" align='center'
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'left' }}>
                    <span> {record.kana_name}</span>
                  </div>
                )
              }} />
            <Table.Column title="漢字氏名" dataIndex="kanji_name" align='center'
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'left' }}>
                    <span> {record.kanji_name}</span>
                  </div>
                )
              }} />
            <Table.Column title="性別" dataIndex="sex" align='center' width={50}
              render={(value) => {
                switch (value) {
                  case 1:
                    return "男性"
                  case 2:
                    return "女性"
                  default:
                    return ""
                }
              }} />
            <Table.Column title="続柄" dataIndex="name" align='center' width={90} 
             render={(value, record, index) => {
              return (
                <div style={{ textAlign: 'left' }}>
                  <span> {record.name}</span>
                </div>
              )
            }}/>
            <Table.Column width={60}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'center' }}>
                    <Button type="primary" onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lo_InsuranceCardNum: record.insurer_card_number,
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2532008_InsuranceCardInquiry);
