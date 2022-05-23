import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Select, Button, Table, Row, Col, Space, Input, Modal, message } from "antd";
import { SaveOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import WS0267001_CategorySearchQuerySingle from "pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle";
const examData = [
  {
    id: 0,
    comment_code: 123,
    category_name: "Hello world 1"
  },
  {
    id: 1,
    comment_code: 124,
    category_name: "Hello world 2"
  },
  {
    id: 2,
    comment_code: 125,
    category_name: "Hello world 3"
  },
]
class WS0932001_RequiredPrecisionExaminerSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    // document.title = '要精検者設定';
    this.state = {
      loading: false,
      childModal: {
        width: 0,
        visible: false,
        component: null
      },
      selectedRowKeys: [],
      selectedRows: [],
      shouldUpdate: { dataId: null, status: false },
    };
  }
  componentDidMount() {
    this.getScreenData()
  }
  //@desc: get Combobox value
  getScreenData = () => {
    // call api
    this.formRef.current.setFieldsValue({
      tableData: [],
      tableData2: []
    })
  }
  onGetTableData = (e) => {
    this.formRef.current.setFieldsValue({
      tableData: examData
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)
    message.success('Success')
  }
  handleAddNew = () => {
    let newId = 0;
    this.formRef.current.getFieldValue('tableData').map(item => item.id > newId ? newId = item.id : newId)
    let newData = { id: newId + 1, comment_code: "", category_name: "" }
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
  changeRow = () => {
    // call api -> tableData2
    this.formRef.current.setFieldsValue({
      tableData2: [{}]
    })
  }
  onSave = (e) => {
    this.setState({
      shouldUpdate: { dataId: null, status: false },
    })
  }
  openModalInspecInquiry = (value) => {
    // @desc: open Modal check StsGet 
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: <div
          onFinishScreen={(output) => {
            //@desc: return Lo_StsGet -> Exit
            this.closeModal()
          }}
        />
      }
    })
    //@desc: StsGet ? this.callBatchCapture() : return;
    // Refresh Screen
  }
  openModalCategorySearchQuerySingle = (value) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '40%',
        component: <WS0267001_CategorySearchQuerySingle
          onFinishScreen={(output) => {
            console.log(output);
            // @desc:  output value
            // regional_insurer_group_classif = output.Lio_CategoryCode
            this.closeModal()
            // Refresh Table 
          }}
        />
      }
    })
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }
  onFinish(values) {

  }

  render() {
    return (
      <div className="required-precision-examiner-setting">
        <Card title="要精検者設定">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="診療科"
            >
              <Select onChange={(e) => {
                this.setState({
                  loading: true,
                })
                this.onGetTableData(e)
              }}>
                <Select.Option value="all">{' '}</Select.Option>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
              </Select>
            </Form.Item>

            <Row gutter={6} className="mb-3">
              <Col span={8}>
                <Table
                  size="small"
                  bordered
                  loading={this.state.loading}
                  dataSource={this.formRef.current?.getFieldValue('tableData')}
                  pagination={false}
                  rowSelection={{
                    type: 'radio',
                    selectedRowKeys: this.state.selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                      this.setState({
                        selectedRowKeys: selectedRowKeys,
                        selectedRows: selectedRows,
                      });
                      this.changeRow();
                    },
                  }}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="連番" dataIndex="" key="" render={(value, record, index) => {
                    return (
                      <Form.Item name={['tableData', index, 'comment_code']}>
                        <Input readOnly={record.id === this.state.shouldUpdate.dataId && this.state.shouldUpdate.status ? false : true} type="number" />
                      </Form.Item>
                    )
                  }} />
                  <Table.Column title="カテゴリ名称" dataIndex="" key="" render={(value, record, index) => {
                    return (
                      <Form.Item name={['tableData', index, 'category_name']}>
                        <Input.Search readOnly onSearch={this.openModalCategorySearchQuerySingle} />
                      </Form.Item>
                    )
                  }} />
                  <Table.Column title={<Button disabled={this.formRef.current?.getFieldValue('tableData').length > 0 ? false : true} size='small' type='primary' icon={<PlusOutlined />} align="center" style={{ textAlign: 'center' }} onClick={() => this.handleAddNew()}  ></Button>} dataIndex="" key="" render={(value, record, index) => {
                    return (
                      <Space style={{ width: 80, justifyContent: 'center' }}>
                        {record.id === this.state.shouldUpdate.dataId && this.state.shouldUpdate.status ? <Button size='small'
                          style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                          icon={<SaveOutlined />}
                          onClick={(e) => { this.onSave(e) }}></Button> : ''}
                        <Button size='small'
                          style={{ border: 'none' }}
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？',
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () => this.Delete(record)
                            })
                          }}
                        ></Button>
                      </Space>
                    )
                  }} />
                </Table>
              </Col>
              <Col span={16}>
                <Table
                  size="small"
                  bordered
                  dataSource={this.formRef.current ? this.formRef.current.getFieldValue('tableData2') : [{}]}
                  pagination={false}
                >
                  <Table.Column title="検査名称" dataIndex="" key="" render={(value, record, index) => {
                    return (
                      <Form.Item name={['tableData2', index, 'exam_name']}>
                        <Input.Search onSearch={this.openModalInspecInquiry} />
                      </Form.Item>
                    )
                  }} />
                  <Table.Column title="診療科" dataIndex="" key="" render={(value, record, index) => {
                    return (
                      <Form.Item name={['tableData2', index, 'department_code']}>
                        <Select>
                          <Select.Option>1</Select.Option>
                          <Select.Option>2</Select.Option>
                          <Select.Option>3</Select.Option>
                          <Select.Option>4</Select.Option>
                          <Select.Option>5</Select.Option>
                        </Select>
                      </Form.Item>
                    )
                  }} />

                </Table>
              </Col>
            </Row>
            <Form.Item
            >
              <Button type="primary" htmlType="submit">閉じる</Button>
            </Form.Item>

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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0932001_RequiredPrecisionExaminerSetting);
