import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Col, Form, Input, Menu, Row, Select, Space, Table, Dropdown, message, Modal } from "antd";
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS2699155_CalculateFormulaInput from "./WS2699155_CalculateFormulaInput";
import WS2699183_Copy from "./WS2699183_Copy";
import InspectValueCalculateAutoMaintainAction from 'redux/InspectionMaintenance/InspectValueCalculateAutoMaintain/InspectValueCalculateAutoMaintain.actions'
class WS2699142_InspectValueCalculateAutoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
 
    // document.title = '検査値自動計算保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      exam_name: '',
      isLoading: false,
    };
  }
componentDidMount(){
 this.getDataSearch()
}
getDataSearch(){
  this.setState({isLoading: true})
  const data = {SearchChar:this.formRef.current?.getFieldValue("SearchChar").trim(), InspectItemsSearch:this.formRef.current?.getFieldValue("InspectItemsSearch"),
          GenderSearch:this.formRef.current?.getFieldValue("GenderSearch")}
  InspectValueCalculateAutoMaintainAction.getDataSearch(data).then(res=>{
    this.formRef.current?.setFieldsValue({
      tableData: res
    })
  }).catch(error =>{
    const res = error.response;
    if(!res || res.data || res.data.message){
      message.error('エラーが発生しました');
    }

  }).finally(()=>this.setState({isLoading: false}))
}
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  };

  onFinish(values) {

  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  render() {
    return (
      <div className="inspect-value-calculate-auto-maintain">
        <Card title="検査値自動計算保守">
          <Form ref={this.formRef} autoComplete="off" onFinish={this.onFinish} 
            initialValues={{ GenderSearch: 0, SearchChar:"" ,InspectItemsSearch:""}}>
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item name="SearchChar" label="検索" >
                  <Input maxLength={100} onBlur={()=>this.getDataSearch()} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Space>
                  <Form.Item name="InspectItemsSearch" label="検査コード" >
                    <Input.Search style={{ width: '120px' }} 
                    onChange={(e)=>{ 
                        let val = e.target.value
                        if(!this.isEmpty(val)){
                          if(!isNaN(val)){
                            if(val.length > 8){
                             this.formRef.current?.setFieldsValue({
                              InspectItemsSearch: val.slice(0,8)
                             })
                             this.forceUpdate()
                           }
                          }else{
                            this.formRef.current.setFieldsValue({
                              InspectItemsSearch: ""
                            })
                          } 
                        } 
                    }} 
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: (<WS0271001_InspectItemSearchQuerySingle
                            onFinishScreen={(output) => {
                              this.formRef.current.setFieldsValue({
                                InspectItemsSearch: output.Lio_InspectItemCode,
                                exam_name: output.recordData.exam_name
                              });
                              this.forceUpdate()
                              this.closeModal()
                              this.getDataSearch()   
                            }}
                          />),
                        },
                      })
                    }}
                    onBlur={()=>this.getDataSearch()}
                    />
                  </Form.Item>
                  <Form.Item>
                    <div>{this.formRef.current?.getFieldValue("exam_name")}</div>
                  </Form.Item>
                </Space>
              </Col>
              <Col span={6}>
                <Form.Item name="GenderSearch" label="性別" >
                  <Select style={{ width: '100px' }} onChange={()=>this.getDataSearch()} >
                    <Select.Option value={""}>　　</Select.Option>
                    <Select.Option value={0}>共通</Select.Option>
                    <Select.Option value={1}>男性</Select.Option>
                    <Select.Option value={2}>女性</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row> 
            <Table dataSource={this.formRef.current?.getFieldValue("tableData")?this.formRef.current?.getFieldValue("tableData"): []} size='small' 
              loading={this.state.isLoading}
              rowKey={(record)=>record.id}
              size="small" bordered={true}
              pagination={false}
              scroll={{y: 600}} 
              onRow={(record, rowIndex) => {
                return { 
                  onDoubleClick: () => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 1200,
                        component: (
                          <WS2699155_CalculateFormulaInput
                            Li_InspectCode = {record?.W1_inspect_item}
                            Li_Gender = {record?.Gender} 
                            Li_RowSelect = {record}
                            onFinishScreen={(output) => {
                              this.getDataSearch()
                             this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                  }  
                };
              }}
             >
              <Table.Column title="検査コード" dataIndex="W1_inspect_item" />
              <Table.Column title="名　称" dataIndex="exam_name" />
              <Table.Column title="性別" dataIndex="Gender" />
              <Table.Column title="端数処理" dataIndex="Rounding" />
              <Table.Column title="有効" dataIndex="EffectivePresence" />
              <Table.Column title="入力" dataIndex="InputPresence" />
              <Table.Column title="計算式" dataIndex="Expression_49" />
              <Table.Column title="備考" dataIndex="Expression_52" />
              <Table.Column width={80} render={(text, record, index) => (
                <Dropdown.Button size='small' overlay={() => (
                  <Menu >
                    <Menu.Item onClick={() => (
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1200,
                          component: (
                            <WS2699155_CalculateFormulaInput
                              Li_InspectCode = {record?.W1_inspect_item}
                              Li_Gender = {record?.Gender} 
                              Li_RowSelect = {record}
                              onFinishScreen={(output) => {
                               this.closeModal()
                              }}
                            />
                          ),
                        },
                      })
                    )}>新規</Menu.Item>
                    <Menu.Item onClick={() => (
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          centered: true,
                          width: 1200,
                          component: (
                            <WS2699155_CalculateFormulaInput
                              Li_InspectCode = {record?.W1_inspect_item}
                              Li_Gender = {record?.Gender} 
                              Li_RowSelect = {record}
                              onFinishScreen={(output) => {
                                this.closeModal()
                               }}
                            />
                          ),
                        },
                      })
                    )}>修正</Menu.Item>
                    <Menu.Item onClick={() => {
                      Modal.confirm({
                        content: "削除を行いますか",
                        onOk: () => {
                          // do something
                        },
                      })
                    }}>削除</Menu.Item>
                    <Menu.Item onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          centered: true,
                          width: 500,
                          component: (
                            <WS2699183_Copy
                              Li_InspectItemCopySource = {record.W1_inspect_item}
                              Li_GenderCopySource = {record?.W1_sex}
                              Li_TableCheck = {this.formRef.current?.getFieldValue("tableData")? this.formRef.current?.getFieldValue("tableData") : []}
                              onFinishScreen={(output) => {
                                this.getDataSearch()
                                this.closeModal()
                               }}
                            />
                          ),
                        },
                      })
                    }}>複写</Menu.Item>
                  </Menu>
                )}></Dropdown.Button>
              )}
              />
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2699142_InspectValueCalculateAutoMaintain);
