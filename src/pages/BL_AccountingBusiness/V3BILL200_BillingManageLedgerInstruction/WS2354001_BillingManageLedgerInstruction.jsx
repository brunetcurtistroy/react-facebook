import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Select, Checkbox, Button, Row, Col, Space } from "antd";
import WS0431001_CsvPreviewConfirm from "pages/TO_StatisticalServices/V4TO0014000_OfficeVisitsAchievementSituation/WS0431001_CsvPreviewConfirm";
import BillingManageLedgerInstruction from 'redux/AccountingBusiness/BillingManageLedgerInstruction/BillingManageLedgerInstruction.action'
class WS2354001_BillingManageLedgerInstruction extends React.Component {
  static propTypes = {
    Li_MenuOption: PropTypes.any,
    Li_Year: PropTypes.any,
    Li_Month: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '請求管理台帳指示';

    this.state = {
      ClaimYear: null,
      BillingMonth: null,
      TargetData: 0,
      PrintingCondition: 0,
      PrintingOrder: 0,
      ClaimClassify: 0,
      ContentOutput: 0,
      CsvOutputInfo: 0,
      Preview: 0
    };
    this.onFinish = this.onFinish.bind(this)
  }
  componentDidMount() {
    this.GetScreenData()
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.GetScreenData()
    }
  }

  GetScreenData() {
    const params = {
      Li_MenuOption: this.props.Li_MenuOption || "",
      Li_Year: this.props.Li_Year,
      Li_Month: this.props.Li_Month,
    }
    this.setState({ isLoading: true })
    BillingManageLedgerInstruction.GetScreenData(params)
      .then(res => {
        this.setState({
          ClaimYear: res.ClaimYear,
          BillingMonth: res.BillingMonth,
          TargetData: res.TargetData,
          PrintingCondition: res.PrintingCondition,
          PrintingOrder: res.PrintingOrder,
          ClaimClassify: res.ClaimClassify,
          ContentOutput: res.ContentOutput,
          CsvOutputInfo: res.CsvOutputInfo,
          Preview: res.Preview
        });
        this.formRef.current?.setFieldsValue(res);
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  Output_F12(params) {
    this.setState({ isLoading: true })
    BillingManageLedgerInstruction.Output_F12(params)
      .then(res => {
        this.CallScreen431()
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  CallScreen431() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1400,
        component:
          <WS0431001_CsvPreviewConfirm
            Lio_OutputMethod={this.state.OutputMethod}
            Lio_Output={this.state.CsvOutputInfo}
            Lio_Preview={this.state.Preview}
            onFinishScreen={(output) => {
              this.setState({
                OutputMethod: output.Lio_OutputMethod,
                CsvOutputInfo: output.Lio_Output,
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
  }

  OutputFinish(params) {
    this.setState({ isLoading: true })
    BillingManageLedgerInstruction.OutputFinish(params)
      .then(res => {

      })
      .finally(() => this.setState({ isLoading: false }))
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish(values) {

    this.Output_F12(values)

  }

  render() {
    return (
      <div className="billing-manage-ledger-instruction" style={{ width: '600px' }}>
        <Card title="請求管理台帳指示">
          <Space>
            <Button onClick={() => this.Output_F12(this.formRef.current?.getFieldValue())}>
              出力</Button>

          </Space>
         <hr style={{margin:"15px 0"}}/> 
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={4} style={{ textAlign: 'right' }}>
                <label>請求年月</label>
              </Col>
              <Col span={5} style={{ paddingRight: '5px' }}>
                <Form.Item
                  name="ClaimYear"
                  label=""
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={1} style={{ paddingLeft: '0', paddingRight: '5px' }}><label>年</label></Col>
              <Col span={5} style={{ paddingLeft: '0', paddingRight: '5px' }}>
                <Form.Item
                  name="BillingMonth"
                  label=""
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={1} style={{ paddingLeft: '0' }}><label>月</label></Col>
            </Row>

            <Row gutter={24}>
              <Col span={4} style={{ textAlign: 'right' }}>
                <label>対象ﾃﾞｰﾀ</label>
              </Col>
              <Col span={16} style={{ paddingRight: '5px' }}>
                <Form.Item
                  name="TargetData"
                  label=""
                >
                  <Select>
                    <Select.Option value={0}>有効分</Select.Option>
                    <Select.Option value={9}>無効分</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={4} style={{ textAlign: 'right' }}>
                <label>抽出条件</label>
              </Col>
              <Col span={16} style={{ paddingRight: '5px' }}>
                <Form.Item
                  name="PrintingCondition"
                  label=""
                >
                  <Select>
                    <Select.Option value={0}>全　て</Select.Option>
                    <Select.Option value={8}>未請求</Select.Option>
                    <Select.Option value={9}>請求済</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={4} style={{ textAlign: 'right' }}>
                <label>出力順</label>
              </Col>
              <Col span={16} style={{ paddingRight: '5px' }}>
                <Form.Item
                  name="PrintingOrder"
                  label=""
                >
                  <Select>
                    <Select.Option value={0}>請求書番号順</Select.Option>
                    <Select.Option value={1}>請求日順</Select.Option>
                    <Select.Option value={2}>コード順</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={4} style={{ textAlign: 'right' }}>
                <label>請求分類</label>
              </Col>
              <Col span={16} style={{ paddingRight: '5px' }}>
                <Form.Item
                  name="ClaimClassify"
                  label=""
                >
                  <Select>
                    <Select.Option value={0}>全　　件</Select.Option>
                    <Select.Option value={4}>保 険 者</Select.Option>
                    <Select.Option value={5}>事  業  所</Select.Option>
                    <Select.Option value={6}>他 団 体</Select.Option>
                    <Select.Option value={9}>個人未収</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={4} style={{ textAlign: 'right' }}>
                <label>請求分類</label>
              </Col>
              <Col span={16} style={{ paddingRight: '5px' }}>
                <Form.Item
                  name="ContentOutput"
                  label=""
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit">出力</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2354001_BillingManageLedgerInstruction);
