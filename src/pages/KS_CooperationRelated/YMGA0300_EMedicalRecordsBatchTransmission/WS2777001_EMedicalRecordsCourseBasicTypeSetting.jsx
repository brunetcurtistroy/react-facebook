import React from "react";
import { connect } from "react-redux";

import { Card, Table, Select, Input, Modal, message, InputNumber, Button, Space } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS0286001_PrintStyleInquiry from 'pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0286001_PrintStyleInquiry.jsx';
import WS2778001_EMedicalRecordsInspectRequestMaintain from "../YMGA0610_EMedicalRecordsInspectRequestMaintain/WS2778001_EMedicalRecordsInspectRequestMaintain";
import WS2777008_ContractInfoList from 'pages/KS_CooperationRelated/YMGA0300_EMedicalRecordsBatchTransmission/WS2777008_ContractInfoList.jsx';

import EMedicalRecordsCourseBasicTypeSettingAction from "redux/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsCourseBasicTypeSetting.action";
class WS2777001_EMedicalRecordsCourseBasicTypeSetting extends React.Component {

  constructor(props) {
    super(props);
    // document.title = '[E-カルテ]コース基本種別設定';
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
      old_course_code: null,

      lstReservation: [],
      lstPatternCode: [],
      lstJudgment: [],
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getScreenData();
    this.getDataTable()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
      this.getDataTable()
    }
  }

  getScreenData() {
    EMedicalRecordsCourseBasicTypeSettingAction.getScreenData()
      .then((res) => {
        this.setState({
          lstReservation: res ? res.FQ_ComboBox : [],
          lstPatternCode: res ? res.FT_ComboBox : [],
          lstJudgment: res ? res.FU_ComboBox : [],
        })
      })
  }

  getDataTable() {
    this.setState({ isLoadingTable: true })
    EMedicalRecordsCourseBasicTypeSettingAction.getDataTable()
      .then((res) => {
        let data = res ? res : []
        let indexFil = data.findIndex(x => x.course_code === this.state.old_course_code)

        let index = indexFil > -1 ? indexFil : 0

        this.setState({
          dataSource: data,
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [data[index]] : [],
          selectedRowKeys: res && res.length > 0 ? [data[index].id] : [],
          indexTable: index,
          old_course_code: res && res.length > 0 ? data[index].course_code : null
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }


  createAndUpdateData(index) {
    let params = { ...this.state.dataSource[index] }
    let old_course_code = this.state.dataSource[index].course_code

    if (this.checkDuplicateCode()) {
      message.warning('ｺｰｽ 複製 !!');
    } else {
      EMedicalRecordsCourseBasicTypeSettingAction.createAndUpdate(params)
        .then(async (res) => {
          message.success('更新しました。!')

          await this.setState({
            old_course_code: old_course_code
          })
          this.getDataTable();
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
        EMedicalRecordsCourseBasicTypeSettingAction.delete(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataTable();
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

  ///
  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];
    const uniqueValues = new Set(lstData.map(v => (v.course_code)));
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
      let index = this.state.dataSource.findIndex(x => !x.course_code);
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
          this.state.rowSelected[0].course_code !== this.state.old_course_code)) {
        return true;
      } return false;
    } return false;
  }

  // add new record
  async handleAddRowTable() {
    let newRow = {
      id: '',
      medical_exam_dates: 1,
      judgment_level_division: this.state.lstJudgment.length > 0 ? this.state.lstJudgment[0].LinkedField : '',
    };

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
      old_course_code: data.length > 0 ? data[0].course_code : null,
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
      <div className="e-medical-records-course-basic-type-setting">
        <Card title="[E-カルテ]コース基本種別設定" className='mb-3'>
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '90%',
                    component: (
                      <WS2778001_EMedicalRecordsInspectRequestMaintain
                        onFinishScreen={() => {

                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}
            >検査依頼保守</Button>
            {/* MH WS2777008_ContractInfoList Rejected */}
            {/* <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '90%',
                    component: (
                      <WS2777008_ContractInfoList
                        onFinishScreen={() => {

                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}
              >契約内容</Button> */}
          </Space>
        </Card>
        <Card>

          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            bordered
            rowKey={(record) => record.id}
            scroll={{ x: 1500, y: 600 }}
            rowSelection={{
              type: "radio",
              fixed:'left',
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                let index = this.state.dataSource.findIndex(x => x.id === record.id)
                this.setState({
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                  indexTable: index,
                  old_course_code: record.course_code,
                });
                this.changeRow(index)
              },
            }}
          >
            <Table.Column title="ｺｰｽ" dataIndex="course_code" width={70}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{record.course_code}</span>
                      :
                      <Input maxLength={3} value={record.course_code}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "course_code", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="コース略称" dataIndex="course_name_short_name"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{record.course_name_short_name}</span>
                      :
                      <Input maxLength={80} value={record.course_name_short_name}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "course_name_short_name", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="コース名称" dataIndex="course_name_formal"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{record.course_name_formal}</span>
                      :
                      <Input maxLength={80} value={record.course_name_formal}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "course_name_formal", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="予約項目" dataIndex="reservation_display_item_number" width={90}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{this.state.lstReservation.find(x => x.LinkedField === record.reservation_display_item_number)?.DisplayField}</span>
                      :
                      <Select style={{ width: '80px' }} value={record.reservation_display_item_number}
                        onChange={(value) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "reservation_display_item_number", value)
                        }}>
                        <Select.Option value={0}> </Select.Option>
                        {this.state.lstReservation?.map(value => (
                          <Select.Option key={"Reservation_" + Math.random()} value={value.LinkedField}>{value.DisplayField ? value.DisplayField : ' '}</Select.Option>
                        ))}
                      </Select>
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="Ｅ-カルテ" dataIndex="Course" width={90}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{record.Course}</span>
                      :
                      <Input maxLength={30} value={record.Course}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Course", e.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="ﾗﾍﾞﾙ" dataIndex="specimen_label_number" width={80}
              render={(value, record, index) => {
                return (
                  <div style={{textAlign: 'right'}}>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{record.specimen_label_number === 0 ? '' : record.specimen_label_number}</span>
                      :
                      <InputNumber className='custom-input-number' style={{ width: '100%' }}  maxLength={3} value={record.specimen_label_number === 0 ? '' : record.specimen_label_number}
                        onChange={(value) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "specimen_label_number", value)
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="日数" dataIndex="medical_exam_dates" width={70}
              render={(value, record, index) => {
                return (
                  <div style={{textAlign: 'right'}}>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{record.medical_exam_dates === 0 ? '' : record.medical_exam_dates}</span>
                      :
                      <InputNumber className='custom-input-number' style={{ width: '100%'}} maxLength={2} value={record.medical_exam_dates === 0 ? '' : record.medical_exam_dates}
                        onChange={(value) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "medical_exam_dates", value)
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="ﾊﾟﾀｰﾝ" dataIndex="pattern_code" width={140}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{this.state.lstPatternCode.find(x => x.LinkedField === record.pattern_code)?.DisplayField}</span>
                      :
                      <Select style={{ width: '130px' }} value={record.pattern_code}
                        onChange={(value) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "pattern_code", value)
                        }}>
                        <Select.Option value=''> </Select.Option>
                        {this.state.lstPatternCode?.map(value => (
                          <Select.Option key={"PatternCode_" + Math.random()} value={value.LinkedField}>{value.DisplayField ? value.DisplayField : ' '}</Select.Option>
                        ))}
                      </Select>
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="判定ﾚﾍﾞﾙ" dataIndex="judgment_level_division" width={130}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{this.state.lstJudgment.find(x => x.LinkedField === record.judgment_level_division)?.DisplayField}</span>
                      :
                      <Select style={{ width: '80px' }} value={record.judgment_level_division}
                        onChange={(value) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "judgment_level_division", value)
                        }}>
                        {this.state.lstJudgment?.map(value => (
                          <Select.Option key={"Judgment_" + Math.random()} value={value.LinkedField}>{value.DisplayField ? value.DisplayField : ' '}</Select.Option>
                        ))}
                      </Select>
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="様式" dataIndex="StandardStyle" width={100}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 5 }}>{record.StandardStyle}</span>
                      :
                      <Input.Search maxLength={3} value={record.StandardStyle}
                        onChange={(e) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "StandardStyle", e.target.value)
                        }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '70%',
                              component: (
                                <WS0286001_PrintStyleInquiry
                                  Lio_StyleCode={record.StandardStyle}
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "StandardStyle", output.Lio_StyleCode)
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "format_name", output.Lo_FormatName)

                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="様式名" dataIndex="format_name" />

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
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem()
                      || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].course_code)
                    }
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
          <br />
          <Input.TextArea value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].option_remark : ''} rows={2}
            onChange={(e) => {
              this.updateDatasource(this.state.indexTable, "option_remark", e.target.value)
            }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2777001_EMedicalRecordsCourseBasicTypeSetting);
