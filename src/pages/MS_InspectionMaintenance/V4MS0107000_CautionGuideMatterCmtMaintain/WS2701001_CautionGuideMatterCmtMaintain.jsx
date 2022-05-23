import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Button, Card, Form, Input, Select, Table, Modal, Dropdown, Menu, message,    } from "antd";  
import { MoreOutlined, QuestionCircleOutlined } from "@ant-design/icons"; 
import WS2701025_CmtRegisterCopy from 'pages/MS_InspectionMaintenance/V4MS0107000_CautionGuideMatterCmtMaintain/WS2701025_CmtRegisterCopy.jsx';
import CautionGuideMatterCmtMaintainAction from 'redux/InspectionMaintenance/CautionGuideMatterCmtMaintain/CautionGuideMatterCmtMaintain.actions'
import CmtRegisterCopyAction from 'redux/InspectionMaintenance/CmtRegisterCopy/CmtRegisterCopy.actions'
import WS0376001_AnotherGuideCmtMaintainCategory from 'pages/MS_InspectionMaintenance/V4MS0107000_CautionGuideMatterCmtMaintain/WS0376001_AnotherGuideCmtMaintainCategory.jsx';

class WS2701001_CautionGuideMatterCmtMaintain extends React.Component {
  formRef = React.createRef(); 

  constructor(props) {
    super(props);

    // document.title = '注意・指導事項コメント保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      }, 
      rowSelect: [],
      selectedRowKey: [],
      isLoadingTable: false,
    };
  } 
  componentDidMount(){
    this.getCommentLists()
  }
  getCommentLists(){
    this.setState({isLoadingTable: true})
    let data = {IdentifyCode: this.formRef.current?.getFieldValue("IdentifyCode")
       , SearchKey: this.formRef.current?.getFieldValue("SearchKey")}
    CautionGuideMatterCmtMaintainAction.getCommentLists(data).then(res=>{
        this.formRef.current?.setFieldsValue({
          tableData: res? res : []
        })
        this.forceUpdate()
    }).catch(error =>{
      const res = error.response;
      if(!res || res.data || res.data.message){
        message.error('エラーが発生しました');
      }
 
    }).finally(()=>this.setState({isLoadingTable: false}))

  }
  onFinish(values) {

  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  DeleteComment(record){
    let data ={IdentifyCode: this.formRef.current.getFieldValue('IdentifyCode'), comment_code: record.comment_code}
    CmtRegisterCopyAction.DeleteComment(data).then(res=>{
      this.getCommentLists()
    })
  }
  ShowAnotherGuideCmtMaintainCategory(){
    this.setState({
      ...this.state,
      childModal: {
        width: "80%",
        visible: true,
        component: (
          <WS0376001_AnotherGuideCmtMaintainCategory 
            onFinishScreen={() => {
              this.closeModal();
            }}
          />
        ),
      },
    });
  }
  render() {
    return (
      <div className="caution-guide-matter-cmt-maintain">
        <Card  title={ <Button onClick={()=>this.ShowAnotherGuideCmtMaintainCategory()} >カテゴリ別</Button>} >
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            autoComplete ="off"
            initialValues={{
              IdentifyCode: 'C',
              SearchKey:""
            }}
          >
            <Form.Item name="IdentifyCode" style={{ width: '20%', float: 'left', marginRight: '15px' }}>
              <Select onClick={()=>this.getCommentLists()} >
                <Select.Option value="C">注意事項</Select.Option>
                <Select.Option value="S">指導事項</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="SearchKey" label="検索" style={{ width: '40%' }}>
              <Input maxLength={50} onBlur={()=>this.getCommentLists()} />
            </Form.Item>
          </Form> 
          <Table
            dataSource={this.formRef.current?.getFieldValue("tableData")?this.formRef.current.getFieldValue("tableData") : []}
            loading={this.state.isLoadingTable} 
            bordered={true}
            pagination={false}
            rowKey={(record) => record.comment_code} 
            scroll={{y:500}}
            size="small"
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
                this.formRef.current?.setFieldsValue({
                  selectedRow: selectedRows[0]
                })
                this.forceUpdate()
              }
            }}
          >
            <Table.Column width={100} title="コード" dataIndex="comment_code" />
            <Table.Column width={100} title="検索キー" dataIndex="search_key" />
            <Table.Column title="コメント内容" dataIndex="comment_content" />
            <Table.Column width={60}
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
                                width: "70%",
                                visible: true,
                                component: (
                                  <WS2701025_CmtRegisterCopy
                                    Li_IdentifyCode={this.formRef.current.getFieldValue('IdentifyCode')}
                                    Li_CommentCode={record.comment_code}
                                    Li_Copy={false}
                                    Li_Edit={false}
                                    Li_status = {"RegisterComment"} 
                                    onFinishScreen={() => {
                                      this.getCommentLists()
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
                        <Menu.Item
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "70%",
                                visible: true,
                                component: (
                                  <WS2701025_CmtRegisterCopy
                                    Li_IdentifyCode={this.formRef.current.getFieldValue('IdentifyCode')}
                                    Li_CommentCode={record.comment_code}
                                    Li_Copy={true}
                                    Li_Edit={true}
                                    Li_status = {"UpdateComment"} 
                                    onFinishScreen={(output) => {
                                      const nameSearch = ['tableData',index,'search_key'];
                                      const nameContent = ['tableData',index,'comment_content'];
                                      this.formRef.current?.setFields([
                                        {
                                          name: nameSearch,
                                          value: output.search_key
                                        },
                                        {
                                          name: nameContent,
                                          value: output.comment_content
                                        }
                                      ])
                                      this.forceUpdate()
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        >
                          修正
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => {
                            Modal.confirm({
                              content: "Confirm Delete operation",
                              icon: <QuestionCircleOutlined style={{ color: '#1890ff', fontSize: '30px' }} />,
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () =>  this.DeleteComment(record)
                            })
                          }}
                        >
                          削除
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: "70%",
                                visible: true,
                                component: (
                                  <WS2701025_CmtRegisterCopy
                                    Li_IdentifyCode={this.formRef.current.getFieldValue('IdentifyCode')}
                                    Li_CommentCode={record.comment_code}
                                    Li_Copy={true}
                                    Li_Edit={false} 
                                    Li_status = {"CopyComment"} 
                                    onFinishScreen={() => {
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        >
                          複写
                        </Menu.Item>
                      </Menu>
                    )}>
                    <Button size="small" icon={<MoreOutlined />}></Button>
                  </Dropdown>
                )
              }}
            />
          </Table>
        </Card>
        <Card>
           <Input.TextArea cols={5} value={this.formRef.current?.getFieldValue("selectedRow")?.comment_content} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2701001_CautionGuideMatterCmtMaintain);
