import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Button, Checkbox, Table, Tabs, Modal } from "antd";

import WS2623001_DispensingProcessSub from 'pages/UK_CounterBusiness/V5UK0001000_Counter/WS2623001_DispensingProcessSub.jsx';
import {
  getDataBillingInquirySubSerAction, getListDataInvoiceSubAction, getListDataPaymentSubAction
} from "redux/InputBusiness/ProgressSetting/BillingInquirySub.actions";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2593056_BillingInquirySub extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '請求照会SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      infoPage: {},
      dataInvoiceSub: [],
      isLoadInvoiceSub: true,
      selectRowInvoiceSub: {},
      dataPaymentSub: [],
      isLoadPaymentSub: true,
      selectRowPaymentSub: {},
    };
  }

  componentDidMount = () => {
    this.getDataBillingInquirySubSer(this.props.Li_ReserveNum);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.getDataBillingInquirySubSer(this.props.Li_ReserveNum);
    }
  }

  getDataBillingInquirySubSer = (params) => {
    getDataBillingInquirySubSerAction({ Li_ReserveNum: params })
      .then(res => {
        if (res) {
          this.setState({ infoPage: res.data });
          let StsDisabled = this.formRef?.current.getFieldValue('StsDisabled') ? 1 : 0;
          this.getListDataInvoiceSub({
            Li_ReserveNum: this.state.infoPage.Li_ReserveNum,
            StsDisabled: StsDisabled
          });
        }
      })
      .catch()
  }

  getListDataInvoiceSub = (params) => {
    this.setState({ isLoadInvoiceSub: true });
    getListDataInvoiceSubAction(params)
      .then(res => {
        if (res) {
          this.setState({ dataInvoiceSub: res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoadInvoiceSub: false }))
  }

  getListDataPaymentSub = (params) => {
    this.setState({ isLoadPaymentSub: true });
    getListDataPaymentSubAction(params)
      .then(res => {
        if (res) {
          this.setState({ dataPaymentSub: res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoadPaymentSub: false }))
  }

  render() {
    return (
      <div className="billing-inquiry-sub">
        <Card title="請求照会SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{ StsDisabled: false }}
          >
            <Tabs onChange={(activeKey) => {
              if(parseInt(activeKey) === 1)
                this.getListDataPaymentSub({
                  CounterClaimManageNum: this.state.infoPage.CounterClaimManageNum,
                  StsDisabled: this.formRef?.current.getFieldValue('StsDisabled') ? 1 : 0
                })
            }}>
              <Tabs.TabPane tab="団体" key="0">
                <Table
                  size='small'
                  dataSource={this.state.dataInvoiceSub}
                  loading={this.state.isLoadInvoiceSub}
                  bordered={true}
                  rowKey={(record) => record.id}
                  onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
                >
                  <Table.Column title="請求日" dataIndex="billing_date_on" />
                  <Table.Column title="請求先" dataIndex="Expression_5" />
                  <Table.Column title="請求番号" dataIndex="invoice_number" />
                  <Table.Column title="請求発行日" dataIndex="invoice_date_on" />
                  <Table.Column title="請求金額" dataIndex="billing_price" />
                  <Table.Column title="宛　名" dataIndex="according_to_destination_name" />
                  <Table.Column title="形態" dataIndex="State" />
                  <Table.Column title="入金" dataIndex="Expression_8" />
                </Table>

              </Tabs.TabPane>
              <Tabs.TabPane tab="窓口" key="1" >
                <Table
                  size='small'
                  dataSource={this.state.dataPaymentSub}
                  loading={this.state.isLoadPaymentSub}
                  bordered={true}
                  rowKey={(record) => record.id}
                  onRow={(record, index) => ({ onClick: event => this.setState({ selectRowPaymentSub: record }) })}
                >
                  <Table.Column title="入出" dataIndex="Expression_10" />
                  <Table.Column title="処理日" dataIndex="processing_date_on" />
                  <Table.Column title="識別" dataIndex="Expression_7" />
                  <Table.Column title="金額" dataIndex="deposit_withdraw_amount" />
                  <Table.Column title="領収番号" dataIndex="receipt_number" />
                  <Table.Column title="領収日" dataIndex="receipt_date_on" />
                  <Table.Column title="件名" dataIndex="subject" />
                  <Table.Column title="形態" dataIndex="State" />
                </Table>
                <br></br>

                <Button type="primary" style={{ float: 'right' }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 800,
                        component:
                          <WS2623001_DispensingProcessSub
                            Li_ReserveNum={this.props.Li_ReserveNum}
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
                >出金</Button>
              </Tabs.TabPane>
            </Tabs>

            <hr style={{ margin: '15px 0' }}></hr>

            <Form.Item
              name="StsDisabled"
              valuePropName="checked"
              style={{ float: 'right' }}>
              <Checkbox>全て表示</Checkbox>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2593056_BillingInquirySub);
