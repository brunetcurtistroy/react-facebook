import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Card, Table, message } from "antd";
import { getDataBreakdownInquiryAction } from "redux/ResultOutput/RomotoArticle52/BreakdownInquiry.actions";

const styleTagP = { textAlign: 'right', margin: 0 }
class WS1001033_BreakdownInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '内訳照会';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    this.loadData({
      GissueStartDate: this.props.GissueStartDate,
      GissueEndDate: this.props.GissueEndDate,
      W1_office_cd: this.props.W1_office_cd,
      W1_branch_store_cd: this.props.W1_branch_store_cd,
      GextractCondition: this.props.GextractCondition,
      ConditionalExpression: this.props.ConditionalExpression,
      TargetCourseTable: this.props.TargetCourseTable,
      StsOfficeIntegration: this.props.StsOfficeIntegration,
      branch_store_code: this.props.branch_store_code,
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.loadData({
        GissueStartDate: this.props.GissueStartDate,
        GissueEndDate: this.props.GissueEndDate,
        W1_office_cd: this.props.W1_office_cd,
        W1_branch_store_cd: this.props.W1_branch_store_cd,
        GextractCondition: this.props.GextractCondition,
        ConditionalExpression: this.props.ConditionalExpression,
        TargetCourseTable: this.props.TargetCourseTable,
        StsOfficeIntegration: this.props.StsOfficeIntegration,
        branch_store_code: this.props.branch_store_code,
      });
    }
  }

  loadData = (params) => {
    this.setState({ isLoading: true, dataSource: [], rowSelect: {} });
    getDataBreakdownInquiryAction(params)
      .then(res => {
        if (res?.data) {
          this.setState({ dataSource: res.data });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  render() {
    const formatDate = 'YYYY/MM/DD';
    return (
      <div className="breakdown-inquiry">
        <Card title="内訳照会">
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
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="受 診 日" dataIndex="visit_date_on" align='center'
              render={(text, record) => text ? moment(text).format(formatDate) : null}
            />
            <Table.Column title="受付ＮＯ" dataIndex="receipt_number"
              render={(text, record) => (<p style={styleTagP}>{text}</p>)}
            />
            <Table.Column title="カナ氏名" dataIndex="kana_name" />
            <Table.Column title="漢字氏名" dataIndex="kanji_name" />
            <Table.Column title="ＩＤコード" dataIndex="personal_number_id"
              render={(text, record) => (<p style={styleTagP}>{text}</p>)}
            />
            <Table.Column title="ｺｰｽ" dataIndex="visit_course"/>
            <Table.Column title="コース名称" dataIndex="contract_short_name" />
            <Table.Column title="予約事業所" dataIndex="office_code"
              render={(text, record) => (<p style={styleTagP}>{text}</p>)}
            />
            <Table.Column title="事業所名" dataIndex="office_kanji_name" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1001033_BreakdownInquiry);
