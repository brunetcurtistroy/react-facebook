import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table,Button } from "antd";
import ContractCompiledQueryAction from 'redux/SpecificInsureMaintenance/ContractMasterMaintain/ContractCompiledQuery.actions'
class WS1289001_ContractCompiledQuery extends React.Component {
  static propTypes = {
    ContractCompiled: PropTypes.any, 
    onFinishScreen: PropTypes.func,
  }
  constructor(props) {
    super(props);

    // document.title = 'V4-TSUB0020:契約取りまとめ照会';

    this.state = {
      tableData:[],
      selectedRows:{}
    };
  }
componentDidMount(){
  ContractCompiledQueryAction.getListData({contract_compiled_code: this.props.ContractCompiled ?this.props.ContractCompiled : "" }).then(res=>{
    this.setState({tableData: res? res : []})
  })
}
  render() {
    return (
      <div className="contract-compiled-query">
        <Card title="V4-TSUB0020:契約取りまとめ照会">
          <Table dataSource= {this.state.tableData }  
                 size='small' bordered
                 loading={this.state.isLoading}
                 rowKey={(record) => record.contract_compiled_division_code}
                 pagination={false}
                 scroll={{y: 800}}
                 rowSelection={{
                  type: 'radio',
                  onChange: (selectedRowKeys, selectedRows) => {
                    console.log('selectedRows: ', selectedRows);
                    this.setState({selectedRows: selectedRows.length > 0 ?selectedRows[0] : {} })
                  }
                }}
            >
            <Table.Column title="コード" dataIndex="contract_compiled_division_code"  />
            <Table.Column title="契約取りまとめ" dataIndex="name_contract_compiled_division_code"  />
            <Table.Column title="区分" dataIndex="compiled_division"  width={100} />
            <Table.Column title="区 分 名" dataIndex="name_compiled_division"  />
          </Table>
          <Button type="primary" style={{float:'right', marginTop:'1em'}} onClick={()=>{
            if(this.props.onFinishScreen){
              this.props.onFinishScreen({
                contract_compiled_code: this.state.selectedRows?.contract_compiled_division_code,
                recordData: this.state.selectedRows
               })
            }
          }} >選択</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1289001_ContractCompiledQuery);
