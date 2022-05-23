import React from "react";
import { connect } from "react-redux";

import { Button, Card, Table, } from "antd";
import FormatInquiryAction from "redux/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/FormatInquiry.action";

class WS2489003_FormatInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'FORMAT照会';

    this.state = {
      isLoadingTable: true,
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [],
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
    this.setState({
      isLoadingTable: true
    })
    FormatInquiryAction.getScreenData()
      .then(res => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
          selectedRows: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : [],
        })
      })
      .finally(() => {
        this.setState({
          isLoadingTable: false
        })
      })
  }

  render() {
    return (
      <div className="format-inquiry">
        <Card title="FORMAT照会">
          <Table
            loading={this.state.isLoadingTable}
            dataSource={this.state.dataSource}
            pagination={this.state.dataSource?.length > 10 ? true : false}
            rowKey={record => record.id}
            rowSelection={{
              fixed: 'left',
              type: "radio",
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                this.setState({
                  selectedRows: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                });
              },
            }}
          >
            <Table.Column title="FORMAT" dataIndex="format" />
            <Table.Column title="名称" dataIndex="remarks" />
          </Table>

          <Button style={{marginTop: 15, float: "right"}} type="primary"
          onClick={() => {
            if (this.props.onFinishScreen) {
              this.props.onFinishScreen({
                record: this.state.selectedRows[0]
              });
            }
          }}
          >
          選択
          </Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2489003_FormatInquiry);
