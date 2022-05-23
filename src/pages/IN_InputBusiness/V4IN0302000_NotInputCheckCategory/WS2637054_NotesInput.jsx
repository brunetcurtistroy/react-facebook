import React from "react";
import { connect } from "react-redux";
import { PlusOutlined, DeleteOutlined, SaveOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import NotesInputAction from "redux/InputBusiness/NotInputCheckCategory/NotesInput.action";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Table, Form, Input, Button, Modal, Col, Row, InputNumber } from "antd";
import WS0272001_CautionGuideNotesSearchQuery from 'pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0272001_CautionGuideNotesSearchQuery.jsx';
import PropTypes from "prop-types";
class WS2637054_NotesInput extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_PatternCode: PropTypes.any,
    Li_CategoryCode: PropTypes.any,
    Li_CategoryName: PropTypes.any,
    Lio_StsNotesChange: PropTypes.any,
  }
  constructor(props) {
    super(props);

    // document.title = '注意事項入力';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoading: false,
      isSave: false,
      count: 0,
    };
  }
  componentDidMount() {
    this.getListData()
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListData()
    }
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  checkData(value, type) {
    const val = type === 'number' ? 0 : ''
    return !this.isEmpty(value) ? value : val
  }
  getListData() {
    const params = {
      pattern_code: this.checkData(this.props.Li_PatternCode, 'text'),
      category_cd: this.checkData(this.props.Li_CategoryCode, 'number'),
      category_name: this.checkData(this.props.Li_CategoryName, 'text'),
    }
    this.setState({ isLoading: true })
    NotesInputAction.getListData(params).then(result => {
      this.setFormFieldValue('dataTable', result)
    }).finally(() => this.setState({ isLoading: false }))
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  handleAdd(field) {
    let data = this.formRef.current?.getFieldValue(field) ? this.formRef.current?.getFieldValue(field) : []

    const { count } = this.state;
    const countArr = data[data.length - 1].W5_serial_num
    const obj = {
      W5_serial_num: (countArr + 1),
      W5_notes_comment: '', W5_category_determining_cd: 0, isNew: true
    }
    const newData = {
      ...obj,
      id: count,
    }
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
        if (arr[index][name] === 0) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd(field)
        }
      }

    }
  }
  RemoveNewData(filed) {
    const record = this.formRef.current?.getFieldValue(filed)
    this.setFormFieldValue(filed, record.filter((item, index) => index !== 0))
    this.forceUpdate()
  }
  UpdateData(index) {
    const value = this.formRef.current.getFieldValue('dataTable')[index]
    const params = {
      id: this.checkData(value.id, 'number'),
      W5_serial_num: this.checkData(value.W5_serial_num, 'number'),
      W5_notes_comment: this.checkData(value.W5_notes_comment, 'text'),
      W5_category_determining_cd: this.checkData(value.W5_category_determining_cd, 'number'),
      category_cd: this.checkData(this.props.Li_CategoryCode, 'number'),
    }
    NotesInputAction.saveData(params).then(() => this.getListData())
  }
  InsertData() {
    const value = this.formRef.current.getFieldValue('dataTable')[0]
    const params = {
      id: 0,
      W5_serial_num: this.checkData(value.W5_serial_num, 'number'),
      W5_notes_comment: this.checkData(value.W5_notes_comment, 'text'),
      W5_category_determining_cd: this.checkData(value.W5_category_determining_cd, 'number'),
      category_cd: this.checkData(this.props.Li_CategoryCode, 'number'),
    }
    NotesInputAction.saveData(params).then(() => this.getListData())
  }
  deleteData(id) {
    NotesInputAction.deleteData({ id: id }).then(result => {
      this.getListData()
    })
  }
  onFinish() {

  }
  render() {
    const { isSave } = this.state
    let dataTable = this.formRef?.current?.getFieldValue('dataTable') ?
      this.formRef?.current?.getFieldValue('dataTable') : []

    return (
      <div className="notes-input">
        <Card title="注意事項入力">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={dataTable}
              className="mb-3"
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
              <Table.Column title="連番" dataIndex="W5_serial_num" width={75}
                render={(item, record, index) => (
                  <Form.Item
                    name={['dataTable', index, 'W5_serial_num']}
                    style={{ marginBottom: "0" }}
                  >
                    <InputNumber onBlur={(event) => {
                      if (event.target.value.length > 0) {
                        this.setState({ isSave: true })
                      }
                    }} />
                  </Form.Item>
                )}
              />
              <Table.Column title="コード" dataIndex="W5_category_determining_cd" width={125}
                render={(item, record, index) => (
                  <Form.Item
                    name={['dataTable', index, 'W5_category_determining_cd']}
                    style={{ marginBottom: "0" }}

                  >
                    <Input.Search type="text"
                    readOnly
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
                              <WS0272001_CautionGuideNotesSearchQuery
                                onFinishScreen={(output) => {
                                  const value = this.formRef?.current?.getFieldValue('dataTable')[index]
                                  value.W5_category_determining_cd = output?.Lo_LnkOutCmtCode
                                  value.W5_notes_comment = output?.Lo_recordData?.comment_content
                                  this.setState({
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
              <Table.Column title="注意事項" dataIndex="W5_notes_comment" width={250}
                render={(item, record, index) => (
                  <Form.Item
                    name={['dataTable', index, 'W5_notes_comment']}
                    style={{ marginBottom: "0" }}
                  >
                    <Input readOnly type="text" onBlur={(event) => {
                      if (event.target.value.length > 0) {
                        this.setState({ isSave: true })
                      }
                    }} />
                  </Form.Item>
                )}
              />
              <Table.Column title={<Button size='small' width={90}
                type='primary'
                style={{ textAlign: 'center' }}
                icon={<PlusOutlined />} 
                disabled={dataTable.some(s => s.id === 0)}
                onClick={() => { this.AddNewData('dataTable', 'W5_serial_num') }}  ></Button>}
                render={(item, record, index) => {
                  return (
                    <Row gutter={20} style={{ textAlign: 'center' }}>
                      <Col span={10}>
                        {
                          !!!record?.isNew && record.id !== 0?
                            <Button type="primary" icon={<SaveOutlined />} onClick={() => { this.UpdateData(index) }}></Button> :
                            <Button danger type="primary" disabled={!isSave && record.id !== 0 } onClick={() => { this.InsertData() }} icon={<SaveOutlined />}></Button>
                        }

                      </Col>
                      <Col span={10}>
                        {!!!record?.isNew  && record.id !== 0?
                          <Button type="primary" onClick={() => { this.deleteData(record.id) }} icon={<DeleteOutlined />}></Button> :
                          <Button type="primary" onClick={() => { this.RemoveNewData('dataTable') }} icon={<DeleteOutlined />}></Button>
                        }


                      </Col>
                    </Row>
                  )
                }} />
            </Table>
            <Form.Item
            >
              <Button type="primary" style={{ float: "right" }} onClick={() => this.props.onScreenFinish({ Exit: true })}>確　定</Button>
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2637054_NotesInput);
