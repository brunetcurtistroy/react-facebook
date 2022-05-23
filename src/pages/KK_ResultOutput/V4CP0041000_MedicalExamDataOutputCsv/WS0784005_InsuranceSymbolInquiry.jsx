import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button, message } from "antd";
import { getDataInsuranceSymbolInquiryAction } from "redux/ResultOutput/MedicalExamDataOutputCsv/InsuranceSymbolInquiry.actions";

class WS0784005_InsuranceSymbolInquiry extends React.Component {

  static propTypes = {
    Lo_InsurerCardSymbol: PropTypes.number,

    onFinishScreen: PropTypes.func,
  }

  constructor(props) {
    super(props);

    // document.title = '保険記号照会';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    this.loadData({
      Office: this.props.Goffice,
      GbranchStoreF: this.props.GbranchStoreF,
      GbranchStoreT: this.props.GbranchStoreT,
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps)
      this.loadData({
        Office: this.props.Goffice,
        GbranchStoreF: this.props.GbranchStoreF,
        GbranchStoreT: this.props.GbranchStoreT,
      });
  }

  loadData = () => {
    this.setState({ isLoading: true, dataSource: [], rowSelect: {} });
    getDataInsuranceSymbolInquiryAction()
      .then(res => {
        if (res?.data) {
          this.setState({ dataSource: res.data });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  returnValue = (record) => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lo_GinsuranceSign: record.GinsuranceSign,
        Lo_InsurerCardSymbol: record.insurer_card_symbol,
        recordData: record
      });
    }
  }

  render() {
    return (
      <div className="insurance-symbol-inquiry">
        <Card title="保険記号照会">
          <Table
            bordered
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
            }}
            rowKey={(record) => record.id}
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="事業所ｺｰﾄﾞ" dataIndex="Expresstion_4" width={150}
              render={(value) => <div style={{ textAlign: 'right', marginRight: '20px' }}>{value}</div>}
            />
            <Table.Column title="事業所名（漢字）" dataIndex="office_kanji_name" />
            <Table.Column title="保険記号" dataIndex="GinsuranceSign" width={170} 
              render={(text) => text === '0' ? null : text}
            />
            {/* <Table.Column title="保険記号" dataIndex="insurer_card_symbol" width={170} /> */}
            <Table.Column title="" dataIndex="" align='center' width={70} render={(text, record) => (
              <Button type="primary" onClick={() => this.returnValue(record)}>確　定</Button>
            )} />
          </Table>

          <Button
            hidden={true}
            type="primary"
            disabled={!this.state.rowSelect.id}
            style={{ float: 'right' }}
            onClick={() => this.returnValue(this.state.rowSelect)}
          >確　定</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0784005_InsuranceSymbolInquiry);
