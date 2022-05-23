import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Row, Col, Select, Input, Modal, message, Checkbox, Button, InputNumber } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';

import EMedicalRecordsTransmissionHeaderMaintainAction from "redux/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsTransmissionHeaderMaintain.action";
import axios from "axios";

const style = {
  label: {
    width: 85, paddingRight: 10, textAlign: 'right', paddingBottom: 5
  },

  block: {
    padding: 10, border: '1px solid #d9d9d9', marginBottom: 10
  }
}
class WS2779001_EMedicalRecordsTransmissionHeaderMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '[E-カルテ]送信ヘッダ保守';

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
      old_serial_number: null,
      old_name: null,
      old_enabled: null,

      facilityTypes: [],
      coursesData: []
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.loadCourses();
    this.getFacilityTypes();
    this.getDataTable()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadCourses();
      this.getFacilityTypes();
      this.getDataTable()
    }
  }

  getFacilityTypes() {
    EMedicalRecordsTransmissionHeaderMaintainAction.getScreenData()
      .then((res) => {
        this.setState({
          facilityTypes: res ? res.ComboBox_Facility_Type : []
        })
      })
  }

  getDataTable() {
    this.setState({ isLoadingTable: true })
    EMedicalRecordsTransmissionHeaderMaintainAction.getListData()
      .then((res) => {
        let data = res ? res : []
        let indexFil = data.findIndex(x => x.serial_number === this.state.old_serial_number && x.name === this.state.old_name)

        let index = indexFil > -1 ? indexFil : 0

        this.setState({
          dataSource: data,
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [data[index]] : [],
          selectedRowKeys: res && res.length > 0 ? [data[index].id] : [],
          indexTable: index,
          old_serial_number: res && res.length > 0 ? data[index].serial_number : null,
          old_name: res && res.length > 0 ? data[index].name : null,
          old_enabled: res && res.length > 0 ? data[index].enabled : null,
        })

        this.formRef.current?.setFieldsValue(data.length > 0 ? data[index] : null)
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  createAndUpdateData(index) {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      enabled: this.state.dataSource[index].enabled ? 1 : 0,
      serial_number: this.state.dataSource[index].serial_number,
      name: this.state.dataSource[index].name
    }
    let old_serial_number = this.state.dataSource[index].serial_number
    let old_name = this.state.dataSource[index].name

    if (this.checkDuplicateCode()) {
      message.warning('複製 !!');
    } else {
      EMedicalRecordsTransmissionHeaderMaintainAction.saveAndUpdate(params)
        .then(async (res) => {
          message.success('更新しました。!')

          await this.setState({
            old_serial_number: old_serial_number,
            old_name: old_name
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
        EMedicalRecordsTransmissionHeaderMaintainAction.deleteData(params)
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

  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];
    lstData.map(v =>
      v.dup = v.serial_number + '_' + v.name
    )

    const uniqueValues = new Set(lstData.map(v => (v.dup)));
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
      let index = this.state.dataSource.findIndex(x => !x.serial_number || !x.name);
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
          (this.state.rowSelected[0].serial_number !== this.state.old_serial_number || this.state.rowSelected[0].name !== this.state.old_name || this.state.rowSelected[0].enabled !== this.state.old_enabled))) {
        return true;
      } return false;
    } return false;
  }

  // add new record
  async handleAddRowTable() {
    this.formRef.current?.resetFields()
    let newRow = {
      id: '',
      facility_type: this.state.facilityTypes.length > 0 ? this.state.facilityTypes[0].LinkedField : ''
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

      this.formRef.current?.setFieldsValue(data[index])
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
      old_serial_number: data.length > 0 ? data[0].serial_number : null,
      old_name: data.length > 0 ? data[0].name : null,
      old_enabled: data.length > 0 ? data[0].enabled : null
    });
    if (data.length > 0) {
      this.formRef.current?.setFieldsValue(data[0])
    } else {
      this.formRef.current?.resetFields()
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  loadCourses() {
    axios.get('/api/contract-info-batch-process/basic-course-inquiry', {
      params: {
        ShortNameSearch: '',
      },
    })
      .then(res => {
        this.setState({
          coursesData: res.data,
        })
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
  }

  getNameCourse(courseCode) {
    let data = this.state.coursesData.filter(x => x.course_code === courseCode)
    this.formRef.current?.setFieldsValue({
      course_name_formal: data.length > 0 ? data[0].course_name_formal : ''
    })
  }

  render() {
    return (
      <div className="e-medical-records-transmission-header-maintain">
        <Card title='[E-ｶﾙﾃ]送信ﾍｯﾀﾞ保守'>
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Row gutter={24}>
              <Col span={12}>
                <Table
                  size='small'
                  dataSource={this.state.dataSource}
                  loading={this.state.isLoadingTable}
                  pagination={false}
                  rowKey={(record) => record.id}
                  scroll={{ x: 450, y: 600 }}
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
                        old_serial_number: record.serial_number,
                        old_name: record.name,
                        old_enabled: record.enabled
                      });
                      this.changeRow(index)
                    },
                  }}
                >
                  <Table.Column dataIndex="enabled" width={30}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'center' }}>
                          <Checkbox checked={record.enabled}
                            disabled={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                            onChange={(e) => {
                              this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "enabled", e.target.checked)
                            }}>
                          </Checkbox>
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="連番" dataIndex="serial_number" width={95}
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>
                          {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                            <span style={{ paddingLeft: 5, paddingRight: 7 }}>{record.serial_number}</span>
                            :
                            <InputNumber className='custom-input-number' maxLength={5} value={record.serial_number} style={{ width: '100%' }}
                              onChange={(value) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "serial_number", value)
                              }}
                            />
                          }
                        </div>
                      )
                    }}
                  />
                  <Table.Column title="名称" dataIndex="name"
                    render={(value, record, index) => {
                      return (
                        <div>
                          {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                            <span style={{ paddingLeft: 5 }}>{record.name}</span>
                            :
                            <Input maxLength={30} value={record.name} style={{ padding: '0px 4px' }}
                              onChange={(event) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "name", event.target.value)
                              }}
                            />
                          }
                        </div>
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
                          hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem()
                            || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].serial_number)
                            || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].name)
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
              </Col>

              <Col span={12}>
                <div style={style.block}>
                  <Row>
                    <label style={style.label}>事業所</label>
                    <Form.Item style={{ width: '120px', marginRight: 10, marginBottom: 5 }} name="office_code">
                      <Input.Search maxLength={8} style={{ textAlign: 'right' }}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '70%',
                              component: (
                                <WS0247001_OfficeInfoRetrievalQuery
                                  onFinishScreen={(output) => {
                                    this.formRef.current?.setFieldsValue({
                                      office_code: output.Lio_OfficeCode,
                                      office_kanji_name: output.Lo_Kanji_Name
                                    })
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          })
                        }} />
                    </Form.Item>
                    <Form.Item style={{ width: 'calc(100% - 215px', marginBottom: 5 }} name="office_kanji_name">
                      <Input readOnly style={{ background: 'transparent', border: 'none' }} />
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={style.label}>コース</label>
                    <Form.Item name="course_code" style={{ width: '120px', marginRight: 10, marginBottom: 5 }}>
                      <Input.Search maxLength={3} onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '60%',
                            component: (
                              <WS0265001_BasicCourseInquiry
                                onFinishScreen={(output) => {
                                  this.formRef.current?.setFieldsValue({
                                    course_code: output.Lo_CourseCode,
                                    course_name_formal: output.recordData.course_name_formal
                                  })
                                  this.closeModal()
                                }}
                              />
                            ),
                          },
                        })
                      }}
                        onBlur={(e) => {
                          this.getNameCourse(e.target.value)
                        }}
                      />
                    </Form.Item>
                    <Form.Item style={{ width: 'calc(100% - 215px', marginBottom: 5 }} name="course_name_formal">
                      <Input readOnly style={{ background: 'transparent', border: 'none' }} />
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={style.label}>施　設</label>
                    <Form.Item name="facility_type" style={{ marginBottom: 5 }}>
                      <Select style={{ width: '150px' }}>
                        {this.state.facilityTypes?.map(value => (
                          <Select.Option key={"facilityType_" + Math.random()} value={parseInt(value.LinkedField)}>{value.DisplayField}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Row>
                </div>
                <div style={style.block}>
                  <Row>
                    <label style={style.label}>診療科</label>
                    <Form.Item name="medical_code" style={{ width: '50px', marginRight: 20, marginBottom: 5 }}>
                      <Input maxLength={2} />
                    </Form.Item>
                    <label style={style.label}>診療科名称</label>
                    <Form.Item name="MedicalName" style={{ width: 'calc(100% - 250px', marginBottom: 5 }} >
                      <Input />
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={style.label}>病棟</label>
                    <Form.Item name="ward_code" style={{ width: '50px', marginBottom: 5 }}>
                      <Input maxLength={2} />
                    </Form.Item>
                  </Row>
                </div>
                <div style={style.block}>
                  <Row>
                    <label style={style.label}>医師ｺｰﾄﾞ</label>
                    <Form.Item name="physicians_code" style={{ width: '120px', marginBottom: 5 }}>
                      <Input maxLength={10} />
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={style.label}>カナ氏名</label>
                    <Form.Item name="doctor_kana_name" style={{ width: '200px', marginBottom: 5 }}>
                      <Input maxLength={21} />
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={style.label}>漢字氏名</label>
                    <Form.Item name="doctor_kanji" style={{ width: '200px', marginBottom: 5 }}>
                      <Input maxLength={20} />
                    </Form.Item>
                  </Row>
                </div>
                <div style={style.block}>
                  <Row>
                    <label style={style.label}>入力者ｺｰﾄﾞ</label>
                    <Form.Item name="InputCode" style={{ width: '120px', marginBottom: 5 }}>
                      <Input maxLength={10} />
                    </Form.Item>
                  </Row>
                  <Row>
                    <label style={style.label}>入力者名称</label>
                    <Form.Item name="InputName" style={{ width: '200px', marginRight: 20, marginBottom: 5 }}>
                      <Input maxLength={21} />
                    </Form.Item>
                    <label style={{ width: '110px', marginRight: '10px' }}>ラベル発行場所</label>
                    <Form.Item name="LabelIssuingLocation" label="" style={{ width: 'calc(100% - 425px)', marginBottom: 5 }} >
                      <Input maxLength={1} style={{ width: '25px' }} />
                    </Form.Item>
                  </Row>
                </div>
                <div style={style.block}>
                  <Row>
                    <label style={style.label}>コース群</label>
                    <Form.Item name="course_group" style={{ width: '200px', marginBottom: 5 }}>
                      <Input maxLength={20} />
                    </Form.Item>
                  </Row>
                </div>
                <Form.Item name="Remarks">
                  <Input.TextArea rows={4} />
                </Form.Item>
                <div style={{ margin: '20px 0' }}>
                  <Button style={{ float: 'right' }} type="primary"
                    disabled={this.checkAddItem()
                      || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].serial_number)
                      || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].name)
                    }
                    onClick={() => { this.createAndUpdateData(this.state.indexTable) }}
                    icon={<SaveOutlined />} >更新
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2779001_EMedicalRecordsTransmissionHeaderMaintain);
