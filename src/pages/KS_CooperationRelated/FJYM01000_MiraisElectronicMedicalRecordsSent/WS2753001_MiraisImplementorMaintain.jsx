import React from "react";
import { connect } from "react-redux";
import { Card, Table, Form, Input, Menu, Dropdown, message, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import MiraisImplementorMaintainAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisImplementorMaintain.actions'
import { SaveOutlined } from '@ant-design/icons';
class WS2753001_MiraisImplementorMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'Mirais実施者保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isloadding: false,
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
    MiraisImplementorMaintainAction.GetListData().then(res => {
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
  Save(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    for (const obj of arr) {
      if (obj.id === record.id) {
        if (this.isEmpty(obj.staff_code)) {
          return
        } else {
          this.setState({ isloadding: true })
          MiraisImplementorMaintainAction.SaveData(obj).then(res => {
            this.GetListData()
          }).catch(error => {
            const res = error.response;
            if (!res || res.data || res.data.message) {
              message.error('エラーが発生しました');
              return;
            }
          }).finally(() => this.setState({ isloadding: false }))
          return
        }
      }
    }
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  render() {
    return (
      <div className="mirais-implementor-maintain">
        <Card title="Mirais実施者保守">
          <Form ref={this.formRef} autoComplete="off" >
            <Table
              dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
              loading={this.state.isloadding}
              pagination={false} bordered={true} size="small"
              rowKey={(record) => record.id} scroll={{ y: 700 }}
            //  rowSelection={{
            //    type: 'radio',
            //    onChange: (selectedRowKeys, selectedRows) => {
            //      console.log('selectedRows: ', selectedRows);
            //    }
            //  }}
            >
              <Table.Column title="ﾕｰｻﾞｰID" dataIndex="user_code" width={150} />
              <Table.Column title="名称" dataIndex="user_name" width={150} />
              <Table.Column title="職員ｺｰﾄﾞ" width={200}
                render={(value, record, index) => (
                  <Form.Item name={['tableData', index, 'staff_code']} style={{ marginBottom: '0px' }}>
                    <Input maxLength={10} ></Input>
                  </Form.Item>
                )}
              />
              <Table.Column width={30} align='center'
                render={(text, record, index) => {
                  return <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                    onClick={() => this.Save(record)}
                  ></Button>
                }}
              />
              {/* <Table.Column width={30} align='center'
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
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2753001_MiraisImplementorMaintain);
