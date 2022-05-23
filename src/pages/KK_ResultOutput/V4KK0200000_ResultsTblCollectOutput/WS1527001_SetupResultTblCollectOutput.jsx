import React from "react";
import { connect } from "react-redux";

import { Card, Form, Select, Input, Checkbox, Table, Menu, Modal, Row, Col, Button, message, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import WS1527024_PattanCopy from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS1527024_PattanCopy.jsx';
import WS0458001_CourseBasedDetermineByStyleSetting from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS0458001_CourseBasedDetermineByStyleSetting.jsx';
import WS1527018_StyleSettingHira from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS1527018_StyleSettingHira.jsx';
import WS1527012_StyleSetting from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS1527012_StyleSetting.jsx';
import WS1527008_ClassifyInquiry from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS1527008_ClassifyInquiry.jsx';
import SetupResultTblCollectOutputAction from "redux/ResultOutput/ResultsTblCollectOutput/SetupResultTblCollectOutput/SetupResultTblCollectOutput.action";
import StyleListListDataAction from "redux/ResultOutput/ResultsTblCollectOutput/SetupResultTblCollectOutput/StyleListListData.action";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";

class WS1527001_SetupResultTblCollectOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '設定[結果表一括出力]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: [],
      listCombobox: [],
      selectedPrescribed: true,
      Preview: 0,
      PrinterNum: 0,
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  onFinish(values) {
  }

  componentDidMount() {
    this.getScreenData(true);
    this.getScreenData_table(true);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.getScreenData(true);
      this.getScreenData_table(true);
    }
  }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    SetupResultTblCollectOutputAction.getScreenData()
      .then((res) => {
        let data = res ? res : [];
        this.setState({
          Preview: data.Preview,
          PrinterNum: data.PrinterNum,
          listCombobox: data.ComboBox,
        })
      })
      .finally()
  }
  getScreenData_table(reload) {
    StyleListListDataAction.getListData()
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data,
          isLoadingTable: false,
          selectedRows: data.length > 0 ? [data[index]] : [],
          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];
    data[index][field] = value;
    this.setState({
      dataSource: data
    });
  }

  updateOutputOrderSelect(index, field, value) {
    let data = [...this.state.dataSource];
    data[index][field] = value;
    this.setState({
      dataSource: data
    });
    this.state.selectedPrescribed = false
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

  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkIdTemp(this.state.rowSelected[0].id)) {
        return true;
      } return false;
    } return false;
  }

  async handleAddRowTable() {
    let newRow = { id: '' };

    let data = [...this.state.dataSource];

    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      selectedRows: [newRow],
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });

    this.forceUpdate();
  }

  handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    data.splice(0, 1);
    this.setState({
      dataSource: data,
      indexTable: 0,
      selectedRows: data.length > 0 ? [data[0]] : [],
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
    });
  }

  onSelectCBB(value) {
    this.state.PrinterNum = value
    this.state.selectedPrescribed = true
  }

  CheckPreview(event) {
    event ? this.Preview = 1 : this.Preview = 0
  }

  updateRecordData(index) {
    let params = {}
    if (this.state.dataSource[index].id) {
      params = { ...this.state.dataSource[index], }
    } else {
      params = {
        Code: this.state.dataSource[index].Code,
        DocumentName: this.state.dataSource[index].DocumentName,
        Division: this.state.dataSource[index].Division,
        OutputOrder: this.state.dataSource[index].OutputOrder ? this.state.dataSource[index].OutputOrder : '',
        Select: this.state.dataSource[index].Select ? this.state.dataSource[index].Select : '',
        P: this.state.dataSource[index].P ? this.state.dataSource[index].P : ''
      }
    }
    StyleListListDataAction.saveData(params)
      .then((res) => {
        message.success('更新しました!')
        this.getScreenData_table(true)
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

  deleteData(id) {
    let params = {
      id: id
    }
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 300,
        component:
          <WS0061015_CheckYesNoNo
            Li_Message={'削除を実行しますか ?'}
            onFinishScreen={(ouput) => {
              if (ouput.Lio_StsReturn) {
                StyleListListDataAction.deleteData(params)
                  .then(res => {
                    message.success('正常に削除されました!');
                    this.getScreenData_table(true)
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
              this.closeModal()
            }} />
      },
    });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    });
  }
  render() {
    const { current } = this.state;

    return (
      <div className="setup-result-tbl-collect-output">
        <Card title="設定[結果表一括出力]">
          <Menu selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="複写" disabled={this.state.selectedRows.length == 0 || !this.state.selectedRowKeys[0]}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '600px',
                    component: (
                      <WS1527024_PattanCopy
                        Li_ItemId={this.state.selectedRows[0].Division}
                        Li_Item={this.state.selectedRows[0].DocumentName}
                        onFinishScreen={(output) => {
                          this.closeModal()
                          this.getScreenData_table(true)
                        }}
                      />
                    ),
                  },
                })
              }}
            >
              複写
            </Menu.Item>
            <Menu.Item key="判定別" disabled={this.state.selectedRows.length == 0 || !this.state.selectedRowKeys[0]}
              onClick={() => {
                switch (this.state.selectedPrescribed) {
                  case true: {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '600px',
                        component: (
                          <WS0458001_CourseBasedDetermineByStyleSetting
                            Li_ItemId={this.state.selectedRows[0].Division}
                            Li_Item={this.state.selectedRows[0].DocumentName}
                            onFinishScreen={() => {

                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                    break;
                  }
                  case false: {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '1200px',
                        component: (
                          <WS1527018_StyleSettingHira
                            Li_PatternClassify={this.state.selectedRows[0].Division}
                            Li_record={this.state.selectedRows[0]}
                            onFinishScreen={() => {

                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                    break;
                  }
                }
              }}>
              判定別
            </Menu.Item>
            <Menu.Item key="パラメータ" disabled={this.state.selectedRows.length == 0 || !this.state.selectedRowKeys[0]}
              onClick={() => {
                switch (this.state.selectedPrescribed) {
                  case true: {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '600px',
                        component: (
                          <WS0458001_CourseBasedDetermineByStyleSetting
                            Li_ItemId={this.state.selectedRows[0].Division}
                            Li_Item={this.state.selectedRows[0].DocumentName}
                            onFinishScreen={() => {

                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                    break;
                  }
                  case false: {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: "90%",
                        component: (
                          <WS1527012_StyleSetting
                            Li_PatternClassify={this.state.selectedRows[0].Division}
                            Li_DocumentName={this.state.selectedRows[0].DocumentName}
                            onFinishScreen={() => {

                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                    break;
                  }
                }
              }}>
              パラメータ
            </Menu.Item>
          </Menu>

          <Card>
            <Form
              initialValues={{ Preview: true }}
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    name="PrinterNum"
                    label="規定のﾌﾟﾘﾝﾀ"
                  >
                    <Select
                      defaultValue={this.state.PrinterNum}
                      onChange={(value) => this.onSelectCBB(value)}
                    >
                      {this.state.listCombobox.map(item => (
                        <Select.Option key={item.LinkedField} value={item.LinkedField}>
                          {item.DisplayField}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="Preview" label="規定のﾌﾟﾚﾋﾞｭｰ" onChange={(event) => this.CheckPreview(event.target.checked)}
                    valuePropName={this.Preview > 0 ? "checked" : ""}>
                    <Checkbox></Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Form>

            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={false}
              pagination={false}
              bordered={true}
              rowKey={(record) => record.id}
              rowSelection={{
                type: "radio",
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows) => {
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  this.setState({
                    selectedRows: selectedRows,
                    selectedRowKeys: selectedRows.map(x => x.id),
                    indexTable: index
                  });
                  this.changeRow(index)
                },
              }}
            >
              <Table.Column title="コード" width={80}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ marginRight: 7, float: 'left' }} hidden={record.id}>
                        {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                          <span>{record.Code}</span>
                          :
                          <InputNumber hidden={record.id} className='custom-input-number' value={record.Code} maxLength={4}
                            onChange={(e) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Code", e === 0 ? null : e)
                            }}
                          />
                        }
                      </div>
                      <span hidden={!record.id}>{record.Code}</span>
                    </div>
                  )
                }} />
              <Table.Column title="帳票名"
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'left' }}>
                      <Input hidden={record.id} style={{ textAlign: 'right' }} value={record.DocumentName}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "DocumentName", e.target.value)
                        }}
                      />
                      <span hidden={!record.id}>{record.DocumentName}</span>
                    </div>
                  )
                }} />
              <Table.Column title="区分" width={100}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ marginRight: 7, float: 'left' }}>
                        <Input.Search style={{ textAlign: 'right' }} value={record.Division} maxLength={4}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS1527008_ClassifyInquiry
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Division", output.Lio_Division)
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Division", e.target.value)
                          }}
                        />
                      </div>
                    </div>
                  )
                }} />
              <Table.Column title="出力順番" key="" width={200}
                render={(value, record, index) => {
                  return (
                    <Select style={{ width: "100%" }}
                      defaultValue={record.OutputOrder} onChange={(value) => this.updateOutputOrderSelect(this.findIndexByID(this.state.dataSource, record.id), "OutputOrder", value)}>
                      <Select.Option value={1}>ｺｰｽ順</Select.Option>
                      <Select.Option value={2}>受付順</Select.Option>
                      <Select.Option value={3}>事業所順</Select.Option>
                    </Select>
                  )
                }}
              />
              <Table.Column title="選択" key="" width={200}
                render={(value, record, index) => {
                  return (
                    <Select style={{ width: "100%" }}
                      defaultValue={record.Select} onChange={(value) => this.updateOutputOrderSelect(this.findIndexByID(this.state.dataSource, record.id), "Select", value)}>
                      <Select.Option value="全て対象">全て対象</Select.Option>
                      <Select.Option value="部分対象">部分対象</Select.Option>
                    </Select>
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
                      hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
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
              <Table.Column title="" dataIndex="" key="" width={80}
                render={(key, record) => {
                  return (
                    <Button type="primary"
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '600px',
                            component: (
                              <WS1527008_ClassifyInquiry
                                Lio_Division={record.Division}
                                onFinishScreen={(output) => {
                                  this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Division", output.Lio_Division)
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }}
                      onChange={(e) => {
                        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Division", e.target.value)
                      }}
                    >照会</Button>
                  )
                }}
              />
            </Table>
          </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1527001_SetupResultTblCollectOutput);
