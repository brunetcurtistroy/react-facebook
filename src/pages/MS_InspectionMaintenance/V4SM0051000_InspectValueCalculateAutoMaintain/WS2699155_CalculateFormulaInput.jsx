import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Select, Checkbox, Button, Space, Row, Col, Modal, Spin, message } from "antd";
import CalculateFormulaInputAction from 'redux/InspectionMaintenance/InspectValueCalculateAutoMaintain/CalculateFormulaInput.actions'
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import { getInspectItemSearchQuerySingleSistAction } from 'redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions';
import  ModalDraggable  from "components/Commons/ModalDraggable";

const { TextArea } = Input;
const colorBtm = {
  background: '#E1E1E1',
  width: '100px',
  colorBn: {
    background: '#E1E1E1',
  }
}
class WS2699155_CalculateFormulaInput extends React.Component {
  static propTypes = {
    Li_InspectCode: PropTypes.any,
    Li_Gender: PropTypes.any,
    Lo_Change: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = '計算式入力';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isloadding: false,
      Formula: "",
      timeOutId:null,
      initialValues: {
        SearchChar: '',
        StsUseInspect: 1, 
        Type: ''
      },   
    };
  }
  componentDidMount() {
    if (!sessionStorage.getItem("DataItemSearch")) {
      this.setState({ isloadding: true })
      getInspectItemSearchQuerySingleSistAction(this.state.initialValues).then((res)=>{
        sessionStorage.setItem("DataItemSearch", JSON.stringify(res))
      }).finally(() => this.setState({ isloadding: false }))
    }
    this.GetListData() 
  }
  componentDidUpdate(PreV) {
    if (this.props !== PreV) {
      this.GetListData()
    }
  }
  GetListData() {
    this.setState({ isloadding: true }) 
    let data = {
      InspectItems: this.isEmpty(this.props.Li_InspectCode) ? "" : this.props.Li_InspectCode,
      Gender: this.ConvertGender(this.props?.Li_Gender)
    }
    CalculateFormulaInputAction.GetListData(data).then(res => {
      this.formRef.current?.setFieldsValue(res)
      this.setState({
        Formula: res?.Formula
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))
  }
  ConvertGender(value) {
    if (this.isEmpty(value)) {
      return ""
    } else {
      if (value === "共通") {
        return 0
      } else if (value === "男") {
        return 1
      } else if (value === "女") {
        return 2
      }
    }
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  ShowWS0271001_InspectItemSearchQuerySingle(condition) {
    let value = this.GetValueByCondition(condition)
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1500,
        component: (
          <WS0271001_InspectItemSearchQuerySingle
            Lio_InspectItemCode={value}
            onFinishScreen={(output) => {
              this.SetValueByCondition(condition, output)
              this.closeModal()
            }}
          />
        ),
      },
    });
  } 
  GetValueByCondition = (condition) => {
    if (condition === "A") {
      return this.formRef.current?.getFieldValue("InspectCodeA")
    } else if (condition === "B") {
      return this.formRef.current?.getFieldValue("InspectCodeB")
    } else if (condition === "C") {
      return this.formRef.current?.getFieldValue("InspectCodeC")
    } else if (condition === "D") {
      return this.formRef.current?.getFieldValue("InspectCodeD")
    } else if (condition === "E") {
      return this.formRef.current?.getFieldValue("InspectCodeE")
    } else if (condition === "F") {
      return this.formRef.current?.getFieldValue("InspectCodeF")
    } else if (condition === "G") {
      return this.formRef.current?.getFieldValue("InspectCodeG")
    } else if (condition === "H") {
      return this.formRef.current?.getFieldValue("InspectCodeH")
    } else if (condition === "I") {
      return this.formRef.current?.getFieldValue("InspectCodeI")
    } else if (condition === "J") {
      return this.formRef.current?.getFieldValue("InspectCodeJ")
    } else {
      return this.formRef.current?.getFieldValue("InspectCode")
    }
  }
  SetValueByCondition = (condition, output) => {
    if (condition === "A") {
      this.formRef.current?.setFieldsValue({
        InspectCodeA: output?.Lio_InspectItemCode,
        exam_short_name_HJ: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else if (condition === "B") {
      this.formRef.current?.setFieldsValue({
        InspectCodeB: output?.Lio_InspectItemCode,
        exam_short_name_HL: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else if (condition === "C") {
      this.formRef.current?.setFieldsValue({
        InspectCodeC: output?.Lio_InspectItemCode,
        exam_short_name_HN: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else if (condition === "D") {
      this.formRef.current?.setFieldsValue({
        InspectCodeD: output?.Lio_InspectItemCode,
        exam_short_name_HP: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else if (condition === "E") {
      this.formRef.current?.setFieldsValue({
        InspectCodeE: output?.Lio_InspectItemCode,
        exam_short_name_HR: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else if (condition === "F") {
      this.formRef.current?.setFieldsValue({
        InspectCodeF: output?.Lio_InspectItemCode,
        exam_short_name_HT: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else if (condition === "G") {
      this.formRef.current?.setFieldsValue({
        InspectCodeG: output?.Lio_InspectItemCode,
        exam_short_name_HV: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else if (condition === "H") {
      this.formRef.current?.setFieldsValue({
        InspectCodeH: output?.Lio_InspectItemCode,
        exam_short_name_HX: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else if (condition === "I") {
      this.formRef.current?.setFieldsValue({
        InspectCodeI: output?.Lio_InspectItemCode,
        exam_short_name_HZ: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else if (condition === "J") {
      this.formRef.current?.setFieldsValue({
        InspectCodeJ: output?.Lio_InspectItemCode,
        exam_short_name_IB: output?.recordData?.exam_short_name
      })
      this.forceUpdate()
    } else {
      this.formRef.current?.setFieldsValue({
        InspectCode: output?.Lio_InspectItemCode,
        exam_name: output?.recordData?.exam_name
      })
      this.forceUpdate()
    }
  }
  setStateFormula(condition) {
    let value = ""
    if (condition === "A") {
      value = "[検査A]"
    } else if (condition === "B") {
      value = "[検査B]"
    } else if (condition === "C") {
      value = "[検査C]"
    } else if (condition === "D") {
      value = "[検査D]"
    } else if (condition === "E") {
      value = "[検査E]"
    } else if (condition === "F") {
      value = "[検査F]"
    } else if (condition === "G") {
      value = "[検査G]"
    } else if (condition === "H") {
      value = "[検査H]"
    } else if (condition === "I") {
      value = "[検査I]"
    } else if (condition === "J") {
      value = "[検査J]"
    } else if (condition === "年齢") {
      value = "[年齢]"
    } else if (condition === "＋") {
      value = "+"
    } else if (condition === "－") {
      value = "-"
    } else if (condition === "×") {
      value = "*"
    } else if (condition === "÷") {
      value = "/"
    } else if (condition === "累乗") {
      value = "^"
    } else if (condition === "(") {
      value = "("
    } else if (condition === ")") {
      value = ")"
    } 
    this.setState((prevState) => {
      let val = (prevState.Formula + value)?.length > 1000 ? (prevState.Formula + value).slice(0, 1000): prevState.Formula + value ;
      this.formRef.current?.setFieldsValue({
              Formula: val
            })  
        return {
          ...prevState,
          Formula: val
        } 
    },this.forceUpdate())
   
  } 
  RegisterBtn(){
    this.setState({isloadding: true})
    let data = {...this.formRef.current?.getFieldValue()}
    data.Li_InspectCode = this.isEmpty(this.props.Li_InspectCode) ? "" : this.props.Li_InspectCode
    data.Li_Gender = this.ConvertGender(this.props?.Li_Gender)
    data.Lo_change = false  
    CalculateFormulaInputAction.RegisterBtn(data).then(res=>{
      if(res){
        if(this.props.onFinishScreen){
          this.props.onFinishScreen()
        }
      } 
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))
  }
  OnChangeIn(e,condition){
    let value = e.target.value;
    if(isNaN(value)){
      let obj={Lio_InspectItemCode:""}
      this.SetValueByCondition (condition, obj )
    }else{
      if(value > 8){
        let obj={Lio_InspectItemCode: value.slice(0,8)}
       this.SetValueByCondition (condition, obj )
      }
    }
  }
  OnBlurIn(condition, value){   
    if(!this.isEmpty(value)){
      this.setState({isloadding: true})
      let item = sessionStorage.getItem('DataItemSearch')
      let listData = item ? JSON.parse(item) : []
      if(listData.length === 0){
        this.setState({isloadding: false})
      }else{
        let index=0;
        for(const obj of listData){
          index++
          if(parseInt(value) === parseInt(obj.test_item_code)){
            let objCheck ={Lio_InspectItemCode: value, recordData:obj}
            this.SetValueByCondition (condition, objCheck )
            this.setState({isloadding: false})
            return;
          } 
          if(index === listData.length){ 
            this.setState({isloadding: false})
          }
       }
      }
      
    }
    
  }
  render() {
    return (
      <div className="calculate-formula-input">
        <Card title="計算式入力">
          <Spin spinning={this.state.isloadding} >
            <Form ref={this.formRef} autoComplete="off"
              initialValues={{ Gender: "", Rounding: "",StsHandInput: false, UsePresence: false }}
            >
              <Row>
                <Col span={20} offset={1}>
                  <Space>
                    <Form.Item label="検査コード" name="InspectCode">
                      <Input.Search disabled={true}
                        //disabled={this.isEmpty(this.props.Li_InspectCode) || this.props.Li_InspectCode === 0 ? true : false}     
                        onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle(1)}
                      />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_name")}</span>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={20} offset={1}>
                  <Space>
                    <Form.Item label="&emsp;&emsp;&emsp;性別" name="Gender">
                      <Select style={{ width: '100px' }}>
                        <Select.Option value={0}>共通</Select.Option>
                        <Select.Option value={1}>男</Select.Option>
                        <Select.Option value={2}>女</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="端数処理" name="Rounding">
                      <Select style={{ width: '150px' }}>
                        <Select.Option value={0}>四捨五入</Select.Option>
                        <Select.Option value={1}>切り捨て</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;有効" name="UsePresence" valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;入力" name="StsHandInput" valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Form.Item label="検査項目" style={{ marginBottom: '0px' }} ></Form.Item>
              <Row>
                <Col span={11} offset={1} >
                  <Space>
                    <Form.Item name="InspectCodeA" label={<Button style={colorBtm.colorBn} onClick={() => {this.setStateFormula("A")}} >&emsp;A&emsp;</Button>}>
                      <Input.Search 
                      onBlur={(e)=>this.OnBlurIn("A",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"A")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("A")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_HJ")}</span>
                    </Form.Item>
                  </Space><br />
                  <Space>
                    <Form.Item name="InspectCodeB" label={<Button style={colorBtm.colorBn} onClick={() => this.setStateFormula("B")} >&emsp;B&emsp;</Button>}>
                      <Input.Search 
                      onBlur={(e)=>this.OnBlurIn("B",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"B")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("B")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_HL")}</span>
                    </Form.Item>
                  </Space><br />
                  <Space>
                    <Form.Item name="InspectCodeC" label={<Button style={colorBtm.colorBn} onClick={() => this.setStateFormula("C")} >&emsp;C&emsp;</Button>}>
                      <Input.Search 
                      onBlur={(e)=>this.OnBlurIn("C",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"C")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("C")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_HN")}</span>
                    </Form.Item>
                  </Space><br />
                  <Space>
                    <Form.Item name="InspectCodeD" label={<Button style={colorBtm.colorBn} onClick={() => this.setStateFormula("D")} >&emsp;D&emsp;</Button>}>
                      <Input.Search 
                      onBlur={(e)=>this.OnBlurIn("D",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"D")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("D")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_HP")}</span>
                    </Form.Item>
                  </Space><br />
                  <Space>
                    <Form.Item name="InspectCodeE" label={<Button style={colorBtm.colorBn} onClick={() => this.setStateFormula("E")} >&emsp;E&emsp;</Button>}>
                      <Input.Search 
                      onBlur={(e)=>this.OnBlurIn("E",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"E")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("E")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_HR")}</span>
                    </Form.Item>
                  </Space><br />
                </Col>
                <Col span={11} offset={1}>
                  <Space>
                    <Form.Item name="InspectCodeF" label={<Button style={colorBtm.colorBn} onClick={() => this.setStateFormula("F")} >&emsp;F &emsp;</Button>}>
                      <Input.Search 
                      onBlur={(e)=>this.OnBlurIn("F",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"F")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("F")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_HT")}</span>
                    </Form.Item>
                  </Space><br />
                  <Space>
                    <Form.Item name="InspectCodeG" label={<Button style={colorBtm.colorBn} onClick={() => this.setStateFormula("G")} >&emsp;G&emsp;</Button>}>
                      <Input.Search 
                      onBlur={(e)=>this.OnBlurIn("G",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"G")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("G")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_HV")}</span>
                    </Form.Item>
                  </Space><br />
                  <Space>
                    <Form.Item name="InspectCodeH" label={<Button style={colorBtm.colorBn} onClick={() => this.setStateFormula("H")} >&emsp;H&emsp;</Button>}>
                      <Input.Search 
                      onBlur={(e)=>this.OnBlurIn("H",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"H")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("H")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_HX")}</span>
                    </Form.Item>
                  </Space><br />
                  <Space>
                    <Form.Item name="InspectCodeI" label={<Button style={colorBtm.colorBn} onClick={() => this.setStateFormula("I")} >&emsp; I &emsp;</Button>}>
                      <Input.Search 
                      onBlur={(e)=>this.OnBlurIn("I",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"I")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("I")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_HZ")}</span>
                    </Form.Item>
                  </Space><br />
                  <Space>
                    <Form.Item name="InspectCodeJ" label={<Button style={colorBtm.colorBn} onClick={() => this.setStateFormula("J")} >&emsp; J &emsp;</Button>}>
                      <Input.Search  
                      onBlur={(e)=>this.OnBlurIn("J",e.target.value)}
                      onChange={(e)=>this.OnChangeIn(e,"J")}
                      onSearch={() => this.ShowWS0271001_InspectItemSearchQuerySingle("J")} />
                    </Form.Item>
                    <Form.Item >
                      <span>{this.formRef.current?.getFieldValue("exam_short_name_IB")}</span>
                    </Form.Item>
                  </Space><br />
                </Col>
              </Row>
              <Row>
                <Col span={23}  >
                  <Row justify="space-between">
                    <Col span={2} offset={1} ><Button style={colorBtm} onClick={() => this.setStateFormula("年齢")}>年齢</Button></Col>
                    <Col span={2}><Button style={colorBtm} onClick={() => this.setStateFormula("＋")}>＋</Button></Col>
                    <Col span={2}><Button style={colorBtm} onClick={() => this.setStateFormula("－")}>－</Button></Col>
                    <Col span={2}><Button style={colorBtm} onClick={() => this.setStateFormula("×")}>×</Button></Col>
                    <Col span={2}><Button style={colorBtm} onClick={() => this.setStateFormula("÷")}>÷</Button></Col>
                    <Col span={2}><Button style={colorBtm} onClick={() => this.setStateFormula("累乗")}>累乗</Button></Col>
                    <Col span={2}><Button style={colorBtm} onClick={() => this.setStateFormula("(")}>(</Button></Col>
                    <Col span={2}><Button style={colorBtm} onClick={() => this.setStateFormula(")")}>)</Button></Col>
                  </Row>
                </Col>
              </Row>
              <Form.Item label="計算式" style={{ marginBottom: '0px' }} ></Form.Item>
              <Form.Item name="Formula">
                <TextArea  autoSize={{ minRows: 3, maxRows: 5 }} maxLength={1000}
                 onChange={(e) => {
                   let value = e.target.value; 
                   if(this.state.timeOutId){
                      clearTimeout(this.state.timeOutId)
                   }
                   this.setState({  
                     timeOutId: setTimeout(()=>{
                        this.setState({
                          Formula: value
                        }) 
                     },300)
                   })  
                  }}/>
              </Form.Item>
              <Form.Item label="備　考" style={{ marginBottom: '0px' }} ></Form.Item>
              <Form.Item name="Remarks">
                <Input maxLength={100}    />
              </Form.Item>
              <Button type="primary" style={{ float: 'right' }} onClick={()=>this.RegisterBtn()} >登録</Button>
            </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2699155_CalculateFormulaInput);
