import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Checkbox, Radio, Select, Table, Row, Col, Space, Modal, message, Spin } from "antd";
import WS0397001_ParamPromptedQuerySub from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0397001_ParamPromptedQuerySub.jsx';
import WS2592016_ParamPromptedQueryContent from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS2592016_ParamPromptedQueryContent.jsx';
import WS1544002_FormatQuery from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS1544002_FormatQuery.jsx';
import WS0102001_InspectListSettingSub from 'pages/SM_SystemMaintenance/V4SM0031000_OptionalInfoMaintain/WS0102001_InspectListSettingSub.jsx';
import WS0104001_CoursesSettingSub from 'pages/KS_CooperationRelated/YMGA0610_EMedicalRecordsInspectRequestMaintain/WS0104001_CoursesSettingSub.jsx';
import DocumentManageMaintainAction from 'redux/AdvancePreparation/DocumentManageMaintain/DocumentManageMaintain.actions'
import WS0638001_EscortManageMaintain from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS0638001_EscortManageMaintain.jsx';
import WS0640001_EscortMaintain from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS0640001_EscortMaintain.jsx';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

const stFm = {
  marginBottom: '0px'
}
class WS1544001_DetailSub extends React.Component {
  static propTypes = {
    Lio_MaterialOption: PropTypes.any,
    Lio_MaterialOptionExpansion: PropTypes.any,
    Lio_MaterialOptionDescription: PropTypes.any,
    selectedRowsTable: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = '明細SUB';

    this.state = {
      isLoadding: false,
      loadingFm: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      count: "a",
      objNull: {
        Format: "",
        AgeCalculate: "",
        BirthDateFormat: "",
        CourseNot: "",
        CourseOr: "",
        DateFormat: "",
        Gender: 0,
        IdEditing: "",
        InspectAnd: "",
        InspectNot: "",
        InspectOr1: "",
        InspectOr2: "",
        Lio_MaterialOption: "",
        Lio_MaterialOptionExpansion: "",
        OtherOptions: [],
        OutputPattern: "",
        StsBatchFormat: false,
        StsDocumentUnit: false,
        StsSpecifiedOutput: false,
        StsThereAreOther: false,
        escort_code: null,
        expression_73: "",
      }
    };
  }
  componentDidMount() {
    this.GetDetailSub()
  }
  componentDidUpdate(PropPev) {
    if (this.props.selectedRowsTable !== PropPev.selectedRowsTable) {
      this.GetDetailSub()
    }
    //save Data
    if (this.props.conditionSave !== PropPev.conditionSave) {
      if (this.props.conditionSave) {
        this.SaveData()
      }
    }
  }
  GetDetailSub() {
    let data = {
      document_option_main: this.props.selectedRowsTable.document_option_main,
      document_option: this.props.selectedRowsTable.document_option,
      document_option_description: this.props.selectedRowsTable.document_option_description,
      id_ms1605: this.props.selectedRowsTable.id_ms1605
    }
    if (!isNaN(this.props.selectedRowsTable?.id)) {
      this.setState({ ...this.state.loadingFm, loadingFm: true })
      DocumentManageMaintainAction.GetDetailSub(data).then(res => {
        this.formRef.current?.setFieldsValue(res)
      })
        .catch(error => {
          const res = error.response;
          if (!res || res.data || res.data.message) {
            message.error('エラーが発生しました');
          }
        }).finally(() => this.setState({ ...this.state.loadingFm, loadingFm: false }))
    } else {
      this.formRef.current?.setFieldsValue(this.state.objNull)
      this.forceUpdate()
    }

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
  ShowWS0102001_InspectListSettingSub(condition) {
    let data = this.GetDataInspectListSettingSub(condition)
    this.setState({
      ...this.state,
      childModal: {
        width: '70%',
        visible: true,
        component: (<WS0102001_InspectListSettingSub
          Li_Title={data.Li_Title}
          Lio_ExamList={data.Lio_ExamList}
          onFinishScreen={(output) => {
            this.SetDataInspectListSettingSub(condition, output)
            this.closeModal()
          }}
        />)
      }
    });
  }
  GetDataInspectListSettingSub(condition) {
    if (condition === "InspectOr1") {
      return { Li_Title: '対象の検査', Lio_ExamList: this.formRef.current?.getFieldValue("InspectOr1") }
    } else if (condition === "InspectOr2") {
      return { Li_Title: '対象の検査', Lio_ExamList: this.formRef.current?.getFieldValue("InspectOr2") }
    } else if (condition === "InspectNot") {
      return { Li_Title: '不要な検査', Lio_ExamList: this.formRef.current?.getFieldValue("InspectNot") }
    } else if (condition === "InspectAnd") {
      return { Li_Title: '必須の検査', Lio_ExamList: this.formRef.current?.getFieldValue("InspectAnd") }
    }
  }
  SetDataInspectListSettingSub(condition, output) {
    if (condition === "InspectOr1") {
      this.formRef.current?.setFieldsValue({
        InspectOr1: output?.Lio_ExamList
      })
    } else if (condition === "InspectOr2") {
      this.formRef.current?.setFieldsValue({
        InspectOr2: output?.Lio_ExamList
      })
    } else if (condition === "InspectNot") {
      this.formRef.current?.setFieldsValue({
        InspectNot: output?.Lio_ExamList
      })
    } else if (condition === "InspectAnd") {
      this.formRef.current?.setFieldsValue({
        InspectAnd: output?.Lio_ExamList
      })
    }
    this.forceUpdate()
  }
  ShowWS0104001_CoursesSettingSub(conditon) {
    this.setState({
      ...this.state,
      childModal: {
        width: '70%',
        visible: true,
        component: (<WS0104001_CoursesSettingSub
          Li_Title={conditon === "CourseOr" ? '対象のコース' : '不要なコース'}
          Lio_CourseList={conditon === "CourseOr" ? this.formRef.current?.getFieldValue("CourseOr") : this.formRef.current?.getFieldValue("CourseNot")}
          onFinishScreen={(output) => {
            if (conditon === "CourseOr") {
              this.formRef.current?.setFieldsValue({
                CourseOr: output?.Lio_CourseList
              })
            } else {
              this.formRef.current?.setFieldsValue({
                CourseNot: output?.Lio_CourseList
              })
            }
            this.forceUpdate()
            this.closeModal()
          }}
        />)
      }
    });
  }
  ShowWS1544002_FormatQuery() {
    this.setState({
      ...this.state,
      childModal: {
        width: '70%',
        visible: true,
        component: (<WS1544002_FormatQuery
          Lio_Format={this.formRef.current?.getFieldValue("Format")}
          onFinishScreen={(output) => {
            this.formRef.current?.setFieldsValue({
              Format: output?.Lio_Format
            })
            this.forceUpdate()
            this.closeModal()
          }}
        />)
      }
    });
  }
  ShowParamPromptedQuerySub(index) {
    this.setState({
      ...this.state,
      childModal: {
        width: '70%',
        visible: true,
        component: (<WS0397001_ParamPromptedQuerySub
          Li_Format={'Y'}
          onFinishScreen={(output) => {
            this.formRef.current?.setFields([
              {
                name: ['OtherOptions', index, 'W1_item'],
                value: output?.Lo_IndicationDivision
              }
            ])
            this.forceUpdate()
            this.closeModal()
          }}
        />)
      }
    });
  }
  ShowParamPromptedQueryContent(index) {
    this.setState({
      ...this.state,
      childModal: {
        width: '80%',
        visible: true,
        component: (<WS2592016_ParamPromptedQueryContent
          Li_Format={'Y'}
          Li_IndicationDivision={this.formRef.current?.getFieldValue('OtherOptions')[index].W1_item}
          Li_content={this.formRef.current?.getFieldValue('OtherOptions')[index].W1_content}
          onFinishScreen={(output) => {
            this.formRef.current?.setFields([
              {
                name: ['OtherOptions', index, 'W1_content'],
                value: output?.Lo_Item
              }
            ])
            this.forceUpdate()
            this.closeModal()
          }}
        />)
      }
    });
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  showEscortManageMaintain() {
    if (this.formRef.current?.getFieldValue("StsThereAreOther")) {
      this.setState({
        ...this.state,
        childModal: {
          width: '80%',
          visible: true,
          component: (<WS0638001_EscortManageMaintain
            Li_selectedRow={this.props.selectedRowsTable}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />)
        }
      });
    } else if (!this.isEmpty(this.formRef.current?.getFieldValue("escort_code"))) {
      this.setState({
        ...this.state,
        childModal: {
          width: '80%',
          visible: true,
          component: (<WS0640001_EscortMaintain
            Li_EscortCode={this.formRef.current?.getFieldValue("escort_code")}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />)
        }
      });
    }
  }
  CheckMaxLength(data, number, namePath) {
    let val = data.target.value
    if (!this.isEmpty(val)) {
      if (val.length > number) {
        val.slice(0, number)
        this.formRef.current.setFields([{
          name: namePath,
          value: val
        }])
        this.forceUpdate()
      }
    }
  }
  AddNewData() {
    let arr = [...this.formRef.current?.getFieldValue("OtherOptions")];
    if (arr.length === 0) {
      this.handleAdd();
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (this.isEmpty(arr[index].W1_serial_num)) {
          return
        }
        if (index === arr.length - 1) {
          this.handleAdd()
        }
      }
    }
  }
  handleAdd() {
    const { count } = this.state;
    const newData = {
      id: count,
      W1_item: "",
      W1_content: "",
      W1_serial_num: ""
    }
    let data = [...this.formRef.current?.getFieldValue("OtherOptions")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      OtherOptions: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
    })
  }

