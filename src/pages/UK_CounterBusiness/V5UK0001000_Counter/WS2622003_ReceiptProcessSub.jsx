import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Card, Col, Row, Table, Form, Input, PageHeader, Checkbox, Layout, Button, Modal, DatePicker } from "antd";
import ReceiptProcessSubAction from "redux/CounterBusiness/Counter/ReceiptProcessSub.action";
import GetImage from "constants/Images";
import WS0946006_ReceiptIssueOnline from "pages/BL_AccountingBusiness/SMIYA0502_ReceiptPreIssue20/WS0946006_ReceiptIssueOnline";
import moment from 'moment';
import  ModalDraggable  from "components/Commons/ModalDraggable";

const { Footer } = Layout;
const smGrid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
class WS2622003_ReceiptProcessSub extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_ReceiptManageNum1Sheet: PropTypes.any,
    Li_ReceiptManageNum2Nd: PropTypes.any,
    Li_ReceiptManageNum3Rd: PropTypes.any,
    Li_Identify: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
  }
  constructor(props) {
    super(props);

    // document.title = '領収処理SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRowTableFirst: [],
      initialValues: {},
      getIndex1:{},
      getIndex2:{},
      getIndex3:{},
      OptionInspect1: [],
      OptionInspect2: [],
      OptionInspect3: [],
      ScreenData: {},
      Cards: []
    };
  }

  handleSelectRowsTableFirst = selectedRowTableFirst => {
    this.setState({ selectedRowTableFirst });
  };
  componentDidUpdate (prevProps) {
    if (this.props != prevProps) {
      this.forceUpdate()
      this.loadData()

    }
  }
  componentDidMount = () => {
    this.loadData()
  }
  loadData() {
    const prams = {
      Li_SpecifiedIdentify: this.props.Li_SpecifiedIdentify
    }
    ReceiptProcessSubAction.getScreenData({ 
      Li_ReserveNum: this.props.Li_ReserveNum, ...prams }).then(res => {
      this.setFormFieldValue('sts1', res && res.sts1 ? res.sts1 : 0)
      this.setFormFieldValue('sts2', res && res.sts2 ? res.sts2 : 0)
      this.setFormFieldValue('sts3', res && res.sts3 ? res.sts3 : 0)
      let cards = [
        { sts: res.sts1, receipt: res.ReceiptManageNum1Sheet, title: res.Title1Sheet},
        {  sts: res.sts2, receipt: res.ReceiptManageNum2Nd, title: res.Title2Nd},
        { sts: res.sts3, receipt: res.ReceiptManageNum3Rd, title: res.Title3Rd}]
      
        this.setState({ ...this.state, ScreenData: res, Cards: cards})
        cards.forEach((item, i) => {
          const index = (i+1)
          if(item.receipt > 0) {
            const params = {
              Li_ReceiptManageNum: item.receipt,
              Li_Identify: this.props.Li_Identify,
              Li_ReserveNum: this.props.Li_ReserveNum,
            }
            ReceiptProcessSubAction.getIndex(params).then(res => {
              this.setState({ ...this.state, [`getIndex${index}`]: res })
              this.renderForm(index)
            })
            ReceiptProcessSubAction.getOptionInspect({ Li_ReserveNum: this.props.Li_ReserveNum,
              Li_Identify: index }).then(res => {
              this.setState({ ...this.state, [`OptionInspect${index}`]: res })
            })
          }
        })
    })
  }
  renderForm(i) {
    const value = this.state[`getIndex${i}`]
    this.setFormFieldValue(`ReceiptDateChar${i}`, value && value?.ReceiptDateChar ? moment(value?.ReceiptDateChar) : '')
    this.setFormFieldValue(`W1_destination_name${i}`, value && value?.W1_destination_name ? value?.W1_destination_name : '')
    this.setFormFieldValue(`W1_subject${i}`, value && value?.W1_subject ? value?.W1_subject : '')
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  onFinish = (values) => {
    const params = {
      Sts1: !!this.formRef?.current?.getFieldValue('sts1') ? 1 : 0,
      Sts2: !!this.formRef?.current?.getFieldValue('sts2') ? 1 : 0,
      Sts3: !!this.formRef?.current?.getFieldValue('sts3') ? 1 : 0,
      Li_ReserveNum: this.props.Li_ReserveNum,
    };
    ReceiptProcessSubAction.confirmF12(params).then(() => {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 500,
          component: (
            <WS0946006_ReceiptIssueOnline
              onFinishScreen={(output) => {
                this.props.onFinishScreen({ StsSend: true, nameScreen: 'WS2621001_PaymentProcessSub' })
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
    })
  }
  returnCard() {
    const { selectedRowTableFirst } = this.state
    return (<div style={{ display: 'block', overflowX: 100 }}>
      {
        <div style={{ display: 'flex', overflowX: 100 }}>
          {this.state.Cards.map((s,i) => (
            <Card hidden={!s.sts > 0} style={{ overflowX: 40, overflowY: 40 }}>
              <PageHeader
                className="site-page-header"
                title={<div style={{ textAlign: 'center' }}>
                  <Form.Item name={`sts${s.sts > 0 ? i+1 : ''}`} valuePropName="checked">
                    <Checkbox  ><h4>￥{s.title}</h4></Checkbox>
                  </Form.Item>
                </div>}
              />,
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name={`ReceiptDateChar${i+1}`}
                    style={{width: '100%' }}
                    label="領収日"
                    {...smGrid}
                  >
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'YYYY/MM/DD'} style={{ float: 'right', width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name={`W1_destination_name${i+1}`}
                    label="宛　先"
                    {...smGrid}
                  >
                    <Input type="text" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name={`W1_subject${i+1}`}
                    label="コース"
                    {...smGrid}
                  >
                    <Input type="text" />
                  </Form.Item>
                </Col>
              </Row>
              <Table
                bordered={true}
                showHeader={false}
                dataSource={this.state[`OptionInspect${i+1}`]}
                // rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
                rowKey={(record) => record.id}
                pagination={false} scroll={{ y: 500 }}

              >
                <Table.Column width={40} title="受付No" render={(text, record, index) => (
                  <img src={GetImage(record.Expresstion_8)} alt="icon" />
                )} />
                <Table.Column width={150} title="氏名" dataIndex="set_name" />
                <Table.Column width={60} title="コース" dataIndex="Expresstion_6" render={(text, record, index) => (
                  <div style={{ textAlign: 'right' }}> <span>{formatter(record.Expresstion_6)}</span></div>
                )} />
              </Table>
            </Card>
          ))}
        </div>
      }
      <Footer style={{ padding: 0, paddingTop: '25px' }}>
        <Row gutter={24} className="mb-3">
          <Col span={15}></Col>
          <Col span={3}>
            <Form.Item label="受領額">
              <span>{formatter(this.state.ScreenData.Receipts ? this.state.ScreenData.Receipts : '' )}</span>
            </Form.Item>
          </Col>
          {
            this.state.ScreenData.Otsuri === 0 || this.state.ScreenData.Otsuri === null ? <Col span={3}></Col> :
              <Col span={3}>
                <Form.Item label="釣銭">
                  <span>{formatter(this.state.ScreenData.Otsuri ? this.state.ScreenData.Otsuri : '' )}</span>
                </Form.Item>
              </Col>
          }

          <Col span={3} style={{ float: "right" }}>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>確定</Button>
          </Col>
        </Row>
      </Footer>
    </div>)
  }

  render() {
    const { selectedRowTableFirst, OptionInspect } = this.state
    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst
    }
    return (
      <div className="receipt-process-sub">

        <Card title="領収処理SUB" style={{ overflowX: 200 }} >
          <Form ref={this.formRef}
            onFinish={this.onFinish} initialValues={{ ...this.state.initialValues }}>
            {this.returnCard()}
          
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
          maskClosable={false}
          onCancel={() => { 
            this.props.onFinishScreen({ StsSend: true, nameScreen: 'WS2621001_PaymentProcessSub' })

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2622003_ReceiptProcessSub);
