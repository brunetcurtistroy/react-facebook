import React from "react";
import { connect } from "react-redux";
import PropTypes, { number } from 'prop-types';
import { Table, Form, Input, Select, Checkbox, Modal, Row, Col, message, Spin, Button } from "antd";
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import ContractMasterDetailsAction from 'redux/SpecificInsureMaintenance/ContractMasterMaintain/ContractMasterDetails.actions'
import WS1289001_ContractCompiledQuery from 'pages/TM_SpecificInsureMaintenance/V4TK0080000_ContractMasterMaintain/WS1289001_ContractCompiledQuery.jsx';
import WS1290001_InsurerNumberInquiry from 'pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1290001_InsurerNumberInquiry.jsx';
import WS1317008_AddInspectDetailedInput from 'pages/TM_SpecificInsureMaintenance/V4TK0080000_ContractMasterMaintain/WS1317008_AddInspectDetailedInput.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

const styleDivTitle = {
  border: '1px solid #FFFFFF',
  borderBottom: 0,
  borderRight: 0,
  padding: '5px 10px',
  backgroundColor: '#1c66b9',
  color: 'white',
  textAlign: 'center'
}
const styleFormItem = {
  border: '1px solid #FFFFFF',
  borderBottom: 0,
  borderRight: 0,
  margin: 0
}
const styleFormItemBottom = {
  ...styleFormItem,
  borderBottom: '1px solid #FFFFFF'
}
const styleDivTitle1 = {
  border: '1px solid #FFFFFF',
  padding: '5px 6px',
  backgroundColor: '#E1E1E1',
  color: '#000000',
  textAlign: 'center'
}
const styleFormItem1 = {
  ...styleFormItem,
  marginBottom: '1px'
}
class WS1317001_ContractMasterDetails extends React.Component {
  static propTypes = {
    Li_ContractYear: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'V4-TMS01010:契約マスタ詳細';
    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      year: "",
      serial_number: "",
      isLoadingInit: false,
      isLoadingFm: false,
      isLoadingTable: false,
      count: "b",
      dataSaveTable2: [],
      count1: "a",
      dataSaveTable1: [],
      checkSave: false,
      changCheckBox: [],
      checkActivelyUnitPrice: true,
      checkFiduciaryBusinessSpecificMedica: true,
      checkFiduciaryBusinessMotivatedScree: true,
      checkFiduciaryBusinessAdd01Screen: true,
      checkFiduciaryBusinessAdd02Screen: true,
      checkFiduciaryBusinessAdd03Screen: true,
      checkFiduciaryBusinessAdd04Screen: true,
      checkFiduciaryBusinessAdd05Screen: true,
      checkFiduciaryBusinessAdd06Screen: true,
      checkFiduciaryBusinessAdd07Screen: true,
      checkFiduciaryBusinessAdd08Screen: true,
      checkFiduciaryBusinessAdd09Screen: true,
      checkFiduciaryBusinessAdd10Screen: true,

    };
    this.onFinish = this.onFinish.bind(this)
  }
  componentDidMount() {
    this.getDataInit()
  }
  componentDidUpdate(propPrev) { 
    if (this.props !== propPrev ) {
      this.getDataInit()
    }
  }
  getDataInit() {
    if( !isNaN(this.props.Li_ContractYear)) {
      this.setState({ isLoadingInit: true })
      ContractMasterDetailsAction.getListData({ Li_ContractYear: this.props.Li_ContractYear }).then(res => {
        this.formRef.current?.setFieldsValue({
          tableData1: res ? res : []
        })
        this.setState({ changCheckBox: [] })
        this.formRef.current?.setFieldsValue({
          dataSelected: res ? res[0] : {}
        }) 
          this.getSelectedDataInit() 
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
        }
      }).finally(() => this.setState({ isLoadingInit: false }))
    }
  }
  getSelectedDataInit() {
    this.getContentInput();
    this.getCommissionedOriginalInput();
  }
  getContentInput() { 
      this.setState({ isLoadingFm: true })
      ContractMasterDetailsAction.getContentInput({
        year: this.formRef.current.getFieldValue("dataSelected")?.year ? this.formRef.current.getFieldValue("dataSelected").year :"0000" 
        ,serial_number: this.formRef.current.getFieldValue("dataSelected")?.serial_number? this.formRef.current.getFieldValue("dataSelected")?.serial_number: 0
      }).then(res => {
        res["ActivelyCalculateBeforePersonal"] = res["ActivelyCalculateBeforePersonal"] === 0 ? false : true
        this.formRef.current?.setFieldsValue(res)
        res["FiduciaryBusinessActiveScreen"] === 1 ? this.setState({ checkActivelyUnitPrice: false }) : this.setState({ checkActivelyUnitPrice: true })
        res["FiduciaryBusinessSpecificMedica"] === 1 ? this.setState({ checkFiduciaryBusinessSpecificMedica: false }) : this.setState({ checkFiduciaryBusinessSpecificMedica: true })
        res["FiduciaryBusinessMotivatedScree"] === 1 ? this.setState({ checkFiduciaryBusinessMotivatedScree: false }) : this.setState({ checkFiduciaryBusinessMotivatedScree: true })
        res["FiduciaryBusinessAdd01Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd01Screen: false }) : this.setState({ checkFiduciaryBusinessAdd01Screen: true })
        res["FiduciaryBusinessAdd02Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd02Screen: false }) : this.setState({ checkFiduciaryBusinessAdd02Screen: true })
        res["FiduciaryBusinessAdd03Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd03Screen: false }) : this.setState({ checkFiduciaryBusinessAdd03Screen: true })
        res["FiduciaryBusinessAdd04Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd04Screen: false }) : this.setState({ checkFiduciaryBusinessAdd04Screen: true })
        res["FiduciaryBusinessAdd05Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd05Screen: false }) : this.setState({ checkFiduciaryBusinessAdd05Screen: true })
        res["FiduciaryBusinessAdd06Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd06Screen: false }) : this.setState({ checkFiduciaryBusinessAdd06Screen: true })
        res["FiduciaryBusinessAdd07Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd07Screen: false }) : this.setState({ checkFiduciaryBusinessAdd07Screen: true })
        res["FiduciaryBusinessAdd08Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd08Screen: false }) : this.setState({ checkFiduciaryBusinessAdd08Screen: true })
        res["FiduciaryBusinessAdd09Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd09Screen: false }) : this.setState({ checkFiduciaryBusinessAdd09Screen: true })
        res["FiduciaryBusinessAdd10Screen"] === 1 ? this.setState({ checkFiduciaryBusinessAdd10Screen: false }) : this.setState({ checkFiduciaryBusinessAdd10Screen: true })
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
        }
      }).finally(() => this.setState({ isLoadingFm: false }))
    } 
  getCommissionedOriginalInput() {
    this.setState({ isLoadingTable: true })
    let data = { year: this.formRef.current.getFieldValue("dataSelected")?.year ?this.formRef.current.getFieldValue("dataSelected").year :"0000" 
    , serial_number: this.formRef.current.getFieldValue("dataSelected")?.serial_number ?this.formRef.current.getFieldValue("dataSelected")?.serial_number: 0
      } 
    ContractMasterDetailsAction.getCommissionedOriginalInput(data).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData2: res ? res : []
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isLoadingTable: false }))

  }
  AddNewRow(condition) {
    this.setState({ ...this.state.checkSave, checkSave: false })
    let checkKey = false
    if (this.state.dataSaveTable2.length === 0) {
      this.handleAdd()
    } else {
      this.state.dataSaveTable2.map((val, indx) => {
        this.formRef.current?.getFieldValue("tableData2").map((value, index) => {
          if (value.insurer_number === 0 && checkKey === false) {
            checkKey = true
          }
        })
        if (indx === this.state.dataSaveTable2.length - 1) {
          if (checkKey) {
            message.error("保険者番号が登録されていません。")
            this.setState({ ...this.state.checkSave, checkSave: true })
          } else if (this.findDuplicates() > 0) {
            message.error("登録済みの保険者番号です")
            this.setState({ ...this.state.checkSave, checkSave: true })
          } else if (checkKey === false) {
            this.setState({ ...this.state.checkSave, checkSave: false })
            if (condition) {
              this.handleAdd()
            }
          }
        }
      })
    }
  }
  findDuplicates = () => {
    let sorted_arr = this.formRef.current?.getFieldValue("tableData2")
    let results = [];
    let arrStart = []
    for (let i = 0; i < sorted_arr.length; i++) {
      if (arrStart.indexOf(sorted_arr[i].insurer_number) > -1) {
        return 1;
      } else {
        arrStart.push(sorted_arr[i].insurer_number)
      }
      if (sorted_arr.length - 1 === i) {
        return results.length;
      }
    }
  }
  handleAdd() {
    const { count } = this.state;
    const newData = { id: count, insurer_number: 0, insurer_kanji_name: "", G2SpecificMedicalExam: false, G2_StsHealthGuidance: false };
    let data = [...this.formRef.current?.getFieldValue("tableData2")];
    data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData2: data,
    });
    let keycheck = [...this.state.dataSaveTable2];
    keycheck.push(newData)
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
      dataSaveTable2: keycheck,
      checkSave: true
    })
  }
  onFinish(values) {
    if (this.formRef.current.getFieldValue("dataSelected").year && this.formRef.current.getFieldValue("dataSelected").serial_number) {
      this.setState({ isLoadingFm: true })
      values["id"] = this.formRef.current.getFieldValue("dataSelected").id
      values["year"] = this.formRef.current.getFieldValue("dataSelected").year
      values["serial_number"] = this.formRef.current.getFieldValue("dataSelected").serial_number
      values["ActivelyCalculateBeforePersonal"] = values["ActivelyCalculateBeforePersonal"] ? 1 : 0
      let arr = [
        "basic_individual_medical_exam_unit_price",
        "unit_price_exam_basic_population_health",
        "anemia_individual_medical_exam_unit_price",
        "unit_price_exam_anemia_population_health",
        "electrocardiograph_individual_medical_exam_unit_price",
        "unit_price_diagnosis_electrocardiogram_population_ken",
        "fundus_individual_medical_exam_unit_price",
        "fundus_group_medical_exam_unit_price",
        "h30_creatinine_individual_medical_exam_unit_price",
        "h30_creatinine_population_checkup_unit_price",
        "motivation_unit_price",
        "actively_unit_price",
        "active_constant_support_enforcement_point",
        "additional_medical_exam_unit_price_01",
        "additional_medical_exam_unit_price_02",
        "additional_medical_exam_unit_price_03",
        "additional_medical_exam_unit_price_04",
        "additional_medical_exam_unit_price_05",
        "additional_medical_exam_unit_price_06",
        "additional_medical_exam_unit_price_07",
        "additional_medical_exam_unit_price_08",
        "additional_medical_exam_unit_price_09",
        "same_time_unit_price_01",
        "same_time_unit_price_02",
        "same_time_unit_price_03",
        "same_time_unit_price_04",
        "same_time_unit_price_05",
        "same_time_unit_price_06",
        "same_time_unit_price_07",
        "same_time_unit_price_08",
        "same_time_unit_price_09",
        "same_time_unit_price_10"
      ]
      this.formatDataSave(arr, values)
    }
  }
  formatDataSave(arr, values) {
    let arr0 = ["aggressive_price_rate_03",
      "aggressive_price_rate_02",
      "aggressive_price_rate_04",
      "aggressive_price_rate_01",
      "price_motivation_rate_01",
      "price_motivation_rate_04",
      "price_motivation_rate_02"
    ]
    arr.map((value, index) => {
      values[value] = values[value] ? this.stringWithCommas(values[value]) : 0
      if (arr.length - 1 === index) {
        arr0.map((val, ind) => {
          values[val] = values[val] ? this.stringWithCommas(values[val], 0) : 0
          if (arr0.length - 1 === ind) {
            ContractMasterDetailsAction.update(values).then(res => {
            }).catch(error => {
              const res = error.response;
              if (!res || res.data || res.data.message) {
                message.error('エラーが発生しました');
              }
              message.error(res.data.message);
            }).finally(() => this.setState({ isLoadingFm: false }))
          }
        })
      }
    })
  }
  changeCheckbox(id) {
    let arr = [...this.state.changCheckBox];
    if (arr.length === 0) {
      arr.push(id);
      this.setState({ ...this.state.changCheckBox, changCheckBox: arr })
    } else {
      if (arr.indexOf(id) === -1) {
        arr.push(id);
        this.setState({ ...this.state.changCheckBox, changCheckBox: arr })
      }
    }

  }
  closeModal = () => {
    this.setState((prevState) => ({
      childModal: { ...prevState.childModal, visible: false },
    }));
  };

  onBlurNumber = (e, namePath, check) => {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      this.formRef.current?.setFields([{
        name: namePath,
        value: this.numberWithCommas(value, check)
      }])
    } else {
      this.formRef.current?.setFields([{
        name: namePath,
        value: 0
      }])
    }
    this.forceUpdate()
  };
  numberWithCommas(x, check) {
    x = parseInt(x)?.toString();
    var pattern = /(-?\d+)(\d{3})/;
    if (check === 0) {
      while (pattern.test(x))
        x = x.replace(pattern, "$1,$2.0")
    } else {
      while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    }
    return x;
  }
  stringWithCommas(value, check = null) {
    if (value.length < 2) {
      return parseInt(value)
    } else {
      let val = check === 0 ? value.split?.(".")?.[0] : value
      let re = /,/gi;
      let newstr = val?.toString()?.replace(re, '');
      return parseInt(newstr)
    }
  }
  AddTestingSpecification(no, checkUpName, InspectCd, InspectName) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1000,
        component: (<WS1317008_AddInspectDetailedInput
          Li_AddTableNum={no ? no : ""}
          Li_TableName={checkUpName ? checkUpName : ""}
          Li_Code={InspectCd ? InspectCd : ""}
          Li_Name={InspectName ? InspectName : ""}
          year={this.formRef.current.getFieldValue("dataSelected")?.year}
          serial_number={this.formRef.current.getFieldValue("dataSelected")?.serial_number}
          onFinishScreen={(output) => {
            this.closeModal()
          }}
        />),
      },
    })
  }
  getFieldForm(namePath) {
    return this.formRef.current?.getFieldValue(namePath) ? this.formRef.current?.getFieldValue(namePath) : ""
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  AddNewData() {
    let arr = [...this.formRef.current?.getFieldValue("tableData1")];
    let dataAdd = [... this.state.dataSaveTable1]
    if (arr.length === 0 || dataAdd.length === 0) {
      this.handleAdd1();
    } else {
      let startArr = []
      for (let index = 0; index < arr.length; index++) {
        if (startArr.indexOf(arr[index].serial_number) > -1) {
          return
        }else{ startArr.push(arr[index].serial_number) }
        if (this.isEmpty(arr[index].serial_number)) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd1()
        }
      }
    }

  }
  handleAdd1() {
    const { count1 } = this.state;
    const newData = { id: count1, serial_number: "", contract_number: "", contract_name: "", contract_type: 1 };
    let data = [...this.formRef.current?.getFieldValue("tableData1")];
    data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData1: data,
    });
    let keycheck = [...this.state.dataSaveTable1];
    keycheck.push(newData)
    this.forceUpdate()
    this.setState({
      ...this.state,
      count1: count1 + 1,
      dataSaveTable1: keycheck,
    })
  }
  save(record) {
    if (this.props.Li_ContractYear && !this.isEmpty(record.serial_number)) {
      this.setState({ isLoadingInit: true })
      let arr = [...this.formRef.current?.getFieldValue("tableData1")];
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].id === record.id) {
          let dataSave = {
            Li_ContractYear: this.props.Li_ContractYear,
            data: [arr[index]]
          }
          ContractMasterDetailsAction.save(dataSave).then(res => {
            ContractMasterDetailsAction.getListData({ Li_ContractYear: this.props.Li_ContractYear }).then(res => {
              this.formRef.current?.setFieldsValue({
                tableData1: res ? res : []
              })
              this.setState({ changCheckBox: [] })
              for (let ind = 0; ind < res.length; ind++) {
                if (res[ind].serial_number === dataSave.data[0].serial_number) {
                  this.formRef.current?.setFieldsValue({
                    dataSelected: res[ind]
                  })
                  this.forceUpdate()
                  this.getSelectedDataInit()
                  return
                }
              }
            })
          }).catch(error => {
            const res = error.response;
            if (!res || res.data || res.data.message) {
              message.error('エラーが発生しました');
            }
            message.error(res.data.message);
          }).finally(() => this.setState({ isLoadingInit: false }))
          break;
        }
      }
    }
  }
  Delete(record) {
    console.log(record)
    if (isNaN(record.id)) {
      let arr = [...this.formRef.current?.getFieldValue("tableData1")];
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1)
          this.formRef.current?.setFieldsValue({
            tableData1: arr
          })
          this.forceUpdate()
        }
      })
    } else {
      //delete DB 
      ContractMasterDetailsAction.deleteContractMaster(record).then(res => {
        this.getDataInit()
      })
    }
  }
  insert(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData2")];
    if (this.state.checkSave === false && arr.length > 0) {
      for (let idX = 0; idX < arr.length; idX++) {
        if (arr[idX].id === record.id && arr[idX].insurer_number.length != 0) {
          this.setState({ isLoadingFm: true })
          arr[idX].G2SpecificMedicalExam = arr[idX]?.G2SpecificMedicalExam ? true : false
          arr[idX].G2_StsHealthGuidance = arr[idX]?.G2_StsHealthGuidance ?  true : false 
          let obj = {
            year: this.formRef.current?.getFieldValue("dataSelected").year, serial_number: this.formRef.current?.getFieldValue("dataSelected").serial_number,
            data: [arr[idX]]
          }
          ContractMasterDetailsAction.insert(obj).then(res => {
          }).catch(error => {
            const res = error.response;
            if (!res || res.data || res.data.message) {
              message.error('エラーが発生しました');
            }
            message.error(res.data.message);
          }).finally(() => this.setState({ isLoadingFm: false }))
        }
      }
    }
  }
  deleteCommissionedOriginal(record) {
    if ( isNaN(record.id)) {
      let arr = [...this.formRef.current?.getFieldValue("tableData2")];
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1)
          this.formRef.current?.setFieldsValue({
            tableData2: arr
          })
          this.forceUpdate()
        }
      })
    } else {
      //delete DB 
      ContractMasterDetailsAction.deleteCommissionedOriginalInput(record).then(res => {
        this.getCommissionedOriginalInput();
      })
    }
  }
  render() {
    const { childModal } = this.state;
    return (
      <div className="contract-master-details">
        <Form ref={this.formRef} onFinish={this.onFinish} autoComplete="off" >
          <Row>
            <Col span={7}>
              <Table dataSource={this.formRef.current?.getFieldValue("tableData1") ? this.formRef.current?.getFieldValue("tableData1") : []}
                style={{ width: '99%' }}
                size='small' bordered
                loading={this.state.isLoadingFm ? false : this.state.isLoadingInit}
                rowKey={(record) => record.id}
                pagination={false}
                scroll={{ y: '80vh', x: 700 }}
                rowSelection={{
                  type: 'radio',
                  onChange: (x, selectedRows) => {
                    this.setState({ ...this.state.changCheckBox, changCheckBox: [] })
                    this.formRef.current?.setFieldsValue({
                      dataSelected: selectedRows[0]
                    })
                    console.log('selectedRows: ', this.formRef.current?.getFieldValue("dataSelected"));
                    this.forceUpdate()
                    this.getSelectedDataInit()
                  }
                }}
              >
                <Table.Column title="内部番号" dataIndex="serial_number" render={(value, record, index) => {
                  if (isNaN(record.id)) {
                    return <Form.Item name={['tableData1', index, 'serial_number']} style={{ marginBottom: '0px' }}  >
                      <Input maxLength={6} onBlur={(e) => {
                        const { value } = e.target;
                        const reg = /^-?[0-9]*(\.[0-9]*)?$/;
                        const namePath = ['tableData1', index, 'serial_number'];
                        if (this.isEmpty(value) === false && (!isNaN(value) && reg.test(value))) {
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
                  } else {
                    return <span>{value}</span>
                  }
                }} />
                <Table.Column title="契約番号" render={(value, record, index) => (
                  <Form.Item name={['tableData1', index, 'contract_number']} style={{ margin: 0 }}>
                    <Input style={{ border: 'none' }} maxLength={10} onBlur={(e) => {
                      const { value } = e.target;
                      const namePath = ['tableData1', index, 'contract_number'];
                      this.formRef.current?.setFields([{
                        name: namePath,
                        value: value
                      }])
                    }} />
                  </Form.Item>
                )} />
                <Table.Column title="契  約  名  称" render={(value, record, index) => (
                  <Form.Item name={['tableData1', index, 'contract_name']} style={{ margin: 0 }}>
                    <Input style={{ border: 'none' }} maxLength={100} onBlur={(e) => {
                      const { value } = e.target;
                      const namePath = ['tableData1', index, 'contract_name'];
                      this.formRef.current?.setFields([{
                        name: namePath,
                        value: value
                      }])
                    }} />
                  </Form.Item>
                )} />
                <Table.Column title="契約形態" render={(value, record, index) => (
                  <Form.Item style={{ margin: 0 }} name={['tableData1', index, 'contract_type']} >
                    <Select style={{ width: '90px' }} size='small'  >
                      <Select.Option value={1}>個別</Select.Option>
                      <Select.Option value={2}>集合</Select.Option>
                    </Select>
                  </Form.Item>
                )} />
                <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                  render={(text, record, index) => {
                    return <>
                      <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                        onClick={() => this.save(record)}
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
            </Col>
            <Col span={17}>
              <Spin spinning={this.state.isLoadingFm}>
                <Row>
                  <Col span={14}>
                    <Form.Item label="取りまとめ" labelCol={{ span: 4 }} style={{ margin: 0 }}>
                      <Row>
                        <Form.Item name="contract_compiled_code">
                          <Input.Search style={{ width: '120px', marginRight: '10px' }} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '50%',
                                component: (
                                  <WS1289001_ContractCompiledQuery
                                    ContractCompiled={this.formRef.current?.getFieldValue("contract_compiled_code")}
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        contract_compiled_code: output?.contract_compiled_code,
                                        name: output.recordData?.name_contract_compiled_division_code
                                      })
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item >
                          <span>{this.formRef.current?.getFieldValue("name")}</span>
                        </Form.Item>
                      </Row>
                    </Form.Item>
                    <Form.Item name="representative_consignor_name" label="委託者" labelCol={{ span: 4 }} >
                      <Input style={{ width: '98%' }} />
                    </Form.Item>
                    <Form.Item name="representative_trustee_name" label="受託者" labelCol={{ span: 4 }}>
                      <Input style={{ width: '98%' }} />
                    </Form.Item>
                    <Form.Item name="FiduciaryBusinessSpecificMedica" label="特定健診" labelCol={{ span: 4 }}>
                      <Select style={{ width: '90px' }} onChange={(val) => {
                        this.setState({ checkFiduciaryBusinessSpecificMedica: true })
                        if (val === 1) {
                          this.setState({ checkFiduciaryBusinessSpecificMedica: false })
                        }
                      }} >
                        <Select.Option value={0}>対象外</Select.Option>
                        <Select.Option value={1}>対象</Select.Option>
                      </Select>
                    </Form.Item>
                    <Row>
                      <Col span={4}>
                        <div style={{ ...styleDivTitle, borderRight: '1px solid #FFFFFF' }}>項目</div>
                        <div style={styleDivTitle}>個別健診</div>
                        <div style={{ ...styleDivTitle, borderBottom: '1px solid #FFFFFF', }}>集団健診</div>
                      </Col>
                      <Col span={3}>
                        <div style={styleDivTitle}>基  本</div>
                        <Form.Item name='basic_individual_medical_exam_unit_price' style={styleFormItem}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessSpecificMedica} onBlur={(val) => this.onBlurNumber(val, 'basic_individual_medical_exam_unit_price', null)} />
                        </Form.Item>
                        <Form.Item name='unit_price_exam_basic_population_health' style={styleFormItemBottom}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessSpecificMedica} onBlur={(val) => this.onBlurNumber(val, 'unit_price_exam_basic_population_health', null)} />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <div style={styleDivTitle}>貧  血</div>
                        <Form.Item name='anemia_individual_medical_exam_unit_price' style={styleFormItem}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessSpecificMedica} onBlur={(val) => this.onBlurNumber(val, 'anemia_individual_medical_exam_unit_price', null)} />
                        </Form.Item>
                        <Form.Item name='unit_price_exam_anemia_population_health' style={styleFormItemBottom}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessSpecificMedica} onBlur={(val) => this.onBlurNumber(val, 'unit_price_exam_anemia_population_health', null)} />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <div style={styleDivTitle}>心電図</div>
                        <Form.Item name='electrocardiograph_individual_medical_exam_unit_price' style={styleFormItem}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessSpecificMedica} onBlur={(val) => this.onBlurNumber(val, 'electrocardiograph_individual_medical_exam_unit_price', null)} />
                        </Form.Item>
                        <Form.Item name='unit_price_diagnosis_electrocardiogram_population_ken' style={styleFormItemBottom}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessSpecificMedica} onBlur={(val) => this.onBlurNumber(val, 'unit_price_diagnosis_electrocardiogram_population_ken', null)} />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <div style={styleDivTitle}>眼  底</div>
                        <Form.Item name='fundus_individual_medical_exam_unit_price' style={styleFormItem}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessSpecificMedica} onBlur={(val) => this.onBlurNumber(val, 'fundus_individual_medical_exam_unit_price', null)} />
                        </Form.Item>
                        <Form.Item name='fundus_group_medical_exam_unit_price' style={styleFormItemBottom}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessSpecificMedica} onBlur={(val) => this.onBlurNumber(val, 'fundus_group_medical_exam_unit_price', null)} />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <div style={styleDivTitle}>ｸﾚｱﾁﾆﾝ</div>
                        <Form.Item name='h30_creatinine_individual_medical_exam_unit_price' style={{ ...styleFormItem, borderRight: '1px solid #FFFFFF' }}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'h30_creatinine_individual_medical_exam_unit_price', null)} />
                        </Form.Item>
                        <Form.Item name='h30_creatinine_population_checkup_unit_price' style={{ ...styleFormItemBottom, borderRight: '1px solid #FFFFFF' }}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'h30_creatinine_population_checkup_unit_price', null)} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="FiduciaryBusinessMotivatedScree" label="動機付" labelCol={{ span: 4 }} className='mt-3'>
                      <Select style={{ width: '90px' }} onChange={(val) => {
                        this.setState({ checkFiduciaryBusinessMotivatedScree: true })
                        if (val === 1) {
                          this.setState({ checkFiduciaryBusinessMotivatedScree: false })
                        }
                      }} >
                        <Select.Option value={0}>対象外</Select.Option>
                        <Select.Option value={1}>対象</Select.Option>
                      </Select>
                    </Form.Item>
                    <Row>
                      <Col span={2}>
                        <div style={styleDivTitle}>単価</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='motivation_unit_price' style={styleFormItem}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessMotivatedScree} onBlur={(val) => this.onBlurNumber(val, 'motivation_unit_price', null)} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <div style={styleDivTitle}>初回時全額徴収方式</div>
                      </Col>
                      <Col span={1}>
                        <Form.Item name='CalculateBeforePersonalBurdenRe' valuePropName='checked' style={{ margin: '0 0 0 15px' }} >
                          <Checkbox disabled={this.state.checkFiduciaryBusinessMotivatedScree} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={2}>
                        <div style={styleDivTitle}>初回</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='MotivationFirstScreen' style={styleFormItem}>
                          <Select disabled={this.state.checkFiduciaryBusinessMotivatedScree} >
                            <Select.Option value={1}>定額指定</Select.Option>
                            <Select.Option value={2}>定率指定</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='price_motivation_rate_01' style={styleFormItem}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessMotivatedScree} onBlur={(val) => this.onBlurNumber(val, 'price_motivation_rate_01', 0)} />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <div style={styleDivTitle}>初①</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='payment_division_motivation_04' style={styleFormItem}>
                          <Select  >
                            <Select.Option value={1}>定額指定</Select.Option>
                            <Select.Option value={2}>定率指定</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='price_motivation_rate_04' style={styleFormItem}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'price_motivation_rate_04', 0)} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={2}>
                        <div style={styleDivTitle}>終了</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='MotivationEndScreen' style={styleFormItem}>
                          <Select disabled={this.state.checkFiduciaryBusinessMotivatedScree} >
                            <Select.Option value={1}>定額指定</Select.Option>
                            <Select.Option value={2}>定率指定</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='price_motivation_rate_02' style={styleFormItem}>
                          <Input maxLength={6} disabled={this.state.checkFiduciaryBusinessMotivatedScree} onBlur={(val) => this.onBlurNumber(val, 'price_motivation_rate_02', 0)} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={2}>
                        <div style={styleDivTitle}>備考</div>
                      </Col>
                      <Col span={18}>
                        <Form.Item name='motivation_remarks' style={styleFormItem}>
                          <Input maxLength={256} disabled={this.state.checkFiduciaryBusinessMotivatedScree} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item name="FiduciaryBusinessActiveScreen" label="積極的" labelCol={{ span: 4 }} className='mt-3'>
                      <Select style={{ width: '90px' }} onChange={(val) => {
                        this.setState({ checkActivelyUnitPrice: true })
                        if (val === 1) {
                          this.setState({ checkActivelyUnitPrice: false })
                        }
                      }}>
                        <Select.Option value={0}>対象外</Select.Option>
                        <Select.Option value={1}>対象</Select.Option>
                      </Select>
                    </Form.Item>

                    <Row>
                      <Col span={2}>
                        <div style={styleDivTitle}>単価</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='actively_unit_price' style={styleFormItem}>
                          <Input disabled={this.state.checkActivelyUnitPrice} maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'actively_unit_price', null)} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <div style={styleDivTitle}>初回時全額徴収方式</div>
                      </Col>
                      <Col span={1}>
                        <Form.Item name='ActivelyCalculateBeforePersonal' valuePropName='checked' style={{ margin: '0 0 0 15px' }} >
                          <Checkbox disabled={this.state.checkActivelyUnitPrice} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={2}>
                        <div style={styleDivTitle}>初回</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='ActivelyFirstScreen' style={styleFormItem}>
                          <Select disabled={this.state.checkActivelyUnitPrice}>
                            <Select.Option value={1}>定額指定</Select.Option>
                            <Select.Option value={2}>定率指定</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='aggressive_price_rate_01' style={styleFormItem}>
                          <Input maxLength={6} disabled={this.state.checkActivelyUnitPrice} onBlur={(val) => this.onBlurNumber(val, 'aggressive_price_rate_01', 0)} />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <div style={styleDivTitle}>初①</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='actively_payment_division_04' style={styleFormItem}>
                          <Select  >
                            <Select.Option value={1}>定額指定</Select.Option>
                            <Select.Option value={2}>定率指定</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='aggressive_price_rate_04' style={styleFormItem}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'aggressive_price_rate_04', 0)} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={2}>
                        <div style={styleDivTitle}>継続</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='ActivelyContinueScreen' style={styleFormItem}>
                          <Select disabled={this.state.checkActivelyUnitPrice}>
                            <Select.Option value={1}>定額指定</Select.Option>
                            <Select.Option value={2}>定率指定</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='aggressive_price_rate_02' style={styleFormItem}>
                          <Input disabled={this.state.checkActivelyUnitPrice} maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'aggressive_price_rate_02', 0)} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={2}>
                        <div style={styleDivTitle}>終了</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='ActivelyEndScreen' style={styleFormItem}>
                          <Select disabled={this.state.checkActivelyUnitPrice}>
                            <Select.Option value={1}>定額指定</Select.Option>
                            <Select.Option value={2}>定率指定</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='aggressive_price_rate_03' style={styleFormItem}>
                          <Input disabled={this.state.checkActivelyUnitPrice} maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'aggressive_price_rate_03', 0)} />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <div style={styleDivTitle}>実施ポイント数</div>
                      </Col>
                      <Col span={4}>
                        <Form.Item name='active_constant_support_enforcement_point' style={styleFormItem}>
                          <Input maxLength={4} disabled={this.state.checkActivelyUnitPrice} onBlur={(val) => this.onBlurNumber(val, 'active_constant_support_enforcement_point', null)} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={2}>
                        <div style={styleDivTitle}>備考</div>
                      </Col>
                      <Col span={18}>
                        <Form.Item name='actively_remarks' style={styleFormItem}>
                          <Input maxLength={256} disabled={this.state.checkActivelyUnitPrice} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={10}>
                    <div style={{ ...styleDivTitle, display: 'inline-block' }} className='mb-3'>委託元</div>
                    <Table dataSource={this.formRef.current?.getFieldValue("tableData2")} size='small'
                      loading={this.state.isLoadingFm ? false : this.state.isLoadingTable}
                      rowKey={(record) => record.id}
                      pagination={false} bordered
                      scroll={{ y: 300, x: 600 }}
                    >
                      <Table.Column title="保険者番号" dataIndex="insurer_number" render={(value, record, index) => {
                        if (isNaN(record.id)) {
                          return <Form.Item name={['tableData2', index, 'insurer_number']} style={{ marginBottom: '0px' }}>
                            <Input.Search readOnly
                              onSearch={() => {
                                this.setState({
                                  ...this.state,
                                  childModal: {
                                    width: "80%",
                                    visible: true,
                                    component: (
                                      <WS1290001_InsurerNumberInquiry
                                        onFinishScreen={(output) => {
                                          const name = ['tableData2', index, 'insurer_number'];
                                          const insurer_kanji_name = ['tableData2', index, 'insurer_kanji_name'];
                                          this.formRef.current.setFields([
                                            {
                                              name: name,
                                              value: output?.Lo_InsurerNum,
                                            },
                                            {
                                              name: insurer_kanji_name,
                                              value: output?.recordData[0]?.insurer_kanji_name,
                                            }
                                          ]);
                                          this.forceUpdate()
                                          this.AddNewRow(false)
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }} />
                          </Form.Item>
                        } else {
                          return <span>{value}</span>
                        }
                      }} />
                      <Table.Column title="保険者名" dataIndex="insurer_kanji_name" />
                      <Table.Column title="健診" width={50} dataIndex="G2SpecificMedicalExam" render={(value, record, index) => (
                        <Form.Item style={{ margin: 0 }} name={['tableData2', index, 'G2SpecificMedicalExam']} valuePropName='checked'>
                          <Checkbox />
                        </Form.Item>
                      )} />
                      <Table.Column title="指導" width={50} dataIndex="G2_StsHealthGuidance" render={(value, record, index) => (
                        <Form.Item style={{ margin: 0 }} name={['tableData2', index, 'G2_StsHealthGuidance']} valuePropName='checked'>
                          <Checkbox />
                        </Form.Item>
                      )} />
                      <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewRow(true)}  ></Button>}
                        render={(text, record, index) => {
                          return <>
                            <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                              onClick={() => this.insert(record)}
                            ></Button>
                            <Button size='small' style={{ border: 'none' }} danger icon={<DeleteOutlined />}
                              onClick={() => {
                                Modal.confirm({
                                  content: '消去してもよろしいですか？',
                                  okText: 'は　い',
                                  cancelText: 'いいえ',
                                  onOk: () => this.deleteCommissionedOriginal(record)
                                })
                              }}
                            ></Button>
                          </>
                        }}
                      />
                    </Table>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col span={16}>
                    <Row>
                      <Col span={1}>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>No</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(1, this.getFieldForm("CheckupName01"), this.getFieldForm("InspectCd01"), this.getFieldForm("InspectName01"))}>1</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(2, this.getFieldForm("CheckupName02"), this.getFieldForm("InspectCd02"), this.getFieldForm("InspectName02"))}>2</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(3, this.getFieldForm("CheckupName03"), this.getFieldForm("InspectCd03"), this.getFieldForm("InspectName03"))}>3</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(4, this.getFieldForm("CheckupName04"), this.getFieldForm("InspectCd04"), this.getFieldForm("InspectName04"))}>4</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(5, this.getFieldForm("CheckupName05"), this.getFieldForm("InspectCd05"), this.getFieldForm("InspectName05"))}>5</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(6, this.getFieldForm("CheckupName06"), this.getFieldForm("InspectCd06"), this.getFieldForm("InspectName06"))}>6</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(7, this.getFieldForm("CheckupName07"), this.getFieldForm("InspectCd07"), this.getFieldForm("InspectName07"))}>7</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(8, this.getFieldForm("CheckupName08"), this.getFieldForm("InspectCd08"), this.getFieldForm("InspectName08"))}>8</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(9, this.getFieldForm("CheckupName09"), this.getFieldForm("InspectCd09"), this.getFieldForm("InspectName09"))}>9</div>
                        <div style={styleDivTitle1} onClick={() => this.AddTestingSpecification(10, this.getFieldForm("CheckupName10"), this.getFieldForm("InspectCd10"), this.getFieldForm("InspectName10"))}>10</div>
                      </Col>
                      <Col span={3}>
                        <div style={styleDivTitle}>受託</div>
                        <Form.Item name="FiduciaryBusinessAdd01Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd01Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd01Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="FiduciaryBusinessAdd02Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd02Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd02Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="FiduciaryBusinessAdd03Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd03Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd03Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="FiduciaryBusinessAdd04Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd04Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd04Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="FiduciaryBusinessAdd05Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd05Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd05Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="FiduciaryBusinessAdd06Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd06Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd06Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="FiduciaryBusinessAdd07Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd07Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd07Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="FiduciaryBusinessAdd08Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd08Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd08Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="FiduciaryBusinessAdd09Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd09Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd09Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="FiduciaryBusinessAdd10Screen" style={styleFormItem1}>
                          <Select onChange={(val) => {
                            this.setState({ checkFiduciaryBusinessAdd10Screen: true })
                            if (val === 1) {
                              this.setState({ checkFiduciaryBusinessAdd10Screen: false })
                            }
                          }}>
                            <Select.Option value={0}>対象外</Select.Option>
                            <Select.Option value={1}>対象</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <div style={styleDivTitle}>追加健診名</div>
                        <Form.Item name='CheckupName01' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd01Screen} />
                        </Form.Item>
                        <Form.Item name='CheckupName02' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd02Screen} />
                        </Form.Item>
                        <Form.Item name='CheckupName03' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd03Screen} />
                        </Form.Item>
                        <Form.Item name='CheckupName04' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd04Screen} />
                        </Form.Item>
                        <Form.Item name='CheckupName05' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd05Screen} />
                        </Form.Item>
                        <Form.Item name='CheckupName06' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd06Screen} />
                        </Form.Item>
                        <Form.Item name='CheckupName07' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd07Screen} />
                        </Form.Item>
                        <Form.Item name='CheckupName08' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd08Screen} />
                        </Form.Item>
                        <Form.Item name='CheckupName09' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd09Screen} />
                        </Form.Item>
                        <Form.Item name='CheckupName10' style={styleFormItem1}>
                          <Input maxLength={30} readOnly={this.state.checkFiduciaryBusinessAdd10Screen} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <div style={styleDivTitle}>ｺｰﾄﾞ</div>
                        <Form.Item name='InspectCd01' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd01Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd01: output.Lio_InspectItemCode,
                                      InspectName01: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item name='InspectCd02' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd02Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd02: output.Lio_InspectItemCode,
                                      InspectName02: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item name='InspectCd03' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd03Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd03: output.Lio_InspectItemCode,
                                      InspectName03: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item name='InspectCd04' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd04Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd04: output.Lio_InspectItemCode,
                                      InspectName04: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item name='InspectCd05' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd05Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd05: output.Lio_InspectItemCode,
                                      InspectName05: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item name='InspectCd06' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd06Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd06: output.Lio_InspectItemCode,
                                      InspectName06: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item name='InspectCd07' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd07Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd07: output.Lio_InspectItemCode,
                                      InspectName07: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item name='InspectCd08' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd08Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd08: output.Lio_InspectItemCode,
                                      InspectName08: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item name='InspectCd09' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd09Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd09: output.Lio_InspectItemCode,
                                      InspectName09: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                        <Form.Item name='InspectCd10' style={styleFormItem1}>
                          <Input.Search readOnly disabled={this.state.checkFiduciaryBusinessAdd10Screen} onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: (<WS0271001_InspectItemSearchQuerySingle
                                  onFinishScreen={(output) => {
                                    this.formRef.current.setFieldsValue({
                                      InspectCd10: output.Lio_InspectItemCode,
                                      InspectName10: output.recordData.exam_short_name
                                    });
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }} />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <div style={styleDivTitle}>検査名</div>
                        <Form.Item name='InspectName01' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item name='InspectName02' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item name='InspectName03' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item name='InspectName04' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item name='InspectName05' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item name='InspectName06' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item name='InspectName07' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item name='InspectName08' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item name='InspectName09' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item name='InspectName10' style={styleFormItem1}>
                          <Input readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <div style={styleDivTitle}>単価</div>
                        <Form.Item name='additional_medical_exam_unit_price_01' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd01Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_01', null)} />
                        </Form.Item>
                        <Form.Item name='additional_medical_exam_unit_price_02' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd02Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_02', null)} />
                        </Form.Item>
                        <Form.Item name='additional_medical_exam_unit_price_03' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd03Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_03', null)} />
                        </Form.Item>
                        <Form.Item name='additional_medical_exam_unit_price_04' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd04Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_04', null)} />
                        </Form.Item>
                        <Form.Item name='additional_medical_exam_unit_price_05' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd05Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_05', null)} />
                        </Form.Item>
                        <Form.Item name='additional_medical_exam_unit_price_06' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd06Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_06', null)} />
                        </Form.Item>
                        <Form.Item name='additional_medical_exam_unit_price_07' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd07Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_07', null)} />
                        </Form.Item>
                        <Form.Item name='additional_medical_exam_unit_price_08' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd08Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_08', null)} />
                        </Form.Item>
                        <Form.Item name='additional_medical_exam_unit_price_09' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd09Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_09', null)} />
                        </Form.Item>
                        <Form.Item name='additional_medical_exam_unit_price_10' style={styleFormItem1}>
                          <Input maxLength={6} readOnly={this.state.checkFiduciaryBusinessAdd10Screen} onBlur={(val) => this.onBlurNumber(val, 'additional_medical_exam_unit_price_10', null)} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col span={2}>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>No</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>1</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>2</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>3</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>4</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>5</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>6</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>7</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>8</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>9</div>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>10</div>
                      </Col>
                      <Col span={16}>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>同時実施健診名</div>
                        <Form.Item name='same_time_name_01' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                        <Form.Item name='same_time_name_02' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                        <Form.Item name='same_time_name_03' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                        <Form.Item name='same_time_name_04' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                        <Form.Item name='same_time_name_05' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                        <Form.Item name='same_time_name_06' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                        <Form.Item name='same_time_name_07' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                        <Form.Item name='same_time_name_08' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                        <Form.Item name='same_time_name_09' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                        <Form.Item name='same_time_name_10' style={styleFormItem1}>
                          <Input maxLength={40} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <div style={{ ...styleDivTitle1, backgroundColor: '#1c66b9', color: '#FFFFFF' }}>差引金額</div>
                        <Form.Item name='same_time_unit_price_01' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_01', null)} />
                        </Form.Item>
                        <Form.Item name='same_time_unit_price_02' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_02', null)} />
                        </Form.Item>
                        <Form.Item name='same_time_unit_price_03' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_03', null)} />
                        </Form.Item>
                        <Form.Item name='same_time_unit_price_04' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_04', null)} />
                        </Form.Item>
                        <Form.Item name='same_time_unit_price_05' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_05', null)} />
                        </Form.Item>
                        <Form.Item name='same_time_unit_price_06' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_06', null)} />
                        </Form.Item>
                        <Form.Item name='same_time_unit_price_07' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_07', null)} />
                        </Form.Item>
                        <Form.Item name='same_time_unit_price_08' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_08', null)} />
                        </Form.Item>
                        <Form.Item name='same_time_unit_price_09' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_09', null)} />
                        </Form.Item>
                        <Form.Item name='same_time_unit_price_10' style={styleFormItem1}>
                          <Input maxLength={6} onBlur={(val) => this.onBlurNumber(val, 'same_time_unit_price_10', null)} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Form.Item name="option_remark" className='mt-3'>
                  <Input />
                </Form.Item>
              </Spin>
            </Col>
          </Row>
          <Button style={{ float: 'right' }} type="primary" htmlType="submit">SAVE</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1317001_ContractMasterDetails);
