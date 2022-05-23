import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Row, Col, Tree, Form, Input, Spin, Button, Modal, InputNumber, message } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import Checkbox from "antd/lib/checkbox/Checkbox";
import {
  getScreenDataProgressInfoMaintainAction, getProgressListDataAction, addUpdateNodeDataAction, deleteNodeDataAction
} from "redux/SystemMaintenance/ProgressInfoMaintain/ProgressInfoMaintainService.actions";
import WS0276001_ProgramSearch from "./WS0276001_ProgramSearch";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS1499001_ProgressInfoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '進捗情報保守';

    this.state = {
      isLoadingTable: true,
      dataTable: [],
      rowSelect: {},

      treeData: [],
      nodeSelect: {},
      isLoadTree: true,

      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData() {
    this.setState({
      isLoadingTable: true,
      isLoadTree: true,
    });
    getScreenDataProgressInfoMaintainAction()
      .then(res => {
        let data = [this.convertNode(res.data)];
        this.setState({ treeData: data });
      })
      .catch()
      .finally(() => this.setState({ isLoadTree: false }))
  }

  onSelectNode = (selectedKeys, { selected, selectedNodes, node, event }) => {
    this.getProgressListData(node.child_node);
    this.setState({ nodeSelect: node });
  };

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  getProgressListData = (params) => {
    this.setState({ isLoadingTable: true })
    getProgressListDataAction({ child_node: params })
      .then(res => {
        this.setState({ dataTable: res.data });
        this.formRef?.current.setFieldsValue({ dataTable: res.data });
      })
      .catch()
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  addUpdateNodeData = (record) => {
    const params = {
      ...record,
      parent_child_node: this.state.nodeSelect.child_node === 'Root' ? '' : this.state.nodeSelect.child_node
    }
    addUpdateNodeDataAction(params)
      .then(res => {
        message.success('成功');
        this.getProgressListData(this.state.nodeSelect.child_node);
        this.loadData();
      })
      .catch(err => message.error('エラー'))
  }

  deleteNodeData = (record) => {
    deleteNodeDataAction({ id: record.id })
      .then(res => {
        message.success('成功');
        this.getProgressListData(this.state.nodeSelect.child_node);
      })
      .catch(err => message.error('エラー'))
  }

  handleChangeInput = (record, value, name) => {
    let arrTemp = [...this.state.dataTable];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp;
      this.setState({ dataTable: arrTemp });
      this.formRef.current.setFieldsValue({ 'dataTable': arrTemp });
    }
  }

  convertNode = (data) => {
    return {
      title: data.parent.name,
      key: `0-${data.parent.id}`,
      parent_node: data.parent.parent_node,
      child_node: data.parent.child_node,
      children: data.child.map((node, index) => ({
        title: node.name,
        key: `0-${data.parent.id}-${index}`,
        parent_node: node.parent_node,
        child_node: node.child_node,
        isLeaf: true
      }))
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
      <div className="progress-info-maintain">
        <Card title="進捗情報保守">
          <Form ref={this.formRef} >
            <Row gutter={24}>
              <Col style={{ width: '250px', borderRight: '1px solid #afabab' }}>
                <Spin spinning={this.state.isLoadTree}>
                  <Tree.DirectoryTree
                    treeData={this.state.treeData}
                    onSelect={this.onSelectNode}
                  />
                </Spin>
              </Col>
              <Col style={{ width: 'calc(100% - 250px)' }}>
                <Table
                  size='small'
                  dataSource={this.state.dataTable}
                  loading={this.state.isLoadingTable}
                  rowKey={(record) => record.id}
                  onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
                >
                  <Table.Column title="ｺｰﾄﾞ" dataIndex="child_node" width={150}
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataTable, record.id);
                      return (
                        <Form.Item name={["dataTable", index, "child_node"]} style={styleFormItem}>
                          <Input readOnly={record.id} style={styleInput}
                            onChange={(event) => this.handleChangeInput(record, event.target.value, 'child_node')}
                            onDoubleClick={() => {
                              if(this.state.nodeSelect.parent_node === 'Root' && !record.id){
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: '60%',
                                    component: (
                                      <WS0276001_ProgramSearch
                                        Lio_Publicval = {''}
                                        onFinishScreen={({Lio_Publicval, recordData}) => {
                                          record = {
                                            ...record,
                                            child_node: Lio_Publicval,
                                            name: recordData.description
                                          }
                                          console.log(record)
                                          let arrTemp = [...this.state.dataTable]
                                          arrTemp[index] = record;
                                          this.setState({
                                            rowSelect: record,
                                            dataTable: arrTemp
                                          });
                                          this.formRef.current.setFieldsValue({ 'dataTable': arrTemp });
                                          this.closeModal();
                                        }}
                                      />
                                    ),
                                  },
                                });
                              }
                            }}
                          />
                        </Form.Item>
                      )
                    }} />
                  <Table.Column title="名称" dataIndex="name"
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataTable, record.id);
                      return (
                        <Form.Item name={["dataTable", index, "name"]} style={styleFormItem}>
                          <Input style={styleInput}
                            onChange={(event) => this.handleChangeInput(record, event.target.value, 'name')}
                          />
                        </Form.Item>
                      )
                    }} />
                  <Table.Column title="手動" dataIndex="ClassifiLogic" width={80}
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataTable, record.id);
                      return (
                        <Form.Item name={["dataTable", index, "ClassifiLogic"]} valuePropName="checked" style={styleFormItem}>
                          <Checkbox onChange={(event) => this.handleChangeInput(record, event.target.checked ? 1 : 0, 'ClassifiLogic')} />
                        </Form.Item>
                      )
                    }} />
                  <Table.Column title="表示順" dataIndex="DisplayOrder" width={150}
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataTable, record.id);
                      return (
                        <Form.Item style={styleFormItem}>
                          <InputNumber style={styleInput} maxLength={5} min={1}
                            value={
                              parseInt(this.state.dataTable[index].DisplayOrder) === 0
                                ? ''
                                : this.state.dataTable[index].DisplayOrder
                            }
                            onChange={(value) => this.handleChangeInput(record, value, 'DisplayOrder')}
                          />
                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column align='center' width={70}
                    title={() => (<Button size='small' type='primary'
                      icon={<PlusOutlined />} onClick={() => {
                        let arrTemp = [{}];
                        this.formRef.current.setFieldsValue({ 'dataTable': [...arrTemp, ...this.state.dataTable] });
                        this.setState({ dataTable: [...arrTemp, ...this.state.dataTable] });
                      }}></Button>)}
                    render={(text, record) => (
                      <>
                        <Button size='small' style={{ border: 'none', }}
                          icon={<SaveOutlined style={{ color: 'green' }} />}
                          onClick={() => this.addUpdateNodeData(record)}
                        ></Button>
                        <Button size='small' style={{ border: 'none', }}
                          danger icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？',
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () => this.deleteNodeData(record)
                            })
                          }}
                        ></Button>
                      </>
                    )}
                  />
                </Table>
              </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1499001_ProgressInfoMaintain);
