import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import { Card, Checkbox, Col, DatePicker, Form, Input, message, Modal, Row, Space, Spin, Table, Button } from "antd";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
import WS0364005_EffectiveDateSelect from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0364005_EffectiveDateSelect.jsx';
import WS0364007_ConditionExpressSet from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0364007_ConditionExpressSet.jsx';
import WS0285001_JudgeQuery from 'pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery.jsx';
import WS0367002_Copy from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0367002_Copy.jsx';
import React, { isValidElement } from "react";
import { connect } from "react-redux";
import InspectDecisionAloneSettingSeparatelyAction from 'redux/InspectionMaintenance/InspectItemJudgeValueSetting/InspectDecisionAloneSettingSeparately.action';
import Color from 'constants/Color'
import  ModalDraggable  from "components/Commons/ModalDraggable";

const styFrm = {
  marginBottom: '0px'
}
class WS0364001_InspectDecisionAloneSettingMerged extends React.Component {
  formRef = React.createRef();
  formRef2 = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '検査判定単体設定[併合]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      StsSynchronization: 0,
      isloaddingTable1: false,
      isloaddingTable2: false,
      count: "a",
      StsCommonClassify: ""
    };
  }
  componentDidMount() {
    this.Gzoom_EffectiveDateChar364()
    if (!this.isEmpty(this.props?.Li_JudgeLevel)) {
      this.GetScreenData364()
    } 
  }
  componentDidUpdate(prev) {
    if (prev.Li_InspectCode !== this.props.Li_InspectCode || prev.Li_JudgeLevel !== this.props.Li_JudgeLevel || prev.Li_InspectType != this.props.Li_InspectType
      || prev.Li_InspectCmtCode !== this.props.Li_InspectCmtCode || prev.Li_SpecifiedDate !== this.props.Li_SpecifiedDate) {
      this.Gzoom_EffectiveDateChar364()
      if (!this.isEmpty(this.props?.Li_JudgeLevel)) {
        this.GetScreenData364()
      }
    }
  } 
  GetScreenData364() {
    this.setState({ isloadFrm: true })
    let data = {
      test_item_code: this.props.Li_InspectCode, Lio_JungleLevel: this.props.Li_JudgeLevel, exam_type: this.props.Li_InspectType,
      exam_comment_code: this.props.Li_InspectCmtCode, Li_SpecifiedDate: this.props.Li_SpecifiedDate
    }
    InspectDecisionAloneSettingSeparatelyAction.GetScreenData364(data).then(res => {
      this.setState({ StsSynchronization: res.StsSynchronization, StsCommonClassify: res.StsCommonClassify })
      if (!this.formRef.current?.getFieldValue("StsDateAdoptionPresence")) {
        res.EffectiveDateChar = moment(res.EffectiveDateChar).format("YYYY/MM/DD") === "Invalid date"() ? moment(null) : moment(res.EffectiveDateChar)
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
  GetDataDetail(gender) {
    gender === 1 ? this.setState({ isloaddingTable1: true }) : this.setState({ isloaddingTable2: true })
    const obj = {
      test_item_code: this.props.Li_InspectCode, Lio_JungleLevel: this.props.Li_JudgeLevel, exam_type: this.props.Li_InspectType,
      exam_comment_code: this.props.Li_InspectCmtCode,
      EffectiveDateChar: moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") === "Invalid date" ? "0000/00/00"
        : moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD"),
      Li_Gender: gender, Expression_4: this.formRef.current?.getFieldValue("Expression_4")
    }
    InspectDecisionAloneSettingSeparatelyAction.GetDataDetail364(obj).then(res => {
      if (gender === 1) {
        let dataFormat = res?.getScreenData
        dataFormat.tableListData = res.tableListData
        this.formRef.current?.setFieldsValue(dataFormat)
        this.forceUpdate()
      } else if (gender === 2) {
        let dataFor = res?.getScreenData
        dataFor.tableListData = res.tableListData
        this.formRef2.current?.setFieldsValue(dataFor)
        this.forceUpdate()
      }

    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => gender === 1 ? this.setState({ isloaddingTable1: false }) : this.setState({ isloaddingTable2: false }))
  }
  Gzoom_EffectiveDateChar364() {
    let obj = { test_item_code: this.props.Li_InspectCode, Lio_JungleLevel: this.props.Li_JudgeLevel }
    InspectDecisionAloneSettingSeparatelyAction.Gzoom_EffectiveDateChar364(obj).then(res => {
      this.formRef.current?.setFieldsValue({
        StsDateAdoptionPresence: res?.StsDateOfAdoptionPresence
      })
      this.forceUpdate()
    })
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  showWConditionExpressSet = (index) => {
    const namePath = ['tableListData', index, 'EquationDisplay']
    this.setState({
      ...this.state,
      childModal: {
        width: '60%',
        visible: true,
        component: (<WS0364007_ConditionExpressSet
          Lio_ConditionalExpression={this.formRef.current?.getFieldValue("formula")}
          onFinishScreen={(output) => {
            this.formRef.current?.setFields([{
              name: namePath,
              value: output?.recordData?.EquationDisplay
            }])
            this.forceUpdate()
            this.closeModal()
          }}
        />)
      }
    });
  }
  showWS0285001_JudgeQuery = () => {
    this.setState({
      ...this.state,
      childModal: {
        width: 500,
        visible: true,
        component: (<WS0285001_JudgeQuery
          Li_JudgeLevel={this.formRef.current?.getFieldValue("Li_JudgeLevel")}
          Lio_Judge={this.formRef.current?.getFieldValue("judgment_result")}
          onFinishScreen={(output) => {
            this.formRef.current?.setFieldsValue({
              judgment_result: output?.Lio_Judge
            })
            this.closeModal()
          }}
        />)
      }
    });
  }
  handleAdd() {
    const { count } = this.state;
    const newData = { id: count, serial_number: "", EquationDisplay: "", judgment_result: "", guidance_comment_code: "", comment_content: "", priority: "" };
    let data = [...this.formRef.current?.getFieldValue("tableListData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableListData: data,
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
    let arr = [...this.formRef.current?.getFieldValue("tableListData")];
    if (isNaN(record.id)) {
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1)
          this.formRef.current?.setFieldsValue({
            tableListData: arr
          })
          this.forceUpdate()
        }
      })
    }
  }
  UpdateAndInsert(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableListData")];
    arr?.map((value, index) => {
      if (value.id === record.id) {
        let data = value;
        data.formula = value.EquationDisplay
        let obj = {
          test_item_code: this.props.Li_InspectCode, Lio_JungleLevel: this.props.Li_JudgeLevel, exam_type: this.props.Li_InspectType,
          exam_comment_code: this.props.Li_InspectCmtCode,
          EffectiveDateChar: moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") === "Invalid date" ? "0000/00/00"
            : moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD"),
          Li_Gender: 1, Expression_4: this.formRef.current?.getFieldValue("Expression_4")
          , StsSynchronization: this.formRef.current?.getFieldValue("StsSynchronization") ? 1 : 0
        }
        let objSave = { ...data, ...obj }
        if (isNaN(record.id)) {
          objSave.id = ""
          this.UpdateDataList364(objSave);
        } else {
          this.UpdateDataList364(objSave)
        }
      }
    })
  }
  UpdateDataList364(data) {
    this.setState({ isloaddingTable1: true });
    InspectDecisionAloneSettingSeparatelyAction.UpdateDataList364(data).then(res => {
      this.GetDataDetail(1)
      this.GetDataDetail(2)
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isloaddingTable1: false }))
  }
  CheckColor(id) {
    if (id === 0) {
      return Color(287)
    } else if (id === 1) {
      return Color(281)
    } else Color(262)
  }
  ShowWS0367002_Copy(){
    this.setState({
      ...this.state,
      childModal: {
        width: 1000,
        visible: true,
        component: (<WS0367002_Copy 
          Li_JudgeMethod = {1}
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
  render() {
    return (
      <div className="inspect-decision-alone-setting-merged">
        <Form
          ref={this.formRef}
          autoComplete="off" 
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
                          component: (<WS0364005_EffectiveDateSelect
                            Lio_AdoptionDate={moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD") === "Invalid date" ? "0000/00/00"
                              : moment(this.formRef.current?.getFieldValue("EffectiveDateChar")).format("YYYY/MM/DD")}
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
                  <Form.Item style={{ ...styFrm, border: '1px solid #E3E4E1 ', background: this.CheckColor(this.state.StsCommonClassify)?.Background }}>
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
                  <span>&emsp;{this.formRef.current?.getFieldValue("Expression_24")}&emsp;</span>
                </Form.Item>
                <Form.Item name="ReferenceValue" label="基準値">
                  <Input maxLength={25} style={{ width: '300px' }} readOnly />
                </Form.Item>
                <Form.Item name="AllowableRangeF" label="許容範囲">
                  <Input maxLength={10} readOnly />
                </Form.Item>
                <Form.Item>
                  ~
                  </Form.Item>
                <Form.Item name="AllowableRangeT" >
                  <Input maxLength={10} readOnly />
                </Form.Item>
              </Space>
              <Table dataSource={this.formRef.current?.getFieldValue("tableListData") ? this.formRef.current?.getFieldValue("tableListData") : []}
                size="small" bordered={true}
                pagination={false}
                rowKey={(record) => record.id}
                scroll={{ y: '20vh' }}>
                <Table.Column title="SEQ" dataIndex="serial_number" render={(value, record, index) => {
                  return <Form.Item style={styFrm} name={['tableListData', index, 'serial_number']}>
                    <Input.Search maxLength={3} onSearch={() => this.showWConditionExpressSet(index)} />
                  </Form.Item>
                }} />
                <Table.Column title="条件式" dataIndex="EquationDisplay" render={(value, record, index) => {
                  return <Form.Item style={styFrm} name={['tableListData', index, 'EquationDisplay']}>
                    <Input.Search maxLength={1024} onSearch={() => this.showWConditionExpressSet(index)} />
                  </Form.Item>
                }} />
                <Table.Column title="判定" width={100} dataIndex="judgment_result" render={(value, record, index) => {
                  return <Form.Item style={styFrm} name={['tableListData', index, 'judgment_result']}>
                    <Input.Search maxLength={3} onSearch={() => this.showWS0285001_JudgeQuery()} />
                  </Form.Item>
                }} />
                <Table.Column title="コメント" dataIndex="guidance_comment_code" render={(value, record, index) => {
                  return <Form.Item style={styFrm} name={['tableListData', index, 'guidance_comment_code']}>
                    <Input.Search maxLength={500} />
                  </Form.Item>
                }} />
                <Table.Column title="指導内容" dataIndex="comment_content" />
                <Table.Column title="優先" dataIndex="priority" render={(value, record, index) => {
                  return <Form.Item style={styFrm} name={['tableListData', index, 'priority']}>
                    <Input maxLength={1} />
                  </Form.Item>
                }} />
                <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.handleAdd()}  ></Button>}
                  render={(text, record, index) => {
                    return <>
                      <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                        onClick={() => this.UpdateAndInsert(record)}
                      ></Button>
                      <Button size='small' style={{ border: 'none', display: isNaN(record.id) ? '' : 'none' }} danger icon={<DeleteOutlined />}
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
        <Form ref={this.formRef2} >
          <Card className="mb-1">
            <Spin spinning={this.state.isloaddingTable2} >
              <Space>
                <Form.Item style={{ background: 'blue' }}>
                  <span>&emsp;{this.formRef2.current?.getFieldValue("Expression_24")}&emsp;</span>
                </Form.Item>
                <Form.Item name="ReferenceValue" label="基準値">
                  <Input maxLength={25} style={{ width: '300px' }} readOnly />
                </Form.Item>
                <Form.Item name="AllowableRangeF" label="許容範囲">
                  <Input maxLength={10} readOnly />
                </Form.Item>
                <Form.Item>
                  ~
                  </Form.Item>
                <Form.Item name="AllowableRangeT" >
                  <Input maxLength={10} readOnly />
                </Form.Item>
              </Space>
              <Table
                dataSource={this.formRef2.current?.getFieldValue('tableListData') ? this.formRef2.current?.getFieldValue('tableListData') : []}
                size="small" bordered={true}
                pagination={false}
                rowKey={(record) => record.id}
                scroll={{ y: '20vh' }}
              >
                <Table.Column title="SEQ" dataIndex="serial_number" />
                <Table.Column title="条件式" dataIndex="EquationDisplay" />
                <Table.Column title="判定" width={80} dataIndex="judgment_result" />
                <Table.Column title="コメント" dataIndex="guidance_comment_code" />
                <Table.Column title="指導内容" dataIndex="comment_content" />
                <Table.Column title="優先" dataIndex="priority" />
              </Table>
            </Spin>
          </Card>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0364001_InspectDecisionAloneSettingMerged);
