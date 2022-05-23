import React from 'react';
import { connect } from "react-redux";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Tabs, Form, Input, Card, Col, Row, Table, Button, message, Checkbox, Modal, Tooltip } from 'antd';

import PassingManageSettingsAction from "redux/Others/PassingManageSettings/PassingManageSettings.action";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx";

const tableColumns = {
  0: [
    { title: '通過番号', dataIndex: 'passing_number', width: 200, type: 'input', maxLength: 10 },
    { title: '略名', dataIndex: 'passing_informal_name', width: null, type: 'input', maxLength: 10 },
    { title: '正式', dataIndex: 'passing_official_name', width: null, type: 'input', maxLength: 30 },
    { title: '表示順', dataIndex: 'display_order', width: 80, type: 'input', textAlign: 'right' },
    { title: '一括', dataIndex: 'once_completed', width: 60, type: 'checkbox' },
    { title: '有効', dataIndex: 'enabled_disabled', width: 60, type: 'checkbox' },
    // { title: 'ME機器', dataIndex: 'passingitem_', width: null, type: 'input' },
    { title: '', dataIndex: '', width: 110, type: 'event' },
  ],
  1: [
    { title: '端末番号', dataIndex: 'terminal_num', width: 200, type: 'input', maxLength: 10 },
    { title: '略名', dataIndex: 'terminal_informal_name', width: null, type: 'input', maxLength: 10 },
    { title: '正式', dataIndex: 'terminal_official_name', width: null, type: 'input', maxLength: 30 },
    { title: '表示順', dataIndex: 'display_order', width: 80, type: 'input' },
    { title: '同時', dataIndex: 'simultaneous_act', width: 60, type: 'checkbox' },
    { title: '有効', dataIndex: 'enabled_disabled', width: 60, type: 'checkbox' },
    { title: '', dataIndex: '', width: 110, type: 'event' },
  ],
  2: [
    { title: '通過番号', dataIndex: 'passing_number', width: 200, type: 'input', maxLength: 10 },
    { title: '通過名称', dataIndex: 'passing_official_name', width: null, type: 'label' },
    { title: '健診検査', dataIndex: 'exam_item_code', width: 200, type: 'input', maxLength: 10 },
    { title: '検査名称', dataIndex: 'exam_name', width: null, type: 'label' },
    { title: '', dataIndex: '', width: 110, type: 'event' },
  ],
  3: [
    { title: '端末番号', dataIndex: 'terminal_num', width: 200, type: 'input', maxLength: 10 },
    { title: '端末名称', dataIndex: 'terminal_official_name', width: null, type: 'label' },
    { title: '通過番号', dataIndex: 'passing_num', width: 200, type: 'input', maxLength: 10 },
    { title: '検査名称', dataIndex: 'passing_official_name', width: null, type: 'label' },
    { title: '表示順', dataIndex: 'display_order', width: 80, type: 'input' },
    { title: '管理', dataIndex: 'passing_manage', width: 60, type: 'checkbox' },
    { title: '', dataIndex: '', width: 110, type: 'event' },
  ]
}

