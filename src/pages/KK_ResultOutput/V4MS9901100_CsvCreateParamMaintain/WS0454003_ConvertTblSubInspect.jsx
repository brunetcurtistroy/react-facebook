import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Input, Modal, Button, Space, message, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import WS0178001_QuerySiteInfo from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0178001_QuerySiteInfo.jsx';
import WS0179001_InquiryFindingInfo from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0179001_InquiryFindingInfo.jsx';
import ConvertTblSubInspecthAction from "redux/ResultOutput/CsvCreateParamMaintain/ConvertTblSubInspect.action";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0454003_ConvertTblSubInspect extends React.Component {

  static propTypes = {
    Li_Format: PropTypes.any,
    Li_InspectCode: PropTypes.any,
    Li_InspectName: PropTypes.any,
    Li_InspectCommentCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '変換ﾃｰﾌﾞﾙSUB[検査]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      parramIndex: {},
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    let parramIndex = {
      Li_Format: this.props.Li_Format ?? "",
      Li_InspectCode: this.props.Li_InspectCode ?? "",
      Li_InspectName: this.props.Li_InspectName ?? "",
      Li_InspectCmtCode: this.props.Li_InspectCmtCode ?? ""
    }
    this.getScreenData(true, parramIndex);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      let parramIndex = {
        Li_Format: this.props.Li_Format ?? "",
        Li_InspectCode: this.props.Li_InspectCode ?? "",
        Li_InspectName: this.props.Li_InspectName ?? "",
        Li_InspectCmtCode: this.props.Li_InspectCmtCode ?? ""
      }
      this.getScreenData(true, parramIndex);
    }
  }

  getScreenData(reload, parramIndex) {
    this.setState({ isLoadingTable: true })
    ConvertTblSubInspecthAction.getScreenData(parramIndex)
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
        conversion_after_exam_value: this.state.dataSource[index].conversion_after_exam_value ?? '',
        remarks: this.state.dataSource[index].remarks ?? '',
      }
    }
    ConvertTblSubInspecthAction.saveData(params)
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
                ConvertTblSubInspecthAction.deleteData(params)
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
      <div className="convert-tbl-sub-inspect">
        <Card title="変換ﾃｰﾌﾞﾙSUB[検査]">
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
            <Table.Column title="部位情報" dataIndex="" key=""
              render={(value, record) => {
                return (
                  <div>
                    <InputNumber hidden={record.id != ''} value={record.SiteCode} style={{ border: 'none', width: '25%' }}
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
                                  // this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "SiteCode", output.Lo_SiteCode)
                                  // this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "site_name", output.Lo_SiteName)
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }}></InputNumber>
                    <span hidden={record.id == ''}>{record.SiteCode > 0 ? record.SiteCode : ""}</span>
                    <span>{record.site_name}</span>
                  </div>
                )
              }}
            />
            <Table.Column title="所見情報" dataIndex="" key=""
              render={(value, record) => {
                return (
                  <div>
                    <InputNumber hidden={record.id != ''} value={record.FindingsCode} style={{ border: 'none', width: '25%' }}
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
                                  record.FindingsCode = output.Lo_FindingsCode
                                  record.findings_name = output.Lo_FindingsName
                                  // this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "FindingsCode", output.Lo_FindingsCode)
                                  // this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "findings_name", output.Lo_FindingsName)
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }}></InputNumber>
                    <span hidden={record.id == ''} style={{ textAlign: 'right' }}>{record.FindingsCode > 0 ? record.FindingsCode : ""}</span>
                    <span>{record.findings_name}</span>
                  </div>
                )
              }}
            />
            <Table.Column title="変換結果"
              render={(value, record, index) => {
                return (
                  <Input style={{ paddingRight: '25px' }} value={record.conversion_after_exam_value} maxLength={20}
                    onChange={(e) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "conversion_after_exam_value", e.target.value)
                    }}
                  />
                )
              }} />
            <Table.Column title="備考"
              render={(value, record, index) => {
                return (
                  <Input style={{ paddingRight: '25px' }} value={record.remarks} maxLength={300}
                    onChange={(e) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "remarks", e.target.value)
                    }}
                  />
                )
              }} />
            {/* <Table.Column title="備考" dataIndex="remarks" key="" /> */}
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
          </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0454003_ConvertTblSubInspect);
