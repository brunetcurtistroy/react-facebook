import React from "react";
import { connect } from "react-redux";

import { Button, Card, message, Table, Modal, Input } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import MedicalExamTypeMaintainAction from "redux/SpecificInsureMaintenance/XmlParamMaintain/MedicalExamTypeMaintain.action";

class WS2485003_MedicalExamTypeMaintain extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '健診種別保守';

    this.state = {
      dataSource: [],
      isLoadingTable: false,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
      old_medical_exam_type: null
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
    MedicalExamTypeMaintainAction.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          indexTable: 0,
          old_medical_exam_type: res && res.length > 0 ? res[0].medical_exam_type : null
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateData(index) {
    let params = { ...this.state.dataSource[index] }
    if (this.checkDuplicateCode()) {
      message.warning('健診種別 複製 !!');
    } else {
      MedicalExamTypeMaintainAction.createAndUpdateData(params)
        .then((res) => {
          message.success('更新しました。!')
          this.getScreenData();
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
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        MedicalExamTypeMaintainAction.deleteData(params)
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

  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];
    const uniqueValues = new Set(lstData.map(v => v.medical_exam_type));

    if (uniqueValues.size < lstData.length) {
      return true;
    } return false;
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
      let index = this.state.dataSource.findIndex(x => !x.medical_exam_type);
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
          this.state.rowSelected[0].medical_exam_type !== this.state.old_medical_exam_type)) {
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
      old_medical_exam_type: data.length > 0 ? data[0].medical_exam_type : null
    });
  }

  render() {
    return (
      <div className="medical-exam-type-maintain">
        <Card title="健診種別保守">
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
                  old_medical_exam_type: record.medical_exam_type
                });
                this.changeRow(index)
              },
            }}
          >
            <Table.Column title="健診種別" dataIndex="medical_exam_type" width={80}
              render={(value, record, index) => {
                return (
                  <Input value={record.medical_exam_type} maxLength={3}
                    readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                    onChange={(event) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "medical_exam_type", event.target.value)
                    }}
                    style={{ border: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'none' : '', background: this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ? 'transparent' : '', }}
                  />
                )
              }}
            />
            <Table.Column title="名称" dataIndex="medical_exam_type_name"
              render={(value, record, index) => {
                return (
                  <Input value={record.medical_exam_type_name}
                    readOnly={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                    onChange={(event) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "medical_exam_type_name", event.target.value)
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
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].medical_exam_type)}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2485003_MedicalExamTypeMaintain);
