import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Row, Col, Space, Spin, InputNumber, message } from "antd";
import { MoreOutlined } from '@ant-design/icons';
import { ReturnIcon } from "components/Commons/ReturnIcon";
import GetImage from "constants/Images";
import Color from "constants/Color";
import ModalDraggable from "components/Commons/ModalDraggable";
import WS2584019_PersonalInfoInquirySub from 'pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx';
import WS0339001_InsurerInfoMaintain from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0339001_InsurerInfoMaintain.jsx';
import WS2586020_ConsultHistorySub from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2586020_ConsultHistorySub.jsx';
import WS0605127_ContractLineItemDisplay from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay.jsx';
import WS2593056_BillingInquirySub from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS2593056_BillingInquirySub.jsx';
import WS0612001_PersonalActionItemTreeDisplay from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS0612001_PersonalActionItemTreeDisplay.jsx';
import WS2537001_PersonalReserveProcess from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess.jsx';
import WS2587021_InspectChangeQuerySub from 'pages/UK_CounterBusiness/V5UK0001000_Counter/WS2587021_InspectChangeQuerySub.jsx';
import WS0392004_VisitsSupplement from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0392004_VisitsSupplement.jsx';
import { getInfoDataConsultInquirySubAction, VisitsInspectConsultInquirySubAction } from "redux/InputBusiness/ProgressSetting/ConsultInquirySub.actions";
import moment from "moment";
import WS2585001_OfficeInfoInquirySub from "pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub";

const styleDivGender = {
  border: '1px solid blue',
  color: 'blue',
  textAlign: 'center',
  padding: '1px 7px',
  float: 'right'
}

const styleDivResult = {
  border: '1px solid rgba(0, 0, 0, 0.06)',
  textAlign: 'center',
  height: '30px',
  padding: '0.3em'
}

