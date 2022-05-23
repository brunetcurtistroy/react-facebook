import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { PlusOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { Card, Table, Form, Modal, Input, message,Button } from "antd";
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS1310002_ItemCheckupsForXml from 'pages/TM_SpecificInsureMaintenance/V4TK0050000_XmlParamMaintain/WS1310002_ItemCheckupsForXml.jsx';
import ItemConvertCodeTblMaintainAction from 'redux/SpecificInsureMaintenance/XmlParamMaintain/ItemConvertCodeTblMaintain.actions'
class WS1310001_ItemConvertCodeTblMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'V4-TKTH0000.項目変換コード表保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoading: false,
      count:"a"
    };
  }
  componentDidMount() {
    this.GetInit()
  }
  GetInit() {
    this.setState({ isLoading: true })
    ItemConvertCodeTblMaintainAction.GetInit().then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res ? res : []
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }

    }).finally(() => this.setState({ isLoading: false }))

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
  ShowInspectItemSearchQuerySingle(index) {
    const namePath = ['tableData', index, 'venus_exam_code'];
    const examShortName = ['tableData', index, 'exam_short_name']
    const examName = ['tableData', index, 'exam_name']
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1500,
        component: (<WS0271001_InspectItemSearchQuerySingle
          Lio_InspectItemCode={this.formRef.current?.getFieldValue(namePath)}
          onFinishScreen={(output) => {
            console.log(output)
            this.formRef.current.setFields([{
              name: namePath,
              value: output.Lio_InspectItemCode,
            }, {
              name: examName,
              value: output?.recordData?.exam_name
            }
              , {
              name: examName,
              value: output?.recordData?.exam_short_name
            }
            ]);
            this.forceUpdate()
            this.closeModal()
          }}
        />),
      },
    })
  }
  ShowItemCheckupsForXml(index) {
    const namePath = ['tableData', index, 'item_code_jlac10_15'];
    const namePath2 = ['tableData', index, 'result_identification_jlac10_2'];
    const namePath3 = ['tableData', index, 'ministry_item_name']
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1300,
        component: (<WS1310002_ItemCheckupsForXml
          InkIoitemCode={this.formRef.current?.getFieldValue(namePath)}
          InkIoresultIdentify={this.formRef.current?.getFieldValue(namePath2)}
          onFinishScreen={(output) => {
            this.formRef.current.setFields([{
              name: namePath,
              value: output.InkIoitemCode,
            },
            {
              name: namePath3,
              value: output.InkIoresultIdentify,
            },
            ]);
            this.forceUpdate()
            this.closeModal()
          }}
        />),
      },
    })
  }
  AddNewData() { 
    this.handleAdd();
  }
  handleAdd() {
    const { count } = this.state;
    const newData = { id: count, venus_exam_code: 0, item_code_jlac10_15  : "", result_identification_jlac10_2: "",
    exam_type: "",exam_short_name:"",exam_name:"" ,ministry_item_name:"", exam_methods:"" };
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1, 
    }) 
  }
  Save(record){ 
  let arr = [...this.formRef.current?.getFieldValue("tableData")];
    for(let indx = 0; indx <arr.length ; indx ++ ){
        if(arr[indx].id === record.id){ 
          if(isNaN(record.id)){
            let obj = {...arr[indx]};
            obj.id =""
            this.SaveData(obj)
            return
          }else{
            this.SaveData(arr[indx])
            return
          }
        }
    }
  }
  SaveData(obj){
    this.setState({isLoading:true})
    ItemConvertCodeTblMaintainAction.Save(obj).then(res=>{
      this.GetInit()
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
      } 
    }).finally(()=> this.setState({isLoading:false}))

  }
  Delete(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    if (isNaN(record.id)) {
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1)
          this.formRef.current?.setFieldsValue({
            tableData: arr
          })
          this.forceUpdate()
        }
      })
    } else {
     // delete DB   
      ItemConvertCodeTblMaintainAction.Delete({id: record.id}).then(res=>{
        this.GetInit()
      }) 
    }
  }
  render() {
    return (
      <div className="item-convert-code-tbl-maintain">
        <Card title="V4-TKTH0000.項目変換コード表保守">
          <Form ref={this.formRef} autoComplete="off" onFinish={this.onFinish}  >
            <Table
              dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
              loading={this.state.isLoading}
              rowKey={(record) => record.id + "*"}
              size="small" bordered={true}
              pagination={false}
              scroll={{ y: 600 }}
            >
              <Table.Column title="VENUSコード" width={150} dataIndex="venus_exam_code" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'venus_exam_code']} style={{ marginBottom: '0px' }} >
                  <Input.Search onSearch={() => this.ShowInspectItemSearchQuerySingle(index)} onChange={(e)=>{
                    const value = e.target.value;
                    const venusExamCode = ['tableData', index, 'venus_exam_code']
                    if(isNaN(value)){
                      this.formRef.current.setFields([{
                        name: venusExamCode,
                        value: 0
                      }])
                    }else{
                      if(value.length > 8){
                        this.formRef.current.setFields([{
                          name: venusExamCode,
                          value: value.slice(0,8)
                        }])
                      }
                    }
                  }} />
                </Form.Item>
              }} />
              <Table.Column title="項目コード" dataIndex="item_code_jlac10_15" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'item_code_jlac10_15']} style={{ marginBottom: '0px' }} >
                  <Input.Search onSearch={() => this.ShowItemCheckupsForXml(index)}  onChange={(e)=>{
                    const value = e.target.value;
                    const venusExamCode = ['tableData', index, 'item_code_jlac10_15'] 
                      if(value.length > 15){
                        this.formRef.current.setFields([{
                          name: venusExamCode,
                          value: value.slice(0,15)
                        }])
                      } 
                  }} />
                </Form.Item>
              }} />
              <Table.Column title="識別" width={50} dataIndex="result_identification_jlac10_2" />
              <Table.Column title="タイプ" width={80} dataIndex="exam_type" />
              <Table.Column title="検査略名" dataIndex="exam_short_name" />
              <Table.Column title="検査名称" dataIndex="exam_name" />
              <Table.Column title="厚労省項目名" dataIndex="ministry_item_name" />
              <Table.Column title="検査方法" dataIndex="exam_methods" />
              <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                render={(text, record, index) => {
                  return <>
                    <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.Save(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none' }} danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.Delete(record)
                        })
                      }}
                    ></Button>
                  </>
                }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1310001_ItemConvertCodeTblMaintain);
