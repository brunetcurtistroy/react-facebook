import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Checkbox, Radio, Button, Modal, Space, message, Spin } from "antd";

import WS0804062_CourseAll from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS0804062_CourseAll.jsx';
import HistorySettingAction from "redux/InputBusiness/NotInputCheckCategory/HistorySetting.action";
import WS0804074_QueryV4MjPrintPatametaMem from "./WS0804074_QueryV4MjPrintPatametaMem";

class WS0804032_HistorySetting extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_StyleCode: PropTypes.any,

    onChangeValue: PropTypes.func,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '履歴設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      disableNarrowingDown: false,
      dataHistory: {},

      loadingPage: false
    };
  }

  componentDidMount() {
    this.getDataScreen()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getDataScreen()
    }
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  getDataScreen() {
    let params = {
      Style: this.isEmpty(this.props.Li_StyleCode) ? '' : this.props.Li_StyleCode,
      ConfiguredCourses: '',
      CourseSelectCondition: '',
    }

    this.setState({ loadingPage: true })
    HistorySettingAction.getDataScreen(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          StsThisTime: res?.StsThisTime === 1 ? true : false,
          StsPrevious: res?.StsPrevious === 1 ? true : false,
          StsBeforeLast: res?.StsBeforeLast === 1 ? true : false,
          Sts3TimesBefore: res?.Sts3TimesBefore === 1 ? true : false,
          Sts4TimesBefore: res?.Sts4TimesBefore === 1 ? true : false,
          SameOffice: res?.SameOffice,
          NarrowingDownToBranch: res?.NarrowingDownToBranch,
          CourseSelectCondition: res?.CourseSelectCondition,
          ConfiguredCourses: res?.ConfiguredCourses
        })

        this.setState({
          disableNarrowingDown: res?.SameOffice === 0 ? true : false,
          loadingPage: false
        })
      })
      .finally(() => this.setState({ loadingPage: false }))
  }

  closeScreen() {
    let params = {
      ...this.formRef.current?.getFieldValue(),
      Style: this.isEmpty(this.props.Li_StyleCode) ? '' : this.props.Li_StyleCode,
      StsThisTime: this.formRef.current?.getFieldValue('StsThisTime') ? 1 : 0,
      StsPrevious: this.formRef.current?.getFieldValue('StsPrevious') ? 1 : 0,
      StsBeforeLast: this.formRef.current?.getFieldValue('StsBeforeLast') ? 1 : 0,
      Sts3TimesBefore: this.formRef.current?.getFieldValue('Sts3TimesBefore') ? 1 : 0,
      Sts4TimesBefore: this.formRef.current?.getFieldValue('Sts4TimesBefore') ? 1 : 0,
      NarrowingDownToBranch: this.formRef.current?.getFieldValue('NarrowingDownToBranch') ? 1 : 0,
    }

    HistorySettingAction.closeScreen(params)
      .then((res) => {

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

  saveData() {
    let params = {
      Style: this.isEmpty(this.props.Li_StyleCode) ? '' : this.props.Li_StyleCode,
    }

    HistorySettingAction.saveData(params)
      .then((res) => { })
  }

  onFinish(values) { }

  changeValue() {
    let data = {
      ...this.formRef.current?.getFieldValue(),
      Style: this.isEmpty(this.props.Li_StyleCode) ? '' : this.props.Li_StyleCode,
      StsThisTime: this.formRef.current?.getFieldValue('StsThisTime') ? 1 : 0,
      StsPrevious: this.formRef.current?.getFieldValue('StsPrevious') ? 1 : 0,
      StsBeforeLast: this.formRef.current?.getFieldValue('StsBeforeLast') ? 1 : 0,
      Sts3TimesBefore: this.formRef.current?.getFieldValue('Sts3TimesBefore') ? 1 : 0,
      Sts4TimesBefore: this.formRef.current?.getFieldValue('Sts4TimesBefore') ? 1 : 0,
      NarrowingDownToBranch: this.formRef.current?.getFieldValue('NarrowingDownToBranch') ? 1 : 0,
    }

    this.setState({
      dataHistory: data
    })
    if (this.props.onChangeValue) {
      this.props.onChangeValue({
        dataHistory: data
      });
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
      <div className="history-setting">
        <Card title='履歴設定'
        // title={
        //   <Space>
        //     <label style={{ marginRight: 20 }}>履歴設定</label>
        //     <Button
        //       onClick={() => {
        //         this.setState({
        //           childModal: {
        //             ...this.state.childModal,
        //             visible: true,
        //             width: '70%',
        //             component:
        //               <WS0804074_QueryV4MjPrintPatametaMem
        //                 Li_StyleCode={this.props.Li_StyleCode}
        //                 onFinishScreen={(output) => {
        //                   this.closeModal()
        //                 }}
        //               />
        //             ,
        //           },
        //         });
        //       }}
        //     >照会</Button>
        //   </Space>
        // }
        >
          <Spin spinning={this.state.loadingPage}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              style={{ padding: '0 25px' }}
            >
              <label style={{ fontWeight: 'bold' }}>過去の受診設定</label>
              <div style={{ marginLeft: '25px', marginBottom: 25 }}>
                <Form.Item
                  name="StsThisTime"
                  valuePropName="checked"
                >
                  <Checkbox onChange={() => this.changeValue()}>今回</Checkbox>
                </Form.Item>
                <Form.Item
                  name="StsPrevious"
                  valuePropName="checked"
                >
                  <Checkbox onChange={() => this.changeValue()}> 前回</Checkbox>
                </Form.Item>
                <Form.Item
                  name="StsBeforeLast"
                  valuePropName="checked"
                >
                  <Checkbox onChange={() => this.changeValue()}>前々回</Checkbox>
                </Form.Item>
                <Form.Item
                  name="Sts3TimesBefore"
                  valuePropName="checked"
                >
                  <Checkbox onChange={() => this.changeValue()}>3回前</Checkbox>
                </Form.Item>
                <Form.Item
                  name="Sts4TimesBefore"
                  valuePropName="checked"
                >
                  <Checkbox onChange={() => this.changeValue()}>4回前</Checkbox>
                </Form.Item>
              </div>

              <label style={{ fontWeight: 'bold' }}>事業所設定</label>

              <div style={{ marginLeft: '25px', marginBottom: 25 }}>
                <Form.Item name="SameOffice" >
                  <Radio.Group onChange={() => this.changeValue()}>
                    <Radio value={0} style={{ display: 'block', lineHeight: '30px' }}
                      onClick={async (event) => {
                        await this.setState({
                          disableNarrowingDown: true
                        })
                      }}>絞らない</Radio>
                    <Radio value={1} style={{ display: 'block', lineHeight: '30px' }}
                      onClick={async (event) => {
                        await this.setState({
                          disableNarrowingDown: false
                        })
                      }}>絞る</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="NarrowingDownToBranch"
                  valuePropName="checked"
                  style={{ marginLeft: '20px' }}
                >
                  <Checkbox disabled={this.state.disableNarrowingDown}
                    onChange={() => this.changeValue()}
                  > 支店が異なる場合は別事業所として絞る</Checkbox>
                </Form.Item>
              </div>

              <label style={{ fontWeight: 'bold' }}>コース別設定</label>
              <br></br>
              <Form.Item>
                <Button type="primary" style={{ marginTop: '15px' }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 600,
                        component:
                          <WS0804062_CourseAll
                            Li_StyleCode={this.props.Li_StyleCode}
                            Lio_CourseList={this.formRef.current?.getFieldValue('ConfiguredCourses')}
                            Lio_CourseSelectCondition={this.formRef.current?.getFieldValue('CourseSelectCondition')}

                            onChangeValue={(output) => {
                              this.formRef.current?.setFieldsValue({
                                ConfiguredCourses: output.Lio_CourseList,
                                CourseSelectCondition: output.Lio_CourseSelectCondition,
                              })
                              this.changeValue()
                            }}


                            onFinishScreen={(output) => {
                              // this.formRef.current?.setFieldsValue({
                              //   ConfiguredCourses: output.Lio_CourseList,
                              //   CourseSelectCondition: output.Lio_CourseSelectCondition,
                              // })
                              this.closeModal()
                            }}
                          />
                        ,
                      },
                    });
                  }}
                >設定</Button>
              </Form.Item>

            </Form>
          </Spin>
        </Card>

        <ModalDraggable
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0804032_HistorySetting);
