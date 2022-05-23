import React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Row, Col, Modal, message, Spin } from "antd";
import { ArrowDownOutlined, CloseCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import WS0248001_PersonalInfoSearchQuery from "../V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import { getScreenDataAction, changePersonalNumberAction, buttonF12Action } from "redux/basicInfo/PersonalNumberIntegration/PersonalNumberIntegration.actions";
// import WS0583001_ConsultHistory from 'pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS0583001_ConsultHistory.jsx';
import moment from "moment-timezone";
import WS0264001_VisitHistoricalQuery from "../V4MS0003300_PersonalNumberMigration/WS0264001_VisitHistoricalQuery";
import { ModalInfo } from "components/Commons/ModalConfirm";

class WS0402001_PersonalNumberIntegration extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '個人番号統合';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoading: false,
      PersonalNumF: {
        kana_name: null,
        kanji_name: null,
        birthday_on: null,
        sex: null,
      },
      PersonalNumT: {
        kana_name: null,
        kanji_name: null,
        birthday_on: null,
        sex: null,
      },
      Expression_12: false,
      Expression_13: false,
    };
    this.searchPersonalNumberID = debounce(this.searchPersonalNumberID, 700);
  }

  searchPersonalNumberID = (id, PersonalNum) => {
    if (id && id !== '') {
      this.setState({ isLoading: true });
      changePersonalNumberAction({ PersonalNumber: id })
        .then(res => {
          if (res) {
            if (PersonalNum === 'PersonalNumF') {
              this.setState({ Expression_12: res.data.Expression_12 })
            } else {
              this.setState({ Expression_13: res.data.Expression_12 })
            }
            const params = {
              PersonalNumF: this.formRef?.current?.getFieldValue('PersonalNumF'),
              PersonalNumT: this.formRef?.current?.getFieldValue('PersonalNumT'),
            }
            switch (PersonalNum) {
              case 'PersonalNumF':
                this.setState({ PersonalNumF: {} });
                getScreenDataAction(params)
                  .then(res => {
                    let data = res.data
                    if (data && (data.FR || data.FO || data.FP || data.Expression_7)) {
                      let year = moment(data.FR?.slice(0, 4)).format('NNNNy');
                      let birthday_on = data.FR?.slice(4);
                      this.setState({
                        PersonalNumF: {
                          kana_name: data.FO,
                          kanji_name: data.FP,
                          birthday_on: year + birthday_on,
                          sex: data.Expression_7,
                        },
                      })
                    }
                  })
                  .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
                break;
              case 'PersonalNumT':
                if (this.formRef?.current?.getFieldValue('PersonalNumF')) {
                  getScreenDataAction(params)
                    .then(res => {
                      let data = res.data
                      if (data && (data.GC || data.FZ || data.GA || data.Expression_9)) {
                        let year = moment(data.GC?.slice(0, 4)).format('NNNNy');
                        let birthday_on = data.GC?.slice(4);
                        this.setState({
                          PersonalNumT: {
                            kana_name: data.FZ,
                            kanji_name: data.GA,
                            birthday_on: year + birthday_on,
                            sex: data.Expression_9,
                          },
                        })
                      }
                    })
                    .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
                } else {
                  this.ModalError()
                }
                break;
              default: message.error('エラー');
                break;
            }
          }
        })
        .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
        .finally(() => this.setState({ isLoading: false }))
    } else {
      this.setState({
        [PersonalNum]: {
          kana_name: null,
          kanji_name: null,
          birthday_on: null,
          sex: null,
        },
      })
    }
  }

  ModalError = () => (
    Modal.error({
      content: '個人番号が無効です',
      icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />,
      onOk: () => {
        this.formRef.current.setFieldsValue({PersonalNumT: ''})
      }
    })
  )

  onFinish = (values) => {
    if (values.PersonalNumF && values.PersonalNumT && (values.PersonalNumF !== values.PersonalNumT)) {
      Modal.confirm({
        content: '個人番号の統合処理を実行しますか？',
        onOk: () => {
          this.setState({ isLoading: true })
          buttonF12Action(values)
            .then(res => {
              // this.searchPersonalNumberID(this.formRef?.current?.getFieldValue('PersonalNumF'), 'PersonalNumF');
              this.searchPersonalNumberID(this.formRef?.current?.getFieldValue('PersonalNumT'), 'PersonalNumT');
              ModalInfo('統合処理しました。');
            })
            .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
            .finally(() => this.setState({ isLoading: false }))
        },
        icon: <QuestionCircleOutlined style={{ color: '#006CC8' }} />,
        okText: 'は　い',
        cancelText: 'いいえ',
      })
    } else if (!values.PersonalNumF || (values.PersonalNumF === values.PersonalNumT)) {
      this.ModalError()
    }
  }

  render() {
    const { PersonalNumF, PersonalNumT } = this.state;
    return (
      <div className="personal-number-integration" style={{ width: "500px" }}>
        <Card title="個人番号統合" >
          <Form ref={this.formRef} onFinish={this.onFinish} autoComplete='off'>
            <Spin spinning={this.state.isLoading}>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name="PersonalNumF">
                    <Input.Search
                      onChange={(e) => {
                        this.setState({ Expression_12: false })
                        this.searchPersonalNumberID(e.target.value, 'PersonalNumF')
                      }}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1500,
                            component: (<WS0248001_PersonalInfoSearchQuery
                              onFinishScreen={({ Lo_PersonalNumId }) => {
                                this.formRef.current.setFieldsValue({
                                  PersonalNumF: Lo_PersonalNumId
                                });
                                this.searchPersonalNumberID(Lo_PersonalNumId, 'PersonalNumF');
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                });
                              }}
                            />),
                          },
                        })
                      }} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item >
                    <p style={{ margin: 0 }}>{PersonalNumF.kana_name}</p>
                    <p style={{ margin: 0 }}>{PersonalNumF.kanji_name}</p>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Button
                    type="primary"
                    disabled={!this.state.Expression_12}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '70%',
                          component: (<WS0264001_VisitHistoricalQuery
                            Li_PersonalNum={this.formRef.current?.getFieldValue('PersonalNumF')}
                            onFinishScreen={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />),
                        },
                      })
                    }}
                  >受診履歴</Button>
                </Col>
                <Col span={16}>
                  <span >{PersonalNumF.birthday_on}</span>
                  <span style={{
                    float: 'right', padding: '4px 8px', color: 'white',
                    display: PersonalNumF.sex === '' || PersonalNumF.sex === null || PersonalNumF.sex === undefined ? 'none' : '',
                    backgroundColor: PersonalNumF.sex === '男性' ? "#0000FF" : "#FF0000"
                  }}
                  >
                    {PersonalNumF.sex}
                  </span>
                </Col>
              </Row>

              <Form.Item style={{ textAlign: 'center' }} className='mt-3 mb-3'>
                <span style={{ backgroundColor: "#408080", padding: '0 3px', fontSize: "30px", color: "#FFFFFF", }}>
                  <ArrowDownOutlined />
                </span>
              </Form.Item>

              {/* PersonalNumT */}
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name="PersonalNumT">
                    <Input.Search onChange={(e) => {
                      this.setState({ Expression_13: false })
                      this.searchPersonalNumberID(e.target.value, 'PersonalNumT')
                    }}
                      onSearch={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 1500,
                            component: (<WS0248001_PersonalInfoSearchQuery
                              onFinishScreen={({ Lo_PersonalNumId }) => {
                                this.formRef.current.setFieldsValue({
                                  PersonalNumT: Lo_PersonalNumId
                                });
                                this.searchPersonalNumberID(Lo_PersonalNumId, 'PersonalNumT')
                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  }
                                });
                              }}
                            />),
                          },
                        })
                      }} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item >
                    <p style={{ margin: 0 }}>{PersonalNumT.kana_name}</p>
                    <p style={{ margin: 0 }}>{PersonalNumT.kanji_name}</p>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} className='mb-3'>
                <Col span={8}>
                  <Button
                    type="primary"
                    disabled={!this.state.Expression_13}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '70%',
                          component: (<WS0264001_VisitHistoricalQuery
                            Li_PersonalNum={this.formRef.current?.getFieldValue('PersonalNumT')}
                            onFinishScreen={(data) => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />),
                        },
                      })
                    }}>
                    受診履歴
                  </Button>
                </Col>
                <Col span={16}>
                  <span >{PersonalNumT.birthday_on}</span>
                  <span style={{
                    float: 'right', padding: '4px 8px', color: 'white',
                    display: PersonalNumT.sex === '' || PersonalNumT.sex === null || PersonalNumT.sex === undefined ? 'none' : '',
                    backgroundColor: PersonalNumT.sex === '男性' ? "#0000FF" : "#FF0000"
                  }}
                  >
                    {PersonalNumT.sex}
                  </span>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Button type="primary" style={{ float: "right" }} className='mt-3' htmlType="submit" >
                    統合処理
                  </Button>
                </Col>
              </Row>
            </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0402001_PersonalNumberIntegration);
