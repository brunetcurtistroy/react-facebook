import React from "react";
import { connect } from "react-redux";

import { Card, Input, Table, Form, message, Button, Modal } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import {
  getSpecificHealthTokuhoOptionsFileAction, saveAndUpdateSpecificHealthTokuhoAction, deleteSpecificHealthTokuhoOptionsFileAction
} from "redux/SpecificInsureMaintenance/SpecificHealthTokuhoOptionsFile/SpecificHealthTokuhoOptionsFile.actions";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Menubar from "components/Commons/Menubar";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS1306001_SpecificHealthTokuhoOptionsFile extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '特健特保オプションファイル';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      selectedRowKey: [],
      rowSelect: [],
      isLoadingTable: false,
      editPage: false,
      menuItems: [
        { id: 1, label: '複写', handleClick: this.eventF7 },
        { id: 2, label: this.eventF11(), },
      ],
    };
    this.updateOrCreateData = this.updateOrCreateData.bind(this);
  }

  componentDidMount = () => {
    this.loadData();
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  updateOrCreateData = (record) => {
    let params = {};
    if (record.id) {
      params = {
        id: record.id,
        option_type: record.option_type ?? '',
        options: record.options ?? '',
        remarks: this.formRef?.current.getFieldValue('remarks') ?? '',
      }
      this.saveAndUpdateSpecificHealthTokuho(params);
    } else {
      params = {
        id: '',
        option_type: record.option_type ?? '',
        options: record.options ?? '',
        remarks: this.formRef?.current.getFieldValue('remarks') ?? '',
      }
      this.saveAndUpdateSpecificHealthTokuho(params);
    }
  }

  saveAndUpdateSpecificHealthTokuho = (params) => {
    this.setState({ isLoadingTable: true });
    saveAndUpdateSpecificHealthTokuhoAction(params)
      .then(res => {
        message.success('成功');
        this.loadData();
      })
      .catch(err => message.error('エラー'))
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  loadData(values) {
    this.setState({ isLoadingTable: true })
    getSpecificHealthTokuhoOptionsFileAction()
      .then(res => {
        if (res) {
          this.setState({ dataSource: res.data })
          this.formRef?.current?.setFieldsValue({ 'dataTable': res.data })
        }
      })
      .catch()
      .finally(() => this.setState({ isLoadingTable: false }))
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

  eventF7 = () => {}

  eventF11 = () => (
    <Checkbox 
      style={{fontWeight: 'unset', color: 'black'}}
      onChange={(e) => this.setState({ editPage: e.target.checked })}
    >編集</Checkbox>
  )

  render() {
    return (
      <div className="specific-health-tokuho-options-file">
        <Form ref={this.formRef} onFinish={this.onFinish} autoComplete='off'>
          <Card className="mb-3" title='特健特保オプションファイル'>
            <Menubar items={this.state.menuItems} />
            <Table bordered style={{ height: "70vh", overflow: 'auto' }} className='scrollbar mt-3'
              dataSource={this.state.dataSource} loading={this.state.isLoadingTable}
              pagination={false} size='small' rowKey={(record) => record.id}
              onRow={(record, index) => ({ 
                onClick: e => {
                  this.setState({ rowSelect: record });
                  this.formRef.current.setFieldsValue({'remarks': record.remarks})
                }
              })}
            >
              <Table.Column width={150} title="種　別" dataIndex="option_type"
                render={(text, record, index) => (
                  <Form.Item name={["dataTable", index, "option_type"]} style={styleFormItem}>
                    <Input readOnly={!this.state.editPage} style={styleInput} name='option_type'
                      onChange={(e) => this.onChangeInput(e, record)} />
                  </Form.Item>
                )}
              />
              <Table.Column title="オ　プ　シ　ョ　ン" dataIndex="options"
                render={(text, record, index) => (
                  <Form.Item name={["dataTable", index, "options"]} style={styleFormItem}>
                    <Input readOnly={!this.state.editPage} style={styleInput} name='options'
                      onChange={(e) => this.onChangeInput(e, record)} />
                  </Form.Item>
                )}
              />
              <Table.Column align='center' width={70}
                title={() => (<Button size='small' style={{ display: this.state.editPage ? '' : 'none' }} type='primary'
                  icon={<PlusOutlined />} onClick={() => {
                    let arrTemp = [...this.state.dataSource];
                    arrTemp.push({});
                    this.setState({ dataSource: arrTemp });
                  }}></Button>)}
                render={(text, record, index) => (
                  <>
                    <Button size='small' style={{ border: 'none', display: this.state.editPage ? '' : 'none' }}
                      icon={<SaveOutlined style={{ color: 'green' }} />} onClick={() => this.updateOrCreateData(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none', display: this.state.editPage ? '' : 'none' }}
                      danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => {
                            if (record.id) {
                              deleteSpecificHealthTokuhoOptionsFileAction({ id: record.id })
                                .then(res => {
                                  message.success('成功');
                                  this.loadData(this.state.classificationCode);
                                })
                                .catch(err => message.error('エラー'))
                            } else {
                              let arrTemp = [...this.state.dataSource];
                              arrTemp.splice(arrTemp.length - 1, 1);
                              this.loadData();
                            }
                          }
                        })
                      }}
                    ></Button>
                  </>
                )}
              />
            </Table>
          </Card>
          <Card>
            <Form.Item name="remarks" label="備考" style={styleFormItem} >
              <Input name='remarks' onChange={this.onChangeInput} />
            </Form.Item>
          </Card>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1306001_SpecificHealthTokuhoOptionsFile);
