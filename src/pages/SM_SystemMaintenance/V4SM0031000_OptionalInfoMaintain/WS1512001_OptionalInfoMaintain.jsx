import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Tree, Table, Row, Col, Menu, Dropdown, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { MoreOutlined, SyncOutlined, PlusCircleOutlined, DeleteOutlined, SwitcherOutlined, FolderOpenOutlined } from "@ant-design/icons";
import WS1512074_AddItem from 'pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512074_AddItem.jsx';
import WS1512066_ItemModification from 'pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512066_ItemModification.jsx';
import WS1512135_AddCode from 'pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512135_AddCode.jsx';
import WS1512138_DirectEditing from 'pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS1512138_DirectEditing.jsx';

import './WS1512001_OptionalInfoMaintain.scss'

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
      {
        title: 'parent 1-3',
        key: '0-0-3',
        children: [
          {
            title: 'leaf',
            key: '0-0-3-0',
          },
          {
            title: 'leaf',
            key: '0-0-3-1',
          },
        ],
      },
      {
        title: 'parent 1-4',
        key: '0-0-4',
        children: [
          {
            title: 'leaf',
            key: '0-0-4-0',
          },
          {
            title: 'leaf',
            key: '0-0-4-1',
          },
        ],
      },
      {
        title: 'parent 1-5',
        key: '0-0-5',
        children: [
          {
            title: 'leaf',
            key: '0-0-5-0',
          },
          {
            title: 'leaf',
            key: '0-0-5-1',
          },
        ],
      },
      {
        title: 'parent 1-6',
        key: '0-0-6',
        children: [
          {
            title: 'leaf',
            key: '0-0-6-0',
          },
          {
            title: 'leaf',
            key: '0-0-6-1',
          },
        ],
      },
    ]
  }
];

const style = {
  btm: {
    paddingBottom: '10px',
    marginBottom: '10px',
    borderBottom: '1px solid #d9d9d9',
  },

  icon: {
    margin: '5px',
    padding: '5px',
    cursor: 'pointer',
    fontSize: '18px'
  }

}
class WS1512001_OptionalInfoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'オプション情報保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      treeData: [],
      selectedNodes: [treeData[0]],
      dataSource: [],
      rowSelect: [],
      isLoadingTable: false,
    };
  }

  componentDidMount() {
    this.setState({
      treeData: treeData
    })
  }

  loadDataFormTable(values) {
    this.formRefMain.current.setFieldsValue({
      dataTable: [],
    });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onSelectNode = (selectedKeys, info) => {
    this.setState({
      selectedNodes: info.selectedNodes
    })
  };

  renderTableParent() {
    return (
      <Table
        dataSource={this.state.dataSource}
        bordered={true}
        loading={this.state.isLoadingTable}
        pagination={this.state.dataSource?.length > 10 ? true : false}
        rowKey={(record) => record.id}
      >
        <Table.Column title="識別" dataIndex="Expression_9" width={80} />
        <Table.Column title="ｺｰﾄﾞ" dataIndex="W1_option_cd" width={150} />
        <Table.Column title="名称" dataIndex="Expression_11" />
        <Table.Column title="説明" dataIndex="additional_explanation" />
      </Table>
    )
  }

  renderTableChildren() {
    return (
      <div>
        <Table
          dataSource={this.state.dataSource}
          bordered={true}
          loading={this.state.isLoadingTable}
          pagination={this.state.dataSource?.length > 10 ? true : false}
          rowKey={(record) => record.id}
        >
          <Table.Column title="項目" dataIndex="W2_item" width={'20%'} />
          <Table.Column title="種類" dataIndex="Division" width={70} />
          <Table.Column title="内容" dataIndex="Setting"
            render={(value, record, index) => {
              return (
                <Form.Item name={["dataTable", index, "Setting"]}>
                  <Input.Search type="text"
                    onSearch={() => { }}
                  />
                </Form.Item>
              )
            }}
          />
          <Table.Column title="説明" dataIndex="Expression_15" />
          <Table.Column width={70}
            render={(value, record, index) => {
              return (
                <Dropdown
                  overlay={() => (
                    <Menu>
                      <Menu.Item
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            childModal: {
                              width: "60%",
                              visible: true,
                              component: (
                                <WS1512066_ItemModification
                                  Li_ItemName={''}
                                  Li_ItemLimit={''}
                                  Li_ItemDescription={''}
                                  Li_SupplementaryExplanation={''}
                                  Li_SelectSection={''}
                                  Lio_ItemDescription={''}
                                  onFinishScreen={() => {
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      >
                        変更
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            childModal: {
                              width: "60%",
                              visible: true,
                              component: (
                                <WS1512074_AddItem
                                  onFinishScreen={() => {
                                    this.closeModal();
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                      >
                        新規
                    </Menu.Item>
                    </Menu>
                  )} >
                  <Button icon={<MoreOutlined />}></Button>
                </Dropdown>
              )
            }}
          />
        </Table>
        <br></br>
        <Form.Item name="Remarks">
          <TextArea rows={3} />
        </Form.Item>
      </div>
    )
  }


  onFinish(values) { }

  render() {
    return (
      <div className="optional-info-maintain">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card title="オプション情報保守" className="mb-3">
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item name="DistinguishedNameSearch" style={{ marginBottom: 0, cursor: 'pointer' }}>
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={10} style={{ paddingLeft: 0 }}>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button type="primary" >検索</Button>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Row gutter={24}>
            <Col span={10}>
              <Card style={{ height: '70vh' }} className="card-custom"
                title={
                  <div>
                    {/* update */}
                    <i style={style.icon}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 800,
                            component:
                              <WS1512135_AddCode
                                Li_Type={this.state.selectedNodes[0].W1_type_cd}
                                onFinishScreen={(output) => {
                                  this.closeModal()
                                }}
                              />
                            ,
                          },
                        });
                      }}
                    ><SyncOutlined /></i>

                    {/* add new */}
                    <i style={style.icon}
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 800,
                            component:
                              <WS1512138_DirectEditing
                                Li_Type={this.state.selectedNodes[0].W1_type_cd}
                                Li_OptionCode={this.state.selectedNodes[0].W1_option_cd}
                                onFinishScreen={(output) => {
                                  this.closeModal()
                                }}
                              />
                            ,
                          },
                        });
                      }}
                    ><PlusCircleOutlined /></i>

                    {/* delete */}
                    <i style={style.icon}
                      onClick={() => { }}
                    ><DeleteOutlined /></i>

                    {/* // hide code  コード非表示 */}

                    {/*  display code コード表示 */}
                  </div>
                }>

                <div className="scrollbar" style={{ overflow: 'auto', height: 'calc(70vh - 100px)' }}>
                  <Tree
                    defaultExpandAll
                    defaultSelectedKeys={[treeData[0].key]}
                    treeData={treeData}
                    onSelect={this.onSelectNode}
                  />
                </div>
              </Card>
            </Col>
            <Col span={14} style={{ paddingLeft: 0 }}>
              <Card>
                {this.state.selectedNodes[0].children && this.state.selectedNodes[0].children.length > 0 ? this.renderTableParent() : this.renderTableChildren()}
              </Card>
            </Col>
          </Row>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1512001_OptionalInfoMaintain);
