import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";
import { Button, Card, Form, Radio, Table, Modal, Input, Space, message } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx'
import InspectConditionSettingAction from "redux/AdvancePreparation/DocumentManageMaintain/InspectConditionSetting.action";

const styleLabel = {
  background: '#1890ff',
  color: '#fff',
  padding: '5px 10px',
  width: '65px',
  marginRight: '10px',
  float: 'left'
}
class WS0641021_InspectConditionSetting extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_InspectCondition: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '検査条件設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataSource: [],
      isLoadingTable: false,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
      old_W1_inspect_cd: null,
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }

  getScreenData() {
    this.setState({ isLoadingTable: true })
    let params = {
      W1_condition: this.props.Lio_InspectCondition
    }

    InspectConditionSettingAction.getScreenData(params)
      .then((res) => {
        this.getDataTable();

        let radioValue = 'NOT';
        if (this.props.Lio_InspectCondition.includes('OR')) {
          radioValue = 'OR';
        } else {
          if (this.props.Lio_InspectCondition.includes('AND')) {
            radioValue = 'AND';
          } else {
            radioValue = 'NOT';
          }
        }

        this.formRef.current.setFieldsValue({ Division: radioValue });
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  getDataTable() {
    this.setState({ isLoadingTable: true })

    InspectConditionSettingAction.getDataTable()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          indexTable: 0,
          old_W1_inspect_cd: res && res.length > 0 ? res[0].W1_inspect_cd : null,
        });
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateData(index) {
    let params = { ...this.state.dataSource[index] }
    if (this.checkDuplicateCode()) {
      message.warning('ｺｰﾄﾞ 複製 !!');
    } else {
      InspectConditionSettingAction.createAndUpdateData(params)
        .then((res) => {
          message.success('更新しました。!')
          this.getDataTable();
        })
    }
  }

  deleteData(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: "は　い",
      cancelText: "いいえ",
      onOk: () => {
        InspectConditionSettingAction.deleteData(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataTable();
          })
          .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error("エラーが発生しました");
              return;
            }
            message.error(res.data.message);
          });
      }
    })
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];
    const uniqueValues = new Set(lstData.map(v => v.W1_inspect_cd));

    if (uniqueValues.size < lstData.length) {
      return true;
    } return false;
  }

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.W1_inspect_cd);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkAddItem() || this.checkIdTemp(this.state.rowSelected[0].id) ||
        (!this.checkIdTemp(this.state.rowSelected[0].id) &&
          this.state.rowSelected[0].W1_inspect_cd !== this.state.old_W1_inspect_cd)) {
        return true;
      } return false;
    } return false;
  }

  // add new record
  async handleAddRowTable() {
    let newRow = { id: '' };

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

  // check selected record while add new
  changeRow(index) {
    let data = [...this.state.dataSource];

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      this.setState({
        rowSelected: [data[0]],
        selectedRowKeys: [data[0].id],
        indexTable: 0
      });
    } else {
      this.setState({
        indexTable: index
      });
    }
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

  async handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    await data.splice(0, 1);
    await this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : [],
      old_W1_inspect_cd: data.length > 0 ? data[0].W1_inspect_cd : null
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

  onFinish(values) {

  }

  resultData() {
    let data = this.state.dataSource.map(x => x.W1_inspect_cd?.toString().padStart(8, '0'))
    this.props.onFinishScreen({
      datas: data,
      Division: this.formRef.current?.getFieldValue('Division')
    });
  }

  render() {
    return (
      <div className="inspect-condition-setting">
        <Card title="検査条件設定">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ Division: 'NOT' }}
          >
            <Space className='mb-3'>
              <div style={styleLabel}>区　分</div>
              <Form.Item name="Division" style={{ marginBottom: 0 }}>
                <Radio.Group  >
                  <Radio value={'NOT'}>NOT</Radio>
                  <Radio value={'OR'}>OR</Radio>
                  <Radio value={'AND'}>AND</Radio>
                </Radio.Group>
              </Form.Item>
            </Space>
          </Form>

          <Table
            size='small'
            style={{ cursor: 'pointer' }}
            rowClassName={(record, index) => record.id === this.state.rowSelected[0]?.id ? 'table-row-light' : ''}
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            bordered
            rowKey={(record) => record.id}
            scroll={{ x: 400, y: 700 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: async () => {
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  await this.setState({
                    rowSelected: [record],
                    selectedRowKeys: [record.id],
                    indexTable: index,
                    old_W1_inspect_cd: record.W1_inspect_cd
                  });
                  this.changeRow(index)
                }
              };
            }}
          >
            <Table.Column title="ｺｰﾄﾞ" dataIndex="W1_inspect_cd" width={180}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div style={{ paddingRight: 40, textAlign: 'right' }}>{value}</div>
                      :
                      <Input.Search value={record.W1_inspect_cd} maxLength={3} readOnly
                        style={{ textAlign: 'right' }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (
                                <WS0271001_InspectItemSearchQuerySingle
                                  Lio_InspectItemCode={record.W1_inspect_cd}
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "W1_inspect_cd", output.recordData.test_item_code)
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_name", output.recordData.exam_name)
                                    this.closeModal();
                                  }}
                                />),
                            },
                          })
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="名称" dataIndex="exam_name" />
            <Table.Column width={70}
              title={
                <div style={{ textAlign: "center" }}>
                  <Button size='small'
                    disabled={this.checkDisabledBtnAdd()}
                    onClick={this.handleAddRowTable}
                    type="primary" icon={<PlusOutlined />}>
                  </Button>
                </div>
              }
              render={(text, record, index) => {
                return <div style={{ textAlign: "center" }}
                  hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                >
                  <Button size='small'
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem()
                      || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].W1_inspect_cd)}
                    onClick={() => { this.createAndUpdateData(this.findIndexByID(this.state.dataSource, record.id)) }}
                    style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                    icon={<SaveOutlined />} >
                  </Button>
                  <Button size='small' style={{ border: 'none' }}
                    onClick={() => {
                      this.checkIdTemp(record.id) ? this.handleDeleteRowTable() : this.deleteData(record.id)
                    }}
                    danger
                    icon={<DeleteOutlined />}
                  >
                  </Button>
                </div>;
              }}
            />
          </Table>
          <hr />
          <div style={{ marginTop: 15, textAlign: "right" }}>
            <Button type="primary"
              disabled={this.checkDisabledBtnAdd()}
              onClick={() => {
                this.resultData()

              }}>閉じる
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0641021_InspectConditionSetting);
