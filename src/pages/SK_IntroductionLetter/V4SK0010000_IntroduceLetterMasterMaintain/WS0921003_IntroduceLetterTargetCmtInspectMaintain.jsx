import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Form, Input, Row, Col, Modal, Space, Button, message } from "antd";
import IntroduceLetterTargetCmtInspectMaintainAction from "redux/IntroductionLetter/IntroduceLetterMasterMaintain/IntroduceLetterTargetCmtInspectMaintain.action"
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle";
import ColumnButtonCustom from 'components/Commons/TableColumn'
import Color from "constants/Color";
import WS0887001_IntroduceLetterVariousMasterInquiry from "../V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry";
import { thisExpression } from "@babel/types";
class WS0921003_IntroduceLetterTargetCmtInspectMaintain extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    comment_code: PropTypes.any,
    comment_content: PropTypes.any,
    FW_comment_content: PropTypes.any,
    remarks: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '紹介状対象コメント検査保守';
    this.formRef = React.createRef();
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      indexTable: 0,
      childModal: {
        width: '0',
        visible: false,
        component: null
      }
    };
  }
  componentDidMount() {
    this.GetScreenData()
    this.GetListData()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.GetScreenData()
      this.GetListData()
    }
  }
  GetScreenData() {
    this.setState({ isLoading: true })
    const params = {
      comment_code: this.props.comment_code || 5001,
      comment_content: this.props.comment_content || "血圧",
      FW_comment_content: this.props.FW_comment_content || "血圧",
      remarks: this.props.remarks || "高血圧】治療が必要です。医療機関を受診して下さい。",
    }
    IntroduceLetterTargetCmtInspectMaintainAction.GetScreenData(params)
      .then(res => {
        this.setFormFieldValue('LnkIn0CmtCode', res.LnkIn0CmtCode)
        this.setFormFieldValue('LnkIn0CmtContent', res.LnkIn0CmtContent)
        this.setFormFieldValue('LnkIn0GeneralCmt', res.LnkIn0GeneralCmt)
        this.setFormFieldValue('LnkIn0Remarks', res.LnkIn0Remarks)
        this.forceUpdate()
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  GetListData() {
    this.setState({ isLoading: true })
    const params = {
      comment_code: this.props.comment_code || 5001,
      comment_content: this.props.comment_content || "血圧",
      FW_comment_content: this.props.FW_comment_content || "血圧",
      remarks: this.props.remarks || "高血圧】治療が必要です。医療機関を受診して下さい。",
    }
    IntroduceLetterTargetCmtInspectMaintainAction.GetListData(params)
      .then(res => {
        if (res) {
          this.setFormFieldValue('dataSource', res)
          this.setState({
            selectedRows: [res[0]],
            selectedRowKeys: [res[0].id],
            indexTable: 0,
          })
          this.forceUpdate()
        }

      })
      .finally(() => this.setState({ isLoading: false }))
  }
  SaveRowData(record, isNew) {
    // api
    // isNew => điều kiện check Thêm mới -ko truyền id # Update - Truyền id
    const req = {
      exam_code: record.exam_code,
      exam_name: record.exam_name,
      department_code: record.department_code,
      department_name: record.department_name,
      remarks: record.remarks,
      comment_code: this.getRawValue("LnkIn0CmtCode")
    }
    const params = isNew ? { ...req } : { ...req, id: record.id }
    IntroduceLetterTargetCmtInspectMaintainAction.saveData(params).then(() => {
      this.GetListData()
    }).catch(err => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    });
  }
  insertData(record, index) {
    // save data form FE
    const value = this.getRawValue('dataSource')[index]
    const isNew = true;
    this.SaveRowData(value, isNew)
  }
  onSave(index) {
    // click event save data
    const record = this.getRawValue('dataSource')[index]
    !!record.isNew ?
      this.insertData(record, index) : this.SaveRowData(record, false)
  }
  removeRow(index) {
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    const table = data.filter((item, i) => index !== i);
    setTimeout(() => {
      this.setState({
        selectedRows: table.length > 0 ? [table[0]] : [],
        selectedRowKeys: table.length > 0 ? [table[0]?.id] : [],
        tableIndex: 0
      })
    }, 300)

    this.setFormFieldValue('dataSource', table)

    this.forceUpdate()
  }
  deleteData(record) {
    const params = {
      id: record.id,
      exam_code: record.exam_code,
      exam_name: record.exam_name,
      department_code: record.department_code,
      department_name: record.department_name,
      remarks: record.remarks,
      comment_code: this.getRawValue("LnkIn0CmtCode")
    }
    Modal.confirm({
      content: '消去してもよろしいですか？',
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => IntroduceLetterTargetCmtInspectMaintainAction.deleteData(params).then(() => {
        this.GetListData()
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
  handleAdd() {
    const { count } = this.state;
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    const params = {
      id: "a" + count,
      isNew: true,
      exam_code: null,
      exam_name: null,
      department_code: null,
      department_name: null,
      remarks: null
    }
    let arr = [...data];
    arr.unshift(params)
    this.setState({
      count: count + 1,
      selectedRowKeys: arr.length > 0 ? [arr[0].id] : [],
      selectedRows: arr.length > 1 ? [arr[0]] : [],
      tableIndex: 0
    });
    this.setFormFieldValue('dataSource', arr)
    this.forceUpdate()
  }
  addRow() {
    let data = this.getRawValue('dataSource') ?
      this.getRawValue('dataSource') : [];
    let arr = [...data];
    if (arr.length === 0) {
      this.handleAdd();
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (!!arr[index]['isNew']) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd()
        }
      }
    }
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      }
    ])
  }

  getRawValue(name) {
    return this.formRef?.current?.getFieldValue(name)
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false
      }
    })
  }

  onFinish = (value) => {
    console.log('finish', value)
  }

  handleFinish = () => {
    // pass value
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        //
      });
    };
  }

  render() {
    return (
      <div className="introduce-letter-target-cmt-inspect-maintain">
        <Card title="紹介状対象コメント検査保守">
          <Space className="mb-3">
            <Button type="primary" onClick={() => { console.log('open new modal') }}> F5 </Button>
          </Space>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Card className="mb-3">
              <Row>
                <Col span={2} style={{ margin: 'auto' }}>
                  <Form.Item label="コメント情報" />
                </Col>
                <Col span={22}>
                  <Row>
                    <Col span={3}>
                      <Form.Item name="LnkIn0CmtCode" >
                        <Input type="number" readOnly />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="LnkIn0CmtContent" style={{ paddingLeft: 5 }}>
                        <Input readOnly />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="LnkIn0Remarks" style={{ paddingLeft: 15 }}>
                        <Input readOnly />
                      </Form.Item>
                    </Col>
                    <Col offset={3} span={21} style={{ paddingLeft: 5 }}>
                      <Form.Item name="LnkIn0GeneralCmt">
                        <Input readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Table
              size="small"
              loading={this.state.isLoading}
              pagination={true}
              bordered
              dataSource={this.getRawValue('dataSource')}
              rowKey={(record) => record.id}
              rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    this.setState({
                      selectedRows: [record],
                      selectedRowKeys: [record.id],
                      indexTable: rowIndex,
                    })
                  }
                };
              }}
            >
              <Table.Column title="検査コード" dataIndex="" key="" width="" render={(value, record, index) => {
                return (
                  <Form.Item name={['dataSource', index, 'exam_code']}>
                    <Input type="number" maxLength={5} onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component: <WS0271001_InspectItemSearchQuerySingle

                            onFinishScreen={(output) => {
                              let data = this.getRawValue("dataSource")
                              data[index].exam_code = output.Lio_InspectItemCode
                              data[index].exam_name = output.Lo_exam_name
                              this.closeModal()
                            }}
                          />,
                        },
                      });
                    }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="検査項目名" dataIndex="" key="" width="25%" render={(value, record, index) => {
                return (
                  <Form.Item name={['dataSource', index, 'exam_name']}>
                    <span>{record.exam_name}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="コード" dataIndex="" key="" width="5%" render={(value, record, index) => {
                return (
                  <Form.Item name={['dataSource', index, 'department_code']}>
                    <Input type="number" maxLength={5} onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 800,
                          component: <WS0887001_IntroduceLetterVariousMasterInquiry
                            Li_ManageCode={7}
                            onFinishScreen={(output) => {
                              console.log(output)
                              let data = this.getRawValue("dataSource")
                              data[index].department_code = output.recordData.various_codes
                              data[index].department_name = output.recordData.findings_content
                              this.closeModal()
                            }}
                          />,
                        },
                      });
                    }} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="診療科情報" dataIndex="" key="" width="13%" render={(value, record, index) => {
                return (
                  <Form.Item name={['dataSource', index, 'department_name']}>
                    <span>{record.department_name}</span>
                  </Form.Item>
                )
              }} />
              <Table.Column title="備　　考" dataIndex="" key="" width="45%" render={(value, record, index) => {
                return (
                  <Form.Item name={['dataSource', index, 'remarks']}>
                    <Input />
                  </Form.Item>
                )
              }} />
              {(ColumnButtonCustom({
                addRow: () => this.addRow(), // in FE
                onSaveData: () => this.onSave(this.state.indexTable), // Call API
                deleteRow: () => this.removeRow(this.state.indexTable), // in FE
                deleteData: () => this.deleteData(this.state.selectedRows[0]), // Call API
                dataSource: this.getRawValue('dataSource'),
                tableIndex: this.state.indexTable,
                width: 150
              }))}
            </Table>
          </Form>
          {/* <Space>
            <Button type="primary" onClick={this.handleFinish}>
              Handle Finish
            </Button>
          </Space> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0921003_IntroduceLetterTargetCmtInspectMaintain);
