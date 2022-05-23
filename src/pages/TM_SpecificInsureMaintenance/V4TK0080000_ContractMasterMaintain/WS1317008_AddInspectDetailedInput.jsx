import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Table, Row, Col, Space, Modal, message, Button } from "antd";
import WS1317039_InspectItemSearchQuerySingle from 'pages/TM_SpecificInsureMaintenance/V4TK0080000_ContractMasterMaintain/WS1317039_InspectItemSearchQuerySingle.jsx';
import AddInspectDetailedInputAction from 'redux/SpecificInsureMaintenance/ContractMasterMaintain/AddInspectDetailedInput.action'
import InspectItemSearchQuerySingleService from 'redux/SpecificInsureMaintenance/ContractMasterMaintain/InspectItemSearchQuerySingle.actiions'
import { PlusCircleOutlined } from '@ant-design/icons';
class WS1317008_AddInspectDetailedInput extends React.Component {
  static propTypes = {
    Li_AddTableNum: PropTypes.any,
    Li_TableName: PropTypes.any,
    Li_Code: PropTypes.any,
    Li_Name: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '追加検査詳細入力';

    this.state = {
      isloaddingTable: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      count: "a",
      dataSaveTable: [],
      dataDefault: [],
    };
  }
  componentDidMount() {
    if (this.props?.Li_AddTableNum) {
      this.getListData()
      this.getInspectItemSearchQuerySingle()
    }
  }
  componentDidUpdate(propPrev) {
    if (this.props != propPrev) {
      this.getListData()
    }
  }
  getListData() {
    let obj = {
      year: this.props?.year ? this.props.year : "", serial_number: this.props?.serial_number ? this.props.serial_number : "",
      additional_table_number: this.props?.Li_AddTableNum ? this.props.Li_AddTableNum : "",
      CheckupName: this.props?.Li_TableName ? this.props.Li_TableName : "",
      InspectCd: this.props?.Li_Code ? this.props.Li_Code : "",
      InspectName: this.props?.Li_Name ? this.props.Li_Name : ""
    }
    this.setState({ isloaddingTable: true })
    AddInspectDetailedInputAction.getListData(obj).then(res => {
      res["unit_price"] = this.numberWithCommas(res["unit_price"])
      this.formRef.current?.setFieldsValue({
        tableData: res ? res : []
      })

    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }

    }).finally(() => this.setState({ isloaddingTable: false }))

  }
  getInspectItemSearchQuerySingle() {
    let data = { SearchChar: "", StsUseInspect: "", Type: "" }
    InspectItemSearchQuerySingleService.getListData(data).then(res => {
      this.setState({ dataDefault: res ? res : [] })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    })
  }
  onBlurPrice = (e, index, record) => {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    let namePath = ['tableData', index, 'unit_price']
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      this.formRef.current?.setFields([{
        name: namePath,
        value: this.numberWithCommas(value)
      }])
    } else {
      this.formRef.current?.setFields([{
        name: namePath,
        value: ""
      }])
    }
    if (this.isEmpty(record.exam_name)) {
      this.formRef.current?.setFieldsValue({ checkSave: true })
    }
    this.forceUpdate()
  };
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  numberWithCommas(x) {
    if (this.isEmpty(x)) {
      return ""
    } else {
      x = parseInt(x)?.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
      return x;
    }
  }
  stringWithCommas(value) {
    if (this.isEmpty(value) === false) {
      if (value.length < 2) {
        return parseInt(value)
      } else {
        let val = value
        let re = /,/gi;
        let newstr = val?.toString()?.replace(re, '');
        return parseInt(newstr)
      }
    }
    return value

  }
  AddNewRow() {
    let tableData = [...this.formRef.current?.getFieldValue("tableData")];
    if (this.state.dataSaveTable.length === 0) {
      this.handleAdd()
    } else {
      if (this.formRef.current?.getFieldValue("checkSave") === false) {
        let checkKey = false
        let checkUnitPrice = false
        tableData.map((value, index) => {
          if (this.isEmpty(value.exam_code) && checkKey === false) {
            checkKey = true
          }
          if (this.isEmpty(value.unit_price) && checkUnitPrice === false) {
            if (this.isEmpty(value.exam_short_name)) {
              checkUnitPrice = true
            }
          }
          if (index === tableData.length - 1) {
            if (checkKey) {
              message.error("検査コード「0」は登録できません。")
              this.formRef.current?.setFieldsValue({ checkSave: true })
            } else if (checkUnitPrice) {
              message.error("存在しない検査コードです。")
              this.formRef.current?.setFieldsValue({ checkSave: true })
            } else if (checkKey === false && checkUnitPrice === false) {
              this.findDuplicates(0)
            }
          }
        })

      } else {
        message.error("存在しない検査コードです。")
      }
    }


  }
  findDuplicates = (condition = null) => {
    this.formRef.current?.setFieldsValue({ duplicate: false, checkSave: false })
    let sorted_arr = [...this.formRef.current?.getFieldValue("tableData")] 
    if (sorted_arr.length <= 1 && condition === 0) {
      this.handleAdd()
    }
    if (sorted_arr.length > 1) {
      let arrStart =[]
      sorted_arr.map((value, index)=>{
        if(arrStart.indexOf(value.exam_code) > -1 ){
          message.error("Duplicate data row")
          this.formRef.current?.setFieldsValue({ duplicate: true, checkSave: true })
          return ;
        }else{
          arrStart.push(value.exam_code)
          if (condition === 0) {
            if (sorted_arr.length -1   === index) {
              this.handleAdd()
            }
          }
        }  
      }) 
    } 
  }
  handleAdd() {
    const { count } = this.state;
    const newData = { id: count, exam_code: "", exam_short_name: "", exam_name: "", unit_price: "" };
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    console.log(data,"add")
    data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
      checkSave: true
    });
    this.forceUpdate()
    let keycheck = [...this.state.dataSaveTable];
    keycheck.push(newData)
    this.setState({
      ...this.state,
      count: count + 1,
      dataSaveTable: keycheck,
    })
  }
  showInspectItemSearchQuerySingle(index) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS1317039_InspectItemSearchQuerySingle
            onFinishScreen={(output) => {
              const exam_code = ['tableData', index, 'exam_code'];
              const exam_short_name = ['tableData', index, 'exam_short_name'];
              const exam_name = ['tableData', index, 'exam_name'];
              this.formRef.current.setFields([
                {
                  name: exam_code,
                  value: output?.Lo_InspectItemCode,
                },
                {
                  name: exam_short_name,
                  value: output?.recordData?.exam_short_name,
                },
                {
                  name: exam_name,
                  value: output?.recordData?.exam_name,
                }
              ]);
              this.forceUpdate()
              this.findDuplicates()
              this.closeModal()
            }}
          />),
      },
    })
  }
  save() {
    let sorted_arr =[...this.formRef.current.getFieldValue("tableData")];  
    if (this.formRef.current?.getFieldValue("checkSave") === false && this.formRef.current?.getFieldValue("duplicate") === false && sorted_arr.length > 0) {
      if (sorted_arr.length > 1) {
        let dataSave=[]  
        let arrStart=[]; 
        sorted_arr.map((val,index)=>{
            let obj = val
            obj.unit_price = this.stringWithCommas(obj.unit_price)
            dataSave.push(obj)  
            if(arrStart.indexOf(val.exam_code) > -1 ){
              message.error("Duplicate data row")
              this.formRef.current?.setFieldsValue({ duplicate: true, checkSave: true })
              return
            }else{
              arrStart.push(val.exam_code)
            } 
            if(arrStart.length === sorted_arr.length ){ 
                this.saveData(dataSave)
            } 
        })
      }else{
        sorted_arr[0].unit_price = this.stringWithCommas(sorted_arr[0].unit_price)
        this.saveData(sorted_arr)
      }  
    } else {
      message.error("存在しない検査コードです。")
    }
  }
  saveData(dataSave){
    this.setState({ isloaddingTable: true })
    AddInspectDetailedInputAction.save({
      year: this.props?.year ? this.props.year : "", serial_number: this.props?.serial_number ? this.props.serial_number : "",
      additional_table_number: this.props?.Li_AddTableNum ? this.props.Li_AddTableNum : "",
      CheckupName: this.props?.Li_TableName ? this.props.Li_TableName : "",
      InspectCd: this.props?.Li_Code ? this.props.Li_Code : "",
      InspectName: this.props?.Li_Name ? this.props.Li_Name : "",
      data: dataSave
    }).then(res => {
      this.getListData()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      } 
    }).finally(() => this.setState({ isloaddingTable: false }))
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  setFieldNull(index, data) {
    const exam_code = ['tableData', index, 'exam_code'];
    const exam_short_name = ['tableData', index, 'exam_short_name'];
    const exam_name = ['tableData', index, 'exam_name'];
    if (data) {
      this.formRef.current.setFields([
        {
          name: exam_code,
          value: data.test_item_code,
        },
        {
          name: exam_short_name,
          value: data.exam_short_name,
        },
        {
          name: exam_name,
          value: data.exam_name,
        }
      ]);
      this.formRef.current?.setFieldsValue({ checkSave: false })
      this.findDuplicates()
    } else {
      this.formRef.current.setFields([
        {
          name: exam_code,
          value: "",
        },
        {
          name: exam_short_name,
          value: "",
        },
        {
          name: exam_name,
          value: "",
        }
      ]);
      this.formRef.current?.setFieldsValue({ checkSave: true })
    }
  }
  render() {
    return (
      <div className="add-inspect-detailed-input">
        <Card title="追加検査詳細入力">
          <Form
            ref={this.formRef}
            autoComplete="off"
          >
            <Row>
              <Col span={16}>
                <Space>
                  <Form.Item>
                    <span>{this.props?.Li_AddTableNum}</span>
                  </Form.Item>
                  <Form.Item>
                    <span>{this.props?.Li_TableName}</span>
                  </Form.Item>
                </Space>
              </Col>
              <Col span={8} style={{ textAlign: "right" }}>
                <Space>
                  <Form.Item>
                    <span>{this.props?.Li_Code}</span>
                  </Form.Item>
                  <Form.Item>
                    <span>{this.props?.Li_Name}</span>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
            <Table
              dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current.getFieldValue("tableData") : []}
              loading={this.state.isloaddingTable}
              pagination={false}
              size="small"
              scroll={{ y: 500 }}
              rowKey={(record) => record?.id}
              bordered={true}
            >
              <Table.Column title="検査コード" dataIndex="exam_code" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'exam_code']} style={{ marginBottom: '0px' }} >
                  <Input.Search maxLength={8}
                    onBlur={(e) => {
                      const { value } = e.target;
                      const reg = /^-?[0-9]*(\.[0-9]*)?$/;
                      const exam_short_name = ['tableData', index, 'exam_short_name'];
                      const exam_name = ['tableData', index, 'exam_name'];
                      if ((!isNaN(value) && reg.test(value)) && value != 0 && value != "") {
                        //check data in list 
                        for (let i = 0; i < this.state.dataDefault.length; i++) {
                          if (this.state.dataDefault[i].test_item_code == value) {
                            this.setFieldNull(index, this.state.dataDefault[i])
                            break;
                          }
                          if (i === this.state.dataDefault.length - 1) {
                            this.formRef.current?.setFieldsValue({ checkSave: true })
                            this.formRef.current.setFields([
                              {
                                name: exam_short_name,
                                value: "",
                              },
                              {
                                name: exam_name,
                                value: "",
                              }
                            ]);
                          }
                        }
                      } else {
                        message.error("検査コード「0」は登録できません。")
                        this.setFieldNull(index, null)
                      }
                      this.forceUpdate()
                    }}
                    onSearch={() => this.showInspectItemSearchQuerySingle(index)} />
                </Form.Item>
              }} />
              <Table.Column title="略称名" dataIndex="exam_short_name" />
              <Table.Column title="検査名称" dataIndex="exam_name" />
              <Table.Column title="単価" dataIndex="unit_price" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'unit_price']} style={{ marginBottom: '0px' }} >
                  <Input maxLength={6} onBlur={(val) => this.onBlurPrice(val, index, record)} />
                </Form.Item>
              }} />
              <Table.Column width={30} title={<PlusCircleOutlined style={{ color: '#08c' }} onClick={() => this.AddNewRow()} />} />
            </Table>
            <Button type="primary" style={{ float: 'right', marginTop: '1em' }} onClick={() => this.save()}>SAVE</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1317008_AddInspectDetailedInput);
