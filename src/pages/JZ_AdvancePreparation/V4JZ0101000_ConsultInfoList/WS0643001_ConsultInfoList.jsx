import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Row, Col, Modal, DatePicker, Space, message, Spin, InputNumber } from "antd";

import WS2788013_TargetSelectSub from 'pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS2788013_TargetSelectSub.jsx';
import WS0435012_PreviewConfirm from 'pages/JZ_AdvancePreparation/V4JZ0101000_ConsultInfoList/WS0435012_PreviewConfirm.jsx';
import WS0247001_OfficeInfoRetrievalQuery from 'pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import ModalDraggable from "components/Commons/ModalDraggable";
import { SearchOutlined } from '@ant-design/icons';
import ConsultInfoListAction from "redux/AdvancePreparation/ConsultInfoList/ConsultInfoList.action";
import moment from "moment";
import Color from "constants/Color";

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class WS0643001_ConsultInfoList extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '受診情報一覧表';

    this.state = {
      checkRadio: "1",
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      FacilitiesNums: [],
      isLoadingTable: false,
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],

      OfficeFState: '',

      message: '',
      isSearch: false,
      random: null
    };
  }

  componentDidMount() {
    this.getDataScreen();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataScreen();
    }
  }

  getDataScreen() {
    ConsultInfoListAction.getScreenData()
      .then((res) => {
        this.setState({
          FacilitiesNums: res ? res : []
        })

        this.formRef.current?.setFieldsValue({
          FacilitiesNum: res ? res[0].LinkedField : ''
        })
      })
  }

  getDataBySearch() {
    this.setState({ isLoadingTable: true });

    let params = {
      ...this.formRef.current?.getFieldValue(),
      DateFChar: this.formRef.current?.getFieldValue('DateFChar')?.format('YYYY/MM/DD'),
      DateTChar: this.formRef.current?.getFieldValue('DateTChar')?.format('YYYY/MM/DD'),
    }

    ConsultInfoListAction.getDataBySearch(params)
      .then(async (res) => {
        await this.setState({
          message: res.data.message,
          isLoadingTable: false,
          isSearch: true,
          random: Math.random()
        })
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  onFinish(values) { }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  checkDateStart() {
    let dateStart = this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : null
    let dateEnd = this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : null
    if ((dateEnd && (dateStart > dateEnd)) || (dateEnd && !dateStart)) {
      this.formRef.current?.setFieldsValue({
        DateFChar: this.formRef.current?.getFieldValue('DateTChar')
      })
    }
  }

  checkDateEnd() {
    let dateStart = this.formRef.current?.getFieldValue('DateFChar') ? this.formRef.current?.getFieldValue('DateFChar').format('YYYY/MM/DD') : null
    let dateEnd = this.formRef.current?.getFieldValue('DateTChar') ? this.formRef.current?.getFieldValue('DateTChar').format('YYYY/MM/DD') : null
    if ((!dateEnd && dateStart) || (dateStart && (dateStart > dateEnd))) {
      this.formRef.current?.setFieldsValue({
        DateTChar: this.formRef.current?.getFieldValue('DateFChar')
      })
    }

    if ((!dateStart && dateEnd)) {
      this.formRef.current?.setFieldsValue({
        DateFChar: this.formRef.current?.getFieldValue('DateTChar')
      })
    }
  }

  checkCourseCode() {
    let VisitsCourseF = this.formRef.current?.getFieldValue('VisitsCourseF')
    let VisitsCourseT = this.formRef.current?.getFieldValue('VisitsCourseT')
    if (!VisitsCourseT || VisitsCourseF > VisitsCourseT) {
      this.formRef.current?.setFieldsValue({
        VisitsCourseT: VisitsCourseF,
      })
    }
  }

  renderTargetSub() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      random: this.state.random
    }
    return (
      <WS2788013_TargetSelectSub
        isSearch={this.state.isSearch}
        message={this.state.message}
        params={params}
        PrintType={1}
      />
    )
  }

  EventF12(params) {
    ConsultInfoListAction.PrintF12(params)
      .then(async (res) => {
      })
      .catch((err) => {
        this.setState({ isLoadingTable: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  render() {
    return (
      <div className="consult-info-list">
        <Card title="受診情報一覧表" className="mb-3">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 300,
                    component: (
                      <WS0435012_PreviewConfirm
                        onFinishScreen={(output) => {
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                })
              }}
            >印刷</Button>
          </Space>
        </Card>

        <Card>
          <Form ref={this.formRef} onFinish={this.onFinish}
            initialValues={{
              OutputCondition: 1,
              _Ampm: '全て',
              SubjectClassify: 1,
              PrintType: 1,
              DateFChar: moment(new Date()),
              DateTChar: moment(new Date())
            }}>
            <Row gutter={24}>
              <Col style={{ border: '1px solid #f0f0f0', padding: 10, marginLeft: 10, width: 320 }} >
                <div >
                  <Form.Item name='OutputCondition' label="状態" {...grid}>
                    <Select >
                      <Select.Option value={1}>予約 </Select.Option>
                      <Select.Option value={2}>受付</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="日付" {...grid}>
                    <Space>
                      <Form.Item name="DateFChar" style={{ marginBottom: 0 }}>
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={false}
                          onBlur={() => { this.checkDateStart() }} />
                      </Form.Item>
                      <span> ~ </span>
                      <Form.Item name="DateTChar" style={{ marginBottom: 0 }}>
                        <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" allowClear={false}
                          onBlur={() => { this.checkDateEnd() }} />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  <Form.Item label="事業所" {...grid}>
                    <Space>
                      <Form.Item name="OfficeF" style={{ marginBottom: 0 }}>
                        <Input.Search style={{ textAlign: 'right' }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: '80%',
                                component: (
                                  <WS0247001_OfficeInfoRetrievalQuery
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        OfficeF: output.Lio_OfficeCode,
                                        BranchStoreCodeF: output.Lio_BranchStoreCode === 0 ? '' : output.Lio_BranchStoreCode
                                      })
                                      this.setState({ OfficeFState: output.Lio_OfficeCode })
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onChange={(e) => {
                            this.formRef.current?.setFieldsValue({
                              OfficeF: e.target.value,
                              BranchStoreCodeF: ''
                            })
                            this.setState({ OfficeFState: e.target.value })
                          }}
                        />
                      </Form.Item>
                      <Form.Item name="BranchStoreCodeF" style={{ marginBottom: 0 }}>
                        <InputNumber className='custom-input-number'
                          readOnly={!this.state.OfficeFState}
                          onBlur={(e) => {
                            if (this.formRef.current?.getFieldValue('BranchStoreCodeF') == 0) {
                              this.formRef.current?.setFieldsValue({
                                BranchStoreCodeF: ''
                              })
                            }
                          }}
                        />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  <Form.Item label="コース" {...grid}>
                    <Space>
                      <Form.Item name="VisitsCourseF" style={{ marginBottom: 0 }}>
                        <Input.Search
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 800,
                                component: (
                                  <WS0265001_BasicCourseInquiry
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        VisitsCourseF: output.Lo_CourseCode
                                      })
                                      this.checkCourseCode()
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onBlur={() => { this.checkCourseCode() }}
                        />
                      </Form.Item>
                      <span> ~ </span>
                      <Form.Item name="VisitsCourseT" style={{ marginBottom: 0 }}>
                        <Input.Search style={{ width: '85%' }}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 800,
                                component: (
                                  <WS0265001_BasicCourseInquiry
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        VisitsCourseT: output.Lo_CourseCode
                                      })
                                      this.checkCourseCode()
                                      this.closeModal()
                                    }}
                                  />
                                ),
                              },
                            })
                          }}
                          onBlur={() => { this.checkCourseCode() }}
                        />
                      </Form.Item>
                    </Space>
                  </Form.Item>

                  <Form.Item name="_Ampm" label="AMPM" {...grid}>
                    <Select  >
                      <Select.Option value="全て">全て</Select.Option>
                      <Select.Option value="ＡＭ">ＡＭ</Select.Option>
                      <Select.Option value="ＰＭ">ＰＭ</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="FacilitiesNum" label="施設" {...grid}>
                    <Select >
                      {this.state.FacilitiesNums?.map(value => (
                        <Select.Option key={"FacilitiesNum_" + Math.random()} value={parseInt(value.LinkedField)}>{value.DisplayField}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="SubjectClassify" label="対象者" {...grid}>
                    <Select >
                      <Select.Option value={1}>1:全員</Select.Option>
                      <Select.Option value={2}>2:追加/不要者</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="PrintType" label="種別" {...grid}>
                    <Select >
                      <Select.Option value={1}>1:明細なし</Select.Option>
                      <Select.Option value={2}>2:明細あり</Select.Option>
                    </Select>
                  </Form.Item>

                  <div style={{ textAlign: 'right', marginTop: 10 }}>
                    <Button
                      type='primary'
                      onClick={() => {
                        this.getDataBySearch()
                      }}
                    ><SearchOutlined />検　　索
                    </Button>
                  </div>
                </div>
                <hr style={{ margin: '15px 0' }} />
                <div>
                  <Button type="primary" style={{ float: 'right' }} onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 300,
                        component: (
                          <WS0435012_PreviewConfirm
                            onFinishScreen={(output) => {
                              let parram = {
                                OutputCondition: this.formRef.current?.getFieldValue('OutputCondition'),
                                PrintType: this.formRef.current?.getFieldValue('PrintType'),
                                SubjectClassify: this.formRef.current?.getFieldValue('SubjectClassify'),
                                facility_name: this.formRef.current?.getFieldValue('FacilitiesNum'),
                                PreviewMode: output.Lio_Preview,
                                Sys010Status: output.Lo_StsOutput,
                              }
                              this.EventF12(parram)
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                  }}>印刷</Button>
                </div>
              </Col>

              <Col style={{ width: 'calc(100% - 330px)' }}>
                <Spin spinning={this.state.isLoadingTable}>
                  {this.state.isLoadingTable ? this.renderTargetSub() : this.renderTargetSub()}
                </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0643001_ConsultInfoList);
