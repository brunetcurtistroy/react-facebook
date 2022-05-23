import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { PlusOutlined, DeleteOutlined, SaveOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Card, Table, Form, Select, Input, Modal, Button, Row, Col, InputNumber } from "antd";
import WS2320001_QueryNameOfDisease from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2320001_QueryNameOfDisease.jsx';
import HistoryInputSubAction from "redux/InputBusiness/NotInputCheckCategory/HistoryInputSub.action";
class WS0714001_HistoryInputSub extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_PersonalNum: PropTypes.any,
    LnkinQueryMode: PropTypes.any,
    Li_HistoryList: PropTypes.any,

  };

  constructor(props) {
    super(props);

    // document.title = '既往歴入力 SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      ComboBox_StateDivisionChar: [],
      dataSource: [],
      isLoading: false,
      isNew: false,
      isSave: false,
      isRequired: false,
      count: 10001,
      Lio_DiseaseNameCode: ''
    };
    
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListData()
    }
  }
  componentDidMount() {
    this.getListData()
  }
  getScreenData() {
    HistoryInputSubAction.getScreenData().then(res => {
      let ComboBox_StateDivisionChar = res && res.ComboBox_StateDivisionChar
      ComboBox_StateDivisionChar = [...ComboBox_StateDivisionChar]
      this.setState({ ComboBox_StateDivisionChar })
    })
  }
  getListData() {
    const params = {
      personal_number_id: this.checkData(this.props.Li_PersonalNum, 'text'),
      LnkinQueryMode: this.checkData(this.props.LnkinQueryMode, 'number'),
      Li_HistoryList: this.checkData(this.props.Li_HistoryList, 'text'),
    }
    this.setState({ isLoading: true })
    HistoryInputSubAction.getListData(params).then(res => {
      const data = res ? res : [] ;
      if(data) {
        let arr = data.map(s => ({...s, age: s.age === 0 ? '' : s.age,
        StateDivisionChar: s.StateDivisionChar === '0' ? '' : s.StateDivisionChar,}))
        this.setState({ dataSource: arr })
        this.setFormFieldValue('dataTable', arr)
        this.getScreenData()
      }

    }).finally(() => { this.setState({ isLoading: false }) })
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  checkData(value, type) {
    const val = type === 'number' ? 0 : ''
    return !this.isEmpty(value) ? value : val
  }
  handleAdd(field) {
    const { count } = this.state;
    const obj = {
      personal_number_id: '', comment: '',
      disease_name_code: '', age: '', StateDivisionChar: '', isNew: true
    }
    const newData = {
      ...obj,
      id: count,
    }
    let data = this.formRef.current?.getFieldValue(field) ? this.formRef.current?.getFieldValue(field) : []
    let arr = [...data];
    arr.unshift(newData)
    this.setFormFieldValue(field, arr)
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
    })
  }
  AddNewData(field, name) {
    let data = this.formRef.current?.getFieldValue(field) ? this.formRef.current?.getFieldValue(field) : []
    let arr = [...data];
    if (arr.length === 0) {
      this.handleAdd(field);
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index][name].length === 0) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd(field)
        }
      }

    }
    this.setState({isSave: false})
  }
  RemoveNewData(filed) {
    const record = this.formRef.current?.getFieldValue(filed)
    this.setFormFieldValue(filed, record.filter((item, index) => index !== 0))
    this.forceUpdate()
  }
  InsertData() {
    const value = this.formRef.current.getFieldValue('dataTable')[0]
    const params = {
      personal_number_id: this.checkData(this.props.Li_PersonalNum, 'text'),
      disease_name_code: this.checkData(value.disease_name_code, 'text'),
      age: Number(this.checkData(value.age, 'number')),
      StateDivisionChar: this.checkData(value.StateDivisionChar, 'text'),
      comment: this.checkData(value.comment, 'text')
    }
    HistoryInputSubAction.saveData(params).then(result => { this.getListData() })
  }
  EditData(index) {
    const value = this.formRef.current.getFieldValue('dataTable')[index]
    const params = {
      id: this.checkData(value.id, 'text'),
      personal_number_id: this.checkData(value.personal_number_id, 'text'),
      disease_name_code: this.checkData(value.disease_name_code, 'text'),
      age: Number(this.checkData(value.age, 'text')),
      StateDivisionChar: this.checkData(value.StateDivisionChar, 'text'),
      comment: this.checkData(value.comment, 'text')
    }
    HistoryInputSubAction.saveData(params).then(result => { this.getListData() })
  }
  Delete(id) {
    HistoryInputSubAction.deleteData({ id: id }).then(result => this.getListData())
  }
  onFinish = (values) => { }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  disableBtn() {
    console.log('Disabling', this.props.LnkinQueryMode)
   const disabled = this.props.LnkinQueryMode === 1 ? false : true;
   return disabled;
  }
  disableByItem(item) {
    let dataTable = this.formRef?.current?.getFieldValue('dataTable') ?
      this.formRef?.current?.getFieldValue('dataTable') : [];
      
      if(dataTable.some(s => s.id === item.id)) {
        return true
      } else {
        return false;
      }
  }
  render() {
    const { ComboBox_StateDivisionChar, isSave, isNew } = this.state;
    let dataTable = this.formRef?.current?.getFieldValue('dataTable') ?
      this.formRef?.current?.getFieldValue('dataTable') : []
    return (
      <div className="history-input-sub">
        <Card title="既往歴入力 SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              dataSource={dataTable}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => record.id}
              // rowSelection={{
              //   type: 'radio',
              //   onChange: (selectedRowKeys, selectedRows) => {
              //     console.log('selectedRows: ', selectedRows);
              //   }
              // }}
            >
              <Table.Column title="病名ｺｰﾄﾞ" dataIndex="disease_name_code" width={150} align="center"
                render={(item, record, index) => (
                  <Form.Item
                    name={['dataTable', index, 'disease_name_code']}
                    style={{ marginBottom: "0" }}
                  >
                    <Input.Search type="text"
                      onBlur={(event) => {
                        if (event.target.value.length > 0) {
                          this.setState({ isSave: true })
                        }
                      }}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 800,
                            component:
                              <WS2320001_QueryNameOfDisease
                              onFinishScreen={(output) => {
                                if(dataTable.some(s => s.disease_name_code === output?.Lio_DiseaseNameCode)) {
                                  this.setState({ isRequired: true })
                                } else {
                                  this.setState({ isRequired: false })
                                  dataTable[index].disease_name_code = output?.Lio_DiseaseNameCode
                                  dataTable[index].name_of_a_disease = output?.recordData?.name_of_a_disease
                                  this.setFormFieldValue('dataTable', dataTable)
                                }
                              

                                  this.setState({
                                    Lio_DiseaseNameCode: output?.Lio_DiseaseNameCode,
                                    childModal: {
                                      ...this.state.childModal,
                                      visible: false,
                                    },
                                  });
                                }}
                              />
                            ,
                          },
                        });
                      }}
                    />
                  </Form.Item>
                )}
              />
              <Table.Column title="病名" dataIndex="name_of_a_disease" width={210} />
              <Table.Column title="年齢" dataIndex="age"  width={90}
              render={(item, record, index) => {
                return (
                  <Form.Item name={['dataTable', index, 'age']} >
                    {
                      record?.age?.length > 0 ? record.age : <InputNumber type="number" />
                    }
                  </Form.Item>
                )
              }} />
              <Table.Column title="状態区分" dataIndex="StateDivisionChar" width={180}
                render={(item, record, index) => (
                  <Form.Item
                    name={['dataTable', index, 'StateDivisionChar']}
                    label="提出先"
                    style={{ marginBottom: "0" }}
                  >
                    <Select disabled={this.disableBtn()} style={{ width: '100%' }} onChange={(event) => {
                    this.setState({ isSave: this.state.isRequired ? false: true })
                    }}>
                      {ComboBox_StateDivisionChar.map((item, index) => (
                        <Select.Option key={index} value={item.LinkedField}>{item.DisplayField}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              />
              <Table.Column title="コメント" dataIndex="comment" render={(item, record, index) => {
                return (
                  <Form.Item name={['dataTable', index, 'comment']} >
                    {
                      <Input type="text" onBlur={(event) => {
                        if (event.target.value.length > 0) this.setState({ isSave: true })
                      }} />
                    }
                  </Form.Item>
                )
              }} />
              <Table.Column title={<Button 
              disabled={this.disableBtn()}
              size='small'
                type='primary'
                style={{ textAlign: 'center' }}
                icon={<PlusOutlined />} onClick={() => { this.AddNewData('dataTable', 'disease_name_code') }}  ></Button>}
                render={(item, record, index) => {
                  return (
                    <Row gutter={24}>
                      <Col span={12}>
                        {
                          !!!record?.isNew ?
                            <Button type="primary" disabled={this.disableBtn()  } icon={<SaveOutlined />} onClick={() => { this.EditData(index) }}></Button> :
                            <Button type="primary"  disabled={!isSave || this.disableBtn()  } onClick={() => { this.InsertData() }} icon={<SaveOutlined />}></Button>
                        }

                      </Col>
                      <Col span={12}>
                        {!!!record?.isNew ?
                          <Button disabled={this.disableBtn()} danger type="primary" onClick={() => { this.Delete(record.id) }} icon={<DeleteOutlined />}></Button> :
                          <Button disabled={this.disableBtn()} type="primary" onClick={() => { this.RemoveNewData('dataTable') }} icon={<DeleteOutlined />}></Button>
                        }


                      </Col>
                    </Row>
                  )
                }} />
            </Table>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0714001_HistoryInputSub);
