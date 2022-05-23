import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import { SaveOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, message, Modal, Row, Select, Space, Spin, Table } from "antd";
import moment from 'moment';
import WS0363001_InspectDecisionAloneSettingSeparately from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0363001_InspectDecisionAloneSettingSeparately.jsx';
import WS0364001_InspectDecisionAloneSettingMerged from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0364001_InspectDecisionAloneSettingMerged.jsx';
import WS0365001_DetailsExtract from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0365001_DetailsExtract.jsx';
import WS0367002_Copy from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0367002_Copy.jsx';
import WS0367003_Delete from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0367003_Delete.jsx';
import WS0367004_UseInspect from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0367004_UseInspect.jsx';
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import InspectItemJudgeValueSettingAction from 'redux/InspectionMaintenance/InspectItemJudgeValueSetting/InspectItemJudgeValueSetting.actions';
import  ModalDraggable  from "components/Commons/ModalDraggable";
const dateFormat = 'YYYY/MM/DD';

class WS0362001_InspectItemJudgeValueSetting extends React.Component {
  static propTypes = {
    Li_InspectItemCopySource: PropTypes.any,
    Li_GenderCopySource: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.formRef2 = React.createRef();
    // document.title = '検査項目判定値設定';

    this.state = {
      selectedRows: {},
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      Lio_JudgeLevel: [],
      isloaddingFrm2: false,
      checkColor: {},
      AnnexationJudge: [],
      JudgeLevel:"",  
    };
  }
  componentDidMount() {
    this.GetScrrenData()
  }
  GetScrrenData() {
    InspectItemJudgeValueSettingAction.GetScreenData().then(res => {
      if (res) {
        const frm1 = { Effective: res.Effective, Use: res.Use, Expression_18: res.Expression_18 }
        this.formRef.current?.setFieldsValue(frm1)
        this.setState({
          Lio_JudgeLevel: res?.Lio_JudgeLevel,
          AnnexationJudge: res?.AnnexationJudge,
          checkColor: res?.AnnexationJudge?.[0],
          JudgeLevel:res?.Lio_JudgeLevel?.[0]?.condition_2
        })
        this.formRef2.current?.setFieldsValue({
          Lio_JudgeLevel: res?.Lio_JudgeLevel?.[0]?.condition_2
        })
        this.forceUpdate()
        //get tableData
        const data = {
          ...frm1, AlreadySet: this.getValueForm("AlreadySet"), Lio_JudgeLevel: res?.Lio_JudgeLevel?.[0]?.condition_2,
          AnnexationJudge: res?.AnnexationJudge?.[0]?.value,
          DetailedText: this.formRef.current?.getFieldValue("DetailedText")? this.formRef.current?.getFieldValue("DetailedText") :"",
        }
        this.ExamList(data)
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    })

  }
  ExamList = (data) => {
    data.SearchChar = this.formRef.current?.getFieldValue("SearchChar")
    let check = false
    this.setState({ isloaddingFrm2: true})
    this.formRef2.current.setFieldsValue({ tableData: [] })
    InspectItemJudgeValueSettingAction.ExamList(data).then(res => {   
      if(res && res.length <1){
        this.setState({
          ...this.state.selectedRows,
          selectedRows: {}
        }) 
      }
      res?.map((value, index) => {
        if (value.AutomaticJudge === 1) {
          value.AutomaticJudge = true
        } else {value.AutomaticJudge = false }
        if(!check){
          if(this.state.selectedRows.test_item_code === value.test_item_code)
          check = true
        }
        if (res.length - 1 === index) { 
          this.formRef2.current.setFieldsValue({ tableData: res }) 
          if(!check){
            this.setState({
              ...this.state.selectedRows,
              selectedRows: res?.[0]
            }) 
          }  
        }
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isloaddingFrm2: false }))

  }
  getValueForm(namePath) {
    return this.formRef.current.getFieldValue(namePath) ? 1 : 0
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onFinish(values) { 
  }
  UpdateData(record) {
    this.setState({ isloaddingFrm2: true })
    const arr = [...this.formRef2.current?.getFieldValue("tableData")]
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].test_item_code === record.test_item_code) {
        const params = { test_item_code: record.test_item_code, AutomaticJudge: arr[i].AutomaticJudge ? 1 : 0 }
        InspectItemJudgeValueSettingAction.UpdateData(params).then(res => {
          const data = {
            Effective: this.getValueForm("Effective"), Use: this.getValueForm("Use"), AlreadySet: this.getValueForm("AlreadySet"),
            Lio_JudgeLevel: this.formRef2.current?.getFieldValue("Lio_JudgeLevel"),
            AnnexationJudge: this.state.checkColor?.value ? this.state.checkColor.value : 0,
            DetailedText: this.formRef.current?.getFieldValue("DetailedText") ? this.formRef.current?.getFieldValue("DetailedText") : ""
          }
          this.ExamList(data)
        }).catch(error => {
          const res = error.response;
          if (!res || res.data || res.data.message) {
            message.error('エラーが発生しました');
          }
        }).finally(() => this.setState({ isloaddingFrm2: false }))
        break;
      }
    }
  }
  onChangeCheck() { 
    const obj = {
      Effective: this.getValueForm("Effective"), Use: this.getValueForm("Use"), AlreadySet: this.getValueForm("AlreadySet"),
      Lio_JudgeLevel: this.formRef2.current?.getFieldValue("Lio_JudgeLevel"),
      AnnexationJudge: this.state.checkColor?.value ? this.state.checkColor.value : 0,
      DetailedText: this.formRef.current?.getFieldValue("DetailedText") ? this.formRef.current?.getFieldValue("DetailedText") : ""
    }
    this.ExamList(obj)
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  } 
  WS0367002_Copy(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1000,
        component: (
          <WS0367002_Copy
            Li_Division = {0}
            Li_JudgeMethod = {this.state.checkColor?.value ?this.state.checkColor?.value : 0 }
            Li_InspectCategory = {'J'}
            Li_JudgeCode ={0}
            Li_JudgeLevel = {0}
            Li_StartDate = {null}
            Li_Gender = {0}
            Li_StsJudgeCode = {false}
            Li_StsJudgeLevel = {false}
            Li_StsStartDate = {false}
            Li_StsGender = {false}
            onFinishScreen={(output) => {  
              this.closeModal()
            }}
          />),
      },
    })
  }
  ShowWS0367003_Delete(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 500,
        component: (
          <WS0367003_Delete
          Li_Division = {1}
          Li_JudgeMethod = {1}
          Li_InspectCategory = {'J'}
          Li_JudgeCode ={0}
          Li_JudgeLevel = {0}
          Li_StartDate = {null}
          Li_Gender = {0}
          Li_StsJudgeCode = {false}
          Li_StsJudgeLevel = {false}
          Li_StsStartDate = {false}
          Li_StsGender = {false}
            onFinishScreen={(output) => {  
              this.closeModal()
            }}
          />),
      },
    })
  }
  ShowWS0367004_UseInspect(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 500,
        component: (
          <WS0367004_UseInspect
            Li_Division = {2}
            Li_JudgeMethod = {1}
            Li_InspectCategory = {'J'}
            Li_JudgeCode ={0}
            Li_JudgeLevel = {0}
            Li_StartDate = {null}
            Li_Gender = {0}
            Li_StsJudgeCode = {false}
            Li_StsJudgeLevel = {false}
            Li_StsStartDate = {false}
            Li_StsGender = {false} 
            onFinishScreen={(output) => {  
              this.closeModal()
            }}
          />),
      },
    })
  }
  render() {
    var today = new Date().getFullYear() + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + ("0" + new Date().getDate()).slice(-2)
    return (
      <div className="inspect-item-judge-value-setting">
        <Card title={<Space>
          <Button onClick={()=>this.WS0367002_Copy()} >複写</Button>
          <Button onClick={()=>this.ShowWS0367003_Delete()} >削除</Button>
        </Space> }>
          <Form
            ref={this.formRef}
            initialValues={{ SpecifiedDateChar: moment(today), SearchChar:"" }}
            autoComplete="off"
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="OptionType"><Input /></Form.Item>
              <Form.Item name="OptionOption"><Input /></Form.Item>
              <Form.Item name="SpecifiedDate"><Input /></Form.Item>
              <Form.Item name="StsDateConvert"><Input /></Form.Item>
              <Form.Item name="AnnexationJudge"><Input /></Form.Item>
              <Form.Item name="DetailedText"><Input /></Form.Item>
              <Form.Item name="JudgeLevel"><Input /></Form.Item>
              <Form.Item name="EffectivePattern"><Input /></Form.Item>
            </div>
            <Row>
              <Col span={14}>
                <Form.Item name="SearchChar" label="検索&emsp;&emsp;">
                  <Input style={{ width: '98%' }} maxLength={256} onBlur={()=>this.onChangeCheck()} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Space>
                  <Form.Item name="SpecifiedDateChar" label="指定日付">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                  </Form.Item>
                  <Form.Item name="Effective" valuePropName="checked">
                    <Checkbox onChange={() => this.onChangeCheck()}>有効</Checkbox>
                  </Form.Item>
                  <Form.Item name="Use" valuePropName="checked">
                    <Checkbox onChange={() => this.onChangeCheck()}>使用</Checkbox>
                  </Form.Item>
                  <Form.Item name="AlreadySet" valuePropName="checked">
                    <Checkbox onChange={() => this.onChangeCheck()}>設定</Checkbox>
                  </Form.Item>
                  <Form.Item >
                    <Button style={{ background: "#FAFAC8" }}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 500,
                            component: (
                              <WS0365001_DetailsExtract
                                Li_JudgeMethod={this.state.checkColor?.value}
                                Lio_SetText={this.formRef.current?.getFieldValue("DetailedText")}
                                onFinishScreen={(output) => { 
                                  this.formRef.current?.setFieldsValue({
                                    DetailedText: output.Lio_SetText
                                  })
                                  this.onChangeCheck()
                                  this.forceUpdate()
                                  this.closeModal()
                                }}
                              />),
                          },
                        })
                      }} >{this.formRef.current?.getFieldValue("Expression_18")}</Button>
                  </Form.Item>
                  <Form.Item>
                    <Button style={{ background: this.state.checkColor?.value === 0 ? "#F3EEEB" : "#D7F5D7" }} onClick={() => {
                      if (this.state.AnnexationJudge?.indexOf(this.state.checkColor) === 0) {
                        this.setState({ checkColor: this.state.AnnexationJudge?.[1] })
                        this.onChangeCheck()
                      } else {
                        this.setState({ checkColor: this.state.AnnexationJudge?.[0] })
                        this.onChangeCheck()
                      } 
                      if(!this.state.checkColor?.value){
                        this.ShowWS0367004_UseInspect()
                       } 
                    }} >{this.state.checkColor?.text}</Button>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col span={8}>
              <Spin spinning={this.state.isloaddingFrm2} >
                <Form ref={this.formRef2} autoComplete="off" >
                  <Form.Item name="Lio_JudgeLevel" label="判定ﾚﾍﾞﾙ" style={{ width: '60%' }}>
                    <Select onChange={(val) =>{
                      this.setState({JudgeLevel: val})
                      this.onChangeCheck()}} >
                      {this.state.Lio_JudgeLevel?.map(value => (
                        <Select.Option key={"Lio_JudgeLevel-" + Math.random()} value={value?.condition_2}>{value?.item}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Table
                    dataSource={this.formRef2.current?.getFieldValue("tableData") ? this.formRef2.current?.getFieldValue("tableData") : []}
                    size="small" bordered={true}
                    pagination={false}
                    rowKey={(record) => record.id}
                    scroll={{ y: '69vh' }}
                    style={{ width: '98%' }}
                    rowSelection={{
                      type: 'radio',
                      onChange: async (selectedRowKeys, selectedRows) => {
                        await this.setState({
                          ...this.state.selectedRows,
                          selectedRows: selectedRows?.[0]
                        })
                      }
                    }}
                  >
                    <Table.Column title="コード" dataIndex="test_item_code" />
                    <Table.Column title="検査名称" dataIndex="exam_name" width={150} />
                    <Table.Column title="タイプ" dataIndex="Expression_32" />
                    <Table.Column title="単位" dataIndex="unit" />
                    <Table.Column title="○" width={50} dataIndex="AutomaticJudge" render={(value, record, index) => {
                      return <Form.Item name={['tableData', index, 'AutomaticJudge']} valuePropName="checked" style={{ marginBottom: '0px' }}>
                        <Checkbox> </Checkbox>
                      </Form.Item>
                    }} />
                    <Table.Column width={30} render={(text, record, index) => {
                      return <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: this.state.selectedRows.test_item_code === record.test_item_code ? 'green' : '' }} />}
                        onClick={() => this.UpdateData(record)} disabled={this.state.selectedRows.test_item_code === record.test_item_code ? false : true} />
                    }}
                    />
                  </Table>
                </Form>
              </Spin>
            </Col>
            <Col span={16}>
              {!this.state.checkColor?.value || this.state.checkColor?.value === 0 ?
                <WS0363001_InspectDecisionAloneSettingSeparately
                  Li_InspectCode={this.state.selectedRows?.test_item_code}
                  Li_JudgeLevel={this.state.JudgeLevel}
                  Li_InspectType={this.state.selectedRows?.exam_type}
                  Li_InspectCmtCode={this.state.selectedRows?.exam_comment_code}
                  Li_SpecifiedDate={ moment(this.formRef.current?.getFieldValue("SpecifiedDateChar")).format("YYYY/MM/DD")}
                /> :
                <WS0364001_InspectDecisionAloneSettingMerged
                  Li_InspectCode={this.state.selectedRows?.test_item_code}
                  Li_JudgeLevel={this.state.JudgeLevel}
                  Li_InspectType={this.state.selectedRows?.exam_type}
                  Li_InspectCmtCode={this.state.selectedRows?.exam_comment_code}
                  Li_SpecifiedDate={ moment(this.formRef.current?.getFieldValue("SpecifiedDateChar")).format("YYYY/MM/DD")}
                />
              }
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0362001_InspectItemJudgeValueSetting);
