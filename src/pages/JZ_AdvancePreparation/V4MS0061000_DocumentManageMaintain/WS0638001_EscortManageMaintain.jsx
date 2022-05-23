import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Table, Modal, Upload, Space, Button, message, InputNumber, Tooltip } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';

import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS2592016_ParamPromptedQueryContent from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS2592016_ParamPromptedQueryContent.jsx';
import WS0638013_EscortInquiry from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS0638013_EscortInquiry.jsx';
import WS0638003_FormatQuery from "./WS0638003_FormatQuery";
import WS0397001_ParamPromptedQuerySub from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0397001_ParamPromptedQuerySub.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import Checkbox from "antd/lib/checkbox/Checkbox";
import EscortManageMaintainAction from "redux/AdvancePreparation/DocumentManageMaintain/EscortManageMaintain.action";
import WS0638007_Copy from "./WS0638007_Copy";
import WS0640001_EscortMaintain from "./WS0640001_EscortMaintain";
import Color from "constants/Color";

class WS0638001_EscortManageMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'エスコート管理保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataSource0: [],
      isLoadingTable0: false,
      selectedRowKeys0: [],
      rowSelected0: [],
      indexTable0: 0,
      old_medical_exam_course: null,
      dataSourceOld: [],

      dataSource1: [],
      isLoadingTable1: false,
      selectedRowKeys1: [],
      rowSelected1: [],
      indexTable1: 0,
      old_W1_serial_num: null,
    };
    this.handleAddRowTable = this.handleAddRowTable.bind(this);
    this.handleDeleteRowTable = this.handleDeleteRowTable.bind(this);
  }

  componentDidMount() {
    this.getDataFormat(true);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataFormat(true);
    }
  }

  // Format
  getDataFormat(reload) {
    this.setState({ isLoadingTable0: reload ? true : false })

    let params = {
      Li_Format: this.props.Li_Format 
    }

    EscortManageMaintainAction.getDataFormat(params)
      .then(async (res) => {
        let data = res ? res.Data : []
        let index = reload ? 0 : this.state.indexTable0
        await this.setState({
          dataSource0: data,
          dataSourceOld: data,
          isLoadingTable0: false,

          rowSelected0: res && data.length > 0 ? [data[index]] : [],
          selectedRowKeys0: res && data.length > 0 ? [data[index].id] : [],
          indexTable0: index,
          old_medical_exam_course: res && data.length > 0 ? data[index].medical_exam_course : null,
        })

        this.formRef.current?.setFieldsValue({
          Format: res ? res.Format : ''
        })

        this.getDataOptionInput();

      })
      .finally(() => this.setState({ isLoadingTable0: false }))
  }

  getDataChangeFormat() {
    this.setState({ isLoadingTable0: true })

    let params = {
      Li_Format: this.formRef.current?.getFieldValue('Format')
    }

    EscortManageMaintainAction.getDataChangeFormat(params)
      .then(async (res) => {
        let data = res ? res.Data : []
        await this.setState({
          dataSource0: data,
          dataSourceOld: data,
          isLoadingTable0: false,

          rowSelected0: res && data.length > 0 ? [data[0]] : [],
          selectedRowKeys0: res && data.length > 0 ? [data[0].id] : [],
          indexTable0: 0,
          old_medical_exam_course: res && data.length > 0 ? data[0].medical_exam_course : null,
        })

        this.formRef.current?.setFieldsValue({
          Format: res ? res.Format : ''
        })

        this.getDataOptionInput();

      })
      .finally(() => this.setState({ isLoadingTable0: false }))
  }

  createAndUpdateFormat(index, showMessage) {
    let params = {
      ...this.state.dataSource0[index],
      Format: this.formRef.current?.getFieldValue('Format')
    }
    if (this.checkDuplicateCode('Format')) {
      message.warning('ｺｰｽ 複製 !!');
    } else {
      EscortManageMaintainAction.createAndUpdateFormat(params)
        .then((res) => {
          if (showMessage) {
            message.success('更新しました。!')
            this.getDataFormat(true)
          } else {
            this.getDataFormat(false)
          }
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
  }

  deleteFormat(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: "はい",
      cancelText: "いいえ",
      onOk: () => {
        EscortManageMaintainAction.deleteFormat(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataFormat(true);
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

  // OptionInput
  getDataOptionInput() {
    this.setState({ isLoadingTable1: true })
    let params = {
      ...this.state.rowSelected0[0],
      Format: this.formRef.current?.getFieldValue('Format')
    }

    EscortManageMaintainAction.getDataOptionInput(params)
      .then((resp) => {
        EscortManageMaintainAction.getDataOptionInputDetail()
          .then((res) => {
            this.setState({
              dataSource1: res ? res : [],
              isLoadingTable1: false,

              rowSelected1: res && res.length > 0 ? [res[0]] : [],
              selectedRowKeys1: res && res.length > 0 ? [res[0].id] : [],
              indexTable1: 0,
              old_W1_serial_num: res && res.length > 0 ? res[0].W1_serial_num : null,
            })
          })
          .finally(() => this.setState({ isLoadingTable1: false }))
      })
      .catch((err) => {
        this.setState({ isLoadingTable1: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
  }

  getDataOptionInputDetail() {
    EscortManageMaintainAction.getDataOptionInputDetail()
      .then((res) => {
        this.setState({
          dataSource1: res ? res : [],
          isLoadingTable1: false,

          rowSelected1: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys1: res && res.length > 0 ? [res[0].id] : [],
          indexTable1: 0,
          old_W1_serial_num: res && res.length > 0 ? res[0].W1_serial_num : null,
        })
      })
      .finally(() => this.setState({ isLoadingTable1: false }))
  }

  createAndUpdateOptionInput(index) {
    let params = {
      ...this.state.dataSource1[index],
      // id: this.state.rowSelected0[0].id,
      W1_item_old: '',
      W1_content_old: '',
      Format: this.formRef.current?.getFieldValue('Format')
    }
    if (this.checkDuplicateCode('OptionInput')) {
      message.warning('連番 複製 !!');
    } else {
      EscortManageMaintainAction.createAndUpdateOptionInput(params)
        .then((res) => {
          message.success('更新しました。!')
          this.createAndUpdateFormat(this.state.indexTable0, false)
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
  }

  deleteOptionInput(record) {
    let params = {
      id: record.id,
      W1_item: record.W1_item,
      W1_content: record.W1_content
    }

    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: "はい",
      cancelText: "いいえ",
      onOk: () => {
        EscortManageMaintainAction.deleteOptionInput(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.createAndUpdateFormat(this.state.indexTable0, false)
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

  /////
  checkDuplicateCode(type) {
    let lstData = [];
    if (type === 'Format') {
      lstData = [...this.state.dataSource0];
      const uniqueValues = new Set(lstData.map(v => v.medical_exam_course));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }

    if (type === 'OptionInput') {
      lstData = [...this.state.dataSource1];
      const uniqueValues = new Set(lstData.map(v => v.W1_serial_num));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }
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

  checkAddItem(type) {
    if (type === 'Format') {
      if (this.state.dataSource0.length > 0) {
        let index = this.state.dataSource0.findIndex(x => !x.medical_exam_course);
        if (index === -1) {
          return false;
        }
        return true
      }
    }

    if (type === 'OptionInput') {
      if (this.state.dataSource1.length > 0) {
        let index = this.state.dataSource1.findIndex(x => !x.W1_serial_num);
        if (index === -1) {
          return false;
        }
        return true
      }
    }
  }

  checkDisabledBtnAdd(type) {
    if (type === 'Format') {
      if (this.state.rowSelected0.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.rowSelected0[0].id) ||
          (!this.checkIdTemp(this.state.rowSelected0[0].id) &&
            this.state.rowSelected0[0].medical_exam_course !== this.state.old_medical_exam_course)) {
          return true;
        } return false;
      } return false;
    }

    if (type === 'OptionInput') {
      if (this.state.rowSelected1.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.rowSelected1[0].id) ||
          (!this.checkIdTemp(this.state.rowSelected1[0].id) &&
            this.state.rowSelected1[0].W1_serial_num !== this.state.old_W1_serial_num)) {
          return true;
        } return false;
      } return false;
    }
  }

  // add new record
  async handleAddRowTable(type) {
    let newRow = { id: '' };

    let data = [];

    if (type === 'Format') {
      newRow = { ...newRow }
      data = [...this.state.dataSource0]
      data.unshift(newRow);
      await this.setState({
        dataSource0: data,
        rowSelected0: [newRow],
        selectedRowKeys0: [newRow.id],
        indexTable0: 0
      });

      this.getDataOptionInput()
    }

    if (type === 'OptionInput') {
      data = [...this.state.dataSource1]
      data.unshift(newRow);
      await this.setState({
        dataSource1: data,
        rowSelected1: [newRow],
        selectedRowKeys1: [newRow.id],
        indexTable1: 0
      });
    }
    this.forceUpdate();
  }

  // check selected record while add new
  changeRow(index, type) {
    let data = [];
    if (type === 'Format') {
      data = [...this.state.dataSource0]

      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          rowSelected0: [data[0]],
          selectedRowKeys0: [data[0].id],
          indexTable0: 0
        });
      } else {
        this.setState({
          indexTable0: index
        });
      }
    }

    if (type === 'OptionInput') {
      data = [...this.state.dataSource1]

      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          rowSelected1: [data[0]],
          selectedRowKeys1: [data[0].id],
          indexTable1: 0
        });
      } else {
        this.setState({
          indexTable1: index
        });
      }
    }
  }

  updateDatasource(index, field, value, type) {
    let data = [];

    if (type === 'Format') {
      data = [...this.state.dataSource0]

      data[index][field] = value;

      this.setState({
        dataSource0: data
      });
    }

    if (type === 'OptionInput') {
      data = [...this.state.dataSource1]

      data[index][field] = value;

      this.setState({
        dataSource1: data
      });
    }
  }

  async handleDeleteRowTable(type) {
    let data = [];

    if (type === 'Format') {
      data = [...this.state.dataSource0]

      await data.splice(0, 1);
      await this.setState({
        dataSource0: data, 
        rowSelected0: data.length > 0 ? [data[0]] : [],
        selectedRowKeys0: data.length > 0 ? [data[0].id] : [], 
        indexTable0: 0,
        old_medical_exam_course: data.length > 0 ? data[0].medical_exam_course : null
      });

      this.getDataOptionInput()
    }

    if (type === 'OptionInput') {
      data = [...this.state.dataSource1]

      data.splice(0, 1);
      this.setState({
        dataSource1: data,
        indexTable1: 0,
        rowSelected1: data.length > 0 ? [data[0]] : [],
        selectedRowKeys1: data.length > 0 ? [data[0].id] : [],
        old_W1_serial_num: data.length > 0 ? data[0].W1_serial_num : null
      });
    }
    this.forceUpdate();
  }

  compareObject(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }

  onFinish(values) {

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
      <div className="escort-manage-maintain">
        <Card title="エスコート管理保守" className="mb-3">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 430,
                    component: (
                      <WS0638007_Copy
                        Li_FormatF={this.formRef.current?.getFieldValue('Format')}
                        onFinishScreen={(output) => {
                          this.formRef.current?.setFieldsValue({
                            Format: output.Lo_FormatT
                          })
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                });
              }}
            >複写</Button>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '90%',
                    component: (
                      <WS0640001_EscortMaintain
                        onFinishScreen={() => {
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                });
              }}
            >内容設定</Button>
            <Button>書式設定</Button>
            <Button>印刷</Button>
          </Space>
        </Card>
        <Card>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item name="Format" label="ﾌｫｰﾏｯﾄ" >
              <Input.Search type="text" style={{ width: '150px' }}
                onSearch={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '80%',
                      component: (
                        <WS0638003_FormatQuery
                          Lio_Format={this.formRef.current?.getFieldValue('Format')}
                          onFinishScreen={(output) => {
                            this.formRef.current?.setFieldsValue({
                              Format: output.Lio_Format
                            })
                            this.getDataChangeFormat()
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  })
                }}
                onChange={(e) => {
                  this.formRef.current?.setFieldsValue({
                    Format: e.target.value
                  })
                  this.getDataChangeFormat()
                }}
              />
            </Form.Item>
          </Form>

          <Table className="mb-3"
            style={{ cursor: 'pointer' }}
            rowClassName={(record, index) => record.id === this.state.rowSelected0[0]?.id ? 'table-row-light' : ''}
            size='small'
            dataSource={this.state.dataSource0}
            loading={this.state.isLoadingTable0}
            pagination={false}
            scroll={{ y: 500 }}
            bordered
            rowKey={(res) => res.id}
            onRow={(record, rowIndex) => {
              return {
                onClick: async () => {
                  let index = this.state.dataSource0.findIndex(x => x.id === record.id)
                  await this.setState({
                    rowSelected0: [record],
                    selectedRowKeys0: [record.id],
                    indexTable0: index,
                    old_medical_exam_course: record.medical_exam_course
                  });
                  this.getDataOptionInput()
                }
              };
            }}
          // rowSelection={{
          //   type: 'radio',
          //   selectedRowKeys: this.state.selectedRowKeys0,
          //   onSelect: async (record, selected, selectedRows) => {
          //     let index = this.state.dataSource0.findIndex(x => x.id === record.id)
          //     await this.setState({
          //       rowSelected0: selectedRows,
          //       selectedRowKeys0: selectedRows.map(x => x.id),
          //       indexTable0: index,
          //       old_medical_exam_course: record.medical_exam_course
          //     });
          //     this.getDataOptionInput()
          //   },
          // }}
          >
            <Table.Column title="有効" dataIndex="Expansion" width={45} align="center"
              render={(value, record, index) => {
                return (
                  <Checkbox checked={record.Expansion}
                    disabled={this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id)}
                    onChange={(e) => {
                      this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "Expansion", e.target.checked, 'Format')
                    }}>
                  </Checkbox>
                )
              }}
            />
            <Table.Column title="ｺｰｽ" dataIndex="medical_exam_course" width={100} align="center"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                      <Input value={record.medical_exam_course} readOnly
                        style={{ border: 'none', background: 'transparent' }}
                      />
                      :
                      <Input.Search maxLength={3} value={record.medical_exam_course}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component: (
                                <WS0265001_BasicCourseInquiry
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "medical_exam_course", output.Lo_CourseCode, 'Format')
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "expression_6", output.Lo_CourseName, 'Format')
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          });
                        }}
                        onChange={(event) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "medical_exam_course", event.target.value, 'Format')
                          this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "expression_6", '', 'Format')
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="ｺｰｽ名称" dataIndex="expression_6"
              render={(value, record, index) => {
                return (
                  <span style={{ color: record.Expansion ? Color(210).Foreground : '' }}>{record.expression_6}</span>
                )
              }}
            />
            <Table.Column title="ｴｽｺｰﾄ" dataIndex="escort_code" width={100} align="center"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                      <Input value={record.escort_code} readOnly
                        style={{ border: 'none', background: 'transparent' }}
                      />
                      :
                      <Input.Search value={record.escort_code}
                        onSearch={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 600,
                              component: (
                                <WS0638013_EscortInquiry
                                  Lio_EscortCode={record.escort_code}
                                  onFinishScreen={(output) => {
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "escort_code", output.Lio_EscortCode, 'Format')
                                    this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "escort_name", output.recordData.escort_name, 'Format')
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          });
                        }}

                        onChange={(event) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "escort_code", event.target.value, 'Format')
                          this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "escort_name", '', 'Format')
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="ｴｽｺｰﾄ内容" dataIndex="escort_name" />
            <Table.Column title="書式" dataIndex="format_name" align="center"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                      <Tooltip title={record.format_name}>
                        <Input value={record.format_name} readOnly
                          style={{ border: 'none', background: 'transparent' }}
                        />
                      </Tooltip>
                      :
                      <div>
                        <Input type="text" value={record.format_name}
                          onChange={(e) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "format_name", e.target.value, 'Format')
                          }}

                          addonAfter={<UploadOutlined style={{ color: '#096dd9' }}
                            onClick={() => {
                              document.getElementById("idUpload").click()
                            }}
                          />}
                        />
                        <Upload id="idUpload"
                          accept=".txt,.csv,.xlsx"
                          beforeUpload={(file) => {
                            return new Promise(resolve => {
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onload = () => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "format_name", file.name, 'Format')
                              };
                            });
                          }}><span hidden></span>
                        </Upload>
                      </div>
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="部数" dataIndex="output_number_of_copies" width={65}
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                      <div style={{ textAlign: "right", paddingRight: 7 }}>
                        {record.output_number_of_copies}
                      </div>
                      :
                      <InputNumber maxLength={2} value={record.output_number_of_copies} style={{ width: '100%' }}
                        onChange={(value) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "output_number_of_copies", value, 'Format')
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="曜日" dataIndex="DayWeek" align="center" width={45}
              render={(value, record, index) => {
                return (
                  <Checkbox checked={record.DayWeek}
                    disabled={this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id)}
                    onChange={(e) =>
                      this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "DayWeek", e.target.checked, 'Format')
                    }>
                  </Checkbox>
                )
              }}
            />
            <Table.Column width={70}
              title={
                <div style={{ textAlign: "center" }}>
                  <Button size='small'
                    disabled={this.checkDisabledBtnAdd('Format')}
                    onClick={() => this.handleAddRowTable('Format')}
                    type="primary" icon={<PlusOutlined />}>
                  </Button>
                </div>
              }
              render={(text, record, index) => {
                return <div style={{ textAlign: "center" }}>
                  <Button size='small'
                    hidden={this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) || this.checkAddItem('Format')
                      || !(this.state.dataSource0[this.state.indexTable0] && this.state.dataSource0[this.state.indexTable0].medical_exam_course)}
                    onClick={() => { this.createAndUpdateFormat(this.findIndexByID(this.state.dataSource0, record.id), true) }}
                    style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                    icon={<SaveOutlined />} >
                  </Button>
                  <Button size='small' style={{ border: 'none' }}
                    onClick={() => {
                      this.checkIdTemp(record.id) ? this.handleDeleteRowTable('Format') : this.deleteFormat(record.id)
                    }}
                    danger
                    icon={<DeleteOutlined />}
                  >
                  </Button>
                </div>;
              }}
            />
          </Table>

          <hr style={{ margin: '20px 0' }} />
          <div style={{ marginTop: 20 }}>
            <Table
              style={{ cursor: 'pointer' }}
              rowClassName={(record, index) => record.id === this.state.rowSelected1[0]?.id ? 'table-row-light' : ''}
              size='small'
              dataSource={this.state.dataSource1}
              loading={this.state.isLoadingTable1}
              pagination={false}
              scroll={{ y: 500 }}
              bordered
              rowKey={(res) => res.id}
              onRow={(record, rowIndex) => {
                return {
                  onClick: async () => {
                    let index = this.state.dataSource1.findIndex(x => x.id === record.id)
                    this.setState({
                      rowSelected1: [record],
                      selectedRowKeys1: [record.id],
                      indexTable1: index,
                      old_W1_serial_num: record.W1_serial_num
                    });
                  }
                };
              }}
            // rowSelection={{
            //   type: 'radio',
            //   selectedRowKeys: this.state.selectedRowKeys1,
            //   onSelect: (record, selected, selectedRows) => {
            //     let index = this.state.dataSource1.findIndex(x => x.id === record.id)
            //     this.setState({
            //       rowSelected1: selectedRows,
            //       selectedRowKeys1: selectedRows.map(x => x.id),
            //       indexTable1: index,
            //       old_W1_serial_num: record.W1_serial_num
            //     });
            //   },
            // }}
            >
              <Table.Column title="連番" dataIndex="W1_serial_num" width={100}
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) ?
                        <div style={{ textAlign: "right", paddingRight: 7 }}>
                          {record.W1_serial_num}
                        </div>
                        :
                        <InputNumber maxLength={2} value={record.W1_serial_num}
                          disabled={!this.compareObject(this.state.dataSource0, this.state.dataSourceOld)}
                          onChange={(value) => {
                            this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "W1_serial_num", value, 'OptionInput')
                          }}
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="項目" dataIndex="W1_item"
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) ?
                        <Input value={record.W1_item} readOnly
                          style={{ border: 'none', background: 'transparent' }}
                        />
                        :
                        <Input.Search value={record.W1_item}
                          disabled={!this.compareObject(this.state.dataSource0, this.state.dataSourceOld)}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 800,
                                component: (
                                  <WS0397001_ParamPromptedQuerySub
                                    Li_Format={'Y'}
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "W1_item", output.Lo_IndicationDivision, 'OptionInput')
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          onChange={(event) =>
                            this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "W1_item", event.target.value, 'OptionInput')
                          }
                        />
                      }
                    </div>
                  )
                }}
              />
              <Table.Column title="内容" dataIndex="W1_content"
                render={(value, record, index) => {
                  return (
                    <div>
                      {this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) ?
                        <Input value={record.W1_content} readOnly
                          style={{ border: 'none', background: 'transparent' }}
                        />
                        :
                        <Input.Search value={record.W1_content}
                          disabled={!this.compareObject(this.state.dataSource0, this.state.dataSourceOld)}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 800,
                                component: (
                                  <WS2592016_ParamPromptedQueryContent
                                    Li_Format={'Y'}
                                    Li_IndicationDivision={record.W1_item}
                                    onFinishScreen={(output) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "W1_content", output.Lo_Item, 'OptionInput')
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                          onChange={(event) =>
                            this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "W1_content", event.target.value, 'OptionInput')
                          }
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
                      disabled={this.checkDisabledBtnAdd('OptionInput') || !this.compareObject(this.state.dataSource0, this.state.dataSourceOld)}
                      onClick={() => this.handleAddRowTable('OptionInput')}
                      type="primary" icon={<PlusOutlined />}>
                    </Button>
                  </div>
                }
                render={(text, record, index) => {
                  return <div style={{ textAlign: "center" }}>
                    <Button size='small'
                      hidden={this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) || this.checkAddItem('OptionInput')
                        || !(this.state.dataSource1[this.state.indexTable1] && this.state.dataSource1[this.state.indexTable1].W1_serial_num)
                        || !this.compareObject(this.state.dataSource0, this.state.dataSourceOld)}
                      onClick={() => { this.createAndUpdateOptionInput(this.findIndexByID(this.state.dataSource1, record.id)) }}
                      style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                      icon={<SaveOutlined />} >
                    </Button>
                    <Button size='small' style={{ border: 'none' }}
                      disabled={!this.compareObject(this.state.dataSource0, this.state.dataSourceOld)}
                      onClick={() => {
                        this.checkIdTemp(record.id) ? this.handleDeleteRowTable('OptionInput') : this.deleteOptionInput(record)
                      }}
                      danger
                      icon={<DeleteOutlined />}
                    >
                    </Button>
                  </div>;
                }}
              />
            </Table>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0638001_EscortManageMaintain);
