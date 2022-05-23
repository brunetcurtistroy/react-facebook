import React from "react";
import { connect } from "react-redux";
import GetImage from "constants/Images";
import PropTypes from "prop-types";
import { Card, Form, Input, Select, Button, Table, Row, Col, Modal, Space, InputNumber, message } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import WS0302001_SetInfoSearch from './WS0302001_SetInfoSearch.jsx';
import {
  getScreenDataBatchUpdateAction, saveAndUpdateBatchUpdateProcessAction, deleteDataBatchUpdateProcessAction,
  getDataSetConfigurationBatchUpdateProcessAction, calculatorUpdateProcessAction
} from "redux/basicInfo/ContractInfoBatchProcess/BatchUpdateProcess.actions.js";
import './WS0331019_BatchUpdateProcess.scss';
import { ModalConfirm } from "components/Commons/ModalConfirm.jsx";
import ModalDraggable from "components/Commons/ModalDraggable";

const formatter = value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
class WS0331019_BatchUpdateProcess extends React.Component {
  static propTypes = {
    Lo_StsUpdate: PropTypes.any,
    Lio_TaxClassify: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '一括更新処理';

    this.state = {
      initValue: {
        ChangeType: 40,
        Lio_TaxClassify: 2,
        Rounding: 0,
        Tax: 0.10
      },
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
      isLoading: false,
      rowSelect: {},
      isChangeValue: false,
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  componentDidMount = () => {
    this.loadInitData();
    this.loadData(this.state.initValue);
  }

  loadInitData = () => {
    getScreenDataBatchUpdateAction()
      .then(res => {
        let data = res.data;
        this.setState({
          initValue: {
            ...this.state.initValue,
            ChangeType: data.ChangeType,
            Tax: data.Tax,
          }
        })
      })
      .catch()
  }

  loadData = (params) => {
    getDataSetConfigurationBatchUpdateProcessAction(params)
      .then(res => {
        if (res.data) {
          let data = res.data.map(item => ({
            ...item,
            W3_insurer_total: item.W3_insurer_total ? item.W3_insurer_total : null,
            W1_insurers_bids: item.W1_insurers_bids ? item.W1_insurers_bids : null,
            W1_insurer_tax: item.W1_insurer_tax ? item.W1_insurer_tax : null,

            W3_office_tax: item.W3_office_tax ? item.W3_office_tax : null,
            W3_office_total: item.W3_office_total ? item.W3_office_total : null,
            W3_office_unit_price: item.W3_office_unit_price ? item.W3_office_unit_price : null,

            W3_other_org_bids: item.W3_other_org_bids ? item.W3_other_org_bids : null,
            W3_other_org_tax: item.W3_other_org_tax ? item.W3_other_org_tax : null,
            W3_other_org_total: item.W3_other_org_total ? item.W3_other_org_total : null,

            W3_person_1_tax: item.W3_person_1_tax ? item.W3_person_1_tax : null,
            W3_person_1_total: item.W3_person_1_total ? item.W3_person_1_total : null,
            W1_person_1_unit_price: item.W1_person_1_unit_price ? item.W1_person_1_unit_price : null,

            W3_person_2_tax: item.W3_person_2_tax ? item.W3_person_2_tax : null,
            W3_person_2_total: item.W3_person_2_total ? item.W3_person_2_total : null,
            W3_person_2_unit_price: item.W3_person_2_unit_price ? item.W3_person_2_unit_price : null,

            W3_person_3_tax: item.W3_person_3_tax ? item.W3_person_3_tax : null,
            W3_person_3_total: item.W3_person_3_total ? item.W3_person_3_total : null,
            W3_person_3_unit_price: item.W3_person_3_unit_price ? item.W3_person_3_unit_price : null,
          }))
          this.setState({
            dataSource: data,
            rowSelect: data.length > 0 ? [data[0]] : [],
            selectedRowKeys: data.length > 0 ? [data[0].id] : [],
            indexTable: 0
          });
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  createOrUpdateData = (record) => {
    const params = {
      ...record,
      Li_TaxClassify: this.state.initValue.Lio_TaxClassify,
      Li_Rounding: this.state.initValue.Rounding,
      Li_Tax: this.state.initValue.Tax,
      W1_insurers_bids: record.W1_insurers_bids || 0,
      W3_office_unit_price: record.W3_office_unit_price || 0,
      W3_other_org_bids: record.W3_other_org_bids || 0,
      W1_person_1_unit_price: record.W1_person_1_unit_price || 0,
      W3_person_2_unit_price: record.W3_person_2_unit_price || 0,
      W3_person_3_unit_price: record.W3_person_3_unit_price || 0,
    }
    saveAndUpdateBatchUpdateProcessAction(params)
      .then(() => {
        // message.success('成功');
        this.loadData(this.state.initValue);
        this.setState({ isChangeValue: false })
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  deleteData = (record, index) => {
    if (record.id && !record.isNew) {
      deleteDataBatchUpdateProcessAction({ id: record.id })
        .then(res => {
          message.success('成功');
          let arrTemp = [...this.state.dataSource];
          arrTemp.splice(index, 1);
          this.setState({ dataSource: arrTemp, isChangeValue: false });
        })
        .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
    } else {
      let arrTemp = [...this.state.dataSource];
      arrTemp.splice(index, 1);
      this.setState({ dataSource: arrTemp, isChangeValue: false });
    }
  }

  LioTaxChange = (params) => {
    params = {
      ...params,
      TaxClassify: 0
    }
    calculatorUpdateProcessAction.LioTaxClassifyChange(params)
      .then(() => 'this.loadData(this.state.initValue)')
      .catch()
  }

  updateBtn = () => {
    calculatorUpdateProcessAction.eventF12({ Lio_TaxClassify: this.state.initValue.Lio_TaxClassify }).then(res => {
      Modal.warning({
        width: 400,
        title: res.data.message,
        okText: "は　い",
        onOk: () => {
          if (this.props.onFinishScreen) this.props.onFinishScreen()
        }
      })
    })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  handleChangeRecord = (record, value, name) => {
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
        rowSelect: objTemp,
        isChangeValue: value ? true : false
      });
    }
  }

  handleChange = (value, name) => {
    if (!this.state.isChangeValue) {
      this.setState({
        initValue: {
          ...this.state.initValue,
          [name]: value
        }
      }, () => {
        this.LioTaxChange(this.state.initValue);
        // setTimeout(() => {
        if (name === 'Rounding' || name === 'Tax') {
          let objTemp = { ...this.state.rowSelect };
          let index = this.state.dataSource.findIndex(item => item.id === objTemp.id);
          this.calculatorTax(null, index, objTemp, null);
        } else {
          let data = [...this.state.dataSource];
          for (let index = 0; index < data.length; index++) {
            this.calculatorTax(null, index, data[index], null);
          }
        }
        // }, 1200);
      })
    } else {
      message.error('情報が保存されていません')
    }
  }

  calculatorTax = (value, index, record, nameForm) => {
    value = Number(value);
    let params = {
      ...record,
      [nameForm]: value,
      Li_TaxClassify: this.state.initValue.Lio_TaxClassify,
      Li_Rounding: this.state.initValue.Rounding,
      Li_Tax: this.state.initValue.Tax,
      Vl4StsTaxCalculate: record.Vl4StsTaxCalculate || 0,
      W3_office_unit_price: record.W3_office_unit_price || 0,
      W3_other_org_bids: record.W3_other_org_bids || 0,
      W1_person_1_unit_price: record.W1_person_1_unit_price || 0,
      W3_person_2_unit_price: record.W3_person_2_unit_price || 0,
      W3_person_3_unit_price: record.W3_person_3_unit_price || 0,
      W1_insurers_bids: record.W1_insurers_bids || 0,
    }
    calculatorUpdateProcessAction.InputChange(params)
      .then(res => {
        let obj = { ...record, ...res.data }
        let arrTemp = [...this.state.dataSource];
        obj = {
          ...obj,
          W3_insurer_total: obj.W3_insurer_total ? obj.W3_insurer_total : null,
          W1_insurers_bids: obj.W1_insurers_bids ? obj.W1_insurers_bids : null,
          W1_insurer_tax: obj.W1_insurer_tax ? obj.W1_insurer_tax : null,

          W3_office_tax: obj.W3_office_tax ? obj.W3_office_tax : null,
          W3_office_total: obj.W3_office_total ? obj.W3_office_total : null,
          W3_office_unit_price: obj.W3_office_unit_price ? obj.W3_office_unit_price : null,

          W3_other_org_bids: obj.W3_other_org_bids ? obj.W3_other_org_bids : null,
          W3_other_org_tax: obj.W3_other_org_tax ? obj.W3_other_org_tax : null,
          W3_other_org_total: obj.W3_other_org_total ? obj.W3_other_org_total : null,

          W3_person_1_tax: obj.W3_person_1_tax ? obj.W3_person_1_tax : null,
          W3_person_1_total: obj.W3_person_1_total ? obj.W3_person_1_total : null,
          W1_person_1_unit_price: obj.W1_person_1_unit_price ? obj.W1_person_1_unit_price : null,

          W3_person_2_tax: obj.W3_person_2_tax ? obj.W3_person_2_tax : null,
          W3_person_2_total: obj.W3_person_2_total ? obj.W3_person_2_total : null,
          W3_person_2_unit_price: obj.W3_person_2_unit_price ? obj.W3_person_2_unit_price : null,

          W3_person_3_tax: obj.W3_person_3_tax ? obj.W3_person_3_tax : null,
          W3_person_3_total: obj.W3_person_3_total ? obj.W3_person_3_total : null,
          W3_person_3_unit_price: obj.W3_person_3_unit_price ? obj.W3_person_3_unit_price : null,
        }
        arrTemp[index] = obj;
        this.setState({
          dataSource: arrTemp,
          rowSelect: obj
        });
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  renderTableColumn = (name1, name2, value1, value2, value3, index, record) => (
    <>
      <Form.Item hidden={this.state.initValue.Lio_TaxClassify !== 2}>
        <InputNumber
          maxLength={7}
          bordered={false}
          min={1}
          value={value1}
          formatter={formatter}
          parser={value => value.replace(',', '')}
          onChange={(value) => this.handleChangeRecord(record, value, [name1])}
          onBlur={(e) => {
            let value = e.target.value ? e.target.value?.replace(',', '') : e.target.value;
            let valueTemp = value ? Number(value) : value;
            if (value1 ? value1 : null !== valueTemp) {
              this.calculatorTax(valueTemp, index, record, [name1]);
            }
          }}
        />
      </Form.Item>
      <Form.Item hidden={this.state.initValue.Lio_TaxClassify === 2}>
        <InputNumber
          maxLength={7}
          bordered={false}
          min={1}
          value={value2}
          formatter={formatter}
          parser={value => value.replace(',', '')}
          onChange={(value) => this.handleChangeRecord(record, value, [name2])}
          onBlur={(e) => {
            let value = e.target.value ? e.target.value?.replace(',', '') : e.target.value;
            let valueTemp = value ? Number(value) : value;
            if (value2 ? value2 : null !== valueTemp) {
              this.calculatorTax(valueTemp, index, record, [name2]);
            }
          }}
        />
      </Form.Item>
      <Space className='cssSpace'>
        <span >(</span>
        <InputNumber bordered={false} readOnly value={value3} formatter={formatter}
          style={{ opacity: value3 !== 0 ? 1 : 0 }} />
        <span >)</span>
      </Space>
    </>
  )

  closeModal = () => {
    this.setState((prevState) => ({
      childModal: { ...prevState.childModal, visible: false },
    }));
  };
  // check selected record while add new
  changeRow(index) {
    this.setState({
      indexTable: index
    });
  }
  // add new record
  async handleAddRowTable() {
    let newRow = {
      id: Math.round(Math.random() * 1000),
      W3_change_type: this.state.initValue.ChangeType,
      isNew: true,
    };
    let data = [...this.state.dataSource];

    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });

    this.forceUpdate();
  }
  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  render() {
    return (
      <div className="batch-update-process">
        <Card title="一括更新処理">
          <Form initialValues={this.state.initValue}>
            <Row gutter={24} className="mb-3">
              <Col span={6}>
                <Form.Item name="ChangeType" label="種別" >
                  <Select onChange={(value) => this.setState({ initValue: { ...this.state.initValue, ChangeType: value } })}>
                    <Select.Option value={10}>コース</Select.Option>
                    <Select.Option value={20}>追　加</Select.Option>
                    <Select.Option value={30}>不　要</Select.Option>
                    <Select.Option value={40}>オプション</Select.Option>
                    <Select.Option value={50}>追加選択</Select.Option>
                    <Select.Option value={60}>不要選択</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="Lio_TaxClassify" label="税区分" >
                  <Select onChange={(value) => this.handleChange(value, 'Lio_TaxClassify')}>
                    <Select.Option value={0}>税指定</Select.Option>
                    <Select.Option value={1}>外税</Select.Option>
                    <Select.Option value={2}>内税</Select.Option>
                    <Select.Option value={3}>非課税</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="Rounding" label="端数" >
                  <Select onChange={(value) => this.handleChange(value, 'Rounding')}>
                    <Select.Option value={0}>四捨五入</Select.Option>
                    <Select.Option value={1}>切捨</Select.Option>
                    <Select.Option value={2}>切上</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="Tax" label="税率" >
                  <InputNumber min={0} max={9.99} maxLength={4} step='9.99' stringMode
                    onChange={(value) => this.handleChange(value, 'Tax')}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Table
              className="mt-3 mb-3"
              size='small'
              bordered
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
              rowKey={(record) => record.id}
              rowSelection={{
                type: 'radio',
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows) => {
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  this.setState({
                    rowSelected: selectedRows,
                    selectedRowKeys: selectedRows.map(x => x.id),
                    indexTable: index
                  });
                  this.changeRow(index)
                },
              }}
            >
              <Table.Column title="種　別" width={120} render={(text, record, index) => (
                <Form.Item>
                  <Select
                    value={record.W3_change_type}
                    disabled={record.W3_set_inspect_cod}
                    onChange={(value) => this.handleChangeRecord(record, value, 'W3_change_type')}
                  >
                    <Select.Option value={10}>コース</Select.Option>
                    <Select.Option value={20}>追　加</Select.Option>
                    <Select.Option value={30}>不　要</Select.Option>
                    <Select.Option value={40}>オプション</Select.Option>
                    <Select.Option value={50}>追加選択</Select.Option>
                    <Select.Option value={60}>不要選択</Select.Option>
                  </Select>
                </Form.Item>
              )} />
              <Table.Column width={40} align='center' render={(text, record, index) => (
                <Form.Item name='Expression_44'>
                  <img src={GetImage(record.W3_change_type)} alt='icon' />
                </Form.Item>
              )} />
              <Table.Column title="ｺｰﾄﾞ" render={(text, record, index) => (
                <Space className='cssSpaceLeft'>
                  <Form.Item >
                    <Input
                      value={record.W3_set_inspect_cd}
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1000,
                            component: (<WS0302001_SetInfoSearch
                              onFinishScreen={({ Lo_SetCode, recordData }) => {
                                let data = [...this.state.dataSource]
                                record = {
                                  ...record,
                                  W3_set_inspect_cd: Lo_SetCode,
                                  set_short_name: recordData.set_short_name,
                                }
                                data[index] = record;
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                  dataSource: data,
                                  rowSelect: record
                                });
                                this.createOrUpdateData(record);
                              }}
                            />),
                          },
                        })
                      }} />
                  </Form.Item>
                  <Form.Item name='set_short_name' >
                    <div>{record.set_short_name}</div>
                  </Form.Item>
                </Space>
              )} />
              <Table.Column title="保険者" width={120} render={(text, record, index) => (
                this.renderTableColumn(
                  'W3_insurer_total',
                  'W1_insurers_bids',
                  record.W3_insurer_total,
                  record.W1_insurers_bids,
                  record.W1_insurer_tax,
                  index,
                  record
                )
              )} />
              <Table.Column title="事業所" width={120} render={(text, record, index) => (
                this.renderTableColumn(
                  'W3_office_total',
                  'W3_office_unit_price',
                  record.W3_office_total,
                  record.W3_office_unit_price,
                  record.W3_office_tax,
                  index,
                  record
                )
              )} />
              <Table.Column title="他団体" width={120} render={(text, record, index) => (
                this.renderTableColumn(
                  'W3_other_org_total',
                  'W3_other_org_bids',
                  record.W3_other_org_total,
                  record.W3_other_org_bids,
                  record.W3_other_org_tax,
                  index,
                  record
                )
              )} />
              <Table.Column title="個人1" width={120} render={(text, record, index) => (
                this.renderTableColumn(
                  'W3_person_1_total',
                  'W1_person_1_unit_price',
                  record.W3_person_1_total,
                  record.W1_person_1_unit_price,
                  record.W3_person_1_tax,
                  index,
                  record
                )
              )} />
              <Table.Column title="個人2" width={120} render={(text, record, index) => (
                this.renderTableColumn(
                  'W3_person_2_total',
                  'W3_person_2_unit_price',
                  record.W3_person_2_total,
                  record.W3_person_2_unit_price,
                  record.W3_person_2_tax,
                  index,
                  record
                )
              )} />
              <Table.Column title="個人3" width={120} render={(text, record, index) => (
                this.renderTableColumn(
                  'W3_person_3_total',
                  'W3_person_3_unit_price',
                  record.W3_person_3_total,
                  record.W3_person_3_unit_price,
                  record.W3_person_3_tax,
                  index,
                  record
                )
              )} />
              <Table.Column title="合計" width={150} render={(text, record, index) => (
                <Form.Item>
                  <InputNumber bordered={false} readOnly value={record.SetSum} formatter={formatter}
                    style={{ opacity: record.SetSum !== 0 ? 1 : 0 }} />
                </Form.Item>
              )} />
              <Table.Column align='center' width={70}
                title={() => (
                  <Button size='small' type='primary' icon={<PlusOutlined />}
                    onClick={() => {
                      console.log(this.state.indexTable)
                      if (!this.state.isChangeValue) {
                        this.handleAddRowTable()
                      } else {
                        message.error('情報が保存されていません')
                      }
                    }}
                  />
                )}
                render={(text, record, index) => (
                  <>
                    <Button hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)} size='small' style={{ border: 'none', }}
                      icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.createOrUpdateData(record)}
                    />
                    <Button hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)} size='small' style={{ border: 'none', }}
                      danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.deleteData(record, index)
                        })
                      }}
                    />
                  </>
                )}
              />
            </Table>

            <Form.Item style={{ float: "right" }}>
              <Button type="primary" onClick={() => {
                ModalConfirm({
                  content: 'この内容を契約にー括で追加しますか？',
                  icon: <ExclamationCircleOutlined />,
                  onOk: () => {
                    this.updateBtn();
                  }
                })
              }}>更　新</Button>
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0331019_BatchUpdateProcess);
