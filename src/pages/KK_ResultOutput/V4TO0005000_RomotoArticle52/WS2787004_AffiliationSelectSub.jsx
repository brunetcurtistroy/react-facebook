import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button, message } from "antd";
import { getDataAffiliationSelectSubAction } from "redux/ResultOutput/RomotoArticle52/AffiliationSelectSub.actions";

class WS2787004_AffiliationSelectSub extends React.Component {

  static propTypes = {
    Li_OfficeCode: PropTypes.any,
    Li_BranchStoreCode: PropTypes.any,
    Lio_AffiliationCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '所属選択SUB';

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
      Li_OfficeCode: this.props.Li_OfficeCode || '',
      Li_BranchStoreCode: this.props.Li_BranchStoreCode || ''
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.loadData({
        Li_OfficeCode: this.props.Li_OfficeCode || '',
        Li_BranchStoreCode: this.props.Li_BranchStoreCode || ''
      });
    }
  }

  loadData = (params) => {
    this.setState({ isLoading: true });
    getDataAffiliationSelectSubAction(params)
      .then(res => {
        if (res?.data) {
          this.setState({
            dataSource: res.data,
            isLoading: false
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  returnValue = (record) => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_AffiliationCode: record.affiliation_code,
        recordData: record
      });
    }
  }

  render() {
    return (
      <div className="affiliation-select-sub">
        <Card title="所属選択SUB">
          <Table
            bordered
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
            }}
            rowKey={(record) => record.affiliation_code}
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="コード" dataIndex="affiliation_code" 
              render={(text) => (<div style={{textAlign: 'right'}}>{text}</div>)}
            />
            <Table.Column title="略称" dataIndex="short_name" />
            <Table.Column title="正式名称" dataIndex="formal_name" />
            <Table.Column align='center' width={80} render={(text, record) => (
              <Button type="primary" onClick={() => this.returnValue(record)} >選択</Button>
            )} />
          </Table>

          <Button
            type="primary"
            disabled={this.state.rowSelect.id}
            style={{ float: 'right' }}
            hidden={true}
            onClick={() => this.returnValue(this.state.rowSelect)} className='mt-3'
          >選択</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2787004_AffiliationSelectSub);
