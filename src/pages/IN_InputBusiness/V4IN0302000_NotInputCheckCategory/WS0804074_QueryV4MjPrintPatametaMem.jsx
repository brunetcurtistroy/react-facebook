import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Button, Card, Input, InputNumber, message, Table, } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import QueryV4MjPrintPatametaMemAction from "redux/InputBusiness/NotInputCheckCategory/QueryV4MjPrintPatametaMem.action";

class WS0804074_QueryV4MjPrintPatametaMem extends React.Component {
  static propTypes = {
    Li_StyleCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '照会 - V4-[MJ]印刷パタメータ[MEM]';

    this.state = {
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  componentDidMount() {
    this.getDataTable(true)
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getDataTable(true)
    }
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  getDataTable(reload) {
    let params = {
      Style: this.isEmpty(this.props.Li_StyleCode) ? '' : this.props.Li_StyleCode,
    }

    this.setState({ isLoading: true })
    QueryV4MjPrintPatametaMemAction.getDataTable(params)
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data,
          isLoadingTable: false,

          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,
        })
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  updateRecordData(index) {
    let params = {
      ...this.state.dataSource[index]
    }

    QueryV4MjPrintPatametaMemAction.saveData(params)
      .then((res) => {
        this.getDataTable(this.state.dataSource[index].id ? true : false)
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

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
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
      let index = this.state.dataSource.findIndex(x => !x.mj_style_cd && !x.mj_record_num && !x.mj_format_name && !x.mj_instruction_sect && !x.mj_parameter);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkAddItem() || this.checkIdTemp(this.state.rowSelected[0].id)) {
        return true;
      } return false;
    } return false;
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

  async handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    await data.splice(0, 1);
    await this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
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
      <div className="query-v4-mj-print-patameta-mem">
        <Card title="照会 - V4-[MJ]印刷パタメータ[MEM]">
          <Table
            size='small'
            style={{ cursor: 'pointer' }}
            rowClassName={(record, index) => record.id === this.state.rowSelected[0]?.id ? 'table-row-light' : ''}
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            bordered
            rowKey={(record) => record.id}
            onRow={(record, rowIndex) => {
              return {
                onClick: async () => {
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  this.setState({
                    rowSelected: [record],
                    selectedRowKeys: [record.id],
                    indexTable: index
                  });
                }
              }
            }}
          >
            <Table.Column title="MEMORY.[MJ]様式コード" dataIndex="mj_style_cd" width={112}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div style={{ paddingLeft: '7px' }}>{record.mj_style_cd}</div>
                      :
                      <Input value={record.mj_style_cd} maxLength={3}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "mj_style_cd", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }} />
            <Table.Column title="MEMORY.[MJ]レコード番号" dataIndex="mj_record_num" width={112}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div style={{ paddingRight: 7 }}>{record.mj_record_num}</div>
                      :
                      <InputNumber value={record.mj_record_num} maxLength={6}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "mj_record_num", e)
                        }}
                      />
                    }
                  </div>
                )
              }} />
            <Table.Column title="MEMORY.[MJ]様式名" dataIndex="mj_format_name"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div style={{ paddingLeft: '7px' }}>{record.mj_format_name}</div>
                      :
                      <Input value={record.mj_format_name} maxLength={40}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "mj_format_name", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }} />
            <Table.Column title="MEMORY.[MJ]指示区分" dataIndex="mj_instruction_sect" width={112}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div style={{ paddingLeft: '7px' }}>{record.mj_instruction_sect}</div>
                      :
                      <Input value={record.mj_instruction_sect} maxLength={3}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "mj_instruction_sect", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }} />
            <Table.Column title="MEMORY.[MJ]パラメータ" dataIndex="mj_parameter"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div style={{ paddingLeft: '7px' }}>{record.mj_parameter}</div>
                      :
                      <Input value={record.mj_parameter} maxLength={2000}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "mj_parameter", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }} />
            <Table.Column title="MEMORY.[MJ]備考" dataIndex="mj_remark"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <div style={{ paddingLeft: '7px' }}>{record.mj_remark}</div>
                      :
                      <Input value={record.mj_remark} maxLength={2000}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "mj_remark", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }} />
            <Table.Column width={85} fixed='right'
              title={
                <div style={{ textAlign: "center" }}>
                  <Button
                    disabled={this.checkDisabledBtnAdd()}
                    onClick={this.handleAddRowTable}
                    type="primary" icon={<PlusOutlined />}>
                  </Button>
                </div>
              }
              render={(text, record, index) => {
                return <div style={{ textAlign: "center" }}>
                  <Button size='small'
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() ||
                      (!this.state.dataSource[this.state.indexTable].mj_style_cd &&
                        !this.state.dataSource[this.state.indexTable].mj_record_num &&
                        !this.state.dataSource[this.state.indexTable].mj_format_name &&
                        !this.state.dataSource[this.state.indexTable].mj_parameter &&
                        !this.state.dataSource[this.state.indexTable].mj_instruction_sect)}
                    onClick={() => { this.updateRecordData(this.findIndexByID(this.state.dataSource, record.id)) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0804074_QueryV4MjPrintPatametaMem);
