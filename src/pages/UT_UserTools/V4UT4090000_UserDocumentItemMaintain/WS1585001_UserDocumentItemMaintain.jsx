import React from "react";
import { connect } from "react-redux";
import { Card, Col, Input, Row, Table, Form, Tree, Spin, message, Modal, Checkbox, Button } from "antd";
import UserDocumentItemMaintainAction from 'redux/UserTools/UserDocumentItemMaintain/UserDocumentItemMaintain.actions'
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS1585014_DuplicateModify from "./WS1585014_DuplicateModify";
import WS1585018_HeaderCaptureOutput from "./WS1585018_HeaderCaptureOutput";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import Menubar from "components/Commons/Menubar";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS1585001_UserDocumentItemMaintain extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = ' ユーザー帳票項目保守';
    this.state = {
      treeData: [],
      dataTable: [],
      isLoadingTree: false,
      tableData: [],
      isLoadingTable: false,
      node: {},
      total: "",
      defaultPageSize: "",
      current_page: "",
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      arrKeySave: [],
      count: "a",
      checkLoad: false,
      menuItems: [
        { id: 1, label: !'HeaderGroupEditing' ? 'ﾍｯﾀﾞ編集' : 'ﾍｯﾀﾞ照会', handleClick: this.eventF7 },
        { id: 2, label: '重複ﾁｪｯｸ', handleClick: this.eventF8 },
        { id: 3, label: '検査取込', handleClick: this.eventF9 },
        { id: 4, label: 'ﾍｯﾀﾞ取込', handleClick: this.eventF10 },
        { id: 5, label: 'ﾍｯﾀﾞ出力', handleClick: this.eventF11 },
        { id: 6, label: '更新', handleClick: this.eventF12 },
      ],
    };
  }

  componentDidMount = () => {
    this.setState({ checkLoad: false })
    this.formRef.current?.setFieldsValue({
      tableData: []
    })
    this.getInit()
  }
  getInit() {
    this.setState({ isLoadingTree: true })
    UserDocumentItemMaintainAction.getInitTreeData().then(res => {
      this.setState({
        dataTable: res,
      })
      this.checkTree(res)

    }).catch(error => {
      this.setState({ isLoadingTree: false })
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    })
  }
  onSelect = (selectedKeys, { selected, selectedNodes, node, event }) => {
    if (node?.key) {
      this.getListTableBySearch(node)
    }
    this.setState({ node: node })
  }
  getListTableBySearch(data) {
    let obj = {
      W1_child_node_id: data.W1_child_node_id ? data.W1_child_node_id : "",
      W1_after_child_node_id: data.W1_after_child_node_id ? data.W1_after_child_node_id : "",
      W1_TreeLevel: data.W1_TreeLevel ? data.W1_TreeLevel : "",
      HeaderGroupEditing: data.HeaderGroupEditing ? data.HeaderGroupEditing : 1,
      StsModifyPresence: data.StsModifyPresence ? data.StsModifyPresence : 1,
      InternalSearchChar: this.formRef.current?.getFieldValue("SearchChar") ? this.formRef.current?.getFieldValue("SearchChar") : ""
    }
    this.setState({ isLoadingTable: true })
    UserDocumentItemMaintainAction.getListTableBySearch(obj).then(res => {
      if (res?.length > 0) {
        if (res?.[0]?.W1_parent_node_id === "") {
          res?.splice(0, 1)
        }
        this.setState({
          ...this.state,
          total: res.total,
          defaultPageSize: res.per_page,
          current_page: res.current_page
        })
        this.formRef.current?.setFieldsValue({
          tableData: res ? res : []
        })
        this.forceUpdate()
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isLoadingTable: false }))
  }
  checkTree(dataTree) {
    if (dataTree && dataTree.length > 0) {
      let parent = [];
      let count = 0;
      dataTree.map((value, index) => {
        count = index
        if (value.W1_parent_node_id === "Root") {
          parent.push(value)
        }
      })
      if (dataTree.length - 1 === count) {
        let treeData = []
        if (parent.length > 0) {
          parent.map((value) => {
            treeData.push({
              key: value.id, title: value.W1_item_name,
              W1_child_node_id: value.W1_child_node_id, W1_after_child_node_id: value.W1_after_child_node_id,
              W1_TreeLevel: value.W1_TreeLevel, HeaderGroupEditing: value?.HeaderGroupEditing, StsModifyPresence: value?.StsModifyPresence,
              children: this.findChildren(value)
            })
          })
          if (treeData.length === parent.length) {
            this.setState({
              isLoadingTree: false,
              treeData: treeData,
              node: this.state.checkLoad ? this.state.node : treeData[0]
            })
            this.state.checkLoad ? this.getListTableBySearch(this.state.node) : this.getListTableBySearch(treeData[0])
            return treeData
          }
        }
      }
    } else {
      this.setState({ isLoadingTree: false })
    }
  }
  findChildren(parent) {
    let parentChil = [];
    let dem = 0
    this.state.dataTable.map((value, index) => {
      dem = index;
      if (parent.W1_child_node_id === value.W1_parent_node_id) {
        parentChil.push({
          key: value.id, title: value.W1_item_name,
          W1_child_node_id: value.W1_child_node_id, W1_after_child_node_id: value.W1_after_child_node_id,
          W1_TreeLevel: value.W1_TreeLevel, HeaderGroupEditing: value?.HeaderGroupEditing, StsModifyPresence: value?.StsModifyPresence,
          children: this.findChildren(value)
        })
      }
    })
    if (dem === this.state.dataTable.length - 1) {
      return parentChil
    }
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  OnBlur(e, index) {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value))) {

    } else {
      const namePath = ['tableData', index, 'W1_item_cd']
      this.formRef.current?.setFields([{
        name: namePath,
        value: ""
      }])
    }
    this.forceUpdate()
  }
  AddNewData() {
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    const { count } = this.state;
    const newData = { id: count, W1_enabled_disabled: false, W1_sect_cd: data[0]?.W1_sect_cd ? data[0].W1_sect_cd : "H", W1_item_cd: "", W1_item_name: "", W1_variable_name: "", W1_grp_cd: "" }
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
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  Save(record) {
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    for (let index = 0; index < data.length; index++) {
      if (record.id === data[index].id) {
        if (!this.isEmpty(data[index].W1_item_cd)) {
          let dataSave = {}
          if (isNaN(data[index].id)) {
            dataSave.W1_enabled_disabled = data[index].W1_enabled_disabled
            dataSave.W1_grp_cd = data[index].W1_grp_cd
            dataSave.W1_item_cd = data[index].W1_item_cd
            dataSave.W1_item_name = data[index].W1_item_name
            dataSave.W1_sect_cd = data[index].W1_sect_cd
            dataSave.W1_variable_name = data[index].W1_variable_name
            this.saveData(dataSave)
          } else {
            this.saveData(data[index])
          }
        }
        break
      }
    }
  }
  saveData(data) {
    data.W1_enabled_disabled = data?.W1_enabled_disabled ? 1 : 0
    UserDocumentItemMaintainAction.save(data).then(res => {
      this.setState({ ...this.state.checkLoad, checkLoad: true })
      this.getInit()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
      message.error(error.message)
    }).finally(() => this.setState({ isLoadingTree: false }))
  }
  Delete(record) {
    if (isNaN(record.id)) {
      let arr = [...this.formRef.current?.getFieldValue("tableData")];
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
      UserDocumentItemMaintainAction.delete(record).then(res => {
        this.setState({ ...this.state.checkLoad, checkLoad: true })
        this.getInit()
      })
    }

  }

  eventF7 = () => {}

  eventF8 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS1585014_DuplicateModify
            Li_Format={this.formRef.current?.getFieldValue("format")}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  eventF9 = () => {}

  eventF10 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '40%',
        component: (
          <WS1585018_HeaderCaptureOutput
            Li_Format={this.formRef.current?.getFieldValue("format")}
            F10={'F10'}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  eventF11 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '40%',
        component: (
          <WS1585018_HeaderCaptureOutput
            Li_Format={this.formRef.current?.getFieldValue("format")}
            F11={'F11'}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  eventF12 = () => {}

  render() {
    return (
      <div className="user-document-item-maintain">
        <Card title='ユーザー帳票項目保守'>
          <Menubar items={this.state.menuItems} />
          <Spin spinning={this.state.isLoadingTree}>
            <Form ref={this.formRef} autoComplete="off" >
              <Row className='mt-3'>
                <Col span={6}>
                  <Form.Item name='SearchChar' className='mb-3'>
                    <Input style={{ width: '98%' }} maxLength={50} onPressEnter={() => this.getListTableBySearch(this.state.node)} />
                  </Form.Item>
                  <div style={{ height: '700px', overflow: 'auto', width: '98%' }}>
                    <Tree.DirectoryTree
                      defaultExpandAll
                      onSelect={this.onSelect}
                      treeData={this.state.treeData}
                    />
                  </div>
                </Col>
                <Col span={18}>
                  <Table dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []} bordered size='small'
                    loading={this.state.isLoadingTable} rowKey={(record) => record.id}
                    pagination={true}
                    //  pagination={{
                    //   defaultCurrent: 1,
                    //   defaultPageSize: this.state.defaultPageSize,
                    //   total: this.state.total,
                    //   onChange: (page, pageSize) => {
                    //     if (this.state.current_page != page) {
                    //       //get data
                    //       this.getListTableBySearch(this.state.node,page )
                    //       this.setState({
                    //         current_page: page
                    //       })
                    //     }
                    //   }
                    // }}
                    scroll={{ y: 700 }}
                  >
                    <Table.Column dataIndex="W1_enabled_disabled" width={50} render={(text, record, index) => (
                      <Form.Item name={['tableData', index, 'W1_enabled_disabled']} valuePropName="checked" style={{ ...styleFormItem }}>
                        <Checkbox />
                      </Form.Item>
                    )}
                    />
                    <Table.Column title="分類" dataIndex="W1_sect_cd" width={70} render={(text, record, index) => (
                      <span>{text}</span>
                    )}
                    />
                    <Table.Column title="コード" width={150} dataIndex="W1_item_cd" render={(value, record, index) => {
                      if (record.W1_sect_cd === "K") {
                        return <Form.Item name={['tableData', index, 'W1_item_cd']} style={{ ...styleFormItem }}>
                          <Input.Search readOnly onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS0271001_InspectItemSearchQuerySingle
                                    Lio_InspectItemCode={value}
                                    onFinishScreen={(output) => {
                                      console.log(output)
                                      let tableinit = this.formRef.current?.getFieldValue("tableData");
                                      tableinit[index].W1_item_cd = output.Lio_InspectItemCode;
                                      tableinit[index].W1_item_name = output.recordData.exam_short_name;
                                      tableinit[index].W1_variable_name = output.recordData.exam_short_name
                                      this.formRef.current?.setFieldsValue({
                                        tableData: tableinit
                                      })
                                      this.forceUpdate()
                                      this.closeModal()
                                    }}
                                  />),
                              },
                            })
                          }} />
                        </Form.Item>
                      } else {
                        return <Form.Item name={['tableData', index, 'W1_item_cd']} style={{ ...styleFormItem }} >
                          <Input maxLength={8} onBlur={(e) => this.OnBlur(e, index)} style={styleInput} />
                        </Form.Item>
                      }
                    }} />
                    <Table.Column title="項目名称" dataIndex="W1_item_name" render={(text, record, index) => (
                      <Form.Item name={['tableData', index, 'W1_item_name']} style={{ ...styleFormItem }}>
                        <Input style={styleInput} maxLength={30} />
                      </Form.Item>
                    )}
                    />
                    <Table.Column title="変数名称" dataIndex="W1_variable_name" render={(text, record, index) => (
                      <Form.Item name={['tableData', index, 'W1_variable_name']} style={{ ...styleFormItem }}>
                        <Input style={styleInput} maxLength={30} />
                      </Form.Item>
                    )}
                    />
                    <Table.Column title="グループ" dataIndex="W1_grp_cd" />
                    <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                      render={(text, record, index) => {
                        return <>
                          <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                            onClick={() => this.Save(record)}
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
              </Row>
            </Form>
          </Spin>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1585001_UserDocumentItemMaintain);
