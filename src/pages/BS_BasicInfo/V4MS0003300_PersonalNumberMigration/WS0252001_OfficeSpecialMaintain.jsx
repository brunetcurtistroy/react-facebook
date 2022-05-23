import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import { Card, Table, Select, Form, Input, Button, message, Modal } from "antd";
import { InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import {
  officeSpecialMaintainSaveButtonAction, getDataOfficeSpecialMaintainAction, deleteDataOfficeSpecialMaintainAction
} from "redux/basicInfo/PersonalNumberMigration/PersonalNumberMigration.actions";


class WS0252001_OfficeSpecialMaintain extends React.Component {
  static propTypes = {
    Li_OfficeCode: PropTypes.any,
    Li_BranchStoreCode: PropTypes.any
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '事業所特記保守';

    this.state = {
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      importance: 1,
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
    };

    this.onFinish = this.onFinish.bind(this)
  }

  componentDidMount = () => {
    this.loadData();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.loadData();
    }
  }

  loadData = () => {
    this.setState({ isLoading: true });
    const { Li_OfficeCode, Li_BranchStoreCode } = this.props;
    getDataOfficeSpecialMaintainAction({ Li_OfficeCode, Li_BranchStoreCode })
      .then(res => {
        if (res) {
          this.setState({
            dataSource: res?.data,
            importance: res && res.data.length > 0 ? res.data[0].importance : null
          });
          if (this.props.onChangeData) {
            this.props.onChangeData({ importance: res && res.data.length > 0 ? res.data[0].importance : null })
          }

          this.formRef?.current?.setFieldsValue({ 'dataSource': res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  createOrUpdateData = (record) => {
    const params = {
      ...record,
      id: record.id || '',
      user_name: record.user_name || '',
      recording_date_on: record.recording_date_on || '',
      Li_OfficeCode: this.props.Li_OfficeCode,
      Li_BranchStoreCode: this.props.Li_BranchStoreCode
    }
    officeSpecialMaintainSaveButtonAction(params)
      .then(() => {
        // this.props.onFinishScreen({ importance: this.state.importance });
        this.loadData()
      })
      .catch(error => message.error(error.response.data.message || 'エラーが発生しました'))
  }

  deleteData = (record, index) => {
    if (record.id) {
      deleteDataOfficeSpecialMaintainAction({ id: record.id })
        .then(res => {
          message.success('成功');
          this.loadData();
        })
        .catch(err => message.error('エラー'))
    } else {
      let arrTemp = [...this.state.dataSource];
      arrTemp.splice(index, 1);
      this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
      this.setState({ dataSource: arrTemp });
      this.loadData();
    }
  }

  findIndexByID = (arrayData, recordID) => arrayData.findIndex((item) => recordID === item.id);

  handleChangeInput = (record, value, name) => {
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.findIndex(item => record.id === item.id);
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
      this.formRef?.current?.setFieldsValue({ 'dataSource': arrTemp });
    }
  }

  onFinish(values) {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({ importance: this.state.importance })
    }
  }

  render() {
    return (
      <div className="office-special-maintain" >
        <Card title="事業所特記保守" >
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{ importance: 1, recording_date_on: moment().format('YYYY/MM/DD'), user_name: '' }}>
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
              rowKey={(record) => record.id}
              size='small'
              bordered
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="重要度" width={100} dataIndex="importance" render={(text, record) => {
                let index = this.findIndexByID(this.state.dataSource, record.id);
                return (
                  <Form.Item name={['dataSource', index, 'importance']}>
                    <Select style={{ width: '100px' }} onChange={(value) => this.handleChangeInput(record, value, 'importance')}>
                      <Select.Option value={1}>情報</Select.Option>
                      <Select.Option value={3}>警告</Select.Option>
                      <Select.Option value={5}>重要</Select.Option>
                    </Select>
                  </Form.Item>
                )
              }} />
              <Table.Column align='center' dataIndex="importance" render={(code, record) => {
                let icon = '';
                switch (code) {
                  case 1:
                    icon = (<InfoCircleOutlined style={{ color: '#1890ff' }} />)
                    break;
                  case 3:
                    icon = (<WarningOutlined style={{ color: '#faad14' }} />)
                    break;
                  case 5:
                    icon = (<CloseCircleOutlined style={{ color: '#ff4d4f' }} />)
                    break;
                  default: ;
                };
                return (<Form.Item style={{ fontSize: 24 }}>{icon}</Form.Item>)
              }} />
              <Table.Column title="特記メモ" dataIndex="content" render={(text, record) => {
                let index = this.findIndexByID(this.state.dataSource, record.id);
                return (
                  <Form.Item name={['dataSource', index, 'content']}>
                    <Input onChange={(e) => this.handleChangeInput(record, e.target.value, 'content')} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="登録者" dataIndex="user_name" />
              <Table.Column title="登録日" dataIndex="recording_date_on" render={(text, record) => (
                <div>{moment(text).format('YYYY/MM/DD')}</div>
              )} />
              <Table.Column align='center'
                title={() => (<Button size='small' type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => {
                    let arrTemp = [...this.state.dataSource];
                    arrTemp.push({ importance: 1 });
                    this.formRef?.current?.setFieldsValue({ 'dataSource': arrTemp });
                    this.setState({ dataSource: arrTemp });
                  }}></Button>)}
                render={(text, record, index) => (
                  <>
                    <Button size='small' style={{ border: 'none', }}
                      icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.createOrUpdateData(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none', }}
                      danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.deleteData(record, index)
                        })
                      }}
                    ></Button>
                  </>
                )}
              />
            </Table>
            <Form.Item style={{ float: 'right' }} className='mt-3' hidden={true}>
              <Button type='primary' htmlType='submit'>保存</Button>
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0252001_OfficeSpecialMaintain);
