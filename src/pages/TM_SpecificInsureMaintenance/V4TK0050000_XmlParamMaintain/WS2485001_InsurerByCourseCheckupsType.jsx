import React from "react";
import { connect } from "react-redux";

import { Card, Input, message, Table, Modal, Button, Menu } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS1290001_InsurerNumberInquiry from 'pages/TK_SpecificMedicalExamination/V4TK0200003_ConsultTicketInputProcessList/WS1290001_InsurerNumberInquiry.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS2485002_MedicalExamTypeQuery from 'pages/TM_SpecificInsureMaintenance/V4TK0050000_XmlParamMaintain/WS2485002_MedicalExamTypeQuery.jsx';
import InsurerByCourseCheckupsTypeAction from "redux/SpecificInsureMaintenance/XmlParamMaintain/InsurerByCourseCheckupsType.action";
import WS2485003_MedicalExamTypeMaintain from 'pages/TM_SpecificInsureMaintenance/V4TK0050000_XmlParamMaintain/WS2485003_MedicalExamTypeMaintain.jsx';
class WS2485001_InsurerByCourseCheckupsType extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '保険者別コース健診種別';

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
      old_insurer_code: null,
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getScreenData();
  }

  getScreenData() {
    this.setState({ isLoadingTable: true })
    InsurerByCourseCheckupsTypeAction.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
          indexTable: 0,
          old_insurer_code: res && res.length > 0 ? res[0].insurer_code : null
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateData(index) {
    let params = { ...this.state.dataSource[index] }
    if (this.checkDuplicateCode()) {
      message.warning('保険者番号 複製 !!');
    } else {
      InsurerByCourseCheckupsTypeAction.createAndUpdateData(params)
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
        InsurerByCourseCheckupsTypeAction.deleteData(params)
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
    const uniqueValues = new Set(lstData.map(v => v.insurer_code));

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
      let index = this.state.dataSource.findIndex(x => !x.insurer_code || !x.medical_exam_type);
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
          this.state.rowSelected[0].insurer_code !== this.state.old_insurer_code)) {
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

  async handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    data.splice(0, 1);
    await this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : [],
      old_insurer_code: data.length > 0 ? data[0].insurer_code : null,
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
    const current = this.state.current;
    return (
      <div className="insurer-by-course-checkups-type">
        <Card title="保険者別コース健診種別">
        <Menu selectedKeys={[current]} mode="horizontal" className="mb-3">
            <Menu.Item
              key="健診種別"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 550,
                    component: (
                      <WS2485003_MedicalExamTypeMaintain
                        onFinishScreen={(output) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              健診種別
            </Menu.Item>
          </Menu>
          
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            rowKey={(record) => record.id}
            scroll={{x: 900}}
            bordered
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
            <Table.Column title="保険者番号" dataIndex="insurer_code" width={150}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <Input value={record.insurer_code} readOnly
                        style={{ border: 'none', background: 'transparent' }}
                      />
                      :
                      <Input.Search value={record.insurer_code} maxLength={8} readOnly
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (
                                <WS1290001_InsurerNumberInquiry
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "insurer_code", output.recordData[0].insurer_number);
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "insurer_kanji_name", output.recordData[0].insurer_kanji_name);

                                    this.closeModal();
                                  }}
                                />),
                            },
                          })
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="保険者名" dataIndex="insurer_kanji_name" />
            <Table.Column title="コース" dataIndex="consultation_course" width={100}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <Input value={record.consultation_course} readOnly
                        style={{ border: 'none', background: 'transparent' }}
                      />
                      :
                      <Input.Search value={record.consultation_course} maxLength={8} readOnly
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "consultation_course", output.recordData.course_code);

                                    this.closeModal();
                                  }}
                                />),
                            }
                          })
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="健診種別" dataIndex="medical_exam_type" width={100}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <Input value={record.medical_exam_type} readOnly
                        style={{ border: 'none', background: 'transparent' }}
                      />
                      :
                      <Input.Search value={record.medical_exam_type} maxLength={8} readOnly
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '80%',
                              component: (
                                <WS2485002_MedicalExamTypeQuery
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "medical_exam_type", output.recordData.medical_exam_type);
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "medical_exam_type_name", output.recordData.medical_exam_type_name);

                                    this.closeModal();
                                  }}
                                />),
                            }
                          })
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="健診種別名称" dataIndex="medical_exam_type_name" />
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
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() || 
                            !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].insurer_code)}
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

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2485001_InsurerByCourseCheckupsType);
