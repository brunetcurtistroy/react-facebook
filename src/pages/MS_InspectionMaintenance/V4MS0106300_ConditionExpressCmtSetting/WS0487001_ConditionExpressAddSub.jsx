import React from "react";
import { connect } from "react-redux";
import WS0487008_HeaderInput from 'pages/MS_InspectionMaintenance/V4MS0106300_ConditionExpressCmtSetting/WS0487008_HeaderInput.jsx';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS0267001_CategorySearchQuerySingle from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx';
import WS0274001_InspectCmtSearchQuery from 'pages/IN_InputBusiness/V4IN0101000_SpreadInput/WS0274001_InspectCmtSearchQuery'
import WS0285001_JudgeQuery from 'pages/SK_IntroductionLetter/V4SK0012000_PersonRequireExamIntroduceLetter/WS0285001_JudgeQuery.jsx';
import WS0178001_QuerySiteInfo from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0178001_QuerySiteInfo.jsx';
import WS0179001_InquiryFindingInfo from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS0179001_InquiryFindingInfo.jsx';
import WS0487007_JudgeHighlow from 'pages/MS_InspectionMaintenance/V4MS0106300_ConditionExpressCmtSetting/WS0487007_JudgeHighlow.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Button, Row, Col, Modal } from "antd";
const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const のData = [
  { Expression_6: '', Expression_7: '部位名称＋所見名称' },
  { Expression_6: 'H', Expression_7: '判定' },
  { Expression_6: 'h', Expression_7: '判定＋↑↓' },
  { Expression_6: 'L', Expression_7: '有無' },
]
class WS0487001_ConditionExpressAddSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '条件式追加SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount() {
    this.setFormFieldValue('MainDivision', 'K')
    this.setFormFieldValue('Expression_22', 1)
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setFormFieldValue('MainDivision', 'K')
      this.setFormFieldValue('Expression_22', 1)
    }
  }

  showWS0487008_HeaderInput() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '10%',
        component: (
          <WS0487008_HeaderInput
            Lio
            onFinishScreen={( output) => {
              this.setFormFieldValue('CodeName', output && output.Lo_HeaderInfo)
              // this.setFormFieldValue('Lio_Code', output && output.Lo_HeaderInfo);
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  showWS0274001_InspectCmtSearchQuery() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component:
          <WS0271001_InspectItemSearchQuerySingle
            Lio_InspectItemCode={this.getRawValue('CodeName')}
            onFinishScreen={(output) => {
              if (output) {
                this.setFormFieldValue('CodeName', output && output.recordData?.exam_name)
                this.setFormFieldValue('Lio_Code', output && output.Lio_CategoryCode);
                this.closeModal()
              }
            }}
          />
        ,
      },
    });
  }
  ShowWS0267001_CategorySearchQuerySingle() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        centered: true,
        width: 600,
        component: (
          <WS0267001_CategorySearchQuerySingle
            Lio_CategoryCode={this.getRawValue('CodeName')}
            onFinishScreen={(output) => {
              if (output) {
                this.setFormFieldValue('CodeName', output && output?.recordData?.category_name);
                this.setFormFieldValue('Lio_Code', output && output.Lio_CategoryCode);
              }
              this.closeModal()
            }}
          />
        ),

      },
    })
  }
  showScreenByBefore() {
    const MainDivision = this.getRawValue('MainDivision')
    if (MainDivision === 'H') {
      this.showWS0487008_HeaderInput()
    }
    if (MainDivision === 'K') {
      this.showWS0274001_InspectCmtSearchQuery()
    }
    if (MainDivision === 'C') {
      this.ShowWS0267001_CategorySearchQuerySingle()
    }
  }
  ShowWS0274001_InspectCmtSearchQuery() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        centered: true,
        width: 600,
        component: (
          <WS0274001_InspectCmtSearchQuery
            Lio_CmtClassify
            LnkOutInspectCmtScreen
            onFinishScreen={(output) => {
              if (output) {
                console.log(output)
              }
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  ShowWS0285001_JudgeQuery() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        centered: true,
        width: 600,
        component: (
          <WS0285001_JudgeQuery
            Lio_Judge
            onFinishScreen={(output) => {
              if (output) {
                //Code of RightHandSide = Lio_Judge 
                console.log(output)
              }
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  ShowWS0178001_QuerySiteInfo() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        centered: true,
        width: 600,
        component: (
          <WS0178001_QuerySiteInfo
            Li_SiteClassify
            onFinishScreen={(output) => {
              if (output) {
                //Code of RightHandSide = Lo_SiteCode 
                console.log(output)
              }
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  ShowWS0179001_InquiryFindingInfo() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        centered: true,
        width: 600,
        component: (
          <WS0179001_InquiryFindingInfo
            Li_FindingsClassify
            onFinishScreen={(output) => {
              if (output) {
                //Code of RightHandSide = Lo_FindingsCode
                console.log(output)
              }
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  ShowWS0487007_JudgeHighlow() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        centered: true,
        width: 250,
        component: (
          <WS0487007_JudgeHighlow
            Lio_RightHandSide
            onFinishScreen={(output) => {
              if (output) {
                //Code of RightHandSide = Lio_Judge 
                console.log(output)
              }
              this.closeModal()
            }}
          />
        ),
      },
    })
  }
  rightHandSingleQueryEvent() {
    // api check dieu kien show man hinh
    // @ WS0274001_InspectCmtSearchQuery
    // @ WS0285001_JudgeQuery
    // @ WS0178001_QuerySiteInfo
    // @ WS0179001_InquiryFindingInfo
    // @ WS0487007_JudgeHighlow
    // @ dieu kien mo hai man WS0178001_QuerySiteInfo + WS0179001_InquiryFindingInfo
  }
  Decision_F12() {
    // api
    const { onFinishScreen } = this.props;
    if (onFinishScreen) {
      onFinishScreen({ Lo_Setting: '' }) // data form Server
    }
  }
  onFinish = (values) => {
    // call fuc Decision_F12
    this.Decision_F12()
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  render() {
    const Expression_22 = this.getRawValue('Expression_22')
    return (
      <div className="condition-express-add-sub">
        <Card title="条件式追加SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={8}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Form.Item name="MainDivision" label="" style={{ width: '60%', marginRight: '2px' }} >
                    <Select
                      onChange={(event) => {
                        this.setFormFieldValue('Expression_22', event === 'C' ? 0 : 1)
                        this.forceUpdate()
                      }}>
                      <Select.Option value="K">検査</Select.Option>
                      <Select.Option value="C">ｶﾃｺﾞﾘ</Select.Option>
                      <Select.Option value="H">その他</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="CodeName" label="" style={{ width: '100%' }} >
                    <Input type="text" onDoubleClick={() => this.showScreenByBefore()} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={14}>
                <Row gutter={24}>
                  <Col span={24}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <Form.Item name="Minute" label="の" style={{ width: '100%', marginRight: '5px' }}>
                        <Select disabled={Expression_22}>
                          {のData.map((item) => {
                            return <Select.Option value={item.Expression_6}>{item.Expression_7}</Select.Option>
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item name="HistoryDivision" style={{ width: '90%' }}>
                        <Select>
                          <Select.Option value={''}>今回</Select.Option>
                          <Select.Option value="1">前回</Select.Option>
                          <Select.Option value="2">前々回</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <Form.Item name="RightHandSide" label="が" style={{ width: '100%', marginRight: '5px' }}>
                        <Input type="text"
                          onClick={() => {
                            this.setFormFieldValue('Minute', '')
                            this.rightHandSingleQueryEvent()
                          }
                          }

                        />
                      </Form.Item>
                      <Form.Item name="Operator" label="" style={{ width: '90%' }}>
                        <Select>
                          <Select.Option value="=">と等しい</Select.Option>
                          <Select.Option value="≠">と等しくない</Select.Option>
                          <Select.Option value="≦">以下</Select.Option>
                          <Select.Option value="≧">以上</Select.Option>
                          <Select.Option value="＜">より小さい</Select.Option>
                          <Select.Option value="＞">より大きい</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>

              </Col>
              <Col span={2}>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit" style={{ height: '3.5rem' }}>確定</Button>
                </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0487001_ConditionExpressAddSub);
