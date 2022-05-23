import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Button, Card, Table,message } from "antd";
import ContractYearSelectSubAction from 'redux/SpecificInsureMaintenance/ContractMasterMaintain/ContractYearSelectSub.actions'
class WS1288001_ContractYearSelectSub extends React.Component {
  static propTypes = {
    Lio_ContractYear: PropTypes.any,  
    onFinishScreen: PropTypes.func,
  }
  constructor(props) {
    super(props);

    // document.title = '契約年度選択SUB';

    this.state = {
      selectedRow:[],
      Lio_ContractYear: null,
      tableData:[],
      isloadingTable: false
    };
  }
componentDidMount(){
 this.getInit()
} 
componentDidUpdate(propsPrev){
  if(this.props != propsPrev){
    this.getInit()
  }
}
getInit(){
  this.setState({isloadingTable: true})
  ContractYearSelectSubAction.getListData().then(res=>{
    this.setState({
      tableData: res? res :[]
    })
  }).catch(error =>{
    const res = error.response;
    if(!res || res.data || res.data.message){
      message.error('エラーが発生しました');
    }
  }).finally(()=>this.setState({isloadingTable: false}))
}
  render() {
    return (
      <div className="contract-year-select-sub">
        <Card title="契約年度選択SUB">
          <Table
            dataSource={this.state.tableData}
            loading={this.state.isloadingTable}
            pagination={false}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
                this.setState({
                  selectedRow: selectedRows ,
                  Lio_ContractYear: selectedRows?.[0]? selectedRows[0].year: null 
                })
              }
            }}
            scroll={{y:500}}
          >
            <Table.Column title="年度" dataIndex="YearDisplay" />
            <Table.Column title="名称" dataIndex="contract_name" />
          </Table>
          <Button type="primary" style={{float:'right', marginTop:'1em'}} onClick={()=>{
            this.props.onFinishScreen({Lio_ContractYear: this.state.Lio_ContractYear, recordData: this.state.selectedRow.length > 0 ? this.state.selectedRow[0] : {}})
          }} >選　択</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1288001_ContractYearSelectSub);
