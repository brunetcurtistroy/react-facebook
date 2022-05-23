import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Modal, Row, Select, Table } from "antd";
import Color from 'constants/Color';
import WS0447011_ColorSample from 'pages/MS_InspectionMaintenance/V4MS9900700_DetermineLevelModify/WS0447011_ColorSample.jsx';
import WS0448001_DetermineLevelBulkModify from 'pages/MS_InspectionMaintenance/V4MS9900700_DetermineLevelModify/WS0448001_DetermineLevelBulkModify.jsx';
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import DetermineLevelModifyMasterCoerciveAction from 'redux/InspectionMaintenance/DetermineLevelModify/DetermineLevelModifyMasterCoercive.actions';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0447001_DetermineLevelModifyMasterCoercive extends React.Component {
  static propTypes = {
    Li_JudgeLevel: PropTypes.any,
    Li_BasicJudgeResultList: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS05700:判定レベル変換マスタ保';

    this.state = {
      isLoadding: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      JudgeLevel: [],
      count: "a",
      listColor: [],
      CodeColor:"",
      checkF10: false
    };
  }

  componentDidMount() { 
    this.forceUpdate()
    this.GetScreenData()
    this.DisplayList()
    this.GetColor()
  }
  GetColor() {
    DetermineLevelModifyMasterCoerciveAction.GetColor().then(res => {
      this.setState({
        listColor: res?.data
      })
    })
  }
  GetScreenData() {
    DetermineLevelModifyMasterCoerciveAction.GetScreenData().then(res => {
      this.setState({ JudgeLevel: res })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    })
  }
  DisplayList() {
    this.setState({ isLoadding: true })
    const data = { JudgeLevel: this.formRef.current?.getFieldValue("JudgeLevel") }
    DetermineLevelModifyMasterCoerciveAction.DisplayList(data).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isLoadding: false }))
  }
  onFinish(values) {

  }
  closeModal = () => {
    this.setState((prevState) => ({
      childModal: { ...prevState.childModal, visible: false },
    }));
  };
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  AddNewRow() { 
    this.handleAdd(); 
  }
  handleAdd() {
    const { count } = this.state;
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    const newData = {
      id: count,
      JudgeLevelChar: this.state.JudgeLevel?.[0]?.condition_1,
      W1_judge_result: "",
      W1_weight_judge: 0,
      W1_standard_judge_result: "",
      W1_judge_name: "",
      ColorSample: this.state.listColor?.[0]?.ColorSample,
      W1_web_color: ""
    }
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state.count,
      count: count + 1,
    })
  }
  Delete(record) {
    if (isNaN(record.id)) {
      let arr = [...this.formRef.current?.getFieldValue("tableData")];
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
      this.setState({isLoadding: true})
      DetermineLevelModifyMasterCoerciveAction.Delete({ id: record.id }).then(res => {
        this.DisplayList()
      }).catch(error =>{
        const res = error.response;
        if(!res || res.data || res.data.message){
          message.error('エラーが発生しました');
        } 
      }).finally(()=>this.setState({isLoadding: false}))
    }
  }
  SaveData(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    if(isNaN(record.id)) { 
      for(let idx = 0; idx < arr.length ; idx ++){
        if(arr[idx].id === record.id){
          if(this.isEmpty(arr[idx].W1_judge_result)){
            return
          }
           const dataSave = { JudgeLevelChar: arr[idx].JudgeLevelChar,
            W1_judge_result:  arr[idx].W1_judge_result,
            W1_weight_judge:  arr[idx].W1_weight_judge,
            W1_standard_judge_result:  arr[idx].W1_standard_judge_result,
            W1_judge_name:  arr[idx].W1_judge_name,
            ColorSample:  arr[idx].ColorSample,
            W1_web_color:  arr[idx].W1_web_color }
            this.Save(dataSave) 
            return;
        }
      }
    }else{
      for(let idx = 0; idx < arr.length ; idx ++){
        if(arr[idx].id === record.id){
          if(this.isEmpty(arr[idx].W1_judge_result)){
            return
          }
          this.Save(arr[idx])
          return;
        }
      }
    }
  }
  Save(dataSave){
    this.setState({isLoadding: true})
    DetermineLevelModifyMasterCoerciveAction.ListUpdate(dataSave).then(res=>{
      this.DisplayList()
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
      } 
    }).finally(()=>this.setState({isLoadding: false}))
  }
  ShowDetermineLevelBulkModify(){
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width:600,
        component: (
          <WS0448001_DetermineLevelBulkModify 
            onFinishScreen={(output) => {   
              this.formRef.current?.setFieldsValue({
                StsChange : output?.Lo_StsChange
              })
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  render() {
    const { childModal } = this.state;
    return (
      <div className="determine-level-modify-master-coercive">
        <Card title={<Button onClick={()=>this.ShowDetermineLevelBulkModify()} disabled={this.state.checkF10} >判定レヘ〝ル</Button>}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ JudgeLevel: "" }}
            autoComplete="off"
          >
            <Row>
              <Col span={10}>
                <Form.Item name="JudgeLevel" label="判定レベル"  >
                  <Select>
                    <Select.Option value="">全て</Select.Option>
                    {this.state.JudgeLevel?.map(value => (
                      <Select.Option key={"JudgeLevel-" + Math.random()} value={value?.condition_1}>{value?.item}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col offset={1} span={13} style={{ textAlign: 'right' }}>
                <Form.Item >
                  <span>※注意 色の変更はｱﾙﾌｧﾋﾞｰﾅｽ再起動時に反映されます。</span>
                </Form.Item>
              </Col>
            </Row>
            <Table
              dataSource={this.formRef.current?.getFieldValue("tableData")}
              size="small" pagination={false} bordered={true}
              loading={this.state.isLoadding}
              scroll={{ y: 600 }}
              rowKey={(record) => record.id}
              onRow={(record, rowIndex) => {
                return {
                  onClick: async () => {
                    await this.setState({
                      checkF10: true
                    })
                  }, // click row
                  
                };
              }}
            >
              <Table.Column title="判定レベル" dataIndex="JudgeLevelChar" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'JudgeLevelChar']}>
                  <Select>
                    {this.state.JudgeLevel?.map(value => (
                      <Select.Option key={"JudgeLevelChar-" + Math.random()} value={value?.condition_1}>{value?.item}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              }} />
              <Table.Column title="判定" width={70} dataIndex="W1_judge_result" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'W1_judge_result']}>
                  <Input maxLength={3} style={{color: Color(record?.W1_screen_color)?.Background }} />
                </Form.Item>
              }} />
              <Table.Column title="重み" width={60} dataIndex="W1_weight_judge" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'W1_weight_judge']}>
                  <Input maxLength={2} onChange={(e) => {
                    const { value } = e.target;
                    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
                    const namePath = ['tableData', index, 'W1_weight_judge'];
                    if ((!isNaN(value) && reg.test(value))) {
                      this.formRef.current?.setFields([{
                        name: namePath,
                        value: value
                      }])
                    } else {
                      this.formRef.current?.setFields([{
                        name: namePath,
                        value: ""
                      }])
                    }
                    this.forceUpdate()
                  }} />
                </Form.Item>
              }} />
              <Table.Column title="基準判定" width={100} dataIndex="W1_standard_judge_result" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'W1_standard_judge_result']}>
                  <Select>
                    <Select.Option value={""}></Select.Option>
                    <Select.Option value={"A"}>A</Select.Option>
                    <Select.Option value={"B"}>B</Select.Option>
                    <Select.Option value={"C"}>C</Select.Option>
                    <Select.Option value={"D"}>D</Select.Option>
                    <Select.Option value={"E"}>E</Select.Option>
                    <Select.Option value={"F"}>F</Select.Option>
                    <Select.Option value={"G"}>G</Select.Option>
                    <Select.Option value={"H"}>H</Select.Option>
                    <Select.Option value={"I"}>I</Select.Option>
                    <Select.Option value={"J"}>J</Select.Option>
                  </Select>
                </Form.Item>
              }} />
              <Table.Column title="判  定  名" dataIndex="W1_judge_name" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'W1_judge_name']}>
                  <Input maxLength={40} />
                </Form.Item>
              }} />
              <Table.Column title="画面色" width={150} dataIndex="ColorSample" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'ColorSample']} style={{color: Color(record?.W1_screen_color)?.Background }} >
                  <Input style={{color: Color(record?.W1_screen_color)?.Background }}   readOnly onDoubleClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 300, 
                        component: (
                          <WS0447011_ColorSample
                            Lio_ColorCode={record.W1_screen_color}
                            onFinishScreen={(output) => {  
                              this.formRef.current?.getFieldValue('tableData').map((value)=>(
                                value === record ? value.W1_screen_color = output?.recordData?.Lio_ColorCode : value 
                              ))
                              const namePath = ['tableData', index, 'ColorSample']
                              this.formRef.current?.setFields([{
                                name: namePath,
                                value: output.Lio_ColorCode
                              }])
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                  }} />
                </Form.Item>
              }} />
              <Table.Column title="WEB色" dataIndex="W1_web_color" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'W1_web_color']}>
                  <Input maxLength={20} />
                </Form.Item>
              }} />
              <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewRow()}  ></Button>}
                render={(text, record, index) => {
                  return <>
                    <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.SaveData(record)}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0447001_DetermineLevelModifyMasterCoercive);
