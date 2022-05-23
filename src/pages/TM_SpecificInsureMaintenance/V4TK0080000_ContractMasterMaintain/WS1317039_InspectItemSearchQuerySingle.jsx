import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Checkbox, Button, Table, Row, Col, Space, message,Modal } from "antd";
import WS2716001_InspectItemInfoMaintain from 'pages/MS_InspectionMaintenance/V4MS0103000_InspectItemInfoMaintain/WS2716001_InspectItemInfoMaintain.jsx';
import InspectItemSearchQuerySingleService from 'redux/SpecificInsureMaintenance/ContractMasterMaintain/InspectItemSearchQuerySingle.actiions'
class WS1317039_InspectItemSearchQuerySingle extends React.Component {
  static propTypes = {
    Li_SearchChar: PropTypes.any,
    Li_StsUseInspect: PropTypes.any,
    Li_StsSpecificMedicalExam: PropTypes.any,
    Li_Type: PropTypes.any,
    Lo_InspectItemCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査項目検索・照会(単品)';

    this.state = {
      isloaddingTable: false,
      tableData: [],
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    }; 
  }
 componentDidMount(){
   let data = { SearchChar: this.props?.Li_SearchChar ?this.props.Li_SearchChar : "", StsUseInspect: this.props?.Li_StsUseInspect ? this.props.Li_StsUseInspect : "",
                Type: this.props?.Li_Type ?this.props.Li_Type : "" }
   this.callGetListData(data)
 }
 callGetListData(data){
   this.setState({isloaddingTable: true})
  InspectItemSearchQuerySingleService.getListData(data).then(res=>{
    this.setState({tableData: res? res : []})
  }).catch(error =>{
    const res = error.response;
    if(!res || res.data || res.data.message){
      message.error('エラーが発生しました');
    }
  }).finally(()=> this.setState({isloaddingTable: false}))

 }
 closeModal = () => {
  this.setState({
    childModal: {
      ...this.state.childModal,
      visible: false,
    },
  });
}; 
handleButton = () => {
  if(this.props.onFinishScreen){
    this.props.onFinishScreen({Lo_InspectItemCode:  this.formRef.current?.getFieldValue("selectedRow")?.test_item_code,
     recordData: this.formRef.current?.getFieldValue("selectedRow")});
  };
}
ShowInspectItemInfoMaintain(){
  this.setState({
    childModal: {
      ...this.state.childModal,
      visible: true,
      width: '90%',
      component: (
        <WS2716001_InspectItemInfoMaintain 
          onFinishScreen={(output) => { 
            this.closeModal()
          }}
        />),
    },
  })
}
 getFieldFm(namePath){
   return  this.formRef.current?.getFieldValue(namePath)? this.formRef.current.getFieldValue(namePath) :""
 }
  render() {
    return (
      <div className="inspect-item-search-query-single">
        <Card title="検査項目検索・照会(単品)">
          <Form
            ref={this.formRef} 
            autoComplete="off"
            initialValues={{Type: ""}}
          >
            <Row>
              <Col span={16}>
                <Form.Item name="SearchShortName" label="略名検索" >
                  <Input maxLength={100} onBlur={()=>{
                    this.callGetListData({SearchChar:this.getFieldFm("SearchShortName"), StsUseInspect: this.getFieldFm("StsUseInspect")? 1: 0  ,
                    Type: this.getFieldFm("Type")})
                  }} />
                </Form.Item>
              </Col>
              <Col offset={1} span={2}>
                <Form.Item name="Type"  >
                  <Select onChange={()=>{
                    this.callGetListData({SearchChar:this.getFieldFm("SearchShortName"), StsUseInspect: this.getFieldFm("StsUseInspect")? 1: 0  ,
                    Type: this.getFieldFm("Type")})
                  }} >
                    <Select.Option value="">全て</Select.Option>
                    <Select.Option value="N">定量</Select.Option>
                    <Select.Option value="X">定性</Select.Option>
                    <Select.Option value="S">所見</Select.Option> 
                  </Select>
                </Form.Item>
              </Col>
              <Col offset={1} span={4}>
                <Form.Item name="StsUseInspect" label="使用" valuePropName="checked">
                  <Checkbox  onChange={()=>{
                    this.callGetListData({SearchChar:this.getFieldFm("SearchShortName"), StsUseInspect: this.getFieldFm("StsUseInspect")? 1: 0  ,
                    Type: this.getFieldFm("Type")})
                  }}></Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Table 
            dataSource={this.state.tableData}
            loading={this.state.isloaddingTable}
            pagination={false}
            size="small"
            scroll={{y:500}}
            rowKey={(record)=>record.id}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
                this.formRef.current?.setFieldsValue({
                  selectedRow: selectedRows[0]
                })
              }
            }}
            bordered={true}
            >
              <Table.Column title="コード" dataIndex="test_item_code"  />
              <Table.Column title="名　称" dataIndex="exam_name"  />
              <Table.Column title="略　名" dataIndex="exam_short_name"  />
              <Table.Column title="種別" dataIndex="exam_kind"  />
              <Table.Column title="タイプ" dataIndex="exam_type"  />
              <Table.Column title="使用" dataIndex="Expression_4"  />
            </Table>
            <Space style={{float: 'right', marginTop:'1em'}}>
              <Button type="primary" onClick={()=>this.ShowInspectItemInfoMaintain()} >保　守</Button>
              <Button type="primary" onClick={() =>this.handleButton()}>選　択</Button>
            </Space> 
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1317039_InspectItemSearchQuerySingle);
