import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Row, Col, Input, Checkbox, Tabs, Select, Modal, Form, message, InputNumber, Button, TimePicker, } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS0276001_ProgramSearch from 'pages/SM_SystemMaintenance/V4SM0006001_ProgressInfoMaintain/WS0276001_ProgramSearch.jsx';
import {
  getListDataConfigurationAction, saveDataConfigurationAction, deleteDataConfigurationAction
} from "redux/CooperationRelated/OnlineInstruction/Configuration.actions";
import moment from "moment";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS2720007_Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '設定';

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
      rowSelect: {},
    };
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {
    this.setState({ isLoading: true });
    getListDataConfigurationAction()
      .then(res => {
        if (res){
          let data = res.data.map(item => ({...item, stop_time_at: moment(item.stop_time_at, 'hh:mm:ss')}))
          this.setState({ dataSource: data });
          this.formRef?.current?.setFieldsValue({ 'dataSource': data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  createOrUpdateData = (record) => {
    const params = {
      id: record.id || undefined,
      enabled: record.enabled ||  '',
      serial_number: record.serial_number ||  '',
      name: record.name ||  '',
      published_name: record.published_name || '',
      stop_time_at: moment(record.stop_time_at, 'hh:mm:ss').isValid() 
        ? moment(record.stop_time_at, 'hh:mm:ss').format('HH:mm:ss')
        : '00:00:00',
      timer_wait: record.timer_wait ||  '0',
      exec: record.exec ||  '',
      type: record.type ||  '',
      text: record.text ||  '',
      remarks: record.remarks ||  '',
      description: record.description || '',
    }
    if(params.id === undefined){
      delete params.id
    }
    saveDataConfigurationAction(params)
      .then(res => {
        message.success('成功');
        this.loadData();
      })
      .catch(err => message.error('エラー'))
  }

  deleteData = (record) => {
    if (record.id) {
      deleteDataConfigurationAction({ id: record.id })
        .then(res => {
          message.success('成功');
          this.loadData();
        })
        .catch(err => message.error('エラー'))
    } else {
      let arrTemp = [...this.state.dataSource];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
      this.setState({ dataSource: arrTemp });
    }
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  handleChangeInput = (record, value, name) => {
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp;
      this.setState({ 
        dataSource: arrTemp, 
        rowSelect: objTemp
      });
      this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
    }
  }

  render() {
    let idx = this.findIndexByID(this.state.dataSource, this.state.rowSelect.id);
    return (
      <div className="configuration">
        <Card title="設定">
          <Form ref={this.formRef}>
            <Row gutter={16}>
              <Col span={10}>
                <Table
                  size='small'
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoading}
                  pagination={{
                    ...this.state.pagination,
                    hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
                  }}
                  rowKey={(record) => record.id}
                  onRow={(record, index) => ({
                    onClick: event => {
                      this.setState({ rowSelect: record });
                    }
                  })}
                >
                  <Table.Column title="有効" dataIndex="enabled"
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataSource, record.id);
                      return (
                        <Form.Item name={['dataSource', index, 'enabled']} valuePropName='checked' style={styleFormItem}>
                          <Checkbox onChange={(event) => this.handleChangeInput(record, event.target.checked ? 1 : 0, 'enabled')} />
                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column title="連番" dataIndex="serial_number"
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataSource, record.id);
                      return (
                        <Form.Item name={['dataSource', index, 'serial_number']} style={styleFormItem}>
                          <InputNumber style={styleInput} maxLength={3} min={0}
                            onChange={(value) => this.handleChangeInput(record, value, 'serial_number')}
                          />
                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column title="名称" dataIndex="name"
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataSource, record.id);
                      return (
                        <Form.Item name={['dataSource', index, 'name']} style={styleFormItem}>
                          <Input style={styleInput}
                            onChange={(event) => this.handleChangeInput(record, event.target.value, 'name')}
                          />
                        </Form.Item>
                      )
                    }}
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
                          onClick={() => this.createOrUpdateData(this.state.rowSelect)}
                        ></Button>
                        <Button size='small' style={{ border: 'none', }}
                          danger icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？',
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () => this.deleteData(record)
                            })
                          }}
                        ></Button>
                      </>
                    )}
                  />
                </Table>
              </Col>
              <Col span={14}>
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="常駐設定" key="1">
                    <Row gutter={16} style={{ marginTop: '5px' }}>
                      <Col span={10}>
                        <Form.Item name={['dataSource', idx, 'published_name']} label='　公開名'>
                          <Input.Search
                            onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 700,
                                  component:
                                    <WS0276001_ProgramSearch
                                      onFinishScreen={({ Lio_Publicval, recordData }) => {
                                        this.setState({
                                          childModal: {
                                            ...this.state.childModal,
                                            visible: false,
                                          },
                                        });
                                        this.handleChangeInput(this.state.rowSelect, Lio_Publicval, 'published_name');
                                        this.handleChangeInput(this.state.rowSelect, recordData.description, 'description');
                                      }}
                                    />
                                  ,
                                },
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={14}>
                        <Form.Item name={['dataSource', idx, 'description']}>
                          <Input style={styleInput} readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item name={['dataSource', idx, 'stop_time_at']} label='停止時間'>
                          <TimePicker value={moment()} format='HH:mm:ss'
                            onChange={(time) => this.handleChangeInput(this.state.rowSelect, time, 'stop_time_at')}/>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item name={['dataSource', idx, 'timer_wait']} label='ウェイト'>
                          <InputNumber maxLength={4} min={0}
                            onChange={(value) => this.handleChangeInput(this.state.rowSelect, value, 'timer_wait')}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name={['dataSource', idx, 'remarks']} label='　備　考'>
                      <Input onChange={(event) => this.handleChangeInput(this.state.rowSelect, event.target.value, 'remarks')}/>
                    </Form.Item>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="起動設定" key="2">
                    <Form.Item name={['dataSource', idx, 'type']} label='　　　起動方法'>
                      <Select style={{ width: '100px' }}
                        onChange={(value) => this.handleChangeInput(this.state.rowSelect, value, 'type')}
                      >
                        <Select.Option value="N">N:通常</Select.Option>
                        <Select.Option value="X">X:最大</Select.Option>
                        <Select.Option value="M">M:最小</Select.Option>
                        <Select.Option value="H">H:なし</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={['dataSource', idx, 'exec']} label='ショートカット'>
                      <Input onChange={(event) => this.handleChangeInput(this.state.rowSelect, event.target.value, 'exec')} />
                    </Form.Item>
                    <Form.Item name={['dataSource', idx, 'text']} label='&nbsp;PROGRAM.TXT'>
                      <Input onChange={(event) => this.handleChangeInput(this.state.rowSelect, event.target.value, 'text')} />
                    </Form.Item>
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
          </Form>
        </Card>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2720007_Configuration);
