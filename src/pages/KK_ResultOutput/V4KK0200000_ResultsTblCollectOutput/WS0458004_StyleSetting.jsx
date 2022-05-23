import React from "react";
import { connect } from "react-redux";

import { Card, Table, Input, Modal, Button, Space, message, InputNumber } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import WS0458008_OfficeInquiry from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS0458008_OfficeInquiry.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS0458009_PrintStyleInquiry from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS0458009_PrintStyleInquiry.jsx';
import StyleSettingAction from "redux/ResultOutput/ResultsTblCollectOutput/CourseBasedDetermineByStyleSetting/StyleSetting.action";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";

const styleInput = {
  border: 'none',
  width: '20%',
  cursor: 'pointer'
}
class WS0458004_StyleSetting extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '様式設定';

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
    let params = {
      PatternClassify: this.props.PatternClassify || ''
    }
    this.getDataTable(true, params);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      let params = {
        PatternClassify: this.props.PatternClassify || ''
      }
      this.getDataTable(true, params);
    }
  }

  getDataTable(reload, params) {
    this.setState({ isLoadingTable: true })
    StyleSettingAction.getListData(params)
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

  // checkAddItem() {
  //   if (this.state.dataSource.length > 0) {
  //     let index = this.state.dataSource.findIndex(x => !x.office_code && !x.branch_store_code && !x.medical_exam_course && !x.style);
  //     if (index === -1) {
  //       return false;
  //     }
  //     return true
  //   }
  // }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkIdTemp(this.state.rowSelected[0].id)) {
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
    if (this.state.dataSource[index].id) {
      params = {
        ...this.state.dataSource[index],
        PatternClassify: this.props.PatternClassify ? this.props.PatternClassify : ''
      }
    } else {
      params = {
        office_code: this.state.dataSource[index].office_code,
        branch_store_code: this.state.dataSource[index].branch_store_code,
        medical_exam_course: this.state.dataSource[index].medical_exam_course,
        judgement: this.state.dataSource[index].judgement,
        style: this.state.dataSource[index].style,
        PatternClassify: this.props.PatternClassify ? this.props.PatternClassify : ''
      }
    }

    StyleSettingAction.saveData(params)
      .then((res) => {
        message.success('更新しました!')
        this.getDataTable(true)
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
                StyleSettingAction.deleteData(params)
                  .then(res => {
                    message.success('正常に削除されました!');
                    this.getDataTable(true)
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
      <div className="style-setting">
        <Card title="様式設定">
          <Table
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
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                  indexTable: index
                });
                this.changeRow(index)
              },
            }}
          >
            <Table.Column title="事業所コード"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginRight: 7, float: 'left' }} hidden={record.id}>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span>{record.office_code}</span>
                        :
                        <Input.Search style={{ textAlign: 'right' }} value={record.office_code} maxLength={3} style={{ width: 80 }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS0458008_OfficeInquiry
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "office_code", output.office_code)
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "office_code", e.target.value)
                          }}
                        />
                      }
                    </div>
                    <span hidden={!record.id}>{record.office_code}</span>
                  </div>
                )
              }} />

            <Table.Column title="支社店"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginRight: 7, float: 'left' }} hidden={record.id}>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span>{record.branch_store_code}</span>
                        :
                        <InputNumber hidden={record.id} className='custom-input-number' style={{ paddingRight: '25px' }} value={record.v4_branch_store_code} maxLength={4}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "branch_store_code", e === 0 ? null : e)
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "OfficeDivision", (!record.office_code && (record.branch_store_code === 0 || !record.branch_store_code)) ? '【　共　通　】' : '')
                          }}
                        />
                      }
                    </div>
                    <span hidden={!record.id}>{record.branch_store_code}</span>
                  </div>
                )
              }} />
            <Table.Column title="事  業  所  名" dataIndex="OfficeDivision" key="" />
            <Table.Column title="健診コース"
              render={(value, record, index) => {
                return (
                  <div>
                    <div style={{ marginRight: 7, float: 'left' }}>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span>{record.medical_exam_course}</span>
                        :
                        <Input.Search value={record.medical_exam_course} maxLength={3} style={{ width: 80 }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS0265001_BasicCourseInquiry
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "medical_exam_course", output.Lo_CourseCode)
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "MedicalExamCourseName", output.Lo_CourseName)
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "medical_exam_course", e.target.value)
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "MedicalExamCourseName", !e.target.value ? '【　デフォルト　】' : '')
                          }}
                        />
                      }
                    </div>
                    <span>{record.MedicalExamCourseName}</span>
                  </div>
                )
              }} />
            <Table.Column title="判定"
              render={(value, record, index) => {
                return (
                  <div>
                    <div style={{ marginRight: 7, float: 'left' }}>
                      <Input value={record.judgement} maxLength={3} style={{ width: 80 }}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "judgement", e.target.value)
                        }}
                      />
                    </div>
                  </div>
                )
              }} />
            <Table.Column title="印　刷　様　式"
              render={(value, record, index) => {
                return (
                  <div>
                    <div style={{ marginRight: 7, float: 'left' }}>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span>{record.style}</span>
                        :
                        <Input.Search value={record.style} maxLength={3} style={{ width: 80 }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 600,
                                component: (
                                  <WS0458009_PrintStyleInquiry
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "style", output.Lo_StyleCode)
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "format_name", output.Lo_FormatName)
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "style", e.target.value)
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "format_name", '')
                          }}
                        />
                      }
                    </div>
                    <span>{record.format_name}</span>
                  </div>
                )
              }} />
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
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ||
                      (!(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].office_code) &&
                        !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].branch_store_code) &&
                        !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].medical_exam_course) &&
                        !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].style))}
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
              render={(key, row) => {
                return (
                  <Button type="primary"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '600px',
                          component: (
                            < WS0458009_PrintStyleInquiry
                              Li_parentScreen={""}
                              onFinishScreen={({ Lo_StyleCode, Lo_FormatName }) => {

                                this.closeModal()
                              }}
                            />
                          ),
                        },
                      })
                    }} >照会</Button>
                )
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0458004_StyleSetting);
