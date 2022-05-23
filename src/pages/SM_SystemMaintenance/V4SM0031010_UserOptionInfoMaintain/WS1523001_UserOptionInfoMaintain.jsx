import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Button, Card, Col, Dropdown, Form, Input, Menu, Row, Select, Space, Table, Modal, message, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import {
  getScreenDataUserOptionInfoMaintainAction, getDataOptionCodeAction, getDataOptionInputAction, saveOrUpdateDataOptionCodeAction,
  saveOrUpdateDataOptionInputAction, deleteOptionCodeAction
} from "redux/SystemMaintenance/UserOptionInfoMaintain/UserOptionInfoMaintain.actions";
import WS1523004_SearchScreen from "./WS1523004_SearchScreen";
import WS1523005_OptionTypeMaintain from "./WS1523005_OptionTypeMaintain";
import WS1523007_UserOptionsInquiry from "./WS1523007_UserOptionsInquiry";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS1523001_UserOptionInfoMaintain extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_TypeCode: PropTypes.any,
    Li_OptionCode: PropTypes.any,
    Li_Expansion: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'ユーザーオプション情報保守';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      OptionTypeList: [],
      OptionType: '',
      OptionTypeValue: 1,
      UserOptionSubject_Fixed: '',

      dataOptionCode: [],
      rowSelectOptionCode: {},
      isLoadOptionCode: true,

      dataOptionInput: [],
      rowSelectOptionInput: {},
      isLoadOptionInput: true,

      colLeft: 10,
      colRight: 14,
      isEdit: false,

      SearchScreenArray: []
    };
  }

  componentDidMount = () => {
    this.loadScreenData();
  };

  loadScreenData = () => {
    getScreenDataUserOptionInfoMaintainAction()
      .then(res => {
        if (res) {
          let dataAPI = res.data;
          this.setState({
            OptionTypeList: dataAPI.OptionType,
            OptionType: dataAPI.OptionType[0].W1_option_type,
            OptionTypeValue: dataAPI.OptionType[0].id,
            UserOptionSubject_Fixed: dataAPI.UserOptionSubject_Fixed
          });
          const params = {
            OptionType: dataAPI.OptionType[0].W1_option_type,
            UserOptionSubject_Fixed: dataAPI.UserOptionSubject_Fixed
          }
          this.loadDataOptionCode(params);
        }
      })
  }

  loadDataOptionCode(params) {
    this.setState({ isLoadOptionCode: true });
    getDataOptionCodeAction(params)
      .then(res => {
        if (res) {
          let data = res.data.resUO.map((item, index) => ({ ...item, id: item.parent_id }))
          this.setState({ dataOptionCode: data });
          this.formRef?.current?.setFieldsValue({ 'dataOptionCode': data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoadOptionCode: false }))
  }

  loadDataOptionInput(params) {
    this.setState({ isLoadOptionInput: true });
    getDataOptionInputAction(params)
      .then(res => {
        if (res) {
          this.setState({ dataOptionInput: res.data });
          this.formRef?.current?.setFieldsValue({ 'dataOptionInput': res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoadOptionInput: false }))
  }

  createOrUpdateData = (record, table) => {
    if (table === 'optionCode') {
      const params = {
        ...record,
        type_code: this.state.OptionType
      }
      saveOrUpdateDataOptionCodeAction(params)
        .then(res => {
          message.success('成功');
          const params = {
            OptionType: this.state.OptionType,
            UserOptionSubject_Fixed: this.state.UserOptionSubject_Fixed
          }
          this.loadDataOptionCode(params);
        })
        .catch(err => message.error('エラー'))
    } else {
      const params = {
        parent_id: this.state.rowSelectOptionCode.parent_id,
        options: this.state.dataOptionInput
      }
      this.saveOrUpdateDataOptionInput(params);
    }
  }

  saveOrUpdateDataOptionInput = (params) => {
    saveOrUpdateDataOptionInputAction(params)
      .then(res => {
        message.success('成功');
        this.setState({
          isLoadOptionInput: true,
          dataOptionInput: []
        })
        this.loadScreenData();
      })
      .catch(err => message.error('エラー'))
  }

  deleteData = (record, table) => {
    if (table === 'optionCode') {
      if (record.id) {
        deleteOptionCodeAction({ id: record.id })
          .then(res => {
            message.success('成功');
            const params = {
              OptionType: this.state.OptionType,
              UserOptionSubject_Fixed: this.state.UserOptionSubject_Fixed
            }
            this.loadDataOptionCode(params);
          })
          .catch(err => message.error('エラー'))
      } else {
        let arrTemp = [...this.state.dataOptionCode];
        arrTemp.splice(arrTemp[0], 1);
        this.formRef.current.setFieldsValue({ 'dataOptionCode': arrTemp });
        this.setState({ dataOptionCode: arrTemp });
      }
    } else {
      let arrTemp = [...this.state.dataOptionInput];
      let index = arrTemp.findIndex(item => item.id === record.id);
      if (index !== -1) {
        arrTemp.splice(index, 1);
        this.formRef.current.setFieldsValue({ 'dataOptionInput': arrTemp });
        this.setState({ dataOptionInput: arrTemp });
        if (record.id) {
          const params = {
            parent_id: this.state.rowSelectOptionCode.parent_id,
            options: arrTemp
          }
          this.saveOrUpdateDataOptionInput(params);
        }
      }
    }
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  handleChangeData = (record, value, name, table) => {
    if (table === 'optionCode') {
      let arrTemp = [...this.state.dataOptionCode];
      let index = arrTemp.indexOf(record);
      if (index !== -1) {
        let objTemp = {
          ...record,
          [name]: value
        }
        arrTemp[index] = objTemp;
        this.setState({
          dataOptionCode: arrTemp,
          rowSelectOptionCode: objTemp
        });
        this.formRef.current.setFieldsValue({ 'dataOptionCode': arrTemp });
      }
    } else {
      let arrTemp = [...this.state.dataOptionInput];
      let index = arrTemp.indexOf(record);
      if (index !== -1) {
        let objTemp = {
          ...record,
          [name]: value
        }
        arrTemp[index] = objTemp;
        this.setState({
          dataOptionInput: arrTemp,
          rowSelectOptionInput: objTemp
        });
        this.formRef.current.setFieldsValue({ 'dataOptionInput': arrTemp });
      }
    }
  }

  setHiddenOrShowTable = () => {
    this.state.colLeft === 10
      ? this.setState({ colLeft: 24, colRight: 0 })
      : this.setState({ colLeft: 10, colRight: 14 })
  }

  searchStringInArray = (str, strArray) => {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

  setSearchScreen = (value) => {
    let arrTemp = [...this.state.SearchScreenArray];
    let array = this.state.dataOptionCode.map(item => item.identification_name);
    let index = this.searchStringInArray(value, array);
    if (index !== -1) {
      arrTemp.push(array[index]);
      this.setState({ SearchScreenArray: arrTemp });
    }
  }

  setOptionTypeMaintain = (value) => {
    let arrayOptionTypeList = [...this.state.OptionTypeList];
    let optionType = {
      W1_option_type: value,
      id: this.state.OptionTypeList.length + 1
    }
    arrayOptionTypeList.push(optionType);
    this.setState({
      isLoadOptionCode: true,
      dataOptionCode: [],
      isLoadOptionInput: true,
      dataOptionInput: [],
      OptionTypeList: arrayOptionTypeList,
      OptionType: value,
      OptionTypeValue: arrayOptionTypeList.length
    });
    this.formRef?.current?.setFieldsValue({ 'dataOptionCode': [] });
    this.formRef?.current?.setFieldsValue({ 'dataOptionInput)': [] });
    let arrTemp = [];
    arrTemp.push({});
    this.setState({
      isLoadOptionCode: false,
      dataOptionCode: arrTemp,
      isEdit: true
    });
    this.formRef?.current?.setFieldsValue({ 'dataOptionCode': arrTemp });
  }

  handleChangSelect = (value) => {
    let index = this.state.OptionTypeList.findIndex(item => item.id === value);
    if (index !== -1) {
      this.setState({
        OptionType: this.state.OptionTypeList[index].W1_option_type
      }, () => {
        this.setState({dataOptionInput: []})
        this.formRef?.current?.setFieldsValue({ 'dataOptionInput)': [] });
        this.loadDataOptionCode({
          OptionType: this.state.OptionTypeList[index].W1_option_type,
          UserOptionSubject_Fixed: this.state.UserOptionSubject_Fixed
        });
      })
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
      <div className="user-option-info-maintain">
        <Form ref={this.formRef} initialValues={{ OptionType: this.state.OptionTypeValue }}>
          <Card title={
            <Space>
              <div>ユーザーオプション情報保守</div>
              <Dropdown
                trigger='click'
                overlay={() => (
                  <Menu>
                    <Menu.Item onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '40%',
                          component: (
                            <WS1523004_SearchScreen
                              Lio_SearchChar={this.state.rowSelectOptionCode.identification_name}
                              onFinishScreen={(value) => {
                                this.setSearchScreen(value);
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      });
                    }}>F11</Menu.Item>
                  </Menu>
                )}
              ><Button>Options</Button></Dropdown>
            </Space>
          }
            className="mb-2">
            <Space>
              <Form.Item name="OptionType" label="種別">
                <Select style={{ width: '150px' }} onChange={this.handleChangSelect}>
                  {this.state.OptionTypeList?.map((option) => (
                    <Select.Option key={`OptionType-${option.id}`} value={option.id}>{option.W1_option_type}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item style={{ marginRight: '15px' }}>
                <Button icon={<PlusOutlined />}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '20%',
                        component: (
                          <WS1523005_OptionTypeMaintain
                            onFinishScreen={(value) => {
                              this.setOptionTypeMaintain(value)
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button style={{ background: this.state.isEdit ? '#FCD9CB' : '#FAFAC8' }}
                  onClick={() => this.setState({ isEdit: !this.state.isEdit })}
                >修正</Button>
              </Form.Item>

              <Form.Item>
                <Button style={{ background: this.state.colLeft === 10 ? '#FAFAC8' : '#FCD9CB' }}
                  onClick={this.setHiddenOrShowTable}
                >一覧</Button>
              </Form.Item>
            </Space>
          </Card>
          <Row gutter={20}>
            <Col span={this.state.colLeft}>
              <Card>
                <Table
                  size='small'
                  dataSource={this.state.dataOptionCode}
                  loading={this.state.isLoadOptionCode}
                  pagination={{
                    ...this.state.pagination,
                    hideOnSinglePage: this.state.dataOptionCode.length > 10 ? false : true
                  }}
                  rowKey={(record) => record.id}
                  onRow={(record, index) => ({
                    onClick: event => {
                      this.setState({ rowSelectOptionCode: record });
                      if (record !== this.state.rowSelectOptionCode)
                        this.loadDataOptionInput(record)
                    }
                  })}
                >
                  <Table.Column title="ｺｰﾄﾞ" dataIndex="option_code" width={120}
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataOptionCode, record.id);
                      let isCheck = this.state.SearchScreenArray.findIndex(item => record.identification_name === item);
                      return (
                        <Form.Item name={['dataOptionCode', index, 'option_code']} style={styleFormItem}>
                          <Input style={{ ...styleInput, backgroundColor: isCheck !== -1 ? '#FAFAC8' : '' }}
                            maxLength={10} readOnly={!this.state.isEdit}
                            onChange={(e) => this.handleChangeData(record, e.target.value, 'option_code', 'optionCode')}
                            onDoubleClick={() => {
                              if (this.state.isEdit) {
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: true,
                                    width: '80%',
                                    component: (
                                      <WS1523007_UserOptionsInquiry
                                        Li_TypeCode={this.state.OptionType}
                                        Li_OptionCodeList
                                        Lio_OptionCode
                                        Lio_IdentifyName
                                        Lio_OptionItem
                                        onFinishScreen={({ recordData }) => {
                                          let arrayData = [...this.state.dataOptionCode]
                                          let index = arrayData.indexOf(record);
                                          if (index !== -1) {
                                            record = {
                                              ...recordData,
                                              options: recordData.optional_items
                                            }
                                            arrayData[index] = record;
                                            this.setState({
                                              dataOptionCode: arrayData,
                                              rowSelectOptionCode: record,
                                            });
                                            this.formRef?.current?.setFieldsValue({ 'dataOptionCode': arrayData })
                                          }

                                          this.closeModal()
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
                    }}
                  />
                  <Table.Column title="名称" dataIndex="identification_name" width={250}
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataOptionCode, record.id);
                      let isCheck = this.state.SearchScreenArray.findIndex(item => record.identification_name === item);
                      return (
                        <Form.Item name={['dataOptionCode', index, 'identification_name']} style={styleFormItem}>
                          <Input style={{ ...styleInput, backgroundColor: isCheck !== -1 ? '#FAFAC8' : '' }} maxLength={50} readOnly={!this.state.isEdit}
                            onChange={(e) => this.handleChangeData(record, e.target.value, 'identification_name', 'optionCode')} />
                        </Form.Item>
                      )
                    }}
                  />
                  {this.state.colLeft !== 10
                    ? <Table.Column title=" ｵﾌﾟｼｮﾝ" dataIndex="options"
                      render={(text, record) => {
                        let index = this.findIndexByID(this.state.dataOptionCode, record.id);
                        let isCheck = this.state.SearchScreenArray.findIndex(item => record.identification_name === item);
                        return (
                          <Form.Item name={['dataOptionCode', index, 'options']} style={styleFormItem}>
                            <Input style={{ ...styleInput, backgroundColor: isCheck !== -1 ? '#FAFAC8' : '' }} readOnly={!this.state.isEdit}
                              onChange={(e) => this.handleChangeData(record, e.target.value, 'options', 'optionCode')} />
                          </Form.Item>
                        )
                      }}
                    />
                    : <></>
                  }
                  <Table.Column align='center' width={70}
                    title={() => (<Button size='small' type='primary' style={{ display: !this.state.isEdit ? 'none' : '' }}
                      icon={<PlusOutlined />} onClick={() => {
                        let arrTemp = [{}];
                        this.formRef.current.setFieldsValue({ 'dataOptionCode': [...arrTemp, ...this.state.dataOptionCode] });
                        this.setState({ dataOptionCode: [...arrTemp, ...this.state.dataOptionCode] });
                      }}></Button>)}
                    render={(text, record, index) => (
                      <>
                        <Button size='small' style={{ border: 'none', display: !this.state.isEdit ? 'none' : '' }}
                          disabled={!record.option_code}
                          icon={<SaveOutlined style={{ color: 'green' }} />}
                          onClick={() => this.createOrUpdateData(this.state.rowSelectOptionCode, 'optionCode')}
                        ></Button>
                        <Button size='small' style={{ border: 'none', display: !this.state.isEdit ? 'none' : '' }}
                          danger icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？',
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () => this.deleteData(record, 'optionCode')
                            })
                          }}
                        ></Button>
                      </>
                    )}
                  />
                </Table>
              </Card>
            </Col>
            <Col span={this.state.colRight} style={{ paddingLeft: 0 }}>
              <Card>
                <Table
                  size='small'
                  dataSource={this.state.dataOptionInput}
                  loading={this.state.isLoadOptionInput}
                  pagination={{
                    ...this.state.pagination,
                    hideOnSinglePage: this.state.dataOptionInput.length > 10 ? false : true
                  }}
                  rowKey={(record) => record.id}
                  onRow={(record, index) => ({ onClick: event => this.setState({ rowSelectOptionInput: record }) })}
                >
                  <Table.Column title="連番" dataIndex="W1_serial_num" width={60}
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataOptionInput, record.id);
                      return (
                        <Form.Item name={['dataOptionInput', index, 'W1_serial_num']} style={styleFormItem}>
                          <InputNumber style={styleInput} readOnly={!this.state.isEdit} maxLength={2}
                            onChange={(value) => this.handleChangeData(record, value, 'W1_serial_num', 'optionInput')} />
                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column title="項目" dataIndex="W1_item"
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataOptionInput, record.id);
                      return (
                        <Form.Item name={['dataOptionInput', index, 'W1_item']} style={styleFormItem}>
                          <Input style={styleInput} readOnly={!this.state.isEdit}
                            onChange={(e) => this.handleChangeData(record, e.target.value, 'W1_item', 'optionInput')} />
                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column title="内容" dataIndex="W1_content"
                    render={(text, record) => {
                      let index = this.findIndexByID(this.state.dataOptionInput, record.id);
                      return (
                        <Form.Item name={['dataOptionInput', index, 'W1_content']} style={styleFormItem}>
                          <Input style={styleInput} readOnly={!this.state.isEdit}
                            onChange={(e) => this.handleChangeData(record, e.target.value, 'W1_content', 'optionInput')} />
                        </Form.Item>
                      )
                    }}
                  />
                  <Table.Column title="補足説明" dataIndex="Description" />
                  <Table.Column align='center' width={70}
                    title={() => (<Button size='small' type='primary' style={{ display: !this.state.isEdit ? 'none' : '' }}
                      icon={<PlusOutlined />} onClick={() => {
                        let arrTemp = [...this.state.dataOptionInput];
                        arrTemp.push({});
                        this.formRef.current.setFieldsValue({ 'dataOptionInput': arrTemp });
                        this.setState({ dataOptionInput: arrTemp });
                      }}></Button>)}
                    render={(text, record, index) => (
                      <>
                        <Button size='small' style={{ border: 'none', display: !this.state.isEdit ? 'none' : '' }}
                          disabled={!record.W1_item}
                          icon={<SaveOutlined style={{ color: 'green' }} />}
                          onClick={() => this.createOrUpdateData(this.state.rowSelectOptionInput, 'optionInput')}
                        ></Button>
                        <Button size='small' style={{ border: 'none', display: !this.state.isEdit ? 'none' : '' }}
                          danger icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content: '消去してもよろしいですか？',
                              okText: 'は　い',
                              cancelText: 'いいえ',
                              onOk: () => this.deleteData(record, 'optionInput')
                            })
                          }}
                        ></Button>
                      </>
                    )}
                  />
                </Table>
              </Card>
            </Col>
          </Row>
        </Form>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          destroyOnClose={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1523001_UserOptionInfoMaintain);
