import React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { Card, Form, Input, Button, Row, Col, Space, Modal, message, InputNumber } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { getScreenDataAction, buttonF12Action } from "redux/basicInfo/PersonalNumberMigration/PersonalNumberMigration.actions";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS0248001_PersonalInfoSearchQuery from "../V4MS0003000_PersonalInfoMaintainDirectly/WS0248001_PersonalInfoSearchQuery";
import WS0343001_PersonalInfoMaintain from "../V4MS0003000_PersonalInfoMaintainDirectly/WS0343001_PersonalInfoMaintain";
import WS0264001_VisitHistoricalQuery from "./WS0264001_VisitHistoricalQuery";
import moment from "moment-timezone";

class WS0401001_PersonalNumberMigration extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '個人番号移行';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      PersonalNum: {
        kana_name: '',
        kanji_name: '',
        birthday_on: '',
        sex: '',
        hiden: true
      }
    };
  }

  searchPersonalNumberID = (id) => {
    this.setState({PersonalNum: {
      kana_name: '',
      kanji_name: '',
      birthday_on: '',
      sex: '',
      hiden: true
    }})
    debounce(() => {
      getScreenDataAction({ PersonalNumF: id }).then(res => {
        if (res) {
          let year = moment(res.birthday_on.slice(0, 4)).format('NNNNy');
          let birthday_on = res.birthday_on.slice(4);
          this.setState({
            PersonalNum: {
              kana_name: res.kana_name,
              kanji_name: res.kanji_name,
              birthday_on: year + birthday_on,
              sex: res.Expression_5,
              hiden: false
            }
          })
        }
      })
    }, 300)();
  }

  onFinish = (values) => {
    if (values.PersonalNumF && values.PersonalNumT && (values.PersonalNumF !== values.PersonalNumT)) {
      let content = `個人番号[${values.PersonalNumF}]を[${values.PersonalNumT}]へ変更しますか？`;
      Modal.confirm({
        content: content,
        onOk: async () => {
          buttonF12Action(values)
            .then(() => message.success('統合処理しました。'))
            .catch((error) => message.error(error.response.data.message || 'エラーが発生しました'))
        },
        okText: 'は　い',
        cancelText: 'いいえ',
      })
    } else if (!values.PersonalNumF) {
      Modal.error({
        content: '個人番号が無効です',
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      })
    } else if (!values.PersonalNumT) {
      Modal.error({
        content: '変更先の個人番号を設定してください',
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      })
    } else if (values.PersonalNumF === values.PersonalNumT) {
      Modal.error({
        content: '変更先の個人番号が存在します',
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      })
    }
  }

  render() {
    return (
      <div className="personal-number-migration" style={{ width: "700px" }}>
        <Card title="個人番号移行">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item name="PersonalNumF" label="個人番号">
                  <Input.Search min={0}
                    style={{textAlign: 'right'}}
                    onChange={(e) => this.searchPersonalNumberID(e.target.value)}
                    onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: (<WS0248001_PersonalInfoSearchQuery
                            onFinishScreen={({ Lo_PersonalNumId, recordData }) => {
                              this.formRef.current.setFieldsValue({
                                PersonalNumF: Lo_PersonalNumId
                              });
                              this.searchPersonalNumberID(Lo_PersonalNumId);
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
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="PersonalNumT" label="を">
                  <Input type='number' min={0} style={{ textAlign: 'right' }}
                    readOnly={!this.formRef?.current?.getFieldValue('PersonalNumF')}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item style={{ float: 'right' }}><span>に変更</span></Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <p style={{ margin: '0' }}>{this.state.PersonalNum.kana_name}</p>
                  <p style={{ margin: '0' }}>{this.state.PersonalNum.kanji_name}</p>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={10}>
                <Form.Item>
                  <span>{this.state.PersonalNum.birthday_on}</span>
                </Form.Item>
              </Col>
              <Col span={14}>
                <span style={{
                  padding: "4px 6px", color: 'white', display: this.state.PersonalNum.hiden ? 'none' : '',
                  backgroundColor: this.state.PersonalNum.sex === '女性' ? '#FF0000' : "#0000FF"
                }}
                >{this.state.PersonalNum.sex}</span>
                <Button style={{ marginLeft: "100px", display: this.state.PersonalNum.hiden ? 'none' : '', }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 1500,
                        component: (<WS0264001_VisitHistoricalQuery
                          Li_PersonalNum={this.formRef.current.getFieldValue('PersonalNumF')}
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
                  }}
                >履歴</Button>
              </Col>
            </Row>

            <Form.Item style={{ float: "right" }}>
              <Space>
                <Button type="primary" onClick={() => {
                  if (this.formRef.current.getFieldValue('PersonalNumF')) {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 1500,
                        component: (
                          <WS0343001_PersonalInfoMaintain
                            Li_PersonalNum={this.formRef?.current?.getFieldValue('PersonalNumF')}
                            onFinishScreen={(data) => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />
                        ),
                      },
                    })
                  } else {
                    Modal.error({
                      content: '個人番号が無効です',
                      icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
                    })
                  }
                }}>
                  個人保守
                </Button>
                <Button type="primary" htmlType='submit'>
                  移行処理
                </Button>
              </Space>
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0401001_PersonalNumberMigration);
