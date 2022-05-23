import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Button, Select, Row, Col, Modal, Space, InputNumber, message } from "antd";
import { MoreOutlined } from '@ant-design/icons';

import './WS1050001_AcquireSettingSub.scss';
import AcquireSettingSubAction from "redux/CooperationRelated/InspectAcquisitionUpdateCustomizedVersion/AcquireSettingSub.action";

import WS1050007_InspectSpecified from 'pages/KS_CooperationRelated/V4CP0011000_InspectAcquisitionUpdateCustomizedVersion/WS1050007_InspectSpecified.jsx';
import WS0450004_UserParamInput from 'pages/SM_SystemMaintenance/V4MS9900800_UserParamMaintain/WS0450004_UserParamInput.jsx';

const styleCustom = {
  col: {
    padding: 0,
  },

  row: {
    margin: 0
  },

  label: {
    background: '#066bc7', color: '#fff', textAlign: "center", height: '30px'
  },

  text: {
    background: '#066bc7',
    height: '30px',
    textAlign: 'center',
    paddingTop: '0.3em',
    border: '1px solid #f0f0f0',
    color: '#fff',
    fontWeight: 600,
    marginBottom: '10px'
  },

  inputNumber: {
    height: '30px', width: '100%', textAlign: 'right'
  }
}
class WS1050001_AcquireSettingSub extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Format: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '取込形式設定SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      separatedValue: 'FIX',
      format: '',
      PositionInspectCode: null,
      NumOfDigitsInspectCode: null
    };

    this.onFinish = this.onFinish.bind(this)
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
    let params = {
      Format: this.props.Li_Format ? this.props.Li_Format : ''
    }

    AcquireSettingSubAction.getDataScreen(params)
      .then(res => {
        let data = {
          ...res,
          PositionIdentify: res && res?.PositionIdentify === 0 ? null : res?.PositionIdentify,
          PositionRequestDate: res && res?.PositionRequestDate === 0 ? null : res?.PositionRequestDate,
          PositionPersonalNum: res && res?.PositionPersonalNum === 0 ? null : res?.PositionPersonalNum,
          PositionNumOfItems: res && res?.PositionNumOfItems === 0 ? null : res?.PositionNumOfItems,
          PositionInspectContent: res && res?.PositionInspectContent === 0 ? null : res?.PositionInspectContent,
          PositionInspectCode: res && res?.PositionInspectCode === 0 ? null : res?.PositionInspectCode,
          PositionInspectResults: res && res?.PositionInspectResults === 0 ? null : res?.PositionInspectResults,
          NumOfDigitsIdentify: res && res?.NumOfDigitsIdentify === 0 ? null : res?.NumOfDigitsIdentify,
          NumOfDigitsRequestDate: res && res?.NumOfDigitsRequestDate === 0 ? null : res?.NumOfDigitsRequestDate,
          NumOfDigitsPersonalNum: res && res?.NumOfDigitsPersonalNum === 0 ? null : res?.NumOfDigitsPersonalNum,
          DigitNumNumOfItems: res && res?.DigitNumNumOfItems === 0 ? null : res?.DigitNumNumOfItems,
          NumOfDigitsInspectContent: res && res?.NumOfDigitsInspectContent === 0 ? null : res?.NumOfDigitsInspectContent,
          NumOfDigitsInspectCode: res && res?.NumOfDigitsInspectCode === 0 ? null : res?.NumOfDigitsInspectCode,
          NumOfDigitsInspectResults: res && res?.NumOfDigitsInspectResults === 0 ? null : res?.NumOfDigitsInspectResults,
        } 

        this.formRef.current?.setFieldsValue(data)
        this.setState({
          separatedValue: res?.Separated,
          format: res?.Format,
          PositionInspectCode: res && res?.PositionInspectCode === 0 ? null : res?.PositionInspectCode,
          NumOfDigitsInspectCode: res && res?.NumOfDigitsInspectCode === 0 ? null : res?.NumOfDigitsInspectCode,
        })
      })
  }

  onFinish(values) {
    if (values.Format) {
      AcquireSettingSubAction.updateData(values)
        .then(res => {
          if (this.props.onFinishScreen) {
            this.props.onFinishScreen({})
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
    } else {
      message.error('FORMATを指定してください')
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="acquire-setting-sub">
        <Card title="取込形式設定SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              Separated: 'FIX'
            }}
          >
            <div hidden>
              <Form.Item name='InspectSpecified'><Input /></Form.Item>
            </div>
            <Row>
              <Col span={6} style={{ alignSelf: 'center' }}>
                <div style={styleCustom.text} >FORMAT </div>
              </Col>
              <Col span={6} style={{ alignSelf: 'center' }}>
                <Form.Item name="Format" style={{ marginBottom: '10px' }}>
                  <Input style={{ height: '30px' }}
                    onChange={(e) => this.setState({ format: e.target.value })}
                  />
                </Form.Item>
              </Col>
              <Col span={3} style={{ alignSelf: 'center' }}>
                <Button style={{ borderRadius: '6px', marginLeft: '1em', marginBottom: '10px' }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 500,
                        component: (
                          <WS0450004_UserParamInput
                            Li_Format={this.formRef.current?.getFieldValue('Format')}
                            onFinishScreen={() => {
                              this.closeModal()
                            }}
                          />
                        ),
                      },
                    })
                  }}
                ><MoreOutlined /></Button>
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ alignSelf: 'center' }}>
                <div style={styleCustom.text} >形　　式</div>
              </Col>
              <Col span={6} style={{ alignSelf: 'center' }}>
                <Form.Item name="Separated" style={{ marginBottom: '10px' }}>
                  <Select style={{ height: '30px' }} className='select-custom'
                    onChange={(value) => { this.setState({ separatedValue: value }) }}
                  >
                    <Select.Option value="FIX">固定</Select.Option>
                    <Select.Option value="C1">CSV形式</Select.Option>
                    <Select.Option value="C2">CSV形式("あり)</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div style={{ marginBottom: '2em', marginTop: '15px' }}>
              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="項　  目" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="位置" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="桁数" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="書式" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="識別" style={styleCustom.label} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="識　　別" style={{ ...styleCustom.label, background: 'transparent', color: '#11111' }} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="PositionIdentify">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="NumOfDigitsIdentify">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} >
                    <Input readOnly style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} >
                    <Input readOnly style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
              </Row>

            </div>
            <div style={{ marginBottom: '2em' }}>
              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="項　  目" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="位置" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="桁数" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="書式" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="識別" style={styleCustom.label} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="依 頼 日" style={{ ...styleCustom.label, background: 'transparent', color: '#11111' }} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="PositionRequestDate">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="NumOfDigitsRequestDate">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber}
                      disabled={this.state.separatedValue !== 'FIX'}
                    />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="FormatRequestDate">
                    <Input style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name='IdentifyRequestDate'>
                    <Input style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="個人番号" style={{ ...styleCustom.label, background: 'transparent', color: '#11111' }} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="PositionPersonalNum">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="NumOfDigitsPersonalNum">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber}
                      disabled={this.state.separatedValue !== 'FIX'}
                    />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} >
                    <Input readOnly style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name='IdentifyPersonalNum'>
                    <Input style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="項 目 数" style={{ ...styleCustom.label, background: 'transparent', color: '#11111' }} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="PositionNumOfItems">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="DigitNumNumOfItems">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber}
                      disabled={this.state.separatedValue !== 'FIX'}
                    />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="FormatNumOfItems">
                    <Input style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name='IdentifyNumOfItems'>
                    <Input style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="検 査 部" style={{ ...styleCustom.label, background: 'transparent', color: '#11111' }} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="PositionInspectContent">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="NumOfDigitsInspectContent">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} >
                    <Input readOnly style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name='IdentifyInspectContent'>
                    <Input style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div>
              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="項　  目" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="位置" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="桁数" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="書式" style={styleCustom.label} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="識別" style={styleCustom.label} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="検査ｺｰﾄﾞ" style={{ ...styleCustom.label, background: 'transparent', color: '#11111' }} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="PositionInspectCode">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber}
                      onChange={(value) => {
                        this.setState({
                          PositionInspectCode: (value === 0 || !value) ? null : value
                        })
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="NumOfDigitsInspectCode">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber}
                      onChange={(value) => {
                        this.setState({
                          NumOfDigitsInspectCode: (value === 0 || !value) ? null : value
                        })
                      }} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} >
                    <Input readOnly style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} >
                    <Input readOnly style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} style={styleCustom.row}>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input readOnly value="検査結果" style={{ ...styleCustom.label, background: 'transparent', color: '#11111' }} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="PositionInspectResults">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber} />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} name="NumOfDigitsInspectResults">
                    <InputNumber className='custom-input-number' maxLength={5} min={0} style={styleCustom.inputNumber}
                      disabled={this.state.separatedValue !== 'FIX'}
                    />
                  </Form.Item>
                </Col>
                <Col span={5} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} >
                    <Input readOnly style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
                <Col span={4} style={styleCustom.col}>
                  <Form.Item style={{ marginBottom: 0 }} >
                    <Input readOnly style={{ height: '30px' }} />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div style={{ marginTop: '1em', textAlign: 'right' }}>
              <Space>
                <Button type='primary'
                  disabled={this.state.PositionInspectCode || this.state.NumOfDigitsInspectCode}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 500,
                        component: (
                          <WS1050007_InspectSpecified
                            Lio_InspectSpecified={this.formRef.current?.getFieldValue('InspectSpecified')}

                            onChangeValue={({Lio_InspectSpecified}) => {
                              this.formRef.current?.setFieldsValue({
                                InspectSpecified: Lio_InspectSpecified
                              })
                            }}
                          />
                        ),
                      },
                    })
                  }}
                >検査指定</Button>
                {/* <Button type="primary">&emsp;変換&emsp;</Button> */}
                <Button type="primary"
                  disabled={!this.state.format}
                  onClick={() => this.onFinish(this.formRef.current?.getFieldValue())}
                >&emsp;更新&emsp;</Button>
              </Space>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1050001_AcquireSettingSub);
