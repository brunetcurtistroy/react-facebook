import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input, Button, Modal, message } from "antd";
import { SaveOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import InspectInputService from "services/IntroductionLetter/IntroduceLetterExtract/InspectInput";
import PropTypes from "prop-types";
import { debounce } from "lodash";

class WS0898028_InspectInput extends React.Component {

  static propTypes = {
    Li_CourseLevel: PropTypes.number,
    Li_ReserveNum: PropTypes.number,
    Li_Department: PropTypes.number,
    Li_Date: PropTypes.instanceOf(Date),
    Li_PersonalNum: PropTypes.string,
    Li_AcceptNum: PropTypes.number,
    Li_PatternCode: PropTypes.string
  }

  formRef = React.createRef()
  constructor(props) {
    super(props);

    // document.title = "検査入力";

    this.state = {
      loading: false,
      selectedRowKeys: [],
      selectedRows: [],
      shouldUpdate: { dataId: null, status: false },
      selectedRowChange: {
        exam_code: null,
        group_judgement: null,
      }
    };
  }
  componentDidMount() {
    this.onGetScreenData()
  }
  
  onGetScreenData = () => {
    this.setState({
      loading: true,
    })
    let params = {
      course_level: this.props.Li_CourseLevel || 0,
      reservation_number: this.props.Li_ReserveNum || 201903130000001,
      visit_date_on: this.props.Li_Date || "2019-03-13",
      pattern_code: this.props.Li_PatternCode || "0000-100",
      accepted_no: this.props.Li_AcceptNum || 1,
      department: this.props.Li_Department || 12,
      W1_id_cd: this.props.Li_PersonalNum || 121
    }
    InspectInputService.onGetInspectInput(params)
      .then(res => {
        this.formRef.current.setFieldsValue({
          tableData: res.data
        })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({
          loading: false
        })
      })
  }

  onEventGZom = (e) => {
    let params = {
      visit_date_on: this.props.Li_Date || '2019-03-13',
      personal_number_id: this.props.Li_PersonalNum,
      accepted_no: this.props.Li_AcceptNum || 1,
      medical_exam_course: this.props.medical_exam_course || "X",
    }
    InspectInputService.onGzoom(params)
      .then(res => {
        message.info(res.data.message.scalar ? res.data.message.scalar : '')
      })
      .catch(error => {
        console.log(error)
      })
      /**
       * this.modal.... WS0903002
       */
  }

  rowSelectedChange = (rowKeys, rowSelected) => {
    if (rowSelected.exam_code === 0) {
      return Modal.error({
        title: '検査ｺｰﾄﾞ入力ｴﾗｰ',
        okText: 'OK'
      })
    }

  }
  AddNewData = () => {
    let newId = 0;
    this.formRef.current.getFieldValue('tableData').map(item => item.id > newId ? newId = item.id : newId)
    let newData = {
      id: newId + 1,
      exam_code: parseInt(0),
      exam_name: "",
      judgment_value: "",
      category_judgment: "",
      group_judgement: "",
    }
    this.setState({
      selectedRows: [newData],
      selectedRowKeys: [newId + 1],
      shouldUpdate: { dataId: newId + 1, status: true },
    })
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
  }

  onDelete = (record, id) => {
    this.setState({
      loading: true
    })
    let params = {
      id: id,
      exam_code: record.exam_code,
      group_judgement: record.group_judgement,
      reservation_number: this.props.Li_ReserveNum,
      course_level: this.props.Li_CourseLevel,
      visit_date_on: this.props.Li_Date,
      personal_number_id: this.props.Li_PersonalNum,
      accepted_no: this.props.Li_AcceptNum || 1,
      department: this.props.Li_Department,
    }
    InspectInputService.onDeleteData(params)
      .then(res => {
        if (res.data.Lo_CheckResult === true) {
          this.onGetScreenData()
        } else {
          return Modal.error({
            title: '検査値が、入力されていません',
            okText: 'Ok'
          })
        }
      })
      .catch(error => {
        message.error(error)
      })
  }
  
  onSave = (record) => {
    if (this.state.shouldUpdate.status && this.state.shouldUpdate.dataId === this.state.selectedRowKeys[0]) {
      console.log('Created')
      // Verification .... 
      let condition = parseInt(record.exam_code);
      if (this.formRef.current.getFieldValue('tableData').filter(item => item.exam_code === condition).length > 0) {
        return Modal.error({
          title: '検査が重複しています。',
          okText: 'OK'
        })
      }
      let params = {
        exam_code: condition,
        group_judgement: record.group_judgement,
        reservation_number: this.props.Li_ReserveNum || "",
        course_level: this.props.Li_CourseLevel || "",
        visit_date_on: this.props.Li_Date || "",
        personal_number_id: this.props.Li_PersonalNum || "",
        accepted_no: this.props.Li_AcceptNum || "",
        department: this.props.Li_Department || "",
      }
      this.setState({
        loading: true
      })
      InspectInputService.onSaveData(params)
        .then(res => {
          if (res.data.Lo_CheckResult === true) {
            this.onGetScreenData()
          } else {
            return Modal.error({
              title: '検査値が、入力されていません',
              okText: 'Ok'
            })
          }
        })
        .catch(error => {
          message.error(error)
        }).finally(() => {
          this.setState({
            shouldUpdate: {
              dataIt: null,
              status: false,
            }
          })
        })
    } else {
      console.log('Updated')
      let params = {
        id: record.id,
        exam_code: record.exam_code,
        group_judgement: record.group_judgement,
        reservation_number: this.props.Li_ReserveNum || "",
        course_level: this.props.Li_CourseLevel || "",
        visit_date_on: this.props.Li_Date || "",
        personal_number_id: this.props.Li_PersonalNum || "",
        accepted_no: this.props.Li_AcceptNum || "",
        department: this.props.Li_Department || "",
      }
      InspectInputService.onSaveData(params)
        .then(res => {
          if (res.data.Lo_CheckResult === true) {
            this.onGetScreenData()
          } else {
            return Modal.error({
              title: '検査値が、入力されていません',
              okText: 'Ok'
            })
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  onFinish = (values) => {

  }
  render() {
    return (
      <div className="inspect-input">
        <Card title="検査入力">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              size="small"
              bordered
              dataSource={this.formRef.current?.getFieldValue('tableData')}
              loading={this.state.loading}
              pagination={false}
              rowKey={(record) => record.id}
              rowSelection={{
                type: 'radio',
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows,
                  });
                  this.rowSelectedChange(selectedRowKeys[0], selectedRows[0])
                }
              }}
            >
              <Table.Column title="検査コード" width="12%" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'exam_code']}>
                    <Input
                      type="number"
                      readOnly={record.id === this.state.shouldUpdate.dataId && this.state.shouldUpdate.status ? false : true}
                      onChange={(e) => {
                        this.setState({ rowSelectedChange: { ...this.state.rowSelectedChange, exam_code: parseInt(e.target.value) } })
                      }}
                      onDoubleClick={debounce((e) => this.onEventGZom(), 300)}
                      // onSearch={(e) => { this.onEventGZom(e) }}
                      style={{ textAlign: 'right' }}
                    />
                  </Form.Item>
                )
              }} />
              <Table.Column title="検査名" dataIndex="" width="345px" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'exam_name']}>
                    <span>{record.exam_name}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="結果" dataIndex="" width="345px" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, '']}>
                    <span>{record.Expresstion_17}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="判定" dataIndex="" width="8%" align="center" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'judgment_value']}>
                    <span>{record.judgment_value}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="カテゴリ" dataIndex="" width="10%" align="center" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'category_judgment']}>
                    <span>{record.category_judgment}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="紹介状" dataIndex="" width="10%" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'group_judgement']}>
                    <Input
                      type="text"
                      style={{ textAlign: 'center' }}
                      maxLength={3}
                      onChange={(e) => this.setState({
                        rowSelectedChange: {
                          ...this.state.rowSelectedChange, group_judgement: e.target.value
                        }
                      })}
                    />
                  </Form.Item>
                )
              }} />
              <Table.Column width="70px" align='center'
                title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                render={(text, record, index) => {
                  return <>
                    <Button size='small'
                      hidden={record.id === this.state.selectedRowKeys[0] ? false : true}
                      style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                      icon={<SaveOutlined />}
                      onClick={() => {
                        this.onSave(record)
                      }}
                    ></Button>
                    <Button size='small'
                      disabled={record.id === this.state.selectedRowKeys[0] ? false : true}
                      style={{ border: 'none' }}
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.onDelete(record)
                        })
                      }}
                    ></Button>
                  </>
                }}
              />
            </Table>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0898028_InspectInput);
