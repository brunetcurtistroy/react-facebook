import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Space, Table, Form, Input, Modal, Button, message } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS1305004_CompiledSelect from "./WS1305004_CompiledSelect";
import {
  getDataContractCompiledMaintainAction, saveDataContractCompiledMaintainAction, deleteDataContractCompiledMaintainAction
} from "redux/SpecificInsureMaintenance/ContractCompiledMaintain/ContractCompiledMaintain.actions";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none',
}
class WS1305001_ContractCompiledMaintain extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    // document.title = 'V4-TMS00040:契約取りまとめ保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [{}],
      isLoading: true,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    this.getDataContractCompiledMaintain();
  }

  getDataContractCompiledMaintain = () => {
    this.setState({ isLoading: true });
    getDataContractCompiledMaintainAction()
      .then(res => {
        if (res) {
          let data = res.data;
          this.setState({ dataSource: data })
          this.formRef.current.setFieldsValue({ 'dataSource': data })
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  saveDataContractCompiledMaintain = (record) => {
    let params = {
      ...record, 
      compiled_division: this.state.rowSelect.compiled_division ?? 0,
      FK_name: this.state.rowSelect.FK_name
    }
    saveDataContractCompiledMaintainAction(params)
      .then(res => {
        message.success('成功');
        this.getDataContractCompiledMaintain();
      })
      .catch(err => message.error('コードが既に存在しています。'))
  }

  deleteDataContractCompiledMaintain = (record) => {
    if (record.id) {
      deleteDataContractCompiledMaintainAction(record)
        .then(res => {
          message.success('成功');
          this.getDataContractCompiledMaintain();
        })
        .catch(err => message.error('エラー'))
    } else {
      let arrTemp = [...this.state.dataSource];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
      this.setState({ dataSource: arrTemp });
      //this.getDataContractCompiledMaintain();
    }
  }

  onChangeInput = (event, record) => {
    let { value, name } = event.target;
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp
      this.setState({ dataSource: arrTemp })
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="contract-compiled-maintain" style={{ width: 900 }}>
        <Form ref={this.formRef}>
          <Card title="V4-TMS00040:契約取りまとめ保守">
            <Table
              size="small"
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              // pagination={this.state.pagination}
              pagination={false}
              rowKey={(record) => record.id}
            >
              <Table.Column width={100} title="コード" dataIndex="contract_compiled_division_code" render={(text, record, index) => (
                <Form.Item name={['dataSource', index, 'contract_compiled_division_code']} style={styleFormItem}>
                  <Input style={styleInput} readOnly={record.id} name='contract_compiled_division_code'
                    onChange={(e) => this.onChangeInput(e, record)}
                  />
                </Form.Item>
              )} />
              <Table.Column title="名  称" dataIndex="FH_name" render={(text, record, index) => (
                <Form.Item name={['dataSource', index, 'FH_name']} style={styleFormItem}>
                  <Input style={styleInput} name='FH_name'
                    onChange={(e) => this.onChangeInput(e, record)} />
                </Form.Item>
              )} />
              <Table.Column title="取りまとめ区分"
                render={(text, record, index) => (
                  <Space >
                    <Form.Item name={['dataSource', index, 'compiled_division']} style={styleFormItem}>
                      <Input style={{ ...styleInput, width: 70 }} readOnly
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 500,
                              component: (
                                <WS1305004_CompiledSelect
                                  Lio_CompiledClassify
                                  onFinishScreen={(output) => {
                                    let arrTemp = this.formRef.current.getFieldValue('dataSource');
                                    record = {
                                      ...record,
                                      compiled_division: output.id,
                                      FK_name: output.name
                                    }
                                    arrTemp[index] = record
                                    this.formRef.current.setFieldsValue({
                                      dataSource: arrTemp
                                    });
                                    this.setState({
                                      dataSource: arrTemp,
                                      rowSelect: record
                                    });
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={['dataSource', index, 'FK_name']} style={styleFormItem}>
                      <Input style={styleInput} readOnly />
                    </Form.Item>
                  </Space>
                )}
              />
              <Table.Column align='center' width={70}
                title={() => (<Button size='small' type='primary'
                  icon={<PlusOutlined />} onClick={() => {
                    let arrTemp = [{}];
                    this.formRef.current.setFieldsValue({ 'dataSource': [...arrTemp, ...this.state.dataSource] });
                    this.setState({ dataSource: [...arrTemp, ...this.state.dataSource] });
                  }}></Button>)}
                render={(text, record, index) => (
                  <>
                    <Button size='small' style={{ border: 'none', }}
                      icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.saveDataContractCompiledMaintain(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none', }}
                      danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.deleteDataContractCompiledMaintain(record)
                        })
                      }}
                    ></Button>
                  </>
                )}
              />
            </Table>
          </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1305001_ContractCompiledMaintain);