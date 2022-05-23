import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Select, message, Modal, Input, Button } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import DestinationSubAction from "redux/AdvancePreparation/DocumentManageMaintain/DestinationSub.action";
const { Option } = Select;

class WS1546001_DestinationSub extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '送付先SUB';

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
      old_document_management_number: null,
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getScreenData();
  }

  getScreenData() {
    this.setState({ isLoadingTable: true })
    DestinationSubAction.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          indexTable: 0,
          old_document_management_number: res && res.length > 0 ? res[0].document_management_number : null
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateData(index) {
    let params = { ...this.state.dataSource[index] }
    if (this.checkDuplicateCode()) {
      message.warning('送付先管理番号 複製 !!');
    } else {
      DestinationSubAction.createAndUpdateData(params)
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
      okText: "は　い",
      cancelText: "いいえ",
      onOk: () => {
        DestinationSubAction.deleteData(params)
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
    const uniqueValues = new Set(lstData.map(v => v.document_management_number));

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
      let index = this.state.dataSource.findIndex(x => !x.document_management_number);
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
          this.state.rowSelected[0].document_management_number !== this.state.old_document_management_number)) {
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
      old_document_management_number: data.length > 0 ? data[0].document_management_number : null
    });
  }

  checkValueSpecified(value) {
    let nameSpecified = ''
    switch (value) {
      case '1':
        nameSpecified = '事業所'
        break;
      case '2':
        nameSpecified = '事業所(本店)'
        break;
      case '3':
        nameSpecified = '個人住所1'
        break;
      case '4':
        nameSpecified = '個人住所2'
        break;
      case '5':
        nameSpecified = '個人住所3'
        break;
      case '9':
        nameSpecified = '印字なし'
        break;
      default:
        break;
    }
    return nameSpecified
  }

  render() {
    return (
      <div className="destination-sub">
        <Card title="送付先SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingTable}
              pagination={true}
              rowKey={(record) => record.id}
              bordered
              scroll={{ x: 700 }}
              rowSelection={{
                type: "radio",
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows) => {
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  this.setState({
                    rowSelected: selectedRows,
                    selectedRowKeys: selectedRows.map(x => x.id),
                    indexTable: index,
                    old_document_management_number: record.document_management_number
                  });
                  this.changeRow(index)
                },
              }}
            >
              <Table.Column title="送付先管理番号" dataIndex="document_management_number" width={110}
                render={(value, record, index) => {
                  return (
                    <div>
                      {!this.checkIdTemp(record.id) ?
                        <span style={{ paddingLeft: 7 }}>{value}</span>
                        :
                        <Input value={record.document_management_number} maxLength={4}
                          onChange={(event) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "document_management_number", event.target.value)
                          }}
                        />
                      }
                    </div>

                  )
                }}
              />
              <Table.Column title="送付先名称" dataIndex="document_title"
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 7 }}>{value}</span>
                        :
                        <Input value={record.document_title} maxLength={100}
                          onChange={(event) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "document_title", event.target.value)
                          }}
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="規定の送付先" dataIndex="SpecifiedValue" width={150}
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 7 }}>{this.checkValueSpecified(value)}</span>
                        :
                        <Select value={record.SpecifiedValue} style={{ width: '100%' }}
                          onChange={(value) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "SpecifiedValue", value)
                          }}
                        >
                          <Option value="1">事業所</Option>
                          <Option value="2">事業所(本店)</Option>
                          <Option value="3">個人住所1</Option>
                          <Option value="4">個人住所2</Option>
                          <Option value="5">個人住所3</Option>
                          <Option value="9">印字なし</Option>
                        </Select>
                      }
                    </div>
                  )
                }} />
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
                      hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].document_management_number)}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1546001_DestinationSub);
