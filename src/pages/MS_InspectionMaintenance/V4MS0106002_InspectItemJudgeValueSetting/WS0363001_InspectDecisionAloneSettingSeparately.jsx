import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, DatePicker, Form, Input, message, Modal, Row, Space, Spin, Table ,Button} from "antd";
import moment from 'moment';
import WS0274001_InspectCmtSearchQuery from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0274001_InspectCmtSearchQuery.jsx';
import WS0272001_CautionGuideNotesSearchQuery from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0272001_CautionGuideNotesSearchQuery.jsx';
import WS0363005_EffectiveDateSelect from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0363005_EffectiveDateSelect.jsx';
import WS0367002_Copy from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0367002_Copy.jsx';
import WS0285001_JudgeQuery from 'pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery.jsx';
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import Color from 'constants/Color'
import  ModalDraggable  from "components/Commons/ModalDraggable";

import InspectDecisionAloneSettingSeparatelyAction from 'redux/InspectionMaintenance/InspectItemJudgeValueSetting/InspectDecisionAloneSettingSeparately.action';
const styFrm = {
  marginBottom: '0px'
} 

class WS0363001_InspectDecisionAloneSettingSeparately extends React.Component {
  static propTypes = {
    Li_InspectCode: PropTypes.any,
    Li_JudgeLevel: PropTypes.any,
    Li_InspectType: PropTypes.any,
    Li_InspectCmtCode: PropTypes.any,
    Li_SpecifiedDate: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  formRef2 = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '検査判定単体設定[単品]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRow: {},
      isloadFrm: false,
      isloaddingTable1: false,
      isloaddingTable2: false,
      StsSynchronization: 0,
      count:"a",
      StsCommonClassify: ""
    };
  }
  componentDidMount() {
    this.Gzoom_EffectiveDateChar()
    if(!this.isEmpty(this.props?.Li_JudgeLevel)){ 
      this.GetScreenData() 
    }
      
  }
  componentDidUpdate(prev) {
    if(this.props!== prev){
      this.Gzoom_EffectiveDateChar()
      if(!this.isEmpty(this.props?.Li_JudgeLevel)){ 
        this.GetScreenData() 
      }
    }
  }
  onFinish(values) {
  }
  GetScreenData() {
    this.setState({ isloadFrm: true })
    let data = {
      test_item_code: this.props.Li_InspectCode  , Lio_JungleLevel: this.props.Li_JudgeLevel  , exam_type: this.props.Li_InspectType ,
      exam_comment_code: this.props.Li_InspectCmtCode  , Li_SpecifiedDate: this.props.Li_SpecifiedDate  
    }
    InspectDecisionAloneSettingSeparatelyAction.GetScreenData(data).then(res => {
      this.setState({StsSynchronization: res.StsSynchronization, StsCommonClassify: res.StsCommonClassify })
      if (!this.formRef.current?.getFieldValue("StsDateAdoptionPresence")) {
        res.EffectiveDateChar = this.CheckDateNull(res.EffectiveDateChar) ? moment(null) : moment(res.EffectiveDateChar)
      }
      res.StsSynchronization = res.StsSynchronization === 1 ? true : false
      this.formRef.current?.setFieldsValue(res)
      this.forceUpdate() 
      this.GetDataDetail(1)
      this.GetDataDetail(2)

    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isloadFrm: false }))

  }
  GetDataDetail( gender) {
    gender ===1 ? this.setState({ isloaddingTable1: true }) : this.setState({ isloaddingTable2: true })
    const obj = {
      test_item_code: this.props.Li_InspectCode  , Lio_JungleLevel: this.props.Li_JudgeLevel , exam_type: this.props.Li_InspectType  ,
      exam_comment_code: this.props.Li_InspectCmtCode  , 
      EffectiveDateChar: moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") ==="Invalid date" ?"0000/00/00"
                        :moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") ,
      Li_Gender: gender, Expression_4: this.formRef.current?.getFieldValue("Expression_4") 
    }
    InspectDecisionAloneSettingSeparatelyAction.GetDataDetail(obj).then(res => { 
      if(gender ===1 ){
        let dataFormat =  res?.screenData
        dataFormat.ListTableData = res.ListTableData
        this.formRef.current?.setFieldsValue(dataFormat)
        this.forceUpdate()
      }else if(gender === 2 ){
        let dataFor =  res?.screenData
        dataFor.ListTableData = res.ListTableData
        this.formRef2.current?.setFieldsValue(dataFor)
        this.forceUpdate()
      }
     
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => gender ===1 ? this.setState({ isloaddingTable1: false }) : this.setState({ isloaddingTable2: false }))
  }
  CheckDateNull(value) {
    return (value === undefined || value === null || value === '0000/00/00' || value === '0000-00-00') ? true : false
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  Gzoom_EffectiveDateChar(){
    let obj ={ test_item_code: this.props.Li_InspectCode ,Lio_JungleLevel:this.props.Li_JudgeLevel}
    InspectDecisionAloneSettingSeparatelyAction.Gzoom_EffectiveDateChar(obj).then(res=>{
       this.formRef.current?.setFieldsValue({
        StsDateAdoptionPresence: res.StsDateOfAdoptionPresence
       }) 
    })
  } 
  showWS0285001_JudgeQuery = (index) => {
    const namePath = ['ListTableData', index, 'judgment_result']
    this.setState({
      ...this.state,
      childModal: {
        width: 500,
        visible: true,
        component: (<WS0285001_JudgeQuery
          Li_JudgeLevel={this.props.Li_JudgeLevel}
          Lio_Judge={this.formRef.current?.getFieldValue(namePath)}
          onFinishScreen={(output) => {
            this.formRef.current?.setFields([{
              name: namePath,
              value: output?.Lio_Judge
            }])
            this.forceUpdate()
            this.closeModal()
          }}
        />)
      }
    });
  }
  ShowInspectCmtSearchQuery = (index) => {
    const nameLower = ['ListTableData', index, 'lower_limit_value']
    this.setState({
      ...this.state,
      childModal: {
        width: 700,
        visible: true,
        component: (<WS0274001_InspectCmtSearchQuery
          Lio_CmtClassify={this.props.Li_InspectCmtCode}
          LnkOutInspectCmtScreen={this.formRef.current?.getFieldValue(nameLower)}
          onFinishScreen={(output) => {
            this.formRef.current?.setFields([{
              name: nameLower,
              value: output?.LnkOutInspectCmtScreen
            }])
            this.forceUpdate()
            this.closeModal()
          }}
        />)
      }
    });
  }
  ShowCautionGuideNotesSearchQuery(index) {
    const nameGuidance = ['ListTableData', index, 'guidance_comment_code']
    const nameCommentcontent = ['ListTableData', index,'comment_content']
    this.setState({
      ...this.state,
      childModal: {
        width: 1300,
        visible: true,
        component: (<WS0272001_CautionGuideNotesSearchQuery
          Li_IdentifyCode={'S'}
          LnkOutCmtCode={this.formRef.current?.getFieldValue(nameGuidance)}
          onFinishScreen={(output) => { 
            this.formRef.current?.setFields([{
              name: nameGuidance,
              value: output?.LnkOutCmtCode
            },{
              name: nameCommentcontent,
              value: output?.recordData?.comment_content
            }
          ])
            this.forceUpdate()
            this.closeModal()
          }}
        />)
      }
    });
  }
  ShowWS0367002_Copy(){
    this.setState({
      ...this.state,
      childModal: {
        width:  1000,
        visible: true,
        component: (<WS0367002_Copy 
          Li_JudgeMethod = {0}
          Li_JudgeCode ={this.props.Li_InspectCode }
          Li_JudgeLevel = {this.props.Li_JudgeLevel }
          Li_StartDate = {  moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") ==="Invalid date" ?"0000/00/00"
          :moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") }
          Li_Gender = {1}
          Li_StsJudgeCode = {true}
          Li_StsJudgeLevel ={true}
          Li_StsStartDate = {true}
          Li_StsGender = {true}
          Li_JudgeLevelList = {0}
          onFinishScreen={(output) => {
            this.formRef.current.setFieldsValue({
              DetailedText:  output?.DetailedText
            }) 
            this.closeModal()
          }}
        />)
      }
    });
  }
  AddNewData() {
      this.handleAdd();
  } 
  handleAdd() {
    const { count } = this.state;
    const newData = { id: count, lower_limit_value: "",upper_limit_value:"",judgment_result:"",guidance_comment_code:"",comment_content:"",priority:""    };
    let data = [...this.formRef.current?.getFieldValue("ListTableData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData) 
    this.formRef.current?.setFieldsValue({
      ListTableData: data,
    }); 
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1, 
    })
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  Delete(record) {
      let arr = [...this.formRef.current?.getFieldValue("ListTableData")];
      if (isNaN(record.id)) {
        arr.map((value, index) => {
          if (value.id === record.id) {
            arr.splice(index, 1)
            this.formRef.current?.setFieldsValue({
              ListTableData: arr
            })
            this.forceUpdate()
          }
        })
      } 
    }
  UpdateScreen(){
    this.setState({isloadFrm: true})
    let obj ={ test_item_code: this.props.Li_InspectCode  ,
      Lio_JungleLevel: this.props.Li_JudgeLevel ,
      EffectiveDateChar: moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") ==="Invalid date" ?"0000/00/00"
      :moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") ,
      Expression_30 : this.formRef.current?.getFieldValue("Expression_30"),
      ReferenceValue: this.formRef.current?.getFieldValue("ReferenceValue"),
      AllowableRangeF: this.formRef.current?.getFieldValue("AllowableRangeF"),
      AllowableRangeT: this.formRef.current?.getFieldValue("AllowableRangeT"),}
    InspectDecisionAloneSettingSeparatelyAction.UpdateScreenData(obj).then(res=>{ 
    }).finally(()=>  this.setState({isloadFrm: false}))
  }
  UpdateAndInsert(record){
    let arrData = this.formRef.current?.getFieldValue("ListTableData");
    let arrChange = []
    for(let i= 0;i < arrData.length; i++){
       if(record.id === arrData[i].id){
         if( this.isEmpty(arrData[i].lower_limit_value)){
           return
         }
         this.formRef.current?.getFieldValue("ListTableData").map((value, index)=>{
            if(value.lower_limit_value  === arrData[i].lower_limit_value ){
               arrChange.push(value.lower_limit_value);
            }
            if(index === this.formRef.current?.getFieldValue("ListTableData").length - 1){ 
              if(arrChange.length < 2 ){
                let obj = { test_item_code: this.props.Li_InspectCode  , Lio_JungleLevel: this.props.Li_JudgeLevel , exam_type: this.props.Li_InspectType  ,
                  exam_comment_code: this.props.Li_InspectCmtCode  , 
                  EffectiveDateChar: moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") ==="Invalid date" ?"0000/00/00"
                  :moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") ,
                  Li_Gender: 1 , Expression_4: this.formRef.current?.getFieldValue("Expression_4") 
                  ,StsSynchronization :this.formRef.current?.getFieldValue("StsSynchronization") ?1 : 0 }
                  let objSave = {...arrData[i], ...obj}
                 if(isNaN(record.id)){ 
                   objSave.id = ""
                   this.SaveData(objSave)
                 }else{
                   this.SaveData(objSave)
                 }
              }
            }
         })
       }
    }
  }
SaveData(obj){
  this.setState({isloaddingTable1: true});
  InspectDecisionAloneSettingSeparatelyAction.UpdateDataList(obj).then(res=>{
      this.GetDataDetail(1)
      this.GetDataDetail(2)
  }).catch(error =>{
    const res = error.response;
    if(!res || res.data || res.data.message){
      message.error('エラーが発生しました');
    } 
  }).finally(()=> this.setState({isloaddingTable1: false})) 
}
 CheckColor(id){ 
    if(id === 0){ 
      return Color(287)
    }else if(id === 1){ 
      return Color(281)
    }else Color(262) 
  }
  render() {
    return (
      <div className="inspect-decision-alone-setting-separately">
        <Spin spinning={this.state.isloadFrm} >
          <Form
            ref={this.formRef} autoComplete="off" 
          >
            <Card className="mb-1">
              <Row>
                <Col span={6}>
                  {this.formRef.current?.getFieldValue("StsDateAdoptionPresence") ?
                    <Form.Item name="EffectiveDateChar" label="適用日" style={styFrm}>
                      <Input.Search onSearch={() => {
                        this.setState({
                          ...this.state,
                          childModal: {
                            width: 400,
                            visible: true,
                            component: (<WS0363005_EffectiveDateSelect
                              Lio_AdoptionDate={  moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") ==="Invalid date" ?"0000/00/00"
                              :moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD")  }
                              onFinishScreen={(output) => {
                                this.formRef.current.setFieldsValue({
                                  EffectiveDateChar: output.Lio_AdoptionDate
                                })
                                this.forceUpdate()
                                this.closeModal()
                              }}
                            />)
                          }
                        });
                      }}
                        onBlur={(e) => {
                          let valueData = this.formRef.current?.getFieldValue("EffectiveDateChar")
                          if (!(valueData === '0000/00/00' || valueData === '0' || valueData === '')) {
                            message.error("不正な日付です")
                            this.formRef.current.setFieldsValue({
                              EffectiveDateChar: '0000/00/00'
                            })
                          }
                        }} />
                    </Form.Item> :
                    <Form.Item name="EffectiveDateChar" label="適用日" style={styFrm}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} />
                    </Form.Item>
                  }
                </Col>
                <Col span={18} >
                  <Space style={{ float: 'right' }}>
                    <Form.Item name="StsSynchronization" label="同期" style={styFrm} valuePropName="checked" >
                      <Checkbox  onChange={(val)=>{
                       let value = val.target.checked;
                       if(value){
                         this.ShowWS0367002_Copy()
                       }else{
                        this.closeModal()
                       }
                     }} ></Checkbox>
                    </Form.Item>
                    <Form.Item style={{ ...styFrm, border:'1px solid #E3E4E1 ', background: this.CheckColor(this.state.StsCommonClassify)?.Background }}>
                      <span>&emsp;{this.formRef.current?.getFieldValue("Expression_4")}&emsp;</span>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </Card>
            <Card className="mb-1">
              <Spin spinning={this.state.isloaddingTable1} >
                <Space>
                  <Form.Item style={{ background: 'blue' }}>
                    <span>&emsp;{this.formRef.current?.getFieldValue("Expression_30")}&emsp;</span>
                  </Form.Item>
                  <Form.Item name="ReferenceValue" label="基準値">
                    <Input maxLength={25} style={{ width: '300px' }} />
                  </Form.Item>
                  <Form.Item name="AllowableRangeF" label="許容範囲">
                    <Input maxLength={10} />
                  </Form.Item>
                  <Form.Item>
                    ~
                  </Form.Item>
                  <Form.Item name="AllowableRangeT" >
                    <Input maxLength={10} />
                  </Form.Item> 
                </Space>
                <Form.Item style={{float:'right'}}>
                    <Button type="primary" onClick={()=>this.UpdateScreen()} >Save</Button>
                  </Form.Item>
                <Table  dataSource={this.formRef.current?.getFieldValue("ListTableData") ? this.formRef.current?.getFieldValue("ListTableData") : []}
                  size="small" bordered={true}
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ y: '20vh' }} 
                  >
                  <Table.Column title="下限値" dataIndex="lower_limit_value" render={(value, record, index) => {
                    return <Form.Item name={['ListTableData', index, 'lower_limit_value']} style={styFrm}>
                      <Input.Search maxLength={10} onSearch={() => {
                        let value = this.props?.Li_InspectType?.charAt(0);
                        if (value === 'X' || value === 'J') {
                          if (this.props.Li_InspectCmtCode > 0) {
                            this.ShowInspectCmtSearchQuery(index)
                          }
                        }
                      }}
                        onChange={(e) => {
                          let val = e.target.value
                          const namePath = ['ListTableData', index, 'judgment_result']
                          if (val.length > 10) {
                            this.formRef.current?.setFields([{
                              name: namePath,
                              value: val.slice(0, 10)
                            }])
                          }
                        }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="上限値" dataIndex="upper_limit_value" render={(value, record, index) => {
                    return <Form.Item name={['ListTableData', index, 'upper_limit_value']} style={styFrm}>
                      <Input maxLength={10} />
                    </Form.Item>
                  }} />
                  <Table.Column title="判定" width={100} dataIndex="judgment_result" render={(value, record, index) => {
                    return <Form.Item name={['ListTableData', index, 'judgment_result']} style={styFrm}>
                      <Input.Search maxLength={3} onSearch={() => this.showWS0285001_JudgeQuery(index)}
                        onChange={(e) => {
                          let val = e.target.value
                          const namePath = ['ListTableData', index, 'judgment_result']
                          if (val.length > 3) {
                            this.formRef.current?.setFields([{
                              name: namePath,
                              value: val.slice(0, 3)
                            }])
                          }
                        }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="コード" dataIndex="guidance_comment_code" render={(value, record, index) => {
                    return <Form.Item name={['ListTableData', index, 'guidance_comment_code']} style={styFrm}>
                      <Input.Search maxLength={5} onSearch={() => this.ShowCautionGuideNotesSearchQuery(index)} onChange={(e) => {
                        let val = e.target.value
                        const namePath = ['ListTableData', index, 'guidance_comment_code']
                        if (isNaN(val)) {
                          this.formRef.current?.setFields([{
                            name: namePath,
                            value: ""
                          }])
                        } else {
                          if (value.length > 5) {
                            this.formRef.current?.setFields([{
                              name: namePath,
                              value: val.slice(0, 5)
                            }])
                          }
                        }
                      }} />
                    </Form.Item>
                  }} />
                  <Table.Column title="指導ｺﾒﾝﾄ" dataIndex="comment_content" />
                  <Table.Column title="優先" dataIndex="priority" render={(value, record, index) => {
                    return <Form.Item name={['ListTableData', index, 'priority']} style={styFrm}>
                      <Input maxLength={1} onChange={(e) => {
                        let val = e.target.value
                        const namePath = ['ListTableData', index, 'priority']
                        if (isNaN(val)) {
                          this.formRef.current?.setFields([{
                            name: namePath,
                            value: ""
                          }])
                        }
                      }} />
                    </Form.Item>
                  }} />
                   <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                        render={(text, record, index) => {
                          return <>
                            <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                              onClick={() => this.UpdateAndInsert(record)}
                            ></Button>
                            <Button size='small' style={{ border: 'none', display: isNaN(record.id) ?'': 'none' }} danger icon={<DeleteOutlined />}
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
              </Spin>
            </Card>
          </Form>
          <Form ref={this.formRef2} autoComplete="off" >
            <Card className="mb-1">
              <Spin spinning={this.state.isloaddingTable2} >
                <Space>
                  <Form.Item style={{ background: 'red' }}>
                    <span>&emsp;{this.formRef2.current?.getFieldValue("Expression_30")}&emsp;</span>
                  </Form.Item>
                  <Form.Item name="ReferenceValue" label="基準値">
                    <Input maxLength={25} style={{ width: '300px' }} />
                  </Form.Item>
                  <Form.Item name="AllowableRangeF" label="許容範囲">
                    <Input maxLength={10} />
                  </Form.Item>
                  <Form.Item>  ~ </Form.Item>
                  <Form.Item name="AllowableRangeT"   >
                    <Input maxLength={10} />
                  </Form.Item>
                </Space>
                <Table
                 dataSource={this.formRef2.current?.getFieldValue('ListTableData') ? this.formRef2.current?.getFieldValue('ListTableData') : []}
                 size="small" bordered={true}
                 pagination={false}
                 rowKey={(record) => record.id} 
                 scroll={{y: '20vh'}}
                 >
                  <Table.Column title="下限値" dataIndex="lower_limit_value" />
                  <Table.Column title="上限値" dataIndex="upper_limit_value" />
                  <Table.Column title="判定" width={80} dataIndex="judgment_result" />
                  <Table.Column title="コード" dataIndex="guidance_comment_code" />
                  <Table.Column title="指導ｺﾒﾝﾄ" dataIndex="comment_content" />
                  <Table.Column title="優先" dataIndex="priority" />
                </Table>
              </Spin>
            </Card>
          </Form>
        </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0363001_InspectDecisionAloneSettingSeparately);
