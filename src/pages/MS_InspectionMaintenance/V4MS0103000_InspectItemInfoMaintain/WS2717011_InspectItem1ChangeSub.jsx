import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Checkbox, Button, Row, Col, Spin, message, InputNumber } from "antd";

import { InspectItem1ChangeSubAction, registerBtnInspectItem1ChangeSubAction } from 'redux/InspectionMaintenance/InspectItemInfoMaintain/InspectItem1ChangeSub.action';

import WS0253001_InternalInspectItemSearchQuery from 'pages/MS_InspectionMaintenance/V4MS0103000_InspectItemInfoMaintain/WS0253001_InternalInspectItemSearchQuery.jsx';
import WS0274001_InspectCmtSearchQuery from "pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0274001_InspectCmtSearchQuery";
import { ModalError } from "components/Commons/ModalConfirm";

class WS2717011_InspectItem1ChangeSub extends React.Component {
  static propTypes = {
    Lio_InspectCode: PropTypes.any,
    onFinishScreen: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '検査項目1件変更SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoading: false,
      initObj: {},
      Lio_InspectCode: '',
      InspectType: 'N',
    };
    this.onFinish = this.onFinish.bind(this)
  }
  componentDidMount = () => {
    this.loadInitData({ Lio_InspectCode: this.props.Lio_InspectCode });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.loadInitData({ Lio_InspectCode: this.props.Lio_InspectCode });
    }
  }

  loadInitData = (params) => {
    this.formRef?.current?.resetFields()
    InspectItem1ChangeSubAction(params)
      .then((res) => {
        let dataRes = res?.data;
        if (dataRes) {
          let obj = {
            ...dataRes[0],
            InspectCode: dataRes[0]?.InspectCode === 0 ? null : dataRes[0]?.InspectCode,
            InternalInspectItemCode: dataRes[0]?.InternalInspectItemCode === 0 ? null : dataRes[0]?.InternalInspectItemCode,
            InspectCmtCode: dataRes[0]?.InspectCmtCode === 0 ? null : dataRes[0]?.InspectCmtCode,
            item_code_external: dataRes[0]?.item_code_external === 0 ? null : dataRes[0]?.item_code_external,
            Expression_34: dataRes[0]?.Expression_34 === 0 ? null : dataRes[0]?.Expression_34
          }
          this.setState({ initObj: obj });
          this.formRef?.current?.setFieldsValue(obj);
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  RegisterBtn = (params) => {
    this.setState({ isLoading: true })
    registerBtnInspectItem1ChangeSubAction(params)
      .then(()=> this.props.onFinishScreen && this.props.onFinishScreen())
      .catch(err => ModalError(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  openModal_WS0253001 = (option) => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component: (
          <WS0253001_InternalInspectItemSearchQuery
            Lio_InternalInspectCode={
              option === 'InspectCode'
                ? this.state.initObj.InspectCode
                : this.state.initObj.InternalInspectItemCode
            }
            Li_Select={1}
            onFinishScreen={({ recordData }) => {
              if (option === 'InspectCode') {
                this.formRef?.current?.setFieldsValue({
                  InspectCode: recordData.internal_exam_code,
                  InspectName: recordData.exam_name,
                  InspectShortName: recordData.exam_short_name
                });
              } else {
                this.formRef?.current?.setFieldsValue({
                  InternalInspectItemCode: recordData.internal_exam_code,
                  InspectName: recordData.exam_name,
                  InspectShortName: recordData.exam_short_name
                });
              }
              this.closeModal()
            }}
          />
        ),
      },
    })
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  onFinish(formData) {
    let params = {
      ...formData,
      Lio_InspectCode: this.props.Lio_InspectCode,
      InternalInspectItemCode: formData.InternalInspectItemCode || 0,
      SignPresence: formData.SignPresence ? true : false,
      ExamType2: formData.ExamType2 ? true : false,
      DeterminingPresence: formData.DeterminingPresence ? true : false,
      item_code_external: formData.item_code_external || '',
      exam_name: formData.exam_name || ''
    };
    this.RegisterBtn(params);
  }

  render() {
    return (
      <div className="inspect-item1-change-sub" style={{ width: '600px' }}>
        <Card title="検査項目1件変更SUB">
          <Form ref={this.formRef} onFinish={this.onFinish} autoComplete='off' initialValues={{ InspectType: 'N', NumOfDecimalPlaces: 0 }}>
            <Spin spinning={this.state.isLoading}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="InspectCode" label="　コード">
                    <InputNumber
                      maxLength={8}
                      disabled={!(this.props.Lio_InspectCode === 0)}
                      onDoubleClick={() => this.openModal_WS0253001('InspectCode')}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} hidden={!(this.props.Lio_InspectCode > 0)}>
                  <Form.Item name="InternalInspectItemCode" label='内部コード' >
                    <InputNumber
                      maxLength={8}
                      readOnly={!(this.props.Lio_InspectCode > 0)}
                      onDoubleClick={() => this.openModal_WS0253001('InternalInspectItemCode')}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="InspectName" label="検査名称">
                <Input maxLength={30} />
              </Form.Item>

              <Form.Item name="InspectShortName" label="検査略名" >
                <Input maxLength={10} />
              </Form.Item>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="　タイプ" name="InspectType"  >
                    <Select onChange={(value) => this.setState({ InspectType: value })}>
                      <Select.Option value="N">数字</Select.Option>
                      <Select.Option value="X">文字</Select.Option>
                      <Select.Option value="S">所見</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="NumOfDecimalPlaces" label="小数">
                    <Select disabled={!(this.state.InspectType === 'N')}>
                      <Select.Option value={0}>0</Select.Option>
                      <Select.Option value={1}>1</Select.Option>
                      <Select.Option value={2}>2</Select.Option>
                      <Select.Option value={3}>3</Select.Option>
                      <Select.Option value={4}>4</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name='SignPresence' label='桁　符号(+)' valuePropName='checked'>
                    <Checkbox disabled={!(this.state.InspectType === 'N')} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="日付変換" name='ExamType2' valuePropName='checked'>
                    <Checkbox />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='自動判定' name='DeterminingPresence' valuePropName='checked'>
                    <Checkbox />
                  </Form.Item>
                </Col>
                <Col span={8}></Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="コメント" name="InspectCommentCode">
                    <InputNumber
                      maxLength={8}
                      disabled={!(this.state.InspectType === 'X' || this.state.InspectType === 'J')}
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 900,
                            component: (
                              this.state.initObj.InspectCommentCode === 0
                                ? null // do something
                                : <WS0274001_InspectCmtSearchQuery
                                  Lio_CmtClassify={this.state.initObj.InspectCommentCode}
                                  LnkOutInspectCmtScreen={''}
                                  onFinishScreen={({ recordData }) => {

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
                <Col span={16}>
                  <Form.Item name='exam_comment_screen'>
                    <Input bordered={false} readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="Unit" label="　　単位" >
                <Input maxLength={10} />
              </Form.Item>

              <Row gutter={16}>
                <Col span={6} hidden={!(this.props.Lio_InspectCode > 0)}>
                  <Form.Item label="外部検査" name="item_code_external">
                    <InputNumber readOnly bordered={false} />
                  </Form.Item>
                </Col>
                <Col span={18} hidden={!(this.props.Lio_InspectCode > 0)}>
                  <Form.Item name='exam_name'>
                    <Input bordered={false} readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={6} hidden={!(this.props.Lio_InspectCode > 0)}>
                  <Form.Item label="検査依頼" name="Expression_34">
                    <InputNumber readOnly bordered={false} />
                  </Form.Item>
                </Col>
                <Col span={18} hidden={!(this.props.Lio_InspectCode > 0)}>
                  <Form.Item name='exam_kanji_name_external'>
                    <Input bordered={false} readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{ float: 'right' }}>
                <Button type="primary" htmlType='submit'>登録</Button>
              </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2717011_InspectItem1ChangeSub);
