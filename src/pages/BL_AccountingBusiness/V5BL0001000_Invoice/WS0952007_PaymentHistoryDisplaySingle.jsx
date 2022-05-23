import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Card, Table } from "antd";

class WS0952007_PaymentHistoryDisplaySingle extends React.Component {
  static propTypes = {
    Li_BillingManageNum: PropTypes.any,
    Li_Identify: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "入金履歴表示[個別]";

    this.state = {
      dataSource: [],
    };
  }

  render() {
    return (
      <div className="payment-history-display-single">
        <Card title="入金履歴表示[個別]">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
          >
            <Table.Column
              title="入金管理番号"
              dataIndex="payment_management_number"
            />
            <Table.Column title="入出金" dataIndex="Expression_1" />
            <Table.Column
              title="入金日"
              dataIndex=""
              render={(value, record) => {
                return (
                  <div>
                    <span>{record.payment_day_on}</span>
                    <span>({record.cash_register_division})</span>
                  </div>
                );
              }}
            />
            <Table.Column
              title="処理日"
              dataIndex=""
              render={(value, record) => {
                return (
                  <div>
                    <span>{record.processing_date_on}</span>
                    <span>{record.processing_time_at}</span>
                  </div>
                );
              }}
            />
            <Table.Column
              title="入出金額"
              dataIndex="deposit_withdraw_amount"
            />
            <Table.Column title="振込手数料" dataIndex="transfer_fee" />
            <Table.Column
              width={100}
              render={(value, record) => {
                return (
                  <Button
                    type="primary"
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          // output data
                        });
                      }
                    }}
                  >
                    選択
                  </Button>
                );
              }}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0952007_PaymentHistoryDisplaySingle);
