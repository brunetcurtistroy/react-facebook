import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Checkbox, Select, Table, Row, Col, Tooltip, message, InputNumber, Button } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS1004007_JudgeSelect from 'pages/KK_ResultOutput/V4TO0005000_RomotoArticle52/WS1004007_JudgeSelect.jsx';
import WS0104001_CoursesSettingSub from 'pages/KS_CooperationRelated/YMGA0610_EMedicalRecordsInspectRequestMaintain/WS0104001_CoursesSettingSub.jsx';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS0267001_CategorySearchQuerySingle from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx';
import {
  deleteSettingRomotoArticle52Action, getDataSettingRomotoArticle52Action, getScreenSettingRomotoArticle52Action,
  saveAndUpdateSettingRomotoArticle52Action, saveDataSbufixSettingRomotoArticle52Action, getNameCategoryInspectCodeRomotoArticle52Action
} from "redux/ResultOutput/RomotoArticle52/SettingRomotoArticle52.actions";
import { ModalConfirm, ModalError } from "components/Commons/ModalConfirm";
import { ModalCustom } from "components/Commons/ModalCustom";
import { Regex } from "helpers/CommonHelpers";

const styleDivTitle = { background: '#1C66B9', color: '#FFFFFF', padding: '2px 6px', textAlign: 'center' };
class WS1004001_SettingRomotoArticle52 extends React.Component {
  inputRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '設定[労基５２条]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      isChangeError: false,
      CategoryAndInspectDivisionTemp: '',
      initparams: {
        YesAbnormalFindings: '',
        DoctorInstructs: '',
        StsModify: false,
        OrNot: '',
        CourseList: '',
        StyleCode: '',
      },
    };
  }

  componentDidMount() {
    this.loadInitData()
  }

  loadInitData = () => {
    getScreenSettingRomotoArticle52Action()
      .then(res => {
        if (res.data) {
          this.setState({ initparams: { ...res.data } });
          this.loadData(res.data.StyleCode)
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = (params) => {
    this.setState({ isLoading: true, dataSource: [], rowSelect: {} });
    getDataSettingRomotoArticle52Action({ Li_StyleCode: params })
      .then(res => {
        if (res.data) {
          let data = res?.data ? res.data : [];
          let row = data[0];
          this.setState({
            dataSource: data,
            rowSelect: row,
            CategoryAndInspectDivisionTemp: row.CategoryAndInspectDivision
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(this.setState({ isLoading: false }))
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  saveDataSubfix = (pamrams) => {
    saveDataSbufixSettingRomotoArticle52Action(pamrams)
      .then()
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  handleChangInitParams = (value, name) => {
    this.setState({
      initparams: {
        ...this.state.initparams,
        [name]: value
      }
    })
  }

  focusNode = (e) => {
    if (this.state.initparams.StsModify) {
      let el = this.inputRef.current;
      let elemLen = e.target.value ? e.target.value.length : 0;
      el.selectionStart = 0;
      el.selectionEnd = elemLen;
      el.focus();
    }
  }

  handleChangeInput = (record, value, name, Expression_13) => {
    let flg = false;
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.findIndex(item => item.id === record.id);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      if (name === 'CategoryAndInspectDivision') {
        flg = true;
        if (this.state.CategoryAndInspectDivisionTemp === value) {
          flg = false;
          this.setState({ isChangeError: false });
        }
      }
      if (name === 'CategoryAndInspectCode') {
        objTemp = {
          ...objTemp,
          format_name: !objTemp.format_name ? Expression_13 : objTemp.format_name,
          Expression_26: !objTemp.format_name ? Expression_13 : objTemp.Expression_26,
          Expression_13: Expression_13 ? Expression_13 : '',
          CategoryAndInspectDivision: value !== null ? objTemp.CategoryAndInspectDivision : ''
        }
        if (value === null) {
          this.setState({ CategoryAndInspectDivisionTemp: '' })
        }
        flg = false;
        this.setState({ isChangeError: false });
      }
      if (name === 'format_name') {
        objTemp = {
          ...objTemp,
          Expression_26: value
        }
      }

      if (flg) this.setState({ isChangeError: true });

      arrTemp[index] = objTemp;
      this.setState({
        dataSource: arrTemp,
        rowSelect: objTemp
      });
    }
  }

  saveAndUpdateRecord = (record) => {
    const params = {
      ...record,
      Li_StyleCode: this.state.initparams.StyleCode,
      StsInspect: record.CategoryAndInspectCode > 0 ? true : false,
      StsCategory: ''
    }
    if (record.isNew) {
      delete params.id;
      delete params.isNew;
    }
    saveAndUpdateSettingRomotoArticle52Action(params)
      .then(res => this.loadData(this.state.initparams.StyleCode))
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  deleteRecord = (record, index) => {
    if (record.id && !record.isNew) {
      deleteSettingRomotoArticle52Action({ id: record.id })
        .then()
        .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
    }
    let arrTemp = [...this.state.dataSource];
    arrTemp.splice(index, 1);
    this.setState({
      dataSource: arrTemp,
      rowSelect: arrTemp.length > 0 ? arrTemp[0] : {}
    });
  }

  renderEventAddRecord = () => {
    let obj = {
      id: Math.round(Math.random() * 1000),
      isNew: true,
      CategoryAndInspectDivision: '',
    };
    let arr = [...this.state.dataSource];
    let index = arr.findIndex(item => item.id === this.state.rowSelect.id);
    arr.splice(index + 1, 0, obj); // array.splice(startIndex, deleteCount, itemsNew)
    return (
      <Button
        size='small'
        type='primary'
        icon={<PlusOutlined />}
        onClick={() => {
          if (this.state.isChangeError) {
            ModalError('指定のｺｰﾄﾞが無効です');
          } else {
            this.setState({ dataSource: arr, rowSelect: obj })
          }
        }}
      />
    )
  }

  renderEventRecord = (record, index) => (
    <>
      <Button
        size='small'
        style={{ border: 'none', display: !(record.id === this.state.rowSelect.id) ? 'none' : '' }}
        icon={<SaveOutlined style={{ color: 'green' }} />}
        onClick={() => {
          if (!this.state.isChangeError)
            this.saveAndUpdateRecord(record)
        }}
      />
      <Button
        size='small'
        style={{ border: 'none', display: !(record.id === this.state.rowSelect.id) ? 'none' : '' }}
        danger icon={<DeleteOutlined />}
        onClick={() => {
          if (!this.state.isChangeError) {
            ModalConfirm({
              content: '消去してもよろしいですか？',
              autoFocusButton: 'cancel',
              onOk: () => this.deleteRecord(record, index),
            })
          }
        }}
      />
    </>
  )

  openModalWS1004007 = (props, record) => {
    if (this.state.initparams.StsModify)
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: '20%',
          component: (
            <WS1004007_JudgeSelect
              {...props}
              onFinishScreen={({ Lio_JudgeList, Lio_YesFindingsList, Lio_DoctorInstructedList }) => {
                if (record?.id) {
                  let arr = [...this.state.dataSource];
                  let index = this.findIndexByID(arr, record.id);
                  record = {
                    ...record,
                    Judge: Lio_JudgeList,
                    YesAbnormalFindings: Lio_YesFindingsList,
                    DoctorInstructs: Lio_DoctorInstructedList,
                  }
                  arr[index] = record;
                  this.setState({ dataSource: arr, rowSelect: record })
                } else {
                  this.setState({
                    initparams: {
                      ...this.state.initparams,
                      YesAbnormalFindings: Lio_YesFindingsList,
                      DoctorInstructs: Lio_DoctorInstructedList
                    }
                  })
                }
              }}
            />
          ),
        },
      })
  }

  ReturnComponent = (component) => {
    let components = {
      WS0271001_InspectItemSearchQuerySingle,
      WS0267001_CategorySearchQuerySingle
    };
    return components[component];
  }

  openModalValueCategoryAndInspectCode = (props, nameScreen, width) => {
    let Component = this.ReturnComponent(nameScreen);
    if (this.state.initparams.StsModify)
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: width,
          component: (
            <Component
              {...props}
              onFinishScreen={({ Lio_CategoryCode, Lio_InspectItemCode, recordData }) => {
                if (nameScreen === 'WS0271001_InspectItemSearchQuerySingle') {
                  this.handleChangeInput(this.state.rowSelect, Lio_InspectItemCode, 'CategoryAndInspectCode', recordData.exam_name)
                } else {
                  this.handleChangeInput(this.state.rowSelect, Lio_CategoryCode, 'CategoryAndInspectCode', recordData.category_name)
                }
                this.closeModal()
              }}
            />
          ),
        },
      })
  }

  findIndexByID = (arrayData, recordID) => arrayData.findIndex((item) => recordID === item.id);

  getNameCategoryInspectCode = (value, rowSelect) => {
    if (value)
      getNameCategoryInspectCodeRomotoArticle52Action({ 
        CategoryAndInspectCode: value,
        CategoryAndInspectDivision: rowSelect.CategoryAndInspectDivision
      })
        .then(res => {
          this.handleChangeInput(rowSelect, value, 'CategoryAndInspectCode', res?.data?.Expression_13)
        })
        .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  componentWillUnmount = () => {
    this.saveDataSubfix(this.state.initparams);
  }

  render() {
    let textTooltip = '設定されていない場合は、検査・ｶﾃｺﾞﾘ判定から算定されます。';
    let textTooltipTable = 'ダブルクリックをしてください';
    const { rowSelect, initparams } = this.state;
    const { StsModify } = initparams;
    return (
      <div className="setting-romoto-article52">
        <Card title="設定[労基５２条]">
          <Form autoComplete='off'>
            <Row gutter={10}>
              <Col span={6}>
                <Form.Item label={<Tooltip title={textTooltip}>有所見者</Tooltip>} >
                  <Tooltip title={textTooltip}>
                    <Input
                      readOnly={!StsModify}
                      value={initparams.YesAbnormalFindings}
                      onChange={e => this.handleChangInitParams(e.target.value, 'YesAbnormalFindings')}
                      onDoubleClick={() => {
                        let props = {
                          Li_InspectAndTotal: 1,
                          Lio_JudgeList: '',
                          Lio_YesFindingsList: initparams.YesAbnormalFindings,
                          Lio_DoctorInstructedList: initparams.DoctorInstructs,
                        }
                        this.openModalWS1004007(props)
                      }}
                    />
                  </Tooltip>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={<Tooltip title={textTooltip}>医師指示</Tooltip>} >
                  <Tooltip title={textTooltip}>
                    <Input
                      readOnly={!StsModify}
                      value={initparams.DoctorInstructs}
                      onChange={e => this.handleChangInitParams(e.target.value, 'DoctorInstructs')}
                      onDoubleClick={() => {
                        let props = {
                          Li_InspectAndTotal: 1,
                          Lio_JudgeList: '',
                          Lio_YesFindingsList: initparams.YesAbnormalFindings,
                          Lio_DoctorInstructedList: initparams.DoctorInstructs,
                        }
                        this.openModalWS1004007(props)
                      }}
                    />
                  </Tooltip>
                </Form.Item>
              </Col>
              <Col offset={10} span={2}>
                <Form.Item style={{ float: 'right' }}>
                  <Checkbox
                    checked={initparams.StsModify}
                    onChange={e => this.handleChangInitParams(e.target.checked, 'StsModify')}
                  >修正</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col span={6}>
                <Form.Item label="&ensp;受診ｺｰｽ" >
                  <Select
                    value={initparams.OrNot}
                    disabled={!StsModify}
                    onChange={value => this.handleChangInitParams(value, 'OrNot')}
                  >
                    <Select.Option value="">全　て</Select.Option>
                    <Select.Option value="OR">対　象</Select.Option>
                    <Select.Option value="NOT">対象外</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={15}>
                <Form.Item hidden={initparams.OrNot === ''}>
                  <Input
                    readOnly={!StsModify}
                    value={initparams.CourseList}
                    onChange={e => this.handleChangInitParams(e.target.value, 'CourseList')}
                    onDoubleClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '40%',
                          component: (
                            <WS0104001_CoursesSettingSub
                              Li_Title={'対象ｺｰｽ一覧'}
                              Lio_CourseList={initparams.CourseList}
                              onFinishScreen={({ Lio_CourseList }) => {
                                this.handleChangInitParams(Lio_CourseList, 'CourseList')
                                this.closeModal()
                              }}
                            />
                          ),
                        },
                      })
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Table
              className='mt-3'
              style={{ height: '375px' }}
              bordered
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
              rowKey={(record) => record.id}
              onRow={(record, index) => ({
                onClick: event => {
                  if (this.state.isChangeError) {
                    ModalError('指定のｺｰﾄﾞが無効です');
                  } else {
                    this.setState({
                      rowSelect: record,
                      CategoryAndInspectDivisionTemp: record.CategoryAndInspectDivision
                    })
                  }
                }
              })}
            >
              <Table.Column title="集計" dataIndex="AggregateClassify" width={50} render={(text, record) => (
                <InputNumber
                  value={record.AggregateClassify}
                  readOnly={!StsModify}
                  bordered={record.id === rowSelect.id}
                  maxLength={2} onChange={(value) => this.handleChangeInput(record, value, 'AggregateClassify')}
                  // formatter={(value) => value.toString().padStart(2, "0")}
                  ref={this.inputRef}
                  onClick={this.focusNode}
                />
              )} />
              <Table.Column title="名称" dataIndex="Expression_26" />
              <Table.Column title="異常となる判定" dataIndex="Judge" render={(value, record, index) => (
                <Tooltip title={textTooltipTable}>
                  <Input
                    value={record.Judge}
                    readOnly={!StsModify}
                    bordered={record.id === rowSelect.id}
                    onChange={(e) => this.handleChangeInput(record, e.target.value, 'Judge')}
                    onDoubleClick={() => this.openModalWS1004007({
                      Li_InspectAndTotal: 0,
                      Lio_JudgeList: record.Judge,
                      Lio_YesFindingsList: record.YesAbnormalFindings,
                      Lio_DoctorInstructedList: record.DoctorInstructs,
                    }, record)}
                  />
                </Tooltip>

              )} />
              <Table.Column title="有所見者の判定" dataIndex="YesAbnormalFindings" render={(value, record) => (
                <Tooltip title={textTooltipTable}>
                  <Input
                    value={record.YesAbnormalFindings}
                    readOnly={!StsModify}
                    bordered={record.id === rowSelect.id}
                    onChange={(e) => this.handleChangeInput(record, e.target.value, 'YesAbnormalFindings')}
                    onDoubleClick={() => this.openModalWS1004007({
                      Li_InspectAndTotal: 0,
                      Lio_JudgeList: record.Judge,
                      Lio_YesFindingsList: record.YesAbnormalFindings,
                      Lio_DoctorInstructedList: record.DoctorInstructs,
                    }, record)}
                  />
                </Tooltip>

              )} />
              <Table.Column title="医師指示の判定" dataIndex="DoctorInstructs" render={(value, record) => (
                <Tooltip title={textTooltipTable}>
                  <Input
                    value={record.DoctorInstructs}
                    readOnly={!StsModify}
                    bordered={record.id === rowSelect.id}
                    onChange={(e) => this.handleChangeInput(record, e.target.value, 'DoctorInstructs')}
                    onDoubleClick={() => this.openModalWS1004007({
                      Li_InspectAndTotal: 0,
                      Lio_JudgeList: record.Judge,
                      Lio_YesFindingsList: record.YesAbnormalFindings,
                      Lio_DoctorInstructedList: record.DoctorInstructs,
                    }, record)}
                  />
                </Tooltip>
              )} />
              {!StsModify
                ? null
                : <Table.Column
                  align='center'
                  width={70}
                  title={this.renderEventAddRecord()}
                  render={(text, record) => {
                    let index = this.findIndexByID(this.state.dataSource, record.id);
                    return this.renderEventRecord(record, index)
                  }}
                />
              }
            </Table>

            <Row gutter={10} className='mt-3'>
              <Col span={2}>
                <div style={styleDivTitle}>判定対象</div>
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Select
                    disabled={!StsModify}
                    value={rowSelect.CategoryAndInspectDivision}
                    onChange={(value) => this.handleChangeInput(rowSelect, value, 'CategoryAndInspectDivision')}
                  >
                    <Select.Option value=""></Select.Option>
                    <Select.Option value="K">検査</Select.Option>
                    <Select.Option value="C">ｶﾃｺﾞﾘ</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Input.Search
                    className='floatRight'
                    readOnly={!StsModify}
                    maxLength={rowSelect.CategoryAndInspectDivision === 'C' ? 5 : 8}
                    value={rowSelect.CategoryAndInspectCode !== 0 ? rowSelect.CategoryAndInspectCode : null}
                    onChange={(e) => {
                      this.handleChangeInput(rowSelect, Regex(e.target.value, /[1-9]/) ? e.target.value : '', 'CategoryAndInspectCode')
                    }}
                    onBlur={(e) => this.getNameCategoryInspectCode(Regex(e.target.value, /[1-9]/) ? e.target.value : null, rowSelect)}
                    onSearch={() => {
                      if (rowSelect.CategoryAndInspectDivision) {
                        let props = rowSelect.CategoryAndInspectDivision === 'K'
                          ? {
                            Lio_InspectItemCode: rowSelect.CategoryAndInspectCode,
                            Li_UnusedInspectDisplay: ''
                          }
                          : {
                            Lio_CategoryCode: rowSelect.CategoryAndInspectCode,
                            Li_UnusedInspectDisplay: ''
                          }
                        rowSelect.CategoryAndInspectDivision === 'K'
                          ? this.openModalValueCategoryAndInspectCode(props, 'WS0271001_InspectItemSearchQuerySingle', '50%')
                          : this.openModalValueCategoryAndInspectCode(props, 'WS0267001_CategorySearchQuerySingle', '30%')
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item hidden={this.state.isChangeError}>
                  <Input bordered={false} readOnly value={rowSelect.Expression_13} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10} style={{ marginTop: '1.5px' }}>
              <Col span={2}>
                <div style={styleDivTitle}>表示名称</div>
              </Col>
              <Col span={22}>
                <Form.Item>
                  <Input
                    onChange={(e) => this.handleChangeInput(rowSelect, e.target.value, 'format_name')}
                    value={rowSelect.format_name}
                    readOnly={!StsModify}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10} style={{ marginTop: '1.5px' }}>
              <Col span={2}>
                <div style={styleDivTitle}>備　　考</div>
              </Col>
              <Col span={22}>
                <Form.Item>
                  <Input
                    onChange={(e) => this.handleChangeInput(rowSelect, e.target.value, 'remarks')}
                    readOnly={!StsModify}
                    value={rowSelect.remarks}
                  />
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Card>
        {ModalCustom({
          width: this.state.childModal.width,
          visible: this.state.childModal.visible,
          component: this.state.childModal.component,
          destroyOnClose: true,
          onCancel: this.closeModal
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1004001_SettingRomotoArticle52);
