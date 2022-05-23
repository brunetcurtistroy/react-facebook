import { Card, Table, message } from "antd";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ErrorConfirmSubAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/ErrorConfirmSub.actions'  
class WS2739001_ErrorConfirmSub extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_ProcessDivision: PropTypes.any,
    Li_Type: PropTypes.any,
    Li_Identify: PropTypes.any,
    Li_transmission_state: PropTypes.any,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'エラー確認SUB'; 
    this.state = {
      loadding: false,
      tableData:[]
    };
  }
componentDidMount(){
  this.ErrorCode()
}
componentDidUpdate(preV){
  if(preV!== this.props)
  this.ErrorCode()
}
isEmpty(val) {
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}
ErrorCode = ()=>{
  if(!this.isEmpty(this.props.Li_ReserveNum) ||!this.isEmpty(this.props.Li_ProcessDivision  ) ||!this.isEmpty(this.props.Li_Type)||
    !this.isEmpty(this.props.Li_Identify)){
      this.setState({loadding: true}) 
      let data ={
        reservation_number_medical_exam : this.isEmpty(this.props.Li_ReserveNum) ? "": this.props.Li_ReserveNum,
        transmission_state : this.isEmpty(this.props.Li_transmission_state) ?"" : this.props.Li_transmission_state,
        processing_division : this.isEmpty(this.props.Li_ProcessDivision  ) ? "": this.props.Li_ProcessDivision  ,
        kind : this.isEmpty(this.props.Li_Type) ? "": this.props.Li_Type,
        identification : this.isEmpty(this.props.Li_Identify) ? "": this.props.Li_Identify,
      }
      ErrorConfirmSubAction.ErrorConfirm(data).then(res=>{
        this.setState({tableData:res})
      }).catch(error =>{
        const res = error.response;
        if(!res || res.data || res.data.message){
          message.error('エラーが発生しました');
          return;
        }
      }).finally(()=> this.setState({loadding: false}))
    } 
}
  render() {
    return (
      <div className="error-confirm-sub">
        <Card title="エラー確認SUB">
          <Table
            dataSource={this.state.tableData}
            loading={false} size="small" bordered={true}
            rowKey={(record) => record.id}
          >
            <Table.Column title="レベル" dataIndex="error_level" width={100}/>
            <Table.Column title="コード" dataIndex="error_code" width={100}/>
            <Table.Column title="内容" dataIndex="error_text" /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2739001_ErrorConfirmSub);
