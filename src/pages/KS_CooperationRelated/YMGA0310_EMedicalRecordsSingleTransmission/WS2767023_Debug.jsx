import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Input, Checkbox, Form, message, Modal, Button, DatePicker } from "antd";
import DebugAction from 'redux/CooperationRelated/EMedicalRecordsSingleTransmission/Debug.actions'
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import moment from "moment";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2767023_Debug extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_Unsent: PropTypes.any,
    Li_Sent: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'デバッグ';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRow: {},
      count: "a",
    };
  }
  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      tableData: []
    })
    this.forceUpdate()
    this.GetListData()
  }
  componentDidUpdate(PreV) {
    if (this.props !== PreV) {
      this.GetListData()
    }
  }
  GetListData() {
    if (this.props.Li_ReserveNum) {
      this.setState({ isloadding: true })
      let data = {
        W1_reserve_num: this.props.Li_ReserveNum,
      }
      DebugAction.GetListData(data).then(res => {
        if (res?.length > 0) {
          res?.map((value, index) => {
            if (this.isEmpty(value.exam_scheduled_date_on)) {
              value.exam_scheduled_date_on = moment(null)
            } else {
              value.exam_scheduled_date_on = moment(value.exam_scheduled_date_on)
            }
            if (index === res.length - 1) {
              this.formRef.current?.setFieldsValue({ tableData: res })
              this.forceUpdate()
            }
          })

        } else {
          this.formRef.current?.setFieldsValue({ tableData: [] })
          this.forceUpdate()
        }
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isloadding: false }))
    }
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }
  AddNewData() {
    const { count } = this.state;
    const newData = {
      id: count,
      exam_code: "",
      short_name: "",
      Expression_3: "",
      transmission_state: "",
      personal_number_id: "",
      exam_scheduled_date_on: "",
      urgent_division: "",
      reserve: "",
      exam_group: ""
    };
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
    })
  }
  SaveData(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    for (const index in arr) {
      if (arr[index].id === record.id) {
        if (this.isEmpty(record.exam_code)) return;
        if (isNaN(record.id)) {
          let obj = {
            exam_code: arr[index].exam_code,
            short_name: arr[index].short_name,
            Expression_3: "",
            transmission_state: arr[index].transmission_state ? 1 : 0,
            personal_number_id: arr[index].personal_number_id,
            exam_scheduled_date_on: arr[index].exam_scheduled_date_on,
            urgent_division: arr[index].urgent_division,
            reserve: arr[index].reserve,
            exam_group: arr[index].exam_group
          }
          this.Save(obj)
          return;
        } else {
          this.Save(arr[index])
          return;
        }
      }
    }
  }
  Save(obj) {
    this.setState({ isloadding: true })
    DebugAction.Save(obj).then(res => {
      this.GetListData()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))

  }
  Delete(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    if (isNaN(record.id)) {
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
      //delete DB  
      this.setState({ isloadding: true })
      DebugAction.Delete({ id: record.id }).then(res => {
        this.GetListData()
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isloadding: false }))
    }
  }

  render() {
    return (
      <div className="debug">
        <Card title="デバッグ">
          <Form ref={this.formRef} autoComplete="off" >
            <Table dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
              loading={this.state.isloadding}
              pagination={false} bordered={true} size="small"
              rowKey={(record) => record.id} scroll={{ y: 700 }}
              rowSelection={{
                type: 'radio',
                onChange: async (selectedRowKeys, selectedRows) => {
                  await this.setState({ selectedRow: selectedRows[0] })
                }
              }}  >
              <Table.Column title="コード"
                render={(value, record, index) => (
                  <Form.Item style={{ marginBottom: '0px' }} name={['tableData', index, 'exam_code']}>
                    <Input.Search
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length > 20) {
                          const exam_code = ['tableData', index, 'exam_code']
                          this.formRef.current?.setFields([
                            { name: exam_code, value: value.slice(0, 20) },
                          ])
                          this.forceUpdate()
                        }
                      }}
                      onSearch={(value) => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '70%',
                            component: (
                              <WS0271001_InspectItemSearchQuerySingle
                                Lio_InspectItemCode={record.exam_code}
                                onFinishScreen={(output) => {
                                  const exam_code = ['tableData', index, 'exam_code']
                                  const short_name = ['tableData', index, 'short_name']
                                  this.formRef.current?.setFields([
                                    { name: exam_code, value: output?.Lio_InspectItemCode },
                                    { name: short_name, value: output?.recordData?.exam_short_name },
                                  ])
                                  this.forceUpdate()
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }} />
                  </Form.Item>
                )} />
              <Table.Column title="略称" dataIndex="short_name" />
              <Table.Column title="検査" dataIndex="Expression_3" />
              <Table.Column title="送信" width={60}
                render={(value, record, index) => (
                  <Form.Item style={{ marginBottom: '0px' }} name={['tableData', index, 'transmission_state']}>
                    <Checkbox></Checkbox>
                  </Form.Item>
                )} />
              <Table.Column title="個人"
                render={(value, record, index) => (
                  <Form.Item style={{ marginBottom: '0px' }} name={['tableData', index, 'personal_number_id']}>
                    <Input maxLength={10} />
                  </Form.Item>
                )} />
              <Table.Column title="検査予定日"
                render={(value, record, index) => (
                  <Form.Item style={{ marginBottom: '0px' }} name={['tableData', index, 'exam_scheduled_date_on']}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} />
                  </Form.Item>
                )} />
              <Table.Column title="至急" width={60}
                render={(value, record, index) => (
                  <Form.Item style={{ marginBottom: '0px' }} name={['tableData', index, 'urgent_division']}>
                    <Input maxLength={1} onChange={(e) => {
                      let value = e.target.value;
                      const urgent_division = ['tableData', index, 'urgent_division']
                      if (isNaN(value)) {
                        this.formRef.current?.setFields([
                          { name: urgent_division, value: "" }
                        ])
                        this.forceUpdate()
                      }
                    }} />
                  </Form.Item>
                )} />
              <Table.Column title="予備"
                render={(value, record, index) => (
                  <Form.Item style={{ marginBottom: '0px' }} name={['tableData', index, 'reserve']}>
                    <Input maxLength={19} />
                  </Form.Item>
                )} />
              <Table.Column title="検査群"
                render={(value, record, index) => (
                  <Form.Item style={{ marginBottom: '0px' }} name={['tableData', index, 'exam_group']}>
                    <Input maxLength={20} />
                  </Form.Item>
                )} />
              <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2767023_Debug);
