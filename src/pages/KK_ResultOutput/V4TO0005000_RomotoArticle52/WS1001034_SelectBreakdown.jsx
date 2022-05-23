import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Card, Table, message } from "antd";
import { getDataSelectBreakdownAction, selectRecordSelectBreakdownAction, selectAllRecordSelectBreakdownAction
} from "redux/ResultOutput/RomotoArticle52/SelectBreakdown.actions";

const styleTagP = { textAlign: 'right', margin: 0 }
class WS1001034_SelectBreakdown extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '内訳選択';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      listID: [],
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      IssuedFlag: false,
    };
  }

  componentDidMount = () => {
    this.loadData();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.loadData();
    }
  }

  loadData = () => {
    this.setState({ isLoading: true, dataSource: [], rowSelect: {} });
    getDataSelectBreakdownAction()
      .then(res => {
        if (res?.data) {
          let data = res.data;
          let arrID = [];
          if (data.length > 0) {
            data.forEach(element => {
              if(element.IssuedFlag) arrID.push(element.id)
            });
          }
          this.setState({
            dataSource: data,
            listID: arrID
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  eventSelectRecord = (params) => {
    this.setState({IssuedFlag: true})
    selectRecordSelectBreakdownAction(params)
      .then()
      .catch()
  }

  eventSelectAllRecord = (params) => {
    this.setState({IssuedFlag: true})
    selectAllRecordSelectBreakdownAction(params)
      .then()
      .catch()
  }

  componentWillUnmount = () => {
    if(this.props.onFinishScreen) this.props.onFinishScreen({Lo_IssuedFlag: this.state.IssuedFlag})
  }

  render() {
    const formatDate = 'YYYY/MM/DD';
    return (
      <div className="select-breakdown">
        <Card title="内訳選択">
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
            rowSelection={{
              selectedRowKeys: this.state.listID,
              onChange: (selectedRowKeys, selectedRows) => this.setState({ listID: selectedRowKeys }),
              onSelect: (record, selected) => this.eventSelectRecord({id: record.id, IssuedFlag: selected ? 1 : 0}),
              onSelectAll: (selected) => this.eventSelectAllRecord({ StsSelectAll: selected ? 1 : 0 })
            }}
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
            <Table.Column title="ｺｰｽ" dataIndex="visit_course" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1001034_SelectBreakdown);
