import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GuideMatterContentAction from 'redux/InputBusiness/NotInputCheckCategory/GuideMatterContent.action'
import { Modal, Card, Form, Input, Checkbox, Row, Col, Button, InputNumber } from "antd";
import WS0285001_JudgeQuery from 'pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery.jsx';
import WS0267001_CategorySearchQuerySingle from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx';
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

const smGrid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class WS2637041_GuideMatterContent extends React.Component {
  static propTypes = {
    Li_CommentCode: PropTypes.any,
    Lio_LeadershipMatters: PropTypes.any,
    Lio_InputFlag: PropTypes.any,
    Lio_AutomaticJudgeCategoryCode: PropTypes.any,
    Lio_AutomaticJudgeBasicJudge: PropTypes.any,
    Lio_AutomaticJudgeWeights: PropTypes.any,
    Lio_AutomaticJudgeOutputType: PropTypes.any,
    LnkIo2: PropTypes.any,
    LnkIo3: PropTypes.any,
  };



  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '指導事項内容';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
        Expression_13: false
      },
    };
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  checkData(value, type) {
    const val = type === 'number' ? 0 : ''
    return !this.isEmpty(value) ? value : val
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.listScreenData()
      this.forceUpdate()
    }
  }
  componentDidMount() {
    this.listScreenData()
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  renderFiledGcreendata(data) {
    if (!!data) {
      const keys = !this.isEmpty(Object.keys(data)) ? Object.keys(data) : [];
      const values = !this.isEmpty(Object.values(data)) ? Object.values(data) : []
      if (values.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          for (let y = 0; y < values.length; y++) {
            if (keys[i] === 'Lio_AutomaticJudgeCategoryCode' || keys[i] === 'Lio_AutomaticJudgeWeight') {
              const check = values[i] !== '0' || values[i] > 0;
              this.setFormFieldValue(keys[i], check ? values[i] : '')
            } else {
              this.setFormFieldValue(keys[i], values[i])
            }


          }
        }
      }
    }
  }
  listScreenData() { // lỗi 404
    const Lio_AutomaticJudgeWeight = this.props.Lio_AutomaticJudgeWeight > 0 ?
      this.props.Lio_AutomaticJudgeWeight : ''
    const params = {
      W3_general_comments_cd: this.checkData(this.props.Li_CmtCode, 'number'),
      W3_overall_comments: this.checkData(this.props.Lio_LeadershipMatters, 'text'),
      W3_input_flg: this.checkData(this.props.Lio_InputFlag, 'text'),
      W3_auto_judge_sect_cd: this.checkData(this.props.Lio_AutomaticJudgeCategoryCode, 'number'),
      W3_auto_judge_basic_judge: this.checkData(this.props.Lio_AutomaticJudgeBasicJudge, 'text'),
      W3_auto_judge_weights: this.checkData(Lio_AutomaticJudgeWeight, 'text'),
      W3_auto_judge_output_type: this.checkData(this.props.Lio_AutomaticJudgeOutputType, 'text'),
      W3_course_level_2: this.checkData(this.props.LnkIo2, 'number'),
      W3_course_level_3: this.checkData(this.props.LnkIo3, 'number'),
      judgment_weight: this.checkData(this.props.judgment_weight, 'number')
    }
    GuideMatterContentAction.getScreenData(params).then(res => {
      const data = res ? res : null;
      if (data) {
        this.renderFiledGcreendata(res);
        this.setState({ Expression_13: res?.Expression_13 })
      }

    })
  }
  Change_AutomaticJudgeBasicJudge(record) {
    const params = {
      Li_JungleLevel: this.checkData(this.props.Li_JungleLevel, 'number'),
      Lio_AutomaticJudgeBasicJudge:
        this.checkData(this.formRef?.current?.getFieldValue('Lio_AutomaticJudgeBasicJudge'), 'number')
    }
    GuideMatterContentAction.Change_AutomaticJudgeBasicJudge(params).then(res => {
      this.setFormFieldValue('Lio_AutomaticJudgeWeights', res?.Lio_AutomaticJudgeWeights)
    })
  }
  Change_Hide() {
    const Hide = this.formRef?.current?.getFieldValue('Hide');
    GuideMatterContentAction.Change_Hide({ Hide: !Hide ? 0 : 1 }).then(res => {
      this.setFormFieldValue('Manual', res)
    })
  }
  Change_Lio_LeadershipMatters() {
    GuideMatterContentAction.Change_Lio_LeadershipMatters().then(res => {
      this.setFormFieldValue('Manual', res)
    })
  }
  Exit() {
    const value = this.formRef?.current?.getFieldValue()
    const params = {
      Lio_LeadershipMatters: this.checkData(value.Lio_LeadershipMatters, 'text'),
      Lio_AutomaticJudgeCategoryCode: this.checkData(value.Lio_AutomaticJudgeCategoryCode, 'number'),
      Lio_AutomaticJudgeBasicJudge: this.checkData(value.Lio_AutomaticJudgeBasicJudge, 'text'),
      Lio_AutomaticJudgeWeights: this.checkData(value.Lio_AutomaticJudgeWeights, 'number'),
      Lio_AutomaticJudgeOutputType: this.checkData(value.Lio_AutomaticJudgeOutputType, 'text'),
      LnkIo2: this.checkData(Number(value.LnkIo2), 'number'),
      LnkIo3: this.checkData(Number(value.LnkIo3), 'number'),
      Hide: this.checkData(value.Hide, 'number'),
      Manual: this.checkData(value.Manual, 'number'),
      Expression_12: this.checkData(value.Expression_12, 'number'),
    }
    GuideMatterContentAction.Exit(params).then(res => {
      this.props.onFinishScreen({ Lo_recordData: res })
    })
  }
  ShowCategorySearchQuerySingle() {
    let valueJudge = this.formRef.current?.getFieldValue("Lio_AutomaticJudgeCategoryCode") ? this.formRef.current?.getFieldValue("Lio_AutomaticJudgeCategoryCode") : ''
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        centered: true,
        width: 800,
        component: (
          <WS0267001_CategorySearchQuerySingle
            Lio_CategoryCode={valueJudge}
            onFinishScreen={(output) => {
              this.formRef.current?.setFieldsValue({
                Lio_AutomaticJudgeCategoryCode: output?.Lo_recordData?.category_code,
                category_name: output?.Lo_recordData?.category_name,
              })
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
  showWS0285001_JudgeQuery(data) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '25%',
        component: (
          <WS0285001_JudgeQuery
            onFinishScreen={(obj) => {

            }}
          />
        ),
      },
    });
  }
  onFinish(values) {

  }
  setSelectCheckBox(name, value) {
    this.setFormFieldValue(name, value ? 1 : 0)
    this.forceUpdate()
  }
  render() {

    return (
      <div className="guide-matter-content">
        <Card title="指導事項内容">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ Hide: true, text_field_1: "自動判定", text_field_2: "結果表印字" }}
          >
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="Lio_LeadershipMatters"
                >
                  <Input.TextArea type="text" rows={10} onBlur={() => {
                    this.Change_Lio_LeadershipMatters()
                  }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Row gutter={24}>
                  <Col span={7}>
                    <Form.Item
                      name="text_field_1"
                    >
                      <Input type="text" style={{ textAlign: 'center', backgroundColor: "#1890ff", color: "#ffffff" }} />
                    </Form.Item>
                  </Col>
                  <Col span={17} style={{ paddingLeft: "0" }}>
                    <span style={{ lineHeight: "20px" }}>コメントの作成事由</span>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={15}>
                    <Form.Item
                      name="Lio_AutomaticJudgeCategoryCode"
                      label="ｶﾃｺﾞﾘ"
                      {...smGrid}
                    >
                      <InputNumber type="text" onDoubleClick={() => this.ShowCategorySearchQuerySingle()} />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item
                      name="category_name"
                    >
                      <span>{this.formRef?.current?.getFieldValue('category_name')}</span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={15}>
                    <Form.Item
                      name="Lio_AutomaticJudgeBasicJudge"
                      label="判　定"
                      {...smGrid}
                    >
                      <Input style={{
                        textAlign: 'center',
                        color: Color(this.formRef?.current?.getFieldValue('Expression_12'))
                      }} type="text"
                        onDoubleClick={() => this.showWS0285001_JudgeQuery()}
                        onBlur={
                          () => this.Change_AutomaticJudgeBasicJudge()
                        } />
                    </Form.Item>
                  </Col>
                  <Col span={9}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={15}>
                    <Form.Item
                      name="Lio_AutomaticJudgeWeights"
                      label="重　み"
                      {...smGrid}
                    >
                      <InputNumber type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={10}></Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={9}>
                  <Col span={7}>
                    <Form.Item
                      name="text_field_2"
                    >
                      <Input type="text" style={{ textAlign: 'center', backgroundColor: "#1890ff", color: "#ffffff" }} />
                    </Form.Item>
                  </Col>
                  <Col span={17} style={{ paddingLeft: "0" }}>
                    <span style={{ lineHeight: "20px" }}>結果表の設定が必要</span>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={15}>
                    <Form.Item
                      name="Lio_AutomaticJudgeOutputType"
                      label="種　別"
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={9}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={14}>
                    <Form.Item
                      name="Hide"
                    >
                      <Checkbox
                        checked={Number(this.formRef?.current?.getFieldValue('Hide'))}
                        onChange={(event) => {
                          this.Change_Hide()
                          this.setSelectCheckBox('Hide', event.target.checked)
                        }}>シークレットモード</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={10}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="LnkIo2"
                    >
                      <Checkbox checked={Number(this.formRef?.current?.getFieldValue('LnkIo2'))}

                        onChange={(event) => {
                          this.setSelectCheckBox('LnkIo2', event.target.checked)
                        }}>レベル２</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="LnkIo3"

                    >
                      <Checkbox
                        checked={Number(this.formRef?.current?.getFieldValue('LnkIo3'))}
                        onChange={(event) => {
                          this.setSelectCheckBox('LnkIo3', event.target.checked)
                        }}>レベル３</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}></Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="Manual"
                  valuePropName={this.formRef?.current?.getFieldValue('Manual') === 1 ? 'checked' : ''}
                >
                  <Checkbox
                    disabled=
                    {this.state.Expression_13 === 0 ? true : false}>手動で変更されている</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button style={{ float: "right" }} onClick={() => this.Exit()} type="primary">確定</Button>
              </Col>
            </Row>
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2637041_GuideMatterContent);
