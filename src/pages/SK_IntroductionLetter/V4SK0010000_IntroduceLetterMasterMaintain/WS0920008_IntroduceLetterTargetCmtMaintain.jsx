import React from "react";
import { connect } from "react-redux";
import WS0270001_InspectItemSearchQueryMultipleChoice from 'pages/SK_IntroductionLetter/V4SK0010000_IntroduceLetterMasterMaintain/WS0270001_InspectItemSearchQueryMultipleChoice.jsx';
import { Dropdown, message, Card, Table, Form, Row, Col, Space, Input, Button, Modal, InputNumber, Menu } from "antd";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle";
import WS0887001_IntroduceLetterVariousMasterInquiry from "../V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry";
import WS0924001_IntroduceLetterTargetCmtList from "./WS0924001_IntroduceLetterTargetCmtList";
import WS0920010_CopyingProcess from "./WS0920010_CopyingProcess";
import ColumnButtonCustom from 'components/Commons/TableColumn'
import IntroduceLetterTargetCmtMaintainAction from 'redux/IntroductionLetter/IntroduceLetterMasterMaintain/IntroduceLetterTargetCmtMaintain.action'
import WS0921003_IntroduceLetterTargetCmtInspectMaintain from 'pages/SK_IntroductionLetter/V4SK0010000_IntroduceLetterMasterMaintain/WS0921003_IntroduceLetterTargetCmtInspectMaintain.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0920008_IntroduceLetterTargetCmtMaintain extends React.Component {

  constructor(props) {
    super(props);
    // document.title = '紹介状対象コメント保守';
    this.formRef = React.createRef();
    this.state = {
      rowSelected: [],
      rowSelected2: [],
      selectedRowKeys: [],
      selectedRowKeys2: [],
      indexTable: 0,
      indexTable2: 0,
      isLoading: false,
      isLoading2: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      search_key: '',
      remarks: '',
      regional_insurer_group_classifi: null,
      count: 0,
    };
  }
  componentDidMount = () => {
    this.getMaintain()
    this.forceUpdate();
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.selectedRowKeys[0] !== this.state.selectedRowKeys[0]) {
      this.formRef.current.setFieldsValue({
        search_key: this.state.search_key,
        tableData2: []
      })
      this.forceUpdate();
    }
  }
  getMaintain() {
    this.setState({ isLoading: true })
    IntroduceLetterTargetCmtMaintainAction.getMaintain().then((res) => {
      const comment_code = (data) => data.comment_code === 0 ? '' : data.comment_code;
      if (res) {
        const data = res.map(item => ({ ...item, comment_code: comment_code(item) }))
        this.formRef?.current?.setFieldsValue({
          dataSource: data,
        })
        this.setState({
          rowSelected: [res[0]],
          selectedRowKeys: [res[0].id],
          search_key: res[0].comment_content,
          indexTable: 0
        });
        this.changeRow(res[0]);
      }

    }).finally(() => { this.setState({ isLoading: false }) })
  }
  getInspectMaintain(data) {
    this.setState({ isLoading2: true })
    IntroduceLetterTargetCmtMaintainAction.getInspectMaintain({ comment_code: data.comment_code }).then((res) => {
      const exam_code = (data) => data.exam_code === 0 ? '' : data.exam_code;
      if (res) {
        const data = res.map(item => ({ ...item, comment_code: exam_code(item) }))
        this.formRef?.current?.setFieldsValue({
          dataSource2: data,
        })
        this.setState({
          rowSelected2: [res[0]],
          selectedRowKeys2: [res[0]?.id],
          indexTable2: 0
        });
      }
    }).finally(() => { this.setState({ isLoading2: false }) })
  }
  getRawValue(name) {
    return this.formRef?.current?.getFieldValue(name)
  }
  InspectItemSearchQuerySingle = (condition = null) => {
    console.log('Modal InspectItemSearchQuerySingle: 271')
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component:
          <WS0271001_InspectItemSearchQuerySingle
            onFinishScreen={(output) => {
              this.setDataOutput(condition, output)
              this.closeModal()
            }}
          />
      }
    })
  }
  WS0270001_InspectItemSearchQueryMultipleChoice() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component:
          <WS0270001_InspectItemSearchQueryMultipleChoice
            Li_UnusedInspectDisplay={0}
            onFinishScreen={(output) => {
              if (output) {
                this.InspectItemSearchQuerySingle()
              }
              // this.closeModal()
            }}
          />
      }
    })
  }
  IntroduceLetterVariousMasterIn = (condition = null) => {
    console.log('Modal IntroduceLetterVariousMasterIn : 887');
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0887001_IntroduceLetterVariousMasterInquiry
            onFinishScreen={(output) => {
              const data = this.getRawValue('dataSource2')
              if (output) {
                data[this.state.indexTable2].department_code = output?.Lo_VariousCodes
                data[this.state.indexTable2].department_name = output?.recordData?.findings_content

              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  setDataOutput = (condition, output) => {
    const data = this.getRawValue('dataSource2')
    if (data && data.length > 0) {
      if (output) {
        data[this.state.indexTable2].exam_code = output.Lio_InspectItemCode
        data[this.state.indexTable2].Expresstion_9 = output.Lo_exam_name
      }
    }
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  changeRow = (record) => {
    // API delays
    this.renderForm(record)
    this.getInspectMaintain(record)

  }
  f8 = (condition = null) => {
    const { comment_code, comment_content, } = this.state.rowSelected[0];
    const search_key = this.formRef.current.getFieldValue('search_key'),
      remarks = this.formRef.current.getFieldValue('remarks'),
      regional_insurer_group_classifi = this.formRef.current.getFieldValue('regional_insurer_group_classifi');
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '624px',
        component: (
          <WS0920010_CopyingProcess
            comment_code={comment_code}
            comment_content={comment_content}
            search_key={search_key}
            remarks={remarks}
            regional_insurer_group_classifi={regional_insurer_group_classifi}
            onFinishScreen={(output) => {
              this.setDataOutput(condition, output)
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  f9 = (condition = null) => {
    console.log('Modal IntroduceLetterTargetCmtList : 924')
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS0924001_IntroduceLetterTargetCmtList
            onFinishScreen={(output) => {
              this.setDataOutput(condition, output)
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  addRow(name, tableIndex) {
    let data = this.getRawValue(name) ?
      this.getRawValue(name) : [];
    let arr = [...data];
    if (arr.length === 0) {
      this.handleAdd(name, tableIndex);
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (!!arr[index]['isNew']) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd(name, tableIndex)
        }
      }
    }
  }
  handleAdd(name, tableIndex) {
    const { count } = this.state;
    let data = this.getRawValue(name) ?
      this.getRawValue(name) : [];
    const params = {
      id: `A${count}`,
      isNew: true,
      comment_code: '',
      comment_content: '',
      regional_insurer_group_classification: '',
      remarks: '',
      search_key: ''
    }
    let arr = [...data];
    arr.unshift(params)
    console.log(tableIndex)
    if (tableIndex === 1) {
      setTimeout(() => {
        this.setState({
          count: count + 1,
          selectedRowKeys: arr.length > 0 ? [arr[0].id] : [],
          rowSelected: arr.length > 0 ? [arr[0]] : [],
          indexTable: 0
        });

      }, 50)
    } else {
      setTimeout(() => {
        this.setState({
          count: count + 1,
          selectedRowKeys2: arr.length > 0 ? [arr[0].id] : [],
          rowSelected2: arr.length > 0 ? [arr[0]] : [],
          indexTable2: 0
        });
      }, 50)
    }
    if (tableIndex === 1) {
      this.changeRow(arr[0])
    }
    this.setFormFieldValue(name, arr)
    this.forceUpdate()
  }
  removeRow(name, tableIndex, index) {
    const i = tableIndex === 1 ? '' : tableIndex
    let data = this.getRawValue(name) ?
      this.getRawValue(name) : [];
    const table = data.filter((item, i) => index !== i);
    if (tableIndex === 1) {
      setTimeout(() => {
        this.setState({
          selectedRowKeys: table.length > 0 ? [table[0].id] : [],
          rowSelected: table.length > 0 ? [table[0]] : [],
          indexTable: 0
        });

      }, 50)
    } else {
      setTimeout(() => {
        this.setState({
          selectedRowKeys2: table.length > 0 ? [table[0].id] : [],
          rowSelected2: table.length > 0 ? [table[0]] : [],
          indexTable2: 0
        });
      }, 50)
    }
    if (tableIndex === 1) {
      this.changeRow(table[0])
    }
    this.setFormFieldValue(name, table)
    this.forceUpdate()
  }
  insertMaintainData(record) {
    // save data form FE
    const isNew = true;
    this.SaveMaintainData(record, isNew)
  }
  SaveMaintainData(value, isNew) {
    const req = {
      search_key: this.getRawValue('search_key') || value.search_key,
      remarks: this.getRawValue('remarks') || value.remarks,
      regional_insurer_group_classification:
        this.getRawValue('regional_insurer_group_classification') ||
        value.regional_insurer_group_classification,
      category_name: value.category_name,
      comment_code: value.comment_code,
      comment_content: value.comment_content,
    }
    const params = isNew ? { ...req } : { ...req, id: value.id };
    IntroduceLetterTargetCmtMaintainAction.saveMaintain(params).then(() => {
      message.success('保存しました');
      this.getMaintain()
    }).catch(err => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    })
  }
  onSave() {
    // click event save data
    const index = this.state.indexTable
    const record = this.getRawValue('dataSource')[index]
    !!record?.isNew ?
      this.insertMaintainData(record) : this.SaveMaintainData(record, false)
  }

  deleteMaintain() {
    const params = {
      id: this.state.selectedRowKeys[0],
      comment_code: this.state.rowSelected[0]?.comment_code
    }
    Modal.confirm({
      content: '消去してもよろしいですか？',
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => IntroduceLetterTargetCmtMaintainAction.deleteMaintain(params).then(() => {
        this.getMaintain()
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
    })
  }
  insertInspectData(record) {
    // save data form FE
    const isNew = true;
    this.SaveInspectData(record, isNew)
  }
  SaveInspectData(value, isNew) {
    const req = {
      remarks: this.getRawValue('remarks') || value.remarks,
      exam_code: value.exam_code,
      department_code: value.department_code,
      comment_code: this.state.rowSelected[0].comment_code
    }
    const params = isNew ? { ...req } : { ...req, id: value.id };
    IntroduceLetterTargetCmtMaintainAction.saveDataInspect(params).then(() => {
      message.success('保存しました');
      this.getInspectMaintain({ comment_code: this.state.rowSelected[0].comment_code })
    }).catch(err => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    })
  }
  onSaveInspect() {
    // click event save data
    const index = this.state.indexTable2
    const record = this.getRawValue('dataSource2')[index]
    !!record?.isNew ?
      this.insertInspectData(record) : this.SaveInspectData(record, false)
  }
  deleteInspect() {
    const params = {
      id: this.state.selectedRowKeys2[0],
      exam_code: this.state.rowSelected2[0]?.exam_code,
      department_code: this.state.rowSelected2[0]?.department_code,

    }
    Modal.confirm({
      content: '消去してもよろしいですか？',
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => IntroduceLetterTargetCmtMaintainAction.deleteDataInspect(params).then(() => {
        this.getInspectMaintain({ comment_code: this.state.rowSelected[0].comment_code })
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
    })
  }
  renderForm(record) {
    const keys = Object.keys(record)
    const values = Object.values(record)
    keys.forEach((item, i) => {
      if (item == 'regional_insurer_group_classification') {
        this.setFormFieldValue(item, values[i] === 0 ? '' : values[i])
      } else {
        this.setFormFieldValue(item, values[i])
      }
    })
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      }
    ])
  }
  f11 = () => {
    console.log('Modal LetterIntroduceSubjectInspec : 921')
    const data =  this.state.rowSelected[0]
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0921003_IntroduceLetterTargetCmtInspectMaintain
            comment_code={data.comment_code}
            comment_content={data.comment_content}
            FW_comment_content={data.FW_comment_content}
            remarks={data.remarks}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  onFinish = (val) => {
    console.log('Finish', val)
  }
  render() {
    return (
      <div className="introduce-letter-target-cmt-maintain">
        <Card title="紹介状対象コメント保守">
          <Space className="mb-3">
            <Button type="primary" onClick={this.f9}> 印刷</Button>
            <Button type="primary" onClick={this.f11} disabled={!this.state.rowSelected.length > 0}> F11 </Button>
          </Space>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={[6, 6]}>
              <Col span={12}>
                <Table
                  size="small"
                  rowClassName={(record, index) => record.id === this.state.rowSelected[0]?.id ? 'table-row-light' : ''}
                  bordered
                  pagination={false}
                  scroll={{ y: 500 }}
                  loading={this.state.isLoading}
                  dataSource={this.getRawValue('dataSource')}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        this.setState({
                          rowSelected: [record],
                          selectedRowKeys: [record.id],
                          search_key: record.comment_content,
                          indexTable: rowIndex
                        });
                        this.changeRow(record);
                      }
                    };
                  }}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="ｺｰﾄﾞ" dataIndex="" key="" width="15%" render={(value, record, index) => {
                    return (
                      <Form.Item name={['dataSource', index, 'comment_code']}>
                        {!!record?.isNew ?
                          <Input style={{ textAlign: 'right' }} /> :
                          <div ><span>{record.comment_code}</span></div>
                        }
                      </Form.Item>
                    )
                  }} />
                  <Table.Column title="コメント" dataIndex="" key="" width="25%" render={(value, record, index) => {
                    return (
                      <Form.Item name={['dataSource', index, 'comment_content']}>
                        <Input />
                      </Form.Item>
                    )
                  }} />
                  <Table.Column title="コメント名称" dataIndex="" key="" width="60%" render={(value, record, index) => {
                    return (
                      <Form.Item name={['dataSource', index, 'FW_comment_content']}>
                        <span>{record.FW_comment_content}</span>
                      </Form.Item>
                    )
                  }} />
                  {(ColumnButtonCustom({
                    addRow: () => this.addRow('dataSource', 1), // in FE
                    onSaveData: () => this.onSave(), // Call API
                    deleteRow: () => this.removeRow('dataSource', 1, this.state.indexTable), // in FE
                    deleteData: () => this.deleteMaintain(), // Call API
                    dataSource: this.getRawValue('dataSource'),
                    tableIndex: this.state.indexTable,
                    width: 130
                  }))}
                  <Table.Column width={60} render={(text, record, index) => (
                    <Dropdown.Button style={{ textAlign: 'center' }} trigger='click' size='small' overlay={() => (
                      <Menu>
                        <Menu.Item onClick={() => { this.WS0270001_InspectItemSearchQueryMultipleChoice() }}>検査複数選択</Menu.Item>
                      </Menu>
                    )}>
                    </Dropdown.Button>
                  )}></Table.Column>
                </Table>
              </Col>
              <Col span={12}>
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item label="検索キー" name='search_key' value={this.state.search_key} style={{ minWidth: 150, maxWidth: 200 }}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="備　　考" name='remarks' style={{ maxWidth: 350 }}>
                      <Input />
                    </Form.Item>
                    <Space>
                      <Form.Item label="地域保健" name='regional_insurer_group_classification' style={{ minWidth: 100, maxWidth: 120 }}>
                        <InputNumber type="number" />
                      </Form.Item>
                      <Form.Item name='category_name' >
                        <span>{this.getRawValue('category_name')}</span>
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Table
                      size="small"
                      bordered
                      loading={this.state.isLoading2}
                      scroll={{ y: 400 }}
                      pagination={false}
                      rowClassName={(record, index) => record.id === this.state.rowSelected2[0]?.id ? 'table-row-light' : ''}
                      dataSource={this.getRawValue('dataSource2')}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: () => {
                            this.setState({
                              rowSelected2: [record],
                              selectedRowKeys2: [record.id],
                              indexTable2: rowIndex
                            });
                          }
                        };
                      }}
                    >
                      <Table.Column width={280} title="検査情報" dataIndex="" render={(value, record, index) => {
                        return (
                          <Space direction="horizontal">
                            <Form.Item name={['dataSource2', index, 'exam_code']} style={{ margin: 0 }}>
                              <InputNumber readOnly style={{ width: 80 }} onDoubleClick={() => this.InspectItemSearchQuerySingle()} />
                            </Form.Item>

                            <Form.Item name={['dataSource2', index, 'Expresstion_9']} style={{ margin: 0 }}>
                              <span style={{ paddingLeft: 5 }}>{record.Expresstion_9}</span>
                            </Form.Item>

                          </Space>
                        )
                      }} />
                      <Table.Column width={190} title="診療科" dataIndex="" render={(value, record, index) => {
                        return (
                          <Space direction="horizontal">
                            <Form.Item name={['dataSource2', index, 'department_code']} style={{ margin: 0 }}>
                              <InputNumber type="number" maxLength={4} style={{ width: 50 }} onDoubleClick={() => this.IntroduceLetterVariousMasterIn()} />
                            </Form.Item>
                            <Form.Item name={['dataSource2', index, 'department_name']} style={{ margin: 0 }}>
                              <span style={{ paddingLeft: 5 }}>{record.department_name}</span>
                            </Form.Item>
                          </Space>
                        )
                      }} />
                      <Table.Column width={150} title="備考" dataIndex="" render={(value, record, index) => {
                        return (
                          <Form.Item name={['dataSource2', index, 'remarks']}>
                            <Input />
                          </Form.Item>
                        )
                      }} />
                      {(ColumnButtonCustom({
                        addRow: () => this.addRow('dataSource2', 2), // in FE
                        onSaveData: () => this.onSaveInspect(), // Call API
                        deleteRow: () => this.removeRow('dataSource2', 2, this.state.indexTable2), // in FE
                        deleteData: () => this.deleteInspect(), // Call API
                        dataSource: this.getRawValue('dataSource2'),
                        tableIndex: this.state.indexTable2,
                        width: 130
                      }))}

                    </Table>
                  </Col>
                </Row>
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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0920008_IntroduceLetterTargetCmtMaintain);
