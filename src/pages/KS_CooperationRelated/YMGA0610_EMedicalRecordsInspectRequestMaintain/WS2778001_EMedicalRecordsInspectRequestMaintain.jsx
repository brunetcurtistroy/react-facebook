/* eslint-disable array-callback-return */
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Radio, Checkbox, Button, Table, Row, Col, Select, Modal, Space, InputNumber, message, } from "antd";
import WS0104001_CoursesSettingSub from 'pages/KS_CooperationRelated/YMGA0610_EMedicalRecordsInspectRequestMaintain/WS0104001_CoursesSettingSub.jsx';
import WS0087001_InspectListSettingSub from 'pages/KS_CooperationRelated/YMGA0610_EMedicalRecordsInspectRequestMaintain/WS0087001_InspectListSettingSub.jsx';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS2778002_ExtractConfirm from 'pages/KS_CooperationRelated/YMGA0610_EMedicalRecordsInspectRequestMaintain/WS2778002_ExtractConfirm.jsx';
import { debounce } from "lodash";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import EMedicalRecordsInspectRequestMaintainAction from "redux/CooperationRelated/EMedicalRecordsInspectRequestMaintain/EMedicalRecordsInspectRequestMaintain.action";

import './WS2778001_EMedicalRecordsInspectRequestMaintain.scss';
import WS2779001_EMedicalRecordsTransmissionHeaderMaintain from "../YMGA0300_EMedicalRecordsBatchTransmission/WS2779001_EMedicalRecordsTransmissionHeaderMaintain";
import WS2777001_EMedicalRecordsCourseBasicTypeSetting from "../YMGA0300_EMedicalRecordsBatchTransmission/WS2777001_EMedicalRecordsCourseBasicTypeSetting";

import scrollIntoView from 'scroll-into-view';

