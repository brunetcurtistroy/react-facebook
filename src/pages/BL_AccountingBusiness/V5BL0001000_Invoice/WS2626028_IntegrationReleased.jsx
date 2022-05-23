import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Card, Table, Form, message } from "antd";
import moment from "moment";
import {
  getDataIntegrationReleasedAction, getScreenIntegrationReleasedAction, execIntegrationReleasedAction
} from 'redux/AccountingBusiness/Invoice/IntegrationReleased.actions';
class WS2626028_IntegrationReleased extends React.Component {
  static propTypes = {
    Li_Identify: PropTypes.any,
    Li_BillingManageNum: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = "統合解除";

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      IntegrationReleased: {}
    };
  }

  componentDidMount = () => {
    this.loadInitData();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.loadInitData();
    }
  }

  loadInitData = () => {
    getScreenIntegrationReleasedAction()
      .then(res => {
        if (res?.data) this.setState({ IntegrationReleased: res.data.IntegrationReleased })
        this.loadData({
          Li_BillingManageNum: this.props.Li_BillingManageNum,
          Li_Identify: this.props.Li_Identify
        })
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  loadData = (params) => {
    this.setState({ isLoading: true });
    getDataIntegrationReleasedAction(params)
      .then(res => {
        if (res?.data) {
          this.setState({
            dataSource: res.data,
            rowSelect: res.data.length > 0 ? res.data[0] : {}
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  Exec = () => {
    if(this.props.onFinishScreen) this.props.onFinishScreen()
    execIntegrationReleasedAction()
      .then()
      .catch(err => message.error( err?.response?.data?.message || "エラーが発生しました"))
  }

  render() {
    return (
      <div className="integration-released">
        <Card title="統合解除">
          <Form.Item label='統合された請求書を解除しますか？'></Form.Item>
          <Table
            className='mt-3 mb-3'
            bordered
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
            }}
            rowKey={(record) => record.id}
            rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="請求年月" dataIndex="billing_date_on" render={(text, record) => (
              <div>{text && moment(text).isValid() ? moment(text).format('YYYY/MM') : null}</div>
            )} />
            <Table.Column title="宛先" dataIndex="according_to_destination_name" />
            <Table.Column title="件名" dataIndex="according_to_subject" />
            <Table.Column title="請求金額" dataIndex="billing_price" render={(text, record) => (
              <div style={{ textAlign: 'right' }}>{text === 0 ? null : text?.toLocaleString()}</div>
            )} />
          </Table>
          <Button type="primary" style={{ float: 'right' }} onClick={this.Exec}>統合解除</Button>
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
)(WS2626028_IntegrationReleased);
