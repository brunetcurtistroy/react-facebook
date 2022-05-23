import React from "react";
import { connect } from "react-redux";
import IntroduceLetterInquiryAction from 'redux/IntroductionLetter/IntroduceLetterExtract/IntroduceLetterInquiry.action'
import moment from 'moment';

import { Card, Table, Pagination, Button } from "antd";

class WS0898003_IntroduceLetterInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = "紹介状照会";

    this.state = {
      dataSource: [],
      isLoading: false,
      current_page: 1,
      pageSize: 10,
      selectedRows: [],
      selectedRowKeys: [],
      indexTable: 0,
    };
  }

  componentDidMount() {
    this.getListData()
  }
componentDidUpdate(prevProps) {
  if(this.props !== prevProps) {
  this.getListData()
  }
}
getListData() {
  const params = {
    page: this.state.current_page,
  }
  this.setState({isLoading: true})
  IntroduceLetterInquiryAction.getListData(params).then((res) => {
    if(res && res.data) {
      const data = res.data.map(item => ({...item, visit_date_on: moment(item.visit_date).format('YYYY/MM/DD')}))
      this.setState({
        dataSource: data,
        selectedRows: [res.data[0]],
        selectedRowKeys: [res.data[0]?.id],
        indexTable: 0,
      })
    }
  }).finally(() => this.setState({isLoading: false}))
}
getDataThisComponent = (current = this.state.current_page, pageSize = this.state.pageSize) => {
  return this.state.dataSource.slice((current - 1) * pageSize, current * pageSize);
}
componentWillUnmount() {
 this.onSubmit()
}
onSubmit() {
  const {onFinishScreen} = this.props
  if(onFinishScreen) {
    onFinishScreen({
      Lo_PersonalNum: this.state.selectedRows[0]?.personal_number_id,
      recordData: this.state.selectedRows[0]
    })
  }
}
  render() {
    return (
      <div className="introduce-letter-inquiry">
        <Card title="紹介状照会">
          <Table
            className="mt-3"
            rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
            dataSource={this.getDataThisComponent(this.state.current_page)}
            loading={this.state.isLoading}
            size="small"
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  this.setState({
                    selectedRows: [record],
                    selectedRowKeys: [record.id],
                    indexTable: rowIndex,
                  })
                }
              };
            }}
          >
            <Table.Column title="個人ID" dataIndex="personal_number_id"  
             render={(value, record, index) => {
               return <div style={{ textAlign: 'right' }}><span>{value}</span></div>
             }}
            />
            <Table.Column title="漢字氏名" dataIndex="kanji_name"  />
            <Table.Column title="受診日" dataIndex="visit_date_on"  />
            <Table.Column title="診療科" dataIndex="department_name" />
            <Table.Column title="健診ｺｰｽ" dataIndex="medical_exam_course" />
            <Table.Column title="コース名称" dataIndex="contract_short_name"  />
            <Table.Column title="" dataIndex=""   width={100}
              render={(value, record, index) => {
                return <div style={{ textAlign: 'center' }}><Button type="primary" onClick={() => {this.onSubmit()}}
                >選 択</Button></div>
              }}
            />
          </Table>
          <Pagination
              size='small'
              hideOnSinglePage={this.state.dataSource.length > 10 ? false : true}
              style={{ margin: '10px 0', textAlign: 'right' }}
              total={this.state.dataSource.length}
              pageSize={this.state.pageSize}
              current={this.state.current_page}
              pageSizeOptions={[10]}
              onChange={(page) => {
                this.setState({ current_page: page }, () => this.getDataThisComponent(page))
              }}
            />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0898003_IntroduceLetterInquiry);
