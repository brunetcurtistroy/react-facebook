import React from "react";
import { connect } from "react-redux"; 
import { Card, Table, message} from "antd";
import ListAction from 'redux/ReservationBusiness/PersonalReserveProcess/List.actions'
class WS2555012_List extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '一覧';

    this.state = {
      tableData: [],
      isloadding: false
    };
  }
  componentDidMount(){
    this.GetScreenData()
  }
 componentDidUpdate(preV){
  if(this.props !== preV){
    this.GetScreenData()
  }
}
  GetScreenData(){
    this.setState({isloadding: true})
    ListAction.GetScreenData().then(res=>{
      this.setState({
        tableData: res? res :[]
      })
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
        return;
      }
    }).finally(()=>this.setState({isloadding: false}))

  }
  render() {
    return (
      <div className="list">
        <Card title="一覧">
          <Table
            dataSource={this.state.tableData}
            loading={this.state.isloadding}
            pagination={false}
            rowKey={(record) => record.id}
            bordered={true} size="small"
            scroll={{y: 500}}
          >
            <Table.Column title="コード" dataIndex="W1_cd" width={90} 
            render={(value, record) => {
              return (
                <div style={{textAlign: 'right'}}>{value}</div>
              )
            }}
            />
            <Table.Column title="略名" dataIndex="exam_short_name" width={130} />
            <Table.Column title="検査名称" dataIndex="exam_name" />
            <Table.Column title="タイプ" dataIndex="Expresstion_3" width={70}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2555012_List);
