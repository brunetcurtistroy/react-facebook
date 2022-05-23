import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Modal, message, Input, Button, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import {
  getDataDetermineLevelBulkModifyAction, saveDataDetermineLevelBulkModifyAction, deleteDataDetermineLevelBulkModifyAction
} from "redux/InspectionMaintenance/DetermineLevelModify/DetermineLevelBulkModify.actions";
import WS0448009_CopyScreen from "./WS0448009_CopyScreen";

const styleInput = {
  border: 'none'
}
class WS0448001_DetermineLevelBulkModify extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS05800:判定レベル一括修正';

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
      dataSource: [],
      isLoading: true,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    this.getDataDetermineLevelBulkModify();
  }

  getDataDetermineLevelBulkModify = () => {
    this.setState({ isLoading: true });
    getDataDetermineLevelBulkModifyAction()
      .then(res => {
        if (res) {
          this.setState({
            dataSource: res.data,
          })
        }
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  saveDataDetermineLevelBulkModify = (record) => {
    saveDataDetermineLevelBulkModifyAction(record).then(res => {
      message.success('成功');
      this.getDataDetermineLevelBulkModify();
    })
      .catch(err => message.error(err.response.data.message))
  }

  deleteDataDetermineLevelBulkModify = (record) => {
    if (record.id) {
      deleteDataDetermineLevelBulkModifyAction({ id: record.id })
        .then(res => {
          message.success('成功');
          this.getDataDetermineLevelBulkModify();
        })
        .catch(err => message.error('エラー'))
    } else {
      let arrTemp = [...this.state.dataSource];
      arrTemp.splice(arrTemp[0], 1);
      this.setState({ dataSource: arrTemp });
    }
  }

  Copy_F12 = () => { 
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 450,
        component: (
          <WS0448009_CopyScreen
            Li_Condition2F={this.state.rowSelect.condition_2}
            item={this.state.rowSelect.item}
            onFinishScreen={(isLoad) => {
              if (isLoad) {
                this.getDataDetermineLevelBulkModify();
              }
              this.closeModal()
            }}
          />
        ),
      },
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

  handleChangeInput = (event, record) => {
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

  render() {
    return (
      <div className="determine-level-bulk-modify" >
        <Card title="V4-VNS05800:判定レベル一括修正">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={this.state.pagination}
            rowKey={(record) => record.id} 
            rowSelection={{
              type: 'radio',
               onChange: async (selectedRowKeys, selectedRows) => { 
                await this.setState({
                  rowSelect:selectedRows[0]
                })
              }
            }}
  
          >
            <Table.Column title="レベル" width={200} dataIndex="condition_2"
              render={(text, record, index) => (
                <InputNumber style={styleInput} maxLength={2} readOnly={record.id}
                  onChange={(value) => {
                    let arrTemp = [...this.state.dataSource];
                    arrTemp[index] = {
                      ...record,
                      condition_2: value,
                    }
                    this.setState({ dataSource: arrTemp })
                  }} name='condition_2'
                  value={this.state.dataSource[index].condition_2}
                />
              )}
            />
            <Table.Column title="名称" dataIndex="item"
              render={(text, record, index) => (
                <Input style={styleInput} maxLength={20}
                  onChange={(e) => this.handleChangeInput(e, record)} name='item'
                  value={this.state.dataSource[index].item}
                />
              )}
            />
            <Table.Column title="備考" dataIndex="remarks"
              render={(text, record, index) => (
                <Input style={styleInput} maxLength={50}
                  onChange={(e) => this.handleChangeInput(e, record)} name='remarks'
                  value={this.state.dataSource[index].remarks}
                />
              )}
            />
            <Table.Column align='center' width={70}
              title={() => (<Button size='small' type='primary'
                icon={<PlusOutlined />} onClick={() => {
                  let arrTemp = [{}];
                  this.setState({ dataSource: [...arrTemp, ...this.state.dataSource] });
                }}></Button>)}
              render={(text, record, index) => (
                <>
                  <Button size='small' style={{ border: 'none', }}
                    icon={<SaveOutlined style={{ color: 'green' }} />}
                    onClick={() => this.saveDataDetermineLevelBulkModify(record)}
                  ></Button>
                  <Button size='small' style={{ border: 'none', }}
                    danger icon={<DeleteOutlined />}
                    onClick={() => {
                      Modal.confirm({
                        content: '消去してもよろしいですか？',
                        okText: 'は　い',
                        cancelText: 'いいえ',
                        onOk: () => this.deleteDataDetermineLevelBulkModify(record)
                      })
                    }}
                  ></Button>
                </>
              )}
            />
          </Table>
          <div style={{ float: 'right', marginTop: '1rem' }}>
            <Button type='primary' onClick={this.Copy_F12}>複写</Button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0448001_DetermineLevelBulkModify);