const grid = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
class WS2778001_EMedicalRecordsInspectRequestMaintain extends React.Component {
  formRefSearch = React.createRef();
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '[E-カルテ]検査依頼保守';

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
      old_external_code: null,
      idOld: '',
    };

    this.onFinish = this.onFinish.bind(this);
    this.convertDataRequest = this.convertDataRequest.bind(this)
    this.handleAddRowTable = this.handleAddRowTable.bind(this)
  }

  componentDidMount() {
    this.getDataSearch(true);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataSearch(true);
    }
  }

  getDataSearch(reload) {
    this.setState({ isLoadingtable: true })
    EMedicalRecordsInspectRequestMaintainAction.getDataSearch(this.formRefSearch.current.getFieldValue())
      .then(async (res) => {
        let data = res ? res : []

        let idxOld = this.findIndexByID(data, this.state.idOld)
        let index = reload ? 0 : idxOld

        await this.setState({
          dataSource: data,
          isLoadingTable: false,

          rowSelected: res && res.length > 0 ? [data[index]] : [],
          selectedRowKeys: res && res.length > 0 ? [data[index]?.id] : [],
          indexTable: index,
          idOld: data[index]?.id,
          old_external_code: res && res.length > 0 ? data[index].external_code : null
        })

        this.handleScroll()
      })
      .finally(() => this.setState({ isLoadingtable: false }))
  }

  ///
  checkDuplicateCode() {
    let lstData = [...this.state.dataSource];
    const uniqueValues = new Set(lstData.map(v => (v.external_code)));
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
      let index = this.state.dataSource.findIndex(x => !x.external_code);
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
          this.state.rowSelected[0].external_code !== this.state.old_external_code)) {
        return true;
      } return false;
    } return false;
  }

  // add new record
  async handleAddRowTable() {
    let newRow = {
      id: '',
      ByDateGroup: "",
      Code: "",
      CourseNot: "",
      CourseOr: "",
      DayOfWeek: "",
      InspectAnd: "",
      InspectNot: "",
      InspectOr: "",
      ParentAndChild: "",
      StsImage: false,
      Time: "",
      course_group: "",
      exam_group: "",
      exam_name: '',
      in_out_hospital: "",
      official: '',
      code: '',
      remarks: "",
      short_name: ''
    };

    let data = [...this.state.dataSource];

    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });

    this.handleScroll()
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
      old_external_code: data.length > 0 ? data[0].external_code : null,
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

  convertDataRequest(datas) {
    let result = [];
    for (let i = 0; i < datas.length; i++) {
      result.push(datas[i]);

    }
    datas.map(x => {
      if (x.id?.toString().includes('temp')) {
        x.id = '';
      }
    });
    return result
  }

  callApiAddAndUpdateRecord() {
    let params = this.convertDataRequest(this.state.dataSource);
    EMedicalRecordsInspectRequestMaintainAction.addAndUpdateRecord(params)
      .then((res) => {
        this.getDataSearch(false);
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

  callApiAddAndUpdateRecordOnly(index) {
    let params = { ...this.state.dataSource[index] }
    if (params.id?.toString().includes('temp')) {
      params.id = '';
    }
    EMedicalRecordsInspectRequestMaintainAction.addAndUpdateRecord([params])
      .then(async (res) => {
        await this.setState({
          idOld: res?.data?.id
        })
        this.getDataSearch(false);
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

  callApiDeleteRecord(id) {
    let param = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      title: "削除を行いますか？",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        EMedicalRecordsInspectRequestMaintainAction.deleteRecord(param)
          .then((res) => {
            message.success('正常に削除されました')
            this.getDataSearch(true);
          })
          .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error("エラーが発生しました");
              return;
            }
            message.error(res.data.message);
          });
      },
    });

  }

  onFinish(values) {
    this.callApiAddAndUpdateRecordOnly(this.state.indexTable);
  }

  handleScroll() {
    scrollIntoView(document.querySelector('.scroll-row'), {
      align: {
        top: 0,
        left: 0
      },
    });
  }

  render() {
    return (
      <div className="e-medical-records-inspect-request-maintain">
        <Form ref={this.formRefSearch}
          initialValues={{
            Request: 1,
            MedicalExam: 1,
            Sort: 3
          }}
        >
          <Card title="[E-カルテ]検査依頼保守" className="mb-3">
            <Space>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '90%',
                      component:
                        <WS2779001_EMedicalRecordsTransmissionHeaderMaintain
                          onFinishScreen={() => {
                            this.closeModal()
                          }}
                        />
                      ,
                    },
                  });
                }}
              >送信ヘッダ
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '90%',
                      component:
                        <WS2777001_EMedicalRecordsCourseBasicTypeSetting
                          onFinishScreen={() => {
                            this.closeModal()
                          }}
                        />
                      ,
                    },
                  });
                }}
              >コース設定</Button>
            </Space>
            <hr style={{ margin: '15px 0' }} />
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="Search" style={{ marginBottom: 0 }} >
                  <Input type="text" onChange={debounce(() => this.getDataSearch(true), 300)} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  name="Request"
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox onChange={(event) => {
                    this.formRefSearch.current.setFieldsValue({
                      Request: event.target.checked ? 1 : 0
                    })

                    this.getDataSearch(true);
                  }}>依頼</Checkbox>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  name="MedicalExam"
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox onChange={(event) => {
                    this.formRefSearch.current.setFieldsValue({
                      MedicalExam: event.target.checked ? 1 : 0
                    })
                    this.getDataSearch(true);
                  }}>健診</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Form.Item name="Sort" style={{ marginBottom: 0 }}>
                  <Radio.Group onChange={() => { this.getDataSearch(true) }}>
                    <Radio value={1}>健診順</Radio>
                    <Radio value={2}>依頼順</Radio>
                    <Radio value={3}>分類順</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>

        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card className="mb-3">
            <Table
              size='small'
              rowClassName={(record, index) => (record.id === this.state.idOld ? 'scroll-row' : '')}
              pagination={false}
              dataSource={this.state.dataSource}
              loading={this.state.isLoadingtable}
              rowKey={(record) => record.id}
              bordered={true}
              scroll={{ x: 1200, y: 500 }}
              rowSelection={{
                fixed: 'left',
                type: "radio",
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows) => {
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  this.setState({
                    rowSelected: selectedRows,
                    selectedRowKeys: selectedRows.map(x => x.id),
                    indexTable: index,
                    old_external_code: record.external_code,
                  });
                  this.changeRow(index)
                },
              }}
            >
              <Table.Column title="外部検査" dataIndex="external_code" width={100}
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <div style={{ paddingLeft: 7 }}>{record.external_code}</div>
                        :
                        <Input maxLength={20} value={record.external_code}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "external_code", e.target.value)
                          }}
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="外部略称" dataIndex="short_name"
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 7 }}>{record.short_name}</span>
                        :
                        <Input maxLength={20} value={record.short_name}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "short_name", e.target.value)
                          }}
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="外部正式" dataIndex="official"
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 7 }}>{record.official}</span>
                        :
                        <Input value={record.official}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "official", e.target.value)
                          }}
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="健診検査" width={'20%'}
                render={(value, record, index) => {
                  return (
                    <Space>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <div style={{ paddingRight: 7, width: 70, textAlign: 'right' }}>{record.exam_code === 0 ? '' : record.exam_code}</div>
                        :
                        <InputNumber maxLength={8} min={0} style={{ width: 70 }}
                          value={record.exam_code === 0 ? '' : record.exam_code}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 900,
                                component:
                                  <WS0271001_InspectItemSearchQuerySingle
                                    Lio_InspectItemCode={record.exam_code}
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_code", output.recordData.test_item_code);
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_name", output.recordData.exam_name);
                                      if (!record.official) {
                                        this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "official", output.recordData.exam_name)
                                      };
                                      this.forceUpdate()
                                      this.closeModal()
                                    }}
                                  />
                                ,
                              },
                            });
                          }}

                          onChange={(value) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_code", value);
                          }}
                        />
                      }
                      <span style={{ paddingLeft: 5 }}>{record.exam_name}</span>
                    </Space>
                  )
                }}
              />
              <Table.Column title="分割" dataIndex="exam_group"
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 5 }}>{record.exam_group}</span>
                        :
                        <Input maxLength={20} value={record.exam_group}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "exam_group", e.target.value)
                          }}
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="条件" dataIndex="expression_38" width={40} align='center'
                render={(value, record, index) => {
                  return (
                    <span>{record.expression_38}</span>
                  )
                }}
              />
              <Table.Column title="コース群" dataIndex="course_group"
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 5 }}>{record.course_group}</span>
                        :
                        <Input maxLength={20} value={record.course_group}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "course_group", e.target.value)
                          }}
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="画像" dataIndex="StsImage" width={45}
                render={(value, record, index) => {
                  return (
                    <div style={{ textAlign: 'center' }}>
                      <Checkbox checked={record.StsImage} disabled={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)}
                        onChange={(event) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "StsImage", event.target.checked);
                        }}>
                      </Checkbox>
                    </div>
                  )
                }}
              />
              <Table.Column title="時刻" dataIndex="Time" width={65}
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 5 }}>{record.Time}</span>
                        :
                        <Select style={{ width: '100%' }} value={record.Time}
                          onChange={(value) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "Time", value)
                          }}>
                          <Select.Option value=""> </Select.Option>
                          <Select.Option value="AM">AM</Select.Option>
                          <Select.Option value="PM">PM</Select.Option>
                        </Select>
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="親子" dataIndex="ParentAndChild" width={60}
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 5 }}>{record.ParentAndChild === '0' ? '親' : (record.ParentAndChild === '1' ? '子' : '')}</span>
                        :
                        <Select style={{ width: '100%' }} value={record.ParentAndChild}
                          onChange={(value) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "ParentAndChild", value)
                          }}>
                          <Select.Option value=""> </Select.Option>
                          <Select.Option value={'0'}>親</Select.Option>
                          <Select.Option value={'1'}>子</Select.Option>
                        </Select>
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="SEQ" dataIndex="seq" width={75}
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <div style={{ paddingRight: 7, textAlign: 'right' }}>{record.seq === 0 ? '' : record.seq}</div>
                        :
                        <InputNumber min={0} maxLength={6} value={record.seq === 0 ? '' : record.seq}
                          onChange={(value) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "seq", value)
                          }}
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="グループ" dataIndex="ByDateGroup" width={110}
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                        <span style={{ paddingLeft: 5 }}>{record.ByDateGroup}</span>
                        :
                        <Input maxLength={30} value={record.ByDateGroup}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "ByDateGroup", e.target.value)
                          }}
                        />
                      }
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
                      hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem()
                        || !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].external_code)
                      }
                      onClick={() => { this.callApiAddAndUpdateRecordOnly(this.findIndexByID(this.state.dataSource, record.id)) }}
                      style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                      icon={<SaveOutlined />} >
                    </Button>
                    <Button size='small' style={{ border: 'none' }}
                      onClick={() => {
                        this.checkIdTemp(record.id) ? this.handleDeleteRowTable() : this.callApiDeleteRecord(record.id)
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
          <Card >
            <Row gutter={24}>
              <Col span={7}>
                <Form.Item label="○コース" {...grid}
                  style={{ marginBottom: 5 }}>
                  <Input.Search type="text" value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].CourseOr : ''}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component:
                            <WS0104001_CoursesSettingSub
                              Li_Title={'対象コースの設定'}
                              Lio_CourseList={this.state.dataSource[this.state.indexTable].CourseOr}
                              onFinishScreen={({ Lio_CourseList }) => {
                                // let data = output.map(x => x.W1_course_cd);
                                // let result = data.toString();
                                this.updateDatasource(this.state.indexTable, "CourseOr", Lio_CourseList);
                                this.closeModal()
                              }}
                            />
                          ,
                        },
                      });
                    }}
                    onChange={(event) => {
                      this.updateDatasource(this.state.indexTable, "CourseOr", event.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item label="×コース" {...grid}>
                  <Input.Search type="text" value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].CourseNot : ''}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component:
                            <WS0104001_CoursesSettingSub
                              Li_Title={'対象外コースの設定'}
                              Lio_CourseList={this.state.dataSource[this.state.indexTable].CourseNot}
                              onFinishScreen={({ Lio_CourseList }) => {
                                // let data = output.map(x => x.W1_course_cd);
                                // let result = data.toString();
                                this.updateDatasource(this.state.indexTable, "CourseNot", Lio_CourseList);
                                this.closeModal()
                              }}
                            />
                          ,
                        },
                      });
                    }}
                    onChange={(event) => {
                      this.updateDatasource(this.state.indexTable, "CourseNot", event.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="〇検 査" {...grid}
                  style={{ marginBottom: 5 }}>
                  <Input.Search type="text" value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].InspectOr : ''}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component:
                            <WS0087001_InspectListSettingSub
                              Li_Title={''}
                              Lio_ExamList={this.state.dataSource[this.state.indexTable].InspectOr}
                              InspectOr={this.state.dataSource[this.state.indexTable].InspectOr}
                              onFinishScreen={(output) => {
                                this.updateDatasource(this.state.indexTable, "InspectOr", output.Lio_ExamList);
                                this.closeModal()
                              }}
                            />
                          ,
                        },
                      });
                    }}
                    onChange={(event) => {
                      this.updateDatasource(this.state.indexTable, "InspectOr", event.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item label="×検 査" {...grid}>
                  <Input.Search type="text" value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].InspectNot : ''}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component:
                            <WS0087001_InspectListSettingSub
                              Li_Title={''}
                              Lio_ExamList={this.state.dataSource[this.state.indexTable].InspectNot}
                              InspectOr={this.state.dataSource[this.state.indexTable].InspectNot}
                              onFinishScreen={(output) => {
                                this.updateDatasource(this.state.indexTable, "InspectNot", output.Lio_ExamList);
                                this.closeModal()
                              }}
                            />
                          ,
                        },
                      });
                    }}
                    onChange={(event) => {
                      this.updateDatasource(this.state.indexTable, "InspectNot", event.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="〇検査AND" {...grid}
                  style={{ marginBottom: 5 }}>
                  <Input.Search type="text" value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].InspectAnd : ''}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component:
                            <WS0087001_InspectListSettingSub
                              Li_Title={''}
                              Lio_ExamList={this.state.dataSource[this.state.indexTable].InspectAnd}
                              InspectOr={this.state.dataSource[this.state.indexTable].InspectAnd}
                              onFinishScreen={(output) => {
                                this.updateDatasource(this.state.indexTable, "InspectAnd", output.Lio_ExamList);
                                this.closeModal()
                              }}
                            />
                          ,
                        },
                      });
                    }}
                    onChange={(event) => {
                      this.updateDatasource(this.state.indexTable, "InspectAnd", event.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item label='曜日指定' {...grid}>
                  <div style={{ display: 'inline' }}>
                    <Form.Item style={{ width: '20%', float: 'left', marginRight: '15px' }}>
                      <Select value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].DayOfWeek : ''}
                        onChange={(value) => {
                          this.updateDatasource(this.state.indexTable, "DayOfWeek", value);
                        }}>
                        <Select.Option value=''> </Select.Option>
                        <Select.Option value={'1'}>日</Select.Option>
                        <Select.Option value={'2'}>月</Select.Option>
                        <Select.Option value={'3'}>火</Select.Option>
                        <Select.Option value={'4'}>水</Select.Option>
                        <Select.Option value={'5'}>木</Select.Option>
                        <Select.Option value={'6'}>金</Select.Option>
                        <Select.Option value={'7'}>土</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="院内外" style={{ width: '35%', float: 'left', marginRight: '15px' }}>
                      <Select value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].in_out_hospital : ''}
                        onChange={(value) => {
                          this.updateDatasource(this.state.indexTable, "in_out_hospital", value);
                        }}>
                        <Select.Option value=""> </Select.Option>
                        <Select.Option value="1">院内</Select.Option>
                        <Select.Option value="2">院外</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="送信コード" style={{ width: '35%' }}>
                      <Input type="text"
                        onChange={(event) => {
                          this.updateDatasource(this.state.indexTable, "Code", event.target.value);
                        }} />
                    </Form.Item>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24} className="mb-3" style={{ margin: 0 }}>
              <Input.TextArea value={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].remarks : ''} rows={2}
                onChange={(e) => {
                  this.updateDatasource(this.state.indexTable, "remarks", e.target.value)
                }}
              />
            </Row>
            <Space style={{ float: "right" }}>
              <Button type="primary" htmlType='submit' style={{ marginBottom: "10px" }}
                icon={<SaveOutlined />}
              >保存</Button>
              <Button type="primary" style={{ marginBottom: "10px" }}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 450,
                      component:
                        <WS2778002_ExtractConfirm
                          onFinishScreen={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: false,
                              },
                            });
                          }}
                        />
                      ,
                    },
                  });
                }}
              >再送信</Button>
            </Space>
          </Card>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2778001_EMedicalRecordsInspectRequestMaintain);
