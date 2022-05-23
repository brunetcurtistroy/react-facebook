import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Form, Col, Row, Input, Checkbox, Button, Radio, Table, Space, Modal, TimePicker, InputNumber, message, } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import moment from "moment";
import PropTypes from "prop-types";
import Color from 'constants/Color';

import WS2537001_PersonalReserveProcess from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess.jsx";
import WS0273001_VisitsTargetSearchQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0273001_VisitsTargetSearchQuery.jsx";
import WS2739001_ErrorConfirmSub from "pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2739001_ErrorConfirmSub.jsx";
import WS2751001_MiraisInspectMaintain from "pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2751001_MiraisInspectMaintain.jsx";
import WS2749001_CheckAvailability from "pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2749001_CheckAvailability.jsx";
import WS2745009_ConfirmScreen from "pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2745009_ConfirmScreen.jsx";
import WS2738001_LaboratoryInspectConfirmSub from 'pages/KS_CooperationRelated/FJYM01000_MiraisElectronicMedicalRecordsSent/WS2738001_LaboratoryInspectConfirmSub.jsx';

import {
  getScreenDataMiraisSingleTransmissionAction, getListDataMiraisSingleTransmissionAction, modifyDataMiraisSingleTransmissionAction,
  submitBtnMiraisSingleTransmissionAction, extractBtnMiraisSingleTransmissionAction, destroyMiraisSingleTransmissionAction, submitBtnBeforeMiraisSingleTransmissionAction
} from "redux/CooperationRelated/MiraisSingleTransmission/MiraisSingleTransmission.actions";
import GetImage from "constants/Images";

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}
class WS2737001_MiraisSingleTransmission extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
  }

  constructor(props) {
    super(props);

    // document.title = "Mirais単体送信";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: '',
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      title: '',
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      infoPage: {},

      initParams: {
        Li_ReserveNum: '',
        Li_CourseLevel: 0,
        TransmissionState: '0',
        OrderSpecies: '',
        StsModify: 0
      },
      isChange: true,
      StsConfirmScreen: false,
      StsRun: false,
    };
  }

  componentDidMount = () => {
    if (this.props.Li_ReserveNum) {
      this.setState({
        initParams: {
          ...this.state.initParams,
          Li_ReserveNum: this.props.Li_ReserveNum || '',
          Li_CourseLevel: this.props.Li_CourseLevel || 0
        }
      }, () => this.loadScreenData(this.state.initParams));
    }

  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props && this.props.Li_ReserveNum) {
      this.setState({
        initParams: {
          ...this.state.initParams,
          Li_ReserveNum: this.props.Li_ReserveNum || '',
          Li_CourseLevel: this.props.Li_CourseLevel || 0
        }
      }, () => this.loadScreenData(this.state.initParams));
    }
  }

  loadScreenData = (params) => {
    this.formRef?.current?.resetFields();
    getScreenDataMiraisSingleTransmissionAction(params)
      .then(res => {
        if (res) {
          let data = {
            ...res.data,
            period_time: res.data.period_time ? moment(res.data.period_time, 'HH:mm').format('HH:mm') : '',
            birthday_on: res.data.birthday_on ? moment(res.data.birthday_on).format('NNy/MM/DD') : '',
            Expression_13: res.data.StsConsult && res.data.StsPerson,
            Expression_15: res.data.StsConsult,
          };
          this.setState({ infoPage: data });
          this.formRef?.current?.setFieldsValue({ 'infoPage': data });
          this.getListDataMiraisSingleTransmission(this.state.initParams);
        }
      })
      .catch()
  }

  getListDataMiraisSingleTransmission = (params) => {
    this.setState({ isLoading: true, dataSource: [], rowSelect: {} });
    getListDataMiraisSingleTransmissionAction(params)
      .then(res => {
        if (res) {
          let data = res.data.map((item, index) => ({
            ...item,
            DateDisplay: item.DateDisplay === '0000/00/00' || item.DateDisplay === '0000-00-00'
              ? ''
              : moment(item.DateDisplay).format('YYYY/MM/DD'),
            OrderStartDate: item.OrderStartDate === '0000/00/00' || item.OrderStartDate === '0000-00-00'
              ? null
              : moment(item.OrderStartDate, 'YYYY/MM/DD'),
            order_start_time_at: item.order_start_time_at === '00:00:00' ? moment(item.order_start_time_at, 'HH:mm:ss') : null,
            TimeDisplay: item.TimeDisplay === '00:00:00' ? '' : item.TimeDisplay,
            order_number: item.order_number !== 0 ? item.order_number : null,
            order_subnumber: item.order_subnumber !== 0 ? item.order_subnumber : null,
            reservation_number: item.reservation_number !== 0 ? item.reservation_number : null,
          }))
          this.setState({ dataSource: data, isLoading: false, rowSelect: data.length > 0 ? data[0] : {} });
          this.formRef?.current?.setFieldsValue({ 'dataSource': data })
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        message.error(err?.response?.data?.message || "エラーが発生しました")
      })
  }

  createOrUpdateData = (record) => {
    const params = {
      id: record.isNew ? '' : record.id,
      Li_ReserveNum: this.state.initParams.Li_ReserveNum,
      personal_number_id: this.state.infoPage.personal_number_id || '',
      OrderSpecies: this.state.initParams.OrderSpecies,
      kind: record.kind,
      StsModify: this.state.initParams.StsModify,
      OrderStartDate: record.OrderStartDate ? moment(record.OrderStartDate).format('YYYY/MM/DD') : '',
      order_start_time_at: record.order_start_time_at ? moment(record.order_start_time_at).format('HH:mm:ss') : '',
      order_number: record.order_number || '',
      order_subnumber: record.order_subnumber || '',
      reservation_number: record.reservation_number || '',
      reservations_department: record.reservations_department || '',
      reservations_item_code: record.reservations_item_code || '',
      image_item_code: record.image_item_code || '',
      reservations_comment: record.reservations_comment || '',
      Submit: record.Submit || 0,
      processing_division: record.processing_division || '1'
    }
    modifyDataMiraisSingleTransmissionAction(params)
      .then(res => {
        // message.success('成功');
        this.getListDataMiraisSingleTransmission(this.state.initParams);
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  deleteData = (record, index) => {
    if (record.id && !record.isNew) {
      destroyMiraisSingleTransmissionAction({ id: record.id })
        .then(res => {
          message.success('成功');
          // this.getListDataMiraisSingleTransmission(this.state.initParams);
        })
        .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
    }
    let arrTemp = [...this.state.dataSource];
    arrTemp.splice(index, 1);
    this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
    this.setState({ dataSource: arrTemp });

  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  handleChangeInput = (record, value, name) => {
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp;
      switch (name) {
        case 'OrderStartDate':
          objTemp = {
            ...record,
            [name]: value,
            DateDisplay: value ? moment(value)?.format('YYYY/MM/DD') : null
          }
          break;
        case 'order_start_time_at':
          objTemp = {
            ...record,
            [name]: value,
            TimeDisplay: value ? moment(value, 'HH:mm:ss')?.format('HH:mm:ss') : null
          }
          break;
        case 'processing_division':
          objTemp = {
            ...record,
            [name]: value,
            ProcessSegmentDisplay: value === '1' ? '追加' : '削除'
          }
          break;

        default:
          objTemp = {
            ...record,
            [name]: value,
          }
          break;
      }
      arrTemp[index] = objTemp;
      this.setState({
        dataSource: arrTemp,
        rowSelect: objTemp
      });
      this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
    }
  }

  handleChange = (value, name) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        [name]: value
      }
    }, () => this.getListDataMiraisSingleTransmission(this.state.initParams))
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: ''
      },
    });
  }

  SubmitBtn = () => {
    submitBtnMiraisSingleTransmissionAction({ Li_ReserveNum: this.state.initParams.Li_ReserveNum })
      .then()
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  ExtractBtn = () => {
    extractBtnMiraisSingleTransmissionAction({ Li_ReserveNum: this.state.initParams.Li_ReserveNum })
      .then(res => this.loadScreenData(this.state.initParams))
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  render() {
    const { rowSelect, infoPage } = this.state;
    const { Expression_13, Expression_15 } = infoPage;
    return (
      <div className="mirais-single-transmission">
        <Card title={'Mirais単体送信' + this.state.title}>
          <Form ref={this.formRef} initialValues={this.state.initParams} className='mt-3'>
            <Row gutter={14}>
              <Col span={8}>
                <Card>
                  <Row gutter={10}>
                    <Col span={14}>
                      <Row gutter={10}>
                        <Col span={14}>
                          <Form.Item name={['infoPage', 'personal_number_id']} style={{ opacity: Expression_13 ? 1 : 0 }} >
                            <InputNumber readOnly bordered={false} />
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Button
                            type="primary"
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1500,
                                  component: <WS0273001_VisitsTargetSearchQuery
                                    LnkOutReserveNum={this.state.initParams.Li_ReserveNum}
                                    Li_StateFlagSpecify={0}
                                    Li_DateSpecify={this.state.infoPage?.visit_date_on}
                                    Li_StsConditionSpecify={''}
                                    Li_StsReceiptAmountDisplay={''}
                                    onFinishScreen={({ LnkOutReserveNum }) => {
                                      this.setState({
                                        initParams: {
                                          ...this.state.initParams,
                                          Li_ReserveNum: LnkOutReserveNum
                                        }
                                      }, () => this.loadScreenData(this.state.initParams))
                                      this.closeModal()
                                    }}
                                  />,
                                },
                              });
                            }}
                          >受診者</Button>
                        </Col>
                      </Row>
                      <Form.Item name={['infoPage', 'kana_name']} style={{ opacity: Expression_13 ? 1 : 0 }} >
                        <Input readOnly bordered={false} />
                      </Form.Item>
                      <Form.Item name={['infoPage', 'kanji_name']} style={{ opacity: Expression_13 ? 1 : 0 }}>
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item name='sex' style={{ textAlign: 'center' }}
                        hidden={!infoPage.personal_number_id}
                      >
                        <img src={infoPage.sex == 1 ? GetImage('man') : GetImage('woman')} alt="gender" style={{ width: '50px' }} />
                      </Form.Item>
                      <Form.Item name={['infoPage', 'birthday_on']} style={{ opacity: Expression_13 ? 1 : 0 }}>
                        <Input readOnly bordered={false} style={{ textAlign: 'center' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={16}>
                <Card >
                  <Row>
                    <Col span={14}>
                      <Space>
                        <Form.Item name={['infoPage', 'visit_date_on']} style={{ opacity: Expression_13 ? 1 : 0 }}>
                          <Input readOnly bordered={false} style={{ width: '90px' }} />
                        </Form.Item>
                        <Form.Item name={['infoPage', 'period_time']} style={{ opacity: Expression_13 ? 1 : 0 }}>
                          <Input readOnly bordered={false} bordered={false} />
                        </Form.Item>
                      </Space>
                    </Col>
                    <Col span={10}>
                      <Form.Item style={{ float: 'right' }}>
                        <Button
                          disabled={!Expression_15}
                          type="primary"
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '90%',
                                className: 'custom-button-close',
                                component: <WS2537001_PersonalReserveProcess
                                  Li_CourseLevel={this.state.initParams.Li_CourseLevel}
                                  Li_ReserveNum={this.state.initParams.Li_ReserveNum}
                                  Li_PersonalNum={''}
                                  Li_Date={''}
                                  Li_Getctxname={null}
                                  Li_ProcessDivision={''}
                                  Li_Option={''}
                                  Li_Child={true}
                                  onFinishScreen={() => {
                                    this.closeModal();
                                  }}
                                />,
                              },
                            });
                          }}
                        >予約変更</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Space>
                      <Form.Item name={['infoPage', 'visit_course']} style={{ opacity: Expression_13 ? 1 : 0 }}>
                        <Input readOnly bordered={false} style={{ width: '50px', paddingLeft: '12px' }} />
                      </Form.Item>
                      <Form.Item name={['infoPage', 'contract_short_name']} style={{ opacity: Expression_13 ? 1 : 0 }}>
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Space>
                  </Row>
                  <Form.Item name={['infoPage', 'remarks']} style={{ opacity: Expression_13 ? 1 : 0 }}>
                    <Input readOnly bordered={false} />
                  </Form.Item>
                </Card>
              </Col>
            </Row>

            <Card className='mt-3'>
              <Row>
                <Col span={12}>
                  <Col>
                    <Form.Item name="TransmissionState">
                      <Radio.Group onChange={(e) => this.handleChange(e.target.value, 'TransmissionState')}>
                        <Radio value={''}>全て</Radio>
                        <Radio value={'0'}>未送</Radio>
                        <Radio value={'1'}>送信</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name="OrderSpecies">
                      <Radio.Group onChange={(e) => this.handleChange(e.target.value, 'OrderSpecies')}>
                        <Radio value={''}>全て</Radio>
                        <Radio value={'00'}>予約</Radio>
                        <Radio value={'60'}>検査</Radio>
                        <Radio value={'70'}>画像</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Col>
                <Col span={12}>
                  <Form.Item name='StsModify' style={{ float: "right" }} valuePropName='checked'>
                    <Checkbox onChange={(e) => {
                      this.setState({
                        initParams: {
                          ...this.state.initParams,
                          StsModify: e.target.checked ? 1 : 0
                        },
                      });
                      if (this.state.initParams.Li_ReserveNum) this.setState({ isChange: e.target.checked })
                    }}>修正</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Row className='mt-3' gutter={14}>
              <Col span={16}>
                <Card>
                  <Table
                    size='small'
                    bordered
                    dataSource={this.state.dataSource}
                    loading={this.state.isLoading}
                    pagination={{
                      ...this.state.pagination,
                      hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
                    }}
                    rowKey={(record) => record.id}
                    onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
                  >
                    <Table.Column title="済" dataIndex="Submit" align='center'
                      render={(text, record) => {
                        let index = this.findIndexByID(this.state.dataSource, record.id);
                        return (
                          <Checkbox disabled={!this.state.initParams.StsModify} checked={record.Submit}
                            onChange={(e) => this.handleChangeInput(record, e.target.checked ? 1 : 0, 'Submit')}
                          />
                        )
                      }}
                    />
                    <Table.Column title="検査日" dataIndex="DateDisplay" />
                    <Table.Column title="検査時間" dataIndex="TimeDisplay" />
                    <Table.Column title="種別" dataIndex="TypeDisplay" />
                    <Table.Column title="方法" dataIndex="ProcessSegmentDisplay"
                      render={(text, record) => {
                        let color = () => { };
                        switch (text) {
                          case '追加': color = Color(211); break;
                          case '修正': color = Color(208); break;
                          case '削除': color = Color(209); break;
                          case '中止': color = Color(209); break;
                          default: color = Color(208); break;
                        }
                        return <p style={{ color: color.Foreground, margin: 0 }}>{text}</p>
                      }}
                    />
                    <Table.Column title="項目" dataIndex="InspectName" />
                    <Table.Column title="ｴﾗｰ" dataIndex="Expression_27"
                      render={(text, record) => (
                        <p onDoubleClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 600,
                              component: (
                                <WS2739001_ErrorConfirmSub
                                  Li_TransmissionState={this.state.initParams.TransmissionState}
                                  Li_ProcessDivision={record.processing_division}
                                  Li_Type={''}
                                  Li_Identify={''}
                                  onFinishScreen={(output) => {
                                    this.closeModal()
                                  }}
                                />
                              ),
                            },
                          });
                        }}>{text}</p>
                      )}
                    />
                    <Table.Column title="エラー内容" dataIndex="error_text" />
                    <Table.Column align='center' width={70}
                      title={() => (
                        <Button size='small' type='primary'
                          disabled={!this.state.initParams.Li_ReserveNum}
                          style={{ display: !this.state.initParams.StsModify ? 'none' : '' }}
                          icon={<PlusOutlined />}
                          onClick={() => {
                            let TypeDisplayTemp = '';
                            switch (this.state.initParams.OrderSpecies) {
                              case '00': TypeDisplayTemp = '予約'; break;
                              case '60': TypeDisplayTemp = '検査'; break;
                              case '70': TypeDisplayTemp = '画像'; break;
                              default: TypeDisplayTemp = ''; break;
                            }
                            let arrTemp = [...this.state.dataSource];
                            arrTemp.unshift({
                              id: Math.round(Math.random() * 1000),
                              DateDisplay: this.state.infoPage.visit_date_on,
                              TypeDisplay: TypeDisplayTemp,
                              OrderStartDate: moment(this.state.infoPage.visit_date_on),
                              ProcessSegmentDisplay: '追加',
                              processing_division: '1',
                              isNew: true,
                            });
                            this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
                            this.setState({ dataSource: arrTemp });
                          }}
                        />
                      )}
                      render={(text, record, index) => (
                        <>
                          <Button
                            size='small'
                            style={{ border: 'none', display: !this.state.initParams.StsModify ? 'none' : '' }}
                            icon={<SaveOutlined style={{ color: 'green' }} />}
                            onClick={() => this.createOrUpdateData(rowSelect)}
                          />
                          <Button
                            size='small'
                            style={{ border: 'none', display: !this.state.initParams.StsModify ? 'none' : '' }}
                            danger icon={<DeleteOutlined />}
                            onClick={() => {
                              Modal.confirm({
                                content: '消去してもよろしいですか？',
                                okText: 'は　い',
                                cancelText: 'いいえ',
                                onOk: () => this.deleteData(record, index)
                              })
                            }}
                          />
                        </>
                      )}
                    />
                  </Table>
                </Card>
              </Col>
              <Col span={8}
                onDoubleClick={() => {
                  if (this.state.initParams.Li_ReserveNum)
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: '30%',
                        component: (
                          <WS2738001_LaboratoryInspectConfirmSub
                            Li_ReserveNum={rowSelect?.reservation_number_medical_exam}
                            Li_TransmissionState={rowSelect?.transmission_state}
                            Li_ProcessDivision={rowSelect?.processing_division}
                            Li_Type={rowSelect?.kind}
                            Li_Identify={rowSelect?.identification}
                            onFinishScreen={(output) => {
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    });
                }}
              >
                <Card>
                  <Form.Item label="検査日時" {...grid}>
                    <Space>
                      <Form.Item>
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM/DD' onChange={(date) => this.handleChangeInput(rowSelect, date, 'OrderStartDate')}
                          value={rowSelect.OrderStartDate}
                        />
                      </Form.Item>
                      <Form.Item>
                        <TimePicker format='HH:mm:ss' onChange={(date) => this.handleChangeInput(rowSelect, date, 'order_start_time_at')}
                          value={rowSelect.order_start_time_at}
                        />
                      </Form.Item>
                    </Space>
                  </Form.Item>

                  <Form.Item label="処理方法" {...grid}>
                    <Radio.Group disabled={!this.state.initParams.StsModify} value={rowSelect.processing_division}
                      onChange={(e) => this.handleChangeInput(rowSelect, e.target.value, 'processing_division')}
                    >
                      <Radio value="1">追加</Radio>
                      <Radio value="3">削除</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="ｵｰﾀﾞｰ番号" {...grid}>
                    <Space>
                      <Form.Item>
                        <InputNumber readOnly={!this.state.initParams.StsModify}
                          value={rowSelect.order_number}
                          maxLength={13} min={1} style={{ width: '200px' }}
                          onChange={(value) => this.handleChangeInput(rowSelect, value, 'order_number')}
                        />
                      </Form.Item>
                      <Form.Item>
                        <InputNumber readOnly={!this.state.initParams.StsModify} maxLength={3} min={1}
                          value={rowSelect.order_subnumber}
                          onChange={(value) => this.handleChangeInput(rowSelect, value, 'order_subnumber')}
                        />
                      </Form.Item>
                    </Space>
                  </Form.Item>

                  <Form.Item label="予約番号" {...grid}>
                    <InputNumber readOnly={!this.state.initParams.StsModify} maxLength={13} min={1} style={{ width: '200px' }}
                      value={rowSelect.reservation_number}
                      onChange={(value) => this.handleChangeInput(rowSelect, value, 'reservation_number')}
                    />
                  </Form.Item>

                  <Form.Item label="予約項目" {...grid}>
                    <Space>
                      <Form.Item>
                        <Input readOnly={!this.state.initParams.StsModify} maxLength={2}
                          value={rowSelect.reservations_department}
                          onChange={(e) => this.handleChangeInput(rowSelect, e.target.value, 'reservations_department')}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Input readOnly={!this.state.initParams.StsModify} maxLength={5}
                          value={rowSelect.reservations_item_code}
                          onChange={(e) => this.handleChangeInput(rowSelect, e.target.value, 'reservations_item_code')}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Input bordered={false} value={rowSelect.name} readOnly />
                      </Form.Item>
                    </Space>
                  </Form.Item>

                  <Form.Item label="画像項目" {...grid}>
                    <Space>
                      <Form.Item>
                        <Input readOnly={!this.state.initParams.StsModify} maxLength={6}
                          value={rowSelect.image_item_code}
                          onChange={(e) => this.handleChangeInput(rowSelect, e.target.value, 'image_item_code')}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Input bordered={false} value={rowSelect.exam_name} readOnly />
                      </Form.Item>
                    </Space>
                  </Form.Item>

                  <Form.Item label="コメント" {...grid}>
                    <Input readOnly={!this.state.initParams.StsModify} maxLength={60}
                      value={rowSelect.reservations_comment}
                      onChange={(e) => this.handleChangeInput(rowSelect, e.target.value, 'reservations_comment')}
                    />
                  </Form.Item>
                </Card>

              </Col>
            </Row>
            <Card className='mt-3'>
              <Form.Item style={{ float: "right" }}>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: <WS2751001_MiraisInspectMaintain
                            onFinishScreen={(data) => {
                              this.closeModal()
                            }}
                          />,
                        },
                      });
                    }}
                  >保守</Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: <WS2749001_CheckAvailability
                            onFinishScreen={(data) => {
                              this.closeModal()
                            }}
                          />,
                        },
                      });
                    }}
                  >空き状況</Button>
                  <Button type="primary" onClick={this.ExtractBtn} disabled={!this.state.initParams.Li_ReserveNum}>抽出</Button>
                  <Button
                    disabled={!this.state.initParams.Li_ReserveNum}
                    type="primary"
                    onClick={() => {
                      if (this.state.StsConfirmScreen && this.state.initParams.Li_ReserveNum > 0) {
                        submitBtnBeforeMiraisSingleTransmissionAction({ Li_ReserveNum: this.state.initParams.Li_ReserveNum })
                          .then(res => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 1500,
                                component: <WS2745009_ConfirmScreen
                                  Li_ExamDateF={''}
                                  Li_ExamDateT={''}
                                  Li_ReserveNum={this.state.initParams.Li_ReserveNum}
                                  Li_StsConfirm={this.state.StsConfirmScreen}
                                  Lo_StsRun={false}
                                  onFinishScreen={({ Lo_StsConfirm }) => {
                                    if (Lo_StsConfirm) this.SubmitBtn();
                                    this.closeModal()
                                  }}
                                />,
                              },
                            });
                          })
                      } else {
                        submitBtnBeforeMiraisSingleTransmissionAction({ Li_ReserveNum: this.state.initParams.Li_ReserveNum })
                          .then(res => this.SubmitBtn())
                      }
                    }}
                  >送信</Button>
                  <Checkbox
                    onChange={(e) => this.setState({
                      StsConfirmScreen: e.target.checked,
                      title: e.target.checked ? '[確認画面]' : ''
                    })}
                  >Ctrl D</Checkbox>
                </Space>
              </Form.Item>
            </Card>
          </Form>
        </Card>

        <ModalDraggable
          className={this.state.childModal.className}
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2737001_MiraisSingleTransmission);
