import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Select, Checkbox, Radio, Button, Table, Space, Spin, message, Modal } from "antd";
import DocumentBatchCreateSubAction from 'redux/AdvancePreparation/DocumentBatchCreate/DocumentBatchCreateSub.actions'
import WS0433001_PrinterConfirm from 'pages/SK_IntroductionLetter/V4SK0005000_IntroduceLetterIssuedMain/WS0433001_PrinterConfirm.jsx';
import WS1543001_DocumentManageMaintain from "../V4MS0061000_DocumentManageMaintain/WS1543001_DocumentManageMaintain";
import { debounce } from "lodash";
import ModalDraggable from "components/Commons/ModalDraggable";
import { download_file } from "helpers/CommonHelpers";

const styleLable = {
  color: 'white'
}
class WS0650001_DocumentBatchCreateSub extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_OutputUnit: PropTypes.any,
    Li_OutputPattern: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '資料一括作成SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadding: false,
      loadFrm: false,
      OutputPattern: [],
      CheckSpecifiedIssue: false,
      PatientNumCode: null,
      isLoadingPrint: false,
    };
  }
  componentDidMount() {
    this.GetScreenData()
  }
  componentDidUpdate(PreV) {
    if (PreV !== this.props) {
      this.GetScreenData()
    }
  }
  GetScreenData() {
    this.setState({ loadFrm: true })
    let data = {
      Li_CourseLevel: this.isEmpty(this.props.Li_CourseLevel) ? "" : this.props.Li_CourseLevel,
      Li_ReserveNum: this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
      Li_OutputUnit: this.isEmpty(this.props.Li_OutputUnit) ? "" : this.props.Li_OutputUnit,
      Li_OutputPattern: this.isEmpty(this.props.Li_OutputPattern) ? "" : this.props.Li_OutputPattern
    }
    DocumentBatchCreateSubAction.GetScreenData(data).then(res => {
      this.setState({ OutputPattern: res?.OutputPattern, CheckSpecifiedIssue: res?.dataView?.SpecifiedIssue, PatientNumCode: res?.dataView?.PatientNumCode })
      this.formRef.current?.setFieldsValue(res?.dataView)
      this.forceUpdate()
      this.FromSetTable()
    })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ loadFrm: false }))

  }

  FromSetTable = () => {
    this.setState({ isLoadding: true })
    let data = {
      OutputUnit: this.formRef.current?.getFieldValue("OutputUnit"),
      SpecifiedIssue: this.formRef.current?.getFieldValue("SpecifiedIssue") ? 1 : 0,
      ForcedOutput: this.formRef.current?.getFieldValue("ForcedOutput") ? 1 : 0
    }
    DocumentBatchCreateSubAction.FromSetTable(data).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res ? res : []
      })
      this.forceUpdate()
    })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadding: false }))
  }

  ChangePrint(e, key) {
    this.setState({ loadFrm: true })
    let data = { id: key, Print: e }
    DocumentBatchCreateSubAction.ChangePrint(data)
      .then(res => {
        // this.formRef.current?.setFieldsValue({
        //   tableData: res ? res : []
        // })

        this.forceUpdate()
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ loadFrm: false }))
  }

  ChangeOutputUnit() {
    this.setState({ loadFrm: true })
    let dataView = { ...this.formRef.current?.getFieldValue() }
    let data = {
      OutputPattern: this.formRef.current?.getFieldValue("OutputPattern"),
      OutputUnit: this.formRef.current?.getFieldValue("OutputUnit"),
      dataView: dataView
    }
    DocumentBatchCreateSubAction.ChangeOutputUnit(data)
      .then(res => {
        this.FromSetTable()
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ loadFrm: false }))
  }

  ChangeSpecifiedIssue(check) {
    this.setState({ loadFrm: true, CheckSpecifiedIssue: check })
    let dataView = { ...this.formRef.current?.getFieldValue() }
    let data = {
      SpecifiedIssue: check,
      OutputPattern: this.formRef.current?.getFieldValue("OutputPattern"),
      OutputUnit: this.formRef.current?.getFieldValue("OutputUnit"),
      dataView: dataView
    }
    DocumentBatchCreateSubAction.ChangeSpecifiedIssue(data)
      .then(res => {
        this.FromSetTable()
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ loadFrm: false }))
  }

  ChangeOutputPattern(value) {
    this.setState({ loadFrm: true })
    let dataView = { ...this.formRef.current?.getFieldValue() }
    let data = {
      OutputPattern: value,
      OutputUnit: this.formRef.current?.getFieldValue("OutputUnit"),
      dataView: dataView
    }
    DocumentBatchCreateSubAction.ChangeOutputPattern(data).then(res => {
      this.FromSetTable()
    })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ loadFrm: false }))
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };
  ShowWS0433001_PrinterConfirm() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 500,
        component: (
          <WS0433001_PrinterConfirm
            Li_PreviewSpecifiedValue={this.formRef.current?.getFieldValue("PreviewMode")}
            Li_PrinterNoSpecifiedValue={this.formRef.current?.getFieldValue("PrinterNo")}
            onFinishScreen={(output) => {
              console.log(output);
              this.formRef.current?.setFieldsValue({
                PreviewMode: output?.Lo_Preview,
                PrinterNo: output?.Lo_PrinterNo,
                StsConfirm: output?.Lo_StsOutput
              })
              this.PrintProcess()
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  PrintProcess = () => {
    this.setState({
      isLoadingPrint: true
    })
    let params = {
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_CourseLevel: this.props.Li_CourseLevel,
      ForcedOutput: this.formRef.current.getFieldValue('ForcedOutput') ? 1 : 0,
      OutputUnit: this.formRef.current.getFieldValue('OutputUnit'),
      StsAccommodationUnitsIssued: this.formRef.current.getFieldValue('StsAccommodationUnitsIssued') ? 1 : 0,
      PreviewMode: this.formRef.current.getFieldValue("PreviewMode") ? 1 : 0,
      PrinterNo: this.formRef.current.getFieldValue("PrinterNo"),
      Submission: this.formRef.current.getFieldValue('Submission') ? 1 : 0,
      PatientNumCode: this.state.PatientNumCode
    }
    DocumentBatchCreateSubAction.PrintProcess(params)
      .then(res => {
        if (res.data.message) {
          return Modal.warning({
            title: res.data.message,
            width: 300,
          });
        } else {
          download_file(res);
          message.success("完了！");
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({
          isLoadingPrint: false
        })
      })
  }
  render() {
    return (
      <div className="document-batch-create-sub">
        <Card title="資料一括作成SUB">
          <Spin spinning={this.state.loadFrm} >
            <Form
              ref={this.formRef} initialValues={{ OutputPattern: "", OutputUnit: "" }}
              autoComplete="off"
            >
              <div style={{ background: 'rgb(17, 102, 187)', padding: '1em', }}>
                <Space>
                  <Form.Item name="OutputUnit" style={{ color: 'white' }} >
                    <Radio.Group onChange={(value) => this.ChangeOutputUnit()} >
                      <Radio value={1} style={styleLable}>個人単位</Radio>
                      <Radio value={2} style={styleLable}>帳票単位</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="StsAccommodationUnitsIssued" valuePropName="checked">
                    <Checkbox style={{
                      color: 'white',
                      display: this.formRef.current?.getFieldValue("OutputUnit") === 2 && this.formRef.current?.getFieldValue("AccommodationUnitsIssuedDisplay")
                        ? "" : "none"
                    }}  >施設単位</Checkbox>
                  </Form.Item>
                </Space>
                <Form.Item name="OutputPattern" label={<label style={styleLable}>パターン</label>}  >
                  <Select style={{ width: '85%' }} onChange={(value) => this.ChangeOutputPattern(value)} >
                    <Select.Option value="">全て</Select.Option>
                    {this.state.OutputPattern?.map(value => (
                      <Select.Option key={'OutputPattern-' + Math.random()} value={value.Linked}>{value.Display}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Space>
                  <Form.Item name="SpecifiedIssue" valuePropName="checked" >
                    <Checkbox style={styleLable} onChange={(e) => this.ChangeSpecifiedIssue(e.target.checked)} >指定</Checkbox>
                  </Form.Item>
                  <Form.Item name="ForcedOutput" valuePropName="checked" >
                    <Checkbox style={styleLable} onChange={(e) => this.FromSetTable()}>強制</Checkbox>
                  </Form.Item>
                  <Form.Item name="Submission" valuePropName="checked" >
                    <Checkbox style={styleLable} disabled={!this.formRef.current?.getFieldValue("UseSubmission")} >提出用</Checkbox>
                  </Form.Item>
                </Space>
                <Button type="primary" style={{ float: 'right' }} onClick={() => this.ShowWS0433001_PrinterConfirm()} >印刷</Button>
              </div>
              <div style={{ display: this.state.CheckSpecifiedIssue ? "" : "none" }} >
                <Table dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                  pagination={false} bordered={true} size="small"
                  loading={this.state.isLoadding} scroll={{ y: 500 }}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="印刷" width={40} dataIndex="Print" align='center'
                    render={(value, record, index) => {
                      return <Form.Item name={['tableData', index, 'Print']} style={{ marginBottom: '0px' }} valuePropName="checked" >
                        <Checkbox onChange={(e) => {
                          let check = e.target.checked
                          this.ChangePrint(check, record.id)
                        }} ></Checkbox>
                      </Form.Item>
                    }} />
                  <Table.Column title="帳票" dataIndex="expression_11"
                    render={(value, record, index) => (
                      <div>
                        <span style={{ fontWeight: record.Print ? 550 : '' }}>{record.expression_11} </span>
                      </div>
                    )}
                  />
                  <Table.Column align='center' width={60}
                    render={(value, record, index) => {
                      return (
                        <Button type='primary'
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "90%",
                                component: (
                                  <WS1543001_DocumentManageMaintain
                                    Li_MaterialManageNum={record.W7_material_manage_num}
                                    onFinishScreen={(output) => {
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                        >選択</Button>
                      )
                    }}
                  />
                </Table>
              </div>
              <div style={{ display: this.state.CheckSpecifiedIssue ? "none" : "" }}>
                <Table dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                  pagination={false} bordered={true} size="small"
                  loading={this.state.isLoadding} scroll={{ y: 500 }}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="帳票" dataIndex="expression_11" />
                  <Table.Column align='center' width={60}
                    render={(value, record, index) => {
                      return (
                        <Button type='primary'
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: "90%",
                                component: (
                                  <WS1543001_DocumentManageMaintain
                                    Li_MaterialManageNum={record.W7_material_manage_num}
                                    onFinishScreen={(output) => {
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                        >選択</Button>
                      )
                    }}
                  />
                </Table>
              </div>
            </Form>
          </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0650001_DocumentBatchCreateSub);