  Delete(record) {
    let arr = [...this.formRef.current?.getFieldValue("OtherOptions")];
    if (isNaN(record.id)) {
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1)
          this.formRef.current?.setFieldsValue({
            OtherOptions: arr
          })
          this.forceUpdate()
        }
      })
    } else {
      if (this.props?.selectedRowsTable?.id_ms1605) {
        for (let indx = 0; indx < arr.length; indx++) {
          if (arr[indx].id === record.id) {
            arr[indx].id_ms1605 = this.props?.selectedRowsTable?.id_ms1605;
            DocumentManageMaintainAction.DeleteDetailSub(arr[indx]).then(res => {
              if (this.props.setDeleteDetail) {
                this.props.setDeleteDetail(true)
              }
            })
          }
        }
      }
    }
  }
  SaveData() {
    if (!this.isEmpty(this.props.selectedRowsTable?.document_management_number)) {
      this.setState({ ...this.state.loadingFm, loadingFm: true })
      const dataSave = { ...this.props.selectedRowsTable, ...this.formRef.current?.getFieldValue() }
      dataSave.StsDocumentUnit = dataSave.StsDocumentUnit ? 1 : 0
      dataSave.StsBatchFormat = dataSave.StsBatchFormat ? 1 : 0
      dataSave.StsSpecifiedOutput = dataSave.StsSpecifiedOutput ? 1 : 0
      dataSave.StsEnable = dataSave.StsEnable ? 1 : 0
      DocumentManageMaintainAction.SaveAndUpdate(dataSave).then(res => {
        if (this.props.setSaveData) {
          this.props.setSaveData(false)
        }
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
        }
      }).finally(() => this.setState({ ...this.state.loadingFm, loadingFm: false }))
    }
  }
  render() {
    return (
      <div className="detail-sub">
        <Spin spinning={this.state.loadingFm}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            autoComplete="off"
            initialValues={{ InspectOr1: "", InspectOr2: "", InspectAnd: "", InspectNot: "", CourseOr: "", CourseNot: "", AgeCalculate: 0 }}
          >
            <Card style={{ padding: '10px !important' }} className="mb-2" >
              <Row>
                <Col span={16}>
                  <Space>
                    <Form.Item label="エスコート" name="Format" style={stFm}>
                      <Input.Search maxLength={30} onSearch={() => this.ShowWS1544002_FormatQuery()}
                        onChange={(e) => this.CheckMaxLength(e, 30, "Format")}
                      />
                    </Form.Item>
                    <Form.Item style={stFm}>
                      {this.formRef.current?.getFieldValue("expression_73")}
                    </Form.Item>
                  </Space>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  <Space>
                    <Button type="primary"
                      disabled={!this.formRef.current?.getFieldValue("StsThereAreOther") && !this.formRef.current?.getFieldValue("escort_code")}
                      onClick={() => this.showEscortManageMaintain()}
                    >内容設定</Button>
                    <Button type="primary">書式設定</Button>
                  </Space>
                </Col>
              </Row>
            </Card>
            <Card style={{ padding: '10px !important' }} className="mb-2" >
              <Row>
                <Col span={5}>
                  <Form.Item name="StsDocumentUnit" label="&emsp;帳票単位" valuePropName="checked" style={stFm}>
                    <Checkbox></Checkbox>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="StsBatchFormat" label="一括印刷" valuePropName="checked" style={stFm}>
                    <Checkbox></Checkbox>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="StsSpecifiedOutput" label="指定発行" valuePropName="checked" style={stFm}>
                    <Checkbox></Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card style={{ padding: '10px !important' }} className="mb-2" >
              <Form.Item name="InspectOr1" label="&emsp;対象検査" >
                <Input.Search onSearch={() => this.ShowWS0102001_InspectListSettingSub("InspectOr1")}
                  onChange={(e) => this.CheckMaxLength(e, 2500, "InspectOr1")} />
              </Form.Item>
              <Form.Item name="InspectOr2" label="&emsp;&emsp;&emsp;&emsp;&emsp;" >
                <Input.Search onSearch={() => this.ShowWS0102001_InspectListSettingSub("InspectOr2")}
                  onChange={(e) => this.CheckMaxLength(e, 2500, "InspectOr2")} />
              </Form.Item>
              <Form.Item name="InspectAnd" label="&emsp;必須検査" >
                <Input.Search onSearch={() => this.ShowWS0102001_InspectListSettingSub("InspectAnd")}
                  onChange={(e) => this.CheckMaxLength(e, 2500, "InspectAnd")} />
              </Form.Item>
              <Form.Item name="InspectNot" label="&emsp;不要検査" >
                <Input.Search onSearch={() => this.ShowWS0102001_InspectListSettingSub("InspectNot")}
                  onChange={(e) => this.CheckMaxLength(e, 2000, "InspectNot")} />
              </Form.Item>
              <Form.Item name="CourseOr" label="&emsp;コース〇" >
                <Input.Search onSearch={() => this.ShowWS0104001_CoursesSettingSub("CourseOr")}
                  onChange={(e) => this.CheckMaxLength(e, 2000, "CourseOr")} />
              </Form.Item>
              <Form.Item name="CourseNot" label="&emsp;&nbsp;コース×"  >
                <Input.Search onSearch={() => this.ShowWS0104001_CoursesSettingSub("CourseNot")}
                  onChange={(e) => this.CheckMaxLength(e, 2000, "CourseNot")} />
              </Form.Item>
              <Form.Item name="Gender" label="&emsp;性　　別&emsp;" style={stFm}>
                <Radio.Group >
                  <Radio value={0}>全て&emsp;&emsp;</Radio>
                  <Radio value={1}>男性&emsp;&emsp;</Radio>
                  <Radio value={2}>女性&emsp;&emsp;</Radio>
                </Radio.Group>
              </Form.Item>
            </Card>
            <Card style={{ padding: '10px !important' }} className="mb-2" >
              <Row>
                <Col span={8}>
                  <Form.Item name="DateFormat" label="&emsp;&emsp;受診日">
                    <Input maxLength={30} />
                  </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item name="IdEditing" label="&emsp;ID編集" >
                    <Input maxLength={30} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Form.Item name="BirthDateFormat" label="&emsp;生年月日" style={stFm}>
                    <Input maxLength={30} />
                  </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item name="AgeCalculate" label="年齢計算" style={stFm}>
                    <Select>
                      <Select.Option value={0}>受診日</Select.Option>
                      <Select.Option value={1}>年度末</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Table
              dataSource={this.formRef.current?.getFieldValue("OtherOptions") ? this.formRef.current.getFieldValue("OtherOptions") : []}
              size="small" bordered={true}
              loading={this.state.isLoadding}
              pagination={false}
              scroll={{ y: 300 }}
              rowKey={(iten) => iten.id} >
              <Table.Column title="連番" dataIndex="W1_serial_num" render={(value, record, index) => {
                return <Form.Item name={['OtherOptions', index, 'W1_serial_num']} style={stFm}>
                  <Input maxLength={2} onChange={(e) => {
                    let val = e.target.value
                    if (isNaN(val)) {
                      this.formRef.current?.setFields([{
                        name: ['OtherOptions', index, 'W1_serial_num'],
                        value: ""
                      }])
                    }
                  }} />
                </Form.Item>
              }} />
              <Table.Column title="項目" dataIndex="W1_item" render={(value, record, index) => {
                return <Form.Item name={['OtherOptions', index, 'W1_item']} style={stFm}>
                  <Input.Search maxLength={1000} onSearch={() => this.ShowParamPromptedQuerySub(index)}
                    onChange={(e) => this.CheckMaxLength(e, 1000, ['OtherOptions', index, 'W1_item'])} />
                </Form.Item>
              }} />
              <Table.Column title="内容" dataIndex="W1_content" render={(value, record, index) => {
                return <Form.Item name={['OtherOptions', index, 'W1_content']} style={stFm}>
                  <Input.Search maxLength={1000} onSearch={() => this.ShowParamPromptedQueryContent(index)}
                    onChange={(e) => this.CheckMaxLength(e, 1000, ['OtherOptions', index, 'W1_content'])} />
                </Form.Item>
              }} />
              <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                render={(text, record, index) => {
                  return <Button size='small' style={{ border: 'none' }} danger icon={<DeleteOutlined />}
                    onClick={() => {
                      Modal.confirm({
                        content: '消去してもよろしいですか？',
                        okText: 'は　い',
                        cancelText: 'いいえ',
                        onOk: () => this.Delete(record)
                      })
                    }}
                  ></Button>
                }}
              />
            </Table>
            <Form.Item name="Lio_MaterialOptionDescription" label="備考" style={{ marginTop: '1em' }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              style={{ display: this.formRef.current?.getFieldValue("Lio_MaterialOptionDescription") ? '' : 'none' }} >
              <Input maxLength={500} />
            </Form.Item>
          </Form>
        </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1544001_DetailSub);
