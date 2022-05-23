import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Button, Row, Col, Space, Modal, message,Spin } from "antd";
import WS1317001_ContractMasterDetails from "./WS1317001_ContractMasterDetails";
import WS1288001_ContractYearSelectSub from 'pages/TM_SpecificInsureMaintenance/V4TK0080000_ContractMasterMaintain/WS1288001_ContractYearSelectSub.jsx';
import ContractMasterMaintainAction from 'redux/SpecificInsureMaintenance/ContractMasterMaintain/ContractMasterMaintain.actions'
import ContractYearSelectSubAction from 'redux/SpecificInsureMaintenance/ContractMasterMaintain/ContractYearSelectSub.actions'
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
class WS1316001_ContractMasterMaintain extends React.Component {
  static propTypes = {  
    Li_Year: PropTypes.any,
    Li_Name: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.formRef = React.createRef(); 
    // document.title = 'V4-TMS01000:契約マスタ保守'; 
    this.state = {
      childModal: {
        visible: false,
        component: null,
        title: null,
        width: 0,
      }, 
      tableDataYear: [],
      checkDelete: false ,
      isloadfrm: false, 
    };
  }
  componentDidMount() {
    ContractYearSelectSubAction.getListData().then(res => {
      if (res.length > 0) {
        this.setState({
          tableDataYear: res
        })
        let YearDisplay = res[0].YearDisplay;
        let month = YearDisplay?.split("年")?.[1]?.split("月")?.[0];
        this.formRef.current?.setFieldsValue({
          ContractYear: res[0].year,
          ContractName: res[0].contract_name,  
          ContractMonth: month ?? month.trim()  
        })
        this.forceUpdate()
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    })
  }
  onCheckYM =() => {
    this.setState({...this.state.checkDelete, checkDelete: false, serial_number: 0})
    let value = this.formRef.current?.getFieldValue("ContractYear") 
    const reg = /^-?[0-9]*(\.[0-9]*)?$/; 
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      this.setFieldValueYM(value, this.formRef.current?.getFieldValue(""))
    } else {
      message.warning("正しい契約年度を入力して下さい。")
      this.setFieldValueYM(1000, 10)
    }
  }; 
  setFieldValueYM(year, month){
    let checkLoop = 0;
    let checkEnd = 0;
    let thang =  year < 2000 ? 10 : 4
    this.state.tableDataYear.map((value, index)=>{
      if(checkLoop == 0){
        let monthVal = value.YearDisplay.split("年")[1].split("月")[0] 
        if(value.year === year && parseInt(monthVal) === thang){
          checkLoop = 1;
          this.formRef.current?.setFieldsValue({
            ContractYear: year === 1000 ? 0 : year,
            ContractMonth: thang ,
            ContractName: value.contract_name, 
            serial_number: value.serial_number
          }) 
          this.setState({...this.state.checkDelete, checkDelete: true})
        }
      }
      checkEnd = index
    })
    if(checkEnd +1 === this.state.tableDataYear.length){
      if(checkLoop === 0){ 
          let nam = 0;
          if(thang === 10){
             nam = year === 1000 || year === 0   ? 0 : year > 1000 ? year : 1000 - year
          }else{
             nam = year
          }
          message.warning("正しい契約年度を入力して下さい。")
          this.formRef.current?.setFieldsValue({
            ContractMonth: thang,
            ContractYear : nam,
            ContractName: "", 
            serial_number: 0
          })   
      }
    }
  }
  showContractYearSelectSub() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '40%',
        component: (
          <WS1288001_ContractYearSelectSub
            Lio_ContractYear={this.formRef.current?.getFieldValue("ContractYear")} 
            onFinishScreen={(output) => { 
               let YearDisplay = output.recordData?.YearDisplay;
               let month = YearDisplay?.split("年")?.[1]?.split("月")?.[0];
              this.formRef.current?.setFieldsValue({
                ContractYear: output?.Lio_ContractYear,
                ContractName: output?.recordData?.contract_name,
                ContractMonth: month ?? month.trim()  ,
                serial_number: output.recordData?.serial_number ? output.recordData.serial_number : 0
              })   
              this.closeModal()
            }}
          />),
      },
    })
  }
  yearDelete(){
    this.setState({
      isloadfrm: true,
      childModal: {
        ...this.state.childModal, 
        visible: true,
        width: 500,
        component: (
          <WS0061009_CheckYesNoYes
            Li_DisplayContent = {"確認して下さい!"}
            Li_DisplayMethod ={0}
            onFinishScreen={(output) => {
                if(output.Lio_StsReturn){
                  ContractMasterMaintainAction.delete({ContractYear: this.formRef.current?.getFieldValue("ContractYear")}).then(res=>{
                  })
                  .finally(()=>this.setState({isloadfrm: false}))
                }
              this.setState({isloadfrm: false})
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  yearUpdate(){
    if(this.formRef.current?.getFieldValue("ContractYear") === 0){
          message.error("正しい契約年度を入力して下さい。")
    }else{
      this.setState({isloadfrm: true})
      ContractMasterMaintainAction.update({ContractYear: this.formRef.current?.getFieldValue("ContractYear"),
             serial_number: this.formRef.current?.getFieldValue("serial_number"),
             ContractName:this.formRef.current?.getFieldValue("ContractName")?this.formRef.current?.getFieldValue("ContractName") :""  }).then(res=>{ })
      .finally(()=>this.setState({isloadfrm: false}))
    }
  }
  onFinish(values) { }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        value: ''
      },
    });
  }
  
  render() {
    return (
      <div className="contract-master-maintain">
        <Card title="V4-TMS01000:契約マスタ保守">
          <Spin spinning={this.state.isloadfrm} >
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{serial_number: 0}} >
            <Row>
              <Col span={7}>
                <Space>
                  <Form.Item name="ContractYear" label="契約" >
                    <Input.Search maxLength={4} style={{ width: '100px' }} onBlur={(value) => this.onCheckYM()}
                      onSearch={() => this.showContractYearSelectSub()} />
                  </Form.Item>
                  <Form.Item name="ContractMonth" label="年" >
                    <Select style={{ width: '70px' }} onChange={()=>this.onCheckYM()} >
                      <Select.Option value={4}>4</Select.Option>
                      <Select.Option value={10}>10</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="ContractName" label="月" >
                    <Input />
                  </Form.Item>
                </Space>
              </Col>
              <Col span={17}>
                <Space>
                  <Form.Item>
                    <Button type="primary" onClick={()=>this.yearDelete()} disabled={this.state.checkDelete} >削除</Button>
                  </Form.Item>
                  <Form.Item >
                    <Button type="primary" onClick={()=>this.yearUpdate()} >更新</Button>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </Form>
          <WS1317001_ContractMasterDetails Li_ContractYear={this.formRef.current?.getFieldValue("ContractYear")} />
          </Spin>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
            this.setState({isloadfrm: false})
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1316001_ContractMasterMaintain);