const styleDivTitle = {
  background: '#1C66B9',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  textAlign: 'center',
  height: '30px',
  padding: '0.3em',
  color: '#FFFFFF'
};
class WS2583001_ConsultInquirySub extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '受診照会SUB';

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
      isLoadPage: true,
      infoPage: {},
      importance: 0,
    };
  }

  componentDidMount = () => {
    this.loadData(this.props.Li_ReserveNum);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.loadData(this.props.Li_ReserveNum);
    }
  }

  loadData = (params) => {
    this.setState({ isLoadPage: true });
    getInfoDataConsultInquirySubAction({ W1_reserve_num: params })
      .then(res => {
        if (res) {
          let data = {
            ...res.data,
            DateBirth: moment(res.data.DateBirth).format('NNy/MM/DD'),
            Expression_28: moment(res.data.Expression_28).format('YYYY/MM/DD'),
            period_time: moment(res.data.period_time, "hh:mm:ss").format('hh:mm')
          };
          this.setState({ infoPage: data, importance: data.Expression_53 ? data.Expression_53 : 0 });
          this.formRef?.current?.setFieldsValue(data);
        }
      })
      .catch()
      .finally(() => this.setState({ isLoadPage: false }))
  }

  renderInspectNumber = (obj, start, end) => {
    let inspects = [];
    for (let i = start; i < end; i++) {
      if (i < 10) {
        inspects.push({
          Inspect: obj[`Inspect0${i}`] ? obj[`Inspect0${i}`] : null,
          color: obj[`Expression_${i + 29}`] ? obj[`Expression_${i + 29}`] : 210
        });
      } else {
        inspects.push({
          Inspect: obj[`Inspect${i}`] ? obj[`Inspect${i}`] : null,
          color: obj[`Expression_${i + 29}`] ? obj[`Expression_${i + 29}`] : 210
        });
      }
    }
    return (
      <Row>
        <Col span={1}></Col>
        {inspects.map((item, index) => (
          <Col span={2} style={{ padding: 0 }} key={index}>
            <div style={{
              textAlign: 'center',
              background: Color(item.color).Background,
              color: item.color === 156 ? '#FFFFFF' : '#ABADB3',
              border: '1px solid #ABADB3',
              height: '30px'
            }}
            >
              {item.Inspect}
            </div>
          </Col>
        ))}
      </Row>
    )
  };

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: ''
      },
    });
  }

  renderDivCacl = (title, price) => (
    <Col span={3}>
      <div style={styleDivTitle}>{title}</div>
      <div style={styleDivResult}>
        {price === 0 ? null : price?.toLocaleString()}
      </div>
    </Col>
  )

  VisitsInspect = () => {
    VisitsInspectConsultInquirySubAction({Li_ReserveNum: this.props.Li_ReserveNum})
      .then(res => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 600,
            component:
              <WS0612001_PersonalActionItemTreeDisplay
                Lio_Expansion={true}
                onFinishScreen={() => {
                  this.closeModal()
                }}
              />
            ,
          },
        });
      })
      .catch(err => message.error( err?.response?.data?.message || "エラーが発生しました"))
  }

  render() {
    return (
      <div className="consult-inquiry-sub">
        <Card title="受診照会SUB">
          <Form ref={this.formRef} >
            <Spin spinning={this.state.isLoadPage}>
              <Row gutter={24}>
                <Col span={10} style={{ borderRight: '1px solid #9A9A9A' }}>
                  <>
                    <Row gutter={10}>
                      <Col span={14}>
                        <Form.Item name="personal_number_id" label='個　人'>
                          <InputNumber bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item>
                          <Button
                            type={this.state.importance === 0 ? 'default' : 'text'}
                            size='small'
                            icon={ReturnIcon(this.state.importance)}
                            disabled={!(this.state.infoPage.personal_number_id !== '')}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 1200,
                                  component:
                                    <Card title={'個人情報照会SUB'}>
                                      < WS2584019_PersonalInfoInquirySub
                                        Li_PersonalNum={this.state.infoPage.personal_number_id}
                                        onFinishScreen={() => {
                                          this.setState({
                                            childModal: {
                                              ...this.state.childModal,
                                              visible: false,
                                            },
                                          });
                                        }}
                                      />
                                    </Card>
                                  ,
                                },
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={10}>
                      <Col span={14}>
                        <Form.Item name="KanaName" label='　　　'>
                          <Input bordered={false} readOnly />
                        </Form.Item>
                        <Form.Item name="KanjiName" label='　　　'>
                          <Input bordered={false} readOnly />
                        </Form.Item>
                        <Form.Item label='　　　'>
                          <Row gutter={10}>
                            <Col span={10}>
                              <Form.Item name="DateBirth">
                                <Input bordered={false} readOnly />
                              </Form.Item>
                            </Col>
                            <Col span={14}>
                              <Form.Item name="Expression_27">
                                <Input bordered={false} readOnly />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form.Item>
                      </Col>
                      <Col span={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                          src={this.state.infoPage?.Expression_22 === '性別-女性.png' ? GetImage('woman') : GetImage('man')}
                          alt='gender'
                          width={'40%'}
                        />
                      </Col>
                    </Row>
                  </>
                  <hr style={{ margin: '15px 0' }}></hr>
                  <>
                    <Row gutter={10}>
                      <Col span={14}>
                        <Form.Item name="office_code" label='事業所'>
                          <InputNumber bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item>
                          <Button size='small'
                            icon={<MoreOutlined />}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '70%',
                                  component:
                                    <WS2585001_OfficeInfoInquirySub
                                      Li_OfficeCode={this.state.infoPage.office_code}
                                      Li_BranchCode={this.state.infoPage.branch_store_code}
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
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="office_kanji_name" label='　　　'>
                      <Input bordered={false} readOnly />
                    </Form.Item>

                    <Row gutter={10}>
                      <Col span={14}>
                        <Form.Item name="insurer_number" label='保険者'>
                          <InputNumber bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item>
                          <Button size='small'
                            disabled={!this.state.infoPage.insurer_number > 0}
                            icon={<MoreOutlined />}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '80%',
                                  component:
                                    <WS0339001_InsurerInfoMaintain
                                      Li_InsurerCode={this.state.infoPage.insurer_number}
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
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="insurer_kanji_name" label='　　　'>
                      <Input bordered={false} readOnly />
                    </Form.Item>
                    <Form.Item name="InsuranceCardSymbolNum" label='保険証'>
                      <Input bordered={false} readOnly />
                    </Form.Item>
                    <Form.Item name="name" label='続　柄'>
                      <Input bordered={false} readOnly />
                    </Form.Item>
                  </>
                </Col>

                <Col span={14}>
                  <Form.Item label='受診日'>
                    <Row gutter={10}>
                      <Col span={10}>
                        <Form.Item name="Expression_28">
                          <Input bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item name="receipt_number" label='受付番号'>
                          <Input bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item >
                          <div style={{
                            ...styleDivGender,
                            border: `1px solid ${Color(this.state.infoPage?.Expression_25)?.Foreground}`,
                            color: Color(this.state.infoPage?.Expression_25)?.Foreground,
                          }}
                          >
                            {this.state.infoPage?.Expression_23}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label='時間帯'>
                    <Row gutter={10}>
                      <Col span={10}>
                        <Form.Item name="period_time">
                          <Input bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={14}>
                        <Form.Item name="next_division" label='Ｎ次区分'>
                          <Input bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label='施　設'>
                    <Row gutter={10}>
                      <Col span={10}>
                        <Form.Item name="facility_name">
                          <Input bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={14}>
                        <Form.Item name="short_name">
                          <Input bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label='コース'>
                    <Row gutter={10}>
                      <Col span={6}>
                        <Form.Item name="visit_course">
                          <Input bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Form.Item >
                          <Button size='small'
                            icon={<MoreOutlined />}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: '80%',
                                  component:
                                    <WS0605127_ContractLineItemDisplay
                                      Li_ContractType={this.state.infoPage.contract_type}
                                      Li_ContractOrgCode={this.state.infoPage.contract_organization_code}
                                      Li_ContractStartDate={this.state.infoPage.contract_start_date_on}
                                      Li_ContractNum={this.state.infoPage.contract_number}
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
                          />
                        </Form.Item>
                      </Col>
                      <Col span={16}>
                        <Form.Item name="contract_short_name" >
                          <Input bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item label='備　考'>
                    <Row gutter={10}>
                      <Col span={6}></Col>
                      <Col span={2}>
                        <Form.Item>
                          <Button size='small'
                            icon={<MoreOutlined />}
                            onClick={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 800,
                                  component:
                                    <WS0392004_VisitsSupplement
                                      Li_CourseLevel={this.state.infoPage.course_level}
                                      Li_ReserveNum={this.state.infoPage.Li_ReserveNum}
                                      Li_RealTmp={''}
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
                          />
                        </Form.Item>
                      </Col>
                      <Col span={16}>
                        <Form.Item name="remarks">
                          <Input bordered={false} readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>

                  {this.renderInspectNumber(this.state.infoPage, 1, 11)}
                  {this.renderInspectNumber(this.state.infoPage, 11, 21)}

                  <Row className='mt-3'>
                    {this.renderDivCacl('保険者', this.state.infoPage?.insurer_total_price)}
                    {this.renderDivCacl('事業所', this.state.infoPage?.office_total_price)}
                    {this.renderDivCacl('他団体', this.state.infoPage?.organization_total_price)}
                    {this.renderDivCacl('個人１', this.state.infoPage?.personal_1_total_price)}
                    {this.renderDivCacl('個人２', this.state.infoPage?.personal_2_total_price)}
                    {this.renderDivCacl('個人３', this.state.infoPage?.personal_3_total_price)}
                    {this.renderDivCacl('合計', this.state.infoPage?.Expression_56)}
                  </Row>

                  <div className='mt-3'>
                    <Space style={{ float: 'right' }}>
                      <Button type="primary"
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: 800,
                              component:
                                <WS2593056_BillingInquirySub
                                  Li_ReserveNum={this.state.infoPage.Li_ReserveNum}
                                  onFinishScreen={(outputdata) => {
                                    this.closeModal();
                                  }}
                                />
                              ,
                            },
                          });
                        }}
                      >請求照会</Button>
                      <Button type="primary" onClick={this.VisitsInspect}>検査照会</Button>
                      <Button type="primary"
                        onClick={() => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: true,
                              width: '70%',
                              className: 'custom-button-close',
                              component:
                                <WS2537001_PersonalReserveProcess
                                  Li_CourseLevel={this.state.infoPage.course_level}
                                  Li_ReserveNum={this.state.infoPage.Li_ReserveNum}
                                  Li_PersonalNum={this.state.infoPage.personal_number_id}
                                  Li_Date={''}
                                  Li_Getctxname={''}
                                  Li_ProcessDivision={''}
                                  Li_Option={''}
                                  Li_Child={true}
                                  onFinishScreen={() => {
                                    this.closeModal();
                                  }}
                                />
                              ,
                            },
                          });
                        }}>受診変更</Button>
                    </Space>
                  </div>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <hr style={{ margin: '15px 0' }}></hr>
                  <WS2586020_ConsultHistorySub Li_PersonalNum={this.state.infoPage.personal_number_id} />
                </Col>

                <Col span={12}>
                  <hr style={{ margin: '15px 0' }}></hr>
                  <WS2587021_InspectChangeQuerySub
                    Random={Math.random()}
                    Li_ReserveNum={this.state.infoPage.Li_ReserveNum}
                    Li_DataClassify={''}
                    Li_Course={this.state.infoPage.visit_course}
                    Li_ContractStartDate={this.state.infoPage.contract_start_date_on}
                  />
                </Col>
              </Row>
            </Spin>
          </Form>
        </Card>
         <ModalDraggable
          className={this.state.childModal.className}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2583001_ConsultInquirySub);