class WS3062001_PassingManageSettings extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    document.title = '通過管理設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      optionRemark: '',

      selectedRow: {},
      selectedRowKeys: [],
      selectedRowIndex: 0,

      isLoadingTable: true,

      isEdit: false,
      tabNum: 0,
    };
    this.onChangeTab = this.onChangeTab.bind(this);
    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getTabData(this.state.tabNum)
  }

  componentDidUpdate(prevProps) {
  }

  async onChangeTab(key) {
    const index = Number(key);
    this.setState({
      tabNum: index,
      dataSource: [],
      selectedRow: {},
      selectedRowKeys: [],
      selectedRowIndex: 0,
      optionRemark: ''
    });

    this.formRef.current?.setFieldsValue({
      dataTable: [],
    });

    await this.getTabData(index);
  }

  getTabData(tabNum) {
    this.setState({ isLoadingTable: true })

    switch (tabNum) {
      case 0:
        this.getPassingItemList()
        break;
      case 1:
        this.getTerminalEntryList()
        break;
      case 2:
        this.getPassingMedicalExamList()
        break;
      case 3:
        this.getTerminalPassingList()
        break;
      default:
    }
  }

  getPassingItemList() {
    PassingManageSettingsAction.getPassingItemList()
      .then((res) => {
        if (res) {
          const index = this.state.selectedRowIndex;
          const data = this.setDataCopyAddIsSave(res, index);
          const key = this.getTableRowValue(data, 'id', index);
          const option = this.getTableRowValue(data, 'option_remark', index);

          this.setState({
            dataSource: data,
            selectedRowKeys: key,
            optionRemark: option
          });
          this.formRef.current.setFieldsValue({
            dataTable: data,
          });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }));
  }

  getTerminalEntryList() {
    PassingManageSettingsAction.getTerminalEntryList()
      .then((res) => {
        if (res) {
          const index = this.state.selectedRowIndex;
          const data = this.setDataCopyAddIsSave(res, index);
          const key = this.getTableRowValue(data, 'id', index)
          const option = this.getTableRowValue(data, 'option', index)

          this.setState({
            dataSource: data,
            selectedRowKeys: key,
            optionRemark: option,
          });
          this.formRef.current.setFieldsValue({
            dataTable: data,
          });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  getPassingMedicalExamList() {
    PassingManageSettingsAction.getPassingMedicalExamList()
      .then((res) => {
        if (res) {
          const index = this.state.selectedRowIndex;
          const data = this.setDataCopyAddIsSave(res, index);
          const key = this.getTableRowValue(data, 'id', index);
          const option = this.getTableRowValue(data, 'option_remark', index);

          this.setState({
            dataSource: data,
            selectedRowKeys: key,
            optionRemark: option,
          });
          this.formRef.current.setFieldsValue({
            dataTable: data,
          });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  getTerminalPassingList() {
    PassingManageSettingsAction.getTerminalPassingList()
      .then((res) => {
        if (res) {
          const index = this.state.selectedRowIndex;
          const data = this.setDataCopyAddIsSave(res, index);
          const key = this.getTableRowValue(data, 'id', index);

          this.setState({
            dataSource: data,
            selectedRowKeys: key
          });
          this.formRef.current.setFieldsValue({
            dataTable: data,
          });
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  setDataCopyAddIsSave(data, index) {
    let dataCopy = [...data]
    const tabNum = this.state.tabNum;
    if (dataCopy && dataCopy.length > 0) {
      dataCopy.forEach(element => {
        element.isSave = true;
        element.tabNum = tabNum;
      });
      dataCopy[index].isSave = false;
    }

    return dataCopy;
  }

  getTableRowValue(data, keyName, index) {
    const value = (data.length > 0) ? [data[index][keyName]] : ''
    return value;
  }

  onChangeSelectRow(selectedRowKeys, selectedRows) {
    const selectedRow = (selectedRows.length > 0) ? selectedRows[0] : {}
    let optionValue = ''
    switch (this.state.tabNum) {
      case 0:
      case 2:
        optionValue = selectedRow.option_remark;
        break;
      case 1:
        optionValue = selectedRow.option;
        break;
      default:
    }
    this.setState({
      selectedRowKeys: selectedRowKeys,
      optionRemark: optionValue
    });

    let data = [...this.state.dataSource];
    let index = data.findIndex(x => x.id === selectedRowKeys[0])

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      this.setState({
        dataSource: data,
        rowSelect: [data[data.length - 1]],
        selectedRowKey: [data[data.length - 1].id],
        selectedRowIndex: data.length - 1
      });
    } else {
      data.forEach(element => {
        element.isSave = true;
      });

      data[index].isSave = false;

      this.setState({
        dataSource: data,
        selectedRowIndex: index
      })
    }

    this.formRef.current?.setFieldsValue({
      dataTable: data,
    });
  }

  updateDatasource(index, field, value) {
  //   let test= value.replace( /[Ａ-Ｚ０-９]/g, function(s) {
  //     return String.fromCharCode(s.charCodeAt(0) - 65248);
  // });
  // console.log(test);
  let data = [...this.state.dataSource];
    data[index][field] = value;
    this.setState({
      dataSource: data,
    });
    this.formRef.current?.setFieldsValue({
      dataTable: data,
    });
  }

  updateDatasourceCheckBox(index, field, value) {
    let data = [...this.state.dataSource];
    data[index][field] = value ? 1 : 0;

    this.setState({
      dataSource: data,
    });
    this.formRef.current?.setFieldsValue({
      dataTable: data,
    });
  }

  updateDatasourceOption(tabNum, value) {
    let optionField = ''
    switch (tabNum) {
      case 0:
      case 2:
        optionField = 'option_remark';
        break;
      case 1:
        optionField = 'option';
        break;
      default:
    }
    if (optionField === '') return;

    let data = [...this.state.dataSource];
    const index = this.state.selectedRowIndex;

    data[index][optionField] = value;

    this.setState({
      dataSource: data,
      optionRemark: value,
    });
  }

  async handleAddRowTable() {
    let newRow = {
      isSave: false,
      id: '',
    };

    let data = [...this.state.dataSource];

    data.push(newRow);

    this.formRef.current?.setFieldsValue({
      dataTable: data,
    });

    await this.setState({
      dataSource: data,
    });

    let dataCopy = [...data];

    if (dataCopy.length > 0) {
      for (let i = 0; i < dataCopy.length - 1; i++) {
        dataCopy[i].isSave = true;
      }

      this.setState({
        dataSource: dataCopy
      })
      this.formRef.current?.setFieldsValue({
        dataTable: dataCopy,
      });
    }

    let index = this.state.dataSource.findIndex(x => x.id === newRow.id);
    this.setState({
      indexTable: index,
      selectedRowKeys: [newRow],
      selectedRowKey: [newRow.id],
    })

    this.forceUpdate();
  }

  handleDeleteRowTable(index) {

    let data = [...this.state.dataSource];

    data.splice(index, 1);

    this.formRef.current.getFieldValue("dataTable").splice(index, 1);

    this.setState({
      dataSource: data,
    });

    let dataCopy = [...data];
    if (dataCopy.length > 0) {
      dataCopy[0].isSave = false;
      for (let i = dataCopy.length - 1; i > 0; i--) {
        dataCopy[i].isSave = true;
      }

      this.setState({
        dataSource: dataCopy,
        indexTable: 0,
        selectedRowKeys: [dataCopy[0]],
        selectedRowKey: [dataCopy[0].id]
      })
      this.formRef.current?.setFieldsValue({
        dataTable: dataCopy,
      });
    }
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {

      let index = -1
      switch (this.state.tabNum) {
        case 0:
          index = this.state.dataSource.findIndex(x => !x.passing_number || !x.passing_informal_name || !x.passing_official_name);
          break;
        case 1:
          index = this.state.dataSource.findIndex(x => !x.terminal_num || !x.terminal_informal_name || !x.terminal_official_name);
          break;
        case 2:
          index = this.state.dataSource.findIndex(x => !x.passing_number || !x.exam_item_code);
          break;
        case 3:
          index = this.state.dataSource.findIndex(x => !x.terminal_num || !x.passing_num);
          break;
        default:
      }
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];

    let uniqueValues = 0
    switch (this.state.tabNum) {
      case 0:
        uniqueValues = new Set(lstData.map(v => v.passing_number));
        break;
      case 1:
        uniqueValues = new Set(lstData.map(v => v.terminal_num));
        break;
      case 2:
        uniqueValues = new Set(lstData.map(v => v.passing_number + String(v.exam_item_code)));
        break;
      case 3:
        uniqueValues = new Set(lstData.map(v => v.passing_num + v.terminal_num));
        break;
      default:
    }

    const uniqueIds = new Set(lstData.map(v => v.id));

    if (uniqueIds.size < lstData.length || uniqueValues.size < lstData.length) {
      return true;
    }
    return false;
  }

  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  saveRecord(index) {
    this.setState({ isLoadingTable: true });

    let params = this.formRef.current.getFieldValue("dataTable")[index];

    switch (this.state.tabNum) {
      case 0:
        this.savePassingItemList(params);
        break;
      case 1:
        this.saveTerminalEntryList(params);
        break;
      case 2:
        this.savePassingMedicalExamList(params);
        break;
      case 3:
        this.saveTerminalPassingList(params);
        break;
      default:
    }
  }

  savePassingItemList(params) {
    PassingManageSettingsAction.savePassingItemList(params)
      .then((res) => {
        this.getTabData(this.state.tabNum)
        message.success('更新しました。');
      })
      .catch((err) => {
        message.error(err.response.data.message);
        this.setState({ isLoadingTable: false });
      })
  }

  saveTerminalEntryList(params) {
    PassingManageSettingsAction.saveTerminalEntryList(params)
      .then((res) => {
        this.getTabData(this.state.tabNum)
        message.success('更新しました。');
      })
      .catch((err) => {
        message.error(err.response.data.message);
        this.setState({ isLoadingTable: false });
      })
  }

  savePassingMedicalExamList(params) {
    PassingManageSettingsAction.savePassingMedicalExamList(params)
      .then((res) => {
        this.getTabData(this.state.tabNum)
        message.success('更新しました。');
      })
      .catch((err) => {
        message.error(err.response.data.message);
        this.setState({ isLoadingTable: false });
      })
  }

  saveTerminalPassingList(params) {
    PassingManageSettingsAction.saveTerminalPassingList(params)
      .then((res) => {
        this.getTabData(this.state.tabNum)
        message.success('更新しました。');
      })
      .catch((err) => {
        message.error(err.response.data.message);
        this.setState({ isLoadingTable: false });
      })
  }

  deleteRecord(id) {
    let params = {
      id: id,
    };
    Modal.confirm({
      width: "250px",
      title: "削除を行いますか？",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        this.setState({ isLoadingTable: true, selectedRowIndex: 0 });

        switch (this.state.tabNum) {
          case 0:
            this.deletePassingItemList(params);
            break;
          case 1:
            this.deleteTerminalEntryList(params);
            break;
          case 2:
            this.deletePassingMedicalExamList(params);
            break;
          case 3:
            this.deleteTerminalPassingList(params);
            break;
          default:
        }
      },
    });
  }

  deletePassingItemList(params) {
    PassingManageSettingsAction.deletePassingItemList(params)
      .then((res) => {
        this.getTabData(this.state.tabNum);
        message.success('正常に削除されました');
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(err.response.data.message);
      })
  }

  deleteTerminalEntryList(params) {
    PassingManageSettingsAction.deleteTerminalEntryList(params)
      .then((res) => {
        this.getTabData(this.state.tabNum)
        message.success('正常に削除されました');
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(err.response.data.message);
      })
  }

  deletePassingMedicalExamList(params) {
    PassingManageSettingsAction.deletePassingMedicalExamList(params)
      .then((res) => {
        this.getTabData(this.state.tabNum)
        message.success('正常に削除されました');
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(err.response.data.message);
      })
  }

  deleteTerminalPassingList(params) {
    PassingManageSettingsAction.deleteTerminalPassingList(params)
      .then((res) => {
        this.getTabData(this.state.tabNum)
        message.success('正常に削除されました');
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(err.response.data.message);
      })
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }
  onFinish(){
    
  }

  renderColumnTable = (val, rowIndex, tabNum) => {
    const columnKey = `${val.dataIndex}_${tabNum}_${rowIndex}`;

    switch (val.type) {
      case 'input':
        return (
          <Table.Column
            title={val.title}
            dataIndex={val.dataIndex}
            width={val.width}
            key={columnKey}
            // sorter={(a, b) => a[val.dataIndex] - b[val.dataIndex]}
            render={(value, record, index) => {
              return (
                <Form.Item name={["dataTable", index, val.dataIndex]} style={{ marginBottom: "0" }}
                  rules={[
                    {
                      required: true,
                      pattern: (val.dataIndex === 'display_order' || val.dataIndex === 'passing_number' || val.dataIndex === 'passing_num' || val.dataIndex === 'exam_item_code') ? /^[\d]+$/ : '',
                      message: "入力値が正しくありません"
                    },
                  ]}>
                  <Input style={{ border: 'none', textAlign: (val.dataIndex === 'display_order' || val.dataIndex === 'exam_item_code') ? 'right' : '' }} maxLength={val.maxLength}
                    onChange={(e) => { this.updateDatasource(index, val.dataIndex, e.target.value) }}
                    onDoubleClick={() => {
                      if (val.dataIndex === 'exam_item_code') {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: "60%",
                            component: (
                              <WS0271001_InspectItemSearchQuerySingle
                                onFinishScreen={(event) => {
                                  this.updateDatasource(index, val.dataIndex, event.Lio_InspectItemCode)
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }
                    }} 
                    onKeyUp={this.onFinish()}
                    />
                </Form.Item>
              )
            }}
          />
        )
      case 'checkbox':
        return (
          <Table.Column
            title={val.title}
            dataIndex={val.dataIndex}
            width={val.width}
            key={columnKey}
            // sorter={true}
            render={(value, record, index) => {
              return (
                <div style={{ textAlign: 'center' }}>
                  <Form.Item name={["dataTable", index, val.dataIndex]} valuePropName="checked">
                    <Checkbox onChange={(e) => { this.updateDatasourceCheckBox(index, val.dataIndex, e.target.checked) }} />
                  </Form.Item>
                </div>
              )
            }}
          />
        )
      case 'label':
        return (
          <Table.Column
            title={val.title}
            dataIndex={val.dataIndex}
            width={val.width}
            key={columnKey} />
        )
      case 'event':
        return (
          <Table.Column
            key={`event_${tabNum}_${rowIndex}`}
            width={110}
            fixed={'right'}
            title={
              <div style={{ textAlign: "center" }}>
                <Tooltip placement="topLeft" title={'追加'}>
                  <Button
                    disabled={this.checkAddItem() || this.checkDuplicateCode() || (this.state.selectedRowKeys.length > 0 && this.checkIdTemp(this.state.selectedRowKeys[0]))}
                    onClick={this.handleAddRowTable}
                    type="primary" icon={<PlusOutlined />}>
                  </Button>
                </Tooltip>
              </div>
            }
            render={(text, record, index) => {
              return (
                <div style={{ textAlign: "center" }}>
                  <Tooltip placement="topLeft" title={'更新'}>
                    <Button
                      hidden={record.isSave || this.checkAddItem() || this.checkDuplicateCode()}
                      onClick={() => { this.saveRecord(index) }}
                      style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                      icon={<SaveOutlined />} >
                    </Button>
                  </Tooltip>
                  <Tooltip placement="topLeft" title={'削除'}>
                    <Button style={{ border: 'none' }}
                      onClick={() => this.checkIdTemp(record.id) ? this.handleDeleteRowTable(index) : this.deleteRecord(record.id)}
                      danger
                      icon={<DeleteOutlined />}
                    >
                    </Button>
                  </Tooltip>
                </div>
              )
            }}
          />
        )
      default:
        return null
    }
  }

  renderBodyTab = (tabNum) => {
    return (
      <Row gutter={15}>
        <Col span={24}>
          <Table
            size="small"
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: this.state.selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                this.onChangeSelectRow(selectedRowKeys, selectedRows);
              }
            }}
          >
            {tableColumns[tabNum].map((val, index) => this.renderColumnTable(val, index, tabNum))}
          </Table>

        </Col>
        <Col span={24}>
          <Input value={this.state.optionRemark} type="text" hidden={tabNum === 3}
            style={{ marginTop: "15px" }} disabled={this.state.isLoadingTable}
            onChange={(e) => { this.updateDatasourceOption(tabNum, e.target.value) }}
          />
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <div className="passing-manage-settings">
        <Card title="通過管理設定">
          <Form ref={this.formRef}>
            <Tabs
              type="card"
              defaultActiveKey={this.state.tabNum}
              onChange={this.onChangeTab}
            >
              <Tabs.TabPane tab="通過項目" key={0} disabled={this.state.isLoadingTable}>
                {this.renderBodyTab(0)}
              </Tabs.TabPane>
              <Tabs.TabPane tab="端末項目" key={1} disabled={this.state.isLoadingTable}>
                {this.renderBodyTab(1)}
              </Tabs.TabPane>
              <Tabs.TabPane tab="健診変換" key={2} disabled={this.state.isLoadingTable}>
                {this.renderBodyTab(2)}
              </Tabs.TabPane>
              <Tabs.TabPane tab="端末変換" key={3} disabled={this.state.isLoadingTable}>
                {this.renderBodyTab(3)}
              </Tabs.TabPane>
            </Tabs>
          </Form>
        </Card>
        <Modal
          footer={null}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          bodyStyle={{ margin: 0, padding: 0 }}
          destroyOnClose={true}
          maskClosable={false}
          onCancel={() => {
            this.closeModal();
          }}
        >
          {this.state.childModal.component}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS3062001_PassingManageSettings);
