import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Form, Button, Modal, Input, Select, message } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getDataSupportItemAction, saveAndUpdateSupportItemAction, deleteSupportItemAction } from "redux/SpecificInsureMaintenance/SupportItem/SupportItem.actions";
import { parseInt } from "lodash";
import WS1396009_SupportItemSub from "./WS1396009_SupportItemSub";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS1396001_SupportItem extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = 'V4-TMS02010:支援項目';

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

      isSave: false,
    };
  }

  componentDidMount = () => {
    this.getDataSupportItem();
  }

  getDataSupportItem = () => {
    this.setState({ isLoading: true });
    getDataSupportItemAction()
      .then(res => {
        if (res) {
          this.setState({ dataSource: res.data });
          this.formRef?.current?.setFieldsValue({ 'dataSource': res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  saveAndUpdateSupportItem = (record) => {
    if (this.checkValueInput(record) && record.SupportDivisionScreen && record.SupportFormScreen && record.SupportUnitInfounitClassifyScre) {
      if (!record.id) {
        record = {
          ...record,
          id: ''
        }
      }
      saveAndUpdateSupportItemAction(record)
        .then(res => {
          message.success('成功');
          this.getDataSupportItem();
        })
        .catch(err => message.error(err.response.data.message))
    }else{
      Modal.error({
        content: '支援区分を入力して下さい',
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      });
    }
  }

  deleteSupportItem = (record) => {
    if (record.id) {
      deleteSupportItemAction(record)
        .then(res => {
          message.success('成功');
          this.getDataSupportItem();
        })
        .catch(err => message.error(err.response.data.message))
    } else {
      let arrTemp = [...this.state.dataSource];
      arrTemp.splice(arrTemp[0], 1);
      this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
      this.setState({ dataSource: arrTemp });
      // this.getDataSupportItem();
    }
  }

  openPopUp = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS1396009_SupportItemSub
            SupportCode = {this.state.rowSelect.support_code}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  
  closeModal = () => {
    this.setState((prevState) => ({
      childModal: { ...prevState.childModal, visible: false },
    }));
  };

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  handleChangeSelect = (value, option, index, state) => {
    let arrTemp = [...this.state.dataSource];
    arrTemp[index] = {
      ...arrTemp[index],
      [state]: value
    };
    this.setState({ dataSource: arrTemp });
    this.formRef?.current?.setFieldsValue({ 'dataSource': arrTemp })
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
      this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
    }
  }

  checkValueInput = (record) => {
    let lowest_value = parseInt(record.restriction_info_lowest_value);
    let highest_value = parseInt(record.restriction_info_highest_value);
    if (!isNaN(lowest_value) && !isNaN(highest_value)) {
      if (lowest_value > highest_value) {
        Modal.error({
          content: '制限情報範囲エラー',
          icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
        });
        return false;
      }
    }
    return true;
  }

  addRow = () => {
    let arrTemp = [{}];
    this.formRef.current.setFieldsValue({ 'dataSource': [...arrTemp, ...this.state.dataSource] });
    this.setState({ dataSource: [...arrTemp, ...this.state.dataSource] });
  }

  render() {
    return (
      <div className="support-item">
        <Card title="V4-TMS02010:支援項目">
          <Form ref={this.formRef}>
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={this.state.pagination}
              rowKey={(record) => record.id}
              onRow={(record, index) => ({
                onClick: e => this.setState({ rowSelect: record }),
                onDoubleClick: e => this.openPopUp(),
              })}
            >
              <Table.Column width={150} title="支援コード" dataIndex="support_code"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'support_code']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={10} onChange={(e) => this.handleChangeInput(e, record)} name='support_code' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="略称名" dataIndex="short_name"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'short_name']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={10} onChange={(e) => this.handleChangeInput(e, record)} name='short_name' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="支援内容" dataIndex="support"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'support']} style={styleFormItem}>
                      <Input style={styleInput} maxLength={20} onChange={(e) => this.handleChangeInput(e, record)} name='support' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="支援区分" dataIndex="SupportDivisionScreen"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'SupportDivisionScreen']} style={styleFormItem}>
                      <Select onChange={(value, option) => this.handleChangeSelect(value, option, index, 'SupportDivisionScreen')}>
                        <Select.Option value="A">支援Ａ</Select.Option>
                        <Select.Option value="B">支援Ｂ</Select.Option>
                        <Select.Option value="T">督促</Select.Option>
                      </Select>
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="支援形態" dataIndex="SupportFormScreen"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'SupportFormScreen']} style={styleFormItem}>
                      <Select onChange={(value, option) => this.handleChangeSelect(value, option, index, 'SupportFormScreen')} >
                        <Select.Option value={'1'}>個別</Select.Option>
                        <Select.Option value={'2'}>ｸﾞﾙｰﾌﾟ</Select.Option>
                        <Select.Option value={'3'}>電話</Select.Option>
                        <Select.Option value={'4'}>電子ﾒｰﾙ</Select.Option>
                        <Select.Option value={'5'}>その他</Select.Option>
                        <Select.Option value={'6'}>遠隔面談</Select.Option>
                        <Select.Option value={'9'}>督促状</Select.Option>
                      </Select>
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="単位" width={75} dataIndex="SupportUnitInfounitClassifyScre"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'SupportUnitInfounitClassifyScre']} style={styleFormItem}>
                      <Select onChange={(value, option) => this.handleChangeSelect(value, option, index, 'SupportUnitInfounitClassifyScre')}>
                        <Select.Option value="1">分</Select.Option>
                        <Select.Option value="2">往復</Select.Option>
                      </Select>
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="値" width={120} dataIndex="support_unit_info_per_unit_valu"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'support_unit_info_per_unit_valu']} style={styleFormItem}>
                      <Input style={styleInput} suffix={
                        record.support_unit_info_per_unit_valu
                          ? (record.SupportUnitInfounitClassifyScre === '1' ? '分' : '往復')
                          : ''
                      }
                        min={1} type='number' maxLength={3} onChange={(e) => this.handleChangeInput(e, record)} name='support_unit_info_per_unit_valu'
                      />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="ポイント" width={120} dataIndex="support_unit_info_per_unit_poin"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'support_unit_info_per_unit_poin']} style={styleFormItem}>
                      <Input style={styleInput} min={1} type='number' onChange={(e) => this.handleChangeInput(e, record)}
                        name='support_unit_info_per_unit_poin' maxLength={4} />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="最低値" width={120} dataIndex="restriction_info_lowest_value"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'restriction_info_lowest_value']} style={styleFormItem}>
                      <Input style={styleInput} suffix={
                        record.restriction_info_lowest_value
                          ? (record.SupportUnitInfounitClassifyScre === '1' ? '分' : '往復')
                          : ''
                      }
                        min={1} type='number' maxLength={3} onChange={(e) => this.handleChangeInput(e, record)} name='restriction_info_lowest_value'
                        onBlur={() => this.checkValueInput(record)}
                      />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="最高値" width={120} dataIndex="restriction_info_highest_value"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return ( 
                    <Form.Item name={['dataSource', index, 'restriction_info_highest_value']} style={styleFormItem}>
                      <Input style={styleInput} suffix={
                        record.restriction_info_highest_value
                          ? (record.SupportUnitInfounitClassifyScre === '1' ? '分' : '往復')
                          : ''
                      }
                        min={1} type='number' maxLength={3} onChange={(e) => this.handleChangeInput(e, record)} name='restriction_info_highest_value'
                        onBlur={() => this.checkValueInput(record)}
                      />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="オプション" width={120} dataIndex="option_remark"
                render={(text, record) => {
                  let index = this.findIndexByID(this.state.dataSource, record.id);
                  return (
                    <Form.Item name={['dataSource', index, 'option_remark']} style={styleFormItem}>
                      <Input style={styleInput} onChange={(e) => this.handleChangeInput(e, record)} name='option_remark' />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="明細" dataIndex="expression_24" />
              <Table.Column align='center' width={80}
                title={(record) => (<Button size='small' type='primary' icon={<PlusOutlined />} onClick={this.addRow}></Button>)}
                render={(text, record, index) => (
                  <>
                    <Button size='small' style={{ border: 'none', }}
                      disabled={this.state.isSave}
                      icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.saveAndUpdateSupportItem(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none', }}
                      danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.deleteSupportItem(record)
                        })
                      }}
                    ></Button>
                  </>
                )}
              />
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1396001_SupportItem);
