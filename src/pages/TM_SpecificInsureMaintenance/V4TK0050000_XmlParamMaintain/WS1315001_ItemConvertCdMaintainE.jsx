import React from "react";
import { connect } from "react-redux";

import { Card, Table, Modal, message, Button, Input, InputNumber } from "antd";
import ItemConvertCdMaintainEAction from "redux/SpecificInsureMaintenance/XmlParamMaintain/ItemConvertCdMaintainE.action";
import WS1315003_ItemCheckupsForXml from 'pages/TM_SpecificInsureMaintenance/V4TK0050000_XmlParamMaintain/WS1315003_ItemCheckupsForXml.jsx';
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1315001_ItemConvertCdMaintainE extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TKTH0001:項目変換CD保守(保)';

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
      old_insure_guide_code: null
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getScreenData();
  }

  getScreenData() {
    this.setState({ isLoadingTable: true })
    ItemConvertCdMaintainEAction.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          indexTable: 0,
          old_insure_guide_code: res && res.length > 0 ? res[0].insure_guide_code : null
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateData(index) {
    let params = { ...this.state.dataSource[index] }
    ItemConvertCdMaintainEAction.createAndUpdateData(params)
      .then((res) => {
        message.success('更新しました。!')
        this.getScreenData();
      })
  }

  deleteData(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        ItemConvertCdMaintainEAction.deleteData(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getScreenData();
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

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.insure_guide_code);
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
          this.state.rowSelected[0].insure_guide_code !== this.state.old_insure_guide_code)) {
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

  handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    data.splice(0, 1);
    this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : [],
      old_insure_guide_code: data.length > 0 ? data[0].insure_guide_code : null
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


  render() {
    return (
      <div className="item-convert-cd-maintain-e">
        <Card title="V4-TKTH0001:項目変換CD保守(保)">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            rowKey={(record) => record.id}
            scroll={{ x: 1000 }}
            rowSelection={{
              type: "radio",
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                let index = this.state.dataSource.findIndex(x => x.id === record.id)
                this.setState({
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                  indexTable: index,
                  old_insure_guide_code: record.insure_guide_code
                });
                this.changeRow(index)
              },
            }}
          >
            <Table.Column title="VENUSｺｰﾄﾞ" dataIndex="insure_guide_code" width={100}
              render={(value, record, index) => {
                return (
                  <InputNumber value={record.insure_guide_code} maxLength={4}
                    readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                    onChange={(value) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "insure_guide_code", value)
                    }}
                    style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '', }}
                  />
                )
              }}
            />
            <Table.Column title="項目コード" dataIndex="item_code_jlac10_15" width={170}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <Input value={record.item_code_jlac10_15} readOnly
                        style={{ border: 'none', background: 'transparent' }}
                      />
                      :
                      <Input.Search value={record.item_code_jlac10_15} maxLength={15} readOnly
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (
                                <WS1315003_ItemCheckupsForXml
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "item_code_jlac10_15", output.recordData.item_code_jlac10_15);
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "ministry_item_name", output.recordData.ministry_item_name);

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
            <Table.Column title="結果識別" dataIndex="result_identification_jlac10_2" width={80}
              render={(value, record, index) => {
                return (
                  <Input value={record.result_identification_jlac10_2} maxLength={2}
                    readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                    onChange={(event) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "result_identification_jlac10_2", event.target.value)
                    }}
                    style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '', }}
                  />
                )
              }}
            />
            <Table.Column title="検査ﾀｲﾌﾟ" dataIndex="InspectType" width={80} />
            <Table.Column title="検査略名" dataIndex="InspectInformal" width={100} />
            <Table.Column title="検査名称" dataIndex="InspectFormal" />
            <Table.Column title="厚労省項目名" dataIndex="ministry_item_name" />
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
                return <div style={{ textAlign: "center" }}>
                  <Button size='small'
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].insure_guide_code)}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1315001_ItemConvertCdMaintainE);
