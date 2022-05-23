import React from "react";
import { connect } from "react-redux";

import { Card, message, Table, Modal, Input, Button } from "antd";
import XmlInspectValueConvertEMAction from "redux/SpecificInsureMaintenance/XmlParamMaintain/XmlInspectValueConvertEM.action";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

class WS1312001_XmlInspectValueConvertEM extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TKTH0020:XML検査値変換(保)M';

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
      old_exam_code: null
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getScreenData();
  }

  getScreenData() {
    this.setState({ isLoadingTable: true })
    XmlInspectValueConvertEMAction.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          indexTable: 0,
          old_exam_code: res && res.length > 0 ? res[0].exam_code : null
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateData(index) {
    let params = { ...this.state.dataSource[index] }
    XmlInspectValueConvertEMAction.createAndUpdateData(params)
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
        XmlInspectValueConvertEMAction.deleteData(params)
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
      let index = this.state.dataSource.findIndex(x => !x.exam_code);
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
          this.state.rowSelected[0].exam_code !== this.state.old_exam_code)) {
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
        selectedRows: [data[0]],
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
      old_exam_code: data.length > 0 ? data[0].exam_code : null
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
      <div className="xml-inspect-value-convert-em">
        <Card title="V4-TKTH0020:XML検査値変換(保)M">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            rowKey={(record) => record.id}
            rowSelection={{
              type: "radio",
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                let index = this.state.dataSource.findIndex(x => x.id === record.id)
                this.setState({
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                  indexTable: index,
                  old_exam_code: record.exam_code
                });
                this.changeRow(index)
              },
            }}
          >
            <Table.Column title="検査" dataIndex="exam_code"
              render={(value, record, index) => {
                return (
                  <Input value={record.exam_code}
                    readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                    onChange={(event) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_code", event.target.value)
                    }}
                    style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '', }}
                  />
                )
              }}
            />
            <Table.Column title="検査名称" dataIndex="formal_name" />
            <Table.Column title="検査値" dataIndex="test_result"
              render={(value, record, index) => {
                return (
                  <Input value={record.test_result}
                    readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                    onChange={(event) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "test_result", event.target.value)
                    }}
                    style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '', }}
                  />
                )
              }}
            />
            <Table.Column title="変換後検査値" dataIndex="conversion_after_exam_value"
              render={(value, record, index) => {
                return (
                  <Input value={record.conversion_after_exam_value}
                    readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                    onChange={(event) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "conversion_after_exam_value", event.target.value)
                    }}
                    style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '', }}
                  />
                )
              }}
            />
            <Table.Column title="オプション" dataIndex="option_remark"
              render={(value, record, index) => {
                return (
                  <Input value={record.option_remark}
                    readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                    onChange={(event) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "option_remark", event.target.value)
                    }}
                    style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '', }}
                  />
                )
              }}
            />
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
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].exam_code)}
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1312001_XmlInspectValueConvertEM);
