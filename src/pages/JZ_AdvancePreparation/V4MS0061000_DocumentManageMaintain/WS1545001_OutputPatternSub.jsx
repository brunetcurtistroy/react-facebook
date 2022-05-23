import React from "react";
import { connect } from "react-redux";

import { Card, Col, message, Row, Table, Modal, Button, Input, Form,  Space } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import OutputPatternSubAction from "redux/AdvancePreparation/DocumentManageMaintain/OutputPatternSub.action";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Color from "constants/Color";

class WS1545001_OutputPatternSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '出力パターンSUB';

    this.state = {
      dataSourcePattern: [],
      isLoadingTablePattern: false,
      selectedRowKeysPattern: [],
      rowSelectedPattern: [],
      indexTablePattern: 0,
      old_document_number: null,

      dataSourceDetail: [],
      isLoadingTableDetail: false,

    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  componentDidMount() {
    this.getDataOutputPattern();
  }

  // table pattern
  getDataOutputPattern() {
    this.setState({ isLoadingTable: true })
    OutputPatternSubAction.getDataOutputPattern()
      .then((res) => {
        this.setState({
          dataSourcePattern: res ? res : [],
          isLoadingTablePattern: false,

          rowSelectedPattern: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeysPattern: res && res.length > 0 ? [res[0].id] : [],
          indexTablePattern: 0,
          old_document_number: res && res.length > 0 ? res[0].document_management_number : null
        });

        this.getDataDetail(res && res.length > 0 ? res[0].document_title : null);
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateOutputPattern(index) {
    let params = { ...this.state.dataSourcePattern[index] }
    if (this.checkDuplicateCode()) {
      message.warning('出力ﾊﾟﾀｰﾝ名称 複製 !!');
    } else {
      OutputPatternSubAction.createAndUpdateOutputPattern(params)
        .then((res) => {
          message.success('更新しました。!')
          this.getDataOutputPattern();
        })
    }
  }

  deleteOutputPattern(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: "は　い",
      cancelText: "いいえ",
      onOk: () => {
        OutputPatternSubAction.deleteOutputPattern(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataOutputPattern();
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

  changeTarget(value) {
    let params = {
      document_title: this.state.rowSelectedPattern[0].document_title,
      target: value
    }
    OutputPatternSubAction.changeTarget(params)
      .then(res => {
        this.getDataDetail(this.state.rowSelectedPattern[0].document_title);
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

  // table Detail
  getDataDetail(document_title) {
    let params = {
      document_title: document_title
    }

    this.setState({ isLoadingTableDetail: true });

    OutputPatternSubAction.getDataDetail(params)
      .then((res) => {
        this.setState({
          dataSourceDetail: res,
          isLoadingTableDetail: false,
        })

        this.formRef.current?.setFieldsValue({
          dataTable: res
        })
      })
      .finally(() => this.setState({ isLoadingTableDetail: false }))
  }

  updateDetail(values) {
    let params = {
      ...values,
      document_title: this.state.rowSelectedPattern[0].document_title
    }

    OutputPatternSubAction.updateDetail(params)
      .then((res) => { 
        message.success('更新しました。')
      })
  }

  checkDuplicateCode() {
    let lstData = [...this.state.dataSourcePattern];
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
    if (this.state.dataSourcePattern.length > 0) {
      let index = this.state.dataSourcePattern.findIndex(x => !x.document_management_number);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkDisabledBtnAdd() {
    if (this.state.rowSelectedPattern.length > 0) {
      if (this.checkAddItem() || this.checkIdTemp(this.state.rowSelectedPattern[0].id) ||
        (!this.checkIdTemp(this.state.rowSelectedPattern[0].id) &&
          this.state.rowSelectedPattern[0].document_management_number !== this.state.old_document_number)) {
        return true;
      } return false;
    } return false;
  }

  // add new record
  async handleAddRowTable() {
    let newRow = { id: '' };

    let data = [...this.state.dataSourcePattern];

    data.unshift(newRow);

    await this.setState({
      dataSourcePattern: data,
      rowSelectedPattern: [newRow],
      selectedRowKeysPattern: [newRow.id],
      indexTablePattern: 0,

      dataSourceDetail: [],
      isLoadingTableDetail: false
    });

    this.forceUpdate();
  }

  // check selected record while add new
  changeRow(index) {
    let data = [...this.state.dataSourcePattern];

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      this.setState({
        rowSelectedPattern: [data[0]],
        selectedRowKeysPattern: [data[0].id],
        indexTablePattern: 0
      });
    } else {
      this.setState({
        indexTablePattern: index
      });
      this.getDataDetail(data[index].document_title);
    }
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSourcePattern];

    data[index][field] = value;

    this.setState({
      dataSourcePattern: data
    });
  }

  updateDatasourceDetail(index, field, value) {
    let data = [...this.state.dataSourceDetail];


    data[index][field] = value;
    console.log(data, data[index], value, data[index][field])

    this.setState({
      dataSourceDetail: data
    });

    this.formRef.current?.setFieldsValue({
      dataTable: data
    })

    this.updateDetail(data[index]);
  }

  handleDeleteRowTable() {
    let data = [...this.state.dataSourcePattern];
    data.splice(0, 1);
    this.setState({
      dataSourcePattern: data,
      indexTablePattern: 0,
      rowSelectedPattern: data.length > 0 ? [data[0]] : [],
      selectedRowKeysPattern: data.length > 0 ? [data[0].id] : [],
      old_document_number: data.length > 0 ? data[0].document_management_number : null
    });

    this.getDataDetail(data.length > 0 ? data[0].document_title : null);
  }

  render() {
    return (
      <div className="output-pattern-sub">
        <Card title="出力パターンSUB">
          <Space>
            <Button 
              onClick={() => {
                Modal.confirm({
                  width: "300px",
                  content: "全て出力対象にします ?",
                  okText: "は　い",
                  cancelText: "いいえ",
                  onOk: () => {
                    this.changeTarget(true)
                  }
                })
              }}
            > 全選択  
            </Button>
            <Button
              onClick={() => {
                Modal.confirm({
                  width: "300px",
                  content: "全て出力対象外にします ?",
                  okText: "は　い",
                  cancelText: "いいえ",
                  onOk: () => {
                    this.changeTarget(false)
                  }
                })
              }}
            > 全解除
            </Button>
          </Space>
          <hr style={{margin: '15px 0'}}/>
          <Row gutter={24}>
            <Col span={12} style={{ borderRight: '1px solid #d9d9d9' }}>
              <Table
                size='small'
                dataSource={this.state.dataSourcePattern}
                loading={this.state.isLoadingTablePattern}
                pagination={true}
                bordered
                rowKey={(record) => record.id}
                scroll={{ x: 500 }}
                rowSelection={{
                  type: "radio",
                  selectedRowKeys: this.state.selectedRowKeysPattern,
                  onSelect: (record, selected, selectedRows) => {
                    let index = this.state.dataSourcePattern.findIndex(x => x.id === record.id)
                    this.setState({
                      rowSelectedPattern: selectedRows,
                      selectedRowKeysPattern: selectedRows.map(x => x.id),
                      indexTablePattern: index,
                      old_document_number: record.document_management_number
                    });
                    this.changeRow(index);
                  },
                }}
              >
                <Table.Column title="出力管理番号" dataIndex="document_title"
                  render={(value, record, index) => {
                    return (
                      <Input value={record.document_title} maxLength={100}
                        readOnly={this.state.indexTablePattern !== this.findIndexByID(this.state.dataSourcePattern, record.id)}
                        onChange={(event) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSourcePattern, record.id), "document_title", event.target.value)
                        }}
                        style={{ border: this.state.indexTablePattern !== this.findIndexByID(this.state.dataSourcePattern, record.id) ? 'none' : '', background: this.state.indexTablePattern !== this.findIndexByID(this.state.dataSourcePattern, record.id) ? 'transparent' : '', }}
                      />
                    )
                  }}
                />
                <Table.Column title="出力ﾊﾟﾀｰﾝ名称" dataIndex="document_management_number"
                  render={(value, record, index) => {
                    return (
                      <Input value={record.document_management_number} maxLength={30}
                        readOnly={this.state.indexTablePattern !== this.findIndexByID(this.state.dataSourcePattern, record.id)}
                        onChange={(event) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSourcePattern, record.id), "document_management_number", event.target.value)
                        }}
                        style={{ border: this.state.indexTablePattern !== this.findIndexByID(this.state.dataSourcePattern, record.id) ? 'none' : '', background: this.state.indexTablePattern !== this.findIndexByID(this.state.dataSourcePattern, record.id) ? 'transparent' : '', }}
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
                        hidden={this.state.indexTablePattern !== this.findIndexByID(this.state.dataSourcePattern, record.id) || this.checkAddItem() || !(this.state.dataSourcePattern[this.state.indexTablePattern] && this.state.dataSourcePattern[this.state.indexTablePattern].document_management_number)}
                        onClick={() => { this.createAndUpdateOutputPattern(this.findIndexByID(this.state.dataSourcePattern, record.id)) }}
                        style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                        icon={<SaveOutlined />} >
                      </Button>
                      <Button size='small' style={{ border: 'none' }}
                        onClick={() => {
                          this.checkIdTemp(record.id) ? this.handleDeleteRowTable() : this.deleteOutputPattern(record.id)
                        }}
                        danger
                        icon={<DeleteOutlined />}
                      >
                      </Button>
                    </div>;
                  }}
                />
              </Table>
            </Col>
            <Col span={12}>
              <Form
                ref={this.formRef}
                onFinish={this.onFinish}
              >
                <Table
                  size='small'
                  dataSource={this.state.dataSourceDetail}
                  loading={this.state.isLoadingTableDetail}
                  pagination={true}
                  bordered
                  rowKey={(record) => record.id}
                  scroll={{ x: 500 }}
                >
                  <Table.Column dataIndex="StsOutputTarget" width={40} align='center'
                    render={(value, record, index) => {
                      return (
                        <div style={{textAlign: 'center'}}>
                        <Form.Item name={["dataTable", this.findIndexByID(this.state.dataSourceDetail, record.id), "StsOutputTarget"]} style={{ marginBottom: 0 }}
                          valuePropName="Checkbox">
                          <Checkbox checked={record.StsOutputTarget}
                            onChange={(event) => {
                              this.updateDatasourceDetail(this.findIndexByID(this.state.dataSourceDetail, record.id), "StsOutputTarget", event.target.checked)
                            }}
                          />
                        </Form.Item>
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="管理番号" dataIndex="document_management_number" 
                  render={(value, record, index) => {
                    return (
                      <div style={{color: Color(record.expression_16)?.Foreground}}>{value}</div>
                    )
                  }}/>
                  <Table.Column title="資料名称" dataIndex="document_title" 
                   render={(value, record, index) => {
                    return (
                      <div style={{color: Color(record.expression_16)?.Foreground}}>{value}</div>
                    )
                  }}/>
                  <Table.Column title="指定" align='center'
                    render={(value, record, index) => {
                      return (
                        <div hidden={!record.StsDesignatedPrint} style={{color: Color(record.expression_16)?.Foreground}}>○</div>
                      )
                    }}
                  />

                </Table>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1545001_OutputPatternSub);
