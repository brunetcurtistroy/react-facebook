import React from "react";
import PropTypes from 'prop-types';

import { Card, Table, Input, Modal, Button, message, InputNumber } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS0457009_PrintStyleInquiry from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS0457009_PrintStyleInquiry.jsx';
import WS0457008_OfficeInquiry from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS0457008_OfficeInquiry.jsx';
import StyleSettingAction from "redux/ResultOutput/ResultsTblCollectOutput/StyleSetting.action";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";

class WS0457004_StyleSetting extends React.Component {
  static propTypes = {
    PatternClassify: PropTypes.any,
  };

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
    this.getDataTable(true);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.getDataTable(true);
    }
  }


  getDataTable(reload) {
    let params = {
      PatternClassify: this.props.PatternClassify || ''
    }
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
        v4_branch_store_code: this.state.dataSource[index].v4_branch_store_code,
        OfficeDivision: this.state.dataSource[index].OfficeDivision,
        medical_exam_course: this.state.dataSource[index].medical_exam_course,
        MedicalExamCourseName: this.state.dataSource[index].MedicalExamCourseName,
        standard_printing_style_01: this.state.dataSource[index].standard_printing_style_01,
        format_name: this.state.dataSource[index].format_name,
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
      let index = this.state.dataSource.findIndex(x => !x.office_code && !x.v4_branch_store_code && !x.medical_exam_course && !x.standard_printing_style_01);
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

  run_F12() {
    let params = {
      PatternClassify: this.props.PatternClassify || ''
    }

    Modal.warning({
      width: 200,
      title: '処理終了',
      okText: 'は　い',
      onOk: () => {
        StyleSettingAction.run_F12(params)
          .then(res => {
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
    })
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
            <Table.Column title="事業所ｺｰﾄﾞ" dataIndex="office_code" width={100}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || record.id ?
                      <span style={{ paddingRight: '7px' }}>{record.office_code}</span>
                      :
                      <Input.Search style={{ textAlign: 'right' }} value={record.office_code} maxLength={4}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '600px',
                              component: (
                                <WS0457008_OfficeInquiry
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "office_code", output.Lo_OfficeCode)
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "v4_branch_store_code", output.Lo_BranchStoreCode === 0 ? null : output.Lo_BranchStoreCode)
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "OfficeDivision", output.Lo_office_kanji_name)
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "office_code", e.target.value)
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "OfficeDivision", (!e.target.value && (record.v4_branch_store_code === 0 || !record.v4_branch_store_code)) ? '【　共　通　】' : '')
                        }}
                      />
                    }
                  </div>
                )
              }} />
            <Table.Column title="支社店" dataIndex="v4_branch_store_code" width={70}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || record.id ?
                      <span style={{ paddingRight: 7 }}>{record.v4_branch_store_code === 0 ? '' : record.v4_branch_store_code}</span>
                      :
                      <InputNumber  value={record.v4_branch_store_code} maxLength={4}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "v4_branch_store_code", e === 0 ? null : e)
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "OfficeDivision", (!record.office_code && (record.v4_branch_store_code === 0 || !record.v4_branch_store_code)) ? '【　共　通　】' : '')
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="事  業  所  名" dataIndex="OfficeDivision" />
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
            <Table.Column title="印　刷　様　式"
              render={(value, record, index) => {
                return (
                  <div>
                    <div style={{ marginRight: 7, float: 'left' }}>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span>{record.standard_printing_style_01}</span>
                        :
                        <Input.Search value={record.standard_printing_style_01} maxLength={3} style={{ width: 80 }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 600,
                                component: (
                                  <WS0457009_PrintStyleInquiry
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "standard_printing_style_01", output.Lo_StyleCode)
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "format_name", output.Lo_FormatName)
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "standard_printing_style_01", e.target.value)
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
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() ||
                      (!(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].office_code) &&
                        !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].v4_branch_store_code) &&
                        !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].medical_exam_course) &&
                        !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].standard_printing_style_01))}
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
          <br></br>
          <Button type="primary" style={{ float: 'right' }}
            onClick={() => { this.run_F12() }} >標準取込</Button>
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

export default WS0457004_StyleSetting;
