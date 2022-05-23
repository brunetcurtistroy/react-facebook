import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GetImage from "constants/Images";

import { DoubleLeftOutlined, DoubleRightOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Input, Select, Checkbox, Button, Space, Row, Col, Dropdown, Form, Modal, Menu, Table, message } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import {
  getContractEditingSubSetIncludeAction,
  getScreenDataContractEditingSubAction,
  getContractEditingSubInspectContentAction,
  addContractEditingSubAction,
  removeContractEditingSubAction,
  saveAndUpdateContractEditingSubAction,
  saveAmountSub,
  contractListAction
} from 'redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions';

import WS0333001_SetIncludesQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333001_SetIncludesQuery";
import WS0311005_MoneyAmountInputSub from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0311005_MoneyAmountInputSub";
import WS0332001_ContractCourseBreakdownInquiry from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0332001_ContractCourseBreakdownInquiry";
import WS0310120_ConditionSetting from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0310120_ConditionSetting.jsx';
import Color from "constants/Color";
import { debounce } from "lodash";

const styleForm = { margin: 0 }
const styleSpan = {
  float: 'right',
  padding: '0px 5px',
}
class WS0310004_ContractEditingSub extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgs: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_BasicOption: PropTypes.any,
    Li_Tax: PropTypes.any,
    Li_Rounding: PropTypes.any,
    Li_TaxClassify: PropTypes.any,
    Li_OtherGroup: PropTypes.any,
    Li_Course: PropTypes.any,
    Lo_StsUpdate: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '契約内容編集';

    this.state = {
      isLoadingLeft: true,
      isLoadingRight: true,
      rowSelectLeft: {},
      selectedRowKeyLeft: [],
      rowSelectRight: {},
      selectedRowKeyRight: [],
      SetIncludes: [],  // list item left
      ContractInspectionContent: [], //list item right
      DataClassify: [], // onSelect right
      keyClassify: 10,

      enabledForward: false,
      enabledBackward: false,

      SetAmountTax: false,

      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataScreen: {}
    };

    this.onForward = this.onForward.bind(this)
    this.onBackward = this.onBackward.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    this.getDataScreen()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getDataScreen()
    }
  }

  getDataScreen() {
    let params = {
      Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
      Li_ContractOrgs: this.props.Li_ContractOrgCode ? this.props.Li_ContractOrgCode : '',
      Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate?.replaceAll('-', '/') : '',
      Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
      Li_BasicOption: this.props.Li_BasicOption ? this.props.Li_BasicOption : 0,
      Li_Tax: this.props.Li_Tax ? this.props.Li_Tax : 0,
      Li_Rounding: this.props.Li_Rounding ? this.props.Li_Rounding : 0,
      Li_TaxClassify: this.props.Li_TaxClassify ? this.props.Li_TaxClassify : 0,
      Li_OtherGroup: this.props.Li_OtherGroup ? this.props.Li_OtherGroup : 0,
      Li_Course: this.props.Li_Course ? this.props.Li_Course : ''
    }
    getScreenDataContractEditingSubAction(params)
      .then(res => {
        this.setState({
          DataClassify: res?.SetIncludes,
          keyClassify: res?.DataClassify,
          SetAmountTax: res?.SetAmountTax,
          isLoadingLeft: true,
          isLoadingRight: true,
          enabledForward: false,
          enabledBackward: false,
          dataScreen: res || {}
        })
        this.formRef.current?.setFieldsValue({
          DataClassify: res?.DataClassify
        })

        this.getDataInspectContent(true)
      });
  }

  getDataSetIncludes() {
    let setIdentifierF = this.formRef.current?.getFieldValue('Category1') ? ''
      : this.formRef.current?.getFieldValue('Category2') === 1 ? 'Cos'
        : this.formRef.current?.getFieldValue('Category2') === 2 ? 'Set'
          : this.formRef.current?.getFieldValue('Category2') === 3 ? 'Opt' : '!'

    let setIdentifierT = this.formRef.current?.getFieldValue('Category1') ? ''
      : this.formRef.current?.getFieldValue('Category2') === 1 ? 'Cos'
        : this.formRef.current?.getFieldValue('Category2') === 2 ? 'Set'
          : this.formRef.current?.getFieldValue('Category2') === 3 ? 'Opt' : 'ÿ'

    let params = {
      Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
      Li_ContractOrgs: this.props.Li_ContractOrgCode ? this.props.Li_ContractOrgCode : '',
      Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate?.replaceAll('-', '/') : '',
      Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
      Li_BasicOption: this.props.Li_BasicOption ? this.props.Li_BasicOption : 0,
      Li_Tax: this.props.Li_Tax ? this.props.Li_Tax : 0,
      Li_Rounding: this.props.Li_Rounding ? this.props.Li_Rounding : 0,
      Li_TaxClassify: this.props.Li_TaxClassify ? this.props.Li_TaxClassify : 0,
      Li_OtherGroup: this.props.Li_OtherGroup ? this.props.Li_OtherGroup : 0,
      Li_Course: this.props.Li_Course ? this.props.Li_Course : '',
      Li_SetIdentifierF: setIdentifierF,
      Li_SetIdentifyT: setIdentifierT,
      Li_SearchChar: this.formRef.current?.getFieldValue('SearchChar'),
      DataClassify: this.formRef.current?.getFieldValue('DataClassify')
    }

    this.setState({ isLoadingLeft: true })
    getContractEditingSubSetIncludeAction(params)
      .then(res => {
        let data = res ? res : []
        data.map(x => (
          x.textColor = this.state.ContractInspectionContent.findIndex(y => y.W4_set_cd === x.set_code) === -1 ? '' : '#b9b9b9'
        ))
        this.setState({
          SetIncludes: res ? data : [],
          isLoadingLeft: false,
          rowSelectLeft: {},
          selectedRowKeyLeft: [],
          enabledForward: false,
        });

      })
      .finally(() => this.setState({ isLoadingLeft: false }))
  }

  getDataInspectContent(getDataSet) {
    let params = {
      Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
      Li_ContractOrgCode: this.props.Li_ContractOrgCode ? this.props.Li_ContractOrgCode : '',
      Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate?.replaceAll('-', '/') : '',
      Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
      Li_BasicOption: this.props.Li_BasicOption ? this.props.Li_BasicOption : 0,
    }

    this.setState({ isLoadingRight: true })
    getContractEditingSubInspectContentAction(params)
      .then(async res => {
        await this.setState({
          ContractInspectionContent: res ? res : [],
          isLoadingRight: false,
          selectedRowKeyRight: [],
          rowSelectRight: {},
          enabledBackward: false
        });

        if (getDataSet) {
          this.getDataSetIncludes()
        }
      })
      .finally(() => this.setState({ isLoadingRight: false }))
  }

  onForward(keyClassify) {
    let arrTemp = [...this.state.ContractInspectionContent];
    let index = arrTemp.findIndex(x => x.W4_set_cd === this.state.rowSelectLeft.set_code);

    let obj = { ...this.state.rowSelectLeft };

    if (index === -1) {
      if (keyClassify) {
        this.setState({ keyClassify: keyClassify })
        obj.keyClassify = keyClassify;
      } else {
        obj.keyClassify = this.state.keyClassify;
      }

      let params = {
        DataClassify: obj.keyClassify,
        set_code: obj.set_code,
        unit_price: obj.unit_price,
        Li_TaxClassify: this.props.Li_TaxClassify ? this.props.Li_TaxClassify : 0,
        SetAmountTax: this.state.SetAmountTax,
        Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
        Li_ContractOrgs: this.props.Li_ContractOrgCode ? this.props.Li_ContractOrgCode : '',
        Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate?.replaceAll('-', '/') : '',
        Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
        start_date_on: obj.start_date_on,
        BasicItems: this.state.dataScreen.BasicItems,
        AddItems: this.state.dataScreen.AddItems,
        DeleteItem: this.state.dataScreen.DeleteItem,
        CourseList: this.state.dataScreen.CourseList,
      }

      let paramsUpdate = {
        Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
        Li_ContractOrgCode: this.props.Li_ContractOrgCode ? this.props.Li_ContractOrgCode : '',
        Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate?.replaceAll('-', '/') : '',
        Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
        Li_BasicOption: this.props.Li_BasicOption ? this.props.Li_BasicOption : 0,
        Li_TaxClassify: this.props.Li_TaxClassify ? this.props.Li_TaxClassify : 0,
      }

      addContractEditingSubAction(params)
        .then(async res => {
          this.setState({
            dataScreen: res?.data || {}
          })
          this.getDataInspectContent(true)
          if (this.props.onChangeValue) {
            this.props.onChangeValue({
              Lo_stsChangeValue: true,
              data: paramsUpdate
            });
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

  onBackward(record) {
    const params = {
      id: record.id,
      W4_data_partition: record.W4_data_partition,
      W4_set_cd: record.W4_set_cd,
      Li_BasicOption: this.props.Li_BasicOption ? this.props.Li_BasicOption : 0,
      Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
      Li_ContractOrgs: this.props.Li_ContractOrgCode ? this.props.Li_ContractOrgCode : '',
      Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate?.replaceAll('-', '/') : '',
      Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
      BasicItems: this.state.dataScreen.BasicItems,
      AddItems: this.state.dataScreen.AddItems,
      DeleteItem: this.state.dataScreen.DeleteItem,
      CourseList: this.state.dataScreen.CourseList,
    }

    let paramsUpdate = {
      Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
      Li_ContractOrgCode: this.props.Li_ContractOrgCode ? this.props.Li_ContractOrgCode : '',
      Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate?.replaceAll('-', '/') : '',
      Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
      Li_BasicOption: this.props.Li_BasicOption ? this.props.Li_BasicOption : 0,
      Li_TaxClassify: this.props.Li_TaxClassify ? this.props.Li_TaxClassify : 0,
    }

    this.setState({
      isLoadingLeft: true,
      isLoadingRight: true
    })
    removeContractEditingSubAction(params)
      .then(async res => {
        this.setState({
          dataScreen: res?.data || {}
        })
        this.getDataInspectContent(true)
        message.success('正常に削除されました !');

        if (this.props.onChangeValue) {
          this.props.onChangeValue({
            Lo_stsChangeValue: true,
            data: paramsUpdate
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoadingLeft: false,
          isLoadingRight: false
        })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  conFirmUpdateData() {
    Modal.confirm({
      width: 300,
      title: '変更内容を更新しますか？',
      icon: <QuestionCircleOutlined style={{ color: '#1890ff' }} />,
      onOk: () => {
        this.saveAndUpdateData()
      }
    })
  }

  saveAndUpdateData() {
    let params = {
      Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
      Li_ContractOrgCode: this.props.Li_ContractOrgCode ? parseInt(this.props.Li_ContractOrgCode) : 0,
      Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate?.replaceAll('-', '/') : '',
      Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
      Li_BasicOption: this.props.Li_BasicOption ? this.props.Li_BasicOption : 0,
      Li_TaxClassify: this.props.Li_TaxClassify ? this.props.Li_TaxClassify : 0,
    }

    saveAndUpdateContractEditingSubAction(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({ Lo_StsUpdate: true })
        }
      })
  }

  saveAmountSub(values) {
    let params = { ...values }
    saveAmountSub(params)
      .then((res) => {
        this.getDataInspectContent(false)
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

  contractList() {
    let params = {
      Li_ContractType: this.props.Li_ContractType,
      Li_ContractOrgs: this.props.Li_ContractOrgCode,
      Li_ContractStartDate: this.props.Li_ContractStartDate,
      Li_ContractNum: this.props.Li_ContractNum
    }
    contractListAction(params)
      .then((res) => {
        this.showModalContractCourseBreakdownInquiry(res.data)
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

  showModalContractCourseBreakdownInquiry(data) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 500,
        component: (<WS0332001_ContractCourseBreakdownInquiry
          Li_ContractType={this.props.Li_ContractType}
          Li_ContractOrgCode={this.props.Li_ContractOrgCode}
          Li_ContractStartDate={this.props.Li_ContractStartDate}
          Li_ContractNum={this.props.Li_ContractNum}
          Li_CourseCode={this.props.Li_Course}
          Li_CourseInspectItemsMax1000={data.CourseList}
          onFinishScreen={(data) => {
            this.closeModal()
          }}
        />),
      },
    })
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  render() {
    const { childModal } = this.state;
    return (
      <div className="contract-editing-sub" >
        <Card title="契約内容編集" className="mb-3">
          <Form ref={this.formRef} initialValues={{ Category1: false, Category2: 0 }}>
            <Row gutter={24}>
              <Col span={11}>
                <div style={{ background: '#1166BB', color: 'white', padding: '10px' }}>
                  <Space >
                    <Form.Item name='Category1' valuePropName='checked' style={styleForm}>
                      <Checkbox onChange={() => this.getDataSetIncludes()}><span style={{ color: '#fff' }}>単品</span></Checkbox>
                    </Form.Item>
                    <Form.Item name="Category2" style={styleForm}>
                      <Select style={{ width: 100 }} onChange={() => this.getDataSetIncludes()}>
                        <Select.Option value={0}>全て</Select.Option>
                        <Select.Option value={1}>コース</Select.Option>
                        <Select.Option value={2}>セット</Select.Option>
                        <Select.Option value={3}>ｵﾌﾟｼｮﾝ</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name='SearchChar' style={styleForm}>
                      <Input onChange={debounce((e) => this.getDataSetIncludes(), 300)} />
                    </Form.Item>
                  </Space>
                </div >
                <Table style={{ height: "65vh", overflow: 'auto' }} className='scrollbar'
                  size="small"
                  dataSource={this.state.SetIncludes}
                  loading={this.state.isLoadingLeft}
                  bordered
                  pagination={false}
                  rowKey={record => record.id}
                  showHeader={false}
                  rowSelection={{
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKeyLeft,
                    onSelect: async (record, selected, selectedRows) => {
                      await this.setState({
                        rowSelectLeft: selectedRows[0],
                        selectedRowKeyLeft: selectedRows.map(x => x.id),
                        enabledForward: true,
                        enabledBackward: false,
                        selectedRowKeyRight: []
                      });
                    },
                  }}
                >
                  <Table.Column dataIndex='set_code'
                    render={(text, record, index) => (
                      <span style={{ color: record.textColor }}>{record.set_code}</span>
                    )}
                  />
                  <Table.Column dataIndex='set_short_name'
                    render={(text, record, index) => (
                      <div>
                        <span style={{ color: record.textColor }}>{record.set_short_name}</span>
                        {record.Expresstion_30
                          ? <span style={{ ...styleSpan, background: Color(record.Expresstion_29).Background, color: Color(record.Expresstion_29).Foreground }}>
                            条
                          </span>
                          : ''
                        }
                      </div>
                    )} />
                  <Table.Column dataIndex='unit_price'
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ color: record.textColor }}>
                            {value === 0 ? '' : value?.toLocaleString()}
                          </span>
                        </div>
                      )
                    }} />
                  <Table.Column render={(text, record, index) => (
                    <Dropdown.Button size='small' trigger='click'
                      disabled={!this.state.enabledForward || this.state.rowSelectLeft.id !== record.id}
                      overlay={() => (
                        <Menu >
                          <Menu.Item key='照  会'
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...childModal,
                                  visible: true,
                                  width: 900,
                                  component: (<WS0333001_SetIncludesQuery
                                    Li_StartDate={this.props.Li_ContractStartDate}
                                    Li_SetCode={record.set_code}
                                    Li_CourseCode={this.props.Li_Course}
                                    onFinishScreen={(data) => {

                                      this.closeModal()
                                    }}
                                  />),
                                },
                              })
                            }}>照　会</Menu.Item>
                          <Menu.Item key='コース' hidden={this.props.Li_BasicOption !== 0}
                            onClick={() => this.onForward(10)}>コース <DoubleRightOutlined /></Menu.Item>
                          <Menu.Item key='追　加' hidden={this.props.Li_BasicOption !== 0}
                            onClick={() => this.onForward(20)}>追　加 <DoubleRightOutlined /></Menu.Item>
                          <Menu.Item key='不　要' hidden={this.props.Li_BasicOption !== 0}
                            onClick={() => this.onForward(30)}>不　要 <DoubleRightOutlined /></Menu.Item>
                          <Menu.Item key='未実施' hidden={this.props.Li_BasicOption !== 0}
                            onClick={() => this.onForward(70)}>未実施 <DoubleRightOutlined /></Menu.Item>

                          <Menu.Item key='オプション' hidden={this.props.Li_BasicOption === 0}
                            onClick={() => this.onForward(40)}>オプション <DoubleRightOutlined /></Menu.Item>
                          <Menu.Item key='追加選択' hidden={this.props.Li_BasicOption === 0}
                            onClick={() => this.onForward(50)}>追加選択 <DoubleRightOutlined /></Menu.Item>
                          <Menu.Item key='不要選択' hidden={this.props.Li_BasicOption === 0}
                            onClick={() => this.onForward(60)}>不要選択 <DoubleRightOutlined /></Menu.Item>
                        </Menu>
                      )}></Dropdown.Button>
                  )} />
                </Table>
              </Col>

              <Col span={2} style={{ textAlign: 'center' }}>
                <div style={{ marginTop: '35vh', display: 'inline-block' }}>
                  <Button size="small" type='primary'
                    disabled={!this.state.enabledForward}
                    onClick={() => this.onForward(undefined)}>追加 <DoubleRightOutlined /></Button>
                  <br /><br />
                  <Button size="small" type='primary'
                    icon={<DoubleLeftOutlined />}
                    disabled={!this.state.enabledBackward}
                    onClick={() => this.onBackward(this.state.rowSelectRight)}>削除</Button>
                </div>
              </Col>

              <Col span={11}>
                <div style={{ background: '#1166BB', color: 'white', padding: '10px' }}>
                  <Space>
                    <Form.Item style={styleForm}><img src={GetImage(this.state.keyClassify)} alt='icon' /></Form.Item>
                    <Form.Item name="DataClassify" style={styleForm}>
                      <Select style={{ width: 120 }}
                        onChange={(value) => {
                          this.setState({ keyClassify: value })
                          this.getDataSetIncludes()
                        }}>
                        {this.state.DataClassify?.map((item, index) => (
                          <Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Space>
                  <Form.Item style={{ float: 'right', margin: 0 }}>
                    <Button type="primary"
                      onClick={() => {
                        this.contractList()
                      }}>内容</Button>
                  </Form.Item>
                </div >
                <Table style={{ height: "65vh", overflow: 'auto' }} className='scrollbar'
                  size="small"
                  dataSource={this.state.ContractInspectionContent}
                  loading={this.state.isLoadingRight}
                  bordered
                  pagination={false}
                  rowKey={record => record.id}
                  showHeader={false}
                  rowSelection={{
                    type: "radio",
                    selectedRowKeys: this.state.selectedRowKeyRight,
                    onSelect: async (record, selected, selectedRows) => {
                      await this.setState({
                        rowSelectRight: selectedRows[0],
                        selectedRowKeyRight: selectedRows.map(x => x.id),
                        enabledForward: false,
                        enabledBackward: true,
                        selectedRowKeyLeft: []
                      });
                    }
                  }}
                >
                  <Table.Column render={(text, record, index) => (
                    <img src={GetImage(record.W4_data_partition)} alt="icon" />
                  )} />
                  <Table.Column dataIndex='Expresstion_19' />
                  <Table.Column dataIndex='set_short_name' render={(text, record, index) => (
                    <>
                      <span>{record.set_short_name}</span>
                      {record.Expresstion_18
                        ? <span style={{ ...styleSpan, background: Color(record.Expresstion_17).Background, color: Color(record.Expresstion_17).Foreground }}>
                          条
                        </span>
                        : ''
                      }
                    </>
                  )} />
                  <Table.Column dataIndex='Expresstion_9'
                    render={(value, record, index) => {
                      return (
                        <div style={{ textAlign: 'right' }}>
                          {value === 0 ? '' : value?.toLocaleString()}
                        </div>
                      )
                    }} />
                  <Table.Column render={(text, record, index) => (
                    <Dropdown.Button size='small' trigger='click'
                      disabled={!this.state.enabledBackward || this.state.rowSelectRight.id !== record.id} overlay={() => (
                        <Menu expandIcon >
                          <Menu.Item key='照会' onClick={() => {
                            this.setState({
                              childModal: {
                                ...childModal,
                                visible: true,
                                width: 900,
                                component: (<WS0333001_SetIncludesQuery
                                  Li_StartDate={this.props.Li_ContractStartDate}
                                  Li_SetCode={record.W4_set_cd}
                                  Li_ContractOrgs={this.props.Li_ContractOrgCode}
                                  Li_ContractNum={this.props.Li_ContractNum}
                                  Li_ContractType={this.props.Li_ContractType}
                                  Li_CourseCode={this.props.Li_Course}

                                  onFinishScreen={(data) => {

                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }}>照　会</Menu.Item>
                          <Menu.Item key='金額変更' onClick={() => {
                            this.setState({
                              childModal: {
                                ...childModal,
                                visible: true,
                                width: 700,
                                component: (<WS0311005_MoneyAmountInputSub
                                  Li_TaxRate={this.props.Li_Tax}
                                  Li_Rounding={this.props.Li_Rounding}
                                  Li_TaxClassify={this.props.Li_TaxClassify}
                                  Li_OtherGroupDivision={this.props.Li_OtherGroup}
                                  Li_Protection={''}
                                  Li_Title={record.set_short_name}
                                  Lio_InsurerUnitPriceAmount={record.W4_insurer_unit_price ? record.W4_insurer_unit_price : ''}
                                  Lio_InsurerTax={record.W4_insurer_tax ? record.W4_insurer_tax : ''}
                                  Lio_InsurerTotal={record.W4_insurer_total ? record.W4_insurer_total : ''}
                                  Lio_OfficeUnitPriceAmount={record.W4_office_unit_price ? record.W4_office_unit_price : ''}
                                  Lio_OfficeTax={record.W4_office_tax ? record.W4_office_tax : ''}
                                  Lio_OfficeTotal={record.W4_office_total ? record.W4_office_total : ''}
                                  Lio_OtherGroupUnitPriceAmount={record.W4_other_org_unit_price ? record.W4_other_org_unit_price : ''}
                                  Lio_OtherGroupTax={record.W4_other_org_tax ? record.W4_other_org_tax : ''}
                                  Lio_OtherGroupTotal={record.W4_other_org_total ? record.W4_other_org_total : ''}
                                  Lio_Personal1UnitPriceAmount={record.W4_person_1_unit_price ? record.W4_person_1_unit_price : ''}
                                  Lio_Personal1Tax={record.W4_person_1_tax ? record.W4_person_1_tax : ''}
                                  Lio_Personal1Total={record.W4_person_1_total ? record.W4_person_1_total : ''}
                                  Lio_Person2UnitPriceAmount={record.W4_person_2_unit_price ? record.W4_person_2_unit_price : ''}
                                  Lio_Person2Tax={record.W4_person_2_tax ? record.W4_person_2_tax : ''}
                                  Lio_Person2Total={record.W4_person_2_total ? record.W4_person_2_total : ''}
                                  Lio_Personal3UnitPriceAmount={record.W4_person_3_unit_price ? record.W4_person_3_unit_price : ''}
                                  Lio_Personal3Tax={record.W4_person_3_tax ? record.W4_person_3_tax : ''}
                                  Lio_Personal3Total={record.W4_person_3_total ? record.W4_person_3_total : ''}
                                  Lio_StsChange={false}

                                  onFinishScreen={(data) => {
                                    let dataResult = {
                                      ...data,
                                      id: record.id,
                                      Lio_InsurerTotal: data.Lio_InsurerUnitPriceAmount + data.Lio_InsurerTax,
                                      Lio_OfficeTotal: data.Lio_OfficeUnitPriceAmount + data.Lio_OfficeTax,
                                      Lio_OtherGroupTotal: data.Lio_OtherGroupUnitPriceAmount + data.Lio_OtherGroupTax,
                                      Lio_Personal1Total: data.Lio_Personal1UnitPriceAmount + data.Lio_Personal1Tax,
                                      Lio_Person2Total: data.Lio_Person2UnitPriceAmount + data.Lio_Person2Tax,
                                      Lio_Personal3Total: data.Lio_Personal3UnitPriceAmount + data.Lio_Personal3Tax,

                                    }
                                    this.saveAmountSub(dataResult)
                                    this.closeModal()
                                  }}
                                />),
                              },
                            })
                          }}>金額変更</Menu.Item>
                          <Menu.Item key='条件変更'
                            hidden={this.props.Li_BasicOption === 0 || record.W4_data_partition === 50 || record.W4_data_partition === 60}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...childModal,
                                  visible: true,
                                  width: 800,
                                  component: (<WS0310120_ConditionSetting
                                    Li_ContractStartDate={this.props.Li_ContractStartDate}
                                    Li_SetCode={record.W4_set_cd}
                                    onFinishScreen={({ Lo_stsChangeValue }) => {
                                      this.closeModal();
                                      if (Lo_stsChangeValue) {
                                        let data = {
                                          Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
                                          Li_ContractOrgCode: this.props.Li_ContractOrgCode ? parseInt(this.props.Li_ContractOrgCode) : 0,
                                          Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate?.replaceAll('-', '/') : '',
                                          Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
                                          Li_BasicOption: this.props.Li_BasicOption ? this.props.Li_BasicOption : 0,
                                          Li_TaxClassify: this.props.Li_TaxClassify ? this.props.Li_TaxClassify : 0,
                                        }
                                        this.getDataInspectContent();
                                        this.props.onChangeValue({ Lo_stsChangeValue, data });
                                      }
                                    }}
                                  />),
                                },
                              })
                            }}>条件変更</Menu.Item>
                          <Menu.Item key='削　除'
                            onClick={() => this.onBackward(record)}><DoubleLeftOutlined />
                            削　除
                          </Menu.Item>
                        </Menu>
                      )}></Dropdown.Button>
                  )} />
                </Table>
              </Col>
            </Row>
            <Row style={{ float: 'right', marginTop: '20px' }}>
              <Button type='primary'
                onClick={() => this.conFirmUpdateData()}
              >
                保存
              </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0310004_ContractEditingSub);
