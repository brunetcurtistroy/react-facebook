import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button } from "antd";
import KeyItemInquiryAction from "redux/InputBusiness/ProgressSetting/KeyItemInquiry.action";

class WS0536001_KeyItemInquiry extends React.Component {

  static propTypes = {
    Lo_ItemCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'キー項目照会';

    this.state = {
      dataSource: [],
      isLoadingTable: true,
      selectedRows: [],
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }

  getScreenData() {
    this.setState({ isLoadingTable: true });
    KeyItemInquiryAction.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
          selectedRows: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : []
        })
      })
      .finally(() => { this.setState({ isLoadingTable: false }) })
  }

  render() {
    return (
      <div className="key-item-inquiry">
        <Card title="キー項目照会">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered={true}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                this.setState({
                  selectedRows: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                })
              }
            }}
          >
            <Table.Column title="グループ" dataIndex="item_name" />
            <Table.Column title="名称" dataIndex="Name" />
            <Table.Column title="ﾀｲﾌﾟ" dataIndex="Type_FH" />

          </Table>
          <br></br>
          <Button type="primary" style={{ float: 'right' }}
            onClick={() => {
              if (this.props.onFinishScreen) {
                this.props.onFinishScreen({
                  Lo_ItemCode: this.state.selectedRows[0]?.item_code,
                  record: this.state.selectedRows[0]
                })
              }
            }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0536001_KeyItemInquiry);
