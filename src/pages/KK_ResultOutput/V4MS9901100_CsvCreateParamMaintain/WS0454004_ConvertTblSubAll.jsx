import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Table, Input, Modal, Button, Space, message, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS0178001_QuerySiteInfo from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0178001_QuerySiteInfo.jsx';
import WS0179001_InquiryFindingInfo from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0179001_InquiryFindingInfo.jsx';
import WS0454005_Copy from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0454005_Copy.jsx';
import ConvertTblSubAllAction from "redux/ResultOutput/CsvCreateParamMaintain/ConvertTblSubAll.action";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
class WS0454004_ConvertTblSubAll extends React.Component {

  static propTypes = {
    Li_Format: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '変換ﾃｰﾌﾞﾙSUB[全て]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }
  componentDidMount() {
    this.getScreenData(true);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.getScreenData(true);
    }
  }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    ConvertTblSubAllAction.getScreenData()
      .then((res) => {
        let data = res ? res.data : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data,
          isLoadingTable: false,
          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,
        })
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }
  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };
  // check format button save
  findIndexByFormat = (arrayData, recordFormat) => {
    let index = 0;
    arrayData.forEach((item) => {
      if (item.format == recordFormat) {
        index++;
      }
    })
    if (index >= 2) {
      return true
    } else {
      return false
    }
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

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });

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

  handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    data.splice(0, 1);
    this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
    });
  }
  updateRecordData(index) {
    let params = {}
    params = { ...this.state.dataSource[index] }
    if (this.state.dataSource[index].id) {
      params = { ...this.state.dataSource[index] }
    } else {
      params = {
        format: this.state.dataSource[index].format ?? '',
        exam_code: this.state.dataSource[index].exam_code ?? '',
        SiteCode: this.state.dataSource[index].SiteCode ?? "",
        FindingsCode: this.state.dataSource[index].FindingsCode ?? "",
        conversion_after_exam_value: this.state.dataSource[index].conversion_after_exam_value ?? '',
        remarks: this.state.dataSource[index].remarks ?? '',
      }
    }
    ConvertTblSubAllAction.saveData(params)
      .then((res) => {
        message.success('更新しました!')
        this.getScreenData(true)
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
                ConvertTblSubAllAction.deleteData(params)
                  .then(res => {
                    message.success('正常に削除されました!');
                    this.getScreenData(true)
                  })
                  .catch((err) => {
                    console.log(err)
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

  ChangeExamCode(record) {
    ConvertTblSubAllAction.changeexamcode({ exam_code: record.exam_code })
      .then((res) => {
        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_code", res.data.exam_code)
        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_name", res.data.exam_name)
        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_short_name", res.data.exam_short_name)
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable: false }))
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
      <div className="convert-tbl-sub-all">
        <Card title="変換ﾃｰﾌﾞﾙSUB[全て]">
          <Space>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '500px',
                    component: (
                      <WS0454005_Copy
                        Li_ExamCode={this.state.dataSource[this.state.indexTable].exam_code}
                        Li_ExamName={this.state.dataSource[this.state.indexTable].exam_name}
                        onFinishScreen={({ output }) => {
                          message.success(output.Lo_Message)
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}>F7
            </Button>
          </Space>
          <hr style={{ margin: '15px 0' }} />
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            rowKey={(record) => record.id}
            scroll={{ x: 900, y: 500 }}
            bordered
            rowSelection={{
              type: "radio",
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
            <Table.Column title="FORMAT" key=""
              render={(value, record) => {
                return (
                  <div>
                    <Input value={record.format} style={{ border: 'none' }}
                      onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "format", e.target.value) }}></Input>
                  </div>
                )
              }}
            />
            <Table.Column title="検査ｺｰﾄﾞ" key=""
              render={(value, record) => {
                return (
                  <div>
                    <InputNumber value={record.exam_code > 0 ? record.exam_code : ''} style={{ border: 'none' }}
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '70%',
                            component: (
                              <WS0271001_InspectItemSearchQuerySingle
                                Lio_InspectItemCode={record.exam_code}
                                onFinishScreen={(output) => {
                                  console.log(output)
                                  this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_code", output.Lio_InspectItemCode)
                                  this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_name", output.recordData.exam_name)
                                  this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_short_name", output.recordData.exam_short_name)
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }}
                      onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_code", e === 0 ? null : e) }}
                      onBlur={() => this.ChangeExamCode(record)}
                    ></InputNumber>
                  </div>
                )
              }}
            />
            <Table.Column title="検査名称" key=""
              render={(value, record) => {
                return (
                  <div>
                    <span>{record.exam_short_name}</span>
                    <span style={{ padding: "10px" }}>{record.exam_name}</span>
                  </div>
                )
              }}
            />
            <Table.Column title="部位情報" key=""
              render={(value, record) => {
                return (
                  <div>
                    <InputNumber value={record.SiteCode > 0 ? record.SiteCode : ''} style={{ border: 'none', width: '25%' }}
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '70%',
                            component: (
                              <WS0178001_QuerySiteInfo
                                Li_FindingsClassify={record.site_classification}
                                onFinishScreen={({ output }) => {
                                  record.SiteCode = output.Lo_SiteCode
                                  record.site_name = output.Lo_SiteName

                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }}
                      onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "SiteCode", e === 0 ? null : e) }}
                    ></InputNumber>
                    <span>{record.site_name}</span>
                  </div>
                )
              }}
            />
            <Table.Column title="所見情報" key=""
              render={(value, record) => {
                return (
                  <div>
                    <InputNumber value={record.FindingsCode > 0 ? record.FindingsCode : ''} style={{ border: 'none', width: '25%' }}
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '70%',
                            component: (
                              <WS0179001_InquiryFindingInfo
                                Li_SiteClassify={record.site_classification}
                                onFinishScreen={({ output }) => {
                                  // console.log(output)
                                  record.FindingsCode = output.Lo_FindingsCode
                                  record.findings_name = output.Lo_FindingsName
                                  // this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_name", output.Lo_Name)
                                  // this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_short_name", output.Lo_ShortName)
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }}
                      onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "FindingsCode", e === 0 ? null : e) }}
                    ></InputNumber>
                    <span>{record.findings_name}</span>
                  </div>
                )
              }}
            />
            <Table.Column title="変換後" key=""
              render={(value, record) => {
                return (
                  <div>
                    <Input value={record.conversion_after_exam_value} style={{ border: 'none' }}
                      onChange={(e) => { this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "conversion_after_exam_value", e.target.value) }}></Input>
                  </div>
                )
              }}
            />
            <Table.Column width={70} fixed='right'
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
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || (!(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].format))}
                    disabled={this.findIndexByFormat(this.state.dataSource, record.format)}
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
          <TextArea rows={3} type="text" value={this.state.dataSource[this.state.indexTable]?.remarks ?? ''}
            onChange={(e) => { this.updateDatasource(this.state.indexTable, "remarks", e.target.value) }}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0454004_ConvertTblSubAll);
