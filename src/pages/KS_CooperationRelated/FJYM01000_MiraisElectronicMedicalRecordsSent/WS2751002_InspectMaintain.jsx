import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Form, Input, Select, Menu, Dropdown, message, Button, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import InspectMaintainAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/InspectMaintain.actions'
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2751002_InspectMaintain extends React.Component {
  static propTypes = {
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '検査保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isloadding: false,
      count: "a"
    };
  }
  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      tableData: []
    })
    this.GetListData()
  }
  GetListData() {
    this.setState({ isloadding: true })
    InspectMaintainAction.GetListData().then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res ? res : []
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloadding: false }))
  }
  AddNewRow() {
    const { count } = this.state;
    const newData = { id: count, kind: "70", test_item_code: "", exam_name: "", remarks: "" };
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count1: count + 1
    })
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  SaveAndInsert(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    for (const obj of arr) {
      if (obj.id === record.id) {
        if (this.isEmpty(obj.test_item_code)) return
        if (isNaN(record.id)) {
          let objSave = { kind: obj.kind, test_item_code: obj.test_item_code, exam_name: obj.exam_name, remarks: obj.remarks }
          this.SaveData(objSave)
          return
        } else {
          this.SaveData(obj)
          return
        }
      }
    }
  }
  SaveData(data) {
    this.setState({ isloadding: true })
    InspectMaintainAction.SaveData(data).then(res => {
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
      InspectMaintainAction.Delete({ id: record.id }).then(res => {
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
    const { childModal } = this.state;
    return (
      <div className="inspect-maintain">
        <Card title="検査保守">
          <Form ref={this.formRef} autoComplete="off">
            <Table
              dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
              loading={this.state.isloadding}
              pagination={false} bordered={true} size="small"
              rowKey={(record) => record.id} scroll={{ y: 700, x: 1000 }}
            >
              <Table.Column title="種別" dataIndex="kind" width={120} align="center"
                render={(value, record, index) => (
                  <Form.Item name={['tableData', index, 'kind']} style={{ marginBottom: "0" }}>
                    <Select   >
                      <Select.Option value="00">予約</Select.Option>
                      <Select.Option value="60">検査</Select.Option>
                      <Select.Option value="70">画像</Select.Option>
                    </Select>
                  </Form.Item>
                )}
              />
              <Table.Column title="ｺｰﾄﾞ" dataIndex="test_item_code" width={100} align="center"
                render={(value, record, index) => (
                  <Form.Item name={['tableData', index, 'test_item_code']} style={{ marginBottom: "0" }}>
                    <Input maxLength={6}></Input>
                  </Form.Item>
                )}
              />
              <Table.Column title="名称" align="center"
                render={(value, record, index) => (
                  <Form.Item name={['tableData', index, 'exam_name']} style={{ marginBottom: "0" }}>
                    <Input maxLength={20}></Input>
                  </Form.Item>
                )}
              />
              <Table.Column width={300} align="center"
                render={(value, record, index) => (
                  <Form.Item name={['tableData', index, 'remarks']} style={{ marginBottom: "0" }}>
                    <Input maxLength={256}></Input>
                  </Form.Item>
                )}
              />
              <Table.Column width={70}
                title={
                  <div style={{textAlign: 'center'}}>
                    <Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewRow()}  ></Button>
                  </div>
                }
                render={(text, record, index) => {
                  return <div style={{textAlign: 'center'}}>
                    <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.SaveAndInsert(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none' }} danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？', 
                          onOk: () => this.Delete(record)
                        })
                      }}
                    ></Button>
                  </div>
                }}
              />
              {/* <Table.Column align="center" width={100}
                render={(value, record, index) => (
                  <Dropdown.Button
                    icon={<MoreOutlined />}
                    style={{
                      display: "inline-block",
                    }}
                    overlay={() => (
                      <Menu >
                        <Menu.Item key="1">
                          照会 (Z)
                        </Menu.Item>
                        <Menu.Item key="2">
                          取消(C)
                        </Menu.Item>
                        <Menu.Item key="3">
                          追加(R)
                        </Menu.Item>
                        <Menu.Divider key="4">
                          削除(D)
                        </Menu.Divider>
                        <Menu.Item key="5">
                          切り取り(T)
                        </Menu.Item>
                        <Menu.Item key="6">
                          コピー(O)
                        </Menu.Item>
                        <Menu.Item key="7">
                          貼り付け(P)
                        </Menu.Item>
                        <Menu.Item key="8">
                          広域表示(W)
                        </Menu.Item>
                      </Menu>
                    )}></Dropdown.Button>
                )}
              /> */}
            </Table>
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
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2751002_InspectMaintain);
